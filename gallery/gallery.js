const famousPaintings = [
    {
        id: 1,
        title: "人物龙凤帛画",
        period: "战国",
        type: "帛画",
        description: "\"帛画\"是指古代绘在丝织物上的图画。根据当时楚国的习俗并结合文物考证，有人认为，此画的妇女形象即是墓主人，作品的主题是表现龙凤引导死者，即祈愿墓主人安详逝世。",
        coverText: "战国帛画",
        imageUrl: "cnpaintings/819.jpg"
    },
    {
        id: 2,
        title: "轪侯家属墓生活图",
        period: "西汉",
        type: "帛画",
        description: "此帛画是长沙国丞相之妻死后的随葬品。画分为三部分：上部以祈颂墓主人为主题；中部则表现墓主人日常生活；下部绘两条交缠的鲲，背上蹲着一个赤身力士。",
        coverText: "西汉帛画",
        imageUrl: "cnpaintings/825.jpg"
    },
    {
        id: 3,
        title: "女史箴图",
        period: "东晋",
        author: "顾恺之",
        description: "此画根据西晋张华的《女史箴》一文所绘，宣扬宫廷妇女应遵守的道德规范，据传是为了讽谏放荡性妒、擅权祸国的贾皇后。",
        coverText: "顾恺之·东晋",
        imageUrl: "cnpaintings/832.jpg"
    },
    {
        id: 4,
        title: "洛神赋图",
        period: "东晋",
        author: "顾恺之",
        description: "此画是以魏国杰出诗人曹植的名篇《洛神赋》为蓝本创作的。《洛神赋》以浪漫主义手法，模仿宋玉《神女赋》楚王神女之事而作，虚构了自己与洛水女神之间的爱情故事。",
        coverText: "顾恺之·东晋",
        imageUrl: "cnpaintings/839.jpg"
    },
    {
        id: 5,
        title: "职贡图",
        period: "梁朝",
        author: "萧绎",
        description: "萧绎是梁元帝（505—554），尤以肖像画最擅。图中所绘为列国使者立像12人，自右至左依次为：波斯国、百济国、丘兹国、倭国、狼牙修国等等，表现了不同民族的独特气质。",
        coverText: "萧绎·梁朝",
        imageUrl: "cnpaintings/847.jpg"
    },
    {
        id: 6,
        title: "竹林七贤与荣启期砖画",
        period: "南朝",
        type: "画像砖",
        description: "画像砖是在砖头模子上刻画后，再压成砖坯烧制出来。该模印砖画由200多块古墓砖组成，表现了士族知识分子自由清高的理想人格。",
        coverText: "南朝画像砖",
        imageUrl: "cnpaintings/859.jpg"
    },
    {
        id: 7,
        title: "鹿王本生图",
        period: "北魏",
        type: "莫高窟壁画",
        description: "本生故事是指释迦牟尼生前所经历的许多事迹。'鹿王本生'说的是释迦牟尼本是一只九色鹿王，他救了一个落水将要淹死的人反被此人出卖的故事。",
        coverText: "北魏壁画",
        imageUrl: "cnpaintings/865.jpg"
    },
    {
        id: 8,
        title: "西方净土变",
        period: "唐代",
        type: "莫高窟壁画",
        description: "《西方净土变》以图画的形式，将想象中的西方极乐世界直观地表现出来，画面丰富细致，色彩鲜明，画艺精湛。",
        coverText: "唐代壁画",
        imageUrl: "cnpaintings/870.jpg"
    },
    {
        id: 9,
        title: "维摩诘经变",
        period: "唐代",
        type: "莫高窟壁画",
        description: "经变画，指的是用画像来解释某部佛经的思想内容。《维摩诘经变》都是根据《维摩诘经》而画的。",
        coverText: "唐代壁画",
        imageUrl: "cnpaintings/877.jpg"
    },
    {
        id: 10,
        title: "张议潮统军出行图",
        period: "唐代",
        type: "莫高窟壁画",
        description: "此图描绘的是唐朝敦煌地区最高统治者张议潮，接受唐朝廷敕封为河西节度使后，统军出行的浩大场面。",
        coverText: "唐代壁画",
        imageUrl: "cnpaintings/882.jpg"
    },
    {
        id: 11,
        title: "游春图",
        period: "隋朝",
        author: "展子虔",
        description: "《游春图》是隋朝画家展子虔创作的一幅绢本设色山水画，现藏于北京故宫博物院。此画以春游为题材，是中国现存最早的山水画作品之一。",
        coverText: "展子虔·隋朝",
        imageUrl: "cnpaintings/886.jpg"
    },
    {
        id: 12,
        title: "历代帝王图",
        period: "唐代",
        author: "阎立本",
        description: "阎立本擅画人物、车马、台阁。此画描绘了两汉、魏晋、南北朝至隋代十三个帝王的形象，并寓褒贬于其中。比如刘备的深而显疲惫、曹丕的咄咄逼人等，都给人留下深刻印象。",
        coverText: "阎立本·唐代",
        imageUrl: "cnpaintings/890.jpg"
    },
    {
        id: 13,
        title: "步辇图",
        period: "唐代",
        author: "阎立本",
        description: "《步辇图》取材于唐贞观八年，吐蕃首领松赞干布与文成公主联姻的事件，描绘了唐太宗李世民接见吐蕃使臣禄东赞的情景。",
        coverText: "阎立本·唐代",
        imageUrl: "cnpaintings/892.jpg"
    },
    {
        id: 14,
        title: "虢国夫人游春图",
        period: "唐代",
        author: "张萱",
        description: "此图描写唐天宝年间，唐玄宗的宠妃杨玉环的姐姐虢国夫人和秦国夫人，及其侍从春天出游的行列。出游行列成前松后紧组合，统一中有变化，富有节奏感和韵律感。",
        coverText: "张萱·唐代",
        imageUrl: "cnpaintings/895.jpg"
    },
    {
        id: 15,
        title: "捣练图",
        period: "唐代",
        author: "张萱",
        description: "此画描绘宫中妇女捣练的情景，捣练意为捣洗煮过的熟绢。画卷由右至左展开，三组人物相互呼应，富有生活情趣。",
        coverText: "张萱·唐代",
        imageUrl: "cnpaintings/899.jpg"
    },
    {
        id: 16,
        title: "簪花仕女图",
        period: "唐代",
        author: "周昉",
        description: "此画描写春夏之交时节，一群服饰艳丽的贵族妇女在庭园里嬉戏、赏花的闲逸生活片断。真实地反映了贵族妇女奢侈闲逸生活中的苦闷心境。",
        coverText: "周昉·唐代",
        imageUrl: "cnpaintings/905.jpg"
    },
    {
        id: 17,
        title: "高逸图",
        period: "唐代",
        author: "孙位",
        description: "此图实际上画的是《竹林七贤图》，不过现在画上只留下山涛、王戎、刘伶、阮籍四人，另外三人嵇康、向秀、阮 Salt已遗失了。",
        coverText: "孙位·唐代",
        imageUrl: "cnpaintings/910.jpg"
    },
    {
        id: 18,
        title: "江帆楼阁图",
        period: "唐代",
        author: "李思训",
        description: "此图展现的是游春的情景，使人远离尘世，倾情自然，纵目千里，给人以清新而'超然物外'之感。",
        coverText: "李思训·唐代",
        imageUrl: "cnpaintings/915.jpg"
    },
    {
        id: 19,
        title: "明皇幸蜀图",
        period: "唐代",
        author: "李昭道",
        description: "作品描绘人马行走于崇山峻岭间的画面，时代特征明显，是反映唐代山水画面貌的重要传世作品。",
        coverText: "李昭道·唐代",
        imageUrl: "cnpaintings/920.jpg"
    },
    {
        id: 20,
        title: "辋川图",
        period: "唐代",
        author: "王维",
        description: "《辋川图》是王维晚年隐居辋川时候，在清源寺壁上所作的单幅画。后来清源寺圮毁，此画也便无存。现在人们所见到的都是后来的临摹本。这幅《辋川图》所创造的淡泊超尘的意境，给人精神上的陶冶和身心上的审美愉悦，旷古驰誉。",
        coverText: "王维·唐代",
        imageUrl: "cnpaintings/926.jpg"
    },
    {
        id: 21,
        title: "照夜白图",
        period: "唐代",
        author: "韩干",
        description: "这幅画是用水墨线描完成的，描绘的是唐玄宗李隆基的坐骑'照夜白'的形象，充满了丰富的情节和感受，反映了当时时代的审美观念。",
        coverText: "韩干·唐代",
        imageUrl: "cnpaintings/930.jpg"
    },
    {
        id: 22,
        title: "五牛图",
        period: "唐代",
        author: "韩滉",
        description: "《五牛图》是中国十大传世名画，也是现存最古的纸本中国画。现藏于北京故宫博物院。",
        coverText: "韩滉·唐代",
        imageUrl: "cnpaintings/936.jpg"
    },
    {
        id: 23,
        title: "天王送子图",
        period: "唐代",
        author: "吴道子",
        description: "《天王送子图》由唐人吴道子所做，传为宋人摹本。此图技法首重线条和用笔，线条流转随心，轻重顿挫合于节奏，以动势表现生气，是典型的'吴家样'。",
        coverText: "吴道子·唐代",
        imageUrl: "cnpaintings/940.jpg"
    },
    {
        id: 24,
        title: "重屏会棋图",
        period: "五代",
        author: "周文矩",
        description: "此图描绘南唐中主李璟，与其弟晋王景遂、齐王景达、江王景逖会棋的情景。人物写实，神情刻画精细，清秀儒雅的共性中，又有各自身份和心理活动的区别。",
        coverText: "周文矩·五代",
        imageUrl: "cnpaintings/946.jpg"
    },
    {
        id: 25,
        title: "韩熙载夜宴图",
        period: "五代",
        author: "顾闳中",
        description: "画面的主人公，韩熙载是北方人，当时是南唐的大臣。南唐后主李煜，多猜疑北方人，便派画家顾闳中到韩熙载家窥探。回来后凭'目识心记'作了这幅长卷，表达了韩熙载既纵情声色，又沉郁寡欢的心理矛盾。",
        coverText: "顾闳中·五代",
        imageUrl: "cnpaintings/951.jpg"
    },
    {
        id: 26,
        title: "十六罗汉图",
        period: "五代",
        author: "贯休",
        description: "《十六罗汉图》为晚唐五代时期贯休所画。现存的摹本材料和技法五花八门，有绢本、纸本、水墨、石刻本等，目前大多流于海外。画中也可看出当时晚唐水墨山水画对人物画的影响。",
        coverText: "贯休·五代",
        imageUrl: "cnpaintings/961.jpg"
    },
    {
        id: 27,
        title: "珍禽图",
        period: "五代",
        author: "黄筌",
        description: "画家用细密的线条和浓丽的色彩，描绘了大自然中的众多生灵，在尺幅不大的绢素上画了昆虫、鸟雀及龟类共24只，均以细劲的线条画出轮廓，然后赋以色彩。",
        coverText: "黄筌·五代",
        imageUrl: "cnpaintings/969.jpg"
    },
    {
        id: 28,
        title: "匡庐图",
        period: "五代",
        author: "荆浩",
        description: "此画是一幅绢本水墨立轴，表现了山川大地的宏伟壮丽。画家以散点透视法，将丰富的景物巧妙地组织在一个画面中，构图严谨，用墨精润，空间感得以充分表现。",
        coverText: "荆浩·五代",
        imageUrl: "cnpaintings/971.jpg"
    },
    {
        id: 29,
        title: "关山行旅图",
        period: "五代",
        author: "关仝",
        description: "《关山行旅图》是关仝的代表作，布景兼'高远'与'平远'二法。",
        coverText: "关仝·五代",
        imageUrl: "cnpaintings/24.jpg"
    },
    {
        id: 30,
        title: "夏山图",
        period: "五代",
        author: "董源",
        description: "此画为董源后期变体之作，画面气势辽阔，用笔浓淡相间。与《潇湘图》、《夏景山口待渡图》同为其传世三大名迹。",
        coverText: "董源·五代",
        imageUrl: "cnpaintings/27.jpg"
    },
    {
        id: 31,
        title: "读碑窠石图",
        period: "五代",
        author: "李成与王晓",
        description: "双拼绢大幅山水，冬日寒林中骑骡老人读碑，近景陂陀古碑与枯树相映，现藏日本大阪市立美术馆。",
        coverText: "李成与王晓·五代",
        imageUrl: "cnpaintings/33.jpg"
    },
    {
        id: 32,
        title: "秋山问道图",
        period: "宋代",
        author: "巨然",
        description: "南派山祖巨然代表作，峰峦叠翠中一径通幽，山舍内儒者问道，尽显江南烟岚清润之致。",
        coverText: "巨然·宋代",
        imageUrl: "cnpaintings/41.jpg"
    },
    {
        id: 33,
        title: "山鹧棘雀图",
        period: "宋代",
        author: "黄居寀",
        description: "黄家花鸟遗法，山鹧俯冲、棘雀惊飞，工笔重彩与没骨相融，尺幅间生机勃发。",
        coverText: "黄居寀·宋代",
        imageUrl: "cnpaintings/47.jpg"
    },
    {
        id: 34,
        title: "双喜图",
        period: "宋代",
        author: "崔白",
        description: "秋风枯草中两只山喜鹊向野兔示警，瞬间动态capture入微，兼工带写，宋人写生极致。",
        coverText: "崔白·宋代",
        imageUrl: "cnpaintings/51.jpg"
    },
    {
        id: 35,
        title: "溪山行旅图",
        period: "北宋",
        author: "范宽",
        description: "高远巨嶂式山水巅峰，中峰鼎立、飞瀑千尺，山脚行旅如蚁，体量大而意境雄奇。",
        coverText: "范宽·北宋",
        imageUrl: "cnpaintings/72.jpg"
    },
    {
        id: 36,
        title: "早春图",
        period: "北宋",
        author: "郭熙",
        description: "全景高远、平远、深远三法并用，雪意未退而春气暗回，枯树吐芽处见'早春'神韵。",
        coverText: "郭熙·北宋",
        imageUrl: "cnpaintings/85.jpg"
    },
    {
        id: 37,
        title: "溪山楼观图",
        period: "宋代",
        author: "燕文贵",
        description: "江天浩渺，依山构阁，行旅帆樯往来，用笔繁密而空灵，人称'燕家景致'。",
        coverText: "燕文贵·宋代",
        imageUrl: "cnpaintings/96.jpg"
    },
    {
        id: 38,
        title: "五马图",
        period: "宋代",
        author: "李公麟",
        description: "白描神品，分五段写'凤头骢'等西域进贡名马与奚官，线条如行云流水，人马形神兼备。",
        coverText: "李公麟·宋代",
        imageUrl: "cnpaintings/107.jpg"
    },
    {
        id: 39,
        title: "秋庭戏婴图",
        period: "宋代",
        author: "苏汉臣",
        description: "庭院湖石花丛下两婴追逐，胖墩可爱、瞳如点漆，衣纹精细而色彩柔雅，婴戏图典范。",
        coverText: "苏汉臣·宋代",
        imageUrl: "cnpaintings/118.jpg"
    },
    {
        id: 40,
        title: "清明上河图",
        period: "北宋",
        author: "张择端",
        description: "中国十大传世名画之一，绢本长卷，以虹桥为中心写汴京十二时辰市井百态，被誉为'宋代百科全书'。",
        coverText: "张择端·北宋",
        imageUrl: "cnpaintings/126.jpg"
    },
    {
        id: 41,
        title: "墨竹图",
        period: "北宋",
        author: "文同",
        description: "文人墨竹鼻祖，S形俯仰取势，一笔点叶、一笔立竿，书意入画，苏轼誉'胸有成竹'。",
        coverText: "文同·北宋",
        imageUrl: "cnpaintings/134.jpg"
    },
    {
        id: 42,
        title: "四梅花图",
        period: "宋代",
        author: "杨无咎",
        description: "卷分四枝，写梅花未开、欲开、盛开、将残，自题《柳梢青》四首，借花喻人生盛衰。",
        coverText: "杨无咎·宋代",
        imageUrl: "cnpaintings/144.jpg"
    },
    {
        id: 43,
        title: "枯木怪石图",
        period: "北宋",
        author: "苏轼",
        description: "以书法飞白写枯木枝干，盘石如涡，不求形似而抒胸中磊落，开文人墨戏先河。",
        coverText: "苏轼·北宋",
        imageUrl: "cnpaintings/150.jpg"
    },
    {
        id: 44,
        title: "芙蓉锦鸡图",
        period: "宋代",
        author: "赵佶",
        description: "瘦金体题诗，五彩锦鸡立芙蓉枝头，双蝶回环，院体工笔与诗意兼备，徽宗代表作。",
        coverText: "赵佶·宋代",
        imageUrl: "cnpaintings/157.jpg"
    },
    {
        id: 45,
        title: "货郎图",
        period: "宋代",
        author: "李嵩",
        description: "担中百货杂陈，村童围呼'货郎来矣'，以风俗笔记录南宋市井百物与童真。",
        coverText: "李嵩·宋代",
        imageUrl: "cnpaintings/167.jpg"
    },
    {
        id: 46,
        title: "采薇图",
        period: "宋代",
        author: "李唐",
        description: "伯夷叔齐采薇首阳，形容枯槁而目光坚毅，借古讽今，寄寓士人气节。",
        coverText: "李唐·宋代",
        imageUrl: "cnpaintings/177.jpg"
    },
    {
        id: 47,
        title: "潇湘奇观图",
        period: "宋代",
        author: "米友仁",
        description: "云山墨戏，横点叠峰，江天烟雨皆以水墨晕出，尽得江南云气空蒙之趣。",
        coverText: "米友仁·宋代",
        imageUrl: "cnpaintings/184.jpg"
    },
    {
        id: 48,
        title: "泼墨仙人图",
        period: "南宋",
        author: "梁楷",
        description: "阔笔泼墨，仙人袒腹醉行，面目简到仅具神采，开创减笔人物新格。",
        coverText: "梁楷·南宋",
        imageUrl: "cnpaintings/190.jpg"
    },
    {
        id: 49,
        title: "太白行吟图",
        period: "南宋",
        author: "梁楷",
        description: "寥寥数笔写李白仰天长吟，衣袂随风，墨气酣畅，现藏东京国立博物馆。",
        coverText: "梁楷·南宋",
        imageUrl: "cnpaintings/228.jpg"
    },
    {
        id: 50,
        title: "四景山水图",
        period: "南宋",
        author: "刘松年",
        description: "四季屏风卷，春观花、夏纳凉、秋赏月、冬寻梅，楼阁精工而湖山空濛。",
        coverText: "刘松年·南宋",
        imageUrl: "cnpaintings/238.jpg"
    },
    {
        id: 51,
        title: "踏歌图",
        period: "南宋",
        author: "马远",
        description: "上半幅奇峰云雾如仙境，下半幅田埂上农夫手杖踏歌，动静对比强烈，人称'马一角'山水与风俗合璧之作。",
        coverText: "马远·南宋",
        imageUrl: "cnpaintings/246.jpg"
    },
    {
        id: 52,
        title: "溪山清远图",
        period: "南宋",
        author: "夏圭",
        description: "江水空阔，远山淡抹，渔舟三两，笔简意远，夏圭'半边'构图尽显江南清远之致。",
        coverText: "夏圭·南宋",
        imageUrl: "cnpaintings/252.jpg"
    },
    {
        id: 53,
        title: "千里江山图",
        period: "北宋",
        author: "王希孟",
        description: "青绿重色写千里江山，峰峦连绵，村舍舟桥皆备，十八岁的王希孟以一幅卷轴囊括华夏雄浑与秀美。",
        coverText: "王希孟·北宋",
        imageUrl: "cnpaintings/260.jpg"
    },
    {
        id: 54,
        title: "江山秋色图",
        period: "北宋",
        author: "赵伯驹",
        description: "重彩青绿写深秋壮阔，层林尽染，飞泉栈道，人马如蚁，得北宗山水骨力与设色华丽之长。",
        coverText: "赵伯驹·北宋",
        imageUrl: "cnpaintings/274.jpg"
    },
    {
        id: 55,
        title: "写生蛱蝶图",
        period: "宋代",
        author: "赵昌",
        description: "秋花残草间蛱蝶翻飞，先笔后色，活体写生，曾作国礼赠Obama，宋人写实花鸟典范。",
        coverText: "赵昌·宋代",
        imageUrl: "cnpaintings/284.jpg"
    },
    {
        id: 56,
        title: "岁寒三友图",
        period: "南宋",
        author: "赵孟坚",
        description: "折枝梅、松、竹交错，一笔一划见书法意趣，象征坚贞高节，为宋末文人画清气代表。",
        coverText: "赵孟坚·南宋",
        imageUrl: "cnpaintings/292.jpg"
    },
    {
        id: 57,
        title: "墨兰图",
        period: "元代",
        author: "郑思肖",
        description: "露根无土，以'无根兰'寄寓亡国之痛，墨气浑厚，左下角钤'求则不得'印，忠义之气凛然。",
        coverText: "郑思肖·元代",
        imageUrl: "cnpaintings/294.jpg"
    },
    {
        id: 58,
        title: "秋郊饮马图",
        period: "元代",
        author: "赵孟頫",
        description: "红衣奚官策马临流，林木疏秀，兼得唐人之骨、宋人之韵，赵氏鞍马画传世真迹之一。",
        coverText: "赵孟頫·元代",
        imageUrl: "cnpaintings/298.jpg"
    },
    {
        id: 59,
        title: "鹊华秋色图",
        period: "元代",
        author: "赵孟頫",
        description: "青绿淡设色写济南鹊山、华山，汀洲红树，渔舟唱晚，开文人青绿山水新风，赠好友周密。",
        coverText: "赵孟頫·元代",
        imageUrl: "cnpaintings/303.jpg"
    },
    {
        id: 60,
        title: "云横秀岭图",
        period: "元代",
        author: "高克恭",
        description: "云山蒸腾，秀岭出没，米家墨气与董巨皴法相融，气势宏阔而意境苍茫，为元初三家之首代表作。",
        coverText: "高克恭·元代",
        imageUrl: "cnpaintings/311.jpg"
    },
    {
        id: 61,
        title: "富春山居图",
        period: "元代",
        author: "黄公望",
        description: "水墨写富春江两岸秋岚，笔简而意远，后因火焚分为'剩山图'与'无用师卷'，被誉为'画中之兰亭'。",
        coverText: "黄公望·元代",
        imageUrl: "cnpaintings/327.jpg"
    },
    {
        id: 62,
        title: "渔父图",
        period: "元代",
        author: "吴镇",
        description: "芦汀水泊，渔舟自横，湿笔披麻皴写江南烟雨，诗书画合一，得'梅花道人'清旷之趣。",
        coverText: "吴镇·元代",
        imageUrl: "cnpaintings/334.jpg"
    },
    {
        id: 63,
        title: "幽涧寒松图",
        period: "元代",
        author: "倪瓒",
        description: "干笔淡墨，寒松三株临幽涧，简淡中见高逸，晚年'逸笔草草'之极致，寄寓隐者之孤高。",
        coverText: "倪瓒·元代",
        imageUrl: "cnpaintings/346.jpg"
    },
    {
        id: 64,
        title: "青卞隐居图",
        period: "元代",
        author: "王蒙",
        description: "解索、牛毛皴纵横交错，峰峦稠密，山路蜿蜒，既厚且密却清气满纸，董其昌誉为'天下第一王叔明'。",
        coverText: "王蒙·元代",
        imageUrl: "cnpaintings/352.jpg"
    },
    {
        id: 65,
        title: "朝元图",
        period: "元代",
        type: "永乐宫壁画",
        description: "山西永乐宫三清殿壁绘，以290位天神朝谒元始天尊，线条遒劲，重彩贴金，堪称中国寺观壁画巅峰。",
        coverText: "元代壁画",
        imageUrl: "cnpaintings/358.jpg"
    },
    {
        id: 66,
        title: "杨竹西小像",
        period: "元代",
        author: "王绎、倪瓒",
        description: "王绎写貌，倪瓒补松石，白描细劲，淡墨略晕，高士策杖悠然，元季人物肖像绝品。",
        coverText: "王绎、倪瓒·元代",
        imageUrl: "cnpaintings/364.jpg"
    },
    {
        id: 67,
        title: "四清图",
        period: "元代",
        author: "李衎",
        description: "墨竹两竿立于湖石间，浓叶疏枝，笔意清润，诗塘自题'四清'——清境、清风、清节、清赏。",
        coverText: "李衎·元代",
        imageUrl: "cnpaintings/370.jpg"
    },
    {
        id: 68,
        title: "清閟阁墨竹图",
        period: "元代",
        author: "柯九思",
        description: "大叶长梢，浓为面、淡为背，行笔沉稳而潇洒，得文同遗法，为清宫旧藏元竹石巨迹。",
        coverText: "柯九思·元代",
        imageUrl: "cnpaintings/379.jpg"
    },
    {
        id: 69,
        title: "墨梅图",
        period: "元代",
        author: "王冕",
        description: "繁枝万蕊，繁花密蕊以胭脂点瓣，枝干如铁，繁而不乱，写'不要人夸颜色好'之孤傲。",
        coverText: "王冕·元代",
        imageUrl: "cnpaintings/389.jpg"
    },
    {
        id: 70,
        title: "风雨归舟图",
        period: "明代",
        author: "戴进",
        description: "狂风暴雨，山树摇曳，渔舟逆风急归，湿笔扫出雨脚，墨气淋漓，浙派山水激昂之声。",
        coverText: "戴进·明代",
        imageUrl: "cnpaintings/398.jpg"
    },
    {
        id: 71,
        title: "渔乐图",
        period: "明代",
        author: "吴伟",
        description: "江南水村沙岸，渔舟唱晚，湿笔粗皴兼泼墨，飞白扫出苇风，既得烟波浩渺之趣，又见渔家欢娱，为吴伟'江夏派'本色。",
        coverText: "吴伟·明代",
        imageUrl: "cnpaintings/405.jpg"
    },
    {
        id: 72,
        title: "庐山高图",
        period: "明代",
        author: "沈周",
        description: "祝师陈宽七十寿诞而作，以庐山崇高喻师道，层峦叠翠、飞泉挂壁，粗笔披麻而气象雄浑，开创吴门山水新格局。",
        coverText: "沈周·明代",
        imageUrl: "cnpaintings/414.jpg"
    },
    {
        id: 73,
        title: "秋风纨扇图",
        period: "明代",
        author: "唐寅",
        description: "水墨写仕女持纨扇迎秋风，眉黛含愁，衣纹流转如吴带当风，自题'秋来纨扇合收藏'，寄寓士人晚景苍凉。",
        coverText: "唐寅·明代",
        imageUrl: "cnpaintings/423.jpg"
    },
    {
        id: 74,
        title: "桃源仙境图",
        period: "明代",
        author: "仇英",
        description: "大青绿设色，峰峦云雾间宫阙半隐，长桥流水、奇松修竹，仙翁抚琴，精工富丽而意境超然，为仇英仙山楼阁极诣。",
        coverText: "仇英·明代",
        imageUrl: "cnpaintings/433.jpg"
    },
    {
        id: 75,
        title: "湘君湘夫人图",
        period: "明代",
        author: "文征明",
        description: "白描双钩画屈原九歌二湘，无背景衬托，衣袂飘举若御风，朱膘白粉淡染，古雅空灵，见文人清峻之气。",
        coverText: "文征明·明代",
        imageUrl: "cnpaintings/441.jpg"
    },
    {
        id: 76,
        title: "葡萄图",
        period: "明代",
        author: "徐渭",
        description: "狂草入画，藤蔓纵横，葡萄晶莹欲滴，泼墨破笔间见狼藉之趣，写'笔底明珠无处卖'的愤懑与旷达。",
        coverText: "徐渭·明代",
        imageUrl: "cnpaintings/448.jpg"
    },
    {
        id: 77,
        title: "荷花鸳鸯图",
        period: "明代",
        author: "陈洪绶",
        description: "工笔重彩，荷盖如轮，鸳鸯偎依，花头以粉渍法凸出，装饰味浓，得陈老莲奇崛而古艳之风。",
        coverText: "陈洪绶·明代",
        imageUrl: "cnpaintings/454.jpg"
    },
    {
        id: 78,
        title: "秋兴八景图",
        period: "明代",
        author: "董其昌",
        description: "八开册页，写吴门、京口舟行所见，以干笔淡墨、米家云山参合，秀润中见萧散，为南北宗论之实践范本。",
        coverText: "董其昌·明代",
        imageUrl: "cnpaintings/470.jpg"
    },
    {
        id: 79,
        title: "南山积翠图",
        period: "清代",
        author: "王时敏",
        description: "为友人贺寿作，层峦积翠，云气吞吐，笔墨苍润而格局宏阔，得黄子久遗意，为'四王'之首典范。",
        coverText: "王时敏·清代",
        imageUrl: "cnpaintings/479.jpg"
    },
    {
        id: 80,
        title: "仿三赵山水图",
        period: "清代",
        author: "王鉴",
        description: "暮春雨后江南，青山浓丽，新柳含烟，半山亭阁待游，青绿设色兼赵令穰、赵伯驹、赵孟頫三家之法，清丽典雅。",
        coverText: "王鉴·清代",
        imageUrl: "cnpaintings/484.jpg"
    },
    {
        id: 81,
        title: "康熙南巡图·局部",
        period: "清代",
        author: "王翚",
        description: "十二巨卷写康熙二次南巡，人物万计，城垣舟车繁复，重色金碧，奉敕合作，为清代宫廷纪实绘画巅峰。",
        coverText: "王翚·清代",
        imageUrl: "cnpaintings/491.jpg"
    },
    {
        id: 82,
        title: "锦石秋花图",
        period: "清代",
        author: "恽寿平",
        description: "没骨法写湖石秋花，色渍水晕，一洗刻画之痕，秀润天成，乃'常州派'五十岁精力绝伦之作。",
        coverText: "恽寿平·清代",
        imageUrl: "cnpaintings/498.jpg"
    },
    {
        id: 83,
        title: "天都峰图轴",
        period: "清代",
        author: "弘仁",
        description: "黄山天都峰巍然耸立，群峰拱卫，笔致瘦劲，墨色苍润，得'新安画派'疏淡清逸之致。",
        coverText: "弘仁·清代",
        imageUrl: "cnpaintings/504.jpg"
    },
    {
        id: 84,
        title: "苍翠凌天图",
        period: "清代",
        author: "髡残",
        description: "层岩叠嶂，苍松盘郁，山房道人凭几而坐，以秃笔焦墨皴擦，粗服乱头而气韵苍厚，写'我与青山两不厌'之禅境。",
        coverText: "髡残·清代",
        imageUrl: "cnpaintings/509.jpg"
    },
    {
        id: 85,
        title: "荷石水禽图",
        period: "清代",
        author: "朱耷",
        description: "残荷斜挂，怪石嶙峋，水禽白眼向天，笔简意骇，冷寂孤傲，寄寓亡国之恨与画家不羁之性。",
        coverText: "朱耷·清代",
        imageUrl: "cnpaintings/528.jpg"
    },
    {
        id: 86,
        title: "淮扬洁秋图",
        period: "清代",
        author: "石涛",
        description: "泼墨破笔写淮扬秋柳，苔点如骤雨，江天浩渺，一舟横渡，于狼藉中见磅礴，高呼'笔墨当随时代'。",
        coverText: "石涛·清代",
        imageUrl: "cnpaintings/536.jpg"
    },
    {
        id: 87,
        title: "寄人篱下图",
        period: "清代",
        author: "金农",
        description: "老梅横出柴篱，繁花无人，笔拙色古，题诗'寄人篱下'，写寒士独立，为'扬州八怪'奇思妙想之典型。",
        coverText: "金农·清代",
        imageUrl: "cnpaintings/544.jpg"
    },
    {
        id: 88,
        title: "醉眠图",
        period: "清代",
        author: "黄慎",
        description: "狂笔写铁拐李醉卧，葫芦倒倾，墨气淋漓，以草书法入画，突出'醉里乾坤大'，藏辽宁省博物馆。",
        coverText: "黄慎·清代",
        imageUrl: "cnpaintings/556.jpg"
    },
    {
        id: 89,
        title: "兰竹图",
        period: "清代",
        author: "郑燮",
        description: "长竿劲叶，一笔撇出，浓淡相间，左题'咬定青山不放松'，书与画互证，见'扬州八怪'磊落之气。",
        coverText: "郑燮·清代",
        imageUrl: "cnpaintings/585.jpg"
    },
    {
        id: 90,
        title: "积书岩图",
        period: "清代",
        author: "赵之谦",
        description: "取意河北层山积书岩，峭壁如万卷叠架，松泉相映，篆籀笔意入皴，浑厚华滋，为海上画派先声。",
        coverText: "赵之谦·清代",
        imageUrl: "cnpaintings/595.jpg"
    },
    {
        id: 91,
        title: "三友图像",
        period: "清代",
        author: "任颐",
        description: "写好友曾凤寄、朱锦堂与自画像三人围坐，色墨交融，面部结构受西洋透视影响，为海派人物画新风。",
        coverText: "任颐·清代",
        imageUrl: "cnpaintings/602.jpg"
    },
    {
        id: 92,
        title: "桃实图",
        period: "清代",
        author: "吴昌硕",
        description: "篆笔写枝干，胭脂渍硕果，浓叶以重墨破色，枝干如铁，桃熟若滴，七十二岁雄强之力毕现。",
        coverText: "吴昌硕·清代",
        imageUrl: "cnpaintings/610.jpg"
    },
    {
        id: 93,
        title: "虾",
        period: "近现代",
        author: "齐白石",
        description: "水墨淡赭写群虾游弋，壳薄肉莹，长须弹跃，利用宣纸自然晕化，得'妙在似与不似之间'之旨。",
        coverText: "齐白石·近现代",
        imageUrl: "cnpaintings/613.jpg"
    },
    {
        id: 94,
        title: "长江万里图·局部",
        period: "近现代",
        author: "张大千",
        description: "1968年泼彩兼青绿，写长江自三峡至吴淞口万里烟云，色墨淋漓，大千晚年'泼写兼施'之巨制。",
        coverText: "张大千·近现代",
        imageUrl: "cnpaintings/616.jpg"
    },
    {
        id: 95,
        title: "秋林图",
        period: "近现代",
        author: "黄宾虹",
        description: "积墨数十重，黑中见亮，秋山层林繁密，舟行其间，浓墨中透出虹光，尽显'浑厚华滋'之旨。",
        coverText: "黄宾虹·近现代",
        imageUrl: "cnpaintings/621.jpg"
    },
    {
        id: 96,
        title: "流民图·局部",
        period: "近现代",
        author: "蒋兆和",
        description: "1943年作，以素描式水墨写日军铁蹄下难民百相，高2米、长27米，被誉为20世纪中国人物画史诗。",
        coverText: "蒋兆和·近现代",
        imageUrl: "cnpaintings/624.jpg"
    },
    {
        id: 97,
        title: "田横五百士",
        period: "近现代",
        author: "徐悲鸿",
        description: "油画巨构，取田横与五百壮士诀别，黄衣者自写其形，以古典寓意抒民族不屈与画家浩然正气。",
        coverText: "徐悲鸿·近现代",
        imageUrl: "cnpaintings/627.jpg"
    },
    {
        id: 98,
        title: "奔马图",
        period: "近现代",
        author: "徐悲鸿",
        description: "1948年冬写战马逆风疾驰，鬃尾飞扬，以写意笔法融解剖结构，寄寓迎接北平解放之喜悦与希望。",
        coverText: "徐悲鸿·近现代",
        imageUrl: "cnpaintings/629.jpg"
    },
    {
        id: 99,
        title: "江山如此多娇",
        period: "近现代",
        author: "傅抱石、关山月",
        description: "1959年合作巨幅，以毛泽东词意为魂，旭日东升，长城黄河尽收眼底，现悬人民大会堂，为新中国山水象征。",
        coverText: "傅抱石、关山月·近现代",
        imageUrl: "cnpaintings/632.jpg"
    },
    {
        id: 100,
        title: "开国大典",
        period: "近现代",
        author: "董希文",
        description: "1953年油画，写1949年10月1日天安门城楼宣告成立瞬间，人物群像庄严，历经两次修改后复原，藏国博。",
        coverText: "董希文·近现代",
        imageUrl: "cnpaintings/637.jpg"
    }
];

// 生成随机颜色（备用）
function getRandomColor() {
    const letters = 'BCDEF'; // 避免使用太暗的颜色
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

// 主函数 - 初始化画廊
function initGallery() {
    // 隐藏加载状态
    setTimeout(() => {
        document.getElementById('loading-indicator').style.display = 'none';
        renderFilters();
        renderGallery(famousPaintings);
    }, 800); // 模拟加载延迟
}

// 动态生成筛选按钮
function renderFilters() {
    const filtersContainer = document.getElementById('filters-container');
    
    // 获取所有朝代并去重
    const periods = [...new Set(famousPaintings.map(p => p.period))];
    periods.sort(); // 按朝代排序
    
    // 创建"全部"按钮
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = '全部';
    allBtn.dataset.type = 'all';
    allBtn.addEventListener('click', () => {
        applyFilter('all', null);
    });
    filtersContainer.appendChild(allBtn);
    
    // 创建朝代筛选按钮
    periods.forEach(period => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = period;
        btn.dataset.type = 'period';
        btn.dataset.value = period;
        btn.addEventListener('click', () => {
            applyFilter('period', period);
        });
        filtersContainer.appendChild(btn);
    });
}

// 应用筛选条件
function applyFilter(type, value) {
    // 重置所有筛选按钮样式
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 高亮当前选中的筛选按钮
    if (type === 'all') {
        document.querySelector('.filter-btn[data-type="all"]').classList.add('active');
    } else {
        document.querySelector(`.filter-btn[data-type="${type}"][data-value="${value}"]`).classList.add('active');
    }
    
    // 根据筛选条件过滤数据
    let filteredPaintings = famousPaintings;
    if (type === 'period' && value) {
        filteredPaintings = famousPaintings.filter(p => p.period === value);
    }
    
    // 重新渲染画廊
    renderGallery(filteredPaintings);
}

// 动态生成名画卡片
function renderGallery(paintings) {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = ''; // 清空容器
    
    if (paintings.length === 0) {
        // 如果没有匹配的作品，显示提示信息
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.style.textAlign = 'center';
        emptyState.style.padding = '50px 20px';
        emptyState.style.gridColumn = '1 / -1';
        emptyState.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 15px;">📚</div>
            <p style="font-size: 18px; color: #666;">暂无匹配的名画作品</p>
        `;
        galleryContainer.appendChild(emptyState);
        return;
    }
    
    // 动态生成画作卡片
    paintings.forEach(painting => {
        const card = document.createElement('div');
        card.className = 'art-card';
        
        // 为每个卡片添加动画延迟，实现错落有致的出现效果
        card.style.animationDelay = `${Math.random() * 0.5}s`;
        
        // 卡片内容
        card.innerHTML = `
            <div class="art-image">
                <img src="${painting.imageUrl}" alt="${painting.title}">
            </div>
            <div class="art-info">
                <h3 class="art-title">${painting.title}</h3>
                <div class="art-meta">
                    ${painting.period}
                    ${painting.author ? ` · ${painting.author}` : ''}
                    ${painting.type ? ` · ${painting.type}` : ''}
                </div>
                <p class="art-desc">${painting.description}</p>
                <div class="art-footer">
                    <span class="cover-text">${painting.coverText}</span>
                    <button class="details-btn" onclick="showPaintingDetails(${painting.id})">查看详情</button>
                </div>
            </div>
        `;
        
        galleryContainer.appendChild(card);
    });
}

// 显示画作详情
function showPaintingDetails(paintingId) {
    const painting = famousPaintings.find(p => p.id === paintingId);
    if (!painting) return;
    
    // 获取详情弹窗
    const modal = document.getElementById('detail-modal');
    const modalContent = document.getElementById('detail-content');
    
    // 更新弹窗内容
    modalContent.innerHTML = `
        <div class="detail-image">
            <img src="${painting.imageUrl}" alt="${painting.title}">
        </div>
        <div class="detail-info">
            <h2>${painting.title}</h2>
            <div class="meta">
                ${painting.period}
                ${painting.author ? ` · ${painting.author}` : ''}
                ${painting.type ? ` · ${painting.type}` : ''}
            </div>
            <div class="description">
                <h3>作品介绍</h3>
                <p>${painting.description}</p>
            </div>
        </div>
    `;
    
    // 显示弹窗
    modal.style.display = 'block';
    
    // 添加关闭弹窗的事件监听
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // 点击弹窗外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 防止点击弹窗内容时关闭
    modal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // 添加ESC键关闭
    document.addEventListener('keydown', handleEscKey);
    
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.style.display = 'none';
        document.removeEventListener('keydown', handleEscKey);
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', initGallery);