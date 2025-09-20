// 测试文件模板
// 使用说明：
// 1. 将此文件复制到对应分类目录下
// 2. 重命名文件为您想要的测试ID（例如：my_test.js，则测试ID为my_test）
// 3. 修改title、description等内容，但不要修改id属性的赋值方式

(function() {
    // 从文件名获取测试ID（自动提取，无需手动修改）
    const getTestIdFromFilename = function() {
        // 获取当前脚本文件名
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];
        const scriptSrc = currentScript.src;
        const fileName = scriptSrc.split('/').pop();
        const testId = fileName.replace('.js', '');
        return testId;
    };
    
    // 提取测试ID
    const testId = getTestIdFromFilename();
    
    // 注册测试元数据
    window.TestRegistry && window.TestRegistry.register({
        id: testId,  // 自动从文件名获取，无需修改
        title: '测试标题',  // 修改为您的测试标题
        description: '测试描述信息',  // 修改为您的测试描述
        estimateMinutes: 5  // 估计完成时间（分钟）
    });

    // 定义测试数据集
    var dataset = {
        id: testId,  // 自动从文件名获取，无需修改
        questions: [
            // 添加您的测试题目
            {
                text: '示例题目1',
                multi: false,  // 是否多选题
                options: [
                    { label: '选项A', score: 0 },
                    { label: '选项B', score: 1 },
                    { label: '选项C', score: 2 },
                    { label: '选项D', score: 3 }
                ]
            },
            {
                text: '示例题目2',
                multi: false,
                options: [
                    { label: '选项A', score: 0 },
                    { label: '选项B', score: 1 },
                    { label: '选项C', score: 2 },
                    { label: '选项D', score: 3 }
                ]
            }
            // 可以添加更多题目...
        ],
        resultRanges: [
            // 定义测试结果范围
            { label: '初级', min: 0, max: 1, text: '测试结果描述1', advice: '改进建议1' },
            { label: '中级', min: 2, max: 3, text: '测试结果描述2', advice: '改进建议2' },
            { label: '高级', min: 4, max: 6, text: '测试结果描述3', advice: '改进建议3' }
        ]
    };

    // 注册测试数据集
    window.TestDatasets = window.TestDatasets || {};
    window.TestDatasets[dataset.id] = dataset;
})();