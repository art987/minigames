// 按钮背景图片加载动画
(function() {
    'use strict';

    // 为所有 .button-wrapper 元素初始化加载动画
    function initButtonWrappers() {
        const wrappers = document.querySelectorAll('.button-wrapper');
        
        wrappers.forEach(wrapper => {
            if (wrapper.dataset.loaded) return; // 已经加载过的跳过
            
            const bgImage = wrapper.dataset.originalPath || 
                          getComputedStyle(wrapper).getPropertyValue('--button-bg-image').replace(/url\(['"]?|['"]?\)/g, '');
            
            if (!bgImage || bgImage === 'none' || bgImage === '') {
                markAsLoaded(wrapper);
                return;
            }

            // 添加加载状态类
            wrapper.classList.add('loading');
            wrapper.dataset.loaded = 'false';
            
            // 添加加载动画元素（完整填充的进度条 + 光泽效果）
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            
            const loadingProgress = document.createElement('div');
            loadingProgress.className = 'loading-progress';
            
            const loadingSheen = document.createElement('div');
            loadingSheen.className = 'loading-sheen';
            
            loadingProgress.appendChild(loadingSheen);
            loadingOverlay.appendChild(loadingProgress);
            wrapper.insertBefore(loadingOverlay, wrapper.firstChild);
            
            // 预加载图片
            preloadImage(wrapper, bgImage);
        });
    }

    // 预加载图片
    function preloadImage(wrapper, imageUrl) {
        const img = new Image();
        
        img.onload = function() {
            // 图片加载完成后，延迟一小段时间再切换
            setTimeout(() => {
                markAsLoaded(wrapper);
            }, 500);
        };
        
        img.onerror = function() {
            console.warn('图片加载失败:', imageUrl);
            // 优雅降级：直接标记为加载完成
            markAsLoaded(wrapper);
        };
        
        img.src = imageUrl;
        
        // 超时保护，2秒后强制完成
        setTimeout(() => {
            if (wrapper.dataset.loaded !== 'true') {
                markAsLoaded(wrapper);
            }
        }, 2000);
    }

    // 标记为加载完成
    function markAsLoaded(wrapper) {
        wrapper.classList.remove('loading');
        wrapper.classList.add('loaded');
        wrapper.dataset.loaded = 'true';
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initButtonWrappers);
    } else {
        initButtonWrappers();
    }

    // 暴露给全局，以便动态添加内容时可以重新初始化
    window.initButtonWrappers = initButtonWrappers;
})();
