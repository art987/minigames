// TikTok消息助手 - 后台脚本

// 监听安装事件
chrome.runtime.onInstalled.addListener((details) => {
    console.log('TikTok消息助手已安装');
    
    // 创建初始设置
    chrome.storage.sync.get(['settings'], (result) => {
        if (!result.settings) {
            chrome.storage.sync.set({
                settings: {
                    defaultDelay: 5,
                    retryCount: 1
                }
            });
        }
    });
});

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case 'sendStatusUpdate':
            // 记录状态更新
            console.log('状态更新:', message.status);
            sendResponse({ received: true });
            break;
            
        case 'getSettings':
            // 获取设置
            chrome.storage.sync.get(['settings'], (result) => {
                sendResponse({ settings: result.settings || { defaultDelay: 5, retryCount: 1 } });
            });
            return true; // 保持消息通道开放直到sendResponse被调用
            
        case 'updateSettings':
            // 更新设置
            chrome.storage.sync.set({ settings: message.settings });
            sendResponse({ success: true });
            break;
            
        default:
            sendResponse({ error: '未知操作' });
    }
});

// 监听标签页更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 当TikTok页面加载完成时
    if (tab.url && tab.url.includes('tiktok.com') && changeInfo.status === 'complete') {
        console.log('TikTok页面已加载完成:', tab.url);
        
        // 可以在这里注入额外的脚本或执行初始化操作
        // 但主要的交互逻辑已在popup.js中通过chrome.scripting.executeScript处理
    }
});

// 监听标签页关闭事件
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    // 可以在这里清理与已关闭标签页相关的资源
});

// 定期清理过期数据（可选）
setInterval(() => {
    chrome.storage.sync.get(['lastCleanup'], (result) => {
        const now = Date.now();
        const lastCleanup = result.lastCleanup || 0;
        const dayInMs = 24 * 60 * 60 * 1000;
        
        // 每24小时清理一次
        if (now - lastCleanup > dayInMs) {
            // 清理不再需要的数据
            chrome.storage.sync.set({ lastCleanup: now });
        }
    });
}, 60 * 60 * 1000); // 每小时检查一次