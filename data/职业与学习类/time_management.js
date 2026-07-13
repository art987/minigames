(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'time_management';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '时间管理能力测试',
        description: '本测验将评估您的时间管理能力，涵盖日常计划、优先级设置、工作效率和压力管理等多个方面。',
        category: '职业与学习类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 4,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '您通常如何开始新的一天？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '没有计划，随遇而安', score: 10 },
                    { id: 'q1a2', text: '大致想一下今天要做什么', score: 20 },
                    { id: 'q1a3', text: '查看待办事项清单', score: 30 },
                    { id: 'q1a4', text: '详细规划今日任务和时间安排', score: 40 }
                ]
            },
            {
                id: 'q2',
                text: '当面临多项任务时，您会：',
                multi: false,
                options: [
                    { id: 'q2a1', text: '同时处理多项任务', score: 20 },
                    { id: 'q2a2', text: '先做简单的任务', score: 20 },
                    { id: 'q2a3', text: '按照任务截止时间排序', score: 30 },
                    { id: 'q2a4', text: '根据重要性和紧急性进行优先级排序', score: 40 }
                ]
            },
            {
                id: 'q3',
                text: '您如何处理突然出现的紧急任务？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '立即放下手头工作去处理', score: 10 },
                    { id: 'q3a2', text: '感到焦虑，难以专注', score: 20 },
                    { id: 'q3a3', text: '评估其重要性，再决定是否中断当前工作', score: 30 },
                    { id: 'q3a4', text: '快速调整计划，合理安排处理时间', score: 40 }
                ]
            },
            {
                id: 'q4',
                text: '您是否经常为任务设定明确的截止时间？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '很少，通常最后一刻才完成', score: 10 },
                    { id: 'q4a2', text: '偶尔，但经常不能按时完成', score: 20 },
                    { id: 'q4a3', text: '经常设定，但有时需要调整', score: 30 },
                    { id: 'q4a4', text: '总是设定明确的截止时间并努力遵守', score: 40 }
                ]
            },
            {
                id: 'q5',
                text: '在工作/学习中，您如何应对干扰？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '很容易被干扰，经常中断', score: 10 },
                    { id: 'q5a2', text: '尝试抵抗，但效果不佳', score: 20 },
                    { id: 'q5a3', text: '设置时间段专注工作，之后处理干扰', score: 30 },
                    { id: 'q5a4', text: '主动减少干扰源，保持专注', score: 40 }
                ]
            },
            {
                id: 'q6',
                text: '您是否会定期回顾和评估自己的时间使用效率？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '从不，觉得没必要', score: 10 },
                    { id: 'q6a2', text: '偶尔，但没有系统方法', score: 20 },
                    { id: 'q6a3', text: '定期回顾，但缺乏改进措施', score: 30 },
                    { id: 'q6a4', text: '定期评估并调整时间管理策略', score: 40 }
                ]
            },
            {
                id: 'q7',
                text: '当任务比预期时间长时，您会：',
                multi: false,
                options: [
                    { id: 'q7a1', text: '感到沮丧，拖延完成', score: 10 },
                    { id: 'q7a2', text: '延长工作时间，直到完成', score: 20 },
                    { id: 'q7a3', text: '重新评估任务，调整计划', score: 30 },
                    { id: 'q7a4', text: '分析原因，改进时间估计方法', score: 40 }
                ]
            },
            {
                id: 'q8',
                text: '您如何处理自己不喜欢但必须完成的任务？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '拖延到最后一刻', score: 10 },
                    { id: 'q8a2', text: '尽快完成，以便摆脱', score: 20 },
                    { id: 'q8a3', text: '将其分解为小任务逐步完成', score: 30 },
                    { id: 'q8a4', text: '设定奖励机制，提高完成动力', score: 40 }
                ]
            },
            {
                id: 'q9',
                text: '您是否会为自己预留休息和放松的时间？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '很少，工作/学习优先', score: 10 },
                    { id: 'q9a2', text: '视情况而定，没有固定安排', score: 20 },
                    { id: 'q9a3', text: '有时会安排，但经常被工作占用', score: 30 },
                    { id: 'q9a4', text: '将休息时间纳入计划，保持工作生活平衡', score: 40 }
                ]
            },
            {
                id: 'q10',
                text: '您认为有效的时间管理最重要的是什么？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '提高工作速度', score: 20 },
                    { id: 'q10a2', text: '减少休闲时间', score: 10 },
                    { id: 'q10a3', text: '合理规划和优先级排序', score: 40 },
                    { id: 'q10a4', text: '学会拒绝额外任务', score: 30 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '时间管理初级阶段',
                description: '您的时间管理能力处于初级阶段，缺乏有效的规划和组织技巧，经常被任务推着走。',
                suggestions: ['开始使用待办事项清单', '学习区分任务优先级', '尝试设定明确的时间节点']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '时间管理基础阶段',
                description: '您具备基本的时间管理能力，能够完成日常任务，但在面对复杂或突发情况时仍需改进。',
                suggestions: ['制定每日/每周计划', '学习应对干扰的方法', '尝试使用时间管理工具']
            },
            {
                minScore: 61,
                maxScore: 75,
                title: '时间管理良好阶段',
                description: '您的时间管理能力处于良好水平，能够有效地规划和执行任务，工作效率较高。',
                suggestions: ['优化任务处理流程', '进一步提高专注度', '学习更高级的时间管理技巧']
            },
            {
                minScore: 76,
                maxScore: 90,
                title: '时间管理优秀阶段',
                description: '您拥有优秀的时间管理能力，能够在复杂环境中保持高效率，平衡工作与生活。',
                suggestions: ['培养长期规划能力', '分享您的时间管理经验', '持续优化和调整策略']
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '时间管理卓越阶段',
                description: '您是时间管理的大师，能够充分利用每一分钟，在高效率工作的同时保持身心平衡。',
                suggestions: ['帮助他人提高时间管理能力', '探索更先进的时间管理理念', '将时间管理与个人目标更好地结合']
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