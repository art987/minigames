// 全局变量
let recipientNickname = "亲爱的宝贝";
let selectedCardId = null;
// 图片调整相关变量
let currentScale = 1;
let currentPosition = { x: 0, y: 0 };
let uploadedImageSrc = '';

// DOM元素
const nicknameModal = document.getElementById('nickname-modal');
const recipientNicknameInput = document.getElementById('recipient-nickname');
const confirmNicknameBtn = document.getElementById('confirm-nickname');
const cardSelection = document.getElementById('card-selection');
const cardEditor = document.getElementById('card-editor');
const backToSelectionBtn = document.getElementById('back-to-selection');
const editorContainer = document.querySelector('.editor-container');
const categoryBtns = document.querySelectorAll('.category-btn');
const cardItems = document.querySelectorAll('.card-item');
const recipientNameInput = document.getElementById('recipient-name');
const greetingTemplateSelect = document.getElementById('greeting-template');
const greetingTextInput = document.getElementById('greeting-text');
const senderNameInput = document.getElementById('sender-name');
const cardDateInput = document.getElementById('card-date');
const backgroundOptions = document.querySelectorAll('.background-option');
const generateCardBtn = document.getElementById('generate-card');
const cardPreview = document.querySelector('.card-preview .card-content');
const previewRecipientName = document.querySelector('.recipient-name');
const previewGreetingMessage = document.querySelector('.greeting-message');
const previewSenderName = document.querySelector('.sender-name');
const previewCardDate = document.querySelector('.card-date');
const uploadBackgroundBtn = document.getElementById('upload-background');
const backgroundFileInput = document.getElementById('background-file-input');
const imageAdjustModal = document.getElementById('image-adjust-modal');
const adjustableImage = document.getElementById('adjustable-image');
const imageAdjustWrapper = document.getElementById('image-adjust-wrapper');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const moveUpBtn = document.getElementById('move-up');
const moveDownBtn = document.getElementById('move-down');
const moveLeftBtn = document.getElementById('move-left');
const moveRightBtn = document.getElementById('move-right');
const cancelAdjustBtn = document.getElementById('cancel-adjust');
const confirmAdjustBtn = document.getElementById('confirm-adjust');
// 视图切换相关元素
const editPanel = document.getElementById('edit-panel');
const previewPanel = document.getElementById('preview-panel');
const editToggleBtn = document.getElementById('edit-toggle');
const previewToggleBtn = document.getElementById('preview-toggle');

// 初始化
function init() {
    // 设置默认日期
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    cardDateInput.value = formattedDate;
    
    // 绑定事件监听器
    bindEventListeners();
}

// 绑定事件监听器
function bindEventListeners() {
    // 初始对话框
    recipientNicknameInput.addEventListener('focus', function() {
        if (this.value === '亲爱的宝贝') {
            this.value = '';
        }
    });
    
    confirmNicknameBtn.addEventListener('click', function() {
        if (recipientNicknameInput.value.trim()) {
            recipientNickname = recipientNicknameInput.value.trim();
        }
        nicknameModal.classList.add('hidden');
        cardSelection.classList.remove('hidden');
    });
    
    // 分类导航
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新活跃状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 过滤卡片
            const category = this.dataset.category;
            cardItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 选择卡片
    cardItems.forEach(item => {
        item.addEventListener('click', function() {
            selectedCardId = this.dataset.id;
            
            // 设置默认收卡人名称
            recipientNameInput.value = recipientNickname;
            
            // 设置默认背景
            const category = this.dataset.category;
            const defaultBackground = `images/${selectedCardId}.jpg`;
            cardPreview.style.backgroundImage = `url('${defaultBackground}')`;
            
            // 更新预览
            updatePreview();
            
            // 显示编辑页面
            cardSelection.classList.add('hidden');
            cardEditor.classList.remove('hidden');
        });
    });
    
    // 返回选择页面
    backToSelectionBtn.addEventListener('click', function() {
        cardEditor.classList.add('hidden');
        cardSelection.classList.remove('hidden');
    });
    
    // 视图切换功能
    function switchToEditMode() {
        editToggleBtn.classList.add('active');
        previewToggleBtn.classList.remove('active');
        editPanel.style.display = 'block';
        previewPanel.style.display = 'block';
        // 桌面端保持并排显示
        editorContainer.style.display = 'flex';
    }
    
    function switchToPreviewMode() {
        editToggleBtn.classList.remove('active');
        previewToggleBtn.classList.add('active');
        editPanel.style.display = 'none';
        previewPanel.style.display = 'block';
        // 预览模式下预览面板占满宽度
        editorContainer.style.display = 'block';
        previewPanel.style.maxWidth = 'none';
    }
    
    // 编辑模式切换
    editToggleBtn.addEventListener('click', switchToEditMode);
    
    // 预览模式切换
    previewToggleBtn.addEventListener('click', switchToPreviewMode);
    
    // 背景选择
    backgroundOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 更新活跃状态
            backgroundOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // 更新背景
            const imgSrc = this.dataset.img;
            cardPreview.style.backgroundImage = `url('${imgSrc}')`;
        });
    });
    
    // 祝福语模板选择
    greetingTemplateSelect.addEventListener('change', function() {
        if (this.value) {
            greetingTextInput.value = this.value;
            updatePreview();
        }
    });
    
    // 实时更新预览
    recipientNameInput.addEventListener('input', updatePreview);
    greetingTextInput.addEventListener('input', updatePreview);
    senderNameInput.addEventListener('input', updatePreview);
    cardDateInput.addEventListener('change', updatePreview);
    
    // 生成并下载贺卡
    generateCardBtn.addEventListener('click', generateAndDownloadCard);
    
    // 本地图片上传
    uploadBackgroundBtn.addEventListener('click', function() {
        backgroundFileInput.click();
    });
    
    // 初始化图片调整相关变量
    currentScale = 1;
    currentPosition = { x: 0, y: 0 };
    uploadedImageSrc = '';
    
    // 将图片居中显示
    function centerImage() {
        // 等待DOM更新，确保获取到正确的尺寸
        setTimeout(() => {
            const wrapperRect = imageAdjustWrapper.getBoundingClientRect();
            const imageRect = adjustableImage.getBoundingClientRect();
            
            // 计算合适的缩放比例，确保图片能完整显示
            const scaleX = wrapperRect.width / imageRect.width;
            const scaleY = wrapperRect.height / imageRect.height;
            const fitScale = Math.min(scaleX, scaleY, 1); // 不超过原始尺寸
            
            // 如果图片比容器小，保持原始尺寸并居中
            if (imageRect.width < wrapperRect.width && imageRect.height < wrapperRect.height) {
                currentScale = 1;
                // 计算居中位置
                currentPosition = { 
                    x: (wrapperRect.width - imageRect.width) / 2,
                    y: (wrapperRect.height - imageRect.height) / 2
                };
            } else {
                currentScale = fitScale;
                currentPosition = { x: 0, y: 0 };
            }
            
            updateImageTransform();
        }, 100);
    }
    
    backgroundFileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                uploadedImageSrc = event.target.result;
                // 重置图片调整参数
                currentScale = 1;
                currentPosition = { x: 0, y: 0 };
                
                // 设置图片并显示调整模态框
                adjustableImage.src = uploadedImageSrc;
                // 等待图片加载完成后再调整居中
                adjustableImage.onload = function() {
                    imageAdjustModal.classList.remove('hidden');
                    centerImage();
                };
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // 图片调整功能
    zoomInBtn.addEventListener('click', function() {
        currentScale += 0.1;
        updateImageTransform();
    });
    
    zoomOutBtn.addEventListener('click', function() {
        if (currentScale > 0.5) {
            currentScale -= 0.1;
            updateImageTransform();
        }
    });
    
    moveUpBtn.addEventListener('click', function() {
        currentPosition.y -= 20;
        updateImageTransform();
    });
    
    moveDownBtn.addEventListener('click', function() {
        currentPosition.y += 20;
        updateImageTransform();
    });
    
    moveLeftBtn.addEventListener('click', function() {
        currentPosition.x -= 20;
        updateImageTransform();
    });
    
    moveRightBtn.addEventListener('click', function() {
        currentPosition.x += 20;
        updateImageTransform();
    });
    
    // 取消调整
    cancelAdjustBtn.addEventListener('click', function() {
        imageAdjustModal.classList.add('hidden');
    });
    
    // 确认调整
    confirmAdjustBtn.addEventListener('click', function() {
        // 创建一个临时canvas来裁剪图片
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            // 设置canvas尺寸为贺卡预览尺寸
            canvas.width = 500;
            canvas.height = 650;
            
            // 计算图片在canvas上的绘制位置和尺寸
            const imgWidth = img.width * currentScale;
            const imgHeight = img.height * currentScale;
            
            // 计算图片居中时的起始位置
            const startX = (canvas.width - imgWidth) / 2 + currentPosition.x;
            const startY = (canvas.height - imgHeight) / 2 + currentPosition.y;
            
            // 绘制图片
            ctx.drawImage(img, startX, startY, imgWidth, imgHeight);
            
            // 将canvas转换为图片URL并设置为贺卡背景
            const croppedImageSrc = canvas.toDataURL('image/png');
            cardPreview.style.backgroundImage = `url('${croppedImageSrc}')`;
            
            // 关闭调整模态框
            imageAdjustModal.classList.add('hidden');
        };
        
        img.src = uploadedImageSrc;
    });
    
    // 初始化移动端触摸事件
    handleMobileTouchEvents();
}

// 更新预览
function updatePreview() {
    previewRecipientName.textContent = recipientNameInput.value || '亲爱的宝贝';
    previewGreetingMessage.textContent = greetingTextInput.value || '选择一段祝福语，或者自己输入想说的话...';
    
    const senderName = senderNameInput.value.trim();
    previewSenderName.textContent = senderName ? `—— ${senderName}` : '';
    
    const date = cardDateInput.value;
    if (date) {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        previewCardDate.textContent = `${year}年${month}月${day}日`;
    }
}

// 生成并下载贺卡
function generateAndDownloadCard() {
    // 显示加载提示
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '50%';
    loadingIndicator.style.left = '50%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadingIndicator.style.color = 'white';
    loadingIndicator.style.padding = '20px 30px';
    loadingIndicator.style.borderRadius = '10px';
    loadingIndicator.style.zIndex = '2000';
    loadingIndicator.style.fontSize = '16px';
    loadingIndicator.textContent = '正在生成贺卡...';
    document.body.appendChild(loadingIndicator);
    
    // 先隐藏编辑面板，只保留预览区域
    const editPanel = document.querySelector('.edit-panel');
    editPanel.style.display = 'none';
    
    // 调整预览面板以确保卡片居中
    const previewPanel = document.querySelector('.preview-panel');
    previewPanel.style.justifyContent = 'center';
    previewPanel.style.alignItems = 'center';
    previewPanel.style.minHeight = '100vh';
    
    // 滚动到顶部
    window.scrollTo(0, 0);
    
    // 等待DOM更新
    setTimeout(() => {
        // 使用html2canvas捕获卡片
        const cardElement = document.querySelector('.card-preview');
        
        html2canvas(cardElement, {
            backgroundColor: null,
            scale: window.innerWidth < 768 ? 1.5 : 2, // 根据屏幕宽度调整分辨率
            logging: false,
            useCORS: true, // 允许跨域图片
            allowTaint: true
        }).then(canvas => {
            // 恢复编辑面板显示
            editPanel.style.display = 'block';
            previewPanel.style.minHeight = '70vh';
            
            // 移除加载提示
            document.body.removeChild(loadingIndicator);
            
            // 创建下载链接
            const link = document.createElement('a');
            const filename = `${recipientNameInput.value || '贺卡'}.png`;
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            
            // 移动端适配：有些设备需要额外处理
            if (navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/i)) {
                // 创建一个临时图片查看器
                const tempImageViewer = document.createElement('div');
                tempImageViewer.style.position = 'fixed';
                tempImageViewer.style.top = '0';
                tempImageViewer.style.left = '0';
                tempImageViewer.style.width = '100%';
                tempImageViewer.style.height = '100%';
                tempImageViewer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                tempImageViewer.style.zIndex = '1500';
                tempImageViewer.style.display = 'flex';
                tempImageViewer.style.flexDirection = 'column';
                tempImageViewer.style.justifyContent = 'center';
                tempImageViewer.style.alignItems = 'center';
                
                const tempImage = document.createElement('img');
                tempImage.src = canvas.toDataURL('image/png');
                tempImage.style.maxWidth = '90%';
                tempImage.style.maxHeight = '70%';
                
                const saveButton = document.createElement('button');
                saveButton.textContent = '保存图片';
                saveButton.style.marginTop = '20px';
                saveButton.style.padding = '12px 30px';
                saveButton.style.fontSize = '16px';
                saveButton.style.backgroundColor = '#4CAF50';
                saveButton.style.color = 'white';
                saveButton.style.border = 'none';
                saveButton.style.borderRadius = '5px';
                saveButton.style.cursor = 'pointer';
                
                const cancelButton = document.createElement('button');
                cancelButton.textContent = '关闭';
                cancelButton.style.marginTop = '10px';
                cancelButton.style.padding = '12px 30px';
                cancelButton.style.fontSize = '16px';
                cancelButton.style.backgroundColor = '#f0f0f0';
                cancelButton.style.color = '#333';
                cancelButton.style.border = 'none';
                cancelButton.style.borderRadius = '5px';
                cancelButton.style.cursor = 'pointer';
                
                const instruction = document.createElement('p');
                instruction.textContent = '提示：点击图片并选择"保存图片"选项';
                instruction.style.marginTop = '15px';
                instruction.style.color = 'white';
                instruction.style.fontSize = '14px';
                instruction.style.textAlign = 'center';
                instruction.style.padding = '0 20px';
                
                saveButton.addEventListener('click', function() {
                    link.click();
                });
                
                cancelButton.addEventListener('click', function() {
                    document.body.removeChild(tempImageViewer);
                });
                
                tempImageViewer.appendChild(tempImage);
                tempImageViewer.appendChild(instruction);
                tempImageViewer.appendChild(saveButton);
                tempImageViewer.appendChild(cancelButton);
                document.body.appendChild(tempImageViewer);
            } else {
                // 桌面端直接下载
                link.click();
            }
        }).catch(error => {
            console.error('生成贺卡失败:', error);
            alert('生成贺卡失败，请稍后重试。');
            
            // 恢复编辑面板显示
            editPanel.style.display = 'block';
            previewPanel.style.minHeight = '70vh';
            
            // 移除加载提示
            if (document.body.contains(loadingIndicator)) {
                document.body.removeChild(loadingIndicator);
            }
        });
    }, 100);
}

// 更新图片变换
function updateImageTransform() {
    adjustableImage.style.transform = `scale(${currentScale}) translate(${currentPosition.x}px, ${currentPosition.y}px)`;
}

// 移动端触摸事件处理
function handleMobileTouchEvents() {
    // 图片调整区域的触摸事件
    let touchStartX, touchStartY;
    let isDragging = false;
    
    // 单指拖动
    adjustableImage.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isDragging = true;
            e.preventDefault();
        }
    }, { passive: false });
    
    adjustableImage.addEventListener('touchmove', function(e) {
        if (isDragging && e.touches.length === 1) {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            const deltaX = touchX - touchStartX;
            const deltaY = touchY - touchStartY;
            
            currentPosition.x += deltaX;
            currentPosition.y += deltaY;
            
            updateImageTransform();
            
            touchStartX = touchX;
            touchStartY = touchY;
            
            e.preventDefault();
        }
    }, { passive: false });
    
    adjustableImage.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // 双指缩放
    let initialDistance = null;
    let initialScale = null;
    
    imageAdjustWrapper.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            initialDistance = Math.sqrt(dx * dx + dy * dy);
            initialScale = currentScale;
            e.preventDefault();
        }
    }, { passive: false });
    
    imageAdjustWrapper.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2 && initialDistance && initialScale) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const currentDistance = Math.sqrt(dx * dx + dy * dy);
            
            const scaleFactor = currentDistance / initialDistance;
            currentScale = initialScale * scaleFactor;
            
            // 限制缩放范围
            if (currentScale < 0.5) currentScale = 0.5;
            if (currentScale > 3) currentScale = 3;
            
            updateImageTransform();
            e.preventDefault();
        }
    }, { passive: false });
    
    imageAdjustWrapper.addEventListener('touchend', function() {
        initialDistance = null;
        initialScale = null;
    });
    
    // 添加触摸友好的按钮交互效果
    const touchButtons = document.querySelectorAll('button, .card-item, .background-option, .upload-btn');
    touchButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.opacity = '1';
        });
    });
}

// 创建images目录
function createImagesDirectory() {
    // 注意：在浏览器端JavaScript无法直接创建服务器端目录
    // 这里仅做提示，实际操作需要用户手动创建或通过服务器端代码实现
    console.log('请确保在postcard目录下创建images文件夹，并添加贺卡背景图片。');
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    init();
    createImagesDirectory();
});