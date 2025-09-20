// 测试配置文件
// 本文件明确定义所有测试项目及其所属分类
// 作为静态网站，这种方式比自动扫描更可靠

window.TestConfig = {
    // 测试分类配置
    categories: {
        '心理测评类': {
            name: '心理测评类',
            icon: '🧠',
            description: '探索你的内心世界，发现隐藏的性格特质与心理优势，帮助你更了解自己'
        },
        '职业与学习类': {
            name: '职业与学习类',
            icon: '🎓',
            description: '测测你的职业潜力与学习方式，找到适合的发展方向和成长路径'
        },
        '爱情与人际关系类': {
            name: '爱情与人际关系类',
            icon: '💑',
            description: '揭开你的人际交往密码，了解恋爱观与沟通风格，发现真实的亲密关系需求'
        },
        '趣味娱乐类': {
            name: '趣味娱乐类',
            icon: '🎉',
            description: '轻松有趣的脑洞测试，带你玩转个性标签，解锁独一无二的趣味身份'
        },
        '健康与生活习惯类': {
            name: '健康与生活习惯类',
            icon: '🏃',
            description: '检视日常习惯与健康指数，帮你发现潜在问题，养成更科学的生活方式'
        },
        '智力与逻辑类': {
            name: '智力与逻辑类',
            icon: '🧩',
            description: '挑战思维与脑力极限，提升逻辑推理、专注力与创造力，让大脑持续活跃'
        }
    },
    
    // 测试项目配置 - 按分类组织
    testsByCategory: {
        '心理测评类': [
            
            {
                id: 'mbti_short',
                title: 'MBTI性格类型测试（简版）',
                description: '本测试基于MBTI人格理论，通过28道题目帮助你了解自己的性格偏好类型。',
                questionCount: 28,
                estimateMinutes: 5
            },
            {
                id: 'emotion_stability',
                title: '情绪稳定度测验',
                description: '本测试包含20道题目，全面评估您的情绪稳定性水平。',
                questionCount: 20,
                estimateMinutes: 5
            },
            {
                id: 'stress_tolerance',
                title: '压力承受能力测试',
                description: '评估您在面对压力时的应对能力和心理韧性',
                questionCount: 20,
                estimateMinutes: 5
            },
            {
                id: 'self_confidence',
                title: '自信心指数测试',
                description: '评估您的自信心水平，了解自己的自我认知和应对挑战的能力',
                questionCount: 20,
                estimateMinutes: 5
            },
            {
                id: 'introversion_extroversion',
                title: '内向外向测验',
                description: '评估您的性格倾向，帮助您了解自己是更偏向内向还是外向',
                questionCount: 20,
                estimateMinutes: 5
            }
        ],
        '智力与逻辑类': [
            {
                id: 'iq60',
                title: '60题标准智商测试',
                description: '通过60道标准化题目全面评估逻辑推理、数字计算、空间想象等多维度能力。',
                questionCount: 60,
                estimateMinutes: 10
            }
        ],
        '职业与学习类': [],
        '爱情与人际关系类': [
            {
                id: 'love_philosophy',
                title: '爱情观测试',
                description: '本测试将评估您的爱情价值观、态度和行为倾向，帮助您了解自己在爱情中的偏好。',
                questionCount: 20,
                estimateMinutes: 5
            }
        ],
        '趣味娱乐类': [],
        '健康与生活习惯类': []
    },
    
    // 获取所有测试项目
    getAllTests: function() {
        let allTests = [];
        Object.keys(this.testsByCategory).forEach(category => {
            this.testsByCategory[category].forEach(test => {
                allTests.push({...test, category});
            });
        });
        return allTests;
    },
    
    // 获取指定分类的测试项目
    getTestsByCategory: function(categoryKey) {
        return this.testsByCategory[categoryKey] || [];
    },
    
    // 获取指定测试的信息
    getTestById: function(testId) {
        for (let category in this.testsByCategory) {
            const test = this.testsByCategory[category].find(t => t.id === testId);
            if (test) {
                return {...test, category};
            }
        }
        return null;
    },
    
    // 获取所有分类
    getAllCategories: function() {
        return this.categories;
    },
    
    // 获取分类下的测试数量（仅统计有有效数据集的测试）
    getTestCountByCategory: function(categoryKey) {
        const tests = this.testsByCategory[categoryKey] || [];
        
        // 检查是否有hasValidDataset函数可用
        if (typeof window.hasValidDataset === 'function') {
            // 过滤出有有效数据集的测试
            return tests.filter(test => window.hasValidDataset(test.id)).length;
        }
        
        // 如果没有hasValidDataset函数，回退到原始逻辑
        return tests.length;
    }
};