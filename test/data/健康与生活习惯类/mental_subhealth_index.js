(function() {
    // 避免重复加载
    if (window.TestDatasets && window.TestDatasets['mental_subhealth_index']) {
        return;
    }

    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'mental_subhealth_index';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '心理亚健康指数测试',
        description: '本测验将评估您的心理亚健康程度，涵盖情绪状态、压力水平、睡眠质量和社会功能等多个维度。',
        category: '健康与生活习惯类',
        totalScore: 100,
        questions: [
            {
                id: 1,
                text: '最近两周内，您是否经常感到情绪低落或沮丧？',
                type: 'single',
                options: [
                    { text: '几乎每天都这样', score: 10 },
                    { text: '经常这样', score: 8 },
                    { text: '有时这样', score: 5 },
                    { text: '很少或从不这样', score: 2 }
                ]
            },
            {
                id: 2,
                text: '您是否经常感到精力不足，即使经过充分休息？',
                type: 'single',
                options: [
                    { text: '几乎每天都这样', score: 10 },
                    { text: '经常这样', score: 8 },
                    { text: '有时这样', score: 5 },
                    { text: '很少或从不这样', score: 2 }
                ]
            },
            {
                id: 3,
                text: '您是否对以前感兴趣的活动失去兴趣或乐趣？',
                type: 'single',
                options: [
                    { text: '几乎总是这样', score: 10 },
                    { text: '经常这样', score: 7 },
                    { text: '偶尔这样', score: 4 },
                    { text: '很少或从不这样', score: 1 }
                ]
            },
            {
                id: 4,
                text: '您是否经常感到紧张、焦虑或不安？',
                type: 'single',
                options: [
                    { text: '几乎每天都这样', score: 10 },
                    { text: '经常这样', score: 8 },
                    { text: '有时这样', score: 5 },
                    { text: '很少或从不这样', score: 2 }
                ]
            },
            {
                id: 5,
                text: '您是否经常难以集中注意力或做出决定？',
                type: 'single',
                options: [
                    { text: '几乎总是这样', score: 10 },
                    { text: '经常这样', score: 7 },
                    { text: '偶尔这样', score: 4 },
                    { text: '很少或从不这样', score: 1 }
                ]
            },
            {
                id: 6,
                text: '您是否经常感到疲劳或虚弱？',
                type: 'single',
                options: [
                    { text: '几乎每天都这样', score: 10 },
                    { text: '经常这样', score: 8 },
                    { text: '有时这样', score: 5 },
                    { text: '很少或从不这样', score: 2 }
                ]
            },
            {
                id: 7,
                text: '您是否经常出现睡眠问题（如入睡困难、早醒或睡眠不深）？',
                type: 'single',
                options: [
                    { text: '几乎每天都这样', score: 10 },
                    { text: '经常这样', score: 8 },
                    { text: '有时这样', score: 5 },
                    { text: '很少或从不这样', score: 2 }
                ]
            },
            {
                id: 8,
                text: '您是否经常对自己或自己的生活感到不满？',
                type: 'single',
                options: [
                    { text: '几乎总是这样', score: 10 },
                    { text: '经常这样', score: 7 },
                    { text: '偶尔这样', score: 4 },
                    { text: '很少或从不这样', score: 1 }
                ]
            },
            {
                id: 9,
                text: '您是否经常感到孤独或与周围人疏远？',
                type: 'single',
                options: [
                    { text: '几乎总是这样', score: 10 },
                    { text: '经常这样', score: 7 },
                    { text: '偶尔这样', score: 4 },
                    { text: '很少或从不这样', score: 1 }
                ]
            },
            {
                id: 10,
                text: '您是否经常出现身体不适（如头痛、胃痛或肌肉紧张）但找不到明确的医学原因？',
                type: 'single',
                options: [
                    { text: '几乎每天都这样', score: 10 },
                    { text: '经常这样', score: 8 },
                    { text: '有时这样', score: 5 },
                    { text: '很少或从不这样', score: 2 }
                ]
            }
        ],
        resultRanges: [
            {
                minScore: 0,
                maxScore: 25,
                title: '心理健康状态良好',
                description: '您的心理状态非常健康，保持了良好的情绪管理和应对压力的能力。继续保持健康的生活方式和积极的心态，定期关注自己的心理状态。'
            },
            {
                minScore: 26,
                maxScore: 45,
                title: '心理状态基本健康',
                description: '您的心理状态总体良好，但可能在某些方面存在轻度压力或情绪波动。建议您注意休息，适当放松，保持健康的生活习惯，必要时寻求亲友支持。'
            },
            {
                minScore: 46,
                maxScore: 65,
                title: '轻度心理亚健康',
                description: '您可能处于轻度心理亚健康状态，表现为情绪波动、精力不足或睡眠问题。建议您调整生活节奏，增加户外活动，培养健康的兴趣爱好，如情况持续可考虑咨询专业人士。'
            },
            {
                minScore: 66,
                maxScore: 85,
                title: '中度心理亚健康',
                description: '您的心理亚健康状态较为明显，可能影响到日常生活和工作效率。建议您重视心理调节，尝试压力管理技巧，保持良好的作息习惯，并考虑寻求专业心理咨询帮助。'
            },
            {
                minScore: 86,
                maxScore: 100,
                title: '重度心理亚健康',
                description: '您的心理亚健康状态较为严重，已经对您的生活质量产生显著影响。强烈建议您尽快寻求专业心理帮助，同时调整生活方式，必要时可咨询医生的建议。'
            }
        ]
    };

    // 3. 安全注册测试数据（避免覆盖全局对象）
    if (window.TestRegistry) {
        window.TestRegistry.register(testData);
    }

    if (!window.TestDatasets) {
        window.TestDatasets = {};
    }
    window.TestDatasets[testData.id] = testData;
})();