// 全局变量存储当前主题数据
let currentThemeData = null;

// 支持的主题列表
const supportedThemes = ['romantic', 'food', 'travel'];

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
const wheelContainer = document.getElementById('wheelContainer');
const timer = document.getElementById('timer');
const countdown = document.getElementById('countdown');
const frameOrnaments = document.getElementById('frameOrnaments');
const centerImage = document.getElementById('centerImage');
const centerStaticImg = document.getElementById('centerStaticImg');
const centerGifImg = document.getElementById('centerGifImg');
const themeTitle = document.getElementById('themeTitle');
const themeSubtitle = document.getElementById('themeSubtitle');
const pageTitle = document.getElementById('pageTitle');

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
        centerStaticImg.src = config.centerImage;
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
    // 清空现有装饰
    frameOrnaments.innerHTML = '';
    
    const ornamentCount = 12;
    for (let i = 0; i < ornamentCount; i++) {
        const ornament = document.createElement('div');
        ornament.className = 'ornament';
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
        const lineFrequency = totalSections > 100 ? 10 : (totalSections > 20 ? 5 : 1);
        if (i % lineFrequency === 0) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(startAngle) * radius, Math.sin(startAngle) * radius);
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        
        // 为每个分区显示选项title
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
        
        // 截断过长的文本
        let displayText = title;
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
        
        // 将标题绘制在分区中心，确保离边缘有20像素距离
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

// 切换中心图片为动态GIF
function switchToGif() {
    centerStaticImg.style.display = 'none';
    centerGifImg.style.display = 'block';
    centerImage.classList.add('spinning');
}

// 切换中心图片为静态图片
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
        sparkle.style.color = `hsl(${Math.random() * 60 + 40}, 100%, 60%)`;
        
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

// 更新倒计时显示
function updateCountdown() {
    countdown.textContent = countdownValue;
    if (countdownValue > 0) {
        countdownValue--;
        setTimeout(updateCountdown, 1000);
    }
}

// 旋转转盘
function spinWheel() {
    if (isSpinning) return;
    
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
    spinBtn.disabled = true;
    lastTickSection = -1;
    countdownValue = 5;
    
    // 显示倒计时
    timer.style.display = 'block';
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
    
    // 随机选择目标分区
    const targetSection = Math.floor(Math.random() * totalSections);
    const extraRotations = 5 + Math.floor(Math.random() * 5);
    // 调整目标角度以补偿指针位置，确保停止时指针指向分区中心
    // 减去sectionAngle/2来让指针指向分区中心而不是分区边界
    const targetAngle = (targetSection * sectionAngle) - (sectionAngle / 2) + (extraRotations * 2 * Math.PI);
    
    // 初始速度
    let speed = 0.15;
    let currentRotation = 0;
    const maxSpeed = 0.25;
    const acceleration = 0.0015;
    let startTime = null;
    let isDecelerating = false;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // 加速阶段
        if (elapsed < 1500 && speed < maxSpeed) {
            speed += acceleration;
        }
        
        // 匀速阶段
        if (elapsed > 1500 && elapsed < 3000 && !isDecelerating) {
            speed = maxSpeed;
        }
        
        // 5秒后开始减速
        if (elapsed > 5000 && !isDecelerating) {
            isDecelerating = true;
            timer.style.display = 'none';
        }
        
        // 减速阶段
        if (isDecelerating) {
            speed *= 0.96;
            
            if (speed < 0.005) {
                speed = 0;
                stopWheel(targetSection);
                return;
            }
        }
        
        currentRotation += speed;
        drawWheel(currentRotation);
        
        // 播放滴答声效
        const currentSection = Math.floor((currentRotation % (2 * Math.PI)) / sectionAngle);
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

// 停止转盘并显示结果
function stopWheel(targetSection) {
    if (!isSpinning) return;
    
    cancelAnimationFrame(spinAnimation);
    isSpinning = false;
    
    // 移除转盘发光效果
    wheelContainer.classList.remove('spinning');
    
    // 切换中心图片为静态图片
    switchToStatic();
    
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
    
    // 调整目标分区以确保与指针位置正确对齐
    // 考虑指针位于顶部，需要调整分区索引以匹配指针位置
    const adjustedSection = (targetSection + Math.floor(totalSections / 4)) % totalSections;
    
    // 显示结果模态框
    setTimeout(() => {
        showResultModal(adjustedSection);
        spinBtn.disabled = false;
    }, 1500);
}

// 显示结果模态框 - 支持富文本
function showResultModal(sectionIndex) {
    const result = sectionData[sectionIndex];
    
    prizeImage.src = result.imageUrl;
    prizeTitle.textContent = result.title;
    
    // 支持富文本内容
    prizeDescription.innerHTML = result.description; // 使用innerHTML代替textContent以支持富文本
    
    resultModal.style.display = 'flex';
    resultModal.classList.add('show');
}

// 绑定事件
function bindEvents() {
    spinBtn.addEventListener('click', spinWheel);
    
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    closeModal.addEventListener('click', () => {
        resultModal.style.display = 'none';
        resultModal.classList.remove('show');
    });
    
    resultModal.addEventListener('click', (e) => {
        if (e.target === resultModal) {
            resultModal.style.display = 'none';
            resultModal.classList.remove('show');
        }
    });
    
    // 点击页面时解锁音频
    document.body.addEventListener('click', unlockAudio);
    document.body.addEventListener('touchstart', unlockAudio);
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