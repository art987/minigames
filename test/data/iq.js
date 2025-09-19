(function(){
    window.TestRegistry && window.TestRegistry.register({
        id: 'iq',
        title: '基础智商倾向测试（示例）',
        description: '通过若干逻辑与推理题，粗略评估逻辑推理与模式识别倾向，仅作娱乐参考。',
        estimateMinutes: 3
    });

    var dataset = {
        id: 'iq',
        questions: [
            {
                text: '哪个图形与其他不同？',
                multi: false,
                options: [
                    { label: 'A', score: 0 },
                    { label: 'B', score: 1 },
                    { label: 'C', score: 2 },
                    { label: 'D', score: 3 }
                ]
            },
            {
                text: '数列 2, 4, 8, 16, ?，应为：',
                multi: false,
                options: [
                    { label: '18', score: 0 },
                    { label: '24', score: 1 },
                    { label: '32', score: 3 },
                    { label: '36', score: 0 }
                ]
            },
            {
                text: '若所有猫都会爬树，小明会爬树，能推出小明是猫吗？',
                multi: false,
                options: [
                    { label: '能', score: 0 },
                    { label: '不能', score: 3 }
                ]
            }
        ],
        resultRanges: [
            { label: '入门', min: 0, max: 3, text: '逻辑基础在提升中。', advice: '多做数独、数列找规律等训练。' },
            { label: '良好', min: 4, max: 6, text: '具备不错的推理能力。', advice: '尝试更高难度的逻辑谜题。' },
            { label: '优秀', min: 7, max: 9, text: '逻辑与模式识别出色。', advice: '保持训练，挑战综合性问题。' }
        ]
    };

    window.TestDatasets = window.TestDatasets || {};
    window.TestDatasets[dataset.id] = dataset;
})();



