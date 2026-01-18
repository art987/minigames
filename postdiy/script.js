// 首页脚本

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
        <div class="wechat-warning-content" style="background: white; border-radius: 12px; padding: 24px; max-width: 320px; text-align: center; position: relative;">
          
          <h3 style="margin: 0 0 12px 0; color: #333; font-size: 18px;">微信内不支持图片（海报）下载</h3>
          <p style="margin: 0 0 20px 0; color: #666; font-size: 14px; line-height: 1.4;">如需体验完整功能，请右上角点"..."选择外部浏览器进行访问</p>
          ${debugInfo}
          <div class="arrow-indicator" style="position: fixed;top: 19px; right: 36px; width: 30px; height: 30px; transform: rotate(348deg);">
            <div style="width: 100%; height: 100%; border-right: 3px solid #f6a83b; border-top: 3px solid #f6a83b;"></div>
          </div>
          <button id="continueBrowse" class="continue-btn" style="background: #0d8507ff; border: 2px solid #dee2e6; border-radius: 6px; padding: 10px 20px; color: #ffffffff; font-size: 16px; cursor: pointer; width: 100%;">我不下载图片，随便看看</button>
        </div>
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
    border-bottom: 2px solid ; padding: 8px 16px; z-index: 9998; text-align: center; font-size: 12px; color: #ffffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
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

// 当前筛选条件
window.currentFilters = {
  month: null,
  festival: null
};

// 全局DOM元素引用
let monthButtonsContainer, festivalTagsContainer, templatesGrid, templatesCount, emptyState, loadingState;

// 初始化应用
function initApp() {
  // 微信浏览器检测
  window.wechatWarning.init();
  
  // 获取DOM元素
  monthButtonsContainer = document.getElementById('monthButtons');
  festivalTagsContainer = document.getElementById('festivalTags');
  templatesGrid = document.getElementById('templatesGrid');
  templatesCount = document.getElementById('templatesCount');
  emptyState = document.getElementById('emptyState');
  loadingState = document.getElementById('loadingState');

  // 初始化月份按钮
  initMonthButtons();

  // 根据当前日期自动选择月份和节日
  autoSelectByDate();

  // 加载模板
  loadTemplates();
}

// 初始化月份按钮
function initMonthButtons() {
  monthButtonsContainer.innerHTML = '';
  
  // 创建12个月的按钮
  for (let i = 1; i <= 12; i++) {
    const monthButton = document.createElement('button');
    monthButton.className = `month-btn ${window.currentFilters.month === i ? 'active' : ''}`;
    monthButton.textContent = `${i}月`;
    monthButton.dataset.month = i;
    
    monthButton.addEventListener('click', function() {
      // 切换月份选择
      const month = parseInt(this.dataset.month);
      
      // 如果点击的是当前选中的月份，则取消选择
      if (window.currentFilters.month === month) {
        window.currentFilters.month = null;
        this.classList.remove('active');
      } else {
        window.currentFilters.month = month;
        // 移除其他按钮的active状态
        document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // 自动滚动到当前选中的月份，使其居中显示
        scrollMonthToCenter(this);
      }
      
      // 重置节日选择
      window.currentFilters.festival = null;
      document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
      
      // 更新节日标签
      updateFestivalTags();
      
      // 应用筛选
      applyFilters();
    });
    
    monthButtonsContainer.appendChild(monthButton);
  }
}

// 滚动月份按钮到中心位置
function scrollMonthToCenter(button) {
  const container = monthButtonsContainer;
  const containerRect = container.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const scrollLeft = container.scrollLeft + buttonRect.left - containerRect.left - (containerRect.width / 2) + (buttonRect.width / 2);
  
  container.scrollTo({
    left: scrollLeft,
    behavior: 'smooth'
  });
}

// 更新节日标签
function updateFestivalTags() {
  festivalTagsContainer.innerHTML = '';
  
  let festivals = [];
  
  if (window.currentFilters.month) {
    // 获取选中月份的所有节日
    festivals = utils.getFestivalNamesByMonth(window.currentFilters.month);
  } else {
    // 获取所有节日
    const allFestivals = utils.getAllFestivals();
    festivals = Object.keys(allFestivals);
  }
  
  // 如果没有节日，显示提示
  if (festivals.length === 0) {
    const noFestivalsText = document.createElement('span');
    noFestivalsText.className = 'text-text-secondary text-sm';
    noFestivalsText.textContent = '当前月份暂无节日';
    festivalTagsContainer.appendChild(noFestivalsText);
    return;
  }
  
  // 创建节日标签
  festivals.forEach(festival => {
    const festivalTag = document.createElement('span');
    festivalTag.className = `festival-tag ${window.currentFilters.festival === festival ? 'active' : ''}`;
    festivalTag.textContent = festival;
    festivalTag.dataset.festival = festival;
    
    festivalTag.addEventListener('click', function() {
      // 切换节日选择
      const selectedFestival = this.dataset.festival;
      
      // 如果点击的是当前选中的节日，则取消选择
      if (window.currentFilters.festival === selectedFestival) {
        window.currentFilters.festival = null;
        this.classList.remove('active');
      } else {
        window.currentFilters.festival = selectedFestival;
        // 移除其他标签的active状态
        document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
        this.classList.add('active');
      }
      
      // 应用筛选
      applyFilters();
    });
    
    festivalTagsContainer.appendChild(festivalTag);
  });
}

// 根据当前日期自动选择月份和节日
function autoSelectByDate() {
  try {
    const result = utils.autoSelectByDate();
    if (result) {
      window.currentFilters.month = result.month;
      window.currentFilters.festival = result.festival;
      
      // 更新月份按钮状态
      const activeMonthButton = document.querySelector(`.month-btn[data-month="${result.month}"]`);
      if (activeMonthButton) {
        activeMonthButton.classList.add('active');
        
        // 确保自动选中的月份居中显示，特别是对于靠后月份如10月
        setTimeout(() => {
          scrollMonthToCenter(activeMonthButton);
        }, 100);
      }
      
      // 更新节日标签
      updateFestivalTags();
      
      // 如果有自动选择的节日，激活对应的标签
      if (result.festival) {
        setTimeout(() => {
          const festivalTag = document.querySelector(`.festival-tag[data-festival="${result.festival}"]`);
          if (festivalTag) {
            festivalTag.classList.add('active');
          }
        }, 100);
      }
    }
  } catch (error) {
    console.error('自动选择日期失败:', error);
  }
}

// 应用筛选条件
function applyFilters() {
  showLoading(true);
  
  // 使用setTimeout模拟异步加载，提高用户体验
  setTimeout(() => {
    try {
      const filteredTemplates = utils.getTemplatesByFilters(window.currentFilters.month, window.currentFilters.festival);
      
      // 更新模板计数
      templatesCount.textContent = `${filteredTemplates.length} 个模板`;
      
      // 渲染模板
      renderTemplates(filteredTemplates);
      
      // 处理空状态
      if (filteredTemplates.length === 0) {
        handleEmptyState();
      } else {
        hideEmptyState();
      }
    } catch (error) {
      console.error('应用筛选条件失败:', error);
      showToast('筛选模板失败，请重试', 'error');
      handleEmptyState();
    } finally {
      showLoading(false);
    }
  }, 300);
}

// 加载模板
function loadTemplates() {
  showLoading(true);
  
  // 使用setTimeout模拟加载延迟
  setTimeout(() => {
    try {
      const templates = utils.getAllTemplates();
      
      // 更新模板计数
      templatesCount.textContent = `${templates.length} 个模板`;
      
      // 渲染模板
      renderTemplates(templates);
      
      // 更新节日标签
      updateFestivalTags();
      
      // 应用当前筛选条件
      applyFilters();
    } catch (error) {
      console.error('加载模板失败:', error);
      showToast('加载模板失败，请刷新页面重试', 'error');
      handleEmptyState();
    } finally {
      showLoading(false);
    }
  }, 500);
}

// 渲染模板
function renderTemplates(templates) {
  templatesGrid.innerHTML = '';
  
  if (!templates || templates.length === 0) {
    return;
  }
  
  // 创建模板卡片
  templates.forEach(template => {
    const templateCard = createTemplateCard(template);
    templatesGrid.appendChild(templateCard);
  });
}

// 创建模板卡片
function createTemplateCard(template) {
  const card = document.createElement('div');
  card.className = 'template-card';
  
  // 卡片内容
  card.innerHTML = `
    <div class="template-thumbnail-container">
      <img class="template-thumbnail" src="${template.thumbnail || template.image}" alt="${template.name}" loading="lazy">
    </div>
    <div class="template-info">
      <h3 class="template-name">${template.name}</h3>
      <div class="template-tags">
        <span class="template-type-tag">${template.type || '通用'}</span>
        ${template.festivals ? template.festivals.map(festival => `<span class="template-festival-tag">${festival}</span>`).join('') : ''}
      </div>
    </div>
  `;
  
  // 添加点击事件
  card.addEventListener('click', function() {
    // 跳转到编辑器页面，并传递模板ID
    window.location.href = `editor.html?templateId=${template.id}`;
  });
  
  return card;
}

// 处理空状态
function handleEmptyState() {
  emptyState.classList.remove('hidden');
  templatesGrid.classList.add('hidden');
}

// 隐藏空状态
function hideEmptyState() {
  emptyState.classList.add('hidden');
  templatesGrid.classList.remove('hidden');
}

// 显示/隐藏加载状态
function showLoading(show) {
  if (show) {
    loadingState.classList.remove('hidden');
    templatesGrid.classList.add('hidden');
    emptyState.classList.add('hidden');
  } else {
    loadingState.classList.add('hidden');
  }
}

// 显示提示信息
function showToast(message, type = 'info', duration = 3000) {
  try {
    if (window.utils && window.utils.showToast) {
      window.utils.showToast(message, type, duration);
    } else {
      // 备用实现
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      
      document.body.appendChild(toast);
      
      // 显示Toast
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);
      
      // 设置自动消失
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, duration);
    }
  } catch (error) {
    console.error('显示提示信息失败:', error);
  }
}

// 监听窗口大小变化，优化响应式显示
window.addEventListener('resize', utils.debounce(function() {
  // 根据窗口大小调整布局
  const isMobile = window.innerWidth < 640;
  
  // 可以在这里添加额外的响应式调整逻辑
}, 300));

// 监听页面加载完成事件
document.addEventListener('DOMContentLoaded', function() {
  try {
    // 初始化应用
    initApp();
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(e) {
      // Escape键重置筛选
      if (e.key === 'Escape') {
        window.currentFilters = {
          month: null,
          festival: null
        };
        initMonthButtons();
        updateFestivalTags();
        applyFilters();
        showToast('筛选条件已重置');
      }
    });
    
    console.log('首页应用初始化完成');
  } catch (error) {
    console.error('首页初始化失败:', error);
    showToast('页面加载失败，请刷新页面重试', 'error');
  }
});

// 导出关键函数到window对象，方便调试和外部调用
window.applyFilters = applyFilters;
window.autoSelectByDate = autoSelectByDate;
window.loadTemplates = loadTemplates;
window.showToast = showToast;

// VIP登录功能
function initVipLogin() {
  const vipLoginBtn = document.getElementById('vipLoginBtn');
  const vipStatus = document.getElementById('vipStatus');
  const vipLoginModal = document.getElementById('vipLoginModal');
  const closeVipLoginModalBtn = document.getElementById('closeVipLoginModalBtn');
  const vipLoginCancelBtn = document.getElementById('vipLoginCancelBtn');
  const vipLoginSubmitBtn = document.getElementById('vipLoginSubmitBtn');
  const vipIdInput = document.getElementById('vipIdInput');
  const vipPasswordInput = document.getElementById('vipPasswordInput');
  const vipLoginMessage = document.getElementById('vipLoginMessage');

  // 检查VIP状态并更新UI
  function updateVipStatus() {
    if (window.isVipActive && window.isVipActive()) {
      vipLoginBtn.classList.add('hidden');
      vipStatus.classList.remove('hidden');
      
      // 显示VIP商家名称和有效期
      const vipName = localStorage.getItem('vipName');
      const vipValidUntil = localStorage.getItem('vipValidUntil');
      const vipStatusText = vipStatus.querySelector('span');
      if (vipStatusText && vipName && vipValidUntil) {
        vipStatusText.textContent = `VIP${vipName}已登录 (${vipValidUntil})`;
      }
    } else {
      vipLoginBtn.classList.remove('hidden');
      vipStatus.classList.add('hidden');
    }
  }
  
  // VIP退出功能
  function handleVipLogout() {
    if (confirm('确定要退出VIP登录吗？')) {
      window.clearVipLogin();
      updateVipStatus();
      showToast('已退出VIP登录', 'success');
    }
  }

  // 显示VIP登录弹窗
  function showVipLoginModal() {
    vipLoginModal.classList.remove('hidden');
    vipIdInput.focus();
  }

  // 关闭VIP登录弹窗
  function closeVipLoginModal() {
    vipLoginModal.classList.add('hidden');
    vipIdInput.value = '';
    vipPasswordInput.value = '';
    vipLoginMessage.textContent = '';
    vipLoginMessage.className = 'login-message';
  }

  // VIP登录
  function handleVipLogin() {
    const id = vipIdInput.value.trim();
    const password = vipPasswordInput.value.trim();

    if (!id || !password) {
      vipLoginMessage.textContent = '请输入VIP ID和密码';
      vipLoginMessage.className = 'login-message error';
      return;
    }

    const result = window.validateVipLogin(id, password);
    
    if (result.success) {
      vipLoginMessage.textContent = result.message;
      vipLoginMessage.className = 'login-message success';
      
      // 保存VIP登录状态
      window.saveVipLogin(result.user);
      
      // 延迟关闭弹窗并跳转到编辑器
      setTimeout(() => {
        closeVipLoginModal();
        updateVipStatus();
        
        // 跳转到编辑器页面，带上VIP参数
        window.location.href = `editor.html?vip=${result.user.id}`;
      }, 1000);
    } else {
      vipLoginMessage.textContent = result.message;
      vipLoginMessage.className = 'login-message error';
    }
  }

  // 事件监听
  vipLoginBtn.addEventListener('click', showVipLoginModal);
  closeVipLoginModalBtn.addEventListener('click', closeVipLoginModal);
  vipLoginCancelBtn.addEventListener('click', closeVipLoginModal);
  vipLoginSubmitBtn.addEventListener('click', handleVipLogin);
  
  // VIP退出按钮事件监听
  const vipLogoutBtn = document.getElementById('vipLogoutBtn');
  if (vipLogoutBtn) {
    vipLogoutBtn.addEventListener('click', handleVipLogout);
  }

  // 按回车键登录
  vipPasswordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleVipLogin();
    }
  });

  // 点击背景关闭弹窗
  vipLoginModal.addEventListener('click', function(e) {
    if (e.target === vipLoginModal) {
      closeVipLoginModal();
    }
  });

  // 初始化VIP状态
  updateVipStatus();
}

// 在页面加载完成后初始化VIP登录功能
document.addEventListener('DOMContentLoaded', function() {
  // 延迟初始化VIP登录，确保VIP数据已加载
  setTimeout(initVipLogin, 100);
});