(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'intimacy_satisfaction';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '亲密关系满意度自测',
        description: '本测试帮助你了解自己在亲密关系中的感受和满意程度，涵盖沟通、情感支持、信任、冲突处理等多个维度。',
        category: '爱情与人际关系类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 3,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '当我有心事时，我的伴侣通常会耐心听我说完。',
                multi: false,
                options: [
                    { id: 'q1a1', text: '几乎总是', score: 10 },
                    { id: 'q1a2', text: '大多数时候', score: 8 },
                    { id: 'q1a3', text: '偶尔', score: 5 },
                    { id: 'q1a4', text: '几乎不会', score: 2 }
                ]
            },
            {
                id: 'q2',
                text: '我和伴侣在生活目标上的一致性让我感到满意。',
                multi: false,
                options: [
                    { id: 'q2a1', text: '非常同意', score: 10 },
                    { id: 'q2a2', text: '同意', score: 7 },
                    { id: 'q2a3', text: '不太同意', score: 4 },
                    { id: 'q2a4', text: '完全不同意', score: 1 }
                ]
            },
            {
                id: 'q3',
                text: '在重要决定上，我的伴侣会考虑我的意见。',
                multi: false,
                options: [
                    { id: 'q3a1', text: '几乎总是', score: 10 },
                    { id: 'q3a2', text: '大多数时候', score: 8 },
                    { id: 'q3a3', text: '偶尔', score: 5 },
                    { id: 'q3a4', text: '几乎不会', score: 2 }
                ]
            },
            {
                id: 'q4',
                text: '当我遇到困难时，我相信伴侣会支持我。',
                multi: false,
                options: [
                    { id: 'q4a1', text: '非常相信', score: 10 },
                    { id: 'q4a2', text: '相信', score: 7 },
                    { id: 'q4a3', text: '不太相信', score: 4 },
                    { id: 'q4a4', text: '完全不相信', score: 1 }
                ]
            },
            {
                id: 'q5',
                text: '我们能够以和平的方式解决分歧和冲突。',
                multi: false,
                options: [
                    { id: 'q5a1', text: '几乎总是', score: 10 },
                    { id: 'q5a2', text: '大多数时候', score: 8 },
                    { id: 'q5a3', text: '偶尔', score: 5 },
                    { id: 'q5a4', text: '几乎不会', score: 2 }
                ]
            },
            {
                id: 'q6',
                text: '我对我们之间的亲密互动感到满足。',
                multi: false,
                options: [
                    { id: 'q6a1', text: '非常满足', score: 10 },
                    { id: 'q6a2', text: '满足', score: 7 },
                    { id: 'q6a3', text: '不太满足', score: 4 },
                    { id: 'q6a4', text: '完全不满足', score: 1 }
                ]
            },
            {
                id: 'q7',
                text: '我觉得伴侣真正理解和接纳我的缺点。',
                multi: false,
                options: [
                    { id: 'q7a1', text: '非常同意', score: 10 },
                    { id: 'q7a2', text: '同意', score: 7 },
                    { id: 'q7a3', text: '不太同意', score: 4 },
                    { id: 'q7a4', text: '完全不同意', score: 1 }
                ]
            },
            {
                id: 'q8',
                text: '我们有足够的共同兴趣和活动。',
                multi: false,
                options: [
                    { id: 'q8a1', text: '非常足够', score: 10 },
                    { id: 'q8a2', text: '足够', score: 7 },
                    { id: 'q8a3', text: '不太足够', score: 4 },
                    { id: 'q8a4', text: '完全不足够', score: 1 }
                ]
            },
            {
                id: 'q9',
                text: '我对这段关系的未来感到乐观。',
                multi: false,
                options: [
                    { id: 'q9a1', text: '非常乐观', score: 10 },
                    { id: 'q9a2', text: '乐观', score: 7 },
                    { id: 'q9a3', text: '不太乐观', score: 4 },
                    { id: 'q9a4', text: '完全不乐观', score: 1 }
                ]
            },
            {
                id: 'q10',
                text: '总体而言，我对这段关系感到满意。',
                multi: false,
                options: [
                    { id: 'q10a1', text: '非常满意', score: 10 },
                    { id: 'q10a2', text: '满意', score: 7 },
                    { id: 'q10a3', text: '不太满意', score: 4 },
                    { id: 'q10a4', text: '完全不满意', score: 1 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '关系满意度较低',
                description: '你的测试结果显示当前亲密关系中的满意度较低。这可能意味着你在关系中的需求没有得到充分满足，或者存在一些未解决的问题影响了你的感受。',
                suggestions: [
                    '尝试与伴侣坦诚沟通你的感受和需求',
                    '考虑共同参与关系咨询或辅导',
                    '反思关系中哪些方面最需要改进',
                    '关注自己的感受，思考这段关系是否真的适合你'
                ]
            },
            {
                minScore: 41,
                maxScore: 75,
                title: '关系满意度中等',
                description: '你的测试结果显示当前亲密关系中的满意度处于中等水平。关系中存在一些积极因素，但也有改进空间。',
                suggestions: [
                    '加强与伴侣的日常沟通和互动',
                    '共同设定关系目标，增进彼此理解',
                    '多关注关系中的积极面，同时积极解决存在的问题',
                    '定期安排二人世界，保持关系的新鲜感'
                ]
            },
            {
                minScore: 76,
                maxScore: 100,
                title: '关系满意度较高',
                description: '恭喜！你的测试结果显示当前亲密关系中的满意度较高。这表明你们之间建立了良好的沟通、信任和相互支持的基础。',
                suggestions: [
                    '继续保持良好的沟通习惯和相互支持',
                    '定期回顾关系进展，及时解决小问题',
                    '共同探索新的兴趣和活动，丰富关系内涵',
                    '表达感恩和欣赏，让伴侣感受到你的珍视'
                ]
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