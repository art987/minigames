// VIP会员权益管理模块
const VIPPrivileges = (function() {
    // 会员等级和权益配置
    const privileges = {
        free: {
            name: '免费用户',
            level: 0,
            features: {
                dailyPosts: 3,           // 每日可制作海报数量
                templateAccess: 0.3,     // 可用模板比例（30%）
                maxImageSize: 2,         // 最大图片大小（MB）
                watermark: true,         // 是否有水印
                customElements: false,    // 自定义元素
                aiGeneration: false,     // AI生成功能
                batchExport: false,      // 批量导出
                hdExport: false          // 高清导出
            }
        },
        vip1: {
            name: 'VIP会员',
            level: 1,
            features: {
                dailyPosts: -1,          // 无限制
                templateAccess: 1,        // 可用全部模板
                maxImageSize: 10,         // 最大图片大小（MB）
                watermark: false,         // 无水印
                customElements: true,     // 自定义元素
                aiGeneration: true,       // AI生成功能
                batchExport: true,        // 批量导出
                hdExport: true           // 高清导出
            }
        }
    };

    // 特权功能描述
    const featureDescriptions = {
        dailyPosts: '每日可制作海报数量',
        templateAccess: '模板使用权限',
        maxImageSize: '图片上传大小限制',
        watermark: '去除水印',
        customElements: '自定义元素',
        aiGeneration: 'AI智能生成',
        batchExport: '批量导出',
        hdExport: '高清导出'
    };

    // 获取用户VIP状态
    function getVIPStatus() {
        return {
            isVip: localStorage.getItem('vipIsVip') === 'true',
            expireTime: localStorage.getItem('vipExpireTime'),
            level: localStorage.getItem('vipIsVip') === 'true' ? 'vip1' : 'free'
        };
    }

    // 检查功能权限
    function checkFeaturePermission(feature) {
        const { level } = getVIPStatus();
        return privileges[level].features[feature];
    }

    // 获取功能限制值
    function getFeatureLimit(feature) {
        const { level } = getVIPStatus();
        return privileges[level].features[feature];
    }

    // 检查每日使用限制
    function checkDailyLimit() {
        const { level } = getVIPStatus();
        const dailyLimit = privileges[level].features.dailyPosts;
        
        if (dailyLimit === -1) return true; // 无限制

        const today = new Date().toDateString();
        const usageKey = 'postdiy_daily_usage_' + today;
        const dailyUsage = parseInt(localStorage.getItem(usageKey) || '0');

        return dailyUsage < dailyLimit;
    }

    // 记录使用次数
    function recordUsage() {
        const today = new Date().toDateString();
        const usageKey = 'postdiy_daily_usage_' + today;
        const dailyUsage = parseInt(localStorage.getItem(usageKey) || '0');
        localStorage.setItem(usageKey, dailyUsage + 1);
    }

    // 清理过期使用记录
    function cleanupUsageRecords() {
        const today = new Date().toDateString();
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('postdiy_daily_usage_') && key !== 'postdiy_daily_usage_' + today) {
                localStorage.removeItem(key);
            }
        });
    }

    // 创建会员权益展示UI
    function createPrivilegesUI() {
        const container = document.createElement('div');
        container.className = 'vip-privileges-container';

        const { isVip, expireTime } = getVIPStatus();
        const expireDate = expireTime ? new Date(expireTime) : null;

        container.innerHTML = `
            <style>
                .vip-privileges-container {
                    padding: 20px;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .vip-status {
                    margin-bottom: 20px;
                    padding: 15px;
                    background: ${isVip ? '#fff7e6' : '#f5f5f5'};
                    border-radius: 6px;
                    border: 1px solid ${isVip ? '#ffd591' : '#d9d9d9'};
                }
                .vip-status-icon {
                    font-size: 24px;
                    margin-right: 10px;
                }
                .privileges-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                .privilege-card {
                    padding: 15px;
                    border: 1px solid #f0f0f0;
                    border-radius: 6px;
                    transition: all 0.3s;
                }
                .privilege-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .privilege-icon {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .privilege-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .privilege-description {
                    color: #666;
                    font-size: 14px;
                }
                .privilege-status {
                    margin-top: 10px;
                    font-size: 12px;
                    color: ${isVip ? '#52c41a' : '#ff4d4f'};
                }
            </style>
            <div class="vip-status">
                <span class="vip-status-icon">${isVip ? '👑' : '👤'}</span>
                <span>
                    当前状态：${isVip ? 'VIP会员' : '免费用户'}
                    ${expireDate ? `（有效期至：${expireDate.toLocaleDateString()}）` : ''}
                </span>
            </div>
            <div class="privileges-grid">
                ${getPrivilegeCards()}
            </div>
        `;

        return container;
    }

    // 生成权益卡片HTML
    function getPrivilegeCards() {
        const { level } = getVIPStatus();
        const currentFeatures = privileges[level].features;

        return [
            {
                icon: '🎨',
                title: '每日创作次数',
                description: currentFeatures.dailyPosts === -1 ? '无限制创作' : `每日可创作 ${currentFeatures.dailyPosts} 次`,
                status: currentFeatures.dailyPosts === -1 ? '无限制' : `${currentFeatures.dailyPosts}次/天`
            },
            {
                icon: '📝',
                title: '模板权限',
                description: `可使用${Math.round(currentFeatures.templateAccess * 100)}%的模板`,
                status: currentFeatures.templateAccess === 1 ? '全部可用' : '部分可用'
            },
            {
                icon: '📷',
                title: '图片上传',
                description: `最大支持${currentFeatures.maxImageSize}MB图片上传`,
                status: `${currentFeatures.maxImageSize}MB`
            },
            {
                icon: '💫',
                title: '去除水印',
                description: '导出作品无水印',
                status: currentFeatures.watermark ? '未解锁' : '已解锁'
            },
            {
                icon: '🎯',
                title: '自定义元素',
                description: '添加自定义元素，打造独特作品',
                status: currentFeatures.customElements ? '已解锁' : '未解锁'
            },
            {
                icon: '🤖',
                title: 'AI智能助手',
                description: 'AI智能生成文案和图片建议',
                status: currentFeatures.aiGeneration ? '已解锁' : '未解锁'
            }
        ].map(card => `
            <div class="privilege-card">
                <div class="privilege-icon">${card.icon}</div>
                <div class="privilege-title">${card.title}</div>
                <div class="privilege-description">${card.description}</div>
                <div class="privilege-status">${card.status}</div>
            </div>
        `).join('');
    }

    // 导出公共接口
    return {
        checkFeaturePermission,
        getFeatureLimit,
        checkDailyLimit,
        recordUsage,
        cleanupUsageRecords,
        createPrivilegesUI,
        getVIPStatus
    };
})();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VIPPrivileges;
}