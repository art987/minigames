(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'firstaid50';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '急救与安全测验',
        description: '本测验包含50道关于急救与安全的常识题目，涵盖心肺复苏、烧伤处理、溺水急救等方面的知识，帮助您了解和掌握基本的急救技能。',
        category: '闯关学习类',
        questionCount: 50,
        totalScore: 100,
        estimateMinutes: 15,
        cover: testId + '.jpg',
        enableRealTimeScoring: true,
        
        // 3. 题目数组
        questions: [
            { id: 'q1', text: '进行心肺复苏时，正确的按压频率是多少？', multi: false, options: [{ id: 'q1a1', text: '60-80次/分钟', score: 0 }, { id: 'q1a2', text: '80-100次/分钟', score: 0 }, { id: 'q1a3', text: '100-120次/分钟', score: 2 }, { id: 'q1a4', text: '120-140次/分钟', score: 0 }] },
            { id: 'q2', text: '发生火灾时，应该用湿毛巾捂住口鼻并如何撤离？', multi: false, options: [{ id: 'q2a1', text: '直立快速奔跑', score: 0 }, { id: 'q2a2', text: '弯腰低姿前进', score: 2 }, { id: 'q2a3', text: '躲在房间角落', score: 0 }, { id: 'q2a4', text: '乘坐电梯下楼', score: 0 }] },
            { id: 'q3', text: '轻度烧伤应该如何处理？', multi: false, options: [{ id: 'q3a1', text: '立即涂抹牙膏', score: 0 }, { id: 'q3a2', text: '用冷水冲洗15-20分钟', score: 2 }, { id: 'q3a3', text: '用酒精消毒', score: 0 }, { id: 'q3a4', text: '直接包扎伤口', score: 0 }] },
            { id: 'q4', text: '遇到有人溺水，应该如何救援？', multi: false, options: [{ id: 'q4a1', text: '立即跳入水中救人', score: 0 }, { id: 'q4a2', text: '寻找漂浮物扔给溺水者', score: 2 }, { id: 'q4a3', text: '大声呼喊但不采取行动', score: 0 }, { id: 'q4a4', text: '用手直接拉溺水者上岸', score: 0 }] },
            { id: 'q5', text: '鼻出血时，正确的止血方法是？', multi: false, options: [{ id: 'q5a1', text: '仰头并用纸巾塞住鼻孔', score: 0 }, { id: 'q5a2', text: '低头并用手指按压鼻翼两侧', score: 2 }, { id: 'q5a3', text: '用冷水拍打额头', score: 0 }, { id: 'q5a4', text: '用力擤鼻子', score: 0 }] },
            { id: 'q6', text: '被蜜蜂蜇伤后，应该如何处理？', multi: false, options: [{ id: 'q6a1', text: '用力挤压伤口', score: 0 }, { id: 'q6a2', text: '用肥皂水清洗并用镊子取出蜂针', score: 2 }, { id: 'q6a3', text: '涂抹酒精', score: 0 }, { id: 'q6a4', text: '立即用热水敷', score: 0 }] },
            { id: 'q7', text: '成年人正常的心率范围是多少？', multi: false, options: [{ id: 'q7a1', text: '40-60次/分钟', score: 0 }, { id: 'q7a2', text: '60-100次/分钟', score: 2 }, { id: 'q7a3', text: '100-120次/分钟', score: 0 }, { id: 'q7a4', text: '120-140次/分钟', score: 0 }] },
            { id: 'q8', text: '当发现有人触电时，首先应该怎么做？', multi: false, options: [{ id: 'q8a1', text: '立即用手拉触电者', score: 0 }, { id: 'q8a2', text: '用湿木棍挑开电线', score: 0 }, { id: 'q8a3', text: '立即切断电源', score: 2 }, { id: 'q8a4', text: '拨打110', score: 0 }] },
            { id: 'q9', text: '中暑后应该如何处理？', multi: false, options: [{ id: 'q9a1', text: '立即给患者喝冰水', score: 0 }, { id: 'q9a2', text: '将患者移至阴凉通风处并降温', score: 2 }, { id: 'q9a3', text: '给患者盖上厚被子', score: 0 }, { id: 'q9a4', text: '让患者继续活动', score: 0 }] },
            { id: 'q10', text: '急救电话120是收费的吗？', multi: false, options: [{ id: 'q10a1', text: '完全免费', score: 0 }, { id: 'q10a2', text: '按路程收费', score: 0 }, { id: 'q10a3', text: '收取基本出诊费和急救费用', score: 2 }, { id: 'q10a4', text: '根据病情严重程度收费', score: 0 }] },
            { id: 'q11', text: '骨折固定时，应该固定在什么位置？', multi: false, options: [{ id: 'q11a1', text: '仅固定受伤部位', score: 0 }, { id: 'q11a2', text: '固定受伤部位及上下两个关节', score: 2 }, { id: 'q11a3', text: '固定整个肢体', score: 0 }, { id: 'q11a4', text: '不需要固定', score: 0 }] },
            { id: 'q12', text: '对于意识清醒的 choking（噎住）患者，应该采用什么急救方法？', multi: false, options: [{ id: 'q12a1', text: '海姆立克急救法', score: 2 }, { id: 'q12a2', text: '心肺复苏', score: 0 }, { id: 'q12a3', text: '拍打背部', score: 0 }, { id: 'q12a4', text: '喝水冲下', score: 0 }] },
            { id: 'q13', text: '高血压患者血压突然升高并出现头痛、呕吐等症状时，应该怎么办？', multi: false, options: [{ id: 'q13a1', text: '立即服用双倍降压药', score: 0 }, { id: 'q13a2', text: '让患者安静休息并及时送医', score: 2 }, { id: 'q13a3', text: '让患者多活动', score: 0 }, { id: 'q13a4', text: '用冷水浸泡头部', score: 0 }] },
            { id: 'q14', text: '伤口较深时，除了止血外，还需要注意什么？', multi: false, options: [{ id: 'q14a1', text: '涂抹抗生素软膏', score: 0 }, { id: 'q14a2', text: '及时注射破伤风疫苗', score: 2 }, { id: 'q14a3', text: '用酒精消毒', score: 0 }, { id: 'q14a4', text: '用创可贴包扎', score: 0 }] },
            { id: 'q15', text: '发生地震时，如果在室内，应该躲在哪里？', multi: false, options: [{ id: 'q15a1', text: '窗边', score: 0 }, { id: 'q15a2', text: '门口', score: 0 }, { id: 'q15a3', text: '桌子或椅子下方', score: 2 }, { id: 'q15a4', text: '电梯内', score: 0 }] },
            { id: 'q16', text: '婴儿心肺复苏时，按压深度应为多少？', multi: false, options: [{ id: 'q16a1', text: '约1-2厘米', score: 0 }, { id: 'q16a2', text: '约3-4厘米', score: 0 }, { id: 'q16a3', text: '约4-5厘米', score: 2 }, { id: 'q16a4', text: '约5-6厘米', score: 0 }] },
            { id: 'q17', text: '食物中毒后，应该怎么做？', multi: false, options: [{ id: 'q17a1', text: '立即催吐', score: 0 }, { id: 'q17a2', text: '多喝水并及时就医', score: 2 }, { id: 'q17a3', text: '继续进食其他食物', score: 0 }, { id: 'q17a4', text: '喝酒解毒', score: 0 }] },
            { id: 'q18', text: '灭火器的使用方法是？', multi: false, options: [{ id: 'q18a1', text: '拔销-对准-按压', score: 2 }, { id: 'q18a2', text: '按压-对准-拔销', score: 0 }, { id: 'q18a3', text: '对准-拔销-按压', score: 0 }, { id: 'q18a4', text: '拔销-按压-对准', score: 0 }] },
            { id: 'q19', text: '煤气泄漏时，应该怎么做？', multi: false, options: [{ id: 'q19a1', text: '立即开灯检查', score: 0 }, { id: 'q19a2', text: '打开门窗通风并关闭阀门', score: 2 }, { id: 'q19a3', text: '在室内打电话求助', score: 0 }, { id: 'q19a4', text: '用明火测试泄漏点', score: 0 }] },
            { id: 'q20', text: '头部受伤后出现嗜睡、呕吐等症状，可能是？', multi: false, options: [{ id: 'q20a1', text: '轻微脑震荡', score: 0 }, { id: 'q20a2', text: '严重脑损伤', score: 2 }, { id: 'q20a3', text: '普通头痛', score: 0 }, { id: 'q20a4', text: '感冒症状', score: 0 }] },
            { id: 'q21', text: '冻伤后应该如何处理？', multi: false, options: [{ id: 'q21a1', text: '立即用热水浸泡', score: 0 }, { id: 'q21a2', text: '用温水缓慢复温', score: 2 }, { id: 'q21a3', text: '用力摩擦冻伤部位', score: 0 }, { id: 'q21a4', text: '涂抹油脂类物质', score: 0 }] },
            { id: 'q22', text: '下列哪种情况需要立即进行心肺复苏？', multi: false, options: [{ id: 'q22a1', text: '意识清醒但呼吸困难', score: 0 }, { id: 'q22a2', text: '意识丧失且无呼吸或呼吸异常', score: 2 }, { id: 'q22a3', text: '轻微擦伤', score: 0 }, { id: 'q22a4', text: '普通感冒发烧', score: 0 }] },
            { id: 'q23', text: '火灾发生时，下列哪种做法是错误的？', multi: false, options: [{ id: 'q23a1', text: '用湿毛巾捂住口鼻', score: 0 }, { id: 'q23a2', text: '低姿撤离', score: 0 }, { id: 'q23a3', text: '乘坐电梯', score: 2 }, { id: 'q23a4', text: '沿安全通道撤离', score: 0 }] },
            { id: 'q24', text: '对于烧烫伤，下列哪种处理方法是正确的？', multi: false, options: [{ id: 'q24a1', text: '立即涂抹酱油', score: 0 }, { id: 'q24a2', text: '用清洁的冷水冲洗', score: 2 }, { id: 'q24a3', text: '用牙膏涂抹', score: 0 }, { id: 'q24a4', text: '用酒精消毒', score: 0 }] },
            { id: 'q25', text: '溺水者被救上岸后，应该首先检查什么？', multi: false, options: [{ id: 'q25a1', text: '呼吸和心跳', score: 2 }, { id: 'q25a2', text: '有无外伤', score: 0 }, { id: 'q25a3', text: '体温', score: 0 }, { id: 'q25a4', text: '意识', score: 0 }] },
            { id: 'q26', text: '下列哪种情况可能导致心脏骤停？', multi: false, options: [{ id: 'q26a1', text: '轻微咳嗽', score: 0 }, { id: 'q26a2', text: '严重心律失常', score: 2 }, { id: 'q26a3', text: '普通感冒', score: 0 }, { id: 'q26a4', text: '轻度头痛', score: 0 }] },
            { id: 'q27', text: '使用AED（自动体外除颤器）时，应该按照什么步骤操作？', multi: false, options: [{ id: 'q27a1', text: '开机-贴电极片-分析心律-除颤', score: 2 }, { id: 'q27a2', text: '贴电极片-开机-分析心律-除颤', score: 0 }, { id: 'q27a3', text: '开机-分析心律-贴电极片-除颤', score: 0 }, { id: 'q27a4', text: '分析心律-开机-贴电极片-除颤', score: 0 }] },
            { id: 'q28', text: '儿童发生气道异物梗阻时，应该采用哪种海姆立克急救法？', multi: false, options: [{ id: 'q28a1', text: '腹部冲击法', score: 0 }, { id: 'q28a2', text: '胸部冲击法', score: 2 }, { id: 'q28a3', text: '背部拍击法', score: 0 }, { id: 'q28a4', text: '头部按压法', score: 0 }] },
            { id: 'q29', text: '严重外伤导致大量出血时，应该如何止血？', multi: false, options: [{ id: 'q29a1', text: '用手指直接按压出血点', score: 0 }, { id: 'q29a2', text: '用止血带或布条在伤口上方止血', score: 2 }, { id: 'q29a3', text: '用冷水冲洗伤口', score: 0 }, { id: 'q29a4', text: '涂抹止血药粉', score: 0 }] },
            { id: 'q30', text: '下列哪种物品不能用于止血？', multi: false, options: [{ id: 'q30a1', text: '干净的纱布', score: 0 }, { id: 'q30a2', text: '毛巾', score: 0 }, { id: 'q30a3', text: '卫生纸', score: 2 }, { id: 'q30a4', text: '绷带', score: 0 }] },
            { id: 'q31', text: '遭遇车祸时，如果车辆起火，应该怎么做？', multi: false, options: [{ id: 'q31a1', text: '立即开门逃生', score: 2 }, { id: 'q31a2', text: '留在车内等待救援', score: 0 }, { id: 'q31a3', text: '拨打119后继续等待', score: 0 }, { id: 'q31a4', text: '尝试灭火', score: 0 }] },
            { id: 'q32', text: '下列哪种毒蛇的毒液属于神经毒？', multi: false, options: [{ id: 'q32a1', text: '眼镜蛇', score: 2 }, { id: 'q32a2', text: '五步蛇', score: 0 }, { id: 'q32a3', text: '竹叶青蛇', score: 0 }, { id: 'q32a4', text: '烙铁头蛇', score: 0 }] },
            { id: 'q33', text: '被狗咬伤后，应该如何处理？', multi: false, options: [{ id: 'q33a1', text: '立即用肥皂水冲洗并注射狂犬疫苗', score: 2 }, { id: 'q33a2', text: '用酒精消毒即可', score: 0 }, { id: 'q33a3', text: '不用处理', score: 0 }, { id: 'q33a4', text: '涂抹消炎药膏', score: 0 }] },
            { id: 'q34', text: '下列哪种疾病可能通过蚊子传播？', multi: false, options: [{ id: 'q34a1', text: '艾滋病', score: 0 }, { id: 'q34a2', text: '疟疾', score: 2 }, { id: 'q34a3', text: '乙肝', score: 0 }, { id: 'q34a4', text: '肺结核', score: 0 }] },
            { id: 'q35', text: '突发心脏病时，应该让患者采取什么体位？', multi: false, options: [{ id: 'q35a1', text: '平躺', score: 0 }, { id: 'q35a2', text: '端坐位，双腿下垂', score: 2 }, { id: 'q35a3', text: '俯卧位', score: 0 }, { id: 'q35a4', text: '侧卧位', score: 0 }] },
            { id: 'q36', text: '下列哪种物品可以用于包扎伤口？', multi: false, options: [{ id: 'q36a1', text: '脏毛巾', score: 0 }, { id: 'q36a2', text: '干净的纱布', score: 2 }, { id: 'q36a3', text: '卫生纸', score: 0 }, { id: 'q36a4', text: '报纸', score: 0 }] },
            { id: 'q37', text: '发现有人煤气中毒，应该怎么做？', multi: false, options: [{ id: 'q37a1', text: '立即进入室内救人', score: 0 }, { id: 'q37a2', text: '先打开门窗通风，再进入救人', score: 2 }, { id: 'q37a3', text: '在室内打电话求助', score: 0 }, { id: 'q37a4', text: '用明火测试泄漏点', score: 0 }] },
            { id: 'q38', text: '下列哪种情况属于中暑的严重症状？', multi: false, options: [{ id: 'q38a1', text: '头晕', score: 0 }, { id: 'q38a2', text: '体温超过40℃，意识模糊', score: 2 }, { id: 'q38a3', text: '出汗', score: 0 }, { id: 'q38a4', text: '口渴', score: 0 }] },
            { id: 'q39', text: '进行人工呼吸时，应该如何操作？', multi: false, options: [{ id: 'q39a1', text: '直接口对口吹气', score: 0 }, { id: 'q39a2', text: '捏紧患者鼻翼，口对口吹气', score: 2 }, { id: 'q39a3', text: '口对鼻吹气', score: 0 }, { id: 'q39a4', text: '向患者脸上扇风', score: 0 }] },
            { id: 'q40', text: '下列哪种物品可以作为简易担架？', multi: false, options: [{ id: 'q40a1', text: '木板和绳子', score: 2 }, { id: 'q40a2', text: '枕头', score: 0 }, { id: 'q40a3', text: '被子', score: 0 }, { id: 'q40a4', text: '椅子', score: 0 }] },
            { id: 'q41', text: '糖尿病患者出现低血糖症状（如头晕、出汗）时，应该怎么做？', multi: false, options: [{ id: 'q41a1', text: '立即补充糖分', score: 2 }, { id: 'q41a2', text: '多喝水', score: 0 }, { id: 'q41a3', text: '休息一下即可', score: 0 }, { id: 'q41a4', text: '继续运动', score: 0 }] },
            { id: 'q42', text: '发生地震时，如果在室外，应该怎么做？', multi: false, options: [{ id: 'q42a1', text: '躲在建筑物旁', score: 0 }, { id: 'q42a2', text: '跑到空旷的地方', score: 2 }, { id: 'q42a3', text: '躲在树下', score: 0 }, { id: 'q42a4', text: '躲在电线杆下', score: 0 }] },
            { id: 'q43', text: '下列哪种火灾不能用水扑灭？', multi: false, options: [{ id: 'q43a1', text: '木材火灾', score: 0 }, { id: 'q43a2', text: '油类火灾', score: 2 }, { id: 'q43a3', text: '纸张火灾', score: 0 }, { id: 'q43a4', text: '布料火灾', score: 0 }] },
            { id: 'q44', text: '婴儿发生窒息时，应该如何处理？', multi: false, options: [{ id: 'q44a1', text: '立即进行海姆立克急救法', score: 0 }, { id: 'q44a2', text: '背部拍击和胸部按压', score: 2 }, { id: 'q44a3', text: '人工呼吸', score: 0 }, { id: 'q44a4', text: '心肺复苏', score: 0 }] },
            { id: 'q45', text: '下列哪种急救方法可以用于缓解心绞痛？', multi: false, options: [{ id: 'q45a1', text: '服用硝酸甘油', score: 2 }, { id: 'q45a2', text: '服用阿司匹林', score: 0 }, { id: 'q45a3', text: '多喝水', score: 0 }, { id: 'q45a4', text: '休息一下即可', score: 0 }] },
            { id: 'q46', text: '对于怀疑有脊柱损伤的患者，应该如何搬运？', multi: false, options: [{ id: 'q46a1', text: '一人抱头，一人抱脚', score: 0 }, { id: 'q46a2', text: '多人平托搬运', score: 2 }, { id: 'q46a3', text: '让患者自己行走', score: 0 }, { id: 'q46a4', text: '背患者', score: 0 }] },
            { id: 'q47', text: '下列哪种情况需要立即送医？', multi: false, options: [{ id: 'q47a1', text: '轻微擦伤', score: 0 }, { id: 'q47a2', text: '头部受伤后意识丧失', score: 2 }, { id: 'q47a3', text: '轻度感冒', score: 0 }, { id: 'q47a4', text: '轻微头痛', score: 0 }] },
            { id: 'q48', text: '使用止血带止血时，应该注意什么？', multi: false, options: [{ id: 'q48a1', text: '可以长时间使用', score: 0 }, { id: 'q48a2', text: '每隔30-60分钟放松一次', score: 2 }, { id: 'q48a3', text: '越紧越好', score: 0 }, { id: 'q48a4', text: '不需要记录时间', score: 0 }] },
            { id: 'q49', text: '下列哪种物品可以用于制作临时夹板？', multi: false, options: [{ id: 'q49a1', text: '树枝', score: 2 }, { id: 'q49a2', text: '棉花', score: 0 }, { id: 'q49a3', text: '毛巾', score: 0 }, { id: 'q49a4', text: '布料', score: 0 }] },
            { id: 'q50', text: '急救的基本原则是什么？', multi: false, options: [{ id: 'q50a1', text: '先送医院，再处理', score: 0 }, { id: 'q50a2', text: '先救命，后治伤，先重后轻', score: 2 }, { id: 'q50a3', text: '先处理轻伤，再处理重伤', score: 0 }, { id: 'q50a4', text: '只处理表面伤口', score: 0 }] }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            { minScore: 0, maxScore: 50, title: '急救安全知识入门者', description: '您的急救安全知识较为欠缺，建议系统学习基本的急救技能和安全常识，以便在紧急情况下能够正确应对。', suggestions: ['参加急救培训课程', '阅读急救手册', '观看急救教学视频'] },
            { minScore: 51, maxScore: 75, title: '急救安全知识掌握者', description: '您已经掌握了一定的急救安全知识，但仍有提升空间。建议进一步学习常见急症和意外伤害的处理方法。', suggestions: ['复习重点急救技能', '了解更多常见急症的处理', '参加实践演练'] },
            { minScore: 76, maxScore: 100, title: '急救安全知识达人', description: '您的急救安全知识非常丰富，掌握了全面的急救技能和安全常识，能够在紧急情况下做出正确的判断和处理。', suggestions: ['定期复习和练习急救技能', '向他人普及急救知识', '考虑成为急救志愿者'] }
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