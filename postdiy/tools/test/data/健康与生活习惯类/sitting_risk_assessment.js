(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'sitting_risk_assessment';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '久坐风险评估',
        description: '通过这个测试评估您的久坐习惯对健康可能带来的风险',
        category: '健康与生活习惯类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 5,
        cover: testId + '.jpg',
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '您每天坐着工作或学习的时间大约是？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '少于2小时', score: 0 },
                    { id: 'q1a2', text: '2-4小时', score: 5 },
                    { id: 'q1a3', text: '4-6小时', score: 10 },
                    { id: 'q1a4', text: '6-8小时', score: 15 },
                    { id: 'q1a5', text: '8小时以上', score: 20 }
                ]
            },
            {
                id: 'q2',
                text: '您每坐多长时间会起身活动一次？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '30分钟以内', score: 0 },
                    { id: 'q2a2', text: '30-60分钟', score: 5 },
                    { id: 'q2a3', text: '1-2小时', score: 10 },
                    { id: 'q2a4', text: '2-4小时', score: 15 },
                    { id: 'q2a5', text: '几乎不起身活动', score: 20 }
                ]
            },
            {
                id: 'q3',
                text: '您平均每天的步数大约是？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '8000步以上', score: 0 },
                    { id: 'q3a2', text: '6000-8000步', score: 5 },
                    { id: 'q3a3', text: '4000-6000步', score: 10 },
                    { id: 'q3a4', text: '2000-4000步', score: 15 },
                    { id: 'q3a5', text: '2000步以下', score: 20 }
                ]
            },
            {
                id: 'q4',
                text: '您是否有定时起身活动的习惯？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '有，严格遵守', score: 0 },
                    { id: 'q4a2', text: '有，但偶尔忘记', score: 5 },
                    { id: 'q4a3', text: '有时候会，但没有规律', score: 10 },
                    { id: 'q4a4', text: '很少，但知道应该活动', score: 15 },
                    { id: 'q4a5', text: '没有，通常一直坐着', score: 20 }
                ]
            },
            {
                id: 'q5',
                text: '您在坐下时的姿势如何？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '保持正确坐姿，腰背挺直', score: 0 },
                    { id: 'q5a2', text: '大部分时间坐姿良好', score: 5 },
                    { id: 'q5a3', text: '一般，有时会弯腰驼背', score: 10 },
                    { id: 'q5a4', text: '经常弯腰驼背或翘二郎腿', score: 15 },
                    { id: 'q5a5', text: '几乎总是坐姿不正确', score: 20 }
                ]
            },
            {
                id: 'q6',
                text: '您是否因久坐出现过身体不适？（如背痛、颈肩僵硬、腿部肿胀等）',
                multi: false,
                options: [
                    { id: 'q6a1', text: '从未出现', score: 0 },
                    { id: 'q6a2', text: '很少出现，轻微不适', score: 5 },
                    { id: 'q6a3', text: '有时出现，中度不适', score: 10 },
                    { id: 'q6a4', text: '经常出现，明显不适', score: 15 },
                    { id: 'q6a5', text: '频繁出现，严重不适', score: 20 }
                ]
            },
            {
                id: 'q7',
                text: '您的工作/学习环境是否支持健康坐姿？（如可调节座椅、站立工作台等）',
                multi: false,
                options: [
                    { id: 'q7a1', text: '完全支持，有良好的办公设备', score: 0 },
                    { id: 'q7a2', text: '基本支持，有合适的座椅', score: 5 },
                    { id: 'q7a3', text: '一般，有普通座椅', score: 10 },
                    { id: 'q7a4', text: '较差，座椅不舒适', score: 15 },
                    { id: 'q7a5', text: '很差，没有合适的工作环境', score: 20 }
                ]
            },
            {
                id: 'q8',
                text: '您下班后/学习后的活动量如何？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '经常运动，活动量大', score: 0 },
                    { id: 'q8a2', text: '有规律运动，活动量适中', score: 5 },
                    { id: 'q8a3', text: '偶尔运动，活动量一般', score: 10 },
                    { id: 'q8a4', text: '很少运动，活动量较少', score: 15 },
                    { id: 'q8a5', text: '几乎不运动，活动量极少', score: 20 }
                ]
            },
            {
                id: 'q9',
                text: '您是否意识到久坐对健康的危害？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '非常清楚，并有意识避免', score: 0 },
                    { id: 'q9a2', text: '比较清楚，会尽量注意', score: 5 },
                    { id: 'q9a3', text: '一般了解，但不太在意', score: 10 },
                    { id: 'q9a4', text: '不太清楚，偶尔听说', score: 15 },
                    { id: 'q9a5', text: '完全不清楚', score: 20 }
                ]
            },
            {
                id: 'q10',
                text: '您是否有计划减少久坐时间，增加活动量？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '已有计划并在执行', score: 0 },
                    { id: 'q10a2', text: '已有计划，准备开始', score: 5 },
                    { id: 'q10a3', text: '有想法，但还没计划', score: 10 },
                    { id: 'q10a4', text: '想过，但不知道如何开始', score: 15 },
                    { id: 'q10a5', text: '没有，觉得不需要改变', score: 20 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 30,
                title: '久坐风险低',
                description: '恭喜您！您的生活习惯非常健康，久坐风险很低。继续保持良好的活动习惯对您的健康非常有益。',
                suggestions: ['继续保持定期活动的好习惯', '注意保持正确坐姿', '鼓励身边人也养成健康的生活方式', '定期体检，关注健康状况']
            },
            {
                minScore: 31,
                maxScore: 50,
                title: '久坐风险较低',
                description: '您的久坐习惯总体良好，但仍有一些改进空间。稍微调整一下生活方式，可以进一步降低久坐风险。',
                suggestions: ['设置定时器提醒自己定时起身活动', '增加日常活动量，如步行上下楼梯', '注意保持正确坐姿', '考虑在工作间隙做一些简单的伸展运动']
            },
            {
                minScore: 51,
                maxScore: 75,
                title: '久坐风险中等',
                description: '您存在一定程度的久坐问题，这可能已经开始影响您的健康。需要引起重视并采取积极措施减少久坐时间。',
                suggestions: ['制定详细的活动计划，每30分钟起身活动一次', '考虑使用站立工作台或可调节座椅', '每天进行至少30分钟中等强度的运动', '学习正确的坐姿和办公室伸展运动', '保持充足的水分摄入，促进起身活动']
            },
            {
                minScore: 76,
                maxScore: 100,
                title: '久坐风险较高',
                description: '您存在较为严重的久坐问题，这已经对您的健康造成了明显影响。建议立即采取行动，改变久坐习惯，保护身体健康。',
                suggestions: ['咨询医生或健康专家，制定个性化的活动计划', '逐步减少久坐时间，增加日常活动量', '考虑调整工作环境，使用更健康的办公设备', '建立规律的运动习惯，每天至少运动1小时', '寻求家人和同事的支持与监督']
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