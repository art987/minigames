// 工具函数集合

// 获取当前日期
function getCurrentDate() {
  return new Date();
}

// 获取当前月份（1-12）
function getCurrentMonth() {
  return getCurrentDate().getMonth() + 1;
}

// 获取当前日期的月份和日期
function getCurrentMonthAndDay() {
  const date = getCurrentDate();
  return { month: date.getMonth() + 1, day: date.getDate() };
}

// 检查日期是否在指定月份内
function isDateInMonth(date, month) {
  return date.getMonth() + 1 === month;
}

// 获取所有节日数据
function getAllFestivals() {
  const allFestivals = {};
  
  // 合并所有节日类型
  if (window.chineseTraditionalFestivals) {
    Object.assign(allFestivals, window.chineseTraditionalFestivals);
  }
  if (window.solarTerms) {
    Object.assign(allFestivals, window.solarTerms);
  }
  if (window.westernFestivals) {
    Object.assign(allFestivals, window.westernFestivals);
  }
  
  return allFestivals;
}

// 获取指定月份的所有节日
function getFestivalsByMonth(month) {
  const allFestivals = getAllFestivals();
  const festivalsInMonth = {};
  
  Object.keys(allFestivals).forEach(festivalName => {
    const festival = allFestivals[festivalName];
    if (festival.month === month) {
      festivalsInMonth[festivalName] = festival;
    }
  });
  
  return festivalsInMonth;
}

// 获取指定月份内的所有节日名称数组（按日期排序）
function getFestivalNamesByMonth(month) {
  const festivalsInMonth = getFestivalsByMonth(month);
  // 获取节日数组并按日期排序
  const festivalsArray = Object.keys(festivalsInMonth).map(festivalName => ({
    name: festivalName,
    month: festivalsInMonth[festivalName].month,
    day: festivalsInMonth[festivalName].day
  }));
  
  // 按日期排序
  festivalsArray.sort((a, b) => {
    if (a.month !== b.month) {
      return a.month - b.month;
    }
    return a.day - b.day;
  });
  
  // 确保返回字符串数组，以兼容updateFestivalTags函数
  return festivalsArray.map(festival => festival.name);
}

// 计算两个日期之间的天数差
function getDaysBetweenDates(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// 获取指定月份内的下一个节日
function getNextFestivalInMonth(month) {
  const currentDate = getCurrentDate();
  const festivalsInMonth = getFestivalsByMonth(month);
  let nextFestival = null;
  let minDaysUntil = Infinity;
  
  Object.keys(festivalsInMonth).forEach(festivalName => {
    const festival = festivalsInMonth[festivalName];
    // 简化处理，实际应用中需要更复杂的农历日期计算
    const festivalDate = new Date();
    festivalDate.setMonth(festival.month - 1);
    festivalDate.setDate(festival.day);
    
    // 如果是本年的节日已经过去，则计算下一年的
    if (festivalDate < currentDate && festival.month <= currentDate.getMonth()) {
      festivalDate.setFullYear(festivalDate.getFullYear() + 1);
    }
    
    const daysUntil = getDaysBetweenDates(currentDate, festivalDate);
    if (daysUntil >= 0 && daysUntil < minDaysUntil) {
      minDaysUntil = daysUntil;
      nextFestival = festivalName;
    }
  });
  
  return nextFestival;
}

// 根据当前日期自动选择月份和节日
function autoSelectByDate() {
  const currentMonth = getCurrentMonth();
  const nextFestival = getNextFestivalInMonth(currentMonth);
  
  return {
    month: currentMonth,
    festival: nextFestival || null
  };
}

// 获取节日日期
function getFestivalDate(festivalName) {
  const allFestivals = getAllFestivals();
  if (allFestivals[festivalName]) {
    return allFestivals[festivalName];
  }
  return null;
}

// 获取指定节日所在的所有月份
function getMonthsByFestival(festivalName) {
  const festival = getFestivalDate(festivalName);
  if (festival) {
    return [festival.month];
  }
  return [];
}

// 创建月份按钮HTML
function createMonthButtonHTML(month, isActive = false) {
  return `<button class="month-btn ${isActive ? 'active' : ''}" data-month="${month}">${month}月</button>`;
}

// 创建节日标签HTML
function createFestivalTagHTML(festival, isActive = false) {
  return `<span class="festival-tag ${isActive ? 'active' : ''}" data-festival="${festival}">${festival}</span>`;
}

// 格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 验证图片文件
function validateImageFile(file) {
  // 检查文件类型
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, message: '只支持JPG、PNG、GIF、WebP格式的图片' };
  }
  
  // 检查文件大小（最大10MB）
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, message: `文件大小不能超过10MB，当前文件大小为${formatFileSize(file.size)}` };
  }
  
  return { valid: true };
}

// 读取图片文件并返回DataURL
function readImageFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      resolve(event.target.result);
    };
    
    reader.onerror = function() {
      reject(new Error('读取图片失败'));
    };
    
    reader.readAsDataURL(file);
  });
}

// 上传图片文件
async function uploadImage(file) {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.message);
  }
  
  try {
    const dataUrl = await readImageFileAsDataURL(file);
    return dataUrl;
  } catch (error) {
    throw new Error('上传图片失败: ' + error.message);
  }
}

// 下载图片
function downloadImage(imageUrl, filename = 'poster.png') {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  
  // 模拟点击下载
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 渲染HTML到Canvas（备选方案）
function renderHTMLToCanvas(element, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // 设置Canvas尺寸
      const width = options.width || element.offsetWidth;
      const height = options.height || element.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      
      // 这里仅作为备选方案，实际应用中可能需要更复杂的渲染逻辑
      // 优先推荐使用html2canvas库
      
      // 绘制背景
      if (options.backgroundColor) {
        ctx.fillStyle = options.backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }
      
      // 绘制文本
      if (options.text) {
        ctx.font = options.font || '16px Arial';
        ctx.fillStyle = options.textColor || '#000000';
        ctx.textAlign = options.textAlign || 'left';
        ctx.fillText(options.text, options.textX || 10, options.textY || 30);
      }
      
      resolve(canvas.toDataURL('image/png'));
    } catch (error) {
      reject(new Error('渲染Canvas失败: ' + error.message));
    }
  });
}

// 生成唯一ID
function generateUniqueId(prefix = 'id') {
  return prefix + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// 从本地存储获取数据
function getFromLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('从本地存储读取数据失败:', error);
    return null;
  }
}

// 保存数据到本地存储
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('保存数据到本地存储失败:', error);
    return false;
  }
}

// 删除本地存储中的数据
function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('删除本地存储数据失败:', error);
    return false;
  }
}

// 获取所有模板数据（按节日日期排序）
function getAllTemplates() {
  const allTemplates = [];
  if (window.templates) {
    Object.keys(window.templates).forEach(month => {
      window.templates[month].forEach(template => {
        allTemplates.push(template);
      });
    });
  }
  
  // 按节日日期排序
  return allTemplates.sort((a, b) => {
    // 获取模板对应的主要节日
    const aFestival = a.festivals && a.festivals.length > 0 ? a.festivals[0] : null;
    const bFestival = b.festivals && b.festivals.length > 0 ? b.festivals[0] : null;
    
    // 获取节日数据
    const allFestivals = getAllFestivals();
    const aFestivalData = aFestival ? allFestivals[aFestival] : null;
    const bFestivalData = bFestival ? allFestivals[bFestival] : null;
    
    // 如果都有节日数据，按日期排序
    if (aFestivalData && bFestivalData) {
      // 先按月份排序
      if (aFestivalData.month !== bFestivalData.month) {
        return aFestivalData.month - bFestivalData.month;
      }
      // 同月份按日期排序
      return aFestivalData.day - bFestivalData.day;
    }
    
    // 如果只有一个有节日数据，有节日数据的排在前面
    if (aFestivalData && !bFestivalData) return -1;
    if (!aFestivalData && bFestivalData) return 1;
    
    // 都没有节日数据，按模板ID排序
    return a.id.localeCompare(b.id);
  });
}

// 获取指定模板ID的模板数据
function getTemplateById(templateId) {
  // 先获取所有模板的扁平数组
  const allTemplates = getAllTemplates();
  // 直接在扁平数组中查找匹配ID的模板
  return allTemplates.find(template => template.id === templateId) || null;
}

// 获取指定月份和节日的模板
function getTemplatesByFilters(month, festival) {
  const allTemplates = getAllTemplates();
  
  return allTemplates.filter(template => {
    // 检查月份匹配
    const monthMatch = !month || (template.months && template.months.includes(month));
    
    // 检查节日匹配
    const festivalMatch = !festival || (template.festivals && template.festivals.includes(festival));
    
    return monthMatch && festivalMatch;
  });
}

// 显示提示信息
function showToast(message, type = 'info', duration = 3000) {
  // 创建Toast元素
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // 添加到页面
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

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 将工具函数挂载到window对象
if (typeof window !== 'undefined') {
  window.utils = {
    getCurrentDate,
    getCurrentMonth,
    getCurrentMonthAndDay,
    isDateInMonth,
    getAllFestivals,
    getFestivalsByMonth,
    getFestivalNamesByMonth,
    getDaysBetweenDates,
    getNextFestivalInMonth,
    autoSelectByDate,
    getFestivalDate,
    getMonthsByFestival,
    createMonthButtonHTML,
    createFestivalTagHTML,
    formatFileSize,
    validateImageFile,
    readImageFileAsDataURL,
    uploadImage,
    downloadImage,
    renderHTMLToCanvas,
    generateUniqueId,
    getFromLocalStorage,
    saveToLocalStorage,
    removeFromLocalStorage,
    getAllTemplates,
    getTemplateById,
    getTemplatesByFilters,
    showToast,
    debounce,
    throttle
  };
}