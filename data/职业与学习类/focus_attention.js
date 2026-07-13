(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'focus_attention';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '专注力指数评估',
        description: '本测验将评估您的专注力水平，涵盖注意力持久性、抗干扰能力、任务专注度和注意力分配等多个维度。',
        category: '职业与学习类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 4,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '当您专注于一项任务时，外界的噪音或干扰会对您产生多大影响？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '严重干扰，很难集中注意力', score: 10 },
                    { id: 'q1a2', text: '有一定影响，但可以勉强集中', score: 20 },
                    { id: 'q1a3', text: '影响较小，能保持大部分注意力', score: 30 },
                    { id: 'q1a4', text: '几乎没有影响，能完全专注', score: 40 }
                ]
            },
            {
                id: 'q2',
                text: '在完成一项需要持续专注的任务时，您通常能保持高度集中的时间是多久？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '15分钟以内', score: 10 },
                    { id: 'q2a2', text: '15-30分钟', score: 20 },
                    { id: 'q2a3', text: '30-60分钟', score: 30 },
                    { id: 'q2a4', text: '60分钟以上', score: 40 }
                ]
            },
            {
                id: 'q3',
                text: '当您在工作或学习时，手机通知、消息提醒会：',
                multi: false,
                options: [
                    { id: 'q3a1', text: '立即查看，经常打断思路', score: 10 },
                    { id: 'q3a2', text: '延迟查看，但心里会惦记', score: 20 },
                    { id: 'q3a3', text: '设定特定时间统一查看', score: 30 },
                    { id: 'q3a4', text: '开启勿扰模式，完成任务后再处理', score: 40 }
                ]
            },
            {
                id: 'q4',
                text: '当您需要同时处理多项任务时，您的表现是：',
                multi: false,
                options: [
                    { id: 'q4a1', text: '容易混淆，效率很低', score: 10 },
                    { id: 'q4a2', text: '可以完成，但质量和效率受影响', score: 20 },
                    { id: 'q4a3', text: '能够合理分配注意力，保持较好效率', score: 30 },
                    { id: 'q4a4', text: '擅长多任务处理，高效完成各项工作', score: 40 }
                ]
            },
            {
                id: 'q5',
                text: '阅读长篇文章或复杂材料时，您是否经常：',
                multi: false,
                options: [
                    { id: 'q5a1', text: '走神，需要反复回读', score: 10 },
                    { id: 'q5a2', text: '偶尔分心，但能继续阅读', score: 20 },
                    { id: 'q5a3', text: '基本保持专注，理解大部分内容', score: 30 },
                    { id: 'q5a4', text: '高度专注，能快速理解核心内容', score: 40 }
                ]
            },
            {
                id: 'q6',
                text: '当您需要长时间保持注意力时，您通常会：',
                multi: false,
                options: [
                    { id: 'q6a1', text: '感到疲惫，无法坚持', score: 10 },
                    { id: 'q6a2', text: '勉强坚持，但效率下降', score: 20 },
                    { id: 'q6a3', text: '通过短暂休息来恢复注意力', score: 30 },
                    { id: 'q6a4', text: '调整节奏，保持稳定的专注状态', score: 40 }
                ]
            },
            {
                id: 'q7',
                text: '在会议或课堂上，您的注意力集中情况是：',
                multi: false,
                options: [
                    { id: 'q7a1', text: '经常分心，错过重要信息', score: 10 },
                    { id: 'q7a2', text: '前半段专注，后半段容易走神', score: 20 },
                    { id: 'q7a3', text: '大部分时间保持专注，偶尔分心', score: 30 },
                    { id: 'q7a4', text: '全程高度专注，积极参与', score: 40 }
                ]
            },
            {
                id: 'q8',
                text: '当您面对枯燥但重要的任务时，您会：',
                multi: false,
                options: [
                    { id: 'q8a1', text: '拖延，很难开始', score: 10 },
                    { id: 'q8a2', text: '开始后容易放弃', score: 20 },
                    { id: 'q8a3', text: '设定小目标，逐步完成', score: 30 },
                    { id: 'q8a4', text: '专注完成，不受任务性质影响', score: 40 }
                ]
            },
            {
                id: 'q9',
                text: '您是否经常使用番茄工作法或类似的时间管理技术来提高专注度？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '从未听说过', score: 10 },
                    { id: 'q9a2', text: '听说过，但从未尝试', score: 20 },
                    { id: 'q9a3', text: '偶尔尝试，但不规律', score: 30 },
                    { id: 'q9a4', text: '经常使用并从中受益', score: 40 }
                ]
            },
            {
                id: 'q10',
                text: '您认为提高专注力最重要的因素是：',
                multi: false,
                options: [
                    { id: 'q10a1', text: '外界环境的安静程度', score: 20 },
                    { id: 'q10a2', text: '个人兴趣和动力', score: 30 },
                    { id: 'q10a3', text: '自我控制能力', score: 40 },
                    { id: 'q10a4', text: '充足的休息和精力', score: 30 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '专注力基础阶段',
                description: '您的专注力水平处于基础阶段，容易受到外界干扰，难以长时间保持注意力集中。',
                suggestions: ['创造安静的工作环境', '尝试番茄工作法', '减少多任务处理']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '专注力发展阶段',
                description: '您具备一定的专注力，但在面对复杂或枯燥的任务时仍需努力，容易受到干扰影响。',
                suggestions: ['练习冥想或正念', '设定明确的专注目标', '逐步延长专注时间']
            },
            {
                minScore: 61,
                maxScore: 75,
                title: '专注力良好阶段',
                description: '您的专注力处于良好水平，能够在大部分情况下保持注意力集中，工作和学习效率较高。',
                suggestions: ['优化日常习惯', '学习更高级的专注技巧', '保持健康的生活方式']
            },
            {
                minScore: 76,
                maxScore: 90,
                title: '专注力优秀阶段',
                description: '您拥有优秀的专注力，能够在各种环境中保持高度集中，有效处理复杂任务。',
                suggestions: ['探索专注力的极限', '分享您的经验', '将专注力与个人目标结合']
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '专注力卓越阶段',
                description: '您的专注力达到了卓越水平，能够长时间保持高度集中，不受干扰影响，是高效工作和学习的典范。',
                suggestions: ['帮助他人提高专注力', '研究专注力的科学原理', '将专注力优势运用到更广泛的领域']
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