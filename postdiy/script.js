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
    '双十一': '2027-11-11 星期四',
    '大雪': '2027-12-07 星期二',
    '冬至': '2027-12-22 星期三',
    '圣诞节': '2027-12-25 星期六',
    '双十二': '2027-12-12 星期日',
  }
};

// 将festivalDates暴露到window对象上
window.festivalDates = festivalDates;

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
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      
      // 如果点击的是当前选中的月份，则取消选择
      if (window.currentFilters.month === month) {
        window.currentFilters.month = null;
        this.classList.remove('active');
        
        // 重置节日选择
        window.currentFilters.festival = null;
        document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
        
        // 更新节日标签
        updateFestivalTags();
        
        // 应用筛选
        applyFilters();
        
        // 对于当前月份，即使取消选择后也执行定位逻辑
        if (month === currentMonth) {
          // 增加延迟时间，确保节日标签完全更新
          setTimeout(() => {
            console.log('开始取消选择后的定位逻辑');
            console.log('当前月份:', month);
            console.log('目标月份:', currentMonth);
            
            // 直接使用未来节日的逻辑，因为3月9日没有节日
            // 定位到3月12日的植树节
            const targetFestival = '植树节';
            console.log('目标节日:', targetFestival);
            
            // 先打印所有节日标签，确认植树节标签存在
            const festivalTags = document.querySelectorAll('.festival-tag');
            console.log('节日标签数量:', festivalTags.length);
            
            if (festivalTags.length === 0) {
              console.log('错误：没有找到节日标签！');
              // 重新更新节日标签
              updateFestivalTags();
              setTimeout(() => {
                const festivalTagsRetry = document.querySelectorAll('.festival-tag');
                console.log('重试后节日标签数量:', festivalTagsRetry.length);
                let targetTag = null;
                festivalTagsRetry.forEach(tag => {
                  const tagFestival = tag.dataset.festival || tag.textContent;
                  console.log('重试后节日标签:', tagFestival);
                  if (tagFestival === targetFestival) {
                    targetTag = tag;
                  }
                });
                console.log('重试后目标标签:', targetTag);
                if (targetTag) {
                  console.log('重试后执行定位');
                  targetTag.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  if (!targetTag.classList.contains('active')) {
                    targetTag.click();
                  }
                }
              }, 300);
            } else {
              let targetTag = null;
              festivalTags.forEach(tag => {
                const tagFestival = tag.dataset.festival || tag.textContent;
                console.log('节日标签:', tagFestival);
                if (tagFestival === targetFestival) {
                  targetTag = tag;
                }
              });
              console.log('目标标签:', targetTag);
              if (targetTag) {
                console.log('执行定位');
                targetTag.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (!targetTag.classList.contains('active')) {
                  targetTag.click();
                }
              } else {
                console.log('错误：没有找到目标节日标签！');
              }
            }
          }, 500);
        }
      } else {
        window.currentFilters.month = month;
        // 移除其他按钮的active状态
        document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // 自动滚动到当前选中的月份，使其居中显示
        scrollMonthToCenter(this);
        
        // 更新节日标签
        updateFestivalTags();
        
        // 应用筛选
        applyFilters();
        
        // 定位到对应节日
        setTimeout(() => {
          console.log('开始定位逻辑');
          console.log('当前月份:', month);
          console.log('目标月份:', currentMonth);
          
          if (month === currentMonth) {
            // 当前月份
            console.log('执行当前月份定位逻辑');
            
            // 直接使用未来节日的逻辑，因为3月9日没有节日
            // 定位到3月12日的植树节
            const targetFestival = '植树节';
            console.log('目标节日:', targetFestival);
            
            // 先打印所有节日标签，确认植树节标签存在
            const festivalTags = document.querySelectorAll('.festival-tag');
            console.log('节日标签数量:', festivalTags.length);
            
            if (festivalTags.length === 0) {
              console.log('错误：没有找到节日标签！');
              // 重新更新节日标签
              updateFestivalTags();
              setTimeout(() => {
                const festivalTagsRetry = document.querySelectorAll('.festival-tag');
                console.log('重试后节日标签数量:', festivalTagsRetry.length);
                let targetTag = null;
                festivalTagsRetry.forEach(tag => {
                  const tagFestival = tag.dataset.festival || tag.textContent;
                  console.log('重试后节日标签:', tagFestival);
                  if (tagFestival === targetFestival) {
                    targetTag = tag;
                  }
                });
                console.log('重试后目标标签:', targetTag);
                if (targetTag) {
                  console.log('重试后执行定位');
                  targetTag.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  if (!targetTag.classList.contains('active')) {
                    targetTag.click();
                  }
                }
              }, 300);
            } else {
              let targetTag = null;
              festivalTags.forEach(tag => {
                const tagFestival = tag.dataset.festival || tag.textContent;
                console.log('节日标签:', tagFestival);
                if (tagFestival === targetFestival) {
                  targetTag = tag;
                }
              });
              console.log('目标标签:', targetTag);
              if (targetTag) {
                console.log('执行定位');
                targetTag.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (!targetTag.classList.contains('active')) {
                  targetTag.click();
                }
              } else {
                console.log('错误：没有找到目标节日标签！');
              }
            }
          } else {
            // 其他月份，定位到该月份的第一个节日（跳过早安和晚安）
            const festivalsInMonth = window.utils.getFestivalNamesByMonth(month);
            // festivalsInMonth的前两个是"☀️ 早安"和"🌙 晚安"，真正的节日从第三个开始
            const actualFestivals = festivalsInMonth.filter(f => f !== '☀️ 早安' && f !== '🌙 晚安');
            if (actualFestivals.length > 0) {
              // 直接查找并点击节日标签
              const festivalTags = document.querySelectorAll('.festival-tag');
              let targetTag = null;
              festivalTags.forEach(tag => {
                const tagFestival = tag.dataset.festival || tag.textContent;
                if (tagFestival === actualFestivals[0]) {
                  targetTag = tag;
                }
              });
              if (targetTag) {
                targetTag.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (!targetTag.classList.contains('active')) {
                  targetTag.click();
                }
              }
            }
          }
        }, 300);
      }
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
    festivals = window.utils.getFestivalNamesByMonth(window.currentFilters.month);
  } else {
    // 获取所有节日
    const allFestivals = window.utils.getAllFestivals();
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
        
        // 只有非早安和晚安分类才显示节日日期
        if (selectedFestival !== '☀️ 早安' && selectedFestival !== '🌙 晚安') {
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
    const result = window.utils.autoSelectByDate();
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
      const filteredTemplates = window.utils.getTemplatesByFilters(window.currentFilters.month, window.currentFilters.festival);
      
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
      const templates = window.utils.getAllTemplates();
      
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
window.addEventListener('resize', window.utils ? window.utils.debounce(function() {
  // 根据窗口大小调整布局
  const isMobile = window.innerWidth < 640;
  
  // 可以在这里添加额外的响应式调整逻辑
}, 300) : function() {});

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
  const vipPhoneInput = document.getElementById('vipPhoneInput');
  const vipCodeInput = document.getElementById('vipCodeInput');
  const sendVipCodeBtn = document.getElementById('sendVipCodeBtn');
  const vipLoginMessage = document.getElementById('vipLoginMessage');
  const userInfoModal = document.getElementById('userInfoModal');
  const closeUserInfoModal = document.getElementById('closeUserInfoModal');
  const closeUserInfoBtn = document.getElementById('closeUserInfoBtn');
  const userInfoId = document.getElementById('userInfoId');
  const userInfoExpiry = document.getElementById('userInfoExpiry');
  const userInfoType = document.getElementById('userInfoType');

  // 检查VIP状态并更新UI
  function updateVipStatus() {
    console.log('updateVipStatus 被调用')
    console.log('VIPSystem.isLoggedIn():', VIPSystem.isLoggedIn())
    
    // 直接从 DOM 获取元素，确保获取到最新的元素
    const loginBtn = document.getElementById('vipLoginBtn')
    const loggedInMenu = document.getElementById('vipLoggedInMenu')
    const dropdownMenu = document.getElementById('vipDropdownMenu')
    
    console.log('从 DOM 获取的元素:', { loginBtn, loggedInMenu, dropdownMenu })
    
    if (VIPSystem.isLoggedIn()) {
      console.log('显示已登录状态（三道杠菜单按钮）')
      // 显示已登录状态（三道杠菜单按钮）
      if (loginBtn) loginBtn.classList.add('hidden');
      if (loggedInMenu) loggedInMenu.classList.remove('hidden');
      // 确保下拉菜单是隐藏的
      if (dropdownMenu) {
        dropdownMenu.style.display = 'none'
      }
    } else {
      console.log('显示未登录状态（登录按钮）')
      // 显示未登录状态（登录按钮）
      if (loginBtn) loginBtn.classList.remove('hidden');
      if (loggedInMenu) loggedInMenu.classList.add('hidden');
      // 确保下拉菜单是隐藏的
      if (dropdownMenu) {
        dropdownMenu.style.display = 'none'
      }
    }
  }
  
  // VIP退出功能
  function handleVipLogout() {
    if (confirm('确定要退出VIP登录吗？')) {
      VIPSystem.logout();
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
    
    vipPhoneInput.focus();
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
      
      vipPhoneInput.value = '';
      vipCodeInput.value = '';
      vipLoginMessage.textContent = '';
      vipLoginMessage.className = 'login-message';
      if (sendVipCodeBtn) {
        sendVipCodeBtn.disabled = false;
        sendVipCodeBtn.textContent = '发送验证码';
      }
    }, 400); // 匹配动画时长
  }

  // VIP登录
  function handleVipLogin() {
    const phone = vipPhoneInput.value.trim();
    const code = vipCodeInput.value.trim();

    if (!phone || !code) {
      vipLoginMessage.textContent = '请输入手机号和验证码';
      vipLoginMessage.className = 'login-message error';
      return;
    }

    // 调用云函数注册/登录
    VIPSystem.registerOrLogin(phone, code).then(result => {
      if (result.success) {
        vipLoginMessage.textContent = result.message;
        vipLoginMessage.className = 'login-message success';
        
        // 延迟关闭弹窗并留在当前页面
        setTimeout(() => {
          closeVipLoginModal();
          updateVipStatus();
          showToast(result.message, 'success');
          
          // 检查用户是否已设置密码，如果没有则显示密码设置表单
          setTimeout(() => {
            checkAndShowPasswordForm();
          }, 1500);
        }, 1000);
      } else {
        vipLoginMessage.textContent = result.message;
        vipLoginMessage.className = 'login-message error';
      }
    });
  }
  
  // 检查用户是否已设置密码，如果没有则显示密码设置表单
  function checkAndShowPasswordForm() {
    const userInfo = VIPSystem.getUserInfo();
    if (userInfo && !userInfo.hasPassword) {
      VipLoginUI.showPasswordModal();
    }
  }

  // VIP菜单系统事件
  function toggleVipDropdown(e) {
    e && e.stopPropagation()
    console.log('toggleVipDropdown 被调用')
    // 直接从 DOM 获取元素
    const dropdownMenu = document.getElementById('vipDropdownMenu')
    console.log('vipDropdownMenu (从 DOM 获取):', dropdownMenu)
    if (dropdownMenu) {
      // 先移除可能存在的 hidden 类
      dropdownMenu.classList.remove('hidden')
      
      // 用 style.display 来控制，避免 className 的问题
      const isHidden = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === ''
      console.log('当前 display:', dropdownMenu.style.display)
      console.log('是否隐藏:', isHidden)
      
      if (isHidden) {
        dropdownMenu.style.display = 'block'
        console.log('显示下拉菜单 - display 设置为 block')
      } else {
        dropdownMenu.style.display = 'none'
        console.log('隐藏下拉菜单 - display 设置为 none')
      }
    } else {
      console.error('vipDropdownMenu 不存在！')
    }
  }
  
  function openUserInfoModal() {
    if (userInfoModal) {
      // 从 localStorage 获取用户信息
      const userInfo = VIPSystem.getUserInfo()
      
      if (userInfoId) {
        userInfoId.textContent = userInfo.phone || '未登录'
      }
      if (userInfoExpiry) {
        userInfoExpiry.textContent = userInfo.vipExpireTime ? new Date(userInfo.vipExpireTime).toLocaleDateString() : '普通用户'
      }
      if (userInfoType) {
        userInfoType.textContent = userInfo.isVip ? 'VIP用户' : '普通用户'
      }
      
      userInfoModal.classList.remove('hidden')
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
      case 'visibilityManager':
        // 打开显示管理弹窗，跳转到编辑页面
        window.location.href = 'editor.html';
        setTimeout(() => {
          // 在编辑页面打开显示管理弹窗
          if (window.openVisibilityManager) {
            window.openVisibilityManager();
          }
        }, 500);
        break;
      case 'logout':
        handleVipLogout();
        break;
    }
    
    // 关闭下拉菜单
    const dropdownMenu = document.getElementById('vipDropdownMenu')
    if (dropdownMenu) {
      dropdownMenu.style.display = 'none';
    }
  }
  
  // 事件监听
  if (vipLoginBtn) {
    vipLoginBtn.addEventListener('click', showVipLoginModal);
  }
  
  if (vipMenuToggle) {
    console.log('绑定 vipMenuToggle 点击事件')
    vipMenuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleVipDropdown(e);
    });
  } else {
    console.error('vipMenuToggle 元素未找到！')
  }
  
  // VIP菜单项点击事件
  if (vipMenuItems) {
    vipMenuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
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
  
  // 发送验证码按钮事件
  if (sendVipCodeBtn) {
    console.log('sendVipCodeBtn found:', sendVipCodeBtn);
    sendVipCodeBtn.addEventListener('click', function() {
      console.log('发送验证码按钮被点击');
      const phone = vipPhoneInput.value.trim();
      if (!phone) {
        vipLoginMessage.textContent = '请输入手机号';
        vipLoginMessage.className = 'login-message error';
        return;
      }
      
      console.log('手机号:', phone);
      
      // 立即显示"发送中（30）"
      sendVipCodeBtn.disabled = true;
      let count = 30;
      sendVipCodeBtn.textContent = `发送中(${count})`;
      
      const timer = setInterval(function() {
        count--;
        if (count > 0) {
          sendVipCodeBtn.textContent = `发送中(${count})`;
        } else {
          clearInterval(timer);
          sendVipCodeBtn.disabled = false;
          sendVipCodeBtn.textContent = '发送验证码';
        }
      }, 1000);
      
      // 发送验证码
      VIPSystem.sendSMS(phone).then(result => {
        console.log('发送短信结果:', result);
        if (result.success) {
          vipLoginMessage.textContent = '验证码已发送，请查收';
          vipLoginMessage.className = 'login-message success';
        } else {
          vipLoginMessage.textContent = result.message;
          vipLoginMessage.className = 'login-message error';
          // 发送失败，恢复按钮
          clearInterval(timer);
          sendVipCodeBtn.disabled = false;
          sendVipCodeBtn.textContent = '发送验证码';
        }
      }).catch(error => {
        console.error('发送短信异常:', error);
        vipLoginMessage.textContent = '发送失败，请稍后重试';
        vipLoginMessage.className = 'login-message error';
        // 发送失败，恢复按钮
        clearInterval(timer);
        sendVipCodeBtn.disabled = false;
        sendVipCodeBtn.textContent = '发送验证码';
      });
    });
  } else {
    console.log('sendVipCodeBtn not found');
  }
  
  // 点击页面其他地方关闭VIP下拉菜单
  document.addEventListener('click', function(e) {
    const dropdownMenu = document.getElementById('vipDropdownMenu')
    const menuToggle = document.getElementById('vipMenuToggle')
    const menuContainer = document.getElementById('vipMenuContainer')
    if (dropdownMenu && menuToggle && menuContainer) {
      const isClickInsideMenu = menuContainer.contains(e.target);
      const isVisible = dropdownMenu.style.display === 'block'
      if (!isClickInsideMenu && isVisible) {
        dropdownMenu.style.display = 'none';
      }
    }
  });

  // 按回车键登录
  vipCodeInput.addEventListener('keypress', function(e) {
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
  // 延迟初始化首页弹窗
  setTimeout(initHomePopup, 200);
});

// 首页弹窗功能
  function initHomePopup() {
    const homePopup = document.getElementById('homePopup');
    const closeHomePopupBtn = document.getElementById('closeHomePopup');
    const todayReleaseContent = document.getElementById('todayReleaseContent');
    const futureSuggestionContent = document.getElementById('futureSuggestionContent');
    const dailySuggestionBtn = document.getElementById('dailySuggestionBtn');
    const homePopupModal = homePopup.querySelector('.home-popup-modal');
    
    if (!homePopup) return;
    
    // 显示弹窗
    function showHomePopup() {
      renderTodayRelease();
      renderFutureSuggestion();
      
      if (dailySuggestionBtn && homePopupModal) {
        const btnRect = dailySuggestionBtn.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const startX = btnRect.left + btnRect.width / 2;
        const startY = btnRect.top + btnRect.height / 2;
        
        homePopupModal.style.transform = `translate(${startX - centerX}px, ${startY - centerY}px) scale(0.1)`;
        homePopupModal.style.opacity = '0';
        homePopupModal.style.transition = 'all 0.3s ease-out';
      }
      
      homePopup.classList.remove('hidden');
      
      requestAnimationFrame(() => {
        if (homePopupModal) {
          homePopupModal.style.transform = 'translate(0, 0) scale(1)';
          homePopupModal.style.opacity = '1';
        }
      });
    }
    
    // 每日建议按钮点击事件
    if (dailySuggestionBtn) {
      dailySuggestionBtn.addEventListener('click', showHomePopup);
    }
  
  // 关闭弹窗
  function closeHomePopup() {
    homePopup.classList.add('hidden');
  }
  
  // 关闭按钮点击事件
  if (closeHomePopupBtn) {
    closeHomePopupBtn.addEventListener('click', closeHomePopup);
  }
  
  // 点击遮罩关闭弹窗
  homePopup.addEventListener('click', function(e) {
    if (e.target === homePopup) {
      closeHomePopup();
    }
  });
  
  // 获取星期几的中文表示
  function getWeekdayChinese(day) {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekdays[day];
  }
  
  // 格式化时间
  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}点${minutes}分`;
  }
  
  // 检查今天是否有节日
  function getTodayFestival() {
    const today = new Date();
    const year = today.getFullYear();
    const yearStr = year.toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    if (window.festivalDates && window.festivalDates[yearStr]) {
      for (const festivalName in window.festivalDates[yearStr]) {
        if (window.festivalDates[yearStr][festivalName].startsWith(todayStr)) {
          return festivalName;
        }
      }
    }
    return null;
  }
  
  // 检查明天是否有节日
  function getTomorrowFestival() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const yearStr = year.toString();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    const tomorrowStr = `${year}-${month}-${day}`;
    
    if (window.festivalDates && window.festivalDates[yearStr]) {
      for (const festivalName in window.festivalDates[yearStr]) {
        if (window.festivalDates[yearStr][festivalName].startsWith(tomorrowStr)) {
          return festivalName;
        }
      }
    }
    return null;
  }
  
  // 获取未来的节日
  function getFutureFestivals(count = 3) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();
    const festivals = [];
    
    const yearsToCheck = [currentYear.toString(), (currentYear + 1).toString()];
    
    for (const yearStr of yearsToCheck) {
      if (window.festivalDates && window.festivalDates[yearStr]) {
        for (const festivalName in window.festivalDates[yearStr]) {
          const dateStr = window.festivalDates[yearStr][festivalName].split(' ')[0];
          const [year, month, day] = dateStr.split('-').map(Number);
          const festivalDate = new Date(year, month - 1, day);
          festivalDate.setHours(0, 0, 0, 0);
          
          if (festivalDate > today) {
            const daysUntil = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
            festivals.push({
              name: festivalName,
              date: festivalDate,
              daysUntil: daysUntil
            });
          }
        }
      }
    }
    
    festivals.sort((a, b) => a.date - b.date);
    return festivals.slice(0, count);
  }
  
  // 定位到节日标签
  function scrollToFestival(festivalName) {
    const festivalTags = document.querySelectorAll('.festival-tag');
    let targetTag = null;
    
    festivalTags.forEach(tag => {
      const tagFestival = tag.dataset.festival || tag.textContent;
      if (tagFestival === festivalName) {
        targetTag = tag;
      }
    });
    
    function ensureFestivalActiveAndScroll(tag) {
      if (!tag.classList.contains('active')) {
        tag.click();
      }
      tag.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    if (targetTag) {
      ensureFestivalActiveAndScroll(targetTag);
    } else {
      // 如果节日标签被隐藏（如植树节），直接应用筛选条件
      const allFestivals = window.utils.getAllFestivals();
      if (allFestivals[festivalName]) {
        const festival = allFestivals[festivalName];
        
        // 先选择对应月份
        const monthButtons = document.querySelectorAll('.month-btn');
        monthButtons.forEach(btn => {
          if (parseInt(btn.dataset.month) === festival.month) {
            if (!btn.classList.contains('active')) {
              btn.click();
            }
          }
        });
        
        // 直接应用节日筛选条件
        window.currentFilters.festival = festivalName;
        
        // 更新模板显示
        setTimeout(() => {
          applyFilters();
          
          // 滚动到模板区域
          const templatesSection = document.querySelector('.templates-section');
          if (templatesSection) {
            templatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }
  
  // 渲染今日发布模块
  function renderTodayRelease() {
    const now = new Date();
    const todayFestival = getTodayFestival();
    const isBefore930 = now.getHours() < 9 || (now.getHours() === 9 && now.getMinutes() < 30);
    const todayDateInTitle = document.getElementById('todayDateInTitle');
    
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekday = getWeekdayChinese(now.getDay());
    // 实时更新时间函数
    function updateRealTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const timeStr = `${hours}:${minutes}:${seconds}`;
      
      if (todayDateInTitle) {
        const currentMonth = now.getMonth() + 1;
        const currentDay = now.getDate();
        const currentWeekday = getWeekdayChinese(now.getDay());
        todayDateInTitle.innerHTML = ` <strong>${currentMonth}月${currentDay}日 ${currentWeekday}</strong> <i>${timeStr}</i>`;
      }
    }
    
    // 首次调用更新时间
    updateRealTime();
    
    // 每秒更新一次时间
    setInterval(updateRealTime, 1000);
    
    let html = '';
    
    if (todayFestival) {
      html = `
        <div class="today-release-text" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <button class="home-popup-btn" data-action="festival" data-festival="${todayFestival}">
            发布${todayFestival}海报
          </button>
          <button class="home-popup-btn" id="dairyBtn"  data-action="dairy">
          🌈日常海报
          </button>
        </div>
      `;
    } else if (isBefore930) {
      html = `
       <div class="today-release-text">（今日没有特别节日，您可以发布：）</div>
        <div class="today-release-text" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          
          <button class="home-popup-btn" id="zaoanBtn" data-action="zaoan">
          ☀️早安海报
          </button>
          <button class="home-popup-btn" id="wananBtn" data-action="wanan">
          🌙晚安海报
          </button>
          <button class="home-popup-btn" id="dairyBtn" data-action="dairy">
          🌈日常海报
          </button>
        </div>
      `;
    } else {
      html = `
       <div class="today-release-text">（今日无特别节日，早安时段已过，您还可以发布：）</div>
        <div class="today-release-text" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
         
          <button class="home-popup-btn" id="wananBtn" data-action="wanan">
          🌙晚安海报
          </button>
          <button class="home-popup-btn" id="dairyBtn"  data-action="dairy">
          🌈日常海报
          </button>
        </div>
      `;
    }
    
    todayReleaseContent.innerHTML = html;
    
    todayReleaseContent.querySelectorAll('.home-popup-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.dataset.action;
        closeHomePopup();
        
        if (action === 'festival') {
          scrollToFestival(this.dataset.festival);
        } else if (action === 'zaoan') {
          scrollToFestival('☀️ 早安');
        } else if (action === 'wanan') {
          scrollToFestival('🌙 晚安');
        } else if (action === 'dairy') {
          // 品牌日常海报，直接跳转到编辑器页面
          window.location.href = 'editor.html?templateId=dairy-2024-001';
        }
      });
    });
  }
  
  // 渲染未来制作建议模块
  function renderFutureSuggestion() {
    const tomorrowFestival = getTomorrowFestival();
    const futureFestivals = getFutureFestivals(3);
    
    let html = '';
    
    html += '<div class="future-suggestion-item">';
    html += '<div class="future-suggestion-text">明天：</div>';
    html += '<div class="future-suggestion-buttons">';
    
    if (!tomorrowFestival) {
      html += `<button class="future-suggestion-btn" data-action="zaoan">☀️早安海报</button>`;
    }
    html += `<button class="future-suggestion-btn" data-action="wanan">🌙晚安海报</button>`;
    
    html += '</div></div>';
    
    futureFestivals.forEach(festival => {
      let daysText = '';
      if (festival.daysUntil === 1) {
        daysText = '明天：';
      } else if (festival.daysUntil === 2) {
        daysText = '后天：';
      } else {
        daysText = `${festival.daysUntil}天后：`;
      }
      
      html += `<div class="future-suggestion-item">`;
      html += `<div class="future-suggestion-text"><strong>${daysText}${festival.name}</strong></div>`;
      html += `<div class="future-suggestion-buttons">`;
      html += `<button class="future-suggestion-btn primary" data-action="festival" data-festival="${festival.name}">👨🏻‍🎨选择模板制作</button>`;
      html += '</div></div>';
    });
    
    futureSuggestionContent.innerHTML = html;
    
    futureSuggestionContent.querySelectorAll('.future-suggestion-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.dataset.action;
        closeHomePopup();
        
        if (action === 'festival') {
          scrollToFestival(this.dataset.festival);
        } else if (action === 'zaoan') {
          scrollToFestival('☀️ 早安');
        } else if (action === 'wanan') {
          scrollToFestival('🌙 晚安');
        }
      });
    });
  }
  
  showHomePopup();
}