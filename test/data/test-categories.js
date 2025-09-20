// 测试分类配置文件
// 本文件用于定义测试分类信息，与data-scanner.js配合实现自动扫描和分类

(function() {
    // 定义测试分类配置
    window.TestCategories = {
        // 分类定义 - 包含分类的基本信息
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
        
        // 分类到测试ID的映射（自动由data-scanner.js更新）
        // 格式: 分类ID: ['测试ID1', '测试ID2', ...]
        categoryTestsMap: {},
        
        // 测试ID到分类的快速查找映射（自动由data-scanner.js更新）
        testToCategoryMap: {},
        
        // 初始化映射结构
        initMaps: function() {
            Object.keys(this.categories).forEach(categoryKey => {
                if (!this.categoryTestsMap[categoryKey]) {
                    this.categoryTestsMap[categoryKey] = [];
                }
            });
        },
        
        // 获取测试所属的分类
        getCategoryForTest: function(testId) {
            return this.testToCategoryMap[testId] || 'psychology'; // 默认分类为心理测试
        },
        
        // 获取分类下的所有测试ID
        getTestsForCategory: function(categoryKey) {
            return this.categoryTestsMap[categoryKey] || [];
        },
        
        // 添加测试到分类
        addTestToCategory: function(testId, categoryKey) {
            // 如果测试已经属于其他分类，先从原分类中移除
            var currentCategory = this.testToCategoryMap[testId];
            if (currentCategory && currentCategory !== categoryKey) {
                var currentTests = this.categoryTestsMap[currentCategory];
                if (currentTests) {
                    var index = currentTests.indexOf(testId);
                    if (index > -1) {
                        currentTests.splice(index, 1);
                    }
                }
            }
            
            // 将测试添加到新分类
            if (this.categories[categoryKey]) {
                if (!this.categoryTestsMap[categoryKey]) {
                    this.categoryTestsMap[categoryKey] = [];
                }
                
                if (!this.categoryTestsMap[categoryKey].includes(testId)) {
                    this.categoryTestsMap[categoryKey].push(testId);
                }
                
                // 更新反向映射
                this.testToCategoryMap[testId] = categoryKey;
            }
        },
        
        // 获取所有分类
        getAllCategories: function() {
            return this.categories;
        }
    };
})();