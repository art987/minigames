// 云端同步功能模块

const API_BASE_URL = 'https://api.peacelove.top';

// 压缩图片到指定宽度
function compressImage(imageData, maxWidth = 350) {
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
      
      const compressedData = canvas.toDataURL('image/jpeg', 0.8);
      console.log('图片压缩完成: 原始尺寸 ' + img.width + 'x' + img.height + ' -> ' + width + 'x' + height);
      console.log('压缩后数据大小约: ' + Math.round(compressedData.length / 1024) + 'KB');
      
      resolve(compressedData);
    };
    img.onerror = function(e) {
      reject(new Error('图片加载失败'));
    };
    img.src = imageData;
  });
}

// 上传图片到云端
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
    
    const response = await fetch(API_BASE_URL + '/user-update-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        imageType,
        imageData: compressedData
      })
    });
    
    const result = await response.json();
    
    if (result.success && result.data) {
      console.log(imageType + ' 上传成功:', result.data.url);
      return { success: true, url: result.data.url };
    } else {
      console.error(imageType + ' 上传失败:', result.message);
      return { success: false, message: result.message };
    }
  } catch (e) {
    console.error('上传 ' + imageType + ' 失败:', e);
    return { success: false, error: e.message };
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

// 从云端加载商家信息
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
          qrcodeUrl: result.data.qrcodeUrl || ''
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
async function syncAndFillBusinessInfo() {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) {
    console.log('用户未登录，跳过同步商家信息');
    return { success: false, reason: 'not_logged_in' };
  }
  
  const localCacheKey = 'vipBusinessInfo_' + userId;
  const businessInfoCacheKey = 'businessInfoCache_' + userId;
  const CACHE_DURATION = 30 * 60 * 1000;
  
  try {
    const localCache = localStorage.getItem(localCacheKey);
    if (localCache) {
      const cachedData = JSON.parse(localCache);
      console.log('使用本地缓存的商家信息:', cachedData);
      fillBusinessInfoToState(cachedData);
      return { success: true, source: 'cache' };
    }
  } catch (e) {
    console.log('读取本地缓存失败:', e);
  }
  
  try {
    console.log('开始从云端同步商家信息...');
    
    const cloudResult = await loadBusinessInfoFromCloud();
    
    if (cloudResult.success && cloudResult.data) {
      const cloudData = {
        ...cloudResult.data,
        fetchedAt: Date.now()
      };
      
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
    if (data.promoText) {
      window.editorState.businessInfo.promoText = data.promoText;
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

// 同步Logo URL到云端
async function syncLogoUrlToCloud(logoUrl) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId || logoUrl === undefined) return;
  
  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, logoUrl })
    });
    const result = await response.json();
    if (result.success) {
      console.log('Logo URL 已同步到用户信息:', logoUrl);
      
      const localCacheKey = 'businessInfoCache_' + userId;
      try {
        const cachedData = localStorage.getItem(localCacheKey);
        if (cachedData) {
          const cache = JSON.parse(cachedData);
          cache.logoUrl = logoUrl;
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

// 同步二维码URL到云端
async function syncQrcodeUrlToCloud(qrcodeUrl) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId || qrcodeUrl === undefined) return;
  
  try {
    const response = await fetch(API_BASE_URL + '/user-update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, qrcodeUrl })
    });
    const result = await response.json();
    if (result.success) {
      console.log('二维码 URL 已同步到用户信息:', qrcodeUrl);
      
      const localCacheKey = 'businessInfoCache_' + userId;
      try {
        const cachedData = localStorage.getItem(localCacheKey);
        if (cachedData) {
          const cache = JSON.parse(cachedData);
          cache.qrcodeUrl = qrcodeUrl;
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

// 显示加载提示
function showLoadingToast(message) {
  let loadingToast = document.querySelector('.loading-toast');
  if (!loadingToast) {
    loadingToast = document.createElement('div');
    loadingToast.className = 'loading-toast';
    loadingToast.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0, 0, 0, 0.8); color: white; padding: 16px 24px; border-radius: 8px; z-index: 10000; font-size: 14px;';
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
  clearUserImageUrl,
  showLoadingToast,
  hideLoadingToast,
  API_BASE_URL
};

console.log('云端同步模块已加载');
