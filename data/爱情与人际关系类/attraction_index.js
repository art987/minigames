(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'attraction_index';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '吸引力指数测试',
        description: '这个测试将帮助你了解自己在人际交往中的吸引力水平，测试包含10个问题，每个问题有4个选项，总分为100分。',
        category: '爱情与人际关系类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 3,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '当你进入一个新的社交场合，你会如何表现？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '主动与他人交流，介绍自己', score: 10 },
                    { id: 'q1a2', text: '观察周围环境，等待他人主动', score: 7 },
                    { id: 'q1a3', text: '保持安静，尽量不引起注意', score: 4 },
                    { id: 'q1a4', text: '感到不自在，想尽快离开', score: 1 }
                ]
            },
            {
                id: 'q2',
                text: '在与他人交谈时，你通常会？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '保持眼神交流，认真倾听', score: 10 },
                    { id: 'q2a2', text: '偶尔眼神交流，比较放松', score: 7 },
                    { id: 'q2a3', text: '避免眼神接触，低头看手机', score: 4 },
                    { id: 'q2a4', text: '心不在焉，想着其他事情', score: 1 }
                ]
            },
            {
                id: 'q3',
                text: '你对自己的外表有何评价？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '非常满意，注重仪表和着装', score: 10 },
                    { id: 'q3a2', text: '比较满意，干净整洁就好', score: 7 },
                    { id: 'q3a3', text: '一般，不太在意外表', score: 4 },
                    { id: 'q3a4', text: '不满意，对自己的外表缺乏自信', score: 1 }
                ]
            },
            {
                id: 'q4',
                text: '当与他人意见不同时，你会？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '尊重对方观点，理性讨论', score: 10 },
                    { id: 'q4a2', text: '表达自己的看法，但不争论', score: 7 },
                    { id: 'q4a3', text: '保持沉默，避免冲突', score: 4 },
                    { id: 'q4a4', text: '坚持自己是对的，试图说服对方', score: 1 }
                ]
            },
            {
                id: 'q5',
                text: '你如何处理压力和负面情绪？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '积极面对，寻找解决方法', score: 10 },
                    { id: 'q5a2', text: '通过兴趣爱好放松自己', score: 7 },
                    { id: 'q5a3', text: '向亲友倾诉寻求支持', score: 4 },
                    { id: 'q5a4', text: '独自承受，容易陷入情绪低谷', score: 1 }
                ]
            },
            {
                id: 'q6',
                text: '在社交互动中，你的幽默感如何？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '很幽默，经常能逗他人开心', score: 10 },
                    { id: 'q6a2', text: '偶尔会开开玩笑', score: 7 },
                    { id: 'q6a3', text: '不太幽默，但能欣赏别人的笑话', score: 4 },
                    { id: 'q6a4', text: '严肃认真，很少开玩笑', score: 1 }
                ]
            },
            {
                id: 'q7',
                text: '你对新鲜事物的态度是？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '充满好奇，乐于尝试', score: 10 },
                    { id: 'q7a2', text: '谨慎但愿意接受新体验', score: 7 },
                    { id: 'q7a3', text: '保持现状，不太愿意改变', score: 4 },
                    { id: 'q7a4', text: '抗拒变化，喜欢熟悉的事物', score: 1 }
                ]
            },
            {
                id: 'q8',
                text: '你如何看待自己的社交能力？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '很强，善于与人建立关系', score: 10 },
                    { id: 'q8a2', text: '不错，能与大多数人相处融洽', score: 7 },
                    { id: 'q8a3', text: '一般，只和熟悉的人聊得来', score: 4 },
                    { id: 'q8a4', text: '较弱，不擅长社交场合', score: 1 }
                ]
            },
            {
                id: 'q9',
                text: '在团队合作中，你通常扮演什么角色？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '领导者，负责组织和协调', score: 10 },
                    { id: 'q9a2', text: '积极参与者，贡献自己的想法', score: 7 },
                    { id: 'q9a3', text: '跟随者，完成分配的任务', score: 4 },
                    { id: 'q9a4', text: '旁观者，很少主动参与', score: 1 }
                ]
            },
            {
                id: 'q10',
                text: '你对生活的态度是？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '乐观向上，充满热情', score: 10 },
                    { id: 'q10a2', text: '平和稳定，随遇而安', score: 7 },
                    { id: 'q10a3', text: '谨慎保守，担心未来', score: 4 },
                    { id: 'q10a4', text: '消极悲观，容易抱怨', score: 1 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 80,
                maxScore: 100,
                title: '魅力四射型',
                description: '你拥有极高的人际吸引力，在社交场合中总是焦点。你自信、开朗、善于与人沟通，给人留下深刻印象。',
                suggestions: ['继续保持你的魅力，但也要注意倾听他人的声音', '你的自信很吸引人，但不要显得过于自我中心']
            },
            {
                minScore: 60,
                maxScore: 79,
                title: '亲和力强型',
                description: '你具有很好的人际吸引力，能够与大多数人建立良好的关系。你温和、友善、善于理解他人，是一个受欢迎的人。',
                suggestions: ['可以尝试在某些场合更主动一些', '继续保持你的亲和力，这是你的优势']
            },
            {
                minScore: 40,
                maxScore: 59,
                title: '平衡稳健型',
                description: '你具有中等的人际吸引力，能够与他人正常交往。你务实、可靠、有自己的原则，给人一种踏实的感觉。',
                suggestions: ['可以适当提升自己的社交技巧', '在与陌生人交往时更加放松一些']
            },
            {
                minScore: 0,
                maxScore: 39,
                title: '内敛害羞型',
                description: '你可能在社交场合中显得有些拘谨，需要更多的时间来适应新环境。你真诚、细腻、有自己的内心世界。',
                suggestions: ['给自己一些时间，逐步提升社交自信', '从小范围的社交活动开始，慢慢扩大接触面']
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