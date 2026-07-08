// 海报DIY编辑器 - 全新实现
// 模块化设计，避免变量重复声明问题

// 浮动提示函数
function showToast(message, duration = 3000) {
  let toast = document.getElementById('floating-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'floating-toast';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
  }, duration);
}

// 复制到剪贴板函数（兼容所有浏览器）
function copyToClipboard(text) {
  if (!text) return;

  // 尝试使用现代 API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('已复制', 2000);
    }).catch(() => {
      // 如果现代 API 失败，使用传统方法
      fallbackCopy(text);
    });
  } else {
    // 如果不支持，使用传统方法
    fallbackCopy(text);
  }
}

// 传统复制方法（兼容所有浏览器）
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('已复制', 2000);
  } catch (err) {
    console.error('复制失败:', err);
    showToast('复制失败', 2000);
  }
  document.body.removeChild(textarea);
}

// 等待图片加载完成
function waitForImageLoad(imgElement, timeout = 5000) {
  return new Promise((resolve) => {
    if (!imgElement || !imgElement.src) {
      console.log('[等待加载] 图片元素不存在或未设置src');
      resolve();
      return;
    }
    
    if (imgElement.complete) {
      console.log('[等待加载] 图片已加载完成');
      resolve();
      return;
    }
    
    const timeoutId = setTimeout(() => {
      console.log('[等待加载] 超时，继续执行');
      resolve();
    }, timeout);
    
    imgElement.onload = () => {
      clearTimeout(timeoutId);
      console.log('[等待加载] 图片加载成功');
      resolve();
    };
    
    imgElement.onerror = () => {
      clearTimeout(timeoutId);
      console.log('[等待加载] 图片加载失败');
      resolve();
    };
  });
}

// 微信浏览器检测（支持调试参数）
function isWeixinBrowser() {
  // 检查URL参数，支持调试模式
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('browser') === 'wechat') {
    return true;
  }
  
  // 正常检测微信浏览器
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
}

// 检查今天是否有节日
function getTodayFestival() {
  const today = new Date();
  const year = today.getFullYear();
  const yearStr = year.toString();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  
  if (window.festivalDates && window.festivalDates[yearStr]) {
    for (const festivalName in window.festivalDates[yearStr]) {
      if (window.festivalDates[yearStr][festivalName].startsWith(todayStr)) {
        return festivalName;
      }
    }
  }
  return null;
}

// 获取未来的节日
function getFutureFestivals(count = 3) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = today.getFullYear();
  const festivals = [];
  
  const yearsToCheck = [currentYear.toString(), (currentYear + 1).toString()];
  
  for (const yearStr of yearsToCheck) {
    if (window.festivalDates && window.festivalDates[yearStr]) {
      for (const festivalName in window.festivalDates[yearStr]) {
        const dateStr = window.festivalDates[yearStr][festivalName].split(' ')[0];
        const [year, month, day] = dateStr.split('-').map(Number);
        const festivalDate = new Date(year, month - 1, day);
        festivalDate.setHours(0, 0, 0, 0);
        
        if (festivalDate > today) {
          const daysUntil = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
          festivals.push({
            name: festivalName,
            date: festivalDate,
            daysUntil: daysUntil
          });
        }
      }
    }
  }
  
  festivals.sort((a, b) => a.date - b.date);
  return festivals.slice(0, count);
}

// 微信浏览器提示管理
window.wechatWarning = {
  isWechat: false,
  
  // 初始化微信检测
  init: function() {
    this.isWechat = isWeixinBrowser();
    
    // 检查是否是调试模式
    const urlParams = new URLSearchParams(window.location.search);
    this.isDebugMode = urlParams.get('browser') === 'wechat';
    
    if (this.isWechat) {
      this.showWarningModal();
      this.showTopBar();
    }
  },
  
  // 显示警告弹窗
  showWarningModal: function() {
    // 调试模式提示
    const debugInfo = this.isDebugMode ? '<div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 4px; padding: 8px; margin-bottom: 16px; font-size: 12px; color: #2e7d32;">🔧 调试模式：模拟微信浏览器环境</div>' : '';
    
    // 创建弹窗HTML
    const modalHTML = `
      <div id="wechatWarningModal" class="wechat-warning-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div id="wechatWarningModal" class="wechat-warning-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div class="wechat-warning-content" style="background: white; border-radius: 12px; padding: 24px; max-width: 320px; text-align: center; position: relative;">
          
          <h3 style="margin: 0 0 12px 0; color: #333; font-size: 18px;">微信内不支持图片（海报）下载</h3>
          <p style="margin: 0 0 20px 0; color: #666; font-size: 14px; line-height: 1.4;">如需体验完整功能，请右上角点"..."选择外部浏览器进行访问</p>
          ${debugInfo}
          <div class="arrow-indicator" style="position: fixed;top: 19px; right: 36px; width: 30px; height: 30px; transform: rotate(348deg);">
            <div style="width: 100%; height: 100%; border-right: 3px solid #f6a83b; border-top: 3px solid #f6a83b;"></div>
          </div>
          <button id="continueBrowse" class="continue-btn" style="background: #0d8507ff; border: 2px solid #dee2e6; border-radius: 6px; padding: 10px 20px; color: #ffffffff; font-size: 16px; cursor: pointer; width: 100%;">我不下载图片，随便看看</button>
        </div>
      </div>>
      </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 绑定关闭事件
    document.getElementById('continueBrowse').addEventListener('click', function() {
      document.getElementById('wechatWarningModal').style.display = 'none';
    });
  },
  
  // 显示顶部横条
  showTopBar: function() {
    // 创建顶部横条HTML
    const topBarHTML = `
     <div id="wechatTopBar" class="wechat-top-bar" style=" width: 100%;     background: #22b208;
    border-bottom: 2px solid #0a7509ff; padding: 8px 16px; z-index:1;top: 0; text-align: center; font-size: 12px; color: #ffffffff; position: fixed;">
        <span>微信内不支持下载，右上角点<b>...</b> 选择外部浏览器访问。</span>
      </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('afterbegin', topBarHTML);
    
    // 调整页面内容位置，避免被顶部横条遮挡
    const topBar = document.getElementById('wechatTopBar');
    const mainContent = document.querySelector('main') || document.body;
    if (topBar && mainContent) {
      const barHeight = topBar.offsetHeight;
      mainContent.style.marginTop = barHeight + 'px';
    }
  }
};

// 图片本地缓存系统
const IMAGE_CACHE_KEYS = {
  logo: 'poster_logo_base64',
  qrcode: 'poster_qrcode_base64'
};

const IMAGE_META_KEYS = {
  logo: 'poster_logo_meta',
  qrcode: 'poster_qrcode_meta'
};

const IMAGE_META = {
  deviceId: 'image_cache_device_id',
  lastFetch: 'image_cache_last_fetch',
  forceRefresh: 'image_cache_force_refresh'
};

// 分级缓存配置
const CACHE_CONFIG = {
  logo: {
    maxAge: 1 * 60 * 60 * 1000,        // 1小时：缓存新鲜期
    staleWhileRevalidate: 24 * 60 * 60 * 1000  // 24小时：宽限期，可使用过期缓存
  },
  qrcode: {
    maxAge: 1 * 60 * 60 * 1000,        // 1小时：缓存新鲜期
    staleWhileRevalidate: 24 * 60 * 60 * 1000  // 24小时：宽限期
  }
};

// 缓存状态枚举
const CACHE_STATUS = {
  FRESH: 'fresh',           // 新鲜，直接使用
  STALE: 'stale',           // 过期但在宽限期内，后台更新
  EXPIRED: 'expired'        // 完全过期，需要同步获取
};

function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem(IMAGE_META.deviceId);
  if (!deviceId) {
    deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(IMAGE_META.deviceId, deviceId);
  }
  return deviceId;
}

// 获取缓存状态
function getCacheStatus(imageType) {
  const metaKey = IMAGE_META_KEYS[imageType];
  const meta = localStorage.getItem(metaKey);
  
  if (!meta) {
    return { status: CACHE_STATUS.EXPIRED, age: Infinity };
  }
  
  try {
    const metaObj = JSON.parse(meta);
    const age = Date.now() - (metaObj.timestamp || 0);
    const config = CACHE_CONFIG[imageType];
    
    if (age < config.maxAge) {
      return { status: CACHE_STATUS.FRESH, age, meta: metaObj };
    } else if (age < config.staleWhileRevalidate) {
      return { status: CACHE_STATUS.STALE, age, meta: metaObj };
    } else {
      return { status: CACHE_STATUS.EXPIRED, age, meta: metaObj };
    }
  } catch (e) {
    return { status: CACHE_STATUS.EXPIRED, age: Infinity };
  }
}

// 保存缓存元数据
function saveCacheMeta(imageType, source = 'cloudflare') {
  const metaKey = IMAGE_META_KEYS[imageType];
  const meta = {
    timestamp: Date.now(),
    source: source,
    deviceId: getOrCreateDeviceId()
  };
  localStorage.setItem(metaKey, JSON.stringify(meta));
}

function shouldForceRefresh() {
  const lastFetch = localStorage.getItem(IMAGE_META.lastFetch);
  const forceRefresh = localStorage.getItem(IMAGE_META.forceRefresh);
  const currentDeviceId = getOrCreateDeviceId();
  const storedDeviceId = localStorage.getItem(IMAGE_META.deviceId + '_stored');
  
  if (forceRefresh === 'true') {
    localStorage.removeItem(IMAGE_META.forceRefresh);
    return true;
  }
  
  if (storedDeviceId && storedDeviceId !== currentDeviceId) {
    console.log('设备变更，强制刷新图片');
    return true;
  }
  
  if (lastFetch) {
    const elapsed = Date.now() - parseInt(lastFetch);
    const oneHour = 60 * 60 * 1000;
    if (elapsed > oneHour) {
      console.log('超过1小时未刷新，强制刷新图片');
      return true;
    }
  } else {
    return true;
  }
  
  return false;
}

function updateImageMeta(urlKey) {
  localStorage.setItem(IMAGE_META.lastFetch, Date.now().toString());
  localStorage.setItem(IMAGE_META.deviceId + '_stored', getOrCreateDeviceId());
}

function setForceRefresh() {
  localStorage.setItem(IMAGE_META.forceRefresh, 'true');
}

const imageBase64Cache = {};

async function loadImageAsBase64(url, retryCount = 3, useTencentFallback = true) {
  const maxRetries = retryCount;
  let lastError = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // 使用AbortController实现3秒超时
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      let response;
      try {
        response = await fetch(url, {
          mode: 'cors',
          credentials: 'omit',
          cache: 'no-cache',
          signal: controller.signal
        });
      } catch (corsError) {
        clearTimeout(timeoutId);
        console.log(`[图片加载] 尝试 ${attempt + 1}/${maxRetries + 1}: CORS模式失败，尝试no-cors模式:`, corsError);
        try {
          const noCorsController = new AbortController();
          const noCorsTimeoutId = setTimeout(() => noCorsController.abort(), 3000);
          
          response = await fetch(url, {
            mode: 'no-cors',
            credentials: 'omit',
            cache: 'no-cache',
            signal: noCorsController.signal
          });
          
          clearTimeout(noCorsTimeoutId);
          
          if (response.type === 'opaque') {
            console.log(`[图片加载] 尝试 ${attempt + 1}/${maxRetries + 1}: 使用no-cors模式成功，直接返回原始URL`);
            return url;
          }
        } catch (noCorsError) {
          clearTimeout(timeoutId);
          console.log(`[图片加载] 尝试 ${attempt + 1}/${maxRetries + 1}: no-cors模式也失败:`, noCorsError);
          throw noCorsError;
        }
      }
      
      clearTimeout(timeoutId);
      
      if (!response.ok && response.type !== 'opaque') {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      if (response.type === 'opaque') {
        console.log(`[图片加载] 尝试 ${attempt + 1}/${maxRetries + 1}: 使用no-cors模式成功`);
        return url;
      }
      
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log(`[图片加载] 尝试 ${attempt + 1}/${maxRetries + 1}: 成功`);
          resolve(reader.result);
        };
        reader.onerror = () => {
          console.log(`[图片加载] 尝试 ${attempt + 1}/${maxRetries + 1}: FileReader错误`);
          reject(new Error('FileReader error'));
        };
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      lastError = e;
      console.error(`[图片加载] 尝试 ${attempt + 1}/${maxRetries + 1} 失败:`, url, e);
      
      // 如果是404错误且启用了腾讯云回退，尝试使用腾讯云URL
      if (useTencentFallback && e.message && (e.message.includes('404') || e.message.includes('Failed to fetch') || e.name === 'AbortError')) {
        console.log('[图片加载] Cloudflare加载失败或超时，尝试从腾讯云加载');
        
        // 尝试从腾讯云加载
        const tencentUrl = await getTencentImageUrl(url);
        if (tencentUrl) {
          console.log('[图片加载] 使用腾讯云URL:', tencentUrl);
          return loadImageAsBase64(tencentUrl, 0, false);
        }
      }
      
      // 如果是网络错误且还有重试次数，则重试
      if (attempt < maxRetries && (e.name === 'AbortError' || e.message.includes('Failed to fetch') || e.message.includes('Connection closed'))) {
        console.log(`[图片加载] 网络错误，等待后重试，剩余次数: ${maxRetries - attempt}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
      
      break;
    }
  }
  
  // 所有方法都失败时，直接返回原始URL（img标签可以直接加载）
  console.log('[图片加载] 所有重试失败，直接返回原始URL');
  return url;
}

// 从Cloudflare URL获取对应的腾讯云URL
async function getTencentImageUrl(cloudflareUrl) {
  if (!cloudflareUrl) return null;
  
  console.log('尝试获取腾讯云URL:', cloudflareUrl);
  
  // 优先检查state中是否有fileID
  if (state && state.businessInfo) {
    const userId = localStorage.getItem('postdiy_user_id');
    if (cloudflareUrl.includes('logo') && state.businessInfo.logoFileID) {
      console.log('使用logoFileID获取腾讯云URL');
      const tencentUrl = await getTempUrlFromFileID(state.businessInfo.logoFileID);
      if (tencentUrl) {
        console.log('获取到腾讯云logo URL:', tencentUrl);
        return tencentUrl;
      }
    }
    if (cloudflareUrl.includes('qrcode') && state.businessInfo.qrcodeFileID) {
      console.log('使用qrcodeFileID获取腾讯云URL');
      const tencentUrl = await getTempUrlFromFileID(state.businessInfo.qrcodeFileID);
      if (tencentUrl) {
        console.log('获取到腾讯云qrcode URL:', tencentUrl);
        return tencentUrl;
      }
    }
  }
  
  // 尝试从本地缓存获取fileID
  const userId = localStorage.getItem('postdiy_user_id');
  console.log('userId:', userId);
  if (userId) {
    try {
      const cache = JSON.parse(localStorage.getItem('vipBusinessInfo_' + userId));
      console.log('本地缓存:', cache);
      if (cache) {
        if (cloudflareUrl.includes('logo') && cache.logoFileID) {
          console.log('使用缓存中的logoFileID获取腾讯云URL');
          const tencentUrl = await getTempUrlFromFileID(cache.logoFileID);
          if (tencentUrl) {
            console.log('获取到腾讯云logo URL:', tencentUrl);
            return tencentUrl;
          }
        }
        if (cloudflareUrl.includes('qrcode') && cache.qrcodeFileID) {
          console.log('使用缓存中的qrcodeFileID获取腾讯云URL');
          const tencentUrl = await getTempUrlFromFileID(cache.qrcodeFileID);
          if (tencentUrl) {
            console.log('获取到腾讯云qrcode URL:', tencentUrl);
            return tencentUrl;
          }
        }
      }
    } catch (e) {
      console.error('读取腾讯云URL缓存失败:', e);
    }
  }
  
  // 如果本地缓存中没有fileID，尝试从Cloudflare URL推断腾讯云URL
  // Cloudflare URL: https://pub-30c6f2f6d33a4cf0b874265d80d1e682.r2.dev/user-images/7a85e5d469ba9124000882d078de5752/logo.webp?t=xxx
  // 腾讯云 URL: https://postdiyavatar-1308395249.cos.ap-guangzhou.myqcloud.com/user-images/7a85e5d469ba9124000882d078de5752/logo_1234567890.jpg
  if (cloudflareUrl.includes('logo')) {
    // 从Cloudflare URL中提取用户ID和文件名
    const match = cloudflareUrl.match(/user-images\/([^/]+)\/logo\.webp/);
    if (match) {
      const userId = match[1];
      // 尝试常见的腾讯云logo URL格式
      const commonTencentUrls = [
        `https://postdiyavatar-1308395249.cos.ap-guangzhou.myqcloud.com/user-images/${userId}/logo.jpg`,
        `https://postdiyavatar-1308395249.cos.ap-guangzhou.myqcloud.com/user-images/${userId}/logo_1773941747275.jpg`
      ];
      console.log('尝试推断腾讯云logo URL:', commonTencentUrls);
      return commonTencentUrls[0]; // 返回第一个尝试的URL
    }
  }
  
  if (cloudflareUrl.includes('qrcode')) {
    // 从Cloudflare URL中提取用户ID和文件名
    const match = cloudflareUrl.match(/user-images\/([^/]+)\/qrcode\.webp/);
    if (match) {
      const userId = match[1];
      // 尝试常见的腾讯云qrcode URL格式
      const commonTencentUrls = [
        `https://postdiyavatar-1308395249.cos.ap-guangzhou.myqcloud.com/user-images/${userId}/qrcode.jpg`,
        `https://postdiyavatar-1308395249.cos.ap-guangzhou.myqcloud.com/user-images/${userId}/qrcode_1773941769041.jpg`
      ];
      console.log('尝试推断腾讯云qrcode URL:', commonTencentUrls);
      return commonTencentUrls[0]; // 返回第一个尝试的URL
    }
  }
  
  console.log('未找到腾讯云URL');
  return null;
}

function saveToCache(key, base64) {
  try {
    localStorage.setItem(key, base64);
  } catch (e) {
    console.error('保存缓存失败:', key, e);
  }
}

function getFromCache(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error('读取缓存失败:', key, e);
    return null;
  }
}

// 腾讯云云开发 SDK 初始化
async function initTencentCloud() {
  if (!window.tencentCloudApp && typeof cloudbase !== 'undefined') {
    try {
      window.tencentCloudApp = cloudbase.init({
        env: 'postdiy-0g2mftaf6a0fc450'
      });
      console.log('腾讯云云开发 SDK 初始化成功');
      
      // 匿名登录
      try {
        await window.tencentCloudApp.auth().signInAnonymously();
        console.log('腾讯云匿名登录成功');
      } catch (e) {
        console.warn('腾讯云匿名登录失败:', e);
      }
    } catch (e) {
      console.error('腾讯云云开发 SDK 初始化失败:', e);
    }
  }
  return window.tencentCloudApp;
}

// 从 fileID 获取临时 URL
async function getTempUrlFromFileID(fileID) {
  if (!fileID) return null;
  
  // 初始化腾讯云 SDK
  const app = initTencentCloud();
  if (!app) {
    console.error('腾讯云 SDK 未初始化');
    return null;
  }
  
  try {
    console.log('从 fileID 获取临时 URL:', fileID);
    const { fileList } = await app.getTempFileURL({
      fileList: [fileID],
      maxAge: 3600 // 1小时
    });
    
    const tempUrl = fileList[0].tempFileURL;
    console.log('获取到临时 URL:', tempUrl);
    return tempUrl;
  } catch (e) {
    console.error('从 fileID 获取临时 URL 失败:', e);
    return null;
  }
}

// 从数据库获取图片的 fileID 并换取临时 URL
async function getImageUrlFromDB(imageType) {
  const userId = localStorage.getItem('postdiy_user_id');
  if (!userId) return null;
  
  try {
    const response = await fetch(API_BASE_URL + '/user-get-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    
    const result = await response.json();
    if (result.success && result.data) {
      const fileID = imageType === 'logo' ? result.data.logoFileID : result.data.qrcodeFileID;
      if (fileID) {
        console.log(`从数据库获取到 ${imageType} 的 fileID:`, fileID);
        return await getTempUrlFromFileID(fileID);
      }
    }
  } catch (e) {
    console.error(`获取 ${imageType} 图片 URL 失败:`, e);
  }
  
  return null;
}

async function initImagesWithCache() {
  const logoImg = document.getElementById('posterLogoImg');
  const qrImg = document.getElementById('posterQrcodeImg');

  const cachedLogo = getFromCache(IMAGE_CACHE_KEYS.logo);
  const cachedQr = getFromCache(IMAGE_CACHE_KEYS.qrcode);
  const needRefresh = shouldForceRefresh();

  if (logoImg) {
    if (cachedLogo && cachedLogo.startsWith('data:image') && !needRefresh) {
      logoImg.src = cachedLogo;
    } else if (logoImg.dataset.cloudUrl) {
      // 使用延迟加载策略
      lazyLoadImage(logoImg, 'logo', logoImg.dataset.cloudUrl);
    }
    logoImg.onerror = function() {
      console.error('Logo图片加载失败，显示默认图片');
      logoImg.src = 'images/statics/logo-default.gif';
    };
  }

  if (qrImg) {
    if (cachedQr && cachedQr.startsWith('data:image') && !needRefresh) {
      qrImg.src = cachedQr;
    } else if (qrImg.dataset.cloudUrl) {
      // 使用延迟加载策略
      lazyLoadImage(qrImg, 'qrcode', qrImg.dataset.cloudUrl);
    }
    qrImg.onerror = function() {
      console.error('二维码图片加载失败，显示默认图片');
      qrImg.src = 'images/statics/qrcode-default.gif';
    };
  }
}

// 延迟加载图片（使用 Intersection Observer）
function lazyLoadImage(imgElement, imageType, cloudflareUrl) {
  // 先检查缓存状态
  const cacheStatus = getCacheStatus(imageType);
  const cachedData = getFromCache(IMAGE_CACHE_KEYS[imageType]);
  
  // 如果有缓存，直接使用缓存
  if (cachedData && cachedData.startsWith('data:image')) {
    console.log(`[延迟加载] ${imageType}: 使用缓存`);
    imgElement.src = cachedData;
    
    // 如果缓存过期但在宽限期内，后台更新
    if (cacheStatus.status === CACHE_STATUS.STALE) {
      const fileID = window.editorState?.businessInfo?.[imageType + 'FileID'];
      updateImageInBackground(imageType, cloudflareUrl, fileID, IMAGE_CACHE_KEYS[imageType]);
    }
    return;
  }
  
  // 无缓存，使用 Intersection Observer 延迟加载
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(`[延迟加载] ${imageType}: 进入视口，开始加载`);
          const img = entry.target;
          const fileID = window.editorState?.businessInfo?.[imageType + 'FileID'];
          fetchAndCacheImage(img, imageType, cloudflareUrl, fileID, IMAGE_CACHE_KEYS[imageType]);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px',  // 提前100px开始加载
      threshold: 0.01
    });
    
    observer.observe(imgElement);
    console.log(`[延迟加载] ${imageType}: 已注册观察器`);
  } else {
    // 不支持 Intersection Observer，直接加载
    console.log(`[延迟加载] ${imageType}: 浏览器不支持，直接加载`);
    const fileID = window.editorState?.businessInfo?.[imageType + 'FileID'];
    fetchAndCacheImage(imgElement, imageType, cloudflareUrl, fileID, IMAGE_CACHE_KEYS[imageType]);
  }
}

// 图片加载策略：Cloudflare 优先，腾讯云回退（支持分级缓存）
async function loadImageWithFallback(imgElement, imageType, cloudflareUrl) {
  const fileID = window.editorState?.businessInfo?.[imageType + 'FileID'];
  const cacheKey = IMAGE_CACHE_KEYS[imageType];
  
  // 检查缓存状态
  const cacheStatus = getCacheStatus(imageType);
  const cachedData = getFromCache(cacheKey);
  
  console.log(`[缓存策略] ${imageType}: 状态=${cacheStatus.status}, 缓存=${cachedData ? '有' : '无'}`);
  
  // 策略1：新鲜缓存，直接使用
  if (cacheStatus.status === CACHE_STATUS.FRESH && cachedData && cachedData.startsWith('data:image')) {
    console.log(`[缓存策略] ${imageType}: 使用新鲜缓存`);
    imgElement.src = cachedData;
    return true;
  }
  
  // 策略2：过期但在宽限期内，先显示旧缓存，后台更新
  if (cacheStatus.status === CACHE_STATUS.STALE && cachedData && cachedData.startsWith('data:image')) {
    console.log(`[缓存策略] ${imageType}: 使用过期缓存，后台更新`);
    imgElement.src = cachedData;
    
    // 后台更新（不阻塞）
    updateImageInBackground(imageType, cloudflareUrl, fileID, cacheKey);
    return true;
  }
  
  // 策略3：完全过期或无缓存，同步获取
  console.log(`[加载策略] ${imageType}: 同步获取图片`);
  return await fetchAndCacheImage(imgElement, imageType, cloudflareUrl, fileID, cacheKey);
}

// 后台更新图片
async function updateImageInBackground(imageType, cloudflareUrl, fileID, cacheKey) {
  console.log(`[后台更新] ${imageType}: 开始后台更新`);
  
  try {
    // 第一步：尝试 Cloudflare（免费）
    let imageData = null;
    let source = 'cloudflare';
    
    try {
      imageData = await loadImageAsBase64(cloudflareUrl, 1, false);
      if (imageData && imageData.startsWith('data:image')) {
        console.log(`[后台更新] ${imageType}: Cloudflare 成功`);
      } else {
        imageData = null;
      }
    } catch (cfErr) {
      console.log(`[后台更新] ${imageType}: Cloudflare 失败 - ${cfErr.message}`);
    }
    
    // 第二步：回退到腾讯云（付费）
    if (!imageData && fileID) {
      console.log(`[后台更新] ${imageType}: 回退到腾讯云`);
      try {
        const tempUrl = await getTempUrlFromFileID(fileID);
        if (tempUrl) {
          imageData = await loadImageAsBase64(tempUrl, 0, false);
          source = 'tencent';
          console.log(`[后台更新] ${imageType}: 腾讯云成功`);
        }
      } catch (txErr) {
        console.error(`[后台更新] ${imageType}: 腾讯云失败 - ${txErr.message}`);
      }
    }
    
    // 更新缓存
    if (imageData && imageData.startsWith('data:image')) {
      saveToCache(cacheKey, imageData);
      saveCacheMeta(imageType, source);
      console.log(`[后台更新] ${imageType}: 缓存已更新`);
    }
  } catch (e) {
    console.error(`[后台更新] ${imageType}: 更新失败 -`, e);
  }
}

// 同步获取并缓存图片
async function fetchAndCacheImage(imgElement, imageType, cloudflareUrl, fileID, cacheKey) {
  // 第一步：尝试从 Cloudflare 加载（免费）
  console.log(`[加载策略] ${imageType}: 尝试从 Cloudflare 加载（免费）`);
  
  try {
    imgElement.src = cloudflareUrl;
    
    // 等待图片加载
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Cloudflare 加载超时'));
      }, 3000); // 3秒超时
      
      imgElement.onload = () => {
        clearTimeout(timeout);
        console.log(`[加载策略] ${imageType}: Cloudflare 加载成功`);
        resolve();
      };
      
      imgElement.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Cloudflare 加载失败'));
      };
    });
    
    // Cloudflare 加载成功，缓存图片
    try {
      const base64 = await loadImageAsBase64(cloudflareUrl, 0, false);
      if (base64 && base64.startsWith('data:image')) {
        saveToCache(cacheKey, base64);
        saveCacheMeta(imageType, 'cloudflare');
        console.log(`[加载策略] ${imageType}: Cloudflare 图片已缓存`);
      }
    } catch (cacheErr) {
      console.log(`[加载策略] ${imageType}: 缓存失败，但图片已显示`);
    }
    
    // 等待图片加载完成
    await waitForImageLoad(imgElement, 5000);
    
    return true;
    
  } catch (cloudflareError) {
    console.log(`[加载策略] ${imageType}: Cloudflare 失败 - ${cloudflareError.message}`);
    
    // 第二步：回退到腾讯云（付费）
    if (fileID) {
      console.log(`[加载策略] ${imageType}: 回退到腾讯云（付费）`);
      
      try {
        const tencentUrl = await getTempUrlFromFileID(fileID);
        
        if (tencentUrl) {
          imgElement.src = tencentUrl;
          
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('腾讯云加载超时'));
            }, 15000);
            
            imgElement.onload = () => {
              clearTimeout(timeout);
              console.log(`[加载策略] ${imageType}: 腾讯云加载成功`);
              resolve();
            };
            
            imgElement.onerror = () => {
              clearTimeout(timeout);
              reject(new Error('腾讯云加载失败'));
            };
          });
          
          // 缓存腾讯云图片
          try {
            const base64 = await loadImageAsBase64(tencentUrl, 0, false);
            if (base64 && base64.startsWith('data:image')) {
              saveToCache(cacheKey, base64);
              saveCacheMeta(imageType, 'tencent');
            }
          } catch (cacheErr) {
            console.log(`[加载策略] ${imageType}: 腾讯云缓存失败`);
          }
          
          // 等待图片加载完成
          await waitForImageLoad(imgElement, 5000);
          
          return true;
        }
      } catch (tencentError) {
        console.error(`[加载策略] ${imageType}: 腾讯云也失败 - ${tencentError.message}`);
      }
    } else {
      console.log(`[加载策略] ${imageType}: 无 fileID，无法回退到腾讯云`);
    }
    
    // 所有方法都失败，显示默认图片
    imgElement.src = `images/statics/${imageType === 'logo' ? 'logo' : 'qrcode'}-default.gif`;
    return false;
  }
}

async function refreshImagesFromCloud() {
  const logoImg = document.getElementById('posterLogoImg');
  const qrImg = document.getElementById('posterQrcodeImg');

  const loadPromises = [];
  
  if (logoImg && logoImg.dataset.cloudUrl) {
    loadPromises.push((async () => {
      try {
        // Cloudflare 优先，腾讯云回退
        const logoFileID = window.editorState?.businessInfo?.logoFileID;
        let imageData = null;
        
        // 第一步：尝试 Cloudflare（免费）
        console.log('[刷新] Logo: 尝试 Cloudflare');
        try {
          imageData = await loadImageAsBase64(logoImg.dataset.cloudUrl, 1, false);
          if (imageData && imageData.startsWith('data:image')) {
            console.log('[刷新] Logo: Cloudflare 成功');
          } else {
            imageData = null;
          }
        } catch (cfErr) {
          console.log('[刷新] Logo: Cloudflare 失败 -', cfErr.message);
        }
        
        // 第二步：回退到腾讯云（付费）
        if (!imageData && logoFileID) {
          console.log('[刷新] Logo: 回退到腾讯云');
          try {
            const tempUrl = await getTempUrlFromFileID(logoFileID);
            if (tempUrl) {
              imageData = await loadImageAsBase64(tempUrl, 0, false);
              console.log('[刷新] Logo: 腾讯云成功');
            }
          } catch (txErr) {
            console.error('[刷新] Logo: 腾讯云失败 -', txErr.message);
          }
        }
        
        if (imageData && imageData.startsWith('data:image')) {
          saveToCache(IMAGE_CACHE_KEYS.logo, imageData);
          updateImageMeta();
          logoImg.src = imageData;
          console.log('Logo图片刷新成功');
          // 等待图片加载完成
          await waitForImageLoad(logoImg, 5000);
        } else {
          logoImg.src = 'images/statics/logo-default.gif';
        }
      } catch (e) {
        console.error('刷新Logo缓存失败:', e);
        logoImg.src = 'images/statics/logo-default.gif';
      }
    })());
  }

  if (qrImg && qrImg.dataset.cloudUrl) {
    loadPromises.push((async () => {
      try {
        // Cloudflare 优先，腾讯云回退
        const qrcodeFileID = window.editorState?.businessInfo?.qrcodeFileID;
        let imageData = null;
        
        // 第一步：尝试 Cloudflare（免费）
        console.log('[刷新] 二维码: 尝试 Cloudflare');
        try {
          imageData = await loadImageAsBase64(qrImg.dataset.cloudUrl, 1, false);
          if (imageData && imageData.startsWith('data:image')) {
            console.log('[刷新] 二维码: Cloudflare 成功');
          } else {
            imageData = null;
          }
        } catch (cfErr) {
          console.log('[刷新] 二维码: Cloudflare 失败 -', cfErr.message);
        }
        
        // 第二步：回退到腾讯云（付费）
        if (!imageData && qrcodeFileID) {
          console.log('[刷新] 二维码: 回退到腾讯云');
          try {
            const tempUrl = await getTempUrlFromFileID(qrcodeFileID);
            if (tempUrl) {
              imageData = await loadImageAsBase64(tempUrl, 0, false);
              console.log('[刷新] 二维码: 腾讯云成功');
            }
          } catch (txErr) {
            console.error('[刷新] 二维码: 腾讯云失败 -', txErr.message);
          }
        }
        
        if (imageData && imageData.startsWith('data:image')) {
          saveToCache(IMAGE_CACHE_KEYS.qrcode, imageData);
          updateImageMeta();
          qrImg.src = imageData;
          console.log('二维码图片刷新成功');
          // 等待图片加载完成
          await waitForImageLoad(qrImg, 5000);
        } else {
          qrImg.src = 'images/statics/qrcode-default.gif';
        }
      } catch (e) {
        console.error('刷新二维码缓存失败:', e);
        qrImg.src = 'images/statics/qrcode-default.gif';
      }
    })());
  }
  
  await Promise.allSettled(loadPromises);
}

window.forceRefreshImages = async function() {
  console.log('[强制刷新] 开始强制刷新图片...');
  
  // 清空所有图片缓存
  localStorage.removeItem(IMAGE_CACHE_KEYS.logo);
  localStorage.removeItem(IMAGE_CACHE_KEYS.qrcode);
  localStorage.removeItem('imageMeta_logo');
  localStorage.removeItem('imageMeta_qrcode');
  localStorage.removeItem('imageMeta_lastFetch');
  localStorage.removeItem('imageMeta_forceRefresh');
  localStorage.removeItem('imageMeta_deviceId');
  localStorage.removeItem('imageMeta_deviceId_stored');
  
  console.log('[强制刷新] 所有图片缓存已清除');
  
  setForceRefresh();
  await refreshImagesFromCloud();
  
  if (elements.logoPreviewImg && state.businessInfo.logo) {
    // Cloudflare 优先，腾讯云回退
    const logoFileID = state.businessInfo.logoFileID;
    let imageData = null;
    
    // 第一步：尝试 Cloudflare（免费）
    console.log('[强制刷新] Logo: 尝试 Cloudflare');
    try {
      imageData = await loadImageAsBase64(state.businessInfo.logo, 1, true);
      if (imageData && imageData.startsWith('data:image')) {
        console.log('[强制刷新] Logo: Cloudflare 成功');
      } else {
        imageData = null;
      }
    } catch (cfErr) {
      console.log('[强制刷新] Logo: Cloudflare 失败 -', cfErr.message);
    }
    
    // 第二步：回退到腾讯云（付费）
    if (!imageData && logoFileID) {
      console.log('[强制刷新] Logo: 回退到腾讯云');
      try {
        const tempUrl = await getTempUrlFromFileID(logoFileID);
        if (tempUrl) {
          imageData = await loadImageAsBase64(tempUrl, 0, false);
          console.log('[强制刷新] Logo: 腾讯云成功');
        }
      } catch (txErr) {
        console.error('[强制刷新] Logo: 腾讯云失败 -', txErr.message);
      }
    }
    
    // 检查返回的是base64还是URL
    if (imageData) {
      if (imageData.startsWith('data:image')) {
        saveToCache(IMAGE_CACHE_KEYS.logo, imageData);
        elements.logoPreviewImg.src = imageData;
      } else {
        elements.logoPreviewImg.src = imageData;
        console.log('Logo使用原始URL（CORS限制）');
      }
    }
  }
  
  if (elements.qrcodePreviewImg && state.businessInfo.qrcode) {
    // Cloudflare 优先，腾讯云回退
    const qrcodeFileID = state.businessInfo.qrcodeFileID;
    let imageData = null;
    
    // 第一步：尝试 Cloudflare（免费）
    console.log('[强制刷新] 二维码: 尝试 Cloudflare');
    try {
      imageData = await loadImageAsBase64(state.businessInfo.qrcode, 1, true);
      if (imageData && imageData.startsWith('data:image')) {
        console.log('[强制刷新] 二维码: Cloudflare 成功');
      } else {
        imageData = null;
      }
    } catch (cfErr) {
      console.log('[强制刷新] 二维码: Cloudflare 失败 -', cfErr.message);
    }
    
    // 第二步：回退到腾讯云（付费）
    if (!imageData && qrcodeFileID) {
      console.log('[强制刷新] 二维码: 回退到腾讯云');
      try {
        const tempUrl = await getTempUrlFromFileID(qrcodeFileID);
        if (tempUrl) {
          imageData = await loadImageAsBase64(tempUrl, 0, false);
          console.log('[强制刷新] 二维码: 腾讯云成功');
        }
      } catch (txErr) {
        console.error('[强制刷新] 二维码: 腾讯云失败 -', txErr.message);
      }
    }
    
    // 检查返回的是base64还是URL
    if (imageData) {
      if (imageData.startsWith('data:image')) {
        saveToCache(IMAGE_CACHE_KEYS.qrcode, imageData);
        elements.qrcodePreviewImg.src = imageData;
      } else {
        elements.qrcodePreviewImg.src = imageData;
        console.log('二维码使用原始URL（CORS限制）');
      }
    }
  }
  
  console.log('[强制刷新] 图片刷新完成');
};

async function updateImageCache(imgId, key, newUrl) {
  const img = document.getElementById(imgId);
  if (!img) return;

  try {
    const base64 = await loadImageAsBase64(newUrl);
    saveToCache(key, base64);
    img.src = base64;
  } catch (e) {
    console.error('更新图片缓存失败:', e);
  }
}

// 图片裁剪功能 - 全局变量
let cropper = null;
let currentCropTarget = null;

// 模板加载粒子效果 - 全局变量
let templateParticleInterval = null;

// 图片预加载管理器 - 支持优先级和取消
const ThumbnailLoader = {
  currentLoadId: 0,
  loadingImages: new Map(),
  abortController: null,
  timeout: 15000,
  
  generateLoadId() {
    return ++this.currentLoadId;
  },
  
  cancelCurrentLoad() {
    this.loadingImages.forEach((img, key) => {
      img.src = '';
      img.onload = null;
      img.onerror = null;
    });
    this.loadingImages.clear();
  },
  
  async loadThumbnail(img, url, fallbackUrl, loadId, priority = 0) {
    if (loadId !== this.currentLoadId) {
      return false;
    }

    // 跳过已知失败的 CDN URL，避免反复请求造成 404 风暴
    if (window.imageConfig && window.imageConfig.isFailed(url)) {
      img.classList.remove('loading');
      const spinner = img.parentElement?.querySelector('.thumbnail-spinner');
      if (spinner) spinner.remove();
      return false;
    }

    const key = url + '_' + loadId;
    this.loadingImages.set(key, img);

    return new Promise((resolve) => {
      let timeoutId = null;
      let resolved = false;

      const cleanup = () => {
        this.loadingImages.delete(key);
        if (timeoutId) clearTimeout(timeoutId);
      };

      const finishLoad = (success) => {
        if (resolved) return;
        resolved = true;
        cleanup();
        img.classList.remove('loading');
        const spinner = img.parentElement?.querySelector('.thumbnail-spinner');
        if (spinner) spinner.remove();
        resolve(success);
      };

      // 链式回退：R2 → 七牛 → 本地 → 放弃
      // fallbackUrl 是 originalPath（如 images/xiaoshu/thumbnails/1.jpg）
      const loadFallback = () => {
        if (resolved) return;
        if (window.imageConfig) {
          // getFallbackUrl 内部会标记当前 URL 失败，并返回下一级 URL
          const nextUrl = window.imageConfig.getFallbackUrl(fallbackUrl);
          if (nextUrl && img.src !== nextUrl) {
            console.log('图片加载失败，回退到下一级:', nextUrl);
            img.src = nextUrl;
            return;
          }
        }
        finishLoad(false);
      };

      img.onload = () => {
        finishLoad(true);
      };

      img.onerror = () => {
        loadFallback();
      };

      timeoutId = setTimeout(() => {
        console.log('图片加载超时，标记失败:', url);
        loadFallback();
      }, this.timeout);

      img.classList.add('loading');
      img.src = url;
    });
  },
  
  async loadBatch(items, loadId, batchSize = 10) {
    if (loadId !== this.currentLoadId) return;
    
    for (let i = 0; i < items.length; i += batchSize) {
      if (loadId !== this.currentLoadId) return;
      
      const batch = items.slice(i, i + batchSize);
      await Promise.all(batch.map(item => 
        this.loadThumbnail(item.img, item.url, item.fallbackUrl, loadId, i)
      ));
      
      if (loadId !== this.currentLoadId) return;
      
      await new Promise(r => setTimeout(r, 50));
    }
  }
};

// 全局状态管理 - 移到最前面确保优先初始化
  let state = {
    currentTemplate: null,
    businessInfo: {
      name: '您的品牌名称',
      logo: null,
      logoTransparent: false,
      qrcode: null,
      promoText: '👇长按加好友/进粉丝福利群！\n🎁这里可以写引流文促销文案或地址/联系方式 📝（点击更改）'
    },
    customBackground: null,
    textColor: '#000000',
    isUploadingLogo: false,
    currentFrame: null,
    pendingFrame: null,
    frameColorAdjust: {
      hue: 0,
      saturation: 0,
      contrast: 0
    },
    pendingFrameColorAdjust: {
      hue: 0,
      saturation: 0,
      contrast: 0
    },
    templateViewMode: 'grid',
    templateSortMode: 'random', // 模板排序模式：'random'随机 或 'original'原始顺序
    currentSlideIndex: 0,
    allTemplatesList: [],
    currentSlideTemplatesList: [],
    slideAutoPlaying: true,
    slideAutoPlayInterval: null
  };
  
  // 弹窗编辑时的临时状态（用于取消时恢复）
  let tempBusinessInfo = null;
  let pendingUploads = { logo: null, qrcode: null };
  let pendingDeletes = { logo: false, qrcode: false };
  let originalTextColor = null;
  let previewTextColor = null;
  let colorConfirmed = false;
  
  // DOM元素缓存
  const elements = {};
  
  // DOM加载完成后初始化编辑器
  document.addEventListener('DOMContentLoaded', function() {
    console.log('海报编辑器初始化...');
    
    // 微信浏览器检测
    window.wechatWarning.init();
    
    // 初始化图片保护功能
    initializeImageProtection();
    
    // 初始化DOM元素缓存
    initializeElements();
    
    // 初始化主题设置（夜间/白天模式）
    initTheme();
    
    // 先从本地存储加载数据
    loadBusinessInfoFromLocalStorage();
    
    // 动态生成行业分类按钮
    initializeIndustryCategories();
    
    // 然后更新显示
    updateBusinessInfoDisplay();
    
    // 初始化图片缓存
    initImagesWithCache();
    
    // 初始化裁剪事件
    initCropperEvents();
    
    // 初始化动态缩放
    initDynamicZoom();
    
    // 初始化下载按钮动画
    initDownloadButtonAnimation();
    
    // 最后绑定事件和初始化
    bindEvents();
    initializeEditor();
  
  // 初始化下载按钮循环动画
  function initDownloadButtonAnimation() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (!downloadBtn) return;
    
    const downloadText = '下载海报';
    const downloadGif = 'images/statics/down.gif';
    let isShowingText = true;
    let animationInterval = null;
    let isAnimating = false;
    
    // 添加淡入淡出样式
    const styleId = 'downloadBtnAnimationStyle';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #downloadBtn {
          transition: opacity 0.5s ease, transform 0.3s ease;
        }
        #downloadBtn.fade-out {
          opacity: 0;
          transform: scale(0.95);
        }
        #downloadBtn.fade-in {
          opacity: 1;
          transform: scale(1);
        }
      `;
      document.head.appendChild(style);
    }
    
    function toggleButtonContent() {
      if (isAnimating) return;
      isAnimating = true;
      
      // 第一步：淡出
      downloadBtn.classList.add('fade-out');
      downloadBtn.classList.remove('fade-in');
      
      // 等待淡出完成（0.5 秒）
      setTimeout(() => {
        // 切换内容
        if (isShowingText) {
          downloadBtn.innerHTML = `<img src="${downloadGif}" alt="下载" style=" height: 29px;">`;
        } else {
          downloadBtn.innerHTML = `<span>${downloadText}</span>`;
        }
        isShowingText = !isShowingText;
        
        // 第二步：淡入
        downloadBtn.classList.remove('fade-out');
        downloadBtn.classList.add('fade-in');
        
        // 等待淡入完成
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      }, 500);
    }
    
    // 启动循环动画（5 秒切换一次）
    function startAnimation() {
      if (animationInterval) clearInterval(animationInterval);
      animationInterval = setInterval(toggleButtonContent, 5000);
    }
    
    // 停止动画
    function stopAnimation() {
      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
      isAnimating = false;
    }
    
    // 恢复为文字
    function resetToText() {
      stopAnimation();
      downloadBtn.innerHTML = `<span>${downloadText}</span>`;
      downloadBtn.classList.remove('fade-out', 'fade-in');
      isShowingText = true;
      isAnimating = false;
    }
    
    // 恢复为下载图标
    function resetToDownloadIcon() {
      stopAnimation();
      downloadBtn.innerHTML = `${window.getSVGIcon ? window.getSVGIcon('download', 'svg-icon') : '<i class="fa fa-download"></i>'} <span>${downloadText}</span>`;
      downloadBtn.classList.remove('fade-out', 'fade-in');
      isShowingText = true;
      isAnimating = false;
    }
    
    // 启动动画
    startAnimation();
    
    // 暴露给外部调用
    window.downloadButtonAnimation = {
      start: startAnimation,
      stop: stopAnimation,
      resetToText: resetToText,
      resetToDownloadIcon: resetToDownloadIcon
    };
  }
  
  // 初始化动态缩放功能
  function initDynamicZoom() {
    const posterFrame = document.getElementById('posterFrame');
    const bottomActions = document.getElementById('bottomActions');
    const editorBody = document.body;
    
    if (!posterFrame) return;
    
    const POSTER_WIDTH = 300;
    const POSTER_HEIGHT = 600;
    const BOTTOM_ACTIONS_HEIGHT = 20;
    const PADDING = 30;
    
    function calculateAndSetZoom() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const availableWidth = windowWidth - PADDING * 2;
      const availableHeight = windowHeight - BOTTOM_ACTIONS_HEIGHT - PADDING * 2;
      
      const scaleX = availableWidth / POSTER_WIDTH;
      const scaleY = availableHeight / POSTER_HEIGHT;
      
      let zoom = Math.min(scaleX, scaleY);
      
      zoom = Math.max(0.5, Math.min(zoom, 2.5));
      
      if (windowWidth <= 768) {
        zoom = Math.min(zoom, 1.2);
      }
      
      editorBody.style.zoom = zoom;
      
      console.log(`动态缩放: 窗口 ${windowWidth}x${windowHeight}, 缩放比例 ${zoom.toFixed(2)}`);
    }
    
    calculateAndSetZoom();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateAndSetZoom, 100);
    });
    
    window.addEventListener('orientationchange', function() {
      setTimeout(calculateAndSetZoom, 200);
    });
  }
  
  // 初始化图片保护功能
  function initializeImageProtection() {
    console.log('初始化图片保护功能...');
    
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
      // 检查是否点击在图片上
      const target = e.target;
      if (target.tagName === 'IMG' && 
          (target.id === 'posterBackground' || 
           target.classList.contains('template-thumbnail') ||
           target.id === 'posterLogoImg' ||
           target.id === 'posterQrcodeImg')) {
        e.preventDefault();
        
        // 显示保护提示
        showProtectionMessage('图片已受保护，禁止右键保存');
        return false;
      }
    });
    
    // 禁用图片拖拽
    document.addEventListener('dragstart', function(e) {
      const target = e.target;
      if (target.tagName === 'IMG' && 
          (target.id === 'posterBackground' || 
           target.classList.contains('template-thumbnail'))) {
        e.preventDefault();
        return false;
      }
    });
    
    // 禁用图片选择
    document.addEventListener('selectstart', function(e) {
      const target = e.target;
      if (target.tagName === 'IMG' && 
          (target.id === 'posterBackground' || 
           target.classList.contains('template-thumbnail'))) {
        e.preventDefault();
        return false;
      }
    });
    
    // 禁用开发者工具中的图片查看
    document.addEventListener('keydown', function(e) {
      // 禁用F12、Ctrl+Shift+I、Ctrl+U等开发者工具快捷键
      if ((e.key === 'F12') || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        showProtectionMessage('开发者工具已禁用');
        return false;
      }
    });
    
    // 添加CSS保护样式
    const style = document.createElement('style');
    style.textContent = `
      /* 图片保护样式 */
      img#posterBackground,
      img.template-thumbnail {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        pointer-events: auto;
        position: relative;
      }
      
      /* 添加保护层 */
      .image-protection-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 9999;
        pointer-events: none;
      }
      
      /* 保护提示消息 */
      .protection-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 16px;
        z-index: 10000;
        animation: fadeInOut 2s ease-in-out;
        display: none;
      }
      
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -60%); }
        20% { opacity: 1; transform: translate(-50%, -50%); }
        80% { opacity: 1; transform: translate(-50%, -50%); }
        100% { opacity: 0; transform: translate(-50%, -40%); }
      }
    `;
    document.head.appendChild(style);
    
    // 创建保护提示消息元素
    const protectionMessage = document.createElement('div');
    protectionMessage.className = 'protection-message';
    protectionMessage.id = 'protectionMessage';
    document.body.appendChild(protectionMessage);
    
    console.log('图片保护功能初始化完成');
  }
  
  // 动态生成行业分类按钮
  function initializeIndustryCategories() {
    if (!elements.industryCategories) return;
    
    console.log('开始动态生成行业分类按钮...');
    
    // 清空容器
    elements.industryCategories.innerHTML = '';
    
    // 从 INDUSTRY_TEMPLATES 中获取所有行业分类
    const categories = Object.keys(INDUSTRY_TEMPLATES);
    
    console.log('找到行业分类:', categories);
    
    // 为每个分类创建按钮
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'industry-category';
      button.setAttribute('data-category', category);
      
      // 获取对应的 emoji 图标
      const icon = INDUSTRY_ICONS && INDUSTRY_ICONS[category] ? INDUSTRY_ICONS[category] : '';
      button.textContent = icon + ' ' + category;
      
      elements.industryCategories.appendChild(button);
    });
    
    // 重新绑定事件
    bindIndustryCategoryEvents();
    
    console.log('行业分类按钮生成完成');
  }
  
  // 绑定行业分类按钮事件
  function bindIndustryCategoryEvents() {
    if (!elements.industryCategories) return;
    
    // 获取所有行业分类按钮
    const categoryButtons = elements.industryCategories.querySelectorAll('.industry-category');
    
    categoryButtons.forEach(category => {
      category.addEventListener('click', function() {
        // 移除所有active类
        categoryButtons.forEach(cat => cat.classList.remove('active'));
        // 添加active类到当前分类
        this.classList.add('active');
        // 打开对应行业的模板弹窗
        const categoryName = this.getAttribute('data-category');
        openIndustryTemplateModal(categoryName);
      });
    });
  }
  
  // 显示保护提示消息
  function showProtectionMessage(message) {
    const messageElement = document.getElementById('protectionMessage');
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.style.display = 'block';
      
      // 2秒后自动隐藏
      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 2000);
    }
  }
  
  // 显示加载动画
  function showLoadingAnimation() {
    if (!elements.posterLoadingOverlay || !elements.loadingLogo) return;
    
    elements.loadingLogo.src = 'images/statics/loading2.gif';
    elements.loadingLogo.style.display = 'block';
    
    // 显示加载动画
    elements.posterLoadingOverlay.classList.remove('hidden');
    
    console.log('显示海报生成加载动画');
  }
  
  // 隐藏加载动画
  function hideLoadingAnimation() {
    if (!elements.posterLoadingOverlay) return;
    
    // 隐藏加载动画
    elements.posterLoadingOverlay.classList.add('hidden');
    
    console.log('隐藏海报生成加载动画');
  }
  
  // 创建单个粒子
  function createTemplateParticle() {
    if (!elements.templateLoadingParticles) {
      console.log('粒子容器不存在');
      return;
    }
    
    const particle = document.createElement('div');
    
    const size = Math.random() * 2 + 1; // 粒子稍小，1-4px
    const left = Math.random() * 100;
    const duration = Math.random() * 0.5 + 1.5; // 动画时长，1.5-3s
    const delay = Math.random() * 0.2;
    
    // 使用更简单的样式，减少渲染负担
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(255,255,255,1), 0 0 12px rgba(255,255,255,0.8);
      left: ${left}%;
      bottom: -15px;
      pointer-events: none;
      z-index: 2;
      display: block;
      animation: templateParticleFloat ${duration}s linear ${delay}s forwards;
    `;
    
    elements.templateLoadingParticles.appendChild(particle);
    
    // 动画结束后移除粒子
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, (duration + delay + 0.3) * 1000);
  }
  
  // 启动粒子效果
  function startTemplateParticles() {
    if (templateParticleInterval) return;
    
    console.log('启动模板加载粒子效果 (优化版)');
    
    // 减少初始粒子数量
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        
        const size = Math.random() * 4 + 3;
        const left = Math.random() * 100;
        const startHeight = Math.random() * 400;
        const duration = Math.random() * 1 + 0.5;
        
        // 更简洁的样式
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(255,255,255,1), 0 0 12px rgba(255,255,255,0.8);
          left: ${left}%;
          bottom: ${-15 + startHeight}px;
          pointer-events: none;
          z-index: 2;
          display: block;
          opacity: ${Math.random() * 0.6 + 0.4};
        `;
        
        if (elements.templateLoadingParticles) {
          elements.templateLoadingParticles.appendChild(particle);
          
          setTimeout(() => {
            particle.style.cssText = `
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              background: #ffffff;
              border-radius: 50%;
              box-shadow: 0 0 6px rgba(255,255,255,1), 0 0 12px rgba(255,255,255,0.8);
              left: ${left}%;
              bottom: ${-15 + startHeight}px;
              pointer-events: none;
              z-index: 2;
              display: block;
              animation: templateParticleFloat ${duration}s linear forwards;
            `;
            
            setTimeout(() => {
              if (particle.parentNode) {
                particle.remove();
              }
            }, duration * 1000);
          }, Math.random() * 300);
        }
      }, i * 80);
    }
    
    // 减少粒子创建频率
    templateParticleInterval = setInterval(createTemplateParticle, 250);
  }
  
  // 停止粒子效果
  function stopTemplateParticles() {
    if (templateParticleInterval) {
      clearInterval(templateParticleInterval);
      templateParticleInterval = null;
    }
    
    // 清空所有粒子
    if (elements.templateLoadingParticles) {
      elements.templateLoadingParticles.innerHTML = '';
    }
  }
  
  // 显示模板加载动画
  function showTemplateLoadingAnimation() {
    console.log('showTemplateLoadingAnimation 被调用');
    console.log('elements.templateLoadingOverlay:', elements.templateLoadingOverlay);
    console.log('elements.templateLoadingParticles:', elements.templateLoadingParticles);
    
    if (!elements.templateLoadingOverlay || !elements.templateLoadingLogo) {
      console.log('缺少必要元素，无法显示加载动画');
      return;
    }
    
    elements.templateLoadingLogo.src = 'images/statics/loading2.gif';
    elements.templateLoadingLogo.style.display = 'block';
    
    // 显示模板加载动画
    elements.templateLoadingOverlay.classList.remove('hidden');
    elements.templateLoadingOverlay.style.display = 'flex';
    
    // 启动粒子效果 - 稍作延迟确保DOM更新
    setTimeout(() => {
      startTemplateParticles();
    }, 50);
    
    console.log('显示模板加载动画完成');
  }
  
  // 隐藏模板加载动画
  function hideTemplateLoadingAnimation() {
    console.log('hideTemplateLoadingAnimation 被调用');
    
    if (!elements.templateLoadingOverlay) return;
    
    // 隐藏模板加载动画
    elements.templateLoadingOverlay.classList.add('hidden');
    
    // 停止粒子效果
    stopTemplateParticles();
    
    console.log('隐藏模板加载动画完成');
  }

  // 初始化DOM元素缓存
  function initializeElements() {
    Object.assign(elements, {
      // 修复：添加缺失的removeBackgroundBtn元素
      removeBackgroundBtn: document.getElementById('removeBackgroundBtn'),
      // 返回按钮
      backToHomeBtn: document.getElementById('backToHomeBtn'),
      
      // 底部按钮
      prevTemplateBtn: document.getElementById('prevTemplateBtn'),
      nextTemplateBtn: document.getElementById('nextTemplateBtn'),
      changeTemplateBtn: document.getElementById('changeTemplateBtn'),
      editBusinessInfoBtn: document.getElementById('editBusinessInfoBtn'),
      uploadBackgroundBtn: document.getElementById('uploadBackgroundBtn'),
      backgroundInput: document.getElementById('backgroundInput'),
      takePhotoBtn: document.getElementById('takePhotoBtn'),
      cameraInput: document.getElementById('cameraInput'),
      frameBtn: document.getElementById('frameBtn'),
      frameModal: document.getElementById('frameModal'),
      frameList: document.getElementById('frameList'),
      frameScrollContainer: document.getElementById('frameScrollContainer'),
      downloadBtn: document.getElementById('downloadBtn'),
      togglePositionBtn: document.getElementById('togglePositionBtn'),
      toggleMenuBtn: document.getElementById('toggleMenuBtn'),
      toggleThemeBtn: document.getElementById('toggleThemeBtn'),
      themeIcon: document.getElementById('themeIcon'),
      bottomActions: document.getElementById('bottomActions'),
      dailySuggestionBtn: document.getElementById('dailySuggestionBtn'),
      
      // 预览区域
      posterFrame: document.getElementById('posterFrame'),
      posterBackground: document.getElementById('posterBackground'),
      posterBusinessName: document.getElementById('posterBusinessName'),
      posterPromoText: document.getElementById('posterPromoText'),
      posterLogo: document.getElementById('posterLogo'),
      posterLogoImg: document.getElementById('posterLogoImg'),
      logoPlaceholder: document.getElementById('logoDefaultImg'),
      logoDefaultImg: document.getElementById('logoDefaultImg'),
      posterQrcode: document.getElementById('posterQrcode'),
      posterQrcodeImg: document.getElementById('posterQrcodeImg'),
      qrcodePlaceholder: document.getElementById('qrcodeDefaultImg'),
      qrcodeDefaultImg: document.getElementById('qrcodeDefaultImg'),
      templateTriggerArea: document.getElementById('templateTriggerArea'),
      
      // 模态框
      templateModal: document.getElementById('templateModal'),
      closeTemplateModalBtn: document.getElementById('closeTemplateModalBtn'),
      cancelTemplateBtn: document.getElementById('cancelTemplateBtn'),
      modalBackToTopBtn: document.getElementById('modalBackToTopBtn'),
      
      // VIP菜单系统
      vipMenuContainer: document.getElementById('vipMenuContainer'),
      vipLoginBtn: document.getElementById('vipLoginBtn'),
      vipLoggedInMenu: document.getElementById('vipLoggedInMenu'),
      vipMenuToggle: document.getElementById('vipMenuToggle'),
      vipDropdownMenu: document.getElementById('vipDropdownMenu'),
      vipMenuItems: document.querySelectorAll('.vip-menu-item'),
      
      // 用户信息弹窗
      userInfoModal: document.getElementById('userInfoModal'),
      closeUserInfoModal: document.getElementById('closeUserInfoModal'),
      closeUserInfoBtn: document.getElementById('closeUserInfoBtn'),
      userInfoId: document.getElementById('userInfoId'),
      userInfoExpiry: document.getElementById('userInfoExpiry'),
      userInfoType: document.getElementById('userInfoType'),

      // 促销信息编辑模态框
      promoTextModal: document.getElementById('promoTextModal'),
      closePromoTextModal: document.getElementById('closePromoTextModal'),
      cancelPromoTextBtn: document.getElementById('cancelPromoTextBtn'),
      savePromoTextBtn: document.getElementById('savePromoTextBtn'),
      promoTextInput: document.getElementById('promoTextInput'), // 促销编辑模态框中的输入框
      promoTemplatesList: document.getElementById('promoTemplatesList'),
      confirmTemplateBtn: document.getElementById('confirmTemplateBtn'),
      templateGrid: document.getElementById('modalTemplatesGrid'),
      templateGalleryContainer: document.getElementById('templateGalleryContainer'),
      templateSlideView: document.getElementById('templateSlideView'),
      templateSlideName: document.getElementById('templateSlideName'),
      templateSlideCounter: document.getElementById('templateSlideCounter'),
      prevTemplateSlide: document.getElementById('prevTemplateSlide'),
      nextTemplateSlide: document.getElementById('nextTemplateSlide'),
      templateGridViewBtn: document.getElementById('templateGridViewBtn'),
      templateSlideViewBtn: document.getElementById('templateSlideViewBtn'),
      templateRandomSortBtn: document.getElementById('templateRandomSortBtn'),
      templateOriginalSortBtn: document.getElementById('templateOriginalSortBtn'),
      slidePlayPauseBtn: document.getElementById('slidePlayPauseBtn'),
      modalMonthButtons: document.getElementById('modalMonthButtons'),
      modalFestivalTags: document.getElementById('modalFestivalTags'),
      modalCurrentDateDisplay: document.getElementById('modalCurrentDateDisplay'),
      modalFestivalDateDisplay: document.getElementById('modalFestivalDateDisplay'),
      
      businessInfoModal: document.getElementById('businessInfoModal'),
      closeBusinessInfoModalBtn: document.getElementById('closeBusinessInfoModalBtn'),
      refreshDataBtn: document.getElementById('refreshDataBtn'),
      saveBusinessInfoBtn: document.getElementById('saveBusinessInfoBtn'),
      businessInfoForm: document.getElementById('businessInfoForm'),
      businessNameInput: document.getElementById('business-name'),
      fontColorSelector: document.getElementById('color-selector'),
      businessPromoTextInput: document.getElementById('promotion-text'), // 商家信息模态框中的促销文本输入框
      selectPromoTemplateBtn: document.getElementById('selectPromoTemplateBtn'), // 选择促销文案模板按钮
      industryTemplateModal: document.getElementById('industryTemplateModal'), // 行业模板独立弹窗
      closeIndustryTemplateModal: document.getElementById('closeIndustryTemplateModal'), // 关闭行业模板弹窗
      industryModalTitle: document.getElementById('industryModalTitle'), // 行业弹窗标题
      industryTemplatesList: document.getElementById('industryTemplatesList'), // 行业模板列表
      logoUploadArea: document.getElementById('logoUploadArea'),
      logoInput: document.getElementById('logoInput'),
      logoPreview: document.getElementById('logoPreview'),
      logoPreviewImg: document.getElementById('logoPreviewImg'),
      removeLogoBtn: document.getElementById('removeLogoBtn'),
      logoTransparencyToggle: document.getElementById('logoTransparencyToggle'),
      qrcodeUploadArea: document.getElementById('qrcodeUploadArea'),
      qrcodeInput: document.getElementById('qrcodeInput'),
      qrcodePreview: document.getElementById('qrcodePreview'),
      qrcodePreviewImg: document.getElementById('qrcodePreviewImg'),
      removeQrcodeBtn: document.getElementById('removeQrcodeBtn'),
      
      // 更改品牌名称按钮
      changeBrandNameBtn: document.getElementById('changeBrandNameBtn'),
      
      // 加载动画元素
      posterLoadingOverlay: document.getElementById('posterLoadingOverlay'),
      loadingLogo: document.getElementById('loadingLogo'),
      templateLoadingOverlay: document.getElementById('templateLoadingOverlay'),
      templateLoadingLogo: document.getElementById('templateLoadingLogo'),
      templateLoadingParticles: document.getElementById('templateLoadingParticles'),
      
      // 字体颜色选择弹窗
      fontColorModal: document.getElementById('fontColorModal'),
      closeFontColorModalBtn: document.getElementById('closeFontColorModalBtn'),
      fontColorModalSelector: document.querySelector('#fontColorModal .color-select-container'),
      confirmFontColorBtn: document.getElementById('confirmFontColorBtn'),
      
      // 行业分类容器
      industryCategories: document.getElementById('industryCategories'),
      
      // 整合行业模板弹窗元素
      integratedIndustryTemplateModal: document.getElementById('integratedIndustryTemplateModal'),
      closeIntegratedIndustryTemplateModal: document.getElementById('closeIntegratedIndustryTemplateModal'),
      integratedModalTitle: document.getElementById('integratedModalTitle'),
      industryCategoriesVertical: document.getElementById('industryCategoriesVertical'),
      integratedIndustryTemplatesList: document.getElementById('integratedIndustryTemplatesList'),
      
      // 文案模板按钮
      promoTemplateBtn: document.getElementById('promoTemplateBtn')
    });
    console.log('DOM元素缓存初始化完成');
  }
  
  // VIP菜单系统功能函数
  function toggleVipDropdown() {
    console.log('toggleVipDropdown 被调用')
    // 直接从 DOM 获取元素
    const vipDropdownMenu = document.getElementById('vipDropdownMenu')
    console.log('vipDropdownMenu (从 DOM 获取):', vipDropdownMenu)
    if (vipDropdownMenu) {
      // 先移除可能存在的 hidden 类
      vipDropdownMenu.classList.remove('hidden')
      
      // 用 style.display 来控制，避免 className 的问题
      const isHidden = vipDropdownMenu.style.display === 'none' || vipDropdownMenu.style.display === ''
      console.log('当前 display:', vipDropdownMenu.style.display)
      console.log('是否隐藏:', isHidden)
      
      if (isHidden) {
        vipDropdownMenu.style.display = 'block'
        console.log('显示下拉菜单 - display 设置为 block')
      } else {
        vipDropdownMenu.style.display = 'none'
        console.log('隐藏下拉菜单 - display 设置为 none')
      }
    } else {
      console.error('vipDropdownMenu 不存在！')
    }
  }
  
  function handleVipMenuItemClick(action) {
    switch (action) {
      case 'userInfo':
        openUserInfoModal();
        break;
      case 'visibilityManager':
        if (window.openVisibilityManager) {
          window.openVisibilityManager();
        }
        break;
    }
    
    const vipDropdownMenu = document.getElementById('vipDropdownMenu')
    if (vipDropdownMenu) {
      vipDropdownMenu.style.display = 'none'
    }
  }
  
  function openUserInfoModal() {
    if (elements.userInfoModal) {
      elements.userInfoModal.classList.remove('hidden');
    }
  }
  
  function closeUserInfoModal() {
    if (elements.userInfoModal) {
      elements.userInfoModal.classList.add('hidden');
    }
  }
  
  function handleVipLogout() {
    showLogoutConfirm()
  }
  
  function showLogoutConfirm() {
    const confirmModal = document.getElementById('confirmModal')
    const confirmTitle = document.getElementById('confirmModalTitle')
    const confirmMessage = document.getElementById('confirmModalMessage')
    const confirmBtn = document.getElementById('confirmModalConfirm')
    const cancelBtn = document.getElementById('confirmModalCancel')
    
    if (!confirmModal) {
      console.error('确认弹窗元素不存在')
      return
    }
    
    confirmTitle.textContent = '退出确认'
    confirmMessage.textContent = '确定要退出登录吗？'
    confirmModal.classList.remove('hidden')
    
    const closeDialog = () => {
      confirmModal.classList.add('hidden')
      confirmBtn.removeEventListener('click', handleConfirm)
      cancelBtn.removeEventListener('click', handleCancel)
    }
    
    const handleConfirm = () => {
      closeDialog()
      executeLogout()
    }
    
    const handleCancel = () => {
      closeDialog()
    }
    
    confirmBtn.addEventListener('click', handleConfirm)
    cancelBtn.addEventListener('click', handleCancel)
  }
  
  function executeLogout() {
    localStorage.clear()
    
    updateVipMenuState(false)
    
    showToast('已退出登录')
    console.log('用户已退出')
    
    setTimeout(() => {
      location.reload()
    }, 1000)
  }
  
  function updateVipMenuState(isLoggedIn, user = null) {
    console.log('updateVipMenuState 被调用，isLoggedIn:', isLoggedIn)
    
    const vipLoginBtn = document.getElementById('vipLoginBtn')
    const vipLoggedInMenu = document.getElementById('vipLoggedInMenu')
    const vipDropdownMenu = document.getElementById('vipDropdownMenu')
    
    console.log('从 DOM 获取的元素:', { vipLoginBtn, vipLoggedInMenu, vipDropdownMenu })
    
    if (vipLoginBtn && vipLoggedInMenu) {
      if (isLoggedIn) {
        // 显示已登录状态
        vipLoginBtn.classList.add('hidden');
        vipLoggedInMenu.classList.remove('hidden');
        // 确保下拉菜单是隐藏的
        if (vipDropdownMenu) {
          console.log('updateVipMenuState - 隐藏下拉菜单，设置 display 为 none')
          vipDropdownMenu.style.display = 'none'
        } else {
          console.error('updateVipMenuState - vipDropdownMenu 不存在！')
        }
        
        // 更新用户信息
        const userInfoId = document.getElementById('userInfoId')
        const userInfoExpiry = document.getElementById('userInfoExpiry')
        const userInfoType = document.getElementById('userInfoType')
        if (user && userInfoId && userInfoExpiry && userInfoType) {
          userInfoId.textContent = user.id;
          userInfoExpiry.textContent = user.validUntil;
          userInfoType.textContent = user.type;
        }
      } else {
        // 显示未登录状态
        vipLoginBtn.classList.remove('hidden');
        vipLoggedInMenu.classList.add('hidden');
        // 确保下拉菜单是隐藏的
        if (vipDropdownMenu) {
          vipDropdownMenu.style.display = 'none'
        }
      }
    }
  }
  
  // 初始化VIP菜单状态
  function initializeVipMenu() {
    console.log('initializeVipMenu 被调用')
    console.log('VIPSystem.isLoggedIn():', typeof VIPSystem !== 'undefined' ? VIPSystem.isLoggedIn() : 'VIPSystem 未定义')
    
    // 检查是否已有VIP登录状态
    const isVipLoggedIn = (typeof VIPSystem !== 'undefined' && VIPSystem.isLoggedIn());
    
    if (isVipLoggedIn) {
      // 如果已登录，直接显示三道杠菜单按钮
      const userInfo = typeof VIPSystem !== 'undefined' ? VIPSystem.getUserInfo() : null;
      const vipUser = {
        id: userInfo ? userInfo.userId : 'VIP用户',
        validUntil: userInfo && userInfo.vipExpireTime ? userInfo.vipExpireTime : '2026-12-31',
        type: userInfo && userInfo.isVip ? 'VIP会员' : '普通用户'
      };
      console.log('显示已登录状态，用户信息:', vipUser)
      updateVipMenuState(true, vipUser);
    } else {
      console.log('显示未登录状态')
      // 否则显示登录按钮
      updateVipMenuState(false);
    }
  }
  
  // 保存促销信息到本地存储
  function saveBusinessInfoToLocalStorage() {
    try {
      console.log('准备保存到本地存储:', state.businessInfo);
      
      const userId = localStorage.getItem('postdiy_user_id') || localStorage.getItem('vipId');
      
      if (userId) {
        const userBusinessInfoKey = `vipBusinessInfo_${userId}`;
        localStorage.setItem(userBusinessInfoKey, JSON.stringify(state.businessInfo));
        console.log('商家信息已保存到用户专属缓存:', userBusinessInfoKey);
      } else {
        localStorage.setItem('posterBusinessInfo', JSON.stringify(state.businessInfo));
        console.log('商家信息已保存到普通缓存');
      }
    } catch (error) {
      console.error('保存本地存储失败:', error);
    }
  }
  
  // 保存VIP商家信息到专属本地存储
  function saveVipBusinessInfoToLocalStorage() {
    try {
      const userId = localStorage.getItem('postdiy_user_id') || localStorage.getItem('vipId');
      if (!userId) {
        console.log('未找到用户ID，无法保存专属缓存');
        return;
      }
      
      const vipBusinessInfoKey = `vipBusinessInfo_${userId}`;
      console.log('准备保存专属缓存，键名:', vipBusinessInfoKey, '数据:', state.businessInfo);
      
      localStorage.setItem(vipBusinessInfoKey, JSON.stringify(state.businessInfo));
      console.log('VIP专属缓存已成功保存');
      
      // 验证保存是否成功
      const testSave = localStorage.getItem(vipBusinessInfoKey);
      if (testSave) {
        console.log('VIP专属缓存保存验证成功，存储的数据:', testSave);
      }
    } catch (error) {
      console.error('保存VIP专属缓存失败:', error);
      alert('VIP信息保存失败，请检查浏览器存储空间');
    }
  }
  
  // 加载备用商家信息（普通用户或VIP缓存失败时的回退方案）
  function loadFallbackBusinessInfo() {
    // 从本地存储加载商家信息 - 与saveBusinessInfoToLocalStorage保持一致的键名
    const savedBusinessInfo = localStorage.getItem('posterBusinessInfo');
    if (savedBusinessInfo) {
      try {
        state.businessInfo = JSON.parse(savedBusinessInfo);
        console.log('从posterBusinessInfo加载成功:', state.businessInfo);
      } catch (e) {
        console.error('加载保存的商家信息失败:', e);
        // 尝试从旧键名迁移数据
        try {
          const oldSavedInfo = localStorage.getItem('businessInfo');
          if (oldSavedInfo) {
            state.businessInfo = JSON.parse(oldSavedInfo);
            console.log('从businessInfo迁移数据:', state.businessInfo);
            // 迁移后保存到新键名
            localStorage.setItem('posterBusinessInfo', oldSavedInfo);
            localStorage.removeItem('businessInfo'); // 清除旧数据
          }
        } catch (ee) {
          console.error('迁移旧数据失败:', ee);
        }
      }
    }
  }
  
  // 从本地存储加载促销信息
  function loadBusinessInfoFromLocalStorage() {
    console.log('=== 开始加载商家信息 ===');
    
    const userId = localStorage.getItem('postdiy_user_id') || localStorage.getItem('vipId');
    
    if (!userId) {
      console.log('用户未登录，使用默认数据');
      loadDefaultBusinessInfo();
      return;
    }
    
    console.log('检测到用户ID:', userId);
    
    const userBusinessInfoKey = `vipBusinessInfo_${userId}`;
    const localData = localStorage.getItem(userBusinessInfoKey);
    
    if (localData) {
      try {
        const parsedInfo = JSON.parse(localData);
        state.businessInfo = {
          ...state.businessInfo,
          ...parsedInfo
        };
        console.log('从本地存储加载完成:', state.businessInfo);
        updateBusinessInfoDisplay();
      } catch (e) {
        console.error('解析本地存储数据失败:', e);
      }
    }
    
    console.log('开始从云端同步最新数据...');
    syncFromCloudAndUpdate(userId, userBusinessInfoKey);
  }
  
  // 从云端同步并更新本地存储
  async function syncFromCloudAndUpdate(userId, cacheKey) {
    if (!window.CloudSync) {
      console.log('CloudSync未加载');
      return;
    }
    
    try {
      const response = await fetch('https://api.peacelove.top/user-get-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const cloudData = result.data;
        console.log('云端数据获取成功:', cloudData);
        
        const newInfo = {
          name: cloudData.brandname || state.businessInfo.name,
          logo: cloudData.logoUrl || state.businessInfo.logo,
          qrcode: cloudData.qrcodeUrl || state.businessInfo.qrcode,
          promoText: cloudData.promoText || state.businessInfo.promoText,
          logoTransparent: cloudData.logoTransparent !== undefined ? cloudData.logoTransparent : (state.businessInfo.logoTransparent || false),
          logoTencentUrl: cloudData.logoTencentUrl || '',
          qrcodeTencentUrl: cloudData.qrcodeTencentUrl || '',
          logoFileID: cloudData.logoFileID || '',
          qrcodeFileID: cloudData.qrcodeFileID || ''
        };
        
        state.businessInfo = newInfo;
        
        localStorage.setItem(cacheKey, JSON.stringify(newInfo));
        console.log('云端数据已保存到本地存储');
        
        updateBusinessInfoDisplay();
        
        const businessNameInput = document.getElementById('business-name');
        if (businessNameInput && newInfo.name) {
          businessNameInput.value = newInfo.name;
        }
        
        if (newInfo.logo && elements.logoPreviewImg && elements.logoPreview && elements.logoUploadArea) {
          elements.logoPreviewImg.src = newInfo.logo;
          elements.logoPreview.style.display = 'block';
          elements.logoUploadArea.style.display = 'none';
          // 显示透明开关并恢复之前的状态
          if (elements.logoTransparencyToggle) {
            elements.logoTransparencyToggle.classList.remove('hidden');
            if (newInfo.logoTransparent) {
              elements.logoTransparencyToggle.classList.add('active');
            } else {
              elements.logoTransparencyToggle.classList.remove('active');
            }
            // 更新滑块文字
            const thumb = elements.logoTransparencyToggle.querySelector('.toggle-thumb');
            if (thumb) {
              thumb.textContent = newInfo.logoTransparent ? '原图' : '圆角';
            }
            updateLogoTransparencyStyle(newInfo.logoTransparent);
            showLogoActionButtons(newInfo.logoTransparent);
          }
        }
        
        if (newInfo.qrcode && elements.qrcodePreviewImg && elements.qrcodePreview && elements.qrcodeUploadArea) {
          elements.qrcodePreviewImg.src = newInfo.qrcode;
          elements.qrcodePreview.style.display = 'block';
          elements.qrcodeUploadArea.style.display = 'none';
        }
        
        console.log('=== 商家信息同步完成 ===');
      }
    } catch (error) {
      console.error('从云端同步数据失败:', error);
    }
  }
  
  // 加载默认商家信息
  function loadDefaultBusinessInfo() {
    state.businessInfo = {
      name: '您的品牌名称',
      logo: null,
      qrcode: null,
      promoText: '👇长按加好友/进粉丝福利群！\n🎁这里可以写引流文促销文案或地址/联系方式 📝（点击更改）'
    };
  }
  
  // 打开行业模板独立弹窗
  function openIndustryTemplateModal(category) {
    if (!elements.industryTemplateModal || !elements.industryModalTitle || !elements.industryTemplatesList) return;
    
    // 设置弹窗标题
    elements.industryModalTitle.textContent = category + '促销文案模板';
    
    // 渲染对应行业的模板
    renderIndustryTemplates(category, elements.industryTemplatesList);
    
    // 移除关闭动画类
    elements.industryTemplateModal.classList.remove('closing');
    elements.industryTemplateModal.querySelector('.modal-container').classList.remove('closing');
    
    // 显示弹窗
    elements.industryTemplateModal.classList.remove('hidden');
    
    // 强制重绘以触发动画
    void elements.industryTemplateModal.offsetWidth;
    
    // 延迟执行，确保DOM已渲染
    setTimeout(() => {
      // 自动播放第一个模板的打字机效果
      const firstTemplateCard = elements.industryTemplatesList.querySelector('.industry-template-card');
      if (firstTemplateCard) {
        const content = firstTemplateCard.querySelector('.industry-template-content');
        const template = firstTemplateCard.querySelector('.industry-template-select-btn').getAttribute('data-template');
        
        // 设置选中状态
        firstTemplateCard.classList.add('selected');
        
        // 触发打字机效果
        startTypewriterEffect(content, template);
      }
      
      // 添加滚动监听
      setupScrollDetection();
    }, 100);
  }
  
  // 关闭行业模板独立弹窗
  function closeIndustryTemplateModal() {
    if (!elements.industryTemplateModal) return;
    
    // 添加关闭动画类
    elements.industryTemplateModal.classList.add('closing');
    elements.industryTemplateModal.querySelector('.modal-container').classList.add('closing');
    
    // 延迟隐藏弹窗
    setTimeout(() => {
      elements.industryTemplateModal.classList.add('hidden');
      // 移除关闭动画类
      elements.industryTemplateModal.classList.remove('closing');
      elements.industryTemplateModal.querySelector('.modal-container').classList.remove('closing');
    }, 400); // 匹配动画时长
  }

  // 打开整合行业模板弹窗
  function openIntegratedIndustryTemplateModal(category = null) {
    if (!elements.integratedIndustryTemplateModal || !elements.integratedModalTitle || !elements.integratedIndustryTemplatesList) return;

    // 如果没有传入分类，从 localStorage 读取最后一次选择的分类，否则默认为"通用"
    if (!category) {
      category = localStorage.getItem('lastSelectedIndustryCategory') || '通用';
    }

    // 设置弹窗标题
    elements.integratedModalTitle.textContent = '行业促销文案模板';

    // 渲染左侧行业分类导航
    renderVerticalIndustryCategories();

    // 渲染对应行业的模板
    renderIndustryTemplates(category, elements.integratedIndustryTemplatesList);

    // 设置当前选中的行业分类
    setActiveVerticalCategory(category);

    // 移除关闭动画类
    elements.integratedIndustryTemplateModal.classList.remove('closing');
    elements.integratedIndustryTemplateModal.querySelector('.modal-container').classList.remove('closing');

    // 显示弹窗
    elements.integratedIndustryTemplateModal.classList.remove('hidden');

    // 强制重绘以触发动画
    void elements.integratedIndustryTemplateModal.offsetWidth;

    // 延迟执行，确保DOM已渲染
    setTimeout(() => {
      // 自动播放第一个模板的打字机效果
      const firstTemplateCard = elements.integratedIndustryTemplatesList.querySelector('.industry-template-card');
      if (firstTemplateCard) {
        const content = firstTemplateCard.querySelector('.industry-template-content');
        const template = firstTemplateCard.querySelector('.industry-template-select-btn').getAttribute('data-template');

        // 设置选中状态
        firstTemplateCard.classList.add('selected');

        // 触发打字机效果
        startTypewriterEffect(content, template);
      }

      // 添加滚动监听
      setupScrollDetection();
    }, 100);
  }

  // 关闭整合行业模板弹窗
  function closeIntegratedIndustryTemplateModal() {
    if (!elements.integratedIndustryTemplateModal) return;
    
    // 添加关闭动画类
    elements.integratedIndustryTemplateModal.classList.add('closing');
    elements.integratedIndustryTemplateModal.querySelector('.modal-container').classList.add('closing');
    
    // 延迟隐藏弹窗
    setTimeout(() => {
      elements.integratedIndustryTemplateModal.classList.add('hidden');
      // 移除关闭动画类
      elements.integratedIndustryTemplateModal.classList.remove('closing');
      elements.integratedIndustryTemplateModal.querySelector('.modal-container').classList.remove('closing');
    }, 400); // 匹配动画时长
  }

  // 渲染垂直行业分类导航
  function renderVerticalIndustryCategories() {
    if (!elements.industryCategoriesVertical) return;

    // 清空现有内容
    elements.industryCategoriesVertical.innerHTML = '';

    // 创建分类按钮的工厂函数（避免重复代码）
    function createCategoryButton(category) {
      const categoryBtn = document.createElement('button');
      categoryBtn.className = 'industry-category-vertical';
      categoryBtn.setAttribute('data-category', category);
      categoryBtn.textContent = `${INDUSTRY_ICONS[category] || '📋'} ${category}`;
      categoryBtn.title = category;

      // 添加点击事件
      categoryBtn.addEventListener('click', function() {
        const selectedCategory = this.getAttribute('data-category');

        // 设置当前选中的行业分类
        setActiveVerticalCategory(selectedCategory);

        // 渲染对应行业的模板
        renderIndustryTemplates(selectedCategory, elements.integratedIndustryTemplatesList);

        // 延迟执行打字机效果
        setTimeout(() => {
          const firstTemplateCard = elements.integratedIndustryTemplatesList.querySelector('.industry-template-card');
          if (firstTemplateCard) {
            const content = firstTemplateCard.querySelector('.industry-template-content');
            const template = firstTemplateCard.querySelector('.industry-template-select-btn').getAttribute('data-template');

            // 移除其他卡片的选中状态
            document.querySelectorAll('.industry-template-card').forEach(card => {
              card.classList.remove('selected');
              const content = card.querySelector('.industry-template-content');
              content.classList.remove('typewriter');
              content.textContent = INDUSTRY_TEMPLATES[selectedCategory][Array.from(card.parentNode.children).indexOf(card)];
            });

            // 设置选中状态
            firstTemplateCard.classList.add('selected');

            // 触发打字机效果
            startTypewriterEffect(content, template);
          }
        }, 50);
      });

      return categoryBtn;
    }

    // 1. 先渲染"通用"分类按钮（不归入任何分组，单独置于顶部）
    if (INDUSTRY_TEMPLATES['通用']) {
      elements.industryCategoriesVertical.appendChild(createCategoryButton('通用'));
    }

    // 2. 按分组渲染其他行业分类，每组前插入一个不可点击的分组标题
    if (typeof INDUSTRY_CATEGORIES_GROUPED !== 'undefined') {
      INDUSTRY_CATEGORIES_GROUPED.forEach(group => {
        // 插入分组标题（不可点击的视觉分隔条）
        const groupTitle = document.createElement('div');
        groupTitle.className = 'industry-category-group-title';
        groupTitle.textContent = group.title;
        groupTitle.setAttribute('aria-disabled', 'true');
        elements.industryCategoriesVertical.appendChild(groupTitle);

        // 渲染该分组下的所有分类按钮
        group.categories.forEach(category => {
          if (!INDUSTRY_TEMPLATES[category]) return; // 跳过不存在的分类
          elements.industryCategoriesVertical.appendChild(createCategoryButton(category));
        });
      });
    } else {
      // 降级方案：未定义分组时，按原逻辑渲染所有分类（排除已在顶部渲染的"通用"）
      Object.keys(INDUSTRY_TEMPLATES).forEach(category => {
        if (category === '通用') return;
        elements.industryCategoriesVertical.appendChild(createCategoryButton(category));
      });
    }
  }

  // 设置当前选中的垂直行业分类
  function setActiveVerticalCategory(category) {
    // 移除所有按钮的选中状态
    document.querySelectorAll('.industry-category-vertical').forEach(btn => {
      btn.classList.remove('active');
    });

    // 设置当前按钮的选中状态
    const activeBtn = document.querySelector(`.industry-category-vertical[data-category="${category}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    // 保存最后一次选择的分类到 localStorage
    localStorage.setItem('lastSelectedIndustryCategory', category);
  }
  
  // 渲染指定行业的文案模板到指定容器
  function renderIndustryTemplates(category, container) {
    if (!container) return;
    
    // 清空现有内容
    container.innerHTML = '';

    // 重置滚动位置到顶部，确保新分类从第一张卡片开始显示
    container.scrollTop = 0;

    const templates = INDUSTRY_TEMPLATES[category];
    if (!templates) return;
    
    // 渲染文案模板卡片
    templates.forEach((template, index) => {
      const templateCard = document.createElement('div');
      templateCard.className = 'industry-template-card industry-template-card-enter';
      templateCard.style.animationDelay = `${index * 60}ms`;

      // 入场动画结束后移除动画类，避免 hover 时重新触发滑入动画
      templateCard.addEventListener('animationend', function() {
        this.classList.remove('industry-template-card-enter');
        this.style.animationDelay = '';
      });

      templateCard.innerHTML = `
        <div class="industry-template-content">${template}</div>
        <button class="industry-template-select-btn" data-template="${template}">选用编辑</button>
      `;
      
      // 添加卡片点击事件 - 触发打字机效果
      templateCard.addEventListener('click', function() {
        // 移除其他卡片的选中状态
        document.querySelectorAll('.industry-template-card').forEach(card => {
          card.classList.remove('selected');
          const content = card.querySelector('.industry-template-content');
          content.classList.remove('typewriter');
          content.textContent = templates[Array.from(card.parentNode.children).indexOf(card)];
        });

        // 设置当前卡片为选中状态
        this.classList.add('selected');
        const content = this.querySelector('.industry-template-content');

        // 触发打字机效果
        startTypewriterEffect(content, template);
      });

      const contentEl = templateCard.querySelector('.industry-template-content');
      contentEl.addEventListener('touchstart', (e) => {
        e.stopPropagation();
      }, { passive: true });
      contentEl.addEventListener('touchend', (e) => {
        e.stopPropagation();
      });
      contentEl.addEventListener('touchcancel', (e) => {
        e.stopPropagation();
      });
      
      // 添加按钮点击事件
      templateCard.querySelector('.industry-template-select-btn').addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('选择了模板:', template);
        if (elements.promoTextInput) {
          elements.promoTextInput.value = template;
          console.log('已将模板内容填充到输入框:', template);
          
          // 关闭整合行业模板弹窗
          closeIntegratedIndustryTemplateModal();
          
          // 自动滚动到编辑框
          setTimeout(() => {
            elements.promoTextInput.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
            elements.promoTextInput.focus();
            console.log('已滚动到编辑框并聚焦');
          }, 100);
        }
      });
      
      container.appendChild(templateCard);
    });
  }
  
  // 全局打字机效果状态管理
  let globalTypewriterActive = false;
  let globalTypewriterTimeout = null;
  
  // 打字机效果函数
  function startTypewriterEffect(contentElement, fullText) {
    // 如果已经有打字机效果在播放，则忽略新的触发
    if (globalTypewriterActive) {
      console.log('打字机效果正在进行中，忽略新触发');
      return;
    }
    
    // 设置全局状态为活跃
    globalTypewriterActive = true;
    
    // 先停止任何正在进行的打字机效果
    if (contentElement._typewriterTimeout) {
      clearTimeout(contentElement._typewriterTimeout);
    }
    
    // 保存原始文本
    const originalText = fullText;
    
    // 清空内容并添加打字机样式
    contentElement.textContent = '';
    contentElement.classList.add('typewriter');
    
    const lines = fullText.split('\n');
    let currentLine = 0;
    let currentChar = 0;
    
    function typeNextChar() {
      // 检查是否所有行都已处理完
      if (currentLine >= lines.length) {
        // 打字完成，保持光标闪烁，然后恢复原始文本
        contentElement._typewriterTimeout = setTimeout(() => {
          contentElement.classList.remove('typewriter');
          // 恢复原始完整文本
          contentElement.textContent = originalText;
          delete contentElement._typewriterTimeout;
          
          // 重置全局状态
          globalTypewriterActive = false;
        }, 1000);
        return;
      }
      
      // 检查当前行是否已处理完
      if (currentChar >= lines[currentLine].length) {
        // 当前行处理完成，换到下一行
        currentLine++;
        currentChar = 0;
        
        // 如果不是最后一行，添加换行符
        if (currentLine < lines.length) {
          contentElement.textContent += '\n';
          contentElement._typewriterTimeout = setTimeout(typeNextChar, 200); // 行间延迟
        } else {
          contentElement._typewriterTimeout = setTimeout(typeNextChar, 80); // 继续处理
        }
        return;
      }
      
      // 添加当前字符
      contentElement.textContent += lines[currentLine][currentChar];
      currentChar++;
      
      // 继续下一个字符
      contentElement._typewriterTimeout = setTimeout(typeNextChar, 80); // 控制打字速度
    }
    
    // 开始打字
    typeNextChar();
  }
  
  // 滚动检测函数
  function setupScrollDetection() {
    // 正确的滚动容器是 .industry-templates-list
    const scrollContainer = elements.industryTemplatesList;
    if (!scrollContainer) {
      console.log('未找到滚动容器');
      return;
    }
    console.log('找到滚动容器:', scrollContainer);
    
    let currentPlayingIndex = 0; // 当前正在播放的模板索引
    let isScrolling = false;
    
    // 防抖函数，避免频繁触发
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
    
    // 检查元素是否在可见区域（顶部5%-8%）
    function isElementInViewport(element) {
      const rect = element.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      
      // 计算元素相对于滚动容器的位置
      const elementTopRelative = rect.top - containerRect.top;
      const elementBottomRelative = rect.bottom - containerRect.top;
      const containerHeight = containerRect.height;
      
      // 可见区域：顶部5%到8%的区域
      const visibleTop = containerHeight * 0.2;
      const visibleBottom = containerHeight * 0.25;
      
      console.log('元素位置:', {
        elementTopRelative,
        elementBottomRelative,
        containerHeight,
        visibleTop,
        visibleBottom
      });
      
      // 检查元素是否与可见区域重叠
      const isVisible = (elementTopRelative <= visibleBottom && elementBottomRelative >= visibleTop);
      console.log('可见性计算结果:', isVisible);
      
      return isVisible;
    }
    
    // 处理滚动事件
    function handleScroll() {
      if (isScrolling) return;
      isScrolling = true;
      
      const templateCards = elements.industryTemplatesList.querySelectorAll('.industry-template-card');
      let targetIndex = -1;
      
      console.log('滚动事件触发，检查模板可见性...');
      
      // 查找当前在可见区域的模板
      templateCards.forEach((card, index) => {
        const isVisible = isElementInViewport(card);
        console.log(`模板 ${index}: 可见性 = ${isVisible}`);
        if (isVisible) {
          targetIndex = index;
        }
      });
      
      console.log('找到目标模板索引:', targetIndex, '当前播放索引:', currentPlayingIndex);
      
      // 如果找到目标模板且不是当前正在播放的模板
      if (targetIndex !== -1 && targetIndex !== currentPlayingIndex) {
        console.log('触发新的打字机效果，目标索引:', targetIndex);
        
        // 停止当前播放的模板
        if (currentPlayingIndex >= 0 && currentPlayingIndex < templateCards.length) {
          const currentCard = templateCards[currentPlayingIndex];
          const currentContent = currentCard.querySelector('.industry-template-content');
          
          // 移除选中状态和打字机效果
          currentCard.classList.remove('selected');
          currentContent.classList.remove('typewriter');
          
          // 恢复完整文本
          const template = currentCard.querySelector('.industry-template-select-btn').getAttribute('data-template');
          currentContent.textContent = template;
        }
        
        // 播放新的模板
        const targetCard = templateCards[targetIndex];
        const targetContent = targetCard.querySelector('.industry-template-content');
        const template = targetCard.querySelector('.industry-template-select-btn').getAttribute('data-template');
        
        // 设置选中状态
        targetCard.classList.add('selected');
        
        // 触发打字机效果（如果当前没有打字机效果在播放）
        if (!globalTypewriterActive) {
          startTypewriterEffect(targetContent, template);
          
          // 更新当前播放索引
          currentPlayingIndex = targetIndex;
        } else {
          console.log('打字机效果正在进行中，跳过新触发');
        }
      }
      
      isScrolling = false;
    }
    
    // 添加滚动监听（防抖处理）
    scrollContainer.addEventListener('scroll', debounce(handleScroll, 150));
    console.log('滚动监听已添加到:', scrollContainer);
    
    // 手动触发一次滚动检测，测试功能
    setTimeout(() => {
      console.log('手动触发滚动检测...');
      handleScroll();
    }, 500);
  }
  
  // 打开促销信息编辑模态框
  function openPromoTextModal() {
    if (!elements.promoTextModal || !elements.promoTextInput) return;
    
    // 加载当前促销信息到输入框
    elements.promoTextInput.value = state.businessInfo.promoText;
    
    // 移除关闭动画类
    elements.promoTextModal.classList.remove('closing');
    elements.promoTextModal.querySelector('.modal-container').classList.remove('closing');
    
    // 显示模态框
    elements.promoTextModal.classList.remove('hidden');
    
    // 强制重绘以触发动画
    void elements.promoTextModal.offsetWidth;
    
    // 聚焦到输入框
    elements.promoTextInput.focus();
  }
  
  // 打开行业分类文案模板模态框
  function openIndustryTemplatesModal() {
    if (!elements.industryTemplatesModal || !elements.promoTextInput) return;
    
    // 确保行业模板已渲染
    initializeIndustryTemplates();
    
    // 显示模态框
    elements.industryTemplatesModal.classList.remove('hidden');
  }
  
  // 关闭行业分类文案模板模态框
  function closeIndustryTemplatesModal() {
    if (!elements.industryTemplatesModal) return;
    elements.industryTemplatesModal.classList.add('hidden');
  }
  
  // 关闭促销信息编辑模态框
  function closePromoTextModal() {
    if (!elements.promoTextModal) return;
    
    // 添加关闭动画类
    elements.promoTextModal.classList.add('closing');
    elements.promoTextModal.querySelector('.modal-container').classList.add('closing');
    
    // 延迟隐藏弹窗
    setTimeout(() => {
      elements.promoTextModal.classList.add('hidden');
      // 移除关闭动画类
      elements.promoTextModal.classList.remove('closing');
      elements.promoTextModal.querySelector('.modal-container').classList.remove('closing');
    }, 400); // 匹配动画时长
  }
  

  
  // 保存促销信息
  function savePromoText() {
    if (!elements.promoTextInput) return;
    
    const newPromoText = elements.promoTextInput.value.trim();
    const finalPromoText = newPromoText || '👇长按加好友/进粉丝福利群！\n🎁这里可以写引流文促销文案或地址/联系方式 📝（点击更改）';
    console.log('保存促销信息:', finalPromoText);
    
    // 更新状态
    state.businessInfo.promoText = finalPromoText;
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 同步到商家信息编辑弹窗
    if (elements.businessPromoTextInput) {
      elements.businessPromoTextInput.value = finalPromoText;
    }
    
    // 保存到本地存储
    saveBusinessInfoToLocalStorage();
    
    // 同步到云端
    if (window.CloudSync) {
      CloudSync.syncPromoTextToCloud(finalPromoText);
    }
    
    // 关闭模态框
    closePromoTextModal();
  }
  
  let cropEditValues = {
    brightness: 100,
    contrast: 100,
    saturation: 100
  };

  let currentCropImageType = 'jpeg';

  function openCropper(file, targetType, aspectRatio = 1) {
    console.log('openCropper 被调用, targetType:', targetType, 'aspectRatio:', aspectRatio);
    currentCropImageType = file.type === 'image/png' ? 'png' : 'jpeg';
    console.log('原始图片类型:', currentCropImageType);
    const reader = new FileReader();

    reader.onload = function(e) {
      console.log('FileReader onload 触发');
      const img = document.getElementById('cropImage');
      img.src = e.target.result;

      const cropModal = document.getElementById('cropModal');
      if (cropModal) {
        cropModal.style.display = 'flex';
        console.log('裁剪弹窗已显示');
      } else {
        console.error('找不到裁剪弹窗 #cropModal');
      }

      if (cropper) {
        cropper.destroy();
        cropper = null;
      }

      console.log('初始化 Cropper...');
      const isLogoCrop = targetType === 'logo';
      cropper = new Cropper(img, {
        aspectRatio: isLogoCrop ? 1 : aspectRatio,
        viewMode: 1,
        autoCropArea: isLogoCrop ? 0.8 : 1,
        dragMode: 'move',
        scalable: true,
        zoomable: true,
        movable: true,
        responsive: true,
        background: false,
        checkCrossOrigin: false,
        ready: function() {
          console.log('Cropper ready');
          if (isLogoCrop) {
            cropper.setAspectRatio(NaN);
          }
          updateCropImageFilters();
        }
      });
      console.log('Cropper 初始化完成');

      currentCropTarget = targetType;
      console.log('currentCropTarget 设置为:', currentCropTarget);

      resetCropEditValues();
    };

    reader.readAsDataURL(file);
  }

  function resetCropEditValues() {
    cropEditValues = {
      brightness: 100,
      contrast: 100,
      saturation: 100
    };

    const brightnessSlider = document.getElementById('cropBrightness');
    const contrastSlider = document.getElementById('cropContrast');
    const saturationSlider = document.getElementById('cropSaturation');
    const brightnessValue = document.getElementById('cropBrightnessValue');
    const contrastValue = document.getElementById('cropContrastValue');
    const saturationValue = document.getElementById('cropSaturationValue');

    if (brightnessSlider) brightnessSlider.value = 100;
    if (contrastSlider) contrastSlider.value = 100;
    if (saturationSlider) saturationSlider.value = 100;
    if (brightnessValue) brightnessValue.textContent = '100%';
    if (contrastValue) contrastValue.textContent = '100%';
    if (saturationValue) saturationValue.textContent = '100%';

    updateCropImageFilters();
  }

  function updateCropImageFilters() {
    const { brightness, contrast, saturation } = cropEditValues;
    const filterValue = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    
    const img = document.getElementById('cropImage');
    if (img) {
      img.style.filter = filterValue;
    }

    const cropperContainer = document.querySelector('.cropper-container');
    if (cropperContainer) {
      cropperContainer.style.filter = filterValue;
    }
  }

  function closeCropper() {
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }
    currentCropTarget = null;

    const cropModal = document.getElementById('cropModal');
    if (cropModal) {
      cropModal.style.display = 'none';
    }

    const img = document.getElementById('cropImage');
    if (img) {
      img.style.filter = '';
    }

    const cropperContainer = document.querySelector('.cropper-container');
    if (cropperContainer) {
      cropperContainer.style.filter = '';
    }
  }

  function confirmCrop() {
    console.log('confirmCrop 被调用');
    console.log('cropper exists:', !!cropper);
    console.log('currentCropTarget:', currentCropTarget);
    
    if (!cropper || !currentCropTarget) {
      console.log('cropper或currentCropTarget为空');
      return;
    }

    const canvas = cropper.getCroppedCanvas({
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    });

    console.log('裁剪后的canvas:', canvas);

    if (!canvas) {
      showToast('裁剪失败，请重试');
      return;
    }

    const finalCanvas = applyImageFilters(canvas);
    
    let outputCanvas = finalCanvas;
    let useTransparentFormat = false;
    
    if (currentCropTarget === 'logo') {
      const minHeight = 300;
      let cropWidth = finalCanvas.width;
      let cropHeight = finalCanvas.height;

      if (cropHeight < minHeight) {
        const scale = minHeight / cropHeight;
        cropWidth = Math.round(cropWidth * scale);
        cropHeight = minHeight;
      }

      if (cropWidth < cropHeight) {
        cropWidth = cropHeight;
      }

      outputCanvas = document.createElement('canvas');
      outputCanvas.width = cropWidth;
      outputCanvas.height = cropHeight;
      const ctx = outputCanvas.getContext('2d');
      ctx.clearRect(0, 0, cropWidth, cropHeight);
      ctx.drawImage(finalCanvas, 0, 0, cropWidth, cropHeight);
      console.log('Logo输出尺寸:', cropWidth + 'x' + cropHeight);

      useTransparentFormat = currentCropImageType === 'png';
    }
    
    const base64 = outputCanvas.toDataURL(useTransparentFormat ? 'image/png' : 'image/jpeg', useTransparentFormat ? undefined : 0.8);
    console.log('生成的base64长度:', base64.length, '格式:', useTransparentFormat ? 'PNG(透明)' : 'JPEG');

    if (currentCropTarget === 'logo') {
      console.log('处理Logo裁剪');
      state.businessInfo.logo = base64;
      pendingUploads.logo = base64;
      pendingDeletes.logo = false;

      saveToCache(IMAGE_CACHE_KEYS.logo, base64);

      updateBusinessInfoDisplay();
      updateLogoSize();

      if (elements.logoPreview && elements.logoPreviewImg && elements.logoUploadArea) {
        elements.logoPreviewImg.src = base64;
        elements.logoPreview.style.display = 'block';
        elements.logoUploadArea.style.display = 'none';
        // 显示透明开关
        if (elements.logoTransparencyToggle) {
          elements.logoTransparencyToggle.classList.remove('hidden');
          elements.logoTransparencyToggle.classList.remove('active');
          // 更新状态为圆角模式（false）
          state.businessInfo.logoTransparent = false;
          updateLogoTransparencyStyle(false);
          // 更新滑块文字
          const thumb = elements.logoTransparencyToggle.querySelector('.toggle-thumb');
          if (thumb) {
            thumb.textContent = '圆角';
          }
          showLogoActionButtons(false);
        }
      }

      showToast('Logo已裁剪，点击保存后上传到云端');
    }

    if (currentCropTarget === 'qrcode') {
      console.log('处理二维码裁剪');
      state.businessInfo.qrcode = base64;
      pendingUploads.qrcode = base64;
      pendingDeletes.qrcode = false;

      saveToCache(IMAGE_CACHE_KEYS.qrcode, base64);

      updateBusinessInfoDisplay();

      if (elements.qrcodePreview && elements.qrcodePreviewImg && elements.qrcodeUploadArea) {
        elements.qrcodePreviewImg.src = base64;
        elements.qrcodePreview.classList.remove('hidden');
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodeUploadArea.style.display = 'none';
      }

      showToast('二维码已裁剪，点击保存后上传到云端');
    }

    if (currentCropTarget === 'background') {
      console.log('处理背景图片裁剪');
      state.customBackground = base64;

      state.textColor = '#000000';
      localStorage.setItem('textColor', '#000000');

      if (window.FrameManager) {
        state.currentFrame = null;
        state.pendingFrame = null;
        window.FrameManager.removeFrameFromPreview();
      }

      updateTemplateDisplay();
      updateStickerButtonVisibility();
      clearTriggerFocus();

      showToast('背景图片已编辑');
    }

    closeCropper();
  }

  function applyImageFilters(sourceCanvas) {
    const { brightness, contrast, saturation } = cropEditValues;
    
    if (brightness === 100 && contrast === 100 && saturation === 100) {
      return sourceCanvas;
    }

    const canvas = document.createElement('canvas');
    canvas.width = sourceCanvas.width;
    canvas.height = sourceCanvas.height;
    const ctx = canvas.getContext('2d');
    
    // 确保透明背景 - 先清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    ctx.drawImage(sourceCanvas, 0, 0);

    return canvas;
  }

  function initCropperEvents() {
    const confirmBtn = document.getElementById('confirmCrop');
    const cancelBtn = document.getElementById('cancelCrop');
    const resetBtn = document.getElementById('resetCropEdit');
    const brightnessSlider = document.getElementById('cropBrightness');
    const contrastSlider = document.getElementById('cropContrast');
    const saturationSlider = document.getElementById('cropSaturation');

    console.log('初始化裁剪事件:', { confirmBtn, cancelBtn });

    if (confirmBtn) {
      console.log('绑定确认裁剪按钮事件');
      confirmBtn.addEventListener('click', function() {
        console.log('确认裁剪按钮被点击');
        confirmCrop();
      });
    } else {
      console.error('找不到确认裁剪按钮 #confirmCrop');
    }

    if (cancelBtn) {
      console.log('绑定取消裁剪按钮事件');
      cancelBtn.addEventListener('click', function() {
        console.log('取消裁剪按钮被点击');
        closeCropper();
      });
    } else {
      console.error('找不到取消裁剪按钮 #cancelCrop');
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        resetCropEditValues();
      });
    }

    if (brightnessSlider) {
      brightnessSlider.addEventListener('input', function() {
        cropEditValues.brightness = parseInt(this.value);
        document.getElementById('cropBrightnessValue').textContent = this.value + '%';
        updateCropImageFilters();
      });
    }

    if (contrastSlider) {
      contrastSlider.addEventListener('input', function() {
        cropEditValues.contrast = parseInt(this.value);
        document.getElementById('cropContrastValue').textContent = this.value + '%';
        updateCropImageFilters();
      });
    }

    if (saturationSlider) {
      saturationSlider.addEventListener('input', function() {
        cropEditValues.saturation = parseInt(this.value);
        document.getElementById('cropSaturationValue').textContent = this.value + '%';
        updateCropImageFilters();
      });
    }
  }

  
  // 这里是其他函数定义...
  function bindEvents() {
    // 按钮点击反馈效果
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const button = this;
        button.classList.add('click-bounce');
        setTimeout(() => {
          button.classList.remove('click-bounce');
        }, 200);
      });
    });
    
    // 返回按钮事件
    if (elements.backToHomeBtn) {
      elements.backToHomeBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
      });
    }
    
    // 模板选择相关事件
    if (elements.changeTemplateBtn) {
      elements.changeTemplateBtn.addEventListener('click', openTemplateModal);
    }
    if (elements.closeTemplateModalBtn) {
      elements.closeTemplateModalBtn.addEventListener('click', closeTemplateModal);
    }

    // 回到顶部按钮事件
    setupModalBackToTop();

    if (elements.cancelTemplateBtn) {
      elements.cancelTemplateBtn.addEventListener('click', closeTemplateModal);
    }
    if (elements.confirmTemplateBtn) {
      elements.confirmTemplateBtn.addEventListener('click', function() {
        if (state.currentTemplate) {
          // 使用AJAX方式加载，不刷新页面
          selectTemplate(state.currentTemplate);
        }
      });
    }
    
    // 模板视图切换事件
    if (elements.templateGridViewBtn) {
      elements.templateGridViewBtn.addEventListener('click', function() {
        switchTemplateViewMode('grid');
      });
    }
    if (elements.templateSlideViewBtn) {
      elements.templateSlideViewBtn.addEventListener('click', function() {
        switchTemplateViewMode('slide');
      });
    }

    // 模板排序切换事件
    if (elements.templateRandomSortBtn) {
      elements.templateRandomSortBtn.addEventListener('click', function() {
        switchTemplateSortMode('random');
      });
    }
    if (elements.templateOriginalSortBtn) {
      elements.templateOriginalSortBtn.addEventListener('click', function() {
        switchTemplateSortMode('original');
      });
    }

    // 幻灯片控制按钮事件
    if (elements.prevTemplateSlide) {
      elements.prevTemplateSlide.addEventListener('click', prevSlide);
    }
    if (elements.nextTemplateSlide) {
      elements.nextTemplateSlide.addEventListener('click', nextSlide);
    }
    if (elements.slidePlayPauseBtn) {
      elements.slidePlayPauseBtn.addEventListener('click', toggleSlideAutoPlay);
    }
    
    // 模板网格视图触摸手势事件
    setupTemplateGridTouchGestures();
    
    // 商家信息相关事件
    if (elements.editBusinessInfoBtn) {
      elements.editBusinessInfoBtn.addEventListener('click', openBusinessInfoModal);
    }
    
    // 模板切换按钮事件
    if (elements.prevTemplateBtn) {
      elements.prevTemplateBtn.addEventListener('click', switchToPrevTemplate);
    }
    if (elements.nextTemplateBtn) {
      elements.nextTemplateBtn.addEventListener('click', switchToNextTemplate);
    }
    
    // VIP菜单系统事件 - 由 vip-login-ui.js 统一处理
    if (elements.closeBusinessInfoModalBtn) {
      elements.closeBusinessInfoModalBtn.addEventListener('click', closeBusinessInfoModal);
    }
    if (elements.refreshDataBtn) {
      elements.refreshDataBtn.addEventListener('click', async function() {
        let retryCount = 0;
        const maxRetries = 3;
        const retryDelay = 2000;
        const failRetryDelay = 30000;
        
        const originalText = '获取最新数据';
        const loadingText = '获取云端数据';
        const successText = '更新数据成功';
        const failText = '获取失败';
        const retryText = '30秒后重试';
        
        const btn = this;
        
        async function updateButtonText(text, duration = null) {
          btn.textContent = text;
          if (duration) {
            await new Promise(resolve => setTimeout(resolve, duration));
          }
        }
        
        async function verifyDataUpdated() {
          // 验证品牌信息是否更新
          const userId = localStorage.getItem('postdiy_user_id');
          if (!userId) return false;
          
          const localCacheKey = 'vipBusinessInfo_' + userId;
          const cachedData = localStorage.getItem(localCacheKey);
          if (!cachedData) return false;
          
          try {
            const data = JSON.parse(cachedData);
            // 检查是否有获取时间戳
            if (!data.fetchedAt) return false;
            
            // 检查图片URL是否存在
            if (!data.logoUrl && !data.qrcodeUrl) return false;
            
            return true;
          } catch (e) {
            return false;
          }
        }
        
        try {
          btn.disabled = true;
          btn.textContent = `${loadingText}...`;
          
          while (retryCount < maxRetries) {
            try {
              retryCount++;
              console.log(`[刷新数据] 尝试第 ${retryCount}/${maxRetries} 次`);
              
              // 强制刷新商家信息（跳过本地缓存）
              if (window.CloudSync && window.CloudSync.setForceRefreshBusinessInfo) {
                window.CloudSync.setForceRefreshBusinessInfo();
              }
              
              const syncResult = await window.CloudSync.syncAndFillBusinessInfo(true);
              
              if (!syncResult.success) {
                throw new Error(`同步商家信息失败: ${syncResult.reason || '未知错误'}`);
              }
              
              console.log(`[刷新数据] 商家信息同步成功: ${syncResult.source}`);
              
              // 强制刷新图片
              if (window.forceRefreshImages) {
                await window.forceRefreshImages();
              }
              
              // 验证数据是否真正更新
              const dataVerified = await verifyDataUpdated();
              if (!dataVerified) {
                throw new Error('数据验证失败: 缓存数据不完整或无效');
              }

              await updateButtonText(successText, 1500);
              btn.disabled = false;
              btn.textContent = originalText;
              console.log('[刷新数据] 刷新成功，数据已验证');

              // 显示浮动提示并关闭弹窗
              showToast('已更新至最新数据', 3000);
              setTimeout(() => {
                closeBusinessInfoModal();
              }, 1500);
              return;
            } catch (error) {
              console.error(`[刷新数据] 第 ${retryCount} 次尝试失败:`, error);
              if (retryCount < maxRetries) {
                await updateButtonText(`${loadingText}(${retryDelay / 1000}s)...`, retryDelay);
              } else {
                btn.disabled = false;
                btn.textContent = failText;
                setTimeout(() => {
                  btn.textContent = retryText;
                  setTimeout(() => {
                    btn.textContent = originalText;
                  }, 30000);
                }, 3000);
                console.error('[刷新数据] 所有重试失败，30秒后可再次尝试');
                return;
              }
            }
          }
        } catch (error) {
          console.error('[刷新数据] 错误:', error);
          btn.disabled = false;
          btn.textContent = failText;
          setTimeout(() => {
            btn.textContent = retryText;
            setTimeout(() => {
              btn.textContent = originalText;
            }, 30000);
          }, 3000);
        }
      });
    }
    if (elements.saveBusinessInfoBtn) {
      elements.saveBusinessInfoBtn.addEventListener('click', function() {
        // 品牌名称为空时阻止保存
        const nameVal = elements.businessNameInput ? elements.businessNameInput.value.trim() : '';
        if (!nameVal) {
          showToast('请先填写品牌/门店名称');
          if (elements.businessNameInput) {
            elements.businessNameInput.focus();
            elements.businessNameInput.style.borderColor = '#ff4444';
            setTimeout(() => { elements.businessNameInput.style.borderColor = ''; }, 2000);
          }
          return;
        }
        saveBusinessInfo();
      });
    }
    // 品牌名称输入时实时更新保存按钮状态
    if (elements.businessNameInput && elements.saveBusinessInfoBtn) {
      function updateSaveBtnState() {
        const hasName = elements.businessNameInput.value.trim() !== '';
        elements.saveBusinessInfoBtn.disabled = !hasName;
        elements.saveBusinessInfoBtn.style.opacity = hasName ? '1' : '0.5';
      }
      elements.businessNameInput.addEventListener('input', updateSaveBtnState);
      // 初始化按钮状态
      updateSaveBtnState();
    }
    // 促销文案模板按钮事件
    if (elements.selectPromoTemplateBtn) {
      elements.selectPromoTemplateBtn.addEventListener('click', function() {
        console.log('点击选择促销文案模板按钮');
        openPromoTextModal();
      });
    }
    
    // 行业分类点击事件 - 打开独立弹窗
    bindIndustryCategoryEvents();
    
    // 关闭行业模板弹窗事件
    if (elements.closeIndustryTemplateModal) {
      elements.closeIndustryTemplateModal.addEventListener('click', closeIndustryTemplateModal);
    }
    
    // 整合行业模板弹窗事件
    if (elements.closeIntegratedIndustryTemplateModal) {
      elements.closeIntegratedIndustryTemplateModal.addEventListener('click', closeIntegratedIndustryTemplateModal);
    }
    
    // 文案模板按钮事件 - 打开整合弹窗
    if (elements.promoTemplateBtn) {
      elements.promoTemplateBtn.addEventListener('click', function() {
        console.log('点击文案模板按钮');
        openIntegratedIndustryTemplateModal();
      });
    }
    
    // 商家信息编辑弹窗中的促销文案模板按钮事件
    if (elements.selectPromoTemplateBtn) {
      elements.selectPromoTemplateBtn.addEventListener('click', function() {
        console.log('点击选择促销文案模板按钮');
        openIntegratedIndustryTemplateModal();
      });
    }
    
    // 颜色选择事件
    if (elements.fontColorSelector) {
      elements.fontColorSelector.addEventListener('click', function(e) {
        if (e.target.classList.contains('color-option')) {
          // 更新状态
          state.textColor = e.target.getAttribute('data-color');
          // 更新UI选中状态
          document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
            // 移除之前的打勾图标
            const existingCheckmark = option.querySelector('.checkmark');
            if (existingCheckmark) {
              existingCheckmark.remove();
            }
          });
          
          // 添加选中状态
          e.target.classList.add('selected');
          
          // 创建打勾图标
          const checkmark = document.createElement('span');
          checkmark.className = 'checkmark';
          checkmark.textContent = '✓';
          
          // 白色色块特殊处理 - 使用黑色打勾
          if (e.target.getAttribute('data-color') === '#FFFFFF') {
            checkmark.style.color = '#000000';
          } else {
            checkmark.style.color = '#FFFFFF';
          }
          
          e.target.appendChild(checkmark);
          
          // 实时更新预览
          updateBusinessInfoDisplay();
        }
      });
    }
    
    // 促销信息编辑相关事件
    // 点击海报上的促销信息，打开编辑模态框
    if (elements.posterPromoText) {
      elements.posterPromoText.addEventListener('click', function() {
        openPromoTextModal();
      });
    }
    
    // 关闭促销信息编辑模态框
    if (elements.closePromoTextModal) {
      elements.closePromoTextModal.addEventListener('click', closePromoTextModal);
    }
    
    // 取消编辑促销信息
    if (elements.cancelPromoTextBtn) {
      elements.cancelPromoTextBtn.addEventListener('click', closePromoTextModal);
    }
    
    // 保存促销信息
    if (elements.savePromoTextBtn) {
      elements.savePromoTextBtn.addEventListener('click', savePromoText);
    }
    
    // 商家名称点击事件 - 弹出字体颜色选择弹窗
    if (elements.posterBusinessName) {
      elements.posterBusinessName.addEventListener('click', function() {
        // 打开字体颜色选择弹窗
        openFontColorModal();
      });
    }
    
    // Logo区域点击事件 - 弹出商家信息编辑弹窗
    if (elements.posterLogo) {
      elements.posterLogo.addEventListener('click', function() {
        // 打开商家信息编辑弹窗
        openBusinessInfoModal();
      });
    }
    
    // 二维码区域点击事件 - 弹出商家信息编辑弹窗
    if (elements.posterQrcode) {
      elements.posterQrcode.addEventListener('click', function() {
        // 打开商家信息编辑弹窗
        openBusinessInfoModal();
      });
    }
    
    // 背景图片点击事件 - 根据背景模式触发相应功能
    if (elements.posterBackground) {
      elements.posterBackground.addEventListener('click', function() {
        // 检查是否有自定义背景（表示用户选择了自己上传或拍照模式）
        if (state.customBackground) {
          // 触发相册选择功能，与上传背景按钮的功能保持一致
          if (elements.uploadBackgroundBtn) {
            // 模拟点击相册按钮
            elements.uploadBackgroundBtn.click();
          }
        } else {
          // 没有自定义背景，打开模板选择弹窗
          openTemplateModal();
        }
      });
    }

    // 字体颜色选择弹窗关闭按钮事件
    if (elements.closeFontColorModalBtn) {
      elements.closeFontColorModalBtn.addEventListener('click', closeFontColorModal);
    }
    
    // 更改品牌名称按钮事件
    if (elements.changeBrandNameBtn) {
      elements.changeBrandNameBtn.addEventListener('click', function() {
        // 关闭字体颜色选择弹窗
        closeFontColorModal();
        // 打开商家信息编辑弹窗
        openBusinessInfoModal();
      });
    }
    
    // 移除按钮事件监听，因为现在点击颜色直接应用并关闭弹窗
    
    // 字体颜色选择弹窗内的颜色选择事件 - 实时预览
    if (elements.fontColorModalSelector) {
      // 双击事件处理
      let lastClickTime = 0;
      
      elements.fontColorModalSelector.addEventListener('click', function(e) {
        if (e.target.classList.contains('color-swatch') || e.target.classList.contains('checkmark')) {
          let targetSwatch = e.target;
          if (e.target.classList.contains('checkmark')) {
            targetSwatch = e.target.parentElement;
          }
          
          const selectedColor = targetSwatch.getAttribute('data-color');
          
          if (selectedColor) {
            const currentTime = new Date().getTime();
            
            // 检查是否为双击（300ms内连续点击）
            if (currentTime - lastClickTime < 300) {
              // 双击事件：等同于点击确认选择按钮
              previewTextColor = selectedColor;
              
              // 更新状态用于实时预览
              state.textColor = selectedColor;
              
              // 更新预览
              updateBusinessInfoDisplay();
              
              // 更新颜色选择器的选中样式
              const allSwatches = elements.fontColorModalSelector.querySelectorAll('.color-swatch');
              allSwatches.forEach(swatch => {
                swatch.classList.remove('selected');
              });
              targetSwatch.classList.add('selected');
              
              // 同步更新商家信息编辑弹窗中的颜色选择器状态
              const businessInfoColorSwatches = document.querySelectorAll('#businessInfoModal .color-swatch');
              businessInfoColorSwatches.forEach(swatch => {
                const color = swatch.getAttribute('data-color');
                if (color === selectedColor) {
                  swatch.classList.add('selected');
                } else {
                  swatch.classList.remove('selected');
                }
              });
              
              // 执行确认选择按钮的逻辑
              colorConfirmed = true;
              
              // 保存到本地存储
              state.textColor = previewTextColor;
              localStorage.setItem('textColor', state.textColor);
              
              // 在选中的颜色块上添加确认标记
              allSwatches.forEach(swatch => {
                swatch.classList.remove('confirmed');
                const color = swatch.getAttribute('data-color');
                if (color === previewTextColor) {
                  swatch.classList.add('confirmed');
                }
              });
              
              // 显示成功提示
              showToast('字体颜色已更新');
              
              // 关闭弹窗
              if (elements.fontColorModal) {
                elements.fontColorModal.style.display = 'none';
              }
              
              // 重置双击计时器
              lastClickTime = 0;
              return;
            }
            
            // 单机事件：正常预览
            lastClickTime = currentTime;
            
            // 保存预览颜色
            previewTextColor = selectedColor;
            
            // 更新状态用于实时预览（不保存到本地存储）
            state.textColor = selectedColor;
            
            // 更新预览
            updateBusinessInfoDisplay();
            
            // 更新颜色选择器的选中样式
            const allSwatches = elements.fontColorModalSelector.querySelectorAll('.color-swatch');
            allSwatches.forEach(swatch => {
              swatch.classList.remove('selected');
            });
            targetSwatch.classList.add('selected');
            
            // 同步更新商家信息编辑弹窗中的颜色选择器状态
            const businessInfoColorSwatches = document.querySelectorAll('#businessInfoModal .color-swatch');
            businessInfoColorSwatches.forEach(swatch => {
              const color = swatch.getAttribute('data-color');
              if (color === selectedColor) {
                swatch.classList.add('selected');
              } else {
                swatch.classList.remove('selected');
              }
            });
          }
        }
      });
    }
    
    // 确认选择按钮事件
    if (elements.confirmFontColorBtn) {
      elements.confirmFontColorBtn.addEventListener('click', function() {
        if (previewTextColor) {
          // 标记为已确认
          colorConfirmed = true;
          
          // 保存到本地存储
          state.textColor = previewTextColor;
          localStorage.setItem('textColor', state.textColor);
          
          // 在选中的颜色块上添加确认标记
          const allSwatches = elements.fontColorModalSelector.querySelectorAll('.color-swatch');
          allSwatches.forEach(swatch => {
            swatch.classList.remove('confirmed');
            const color = swatch.getAttribute('data-color');
            if (color === previewTextColor) {
              swatch.classList.add('confirmed');
            }
          });
          
          // 显示成功提示
          showToast('字体颜色已更新');
          
          // 延迟关闭弹窗，让用户看到✔标记
          setTimeout(function() {
            closeFontColorModal();
          }, 300);
        } else {
          showToast('请先选择一个颜色');
        }
      });
    }
    
    // 添加标志变量防止重复触发（移到函数外部以便其他函数访问）
    window.isFileDialogOpen = false;
    window.activeFileInput = null;
    
    // 背景上传相关事件
    if (elements.uploadBackgroundBtn) {
      elements.uploadBackgroundBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        
        // 重置状态，允许用户再次点击
        if (isFileDialogOpen) {
          // 如果之前有打开的对话框，先清理
          cleanupFileInput();
        }
        
        // 标记文件对话框已打开
        isFileDialogOpen = true;
        
        // 移除旧的输入框（如果存在），避免多个输入框导致的重复触发
        const existingInput = document.getElementById('backgroundInput');
        if (existingInput) {
          existingInput.removeEventListener('change', handleBackgroundUpload);
          existingInput.removeEventListener('focusout', cleanupFileInput);
          if (existingInput.parentNode) {
            existingInput.parentNode.removeChild(existingInput);
          }
        }
        
        // 重置活动输入框引用
        activeFileInput = null;
        
        // 创建全新的输入框元素
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = 'image/*';
        newInput.id = 'backgroundInput';
        newInput.style.display = 'none'; // 隐藏输入框
        
        // 添加change事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleBackgroundUpload(event);
          // 清理标志和引用
          setTimeout(() => {
            isFileDialogOpen = false;
            activeFileInput = null;
          }, 100);
        });
        
        // 添加focusout事件监听器来处理用户取消选择的情况
        newInput.addEventListener('focusout', cleanupFileInput);
        
        // 添加到DOM中
        document.body.appendChild(newInput);
        
        // 更新elements对象中的引用
        elements.backgroundInput = newInput;
        activeFileInput = newInput;
        
        // 使用setTimeout确保DOM完全更新后再触发点击
        setTimeout(() => {
          // 再次检查，确保输入框仍然存在
          if (newInput && document.body.contains(newInput)) {
            newInput.click();
          } else {
            isFileDialogOpen = false;
            activeFileInput = null;
          }
        }, 50); // 增加延迟时间
      });
    }
    
    // 拍照相关事件
    if (elements.takePhotoBtn) {
      elements.takePhotoBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        
        // 重置状态，允许用户再次点击
        if (isFileDialogOpen) {
          cleanupFileInput();
        }
        
        // 标记文件对话框已打开
        isFileDialogOpen = true;
        
        // 移除旧的输入框（如果存在），避免多个输入框导致的重复触发
        const existingInput = document.getElementById('cameraInput');
        if (existingInput) {
          existingInput.removeEventListener('change', handleBackgroundUpload);
          existingInput.removeEventListener('focusout', cleanupFileInput);
          if (existingInput.parentNode) {
            existingInput.parentNode.removeChild(existingInput);
          }
        }
        
        // 重置活动输入框引用
        activeFileInput = null;
        
        // 创建全新的输入框元素（使用capture="environment"打开相机）
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = 'image/*';
        newInput.capture = 'environment';
        newInput.id = 'cameraInput';
        newInput.style.display = 'none'; // 隐藏输入框
        
        // 添加change事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleBackgroundUpload(event);
          // 清理标志和引用
          setTimeout(() => {
            isFileDialogOpen = false;
            activeFileInput = null;
          }, 100);
        });
        
        // 添加focusout事件监听器来处理用户取消选择的情况
        newInput.addEventListener('focusout', cleanupFileInput);
        
        // 添加到DOM中
        document.body.appendChild(newInput);
        
        // 更新elements对象中的引用
        elements.cameraInput = newInput;
        activeFileInput = newInput;
        
        // 使用setTimeout确保DOM完全更新后再触发点击
        setTimeout(() => {
          // 再次检查，确保输入框仍然存在
          if (newInput && document.body.contains(newInput)) {
            newInput.click();
          } else {
            isFileDialogOpen = false;
            activeFileInput = null;
          }
        }, 50); // 增加延迟时间
      });
    }
    
    // 清理文件输入框的函数
    function cleanupFileInput() {
      // 立即重置状态标志，不等待延迟
      isFileDialogOpen = false;
      
      // 使用setTimeout让浏览器有时间处理取消操作
      setTimeout(() => {
        // 无条件清理状态，确保用户可以再次点击上传按钮
        if (activeFileInput) {
          try {
            // 使用cloneNode方法彻底移除事件监听器
            const newActiveFileInput = activeFileInput.cloneNode(true);
            if (activeFileInput.parentNode) {
              activeFileInput.parentNode.replaceChild(newActiveFileInput, activeFileInput);
            }
          } catch (e) {
            console.log('清理活动输入框时出错，但不影响功能', e);
          } finally {
            activeFileInput = null;
          }
        }
        
        // 移除所有临时创建的file input元素
        const tempInputs = ['backgroundInput', 'logoInput', 'qrcodeInput', 'cameraInput'];
        tempInputs.forEach(id => {
          try {
            const input = document.getElementById(id);
            if (input && input.parentNode) {
              input.parentNode.removeChild(input);
            }
          } catch (e) {
            console.log(`移除${id}时出错，但不影响功能`, e);
          }
        });
        
        // 确保所有上传按钮可点击
        const uploadButtons = document.querySelectorAll('#uploadBackgroundBtn, #uploadLogoBtn, #uploadQrcodeBtn');
        uploadButtons.forEach(button => {
          button.style.pointerEvents = 'auto';
        });
      }, 100); // 减少延迟时间，提供更快的响应
    }
    
    // Logo上传相关事件
    if (elements.logoUploadArea) {
      elements.logoUploadArea.addEventListener('click', function(event) {
        // 阻止默认行为但不阻止事件冒泡，让点击整个区域都能触发
        event.preventDefault();
        
        // 如果已经有文件对话框打开，则不执行任何操作
        if (isFileDialogOpen) return;
        
        // 标记文件对话框已打开
        isFileDialogOpen = true;
        
        // 移除旧的输入框（如果存在），避免多个输入框导致的重复触发
        const existingInput = document.getElementById('logoInput');
        if (existingInput) {
          existingInput.removeEventListener('change', handleLogoUpload);
          existingInput.removeEventListener('focusout', cleanupFileInput);
          existingInput.parentNode.removeChild(existingInput);
        }
        
        // 创建全新的输入框元素
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = 'image/*';
        newInput.id = 'logoInput';
        newInput.style.display = 'none'; // 隐藏输入框
        
        // 添加 change 事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleLogoUpload(event);
          // 清理标志 - 立即重置，允许再次点击
          isFileDialogOpen = false;
          activeFileInput = null;
        });
        
        // 添加 cancel 事件监听器来处理用户取消选择的情况
        newInput.addEventListener('cancel', function() {
          isFileDialogOpen = false;
          activeFileInput = null;
        });
        
        // 添加 focusout 事件监听器来处理用户取消选择的情况
        newInput.addEventListener('focusout', cleanupFileInput);
        
        // 添加到DOM中
        document.body.appendChild(newInput);
        
        // 更新elements对象中的引用
        elements.logoInput = newInput;
        activeFileInput = newInput;
        
        // 使用 setTimeout 确保 DOM 完全更新后再触发点击
        setTimeout(() => {
          // 再次检查，确保输入框仍然存在
          if (newInput && document.body.contains(newInput)) {
            newInput.click();
            
            // 添加一次性监听器，在窗口获得焦点时重置标志（文件对话框关闭后）
            const resetFlag = () => {
              setTimeout(() => {
                isFileDialogOpen = false;
                activeFileInput = null;
              }, 50);
              window.removeEventListener('focus', resetFlag);
            };
            window.addEventListener('focus', resetFlag);
          } else {
            isFileDialogOpen = false;
            activeFileInput = null;
          }
        }, 50);
      });
    }
    if (elements.removeLogoBtn) {
      elements.removeLogoBtn.addEventListener('click', removeLogo);
    }
    if (elements.logoTransparencyToggle) {
      elements.logoTransparencyToggle.addEventListener('click', toggleLogoTransparency);
    }

    const logoCutoutBtn = document.getElementById('logoCutoutBtn');
    if (logoCutoutBtn) {
      logoCutoutBtn.addEventListener('click', function() {
        openLogoCutoutModal();
      });
    }

    const logoSuggestTransparentBtn = document.getElementById('logoSuggestTransparentBtn');
    if (logoSuggestTransparentBtn) {
      logoSuggestTransparentBtn.addEventListener('click', function() {
        const suggestModal = document.getElementById('logoSuggestModal');
        if (suggestModal) suggestModal.classList.remove('active');
        applyLogoTransparentMode();
      });
    }

    const logoSuggestCutoutBtn = document.getElementById('logoSuggestCutoutBtn');
    if (logoSuggestCutoutBtn) {
      logoSuggestCutoutBtn.addEventListener('click', function() {
        const suggestModal = document.getElementById('logoSuggestModal');
        if (suggestModal) suggestModal.classList.remove('active');
        openLogoCutoutModal();
      });
    }

    const logoCutoutClose = document.getElementById('logoCutoutClose');
    if (logoCutoutClose) {
      logoCutoutClose.addEventListener('click', closeLogoCutoutModal);
    }

    const logoCutoutConfirmBtn = document.getElementById('logoCutoutConfirmBtn');
    if (logoCutoutConfirmBtn) {
      logoCutoutConfirmBtn.addEventListener('click', confirmLogoCutout);
    }

    const logoCutoutTolerance = document.getElementById('logoCutoutTolerance');
    if (logoCutoutTolerance) {
      logoCutoutTolerance.addEventListener('input', function() {
        const val = parseInt(this.value);
        document.getElementById('logoCutoutToleranceVal').textContent = val + '%';
        if (logoCutoutState.selectedColor) {
          performLogoCutout();
        }
      });
    }

    const logoCutoutSrcCanvas = document.getElementById('logoCutoutSrcCanvas');
    if (logoCutoutSrcCanvas) {
      logoCutoutSrcCanvas.addEventListener('click', handleLogoCutoutPick);
      logoCutoutSrcCanvas.addEventListener('mousemove', handleLogoCutoutPickMove);
      logoCutoutSrcCanvas.addEventListener('touchstart', handleLogoCutoutTouchPick, { passive: false });
      logoCutoutSrcCanvas.addEventListener('touchmove', handleLogoCutoutTouchPick, { passive: false });
    }

    const logoCutoutModeRow = document.getElementById('logoCutoutModeRow');
    if (logoCutoutModeRow) {
      logoCutoutModeRow.addEventListener('click', function(e) {
        const btn = e.target.closest('.logo-cutout-mode-btn');
        if (!btn) return;

        document.querySelectorAll('.logo-cutout-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.dataset.mode;
        logoCutoutState.mode = mode;

        const colorRow = document.getElementById('logoCutoutColorRow');
        const srcCanvas = document.getElementById('logoCutoutSrcCanvas');
        const crosshair = document.getElementById('logoCutoutCrosshair');

        if (mode === 'custom') {
          if (colorRow) colorRow.style.display = 'flex';
          if (srcCanvas) srcCanvas.style.cursor = 'crosshair';
          if (crosshair) crosshair.style.display = 'block';
        } else {
          if (colorRow) colorRow.style.display = 'none';
          if (srcCanvas) srcCanvas.style.cursor = 'default';
          if (crosshair) crosshair.style.display = 'none';
          performLogoCutout();
        }
      });
    }
    
    // VIP恢复按钮事件
    
    // 二维码上传相关事件
    if (elements.qrcodeUploadArea) {
      elements.qrcodeUploadArea.addEventListener('click', function(event) {
        // 阻止默认行为但不阻止事件冒泡，让点击整个区域都能触发
        event.preventDefault();
        
        // 如果已经有文件对话框打开，则不执行任何操作
        if (isFileDialogOpen) return;
        
        // 标记文件对话框已打开
        isFileDialogOpen = true;
        
        // 移除旧的输入框（如果存在），避免多个输入框导致的重复触发
        const existingInput = document.getElementById('qrcodeInput');
        if (existingInput) {
          existingInput.removeEventListener('change', handleQrcodeUpload);
          existingInput.removeEventListener('focusout', cleanupFileInput);
          existingInput.parentNode.removeChild(existingInput);
        }
        
        // 创建全新的输入框元素
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = 'image/*';
        newInput.id = 'qrcodeInput';
        newInput.style.display = 'none'; // 隐藏输入框
        
        // 添加 change 事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleQrcodeUpload(event);
          // 清理标志 - 立即重置，允许再次点击
          isFileDialogOpen = false;
          activeFileInput = null;
        });
        
        // 添加 cancel 事件监听器来处理用户取消选择的情况
        newInput.addEventListener('cancel', function() {
          isFileDialogOpen = false;
          activeFileInput = null;
        });
        
        // 添加 focusout 事件监听器来处理用户取消选择的情况
        newInput.addEventListener('focusout', cleanupFileInput);
        
        // 添加到DOM中
        document.body.appendChild(newInput);
        
        // 更新elements对象中的引用
        elements.qrcodeInput = newInput;
        activeFileInput = newInput;
        
        // 使用 setTimeout 确保 DOM 完全更新后再触发点击
        setTimeout(() => {
          // 再次检查，确保输入框仍然存在
          if (newInput && document.body.contains(newInput)) {
            newInput.click();
            
            // 添加一次性监听器，在窗口获得焦点时重置标志（文件对话框关闭后）
            const resetFlag = () => {
              setTimeout(() => {
                isFileDialogOpen = false;
                activeFileInput = null;
              }, 50);
              window.removeEventListener('focus', resetFlag);
            };
            window.addEventListener('focus', resetFlag);
          } else {
            isFileDialogOpen = false;
            activeFileInput = null;
          }
        }, 50);
      });
    }
    if (elements.removeQrcodeBtn) {
      elements.removeQrcodeBtn.addEventListener('click', removeQrcode);
    }
    
    // 输出控制相关事件
    if (elements.downloadBtn) {
      elements.downloadBtn.addEventListener('click', downloadPoster);
    }
    
    // 位置切换按钮事件
    if (elements.togglePositionBtn) {
      elements.togglePositionBtn.addEventListener('click', toggleActionsPosition);
    }
    
    // 菜单显示/隐藏按钮事件
    if (elements.toggleMenuBtn) {
      elements.toggleMenuBtn.addEventListener('click', toggleMenuVisibility);
    }
    
    // 夜间模式切换按钮事件
    if (elements.toggleThemeBtn) {
      elements.toggleThemeBtn.addEventListener('click', toggleTheme);
    }
    
    // 阻止表单默认提交
    if (elements.businessInfoForm) {
      elements.businessInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
      });
    }
  }
  
  // 切换底部操作按钮位置
  function toggleActionsPosition() {
    if (!elements.bottomActions || !elements.togglePositionBtn) return;
    
    const isLeft = elements.bottomActions.classList.contains('left-position');
    
    if (isLeft) {
      // 切换到靠右
      elements.bottomActions.classList.remove('left-position');
      elements.togglePositionBtn.querySelector('span').textContent = '靠左';
      localStorage.setItem('actionsPosition', 'right');
    } else {
      // 切换到靠左
      elements.bottomActions.classList.add('left-position');
      elements.togglePositionBtn.querySelector('span').textContent = '靠右';
      localStorage.setItem('actionsPosition', 'left');
    }
  }
  
  // 夜间模式切换功能
  function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.id === 'darkbg';
    
    if (isDarkMode) {
      // 切换到白天模式
      body.id = '';
      if (elements.themeIcon) {
        elements.themeIcon.textContent = '☀️';
      }
      if (elements.toggleThemeBtn) {
        elements.toggleThemeBtn.title = '切换夜间模式';
      }
      localStorage.setItem('postdiy_theme', 'light');
    } else {
      // 切换到夜间模式
      body.id = 'darkbg';
      if (elements.themeIcon) {
        elements.themeIcon.textContent = '🌙';
      }
      if (elements.toggleThemeBtn) {
        elements.toggleThemeBtn.title = '切换白天模式';
      }
      localStorage.setItem('postdiy_theme', 'dark');
    }
  }
  
  // 初始化主题设置（从localStorage读取）
  function initTheme() {
    const savedTheme = localStorage.getItem('postdiy_theme');
    const body = document.body;
    
    if (savedTheme === 'dark') {
      body.id = 'darkbg';
      if (elements.themeIcon) {
        elements.themeIcon.textContent = '🌙';
      }
      if (elements.toggleThemeBtn) {
        elements.toggleThemeBtn.title = '切换白天模式';
      }
    } else {
      // 默认白天模式
      body.id = '';
      if (elements.themeIcon) {
        elements.themeIcon.textContent = '☀️';
      }
      if (elements.toggleThemeBtn) {
        elements.toggleThemeBtn.title = '切换夜间模式';
      }
    }
  }
  
  // 菜单显示/隐藏功能
  function toggleMenuVisibility() {
    if (!elements.toggleMenuBtn) return;
    
    const toggleableBtns = Array.from(document.querySelectorAll('.toggleable-btn'));
    const currentSpan = elements.toggleMenuBtn.querySelector('span');
    const isVisible = !toggleableBtns[0]?.classList.contains('hidden');
    
    // 关键：直接检查贴纸按钮是否应该可见
    const shouldShowStickerBtn = elements.stickerBtn && elements.stickerBtn.classList.contains('neon-glow');
    
    console.log('toggleMenuVisibility 调试信息:');
    console.log('  - shouldShowStickerBtn:', shouldShowStickerBtn);
    if (elements.stickerBtn) {
      console.log('  - 初始 hidden 类:', elements.stickerBtn.classList.contains('hidden'));
    }
    
    // 简单粗暴的方法：如果贴纸按钮应该可见，直接从一开始就移除它
    let filteredToggleableBtns = toggleableBtns;
    if (shouldShowStickerBtn && elements.stickerBtn) {
      console.log('  - 过滤掉贴纸按钮，不参与隐藏动画');
      elements.stickerBtn.classList.remove('hidden');
      filteredToggleableBtns = toggleableBtns.filter(btn => btn !== elements.stickerBtn);
    }
    
    // 需要保持可见的按钮
    const buttonsToKeepVisible = [
      elements.toggleMenuBtn, // 隐藏按钮本身
      elements.downloadBtn   // 下载海报按钮
    ].filter(btn => btn !== null);
    
    // 添加模板切换按钮到保持可见列表
    if (elements.prevTemplateBtn) {
      buttonsToKeepVisible.push(elements.prevTemplateBtn);
    }
    if (elements.nextTemplateBtn) {
      buttonsToKeepVisible.push(elements.nextTemplateBtn);
    }
    
    // 添加更换模板按钮到保持可见列表（始终可见）
    if (elements.changeTemplateBtn) {
      buttonsToKeepVisible.push(elements.changeTemplateBtn);
    }
    
    // 如果贴纸按钮应该可见，也添加到保持可见列表
    if (shouldShowStickerBtn && elements.stickerBtn) {
      buttonsToKeepVisible.push(elements.stickerBtn);
    }
    
    // 需要隐藏的按钮
    const buttonsToHide = filteredToggleableBtns.filter(btn => !buttonsToKeepVisible.includes(btn));
    
    // 添加每日建议按钮到需要隐藏的列表
    if (elements.dailySuggestionBtn) {
      buttonsToHide.push(elements.dailySuggestionBtn);
    }
    
    // 清除所有按钮的动画类
    toggleableBtns.forEach(btn => {
      btn.style.transitionDelay = '0s';
      btn.classList.remove('jelly-animate', 'jelly-animate-out');
    });
    
    if (isVisible) {
      // 先确保需要保持可见的按钮没有 hidden 类
      buttonsToKeepVisible.forEach(btn => {
        btn.classList.remove('hidden');
      });
      
      // 绝对确保贴纸按钮可见
      if (shouldShowStickerBtn && elements.stickerBtn) {
        elements.stickerBtn.classList.remove('hidden');
      }
      
      // 隐藏其他按钮
      buttonsToHide.forEach((btn, index) => {
        setTimeout(() => {
          btn.classList.add('jelly-animate-out');
          setTimeout(() => {
            btn.classList.add('hidden');
            btn.classList.remove('jelly-animate-out');
          }, 500);
        }, index * 60);
      });
      
      // 每隔 100ms 检查一次，确保贴纸按钮可见（持续 2 秒）
      if (shouldShowStickerBtn && elements.stickerBtn) {
        let checkCount = 0;
        const checkInterval = setInterval(() => {
          if (elements.stickerBtn.classList.contains('hidden')) {
            console.log('  - 发现 hidden 类，立即移除！');
            elements.stickerBtn.classList.remove('hidden');
          }
          checkCount++;
          if (checkCount >= 20) { // 2秒后停止检查
            clearInterval(checkInterval);
          }
        }, 100);
      }
      
      currentSpan.textContent = '显示';
    } else {
      // 显示其他按钮
      const reversedBtns = [...buttonsToHide].reverse();
      reversedBtns.forEach((btn, index) => {
        setTimeout(() => {
          btn.classList.add('jelly-animate');
          btn.classList.remove('hidden');
          setTimeout(() => {
            btn.classList.remove('jelly-animate');
          }, 600);
        }, index * 70);
      });
      currentSpan.textContent = '隐藏';
      
      // 显示完成后，根据背景类型设置贴纸按钮状态
      setTimeout(() => {
        if (elements.stickerBtn) {
          if (shouldShowStickerBtn) {
            elements.stickerBtn.classList.remove('hidden');
          } else {
            elements.stickerBtn.classList.add('hidden');
          }
        }
        updateStickerButtonVisibility();
      }, (buttonsToHide.length * 70) + 600);
    }
  }
  
  // 处理浏览器前进/后退按钮
  window.addEventListener('popstate', function(event) {
    console.log('popstate事件触发:', event.state);
    
    if (event.state && event.state.templateId) {
      // 从URL参数获取模板ID
      const templateId = event.state.templateId;
      
      // 查找模板
      if (window.utils && window.utils.getTemplateById) {
        const template = window.utils.getTemplateById(templateId);
        if (template) {
          // 清除自定义背景
          state.customBackground = null;
          // 更新当前模板
          state.currentTemplate = template;
          // 更新显示
          updateTemplateDisplay();
          console.log('通过浏览器导航切换到模板:', template.name);
        } else {
          console.warn('未找到模板:', templateId);
        }
      }
    } else {
      // 如果没有模板ID，加载默认模板
      loadDefaultTemplate();
    }
  });
  
  // 初始化编辑器状态
  function initializeEditor() {
    // 初始化VIP菜单
    initializeVipMenu();
    
    // 检查VIP状态
    checkVipStatus();

    // 加载下载次数
    loadDownloadQuota();
    
    // 优先加载VIP专属缓存（如果用户是VIP）
    if (window.isVipActive && window.isVipActive()) {
      const vipId = localStorage.getItem('vipId');
      if (vipId) {
        const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
        const vipSavedInfo = localStorage.getItem(vipBusinessInfoKey);
        
        if (vipSavedInfo) {
          try {
            state.businessInfo = JSON.parse(vipSavedInfo);
            console.log('从VIP专属缓存加载成功:', state.businessInfo);
          } catch (e) {
            console.error('加载VIP专属缓存失败:', e);
            // 如果VIP缓存加载失败，回退到普通缓存
            loadFallbackBusinessInfo();
          }
        } else {
          console.log('VIP专属缓存不存在，使用VIP固定信息初始化');
          // 如果没有VIP专属缓存，使用VIP固定信息初始化
          const vipInfo = window.getVipFixedInfo();
          if (vipInfo) {
            state.businessInfo = {
              ...state.businessInfo,
              name: vipInfo.name,
              logo: vipInfo.logo,
              qrcode: vipInfo.qrcode || state.businessInfo.qrcode, // 优先使用VIP的二维码，如果没有则保留原有的
              promoText: state.businessInfo.promoText // 保留原有的促销信息
            };
            // 保存到VIP专属缓存
            saveVipBusinessInfoToLocalStorage();
          } else {
            loadFallbackBusinessInfo();
          }
        }
      } else {
        loadFallbackBusinessInfo();
      }
    } else {
      // 普通用户加载普通缓存
      loadFallbackBusinessInfo();
    }
    
    // 从本地存储加载文本颜色设置
    const savedTextColor = localStorage.getItem('textColor');
    if (savedTextColor) {
      state.textColor = savedTextColor;
    }
    
    // 从本地存储加载底部按钮位置设置
    const savedActionsPosition = localStorage.getItem('actionsPosition');
    if (savedActionsPosition === 'left') {
      if (elements.bottomActions) {
        elements.bottomActions.classList.add('left-position');
      }
      if (elements.togglePositionBtn) {
        elements.togglePositionBtn.querySelector('span').textContent = '靠右';
      }
    }
    
    // 更新商家信息显示
    updateBusinessInfoDisplay();
    
    // 检查URL中是否有模板ID参数
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('templateId');
    
    // 等待模板数据加载完成的函数
    function waitForTemplatesAndLoad() {
      // 检查是否满足加载模板的条件
      if (window.utils && window.utils.getTemplateById && window.templates) {
        console.log('模板数据已加载，尝试获取模板...');
        
        if (templateId) {
          // 尝试根据ID加载指定模板
          const selectedTemplate = window.utils.getTemplateById(templateId);
          if (selectedTemplate) {
            state.currentTemplate = selectedTemplate;
            // 只有当字体颜色未设置时才重置为黑色
            if (!state.textColor) {
              state.textColor = '#000000';
            }
            // 初始化历史状态，确保后退按钮能正确工作
            window.history.replaceState({ templateId: templateId }, '', `editor.html?templateId=${templateId}`);
            updateTemplateDisplay();
            console.log('已加载指定模板:', selectedTemplate.name);
            return; // 加载成功后直接返回
          } else {
            console.warn('未找到指定ID的模板:', templateId);
          }
        }
        
        // 如果没有指定模板或指定模板不存在，加载当前月份的第一个模板
        loadDefaultTemplate();
      } else {
        // 记录当前状态，帮助调试
        console.log('等待模板数据加载...');
        console.log('- window.utils存在:', !!window.utils);
        console.log('- window.utils.getTemplateById存在:', !!(window.utils && window.utils.getTemplateById));
        console.log('- window.templates存在:', !!window.templates);
        
        // 使用setTimeout继续等待，确保模板数据加载完成
        setTimeout(waitForTemplatesAndLoad, 100);
      }
    }
    
    // 开始等待和加载过程
    waitForTemplatesAndLoad();
    
    // 如果用户已登录，从云端同步商家信息
    if (window.CloudSync) {
      setTimeout(() => {
        CloudSync.syncAndFillBusinessInfo();
      }, 1000);
    }
  }
  
  // 加载默认模板
  function loadDefaultTemplate() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 0-11转为1-12
    const monthKey = `${currentMonth}月`;
    
    // 尝试加载当前月份的第一个模板
    if (window.templates && window.templates[monthKey] && window.templates[monthKey].length > 0) {
      state.currentTemplate = window.templates[monthKey][0];
      // 只有当字体颜色未设置时才重置为黑色
      if (!state.textColor) {
        state.textColor = '#000000';
      }
      updateTemplateDisplay();
      console.log('已加载默认模板:', state.currentTemplate.name);
    } else {
      // 如果当前月份没有模板，尝试加载第一个可用模板
      for (const key in window.templates) {
        if (window.templates[key] && window.templates[key].length > 0) {
          state.currentTemplate = window.templates[key][0];
          // 只有当字体颜色未设置时才重置为黑色
          if (!state.textColor) {
            state.textColor = '#000000';
          }
          updateTemplateDisplay();
          console.log('已加载备用模板:', state.currentTemplate.name);
          break;
        }
      }
    }
  }
  
  // 更新模板显示
  function updateTemplateDisplay() {
    if (!elements.posterBackground) {
      console.error('缺少背景元素');
      return;
    }
    
    // 更新贴纸按钮显示状态
    updateStickerButtonVisibility();
    
    // 显示模板加载动画（最先显示）
    showTemplateLoadingAnimation();
    
    // 隐藏所有海报内容，等待所有元素加载完成
    elements.posterBackground.style.display = 'none';
    const posterContent = document.getElementById('posterContent');
    if (posterContent) {
      posterContent.style.display = 'none';
    }
    
    // 使用自定义背景或模板背景
    if (state.customBackground) {
      elements.posterBackground.src = state.customBackground;
    } else if (state.currentTemplate && state.currentTemplate.image) {
      const imageUrl = window.imageConfig ? window.imageConfig.getImageUrl(state.currentTemplate.image) : state.currentTemplate.image;
      elements.posterBackground.src = imageUrl;
      elements.posterBackground.dataset.originalPath = state.currentTemplate.image;
      
      // 4秒超时检测：Cloudflare加载超时则回退七牛
      if (window.imageConfig && imageUrl.includes('r2.dev')) {
        const timeoutId = setTimeout(() => {
          // 检查图片是否已加载完成
          if (!elements.posterBackground.complete) {
            console.warn('Cloudflare加载超时(4秒)，切换到七牛');
            const qiniuUrl = window.imageConfig.qiniuBaseUrl + state.currentTemplate.image;
            elements.posterBackground.src = qiniuUrl;
          }
        }, 4000);
        
        // 图片加载完成后清除超时检测
        elements.posterBackground.onload = function() {
          clearTimeout(timeoutId);
          console.log('背景图片加载完成');
          
          // 等待所有元素加载完成
          waitForAllElementsLoaded().then(() => {
            // 显示所有海报内容
            elements.posterBackground.style.display = 'block';
            if (posterContent) {
              posterContent.style.display = 'flex';
            }
            
            // 应用科技感过渡效果
            applyTechTransitionEffect();
            
            // 立即隐藏加载动画
            hideTemplateLoadingAnimation();
            console.log('所有元素加载完成，加载动画已关闭');
          });
        };
        
        elements.posterBackground.onerror = function() {
          clearTimeout(timeoutId);
          console.error('背景图片加载失败');

          const originalPath = this.getAttribute('data-original-path');
          if (originalPath && window.imageConfig) {
            // 直接回退到七牛，不回退本地
            const qiniuUrl = window.imageConfig.qiniuBaseUrl + originalPath;
            if (this.src !== qiniuUrl) {
              console.log('回退到七牛:', qiniuUrl);
              this.src = qiniuUrl;
              return;
            }
          }
          
          console.error('无法加载图片，显示错误状态');
          
          waitForAllElementsLoaded().then(() => {
            elements.posterBackground.style.display = 'block';
            if (posterContent) {
              posterContent.style.display = 'flex';
            }
            
            hideTemplateLoadingAnimation();
          });
        };
      } else {
        // 非Cloudflare URL，使用原有逻辑
        elements.posterBackground.onload = function() {
          console.log('背景图片加载完成');
          
          waitForAllElementsLoaded().then(() => {
            elements.posterBackground.style.display = 'block';
            if (posterContent) {
              posterContent.style.display = 'flex';
            }
            
            applyTechTransitionEffect();
            hideTemplateLoadingAnimation();
            console.log('所有元素加载完成，加载动画已关闭');
          });
        };
        
        elements.posterBackground.onerror = function() {
          console.error('背景图片加载失败');

          const originalPath = this.getAttribute('data-original-path');
          if (originalPath && window.imageConfig) {
            if (!window.imageConfig.shouldFallback()) {
              console.warn('cloudflare-only 模式，不回退本地路径');
              return;
            }
            const fallbackUrl = window.imageConfig.getFallbackUrl(originalPath);
            if (fallbackUrl && this.src !== fallbackUrl) {
              console.log('回退到本地路径:', fallbackUrl);
              this.src = fallbackUrl;
              return;
            }
          }
          
          console.error('无法回退到本地路径，显示错误状态');
          
          waitForAllElementsLoaded().then(() => {
            elements.posterBackground.style.display = 'block';
            if (posterContent) {
              posterContent.style.display = 'flex';
            }
            
            hideTemplateLoadingAnimation();
          });
        };
      }
    } else {
      console.warn('没有可用的图片资源');
      hideTemplateLoadingAnimation();
      if (posterContent) {
        posterContent.style.display = 'flex';
      }
      return;
    }
  }
  
  // 等待所有元素加载完成的函数
  function waitForAllElementsLoaded() {
    return new Promise((resolve) => {
      const elementsToCheck = [
        elements.posterBackground,
        elements.posterLogoImg,
        elements.posterQrcodeImg
      ];
      
      let loadedCount = 0;
      const totalElements = elementsToCheck.filter(el => el && el.src).length;
      
      if (totalElements === 0) {
        // 如果没有需要检查的元素，直接解析
        resolve();
        return;
      }
      
      elementsToCheck.forEach(element => {
        if (element && element.src) {
          if (element.complete) {
            // 元素已经加载完成
            loadedCount++;
            if (loadedCount >= totalElements) {
              resolve();
            }
          } else {
            // 监听元素的加载事件
            element.addEventListener('load', () => {
              loadedCount++;
              if (loadedCount >= totalElements) {
                resolve();
              }
            });
            
            // 监听元素的错误事件（即使加载失败也算完成）
            element.addEventListener('error', () => {
              loadedCount++;
              if (loadedCount >= totalElements) {
                resolve();
              }
            });
          }
        }
      });
    });
  }
  
  // 应用像素化过渡效果
  function applyTechTransitionEffect() {
    if (!elements.posterBackground) return;
    
    // 移除可能存在的旧效果类
    elements.posterBackground.classList.remove('pixel-transition');
    
    // 添加像素化效果类
    elements.posterBackground.classList.add('pixel-transition');
    
    console.log('应用像素化过渡效果');
    
    // 动画结束后移除效果类
    setTimeout(() => {
      elements.posterBackground.classList.remove('pixel-transition');
    }, 1200); // 1秒动画时间 + 200ms缓冲
  }
  
  // 更新商家信息显示
  function updateBusinessInfoDisplay() {
    // 更新商家名称
    if (elements.posterBusinessName && state.businessInfo.name) {
      elements.posterBusinessName.textContent = state.businessInfo.name;
      elements.posterBusinessName.style.color = state.textColor || '#000000';
    }
    
    // 更新商家Logo
    if (elements.posterLogoImg) {
      elements.posterLogoImg.onload = function() {
        updateLogoSize();
      };

      const logoContainer = elements.posterLogoImg.parentElement;
      if (logoContainer) {
        const canvases = logoContainer.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        });
      }
      
      if (state.businessInfo.logo) {
        elements.posterLogoImg.dataset.cloudUrl = state.businessInfo.logo;
        elements.posterLogoImg.style.display = 'block';
        elements.logoDefaultImg.style.display = 'none';
        
        // 优先使用缓存的base64数据
        const cachedLogo = getFromCache(IMAGE_CACHE_KEYS.logo);
        if (cachedLogo && cachedLogo.startsWith('data:image')) {
          elements.posterLogoImg.src = cachedLogo;
        } else {
          elements.posterLogoImg.src = state.businessInfo.logo;
          loadImageAsBase64(state.businessInfo.logo).then(base64 => {
            saveToCache(IMAGE_CACHE_KEYS.logo, base64);
          }).catch(e => {
            console.error('Logo缓存加载失败:', e);
          });
        }
      } else {
        elements.posterLogoImg.src = '';
        elements.posterLogoImg.dataset.cloudUrl = '';
        elements.posterLogoImg.style.display = 'none';
        elements.logoDefaultImg.style.display = 'block';
      }

      updateLogoSize();
    }
    
    // 更新二维码
    if (elements.posterQrcodeImg) {
      const qrcodeContainer = elements.posterQrcodeImg.parentElement;
      if (qrcodeContainer) {
        const canvases = qrcodeContainer.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        });
      }
      
      if (state.businessInfo.qrcode) {
        elements.posterQrcodeImg.dataset.cloudUrl = state.businessInfo.qrcode;
        elements.posterQrcodeImg.style.display = 'block';
        elements.qrcodeDefaultImg.style.display = 'none';
        
        // 优先使用缓存的base64数据
        const cachedQr = getFromCache(IMAGE_CACHE_KEYS.qrcode);
        if (cachedQr && cachedQr.startsWith('data:image')) {
          elements.posterQrcodeImg.src = cachedQr;
        } else {
          elements.posterQrcodeImg.src = state.businessInfo.qrcode;
          loadImageAsBase64(state.businessInfo.qrcode).then(base64 => {
            saveToCache(IMAGE_CACHE_KEYS.qrcode, base64);
          }).catch(e => {
            console.error('二维码缓存加载失败:', e);
          });
        }
      } else {
        elements.posterQrcodeImg.src = '';
        elements.posterQrcodeImg.dataset.cloudUrl = '';
        elements.posterQrcodeImg.style.display = 'none';
        elements.qrcodeDefaultImg.style.display = 'block';
      }
    }
    
    // 更新促销信息
    if (elements.posterPromoText) {
      const promoText = state.businessInfo.promoText || '👇长按加好友/进粉丝福利群！\n🎁这里可以写引流文促销文案或地址/联系方式 📝（点击更改）';
      elements.posterPromoText.innerHTML = promoText.replace(/\n/g, '<br>');
      elements.posterPromoText.style.color = state.textColor;
    }
    
    // 同时更新商家信息弹窗中的促销信息输入框
    if (elements.promoTextInput) {
      const promoText = state.businessInfo.promoText || '👇长按加好友/进粉丝福利群！\n🎁这里可以写引流文促销文案或地址/联系方式 📝（点击更改）';
      elements.promoTextInput.value = promoText;
    }
    
    // 更新商家信息编辑弹窗中的颜色选择器状态
    const businessInfoColorSwatches = document.querySelectorAll('#businessInfoModal .color-swatch');
    businessInfoColorSwatches.forEach(swatch => {
      const color = swatch.getAttribute('data-color');
      if (color === state.textColor) {
        swatch.classList.add('selected');
      } else {
        swatch.classList.remove('selected');
      }
    });
    
    // 更新字体颜色选择弹窗中的颜色选择器状态
    const fontColorModalSwatches = document.querySelectorAll('#fontColorModal .color-swatch');
    fontColorModalSwatches.forEach(swatch => {
      const color = swatch.getAttribute('data-color');
      // 为当前颜色添加选中边框效果
      if (color === state.textColor) {
        swatch.style.border = '2px solid #333';
      } else {
        // 重置其他颜色的边框
        if (color === '#FFFFFF') {
          swatch.style.border = '1px solid #ddd';
        } else {
          swatch.style.border = '1px solid transparent';
        }
      }
    });
    
    // 更新字体颜色选择器的值
    if (elements.fontColorSelector) {
      elements.fontColorSelector.value = state.textColor;
    }
  }
  
  // 打开字体颜色选择弹窗
  function openFontColorModal() {
    if (!elements.fontColorModal || !elements.fontColorModalSelector) return;
    
    // 保存原始颜色，用于恢复
    originalTextColor = state.textColor;
    previewTextColor = state.textColor;
    colorConfirmed = false;
    
    // 初始化颜色选择器状态
    const colorOptions = elements.fontColorModalSelector.querySelectorAll('.color-swatch');
    colorOptions.forEach(option => {
      const color = option.getAttribute('data-color');
      
      // 移除所有选中和确认状态
      option.classList.remove('selected', 'confirmed');
      
      // 为当前颜色添加选中效果和✔标记
      if (color === state.textColor) {
        option.classList.add('selected', 'confirmed');
      }
    });
    
    // 同步更新商家信息编辑弹窗中的颜色选择器
    const businessInfoColorSwatches = document.querySelectorAll('#businessInfoModal .color-swatch');
    businessInfoColorSwatches.forEach(swatch => {
      const color = swatch.getAttribute('data-color');
      if (color === state.textColor) {
        swatch.classList.add('selected');
      } else {
        swatch.classList.remove('selected');
      }
    });
    
    // 移除关闭动画类
    elements.fontColorModal.classList.remove('closing');
    elements.fontColorModal.querySelector('.modal').classList.remove('closing');
    
    // 显示弹窗
    elements.fontColorModal.classList.remove('hidden');
    elements.fontColorModal.style.display = 'flex';
    
    // 强制重绘以触发动画
    void elements.fontColorModal.offsetWidth;
  }
  
  // 关闭字体颜色选择弹窗
  function closeFontColorModal() {
    if (!elements.fontColorModal) return;
    
    // 如果没有确认，恢复原始颜色
    if (!colorConfirmed && originalTextColor !== null) {
      state.textColor = originalTextColor;
      localStorage.setItem('textColor', state.textColor);
      updateBusinessInfoDisplay();
    }
    
    // 添加关闭动画类
    elements.fontColorModal.classList.add('closing');
    elements.fontColorModal.querySelector('.modal').classList.add('closing');
    
    // 延迟隐藏弹窗
    setTimeout(() => {
      elements.fontColorModal.classList.add('hidden');
      elements.fontColorModal.style.display = 'none';
      // 移除关闭动画类
      elements.fontColorModal.classList.remove('closing');
      elements.fontColorModal.querySelector('.modal').classList.remove('closing');
    }, 400); // 匹配动画时长
  }
  
  // 保存字体颜色函数保留但简化，因为现在点击颜色直接应用
  function saveFontColor() {
    // 直接关闭弹窗
    closeFontColorModal();
  }
  
  // 获取节日的未来日期
  function getFestivalFutureDate(festivalName) {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // 从全局节日数据中获取节日信息
    const allFestivals = utils.getAllFestivals();
    const festival = allFestivals[festivalName];
    
    if (!festival || festival.month === undefined || festival.day === undefined) return '';
    
    const month = festival.month;
    const day = festival.day;
    
    // 计算今年的节日日期
    let targetDate = new Date(currentYear, month - 1, day);
    
    // 如果今年的节日已经过了，使用明年的日期
    if (targetDate < today) {
      targetDate = new Date(currentYear + 1, month - 1, day);
    }
    
    // 格式化日期显示
    const year = targetDate.getFullYear();
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[targetDate.getDay()];
    
    return `${year}-${formattedMonth}-${formattedDay}  ${weekday}`;
  }

  // 计算距离指定日期的天数
  function getDaysUntilDate(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 解析日期字符串
    const dateParts = dateStr.split(' ')[0].split('-');
    if (dateParts.length !== 3) return 0;
    
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);
    
    const targetDate = new Date(year, month, day);
    targetDate.setHours(0, 0, 0, 0);
    
    // 计算时间差（毫秒）
    const timeDiff = targetDate.getTime() - today.getTime();
    
    // 转换为天数
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff;
  }

  // 滚动元素到可见区域中间
  function scrollToElement(element) {
    if (!element) return;
    
    const container = element.closest('.modal-festivals-scroll');
    if (!container) return;
    
    const containerWidth = container.clientWidth;
    const elementLeft = element.offsetLeft;
    const elementWidth = element.offsetWidth;
    
    // 计算目标滚动位置，使元素位于容器中间
    const targetScrollLeft = elementLeft - (containerWidth / 2) + (elementWidth / 2);
    
    // 平滑滚动
    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  }

  // 打开模板选择弹窗
  function openTemplateModal() {
    const loadingEl = document.getElementById('templateDataLoading');

    // 检查模板数据是否已加载
    if (!window.templatesDataLoaded) {
      // 显示弹窗和加载动画
      if (elements.templateModal) {
        elements.templateModal.classList.remove('hidden');
      }
      if (loadingEl) {
        loadingEl.style.display = 'flex';
      }

      // 加载数据
      if (window.loadTemplatesData) {
        window.loadTemplatesData();
      }

      // 监听数据加载完成
      const checkDataLoaded = setInterval(() => {
        if (window.templatesDataLoaded) {
          clearInterval(checkDataLoaded);

          // 隐藏加载动画
          if (loadingEl) {
            loadingEl.style.display = 'none';
          }

          // 初始化弹窗内容
          initTemplateModalContent();
        }
      }, 100);

      // 超时保护：5秒后如果还没加载完成，显示错误提示
      setTimeout(() => {
        if (!window.templatesDataLoaded) {
          clearInterval(checkDataLoaded);
          if (loadingEl) {
            loadingEl.innerHTML = `
              <div style="text-align: center; color: #ef4444;">
                ${window.getSVGIcon ? window.getSVGIcon('exclamation-triangle', 'svg-icon', {'font-size': '48px', 'margin-bottom': '16px'}) : '<i class="fa fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px;"></i>'}
                <div style="font-size: 16px;">加载失败，请关闭弹窗重试</div>
              </div>
            `;
            // 替换Font Awesome图标为SVG图标
            if (typeof replaceFAIcons === 'function') replaceFAIcons()
          }
        }
      }, 5000);

      return;
    }

    // 数据已加载，直接显示内容
    if (!elements.templateModal || !elements.templateGrid) return;

    elements.templateModal.classList.remove('hidden');
    initTemplateModalContent();
  }

  // 初始化模板弹窗内容
  function initTemplateModalContent() {

    // 清空模板网格
    elements.templateGrid.innerHTML = '';

    // 填充月份按钮
    fillMonthButtons();

    // 填充节日标签
    fillFestivalTags();

    // 填充模板网格
    fillTemplateGrid();

    // 根据当前日期自动选择月份和节日（与首页逻辑保持一致）
    autoSelectDateInModal();

    // 设置默认视图模式（平铺模式）
    switchTemplateViewMode(state.templateViewMode || 'grid');

    // 设置默认排序模式（随机）
    const sortMode = state.templateSortMode || 'random';
    state.templateSortMode = sortMode;
    if (elements.templateRandomSortBtn) {
      elements.templateRandomSortBtn.classList.toggle('active', sortMode === 'random');
    }
    if (elements.templateOriginalSortBtn) {
      elements.templateOriginalSortBtn.classList.toggle('active', sortMode === 'original');
    }

    // 移除关闭动画类
    elements.templateModal.classList.remove('closing');
    elements.templateModal.querySelector('.modal').classList.remove('closing');

    // 显示弹窗 - 通过移除hidden类
    elements.templateModal.classList.remove('hidden');
    // 同时设置display确保兼容性
    elements.templateModal.style.display = 'flex';

    // 强制重绘以触发动画
    void elements.templateModal.offsetWidth;
  }
  
  // 打开模板弹窗并自动选择指定节日/类别
  window.openTemplateModalWithFestival = function(festivalName) {
    if (!elements.templateModal || !elements.templateGrid) return;
    
    // 清空模板网格
    elements.templateGrid.innerHTML = '';
    
    // 填充月份按钮
    fillMonthButtons();
    
    // 填充节日标签
    fillFestivalTags();
    
    // 填充模板网格
    fillTemplateGrid();
    
    // 设置默认视图模式（平铺模式）
    switchTemplateViewMode(state.templateViewMode || 'grid');
    
    // 移除关闭动画类
    elements.templateModal.classList.remove('closing');
    elements.templateModal.querySelector('.modal').classList.remove('closing');
    
    // 显示弹窗 - 通过移除hidden类
    elements.templateModal.classList.remove('hidden');
    // 同时设置display确保兼容性
    elements.templateModal.style.display = 'flex';
    
    // 强制重绘以触发动画
    void elements.templateModal.offsetWidth;
    
    // 延迟选择节日标签，确保DOM已渲染
    setTimeout(() => {
      let targetFestivalTag = null;
      
      // 根据传入的节日名称查找对应的标签
      if (festivalName === 'zaoan' || festivalName === '☀️ 早安') {
        targetFestivalTag = document.querySelector('#modalFestivalTags .festival-tag[data-festival="☀️ 早安"]');
      } else if (festivalName === 'wanan' || festivalName === '🌙 晚安') {
        targetFestivalTag = document.querySelector('#modalFestivalTags .festival-tag[data-festival="🌙 晚安"]');
      } else {
        // 尝试直接匹配节日名称
        targetFestivalTag = document.querySelector(`#modalFestivalTags .festival-tag[data-festival="${festivalName}"]`);
        // 如果没找到，尝试匹配不带emoji的版本
        if (!targetFestivalTag) {
          const allTags = document.querySelectorAll('#modalFestivalTags .festival-tag');
          allTags.forEach(tag => {
            if (tag.textContent.includes(festivalName)) {
              targetFestivalTag = tag;
            }
          });
        }
      }
      
      if (targetFestivalTag) {
        // 移除所有标签的选中状态
        document.querySelectorAll('#modalFestivalTags .festival-tag').forEach(tag => tag.classList.remove('active'));
        // 添加当前标签的选中状态
        targetFestivalTag.classList.add('active');
        
        // 显示节日日期和倒计时（只有非早安/晚安的节日才显示）
        const filterFestival = targetFestivalTag.dataset.festival;
        if (filterFestival !== '☀️ 早安' && filterFestival !== '🌙 晚安') {
          const dateStr = getFestivalFutureDate(filterFestival);
          const daysUntil = getDaysUntilDate(dateStr);
          
          let countdownText = '';
          if (daysUntil > 0) {
            countdownText = `（还有${daysUntil}天）`;
          } else if (daysUntil === 0) {
            countdownText = `（今天）`;
          } else {
            countdownText = `（已过期）`;
          }
          
          if (elements.modalFestivalDateDisplay) {
            elements.modalFestivalDateDisplay.innerHTML = `${filterFestival}：${dateStr} <span style="font-weight: bold; color: red;">${countdownText}</span>`;
          }
        } else {
          // 早安/晚安清空日期显示
          if (elements.modalFestivalDateDisplay) {
            elements.modalFestivalDateDisplay.textContent = '';
          }
        }
        
        // 自动滚动到可见区域
        scrollToElement(targetFestivalTag);
        
        // 先筛选节日模板
        filterTemplatesByFestival(filterFestival);
        
        // 获取节日对应的月份并自动选中
        if (filterFestival !== '☀️ 早安' && filterFestival !== '🌙 晚安') {
          const allFestivals = utils.getAllFestivals();
          const festivalInfo = allFestivals[filterFestival];
          
          if (festivalInfo && festivalInfo.month) {
            const targetMonth = festivalInfo.month;
            const monthButton = document.querySelector(`#modalMonthButtons .month-btn[data-month="${targetMonth}"]`);
            
            if (monthButton) {
              // 移除所有月份的选中状态
              document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
              // 选中目标月份
              monthButton.classList.add('active');
              
              // 滚动到目标月份
              scrollToMonthButton(monthButton);
              
              // 筛选该月份的模板（这会重新填充节日标签）
              filterTemplatesByMonth(targetMonth);
              
              // 重新选中节日标签（因为filterTemplatesByMonth会重新填充节日标签）
              const newFestivalTag = document.querySelector(`#modalFestivalTags .festival-tag[data-festival="${filterFestival}"]`);
              if (newFestivalTag) {
                document.querySelectorAll('#modalFestivalTags .festival-tag').forEach(tag => tag.classList.remove('active'));
                newFestivalTag.classList.add('active');
                scrollToElement(newFestivalTag);
              }
            }
          }
        }
      }
    }, 100);
  }
  
  // 在模板弹窗中根据当前模板信息自动选择月份和节日
  function autoSelectDateInModal() {
    try {
      // 优先使用当前模板的信息进行定位
      if (state.currentTemplate) {
        console.log('根据当前模板定位:', state.currentTemplate);
        
        // 获取模板的月份（取第一个月份作为主要定位）
        if (state.currentTemplate.months && state.currentTemplate.months.length > 0) {
          const templateMonth = state.currentTemplate.months[0];
          console.log('定位到模板月份:', templateMonth);
          
          // 选中对应的月份按钮
          const monthButton = document.querySelector(`#modalMonthButtons .month-btn[data-month="${templateMonth}"]`);
          if (monthButton) {
            // 直接设置选中状态，避免重复触发点击事件
            document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
            monthButton.classList.add('active');
            
            // 筛选显示该月份的模板
            filterTemplatesByMonth(templateMonth);
            
            // 确保月份按钮滚动到可见位置，特别是对于末尾月份
            setTimeout(() => {
              forceScrollToMonthButton(monthButton);
              
              // 延迟选择节日，确保月份滚动和筛选已经完成
              setTimeout(() => {
                // 如果模板有节日信息，选中对应的节日标签
                if (state.currentTemplate.festivals && state.currentTemplate.festivals.length > 0) {
                  let templateFestival = state.currentTemplate.festivals[0];
                  console.log('定位到模板节日:', templateFestival);
                  
                  // 处理早安和晚安模板的特殊情况
                  let festivalTag;
                  if (templateFestival === '早安') {
                    festivalTag = document.querySelector('.festival-tag[data-festival="☀️ 早安"]');
                  } else if (templateFestival === '晚安') {
                    festivalTag = document.querySelector('.festival-tag[data-festival="🌙 晚安"]');
                  } else {
                    festivalTag = document.querySelector(`.festival-tag[data-festival="${templateFestival}"]`);
                  }
                  
                  if (festivalTag) {
                    festivalTag.click();
                  }
                }
                
                // 延迟选中当前模板，确保月份和节日筛选已经完成
                setTimeout(() => {
                  selectCurrentTemplateInModal();
                }, 200);
              }, 100);
            }, 50);
            
            return; // 成功定位后返回
          }
        }
      }
      
      // 如果没有当前模板或定位失败，则使用默认的日期定位
      console.log('使用默认日期定位');
      const result = utils.autoSelectByDate();
      if (result && result.month) {
        // 选中对应的月份按钮
        const monthButton = document.querySelector(`#modalMonthButtons .month-btn[data-month="${result.month}"]`);
        if (monthButton) {
          // 直接设置选中状态并滚动到可见位置
          document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
          monthButton.classList.add('active');
          filterTemplatesByMonth(result.month);
          forceScrollToMonthButton(monthButton);
        }
      }
    } catch (error) {
      console.error('自动选择日期失败:', error);
    }
  }
  
  // 强制滚动月份按钮到可见位置，特别是针对末尾月份
  function forceScrollToMonthButton(button) {
    const container = elements.modalMonthButtons;
    if (!container || !button) return;
    
    // 首先使用正常的居中滚动逻辑
    const buttonOffsetLeft = button.offsetLeft;
    const buttonWidth = button.offsetWidth;
    const containerWidth = container.clientWidth;
    const maxScrollLeft = container.scrollWidth - containerWidth;
    
    // 计算按钮中心点应该在容器中的位置
    const containerCenter = containerWidth / 2;
    const buttonCenter = buttonOffsetLeft + buttonWidth / 2;
    
    // 计算理想的滚动位置，让按钮居中
    let targetScrollPosition = buttonCenter - containerCenter;
    
    // 边界检查：确保滚动位置不会超出容器的可滚动范围
    targetScrollPosition = Math.max(0, Math.min(targetScrollPosition, maxScrollLeft));
    
    // 执行滚动
    container.scrollTo({
      left: targetScrollPosition,
      behavior: 'smooth'
    });
    
    // 额外检查：确保末尾月份能够完全可见
    // 立即执行一次强制滚动，避免动画延迟导致的问题
    setTimeout(() => {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // 检查按钮是否完全在容器可视区域内
      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        // 如果不在可视区域内，执行更直接的滚动
        console.log('执行强制滚动以确保月份按钮可见');
        
        // 计算需要滚动的距离
        const scrollLeft = container.scrollLeft + (buttonRect.left - containerRect.left) - 10;
        
        // 使用非动画滚动，确保立即滚动到位
        container.scrollLeft = Math.max(0, Math.min(scrollLeft, maxScrollLeft));
      }
    }, 100);
  }
  
  // 在模态框中选中当前使用的模板
  function selectCurrentTemplateInModal() {
    if (state.currentTemplate) {
      console.log('尝试选中当前模板:', state.currentTemplate.id);
      const templateItem = document.querySelector(`.template-item[data-template-id="${state.currentTemplate.id}"]`);
      if (templateItem) {
        // 移除其他模板的选中状态
        document.querySelectorAll('.template-item').forEach(item => item.classList.remove('selected'));
        // 添加当前模板的选中状态
        templateItem.classList.add('selected');
        // 滚动到当前模板，确保可见（已取消滚动功能）
        // templateItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log('成功选中当前模板');
      } else {
        console.warn('未找到当前模板对应的项');
      }
    }
  }
  
  // 填充月份按钮
  function fillMonthButtons() {
    if (!elements.modalMonthButtons) return;

    // 清空现有内容
    elements.modalMonthButtons.innerHTML = '';

    // 创建月份按钮
    const currentMonth = new Date().getMonth() + 1;
    for (let i = 1; i <= 12; i++) {
      const monthBtn = document.createElement('button');
      monthBtn.className = 'month-btn';
      monthBtn.textContent = i === currentMonth ? '本月' : `${i}月`;

      // 为当前月份按钮添加特殊标识
      if (i === currentMonth) {
        monthBtn.classList.add('current-month');
      }

      // 为每个月份按钮添加自定义data属性，方便后续查找
      monthBtn.dataset.month = i;
      
      monthBtn.addEventListener('click', function() {
        // 移除所有按钮的选中状态
        document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
        // 添加当前按钮的选中状态
        this.classList.add('active');
        // 筛选显示该月份的模板
        filterTemplatesByMonth(i);
        
        // 自动滚动到当前选中的月份，使其居中显示
        scrollToMonthButton(this);
        
        // 定位到对应节日
        setTimeout(() => {
          const month = parseInt(this.dataset.month);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const currentMonth = today.getMonth() + 1;
          
          // 统一逻辑：无论是当前月还是其他月，都优先找当天节日，再找最近的未来节日，最后找第一个节日
          const festivalsInMonth = utils.getFestivalNamesByMonth(month);
          const actualFestivals = festivalsInMonth.filter(f => f !== '☀️ 早安' && f !== '🌙 晚安');
          
          if (actualFestivals.length === 0) return;
          
          // 获取该月份所有节日的日期信息
          const allFestivalsData = utils.getAllFestivals();
          const todayFestival = actualFestivals.find(fName => {
            const fData = allFestivalsData[fName];
            if (!fData) return false;
            // 检查是否是今天
            const fDate = new Date(today.getFullYear(), fData.month - 1, fData.day);
            fDate.setHours(0, 0, 0, 0);
            return fDate.getTime() === today.getTime();
          });
          
          let targetFestivalName = null;
          
          if (todayFestival) {
            // 优先：当天就是节日
            targetFestivalName = todayFestival;
          } else {
            // 找该月份中最近的未来节日
            const futureFestivals = actualFestivals
              .map(fName => {
                const fData = allFestivalsData[fName];
                if (!fData) return null;
                const fDate = new Date(today.getFullYear(), fData.month - 1, fData.day);
                fDate.setHours(0, 0, 0, 0);
                const diff = fDate - today;
                return { name: fName, diff: diff };
              })
              .filter(f => f && f.diff >= 0)
              .sort((a, b) => a.diff - b.diff);
            
            if (futureFestivals.length > 0) {
              // 有未来节日，选最近的
              targetFestivalName = futureFestivals[0].name;
            } else {
              // 没有未来节日（该月所有节日都已过），定位到第一个节日
              targetFestivalName = actualFestivals[0];
            }
          }
          
          if (targetFestivalName) {
            const festivalTags = document.querySelectorAll('.festival-tag');
            let targetTag = null;
            festivalTags.forEach(tag => {
              const tagFestival = tag.dataset.festival || tag.textContent;
              if (tagFestival === targetFestivalName) {
                targetTag = tag;
              }
            });
            if (targetTag) {
              targetTag.scrollIntoView({ behavior: 'smooth', block: 'center' });
              if (!targetTag.classList.contains('active')) {
                targetTag.click();
              }
            }
          }
        }, 300);
      });
      elements.modalMonthButtons.appendChild(monthBtn);
    }
    
    // 月份按钮滚动到中间的辅助函数
    function scrollToMonthButton(button) {
      const container = elements.modalMonthButtons;
      
      // 获取按钮相对于容器的位置
      const buttonOffsetLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.clientWidth;
      
      // 获取容器可滚动的最大距离
      const maxScrollLeft = container.scrollWidth - containerWidth;
      
      // 计算按钮中心点应该在容器中的位置
      const containerCenter = containerWidth / 2;
      const buttonCenter = buttonOffsetLeft + buttonWidth / 2;
      
      // 计算理想的滚动位置，让按钮居中
      let targetScrollPosition = buttonCenter - containerCenter;
      
      // 边界检查：确保滚动位置不会超出容器的可滚动范围
      targetScrollPosition = Math.max(0, Math.min(targetScrollPosition, maxScrollLeft));
      
      // 使用setTimeout确保DOM更新完成后再执行滚动
      setTimeout(() => {
        container.scrollTo({
          left: targetScrollPosition,
          behavior: 'smooth'
        });
      }, 50);
    }
    
    // 不再设置默认月份，由autoSelectDateInModal函数根据当前模板自动定位
    // 这样可以确保定位到正确的月份和节日，避免覆盖模板定位逻辑
  }
  
  // 设置模板网格视图的触摸手势
  function setupTemplateGridTouchGestures() {
    const templateGrid = elements.templateGrid || document.getElementById('modalTemplatesGrid');
    if (!templateGrid) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let isSwiping = false;
    
    templateGrid.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isSwiping = true;
    }, { passive: true });
    
    templateGrid.addEventListener('touchmove', function(e) {
      if (!isSwiping) return;
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    }, { passive: true });
    
    templateGrid.addEventListener('touchend', function(e) {
      if (!isSwiping) return;
      isSwiping = false;
      
      const swipeDistanceX = touchEndX - touchStartX;
      const swipeDistanceY = touchEndY - touchStartY;
      const swipeTime = Date.now() - touchStartTime;
      
      const minSwipeDistance = 100; // 最小滑动距离（从50增加到100）
      const maxSwipeTime = 500; // 最大滑动时间（毫秒）
      const minSwipeSpeed = 0.2; // 最小滑动速度（像素/毫秒）
      
      const absX = Math.abs(swipeDistanceX);
      const absY = Math.abs(swipeDistanceY);
      
      const isValidSwipe = 
        absX > minSwipeDistance && // 水平滑动距离足够
        absX > absY * 1.5 && // 水平滑动大于垂直滑动
        swipeTime < maxSwipeTime && // 滑动时间不能太长
        (absX / swipeTime) > minSwipeSpeed; // 滑动速度足够快
      
      if (isValidSwipe) {
        e.preventDefault(); // 阻止默认行为
        
        if (swipeDistanceX > 0) {
          switchToPrevFestival();
        } else {
          switchToNextFestival();
        }
      }
      
      touchStartX = 0;
      touchStartY = 0;
      touchEndX = 0;
      touchEndY = 0;
      touchStartTime = 0;
    });
  }
  
  // 切换到下一个节日
  function switchToNextFestival() {
    const festivalTags = document.querySelectorAll('#modalFestivalTags .festival-tag');
    if (festivalTags.length === 0) return;
    
    // 找到当前选中的节日标签
    let currentIndex = -1;
    festivalTags.forEach((tag, index) => {
      if (tag.classList.contains('active')) {
        currentIndex = index;
      }
    });
    
    if (currentIndex === -1) return;
    
    // 计算下一个节日的索引
    let nextIndex = currentIndex + 1;
    
    // 如果是最后一个节日，切换到下一个月的第一个节日
    if (nextIndex >= festivalTags.length) {
      // 获取当前选中的月份
      const monthButtons = document.querySelectorAll('#modalMonthButtons .month-btn');
      let currentMonthIndex = -1;
      monthButtons.forEach((btn, index) => {
        if (btn.classList.contains('active')) {
          currentMonthIndex = index;
        }
      });
      
      // 切换到下一个月
      let nextMonthIndex = currentMonthIndex + 1;
      if (nextMonthIndex >= monthButtons.length) {
        nextMonthIndex = 0; // 回到第一个月
      }
      
      // 点击下一个月按钮
      if (monthButtons[nextMonthIndex]) {
        monthButtons[nextMonthIndex].click();
        
        // 等待节日标签更新后，点击第一个节日
        setTimeout(() => {
          const newFestivalTags = document.querySelectorAll('#modalFestivalTags .festival-tag');
          if (newFestivalTags.length > 0) {
            newFestivalTags[0].click();
          }
        }, 100);
      }
    } else {
      // 点击下一个节日标签
      festivalTags[nextIndex].click();
    }
  }
  
  // 切换到上一个节日
  function switchToPrevFestival() {
    const festivalTags = document.querySelectorAll('#modalFestivalTags .festival-tag');
    if (festivalTags.length === 0) return;
    
    // 找到当前选中的节日标签
    let currentIndex = -1;
    festivalTags.forEach((tag, index) => {
      if (tag.classList.contains('active')) {
        currentIndex = index;
      }
    });
    
    if (currentIndex === -1) return;
    
    // 计算上一个节日的索引
    let prevIndex = currentIndex - 1;
    
    // 如果是第一个节日，切换到上一个月的最后一个节日
    if (prevIndex < 0) {
      // 获取当前选中的月份
      const monthButtons = document.querySelectorAll('#modalMonthButtons .month-btn');
      let currentMonthIndex = -1;
      monthButtons.forEach((btn, index) => {
        if (btn.classList.contains('active')) {
          currentMonthIndex = index;
        }
      });
      
      // 切换到上一个月
      let prevMonthIndex = currentMonthIndex - 1;
      if (prevMonthIndex < 0) {
        prevMonthIndex = monthButtons.length - 1; // 回到最后一个月
      }
      
      // 点击上一个月按钮
      if (monthButtons[prevMonthIndex]) {
        monthButtons[prevMonthIndex].click();
        
        // 等待节日标签更新后，点击最后一个节日
        setTimeout(() => {
          const newFestivalTags = document.querySelectorAll('#modalFestivalTags .festival-tag');
          if (newFestivalTags.length > 0) {
            newFestivalTags[newFestivalTags.length - 1].click();
          }
        }, 100);
      }
    } else {
      // 点击上一个节日标签
      festivalTags[prevIndex].click();
    }
  }
  
  // 填充节日标签
  function fillFestivalTags(selectedMonth = null) {
    if (!elements.modalFestivalTags) return;
    
    // 清空现有内容
    elements.modalFestivalTags.innerHTML = '';
    
    // 首先添加早安标签
    const zaoanTag = document.createElement('div');
    zaoanTag.className = 'festival-tag';
    zaoanTag.textContent = '☀️ 早安';
    zaoanTag.dataset.festival = '☀️ 早安';
    
    // 为早安标签添加点击事件
    const zaoanClickHandler = function() {
      // 移除所有标签的选中状态
      document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
      // 添加当前标签的选中状态
      this.classList.add('active');
      // 清空节日日期显示
      if (elements.modalFestivalDateDisplay) {
        elements.modalFestivalDateDisplay.textContent = '';
      }
      // 自动滚动到可见区域
      scrollToElement(this);
      // 筛选显示早安模板
      filterTemplatesByFestival('☀️ 早安');
    };
    
    zaoanTag.addEventListener('click', zaoanClickHandler);
    // 存储事件处理函数引用，便于后续移除
    zaoanTag._clickHandler = zaoanClickHandler;
    
    elements.modalFestivalTags.appendChild(zaoanTag);
    
    // 添加晚安标签
    const wananTag = document.createElement('div');
    wananTag.className = 'festival-tag';
    wananTag.textContent = '🌙 晚安';
    wananTag.dataset.festival = '🌙 晚安';
    
    // 为晚安标签添加点击事件
    const wananClickHandler = function() {
      // 移除所有标签的选中状态
      document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
      // 添加当前标签的选中状态
      this.classList.add('active');
      // 清空节日日期显示
      if (elements.modalFestivalDateDisplay) {
        elements.modalFestivalDateDisplay.textContent = '';
      }
      // 自动滚动到可见区域
      scrollToElement(this);
      // 筛选显示晚安模板
      filterTemplatesByFestival('🌙 晚安');
    };
    
    wananTag.addEventListener('click', wananClickHandler);
    // 存储事件处理函数引用，便于后续移除
    wananTag._clickHandler = wananClickHandler;
    
    elements.modalFestivalTags.appendChild(wananTag);
    
    // 获取节日列表
    let festivals = [];
    
    // 获取所有节日数据
    const allFestivalsData = utils.getAllFestivals();
    
    if (selectedMonth) {
      // 如果指定了月份，只获取该月份的节日
      festivals = Object.keys(allFestivalsData).filter(festivalName => {
        const festival = allFestivalsData[festivalName];
        return festival.month === selectedMonth;
      });
    } else {
      // 否则获取所有节日
      festivals = Object.keys(allFestivalsData);
    }
    
    // 获取节日数据并按日期排序
    const allFestivals = utils.getAllFestivals();
    const festivalsWithDate = festivals.map(festival => {
      const festivalData = allFestivals[festival] || { month: 1, day: 1 }; // 默认值，防止数据缺失
      return {
        name: festival,
        month: festivalData.month,
        day: festivalData.day
      };
    });
    
    // 按日期排序
    festivalsWithDate.sort((a, b) => {
      if (a.month !== b.month) {
        return a.month - b.month;
      }
      return a.day - b.day;
    });
    
    // 创建节日标签
    festivalsWithDate.forEach(festival => {
      const festivalTag = document.createElement('div');
      festivalTag.className = 'festival-tag';
      festivalTag.textContent = festival.name;
      festivalTag.dataset.festival = festival.name;
    
      // 创建事件处理函数引用，便于后续移除
      const tagClickHandler = function() {
        // 移除所有标签的选中状态
        document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
        // 添加当前标签的选中状态
        this.classList.add('active');
        
        // 显示节日日期和倒计时
        const dateStr = getFestivalFutureDate(festival.name);
        const daysUntil = getDaysUntilDate(dateStr);
        
        let countdownText = '';
        if (daysUntil > 0) {
          countdownText = `（还有${daysUntil}天）`;
        } else if (daysUntil === 0) {
          countdownText = `（今天）`;
        } else {
          countdownText = `（已过期）`;
        }
        
        if (elements.modalFestivalDateDisplay) {
          elements.modalFestivalDateDisplay.innerHTML = `${festival.name}：${dateStr} <span style="font-weight: bold; color: red;">${countdownText}</span>`;
        }
        
        // 自动滚动到可见区域
        scrollToElement(this);
        
        // 筛选显示该节日的模板
        filterTemplatesByFestival(festival.name);
      };
      
      festivalTag.addEventListener('click', tagClickHandler);
      // 存储事件处理函数引用，便于后续移除
      festivalTag._clickHandler = tagClickHandler;
      
      elements.modalFestivalTags.appendChild(festivalTag);
    });
  }
  
  // 填充模板网格
  function fillTemplateGrid() {
    if (!window.templates || !elements.templateGrid) return;
    
    // 清空现有内容
    elements.templateGrid.innerHTML = '';

    // 取消之前的加载任务
    ThumbnailLoader.cancelCurrentLoad();
    const loadId = ThumbnailLoader.generateLoadId();

    // 获取所有模板列表并更新状态
    state.allTemplatesList = getAllTemplatesList();
    state.currentSlideTemplatesList = state.allTemplatesList;

    // 收集需要加载的图片
    const loadQueue = [];

    // 动画计数器
    let animationIndex = 0;

    // 获取所有月份键并根据排序模式决定顺序
    let monthKeys = Object.keys(window.templates);

    // 如果是随机模式，打乱月份顺序
    if (state.templateSortMode === 'random') {
      monthKeys = shuffleArray(monthKeys);
    }

    // 遍历所有模板
    for (const monthKey of monthKeys) {
      const monthTemplates = window.templates[monthKey];

      // 如果是随机模式，打乱该月份内的模板顺序
      let templatesToRender = monthTemplates;
      if (state.templateSortMode === 'random') {
        templatesToRender = shuffleArray(monthTemplates);
      }

      templatesToRender.forEach(template => {
        // 跳过无效模板
        if (!template || !template.image) {
          console.warn('跳过无效模板:', monthKey, template);
          return;
        }

        // 创建模板项
        const templateItem = document.createElement('div');
        templateItem.className = 'template-item';
        templateItem.dataset.templateId = template.id;
        
        // 检查模板是否可用（当月+2月以内可用）
        const availability = getTemplateAvailability(template);
        if (!availability.available) {
          templateItem.classList.add('template-locked');
        }
        
        // 是否为当前选中的模板
        const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;
        
        // 创建模板图片容器
        const templateImgContainer = document.createElement('div');
        templateImgContainer.className = 'template-thumbnail-container';
        
        // 创建加载动画
        const spinner = document.createElement('div');
        spinner.className = 'thumbnail-spinner';
        spinner.innerHTML = '<div class="spinner-ring"></div>';
        
        // 创建模板图片
        const templateImg = document.createElement('img');
        templateImg.alt = template.name;
        templateImg.className = 'template-thumbnail loading';
        templateImg.dataset.originalPath = template.image;
        
        // 获取缩略图URL（开放模板用-86thumb，未开放用-20thumb）
        const thumbnailUrl = window.imageConfig ? window.imageConfig.getThumbnailUrl(template.image, availability.available) : template.image;
        const fallbackUrl = window.imageConfig ? window.imageConfig.getThumbnailPath(template.image, availability.available) : template.image;
        
        // 添加到加载队列
        loadQueue.push({
          img: templateImg,
          url: thumbnailUrl,
          fallbackUrl: fallbackUrl
        });
        
        // 创建圆形勾选按钮
        const checkButton = document.createElement('div');
        checkButton.className = 'template-check-button';
        checkButton.innerHTML = window.getSVGIcon ? window.getSVGIcon('check', 'svg-icon') : '<i class="fa fa-check"></i>';
        
        // 设置初始勾选状态
        if (isSelected) {
          checkButton.classList.add('checked');
        }
        
        // 为勾选按钮添加点击事件
        checkButton.addEventListener('click', function(e) {
          e.stopPropagation();
          
          // 锁定的模板不可使用
          if (templateItem.classList.contains('template-locked')) {
            showToast('该模板尚未开放，敬请期待');
            return;
          }
          
          console.log('点击勾选按钮选择模板:', template.name);
          
          document.querySelectorAll('.template-check-button').forEach(btn => {
            btn.classList.remove('checked');
          });
          
          this.classList.add('checked');
          selectTemplate(template);
          closeTemplateModal();
        });
        
        // 为模板项添加点击事件
        templateItem.addEventListener('click', function() {
          // 锁定的模板不可使用
          if (templateItem.classList.contains('template-locked')) {
            showToast('该模板尚未开放，敬请期待');
            return;
          }
          
          document.querySelectorAll('.template-check-button').forEach(btn => {
            btn.classList.remove('checked');
          });
          
          checkButton.classList.add('checked');
          selectTemplate(template);
        });
        
        // 添加双击事件
        templateItem.addEventListener('dblclick', function() {
          // 锁定的模板不可使用
          if (templateItem.classList.contains('template-locked')) {
            showToast('该模板尚未开放，敬请期待');
            return;
          }
          
          console.log('双击选中模板并关闭弹窗:', template.name);
          
          document.querySelectorAll('.template-check-button').forEach(btn => {
            btn.classList.remove('checked');
          });
          
          checkButton.classList.add('checked');
          selectTemplate(template);
          closeTemplateModal();
        });
        
        // 创建模板名称
        const templateName = document.createElement('div');
        templateName.className = 'template-name';
        templateName.textContent = template.name;
        
        // 组合模板项
        templateImgContainer.appendChild(spinner);
        templateImgContainer.appendChild(templateImg);
        templateImgContainer.appendChild(checkButton);
        
        // 锁定的模板：添加模糊和遮罩
        if (!availability.available) {
          templateImg.classList.add('blurred');
          const lockOverlay = document.createElement('div');
          lockOverlay.className = 'template-lock-overlay';
          lockOverlay.innerHTML = `
            <span class="lock-big-text">待开放</span>
            <span class="lock-small-text">调整期，将提前2月开放</span>
          `;
          templateImgContainer.appendChild(lockOverlay);
        }
        
        templateItem.appendChild(templateImgContainer);
        templateItem.appendChild(templateName);

        // 添加逐个叠加动画
        templateItem.classList.add('template-item-enter');
        templateItem.style.animationDelay = `${animationIndex * 60}ms`;
        animationIndex++;

        if (elements.templateGrid) {
          elements.templateGrid.appendChild(templateItem);
        }
      });
    }
    
    // 添加自定义背景入口
    addCustomBackgroundEntryToModal();
    
    // 开始批量加载图片
    ThumbnailLoader.loadBatch(loadQueue, loadId, 6);
    
    // 初始化幻灯片视图
    initTemplateSlideView();
  }
  
  // 初始化模板幻灯片视图
  function initTemplateSlideView() {
    if (!elements.templateGalleryContainer) return;

    const templatesList = state.currentSlideTemplatesList.length > 0 ?
                          state.currentSlideTemplatesList :
                          state.allTemplatesList;

    if (!templatesList.length) return;

    // 如果是随机模式，打乱模板顺序
    let sortedTemplatesList = templatesList;
    if (state.templateSortMode === 'random') {
      sortedTemplatesList = shuffleArray(templatesList);
      // 更新状态以便后续幻灯片操作使用
      state.currentSlideTemplatesList = sortedTemplatesList;
    }

    elements.templateGalleryContainer.innerHTML = '';

    sortedTemplatesList.forEach((template, index) => {
      if (!template || !template.image) {
        console.warn('跳过无效模板:', index, template);
        return;
      }

      const slide = document.createElement('div');
      slide.className = 'template-gallery-slide hidden-slide';
      slide.dataset.index = index;
      slide.dataset.loaded = 'false';
      slide.dataset.image = template.image;

      const img = document.createElement('img');
      img.src = 'images/statics/loading88.gif';
      img.alt = template.name;
      img.className = 'slide-img';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'slide-name';
      nameDiv.textContent = template.name;

      slide.appendChild(img);
      slide.appendChild(nameDiv);

      slide.addEventListener('click', function() {
        // 锁定的模板不可使用
        const tmplData = templatesList[parseInt(this.dataset.index)];
        if (tmplData) {
          const avail = getTemplateAvailability(tmplData);
          if (!avail.available) {
            showToast('该模板尚未开放，敬请期待');
            return;
          }
        }
        if (this.classList.contains('current')) {
          selectTemplate(template);
          closeTemplateModal();
        } else {
          const clickedIndex = parseInt(this.dataset.index);
          goToSlide(clickedIndex);
        }
      });

      elements.templateGalleryContainer.appendChild(slide);
    });

    if (state.currentTemplate) {
      const currentIndex = sortedTemplatesList.findIndex(t => t.id === state.currentTemplate.id);
      state.currentSlideIndex = currentIndex >= 0 ? currentIndex : 0;
    } else {
      state.currentSlideIndex = 0;
    }

    updateSlidePositions();
    loadSlideImages();

    initSlideTouchEvents();
  }

  // 懒加载幻灯片图片
  function loadSlideImages() {
    const slides = elements.templateGalleryContainer?.querySelectorAll('.template-gallery-slide');
    if (!slides) return;

    // 获取当前模板列表（与 initTemplateSlideView 保持一致）
    const templatesList = state.currentSlideTemplatesList.length > 0 ?
                          state.currentSlideTemplatesList :
                          state.allTemplatesList;

    const loadId = ThumbnailLoader.currentLoadId;

    slides.forEach((slide, index) => {
      if (slide.dataset.loaded === 'true') return;

      const shouldLoad = slide.classList.contains('current') ||
                         slide.classList.contains('prev-1') ||
                         slide.classList.contains('prev-2') ||
                         slide.classList.contains('next-1') ||
                         slide.classList.contains('next-2');

      if (shouldLoad) {
        const img = slide.querySelector('.slide-img');
        const imagePath = slide.dataset.image;
        if (img && imagePath && img.src.includes('loading88.gif')) {
          const templateData = templatesList[index];
          const available = templateData ? getTemplateAvailability(templateData).available : true;
          const imageUrl = window.imageConfig ? window.imageConfig.getThumbnailUrl(imagePath, available) : imagePath;
          const fallbackUrl = window.imageConfig ? window.imageConfig.getThumbnailPath(imagePath, available) : imagePath;

          ThumbnailLoader.loadThumbnail(img, imageUrl, fallbackUrl, loadId, index).then(success => {
            if (success) {
              slide.dataset.loaded = 'true';
            }
          });
        }
      }
    });
  }
  
  // 初始化幻灯片触摸滑动事件
  function initSlideTouchEvents() {
    const container = elements.templateGalleryContainer;
    if (!container) return;
    
    if (container.dataset.touchInitialized) return;
    container.dataset.touchInitialized = 'true';
    
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;
    let dragDeltaX = 0;
    let cumulativeSwipe = 0;
    const swipeUnit = 50;
    
    function handleTouchStart(e) {
      if (state.slideAutoPlayInterval) {
        stopSlideAutoPlay();
      }
      
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      isDragging = true;
      dragDeltaX = 0;
      cumulativeSwipe = 0;
      
      const slides = container.querySelectorAll('.template-gallery-slide');
      slides.forEach(slide => {
        slide.style.transition = 'none';
      });
    }
    
    function handleTouchMove(e) {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      
      if (Math.abs(deltaX) < Math.abs(deltaY) && Math.abs(cumulativeSwipe) < 10) {
        return;
      }
      
      e.preventDefault();
      
      dragDeltaX = deltaX;
      cumulativeSwipe = deltaX;
      
      applyDragOffset(cumulativeSwipe);
    }
    
    function handleTouchEnd(e) {
      if (!isDragging) return;
      isDragging = false;
      
      const slides = container.querySelectorAll('.template-gallery-slide');
      slides.forEach(slide => {
        slide.style.transition = '';
      });
      
      const total = state.allTemplatesList.length;
      if (total <= 1) {
        clearDragOffset();
        return;
      }
      
      const units = Math.floor(Math.abs(cumulativeSwipe) / swipeUnit);
      let targetIndex = state.currentSlideIndex;
      
      if (cumulativeSwipe > 0) {
        targetIndex = (state.currentSlideIndex - units + total) % total;
      } else if (cumulativeSwipe < 0) {
        targetIndex = (state.currentSlideIndex + units) % total;
      }
      
      clearDragOffset();
      goToSlide(targetIndex);
      
      if (state.slideAutoPlaying) {
        setTimeout(() => {
          startSlideAutoPlay();
        }, 3000);
      }
    }
    
    function applyDragOffset(deltaX) {
      const slides = container.querySelectorAll('.template-gallery-slide');
      slides.forEach(slide => {
        slide.style.setProperty('--drag-offset', `${deltaX}px`);
      });
    }
    
    function clearDragOffset() {
      const slides = container.querySelectorAll('.template-gallery-slide');
      slides.forEach(slide => {
        slide.style.setProperty('--drag-offset', '0px');
      });
    }
    
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true });
  }
  
  // 更新幻灯片位置
  function updateSlidePositions() {
    const slides = elements.templateGalleryContainer?.querySelectorAll('.template-gallery-slide');
    if (!slides || !slides.length) return;
    
    const total = slides.length;
    const current = state.currentSlideIndex;
    
    slides.forEach((slide, index) => {
      slide.classList.remove('prev-2', 'prev-1', 'current', 'next-1', 'next-2', 'hidden-slide');
      
      const prev1Index = (current - 1 + total) % total;
      const prev2Index = (current - 2 + total) % total;
      const next1Index = (current + 1) % total;
      const next2Index = (current + 2) % total;
      
      if (index === current) {
        slide.classList.add('current');
      } else if (index === prev1Index) {
        slide.classList.add('prev-1');
      } else if (index === prev2Index) {
        slide.classList.add('prev-2');
      } else if (index === next1Index) {
        slide.classList.add('next-1');
      } else if (index === next2Index) {
        slide.classList.add('next-2');
      } else {
        slide.classList.add('hidden-slide');
      }
    });
    
    if (elements.templateSlideName && state.allTemplatesList[current]) {
      elements.templateSlideName.textContent = state.allTemplatesList[current].name;
    }
    if (elements.templateSlideCounter) {
      elements.templateSlideCounter.textContent = `${current + 1} / ${total}`;
    }
  }
  
  // 跳转到指定幻灯片
  function goToSlide(index) {
    state.currentSlideIndex = index;
    updateSlidePositions();
    loadSlideImages();
  }

  // 上一个幻灯片
  function prevSlide() {
    if (!state.allTemplatesList.length) return;
    state.currentSlideIndex = (state.currentSlideIndex - 1 + state.allTemplatesList.length) % state.allTemplatesList.length;
    updateSlidePositions();
    loadSlideImages();
  }

  // 下一个幻灯片
  function nextSlide() {
    if (!state.allTemplatesList.length) return;
    state.currentSlideIndex = (state.currentSlideIndex + 1) % state.allTemplatesList.length;
    updateSlidePositions();
    loadSlideImages();
  }
  
  // 开始幻灯片自动播放
  function startSlideAutoPlay() {
    if (state.slideAutoPlayInterval) return;
    
    state.slideAutoPlaying = true;
    updatePlayPauseButton();
    
    state.slideAutoPlayInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  }
  
  // 停止幻灯片自动播放
  function stopSlideAutoPlay() {
    if (state.slideAutoPlayInterval) {
      clearInterval(state.slideAutoPlayInterval);
      state.slideAutoPlayInterval = null;
    }
    state.slideAutoPlaying = false;
    updatePlayPauseButton();
  }
  
  // 切换自动播放状态
  function toggleSlideAutoPlay() {
    if (state.slideAutoPlaying) {
      stopSlideAutoPlay();
    } else {
      startSlideAutoPlay();
    }
  }
  
  // 更新播放/暂停按钮状态
  function updatePlayPauseButton() {
    const btn = elements.slidePlayPauseBtn;
    if (!btn) return;
    
    const iconSpan = btn.querySelector('.svg-icon') || btn.querySelector('i');
    if (iconSpan) {
      if (state.slideAutoPlaying) {
        iconSpan.innerHTML = window.SVGIcons ? window.SVGIcons['pause'] : '';
        iconSpan.className = 'svg-icon';
        btn.title = '暂停';
      } else {
        iconSpan.innerHTML = window.SVGIcons ? window.SVGIcons['play'] : '';
        iconSpan.className = 'svg-icon';
        btn.title = '播放';
      }
    }
  }
  
  // 切换视图模式
  function switchTemplateViewMode(mode) {
    state.templateViewMode = mode;

    const gridView = elements.templateGrid;
    const slideView = elements.templateSlideView;
    const gridBtn = elements.templateGridViewBtn;
    const slideBtn = elements.templateSlideViewBtn;

    if (mode === 'grid') {
      gridView?.classList.remove('hidden');
      slideView?.classList.add('hidden');
      gridBtn?.classList.add('active');
      slideBtn?.classList.remove('active');
      stopSlideAutoPlay();
    } else {
      gridView?.classList.add('hidden');
      slideView?.classList.remove('hidden');
      gridBtn?.classList.remove('active');
      slideBtn?.classList.add('active');
      initTemplateSlideView();
      startSlideAutoPlay();
    }
  }

  // 切换模板排序模式
  function switchTemplateSortMode(mode) {
    state.templateSortMode = mode;

    const randomBtn = elements.templateRandomSortBtn;
    const originalBtn = elements.templateOriginalSortBtn;

    if (mode === 'random') {
      randomBtn?.classList.add('active');
      originalBtn?.classList.remove('active');
    } else {
      randomBtn?.classList.remove('active');
      originalBtn?.classList.add('active');
    }

    // 检查当前是否有节日标签选中
    const activeFestivalTag = document.querySelector('#modalFestivalTags .festival-tag.active');
    if (activeFestivalTag) {
      // 有节日筛选时，重新筛选当前节日的模板
      const festival = activeFestivalTag.dataset.festival;
      filterTemplatesByFestival(festival);
    } else {
      // 无节日筛选时，重新填充所有模板网格
      fillTemplateGrid();
    }
  }

  // 随机打乱数组（Fisher-Yates算法）
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // 获取所有模板的扁平化列表
  function getAllTemplatesList() {
    const allTemplates = [];

    // 遍历所有月份，收集所有模板
    for (const monthKey in window.templates) {
      if (window.templates[monthKey]) {
        // 过滤掉无效模板（使用 image 字段，因为 thumbnail 已删除）
        const validTemplates = window.templates[monthKey].filter(t => t && t.image);
        allTemplates.push(...validTemplates);
      }
    }

    return allTemplates;
  }

  // 切换到上一个模板
  function switchToPrevTemplate() {
    if (!state.currentTemplate) return;
    
    const allTemplates = getAllTemplatesList();
    if (allTemplates.length <= 1) return;
    
    // 查找当前模板的索引
    const currentIndex = allTemplates.findIndex(template => template.id === state.currentTemplate.id);
    
    // 计算上一个模板的索引
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = allTemplates.length - 1; // 循环到最后一个
    }
    
    // 切换到上一个模板
    const prevTemplate = allTemplates[prevIndex];
    selectTemplate(prevTemplate);
  }

  // 切换到下一个模板
  function switchToNextTemplate() {
    if (!state.currentTemplate) return;
    
    const allTemplates = getAllTemplatesList();
    if (allTemplates.length <= 1) return;
    
    // 查找当前模板的索引
    const currentIndex = allTemplates.findIndex(template => template.id === state.currentTemplate.id);
    
    // 计算下一个模板的索引
    let nextIndex = currentIndex + 1;
    if (nextIndex >= allTemplates.length) {
      nextIndex = 0; // 循环到第一个
    }
    
    // 切换到下一个模板
    const nextTemplate = allTemplates[nextIndex];
    selectTemplate(nextTemplate);
  }

  // 选择模板 - AJAX方式加载，不刷新页面
  function selectTemplate(template) {
    if (!template) {
      console.error('selectTemplate: 模板参数无效');
      return;
    }
    
    console.log('选择模板:', template.name, template.id);
    
    // 清除自定义背景，使用新模板的背景
    state.customBackground = null;

    // 更新当前模板状态
    state.currentTemplate = template;

    // 清除用户添加的所有装饰元素（贴纸、相框等）
    if (window.stickerManager) {
      window.stickerManager.clearAllStickers();
    }

    // 清除相框（直接清除 DOM 元素）
    const frameElement = document.getElementById('posterFrameCover');
    if (frameElement) {
      frameElement.remove();
    }
    // 清除相框状态
    state.currentFrame = null;
    state.pendingFrame = null;
    state.frameColorAdjust = { hue: 0, saturation: 0, contrast: 0 };
    state.pendingFrameColorAdjust = { hue: 0, saturation: 0, contrast: 0 };

    // 清除用户添加的文字元素
    if (window.textElements) {
      window.textElements = [];
    }
    const posterFrame = document.getElementById('posterFrame');
    if (posterFrame) {
      posterFrame.querySelectorAll('.canvas-text, .text-control').forEach(el => el.remove());
    }

    // 使用 History API 更新URL但不刷新页面
    const newUrl = `editor.html?templateId=${template.id}`;
    window.history.pushState({ templateId: template.id }, '', newUrl);

    // 关闭模板选择弹窗
    closeTemplateModal();

    // 直接更新模板显示（不刷新页面）
    updateTemplateDisplay();
  }

  // 设置弹窗回到顶部按钮功能
  function setupModalBackToTop() {
    const scrollableBody = elements.templateModal?.querySelector('.scrollable-body');
    const backToTopBtn = elements.modalBackToTopBtn;

    if (!scrollableBody || !backToTopBtn) return;

    // 滚动监听：超过2倍可视区域高度时显示按钮
    scrollableBody.addEventListener('scroll', function() {
      const scrollTop = scrollableBody.scrollTop;
      const viewportHeight = scrollableBody.clientHeight;
      const threshold = viewportHeight * 2;

      if (scrollTop > threshold) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    });

    // 点击按钮：平滑滚动到顶部
    backToTopBtn.addEventListener('click', function() {
      scrollableBody.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 关闭模板选择弹窗
  function closeTemplateModal() {
    console.log('尝试关闭模板弹窗');
    
    // 停止自动播放
    stopSlideAutoPlay();
    
    if (elements.templateModal) {
      // 添加关闭动画类
      elements.templateModal.classList.add('closing');
      elements.templateModal.querySelector('.modal').classList.add('closing');
      
      // 延迟隐藏弹窗
      setTimeout(() => {
        // 隐藏弹窗 - 添加hidden类
        elements.templateModal.classList.add('hidden');
        // 同时设置display确保兼容性
        elements.templateModal.style.display = 'none';
        // 移除关闭动画类
        elements.templateModal.classList.remove('closing');
        elements.templateModal.querySelector('.modal').classList.remove('closing');
        console.log('模板弹窗已关闭');
      }, 400);
    } else {
      console.error('模板弹窗元素未找到');
    }
  }
  
  // 修复模板网格元素引用不一致问题
  function getTemplateGrid() {
    return elements.templateGrid || elements.modalTemplatesGrid;
  }
  
  // 按月份筛选模板
  function filterTemplatesByMonth(month) {
    if (!window.templates || !elements.templateGrid || !elements.modalFestivalTags) return;
    
    // 清空现有内容
    elements.templateGrid.innerHTML = '';
    
    // 取消之前的加载任务
    ThumbnailLoader.cancelCurrentLoad();
    const loadId = ThumbnailLoader.generateLoadId();
    
    // 收集需要加载的图片
    const loadQueue = [];
    
    // 更新节日标签，只显示选中月份的节日
    fillFestivalTags(month);
    
    // 遍历所有模板
    for (const monthKey in window.templates) {
      const monthTemplates = window.templates[monthKey];
      
      monthTemplates.forEach(template => {
        // 只显示指定月份的模板
        if (template.months && template.months.includes(month)) {
          // 创建模板项
          const templateItem = document.createElement('div');
          templateItem.className = 'template-item';
          templateItem.dataset.templateId = template.id;
          
          // 检查模板是否可用（当月和下月可用）
          const availability = getTemplateAvailability(template);
          if (!availability.available) {
            templateItem.classList.add('template-locked');
          }
          
          // 是否为当前选中的模板
          const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;
          
          // 创建模板图片容器
          const templateImgContainer = document.createElement('div');
          templateImgContainer.className = 'template-thumbnail-container';
          
          // 创建加载动画
          const spinner = document.createElement('div');
          spinner.className = 'thumbnail-spinner';
          spinner.innerHTML = '<div class="spinner-ring"></div>';
          
          // 创建模板图片
          const templateImg = document.createElement('img');
          templateImg.alt = template.name;
          templateImg.className = 'template-thumbnail loading';
          templateImg.dataset.originalPath = template.image;
          
          // 获取缩略图URL（开放模板用-86thumb，未开放用-20thumb）
          const thumbnailUrl = window.imageConfig ? window.imageConfig.getThumbnailUrl(template.image, availability.available) : template.image;
          const fallbackUrl = window.imageConfig ? window.imageConfig.getThumbnailPath(template.image, availability.available) : template.image;
          
          // 添加到加载队列
          loadQueue.push({
            img: templateImg,
            url: thumbnailUrl,
            fallbackUrl: fallbackUrl
          });
          
          // 创建圆形勾选按钮
          const checkButton = document.createElement('div');
          checkButton.className = 'template-check-button';
          checkButton.innerHTML = window.getSVGIcon ? window.getSVGIcon('check', 'svg-icon') : '<i class="fa fa-check"></i>';
          
          // 设置初始勾选状态
          if (isSelected) {
            checkButton.classList.add('checked');
          }
          
          // 为勾选按钮添加点击事件
          checkButton.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            
            // 锁定的模板不可使用
            if (templateItem.classList.contains('template-locked')) {
              showToast('该模板尚未开放，敬请期待');
              return;
            }
            
            console.log('点击勾选按钮选择模板:', template.name);
            
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            this.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
            
            // 关闭模板选择弹窗
            closeTemplateModal();
          });
          
          // 为模板项添加点击事件
          templateItem.addEventListener('click', function() {
            // 锁定的模板不可使用
            if (templateItem.classList.contains('template-locked')) {
              showToast('该模板尚未开放，敬请期待');
              return;
            }
            
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            checkButton.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
          });
          
          // 添加双击事件 - 双击直接选择模板并关闭弹窗
          templateItem.addEventListener('dblclick', function() {
            // 锁定的模板不可使用
            if (templateItem.classList.contains('template-locked')) {
              showToast('该模板尚未开放，敬请期待');
              return;
            }
            
            console.log('双击选中模板并关闭弹窗:', template.name);
            
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            checkButton.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
            
            // 关闭模板选择弹窗
            closeTemplateModal();
          });
          
          // 创建模板名称
          const templateName = document.createElement('div');
          templateName.className = 'template-name';
          templateName.textContent = template.name;
          
          // 组合模板项
          templateImgContainer.appendChild(spinner);
          templateImgContainer.appendChild(templateImg);
          templateImgContainer.appendChild(checkButton);
          
          // 锁定的模板：添加模糊和遮罩
          if (!availability.available) {
            templateImg.classList.add('blurred');
            const lockOverlay = document.createElement('div');
            lockOverlay.className = 'template-lock-overlay';
            lockOverlay.innerHTML = `
              <span class="lock-big-text">待开放</span>
              <span class="lock-small-text">调整期，将提前2月开放</span>
            `;
            templateImgContainer.appendChild(lockOverlay);
          }
          
          templateItem.appendChild(templateImgContainer);
          templateItem.appendChild(templateName);
          
          // 添加到网格
          elements.templateGrid.appendChild(templateItem);
        }
      });
    }
    
    // 更新幻灯片视图
    updateSlideViewFromFilter(month);
    
    // 在模板列表最后添加自定义背景入口
    addCustomBackgroundEntryToModal();
    
    // 开始批量加载图片
    ThumbnailLoader.loadBatch(loadQueue, loadId, 6);
  }
  
  // 按节日筛选模板
  function filterTemplatesByFestival(festival) {
    if (!window.templates || !elements.templateGrid) return;

    // 清空现有内容
    elements.templateGrid.innerHTML = '';

    // 取消之前的加载任务
    ThumbnailLoader.cancelCurrentLoad();
    const loadId = ThumbnailLoader.generateLoadId();

    // 收集需要加载的图片
    const loadQueue = [];

    // 获取当前选中的月份
    let selectedMonth = null;
    const monthButtons = document.querySelectorAll('#modalMonthButtons .month-btn');
    monthButtons.forEach(btn => {
      if (btn.classList.contains('active')) {
        selectedMonth = parseInt(btn.dataset.month);
      }
    });

    // 先收集所有符合节日条件的模板
    const filteredTemplates = [];

    // 遍历所有模板收集符合条件的
    for (const monthKey in window.templates) {
      const monthTemplates = window.templates[monthKey];

      monthTemplates.forEach(template => {
        // 处理"早安"分类
        let showTemplate = false;
        if (festival === '☀️ 早安') {
          showTemplate = template.festivals.includes('早安');
          // 如果选中了月份，还要检查月份是否匹配
          if (showTemplate && selectedMonth && template.months) {
            showTemplate = template.months.includes(selectedMonth);
          }
        } else if (festival === '🌙 晚安') {
          showTemplate = template.festivals.includes('晚安');
          // 如果选中了月份，还要检查月份是否匹配
          if (showTemplate && selectedMonth && template.months) {
            showTemplate = template.months.includes(selectedMonth);
          }
        } else {
          showTemplate = template.festivals.includes(festival);
        }

        if (showTemplate) {
          filteredTemplates.push(template);
        }
      });
    }

    // 根据排序模式决定模板顺序
    let sortedTemplates = filteredTemplates;
    if (state.templateSortMode === 'random') {
      sortedTemplates = shuffleArray(filteredTemplates);
    }

    // 渲染排序后的模板
    let animationIndex = 0;
    sortedTemplates.forEach(template => {
      // 创建模板项
      const templateItem = document.createElement('div');
      templateItem.className = 'template-item';
      templateItem.dataset.templateId = template.id;

      // 检查模板是否可用（当月和下月可用）
      const availability = getTemplateAvailability(template);
      if (!availability.available) {
        templateItem.classList.add('template-locked');
      }

      // 是否为当前选中的模板
      const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;

      // 创建模板图片容器
      const templateImgContainer = document.createElement('div');
      templateImgContainer.className = 'template-thumbnail-container';

      // 创建加载动画
      const spinner = document.createElement('div');
      spinner.className = 'thumbnail-spinner';
      spinner.innerHTML = '<div class="spinner-ring"></div>';

      // 创建模板图片
      const templateImg = document.createElement('img');
      templateImg.alt = template.name;
      templateImg.className = 'template-thumbnail loading';
      templateImg.dataset.originalPath = template.image;

      // 获取缩略图URL（开放模板用-86thumb，未开放用-20thumb）
      const thumbnailUrl = window.imageConfig ? window.imageConfig.getThumbnailUrl(template.image, availability.available) : template.image;
      const fallbackUrl = window.imageConfig ? window.imageConfig.getThumbnailPath(template.image, availability.available) : template.image;

      // 添加到加载队列
      loadQueue.push({
        img: templateImg,
        url: thumbnailUrl,
        fallbackUrl: fallbackUrl
      });

      // 创建圆形勾选按钮
      const checkButton = document.createElement('div');
      checkButton.className = 'template-check-button';
      checkButton.innerHTML = window.getSVGIcon ? window.getSVGIcon('check', 'svg-icon') : '<i class="fa fa-check"></i>';

      // 设置初始勾选状态
      if (isSelected) {
        checkButton.classList.add('checked');
      }

      // 为勾选按钮添加点击事件
      checkButton.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡

        // 锁定的模板不可使用
        if (templateItem.classList.contains('template-locked')) {
          showToast('该模板尚未开放，敬请期待');
          return;
        }

        console.log('点击勾选按钮选择模板:', template.name);

        // 移除所有勾选按钮的选中状态
        document.querySelectorAll('.template-check-button').forEach(btn => {
          btn.classList.remove('checked');
        });

        // 添加当前按钮的选中状态
        this.classList.add('checked');

        // 更新当前模板
        selectTemplate(template);

        // 关闭模板选择弹窗
        closeTemplateModal();
      });

      // 为模板项添加点击事件
      templateItem.addEventListener('click', function() {
        // 锁定的模板不可使用
        if (templateItem.classList.contains('template-locked')) {
          showToast('该模板尚未开放，敬请期待');
          return;
        }

        // 移除所有勾选按钮的选中状态
        document.querySelectorAll('.template-check-button').forEach(btn => {
          btn.classList.remove('checked');
        });

        // 添加当前按钮的选中状态
        checkButton.classList.add('checked');

        // 更新当前模板
        selectTemplate(template);
      });

      // 添加双击事件 - 双击直接选择模板并关闭弹窗
      templateItem.addEventListener('dblclick', function() {
        // 锁定的模板不可使用
        if (templateItem.classList.contains('template-locked')) {
          showToast('该模板尚未开放，敬请期待');
          return;
        }

        console.log('双击选中模板并关闭弹窗:', template.name);

        // 移除所有勾选按钮的选中状态
        document.querySelectorAll('.template-check-button').forEach(btn => {
          btn.classList.remove('checked');
        });

        // 添加当前按钮的选中状态
        checkButton.classList.add('checked');

        // 更新当前模板
        selectTemplate(template);

        // 关闭模板选择弹窗
        closeTemplateModal();
      });

      // 创建模板名称
      const templateName = document.createElement('div');
      templateName.className = 'template-name';
      templateName.textContent = template.name;

      // 组合模板项
      templateImgContainer.appendChild(spinner);
      templateImgContainer.appendChild(templateImg);
      templateImgContainer.appendChild(checkButton);

      // 锁定的模板：添加模糊和遮罩
      if (!availability.available) {
        templateImg.classList.add('blurred');
        const lockOverlay = document.createElement('div');
        lockOverlay.className = 'template-lock-overlay';
        lockOverlay.innerHTML = `
          <span class="lock-big-text">待开放</span>
          <span class="lock-small-text">调整期，将提前2月开放</span>
        `;
        templateImgContainer.appendChild(lockOverlay);
      }

      templateItem.appendChild(templateImgContainer);
      templateItem.appendChild(templateName);

      // 添加逐个叠加动画
      templateItem.classList.add('template-item-enter');
      templateItem.style.animationDelay = `${animationIndex * 60}ms`;
      animationIndex++;

      // 添加到网格
      elements.templateGrid.appendChild(templateItem);
    });

    // 在模板列表最后添加自定义背景入口
    addCustomBackgroundEntryToModal();

    // 开始批量加载图片
    ThumbnailLoader.loadBatch(loadQueue, loadId, 6);

    // 更新幻灯片视图
    updateSlideViewFromFilter(null, festival);
  }
  
  // 根据筛选更新幻灯片视图
  function updateSlideViewFromFilter(month, festival) {
    if (!elements.templateGalleryContainer) return;

    let filteredTemplates = [];

    if (month) {
      for (const monthKey in window.templates) {
        const monthTemplates = window.templates[monthKey];
        monthTemplates.forEach(template => {
          if (template.months && template.months.includes(month)) {
            filteredTemplates.push(template);
          }
        });
      }
    } else if (festival) {
      // 获取当前选中的月份（仅适用于早安/晚安节日）
      let selectedMonth = null;
      if (festival === '☀️ 早安' || festival === '🌙 晚安') {
        const monthButtons = document.querySelectorAll('#modalMonthButtons .month-btn');
        monthButtons.forEach(btn => {
          if (btn.classList.contains('active')) {
            selectedMonth = parseInt(btn.dataset.month);
          }
        });
      }

      for (const monthKey in window.templates) {
        const monthTemplates = window.templates[monthKey];
        monthTemplates.forEach(template => {
          let showTemplate = false;
          if (festival === '☀️ 早安') {
            showTemplate = template.festivals.includes('早安');
            // 如果选中了月份，还要检查月份是否匹配
            if (showTemplate && selectedMonth && template.months) {
              showTemplate = template.months.includes(selectedMonth);
            }
          } else if (festival === '🌙 晚安') {
            showTemplate = template.festivals.includes('晚安');
            // 如果选中了月份，还要检查月份是否匹配
            if (showTemplate && selectedMonth && template.months) {
              showTemplate = template.months.includes(selectedMonth);
            }
          } else {
            showTemplate = template.festivals.includes(festival);
          }
          if (showTemplate) {
            filteredTemplates.push(template);
          }
        });
      }
    } else {
      filteredTemplates = getAllTemplatesList();
    }

    // 根据排序模式决定模板顺序
    let sortedTemplates = filteredTemplates;
    if (state.templateSortMode === 'random') {
      sortedTemplates = shuffleArray(filteredTemplates);
    }

    state.currentSlideTemplatesList = sortedTemplates;
    state.currentSlideIndex = 0;

    // 用于点击事件中获取模板数据
    const templatesList = sortedTemplates;

    elements.templateGalleryContainer.innerHTML = '';

    sortedTemplates.forEach((template, index) => {
      const slide = document.createElement('div');
      slide.className = 'template-gallery-slide hidden-slide';
      slide.dataset.index = index;
      slide.dataset.loaded = 'false';
      slide.dataset.image = template.image;

      const img = document.createElement('img');
      img.src = 'images/statics/loading88.gif';
      img.alt = template.name;
      img.className = 'slide-img';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'slide-name';
      nameDiv.textContent = template.name;

      slide.appendChild(img);
      slide.appendChild(nameDiv);

      slide.addEventListener('click', function() {
        // 锁定的模板不可使用
        const tmplData = templatesList[parseInt(this.dataset.index)];
        if (tmplData) {
          const avail = getTemplateAvailability(tmplData);
          if (!avail.available) {
            showToast('该模板尚未开放，敬请期待');
            return;
          }
        }
        if (this.classList.contains('current')) {
          selectTemplate(template);
          closeTemplateModal();
        } else {
          const clickedIndex = parseInt(this.dataset.index);
          goToSlide(clickedIndex);
        }
      });

      elements.templateGalleryContainer.appendChild(slide);
    });

    updateSlidePositions();
    loadSlideImages();

    initSlideTouchEvents();
  }
  
  // 为输入框添加清除按钮和改进提示语交互
  function enhanceInputWithClearButton(inputElement, placeholderText) {
    // 如果是VIP用户，不创建清除按钮
    if (window.isVipActive && window.isVipActive()) {
      return;
    }
    
    // 移除之前可能存在的事件监听器，防止重复绑定
    if (inputElement._inputHandler) {
      inputElement.removeEventListener('input', inputElement._inputHandler);
    }
    if (inputElement._focusHandler) {
      inputElement.removeEventListener('focus', inputElement._focusHandler);
    }
    if (inputElement._blurHandler) {
      inputElement.removeEventListener('blur', inputElement._blurHandler);
    }
    
    // 如果清除按钮已存在，则移除它
    let clearButton = inputElement.parentNode.querySelector('.clear-button');
    if (clearButton) {
      // 移除清除按钮的事件监听器
      if (clearButton._clickHandler) {
        clearButton.removeEventListener('click', clearButton._clickHandler);
      }
      inputElement.parentNode.removeChild(clearButton);
    }
    
    // 为输入框容器添加相对定位
    const container = inputElement.parentNode;
    container.style.position = 'relative';
    
    // 创建清除按钮
    clearButton = document.createElement('button');
    clearButton.className = 'clear-button';
    clearButton.textContent = '✕';
    clearButton.style.cursor = 'pointer';
    clearButton.style.display = 'none'; // 默认隐藏
    
    // 添加清除按钮点击事件，并保存引用
    clearButton._clickHandler = function() {
      inputElement.value = '';
      clearButton.style.display = 'none';
    };
    clearButton.addEventListener('click', clearButton._clickHandler);
    
    // 添加输入事件，控制清除按钮显示/隐藏，保存引用
    inputElement._inputHandler = function() {
      clearButton.style.display = this.value ? 'block' : 'none';
    };
    inputElement.addEventListener('input', inputElement._inputHandler);
    
    // 添加焦点事件，保存引用
    inputElement._focusHandler = function() {
      if (this.value === placeholderText) {
        this.value = '';
      }
      // 显示清除按钮
      if (this.value) {
        clearButton.style.display = 'block';
      }
    };
    inputElement.addEventListener('focus', inputElement._focusHandler);
    
    // 添加失去焦点事件，保存引用
    inputElement._blurHandler = function() {
      if (!this.value.trim()) {
        this.value = placeholderText;
        clearButton.style.display = 'none';
      }
    };
    inputElement.addEventListener('blur', inputElement._blurHandler);
    
    // 将清除按钮添加到输入框容器
    container.appendChild(clearButton);
    
    // 初始检查输入框内容，决定是否显示清除按钮
    if (inputElement.value && inputElement.value !== placeholderText) {
      clearButton.style.display = 'block';
    }
  }
  
  // 打开商家信息编辑弹窗
  async function openBusinessInfoModal() {
    if (!elements.businessInfoModal || !elements.businessNameInput || !elements.businessPromoTextInput) return;
    
    // 保存原始数据，用于取消时恢复
    tempBusinessInfo = JSON.parse(JSON.stringify(state.businessInfo));
    pendingUploads = { logo: null, qrcode: null };
    pendingDeletes = { logo: false, qrcode: false };
    
    // 填充表单数据
    elements.businessNameInput.value = state.businessInfo.name || '';
    elements.businessPromoTextInput.value = state.businessInfo.promoText || '';
    
    // 初始化颜色色块选中状态 - 确保与state.textColor同步
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
      if (swatch.dataset.color === state.textColor) {
        swatch.classList.add('selected');
      } else {
        swatch.classList.remove('selected');
      }
    });
    
    // 确保字体颜色选择器与state.textColor同步
    if (elements.fontColorSelector) {
      elements.fontColorSelector.value = state.textColor;
    }
    
    // 绑定颜色色块点击事件
    colorSwatches.forEach(swatch => {
      // 移除可能存在的事件监听器
      const newSwatch = swatch.cloneNode(true);
      swatch.parentNode.replaceChild(newSwatch, swatch);
      
      // 添加新的点击事件
      newSwatch.addEventListener('click', function() {
        // 更新所有色块的选中状态
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
        
        // 更新状态并实时预览
        state.textColor = this.dataset.color;
        
        // 保存到本地存储
        localStorage.setItem('textColor', state.textColor);
        
        updateBusinessInfoDisplay();
        
        // 同步更新字体颜色选择器的值
        if (elements.fontColorSelector) {
          elements.fontColorSelector.value = state.textColor;
        }
      });
    });
    
    // 为输入框添加清除按钮和改进提示语交互
    enhanceInputWithClearButton(elements.businessNameInput, '您的品牌名称');
    
    // 不再需要重新实现颜色选择器，因为我们已经在HTML中静态定义了色块按钮组
    
    // 为textarea添加改进提示语交互，但不添加清除按钮（textarea内容可能有多行）
    if (elements.promoTextInput) {
      if (!elements.promoTextInput.value) {
        elements.promoTextInput.placeholder = '点击编辑促销信息，支持Enter键换行';
      }
      
      // 添加焦点和失焦事件处理
      elements.promoTextInput.addEventListener('focus', function() {
        if (!this.value) {
          this.placeholder = '';
        }
      });
      
      elements.promoTextInput.addEventListener('blur', function() {
        if (!this.value) {
          this.placeholder = '点击编辑促销信息，支持Enter键换行';
        }
      });
    }
    
    // 根据是否有logo来显示或隐藏上传区域
    if (elements.logoUploadArea && elements.logoPreview) {
      if (state.businessInfo.logo) {
        elements.logoUploadArea.style.display = 'none';
        elements.logoPreview.style.display = 'block';
        // 优先使用缓存的base64数据
        const cachedLogo = getFromCache(IMAGE_CACHE_KEYS.logo);
        if (cachedLogo && cachedLogo.startsWith('data:image')) {
          elements.logoPreviewImg.src = cachedLogo;
        } else {
          elements.logoPreviewImg.src = state.businessInfo.logo;
        }
        // 显示透明开关
        if (elements.logoTransparencyToggle) {
          elements.logoTransparencyToggle.classList.remove('hidden');
          if (state.businessInfo.logoTransparent) {
            elements.logoTransparencyToggle.classList.add('active');
            updateLogoTransparencyStyle(true);
          } else {
            elements.logoTransparencyToggle.classList.remove('active');
            updateLogoTransparencyStyle(false);
          }
          // 更新滑块文字
          const thumb = elements.logoTransparencyToggle.querySelector('.toggle-thumb');
          if (thumb) {
            thumb.textContent = state.businessInfo.logoTransparent ? '原图' : '圆角';
          }
          showLogoActionButtons(state.businessInfo.logoTransparent);
        }
      } else {
        elements.logoUploadArea.style.display = 'block';
        elements.logoPreview.style.display = 'none';
        // 隐藏透明开关
        if (elements.logoTransparencyToggle) {
          elements.logoTransparencyToggle.classList.add('hidden');
        }
        showLogoActionButtons(false);
      }
    }
    
    // 根据是否有二维码来显示或隐藏上传区域
    if (elements.qrcodeUploadArea && elements.qrcodePreview) {
      if (state.businessInfo.qrcode) {
        elements.qrcodeUploadArea.style.display = 'none';
        // 移除hidden类
        elements.qrcodePreview.classList.remove('hidden');
        elements.qrcodePreview.style.display = 'block';
        // 优先使用缓存的base64数据
        const cachedQr = getFromCache(IMAGE_CACHE_KEYS.qrcode);
        if (cachedQr && cachedQr.startsWith('data:image')) {
          elements.qrcodePreviewImg.src = cachedQr;
        } else {
          elements.qrcodePreviewImg.src = state.businessInfo.qrcode;
        }
      } else {
        elements.qrcodeUploadArea.style.display = 'block';
        // 添加hidden类
        elements.qrcodePreview.classList.add('hidden');
        elements.qrcodePreview.style.display = 'none';
      }
    }
    
    // 移除关闭动画类
    elements.businessInfoModal.classList.remove('closing');
    elements.businessInfoModal.querySelector('.modal').classList.remove('closing');
    
    // 显示弹窗 - 通过移除hidden类
    elements.businessInfoModal.classList.remove('hidden');
    // 同时设置display确保兼容性
    elements.businessInfoModal.style.display = 'flex';
    
    // 更新保存按钮状态（品牌名称为空时禁用）
    if (elements.businessNameInput && elements.saveBusinessInfoBtn) {
      const hasName = elements.businessNameInput.value.trim() !== '';
      elements.saveBusinessInfoBtn.disabled = !hasName;
      elements.saveBusinessInfoBtn.style.opacity = hasName ? '1' : '0.5';
    }
    
    // 强制重绘以触发动画
    void elements.businessInfoModal.offsetWidth;
    
    // 如果是VIP用户，显示删除按钮（允许用户编辑）
    if (window.isVipActive && window.isVipActive()) {
      setTimeout(showDeleteButtonsForVip, 0);
    }
  }
  
  // 关闭商家信息编辑弹窗（不保存）
  function closeBusinessInfoModal() {
    // 如果有临时数据，说明是从编辑弹窗关闭，需要恢复原数据
    if (tempBusinessInfo) {
      state.businessInfo = JSON.parse(JSON.stringify(tempBusinessInfo));
      tempBusinessInfo = null;
      pendingUploads = { logo: null, qrcode: null };
      pendingDeletes = { logo: false, qrcode: false };
      
      // 恢复显示
      updateBusinessInfoDisplay();
      
      // 恢复预览区域显示状态
      if (elements.logoPreview && elements.logoUploadArea) {
        if (state.businessInfo.logo) {
          elements.logoPreviewImg.src = state.businessInfo.logo;
          elements.logoPreview.style.display = 'block';
          elements.logoUploadArea.style.display = 'none';
        } else {
          elements.logoPreview.style.display = 'none';
          elements.logoUploadArea.style.display = 'block';
        }
      }
      
      if (elements.qrcodePreview && elements.qrcodeUploadArea) {
        if (state.businessInfo.qrcode) {
          elements.qrcodePreviewImg.src = state.businessInfo.qrcode;
          elements.qrcodePreview.classList.remove('hidden');
          elements.qrcodePreview.style.display = 'block';
          elements.qrcodeUploadArea.style.display = 'none';
        } else {
          elements.qrcodePreview.classList.add('hidden');
          elements.qrcodePreview.style.display = 'none';
          elements.qrcodeUploadArea.style.display = 'block';
        }
      }
    }
    
    if (elements.businessInfoModal) {
      elements.businessInfoModal.classList.add('closing');
      elements.businessInfoModal.querySelector('.modal').classList.add('closing');
      
      setTimeout(() => {
        elements.businessInfoModal.classList.add('hidden');
        elements.businessInfoModal.style.display = 'none';
        elements.businessInfoModal.classList.remove('closing');
        elements.businessInfoModal.querySelector('.modal').classList.remove('closing');
      }, 400);
    }
    
    const visibilityModal = document.getElementById('visibilityManagerModal');
    if (visibilityModal) {
      visibilityModal.classList.add('hidden');
    }
  }
  
  // 保存商家信息（同步到云端）
  async function saveBusinessInfo() {
    if (!elements.businessNameInput || !elements.businessPromoTextInput) return;
    
    const saveBtn = elements.saveBusinessInfoBtn;
    const originalBtnText = saveBtn ? saveBtn.textContent : '';
    
    // 更新按钮状态为保存中
    if (saveBtn) {
      saveBtn.textContent = '保存中...';
      saveBtn.disabled = true;
    }
    
    const newName = elements.businessNameInput.value.trim() || '您的品牌名称';
    const newPromoText = elements.businessPromoTextInput.value.trim() || '点击编辑促销信息';
    
    // 检查是否满足完善品牌信息奖励条件：品牌名称非空且未领取过奖励
    const brandNameFilled = elements.businessNameInput.value.trim() !== '';
    const bonusClaimed = localStorage.getItem('brandInfoBonusClaimed') === 'true';
    let shouldClaimBonus = false;
    if (brandNameFilled && !bonusClaimed && typeof VIPSystem !== 'undefined' && !VIPSystem.isVip()) {
      shouldClaimBonus = true;
    }
    
    state.businessInfo.name = newName;
    state.businessInfo.promoText = newPromoText;
    
    // 清除临时数据
    tempBusinessInfo = null;
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    try {
      // 同步到云端
      if (window.CloudSync) {
        // 同步品牌名称和促销文案
        await CloudSync.syncBrandnameToCloud(newName);
        await CloudSync.syncPromoTextToCloud(newPromoText);
        await CloudSync.syncLogoTransparentToCloud(state.businessInfo.logoTransparent);
        
        // 处理待上传的图片
        if (pendingUploads.logo) {
          // 标记正在上传logo
          state.isUploadingLogo = true;
          
          // 先删除旧的logo图片
          const loadingToast = CloudSync.showLoadingToast('正在删除旧Logo...');
          const deleteResult = await CloudSync.deleteImageFromCloud('logo');
          CloudSync.hideLoadingToast(loadingToast);
          
          if (deleteResult.success) {
            console.log('旧Logo删除成功');
          } else {
            console.log('旧Logo删除失败，继续上传新Logo:', deleteResult.message);
          }
          
          // 上传新logo图片
          const uploadToast = CloudSync.showLoadingToast('正在上传Logo到云端...');
          const result = await CloudSync.uploadImageToCloud('logo', pendingUploads.logo);
          CloudSync.hideLoadingToast(uploadToast);
          
          if (result.success) {
            console.log('Logo上传成功，新URL:', result.url);
            console.log('腾讯云URL:', result.tencentUrl);
            console.log('更新state.businessInfo.logo前:', state.businessInfo.logo);
            
            // 先更新state和本地缓存，再同步到云端
            state.businessInfo.logo = result.url;
            console.log('更新state.businessInfo.logo后:', state.businessInfo.logo);
            
            // 立即更新预览图片，不等待缓存
            const posterLogoImg = document.getElementById('posterLogoImg');
            if (posterLogoImg) {
              posterLogoImg.src = result.url;
              console.log('预览图片已更新');
            }
            
            // 异步更新本地缓存
            updateImageCache('posterLogoImg', IMAGE_CACHE_KEYS.logo, result.url).then(() => {
              console.log('本地缓存更新完成');
            });
            
            // 同步到云端（包括腾讯云URL和fileID）
            await CloudSync.syncLogoUrlToCloud(result.url, result.tencentUrl, result.tencentFileID);
            console.log('云端同步完成');
          }
          
          // 上传完成，清除标记
          state.isUploadingLogo = false;
        }
        
        if (pendingUploads.qrcode) {
          // 先删除旧的二维码图片
          const deleteToast = CloudSync.showLoadingToast('正在删除旧二维码...');
          const deleteResult = await CloudSync.deleteImageFromCloud('qrcode');
          CloudSync.hideLoadingToast(deleteToast);
          
          if (deleteResult.success) {
            console.log('旧二维码删除成功');
          } else {
            console.log('旧二维码删除失败，继续上传新二维码:', deleteResult.message);
          }
          
          // 上传新二维码图片
          const uploadToast = CloudSync.showLoadingToast('正在上传二维码到云端...');
          const result = await CloudSync.uploadImageToCloud('qrcode', pendingUploads.qrcode);
          CloudSync.hideLoadingToast(uploadToast);
          
          if (result.success) {
            state.businessInfo.qrcode = result.url;
            await CloudSync.syncQrcodeUrlToCloud(result.url, result.tencentUrl, result.tencentFileID);
            await updateImageCache('posterQrcodeImg', IMAGE_CACHE_KEYS.qrcode, result.url);
          }
        }
        
        // 处理待删除的图片
        if (pendingDeletes.logo) {
          const result = await CloudSync.deleteImageFromCloud('logo');
          if (result.success) {
            await CloudSync.clearUserImageUrl('logo');
          }
        }
        
        if (pendingDeletes.qrcode) {
          const result = await CloudSync.deleteImageFromCloud('qrcode');
          if (result.success) {
            await CloudSync.clearUserImageUrl('qrcode');
          }
        }
      }
      
      // 重置待处理状态
      pendingUploads = { logo: null, qrcode: null };
      pendingDeletes = { logo: false, qrcode: false };
      
      // 云端同步成功后更新本地存储
      saveBusinessInfoToLocalStorage();
      
      // 完善品牌信息奖励：首次填写品牌名称赠送10次下载
      if (shouldClaimBonus) {
        try {
          const bonusResult = await VIPSystem.addDownloadQuota(10, 'brand_info_completed', '完善品牌信息奖励');
          if (bonusResult.success) {
            localStorage.setItem('brandInfoBonusClaimed', 'true');
            showToast('商家信息保存成功');
            // 实时刷新下载次数显示
            loadDownloadQuota();
            showBrandInfoBonusModal();
            return; // 弹窗代替后续关闭逻辑，在弹窗按钮中处理
          } else {
            console.warn('品牌信息奖励领取失败:', bonusResult.message);
          }
        } catch (e) {
          console.warn('品牌信息奖励领取异常:', e);
        }
      }
      
      showToast('商家信息保存成功');
      
      // 云端同步成功后才关闭弹窗
      if (elements.businessInfoModal) {
        elements.businessInfoModal.classList.add('closing');
        elements.businessInfoModal.querySelector('.modal').classList.add('closing');
        
        setTimeout(() => {
          elements.businessInfoModal.classList.add('hidden');
          elements.businessInfoModal.style.display = 'none';
          elements.businessInfoModal.classList.remove('closing');
          elements.businessInfoModal.querySelector('.modal').classList.remove('closing');
        }, 400);
      }
      
      const visibilityModal = document.getElementById('visibilityManagerModal');
      if (visibilityModal) {
        visibilityModal.classList.add('hidden');
      }
    } catch (error) {
      console.error('保存商家信息失败:', error);
      showToast('保存失败，请重试');
    } finally {
      // 恢复按钮状态
      if (saveBtn) {
        saveBtn.textContent = originalBtnText;
        saveBtn.disabled = false;
      }
    }
  }

  // 重置文件输入框的函数 - 返回新创建的文件输入框
  function resetFileInput(fileInput) {
    // 移除旧的事件监听器，避免潜在的重复绑定
    if (fileInput.id === 'backgroundInput') {
      fileInput.removeEventListener('change', handleBackgroundUpload);
    } else if (fileInput.id === 'logoInput') {
      fileInput.removeEventListener('change', handleLogoUpload);
    } else if (fileInput.id === 'qrcodeInput') {
      fileInput.removeEventListener('change', handleQrcodeUpload);
    }
    
    const parent = fileInput.parentNode;
    
    // 创建全新的输入框元素，而不是克隆，避免任何潜在的状态残留
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.accept = fileInput.accept;
    newFileInput.id = fileInput.id;
    newFileInput.style.display = fileInput.style.display;
    
    // 替换原始元素
    parent.replaceChild(newFileInput, fileInput);
    
    // 更新elements对象中的引用
    if (fileInput.id === 'backgroundInput') {
      elements.backgroundInput = newFileInput;
    } else if (fileInput.id === 'logoInput') {
      elements.logoInput = newFileInput;
    } else if (fileInput.id === 'qrcodeInput') {
      elements.qrcodeInput = newFileInput;
    }
    
    // 返回新创建的文件输入框，以便直接使用它
    return newFileInput;
  }

  // 显示提示消息
  function showToast(message) {
    let toast = document.querySelector('.toast-message');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-message';
      toast.style.cssText = 'position: fixed; bottom: 5px; left: 50%; transform: translateX(-50%); background: rgba(0, 0, 0, 0.75); color: white; padding: 6px 12px; border-radius: 4px; z-index: 10000; font-size: 12px; white-space: nowrap;';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
  
  // 检测是否有弹窗打开
  function isModalOpen() {
    if (!elements.templateModal) return false;
    return !elements.templateModal.classList.contains('hidden') && 
           elements.templateModal.style.display !== 'none';
  }
  
  // 清除所有触发区域的焦点状态
  function clearTriggerFocus() {
    const triggerAreas = document.querySelectorAll('.trigger-left, .trigger-top, .trigger-bottom');
    triggerAreas.forEach(area => {
      area.blur(); // 移除焦点
      
      // 同时移除长按提示文字
      const longPressHint = area.querySelector('.long-press-hint');
      if (longPressHint) {
        longPressHint.classList.remove('show');
        longPressHint.classList.add('hiding');
        setTimeout(() => {
          if (longPressHint.parentNode) {
            longPressHint.remove();
          }
        }, 200);
      }
    });
    
    // 移除任何可能的 active 或 focus 相关类
    if (elements.templateTriggerArea) {
      const allTriggers = elements.templateTriggerArea.querySelectorAll('[class*="trigger-"]');
      allTriggers.forEach(trigger => {
        trigger.blur();
      });
    }
    
    // 同时也让 body 获取焦点，确保没有元素保持焦点
    document.body.focus();
  }
  
  // 处理背景图片上传
  function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      showToast('文件大小不能超过10MB');
      return;
    }
    
    event.target.value = '';
    
    if (isModalOpen()) {
      closeTemplateModal();
    }
    
    openCropper(file, 'background', 0.5);
  }
  
  // 移除背景图片
  function removeBackground() {
    state.customBackground = null;

    // 恢复字体颜色为黑色
    state.textColor = '#000000';
    // 更新本地存储中的字体颜色
    localStorage.setItem('textColor', '#000000');

    // 更新背景显示
    updateTemplateDisplay();

    // 更新贴纸按钮显示状态
    updateStickerButtonVisibility();

    // 移除画框
    if (window.FrameManager) {
      state.currentFrame = null;
      state.pendingFrame = null;
      window.FrameManager.removeFrameFromPreview();
    }

    // 显示成功提示
    showToast('背景图片已移除');
  }
  
  // 处理Logo上传（打开裁剪界面）
  function handleLogoUpload(event) {
    console.log('handleLogoUpload 被调用');
    const file = event.target.files[0];
    if (!file) {
      console.log('没有选择文件');
      return;
    }
    
    console.log('选择的文件:', file.name, file.type, file.size);
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    // 检查文件大小
    if (file.size > 10 * 1024 * 1024) {
      showToast('文件大小不能超过10MB');
      return;
    }
    
    // 重置文件输入
    event.target.value = '';
    
    // 打开裁剪界面
    console.log('准备调用 openCropper');
    openCropper(file, 'logo', NaN);
  }
  
  // 移除Logo（只更新预览，不立即删除云端）
  function removeLogo() {
    state.businessInfo.logo = null;
    pendingUploads.logo = null;
    pendingDeletes.logo = true;
    
    // 重置文件对话框标志，确保可以再次点击上传
    window.isFileDialogOpen = false;
    window.activeFileInput = null;
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 隐藏预览，显示上传区域
    if (elements.logoPreview && elements.logoUploadArea) {
      elements.logoPreview.style.display = 'none';
      elements.logoUploadArea.style.display = 'block';
    }
    // 隐藏透明开关
    if (elements.logoTransparencyToggle) {
      elements.logoTransparencyToggle.classList.add('hidden');
    }
    showLogoActionButtons(false);
    
    showToast('Logo已移除，点击保存后同步到云端');
  }
  
  // 切换Logo透明模式
  function toggleLogoTransparency() {
    const toggle = elements.logoTransparencyToggle;
    if (!toggle) return;

    const isTransparent = !state.businessInfo.logoTransparent;
    state.businessInfo.logoTransparent = isTransparent;

    if (isTransparent) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }

    const thumb = toggle.querySelector('.toggle-thumb');
    if (thumb) {
      thumb.textContent = isTransparent ? '原图' : '圆角';
    }

    showLogoActionButtons(isTransparent);

    updateLogoTransparencyStyle(isTransparent);
    showToast(isTransparent ? 'Logo已设为原图模式' : 'Logo已设为圆角模式');
  }

  function showLogoActionButtons(show) {
    const cutoutBtn = document.getElementById('logoCutoutBtn');
    if (cutoutBtn) {
      if (show) {
        cutoutBtn.classList.remove('hidden');
      } else {
        cutoutBtn.classList.add('hidden');
      }
    }
  }

  function applyLogoTransparentMode() {
    const toggle = elements.logoTransparencyToggle;
    if (!toggle) return;

    state.businessInfo.logoTransparent = true;
    toggle.classList.add('active');

    const thumb = toggle.querySelector('.toggle-thumb');
    if (thumb) {
      thumb.textContent = '原图';
    }

    updateLogoTransparencyStyle(true);
    showToast('Logo已设为原图模式');
  }

  const logoCutoutState = {
    originalImageData: null,
    selectedColor: null,
    tolerance: 80,
    imgWidth: 0,
    imgHeight: 0,
    mode: 'auto'
  };

  function openLogoCutoutModal() {
    const logoImg = document.getElementById('posterLogoImg');
    if (!logoImg || !logoImg.src || !logoImg.naturalWidth) {
      showToast('请先上传Logo');
      return;
    }

    const srcCanvas = document.getElementById('logoCutoutSrcCanvas');
    const resultCanvas = document.getElementById('logoCutoutResultCanvas');
    if (!srcCanvas || !resultCanvas) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      const maxDim = 400;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        const scale = maxDim / Math.max(w, h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }

      logoCutoutState.imgWidth = w;
      logoCutoutState.imgHeight = h;

      srcCanvas.width = w;
      srcCanvas.height = h;
      const ctx = srcCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      logoCutoutState.originalImageData = ctx.getImageData(0, 0, w, h);

      resultCanvas.width = w;
      resultCanvas.height = h;
      const rCtx = resultCanvas.getContext('2d');
      rCtx.drawImage(img, 0, 0, w, h);

      logoCutoutState.selectedColor = null;
      logoCutoutState.tolerance = 80;
      logoCutoutState.mode = 'auto';

      const toleranceSlider = document.getElementById('logoCutoutTolerance');
      if (toleranceSlider) toleranceSlider.value = 80;
      const toleranceVal = document.getElementById('logoCutoutToleranceVal');
      if (toleranceVal) toleranceVal.textContent = '80%';

      const swatch = document.getElementById('logoCutoutSwatch');
      if (swatch) swatch.style.background = '#ffffff';
      const colorVal = document.getElementById('logoCutoutColorVal');
      if (colorVal) colorVal.textContent = '#FFFFFF';

      const crosshair = document.getElementById('logoCutoutCrosshair');
      if (crosshair) crosshair.style.display = 'none';

      const colorRow = document.getElementById('logoCutoutColorRow');
      if (colorRow) colorRow.style.display = 'none';

      document.querySelectorAll('.logo-cutout-mode-btn').forEach(b => b.classList.remove('active'));
      const autoBtn = document.querySelector('.logo-cutout-mode-btn[data-mode="auto"]');
      if (autoBtn) autoBtn.classList.add('active');

      srcCanvas.style.cursor = 'default';

      const cutoutModal = document.getElementById('logoCutoutModal');
      if (cutoutModal) cutoutModal.classList.add('active');

      performLogoCutout();
    };
    img.src = logoImg.src;
  }

  function closeLogoCutoutModal() {
    const cutoutModal = document.getElementById('logoCutoutModal');
    if (cutoutModal) cutoutModal.classList.remove('active');
  }

  function handleLogoCutoutPick(e) {
    if (logoCutoutState.mode !== 'custom') return;

    const srcCanvas = document.getElementById('logoCutoutSrcCanvas');
    if (!srcCanvas || !logoCutoutState.originalImageData) return;

    const rect = srcCanvas.getBoundingClientRect();
    const scaleX = srcCanvas.width / rect.width;
    const scaleY = srcCanvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    pickLogoCutoutColor(x, y);

    const crosshair = document.getElementById('logoCutoutCrosshair');
    if (crosshair) {
      crosshair.style.display = 'block';
      crosshair.style.left = e.clientX + 'px';
      crosshair.style.top = e.clientY + 'px';
    }
  }

  function handleLogoCutoutPickMove(e) {
    if (e.buttons !== 1) return;
    handleLogoCutoutPick(e);
  }

  function handleLogoCutoutTouchPick(e) {
    if (logoCutoutState.mode !== 'custom') return;
    e.preventDefault();

    const touch = e.touches[0];
    if (!touch) return;

    const srcCanvas = document.getElementById('logoCutoutSrcCanvas');
    if (!srcCanvas || !logoCutoutState.originalImageData) return;

    const rect = srcCanvas.getBoundingClientRect();
    const scaleX = srcCanvas.width / rect.width;
    const scaleY = srcCanvas.height / rect.height;
    const x = Math.floor((touch.clientX - rect.left) * scaleX);
    const y = Math.floor((touch.clientY - rect.top) * scaleY);

    pickLogoCutoutColor(x, y);

    const crosshair = document.getElementById('logoCutoutCrosshair');
    if (crosshair) {
      crosshair.style.display = 'block';
      crosshair.style.left = touch.clientX + 'px';
      crosshair.style.top = touch.clientY + 'px';
    }
  }

  function pickLogoCutoutColor(x, y) {
    const srcCanvas = document.getElementById('logoCutoutSrcCanvas');
    if (!srcCanvas) return;

    const ctx = srcCanvas.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const hex = '#' + [pixel[0], pixel[1], pixel[2]]
      .map(v => v.toString(16).padStart(2, '0'))
      .join('');

    logoCutoutState.selectedColor = hex;

    const swatch = document.getElementById('logoCutoutSwatch');
    if (swatch) swatch.style.background = hex;
    const colorVal = document.getElementById('logoCutoutColorVal');
    if (colorVal) colorVal.textContent = hex.toUpperCase();

    performLogoCutout();
  }

  function performLogoCutout() {
    if (!logoCutoutState.originalImageData) return;

    const resultCanvas = document.getElementById('logoCutoutResultCanvas');
    if (!resultCanvas) return;

    const toleranceSlider = document.getElementById('logoCutoutTolerance');
    const tolerance = toleranceSlider ? parseInt(toleranceSlider.value) : 50;

    const imageData = new ImageData(
      new Uint8ClampedArray(logoCutoutState.originalImageData.data),
      logoCutoutState.originalImageData.width,
      logoCutoutState.originalImageData.height
    );

    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const mode = logoCutoutState.mode;

    let targetR, targetG, targetB;

    if (mode === 'auto') {
      const corners = [
        { x: 0, y: 0 },
        { x: width - 1, y: 0 },
        { x: 0, y: height - 1 },
        { x: width - 1, y: height - 1 },
      ];
      let r = 0, g = 0, b = 0, count = 0;
      corners.forEach(({ x, y }) => {
        const i = (y * width + x) * 4;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      });
      targetR = Math.round(r / count);
      targetG = Math.round(g / count);
      targetB = Math.round(b / count);
    } else if (mode === 'white') {
      targetR = 255;
      targetG = 255;
      targetB = 255;
    } else if (mode === 'black') {
      targetR = 0;
      targetG = 0;
      targetB = 0;
    } else if (mode === 'custom' && logoCutoutState.selectedColor) {
      const hex = logoCutoutState.selectedColor.replace('#', '');
      targetR = parseInt(hex.substr(0, 2), 16);
      targetG = parseInt(hex.substr(2, 2), 16);
      targetB = parseInt(hex.substr(4, 2), 16);
    } else {
      return;
    }

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const distance = Math.sqrt(
        Math.pow(r - targetR, 2) +
        Math.pow(g - targetG, 2) +
        Math.pow(b - targetB, 2)
      );

      if (distance < tolerance) {
        data[i + 3] = 0;
      }
    }

    const ctx = resultCanvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
  }

  function confirmLogoCutout() {
    const resultCanvas = document.getElementById('logoCutoutResultCanvas');
    if (!resultCanvas || !logoCutoutState.originalImageData) {
      showToast('请先进行抠图操作');
      return;
    }

    const base64 = resultCanvas.toDataURL('image/png');

    state.businessInfo.logo = base64;
    pendingUploads.logo = base64;
    pendingDeletes.logo = false;

    saveToCache(IMAGE_CACHE_KEYS.logo, base64);

    const logoPreviewImg = document.getElementById('logoPreviewImg');
    if (logoPreviewImg) {
      logoPreviewImg.src = base64;
    }

    updateBusinessInfoDisplay();
    applyLogoTransparentMode();

    closeLogoCutoutModal();
    showToast('抠图结果已应用为Logo');
  }
  
  // 更新Logo透明样式
  function updateLogoTransparencyStyle(isTransparent) {
    const posterLogo = document.getElementById('posterLogo');
    const logoInnerWrapper = document.querySelector('.logo-inner-wrapper');
    
    if (posterLogo) {
      if (isTransparent) {
        posterLogo.style.borderRadius = '0';
        posterLogo.style.border = 'none';
        posterLogo.style.background = 'none';
      } else {
        posterLogo.style.borderRadius = '';
        posterLogo.style.border = '';
        posterLogo.style.background = '';
      }
      updateLogoSize();
    }
    
    if (logoInnerWrapper) {
      if (isTransparent) {
        logoInnerWrapper.style.borderRadius = '0';
      } else {
        logoInnerWrapper.style.borderRadius = '';
      }
    }

    const logoPreviewImg = document.getElementById('logoPreviewImg');
    if (logoPreviewImg) {
      if (isTransparent) {
        logoPreviewImg.style.borderRadius = '0';
        logoPreviewImg.style.border = 'none';
        logoPreviewImg.style.background = 'none';
        logoPreviewImg.style.boxShadow = 'none';
      } else {
        const applyRadius = () => {
          const h = logoPreviewImg.offsetHeight;
          if (h > 0) {
            logoPreviewImg.style.borderRadius = h + 'px';
          }
        };
        if (logoPreviewImg.complete && logoPreviewImg.offsetHeight > 0) {
          applyRadius();
        } else {
          logoPreviewImg.onload = applyRadius;
        }
        logoPreviewImg.style.border = '1px solid #ccc';
        logoPreviewImg.style.background = '#fff';
        logoPreviewImg.style.boxShadow = '0 0 10px #cccccc8a';
      }
    }
  }

  function updateLogoSize() {
    const posterLogo = document.getElementById('posterLogo');
    const posterLogoImg = document.getElementById('posterLogoImg');
    const posterBusinessName = document.getElementById('posterBusinessName');
    if (!posterLogo || !posterLogoImg) return;

    const baseHeight = 26;
    const nw = posterLogoImg.naturalWidth;
    const nh = posterLogoImg.naturalHeight;

    if (!nw || !nh) return;

    let ratio = nw / nh;
    if (ratio < 1) ratio = 1;

    const calculatedWidth = Math.round(baseHeight * ratio);

    posterLogo.style.width = calculatedWidth + 'px';
    posterLogo.style.height = baseHeight + 'px';
    posterLogoImg.style.width = calculatedWidth + 'px';
    posterLogoImg.style.height = baseHeight + 'px';

    if (posterBusinessName) {
      posterBusinessName.style.left = (12 + calculatedWidth) + 'px';
    }
  }
  
  // 处理二维码上传（打开裁剪界面）
  function handleQrcodeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    // 重置文件输入
    event.target.value = '';
    
    // 打开裁剪界面
    openCropper(file, 'qrcode');
  }
  
  // 移除二维码（只更新预览，不立即删除云端）
  function removeQrcode() {
    state.businessInfo.qrcode = null;
    pendingUploads.qrcode = null;
    pendingDeletes.qrcode = true;
    
    // 重置文件对话框标志，确保可以再次点击上传
    window.isFileDialogOpen = false;
    window.activeFileInput = null;
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 隐藏预览，显示上传区域
    if (elements.qrcodePreview && elements.qrcodeUploadArea) {
      elements.qrcodePreview.classList.add('hidden');
      elements.qrcodePreview.style.display = 'none';
      elements.qrcodeUploadArea.style.display = 'block';
    }
    
    showToast('二维码已移除，点击保存后同步到云端');
  }
  
  // 更新文字颜色
  function updateTextColor(e) {
    state.textColor = e.target.value;
    
    // 更新文字颜色显示
    if (elements.posterBusinessName) {
      elements.posterBusinessName.style.color = state.textColor;
    }
    if (elements.posterPromoText) {
      elements.posterPromoText.style.color = state.textColor;
    }
  }
  
  // 更新背景透明度
  function updateBackgroundOpacity(e) {
    state.backgroundOpacity = parseFloat(e.target.value);
    
    // 更新背景透明度
    if (elements.posterBackground) {
      elements.posterBackground.style.opacity = state.backgroundOpacity;
    }
    
    // 更新透明度显示
    if (elements.bgOpacityValue) {
      elements.bgOpacityValue.textContent = `${Math.round(state.backgroundOpacity * 100)}%`;
    }
  }
  
  // 重置编辑器
  function resetEditor() {
    // 确认重置
    if (!confirm('确定要重置编辑器吗？所有自定义内容将会丢失。')) {
      return;
    }
    
    // 重置状态
    state.customBackground = null;
    state.backgroundOpacity = 1;
    state.textColor = '#000000';
    
    // 重置选择器
    if (elements.textColor) {
      elements.textColor.value = state.textColor;
    }
    if (elements.bgOpacity) {
      elements.bgOpacity.value = state.backgroundOpacity;
    }
    if (elements.bgOpacityValue) {
      elements.bgOpacityValue.textContent = '100%';
    }
    
    // 隐藏预览
    if (elements.logoPreview) {
      elements.logoPreview.style.display = 'none';
    }
    if (elements.qrcodePreview) {
      elements.qrcodePreview.style.display = 'none';
    }
    
    // 重新加载默认模板
    loadDefaultTemplate();
    
    // 更新商家信息显示
    updateBusinessInfoDisplay();
    
    // 显示成功提示
    showToast('编辑器已重置');
  }
  
  // 券码验证弹窗
  function showCouponModal() {
    // 创建弹窗HTML
    const modalHTML = `
      <div id="couponModal" class="modal-overlay" style="display: flex;">
        <div class="modal coupon-modal" style="max-width: 400px; transform-origin: center center;">
          <div class="modal-header fixed-header">
            <h2 class="modal-title">券码验证</h2>
            <button id="closeCouponModalBtn" class="modal-close">&times;</button>
          </div>
          <div class="modal-body scrollable-body">
            <div class="coupon-input-group">
              <label class="coupon-label">请输入4位券码</label>
              <div class="coupon-input-container">
                <input type="text" class="coupon-digit" maxlength="1" data-index="0" placeholder="•">
                <input type="text" class="coupon-digit" maxlength="1" data-index="1" placeholder="•">
                <input type="text" class="coupon-digit" maxlength="1" data-index="2" placeholder="•">
                <input type="text" class="coupon-digit" maxlength="1" data-index="3" placeholder="•">
              </div>
              <input type="text" id="couponCodeInput" class="coupon-input" maxlength="4" style="display: none;">
              <div id="couponMessage" class="coupon-message"></div>
            </div>
            <div class="coupon-actions">
              <button id="verifyCouponBtn" class="action-btn primary">验证券码</button>
              <button id="cancelCouponBtn" class="action-btn secondary">取消</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('couponModal');
    const closeBtn = document.getElementById('closeCouponModalBtn');
    const cancelBtn = document.getElementById('cancelCouponBtn');
    const verifyBtn = document.getElementById('verifyCouponBtn');
    const couponInput = document.getElementById('couponCodeInput');
    const couponMessage = document.getElementById('couponMessage');
    const digitInputs = document.querySelectorAll('.coupon-digit');
    const couponLabel = document.querySelector('.coupon-label');
    
    // 自动填充上次成功的券码
    const lastValidCoupon = window.getLastValidCoupon ? window.getLastValidCoupon() : null;
    if (lastValidCoupon && lastValidCoupon.length === 4) {
      for (let i = 0; i < 4; i++) {
        digitInputs[i].value = lastValidCoupon[i];
      }
      couponInput.value = lastValidCoupon;
      // 如果是上次成功的券码，更新标签和按钮文字
      updateLabelAndButtonText(lastValidCoupon);
    }
    
    // 处理数字输入框的输入逻辑
    function handleDigitInput(event, index) {
      const input = event.target;
      const value = input.value;
      
      // 只允许数字输入
      if (value && !/^\d$/.test(value)) {
        input.value = '';
        return;
      }
      
      // 自动跳转到下一个输入框
      if (value && index < 3) {
        digitInputs[index + 1].focus();
      }
      
      // 更新隐藏的输入框
      updateHiddenInput();
    }
    
    // 处理退格键
    function handleBackspace(event, index) {
      if (event.key === 'Backspace' && !event.target.value && index > 0) {
        digitInputs[index - 1].focus();
      }
    }
    
    // 更新隐藏的输入框值
    function updateHiddenInput() {
      const code = Array.from(digitInputs).map(input => input.value || '').join('');
      couponInput.value = code;
    }
    
    // 更新标签和按钮文字的函数
    function updateLabelAndButtonText(currentCode) {
      const lastValidCoupon = window.getLastValidCoupon ? window.getLastValidCoupon() : null;
      
      if (currentCode === lastValidCoupon && currentCode.length === 4) {
        // 如果是上次成功的券码
        couponLabel.textContent = '您上次验证通过的券码';
        verifyBtn.innerHTML = ' 生成海报';
      } else {
        // 恢复默认文字
        couponLabel.textContent = '请输入4位券码';
        verifyBtn.innerHTML = '验证券码';
      }
    }
    
    // 监听输入框变化
    function handleInputChange() {
      const currentCode = Array.from(digitInputs).map(input => input.value || '').join('');
      updateLabelAndButtonText(currentCode);
    }
    
    // 为每个数字输入框添加事件监听
    digitInputs.forEach((input, index) => {
      input.addEventListener('input', (event) => {
        handleDigitInput(event, index);
        handleInputChange();
      });
      input.addEventListener('keydown', (event) => handleBackspace(event, index));
      
      // 监听退格键和删除键
      input.addEventListener('keyup', (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          handleInputChange();
        }
      });
    });
    
    // 关闭弹窗函数
    function closeModal() {
      // 添加关闭动画类
      modal.classList.add('closing');
      modal.querySelector('.modal').classList.add('closing');
      
      // 延迟移除弹窗
      setTimeout(() => {
        modal.remove();
      }, 400); // 匹配动画时长
    }
    
    // 验证券码函数
    function verifyCoupon() {
      const code = couponInput.value.trim();
      
      if (!code) {
        couponMessage.textContent = '请输入券码';
        couponMessage.className = 'coupon-message error';
        return;
      }
      
      if (code.length !== 4 || !/^\d{4}$/.test(code)) {
        couponMessage.textContent = '券码必须是4位数字';
        couponMessage.className = 'coupon-message error';
        return;
      }
      
      // 调用券码验证函数
      if (window.validateCoupon) {
        const result = window.validateCoupon(code);
        
        if (result.valid) {
          couponMessage.textContent = result.message;
          couponMessage.className = 'coupon-message success';
          
          // 保存成功的券码
          if (window.saveLastValidCoupon) {
            window.saveLastValidCoupon(code);
          }
          
          // 延迟关闭弹窗并开始下载
          setTimeout(() => {
            closeModal();
            downloadPosterAfterVerification();
          }, 1500);
        } else {
          couponMessage.textContent = result.message;
          couponMessage.className = 'coupon-message error';
        }
      } else {
        couponMessage.textContent = '券码验证功能未加载，请刷新页面重试';
        couponMessage.className = 'coupon-message error';
      }
    }
    
    // 事件监听
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    verifyBtn.addEventListener('click', verifyCoupon);
    
    // 按回车键验证
    couponInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        verifyCoupon();
      }
    });
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // 自动聚焦输入框
    couponInput.focus();
  }
  
  window.showVipUpgradeModal = function() {
    let existingModal = document.getElementById('vipUpgradeModal');
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'vipUpgradeModal';
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; display: flex; align-items: center; justify-content: center;';

    modal.innerHTML = `
      <div class="vip-upgrade-modal">
        <button id="closeVipUpgradeBtn" class="close-modal-btn">&times;</button>
        
        <h3 class="vip-upgrade-header">
          解锁VIP特权 -不错过每一天的宣传
        </h3>
        
        <div class="voucher-input-container">
          <span class="upgrade-channel-label">升级通道一：</span>
          <div class="input-button-group">
            <div class="input-wrapper">
              <input type="text" id="voucherCodeInput" class="voucher-input" placeholder="请输入升级码">
              <button id="clearInputBtn" class="clear-input-btn" style="display: none;">X</button>
              <button id="pasteInputBtn" class="paste-input-btn">粘贴</button>
            </div>
            <button id="verifyVoucherBtn" class="verify-btn">验证</button>
          </div>
        </div>
        
        <div id="voucherResult" class="voucher-result">
          <div id="voucherErrorMessage" class="voucher-error-message"></div>
          <div id="voucherErrorLog" class="voucher-error-log"></div>
          <button id="copyErrorLogBtn" class="copy-error-log-btn">复制错误日志</button>
        </div>
        
        <div class="vip-packages-section">
          <div class="vip-packages-title">升级通道二：(周年感恩大送)</div>
          <div class="vip-packages-wrapper">
            <div class="vip-packages-container" id="vipUpgradePackageGrid">
              <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #999; font-size: 13px;">套餐加载中...</div>
            </div>
          </div>
        </div>

        <div class="vip-upgrade-actions">
          <button id="closeVipUpgradeBtn2" class="close-upgrade-btn">关闭</button>
          <div class="payment-btn-wrapper">
            <button id="proceedToPaymentBtn" class="proceed-to-payment-btn">立即支付</button>
            <div class="discount-badge payment-discount-badge" style="display: none;">1折</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const voucherInput = document.getElementById('voucherCodeInput');
    const verifyBtn = document.getElementById('verifyVoucherBtn');
    const resultDiv = document.getElementById('voucherResult');
    const closeBtn = document.getElementById('closeVipUpgradeBtn');
    const closeBtn2 = document.getElementById('closeVipUpgradeBtn2');
    const proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');
    const pasteInputBtn = document.getElementById('pasteInputBtn');

    function updateInputButtons() {
      if (voucherInput.value.length > 0) {
        clearInputBtn.style.display = 'flex';
        pasteInputBtn.style.display = 'none';
      } else {
        clearInputBtn.style.display = 'none';
        pasteInputBtn.style.display = 'flex';
      }
    }

    updateInputButtons();
    voucherInput.addEventListener('input', updateInputButtons);

    clearInputBtn.addEventListener('click', () => {
      voucherInput.value = '';
      updateInputButtons();
      voucherInput.focus();
    });

    pasteInputBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        voucherInput.value = text;
        updateInputButtons();
        voucherInput.focus();
      } catch (err) {
        console.error('粘贴失败:', err);
        alert('无法读取剪贴板内容，请手动输入');
      }
    });

    const closeModal = () => modal.remove();
    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    verifyBtn.addEventListener('click', async () => {
      const code = voucherInput.value.trim();
      if (!code) {
        showVoucherResult(resultDiv, 'error', '请输入升级码');
        return;
      }

      verifyBtn.classList.add('pulse-animation');
      verifyBtn.disabled = true;
      verifyBtn.textContent = '验证中...';

      try {
        let userId = typeof VIPSystem !== 'undefined' ? VIPSystem.getUserId() : null;
        
        if (!userId || typeof userId !== 'string' || userId.trim() === '' || userId.trim() === 'undefined') {
          showVoucherResult(resultDiv, 'error', '请先登录后再验证升级码');
          verifyBtn.disabled = false;
          verifyBtn.textContent = '验证';
          return;
        }
        
        const result = await VIPSystem.verifyVoucher(code, userId);

        if (result.success) {
          if (result.used) {
            const usedAt = new Date(result.usedAt);
            const phone = result.usedByPhone || '';
            const maskedPhone = phone ? phone.substring(0, 4) + '...' + phone.substring(phone.length - 4) : '';
            const dateStr = `${usedAt.getFullYear()}年${String(usedAt.getMonth() + 1).padStart(2, '0')}月${String(usedAt.getDate()).padStart(2, '0')}日`;
            
            showVoucherResult(resultDiv, 'info', `验证码：${code}已于${dateStr}，账号(${maskedPhone})激活使用，增加时长${result.duration}个月`);
          } else {
            const validUntil = new Date(result.validUntil);
            const dateStr = `${validUntil.getFullYear()}年${String(validUntil.getMonth() + 1).padStart(2, '0')}月${String(validUntil.getDate()).padStart(2, '0')}日`;
            
            // 关闭升级弹窗，然后弹出统一的成功弹窗（已内置彩纸喷射特效）
            modal.remove();
            if (typeof window.showPaymentResultModal === 'function') {
              window.showPaymentResultModal({ success: true, outTradeNo: '' });
            } else {
              // 兜底：若新弹窗函数未加载，回退到旧版提示
              showVoucherResult(resultDiv, 'success', `恭喜，升级成功，您的账号已经成功升级VIP账号，增时${result.duration}个月，有效时间至 ${dateStr} 24时0分0秒`);
              setTimeout(() => {
                const m = document.querySelector('.voucher-result-modal');
                if (m) m.remove();
              }, 3000);
            }
          }
        } else {
          showVoucherResult(resultDiv, 'error', '验证失败 请准确复制升级码，或联系客服解决', result);
        }
      } catch (error) {
        console.error('验证升级码失败:', error);
        showVoucherResult(resultDiv, 'error', '验证失败，请稍后重试', error);
      } finally {
        verifyBtn.disabled = false;
        verifyBtn.textContent = '验证';
        verifyBtn.classList.remove('pulse-animation');
      }
    });

    voucherInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') verifyBtn.click();
    });

    voucherInput.focus();
    
    function updatePaymentDiscountBadge(selectedPackage) {
      if (!selectedPackage) return;

      const price = parseFloat(selectedPackage.dataset.price);
      const originalPrice = parseFloat(selectedPackage.dataset.originalPrice);

      if (price && originalPrice) {
        const discount = (price / originalPrice * 10).toFixed(1);

        let badge = document.querySelector('.payment-discount-badge');

        if (badge) {
          badge.textContent = `${discount}折`;
          badge.style.display = '';
          badge.classList.remove('pulse-animation');
          setTimeout(() => badge.classList.add('pulse-animation'), 10);
        }
      }
    }
    
    // 异步加载云端套餐并渲染（class 风格，对接 styles.css）
    const upgradeGrid = document.getElementById('vipUpgradePackageGrid')
    if (upgradeGrid) {
      // 套餐点击事件（事件委托）
      upgradeGrid.addEventListener('click', function(e) {
        const pkg = e.target.closest('.vip-package')
        if (!pkg) return
        const allPackages = upgradeGrid.querySelectorAll('.vip-package')
        allPackages.forEach(p => {
          p.classList.remove('selected')
          const selectBtn = p.querySelector('.select-package-btn')
          if (selectBtn) selectBtn.textContent = '选择'
        })
        pkg.classList.add('selected')
        pkg.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        const selectBtn = pkg.querySelector('.select-package-btn')
        if (selectBtn) selectBtn.textContent = '✔ 已选择'

        if (typeof updatePaymentDiscountBadge === 'function') updatePaymentDiscountBadge(pkg)

        const price = pkg.dataset.price
        if (proceedToPaymentBtn) {
          proceedToPaymentBtn.textContent = `立即支付${price}元`
          proceedToPaymentBtn.style.display = 'block'
          // 触发放大果冻入场动画
          proceedToPaymentBtn.classList.remove('proceed-btn-enter')
          void proceedToPaymentBtn.offsetWidth
          proceedToPaymentBtn.classList.add('proceed-btn-enter')
        }
      })

      // 调用 vip-login-ui.js 的统一渲染函数（如果可用）；否则尝试本地兜底
      if (typeof window.renderVipPackagesToGrid === 'function') {
        window.renderVipPackagesToGrid(upgradeGrid, { style: 'class' }).then(() => {
          const featured = upgradeGrid.querySelector('.vip-package.vip-package-featured') || upgradeGrid.querySelector('.vip-package.selected')
          if (featured) {
            setTimeout(() => featured.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 100)
            // 折扣徽章延迟到"立即支付"按钮显示后 1.2s 再弹出，避免与按钮动画重叠
            // 时序：套餐入场（(N-1)*110+550ms）→ 选中放大（+300ms）→ 缓冲（+200ms）→ 按钮果冻（+350ms）→ 徽章弹出（+1200ms）
            const pkgCount = upgradeGrid.querySelectorAll('.vip-package').length
            const badgeDelay = (pkgCount - 1) * 110 + 550 + 300 + 200 + 350 + 1200
            setTimeout(() => {
              if (typeof updatePaymentDiscountBadge === 'function') updatePaymentDiscountBadge(featured)
            }, badgeDelay)
          }
        })
      } else {
        // 兜底：渲染失败时显示提示
        upgradeGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #999; font-size: 13px;">套餐加载失败，请刷新页面重试</div>`
      }
    }

    if (proceedToPaymentBtn) {
      proceedToPaymentBtn.addEventListener('click', async function() {
        // 按钮 disabled 防抖：双击/连点直接拒绝
        if (this.dataset.busy === '1') {
          console.warn('[payment-flow] editor proceedToPaymentBtn busy, ignore click')
          return
        }
        this.dataset.busy = '1'
        this.disabled = true
        const restoreBtn = () => {
          this.dataset.busy = '0'
          this.disabled = false
        }

        const selectedPackage = upgradeGrid ? upgradeGrid.querySelector('.vip-package.selected') : document.querySelector('.vip-package.selected')
        if (!selectedPackage) {
          alert('请先选择一个套餐')
          restoreBtn()
          return
        }

        if (!VIPSystem.isLoggedIn()) {
          alert('请先登录')
          restoreBtn()
          return
        }

        const duration = parseInt(selectedPackage.dataset.duration)
        const price = selectedPackage.dataset.price
        const packageId = selectedPackage.dataset.packageId || ''
        const type = 'wxpay'

        // 全局下单锁：跨入口/网络重试兜底（锁函数由 vip-login-ui.js 暴露在 window 上）
        const lockKey = `${VIPSystem.getUserId() || 'anon'}_${packageId || duration}_${type}`
        if (typeof window.acquireCreateOrderLock === 'function' && !window.acquireCreateOrderLock(lockKey)) {
          console.warn('[payment-flow] editor proceedToPaymentBtn 拒绝重复下单')
          restoreBtn()
          return
        }

        console.log('支付参数:', { duration, price, type, packageId, isLoggedIn: VIPSystem.isLoggedIn() })
        console.log('userId:', VIPSystem.getUserId())

        const loadingModal = document.createElement('div')
        loadingModal.id = 'paymentLoadingModal'
        loadingModal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 10001; display: flex; align-items: center; justify-content: center;'
        loadingModal.innerHTML = `
          <div style="background: #fff; border-radius: 12px; padding: 24px; text-align: center;">
            <div style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #d32f2f; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
            <p style="margin: 0; color: #333;">正在创建订单...</p>
          </div>
        `
        document.body.appendChild(loadingModal)

        try {
          const returnUrl = window.location.href.split('?')[0]
          const result = await VIPSystem.createPaymentOrder(price, duration, type, returnUrl, packageId)

          loadingModal.remove()

          if (result.success && result.data && result.data.payUrl) {
            // 下单成功后保留锁，由支付会话接管；延迟释放避免再次点出第二笔订单
            if (typeof window.releaseCreateOrderLock === 'function') {
              setTimeout(() => window.releaseCreateOrderLock(), 8000)
            }
            if (typeof initiatePayment === 'function') {
              initiatePayment(result.data.payUrl, result.data.out_trade_no)
            } else {
              window.location.href = result.data.payUrl
            }
          } else {
            if (typeof window.releaseCreateOrderLock === 'function') window.releaseCreateOrderLock()
            alert(result.message || '创建订单失败，请稍后重试')
          }
        } catch (error) {
          loadingModal.remove()
          if (typeof window.releaseCreateOrderLock === 'function') window.releaseCreateOrderLock()
          console.error('支付失败:', error)
          alert('支付失败，请稍后重试')
        } finally {
          restoreBtn()
        }
      })
    }
  };

  function showVoucherResult(element, type, message, errorDetails = null) {
    // 创建弹窗容器
    const modal = document.createElement('div');
    modal.className = 'voucher-result-modal';
    
    // 创建弹窗内容
    const modalContent = document.createElement('div');
    modalContent.className = 'voucher-result-modal-content';
    
    // 根据类型添加样式类
    if (type === 'success') {
      modalContent.classList.add('success');
    } else if (type === 'error') {
      modalContent.classList.add('error');
    } else if (type === 'info') {
      modalContent.classList.add('info');
    }
    
    // 添加右上角关闭打叉按钮
    const closeXBtn = document.createElement('button');
    closeXBtn.className = 'voucher-result-close-btn x-btn';
    closeXBtn.textContent = '×';
    closeXBtn.onclick = function() {
      document.body.removeChild(modal);
    };
    modalContent.appendChild(closeXBtn);
    
    // 设置弹窗标题
    const modalTitle = document.createElement('h3');
    modalTitle.className = 'voucher-result-modal-title';
    modalTitle.textContent = type === 'success' ? '验证成功' : type === 'info' ? '提示信息' : '验证失败';
    modalContent.appendChild(modalTitle);
    
    // 设置消息内容
    const messageDiv = document.createElement('div');
    messageDiv.className = 'voucher-result-message';
    messageDiv.textContent = message;
    modalContent.appendChild(messageDiv);
    
    // 设置错误日志（默认隐藏）
    if (type === 'error' && errorDetails) {
      const errorLogDiv = document.createElement('div');
      errorLogDiv.id = 'voucherErrorLog';
      errorLogDiv.className = 'voucher-error-log';
      const timestamp = new Date().toLocaleString('zh-CN');
      const logContent = `[${timestamp}] 错误信息：${JSON.stringify(errorDetails)}
[${timestamp}] 验证失败：${message}`;
      errorLogDiv.textContent = logContent;
      modalContent.appendChild(errorLogDiv);
      
      // 添加复制日志按钮
      const copyLogBtn = document.createElement('button');
      copyLogBtn.id = 'copyErrorLogBtn';
      copyLogBtn.className = 'copy-log-btn';
      copyLogBtn.textContent = '复制错误日志';
      copyLogBtn.onclick = function() {
        const logContent = errorLogDiv.textContent;
        if (logContent) {
          navigator.clipboard.writeText(logContent).then(() => {
            alert('错误日志已复制到剪贴板');
          }).catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
          });
        }
      };
      modalContent.appendChild(copyLogBtn);
    }
    
    // 添加底部关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'voucher-result-close';
    closeBtn.textContent = '关闭';
    closeBtn.onclick = function() {
      document.body.removeChild(modal);
    };
    modalContent.appendChild(closeBtn);
    
    // 组装弹窗
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }
  
  // 券码验证通过后的下载
  async function downloadPosterAfterVerification() {
    // 检查是否有背景图片或模板，允许自定义背景的情况
    const hasBackground = elements.posterBackground && elements.posterBackground.src && 
                         elements.posterBackground.src !== '' && 
                         elements.posterBackground.src !== 'undefined';
    
    if (!state.currentTemplate && !hasBackground) {
      showToast('请先选择一个模板或上传背景图片');
      return;
    }
    
    // 检查商家信息完整性
    const incompleteItems = checkBusinessInfoIncomplete();
    if (incompleteItems.length > 0) {
      showIncompleteInfoModal(incompleteItems);
      return;
    }
    
    // VIP用户不扣减次数，非VIP用户需要扣减
    let needDeductQuota = true;
    if (typeof VIPSystem !== 'undefined' && VIPSystem.isVip()) {
      needDeductQuota = false;
    }
    
    // 非VIP用户：扣减下载次数
    if (needDeductQuota && typeof VIPSystem !== 'undefined') {
      const templateId = state.currentTemplate ? (state.currentTemplate.id || '') : '';
      const templateName = state.currentTemplate ? (state.currentTemplate.name || '') : '';
      
      try {
        const deductResult = await VIPSystem.deductDownloadQuota(templateId, templateName);
        if (!deductResult.success) {
          // 如果明确是次数不足，弹窗提示
          if (deductResult.message && deductResult.message.includes('次数不足')) {
            showToast(deductResult.message || '下载次数不足');
            showQuotaExhaustedModal();
            return;
          }
          // 其他错误（网络、服务异常等），允许兜底下载
          console.warn('扣减下载次数失败（非次数不足），允许兜底下载:', deductResult.message);
        } else {
          console.log('下载次数扣减成功，剩余:', deductResult.data.downloadQuota);
          updateQuotaDisplay(deductResult.data.downloadQuota);
        }
      } catch (e) {
        // 扣减异常时允许兜底下载
        console.warn('扣减下载次数异常，允许兜底下载:', e);
      }
    }
    
    // 记录开始时间
    const startTime = Date.now();
    
    // 显示加载动画
    showLoadingAnimation();
    
    // 显示加载状态
    if (elements.downloadBtn) {
      elements.downloadBtn.disabled = true;
      elements.downloadBtn.innerHTML = `${window.getSVGIcon ? window.getSVGIcon('spinner', 'svg-icon svg-icon-spin') : '<i class="fa fa-spinner fa-spin"></i>'} 正在生成...`;
    }
    
    try {
      // 转换为图片并下载，等待操作完成
      await convertToImageAndDownload();
    } catch (error) {
      console.error('下载海报过程中出错:', error);
      showToast('下载海报失败，请重试');
    } finally {
      // 计算已用时间
      const elapsedTime = Date.now() - startTime;
      const minDisplayTime = 3500; // 最少显示5秒
      
      // 如果生成时间少于3.5秒，等待剩余时间
      if (elapsedTime < minDisplayTime) {
        const remainingTime = minDisplayTime - elapsedTime;
        console.log(`海报生成完成，但需要继续显示加载动画 ${remainingTime}ms`);
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      // 隐藏加载动画
      hideLoadingAnimation();
      
      // 重置下载按钮状态
      if (elements.downloadBtn) {
        elements.downloadBtn.disabled = false;
        elements.downloadBtn.innerHTML = `${window.getSVGIcon ? window.getSVGIcon('download', 'svg-icon') : '<i class="fa fa-download"></i>'} 下载海报`;
        
        // 重启按钮动画
        if (window.downloadButtonAnimation) {
          setTimeout(() => {
            window.downloadButtonAnimation.start();
          }, 3000);
        }
      }
    }
  }
  
  // 下载海报
  async function downloadPoster() {
    try {
      let isVip = false;
      if (typeof VIPSystem !== 'undefined') {
        // 直接从服务器获取最新的VIP状态
        const userId = VIPSystem.getUserId();
        const userInfo = VIPSystem.getUserInfo();
        const phone = userInfo ? userInfo.phone : null;
        
        console.log('从服务器获取最新VIP状态...');
        console.log('用户ID:', userId);
        console.log('用户手机号:', phone);
        
        if (userId || phone) {
          const result = await VIPSystem.checkVipStatus(userId, phone);
          console.log('服务器返回结果:', result);
          
          if (result.success && result.data) {
            // 直接使用服务器返回的状态
            isVip = result.data.isVip || false;
            console.log('服务器返回的VIP状态:', isVip);
          }
        }
      }
      
      if (isVip) {
        // VIP用户直接下载，无需扣减次数
        console.log('VIP用户，直接下载');
        await downloadPosterAfterVerification();
      } else {
        // 非VIP用户：检查下载次数
        if (typeof VIPSystem !== 'undefined') {
          const quotaResult = await VIPSystem.getDownloadQuota();
          if (quotaResult.success && quotaResult.data) {
            const quota = quotaResult.data.downloadQuota;
            console.log('剩余下载次数:', quota);
            updateQuotaDisplay(quota);
            
            if (quota <= 0) {
              // 次数用完，显示提示
              showQuotaExhaustedModal();
              return;
            }
            // 有剩余次数，直接下载
            await downloadPosterAfterVerification();
          } else {
            // 获取次数失败，仍然允许下载（兜底）
            console.warn('获取下载次数失败，允许下载');
            await downloadPosterAfterVerification();
          }
        } else {
          // VIPSystem 不可用，显示广告弹窗
          showAdModal();
        }
      }
    } catch (error) {
      console.error('检查VIP状态时出错:', error);
      // 出错时默认显示广告弹窗
      showAdModal();
    }
  }

  // 检查商家信息是否完整
  function checkBusinessInfoIncomplete() {
    const incomplete = []
    const info = state.businessInfo
    
    if (!info.name || info.name === '您的品牌名称') {
      incomplete.push('商家名称')
    }
    if (!info.logo) {
      incomplete.push('商家Logo')
    }
    if (!info.qrcode) {
      incomplete.push('商家二维码')
    }
    if (!info.promoText || info.promoText === '👇长按加好友/进粉丝福利群！\n🎁这里可以写引流文促销文案或地址/联系方式 📝（点击更改）') {
      incomplete.push('促销文案')
    }
    
    return incomplete
  }

  // 彩纸迸发特效
  function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6eb4', '#a66cff', '#ff9f43'];
    const shapes = ['square', 'circle', 'rectangle'];

    for (let i = 0; i < 80; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const duration = 2 + Math.random() * 2;
      const size = 6 + Math.random() * 8;

      piece.style.left = left + '%';
      piece.style.animationDelay = delay + 's';
      piece.style.animationDuration = duration + 's';
      piece.style.backgroundColor = color;

      if (shape === 'circle') {
        piece.style.borderRadius = '50%';
        piece.style.width = size + 'px';
        piece.style.height = size + 'px';
      } else if (shape === 'rectangle') {
        piece.style.width = size * 0.4 + 'px';
        piece.style.height = size + 'px';
      } else {
        piece.style.width = size + 'px';
        piece.style.height = size + 'px';
      }

      container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 5000);
  }

  // 完善品牌信息奖励弹窗
  function showBrandInfoBonusModal() {
    // 关闭品牌信息弹窗
    if (elements.businessInfoModal) {
      elements.businessInfoModal.classList.add('hidden');
      elements.businessInfoModal.style.display = 'none';
    }

    // 发射彩纸
    launchConfetti();

    let modal = document.getElementById('brandInfoBonusModal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'brandInfoBonusModal';
    modal.className = 'global-modal-overlay';
    modal.style.zIndex = '10001';

    modal.innerHTML = `
      <div class="global-modal-card">
        <h3 class="modal-title">品牌信息已完善</h3>
        <p class="modal-desc">🎊恭喜您获得 <span class="modal-highlight">10</span> 次免费下载海报额度</p>
      
        <button id="brandBonusContinueBtn" class="global-modal-btn global-modal-btn-outline">继续使用</button>
        <button id="brandBonusUpgradeBtn" class="global-modal-btn global-modal-btn-primary">升级无限额VIP</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('brandBonusContinueBtn').addEventListener('click', () => {
      modal.remove();
    });

    document.getElementById('brandBonusUpgradeBtn').addEventListener('click', () => {
      modal.remove();
      if (typeof window.showVipUpgradeModal === 'function') {
        window.showVipUpgradeModal();
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  // 商家信息不完整提示弹窗
  function showIncompleteInfoModal(incompleteItems) {
    let modal = document.getElementById('incompleteInfoModal')
    if (modal) modal.remove()

    modal = document.createElement('div')
    modal.id = 'incompleteInfoModal'
    modal.className = 'global-modal-overlay'

    const itemsHtml = incompleteItems.map(item => `<span class="modal-tag">${item}</span>`).join('')

    // 判断是否只差促销文案
    const onlyPromoTextMissing = incompleteItems.length === 1 && incompleteItems[0] === '促销文案'
    const modalTitle = onlyPromoTextMissing ? '您的促销文案尚未完善' : '您的海报信息尚未完善'
    const laterBtnText = onlyPromoTextMissing ? '马上完善促销文案' : '完善品牌信息（+10次下载）'

    modal.innerHTML = `
      <div class="global-modal-card">
        <h3 class="modal-title">${modalTitle}</h3>
        <p class="modal-desc">为避免<span style="color:#ff0000;">海报传达信息不符</span>，<br>请完善信息后下载。</p>

        <button id="incompleteContinueBtn" class="global-modal-btn global-modal-btn-outline">先试试看，继续下载</button>
        <button id="incompleteLaterBtn" class="global-modal-btn global-modal-btn-danger">${laterBtnText}</button>
      </div>
    `

    document.body.appendChild(modal)

    document.getElementById('incompleteContinueBtn').addEventListener('click', () => {
      modal.remove()
      forceDownloadAfterInfoCheck()
    })

    document.getElementById('incompleteLaterBtn').addEventListener('click', () => {
      modal.remove()
      if (onlyPromoTextMissing) {
        openPromoTextModal()
      } else {
        openBusinessInfoModal()
      }
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove()
    })
  }

  // 跳过商家信息检查的强制下载
  async function forceDownloadAfterInfoCheck() {
    // VIP用户不扣减次数，非VIP用户需要扣减
    let needDeductQuota = true
    if (typeof VIPSystem !== 'undefined' && VIPSystem.isVip()) {
      needDeductQuota = false
    }

    // 非VIP用户：扣减下载次数
    if (needDeductQuota && typeof VIPSystem !== 'undefined') {
      const templateId = state.currentTemplate ? (state.currentTemplate.id || '') : ''
      const templateName = state.currentTemplate ? (state.currentTemplate.name || '') : ''

      try {
        const deductResult = await VIPSystem.deductDownloadQuota(templateId, templateName)
        if (!deductResult.success) {
          if (deductResult.message && deductResult.message.includes('次数不足')) {
            showToast(deductResult.message || '下载次数不足')
            showQuotaExhaustedModal()
            return
          }
          console.warn('扣减下载次数失败（非次数不足），允许兜底下载:', deductResult.message)
        } else {
          console.log('下载次数扣减成功，剩余:', deductResult.data.downloadQuota)
          updateQuotaDisplay(deductResult.data.downloadQuota)
        }
      } catch (e) {
        console.warn('扣减下载次数异常，允许兜底下载:', e)
      }
    }

    // 记录开始时间
    const startTime = Date.now()

    // 显示加载动画
    showLoadingAnimation()

    // 显示加载状态
    if (elements.downloadBtn) {
      elements.downloadBtn.disabled = true
      elements.downloadBtn.innerHTML = `${window.getSVGIcon ? window.getSVGIcon('spinner', 'svg-icon svg-icon-spin') : '<i class="fa fa-spinner fa-spin"></i>'} 正在生成...`
    }

    try {
      await convertToImageAndDownload()
    } catch (error) {
      console.error('下载海报过程中出错:', error)
      showToast('下载海报失败，请重试')
    } finally {
      const elapsedTime = Date.now() - startTime
      const minDisplayTime = 3500
      if (elapsedTime < minDisplayTime) {
        const remainingTime = minDisplayTime - elapsedTime
        await new Promise(resolve => setTimeout(resolve, remainingTime))
      }
      hideLoadingAnimation()
      if (elements.downloadBtn) {
        elements.downloadBtn.disabled = false
        elements.downloadBtn.innerHTML = `${window.getSVGIcon ? window.getSVGIcon('download', 'svg-icon') : '<i class="fa fa-download"></i>'} 下载海报`
        if (window.downloadButtonAnimation) {
          setTimeout(() => {
            window.downloadButtonAnimation.start()
          }, 3000)
        }
      }
    }
  }

  // 更新下载次数显示
  function updateQuotaDisplay(quota) {
    let quotaEl = document.getElementById('downloadQuotaDisplay');
    if (!quotaEl && elements.downloadBtn) {
      quotaEl = document.createElement('span');
      quotaEl.id = 'downloadQuotaDisplay';
      quotaEl.style.cssText = 'font-size:12px;color:#ff9800;margin-left:6px;';
      elements.downloadBtn.parentNode.insertBefore(quotaEl, elements.downloadBtn.nextSibling);
    }
    if (quotaEl) {
      if (quota > 0) {
        quotaEl.textContent = `剩余${quota}次`;
        quotaEl.style.color = '#ff9800';
      } else {
        quotaEl.textContent = '次数已用完';
        quotaEl.style.color = '#f44336';
      }
    }
  }

  // 次数不足弹窗
  function showQuotaExhaustedModal() {
    let modal = document.getElementById('quotaExhaustedModal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'quotaExhaustedModal';
    modal.className = 'global-modal-overlay';

    modal.innerHTML = `
      <div class="global-modal-card">
        <div class="modal-icon">😔</div>
        <h3 class="modal-title">您的免费下载次数已用完</h3>
        <p class="modal-desc">升级VIP品牌账号，<span style="color:#e60000;">不限额度下载</span></p>
        <button id="quotaUpgradeBtn" class="global-modal-btn global-modal-btn-primary">优惠升级</button>
        <button id="quotaCloseBtn" class="global-modal-btn global-modal-btn-secondary">不想升级</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('quotaUpgradeBtn').addEventListener('click', () => {
      modal.remove();
      if (typeof VIPSystem !== 'undefined' && !VIPSystem.isLoggedIn()) {
        showLoginReminder();
      } else {
        showVipUpgradeModal();
      }
    });

    document.getElementById('quotaCloseBtn').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  // 广告弹窗
  function showAdModal() {
    // 移除已存在的广告弹窗
    let adModal = document.getElementById('adModal');
    if (adModal) {
      adModal.remove();
    }

    // 创建广告弹窗
    adModal = document.createElement('div');
    adModal.id = 'adModal';
    adModal.className = 'ad-modal-overlay';

    adModal.innerHTML = `
      <div class="ad-modal">
        <!-- 关闭按钮 -->
        <button id="closeAdModalBtn" class="ad-modal-close">×</button>
        
        <!-- 广告位置 -->
        <div class="ad-container">
          <!-- 广告代码将在此处添加 -->
          <div style="text-align: center;">
            ${window.getSVGIcon ? window.getSVGIcon('ad', 'svg-icon') : '<i class="fa fa-ad"></i>'}
            <p>广告位置</p>
          </div>
        </div>
        
        <!-- 按钮容器 -->
        <div class="ad-buttons-container">
          <!-- 下载按钮 -->
          <button id="adDownloadBtn" class="ad-download-btn" disabled>
            （<span id="adCountdown" class="ad-countdown">15</span>秒后）下载海报
          </button>
          
          <!-- 升级VIP品牌账户按钮 -->
          <button id="customBrandBtn" class="ad-vip-btn">
            0秒等待升级您的VIP品牌账号
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(adModal);

    // 倒计时逻辑
    let countdown = 15;
    const countdownElement = document.getElementById('adCountdown');
    const downloadBtn = document.getElementById('adDownloadBtn');

    const timer = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;
      
      if (countdown <= 0) {
        clearInterval(timer);
        downloadBtn.disabled = false;
        // 更新按钮文字
        downloadBtn.innerHTML = '下载海报';
      }
    }, 1000);

    // 关闭按钮事件
    document.getElementById('closeAdModalBtn').addEventListener('click', () => {
      clearInterval(timer);
      adModal.remove();
    });

    // 下载按钮事件
    downloadBtn.addEventListener('click', async () => {
      clearInterval(timer);
      adModal.remove();
      await downloadPosterAfterVerification();
    });

    // 升级VIP品牌账户按钮事件
    document.getElementById('customBrandBtn').addEventListener('click', () => {
      clearInterval(timer);
      adModal.remove();
      
      // 检查用户是否已登录
      const isVipLoggedIn = (typeof VIPSystem !== 'undefined' && VIPSystem.isLoggedIn());
      
      if (!isVipLoggedIn) {
        // 未登录，显示提醒弹窗
        showLoginReminder();
      } else {
        // 已登录，显示VIP升级弹窗
        showVipUpgradeModal();
      }
    });
    
    // 显示登录提醒弹窗
    function showLoginReminder() {
      const modal = document.createElement('div');
      modal.className = 'login-reminder-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
      `;
      
      const modalContent = document.createElement('div');
      modalContent.className = 'login-reminder-modal-content';
      modalContent.style.cssText = `
        background: white;
        padding: 24px;
        border-radius: 10px;
        max-width: 350px;
        width: 90%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
      `;
      
      // 添加右上角关闭按钮
      const closeXBtn = document.createElement('button');
      closeXBtn.className = 'login-reminder-close-btn x-btn';
      closeXBtn.textContent = '×';
      closeXBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        padding: 5px;
        line-height: 1;
      `;
      closeXBtn.onclick = function() {
        document.body.removeChild(modal);
      };
      modalContent.appendChild(closeXBtn);
      
      // 标题
      const title = document.createElement('h3');
      title.textContent = '温馨提醒';
      title.style.cssText = `
        margin-top: 0;
        margin-bottom: 16px;
        font-size: 18px;
        font-weight: bold;
        color: #333;
      `;
      modalContent.appendChild(title);
      
      // 内容
      const message = document.createElement('p');
      message.textContent = '当前无登录账号，登录后可对账号升级';
      message.style.cssText = `
        margin-bottom: 20px;
        line-height: 1.5;
        color: #666;
      `;
      modalContent.appendChild(message);
      
      // 快速登录注册按钮
      const loginBtn = document.createElement('button');
      loginBtn.className = 'login-reminder-login-btn';
      loginBtn.textContent = '快速登录注册，体验完整服务';
      loginBtn.style.cssText = `
        background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        width: 100%;
        transition: all 0.3s ease;
      `;
      loginBtn.onclick = function() {
        document.body.removeChild(modal);

        // 显示VIP登录弹窗
        if (typeof VipLoginUI !== 'undefined' && VipLoginUI.showLoginModal) {
          VipLoginUI.showLoginModal();
        }
      };
      loginBtn.onmouseover = function() {
        this.style.transform = 'scale(1.05)';
      };
      loginBtn.onmouseout = function() {
        this.style.transform = 'scale(1)';
      };
      modalContent.appendChild(loginBtn);
      
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    }
  }
  


  // 导出前预处理图片
  async function prepareImages() {
    const logoImg = document.getElementById('posterLogoImg');
    const qrImg = document.getElementById('posterQrcodeImg');
    const bgImg = document.getElementById('posterBackground');

    // 辅助函数：尝试将图片转为base64（用于html2canvas导出）
    async function prepareImageForExport(img, cacheKey, fallbackUrl = null) {
      if (!img || !img.src) return;
      
      // 已经是base64，无需处理
      if (img.src.startsWith('data:')) return;
      
      // 本地图片，无需处理
      if (!img.src.startsWith('http')) return;
      
      // 先尝试从缓存读取（仅当有cacheKey时）
      if (cacheKey) {
        const cached = getFromCache(cacheKey);
        if (cached && cached.startsWith('data:image')) {
          img.src = cached;
          return;
        }
      }
      
      // 尝试通过fetch获取base64
      try {
        const base64 = await loadImageAsBase64(img.src);
        if (base64 && base64.startsWith('data:image')) {
          img.src = base64;
          if (cacheKey) saveToCache(cacheKey, base64);
          return;
        }
      } catch (e) {
        console.warn(`[导出] fetch转换失败，尝试crossOrigin方式:`, e.message);
      }
      
      // 尝试设置crossOrigin并重新加载图片
      const originalSrc = img.src;
      const crossOriginResult = await new Promise((resolve) => {
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';
        tempImg.onload = function() {
          img.crossOrigin = 'anonymous';
          img.src = originalSrc;
          resolve(true);
        };
        tempImg.onerror = function() {
          resolve(false);
        };
        tempImg.src = originalSrc;
      });
      
      if (crossOriginResult) return;
      
      // crossOrigin也失败，如果有本地回退URL，尝试加载本地图片
      if (fallbackUrl && fallbackUrl !== originalSrc) {
        console.log(`[导出] 尝试使用本地回退图片: ${fallbackUrl}`);
        try {
          const base64 = await loadImageAsBase64(fallbackUrl);
          if (base64 && base64.startsWith('data:image')) {
            img.src = base64;
            return;
          }
        } catch (e) {
          console.warn(`[导出] 本地回退图片加载失败:`, e.message);
        }
        // 直接设置本地路径
        img.crossOrigin = '';
        img.src = fallbackUrl;
        return;
      }
      
      // 完全无法处理，清除crossOrigin
      console.warn(`[导出] 无法处理跨域图片，背景可能显示为白色`);
      img.crossOrigin = '';
    }

    // 背景图导出时不提前获取 fallback（避免 getFallbackUrl 副作用标记 cloudflare 失败）
    // 导出时图片应已加载成功（img.src 已是有效 URL），若需回退由前面加载逻辑处理
    await Promise.all([
      prepareImageForExport(logoImg, IMAGE_CACHE_KEYS.logo),
      prepareImageForExport(qrImg, IMAGE_CACHE_KEYS.qrcode),
      prepareImageForExport(bgImg, null, null)
    ]);
  }



  // 转换为图片并下载 - 简化版：直接使用html2canvas对整个posterFrame进行截图
  async function convertToImageAndDownload() {
    // 预处理图片
    await prepareImages();

    // 获取元素
    if (!elements.posterFrame) {
      showToast('未找到海报元素');
      return;
    }
    
    // 声明临时样式元素变量
    let tempStyledElements = [];
    
    // 提高分辨率，设置一个更高的缩放比例
    const scale = window.devicePixelRatio * 1.5 || 3;
    
    // 保存原始样式信息
    const originalBusinessNameTransform = elements.posterBusinessName ? elements.posterBusinessName.style.transform : '';
    const originalPromoTextTransform = elements.posterPromoText ? elements.posterPromoText.style.transform : '';
    const originalPromoTextPadding = elements.posterPromoText ? elements.posterPromoText.style.padding : '';
    
    // 查找并保存背景图片元素的原始样式和src
    const backgroundImageElement = document.getElementById('posterBackground') || null;
    const originalBackgroundImageStyle = backgroundImageElement ? {
      display: backgroundImageElement.style.display,
      opacity: backgroundImageElement.style.opacity,
      objectFit: backgroundImageElement.style.objectFit,
      width: backgroundImageElement.style.width,
      height: backgroundImageElement.style.height
    } : null;
    const originalBackgroundImageSrc = backgroundImageElement ? backgroundImageElement.src : '';
    let tempCanvasElement = null;
    
    // 恢复样式的函数
    function cleanupStyles() {
      // 恢复原始样式
      if (elements.posterBusinessName) {
        elements.posterBusinessName.style.transform = originalBusinessNameTransform;
      }
      if (elements.posterPromoText) {
        elements.posterPromoText.style.transform = originalPromoTextTransform;
        elements.posterPromoText.style.padding = originalPromoTextPadding;
      }
      
      // 恢复背景图片原始样式并移除临时canvas
      if (backgroundImageElement) {
        backgroundImageElement.style.display = '';
        if (originalBackgroundImageStyle) {
          Object.assign(backgroundImageElement.style, originalBackgroundImageStyle);
        }
        // 恢复原始src（prepareImages 可能修改了背景图路径）
        if (originalBackgroundImageSrc && backgroundImageElement.src !== originalBackgroundImageSrc) {
          backgroundImageElement.src = originalBackgroundImageSrc;
        }
      }
      if (tempCanvasElement && tempCanvasElement.parentNode) {
        tempCanvasElement.parentNode.removeChild(tempCanvasElement);
      }
      
      // 移除二维码和Logo的canvas元素，恢复原始图片显示
      const qrcodeImg = document.getElementById('posterQrcodeImg');
      const logoImg = document.getElementById('posterLogoImg');
      
      if (qrcodeImg) {
        // 查找并移除二维码canvas
        const qrcodeContainer = qrcodeImg.parentElement;
        if (qrcodeContainer) {
          const qrcodeCanvas = qrcodeContainer.querySelector('canvas');
          if (qrcodeCanvas && qrcodeCanvas.parentNode) {
            qrcodeCanvas.parentNode.removeChild(qrcodeCanvas);
          }
          // 恢复二维码图片显示
          qrcodeImg.style.display = '';
        }
      }
      
      if (logoImg) {
        // 查找并移除Logo canvas
        const logoContainer = logoImg.parentElement;
        if (logoContainer) {
          const logoCanvas = logoContainer.querySelector('canvas');
          if (logoCanvas && logoCanvas.parentNode) {
            logoCanvas.parentNode.removeChild(logoCanvas);
          }
          // 恢复Logo图片显示
          logoImg.style.display = '';
        }
      }
    }
    
    // 执行html2canvas的函数
      function executeHtml2Canvas() {
        // 使用html2canvas配置参数，增加更多优化选项
        const options = {
          backgroundColor: null, // 透明背景
          scale: scale, // 高分辨率
          useCORS: true, // 允许跨域图片
          allowTaint: true, // 允许图片污染
          logging: false, // 禁用日志
          width: elements.posterFrame.offsetWidth,
          height: elements.posterFrame.offsetHeight,
          imageTimeout: 30000, // 增加图片加载超时时间
          removeContainer: false, // 保留容器
          letterRendering: true, // 启用字母渲染优化
          useRecursiveClone: true, // 使用递归克隆提高渲染质量
          preserveDrawingBuffer: true, // 保留绘图缓冲区
          disableWindowResize: true, // 禁用窗口调整大小的影响
          disableAutoScale: false // 允许自动缩放
        };
      
      // 使用html2canvas截图
      try {
        // 隐藏贴纸的控制控件（删除按钮和缩放控制点）
        const stickerControls = elements.posterFrame.querySelectorAll('.sticker-controls');
        stickerControls.forEach(control => {
          control.style.display = 'none';
        });
        
        // 隐藏缩放控制点
        const resizeHandles = elements.posterFrame.querySelectorAll('.sticker-resize-handle');
        resizeHandles.forEach(handle => {
          handle.style.display = 'none';
        });
        
        // 隐藏独立的贴纸控件
        const stickerControlBtns = elements.posterFrame.querySelectorAll('.sticker-control');
        stickerControlBtns.forEach(btn => {
          btn.style.display = 'none';
        });
        
        // 配置CORS图片导出 - useCORS允许跨域，allowTaint设为false保持画布可导出
        options.allowTaint = false; // 关键！false时如果图片正确CORS就能导出
        options.useCORS = true; // 开启跨域支持
        
        return html2canvas(elements.posterFrame, options).then(canvas => {
          // 恢复贴纸的控制控件
          stickerControls.forEach(control => {
            control.style.display = '';
          });
          
          // 恢复缩放控制点
          resizeHandles.forEach(handle => {
            handle.style.display = '';
          });
          
          // 恢复独立的贴纸控件
          stickerControlBtns.forEach(btn => {
            btn.style.display = '';
          });
          
          try {
            // 生成最高质量的PNG图像，确保清晰度
            let imageUrl;
            try {
              imageUrl = canvas.toDataURL('image/png', 1.0);
            } catch (toDataUrlError) {
              console.error('生成图像URL时出错:', toDataUrlError);
              const fallbackCanvas = document.createElement('canvas');
              fallbackCanvas.width = 600;
              fallbackCanvas.height = 900;
              const ctx = fallbackCanvas.getContext('2d');
              ctx.fillStyle = '#4a90e2';
              ctx.fillRect(0, 0, 600, 900);
              ctx.fillStyle = '#ffffff';
              ctx.font = '24px Arial';
              ctx.textAlign = 'center';
              ctx.fillText('海报导出', 300, 450);
              imageUrl = fallbackCanvas.toDataURL('image/png');
            }
            
            // 设置文件名 - 使用模板名称和时间
            let templateName = 'poster';
            if (state.currentTemplate) {
              if (state.currentTemplate.id === 'dairy-2024-001') {
                templateName = '品牌日常';
              } else {
                templateName = state.currentTemplate.name.replace(/[\\/:*?"<>|]/g, '_');
              }
            }
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timestamp = `${year}${month}${day}-${hours}${minutes}`;
            const fileName = `${templateName}${timestamp}.png`;
          
            // 检测是否在uni-app的WebView中
            if (window.uni && window.uni.postMessage) {
              // 在原生应用中，使用postMessage通知原生端
              console.log('检测到uni-app环境，使用postMessage下载');
              window.uni.postMessage({
                data: {
                  action: 'downloadImage',
                  url: imageUrl,
                  fileName: fileName
                }
              });
              showToast('海报已发送到原生应用处理');
            } else {
              // 在浏览器中，使用原来的下载方式
              const link = document.createElement('a');
              link.href = imageUrl;
              link.download = fileName;
              
              document.body.appendChild(link);
              link.click();
              setTimeout(() => {
                document.body.removeChild(link);
              }, 100);
              
              showToast('海报生成成功！');
            }
          } catch (downloadError) {
            console.error('创建下载链接时出错:', downloadError);
            showToast('海报生成成功但下载失败，请手动截图');
          }
        }).catch(error => {
          console.error('生成海报时出错:', error);
          showToast('生成海报失败，已使用替代方案');
          
          // 如果html2canvas完全失败，创建一个简单的替代图像
          const fallbackCanvas = document.createElement('canvas');
          fallbackCanvas.width = 600;
          fallbackCanvas.height = 900;
          const ctx = fallbackCanvas.getContext('2d');
          ctx.fillStyle = '#f0f0f0';
          ctx.fillRect(0, 0, 600, 900);
          ctx.fillStyle = '#333333';
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('海报预览', 300, 450);
          
          const link = document.createElement('a');
          link.href = fallbackCanvas.toDataURL('image/png');
          
          // 设置文件名 - 使用模板名称和时间（备用方案）
          let templateName = 'poster';
          if (state.currentTemplate) {
            // 品牌日常模板使用特殊名称
            if (state.currentTemplate.id === 'dairy-2024-001') {
              templateName = '品牌日常';
            } else {
              templateName = state.currentTemplate.name.replace(/[\\/:*?"<>|]/g, '_');
            }
          }
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const timestamp = `${year}${month}${day}-${hours}${minutes}`;
          link.download = `${templateName}${timestamp}_fallback.png`;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
          }, 100);
          
          return Promise.resolve(); // 不抛出错误，让finally执行
        }).finally(() => {
          try {
            cleanupStyles();
          } catch (cleanupError) {
            console.error('清理样式时出错:', cleanupError);
          }
        });
      } catch (e) {
        console.error('准备海报生成时出错:', e);
        showToast('海报生成失败，请重试');
        try {
          cleanupStyles();
        } catch (cleanupError) {
          console.error('清理样式时出错:', cleanupError);
        }
        return Promise.reject(e);
      }
    }
    
    try {
      // 临时调整商家名称位置和促销信息的padding
      if (elements.posterBusinessName) {
        // 移除向上位移，保持水平居中对齐
        elements.posterBusinessName.style.transform = `none`;
        elements.posterBusinessName.style.fontSize = `10px`;
        
      }
      if (elements.posterPromoText) {
        // 减少padding-bottom，避免下方出现空白
        elements.posterPromoText.style.padding = `4px 3px 7px 5px`;
         elements.posterPromoText.style.lineHeight = `13px`;
         elements.posterPromoText.style.fontSize = `9px`;
         elements.posterPromoText.style.bottom = `24px`;
         
      }
      
      // 保存logo和二维码的原始样式
      const logoImgElement = elements.posterLogoImg;
      const qrcodeImgElement = elements.posterQrcodeImg;
      const originalLogoStyle = logoImgElement ? {
        display: logoImgElement.style.display,
        opacity: logoImgElement.style.opacity,
        visibility: logoImgElement.style.visibility,
        borderRadius: logoImgElement.style.borderRadius,
        objectFit: logoImgElement.style.objectFit,
        width: logoImgElement.style.width,
        height: logoImgElement.style.height
      } : null;
      const originalQrcodeStyle = qrcodeImgElement ? {
        display: qrcodeImgElement.style.display,
        opacity: qrcodeImgElement.style.opacity,
        visibility: qrcodeImgElement.style.visibility,
        borderRadius: qrcodeImgElement.style.borderRadius,
        objectFit: qrcodeImgElement.style.objectFit,
        width: qrcodeImgElement.style.width,
        height: qrcodeImgElement.style.height
      } : null;
      let tempLogoCanvas = null;
      let tempQrcodeCanvas = null;
      
      // 辅助函数：绘制圆角矩形
      function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }
      
      // 辅助函数：创建canvas来正确显示图片
      async function createProperlyScaledCanvas(imgElement) {
        if (!imgElement || !imgElement.src) return null;

        return new Promise((resolve, reject) => {
          try {
            function draw() {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              const container = imgElement.parentElement;
              const innerWrapper = container.querySelector('.logo-inner-wrapper, .qrcode-inner-wrapper');
              const targetElement = innerWrapper || container;
              const width = targetElement.offsetWidth;
              const height = targetElement.offsetHeight;

              const scaleRatio = window.devicePixelRatio * 2 || 4;

              canvas.width = width * scaleRatio;
              canvas.height = height * scaleRatio;

              canvas.style.width = width + 'px';
              canvas.style.height = height + 'px';

              ctx.scale(scaleRatio, scaleRatio);
              
              // 判断是否是 Logo 或二维码
              const isLogo = imgElement.id === 'posterLogoImg';
              const isQrcode = imgElement.id === 'posterQrcodeImg';
              
              if (isLogo) {
                if (state.businessInfo.logoTransparent) {
                  ctx.drawImage(imgElement, 0, 0, width, height);
                } else {
                  const borderRadius = Math.min(width, height) * 0.15;
                  const borderWidth = 0;
                  const borderColor = 'rgba(255,255,255,0.67)';

                  ctx.save();
                  ctx.beginPath();
                  drawRoundedRect(ctx, borderWidth, borderWidth, width - borderWidth * 2, height - borderWidth * 2, borderRadius);
                  ctx.clip();
                  ctx.drawImage(imgElement, 0, 0, width, height);
                  ctx.restore();

                  ctx.beginPath();
                  drawRoundedRect(ctx, borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, borderRadius);
                  ctx.strokeStyle = borderColor;
                  ctx.lineWidth = borderWidth;
                  ctx.stroke();
                }
              } else if (isQrcode) {
                // 二维码：圆角 + 白色描边
                const borderWidth = 1;
                const borderColor = 'rgba(255,255,255,0.67)';
                const borderRadius = Math.min(width, height) * 0.1;
                
                ctx.save();
                ctx.beginPath();
                drawRoundedRect(ctx, borderWidth, borderWidth, width - borderWidth * 2, height - borderWidth * 2, borderRadius - borderWidth);
                ctx.clip();
                ctx.drawImage(imgElement, 0, 0, width, height);
                ctx.restore();
                
                // 绘制描边
                ctx.beginPath();
                drawRoundedRect(ctx, borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, borderRadius - borderWidth / 2);
                ctx.strokeStyle = borderColor;
                ctx.lineWidth = borderWidth;
                ctx.stroke();
              } else {
                // 其他图片：直接绘制
                ctx.drawImage(imgElement, 0, 0, width, height);
              }

              // 隐藏 img，插入 canvas
              imgElement.style.display = 'none';
              container.insertBefore(canvas, imgElement);

              return canvas;
            }

            // 如果图片还没加载完成，等加载后再绘制
            if (!imgElement.complete) {
              imgElement.onload = () => {
                resolve(draw());
              };
            } else {
              resolve(draw());
            }

          } catch (err) {
            console.error('createProperlyScaledCanvas失败:', err);
            reject(err);
          }
        });
      }
      
      // 处理背景图片
      if (backgroundImageElement && backgroundImageElement.src) {
        // 创建一个新的Image对象来加载背景图片
        const img = new Image();
        
        // 使用Promise来处理图片加载
        await new Promise((resolve, reject) => {
          // 检测当前页面协议
          const currentProtocol = window.location.protocol;
          const isUsingTemplate = !state.customBackground && state.currentTemplate;
          
          // 根据协议和是否使用模板设置不同的加载策略
          if (currentProtocol === 'file:') {
            // file://协议处理
            console.log('检测到file://协议，处理背景图片...');
            
            // 移除crossOrigin设置，因为本地文件不需要跨域处理
            img.crossOrigin = null;
            
            img.onload = function() {
              try {
                console.log('成功加载背景图片');
                // 创建临时canvas元素
                tempCanvasElement = document.createElement('canvas');
                const ctx = tempCanvasElement.getContext('2d');
                
                // 获取海报框架尺寸
                const posterWidth = elements.posterFrame.offsetWidth;
                const posterHeight = elements.posterFrame.offsetHeight;
                
                // 提高临时canvas分辨率
                tempCanvasElement.width = posterWidth * scale;
                tempCanvasElement.height = posterHeight * scale;
                // 设置canvas的CSS尺寸与容器相同
                tempCanvasElement.style.width = posterWidth + 'px';
                tempCanvasElement.style.height = posterHeight + 'px';
                // 缩放上下文以匹配高分辨率
                ctx.scale(scale, scale);
                
                // 计算object-fit:cover的裁剪参数
                const imgRatio = img.width / img.height;
                const posterRatio = posterWidth / posterHeight;
                
                let drawWidth, drawHeight, offsetX, offsetY;
                
                if (imgRatio > posterRatio) {
                  // 图片更宽，按高度缩放，裁剪宽度
                  drawHeight = posterHeight;
                  drawWidth = img.width * (posterHeight / img.height);
                  offsetX = (posterWidth - drawWidth) / 2;
                  offsetY = 0;
                } else {
                  // 图片更高，按宽度缩放，裁剪高度
                  drawWidth = posterWidth;
                  drawHeight = img.height * (posterWidth / img.width);
                  offsetX = 0;
                  offsetY = (posterHeight - drawHeight) / 2;
                }
                
                // 绘制图片（实现object-fit:cover效果）
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                
                // 隐藏原始图片，显示canvas
                backgroundImageElement.style.display = 'none';
                tempCanvasElement.style.position = 'absolute';
                tempCanvasElement.style.top = '0';
                tempCanvasElement.style.left = '0';
                tempCanvasElement.style.width = '100%';
                tempCanvasElement.style.height = '100%';
                backgroundImageElement.parentNode.insertBefore(tempCanvasElement, backgroundImageElement);
                
                resolve();
              } catch (error) {
                console.error('绘制背景图片时出错:', error);
                // 出错时尝试备用方案
                createFallbackBackground();
                resolve();
              }
            };
            
            img.onerror = function() {
              console.warn('无法直接加载背景图片，准备创建备用背景...');
              createFallbackBackground();
              resolve();
            };
            
            // 对于模板背景，确保使用正确的本地路径
            if (isUsingTemplate && state.currentTemplate && state.currentTemplate.image) {
              // 对于模板背景，直接使用模板的image路径
              console.log('使用模板背景图片路径:', state.currentTemplate.image);
              const imageUrl = window.imageConfig ? window.imageConfig.getImageUrl(state.currentTemplate.image) : state.currentTemplate.image;
              img.src = imageUrl;
              img.dataset.originalPath = state.currentTemplate.image;
              
              // 图片加载失败回退处理
              img.onerror = function() {
                const originalPath = this.getAttribute('data-original-path');
                if (originalPath && window.imageConfig && window.imageConfig.shouldFallback()) {
                  const fallbackUrl = window.imageConfig.getFallbackUrl(originalPath);
                  if (fallbackUrl) {
                    this.src = fallbackUrl;
                    return;
                  }
                }
                console.warn('无法直接加载背景图片，准备创建备用背景...');
                createFallbackBackground();
                resolve();
              };
            } else {
              // 对于自定义背景或其他情况，使用当前背景图片的src
              img.src = backgroundImageElement.src;
            }
          } else {
            // 对于http/https协议，设置跨域属性
            img.crossOrigin = 'anonymous';
            
            img.onload = function() {
              try {
                // 创建临时canvas元素
                tempCanvasElement = document.createElement('canvas');
                const ctx = tempCanvasElement.getContext('2d');
                
                // 获取海报框架尺寸
                const posterWidth = elements.posterFrame.offsetWidth;
                const posterHeight = elements.posterFrame.offsetHeight;
                
                // 提高临时canvas分辨率
                tempCanvasElement.width = posterWidth * scale;
                tempCanvasElement.height = posterHeight * scale;
                // 设置canvas的CSS尺寸与容器相同
                tempCanvasElement.style.width = posterWidth + 'px';
                tempCanvasElement.style.height = posterHeight + 'px';
                // 缩放上下文以匹配高分辨率
                ctx.scale(scale, scale);
                
                // 计算object-fit:cover的裁剪参数
                const imgRatio = img.width / img.height;
                const posterRatio = posterWidth / posterHeight;
                
                let drawWidth, drawHeight, offsetX, offsetY;
                
                if (imgRatio > posterRatio) {
                  // 图片更宽，按高度缩放，裁剪宽度
                  drawHeight = posterHeight;
                  drawWidth = img.width * (posterHeight / img.height);
                  offsetX = (posterWidth - drawWidth) / 2;
                  offsetY = 0;
                } else {
                  // 图片更高，按宽度缩放，裁剪高度
                  drawWidth = posterWidth;
                  drawHeight = img.height * (posterWidth / img.width);
                  offsetX = 0;
                  offsetY = (posterHeight - drawHeight) / 2;
                }
                
                // 绘制图片（实现object-fit:cover效果）
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                
                // 隐藏原始图片，显示canvas
                backgroundImageElement.style.display = 'none';
                tempCanvasElement.style.position = 'absolute';
                tempCanvasElement.style.top = '0';
                tempCanvasElement.style.left = '0';
                tempCanvasElement.style.width = '100%';
                tempCanvasElement.style.height = '100%';
                backgroundImageElement.parentNode.insertBefore(tempCanvasElement, backgroundImageElement);
                
                resolve();
              } catch (error) {
                reject(error);
              }
            };
            
            img.onerror = function() {
              console.warn('无法直接加载背景图片，尝试使用纯色背景...');
              try {
                // 创建一个新的canvas来绘制背景色，作为替代方案
                const fallbackCanvas = document.createElement('canvas');
                fallbackCanvas.width = elements.posterFrame.offsetWidth;
                fallbackCanvas.height = elements.posterFrame.offsetHeight;
                const ctx = fallbackCanvas.getContext('2d');
                ctx.fillStyle = '#f0f0f0'; // 默认灰色背景
                ctx.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
                
                // 隐藏原始图片，显示canvas
                backgroundImageElement.style.display = 'none';
                fallbackCanvas.style.position = 'absolute';
                fallbackCanvas.style.top = '0';
                fallbackCanvas.style.left = '0';
                fallbackCanvas.style.width = '100%';
                fallbackCanvas.style.height = '100%';
                backgroundImageElement.parentNode.insertBefore(fallbackCanvas, backgroundImageElement);
                tempCanvasElement = fallbackCanvas;
                
                resolve(); // 即使图片加载失败，也继续处理，使用纯色背景
              } catch (e) {
                reject(new Error('无法加载背景图片，也无法创建替代背景'));
              }
            };
            
            img.src = backgroundImageElement.src;
          }
          
          // 创建备用背景的函数
          function createFallbackBackground() {
            try {
              // 直接创建新的canvas作为背景
              const fallbackCanvas = document.createElement('canvas');
              // 获取海报框架尺寸
              const posterWidth = elements.posterFrame.offsetWidth;
              const posterHeight = elements.posterFrame.offsetHeight;
              fallbackCanvas.width = posterWidth;
              fallbackCanvas.height = posterHeight;
              fallbackCanvas.id = 'tempBackgroundCanvas';
              
              // 获取canvas上下文
              const tempCtx = fallbackCanvas.getContext('2d');
              if (tempCtx) {
                // 对于模板，使用不同的背景颜色以示区别
                const bgColor = isUsingTemplate ? '#4a90e2' : '#f0f0f0';
                tempCtx.fillStyle = bgColor; // 使用蓝色或灰色背景
                tempCtx.fillRect(0, 0, posterWidth, posterHeight);
                
                try {
                  // 添加一些文字说明
                  tempCtx.fillStyle = '#ffffff';
                  tempCtx.font = '24px Arial';
                  tempCtx.textAlign = 'center';
                  tempCtx.fillText(isUsingTemplate ? '模板背景' : '海报背景', posterWidth / 2, posterHeight / 2);
                } catch (textError) {
                  console.warn('添加文字失败，但背景已创建');
                }
              }
            
              // 将fallback canvas插入到DOM中，替换原背景图
              if (backgroundImageElement && backgroundImageElement.parentNode) {
                // 隐藏原始背景图
                backgroundImageElement.style.display = 'none';
                // 插入新的canvas
                backgroundImageElement.parentNode.insertBefore(fallbackCanvas, backgroundImageElement);
                // 保存引用以便后续清理
                tempCanvasElement = fallbackCanvas;
              }
            } catch (e) {
              console.error('创建替代背景时出错:', e);
            }
          }
        });
      }
      
      // 处理Logo图片
      if (logoImgElement && logoImgElement.src) {
        try {
          tempLogoCanvas = await createProperlyScaledCanvas(logoImgElement);
        } catch (error) {
          console.error('处理Logo图片时出错:', error);
          // 即使Logo加载失败，也继续执行
        }
      }
      
      // 处理二维码图片
      if (qrcodeImgElement && qrcodeImgElement.src) {
        try {
          tempQrcodeCanvas = await createProperlyScaledCanvas(qrcodeImgElement);
        } catch (error) {
          console.error('处理二维码图片时出错:', error);
          // 即使二维码加载失败，也继续执行
        }
      }
      
      // 更新cleanupStyles函数以包含logo和二维码的清理
      const originalCleanupStyles = cleanupStyles;
      cleanupStyles = function() {
        try {
          // 调用原始清理函数
          if (typeof originalCleanupStyles === 'function') {
            originalCleanupStyles();
          }
          
          // 移除临时创建的背景canvas
          const tempCanvas = document.getElementById('tempBackgroundCanvas');
          if (tempCanvas && tempCanvas.parentNode) {
            tempCanvas.parentNode.removeChild(tempCanvas);
          }
          
          // 恢复logo原始样式并移除临时canvas
          if (logoImgElement) {
            logoImgElement.style.display = '';
            // 安全地恢复样式，避免Object.assign引起的错误
            if (originalLogoStyle && typeof originalLogoStyle === 'object') {
              for (const prop in originalLogoStyle) {
                if (originalLogoStyle.hasOwnProperty(prop) && typeof prop === 'string') {
                  logoImgElement.style[prop] = originalLogoStyle[prop];
                }
              }
            }
            
            // 强制移除Logo容器中的所有canvas元素
            const logoContainer = logoImgElement.parentElement;
            if (logoContainer) {
              const canvases = logoContainer.querySelectorAll('canvas');
              canvases.forEach(canvas => {
                if (canvas.parentNode) {
                  canvas.parentNode.removeChild(canvas);
                }
              });
            }
          }
          if (tempLogoCanvas && tempLogoCanvas.parentNode) {
            tempLogoCanvas.parentNode.removeChild(tempLogoCanvas);
          }
          
          // 恢复二维码原始样式并移除临时canvas
          if (qrcodeImgElement) {
            qrcodeImgElement.style.display = '';
            if (originalQrcodeStyle && typeof originalQrcodeStyle === 'object') {
              for (const prop in originalQrcodeStyle) {
                if (originalQrcodeStyle.hasOwnProperty(prop) && typeof prop === 'string') {
                  qrcodeImgElement.style[prop] = originalQrcodeStyle[prop];
                }
              }
            }
            
            // 强制移除二维码容器中的所有canvas元素
            const qrcodeContainer = qrcodeImgElement.parentElement;
            if (qrcodeContainer) {
              const canvases = qrcodeContainer.querySelectorAll('canvas');
              canvases.forEach(canvas => {
                if (canvas.parentNode) {
                  canvas.parentNode.removeChild(canvas);
                }
              });
            }
          }
          if (tempQrcodeCanvas && tempQrcodeCanvas.parentNode) {
            tempQrcodeCanvas.parentNode.removeChild(tempQrcodeCanvas);
          }
        } catch (e) {
          console.error('清理样式时出错:', e);
        }
      };
      
      // 执行html2canvas
      await executeHtml2Canvas();
    } catch (error) {
      console.error('处理海报生成时出错:', error);
      showToast('生成海报失败，请重试');
      
      // 确保恢复原始样式
      cleanupStyles();
      throw error; // 重新抛出错误，让调用者知道操作失败
    }
  }
  
  // 移除复杂的辅助函数，只保留必要的功能
  
  // 辅助函数：防抖
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  // 在页面卸载时清理事件监听器，防止内存泄漏
    window.addEventListener('beforeunload', function() {
      // 清理全局事件监听器
      if (elements.downloadBtn) {
        elements.downloadBtn.removeEventListener('click', downloadPoster);
      }
      // 其他需要清理的事件监听器可以在这里添加
    });
  
  // 辅助函数：节流
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const context = this;
      const args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // 确保在DOM完全加载后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeEditor();
    });
  } else {
    initializeEditor();
  }
  
  // 导出全局调试器对象
  window.editorDebugger = {
    getCurrentTemplate: function() {
      return state.currentTemplate;
    },
    getBusinessInfo: function() {
      return state.businessInfo;
    },
    resetEditor: function() {
      resetEditor();
    }
  };
  
  console.log('海报编辑器加载完成，调试器已导出');
});

// VIP相关功能

// 加载下载次数
async function loadDownloadQuota() {
  try {
    if (typeof VIPSystem === 'undefined' || !VIPSystem.getUserId()) return;
    if (VIPSystem.isVip()) {
      // VIP用户不需要显示下载次数，主动清理可能残留的次数显示元素
      const existingQuotaEl = document.getElementById('downloadQuotaDisplay');
      if (existingQuotaEl) existingQuotaEl.remove();
      return;
    }
    
    const result = await VIPSystem.getDownloadQuota();
    if (result.success && result.data) {
      const quota = result.data.downloadQuota;
      console.log('下载次数加载成功:', quota);
      
      // 在下载按钮旁显示剩余次数
      const downloadBtn = document.getElementById('downloadBtn');
      if (downloadBtn) {
        let quotaEl = document.getElementById('downloadQuotaDisplay');
        if (!quotaEl) {
          quotaEl = document.createElement('span');
          quotaEl.id = 'downloadQuotaDisplay';
          quotaEl.style.cssText = 'font-size:12px;color:#ff9800;margin-left:6px;';
          downloadBtn.parentNode.insertBefore(quotaEl, downloadBtn.nextSibling);
        }
        if (quota > 0) {
          quotaEl.textContent = `剩余${quota}次`;
          quotaEl.style.color = '#ff9800';
        } else {
          quotaEl.textContent = '次数已用完';
          quotaEl.style.color = '#f44336';
        }
      }
    }
  } catch (e) {
    console.warn('加载下载次数失败:', e);
  }
}

function checkVipStatus() {
  // 检查URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const vipParam = urlParams.get('vip');
  
  if (vipParam) {
    console.log('检测到VIP参数:', vipParam);
    
    // 验证VIP参数
    const user = window.vipData && window.vipData.users ? window.vipData.users[vipParam] : null;
    if (user && window.isVipActive && window.isVipActive()) {
      // 保存VIP状态
      window.saveVipLogin(user);
      
      // 显示VIP状态栏
      showVipStatusBar(user);
      
      // 设置固定商家信息
      setVipFixedInfo();
      
      // 更新恢复按钮显示状态
      checkAndShowRestoreButtons();
    }
  } else if (window.isVipActive && window.isVipActive()) {
    // 通过localStorage检查VIP状态
    const user = window.getCurrentVipInfo ? window.getCurrentVipInfo() : null;
    if (user) {
      showVipStatusBar(user);
      setVipFixedInfo();
      
      // 更新恢复按钮显示状态
      checkAndShowRestoreButtons();
    }
  } else {
    // 非VIP用户，隐藏恢复按钮
    checkAndShowRestoreButtons();
  }
}

// 显示VIP状态栏（隐藏状态栏，通过按钮样式显示VIP状态）
function showVipStatusBar(user) {
  const vipStatusBar = document.getElementById('vipStatusBar');
  const vipValidUntilDate = document.getElementById('vipValidUntilDate');
  
  if (vipStatusBar && vipValidUntilDate) {
    // 隐藏VIP状态栏，避免占据空间
    vipStatusBar.classList.add('hidden');
    vipValidUntilDate.textContent = user.validUntil;
    document.body.classList.add('vip-active');
    
    // 更新商家信息按钮为VIP样式
    updateBusinessInfoButtonForVip();
    
    console.log('VIP状态已激活，有效期至:', user.validUntil);
  }
}

// 设置VIP固定商家信息
function setVipFixedInfo() {
  const fixedInfo = window.getVipFixedInfo ? window.getVipFixedInfo() : null;
  
  if (!fixedInfo) return;
  
  // 设置固定商家名称（允许在名称后添加文字）
  const businessNameInput = document.getElementById('business-name');
  if (businessNameInput) {
    // 保存原始名称，用于后续添加后缀
    const originalName = fixedInfo.name;
    businessNameInput.value = originalName;
    
    // 允许编辑，但限制只能添加后缀
    businessNameInput.disabled = false;
    businessNameInput.title = 'VIP用户：可在商家名称后添加文字（如：-厦门分公司）';
    
    // 监听输入变化，限制编辑范围
    let isUpdating = false; // 防止无限循环
    businessNameInput.addEventListener('input', function() {
      if (isUpdating) return;
      
      const currentValue = this.value;
      
      // 如果当前值长度小于原始名称，说明用户在删除原始名称
      if (currentValue.length < originalName.length) {
        // 阻止删除原始名称，恢复到原始名称
        isUpdating = true;
        this.value = originalName;
        isUpdating = false;
        return;
      }
      
      // 如果用户修改了原始名称的前缀部分，恢复原始名称
      if (!currentValue.startsWith(originalName)) {
        isUpdating = true;
        this.value = originalName + (currentValue.substring(originalName.length) || '');
        isUpdating = false;
      }
    });
    
    // 隐藏商家名称输入框的清除按钮
    hideClearButtonsForVip();
  }
  
  // 设置固定商家名称显示
  const posterBusinessName = document.getElementById('posterBusinessName');
  if (posterBusinessName) {
    posterBusinessName.textContent = fixedInfo.name;
  }
  
  // 设置固定logo（如果有的话）
  if (fixedInfo.logo) {
    const businessLogoImg = document.getElementById('businessLogoImg');
    const businessLogoPlaceholder = document.getElementById('businessLogoPlaceholder');
    
    if (businessLogoImg && businessLogoPlaceholder) {
      businessLogoImg.src = fixedInfo.logo;
      businessLogoImg.style.display = 'block';
      businessLogoPlaceholder.style.display = 'none';
      
      // 隐藏Logo上传区域
      const logoUploadArea = document.getElementById('logoUploadArea');
      if (logoUploadArea) {
        logoUploadArea.style.display = 'none';
      }
      
      // 隐藏删除按钮
      const removeLogoBtn = document.getElementById('removeLogoBtn');
      if (removeLogoBtn) {
        removeLogoBtn.style.display = 'none';
      }
    }
  }
  
  // 清空二维码，等待用户上传
  const qrcodePreview = document.getElementById('qrcodePreview');
  const qrcodeUploadArea = document.getElementById('qrcodeUploadArea');
  if (qrcodePreview && qrcodeUploadArea) {
    qrcodePreview.style.display = 'none';
    qrcodeUploadArea.style.display = 'block';
  }
  
  console.log('VIP固定商家信息已设置');
}

// 隐藏VIP用户的清除按钮
function hideClearButtonsForVip() {
  // 隐藏所有清除按钮
  const clearButtons = document.querySelectorAll('.clear-button');
  clearButtons.forEach(button => {
    button.style.display = 'none';
  });
  
  // 隐藏Logo删除按钮
  const removeLogoBtn = document.getElementById('removeLogoBtn');
  if (removeLogoBtn) {
    removeLogoBtn.style.display = 'none';
  }
  
  // 隐藏二维码删除按钮
  const removeQrcodeBtn = document.getElementById('removeQrcodeBtn');
  if (removeQrcodeBtn) {
    removeQrcodeBtn.style.display = 'none';
  }

  // 隐藏Logo透明开关
  const logoTransparencyToggle = document.getElementById('logoTransparencyToggle');
  if (logoTransparencyToggle) {
    logoTransparencyToggle.style.display = 'none';
  }

  const logoCutoutBtn = document.getElementById('logoCutoutBtn');
  if (logoCutoutBtn) {
    logoCutoutBtn.style.display = 'none';
  }
}

// 为VIP用户显示删除按钮（允许编辑）
function showDeleteButtonsForVip() {
  // 显示Logo删除按钮
  const removeLogoBtn = document.getElementById('removeLogoBtn');
  if (removeLogoBtn) {
    removeLogoBtn.style.display = 'block';
  }

  // 显示Logo透明开关
  const logoTransparencyToggle = document.getElementById('logoTransparencyToggle');
  if (logoTransparencyToggle && state.businessInfo.logo) {
    logoTransparencyToggle.style.display = 'flex';
  }

  const logoCutoutBtnEl = document.getElementById('logoCutoutBtn');
  if (logoCutoutBtnEl && state.businessInfo.logo && state.businessInfo.logoTransparent) {
    logoCutoutBtnEl.style.display = 'inline-block';
  }
  
  // 显示二维码删除按钮
  const removeQrcodeBtn = document.getElementById('removeQrcodeBtn');
  if (removeQrcodeBtn) {
    removeQrcodeBtn.style.display = 'block';
  }
  
  // 检查并显示恢复按钮
  checkAndShowRestoreButtons();
}

// 更新商家信息按钮为VIP样式
function updateBusinessInfoButtonForVip() {
  const editBusinessInfoBtn = document.getElementById('editBusinessInfoBtn');
  if (editBusinessInfoBtn) {
    // 添加VIP样式类
    editBusinessInfoBtn.classList.add('vip-button');
    
    // 更新图标为钻石图标
    const icon = editBusinessInfoBtn.querySelector('i') || editBusinessInfoBtn.querySelector('.svg-icon');
    if (icon) {
      if (window.SVGIcons && window.SVGIcons['crown']) {
        icon.innerHTML = window.SVGIcons['crown'];
        icon.className = 'svg-icon';
      } else {
        icon.className = 'fa fa-crown';
      }
    }
    
    // 更新文字
    const textSpan = editBusinessInfoBtn.querySelector('span');
    if (textSpan) {
      textSpan.textContent = '商家信息';
    }
    
    // 添加VIP提示
    editBusinessInfoBtn.title = 'VIP用户：商家名称和Logo固定，可在名称后添加文字';
  }
}

  // 恢复原始Logo
  function restoreOriginalLogo() {
    const vipInfo = window.getVipFixedInfo();
    if (vipInfo && vipInfo.logo) {
      state.businessInfo.logo = vipInfo.logo;
      
      // 立即保存到缓存 - 使用直接保存方式
      try {
        if (window.isVipActive && window.isVipActive()) {
          // VIP用户保存到VIP专属缓存
          const vipId = localStorage.getItem('vipId');
          if (vipId) {
            const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
            localStorage.setItem(vipBusinessInfoKey, JSON.stringify(state.businessInfo));
          }
        } else {
          // 普通用户保存到普通缓存
          localStorage.setItem('posterBusinessInfo', JSON.stringify(state.businessInfo));
        }
      } catch (error) {
        console.error('保存失败:', error);
      }
      
      // 更新显示 - 直接更新DOM元素
      updateDisplayForRestore();
      
      // 显示预览，隐藏上传区域
      if (elements.logoPreview && elements.logoPreviewImg && elements.logoUploadArea) {
        elements.logoPreviewImg.src = vipInfo.logo;
        elements.logoPreview.style.display = 'block';
        elements.logoUploadArea.style.display = 'none';
      }
      
      // 显示成功提示
      showToast('已恢复原始Logo');
    }
  }

  // 恢复原始二维码
  function restoreOriginalQrcode() {
    const vipInfo = window.getVipFixedInfo();
    if (vipInfo && vipInfo.qrcode) {
      state.businessInfo.qrcode = vipInfo.qrcode;
      
      // 立即保存到缓存 - 使用直接保存方式
      try {
        if (window.isVipActive && window.isVipActive()) {
          // VIP用户保存到VIP专属缓存
          const vipId = localStorage.getItem('vipId');
          if (vipId) {
            const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
            localStorage.setItem(vipBusinessInfoKey, JSON.stringify(state.businessInfo));
          }
        } else {
          // 普通用户保存到普通缓存
          localStorage.setItem('posterBusinessInfo', JSON.stringify(state.businessInfo));
        }
      } catch (error) {
        console.error('保存失败:', error);
      }
      
      // 更新显示 - 直接更新DOM元素
      updateDisplayForRestore();
      
      // 显示预览，隐藏上传区域
      if (elements.qrcodePreview && elements.qrcodePreviewImg && elements.qrcodeUploadArea) {
        elements.qrcodePreviewImg.src = vipInfo.qrcode;
        elements.qrcodePreview.classList.remove('hidden');
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodeUploadArea.style.display = 'none';
      }
      
      // 显示成功提示
      showToast('已恢复原始二维码');
    }
  }

  // 检查并显示恢复按钮（只有VIP用户登录时才显示恢复按钮）
  function checkAndShowRestoreButtons() {
    // VIP用户登录时显示恢复按钮
    if (window.isVipActive && window.isVipActive()) {
      const vipInfo = window.getVipFixedInfo();
      if (!vipInfo) {
        return;
      }
      
      // VIP用户显示Logo恢复按钮（如果VIP有预设Logo）
      if (elements.restoreLogoBtnContainer) {
        if (vipInfo.logo) {
          elements.restoreLogoBtnContainer.classList.remove('hidden');
        } else {
          elements.restoreLogoBtnContainer.classList.add('hidden');
        }
      }
      
      // VIP用户显示二维码恢复按钮（如果VIP有预设二维码）
      if (elements.restoreQrcodeBtnContainer) {
        if (vipInfo.qrcode) {
          elements.restoreQrcodeBtnContainer.classList.remove('hidden');
        } else {
          elements.restoreQrcodeBtnContainer.classList.add('hidden');
        }
      }
    } else {
      // 非VIP用户（券码用户）隐藏恢复按钮
      if (elements.restoreLogoBtnContainer) {
        elements.restoreLogoBtnContainer.classList.add('hidden');
      }
      if (elements.restoreQrcodeBtnContainer) {
        elements.restoreQrcodeBtnContainer.classList.add('hidden');
      }
    }
  }

  // 为恢复功能专门创建的显示更新函数
  function updateDisplayForRestore() {
    // 更新商家名称
    if (elements.posterBusinessName && state.businessInfo.name) {
      elements.posterBusinessName.textContent = state.businessInfo.name;
      elements.posterBusinessName.style.color = state.textColor || '#000000';
    }
    
    // 更新商家Logo
    if (elements.posterLogoImg) {
      const logoContainer = elements.posterLogoImg.parentElement;
      if (logoContainer) {
        const canvases = logoContainer.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        });
      }
      
      if (state.businessInfo.logo) {
        elements.posterLogoImg.dataset.cloudUrl = state.businessInfo.logo;
        elements.posterLogoImg.style.display = 'block';
        elements.logoDefaultImg.style.display = 'none';
        
        const cachedLogo = getFromCache(IMAGE_CACHE_KEYS.logo);
        if (cachedLogo && cachedLogo.startsWith('data:image')) {
          elements.posterLogoImg.src = cachedLogo;
        } else {
          elements.posterLogoImg.src = state.businessInfo.logo;
          loadImageAsBase64(state.businessInfo.logo).then(base64 => {
            saveToCache(IMAGE_CACHE_KEYS.logo, base64);
          }).catch(e => {
            console.error('Logo缓存加载失败:', e);
          });
        }
      } else {
        elements.posterLogoImg.style.display = 'none';
        elements.posterLogoImg.dataset.cloudUrl = '';
        elements.posterLogoImg.src = '';
        elements.logoDefaultImg.style.display = 'block';
      }
    }
    
    // 更新二维码
    if (elements.posterQrcodeImg) {
      const qrcodeContainer = elements.posterQrcodeImg.parentElement;
      if (qrcodeContainer) {
        const canvases = qrcodeContainer.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        });
      }
      
      if (state.businessInfo.qrcode) {
        elements.posterQrcodeImg.dataset.cloudUrl = state.businessInfo.qrcode;
        elements.posterQrcodeImg.style.display = 'block';
        elements.qrcodeDefaultImg.style.display = 'none';
        
        const cachedQr = getFromCache(IMAGE_CACHE_KEYS.qrcode);
        if (cachedQr && cachedQr.startsWith('data:image')) {
          elements.posterQrcodeImg.src = cachedQr;
        } else {
          elements.posterQrcodeImg.src = state.businessInfo.qrcode;
          loadImageAsBase64(state.businessInfo.qrcode).then(base64 => {
            saveToCache(IMAGE_CACHE_KEYS.qrcode, base64);
          }).catch(e => {
            console.error('二维码缓存加载失败:', e);
          });
        }
      } else {
        elements.posterQrcodeImg.style.display = 'none';
        elements.posterQrcodeImg.dataset.cloudUrl = '';
        elements.posterQrcodeImg.src = '';
        elements.qrcodeDefaultImg.style.display = 'block';
      }
    }
    
    // 更新促销信息
    if (elements.posterPromoText) {
      const promoText = state.businessInfo.promoText || '👇长按加好友/进粉丝福利群！\n🎁这里可以写引流文促销文案或地址/联系方式 📝（点击更改）';
      elements.posterPromoText.innerHTML = promoText.replace(/\n/g, '<br>');
      elements.posterPromoText.style.color = state.textColor;
    }
  }

  // 在编辑器模板选择弹窗中添加自定义背景入口
  function addCustomBackgroundEntryToModal() {
    if (!elements.templateGrid) return;
    
    // 创建自定义背景入口项
    const customItem = document.createElement('div');
    customItem.className = 'template-item custom-background-entry';
    customItem.dataset.templateId = 'custom-background';
    
    // 创建图片容器
    const templateImgContainer = document.createElement('div');
    templateImgContainer.className = 'template-thumbnail-container';
    
    // 创建自定义背景图标
    const customIcon = document.createElement('div');
    customIcon.className = 'custom-background-icon';
    customIcon.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
    
    // 创建圆形勾选按钮
    const checkButton = document.createElement('div');
    checkButton.className = 'template-check-button';
    checkButton.innerHTML = window.getSVGIcon ? window.getSVGIcon('check', 'svg-icon') : '<i class="fa fa-check"></i>';
    
    // 为勾选按钮添加点击事件
    checkButton.addEventListener('click', function(e) {
      e.stopPropagation(); // 阻止事件冒泡
      console.log('点击自定义背景入口');
      
      // 移除所有勾选按钮的选中状态
      document.querySelectorAll('.template-check-button').forEach(btn => {
        btn.classList.remove('checked');
      });
      
      // 添加当前按钮的选中状态
      this.classList.add('checked');
      
      // 设置自定义背景状态
      state.customBackground = true;
      state.currentTemplate = null;
      
      // 模拟点击上传背景按钮，触发文件选择对话框
      setTimeout(() => {
        if (elements.uploadBackgroundBtn) {
          elements.uploadBackgroundBtn.click();
        }
      }, 100);
    });
    
    // 为自定义背景项添加点击事件
    customItem.addEventListener('click', function() {
      // 移除所有勾选按钮的选中状态
      document.querySelectorAll('.template-check-button').forEach(btn => {
        btn.classList.remove('checked');
      });
      
      // 添加当前按钮的选中状态
      checkButton.classList.add('checked');
      
      // 设置自定义背景状态
      state.customBackground = true;
      state.currentTemplate = null;
      
      // 模拟点击上传背景按钮，触发文件选择对话框
      setTimeout(() => {
        if (elements.uploadBackgroundBtn) {
          elements.uploadBackgroundBtn.click();
        }
      }, 100);
    });
    
    // 创建模板名称
    const templateName = document.createElement('div');
    templateName.className = 'template-name';
    templateName.textContent = '自定义背景';
    
    // 组合自定义背景项
    templateImgContainer.appendChild(customIcon);
    templateImgContainer.appendChild(checkButton);
    customItem.appendChild(templateImgContainer);
    customItem.appendChild(templateName);
    
    // 添加到网格
    elements.templateGrid.appendChild(customItem);
  }
  
  // VIP登录成功后从云端加载商家信息
  window.onVipLoginSuccess = async function(userData) {
    console.log('VIP登录成功，开始从云端加载商家信息...', userData);
    
    try {
      // 从云端获取用户信息
      const response = await fetch('https://api.peacelove.top/user-get-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userData.userId })
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const cloudData = result.data;
        console.log('云端商家信息:', cloudData);
        
        // 更新state中的商家信息
        if (cloudData.brandname) {
          state.businessInfo.name = cloudData.brandname;
        }
        if (cloudData.logoUrl) {
          state.businessInfo.logo = cloudData.logoUrl;
        }
        if (cloudData.qrcodeUrl) {
          state.businessInfo.qrcode = cloudData.qrcodeUrl;
        }
        if (cloudData.promoText) {
          state.businessInfo.promoText = cloudData.promoText;
        }
        if (cloudData.logoTransparent !== undefined) {
          state.businessInfo.logoTransparent = cloudData.logoTransparent;
        }
        
        // 保存到本地存储
        const vipId = localStorage.getItem('vipId') || userData.userId;
        const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
        localStorage.setItem(vipBusinessInfoKey, JSON.stringify(state.businessInfo));
        console.log('商家信息已保存到本地存储:', vipBusinessInfoKey);
        
        // 更新画布显示
        updateBusinessInfoDisplay();
        
        // 更新编辑区域的输入框
        const businessNameInput = document.getElementById('business-name');
        if (businessNameInput && state.businessInfo.name) {
          businessNameInput.value = state.businessInfo.name;
        }
        
        // 更新Logo预览
        if (state.businessInfo.logo && elements.logoPreviewImg && elements.logoPreview && elements.logoUploadArea) {
          elements.logoPreviewImg.src = state.businessInfo.logo;
          elements.logoPreviewImg.dataset.cloudUrl = state.businessInfo.logo;
          elements.logoPreview.style.display = 'block';
          elements.logoUploadArea.style.display = 'none';
        }
        
        // 更新二维码预览
        if (state.businessInfo.qrcode && elements.qrcodePreviewImg && elements.qrcodePreview && elements.qrcodeUploadArea) {
          elements.qrcodePreviewImg.src = state.businessInfo.qrcode;
          elements.qrcodePreviewImg.dataset.cloudUrl = state.businessInfo.qrcode;
          elements.qrcodePreview.style.display = 'block';
          elements.qrcodeUploadArea.style.display = 'none';
        }
        
        // 刷新图片缓存
        await refreshImagesFromCloud();
        
        console.log('商家信息已从云端同步完成');
      }
    } catch (error) {
      console.error('从云端加载商家信息失败:', error);
    }
    
    try {
      // 从服务器获取最新的VIP状态
      console.log('从服务器获取最新VIP状态...');
      const vipStatusResult = await VIPSystem.checkVipStatus(userData.userId, userData.phone);
      console.log('服务器返回的VIP状态:', vipStatusResult);
    } catch (error) {
      console.error('获取VIP状态失败:', error);
    }
  };
  
  // 贴纸管理功能
  window.stickerManager = {
    stickers: [],
    selectedStickerId: null,
    stickerCount: 0,
    autoHideTimer: null,
    autoHideDelay: 1500,
    
    // 初始化贴纸管理器
    init: function() {
      this.stickers = [];
      this.selectedStickerId = null;
      this.stickerCount = 0;
      this.autoHideTimer = null;
    },

    // 清除所有贴纸（切换模板时调用）
    clearAllStickers: function() {
      // 清空贴纸数组
      this.stickers = [];
      this.selectedStickerId = null;

      // 清除 DOM 中的所有贴纸元素
      const posterFrame = document.getElementById('posterFrame');
      if (posterFrame) {
        const existingStickers = posterFrame.querySelectorAll('.sticker, .sticker-control');
        existingStickers.forEach(el => el.remove());
      }

      console.log('已清除所有贴纸');
    },

    // 重置自动隐藏计时器
    resetAutoHideTimer: function() {
      // 清除现有计时器
      if (this.autoHideTimer) {
        clearTimeout(this.autoHideTimer);
      }
      
      // 只有当有选中贴纸被选中时，才设置新计时器
      if (this.selectedStickerId) {
        this.autoHideTimer = setTimeout(() => {
          const posterFrame = document.getElementById('posterFrame');
          if (!posterFrame) {
            this.selectedStickerId = null;
            this.renderStickers();
            return;
          }
          
          const sticker = posterFrame.querySelector(`.sticker[data-sticker-id="${this.selectedStickerId}"]`);
          if (sticker) {
            sticker.classList.remove('selected');
            const handles = sticker.querySelectorAll('.sticker-resize-handle');
            
            handles.forEach(handle => {
              handle.style.opacity = '0';
              handle.style.transform = 'scale(0)';
            });
          }
          
          // 隐藏控件
          const controls = posterFrame.querySelectorAll(`.sticker-control[data-sticker-id="${this.selectedStickerId}"]`);
          controls.forEach(control => {
            control.style.opacity = '0';
          });
          
          this.selectedStickerId = null;
        }, this.autoHideDelay);
      }
    },
    
    // 添加贴纸到海报
    addSticker: function(imageUrl, x, y, scale, naturalWidth, naturalHeight, category) {
      this.stickerCount++;
      const stickerId = `sticker-${this.stickerCount}`;
      
      const sticker = {
        id: stickerId,
        imageUrl: imageUrl,
        x: x || 50,
        y: y || 50,
        scale: scale || 1,
        rotation: 0,
        mirror: false,
        zIndex: 100 + this.stickerCount,
        naturalWidth: naturalWidth || 100,
        naturalHeight: naturalHeight || 100,
        // 贴纸颜色相关属性
        color: '#ffffff',
        brightness: 1,
        saturation: 1,
        // 栏目信息
        category: category || null
      };
      
      this.stickers.push(sticker);
      this.selectedStickerId = stickerId;
      
      this.renderStickers();
      this.resetAutoHideTimer();
      return stickerId;
    },
    
    // 从海报移除贴纸
    removeSticker: function(stickerId) {
      const index = this.stickers.findIndex(s => s.id === stickerId);
      if (index !== -1) {
        this.stickers.splice(index, 1);

        if (this.selectedStickerId === stickerId) {
          this.selectedStickerId = null;
        }

        // 关闭该贴纸的调色面板
        const panel = document.querySelector(`.sticker-color-panel[data-sticker-id="${stickerId}"]`);
        if (panel) {
          panel.remove();
        }

        this.renderStickers();
      }
    },
    
    // 选择贴纸
    selectSticker: function(stickerId) {
      // 如果已经选中了这个贴纸，只重置计时器
      if (this.selectedStickerId === stickerId) {
        this.resetAutoHideTimer();
        return;
      }
      
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;
      
      // 先隐藏之前选中贴纸的控件
      if (this.selectedStickerId) {
        const prevSticker = posterFrame.querySelector(`.sticker[data-sticker-id="${this.selectedStickerId}"]`);
        if (prevSticker) {
          prevSticker.classList.remove('selected');
          const prevHandles = prevSticker.querySelectorAll('.sticker-resize-handle');
          
          prevHandles.forEach(handle => {
            handle.style.opacity = '0';
            handle.style.transform = 'scale(0)';
          });
        }
        
        // 隐藏之前的控件
        const prevControls = posterFrame.querySelectorAll(`.sticker-control[data-sticker-id="${this.selectedStickerId}"]`);
        prevControls.forEach(control => {
          control.style.opacity = '0';
        });
      }
      
      // 设置新选中的贴纸
      this.selectedStickerId = stickerId;
      
      // 显示新选中贴纸的控件
      const newSticker = posterFrame.querySelector(`.sticker[data-sticker-id="${stickerId}"]`);
      if (newSticker) {
        newSticker.classList.add('selected');
        const newHandles = newSticker.querySelectorAll('.sticker-resize-handle');
        
        newHandles.forEach(handle => {
          handle.style.opacity = '1';
          handle.style.transform = 'scale(1)';
        });
      }
      
      // 显示新选中贴纸的控件
      const newControls = posterFrame.querySelectorAll(`.sticker-control[data-sticker-id="${stickerId}"]`);
      newControls.forEach(control => {
        control.style.opacity = '1';
      });
      
      this.resetAutoHideTimer();
    },
    
    // 更新贴纸位置
    updateStickerPosition: function(stickerId, x, y) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (sticker) {
        sticker.x = x;
        sticker.y = y;
      }
    },
    
    // 更新贴纸缩放
    updateStickerScale: function(stickerId, scale) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (sticker) {
        sticker.scale = scale;
      }
    },
    
    // 更新贴纸旋转
    updateStickerRotation: function(stickerId, rotation) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (sticker) {
        sticker.rotation = rotation;
        this.updateStickerVisual(stickerId);
      }
    },
    
    // 更新贴纸镜像
    toggleStickerMirror: function(stickerId) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (sticker) {
        sticker.mirror = !sticker.mirror;
        this.updateStickerVisual(stickerId);
      }
    },
    
    // 显示贴纸调色面板
    showStickerColorPanel: function(stickerId) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (!sticker) return;
      
      // 显示调色面板
      this.showStickerColorPanelUI(sticker);
    },
    
    // 上移贴纸层级
    bringStickerForward: function(stickerId) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (!sticker) return;
      
      // 找到当前贴纸的zIndex
      const currentZIndex = sticker.zIndex;
      
      // 找到比当前贴纸zIndex大的最小贴纸
      let nextSticker = null;
      let minHigherZIndex = Infinity;
      
      this.stickers.forEach(s => {
        if (s.id !== stickerId && s.zIndex > currentZIndex && s.zIndex < minHigherZIndex) {
          minHigherZIndex = s.zIndex;
          nextSticker = s;
        }
      });
      
      // 如果存在更高层级的贴纸，交换zIndex
      if (nextSticker) {
        const tempZIndex = sticker.zIndex;
        sticker.zIndex = nextSticker.zIndex;
        nextSticker.zIndex = tempZIndex;
        
        // 更新DOM层级
        this.updateStickerZIndex(stickerId);
        this.updateStickerZIndex(nextSticker.id);
        this.updateLayerButtonStates(stickerId);
        this.updateLayerButtonStates(nextSticker.id);
      }
    },
    
    // 下移贴纸层级
    sendStickerBackward: function(stickerId) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (!sticker) return;
      
      // 找到当前贴纸的zIndex
      const currentZIndex = sticker.zIndex;
      
      // 找到比当前贴纸zIndex小的最大贴纸
      let prevSticker = null;
      let maxLowerZIndex = -Infinity;
      
      this.stickers.forEach(s => {
        if (s.id !== stickerId && s.zIndex < currentZIndex && s.zIndex > maxLowerZIndex) {
          maxLowerZIndex = s.zIndex;
          prevSticker = s;
        }
      });
      
      // 如果存在更低层级的贴纸，交换zIndex
      if (prevSticker) {
        const tempZIndex = sticker.zIndex;
        sticker.zIndex = prevSticker.zIndex;
        prevSticker.zIndex = tempZIndex;
        
        // 更新DOM层级
        this.updateStickerZIndex(stickerId);
        this.updateStickerZIndex(prevSticker.id);
        this.updateLayerButtonStates(stickerId);
        this.updateLayerButtonStates(prevSticker.id);
      }
    },
    
    // 更新贴纸DOM层级
    updateStickerZIndex: function(stickerId) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (!sticker) return;
      
      const stickerEl = document.querySelector(`.sticker[data-sticker-id="${stickerId}"]`);
      if (stickerEl) {
        stickerEl.style.zIndex = sticker.zIndex;
      }
      
      // 更新控件层级
      this.updateControlPositions(stickerId);
    },
    
    // 更新层级按钮状态
    updateLayerButtonStates: function(stickerId) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (!sticker) return;
      
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;
      
      const bringForwardBtn = posterFrame.querySelector(`.sticker-bring-forward-btn[data-sticker-id="${stickerId}"]`);
      const sendBackwardBtn = posterFrame.querySelector(`.sticker-send-backward-btn[data-sticker-id="${stickerId}"]`);
      
      // 找到最高和最低的zIndex
      let maxZIndex = -Infinity;
      let minZIndex = Infinity;
      
      this.stickers.forEach(s => {
        if (s.zIndex > maxZIndex) maxZIndex = s.zIndex;
        if (s.zIndex < minZIndex) minZIndex = s.zIndex;
      });
      
      // 更新上移按钮状态
      if (bringForwardBtn) {
        if (sticker.zIndex >= maxZIndex) {
          bringForwardBtn.classList.add('disabled');
          bringForwardBtn.disabled = true;
        } else {
          bringForwardBtn.classList.remove('disabled');
          bringForwardBtn.disabled = false;
        }
      }
      
      // 更新下移按钮状态
      if (sendBackwardBtn) {
        if (sticker.zIndex <= minZIndex) {
          sendBackwardBtn.classList.add('disabled');
          sendBackwardBtn.disabled = true;
        } else {
          sendBackwardBtn.classList.remove('disabled');
          sendBackwardBtn.disabled = false;
        }
      }
    },
    
    // 渲染所有贴纸
    renderStickers: function() {
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;
      
      const frameRect = posterFrame.getBoundingClientRect();
      const baseWidth = 1000;
      const scaleRatio = frameRect.width / baseWidth;
      
      // 清除现有的贴纸和控件
      const existingStickers = posterFrame.querySelectorAll('.sticker, .sticker-control');
      existingStickers.forEach(el => el.remove());
      
      // 渲染所有贴纸
      this.stickers.forEach(sticker => {
        const stickerEl = document.createElement('div');
        const isSelected = this.selectedStickerId === sticker.id;
        stickerEl.className = 'sticker' + (isSelected ? ' selected' : '');
        stickerEl.dataset.stickerId = sticker.id;
        stickerEl.setAttribute('data-sticker-id', sticker.id);
        stickerEl.style.left = sticker.x + '%';
        stickerEl.style.top = sticker.y + '%';
        const scaleX = sticker.mirror ? -1 : 1;
        stickerEl.style.transform = `translate(-50%, -50%) scale(${sticker.scale * scaleX}, ${sticker.scale}) rotate(${sticker.rotation}deg)`;
        stickerEl.style.zIndex = sticker.zIndex;
        
        // 判断是否启用调色功能（只针对早安、晚安、生活标题三个栏目）
        const enableColorAdjustment = this.isColorAdjustmentCategory(sticker.category);
        
        if (enableColorAdjustment) {
          // 使用 Canvas 渲染贴纸（支持颜色替换）
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Canvas 的宽高使用图片原始尺寸（保持清晰度）
          canvas.width = sticker.naturalWidth;
          canvas.height = sticker.naturalHeight;
          
          // 加载图片并绘制到 Canvas
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = sticker.imageUrl;
          
          img.onload = () => {
            // 绘制原始图片（使用原始尺寸）
            ctx.drawImage(img, 0, 0);
            
            // 应用颜色替换和滤镜
            this.applyStickerColorFilter(ctx, sticker.naturalWidth, sticker.naturalHeight, sticker);
            
            // 清除之前的 canvas
            const existingCanvas = stickerEl.querySelector('canvas');
            if (existingCanvas) {
              stickerEl.removeChild(existingCanvas);
            }
            
            stickerEl.appendChild(canvas);
          };
          
          img.onerror = () => {
            // 如果加载失败，使用 img 元素
            const stickerImg = document.createElement('img');
            stickerImg.src = sticker.imageUrl;
            stickerImg.style.display = 'block';
            stickerImg.style.objectFit = 'contain';
            stickerEl.appendChild(stickerImg);
          };
        } else {
          // 使用 img 元素渲染（不支持调色）
          const stickerImg = document.createElement('img');
          stickerImg.src = sticker.imageUrl;
          stickerImg.style.display = 'block';
          stickerImg.style.objectFit = 'contain';
          stickerEl.appendChild(stickerImg);
        }
        
        posterFrame.appendChild(stickerEl);
        
        // 设置 Canvas 的 CSS 尺寸（使用原始尺寸，由 transform 处理缩放）
        if (enableColorAdjustment) {
          const canvas = stickerEl.querySelector('canvas');
          if (canvas) {
            canvas.style.width = sticker.naturalWidth + 'px';
            canvas.style.height = sticker.naturalHeight + 'px';
          }
        }
        
        // 创建独立的控件（不受贴纸旋转影响）
        this.createStickerControls(sticker.id, isSelected, enableColorAdjustment);
        
        // 绑定事件
        this.bindStickerEvents(stickerEl, sticker.id);
        
        // 确保控件位置正确（在贴纸添加到 DOM 后）
        // 使用 requestAnimationFrame 确保浏览器完成渲染
        requestAnimationFrame(() => {
          this.updateControlPositions(sticker.id);
        });
      });
    },
    
    // 判断是否是启用调色功能的栏目
    isColorAdjustmentCategory: function(category) {
      // 只针对早安、晚安、生活标题三个栏目
      return category === 'zaoan' || category === 'wanan' || category === 'life';
    },
    
    // 创建贴纸操作控件（独立元素）
    createStickerControls: function(stickerId, isSelected, enableColorAdjustment) {
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;
      
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (!sticker) return;
      
      // 计算贴纸中心位置
      const frameRect = posterFrame.getBoundingClientRect();
      const baseWidth = 1000;
      const scaleRatio = frameRect.width / baseWidth;
      
      const stickerCenterX = (sticker.x / 100) * frameRect.width;
      const stickerCenterY = (sticker.y / 100) * frameRect.height;
      
      // 贴纸尺寸（基于原始尺寸和缩放）
      // sticker.scale 已经包含了 scaleRatio，不需要再乘以 scaleRatio
      const displayWidth = sticker.naturalWidth * sticker.scale;
      const displayHeight = sticker.naturalHeight * sticker.scale;
      const baseSize = Math.max(displayWidth, displayHeight);
      
      // 实际尺寸 = 贴纸容器的渲染尺寸
      // 因为 Canvas 的 CSS 尺寸是 sticker.naturalWidth，但被 transform: scale(sticker.scale) 缩放
      let actualWidth = displayWidth;
      let actualHeight = displayHeight;
      
      // 删除按钮（顶部居中）
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'sticker-control sticker-delete-btn';
      deleteBtn.innerHTML = '×';
      deleteBtn.title = '删除贴纸';
      deleteBtn.dataset.stickerId = stickerId;
      deleteBtn.style.cssText = `
        position: absolute;
        left: ${stickerCenterX}px;
        top: ${stickerCenterY - actualHeight/2 - 20}px;
        transform: translate(-50%, -50%);
        opacity: ${isSelected ? '1' : '0'};
        z-index: ${sticker.zIndex + 10};
      `;
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        this.removeSticker(stickerId);
      };
      posterFrame.appendChild(deleteBtn);
      
      // 镜像按钮（左侧居中，红色填充）
      const mirrorBtn = document.createElement('button');
      mirrorBtn.className = 'sticker-control sticker-mirror-btn';
      mirrorBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('arrows-h', 'svg-icon', {'color': '#FF4444'}) : '<i class="fa fa-arrows-h" style="color: #FF4444;"></i>';
      mirrorBtn.title = '镜像翻转';
      mirrorBtn.dataset.stickerId = stickerId;
      mirrorBtn.style.cssText = `
        position: absolute;
        left: ${stickerCenterX - actualWidth/2 - 20}px;
        top: ${stickerCenterY}px;
        transform: translate(-50%, -50%);
        opacity: ${isSelected ? '1' : '0'};
        z-index: ${sticker.zIndex + 10};
      `;
      mirrorBtn.onclick = (e) => {
        e.stopPropagation();
        this.toggleStickerMirror(stickerId);
      };
      posterFrame.appendChild(mirrorBtn);
      
      // 调色按钮（只在启用调色功能时显示）
      if (enableColorAdjustment) {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'sticker-control sticker-color-btn';
        colorBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('paint-brush', 'svg-icon', {'color': '#FF4444'}) : '<i class="fa fa-paint-brush" style="color: #FF4444;"></i>';
        colorBtn.title = '调色';
        colorBtn.dataset.stickerId = stickerId;
        colorBtn.dataset.position = 'left-bottom';
        colorBtn.style.cssText = `
          position: absolute;
          left: ${stickerCenterX - actualWidth/2 - 20}px;
          top: ${stickerCenterY + actualHeight/2 + 20}px;
          transform: translate(-50%, -50%);
          opacity: ${isSelected ? '1' : '0'};
          z-index: ${sticker.zIndex + 10};
        `;
        colorBtn.onclick = (e) => {
          e.stopPropagation();
          this.showStickerColorPanel(stickerId);
        };
        posterFrame.appendChild(colorBtn);
      }
      
      // 旋转按钮（右侧居中，红色边框白色背景红色符号）
      const rotateBtn = document.createElement('button');
      rotateBtn.className = 'sticker-control sticker-rotate-btn';
      rotateBtn.innerHTML = '↺';
      rotateBtn.title = '旋转贴纸';
      rotateBtn.dataset.stickerId = stickerId;
      rotateBtn.style.cssText = `
        position: absolute;
        left: ${stickerCenterX + actualWidth/2 + 20}px;
        top: ${stickerCenterY}px;
        transform: translate(-50%, -50%);
        opacity: ${isSelected ? '1' : '0'};
        z-index: ${sticker.zIndex + 10};
      `;
      
      // 旋转拖动状态
      let isRotating = false;
      let startAngle = 0;
      let startRotation = 0;
      
      const getAngleFromCenter = (clientX, clientY) => {
        const frameRect = posterFrame.getBoundingClientRect();
        const stickerCenterX = (sticker.x / 100) * frameRect.width;
        const stickerCenterY = (sticker.y / 100) * frameRect.height;
        const centerX = frameRect.left + stickerCenterX;
        const centerY = frameRect.top + stickerCenterY;
        
        return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
      };
      
      const startRotate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isRotating = true;
        const pos = e.touches ? e.touches[0] : e;
        startAngle = getAngleFromCenter(pos.clientX, pos.clientY);
        startRotation = sticker.rotation;
        document.body.style.cursor = 'move';
      };
      
      const doRotate = (e) => {
        if (!isRotating) return;
        e.preventDefault();
        
        // 获取最新的贴纸状态
        const currentSticker = this.stickers.find(s => s.id === stickerId);
        if (!currentSticker) return;
        
        const pos = e.touches ? e.touches[0] : e;
        const currentAngle = getAngleFromCenter(pos.clientX, pos.clientY);
        
        let deltaAngle = currentAngle - startAngle;
        
        if (currentSticker.mirror) {
          deltaAngle = -deltaAngle;
        }
        
        let rotation = startRotation + deltaAngle;
        
        if (rotation > 180) rotation -= 360;
        if (rotation < -180) rotation += 360;
        
        this.updateStickerRotation(stickerId, rotation);
        this.updateControlPositions(stickerId);
        
        startAngle = currentAngle;
        startRotation = rotation;
      };
      
      const endRotate = () => {
        isRotating = false;
        document.body.style.cursor = '';
      };
      
      rotateBtn.addEventListener('mousedown', startRotate);
      rotateBtn.addEventListener('touchstart', startRotate, { passive: false });
      document.addEventListener('mousemove', doRotate);
      document.addEventListener('touchmove', doRotate, { passive: false });
      document.addEventListener('mouseup', endRotate);
      document.addEventListener('touchend', endRotate);
      
      posterFrame.appendChild(rotateBtn);
      
      // 缩放控制点（四个角）
      const resizePositions = [
        { name: 'nw', offsetX: -1, offsetY: -1, tooltip: '左上缩放' },
        { name: 'ne', offsetX: 1, offsetY: -1, tooltip: '右上缩放' },
        { name: 'sw', offsetX: -1, offsetY: 1, tooltip: '左下缩放' },
        { name: 'se', offsetX: 1, offsetY: 1, tooltip: '右下缩放' }
      ];
      
      // 如果启用调色功能，移除左下角缩放控点（被调色按钮替代）
      const positionsToCreate = enableColorAdjustment 
        ? resizePositions.filter(pos => pos.name !== 'sw')
        : resizePositions;
      
      positionsToCreate.forEach(pos => {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = `sticker-control sticker-resize-handle ${pos.name}`;
        resizeHandle.title = pos.tooltip;
        resizeHandle.dataset.stickerId = stickerId;
        resizeHandle.dataset.position = pos.name;
        
        const handleX = stickerCenterX + pos.offsetX * (actualWidth / 2 + 10);
        const handleY = stickerCenterY + pos.offsetY * (actualHeight / 2 + 10);
        
        resizeHandle.style.cssText = `
          position: absolute;
          left: ${handleX}px;
          top: ${handleY}px;
          transform: translate(-50%, -50%);
          opacity: ${isSelected ? '1' : '0'};
          z-index: ${sticker.zIndex + 10};
        `;
        
        let isResizingHandle = false;
        let initialDistance = 0;
        let initialHandleScale = 0;
        
        const getDistanceFromCenter = (clientX, clientY) => {
          const frameRect = posterFrame.getBoundingClientRect();
          const centerX = frameRect.left + (sticker.x / 100) * frameRect.width;
          const centerY = frameRect.top + (sticker.y / 100) * frameRect.height;
          const dx = clientX - centerX;
          const dy = clientY - centerY;
          return Math.sqrt(dx * dx + dy * dy);
        };
        
        const startResize = (e) => {
          e.preventDefault();
          e.stopPropagation();
          isResizingHandle = true;
          const touchPos = e.touches ? e.touches[0] : e;
          initialDistance = getDistanceFromCenter(touchPos.clientX, touchPos.clientY);
          initialHandleScale = sticker.scale;
          document.body.style.cursor = 'move';
        };
        
        const doResize = (e) => {
          if (!isResizingHandle) return;
          e.preventDefault();
          
          const currentSticker = this.stickers.find(s => s.id === stickerId);
          if (!currentSticker) return;
          
          const touchPos = e.touches ? e.touches[0] : e;
          const currentDistance = getDistanceFromCenter(touchPos.clientX, touchPos.clientY);
          
          const scaleRatio = currentDistance / initialDistance;
          let newScale = initialHandleScale * scaleRatio;
          newScale = Math.max(0.2, Math.min(5, newScale));
          
          this.updateStickerScale(stickerId, newScale);
          const scaleX = currentSticker.mirror ? -1 : 1;
          const stickerEl = document.querySelector(`.sticker[data-sticker-id="${stickerId}"]`);
          if (stickerEl) {
            stickerEl.style.transform = `translate(-50%, -50%) scale(${newScale * scaleX}, ${newScale}) rotate(${currentSticker.rotation}deg)`;
          }
          this.updateControlPositions(stickerId);
        };
        
        const endResize = () => {
          isResizingHandle = false;
          document.body.style.cursor = '';
        };
        
        resizeHandle.addEventListener('mousedown', startResize);
        resizeHandle.addEventListener('touchstart', startResize, { passive: false });
        document.addEventListener('mousemove', doResize);
        document.addEventListener('touchmove', doResize, { passive: false });
        document.addEventListener('mouseup', endResize);
        document.addEventListener('touchend', endResize);
        
        posterFrame.appendChild(resizeHandle);
      });
      
      // 上移层级按钮（底部左侧，距离底边30px）
      const bringForwardBtn = document.createElement('button');
      bringForwardBtn.className = 'sticker-control sticker-bring-forward-btn';
      bringForwardBtn.innerHTML = '上移层';
      bringForwardBtn.title = '上移层级';
      bringForwardBtn.dataset.stickerId = stickerId;
      bringForwardBtn.style.cssText = `
        position: absolute;
        left: ${stickerCenterX - 30}px;
        top: ${stickerCenterY + actualHeight/2 + 30}px;
        transform: translate(-50%, -50%);
        opacity: ${isSelected ? '1' : '0'};
        z-index: ${sticker.zIndex + 10};
      `;
      bringForwardBtn.onclick = (e) => {
        e.stopPropagation();
        this.bringStickerForward(stickerId);
      };
      posterFrame.appendChild(bringForwardBtn);
      
      // 下移层级按钮（底部右侧，距离底边30px）
      const sendBackwardBtn = document.createElement('button');
      sendBackwardBtn.className = 'sticker-control sticker-send-backward-btn';
      sendBackwardBtn.innerHTML = '下移层';
      sendBackwardBtn.title = '下移层级';
      sendBackwardBtn.dataset.stickerId = stickerId;
      sendBackwardBtn.style.cssText = `
        position: absolute;
        left: ${stickerCenterX + 30}px;
        top: ${stickerCenterY + actualHeight/2 + 30}px;
        transform: translate(-50%, -50%);
        opacity: ${isSelected ? '1' : '0'};
        z-index: ${sticker.zIndex + 10};
      `;
      sendBackwardBtn.onclick = (e) => {
        e.stopPropagation();
        this.sendStickerBackward(stickerId);
      };
      posterFrame.appendChild(sendBackwardBtn);
      
      // 更新层级按钮状态
      this.updateLayerButtonStates(stickerId);
    },
    
    // 更新控件位置
    updateControlPositions: function(stickerId) {
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;
      
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (!sticker) return;
      
      const controls = posterFrame.querySelectorAll(`.sticker-control[data-sticker-id="${stickerId}"]`);
      if (controls.length === 0) return;
      
      const frameRect = posterFrame.getBoundingClientRect();
      const baseWidth = 1000;
      const scaleRatio = frameRect.width / baseWidth;
      
      const stickerCenterX = (sticker.x / 100) * frameRect.width;
      const stickerCenterY = (sticker.y / 100) * frameRect.height;
      
      // 使用与 createStickerControls 相同的计算方式
      // sticker.scale 已经包含了 scaleRatio
      const actualWidth = sticker.naturalWidth * sticker.scale;
      const actualHeight = sticker.naturalHeight * sticker.scale;
      const baseSize = Math.max(actualWidth, actualHeight);
      
      controls.forEach(control => {
        if (control.classList.contains('sticker-delete-btn')) {
          control.style.left = `${stickerCenterX}px`;
          control.style.top = `${stickerCenterY - actualHeight/2 - 20}px`;
        } else if (control.classList.contains('sticker-mirror-btn')) {
          control.style.left = `${stickerCenterX - actualWidth/2 - 20}px`;
          control.style.top = `${stickerCenterY}px`;
        } else if (control.classList.contains('sticker-rotate-btn')) {
          control.style.left = `${stickerCenterX + actualWidth/2 + 20}px`;
          control.style.top = `${stickerCenterY}px`;
        } else if (control.classList.contains('sticker-bring-forward-btn')) {
          control.style.left = `${stickerCenterX - 30}px`;
          control.style.top = `${stickerCenterY + actualHeight/2 + 30}px`;
        } else if (control.classList.contains('sticker-send-backward-btn')) {
          control.style.left = `${stickerCenterX + 30}px`;
          control.style.top = `${stickerCenterY + actualHeight/2 + 30}px`;
        } else if (control.classList.contains('sticker-color-btn')) {
          // 调色按钮：左下角，往左移动20px，往下移动20px
          control.style.left = `${stickerCenterX - actualWidth/2 - 20}px`;
          control.style.top = `${stickerCenterY + actualHeight/2 + 20}px`;
        } else if (control.classList.contains('sticker-resize-handle')) {
          const position = control.dataset.position;
          
          // 如果是左下角缩放控点，跳过（被调色按钮替代）
          if (position === 'sw') return;
          
          let offsetX = 0, offsetY = 0;
          
          if (position === 'nw') { offsetX = -1; offsetY = -1; }
          else if (position === 'ne') { offsetX = 1; offsetY = -1; }
          else if (position === 'se') { offsetX = 1; offsetY = 1; }
          
          const handleX = stickerCenterX + offsetX * (actualWidth / 2 + 10);
          const handleY = stickerCenterY + offsetY * (actualHeight / 2 + 10);
          control.style.left = `${handleX}px`;
          control.style.top = `${handleY}px`;
        }
        control.style.zIndex = sticker.zIndex + 10;
      });
    },
    
    // 应用贴纸颜色滤镜（使用 Canvas）
    applyStickerColorFilter: function(ctx, width, height, sticker) {
      // 保存当前状态
      ctx.save();
      
      // 1. 应用亮度和饱和度滤镜
      ctx.filter = `saturate(${sticker.saturation}) brightness(${sticker.brightness})`;
      
      // 2. 使用 source-in 模式进行颜色替换
      // 先绘制原始图片（已经完成）
      // 然后设置混合模式为 source-in
      ctx.globalCompositeOperation = 'source-in';
      
      // 填充颜色（只作用于已有像素区域）
      ctx.fillStyle = sticker.color;
      ctx.fillRect(0, 0, width, height);
      
      // 恢复状态
      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'none';
      
      ctx.restore();
    },
    
    // 更新贴纸视觉效果
    updateStickerVisual: function(stickerId) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (sticker) {
        const stickerEl = document.querySelector(`.sticker[data-sticker-id="${stickerId}"]`);
        if (stickerEl) {
          // 更新 transform（镜像和旋转）
          const scaleX = sticker.mirror ? -1 : 1;
          stickerEl.style.transform = `translate(-50%, -50%) scale(${sticker.scale * scaleX}, ${sticker.scale}) rotate(${sticker.rotation}deg)`;
          
          const canvas = stickerEl.querySelector('canvas');
          if (canvas) {
            // 重新渲染 Canvas
            const ctx = canvas.getContext('2d');
            
            // 重新加载图片并应用颜色滤镜
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = sticker.imageUrl;
            
            img.onload = () => {
              ctx.drawImage(img, 0, 0);
              this.applyStickerColorFilter(ctx, sticker.naturalWidth, sticker.naturalHeight, sticker);
            };
            
            // 更新 Canvas 的 CSS 尺寸（使用原始尺寸）
            const posterFrame = document.getElementById('posterFrame');
            if (posterFrame) {
              canvas.style.width = sticker.naturalWidth + 'px';
              canvas.style.height = sticker.naturalHeight + 'px';
            }
          }
        }
        this.updateControlPositions(stickerId);
      }
    },
    
    // 显示贴纸调色面板 UI
    showStickerColorPanelUI: function(sticker) {
      // 创建调色面板
      const panel = document.createElement('div');
      panel.className = 'sticker-color-panel';
      panel.dataset.stickerId = sticker.id;
      panel.innerHTML = `
        <div class="color-panel-header">
          <h3>贴纸调色</h3>
          <button class="color-panel-close">&times;</button>
        </div>
        <div class="color-panel-body">
          <!-- 预设颜色 -->
          <div class="color-preset">
            <span>预设颜色：</span>
            <div class="color-swatch-container"></div>
          </div>
          <!-- 亮度调节 -->
          <div class="color-brightness">
            <div class="color-control-label">
              <span>亮度</span>
              <span class="brightness-value">1.0</span>
            </div>
            <input type="range" class="brightness-slider" min="0.5" max="2" step="0.1" value="1">
          </div>
          <!-- 饱和度调节 -->
          <div class="color-saturation">
            <div class="color-control-label">
              <span>饱和度</span>
              <span class="saturation-value">1.0</span>
            </div>
            <input type="range" class="saturation-slider" min="0" max="2" step="0.1" value="1">
          </div>
        </div>
      `;

      // 添加到页面
      document.body.appendChild(panel);

      // 6秒无操作自动关闭
      let autoCloseTimer = setTimeout(() => {
        panel.remove();
      }, 6000);

      // 重置自动关闭计时器的函数
      const resetAutoCloseTimer = () => {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = setTimeout(() => {
          panel.remove();
        }, 6000);
      };

      // 绑定关闭事件
      const closeBtn = panel.querySelector('.color-panel-close');
      closeBtn.onclick = () => {
        clearTimeout(autoCloseTimer);
        panel.remove();
      };

      // 点击空白区域关闭
      document.addEventListener('click', function closeOnClick(e) {
        if (!panel.contains(e.target) && e.target !== closeBtn) {
          clearTimeout(autoCloseTimer);
          panel.remove();
          document.removeEventListener('click', closeOnClick);
        }
      });

      // 初始化颜色预设
      this.initColorPresets(panel, sticker, resetAutoCloseTimer);

      // 初始化亮度滑块
      this.initBrightnessSlider(panel, sticker, resetAutoCloseTimer);

      // 初始化饱和度滑块
      this.initSaturationSlider(panel, sticker, resetAutoCloseTimer);

      // 绑定贴纸移动事件，更新面板位置
      this.bindStickerMoveEventForPanel(panel, sticker.id);

      // 初始位置
      this.updateColorPanelPosition(panel, sticker);
    },
    
    // 绑定贴纸移动事件以更新面板位置
    bindStickerMoveEventForPanel: function(panel, stickerId) {
      const stickerEl = document.querySelector(`.sticker[data-sticker-id="${stickerId}"]`);
      if (!stickerEl) return;
      
      // 监听贴纸的 transform 变化
      const observer = new MutationObserver((mutations) => {
        const sticker = this.stickers.find(s => s.id === stickerId);
        if (sticker) {
          this.updateColorPanelPosition(panel, sticker);
        }
      });
      
      observer.observe(stickerEl, {
        attributes: true,
        attributeFilter: ['style']
      });
      
      // 保存 observer 引用以便后续清理
      panel.observer = observer;
    },
    
    // 更新面板位置
    updateColorPanelPosition: function(panel, sticker) {
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;

      const stickerEl = document.querySelector(`.sticker[data-sticker-id="${sticker.id}"]`);
      if (!stickerEl) return;

      const frameRect = posterFrame.getBoundingClientRect();
      const stickerRect = stickerEl.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();

      // 面板位置：贴纸底边下方5像素，水平居中
      const panelLeft = stickerRect.left + (stickerRect.width - panelRect.width) / 2;
      const panelTop = stickerRect.bottom + 5;

      panel.style.left = `${panelLeft}px`;
      panel.style.top = `${panelTop}px`;
    },
    
    // 初始化颜色预设
    initColorPresets: function(panel, sticker, resetAutoCloseTimer) {
      const colors = [
        { name: '黑色', value: '#000000' },
        { name: '白色', value: '#ffffff' },
        { name: '红色', value: '#c70808ff' },
        { name: '粉色', value: '#ff7c92ff' },
        { name: '橙色', value: '#ff7f00' },
        { name: '黄色', value: '#ffff00' },
        { name: '绿色', value: '#01a801ff' },
        { name: '青色', value: '#07daa5ff' },
        { name: '蓝色', value: '#1d1d77ff' },
        { name: '紫色', value: '#720bc7ff' }
      ];

      const container = panel.querySelector('.color-swatch-container');
      colors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color.value;
        swatch.title = color.name;
        if (color.value === sticker.color) {
          swatch.classList.add('active');
        }

        swatch.onclick = () => {
          resetAutoCloseTimer();
          sticker.color = color.value;
          this.updateStickerColor(sticker.id);
          container.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
        };

        container.appendChild(swatch);
      });
    },

    // 初始化亮度滑块
    initBrightnessSlider: function(panel, sticker, resetAutoCloseTimer) {
      const slider = panel.querySelector('.brightness-slider');
      const valueDisplay = panel.querySelector('.brightness-value');

      slider.value = sticker.brightness;
      valueDisplay.textContent = sticker.brightness.toFixed(1);

      slider.oninput = () => {
        resetAutoCloseTimer();
        sticker.brightness = parseFloat(slider.value);
        valueDisplay.textContent = sticker.brightness.toFixed(1);
        this.updateStickerColor(sticker.id);
      };
    },

    // 初始化饱和度滑块
    initSaturationSlider: function(panel, sticker, resetAutoCloseTimer) {
      const slider = panel.querySelector('.saturation-slider');
      const valueDisplay = panel.querySelector('.saturation-value');

      slider.value = sticker.saturation;
      valueDisplay.textContent = sticker.saturation.toFixed(1);

      slider.oninput = () => {
        resetAutoCloseTimer();
        sticker.saturation = parseFloat(slider.value);
        valueDisplay.textContent = sticker.saturation.toFixed(1);
        this.updateStickerColor(sticker.id);
      };
    },
    
    // 更新贴纸颜色
    updateStickerColor: function(stickerId) {
      const sticker = this.stickers.find(s => s.id === stickerId);
      if (sticker) {
        this.updateStickerVisual(stickerId);
      }
    },
    
    // 更新旋转角度显示
    updateStickerRotationDisplay: function(stickerId, rotation) {
      // 不再需要角度显示
    },
    
    // 绑定贴纸事件
    bindStickerEvents: function(stickerEl, stickerId) {
      // 点击选中贴纸
      stickerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectSticker(stickerId);
      });
      
      // 通用状态变量
      let isDragging = false;
      let isResizing = false;
      let startX, startY, initialX, initialY, initialScale;
      let initialTouchDistance = 0;
      
      // 获取触摸坐标
      const getTouchPos = (e) => {
        if (e.touches && e.touches.length > 0) {
          return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
      };
      
      // 获取两点之间的距离（用于双指缩放）
      const getTouchDistance = (e) => {
        if (e.touches && e.touches.length >= 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          return Math.sqrt(dx * dx + dy * dy);
        }
        return 0;
      };
      
      // 开始操作（鼠标/触摸）
      const startOperation = (e) => {
        // 检查是否点击了控件按钮
        if (e.target.classList.contains('sticker-delete-btn') ||
            e.target.classList.contains('sticker-mirror-btn') ||
            e.target.classList.contains('sticker-rotate-btn') ||
            e.target.classList.contains('sticker-control') ||
            e.target.classList.contains('sticker-resize-handle')) {
          return;
        }
        
        // 选中贴纸，显示控件
        this.selectSticker(stickerId);
        
        // 重置自动隐藏计时器
        this.resetAutoHideTimer();
        
        // 拖拽贴纸
        isDragging = true;
        const pos = getTouchPos(e);
        startX = pos.x;
        startY = pos.y;
        
        const sticker = this.stickers.find(s => s.id === stickerId);
        if (sticker) {
          initialX = sticker.x;
          initialY = sticker.y;
        }
        
        e.preventDefault();
      };
      
      // 移动操作（鼠标/触摸）
      const moveOperation = (e) => {
        if (isResizing) {
          // 只保留双指触摸缩放功能
          if (e.touches && e.touches.length === 2) {
            // 重置自动隐藏计时器
            this.resetAutoHideTimer();
            
            const currentDistance = getTouchDistance(e);
            if (initialTouchDistance > 0) {
              const delta = (currentDistance - initialTouchDistance) / 200;
              const sticker = this.stickers.find(s => s.id === stickerId);
              if (sticker) {
                sticker.scale = Math.max(0.2, initialScale + delta);
                this.updateStickerScale(stickerId, sticker.scale);
                const scaleX = sticker.mirror ? -1 : 1;
                stickerEl.style.transform = `translate(-50%, -50%) scale(${sticker.scale * scaleX}, ${sticker.scale}) rotate(${sticker.rotation}deg)`;
                this.updateControlPositions(stickerId);
              }
            }
            initialTouchDistance = currentDistance;
            
            e.stopPropagation();
            e.preventDefault();
            return;
          }
        }
        
        if (!isDragging) return;
        
        // 重置自动隐藏计时器
        this.resetAutoHideTimer();
        
        const pos = getTouchPos(e);
        const deltaX = (pos.x - startX) / (document.getElementById('posterFrame').offsetWidth / 100);
        const deltaY = (pos.y - startY) / (document.getElementById('posterFrame').offsetHeight / 100);
        
        const sticker = this.stickers.find(s => s.id === stickerId);
        if (sticker) {
          sticker.x = initialX + deltaX;
          sticker.y = initialY + deltaY;
          this.updateStickerPosition(stickerId, sticker.x, sticker.y);
          
          stickerEl.style.left = sticker.x + '%';
          stickerEl.style.top = sticker.y + '%';
          
          // 更新控件位置
          this.updateControlPositions(stickerId);
        }
      };
      
      // 结束操作（鼠标/触摸）
      const endOperation = () => {
        isDragging = false;
        isResizing = false;
        initialTouchDistance = 0;
      };
      
      // 鼠标事件
      stickerEl.addEventListener('mousedown', startOperation);
      document.addEventListener('mousemove', moveOperation);
      document.addEventListener('mouseup', endOperation);
      
      // 触摸事件
      stickerEl.addEventListener('touchstart', (e) => {
        // 检查是否点击了删除按钮
        if (e.target.classList.contains('sticker-delete-btn')) {
          return;
        }
        
        // 触摸时先选中贴纸，显示删除按钮
        this.selectSticker(stickerId);
        
        if (e.touches.length === 2) {
          // 双指触摸，直接进入缩放模式
          isResizing = true;
          initialTouchDistance = getTouchDistance(e);
          const sticker = this.stickers.find(s => s.id === stickerId);
          if (sticker) {
            initialScale = sticker.scale;
          }
          this.resetAutoHideTimer();
        } else {
          // 单指触摸
          startOperation(e);
        }
      }, { passive: false });
      
      document.addEventListener('touchmove', moveOperation, { passive: false });
      
      document.addEventListener('touchend', endOperation);
      document.addEventListener('touchcancel', endOperation);
    }
  };
  
  // 贴纸资源管理
  window.stickerResources = {
    categories: {
      zaoan: {
        name: '早安',
        stickers: [
          { id: 'zaoan-1', name: '太阳', url: 'sticker/zaoan/1.png' },
          { id: 'zaoan-2', name: '咖啡', url: 'sticker/zaoan/2.png' },
          { id: 'zaoan-3', name: '花朵', url: 'sticker/zaoan/3.png' },
          { id: 'zaoan-4', name: '星星', url: 'sticker/zaoan/4.png' },
          { id: 'zaoan-5', name: '爱心', url: 'sticker/zaoan/5.png' },
          { id: 'zaoan-6', name: '笑脸', url: 'sticker/zaoan/6.png' },
          { id: 'zaoan-7', name: '云朵', url: 'sticker/zaoan/7.png' },
          { id: 'zaoan-8', name: '彩虹', url: 'sticker/zaoan/8.png' },
          { id: 'zaoan-9', name: '月亮', url: 'sticker/zaoan/9.png' },
          { id: 'zaoan-10', name: '星星', url: 'sticker/zaoan/10.png' }
         
        ]
      },
      wanan: {
        name: '晚安',
        stickers: [
          { id: 'wanan-1', name: '月亮', url: 'sticker/wanan/1.png' },
          { id: 'wanan-2', name: '星星', url: 'sticker/wanan/2.png' },
          { id: 'wanan-3', name: '睡眠', url: 'sticker/wanan/3.png' },
          { id: 'wanan-4', name: '梦境', url: 'sticker/wanan/4.png' },
          { id: 'wanan-5', name: '晚安', url: 'sticker/wanan/5.png' },
          { id: 'wanan-6', name: '云朵', url: 'sticker/wanan/6.png' },
          { id: 'wanan-7', name: '枕头', url: 'sticker/wanan/7.png' },
          { id: 'wanan-8', name: '星空', url: 'sticker/wanan/8.png' },
          { id: 'wanan-9', name: '晚安', url: 'sticker/wanan/9.png' },
          { id: 'wanan-10', name: '月亮', url: 'sticker/wanan/10.png' }
        ]
      },
      girl: {
        name: '女生',
        stickers: [
          { id: 'girl-1', name: '女生1', url: 'sticker/girl/1.png' },
          { id: 'girl-2', name: '女生2', url: 'sticker/girl/2.png' },
          { id: 'girl-3', name: '女生3', url: 'sticker/girl/3.png' },
          { id: 'girl-4', name: '女生4', url: 'sticker/girl/4.png' },
          { id: 'girl-5', name: '女生5', url: 'sticker/girl/5.png' },
          { id: 'girl-6', name: '女生6', url: 'sticker/girl/6.png' },
          { id: 'girl-7', name: '女生7', url: 'sticker/girl/7.png' },
          { id: 'girl-8', name: '女生8', url: 'sticker/girl/8.png' },
          { id: 'girl-9', name: '女生9', url: 'sticker/girl/9.png' },
          { id: 'girl-10', name: '女生10', url: 'sticker/girl/10.png' },
          { id: 'girl-11', name: '女生11', url: 'sticker/girl/11.png' },
          { id: 'girl-12', name: '女生12', url: 'sticker/girl/12.png' },
          { id: 'girl-13', name: '女生13', url: 'sticker/girl/13.png' },
          { id: 'girl-14', name: '女生14', url: 'sticker/girl/14.png' },
          { id: 'girl-15', name: '女生15', url: 'sticker/girl/15.png' },
          { id: 'girl-16', name: '女生16', url: 'sticker/girl/16.png' },
          { id: 'girl-17', name: '女生17', url: 'sticker/girl/17.png' },
          { id: 'girl-18', name: '女生18', url: 'sticker/girl/18.png' },
          { id: 'girl-19', name: '女生19', url: 'sticker/girl/19.png' },
          { id: 'girl-20', name: '女生20', url: 'sticker/girl/20.png' },
          { id: 'girl-21', name: '女生21', url: 'sticker/girl/21.png' },
          { id: 'girl-22', name: '女生22', url: 'sticker/girl/22.png' },
          { id: 'girl-23', name: '女生23', url: 'sticker/girl/23.png' },
          { id: 'girl-24', name: '女生24', url: 'sticker/girl/24.png' },
          { id: 'girl-25', name: '女生25', url: 'sticker/girl/25.png' },
          { id: 'girl-26', name: '女生26', url: 'sticker/girl/26.png' },
          { id: 'girl-27', name: '女生27', url: 'sticker/girl/27.png' },
          { id: 'girl-28', name: '女生28', url: 'sticker/girl/28.png' },
          { id: 'girl-29', name: '女生29', url: 'sticker/girl/29.png' },
          { id: 'girl-30', name: '女生30', url: 'sticker/girl/30.png' },
          { id: 'girl-31', name: '女生31', url: 'sticker/girl/31.png' },
          { id: 'girl-32', name: '女生32', url: 'sticker/girl/32.png' },
          { id: 'girl-33', name: '女生33', url: 'sticker/girl/33.png' },
          { id: 'girl-34', name: '女生34', url: 'sticker/girl/34.png' }
        ]
      },
      boy: {
        name: '男生',
        stickers: [
          { id: 'boy-1', name: '男生1', url: 'sticker/boy/1.png' },
          { id: 'boy-2', name: '男生2', url: 'sticker/boy/2.png' },
          { id: 'boy-3', name: '男生3', url: 'sticker/boy/3.png' },
          { id: 'boy-4', name: '男生4', url: 'sticker/boy/4.png' },
          { id: 'boy-5', name: '男生5', url: 'sticker/boy/5.png' },
          { id: 'boy-6', name: '男生6', url: 'sticker/boy/6.png' },
          { id: 'boy-7', name: '男生7', url: 'sticker/boy/7.png' },
          { id: 'boy-8', name: '男生8', url: 'sticker/boy/8.png' },
          { id: 'boy-9', name: '男生9', url: 'sticker/boy/9.png' },
          { id: 'boy-10', name: '男生10', url: 'sticker/boy/10.png' },
          { id: 'boy-11', name: '男生11', url: 'sticker/boy/11.png' },
          { id: 'boy-12', name: '男生12', url: 'sticker/boy/12.png' },
          { id: 'boy-13', name: '男生13', url: 'sticker/boy/13.png' },
          { id: 'boy-14', name: '男生14', url: 'sticker/boy/14.png' },
          { id: 'boy-15', name: '男生15', url: 'sticker/boy/15.png' },
          { id: 'boy-16', name: '男生16', url: 'sticker/boy/16.png' },
          { id: 'boy-17', name: '男生17', url: 'sticker/boy/17.png' },
          { id: 'boy-18', name: '男生18', url: 'sticker/boy/18.png' },
          { id: 'boy-19', name: '男生19', url: 'sticker/boy/19.png' },
          { id: 'boy-20', name: '男生20', url: 'sticker/boy/20.png' },
          { id: 'boy-21', name: '男生21', url: 'sticker/boy/21.png' }
        ]
      },
      kids: {
        name: '萌娃',
        stickers: [
          { id: 'kids-1', name: '萌娃1', url: 'sticker/kids/1.png' },
          { id: 'kids-2', name: '萌娃2', url: 'sticker/kids/2.png' },
          { id: 'kids-3', name: '萌娃3', url: 'sticker/kids/3.png' },
          { id: 'kids-4', name: '萌娃4', url: 'sticker/kids/4.png' },
          { id: 'kids-5', name: '萌娃5', url: 'sticker/kids/5.png' },
          { id: 'kids-6', name: '萌娃6', url: 'sticker/kids/6.png' },
          { id: 'kids-7', name: '萌娃7', url: 'sticker/kids/7.png' },
          { id: 'kids-8', name: '萌娃8', url: 'sticker/kids/8.png' },
          { id: 'kids-9', name: '萌娃9', url: 'sticker/kids/9.png' },
          { id: 'kids-10', name: '萌娃10', url: 'sticker/kids/10.png' },
          { id: 'kids-11', name: '萌娃11', url: 'sticker/kids/11.png' },
          { id: 'kids-12', name: '萌娃12', url: 'sticker/kids/12.png' },
          { id: 'kids-13', name: '萌娃13', url: 'sticker/kids/13.png' },
          { id: 'kids-14', name: '萌娃14', url: 'sticker/kids/14.png' },
          { id: 'kids-15', name: '萌娃15', url: 'sticker/kids/15.png' },
          { id: 'kids-16', name: '萌娃16', url: 'sticker/kids/16.png' },
          { id: 'kids-17', name: '萌娃17', url: 'sticker/kids/17.png' },
          { id: 'kids-18', name: '萌娃18', url: 'sticker/kids/18.png' },
          { id: 'kids-19', name: '萌娃19', url: 'sticker/kids/19.png' },
          { id: 'kids-20', name: '萌娃20', url: 'sticker/kids/20.png' },
          { id: 'kids-21', name: '萌娃21', url: 'sticker/kids/21.png' },
          { id: 'kids-22', name: '萌娃22', url: 'sticker/kids/22.png' },
          { id: 'kids-23', name: '萌娃23', url: 'sticker/kids/23.png' },
          { id: 'kids-24', name: '萌娃24', url: 'sticker/kids/24.png' },
          { id: 'kids-25', name: '萌娃25', url: 'sticker/kids/25.png' },
          { id: 'kids-26', name: '萌娃26', url: 'sticker/kids/26.png' },
          { id: 'kids-27', name: '萌娃27', url: 'sticker/kids/27.png' },
          { id: 'kids-28', name: '萌娃28', url: 'sticker/kids/28.png' },
          { id: 'kids-29', name: '萌娃29', url: 'sticker/kids/29.png' },
          { id: 'kids-30', name: '萌娃30', url: 'sticker/kids/30.png' },
          { id: 'kids-31', name: '萌娃31', url: 'sticker/kids/31.png' },
          { id: 'kids-32', name: '萌娃32', url: 'sticker/kids/32.png' }
        ]
      },
      fighting: {
        name: '鼓励',
        stickers: [
          { id: 'fighting-1', name: '鼓励1', url: 'sticker/fighting/1.png' },
          { id: 'fighting-2', name: '鼓励2', url: 'sticker/fighting/2.png' },
          { id: 'fighting-3', name: '鼓励3', url: 'sticker/fighting/3.png' },
          { id: 'fighting-4', name: '鼓励4', url: 'sticker/fighting/4.png' },
          { id: 'fighting-5', name: '鼓励5', url: 'sticker/fighting/5.png' },
          { id: 'fighting-6', name: '鼓励6', url: 'sticker/fighting/6.png' },
          { id: 'fighting-7', name: '鼓励7', url: 'sticker/fighting/7.png' },
          { id: 'fighting-8', name: '鼓励8', url: 'sticker/fighting/8.png' },
          { id: 'fighting-9', name: '鼓励9', url: 'sticker/fighting/9.png' },
          { id: 'fighting-10', name: '鼓励10', url: 'sticker/fighting/10.png' },
          { id: 'fighting-11', name: '鼓励11', url: 'sticker/fighting/11.png' },
          { id: 'fighting-12', name: '鼓励12', url: 'sticker/fighting/12.png' },
          { id: 'fighting-13', name: '鼓励13', url: 'sticker/fighting/13.png' },
          { id: 'fighting-14', name: '鼓励14', url: 'sticker/fighting/14.png' },
          { id: 'fighting-15', name: '鼓励15', url: 'sticker/fighting/15.png' },
          { id: 'fighting-16', name: '鼓励16', url: 'sticker/fighting/16.png' },
          { id: 'fighting-17', name: '鼓励17', url: 'sticker/fighting/17.png' },
          { id: 'fighting-18', name: '鼓励18', url: 'sticker/fighting/18.png' },
          { id: 'fighting-19', name: '鼓励19', url: 'sticker/fighting/19.png' },
          { id: 'fighting-20', name: '鼓励20', url: 'sticker/fighting/20.png' },
          { id: 'fighting-21', name: '鼓励21', url: 'sticker/fighting/21.png' },
          { id: 'fighting-22', name: '鼓励22', url: 'sticker/fighting/22.png' },
          { id: 'fighting-23', name: '鼓励23', url: 'sticker/fighting/23.png' },
          { id: 'fighting-24', name: '鼓励24', url: 'sticker/fighting/24.png' },
          { id: 'fighting-25', name: '鼓励25', url: 'sticker/fighting/25.png' }
        ]
      },
      life: {
        name: '正能量',
        stickers: [
          { id: 'life-1', name: '正能量1', url: 'sticker/life/1.png' },
          { id: 'life-2', name: '正能量2', url: 'sticker/life/2.png' },
          { id: 'life-3', name: '正能量3', url: 'sticker/life/3.png' },
          { id: 'life-4', name: '正能量4', url: 'sticker/life/4.png' },
          { id: 'life-5', name: '正能量5', url: 'sticker/life/5.png' },
          { id: 'life-6', name: '正能量6', url: 'sticker/life/6.png' },
          { id: 'life-7', name: '正能量7', url: 'sticker/life/7.png' },
          { id: 'life-8', name: '正能量8', url: 'sticker/life/8.png' },
          { id: 'life-9', name: '正能量9', url: 'sticker/life/9.png' },
          { id: 'life-10', name: '正能量10', url: 'sticker/life/10.png' },
          { id: 'life-11', name: '正能量11', url: 'sticker/life/11.png' },
          { id: 'life-12', name: '正能量12', url: 'sticker/life/12.png' },
          { id: 'life-13', name: '正能量13', url: 'sticker/life/13.png' },
          { id: 'life-14', name: '正能量14', url: 'sticker/life/14.png' },
          { id: 'life-15', name: '正能量15', url: 'sticker/life/15.png' },
          { id: 'life-16', name: '正能量16', url: 'sticker/life/16.png' },
          { id: 'life-17', name: '正能量17', url: 'sticker/life/17.png' },
          { id: 'life-18', name: '正能量18', url: 'sticker/life/18.png' },
          { id: 'life-19', name: '正能量19', url: 'sticker/life/19.png' },
          { id: 'life-20', name: '正能量20', url: 'sticker/life/20.png' },
          { id: 'life-21', name: '正能量21', url: 'sticker/life/21.png' }
        ]
      },
      flowers: {
        name: '鲜花',
        stickers: [
          { id: 'flowers-1', name: '鲜花1', url: 'sticker/flowers/1.png' },
          { id: 'flowers-2', name: '鲜花2', url: 'sticker/flowers/2.png' },
          { id: 'flowers-3', name: '鲜花3', url: 'sticker/flowers/3.png' },
          { id: 'flowers-4', name: '鲜花4', url: 'sticker/flowers/4.png' },
          { id: 'flowers-5', name: '鲜花5', url: 'sticker/flowers/5.png' },
          { id: 'flowers-6', name: '鲜花6', url: 'sticker/flowers/6.png' },
          { id: 'flowers-7', name: '鲜花7', url: 'sticker/flowers/7.png' },
          { id: 'flowers-8', name: '鲜花8', url: 'sticker/flowers/8.png' },
          { id: 'flowers-9', name: '鲜花9', url: 'sticker/flowers/9.png' },
          { id: 'flowers-10', name: '鲜花10', url: 'sticker/flowers/10.png' },
          { id: 'flowers-11', name: '鲜花11', url: 'sticker/flowers/11.png' },
          { id: 'flowers-12', name: '鲜花12', url: 'sticker/flowers/12.png' },
          { id: 'flowers-13', name: '鲜花13', url: 'sticker/flowers/13.png' },
          { id: 'flowers-14', name: '鲜花14', url: 'sticker/flowers/14.png' },
          { id: 'flowers-15', name: '鲜花15', url: 'sticker/flowers/15.png' },
          { id: 'flowers-16', name: '鲜花16', url: 'sticker/flowers/16.png' },
          { id: 'flowers-17', name: '鲜花17', url: 'sticker/flowers/17.png' },
          { id: 'flowers-18', name: '鲜花18', url: 'sticker/flowers/18.png' },
          { id: 'flowers-19', name: '鲜花19', url: 'sticker/flowers/19.png' },
          { id: 'flowers-20', name: '鲜花20', url: 'sticker/flowers/20.png' },
          { id: 'flowers-21', name: '鲜花21', url: 'sticker/flowers/21.png' },
          { id: 'flowers-22', name: '鲜花22', url: 'sticker/flowers/22.png' },
          { id: 'flowers-23', name: '鲜花23', url: 'sticker/flowers/23.png' },
          { id: 'flowers-24', name: '鲜花24', url: 'sticker/flowers/24.png' },
          { id: 'flowers-25', name: '鲜花25', url: 'sticker/flowers/25.png' },
          { id: 'flowers-26', name: '鲜花26', url: 'sticker/flowers/26.png' },
          { id: 'flowers-27', name: '鲜花27', url: 'sticker/flowers/27.png' },
          { id: 'flowers-28', name: '鲜花28', url: 'sticker/flowers/28.png' },
          { id: 'flowers-29', name: '鲜花29', url: 'sticker/flowers/29.png' },
          { id: 'flowers-30', name: '鲜花30', url: 'sticker/flowers/30.png' },
          { id: 'flowers-31', name: '鲜花31', url: 'sticker/flowers/31.png' },
          { id: 'flowers-32', name: '鲜花32', url: 'sticker/flowers/32.png' },
          { id: 'flowers-33', name: '鲜花33', url: 'sticker/flowers/33.png' },
          { id: 'flowers-34', name: '鲜花34', url: 'sticker/flowers/34.png' },
          { id: 'flowers-35', name: '鲜花35', url: 'sticker/flowers/35.png' },
          { id: 'flowers-36', name: '鲜花36', url: 'sticker/flowers/36.png' },
          { id: 'flowers-37', name: '鲜花37', url: 'sticker/flowers/37.png' },
          { id: 'flowers-38', name: '鲜花38', url: 'sticker/flowers/38.png' },
          { id: 'flowers-39', name: '鲜花39', url: 'sticker/flowers/39.png' }
        ]
      },

      delicious: {
        name: '好吃',
        stickers: [
          { id: 'delicious-1', name: '好吃1', url: 'sticker/delicious/1.png' },
          { id: 'delicious-2', name: '好吃2', url: 'sticker/delicious/2.png' },
          { id: 'delicious-3', name: '好吃3', url: 'sticker/delicious/3.png' },
          { id: 'delicious-4', name: '好吃4', url: 'sticker/delicious/4.png' },
          { id: 'delicious-5', name: '好吃5', url: 'sticker/delicious/5.png' },
          { id: 'delicious-6', name: '好吃6', url: 'sticker/delicious/6.png' },
          { id: 'delicious-7', name: '好吃7', url: 'sticker/delicious/7.png' },
          { id: 'delicious-8', name: '好吃8', url: 'sticker/delicious/8.png' },
          { id: 'delicious-9', name: '好吃9', url: 'sticker/delicious/9.png' },
          { id: 'delicious-10', name: '好吃10', url: 'sticker/delicious/10.png' },
          { id: 'delicious-11', name: '好吃11', url: 'sticker/delicious/11.png' },
          { id: 'delicious-12', name: '好吃12', url: 'sticker/delicious/12.png' },
          { id: 'delicious-13', name: '好吃13', url: 'sticker/delicious/13.png' },
          { id: 'delicious-14', name: '好吃14', url: 'sticker/delicious/14.png' },
          { id: 'delicious-15', name: '好吃15', url: 'sticker/delicious/15.png' },
          { id: 'delicious-16', name: '好吃16', url: 'sticker/delicious/16.png' },
          { id: 'delicious-17', name: '好吃17', url: 'sticker/delicious/17.png' },
          { id: 'delicious-18', name: '好吃18', url: 'sticker/delicious/18.png' },
          { id: 'delicious-19', name: '好吃19', url: 'sticker/delicious/19.png' },
          { id: 'delicious-20', name: '好吃20', url: 'sticker/delicious/20.png' },
          { id: 'delicious-21', name: '好吃21', url: 'sticker/delicious/21.png' },
          { id: 'delicious-22', name: '好吃22', url: 'sticker/delicious/22.png' },
          { id: 'delicious-23', name: '好吃23', url: 'sticker/delicious/23.png' },
          { id: 'delicious-24', name: '好吃24', url: 'sticker/delicious/24.png' },
          { id: 'delicious-25', name: '好吃25', url: 'sticker/delicious/25.png' },
          { id: 'delicious-26', name: '好吃26', url: 'sticker/delicious/26.png' },
          { id: 'delicious-27', name: '好吃27', url: 'sticker/delicious/27.png' },
          { id: 'delicious-28', name: '好吃28', url: 'sticker/delicious/28.png' },
          { id: 'delicious-29', name: '好吃29', url: 'sticker/delicious/29.png' },
          { id: 'delicious-30', name: '好吃30', url: 'sticker/delicious/30.png' },
          { id: 'delicious-31', name: '好吃31', url: 'sticker/delicious/31.png' },
          { id: 'delicious-32', name: '好吃32', url: 'sticker/delicious/32.png' },
          { id: 'delicious-33', name: '好吃33', url: 'sticker/delicious/33.png' },
          { id: 'delicious-34', name: '好吃34', url: 'sticker/delicious/34.png' },
          { id: 'delicious-35', name: '好吃35', url: 'sticker/delicious/35.png' },
          { id: 'delicious-36', name: '好吃36', url: 'sticker/delicious/36.png' },
          { id: 'delicious-37', name: '好吃37', url: 'sticker/delicious/37.png' },
          { id: 'delicious-38', name: '好吃38', url: 'sticker/delicious/38.png' },
          { id: 'delicious-39', name: '好吃39', url: 'sticker/delicious/39.png' },
          { id: 'delicious-40', name: '好吃40', url: 'sticker/delicious/40.png' },
          { id: 'delicious-41', name: '好吃41', url: 'sticker/delicious/41.png' },
          { id: 'delicious-42', name: '好吃42', url: 'sticker/delicious/42.png' },
          { id: 'delicious-43', name: '好吃43', url: 'sticker/delicious/43.png' },
          { id: 'delicious-44', name: '好吃44', url: 'sticker/delicious/44.png' },
          { id: 'delicious-45', name: '好吃45', url: 'sticker/delicious/45.png' }
        ]
      },
      nice: {
        name: '好看',
        stickers: [
          { id: 'nice-1', name: '好看1', url: 'sticker/nice/1.png' },
          { id: 'nice-2', name: '好看2', url: 'sticker/nice/2.png' },
          { id: 'nice-3', name: '好看3', url: 'sticker/nice/3.png' },
          { id: 'nice-4', name: '好看4', url: 'sticker/nice/4.png' },
          { id: 'nice-5', name: '好看5', url: 'sticker/nice/5.png' },
          { id: 'nice-6', name: '好看6', url: 'sticker/nice/6.png' },
          { id: 'nice-7', name: '好看7', url: 'sticker/nice/7.png' },
          { id: 'nice-8', name: '好看8', url: 'sticker/nice/8.png' },
          { id: 'nice-9', name: '好看9', url: 'sticker/nice/9.png' },
          { id: 'nice-10', name: '好看10', url: 'sticker/nice/10.png' },
          { id: 'nice-11', name: '好看11', url: 'sticker/nice/11.png' },
          { id: 'nice-12', name: '好看12', url: 'sticker/nice/12.png' },
          { id: 'nice-13', name: '好看13', url: 'sticker/nice/13.png' },
          { id: 'nice-14', name: '好看14', url: 'sticker/nice/14.png' },
          { id: 'nice-15', name: '好看15', url: 'sticker/nice/15.png' },
          { id: 'nice-16', name: '好看16', url: 'sticker/nice/16.png' },
          { id: 'nice-17', name: '好看17', url: 'sticker/nice/17.png' },
          { id: 'nice-18', name: '好看18', url: 'sticker/nice/18.png' }
        ]
      }
    },
    
    loadedImages: {},
    
    // 获取贴纸图片URL
    getStickerUrl: function(stickerId) {
      return this.loadedImages[stickerId] || 'sticker/placeholder.png';
    }
  };
  
  // 贴纸弹窗管理
  window.stickerModalManager = {
    currentCategory: 'zaoan',
    isScrolling: false,
    
    init: function() {
      this.bindEvents();
    },
    
    bindEvents: function() {
      // 打开贴纸弹窗
      const stickerBtn = document.getElementById('stickerBtn');
      if (stickerBtn) {
        stickerBtn.addEventListener('click', () => {
          this.openModal();
        });
      }
      
      // 关闭贴纸弹窗
      const closeBtn = document.getElementById('closeStickerModalBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.closeModal();
        });
      }
      
      // 关闭弹窗的其他方式
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !document.getElementById('stickerModal').classList.contains('hidden')) {
          this.closeModal();
        }
      });
      
      document.getElementById('stickerModal').addEventListener('click', (e) => {
        if (e.target.id === 'stickerModal') {
          this.closeModal();
        }
      });
      
      // 分类切换
      document.querySelectorAll('.sticker-category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          document.querySelectorAll('.sticker-category-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const category = btn.dataset.category;
          if (category) {
            this.currentCategory = category;
            this.loadStickers(category);
          }
        });
      });
      
      // 初始化分类标签的阻尼滑动效果
      this.initializeCategoryScroll();
    },
    
    // 初始化分类标签的阻尼滑动效果
    initializeCategoryScroll: function() {
      const tabsContainer = document.querySelector('.sticker-category-tabs');
      if (!tabsContainer) return;
      
      let startY = 0;
      let startScrollTop = 0;
      let velocity = 0;
      let lastY = 0;
      let lastTime = 0;
      
      // 鼠标滚轮事件
      tabsContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const deltaY = e.deltaY;
        const currentTime = performance.now();
        const timeDelta = currentTime - lastTime;
        
        // 计算速度
        if (timeDelta > 0) {
          velocity = (deltaY - lastY) / timeDelta;
        }
        
        lastY = deltaY;
        lastTime = currentTime;
        
        // 应用滚动
        tabsContainer.scrollTop += deltaY * 1.2; // 增加滚动速度
        
        // 开始阻尼效果
        if (!this.isScrolling) {
          this.isScrolling = true;
          this.applyDamping(tabsContainer, velocity);
        }
      });
      
      // 触摸事件
      tabsContainer.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startScrollTop = tabsContainer.scrollTop;
        velocity = 0;
        lastY = startY;
        lastTime = performance.now();
        this.isScrolling = false;
      });
      
      tabsContainer.addEventListener('touchmove', (e) => {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        const currentTime = performance.now();
        const timeDelta = currentTime - lastTime;
        
        // 计算速度
        if (timeDelta > 0) {
          velocity = (deltaY - lastY) / timeDelta;
        }
        
        lastY = deltaY;
        lastTime = currentTime;
        
        // 应用滚动
        tabsContainer.scrollTop = startScrollTop - deltaY;
        
        // 开始阻尼效果
        if (!this.isScrolling) {
          this.isScrolling = true;
        }
      });
      
      tabsContainer.addEventListener('touchend', () => {
        if (this.isScrolling) {
          this.applyDamping(tabsContainer, velocity);
        }
      });
    },
    
    // 应用阻尼效果
    applyDamping: function(container, initialVelocity) {
      let velocity = initialVelocity * 0.1; // 调整速度系数
      let startTime = performance.now();
      
      const self = this;
      
      function animate() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        
        // 计算阻尼系数（随时间增加）
        const damping = Math.min(0.1 + (elapsedTime / 1000), 0.5);
        
        // 应用阻尼减速
        velocity *= (1 - damping);
        
        if (Math.abs(velocity) > 0.1) {
          container.scrollTop += velocity;
          requestAnimationFrame(animate);
        } else {
          // 滑动结束
          self.isScrolling = false;
        }
      }
      
      animate();
    },
    
    openModal: function() {
      const modal = document.getElementById('stickerModal');
      const selectionArea = document.getElementById('stickerSelectionArea');
      const previewArea = document.getElementById('stickerPreviewArea');
      
      modal.classList.remove('hidden');
      
      if (selectionArea) selectionArea.classList.remove('hidden');
      if (previewArea) previewArea.classList.add('hidden');
      
      this.loadStickers(this.currentCategory);
    },
    
    closeModal: function() {
      const modal = document.getElementById('stickerModal');
      const selectionArea = document.getElementById('stickerSelectionArea');
      const previewArea = document.getElementById('stickerPreviewArea');
      
      modal.classList.add('hidden');
      
      if (selectionArea) selectionArea.classList.remove('hidden');
      if (previewArea) previewArea.classList.add('hidden');
    },
    
    loadStickers: function(category) {
      const grid = document.getElementById('stickerGrid');
      if (!grid) return;
      
      grid.innerHTML = '';
      
      const stickers = window.stickerResources.categories[category].stickers;
      this.currentStickers = stickers;
      this.currentCategory = category;
      
      stickers.forEach((sticker, index) => {
        const card = document.createElement('div');
        card.className = 'sticker-card';
        card.dataset.stickerId = sticker.id;
        card.dataset.stickerIndex = index;
        
        const img = document.createElement('img');
        img.src = sticker.url + '?' + new Date().getTime();
        img.alt = sticker.name;
        
        const loader = document.createElement('div');
        loader.className = 'sticker-loader';
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        loader.appendChild(spinner);
        card.appendChild(loader);
        
        let loadTimeout;
        const clearLoadTimeout = function() {
          if (loadTimeout) {
            clearTimeout(loadTimeout);
            loadTimeout = null;
          }
        };
        
        img.onload = function() {
          clearLoadTimeout();
          loader.classList.add('hidden');
        };
        
        img.onerror = function() {
          clearLoadTimeout();
          loader.classList.add('hidden');
          this.src = 'sticker/placeholder.png';
        };
        
        loadTimeout = setTimeout(function() {
          loader.classList.add('hidden');
          loadTimeout = null;
        }, 5000);
        
        const name = document.createElement('div');
        name.className = 'sticker-name';
        name.textContent = sticker.name;
        
        card.appendChild(img);
        card.appendChild(name);
        
        const addBtn = document.createElement('button');
        addBtn.className = 'add-sticker-btn';
        addBtn.textContent = '查看';
        addBtn.onclick = (e) => {
          e.stopPropagation();
          this.openStickerPreview(index);
        };
        
        card.appendChild(addBtn);
        
        card.addEventListener('click', (e) => {
          if (e.target !== addBtn) {
            this.addStickerToPoster(sticker.url, this.currentCategory);
            this.closeModal();
          }
        });
        
        grid.appendChild(card);
      });
    },
    
    openStickerPreview: function(startIndex) {
      this.currentPreviewIndex = startIndex;
      
      const previewArea = document.getElementById('stickerPreviewArea');
      const container = document.getElementById('galleryContainer');
      const categoryTitle = document.getElementById('stickerCategoryTitle');
      
      if (container) {
        const newContainer = container.cloneNode(true);
        container.parentNode.replaceChild(newContainer, container);
      }
      
      if (previewArea) {
        previewArea.classList.remove('hidden');
        previewArea.classList.add('active');
      }
      
      if (categoryTitle && this.currentCategory && window.stickerResources.categories[this.currentCategory]) {
        categoryTitle.textContent = window.stickerResources.categories[this.currentCategory].name;
      }
      
      this.initGallery();
      this.bindPreviewEvents();
    },
    
    initGallery: function() {
      const container = document.getElementById('galleryContainer');
      const nameDisplay = document.getElementById('stickerPreviewName');
      
      if (!container || !this.currentStickers) return;
      
      container.innerHTML = '';
      
      const stickers = this.currentStickers;
      
      stickers.forEach((sticker, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = sticker.url + '?' + new Date().getTime();
        img.alt = sticker.name;
        slide.appendChild(img);
        
        container.appendChild(slide);
      });
      
      this.updateGalleryPositions();
      
      if (nameDisplay && stickers[this.currentPreviewIndex]) {
        nameDisplay.textContent = stickers[this.currentPreviewIndex].name;
      }
    },
    
    updateGalleryPositions: function() {
      const container = document.getElementById('galleryContainer');
      const nameDisplay = document.getElementById('stickerPreviewName');
      
      if (!container || !this.currentStickers) return;
      
      const slides = container.querySelectorAll('.gallery-slide');
      const currentIdx = this.currentPreviewIndex;
      
      slides.forEach((slide, index) => {
        slide.classList.remove('prev', 'current', 'next', 'hidden-slide');
        slide.style.transition = '';
        slide.style.transform = '';
        slide.style.opacity = '';
        slide.style.zIndex = '';
        
        const diff = index - currentIdx;
        
        if (diff === -1) {
          slide.classList.add('prev');
        } else if (diff === 0) {
          slide.classList.add('current');
          if (nameDisplay && this.currentStickers[index]) {
            nameDisplay.textContent = this.currentStickers[index].name;
          }
        } else if (diff === 1) {
          slide.classList.add('next');
        } else {
          slide.classList.add('hidden-slide');
        }
      });
    },
    
    bindPreviewEvents: function() {
      const prevBtn = document.getElementById('prevSticker');
      const nextBtn = document.getElementById('nextSticker');
      const addBtn = document.getElementById('addStickerToPoster');
      const backBtn = document.getElementById('backToStickerGrid');
      
      if (prevBtn) {
        prevBtn.onclick = () => this.navigateSticker(-1);
      }
      
      if (nextBtn) {
        nextBtn.onclick = () => this.navigateSticker(1);
      }
      
      if (addBtn) {
        addBtn.onclick = () => {
          if (this.currentStickers && this.currentStickers[this.currentPreviewIndex]) {
            this.addStickerToPoster(this.currentStickers[this.currentPreviewIndex].url, this.currentCategory);
            this.closeModal();
          }
        };
      }
      
      if (backBtn) {
        backBtn.onclick = () => this.backToSelection();
      }
      
      const container = document.getElementById('galleryContainer');
      if (container) {
        let touchStartX = 0;
        
        container.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          
          if (Math.abs(diff) > 50) {
            if (diff > 0) {
              this.navigateSticker(1);
            } else {
              this.navigateSticker(-1);
            }
          }
        }, { passive: true });
        
        container.addEventListener('click', (e) => {
          const slide = e.target.closest('.gallery-slide');
          if (slide) {
            const index = parseInt(slide.dataset.index);
            if (this.currentStickers && this.currentStickers[index]) {
              this.addStickerToPoster(this.currentStickers[index].url, this.currentCategory);
              this.closeModal();
            }
          }
        });
      }
    },
    
    navigateSticker: function(direction) {
      if (!this.currentStickers) return;
      
      const newIndex = this.currentPreviewIndex + direction;
      
      if (newIndex >= 0 && newIndex < this.currentStickers.length) {
        this.currentPreviewIndex = newIndex;
        this.updateGalleryPositions();
      }
    },
    
    backToSelection: function() {
      const previewArea = document.getElementById('stickerPreviewArea');
      
      if (previewArea) {
        previewArea.classList.remove('active');
        setTimeout(() => {
          previewArea.classList.add('hidden');
        }, 300);
      }
    },
    
    addStickerToPoster: function(imageUrl, category) {
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;
      
      const frameRect = posterFrame.getBoundingClientRect();
      const baseWidth = 1000;
      const scaleRatio = frameRect.width / baseWidth;
      
      const randomX = 45 + Math.random() * 10;
      const randomY = 45 + Math.random() * 10;
      
      const img = new Image();
      img.onload = () => {
        window.stickerManager.addSticker(imageUrl, randomX, randomY, scaleRatio, img.naturalWidth, img.naturalHeight, category);
      };
      img.src = imageUrl;
    }
  };
  
  // 更新贴纸按钮显示状态
  function updateStickerButtonVisibility() {
    const stickerBtn = document.getElementById('stickerBtn');
    const frameBtn = document.getElementById('frameBtn');
    const textTemplateBtn = document.getElementById('textTemplateBtn');
    
    if (textTemplateBtn) {
      textTemplateBtn.classList.remove('hidden');
    }
    
    if (!stickerBtn) return;
    
    if (state.customBackground) {
      stickerBtn.classList.remove('hidden');
      stickerBtn.classList.add('neon-glow');
      if (frameBtn) {
        frameBtn.classList.remove('hidden');
        frameBtn.classList.add('neon-glow');
      }
    } else {
      stickerBtn.classList.add('hidden');
      stickerBtn.classList.remove('neon-glow');
      if (frameBtn) {
        frameBtn.classList.add('hidden');
        frameBtn.classList.remove('neon-glow');
      }
    }
  }

  // 画框管理功能
  window.FrameManager = {
    frameImages: [],
    currentIndex: 0,
    scrollUnit: 100,

    init: function() {
      this.loadFrameImages();
      this.loadColorAdjustFromStorage();
      this.bindEvents();
    },

    loadFrameImages: function() {
      const basePath = 'sticker/cover/';
      for (let i = 1; i <= 43; i++) {
        this.frameImages.push({
          id: i,
          src: basePath + i + '.png'
        });
      }
    },

    bindEvents: function() {
      const frameBtn = document.getElementById('frameBtn');
      const closeBtn = document.getElementById('closeFrameModalBtn');
      const prevBtn = document.getElementById('framePrevBtn');
      const nextBtn = document.getElementById('frameNextBtn');
      const confirmBtn = document.getElementById('frameConfirmBtn');
      const cancelBtn = document.getElementById('frameCancelBtn');
      const frameModal = document.getElementById('frameModal');

      if (frameBtn) {
        frameBtn.addEventListener('click', () => {
          this.openFrameModal();
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.cancelFrame();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          this.scrollFrames(-1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.scrollFrames(1);
        });
      }

      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          this.confirmFrame();
        });
      }

      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          this.closeFrameModal();
        });
      }

      const clearBtn = document.getElementById('frameClearBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.clearFrame();
        });
      }

      if (frameModal) {
        frameModal.addEventListener('click', (e) => {
          if (e.target === frameModal) {
            this.cancelFrame();
          }
        });
      }

      // 绑定调色滑杆事件
      this.bindColorAdjustEvents();
    },

    bindColorAdjustEvents: function() {
      const hueSlider = document.getElementById('frameHue');
      const saturationSlider = document.getElementById('frameSaturation');
      const contrastSlider = document.getElementById('frameContrast');
      const hueResetBtn = document.getElementById('frameHueResetBtn');
      const saturationResetBtn = document.getElementById('frameSaturationResetBtn');
      const contrastResetBtn = document.getElementById('frameContrastResetBtn');

      if (hueSlider) {
        hueSlider.addEventListener('input', (e) => {
          state.pendingFrameColorAdjust.hue = parseInt(e.target.value);
          this.updatePreview();
          this.updateResetButtons();
        });
      }

      if (saturationSlider) {
        saturationSlider.addEventListener('input', (e) => {
          state.pendingFrameColorAdjust.saturation = parseInt(e.target.value);
          this.updatePreview();
          this.updateResetButtons();
        });
      }

      if (contrastSlider) {
        contrastSlider.addEventListener('input', (e) => {
          state.pendingFrameColorAdjust.contrast = parseInt(e.target.value);
          this.updatePreview();
          this.updateResetButtons();
        });
      }

      if (hueResetBtn) {
        hueResetBtn.addEventListener('click', () => {
          this.resetSingleColor('hue');
        });
      }

      if (saturationResetBtn) {
        saturationResetBtn.addEventListener('click', () => {
          this.resetSingleColor('saturation');
        });
      }

      if (contrastResetBtn) {
        contrastResetBtn.addEventListener('click', () => {
          this.resetSingleColor('contrast');
        });
      }
    },

    updateResetButtons: function() {
      const { hue, saturation, contrast } = state.pendingFrameColorAdjust;
      
      const hueResetBtn = document.getElementById('frameHueResetBtn');
      const saturationResetBtn = document.getElementById('frameSaturationResetBtn');
      const contrastResetBtn = document.getElementById('frameContrastResetBtn');
      
      if (hueResetBtn) {
        hueResetBtn.disabled = hue === 0;
      }
      if (saturationResetBtn) {
        saturationResetBtn.disabled = saturation === 0;
      }
      if (contrastResetBtn) {
        contrastResetBtn.disabled = contrast === 0;
      }
    },

    resetSingleColor: function(type) {
      state.pendingFrameColorAdjust[type] = 0;
      
      const slider = document.getElementById('frame' + type.charAt(0).toUpperCase() + type.slice(1));
      if (slider) {
        slider.value = 0;
      }
      
      this.updatePreview();
      this.updateResetButtons();
    },

    resetColorAdjust: function() {
      state.pendingFrameColorAdjust = { hue: 0, saturation: 0, contrast: 0 };
      
      const hueSlider = document.getElementById('frameHue');
      const saturationSlider = document.getElementById('frameSaturation');
      const contrastSlider = document.getElementById('frameContrast');
      
      if (hueSlider) hueSlider.value = 0;
      if (saturationSlider) saturationSlider.value = 0;
      if (contrastSlider) contrastSlider.value = 0;
      
      this.updatePreview();
      this.updateResetButtons();
    },

    showColorAdjustPanel: function() {
      const panel = document.getElementById('frameColorAdjust');
      if (panel) {
        panel.classList.remove('hidden');
      }
    },

    hideColorAdjustPanel: function() {
      const panel = document.getElementById('frameColorAdjust');
      if (panel) {
        panel.classList.add('hidden');
      }
    },

    loadColorAdjustValues: function() {
      const adjust = state.pendingFrameColorAdjust;
      
      const hueSlider = document.getElementById('frameHue');
      const saturationSlider = document.getElementById('frameSaturation');
      const contrastSlider = document.getElementById('frameContrast');
      
      if (hueSlider) {
        hueSlider.value = adjust.hue;
      }
      if (saturationSlider) {
        saturationSlider.value = adjust.saturation;
      }
      if (contrastSlider) {
        contrastSlider.value = adjust.contrast;
      }
      
      this.updateResetButtons();
    },

    openFrameModal: function() {
      state.pendingFrame = state.currentFrame;
      state.pendingFrameColorAdjust = { ...state.frameColorAdjust };
      elements.frameModal.classList.remove('hidden');
      setTimeout(() => {
        this.renderFrameList();
        if (state.currentFrame) {
          const index = this.frameImages.findIndex(f => f.id === state.currentFrame.id);
          if (index >= 0) {
            this.scrollToIndex(index);
          }
          this.showColorAdjustPanel();
          this.loadColorAdjustValues();
        } else {
          this.hideColorAdjustPanel();
        }
      }, 150);
    },

    closeFrameModal: function() {
      elements.frameModal.classList.add('hidden');
      state.pendingFrame = null;
      this.hideColorAdjustPanel();
    },

    renderFrameList: function() {
      const frameList = document.getElementById('frameList');
      if (!frameList) return;

      frameList.innerHTML = '';

      this.frameImages.forEach((frame, index) => {
        const item = document.createElement('div');
        item.className = 'frame-item';
        if (state.pendingFrame && state.pendingFrame.id === frame.id) {
          item.classList.add('selected');
        }
        item.dataset.index = index;

        const img = document.createElement('img');
        img.src = frame.src;
        img.alt = '画框' + frame.id;
        img.loading = 'lazy';

        item.appendChild(img);
        item.addEventListener('click', () => {
          this.selectFrame(index);
        });

        frameList.appendChild(item);
      });

      setTimeout(() => {
        this.updateNavButtons();
      }, 500);

      frameList.addEventListener('scroll', () => {
        this.updateNavButtons();
      });
    },

    selectFrame: function(index) {
      document.querySelectorAll('.frame-item').forEach(item => {
        item.classList.remove('selected');
      });

      const selectedItem = document.querySelector(`.frame-item[data-index="${index}"]`);
      if (selectedItem) {
        selectedItem.classList.add('selected');
      }

      state.pendingFrame = this.frameImages[index];
      this.scrollToIndex(index);
      this.showColorAdjustPanel();
      this.resetColorAdjust();
      this.updatePreview(true);
    },

    updatePreview: function(animate = false) {
      if (state.pendingFrame) {
        this.renderFrameToPreview(state.pendingFrame, animate);
      } else {
        this.removeFrameFromPreview();
      }
    },

    scrollFrames: function(direction) {
      const frameList = document.getElementById('frameList');
      if (!frameList) return;

      let currentIndex = 0;
      if (state.pendingFrame) {
        currentIndex = this.frameImages.findIndex(f => f.id === state.pendingFrame.id);
      }

      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= this.frameImages.length) newIndex = this.frameImages.length - 1;

      this.selectFrame(newIndex);
      this.scrollToIndex(newIndex);
    },

    scrollToIndex: function(index) {
      const frameList = document.getElementById('frameList');
      if (!frameList) return;

      const itemWidth = 41;
      const gap = 12;
      const containerWidth = frameList.clientWidth;
      const scaledWidth = itemWidth;
      const itemPosition = index * (itemWidth + gap) + itemWidth / 2;
      const scrollLeft = itemPosition - containerWidth / 2;

      const targetScrollLeft = Math.max(0, scrollLeft);
      frameList.style.scrollBehavior = 'smooth';
      frameList.scrollLeft = targetScrollLeft;

      setTimeout(() => {
        this.updateNavButtons();
      }, 350);
    },

    updateNavButtons: function() {
      const frameList = document.getElementById('frameList');
      const prevBtn = document.getElementById('framePrevBtn');
      const nextBtn = document.getElementById('frameNextBtn');

      if (!frameList || !prevBtn || !nextBtn) return;

      const scrollLeft = frameList.scrollLeft;
      const itemCount = this.frameImages.length;
      const itemWidth = 80;
      const gap = 12;
      const totalWidth = itemCount * (itemWidth + gap);
      const clientWidth = frameList.clientWidth;
      const scrollWidth = frameList.scrollWidth;

      console.log('updateNavButtons:', {
        scrollLeft,
        itemCount,
        totalWidth,
        clientWidth,
        scrollWidth,
        disabled: totalWidth <= clientWidth
      });

      if (totalWidth <= clientWidth) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
      } else {
        prevBtn.disabled = scrollLeft <= 0;
        nextBtn.disabled = scrollLeft >= totalWidth - clientWidth;
      }
    },

    confirmFrame: function() {
      state.currentFrame = state.pendingFrame;
      state.frameColorAdjust = { ...state.pendingFrameColorAdjust };
      if (state.currentFrame) {
        this.renderFrameToPreview(state.currentFrame);
        this.saveColorAdjustToStorage();
      }
      this.closeFrameModal();
    },

    cancelFrame: function() {
      state.pendingFrame = null;
      state.pendingFrameColorAdjust = { ...state.frameColorAdjust };
      if (state.currentFrame) {
        this.renderFrameToPreview(state.currentFrame);
      } else {
        this.removeFrameFromPreview();
      }
      this.closeFrameModal();
    },

    clearFrame: function() {
      state.pendingFrame = null;
      state.currentFrame = null;
      state.frameColorAdjust = { hue: 0, saturation: 0, contrast: 0 };
      state.pendingFrameColorAdjust = { hue: 0, saturation: 0, contrast: 0 };
      this.removeFrameFromPreview();
      this.renderFrameList();
      this.hideColorAdjustPanel();
      this.saveColorAdjustToStorage();
    },

    renderFrameToPreview: function(frame, animate = false) {
      let frameElement = document.getElementById('posterFrameCover');

      if (!frameElement) {
        frameElement = document.createElement('div');
        frameElement.id = 'posterFrameCover';
        frameElement.style.cssText = `
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          pointer-events: none;
          z-index: 5;
        `;
        elements.posterFrame.appendChild(frameElement);
      }

      const img = document.createElement('img');
      img.src = frame.src;
      img.style.cssText = `
        width: 100%;
        height: auto;
        display: block;
      `;

      // 应用调色效果
      const adjust = state.pendingFrame ? state.pendingFrameColorAdjust : state.frameColorAdjust;
      const filterStyle = this.buildFilterStyle(adjust);
      img.style.filter = filterStyle;

      // 只有在选择新画框时才应用下落动画
      if (animate) {
        img.style.animation = 'frame-drop-jelly 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
      }

      frameElement.innerHTML = '';
      frameElement.appendChild(img);
    },

    buildFilterStyle: function(adjust) {
      const { hue, saturation, contrast } = adjust;
      
      // 色相旋转: hue-rotate()
      // 饱和度: saturate() - 基础值100%，调整范围0-200%
      // 对比度: contrast() - 基础值100%，调整范围0-200%
      
      const hueRotate = hue;
      const saturate = 100 + saturation;
      const contrastValue = 100 + contrast;
      
      return `hue-rotate(${hueRotate}deg) saturate(${saturate}%) contrast(${contrastValue}%)`;
    },

    saveColorAdjustToStorage: function() {
      try {
        const adjust = state.frameColorAdjust;
        localStorage.setItem('frameColorAdjust', JSON.stringify(adjust));
      } catch (e) {
        console.error('保存画框调色参数失败:', e);
      }
    },

    loadColorAdjustFromStorage: function() {
      try {
        const saved = localStorage.getItem('frameColorAdjust');
        if (saved) {
          const adjust = JSON.parse(saved);
          state.frameColorAdjust = {
            hue: adjust.hue || 0,
            saturation: adjust.saturation || 0,
            contrast: adjust.contrast || 0
          };
          state.pendingFrameColorAdjust = { ...state.frameColorAdjust };
        }
      } catch (e) {
        console.error('加载画框调色参数失败:', e);
      }
    },

    removeFrameFromPreview: function() {
      const frameElement = document.getElementById('posterFrameCover');
      if (frameElement) {
        frameElement.remove();
      }
    },

    updateFrameVisibility: function() {
      const frameElement = document.getElementById('posterFrameCover');
      if (frameElement) {
        if (state.customBackground) {
          frameElement.style.display = 'block';
        } else {
          frameElement.style.display = 'none';
        }
      }
    }
  };
  
  // 字体管理器
window.fontManager = {
  fonts: {
    'Microsoft YaHei': { name: '微软雅黑', loaded: false },
    'SimSun': { name: '宋体', loaded: false },
    'KaiTi': { name: '楷体', loaded: false }
  },

  checkFontLoaded: function(fontFamily) {
    if (this.fonts[fontFamily] && this.fonts[fontFamily].loaded) {
      return true;
    }
    const testString = '中文测试字体';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '72px sans-serif';
    const baseWidth = ctx.measureText(testString).width;
    ctx.font = `72px "${fontFamily}", sans-serif`;
    const testWidth = ctx.measureText(testString).width;
    if (baseWidth !== testWidth) {
      this.fonts[fontFamily].loaded = true;
      return true;
    }
    ctx.font = `72px "${fontFamily}"`;
    const testWidth2 = ctx.measureText(testString).width;
    if (baseWidth !== testWidth2) {
      this.fonts[fontFamily].loaded = true;
      return true;
    }
    return false;
  },

  isFontAvailable: function(fontFamily) {
    if (this.fonts[fontFamily] && this.fonts[fontFamily].loaded) {
      return true;
    }
    return this.checkFontLoaded(fontFamily);
  },

  useFont: function(fontFamily) {
    if (this.isFontAvailable(fontFamily)) {
      return fontFamily;
    }
    const fallbackFonts = ['Microsoft YaHei', 'SimSun', 'KaiTi', 'PingFang SC', 'STHeiti'];
    for (const font of fallbackFonts) {
      if (this.isFontAvailable(font)) {
        return font;
      }
    }
    return 'sans-serif';
  },

  getAvailableFonts: function() {
    const available = [];
    for (const [key, font] of Object.entries(this.fonts)) {
      if (this.isFontAvailable(key)) {
        available.push({ value: key, name: font.name });
      }
    }
    if (available.length === 0) {
      available.push({ value: 'sans-serif', name: '默认字体' });
    }
    return available;
  }
};
  
  // 文案模板管理器
window.textTemplateManager = {
    selectedTemplate: null,
    currentCategory: '早安',
    lastCategory: null,
    lastTemplateIndex: null,

  init: function() {
    this.loadLastPosition();
    this.bindEvents();
    this.renderCategories();
    this.renderTemplates(this.currentCategory);
  },

  loadLastPosition: function() {
    try {
      const saved = localStorage.getItem('textTemplateLastPosition');
      if (saved) {
        const position = JSON.parse(saved);
        if (position.category && window.TextTemplates.getAllCategories().includes(position.category)) {
          this.currentCategory = position.category;
          this.lastCategory = position.category;
          this.lastTemplateIndex = position.index !== undefined ? position.index : null;
        }
      }
    } catch (e) {
      console.error('恢复文案模板位置失败:', e);
      this.currentCategory = '早安';
      this.lastCategory = '早安';
      this.lastTemplateIndex = null;
    }
  },

  saveLastPosition: function() {
    try {
      const position = {
        category: this.currentCategory,
        index: this.lastTemplateIndex
      };
      localStorage.setItem('textTemplateLastPosition', JSON.stringify(position));
    } catch (e) {
      console.error('保存文案模板位置失败:', e);
    }
  },

  openModal: function() {
    const modal = document.getElementById('textTemplateModal');
    const loadingEl = document.getElementById('textTemplateLoading');

    // 检查文案模板数据是否已加载
    if (!window.textTemplatesDataLoaded) {
      // 显示弹窗和加载动画
      if (modal) {
        modal.classList.remove('hidden');
      }
      if (loadingEl) {
        loadingEl.style.display = 'flex';
      }

      // 加载数据
      if (window.loadTextTemplatesData) {
        window.loadTextTemplatesData();
      }

      // 监听数据加载完成
      const checkDataLoaded = setInterval(() => {
        if (window.textTemplatesDataLoaded) {
          clearInterval(checkDataLoaded);

          // 隐藏加载动画
          if (loadingEl) {
            loadingEl.style.display = 'none';
          }

          // 刷新内容
          this.renderCategories();
          this.renderTemplates(this.currentCategory);

          if (this.lastTemplateIndex !== null) {
            const templateCards = document.querySelectorAll('#textTemplateList .industry-template-card');
            if (templateCards[this.lastTemplateIndex]) {
              templateCards[this.lastTemplateIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
      }, 100);

      // 超时保护：5秒后如果还没加载完成，显示错误提示
      setTimeout(() => {
        if (!window.textTemplatesDataLoaded) {
          clearInterval(checkDataLoaded);
          if (loadingEl) {
            loadingEl.innerHTML = `
              <div style="text-align: center; color: #ef4444;">
                ${window.getSVGIcon ? window.getSVGIcon('exclamation-triangle', 'svg-icon', {'font-size': '48px', 'margin-bottom': '16px'}) : '<i class="fa fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px;"></i>'}
                <div style="font-size: 16px;">加载失败，请关闭弹窗重试</div>
              </div>
            `;
            // 替换Font Awesome图标为SVG图标
            if (typeof replaceFAIcons === 'function') replaceFAIcons()
          }
        }
      }, 5000);

      return;
    }

    // 数据已加载，直接显示内容
    if (modal) {
      modal.classList.remove('hidden');
      this.renderCategories();
      this.renderTemplates(this.currentCategory);

      if (this.lastTemplateIndex !== null) {
        const templateCards = document.querySelectorAll('#textTemplateList .industry-template-card');
        if (templateCards[this.lastTemplateIndex]) {
          templateCards[this.lastTemplateIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  },

  bindEvents: function() {
    const textTemplateBtn = document.getElementById('textTemplateBtn');
    if (textTemplateBtn) {
      textTemplateBtn.addEventListener('click', () => {
        this.openModal();
      });
    }

    const closeBtn = document.getElementById('closeTextTemplateModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    const insertBtn = document.getElementById('insertTextToCanvasBtn');
    if (insertBtn) {
      insertBtn.addEventListener('click', () => this.insertToCanvas());
    }

    const copyBtn = document.getElementById('copyTextOnlyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyTextOnly());
    }

    const modal = document.getElementById('textTemplateModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
  },

  closeModal: function() {
    const modal = document.getElementById('textTemplateModal');
    if (modal) {
      modal.classList.add('hidden');
    }
    this.selectedTemplate = null;
    this.saveLastPosition();
    this.clearSelection();
  },

  renderCategories: function() {
    const container = document.getElementById('textTemplateCategoriesVertical');
    if (!container || !window.TextTemplates) return;

    const categories = window.TextTemplates.getAllCategories();
    container.innerHTML = categories.map(cat => {
      const icon = this.getCategoryIcon(cat);
      const isActive = cat === this.currentCategory ? 'active' : '';
      return `<button class="industry-category-vertical ${isActive}" data-category="${cat}" title="${cat}">${icon} ${cat}</button>`;
    }).join('');

    container.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.category;
        this.lastCategory = this.currentCategory;
        this.lastTemplateIndex = null;
        this.renderTemplates(this.currentCategory);
      });
    });
  },

  getCategoryIcon: function(category) {
    const icons = {
      // 行业分类
      '通用': '🌟', '奶茶': '🧋', '餐厅': '🍽️', '绘画班': '🎨',
      '音乐课': '🎵', '直播': '📱', '美容': '💄', '母婴': '👶',
      '健身': '💪', '茶饮': '🧋', '宠物': '🐱', '服饰': '👗',
      '知识': '📚', '家居': '🏠', '数码': '📱', '旅游': '✈️', '旅行': '🎒',
      '店铺': '🏪', '美食': '🍜', '中餐': '🥢', '海鲜': '🦐',
      '烧烤': '🍖', '甜点': '🧁', '美术课': '🎨', '体育课': '🏃',
      '游学': '🎒', '穿搭': '👗', '带货': '🛒',
      // 情感分类
      '情感': '💕', '人生感悟': '🌿', '励志奋斗': '🔥', '时代理想': '🌟',
      '早安': '☀️', '晚安': '🌙', '治愈': '🌸', '励志': '💪',
      '共鸣': '💭', '哲理': '🧠', '日常': '🌻', '自拍': '📸',
      '夜晚': '🌃', '幽默感': '🎭', '乐观': '😊', '独处': '🧘',
      // 二十四节气 - 春季
      '立春': '🌱', '雨水': '💧', '惊蛰': '⚡', '春分': '🌸',
      '清明': '🌿', '谷雨': '🌾',
      // 二十四节气 - 夏季
      '立夏': '☀️', '小满': '🌾', '芒种': '🌾', '夏至': '🌞',
      '小暑': '🔥', '大暑': '🔥',
      // 二十四节气 - 秋季
      '立秋': '🍂', '处暑': '🍂', '白露': '🌫️', '秋分': '🍁',
      '寒露': '🍂', '霜降': '❄️',
      // 二十四节气 - 冬季
      '立冬': '🧥', '小雪': '❄️', '大雪': '❄️', '冬至': '🎄',
      '小寒': '🥶', '大寒': '🥶'
    };
    return icons[category] || '';
  },

  renderTemplates: function(category) {
    const container = document.getElementById('textTemplateList');
    if (!container || !window.TextTemplates) return;

    const templates = window.TextTemplates.getTemplatesByCategory(category);
    container.innerHTML = templates.map((template, index) => {
      const displayText = template.length > 50 ? template.substring(0, 50) + '...' : template;
      return `<div class="industry-template-card" data-index="${index}">
        <div class="industry-template-content">${displayText.replace(/\n/g, '<br>')}</div>
        <div class="template-card-actions">
          <button class="card-insert-btn" data-index="${index}">+</button>
          <button class="card-copy-btn" data-index="${index}">复制</button>
        </div>
      </div>`;
    }).join('');

    container.querySelectorAll('.card-insert-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.index);
        const templates = window.TextTemplates.getTemplatesByCategory(this.currentCategory);
        this.selectedTemplate = templates[index];
        this.lastTemplateIndex = index;
        this.saveLastPosition();
        this.insertToCanvas();
      });
    });

    container.querySelectorAll('.card-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.index);
        const templates = window.TextTemplates.getTemplatesByCategory(this.currentCategory);
        this.selectedTemplate = templates[index];
        this.lastTemplateIndex = index;
        this.saveLastPosition();
        this.copyTextOnly();
      });
    });

    // 双击模板卡片也可以插入画布
    container.querySelectorAll('.industry-template-card').forEach(card => {
      card.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const index = parseInt(card.dataset.index);
        const templates = window.TextTemplates.getTemplatesByCategory(this.currentCategory);
        this.selectedTemplate = templates[index];
        this.lastTemplateIndex = index;
        this.saveLastPosition();
        this.insertToCanvas();
      });
    });
  },

  escapeHtml: function(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  },

  selectTemplate: function(card, index) {
    this.clearSelection();
    card.classList.add('selected');
    const templates = window.TextTemplates.getTemplatesByCategory(this.currentCategory);
    this.selectedTemplate = templates[index];
  },

  clearSelection: function() {
    document.querySelectorAll('#textTemplateList .industry-template-card').forEach(card => {
      card.classList.remove('selected');
    });
  },

  copyTextOnly: function() {
    if (!this.selectedTemplate) {
      return;
    }
    copyToClipboard(this.selectedTemplate);
  },

  insertToCanvas: function() {
    if (!this.selectedTemplate) {
      return;
    }

    const posterFrame = document.getElementById('posterFrame');
    if (!posterFrame) return;

    const frameRect = posterFrame.getBoundingClientRect();
    const baseWidth = 1000;
    const scaleRatio = frameRect.width / baseWidth;

    const textId = 'text_' + Date.now();
    const randomX = 50;
    const randomY = 50;

    const textElement = {
      id: textId,
      text: this.selectedTemplate,
      x: randomX,
      y: randomY,
      scale: 1,
      rotation: 0,
      color: '#000000',
      fontFamily: window.fontManager ? window.fontManager.useFont('Microsoft YaHei') : 'sans-serif',
      fontSize: 10,
      writingMode: 'vertical-rl',
      textAlign: 'top',
      width: 80,
      zIndex: window.stickerManager ? window.stickerManager.stickers.length + 100 : 100
    };

    if (!window.textElements) {
      window.textElements = [];
    }
    window.textElements.push(textElement);

    this.renderTextElements();
    this.closeModal();

    // 插入后自动选中文字元素，显示控件和虚线框
    setTimeout(() => {
      this.selectTextElement(textId);
    }, 100);
  },

  renderTextElements: function() {
    if (!window.textElements) return;

    const posterFrame = document.getElementById('posterFrame');
    if (!posterFrame) return;

    posterFrame.querySelectorAll('.canvas-text').forEach(el => el.remove());

    window.textElements.forEach(text => {
      this.createTextElement(text);
    });
  },

  createTextElement: function(text) {
    const posterFrame = document.getElementById('posterFrame');
    if (!posterFrame) return;

    const textEl = document.createElement('div');
    textEl.className = 'canvas-text';
    textEl.id = text.id;
    textEl.dataset.textId = text.id;

    const frameRect = posterFrame.getBoundingClientRect();
    const scaleRatio = frameRect.width / 1000;

    // 竖排模式下，使用 text-align 的 start/center/end 实现垂直对齐
    // 横排模式下，使用 text-align 的 left/center/right 实现水平对齐
    let effectiveTextAlign = text.textAlign;
    if (text.writingMode === 'vertical-rl') {
      if (text.textAlign === 'top') {
        effectiveTextAlign = 'start';
      } else if (text.textAlign === 'center') {
        effectiveTextAlign = 'center';
      } else if (text.textAlign === 'bottom') {
        effectiveTextAlign = 'end';
      }
    }

    textEl.style.cssText = `
      left: ${text.x}%;
      top: ${text.y}%;
      transform: translate(-50%, -50%) scale(${text.scale}) rotate(${text.rotation}deg);
      writing-mode: ${text.writingMode};
      color: ${text.color};
      font-family: ${text.fontFamily};
      font-size: ${text.fontSize}px;
      text-align: ${effectiveTextAlign};
      z-index: ${text.zIndex};
      ${text.writingMode === 'vertical-rl' ? 'width: 80px;' : (text.width ? `width: ${text.width}px;` : '')}
    `;

    textEl.textContent = text.text;

    // 双击检测变量
    let lastClickTime = 0;
    const DOUBLE_CLICK_DELAY = 300;

    textEl.addEventListener('click', (e) => {
      e.stopPropagation();

      const currentTime = Date.now();
      if (currentTime - lastClickTime < DOUBLE_CLICK_DELAY) {
        // 双击切换设置面板
        const panel = document.getElementById('textSettingsPanel');
        if (panel && panel.style.display !== 'none') {
          // 面板已打开，关闭它
          panel.style.display = 'none';
        } else {
          // 面板未打开，打开它
          this.selectTextElement(text.id);
          this.showTextSettingsPanel(text.id);
        }
        lastClickTime = 0;
      } else {
        // 单击选中文字
        this.selectTextElement(text.id);
        lastClickTime = currentTime;
      }
    });

    let isDragging = false;
    let startX, startY, initialX, initialY;
    let hasMoved = false;

    textEl.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('text-control') || e.target.classList.contains('text-delete-btn') || e.target.classList.contains('text-settings-btn') || e.target.classList.contains('text-rotate-btn')) {
        return;
      }
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      initialX = text.x;
      initialY = text.y;
      this.selectTextElement(text.id);
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      hasMoved = true;
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;
      const frameRect = posterFrame.getBoundingClientRect();
      const deltaX = (e.clientX - startX) / frameRect.width * 100;
      const deltaY = (e.clientY - startY) / frameRect.height * 100;
      text.x = initialX + deltaX;
      text.y = initialY + deltaY;
      textEl.style.left = `${text.x}%`;
      textEl.style.top = `${text.y}%`;
      this.updateTextControlPositions(text.id);
      this.updateToolbarPosition(text.id);
      this.updateSettingsPanelPosition(text.id);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      hasMoved = false;
    });

    textEl.addEventListener('touchstart', (e) => {
      if (e.target.classList.contains('text-control') || e.target.classList.contains('text-delete-btn') || e.target.classList.contains('text-settings-btn') || e.target.classList.contains('text-rotate-btn')) {
        return;
      }
      if (e.touches.length === 1) {
        isDragging = true;
        hasMoved = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        initialX = text.x;
        initialY = text.y;
        this.selectTextElement(text.id);
        e.preventDefault();
      }
    }, { passive: false });

    // 移动端双击检测变量
    let lastTapTime = 0;
    const DOUBLE_TAP_DELAY = 300;

    document.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      hasMoved = true;
      const posterFrame = document.getElementById('posterFrame');
      if (!posterFrame) return;
      const frameRect = posterFrame.getBoundingClientRect();
      const deltaX = (e.touches[0].clientX - startX) / frameRect.width * 100;
      const deltaY = (e.touches[0].clientY - startY) / frameRect.height * 100;
      text.x = initialX + deltaX;
      text.y = initialY + deltaY;
      textEl.style.left = `${text.x}%`;
      textEl.style.top = `${text.y}%`;
      this.updateTextControlPositions(text.id);
      this.updateToolbarPosition(text.id);
      this.updateSettingsPanelPosition(text.id);
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
      // 检测是否发生了拖动
      const didDrag = Math.abs(text.x - initialX) > 0.1 || Math.abs(text.y - initialY) > 0.1;

      if (!didDrag) {
        // 没有拖动，检测双击
        const currentTime = Date.now();
        if (currentTime - lastTapTime < DOUBLE_TAP_DELAY) {
          // 双击切换设置面板
          const panel = document.getElementById('textSettingsPanel');
          if (panel && panel.style.display !== 'none') {
            // 面板已打开，关闭它
            panel.style.display = 'none';
          } else {
            // 面板未打开，打开它
            this.showTextSettingsPanel(text.id);
          }
          lastTapTime = 0;
        } else {
          lastTapTime = currentTime;
        }
      }

      isDragging = false;
      hasMoved = false;
    });

    posterFrame.appendChild(textEl);
    
    // 延迟创建控制点，确保文字元素已渲染并获取正确尺寸
    requestAnimationFrame(() => {
      this.createTextControls(text);
    });
  },

  createTextControls: function(text) {
    const posterFrame = document.getElementById('posterFrame');
    if (!posterFrame) return;

    const existingControls = posterFrame.querySelectorAll(`.text-control[data-text-id="${text.id}"]`);
    existingControls.forEach(c => c.remove());

    const textEl = document.getElementById(text.id);
    if (!textEl) return;

    const frameRect = posterFrame.getBoundingClientRect();
    const textRect = textEl.getBoundingClientRect();
    
    // 计算文字元素相对于posterFrame的位置
    const textLeft = textRect.left - frameRect.left;
    const textTop = textRect.top - frameRect.top;
    const textRight = textRect.right - frameRect.left;
    const textBottom = textRect.bottom - frameRect.top;
    const textCenterX = textLeft + textRect.width / 2;
    const textCenterY = textTop + textRect.height / 2;

    // 删除按钮：文字顶边中点外靠外10像素
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'text-control text-delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.title = '删除文字';
    deleteBtn.dataset.textId = text.id;
    deleteBtn.style.cssText = `
      position: absolute;
      left: ${textCenterX}px;
      top: ${textTop - 10}px;
      transform: translate(-50%, -100%);
      opacity: 0;
      z-index: ${text.zIndex + 10};
    `;
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      this.removeTextElement(text.id);
    };
    posterFrame.appendChild(deleteBtn);

    // 增加宽度按钮：左上角
    const increaseWidthBtn = document.createElement('button');
    increaseWidthBtn.className = 'text-control text-width-increase-btn';
    increaseWidthBtn.innerHTML = '↔';
    increaseWidthBtn.title = '增加宽度';
    increaseWidthBtn.dataset.textId = text.id;
    increaseWidthBtn.style.cssText = `
      position: absolute;
      left: ${textLeft}px;
      top: ${textTop - 10}px;
      transform: translate(0%, -100%);
      opacity: 0;
      z-index: ${text.zIndex + 10};
    `;
    increaseWidthBtn.onclick = (e) => {
      e.stopPropagation();
      this.adjustTextWidth(text.id, 8);
    };
    posterFrame.appendChild(increaseWidthBtn);

    // 减小宽度按钮：右上角
    const decreaseWidthBtn = document.createElement('button');
    decreaseWidthBtn.className = 'text-control text-width-decrease-btn';
    decreaseWidthBtn.innerHTML = '⇢⇠';
    decreaseWidthBtn.title = '减小宽度';
    decreaseWidthBtn.dataset.textId = text.id;
    decreaseWidthBtn.style.cssText = `
      position: absolute;
      left: ${textRight}px;
      top: ${textTop - 10}px;
      transform: translate(-100%, -100%);
      opacity: 0;
      z-index: ${text.zIndex + 10};
    `;
    decreaseWidthBtn.onclick = (e) => {
      e.stopPropagation();
      this.adjustTextWidth(text.id, -8);
    };
    posterFrame.appendChild(decreaseWidthBtn);

    // 设置按钮：左侧边中点的靠外10像素
    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'text-control text-settings-btn';
    settingsBtn.innerHTML = '✎';
    settingsBtn.title = '文字设置';
    settingsBtn.dataset.textId = text.id;
    settingsBtn.style.cssText = `
      position: absolute;
      left: ${textLeft - 10}px;
      top: ${textCenterY}px;
      transform: translate(-100%, -50%);
      opacity: 0;
      z-index: ${text.zIndex + 10};
    `;
    settingsBtn.onclick = (e) => {
      e.stopPropagation();
      this.showTextSettingsPanel(text.id);
    };
    posterFrame.appendChild(settingsBtn);

    // 旋转按钮：右侧边中点靠外10像素
    const rotateBtn = document.createElement('button');
    rotateBtn.className = 'text-control text-rotate-btn';
    rotateBtn.innerHTML = '↺';
    rotateBtn.title = '旋转文字';
    rotateBtn.dataset.textId = text.id;
    rotateBtn.style.cssText = `
      position: absolute;
      left: ${textRight + 10}px;
      top: ${textCenterY}px;
      transform: translate(0%, -50%);
      opacity: 0;
      z-index: ${text.zIndex + 10};
    `;

    let isRotating = false;
    let startAngle = 0;
    let startRotation = 0;

    const getAngleFromCenter = (clientX, clientY) => {
      const rect = posterFrame.getBoundingClientRect();
      return Math.atan2(clientY - rect.top - textCenterY, clientX - rect.left - textCenterX) * (180 / Math.PI);
    };

    rotateBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isRotating = true;
      startAngle = getAngleFromCenter(e.clientX, e.clientY);
      startRotation = text.rotation;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isRotating) return;
      const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
      let rotation = startRotation + (currentAngle - startAngle);
      if (rotation > 180) rotation -= 360;
      if (rotation < -180) rotation += 360;
      text.rotation = rotation;
      this.updateTextElementStyle(text.id);
      this.updateTextControlPositions(text.id);
    });

    document.addEventListener('mouseup', () => {
      isRotating = false;
    });

    rotateBtn.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        e.stopPropagation();
        isRotating = true;
        startAngle = getAngleFromCenter(e.touches[0].clientX, e.touches[0].clientY);
        startRotation = text.rotation;
      }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      if (!isRotating || e.touches.length !== 1) return;
      const currentAngle = getAngleFromCenter(e.touches[0].clientX, e.touches[0].clientY);
      let rotation = startRotation + (currentAngle - startAngle);
      if (rotation > 180) rotation -= 360;
      if (rotation < -180) rotation += 360;
      text.rotation = rotation;
      this.updateTextElementStyle(text.id);
      this.updateTextControlPositions(text.id);
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', () => {
      isRotating = false;
    });

    posterFrame.appendChild(rotateBtn);
  },

  selectTextElement: function(textId) {
    const text = window.textElements.find(t => t.id === textId);
    if (!text) return;

    document.querySelectorAll('.canvas-text').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.text-control').forEach(el => el.style.opacity = '0');

    const textEl = document.getElementById(textId);
    if (textEl) {
      textEl.classList.add('selected');
    }

    document.querySelectorAll(`.text-control[data-text-id="${textId}"]`).forEach(el => {
      el.style.opacity = '1';
    });

    // 显示工具栏并更新图标和位置
    this.createTextToolbar();
    this.showTextToolbar();
    this.updateToolbarIcons(text);
    this.updateToolbarPosition(textId);
    this.resetToolbarTimer();
  },

  updateTextElementStyle: function(textId) {
    const text = window.textElements.find(t => t.id === textId);
    if (!text) return;

    const textEl = document.getElementById(textId);
    if (!textEl) return;

    textEl.style.transform = `translate(-50%, -50%) scale(${text.scale}) rotate(${text.rotation}deg)`;
    textEl.style.writingMode = text.writingMode;
    textEl.style.color = text.color;
    textEl.style.fontFamily = text.fontFamily;
    textEl.style.fontSize = `${text.fontSize}px`;
    
    // 竖排模式下，使用 text-align 的 start/center/end 实现垂直对齐
    // 横排模式下，使用 text-align 的 left/center/right 实现水平对齐
    if (text.writingMode === 'vertical-rl') {
      textEl.style.width = '80px';
      // 竖排文本的垂直对齐：top → start，center → center，bottom → end
      if (text.textAlign === 'top') {
        textEl.style.textAlign = 'start';
      } else if (text.textAlign === 'center') {
        textEl.style.textAlign = 'center';
      } else if (text.textAlign === 'bottom') {
        textEl.style.textAlign = 'end';
      }
    } else {
      textEl.style.textAlign = text.textAlign;
      if (text.width) {
        textEl.style.width = `${text.width}px`;
      }
    }
  },

  updateTextControlPositions: function(textId) {
    const text = window.textElements.find(t => t.id === textId);
    if (!text) return;

    const posterFrame = document.getElementById('posterFrame');
    const textEl = document.getElementById(textId);
    if (!posterFrame || !textEl) return;

    const frameRect = posterFrame.getBoundingClientRect();
    const textRect = textEl.getBoundingClientRect();
    
    const textLeft = textRect.left - frameRect.left;
    const textTop = textRect.top - frameRect.top;
    const textRight = textRect.right - frameRect.left;
    const textBottom = textRect.bottom - frameRect.top;
    const textCenterX = textLeft + textRect.width / 2;
    const textCenterY = textTop + textRect.height / 2;

    document.querySelectorAll(`.text-control[data-text-id="${textId}"]`).forEach(el => {
      if (el.classList.contains('text-delete-btn')) {
        el.style.left = `${textCenterX}px`;
        el.style.top = `${textTop - 10}px`;
      } else if (el.classList.contains('text-width-increase-btn')) {
        el.style.left = `${textLeft}px`;
        el.style.top = `${textTop - 10}px`;
      } else if (el.classList.contains('text-width-decrease-btn')) {
        el.style.left = `${textRight}px`;
        el.style.top = `${textTop - 10}px`;
      } else if (el.classList.contains('text-settings-btn')) {
        el.style.left = `${textLeft - 10}px`;
        el.style.top = `${textCenterY}px`;
      } else if (el.classList.contains('text-rotate-btn')) {
        el.style.left = `${textRight + 10}px`;
        el.style.top = `${textCenterY}px`;
      }
    });
    
    // 更新底部工具栏位置
    this.updateToolbarPosition(textId);
  },

  adjustTextWidth: function(textId, delta) {
    const text = window.textElements.find(t => t.id === textId);
    if (!text) return;

    const textEl = document.getElementById(textId);
    if (!textEl) return;

    const currentWidth = textEl.offsetWidth || parseInt(textEl.style.width) || 200;
    const newWidth = Math.max(50, currentWidth + delta);
    
    textEl.style.width = `${newWidth}px`;
    text.width = newWidth;
    this.updateTextControlPositions(textId);
    this.updateToolbarPosition(textId);
  },

  removeTextElement: function(textId) {
    const index = window.textElements.findIndex(t => t.id === textId);
    if (index !== -1) {
      window.textElements.splice(index, 1);
    }

    const textEl = document.getElementById(textId);
    if (textEl) {
      textEl.remove();
    }

    document.querySelectorAll(`.text-control[data-text-id="${textId}"]`).forEach(el => el.remove());

    // 关闭设置面板
    const panel = document.getElementById('textSettingsPanel');
    if (panel) {
      panel.style.display = 'none';
    }

    // 如果没有文字元素了，隐藏工具栏
    if (!window.textElements || window.textElements.length === 0) {
      this.hideTextToolbar();
    }
  },

  showTextSettingsPanel: function(textId) {
    const text = window.textElements.find(t => t.id === textId);
    if (!text) return;

    const posterFrame = document.getElementById('posterFrame');
    if (!posterFrame) return;

    let panel = document.getElementById('textSettingsPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'textSettingsPanel';
      panel.className = 'text-settings-panel';
      document.body.appendChild(panel);
      
      panel.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    panel.style.display = 'block';

    const textEl = document.getElementById(textId);

    panel.innerHTML = `
      <div class="text-settings-header">
        <button id="closeTextSettingsBtn" class="text-settings-close-btn">×</button>
      </div>
      <textarea id="textContentInput">${text.text}</textarea>
      <div class="text-settings-buttons">
        <button class="text-settings-btn clear" id="clearTextBtn">清空</button>
        <button class="text-settings-btn paste" id="pasteTextBtn">粘贴</button>
        <button class="text-settings-btn cancel" id="cancelTextBtn">取消</button>
        <button class="text-settings-btn confirm" id="confirmTextBtn">确定</button>
      </div>
    `;

    const textarea = document.getElementById('textContentInput');

    document.getElementById('closeTextSettingsBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      panel.style.display = 'none';
    });

    document.getElementById('clearTextBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      textarea.value = '';
      textarea.focus();
    });

    document.getElementById('pasteTextBtn').addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        const clipText = await navigator.clipboard.readText();
        textarea.value = clipText;
        textarea.focus();
      } catch (err) {
        console.error('粘贴失败:', err);
      }
    });

    document.getElementById('cancelTextBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      panel.style.display = 'none';
    });

    document.getElementById('confirmTextBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      text.text = textarea.value;
      if (textEl) {
        textEl.textContent = text.text;
      }
      panel.style.display = 'none';
    });
  },

  createTextToolbar: function() {
    const posterFrame = document.getElementById('posterFrame');
    if (!posterFrame) return;

    let toolbar = document.getElementById('textToolbar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.id = 'textToolbar';
      toolbar.className = 'text-toolbar';
      posterFrame.appendChild(toolbar);
      
      // 阻止工具栏内的点击事件冒泡
      toolbar.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    toolbar.innerHTML = `
      <button class="toolbar-btn" id="colorToggleBtn" title="颜色切换" style="background: #000000; color: #FFFFFF;">
      </button>
      <button class="toolbar-btn" id="writingModeToggleBtn" title="排版切换">
        <span class="btn-icon">居中对齐</span>
      </button>
      <button class="toolbar-btn" id="textAlignToggleBtn" title="对齐切换">
        <span class="btn-icon">居中对齐</span>
      </button>
      <button class="toolbar-btn" id="fontSizeDecreaseBtn" title="字号减小">
        <span class="btn-icon">−</span>
      </button>
      <button class="toolbar-btn" id="fontSizeIncreaseBtn" title="字号增大">
        <span class="btn-icon">+</span>
      </button>
    `;

    // 绑定事件
    this.bindToolbarEvents();

    // 鼠标移动时重置计时器
    toolbar.addEventListener('mousemove', () => {
      this.resetToolbarTimer();
    });
  },

  updateToolbarPosition: function(textId) {
    const toolbar = document.getElementById('textToolbar');
    if (!toolbar) return;

    const text = window.textElements.find(t => t.id === textId);
    if (!text) return;

    const textEl = document.getElementById(textId);
    if (!textEl) return;

    const posterFrame = document.getElementById('posterFrame');
    if (!posterFrame) return;

    // 使用 requestAnimationFrame 确保工具栏已经渲染
    requestAnimationFrame(() => {
      const frameRect = posterFrame.getBoundingClientRect();
      const textRect = textEl.getBoundingClientRect();
      const toolbarRect = toolbar.getBoundingClientRect();
      const toolbarWidth = toolbarRect.width || toolbar.offsetWidth;
      
      // 计算文字相对于posterFrame的位置
      const textBottom = textRect.bottom - frameRect.top;
      const textCenterX = textRect.left - frameRect.left + textRect.width / 2;
      
      // 工具栏放在文字底边虚线外10像素，居中对齐
      toolbar.style.left = `${textCenterX - toolbarWidth / 2}px`;
      toolbar.style.top = `${textBottom + 10}px`;
    });
  },

  updateSettingsPanelPosition: function(textId) {
    const panel = document.getElementById('textSettingsPanel');
    if (!panel || panel.style.display === 'none') return;

    const text = window.textElements.find(t => t.id === textId);
    if (!text) return;

    const textEl = document.getElementById(textId);
    if (!textEl) return;

    const posterFrame = document.getElementById('posterFrame');
    if (!posterFrame) return;

    requestAnimationFrame(() => {
      const frameRect = posterFrame.getBoundingClientRect();
      const textRect = textEl.getBoundingClientRect();
      const toolbar = document.getElementById('textToolbar');
      const panelWidth = 280;
      
      // 计算文字相对于posterFrame的位置
      const textBottom = textRect.bottom - frameRect.top;
      const textCenterX = textRect.left - frameRect.left + textRect.width / 2;
      
      // 如果工具栏存在，设置面板在工具栏下方
      if (toolbar && toolbar.style.opacity !== '0') {
        const toolbarRect = toolbar.getBoundingClientRect();
        const toolbarBottom = toolbarRect.bottom - frameRect.top;
        const toolbarCenterX = toolbarRect.left - frameRect.left + toolbarRect.width / 2;
        
        panel.style.left = `${toolbarCenterX - panelWidth / 2 + 50}px`;
        panel.style.top = `${toolbarBottom + 10}px`;
      } else {
        // 否则直接放在文字下方
        panel.style.left = `${textCenterX - panelWidth / 2 + 50}px`;
        panel.style.top = `${textBottom + 10}px`;
      }
    });
  },

  bindToolbarEvents: function() {
    const colorToggleBtn = document.getElementById('colorToggleBtn');
    const writingModeToggleBtn = document.getElementById('writingModeToggleBtn');
    const textAlignToggleBtn = document.getElementById('textAlignToggleBtn');
    const fontSizeDecreaseBtn = document.getElementById('fontSizeDecreaseBtn');
    const fontSizeIncreaseBtn = document.getElementById('fontSizeIncreaseBtn');

    if (colorToggleBtn) {
      colorToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedText = this.getSelectedText();
        if (selectedText) {
          selectedText.color = selectedText.color === '#FFFFFF' ? '#000000' : '#FFFFFF';
          this.updateTextElementStyle(selectedText.id);
          this.updateToolbarIcons(selectedText);
          this.resetToolbarTimer();
        }
      });
    }

    if (writingModeToggleBtn) {
      writingModeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedText = this.getSelectedText();
        if (selectedText) {
          const oldWritingMode = selectedText.writingMode;
          selectedText.writingMode = selectedText.writingMode === 'horizontal-tb' ? 'vertical-rl' : 'horizontal-tb';
          if (selectedText.writingMode === 'vertical-rl') {
            selectedText.textAlign = 'top';
            selectedText.width = 80;
          } else {
            selectedText.textAlign = 'left';
            selectedText.width = 150;
          }
          this.updateTextElementStyle(selectedText.id);
          this.updateTextControlPositions(selectedText.id);
          this.updateToolbarIcons(selectedText);
          this.resetToolbarTimer();
        }
      });
    }

    if (textAlignToggleBtn) {
      textAlignToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedText = this.getSelectedText();
        if (selectedText) {
          if (selectedText.writingMode === 'horizontal-tb') {
            const alignments = ['left', 'center', 'right'];
            const currentIndex = alignments.indexOf(selectedText.textAlign);
            selectedText.textAlign = alignments[(currentIndex + 1) % alignments.length];
          } else {
            const alignments = ['top', 'center', 'bottom'];
            const currentIndex = alignments.indexOf(selectedText.textAlign);
            selectedText.textAlign = alignments[(currentIndex + 1) % alignments.length];
            // 竖排模式下，无论什么对齐方式，宽度都保持80px
            selectedText.width = 80;
          }
          this.updateTextElementStyle(selectedText.id);
          this.updateTextControlPositions(selectedText.id);
          this.updateToolbarIcons(selectedText);
          this.resetToolbarTimer();
        }
      });
    }

    if (fontSizeDecreaseBtn) {
      fontSizeDecreaseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedText = this.getSelectedText();
        if (selectedText) {
          selectedText.fontSize = Math.max(6, selectedText.fontSize - 1);
          this.updateTextElementStyle(selectedText.id);
          this.updateTextControlPositions(selectedText.id);
          this.resetToolbarTimer();
        }
      });
    }

    if (fontSizeIncreaseBtn) {
      fontSizeIncreaseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedText = this.getSelectedText();
        if (selectedText) {
          selectedText.fontSize = Math.min(100, selectedText.fontSize + 1);
          this.updateTextElementStyle(selectedText.id);
          this.updateTextControlPositions(selectedText.id);
          this.resetToolbarTimer();
        }
      });
    }
  },

  getSelectedText: function() {
    if (!window.textElements) return null;
    return window.textElements.find(text => {
      const el = document.getElementById(text.id);
      return el && el.classList.contains('selected');
    });
  },

  updateToolbarIcons: function(text) {
    const colorToggleBtn = document.getElementById('colorToggleBtn');
    const writingModeToggleBtn = document.getElementById('writingModeToggleBtn');
    const textAlignToggleBtn = document.getElementById('textAlignToggleBtn');

    if (colorToggleBtn) {
      // 白字用黑色背景显示"白"，黑字用白色背景显示"黑"
      const bgColor = text.color === '#FFFFFF' ? '#000000' : '#FFFFFF';
      const textColor = text.color === '#FFFFFF' ? '#FFFFFF' : '#000000';
      const label = text.color === '#FFFFFF' ? '白' : '黑';
      colorToggleBtn.style.background = bgColor;
      colorToggleBtn.style.color = textColor;
      colorToggleBtn.textContent = label;
    }

    if (writingModeToggleBtn) {
      writingModeToggleBtn.innerHTML = `<span class="btn-icon">${text.writingMode === 'horizontal-tb' ? '竖排' : '横排'}</span>`;
    }

    if (textAlignToggleBtn) {
      if (text.writingMode === 'horizontal-tb') {
        // 横排：左对齐、居中（旋转90度的〣）、右对齐
        const icons = ['左对齐', '居中对齐', '右对齐'];
        const alignments = ['left', 'center', 'right'];
        const index = alignments.indexOf(text.textAlign);
        textAlignToggleBtn.innerHTML = `<span class="btn-icon">${icons[index]}</span>`;
      } else {
        // 竖排：顶对齐、居中（〣）、底对齐
        const icons = ['顶对齐', '居中对齐', '底对齐'];
        const alignments = ['top', 'center', 'bottom'];
        const index = alignments.indexOf(text.textAlign);
        textAlignToggleBtn.innerHTML = `<span class="btn-icon">${icons[index]}</span>`;
      }
    }
  },

  showTextToolbar: function() {
    const toolbar = document.getElementById('textToolbar');
    if (toolbar) {
      toolbar.style.opacity = '1';
      this.resetToolbarTimer();
    }
  },

  hideTextToolbar: function() {
    const toolbar = document.getElementById('textToolbar');
    if (toolbar) {
      toolbar.style.opacity = '0';
    }
    
    // 同时隐藏控制点
    document.querySelectorAll('.text-control').forEach(el => {
      el.style.opacity = '0';
    });
    
    // 同时移除选中状态（虚线框）
    document.querySelectorAll('.canvas-text').forEach(el => {
      el.classList.remove('selected');
    });
  },

  resetToolbarTimer: function() {
    clearTimeout(this.toolbarTimer);
    this.toolbarTimer = setTimeout(() => {
      this.hideTextToolbar();
    }, 3000);
  }
};

  // 初始化贴纸功能
  document.addEventListener('DOMContentLoaded', function() {
    window.stickerModalManager.init();
    window.stickerManager.init();
    window.FrameManager.init();
    window.textTemplateManager.init();

    // 初始化贴纸按钮显示状态
    updateStickerButtonVisibility();
    
    // 点击非贴纸区域时隐藏所有贴纸操作控件
    document.addEventListener('click', (e) => {
      // 如果点击的是贴纸或贴纸的控件，则不隐藏
      if (e.target.closest('.sticker')) {
        return;
      }
      
      // 如果点击的是文字或文字的控件，则不隐藏
      if (e.target.closest('.canvas-text') || e.target.closest('.text-control')) {
        return;
      }
      
      // 如果点击的是工具栏，则不隐藏
      if (e.target.closest('#textToolbar') || e.target.closest('.text-toolbar')) {
        return;
      }
      
      // 如果点击的是弹窗内的元素，则不隐藏
      if (e.target.closest('.modal') || e.target.closest('.modal-overlay') || e.target.closest('.text-settings-panel')) {
        return;
      }
      
      // 隐藏所有贴纸的控制控件
      window.stickerManager.selectSticker(null);
      
      // 隐藏文字控制控件
      document.querySelectorAll('.canvas-text').forEach(el => el.classList.remove('selected'));
      document.querySelectorAll('.text-control').forEach(el => el.style.opacity = '0');
      
      // 隐藏工具栏
      if (window.textTemplateManager) {
        window.textTemplateManager.hideTextToolbar();
      }
    });
  });
  
  // 元素显示/隐藏控制功能
  window.VisibilityController = {
    storageKey: 'posterElementVisibility',
    
    elementNames: {
      posterBusinessName: '品牌/门店名称',
      posterLogo: '品牌标志/logo',
      posterQrcode: '二维码',
      posterPromoText: '促销引流文案'
    },
    
    defaultVisibility: {
      posterBusinessName: true,
      posterLogo: true,
      posterQrcode: true,
      posterPromoText: true
    },
    
    init: function() {
      this.loadVisibility();
      this.bindEvents();
      this.bindModalEvents();
      this.updateBatchButtons(); // 初始化时更新批量按钮状态
    },
    
    loadVisibility: function() {
      const stored = localStorage.getItem(this.storageKey);
      const visibility = stored ? JSON.parse(stored) : this.defaultVisibility;
      
      Object.keys(visibility).forEach(targetId => {
        const element = document.getElementById(targetId);
        
        if (element) {
          if (!visibility[targetId]) {
            element.style.opacity = '0';
            element.style.pointerEvents = 'none';
          } else {
            element.style.opacity = '1';
            element.style.pointerEvents = '';
          }
        }
      });
      
      this.updateModalUI();
    },
    
    updateModalUI: function() {
      const visibility = this.getVisibility();
      
      // 更新单个元素状态
      document.querySelectorAll('.visibility-item').forEach(item => {
        const targetId = item.dataset.target;
        const statusEl = item.querySelector('.visibility-status');
        const btnEl = item.querySelector('.visibility-toggle-switch');
        
        if (statusEl && btnEl && visibility[targetId] !== undefined) {
          if (visibility[targetId]) {
            statusEl.innerHTML = `${window.getSVGIcon ? window.getSVGIcon('eye', 'svg-icon') : '<i class="fa fa-eye"></i>'} 已显示`;
            btnEl.textContent = '不显示';
            btnEl.classList.remove('active');
          } else {
            statusEl.textContent = '已隐藏';
            btnEl.textContent = '显示';
            btnEl.classList.add('active');
          }
        }
      });
      
      // 更新批量操作按钮显示状态
      this.updateBatchButtons();
    },
    
    // 更新批量操作按钮显示状态
    updateBatchButtons: function() {
      const visibility = this.getVisibility();
      const batchShowBtn = document.getElementById('batchShowAll');
      const batchHideBtn = document.getElementById('batchHideAll');
      
      if (!batchShowBtn || !batchHideBtn) return;
      
      // 检查所有元素的状态
      const allVisible = Object.values(visibility).every(v => v === true);
      const allHidden = Object.values(visibility).every(v => v === false);
      
      // 根据状态显示/隐藏按钮
      if (allVisible) {
        // 所有元素都显示，隐藏"全部显示"按钮
        batchShowBtn.style.display = 'none';
        batchHideBtn.style.display = 'flex';
      } else if (allHidden) {
        // 所有元素都隐藏，隐藏"全部隐藏"按钮
        batchShowBtn.style.display = 'flex';
        batchHideBtn.style.display = 'none';
      } else {
        // 部分显示部分隐藏，显示两个按钮
        batchShowBtn.style.display = 'flex';
        batchHideBtn.style.display = 'flex';
      }
    },
    
    saveVisibility: function(visibility) {
      localStorage.setItem(this.storageKey, JSON.stringify(visibility));
    },
    
    getVisibility: function() {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : { ...this.defaultVisibility };
    },
    
    showToast: function(message, duration) {
      let toast = document.querySelector('.visibility-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'visibility-toast';
        document.body.appendChild(toast);
      }
      
      toast.textContent = message;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, duration);
    },
    
    toggleVisibility: function(targetId) {
      const element = document.getElementById(targetId);
      
      if (!element) return;
      
      const visibility = this.getVisibility();
      const isCurrentlyVisible = visibility[targetId];
      
      if (isCurrentlyVisible) {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none';
        visibility[targetId] = false;
      } else {
        element.style.opacity = '1';
        element.style.pointerEvents = '';
        visibility[targetId] = true;
      }
      
      this.saveVisibility(visibility);
      this.updateModalUI();
    },
    
    bindEvents: function() {
      document.querySelectorAll('.visibility-toggle-switch').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = btn.dataset.target;
          this.toggleVisibility(targetId);
        });
      });
    },
    
    bindModalEvents: function() {
      const modal = document.getElementById('visibilityManagerModal');
      const openBtn = document.getElementById('openVisibilityManagerBtn');
      const closeBtn = document.getElementById('closeVisibilityManagerBtn');
      
      if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
          this.updateModalUI();
          modal.classList.remove('hidden');
        });
      }
      
      if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
          modal.classList.add('hidden');
        });
      }
      
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.add('hidden');
          }
        });
      }
      
      // 批量显示按钮事件
      const batchShowBtn = document.getElementById('batchShowAll');
      if (batchShowBtn) {
        batchShowBtn.addEventListener('click', () => {
          this.batchShowAll();
        });
      }
      
      // 批量隐藏按钮事件
      const batchHideBtn = document.getElementById('batchHideAll');
      if (batchHideBtn) {
        batchHideBtn.addEventListener('click', () => {
          this.batchHideAll();
        });
      }
    },
    
    // 批量显示所有元素
    batchShowAll: function() {
      const visibility = this.getVisibility();
      
      // 将所有元素设置为显示状态
      Object.keys(visibility).forEach(targetId => {
        visibility[targetId] = true;
      });
      
      // 保存并更新UI
      this.saveVisibility(visibility);
      this.loadVisibility();
      this.updateModalUI();
      
      // 显示成功提示
      this.showToast('所有元素已显示', 2000);
    },
    
    // 批量隐藏所有元素
    batchHideAll: function() {
      const visibility = this.getVisibility();
      
      // 将所有元素设置为隐藏状态
      Object.keys(visibility).forEach(targetId => {
        visibility[targetId] = false;
      });
      
      // 保存并更新UI
      this.saveVisibility(visibility);
      this.loadVisibility();
      this.updateModalUI();
      
      // 显示成功提示
      this.showToast('所有元素已隐藏', 2000);
    },
    
    isElementVisible: function(targetId) {
      if (!this.storageKey) {
        return true;
      }
      const visibility = this.getVisibility();
      return visibility[targetId] !== false;
    },
    
    isInitialized: function() {
      return !!this.storageKey;
    }
  };
  
  // 立即初始化 VisibilityController（不等待 DOMContentLoaded）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.VisibilityController.init();
    });
  } else {
    // DOM 已经加载完成，立即初始化
    window.VisibilityController.init();
  }
  
  // 全局函数：打开显示管理弹窗
  window.openVisibilityManager = function() {
    const modal = document.getElementById('visibilityManagerModal');
    if (modal && window.VisibilityController) {
      window.VisibilityController.updateModalUI();
      modal.classList.remove('hidden');
    }
  };

  // 编辑页首页弹窗功能
  function initEditorHomePopup() {
    const homePopup = document.getElementById('homePopup');
    const closeHomePopupBtn = document.getElementById('closeHomePopup');
    const todayReleaseContent = document.getElementById('todayReleaseContent');
    const futureSuggestionContent = document.getElementById('futureSuggestionContent');
    const dailySuggestionBtn = document.getElementById('dailySuggestionBtn');
    const homePopupModal = homePopup ? homePopup.querySelector('.home-popup-modal') : null;
    
    if (!homePopup) return;
    
    // 标题轮替功能
    let titleRotationInterval = null;
    let currentTitleIndex = 0;
    
    function startTitleRotation() {
      const titleTexts = homePopup.querySelectorAll('.rotating-title .title-text');
      if (titleTexts.length < 2) return;
      
      titleRotationInterval = setInterval(() => {
        titleTexts[currentTitleIndex].classList.remove('active');
        currentTitleIndex = (currentTitleIndex + 1) % titleTexts.length;
        titleTexts[currentTitleIndex].classList.add('active');
      }, 5000);
    }
    
    function stopTitleRotation() {
      if (titleRotationInterval) {
        clearInterval(titleRotationInterval);
        titleRotationInterval = null;
      }
    }
    
    // 初始化标题波浪动画：将文字拆分成单字符并添加韵律延迟
    function initTitleWaveAnimation() {
      const titles = document.querySelectorAll('.home-popup-section-title');
      titles.forEach(title => {
        // 如果已经处理过，跳过
        if (title.dataset.waveInitialized) return;
        
        // 保留span元素（如日期显示），只处理纯文字部分
        const childNodes = Array.from(title.childNodes);
        let html = '';
        
        childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            // 文字节点：拆分成单个字符
            const text = node.textContent;
            text.split('').forEach((char, index) => {
              if (char.trim()) {
                html += `<span class="title-wave-char" style="animation-delay: ${index * 0.05}s">${char}</span>`;
              } else {
                html += char; // 保留空格
              }
            });
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // 元素节点（如span）：保留原样
            html += node.outerHTML;
          }
        });
        
        title.innerHTML = html;
        title.dataset.waveInitialized = 'true';
      });
    }
    
    // 显示弹窗
    function showHomePopup() {
      renderTodayRelease();
      renderFutureSuggestion();
      
      // 处理标题波浪动画
      initTitleWaveAnimation();
      
      if (dailySuggestionBtn && homePopupModal) {
        const btnRect = dailySuggestionBtn.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const startX = btnRect.left + btnRect.width / 2;
        const startY = btnRect.top + btnRect.height / 2;
        
        homePopupModal.style.transform = `translate(${startX - centerX}px, ${startY - centerY}px) scale(0.1)`;
        homePopupModal.style.opacity = '0';
        homePopupModal.style.transition = 'all 0.3s ease-out';
      }
      
      homePopup.classList.remove('hidden');
      startTitleRotation();
      
      requestAnimationFrame(() => {
        if (homePopupModal) {
          homePopupModal.style.transform = 'translate(0, 0) scale(1)';
          homePopupModal.style.opacity = '1';
        }
      });
    }
    
    // 小红点管理功能
    const RED_DOT_STORAGE_KEY = 'dailySuggestionRedDot';
    
    // 检查是否需要显示小红点
    function checkRedDotVisibility() {
      const now = new Date();
      const currentHour = now.getHours();
      const lastClickHour = localStorage.getItem(RED_DOT_STORAGE_KEY);
      
      // 如果用户在当前小时点击过，或者没有记录，则不显示
      if (lastClickHour && parseInt(lastClickHour) === currentHour) {
        return false;
      }
      
      // 显示小红点
      return true;
    }
    
    // 更新小红点显示状态
    function updateRedDotVisibility() {
      if (!dailySuggestionBtn) return;
      
      const shouldShow = checkRedDotVisibility();
      if (shouldShow) {
        dailySuggestionBtn.classList.add('has-red-dot');
      } else {
        dailySuggestionBtn.classList.remove('has-red-dot');
      }
    }
    
    // 记录用户点击时间
    function recordRedDotClick() {
      const now = new Date();
      const currentHour = now.getHours();
      localStorage.setItem(RED_DOT_STORAGE_KEY, currentHour.toString());
      updateRedDotVisibility();
    }
    
    // 整点检查函数
    function checkHourlyRedDot() {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      // 每分钟检查一次是否到达整点
      if (minutes === 0 && seconds === 0) {
        updateRedDotVisibility();
      }
    }
    
    // 初始化小红点状态
    updateRedDotVisibility();
    
    // 设置整点检查定时器
    setInterval(checkHourlyRedDot, 60000); // 每分钟检查一次
    
    // 每日建议按钮点击事件
    if (dailySuggestionBtn) {
      dailySuggestionBtn.addEventListener('click', function() {
        recordRedDotClick(); // 记录点击时间
        showHomePopup(); // 显示弹窗
      });
    }
    
    // 文字循环切换动画："今日"(1.5秒) → "任务"(2秒) → 循环
    let dailyTextTimer = null;
    let showingTodayText = true; // true: 显示"今日", false: 显示"任务"
    
    function startDailyTextRotation() {
      const textElement = document.querySelector('.daily-task-text');
      if (!textElement) return;
      
      // 清除之前的定时器
      if (dailyTextTimer) {
        clearTimeout(dailyTextTimer);
      }
      
      if (showingTodayText) {
        // 显示"今日" 1.5秒
        textElement.textContent = '今日';
        textElement.style.opacity = '1';
        dailyTextTimer = setTimeout(() => {
          // 添加淡出效果，实现平滑切换
          textElement.style.opacity = '0';
          setTimeout(() => {
            textElement.textContent = '任务';
            textElement.style.opacity = '1';
            showingTodayText = false;
            startDailyTextRotation();
          }, 300);
        }, 1500);
      } else {
        // 显示"任务" 2秒
        textElement.textContent = '任务';
        textElement.style.opacity = '1';
        dailyTextTimer = setTimeout(() => {
          // 添加淡出效果，实现平滑切换
          textElement.style.opacity = '0';
          setTimeout(() => {
            textElement.textContent = '今日';
            textElement.style.opacity = '1';
            showingTodayText = true;
            startDailyTextRotation();
          }, 300);
        }, 2000);
      }
    }
    
    // 初始化文字循环动画
    startDailyTextRotation();
  
    // 关闭弹窗
    function closeHomePopup() {
      homePopup.classList.add('hidden');
      stopTitleRotation();
    }
    
    // 关闭按钮点击事件
    if (closeHomePopupBtn) {
      closeHomePopupBtn.addEventListener('click', closeHomePopup);
    }
    
    // 点击遮罩关闭弹窗
    homePopup.addEventListener('click', function(e) {
      if (e.target === homePopup) {
        closeHomePopup();
      }
    });
    
    // 获取星期几的中文表示
    function getWeekdayChinese(day) {
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      return weekdays[day];
    }
    
    // 检查今天是否有节日
    function getTodayFestival() {
      const today = new Date();
      const year = today.getFullYear();
      const yearStr = year.toString();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      
      if (window.festivalDates && window.festivalDates[yearStr]) {
        for (const festivalName in window.festivalDates[yearStr]) {
          if (window.festivalDates[yearStr][festivalName].startsWith(todayStr)) {
            return festivalName;
          }
        }
      }
      return null;
    }
    
    // 从 templates 对象中动态获取指定节日的随机背景图片
    function getRandomBackgroundImage(type) {
      // 特殊处理 dairy（日常海报没有在 templates 中定义）
      if (type === 'dairy') {
          const randomNum = Math.floor(Math.random() * 22) + 1;
          return `images/dairy/${randomNum}.jpg`;
        }
      
      if (typeof window.templates === 'undefined') {
        console.log('templates 对象未定义');
        return null;
      }
      
      // action 到 festival 的映射
      const actionToFestival = {
        'zaoan': '早安',
        'wanan': '晚安'
      };
      
      // 如果是 action，转换为 festival 名称
      const festivalType = actionToFestival[type] || type;
      
      let matchedTemplates = [];
      
      for (const month in window.templates) {
        if (Array.isArray(window.templates[month])) {
          window.templates[month].forEach(template => {
            if (template.festivals && template.festivals.includes(festivalType)) {
              matchedTemplates.push(template);
            }
          });
        }
      }
      
      if (matchedTemplates.length === 0) {
        console.log('未找到匹配的模板:', type, '->', festivalType);
        return null;
      }
      
      const randomTemplate = matchedTemplates[Math.floor(Math.random() * matchedTemplates.length)];
      console.log('找到模板:', type, '->', festivalType, randomTemplate.image);
      return randomTemplate.image;
    }
    
    // 设置按钮背景图片（使用缩略图，避免下载原图）
    function setButtonBackground(button, type) {
      const localPath = getRandomBackgroundImage(type);
      if (localPath) {
        // 日常海报（dairy）固定使用本地图片，不走 cloudflare
        // 其他类型使用缩略图（-86thumb后缀）
        const imageUrl = (type === 'dairy') ? localPath : (window.imageConfig ? window.imageConfig.getThumbnailUrl(localPath, true) : localPath);
        const wrapper = button.closest('.button-wrapper');
        if (wrapper) {
          wrapper.style.setProperty('--button-bg-image', `url('${imageUrl}')`);
          wrapper.setAttribute('data-original-path', localPath);
        } else {
          button.style.setProperty('--button-bg-image', `url('${imageUrl}')`);
        }
      }
    }
    
    // 检查明天是否有节日
    function getTomorrowFestival() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const year = tomorrow.getFullYear();
      const yearStr = year.toString();
      const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
      const day = tomorrow.getDate().toString().padStart(2, '0');
      const tomorrowStr = `${year}-${month}-${day}`;
      
      if (window.festivalDates && window.festivalDates[yearStr]) {
        for (const festivalName in window.festivalDates[yearStr]) {
          if (window.festivalDates[yearStr][festivalName].startsWith(tomorrowStr)) {
            return festivalName;
          }
        }
      }
      return null;
    }
    
    // 获取未来的节日
    function getFutureFestivals(count = 3) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const currentYear = today.getFullYear();
      const festivals = [];
      
      const yearsToCheck = [currentYear.toString(), (currentYear + 1).toString()];
      
      for (const yearStr of yearsToCheck) {
        if (window.festivalDates && window.festivalDates[yearStr]) {
          for (const festivalName in window.festivalDates[yearStr]) {
            const dateStr = window.festivalDates[yearStr][festivalName].split(' ')[0];
            const [year, month, day] = dateStr.split('-').map(Number);
            const festivalDate = new Date(year, month - 1, day);
            festivalDate.setHours(0, 0, 0, 0);
            
            if (festivalDate > today) {
              const daysUntil = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
              festivals.push({
                name: festivalName,
                date: festivalDate,
                daysUntil: daysUntil
              });
            }
          }
        }
      }
      
      festivals.sort((a, b) => a.date - b.date);
      return festivals.slice(0, count);
    }
    
    // 渲染今日发布模块
    function renderTodayRelease() {
      const now = new Date();
      const todayFestival = getTodayFestival();
      const isBefore930 = now.getHours() < 9 || (now.getHours() === 9 && now.getMinutes() < 30);
      const todayDateInTitle = document.getElementById('todayDateInTitle');
      
      // 实时更新时间函数
      function updateRealTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeStr = `${hours}:${minutes}:${seconds}`;
        
        if (todayDateInTitle) {
          const currentMonth = now.getMonth() + 1;
          const currentDay = now.getDate();
          const currentWeekday = getWeekdayChinese(now.getDay());
          todayDateInTitle.innerHTML = ` <strong>${currentMonth}月${currentDay}日 ${currentWeekday}</strong> <i>${timeStr}</i>`;
        }
      }
      
      // 首次调用更新时间
      updateRealTime();
      
      // 每秒更新一次时间
      setInterval(updateRealTime, 1000);
      
      let html = '';
      
      if (todayFestival) {
        html = `
          <div class="today-release-text" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">1，制作今日${todayFestival}海报：</span>
            <div class="button-wrapper"><button class="home-popup-btn" data-action="festival" data-festival="${todayFestival}">
              <span>挑选${todayFestival}模板</span>
            </button></div>
            </div>
            <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">2，制作今日日常拍摄记录海报：</span>
            <div class="button-wrapper"><button class="home-popup-btn" id="dairyBtn"  data-action="dairy">
            <span>📷️ 日常记录海报</span>
            </button></div>
            </div>
          </div>
        `;
      } else if (isBefore930) {
        html = `
         <div class="today-release-text">（今日没有特别节日，您可以制作：）</div>
          <div class="today-release-text" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            
            <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">1，制作今日早安海报：</span>
            <div class="button-wrapper"><button class="home-popup-btn" id="zaoanBtn" data-action="zaoan">
            <span>☀ 挑选早安海报模板</span>
            </button></div>
            </div>
            <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">2，制作今日晚安海报：</span>
            <div class="button-wrapper"><button class="home-popup-btn" id="wananBtn" data-action="wanan">
            <span>☾ 挑选晚安海报模板</span>
            </button></div>
            </div>
            <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">3，制作今日日常拍摄记录海报：</span>
            <div class="button-wrapper"><button class="home-popup-btn" id="dairyBtn" data-action="dairy">
            <span>📷️ 日常记录海报</span>
            </button></div>
            </div>
          </div>
        `;
      } else {
        html = `
         <div class="today-release-text">（今日无特别节日，早安时段已过，您还可以制作：）</div>
          <div class="today-release-text" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
           
            <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">1，制作今日晚安海报：</span>
            <div class="button-wrapper"><button class="home-popup-btn" id="wananBtn" data-action="wanan">
            <span>☾ 挑选晚安海报模板</span>
            </button></div>
            </div>
            <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">2，制作今日日常拍摄记录海报：</span>
            <div class="button-wrapper"><button class="home-popup-btn" id="dairyBtn"  data-action="dairy">
            <span>📷️ 日常记录海报</span>
            </button></div>
            </div>
          </div>
        `;
      }
      
      todayReleaseContent.innerHTML = html;

      // 为按钮容器添加逐个叠加动画（延迟2秒载入，间隔200ms）
      const buttonWrappers = todayReleaseContent.querySelectorAll('.button-wrapper');
      buttonWrappers.forEach((wrapper, index) => {
        wrapper.classList.add('future-suggestion-item-enter');
        wrapper.style.animationDelay = `${380 + index * 200}ms`;
      });

      // 设置按钮背景图片
      todayReleaseContent.querySelectorAll('.home-popup-btn').forEach(btn => {
        const action = btn.dataset.action;
        if (action === 'festival') {
          setButtonBackground(btn, btn.dataset.festival);
        } else {
          setButtonBackground(btn, action);
        }
        
        btn.addEventListener('click', function() {
          closeHomePopup();
          
          if (action === 'festival') {
            const festival = this.dataset.festival;
            window.openTemplateModalWithFestival(festival);
          } else if (action === 'zaoan') {
            window.openTemplateModalWithFestival('zaoan');
          } else if (action === 'wanan') {
            window.openTemplateModalWithFestival('wanan');
          } else if (action === 'dairy') {
            window.location.href = 'editor.html?templateId=dairy-2024-001';
          }
        });
      });
      
      // 初始化按钮加载动画
      if (window.initButtonWrappers) {
        window.initButtonWrappers();
      }
    }
    
    // 渲染未来制作建议模块
    let loadedFestivalCount = 3; // 已加载的节日数量
    let isLoadingMore = false; // 防止重复加载
    
    function renderFutureSuggestion() {
      console.log('renderFutureSuggestion 被调用');
      console.log('window.festivalDates:', window.festivalDates);
      
      const tomorrowFestival = getTomorrowFestival();
      const futureFestivals = getFutureFestivals(loadedFestivalCount);
      
      console.log('tomorrowFestival:', tomorrowFestival);
      console.log('futureFestivals:', futureFestivals);
      
      let html = '';
      
      html += '<div class="future-suggestion-item">';
      html += '<div class="future-suggestion-text">明天：<span class="festival-date">提前制作明日早安和晚安海报</span></div>';
      html += '<div class="future-suggestion-buttons">';
      
      if (!tomorrowFestival) {
        html += `<div class="button-wrapper"><button class="future-suggestion-btn" data-action="zaoan"><span>☀ 挑选早安海报模板</span></button></div>`;
      }
      html += `<div class="button-wrapper"><button class="future-suggestion-btn" data-action="wanan"><span>☾ 挑选晚安海报模板</span></button></div>`;
      
      html += '</div></div>';
      
      if (futureFestivals && futureFestivals.length > 0) {
        futureFestivals.forEach(festival => {
          let daysText = '';
          if (festival.daysUntil === 1) {
            daysText = '明天：';
          } else if (festival.daysUntil === 2) {
            daysText = '后天：';
          } else {
            daysText = `${festival.daysUntil}天后：`;
          }
          
          // 格式化日期
          const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
          const year = festival.date.getFullYear();
          const month = festival.date.getMonth() + 1;
          const day = festival.date.getDate();
          const weekDay = weekDays[festival.date.getDay()];
          const dateStr = `（${year}年${month}月${day}日 星期${weekDay}）`;
          
          html += `<div class="future-suggestion-item">`;
          html += `<div class="future-suggestion-text"><strong>${daysText}${festival.name}</strong> <span class="festival-date">${dateStr}</span></div>`;
          html += `<div class="future-suggestion-buttons">`;
          html += `<div class="button-wrapper"><button class="future-suggestion-btn primary" data-action="festival" data-festival="${festival.name}"><span>挑选${festival.name}模板</span></button></div>`;
          html += '</div></div>';
        });
      } else {
        console.log('没有找到未来节日');
      }
      
      console.log('生成的HTML:', html);
      futureSuggestionContent.innerHTML = html;

      // 为每个智能提醒卡片添加逐个叠加动画（延迟2秒载入，间隔200ms）
      const suggestionItems = futureSuggestionContent.querySelectorAll('.future-suggestion-item');
      suggestionItems.forEach((item, index) => {
        item.classList.add('future-suggestion-item-enter');
        item.style.animationDelay = `${2000 + index * 200}ms`;
      });

      // 设置按钮背景图片
      futureSuggestionContent.querySelectorAll('.future-suggestion-btn').forEach(btn => {
        const action = btn.dataset.action;
        if (action === 'festival') {
          setButtonBackground(btn, btn.dataset.festival);
        } else {
          setButtonBackground(btn, action);
        }
        
        btn.addEventListener('click', function() {
          closeHomePopup();
          
          if (action === 'festival') {
            const festival = this.dataset.festival;
            window.openTemplateModalWithFestival(festival);
          } else if (action === 'zaoan') {
            window.openTemplateModalWithFestival('zaoan');
          } else if (action === 'wanan') {
            window.openTemplateModalWithFestival('wanan');
          }
        });
      });
      
      // 初始化按钮加载动画
      if (window.initButtonWrappers) {
        window.initButtonWrappers();
      }
      
      // 显示"加载更多"按钮
      showLoadMoreButton();
    }
    
    // 追加更多节日
    function appendMoreFestivals() {
      if (isLoadingMore) return;
      
      isLoadingMore = true;
      
      // 显示加载动画（并移到最后）
      showLoadingIndicator();
      
      // 1秒后加载新内容
      setTimeout(() => {
        const previousCount = loadedFestivalCount;
        loadedFestivalCount += 3;
        
        const futureFestivals = getFutureFestivals(loadedFestivalCount);
        
        if (!futureFestivals || futureFestivals.length <= previousCount) {
          loadedFestivalCount = previousCount;
          hideLoadingIndicator();
          showLoadMoreButton();
          isLoadingMore = false;
          return;
        }
        
        // 只获取新增的节日
        const newFestivals = futureFestivals.slice(previousCount);
        
        // 先隐藏加载动画
        hideLoadingIndicator();
        
        // 逐个添加节日卡片（带动画）
        let index = 0;
        const addItemWithAnimation = () => {
          if (index >= newFestivals.length) {
            // 所有卡片添加完成后，显示"加载更多"按钮
            showLoadMoreButton();
            isLoadingMore = false;
            return;
          }
          
          const festival = newFestivals[index];
          let daysText = `${festival.daysUntil}天后：`;
          
          // 格式化日期
          const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
          const year = festival.date.getFullYear();
          const month = festival.date.getMonth() + 1;
          const day = festival.date.getDate();
          const weekDay = weekDays[festival.date.getDay()];
          const dateStr = `（${year}年${month}月${day}日 星期${weekDay}）`;
          
          const itemHtml = `<div class="future-suggestion-item festival-item-animate">` +
            `<div class="future-suggestion-text"><strong>${daysText}${festival.name}</strong> <span class="festival-date">${dateStr}</span></div>` +
            `<div class="future-suggestion-buttons">` +
            `<div class="button-wrapper"><button class="future-suggestion-btn primary" data-action="festival" data-festival="${festival.name}">挑选模板</button></div>` +
            '</div></div>';
          
          // 在加载更多按钮前插入
          const loadMoreBtn = document.getElementById('loadMoreFestivalsBtn');
          if (loadMoreBtn) {
            loadMoreBtn.insertAdjacentHTML('beforebegin', itemHtml);
          } else {
            futureSuggestionContent.insertAdjacentHTML('beforeend', itemHtml);
          }
          
          // 为新增按钮设置背景图片和事件
          const newItems = futureSuggestionContent.querySelectorAll('.festival-item-animate:not([data-initialized])');
          const newItem = newItems[newItems.length - 1];
          if (newItem) {
            newItem.dataset.initialized = 'true';
            const btn = newItem.querySelector('.future-suggestion-btn');
            if (btn) {
              const action = btn.dataset.action;
              if (action === 'festival') {
                setButtonBackground(btn, btn.dataset.festival);
              } else {
                setButtonBackground(btn, action);
              }
              
              btn.addEventListener('click', function() {
                closeHomePopup();
                
                if (action === 'festival') {
                  const festival = this.dataset.festival;
                  window.openTemplateModalWithFestival(festival);
                } else if (action === 'zaoan') {
                  window.openTemplateModalWithFestival('zaoan');
                } else if (action === 'wanan') {
                  window.openTemplateModalWithFestival('wanan');
                }
              });
              
              // 初始化新增按钮的加载动画
              if (window.initButtonWrappers) {
                window.initButtonWrappers();
              }
            }
          }
          
          // 滚动到底部
          scrollToBottom();
          
          index++;
          // 等待动画完成后添加下一个
          setTimeout(addItemWithAnimation, 500);
        };
        
        addItemWithAnimation();
      }, 1000);
    }
    
    // 滚动到底部
    function scrollToBottom() {
      const scrollContainer = homePopup.querySelector('.modal-body.scrollable-body');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
    
    // 显示"加载更多"按钮
    function showLoadMoreButton() {
      let loadMoreBtn = document.getElementById('loadMoreFestivalsBtn');
      if (!loadMoreBtn) {
        loadMoreBtn = document.createElement('div');
        loadMoreBtn.id = 'loadMoreFestivalsBtn';
        loadMoreBtn.className = 'load-more-festivals-btn';
        loadMoreBtn.innerHTML = '<span>加载更多</span>';
        loadMoreBtn.addEventListener('click', appendMoreFestivals);
        futureSuggestionContent.appendChild(loadMoreBtn);
      }
      loadMoreBtn.style.display = 'flex';
    }
    
    // 隐藏"加载更多"按钮
    function hideLoadMoreButton() {
      const loadMoreBtn = document.getElementById('loadMoreFestivalsBtn');
      if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
      }
    }
    
    // 显示加载动画（始终放在最后）
    function showLoadingIndicator() {
      hideLoadMoreButton();
      let loadingDiv = document.getElementById('festivalLoadingIndicator');
      if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'festivalLoadingIndicator';
        loadingDiv.className = 'festival-loading-indicator';
        loadingDiv.innerHTML = '<div class="loading-spinner"></div><span>加载中...</span>';
      }
      // 移到最后
      futureSuggestionContent.appendChild(loadingDiv);
      loadingDiv.style.display = 'flex';
    }
    
    // 隐藏加载动画
    function hideLoadingIndicator() {
      const loadingDiv = document.getElementById('festivalLoadingIndicator');
      if (loadingDiv) {
        loadingDiv.style.display = 'none';
      }
    }
  }
  
  // 初始化编辑页首页弹窗
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initEditorHomePopup();
    });
  } else {
    initEditorHomePopup();
  }

  // 非VIP用户温馨提示弹窗
  function initFreeQuotaReminder() {
    const STORAGE_KEY = 'freeQuotaReminderLastShown';
    const INTERVAL_MS = 60 * 60 * 1000; // 1小时

    function shouldShowReminder() {
      const lastShown = localStorage.getItem(STORAGE_KEY);
      if (!lastShown) return true; // 从未显示过
      return (Date.now() - parseInt(lastShown)) >= INTERVAL_MS;
    }

    async function checkAndShowReminder() {
      // 未登录不显示
      if (typeof VIPSystem === 'undefined' || !VIPSystem.isLoggedIn()) return;

      try {
        // 检查VIP状态
        const userId = VIPSystem.getUserId();
        const userInfo = VIPSystem.getUserInfo();
        const phone = userInfo ? userInfo.phone : null;
        if (!userId && !phone) return;

        const vipResult = await VIPSystem.checkVipStatus(userId, phone);
        if (vipResult.success && vipResult.data && vipResult.data.isVip) return; // VIP不显示

        // 获取下载次数
        const quotaResult = await VIPSystem.getDownloadQuota();
        if (!quotaResult.success || !quotaResult.data) return;
        const quota = quotaResult.data.downloadQuota;
        if (quota <= 0) return; // 次数用完不显示

        // 检查是否需要显示
        if (!shouldShowReminder()) return;

        // 显示温馨提示
        showFreeQuotaReminderModal(quota);
      } catch (e) {
        console.warn('温馨提示检查失败:', e);
      }
    }

    function showFreeQuotaReminderModal(quota) {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());

      let modal = document.getElementById('freeQuotaReminderModal');
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = 'freeQuotaReminderModal';
      modal.className = 'global-modal-overlay';
      modal.style.zIndex = '10001';

      modal.innerHTML = `
        <div class="global-modal-card">
          <h3 class="modal-title">温馨提醒</h3>
          <p class="modal-desc">您还可以免费下载 <br><span class="modal-highlight">${quota}</span> 张品牌节日宣传海报哟~</p>
          
          <button id="freeQuotaGotItBtn" class="global-modal-btn global-modal-btn-secondary">知道了</button>
          
        </div>
      `;

      document.body.appendChild(modal);

      document.getElementById('freeQuotaGotItBtn').addEventListener('click', () => {
        modal.remove();
      });

      document.getElementById('freeQuotaUpgradeBtn').addEventListener('click', () => {
        modal.remove();
        if (typeof window.showVipUpgradeModal === 'function') {
          window.showVipUpgradeModal();
        }
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
    }

    // 页面加载后延迟2秒显示，避免与其他弹窗冲突
    setTimeout(checkAndShowReminder, 2000);
  }

  // 初始化温馨提示
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initFreeQuotaReminder();
    });
  } else {
    initFreeQuotaReminder();
  }