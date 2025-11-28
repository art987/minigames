// 全局变量存储当前主题数据
let currentThemeData = null;

// 本地存储键名
const HISTORY_STORAGE_KEY = 'turntable_history';

// 存储最近选择的分区索引，用于避免重复
let recentSections = [];

// 时间窗口限制（分钟）
const TIME_WINDOW_MINUTES = 60; // 一小时

// 每个选项在时间窗口内的最大出现次数
const MAX_OCCURRENCES_PER_HOUR = 1;

// 本地存储键名 - 用于存储选项出现记录
const OCCURRENCES_STORAGE_KEY = 'turntable_option_occurrences';

// 存储选项出现记录的数据结构
function getOptionOccurrences() {
    try {
        const occurrencesStr = localStorage.getItem(OCCURRENCES_STORAGE_KEY);
        return occurrencesStr ? JSON.parse(occurrencesStr) : {};
    } catch (error) {
        console.log('获取选项出现记录失败:', error);
        return {};
    }
}

// 清理过期的选项出现记录
function cleanExpiredOccurrences() {
    try {
        const occurrences = getOptionOccurrences();
        const currentTime = Date.now();
        const timeWindowMs = TIME_WINDOW_MINUTES * 60 * 1000;
        let hasChanges = false;

        // 遍历所有选项记录
        for (const optionId in occurrences) {
            // 过滤出过期的记录
            const validOccurrences = occurrences[optionId].filter(timestamp => 
                currentTime - timestamp < timeWindowMs
            );
            
            // 如果记录被修改，标记为有变化
            if (validOccurrences.length !== occurrences[optionId].length) {
                occurrences[optionId] = validOccurrences;
                hasChanges = true;
            }
            
            // 如果某个选项的记录为空，删除该选项
            if (validOccurrences.length === 0) {
                delete occurrences[optionId];
                hasChanges = true;
            }
        }
        
        // 如果有变化，保存到本地存储
        if (hasChanges) {
            localStorage.setItem(OCCURRENCES_STORAGE_KEY, JSON.stringify(occurrences));
        }
    } catch (error) {
        console.log('清理过期记录失败:', error);
    }
}

// 获取特定选项在过去一小时内的出现次数
function getOptionOccurrenceCount(optionId) {
    try {
        // 先清理过期记录
        cleanExpiredOccurrences();
        
        const occurrences = getOptionOccurrences();
        if (!occurrences[optionId]) {
            return 0;
        }
        
        // 过滤出在时间窗口内的记录
        const currentTime = Date.now();
        const timeWindowMs = TIME_WINDOW_MINUTES * 60 * 1000;
        const validOccurrences = occurrences[optionId].filter(timestamp => 
            currentTime - timestamp < timeWindowMs
        );
        
        return validOccurrences.length;
    } catch (error) {
        console.log('获取选项出现次数失败:', error);
        return 0;
    }
}

// 记录选项出现
function recordOptionOccurrence(optionId) {
    try {
        // 先清理过期记录
        cleanExpiredOccurrences();
        
        const occurrences = getOptionOccurrences();
        const currentTime = Date.now();
        
        // 如果该选项还没有记录，创建一个空数组
        if (!occurrences[optionId]) {
            occurrences[optionId] = [];
        }
        
        // 添加当前时间戳
        occurrences[optionId].push(currentTime);
        
        // 保存回本地存储
        localStorage.setItem(OCCURRENCES_STORAGE_KEY, JSON.stringify(occurrences));
    } catch (error) {
        console.log('记录选项出现失败:', error);
    }
}

// 检查选项是否可以被选择（在过去一小时内出现次数不超过限制）
function canSelectOption(optionId) {
    const count = getOptionOccurrenceCount(optionId);
    // 添加调试日志
    console.log(`选项 ${optionId} 在过去一小时内出现了 ${count} 次，限制为 ${MAX_OCCURRENCES_PER_HOUR} 次，是否可选择: ${count < MAX_OCCURRENCES_PER_HOUR}`);
    return count < MAX_OCCURRENCES_PER_HOUR;
}

// 调试函数：显示所有选项的出现次数
function debugShowAllOptionOccurrences() {
    try {
        cleanExpiredOccurrences();
        const occurrences = getOptionOccurrences();
        console.log('=== 一小时内选项出现次数 ===');
        for (const optionId in occurrences) {
            console.log(`${optionId}: ${occurrences[optionId].length} 次`);
            // 显示每次出现的时间戳
            occurrences[optionId].forEach((timestamp, index) => {
                const timeStr = new Date(timestamp).toLocaleTimeString();
                console.log(`  - 第 ${index + 1} 次: ${timeStr}`);
            });
        }
        console.log('============================');
    } catch (error) {
        console.log('显示选项出现次数失败:', error);
    }
}

// 调试函数：重置选项出现记录
function debugResetOptionOccurrences() {
    try {
        localStorage.removeItem(OCCURRENCES_STORAGE_KEY);
        console.log('已重置所有选项出现记录');
    } catch (error) {
        console.log('重置选项出现记录失败:', error);
    }
}

// 添加全局调试方法，方便在浏览器控制台调用
window.debugTurntable = {
    showOccurrences: debugShowAllOptionOccurrences,
    resetOccurrences: debugResetOptionOccurrences,
    // 测试辅助函数：将指定选项设置为已达到限制
    setOptionToLimit: function(optionId) {
        try {
            // 先清理过期记录
            cleanExpiredOccurrences();
            
            const occurrences = getOptionOccurrences();
            const currentTime = Date.now();
            
            // 设置选项出现次数达到限制（3次）
            occurrences[optionId] = [];
            for (let i = 0; i < MAX_OCCURRENCES_PER_HOUR; i++) {
                // 添加时间戳，确保都在时间窗口内
                occurrences[optionId].push(currentTime - (i * 60 * 1000)); // 每分钟一次
            }
            
            // 保存回本地存储
            localStorage.setItem(OCCURRENCES_STORAGE_KEY, JSON.stringify(occurrences));
            console.log(`已将选项 "${optionId}" 设置为一小时内出现 ${MAX_OCCURRENCES_PER_HOUR} 次（达到限制）`);
        } catch (error) {
            console.log('设置选项限制失败:', error);
        }
    }
};

// 根据分区数量动态确定需要排除的最近选择数量
function getExclusionCount() {
    // 分区数量较少时，排除更多的最近选择
    if (totalSections <= 6) return Math.min(recentSections.length, 3); // 最多排除前3个
    if (totalSections <= 12) return Math.min(recentSections.length, 5); // 最多排除前5个
    return Math.min(recentSections.length, 8); // 分区数量较多时，最多排除前8个
}

// 获取非重复的随机分区索引
function getNonRepeatingRandomSection() {
    // 获取需要排除的最近选择数量
    const exclusionCount = getExclusionCount();
    
    // 获取需要排除的分区索引数组
    const excludedSections = recentSections.slice(0, exclusionCount);
    
    // 创建可用分区数组 - 考虑一小时内重复限制
    const availableSections = [];
    const limitedSections = []; // 存储达到限制但未在最近排除中的分区
    let hasAvailableSection = false;
    
    for (let i = 0; i < totalSections; i++) {
        // 检查是否在最近选择中被排除
        const isRecentlyExcluded = excludedSections.includes(i);
        
        // 检查是否在一小时内出现次数超过限制
        const optionId = sectionData[i] ? sectionData[i].title : `section_${i}`;
        const canSelectDueToTimeLimit = canSelectOption(optionId);
        
        // 如果不在最近排除中，且没有超过时间限制，则可以选择
        if (!isRecentlyExcluded && canSelectDueToTimeLimit) {
            availableSections.push(i);
            hasAvailableSection = true;
        } else if (!isRecentlyExcluded && !canSelectDueToTimeLimit) {
            // 如果不在最近排除中，但已达到时间限制，放入限制数组
            limitedSections.push(i);
        }
    }
    
    let selectedSection;
    
    // 优先从可用分区中选择
    if (hasAvailableSection) {
        // 从可用分区中随机选择一个
        const randomIndex = Math.floor(Math.random() * availableSections.length);
        selectedSection = availableSections[randomIndex];
    } else {
        // 如果没有完全可用的分区，考虑两种情况：
        // 1. 有达到限制但未在最近排除中的分区
        // 2. 所有分区都被最近排除或达到限制
        
        if (limitedSections.length > 0) {
            // 如果有达到限制但未在最近排除中的分区，降低权重选择
            // 给予较低概率（20%）选择这些分区
            if (Math.random() < 0.2) {
                const randomIndex = Math.floor(Math.random() * limitedSections.length);
                selectedSection = limitedSections[randomIndex];
            } else {
                // 否则从所有分区中选择（忽略所有限制）
                selectedSection = Math.floor(Math.random() * totalSections);
            }
            
            // 记录所有选项都达到限制的情况
            console.log('警告: 大多数选项已在一小时内达到出现限制，系统正在调整选择权重');
        } else {
            // 当所有分区都被限制或最近排除时，忽略限制，选择任意分区
            selectedSection = Math.floor(Math.random() * totalSections);
        }
    }
    
    // 更新最近选择的分区记录
    recentSections.unshift(selectedSection);
    // 限制数组长度，最多保存10个最近的选择
    if (recentSections.length > 10) {
        recentSections = recentSections.slice(0, 10);
    }
    
    return selectedSection;
}

// 保存历史记录到本地存储
function saveToHistory(result) {
    try {
        // 获取现有历史记录
        let history = getHistory();
        
        // 创建新记录对象
        const record = {
            id: Date.now(), // 使用时间戳作为唯一ID
            theme: currentTheme,
            title: result.title,
            description: result.description,
            image: result.imageUrl || result.image, // 同时保存imageUrl和image以确保兼容性
            imageUrl: result.imageUrl || result.image,
            timestamp: new Date().toISOString()
        };
        
        // 添加到历史记录数组开头（最新的在前）
        history.unshift(record);
        
        // 限制历史记录数量，最多保存50条
        if (history.length > 50) {
            history = history.slice(0, 50);
        }
        
        // 保存回本地存储
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.log('保存历史记录失败:', error);
    }
}

// 从本地存储获取历史记录
function getHistory() {
    try {
        const historyStr = localStorage.getItem(HISTORY_STORAGE_KEY);
        return historyStr ? JSON.parse(historyStr) : [];
    } catch (error) {
        console.log('获取历史记录失败:', error);
        return [];
    }
}

// 清除所有历史记录
function clearHistory() {
    try {
        if (confirm('确定要清空所有历史记录吗？')) {
            localStorage.removeItem(HISTORY_STORAGE_KEY);
            renderHistoryList();
        }
    } catch (error) {
        console.log('清除历史记录失败:', error);
    }
}

// 渲染历史记录列表
function renderHistoryList() {
    const history = getHistory();
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="no-history">暂无历史记录</div>';
        return;
    }
    
    let html = '';
    history.forEach(record => {
        const date = new Date(record.timestamp);
        const formattedTime = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        html += `
            <div class="history-item" data-id="${record.id}">
                <img src="${record.imageUrl}" alt="${record.title}" class="history-item-image">
                <div class="history-item-info">
                    <div class="history-item-title">${record.title}</div>
                    <div class="history-item-time">${formattedTime}</div>
                    <span class="history-item-theme">${record.description ? (record.description.length > 30 ? record.description.substring(0, 30) + '...' : record.description) : ''}</span>
                </div>
            </div>
        `;
    });
    
    historyList.innerHTML = html;
    
    // 为每个历史记录项添加点击事件
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', function() {
            const recordId = parseInt(this.dataset.id);
            const record = history.find(r => r.id === recordId);
            if (record) {
                showHistoryRecordDetails(record);
            }
        });
    });
}

// 显示历史记录详情（重新使用现有的结果模态框）
function showHistoryRecordDetails(record) {
    // 关闭历史记录弹窗
    historyModal.style.display = 'none';
    
    // 使用现有的结果显示方式
    prizeImage.src = record.imageUrl;
    prizeTitle.textContent = record.title;
    prizeDescription.innerHTML = record.description;
    
    resultModal.style.display = 'flex';
    resultModal.classList.add('show');
}

// 检查指定分区是否可用（未达到一小时内出现次数限制）
function isSectionAvailable(sectionIndex) {
    try {
        if (!sectionData || !sectionData[sectionIndex]) {
            return false;
        }
        const optionId = sectionData[sectionIndex].title;
        return canSelectOption(optionId);
    } catch (error) {
        console.log('检查分区可用性失败:', error);
        return false;
    }
}

// 显示选项限制警告提示
function showLimitWarning(optionId) {
    try {
        // 检查是否已存在警告元素
        let warningElement = document.getElementById('limitWarning');
        if (!warningElement) {
            // 创建警告元素
            warningElement = document.createElement('div');
            warningElement.id = 'limitWarning';
            warningElement.style.position = 'fixed';
            warningElement.style.bottom = '20px';
            warningElement.style.left = '50%';
            warningElement.style.transform = 'translateX(-50%)';
            warningElement.style.backgroundColor = '#ff6b6b';
            warningElement.style.color = 'white';
            warningElement.style.padding = '12px 24px';
            warningElement.style.borderRadius = '8px';
            warningElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            warningElement.style.zIndex = '10000';
            warningElement.style.fontSize = '14px';
            warningElement.style.opacity = '0';
            warningElement.style.transition = 'opacity 0.3s ease-in-out';
            document.body.appendChild(warningElement);
        }
        
        // 设置警告内容
        warningElement.textContent = `"${optionId}" 在过去一小时内已出现 ${MAX_OCCURRENCES_PER_HOUR} 次，将暂时减少出现概率。`;
        
        // 显示警告
        warningElement.style.opacity = '1';
        
        // 3秒后自动隐藏
        setTimeout(() => {
            warningElement.style.opacity = '0';
            setTimeout(() => {
                if (warningElement.parentNode) {
                    warningElement.parentNode.removeChild(warningElement);
                }
            }, 300);
        }, 3000);
    } catch (error) {
        console.log('显示限制警告失败:', error);
    }
}

// 打开历史记录弹窗
function openHistoryModal() {
    renderHistoryList();
    historyModal.style.display = 'flex';
}

// 关闭历史记录弹窗
function closeHistoryModalHandler() {
    historyModal.style.display = 'none';
}

// 当前已加载的选项数量
let loadedOptionsCount = 0;
const optionsPerPage = 5;

// 打开所有选项弹窗
function openAllOptionsModal() {
    // 重置加载计数
    loadedOptionsCount = 0;
    allOptionsList.innerHTML = '';
    
    // 显示弹窗
    allOptionsModal.style.display = 'flex';
    
    // 首次加载5个选项
    loadMoreOptions();
    
    // 添加滚动监听以实现无限加载
    setupScrollListener();
}

// 关闭所有选项弹窗
function closeAllOptionsModalHandler() {
    allOptionsModal.style.display = 'none';
    // 移除滚动监听
    allOptionsList.removeEventListener('scroll', handleOptionsScroll);
}

// 设置滚动监听
function setupScrollListener() {
    allOptionsList.addEventListener('scroll', handleOptionsScroll);
}

// 处理滚动事件
function handleOptionsScroll() {
    const { scrollTop, scrollHeight, clientHeight } = this;
    
    // 当滚动到接近底部时加载更多
    if (scrollHeight - scrollTop - clientHeight < 100 && loadedOptionsCount < sectionData.length) {
        loadMoreOptions();
    }
}

// 加载更多选项
function loadMoreOptions() {
    // 显示加载指示器
    loadingIndicator.style.display = 'flex';
    
    // 模拟加载延迟，使体验更流畅
    setTimeout(() => {
        const optionsToLoad = sectionData.slice(loadedOptionsCount, loadedOptionsCount + optionsPerPage);
        
        optionsToLoad.forEach((option, index) => {
            const optionIndex = loadedOptionsCount + index;
            const optionElement = createOptionElement(option, optionIndex);
            allOptionsList.appendChild(optionElement);
        });
        
        loadedOptionsCount += optionsToLoad.length;
        
        // 隐藏加载指示器
        loadingIndicator.style.display = 'none';
    }, 300);
}

// 创建单个选项元素
function createOptionElement(option, index) {
    const optionCard = document.createElement('div');
    optionCard.className = 'option-card';
    optionCard.dataset.index = index;
    
    // 设置选项卡片HTML内容，类似于结果详情页
    optionCard.innerHTML = `
        <div class="option-header">
            <span class="option-number">第${index + 1}个选项</span>
        </div>
        <img src="${option.imageUrl || option.image || 'https://picsum.photos/350/200?random=' + index}" alt="${option.title}" class="option-image">
        <h4 class="option-title">${option.title}</h4>
        <div class="option-description">${option.description || '暂无描述'}</div>
    `;
    
    return optionCard;
}

// 支持的主题列表
const supportedThemes = ['romantic', 'food', 'travel', 'mood'];

// 获取DOM元素
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const backBtn = document.getElementById('backBtn');
const resultModal = document.getElementById('resultModal');
const closeModal = document.getElementById('closeModal');
const prizeImage = document.getElementById('prizeImage');
const prizeTitle = document.getElementById('prizeTitle');
const prizeDescription = document.getElementById('prizeDescription');
const floatingHearts = document.getElementById('floatingHearts');
const historyBtn = document.getElementById('historyBtn');
const historyModal = document.getElementById('historyModal');
const historyList = document.getElementById('historyList');
const closeHistoryModal = document.getElementById('closeHistoryModal');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const wheelContainer = document.getElementById('wheelContainer');
const timer = document.getElementById('timer');
const countdown = document.getElementById('countdown');
const frameOrnaments = document.getElementById('frameOrnaments');
const centerImage = document.getElementById('centerImage');
const centerStaticImg = document.getElementById('centerStaticImg');
const centerGifImg = document.getElementById('centerGifImg');
const themeTitle = document.getElementById('themeTitle');
// 所有选项相关元素
const allOptionsBtn = document.getElementById('allOptionsBtn');
const allOptionsModal = document.getElementById('allOptionsModal');
const closeAllOptionsModal = document.getElementById('closeAllOptionsModal');
const allOptionsList = document.getElementById('allOptionsList');
const loadingIndicator = document.getElementById('loadingIndicator');
const themeSubtitle = document.getElementById('themeSubtitle');
const pageTitle = document.getElementById('pageTitle');
const actionButtons = document.getElementById('actionButtons');
const powerBtn = document.getElementById('powerBtn');
const stopBtn = document.getElementById('stopBtn');

// 获取音效元素并添加错误处理
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');
const buttonSound = document.getElementById('buttonSound');
const explosionSound = document.getElementById('explosionSound');
const magicSound = document.getElementById('magicSound');
const romanticMusic = document.getElementById('romanticMusic');

// 包装音频播放函数，添加错误处理
function playSound(soundElement) {
    if (soundElement && soundElement.currentTime !== undefined) {
        try {
            soundElement.currentTime = 0;
            soundElement.play().catch(error => {
                console.log('音频播放失败（正常现象）:', error);
            });
        } catch (e) {
            // 忽略音频错误，不影响主要功能
        }
    }
}

// 包装音频暂停函数
function pauseSound(soundElement) {
    if (soundElement && soundElement.pause !== undefined) {
        try {
            soundElement.pause();
        } catch (e) {
            // 忽略音频错误
        }
    }
}

// 大力按钮点击事件处理函数
function handlePowerButton() {
    if (!isSpinning) return;
    
    // 增加剩余时间0.3秒
    countdownValue += 1;
    countdown.textContent = countdownValue.toFixed(1);
    
    // 播放按钮音效
    try {
        buttonSound.currentTime = 0;
        playSound(buttonSound);
    } catch (e) {
        console.log("播放按钮音效失败:", e);
    }
    
    // 添加视觉反馈效果
    powerBtn.classList.add('power-boost');
    setTimeout(() => {
        powerBtn.classList.remove('power-boost');
    }, 200);
}

// 停按钮点击事件处理函数
function handleStopButton() {
    if (!isSpinning) return;
    
    // 将剩余时间减至1秒
    if (countdownValue > 1) {
        countdownValue = 1;
        countdown.textContent = countdownValue.toFixed(1);
        
        // 播放按钮音效
        try {
            buttonSound.currentTime = 0;
            playSound(buttonSound);
        } catch (e) {
            // 忽略音频错误
        }
        
        // 添加视觉反馈效果
        stopBtn.classList.add('stop-press');
        setTimeout(() => {
            stopBtn.classList.remove('stop-press');
        }, 200);
    }
}

// 当前主题配置
let currentTheme = 'romantic';
let sectionData = [];

// 转盘参数
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(centerX, centerY) - 10;
let totalSections = 12;
let sectionAngle = (2 * Math.PI) / totalSections;

// 转盘状态
let isSpinning = false;
let currentAngle = 0;
let spinAnimation;
let lastTickSection = -1;
let countdownValue = 5;
let audioContextUnlocked = false;
let lastSection = -1; // 记录上一次转到的分区，初始为-1表示没有上一次结果

// 获取URL参数中的主题
function getThemeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    return supportedThemes.includes(theme) ? theme : 'romantic';
}

// 获取当前主题的特殊符号设置
function getThemeSymbols() {
    // 默认符号设置
    const defaultSymbols = {
        floatingSymbol: '💗',
        explosionSymbol: '💥',
        sparkleSymbol: '✨'
    };
    
    // 如果主题数据中包含symbols配置，则使用配置的符号
    if (currentThemeData && currentThemeData.config && currentThemeData.config.symbols) {
        return {
            ...defaultSymbols,
            ...currentThemeData.config.symbols
        };
    }
    
    // 否则根据主题类型使用不同的默认符号
    if (currentTheme === 'romantic') {
        return {
            floatingSymbol: '💗',
            explosionSymbol: '💖',
            sparkleSymbol: '✨'
        };
    } else if (currentTheme === 'food') {
        return {
            floatingSymbol: '🍔',
            explosionSymbol: '🍕',
            sparkleSymbol: '✨'
        };
    } else if (currentTheme === 'travel') {
        return {
            floatingSymbol: '✈️',
            explosionSymbol: '🌍',
            sparkleSymbol: '✨'
        };
    } else if (currentTheme === 'mood') {
        return {
            floatingSymbol: '😊',
            explosionSymbol: '✨',
            sparkleSymbol: '🌟'
        };
    }
    
    return defaultSymbols;
}

// 初始化主题 - 使用动态导入加载主题数据
async function initializeTheme(theme) {
    currentTheme = theme;
    
    try {
        // 动态导入对应主题的数据文件
        const module = await import(`./themes_data/${theme}.js`);
        currentThemeData = module.default;
        const config = currentThemeData.config;
        
        // 更新页面标题和描述
        pageTitle.textContent = config.title;
        themeTitle.textContent = config.title;
        themeSubtitle.textContent = config.subtitle;
        
        // 更新中心图片
        centerStaticImg.src = config.centerImage; // 设置默认静态图片
        centerGifImg.src = config.centerGif;
        
        // 更新转盘参数
        totalSections = config.options ? config.options.length : config.totalSections;
        sectionAngle = (2 * Math.PI) / totalSections;
        
        // 生成分区数据
        generateSectionData(config);
        
        // 绘制转盘
        drawWheel();
        
        // 创建边框装饰
        createFrameOrnaments();
        
    } catch (error) {
        console.error(`加载主题数据失败: ${error}`);
        // 加载失败时使用默认配置
        const defaultConfig = {
            title: "默认主题",
            subtitle: "主题加载失败",
            totalSections: 8,
            colorBase: "#999",
            centerImage: "https://picsum.photos/100",
            centerGif: "https://media.giphy.com/media/xT0xeuOy2Fcl9vDGiA/giphy.gif"
        };
        initializeWithDefaultConfig(defaultConfig);
    }
}

// 当主题数据加载失败时使用默认配置
function initializeWithDefaultConfig(config) {
    // 更新页面标题和描述
    pageTitle.textContent = config.title;
    themeTitle.textContent = config.title;
    themeSubtitle.textContent = config.subtitle;
    
    // 更新中心图片
    centerStaticImg.src = config.centerImage;
    centerGifImg.src = config.centerGif;
    
    // 更新转盘参数
    totalSections = config.totalSections;
    sectionAngle = (2 * Math.PI) / totalSections;
    
    // 使用默认分区数据
    sectionData = Array.from({length: totalSections}, (_, i) => ({
        id: i + 1,
        title: `选项 ${i + 1}`,
        description: "主题加载失败，使用默认数据",
        imageUrl: `https://picsum.photos/350/200?random=${i + 1}`
    }));
    
    // 绘制转盘
    drawWheel();
    
    // 创建边框装饰
    createFrameOrnaments();
}

// 生成分区数据
function generateSectionData(config) {
    // 如果主题数据中包含options数组，直接使用
    if (currentThemeData && currentThemeData.options && currentThemeData.options.length > 0) {
        sectionData = currentThemeData.options;
    } else {
        // 兼容旧格式或使用默认数据
        sectionData = Array.from({length: config.totalSections}, (_, i) => {
            const title = config.themes ? config.themes[i % config.themes.length] : `选项 ${i + 1}`;
            return {
                id: i + 1,
                title: title,
                description: getDescriptionForTheme(title, i + 1),
                imageUrl: `https://picsum.photos/350/200?random=${i + 1}&t=${Date.now()}`
            };
        });
    }
    
    // 对于心情主题，确保显示70个选项
    if (currentTheme === 'mood' && sectionData.length < 70 && currentThemeData && currentThemeData.options) {
        sectionData = currentThemeData.options;
    }
}

// 根据主题获取描述（兼容模式）
function getDescriptionForTheme(theme, index) {
    const defaultDescriptions = {
        '浪漫主题': `这是属于你的第${index}个浪漫时刻！${theme}的惊喜正等待着你，愿这份美好如繁星般点亮你的每一天。`,
        '美食主题': `${theme}是个不错的选择！今天就尝试一下${theme}的美味吧，享受味蕾的盛宴。`,
        '旅行主题': `${theme}是一个令人向往的地方！计划一次前往${theme}的旅行，探索那里的美景和文化。`
    };
    
    // 如果有主题配置，使用对应的描述
    if (currentThemeData && currentThemeData.config) {
        return defaultDescriptions[currentThemeData.config.title] || `恭喜你获得了${theme}！`;
    }
    
    return `恭喜你获得了${theme}！`;
}

// 创建转盘边框装饰
function createFrameOrnaments() {
    // 确保frameOrnaments元素存在
    if (!frameOrnaments) return;
    
    // 清空现有装饰
    frameOrnaments.innerHTML = '';
    
    // 获取当前主题的浮动符号
    const floatingSymbol = getThemeSymbols().floatingSymbol;
    
    const ornamentCount = 12;
    for (let i = 0; i < ornamentCount; i++) {
        const ornament = document.createElement('div');
        ornament.className = 'ornament';
        
        // 设置浮动符号作为内容
        ornament.textContent = floatingSymbol;
        
        frameOrnaments.appendChild(ornament);
        
        const angle = (i * 2 * Math.PI) / ornamentCount;
        const distance = 240; // 距离中心的距离
        
        ornament.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
        ornament.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;
        ornament.style.animationDelay = `${i * 0.5}s`;
        
        // 添加悬浮动画
        ornament.animate([
            { transform: 'translateY(0) scale(1)' },
            { transform: 'translateY(-15px) scale(1.2)' },
            { transform: 'translateY(0) scale(1)' }
        ], {
            duration: 2000 + Math.random() * 1000,
            iterations: Infinity,
            delay: i * 200
        });
        
        // 添加鼠标悬浮效果
        ornament.addEventListener('mouseover', () => {
            ornament.style.transform = 'scale(1.3)';
        });
        
        ornament.addEventListener('mouseout', () => {
            ornament.style.transform = 'scale(1)';
        });
    }
}

// 绘制转盘
function drawWheel(angle = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    
    // 根据主题设置不同的渐变背景
    const config = currentThemeData ? currentThemeData.config : null;
    const gradient = ctx.createRadialGradient(0, 0, radius * 0.3, 0, 0, radius);
    
    // 根据不同主题设置不同的颜色
    if (currentTheme === 'romantic') {
        gradient.addColorStop(0, '#ff6469ff');
        gradient.addColorStop(0.3, '#e2ff3cff');
        gradient.addColorStop(0.6, '#307fffff');
        gradient.addColorStop(1, '#44c0faff');
    } else if (currentTheme === 'food') {
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(0.3, '#ffd166');
        gradient.addColorStop(0.6, '#06d6a0');
        gradient.addColorStop(1, '#118ab2');
    } else if (currentTheme === 'travel') {
        gradient.addColorStop(0, '#d8961cff');
        gradient.addColorStop(0.3, '#44a08d');
        gradient.addColorStop(0.6, '#69f727ff');
        gradient.addColorStop(1, '#3a00dbff');
    } else if (currentTheme === 'mood') {
        // 为心情主题设置温暖明亮的渐变色彩
        gradient.addColorStop(0, '#FF9500'); // 温暖的橙色
        gradient.addColorStop(0.2, '#FFD700'); // 明亮的金色
        gradient.addColorStop(0.5, '#FF6B6B'); // 柔和的红色
        gradient.addColorStop(0.8, '#4ECDC4'); // 清新的青绿色
        gradient.addColorStop(1, '#845EC2'); // 神秘的紫色
    }
    
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // 绘制分区
    for (let i = 0; i < totalSections; i++) {
        const startAngle = i * sectionAngle;
        const endAngle = (i + 1) * sectionAngle;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        
        // 使用柔和的渐变色
        const hue = (i * 360 / totalSections) % 360;
        const baseColor = config ? config.colorBase || '#999' : '#999';
        
        // 统一使用鲜艳的色彩样式，适用于所有主题
        ctx.fillStyle = `hsla(${hue + 30}, 80%, 65%, 0.9)`;
        
        ctx.fill();
        
        // 绘制分区线（根据分区数量调整显示频率）
        let lineFrequency = 1;
        if (currentTheme === 'mood') {
            // 对于心情主题（70个选项），每5个分区显示一次分区线
            lineFrequency = 5;
        } else {
            lineFrequency = totalSections > 100 ? 10 : (totalSections > 20 ? 5 : 1);
        }
        if (i % lineFrequency === 0) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(startAngle) * radius, Math.sin(startAngle) * radius);
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        
        // 为分区显示选项信息
        ctx.save();
        ctx.rotate(startAngle + sectionAngle / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        
        // 获取当前分区的标题
        let title = sectionData[i] && sectionData[i].title ? sectionData[i].title : `选项 ${i + 1}`;
        
        // 根据分区大小动态计算字体大小
        // 分区角度越小（分区越多），字体应该越小
        // 留出20像素的边缘空间
        const margin = 35;
        const textRadius = radius - margin; // 文字区域的半径，离边缘有20像素
        
        const partitionWidth = 2 * Math.sin(sectionAngle / 2) * (textRadius - 10);
        let fontSize = Math.min(20, Math.max(6, partitionWidth / 4)); // 最大20px，最小6px
        fontSize = Math.floor(fontSize); // 确保是整数像素
        
        ctx.font = `bold ${fontSize}px Arial`;
        
        // 计算可用文本宽度（留出一些边距）
        const availableTextWidth = partitionWidth * 0.9;
        
        let displayText = '';
        
        // 对于心情主题的特殊处理
        if (currentTheme === 'mood') {
            // 对于心情主题，只显示序号，这样更清晰
            if (i % 5 === 0) { // 每5个分区显示一次
                displayText = (i + 1).toString();
            } else {
                // 其他分区可以显示简短的符号或不显示
                ctx.restore();
                continue;
            }
        } else {
            // 其他主题的正常处理
            displayText = title;
            if (ctx.measureText(title).width > availableTextWidth) {
                // 二分查找适合的文本长度
                let start = 0;
                let end = title.length;
                let bestLength = start;
                
                while (start <= end) {
                    const mid = Math.floor((start + end) / 2);
                    const testText = title.substring(0, mid) + '...';
                    const textWidth = ctx.measureText(testText).width;
                    
                    if (textWidth <= availableTextWidth) {
                        bestLength = mid;
                        start = mid + 1;
                    } else {
                        end = mid - 1;
                    }
                }
                
                displayText = bestLength > 0 ? title.substring(0, bestLength) + '...' : '...';
            }
        }
        
        // 将文本绘制在分区中心，确保离边缘有20像素距离
        ctx.fillText(displayText, textRadius - 10, 5);
        ctx.restore();
    }
    
    // 绘制华丽中心圆
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    const centerGradient = ctx.createRadialGradient(0, 0, 5, 0, 0, 25);
    const baseColor2 = config ? config.colorBase || '#999' : '#999';
    centerGradient.addColorStop(0, baseColor2);
    centerGradient.addColorStop(1, '#ff6b6b');
    ctx.fillStyle = centerGradient;
    ctx.fill();
    
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 添加中心装饰
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    
    ctx.restore();
}

// 更新中心图片状态（旋转时）
function switchToGif() {
    // 移除中奖图片覆盖层（如果存在）
    const existingOverlay = document.getElementById('prizeImageOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // 不显示GIF，始终使用静态图片
    centerStaticImg.style.display = 'block';
    centerGifImg.style.display = 'none';
    centerImage.classList.add('spinning');
}

// 切换中心图片为静态图片（停止旋转时）
function switchToStatic() {
    centerGifImg.style.display = 'none';
    centerStaticImg.style.display = 'block';
    centerImage.classList.remove('spinning');
}

// 创建漂浮符号效果
function createFloatingHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 200);
    }
}

function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'heart';
    
    // 获取当前主题的漂浮符号
    const floatingSymbol = getThemeSymbols().floatingSymbol;
    heart.textContent = floatingSymbol;
    
    floatingHearts.appendChild(heart);
    
    const startX = Math.random() * 100;
    const size = Math.random() * 15 + 15; // 稍微大一点，让符号更明显
    const duration = Math.random() * 5 + 5;
    
    heart.style.fontSize = size + 'px';
    heart.style.left = startX + 'vw';
    heart.style.top = '100vh';
    
    // 根据主题设置不同颜色
    if (currentTheme === 'romantic') {
        heart.style.color = '#ff6b6b'; // 统一的粉红色
    } else if (currentTheme === 'food') {
        heart.style.color = `hsl(${Math.random() * 60 + 30}, 80%, 60%)`;
    } else if (currentTheme === 'travel') {
        heart.style.color = `hsl(${Math.random() * 120 + 180}, 70%, 60%)`;
    } else if (currentTheme === 'mood') {
        // 为心情主题设置多彩的颜色
        const colors = ['#FF9500', '#FFD700', '#FF6B6B', '#4ECDC4', '#845EC2'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 符号动画
    const animation = heart.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
        { transform: `translateY(-${Math.random() * 30 + 70}vh) rotate(${Math.random() * 360}deg)`, opacity: 1 },
        { transform: `translateY(-${Math.random() * 30 + 100}vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
    });
    
    animation.onfinish = () => heart.remove();
}

// 创建爆炸效果
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        
        // 获取当前主题的爆炸符号
        const explosionSymbol = getThemeSymbols().explosionSymbol;
        heart.textContent = explosionSymbol;
        
        document.body.appendChild(heart);
        
        const size = Math.random() * 20 + 15;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 100;
        
        heart.style.fontSize = size + 'px';
        heart.style.left = '50%';
        heart.style.top = '50%';
        
        // 根据主题设置不同颜色
        if (currentTheme === 'romantic') {
            heart.style.color = '#ff6b6b'; // 统一的粉红色
        } else if (currentTheme === 'food') {
            heart.style.color = `hsl(${Math.random() * 60 + 30}, 80%, 60%)`;
        } else if (currentTheme === 'travel') {
            heart.style.color = `hsl(${Math.random() * 120 + 180}, 70%, 60%)`;
        }
        
        // 爆炸动画
        const animation = heart.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`, opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        animation.onfinish = () => heart.remove();
    }
}

// 创建闪烁符号效果
function createSparkles() {
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        
        // 获取当前主题的闪烁符号
        const sparkleSymbol = getThemeSymbols().sparkleSymbol;
        sparkle.textContent = sparkleSymbol;
        
        document.body.appendChild(sparkle);
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const size = Math.random() * 10 + 8; // 稍微大一点
        const duration = Math.random() * 2 + 1;
        
        sparkle.style.fontSize = size + 'px';
        sparkle.style.left = startX + 'vw';
        sparkle.style.top = startY + 'vh';
        
        // 根据主题设置不同颜色
        if (currentTheme === 'romantic') {
            sparkle.style.color = `hsl(${Math.random() * 20 + 340}, 100%, 60%)`;
        } else if (currentTheme === 'food') {
            sparkle.style.color = `hsl(${Math.random() * 60 + 30}, 100%, 60%)`;
        } else if (currentTheme === 'travel') {
            sparkle.style.color = `hsl(${Math.random() * 120 + 180}, 100%, 60%)`;
        } else if (currentTheme === 'mood') {
            // 为心情主题设置多彩的闪烁颜色
            const colors = ['#FF9500', '#FFD700', '#FF6B6B', '#4ECDC4', '#845EC2'];
            sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
            // 默认颜色
            sparkle.style.color = `hsl(${Math.random() * 60 + 40}, 100%, 60%)`;
        }
        
        // 闪烁动画
        const animation = sparkle.animate([
            { transform: 'scale(0.5)', opacity: 0 },
            { transform: 'scale(1.2)', opacity: 1 },
            { transform: 'scale(0.5)', opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: 3
        });
        
        animation.onfinish = () => sparkle.remove();
    }
}

// 解锁音频上下文
function unlockAudio() {
    if (audioContextUnlocked) return;
    
    try {
        // 创建一个短暂的音频并播放以解锁音频上下文
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.001; // 几乎听不到
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        
        audioContextUnlocked = true;
        
        // 尝试播放背景音乐
        romanticMusic.volume = 0.3;
        playSound(romanticMusic);
    } catch (e) {
        console.log("音频上下文初始化失败:", e);
    }
}

// 全局变量用于存储倒计时定时器
let countdownTimer = null;

// 更新倒计时显示
function updateCountdown() {
    // 不再更新按钮文本为倒计时数字，保持"不要停 继续转"
    if (countdownValue > 0) {
        countdownValue -= 0.05; // 更快的更新频率，使1秒内的动画更平滑
        countdownTimer = setTimeout(updateCountdown, 50); // 更新间隔改为50毫秒
    } else {
        // 倒计时结束，立即停止旋转
        // 注意：在spinWheel函数中定义的currentRotation局部变量在外部不可见
        // 我们需要通过动画帧停止来获取最终角度
        if (isSpinning && spinAnimation) {
            cancelAnimationFrame(spinAnimation);
            stopWheel(currentAngle); // 使用全局变量currentAngle作为当前旋转角度
        }
        // 重置按钮状态
        resetButtonState();
    }
}

// 重置按钮状态函数
function resetButtonState() {
    // 保持按钮可见，将按钮文本恢复为"开始转动"
    spinBtn.textContent = '开始转动';
}

// 处理转动时的按钮点击事件
function handleSpinWhileSpinning() {
    if (!isSpinning) return;
    
    // 延长倒计时时间1秒
    countdownValue += 1;
    
    // 取消之前的定时器，重新开始倒计时
    if (countdownTimer) {
        clearTimeout(countdownTimer);
    }
    
    // 重新开始倒计时
    updateCountdown();
    
    // 添加爆炸粒子效果，提供视觉反馈
    createHeartExplosion();
    createSparkles();
    
    // 播放按钮点击音效
    try {
        buttonSound.currentTime = 0;
        playSound(buttonSound);
    } catch (e) {
        console.log("播放按钮音效失败:", e);
    }
}

// 旋转转盘
function spinWheel() {
    if (isSpinning) {
        // 如果正在转动，调用推迟暂停的函数
        handleSpinWhileSpinning();
        return;
    }
    
    // 移除中奖图片覆盖层（如果存在）
    const existingOverlay = document.getElementById('prizeImageOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // 解锁音频
    unlockAudio();
    
    // 播放按钮音效
    try {
        buttonSound.currentTime = 0;
        playSound(buttonSound);
    } catch (e) {
        console.log("播放按钮音效失败:", e);
    }
    
    isSpinning = true;
    // 转动时按钮文字改为"不要停 继续转"
    spinBtn.textContent = '加大火力';
    spinBtn.disabled = false; // 允许点击以推迟暂停
    // 保持按钮可见，不移动位置
    lastTickSection = -1;
    countdownValue = 1;
    
    // 开始倒计时，但不再显示倒计时数字
    updateCountdown();
    
    // 添加转盘发光效果
    wheelContainer.classList.add('spinning');
    
    // 切换中心图片为动态GIF
    switchToGif();
    
    // 播放旋转音效
    try {
        spinSound.currentTime = 0;
        spinSound.volume = 0.7;
        playSound(spinSound);
    } catch (e) {
        console.log("播放旋转音效失败:", e);
    }
    
    // 播放魔法音效
    try {
        magicSound.currentTime = 0;
        magicSound.volume = 0.8;
        playSound(magicSound);
    } catch (e) {
        console.log("播放魔法音效失败:", e);
    }
    
    // 创建漂浮爱心
    createFloatingHearts();
    
    // 使用改进的随机选择算法，避免最近重复的选择
    const targetSection = getNonRepeatingRandomSection();
    
    // 仍然保留lastSection的更新，以确保与现有代码的兼容性
    lastSection = targetSection;
    
    // 增加额外旋转圈数的随机性
    const extraRotations = 5 + Math.floor(Math.random() * 8); // 5-12圈的随机变化
    // 设置目标角度，让转盘旋转多圈后逐渐减速
    // 不再需要特殊调整，因为我们会在停止时根据实际角度计算分区
    const targetAngle = (targetSection * sectionAngle) + (extraRotations * 2 * Math.PI);
    
    // 生成1-100的随机数用于干预旋转参数
    const randomFactor = 1 + Math.floor(Math.random() * 100) / 1000; // 1.001-1.1之间的随机因子
    
    // 初始速度（添加随机干预）
    let speed = 0.15 + (Math.random() * 0.05); // 0.15-0.2之间随机
    let currentRotation = 0;
    const maxSpeed = 0.25 * randomFactor; // 最大速度添加随机干预
    const acceleration = 0.0015 * randomFactor; // 加速度添加随机干预
    let startTime = null;
    let isDecelerating = false;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // 加速阶段
        if (elapsed < 400 && speed < maxSpeed) {
            speed += acceleration;
        }
        
        // 匀速阶段 - 适应1秒总时长
    if (elapsed > 300 && elapsed < 700 && !isDecelerating) {
        speed = maxSpeed;
    }
    
    // 1秒后开始减速
    if (elapsed > 1000 && !isDecelerating) {
        isDecelerating = true;
        timer.style.display = 'none';
    }
        
        // 减速阶段（添加随机干预）
        if (isDecelerating) {
            // 生成0.95-0.97之间的随机减速系数
            const decelerationFactor = 0.95 + (Math.random() * 0.02);
            speed *= decelerationFactor;
            
            if (speed < 0.005) {
                speed = 0;
                // 传递最终的旋转角度给stopWheel函数，而不是目标分区
                stopWheel(currentRotation);
                return;
            }
        }
        
        currentRotation += speed;
        drawWheel(currentRotation);
        
        // 播放滴答声效
        const currentSection = getSectionFromAngle(currentRotation);
        if (currentSection !== lastTickSection && isDecelerating) {
            lastTickSection = currentSection;
            try {
                tickSound.currentTime = 0;
                tickSound.volume = 0.5;
                playSound(tickSound);
            } catch (e) {
                console.log("播放滴答音效失败:", e);
            }
        }
        
        if (speed > 0) {
            spinAnimation = requestAnimationFrame(animate);
        }
    }
    
    spinAnimation = requestAnimationFrame(animate);
}

// 根据转盘的当前旋转角度计算指针指向的分区
// 使用更简单直接的方法：指针在顶部，我们可以计算每个分区的中心线相对于指针位置的关系
function getSectionFromAngle(angle) {
    // 规范化角度到0到2π之间
    const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
    // 在Canvas坐标系中，0弧度指向右侧（3点钟方向），π/2指向下方
    // 根据用户反馈，指针样式朝向实际是底部，需要调整计算
    
    // 计算从3点钟方向到底部的偏移（顺时针方向为正）
    const pointerOffset = Math.PI / 2;
    
    // 计算当前旋转后的有效角度（考虑指针位置）
    const effectiveAngle = (normalizedAngle + pointerOffset) % (2 * Math.PI);
    
    // 由于Canvas坐标系中角度是顺时针增加的，我们需要取反使其符合数学上的逆时针增加
    const adjustedAngle = (2 * Math.PI - effectiveAngle) % (2 * Math.PI);
    
    // 计算当前角度对应的分区索引
    let sectionIndex = Math.floor(adjustedAngle / sectionAngle);
    
    // 确保分区索引在有效范围内
    sectionIndex = sectionIndex % totalSections;
    
    return sectionIndex;
}

// 停止转盘并显示结果
function stopWheel(finalRotationAngle) {
    if (!isSpinning) return;
    
    cancelAnimationFrame(spinAnimation);
    isSpinning = false;
    // 重置按钮状态
    spinBtn.disabled = false;
    
    // 移除转盘发光效果
    wheelContainer.classList.remove('spinning');
    
    // 顺时针旋转查找可用分区
    let currentRotation = finalRotationAngle;
    let actualSection = getSectionFromAngle(currentRotation);
    let attempts = 0;
    const maxAttempts = totalSections * 2; // 设置最大尝试次数，避免无限循环
    const rotationStep = (15 * Math.PI) / 180; // 5度转换为弧度
    
    // 记录初始分区
    const initialSection = actualSection;
    const initialSectionTitle = sectionData[initialSection] ? sectionData[initialSection].title : '未知';
    
    console.log(`初始停止分区: ${initialSection} (${initialSectionTitle}), 是否可用: ${isSectionAvailable(actualSection)}`);
    
    // 检查当前分区是否可用，如果不可用则顺时针旋转5度
    while (!isSectionAvailable(actualSection) && attempts < maxAttempts) {
        // 顺时针旋转5度
        currentRotation += rotationStep;
        // 重新计算当前分区
        actualSection = getSectionFromAngle(currentRotation);
        attempts++;
        
        console.log(`顺时针旋转5度后，当前分区: ${actualSection} (${sectionData[actualSection]?.title || '未知'}), 尝试次数: ${attempts}`);
    }
    
    const finalSectionTitle = sectionData[actualSection] ? sectionData[actualSection].title : '未知';
    console.log(`最终选择分区: ${actualSection} (${finalSectionTitle})`);
    
    // 获取中奖结果数据
    const result = sectionData[actualSection];
    
    // 记录选项出现（使用标题作为选项ID）
    if (result) {
        const optionId = result.title;
        // 检查是否已经达到一小时内的最大出现次数
        const currentCount = getOptionOccurrenceCount(optionId);
        recordOptionOccurrence(optionId);
        
        // 如果达到或超过限制，显示提示信息
        if (currentCount >= MAX_OCCURRENCES_PER_HOUR) {
            showLimitWarning(optionId);
        }
    }
    
    // 切换回静态图片
    switchToStatic();
    
    // 移除中奖图片覆盖层（如果存在）
    const existingOverlay = document.getElementById('prizeImageOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // 不再创建中奖图片覆盖层，保持显示原来的静态图片
    // 根据需求3：停止旋转时不使用卡片详情的封面进行展示
    
    // 重新绘制转盘，确保停在最终计算的角度位置
    drawWheel(currentRotation);
    
    // 停止旋转音效，播放胜利音效
    try {
        pauseSound(spinSound);
        winSound.currentTime = 0;
        winSound.volume = 0.8;
        playSound(winSound);
    } catch (e) {
        console.log("播放胜利音效失败:", e);
    }
    
    // 创建爱心爆炸和星星效果
    createHeartExplosion();
    createSparkles();
    
    // 立即显示结果模态框
    showResultModal(actualSection);
    spinBtn.disabled = false;
}

// 显示结果模态框 - 支持富文本
function showResultModal(data) {
    try {
        // 检查必要的DOM元素是否存在
        if (!resultModal || !prizeImage || !prizeTitle || !prizeDescription) {
            console.error('结果模态框必要元素未找到');
            return;
        }
        
        // 支持传入sectionIndex或直接传入结果对象
        const result = typeof data === 'number' ? (sectionData && sectionData[data]) : data;
        
        // 检查结果数据是否有效
        if (!result) {
            console.error('无效的结果数据:', data);
            return;
        }
        
        // 确保使用正确的图片属性
        prizeImage.src = result.imageUrl || result.image || '';
        prizeImage.alt = result.title || '奖品图片';
        
        // 设置标题和描述
        prizeTitle.textContent = result.title || '未设置标题';
        
        // 支持富文本内容，添加安全检查
        prizeDescription.innerHTML = result.description || '暂无描述';
        
        // 确保模态框显示
        resultModal.style.display = 'flex';
        resultModal.style.opacity = '0'; // 重置透明度以便动画效果
        
        // 强制重排以确保动画效果
        void resultModal.offsetWidth;
        
        // 添加动画类
        resultModal.classList.add('show');
        resultModal.style.opacity = '1';
        
        // 只有在传入sectionIndex时才保存到历史记录（避免从历史记录打开时重复保存）
        if (typeof data === 'number') {
            saveToHistory(result);
        }
    } catch (error) {
        console.error('显示结果模态框时出错:', error);
    }
}

// 绑定事件
function bindEvents() {
    // 确保DOM元素存在再绑定事件
    if (spinBtn) spinBtn.addEventListener('click', spinWheel);
    if (backBtn) backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    if (closeModal) closeModal.addEventListener('click', () => {
        if (resultModal) {
            resultModal.style.display = 'none';
            resultModal.classList.remove('show');
        }
    });
    
    if (resultModal) resultModal.addEventListener('click', (e) => {
        if (e.target === resultModal) {
            resultModal.style.display = 'none';
            resultModal.classList.remove('show');
        }
    });
    
    // 点击页面时解锁音频
    document.body.addEventListener('click', unlockAudio);
    document.body.addEventListener('touchstart', unlockAudio);
    
    // 添加历史记录相关事件监听器
    if (historyBtn) {
        historyBtn.removeEventListener('click', openHistoryModal); // 移除可能存在的旧监听器
        historyBtn.addEventListener('click', openHistoryModal);
    }
    
    if (closeHistoryModal) {
        closeHistoryModal.removeEventListener('click', closeHistoryModalHandler);
        closeHistoryModal.addEventListener('click', closeHistoryModalHandler);
    }
    
    if (clearHistoryBtn) {
        clearHistoryBtn.removeEventListener('click', clearHistory);
        clearHistoryBtn.addEventListener('click', clearHistory);
    }
    
    // 点击历史记录模态框外部关闭
    if (historyModal) {
        historyModal.addEventListener('click', function(e) {
            if (e.target === historyModal) {
                closeHistoryModalHandler();
            }
        });
    }
    
    // 所有选项按钮点击事件
    if (allOptionsBtn) {
        allOptionsBtn.removeEventListener('click', openAllOptionsModal); // 移除可能存在的旧监听器
        allOptionsBtn.addEventListener('click', openAllOptionsModal);
    }
    
    // 关闭所有选项弹窗
    if (closeAllOptionsModal) {
        closeAllOptionsModal.removeEventListener('click', closeAllOptionsModalHandler);
        closeAllOptionsModal.addEventListener('click', closeAllOptionsModalHandler);
    }
}

// 初始化应用
async function initializeApp() {
    const theme = getThemeFromUrl();
    
    // 异步加载主题数据
    await initializeTheme(theme);
    
    // 绑定事件
    bindEvents();
    
    // 绘制初始转盘（在initializeTheme中已经调用，这里可以移除重复调用）
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', initializeApp);