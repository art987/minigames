(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'sleep_quality';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '睡眠质量测试',
        description: '本测验将评估您的睡眠质量，涵盖入睡时间、睡眠深度、睡眠时长和睡眠满意度等多个维度。',
        category: '健康与生活习惯类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 4,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '您通常需要多长时间才能入睡？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '10分钟以内', score: 40 },
                    { id: 'q1a2', text: '11-30分钟', score: 30 },
                    { id: 'q1a3', text: '31-60分钟', score: 20 },
                    { id: 'q1a4', text: '60分钟以上', score: 10 }
                ]
            },
            {
                id: 'q2',
                text: '您在夜间醒来的频率如何？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '几乎不醒来', score: 40 },
                    { id: 'q2a2', text: '偶尔醒来1次', score: 30 },
                    { id: 'q2a3', text: '经常醒来2-3次', score: 20 },
                    { id: 'q2a4', text: '频繁醒来4次以上', score: 10 }
                ]
            },
            {
                id: 'q3',
                text: '您每晚的平均睡眠时长是多少？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '7-9小时（推荐时长）', score: 40 },
                    { id: 'q3a2', text: '6-7小时或9-10小时', score: 30 },
                    { id: 'q3a3', text: '5-6小时或10-11小时', score: 20 },
                    { id: 'q3a4', text: '少于5小时或超过11小时', score: 10 }
                ]
            },
            {
                id: 'q4',
                text: '您早晨醒来时的感觉如何？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '神清气爽，精力充沛', score: 40 },
                    { id: 'q4a2', text: '基本清醒，但有点疲惫', score: 30 },
                    { id: 'q4a3', text: '比较疲惫，需要赖床', score: 20 },
                    { id: 'q4a4', text: '非常疲惫，不想起床', score: 10 }
                ]
            },
            {
                id: 'q5',
                text: '您是否经常在白天感到困倦或需要小睡？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '几乎从不', score: 40 },
                    { id: 'q5a2', text: '偶尔（每周1-2次）', score: 30 },
                    { id: 'q5a3', text: '经常（每周3-5次）', score: 20 },
                    { id: 'q5a4', text: '几乎每天', score: 10 }
                ]
            },
            {
                id: 'q6',
                text: '您对自己的睡眠质量总体评价如何？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '非常好', score: 40 },
                    { id: 'q6a2', text: '良好', score: 30 },
                    { id: 'q6a3', text: '一般', score: 20 },
                    { id: 'q6a4', text: '差', score: 10 }
                ]
            },
            {
                id: 'q7',
                text: '您是否有规律的睡眠时间表（包括周末）？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '是的，非常规律', score: 40 },
                    { id: 'q7a2', text: '基本规律，但周末会晚一点', score: 30 },
                    { id: 'q7a3', text: '不太规律，经常变化', score: 20 },
                    { id: 'q7a4', text: '没有规律，完全随机', score: 10 }
                ]
            },
            {
                id: 'q8',
                text: '您在睡眠中是否经常做梦或做噩梦？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '很少做梦', score: 30 },
                    { id: 'q8a2', text: '偶尔做普通梦', score: 40 },
                    { id: 'q8a3', text: '经常做普通梦', score: 20 },
                    { id: 'q8a4', text: '经常做噩梦', score: 10 }
                ]
            },
            {
                id: 'q9',
                text: '您的睡眠环境（如噪音、光线、温度等）如何？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '非常舒适，几乎没有干扰', score: 40 },
                    { id: 'q9a2', text: '比较舒适，偶尔有轻微干扰', score: 30 },
                    { id: 'q9a3', text: '一般，有一些干扰但能入睡', score: 20 },
                    { id: 'q9a4', text: '较差，有明显干扰影响睡眠', score: 10 }
                ]
            },
            {
                id: 'q10',
                text: '您是否有以下睡眠问题？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '没有明显的睡眠问题', score: 40 },
                    { id: 'q10a2', text: '轻微的打鼾或睡眠呼吸暂停', score: 30 },
                    { id: 'q10a3', text: '轻度失眠或睡眠障碍', score: 20 },
                    { id: 'q10a4', text: '严重的睡眠问题，影响日常生活', score: 10 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '睡眠质量差',
                description: '您的睡眠质量较差，可能存在较为严重的睡眠问题，需要引起重视。睡眠问题可能会影响您的身体健康和日常生活质量。',
                suggestions: ['保持规律的作息时间', '创造良好的睡眠环境', '避免睡前使用电子设备', '如长期睡眠问题严重，建议咨询医生']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '睡眠质量一般',
                description: '您的睡眠质量处于一般水平，存在一些需要改进的地方。通过调整睡眠习惯，您的睡眠质量有望得到明显提升。',
                suggestions: ['设定固定的睡觉和起床时间', '避免睡前摄入咖啡因和大量食物', '建立放松的睡前习惯', '适当增加白天的运动量']
            },
            {
                minScore: 61,
                maxScore: 75,
                title: '睡眠质量良好',
                description: '您的睡眠质量处于良好水平，大部分情况下能够获得足够的休息。继续保持良好的睡眠习惯，进一步优化睡眠环境。',
                suggestions: ['定期评估和调整睡眠环境', '保持健康的饮食和运动习惯', '学习压力管理技巧', '避免熬夜和不规则作息']
            },
            {
                minScore: 76,
                maxScore: 90,
                title: '睡眠质量优秀',
                description: '您拥有优秀的睡眠质量，能够充分休息和恢复精力。良好的睡眠是健康生活的重要基础，继续保持！',
                suggestions: ['保持现有的健康睡眠习惯', '根据季节变化适当调整作息', '分享您的睡眠经验和方法', '关注睡眠与整体健康的关系']
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '睡眠质量卓越',
                description: '您的睡眠质量堪称完美，几乎没有睡眠问题。您的睡眠习惯非常健康，这对您的身心健康和工作效率都有极大的益处。',
                suggestions: ['继续保持卓越的睡眠习惯', '帮助身边的人改善睡眠质量', '探索更深入的睡眠健康知识', '将良好的睡眠习惯融入到生活的各个方面']
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