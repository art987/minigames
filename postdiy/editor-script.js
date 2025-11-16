// 海报DIY编辑器 - 全新实现
// 模块化设计，避免变量重复声明问题

// DOM加载完成后初始化编辑器
document.addEventListener('DOMContentLoaded', function() {
  console.log('海报编辑器初始化...');
  
  // 全局状态管理
  let state = {
    currentTemplate: null,
    businessInfo: {
      name: '点击编辑商家名称',
      logo: null,
      qrcode: null,
      promoText: '点击编辑促销信息'
    },
    customBackground: null,
    textColor: '#000000' // 默认黑色
  };
  
  // DOM元素缓存
  const elements = {
    // 修复：添加缺失的removeBackgroundBtn元素
    removeBackgroundBtn: document.getElementById('removeBackgroundBtn'),
    // 返回按钮
    backToHomeBtn: document.getElementById('backToHomeBtn'),
    
    // 底部按钮
    changeTemplateBtn: document.getElementById('changeTemplateBtn'),
    editBusinessInfoBtn: document.getElementById('editBusinessInfoBtn'),
    uploadBackgroundBtn: document.getElementById('uploadBackgroundBtn'),
    backgroundInput: document.getElementById('backgroundInput'),
    downloadBtn: document.getElementById('downloadBtn'),
    
    // 预览区域
    posterFrame: document.getElementById('posterFrame'),
    posterBackground: document.getElementById('posterBackground'),
    posterBusinessName: document.getElementById('posterBusinessName'),
    posterPromoText: document.getElementById('posterPromoText'),
    posterLogo: document.getElementById('posterLogo'),
    posterLogoImg: document.getElementById('posterLogoImg'),
    logoPlaceholder: document.getElementById('logoPlaceholder'),
    posterQrcode: document.getElementById('posterQrcode'),
    posterQrcodeImg: document.getElementById('posterQrcodeImg'),
    qrcodePlaceholder: document.getElementById('qrcodePlaceholder'),
    
    // 模态框
    templateModal: document.getElementById('templateModal'),
    closeTemplateModalBtn: document.getElementById('closeTemplateModalBtn'),
    cancelTemplateBtn: document.getElementById('cancelTemplateBtn'),
    confirmTemplateBtn: document.getElementById('confirmTemplateBtn'),
    templateGrid: document.getElementById('modalTemplatesGrid'),
    modalMonthButtons: document.getElementById('modalMonthButtons'),
    modalFestivalTags: document.getElementById('modalFestivalTags'),
    
    businessInfoModal: document.getElementById('businessInfoModal'),
    closeBusinessInfoModalBtn: document.getElementById('closeBusinessInfoModalBtn'),
    cancelBusinessInfoBtn: document.getElementById('cancelBusinessInfoBtn'),
    saveBusinessInfoBtn: document.getElementById('saveBusinessInfoBtn'),
    businessInfoForm: document.getElementById('businessInfoForm'),
    businessNameInput: document.getElementById('business-name'),
    fontColorSelector: document.getElementById('color-selector'),
    promoTextInput: document.getElementById('promotion-text'),
    logoUploadArea: document.getElementById('logoUploadArea'),
    logoInput: document.getElementById('logoInput'),
    logoPreview: document.getElementById('logoPreview'),
    logoPreviewImg: document.getElementById('logoPreviewImg'),
    removeLogoBtn: document.getElementById('removeLogoBtn'),
    qrcodeUploadArea: document.getElementById('qrcodeUploadArea'),
    qrcodeInput: document.getElementById('qrcodeInput'),
    qrcodePreview: document.getElementById('qrcodePreview'),
    qrcodePreviewImg: document.getElementById('qrcodePreviewImg'),
    removeQrcodeBtn: document.getElementById('removeQrcodeBtn')
  };
  
  // 初始化编辑器
  function init() {
    console.log('编辑器初始化完成，开始绑定事件...');
    bindEvents();
    initializeEditor();
  }
  
  // 调用初始化函数
  init();
  
  // 绑定事件处理函数
  function bindEvents() {
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
    if (elements.cancelTemplateBtn) {
      elements.cancelTemplateBtn.addEventListener('click', closeTemplateModal);
    }
    if (elements.confirmTemplateBtn) {
      elements.confirmTemplateBtn.addEventListener('click', function() {
        // 确认模板选择并更新预览
        if (state.currentTemplate) {
          updateTemplateDisplay();
          closeTemplateModal();
          showToast('模板已选择');
        }
      });
    }
    
    // 商家信息相关事件
    if (elements.editBusinessInfoBtn) {
      elements.editBusinessInfoBtn.addEventListener('click', openBusinessInfoModal);
    }
    if (elements.closeBusinessInfoModalBtn) {
      elements.closeBusinessInfoModalBtn.addEventListener('click', closeBusinessInfoModal);
    }
    if (elements.cancelBusinessInfoBtn) {
      elements.cancelBusinessInfoBtn.addEventListener('click', closeBusinessInfoModal);
    }
    if (elements.saveBusinessInfoBtn) {
      elements.saveBusinessInfoBtn.addEventListener('click', saveBusinessInfo);
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
    
    // 添加标志变量防止重复触发
    let isFileDialogOpen = false;
    let activeFileInput = null;
    
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
        const tempInputs = ['backgroundInput', 'logoInput', 'qrcodeInput'];
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
        event.stopPropagation(); // 阻止事件冒泡
        
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
        
        // 添加change事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleLogoUpload(event);
          // 清理标志
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
        elements.logoInput = newInput;
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
        }, 50); // 增加延迟时间，确保DOM完全更新
      });
    }
    if (elements.removeLogoBtn) {
      elements.removeLogoBtn.addEventListener('click', removeLogo);
    }
    
    // 二维码上传相关事件
    if (elements.qrcodeUploadArea) {
      elements.qrcodeUploadArea.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        
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
        
        // 添加change事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleQrcodeUpload(event);
          // 清理标志
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
        elements.qrcodeInput = newInput;
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
        }, 50); // 增加延迟时间，确保DOM完全更新
      });
    }
    if (elements.removeQrcodeBtn) {
      elements.removeQrcodeBtn.addEventListener('click', removeQrcode);
    }
    
    // 输出控制相关事件
    if (elements.downloadBtn) {
      elements.downloadBtn.addEventListener('click', downloadPoster);
    }
    
    // 阻止表单默认提交
    if (elements.businessInfoForm) {
      elements.businessInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
      });
    }
  }
  
  // 初始化编辑器状态
  function initializeEditor() {
    // 从本地存储加载商家信息
    const savedBusinessInfo = localStorage.getItem('businessInfo');
    if (savedBusinessInfo) {
      try {
        state.businessInfo = JSON.parse(savedBusinessInfo);
      } catch (e) {
        console.error('加载保存的商家信息失败:', e);
      }
    }
    
    // 从本地存储加载文本颜色设置
    const savedTextColor = localStorage.getItem('textColor');
    if (savedTextColor) {
      state.textColor = savedTextColor;
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
    
    // 检查是否需要自动弹出商家信息编辑框（如果是第一次打开或信息为空）
    if (!savedBusinessInfo || 
        (!state.businessInfo.name || state.businessInfo.name === '点击编辑商家名称')) {
      setTimeout(() => {
        openBusinessInfoModal();
      }, 800);
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
      updateTemplateDisplay();
      console.log('已加载默认模板:', state.currentTemplate.name);
    } else {
      // 如果当前月份没有模板，尝试加载第一个可用模板
      for (const key in window.templates) {
        if (window.templates[key] && window.templates[key].length > 0) {
          state.currentTemplate = window.templates[key][0];
          updateTemplateDisplay();
          console.log('已加载备用模板:', state.currentTemplate.name);
          break;
        }
      }
    }
  }
  
  // 更新模板显示
  function updateTemplateDisplay() {
    if (!state.currentTemplate || !elements.posterBackground) {
      console.error('缺少模板或背景元素');
      return;
    }
    
    // 使用自定义背景或模板背景
    if (state.customBackground) {
      elements.posterBackground.src = state.customBackground;
    } else if (state.currentTemplate.image) {
      elements.posterBackground.src = state.currentTemplate.image;
    } else {
      console.warn('模板没有可用的图片资源');
    }
    
    // 确保海报内容可见
    const posterContent = document.getElementById('posterContent');
    if (posterContent) {
      posterContent.style.display = 'flex';
    }
  }
  
  // 更新商家信息显示
  function updateBusinessInfoDisplay() {
    // 更新商家名称
    if (elements.posterBusinessName && state.businessInfo.name) {
      elements.posterBusinessName.textContent = state.businessInfo.name;
      elements.posterBusinessName.style.color = state.textColor || '#000000';
    }
    
    // 更新商家Logo
    if (elements.posterLogoImg && elements.logoPlaceholder) {
      if (state.businessInfo.logo) {
        elements.posterLogoImg.src = state.businessInfo.logo;
        elements.posterLogoImg.style.display = 'block';
        elements.logoPlaceholder.style.display = 'none';
      } else {
        elements.posterLogoImg.style.display = 'none';
        elements.logoPlaceholder.style.display = 'block';
      }
    }
    
    // 更新二维码
    if (elements.posterQrcodeImg && elements.qrcodePlaceholder) {
      if (state.businessInfo.qrcode) {
        elements.posterQrcodeImg.src = state.businessInfo.qrcode;
        elements.posterQrcodeImg.style.display = 'block';
        elements.qrcodePlaceholder.style.display = 'none';
      } else {
        elements.posterQrcodeImg.style.display = 'none';
        elements.qrcodePlaceholder.style.display = 'block';
      }
    }
    
    // 更新促销信息
    if (elements.posterPromoText && state.businessInfo.promoText) {
      elements.posterPromoText.textContent = state.businessInfo.promoText;
      elements.posterPromoText.style.color = state.textColor;
    }
  }
  
  // 打开模板选择弹窗
  function openTemplateModal() {
    if (!elements.templateModal || !elements.templateGrid) return;
    
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
    
    // 显示弹窗 - 通过移除hidden类
    elements.templateModal.classList.remove('hidden');
    // 同时设置display确保兼容性
    elements.templateModal.style.display = 'flex';
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
                  const templateFestival = state.currentTemplate.festivals[0];
                  console.log('定位到模板节日:', templateFestival);
                  
                  const festivalTag = document.querySelector(`.festival-tag[data-festival="${templateFestival}"]`);
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
        // 滚动到当前模板，确保可见
        templateItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    for (let i = 1; i <= 12; i++) {
      const monthBtn = document.createElement('button');
      monthBtn.className = 'month-btn';
      monthBtn.textContent = `${i}月`;
      
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
  
  // 填充节日标签
  function fillFestivalTags(selectedMonth = null) {
    if (!elements.modalFestivalTags) return;
    
    // 清空现有内容
    elements.modalFestivalTags.innerHTML = '';
    
    // 获取节日列表
    let festivals = [];
    
    if (selectedMonth) {
      // 如果指定了月份，只获取该月份的节日
      const monthFestivals = new Set();
      for (const monthKey in window.templates) {
        const monthTemplates = window.templates[monthKey];
        monthTemplates.forEach(template => {
          if (template.months && template.months.includes(selectedMonth)) {
            template.festivals.forEach(festival => {
              monthFestivals.add(festival);
            });
          }
        });
      }
      festivals = Array.from(monthFestivals);
    } else {
      // 否则获取所有节日
      const allFestivals = new Set();
      for (const monthKey in window.templates) {
        const monthTemplates = window.templates[monthKey];
        monthTemplates.forEach(template => {
          template.festivals.forEach(festival => {
            allFestivals.add(festival);
          });
        });
      }
      festivals = Array.from(allFestivals);
    }
    
    // 如果没有节日，显示提示
    if (festivals.length === 0) {
      const noFestivalsText = document.createElement('div');
      noFestivalsText.className = 'text-text-secondary text-sm';
      noFestivalsText.textContent = '当前月份暂无节日';
      elements.modalFestivalTags.appendChild(noFestivalsText);
      return;
    }
    
    // 创建节日标签
    festivals.forEach(festival => {
      const festivalTag = document.createElement('div');
      festivalTag.className = 'festival-tag';
      festivalTag.textContent = festival;
      festivalTag.dataset.festival = festival;
      
      // 创建事件处理函数引用，便于后续移除
      const tagClickHandler = function() {
        // 移除所有标签的选中状态
        document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
        // 添加当前标签的选中状态
        this.classList.add('active');
        // 筛选显示该节日的模板
        filterTemplatesByFestival(festival);
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
    
    // 遍历所有模板
    for (const monthKey in window.templates) {
      const monthTemplates = window.templates[monthKey];
      
      monthTemplates.forEach(template => {
        // 创建模板项
        const templateItem = document.createElement('div');
        templateItem.className = 'template-item';
        templateItem.dataset.templateId = template.id;
        
        // 是否为当前选中的模板
        const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;
        
        // 创建模板图片容器
        const templateImgContainer = document.createElement('div');
        templateImgContainer.className = 'template-thumbnail-container';
        
        // 创建模板图片
        const templateImg = document.createElement('img');
        templateImg.src = template.thumbnail;
        templateImg.alt = template.name;
        templateImg.className = 'template-thumbnail';
        
        // 创建圆形勾选按钮
        const checkButton = document.createElement('div');
        checkButton.className = 'template-check-button';
        checkButton.innerHTML = '<i class="fa fa-check"></i>';
        
        // 设置初始勾选状态
        if (isSelected) {
          checkButton.classList.add('checked');
        }
        
        // 为勾选按钮添加点击事件
        checkButton.addEventListener('click', function(e) {
          e.stopPropagation(); // 阻止事件冒泡
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
        
        // 为模板项添加点击事件（可选，用于保持原有功能）
        templateItem.addEventListener('click', function() {
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
        templateImgContainer.appendChild(templateImg);
        templateImgContainer.appendChild(checkButton);
        templateItem.appendChild(templateImgContainer);
        templateItem.appendChild(templateName);
        
        // 直接添加到网格元素
        if (elements.templateGrid) {
          elements.templateGrid.appendChild(templateItem);
        } else {
          console.error('模板网格元素未找到');
        }
      });
    }
  }
  
  // 选择模板
  function selectTemplate(template) {
    state.currentTemplate = template;
    // 清除自定义背景，确保使用模板的背景图片
    state.customBackground = null;
    // 更新模板显示
    updateTemplateDisplay();
  }
  
  // 关闭模板选择弹窗
  function closeTemplateModal() {
    console.log('尝试关闭模板弹窗');
    if (elements.templateModal) {
      // 隐藏弹窗 - 添加hidden类
      elements.templateModal.classList.add('hidden');
      // 同时设置display确保兼容性
      elements.templateModal.style.display = 'none';
      console.log('模板弹窗已关闭');
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
          
          // 是否为当前选中的模板
          const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;
          
          // 创建模板图片容器
          const templateImgContainer = document.createElement('div');
          templateImgContainer.className = 'template-thumbnail-container';
          
          // 创建模板图片
          const templateImg = document.createElement('img');
          templateImg.src = template.thumbnail;
          templateImg.alt = template.name;
          templateImg.className = 'template-thumbnail';
          
          // 创建圆形勾选按钮
          const checkButton = document.createElement('div');
          checkButton.className = 'template-check-button';
          checkButton.innerHTML = '<i class="fa fa-check"></i>';
          
          // 设置初始勾选状态
          if (isSelected) {
            checkButton.classList.add('checked');
          }
          
          // 为勾选按钮添加点击事件
          checkButton.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
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
          templateImgContainer.appendChild(templateImg);
          templateImgContainer.appendChild(checkButton);
          templateItem.appendChild(templateImgContainer);
          templateItem.appendChild(templateName);
          
          // 添加到网格
          elements.templateGrid.appendChild(templateItem);
        }
      });
    }
    
    // 尝试自动选择对应月份的节日（与首页逻辑保持一致）
    try {
      const result = utils.autoSelectByDate();
      if (result && result.festival && month === result.month) {
        setTimeout(() => {
          const festivalTag = document.querySelector(`#modalFestivalTags .festival-tag[data-festival="${result.festival}"]`);
          if (festivalTag) {
            festivalTag.click();
          }
        }, 100);
      }
    } catch (error) {
      console.error('自动选择节日失败:', error);
    }
  }
  
  // 按节日筛选模板
  function filterTemplatesByFestival(festival) {
    if (!window.templates || !elements.templateGrid) return;
    
    // 清空现有内容
    elements.templateGrid.innerHTML = '';
    
    // 遍历所有模板
    for (const monthKey in window.templates) {
      const monthTemplates = window.templates[monthKey];
      
      monthTemplates.forEach(template => {
        // 只显示指定节日的模板
        if (template.festivals.includes(festival)) {
          // 创建模板项
          const templateItem = document.createElement('div');
          templateItem.className = 'template-item';
          templateItem.dataset.templateId = template.id;
          
          // 是否为当前选中的模板
          const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;
          
          // 创建模板图片容器
          const templateImgContainer = document.createElement('div');
          templateImgContainer.className = 'template-thumbnail-container';
          
          // 创建模板图片
          const templateImg = document.createElement('img');
          templateImg.src = template.thumbnail;
          templateImg.alt = template.name;
          templateImg.className = 'template-thumbnail';
          
          // 创建圆形勾选按钮
          const checkButton = document.createElement('div');
          checkButton.className = 'template-check-button';
          checkButton.innerHTML = '<i class="fa fa-check"></i>';
          
          // 设置初始勾选状态
          if (isSelected) {
            checkButton.classList.add('checked');
          }
          
          // 为勾选按钮添加点击事件
          checkButton.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
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
          templateImgContainer.appendChild(templateImg);
          templateImgContainer.appendChild(checkButton);
          templateItem.appendChild(templateImgContainer);
          templateItem.appendChild(templateName);
          
          // 添加到网格
          elements.templateGrid.appendChild(templateItem);
        }
      });
    }
  }
  
  // 关闭模板选择弹窗
  function closeTemplateModal() {
    if (elements.templateModal) {
      // 移除动态创建的节日标签及其事件监听器
      const festivalTags = document.querySelectorAll('.festival-tag');
      festivalTags.forEach(tag => {
        if (tag._clickHandler) {
          tag.removeEventListener('click', tag._clickHandler);
          delete tag._clickHandler;
        }
      });
      
      // 清空模板网格和标签容器
      if (elements.templateGrid) {
        elements.templateGrid.innerHTML = '';
      }
      if (elements.modalFestivalTags) {
        elements.modalFestivalTags.innerHTML = '';
      }
      
      elements.templateModal.classList.add('hidden');
      elements.templateModal.style.display = 'none';
    }
  }
  
  // 为输入框添加清除按钮和改进提示语交互
  function enhanceInputWithClearButton(inputElement, placeholderText) {
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
  function openBusinessInfoModal() {
    if (!elements.businessInfoModal || !elements.businessNameInput || !elements.promoTextInput) return;
    
    // 填充表单数据
    elements.businessNameInput.value = state.businessInfo.name || '';
    elements.promoTextInput.value = state.businessInfo.promoText || '';
    
    // 初始化颜色下拉框选中状态
    const businessNameColorSelect = document.getElementById('business-name-color');
    if (businessNameColorSelect) {
      businessNameColorSelect.value = state.textColor || '#000000';
      
      // 添加颜色选择变化事件监听器
      businessNameColorSelect.onchange = function() {
        state.textColor = this.value;
        updateBusinessInfoDisplay();
      };
    }
    
    // 为输入框添加清除按钮和改进提示语交互
    enhanceInputWithClearButton(elements.businessNameInput, '点击编辑商家名称');
    
    // 重新实现颜色选择器，使用嵌套结构确保3像素边距
    if (elements.fontColorSelector) {
      // 清空现有的颜色选择器
      elements.fontColorSelector.innerHTML = '';
      
      // 预定义的颜色列表
      const colors = ['#000000', '#FFFFFF', '#FF0000', '#800080', '#0000FF', '#008000', '#FFFF00', '#8B4513'];
      
      // 为每个颜色创建选项
      colors.forEach(color => {
        // 创建外部容器（用于边框和缩放）
        const outerDiv = document.createElement('div');
        outerDiv.className = 'color-option';
        outerDiv.setAttribute('data-color', color);
        
        // 创建内部色块（3像素边距的效果）
        const innerDiv = document.createElement('div');
        innerDiv.className = 'color-inner';
        innerDiv.style.backgroundColor = color;
        
        // 为白色色块添加边框，使其在白色背景上可见
        if (color === '#FFFFFF') {
          innerDiv.style.border = '1px solid #ddd';
        }
        
        outerDiv.appendChild(innerDiv);
        elements.fontColorSelector.appendChild(outerDiv);
        
        // 如果是当前选中的颜色
        if (color === state.textColor) {
          outerDiv.classList.add('selected');
          
          // 创建打勾图标
           const checkmark = document.createElement('span');
           checkmark.className = 'checkmark';
           checkmark.textContent = '✓';
           // 确保白色色块使用黑色打勾，其他使用白色打勾
           if (color === '#FFFFFF') {
             checkmark.style.color = '#000000';
             checkmark.style.fontSize = '16px'; // 稍微小一点，更清晰
           } else {
             checkmark.style.color = '#FFFFFF';
             checkmark.style.fontSize = '16px';
           }
           outerDiv.appendChild(checkmark);
        }
      });
      
      // 重新绑定点击事件
      elements.fontColorSelector.addEventListener('click', function(e) {
        let target = e.target;
        // 如果点击的是内部色块，找到父元素
        if (target.classList.contains('color-inner')) {
          target = target.parentElement;
        }
        
        if (target.classList.contains('color-option')) {
          // 更新状态
          state.textColor = target.getAttribute('data-color');
          
          // 移除所有选项的选中状态和打勾图标
          document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
            const checkmark = option.querySelector('.checkmark');
            if (checkmark) {
              checkmark.remove();
            }
          });
          
          // 添加选中状态
          target.classList.add('selected');
          
          // 创建打勾图标
          const checkmark = document.createElement('span');
          checkmark.className = 'checkmark';
          checkmark.textContent = '✓';
          // 确保白色色块使用黑色打勾，其他使用白色打勾
          if (target.getAttribute('data-color') === '#FFFFFF') {
            checkmark.style.color = '#000000';
            checkmark.style.fontSize = '16px'; // 稍微小一点，更清晰
          } else {
            checkmark.style.color = '#FFFFFF';
            checkmark.style.fontSize = '16px';
          }
          target.appendChild(checkmark);
          
          // 实时更新预览
          updateBusinessInfoDisplay();
        }
      });
    }
    
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
        elements.logoPreviewImg.src = state.businessInfo.logo;
      } else {
        elements.logoUploadArea.style.display = 'block';
        elements.logoPreview.style.display = 'none';
      }
    }
    
    // 根据是否有二维码来显示或隐藏上传区域
    if (elements.qrcodeUploadArea && elements.qrcodePreview) {
      if (state.businessInfo.qrcode) {
        elements.qrcodeUploadArea.style.display = 'none';
        // 移除hidden类
        elements.qrcodePreview.classList.remove('hidden');
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodePreviewImg.src = state.businessInfo.qrcode;
      } else {
        elements.qrcodeUploadArea.style.display = 'block';
        // 添加hidden类
        elements.qrcodePreview.classList.add('hidden');
        elements.qrcodePreview.style.display = 'none';
      }
    }
    
    // 显示弹窗 - 通过移除hidden类
    elements.businessInfoModal.classList.remove('hidden');
    // 同时设置display确保兼容性
    elements.businessInfoModal.style.display = 'flex';
  }
  
  // 关闭商家信息编辑弹窗
  function closeBusinessInfoModal() {
    if (elements.businessInfoModal) {
      elements.businessInfoModal.classList.add('hidden');
      elements.businessInfoModal.style.display = 'none';
    }
  }
  
  // 保存商家信息
  function saveBusinessInfo() {
    if (!elements.businessNameInput || !elements.promoTextInput) return;
    
    // 获取表单数据
    state.businessInfo.name = elements.businessNameInput.value.trim() || '点击编辑商家名称';
    state.businessInfo.promoText = elements.promoTextInput.value.trim() || '点击编辑促销信息';
    
    // 从颜色下拉框获取并保存颜色值
    const businessNameColorSelect = document.getElementById('business-name-color');
    if (businessNameColorSelect) {
      state.textColor = businessNameColorSelect.value;
    }
    
    // 保存到本地存储
    localStorage.setItem('businessInfo', JSON.stringify(state.businessInfo));
    localStorage.setItem('textColor', state.textColor);
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 关闭弹窗
    closeBusinessInfoModal();
    
    // 添加成功提示动画效果
    showToast('商家信息保存成功');
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
    // 检查是否已存在toast元素
    let toast = document.querySelector('.toast-message');
    if (!toast) {
      // 创建toast元素
      toast = document.createElement('div');
      toast.className = 'toast-message fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-lg z-500';
      toast.style.transition = 'all 0.3s ease';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
    
    // 3秒后隐藏并从DOM中移除
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 20px)';
      
      // 动画完成后从DOM中完全移除
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
  
  // 处理背景图片上传
  function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    // 读取文件
    const reader = new FileReader();
    reader.onload = function(e) {
      state.customBackground = e.target.result;
      
      // 更新背景显示
      updateTemplateDisplay();
      
      showToast('背景图片上传成功');
      
      // 移除了手动重置，因为我们现在使用resetFileInput函数来处理重置
      // 在下次点击上传按钮时会通过resetFileInput函数正确重置文件输入框
    };
    reader.readAsDataURL(file);
  }
  
  // 移除背景图片
  function removeBackground() {
    state.customBackground = null;
    
    // 更新背景显示
    updateTemplateDisplay();
    
    // 显示成功提示
    showToast('背景图片已移除');
  }
  
  // 处理Logo上传
  function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    // 检查文件大小
    if (file.size > 10 * 1024 * 1024) { // 10MB
      showToast('文件大小不能超过10MB');
      return;
    }
    
    // 读取文件
    const reader = new FileReader();
    reader.onload = function(e) {
      state.businessInfo.logo = e.target.result;
      
      // 更新显示
      updateBusinessInfoDisplay();
      
      // 显示预览，隐藏上传区域
      if (elements.logoPreview && elements.logoPreviewImg && elements.logoUploadArea) {
        elements.logoPreviewImg.src = e.target.result;
        elements.logoPreview.style.display = 'block';
        elements.logoUploadArea.style.display = 'none';
      }
      
      // 显示成功提示
      showToast('Logo上传成功');
      
      // 重置文件输入
      event.target.value = '';
    };
    reader.readAsDataURL(file);
  }
  
  // 移除Logo
  function removeLogo() {
    state.businessInfo.logo = null;
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 隐藏预览，显示上传区域
    if (elements.logoPreview && elements.logoUploadArea) {
      elements.logoPreview.style.display = 'none';
      elements.logoUploadArea.style.display = 'block';
    }
    
    // 显示成功提示
    showToast('Logo已移除');
  }
  
  // 处理二维码上传
  function handleQrcodeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    // 读取文件
    const reader = new FileReader();
    reader.onload = function(e) {
      state.businessInfo.qrcode = e.target.result;
      
      // 更新显示
      updateBusinessInfoDisplay();
      
      // 显示预览，隐藏上传区域
      if (elements.qrcodePreview && elements.qrcodePreviewImg && elements.qrcodeUploadArea) {
        elements.qrcodePreviewImg.src = e.target.result;
        // 移除hidden类
        elements.qrcodePreview.classList.remove('hidden');
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodeUploadArea.style.display = 'none';
      }
      
      // 显示成功提示
      showToast('二维码上传成功');
      
      // 重置文件输入
      event.target.value = '';
    };
    reader.readAsDataURL(file);
  }
  
  // 移除二维码
  function removeQrcode() {
    state.businessInfo.qrcode = null;
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 隐藏预览，显示上传区域
    if (elements.qrcodePreview && elements.qrcodeUploadArea) {
      // 添加hidden类
      elements.qrcodePreview.classList.add('hidden');
      elements.qrcodePreview.style.display = 'none';
      elements.qrcodeUploadArea.style.display = 'block';
    }
    
    // 显示成功提示
    showToast('二维码已移除');
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
  
  // 下载海报
  async function downloadPoster() {
    if (!state.currentTemplate) {
      showToast('请先选择一个模板');
      return;
    }
    
    // 显示加载状态
    if (elements.downloadBtn) {
      elements.downloadBtn.disabled = true;
      elements.downloadBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 正在生成...';
    }
    
    try {
      // 转换为图片并下载，等待操作完成
      await convertToImageAndDownload();
    } catch (error) {
      console.error('下载海报过程中出错:', error);
      showToast('下载海报失败，请重试');
    } finally {
      // 重置下载按钮状态
      if (elements.downloadBtn) {
        elements.downloadBtn.disabled = false;
        elements.downloadBtn.innerHTML = '<i class="fa fa-download"></i> 下载海报';
      }
    }
  }
  
  // 转换为图片并下载 - 简化版：直接使用html2canvas对整个posterFrame进行截图
  async function convertToImageAndDownload() {
    // 获取元素
    if (!elements.posterFrame) {
      showToast('未找到海报元素');
      return;
    }
    
    // 提高分辨率，设置一个更高的缩放比例
    const scale = window.devicePixelRatio * 1.5 || 3;
    
    // 保存原始样式信息
    const originalBusinessNameTransform = elements.posterBusinessName ? elements.posterBusinessName.style.transform : '';
    const originalPromoTextTransform = elements.posterPromoText ? elements.posterPromoText.style.transform : '';
    const originalPromoTextPadding = elements.posterPromoText ? elements.posterPromoText.style.padding : '';
    
    // 查找并保存背景图片元素的原始样式和src
    const backgroundImageElement = document.getElementById('posterBackground') || null;
    const originalBackgroundImageStyle = backgroundImageElement ? { ...backgroundImageElement.style } : null;
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
      }
      if (tempCanvasElement && tempCanvasElement.parentNode) {
        tempCanvasElement.parentNode.removeChild(tempCanvasElement);
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
        // 添加允许Taint选项，避免跨域问题导致的导出失败
        options.allowTaint = false;
        options.useCORS = true;
        
        return html2canvas(elements.posterFrame, options).then(canvas => {
          try {
            // 创建下载链接
            const link = document.createElement('a');
            
            // 生成最高质量的PNG图像，确保清晰度
            // 使用try-catch捕获可能的toDataURL错误
            let imageUrl;
            try {
              imageUrl = canvas.toDataURL('image/png', 1.0);
            } catch (toDataUrlError) {
              console.error('生成图像URL时出错:', toDataUrlError);
              // 如果toDataURL失败，创建一个简单的纯色图像作为替代
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
            
            link.href = imageUrl;
            
            // 设置文件名
            link.download = `poster_${Date.now()}.png`;
          
            // 触发下载
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
              document.body.removeChild(link);
            }, 100);
            
            // 显示成功提示
            showToast('海报生成成功！');
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
          link.download = `poster_fallback_${Date.now()}.png`;
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
        elements.posterBusinessName.style.transform = `translateY(-8px)`;
      }
      if (elements.posterPromoText) {
        // 减少padding-top 8px，增加padding-bottom 6px
        elements.posterPromoText.style.padding = `0px 6px 15px 6px`;
      }
      
      // 保存logo和二维码的原始样式
      const logoImgElement = elements.posterLogoImg;
      const qrcodeImgElement = elements.posterQrcodeImg;
      const originalLogoStyle = logoImgElement ? { ...logoImgElement.style } : null;
      const originalQrcodeStyle = qrcodeImgElement ? { ...qrcodeImgElement.style } : null;
      let tempLogoCanvas = null;
      let tempQrcodeCanvas = null;
      
      // 辅助函数：创建canvas来正确显示图片
      async function createProperlyScaledCanvas(imgElement) {
        if (!imgElement || !imgElement.src) return null;
        
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = function() {
            try {
              // 创建临时canvas
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              // 获取元素容器的尺寸
              const container = imgElement.parentElement;
              const containerWidth = container.offsetWidth;
              const containerHeight = container.offsetHeight;
              
              // 提高临时canvas分辨率
              canvas.width = containerWidth * scale;
              canvas.height = containerHeight * scale;
              // 设置canvas的CSS尺寸与容器相同
              canvas.style.width = containerWidth + 'px';
              canvas.style.height = containerHeight + 'px';
              // 缩放上下文以匹配高分辨率
              ctx.scale(scale, scale);
              
              // 检查是否为二维码图片
              const isQrcode = imgElement.id === 'posterQrcodeImg';
              
              let drawWidth, drawHeight, offsetX, offsetY;
              
              if (isQrcode) {
                // 对于二维码，使用object-fit:contain模式，保持完整显示，并添加额外的边距
                const imgRatio = img.width / img.height;
                
                // 添加内边距（增加到5px以确保二维码与容器之间有足够空间）
                const padding = 5;
                const availableWidth = containerWidth - (padding * 2);
                const availableHeight = containerHeight - (padding * 2);
                
                if (imgRatio > 1) {
                  // 图片更宽，按可用宽度缩放
                  drawWidth = availableWidth;
                  drawHeight = img.height * (availableWidth / img.width);
                  offsetX = padding;
                  offsetY = padding + (availableHeight - drawHeight) / 2;
                } else {
                  // 图片更高或等比例，按可用高度缩放
                  drawHeight = availableHeight;
                  drawWidth = img.width * (availableHeight / img.height);
                  offsetX = padding + (availableWidth - drawWidth) / 2;
                  offsetY = padding;
                }
                
                // 绘制白色背景（模拟CSS中的background-color: white）
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, containerWidth, containerHeight);
              } else {
                // 对于其他图片（如Logo），使用object-fit:cover模式
                const imgRatio = img.width / img.height;
                const containerRatio = containerWidth / containerHeight;
                
                if (imgRatio > containerRatio) {
                  // 图片更宽，按高度缩放，裁剪宽度
                  drawHeight = containerHeight;
                  drawWidth = img.width * (containerHeight / img.height);
                  offsetX = (containerWidth - drawWidth) / 2;
                  offsetY = 0;
                } else {
                  // 图片更高，按宽度缩放，裁剪高度
                  drawWidth = containerWidth;
                  drawHeight = img.height * (containerWidth / img.width);
                  offsetX = 0;
                  offsetY = (containerHeight - drawHeight) / 2;
                }
              }
              
              // 绘制图片
              ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
              
              // 隐藏原始图片，显示canvas
              imgElement.style.display = 'none';
              canvas.style.position = 'absolute';
              canvas.style.top = '0';
              canvas.style.left = '0';
              canvas.style.width = '100%';
              canvas.style.height = '100%';
              container.insertBefore(canvas, imgElement);
              
              resolve(canvas);
            } catch (error) {
              reject(error);
            }
          };
          
          img.onerror = function() {
            reject(new Error('无法加载图片'));
          };
          
          img.src = imgElement.src;
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
              img.src = state.currentTemplate.image;
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
        tempLogoCanvas = await createProperlyScaledCanvas(logoImgElement);
      }
      
      // 处理二维码图片
      if (qrcodeImgElement && qrcodeImgElement.src) {
        tempQrcodeCanvas = await createProperlyScaledCanvas(qrcodeImgElement);
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
  
  // 初始化编辑器
  init();
  
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