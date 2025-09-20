// 测试配置文件
// 本文件明确定义所有测试项目及其所属分类
// 作为静态网站，这种方式比自动扫描更可靠

window.TestConfig = {
    // 测试分类配置
    categories: {
        'psychology': {
            name: '心理测试',
            icon: '🧠',
            description: '探索内心世界，了解自我性格特点和心理倾向的测试集合'
        },
        'knowledge': {
            name: '知识测试',
            icon: '📚',
            description: '检验各领域知识储备，从历史到科学，全方位挑战你的知识面'
        },
        'iq': {
            name: '智力测试',
            icon: '💡',
            description: '通过逻辑推理和模式识别，评估思维能力和解决问题的智力水平'
        },
        'eq': {
            name: '情商测试',
            icon: '❤️',
            description: '测量情绪识别和人际交往能力，提升社交关系和自我情绪管理'
        },
        'personality': {
            name: '性格测试',
            icon: '🔍',
            description: '揭示你的性格特质和行为模式，帮助更好地认识自己的优势和特点'
        },
        'career': {
            name: '职业倾向',
            icon: '💼',
            description: '分析你的职业兴趣和能力特点，找到最适合的职业发展方向'
        }
    },
    
    // 测试项目配置 - 按分类组织
    testsByCategory: {
        'knowledge': [
            {
                id: 'knowledge23',
                title: '基础情商倾向测试（示例）',
                description: '基于自我感知、人际理解与情绪调节的自评题，仅作娱乐参考。',
                questionCount: 3,
                estimateMinutes: 3
            }
        ],
        'iq': [
            {
                id: 'iq',
                title: '基础智商倾向测试（示例）',
                description: '通过若干逻辑与推理题，粗略评估逻辑推理与模式识别倾向，仅作娱乐参考。',
                questionCount: 3,
                estimateMinutes: 3
            },
            {
                id: 'iq60',
                title: '60题标准智商测试',
                description: '通过60道标准化题目全面评估逻辑推理、数字计算、空间想象等多维度能力。',
                questionCount: 60,
                estimateMinutes: 10
            }
        ],
        'eq': [
            {
                id: 'eq30',
                title: '全面情商评估测试',
                description: '本测试包含30道题目，全面评估您的情绪识别、管理、理解和运用能力。',
                questionCount: 30,
                estimateMinutes: 8
            }
        ],
        'psychology': [],
        'personality': [],
        'career': []
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