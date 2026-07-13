// 测试注册与数据加载工具
// 简化版：只负责注册测试和加载数据集

(function() {
    var registry = [];

    // 注册测试元数据
    function register(meta) {
        // 避免重复注册
        if (!registry.find(function(m) { return m.id === meta.id; })) {
            registry.push(meta);
        }
        
        // 同步更新 TestConfig（如果已存在）
        if (window.TestConfig && window.TestConfig.registerTest) {
            window.TestConfig.registerTest(meta);
        }
    }

    // 列出所有测试
    function list() {
        return registry.slice();
    }

    // 根据ID查找测试
    function findTestById(id) {
        return registry.find(function(meta) {
            return meta.id === id;
        });
    }

    // 加载测试数据集
    function loadDataset(id) {
        // 确保全局容器存在
        window.TestDatasets = window.TestDatasets || {};

        // 尝试直接加载
        var dataset = window.TestDatasets[id];

        // 尝试兼容性版本
        if (!dataset && !id.endsWith('-compat')) {
            dataset = window.TestDatasets[id + '-compat'];
        }

        return dataset || null;
    }

    // 检查测试是否有有效数据
    function hasValidDataset(testId) {
        try {
            if (!window.TestDatasets) return false;
            
            let dataset = window.TestDatasets[testId];
            if (!dataset && !testId.endsWith('-compat')) {
                dataset = window.TestDatasets[testId + '-compat'];
            }
            
            return dataset && dataset.questions && dataset.questions.length > 0;
        } catch (error) {
            console.error(`检查测试 ${testId} 数据集时出错:`, error);
            return false;
        }
    }

    // 暴露到全局
    window.TestRegistry = {
        register: register,
        list: list,
        findTestById: findTestById,
        loadDataset: loadDataset
    };

    // 全局数据容器
    window.TestDatasets = window.TestDatasets || {};

    // 全局检查函数
    window.hasValidDataset = hasValidDataset;
})();