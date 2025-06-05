// main.js - 完整修复版

let modalOverlay, modalImage, modalClose, mySwiper;

// 使用load事件确保所有资源加载完成
window.addEventListener('load', function() {
    console.log("页面完全加载，开始初始化");
    initModalElements();
    
    if (typeof galleryData === 'undefined') {
        console.error('galleryData 未定义，请确保 gallery-data.js 已正确加载');
        return;
    }
    
    console.log("galleryData 数据:", galleryData);
    initGallery();
});

// 初始化模态框元素（单独封装）
function initModalElements() {
    modalOverlay = document.getElementById('modal-overlay');
    modalImage = document.getElementById('modal-image');
    modalClose = document.getElementById('modal-close');
    
    console.log('模态框元素检查:', {
        overlay: modalOverlay,
        image: modalImage,
        close: modalClose
    });

    // 如果模态框元素不存在则创建（兜底逻辑）
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'modal-overlay';
        modalOverlay.className = 'modal-overlay';
        document.body.appendChild(modalOverlay);
    }
    
    if (!modalImage) {
        const container = modalOverlay.querySelector('.modal-container') || 
                        document.createElement('div');
        container.className = 'modal-container';
        
        modalImage = document.createElement('img');
        modalImage.id = 'modal-image';
        modalImage.className = 'modal-image';
        container.prepend(modalImage);
        
        if (!modalOverlay.contains(container)) {
            modalOverlay.appendChild(container);
        }
    }
    
    if (!modalClose) {
        const container = modalOverlay.querySelector('.modal-container') || 
                        modalOverlay.querySelector('div') || 
                        document.createElement('div');
        container.className = 'modal-container';
        
        modalClose = document.createElement('button');
        modalClose.id = 'modal-close';
        modalClose.className = 'modal-close';
        modalClose.innerHTML = '&times;';
        container.appendChild(modalClose);
        
        if (!modalOverlay.contains(container)) {
            modalOverlay.appendChild(container);
        }
    }
}

// 初始化画廊
function initGallery() {
    const swiperWrapper = document.getElementById('swiper-wrapper');
    
    if (!galleryData || !Array.isArray(galleryData)) {
        console.error('galleryData 不可用或不是数组');
        return;
    }
    
    // 清空现有幻灯片（防止重复初始化）
    swiperWrapper.innerHTML = '';
    
    // 创建幻灯片
    galleryData.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.dataset.id = item.id;
       
		
		 // ✅ 关键修复：插入 <img> 标签，并绑定图片链接和标题
        slide.innerHTML = `
            <img 
                src="${item.imageUrl}" 
                alt="${item.title}" 
                class="swiper-slide-img"
            >
        `;
		
		
		
        swiperWrapper.appendChild(slide);
    });

    // 初始化Swiper
    mySwiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: true
        },
        on: {
            slideChange: updateCardInfo
        }
    });
    
    // 绑定事件（使用事件委托）
    initEventDelegation();
    updateCardInfo();
}

// 使用事件委托处理动态内容
function initEventDelegation() {
    // 全局点击事件
    document.addEventListener('click', function(e) {
        // 1. 处理图片点击
        if (e.target.classList.contains('swiper-slide-img')) {
            showFullscreenImage(e.target.src);
            return;
        }
        
        // 2. 处理放大按钮
        if (e.target.id === 'zoom-btn') {
            const activeSlide = document.querySelector('.swiper-slide-active');
            if (activeSlide) {
                const img = activeSlide.querySelector('img');
                if (img) showFullscreenImage(img.src);
            }
            return;
        }
        
        // 3. 处理关闭操作
        if (e.target === modalOverlay || e.target.id === 'modal-close') {
            closeFullscreenImage();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'block') {
            closeFullscreenImage();
        }
    });
}

// 更新卡片信息
function updateCardInfo() {
    if (!mySwiper || !galleryData) return;
    
    const activeIndex = mySwiper.activeIndex;
    const currentData = galleryData[activeIndex % galleryData.length];
    
    const titleEl = document.getElementById('card-title');
    const subtitleEl = document.getElementById('card-subtitle');
    
    if (titleEl) titleEl.textContent = currentData.title;
    if (subtitleEl) subtitleEl.textContent = currentData.description;
}

// 显示全屏图片（增强版）
function showFullscreenImage(imageUrl) {
    if (!modalImage || !modalOverlay) {
        console.error('模态框元素未初始化，当前DOM:', document.body.innerHTML);
        return;
    }
    
    console.log('显示全屏图片:', imageUrl);
    
    // 预加载图片
    const img = new Image();
    img.onload = function() {
        modalImage.src = imageUrl;
        modalOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 居中显示
        modalImage.style.maxHeight = '90vh';
        modalImage.style.maxWidth = '90vw';
    };
    img.onerror = function() {
        console.error('图片加载失败:', imageUrl);
        alert('图片加载失败，请检查网络连接');
    };
    img.src = imageUrl;
}

// 关闭全屏图片
function closeFullscreenImage() {
    if (!modalOverlay) return;
    
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
    modalImage.src = ''; // 清空图片
}

// 下载图片功能
function downloadImage() {
    if (!mySwiper || !galleryData) return;
    
    const activeIndex = mySwiper.activeIndex;
    const currentData = galleryData[activeIndex % galleryData.length];
    
    const link = document.createElement('a');
    link.href = currentData.imageUrl;
    link.download = `${currentData.title.replace(/\s+/g, '_')}.jpg`;
    
    // 添加临时链接到DOM
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // 触发下载
    setTimeout(() => {
        link.click();
        document.body.removeChild(link);
    }, 100);
}

// 暴露调试方法
window.debugGallery = {
    showCurrentImage: function() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            const img = activeSlide.querySelector('img');
            if (img) showFullscreenImage(img.src);
        }
    },
    checkElements: function() {
        return {
            modal: {
                overlay: modalOverlay,
                image: modalImage,
                close: modalClose
            },
            activeSlide: document.querySelector('.swiper-slide-active'),
            swiper: mySwiper
        };
    }
};