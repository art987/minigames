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

// 当前排序模式：'random'（随机，默认）或 'sequential'（顺序）
// 切换节日标签时自动重置为 'random'
window.currentSortMode = 'random';
// 当前筛选后的模板（供排序按钮重新渲染使用，避免重新请求）
window.currentFilteredTemplates = [];

// Fisher-Yates 洗牌算法，返回新数组不修改原数组
function shuffleArray(arr) {
  const result = arr.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 按当前排序模式对模板排序，返回新数组
function sortTemplatesByMode(templates) {
  if (window.currentSortMode === 'random') {
    return shuffleArray(templates);
  }
  return templates.slice();
}

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
  const currentMonth = new Date().getMonth() + 1;
  for (let i = 1; i <= 12; i++) {
    const monthButton = document.createElement('button');
    monthButton.className = `month-btn ${window.currentFilters.month === i ? 'active' : ''}`;
    monthButton.textContent = i === currentMonth ? '本月' : `${i}月`;
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
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // 统一逻辑：优先找当天节日，再找最近的未来节日，最后找第一个节日
          const festivalsInMonth = window.utils.getFestivalNamesByMonth(month);
          const actualFestivals = festivalsInMonth.filter(f => f !== '☀️ 早安' && f !== '🌙 晚安');

          if (actualFestivals.length === 0) return;

          // 获取该月份所有节日的日期信息
          const allFestivalsData = window.utils.getAllFestivals();
          const todayFestival = actualFestivals.find(fName => {
            const fData = allFestivalsData[fName];
            if (!fData) return false;
            const fDate = new Date(today.getFullYear(), fData.month - 1, fData.day);
            fDate.setHours(0, 0, 0, 0);
            return fDate.getTime() === today.getTime();
          });

          let targetFestivalName = null;

          if (todayFestival) {
            // 优先：当天就是节日
            targetFestivalName = todayFestival;
          } else {
            // 找该月份中最近的未来节日
            const futureFestivals = actualFestivals
              .map(fName => {
                const fData = allFestivalsData[fName];
                if (!fData) return null;
                const fDate = new Date(today.getFullYear(), fData.month - 1, fData.day);
                fDate.setHours(0, 0, 0, 0);
                const diff = fDate - today;
                return { name: fName, diff: diff };
              })
              .filter(f => f && f.diff >= 0)
              .sort((a, b) => a.diff - b.diff);

            if (futureFestivals.length > 0) {
              // 有未来节日，选最近的
              targetFestivalName = futureFestivals[0].name;
            } else {
              // 没有未来节日（该月所有节日都已过），定位到第一个节日
              targetFestivalName = actualFestivals[0];
            }
          }

          if (targetFestivalName) {
            const festivalTags = document.querySelectorAll('.festival-tag');
            let targetTag = null;
            festivalTags.forEach(tag => {
              const tagFestival = tag.dataset.festival || tag.textContent;
              if (tagFestival === targetFestivalName) {
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
      // 每次点击节日标签默认随机排序
      window.currentSortMode = 'random';

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

      // 保存原始筛选结果到全局，供排序按钮重新渲染使用
      window.currentFilteredTemplates = filteredTemplates.slice();

      // 按当前排序模式排序后渲染
      const sortedTemplates = sortTemplatesByMode(filteredTemplates);

      // 更新模板计数
      templatesCount.textContent = `${filteredTemplates.length} 个模板`;

      // 渲染模板
      renderTemplates(sortedTemplates);

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

  // 创建模板卡片并添加逐个叠加动画
  templates.forEach((template, index) => {
    const templateCard = createTemplateCard(template);
    // 添加动画类
    templateCard.classList.add('template-card-enter');
    // 设置动画延迟，每个卡片间隔60ms
    templateCard.style.animationDelay = `${index * 60}ms`;
    templatesGrid.appendChild(templateCard);
  });
}

// 创建模板卡片
function createTemplateCard(template) {
  const card = document.createElement('div');
  card.className = 'template-card';
  
  // 检查模板是否可用（当月+2月以内可用）
  const availability = getTemplateAvailability(template);
  
  // 使用模板原图生成缩略图（开放模板用-86thumb，未开放用-20thumb）
  const imagePath = template.image;
  const thumbnailUrl = window.imageConfig ? window.imageConfig.getThumbnailUrl(imagePath, availability.available) : imagePath;
  const thumbnailPath = window.imageConfig ? window.imageConfig.getThumbnailPath(imagePath, availability.available) : imagePath;
  
  if (!availability.available) {
    card.classList.add('template-locked');
    card.innerHTML = `
      <div class="template-thumbnail-container" style="min-height:140px;background-color:#f0f0f0;background-image:url('images/statics/loading.gif');background-size:40px 40px;background-position:center;background-repeat:no-repeat;">
        <img class="template-thumbnail blurred" src="${thumbnailUrl}" alt="${template.name}" loading="lazy" data-original-path="${thumbnailPath}">
        <div class="template-lock-overlay">
          <span class="lock-big-text">待开放</span>
          <span class="lock-small-text">调整期，将提前2月开放</span>
        </div>
      </div>
      <div class="template-info">
        <h3 class="template-name">${template.name}</h3>
        <div class="template-tags">
          <span class="template-type-tag">${template.type || '通用'}</span>
          ${template.festivals ? template.festivals.map(festival => `<span class="template-festival-tag">${festival}</span>`).join('') : ''}
        </div>
      </div>
    `;
    // 锁定模板也加loading占位和错误处理
    const lockedImg = card.querySelector('.template-thumbnail');
    const lockedContainer = card.querySelector('.template-thumbnail-container');
    if (lockedImg && lockedContainer) {
      lockedImg.addEventListener('load', function() {
        lockedContainer.style.minHeight = '';
        lockedContainer.style.backgroundImage = '';
        lockedContainer.style.backgroundColor = '';
      });
      lockedImg.addEventListener('error', function() {
        lockedContainer.style.backgroundImage = `url('images/statics/loading.gif')`;
        lockedImg.style.opacity = '0';
        // 1.5秒后重试一次
        setTimeout(() => { lockedImg.src = lockedImg.src; }, 1500);
      });
    }
    return card;
  }
  
  card.innerHTML = `
    <div class="template-thumbnail-container">
      <img class="template-thumbnail" src="${thumbnailUrl}" alt="${template.name}" loading="lazy" data-original-path="${thumbnailPath}">
    </div>
    <div class="template-info">
      <h3 class="template-name">${template.name}</h3>
      <div class="template-tags">
        <span class="template-type-tag">${template.type || '通用'}</span>
        ${template.festivals ? template.festivals.map(festival => `<span class="template-festival-tag">${festival}</span>`).join('') : ''}
      </div>
    </div>
  `;
  
  // 添加图片加载失败回退处理、重试机制和占位符
  const img = card.querySelector('.template-thumbnail');
  const thumbContainer = card.querySelector('.template-thumbnail-container');
  if (img) {
    let timeoutId = null;
    let loaded = false;
    let retryCount = 0;
    const maxRetries = 1; // 最多重试1次同URL
    const loadingGif = 'images/statics/loading.gif';

    // 设置容器最小高度占位，防止图片未加载时div塌陷
    if (thumbContainer) {
      thumbContainer.style.minHeight = '140px';
      thumbContainer.style.backgroundColor = '#f0f0f0';
      // 先显示loading.gif作为占位背景
      thumbContainer.style.backgroundImage = `url('${loadingGif}')`;
      thumbContainer.style.backgroundSize = '40px 40px';
      thumbContainer.style.backgroundPosition = 'center';
      thumbContainer.style.backgroundRepeat = 'no-repeat';
    }

    const showLoadingPlaceholder = () => {
      if (thumbContainer) {
        thumbContainer.style.minHeight = '140px';
        thumbContainer.style.backgroundImage = `url('${loadingGif}')`;
        thumbContainer.style.backgroundSize = '40px 40px';
        thumbContainer.style.backgroundPosition = 'center';
        thumbContainer.style.backgroundRepeat = 'no-repeat';
      }
      img.style.opacity = '0';
    };

    const hideLoadingPlaceholder = () => {
      if (thumbContainer) {
        thumbContainer.style.minHeight = '';
        thumbContainer.style.backgroundImage = '';
        thumbContainer.style.backgroundColor = '';
      }
      img.style.opacity = '1';
    };

    const loadFallback = () => {
      if (loaded) return;
      if (window.imageConfig && !window.imageConfig.shouldFallback()) {
        return;
      }
      const originalPath = img.getAttribute('data-original-path');
      if (originalPath && window.imageConfig) {
        const fallback = window.imageConfig.getFallbackUrl(originalPath);
        if (fallback && img.src !== fallback) {
          showLoadingPlaceholder();
          img.src = fallback;
        }
      }
    };

    img.addEventListener('load', function() {
      loaded = true;
      if (timeoutId) clearTimeout(timeoutId);
      hideLoadingPlaceholder();
    });

    img.addEventListener('error', function() {
      if (loaded) return;
      // 先尝试同URL重试一次（可能是网络抖动）
      if (retryCount < maxRetries) {
        retryCount++;
        showLoadingPlaceholder();
        console.warn(`[thumbnail] 加载失败，第${retryCount}次重试: ${img.src}`);
        setTimeout(() => {
          if (!loaded) {
            img.src = img.src; // 触发重新加载
          }
        }, 1500);
        return;
      }
      // 重试也失败，走CDN回退
      showLoadingPlaceholder();
      loadFallback();
    });

    timeoutId = setTimeout(() => {
      loadFallback();
    }, 15000);
  }
  
  // 添加点击事件
  card.addEventListener('click', function() {
    // 锁定的模板不可使用
    if (card.classList.contains('template-locked')) {
      showToast('该模板尚未开放，敬请期待');
      return;
    }
    // 跳转到编辑器页面，并传递模板ID
    // 使用相对路径，兼容子目录部署
    window.location.href = `./editor.html?templateId=${template.id}`;
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

// VIP登录功能 - 使用 vip-login-ui.js
function initVipLogin() {
  const vipLoginBtn = document.getElementById('vipLoginBtn');
  
  // 使用 vip-login-ui.js 更新 VIP 状态
  if (typeof VipLoginUI !== 'undefined' && VipLoginUI.updateVipStatus) {
    VipLoginUI.updateVipStatus();
  }
  
  // 登录按钮点击事件 - 使用 vip-login-ui.js
  if (vipLoginBtn && typeof VipLoginUI !== 'undefined' && VipLoginUI.showLoginModal) {
    vipLoginBtn.addEventListener('click', VipLoginUI.showLoginModal);
  }
}

// 在页面加载完成后初始化VIP登录功能
document.addEventListener('DOMContentLoaded', function() {
  // 延迟初始化VIP登录，确保VIP数据已加载
  setTimeout(initVipLogin, 100);
  // 延迟初始化首页弹窗
  setTimeout(initHomePopup, 200);
  // 创建底部浮动按钮
  createDailyRecordButton();
});

// 创建底部浮动按钮 - 制作日常记录海报
function createDailyRecordButton() {
  // 检查按钮是否已存在
  if (document.getElementById('dailyRecordFloatBtn')) return;

  // 创建浮动按钮容器：顺序 | 随机 | 日常记录 | VIP升级
  const bar = document.createElement('div');
  bar.className = 'home-float-bar';

  // 1. 顺序排序按钮
  const sortSeqBtn = document.createElement('button');
  sortSeqBtn.className = 'home-float-icon-btn';
  sortSeqBtn.id = 'sortSequentialBtn';
  sortSeqBtn.title = '顺序排序';
  sortSeqBtn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 6h14v2H3zm0 4h10v2H3zm0 4h6v2H3zm13 0v6.17l-2.59-2.58L12 18l4 4 4-4-1.41-1.41L16 18.83V13z"/></svg>`;
  sortSeqBtn.addEventListener('click', function() {
    if (!window.currentFilteredTemplates || window.currentFilteredTemplates.length === 0) return;
    window.currentSortMode = 'sequential';
    const sorted = sortTemplatesByMode(window.currentFilteredTemplates);
    renderTemplates(sorted);
    highlightFloatBtn(sortSeqBtn);
  });

  // 2. 随机排序按钮
  const sortRandBtn = document.createElement('button');
  sortRandBtn.className = 'home-float-icon-btn';
  sortRandBtn.id = 'sortRandomBtn';
  sortRandBtn.title = '随机排序';
  sortRandBtn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`;
  sortRandBtn.addEventListener('click', function() {
    if (!window.currentFilteredTemplates || window.currentFilteredTemplates.length === 0) return;
    window.currentSortMode = 'random';
    const shuffled = sortTemplatesByMode(window.currentFilteredTemplates);
    renderTemplates(shuffled);
    highlightFloatBtn(sortRandBtn);
  });

  // 3. 制作日常记录海报按钮（保留原 id 和样式）
  const dailyBtn = document.createElement('div');
  dailyBtn.id = 'dailyRecordFloatBtn';
  dailyBtn.className = 'daily-record-float-btn';
  dailyBtn.innerHTML = `
    <span class="daily-record-icon">+</span>
    <span class="daily-record-text">制作日常记录海报</span>
  `;
  dailyBtn.addEventListener('click', function() {
    window.location.href = './editor.html?templateId=dairy-2024-001';
  });

  // 4. VIP 升级按钮
  const vipBtn = document.createElement('button');
  vipBtn.className = 'home-float-icon-btn home-float-vip-btn';
  vipBtn.id = 'vipUpgradeFloatBtn';
  vipBtn.title = 'VIP升级';
  vipBtn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z"/></svg>`;
  vipBtn.addEventListener('click', function() {
    if (typeof window.showVipUpgradeModal === 'function') {
      window.showVipUpgradeModal();
    }
  });

  bar.appendChild(sortSeqBtn);
  bar.appendChild(sortRandBtn);
  bar.appendChild(dailyBtn);
  bar.appendChild(vipBtn);

  document.body.appendChild(bar);
}

// 浮动按钮点击高亮反馈（短暂添加 active 类）
function highlightFloatBtn(btn) {
  btn.classList.add('active');
  setTimeout(() => btn.classList.remove('active'), 300);
}

// 首页弹窗功能
  function initHomePopup() {
    const homePopup = document.getElementById('homePopup');
    const closeHomePopupBtn = document.getElementById('closeHomePopup');
    const todayReleaseContent = document.getElementById('todayReleaseContent');
    const futureSuggestionContent = document.getElementById('futureSuggestionContent');
    const dailySuggestionBtn = document.getElementById('dailySuggestionBtn');
    const homePopupModal = homePopup.querySelector('.home-popup-modal');
    
    if (!homePopup) return;
    
    // 节日名称到文件夹名称的映射
    const festivalFolderMap = {
      '谷雨': 'guyu', '立春': 'lichun', '雨水': 'yushui', '惊蛰': 'jingzhe',
      '春分': 'chunfen', '清明': 'qingming', '立夏': 'lixia', '小满': 'xiaoman',
      '芒种': 'mangzhong', '夏至': 'xiazhi', '小暑': 'xiaoshu', '大暑': 'dashu',
      '立秋': 'liqiu', '处暑': 'chushu', '白露': 'bailu', '秋分': 'qiufen',
      '寒露': 'hanlu', '霜降': 'shuangjiang', '立冬': 'lidong', '小雪': 'xiaoxue',
      '大雪': 'daxue', '冬至': 'dongzhi', '小寒': 'xiaohan', '大寒': 'dahan',
      '春节': 'chunjie', '清明节': 'qingming', '端午节': 'duanwu', '七夕节': 'qixi',
      '中元节': 'zhongyuan', '中秋节': 'zhongqiu', '重阳节': 'chongyang', '除夕': 'chuxi',
      '元旦': 'yuandan', '情人节': 'qingrenjie', '妇女节': 'funvjie', '劳动节': 'laodongjie',
      '青年节': 'qingnianjie', '母亲节': 'muqinjie', '520': '520', '儿童节': 'ertongjie',
      '父亲节': 'fuqinjie', '建军节': 'jianjunjie', '教师节': 'jiaoshi', '国庆节': 'guoqing',
      '感恩节': 'ganenjie', '世界地球日': 'shijiediqiuri', '世界读书日': 'shijiedushuri',
      'zaoan': 'zaoan', 'wanan': 'wanan'
    };

    // 从 templates 对象中动态获取指定节日的随机背景图片
    function getRandomBackgroundImage(type) {
      // 特殊处理 dairy（日常海报没有在 templates 中定义）
      if (type === 'dairy') {
        // images/dairy 目录下共有 22 张图片
        const totalDairyImages = 22;
        const randomNum = Math.floor(Math.random() * totalDairyImages) + 1;
        return `images/dairy/${randomNum}.jpg`;
      }
      
      if (typeof window.templates === 'undefined') {
        console.log('templates 对象未定义');
        return null;
      }
      
      // action 到 festival 的映射
      const actionToFestival = {
        'zaoan': '早安',
        'wanan': '晚安'
      };
      
      // 如果是 action，转换为 festival 名称
      const festivalType = actionToFestival[type] || type;
      
      let matchedTemplates = [];
      
      for (const month in window.templates) {
        if (Array.isArray(window.templates[month])) {
          window.templates[month].forEach(template => {
            if (template.festivals && template.festivals.includes(festivalType)) {
              matchedTemplates.push(template);
            }
          });
        }
      }
      
      if (matchedTemplates.length === 0) {
        console.log('未找到匹配的模板:', type, '->', festivalType);
        return null;
      }
      
      const randomTemplate = matchedTemplates[Math.floor(Math.random() * matchedTemplates.length)];
      console.log('找到模板:', type, '->', festivalType, randomTemplate.image);
      return randomTemplate.image;
    }

    // 设置按钮背景图片（使用缩略图，避免下载原图）
    function setButtonBackground(button, type) {
      const localPath = getRandomBackgroundImage(type);
      if (localPath) {
        // 日常海报（dairy）固定使用本地图片，不走 cloudflare
        // 其他类型使用缩略图（-86thumb后缀）
        const imageUrl = (type === 'dairy') ? localPath : (window.imageConfig ? window.imageConfig.getThumbnailUrl(localPath, true) : localPath);
        const wrapper = button.closest('.button-wrapper');
        if (wrapper) {
          wrapper.style.setProperty('--button-bg-image', `url('${imageUrl}')`);
          wrapper.setAttribute('data-original-path', localPath);
          // 保存模板类型供自动切换使用
          wrapper.setAttribute('data-bg-type', type);
        }
      }
    }

    // === 弹窗卡片背景图自动切换系统 ===
    // 每张卡片独立循环，2.5~5秒随机间隔，交叉淡入淡出过渡
    let bgSwitchTimers = []; // 存储所有卡片的定时器

    // 启动所有卡片背景图自动切换
    function startBgAutoSwitch() {
      stopBgAutoSwitch(); // 先清理
      const allWrappers = homePopup.querySelectorAll('.button-wrapper[data-bg-type]');
      allWrappers.forEach(wrapper => {
        const type = wrapper.getAttribute('data-bg-type');
        scheduleNextBgSwitch(wrapper, type);
      });
    }

    // 停止所有卡片背景图切换
    function stopBgAutoSwitch() {
      bgSwitchTimers.forEach(timer => clearTimeout(timer));
      bgSwitchTimers = [];
    }

    // 为单个卡片安排下次切换（随机 5.5~10.5 秒间隔）
    function scheduleNextBgSwitch(wrapper, type) {
      const delay = 5500 + Math.random() * 5000; // 5500ms ~ 105000ms
      const timer = setTimeout(() => {
        switchWrapperBg(wrapper, type);
        // 切换完成后安排下一次
        scheduleNextBgSwitch(wrapper, type);
      }, delay);
      bgSwitchTimers.push(timer);
    }

    // 执行单张卡片背景图切换（交叉淡入淡出）
    function switchWrapperBg(wrapper, type) {
      const localPath = getRandomBackgroundImage(type);
      if (!localPath) return;

      const imageUrl = (type === 'dairy') ? localPath : (window.imageConfig ? window.imageConfig.getThumbnailUrl(localPath, true) : localPath);

      // 预加载新图片，避免切换时闪烁
      const img = new Image();
      img.onload = function() {
        // 将新图设到 ::after 层（--button-bg-image-next）
        wrapper.style.setProperty('--button-bg-image-next', `url('${imageUrl}')`);
        // 淡入 ::after 层 + 淡出 ::before 层
        wrapper.classList.add('bg-fade-switch');
        // 过渡完成后（0.6s），将 ::before 更新为新图，::after 重置
        setTimeout(() => {
          wrapper.style.setProperty('--button-bg-image', `url('${imageUrl}')`);
          wrapper.setAttribute('data-original-path', localPath);
          wrapper.classList.remove('bg-fade-switch');
        }, 650);
      };
      img.src = imageUrl;
    }
    
    // 标题轮替功能
    // 时间安排：
    // 1. 第一次："智能提醒小助手" 停留 3秒
    // 2. 第二次："增加品牌曝光，提升用户信任!" 停留 8秒
    // 3. 第三次："智能提醒小助手" 停留 8秒
    // 4. 之后：步骤2和3循环轮放
    let titleRotationTimer = null;
    let titleRotationCount = 0;

    function startTitleRotation() {
      const titleTexts = homePopup.querySelectorAll('.rotating-title .title-text');
      if (titleTexts.length < 2) return;

      // 重置状态
      titleRotationCount = 0;
      titleTexts.forEach((text, index) => {
        text.classList.toggle('active', index === 0);
      });

      // 第一次：显示第一个标题，停留 3秒后切换
      scheduleTitleSwitch(3000);
    }

    function scheduleTitleSwitch(delay) {
      if (titleRotationTimer) {
        clearTimeout(titleRotationTimer);
        titleRotationTimer = null;
      }

      titleRotationTimer = setTimeout(() => {
        switchTitle();
      }, delay);
    }

    function switchTitle() {
      const titleTexts = homePopup.querySelectorAll('.rotating-title .title-text');
      if (titleTexts.length < 2) return;

      // 切换标题
      const currentActive = homePopup.querySelector('.rotating-title .title-text.active');
      const nextIndex = currentActive === titleTexts[0] ? 1 : 0;

      currentActive.classList.remove('active');
      titleTexts[nextIndex].classList.add('active');

      titleRotationCount++;

      // 计算下一次切换的延迟时间
      let nextDelay;
      if (titleRotationCount === 1) {
        // 第一次切换后，第二个标题停留 8秒
        nextDelay = 8000;
      } else {
        // 之后所有切换都是 8秒
        nextDelay = 8000;
      }

      scheduleTitleSwitch(nextDelay);
    }

    function stopTitleRotation() {
      if (titleRotationTimer) {
        clearTimeout(titleRotationTimer);
        titleRotationTimer = null;
      }
      titleRotationCount = 0;
    }
    
    // 初始化标题波浪动画：将文字拆分成单字符并添加韵律延迟
    function initTitleWaveAnimation() {
      const titles = document.querySelectorAll('.home-popup-section-title');
      titles.forEach(title => {
        // 如果已经处理过，跳过
        if (title.dataset.waveInitialized) return;
        
        // 保留span元素（如日期显示），只处理纯文字部分
        const childNodes = Array.from(title.childNodes);
        let html = '';
        
        childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            // 文字节点：拆分成单个字符
            const text = node.textContent;
            text.split('').forEach((char, index) => {
              if (char.trim()) {
                html += `<span class="title-wave-char" style="animation-delay: ${index * 0.05}s">${char}</span>`;
              } else {
                html += char; // 保留空格
              }
            });
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // 元素节点（如span）：保留原样
            html += node.outerHTML;
          }
        });
        
        title.innerHTML = html;
        title.dataset.waveInitialized = 'true';
      });
    }
    
    // 显示弹窗
    function showHomePopup() {
      renderTodayRelease();
      renderFutureSuggestion();

      // 处理标题波浪动画
      initTitleWaveAnimation();

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
      startTitleRotation();
      startBgAutoSwitch();

      // 重置弹窗滚动位置到顶部，确保用户从开头看到内容
      const scrollableBody = homePopupModal.querySelector('.scrollable-body');
      if (scrollableBody) {
        scrollableBody.scrollTop = 0;
      }

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
    stopTitleRotation();
    stopBgAutoSwitch();
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
          <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">1、马上制作今日${todayFestival}海报：</span>
            <div class="button-wrapper">
              <div class="dark-overlay"></div>
              <button class="home-popup-btn" data-action="festival" data-festival="${todayFestival}">
              <span>挑选${todayFestival}模板</span>
            </button></div>
          </div>
          <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">2、马上制作今日日常记录海报，并分享到朋友圈：</span>
            <div class="button-wrapper">
              <div class="dark-overlay"></div>
              <button class="home-popup-btn" id="dairyBtn"  data-action="dairy">
            <span>📷️日常记录海报</span>
            </button></div>
          </div>
        </div>
      `;
    } else if (isBefore930) {
      html = `
       <div class="today-release-text">（今日没有特别节日，您可以发布：）</div>
        <div class="today-release-text" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          
          <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">1、马上制作今日早安海报，并分享到朋友圈：</span>
            <div class="button-wrapper">
              <div class="dark-overlay"></div>
              <button class="home-popup-btn" id="zaoanBtn" data-action="zaoan">
          <span>☀️挑选早安模板</span>
          </button></div>
          </div>
          <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">2、马上制作今日晚安海报，睡前分享到朋友圈：</span>
            <div class="button-wrapper">
              <div class="dark-overlay"></div>
              <button class="home-popup-btn" id="wananBtn" data-action="wanan">
          <span>🌙挑选晚安海报模板</span>
          </button></div>
          </div>
          <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">3、马上制作今日日常记录海报，并分享到朋友圈：</span>
            <div class="button-wrapper">
              <div class="dark-overlay"></div>
              <button class="home-popup-btn" id="dairyBtn" data-action="dairy">
          <span>📷️日常记录海报</span>
          </button></div>
          </div>
        </div>
      `;
    } else {
      html = `
       <div class="today-release-text">（早安时段已过，您还可以：）</div>
        <div class="today-release-text" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
         
          <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">1、马上制作今日晚安海报，睡前分享到朋友圈：</span>
            <div class="button-wrapper">
              <div class="dark-overlay"></div>
              <button class="home-popup-btn" id="wananBtn" data-action="wanan">
          <span>🌙挑选晚安海报模板</span>
          </button></div>
          </div>
          <div style="flex: 1; min-width: 200px;">
            <span class="task-prefix">2、马上制作今日日常记录海报，并分享到朋友圈：</span>
            <div class="button-wrapper">
              <div class="dark-overlay"></div>
              <button class="home-popup-btn" id="dairyBtn"  data-action="dairy">
          <span>📷️日常记录海报</span>
          </button></div>
          </div>
        </div>
      `;
    }
    
    todayReleaseContent.innerHTML = html;

    // 先强制布局一次，确保宽度稳定
    todayReleaseContent.offsetHeight;

    // 为按钮容器添加逐个叠加动画（延迟2秒载入，间隔200ms）
    const buttonWrappers = todayReleaseContent.querySelectorAll('.button-wrapper');
    buttonWrappers.forEach((wrapper, index) => {
      wrapper.classList.add('future-suggestion-item-enter');
      wrapper.style.animationDelay = `${380 + index * 200}ms`;
    });



    // 设置按钮背景图片
    todayReleaseContent.querySelectorAll('.home-popup-btn').forEach(btn => {
      const action = btn.dataset.action;
      if (action === 'festival') {
        setButtonBackground(btn, btn.dataset.festival);
      } else {
        setButtonBackground(btn, action);
      }
    });

    // 立即初始化按钮加载动画
    if (window.initButtonWrappers) {
      window.initButtonWrappers();
    }

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
          // 品牌日常海报，跳转到编辑器页面
          // 使用相对路径，兼容子目录部署
          const targetUrl = './editor.html?templateId=dairy-2024-001';
          console.log('[dairy-btn] 点击按钮，准备跳转到:', targetUrl);
          window.location.href = targetUrl;
        }
      });
    });
    
    // 初始化按钮加载动画
    if (window.initButtonWrappers) {
      window.initButtonWrappers();
    }
  }
  
  // 渲染未来制作建议模块
  let loadedFestivalCount = 3; // 已加载的节日数量
  let isLoadingMore = false; // 防止重复加载
  
  function renderFutureSuggestion() {
    const tomorrowFestival = getTomorrowFestival();
    const futureFestivals = getFutureFestivals(loadedFestivalCount);
    
    let html = '';
    
    html += '<div class="future-suggestion-item">';
    html += '<div class="future-suggestion-text">明天：<span class="festival-date">提前制作明日早安和晚安海报</span></div>';
    html += '<div class="future-suggestion-buttons">';
    
    if (!tomorrowFestival) {
      html += `<div class="button-wrapper" style="flex: 1; min-width: 200px;"><div class="dark-overlay"></div><button class="future-suggestion-btn" data-action="zaoan"><span>☀️挑选早安模板</span></button></div>`;
    }
    html += `<div class="button-wrapper" style="flex: 1; min-width: 200px;"><div class="dark-overlay"></div><button class="future-suggestion-btn" data-action="wanan"><span>🌙挑选晚安海报模板</span></button></div>`;
    
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
      
      // 格式化日期
      const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
      const year = festival.date.getFullYear();
      const month = festival.date.getMonth() + 1;
      const day = festival.date.getDate();
      const weekDay = weekDays[festival.date.getDay()];
      const dateStr = `（${year}年${month}月${day}日 星期${weekDay}）`;
      
      html += `<div class="future-suggestion-item">`;
      html += `<div class="future-suggestion-text"><strong>${daysText}${festival.name}</strong> <span class="festival-date">${dateStr}</span></div>`;
      html += `<div class="future-suggestion-buttons">`;
      html += `<div class="button-wrapper" style="flex: 1; min-width: 200px;"><div class="dark-overlay"></div><button class="future-suggestion-btn primary" data-action="festival" data-festival="${festival.name}"><span>挑选${festival.name}模板</span></button></div>`;
      html += '</div></div>';
    });
    
    futureSuggestionContent.innerHTML = html;

    // 为每个智能提醒卡片添加逐个叠加动画
    // 等待"今日优先宣传任务"区域动画完成后（约1秒），再开始显示"近日品牌宣传任务"
    const suggestionItems = futureSuggestionContent.querySelectorAll('.future-suggestion-item');
    suggestionItems.forEach((item, index) => {
      item.classList.add('future-suggestion-item-enter');
      item.style.animationDelay = `${1000 + index * 150}ms`;
    });

    // 设置按钮背景图片
    futureSuggestionContent.querySelectorAll('.future-suggestion-btn').forEach(btn => {
      const action = btn.dataset.action;
      if (action === 'festival') {
        setButtonBackground(btn, btn.dataset.festival);
      } else {
        setButtonBackground(btn, action);
      }
    });

    // 立即初始化按钮加载动画
    if (window.initButtonWrappers) {
      window.initButtonWrappers();
    }
    
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
    
    // 初始化按钮加载动画
    if (window.initButtonWrappers) {
      window.initButtonWrappers();
    }
    
    // 显示"加载更多"按钮
    showLoadMoreButton();
  }
  
  // 追加更多节日
  function appendMoreFestivals() {
    if (isLoadingMore) return;
    
    isLoadingMore = true;
    
    // 显示加载动画（并移到最后）
    showLoadingIndicator();
    
    // 1秒后加载新内容
    setTimeout(() => {
      const previousCount = loadedFestivalCount;
      loadedFestivalCount += 3;
      
      const futureFestivals = getFutureFestivals(loadedFestivalCount);
      
      if (!futureFestivals || futureFestivals.length <= previousCount) {
        loadedFestivalCount = previousCount;
        hideLoadingIndicator();
        showLoadMoreButton();
        isLoadingMore = false;
        return;
      }
      
      // 只获取新增的节日
      const newFestivals = futureFestivals.slice(previousCount);
      
      // 先隐藏加载动画
      hideLoadingIndicator();
      
      // 逐个添加节日卡片（带动画）
        let index = 0;
        const addItemWithAnimation = () => {
          if (index >= newFestivals.length) {
            // 所有卡片添加完成后，显示"加载更多"按钮
            showLoadMoreButton();
            isLoadingMore = false;
            return;
          }
          
          const festival = newFestivals[index];
          let daysText = `${festival.daysUntil}天后：`;
          
          // 格式化日期
          const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
          const year = festival.date.getFullYear();
          const month = festival.date.getMonth() + 1;
          const day = festival.date.getDate();
          const weekDay = weekDays[festival.date.getDay()];
          const dateStr = `（${year}年${month}月${day}日 星期${weekDay}）`;
          
          const itemHtml = `<div class="future-suggestion-item festival-item-animate">` +
            `<div class="future-suggestion-text"><strong>${daysText}${festival.name}</strong> <span class="festival-date">${dateStr}</span></div>` +
            `<div class="future-suggestion-buttons">` +
            `<div class="button-wrapper" style="flex: 1; min-width: 200px;"><div class="dark-overlay"></div><button class="future-suggestion-btn primary" data-action="festival" data-festival="${festival.name}"><span>选择模板</span></button></div>` +
            '</div></div>';
          
          // 在加载更多按钮前插入
          const loadMoreBtn = document.getElementById('loadMoreFestivalsBtn');
          if (loadMoreBtn) {
            loadMoreBtn.insertAdjacentHTML('beforebegin', itemHtml);
          } else {
            futureSuggestionContent.insertAdjacentHTML('beforeend', itemHtml);
          }
          
          // 为新增按钮设置背景图片和事件
          const newItems = futureSuggestionContent.querySelectorAll('.festival-item-animate:not([data-initialized])');
          const newItem = newItems[newItems.length - 1];
          if (newItem) {
            newItem.dataset.initialized = 'true';
            const btn = newItem.querySelector('.future-suggestion-btn');
            if (btn) {
              const action = btn.dataset.action;
              if (action === 'festival') {
                setButtonBackground(btn, btn.dataset.festival);
              } else {
                setButtonBackground(btn, action);
              }
              
              btn.addEventListener('click', function() {
                closeHomePopup();
                
                if (action === 'festival') {
                  scrollToFestival(this.dataset.festival);
                } else if (action === 'zaoan') {
                  scrollToFestival('☀️ 早安');
                } else if (action === 'wanan') {
                  scrollToFestival('🌙 晚安');
                }
              });
              
              // 初始化新增按钮的加载动画
              if (window.initButtonWrappers) {
                window.initButtonWrappers();
              }
            }
          }
          
          // 滚动到底部
          scrollToBottom();
          
          index++;
          // 等待动画完成后添加下一个
          setTimeout(addItemWithAnimation, 500);
        };
      
      addItemWithAnimation();
    }, 1000);
  }
  
  // 滚动到底部
  function scrollToBottom() {
    const scrollContainer = homePopup.querySelector('.modal-body.scrollable-body');
    if (scrollContainer) {
      setTimeout(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
  
  // 显示"加载更多"按钮
  function showLoadMoreButton() {
    let loadMoreBtn = document.getElementById('loadMoreFestivalsBtn');
    if (!loadMoreBtn) {
      loadMoreBtn = document.createElement('div');
      loadMoreBtn.id = 'loadMoreFestivalsBtn';
      loadMoreBtn.className = 'load-more-festivals-btn';
      loadMoreBtn.innerHTML = '<span>加载更多</span>';
      loadMoreBtn.addEventListener('click', appendMoreFestivals);
      futureSuggestionContent.appendChild(loadMoreBtn);
    }
    loadMoreBtn.style.display = 'flex';
  }
  
  // 隐藏"加载更多"按钮
  function hideLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreFestivalsBtn');
    if (loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  // 显示加载动画（始终放在最后）
  function showLoadingIndicator() {
    hideLoadMoreButton();
    let loadingDiv = document.getElementById('festivalLoadingIndicator');
    if (!loadingDiv) {
      loadingDiv = document.createElement('div');
      loadingDiv.id = 'festivalLoadingIndicator';
      loadingDiv.className = 'festival-loading-indicator';
      loadingDiv.innerHTML = '<div class="loading-spinner"></div><span>加载中...</span>';
    }
    // 移到最后
    futureSuggestionContent.appendChild(loadingDiv);
    loadingDiv.style.display = 'flex';
  }
  
  // 隐藏加载动画
  function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('festivalLoadingIndicator');
    if (loadingDiv) {
      loadingDiv.style.display = 'none';
    }
  }
  
  showHomePopup();
}