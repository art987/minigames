(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'stay_up_late_index';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '熬夜指数测验',
        description: '通过这个测试评估您的熬夜习惯和睡眠健康状况',
        category: '健康与生活习惯类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 5,
        cover: testId + '.jpg',
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '您平时晚上通常几点睡觉？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '22:00以前', score: 0 },
                    { id: 'q1a2', text: '22:00-23:00', score: 5 },
                    { id: 'q1a3', text: '23:00-00:00', score: 10 },
                    { id: 'q1a4', text: '00:00-01:00', score: 15 },
                    { id: 'q1a5', text: '01:00以后', score: 20 }
                ]
            },
            {
                id: 'q2',
                text: '您早上通常几点起床？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '06:00以前', score: 15 },
                    { id: 'q2a2', text: '06:00-07:00', score: 10 },
                    { id: 'q2a3', text: '07:00-08:00', score: 5 },
                    { id: 'q2a4', text: '08:00-09:00', score: 10 },
                    { id: 'q2a5', text: '09:00以后', score: 15 }
                ]
            },
            {
                id: 'q3',
                text: '您平均每天的睡眠时间大约是？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '8小时以上', score: 0 },
                    { id: 'q3a2', text: '7-8小时', score: 5 },
                    { id: 'q3a3', text: '6-7小时', score: 10 },
                    { id: 'q3a4', text: '5-6小时', score: 15 },
                    { id: 'q3a5', text: '5小时以下', score: 20 }
                ]
            },
            {
                id: 'q4',
                text: '您每周熬夜（超过23:30睡觉）的天数大约是？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '0天', score: 0 },
                    { id: 'q4a2', text: '1-2天', score: 5 },
                    { id: 'q4a3', text: '3-4天', score: 10 },
                    { id: 'q4a4', text: '5-6天', score: 15 },
                    { id: 'q4a5', text: '7天', score: 20 }
                ]
            },
            {
                id: 'q5',
                text: '您熬夜的主要原因是什么？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '很少熬夜', score: 0 },
                    { id: 'q5a2', text: '工作/学习需要', score: 8 },
                    { id: 'q5a3', text: '娱乐消遣（看手机、追剧等）', score: 12 },
                    { id: 'q5a4', text: '社交活动', score: 6 },
                    { id: 'q5a5', text: '失眠或睡眠障碍', score: 15 }
                ]
            },
            {
                id: 'q6',
                text: '您是否有睡前使用电子设备（手机、电脑等）的习惯？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '几乎不使用', score: 0 },
                    { id: 'q6a2', text: '偶尔使用，时间少于30分钟', score: 5 },
                    { id: 'q6a3', text: '经常使用，时间30-60分钟', score: 10 },
                    { id: 'q6a4', text: '频繁使用，时间1-2小时', score: 15 },
                    { id: 'q6a5', text: '几乎离不开，时间2小时以上', score: 20 }
                ]
            },
            {
                id: 'q7',
                text: '您第二天的精神状态受熬夜影响的程度？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '几乎不受影响，精力充沛', score: 0 },
                    { id: 'q7a2', text: '略有影响，但能正常工作学习', score: 5 },
                    { id: 'q7a3', text: '有一定影响，需要咖啡等提神', score: 10 },
                    { id: 'q7a4', text: '影响较大，工作学习效率下降', score: 15 },
                    { id: 'q7a5', text: '严重影响，几乎无法集中注意力', score: 20 }
                ]
            },
            {
                id: 'q8',
                text: '您是否尝试过调整作息，减少熬夜？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '不需要调整，作息很规律', score: 0 },
                    { id: 'q8a2', text: '尝试过，成功调整了作息', score: 5 },
                    { id: 'q8a3', text: '尝试过，但效果不明显', score: 10 },
                    { id: 'q8a4', text: '尝试过，但很难坚持', score: 15 },
                    { id: 'q8a5', text: '想调整但从未成功过', score: 20 }
                ]
            },
            {
                id: 'q9',
                text: '您是否出现过因熬夜导致的健康问题？（如头痛、记忆力下降、免疫力降低等）',
                multi: false,
                options: [
                    { id: 'q9a1', text: '从未出现', score: 0 },
                    { id: 'q9a2', text: '偶尔出现，但不严重', score: 5 },
                    { id: 'q9a3', text: '经常出现，轻度不适', score: 10 },
                    { id: 'q9a4', text: '频繁出现，中度不适', score: 15 },
                    { id: 'q9a5', text: '严重影响健康，需要就医', score: 20 }
                ]
            },
            {
                id: 'q10',
                text: '您认为自己的熬夜情况如何？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '从不熬夜，作息规律', score: 0 },
                    { id: 'q10a2', text: '偶尔熬夜，影响不大', score: 5 },
                    { id: 'q10a3', text: '有时熬夜，但能控制', score: 10 },
                    { id: 'q10a4', text: '经常熬夜，难以控制', score: 15 },
                    { id: 'q10a5', text: '严重熬夜，已成为习惯', score: 20 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 30,
                title: '睡眠健康',
                description: '恭喜您！您的睡眠习惯非常健康，几乎没有熬夜问题。保持规律的作息时间对您的身心健康非常有益。',
                suggestions: ['继续保持良好的睡眠习惯', '注意保持睡眠环境的舒适度', '适当进行睡前放松活动', '定期体检，关注睡眠健康']
            },
            {
                minScore: 31,
                maxScore: 50,
                title: '轻度熬夜',
                description: '您有轻度的熬夜倾向，但总体睡眠状况还算良好。偶尔的熬夜不会对健康造成太大影响，但仍需注意保持规律作息。',
                suggestions: ['尽量减少不必要的熬夜', '建立睡前放松习惯，如阅读或听轻音乐', '避免睡前使用电子设备', '确保充足的睡眠时间']
            },
            {
                minScore: 51,
                maxScore: 75,
                title: '中度熬夜',
                description: '您存在中度的熬夜问题，这已经开始影响您的日常生活和健康。需要引起重视并采取积极措施调整作息时间。',
                suggestions: ['制定严格的作息时间表并坚持执行', '创建有利于睡眠的环境（暗、静、舒适）', '避免咖啡因和刺激性食物', '睡前1小时停止使用电子设备', '如果有睡眠障碍，考虑咨询专业人士']
            },
            {
                minScore: 76,
                maxScore: 100,
                title: '重度熬夜',
                description: '您存在严重的熬夜问题，这已经对您的身心健康造成了明显影响。建议立即采取行动，调整睡眠习惯，恢复健康的生活方式。',
                suggestions: ['寻求专业医生或睡眠专家的帮助', '制定详细的睡眠改善计划并严格执行', '必要时考虑认知行为疗法', '调整生活方式和工作习惯，减少熬夜需求', '家人和朋友的支持与监督']
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