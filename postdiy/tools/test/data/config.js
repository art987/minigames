// 测试分类配置
// 这是唯一的配置文件，只定义分类的基本信息
// 测试数据由各测试文件自行注册，无需在此配置

(function() {
    window.TestConfig = {
        // 分类显示顺序（趣味娱乐类放最后）
        categoryOrder: [
            '闯关学习类',
            '心理测评类',
            '职业与学习类',
            '爱情与人际关系类',
            '健康与生活习惯类',
            '趣味娱乐类'
        ],

        // 分类定义
        categories: {
            '闯关学习类': {
                name: '闯关学习类',
                icon: '📚',
                description: '文学、安全、急救常识闯关'
            },
            '心理测评类': {
                name: '心理测评类',
                icon: '🧠',
                description: '性格、情绪、心理特质探索'
            },
            '职业与学习类': {
                name: '职业与学习类',
                icon: '🎓',
                description: '领导力、创造力、专注力'
            },
            '爱情与人际关系类': {
                name: '爱情与人际关系类',
                icon: '💑',
                description: '恋爱观、依恋、社交风格'
            },
            '健康与生活习惯类': {
                name: '健康与生活习惯类',
                icon: '🏃',
                description: '睡眠、作息、运动习惯'
            },
            '趣味娱乐类': {
                name: '趣味娱乐类',
                icon: '🎉',
                description: '轻松有趣的脑洞测试'
            }
        },

        // 测试注册表 - 自动从 TestDatasets 收集
        registry: [],

        // 分类到测试的映射 - 立即初始化
        testsByCategory: {
            '闯关学习类': [],
            '心理测评类': [],
            '职业与学习类': [],
            '爱情与人际关系类': [],
            '健康与生活习惯类': [],
            '趣味娱乐类': []
        },

        // 测试ID到分类的映射 - 自动构建
        testToCategoryMap: {},

        // 测试专属 emoji 映射
        testEmojis: {
            // 闯关学习类
            'safety60': '🛡️',
            'literature100': '📖',
            'firstaid50': '🚑',
            'folklore50': '🏮',
            'iq60': '🧩',
            // 心理测评类
            'procrastination_level': '🐢',
            'happiness_index': '😊',
            'mbti_short': '🎭',
            'emotion_stability': '⚖️',
            'stress_tolerance': '💪',
            'self_confidence': '🌟',
            'introversion_extroversion': '🔄',
            // 爱情与人际关系类
            'love_philosophy': '💕',
            'attachment_style': '💗',
            'ideal_partner': '💘',
            'intimacy_satisfaction': '💑',
            'friendship_stability': '🤝',
            'social_anxiety_index': '😰',
            'love_communication_style': '💬',
            'attraction_index': '✨',
            // 职业与学习类
            'leadership_index': '👔',
            'creative_thinking': '💡',
            'time_management': '⏰',
            'focus_attention': '🎯',
            'career_stress_resilience': '🏔️',
            'communication_skills': '🗣️',
            // 健康与生活习惯类
            'sleep_quality': '😴',
            'diet_health': '🥗',
            'schedule_regularity': '📅',
            'mental_subhealth_index': '🧠',
            'exercise_habit_self_assessment': '🏃',
            'mobile_phone_dependency': '📱',
            'stay_up_late_index': '🌙',
            'sitting_risk_assessment': '🪑'
        },

        // 初始化：从 TestDatasets 收集测试（用于页面加载完成后的二次整理）
        init: function() {
            console.log('TestConfig 初始化...');
            console.log(`已注册 ${this.registry.length} 个测试`);
        },

        // 注册单个测试
        registerTest: function(testData) {
            const categoryKey = testData.category || '心理测评类';

            // 础保分类存在
            if (!this.categories[categoryKey]) {
                console.warn(`未知分类: ${categoryKey}，测试 ${testData.id} 将被归入心理测评类`);
                categoryKey = '心理测评类';
            }

            // 构建元数据（支持 emoji 字段）
            const meta = {
                id: testData.id,
                title: testData.title || '未命名测试',
                description: testData.description || '暂无描述',
                questionCount: testData.questions ? testData.questions.length : 0,
                estimateMinutes: testData.estimateMinutes || 5,
                category: categoryKey,
                emoji: this.testEmojis[testData.id] || testData.emoji || this.categories[categoryKey].icon
            };

            // 添加到注册表（避免重复）
            if (!this.registry.find(t => t.id === testData.id)) {
                this.registry.push(meta);
            }

            // 添加到分类映射（避免重复）
            if (!this.testsByCategory[categoryKey].find(t => t.id === testData.id)) {
                this.testsByCategory[categoryKey].push(meta);
            }

            // 更新反向映射
            this.testToCategoryMap[testData.id] = categoryKey;

            console.log(`已注册测试: ${testData.id} -> ${categoryKey}`);
        },

        // 获取所有测试
        getAllTests: function() {
            return this.registry;
        },

        // 获取指定分类的测试
        getTestsByCategory: function(categoryKey) {
            return this.testsByCategory[categoryKey] || [];
        },

        // 获取指定测试的信息
        getTestById: function(testId) {
            return this.registry.find(t => t.id === testId) || null;
        },

        // 获取所有分类
        getAllCategories: function() {
            return this.categories;
        },

        // 获取分类下的测试数量
        getTestCountByCategory: function(categoryKey) {
            return (this.testsByCategory[categoryKey] || []).length;
        }
    };
})();