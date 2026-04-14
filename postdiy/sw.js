const CACHE_NAME = 'postdiy-cache-v1';
const STATIC_CACHE_NAME = 'postdiy-static-v1';
const IMAGE_CACHE_NAME = 'postdiy-images-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/editor.html',
  '/editor-script.js',
  '/cloud-sync.js',
  '/styles.css',
  '/images/statics/logo-default.gif',
  '/images/statics/qrcode-default.gif'
];

const CACHE_CONFIG = {
  maxAge: 1 * 60 * 60 * 1000,
  staleWhileRevalidate: 24 * 60 * 60 * 1000
};

self.addEventListener('install', (event) => {
  console.log('[Service Worker] 安装中...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] 缓存静态资源');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] 激活中...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            console.log('[Service Worker] 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (isImageRequest(event.request)) {
    event.respondWith(handleImageRequest(event.request));
  } else if (isStaticAsset(event.request)) {
    event.respondWith(handleStaticRequest(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }
});

function isImageRequest(request) {
  const url = new URL(request.url);
  return request.destination === 'image' || 
         url.pathname.includes('/user-images/') ||
         url.pathname.includes('cloudflare') ||
         url.hostname.includes('myqcloud.com') ||
         url.hostname.includes('cloudflare');
}

function isStaticAsset(request) {
  return request.destination === 'style' ||
         request.destination === 'script' ||
         request.destination === 'document';
}

async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    const cacheDate = cachedResponse.headers.get('sw-cache-date');
    if (cacheDate) {
      const age = Date.now() - parseInt(cacheDate);
      
      if (age < CACHE_CONFIG.maxAge) {
        console.log('[Service Worker] 图片缓存新鲜:', request.url);
        return cachedResponse;
      }
      
      if (age < CACHE_CONFIG.staleWhileRevalidate) {
        console.log('[Service Worker] 图片缓存过期但在宽限期内:', request.url);
        updateImageCache(request, cache);
        return cachedResponse;
      }
    }
  }
  
  console.log('[Service Worker] 获取新图片:', request.url);
  return fetchAndCacheImage(request, cache);
}

async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('[Service Worker] 静态资源命中:', request.url);
    return cachedResponse;
  }
  
  console.log('[Service Worker] 获取静态资源:', request.url);
  return fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });
}

async function updateImageCache(request, cache) {
  console.log('[Service Worker] 后台更新图片缓存:', request.url);
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const headers = new Headers(response.headers);
      headers.set('sw-cache-date', Date.now().toString());
      const cachedResponse = new Response(await response.clone().blob(), {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
      cache.put(request, cachedResponse);
    }
  } catch (e) {
    console.error('[Service Worker] 后台更新失败:', e);
  }
}

async function fetchAndCacheImage(request, cache) {
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const headers = new Headers(response.headers);
      headers.set('sw-cache-date', Date.now().toString());
      const cachedResponse = new Response(await response.clone().blob(), {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
      cache.put(request, cachedResponse);
    }
    return response;
  } catch (e) {
    console.error('[Service Worker] 图片获取失败:', e);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('', { status: 404 });
  }
}
