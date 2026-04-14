// 云端同步功能模块

const API_BASE_URL = 'https://api.peacelove.top';

// 检测浏览器是否支持 WebP
function supportsWebP() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
}

// 缓存 WebP 支持状态
const WEBP_SUPPORTED = supportsWebP();

function compressImage(imageData, maxWidth = 300, preferWebP = true) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      const originalType = imageData.startsWith('data:image/png') ? 'image/png' : 
                          imageData.startsWith('data:image/webp') ? 'image/webp' : 
                          imageData.startsWith('data:image/gif') ? 'image/gif' : 'image/jpeg';
      const hasTransparency = originalType === 'image/png' || originalType === 'image/gif' || originalType === 'image/webp';
      
      let compressedData;
      let outputFormat;
      
      // 优先使用 WebP 格式（如果支持且用户偏好）
      if (preferWebP && WEBP_SUPPORTED) {
        // WebP 质量设置：有透明通道用较低质量保持体积小，无透明用较高质量
        const quality = hasTransparency ? 0.8 : 0.85;
        compressedData = canvas.toDataURL('image/webp', quality);
        outputFormat = 'WebP';
      } else if (hasTransparency) {
        // 回退到 PNG（保留透明）
        compressedData = canvas.toDataURL('image/png');
        outputFormat = 'PNG';
      } else {
        // 回退到 JPEG
        compressedData = canvas.toDataURL('image/jpeg', 0.8);
        outputFormat = 'JPEG';
      }
      
      const maxBase64Size = 4 * 1024 * 1024;
      if (compressedData.length > maxBase64Size) {
        console.log('压缩后数据仍然过大，进一步缩小尺寸...');
        const scale = Math.sqrt(maxBase64Size / compressedData.length);
        const newWidth = Math.round(width * scale);
        const newHeight = Math.round(height * scale);
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        if (preferWebP && WEBP_SUPPORTED) {
          compressedData = canvas.toDataURL('image/webp', 0.7);
        } else if (hasTransparency) {
          compressedData = canvas.toDataURL('image/png');
        } else {
          compressedData = canvas.toDataURL('image/jpeg', 0.7);
        }
      }
      
      console.log('图片压缩完成: 原始尺寸 ' + img.width + 'x' + img.height + ' -> ' + width + 'x' + height + ', 格式: ' + outputFormat + (hasTransparency ? '(保留透明)' : ''));
      console.log('压缩后数据大小约: ' + Math.round(compressedData.length / 1024) + 'KB');
      
      resolve(compressedData);
    };
    img.onerror = function(e) {
      reject(new Error('图片加载失败'));
    };
    img.src = imageData;
  });
}

// 上传图片到云端（双存储：Cloudflare R2 + 腾讯云 COS）
async function uploadImageToCloud(imageType, imageData) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) {
    console.log('用户未登录，跳过上传');
    return { success: false, reason: 'not_logged_in' };
  }
  
  try {
    console.log('开始上传 ' + imageType + ' 到云端...');
    
    let compressedData = imageData;
    try {
      compressedData = await compressImage(imageData, 350);
    } catch (compressErr) {
      console.warn('图片压缩失败，使用原图:', compressErr);
    }
    
    // 生成时间戳，确保每次上传的URL都不同
    const timestamp = Date.now();
    
    // 同时上传到 Cloudflare R2 和腾讯云 COS
    const cloudResult = await uploadToCloudflare(imageType, compressedData, timestamp);
    const tencentResult = await uploadToTencent(imageType, compressedData, timestamp);
    
    // 优先返回 Cloudflare URL，但保存腾讯云 URL 和 fileID 作为备用
    let finalUrl = cloudResult.url;
    let tencentUrl = tencentResult.url;
    let tencentFileID = tencentResult.fileID;
    
    if (finalUrl && !finalUrl.includes('?')) {
      finalUrl = finalUrl + '?t=' + timestamp;
    } else if (finalUrl && finalUrl.includes('?')) {
      finalUrl = finalUrl + '&t=' + timestamp;
    }
    
    if (tencentUrl && !tencentUrl.includes('?')) {
      tencentUrl = tencentUrl + '?t=' + timestamp;
    } else if (tencentUrl && tencentUrl.includes('?')) {
      tencentUrl = tencentUrl + '&t=' + timestamp;
    }
    
    console.log(imageType + ' 上传成功:');
    console.log('  Cloudflare URL:', finalUrl);
    console.log('  腾讯云 URL:', tencentUrl);
    console.log('  腾讯云 fileID:', tencentFileID);
    
    // 保存 fileID 到数据库
    if (tencentFileID) {
      await syncTencentFileIDToDB(imageType, tencentFileID);
    }
    
    return { 
      success: true, 
      url: finalUrl,
      tencentUrl: tencentUrl,
      tencentFileID: tencentFileID
    };
  } catch (e) {
    console.error('上传 ' + imageType + ' 失败:', e);
    return { success: false, error: e.message };
  }
}

// 上传到 Cloudflare R2
async function uploadToCloudflare(imageType, imageData, timestamp) {
  try {
    const response = await fetch(API_BASE_URL + '/user-update-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('postdiy_user_id'),
        imageType,
        imageData,
        timestamp
      })
    });
    
    const result = await response.json();
    
    if (result.success && result.data) {
      return { success: true, url: result.data.url };
    }
    
    return { success: false, message: result.message };
  } catch (e) {
    console.error('上传到 Cloudflare 失败:', e);
    return { success: false, error: e.message };
  }
}

// 上传到腾讯云 COS
async function uploadToTencent(imageType, imageData, timestamp) {
  try {
    console.log('开始上传 ' + imageType + ' 到腾讯云 COS...')
    const response = await fetch(API_BASE_URL + '/user-update-image-tencent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('postdiy_user_id'),
        imageType,
        imageData,
        timestamp
      })
    });
    
    console.log('腾讯云上传响应状态:', response.status)
    
    const result = await response.json()
    console.log('腾讯云上传响应数据:', result)
    
    if (result.success && result.data) {
      console.log('腾讯云上传成功，URL:', result.data.url)
      console.log('腾讯云上传成功，fileID:', result.data.fileID)
      return { success: true, url: result.data.url, fileID: result.data.fileID }
    }
    
    console.warn('腾讯云上传失败:', result.message || '未知错误')
    return { success: false, message: result.message }
  } catch (e) {
    console.error('上传到腾讯云失败:', e)
    // 腾讯云上传失败不阻塞主流程
    return { success: false, error: e.message }
  }
}

// 从云端删除图片
async function deleteImageFromCloud(imageType) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) {
    console.log('用户未登录，跳过删除');
    return { success: false, reason: 'not_logged_in' };
  }
  
  try {
    console.log('开始从云端删除 ' + imageType + '...');
    
    const response = await fetch(API_BASE_URL + '/user-delete-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        imageType
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log(imageType + ' 删除成功');
      return { success: true };
    } else {
      console.error(imageType + ' 删除失败:', result.message);
      return { success: false, message: result.message };
    }
  } catch (e) {
    console.error('删除 ' + imageType + ' 失败:', e);
    return { success: false, error: e.message };
  }
}

// 从云端加载商家信息（双存储）
async function loadBusinessInfoFromCloud() {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) {
    return { success: false, reason: 'not_logged_in' };
  }
  
  try {
    const response = await fetch(API_BASE_URL + '/user-get-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    
    const result = await response.json();
    
    if (result.success && result.data) {
      return {
        success: true,
        data: {
          brandname: result.data.brandname || '',
          promoText: result.data.promoText || '',
          logoUrl: result.data.logoUrl || '',
          logoTencentUrl: result.data.logoTencentUrl || '',
          logoFileID: result.data.logoFileID || '',
          qrcodeUrl: result.data.qrcodeUrl || '',
          qrcodeTencentUrl: result.data.qrcodeTencentUrl || '',
          qrcodeFileID: result.data.qrcodeFileID || '',
          logoTransparent: result.data.logoTransparent || false
        }
      };
    }
    
    return { success: false, reason: 'no_data' };
  } catch (e) {
    console.error('从云端加载商家信息失败:', e);
    return { success: false, error: e.message };
  }
}

// 同步并填充商家信息
async function syncAndFillBusinessInfo(forceRefresh = false) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) {
    console.log('用户未登录，跳过同步商家信息');
    return { success: false, reason: 'not_logged_in' };
  }
  
  // 初始化腾讯云 SDK
  if (typeof cloudbase !== 'undefined') {
    try {
      const app = cloudbase.init({
        env: 'postdiy-0g2mftaf6a0fc450'
      });
      console.log('腾讯云云开发 SDK 初始化成功');
    } catch (e) {
      console.error('腾讯云云开发 SDK 初始化失败:', e);
    }
  }
  
  const localCacheKey = 'vipBusinessInfo_' + userId;
  const businessInfoCacheKey = 'businessInfoCache_' + userId;
  
  // 强制刷新时，先清除所有相关缓存
  if (forceRefresh) {
    console.log('强制刷新模式，清除所有本地缓存...');
    localStorage.removeItem(localCacheKey);
    localStorage.removeItem(businessInfoCacheKey);
    localStorage.removeItem('business_info_force_refresh');
    
    // 清除图片缓存
    localStorage.removeItem('imageCache_logo');
    localStorage.removeItem('imageCache_qrcode');
    localStorage.removeItem('imageMeta_logo');
    localStorage.removeItem('imageMeta_qrcode');
    localStorage.removeItem('imageMeta_lastFetch');
    localStorage.removeItem('imageMeta_forceRefresh');
    localStorage.removeItem('imageMeta_deviceId');
    localStorage.removeItem('imageMeta_deviceId_stored');
    
    console.log('所有缓存已清除');
  }
  
  try {
    console.log('开始从云端同步商家信息...');
    
    const cloudResult = await loadBusinessInfoFromCloud();
    
    if (cloudResult.success && cloudResult.data) {
      const cloudData = {
        ...cloudResult.data,
        fetchedAt: Date.now()
      };
      
      // 保存腾讯云 URL 和 fileID 到本地缓存
      if (cloudResult.data.logoTencentUrl) {
        cloudData.logoTencentUrl = cloudResult.data.logoTencentUrl;
      }
      if (cloudResult.data.qrcodeTencentUrl) {
        cloudData.qrcodeTencentUrl = cloudResult.data.qrcodeTencentUrl;
      }
      if (cloudResult.data.logoFileID) {
        cloudData.logoFileID = cloudResult.data.logoFileID;
      }
      if (cloudResult.data.qrcodeFileID) {
        cloudData.qrcodeFileID = cloudResult.data.qrcodeFileID;
      }
      
      try {
        localStorage.setItem(localCacheKey, JSON.stringify(cloudData));
        localStorage.setItem(businessInfoCacheKey, JSON.stringify(cloudData));
        console.log('商家信息已缓存到本地');
      } catch (e) {
        console.log('缓存商家信息失败:', e);
      }
      
      fillBusinessInfoToState(cloudData);
      
      console.log('商家信息同步完成');
      return { success: true, source: 'cloud' };
    }
    
    return { success: false, reason: 'no_data' };
  } catch (e) {
    console.error('同步商家信息失败:', e);
    return { success: false, error: e.message };
  }
}

// 设置强制刷新商家信息标记
function setForceRefreshBusinessInfo() {
  localStorage.setItem('business_info_force_refresh', 'true');
}

// 填充商家信息到state和画布
function fillBusinessInfoToState(data) {
  if (!data) return;
  
  console.log('填充商家信息到state:', data);
  
  // 获取全局state（如果存在）
  if (window.editorState && window.editorState.businessInfo) {
    if (data.brandname) {
      window.editorState.businessInfo.name = data.brandname;
    }
    if (data.logoUrl) {
      window.editorState.businessInfo.logo = data.logoUrl;
    }
    if (data.qrcodeUrl) {
      window.editorState.businessInfo.qrcode = data.qrcodeUrl;
    }
    if (data.logoTencentUrl) {
      window.editorState.businessInfo.logoTencentUrl = data.logoTencentUrl;
    }
    if (data.qrcodeTencentUrl) {
      window.editorState.businessInfo.qrcodeTencentUrl = data.qrcodeTencentUrl;
    }
    if (data.logoFileID) {
      window.editorState.businessInfo.logoFileID = data.logoFileID;
    }
    if (data.qrcodeFileID) {
      window.editorState.businessInfo.qrcodeFileID = data.qrcodeFileID;
    }
    if (data.promoText) {
      window.editorState.businessInfo.promoText = data.promoText;
    }
    if (data.logoTransparent !== undefined) {
      window.editorState.businessInfo.logoTransparent = data.logoTransparent;
    }
  }
  
  // 更新画布显示
  updateCanvasDisplay(data);
  
  // 更新编辑区域输入框
  const businessNameInput = document.getElementById('business-name');
  if (businessNameInput && data.brandname) {
    businessNameInput.value = data.brandname;
  }
  
  // 更新Logo预览
  const logoPreviewImg = document.getElementById('logoPreviewImg');
  const logoPreview = document.getElementById('logoPreview');
  const logoUploadArea = document.getElementById('logoUploadArea');
  if (data.logoUrl && logoPreviewImg && logoPreview && logoUploadArea) {
    logoPreviewImg.src = data.logoUrl;
    logoPreview.style.display = 'block';
    logoUploadArea.style.display = 'none';
  }
  
  // 更新二维码预览
  const qrcodePreviewImg = document.getElementById('qrcodePreviewImg');
  const qrcodePreview = document.getElementById('qrcodePreview');
  const qrcodeUploadArea = document.getElementById('qrcodeUploadArea');
  if (data.qrcodeUrl && qrcodePreviewImg && qrcodePreview && qrcodeUploadArea) {
    qrcodePreviewImg.src = data.qrcodeUrl;
    qrcodePreview.style.display = 'block';
    qrcodeUploadArea.style.display = 'none';
  }

  // 更新Logo透明开关UI
  if (data.logoTransparent !== undefined && window.elements && window.elements.logoTransparencyToggle) {
    const toggle = window.elements.logoTransparencyToggle;
    if (data.logoTransparent) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
    const thumb = toggle.querySelector('.toggle-thumb');
    if (thumb) {
      thumb.textContent = data.logoTransparent ? '透明' : '不透明';
    }
    // 更新海报上的Logo样式
    if (typeof window.updateLogoTransparencyStyle === 'function') {
      window.updateLogoTransparencyStyle(data.logoTransparent);
    }
  }
}

// 更新画布显示
function updateCanvasDisplay(data) {
  // 更新商家名称
  const posterBusinessName = document.getElementById('poster-business-name');
  if (posterBusinessName && data.brandname) {
    posterBusinessName.textContent = data.brandname;
  }
  
  // 更新Logo
  const posterLogoImg = document.getElementById('poster-logo-img');
  const logoPlaceholder = document.getElementById('logo-placeholder');
  if (posterLogoImg && logoPlaceholder) {
    if (data.logoUrl) {
      posterLogoImg.src = data.logoUrl;
      posterLogoImg.style.display = 'block';
      logoPlaceholder.style.display = 'none';
    } else {
      posterLogoImg.style.display = 'none';
      logoPlaceholder.style.display = 'block';
    }
  }
  
  // 更新二维码
  const posterQrcodeImg = document.getElementById('poster-qrcode-img');
  const qrcodePlaceholder = document.getElementById('qrcode-placeholder');
  if (posterQrcodeImg && qrcodePlaceholder) {
    if (data.qrcodeUrl) {
      posterQrcodeImg.src = data.qrcodeUrl;
      posterQrcodeImg.style.display = 'block';
      qrcodePlaceholder.style.display = 'none';
    } else {
      posterQrcodeImg.style.display = 'none';
      qrcodePlaceholder.style.display = 'block';
    }
  }
  
  // 更新促销信息
  const posterPromoText = document.getElementById('poster-promo-text');
  if (posterPromoText && data.promoText) {
    posterPromoText.innerHTML = data.promoText.replace(/\n/g, '<br>');
  }
}

// 同步Logo URL到云端（双存储）
async function syncLogoUrlToCloud(logoUrl, tencentUrl = '', tencentFileID = '') {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId || logoUrl === undefined) return;
  
  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId, 
        logoUrl,
        logoTencentUrl: tencentUrl,
        logoFileID: tencentFileID
      })
    });
    const result = await response.json();
    if (result.success) {
      console.log('Logo URL 已同步到用户信息:');
      console.log('  Cloudflare:', logoUrl);
      console.log('  腾讯云:', tencentUrl);
      console.log('  腾讯云 fileID:', tencentFileID);
      
      const localCacheKey = 'businessInfoCache_' + userId;
      try {
        const cachedData = localStorage.getItem(localCacheKey);
        if (cachedData) {
          const cache = JSON.parse(cachedData);
          cache.logoUrl = logoUrl;
          cache.logoTencentUrl = tencentUrl;
          cache.logoFileID = tencentFileID;
          cache.fetchedAt = Date.now();
          localStorage.setItem(localCacheKey, JSON.stringify(cache));
        }
      } catch (e) {
        console.log('更新本地缓存失败:', e);
      }
    }
  } catch (e) {
    console.error('同步 Logo URL 失败:', e);
  }
}

// 同步二维码URL到云端（双存储）
async function syncQrcodeUrlToCloud(qrcodeUrl, tencentUrl = '', tencentFileID = '') {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId || qrcodeUrl === undefined) return;
  
  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId, 
        qrcodeUrl,
        qrcodeTencentUrl: tencentUrl,
        qrcodeFileID: tencentFileID
      })
    });
    const result = await response.json();
    if (result.success) {
      console.log('二维码 URL 已同步到用户信息:');
      console.log('  Cloudflare:', qrcodeUrl);
      console.log('  腾讯云:', tencentUrl);
      console.log('  腾讯云 fileID:', tencentFileID);
      
      const localCacheKey = 'businessInfoCache_' + userId;
      try {
        const cachedData = localStorage.getItem(localCacheKey);
        if (cachedData) {
          const cache = JSON.parse(cachedData);
          cache.qrcodeUrl = qrcodeUrl;
          cache.qrcodeTencentUrl = tencentUrl;
          cache.qrcodeFileID = tencentFileID;
          cache.fetchedAt = Date.now();
          localStorage.setItem(localCacheKey, JSON.stringify(cache));
        }
      } catch (e) {
        console.log('更新本地缓存失败:', e);
      }
    }
  } catch (e) {
    console.error('同步二维码 URL 失败:', e);
  }
}

// 同步品牌名称到云端
async function syncBrandnameToCloud(brandname) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) return;
  
  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, brandname })
    });
    const result = await response.json();
    if (result.success) {
      console.log('品牌名称已同步到云端:', brandname);
    }
  } catch (e) {
    console.error('同步品牌名称失败:', e);
  }
}

// 同步促销信息到云端
async function syncPromoTextToCloud(promoText) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) return;

  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, promoText })
    });
    const result = await response.json();
    if (result.success) {
      console.log('促销信息已同步到云端');
    }
  } catch (e) {
    console.error('同步促销信息失败:', e);
  }
}

// 同步Logo透明状态到云端
async function syncLogoTransparentToCloud(logoTransparent) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) return;

  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, logoTransparent })
    });
    const result = await response.json();
    if (result.success) {
      console.log('Logo透明状态已同步到云端:', logoTransparent);
    }
  } catch (e) {
    console.error('同步Logo透明状态失败:', e);
  }
}

// 清除用户信息中的图片URL
async function clearUserImageUrl(imageType) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) return;
  
  const urlField = imageType === 'logo' ? 'logoUrl' : 'qrcodeUrl';
  
  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, [urlField]: '' })
    });
    const result = await response.json();
    if (result.success) {
      console.log(imageType + ' URL 已从用户信息中清除');
      
      const localCacheKey = 'businessInfoCache_' + userId;
      try {
        const cachedData = localStorage.getItem(localCacheKey);
        if (cachedData) {
          const cache = JSON.parse(cachedData);
          cache[urlField] = '';
          cache.fetchedAt = Date.now();
          localStorage.setItem(localCacheKey, JSON.stringify(cache));
        }
      } catch (e) {
        console.log('清除本地缓存失败:', e);
      }
    }
  } catch (e) {
    console.error('清除 ' + imageType + ' URL 失败:', e);
  }
}

// 同步腾讯云 fileID 到数据库
async function syncTencentFileIDToDB(imageType, fileID) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId || !fileID) return;
  
  const fileIDField = imageType === 'logo' ? 'logoFileID' : 'qrcodeFileID';
  
  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, [fileIDField]: fileID })
    });
    
    const result = await response.json();
    if (result.success) {
      console.log(`${imageType} fileID 已同步到云端:`, fileID);
    }
  } catch (e) {
    console.error(`同步 ${imageType} fileID 失败:`, e);
  }
}

// 显示加载提示
function showLoadingToast(message) {
  let loadingToast = document.querySelector('.loading-toast');
  if (!loadingToast) {
    loadingToast = document.createElement('div');
    loadingToast.className = 'loading-toast';
    loadingToast.style.cssText = 'position: fixed; bottom: 5px; left: 50%; transform: translateX(-50%); background: rgba(0, 0, 0, 0.75); color: white; padding: 6px 12px; border-radius: 4px; z-index: 10000; font-size: 12px; white-space: nowrap;';
    document.body.appendChild(loadingToast);
  }
  loadingToast.textContent = message;
  loadingToast.style.display = 'block';
  return loadingToast;
}

// 隐藏加载提示
function hideLoadingToast(loadingToast) {
  if (loadingToast) {
    loadingToast.style.display = 'none';
  }
}

// 导出函数到全局
window.CloudSync = {
  uploadImageToCloud,
  deleteImageFromCloud,
  loadBusinessInfoFromCloud,
  syncAndFillBusinessInfo,
  syncLogoUrlToCloud,
  syncQrcodeUrlToCloud,
  syncBrandnameToCloud,
  syncPromoTextToCloud,
  syncLogoTransparentToCloud,
  clearUserImageUrl,
  showLoadingToast,
  hideLoadingToast,
  API_BASE_URL
};

console.log('云端同步模块已加载');
