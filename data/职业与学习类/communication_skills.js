(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'communication_skills';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '沟通表达能力分析',
        description: '本测验将评估您的沟通表达能力，涵盖口头表达、书面表达、倾听技巧和非语言沟通等多个维度。',
        category: '职业与学习类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 4,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '在与他人交流时，您通常会：',
                multi: false,
                options: [
                    { id: 'q1a1', text: '倾向于倾听，很少主动表达', score: 20 },
                    { id: 'q1a2', text: '根据对方的反应调整表达', score: 40 },
                    { id: 'q1a3', text: '直接表达自己的想法', score: 30 },
                    { id: 'q1a4', text: '感到紧张，避免过多交流', score: 10 }
                ]
            },
            {
                id: 'q2',
                text: '当需要向他人解释复杂的概念时，您会：',
                multi: false,
                options: [
                    { id: 'q2a1', text: '尽量简化语言，使用例子说明', score: 40 },
                    { id: 'q2a2', text: '按照自己的理解直接解释', score: 20 },
                    { id: 'q2a3', text: '依赖专业术语确保准确性', score: 30 },
                    { id: 'q2a4', text: '觉得解释起来很困难', score: 10 }
                ]
            },
            {
                id: 'q3',
                text: '在团队会议中，您的参与度如何？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '很少发言，主要倾听', score: 20 },
                    { id: 'q3a2', text: '偶尔发表看法，视话题而定', score: 30 },
                    { id: 'q3a3', text: '积极参与讨论，贡献想法', score: 40 },
                    { id: 'q3a4', text: '避免参与，担心表达不好', score: 10 }
                ]
            },
            {
                id: 'q4',
                text: '当您收到不明确的信息时，您会：',
                multi: false,
                options: [
                    { id: 'q4a1', text: '假设自己理解了，继续行动', score: 10 },
                    { id: 'q4a2', text: '感到困惑，但不好意思询问', score: 20 },
                    { id: 'q4a3', text: '尝试从上下文推断含义', score: 30 },
                    { id: 'q4a4', text: '及时澄清，确保理解正确', score: 40 }
                ]
            },
            {
                id: 'q5',
                text: '在写作报告或邮件时，您通常会：',
                multi: false,
                options: [
                    { id: 'q5a1', text: '简单直接，尽量简洁', score: 30 },
                    { id: 'q5a2', text: '组织清晰，逻辑严谨', score: 40 },
                    { id: 'q5a3', text: '想到什么写什么，缺乏条理', score: 10 },
                    { id: 'q5a4', text: '反复修改，确保用词准确', score: 20 }
                ]
            },
            {
                id: 'q6',
                text: '当与意见不同的人沟通时，您会：',
                multi: false,
                options: [
                    { id: 'q6a1', text: '坚持自己的观点，试图说服对方', score: 20 },
                    { id: 'q6a2', text: '避免争论，保持沉默', score: 10 },
                    { id: 'q6a3', text: '尊重对方观点，寻找共同点', score: 40 },
                    { id: 'q6a4', text: '表达不同意见，但保持礼貌', score: 30 }
                ]
            },
            {
                id: 'q7',
                text: '您如何评价自己的非语言沟通能力（如肢体语言、面部表情等）？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '不太注意，自然表达', score: 20 },
                    { id: 'q7a2', text: '经常使用，增强沟通效果', score: 40 },
                    { id: 'q7a3', text: '意识到重要性，但使用不多', score: 30 },
                    { id: 'q7a4', text: '很少使用，主要依靠语言', score: 10 }
                ]
            },
            {
                id: 'q8',
                text: '当需要给予他人反馈时，您会：',
                multi: false,
                options: [
                    { id: 'q8a1', text: '直接指出问题，强调改进', score: 20 },
                    { id: 'q8a2', text: '先肯定优点，再提出建议', score: 40 },
                    { id: 'q8a3', text: '担心伤感情，尽量委婉', score: 30 },
                    { id: 'q8a4', text: '避免给予负面反馈', score: 10 }
                ]
            },
            {
                id: 'q9',
                text: '在电话或视频沟通中，您觉得自己：',
                multi: false,
                options: [
                    { id: 'q9a1', text: '沟通效果和面对面差不多', score: 30 },
                    { id: 'q9a2', text: '需要更努力表达才能达到效果', score: 20 },
                    { id: 'q9a3', text: '善于利用这种方式高效沟通', score: 40 },
                    { id: 'q9a4', text: '感到不适应，沟通有障碍', score: 10 }
                ]
            },
            {
                id: 'q10',
                text: '您认为良好的沟通最重要的是什么？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '清晰表达自己的想法', score: 30 },
                    { id: 'q10a2', text: '认真倾听对方的观点', score: 30 },
                    { id: 'q10a3', text: '建立相互理解和信任', score: 40 },
                    { id: 'q10a4', text: '避免冲突和分歧', score: 10 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '沟通表达基础阶段',
                description: '您的沟通表达能力处于基础阶段，在表达和倾听方面都有较大的提升空间。',
                suggestions: ['练习主动表达自己的想法', '学习倾听技巧', '观察他人的有效沟通方式']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '沟通表达发展阶段',
                description: '您具备基本的沟通表达能力，能够完成日常交流，但在复杂或正式场合仍需提升。',
                suggestions: ['学习组织和结构表达内容', '练习非语言沟通技巧', '尝试在不同场合锻炼沟通能力']
            },
            {
                minScore: 61,
                maxScore: 75,
                title: '沟通表达良好阶段',
                description: '您的沟通表达能力处于良好水平，能够有效传递信息，也能较好地理解他人。',
                suggestions: ['学习处理复杂沟通情境', '提升在压力下的表达能力', '进一步完善书面表达技巧']
            },
            {
                minScore: 76,
                maxScore: 90,
                title: '沟通表达优秀阶段',
                description: '您拥有优秀的沟通表达能力，能够在各种情境下进行有效沟通，善于建立良好的人际关系。',
                suggestions: ['培养跨文化沟通能力', '学习领导和谈判技巧', '分享您的沟通经验和方法']
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '沟通表达卓越阶段',
                description: '您是沟通表达的大师，能够清晰准确地传递信息，同时深刻理解他人，在各种复杂情境中都能游刃有余。',
                suggestions: ['帮助他人提高沟通能力', '探索更高级的沟通策略', '将沟通能力应用到更广泛的领域']
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