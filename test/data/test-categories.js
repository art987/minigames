// 测试分类配置文件
// 本文件用于定义测试分类信息，与data-scanner.js配合实现自动扫描和分类

(function() {
    // 定义测试分类配置
    window.TestCategories = {
        // 分类定义 - 包含分类的基本信息
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