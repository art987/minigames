// JavaScript Document

// 全局变量
let currentQuoteIndex = 0;
let currentTypingAnimation = null;
let isSwitchingTheme = false;
let isAutoPlaying = true; // 新增：控制自动播放状态
let autoPlayTimeout = null; // 新增：存储自动播放的timeout
const urlParams = new URLSearchParams(window.location.search);
const seriesId = parseInt(urlParams.get('s'), 10) || 1;
let currentData = quotedata[seriesId] || quotedata[1];

// 初始化页面
function initPage() {
    document.getElementById('title').textContent = currentData.title;
    const quoteAuthorElement = document.getElementById('quote-author');

    // 设置背景
    const videoElement = document.getElementById('background-video');
    const imageElement = document.getElementById('background-image');
    
    if (currentData.background.video) {
        videoElement.src = currentData.background.video;
        videoElement.style.display = 'block';
        imageElement.style.display = 'none';
    } else if (currentData.background.image) {
        imageElement.src = currentData.background.image;
        imageElement.style.display = 'block';
        videoElement.style.display = 'none';
    }

    // 背景音乐控制
    const musicElement = document.getElementById('background-music');
    const audioSource = document.getElementById('audio-source');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    let isMuted = true;

    if (currentData.background.music) {
        audioSource.src = currentData.background.music;
        soundToggleBtn.innerHTML = "<b>♪</b>关闭背景音乐";
        musicElement.load();
        musicElement.pause();
    } else {
        musicElement.pause();
        soundToggleBtn.innerHTML = "<b>♪</b>开启声音";
    }

    soundToggleBtn.addEventListener('click', () => {
        if (currentData.background.music) {
            if (musicElement.paused) {
                musicElement.play();
                musicElement.muted = false;
                soundToggleBtn.innerHTML = "<b>♪</b>关闭背景音乐";
            } else {
                musicElement.pause();
                soundToggleBtn.innerHTML = "<b>♪</b>开启背景音乐";
            }
        } else {
            isMuted = !isMuted;
            videoElement.muted = isMuted;
            soundToggleBtn.innerHTML = isMuted ? "<b>♪</b>开启声音" : "<b>♪</b>关闭声音";
        }
    });

    // 添加控制按钮
    addControlButtons();
}

function addControlButtons() {
    const quoteContainer = document.getElementById('quote-container');
    
    if (!quoteContainer) {
        console.error("找不到 #quote-container 元素！");
        return;
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'quote-controls';
    buttonContainer.innerHTML = `
        <button id="prev-btn">上一句</button>
        <button id="pause-btn">暂停播放</button>
        <button id="copy-btn">复制句子</button>
        <button id="next-btn">下一句</button>
    `;
    
    quoteContainer.appendChild(buttonContainer);

    // 上一句按钮
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentQuoteIndex > 0) {
            currentQuoteIndex--;
            displayCurrentQuote();
        }
    });

    // 暂停/继续按钮
    const pauseBtn = document.getElementById('pause-btn');
    pauseBtn.addEventListener('click', () => {
        isAutoPlaying = !isAutoPlaying;
        pauseBtn.textContent = isAutoPlaying ? "暂停播放" : "继续播放";
        
        if (isAutoPlaying) {
            // 如果恢复自动播放，立即显示下一句
            if (currentQuoteIndex < currentData.quotes.length - 1) {
                currentQuoteIndex++;
                displayCurrentQuote();
            } else {
                // 如果是最后一句，尝试切换到下一组
                trySwitchToNextSeries();
            }
        } else {
            // 如果暂停，清除自动播放的timeout
            if (autoPlayTimeout) {
                clearTimeout(autoPlayTimeout);
                autoPlayTimeout = null;
            }
        }
    });

    // 复制句子按钮
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.addEventListener('click', () => {
        const quoteAuthorElement = document.getElementById('quote-author');
        const text = quoteAuthorElement.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = "√已复制";
            setTimeout(() => {
                copyBtn.textContent = "复制句子";
            }, 2800);
        });
    });

    // 下一句按钮
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentQuoteIndex < currentData.quotes.length - 1) {
            currentQuoteIndex++;
            displayCurrentQuote();
        } else {
            // 如果是最后一句，尝试切换到下一组
            trySwitchToNextSeries();
        }
    });
}

// 新增：尝试切换到下一组数据
function trySwitchToNextSeries() {
    const currentSeriesId = parseInt(Object.keys(quotedata).find(key => quotedata[key] === currentData));
    const nextSeriesId = currentSeriesId + 1;
    
    if (quotedata[nextSeriesId]) {
        // 如果有下一组，加载它
        loadThemeData(nextSeriesId);
    } else {
        // 如果没有下一组，回到第一组
        loadThemeData(1);
    }
}

function displayCurrentQuote() {
    const quoteAuthorElement = document.getElementById('quote-author');
    const { text, author } = currentData.quotes[currentQuoteIndex];
    
    if (currentTypingAnimation) {
        clearTimeout(currentTypingAnimation);
    }
    
    quoteAuthorElement.innerHTML = '';
    quoteAuthorElement.style.opacity = 1;
    
    // 打字效果，200ms是每个字符的间隔时间（可修改）
    typeText(text + " " + author, quoteAuthorElement);
    
    // 如果是自动播放状态，设置7秒后显示下一句（7000是可修改的停顿时间）
    if (isAutoPlaying) {
        if (autoPlayTimeout) {
            clearTimeout(autoPlayTimeout);
        }
        
        autoPlayTimeout = setTimeout(() => {
            if (currentQuoteIndex < currentData.quotes.length - 1) {
                currentQuoteIndex++;
                displayCurrentQuote();
            } else {
                // 如果是最后一句，尝试切换到下一组
                trySwitchToNextSeries();
            }
        }, 7000);
    }
}

// 打字效果函数
// 参数text: 要显示的文字
// 参数element: 显示文字的DOM元素
// 打字速度由200ms控制（可修改）
function typeText(text, element) {
    if (currentTypingAnimation) {
        clearTimeout(currentTypingAnimation);
    }
    
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = 1;

    function type() {
        if (i < text.length && !isSwitchingTheme) {
            element.innerHTML += text[i];
            i++;
            currentTypingAnimation = setTimeout(type, 200); // 200ms是每个字符的间隔时间
        }
    }

    type();
}

function loadThemeData(id) {
    isSwitchingTheme = true;
    
    if (currentTypingAnimation) {
        clearTimeout(currentTypingAnimation);
    }
    
    if (autoPlayTimeout) {
        clearTimeout(autoPlayTimeout);
        autoPlayTimeout = null;
    }
    
    const quoteAuthorElement = document.getElementById('quote-author');
    quoteAuthorElement.innerHTML = '';
    quoteAuthorElement.style.opacity = 0;
    
    setTimeout(() => {
        isSwitchingTheme = false;
        currentData = quotedata[id] || quotedata[1];
        currentQuoteIndex = 0;
        document.getElementById('title').textContent = currentData.title;
        
        const videoElement = document.getElementById('background-video');
        const imageElement = document.getElementById('background-image');
        
        if (currentData.background.video) {
            videoElement.src = currentData.background.video;
            videoElement.style.display = 'block';
            imageElement.style.display = 'none';
        } else if (currentData.background.image) {
            imageElement.src = currentData.background.image;
            imageElement.style.display = 'block';
            videoElement.style.display = 'none';
        }
        
        const musicElement = document.getElementById('background-music');
        const audioSource = document.getElementById('audio-source');
        const soundToggleBtn = document.getElementById('sound-toggle-btn');
        
        if (currentData.background.music) {
            audioSource.src = currentData.background.music;
            soundToggleBtn.innerHTML = "<b>♪</b>关闭背景音乐";
            musicElement.load();
            musicElement.play();
            musicElement.muted = false;
        } else {
            musicElement.pause();
            soundToggleBtn.innerHTML = "<b>♪</b>开启声音";
        }
        
        displayCurrentQuote();
    }, 2000); // 主题切换时的过渡时间2000ms（可修改）
}

function createThemeModal() {
    if (document.querySelector('.modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'theme-modal';
    
    modal.innerHTML = `
        <div class="theme-modal-header">
            <h3>选择主题</h3>
            <button class="close-btn">&times;</button>
        </div>
        <ul class="theme-list" id="theme-list"></ul>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    const themeList = document.getElementById('theme-list');
    for (const [id, data] of Object.entries(quotedata)) {
        const li = document.createElement('li');
        li.className = 'theme-item';
        li.textContent = data.title;
        li.dataset.id = id;
        themeList.appendChild(li);
        
        li.addEventListener('click', () => {
            loadThemeData(id);
            
            modal.classList.add('closing');
            overlay.style.animation = 'fadeOut 0.3s ease-out';
            
            setTimeout(() => {
                modal.remove();
                overlay.remove();
            }, 100);
        });
    }
    
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.classList.add('closing');
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        
        setTimeout(() => {
            modal.remove();
            overlay.remove();
            if (currentQuoteIndex === 0) {
                displayCurrentQuote();
            }
        }, 100);
    });
    
    overlay.addEventListener('click', () => {
        closeBtn.click();
    });
}

// 页面加载时自动弹出主题选择框
document.addEventListener('DOMContentLoaded', () => {
    initPage();
    createThemeModal();
});

// 保留原来的"更多主题"按钮功能
document.getElementById('theme-btn').addEventListener('click', createThemeModal);