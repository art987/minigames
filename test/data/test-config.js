// 测试配置文件
// 本文件明确定义所有测试项目及其所属分类
// 作为静态网站，这种方式比自动扫描更可靠

window.TestConfig = {
    // 测试分类配置
    categories: {
        '心理测评类': {
            name: '心理测评类',
            icon: '🧠',
            description: '探索你的内心世界，发现隐藏的性格特质与心理优势，帮助你更了解自己'
        },
        '职业与学习类': {
            name: '职业与学习类',
            icon: '🎓',
            description: '测测你的职业潜力与学习方式，找到适合的发展方向和成长路径'
        },
        '爱情与人际关系类': {
            name: '爱情与人际关系类',
            icon: '💑',
            description: '揭开你的人际交往密码，了解恋爱观与沟通风格，发现真实的亲密关系需求'
        },
        '趣味娱乐类': {
            name: '趣味娱乐类',
            icon: '🎉',
            description: '轻松有趣的脑洞测试，带你玩转个性标签，解锁独一无二的趣味身份'
        },
        '健康与生活习惯类': {
            name: '健康与生活习惯类',
            icon: '🏃',
            description: '检视日常习惯与健康指数，帮你发现潜在问题，养成更科学的生活方式'
        },
        '智力与逻辑类': {
            name: '智力与逻辑类',
            icon: '🧩',
            description: '挑战思维与脑力极限，提升逻辑推理、专注力与创造力，让大脑持续活跃'
        }
    },
    
    // 测试项目配置 - 按分类组织
    testsByCategory: {
        '心理测评类': [
            
            {
                id: 'procrastination_level',
                title: '拖延症程度测验',
                description: '这个测试将帮助你了解自己的拖延习惯和程度，以便更好地管理时间和提高效率。请根据实际情况回答以下问题。',
                questionCount: 10,
                estimateMinutes: 3
            },
            {
                id: 'happiness_index',
                title: '幸福感指数测试',
                description: '这个测试将帮助你评估当前的幸福感水平，涵盖生活满意度、情绪状态、人际关系等多个维度。请根据实际感受诚实回答以下问题。',
                questionCount: 10,
                estimateMinutes: 3
            },
            {
                id: 'mbti_short',
                title: 'MBTI性格类型测试（简版）',
                description: '本测试基于MBTI人格理论，通过28道题目帮助你了解自己的性格偏好类型。',
                questionCount: 28,
                estimateMinutes: 5
            },
            {
                id: 'emotion_stability',
                title: '情绪稳定度测验',
                description: '本测试包含20道题目，全面评估您的情绪稳定性水平。',
                questionCount: 20,
                estimateMinutes: 5
            },
            {
                id: 'stress_tolerance',
                title: '压力承受能力测试',
                description: '评估您在面对压力时的应对能力和心理韧性',
                questionCount: 20,
                estimateMinutes: 5
            },
            {
                id: 'self_confidence',
                title: '自信心指数测试',
                description: '评估您的自信心水平，了解自己的自我认知和应对挑战的能力',
                questionCount: 20,
                estimateMinutes: 5
            },
            {
                id: 'introversion_extroversion',
                title: '内向外向测验',
                description: '评估您的性格倾向，帮助您了解自己是更偏向内向还是外向',
                questionCount: 20,
                estimateMinutes: 5
            }
        ],
        '智力与逻辑类': [
            {
                id: 'iq60',
                title: '60题标准智商测试',
                description: '通过60道标准化题目全面评估逻辑推理、数字计算、空间想象等多维度能力。',
                questionCount: 60,
                estimateMinutes: 10
            }
        ],
        '职业与学习类': [
            {
                id: 'leadership_index',
                title: '领导力指数测验',
                description: '本测验将评估您的领导力水平，涵盖团队管理、决策能力、沟通协调等多个维度。',
                questionCount: 10,
                estimateMinutes: 3
            },
            {
                id: 'creative_thinking',
                title: '创新思维能力测试',
                description: '本测验将评估您的创新思维能力，涵盖问题解决、思维灵活性、发散思维和创造性表达等多个维度。',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'time_management',
                title: '时间管理能力测试',
                description: '本测验将评估您的时间管理能力，涵盖日常计划、优先级设置、工作效率和压力管理等多个方面。',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'focus_attention',
                title: '专注力指数评估',
                description: '评估您的专注力水平，涵盖注意力持久性、抗干扰能力等维度',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'career_stress_resilience',
                title: '职业抗压指数测试',
                description: '评估您的职业抗压能力，涵盖压力感知、应对策略、情绪调节等方面',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'communication_skills',
                title: '沟通表达能力分析',
                description: '本测验将评估您的沟通表达能力，涵盖口头表达、书面表达、倾听技巧和非语言沟通等多个维度。',
                questionCount: 10,
                estimateMinutes: 4
            }
        ],
        '爱情与人际关系类': [
            {
                id: 'love_philosophy',
                title: '爱情观测试',
                description: '本测试将评估您的爱情价值观、态度和行为倾向，帮助您了解自己在爱情中的偏好。',
                questionCount: 20,
                estimateMinutes: 5
            },
            {
                id: 'attachment_style',
                title: '依恋类型测验',
                description: '本测验基于依恋理论，通过评估您在亲密关系中的安全感、信任感和依赖模式，帮助您了解自己的依恋类型。',
                questionCount: 10,
                estimateMinutes: 3
            },
            {
                id: 'ideal_partner',
                title: '理想伴侣画像测试',
                description: '探索你在伴侣身上最看重的特质和核心需求',
                questionCount: 15,
                estimateMinutes: 5
            },
            {
                id: 'intimacy_satisfaction',
                title: '亲密关系满意度自测',
                description: '帮助你了解自己在亲密关系中的感受和满意程度，涵盖沟通、情感支持、信任等多个维度。',
                questionCount: 10,
                estimateMinutes: 3
            },
            {
                id: 'love_communication_style',
                title: '恋爱沟通方式测试',
                description: '通过这个测试，了解你在恋爱关系中的沟通风格，帮助你更好地理解自己和伴侣的交流方式。',
                questionCount: 10,
                estimateMinutes: 5
            },
            {
                id: 'friendship_stability',
                title: '友情稳定度测试',
                description: '帮助您评估与朋友之间的关系稳定性，从沟通频率、信任程度、支持与陪伴等方面进行分析。',
                questionCount: 10,
                estimateMinutes: 3
            },
            {
                id: 'social_anxiety_index',
                title: '社交恐惧指数测验',
                description: '评估您在社交场合中感到紧张、不安、害怕被评价的程度，以及这些情况对日常生活的影响。',
                questionCount: 10,
                estimateMinutes: 3
            },
            {
                id: 'attraction_index',
                title: '吸引力指数测试',
                description: '这个测试将帮助你了解自己在人际交往中的吸引力水平，测试包含10个问题，每个问题有4个选项，总分为100分。',
                questionCount: 10,
                estimateMinutes: 3
            }
        ],
        '趣味娱乐类': [],
        '健康与生活习惯类': [
            {
                id: 'sleep_quality',
                title: '睡眠质量测试',
                description: '本测验将评估您的睡眠质量，涵盖入睡时间、睡眠深度、睡眠时长和睡眠满意度等多个维度。',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'diet_health',
                title: '饮食习惯健康度测验',
                description: '本测验将评估您的饮食习惯健康程度，涵盖饮食结构、进食频率、食物选择和营养均衡等多个维度。',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'schedule_regularity',
                title: '作息规律性测试',
                description: '本测验将评估您的作息规律程度，涵盖起床时间、睡眠时间、用餐时间和日常活动安排等多个维度。',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'mental_subhealth_index',
                title: '心理亚健康指数测试',
                description: '本测验将评估您的心理亚健康程度，涵盖情绪状态、压力水平、睡眠质量和社会功能等多个维度。',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'exercise_habit_self_assessment',
                title: '运动习惯自评',
                description: '通过本测试，您可以了解自己的运动习惯是否健康合理，是否需要调整运动量和运动方式。',
                questionCount: 10,
                estimateMinutes: 4
            },
            {
                id: 'mobile_phone_dependency',
                title: '手机依赖程度测试',
                description: '通过这个测试评估您对手机的依赖程度以及它对日常生活的影响。',
                questionCount: 10,
                estimateMinutes: 5
            },
            {
                id: 'stay_up_late_index',
                title: '熬夜指数测验',
                description: '通过这个测试评估您的熬夜习惯和睡眠健康状况。',
                questionCount: 10,
                estimateMinutes: 5
            },
            {
                id: 'sitting_risk_assessment',
                title: '久坐风险评估',
                description: '通过这个测试评估您的久坐习惯对健康可能带来的风险。',
                questionCount: 10,
                estimateMinutes: 5
            }
        ]
    },
    
    // 获取所有测试项目
    getAllTests: function() {
        let allTests = [];
        Object.keys(this.testsByCategory).forEach(category => {
            this.testsByCategory[category].forEach(test => {
                allTests.push({...test, category});
            });
        });
        return allTests;
    },
    
    // 获取指定分类的测试项目
    getTestsByCategory: function(categoryKey) {
        return this.testsByCategory[categoryKey] || [];
    },
    
    // 获取指定测试的信息
    getTestById: function(testId) {
        for (let category in this.testsByCategory) {
            const test = this.testsByCategory[category].find(t => t.id === testId);
            if (test) {
                return {...test, category};
            }
        }
        return null;
    },
    
    // 获取所有分类
    getAllCategories: function() {
        return this.categories;
    },
    
    // 获取分类下的测试数量（仅统计有有效数据集的测试）
    getTestCountByCategory: function(categoryKey) {
        const tests = this.testsByCategory[categoryKey] || [];
        
        // 检查是否有hasValidDataset函数可用
        if (typeof window.hasValidDataset === 'function') {
            // 过滤出有有效数据集的测试
            return tests.filter(test => window.hasValidDataset(test.id)).length;
        }
        
        // 如果没有hasValidDataset函数，回退到原始逻辑
        return tests.length;
    }
};