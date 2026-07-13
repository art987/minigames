(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'leadership_index';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '领导力指数测验',
        description: '本测验将评估您的领导力水平，涵盖团队管理、决策能力、沟通协调等多个维度。',
        category: '职业与学习类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 3,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '在团队面临挑战时，您更倾向于：',
                multi: false,
                options: [
                    { id: 'q1a1', text: '独自制定解决方案', score: 20 },
                    { id: 'q1a2', text: '与核心成员讨论后决定', score: 30 },
                    { id: 'q1a3', text: '组织团队共同头脑风暴', score: 40 },
                    { id: 'q1a4', text: '让团队成员自行解决', score: 10 }
                ]
            },
            {
                id: 'q2',
                text: '当团队成员之间发生冲突时，您通常会：',
                multi: false,
                options: [
                    { id: 'q2a1', text: '立即介入并裁决', score: 20 },
                    { id: 'q2a2', text: '引导双方自行协商解决', score: 40 },
                    { id: 'q2a3', text: '将冲突双方暂时分开', score: 30 },
                    { id: 'q2a4', text: '暂时忽略，希望自然化解', score: 10 }
                ]
            },
            {
                id: 'q3',
                text: '在设定团队目标时，您认为最重要的是：',
                multi: false,
                options: [
                    { id: 'q3a1', text: '目标的挑战性', score: 30 },
                    { id: 'q3a2', text: '目标的可实现性', score: 30 },
                    { id: 'q3a3', text: '与团队成员共同制定', score: 40 },
                    { id: 'q3a4', text: '符合上级要求', score: 20 }
                ]
            },
            {
                id: 'q4',
                text: '对于团队成员的错误，您通常会：',
                multi: false,
                options: [
                    { id: 'q4a1', text: '严厉批评以避免再次发生', score: 10 },
                    { id: 'q4a2', text: '私下沟通并提供改进建议', score: 40 },
                    { id: 'q4a3', text: '在团队会议上公开讨论', score: 20 },
                    { id: 'q4a4', text: '视若无睹以维护关系', score: 10 }
                ]
            },
            {
                id: 'q5',
                text: '您如何激励团队成员？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '提供物质奖励', score: 20 },
                    { id: 'q5a2', text: '给予公开表扬和认可', score: 30 },
                    { id: 'q5a3', text: '提供个人成长机会', score: 40 },
                    { id: 'q5a4', text: '设定明确的奖惩制度', score: 30 }
                ]
            },
            {
                id: 'q6',
                text: '在决策过程中，您更注重：',
                multi: false,
                options: [
                    { id: 'q6a1', text: '速度和效率', score: 30 },
                    { id: 'q6a2', text: '全面性和准确性', score: 30 },
                    { id: 'q6a3', text: '团队共识', score: 40 },
                    { id: 'q6a4', text: '个人判断', score: 20 }
                ]
            },
            {
                id: 'q7',
                text: '您如何处理团队中的不同意见？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '坚持自己的观点', score: 10 },
                    { id: 'q7a2', text: '认真倾听并分析', score: 40 },
                    { id: 'q7a3', text: '寻求折中的方案', score: 30 },
                    { id: 'q7a4', text: '倾向于多数人的意见', score: 20 }
                ]
            },
            {
                id: 'q8',
                text: '在向下属分配任务时，您通常会：',
                multi: false,
                options: [
                    { id: 'q8a1', text: '详细说明每一步骤', score: 20 },
                    { id: 'q8a2', text: '明确目标和截止时间', score: 40 },
                    { id: 'q8a3', text: '给予充分自主权', score: 30 },
                    { id: 'q8a4', text: '根据个人喜好分配', score: 10 }
                ]
            },
            {
                id: 'q9',
                text: '您如何建立团队凝聚力？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '组织团队建设活动', score: 30 },
                    { id: 'q9a2', text: '培养共同的价值观', score: 40 },
                    { id: 'q9a3', text: '设定共同的目标', score: 30 },
                    { id: 'q9a4', text: '建立严格的管理制度', score: 20 }
                ]
            },
            {
                id: 'q10',
                text: '作为领导者，您认为自己最需要具备的能力是：',
                multi: false,
                options: [
                    { id: 'q10a1', text: '专业知识和技能', score: 30 },
                    { id: 'q10a2', text: '沟通和协调能力', score: 40 },
                    { id: 'q10a3', text: '决策和判断能力', score: 30 },
                    { id: 'q10a4', text: '影响力和说服力', score: 30 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '领导力发展阶段',
                description: '您目前的领导力处于发展阶段，在团队管理、决策能力和沟通协调等方面还有较大的提升空间。',
                suggestions: ['主动学习领导力相关知识', '观察优秀领导者的行为模式', '从小团队项目开始锻炼']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '领导力基础阶段',
                description: '您具备基本的领导能力，能够完成一般的团队管理任务，但在复杂情境下的领导表现还有待提升。',
                suggestions: ['加强决策能力训练', '提升冲突管理技巧', '学习激励团队成员的方法']
            },
            {
                minScore: 61,
                maxScore: 75,
                title: '领导力良好阶段',
                description: '您的领导力处于良好水平，能够有效地领导团队完成目标，团队成员对您的领导也较为认可。',
                suggestions: ['进一步提升战略思维能力', '培养团队创新氛围', '优化团队成员的发展路径']
            },
            {
                minScore: 76,
                maxScore: 90,
                title: '领导力优秀阶段',
                description: '您是一位优秀的领导者，具备出色的团队管理能力、决策能力和沟通协调能力，能够带领团队应对各种挑战。',
                suggestions: ['关注团队长期发展', '培养后备领导人才', '持续学习最新的管理理念']
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '领导力卓越阶段',
                description: '您拥有卓越的领导力，不仅能够高效地领导团队完成目标，还能够激发团队成员的潜能，创造卓越的团队绩效。',
                suggestions: ['分享您的领导经验', '参与更具挑战性的项目', '成为行业内的领导力标杆']
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