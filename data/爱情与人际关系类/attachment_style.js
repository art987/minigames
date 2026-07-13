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
        title: '依恋类型测验',
        description: '本测验基于依恋理论，通过评估您在亲密关系中的安全感、信任感和依赖模式，帮助您了解自己的依恋类型。测试包含10个问题，请根据您在恋爱关系中的真实感受选择最符合的选项。',
        category: '爱情与人际关系类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 3,
        questions: [
            // 关系安全感
            {
                id: 1,
                text: '在恋爱关系中，我感到：',
                multi: false,
                options: [
                    { id: 1, text: '非常安全和信任对方', score: 10 },
                    { id: 2, text: '比较安全，偶尔会担心', score: 7 },
                    { id: 3, text: '不确定，时好时坏', score: 4 },
                    { id: 4, text: '经常感到不安', score: 1 }
                ]
            },
            // 情感表达
            {
                id: 2,
                text: '当伴侣表达爱意时，我的反应是：',
                multi: false,
                options: [
                    { id: 1, text: '自然回应并感到开心', score: 10 },
                    { id: 2, text: '有些不自在但会接受', score: 7 },
                    { id: 3, text: '担心这不会长久', score: 4 },
                    { id: 4, text: '想要保持距离', score: 1 }
                ]
            },
            // 独处需求
            {
                id: 3,
                text: '我需要个人空间的程度：',
                multi: false,
                options: [
                    { id: 1, text: '需要适度的空间，但也享受亲密', score: 10 },
                    { id: 2, text: '更喜欢有较多独立时间', score: 7 },
                    { id: 3, text: '希望尽可能和伴侣在一起', score: 4 },
                    { id: 4, text: '经常感到亲密让我窒息', score: 1 }
                ]
            },
            // 矛盾处理
            {
                id: 4,
                text: '当与伴侣发生矛盾时，我倾向于：',
                multi: false,
                options: [
                    { id: 1, text: '积极沟通解决问题', score: 10 },
                    { id: 2, text: '暂时回避冷静一下', score: 7 },
                    { id: 3, text: '担心矛盾会导致关系破裂', score: 4 },
                    { id: 4, text: '感到不知所措，情绪波动大', score: 1 }
                ]
            },
            // 依赖程度
            {
                id: 5,
                text: '我对伴侣的依赖程度：',
                multi: false,
                options: [
                    { id: 1, text: '适度依赖，也保持独立', score: 10 },
                    { id: 2, text: '尽量不依赖对方', score: 7 },
                    { id: 3, text: '很依赖，希望对方时刻关注我', score: 4 },
                    { id: 4, text: '既渴望依赖又害怕依赖', score: 1 }
                ]
            },
            // 信任问题
            {
                id: 6,
                text: '我对伴侣的信任程度：',
                multi: false,
                options: [
                    { id: 1, text: '基本信任对方', score: 10 },
                    { id: 2, text: '有所保留，不轻易完全信任', score: 7 },
                    { id: 3, text: '经常担心对方不够爱我或会离开', score: 4 },
                    { id: 4, text: '既想信任又害怕被背叛', score: 1 }
                ]
            },
            // 亲密需求
            {
                id: 7,
                text: '我对亲密关系的需求：',
                multi: false,
                options: [
                    { id: 1, text: '渴望亲密但不过分', score: 10 },
                    { id: 2, text: '觉得保持一定距离更好', score: 7 },
                    { id: 3, text: '非常需要亲密，害怕孤独', score: 4 },
                    { id: 4, text: '既需要亲密又害怕受伤', score: 1 }
                ]
            },
            // 分离反应
            {
                id: 8,
                text: '当伴侣不在身边时，我会：',
                multi: false,
                options: [
                    { id: 1, text: '正常生活，保持联系', score: 10 },
                    { id: 2, text: '享受独处时光', score: 7 },
                    { id: 3, text: '感到不安，频繁联系对方', score: 4 },
                    { id: 4, text: '情绪波动，时而想念时而烦躁', score: 1 }
                ]
            },
            // 自我表露
            {
                id: 9,
                text: '我向伴侣分享内心感受的程度：',
                multi: false,
                options: [
                    { id: 1, text: '愿意适度分享真实感受', score: 10 },
                    { id: 2, text: '不太愿意表露脆弱的一面', score: 7 },
                    { id: 3, text: '希望完全分享，但担心不被理解', score: 4 },
                    { id: 4, text: '想分享又害怕被评价', score: 1 }
                ]
            },
            // 关系期望
            {
                id: 10,
                text: '我对恋爱关系的期望是：',
                multi: false,
                options: [
                    { id: 1, text: '相互支持，共同成长', score: 10 },
                    { id: 2, text: '保持各自独立，不过度干涉', score: 7 },
                    { id: 3, text: '希望对方能完全满足我的情感需求', score: 4 },
                    { id: 4, text: '既渴望稳定又害怕束缚', score: 1 }
                ]
            }
        ],
        resultRanges: [
            {
                minScore: 81,
                maxScore: 100,
                title: '安全型依恋',
                description: '您属于安全型依恋。在关系中，您能够给予和接受信任，既能享受亲密又能保持独立。您遇到矛盾时会积极沟通，对关系有较强的安全感。您相信自己值得被爱，也相信伴侣会关心和支持您。',
                suggestions: [
                    '继续保持您健康的依恋模式',
                    '在与伴侣相处时，多表达您的信任和支持',
                    '帮助伴侣理解安全型依恋的积极影响'
                ]
            },
            {
                minScore: 61,
                maxScore: 80,
                title: '回避型依恋',
                description: '您倾向于回避型依恋。您可能害怕过度亲密，倾向于在关系中保持一定距离。在情感表达上较为克制，有时会显得冷淡，避免深度的情感投入。您更重视个人空间和独立，可能担心依赖会让自己失去自主性。',
                suggestions: [
                    '尝试逐步敞开心扉，分享更多内心感受',
                    '理解亲密并不意味着失去自我',
                    '当伴侣表达关心时，试着接纳而不是回避'
                ]
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '焦虑型依恋',
                description: '您倾向于焦虑型依恋。您渴望亲密关系，但又常常担心被抛弃。在关系中，您可能表现得敏感、多疑，对伴侣的反应过度关注。您可能需要频繁的情感确认，害怕独处或被忽视。',
                suggestions: [
                    '练习自我安抚技巧，减少对伴侣的过度依赖',
                    '尝试建立除亲密关系外的其他支持系统',
                    '与伴侣坦诚沟通您的需求和担忧'
                ]
            },
            {
                minScore: 0,
                maxScore: 40,
                title: '紊乱型依恋',
                description: '您倾向于紊乱型依恋。您既渴望亲密关系，又害怕受到伤害，内心常常充满矛盾。在关系中，您的情绪可能波动较大，时而极度渴望亲近，时而又突然疏远。这种矛盾的状态可能源于过去的情感经历。',
                suggestions: [
                    '尝试理解自己矛盾情绪的根源',
                    '考虑寻求专业心理咨询的帮助',
                    '在建立亲密关系前，先专注于自我成长和情绪稳定'
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