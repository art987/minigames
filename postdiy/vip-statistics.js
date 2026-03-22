// VIP数据统计模块
const VIPStatistics = (function() {
    // 统计数据API地址
    const API_BASE_URL = 'https://api.peacelove.top';

    // 获取用户统计信息
    async function getUserStats() {
        try {
            const userId = localStorage.getItem('postdiy_user_id');
            if (!userId) {
                return { code: 401, message: '用户未登录' };
            }

            const response = await fetch(`${API_BASE_URL}/get-user-stats`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });

            return await response.json();
        } catch (error) {
            console.error('获取统计信息失败：', error);
            return { code: 500, message: '获取统计信息失败' };
        }
    }

    // 获取全局统计信息（仅管理员）
    async function getGlobalStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/get-global-stats`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            return await response.json();
        } catch (error) {
            console.error('获取全局统计信息失败：', error);
            return { code: 500, message: '获取全局统计信息失败' };
        }
    }

    // 记录用户操作
    async function logUserAction(action, details) {
        try {
            const userId = localStorage.getItem('postdiy_user_id');
            if (!userId) return;

            const response = await fetch(`${API_BASE_URL}/log-user-action`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    action,
                    details,
                    timestamp: new Date()
                })
            });

            return await response.json();
        } catch (error) {
            console.error('记录用户操作失败：', error);
        }
    }

    // 创建统计仪表板
    function createStatsDashboard() {
        const container = document.createElement('div');
        container.className = 'stats-dashboard';
        container.innerHTML = `
            <style>
                .stats-dashboard {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    padding: 20px;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .stat-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                .stat-card.posts {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                }

                .stat-card.users {
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                }

                .stat-card.revenue {
                    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                }

                .stat-card.retention {
                    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
                }

                .stat-value {
                    font-size: 2em;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .stat-label {
                    font-size: 0.9em;
                    opacity: 0.9;
                }

                .stat-trend {
                    margin-top: 10px;
                    font-size: 0.8em;
                    opacity: 0.8;
                }

                .trend-up {
                    color: #4caf50;
                }

                .trend-down {
                    color: #f44336;
                }
            </style>
            <div class="stat-card posts">
                <div class="stat-value" id="postsCount">0</div>
                <div class="stat-label">本月创建海报</div>
                <div class="stat-trend trend-up">↑ 12% 比上月</div>
            </div>

            <div class="stat-card users">
                <div class="stat-value" id="vipCount">0</div>
                <div class="stat-label">VIP会员数</div>
                <div class="stat-trend trend-up">↑ 8% 比上月</div>
            </div>

            <div class="stat-card revenue">
                <div class="stat-value" id="revenue">¥0</div>
                <div class="stat-label">本月收入</div>
                <div class="stat-trend trend-up">↑ 25% 比上月</div>
            </div>

            <div class="stat-card retention">
                <div class="stat-value" id="retention">0%</div>
                <div class="stat-label">续费率</div>
                <div class="stat-trend trend-up">↑ 5% 比上月</div>
            </div>
        `;

        // 加载统计数据
        loadStatsData(container);

        return container;
    }

    // 加载统计数据
    async function loadStatsData(container) {
        const stats = await getGlobalStats();

        if (stats.code === 200 && stats.data) {
            const data = stats.data;
            container.querySelector('#postsCount').textContent = data.postsCount || 0;
            container.querySelector('#vipCount').textContent = data.vipCount || 0;
            container.querySelector('#revenue').textContent = `¥${data.revenue || 0}`;
            container.querySelector('#retention').textContent = `${data.retention || 0}%`;
        }
    }

    // 导出公共接口
    return {
        getUserStats,
        getGlobalStats,
        logUserAction,
        createStatsDashboard
    };
})();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VIPStatistics;
}