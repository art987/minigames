(function() {
    // 直接设置测试ID，确保与配置文件一致
    const testId = 'ideal_partner';

    // 测试数据
    const testData = {
        id: testId,
        title: '理想伴侣画像测试',
        description: '通过一系列问题探索你在伴侣身上最看重的特质、感情中的核心需求和对理想伴侣的隐性期待。',
        category: '爱情与人际关系类',
        questionCount: 15,
        totalScore: 100,
        estimateMinutes: 5,
        questions: [
        {
            id: 'q1',
            text: '如果你度假旅行，你最希望对方是什么样的性格？',
            multi: false,
            options: [
                { id: 'q1a1', text: '活泼带动氛围', score: 6 },
                { id: 'q1a2', text: '细心照顾你', score: 5 },
                { id: 'q1a3', text: '理智安排行程', score: 4 },
                { id: 'q1a4', text: '随性自由', score: 7 }
            ]
        },
        {
            id: 'q2',
            text: '在吵架后，你希望对方的反应是？',
            multi: false,
            options: [
                { id: 'q2a1', text: '主动道歉', score: 5 },
                { id: 'q2a2', text: '冷静分析', score: 4 },
                { id: 'q2a3', text: '给你空间', score: 6 },
                { id: 'q2a4', text: '继续讲理', score: 3 }
            ]
        },
        {
            id: 'q3',
            text: '如果生活遇到困难，你最需要对方的支持是什么？',
            multi: false,
            options: [
                { id: 'q3a1', text: '情绪安慰', score: 5 },
                { id: 'q3a2', text: '实际帮忙', score: 4 },
                { id: 'q3a3', text: '陪你一起想办法', score: 3 },
                { id: 'q3a4', text: '坚定鼓励', score: 6 }
            ]
        },
        {
            id: 'q4',
            text: '你更看重对方的哪个方面？',
            multi: false,
            options: [
                { id: 'q4a1', text: '外貌气质', score: 6 },
                { id: 'q4a2', text: '性格脾气', score: 5 },
                { id: 'q4a3', text: '价值观', score: 4 },
                { id: 'q4a4', text: '经济条件', score: 3 }
            ]
        },
        {
            id: 'q5',
            text: '你希望你们的相处模式更偏向于？',
            multi: false,
            options: [
                { id: 'q5a1', text: '形影不离', score: 5 },
                { id: 'q5a2', text: '彼此独立', score: 7 },
                { id: 'q5a3', text: '相互扶持', score: 4 },
                { id: 'q5a4', text: '共同成长', score: 3 }
            ]
        },
        {
            id: 'q6',
            text: '在约会时，你更期待对方？',
            multi: false,
            options: [
                { id: 'q6a1', text: '精心安排浪漫惊喜', score: 7 },
                { id: 'q6a2', text: '陪伴你做喜欢的事', score: 6 },
                { id: 'q6a3', text: '深入交流思想', score: 4 },
                { id: 'q6a4', text: '放松自然相处', score: 7 }
            ]
        },
        {
            id: 'q7',
            text: '你更不能接受对方的哪种缺点？',
            multi: false,
            options: [
                { id: 'q7a1', text: '不体贴', score: 6 },
                { id: 'q7a2', text: '不幽默', score: 7 },
                { id: 'q7a3', text: '不理性', score: 4 },
                { id: 'q7a4', text: '不独立', score: 7 }
            ]
        },
        {
            id: 'q8',
            text: '你希望对方在社交场合表现得？',
            multi: false,
            options: [
                { id: 'q8a1', text: '开朗健谈', score: 6 },
                { id: 'q8a2', text: '温柔倾听', score: 5 },
                { id: 'q8a3', text: '成熟稳重', score: 4 },
                { id: 'q8a4', text: '特立独行', score: 6 }
            ]
        },
        {
            id: 'q9',
            text: '在未来规划中，你希望对方？',
            multi: false,
            options: [
                { id: 'q9a1', text: '尊重你的决定', score: 7 },
                { id: 'q9a2', text: '与你共同协商', score: 5 },
                { id: 'q9a3', text: '提供明确方向', score: 4 },
                { id: 'q9a4', text: '支持你的梦想', score: 6 }
            ]
        },
        {
            id: 'q10',
            text: '你更欣赏对方的哪种品质？',
            multi: false,
            options: [
                { id: 'q10a1', text: '善良体贴', score: 6 },
                { id: 'q10a2', text: '勇敢自信', score: 7 },
                { id: 'q10a3', text: '聪明理智', score: 4 },
                { id: 'q10a4', text: '洒脱随性', score: 7 }
            ]
        },
        {
            id: 'q11',
            text: '你希望对方如何表达爱意？',
            multi: false,
            options: [
                { id: 'q11a1', text: '甜言蜜语', score: 5 },
                { id: 'q11a2', text: '实际行动', score: 4 },
                { id: 'q11a3', text: '细心照顾', score: 5 },
                { id: 'q11a4', text: '尊重理解', score: 6 }
            ]
        },
        {
            id: 'q12',
            text: '你更倾向于和对方分享？',
            multi: false,
            options: [
                { id: 'q12a1', text: '日常琐事', score: 5 },
                { id: 'q12a2', text: '内心感受', score: 6 },
                { id: 'q12a3', text: '想法观点', score: 4 },
                { id: 'q12a4', text: '各自保持空间', score: 7 }
            ]
        },
        {
            id: 'q13',
            text: '你希望对方在生活习惯上？',
            multi: false,
            options: [
                { id: 'q13a1', text: '干净整洁', score: 5 },
                { id: 'q13a2', text: '随性舒适', score: 7 },
                { id: 'q13a3', text: '规律有序', score: 4 },
                { id: 'q13a4', text: '有趣多变', score: 6 }
            ]
        },
        {
            id: 'q14',
            text: '在面对压力时，你希望对方？',
            multi: false,
            options: [
                { id: 'q14a1', text: '耐心倾听', score: 5 },
                { id: 'q14a2', text: '积极解决', score: 4 },
                { id: 'q14a3', text: '给予空间', score: 6 },
                { id: 'q14a4', text: '鼓励支持', score: 5 }
            ]
        },
        {
            id: 'q15',
            text: '你认为一段关系中最重要的是？',
            multi: false,
            options: [
                { id: 'q15a1', text: '彼此相爱', score: 6 },
                { id: 'q15a2', text: '相互理解', score: 7 },
                { id: 'q15a3', text: '共同成长', score: 4 },
                { id: 'q15a4', text: '各自独立', score: 6 }
            ]
        }
    ],
    resultRanges: [
        {
            minScore: 0,
            maxScore: 49,
            title: '理智型伴侣',
            description: '你理想中的伴侣是冷静、善于规划的类型。你看重对方的理性思维和解决问题的能力，希望在感情中能够保持稳定和清晰的方向。这种类型的伴侣适合追求稳定生活的你，能够与你共同面对生活中的各种挑战。',
            suggestions: ['在寻找伴侣时，可以多关注对方的思维方式和解决问题的能力。', '理性的伴侣可能不善于表达情感，需要你主动创造浪漫氛围。', '保持有效的沟通是维持与理智型伴侣关系的关键。']
        },
        {
            minScore: 50,
            maxScore: 64,
            title: '温暖型伴侣',
            description: '你理想中的伴侣是贴心、懂照顾、会给你安全感的类型。你看重对方的体贴和关怀，希望在感情中能够感受到被爱和被重视。这种类型的伴侣适合渴望温暖家庭氛围的你，能够为你提供情感上的支持和依靠。',
            suggestions: ['温暖型伴侣通常很在意细节，记得回应他们的关心。', '在生活中多表达你的感激和爱意，让对方感受到你的重视。', '共同参与家庭活动可以增强你们之间的亲密感。']
        },
        {
            minScore: 65,
            maxScore: 84,
            title: '冒险型伴侣',
            description: '你理想中的伴侣是带来激情和新鲜感的类型。你看重对方的活力和创造力，希望在感情中能够不断探索新的体验。这种类型的伴侣适合喜欢挑战的你，能够与你一起创造丰富多彩的生活。',
            suggestions: ['与冒险型伴侣相处，保持开放的心态很重要。', '尝试共同参与新颖的活动，维持关系中的激情。', '在追求新鲜感的同时，也要注意建立稳定的感情基础。']
        },
        {
            minScore: 85,
            maxScore: 100,
            title: '自由型伴侣',
            description: '你理想中的伴侣是尊重独立、给你足够空间的类型。你看重对方的理解和包容，希望在感情中能够保持自我。这种类型的伴侣适合注重个人空间的你，能够与你建立一种相互信任又彼此独立的关系。',
            suggestions: ['与自由型伴侣相处，信任是最重要的基石。', '尊重彼此的个人空间，同时也要保持适当的沟通。', '在保持独立的同时，别忘了定期分享你们的生活和感受。']
        }
    ]
};

    // 注册到window.TestRegistry
    if (window.TestRegistry) {
        window.TestRegistry.register(testData);
    }

    // 注册到window.TestDatasets
    if (!window.TestDatasets) {
        window.TestDatasets = {};
    }
    window.TestDatasets[testData.id] = testData;
})();



