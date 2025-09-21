(function() {
    // 从文件名提取测试ID
    const getTestIdFromFilename = () => {
        const script = document.currentScript;
        const filename = script.src.split('/').pop();
        const testId = filename.split('.')[0];
        return testId;
    };

    // 测试ID
    const testId = getTestIdFromFilename();

    // 测试数据
    const testData = {
        id: testId,
        title: '社交恐惧指数测验',
        description: '本测验用于评估您在社交场合中感到紧张、不安、害怕被评价的程度，以及这些情况对日常生活的影响。测试包含10个问题，请根据您的真实感受选择最符合的选项。',
        category: '爱情与人际关系类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 3,
        questions: [
            // 身体反应相关
            {
                id: 1,
                text: '在人多的场合，您是否会出现出汗、脸红、心跳加快等生理反应？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            {
                id: 2,
                text: '在重要社交场合，您是否会因为紧张而说不出话或语无伦次？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            
            // 心理感受相关
            {
                id: 3,
                text: '您是否经常担心别人会笑话或否定自己的言行？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            {
                id: 4,
                text: '您是否害怕成为众人关注的焦点（如发言、表演等）？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            
            // 行为回避相关
            {
                id: 5,
                text: '您是否经常避免参加聚会、会议或需要公开发言的场合？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            {
                id: 6,
                text: '您是否刻意减少与陌生人接触的机会？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            
            // 日常影响相关
            {
                id: 7,
                text: '这些社交紧张是否已经影响到您的学习、工作或人际交往？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            {
                id: 8,
                text: '您是否因为社交恐惧而错过一些发展机会（如晋升、活动等）？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            
            // 综合评估
            {
                id: 9,
                text: '在社交场合中，您是否会过度关注自己的表现和他人的看法？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            },
            {
                id: 10,
                text: '您是否觉得自己在社交方面不如别人自信或出色？',
                multi: false,
                options: [
                    { id: 1, text: '从不', score: 0 },
                    { id: 2, text: '有时', score: 25 },
                    { id: 3, text: '经常', score: 75 },
                    { id: 4, text: '总是', score: 100 }
                ]
            }
        ],
        
        // 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 33,
                title: '低指数',
                description: '您的社交恐惧指数较低，只是在特定场合会有轻微紧张，基本不影响日常生活和社交活动。您能够较好地应对大多数社交场景，享受与人交往的乐趣。',
                suggestions: ['保持现有的社交状态，继续培养自信', '在感到舒适的范围内适当挑战自己', '学习一些基本的社交技巧来提升沟通效果']
            },
            {
                minScore: 34,
                maxScore: 66,
                title: '中等指数',
                description: '您在某些社交场景中会感到比较焦虑和不安，特别是在陌生或重要场合。这些情绪偶尔会影响您的表现，但尚未对日常生活造成严重干扰。',
                suggestions: ['尝试渐进式暴露疗法，逐步挑战自己的社交舒适区', '学习放松技巧，如深呼吸、正念等来缓解紧张情绪', '记录成功的社交经历，增强自信心', '必要时可寻求心理咨询帮助']
            },
            {
                minScore: 67,
                maxScore: 100,
                title: '高指数',
                description: '您的社交恐惧已经明显影响到日常生活、学习或工作。在大多数社交场合中，您会感到强烈的紧张和不安，甚至会刻意回避社交活动。这可能接近社交焦虑障碍的表现。',
                suggestions: ['建议寻求专业心理咨询师或心理医生的帮助', '考虑认知行为疗法等专业治疗方法', '学习系统的社交技能训练', '家人和朋友的理解与支持很重要', '不要给自己太大压力，改变需要时间']
            }
        ]
    };

    // 安全注册测试数据
    if (window.TestRegistry) {
        window.TestRegistry.register(testData);
    }

    if (!window.TestDatasets) {
        window.TestDatasets = {};
    }
    window.TestDatasets[testId] = testData;
})();