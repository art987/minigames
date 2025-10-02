// 首页脚本

// 当前筛选条件
window.currentFilters = {
  month: null,
  festival: null
};

// 全局DOM元素引用
let monthButtonsContainer, festivalTagsContainer, templatesGrid, templatesCount, emptyState, loadingState;

// 初始化应用
function initApp() {
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