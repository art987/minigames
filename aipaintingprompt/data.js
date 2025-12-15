// AI绘图指令生成工具数据
const aiPaintingData = {
    categories: [
        
        {
            id: 'sex',
            name: '性别',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'character-1', name: '女性' },
                { id: 'character-2', name: '男性' },
                { id: 'character-3', name: '女孩' },
                { id: 'character-4', name: '男孩' },
                { id: 'character-5', name: '正太' },
                { id: 'character-6', name: '萝莉' },
                { id: 'character-7', name: '美少女' },
                { id: 'character-8', name: '美少男' },
                { id: 'character-9', name: '辣妹' },
                { id: 'character-10', name: '大小姐' },
                { id: 'character-11', name: 'Q版人物' },
                { id: 'character-12', name: '胖子' },
                { id: 'character-13', name: '伪娘' },
                { id: 'character-31', name: '公主' },
                { id: 'character-32', name: '王子' },
                { id: 'character-33', name: '新娘' },
                { id: 'character-34', name: '新郎' }
            ]
        },
        {
            id: 'character',
            name: '属性',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'character-14', name: '天使' },
                { id: 'character-15', name: '魔鬼' },
                { id: 'character-16', name: '迷你个头' },
                { id: 'character-17', name: '非人' },
                { id: 'character-18', name: '小鬼' },
                { id: 'character-19', name: '怪物' },
                { id: 'character-20', name: '老人' },
                { id: 'character-21', name: '富豪' },
                { id: 'character-22', name: '乞丐' },
                { id: 'character-23', name: '巨人' },
                { id: 'character-24', name: '侏儒' },
                { id: 'character-25', name: '小丑' },
                { id: 'character-26', name: '奴隶' },
                { id: 'character-27', name: '雪族' },
                { id: 'character-28', name: '酋长' },
                { id: 'character-29', name: '王' },
                { id: 'character-30', name: '神' },
                { id: 'character-35', name: '肌肉长相' },
                { id: 'character-36', name: '偶像长相' },
                { id: 'character-38', name: '怪物长相' },
                { id: 'character-39', name: '狐狸长相' },
                { id: 'character-40', name: '狼长相' },
                { id: 'character-41', name: '猫长相' },
                { id: 'character-42', name: '木偶' },
                { id: 'character-43', name: '黏土手办' }
            ]
        },
        // Layer-2 头面底板
        {
            id: 'hair-length',
            name: '头发长度',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'hair-length-1', name: '短发' },
                { id: 'hair-length-2', name: '中发' },
                { id: 'hair-length-3', name: '长发' },
                { id: 'hair-length-4', name: '头发过肩' }
            ]
        },
        {
            id: 'hair-common',
            name: '发型常用',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'hair-common-1', name: '辫子' },
                { id: 'hair-common-2', name: '擦到耳后' }
            ]
        },
        {
            id: 'hair-style',
            name: '发型',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'hair-style-1', name: '短马尾' },
                { id: 'hair-style-2', name: '侧马尾辫' },
                { id: 'hair-style-3', name: '前马尾辫' },
                { id: 'hair-style-4', name: '分裂马尾辫' },
                { id: 'hair-style-5', name: '低马尾辫' },
                { id: 'hair-style-7', name: '侧边辫子' },
                { id: 'hair-style-8', name: '双辫子' },
                { id: 'hair-style-9', name: '马尾辫' },
                { id: 'hair-style-10', name: '编织马尾' },
                { id: 'hair-style-11', name: '法式辫' },
                { id: 'hair-style-12', name: '麻花辫' },
                { id: 'hair-style-13', name: '高马尾' },
                { id: 'hair-style-14', name: '扎头发' },
                { id: 'hair-style-15', name: '单侧发置' },
                { id: 'hair-style-16', name: '卷发' },
                { id: 'hair-style-17', name: '直发' },
                { id: 'hair-style-18', name: '波浪头' },
                { id: 'hair-style-19', name: '波波头' },
                { id: 'hair-style-20', name: '侧分' },
                { id: 'hair-style-21', name: '雷鬼头' },
                { id: 'hair-style-22', name: '蓬巴杜发型' },
                { id: 'hair-style-23', name: '莫西干头' },
                { id: 'hair-style-24', name: '锅盖头' },
                { id: 'hair-style-25', name: '呆毛' },
                { id: 'hair-style-26', name: '天线呆毛' },
                { id: 'hair-style-27', name: '心形呆毛' },
                { id: 'hair-style-28', name: '公主卷' },
                { id: 'hair-style-29', name: '翼状发' },
                { id: 'hair-style-30', name: '蓬发' },
                { id: 'hair-style-31', name: '凌乱发' },
                { id: 'hair-style-32', name: '露颈盘发' },
                { id: 'hair-style-33', name: '编织发髻' },
                { id: 'hair-style-34', name: '公主切' },
                { id: 'hair-style-35', name: '妹妹切' },
                { id: 'hair-style-36', name: '刺猬头' },
                { id: 'hair-style-37', name: '盘发' },
                { id: 'hair-style-38', name: '精灵短发' },
                { id: 'hair-style-39', name: '长发络' },
                { id: 'hair-style-40', name: '爆炸头' },
                { id: 'hair-style-41', name: '秃头' },
                { id: 'hair-style-42', name: '双丸子头' },
                { id: 'hair-style-43', name: '美式寸头' },
                { id: 'hair-style-44', name: '大体积蓬松头发' },
                { id: 'hair-style-45', name: '闪亮的头发' },
                { id: 'hair-style-46', name: '发光的头发' },
                { id: 'hair-style-47', name: '眼睛间的头发' }
            ]
        },
        {
            id: 'hair-color',
            name: '发色',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'hair-color-1', name: '白发' },
                { id: 'hair-color-2', name: '金发' },
                { id: 'hair-color-3', name: '银发' },
                { id: 'hair-color-4', name: '灰发' },
                { id: 'hair-color-5', name: '棕发' },
                { id: 'hair-color-6', name: '黑发' },
                { id: 'hair-color-7', name: '紫发' },
                { id: 'hair-color-8', name: '红发' },
                { id: 'hair-color-9', name: '蓝发' },
                { id: 'hair-color-10', name: '绿发' },
                { id: 'hair-color-11', name: '粉发' },
                { id: 'hair-color-12', name: '橙发' },
                { id: 'hair-color-13', name: '挑染' },
                { id: 'hair-color-14', name: '彩发' },
                { id: 'hair-color-15', name: '彩虹发' }
            ]
        },
        {
            id: 'bangs',
            name: '刘海',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'bangs-1', name: '刘海' },
                { id: 'bangs-2', name: '交叉刘海' },
                { id: 'bangs-3', name: '眉间刘海' },
                { id: 'bangs-4', name: '齐刘海' },
                { id: 'bangs-5', name: '斜刘海' },
                { id: 'bangs-6', name: '不对称刘海' },
                { id: 'bangs-7', name: '编织刘海' }
            ]
        },
        {
            id: 'ears',
            name: '耳朵',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'ears-1', name: '动物耳朵' },
                { id: 'ears-2', name: '猫耳朵' },
                { id: 'ears-3', name: '狗耳朵' },
                { id: 'ears-4', name: '狐狸耳朵' },
                { id: 'ears-5', name: '兔子耳朵' },
                { id: 'ears-6', name: '熊耳朵' }
            ]
        },
        {
            id: 'eyes',
            name: '眼睛',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'eyes-1', name: '空洞眼睛' },
                { id: 'eyes-2', name: '静大眼睛' },
                { id: 'eyes-3', name: '闭上一只眼' },
                { id: 'eyes-4', name: '半闭眼睛' },
                { id: 'eyes-5', name: '渐变眼' },
                { id: 'eyes-6', name: '水汪汪大眼' },
                { id: 'eyes-7', name: '翻白眼' },
                { id: 'eyes-8', name: '斗鸡眼' },
                { id: 'eyes-9', name: '猫眼' },
                { id: 'eyes-10', name: '布满血丝的眼睛' },
                { id: 'eyes-11', name: '发光眼睛' },
                { id: 'eyes-12', name: '吊眼角' },
                { id: 'eyes-13', name: '垂眼角' },
                { id: 'eyes-14', name: '恶魔眼' },
                { id: 'eyes-15', name: '收缩的瞳孔' },
                { id: 'eyes-16', name: '魔瞳' },
                { id: 'eyes-17', name: '蛇瞳' },
                { id: 'eyes-18', name: '闪闪发光瞳' },
                { id: 'eyes-19', name: '花形瞳' },
                { id: 'eyes-20', name: '爱心瞳' },
                { id: 'eyes-21', name: '异色瞳' },
                { id: 'eyes-22', name: '美瞳' },
                { id: 'eyes-23', name: '长睫毛' },
                { id: 'eyes-24', name: '彩色睫毛' },
                { id: 'eyes-25', name: '眼下痣' }
            ]
        },
        {
            id: 'mouth',
            name: '嘴巴',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'mouth-1', name: '栗子嘴' },
                { id: 'mouth-2', name: '厚嘴唇' },
                { id: 'mouth-3', name: '嘴唇浮肿' },
                { id: 'mouth-4', name: '口红' },
                { id: 'mouth-5', name: '心形嘴' },
                { id: 'mouth-6', name: '嘟嘴' },
                { id: 'mouth-7', name: '张嘴' },
                { id: 'mouth-8', name: '闭嘴' },
                { id: 'mouth-9', name: '猫咪嘴' },
                { id: 'mouth-10', name: '鲨鱼嘴' },
                { id: 'mouth-11', name: '吐舌头' },
                { id: 'mouth-12', name: '分开嘴唇' },
                { id: 'mouth-13', name: '嘴下痣' }
            ]
        },
        {
            id: 'beard-teeth',
            name: '胡子&牙',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'beard-teeth-1', name: '胡须' },
                { id: 'beard-teeth-2', name: '小胡子' },
                { id: 'beard-teeth-3', name: '山羊胡' },
                { id: 'beard-teeth-4', name: '长费角' },
                { id: 'beard-teeth-5', name: '尖牙' },
                { id: 'beard-teeth-6', name: '虎牙' },
                { id: 'beard-teeth-7', name: '咬紧牙关' }
            ]
        },
        {
            id: 'smile',
            name: '笑容',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'smile-1', name: '微笑' },
                { id: 'smile-2', name: '假笑' },
                { id: 'smile-3', name: '挑逗笑容' },
                { id: 'smile-4', name: '疯狂笑容' },
                { id: 'smile-5', name: '邪恶笑容' },
                { id: 'smile-6', name: '单侧嘴角上扬' },
                { id: 'smile-7', name: '诱人笑容' },
                { id: 'smile-8', name: '露齿笑' },
                { id: 'smile-9', name: '大笑' },
                { id: 'smile-10', name: '杯型笑脸' }
            ]
        },
        {
            id: 'expression',
            name: '表情',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'expression-1', name: '无表情' },
                { id: 'expression-2', name: '脸色苍白' },
                { id: 'expression-3', name: '2D脸红' },
                { id: 'expression-4', name: '脸红' },
                { id: 'expression-5', name: '两眼发直' },
                { id: 'expression-6', name: '青筋凸起' },
                { id: 'expression-7', name: '尴尬' },
                { id: 'expression-8', name: '傲慢' },
                { id: 'expression-9', name: '郁闷' },
                { id: 'expression-10', name: '畏缩' },
                { id: 'expression-11', name: '烦恼' },
                { id: 'expression-12', name: '阴暗脸' },
                { id: 'expression-13', name: '疼痛' },
                { id: 'expression-14', name: '尖叫' },
                { id: 'expression-15', name: '叹息' },
                { id: 'expression-16', name: '紧张' },
                { id: 'expression-17', name: '困惑' },
                { id: 'expression-18', name: '害怕' },
                { id: 'expression-19', name: '喝醉' },
                { id: 'expression-20', name: '哭' },
                { id: 'expression-21', name: '悲伤' },
                { id: 'expression-22', name: '生气' },
                { id: 'expression-23', name: '害羞' },
                { id: 'expression-24', name: '严肃' },
                { id: 'expression-25', name: '鄙视' },
                { id: 'expression-26', name: '疯狂' },
                { id: 'expression-27', name: '黑化' },
                { id: 'expression-28', name: '得意' },
                { id: 'expression-29', name: '思考中' },
                { id: 'expression-30', name: '扬眉' },
                { id: 'expression-31', name: '轻皱眉' },
                { id: 'expression-32', name: '皱眉' },
                { id: 'expression-33', name: '调皮脸' },
                { id: 'expression-34', name: '做鬼脸' },
                { id: 'expression-35', name: '流鼻血' },
                { id: 'expression-36', name: '困' },
                { id: 'expression-37', name: '咪眼' },
                { id: 'expression-38', name: '流口水' }
            ]
        },
        {
            id: 'pose-full',
            name: '姿势（全身大动作）',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'pose-full-1', name: '站' },
                { id: 'pose-full-2', name: '走' },
                { id: 'pose-full-3', name: '跑' },
                { id: 'pose-full-4', name: '跳' },
                { id: 'pose-full-5', name: '飞' },
                { id: 'pose-full-6', name: '靠墙' },
                { id: 'pose-full-7', name: '躺' },
                { id: 'pose-full-8', name: '从背后抱' },
                { id: 'pose-full-9', name: '遛狗' },
                { id: 'pose-full-10', name: '提裙' },
                { id: 'pose-full-11', name: '泡温泉' },
                { id: 'pose-full-12', name: '骑马' },
                { id: 'pose-full-13', name: '自拍' },
                { id: 'pose-full-14', name: '一字马' },
                { id: 'pose-full-15', name: '敬礼' },
                { id: 'pose-full-16', name: '祈祷' },
                { id: 'pose-full-17', name: '冥想' },
                { id: 'pose-full-18', name: '嗅闻' },
                { id: 'pose-full-19', name: '公主抱' },
                { id: 'pose-full-20', name: '拥抱' },
                { id: 'pose-full-21', name: '背对背' },
                { id: 'pose-full-22', name: '耶' },
                { id: 'pose-full-23', name: '调整过膝袜' },
                { id: 'pose-full-24', name: '抓住' },
                { id: 'pose-full-25', name: '战斗姿态' },
                { id: 'pose-full-26', name: '跨坐' }
            ]
        },
        {
            id: 'pose-detail',
            name: '姿态（坐跪躺等细节）',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'pose-detail-1', name: '侧身坐' },
                { id: 'pose-detail-2', name: '鸭子坐' },
                { id: 'pose-detail-3', name: '盘腿' },
                { id: 'pose-detail-4', name: '跪着' },
                { id: 'pose-detail-5', name: '膝枕' },
                { id: 'pose-detail-6', name: '学猫叫' },
                { id: 'pose-detail-7', name: '单膝跪地' },
                { id: 'pose-detail-8', name: '蜷起身子侧躺' },
                { id: 'pose-detail-9', name: '仰卧' },
                { id: 'pose-detail-10', name: '俯卧' },
                { id: 'pose-detail-11', name: '坐着' },
                { id: 'pose-detail-12', name: '屈膝抱腿坐' },
                { id: 'pose-detail-13', name: '立式跨骑' },
                { id: 'pose-detail-14', name: '跨着' },
                { id: 'pose-detail-15', name: '绑在十字架上' },
                { id: 'pose-detail-16', name: '双腿缠绕' },
                { id: 'pose-detail-17', name: '四肢着地' },
                { id: 'pose-detail-18', name: '鬼姿势' },
                { id: 'pose-detail-19', name: '回头' },
                { id: 'pose-detail-20', name: '歪头' },
                { id: 'pose-detail-21', name: '前倾' }
            ]
        },
        // Layer-3 服装大壳
        {
            id: 'clothing-main',
            name: '服装（一体式主装）',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'clothing-main-1', name: '水手服' },
                { id: 'clothing-main-2', name: '学生服' },
                { id: 'clothing-main-3', name: '职场制服' },
                { id: 'clothing-main-4', name: '西装' },
                { id: 'clothing-main-5', name: '军装' },
                { id: 'clothing-main-6', name: '礼服' },
                { id: 'clothing-main-7', name: '汉服' },
                { id: 'clothing-main-8', name: '旗袍' },
                { id: 'clothing-main-9', name: '和服' },
                { id: 'clothing-main-10', name: '运动服' },
                { id: 'clothing-main-11', name: '工装服' },
                { id: 'clothing-main-12', name: '婚纱' },
                { id: 'clothing-main-13', name: '银色连衣裙' },
                { id: 'clothing-main-14', name: '长袍' },
                { id: 'clothing-main-15', name: '围裙' },
                { id: 'clothing-main-16', name: '快餐制服' },
                { id: 'clothing-main-17', name: 'JK制服' },
                { id: 'clothing-main-18', name: '健身服' },
                { id: 'clothing-main-19', name: '巫女服' },
                { id: 'clothing-main-20', name: '海军陆战队服' },
                { id: 'clothing-main-21', name: '无袖连衣裙' },
                { id: 'clothing-main-22', name: '雨衣' },
                { id: 'clothing-main-23', name: '机甲衣' }
            ]
        },
        {
            id: 'clothing-top',
            name: '上装（分体）',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'clothing-top-1', name: '过手袖' },
                { id: 'clothing-top-2', name: '背心' },
                { id: 'clothing-top-3', name: '白衬衫' },
                { id: 'clothing-top-4', name: '水手衬衫' },
                { id: 'clothing-top-5', name: 'T恤' },
                { id: 'clothing-top-6', name: '毛衣' },
                { id: 'clothing-top-7', name: '夏日长裙' },
                { id: 'clothing-top-8', name: '连帽衫' },
                { id: 'clothing-top-9', name: '毛领' },
                { id: 'clothing-top-10', name: '兜帽斗篷' },
                { id: 'clothing-top-11', name: '夹克' },
                { id: 'clothing-top-12', name: '皮夹克' },
                { id: 'clothing-top-13', name: '探险家夹克' },
                { id: 'clothing-top-14', name: '兜帽' },
                { id: 'clothing-top-15', name: '牛仔夹克' },
                { id: 'clothing-top-16', name: '高领夹克' },
                { id: 'clothing-top-17', name: '消防员夹克' },
                { id: 'clothing-top-18', name: '透明夹克' }
            ]
        },
        {
            id: 'clothing-bottom',
            name: '下装（分体）',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'clothing-bottom-4', name: 'JK制服裙' },
                { id: 'clothing-bottom-5', name: '短裤' },
                { id: 'clothing-bottom-6', name: '长裤' },
                { id: 'clothing-bottom-7', name: '裙子' },
                { id: 'clothing-bottom-8', name: '牛仔裤' },
                { id: 'clothing-bottom-9', name: '百褶裙' }
            ]
        },

        {
            id: 'clothing-professional',
            name: '职业制服',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'clothing-professional-1', name: '救生员' },
                { id: 'clothing-professional-2', name: '拳击手' },
                { id: 'clothing-professional-3', name: '科学家' },
                { id: 'clothing-professional-4', name: '运动员' },
                { id: 'clothing-professional-5', name: '职场女性' },
                { id: 'clothing-professional-6', name: '和尚' },
                { id: 'clothing-professional-7', name: '杂技演员' },
                { id: 'clothing-professional-8', name: '修女' },
                { id: 'clothing-professional-9', name: '护士' },
                { id: 'clothing-professional-10', name: '空姐' },
                { id: 'clothing-professional-11', name: '学生' },
                { id: 'clothing-professional-12', name: '女服务员' },
                { id: 'clothing-professional-13', name: '老师' },
                { id: 'clothing-professional-14', name: '赛车手' },
                { id: 'clothing-professional-15', name: '警察' },
                { id: 'clothing-professional-16', name: '士兵' },
                { id: 'clothing-professional-17', name: '啦啦队' },
                { id: 'clothing-professional-18', name: '男演员' },
                { id: 'clothing-professional-19', name: '女演员' },
                { id: 'clothing-professional-20', name: '间谍' },
                { id: 'clothing-professional-21', name: '特工' },
                { id: 'clothing-professional-22', name: '刺客' },
                { id: 'clothing-professional-23', name: '诗人' },
                { id: 'clothing-professional-24', name: '日本武士' },
                { id: 'clothing-professional-25', name: '舞女' },
                { id: 'clothing-professional-26', name: '摩托车手' },
                { id: 'clothing-professional-27', name: '黑客' },
                { id: 'clothing-professional-28', name: '魔术师' },
                { id: 'clothing-professional-29', name: '侦探' },
                { id: 'clothing-professional-30', name: '人偶' },
                { id: 'clothing-professional-31', name: '女仆' },
                { id: 'clothing-professional-32', name: '飞行员' },
                { id: 'clothing-professional-33', name: '潜水员' },
                { id: 'clothing-professional-34', name: '酒吧审查员' },
                { id: 'clothing-professional-35', name: '传教士' },
                { id: 'clothing-professional-36', name: '消防员' },
                { id: 'clothing-professional-37', name: '守门员' },
                { id: 'clothing-professional-38', name: '厨师' },
                { id: 'clothing-professional-39', name: '宇航员' },
                { id: 'clothing-professional-40', name: '收银员' },
                { id: 'clothing-professional-41', name: '邮递员' },
                { id: 'clothing-professional-42', name: '咖啡师' },
                { id: 'clothing-professional-43', name: '隐士' },
                { id: 'clothing-professional-44', name: '牧羊人' }
            ]
        },
        // Layer-4 四肢＋小部件
        {
            id: 'socks',
            name: '袜类',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'socks-1', name: '不穿袜子' },
                { id: 'socks-2', name: '短袜' },
                { id: 'socks-3', name: '日式厚底短袜' },
                { id: 'socks-4', name: '丝袜' },
                { id: 'socks-5', name: '圣诞袜' },
                { id: 'socks-6', name: '暖腿袜' },
                { id: 'socks-7', name: '荷叶边袜子' },
                { id: 'socks-8', name: '丝带边袜子' },
                { id: 'socks-9', name: '闪亮袜子' },
                { id: 'socks-10', name: '褶边长筒袜' },
                { id: 'socks-11', name: '过膝袜' },
                { id: 'socks-12', name: '渔网袜' },
                { id: 'socks-13', name: '堆堆袜' },
                { id: 'socks-14', name: '裤袜' },
                { id: 'socks-15', name: '蕾丝裤袜' },
                { id: 'socks-16', name: '罗纹裤袜' },
                { id: 'socks-17', name: '湿连裤袜' },
                { id: 'socks-18', name: '格子裤袜' },
                { id: 'socks-19', name: '透视裤袜' },
                { id: 'socks-20', name: '连裤袜' },
                { id: 'socks-21', name: '撕裂的连裤袜' },
                { id: 'socks-22', name: '单腿连裤袜' },
                { id: 'socks-23', name: '荷叶边连裤袜' },
                { id: 'socks-24', name: '柳丁吊袜带' },
                { id: 'socks-25', name: '吊袜带' },
                { id: 'socks-26', name: '大腿系带' },
                { id: 'socks-27', name: '腿部花边环' },
                { id: 'socks-28', name: '包扎腿' }
            ]
        },
        {
            id: 'shoes',
            name: '鞋',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'shoes-1', name: '运动鞋' },
                { id: 'shoes-2', name: '皮鞋' },
                { id: 'shoes-3', name: '军靴' },
                { id: 'shoes-4', name: '高跟鞋' },
                { id: 'shoes-5', name: '厚底鞋' },
                { id: 'shoes-6', name: '拖鞋' }
            ]
        },
        {
            id: 'gloves-sleeves',
            name: '手套／袖／臂饰',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'gloves-sleeves-1', name: '过手袖' },
                { id: 'gloves-sleeves-2', name: '护手' },
                { id: 'gloves-sleeves-3', name: '臂带' },
                { id: 'gloves-sleeves-4', name: '臂镯' },
                { id: 'gloves-sleeves-5', name: '肩章' }
            ]
        },
        {
            id: 'gesture',
            name: '手势',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'gesture-1', name: '嘘手势' },
                { id: 'gesture-2', name: '翘大拇指' },
                { id: 'gesture-3', name: '手放脑后' },
                { id: 'gesture-4', name: '手放身后' },
                { id: 'gesture-5', name: '手插口袋' },
                { id: 'gesture-6', name: '双手插口袋' },
                { id: 'gesture-7', name: '十指相扣' },
                { id: 'gesture-8', name: 'V字手势' },
                { id: 'gesture-9', name: '手在地板上' },
                { id: 'gesture-10', name: '手在额头上' },
                { id: 'gesture-11', name: '手在肚子上' },
                { id: 'gesture-12', name: '手在肩膀上' },
                { id: 'gesture-13', name: '手搭别人的腿' },
                { id: 'gesture-14', name: '手搭别人的腰' },
                { id: 'gesture-15', name: '双手合十' },
                { id: 'gesture-16', name: '翼展双臂' },
                { id: 'gesture-17', name: '手放嘴边' },
                { id: 'gesture-18', name: '手枪手势' },
                { id: 'gesture-19', name: '猫爪手势' }
            ]
        },
        {
            id: 'upper-body',
            name: '手持物',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'upper-body-1', name: '拿着' },
                { id: 'upper-body-2', name: '拿着餐刀' },
                { id: 'upper-body-3', name: '拿着枪' },
                { id: 'upper-body-4', name: '拿着杯子' },
                { id: 'upper-body-5', name: '拿着食物' },
                { id: 'upper-body-6', name: '拿着书' },
                { id: 'upper-body-7', name: '拿着魔杖' },
                { id: 'upper-body-8', name: '打着伞' },
                { id: 'upper-body-9', name: '捧着花' },
                { id: 'upper-body-10', name: '拿着麦克风' },
                { id: 'upper-body-11', name: '抱着物品' },
                { id: 'upper-body-12', name: '抱着心' }
            ]
        },
        // Layer-5 头面装饰
        {
            id: 'hair-accessories',
            name: '发饰',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'hair-accessories-1', name: '发带' },
                { id: 'hair-accessories-2', name: '头巾' },
                { id: 'hair-accessories-3', name: '动物头巾' },
                { id: 'hair-accessories-4', name: '蝴蝶结发饰' },
                { id: 'hair-accessories-5', name: '新月发饰' },
                { id: 'hair-accessories-6', name: '洛丽塔发饰' },
                { id: 'hair-accessories-7', name: '羽毛发饰' },
                { id: 'hair-accessories-8', name: '头花' },
                { id: 'hair-accessories-9', name: '发簪' },
                { id: 'hair-accessories-10', name: '发夹' },
                { id: 'hair-accessories-11', name: '发箍' },
                { id: 'hair-accessories-12', name: '发圈' },
                { id: 'hair-accessories-13', name: '发饰' },
                { id: 'hair-accessories-14', name: '发棒' },
                { id: 'hair-accessories-15', name: '心形发饰' }
            ]
        },
        {
            id: 'eye-accessories',
            name: '眼饰',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'eye-accessories-1', name: '飞行员太阳镜' },
                { id: 'eye-accessories-2', name: '无边框眼镜' },
                { id: 'eye-accessories-3', name: '半无框眼镜' },
                { id: 'eye-accessories-4', name: '太阳镜' },
                { id: 'eye-accessories-5', name: '风镜' },
                { id: 'eye-accessories-6', name: '独眼眼罩' },
                { id: 'eye-accessories-7', name: '黑色眼罩' }
            ]
        },
        {
            id: 'face-accessories',
            name: '面饰／冠',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'face-accessories-1', name: '般若面具' },
                { id: 'face-accessories-2', name: '面纱' },
                { id: 'face-accessories-3', name: '新娘面纱' },
                { id: 'face-accessories-4', name: '皇冠' },
                { id: 'face-accessories-5', name: '迷你皇冠' },
                { id: 'face-accessories-6', name: '耳罩' },
                { id: 'face-accessories-7', name: '口罩' },
                { id: 'face-accessories-8', name: '创口贴' }
            ]
        },
        {
            id: 'jewelry',
            name: '首饰',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'jewelry-1', name: '手链' },
                { id: 'jewelry-2', name: '项圈' },
                { id: 'jewelry-3', name: '金属项圈' },
                { id: 'jewelry-4', name: '戒指' },
                { id: 'jewelry-5', name: '腕带' },
                { id: 'jewelry-6', name: '吊坠' },
                { id: 'jewelry-7', name: '胸针' },
                { id: 'jewelry-8', name: '圈形耳环' },
                { id: 'jewelry-9', name: '手镯' },
                { id: 'jewelry-10', name: '耳钉' },
                { id: 'jewelry-11', name: '旭日形首饰' },
                { id: 'jewelry-12', name: '珍珠手链' },
                { id: 'jewelry-13', name: '耳坠' },
                { id: 'jewelry-14', name: '木偶戒指' },
                { id: 'jewelry-15', name: '胸花' },
                { id: 'jewelry-16', name: '蓝宝石胸针' },
                { id: 'jewelry-17', name: '珠宝首饰' },
                { id: 'jewelry-18', name: '项链' }
            ]
        },
        // Layer-6 特效＋非人特征
        {
            id: 'tail',
            name: '尾巴',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'tail-1', name: '宝可梦尾巴' },
                { id: 'tail-2', name: '皮卡丘尾巴' },
                { id: 'tail-3', name: '水獭尾巴' },
                { id: 'tail-4', name: '尾' },
                { id: 'tail-5', name: '鹿尾' },
                { id: 'tail-6', name: '黄鼠狼尾巴' },
                { id: 'tail-7', name: '羊驼尾巴' },
                { id: 'tail-8', name: '恐龙尾巴' },
                { id: 'tail-9', name: '企鹅尾巴' },
                { id: 'tail-10', name: '羊尾巴' },
                { id: 'tail-11', name: '山羊尾巴' },
                { id: 'tail-12', name: '海狸尾巴' },
                { id: 'tail-13', name: '小熊猫尾巴' },
                { id: 'tail-14', name: '豺尾巴' },
                { id: 'tail-15', name: '食蚁兽尾巴' },
                { id: 'tail-16', name: '土狼尾巴' },
                { id: 'tail-17', name: '猎豹尾巴' },
                { id: 'tail-18', name: '熊猫尾巴' },
                { id: 'tail-19', name: '天使尾巴' }
            ]
        },
        {
            id: 'horn',
            name: '角',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'horn-1', name: '羚羊角' },
                { id: 'horn-2', name: '山羊角' },
                { id: 'horn-3', name: '羊角' },
                { id: 'horn-4', name: '奶牛角' },
                { id: 'horn-5', name: '公牛角' },
                { id: 'horn-6', name: '鬼角' },
                { id: 'horn-7', name: '断角' },
                { id: 'horn-8', name: '机械角' },
                { id: 'horn-9', name: '恶魔之角' },
                { id: 'horn-10', name: '龙之角' }
            ]
        },
        {
            id: 'wings',
            name: '翅膀',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'wings-1', name: '蝴蝶翅膀' },
                { id: 'wings-2', name: '昆虫翅膀' },
                { id: 'wings-3', name: '蝙蝠翅膀' },
                { id: 'wings-4', name: '鸟翼' },
                { id: 'wings-5', name: '羽翼' },
                { id: 'wings-6', name: '妖精翅膀' },
                { id: 'wings-7', name: '龙之翼' },
                { id: 'wings-8', name: '恶魔之翼' },
                { id: 'wings-9', name: '火焰翅膀' },
                { id: 'wings-10', name: '机械翅膀' },
                { id: 'wings-11', name: '冰翅' },
                { id: 'wings-12', name: '冰火之翼' }
            ]
        },
        {
            id: 'magic-effects',
            name: '魔法／特效',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'magic-effects-1', name: '魔法1.0' },
                { id: 'magic-effects-2', name: '水魔法' },
                { id: 'magic-effects-3', name: '冰魔法' },
                { id: 'magic-effects-4', name: '冰系改' },
                { id: 'magic-effects-5', name: '星冰乐' },
                { id: 'magic-effects-6', name: '森林冰' },
                { id: 'magic-effects-7', name: '结晶法' },
                { id: 'magic-effects-8', name: '核爆法' },
                { id: 'magic-effects-9', name: '风魔法' },
                { id: 'magic-effects-10', name: '流沙法' },
                { id: 'magic-effects-11', name: '雷电法' },
                { id: 'magic-effects-12', name: '圣光法' }
            ]
        },
        // Layer-7 最终润色
        {
            id: 'lighting',
            name: '光影',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'lighting-1', name: '柔光' },
                { id: 'lighting-2', name: '强光' },
                { id: 'lighting-3', name: '背光' },
                { id: 'lighting-4', name: '侧光' },
                { id: 'lighting-5', name: '顶光' },
                { id: 'lighting-6', name: '底光' },
                { id: 'lighting-7', name: '自然光' },
                { id: 'lighting-8', name: '室内光' },
                { id: 'lighting-9', name: '霓虹灯' },
                { id: 'lighting-10', name: '月光' },
                { id: 'lighting-11', name: '阳光' }
            ]
        },
        {
            id: 'color',
            name: '色彩',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'color-1', name: '彩色' },
                { id: 'color-2', name: '黑白' },
                { id: 'color-3', name: '单色' },
                { id: 'color-4', name: '暖色调' },
                { id: 'color-5', name: '冷色调' },
                { id: 'color-6', name: '高饱和度' },
                { id: 'color-7', name: '低饱和度' },
                { id: 'color-8', name: '渐变色彩' }
            ]
        },
        {
            id: 'style',
            name: '风格',
            selectionMode: 'single', // 单选
            tags: [
                { id: 'style-1', name: '写实' },
                { id: 'style-2', name: '卡通' },
                { id: 'style-3', name: '动漫' },
                { id: 'style-4', name: '水彩' },
                { id: 'style-5', name: '油画' },
                { id: 'style-6', name: '素描' },
                { id: 'style-7', name: '插画' },
                { id: 'style-8', name: '像素风' },
                { id: 'style-9', name: '赛博朋克' },
                { id: 'style-10', name: '蒸汽朋克' },
                { id: 'style-11', name: '哥特风' },
                { id: 'style-12', name: '洛丽塔' },
                { id: 'style-13', name: '暗黑系' },
                { id: 'style-14', name: '治愈系' },
                { id: 'style-15', name: '梦幻' },
                { id: 'style-16', name: '清新' },
                { id: 'style-17', name: '复古' },
                { id: 'style-18', name: '未来' },
                { id: 'style-19', name: '和风' },
                { id: 'style-20', name: '中国风' }
            ]
        },
        {
            id: 'quality',
            name: '质量',
            selectionMode: 'multiple', // 多选
            tags: [
                { id: 'quality-1', name: '高品质' },
                { id: 'quality-2', name: '4K' },
                { id: 'quality-3', name: '8K' },
                { id: 'quality-4', name: '超精细' },
                { id: 'quality-5', name: '大师之作' },
                { id: 'quality-6', name: '专业级' },
                { id: 'quality-7', name: '细节丰富' },
                { id: 'quality-8', name: '纹理清晰' }
            ]
        }
    ]
};