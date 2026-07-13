(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'folklore50';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '中国民俗文化测验',
        description: '本测验包含50道关于中国民俗文化的题目，涵盖传统节日、民间习俗、传统艺术、饮食文化等方面的知识，帮助您了解和传承中华民族的优秀传统文化。',
        category: '闯关学习类',
        questionCount: 50,
        totalScore: 100,
        estimateMinutes: 15,
        cover: testId + '.jpg',
        enableRealTimeScoring: true,
        
        // 3. 题目数组
        questions: [
            { id: 'q1', text: '春节是中国最重要的传统节日，它通常在农历的哪个月份？', multi: false, options: [{ id: 'q1a1', text: '正月', score: 2 }, { id: 'q1a2', text: '腊月', score: 0 }, { id: 'q1a3', text: '二月', score: 0 }, { id: 'q1a4', text: '十月', score: 0 }] },
            { id: 'q2', text: '下列哪个节日是为了纪念爱国诗人屈原？', multi: false, options: [{ id: 'q2a1', text: '元宵节', score: 0 }, { id: 'q2a2', text: '清明节', score: 0 }, { id: 'q2a3', text: '端午节', score: 2 }, { id: 'q2a4', text: '中秋节', score: 0 }] },
            { id: 'q3', text: '中国传统婚礼中，新人通常会喝什么酒来象征百年好合？', multi: false, options: [{ id: 'q3a1', text: '交杯酒', score: 2 }, { id: 'q3a2', text: '葡萄酒', score: 0 }, { id: 'q3a3', text: '白酒', score: 0 }, { id: 'q3a4', text: '黄酒', score: 0 }] },
            { id: 'q4', text: '京剧是中国的国粹，下列哪个角色属于京剧的四大行当之首？', multi: false, options: [{ id: 'q4a1', text: '生', score: 2 }, { id: 'q4a2', text: '旦', score: 0 }, { id: 'q4a3', text: '净', score: 0 }, { id: 'q4a4', text: '丑', score: 0 }] },
            { id: 'q5', text: '中国传统建筑中，红色代表什么？', multi: false, options: [{ id: 'q5a1', text: '喜庆、吉祥', score: 2 }, { id: 'q5a2', text: '悲伤、哀悼', score: 0 }, { id: 'q5a3', text: '高贵、典雅', score: 0 }, { id: 'q5a4', text: '神秘、神圣', score: 0 }] },
            { id: 'q6', text: '下列哪个节气标志着春天的开始？', multi: false, options: [{ id: 'q6a1', text: '立春', score: 2 }, { id: 'q6a2', text: '雨水', score: 0 }, { id: 'q6a3', text: '惊蛰', score: 0 }, { id: 'q6a4', text: '春分', score: 0 }] },
            { id: 'q7', text: '中国传统绘画中，"梅兰竹菊"被称为？', multi: false, options: [{ id: 'q7a1', text: '四君子', score: 2 }, { id: 'q7a2', text: '四美人', score: 0 }, { id: 'q7a3', text: '四神兽', score: 0 }, { id: 'q7a4', text: '四象', score: 0 }] },
            { id: 'q8', text: '中国传统服饰中，旗袍起源于哪个民族？', multi: false, options: [{ id: 'q8a1', text: '满族', score: 2 }, { id: 'q8a2', text: '汉族', score: 0 }, { id: 'q8a3', text: '蒙古族', score: 0 }, { id: 'q8a4', text: '藏族', score: 0 }] },
            { id: 'q9', text: '中秋节的传统习俗不包括以下哪一项？', multi: false, options: [{ id: 'q9a1', text: '吃月饼', score: 0 }, { id: 'q9a2', text: '赏月', score: 0 }, { id: 'q9a3', text: '赛龙舟', score: 2 }, { id: 'q9a4', text: '燃灯', score: 0 }] },
            { id: 'q10', text: '中国传统医学中的"四诊法"不包括以下哪一项？', multi: false, options: [{ id: 'q10a1', text: '望', score: 0 }, { id: 'q10a2', text: '闻', score: 0 }, { id: 'q10a3', text: '问', score: 0 }, { id: 'q10a4', text: '摸', score: 2 }] },
            { id: 'q11', text: '下列哪个是中国传统的民间艺术形式？', multi: false, options: [{ id: 'q11a1', text: '皮影戏', score: 2 }, { id: 'q11a2', text: '芭蕾舞', score: 0 }, { id: 'q11a3', text: '歌剧', score: 0 }, { id: 'q11a4', text: '电影', score: 0 }] },
            { id: 'q12', text: '中国传统婚礼中，新娘通常会佩戴什么来辟邪？', multi: false, options: [{ id: 'q12a1', text: '红盖头', score: 2 }, { id: 'q12a2', text: '金项链', score: 0 }, { id: 'q12a3', text: '银手镯', score: 0 }, { id: 'q12a4', text: '珍珠耳环', score: 0 }] },
            { id: 'q13', text: '下列哪个节气有"吃饺子"的习俗？', multi: false, options: [{ id: 'q13a1', text: '冬至', score: 2 }, { id: 'q13a2', text: '立冬', score: 0 }, { id: 'q13a3', text: '小雪', score: 0 }, { id: 'q13a4', text: '大雪', score: 0 }] },
            { id: 'q14', text: '中国传统建筑中，"四合院"主要分布在哪个地区？', multi: false, options: [{ id: 'q14a1', text: '北京', score: 2 }, { id: 'q14a2', text: '上海', score: 0 }, { id: 'q14a3', text: '广州', score: 0 }, { id: 'q14a4', text: '成都', score: 0 }] },
            { id: 'q15', text: '下列哪个是中国传统的手工艺品？', multi: false, options: [{ id: 'q15a1', text: '剪纸', score: 2 }, { id: 'q15a2', text: '油画', score: 0 }, { id: 'q15a3', text: '雕塑', score: 0 }, { id: 'q15a4', text: '摄影', score: 0 }] },
            { id: 'q16', text: '中国传统节日中，元宵节又被称为什么？', multi: false, options: [{ id: 'q16a1', text: '上元节', score: 2 }, { id: 'q16a2', text: '中元节', score: 0 }, { id: 'q16a3', text: '下元节', score: 0 }, { id: 'q16a4', text: '寒食节', score: 0 }] },
            { id: 'q17', text: '下列哪个是中国传统的调味品？', multi: false, options: [{ id: 'q17a1', text: '酱油', score: 2 }, { id: 'q17a2', text: '番茄酱', score: 0 }, { id: 'q17a3', text: '沙拉酱', score: 0 }, { id: 'q17a4', text: '芥末酱', score: 0 }] },
            { id: 'q18', text: '中国传统音乐中，"宫商角徵羽"指的是什么？', multi: false, options: [{ id: 'q18a1', text: '五声音阶', score: 2 }, { id: 'q18a2', text: '五种乐器', score: 0 }, { id: 'q18a3', text: '五种节奏', score: 0 }, { id: 'q18a4', text: '五种调式', score: 0 }] },
            { id: 'q19', text: '下列哪个是中国传统的吉祥图案？', multi: false, options: [{ id: 'q19a1', text: '龙凤呈祥', score: 2 }, { id: 'q19a2', text: '狮子滚绣球', score: 0 }, { id: 'q19a3', text: '孔雀开屏', score: 0 }, { id: 'q19a4', text: '蝴蝶飞舞', score: 0 }] },
            { id: 'q20', text: '中国传统丧葬习俗中，通常会烧什么来寄托哀思？', multi: false, options: [{ id: 'q20a1', text: '纸钱', score: 2 }, { id: 'q20a2', text: '鲜花', score: 0 }, { id: 'q20a3', text: '蜡烛', score: 0 }, { id: 'q20a4', text: '香火', score: 0 }] },
            { id: 'q21', text: '下列哪个节日有"插茱萸"的习俗？', multi: false, options: [{ id: 'q21a1', text: '重阳节', score: 2 }, { id: 'q21a2', text: '清明节', score: 0 }, { id: 'q21a3', text: '端午节', score: 0 }, { id: 'q21a4', text: '中秋节', score: 0 }] },
            { id: 'q22', text: '中国传统服饰中，"汉服"是哪个民族的传统服装？', multi: false, options: [{ id: 'q22a1', text: '汉族', score: 2 }, { id: 'q22a2', text: '满族', score: 0 }, { id: 'q22a3', text: '蒙古族', score: 0 }, { id: 'q22a4', text: '朝鲜族', score: 0 }] },
            { id: 'q23', text: '下列哪个是中国传统的陶瓷工艺？', multi: false, options: [{ id: 'q23a1', text: '青花瓷', score: 2 }, { id: 'q23a2', text: '玻璃制品', score: 0 }, { id: 'q23a3', text: '塑料制品', score: 0 }, { id: 'q23a4', text: '金属制品', score: 0 }] },
            { id: 'q24', text: '中国传统饮食文化中，"五谷"不包括以下哪一项？', multi: false, options: [{ id: 'q24a1', text: '稻', score: 0 }, { id: 'q24a2', text: '麦', score: 0 }, { id: 'q24a3', text: '玉米', score: 2 }, { id: 'q24a4', text: '黍', score: 0 }] },
            { id: 'q25', text: '下列哪个是中国传统的民间舞蹈？', multi: false, options: [{ id: 'q25a1', text: '扭秧歌', score: 2 }, { id: 'q25a2', text: '芭蕾舞', score: 0 }, { id: 'q25a3', text: '现代舞', score: 0 }, { id: 'q25a4', text: '街舞', score: 0 }] },
            { id: 'q26', text: '中国传统婚礼中，新人通常会在哪个时间段举行婚礼？', multi: false, options: [{ id: 'q26a1', text: '中午', score: 2 }, { id: 'q26a2', text: '晚上', score: 0 }, { id: 'q26a3', text: '早晨', score: 0 }, { id: 'q26a4', text: '下午', score: 0 }] },
            { id: 'q27', text: '下列哪个节气有"扫墓"的习俗？', multi: false, options: [{ id: 'q27a1', text: '清明节', score: 2 }, { id: 'q27a2', text: '端午节', score: 0 }, { id: 'q27a3', text: '中秋节', score: 0 }, { id: 'q27a4', text: '春节', score: 0 }] },
            { id: 'q28', text: '中国传统建筑中，"飞檐"的主要作用是什么？', multi: false, options: [{ id: 'q28a1', text: '排水和装饰', score: 2 }, { id: 'q28a2', text: '承重', score: 0 }, { id: 'q28a3', text: '保温', score: 0 }, { id: 'q28a4', text: '防风', score: 0 }] },
            { id: 'q29', text: '下列哪个是中国传统的乐器？', multi: false, options: [{ id: 'q29a1', text: '古筝', score: 2 }, { id: 'q29a2', text: '钢琴', score: 0 }, { id: 'q29a3', text: '小提琴', score: 0 }, { id: 'q29a4', text: '吉他', score: 0 }] },
            { id: 'q30', text: '中国传统节日中，腊八节有什么传统习俗？', multi: false, options: [{ id: 'q30a1', text: '喝腊八粥', score: 2 }, { id: 'q30a2', text: '吃饺子', score: 0 }, { id: 'q30a3', text: '吃月饼', score: 0 }, { id: 'q30a4', text: '赛龙舟', score: 0 }] },
            { id: 'q31', text: '下列哪个是中国传统的民间信仰？', multi: false, options: [{ id: 'q31a1', text: '道教', score: 2 }, { id: 'q31a2', text: '基督教', score: 0 }, { id: 'q31a3', text: '伊斯兰教', score: 0 }, { id: 'q31a4', text: '佛教', score: 0 }] },
            { id: 'q32', text: '中国传统服饰中，"唐装"是哪个朝代的代表性服装？', multi: false, options: [{ id: 'q32a1', text: '唐朝', score: 2 }, { id: 'q32a2', text: '宋朝', score: 0 }, { id: 'q32a3', text: '明朝', score: 0 }, { id: 'q32a4', text: '清朝', score: 0 }] },
            { id: 'q33', text: '下列哪个是中国传统的手工艺品"四大名绣"之一？', multi: false, options: [{ id: 'q33a1', text: '苏绣', score: 2 }, { id: 'q33a2', text: '十字绣', score: 0 }, { id: 'q33a3', text: '机绣', score: 0 }, { id: 'q33a4', text: '珠绣', score: 0 }] },
            { id: 'q34', text: '中国传统饮食文化中，"八大菜系"不包括以下哪一项？', multi: false, options: [{ id: 'q34a1', text: '川菜', score: 0 }, { id: 'q34a2', text: '粤菜', score: 0 }, { id: 'q34a3', text: '东北菜', score: 2 }, { id: 'q34a4', text: '鲁菜', score: 0 }] },
            { id: 'q35', text: '下列哪个是中国传统的民间游戏？', multi: false, options: [{ id: 'q35a1', text: '跳皮筋', score: 2 }, { id: 'q35a2', text: '足球', score: 0 }, { id: 'q35a3', text: '篮球', score: 0 }, { id: 'q35a4', text: '排球', score: 0 }] },
            { id: 'q36', text: '中国传统节日中，除夕有什么传统习俗？', multi: false, options: [{ id: 'q36a1', text: '吃年夜饭、守岁', score: 2 }, { id: 'q36a2', text: '赏月、吃月饼', score: 0 }, { id: 'q36a3', text: '赛龙舟、吃粽子', score: 0 }, { id: 'q36a4', text: '插茱萸、登高', score: 0 }] },
            { id: 'q37', text: '下列哪个是中国传统的书法字体？', multi: false, options: [{ id: 'q37a1', text: '楷书', score: 2 }, { id: 'q37a2', text: '宋体', score: 0 }, { id: 'q37a3', text: '黑体', score: 0 }, { id: 'q37a4', text: '微软雅黑', score: 0 }] },
            { id: 'q38', text: '中国传统建筑中，"故宫"又被称为什么？', multi: false, options: [{ id: 'q38a1', text: '紫禁城', score: 2 }, { id: 'q38a2', text: '大明宫', score: 0 }, { id: 'q38a3', text: '未央宫', score: 0 }, { id: 'q38a4', text: '阿房宫', score: 0 }] },
            { id: 'q39', text: '下列哪个是中国传统的戏曲剧种？', multi: false, options: [{ id: 'q39a1', text: '豫剧', score: 2 }, { id: 'q39a2', text: '歌剧', score: 0 }, { id: 'q39a3', text: '舞剧', score: 0 }, { id: 'q39a4', text: '话剧', score: 0 }] },
            { id: 'q40', text: '中国传统节日中，七夕节又被称为什么？', multi: false, options: [{ id: 'q40a1', text: '情人节', score: 2 }, { id: 'q40a2', text: '鬼节', score: 0 }, { id: 'q40a3', text: '灯节', score: 0 }, { id: 'q40a4', text: '祭祖节', score: 0 }] },
            { id: 'q41', text: '下列哪个是中国传统的吉祥物？', multi: false, options: [{ id: 'q41a1', text: '龙', score: 2 }, { id: 'q41a2', text: '狮子', score: 0 }, { id: 'q41a3', text: '老虎', score: 0 }, { id: 'q41a4', text: '熊猫', score: 0 }] },
            { id: 'q42', text: '中国传统服饰中，"凤冠霞帔"是新娘在婚礼上佩戴的装饰，其中"凤冠"代表什么？', multi: false, options: [{ id: 'q42a1', text: '高贵', score: 2 }, { id: 'q42a2', text: '美丽', score: 0 }, { id: 'q42a3', text: '吉祥', score: 0 }, { id: 'q42a4', text: '幸福', score: 0 }] },
            { id: 'q43', text: '下列哪个是中国传统的民间艺术形式"捏面人"？', multi: false, options: [{ id: 'q43a1', text: '用面粉捏制人物形象', score: 2 }, { id: 'q43a2', text: '用泥土捏制人物形象', score: 0 }, { id: 'q43a3', text: '用木头雕刻人物形象', score: 0 }, { id: 'q43a4', text: '用石头雕刻人物形象', score: 0 }] },
            { id: 'q44', text: '中国传统饮食文化中，"茶"的发源地是哪里？', multi: false, options: [{ id: 'q44a1', text: '云南', score: 2 }, { id: 'q44a2', text: '福建', score: 0 }, { id: 'q44a3', text: '浙江', score: 0 }, { id: 'q44a4', text: '安徽', score: 0 }] },
            { id: 'q45', text: '下列哪个是中国传统的节气？', multi: false, options: [{ id: 'q45a1', text: '小满', score: 2 }, { id: 'q45a2', text: '春节', score: 0 }, { id: 'q45a3', text: '元宵节', score: 0 }, { id: 'q45a4', text: '中秋节', score: 0 }] },
            { id: 'q46', text: '中国传统建筑中，"长城"的主要作用是什么？', multi: false, options: [{ id: 'q46a1', text: '防御外敌', score: 2 }, { id: 'q46a2', text: '交通运输', score: 0 }, { id: 'q46a3', text: '观赏旅游', score: 0 }, { id: 'q46a4', text: '灌溉农田', score: 0 }] },
            { id: 'q47', text: '下列哪个是中国传统的民间工艺"年画"？', multi: false, options: [{ id: 'q47a1', text: '传统民间绘画', score: 2 }, { id: 'q47a2', text: '现代绘画', score: 0 }, { id: 'q47a3', text: '山水画', score: 0 }, { id: 'q47a4', text: '花鸟画', score: 0 }] },
            { id: 'q48', text: '中国传统节日中，小年的主要习俗是什么？', multi: false, options: [{ id: 'q48a1', text: '祭灶王', score: 2 }, { id: 'q48a2', text: '吃饺子', score: 0 }, { id: 'q48a3', text: '贴春联', score: 0 }, { id: 'q48a4', text: '放鞭炮', score: 0 }] },
            { id: 'q49', text: '下列哪个是中国传统的乐器"四大名琴"之一？', multi: false, options: [{ id: 'q49a1', text: '焦尾琴', score: 2 }, { id: 'q49a2', text: '二胡', score: 0 }, { id: 'q49a3', text: '笛子', score: 0 }, { id: 'q49a4', text: '琵琶', score: 0 }] },
            { id: 'q50', text: '中国传统民俗文化的核心价值观是什么？', multi: false, options: [{ id: 'q50a1', text: '和谐、团圆、吉祥', score: 2 }, { id: 'q50a2', text: '竞争、创新、进取', score: 0 }, { id: 'q50a3', text: '个人主义、自由平等', score: 0 }, { id: 'q50a4', text: '物质追求、功利主义', score: 0 }] }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            { minScore: 0, maxScore: 50, title: '中国民俗文化入门者', description: '您对中国民俗文化的了解较为有限，建议多了解中国传统节日、民间习俗和传统文化知识，感受中华文化的魅力。', suggestions: ['阅读相关书籍', '参观博物馆', '参加传统节日活动'] },
            { minScore: 51, maxScore: 75, title: '中国民俗文化爱好者', description: '您已经对中国民俗文化有了一定的了解，但仍有提升空间。建议深入学习更多传统艺术和民俗知识，丰富自己的文化底蕴。', suggestions: ['学习传统手工艺', '了解地方特色民俗', '研究非物质文化遗产'] },
            { minScore: 76, maxScore: 100, title: '中国民俗文化专家', description: '您对中国民俗文化有着深入的了解和研究，是传统文化的守护者和传承者。希望您能继续传播和弘扬中国优秀传统文化。', suggestions: ['参与文化传承活动', '撰写相关文章', '向他人普及民俗知识'] }
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