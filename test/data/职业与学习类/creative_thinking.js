(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'creative_thinking';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '创新思维能力测试',
        description: '本测验将评估您的创新思维能力，涵盖问题解决、思维灵活性、发散思维和创造性表达等多个维度。',
        category: '职业与学习类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 4,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '当遇到一个新问题时，您通常会：',
                multi: false,
                options: [
                    { id: 'q1a1', text: '使用过去成功的方法', score: 20 },
                    { id: 'q1a2', text: '寻求他人的建议', score: 30 },
                    { id: 'q1a3', text: '尝试多种不同的解决途径', score: 40 },
                    { id: 'q1a4', text: '等待问题自行解决', score: 10 }
                ]
            },
            {
                id: 'q2',
                text: '在团队讨论中，您对提出非常规想法的成员会：',
                multi: false,
                options: [
                    { id: 'q2a1', text: '持怀疑态度，认为不切实际', score: 10 },
                    { id: 'q2a2', text: '保持中立，看其他人的反应', score: 20 },
                    { id: 'q2a3', text: '鼓励并帮助完善想法', score: 40 },
                    { id: 'q2a4', text: '部分接受，但倾向于传统方案', score: 30 }
                ]
            },
            {
                id: 'q3',
                text: '当需要完成一项任务时，您更倾向于：',
                multi: false,
                options: [
                    { id: 'q3a1', text: '严格按照既定流程执行', score: 10 },
                    { id: 'q3a2', text: '在执行过程中做一些小的改进', score: 30 },
                    { id: 'q3a3', text: '寻找更高效或更有趣的方法', score: 40 },
                    { id: 'q3a4', text: '根据自己的经验灵活处理', score: 20 }
                ]
            },
            {
                id: 'q4',
                text: '面对一个复杂问题，您通常会：',
                multi: false,
                options: [
                    { id: 'q4a1', text: '分解为多个简单部分逐一解决', score: 30 },
                    { id: 'q4a2', text: '从整体角度思考，寻找关联点', score: 40 },
                    { id: 'q4a3', text: '参考类似问题的解决方案', score: 20 },
                    { id: 'q4a4', text: '依赖专家的意见', score: 10 }
                ]
            },
            {
                id: 'q5',
                text: '当您的想法被他人否定时，您会：',
                multi: false,
                options: [
                    { id: 'q5a1', text: '立即放弃，接受他人的观点', score: 10 },
                    { id: 'q5a2', text: '坚持自己的观点并试图说服他人', score: 20 },
                    { id: 'q5a3', text: '询问原因，思考是否有改进空间', score: 40 },
                    { id: 'q5a4', text: '表面接受，但内心保留看法', score: 30 }
                ]
            },
            {
                id: 'q6',
                text: '在日常生活中，您是否经常尝试新鲜事物？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '很少，更喜欢熟悉的事物', score: 10 },
                    { id: 'q6a2', text: '偶尔，但需要他人推荐', score: 20 },
                    { id: 'q6a3', text: '经常，喜欢尝试不同的体验', score: 40 },
                    { id: 'q6a4', text: '视情况而定，感兴趣的才会尝试', score: 30 }
                ]
            },
            {
                id: 'q7',
                text: '当需要产生创意时，您更倾向于：',
                multi: false,
                options: [
                    { id: 'q7a1', text: '独自思考，不受干扰', score: 20 },
                    { id: 'q7a2', text: '与他人头脑风暴，激发灵感', score: 40 },
                    { id: 'q7a3', text: '查阅资料，寻找启发', score: 30 },
                    { id: 'q7a4', text: '等待灵感自然出现', score: 10 }
                ]
            },
            {
                id: 'q8',
                text: '对于"打破常规"的行为，您的看法是：',
                multi: false,
                options: [
                    { id: 'q8a1', text: '风险太大，不建议尝试', score: 10 },
                    { id: 'q8a2', text: '需要谨慎评估后再决定', score: 30 },
                    { id: 'q8a3', text: '是创新的必要途径', score: 40 },
                    { id: 'q8a4', text: '只在特定情况下可行', score: 20 }
                ]
            },
            {
                id: 'q9',
                text: '当面对两种看似矛盾的观点时，您会：',
                multi: false,
                options: [
                    { id: 'q9a1', text: '选择其中一个更合理的观点', score: 20 },
                    { id: 'q9a2', text: '寻找两者的共同点和互补性', score: 40 },
                    { id: 'q9a3', text: '认为两者都有道理，但难以整合', score: 30 },
                    { id: 'q9a4', text: '避免参与这类讨论', score: 10 }
                ]
            },
            {
                id: 'q10',
                text: '您认为创新思维最重要的特质是：',
                multi: false,
                options: [
                    { id: 'q10a1', text: '逻辑思维能力', score: 20 },
                    { id: 'q10a2', text: '想象力和发散思维', score: 40 },
                    { id: 'q10a3', text: '坚持和毅力', score: 30 },
                    { id: 'q10a4', text: '知识储备和经验', score: 30 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '创新思维萌芽阶段',
                description: '您的创新思维能力处于萌芽阶段，在面对问题时更倾向于使用传统方法，对新鲜事物的接受度较低。',
                suggestions: ['尝试从不同角度思考问题', '主动接触新领域的知识', '练习头脑风暴等创新技巧']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '创新思维基础阶段',
                description: '您具备一定的创新思维能力，能够理解创新的重要性，但在实际应用中还不够灵活和自信。',
                suggestions: ['多参与创意活动', '培养对问题的好奇心', '学习系统化的创新方法']
            },
            {
                minScore: 61,
                maxScore: 75,
                title: '创新思维良好阶段',
                description: '您的创新思维能力处于良好水平，能够灵活运用创新方法解决问题，也乐于接受新观念和新事物。',
                suggestions: ['进一步拓展知识面', '挑战更复杂的创新任务', '与不同领域的人交流合作']
            },
            {
                minScore: 76,
                maxScore: 90,
                title: '创新思维优秀阶段',
                description: '您是一位具有优秀创新思维能力的人，能够独立产生新颖的想法，并将其转化为实际解决方案。',
                suggestions: ['持续锻炼思维灵活性', '培养批判性思维', '成为团队中的创新推动者']
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '创新思维卓越阶段',
                description: '您拥有卓越的创新思维能力，能够在复杂情境中产生突破性的想法，是真正的创新者。',
                suggestions: ['将创新能力应用到更广泛的领域', '分享您的创新经验和方法', '培养下一代创新人才']
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