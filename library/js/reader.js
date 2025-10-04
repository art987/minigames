// 全局变量
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let zoom = 1;
let pagePreviews = [];
let isPagePreviewVisible = false;
let isZoomControlsVisible = false;
let bookPath = '';
let bookTitle = '';

// DOM元素
const backBtn = document.getElementById('back-btn');
const bookTitleElement = document.getElementById('book-title');
const togglePreviewBtn = document.getElementById('toggle-preview-btn');
const zoomControlsBtn = document.getElementById('zoom-controls-btn');
const currentPageElement = document.getElementById('current-page');
const totalPagesElement = document.getElementById('total-pages');
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const loadingIndicator = document.getElementById('loading-indicator');
const bookContainer = document.getElementById('book-container');
const pagePreviewContainer = document.getElementById('page-preview');
const closePreviewBtn = document.getElementById('close-preview-btn');
const previewGrid = document.getElementById('preview-grid');
const zoomControlsContainer = document.getElementById('zoom-controls');

// 设置PDF.js worker路径
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// 初始化应用
function init() {
    // 从URL获取书籍信息
    const urlParams = new URLSearchParams(window.location.search);
    bookPath = urlParams.get('path');
    bookTitle = urlParams.get('title') || '未知书籍';
    
    // 更新页面标题
    document.title = bookTitle + ' - 我的书库';
    bookTitleElement.textContent = bookTitle;
    
    // 绑定事件监听器
    backBtn.addEventListener('click', goBack);
    togglePreviewBtn.addEventListener('click', togglePagePreview);
    closePreviewBtn.addEventListener('click', togglePagePreview);
    zoomControlsBtn.addEventListener('click', toggleZoomControls);
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    
    // 初始化触摸事件
    initTouchEvents();
    
    // 创建翻页声音
    createPageTurnSound();
    
    // 加载PDF文件
    if (bookPath) {
        loadPDFfromURL(bookPath);
    } else {
        showError('没有找到要阅读的书籍');
    }
}

// 加载PDF文件
function loadPDFfromURL(url) {
    // 重置状态
    currentPage = 1;
    zoom = 1;
    pagePreviews = [];
    
    // 显示加载指示器
    loadingIndicator.classList.remove('hidden');
    bookContainer.classList.add('hidden');
    
    // 使用PDF.js加载远程PDF
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        pdfDoc = pdf;
        totalPages = pdf.numPages;
        totalPagesElement.textContent = totalPages;
        
        // 隐藏加载指示器，显示书籍容器
        loadingIndicator.classList.add('hidden');
        bookContainer.classList.remove('hidden');
        
        // 加载并显示当前页
        renderPage(currentPage);
        
        // 生成页面预览
        generatePagePreviews();
        
        // 更新按钮状态
        updateButtonStates();
    }).catch(function(error) {
        console.error('加载PDF失败:', error);
        showError('无法加载该PDF文件，请稍后重试');
    });
}

// 显示错误信息
function showError(message) {
    loadingIndicator.innerHTML = '<i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 20px; color: #ff5252;"></i><p>' + message + '</p>';
    loadingIndicator.classList.remove('hidden');
    bookContainer.classList.add('hidden');
}

// 渲染指定页面
function renderPage(pageNum) {
    if (!pdfDoc) return;
    
    pdfDoc.getPage(pageNum).then(function(page) {
        // 设置视图大小
        const viewport = page.getViewport({ scale: zoom });
        
        // 创建或获取画布
        let canvas = bookContainer.querySelector('canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            bookContainer.appendChild(canvas);
        }
        
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // 渲染页面到画布
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
            // 更新当前页码显示
            currentPageElement.textContent = pageNum;
        });
    });
}

// 生成页面预览
function generatePagePreviews() {
    if (!pdfDoc) return;
    
    previewGrid.innerHTML = '';
    pagePreviews = [];
    
    // 一次性加载所有页面预览
    for (let i = 1; i <= totalPages; i++) {
        (function(pageNum) {
            pdfDoc.getPage(pageNum).then(function(page) {
                // 创建小尺寸预览
                const viewport = page.getViewport({ scale: 0.2 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                // 创建预览项容器
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.dataset.page = pageNum;
                if (pageNum === currentPage) {
                    previewItem.classList.add('active');
                }
                previewItem.appendChild(canvas);
                
                // 绑定点击事件跳转到对应页面
                previewItem.addEventListener('click', function() {
                    const page = parseInt(this.dataset.page);
                    currentPage = page;
                    renderPage(currentPage);
                    updateButtonStates();
                    
                    // 更新预览项的高亮状态
                    pagePreviews.forEach(function(item) {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');
                });
                
                // 渲染预览到画布
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                page.render(renderContext).promise.then(function() {
                    previewGrid.appendChild(previewItem);
                    pagePreviews.push(previewItem);
                });
            });
        })(i);
    }
}

// 前往上一页
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        playPageTurnSound();
        renderPage(currentPage);
        updateButtonStates();
        updatePreviewActiveState();
    }
}

// 前往下一页
function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        playPageTurnSound();
        renderPage(currentPage);
        updateButtonStates();
        updatePreviewActiveState();
    }
}

// 放大页面
function zoomIn() {
    if (zoom < 3) {
        zoom += 0.2;
        renderPage(currentPage);
        updateButtonStates();
    }
}

// 缩小页面
function zoomOut() {
    if (zoom > 0.5) {
        zoom -= 0.2;
        renderPage(currentPage);
        updateButtonStates();
    }
}

// 更新按钮状态
function updateButtonStates() {
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages;
    zoomInBtn.disabled = zoom >= 3;
    zoomOutBtn.disabled = zoom <= 0.5;
}

// 更新预览项的高亮状态
function updatePreviewActiveState() {
    pagePreviews.forEach(function(preview) {
        if (parseInt(preview.dataset.page) === currentPage) {
            preview.classList.add('active');
        } else {
            preview.classList.remove('active');
        }
    });
}

// 切换页面预览显示状态
function togglePagePreview() {
    isPagePreviewVisible = !isPagePreviewVisible;
    
    if (isPagePreviewVisible) {
        pagePreviewContainer.classList.remove('hidden');
        // 如果还没有生成预览，则生成
        if (pagePreviews.length === 0 && pdfDoc) {
            generatePagePreviews();
        }
    } else {
        pagePreviewContainer.classList.add('hidden');
    }
}

// 切换缩放控制面板显示状态
function toggleZoomControls() {
    isZoomControlsVisible = !isZoomControlsVisible;
    
    if (isZoomControlsVisible) {
        zoomControlsContainer.classList.remove('hidden');
    } else {
        zoomControlsContainer.classList.add('hidden');
    }
}

// 返回书籍列表
function goBack() {
    window.location.href = 'index.html';
}

// 初始化触摸事件
function initTouchEvents() {
    let startX, startY;
    let startTime;
    let scale = 1;
    let initialDistance = null;
    let initialScale = 1;
    let isLongPressing = false;
    let longPressTimer;
    
    // 触摸开始
    bookContainer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
            
            // 长按检测
            longPressTimer = setTimeout(function() {
                isLongPressing = true;
                toggleZoomControls();
            }, 800);
        } else if (e.touches.length === 2) {
            clearTimeout(longPressTimer);
            // 计算两指之间的距离用于缩放
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const dx = touch2.clientX - touch1.clientX;
            const dy = touch2.clientY - touch1.clientY;
            initialDistance = Math.sqrt(dx * dx + dy * dy);
            initialScale = zoom;
        }
    });
    
    // 触摸移动
    bookContainer.addEventListener('touchmove', function(e) {
        // 防止滚动
        e.preventDefault();
        
        if (e.touches.length === 2 && initialDistance !== null) {
            clearTimeout(longPressTimer);
            // 计算两指之间的当前距离
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const dx = touch2.clientX - touch1.clientX;
            const dy = touch2.clientY - touch1.clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 计算缩放比例
            scale = initialScale * (distance / initialDistance);
            
            // 限制缩放范围
            if (scale >= 0.5 && scale <= 3) {
                zoom = scale;
                renderPage(currentPage);
                updateButtonStates();
            }
        } else if (e.touches.length === 1) {
            // 如果有移动，取消长按
            if (!isLongPressing) {
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = Math.abs(currentX - startX);
                const diffY = Math.abs(currentY - startY);
                
                if (diffX > 10 || diffY > 10) {
                    clearTimeout(longPressTimer);
                }
            }
        }
    });
    
    // 触摸结束
    bookContainer.addEventListener('touchend', function(e) {
        clearTimeout(longPressTimer);
        
        if (e.changedTouches.length === 1 && !isLongPressing) {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = endX - startX;
            const diffY = endY - startY;
            const duration = Date.now() - startTime;
            
            // 判断是否为快速滑动
            if (duration < 300 && Math.abs(diffX) > 50 && Math.abs(diffY) < 100) {
                if (diffX > 0) {
                    // 向右滑动，上一页
                    goToPrevPage();
                } else {
                    // 向左滑动，下一页
                    goToNextPage();
                }
            } else if (duration >= 300) {
                // 点击翻页
                const rect = this.getBoundingClientRect();
                const tapX = e.changedTouches[0].clientX - rect.left;
                
                if (tapX < rect.width / 2) {
                    goToPrevPage();
                } else {
                    goToNextPage();
                }
            }
        } else if (e.touches.length === 0) {
            initialDistance = null;
            isLongPressing = false;
        }
    });
}

// 创建翻页声音
function createPageTurnSound() {
    // 尝试创建音频元素
    let audio = null;
    
    try {
        audio = new Audio('./audio/page_turn_simple.mp3');
        
        // 为了解决移动设备上音频播放的限制，添加用户交互时的音频预加载
        document.addEventListener('click', function preloadAudio() {
            if (audio) {
                audio.load();
            }
            document.removeEventListener('click', preloadAudio);
        }, { once: true });
    } catch (error) {
        console.log('创建音频元素失败:', error);
    }
    
    // 定义播放翻页声音的全局函数
    window.playPageTurnSound = function() {
        try {
            if (audio) {
                // 克隆音频元素以允许多次连续播放
                const audioClone = audio.cloneNode();
                audioClone.volume = 0.5;
                audioClone.play().catch(function(playError) {
                    console.log('音频播放失败:', playError);
                    // 可以在这里添加回退方案，如使用Web Audio API
                });
            }
        } catch (error) {
            console.log('播放声音时出错:', error);
        }
    };
}

// 监听设备方向变化
window.addEventListener('orientationchange', function() {
    // 延迟重新渲染，让DOM有时间适应新的方向
    setTimeout(function() {
        if (pdfDoc) {
            renderPage(currentPage);
        }
    }, 300);
});

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', init);