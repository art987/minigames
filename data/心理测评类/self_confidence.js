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
        title: '自信心指数测试',
        description: '本测试将评估您的自信心水平，帮助您了解自己的自我认知和应对挑战的能力。测试包含20个问题，请根据您的真实情况选择最符合的选项。',
        category: '心理测评类',
        questionCount: 20,
        totalScore: 100,
        estimateMinutes: 5,
        questions: [
            {
                id: 1,
                text: '在重要场合发表意见时，我通常感到自信。',
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
                text: '我相信自己有能力解决遇到的大多数问题。',
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
                id: 3,
                text: '当面对失败时，我容易怀疑自己的能力。',
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
                id: 4,
                text: '我愿意接受具有挑战性的任务。',
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
                id: 5,
                text: '我对自己的外貌感到满意。',
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
                text: '在社交场合中，我常常感到不自在。',
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
                text: '我相信自己能够实现设定的目标。',
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
                text: '我害怕在他人面前表现出真实的自己。',
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
                text: '我觉得自己在团队中能够发挥重要作用。',
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
                text: '当别人给予我表扬时，我会感到不自在。',
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
                text: '我敢于表达与他人不同的观点。',
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
                text: '我常常担心自己的能力不足。',
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
                text: '我相信自己值得被尊重和重视。',
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
                text: '在新环境中，我需要很长时间才能适应。',
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
                text: '我对自己的决策能力有信心。',
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
                text: '我经常拿自己和他人比较，并感到不如别人。',
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
                text: '我认为自己有很多优点和特长。',
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
                text: '当面临批评时，我容易感到沮丧。',
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
                text: '我愿意尝试新事物，即使可能失败。',
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
                text: '我相信自己能够应对生活中的各种挑战。',
                multi: false,
                options: [
                    { id: 1, text: '完全不符合', score: 1 },
                    { id: 2, text: '不太符合', score: 2 },
                    { id: 3, text: '一般', score: 3 },
                    { id: 4, text: '比较符合', score: 4 },
                    { id: 5, text: '完全符合', score: 5 }
                ]
            }
        ],
        resultRanges: [
            {
                minScore: 20,
                maxScore: 40,
                title: '自信心较低',
                description: '您的自信心水平相对较低，可能经常对自己的能力产生怀疑，容易受到他人评价的影响。建议您尝试从小事做起，逐步积累成功经验，同时学会接纳自己的不完美，关注自己的优点和进步。',
                suggestions: [
                    '每天记录一件自己做得好的事情',
                    '设定小而具体的目标，逐步实现',
                    '学习积极的自我对话技巧',
                    '寻求支持和鼓励，与信任的人分享感受'
                ]
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '自信心中等',
                description: '您的自信心水平处于中等，在某些情况下能够表现出自信，但在面对挑战或压力时可能会产生自我怀疑。通过有意识的培养和练习，您的自信心可以得到进一步提升。',
                suggestions: [
                    '挑战自我，尝试新的体验',
                    '学习自我肯定的方法',
                    '分析并改变消极的思维模式',
                    '关注自己的成长和进步'
                ]
            },
            {
                minScore: 61,
                maxScore: 80,
                title: '自信心良好',
                description: '您的自信心水平良好，能够相信自己的能力，在大多数情况下表现出自信和从容。您具备面对挑战的勇气，能够有效地应对压力和困难。继续保持这种积极的自我认知。',
                suggestions: [
                    '设定具有挑战性但可实现的目标',
                    '帮助他人建立自信',
                    '不断学习和提升自己',
                    '保持健康的生活方式'
                ]
            },
            {
                minScore: 81,
                maxScore: 100,
                title: '自信心很强',
                description: '您的自信心水平非常高，对自己的能力充满信心，能够从容面对各种挑战和压力。您具有积极的自我认知和良好的自我价值感。不过也要注意保持谦逊，避免过度自信。',
                suggestions: [
                    '分享您的自信经验，帮助他人',
                    '设定更高层次的目标',
                    '保持开放的心态，接受反馈',
                    '关注团队合作和他人的优势'
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