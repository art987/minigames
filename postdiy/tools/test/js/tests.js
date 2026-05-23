(function(){    
    var registry = [];    
    
    // 注册测试元数据    
    function register(meta){
        registry.push(meta);
    }
    
    // 列出所有测试    
    function list(){
        return registry.slice();
    }
    
    // 根据ID查找测试元数据    
    function findTestById(id){
        return registry.find(function(meta){
            return meta.id === id;
        });
    }
    
    // 加载数据集    
    function loadDataset(id){
        // 确保TestDatasets对象存在
        window.TestDatasets = window.TestDatasets || {};
        
        // 尝试直接加载指定ID的数据
        var dataset = window.TestDatasets[id];
        
        // 如果找不到，尝试加载兼容性版本
        if (!dataset && !id.endsWith('-compat')) {
            dataset = window.TestDatasets[id + '-compat'];
        }
        
        return dataset || null;
    }
    
    // 暴露到全局
    window.TestRegistry = {
        register: register,
        list: list,
        findTestById: findTestById,
        loadDataset: loadDataset
    };
})();



