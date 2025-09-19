(function(){
    window.TestRegistry && window.TestRegistry.register({
        id: 'eq',
        title: '基础情商倾向测试（示例）',
        description: '基于自我感知、人际理解与情绪调节的自评题，仅作娱乐参考。',
        estimateMinutes: 3
    });

    var dataset = {
        id: 'eq',
        questions: [
            {
                text: '当情绪波动时，你通常会：',
                multi: false,
                options: [
                    { label: '冲动反应，事后后悔', score: 0 },
                    { label: '短暂停顿再回应', score: 2 },
                    { label: '先自我觉察并换位思考', score: 3 }
                ]
            },
            {
                text: '与他人冲突时，你会：',
                multi: false,
                options: [
                    { label: '坚持己见，不管对方感受', score: 0 },
                    { label: '表达观点并倾听对方', score: 2 },
                    { label: '寻找双赢及长期关系', score: 3 }
                ]
            },
            {
                text: '面对压力，你的常用方式是：',
                multi: false,
                options: [
                    { label: '逃避与拖延', score: 0 },
                    { label: '列计划逐步推进', score: 2 },
                    { label: '同时关注情绪调节与行动效率', score: 3 }
                ]
            }
        ],
        resultRanges: [
            { label: '初阶', min: 0, max: 3, text: '情绪与关系管理待加强。', advice: '记录情绪ABC事件，练习非暴力沟通。' },
            { label: '中阶', min: 4, max: 6, text: '具备良好的人际与自控能力。', advice: '持续刻意练习倾听与复述。' },
            { label: '高阶', min: 7, max: 9, text: '同理心与调节能力较强。', advice: '可带动团队情绪，尝试辅导他人。' }
        ]
    };

    window.TestDatasets = window.TestDatasets || {};
    window.TestDatasets[dataset.id] = dataset;
})();



