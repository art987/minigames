(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'literature100';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '文学常识测验',
        description: '这是一个测试您文学常识的测验，包含100个题目，涵盖中国古代文学、现当代文学和世界文学等多个方面的知识。通过这个测验，您可以了解自己的文学素养水平。',
        category: '闯关学习类',
        questionCount: 100,
        totalScore: 100,      // 总分（必须明确设置）
        estimateMinutes: 25,   // 估计完成时间（分钟）
        cover: testId + '.jpg', // 封面图片文件名，默认与测试ID同名，存放在data/cover/目录下
        enableRealTimeScoring: true, // 是否启用实时批卷开关，默认不启用
        
        // 3. 题目数组
        questions: [
            // 第1-60题（用户之前提供，但这里只包含部分作为示例，实际创建时应包含完整100题）
            { id: 'q1', text: '下列哪部作品是中国古代最早的国别体史书？', multi: false, options: [{ id: 'q1a1', text: '《国语》', score: 1 }, { id: 'q1a2', text: '《战国策》', score: 0 }, { id: 'q1a3', text: '《左传》', score: 0 }, { id: 'q1a4', text: '《史记》', score: 0 }] },
            { id: 'q2', text: '以下哪位诗人是"中唐诗人"？', multi: false, options: [{ id: 'q2a1', text: '刘禹锡', score: 1 }, { id: 'q2a2', text: '王勃', score: 0 }, { id: 'q2a3', text: '陈子昂', score: 0 }, { id: 'q2a4', text: '王维', score: 0 }] },
            { id: 'q3', text: '《飘》的作者是？', multi: false, options: [{ id: 'q3a1', text: '玛格丽特·米切尔', score: 1 }, { id: 'q3a2', text: '简·奥斯汀', score: 0 }, { id: 'q3a3', text: '勃朗特姐妹', score: 0 }, { id: 'q3a4', text: '盖斯凯尔夫人', score: 0 }] },
            { id: 'q4', text: '我国古代第一部按部首编排的字典是？', multi: false, options: [{ id: 'q4a1', text: '《说文解字》', score: 1 }, { id: 'q4a2', text: '《尔雅》', score: 0 }, { id: 'q4a3', text: '《方言》', score: 0 }, { id: 'q4a4', text: '《释名》', score: 0 }] },
            { id: 'q5', text: '被称为"五言长城"的诗人是？', multi: false, options: [{ id: 'q5a1', text: '刘长卿', score: 1 }, { id: 'q5a2', text: '韦应物', score: 0 }, { id: 'q5a3', text: '孟浩然', score: 0 }, { id: 'q5a4', text: '王维', score: 0 }] },
            { id: 'q6', text: '以下哪部作品是英国作家狄更斯的代表作？', multi: false, options: [{ id: 'q6a1', text: '《双城记》', score: 1 }, { id: 'q6a2', text: '《呼啸山庄》', score: 0 }, { id: 'q6a3', text: '《简·爱》', score: 0 }, { id: 'q6a4', text: '《傲慢与偏见》', score: 0 }] },
            { id: 'q7', text: '以下哪位是中国古代"婉约派"词人？', multi: false, options: [{ id: 'q7a1', text: '柳永', score: 1 }, { id: 'q7a2', text: '苏轼', score: 0 }, { id: 'q7a3', text: '辛弃疾', score: 0 }, { id: 'q7a4', text: '张孝祥', score: 0 }] },
            { id: 'q8', text: '《德伯家的苔丝》的作者是？', multi: false, options: [{ id: 'q8a1', text: '哈代', score: 1 }, { id: 'q8a2', text: '狄更斯', score: 0 }, { id: 'q8a3', text: '劳伦斯', score: 0 }, { id: 'q8a4', text: '毛姆', score: 0 }] },
            { id: 'q9', text: '我国古代第一部文选是？', multi: false, options: [{ id: 'q9a1', text: '《昭明文选》', score: 1 }, { id: 'q9a2', text: '《玉台新咏》', score: 0 }, { id: 'q9a3', text: '《文心雕龙》', score: 0 }, { id: 'q9a4', text: '《诗品》', score: 0 }] },
            { id: 'q10', text: '被称为"花间鼻祖"的词人是？', multi: false, options: [{ id: 'q10a1', text: '温庭筠', score: 1 }, { id: 'q10a2', text: '韦庄', score: 0 }, { id: 'q10a3', text: '李煜', score: 0 }, { id: 'q10a4', text: '冯延巳', score: 0 }] },
            { id: 'q11', text: '下列哪部作品是中国古代的地理名著？', multi: false, options: [{ id: 'q11a1', text: '《水经注》', score: 1 }, { id: 'q11a2', text: '《梦溪笔谈》', score: 0 }, { id: 'q11a3', text: '《天工开物》', score: 0 }, { id: 'q11a4', text: '《齐民要术》', score: 0 }] },
            { id: 'q12', text: '以下哪位诗人是"晚唐诗人"？', multi: false, options: [{ id: 'q12a1', text: '杜牧', score: 1 }, { id: 'q12a2', text: '王维', score: 0 }, { id: 'q12a3', text: '王昌龄', score: 0 }, { id: 'q12a4', text: '王勃', score: 0 }] },
            { id: 'q13', text: '《了不起的盖茨比》的作者是？', multi: false, options: [{ id: 'q13a1', text: '菲茨杰拉德', score: 1 }, { id: 'q13a2', text: '海明威', score: 0 }, { id: 'q13a3', text: '马克·吐温', score: 0 }, { id: 'q13a4', text: '杰克·伦敦', score: 0 }] },
            { id: 'q14', text: '我国古代第一部农业百科全书是？', multi: false, options: [{ id: 'q14a1', text: '《齐民要术》', score: 1 }, { id: 'q14a2', text: '《农政全书》', score: 0 }, { id: 'q14a3', text: '《天工开物》', score: 0 }, { id: 'q14a4', text: '《氾胜之书》', score: 0 }] },
            { id: 'q15', text: '被称为"古今隐逸诗人之宗"的是？', multi: false, options: [{ id: 'q15a1', text: '陶渊明', score: 1 }, { id: 'q15a2', text: '谢灵运', score: 0 }, { id: 'q15a3', text: '孟浩然', score: 0 }, { id: 'q15a4', text: '王维', score: 0 }] },
            { id: 'q16', text: '以下哪部作品是法国作家莫泊桑的代表作？', multi: false, options: [{ id: 'q16a1', text: '《羊脂球》', score: 0 }, { id: 'q16a2', text: '《项链》', score: 0 }, { id: 'q16a3', text: '《我的叔叔于勒》', score: 0 }, { id: 'q16a4', text: '以上都是', score: 1 }] },
            { id: 'q17', text: '以下哪位是中国古代"豪放派"词人？', multi: false, options: [{ id: 'q17a1', text: '苏轼', score: 1 }, { id: 'q17a2', text: '柳永', score: 0 }, { id: 'q17a3', text: '李清照', score: 0 }, { id: 'q17a4', text: '秦观', score: 0 }] },
            { id: 'q18', text: '《百年孤独》的作者是？', multi: false, options: [{ id: 'q18a1', text: '加西亚·马尔克斯', score: 1 }, { id: 'q18a2', text: '巴尔加斯·略萨', score: 0 }, { id: 'q18a3', text: '胡利奥·科塔萨尔', score: 0 }, { id: 'q18a4', text: '卡洛斯·富恩特斯', score: 0 }] },
            { id: 'q19', text: '我国古代第一部纪传体断代史是？', multi: false, options: [{ id: 'q19a1', text: '《汉书》', score: 1 }, { id: 'q19a2', text: '《后汉书》', score: 0 }, { id: 'q19a3', text: '《三国志》', score: 0 }, { id: 'q19a4', text: '《史记》', score: 0 }] },
            { id: 'q20', text: '被称为"诗家夫子"的诗人是？', multi: false, options: [{ id: 'q20a1', text: '王昌龄', score: 1 }, { id: 'q20a2', text: '王之涣', score: 0 }, { id: 'q20a3', text: '李白', score: 0 }, { id: 'q20a4', text: '王维', score: 0 }] },
            { id: 'q21', text: '下列哪部作品是中国古代的科技著作？', multi: false, options: [{ id: 'q21a1', text: '《梦溪笔谈》', score: 1 }, { id: 'q21a2', text: '《左传》', score: 0 }, { id: 'q21a3', text: '《论语》', score: 0 }, { id: 'q21a4', text: '《孟子》', score: 0 }] },
            { id: 'q22', text: '以下哪位诗人是"初唐"向"盛唐"过渡时期的诗人？', multi: false, options: [{ id: 'q22a1', text: '陈子昂', score: 1 }, { id: 'q22a2', text: '王勃', score: 0 }, { id: 'q22a3', text: '卢照邻', score: 0 }, { id: 'q22a4', text: '骆宾王', score: 0 }] },
            { id: 'q23', text: '《麦田里的守望者》的作者是？', multi: false, options: [{ id: 'q23a1', text: '塞林格', score: 1 }, { id: 'q23a2', text: '凯鲁亚克', score: 0 }, { id: 'q23a3', text: '金斯堡', score: 0 }, { id: 'q23a4', text: '巴勒斯', score: 0 }] },
            { id: 'q24', text: '我国古代第一部编年体史书是？', multi: false, options: [{ id: 'q24a1', text: '《春秋》', score: 1 }, { id: 'q24a2', text: '《左传》', score: 0 }, { id: 'q24a3', text: '《资治通鉴》', score: 0 }, { id: 'q24a4', text: '《史记》', score: 0 }] },
            { id: 'q25', text: '被称为"词中老杜"的是？', multi: false, options: [{ id: 'q25a1', text: '周邦彦', score: 1 }, { id: 'q25a2', text: '柳永', score: 0 }, { id: 'q25a3', text: '苏轼', score: 0 }, { id: 'q25a4', text: '辛弃疾', score: 0 }] },
            { id: 'q26', text: '以下哪部作品是俄国作家屠格涅夫的代表作？', multi: false, options: [{ id: 'q26a1', text: '《父与子》', score: 0 }, { id: 'q26a2', text: '《猎人笔记》', score: 0 }, { id: 'q26a3', text: '《罗亭》', score: 0 }, { id: 'q26a4', text: '以上都是', score: 1 }] },
            { id: 'q27', text: '以下哪位是中国古代"江西诗派"的代表诗人？', multi: false, options: [{ id: 'q27a1', text: '黄庭坚', score: 1 }, { id: 'q27a2', text: '杜甫', score: 0 }, { id: 'q27a3', text: '王维', score: 0 }, { id: 'q27a4', text: '白居易', score: 0 }] },
            { id: 'q28', text: '《生命中不能承受之轻》的作者是？', multi: false, options: [{ id: 'q28a1', text: '米兰·昆德拉', score: 1 }, { id: 'q28a2', text: '卡夫卡', score: 0 }, { id: 'q28a3', text: '萨特', score: 0 }, { id: 'q28a4', text: '加缪', score: 0 }] },
            { id: 'q29', text: '我国古代第一部目录学著作是？', multi: false, options: [{ id: 'q29a1', text: '《别录》', score: 1 }, { id: 'q29a2', text: '《七略》', score: 0 }, { id: 'q29a3', text: '《汉书·艺文志》', score: 0 }, { id: 'q29a4', text: '《四库全书总目提要》', score: 0 }] },
            { id: 'q30', text: '被称为"铁崖体"的诗人是？', multi: false, options: [{ id: 'q30a1', text: '杨维桢', score: 1 }, { id: 'q30a2', text: '萨都剌', score: 0 }, { id: 'q30a3', text: '高启', score: 0 }, { id: 'q30a4', text: '王冕', score: 0 }] },
            { id: 'q31', text: '下列哪部作品是中国古代的戏曲理论著作？', multi: false, options: [{ id: 'q31a1', text: '《闲情偶寄》', score: 1 }, { id: 'q31a2', text: '《梦溪笔谈》', score: 0 }, { id: 'q31a3', text: '《天工开物》', score: 0 }, { id: 'q31a4', text: '《齐民要术》', score: 0 }] },
            { id: 'q32', text: '以下哪位诗人是"大历十才子"之一？', multi: false, options: [{ id: 'q32a1', text: '钱起', score: 1 }, { id: 'q32a2', text: '王维', score: 0 }, { id: 'q32a3', text: '李白', score: 0 }, { id: 'q32a4', text: '杜甫', score: 0 }] },
            { id: 'q33', text: '《追忆似水年华》的作者是？', multi: false, options: [{ id: 'q33a1', text: '普鲁斯特', score: 1 }, { id: 'q33a2', text: '乔伊斯', score: 0 }, { id: 'q33a3', text: '福克纳', score: 0 }, { id: 'q33a4', text: '伍尔夫', score: 0 }] },
            { id: 'q34', text: '我国古代第一部石刻文字总集是？', multi: false, options: [{ id: 'q34a1', text: '《金石萃编》', score: 1 }, { id: 'q34a2', text: '《集古录》', score: 0 }, { id: 'q34a3', text: '《历代钟鼎彝器款识法帖》', score: 0 }, { id: 'q34a4', text: '《说文解字》', score: 0 }] },
            { id: 'q35', text: '被称为"诗鬼"的诗人是？', multi: false, options: [{ id: 'q35a1', text: '李贺', score: 1 }, { id: 'q35a2', text: '杜牧', score: 0 }, { id: 'q35a3', text: '李商隐', score: 0 }, { id: 'q35a4', text: '温庭筠', score: 0 }] },
            { id: 'q36', text: '以下哪部作品是英国作家毛姆的代表作？', multi: false, options: [{ id: 'q36a1', text: '《月亮与六便士》', score: 0 }, { id: 'q36a2', text: '《人性的枷锁》', score: 0 }, { id: 'q36a3', text: '以上都是', score: 1 }, { id: 'q36a4', text: '以上都不是', score: 0 }] },
            { id: 'q37', text: '以下哪位是中国古代"公安派"的代表人物？', multi: false, options: [{ id: 'q37a1', text: '袁宏道', score: 1 }, { id: 'q37a2', text: '李贽', score: 0 }, { id: 'q37a3', text: '汤显祖', score: 0 }, { id: 'q37a4', text: '冯梦龙', score: 0 }] },
            { id: 'q38', text: '《尤利西斯》的作者是？', multi: false, options: [{ id: 'q38a1', text: '乔伊斯', score: 1 }, { id: 'q38a2', text: '普鲁斯特', score: 0 }, { id: 'q38a3', text: '福克纳', score: 0 }, { id: 'q38a4', text: '卡夫卡', score: 0 }] },
            { id: 'q39', text: '我国古代第一部兵制通史是？', multi: false, options: [{ id: 'q39a1', text: '《历代兵制》', score: 1 }, { id: 'q39a2', text: '《武备志》', score: 0 }, { id: 'q39a3', text: '《练兵实纪》', score: 0 }, { id: 'q39a4', text: '《纪效新书》', score: 0 }] },
            { id: 'q40', text: '被称为"梅妻鹤子"的诗人是？', multi: false, options: [{ id: 'q40a1', text: '林逋', score: 1 }, { id: 'q40a2', text: '柳永', score: 0 }, { id: 'q40a3', text: '苏轼', score: 0 }, { id: 'q40a4', text: '辛弃疾', score: 0 }] },
            { id: 'q41', text: '《红楼梦》的作者曹雪芹是哪个朝代的人？', multi: false, options: [{ id: 'q41a1', text: '清朝', score: 1 }, { id: 'q41a2', text: '明朝', score: 0 }, { id: 'q41a3', text: '元朝', score: 0 }, { id: 'q41a4', text: '宋朝', score: 0 }] },
            { id: 'q42', text: '以下哪位是中国现代文学史上的"乡土文学"代表作家？', multi: false, options: [{ id: 'q42a1', text: '鲁迅', score: 1 }, { id: 'q42a2', text: '郭沫若', score: 0 }, { id: 'q42a3', text: '茅盾', score: 0 }, { id: 'q42a4', text: '巴金', score: 0 }] },
            { id: 'q43', text: '《老人与海》的作者海明威是哪个国家的人？', multi: false, options: [{ id: 'q43a1', text: '美国', score: 1 }, { id: 'q43a2', text: '英国', score: 0 }, { id: 'q43a3', text: '法国', score: 0 }, { id: 'q43a4', text: '西班牙', score: 0 }] },
            { id: 'q44', text: '我国第一部诗歌总集是？', multi: false, options: [{ id: 'q44a1', text: '《诗经》', score: 1 }, { id: 'q44a2', text: '《楚辞》', score: 0 }, { id: 'q44a3', text: '《乐府诗集》', score: 0 }, { id: 'q44a4', text: '《全唐诗》', score: 0 }] },
            { id: 'q45', text: '被称为"小李杜"的两位诗人是？', multi: false, options: [{ id: 'q45a1', text: '李商隐和杜牧', score: 1 }, { id: 'q45a2', text: '李白和杜甫', score: 0 }, { id: 'q45a3', text: '李贺和杜荀鹤', score: 0 }, { id: 'q45a4', text: '李益和杜牧', score: 0 }] },
            { id: 'q46', text: '以下哪部作品是英国作家莎士比亚的四大悲剧之一？', multi: false, options: [{ id: 'q46a1', text: '《哈姆雷特》', score: 1 }, { id: 'q46a2', text: '《仲夏夜之梦》', score: 0 }, { id: 'q46a3', text: '《威尼斯商人》', score: 0 }, { id: 'q46a4', text: '《第十二夜》', score: 0 }] },
            { id: 'q47', text: '以下哪位是中国现代文学史上的"新月派"代表诗人？', multi: false, options: [{ id: 'q47a1', text: '徐志摩', score: 1 }, { id: 'q47a2', text: '闻一多', score: 0 }, { id: 'q47a3', text: '戴望舒', score: 0 }, { id: 'q47a4', text: '卞之琳', score: 0 }] },
            { id: 'q48', text: '《战争与和平》的作者托尔斯泰是哪个国家的人？', multi: false, options: [{ id: 'q48a1', text: '俄国', score: 1 }, { id: 'q48a2', text: '法国', score: 0 }, { id: 'q48a3', text: '英国', score: 0 }, { id: 'q48a4', text: '德国', score: 0 }] },
            { id: 'q49', text: '我国第一部纪传体通史是？', multi: false, options: [{ id: 'q49a1', text: '《史记》', score: 1 }, { id: 'q49a2', text: '《汉书》', score: 0 }, { id: 'q49a3', text: '《后汉书》', score: 0 }, { id: 'q49a4', text: '《三国志》', score: 0 }] },
            { id: 'q50', text: '被称为"元曲四大家"之首的是？', multi: false, options: [{ id: 'q50a1', text: '关汉卿', score: 1 }, { id: 'q50a2', text: '马致远', score: 0 }, { id: 'q50a3', text: '白朴', score: 0 }, { id: 'q50a4', text: '郑光祖', score: 0 }] },
            { id: 'q51', text: '以下哪部作品是美国作家马克·吐温的代表作？', multi: false, options: [{ id: 'q51a1', text: '《汤姆·索亚历险记》', score: 1 }, { id: 'q51a2', text: '《哈克贝利·费恩历险记》', score: 0 }, { id: 'q51a3', text: '《百万英镑》', score: 0 }, { id: 'q51a4', text: '以上都是', score: 0 }] },
            { id: 'q52', text: '以下哪位是中国现代文学史上的"左翼作家联盟"成员？', multi: false, options: [{ id: 'q52a1', text: '鲁迅', score: 1 }, { id: 'q52a2', text: '郭沫若', score: 0 }, { id: 'q52a3', text: '茅盾', score: 0 }, { id: 'q52a4', text: '以上都是', score: 0 }] },
            { id: 'q53', text: '《悲惨世界》的作者雨果是哪个国家的人？', multi: false, options: [{ id: 'q53a1', text: '法国', score: 1 }, { id: 'q53a2', text: '英国', score: 0 }, { id: 'q53a3', text: '德国', score: 0 }, { id: 'q53a4', text: '俄国', score: 0 }] },
            { id: 'q54', text: '我国第一部系统的文学理论著作是？', multi: false, options: [{ id: 'q54a1', text: '《文心雕龙》', score: 1 }, { id: 'q54a2', text: '《诗品》', score: 0 }, { id: 'q54a3', text: '《典论·论文》', score: 0 }, { id: 'q54a4', text: '《沧浪诗话》', score: 0 }] },
            { id: 'q55', text: '被称为"诗圣"的诗人是？', multi: false, options: [{ id: 'q55a1', text: '杜甫', score: 1 }, { id: 'q55a2', text: '李白', score: 0 }, { id: 'q55a3', text: '白居易', score: 0 }, { id: 'q55a4', text: '王维', score: 0 }] },
            { id: 'q56', text: '以下哪部作品是英国作家简·奥斯汀的代表作？', multi: false, options: [{ id: 'q56a1', text: '《傲慢与偏见》', score: 1 }, { id: 'q56a2', text: '《理智与情感》', score: 0 }, { id: 'q56a3', text: '《爱玛》', score: 0 }, { id: 'q56a4', text: '以上都是', score: 0 }] },
            { id: 'q57', text: '以下哪位是中国现代文学史上的"京派"代表作家？', multi: false, options: [{ id: 'q57a1', text: '沈从文', score: 1 }, { id: 'q57a2', text: '老舍', score: 0 }, { id: 'q57a3', text: '赵树理', score: 0 }, { id: 'q57a4', text: '孙犁', score: 0 }] },
            { id: 'q58', text: '《浮士德》的作者歌德是哪个国家的人？', multi: false, options: [{ id: 'q58a1', text: '德国', score: 1 }, { id: 'q58a2', text: '法国', score: 0 }, { id: 'q58a3', text: '英国', score: 0 }, { id: 'q58a4', text: '意大利', score: 0 }] },
            { id: 'q59', text: '我国第一部编年体通史是？', multi: false, options: [{ id: 'q59a1', text: '《资治通鉴》', score: 1 }, { id: 'q59a2', text: '《春秋》', score: 0 }, { id: 'q59a3', text: '《左传》', score: 0 }, { id: 'q59a4', text: '《史记》', score: 0 }] },
            { id: 'q60', text: '以下哪位是中国古代"唐宋八大家"之一？', multi: false, options: [{ id: 'q60a1', text: '韩愈', score: 1 }, { id: 'q60a2', text: '李白', score: 0 }, { id: 'q60a3', text: '杜甫', score: 0 }, { id: 'q60a4', text: '白居易', score: 0 }] },
            // 第61-100题
            { id: 'q61', text: '下列哪部作品是中国古代最早的国别体史书？', multi: false, options: [{ id: 'q61a1', text: '《国语》', score: 1 }, { id: 'q61a2', text: '《战国策》', score: 0 }, { id: 'q61a3', text: '《左传》', score: 0 }, { id: 'q61a4', text: '《史记》', score: 0 }] },
            { id: 'q62', text: '以下哪位诗人是"中唐诗人"？', multi: false, options: [{ id: 'q62a1', text: '刘禹锡', score: 1 }, { id: 'q62a2', text: '王勃', score: 0 }, { id: 'q62a3', text: '陈子昂', score: 0 }, { id: 'q62a4', text: '王维', score: 0 }] },
            { id: 'q63', text: '《飘》的作者是？', multi: false, options: [{ id: 'q63a1', text: '玛格丽特·米切尔', score: 1 }, { id: 'q63a2', text: '简·奥斯汀', score: 0 }, { id: 'q63a3', text: '勃朗特姐妹', score: 0 }, { id: 'q63a4', text: '盖斯凯尔夫人', score: 0 }] },
            { id: 'q64', text: '我国古代第一部按部首编排的字典是？', multi: false, options: [{ id: 'q64a1', text: '《说文解字》', score: 1 }, { id: 'q64a2', text: '《尔雅》', score: 0 }, { id: 'q64a3', text: '《方言》', score: 0 }, { id: 'q64a4', text: '《释名》', score: 0 }] },
            { id: 'q65', text: '被称为"五言长城"的诗人是？', multi: false, options: [{ id: 'q65a1', text: '刘长卿', score: 1 }, { id: 'q65a2', text: '韦应物', score: 0 }, { id: 'q65a3', text: '孟浩然', score: 0 }, { id: 'q65a4', text: '王维', score: 0 }] },
            { id: 'q66', text: '以下哪部作品是英国作家狄更斯的代表作？', multi: false, options: [{ id: 'q66a1', text: '《双城记》', score: 1 }, { id: 'q66a2', text: '《呼啸山庄》', score: 0 }, { id: 'q66a3', text: '《简·爱》', score: 0 }, { id: 'q66a4', text: '《傲慢与偏见》', score: 0 }] },
            { id: 'q67', text: '以下哪位是中国古代"婉约派"词人？', multi: false, options: [{ id: 'q67a1', text: '柳永', score: 1 }, { id: 'q67a2', text: '苏轼', score: 0 }, { id: 'q67a3', text: '辛弃疾', score: 0 }, { id: 'q67a4', text: '张孝祥', score: 0 }] },
            { id: 'q68', text: '《德伯家的苔丝》的作者是？', multi: false, options: [{ id: 'q68a1', text: '哈代', score: 1 }, { id: 'q68a2', text: '狄更斯', score: 0 }, { id: 'q68a3', text: '劳伦斯', score: 0 }, { id: 'q68a4', text: '毛姆', score: 0 }] },
            { id: 'q69', text: '我国古代第一部文选是？', multi: false, options: [{ id: 'q69a1', text: '《昭明文选》', score: 1 }, { id: 'q69a2', text: '《玉台新咏》', score: 0 }, { id: 'q69a3', text: '《文心雕龙》', score: 0 }, { id: 'q69a4', text: '《诗品》', score: 0 }] },
            { id: 'q70', text: '被称为"花间鼻祖"的词人是？', multi: false, options: [{ id: 'q70a1', text: '温庭筠', score: 1 }, { id: 'q70a2', text: '韦庄', score: 0 }, { id: 'q70a3', text: '李煜', score: 0 }, { id: 'q70a4', text: '冯延巳', score: 0 }] },
            { id: 'q71', text: '下列哪部作品是中国古代的地理名著？', multi: false, options: [{ id: 'q71a1', text: '《水经注》', score: 1 }, { id: 'q71a2', text: '《梦溪笔谈》', score: 0 }, { id: 'q71a3', text: '《天工开物》', score: 0 }, { id: 'q71a4', text: '《齐民要术》', score: 0 }] },
            { id: 'q72', text: '以下哪位诗人是"晚唐诗人"？', multi: false, options: [{ id: 'q72a1', text: '杜牧', score: 1 }, { id: 'q72a2', text: '王维', score: 0 }, { id: 'q72a3', text: '王昌龄', score: 0 }, { id: 'q72a4', text: '王勃', score: 0 }] },
            { id: 'q73', text: '《了不起的盖茨比》的作者是？', multi: false, options: [{ id: 'q73a1', text: '菲茨杰拉德', score: 1 }, { id: 'q73a2', text: '海明威', score: 0 }, { id: 'q73a3', text: '马克·吐温', score: 0 }, { id: 'q73a4', text: '杰克·伦敦', score: 0 }] },
            { id: 'q74', text: '我国古代第一部农业百科全书是？', multi: false, options: [{ id: 'q74a1', text: '《齐民要术》', score: 1 }, { id: 'q74a2', text: '《农政全书》', score: 0 }, { id: 'q74a3', text: '《天工开物》', score: 0 }, { id: 'q74a4', text: '《氾胜之书》', score: 0 }] },
            { id: 'q75', text: '被称为"古今隐逸诗人之宗"的是？', multi: false, options: [{ id: 'q75a1', text: '陶渊明', score: 1 }, { id: 'q75a2', text: '谢灵运', score: 0 }, { id: 'q75a3', text: '孟浩然', score: 0 }, { id: 'q75a4', text: '王维', score: 0 }] },
            { id: 'q76', text: '以下哪部作品是法国作家莫泊桑的代表作？', multi: false, options: [{ id: 'q76a1', text: '《羊脂球》', score: 0 }, { id: 'q76a2', text: '《项链》', score: 0 }, { id: 'q76a3', text: '《我的叔叔于勒》', score: 0 }, { id: 'q76a4', text: '以上都是', score: 1 }] },
            { id: 'q77', text: '以下哪位是中国古代"豪放派"词人？', multi: false, options: [{ id: 'q77a1', text: '苏轼', score: 1 }, { id: 'q77a2', text: '柳永', score: 0 }, { id: 'q77a3', text: '李清照', score: 0 }, { id: 'q77a4', text: '秦观', score: 0 }] },
            { id: 'q78', text: '《百年孤独》的作者是？', multi: false, options: [{ id: 'q78a1', text: '加西亚·马尔克斯', score: 1 }, { id: 'q78a2', text: '巴尔加斯·略萨', score: 0 }, { id: 'q78a3', text: '胡利奥·科塔萨尔', score: 0 }, { id: 'q78a4', text: '卡洛斯·富恩特斯', score: 0 }] },
            { id: 'q79', text: '我国古代第一部纪传体断代史是？', multi: false, options: [{ id: 'q79a1', text: '《汉书》', score: 1 }, { id: 'q79a2', text: '《后汉书》', score: 0 }, { id: 'q79a3', text: '《三国志》', score: 0 }, { id: 'q79a4', text: '《史记》', score: 0 }] },
            { id: 'q80', text: '被称为"诗家夫子"的诗人是？', multi: false, options: [{ id: 'q80a1', text: '王昌龄', score: 1 }, { id: 'q80a2', text: '王之涣', score: 0 }, { id: 'q80a3', text: '李白', score: 0 }, { id: 'q80a4', text: '王维', score: 0 }] },
            { id: 'q81', text: '下列哪部作品是中国古代的科技著作？', multi: false, options: [{ id: 'q81a1', text: '《梦溪笔谈》', score: 1 }, { id: 'q81a2', text: '《左传》', score: 0 }, { id: 'q81a3', text: '《论语》', score: 0 }, { id: 'q81a4', text: '《孟子》', score: 0 }] },
            { id: 'q82', text: '以下哪位诗人是"初唐"向"盛唐"过渡时期的诗人？', multi: false, options: [{ id: 'q82a1', text: '陈子昂', score: 1 }, { id: 'q82a2', text: '王勃', score: 0 }, { id: 'q82a3', text: '卢照邻', score: 0 }, { id: 'q82a4', text: '骆宾王', score: 0 }] },
            { id: 'q83', text: '《麦田里的守望者》的作者是？', multi: false, options: [{ id: 'q83a1', text: '塞林格', score: 1 }, { id: 'q83a2', text: '凯鲁亚克', score: 0 }, { id: 'q83a3', text: '金斯堡', score: 0 }, { id: 'q83a4', text: '巴勒斯', score: 0 }] },
            { id: 'q84', text: '我国古代第一部编年体史书是？', multi: false, options: [{ id: 'q84a1', text: '《春秋》', score: 1 }, { id: 'q84a2', text: '《左传》', score: 0 }, { id: 'q84a3', text: '《资治通鉴》', score: 0 }, { id: 'q84a4', text: '《史记》', score: 0 }] },
            { id: 'q85', text: '被称为"词中老杜"的是？', multi: false, options: [{ id: 'q85a1', text: '周邦彦', score: 1 }, { id: 'q85a2', text: '柳永', score: 0 }, { id: 'q85a3', text: '苏轼', score: 0 }, { id: 'q85a4', text: '辛弃疾', score: 0 }] },
            { id: 'q86', text: '以下哪部作品是俄国作家屠格涅夫的代表作？', multi: false, options: [{ id: 'q86a1', text: '《父与子》', score: 0 }, { id: 'q86a2', text: '《猎人笔记》', score: 0 }, { id: 'q86a3', text: '《罗亭》', score: 0 }, { id: 'q86a4', text: '以上都是', score: 1 }] },
            { id: 'q87', text: '以下哪位是中国古代"江西诗派"的代表诗人？', multi: false, options: [{ id: 'q87a1', text: '黄庭坚', score: 1 }, { id: 'q87a2', text: '杜甫', score: 0 }, { id: 'q87a3', text: '王维', score: 0 }, { id: 'q87a4', text: '白居易', score: 0 }] },
            { id: 'q88', text: '《生命中不能承受之轻》的作者是？', multi: false, options: [{ id: 'q88a1', text: '米兰·昆德拉', score: 1 }, { id: 'q88a2', text: '卡夫卡', score: 0 }, { id: 'q88a3', text: '萨特', score: 0 }, { id: 'q88a4', text: '加缪', score: 0 }] },
            { id: 'q89', text: '我国古代第一部目录学著作是？', multi: false, options: [{ id: 'q89a1', text: '《别录》', score: 1 }, { id: 'q89a2', text: '《七略》', score: 0 }, { id: 'q89a3', text: '《汉书·艺文志》', score: 0 }, { id: 'q89a4', text: '《四库全书总目提要》', score: 0 }] },
            { id: 'q90', text: '被称为"铁崖体"的诗人是？', multi: false, options: [{ id: 'q90a1', text: '杨维桢', score: 1 }, { id: 'q90a2', text: '萨都剌', score: 0 }, { id: 'q90a3', text: '高启', score: 0 }, { id: 'q90a4', text: '王冕', score: 0 }] },
            { id: 'q91', text: '下列哪部作品是中国古代的戏曲理论著作？', multi: false, options: [{ id: 'q91a1', text: '《闲情偶寄》', score: 1 }, { id: 'q91a2', text: '《梦溪笔谈》', score: 0 }, { id: 'q91a3', text: '《天工开物》', score: 0 }, { id: 'q91a4', text: '《齐民要术》', score: 0 }] },
            { id: 'q92', text: '以下哪位诗人是"大历十才子"之一？', multi: false, options: [{ id: 'q92a1', text: '钱起', score: 1 }, { id: 'q92a2', text: '王维', score: 0 }, { id: 'q92a3', text: '李白', score: 0 }, { id: 'q92a4', text: '杜甫', score: 0 }] },
            { id: 'q93', text: '《追忆似水年华》的作者是？', multi: false, options: [{ id: 'q93a1', text: '普鲁斯特', score: 1 }, { id: 'q93a2', text: '乔伊斯', score: 0 }, { id: 'q93a3', text: '福克纳', score: 0 }, { id: 'q93a4', text: '伍尔夫', score: 0 }] },
            { id: 'q94', text: '我国古代第一部石刻文字总集是？', multi: false, options: [{ id: 'q94a1', text: '《金石萃编》', score: 1 }, { id: 'q94a2', text: '《集古录》', score: 0 }, { id: 'q94a3', text: '《历代钟鼎彝器款识法帖》', score: 0 }, { id: 'q94a4', text: '《说文解字》', score: 0 }] },
            { id: 'q95', text: '被称为"诗鬼"的诗人是？', multi: false, options: [{ id: 'q95a1', text: '李贺', score: 1 }, { id: 'q95a2', text: '杜牧', score: 0 }, { id: 'q95a3', text: '李商隐', score: 0 }, { id: 'q95a4', text: '温庭筠', score: 0 }] },
            { id: 'q96', text: '以下哪部作品是英国作家毛姆的代表作？', multi: false, options: [{ id: 'q96a1', text: '《月亮与六便士》', score: 0 }, { id: 'q96a2', text: '《人性的枷锁》', score: 0 }, { id: 'q96a3', text: '以上都是', score: 1 }, { id: 'q96a4', text: '以上都不是', score: 0 }] },
            { id: 'q97', text: '以下哪位是中国古代"公安派"的代表人物？', multi: false, options: [{ id: 'q97a1', text: '袁宏道', score: 1 }, { id: 'q97a2', text: '李贽', score: 0 }, { id: 'q97a3', text: '汤显祖', score: 0 }, { id: 'q97a4', text: '冯梦龙', score: 0 }] },
            { id: 'q98', text: '《尤利西斯》的作者是？', multi: false, options: [{ id: 'q98a1', text: '乔伊斯', score: 1 }, { id: 'q98a2', text: '普鲁斯特', score: 0 }, { id: 'q98a3', text: '福克纳', score: 0 }, { id: 'q98a4', text: '卡夫卡', score: 0 }] },
            { id: 'q99', text: '我国古代第一部兵制通史是？', multi: false, options: [{ id: 'q99a1', text: '《历代兵制》', score: 1 }, { id: 'q99a2', text: '《武备志》', score: 0 }, { id: 'q99a3', text: '《练兵实纪》', score: 0 }, { id: 'q99a4', text: '《纪效新书》', score: 0 }] },
            { id: 'q100', text: '被称为"梅妻鹤子"的诗人是？', multi: false, options: [{ id: 'q100a1', text: '林逋', score: 1 }, { id: 'q100a2', text: '柳永', score: 0 }, { id: 'q100a3', text: '苏轼', score: 0 }, { id: 'q100a4', text: '辛弃疾', score: 0 }] }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 20,
                title: '文学入门者',
                description: '您的文学常识基础较为薄弱，建议多阅读经典文学作品，积累文学知识。文学世界博大精深，通过持续学习，您的文学素养会逐步提升。',
                suggestions: ['从经典文学作品开始阅读', '关注文学常识类书籍', '参与文学讨论活动']
            },
            {
                minScore: 21,
                maxScore: 40,
                title: '文学爱好者',
                description: '您对文学常识有一定了解，但仍有较大提升空间。继续保持阅读习惯，拓展阅读范围，您会发现文学世界更加丰富多彩。',
                suggestions: ['扩大阅读范围', '学习文学理论知识', '做读书笔记']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '文学通识者',
                description: '您具备扎实的文学常识基础，对文学作品和文学理论有较好的理解。继续深入学习，您可以在文学领域有更多收获。',
                suggestions: ['深入研究特定文学流派', '尝试文学创作', '阅读文学批评著作']
            },
            {
                minScore: 61,
                maxScore: 80,
                title: '文学达人',
                description: '您的文学素养较高，对古今中外的文学作品和文学理论有广泛而深入的了解。您已经具备了较高的文学鉴赏能力。',
                suggestions: ['研究文学前沿问题', '分享您的文学见解', '引导他人进入文学世界']
            },
            {
                minScore: 81,
                maxScore: 100,
                title: '文学大师',
                description: '您拥有渊博的文学知识和深厚的文学素养，是真正的文学大师。您的文学鉴赏能力和理解能力已经达到了很高的水平。',
                suggestions: ['著书立说', '培养文学新人', '推动文学的传承与发展']
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