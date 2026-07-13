(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'safety60';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '日常安全常识测验',
        description: '这是一个测试您日常安全知识的测验，包含60个题目，涵盖生活中各种安全场景的应对方法。通过这个测验，您可以了解自己的安全意识水平，提高安全防范能力。',
        category: '闯关学习类',
        questionCount: 60,
        totalScore: 120,
        estimateMinutes: 15,
        cover: testId + '.jpg',
        enableRealTimeScoring: true,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '当你在野外遇到雷雨天气时，下列做法正确的是（   ）',
                multi: false,
                options: [
                    { id: 'q1a1', text: '躲在大树下', score: 0 },
                    { id: 'q1a2', text: '躲在高压线塔下', score: 0 },
                    { id: 'q1a3', text: '双脚并拢，蹲下身子，尽量降低高度', score: 2 }
                ]
            },
            {
                id: 'q2',
                text: '家里的电器着火了，首先应该（   ）',
                multi: false,
                options: [
                    { id: 'q2a1', text: '用水灭火', score: 0 },
                    { id: 'q2a2', text: '用灭火器灭火', score: 0 },
                    { id: 'q2a3', text: '切断电源', score: 2 }
                ]
            },
            {
                id: 'q3',
                text: '乘坐电梯时，如果电梯突然急速下坠，正确的做法是（   ）',
                multi: false,
                options: [
                    { id: 'q3a1', text: '从电梯顶部爬出', score: 0 },
                    { id: 'q3a2', text: '按下每层楼的按钮', score: 2 },
                    { id: 'q3a3', text: '躺在电梯底部', score: 0 }
                ]
            },
            {
                id: 'q4',
                text: '以下哪种食物不能和牛奶一起食用，否则可能会引起不良反应？（   ）',
                multi: false,
                options: [
                    { id: 'q4a1', text: '面包', score: 0 },
                    { id: 'q4a2', text: '巧克力', score: 2 },
                    { id: 'q4a3', text: '苹果', score: 0 }
                ]
            },
            {
                id: 'q5',
                text: '在马路上行走时，应该走在（   ）',
                multi: false,
                options: [
                    { id: 'q5a1', text: '机动车道', score: 0 },
                    { id: 'q5a2', text: '非机动车道', score: 0 },
                    { id: 'q5a3', text: '人行道', score: 2 }
                ]
            },
            {
                id: 'q6',
                text: '地震发生时，在教室里上课的学生应该（   ）',
                multi: false,
                options: [
                    { id: 'q6a1', text: '迅速跑出教室', score: 0 },
                    { id: 'q6a2', text: '躲在课桌下，用书包保护头部', score: 2 },
                    { id: 'q6a3', text: '乘坐电梯下楼', score: 0 }
                ]
            },
            {
                id: 'q7',
                text: '以下哪种行为容易导致触电事故？（   ）',
                multi: false,
                options: [
                    { id: 'q7a1', text: '使用合格的电器', score: 0 },
                    { id: 'q7a2', text: '用湿手插拔插头', score: 2 },
                    { id: 'q7a3', text: '安装漏电保护器', score: 0 }
                ]
            },
            {
                id: 'q8',
                text: '家里的燃气泄漏了，应该立即（   ）',
                multi: false,
                options: [
                    { id: 'q8a1', text: '打开电灯检查', score: 0 },
                    { id: 'q8a2', text: '关闭燃气阀门，开窗通风', score: 2 },
                    { id: 'q8a3', text: '点火查看', score: 0 }
                ]
            },
            {
                id: 'q9',
                text: '乘坐汽车时，为了安全，应该（   ）',
                multi: false,
                options: [
                    { id: 'q9a1', text: '不系安全带', score: 0 },
                    { id: 'q9a2', text: '系好安全带', score: 2 },
                    { id: 'q9a3', text: '在车内玩耍', score: 0 }
                ]
            },
            {
                id: 'q10',
                text: '学校组织郊游，在野外野餐时，下列做法正确的是（   ）',
                multi: false,
                options: [
                    { id: 'q10a1', text: '在树林里生火做饭', score: 0 },
                    { id: 'q10a2', text: '将垃圾随意丢弃', score: 0 },
                    { id: 'q10a3', text: '选择空旷、安全的地方生火，并将垃圾带走', score: 2 }
                ]
            },
            {
                id: 'q11',
                text: '当发现有人溺水时，正确的做法是（   ）',
                multi: false,
                options: [
                    { id: 'q11a1', text: '立即下水营救', score: 0 },
                    { id: 'q11a2', text: '大声呼救，寻找成年人帮忙，同时拨打 110 和 120', score: 2 },
                    { id: 'q11a3', text: '站在岸边观望', score: 0 }
                ]
            },
            {
                id: 'q12',
                text: '以下哪种物品不适合放在阳台边缘，以防掉落伤人？（   ）',
                multi: false,
                options: [
                    { id: 'q12a1', text: '花盆', score: 2 },
                    { id: 'q12a2', text: '晾衣架', score: 0 },
                    { id: 'q12a3', text: '玩具', score: 0 }
                ]
            },
            {
                id: 'q13',
                text: '进行体育锻炼时，为了避免受伤，应该（   ）',
                multi: false,
                options: [
                    { id: 'q13a1', text: '不做热身运动', score: 0 },
                    { id: 'q13a2', text: '按照老师的指导进行规范操作', score: 2 },
                    { id: 'q13a3', text: '随意尝试高难度动作', score: 0 }
                ]
            },
            {
                id: 'q14',
                text: '外出旅游入住酒店时，首先应该做的是（   ）',
                multi: false,
                options: [
                    { id: 'q14a1', text: '躺在床上休息', score: 0 },
                    { id: 'q14a2', text: '了解酒店的安全出口位置', score: 2 },
                    { id: 'q14a3', text: '看电视', score: 0 }
                ]
            },
            {
                id: 'q15',
                text: '以下哪种行为可能会引发火灾？（   ）',
                multi: false,
                options: [
                    { id: 'q15a1', text: '在规定区域内燃放烟花爆竹', score: 0 },
                    { id: 'q15a2', text: '乱扔烟头', score: 2 },
                    { id: 'q15a3', text: '定期检查电器设备', score: 0 }
                ]
            },
            {
                id: 'q16',
                text: '炒菜时，锅里的油起火了，应该（   ）',
                multi: false,
                options: [
                    { id: 'q16a1', text: '用水浇灭', score: 0 },
                    { id: 'q16a2', text: '用锅盖盖住锅', score: 2 },
                    { id: 'q16a3', text: '把锅端离火源', score: 0 }
                ]
            },
            {
                id: 'q17',
                text: '乘坐地铁时，下列行为正确的是（   ）',
                multi: false,
                options: [
                    { id: 'q17a1', text: '倚靠车门', score: 0 },
                    { id: 'q17a2', text: '在车厢内追逐打闹', score: 0 },
                    { id: 'q17a3', text: '遵守地铁乘车规定，站在安全线外候车', score: 2 }
                ]
            },
            {
                id: 'q18',
                text: '儿童在使用剪刀、水果刀等尖锐物品时，应该（   ）',
                multi: false,
                options: [
                    { id: 'q18a1', text: '在家长的陪同下使用', score: 2 },
                    { id: 'q18a2', text: '自己随意使用', score: 0 },
                    { id: 'q18a3', text: '趁家长不注意时使用', score: 0 }
                ]
            },
            {
                id: 'q19',
                text: '雷雨天气，下列哪种行为相对安全？（   ）',
                multi: false,
                options: [
                    { id: 'q19a1', text: '在户外打电话', score: 0 },
                    { id: 'q19a2', text: '在室内看电视', score: 2 },
                    { id: 'q19a3', text: '骑自行车', score: 0 }
                ]
            },
            {
                id: 'q20',
                text: '当发生拥挤踩踏事故时，应该（   ）',
                multi: false,
                options: [
                    { id: 'q20a1', text: '逆着人群方向奔跑', score: 0 },
                    { id: 'q20a2', text: '双手抱头，身体蜷缩成球状，靠在墙角', score: 2 },
                    { id: 'q20a3', text: '站立不动', score: 0 }
                ]
            },
            {
                id: 'q21',
                text: '以下哪种电器使用后不需要及时拔掉插头，以节约用电并避免安全隐患？（   ）',
                multi: false,
                options: [
                    { id: 'q21a1', text: '手机充电器', score: 0 },
                    { id: 'q21a2', text: '电视机', score: 0 },
                    { id: 'q21a3', text: '电冰箱', score: 2 }
                ]
            },
            {
                id: 'q22',
                text: '野外露营时，选择营地的位置应该（   ）',
                multi: false,
                options: [
                    { id: 'q22a1', text: '靠近河流', score: 0 },
                    { id: 'q22a2', text: '在大树下', score: 0 },
                    { id: 'q22a3', text: '远离悬崖、河边等危险区域', score: 2 }
                ]
            },
            {
                id: 'q23',
                text: '过马路时，应该（   ）',
                multi: false,
                options: [
                    { id: 'q23a1', text: '直接跑过去', score: 0 },
                    { id: 'q23a2', text: '走人行横道，按照交通信号灯指示通行', score: 2 },
                    { id: 'q23a3', text: '看没有车就快速通过', score: 0 }
                ]
            },
            {
                id: 'q24',
                text: '学校进行消防演练时，同学们应该（   ）',
                multi: false,
                options: [
                    { id: 'q24a1', text: '嬉笑打闹', score: 0 },
                    { id: 'q24a2', text: '认真对待，按照老师的指挥有序疏散', score: 2 },
                    { id: 'q24a3', text: '故意拖延时间', score: 0 }
                ]
            },
            {
                id: 'q25',
                text: '以下哪种气体泄漏可能会导致中毒？（   ）',
                multi: false,
                options: [
                    { id: 'q25a1', text: '氧气', score: 0 },
                    { id: 'q25a2', text: '氮气', score: 0 },
                    { id: 'q25a3', text: '一氧化碳', score: 2 }
                ]
            },
            {
                id: 'q26',
                text: '骑自行车时，下列做法正确的是（   ）',
                multi: false,
                options: [
                    { id: 'q26a1', text: '双手离把', score: 0 },
                    { id: 'q26a2', text: '骑车带人', score: 0 },
                    { id: 'q26a3', text: '在非机动车道上靠右行驶', score: 2 }
                ]
            },
            {
                id: 'q27',
                text: '乘坐飞机时，下列物品不可以随身携带上飞机的是（   ）',
                multi: false,
                options: [
                    { id: 'q27a1', text: '手机', score: 0 },
                    { id: 'q27a2', text: '充电宝', score: 0 },
                    { id: 'q27a3', text: '打火机', score: 2 }
                ]
            },
            {
                id: 'q28',
                text: '家里的插座老化了，应该（   ）',
                multi: false,
                options: [
                    { id: 'q28a1', text: '继续使用', score: 0 },
                    { id: 'q28a2', text: '用绝缘胶带缠一下', score: 0 },
                    { id: 'q28a3', text: '及时更换', score: 2 }
                ]
            },
            {
                id: 'q29',
                text: '以下哪种行为有助于预防食物中毒？（   ）',
                multi: false,
                options: [
                    { id: 'q29a1', text: '食用过期食品', score: 0 },
                    { id: 'q29a2', text: '购买三无食品', score: 0 },
                    { id: 'q29a3', text: '清洗蔬菜水果后再食用', score: 2 }
                ]
            },
            {
                id: 'q30',
                text: '地震发生后，如果被埋压，应该（   ）',
                multi: false,
                options: [
                    { id: 'q30a1', text: '大声呼救，直到有人来救', score: 0 },
                    { id: 'q30a2', text: '保持体力，有节奏地敲击物体发出求救信号', score: 2 },
                    { id: 'q30a3', text: '拼命挣扎', score: 0 }
                ]
            },
            {
                id: 'q31',
                text: '在商场里，遇到火灾时，应该（   ）',
                multi: false,
                options: [
                    { id: 'q31a1', text: '乘坐电梯逃生', score: 0 },
                    { id: 'q31a2', text: '寻找安全出口，用湿毛巾捂住口鼻，低姿前行', score: 2 },
                    { id: 'q31a3', text: '躲在角落里', score: 0 }
                ]
            },
            {
                id: 'q32',
                text: '以下哪种行为可能会损坏眼睛？（   ）',
                multi: false,
                options: [
                    { id: 'q32a1', text: '长时间看电视、玩电脑', score: 2 },
                    { id: 'q32a2', text: '定期做眼保健操', score: 0 },
                    { id: 'q32a3', text: '在光线充足的地方看书', score: 0 }
                ]
            },
            {
                id: 'q33',
                text: '乘坐公交车时，上车后应该（   ）',
                multi: false,
                options: [
                    { id: 'q33a1', text: '抢占座位', score: 0 },
                    { id: 'q33a2', text: '站稳扶好', score: 2 },
                    { id: 'q33a3', text: '在车厢内奔跑', score: 0 }
                ]
            },
            {
                id: 'q34',
                text: '进行游泳活动时，必须在（   ）',
                multi: false,
                options: [
                    { id: 'q34a1', text: '有大人陪同的安全水域', score: 2 },
                    { id: 'q34a2', text: '水库', score: 0 },
                    { id: 'q34a3', text: '河流', score: 0 }
                ]
            },
            {
                id: 'q35',
                text: '以下哪种行为可能会引发触电危险？（   ）',
                multi: false,
                options: [
                    { id: 'q35a1', text: '发现有人触电，立即切断电源', score: 0 },
                    { id: 'q35a2', text: '在电线上晾晒衣物', score: 2 },
                    { id: 'q35a3', text: '不使用破损的电器', score: 0 }
                ]
            },
            {
                id: 'q36',
                text: '遇到陌生人给的食物，应该（   ）',
                multi: false,
                options: [
                    { id: 'q36a1', text: '直接吃掉', score: 0 },
                    { id: 'q36a2', text: '婉言拒绝', score: 2 },
                    { id: 'q36a3', text: '先尝一口再决定', score: 0 }
                ]
            },
            {
                id: 'q37',
                text: '家里的窗户没有安装防护栏，为了防止小孩发生意外，应该（   ）',
                multi: false,
                options: [
                    { id: 'q37a1', text: '让小孩独自在窗边玩耍', score: 0 },
                    { id: 'q37a2', text: '时刻关注小孩，避免其靠近窗户', score: 2 },
                    { id: 'q37a3', text: '无所谓', score: 0 }
                ]
            },
            {
                id: 'q38',
                text: '火灾发生时，烟雾较大，应该（   ）',
                multi: false,
                options: [
                    { id: 'q38a1', text: '直立行走', score: 0 },
                    { id: 'q38a2', text: '弯腰低姿前行', score: 2 },
                    { id: 'q38a3', text: '快速奔跑', score: 0 }
                ]
            },
            {
                id: 'q39',
                text: '以下哪种交通工具在行驶过程中需要佩戴头盔？（   ）',
                multi: false,
                options: [
                    { id: 'q39a1', text: '自行车', score: 0 },
                    { id: 'q39a2', text: '电动车', score: 2 },
                    { id: 'q39a3', text: '汽车', score: 0 }
                ]
            },
            {
                id: 'q40',
                text: '进行实验课操作时，应该（   ）',
                multi: false,
                options: [
                    { id: 'q40a1', text: '按照老师的指导进行操作', score: 2 },
                    { id: 'q40a2', text: '随意摆弄实验器材', score: 0 },
                    { id: 'q40a3', text: '不做实验，在旁边观看', score: 0 }
                ]
            },
            {
                id: 'q41',
                text: '外出游玩时，丢失了重要物品，应该（   ）',
                multi: false,
                options: [
                    { id: 'q41a1', text: '自己寻找，不告诉别人', score: 0 },
                    { id: 'q41a2', text: '向周围的人求助，必要时报警', score: 2 },
                    { id: 'q41a3', text: '直接回家', score: 0 }
                ]
            },
            {
                id: 'q42',
                text: '以下哪种行为可能会导致烫伤？（   ）',
                multi: false,
                options: [
                    { id: 'q42a1', text: '小心使用热水壶', score: 0 },
                    { id: 'q42a2', text: '触摸正在加热的电熨斗', score: 2 },
                    { id: 'q42a3', text: '用冷水洗手', score: 0 }
                ]
            },
            {
                id: 'q43',
                text: '乘坐火车时，下列物品可以携带上车的是（   ）',
                multi: false,
                options: [
                    { id: 'q43a1', text: '管制刀具', score: 0 },
                    { id: 'q43a2', text: '指甲油（不超过 20 毫升）', score: 2 },
                    { id: 'q43a3', text: '鞭炮', score: 0 }
                ]
            },
            {
                id: 'q44',
                text: '学校的楼梯上，为了避免发生踩踏事故，应该（   ）',
                multi: false,
                options: [
                    { id: 'q44a1', text: '上下楼梯时推挤他人', score: 0 },
                    { id: 'q44a2', text: '靠右行走，不奔跑、不打闹', score: 2 },
                    { id: 'q44a3', text: '多人并排行走', score: 0 }
                ]
            },
            {
                id: 'q45',
                text: '当发现家里的水管漏水时，应该首先（   ）',
                multi: false,
                options: [
                    { id: 'q45a1', text: '自己修理', score: 0 },
                    { id: 'q45a2', text: '关闭总水阀', score: 2 },
                    { id: 'q45a3', text: '打电话给物业', score: 0 }
                ]
            },
            {
                id: 'q46',
                text: '以下哪种行为有助于预防感冒等疾病传播？（   ）',
                multi: false,
                options: [
                    { id: 'q46a1', text: '随地吐痰', score: 0 },
                    { id: 'q46a2', text: '咳嗽或打喷嚏时用纸巾捂住口鼻', score: 2 },
                    { id: 'q46a3', text: '与患者密切接触', score: 0 }
                ]
            },
            {
                id: 'q47',
                text: '进行户外运动时，为了防止晒伤，应该（   ）',
                multi: false,
                options: [
                    { id: 'q47a1', text: '不做任何防护', score: 0 },
                    { id: 'q47a2', text: '涂抹防晒霜，佩戴遮阳帽等', score: 2 },
                    { id: 'q47a3', text: '长时间在阳光下暴晒', score: 0 }
                ]
            },
            {
                id: 'q48',
                text: '乘坐出租车时，下车时应该（   ）',
                multi: false,
                options: [
                    { id: 'q48a1', text: '直接开门下车', score: 0 },
                    { id: 'q48a2', text: '观察后方有无车辆行人，确认安全后开门下车', score: 2 },
                    { id: 'q48a3', text: '快速开门下车', score: 0 }
                ]
            },
            {
                id: 'q49',
                text: '以下哪种行为可能会导致滑倒受伤？（   ）',
                multi: false,
                options: [
                    { id: 'q49a1', text: '在干燥的地面行走', score: 0 },
                    { id: 'q49a2', text: '在有水渍的地面上奔跑', score: 2 },
                    { id: 'q49a3', text: '穿着合适的鞋子', score: 0 }
                ]
            },
            {
                id: 'q50',
                text: '家里使用的电蚊香，应该放在（   ）',
                multi: false,
                options: [
                    { id: 'q50a1', text: '易燃物旁边', score: 0 },
                    { id: 'q50a2', text: '远离易燃物的地方', score: 2 },
                    { id: 'q50a3', text: '随意放置', score: 0 }
                ]
            },
            {
                id: 'q51',
                text: '进行高处作业时，必须（   ）',
                multi: false,
                options: [
                    { id: 'q51a1', text: '系好安全带', score: 2 },
                    { id: 'q51a2', text: '不采取任何防护措施', score: 0 },
                    { id: 'q51a3', text: '独自进行作业', score: 0 }
                ]
            },
            {
                id: 'q52',
                text: '以下哪种行为可能会引发山体滑坡等地质灾害？（   ）',
                multi: false,
                options: [
                    { id: 'q52a1', text: '保护森林植被', score: 0 },
                    { id: 'q52a2', text: '随意在山坡上开挖', score: 2 },
                    { id: 'q52a3', text: '不在危险区域停留', score: 0 }
                ]
            },
            {
                id: 'q53',
                text: '乘坐电梯时，发现电梯内有异常气味或冒烟，应该（   ）',
                multi: false,
                options: [
                    { id: 'q53a1', text: '继续乘坐', score: 0 },
                    { id: 'q53a2', text: '立即按下紧急通话按钮，向物业或相关人员报告', score: 2 },
                    { id: 'q53a3', text: '强行打开电梯门', score: 0 }
                ]
            },
            {
                id: 'q54',
                text: '以下哪种食物不能生吃？（   ）',
                multi: false,
                options: [
                    { id: 'q54a1', text: '黄瓜', score: 0 },
                    { id: 'q54a2', text: '西红柿', score: 0 },
                    { id: 'q54a3', text: '四季豆', score: 2 }
                ]
            },
            {
                id: 'q55',
                text: '在学校课间休息时，下列行为正确的是（   ）',
                multi: false,
                options: [
                    { id: 'q55a1', text: '在教室里追逐打闹', score: 0 },
                    { id: 'q55a2', text: '进行安静的活动，如阅读', score: 2 },
                    { id: 'q55a3', text: '攀爬窗户', score: 0 }
                ]
            },
            {
                id: 'q56',
                text: '当遇到宠物狗突然攻击时，应该（   ）',
                multi: false,
                options: [
                    { id: 'q56a1', text: '大声喊叫并逃跑', score: 0 },
                    { id: 'q56a2', text: '保持静止，不要激怒它，慢慢后退', score: 2 },
                    { id: 'q56a3', text: '用手去驱赶', score: 0 }
                ]
            },
            {
                id: 'q57',
                text: '以下哪种行为可能会导致触电身亡？（   ）',
                multi: false,
                options: [
                    { id: 'q57a1', text: '发现电器冒烟，立即切断电源', score: 0 },
                    { id: 'q57a2', text: '用手直接触摸裸露的电线', score: 2 },
                    { id: 'q57a3', text: '不私自拆卸电器', score: 0 }
                ]
            },
            {
                id: 'q58',
                text: '家里的电器长时间不使用，应该（   ）',
                multi: false,
                options: [
                    { id: 'q58a1', text: '一直插着电源', score: 0 },
                    { id: 'q58a2', text: '拔掉插头', score: 2 },
                    { id: 'q58a3', text: '无所谓', score: 0 }
                ]
            },
            {
                id: 'q59',
                text: '进行滑雪等冬季运动时，为了安全，应该（   ）',
                multi: false,
                options: [
                    { id: 'q59a1', text: '不了解场地情况就直接滑雪', score: 0 },
                    { id: 'q59a2', text: '佩戴好合适的防护装备', score: 2 },
                    { id: 'q59a3', text: '独自前往偏远区域', score: 0 }
                ]
            },
            {
                id: 'q60',
                text: '以下哪种行为可能会引起火灾在森林中蔓延？（   ）',
                multi: false,
                options: [
                    { id: 'q60a1', text: '不携带火种进入森林', score: 0 },
                    { id: 'q60a2', text: '在森林中野炊后，彻底熄灭明火', score: 0 },
                    { id: 'q60a3', text: '随意丢弃未熄灭的烟头', score: 2 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 60,
                title: '安全意识有待提高',
                description: '您的安全知识掌握程度相对较低，在日常生活中可能存在一些安全隐患。建议您加强安全知识的学习，提高自我保护意识和应对突发情况的能力。',
                suggestions: ['系统学习日常生活安全知识', '关注身边的安全隐患并及时处理', '参加安全培训和应急演练']
            },
            {
                minScore: 61,
                maxScore: 90,
                title: '安全意识良好',
                description: '您已经掌握了一定的安全知识，能够应对日常生活中的大部分安全问题。但仍有一些安全细节需要注意和加强。',
                suggestions: ['定期复习和更新安全知识', '关注最新的安全提示和防范措施', '向家人和朋友普及安全知识']
            },
            {
                minScore: 91,
                maxScore: 120,
                title: '安全专家',
                description: '恭喜您！您具有非常高的安全意识和丰富的安全知识，能够有效地应对各种安全挑战，保护自己和他人的生命财产安全。',
                suggestions: ['成为安全知识的传播者', '协助他人解决安全问题', '关注专业安全领域的最新发展']
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