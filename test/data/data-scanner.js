// 测试数据自动扫描器
// 该工具负责扫描各个分类目录下的测试文件，并自动将它们注册到系统中
// 用户只需在对应分类目录下添加JS文件，文件名即为测试ID，无需手动配置映射关系

(function() {
    // 定义分类目录映射
    const CATEGORY_DIRS = {
        'iq': 'iq',
        'eq': 'eq',
        'knowledge': 'knowledge',
        'psychology': 'psychology',
        'personality': 'personality',
        'career': 'career'
    };
    
    // 测试文件映射表 - 初始包含已知测试文件
    // 系统会自动扫描并更新此映射表
    let TEST_FILES_MAP = {
        'knowledge': [],
        'iq': [ 'iq60.js'],
        'eq': [ 'eq30.js']
        // psychology、personality、career 目录目前为空
    };
    
    // 存储已注册的测试数据文件路径
    const registeredTestFiles = {};
    
    // 获取文件系统中的测试文件列表
    function getTestFilesFromDirectory(category) {
        try {
            // 对于静态网站，我们使用预定义的TEST_FILES_MAP
            if (TEST_FILES_MAP[category]) {
                return TEST_FILES_MAP[category];
            }
            return [];
        } catch (error) {
            console.error('获取文件列表失败:', error);
            return [];
        }
    }
    
    // 获取分类目录路径
    function getCategoryDir(category) {
        return CATEGORY_DIRS[category] || category;
    }
    
    // 自动更新TEST_CONFIG中的测试列表
    function updateTestConfig(testId, category, metaData) {
        if (!window.TestConfig) {
            console.warn('TestConfig尚未加载，无法更新配置');
            return;
        }
        
        // 确保分类存在
        if (!window.TestConfig.testsByCategory[category]) {
            window.TestConfig.testsByCategory[category] = [];
        }
        
        // 检查测试是否已存在
        const existingTestIndex = window.TestConfig.testsByCategory[category]
            .findIndex(t => t.id === testId);
        
        // 构建测试元数据
        const testMeta = {
            id: testId,
            title: metaData.title || '未命名测试',
            description: metaData.description || '暂无描述',
            questionCount: metaData.questionCount || 0,
            estimateMinutes: metaData.estimateMinutes || 5
        };
        
        // 更新或添加测试
        if (existingTestIndex >= 0) {
            window.TestConfig.testsByCategory[category][existingTestIndex] = testMeta;
        } else {
            window.TestConfig.testsByCategory[category].push(testMeta);
        }
        
        console.log(`已更新TestConfig中的测试: ${testId}`);
    }
    
    // 自动扫描工具
    window.TestAutoScanner = {
        // 初始化并扫描所有分类目录
        init: function() {
            // 确保TestRegistry和TestCategories已加载
            if (!window.TestRegistry) {
                console.warn('TestRegistry尚未加载，等待重试...');
                setTimeout(() => this.init(), 100);
                return;
            }
            
            if (!window.TestCategories) {
                console.warn('TestCategories尚未加载，等待重试...');
                setTimeout(() => this.init(), 100);
                return;
            }
            
            console.log('开始扫描测试文件...');
            this.scanAllCategories();
        },
        
        // 扫描所有分类目录
        scanAllCategories: function() {
            Object.keys(CATEGORY_DIRS).forEach(categoryKey => {
                this.scanCategory(categoryKey);
            });
        },
        
        // 扫描指定分类目录下的测试文件
        scanCategory: function(categoryKey) {
            console.log(`开始扫描分类: ${categoryKey}`);
            
            // 从映射表中获取该分类的测试文件列表
            const testFiles = TEST_FILES_MAP[categoryKey] || [];
            console.log(`测试文件数量: ${testFiles.length}`);
            
            testFiles.forEach(fileName => {
                console.log(`处理文件: ${fileName}`);
                
                // 从文件名提取测试ID（去掉.js后缀）
                const testId = fileName.replace('.js', '');
                console.log(`提取的测试ID: ${testId}`);
                
                // 构建文件路径
                const filePath = `data/${categoryKey}/${fileName}`;
                console.log(`文件路径: ${filePath}`);
                
                // 确保文件只注册一次
                if (!registeredTestFiles[filePath]) {
                    this.registerTestFile(filePath, testId, categoryKey);
                    registeredTestFiles[filePath] = true;
                }
            });
            
            console.log(`分类扫描完成: ${categoryKey}`);
        },
        
        // 注册测试文件
        registerTestFile: function(filePath, testId, categoryKey) {
            console.log(`尝试注册测试文件: ${filePath}`);
            
            // 创建script标签加载测试文件
            var script = document.createElement('script');
            script.src = filePath;
            
            // 设置脚本属性以确保正确加载
            script.setAttribute('data-test-id', testId);
            script.setAttribute('data-test-category', categoryKey);
            
            // 监听加载完成事件
            script.onload = function() {
                console.log(`测试文件已加载: ${filePath}`);
                
                // 尝试获取测试数据
                var testData = window.TestDatasets && window.TestDatasets[testId];
                if (!testData) {
                    console.warn(`测试数据未找到: ${testId}`);
                    return;
                }
                
                console.log(`测试数据已找到: ${testId}`);
                
                // 注册到TestCategories
                if (window.TestCategories) {
                    // 初始化映射表
                    if (!window.TestCategories.categoryTestsMap[categoryKey]) {
                        window.TestCategories.categoryTestsMap[categoryKey] = [];
                    }
                    
                    // 添加到分类映射
                    if (!window.TestCategories.categoryTestsMap[categoryKey].includes(testId)) {
                        window.TestCategories.categoryTestsMap[categoryKey].push(testId);
                    }
                    
                    // 添加到测试到分类的映射
                    window.TestCategories.testToCategoryMap[testId] = categoryKey;
                    
                    console.log(`已更新分类映射: ${categoryKey} -> ${testId}`);
                }
                
                // 尝试通过TestRegistry注册测试
                if (window.TestRegistry && testData) {
                    // 提取测试元数据
                    const metaData = {
                        id: testId,
                        title: testData.title || '未命名测试',
                        description: testData.introduction || '暂无描述',
                        category: categoryKey,
                        questionCount: testData.questions ? testData.questions.length : 0,
                        estimateMinutes: Math.ceil((testData.questions ? testData.questions.length : 0) * 0.5) // 估计每道题0.5分钟
                    };
                    
                    // 注册测试
                    window.TestRegistry.register(metaData);
                    
                    console.log(`已通过TestRegistry注册测试: ${testId}`);
                    
                    // 更新TestConfig
                    updateTestConfig(testId, categoryKey, metaData);
                }
            };
            
            // 监听加载错误事件
            script.onerror = function() {
                console.error(`测试文件加载失败: ${filePath}`);
            };
            
            // 添加到文档
            document.head.appendChild(script);
        },
        
        // 添加单个测试文件到扫描列表（用于动态添加新测试）
        addTestFile: function(categoryKey, fileName) {
            if (!CATEGORY_DIRS[categoryKey]) {
                console.error(`无效的分类: ${categoryKey}`);
                return false;
            }
            
            // 初始化分类列表
            if (!TEST_FILES_MAP[categoryKey]) {
                TEST_FILES_MAP[categoryKey] = [];
            }
            
            // 检查文件是否已存在
            if (TEST_FILES_MAP[categoryKey].includes(fileName)) {
                console.warn(`文件已存在于扫描列表中: ${fileName}`);
                return false;
            }
            
            // 添加到文件映射表
            TEST_FILES_MAP[categoryKey].push(fileName);
            
            // 立即注册该测试文件
            this.registerTestFile(`data/${categoryKey}/${fileName}`, fileName.replace('.js', ''), categoryKey);
            
            // 触发页面刷新（如果需要）
            if (typeof window.onNewTestAdded === 'function') {
                window.onNewTestAdded(categoryKey);
            }
            
            return true;
        },
        
        // 定期扫描新文件（适用于开发环境）
        enableAutoScan: function(intervalMs = 5000) {
            console.log(`启用自动扫描，间隔: ${intervalMs}ms`);
            
            setInterval(() => {
                console.log('执行定期扫描...');
                this.scanAllCategories();
            }, intervalMs);
        }
    };
    
    // 页面加载完成后初始化扫描器
    document.addEventListener('DOMContentLoaded', function() {
        window.TestAutoScanner.init();
        
        // 在开发环境下可以启用自动扫描
        // 生产环境建议注释掉此行
        // window.TestAutoScanner.enableAutoScan();
    });
})();