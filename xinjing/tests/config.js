// 心镜免费自测小站 - 测试分类配置

window.testsConfig = {
    categories: [
        {
            id: "intelligence",
            name: "智力测试",
            icon: "🧠",
            description: "专业智力测评,科学评估认知能力",
            tests: [
                {
                    id: "ruiwen",
                    title: "瑞文标准推理测验(SPM)",
                    description: "国际标准非文字智力测验,72题完整测试,无需语言和文化背景,测试观察推理能力",
                    questions: 72,
                    status: "active",
                    tags: ["国际标准", "免费"],
                    details: {
                        time: "30-45分钟",
                        difficulty: "中等",
                        ageRange: "16-65岁",
                        author: "J.C.Raven(1938)"
                    }
                },
                {
                    id: "mensa",
                    title: "门萨智商测试",
                    description: "门萨国际标准智商测试题,测试逻辑推理、空间想象、数字推理等能力",
                    questions: 40,
                    status: "planned",
                    tags: ["高智商", "挑战"],
                    details: {
                        time: "20-30分钟",
                        difficulty: "高难度",
                        ageRange: "18岁以上",
                        author: "Mensa International"
                    }
                },
                {
                    id: "wechsler",
                    title: "韦氏成人智力测验(WAIS)",
                    description: "临床心理学权威智力测验,评估言语理解、知觉推理、工作记忆、加工速度",
                    questions: 60,
                    status: "planned",
                    tags: ["权威", "临床"],
                    details: {
                        time: "60-90分钟",
                        difficulty: "专业级",
                        ageRange: "16-89岁",
                        author: "David Wechsler"
                    }
                },
                {
                    id: "cattell",
                    title: "卡特尔智力测验(CFIT)",
                    description: "区分流体智力与晶体智力,评估先天认知潜能与后天获得的知识技能",
                    questions: 50,
                    status: "planned",
                    tags: ["专业", "科学"],
                    details: {
                        time: "40-50分钟",
                        difficulty: "中等",
                        ageRange: "8岁以上",
                        author: "Raymond Cattell"
                    }
                },
                {
                    id: "stanford_binet",
                    title: "斯坦福-比奈智力测验",
                    description: "经典智力测验量表,评估认知能力的五个因素:流体推理、知识、定量推理等",
                    questions: 45,
                    status: "planned",
                    tags: ["经典", "历史"],
                    details: {
                        time: "45-60分钟",
                        difficulty: "中等",
                        ageRange: "2-85岁",
                        author: "Lewis Terman(1916)"
                    }
                },
                {
                    id: "numerical",
                    title: "数字推理测验",
                    description: "测试数字逻辑与数学推理能力,包括数列推理、数学运算、逻辑关系等",
                    questions: 30,
                    status: "planned",
                    tags: ["逻辑", "数学"],
                    details: {
                        time: "25-30分钟",
                        difficulty: "中等",
                        ageRange: "12岁以上",
                        author: "专业测试团队"
                    }
                },
                {
                    id: "logical",
                    title: "逻辑推理测验",
                    description: "抽象逻辑思维能力测评,测试归纳推理、演绎推理、类比推理能力",
                    questions: 25,
                    status: "planned",
                    tags: ["思维", "逻辑"],
                    details: {
                        time: "20-25分钟",
                        difficulty: "中高",
                        ageRange: "14岁以上",
                        author: "专业测试团队"
                    }
                },
                {
                    id: "spatial",
                    title: "空间智力测验",
                    description: "测试空间想象与图形推理能力,包括心理旋转、空间关系、图形折叠等",
                    questions: 30,
                    status: "planned",
                    tags: ["空间", "图形"],
                    details: {
                        time: "25-30分钟",
                        difficulty: "中等",
                        ageRange: "12岁以上",
                        author: "专业测试团队"
                    }
                }
            ]
        },
        {
            id: "career",
            name: "职业测试",
            icon: "💼",
            description: "职业性格与兴趣测评,助力职业规划",
            tests: [
                {
                    id: "mbti",
                    title: "MBTI职业性格测试",
                    description: "16型人格测试,了解你的性格类型",
                    questions: 93,
                    status: "planned",
                    tags: ["性格", "热门"]
                },
                {
                    id: "holland",
                    title: "霍兰德职业兴趣测试",
                    description: "六种职业兴趣类型测评",
                    questions: 60,
                    status: "planned",
                    tags: ["兴趣", "职业"]
                },
                {
                    id: "enneagram",
                    title: "九型人格测试",
                    description: "九种性格类型深度解析",
                    questions: 108,
                    status: "planned",
                    tags: ["性格", "深度"]
                },
                {
                    id: "disc",
                    title: "DISC性格测试",
                    description: "四种行为风格性格测评",
                    questions: 40,
                    status: "planned",
                    tags: ["行为", "管理"]
                },
                {
                    id: "values",
                    title: "职业价值观测试",
                    description: "了解你的职业价值取向",
                    questions: 36,
                    status: "planned",
                    tags: ["价值观", "规划"]
                },
                {
                    id: "stress_work",
                    title: "工作压力测试",
                    description: "评估你的工作压力水平",
                    questions: 25,
                    status: "planned",
                    tags: ["压力", "健康"]
                },
                {
                    id: "burnout",
                    title: "职业倦怠测试",
                    description: "检测职业倦怠程度",
                    questions: 22,
                    status: "planned",
                    tags: ["倦怠", "心理"]
                },
                {
                    id: "leadership",
                    title: "领导力测试",
                    description: "评估你的领导潜能与风格",
                    questions: 50,
                    status: "planned",
                    tags: ["领导", "管理"]
                }
            ]
        },
        {
            id: "psychology",
            name: "心理测试",
            icon: "❤️",
            description: "心理健康与情绪状态科学评估",
            tests: [
                {
                    id: "sds",
                    title: "抑郁自评量表(SDS)",
                    description: "专业抑郁症状自评量表",
                    questions: 20,
                    status: "planned",
                    tags: ["抑郁", "专业"]
                },
                {
                    id: "sas",
                    title: "焦虑自评量表(SAS)",
                    description: "焦虑症状自我测评",
                    questions: 20,
                    status: "planned",
                    tags: ["焦虑", "专业"]
                },
                {
                    id: "mental_health",
                    title: "心理健康综合测评",
                    description: "全面心理健康状态评估",
                    questions: 70,
                    status: "planned",
                    tags: ["综合", "全面"]
                },
                {
                    id: "emotion",
                    title: "情绪稳定性测试",
                    description: "评估情绪波动与稳定性",
                    questions: 30,
                    status: "planned",
                    tags: ["情绪", "稳定"]
                },
                {
                    id: "confidence",
                    title: "自信心测试",
                    description: "了解你的自信程度",
                    questions: 25,
                    status: "planned",
                    tags: ["自信", "自我"]
                },
                {
                    id: "stress_capacity",
                    title: "压力承受能力测试",
                    description: "评估心理抗压能力",
                    questions: 30,
                    status: "planned",
                    tags: ["压力", "承受"]
                },
                {
                    id: "interpersonal",
                    title: "人际关系测试",
                    description: "人际交往能力测评",
                    questions: 40,
                    status: "planned",
                    tags: ["人际", "社交"]
                },
                {
                    id: "self_esteem",
                    title: "自尊量表测试",
                    description: "自我价值感评估",
                    questions: 10,
                    status: "planned",
                    tags: ["自尊", "自我"]
                }
            ]
        },
        {
            id: "health",
            name: "健康测试",
            icon: "🏥",
            description: "身心健康状况与生活习惯评估",
            tests: [
                {
                    id: "sleep",
                    title: "睡眠质量测试",
                    description: "评估睡眠质量与睡眠问题",
                    questions: 19,
                    status: "planned",
                    tags: ["睡眠", "生活"]
                },
                {
                    id: "lifestyle",
                    title: "生活习惯测评",
                    description: "健康生活方式评估",
                    questions: 25,
                    status: "planned",
                    tags: ["生活", "习惯"]
                },
                {
                    id: "health_risk",
                    title: "健康风险评估",
                    description: "慢性病风险因素测评",
                    questions: 30,
                    status: "planned",
                    tags: ["风险", "预防"]
                },
                {
                    id: "fatigue",
                    title: "慢性疲劳测试",
                    description: "疲劳程度与成因分析",
                    questions: 14,
                    status: "planned",
                    tags: ["疲劳", "体力"]
                },
                {
                    id: "constitution",
                    title: "身体体质测试",
                    description: "体质类型与健康状况",
                    questions: 60,
                    status: "planned",
                    tags: ["体质", "中医"]
                },
                {
                    id: "diet",
                    title: "饮食健康测试",
                    description: "饮食习惯与健康评估",
                    questions: 20,
                    status: "planned",
                    tags: ["饮食", "营养"]
                },
                {
                    id: "exercise",
                    title: "运动习惯测试",
                    description: "运动频率与方式评估",
                    questions: 15,
                    status: "planned",
                    tags: ["运动", "健身"]
                },
                {
                    id: "health_awareness",
                    title: "健康意识测试",
                    description: "健康知识与意识水平",
                    questions: 30,
                    status: "planned",
                    tags: ["意识", "知识"]
                }
            ]
        }
    ],
    
    // 获取分类信息
    getCategory: function(categoryId) {
        return this.categories.find(cat => cat.id === categoryId);
    },
    
    // 获取测试信息
    getTest: function(categoryId, testId) {
        const category = this.getCategory(categoryId);
        if (category) {
            return category.tests.find(test => test.id === testId);
        }
        return null;
    },
    
    // 获取所有可用测试(status=active)
    getActiveTests: function(categoryId) {
        const category = this.getCategory(categoryId);
        if (category) {
            return category.tests.filter(test => test.status === "active");
        }
        return [];
    }
};