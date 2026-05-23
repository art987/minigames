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
        title: '内向外向测验',
        description: '本测试将评估您的性格倾向，帮助您了解自己是更偏向内向还是外向。测试包含20个问题，请根据您的真实情况选择最符合的选项。',
        category: '心理测评类',
        questionCount: 20,
        totalScore: 100,
        estimateMinutes: 5,
        questions: [
            {
                id: 1,
                text: '在社交场合中，我通常是活跃的参与者。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 2,
                text: '我喜欢独处，享受安静的时光。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 3,
                text: '我愿意主动结识新朋友。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 4,
                text: '在做出决定前，我喜欢仔细思考。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 5,
                text: '我喜欢成为关注的焦点。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 6,
                text: '我不喜欢过多的社交活动，容易感到疲惫。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 7,
                text: '我喜欢与他人分享我的想法和感受。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 8,
                text: '我更倾向于通过独自思考来解决问题。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 9,
                text: '我喜欢参与团队活动和讨论。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 10,
                text: '我需要时间独处来恢复精力。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 11,
                text: '我喜欢尝试新的体验和活动。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 12,
                text: '我更愿意倾听而不是表达。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 13,
                text: '我喜欢在人群中交流和互动。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 14,
                text: '我更倾向于有深度的一对一交流，而不是群体互动。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 15,
                text: '我喜欢在团队中担任领导角色。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 16,
                text: '我不喜欢被打扰，需要专注的环境。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 17,
                text: '我喜欢与人分享我的成就和经历。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 18,
                text: '我更倾向于通过文字而不是面对面交流表达自己。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            },
            {
                id: 19,
                text: '我喜欢参加聚会和社交活动。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            },
            {
                id: 20,
                text: '我更享受安静的爱好，如阅读、绘画或听音乐。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 5 },
                    { id: 2, text: '不太符合', score: 4 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 2 },
                    { id: 5, text: '完全符合', score: 1 }
                ]
            }
        ],
        resultRanges: [
            {
                minScore: 20,
                maxScore: 40,
                title: '典型内向型',
                description: '您的性格明显偏向内向。您喜欢独处，享受安静的时光，更倾向于通过思考来解决问题。社交活动可能会让您感到疲惫，您更偏好深度的一对一交流而非群体互动。',
                suggestions: [
                    '接受并欣赏自己的内向特质',
                    '在社交活动中设定合理的界限',
                    '找到适合自己的充电方式',
                    '发挥您善于倾听和深度思考的优势'
                ]
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '中间偏内向型',
                description: '您的性格偏向内向，但也有一定的外向特质。在大多数情况下，您喜欢独处和安静，但在特定情境下也能享受社交活动。您能够根据环境调整自己的行为方式。',
                suggestions: [
                    '认识到内向外向是连续体而非绝对二分',
                    '在社交和独处之间找到平衡',
                    '了解自己在什么情境下最舒适',
                    '培养灵活应对不同社交场景的能力'
                ]
            },
            {
                minScore: 61,
                maxScore: 80,
                title: '中间偏外向型',
                description: '您的性格偏向外向，但也保留了一些内向特质。您喜欢社交活动和与人互动，但也需要一定的独处时间来恢复精力。您能够在团队中积极参与，但也能倾听他人的意见。',
                suggestions: [
                    '发挥您善于社交和沟通的优势',
                    '注意给自己留出独处和反思的时间',
                    '学会在社交中也能深度倾听',
                    '平衡表达和倾听的能力'
                ]
            },
            {
                minScore: 81,
                maxScore: 100,
                title: '典型外向型',
                description: '您的性格明显偏向外向。您喜欢社交活动，享受与人互动，在人群中感到精力充沛。您倾向于通过交流来思考问题，喜欢成为关注的焦点，在团队中积极参与并经常担任领导角色。',
                suggestions: [
                    '发挥您善于社交和领导的优势',
                    '学会理解和尊重内向者的需求',
                    '在行动前给自己一些思考的时间',
                    '注意倾听他人的意见和感受'
                ]
            }
        ]
    };

    // 注册测试数据
    if (window.TestRegistry) {
        window.TestRegistry.register(testData);
    }
    
    // 将测试数据存储在全局变量中，供hasValidDataset函数检查
    window.TestDatasets = window.TestDatasets || {};
    window.TestDatasets[testId] = testData;
})();