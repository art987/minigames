// 运动习惯自评测试
(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'exercise_habit_self_assessment';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '运动习惯自评',
        description: '通过这个测试评估您的运动习惯和健康生活方式',
        category: '健康与生活习惯类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 5,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '您每周运动几次？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '几乎不运动', score: 0 },
                    { id: 'q1a2', text: '每周1次', score: 10 },
                    { id: 'q1a3', text: '每周2-3次', score: 20 },
                    { id: 'q1a4', text: '每周4-5次', score: 15 },
                    { id: 'q1a5', text: '每周6次以上', score: 10 }
                ]
            },
            {
                id: 'q2',
                text: '您每次运动的持续时间大约是？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '少于30分钟', score: 0 },
                    { id: 'q2a2', text: '30-45分钟', score: 8 },
                    { id: 'q2a3', text: '45-60分钟', score: 10 },
                    { id: 'q2a4', text: '60-90分钟', score: 6 },
                    { id: 'q2a5', text: '90分钟以上', score: 4 }
                ]
            },
            {
                id: 'q3',
                text: '您通常进行哪种类型的运动？',
                multi: true,
                options: [
                    { id: 'q3a1', text: '有氧运动（跑步、游泳、骑行等）', score: 5 },
                    { id: 'q3a2', text: '力量训练（举重、俯卧撑等）', score: 5 },
                    { id: 'q3a3', text: '柔韧性训练（瑜伽、普拉提等）', score: 5 },
                    { id: 'q3a4', text: '球类运动（篮球、足球、羽毛球等）', score: 5 },
                    { id: 'q3a5', text: '几乎不做任何运动', score: 0 }
                ]
            },
            {
                id: 'q4',
                text: '您运动时的强度如何？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '非常轻松，几乎不感觉累', score: 0 },
                    { id: 'q4a2', text: '比较轻松，可以轻松说话', score: 4 },
                    { id: 'q4a3', text: '中等强度，说话需要喘气', score: 7 },
                    { id: 'q4a4', text: '高强度，无法连续说话', score: 5 },
                    { id: 'q4a5', text: '非常高强度，只能坚持短时间', score: 3 }
                ]
            },
            {
                id: 'q5',
                text: '您是否有固定的运动时间安排？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '没有固定时间，随机运动', score: 2 },
                    { id: 'q5a2', text: '偶尔有固定时间，但经常变动', score: 5 },
                    { id: 'q5a3', text: '大部分时间有固定时间', score: 8 },
                    { id: 'q5a4', text: '每天都有固定的运动时间', score: 10 }
                ]
            },
            {
                id: 'q6',
                text: '您运动的主要目的是什么？',
                multi: true,
                options: [
                    { id: 'q6a1', text: '保持健康', score: 4 },
                    { id: 'q6a2', text: '减肥塑形', score: 3 },
                    { id: 'q6a3', text: '增强体能', score: 3 },
                    { id: 'q6a4', text: '缓解压力', score: 3 },
                    { id: 'q6a5', text: '社交活动', score: 2 },
                    { id: 'q6a6', text: '其他原因', score: 1 }
                ]
            },
            {
                id: 'q7',
                text: '过去一个月中，您因为各种原因取消运动的次数是？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '0次', score: 10 },
                    { id: 'q7a2', text: '1-2次', score: 8 },
                    { id: 'q7a3', text: '3-5次', score: 5 },
                    { id: 'q7a4', text: '6-8次', score: 2 },
                    { id: 'q7a5', text: '8次以上', score: 0 }
                ]
            },
            {
                id: 'q8',
                text: '您是否会在运动后做拉伸放松？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '从不做拉伸', score: 0 },
                    { id: 'q8a2', text: '偶尔做拉伸', score: 3 },
                    { id: 'q8a3', text: '经常做拉伸，但时间较短', score: 7 },
                    { id: 'q8a4', text: '每次运动后都会做充分的拉伸', score: 10 }
                ]
            },
            {
                id: 'q9',
                text: '您是否注意运动前后的饮食和水分补充？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '从不注意', score: 0 },
                    { id: 'q9a2', text: '偶尔注意', score: 3 },
                    { id: 'q9a3', text: '一般会注意', score: 7 },
                    { id: 'q9a4', text: '非常注意，有科学的饮食安排', score: 10 }
                ]
            },
            {
                id: 'q10',
                text: '您对自己当前的运动习惯满意吗？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '非常不满意，需要大幅改善', score: 0 },
                    { id: 'q10a2', text: '不太满意，有改进空间', score: 4 },
                    { id: 'q10a3', text: '一般，马马虎虎', score: 7 },
                    { id: 'q10a4', text: '比较满意，但还可以更好', score: 9 },
                    { id: 'q10a5', text: '非常满意，已经形成良好习惯', score: 10 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '运动习惯较差',
                description: '您的运动习惯有待改善，运动量不足可能会影响身体健康。',
                suggestions: ['制定简单可行的运动计划，从低强度开始', '寻找自己喜欢的运动方式，提高坚持度', '尝试和朋友一起运动，增加趣味性']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '运动习惯一般',
                description: '您有一定的运动意识，但还需要进一步提升和坚持。',
                suggestions: ['设定明确的运动目标，保持动力', '逐渐增加运动频率和强度', '养成规律的运动时间']
            },
            {
                minScore: 61,
                maxScore: 80,
                title: '运动习惯良好',
                description: '您的运动习惯较好，已经形成了一定的运动规律。',
                suggestions: ['保持现有运动习惯，适当增加多样性', '关注运动后的恢复和营养', '可以尝试设定新的运动挑战']
            },
            {
                minScore: 81,
                maxScore: 100,
                title: '运动习惯优秀',
                description: '恭喜您！您已经拥有非常健康的运动习惯。',
                suggestions: ['继续保持出色的运动习惯', '可以考虑指导和鼓励他人参与运动', '探索更多运动形式，保持新鲜感']
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