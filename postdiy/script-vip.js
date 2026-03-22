// 会员权益检查和限制模块
const VIPFeatureManager = {
    // 初始化
    init() {
        this.setupEventListeners();
        this.checkAndCleanupUsage();
    },

    // 设置事件监听
    setupEventListeners() {
        // 监听会员状态变化
        window.addEventListener('vipStatusChanged', (event) => {
            this.updateUIBasedOnVIPStatus(event.detail);
        });

        // 监听会员权益菜单点击
        document.addEventListener('click', (e) => {
            const menuItem = e.target.closest('[data-action="vipPrivileges"]');
            if (menuItem) {
                VIPSystem.showPrivileges();
            }
        });
    },

    // 检查并清理使用记录
    checkAndCleanupUsage() {
        VIPPrivileges.cleanupUsageRecords();
    },

    // 检查功能是否可用
    async checkFeatureAvailability(feature) {
        // 检查是否有权限使用该功能
        if (!VIPSystem.checkFeaturePermission(feature)) {
            await this.showVIPUpgradePrompt(feature);
            return false;
        }

        // 检查使用次数限制
        if (feature === 'createPost' && !VIPSystem.checkUsageLimit()) {
            await this.showUsageLimitPrompt();
            return false;
        }

        return true;
    },

    // 显示会员升级提示
    async showVIPUpgradePrompt(feature) {
        const featureNames = {
            'createPost': '创建海报',
            'customElements': '自定义元素',
            'aiGeneration': 'AI智能生成',
            'batchExport': '批量导出',
            'hdExport': '高清导出',
            'removeWatermark': '去除水印'
        };

        const container = document.createElement('div');
        container.className = 'modal-container';
        container.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>开通会员</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="upgrade-prompt">
                        <div class="prompt-icon">🔒</div>
                        <h3>开通会员即可使用${featureNames[feature] || '此功能'}</h3>
                        <p>开通会员享受更多专属权益：</p>
                        <ul class="privilege-list">
                            <li>🎨 无限制创作海报</li>
                            <li>✨ 解锁所有高级模板</li>
                            <li>📷 支持高清无水印导出</li>
                            <li>🎯 自定义元素功能</li>
                            <li>🤖 AI智能助手</li>
                            <li>📦 批量导出功能</li>
                        </ul>
                        <div class="action-buttons">
                            <button class="upgrade-btn">立即开通会员</button>
                            <button class="try-btn">免费试用</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .upgrade-prompt {
                text-align: center;
                padding: 2rem;
            }
            .prompt-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .privilege-list {
                list-style: none;
                margin: 1.5rem 0;
                text-align: left;
                max-width: 300px;
                margin: 1.5rem auto;
            }
            .privilege-list li {
                margin: 0.5rem 0;
                font-size: 1.1rem;
            }
            .action-buttons {
                margin-top: 2rem;
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            .upgrade-btn {
                padding: 0.75rem 2rem;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: var(--border-radius-md);
                cursor: pointer;
                font-size: 1.1rem;
                transition: background var(--transition-fast);
            }
            .upgrade-btn:hover {
                background: var(--secondary-color);
            }
            .try-btn {
                padding: 0.75rem 2rem;
                background: white;
                color: var(--primary-color);
                border: 1px solid var(--primary-color);
                border-radius: var(--border-radius-md);
                cursor: pointer;
                font-size: 1.1rem;
                transition: all var(--transition-fast);
            }
            .try-btn:hover {
                background: var(--bg-secondary);
            }
        `;
        document.head.appendChild(style);

        // 添加事件监听
        container.querySelector('.close-btn').addEventListener('click', () => {
            container.remove();
        });

        container.querySelector('.modal-backdrop').addEventListener('click', () => {
            container.remove();
        });

        container.querySelector('.upgrade-btn').addEventListener('click', () => {
            container.remove();
            // 显示激活码输入界面
            this.showVoucherInput();
        });

        container.querySelector('.try-btn').addEventListener('click', () => {
            container.remove();
            // 这里可以添加试用逻辑
        });

        document.body.appendChild(container);
    },

    // 显示使用次数限制提示
    async showUsageLimitPrompt() {
        const container = document.createElement('div');
        container.className = 'modal-container';
        container.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>使用次数已达上限</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="usage-prompt">
                        <div class="prompt-icon">⏰</div>
                        <h3>今日免费使用次数已用完</h3>
                        <p>开通会员即可无限次使用</p>
                        <div class="action-buttons">
                            <button class="upgrade-btn">立即开通会员</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 添加事件监听
        container.querySelector('.close-btn').addEventListener('click', () => {
            container.remove();
        });

        container.querySelector('.modal-backdrop').addEventListener('click', () => {
            container.remove();
        });

        container.querySelector('.upgrade-btn').addEventListener('click', () => {
            container.remove();
            this.showVoucherInput();
        });

        document.body.appendChild(container);
    },

    // 显示激活码输入界面
    showVoucherInput() {
        const container = document.createElement('div');
        container.className = 'modal-container';
        container.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>激活会员</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="voucherContainer"></div>
                </div>
            </div>
        `;

        // 添加事件监听
        container.querySelector('.close-btn').addEventListener('click', () => {
            container.remove();
        });

        container.querySelector('.modal-backdrop').addEventListener('click', () => {
            container.remove();
        });

        // 添加激活码输入界面
        const voucherUI = VIPVoucher.createVoucherUI();
        container.querySelector('#voucherContainer').appendChild(voucherUI);

        document.body.appendChild(container);
    },

    // 记录功能使用
    recordFeatureUsage(feature) {
        if (feature === 'createPost') {
            VIPSystem.recordFeatureUsage();
        }
    }
};

// 初始化会员权益管理
document.addEventListener('DOMContentLoaded', () => {
    VIPFeatureManager.init();
});