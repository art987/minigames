(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'happiness_index';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '幸福感指数测试',
        description: '这个测试将帮助你评估当前的幸福感水平，涵盖生活满意度、情绪状态、人际关系等多个维度。请根据实际感受诚实回答以下问题。',
        category: '心理测评类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 3,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '总体而言，你对自己的生活感到满意吗？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '非常不满意', score: 1 },
                    { id: 'q1a2', text: '不太满意', score: 4 },
                    { id: 'q1a3', text: '一般', score: 7 },
                    { id: 'q1a4', text: '比较满意', score: 10 },
                    { id: 'q1a5', text: '非常满意', score: 10 }
                ]
            },
            {
                id: 'q2',
                text: '过去一周内，你感到快乐的频率如何？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '几乎没有', score: 1 },
                    { id: 'q2a2', text: '很少', score: 4 },
                    { id: 'q2a3', text: '有时', score: 7 },
                    { id: 'q2a4', text: '经常', score: 10 },
                    { id: 'q2a5', text: '几乎每天', score: 10 }
                ]
            },
            {
                id: 'q3',
                text: '你对自己的人际关系感到满足吗？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '非常不满足', score: 1 },
                    { id: 'q3a2', text: '不太满足', score: 4 },
                    { id: 'q3a3', text: '一般', score: 7 },
                    { id: 'q3a4', text: '比较满足', score: 10 },
                    { id: 'q3a5', text: '非常满足', score: 10 }
                ]
            },
            {
                id: 'q4',
                text: '你是否经常感到生活有意义和目的？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '几乎没有', score: 1 },
                    { id: 'q4a2', text: '很少', score: 4 },
                    { id: 'q4a3', text: '有时', score: 7 },
                    { id: 'q4a4', text: '经常', score: 10 },
                    { id: 'q4a5', text: '总是', score: 10 }
                ]
            },
            {
                id: 'q5',
                text: '你对自己的健康状况满意吗？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '非常不满意', score: 1 },
                    { id: 'q5a2', text: '不太满意', score: 4 },
                    { id: 'q5a3', text: '一般', score: 7 },
                    { id: 'q5a4', text: '比较满意', score: 10 },
                    { id: 'q5a5', text: '非常满意', score: 10 }
                ]
            },
            {
                id: 'q6',
                text: '你是否有足够的时间做自己喜欢的事情？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '几乎没有', score: 1 },
                    { id: 'q6a2', text: '很少', score: 4 },
                    { id: 'q6a3', text: '有时', score: 7 },
                    { id: 'q6a4', text: '经常', score: 10 },
                    { id: 'q6a5', text: '总是', score: 10 }
                ]
            },
            {
                id: 'q7',
                text: '你对自己的经济状况感到安心吗？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '非常不安心', score: 1 },
                    { id: 'q7a2', text: '不太安心', score: 4 },
                    { id: 'q7a3', text: '一般', score: 7 },
                    { id: 'q7a4', text: '比较安心', score: 10 },
                    { id: 'q7a5', text: '非常安心', score: 10 }
                ]
            },
            {
                id: 'q8',
                text: '你是否经常对未来充满希望？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '几乎没有', score: 1 },
                    { id: 'q8a2', text: '很少', score: 4 },
                    { id: 'q8a3', text: '有时', score: 7 },
                    { id: 'q8a4', text: '经常', score: 10 },
                    { id: 'q8a5', text: '总是', score: 10 }
                ]
            },
            {
                id: 'q9',
                text: '你是否容易感到压力或焦虑？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '总是', score: 1 },
                    { id: 'q9a2', text: '经常', score: 4 },
                    { id: 'q9a3', text: '有时', score: 7 },
                    { id: 'q9a4', text: '很少', score: 10 },
                    { id: 'q9a5', text: '几乎没有', score: 10 }
                ]
            },
            {
                id: 'q10',
                text: '综合各方面因素，你认为自己是一个幸福的人吗？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '完全不是', score: 1 },
                    { id: 'q10a2', text: '不太是', score: 4 },
                    { id: 'q10a3', text: '说不准', score: 7 },
                    { id: 'q10a4', text: '比较是', score: 10 },
                    { id: 'q10a5', text: '完全是', score: 10 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 20,
                title: '幸福感较低',
                description: '你目前的幸福感水平较低，可能在生活中遇到了一些挑战或困难。这种状态是暂时的，重要的是识别问题并采取积极的行动来改善。',
                suggestions: ['寻求支持，与亲友分享感受', '尝试从小事做起，培养积极习惯', '考虑咨询专业人士的帮助', '关注当下，寻找生活中的小确幸']
            },
            {
                minScore: 21,
                maxScore: 40,
                title: '幸福感一般',
                description: '你的幸福感处于中等水平，生活中有开心的时候，也有感到平淡或压力的时刻。这是大多数人的常态，有很大的提升空间。',
                suggestions: ['设定小目标，增加成就感', '培养感恩的习惯', '增加社交活动，丰富人际关系', '尝试新事物，拓展生活体验']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '幸福感良好',
                description: '你拥有良好的幸福感水平，对生活总体感到满意。你能够从日常生活中获取快乐，但仍有一些方面可以进一步提升。',
                suggestions: ['继续保持积极的生活态度', '关注身心健康，保持平衡', '深化人际关系，分享快乐', '设定有意义的长期目标']
            },
            {
                minScore: 61,
                maxScore: 80,
                title: '幸福感较高',
                description: '你拥有较高的幸福感水平，对生活各方面都感到比较满意。你善于发现生活中的美好，并能够积极应对挑战。',
                suggestions: ['分享你的积极心态，影响他人', '寻找更多自我成长的机会', '参与志愿服务，体验给予的快乐', '记录幸福瞬间，强化积极体验']
            },
            {
                minScore: 81,
                maxScore: 100,
                title: '幸福感极高',
                description: '你拥有极高的幸福感水平，是真正的"幸福达人"。你对生活充满感恩和满足，能够在各种情境中保持积极的心态。',
                suggestions: ['将你的幸福秘诀分享给他人', '成为他人的支持者和鼓励者', '继续探索生活的意义和价值', '帮助更多人提升幸福感']
            }
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