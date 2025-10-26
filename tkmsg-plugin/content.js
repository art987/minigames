// TikTok消息助手 - 内容脚本

// 安全包装器，避免与页面脚本冲突
(() => {
    console.log('TikTok对话页面消息助手内容脚本已加载');
    
    // 向页面注入发送消息的功能函数
    function injectSendMessageFunction() {
        if (!window.__tiktokMessageHelperInjected) {
            // 创建一个安全的函数注入方式
            const script = document.createElement('script');
            script.textContent = `
                window.__tiktokMessageHelper = {
                    // 在对话页面中直接发送消息
                    sendMessageInConversation: function(message) {
                        return new Promise((resolve, reject) => {
                            try {
                                console.log('开始在对话页面发送消息');
                                
                                // 等待一小段时间确保页面完全加载
                                setTimeout(() => {
                                    try {
                                        // 查找右下方的消息输入框 - 使用多种选择器确保兼容性
                                        let messageInput = null;
                                        const inputSelectors = [
                                            'textarea[placeholder*="发送消息"]',
                                            'textarea[placeholder*="Message"]',
                                            '.message-input textarea',
                                            '[data-e2e="message-input"]',
                                            '[data-testid="message-input"]'
                                        ];
                                        
                                        // 尝试所有选择器直到找到输入框
                                        for (const selector of inputSelectors) {
                                            messageInput = document.querySelector(selector);
                                            if (messageInput) {
                                                console.log('找到消息输入框:', messageInput);
                                                break;
                                            }
                                        }
                                        
                                        // 如果仍未找到，尝试更通用的查找方法
                                        if (!messageInput) {
                                            const textareas = document.querySelectorAll('textarea');
                                            for (let textarea of textareas) {
                                                // 检查textarea是否可见且可能是消息输入框
                                                const style = window.getComputedStyle(textarea);
                                                if (style.display !== 'none' && 
                                                    style.visibility !== 'hidden' &&
                                                    textarea.offsetParent !== null &&
                                                    textarea.type !== 'hidden') {
                                                    // 检查是否在页面底部（右下方区域）
                                                    const rect = textarea.getBoundingClientRect();
                                                    const viewportHeight = window.innerHeight;
                                                    
                                                    // 如果textarea位于视口下半部分，则认为它可能是消息输入框
                                                    if (rect.top > viewportHeight / 2) {
                                                        messageInput = textarea;
                                                        console.log('通过位置检测找到可能的消息输入框:', messageInput);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        
                                        if (!messageInput) {
                                            reject(new Error('未找到消息输入框'));
                                            return;
                                        }
                                        
                                        // 聚焦并输入消息内容
                                        messageInput.focus();
                                        messageInput.value = message;
                                        
                                        // 触发必要的事件以确保输入被检测到
                                        const events = ['input', 'change', 'keydown', 'keyup'];
                                        events.forEach(eventType => {
                                            messageInput.dispatchEvent(new Event(eventType, {
                                                bubbles: true,
                                                cancelable: true
                                            }));
                                        });
                                        
                                        // 使用InputEvent以更真实地模拟用户输入
                                        const inputEvent = new InputEvent('input', {
                                            bubbles: true,
                                            cancelable: true,
                                            data: message
                                        });
                                        messageInput.dispatchEvent(inputEvent);
                                        
                                        // 等待输入被处理
                                        setTimeout(() => {
                                            try {
                                                // 查找发送按钮 - 使用多种选择器确保兼容性
                                                let sendButton = null;
                                                const buttonSelectors = [
                                                    '[data-e2e="send-button"]',
                                                    'button:has(svg[aria-label="发送"])',
                                                    '[data-testid="send-button"]',
                                                    '.send-button'
                                                ];
                                                
                                                // 尝试所有选择器直到找到发送按钮
                                                for (const selector of buttonSelectors) {
                                                    // 对于特殊选择器需要适当处理
                                                    if (selector.includes(':has')) {
                                                        const buttons = document.querySelectorAll('button');
                                                        for (let btn of buttons) {
                                                            if (btn.querySelector('svg[aria-label="发送"]')) {
                                                                sendButton = btn;
                                                                break;
                                                            }
                                                        }
                                                    } else {
                                                        sendButton = document.querySelector(selector);
                                                    }
                                                    
                                                    if (sendButton) {
                                                        console.log('找到发送按钮:', sendButton);
                                                        break;
                                                    }
                                                }
                                                
                                                // 如果仍未找到，尝试更通用的查找方法
                                                if (!sendButton) {
                                                    const buttons = document.querySelectorAll('button');
                                                    for (let btn of buttons) {
                                                        // 检查按钮是否包含发送相关文本或图标
                                                        if ((btn.textContent.includes('发送') || 
                                                             btn.textContent.includes('Send')) && 
                                                            btn.style.display !== 'none') {
                                                            sendButton = btn;
                                                            console.log('通过文本检测找到发送按钮:', sendButton);
                                                            break;
                                                        }
                                                    }
                                                }
                                                
                                                if (!sendButton) {
                                                    reject(new Error('未找到发送按钮'));
                                                    return;
                                                }
                                                
                                                // 确保按钮可见且可点击
                                                const rect = sendButton.getBoundingClientRect();
                                                if (rect.width > 0 && rect.height > 0) {
                                                    // 模拟真实点击
                                                    sendButton.click();
                                                    console.log('已点击发送按钮');
                                                    
                                                    // 等待发送操作完成
                                                    setTimeout(() => resolve({ success: true }), 1000);
                                                } else {
                                                    reject(new Error('发送按钮不可见或不可点击'));
                                                }
                                            } catch (error) {
                                                reject(new Error('点击发送按钮时出错: ' + error.message));
                                            }
                                        }, 1000);
                                    } catch (error) {
                                        reject(new Error('查找或操作输入框时出错: ' + error.message));
                                    }
                                }, 1000); // 等待1秒确保对话页面完全加载
                            } catch (error) {
                                reject(new Error('发送消息过程中出错: ' + error.message));
                            }
                        });
                    }
                };
                window.__tiktokMessageHelperInjected = true;
            `;
            
            document.head.appendChild(script);
            script.remove(); // 执行后移除脚本元素
        }
    }
    
    // 发送消息的主函数 - 直接在对话页面操作
    async function sendMessageToUser(message) {
        try {
            console.log('开始在对话页面发送消息流程');
            
            // 确保注入了必要的函数
            injectSendMessageFunction();
            
            // 等待页面完全加载
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 直接调用发送消息函数
            const result = await window.__tiktokMessageHelper.sendMessageInConversation(message);
            
            console.log('对话页面消息发送流程完成');
            return result;
            
        } catch (error) {
            console.error('发送消息时出错:', error);
            return { error: error.message };
        }
    }
    
    // 暴露sendMessageToUser函数给外部调用
    window.sendMessageToUser = sendMessageToUser;
    
    // 监听来自后台或popup的消息
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        switch (message.action) {
            case 'sendMessage':
                // 直接调用发送消息函数 - 现在是在对话页面直接操作
                sendMessageToUser(message.message)
                    .then(result => {
                        sendResponse(result);
                    })
                    .catch(error => {
                        sendResponse({ error: error.message });
                    });
                return true; // 保持消息通道开放直到异步操作完成
                
            case 'checkPageReady':
                // 检查页面是否已准备好
                const isReady = document.readyState === 'complete';
                sendResponse({ ready: isReady });
                break;
                
            case 'checkConversationPage':
                // 检查当前页面是否是对话页面
                const isConversationPage = window.location.href.includes('/messages?');
                sendResponse({ isConversationPage });
                break;
                
            default:
                sendResponse({ error: '未知操作' });
        }
    });
    
    // 页面卸载时清理资源
    window.addEventListener('beforeunload', () => {
        // 清理注入的函数
        if (window.__tiktokMessageHelper) {
            delete window.__tiktokMessageHelper;
            delete window.__tiktokMessageHelperInjected;
        }
        
        // 清理暴露的函数
        if (window.sendMessageToUser) {
            delete window.sendMessageToUser;
        }
        
        console.log('TikTok对话页面消息助手资源已清理');
    });
})();