(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'career_stress_resilience';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '职业抗压指数测试',
        description: '本测验将评估您的职业抗压能力，涵盖压力感知、应对策略、情绪调节和恢复能力等多个方面。',
        category: '职业与学习类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 4,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '当工作任务超出您的能力范围时，您通常会：',
                multi: false,
                options: [
                    { id: 'q1a1', text: '感到焦虑和不知所措', score: 10 },
                    { id: 'q1a2', text: '尝试但容易放弃', score: 20 },
                    { id: 'q1a3', text: '寻求帮助并制定计划', score: 30 },
                    { id: 'q1a4', text: '视为挑战并积极寻找解决方案', score: 40 }
                ]
            },
            {
                id: 'q2',
                text: '在工作中遇到挫折或失败时，您会：',
                multi: false,
                options: [
                    { id: 'q2a1', text: '情绪低落，难以振作', score: 10 },
                    { id: 'q2a2', text: '短暂沮丧后继续工作', score: 20 },
                    { id: 'q2a3', text: '分析原因并从中学习', score: 30 },
                    { id: 'q2a4', text: '将其视为成长的机会', score: 40 }
                ]
            },
            {
                id: 'q3',
                text: '当工作压力大时，您的睡眠质量会受到多大影响？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '严重影响，经常失眠', score: 10 },
                    { id: 'q3a2', text: '有一定影响，睡眠变浅', score: 20 },
                    { id: 'q3a3', text: '影响较小，基本能保持正常睡眠', score: 30 },
                    { id: 'q3a4', text: '几乎没有影响，能正常入睡', score: 40 }
                ]
            },
            {
                id: 'q4',
                text: '面对同事间的竞争或冲突，您会：',
                multi: false,
                options: [
                    { id: 'q4a1', text: '感到压力很大，避免冲突', score: 10 },
                    { id: 'q4a2', text: '尽量保持中立', score: 20 },
                    { id: 'q4a3', text: '尝试沟通解决问题', score: 30 },
                    { id: 'q4a4', text: '将竞争视为动力，积极应对', score: 40 }
                ]
            },
            {
                id: 'q5',
                text: '当需要在短时间内完成多项任务时，您会：',
                multi: false,
                options: [
                    { id: 'q5a1', text: '感到慌乱，效率低下', score: 10 },
                    { id: 'q5a2', text: '按部就班完成，可能超时', score: 20 },
                    { id: 'q5a3', text: '制定计划，优先处理重要任务', score: 30 },
                    { id: 'q5a4', text: '高效分配时间，按时完成', score: 40 }
                ]
            },
            {
                id: 'q6',
                text: '您是否有定期进行减压活动的习惯？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '从不，工作太忙', score: 10 },
                    { id: 'q6a2', text: '偶尔，但没有规律', score: 20 },
                    { id: 'q6a3', text: '有，但经常被工作打断', score: 30 },
                    { id: 'q6a4', text: '有，并且坚持执行', score: 40 }
                ]
            },
            {
                id: 'q7',
                text: '当领导对您的工作提出批评时，您会：',
                multi: false,
                options: [
                    { id: 'q7a1', text: '感到沮丧，自信心受挫', score: 10 },
                    { id: 'q7a2', text: '表面接受，内心抵触', score: 20 },
                    { id: 'q7a3', text: '认真反思，努力改进', score: 30 },
                    { id: 'q7a4', text: '视为提升的机会，主动寻求反馈', score: 40 }
                ]
            },
            {
                id: 'q8',
                text: '在工作中，您对变化的适应能力如何？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '很难适应，感到焦虑', score: 10 },
                    { id: 'q8a2', text: '需要时间适应', score: 20 },
                    { id: 'q8a3', text: '能够适应，但会有短暂不适', score: 30 },
                    { id: 'q8a4', text: '快速适应，并能抓住新机遇', score: 40 }
                ]
            },
            {
                id: 'q9',
                text: '当工作压力持续一段时间后，您会：',
                multi: false,
                options: [
                    { id: 'q9a1', text: '感到身心疲惫，效率下降', score: 10 },
                    { id: 'q9a2', text: '勉强支撑，但感到压抑', score: 20 },
                    { id: 'q9a3', text: '调整状态，保持工作效率', score: 30 },
                    { id: 'q9a4', text: '保持积极心态，寻找动力来源', score: 40 }
                ]
            },
            {
                id: 'q10',
                text: '您认为职业抗压能力最重要的因素是：',
                multi: false,
                options: [
                    { id: 'q10a1', text: '工作能力和经验', score: 20 },
                    { id: 'q10a2', text: '良好的人际关系', score: 20 },
                    { id: 'q10a3', text: '积极的心态和应对策略', score: 40 },
                    { id: 'q10a4', text: '平衡的工作和生活', score: 30 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '职业抗压能力基础阶段',
                description: '您的职业抗压能力处于基础阶段，面对工作压力时容易产生负面情绪，缺乏有效的应对策略。',
                suggestions: ['学习基本的压力管理技巧', '建立健康的工作生活边界', '寻求专业帮助或指导']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '职业抗压能力发展阶段',
                description: '您具备一定的职业抗压能力，能够应对一般的工作压力，但在面对重大挑战时仍需提升。',
                suggestions: ['学习情绪调节技巧', '培养解决问题的能力', '建立支持系统']
            },
            {
                minScore: 61,
                maxScore: 75,
                title: '职业抗压能力良好阶段',
                description: '您的职业抗压能力处于良好水平，能够有效应对工作中的各种压力，保持较高的工作效率。',
                suggestions: ['进一步优化压力管理策略', '培养心理韧性', '帮助团队成员应对压力']
            },
            {
                minScore: 76,
                maxScore: 90,
                title: '职业抗压能力优秀阶段',
                description: '您拥有优秀的职业抗压能力，能够在高压环境中保持冷静和高效，将压力转化为动力。',
                suggestions: ['分享您的经验和技巧', '探索更高级的压力管理方法', '帮助组织建立健康的工作环境']
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '职业抗压能力卓越阶段',
                description: '您的职业抗压能力达到了卓越水平，能够在任何挑战面前保持积极心态，是团队中的稳定力量。',
                suggestions: ['成为压力管理的专家', '指导他人提升抗压能力', '推动组织文化的积极变革']
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