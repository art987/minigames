// 首页脚本

// 节日日期数据（2026年和2027年）
const festivalDates = {
  // 2026年节日
  '2026': {
    '元旦': '2026-01-01 星期四',
    '小寒': '2026-01-05 星期一',
    '大寒': '2026-01-20 星期二',
    '腊八节': '2026-01-26 星期一',
    '小年': '2026-02-10 星期二',
    '立春': '2026-02-04 星期三',
    '情人节': '2026-02-14 星期六',
    '除夕': '2026-02-16 星期一',
    '春节': '2026-02-17 星期二',
    '雨水': '2026-02-18 星期三',
    '元宵节': '2026-03-03 星期二',
    '惊蛰': '2026-03-05 星期四',
    '妇女节': '2026-03-08 星期日',
    '植树节': '2026-03-12 星期四',
    '龙抬头': '2026-03-20 星期五',
    '春分': '2026-03-20 星期五',
    '愚人节': '2026-04-01 星期三',
    '清明': '2026-04-05 星期日',
    '谷雨': '2026-04-20 星期一',
    '世界地球日': '2026-04-22 星期三',
    '世界读书日': '2026-04-23 星期四',
    '立夏': '2026-05-05 星期二',
    '小满': '2026-05-21 星期四',
    '劳动节': '2026-05-01 星期五',
    '青年节': '2026-05-04 星期一',
    '520': '2026-05-20 星期三',
    '芒种': '2026-06-05 星期五',
    '夏至': '2026-06-21 星期日',
    '端午节': '2026-06-19 星期五',
    '儿童节': '2026-06-01 星期一',
    '建党节': '2026-07-01 星期三',
    '小暑': '2026-07-07 星期二',
    '大暑': '2026-07-23 星期四',
    '建军节': '2026-08-01 星期六',
    '立秋': '2026-08-07 星期五',
    '处暑': '2026-08-23 星期日',
    '七夕节': '2026-08-19 星期三',
    '中元节': '2026-08-27 星期四',
    '白露': '2026-09-07 星期一',
    '秋分': '2026-09-23 星期三',
    '中秋节': '2026-09-25 星期五',
    '教师节': '2026-09-10 星期三',
    '国庆节': '2026-10-01 星期四',
    '寒露': '2026-10-08 星期四',
    '霜降': '2026-10-23 星期五',
    '重阳节': '2026-10-18 星期日',
    '立冬': '2026-11-07 星期六',
    '小雪': '2026-11-22 星期日',
    '寒衣节': '2026-11-09 星期一',
    '下元节': '2026-11-23 星期一',
    '双十一': '2026-11-11 星期三',
    '大雪': '2026-12-07 星期一',
    '冬至': '2026-12-22 星期二',
    '圣诞节': '2026-12-25 星期五',
    '双十二': '2026-12-12 星期六'
  },
  // 2027年节日
  '2027': {
    '元旦': '2027-01-01 星期五',
    '小寒': '2027-01-05 星期二',
    '大寒': '2027-01-20 星期三',
    '腊八节': '2027-01-15 星期五',
    '小年': '2027-01-30 星期六',
    '立春': '2027-02-04 星期四',
    '情人节': '2027-02-14 星期日',
    '除夕': '2027-02-05 星期五',
    '春节': '2027-02-06 星期六',
    '雨水': '2027-02-19 星期五',
    '元宵节': '2027-02-20 星期六',
    '惊蛰': '2027-03-06 星期六',
    '妇女节': '2027-03-08 星期一',
    '植树节': '2027-03-12 星期五',
    '龙抬头': '2027-03-21 星期日',
    '春分': '2027-03-21 星期日',
    '愚人节': '2027-04-01 星期四',
    '清明': '2027-04-05 星期一',
    '谷雨': '2027-04-20 星期二',
    '世界地球日': '2027-04-22 星期四',
    '世界读书日': '2027-04-23 星期五',
    '立夏': '2027-05-06 星期四',
    '小满': '2027-05-21 星期五',
    '劳动节': '2027-05-01 星期六',
    '青年节': '2027-05-04 星期二',
    '520': '2027-05-20 星期四',
    '芒种': '2027-06-06 星期日',
    '夏至': '2027-06-21 星期一',
    '端午节': '2027-06-09 星期三',
    '儿童节': '2027-06-01 星期二',
    '建党节': '2027-07-01 星期四',
    '小暑': '2027-07-07 星期三',
    '大暑': '2027-07-23 星期五',
    '建军节': '2027-08-01 星期日',
    '立秋': '2027-08-07 星期六',
    '处暑': '2027-08-23 星期一',
    '七夕节': '2027-08-08 星期日',
    '中元节': '2027-08-17 星期二',
    '白露': '2027-09-07 星期二',
    '秋分': '2027-09-23 星期四',
    '中秋节': '2027-10-05 星期二',
    '教师节': '2027-09-10 星期五',
    '国庆节': '2027-10-01 星期五',
    '寒露': '2027-10-08 星期五',
    '霜降': '2027-10-23 星期六',
    '重阳节': '2027-10-08 星期五',
    '立冬': '2027-11-07 星期日',
    '小雪': '2027-11-22 星期一',
    '寒衣节': '2027-11-08 星期一',
    '下元节': '2027-11-22 星期一',
    '双十一': '2027-11-11 星期四',
    '大雪': '2027-12-07 星期二',
    '冬至': '2027-12-22 星期三',
    '圣诞节': '2027-12-25 星期六',
    '双十二': '2027-12-12 星期日',
  }
};

// 显示当前日期
function displayCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekday = weekdays[today.getDay()];
  
  const dateStr = `${year}-${month}-${day}  ${weekday}`;
  if (currentDateDisplay) {
    currentDateDisplay.textContent = dateStr;
  }
}

// 计算两个日期之间的天数差
function getDaysUntilDate(targetDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(targetDateStr.split(' ')[0]);
  targetDate.setHours(0, 0, 0, 0);
  
  const timeDiff = targetDate - today;
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return dayDiff;
}

// 获取节日的未来日期
function getFestivalFutureDate(festival) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = today.getFullYear();
  
  // 先检查今年的节日日期
  if (festivalDates[currentYear] && festivalDates[currentYear][festival]) {
    const festivalDateStr = festivalDates[currentYear][festival].split(' ')[0];
    const festivalDate = new Date(festivalDateStr);
    festivalDate.setHours(0, 0, 0, 0);
    
    if (festivalDate >= today) {
      return festivalDates[currentYear][festival];
    }
  }
  
  // 如果今年节日已过，返回明年的日期
  const nextYear = currentYear + 1;
  if (festivalDates[nextYear] && festivalDates[nextYear][festival]) {
    return festivalDates[nextYear][festival];
  }
  
  return '日期未找到';
}



// 初始化置顶按钮
function initBackToTopButton() {
  if (!backToTopBtn) return;
  
  // 滚动监听
  window.addEventListener('scroll', function() {
    const screenHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 当滚动超过2倍屏幕高度时显示置顶按钮
    if (scrollTop > screenHeight * 2) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  });
  
  // 点击事件
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
let monthButtonsContainer, festivalTagsContainer, templatesGrid, templatesCount, emptyState, loadingState, currentDateDisplay, festivalDateDisplay, backToTopBtn, currentDateDiv, festivalDateDiv;

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
  currentDateDisplay = document.getElementById('currentDateDisplay');
  festivalDateDisplay = document.getElementById('festivalDateDisplay');
  backToTopBtn = document.getElementById('backToTopBtn');
  currentDateDiv = document.querySelector('.current-date');
  festivalDateDiv = document.querySelector('.festival-date');

  // 显示当前日期
  displayCurrentDate();

  // 初始化月份按钮
  initMonthButtons();

  // 根据当前日期自动选择月份和节日
  autoSelectByDate();

  // 加载模板
  loadTemplates();

  // 初始化置顶按钮
  initBackToTopButton();
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

function scrollFestivalTagToView(tag) {
  if (!tag || !festivalTagsContainer) return;
  
  const containerRect = festivalTagsContainer.getBoundingClientRect();
  const tagRect = tag.getBoundingClientRect();
  
  // 计算滚动位置，让标签居中显示
  const scrollLeft = festivalTagsContainer.scrollLeft + tagRect.left - containerRect.left - (containerRect.width / 2) + (tagRect.width / 2);
  
  festivalTagsContainer.scrollTo({
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
        // 清空节日日期显示
        if (festivalDateDisplay) {
          festivalDateDisplay.innerHTML = '';
        }
        // 显示今日日期
        if (currentDateDiv) {
          currentDateDiv.style.display = 'block';
        }
        if (festivalDateDiv) {
          festivalDateDiv.style.display = 'block';
        }
      } else {
        window.currentFilters.festival = selectedFestival;
        // 移除其他标签的active状态
        document.querySelectorAll('.festival-tag').forEach(tag => {
          tag.classList.remove('active');
        });
        this.classList.add('active');
        
        // 滚动到当前选中的标签使其可见
        scrollFestivalTagToView(this);
        
        // 只有非早安分类才显示节日日期
        if (selectedFestival !== '☀️ 早安') {
          // 显示节日日期和倒计时
          const dateStr = getFestivalFutureDate(selectedFestival);
          const daysUntil = getDaysUntilDate(dateStr);
          
          let countdownText = '';
          if (daysUntil > 0) {
            countdownText = `（还有${daysUntil}天）`;
            // 不是今天，两个都显示
            if (currentDateDiv) {
              currentDateDiv.style.display = 'block';
            }
            if (festivalDateDiv) {
              festivalDateDiv.style.display = 'block';
            }
          } else if (daysUntil === 0) {
            countdownText = `（今天）`;
            // 是今天，隐藏今日日期，只显示节日日期
            if (currentDateDiv) {
              currentDateDiv.style.display = 'none';
            }
            if (festivalDateDiv) {
              festivalDateDiv.style.display = 'block';
            }
          } else {
            countdownText = `（已过期）`;
            // 已过期，两个都显示
            if (currentDateDiv) {
              currentDateDiv.style.display = 'block';
            }
            if (festivalDateDiv) {
              festivalDateDiv.style.display = 'block';
            }
          }
          
          if (festivalDateDisplay) {
            festivalDateDisplay.innerHTML = `<span class="festival-name">${selectedFestival}</span>：${dateStr} <span class="festival-countdown">${countdownText}</span>`;
          }
        } else {
          // 清空节日日期显示
          if (festivalDateDisplay) {
            festivalDateDisplay.innerHTML = '';
          }
          // 显示今日日期
          if (currentDateDiv) {
            currentDateDiv.style.display = 'block';
          }
          if (festivalDateDiv) {
            festivalDateDiv.style.display = 'block';
          }
        }
      }
      
      // 应用筛选
      applyFilters();
    });
    
    festivalTagsContainer.appendChild(festivalTag);
  });
  
  // 如果有活跃的节日标签，滚动到它使其可见
  setTimeout(() => {
    const activeTag = festivalTagsContainer.querySelector('.festival-tag.active');
    if (activeTag) {
      scrollFestivalTagToView(activeTag);
    }
  }, 100);
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
            
            // 显示节日日期并检查是否是今天
            const dateStr = getFestivalFutureDate(result.festival);
            const daysUntil = getDaysUntilDate(dateStr);
            
            // 如果是今天，隐藏今日日期，只显示节日日期
            if (daysUntil === 0) {
              if (currentDateDiv) {
                currentDateDiv.style.display = 'none';
              }
              if (festivalDateDiv) {
                festivalDateDiv.style.display = 'block';
              }
              
              let countdownText = `（今天）`;
              if (festivalDateDisplay) {
                festivalDateDisplay.innerHTML = `<span class="festival-name">${result.festival}</span>：${dateStr} <span class="festival-countdown">${countdownText}</span>`;
              }
            } else {
              // 不是今天，两个都显示
              if (currentDateDiv) {
                currentDateDiv.style.display = 'block';
              }
              if (festivalDateDiv) {
                festivalDateDiv.style.display = 'block';
              }
              
              let countdownText = `（还有${daysUntil}天）`;
              if (festivalDateDisplay) {
                festivalDateDisplay.innerHTML = `<span class="festival-name">${result.festival}</span>：${dateStr} <span class="festival-countdown">${countdownText}</span>`;
              }
            }
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
  
  // 在每个分类模板最后添加自定义背景图入口
  addCustomBackgroundEntry();
}

// 创建自定义背景图入口
function addCustomBackgroundEntry() {
  const customCard = document.createElement('div');
  customCard.className = 'template-card custom-background-entry';
  
  // 卡片内容
  customCard.innerHTML = `
    <div class="template-thumbnail-container">
      <div class="custom-background-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div class="template-info">
      <h3 class="template-name">自定义背景</h3>
      <div class="template-tags">
        <span class="template-type-tag">自定义</span>
      </div>
    </div>
  `;
  
  // 添加点击事件
  customCard.addEventListener('click', function() {
    // 跳转到编辑器页面，并传递自定义背景标识
    window.location.href = 'editor.html?customBackground=true';
  });
  
  templatesGrid.appendChild(customCard);
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
  const vipMenuContainer = document.getElementById('vipMenuContainer');
  const vipLoginBtn = document.getElementById('vipLoginBtn');
  const vipLoggedInMenu = document.getElementById('vipLoggedInMenu');
  const vipMenuToggle = document.getElementById('vipMenuToggle');
  const vipDropdownMenu = document.getElementById('vipDropdownMenu');
  const vipMenuItems = document.querySelectorAll('.vip-menu-item');
  const vipLoginModal = document.getElementById('vipLoginModal');
  const closeVipLoginModalBtn = document.getElementById('closeVipLoginModalBtn');
  const vipLoginCancelBtn = document.getElementById('vipLoginCancelBtn');
  const vipLoginSubmitBtn = document.getElementById('vipLoginSubmitBtn');
  const vipIdInput = document.getElementById('vipIdInput');
  const vipPasswordInput = document.getElementById('vipPasswordInput');
  const vipLoginMessage = document.getElementById('vipLoginMessage');
  const userInfoModal = document.getElementById('userInfoModal');
  const closeUserInfoModal = document.getElementById('closeUserInfoModal');
  const closeUserInfoBtn = document.getElementById('closeUserInfoBtn');
  const userInfoId = document.getElementById('userInfoId');
  const userInfoExpiry = document.getElementById('userInfoExpiry');
  const userInfoType = document.getElementById('userInfoType');

  // 检查VIP状态并更新UI
  function updateVipStatus() {
    if (window.isVipActive && window.isVipActive()) {
      // 显示已登录状态（三道杠菜单按钮）
      vipLoginBtn.classList.add('hidden');
      vipLoggedInMenu.classList.remove('hidden');
    } else {
      // 显示未登录状态（登录按钮）
      vipLoginBtn.classList.remove('hidden');
      vipLoggedInMenu.classList.add('hidden');
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
    // 移除关闭动画类
    vipLoginModal.classList.remove('closing');
    vipLoginModal.querySelector('.modal').classList.remove('closing');
    
    // 显示弹窗
    vipLoginModal.classList.remove('hidden');
    
    // 强制重绘以触发动画
    void vipLoginModal.offsetWidth;
    
    vipIdInput.focus();
  }

  // 关闭VIP登录弹窗
  function closeVipLoginModal() {
    // 添加关闭动画类
    vipLoginModal.classList.add('closing');
    vipLoginModal.querySelector('.modal').classList.add('closing');
    
    // 延迟隐藏弹窗
    setTimeout(() => {
      vipLoginModal.classList.add('hidden');
      // 移除关闭动画类
      vipLoginModal.classList.remove('closing');
      vipLoginModal.querySelector('.modal').classList.remove('closing');
      
      vipIdInput.value = '';
      vipPasswordInput.value = '';
      vipLoginMessage.textContent = '';
      vipLoginMessage.className = 'login-message';
    }, 400); // 匹配动画时长
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
      
      // 延迟关闭弹窗并留在当前页面
      setTimeout(() => {
        closeVipLoginModal();
        updateVipStatus();
        showToast('VIP登录成功', 'success');
      }, 1000);
    } else {
      vipLoginMessage.textContent = result.message;
      vipLoginMessage.className = 'login-message error';
    }
  }

  // VIP菜单系统事件
  function toggleVipDropdown() {
    if (vipDropdownMenu) {
      vipDropdownMenu.classList.toggle('hidden');
    }
  }
  
  function openUserInfoModal() {
    if (userInfoModal) {
      // 更新用户信息显示
      const vipName = localStorage.getItem('vipName');
      const vipValidUntil = localStorage.getItem('vipValidUntil');
      
      if (userInfoId) {
        userInfoId.textContent = vipName || 'VIP百事可乐';
      }
      if (userInfoExpiry) {
        userInfoExpiry.textContent = vipValidUntil || '2026-12-31';
      }
      if (userInfoType) {
        userInfoType.textContent = 'VIP用户';
      }
      
      userInfoModal.classList.remove('hidden');
    }
  }
  
  function closeUserInfoModalFunc() {
    if (userInfoModal) {
      userInfoModal.classList.add('hidden');
    }
  }
  
  function handleVipMenuItemClick(action) {
    switch (action) {
      case 'userInfo':
        openUserInfoModal();
        break;
      case 'logout':
        handleVipLogout();
        break;
    }
    
    // 关闭下拉菜单
    if (vipDropdownMenu) {
      vipDropdownMenu.classList.add('hidden');
    }
  }
  
  // 事件监听
  vipLoginBtn.addEventListener('click', showVipLoginModal);
  
  if (vipMenuToggle) {
    vipMenuToggle.addEventListener('click', toggleVipDropdown);
  }
  
  // VIP菜单项点击事件
  if (vipMenuItems) {
    vipMenuItems.forEach(item => {
      item.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        handleVipMenuItemClick(action);
      });
    });
  }
  
  // 用户信息弹窗事件监听
  if (closeUserInfoModal) {
    closeUserInfoModal.addEventListener('click', closeUserInfoModalFunc);
  }
  
  if (closeUserInfoBtn) {
    closeUserInfoBtn.addEventListener('click', closeUserInfoModalFunc);
  }
  
  closeVipLoginModalBtn.addEventListener('click', closeVipLoginModal);
  vipLoginCancelBtn.addEventListener('click', closeVipLoginModal);
  vipLoginSubmitBtn.addEventListener('click', handleVipLogin);
  
  // 点击页面其他地方关闭VIP下拉菜单
  document.addEventListener('click', function(e) {
    if (vipDropdownMenu && vipMenuToggle) {
      const isClickInsideMenu = vipMenuContainer.contains(e.target);
      if (!isClickInsideMenu && !vipDropdownMenu.classList.contains('hidden')) {
        vipDropdownMenu.classList.add('hidden');
      }
    }
  });

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