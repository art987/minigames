(function() {
    // 从文件名获取测试ID（自动提取，无需手动修改）
    const getTestIdFromFilename = function() {
        // 获取当前脚本文件名
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];
        const scriptSrc = currentScript.src;
        const fileName = scriptSrc.split('/').pop();
        const testId = fileName.replace('.js', '');
        return testId;
    };
    
    // 提取测试ID
    const testId = getTestIdFromFilename();
    
    // 注册测试元数据
    window.TestRegistry && window.TestRegistry.register({
        id: testId,  // 自动从文件名获取，无需修改
        title: 'MBTI性格类型测试（简版）',  // 测试标题
        description: '本测试基于MBTI人格理论，通过28道题目帮助你了解自己的性格偏好类型。',  // 测试描述
        estimateMinutes: 5,  // 估计完成时间（分钟）
    });

    // 定义测试数据集
    var dataset = {
        id: testId,  // 自动从文件名获取，无需修改
        title: 'MBTI性格类型测试（简版）',
        description: '本测试基于MBTI人格理论，通过28道题目帮助你了解自己的性格偏好类型。',
        questions: [
            // E/I (外向/内向) 维度
            {
                text: '在社交场合中，你更倾向于：',
                multi: false,
                options: [
                    { label: '喜欢成为焦点，与很多人交流', score: 0 },  // E
                    { label: '享受安静观察，与少数人深入交流', score: 1 },  // I
                    { label: '视情况而定，两种都能适应', score: 2 },  // 中性
                    { label: '不喜欢过多社交，更愿独处', score: 3 }   // I
                ]
            },
            {
                text: '当你需要恢复精力时，你通常会：',
                multi: false,
                options: [
                    { label: '与朋友聚会或参加活动', score: 0 },  // E
                    { label: '做一些自己喜欢的事情，但也不排斥社交', score: 1 },  // 中性
                    { label: '读书、听音乐或进行其他独处活动', score: 2 },  // I
                    { label: '完全独处，避免外界干扰', score: 3 }   // I
                ]
            },
            {
                text: '在团队合作中，你更倾向于：',
                multi: false,
                options: [
                    { label: '积极参与讨论，表达自己的想法', score: 0 },  // E
                    { label: '先倾听他人，再适时表达自己的观点', score: 1 },  // 中性
                    { label: '更多地倾听和思考，较少主动发言', score: 2 },  // I
                    { label: '更愿意独立工作，避免太多讨论', score: 3 }   // I
                ]
            },
            {
                text: '你对新认识的人通常：',
                multi: false,
                options: [
                    { label: '很快就能熟络起来，分享个人信息', score: 0 },  // E
                    { label: '需要一点时间，但能逐渐打开心扉', score: 1 },  // 中性
                    { label: '比较谨慎，需要长时间才能建立信任', score: 2 },  // I
                    { label: '很少主动与人深交，保持一定距离', score: 3 }   // I
                ]
            },
            {
                text: '在工作环境中，你更喜欢：',
                multi: false,
                options: [
                    { label: '开放的办公空间，可以随时与同事交流', score: 0 },  // E
                    { label: '半开放的环境，既有交流又有一定隐私', score: 1 },  // 中性
                    { label: '独立的工作空间，减少外界干扰', score: 2 },  // I
                    { label: '远程工作，完全独立的环境', score: 3 }   // I
                ]
            },
            
            // S/N (感觉/直觉) 维度
            {
                text: '当你处理信息时，你更关注：',
                multi: false,
                options: [
                    { label: '具体的事实和细节', score: 0 },  // S
                    { label: '事实和可能性都考虑，但更注重事实', score: 1 },  // 中性
                    { label: '可能性和潜在含义', score: 2 },  // N
                    { label: '抽象概念和未来趋势', score: 3 }   // N
                ]
            },
            {
                text: '在做决策时，你更倾向于：',
                multi: false,
                options: [
                    { label: '基于已有的经验和实际情况', score: 0 },  // S
                    { label: '平衡实际情况和未来可能性', score: 1 },  // 中性
                    { label: '考虑可能性和创新方案', score: 2 },  // N
                    { label: '关注长远影响和潜在机会', score: 3 }   // N
                ]
            },
            {
                text: '你更擅长记住：',
                multi: false,
                options: [
                    { label: '具体的事实和细节', score: 0 },  // S
                    { label: '重要的事实和总体情况', score: 1 },  // 中性
                    { label: '大致情况和关键概念', score: 2 },  // N
                    { label: '抽象的概念和想法', score: 3 }   // N
                ]
            },
            {
                text: '在学习新技能时，你更喜欢：',
                multi: false,
                options: [
                    { label: '按照步骤一步步学习，注重实际操作', score: 0 },  // S
                    { label: '先了解基础，再尝试创新应用', score: 1 },  // 中性
                    { label: '先理解整体概念，再关注细节', score: 2 },  // N
                    { label: '探索各种可能性，不拘泥于常规方法', score: 3 }   // N
                ]
            },
            {
                text: '当你阅读时，你更关注：',
                multi: false,
                options: [
                    { label: '字面意思和具体内容', score: 0 },  // S
                    { label: '内容和隐含意义兼顾', score: 1 },  // 中性
                    { label: '隐含意义和深层含义', score: 2 },  // N
                    { label: '抽象概念和哲学思考', score: 3 }   // N
                ]
            },
            
            // T/F (思维/情感) 维度
            {
                text: '在做决策时，你更看重：',
                multi: false,
                options: [
                    { label: '客观逻辑和公平性', score: 0 },  // T
                    { label: '逻辑和情感兼顾，但更倾向逻辑', score: 1 },  // 中性
                    { label: '人情世故和和谐关系', score: 2 },  // F
                    { label: '个人价值观和他人感受', score: 3 }   // F
                ]
            },
            {
                text: '当有人向你求助时，你通常会：',
                multi: false,
                options: [
                    { label: '先分析问题，给出客观建议', score: 0 },  // T
                    { label: '先共情，再提供实际帮助', score: 1 },  // 中性
                    { label: '先表达理解和支持，再帮助解决问题', score: 2 },  // F
                    { label: '优先关注对方情绪，提供情感支持', score: 3 }   // F
                ]
            },
            {
                text: '在评价他人时，你更注重：',
                multi: false,
                options: [
                    { label: '能力和成就', score: 0 },  // T
                    { label: '能力和品格兼顾', score: 1 },  // 中性
                    { label: '品格和人际关系', score: 2 },  // F
                    { label: '善良和同理心', score: 3 }   // F
                ]
            },
            {
                text: '当你与他人发生分歧时，你更倾向于：',
                multi: false,
                options: [
                    { label: '就事论事，坚持客观分析', score: 0 },  // T
                    { label: '既坚持原则，又考虑对方感受', score: 1 },  // 中性
                    { label: '寻求双方都能接受的解决方案', score: 2 },  // F
                    { label: '优先维护关系和谐，适当妥协', score: 3 }   // F
                ]
            },
            {
                text: '在工作中，你更看重：',
                multi: false,
                options: [
                    { label: '效率和成果', score: 0 },  // T
                    { label: '效率和团队氛围兼顾', score: 1 },  // 中性
                    { label: '合作和团队和谐', score: 2 },  // F
                    { label: '个人成长和人际关系', score: 3 }   // F
                ]
            },
            
            // J/P (判断/感知) 维度
            {
                text: '你更喜欢：',
                multi: false,
                options: [
                    { label: '有计划、有条理的生活', score: 0 },  // J
                    { label: '有基本计划，但保持一定灵活性', score: 1 },  // 中性
                    { label: '灵活自在的生活方式', score: 2 },  // P
                    { label: '完全自由，不受计划约束', score: 3 }   // P
                ]
            },
            {
                text: '当面对截止日期时，你通常会：',
                multi: false,
                options: [
                    { label: '提前完成任务，避免最后一刻的压力', score: 0 },  // J
                    { label: '提前开始，但可能在最后阶段加速', score: 1 },  // 中性
                    { label: '在截止日期前完成，但可能需要赶工', score: 2 },  // P
                    { label: '往往在最后一刻才能高效完成', score: 3 }   // P
                ]
            },
            {
                text: '在组织活动时，你更倾向于：',
                multi: false,
                options: [
                    { label: '详细规划每一个步骤', score: 0 },  // J
                    { label: '制定大致计划，留有余地', score: 1 },  // 中性
                    { label: '有基本框架，根据情况灵活调整', score: 2 },  // P
                    { label: '随性而为，不做太多规划', score: 3 }   // P
                ]
            },
            {
                text: '对于未完成的任务，你通常会：',
                multi: false,
                options: [
                    { label: '尽快完成，不喜欢拖延', score: 0 },  // J
                    { label: '按优先级逐步完成', score: 1 },  // 中性
                    { label: '根据兴趣和状态安排完成时间', score: 2 },  // P
                    { label: '倾向于在压力下完成，享受紧迫感', score: 3 }   // P
                ]
            },
            {
                text: '在日常生活中，你更注重：',
                multi: false,
                options: [
                    { label: '秩序和整洁', score: 0 },  // J
                    { label: '整洁但不过分拘泥形式', score: 1 },  // 中性
                    { label: '舒适和实用，不太在意形式', score: 2 },  // P
                    { label: '自由和随意，认为秩序会限制创造力', score: 3 }   // P
                ]
            },
            
            // 补充题目，增强测试准确性
            {
                text: '你更享受：',
                multi: false,
                options: [
                    { label: '完成任务的满足感', score: 0 },  // J
                    { label: '过程中的体验和探索', score: 1 },  // P
                    { label: '既有明确目标，又能享受过程', score: 2 },  // 中性
                    { label: '不受限制地探索各种可能性', score: 3 }   // P
                ]
            },
            {
                text: '在解决问题时，你更倾向于：',
                multi: false,
                options: [
                    { label: '寻找最有效的解决方案', score: 0 },  // T
                    { label: '考虑各种可能性，再做决定', score: 1 },  // N
                    { label: '平衡逻辑和情感因素', score: 2 },  // 中性
                    { label: '优先考虑对他人的影响', score: 3 }   // F
                ]
            },
            {
                text: '你通常如何度过空闲时间？',
                multi: false,
                options: [
                    { label: '参加社交活动或户外活动', score: 0 },  // E
                    { label: '既有社交也有独处时间', score: 1 },  // 中性
                    { label: '读书、看电影或其他室内活动', score: 2 },  // I
                    { label: '思考、创作或深度放松', score: 3 }   // I
                ]
            },
            {
                text: '当你需要做决定时，你更依赖：',
                multi: false,
                options: [
                    { label: '数据分析和客观事实', score: 0 },  // S/T
                    { label: '事实和直觉并重', score: 1 },  // 中性
                    { label: '直觉和灵感', score: 2 },  // N/F
                    { label: '内心感受和价值观', score: 3 }   // F
                ]
            },
            {
                text: '你对规则和制度的看法是：',
                multi: false,
                options: [
                    { label: '规则很重要，应该严格遵守', score: 0 },  // J
                    { label: '规则有必要，但应灵活应用', score: 1 },  // 中性
                    { label: '规则是参考，可以根据情况调整', score: 2 },  // P
                    { label: '过多规则会限制自由和创造力', score: 3 }   // P
                ]
            },
            {
                text: '在团队中，你更倾向于扮演：',
                multi: false,
                options: [
                    { label: '组织者或领导者角色', score: 0 },  // E/J
                    { label: '既参与决策也执行任务', score: 1 },  // 中性
                    { label: '贡献专业意见的角色', score: 2 },  // I/T
                    { label: '支持和协调团队的角色', score: 3 }   // F/P
                ]
            },
            {
                text: '你更看重自己哪方面的品质？',
                multi: false,
                options: [
                    { label: '理性和客观', score: 0 },  // T
                    { label: '智慧和洞察力', score: 1 },  // N
                    { label: '善良和同理心', score: 2 },  // F
                    { label: '务实和可靠', score: 3 }   // S
                ]
            }
        ],
        resultRanges: [
            // 定义测试结果范围
            {
                label: 'ISTJ - 物流师型人格',
                min: 0,
                max: 12,
                text: '你是一个务实、有条理的人，注重事实和细节，善于组织和管理。你是可靠的执行者，重视传统和秩序，通常会按照计划完成任务。',
                advice: '建议：适当培养灵活性和开放性，尝试从不同角度看待问题，这会帮助你在面对变化时更加从容。'
            },
            {
                label: 'ISFJ - 守卫者型人格',
                min: 13,
                max: 24,
                text: '你是一个温暖、有同情心的人，注重和谐与稳定，善于关心和照顾他人。你是忠实的朋友和家人，总是愿意为他人付出。',
                advice: '建议：学会平衡照顾他人和照顾自己的需求，不要过度牺牲自己，也要学会表达自己的想法和感受。'
            },
            {
                label: 'INFJ - 提倡者型人格',
                min: 25,
                max: 36,
                text: '你是一个富有洞察力和理想主义的人，善于理解他人的情感和动机。你有强烈的价值观和使命感，希望能为世界带来积极的改变。',
                advice: '建议：学会将你的理想与现实结合，制定可行的计划来实现你的目标，同时也要注意照顾自己的情绪健康。'
            },
            {
                label: 'INTJ - 建筑师型人格',
                min: 37,
                max: 48,
                text: '你是一个理性、有远见的人，善于分析和规划。你有强烈的逻辑思维和解决问题的能力，总是在寻找提高效率和改善系统的方法。',
                advice: '建议：学会欣赏他人的情感需求和不同的观点，这会帮助你在团队合作中更加成功，也能让你的想法更容易被接受。'
            },
            {
                label: 'ISTP - 鉴赏家型人格',
                min: 49,
                max: 60,
                text: '你是一个冷静、务实的人，善于分析和解决实际问题。你喜欢探索和理解事物的运作方式，通常是一个优秀的手工创作者或技术专家。',
                advice: '建议：尝试培养长期规划的能力，学会在完成即时任务的同时，也关注长期目标，这会帮助你在职业发展中更上一层楼。'
            },
            {
                label: 'ISFP - 探险家型人格',
                min: 61,
                max: 72,
                text: '你是一个敏感、灵活的人，注重个人体验和内心感受。你热爱艺术和自然，善于发现生活中的美好，通常是一个富有创造力的人。',
                advice: '建议：学会设定界限和优先级，不要让外界的期望过多影响你的选择，勇敢地追求自己真正热爱的事物。'
            },
            {
                label: 'INFP - 调停者型人格',
                min: 73,
                max: 84,
                text: '你是一个理想主义、富有同情心的人，注重个人价值观和内在和谐。你善于理解他人的情感，通常是一个优秀的倾听者和顾问。',
                advice: '建议：学会将你的理想转化为具体的行动计划，不要让完美主义阻碍你前进，勇敢地表达自己的想法和需求。'
            },
            {
                label: 'INTP - 逻辑学家型人格',
                min: 85,
                max: 96,
                text: '你是一个好奇、理性的人，善于思考和分析复杂的问题。你喜欢探索抽象概念和理论，通常是一个优秀的科学家或思想家。',
                advice: '建议：学会在思考和行动之间找到平衡，将你的理论知识应用到实际问题中，同时也要注意培养社交技能和情感表达能力。'
            },
            {
                label: 'ESTP - 企业家型人格',
                min: 97,
                max: 108,
                text: '你是一个充满活力、善于行动的人，喜欢新的体验和挑战。你是优秀的问题解决者和谈判者，通常能在压力下保持冷静和高效。',
                advice: '建议：学会在行动前考虑长期后果，培养耐心和专注度，这会帮助你在追求目标的过程中更加持久和成功。'
            },
            {
                label: 'ESFP - 表演者型人格',
                min: 109,
                max: 120,
                text: '你是一个热情、友好的人，喜欢与人互动和分享快乐。你善于在社交场合中活跃气氛，通常是一个充满魅力和感染力的人。',
                advice: '建议：尝试培养深度思考和长期规划的能力，学会在享受当下的同时，也为未来做好准备。'
            },
            {
                label: 'ENFP - 竞选者型人格',
                min: 121,
                max: 132,
                text: '你是一个充满活力、富有创意的人，善于发现可能性和激励他人。你有强烈的好奇心和乐观精神，通常是一个优秀的团队建设者和创新者。',
                advice: '建议：学会在众多可能性中做出选择，培养专注力和执行力，这会帮助你将你的创意转化为实际成果。'
            },
            {
                label: 'ENTP - 辩论家型人格',
                min: 133,
                max: 144,
                text: '你是一个机智、好奇的人，善于分析和辩论。你喜欢挑战传统观念和解决复杂问题，通常是一个优秀的战略家和创新者。',
                advice: '建议：学会倾听和尊重他人的观点，不要为了辩论而辩论，而是要寻求真正的理解和有效的解决方案。'
            },
            {
                label: 'ESTJ - 总经理型人格',
                min: 145,
                max: 156,
                text: '你是一个务实、高效的人，善于组织和管理。你重视传统和秩序，通常是一个优秀的领导者和决策者，能够带领团队实现目标。',
                advice: '建议：学会欣赏不同的工作方式和观点，培养灵活性和同理心，这会帮助你在团队管理中更加成功。'
            },
            {
                label: 'ESFJ - 执政官型人格',
                min: 157,
                max: 168,
                text: '你是一个热情、负责任的人，善于关心和照顾他人。你重视和谐与合作，通常是一个优秀的团队合作者和社区建设者。',
                advice: '建议：学会设定健康的界限，不要过度牺牲自己的需求来满足他人，同时也要学会接受他人的帮助和支持。'
            },
            {
                label: 'ENFJ - 主人公型人格',
                min: 169,
                max: 180,
                text: '你是一个富有魅力、有领导力的人，善于理解和激励他人。你有强烈的社会责任感和理想主义，通常是一个优秀的教练和倡导者。',
                advice: '建议：学会平衡关注他人和关注自己的需求，不要让他人的期望过多影响你的决策，同时也要培养自我关怀的能力。'
            },
            {
                label: 'ENTJ - 指挥官型人格',
                min: 181,
                max: 192,
                text: '你是一个自信、有远见的人，善于规划和执行。你有强烈的领导能力和决策能力，通常是一个优秀的战略家和组织者，能够带领团队实现宏大的目标。',
                advice: '建议：学会倾听和尊重团队成员的意见，培养耐心和同理心，这会帮助你在领导团队时更加有效和受欢迎。'
            }
        ]
    };

    // 注册测试数据集
    window.TestDatasets = window.TestDatasets || {};
    window.TestDatasets[dataset.id] = dataset;
    
    // 兼容性支持：将数据集也注册到常用变量名
    window.testDataset = window.testDataset || dataset;
    window.dataset = window.dataset || dataset;
})();