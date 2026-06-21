/**
 * 名言名句展示应用 - 主脚本
 * @description 优化后的版本，包含管理器、错误处理和兼容性改进
 */

(function() {
    'use strict';

    // ==================== 管理器类 ====================

    /**
     * 定时器管理器
     * @description 统一管理所有定时器，避免内存泄漏
     */
    class TimerManager {
        constructor() {
            this.timers = new Map();
        }

        /**
         * 设置定时器
         * @param {string} id - 定时器ID
         * @param {Function} callback - 回调函数
         * @param {number} delay - 延迟时间（毫秒）
         * @returns {number} - 定时器ID
         */
        set(id, callback, delay) {
            // 如果已存在相同ID的定时器，先清除
            this.clear(id);
            
            const timerId = setTimeout(() => {
                try {
                    callback();
                } catch (error) {
                    console.error(`定时器 ${id} 执行错误:`, error);
                }
                // 执行完成后自动移除
                this.timers.delete(id);
            }, delay);
            
            this.timers.set(id, timerId);
            return timerId;
        }

        /**
         * 设置间隔定时器
         * @param {string} id - 定时器ID
         * @param {Function} callback - 回调函数
         * @param {number} interval - 间隔时间（毫秒）
         * @returns {number} - 定时器ID
         */
        setInterval(id, callback, interval) {
            // 如果已存在相同ID的定时器，先清除
            this.clearInterval(id);
            
            const timerId = setInterval(() => {
                try {
                    callback();
                } catch (error) {
                    console.error(`间隔定时器 ${id} 执行错误:`, error);
                }
            }, interval);
            
            this.timers.set(id, timerId);
            return timerId;
        }

        /**
         * 清除定时器
         * @param {string} id - 定时器ID
         */
        clear(id) {
            if (this.timers.has(id)) {
                clearTimeout(this.timers.get(id));
                this.timers.delete(id);
            }
        }

        /**
         * 清除间隔定时器
         * @param {string} id - 定时器ID
         */
        clearInterval(id) {
            if (this.timers.has(id)) {
                clearInterval(this.timers.get(id));
                this.timers.delete(id);
            }
        }

        /**
         * 清除所有定时器
         */
        clearAll() {
            this.timers.forEach((timerId, id) => {
                if (id.includes('interval')) {
                    clearInterval(timerId);
                } else {
                    clearTimeout(timerId);
                }
            });
            this.timers.clear();
        }
    }

    /**
     * 事件监听器管理器
     * @description 统一管理所有事件监听器，避免内存泄漏
     */
    class EventListenerManager {
        constructor() {
            this.listeners = new Map();
        }

        /**
         * 添加事件监听器
         * @param {Element} element - DOM元素
         * @param {string} event - 事件类型
         * @param {Function} callback - 回调函数
         * @param {Object} [options] - 事件选项
         */
        add(element, event, callback, options = {}) {
            if (!element) {
                console.warn('元素不存在，无法添加事件监听器');
                return;
            }

            const key = `${element.id || element.className || 'anonymous'}-${event}`;
            
            // 如果已存在相同的事件监听器，先移除
            this.remove(element, event);
            
            const wrappedCallback = (e) => {
                try {
                    callback(e);
                } catch (error) {
                    console.error(`事件监听器 ${event} 执行错误:`, error);
                }
            };
            
            element.addEventListener(event, wrappedCallback, options);
            this.listeners.set(key, { element, event, callback: wrappedCallback });
        }

        /**
         * 移除事件监听器
         * @param {Element} element - DOM元素
         * @param {string} event - 事件类型
         */
        remove(element, event) {
            if (!element) return;

            const key = `${element.id || element.className || 'anonymous'}-${event}`;
            
            if (this.listeners.has(key)) {
                const { callback } = this.listeners.get(key);
                element.removeEventListener(event, callback);
                this.listeners.delete(key);
            }
        }

        /**
         * 移除所有事件监听器
         */
        removeAll() {
            this.listeners.forEach(({ element, event, callback }) => {
                if (element) {
                    element.removeEventListener(event, callback);
                }
            });
            this.listeners.clear();
        }
    }

    /**
     * 媒体管理器
     * @description 统一管理视频、图片和音频
     */
    class MediaManager {
        constructor() {
            this.videoElement = null;
            this.imageElement = null;
            this.musicElement = null;
            this.audioSource = null;
        }

        /**
         * 初始化媒体元素
         */
        init() {
            this.videoElement = document.getElementById('background-video');
            this.imageElement = document.getElementById('background-image');
            this.musicElement = document.getElementById('background-music');
            this.audioSource = document.getElementById('audio-source');
        }

        /**
         * 设置背景
         * @param {Object} background - 背景配置
         */
        setBackground(background) {
            try {
                if (background.video) {
                    this.videoElement.src = background.video;
                    this.videoElement.style.display = 'block';
                    this.imageElement.style.display = 'none';
                    
                    // 处理视频自动播放失败
                    this.videoElement.play().catch(error => {
                        console.warn('视频自动播放失败，可能需要用户手动点击播放:', error);
                    });
                } else if (background.image) {
                    this.imageElement.src = background.image;
                    this.imageElement.style.display = 'block';
                    this.videoElement.style.display = 'none';
                }
            } catch (error) {
                console.error('设置背景失败:', error);
            }
        }

        /**
         * 设置背景音乐
         * @param {string} musicPath - 音乐文件路径
         * @returns {Promise<boolean>} - 是否成功播放
         */
        async setMusic(musicPath) {
            try {
                if (musicPath) {
                    this.audioSource.src = musicPath;
                    this.musicElement.load();
                    
                    // 尝试自动播放
                    try {
                        await this.musicElement.play();
                        return true;
                    } catch (error) {
                        console.warn('音乐自动播放失败，需要用户手动点击播放:', error);
                        return false;
                    }
                } else {
                    this.musicElement.pause();
                    return false;
                }
            } catch (error) {
                console.error('设置音乐失败:', error);
                return false;
            }
        }

        /**
         * 播放音乐
         * @returns {Promise<boolean>} - 是否成功播放
         */
        async playMusic() {
            try {
                await this.musicElement.play();
                this.musicElement.muted = false;
                return true;
            } catch (error) {
                console.warn('播放音乐失败:', error);
                return false;
            }
        }

        /**
         * 暂停音乐
         */
        pauseMusic() {
            try {
                this.musicElement.pause();
            } catch (error) {
                console.error('暂停音乐失败:', error);
            }
        }

        /**
         * 切换音乐播放状态
         * @returns {Promise<boolean>} - 是否正在播放
         */
        async toggleMusic() {
            if (this.musicElement.paused) {
                return await this.playMusic();
            } else {
                this.pauseMusic();
                return false;
            }
        }
    }

    /**
     * 复制管理器
     * @description 处理文本复制功能，包含兼容性处理
     */
    class CopyManager {
        /**
         * 复制文本到剪贴板
         * @param {string} text - 要复制的文本
         * @returns {Promise<boolean>} - 是否成功复制
         */
        async copyText(text) {
            try {
                // 优先使用现代 Clipboard API
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                    return true;
                }
                
                // Fallback: 使用 document.execCommand('copy')
                return this.fallbackCopy(text);
            } catch (error) {
                console.error('复制失败:', error);
                // 尝试 fallback 方法
                return this.fallbackCopy(text);
            }
        }

        /**
         * Fallback复制方法（兼容旧浏览器）
         * @param {string} text - 要复制的文本
         * @returns {boolean} - 是否成功复制
         */
        fallbackCopy(text) {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                textarea.style.top = '0';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                
                return successful;
            } catch (error) {
                console.error('Fallback复制失败:', error);
                return false;
            }
        }
    }

    // ==================== 应用主类 ====================

    /**
     * 名言名句应用
     * @description 主应用类，整合所有管理器
     */
    class QuoteApp {
        constructor() {
            // 管理器实例
            this.timerManager = new TimerManager();
            this.eventManager = new EventListenerManager();
            this.mediaManager = new MediaManager();
            this.copyManager = new CopyManager();

            // 应用状态
            this.currentQuoteIndex = 0;
            this.isSwitchingTheme = false;
            this.isAutoPlaying = true;
            this.currentData = null;

            // URL参数
            const urlParams = new URLSearchParams(window.location.search);
            const seriesId = parseInt(urlParams.get('s'), 10) || 1;
            this.currentData = window.getValidQuoteSeries(seriesId);
        }

        /**
         * 初始化应用
         */
        init() {
            try {
                // 初始化媒体管理器
                this.mediaManager.init();

                // 初始化页面
                this.initPage();

                // 添加页面卸载清理
                this.addCleanupHandler();
            } catch (error) {
                console.error('应用初始化失败:', error);
            }
        }

        /**
         * 初始化页面
         */
        initPage() {
            try {
                // 设置标题
                const titleElement = document.getElementById('title');
                if (titleElement) {
                    titleElement.textContent = this.currentData.title;
                }

                // 设置背景
                this.mediaManager.setBackground(this.currentData.background);

                // 设置背景音乐
                this.setupMusicControl();

                // 添加计数器
                this.addCounter();

                // 添加控制按钮
                this.addControlButtons();

                // 添加主题切换按钮事件
                this.setupThemeButtons();

                // 显示第一条名言
                this.displayCurrentQuote();
            } catch (error) {
                console.error('页面初始化失败:', error);
            }
        }

        /**
         * 设置音乐控制
         */
        async setupMusicControl() {
            const soundToggleBtn = document.getElementById('sound-toggle-btn');
            
            if (this.currentData.background.music) {
                const success = await this.mediaManager.setMusic(this.currentData.background.music);
                
                if (success) {
                    soundToggleBtn.innerHTML = "<b>♪</b>关闭背景音乐";
                } else {
                    soundToggleBtn.innerHTML = "<b>♪</b>开启背景音乐";
                }
            } else {
                soundToggleBtn.innerHTML = "<b>♪</b>开启声音";
            }

            // 添加事件监听器
            this.eventManager.add(soundToggleBtn, 'click', async () => {
                if (this.currentData.background.music) {
                    const isPlaying = await this.mediaManager.toggleMusic();
                    soundToggleBtn.innerHTML = isPlaying ? "<b>♪</b>关闭背景音乐" : "<b>♪</b>开启背景音乐";
                } else {
                    const videoElement = this.mediaManager.videoElement;
                    videoElement.muted = !videoElement.muted;
                    soundToggleBtn.innerHTML = videoElement.muted ? "<b>♪</b>开启声音" : "<b>♪</b>关闭声音";
                }
            });
        }

        /**
         * 添加计数器
         */
        addCounter() {
            const counterElement = document.createElement('div');
            counterElement.className = 'quote-counter';
            counterElement.id = 'quote-counter';
            document.getElementById('quote-container').appendChild(counterElement);
            this.updateCounter();
        }

        /**
         * 更新计数器
         */
        updateCounter() {
            const counterElement = document.getElementById('quote-counter');
            if (counterElement && this.currentData) {
                counterElement.textContent = `(${this.currentQuoteIndex + 1}/${this.currentData.quotes.length})`;
            }
        }

        /**
         * 添加控制按钮
         */
        addControlButtons() {
            const quoteContainer = document.getElementById('quote-container');
            
            if (!quoteContainer) {
                console.error("找不到 #quote-container 元素！");
                return;
            }

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'quote-controls';
            buttonContainer.innerHTML = `
                <button id="prev-theme-btn">⇚</button>
                <button id="prev-btn">➣</button>
                <button id="pause-btn">▌▌</button>
                <button id="copy-btn">复制</button>
                <button id="next-btn">➣</button>
                <button id="next-theme-btn">⇛</button>
            `;
            
            quoteContainer.appendChild(buttonContainer);

            // 上一句按钮
            this.eventManager.add(document.getElementById('prev-btn'), 'click', () => {
                if (this.currentQuoteIndex > 0) {
                    this.currentQuoteIndex--;
                    this.displayCurrentQuote();
                }
            });

            // 暂停/继续按钮
            const pauseBtn = document.getElementById('pause-btn');
            this.eventManager.add(pauseBtn, 'click', () => {
                this.isAutoPlaying = !this.isAutoPlaying;
                pauseBtn.textContent = this.isAutoPlaying ? "▌▌" : "▶";
                
                if (this.isAutoPlaying) {
                    this.playNext();
                } else {
                    this.timerManager.clear('autoPlay');
                }
            });

            // 复制句子按钮
            const copyBtn = document.getElementById('copy-btn');
            this.eventManager.add(copyBtn, 'click', async () => {
                const quoteAuthorElement = document.getElementById('quote-author');
                const text = quoteAuthorElement.textContent;
                
                const success = await this.copyManager.copyText(text);
                
                if (success) {
                    copyBtn.textContent = "√已复制";
                    this.timerManager.set('copyReset', () => {
                        copyBtn.textContent = "复制句子";
                    }, 2800);
                } else {
                    copyBtn.textContent = "复制失败";
                    this.timerManager.set('copyReset', () => {
                        copyBtn.textContent = "复制句子";
                    }, 2000);
                }
            });

            // 下一句按钮
            this.eventManager.add(document.getElementById('next-btn'), 'click', () => {
                this.playNext();
            });

            // 上一个主题按钮
            this.eventManager.add(document.getElementById('prev-theme-btn'), 'click', () => {
                const currentSeriesId = parseInt(Object.keys(window.quotedata).find(key => window.quotedata[key] === this.currentData));
                const prevSeriesId = currentSeriesId - 1;
                
                if (window.quotedata[prevSeriesId]) {
                    this.loadThemeData(prevSeriesId);
                } else {
                    const lastSeriesId = Math.max(...Object.keys(window.quotedata).map(Number));
                    this.loadThemeData(lastSeriesId);
                }
            });

            // 下一个主题按钮
            this.eventManager.add(document.getElementById('next-theme-btn'), 'click', () => {
                const currentSeriesId = parseInt(Object.keys(window.quotedata).find(key => window.quotedata[key] === this.currentData));
                const nextSeriesId = currentSeriesId + 1;
                
                if (window.quotedata[nextSeriesId]) {
                    this.loadThemeData(nextSeriesId);
                } else {
                    this.loadThemeData(1);
                }
            });
        }

        /**
         * 设置主题切换按钮
         */
        setupThemeButtons() {
            // 更多主题按钮
            this.eventManager.add(document.getElementById('theme-btn'), 'click', () => {
                this.createThemeModal();
            });

            // 隐藏控制按钮
            const hideControlsBtn = document.getElementById('hide-controls-btn');
            this.eventManager.add(hideControlsBtn, 'click', () => {
                const quoteContainer = document.getElementById('quote-container');
                quoteContainer.classList.toggle('controls-hidden');
                
                if (quoteContainer.classList.contains('controls-hidden')) {
                    hideControlsBtn.textContent = '◉';
                    hideControlsBtn.title = '显示控制按钮';
                } else {
                    hideControlsBtn.textContent = '◉';
                    hideControlsBtn.title = '隐藏控制按钮';
                }
            });
        }

        /**
         * 显示当前名言
         */
        displayCurrentQuote() {
            try {
                const quoteAuthorElement = document.getElementById('quote-author');
                const { text, author } = this.currentData.quotes[this.currentQuoteIndex];
                
                // 清除之前的打字动画
                this.timerManager.clear('typing');
                
                quoteAuthorElement.innerHTML = '';
                quoteAuthorElement.style.opacity = 1;
                
                // 打字效果（先显示名言内容，完成后添加作者）
                this.typeTextWithAuthor(text, author, quoteAuthorElement);
                
                // 更新计数器
                this.updateCounter();
                
                // 设置自动播放
                if (this.isAutoPlaying) {
                    this.timerManager.clear('autoPlay');
                    this.timerManager.set('autoPlay', () => {
                        this.playNext();
                    }, 10000);
                }
            } catch (error) {
                console.error('显示名言失败:', error);
            }
        }

        /**
         * 打字效果（带作者）
         * @param {string} text - 名言内容
         * @param {string} author - 作者信息
         * @param {Element} element - 显示文字的DOM元素
         */
        typeTextWithAuthor(text, author, element) {
            let i = 0;
            element.innerHTML = '';
            element.style.opacity = 1;

            const type = () => {
                if (i < text.length && !this.isSwitchingTheme) {
                    element.innerHTML = text.substring(0, i + 1);
                    i++;
                    this.timerManager.set('typing', type, 200);
                } else if (i >= text.length && author) {
                    // 打字完成后添加作者
                    element.innerHTML = `${text} <span class="author">${author}</span>`;
                }
            };

            type();
        }

        /**
         * 打字效果
         * @param {string} text - 要显示的文字
         * @param {Element} element - 显示文字的DOM元素
         */
        typeText(text, element) {
            let i = 0;
            element.innerHTML = '';
            element.style.opacity = 1;

            const type = () => {
                if (i < text.length && !this.isSwitchingTheme) {
                    element.innerHTML += text[i];
                    i++;
                    this.timerManager.set('typing', type, 200);
                }
            };

            type();
        }

        /**
         * 播放下一句
         */
        playNext() {
            if (this.currentQuoteIndex < this.currentData.quotes.length - 1) {
                this.currentQuoteIndex++;
                this.displayCurrentQuote();
            } else {
                this.trySwitchToNextSeries();
            }
        }

        /**
         * 尝试切换到下一组数据
         */
        trySwitchToNextSeries() {
            const currentSeriesId = parseInt(Object.keys(window.quotedata).find(key => window.quotedata[key] === this.currentData));
            const nextSeriesId = currentSeriesId + 1;
            
            if (window.quotedata[nextSeriesId]) {
                this.loadThemeData(nextSeriesId);
            } else {
                this.loadThemeData(1);
            }
        }

        /**
         * 加载主题数据
         * @param {number} id - 主题ID
         */
        async loadThemeData(id) {
            this.isSwitchingTheme = true;
            
            // 清除所有定时器
            this.timerManager.clearAll();
            
            const quoteAuthorElement = document.getElementById('quote-author');
            quoteAuthorElement.innerHTML = '';
            quoteAuthorElement.style.opacity = 0;
            
            this.timerManager.set('themeSwitch', async () => {
                this.isSwitchingTheme = false;
                this.currentData = window.getValidQuoteSeries(id);
                this.currentQuoteIndex = 0;
                
                // 设置标题
                document.getElementById('title').textContent = this.currentData.title;
                
                // 设置背景
                this.mediaManager.setBackground(this.currentData.background);
                
                // 设置音乐
                await this.setupMusicControl();
                
                // 显示第一条名言
                this.displayCurrentQuote();
            }, 2000);
        }

        /**
         * 创建主题选择弹窗
         */
        createThemeModal() {
            // 如果已存在弹窗，直接返回
            if (document.querySelector('.modal-overlay')) return;

            try {
                const overlay = document.createElement('div');
                overlay.className = 'modal-overlay';
                
                const modal = document.createElement('div');
                modal.className = 'theme-modal';
                
                modal.innerHTML = `
                    <div class="theme-modal-header">
                        <h3>请选择主题：</h3>
                        <button class="close-btn">&times;</button>
                    </div>
                    <ul class="theme-list" id="theme-list"></ul>
                `;
                
                document.body.appendChild(overlay);
                document.body.appendChild(modal);
                
                const themeList = document.getElementById('theme-list');
                
                // 定义默认emoji映射
                const defaultEmojis = {
                    1: '🎯',
                    2: '🌈',
                    3: '💪',
                    4: '💡',
                    5: '🌻',
                    6: '⭐',
                    7: '🌸',
                    8: '🎨',
                    9: '📚',
                    10: '🌟'
                };
                
                for (const [id, data] of Object.entries(window.quotedata)) {
                    const li = document.createElement('li');
                    li.className = 'theme-item';
                    li.dataset.id = id;
                    
                    // 创建emoji图标
                    const emojiDiv = document.createElement('div');
                    emojiDiv.className = 'theme-item-emoji';
                    emojiDiv.textContent = data.emoji || defaultEmojis[id] || '✨';
                    li.appendChild(emojiDiv);
                    
                    // 创建标题
                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'theme-item-title';
                    titleDiv.textContent = data.title;
                    
                    li.appendChild(titleDiv);
                    themeList.appendChild(li);
                    
                    this.eventManager.add(li, 'click', () => {
                        this.loadThemeData(id);
                        this.closeModal(modal, overlay);
                    });
                }
                
                const closeBtn = modal.querySelector('.close-btn');
                this.eventManager.add(closeBtn, 'click', () => {
                    this.closeModal(modal, overlay);
                    if (this.currentQuoteIndex === 0) {
                        this.displayCurrentQuote();
                    }
                });
                
                this.eventManager.add(overlay, 'click', () => {
                    closeBtn.click();
                });
            } catch (error) {
                console.error('创建主题弹窗失败:', error);
            }
        }

        /**
         * 关闭弹窗
         * @param {Element} modal - 弹窗元素
         * @param {Element} overlay - 覆盖层元素
         */
        closeModal(modal, overlay) {
            modal.classList.add('closing');
            overlay.style.animation = 'fadeOut 0.3s ease-out';
            
            this.timerManager.set('modalClose', () => {
                modal.remove();
                overlay.remove();
            }, 100);
        }

        /**
         * 添加页面卸载清理
         */
        addCleanupHandler() {
            // 页面卸载时清理所有资源
            window.addEventListener('beforeunload', () => {
                this.cleanup();
            });

            // 页面隐藏时暂停
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.timerManager.clear('autoPlay');
                    this.mediaManager.pauseMusic();
                } else if (this.isAutoPlaying) {
                    this.displayCurrentQuote();
                }
            });
        }

        /**
         * 清理资源
         */
        cleanup() {
            this.timerManager.clearAll();
            this.eventManager.removeAll();
            this.mediaManager.pauseMusic();
        }
    }

    // ==================== 应用初始化 ====================

    // 创建应用实例
    const app = new QuoteApp();

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', () => {
        app.init();
    });

    // 导出应用实例供外部使用（可选）
    window.quoteApp = app;
})();