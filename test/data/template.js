(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'your_test_id';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '测试标题',
        description: '测试描述内容...',
        category: '测试分类', // 如：爱情与人际关系类
        questionCount: 10,    // 题目数量
        totalScore: 100,      // 总分（必须明确设置）
        estimateMinutes: 5,   // 估计完成时间（分钟）
        cover: testId + '.jpg', // 封面图片文件名，默认与测试ID同名，存放在data/cover/目录下
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '问题内容',
                multi: false, // 是否为多选题
                options: [
                    { id: 'q1a1', text: '选项A', score: 10 },
                    { id: 'q1a2', text: '选项B', score: 0 }
                    // 更多选项...
                ]
            }
            // 更多题目...
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 50,
                title: '结果类型标题',
                description: '结果描述内容...',
                suggestions: ['建议1', '建议2']
            }
            // 更多结果类型...
        ]
    };

    // 5. 安全注册测试数据（避免覆盖全局对象）
    if (window.TestRegistry) {
        window.TestRegistry.register(testData);
    }

    if (!window.TestDatasets) {
        window.TestDatasets = {};
    }
    window.TestDatasets[testData.id] = testData;
})();