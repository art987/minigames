(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'love_philosophy';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '爱情观测试',
        description: '本测试将评估您的爱情价值观、态度和行为倾向，帮助您了解自己在爱情中的偏好。测试包含20个问题，请根据您的真实想法选择最符合的选项。',
        category: '爱情与人际关系类',
        questionCount: 20,
        totalScore: 100,
        estimateMinutes: 5,
        
        // 3. 题目数组
        questions: [
            // 择偶标准相关
            {
                id: 'q1',
                text: '在选择伴侣时，您认为以下哪个因素最重要？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '外貌吸引力', score: 1 },
                    { id: 'q1a2', text: '性格匹配度', score: 5 },
                    { id: 'q1a3', text: '经济状况', score: 2 },
                    { id: 'q1a4', text: '共同成长的可能性', score: 4 },
                    { id: 'q1a5', text: '兴趣爱好相似', score: 3 }
                ]
            },
            {
                id: 'q2',
                text: '您认为伴侣的经济状况应该与您相当或更好吗？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '完全不需要', score: 1 },
                    { id: 'q2a2', text: '无所谓', score: 3 },
                    { id: 'q2a3', text: '最好相当', score: 4 },
                    { id: 'q2a4', text: '最好比我好', score: 5 },
                    { id: 'q2a5', text: '非常重要', score: 2 }
                ]
            },
            
            // 爱情态度相关
            {
                id: 'q3',
                text: '您相信一见钟情吗？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '完全相信', score: 5 },
                    { id: 'q3a2', text: '比较相信', score: 4 },
                    { id: 'q3a3', text: '不确定', score: 3 },
                    { id: 'q3a4', text: '不太相信', score: 2 },
                    { id: 'q3a5', text: '完全不相信', score: 1 }
                ]
            },
            {
                id: 'q4',
                text: '您认为爱情需要物质基础吗？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '完全不需要', score: 1 },
                    { id: 'q4a2', text: '不太需要', score: 2 },
                    { id: 'q4a3', text: '需要一定基础', score: 3 },
                    { id: 'q4a4', text: '比较需要', score: 4 },
                    { id: 'q4a5', text: '非常需要', score: 5 }
                ]
            },
            {
                id: 'q5',
                text: '您会为了爱情做出重大牺牲吗？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '绝对会', score: 5 },
                    { id: 'q5a2', text: '可能会', score: 4 },
                    { id: 'q5a3', text: '视情况而定', score: 3 },
                    { id: 'q5a4', text: '不太可能', score: 2 },
                    { id: 'q5a5', text: '绝对不会', score: 1 }
                ]
            },
            
            // 依赖程度相关
            {
                id: 'q6',
                text: '恋爱后，您希望每天和伴侣保持联系吗？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '不需要', score: 1 },
                    { id: 'q6a2', text: '偶尔联系即可', score: 2 },
                    { id: 'q6a3', text: '每天联系几次', score: 3 },
                    { id: 'q6a4', text: '希望经常联系', score: 4 },
                    { id: 'q6a5', text: '希望随时保持联系', score: 5 }
                ]
            },
            {
                id: 'q7',
                text: '当面临困难时，您更倾向于自己解决还是寻求伴侣的帮助？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '完全自己解决', score: 1 },
                    { id: 'q7a2', text: '尽量自己解决', score: 2 },
                    { id: 'q7a3', text: '视情况而定', score: 3 },
                    { id: 'q7a4', text: '倾向于寻求帮助', score: 4 },
                    { id: 'q7a5', text: '必须寻求帮助', score: 5 }
                ]
            },
            {
                id: 'q8',
                text: '如果伴侣不在身边，您会感到孤独或不安吗？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '完全不会', score: 1 },
                    { id: 'q8a2', text: '不太会', score: 2 },
                    { id: 'q8a3', text: '有时会', score: 3 },
                    { id: 'q8a4', text: '经常会', score: 4 },
                    { id: 'q8a5', text: '总是会', score: 5 }
                ]
            },
            
            // 投入方式相关
            {
                id: 'q9',
                text: '在恋爱初期，您会很快投入感情吗？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '会立刻投入', score: 5 },
                    { id: 'q9a2', text: '比较快投入', score: 4 },
                    { id: 'q9a3', text: '循序渐进', score: 3 },
                    { id: 'q9a4', text: '比较谨慎', score: 2 },
                    { id: 'q9a5', text: '非常谨慎', score: 1 }
                ]
            },
            {
                id: 'q10',
                text: '您认为在爱情中保持一定的自我空间重要吗？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '完全不重要', score: 5 },
                    { id: 'q10a2', text: '不太重要', score: 4 },
                    { id: 'q10a3', text: '一般重要', score: 3 },
                    { id: 'q10a4', text: '比较重要', score: 2 },
                    { id: 'q10a5', text: '非常重要', score: 1 }
                ]
            },
            {
                id: 'q11',
                text: '您会在恋爱中保留自己的秘密或隐私吗？',
                multi: false,
                options: [
                    { id: 'q11a1', text: '完全不保留', score: 5 },
                    { id: 'q11a2', text: '几乎不保留', score: 4 },
                    { id: 'q11a3', text: '保留一些', score: 3 },
                    { id: 'q11a4', text: '保留较多', score: 2 },
                    { id: 'q11a5', text: '保留很多', score: 1 }
                ]
            },
            
            // 长期 vs 短期相关
            {
                id: 'q12',
                text: '您开始一段感情时，通常会考虑长期发展吗？',
                multi: false,
                options: [
                    { id: 'q12a1', text: '一定会考虑', score: 5 },
                    { id: 'q12a2', text: '通常会考虑', score: 4 },
                    { id: 'q12a3', text: '视情况而定', score: 3 },
                    { id: 'q12a4', text: '不太会考虑', score: 2 },
                    { id: 'q12a5', text: '完全不考虑', score: 1 }
                ]
            },
            {
                id: 'q13',
                text: '您更看重感情中的稳定长久还是当下的激情？',
                multi: false,
                options: [
                    { id: 'q13a1', text: '绝对稳定长久', score: 5 },
                    { id: 'q13a2', text: '比较看重稳定', score: 4 },
                    { id: 'q13a3', text: '两者都重要', score: 3 },
                    { id: 'q13a4', text: '比较看重激情', score: 2 },
                    { id: 'q13a5', text: '绝对看重激情', score: 1 }
                ]
            },
            {
                id: 'q14',
                text: '您认为婚姻是爱情的必然结果吗？',
                multi: false,
                options: [
                    { id: 'q14a1', text: '绝对是', score: 5 },
                    { id: 'q14a2', text: '应该是', score: 4 },
                    { id: 'q14a3', text: '不一定', score: 3 },
                    { id: 'q14a4', text: '不太是', score: 2 },
                    { id: 'q14a5', text: '完全不是', score: 1 }
                ]
            },
            
            // 综合问题
            {
                id: 'q15',
                text: '您认为爱情中的浪漫重要吗？',
                multi: false,
                options: [
                    { id: 'q15a1', text: '非常重要', score: 5 },
                    { id: 'q15a2', text: '比较重要', score: 4 },
                    { id: 'q15a3', text: '一般重要', score: 3 },
                    { id: 'q15a4', text: '不太重要', score: 2 },
                    { id: 'q15a5', text: '完全不重要', score: 1 }
                ]
            },
            {
                id: 'q16',
                text: '在感情中，您更关注自己的感受还是对方的感受？',
                multi: false,
                options: [
                    { id: 'q16a1', text: '完全自己的感受', score: 1 },
                    { id: 'q16a2', text: '比较关注自己', score: 2 },
                    { id: 'q16a3', text: '两者平衡', score: 3 },
                    { id: 'q16a4', text: '比较关注对方', score: 4 },
                    { id: 'q16a5', text: '完全对方的感受', score: 5 }
                ]
            },
            {
                id: 'q17',
                text: '您会为了维持关系而妥协自己的原则吗？',
                multi: false,
                options: [
                    { id: 'q17a1', text: '绝对会', score: 5 },
                    { id: 'q17a2', text: '可能会', score: 4 },
                    { id: 'q17a3', text: '视情况而定', score: 3 },
                    { id: 'q17a4', text: '不太可能', score: 2 },
                    { id: 'q17a5', text: '绝对不会', score: 1 }
                ]
            },
            {
                id: 'q18',
                text: '您认为爱情需要时刻保持新鲜感吗？',
                multi: false,
                options: [
                    { id: 'q18a1', text: '非常需要', score: 5 },
                    { id: 'q18a2', text: '比较需要', score: 4 },
                    { id: 'q18a3', text: '一般需要', score: 3 },
                    { id: 'q18a4', text: '不太需要', score: 2 },
                    { id: 'q18a5', text: '完全不需要', score: 1 }
                ]
            },
            {
                id: 'q19',
                text: '您相信爱情可以战胜一切困难吗？',
                multi: false,
                options: [
                    { id: 'q19a1', text: '完全相信', score: 5 },
                    { id: 'q19a2', text: '比较相信', score: 4 },
                    { id: 'q19a3', text: '不确定', score: 3 },
                    { id: 'q19a4', text: '不太相信', score: 2 },
                    { id: 'q19a5', text: '完全不相信', score: 1 }
                ]
            },
            {
                id: 'q20',
                text: '在选择伴侣时，您更看重感觉还是理性分析？',
                multi: false,
                options: [
                    { id: 'q20a1', text: '完全凭感觉', score: 5 },
                    { id: 'q20a2', text: '比较凭感觉', score: 4 },
                    { id: 'q20a3', text: '两者平衡', score: 3 },
                    { id: 'q20a4', text: '比较理性', score: 2 },
                    { id: 'q20a5', text: '完全理性', score: 1 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 20,
                maxScore: 40,
                title: '自由灵魂',
                description: '您是一个崇尚自由的恋爱者，重视个人空间和独立性。您不喜欢被感情束缚，更享受当下的快乐而非长远规划。在爱情中，您保持着理性和自我，不会轻易妥协自己的原则。',
                suggestions: [
                    '适当尝试投入更多情感，体验不同的爱情深度',
                    '学会在保持自我的同时，也关注伴侣的感受',
                    '不要害怕承诺，美好的关系需要双方共同经营'
                ]
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '务实型恋人',
                description: '您是一个现实且理性的恋爱者，注重感情中的实际因素。您相信爱情需要物质基础，在选择伴侣时会综合考虑各方面条件。您的爱情观成熟稳重，不追求不切实际的浪漫。',
                suggestions: [
                    '偶尔放下理性，体验一些浪漫的小惊喜',
                    '不要过于计较得失，爱情有时需要感性的投入',
                    '在务实的基础上，保留一些对爱情的美好期待'
                ]
            },
            {
                minScore: 61,
                maxScore: 80,
                title: '安全感守护者',
                description: '您是一个重视安全感和稳定性的恋爱者，希望与伴侣建立长期稳定的关系。您在感情中比较依赖对方，也愿意为了维持关系做出适当的妥协。您相信爱情需要用心经营和维护。',
                suggestions: [
                    '在依赖他人的同时，也要保持自己的独立性',
                    '不要过度担心失去，信任是感情的基础',
                    '给予彼此适当的空间，让感情保持活力'
                ]
            },
            {
                minScore: 81,
                maxScore: 100,
                title: '浪漫派',
                description: '您是一个充满浪漫情怀的恋爱者，相信爱情的力量和美好的感觉。您容易陷入感情，愿意为爱情付出和牺牲。您追求激情和浪漫，重视心灵的契合和情感的交流。',
                suggestions: [
                    '在浪漫的同时，也要保持一定的理性思考',
                    '不要过于理想化爱情，接受现实中的不完美',
                    '学会平衡付出和索取，让感情更加健康持久'
                ]
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