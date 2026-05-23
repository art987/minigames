(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'procrastination_level';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '拖延症程度测验',
        description: '这个测试将帮助你了解自己的拖延习惯和程度，以便更好地管理时间和提高效率。请根据实际情况回答以下问题。',
        category: '心理测评类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 3,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '当有重要任务需要完成时，你通常会怎么做？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '立即开始，提前完成', score: 1 },
                    { id: 'q1a2', text: '计划好时间，按部就班完成', score: 4 },
                    { id: 'q1a3', text: '拖到最后几天才开始', score: 7 },
                    { id: 'q1a4', text: '直到最后一刻才匆忙完成', score: 10 }
                ]
            },
            {
                id: 'q2',
                text: '面对不喜欢但必须做的事情，你会？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '先完成它，再做喜欢的事', score: 2 },
                    { id: 'q2a2', text: '分配固定时间处理', score: 5 },
                    { id: 'q2a3', text: '尽量推迟，直到不得不做', score: 8 },
                    { id: 'q2a4', text: '完全回避，能拖则拖', score: 10 }
                ]
            },
            {
                id: 'q3',
                text: '你有制定每日计划的习惯吗？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '每天都制定详细计划并严格执行', score: 1 },
                    { id: 'q3a2', text: '偶尔制定计划，但执行一般', score: 4 },
                    { id: 'q3a3', text: '很少制定计划，凭感觉做事', score: 7 },
                    { id: 'q3a4', text: '从不制定计划，随性而为', score: 10 }
                ]
            },
            {
                id: 'q4',
                text: '当任务截止日期临近时，你的感受是？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '平静，因为早已完成', score: 1 },
                    { id: 'q4a2', text: '有点压力，但仍能有序完成', score: 4 },
                    { id: 'q4a3', text: '焦虑，但还能在最后期限前完成', score: 7 },
                    { id: 'q4a4', text: '极度焦虑，经常错过截止日期', score: 10 }
                ]
            },
            {
                id: 'q5',
                text: '你如何看待"最后一分钟的效率最高"这句话？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '完全不认同，提前完成更高效', score: 1 },
                    { id: 'q5a2', text: '部分认同，但不喜欢这种方式', score: 5 },
                    { id: 'q5a3', text: '比较认同，压力下效率确实高', score: 8 },
                    { id: 'q5a4', text: '完全认同，这是我的工作方式', score: 10 }
                ]
            },
            {
                id: 'q6',
                text: '你是否经常因为拖延而影响工作或学习质量？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '几乎从不', score: 1 },
                    { id: 'q6a2', text: '偶尔会有', score: 4 },
                    { id: 'q6a3', text: '经常如此', score: 7 },
                    { id: 'q6a4', text: '总是这样', score: 10 }
                ]
            },
            {
                id: 'q7',
                text: '当你开始一项任务时，你会？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '专注完成，不被其他事情干扰', score: 1 },
                    { id: 'q7a2', text: '先处理部分，偶尔分心', score: 5 },
                    { id: 'q7a3', text: '经常被其他事情吸引，需要多次返回', score: 8 },
                    { id: 'q7a4', text: '很容易分心，几乎无法专注', score: 10 }
                ]
            },
            {
                id: 'q8',
                text: '你对拖延的态度是？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '非常反感，努力避免', score: 1 },
                    { id: 'q8a2', text: '不喜欢，但偶尔会有', score: 5 },
                    { id: 'q8a3', text: '无所谓，觉得很正常', score: 8 },
                    { id: 'q8a4', text: '认为拖延是一种生活方式', score: 10 }
                ]
            },
            {
                id: 'q9',
                text: '你是否尝试过改善自己的拖延习惯？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '经常尝试并能有效改善', score: 1 },
                    { id: 'q9a2', text: '偶尔尝试，但效果有限', score: 5 },
                    { id: 'q9a3', text: '想过但从未真正尝试', score: 8 },
                    { id: 'q9a4', text: '从未想过要改善', score: 10 }
                ]
            },
            {
                id: 'q10',
                text: '在空闲时间，你更倾向于？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '提前完成未来的任务', score: 1 },
                    { id: 'q10a2', text: '做计划内的休闲活动', score: 4 },
                    { id: 'q10a3', text: '做任何能拖延任务的事情', score: 7 },
                    { id: 'q10a4', text: '完全放松，不管任何任务', score: 10 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 20,
                title: '高效行动者',
                description: '你几乎没有拖延倾向，是一个非常高效的行动者。你善于规划时间，能够及时完成任务，并且很少受到拖延的困扰。这种特质让你在工作和学习中表现出色。',
                suggestions: ['继续保持你的高效习惯', '帮助身边有拖延倾向的朋友', '注意不要因为追求效率而过度压力']
            },
            {
                minScore: 21,
                maxScore: 40,
                title: '轻微拖延者',
                description: '你有轻微的拖延倾向，但这并不影响你的整体表现。你能够在大部分情况下按时完成任务，只是偶尔会有拖延的情况。这种程度的拖延是正常的，不必过于担心。',
                suggestions: ['尝试更详细的时间规划', '学会识别并避免拖延的触发因素', '建立更明确的优先级']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '中度拖延者',
                description: '你有中等程度的拖延倾向，这可能已经开始影响你的工作和学习效率。你经常会推迟任务，直到最后一刻才开始，但通常仍能在截止日期前完成。',
                suggestions: ['设定更具体的小目标', '使用番茄工作法等时间管理技巧', '建立奖励机制来激励自己']
            },
            {
                minScore: 61,
                maxScore: 80,
                title: '严重拖延者',
                description: '你的拖延倾向比较严重，已经明显影响到了你的生活和工作。你经常把任务拖到最后一刻，甚至有时会错过截止日期，这可能导致你承受更大的压力。',
                suggestions: ['寻求专业帮助或加入支持小组', '分解任务并设定明确的中间截止日期', '移除干扰源，创造专注的环境']
            },
            {
                minScore: 81,
                maxScore: 100,
                title: '慢性拖延者',
                description: '你有非常严重的拖延问题，几乎已经成为一种习惯。这种情况可能导致你在很多方面都面临困难，包括工作、学习和人际关系。建议你尽快采取行动改善这种状况。',
                suggestions: ['考虑咨询心理专家', '制定详细的每日计划并严格执行', '逐步改变习惯，从小事做起', '寻求朋友或家人的监督和支持']
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