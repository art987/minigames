(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'love_communication_style';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '恋爱沟通方式测试',
        description: '本测试旨在评估你在恋爱关系中的沟通风格和能力，帮助你了解自己的沟通特点以及如何改进与伴侣的交流。',
        category: '爱情与人际关系类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 5,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '当伴侣对你表达不满时，你通常的反应是：',
                multi: false,
                options: [
                    { id: 'q1a1', text: '认真倾听并尝试理解对方的感受', score: 10 },
                    { id: 'q1a2', text: '为自己辩护并解释原因', score: 7 },
                    { id: 'q1a3', text: '沉默不语，避免冲突', score: 4 },
                    { id: 'q1a4', text: '反击对方，指出其不足', score: 1 }
                ]
            },
            {
                id: 'q2',
                text: '你如何表达对伴侣的爱意？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '经常用言语表达"我爱你"', score: 8 },
                    { id: 'q2a2', text: '通过行动和关怀来表达', score: 10 },
                    { id: 'q2a3', text: '偶尔送礼物表示心意', score: 6 },
                    { id: 'q2a4', text: '认为爱不需要经常表达', score: 3 }
                ]
            },
            {
                id: 'q3',
                text: '当你和伴侣发生争执时，你倾向于：',
                multi: false,
                options: [
                    { id: 'q3a1', text: '寻求共同点，协商解决问题', score: 10 },
                    { id: 'q3a2', text: '坚持自己的观点，希望对方妥协', score: 6 },
                    { id: 'q3a3', text: '暂时回避，等双方冷静后再谈', score: 7 },
                    { id: 'q3a4', text: '直接表达不满，甚至争吵', score: 3 }
                ]
            },
            {
                id: 'q4',
                text: '当伴侣分享他/她的喜悦时，你通常：',
                multi: false,
                options: [
                    { id: 'q4a1', text: '真诚地为对方感到高兴，并积极回应', score: 10 },
                    { id: 'q4a2', text: '表示祝贺，但不会表现得特别兴奋', score: 7 },
                    { id: 'q4a3', text: '转移话题，谈论自己的事情', score: 4 },
                    { id: 'q4a4', text: '觉得对方有点夸张', score: 2 }
                ]
            },
            {
                id: 'q5',
                text: '关于你们之间的未来规划，你会：',
                multi: false,
                options: [
                    { id: 'q5a1', text: '经常和伴侣一起讨论并制定计划', score: 10 },
                    { id: 'q5a2', text: '听从伴侣的安排', score: 5 },
                    { id: 'q5a3', text: '自己做决定后再告诉伴侣', score: 6 },
                    { id: 'q5a4', text: '觉得不需要太多规划', score: 3 }
                ]
            },
            {
                id: 'q6',
                text: '当你感到压力或不开心时，你会：',
                multi: false,
                options: [
                    { id: 'q6a1', text: '向伴侣倾诉，寻求支持', score: 9 },
                    { id: 'q6a2', text: '自己处理，不希望给对方添麻烦', score: 6 },
                    { id: 'q6a3', text: '表现出情绪，但不具体说明原因', score: 5 },
                    { id: 'q6a4', text: '对伴侣变得冷淡或挑剔', score: 2 }
                ]
            },
            {
                id: 'q7',
                text: '你认为在恋爱关系中，诚实和隐瞒的平衡是：',
                multi: false,
                options: [
                    { id: 'q7a1', text: '应该保持绝对诚实，包括敏感话题', score: 10 },
                    { id: 'q7a2', text: '大部分事情要诚实，但有些小事情可以隐瞒', score: 8 },
                    { id: 'q7a3', text: '只告诉对方必要的事情', score: 5 },
                    { id: 'q7a4', text: '保留个人隐私，不分享太多', score: 3 }
                ]
            },
            {
                id: 'q8',
                text: '当伴侣提出需要更多个人空间时，你会：',
                multi: false,
                options: [
                    { id: 'q8a1', text: '理解并尊重对方的需求', score: 10 },
                    { id: 'q8a2', text: '感到不安，但尝试接受', score: 7 },
                    { id: 'q8a3', text: '认为这是关系出现问题的信号', score: 4 },
                    { id: 'q8a4', text: '拒绝并要求对方更多陪伴', score: 2 }
                ]
            },
            {
                id: 'q9',
                text: '在沟通中，你更注重：',
                multi: false,
                options: [
                    { id: 'q9a1', text: '表达清晰，避免误解', score: 9 },
                    { id: 'q9a2', text: '照顾对方的感受', score: 10 },
                    { id: 'q9a3', text: '快速解决问题', score: 6 },
                    { id: 'q9a4', text: '坚持自己的立场', score: 4 }
                ]
            },
            {
                id: 'q10',
                text: '当你需要伴侣的帮助时，你会：',
                multi: false,
                options: [
                    { id: 'q10a1', text: '直接提出请求，并表达感谢', score: 10 },
                    { id: 'q10a2', text: '暗示对方，但不明确说明', score: 6 },
                    { id: 'q10a3', text: '自己想办法解决，不麻烦对方', score: 5 },
                    { id: 'q10a4', text: '认为对方应该主动帮忙', score: 3 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 80,
                maxScore: 100,
                title: '优秀的沟通者',
                description: '你拥有出色的恋爱沟通能力，能够清晰地表达自己，同时尊重和理解伴侣的观点。你善于处理冲突，用建设性的方式解决问题。这种沟通方式有助于建立健康、稳定的恋爱关系。',
                suggestions: [
                    '保持开放和诚实的沟通态度',
                    '学会积极倾听，不打断对方',
                    '注意非言语沟通的重要性',
                    '在冲突中保持冷静，聚焦问题本身',
                    '定期与伴侣分享感受和需求'
                ]
            },
            {
                minScore: 60,
                maxScore: 79,
                title: '良好的沟通者',
                description: '你的恋爱沟通能力不错，能够表达自己的想法和感受，也愿意倾听对方。在处理冲突时，你倾向于寻找共同点。继续保持开放的心态，进一步提高非言语沟通的敏感度。',
                suggestions: [
                    '保持开放和诚实的沟通态度',
                    '学会积极倾听，不打断对方',
                    '注意非言语沟通的重要性',
                    '在冲突中保持冷静，聚焦问题本身',
                    '定期与伴侣分享感受和需求'
                ]
            },
            {
                minScore: 40,
                maxScore: 59,
                title: '需要改进的沟通者',
                description: '你的恋爱沟通能力还有提升空间。有时候你可能会在表达或倾听方面遇到困难，或者在冲突中采取不太理想的应对方式。尝试更加直接、坦诚地表达自己，同时多关注伴侣的需求和感受。',
                suggestions: [
                    '保持开放和诚实的沟通态度',
                    '学会积极倾听，不打断对方',
                    '注意非言语沟通的重要性',
                    '在冲突中保持冷静，聚焦问题本身',
                    '定期与伴侣分享感受和需求'
                ]
            },
            {
                minScore: 0,
                maxScore: 39,
                title: '沟通能力待提升',
                description: '你在恋爱沟通方面可能存在一些挑战。可能你倾向于避免冲突，或者不善于表达自己的真实感受。建议你学习有效的沟通技巧，如积极倾听、非暴力沟通等，这将有助于改善你的恋爱关系。',
                suggestions: [
                    '保持开放和诚实的沟通态度',
                    '学会积极倾听，不打断对方',
                    '注意非言语沟通的重要性',
                    '在冲突中保持冷静，聚焦问题本身',
                    '定期与伴侣分享感受和需求'
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