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
    customBackground: null
  };
  
  // DOM元素缓存
  const elements = {
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
    
    // 背景上传相关事件
    if (elements.uploadBackgroundBtn) {
      elements.uploadBackgroundBtn.addEventListener('click', function() {
        if (elements.backgroundInput) {
          elements.backgroundInput.click();
        }
      });
    }
    if (elements.backgroundInput) {
      elements.backgroundInput.addEventListener('change', handleBackgroundUpload);
    }
    if (elements.removeBackgroundBtn) {
      elements.removeBackgroundBtn.addEventListener('click', removeBackground);
    }
    
    // Logo上传相关事件
    if (elements.logoUploadArea) {
      elements.logoUploadArea.addEventListener('click', function() {
        if (elements.logoInput) {
          elements.logoInput.click();
        }
      });
    }
    if (elements.logoInput) {
      elements.logoInput.addEventListener('change', handleLogoUpload);
    }
    if (elements.removeLogoBtn) {
      elements.removeLogoBtn.addEventListener('click', removeLogo);
    }
    
    // 二维码上传相关事件
    if (elements.qrcodeUploadArea) {
      elements.qrcodeUploadArea.addEventListener('click', function() {
        if (elements.qrcodeInput) {
          elements.qrcodeInput.click();
        }
      });
    }
    if (elements.qrcodeInput) {
      elements.qrcodeInput.addEventListener('change', handleQrcodeUpload);
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
    
    // 更新商家信息显示
    updateBusinessInfoDisplay();
    
    // 检查URL中是否有模板ID参数
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('templateId');
    
    if (templateId && window.getTemplateById) {
      // 尝试根据ID加载指定模板
      const selectedTemplate = window.getTemplateById(templateId);
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
    
    // 显示弹窗
    elements.templateModal.style.display = 'flex';
  }
  
  // 在模板弹窗中根据当前日期自动选择月份和节日
  function autoSelectDateInModal() {
    try {
      const result = utils.autoSelectByDate();
      if (result && result.month) {
        // 选中对应的月份按钮
        const monthButton = document.querySelector(`#modalMonthButtons .month-btn:nth-child(${result.month})`);
        if (monthButton) {
          monthButton.click();
        }
      }
    } catch (error) {
      console.error('自动选择日期失败:', error);
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
    
    // 初始化时自动选中并滚动到当前月份（10月）
    // 注意：这里设置为10月作为默认值，可以根据实际需要修改
    const defaultMonth = 10;
    setTimeout(() => {
      const defaultMonthButton = elements.modalMonthButtons.querySelector(`[data-month="${defaultMonth}"]`);
      if (defaultMonthButton) {
        // 触发点击事件，选中该月份并执行滚动
        defaultMonthButton.click();
      }
    }, 100);
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
      festivalTag.addEventListener('click', function() {
        // 移除所有标签的选中状态
        document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
        // 添加当前标签的选中状态
        this.classList.add('active');
        // 筛选显示该节日的模板
        filterTemplatesByFestival(festival);
      });
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
        
        // 如果是当前选中的模板，添加选中样式
        if (state.currentTemplate && state.currentTemplate.id === template.id) {
          templateItem.classList.add('selected');
        }
        
        // 添加点击事件
        templateItem.addEventListener('click', function() {
          // 移除所有模板项的选中状态
          document.querySelectorAll('.template-item').forEach(item => item.classList.remove('selected'));
          // 添加当前模板项的选中状态
          this.classList.add('selected');
          // 更新当前模板
          selectTemplate(template);
        });
        
        // 创建模板图片
        const templateImg = document.createElement('img');
        templateImg.src = template.thumbnail;
        templateImg.alt = template.name;
        templateImg.className = 'template-thumbnail';
        
        // 创建模板名称
        const templateName = document.createElement('div');
        templateName.className = 'template-name';
        templateName.textContent = template.name;
        
        // 组合模板项
        templateItem.appendChild(templateImg);
        templateItem.appendChild(templateName);
        
        // 添加到网格
        elements.templateGrid.appendChild(templateItem);
      });
    }
  }
  
  // 选择模板
  function selectTemplate(template) {
    state.currentTemplate = template;
    // 无论是否有自定义背景，都更新模板显示
    updateTemplateDisplay();
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
          
          // 如果是当前选中的模板，添加选中样式
          if (state.currentTemplate && state.currentTemplate.id === template.id) {
            templateItem.classList.add('selected');
          }
          
          // 添加点击事件
          templateItem.addEventListener('click', function() {
            // 移除所有模板项的选中状态
            document.querySelectorAll('.template-item').forEach(item => item.classList.remove('selected'));
            // 添加当前模板项的选中状态
            this.classList.add('selected');
            // 更新当前模板
            selectTemplate(template);
          });
          
          // 创建模板图片
          const templateImg = document.createElement('img');
          templateImg.src = template.thumbnail;
          templateImg.alt = template.name;
          templateImg.className = 'template-thumbnail';
          
          // 创建模板名称
          const templateName = document.createElement('div');
          templateName.className = 'template-name';
          templateName.textContent = template.name;
          
          // 组合模板项
          templateItem.appendChild(templateImg);
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
          
          // 如果是当前选中的模板，添加选中样式
          if (state.currentTemplate && state.currentTemplate.id === template.id) {
            templateItem.classList.add('selected');
          }
          
          // 添加点击事件
          templateItem.addEventListener('click', function() {
            // 移除所有模板项的选中状态
            document.querySelectorAll('.template-item').forEach(item => item.classList.remove('selected'));
            // 添加当前模板项的选中状态
            this.classList.add('selected');
            // 更新当前模板
            selectTemplate(template);
          });
          
          // 创建模板图片
          const templateImg = document.createElement('img');
          templateImg.src = template.thumbnail;
          templateImg.alt = template.name;
          templateImg.className = 'template-thumbnail';
          
          // 创建模板名称
          const templateName = document.createElement('div');
          templateName.className = 'template-name';
          templateName.textContent = template.name;
          
          // 组合模板项
          templateItem.appendChild(templateImg);
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
      elements.templateModal.style.display = 'none';
    }
  }
  
  // 为输入框添加清除按钮和改进提示语交互
  function enhanceInputWithClearButton(inputElement, placeholderText) {
    // 如果清除按钮已存在，则移除它
    let clearButton = inputElement.parentNode.querySelector('.clear-button');
    if (clearButton) {
      inputElement.parentNode.removeChild(clearButton);
    }
    
    // 为输入框容器添加相对定位
    const container = inputElement.parentNode;
    container.style.position = 'relative';
    
    // 创建清除按钮
    clearButton = document.createElement('button');
    clearButton.className = 'clear-button absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-600 focus:outline-none';
    clearButton.textContent = '✕';
    clearButton.style.cursor = 'pointer';
    clearButton.style.display = 'none'; // 默认隐藏
    
    // 添加清除按钮点击事件
    clearButton.addEventListener('click', function() {
      inputElement.value = '';
      clearButton.style.display = 'none';
    });
    
    // 添加输入事件，控制清除按钮显示/隐藏
    inputElement.addEventListener('input', function() {
      clearButton.style.display = this.value ? 'block' : 'none';
    });
    
    // 添加焦点事件，当获得焦点且内容是默认提示语时，自动清空
    inputElement.addEventListener('focus', function() {
      if (this.value === placeholderText) {
        this.value = '';
      }
      // 显示清除按钮
      if (this.value) {
        clearButton.style.display = 'block';
      }
    });
    
    // 添加失去焦点事件，如果输入框为空，则恢复默认提示语
    inputElement.addEventListener('blur', function() {
      if (!this.value.trim()) {
        this.value = placeholderText;
        clearButton.style.display = 'none';
      }
    });
    
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
    
    // 为输入框添加清除按钮和改进提示语交互
    enhanceInputWithClearButton(elements.businessNameInput, '点击编辑商家名称');
    enhanceInputWithClearButton(elements.promoTextInput, '点击编辑促销信息');
    
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
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodePreviewImg.src = state.businessInfo.qrcode;
      } else {
        elements.qrcodeUploadArea.style.display = 'block';
        elements.qrcodePreview.style.display = 'none';
      }
    }
    
    // 显示弹窗
    elements.businessInfoModal.style.display = 'flex';
  }
  
  // 关闭商家信息编辑弹窗
  function closeBusinessInfoModal() {
    if (elements.businessInfoModal) {
      elements.businessInfoModal.style.display = 'none';
    }
  }
  
  // 保存商家信息
  function saveBusinessInfo() {
    if (!elements.businessNameInput || !elements.promoTextInput) return;
    
    // 获取表单数据
    state.businessInfo.name = elements.businessNameInput.value.trim() || '点击编辑商家名称';
    state.businessInfo.promoText = elements.promoTextInput.value.trim() || '点击编辑促销信息';
    
    // 保存到本地存储
    localStorage.setItem('businessInfo', JSON.stringify(state.businessInfo));
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 关闭弹窗
    closeBusinessInfoModal();
    
    // 添加成功提示动画效果
    showToast('商家信息保存成功');
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
    
    // 3秒后隐藏
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 20px)';
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
    };
    reader.readAsDataURL(file);
    
    // 重置文件输入，以便可以再次选择相同的文件
    event.target.value = '';
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
    };
    reader.readAsDataURL(file);
    
    // 重置文件输入
    event.target.value = '';
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
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodeUploadArea.style.display = 'none';
      }
      
      // 显示成功提示
      showToast('二维码上传成功');
    };
    reader.readAsDataURL(file);
    
    // 重置文件输入
    event.target.value = '';
  }
  
  // 移除二维码
  function removeQrcode() {
    state.businessInfo.qrcode = null;
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 隐藏预览，显示上传区域
    if (elements.qrcodePreview && elements.qrcodeUploadArea) {
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
  function downloadPoster() {
    if (!state.currentTemplate) {
      showToast('请先选择一个模板');
      return;
    }
    
    // 显示加载状态
    if (elements.downloadBtn) {
      elements.downloadBtn.disabled = true;
      elements.downloadBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 正在生成...';
    }
    
    // 转换为图片并下载
    convertToImageAndDownload();
    
    // 重置下载按钮状态
    setTimeout(() => {
      if (elements.downloadBtn) {
        elements.downloadBtn.disabled = false;
        elements.downloadBtn.innerHTML = '<i class="fa fa-download"></i> 下载海报';
      }
    }, 2000);
  }
  
  // 转换为图片并下载
  function convertToImageAndDownload() {
    if (!elements.posterFrame) return;
    
    // 复制海报容器
    const clonedContainer = elements.posterFrame.cloneNode(true);
    
    // 设置克隆容器的样式
    clonedContainer.style.position = 'absolute';
    clonedContainer.style.top = '-9999px';
    clonedContainer.style.left = '-9999px';
    
    // 添加到body
    document.body.appendChild(clonedContainer);
    
    // 使用html2canvas转换为图片
    html2canvas(clonedContainer, {
      backgroundColor: null,
      scale: 2, // 提高分辨率
      useCORS: true, // 允许跨域图片
      logging: false
    }).then(canvas => {
      // 创建下载链接
      const link = document.createElement('a');
      link.download = `海报_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      // 清理克隆的容器
      document.body.removeChild(clonedContainer);
      
      // 显示成功提示
      showToast('海报下载成功');
    }).catch(error => {
      console.error('生成图片失败:', error);
      showToast('生成图片失败，请重试');
      
      // 清理克隆的容器
      document.body.removeChild(clonedContainer);
    });
  }
  
  // 移除重复的showToast函数定义
  
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