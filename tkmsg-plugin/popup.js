// 发送队列管理
let sendQueue = [];
let isSending = false;
let isPaused = false;
let currentIndex = 0;

// DOM元素
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const usernamesTextarea = document.getElementById('usernames');
const messageTextarea = document.getElementById('message');
const delayInput = document.getElementById('delay');
const statusDiv = document.getElementById('status');

// 事件监听器
startBtn.addEventListener('click', startSending);
pauseBtn.addEventListener('click', togglePause);
stopBtn.addEventListener('click', stopSending);

// 初始化
function init() {
    // 从存储中加载设置
    chrome.storage.sync.get(['message', 'delay'], (result) => {
        if (result.message) messageTextarea.value = result.message;
        if (result.delay) delayInput.value = result.delay;
    });
}

// 开始发送消息
function startSending() {
    const usernames = usernamesTextarea.value.trim().split('\n').filter(username => username.trim());
    const message = messageTextarea.value.trim();
    const delay = parseInt(delayInput.value) || 5;
    
    // 验证输入
    if (usernames.length === 0) {
        updateStatus('请输入至少一个用户名', 'error');
        return;
    }
    
    if (message === '') {
        updateStatus('请输入要发送的消息', 'error');
        return;
    }
    
    // 保存设置
    chrome.storage.sync.set({ message, delay });
    
    // 准备发送队列
    sendQueue = usernames;
    currentIndex = 0;
    isSending = true;
    isPaused = false;
    
    // 更新UI状态
    updateUI(true);
    updateStatus(`开始发送到 ${sendQueue.length} 个用户`, 'success');
    
    // 开始发送过程
    processQueue(message, delay);
}

// 查找已存在的标签页
async function findExistingTab(baseUrl) {
    try {
        // 查找任何TikTok标签页，而不仅仅是完全匹配的URL
        const tabs = await chrome.tabs.query({
            url: [
                'https://www.tiktok.com/messages?*',  // 匹配任何对话页面
                'https://www.tiktok.com/*'  // 匹配任何TikTok页面
            ]
        });
        
        // 如果有匹配的标签页，返回第一个
        return tabs.length > 0 ? tabs[0] : null;
    } catch (error) {
        console.error('查找标签页时出错:', error);
        return null;
    }
}

// 等待页面加载完成
async function waitForPageLoad(tabId) {
    return new Promise((resolve) => {
        let timeoutId;
        
        // 监听标签页状态变化
        const onUpdated = (id, changeInfo) => {
            if (id === tabId && changeInfo.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(onUpdated);
                if (timeoutId) clearTimeout(timeoutId);
                resolve();
            }
        };
        
        chrome.tabs.onUpdated.addListener(onUpdated);
        
        // 设置超时以防页面加载时间过长
        timeoutId = setTimeout(() => {
            chrome.tabs.onUpdated.removeListener(onUpdated);
            resolve();
        }, 10000); // 10秒超时
    });
}

// 处理发送队列
async function processQueue(message, delay) {
    if (!isSending || isPaused) return;
    
    if (currentIndex >= sendQueue.length) {
        // 发送完成
        updateStatus('所有消息发送完成', 'success');
        updateUI(false);
        isSending = false;
        return;
    }
    
    const username = sendQueue[currentIndex];
    updateStatus(`正在发送到 ${username} (${currentIndex + 1}/${sendQueue.length})`);
    
    try {
        // 打开用户页面并发送消息
        await openUserAndSendMessage(username, message, 2000);
        currentIndex++;
        
        // 延迟后继续处理下一个用户
        setTimeout(() => {
            processQueue(message, delay);
        }, delay * 1000);
        
    } catch (error) {
        updateStatus(`发送到 ${username} 失败: ${error.message}`, 'error');
        currentIndex++;
        
        // 失败后继续处理下一个用户
        setTimeout(() => {
            processQueue(message, delay);
        }, delay * 1000);
    }
}

// 打开用户页面并发送消息
async function openUserAndSendMessage(userId, message, delayBetweenSteps = 2000) {
    try {
        // 更新状态显示
        updateStatus(`正在打开用户ID ${userId} 的对话页面...`);
        
        // 使用用户ID构建对话页面URL
        const url = `https://www.tiktok.com/messages?lang=zh-Hans&u=${userId}`;
        
        // 检查是否有已打开的TikTok对话标签页
        let tab = await findExistingTab(url);
        
        if (tab) {
            // 切换到现有标签页
            await chrome.tabs.update(tab.id, { active: true });
            updateStatus(`切换到用户ID ${userId} 的现有对话标签页...`);
        } else {
            // 打开新标签页
            tab = await chrome.tabs.create({ url, active: true });
            updateStatus(`打开用户ID ${userId} 的新对话标签页...`);
        }
        
        // 等待页面加载
        await waitForPageLoad(tab.id);
        updateStatus(`页面加载完成，准备发送消息...`);
        
        // 检查是否是对话页面
        const conversationCheck = await chrome.tabs.sendMessage(tab.id, {
            action: 'checkConversationPage'
        });
        
        if (conversationCheck && !conversationCheck.isConversationPage) {
            throw new Error('当前页面不是TikTok对话页面');
        }
        
        // 注入并执行发送消息函数
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: sendMessageInConversationPage,
            args: [message, delayBetweenSteps]
        });
        
        updateStatus(`消息已成功发送给用户ID ${userId}`);
        return { success: true, userId };
    } catch (error) {
        console.error(`发送消息给用户ID ${userId} 失败:`, error);
        updateStatus(`发送消息失败: ${error.message}`, true);
        return { success: false, userId, error: error.message };
    }
}

// 检查元素是否在视口中可见
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.width > 0 &&
        rect.height > 0
    );
}

// 在对话页面中执行发送消息的函数
function sendMessageInConversationPage(message, delayBetweenSteps = 2000) {
    return new Promise((resolve, reject) => {
        try {
            console.log('在对话页面中尝试发送消息:', message);
            
            // 等待DOM加载完成
            if (document.readyState !== 'complete') {
                return reject(new Error('页面尚未完全加载'));
            }
            
            // 检查当前URL是否为对话页面
            if (!window.location.href.includes('/messages?')) {
                return reject(new Error('当前页面不是TikTok对话页面'));
            }
            
            // 等待额外时间确保页面元素加载完成
            setTimeout(() => {
                try {
                    // 尝试找到输入框 - 多种选择器以增加兼容性
                    let messageInput = null;
                    const inputSelectors = [
                        'textarea[placeholder*="发送消息"]',
                        'textarea[placeholder*="Send a message"]',
                        '[data-e2e="message-input"]',
                        '.tiktok-msgbox-input-area',
                        'textarea[role="textbox"]',
                        '.message-input'
                    ];
                    
                    // 尝试每个选择器
                    for (const selector of inputSelectors) {
                        messageInput = document.querySelector(selector);
                        if (messageInput) break;
                    }
                    
                    if (!messageInput) {
                        throw new Error('未找到消息输入框');
                    }
                    
                    // 尝试找到发送按钮 - 多种选择器以增加兼容性
                    let sendButton = null;
                    const buttonSelectors = [
                        '[data-e2e="send-button"]',
                        '.tiktok-msgbox-send-btn',
                        '.send-button',
                        'button[aria-label*="发送"]',
                        'button[aria-label*="Send"]'
                    ];
                    
                    // 尝试每个选择器
                    for (const selector of buttonSelectors) {
                        sendButton = document.querySelector(selector);
                        if (sendButton) break;
                    }
                    
                    if (!sendButton) {
                        throw new Error('未找到发送按钮');
                    }
                    
                    // 检查输入框和按钮在页面右下方 - 验证位置
                    const inputRect = messageInput.getBoundingClientRect();
                    const buttonRect = sendButton.getBoundingClientRect();
                    
                    // 检查元素是否在可视区域的右下方
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const isInBottomRight = (
                        inputRect.left > viewportWidth * 0.5 &&
                        inputRect.top > viewportHeight * 0.5 &&
                        buttonRect.left > viewportWidth * 0.5 &&
                        buttonRect.top > viewportHeight * 0.5
                    );
                    
                    if (!isInBottomRight) {
                        console.warn('输入框和按钮可能不在预期的右下方位置，但仍尝试发送');
                        // 继续执行，即使位置不符合预期
                    }
                    
                    // 设置输入框内容并模拟真实用户输入
                    function setNativeValue(element, value) {
                        // 首先聚焦元素
                        element.focus();
                        
                        // 使用不同方法设置值
                        try {
                            // 方法1: 使用setSelectionRange和输入事件
                            element.value = value;
                            
                            // 触发所有必要的事件以模拟真实输入
                            element.dispatchEvent(new Event('input', { bubbles: true }));
                            element.dispatchEvent(new Event('change', { bubbles: true }));
                            element.dispatchEvent(new Event('keydown', { bubbles: true }));
                            element.dispatchEvent(new Event('keyup', { bubbles: true }));
                            element.dispatchEvent(new Event('blur', { bubbles: true }));
                            element.dispatchEvent(new Event('focus', { bubbles: true }));
                        } catch (e) {
                            console.warn('方法1设置值失败，尝试替代方法');
                            
                            // 方法2: 尝试通过原型链设置值
                            const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
                            const prototype = Object.getPrototypeOf(element);
                            const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
                            
                            if (valueSetter && valueSetter !== prototypeValueSetter) {
                                prototypeValueSetter.call(element, value);
                            } else if (valueSetter) {
                                valueSetter.call(element, value);
                            }
                            
                            // 再次触发事件
                            element.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    }
                    
                    // 等待一小段时间
                    setTimeout(() => {
                        // 设置输入框内容
                        setNativeValue(messageInput, message);
                        
                        console.log('已设置输入框内容');
                        
                        // 等待一段时间后尝试点击发送按钮
                        setTimeout(() => {
                            // 检查发送按钮是否可用
                            if (sendButton.disabled || sendButton.style.display === 'none' || sendButton.style.visibility === 'hidden') {
                                return reject(new Error('发送按钮不可用'));
                            }
                            
                            // 确保按钮可见且在视口中
                            if (!isElementVisible(sendButton)) {
                                return reject(new Error('发送按钮不可见'));
                            }
                            
                            // 尝试直接点击和编程式点击相结合
                            try {
                                // 模拟鼠标移动和点击
                                const rect = sendButton.getBoundingClientRect();
                                const x = rect.left + rect.width / 2;
                                const y = rect.top + rect.height / 2;
                                
                                // 模拟鼠标移动
                                sendButton.dispatchEvent(new MouseEvent('mousemove', { 
                                    bubbles: true, 
                                    cancelable: true,
                                    clientX: x,
                                    clientY: y
                                }));
                                
                                // 模拟鼠标按下
                                sendButton.dispatchEvent(new MouseEvent('mousedown', { 
                                    bubbles: true, 
                                    cancelable: true,
                                    clientX: x,
                                    clientY: y
                                }));
                                
                                // 模拟鼠标点击
                                sendButton.click();
                                
                                // 模拟鼠标释放
                                sendButton.dispatchEvent(new MouseEvent('mouseup', { 
                                    bubbles: true, 
                                    cancelable: true,
                                    clientX: x,
                                    clientY: y
                                }));
                                
                                console.log('已点击发送按钮');
                                
                                // 等待消息发送完成
                                setTimeout(() => {
                                    resolve({ success: true, message: '消息已成功发送' });
                                }, delayBetweenSteps);
                            } catch (clickError) {
                                console.error('点击发送按钮时出错:', clickError);
                                reject(new Error(`点击发送按钮失败: ${clickError.message}`));
                            }
                        }, delayBetweenSteps);
                    }, delayBetweenSteps);
                } catch (error) {
                    reject(error);
                }
            }, delayBetweenSteps); // 额外的初始延迟
        } catch (error) {
            reject(error);
        }
    });
}

// 暂停/恢复发送
function togglePause() {
    isPaused = !isPaused;
    
    if (isPaused) {
        pauseBtn.textContent = '继续';
        updateStatus('发送已暂停', 'warning');
    } else {
        pauseBtn.textContent = '暂停';
        updateStatus(`继续发送 (${currentIndex + 1}/${sendQueue.length})`);
        
        // 继续处理队列
        const delay = parseInt(delayInput.value) || 5;
        processQueue(messageTextarea.value.trim(), delay);
    }
}

// 停止发送
function stopSending() {
    isSending = false;
    isPaused = false;
    updateUI(false);
    updateStatus('发送已停止', 'info');
}

// 更新UI状态
function updateUI(isActive) {
    startBtn.disabled = isActive;
    pauseBtn.disabled = !isActive;
    stopBtn.disabled = !isActive;
    usernamesTextarea.disabled = isActive;
    messageTextarea.disabled = isActive;
    delayInput.disabled = isActive;
}

// 更新状态信息
function updateStatus(message, type = 'info') {
    statusDiv.textContent = message;
    
    // 设置状态颜色
    statusDiv.style.color = {
        'success': '#28a745',
        'error': '#dc3545', 
        'warning': '#ffc107',
        'info': '#666'
    }[type];
}

// 初始化
init();