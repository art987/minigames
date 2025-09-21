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
        title: '友情稳定度测试',
        description: '本测试将帮助您评估与朋友之间的关系稳定性，从沟通频率、信任程度、支持与陪伴、冲突处理、关系平衡和长期性六个方面进行分析。测试包含10个问题，请根据您的实际情况选择最符合的选项。',
        category: '爱情与人际关系类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 3,
        questions: [
            // 沟通频率相关
            {
                id: 1,
                text: '您和这位朋友通常多久联系一次？',
                multi: false,
                options: [
                    { id: 1, text: '每天都会联系', score: 10 },
                    { id: 2, text: '每周联系2-3次', score: 8 },
                    { id: 3, text: '每月联系几次', score: 5 },
                    { id: 4, text: '几个月才联系一次', score: 3 },
                    { id: 5, text: '很少联系，除非有事', score: 1 }
                ]
            },
            // 信任程度相关
            {
                id: 2,
                text: '您是否愿意向这位朋友倾诉个人秘密或困扰？',
                multi: false,
                options: [
                    { id: 1, text: '非常愿意，完全信任对方', score: 10 },
                    { id: 2, text: '愿意，但会有所保留', score: 7 },
                    { id: 3, text: '视情况而定', score: 5 },
                    { id: 4, text: '不太愿意，担心被泄露', score: 3 },
                    { id: 5, text: '几乎不会分享任何隐私', score: 1 }
                ]
            },
            // 支持与陪伴相关
            {
                id: 3,
                text: '当您遇到困难需要帮助时，这位朋友会？',
                multi: false,
                options: [
                    { id: 1, text: '立刻出现并全力支持', score: 10 },
                    { id: 2, text: '尽力提供帮助', score: 8 },
                    { id: 3, text: '给予安慰但帮忙有限', score: 5 },
                    { id: 4, text: '表现冷淡或找借口推脱', score: 3 },
                    { id: 5, text: '几乎不提供任何帮助', score: 1 }
                ]
            },
            // 冲突处理相关
            {
                id: 4,
                text: '当您与这位朋友发生分歧或争执时，通常会？',
                multi: false,
                options: [
                    { id: 1, text: '冷静沟通，共同寻找解决方案', score: 10 },
                    { id: 2, text: '愿意让步，维持友谊', score: 7 },
                    { id: 3, text: '暂时搁置，等双方冷静后再谈', score: 5 },
                    { id: 4, text: '坚持自己的观点，不愿妥协', score: 3 },
                    { id: 5, text: '激烈争吵，甚至冷战', score: 1 }
                ]
            },
            // 关系平衡相关
            {
                id: 5,
                text: '您觉得在这段友谊中，双方的付出与收获是否平衡？',
                multi: false,
                options: [
                    { id: 1, text: '非常平衡，彼此都很重视', score: 10 },
                    { id: 2, text: '基本平衡，偶尔会有小失衡', score: 7 },
                    { id: 3, text: '一般，说不上特别平衡', score: 5 },
                    { id: 4, text: '不太平衡，一方付出更多', score: 3 },
                    { id: 5, text: '严重失衡，感觉被利用', score: 1 }
                ]
            },
            // 长期性相关
            {
                id: 6,
                text: '您认为这段友谊能持续多少年？',
                multi: false,
                options: [
                    { id: 1, text: '肯定能持续一辈子', score: 10 },
                    { id: 2, text: '至少还能维持很多年', score: 8 },
                    { id: 3, text: '说不准，看情况发展', score: 5 },
                    { id: 4, text: '可能只会维持几年', score: 3 },
                    { id: 5, text: '不确定，很容易变化', score: 1 }
                ]
            },
            // 沟通自然度相关
            {
                id: 7,
                text: '与这位朋友聊天时，您是否感到轻松自然？',
                multi: false,
                options: [
                    { id: 1, text: '非常轻松，无话不谈', score: 10 },
                    { id: 2, text: '比较轻松，话题丰富', score: 7 },
                    { id: 3, text: '一般，有时会冷场', score: 5 },
                    { id: 4, text: '有些拘谨，不太自在', score: 3 },
                    { id: 5, text: '很不自然，经常没话题', score: 1 }
                ]
            },
            // 信任与背叛相关
            {
                id: 8,
                text: '如果这位朋友做了让您失望的事，您会？',
                multi: false,
                options: [
                    { id: 1, text: '给予理解和原谅，愿意修复关系', score: 10 },
                    { id: 2, text: '感到失望但尝试沟通', score: 7 },
                    { id: 3, text: '暂时保持距离，观察后续表现', score: 5 },
                    { id: 4, text: '难以原谅，关系明显疏远', score: 3 },
                    { id: 5, text: '直接结束这段友谊', score: 1 }
                ]
            },
            // 相互支持相关
            {
                id: 9,
                text: '当这位朋友取得成就或开心时，您会？',
                multi: false,
                options: [
                    { id: 1, text: '真心为对方感到高兴', score: 10 },
                    { id: 2, text: '表示祝贺，但内心有点复杂', score: 7 },
                    { id: 3, text: '礼貌性地祝贺', score: 5 },
                    { id: 4, text: '没什么特别感觉', score: 3 },
                    { id: 5, text: '甚至有些嫉妒', score: 1 }
                ]
            },
            // 环境变化影响相关
            {
                id: 10,
                text: '如果你们因为生活、工作等原因分隔两地，您认为这会如何影响你们的友谊？',
                multi: false,
                options: [
                    { id: 1, text: '几乎不会影响，感情依旧牢固', score: 10 },
                    { id: 2, text: '会有些影响，但仍会保持联系', score: 7 },
                    { id: 3, text: '影响较大，联系会减少', score: 5 },
                    { id: 4, text: '影响很大，感情会变淡', score: 3 },
                    { id: 5, text: '可能导致友谊结束', score: 1 }
                ]
            }
        ],
        // 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '关系较脆弱',
                description: '你们的友谊目前处于比较脆弱的状态，容易因为矛盾、误解或环境变化而受到影响。可能存在沟通不足、信任缺失或付出不平衡等问题。',
                suggestions: [
                    '尝试增加主动联系的频率，分享生活中的点滴',
                    '找机会坦诚地交流彼此的感受和期待',
                    '学会理解和包容对方的不同观点',
                    '在矛盾发生时保持冷静，避免情绪化反应',
                    '反思自己在这段关系中的角色，是否给予了足够的支持'
                ]
            },
            {
                minScore: 41,
                maxScore: 75,
                title: '关系中等稳定',
                description: '你们的友谊处于中等稳定水平，有一定的感情基础，但仍需要用心维护才能长久发展。在某些方面可能存在改进空间。',
                suggestions: [
                    '定期安排见面或深度交流的机会',
                    '加强彼此间的信任，尝试分享更多内心想法',
                    '在对方需要时提供及时的支持和鼓励',
                    '学会更有效的沟通方式，积极解决分歧',
                    '保持关系的平衡，避免一方过度付出'
                ]
            },
            {
                minScore: 76,
                maxScore: 100,
                title: '关系很稳定',
                description: '恭喜！你们拥有一段非常稳定的友谊。无论距离还是时间都不会轻易削弱你们的感情，彼此信任、支持，能够共同面对各种挑战。',
                suggestions: [
                    '继续保持现有的良好沟通和互动模式',
                    '珍惜彼此的陪伴，创造更多美好回忆',
                    '在对方需要时继续给予支持和鼓励',
                    '保持关系中的新鲜感，尝试一起探索新事物',
                    '记住，即使是最稳定的关系也需要用心维护'
                ]
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

    // 确保全局TestData可用
    if (typeof TestData === 'undefined') {
        window.TestData = testData;
    }
})();