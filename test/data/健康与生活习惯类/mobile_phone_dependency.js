(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'mobile_phone_dependency';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '手机依赖程度测试',
        description: '通过这个测试评估您对手机的依赖程度以及它对日常生活的影响',
        category: '健康与生活习惯类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 5,
        cover: testId + '.jpg',
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '您每天使用手机的时间大约是？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '少于1小时', score: 0 },
                    { id: 'q1a2', text: '1-3小时', score: 5 },
                    { id: 'q1a3', text: '3-5小时', score: 10 },
                    { id: 'q1a4', text: '5-8小时', score: 15 },
                    { id: 'q1a5', text: '8小时以上', score: 20 }
                ]
            },
            {
                id: 'q2',
                text: '您醒来后第一件事通常是？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '不看手机，直接起床', score: 0 },
                    { id: 'q2a2', text: '先看一下时间', score: 5 },
                    { id: 'q2a3', text: '查看消息通知', score: 10 },
                    { id: 'q2a4', text: '刷社交媒体', score: 15 },
                    { id: 'q2a5', text: '在床上玩手机超过15分钟', score: 20 }
                ]
            },
            {
                id: 'q3',
                text: '当手机电量低于多少时，您会感到焦虑？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '不会因为电量感到焦虑', score: 0 },
                    { id: 'q3a2', text: '低于20%', score: 5 },
                    { id: 'q3a3', text: '低于30%', score: 10 },
                    { id: 'q3a4', text: '低于50%', score: 15 },
                    { id: 'q3a5', text: '低于80%就开始担心', score: 20 }
                ]
            },
            {
                id: 'q4',
                text: '您平均每小时查看手机的次数大约是？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '几乎不主动查看', score: 0 },
                    { id: 'q4a2', text: '1-3次', score: 5 },
                    { id: 'q4a3', text: '4-6次', score: 10 },
                    { id: 'q4a4', text: '7-10次', score: 15 },
                    { id: 'q4a5', text: '10次以上', score: 20 }
                ]
            },
            {
                id: 'q5',
                text: '当手机不在身边时，您会感到？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '无所谓，需要时再找', score: 0 },
                    { id: 'q5a2', text: '有点不适应，但不会特别在意', score: 5 },
                    { id: 'q5a3', text: '偶尔会想起，但能控制', score: 10 },
                    { id: 'q5a4', text: '经常想查看，有些焦虑', score: 15 },
                    { id: 'q5a5', text: '非常焦虑，必须尽快拿到手机', score: 20 }
                ]
            },
            {
                id: 'q6',
                text: '您在与他人面对面交流时，是否会查看手机？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '从不查看', score: 0 },
                    { id: 'q6a2', text: '偶尔查看，但会专注对话', score: 5 },
                    { id: 'q6a3', text: '经常查看，但会回应对方', score: 10 },
                    { id: 'q6a4', text: '频繁查看，影响对话质量', score: 15 },
                    { id: 'q6a5', text: '几乎一直在看手机', score: 20 }
                ]
            },
            {
                id: 'q7',
                text: '您是否因为使用手机而影响了睡眠质量？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '从不，睡前不会使用手机', score: 0 },
                    { id: 'q7a2', text: '偶尔使用，但不影响睡眠', score: 5 },
                    { id: 'q7a3', text: '经常使用，但能控制时间', score: 10 },
                    { id: 'q7a4', text: '睡前长时间使用，有时影响睡眠', score: 15 },
                    { id: 'q7a5', text: '睡前必须使用手机，严重影响睡眠', score: 20 }
                ]
            },
            {
                id: 'q8',
                text: '您是否尝试过减少手机使用时间？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '不需要减少，使用合理', score: 0 },
                    { id: 'q8a2', text: '尝试过，成功减少了使用', score: 5 },
                    { id: 'q8a3', text: '尝试过，但效果不明显', score: 10 },
                    { id: 'q8a4', text: '尝试过，但很难坚持', score: 15 },
                    { id: 'q8a5', text: '想减少但从未成功过', score: 20 }
                ]
            },
            {
                id: 'q9',
                text: '您是否因为使用手机而忽略了现实中的活动或人际关系？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '从未因此忽略现实活动', score: 0 },
                    { id: 'q9a2', text: '偶尔，但不会影响重要事情', score: 5 },
                    { id: 'q9a3', text: '有时会忽略一些不重要的活动', score: 10 },
                    { id: 'q9a4', text: '经常忽略一些重要活动', score: 15 },
                    { id: 'q9a5', text: '几乎总是优先使用手机而非现实活动', score: 20 }
                ]
            },
            {
                id: 'q10',
                text: '您觉得自己对手机的依赖程度如何？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '几乎不依赖，手机只是工具', score: 0 },
                    { id: 'q10a2', text: '有一定依赖，但能控制', score: 5 },
                    { id: 'q10a3', text: '比较依赖，但意识到需要控制', score: 10 },
                    { id: 'q10a4', text: '相当依赖，难以控制使用', score: 15 },
                    { id: 'q10a5', text: '严重依赖，无法想象没有手机的生活', score: 20 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 30,
                title: '手机使用合理',
                description: '您对手机的依赖程度很低，能够很好地控制使用时间和频率。手机只是您生活中的一个便利工具，而不是必需品。',
                suggestions: ['继续保持健康的手机使用习惯', '可以分享您的经验给周围过度依赖手机的朋友', '注意在某些重要场合（如工作、学习、社交）保持专注']
            },
            {
                minScore: 31,
                maxScore: 50,
                title: '轻度依赖',
                description: '您对手机有一定程度的依赖，但这种依赖在合理范围内。您能够意识到手机使用的重要性和适度性，大多数情况下能够控制自己的使用行为。',
                suggestions: ['尝试在特定时间段（如用餐、睡前）减少手机使用', '设置每日使用时间提醒，避免过度使用', '培养其他兴趣爱好，丰富线下生活']
            },
            {
                minScore: 51,
                maxScore: 75,
                title: '中度依赖',
                description: '您对手机存在中度依赖，这种依赖已经开始对日常生活产生一定影响。需要警惕并采取措施减少不必要的使用，以避免依赖程度进一步加深。',
                suggestions: ['制定详细的手机使用计划，设定每日使用时长上限', '尝试进行"无手机日"或"无手机时段"', '将手机放在不容易触及的地方，减少无意识查看', '增加面对面社交和户外活动时间']
            },
            {
                minScore: 76,
                maxScore: 100,
                title: '重度依赖',
                description: '您对手机存在重度依赖，这种依赖已经对日常生活、工作学习和人际关系产生了明显的负面影响。建议立即采取行动，逐步减少对手机的过度依赖。',
                suggestions: ['寻求专业帮助或加入支持小组', '考虑使用手机使用控制应用来限制使用时间', '彻底改变生活方式，增加户外活动和社交', '尝试认知行为疗法，改变对手机的心理依赖', '在必要时，考虑暂时远离社交媒体']
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