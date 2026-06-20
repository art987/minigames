const poemData = {
    categories: [
        {
            name: "人生无常",
            items: [
                {
                    expression: "时光流转",
                    poem: "古人今人若流水，共看明月皆如此",
                    dynasty: "唐代",
                    author: "李白",
                    source: "把酒问月・故人贾淳令予问之"
                },
                {
                    expression: "时过景同。",
                    poem: "今人不见古时月，今月曾经照古人",
                    dynasty: "唐代",
                    author: "李白",
                    source: "把酒问月・故人贾淳令予问之"
                },
                {
                    expression: "珍惜当下。",
                    poem: "浮生若梦，为欢几何",
                    dynasty: "唐代",
                    author: "李白",
                    source: "春夜宴从弟桃花园序"
                },
                {
                    expression: "感叹世事悲凉。",
                    poem: "天地一逆旅，同悲万古尘",
                    dynasty: "唐代",
                    author: "李白",
                    source: "拟古十二首・其九"
                },
                {
                    expression: "人生短暂",
                    poem: "人生一世间，飘若风过牖",
                    dynasty: "魏晋",
                    author: "徐干",
                    source: "室思诗六章・其三"
                },
                {
                    expression: "人世虚无",
                    poem: "百年过后 不过一抔黄土",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "繁华易逝",
                    poem: "三千繁华 弹指刹那",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "孤寂求索",
                    poem: "昨夜西风凋碧树，独上高楼，望尽天涯路",
                    dynasty: "宋",
                    author: "晏殊",
                    source: "蝶恋花・槛菊愁烟兰泣露"
                },
                {
                    expression: "暮春自嘲",
                    poem: "醉里插花花莫笑，可怜春似人将老",
                    dynasty: "宋",
                    author: "李清照",
                    source: "蝶恋花・上巳召亲族"
                },
                {
                    expression: "岁月无情",
                    poem: "最是人间留不住，朱颜辞镜花辞树",
                    dynasty: "清",
                    author: "王国维",
                    source: "蝶恋花・阅尽天涯离别苦"
                },
                {
                    expression: "人生不必追求完美",
                    poem: "自古人生最忌满，半贫半富半自安",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "漂泊孤寂",
                    poem: "壮年听雨客舟中，江阔云低，断雁叫西风",
                    dynasty: "宋",
                    author: "蒋捷",
                    source: "虞美人・听雨"
                },
                {
                    expression: "时光流逝",
                    poem: "知否，知否？应是绿肥红瘦",
                    dynasty: "宋",
                    author: "李清照",
                    source: "如梦令・昨夜雨疏风骤"
                },
                {
                    expression: "对世事变迁的感慨",
                    poem: "正是江南好风景，落花时节又逢君",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "江南逢李龟年"
                },
                {
                    expression: "身不由己",
                    poem: "长恨此身非我有，何时忘却营营",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "临江仙・夜饮东坡醒复醉"
                },
                {
                    expression: "沧桑难言",
                    poem: "欲说还休，却道天凉好个秋",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "丑奴儿・书博山道中壁"
                },
                {
                    expression: "物是人非",
                    poem: "欲买桂花同载酒，终不似，少年游",
                    dynasty: "宋",
                    author: "刘过",
                    source: "唐多令・芦叶满汀洲"
                },
                {
                    expression: "人生多艰",
                    poem: "欲渡黄河冰塞川，将登太行雪满山",
                    dynasty: "唐",
                    author: "李白",
                    source: "行路难・其一"
                },
                {
                    expression: "羁旅沧桑",
                    poem: "衣上征尘杂酒痕，远游无处不消魂",
                    dynasty: "宋",
                    author: "陆游",
                    source: "剑门道中遇微雨"
                },
                {
                    expression: "清贫难诺",
                    poem: "一身清贫怎敢入繁华，两袖清风怎敢误佳人",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "生活孤寂，借酒浇愁",
                    poem: "夜半浊酒慰寂寥，天明走马入红尘",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "内心的孤独",
                    poem: "相看两不厌，只有敬亭山",
                    dynasty: "唐",
                    author: "李白",
                    source: "独坐敬亭山"
                },
                {
                    expression: "危机暗涌",
                    poem: "溪云初起日沉阁，山雨欲来风满楼",
                    dynasty: "唐",
                    author: "许浑",
                    source: "咸阳城东楼"
                },
                {
                    expression: "人生如梦",
                    poem: "吾生梦幻间，何事绁尘羁",
                    dynasty: "魏晋",
                    author: "陶渊明",
                    source: "饮酒・其八"
                },
                {
                    expression: "物是人非",
                    poem: "无可奈何花落去，似曾相识燕归来",
                    dynasty: "宋",
                    author: "晏殊",
                    source: "浣溪沙・一曲新词酒一杯"
                },
                {
                    expression: "壮志未酬之感",
                    poem: "无边落木萧萧下，不尽长江滚滚来",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "登高"
                },
                {
                    expression: "借酒浇愁。",
                    poem: "我有一瓢酒，可以慰风尘",
                    dynasty: "唐",
                    author: "韦应物（存争议）",
                    source: ""
                },
                {
                    expression: "文才多舛",
                    poem: "文章憎命达，魑魅喜人过",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "天末怀李白"
                },
                {
                    expression: "释怀过往",
                    poem: "往事情怀酿成酒，换我余生长醉不复忧",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "同病相怜",
                    poem: "同是天涯沦落人，相逢何必曾相识",
                    dynasty: "唐",
                    author: "白居易",
                    source: "琵琶行"
                },
                {
                    expression: "人生短暂",
                    poem: "天地一逆旅，同悲万古尘",
                    dynasty: "唐",
                    author: "李白",
                    source: "春夜宴从弟桃花园序"
                },
                {
                    expression: "聚散匆匆",
                    poem: "桃李春风一杯酒，江湖夜雨十年灯",
                    dynasty: "宋",
                    author: "黄庭坚",
                    source: "寄黄几复"
                },
                {
                    expression: "分道扬镳",
                    poem: "桃花与柳不同春，自此天涯陌路人",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "世事无常",
                    poem: "事如芳草春常在，人似浮云影不留",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "鹧鸪天・和人韵有所赠"
                },
                {
                    expression: "世态炎凉",
                    poem: "世味年来薄似纱，谁令骑马客京华",
                    dynasty: "宋",
                    author: "陆游",
                    source: "临安春雨初霁"
                },
                {
                    expression: "浮生若梦",
                    poem: "世事一场大梦，人生几度秋凉",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "西江月・世事一场大梦"
                },
                {
                    expression: "前途未卜",
                    poem: "世事茫茫难自料，春愁黯黯独成眠",
                    dynasty: "唐",
                    author: "韦应物",
                    source: "寄李儋元锡"
                },
                {
                    expression: "浮生若梦",
                    poem: "世事漫随流水，算来一梦浮生",
                    dynasty: "五代",
                    author: "李煜",
                    source: "乌夜啼・昨夜风兼雨"
                },
                {
                    expression: "世态炎凉",
                    poem: "世事短如春梦，人情薄似秋云",
                    dynasty: "宋",
                    author: "朱敦儒",
                    source: "西江月・世事短如春梦"
                },
                {
                    expression: "世事无常",
                    poem: "世间行乐亦如此，古来万事东流水",
                    dynasty: "唐",
                    author: "李白",
                    source: "梦游天姥吟留别"
                },
                {
                    expression: "慧眼难寻",
                    poem: "时人不识凌云木，直待凌云始道高",
                    dynasty: "唐",
                    author: "杜荀鹤",
                    source: "小松"
                },
                {
                    expression: "荒唐岁月",
                    poem: "十年一觉扬州梦，赢得青楼薄幸名",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "遣怀"
                },
                {
                    expression: "贪悔交织",
                    poem: "身后有余忘缩手，眼前无路想回头",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・第二回"
                },
                {
                    expression: "年少轻狂",
                    poem: "少年听雨歌楼上，红烛昏罗帐",
                    dynasty: "宋",
                    author: "蒋捷",
                    source: "虞美人・听雨"
                },
                {
                    expression: "年少轻狂",
                    poem: "少年不识愁滋味，爱上层楼。爱上层楼，为赋新词强说愁",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "丑奴儿・书博山道中壁"
                },
                {
                    expression: "年少轻狂",
                    poem: "少年不识愁滋味，爱上层楼",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "丑奴儿・书博山道中壁"
                },
                {
                    expression: "彻底别过",
                    poem: "山鸟与鱼不同路，从此山水不相逢",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "世事无常",
                    poem: "三千繁华，弹指刹那，百年过后，不过一抔黄土",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "世事无常",
                    poem: "人有悲欢离合，月有阴晴圆缺",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "水调歌头・明月几时有"
                },
                {
                    expression: "人生短暂",
                    poem: "人生一世，草生一春，来如风雨，去似微尘",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "初心难守",
                    poem: "人生若只如初见，何事秋风悲画扇",
                    dynasty: "清",
                    author: "纳兰性德",
                    source: "木兰词・拟古决绝词柬友"
                },
                {
                    expression: "豁达漂泊",
                    poem: "人生如逆旅，我亦是行人",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "临江仙・送钱穆父"
                },
                {
                    expression: "漂泊无痕",
                    poem: "人生到处知何似，应似飞鸿踏雪泥",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "和子由渑池怀旧"
                },
                {
                    expression: "聚少离多",
                    poem: "人生不相见，动如参与商",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "赠卫八处士"
                },
                {
                    expression: "机缘各异",
                    poem: "人间四月芳菲尽，山寺桃花始盛开",
                    dynasty: "唐",
                    author: "白居易",
                    source: "大林寺桃花"
                },
                {
                    expression: "别后经年",
                    poem: "去年花里逢君别，今日花开又一年",
                    dynasty: "唐",
                    author: "韦应物",
                    source: "寄李儋元锡"
                },
                {
                    expression: "世事变迁",
                    poem: "青山依旧在，几度夕阳红",
                    dynasty: "明",
                    author: "杨慎",
                    source: "临江仙・滚滚长江东逝水"
                },
                {
                    expression: "坚持到底",
                    poem: "千淘万漉虽辛苦，吹尽狂沙始到金",
                    dynasty: "唐",
                    author: "刘禹锡",
                    source: "浪淘沙・其八"
                },
                {
                    expression: "历史长河",
                    poem: "千古兴亡多少事？悠悠。不尽长江滚滚流",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "南乡子・登京口北固亭有怀"
                },
                {
                    expression: "奔波一生",
                    poem: "平生塞北江南，归来华发苍颜",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "清平乐・独宿博山王氏庵"
                },
                {
                    expression: "漂泊无依",
                    poem: "飘飘何所似，天地一沙鸥",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "旅夜书怀"
                },
                {
                    expression: "对人生的思考和对亲人的思念",
                    poem: "明月几时有？把酒问青天",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "水调歌头・明月几时有"
                },
                {
                    expression: "字字血泪",
                    poem: "满纸荒唐言，一把辛酸泪",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・第一回"
                },
                {
                    expression: "盛衰无常",
                    poem: "旧时王谢堂前燕，飞入寻常百姓家",
                    dynasty: "唐",
                    author: "刘禹锡",
                    source: "乌衣巷"
                },
                {
                    expression: "惘然追忆",
                    poem: "锦瑟无端五十弦，一弦一柱思华年",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "锦瑟"
                },
                {
                    expression: "英雄辈出",
                    poem: "江山如画，一时多少豪杰",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "念奴娇・赤壁怀古"
                },
                {
                    expression: "人才辈出",
                    poem: "江山代有才人出，各领风骚数百年",
                    dynasty: "清",
                    author: "赵翼",
                    source: "论诗五首・其二"
                },
                {
                    expression: "弄巧成拙",
                    poem: "机关算尽太聪明，反误了卿卿性命",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・第五回"
                },
                {
                    expression: "惜时如金",
                    poem: "花有重开日，人无再少年",
                    dynasty: "元",
                    author: "关汉卿（存争议）",
                    source: ""
                },
                {
                    expression: "浮生若梦",
                    poem: "何须更问人间事，只此浮生是梦中",
                    dynasty: "唐",
                    author: "吕岩",
                    source: "绝句"
                },
                {
                    expression: "孤高落寞",
                    poem: "冠盖满京华，斯人独憔悴",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "梦李白二首・其二"
                },
                {
                    expression: "时光荏苒",
                    poem: "浮云一别后，流水十年间",
                    dynasty: "唐",
                    author: "韦应物",
                    source: "淮上喜会梁川故人"
                },
                {
                    expression: "及时行乐",
                    poem: "浮生若梦，为欢几何？",
                    dynasty: "唐",
                    author: "李白",
                    source: "春夜宴从弟桃花园序"
                },
                {
                    expression: "人生如梦",
                    poem: "浮生若梦，为欢几何",
                    dynasty: "唐",
                    author: "李白",
                    source: "春夜宴从弟桃花园序"
                },
                {
                    expression: "旧景难寻",
                    poem: "二十四桥明月夜，玉人何处教吹箫",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "寄扬州韩绰判官"
                },
                {
                    expression: "暮年沧桑",
                    poem: "而今听雨僧庐下，鬓已星星也",
                    dynasty: "宋",
                    author: "蒋捷",
                    source: "虞美人・听雨"
                },
                {
                    expression: "沧桑难言",
                    poem: "而今识尽愁滋味，欲说还休",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "丑奴儿・书博山道中壁"
                },
                {
                    expression: "壮志未酬",
                    poem: "多情应笑我，早生华发",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "念奴娇・赤壁怀古"
                },
                {
                    expression: "偶然定局",
                    poem: "东风不与周郎便，铜雀春深锁二乔",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "赤壁"
                },
                {
                    expression: "往事如烟",
                    poem: "当时明月在，曾照彩云归",
                    dynasty: "宋",
                    author: "晏几道",
                    source: "临江仙・梦后楼台高锁"
                },
                {
                    expression: "历史洪流",
                    poem: "大江东去，浪淘尽，千古风流人物",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "念奴娇・赤壁怀古"
                },
                {
                    expression: "半生辛酸",
                    poem: "错把陈醋当成墨，写尽半生纸上酸",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "各自安好",
                    poem: "从此音尘各悄然，春山如黛草如烟",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "追悔莫及",
                    poem: "此情可待成追忆，只是当时已惘然",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "锦瑟"
                },
                {
                    expression: "良辰易逝",
                    poem: "春宵一刻值千金，花有清香月有阴",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "春宵"
                },
                {
                    expression: "生生不息",
                    poem: "沉舟侧畔千帆过，病树前头万木春",
                    dynasty: "唐",
                    author: "刘禹锡",
                    source: "酬乐天扬州初逢席上见赠"
                },
                {
                    expression: "对金钱重要性的无奈感慨。",
                    poem: "茶若醉人何须酒，唯有碎银解千愁",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "缥缈遗恨",
                    poem: "沧海月明珠有泪，蓝田日暖玉生烟",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "锦瑟"
                },
                {
                    expression: "蜜蜂勤劳却无人怜惜的叹惋。",
                    poem: "采得百花成蜜后，为谁辛苦为谁甜？",
                    dynasty: "唐",
                    author: "罗隐",
                    source: "蜂"
                },
                {
                    expression: "磨砺成才的精神",
                    poem: "不经一番寒彻骨，怎得梅花扑鼻香",
                    dynasty: "唐",
                    author: "黄蘖禅师",
                    source: "上堂开示颂"
                },
                {
                    expression: "人生如梦感叹",
                    poem: "毕竟几人真得鹿，不知终日梦为鱼",
                    dynasty: "宋",
                    author: "黄庭坚",
                    source: "杂诗七首・其一"
                },
                {
                    expression: "岁月蹉跎、理想未竟的哀愁。",
                    poem: "白发癫狂尘梦断，青丝冷落灯下勤",
                    dynasty: "",
                    author: "",
                    source: ""
                },
            ]
        },
        {
            name: "人生无奈",
            items: [
                {
                    expression: "人生如梦",
                    poem: "世事漫随流水，算来一梦浮生",
                    dynasty: "五代十国",
                    author: "李煜",
                    source: "乌夜啼・昨夜风兼雨"
                },
                {
                    expression: "坚强前行",
                    poem: "生如逆旅，一苇以航",
                    dynasty: "现代化用（原句 “人生如逆旅，我亦是行人”）",
                    author: "苏轼（原句）",
                    source: "临江仙・送钱穆父"
                },
                {
                    expression: "人生无常",
                    poem: "人有悲欢离合，月有阴晴圆缺",
                    dynasty: "宋代",
                    author: "苏轼",
                    source: "水调歌头・明月几时有"
                },
                {
                    expression: "人生短暂与无常",
                    poem: "世事一场大梦，人生几度秋凉",
                    dynasty: "宋代",
                    author: "苏轼",
                    source: "西江月・世事一场大梦"
                },
                {
                    expression: "人生短暂，来去匆匆",
                    poem: "人生一世，草生一春，来如风雨，去似微尘",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "心中伤悲",
                    poem: "醉后不知身是客，一晌贪欢",
                    dynasty: "南唐",
                    author: "李煜",
                    source: "浪淘沙令・帘外雨潺潺"
                },
                {
                    expression: "愁重难载的心情",
                    poem: "只恐双溪舴艋舟，载不动许多愁",
                    dynasty: "宋",
                    author: "李清照",
                    source: "武陵春・春晚"
                },
                {
                    expression: "愁深难述的心情",
                    poem: "这次第，怎一个愁字了得！",
                    dynasty: "宋",
                    author: "李清照",
                    source: "声声慢・寻寻觅觅"
                },
                {
                    expression: "暮年孤寂的心情",
                    poem: "雨中黄叶树，灯下白头人",
                    dynasty: "唐",
                    author: "司空曙",
                    source: "喜外弟卢纶见宿"
                },
                {
                    expression: "青春流逝的感伤",
                    poem: "雨打梨花深闭门，忘了青春，误了青春",
                    dynasty: "明",
                    author: "唐寅",
                    source: "一剪梅・雨打梨花深闭门"
                },
                {
                    expression: "风尘沧桑的心情",
                    poem: "一双玉臂千人枕，半点朱唇万客尝",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "奢靡误国",
                    poem: "一骑红尘妃子笑，无人知是荔枝来",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "过华清宫绝句三首・其一"
                },
                {
                    expression: "红颜薄命",
                    poem: "一朝春尽红颜老，花落人亡两不知",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・葬花吟"
                },
                {
                    expression: "孤寂凄苦",
                    poem: "寻寻觅觅，冷冷清清，凄凄惨惨戚戚",
                    dynasty: "宋",
                    author: "李清照",
                    source: "声声慢・寻寻觅觅"
                },
                {
                    expression: "心酸至极",
                    poem: "心酸纵有千百种，沉默不语最难过",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "睹物伤情",
                    poem: "物是人非事事休，欲语泪先流",
                    dynasty: "宋",
                    author: "李清照",
                    source: "武陵春・春晚"
                },
                {
                    expression: "愁绪缠绵",
                    poem: "梧桐更兼细雨，到黄昏、点点滴滴",
                    dynasty: "宋",
                    author: "李清照",
                    source: "声声慢・寻寻觅觅"
                },
                {
                    expression: "孤寂无人问",
                    poem: "无人与我立黄昏，无人问我粥可温",
                    dynasty: "清",
                    author: "沈复化用自",
                    source: "浮生六记"
                },
                {
                    expression: "愁绪绵长",
                    poem: "问君能有几多愁？恰似一江春水向东流",
                    dynasty: "南唐",
                    author: "李煜",
                    source: "虞美人・春花秋月何时了"
                },
                {
                    expression: "孤独寂寞",
                    poem: "庭院深深深几许，杨柳堆烟，帘幕无重数",
                    dynasty: "宋",
                    author: "欧阳修",
                    source: "蝶恋花・庭院深深深几许"
                },
                {
                    expression: "离别凄凉，时光易老。",
                    poem: "衰兰送客咸阳道，天若有情天亦老",
                    dynasty: "唐",
                    author: "李贺",
                    source: "金铜仙人辞汉歌"
                },
                {
                    expression: "愁绪万千",
                    poem: "试问闲愁都几许？一川烟草，满城风絮",
                    dynasty: "宋",
                    author: "贺铸",
                    source: "青玉案・凌波不过横塘路"
                },
                {
                    expression: "世间凉薄",
                    poem: "世情薄，人情恶，雨送黄昏花易落",
                    dynasty: "宋",
                    author: "唐婉",
                    source: "钗头凤・世情薄"
                },
                {
                    expression: "悲难描摹",
                    poem: "世间无限丹青手，一片伤心画不成",
                    dynasty: "唐",
                    author: "高蟾",
                    source: "金陵晚望"
                },
                {
                    expression: "两难抉择无奈",
                    poem: "世间安得双全法，不负如来不负卿",
                    dynasty: "清",
                    author: "仓央嘉措",
                    source: ""
                },
                {
                    expression: "感恩父母的心情",
                    poem: "谁言寸草心，报得三春晖",
                    dynasty: "唐",
                    author: "孟郊",
                    source: "游子吟"
                },
                {
                    expression: "无疾而终情境",
                    poem: "曲未终，人已散，酒未醉，心已碎",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "孤独冷清。",
                    poem: "千山鸟飞绝，万径人踪灭",
                    dynasty: "唐",
                    author: "柳宗元",
                    source: "江雪"
                },
                {
                    expression: "战争残酷",
                    poem: "凭君莫话封侯事，一将功成万骨枯",
                    dynasty: "唐",
                    author: "曹松",
                    source: "己亥岁二首・僖宗广明元年"
                },
                {
                    expression: "触景伤情",
                    poem: "满目山河空念远，落花风雨更伤春",
                    dynasty: "宋",
                    author: "晏殊",
                    source: "浣溪沙・一向年光有限身"
                },
                {
                    expression: "形单影只",
                    poem: "落花人独立，微雨燕双飞",
                    dynasty: "宋",
                    author: "晏几道",
                    source: "临江仙・梦后楼台高锁"
                },
                {
                    expression: "迷茫孤独",
                    poem: "今夜不知何处宿，平沙万里绝人烟",
                    dynasty: "唐",
                    author: "岑参",
                    source: "碛中作"
                },
                {
                    expression: "孤独坚守。",
                    poem: "拣尽寒枝不肯栖，寂寞沙洲冷",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "卜算子・黄州定慧院寓居作"
                },
                {
                    expression: "孤独前行",
                    poem: "后来烟雨皆散尽，无人撑伞一人行",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "孤傲相伴",
                    poem: "何时仗尔看南雪，我与梅花两白头",
                    dynasty: "清",
                    author: "查辛香",
                    source: "清稗类钞"
                },
                {
                    expression: "秋思成愁",
                    poem: "何处合成愁？离人心上秋",
                    dynasty: "宋",
                    author: "吴文英",
                    source: "唐多令・惜别"
                },
                {
                    expression: "凄美孤寂",
                    poem: "寒塘渡鹤影，冷月葬花魂",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・第七十六回"
                },
                {
                    expression: "秋思断肠",
                    poem: "多情自古伤离别，更那堪冷落清秋节",
                    dynasty: "宋",
                    author: "柳永",
                    source: "雨霖铃・寒蝉凄切"
                },
                {
                    expression: "愁绪难解",
                    poem: "抽刀断水水更流，举杯消愁愁更愁",
                    dynasty: "唐",
                    author: "李白",
                    source: "宣州谢朓楼饯别校书叔云"
                },
                {
                    expression: "世事不公",
                    poem: "遍身罗绮者，不是养蚕人",
                    dynasty: "宋",
                    author: "张俞",
                    source: "蚕妇"
                },
                {
                    expression: "人心难测",
                    poem: "白首相知犹按剑，朱门先达笑弹冠",
                    dynasty: "唐",
                    author: "王维",
                    source: "酌酒与裴迪"
                },
                {
                    expression: "归根与归属",
                    poem: "树高千丈叶落归根",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "细致与全面",
                    poem: "麻雀虽小五脏俱全",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "忽略与发现",
                    poem: "远在天边近在眼前",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "遗憾与无奈",
                    poem: "落花有意流水无情",
                    dynasty: "唐",
                    author: "刘禹锡",
                    source: "竹枝词九首・其二"
                },
            ]
        },
        {
            name: "看淡得失",
            items: [
                {
                    expression: "释然爱恨",
                    poem: "世界微尘里，吾宁爱与恨",
                    dynasty: "唐代",
                    author: "李商隐",
                    source: "北青萝"
                },
                {
                    expression: "感慨孤独",
                    poem: "万卷古今消永日，一窗昏晓送流年",
                    dynasty: "宋代",
                    author: "陆游",
                    source: "题老学庵壁"
                },
                {
                    expression: "超脱豁达",
                    poem: "淡看人生三千事，闲来轻笑两三声",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "不计得失",
                    poem: "人生得丧何须计，一任浮云过眼来",
                    dynasty: "宋代",
                    author: "蔡格",
                    source: "山居十三首・其五"
                },
                {
                    expression: "享受当下",
                    poem: "莫思身外无穷事，且尽生前有限杯",
                    dynasty: "唐代",
                    author: "杜牧",
                    source: "九日齐山登高"
                },
                {
                    expression: "美好易逝",
                    poem: "一夜梨云空有梦，二分明月已如烟",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "远离尘世",
                    poem: "小舟从此逝，江海寄余生",
                    dynasty: "宋代",
                    author: "苏轼",
                    source: "临江仙・夜饮东坡醒复醉"
                },
                {
                    expression: "世间虚幻",
                    poem: "世间行乐亦如此，古来万事东流水",
                    dynasty: "唐代",
                    author: "李白",
                    source: "梦游天姥吟留别"
                },
                {
                    expression: "闲适生活",
                    poem: "世事浮云何足问，不如高卧且加餐",
                    dynasty: "唐代",
                    author: "王维",
                    source: "酌酒与裴迪"
                },
                {
                    expression: "人难长留",
                    poem: "事如芳草春常在，人似浮云影不留",
                    dynasty: "宋代",
                    author: "辛弃疾",
                    source: "鹧鸪天・和人韵有所赠"
                },
                {
                    expression: "自在闲适",
                    poem: "山中何事，松花酿酒，春水煎茶",
                    dynasty: "元代",
                    author: "张可久",
                    source: "人月圆・山中书事"
                },
                {
                    expression: "处处自由",
                    poem: "此身天地一虚舟，何处江山不自由",
                    dynasty: "明代",
                    author: "张煌言",
                    source: "甲辰九月狱中感怀三首・其一"
                },
                {
                    expression: "人生短暂",
                    poem: "浮生暂寄梦中梦，世事如闻风里风",
                    dynasty: "唐代",
                    author: "李群玉",
                    source: "自遣"
                },
                {
                    expression: "远离俗事",
                    poem: "逢人不说人间事，便是人间无事人",
                    dynasty: "唐代",
                    author: "杜荀鹤",
                    source: "赠质上人"
                },
                {
                    expression: "无喜无忧",
                    poem: "陶然无喜亦无忧，人生且自由",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "超然物外",
                    poem: "回首向来萧瑟处，归去，也无风雨也无晴",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "定风波・莫听穿林打叶声"
                },
                {
                    expression: "内心安宁",
                    poem: "心无事，如山泉自留。念无忧，恰一叶知秋",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "浪迹天涯",
                    poem: "小舟从此逝，江海寄余生",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "临江仙・夜饮东坡醒复醉"
                },
                {
                    expression: "隐忍是非",
                    poem: "是非入耳君须忍，半作痴呆半作聋",
                    dynasty: "明",
                    author: "唐寅",
                    source: "警世"
                },
                {
                    expression: "超脱世事",
                    poem: "世事浮云何足问，不如高卧且加餐",
                    dynasty: "唐",
                    author: "王维",
                    source: "酌酒与裴迪"
                },
                {
                    expression: "超脱爱恨",
                    poem: "世界微尘里，吾宁爱与恨",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "北青萝"
                },
                {
                    expression: "淡然处之",
                    poem: "人生海海，山山而川，不过尔尔",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "超脱纷扰",
                    poem: "逢人不说人间事，便是人间无事人",
                    dynasty: "唐",
                    author: "杜荀鹤",
                    source: "赠质上人"
                },
                {
                    expression: "豁达乐观",
                    poem: "淡看人生三千事，闲来轻笑两三声",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "舍不得你，却留不住你",
                    poem: "本是青灯不归客，却因浊酒恋红尘",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "看淡世事",
                    poem: "悲欢离合总无情，一任阶前点滴到天明",
                    dynasty: "宋",
                    author: "蒋捷",
                    source: "虞美人・听雨"
                },
            ]
        },
        {
            name: "乐观豁达",
            items: [
                {
                    expression: "终能成功",
                    poem: "长风破浪会有时，直挂云帆济沧海",
                    dynasty: "唐代",
                    author: "李白",
                    source: "行路难・其一"
                },
                {
                    expression: "乐观不愁",
                    poem: "风力掀天浪打头，只须一笑不须愁",
                    dynasty: "宋代",
                    author: "杨万里",
                    source: "闷歌行十二首・其五"
                },
                {
                    expression: "永不放弃",
                    poem: "纵有疾风起，人生不言弃",
                    dynasty: "法国",
                    author: "瓦雷里",
                    source: "海滨墓园"
                },
                {
                    expression: "坚韧不拔",
                    poem: "千磨万击还坚劲，任尔东西南北风",
                    dynasty: "清代",
                    author: "郑燮",
                    source: "竹石"
                },
                {
                    expression: "豪迈无畏",
                    poem: "纵横千里独行容，何惧前路雨潇潇",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "不被迷惑",
                    poem: "不畏浮云遮望眼，自缘身在最高层",
                    dynasty: "宋代",
                    author: "王安石",
                    source: "登飞来峰"
                },
                {
                    expression: "磨难出成功",
                    poem: "不经一番寒彻骨，怎得梅花扑鼻香",
                    dynasty: "唐代",
                    author: "黄蘖禅师",
                    source: "上堂开示颂"
                },
                {
                    expression: "未来有希望",
                    poem: "关关难过关关过，前路漫漫亦灿灿",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "终迎光明",
                    poem: "莫道浮云终蔽日，总有云开雾散时",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "莫愁前路",
                    poem: "莫愁千里路，自有到来风",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "四季皆美",
                    poem: "四时有不谢之花，八节有长青之草",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "苦尽甘来",
                    poem: "苦尽甘来终有时，一路向阳待花期",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "坚守正直",
                    poem: "青山尚且直如弦，人生孤立何伤焉？",
                    dynasty: "明代",
                    author: "于谦",
                    source: "北风吹"
                },
                {
                    expression: "迷茫有归",
                    poem: "漫漫迷途，终有一归",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "乐观面对",
                    poem: "沉舟侧畔千帆过，病树前头万木春",
                    dynasty: "唐代",
                    author: "刘禹锡",
                    source: "酬乐天扬州初逢席上见赠"
                },
                {
                    expression: "相信磨难之后终将成功",
                    poem: "千淘万漉虽辛苦，吹尽狂沙始到金",
                    dynasty: "唐代",
                    author: "刘禹锡",
                    source: "浪淘沙・其八"
                },
                {
                    expression: "相信坚守必有希望",
                    poem: "桃李盛时虽寂寞，雪霜多后始青葱",
                    dynasty: "宋代",
                    author: "王禹偁",
                    source: "春居杂兴二首・其二"
                },
                {
                    expression: "逆境有希望",
                    poem: "人有逆天之时，天无绝人之路",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "磨难担重任",
                    poem: "故天将降大任于是人也",
                    dynasty: "战国",
                    author: "孟子及其弟子",
                    source: "生于忧患，死于安乐"
                },
                {
                    expression: "永不言弃",
                    poem: "纵有疾风起，人生不言弃",
                    dynasty: "法国",
                    author: "瓦雷里",
                    source: "海滨墓园"
                },
                {
                    expression: "无畏前行",
                    poem: "纵横千里独行容，何惧前路雨潇潇",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "希望将至",
                    poem: "总有人间一两风，填我十万八千梦",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "旷达超脱",
                    poem: "竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "定风波・莫听穿林打叶声"
                },
                {
                    expression: "豁达释怀",
                    poem: "枝上柳绵吹又少，天涯何处无芳草",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "蝶恋花・春景"
                },
                {
                    expression: "苦中作乐",
                    poem: "殷勤昨夜三更雨，又得浮生一日凉",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "鹧鸪天・林断山明竹隐墙"
                },
                {
                    expression: "追逐梦想",
                    poem: "以梦为马，不负韶华",
                    dynasty: "现代",
                    author: "海子",
                    source: "以梦为马"
                },
                {
                    expression: "坦荡洒脱",
                    poem: "一点浩然气，千里快哉风",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "水调歌头・黄州快哉亭赠张偓佺"
                },
                {
                    expression: "追逐向往",
                    poem: "心之所向，素履以往",
                    dynasty: "现代",
                    author: "七堇年",
                    source: "尘曲"
                },
                {
                    expression: "狂放不羁",
                    poem: "我本楚狂人，凤歌笑孔丘",
                    dynasty: "唐",
                    author: "李白",
                    source: "庐山谣寄卢侍御虚舟"
                },
                {
                    expression: "自信洒脱",
                    poem: "天生我材必有用，千金散尽还复来",
                    dynasty: "唐",
                    author: "李白",
                    source: "将进酒"
                },
                {
                    expression: "苦尽甘来",
                    poem: "他日卧龙终得雨，今朝放鹤且冲天",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "随遇而安",
                    poem: "试问岭南应不好，却道：此心安处是吾乡",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "定风波・南海归赠王定国侍人寓娘"
                },
                {
                    expression: "自有出路",
                    poem: "山高自有客行路，水深自有渡船人",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "从容生活",
                    poem: "且行且看且从容，且停且忘且随风",
                    dynasty: "现代",
                    author: "杨绛",
                    source: ""
                },
                {
                    expression: "抛却烦恼",
                    poem: "且将烦恼抛春水，未泯童心放纸鸢",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "前路可期",
                    poem: "鹏北海，凤朝阳。又携书剑路茫茫",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "鹧鸪天・送廓之秋试"
                },
                {
                    expression: "男儿壮志",
                    poem: "男儿不展风云志，空负天生八尺躯",
                    dynasty: "明",
                    author: "冯梦龙",
                    source: "警世通言・卷四十"
                },
                {
                    expression: "从容不迫",
                    poem: "莫听穿林打叶声，何妨吟啸且徐行",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "定风波・莫听穿林打叶声"
                },
                {
                    expression: "未来可期",
                    poem: "即今江海一归客，他日云霄万里人",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "超然豁达",
                    poem: "回首向来萧瑟处，归去，也无风雨也无晴",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "定风波・莫听穿林打叶声"
                },
                {
                    expression: "勇往直前",
                    poem: "关关难过关关过，前路漫漫亦灿灿",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "壮志豪情",
                    poem: "浮舟沧海，立马昆仑",
                    dynasty: "近代",
                    author: "周恩来",
                    source: ""
                },
                {
                    expression: "进取之心",
                    poem: "欲穷千里目，更上一层楼",
                    dynasty: "唐",
                    author: "王之涣",
                    source: "登鹳雀楼"
                },
                {
                    expression: "笑对困境",
                    poem: "风雪压我两三年，我笑风轻雪如棉",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "豪情壮志",
                    poem: "仰天大笑出门去，我辈岂是蓬蒿人",
                    dynasty: "唐",
                    author: "李白",
                    source: "南陵别儿童入京"
                },
                {
                    expression: "豪气冲天",
                    poem: "兴酣落笔摇五岳，诗成笑傲凌沧洲",
                    dynasty: "唐",
                    author: "李白",
                    source: "江上吟"
                },
                {
                    expression: "重振旗鼓",
                    poem: "此身天地一虚舟，何处江山不自由",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "金榜题名",
                    poem: "春风得意马蹄疾，一日看尽长安花",
                    dynasty: "唐",
                    author: "孟郊",
                    source: "登科后"
                },
                {
                    expression: "乘风破浪",
                    poem: "九万里风鹏正举。风休住，蓬舟吹取三山去！",
                    dynasty: "宋",
                    author: "李清照",
                    source: "渔家傲・天接云涛连晓雾"
                },
                {
                    expression: "胸怀天下",
                    poem: "会当凌绝顶，一览众山小",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "望岳"
                },
                {
                    expression: "借势而为",
                    poem: "好风凭借力，送我上青云",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・柳絮词・临江仙"
                },
                {
                    expression: "壮志凌云",
                    poem: "大鹏一日同风起，扶摇直上九万里",
                    dynasty: "唐",
                    author: "李白",
                    source: "上李邕"
                },
                {
                    expression: "强作豁达",
                    poem: "醉里且贪欢笑，要愁那得工夫",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "西江月・遣兴"
                },
            ]
        },
        {
            name: "与世无争",
            items: [
                {
                    expression: "享受当下",
                    poem: "春有百花秋有月，夏有凉风冬有雪",
                    dynasty: "宋代",
                    author: "无门慧开禅师",
                    source: "颂古五十五首·其一"
                },
                {
                    expression: "闲适之人可尽情享受",
                    poem: "江山风月本无常主，闲者便是主人",
                    dynasty: "宋代",
                    author: "苏轼",
                    source: "临皋闲题"
                },
                {
                    expression: "时光流转",
                    poem: "连雨不知春去，一晴方觉夏深",
                    dynasty: "唐代",
                    author: "范成大",
                    source: "喜晴"
                },
                {
                    expression: "闲适的心情",
                    poem: "无意带将花数朵，竟挑蝴蝶下山来",
                    dynasty: "清代",
                    author: "朱景素",
                    source: "樵夫词"
                },
                {
                    expression: "闲适心境",
                    poem: "人闲桂花落，夜静春山空。月出惊山鸟，时鸣春涧中",
                    dynasty: "唐代",
                    author: "王维",
                    source: "鸟鸣涧"
                },
                {
                    expression: "悠闲时光",
                    poem: "林下光阴无一事，水边窗户有余凉",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "慢享时光",
                    poem: "烂漫不过世间花，慢煮光阴一盏茶",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "悠然看待岁月变迁",
                    poem: "慢品人间烟火色，闲观万事岁月长",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "以积极心态面对日常",
                    poem: "时光煮雨岁月缝花，以欢喜心慢渡日常",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "沉醉自然之趣",
                    poem: "晴山看不厌，流水趣何长",
                    dynasty: "唐代",
                    author: "钱起",
                    source: "陪考功王员外城东池亭宴"
                },
                {
                    expression: "对生活充满期待",
                    poem: "日出有盼，日落有念，心有所期，忙而不茫",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "希望时光平静",
                    poem: "时光清浅一步一安然",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "内心有美好的精神世界",
                    poem: "心有半亩花田，藏于世俗人间",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "认为人生皆虚幻",
                    poem: "一枕清风梦绿萝，人生随处是南柯",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "悠然自在的人生态度",
                    poem: "一壶清茶许流年，半卷闲书慰平生",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "从容淡定的心境",
                    poem: "行到水穷处，坐看云起时",
                    dynasty: "唐代",
                    author: "王维",
                    source: "终南别业"
                },
                {
                    expression: "闲适情景",
                    poem: "与谁同坐，明月清风我",
                    dynasty: "宋代",
                    author: "苏轼",
                    source: "点绛唇·闲倚胡床"
                },
                {
                    expression: "出趣味的生活场景",
                    poem: "竹月光中诗世界，松风影里酒生涯",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "在自然中的美妙感受",
                    poem: "掬水月在手，弄花香满衣",
                    dynasty: "唐代",
                    author: "于良史",
                    source: "春山夜月"
                },
                {
                    expression: "对山野生活的向往",
                    poem: "山野万万里，余生路漫漫。日暮杯酒淡饭，一半一半",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "内心豁达不与世俗纷争",
                    poem: "心有山水不造作，静而不争远是非",
                    dynasty: "",
                    author: "",
                    source: ""
                },
            ]
        },
        {
            name: "哲理",
            items: [
                {
                    expression: "实践出真知",
                    poem: "纸上得来终觉浅，绝知此事要躬行",
                    dynasty: "宋",
                    author: "陆游",
                    source: "冬夜读书示子聿"
                },
                {
                    expression: "缺一不可",
                    poem: "有梅无雪不精神，有雪无诗俗了人",
                    dynasty: "宋",
                    author: "卢梅坡",
                    source: "雪梅・其二"
                },
                {
                    expression: "接纳人生",
                    poem: "物随物蔽，尘随尘交，人生顺逆，皆是馈赠",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "坚守原则",
                    poem: "无为其所不为，无欲其所不欲",
                    dynasty: "战国",
                    author: "孟子",
                    source: ""
                },
                {
                    expression: "天道无情",
                    poem: "天若有情天亦老，人间正道是沧桑",
                    dynasty: "唐",
                    author: "李贺",
                    source: "金铜仙人辞汉歌"
                },
                {
                    expression: "厚积薄发",
                    poem: "桃李盛时虽寂寞，雪霜多后始青葱",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "题小松"
                },
                {
                    expression: "处世之道",
                    poem: "世事洞明皆学问，人情练达即文章",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・第五回"
                },
                {
                    expression: "绝处逢生",
                    poem: "山重水复疑无路，柳暗花明又一村",
                    dynasty: "宋",
                    author: "陆游",
                    source: "游山西村"
                },
                {
                    expression: "深沉者内敛",
                    poem: "浅水喧闹，深潭无波",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "各有所长",
                    poem: "梅须逊雪三分白，雪却输梅一段香",
                    dynasty: "宋",
                    author: "卢梅坡",
                    source: "雪梅・其一"
                },
                {
                    expression: "终有归宿",
                    poem: "漫漫迷途，终有一归",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "先机占尽",
                    poem: "近水楼台先得月，向阳花木易为春",
                    dynasty: "宋",
                    author: "苏麟",
                    source: "断句"
                },
                {
                    expression: "反观自身",
                    poem: "睫在眼前长不见，道非身外更何求",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "登池州九峰楼寄张祜"
                },
                {
                    expression: "虚实难辨",
                    poem: "假作真时真亦假，无为有处有还无",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・第一回"
                },
                {
                    expression: "视角多变",
                    poem: "横看成岭侧成峰，远近高低各不同",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "题西林壁"
                },
                {
                    expression: "修身立志",
                    poem: "非淡泊无以明志，非宁静无以致远",
                    dynasty: "三国",
                    author: "蜀・诸葛亮",
                    source: "诫子书"
                },
                {
                    expression: "当局者迷",
                    poem: "不识庐山真面目，只缘身在此山中",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "题西林壁"
                },
                {
                    expression: "智谋与远见",
                    poem: "运筹帷幄决胜千里",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "策略与取舍",
                    poem: "将欲取之必先与之",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "策略与时机",
                    poem: "避其锐气击其惰归",
                    dynasty: "春秋",
                    author: "孙武",
                    source: "孙子・军争"
                },
                {
                    expression: "智谋与突袭",
                    poem: "出其不意攻其不备",
                    dynasty: "春秋",
                    author: "孙武",
                    source: "孙子・计"
                },
                {
                    expression: "辩证与乐观",
                    poem: "塞翁失马焉知非福",
                    dynasty: "西汉",
                    author: "刘安",
                    source: "淮南子・人间训"
                },
                {
                    expression: "因果与必然",
                    poem: "种瓜得瓜种豆得豆",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "循环与规律",
                    poem: "分久必合合久必分",
                    dynasty: "明代",
                    author: "罗贯中",
                    source: "三国演义"
                },
                {
                    expression: "依存与基础",
                    poem: "皮之不存毛将焉附",
                    dynasty: "春秋",
                    author: "左丘明",
                    source: "左传・僖公十四年"
                },
                {
                    expression: "弥补与转机",
                    poem: "失之东隅收之桑榆",
                    dynasty: "南朝",
                    author: "宋・范晔",
                    source: "后汉书・冯异传"
                },
                {
                    expression: "虚无与不实",
                    poem: "无源之水无本之木",
                    dynasty: "春秋",
                    author: "左丘明",
                    source: "左传・昭公九年"
                },
                {
                    expression: "客观与平衡",
                    poem: "尺有所短寸有所长",
                    dynasty: "战国",
                    author: "屈原",
                    source: "卜居"
                },
                {
                    expression: "多元与包容",
                    poem: "仁者见仁智者见智",
                    dynasty: "西周",
                    author: "姬昌",
                    source: "周易・系辞上"
                },
                {
                    expression: "知足与中庸",
                    poem: "比上不足比下有余",
                    dynasty: "东汉",
                    author: "赵岐",
                    source: "三辅决录"
                },
                {
                    expression: "隐晦与玄妙",
                    poem: "只可意会不可言传",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "辩证与必然",
                    poem: "天网恢恢疏而不漏",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
            ]
        },
        {
            name: "享受生活",
            items: [
                {
                    expression: "醉态可掬",
                    poem: "昨夜松边醉倒，问松我醉何如",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "西江月・遣兴"
                },
                {
                    expression: "浪漫至死",
                    poem: "醉后不知天在水，满船清梦压星河",
                    dynasty: "元",
                    author: "唐珙",
                    source: "题龙阳县青草湖"
                },
                {
                    expression: "及时行乐",
                    poem: "昼短苦夜长，何不秉烛游",
                    dynasty: "汉《古诗十九首",
                    author: "生年不满百》",
                    source: ""
                },
                {
                    expression: "闲适孤寂",
                    poem: "与谁同坐，明月清风我",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "点绛唇・闲倚胡床"
                },
                {
                    expression: "闲适惬意",
                    poem: "一壶清茶许流年，半卷闲书慰平生",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "自在逍遥",
                    poem: "一壶酒，一竿身，快活如侬有几人",
                    dynasty: "唐",
                    author: "李煜",
                    source: "渔父・浪花有意千重雪"
                },
                {
                    expression: "醉眠洒脱",
                    poem: "夜饮东坡醒复醉，归来仿佛三更",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "临江仙・夜饮东坡醒复醉"
                },
                {
                    expression: "随性而往",
                    poem: "兴尽晚回舟，误入藕花深处",
                    dynasty: "宋",
                    author: "李清照",
                    source: "如梦令・常记溪亭日暮"
                },
                {
                    expression: "顺其自然",
                    poem: "行至水穷处，坐看云起时",
                    dynasty: "唐",
                    author: "王维",
                    source: "终南别业"
                },
                {
                    expression: "闲适自在",
                    poem: "行到水穷处，坐看云起时",
                    dynasty: "唐",
                    author: "王维",
                    source: "终南别业"
                },
                {
                    expression: "无",
                    poem: "心有半亩花田，藏于世俗人间",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "自由洒脱",
                    poem: "陶然无喜亦无忧，人生且自由",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "隐逸之趣",
                    poem: "山中何事？松花酿酒，春水煎茶",
                    dynasty: "元",
                    author: "张可久",
                    source: "人月圆・山中书事"
                },
                {
                    expression: "洒脱自由",
                    poem: "若得山花插满头，莫问奴归处",
                    dynasty: "宋",
                    author: "严蕊",
                    source: "卜算子・不是爱风尘"
                },
                {
                    expression: "活在当下",
                    poem: "人生得意须尽欢，莫使金樽空对月",
                    dynasty: "唐",
                    author: "李白",
                    source: "将进酒"
                },
                {
                    expression: "随遇而安",
                    poem: "且停且忘且随风，且行且看且从容",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "及时行乐",
                    poem: "莫思身外无穷事，且尽生前有限杯",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "绝句漫兴九首・其四"
                },
                {
                    expression: "表现出诗人孤独中的浪漫情怀",
                    poem: "举杯邀明月，对影成三人",
                    dynasty: "唐",
                    author: "李白",
                    source: "月下独酌四首・其一"
                },
                {
                    expression: "闲适赏景",
                    poem: "今宵绝胜无人共，卧看星河尽意明",
                    dynasty: "宋",
                    author: "陈与义",
                    source: "雨晴"
                },
                {
                    expression: "及时行乐",
                    poem: "今朝有酒今朝醉，明日愁来明日愁",
                    dynasty: "唐",
                    author: "罗隐",
                    source: "自遣"
                },
                {
                    expression: "闲者为尊",
                    poem: "江山风月本无常主，闲者便是主人",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "临皋闲题"
                },
                {
                    expression: "对大自然的赞美",
                    poem: "江南可采莲，莲叶何田田",
                    dynasty: "汉",
                    author: "汉乐府",
                    source: "江南"
                },
                {
                    expression: "向往闲适",
                    poem: "何时得遂田园乐，睡到人间饭熟时",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "潇洒自在",
                    poem: "东门沽酒饮我曹，心轻万事如鸿毛",
                    dynasty: "唐",
                    author: "李颀",
                    source: "送陈章甫"
                },
                {
                    expression: "闲适美好",
                    poem: "春有百花秋有月，夏有凉风冬有雪。若无闲事挂心头，便是人间好时节",
                    dynasty: "宋",
                    author: "无门慧开",
                    source: "颂古五十五首・其一"
                },
                {
                    expression: "春日之乐",
                    poem: "春日游，杏花吹满头",
                    dynasty: "唐",
                    author: "韦庄",
                    source: "思帝乡・春日游"
                },
                {
                    expression: "春天早晨的清新美好",
                    poem: "春眠不觉晓，处处闻啼鸟",
                    dynasty: "唐",
                    author: "孟浩然",
                    source: "春晓"
                },
                {
                    expression: "闲逸野趣",
                    poem: "春潮带雨晚来急，野渡无人舟自横",
                    dynasty: "唐",
                    author: "韦应物",
                    source: "滁州西涧"
                },
                {
                    expression: "获赦后轻松愉悦、归心似箭",
                    poem: "朝辞白帝彩云间，千里江陵一日还",
                    dynasty: "唐",
                    author: "李白",
                    source: "早发白帝城"
                },
                {
                    expression: "隐逸之乐",
                    poem: "采菊东篱下，悠然见南山",
                    dynasty: "东晋",
                    author: "陶渊明",
                    source: "饮酒・其五"
                },
                {
                    expression: "闲适雅趣",
                    poem: "矮纸斜行闲作草，晴窗细乳戏分茶",
                    dynasty: "宋",
                    author: "陆游",
                    source: "临安春雨初霁"
                },
            ]
        },
        {
            name: "自然风光",
            items: [
                {
                    expression: "逆流而上",
                    poem: "自古逢秋悲寂寥，我言秋日胜春朝",
                    dynasty: "唐",
                    author: "刘禹锡",
                    source: "秋词二首・其一"
                },
                {
                    expression: "春意初探",
                    poem: "竹外桃花三两枝，春江水暖鸭先知",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "惠崇春江晚景二首"
                },
                {
                    expression: "绝代佳人",
                    poem: "云想衣裳花想容，春风拂槛露华浓",
                    dynasty: "唐",
                    author: "李白",
                    source: "清平调・其一"
                },
                {
                    expression: "天然风韵",
                    poem: "欲把西湖比西子，淡妆浓抹总相宜",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "饮湖上初晴后雨二首・其二"
                },
                {
                    expression: "清孤之美",
                    poem: "檐流未滴梅花冻，一种清孤不等闲",
                    dynasty: "清",
                    author: "郑燮",
                    source: "山中雪后"
                },
                {
                    expression: "天地壮阔",
                    poem: "星垂平野阔，月涌大江流",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "旅夜书怀"
                },
                {
                    expression: "江南春晓",
                    poem: "小楼一夜听春雨，深巷明朝卖杏花",
                    dynasty: "宋",
                    author: "陆游",
                    source: "临安春雨初霁"
                },
                {
                    expression: "自然生趣",
                    poem: "细雨鱼儿出，微风燕子斜",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "水槛遣心二首・其一"
                },
                {
                    expression: "细腻情思",
                    poem: "细雨湿衣看不见，闲花落地听无声",
                    dynasty: "唐",
                    author: "刘长卿",
                    source: "别严士元"
                },
                {
                    expression: "宁静淡泊",
                    poem: "我心素已闲，清川澹如此",
                    dynasty: "唐",
                    author: "王维",
                    source: "青溪"
                },
                {
                    expression: "惺惺相惜",
                    poem: "我见青山多妩媚，料青山见我应如是",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "贺新郎・甚矣吾衰矣"
                },
                {
                    expression: "秋色醉人",
                    poem: "停车坐爱枫林晚，霜叶红于二月花",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "山行"
                },
                {
                    expression: "闲适自在",
                    poem: "天平山上白云泉，云自无心水自闲",
                    dynasty: "唐",
                    author: "白居易",
                    source: "白云泉"
                },
                {
                    expression: "仙境幻梦",
                    poem: "天接云涛连晓雾，星河欲转千帆舞",
                    dynasty: "宋",
                    author: "李清照",
                    source: "渔家傲・天接云涛连晓雾"
                },
                {
                    expression: "四季美好",
                    poem: "四时有不谢之花，八节有长青之草",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "清幽雅境",
                    poem: "疏影横斜水清浅，暗香浮动月黄昏",
                    dynasty: "宋",
                    author: "林逋",
                    source: "山园小梅二首・其一"
                },
                {
                    expression: "山河壮丽",
                    poem: "三万里河东入海，五千仞岳上摩天",
                    dynasty: "宋",
                    author: "陆游",
                    source: "秋夜将晓出篱门迎凉有感二首・其二"
                },
                {
                    expression: "美不可言",
                    poem: "若教解语应倾国，任是无情也动人",
                    dynasty: "唐",
                    author: "罗隐",
                    source: "牡丹花"
                },
                {
                    expression: "庐山瀑布的雄伟壮观",
                    poem: "日照香炉生紫烟，遥看瀑布挂前川",
                    dynasty: "唐",
                    author: "李白",
                    source: "望庐山瀑布"
                },
                {
                    expression: "宁静清幽",
                    poem: "人闲桂花落，夜静春山空。月出惊山鸟，时鸣春涧中",
                    dynasty: "唐",
                    author: "王维",
                    source: "鸟鸣涧"
                },
                {
                    expression: "山水之乐",
                    poem: "晴山看不厌，流水趣何长",
                    dynasty: "唐",
                    author: "钱起",
                    source: "陪考功王员外城东池亭宴"
                },
                {
                    expression: "纯真之美",
                    poem: "清水出芙蓉，天然去雕饰",
                    dynasty: "唐",
                    author: "李白",
                    source: "经乱离后天恩流夜郎忆旧游书怀赠江夏韦太守良宰"
                },
                {
                    expression: "江南秋景",
                    poem: "青山隐隐水迢迢，秋尽江南草未凋",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "寄扬州韩绰判官"
                },
                {
                    expression: "惊天泣鬼",
                    poem: "女娲炼石补天处，石破天惊逗秋雨",
                    dynasty: "唐",
                    author: "李贺",
                    source: "李凭箜篌引"
                },
                {
                    expression: "对大自然的赞美",
                    poem: "梅子金黄杏子肥，麦花雪白菜花稀",
                    dynasty: "宋",
                    author: "范成大",
                    source: "四时田园杂兴・其二"
                },
                {
                    expression: "秋日的绚丽画面",
                    poem: "落霞与孤鹜齐飞，秋水共长天一色",
                    dynasty: "唐",
                    author: "王勃",
                    source: "滕王阁序"
                },
                {
                    expression: "好事将近",
                    poem: "律回岁晚冰霜少，春到人间草木知",
                    dynasty: "宋",
                    author: "张栻",
                    source: "立春偶成"
                },
                {
                    expression: "清幽之景",
                    poem: "梨花院落溶溶月，柳絮池塘淡淡风",
                    dynasty: "宋",
                    author: "晏殊",
                    source: "寓意"
                },
                {
                    expression: "绝美之境",
                    poem: "昆山玉碎凤凰叫，芙蓉泣露香兰笑",
                    dynasty: "唐",
                    author: "李贺",
                    source: "李凭箜篌引"
                },
                {
                    expression: "清幽静谧",
                    poem: "空山新雨后，天气晚来秋",
                    dynasty: "唐",
                    author: "王维",
                    source: "山居秋暝"
                },
                {
                    expression: "黄河的雄浑景象",
                    poem: "黄河远上白云间，一片孤城万仞山",
                    dynasty: "唐",
                    author: "王之涣",
                    source: "凉州词二首・其一"
                },
                {
                    expression: "雪景奇美",
                    poem: "忽如一夜春风来，千树万树梨花开",
                    dynasty: "唐",
                    author: "岑参",
                    source: "白雪歌送武判官归京"
                },
                {
                    expression: "痴梅成癖",
                    poem: "何方可化身千亿，一树梅花一放翁",
                    dynasty: "宋",
                    author: "陆游",
                    source: "梅花绝句二首・其一"
                },
                {
                    expression: "对风景的喜爱赞叹",
                    poem: "寒山转苍翠，秋水共长天",
                    dynasty: "唐",
                    author: "王维",
                    source: "辋川闲居赠裴秀才迪"
                },
                {
                    expression: "庐山瀑布的磅礴气势",
                    poem: "飞流直下三千尺，疑是银河落九天",
                    dynasty: "唐",
                    author: "李白",
                    source: "望庐山瀑布"
                },
                {
                    expression: "幽静生机",
                    poem: "独怜幽草涧边生，上有黄鹂深树鸣",
                    dynasty: "唐",
                    author: "韦应物",
                    source: "滁州西涧"
                },
                {
                    expression: "月夜花影",
                    poem: "东风袅袅泛崇光，香雾空蒙月转廊",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "海棠"
                },
                {
                    expression: "新生事物不可阻挡的哲理",
                    poem: "春色满园关不住，一枝红杏出墙来",
                    dynasty: "宋",
                    author: "叶绍翁",
                    source: "游园不值"
                },
                {
                    expression: "江潮明月壮阔美景",
                    poem: "春江潮水连海平，海上明月共潮生",
                    dynasty: "唐",
                    author: "张若虚",
                    source: "春江花月夜"
                },
                {
                    expression: "柳树的婀娜多姿",
                    poem: "碧玉妆成一树高，万条垂下绿丝绦",
                    dynasty: "唐",
                    author: "贺知章",
                    source: "咏柳"
                },
                {
                    expression: "塞外苦寒",
                    poem: "北风卷地白草折，胡天八月即飞雪",
                    dynasty: "唐",
                    author: "岑参",
                    source: "白雪歌送武判官归京"
                },
            ]
        },
        {
            name: "女子才貌",
            items: [
                {
                    expression: "形容女子的美丽与温柔",
                    poem: "珠缨旋转星宿摇，花蔓抖擞龙蛇动",
                    dynasty: "唐",
                    author: "白居易",
                    source: "霓裳羽衣舞歌"
                },
                {
                    expression: "赞美女子的美丽与高雅",
                    poem: "云鬓花颜金步摇，芙蓉帐暖度春宵",
                    dynasty: "唐",
                    author: "白居易",
                    source: "长恨歌"
                },
                {
                    expression: "女子的美丽与哀怨",
                    poem: "玉容寂寞泪阑干，梨花一枝春带雨",
                    dynasty: "唐",
                    author: "白居易",
                    source: "长恨歌"
                },
                {
                    expression: "形容女子的美丽与娴静",
                    poem: "有美一人，清扬婉兮",
                    dynasty: "先秦",
                    author: "佚名",
                    source: "诗经・郑风・野有蔓草"
                },
                {
                    expression: "女子的美丽与温柔",
                    poem: "依旧桃花面，频低柳叶眉",
                    dynasty: "唐",
                    author: "韦庄",
                    source: "女冠子・昨夜夜半"
                },
                {
                    expression: "夸赞女子的美丽与灵动",
                    poem: "眼波才动被人猜",
                    dynasty: "宋",
                    author: "李清照",
                    source: "浣溪沙・闺情"
                },
                {
                    expression: "女子的美丽与娇羞",
                    poem: "嫣然一笑竹篱间，桃李漫山总粗俗",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "寓居定惠院之东杂花满山有海棠一株土人不知贵也"
                },
                {
                    expression: "形容女子的美丽与娇艳",
                    poem: "秀色掩今古，荷花羞玉颜",
                    dynasty: "唐",
                    author: "李白",
                    source: "西施"
                },
                {
                    expression: "夸赞女子的美丽与高贵",
                    poem: "小怜玉体横陈夜，已报周师入晋阳",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "北齐二首・其一"
                },
                {
                    expression: "形容女子的美丽与娇羞",
                    poem: "香雾云鬟湿，清辉玉臂寒",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "月夜"
                },
                {
                    expression: "形容女子的美丽与气质",
                    poem: "态浓意远淑且真，肌理细腻骨肉匀",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "丽人行"
                },
                {
                    expression: "赞美女子的美丽与端庄",
                    poem: "手如柔荑，肤如凝脂，领如蝤蛴，齿如瓠犀",
                    dynasty: "先秦",
                    author: "佚名",
                    source: "诗经・卫风・硕人"
                },
                {
                    expression: "夸赞女子的才情与美貌",
                    poem: "若把西湖比西子，淡妆浓抹总相宜",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "饮湖上初晴后雨二首・其二"
                },
                {
                    expression: "形容女子的美丽与端庄",
                    poem: "荣曜秋菊，华茂春松",
                    dynasty: "三国魏",
                    author: "曹植",
                    source: "洛神赋"
                },
                {
                    expression: "女子的美丽与优雅",
                    poem: "轻罗小扇白兰花，纤腰玉带舞天纱",
                    dynasty: "唐",
                    author: "徐凝",
                    source: "宫中曲"
                },
                {
                    expression: "夸赞女子的娇俏可爱",
                    poem: "巧笑倩兮，美目盼兮",
                    dynasty: "先秦",
                    author: "佚名",
                    source: "诗经・卫风・硕人"
                },
                {
                    expression: "称赏女子气质高雅",
                    poem: "气质美若兰，才情馥比仙",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・世难容"
                },
                {
                    expression: "赞美女子的美丽与才情",
                    poem: "气质美如兰，才华馥比仙",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦十二曲・世难容"
                },
                {
                    expression: "女子的美貌与温柔",
                    poem: "娉娉袅袅十三余，豆蔻梢头二月初",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "赠别二首・其一"
                },
                {
                    expression: "女子轻盈体态与美丽容颜",
                    poem: "翩若惊鸿，婉若游龙",
                    dynasty: "三国魏",
                    author: "曹植",
                    source: "洛神赋"
                },
                {
                    expression: "赞美女子的美丽与高贵",
                    poem: "名花倾国两相欢，长得君王带笑看",
                    dynasty: "唐",
                    author: "李白",
                    source: "清平调・其三"
                },
                {
                    expression: "夸赞女子的美丽与灵动",
                    poem: "眉如翠羽，肌如白雪，腰如束素，齿如含贝",
                    dynasty: "战国楚",
                    author: "宋玉",
                    source: "登徒子好色赋"
                },
                {
                    expression: "描写女子的娇美",
                    poem: "垆边人似月，皓腕凝霜雪",
                    dynasty: "唐",
                    author: "韦庄",
                    source: "菩萨蛮・人人尽说江南好"
                },
                {
                    expression: "夸赞女子容颜绝美",
                    poem: "脸若银盆，眼同水杏。唇不点而红，眉不画而翠",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・第二十八回"
                },
                {
                    expression: "女子的美丽与妩媚",
                    poem: "脸若银盘，眼似水杏，唇不点而红，眉不画而翠",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦"
                },
                {
                    expression: "夸赞女子的美丽与聪慧",
                    poem: "静若处子，动若脱兔",
                    dynasty: "春秋",
                    author: "孙武",
                    source: "孙子・九地"
                },
                {
                    expression: "刻画女子的美丽动人",
                    poem: "借问汉宫谁得似？可怜飞燕倚新妆",
                    dynasty: "唐",
                    author: "李白",
                    source: "清平调・其二"
                },
                {
                    expression: "赞美女子的美丽容颜",
                    poem: "回眸一笑百媚生，六宫粉黛无颜色",
                    dynasty: "唐",
                    author: "白居易",
                    source: "长恨歌"
                },
                {
                    expression: "赞美女子的美丽与轻盈",
                    poem: "绰约多逸态，轻盈不自持",
                    dynasty: "唐",
                    author: "武平一",
                    source: "杂曲歌辞・妾薄命"
                },
                {
                    expression: "赞美女子容貌美丽",
                    poem: "北方有佳人，绝世而独立",
                    dynasty: "汉",
                    author: "李延年",
                    source: "李延年歌"
                },
            ]
        },
        {
            name: "高尚品德",
            items: [
                {
                    expression: "坚守本心",
                    poem: "质本洁来还洁去，强于污淖陷渠沟",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・葬花吟"
                },
                {
                    expression: "气节长存",
                    poem: "至今思项羽，不肯过江东",
                    dynasty: "宋",
                    author: "李清照",
                    source: "夏日绝句"
                },
                {
                    expression: "借竹子赞美坚韧不拔、顽强不屈的精神",
                    poem: "咬定青山不放松，立根原在破岩中",
                    dynasty: "清",
                    author: "郑燮",
                    source: "竹石"
                },
                {
                    expression: "淡泊宁静",
                    poem: "心有山水不造作，静而不争远是非",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "孤高傲世",
                    poem: "无意苦争春，一任群芳妒",
                    dynasty: "宋",
                    author: "陆游",
                    source: "卜算子・咏梅"
                },
                {
                    expression: "青胜于蓝",
                    poem: "桐花万里丹山路，雏凤清于老凤声",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "韩冬郎即席为诗相送一座尽惊他日余方追吟连宵侍坐裴回久之句有老成之风因成二绝寄酬兼呈畏之员外二首・其一"
                },
                {
                    expression: "傲骨铮铮",
                    poem: "生当作人杰，死亦为鬼雄",
                    dynasty: "宋",
                    author: "李清照",
                    source: "夏日绝句"
                },
                {
                    expression: "气节不改",
                    poem: "宁可枝头抱香死，何曾吹落北风中",
                    dynasty: "宋",
                    author: "郑思肖",
                    source: "寒菊"
                },
                {
                    expression: "风雅之志",
                    poem: "宁可食无肉，不可居无竹",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "于潜僧绿筠轩"
                },
                {
                    expression: "年少英豪",
                    poem: "年少万兜鍪，坐断东南战未休",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "南乡子・登京口北固亭有怀"
                },
                {
                    expression: "风华绝代",
                    poem: "陌上人如玉，公子世无双",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "无私奉献",
                    poem: "落红不是无情物，化作春泥更护花",
                    dynasty: "清",
                    author: "龚自珍",
                    source: "己亥杂诗・其五"
                },
                {
                    expression: "高洁自持",
                    poem: "洛阳亲友如相问，一片冰心在玉壶",
                    dynasty: "唐",
                    author: "王昌龄",
                    source: "芙蓉楼送辛渐二首・其一"
                },
                {
                    expression: "气节不灭",
                    poem: "零落成泥碾作尘，只有香如故",
                    dynasty: "宋",
                    author: "陆游",
                    source: "卜算子・咏梅"
                },
                {
                    expression: "德高自彰",
                    poem: "居高声自远，非是藉秋风",
                    dynasty: "唐",
                    author: "虞世南",
                    source: "蝉"
                },
                {
                    expression: "患难见真情",
                    poem: "疾风知劲草，板荡识诚臣",
                    dynasty: "唐",
                    author: "李世民",
                    source: "赐萧瑀"
                },
                {
                    expression: "高洁自许",
                    poem: "唤起一天明月，照我满怀冰雪",
                    dynasty: "宋",
                    author: "张孝祥",
                    source: "念奴娇・过洞庭"
                },
                {
                    expression: "低调风流",
                    poem: "风流不在谈锋胜，袖手无言味最长",
                    dynasty: "宋",
                    author: "黄升",
                    source: "鹧鸪天・张园作"
                },
                {
                    expression: "超凡脱俗",
                    poem: "独立天地间，清风洒兰雪",
                    dynasty: "唐",
                    author: "李白",
                    source: "别鲁颂"
                },
                {
                    expression: "才华为魂",
                    poem: "粗缯大布裹生涯，腹有诗书气自华",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "和董传留别"
                },
                {
                    expression: "淡泊高洁",
                    poem: "不要人夸颜色好，只留清气满乾坤",
                    dynasty: "元",
                    author: "王冕",
                    source: "墨梅"
                },
                {
                    expression: "才华惊天",
                    poem: "笔落惊风雨，诗成泣鬼神",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "寄李十二白二十韵"
                },
                {
                    expression: "仗义与助人",
                    poem: "路见不平拔刀相助",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "共享与共担",
                    poem: "有福同享有难同当",
                    dynasty: "",
                    author: "",
                    source: ""
                },
            ]
        },
        {
            name: "勤学上进",
            items: [
                {
                    expression: "学习要注重实践",
                    poem: "纸上得来终觉浅，绝知此事要躬行。",
                    dynasty: "宋",
                    author: "陆游",
                    source: "冬夜读书示子聿"
                },
                {
                    expression: "学习要不断进取",
                    poem: "欲穷千里目，更上一层楼。",
                    dynasty: "唐",
                    author: "王之涣",
                    source: "登鹳雀楼"
                },
                {
                    expression: "勤思慎行",
                    poem: "业精于勤荒于嬉，行成于思毁于随",
                    dynasty: "唐",
                    author: "韩愈",
                    source: "进学解"
                },
                {
                    expression: "突出勤奋是学习的关键",
                    poem: "业精于勤，荒于嬉；行成于思，毁于随。",
                    dynasty: "唐",
                    author: "韩愈",
                    source: "进学解"
                },
                {
                    expression: "学习要持之以恒",
                    poem: "学如逆水行舟，不进则退。",
                    dynasty: "清",
                    author: "梁启超（一说出自）",
                    source: "增广贤文"
                },
                {
                    expression: "学习要多思考",
                    poem: "学而不思则罔，思而不学则殆。",
                    dynasty: "春秋",
                    author: "孔子弟子及再传弟子",
                    source: "论语・为政"
                },
                {
                    expression: "学习要循序渐进，不可急于求成",
                    poem: "学不躐等也。",
                    dynasty: "战国",
                    author: "戴圣",
                    source: "礼记・学记"
                },
                {
                    expression: "鼓励人不断学习新知识",
                    poem: "问渠那得清如许？为有源头活水来。",
                    dynasty: "宋",
                    author: "朱熹",
                    source: "观书有感・其一"
                },
                {
                    expression: "年少时应勤奋学习，否则年老后悔",
                    poem: "少壮不努力，老大徒伤悲！",
                    dynasty: "汉",
                    author: "汉乐府",
                    source: "长歌行"
                },
                {
                    expression: "鼓励人们抓紧时间学习，勤奋出学问",
                    poem: "少年易老学难成，一寸光阴不可轻。",
                    dynasty: "宋",
                    author: "朱熹",
                    source: "偶题"
                },
                {
                    expression: "青春无价",
                    poem: "劝君莫惜金缕衣，劝君惜取少年时",
                    dynasty: "唐",
                    author: "杜秋娘",
                    source: "金缕衣"
                },
                {
                    expression: "劝人珍惜青春时光努力学习",
                    poem: "青春须早为，岂能长少年。",
                    dynasty: "唐",
                    author: "孟郊",
                    source: "劝学"
                },
                {
                    expression: "劝人学习要勤奋，不要懒惰",
                    poem: "勤能补拙是良训，一分辛苦一分才。",
                    dynasty: "现代",
                    author: "华罗庚",
                    source: ""
                },
                {
                    expression: "鼓励人努力学习，追求进步",
                    poem: "锲而舍之，朽木不折；锲而不舍，金石可镂。",
                    dynasty: "战国",
                    author: "荀子",
                    source: "劝学"
                },
                {
                    expression: "鼓励人在困境中坚持学习",
                    poem: "千淘万漉虽辛苦，吹尽狂沙始到金。",
                    dynasty: "唐",
                    author: "刘禹锡",
                    source: "浪淘沙・其八"
                },
                {
                    expression: "学习要专心致志",
                    poem: "目不能两视而明，耳不能两听而聪。",
                    dynasty: "战国",
                    author: "荀子",
                    source: "劝学"
                },
                {
                    expression: "学习要虚心，不懂就问",
                    poem: "敏而好学，不耻下问。",
                    dynasty: "春秋",
                    author: "孔子弟子及再传弟子",
                    source: "论语・公冶长"
                },
                {
                    expression: "指出学习没有年龄限制",
                    poem: "老当益壮，宁移白首之心？穷且益坚，不坠青云之志。",
                    dynasty: "唐",
                    author: "王勃",
                    source: "滕王阁序"
                },
                {
                    expression: "向比自己优秀的人学习",
                    poem: "见贤思齐焉，见不贤而内自省也。",
                    dynasty: "春秋",
                    author: "孔子弟子及再传弟子",
                    source: "论语・里仁"
                },
                {
                    expression: "劝勉珍惜当下勤奋读书",
                    poem: "及时当勉励，岁月不待人。",
                    dynasty: "东晋",
                    author: "陶渊明",
                    source: "杂诗十二首・其一"
                },
                {
                    expression: "惜时勤学",
                    poem: "黑发不知勤学早，白首方悔读书迟",
                    dynasty: "唐",
                    author: "颜真卿",
                    source: "劝学"
                },
                {
                    expression: "学习要善于请教他人",
                    poem: "好问则裕，自用则小。",
                    dynasty: "上古",
                    author: "",
                    source: "尚书・仲虺之诰"
                },
                {
                    expression: "劝人学习要持之以恒",
                    poem: "贵有恒，何必三更眠五更起；最无益，莫过一日曝十日寒。",
                    dynasty: "明",
                    author: "胡居仁自勉联",
                    source: ""
                },
                {
                    expression: "厚积薄发",
                    poem: "古人学问无遗力，少壮工夫老始成",
                    dynasty: "宋",
                    author: "陆游",
                    source: "冬夜读书示子聿"
                },
                {
                    expression: "劝人珍惜时间，勤奋学习",
                    poem: "富贵必从勤苦得，男儿须读五车书。",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "柏学士茅屋"
                },
                {
                    expression: "学习要树立远大志向",
                    poem: "非学无以广才，非志无以成学。",
                    dynasty: "三国",
                    author: "蜀・诸葛亮",
                    source: "诫子书"
                },
                {
                    expression: "劝人不要因为困难而放弃学习",
                    poem: "读书破万卷，下笔如有神。",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "奉赠韦左丞丈二十二韵"
                },
                {
                    expression: "学习要勤奋刻苦",
                    poem: "读书患不多，思义患不明。",
                    dynasty: "唐",
                    author: "韩愈",
                    source: "赠别元十八协律六首・其一"
                },
                {
                    expression: "劝人读书要趁早，不要虚度光阴",
                    poem: "读书不觉已春深，一寸光阴一寸金。",
                    dynasty: "唐",
                    author: "王贞白",
                    source: "白鹿洞二首・其一"
                },
                {
                    expression: "专注忘我",
                    poem: "读书不觉已春深，一寸光阴一寸金",
                    dynasty: "唐",
                    author: "王贞白",
                    source: "白鹿洞二首・其一"
                },
                {
                    expression: "学习要广泛交流",
                    poem: "独学而无友，则孤陋而寡闻。",
                    dynasty: "战国",
                    author: "戴圣",
                    source: "礼记・学记"
                },
                {
                    expression: "学习要注重积累，循序渐进",
                    poem: "不积跬步，无以至千里；不积小流，无以成江海。",
                    dynasty: "战国",
                    author: "荀子",
                    source: "劝学"
                },
                {
                    expression: "学习要广泛守志，提问并思考",
                    poem: "博学而笃志，切问而近思，仁在其中矣。",
                    dynasty: "春秋",
                    author: "孔子弟子及再传弟子",
                    source: "论语・子张"
                },
            ]
        },
        {
            name: "爱国情怀",
            items: [
                {
                    expression: "视死如归",
                    poem: "醉卧沙场君莫笑，古来征战几人回",
                    dynasty: "唐",
                    author: "王翰",
                    source: "凉州词二首・其一"
                },
                {
                    expression: "热血难凉",
                    poem: "醉里挑灯看剑，梦回吹角连营",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "破阵子・为陈同甫赋壮词以寄之"
                },
                {
                    expression: "将士不公",
                    poem: "战士军前半死生，美人帐下犹歌舞",
                    dynasty: "唐",
                    author: "高适",
                    source: "燕歌行并序"
                },
                {
                    expression: "边塞鏖战",
                    poem: "月黑雁飞高，单于夜遁逃",
                    dynasty: "唐",
                    author: "卢纶",
                    source: "和张仆射塞下曲・其三"
                },
                {
                    expression: "望眼欲穿",
                    poem: "遗民泪尽胡尘里，南望王师又一年",
                    dynasty: "宋",
                    author: "陆游",
                    source: "秋夜将晓出篱门迎凉有感二首・其二"
                },
                {
                    expression: "老骥伏枥",
                    poem: "夜阑卧听风吹雨，铁马冰河入梦来",
                    dynasty: "宋",
                    author: "陆游",
                    source: "十一月四日风雨大作二首・其二"
                },
                {
                    expression: "赤胆忠心",
                    poem: "相看白刃血纷纷，死节从来岂顾勋",
                    dynasty: "唐",
                    author: "高适",
                    source: "燕歌行并序"
                },
                {
                    expression: "赤子之心",
                    poem: "位卑未敢忘忧国，事定犹须待阖棺",
                    dynasty: "宋",
                    author: "陆游",
                    source: "病起书怀"
                },
                {
                    expression: "至死忧国",
                    poem: "王师北定中原日，家祭无忘告乃翁",
                    dynasty: "宋",
                    author: "陆游",
                    source: "示儿"
                },
                {
                    expression: "死不瞑目",
                    poem: "死去元知万事空，但悲不见九州同",
                    dynasty: "宋",
                    author: "陆游",
                    source: "示儿"
                },
                {
                    expression: "麻木苟安",
                    poem: "商女不知亡国恨，隔江犹唱后庭花",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "泊秦淮"
                },
                {
                    expression: "壮志难酬",
                    poem: "却将万字平戎策，换得东家种树书",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "鹧鸪天・有客慨然谈功名因追念少年时事戏作"
                },
                {
                    expression: "戍边孤寂",
                    poem: "青海长云暗雪山，孤城遥望玉门关",
                    dynasty: "唐",
                    author: "王昌龄",
                    source: "从军行七首・其四"
                },
                {
                    expression: "征人难归",
                    poem: "秦时明月汉时关，万里长征人未还",
                    dynasty: "唐",
                    author: "王昌龄",
                    source: "出塞二首・其一"
                },
                {
                    expression: "边关苦寒",
                    poem: "羌笛何须怨杨柳，春风不度玉门关",
                    dynasty: "唐",
                    author: "王之涣",
                    source: "凉州词二首・其一"
                },
                {
                    expression: "战前豪饮",
                    poem: "葡萄美酒夜光杯，欲饮琵琶马上催",
                    dynasty: "唐",
                    author: "王翰",
                    source: "凉州词二首・其一"
                },
                {
                    expression: "烈士暮年",
                    poem: "凭谁问：廉颇老矣，尚能饭否？",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "永遇乐・京口北固亭怀古"
                },
                {
                    expression: "报国壮志",
                    poem: "男儿何不带吴钩，收取关山五十州",
                    dynasty: "唐",
                    author: "李贺",
                    source: "南园十三首・其五"
                },
                {
                    expression: "征战骁勇",
                    poem: "马作的卢飞快，弓如霹雳弦惊",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "破阵子・为陈同甫赋壮词以寄之"
                },
                {
                    expression: "征战豪情",
                    poem: "楼船夜雪瓜洲渡，铁马秋风大散关",
                    dynasty: "宋",
                    author: "陆游",
                    source: "书愤五首・其一"
                },
                {
                    expression: "秋夜戍愁",
                    poem: "撩乱边愁听不尽，高高秋月照长城",
                    dynasty: "唐",
                    author: "王昌龄",
                    source: "从军行七首・其二"
                },
                {
                    expression: "俭以兴邦",
                    poem: "历览前贤国与家，成由勤俭破由奢",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "咏史二首・其二"
                },
                {
                    expression: "壮志难伸",
                    poem: "了却君王天下事，赢得生前身后名。可怜白发生！",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "破阵子・为陈同甫赋壮词以寄之"
                },
                {
                    expression: "功成身退",
                    poem: "了却君王天下事，赢得生前身后名",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "破阵子・为陈同甫赋壮词以寄之"
                },
                {
                    expression: "报国壮志",
                    poem: "会挽雕弓如满月，西北望，射天狼",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "江城子・密州出猎"
                },
                {
                    expression: "一往无前",
                    poem: "黄沙百战穿金甲，不破楼兰终不还",
                    dynasty: "唐",
                    author: "王昌龄",
                    source: "从军行七首・其四"
                },
                {
                    expression: "遗恨难平",
                    poem: "胡未灭，鬓先秋，泪空流",
                    dynasty: "宋",
                    author: "陆游",
                    source: "诉衷情・当年万里觅封侯"
                },
                {
                    expression: "战云密布",
                    poem: "黑云压城城欲摧，甲光向日金鳞开",
                    dynasty: "唐",
                    author: "李贺",
                    source: "雁门太守行"
                },
                {
                    expression: "山河故土",
                    poem: "何处望神州？满眼风光北固楼",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "南乡子・登京口北固亭有怀"
                },
                {
                    expression: "功业成空",
                    poem: "关河梦断何处？尘暗旧貂裘",
                    dynasty: "宋",
                    author: "陆游",
                    source: "诉衷情・当年万里觅封侯"
                },
                {
                    expression: "赤子之心",
                    poem: "苟利国家生死以，岂因祸福避趋之",
                    dynasty: "清",
                    author: "林则徐",
                    source: "赴戍登程口占示家人二首"
                },
                {
                    expression: "荆轲赴秦刺秦王时，表现出的悲壮与决绝",
                    poem: "风萧萧兮易水寒，壮士一去兮不复还",
                    dynasty: "先秦",
                    author: "佚名",
                    source: "易水歌"
                },
                {
                    expression: "壮志未酬",
                    poem: "当年万里觅封侯，匹马戍梁州",
                    dynasty: "宋",
                    author: "陆游",
                    source: "诉衷情・当年万里觅封侯"
                },
                {
                    expression: "家国情怀",
                    poem: "但使龙城飞将在，不教胡马度阴山",
                    dynasty: "唐",
                    author: "王昌龄",
                    source: "出塞二首・其一"
                },
                {
                    expression: "沙场出征",
                    poem: "大漠风尘日色昏，红旗半卷出辕门",
                    dynasty: "唐",
                    author: "王昌龄",
                    source: "从军行七首・其五"
                },
                {
                    expression: "忧国入梦",
                    poem: "布被秋宵梦觉，眼前万里江山",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "清平乐・独宿博山王氏庵"
                },
                {
                    expression: "誓死报恩",
                    poem: "报君黄金台上意，提携玉龙为君死",
                    dynasty: "唐",
                    author: "李贺",
                    source: "雁门太守行"
                },
                {
                    expression: "沙场豪情",
                    poem: "八百里分麾下炙，五十弦翻塞外声",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "破阵子・为陈同甫赋壮词以寄之"
                },
                {
                    expression: "责任与担当",
                    poem: "天下兴亡匹夫有责",
                    dynasty: "明末清初",
                    author: "顾炎武",
                    source: "日知录・正始"
                },
                {
                    expression: "奉献与忠诚",
                    poem: "鞠躬尽瘁死而后已",
                    dynasty: "三国",
                    author: "蜀・诸葛亮",
                    source: "后出师表"
                },
            ]
        },
        {
            name: "思乡之情",
            items: [
                {
                    expression: "心安为家",
                    poem: "我生本无乡，心安是归处",
                    dynasty: "唐",
                    author: "白居易",
                    source: "初出城留别"
                },
                {
                    expression: "思归心切",
                    poem: "素衣莫起风尘叹，犹及清明可到家",
                    dynasty: "宋",
                    author: "陆游",
                    source: "临安春雨初霁"
                },
                {
                    expression: "清寒暮色",
                    poem: "日暮苍山远，天寒白屋贫",
                    dynasty: "唐",
                    author: "刘长卿",
                    source: "逢雪宿芙蓉山主人"
                },
                {
                    expression: "思乡情浓",
                    poem: "露从今夜白，月是故乡明",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "月夜忆舍弟"
                },
                {
                    expression: "归期难定",
                    poem: "君问归期未有期，巴山夜雨涨秋池",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "夜雨寄北"
                },
                {
                    expression: "归心志忑",
                    poem: "近乡情更怯，不敢问来人",
                    dynasty: "唐",
                    author: "宋之问",
                    source: "渡汉江"
                },
                {
                    expression: "眷恋故土",
                    poem: "羁鸟恋旧林，池鱼思故渊",
                    dynasty: "魏晋",
                    author: "陶渊明",
                    source: "归园田居・其一"
                },
                {
                    expression: "漂泊孤独",
                    poem: "独在异乡为异客，每逢佳节倍思亲",
                    dynasty: "唐",
                    author: "王维",
                    source: "九月九日忆山东兄弟"
                },
                {
                    expression: "思乡情切",
                    poem: "春风又绿江南岸，明月何时照我还？",
                    dynasty: "宋",
                    author: "王安石",
                    source: "泊船瓜洲"
                },
                {
                    expression: "寒夜暖意",
                    poem: "柴门闻犬吠，风雪夜归人",
                    dynasty: "唐",
                    author: "刘长卿",
                    source: "逢雪宿芙蓉山主人"
                },
            ]
        },
        {
            name: "唯美爱情",
            items: [
                {
                    expression: "昨日重现",
                    poem: "昨夜星辰昨夜风，画楼西畔桂堂东",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "无题二首・其一"
                },
                {
                    expression: "再续前缘",
                    poem: "最是凝眸无限意，似曾相逢在前生",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "终得圆满",
                    poem: "众里寻他千百度，蓦然回首，那人却在灯火阑珊处",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "青玉案・元夕"
                },
                {
                    expression: "双向奔赴",
                    poem: "只愿君心似我心，定不负相思意",
                    dynasty: "宋",
                    author: "李之仪",
                    source: "卜算子・我住长江头"
                },
                {
                    expression: "痴情难抑",
                    poem: "直道相思了无益，未妨惆怅是清狂",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "无题二首・其二"
                },
                {
                    expression: "默默钟情",
                    poem: "云缠风不知所起，风吹千里不问归期",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "长伴不离",
                    poem: "愿我如星君如月，夜夜流光相皎洁",
                    dynasty: "清",
                    author: "黄景仁",
                    source: "绮怀十六首・其十五"
                },
                {
                    expression: "化风相随",
                    poem: "愿为西南风，长逝入君怀",
                    dynasty: "三国",
                    author: "魏・曹植",
                    source: "七哀诗"
                },
                {
                    expression: "遗憾的情感",
                    poem: "有幸相知，无幸相守，苍海明月，天长地久",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "无悔付出",
                    poem: "衣带渐宽终不悔，为伊消得人憔悴",
                    dynasty: "宋",
                    author: "柳永",
                    source: "蝶恋花・伫倚危楼风细细"
                },
                {
                    expression: "永世不忘",
                    poem: "十年生死两茫茫，不思量，自难忘",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "江城子・乙卯正月二十日夜记梦"
                },
                {
                    expression: "体面分手",
                    poem: "一别两宽，各生欢喜",
                    dynasty: "唐",
                    author: "放妻书（敦煌出土）",
                    source: ""
                },
                {
                    expression: "缱绻情深",
                    poem: "夜月一帘幽梦，春风十里柔情",
                    dynasty: "宋",
                    author: "秦观",
                    source: "八六子・倚危亭"
                },
                {
                    expression: "旧梦难寻",
                    poem: "伤心桥下春波绿，曾是惊鸿照影来",
                    dynasty: "宋",
                    author: "陆游",
                    source: "沈园二首・其一"
                },
                {
                    expression: "情感触动",
                    poem: "醒时风拂衣，情动忽提笔",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "自作多情",
                    poem: "笑渐不闻声渐悄，多情却被无情恼",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "蝶恋花・春景"
                },
                {
                    expression: "生死断肠",
                    poem: "小轩窗，正梳妆。相顾无言，惟有泪千行",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "江城子・乙卯正月二十日夜记梦"
                },
                {
                    expression: "爱而不得",
                    poem: "相思本是无凭语，莫向花笺费泪行",
                    dynasty: "宋",
                    author: "晏几道",
                    source: "鹧鸪天・醉拍春衫惜旧香"
                },
                {
                    expression: "倾慕之情",
                    poem: "我心慕你，如鹿饮水，鸟归林",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "自愧不配",
                    poem: "我是檐上三寸雪，你是人间四月天",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "决绝放手",
                    poem: "我断不思量，你莫思量我",
                    dynasty: "宋",
                    author: "谢希孟",
                    source: "卜算子・赠妓"
                },
                {
                    expression: "愧疚难偿",
                    poem: "惟将终夜长开眼，报答平生未展眉",
                    dynasty: "唐",
                    author: "元稹",
                    source: "遣悲怀三首・其三"
                },
                {
                    expression: "情网难逃",
                    poem: "天不老，情难绝。心似双丝网，中有千千结",
                    dynasty: "宋",
                    author: "张先",
                    source: "千秋岁・数声鶗鴂"
                },
                {
                    expression: "痴心守候",
                    poem: "似此星辰非昨夜，为谁风露立中宵",
                    dynasty: "清",
                    author: "黄景仁",
                    source: "绮怀十六首・其十五"
                },
                {
                    expression: "默契无间",
                    poem: "身无彩凤双飞翼，心有灵犀一点通",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "无题二首・其一"
                },
                {
                    expression: "委婉的爱意",
                    poem: "山有木兮木有枝，心悦君兮君不知",
                    dynasty: "先秦",
                    author: "佚名",
                    source: "越人歌"
                },
                {
                    expression: "情断难言",
                    poem: "山盟虽在，锦书难托。莫、莫、莫！",
                    dynasty: "宋",
                    author: "陆游",
                    source: "钗头凤・红酥手"
                },
                {
                    expression: "女子青春美好",
                    poem: "桑之未落，其叶沃若",
                    dynasty: "先秦",
                    author: "佚名",
                    source: "诗经・卫风・氓"
                },
                {
                    expression: "专情不渝",
                    poem: "弱水三千只取一瓢，繁华三千只为一人",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・第九十一回"
                },
                {
                    expression: "至死不渝",
                    poem: "若似月轮终皎洁，不辞冰雪为卿热",
                    dynasty: "清",
                    author: "纳兰性德",
                    source: "蝶恋花・辛苦最怜天上月"
                },
                {
                    expression: "唯你不可替代",
                    poem: "日落西山非我意，晚霞再好不及你",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "物是人非",
                    poem: "人面不知何处去，桃花依旧笑春风",
                    dynasty: "唐",
                    author: "崔护",
                    source: "题都城南庄"
                },
                {
                    expression: "形单影只",
                    poem: "人成各，今非昨，病魂常似秋千索",
                    dynasty: "宋",
                    author: "唐婉",
                    source: "钗头凤・世情薄"
                },
                {
                    expression: "旧地怀人",
                    poem: "去年今日此门中，人面桃花相映红",
                    dynasty: "唐",
                    author: "崔护",
                    source: "题都城南庄"
                },
                {
                    expression: "深情专一",
                    poem: "取次花丛懒回顾，半缘修道半缘君",
                    dynasty: "唐",
                    author: "元稹",
                    source: "离思五首・其四"
                },
                {
                    expression: "情根深种",
                    poem: "平生不会相思，才会相思，便害相思",
                    dynasty: "元",
                    author: "徐再思",
                    source: "折桂令・春情"
                },
                {
                    expression: "相思憔悴",
                    poem: "莫道不销魂，帘卷西风，人比黄花瘦",
                    dynasty: "宋",
                    author: "李清照",
                    source: "醉花阴・薄雾浓云愁永昼"
                },
                {
                    expression: "真爱无惧距离",
                    poem: "两情若是久长时，又岂在朝朝暮暮",
                    dynasty: "宋",
                    author: "秦观",
                    source: "鹊桥仙・纤云弄巧"
                },
                {
                    expression: "强颜欢笑",
                    poem: "角声寒，夜阑珊。怕人寻问，咽泪装欢",
                    dynasty: "宋",
                    author: "唐婉",
                    source: "钗头凤・世情薄"
                },
                {
                    expression: "珍惜当下爱情",
                    poem: "花开堪折直须折，莫待无花空折枝",
                    dynasty: "唐",
                    author: "杜秋娘",
                    source: "金缕衣"
                },
                {
                    expression: "悔别夫君",
                    poem: "忽见陌头杨柳色，悔教夫婿觅封侯",
                    dynasty: "唐",
                    author: "王昌龄",
                    source: "闺怨"
                },
                {
                    expression: "身份隔阂",
                    poem: "侯门一入深如海，从此萧郎是路人",
                    dynasty: "唐",
                    author: "崔郊",
                    source: "赠去婢"
                },
                {
                    expression: "物是人非",
                    poem: "红酥手，黄滕酒，满城春色宫墙柳",
                    dynasty: "宋",
                    author: "陆游",
                    source: "钗头凤・红酥手"
                },
                {
                    expression: "情感的专注",
                    poem: "海底月是天上月，眼前人是心上人",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "缘浅情深",
                    poem: "还君明珠双泪垂，恨不相逢未嫁时",
                    dynasty: "唐",
                    author: "张籍",
                    source: "节妇吟・寄东平李司空师道"
                },
                {
                    expression: "有你足矣",
                    poem: "观星觅云难悲喜，闻风听雨不如你",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "美好爱情的向往",
                    poem: "关关雎鸠，在河之洲",
                    dynasty: "先秦",
                    author: "佚名",
                    source: "诗经・周南・关雎"
                },
                {
                    expression: "暧昧难明",
                    poem: "东边日出西边雨，道是无晴却有晴",
                    dynasty: "唐",
                    author: "刘禹锡",
                    source: "竹枝词二首・其一"
                },
                {
                    expression: "此生唯你",
                    poem: "得成比目何辞死，愿作鸳鸯不羡仙",
                    dynasty: "唐",
                    author: "卢照邻",
                    source: "长安古意"
                },
                {
                    expression: "心死如灰",
                    poem: "从此无心爱良夜，任他明月下西楼",
                    dynasty: "唐",
                    author: "李益",
                    source: "写情"
                },
                {
                    expression: "旧情难续",
                    poem: "春如旧，人空瘦，泪痕红浥鲛绡透",
                    dynasty: "宋",
                    author: "陆游",
                    source: "钗头凤・红酥手"
                },
                {
                    expression: "你无可比拟",
                    poem: "春风十里扬州路，卷上珠帘不如你",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "赠别二首・其一"
                },
                {
                    expression: "至死方休",
                    poem: "春蚕到死丝方尽，蜡炬成灰泪始干",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "无题・相见时难别亦难"
                },
                {
                    expression: "困顿伤情",
                    poem: "诚知此恨人人有，贫贱夫妻百事哀",
                    dynasty: "唐",
                    author: "元稹",
                    source: "遣悲怀三首・其二"
                },
                {
                    expression: "非你不可",
                    poem: "曾经沧海难为水，除却巫山不是云",
                    dynasty: "唐",
                    author: "元稹",
                    source: "离思五首・其四"
                },
            ]
        },
        {
            name: "相思之情",
            items: [
                {
                    expression: "寤寐思服",
                    poem: "枕上轻寒窗外雨，眼前春色梦中人",
                    dynasty: "清",
                    author: "魏秀仁",
                    source: "花月痕・第十五回"
                },
                {
                    expression: "遥寄无门",
                    poem: "欲寄相思千点泪，流不到，楚江东",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "江城子・别徐州"
                },
                {
                    expression: "期盼和难为情",
                    poem: "相思相见知何日，此时此夜难为情",
                    dynasty: "唐",
                    author: "李白",
                    source: "三五七言"
                },
                {
                    expression: "离别苦楚",
                    poem: "相见时难别亦难，东风无力百花残",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "无题・相见时难别亦难"
                },
                {
                    expression: "无尽的相思",
                    poem: "天涯地角有穷时，只有相思无尽处",
                    dynasty: "宋",
                    author: "晏殊",
                    source: "玉楼春・春恨"
                },
                {
                    expression: "日渐憔悴",
                    poem: "思君如满月，夜夜减清辉",
                    dynasty: "唐",
                    author: "张九龄",
                    source: "赋得自君之出矣"
                },
                {
                    expression: "无处不在的思念",
                    poem: "山河远阔，人间星河，无一是你，无一不是你",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "离愁难解",
                    poem: "若教眼底无离恨，不信人间有白头",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "鹧鸪天・晚日寒鸦一片愁"
                },
                {
                    expression: "爱你无法自拔",
                    poem: "明知相思乱心神，奈何相思已入魂",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "孤夜难眠",
                    poem: "明月楼高休独倚，酒入愁肠，化作相思泪",
                    dynasty: "宋",
                    author: "范仲淹",
                    source: "苏幕遮・怀旧"
                },
                {
                    expression: "美人思念的神态",
                    poem: "美人卷珠帘，深坐蹙蛾眉",
                    dynasty: "唐",
                    author: "李白",
                    source: "怨情"
                },
                {
                    expression: "刻骨铭心",
                    poem: "玲珑骰子安红豆，入骨相思知不知",
                    dynasty: "唐",
                    author: "温庭筠",
                    source: "新添声杨柳枝词二首・其二"
                },
                {
                    expression: "默默的思念",
                    poem: "举手望月月不语，垂首思汝汝不知",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "异地苦恋",
                    poem: "花自飘零水自流，一种相思，两处闲愁",
                    dynasty: "宋",
                    author: "李清照",
                    source: "一剪梅・红藕香残玉簟秋"
                },
                {
                    expression: "借红豆表达相思之情",
                    poem: "红豆生南国，春来发几枝？",
                    dynasty: "唐",
                    author: "王维",
                    source: "相思"
                },
                {
                    expression: "期盼重逢",
                    poem: "何当共剪西窗烛，却话巴山夜雨时",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "夜雨寄北"
                },
                {
                    expression: "长久的等待",
                    poem: "寒灯纸上梨花雨凉，我等风雪又一年",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "相思成疾",
                    poem: "滴不尽相思血泪抛红豆，开不完春柳春花满画楼",
                    dynasty: "清",
                    author: "曹雪芹",
                    source: "红楼梦・红豆曲"
                },
                {
                    expression: "相思难断",
                    poem: "此情无计可消除，才下眉头，却上心头",
                    dynasty: "宋",
                    author: "李清照",
                    source: "一剪梅・红藕香残玉簟秋"
                },
                {
                    expression: "相思成烬",
                    poem: "春心莫共花争发，一寸相思一寸灰",
                    dynasty: "唐",
                    author: "李商隐",
                    source: "无题二首・其二"
                },
                {
                    expression: "愁绪难解",
                    poem: "愁似春蚕未断丝",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "轮回难断",
                    poem: "别后相思空一水，重来回首已三生",
                    dynasty: "清",
                    author: "黄景仁",
                    source: "感旧"
                },
            ]
        },
        {
            name: "真挚友情",
            items: [
                {
                    expression: "自惭形秽",
                    poem: "以我独沉久，愧君相见频",
                    dynasty: "唐",
                    author: "司空曙",
                    source: "喜外弟卢纶见宿"
                },
                {
                    expression: "幸遇知己",
                    poem: "幸得识卿桃花面，从此阡陌多暖春",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "盼友来访",
                    poem: "闻道欲来相问讯，西楼望月几回圆",
                    dynasty: "唐",
                    author: "韦应物",
                    source: "寄李儋元锡"
                },
                {
                    expression: "邀友共暖",
                    poem: "晚来天欲雪，能饮一杯无？",
                    dynasty: "唐",
                    author: "白居易",
                    source: "问刘十九"
                },
                {
                    expression: "对友人深情厚谊的感激",
                    poem: "桃花潭水深千尺，不及汪伦送我情",
                    dynasty: "唐",
                    author: "李白",
                    source: "赠汪伦"
                },
                {
                    expression: "怅然若失",
                    poem: "山回路转不见君，雪上空留马行处",
                    dynasty: "唐",
                    author: "岑参",
                    source: "白雪歌送武判官归京"
                },
                {
                    expression: "至亲厚谊",
                    poem: "平生自有分，况是蔡家亲",
                    dynasty: "唐",
                    author: "司空曙",
                    source: "喜外弟卢纶见宿"
                },
                {
                    expression: "闲适温暖",
                    poem: "绿蚁新醅酒，红泥小火炉",
                    dynasty: "唐",
                    author: "白居易",
                    source: "问刘十九"
                },
                {
                    expression: "离别难舍",
                    poem: "蜡烛有心还惜别，替人垂泪到天明",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "赠别二首・其二"
                },
                {
                    expression: "以春寄情",
                    poem: "江南无所有，聊赠一枝春",
                    dynasty: "南北朝",
                    author: "陆凯",
                    source: "赠范晔诗"
                },
                {
                    expression: "友情长存",
                    poem: "海内存知己，天涯若比邻",
                    dynasty: "唐",
                    author: "王勃",
                    source: "送杜少府之任蜀州"
                },
                {
                    expression: "遥祝平安",
                    poem: "但愿人长久，千里共婵娟",
                    dynasty: "宋",
                    author: "苏轼",
                    source: "水调歌头・明月几时有"
                },
                {
                    expression: "挚友永别",
                    poem: "垂死病中惊坐起，暗风吹雨入寒窗",
                    dynasty: "唐",
                    author: "元稹",
                    source: "闻乐天授江州司马"
                },
            ]
        },
        {
            name: "追思先贤",
            items: [
                {
                    expression: "历史遗痕",
                    poem: "折戟沉沙铁未销，自将磨洗认前朝",
                    dynasty: "唐",
                    author: "杜牧",
                    source: "赤壁"
                },
                {
                    expression: "敬仰豪杰",
                    poem: "天下英雄谁敌手？曹刘。生子当如孙仲谋",
                    dynasty: "宋",
                    author: "辛弃疾",
                    source: "南乡子・登京口北固亭有怀"
                },
                {
                    expression: "身后凄凉",
                    poem: "千秋万岁名，寂寞身后事",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "梦李白二首・其二"
                },
                {
                    expression: "生死相隔",
                    poem: "君埋泉下泥销骨，我寄人间雪满头",
                    dynasty: "唐",
                    author: "白居易",
                    source: "梦微之"
                },
                {
                    expression: "敬仰先贤",
                    poem: "出师一表真名世，千载谁堪伯仲间",
                    dynasty: "宋",
                    author: "陆游",
                    source: "书愤五首・其一"
                },
                {
                    expression: "壮志难酬",
                    poem: "出师未捷身先死，长使英雄泪满襟",
                    dynasty: "唐",
                    author: "杜甫",
                    source: "蜀相"
                },
                {
                    expression: "赞周瑜之功绩",
                    poem: "东风不与周郎便，铜雀春深锁二乔。",
                    dynasty: "唐代",
                    author: "杜牧",
                    source: "赤壁"
                },
                {
                    expression: "伤项羽之败亡",
                    poem: "江东子弟多才俊，卷土重来未可知。",
                    dynasty: "唐代",
                    author: "杜牧",
                    source: "题乌江亭"
                },
                {
                    expression: "哀夫差之失国",
                    poem: "越王勾践破吴归，义士还乡尽锦衣。宫女如花满春殿，只今惟有鹧鸪飞。",
                    dynasty: "唐代",
                    author: "李白",
                    source: "越中览古"
                },
                {
                    expression: "怀诸葛亮之智",
                    poem: "出师未捷身先死，长使英雄泪满襟。",
                    dynasty: "唐代",
                    author: "杜甫",
                    source: "蜀相"
                },
                {
                    expression: "叹李广之不遇",
                    poem: "冯唐易老，李广难封。",
                    dynasty: "唐代",
                    author: "王勃",
                    source: "滕王阁序"
                },
                {
                    expression: "怀荆轲之壮举",
                    poem: "风萧萧兮易水寒，壮士一去兮不复还。",
                    dynasty: "先秦",
                    author: "荆轲（一说为燕国人高渐离）",
                    source: "易水歌"
                },
                {
                    expression: "伤楚怀王之昏",
                    poem: "怀王冤魂唤不返，楚江落日摇秋浪。",
                    dynasty: "唐代",
                    author: "温庭筠",
                    source: "达摩支曲"
                },
                {
                    expression: "忆汉武帝之威",
                    poem: "武帝祠前云欲散，仙人掌上雨初晴。",
                    dynasty: "唐代",
                    author: "崔颢",
                    source: "行经华阴"
                },
                {
                    expression: "叹卫霍之勋业",
                    poem: "卫青不败由天幸，李广无功缘数奇。",
                    dynasty: "唐代",
                    author: "王维",
                    source: "老将行"
                },
                {
                    expression: "怀陶渊明之隐",
                    poem: "五柳先生宅，青山对结庐。",
                    dynasty: "唐代",
                    author: "许浑",
                    source: "寻戴处士"
                },
                {
                    expression: "伤阮籍之穷途",
                    poem: "步兵终日饮，校尉不言钱。",
                    dynasty: "唐代",
                    author: "张谓",
                    source: "读后汉逸人传二首"
                },
                {
                    expression: "念谢安之风流",
                    poem: "东山高卧时起来，欲济苍生未应晚。",
                    dynasty: "唐代",
                    author: "李白",
                    source: "梁园吟"
                },
                {
                    expression: "叹陈琳之才华",
                    poem: "词客有灵应识我，霸才无主始怜君。",
                    dynasty: "唐代",
                    author: "温庭筠",
                    source: "过陈琳墓"
                },
                {
                    expression: "怀孙策之英武",
                    poem: "谁向桥边吹玉笛？驻马西看孙策城。",
                    dynasty: "唐代",
                    author: "罗隐",
                    source: "春日独游禅智寺"
                },
                {
                    expression: "伤屈原之沉江",
                    poem: "屈平词赋悬日月，楚王台榭空山丘。",
                    dynasty: "唐代",
                    author: "李白",
                    source: "江上吟"
                },
                {
                    expression: "忆曹操之霸业",
                    poem: "往事越千年，魏武挥鞭，东临碣石有遗篇。",
                    dynasty: "现代",
                    author: "毛泽东",
                    source: "浪淘沙・北戴河"
                },
                {
                    expression: "叹孙权之雄略",
                    poem: "年少万兜鍪，坐断东南战未休。天下英雄谁敌手？曹刘。生子当如孙仲谋。",
                    dynasty: "宋代",
                    author: "辛弃疾",
                    source: "南乡子・登京口北固亭有怀"
                },
                {
                    expression: "怀贾谊之才学",
                    poem: "贾生年少虚垂泪，王粲春来更远游。",
                    dynasty: "唐代",
                    author: "李商隐",
                    source: "安定城楼"
                },
                {
                    expression: "伤昭君之出塞",
                    poem: "画图省识春风面，环珮空归夜月魂。",
                    dynasty: "唐代",
                    author: "杜甫",
                    source: "咏怀古迹五首・其三"
                },
                {
                    expression: "忆司马相如之赋",
                    poem: "茂陵不见封侯印，空向秋波哭逝川。",
                    dynasty: "唐代",
                    author: "温庭筠",
                    source: "过陈琳墓"
                },
                {
                    expression: "叹萧何之功绩",
                    poem: "成也萧何，败也萧何。",
                    dynasty: "宋代",
                    author: "洪迈",
                    source: "容斋续笔・萧何绐韩信"
                },
                {
                    expression: "怀项羽之豪情",
                    poem: "力拔山兮气盖世。时不利兮骓不逝。骓不逝兮可奈何！虞兮虞兮奈若何！",
                    dynasty: "秦末",
                    author: "项羽",
                    source: "垓下歌"
                },
                {
                    expression: "伤伍子胥之冤",
                    poem: "吴宫花草埋幽径，晋代衣冠成古丘。",
                    dynasty: "唐代",
                    author: "李白",
                    source: "登金陵凤凰台"
                },
                {
                    expression: "忆班超之投笔",
                    poem: "投笔怀班业，临戎想顾勋。",
                    dynasty: "唐代",
                    author: "骆宾王",
                    source: "宿温城望军营"
                },
                {
                    expression: "叹马援之壮志",
                    poem: "马革裹尸当自誓，蛾眉伐性休重说。",
                    dynasty: "宋代",
                    author: "辛弃疾",
                    source: "满江红・汉水东流"
                },
                {
                    expression: "怀贾谊之献策",
                    poem: "可怜贾谊鸿文在，独倚长沙哭岁华。",
                    dynasty: "唐代",
                    author: "刘长卿",
                    source: "自夏口至鹦鹉洲夕望岳阳寄源中丞"
                },
                {
                    expression: "伤梁鸿之高洁",
                    poem: "寂寂江山摇落处，怜君何事到天涯。",
                    dynasty: "唐代",
                    author: "刘长卿",
                    source: "长沙过贾谊宅"
                },
            ]
        },
        {
            name: "佛家经典",
            items: [
                {
                    expression: "内心素淡闲适",
                    poem: "我心素已闲，清川澹如此",
                    dynasty: "唐代",
                    author: "王维",
                    source: "青溪"
                },
                {
                    expression: "内心自在随性",
                    poem: "心似白云常自在，意如流水任东西",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "一种自在心境",
                    poem: "天平山上白云泉，云自无心水自闲",
                    dynasty: "唐代",
                    author: "白居易",
                    source: "白云泉"
                },
                {
                    expression: "一种禅意的境界",
                    poem: "观水通禅意，闻香去染心",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "内心的不染尘俗",
                    poem: "看取莲花净，应知不染心",
                    dynasty: "唐代",
                    author: "孟浩然",
                    source: "题大禹寺义公禅房"
                },
                {
                    expression: "内心无念无忧的心境",
                    poem: "心无事，如山泉自留。念无忧。恰一叶知秋",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "一种从容淡定的心境",
                    poem: "行到水穷处，坐看云起时",
                    dynasty: "唐代",
                    author: "王维",
                    source: "终南别业"
                },
                {
                    expression: "一种闲适的心境",
                    poem: "花将色不染，水与心俱闲",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "一种禅心的感悟",
                    poem: "片石孤峰窥色相，清池皓月照禅心",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "心静自宁",
                    poem: "心静即声淡，其间无古今",
                    dynasty: "唐",
                    author: "白居易",
                    source: "船夜援琴"
                },
                {
                    expression: "心纳万物",
                    poem: "身如芥子，心藏须弥",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "心念生尘",
                    poem: "起心动念间，万千红尘物",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "善恶一念",
                    poem: "花开生两面，人生佛魔间",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "相皆虚妄",
                    poem: "凡有所相，皆是虚妄",
                    dynasty: "古印度",
                    author: "释迦牟尼（经文原作者）",
                    source: "金刚经"
                },
                {
                    expression: "随缘自在",
                    poem: "得失从缘，心无增减",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "勿执外物虚幻",
                    poem: "本来无一物，何处惹尘埃",
                    dynasty: "唐代",
                    author: "惠能",
                    source: "菩提偈"
                },
                {
                    expression: "心净不受外扰",
                    poem: "心若无一物，何处惹尘埃",
                    dynasty: "明代",
                    author: "憨山德清",
                    source: "醒世歌"
                },
                {
                    expression: "世事如梦应观",
                    poem: "一切有为法，如梦幻泡影，如露亦如电，应作如是观",
                    dynasty: "唐代",
                    author: "鸠摩罗什（译）",
                    source: "金刚经"
                },
                {
                    expression: "善恶终有报应",
                    poem: "善恶到头终有报，只争来早与来迟",
                    dynasty: "明代",
                    author: "冯梦龙",
                    source: "警世通言・卷十八"
                },
                {
                    expression: "放下自我顺然",
                    poem: "人从桥上过，桥流水不流",
                    dynasty: "南北朝",
                    author: "善慧大士",
                    source: "偈"
                },
                {
                    expression: "真理内心寻觅",
                    poem: "佛在灵山莫远求，灵山只在汝心头",
                    dynasty: "明代",
                    author: "吴承恩",
                    source: "西游记・第二回"
                },
                {
                    expression: "返心自见春光",
                    poem: "终日寻春不见春，芒鞋踏遍陇头云。归来笑拈梅花嗅，春在枝头已十分",
                    dynasty: "唐代",
                    author: "无尽藏尼",
                    source: "嗅梅"
                },
                {
                    expression: "勤拂内心净尘",
                    poem: "身是菩提树，心如明镜台。时时勤拂拭，勿使惹尘埃",
                    dynasty: "唐代",
                    author: "神秀",
                    source: "菩提偈"
                },
                {
                    expression: "专注内心拒诱",
                    poem: "溪声便是广长舌，山色岂非清净身",
                    dynasty: "宋代",
                    author: "苏轼",
                    source: "赠东林总长老"
                },
                {
                    expression: "生死绚烂静美",
                    poem: "生如夏花之绚烂，死如秋叶之静美",
                    dynasty: "现代（印度）",
                    author: "泰戈尔",
                    source: "飞鸟集"
                },
                {
                    expression: "烦恼菩提一念",
                    poem: "烦恼即菩提，生死即涅盘",
                    dynasty: "唐代",
                    author: "永嘉玄觉",
                    source: "永嘉证道歌"
                },
                {
                    expression: "放下分别平等",
                    poem: "一即一切，一切即一",
                    dynasty: "唐代",
                    author: "法藏",
                    source: "华严金狮子章"
                },
                {
                    expression: "色空本质不二",
                    poem: "色不异空，空不异色，色即是空，空即是色",
                    dynasty: "唐代",
                    author: "玄奘（译）",
                    source: "般若波罗蜜多心经"
                },
                {
                    expression: "勿执三世当下",
                    poem: "过去心不可得，现在心不可得，未来心不可得",
                    dynasty: "唐代",
                    author: "鸠摩罗什（译）",
                    source: "金刚经"
                },
                {
                    expression: "勿轻善恶之行",
                    poem: "莫以善小而不为，莫以恶小而为之",
                    dynasty: "三国时期",
                    author: "刘备",
                    source: ""
                },
                {
                    expression: "洞察虚幻勿执",
                    poem: "梦幻空花，何劳把捉",
                    dynasty: "宋代",
                    author: "圆悟克勤",
                    source: "碧岩录"
                },
                {
                    expression: "得失随缘心定",
                    poem: "得失从缘，心无增减",
                    dynasty: "唐代",
                    author: "石头希迁",
                    source: "参同契"
                },
                {
                    expression: "心性本净尘染",
                    poem: "心性本净，客尘所染",
                    dynasty: "南北朝",
                    author: "求那跋陀罗（译）",
                    source: "杂阿含经"
                },
                {
                    expression: "欲知因果观今",
                    poem: "欲知前世因，今生受者是；欲知后世果，今生作者是",
                    dynasty: "清代",
                    author: "佚名",
                    source: "三世因果经"
                },
                {
                    expression: "无心万物 自无忧扰",
                    poem: "但自无心于万物，何妨万物常围绕",
                    dynasty: "唐代",
                    author: "慧忠国师",
                    source: "心王铭"
                },
                {
                    expression: "法无高下平等",
                    poem: "是法平等，无有高下",
                    dynasty: "唐代",
                    author: "鸠摩罗什（译）",
                    source: "金刚经"
                },
                {
                    expression: "心随境转无忧",
                    poem: "心随万境转，转处实能幽。随流认得性，无喜亦无忧",
                    dynasty: "唐代",
                    author: "永嘉玄觉",
                    source: "永嘉证道歌"
                },
                {
                    expression: "超越善恶执着",
                    poem: "善亦不做，恶亦不为",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "生活处处是禅",
                    poem: "行亦禅，坐亦禅，语默动静体安然",
                    dynasty: "唐代",
                    author: "庞蕴",
                    source: "诗偈"
                },
                {
                    expression: "空明心境洞彻",
                    poem: "空生大觉中，如海一沤发",
                    dynasty: "唐代",
                    author: "般剌密谛（译）",
                    source: "楞严经"
                },
                {
                    expression: "一切唯心自寻",
                    poem: "若人欲了知，三世一切佛。应观法界性，一切唯心造",
                    dynasty: "唐代",
                    author: "实叉难陀（译）",
                    source: "华严经"
                },
                {
                    expression: "不取于相心定",
                    poem: "不取于相，如如不动",
                    dynasty: "唐代",
                    author: "鸠摩罗什（译）",
                    source: "金刚经"
                },
                {
                    expression: "放下执着归真",
                    poem: "拨开世上尘氛，胸中自无火炎冰兢；消却心中鄙吝，眼前时有月到风来",
                    dynasty: "明代",
                    author: "洪应明",
                    source: "菜根谭"
                },
                {
                    expression: "心宁智生事成",
                    poem: "心宁则智生，智生则事成",
                    dynasty: "唐代",
                    author: "马祖道一",
                    source: ""
                },
                {
                    expression: "放下我执脱苦",
                    poem: "我执即烦恼，放下即自在",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "因缘果报自担",
                    poem: "因缘会遇时，果报还自受",
                    dynasty: "东晋",
                    author: "瞿昙僧伽提婆（译）",
                    source: "增壹阿含经"
                },
                {
                    expression: "慈悲为怀照世",
                    poem: "大慈念一切，慧光照世间",
                    dynasty: "南北朝",
                    author: "萧衍",
                    source: "断酒肉文"
                },
                {
                    expression: "珍惜当下修行",
                    poem: "是日已过，命亦随减。如少水鱼，斯有何乐",
                    dynasty: "唐代",
                    author: "义净（译）",
                    source: "沙弥十戒并威仪录"
                },
                {
                    expression: "言语难表真义",
                    poem: "言语道断，心行处灭",
                    dynasty: "唐代",
                    author: "澄观",
                    source: "大方广佛华严经疏"
                },
                {
                    expression: "佛在心中内修",
                    poem: "佛在心中莫浪求，灵山只在汝心头。人人有个灵山塔，好向灵山塔下修",
                    dynasty: "明代",
                    author: "王阳明",
                    source: "咏良知四首示诸生・其三"
                },
                {
                    expression: "自心归觉无邪",
                    poem: "自心归依觉，邪迷不生",
                    dynasty: "唐代",
                    author: "惠能",
                    source: "六祖坛经"
                },
                {
                    expression: "世事无常心明",
                    poem: "世事浮云变，此心孤月明",
                    dynasty: "唐代",
                    author: "皎然",
                    source: "酬乌程杨明府华雨后小亭对月见呈"
                },
                {
                    expression: "超脱世俗弃利",
                    poem: "不以一毫私利自蔽，不以一毫私欲自累",
                    dynasty: "宋代",
                    author: "朱熹",
                    source: ""
                },
                {
                    expression: "放下执着顺天",
                    poem: "云在青天水在瓶",
                    dynasty: "唐代",
                    author: "李翱",
                    source: "赠药山高僧惟俨二首・其一"
                },
                {
                    expression: "放下自解烦恼",
                    poem: "烦恼本自无，庸人自扰之",
                    dynasty: "唐代",
                    author: "慧能",
                    source: ""
                },
                {
                    expression: "言行一致为善",
                    poem: "口说善言，身行恶事，非真善也",
                    dynasty: "唐代",
                    author: "道世",
                    source: "法苑珠林"
                },
                {
                    expression: "积善积恶有庆",
                    poem: "积善之家，必有余庆；积不善之家，必有余殃",
                    dynasty: "先秦《周易",
                    author: "坤・文言》",
                    source: ""
                },
                {
                    expression: "因缘生法性空",
                    poem: "因缘所生法，我说即是空",
                    dynasty: "唐代",
                    author: "鸠摩罗什（译）",
                    source: "中论"
                },
                {
                    expression: "超越生死解脱",
                    poem: "生死事大，无常迅速，各宜努力",
                    dynasty: "",
                    author: "",
                    source: ""
                },
                {
                    expression: "万法无我成道",
                    poem: "一切法无我，得成于忍",
                    dynasty: "唐代",
                    author: "鸠摩罗什（译）",
                    source: "金刚经"
                },
                {
                    expression: "心净国安心安",
                    poem: "心净则国土净，心安则众生安",
                    dynasty: "东晋",
                    author: "慧远",
                    source: "念佛三昧诗集序"
                },
                {
                    expression: "自作自受因果",
                    poem: "自作自受，谓之因果",
                    dynasty: "清代",
                    author: "纪昀",
                    source: "阅微草堂笔记"
                },
                {
                    expression: "放下执着归真",
                    poem: "落花随水去，修竹引风来",
                    dynasty: "唐代",
                    author: "无可",
                    source: "秋寄从兄贾岛"
                },
                {
                    expression: "修行实践为要",
                    poem: "纸上得来终觉浅，绝知此事要躬行",
                    dynasty: "宋代",
                    author: "陆游",
                    source: "冬夜读书示子聿"
                },
            ]
        },
        {
            name: "道家经典",
            items: [
                {
                    expression: "大道至简",
                    poem: "大音希声，大象无形。大方无隅，大器晚成",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "顺应自然无为",
                    poem: "人法地，地法天，天法道，道法自然",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "柔弱胜强之理",
                    poem: "天下之至柔，驰骋天下之至坚",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "少私寡欲清心",
                    poem: "见素抱朴，少私寡欲",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "功成身退明智",
                    poem: "功遂身退，天之道",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "福祸相互依存",
                    poem: "祸兮福之所倚，福兮祸之所伏",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "大音希声之妙",
                    poem: "大音希声，大象无形",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "上善若水之德",
                    poem: "上善若水，水善利万物而不争",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "至简至纯之道",
                    poem: "大道至简，衍化至繁",
                    dynasty: "春秋",
                    author: "老子（有争议，大致源于道家思想）",
                    source: ""
                },
                {
                    expression: "逍遥自在心境",
                    poem: "若夫乘天地之正，而御六气之辩，以游无穷者，彼且恶乎待哉",
                    dynasty: "战国",
                    author: "庄子",
                    source: "逍遥游"
                },
                {
                    expression: "齐物忘却是非",
                    poem: "天地与我并生，而万物与我为一",
                    dynasty: "战国",
                    author: "庄子",
                    source: "齐物论"
                },
                {
                    expression: "无用方为大用",
                    poem: "人皆知有用之用，而莫知无用之用也",
                    dynasty: "战国",
                    author: "庄子",
                    source: "人间世"
                },
                {
                    expression: "顺应天命自然",
                    poem: "知其不可奈何而安之若命，德之至也",
                    dynasty: "战国",
                    author: "庄子",
                    source: "人间世"
                },
                {
                    expression: "安时处顺无忧",
                    poem: "且夫得者，时也；失者，顺也。安时而处顺，哀乐不能入也",
                    dynasty: "战国",
                    author: "庄子",
                    source: "大宗师"
                },
                {
                    expression: "生死自然循环",
                    poem: "方生方死，方死方生",
                    dynasty: "战国",
                    author: "庄子",
                    source: "齐物论"
                },
                {
                    expression: "心斋虚静悟道",
                    poem: "若一志，无听之以耳而听之以心，无听之以心而听之以气。听止于耳，心止于符。气也者，虚而待物者也。唯道集虚。虚者，心斋也",
                    dynasty: "战国",
                    author: "庄子",
                    source: "人间世"
                },
                {
                    expression: "坐忘身心两忘",
                    poem: "堕肢体，黜聪明，离形去知，同于大通，此谓坐忘",
                    dynasty: "战国",
                    author: "庄子",
                    source: "大宗师"
                },
                {
                    expression: "养生重在保身",
                    poem: "为善无近名，为恶无近刑，缘督以为经，可以保身，可以全生，可以养亲，可以尽年",
                    dynasty: "战国",
                    author: "庄子",
                    source: "养生主"
                },
                {
                    expression: "化蝶物我难分",
                    poem: "昔者庄周梦为胡蝶，栩栩然胡蝶也，自喻适志与！不知周也。俄然觉，则蘧蘧然周也。不知周之梦为胡蝶与，胡蝶之梦为周与？周与胡蝶，则必有分矣。此之谓物化",
                    dynasty: "战国",
                    author: "庄子",
                    source: "齐物论"
                },
                {
                    expression: "宁静淡泊致远",
                    poem: "非淡泊无以明志，非宁静无以致远",
                    dynasty: "三国",
                    author: "诸葛亮（有道家思想体现）",
                    source: "诫子书"
                },
                {
                    expression: "自然无为而治",
                    poem: "治大国，若烹小鲜",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "不争方能无尤",
                    poem: "夫唯不争，故天下莫能与之争",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "知足方能常乐",
                    poem: "祸莫大于不知足，咎莫大于欲得。故知足之足，常足矣",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "守柔处下之道",
                    poem: "强大处下，柔弱处上",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "返璞归真之境",
                    poem: "常德不离，复归于婴儿",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "清虚自守之法",
                    poem: "致虚极，守静笃",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "损欲复性之途",
                    poem: "为学日益，为道日损。损之又损，以至于无为",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "道法包容万物",
                    poem: "道生一，一生二，二生三，三生万物",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "超越名利束缚",
                    poem: "举世誉之而不加劝，举世非之而不加沮",
                    dynasty: "战国",
                    author: "庄子",
                    source: "逍遥游"
                },
                {
                    expression: "游心于淡之境",
                    poem: "游心于淡，合气于漠，顺物自然而无容私焉，而天下治矣",
                    dynasty: "战国",
                    author: "庄子",
                    source: "应帝王"
                },
                {
                    expression: "以理化情之智",
                    poem: "古之真人，不知说生，不知恶死；其出不欣，其入不距；翛然而往，翛然而来而已矣",
                    dynasty: "战国",
                    author: "庄子",
                    source: "大宗师"
                },
                {
                    expression: "无用之用保命",
                    poem: "山木自寇也，膏火自煎也。桂可食，故伐之；漆可用，故割之。人皆知有用之用，而莫知无用之用也",
                    dynasty: "战国",
                    author: "庄子",
                    source: "人间世"
                },
                {
                    expression: "顺天应人而行",
                    poem: "与天和者，谓之天乐",
                    dynasty: "战国",
                    author: "庄子",
                    source: "天道"
                },
                {
                    expression: "心空无物自在",
                    poem: "至人之用心若镜，不将不迎，应而不藏，故能胜物而不伤",
                    dynasty: "战国",
                    author: "庄子",
                    source: "应帝王"
                },
                {
                    expression: "逍遥尘外洒脱",
                    poem: "独与天地精神往来，而不敖倪于万物，不谴是非，以与世俗处",
                    dynasty: "战国",
                    author: "庄子",
                    source: "天下"
                },
                {
                    expression: "齐同生死豁达",
                    poem: "生也死之徒，死也生之始，孰知其纪！人之生，气之聚也；聚则为生，散则为死",
                    dynasty: "战国",
                    author: "庄子",
                    source: "知北游"
                },
                {
                    expression: "安于自然变化",
                    poem: "且夫物不胜天久矣，吾又何恶焉",
                    dynasty: "战国",
                    author: "庄子",
                    source: "大宗师"
                },
                {
                    expression: "虚己应物无累",
                    poem: "至人无己，神人无功，圣人无名",
                    dynasty: "战国",
                    author: "庄子",
                    source: "逍遥游"
                },
                {
                    expression: "养神胜于养形",
                    poem: "形劳而不休则弊，精用而不已则劳，劳则竭",
                    dynasty: "战国",
                    author: "庄子",
                    source: "刻意"
                },
                {
                    expression: "体道合真自在",
                    poem: "出入六合，游乎九州，独往独来，是谓独有。独有之人，是谓至贵",
                    dynasty: "战国",
                    author: "庄子",
                    source: "在宥"
                },
                {
                    expression: "法天贵真自然",
                    poem: "真者，精诚之至也。不精不诚，不能动人",
                    dynasty: "战国",
                    author: "庄子",
                    source: "渔父"
                },
                {
                    expression: "柔弱谦下受益",
                    poem: "强梁者不得其死，吾将以为教父",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "顺应天道而行",
                    poem: "天之道，利而不害；圣人之道，为而不争",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "功成弗居之德",
                    poem: "生而不有，为而不恃，功成而弗居",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "寡欲清心寡过",
                    poem: "五色令人目盲；五音令人耳聋；五味令人口爽；驰骋畋猎，令人心发狂；难得之货，令人行妨",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "和光同尘处世",
                    poem: "和其光，同其尘",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "静为躁君之理",
                    poem: "重为轻根，静为躁君",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "抱一守中之道",
                    poem: "载营魄抱一，能无离乎？专气致柔，能如婴儿乎？涤除玄览，能无疵乎？爱民治国，能无知（智）乎？天门开阖，能为雌乎？明白四达，能无为乎",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "玄德深不可测",
                    poem: "生而不有，为而不恃，长而不宰，是谓玄德",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "不争之争至善",
                    poem: "善为士者，不武；善战者，不怒；善胜敌者，不与；善用人者，为之下。是谓不争之德，是谓用人之力，是谓配天古之极",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
                {
                    expression: "贵柔守雌之妙",
                    poem: "知其雄，守其雌，为天下溪",
                    dynasty: "春秋",
                    author: "老子",
                    source: "道德经"
                },
            ]
        },
    ]
};
window.poemData = poemData;