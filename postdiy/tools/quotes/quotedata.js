/**
 * 名言名句数据配置
 * @typedef {Object} QuoteItem
 * @property {string} text - 名言内容
 * @property {string} author - 作者信息
 */

/**
 * @typedef {Object} BackgroundConfig
 * @property {string} [video] - 视频文件路径（可选）
 * @property {string} [image] - 图片文件路径（可选）
 * @property {string} [music] - 背景音乐文件路径（可选）
 */

/**
 * @typedef {Object} QuoteSeries
 * @property {string} title - 系列标题
 * @property {QuoteItem[]} quotes - 名言列表
 * @property {BackgroundConfig} background - 背景配置
 * @property {string} [emoji] - 主题图标emoji（可选）
 */

/**
 * @type {Object.<number, QuoteSeries>}
 */
const quotedata = {
    1: {
        title: "拖延症",
        emoji: "🎯",
        quotes: [
            { text: "先去做，做成一堆垃圾，再慢慢改，一个粗糙的开始就是最好的开始。", author: "" },
            { text: "想干一件事，你可以先非常懒惰的去干，非常粗糙的去干，丢掉一切得失的去干，不要等自己完美了再去做！", author: "" },
            { text: "先去混，混上一段时间，你就会发现你这个技能突飞猛进了，就突然变得厉害了！", author: "" },
            { text: "只要开始了，后面越来越上手了，越有正面反馈，然后就会有起色！", author: "" },
            { text: "无从下手的时候，就随便糊弄一下,假装自己游刃有余就好了,这就是由低到高、由慢到快、量变决定质变的过程,干的烂总比不干得好，先完成，再完美！", author: "" },
            { text: "习惯拖延的人，永远赶不上立即行动的人。平凡和卓越之间，只隔了一个立即开始。", author: "" },
            { text: "别总想着等有空、等改天、等有条件，这些不过都只是为了逃避所找的借口罢了。", author: "" },
            { text: "没有什么事情是靠拖就可以完成的，想做一件事，就主动出击，立马行动。执行力，永远是改变现状的最佳路径。", author: "" },
            { text: "锻炼5分钟，身体就愿意活动了。一旦开始，身体热起来，往往就会愿意坚持下去。", author: "" },
            { text: "沟通5分钟，误会可能就消除了。试着开口5分钟，也许就能打开局面。", author: "" },
            { text: "行动5分钟，事情就会有进展了。但如果先试试看开始做，也许迎刃而解。", author: "" },
            { text: "行动是治愈忧虑的良药，而拖延会不断滋生忧虑。", author: "" },
            { text: "克服拖延最好的方法，就是把\"待会再说\"换成\"现在就做\"。", author: "" },
            { text: "一勤天下无难事，一懒世间万事休！人就像一棵树，扎根深厚，才能长成参天大树。三天打鱼，两天晒网，必定成不了大事。", author: "" },

            { text: "行动起来，能解决生活中大部分问题。想，都是问题；做，才有答案！", author: "" },
        ],
        background: {
            video: "media/1.mp4",
            image: "",
            music: "media/1.mp3"
        }
    },
    
    2: {
        title: "正念提升",
        emoji: "🌈",
        quotes: [
            { text: "我很纯净，我将越来越纯净!", author: "" },
            { text: "我能创造我想要的一切!", author: "" },
            { text: "我总是收入大于支出!", author: "" },
            { text: "我允许自己拥有想要的一切!", author: "" },
            { text: "不炫耀，不晒优越感!", author: "" },
            { text: "不试图去改变任何人!", author: "" },
            { text: "不问别人为什么，只问自己凭什么!", author: "" },
            { text: "凡事有底线，保持边界感!", author: "" },
            { text: "勇于接纳不完美的自己!", author: "" },
            { text: "拥有乐观豁达的心态!", author: "" },
            { text: "持续阅读与学习!", author: "" },
            { text: "对自己够狠，极度自律!", author: "" },
            { text: "不害怕失败，大不了从头再来!", author: "" },
            { text: "提升专注度，精进专业度!", author: "" },
            { text: "不喜欢的人或事，果断拒绝!", author: "" },
            { text: "善良，但善良中带点锋芒!", author: "" },
            { text: "我愿意改变!", author: "" },
            { text: "对自己够狠，极度自律!", author: "" },
            { text: "我很喜悦，我很富足!", author: "" },
            { text: "我很自在，我很健康!", author: "" },
            { text: "我是充满勃勃生机的人!", author: "" },
            { text: "我担心的所有事情，都不会发生!", author: "" },
            { text: "感恩亲爱的父母，给予了我生命!", author: "" },
            { text: "感恩敬爱的老师，教会了我成长!", author: "" },
            { text: "感恩帮助过我的人使我感受善良!", author: "" },
            { text: "感恩伤害过我的人让我学会坚强!", author: "" },
            { text: "我很会赚钱，因为我的执行力很强!", author: "" },
            { text: "每天都有好事在我身上发生!", author: "" },
            { text: "我愿意遇见高能量的自己!", author: "" },
            { text: "我每一天的状态都特别好!", author: "" },
            { text: "我越来越年轻!", author: "" },
            { text: "我身体的各个器官都非常健康!", author: "" },
            { text: "我的身体有超强的抵抗力!", author: "" },
            { text: "我是聪明的，我是自信的!", author: "" },
            { text: "我的工作很顺心!", author: "" },
            { text: "我想做的事总能很轻松地就做成!", author: "" },
            { text: "我可以成为我想成为的人!", author: "" },
            { text: "我很健康，我很富足，我是圆满喜悦的!", author: "" },
            { text: "我是最好的，我有资格拥有所有美好!", author: "" },
            { text: "我愿意给予这个世界和身边的人更多善意!", author: "" },
            { text: "失去的东西一定会以另外的方式回到我身边!", author: "" },
            { text: "我觉察我的心，带着感恩注入满满的正能量!", author: "" },
            { text: "我是一个行动派，想到什么就会立刻去做!", author: "" },
            { text: "我每天都在成长，每天都有好事发生!", author: "" },
            { text: "今天是美好的一天，一定能达成所愿!", author: "" },
            { text: "不害怕不合群，牛羊才成群，猛兽总独行!", author: "" },
            { text: "我只做四件事：运动、赚钱、学习、阅读!", author: "" },
            { text: "我只看四种书：历史、销售、经济、名著!", author: "" },
            { text: "我只交三种人：能力强、有教养、正能量!", author: "" },
            { text: "没有拖延症，说做就做，雷厉风行!", author: "" },
            { text: "真诚地、强烈地希望别人发财、健康、幸福!", author: "" },
            { text: "不和负面的人在一起，他们会干扰你的磁场!", author: "" },
            { text: "把自己收拾干净漂亮，心情好，好运自然来!", author: "" },
            { text: "把钱花在提升自己的地方!", author: "" },
            { text: "事以密成，语以泄败，想做的事任何人都不说!", author: "" },
            { text: "我越欣赏疼爱我自己，我就越健康美丽!", author: "" },
            { text: "我越来越有钱，赚钱对我来说轻而易举!", author: "" }
        ],
        background: {
            video: "media/2.mp4",
            image: "path/to/background2.jpg",
            music: "media/soft3.mp3"
        }
    },
    
    3: {
        title: "顶级心态",
        emoji: "💪",
        quotes: [
            { text: "允许一切发生，但我必须成长", author: "" },
            { text: "山外有山又如何，我外也有我", author: "" },
            { text: "感受到痛苦就是在进步", author: "" },
            { text: "学习是不会累死的", author: "" },
            { text: "得不到我想要的，我就会得到更好的", author: "" },
            { text: "要争气，因为有太多的不服气", author: "" },
            { text: "比起戒指大小我更想知道天地的尺寸", author: "" },
            { text: "人应该有力量，揪着自己的头发把自己从泥地里拔起来", author: "" },
            { text: "一个人的脑袋不亚于一个宇宙", author: "" },
            { text: "复杂的事简单做，简单的事重复做", author: "" },
            { text: "努力了这么久不是只为了走到这里", author: "" },
            { text: "人外有人又如何，我外也有我", author: "" },
            { text: "当信念足够强的时候奇迹久会发生", author: "" },
            { text: "只有成功的人才能诉说来时路", author: "" },
            { text: "你生命中出现的问题不是要阻止你，而是要唤醒你", author: "" },
            { text: "要相信缓慢、平和、细水长流的力量", author: "" },
            { text: "最好的学习方法就是硬学", author: "" },
            { text: "世界上最好的保鲜就是不断进步", author: "" },
            { text: "先完成，再完美", author: "" },
            { text: "先撑下去，时间会带来新的变量", author: "" }
        ],
        background: {
            video: "media/3.mp4",
            image: "https://i.pinimg.com/236x/ae/4c/90/ae4c901aea1854cafad47b89f82c4a75.jpg",
            music: "media/soft2.mp3"
        }
    },
    
    4: {
        title: "处世智慧",
        emoji: "💡",
        quotes: [
            { text: "凡事发生，皆为成就，要么助你，要么渡你", author: "" },
            { text: "目标清晰的人，世界会给他让路", author: "" },
            { text: "只筛选，不改变；只接纳，不强求", author: "" },
            { text: "不对牛弹琴，不跟傻子争辩", author: "" },
            { text: "情绪稳定，是解决一切问题的前提", author: "" },
            { text: "不回应负能量，就是最好的切断", author: "" },
            { text: "永远不说\"我不行\"，只说\"我试试\"", author: "" },
            { text: "先完成，再完美，行动治愈一切焦虑", author: "" },
            { text: "把\"凭什么\"变成\"为什么\"", author: "" },
            { text: "不与恶人缠斗，不与烂事纠缠", author: "" },
            { text: "想要什么，就直接去创造，而不是去等待", author: "" },
            { text: "凡事提前五分钟，从容不迫", author: "" },
            { text: "不和重要的人，计较不重要的事", author: "" },
            { text: "每天静坐十分钟，把心腾空", author: "" },
            { text: "别人怎么对待你，都是你默许的", author: "" },
            { text: "能用钱解决的事，千万别用人情", author: "" },
            { text: "不试图取悦所有人，只吸引同频的人", author: "" },
            { text: "遇到问题先想\"怎么办\"，而不是\"为什么是我\"", author: "" },
            { text: "时常清理圈子，远离消耗你的人", author: "" },
            { text: "多说\"没关系\"，也会真的没关系", author: "" },
            { text: "接受一切事与愿违，然后继续前行", author: "" },
            { text: "不背后议论人，话传到耳边会变味", author: "" },
            { text: "看透不说透，还是好朋友", author: "" },
            { text: "走路抬头挺胸，气场自然来", author: "" },
            { text: "不把\"没意思\"挂在嘴边", author: "" },
            { text: "定期断舍离，包括物质和感情", author: "" },
            { text: "对帮助过你的人，要懂得回报", author: "" },
            { text: "不随意发脾气，但底线要明确", author: "" },
            { text: "做自己喜欢的事，顺便赚钱", author: "" },
            { text: "不试图证明自己，尤其是向不懂你的人", author: "" },
            { text: "把\"这件事为什么发生在我身上\"转念成\"这件事想教会我什么\"", author: "" },
            { text: "睡前原谅一切，醒来便是新生", author: "" },
            { text: "凡事留三分余地，话不说满，事不做绝", author: "" },
            { text: "多夸赞他人，哪怕只是小事", author: "" },
            { text: "不把希望寄托在别人身上，自己是唯一的靠山", author: "" },
            { text: "遇到问题先自己找答案，而不是问别人", author: "" },
            { text: "不把\"我很忙\"挂在嘴边，真正高效的人不喊累", author: "" },
            { text: "感恩每一个微小的事物，磁场会变好", author: "" },
            { text: "不期待别人的理解，悲喜自渡", author: "" },
            { text: "少说\"但是\"，多说\"同时\"", author: "" },
            { text: "不把情绪写在脸上，是成年人的基本修养", author: "" },
            { text: "相信相信的力量，你信什么，就会来什么", author: "" }
        ],
        background: {
            video: "media/4.mp4",
            image: "https://i.pinimg.com/236x/8e/9c/89/8e9c891aea1854cafad47b89f82c4a75.jpg",
            music: "media/soft3.mp3"
        }
    },
    
    5: {
        title: "热爱生活",
        emoji: "🌻",
        quotes: [
            { text: "生活不在别处，当下即是全部。", author: "" },
            { text: "日子一般般，快乐很简单。", author: "" },
            { text: "风吹哪页读哪页，谁来爱我我爱谁。", author: "" },
            { text: "人生苦短，倒满倒满。", author: "" },
            { text: "生活嘛，笑一笑就好了。", author: "" },
            { text: "日子很狗，但我不敢骂它，怕它疯狂咬我。", author: "" },
            { text: "普通小孩，热爱生活中。", author: "" },
            { text: "人生如戏，我演我自己。", author: "" },
            { text: "没有动态的日子，都在认真生活。", author: "" },
            { text: "今天的心情是开口向上的抛物线。", author: "" },
            { text: "生活普普通通，但也乐在其中。", author: "" },
            { text: "人生建议：时常开心，偶尔清醒。", author: "" },
            { text: "今天比昨天好，这就是希望。", author: "" },
            { text: "生活是自己的，尽情打扮，尽情可爱。", author: "" },
            { text: "日子很滚烫，又暖又明亮。", author: "" },
            { text: "把温柔碾碎，放入生活的缝隙中。", author: "" },
            { text: "生活不是选择，而是热爱。", author: "" },
            { text: "要像星星一样，闪闪发光，自在快乐。", author: "" },
            { text: "生活总会遇见惊喜的，比如我。", author: "" },
            { text: "今天的心情是24℃的微风。", author: "" },
            { text: "人生海海，山山而川，不过尔尔。", author: "" },
            { text: "把自己的感受永远置顶。", author: "" },
            { text: "爱自己才是上上签。", author: "" },
            { text: "生活不简单，尽量简单过。", author: "" },
            { text: "不必迎合所有人，做自己就好。", author: "" },
            { text: "你说破碎也会有春天。", author: "" },
            { text: "生活没有标准答案，开心就是满分。", author: "" },
            { text: "随心而行，随遇而安。", author: "" },
            { text: "人生苦短再来一碗。", author: "" },
            { text: "生活偶尔沉闷，但跑起来就会有风。", author: "" },
            { text: "把每一天都过成自己喜欢的样子。", author: "" },
            { text: "卡路里充值成功。", author: "" },
            { text: "慢热喜静往哪走都是往前走。", author: "" },
            { text: "生活会有答案，但不会马上告诉你。", author: "" },
            { text: "日子简单，快乐不难。", author: "" },
            { text: "心若向阳，无谓悲伤。", author: "" },
            { text: "生活很苦，自己加糖。", author: "" },
            { text: "收集每一个快乐的瞬间。", author: "" },
            { text: "阳光很暖电量很满。", author: "" },
            { text: "把烦心事丢掉腾出地方装鲜花。", author: "" }
        ],
        background: {
            video: "media/5.mp4",
            image: "",
            music: "media/soft2.mp3"
        }
    },
    
    6: {
        title: "权谋金句",
        emoji: "⚔️",
        quotes: [
            { text: "棋盘上最危险的棋子，永远是那只自以为在执棋的手。", author: "" },
            { text: "权力是一面魔镜，照得见跪拜者，却照不出自己的倒影。", author: "" },
            { text: "王座下的尸骨会开花，可开出的都是食人花。", author: "" },
            { text: "真正的布局，要让对手觉得是他自己想通的。", author: "" },
            { text: "在谎言里掺七分真话，比纯毒药还要致命。", author: "" },
            { text: "刀剑斩不断乱麻，但借来的火可以。", author: "" },
            { text: "枕边风要吹进左耳，因为那儿离心脏更远。", author: "" },
            { text: "解罗裳比解战袍难，你要卸的是甲，我要破的是局。", author: "" },
            { text: "说书人总讲英雄救美，却不知美人的裙摆能绞杀千军万马。", author: "" },
            { text: "他们说裹脚布缠紧些好走路，我偏用这布条勒死所有量脚的人。", author: "" },
            { text: "玉玺要沾三次血才坐得稳：敌人的、兄弟的、自己的。", author: "" },
            { text: "明君养清流如养鹤，既要它振翅九天，又怕它真飞走了。", author: "" },
            { text: "让功臣变成权臣的从来不是野心，而是帝王深夜不熄的烛火。", author: "" },
            { text: "嫁衣上的并蒂莲，根茎都扎在棺材铺。", author: "" },
            { text: "最危险的刺客从不带刀，他们带的是圣旨。", author: "" },
            { text: "情报像风筝线，攥太紧会断，放太松就飘向别人手里。", author: "" },
            { text: "死人比活人安全？错了，棺材铺的钉子也会说话。", author: "" }
        ],
        background: {
            video: "media/1.mp4",
            image: "",
            music: "media/soft3.mp3"
        }
    },
    
    7: {
        title: "一句顶一万句",
        emoji: "📖",
        quotes: [
            { text: "世上的人遍地都是，说得着的人千千里难寻。", author: "— 刘震云" },
            { text: "一个人的孤独不是孤独，一个人找另一个人，一句话找另一句话，才是真正的孤独。", author: "— 刘震云" },
            { text: "心里有话的时候，找不到人说；找到人的时候，又没话说了。", author: "— 刘震云" },
            { text: "人最怕的不是没人陪，而是陪着你的人不懂你。", author: "— 刘震云" },
            { text: "我们都在人群中说笑，却在深夜里失眠。", author: "— 刘震云" },
            { text: "认识的人越多，越喜欢独处。", author: "— 刘震云" },
            { text: "笑脸迎人的不一定是朋友，冷眼相对的未必是敌人。", author: "— 刘震云" },
            { text: "再好的关系，也经不起利益的考验。", author: "— 刘震云" },
            { text: "人情似纸张张薄，世事如棋局局新。", author: "— 刘震云" },
            { text: "锦上添花易，雪中送炭难。", author: "— 刘震云" },
            { text: "借钱时见人心，还钱时见人品。", author: "— 刘震云" },
            { text: "交浅不言深，是成年人最基本的修养。", author: "— 刘震云" },
            { text: "你以为的将心比心，可能只是一厢情愿。", author: "— 刘震云" },
            { text: "朋友不在于多，而在于精。", author: "— 刘震云" },
            { text: "人与人最舒服的关系，是保持适当的距离。", author: "— 刘震云" },
            { text: "日子是过以后，不是过从前。", author: "— 刘震云" },
            { text: "生活不会辜负认真的人，但会教训敷衍的人。", author: "— 刘震云" },
            { text: "人生没有白走的路，每一步都算数。", author: "— 刘震云" },
            { text: "简单是复杂的终点站，朴素是奢华的升级版。", author: "— 刘震云" },
            { text: "成熟不是看懂事情，而是看轻事情。", author: "— 刘震云" },
            { text: "幸福就像手中的沙，握得越紧流失得越快。", author: "— 刘震云" },
            { text: "昨天是过期的支票，明天是期票，今天才是现金。", author: "— 刘震云" },
            { text: "人生最大的遗憾，是一直在准备生活却从未真正生活过。", author: "— 刘震云" },
            { text: "真正的贫穷不是缺钱，而是缺见识。", author: "— 刘震云" },
            { text: "时间是最好的老师，可惜它把学生都教老了。", author: "— 刘震云" },
            { text: "人过中年，惜命的最好方式，不是养生，而是\"不合群\"。", author: "— 刘震云" },
            { text: "所谓门槛：能力够了就是门，能力不够就是槛，人生的沟沟坎坎，多半是能力不足所致。", author: "— 刘震云" },
            { text: "不要轻易被人使唤，别人使唤习惯了，你就真成容易欺负的烂好人了。", author: "— 刘震云" },
            { text: "形象一定要走在能力前面，不然你的能力很容易被低估。", author: "— 刘震云" },
            { text: "好朋友不是通过努力争取来的，而是在各自的道路上，努力奔跑时遇见的。", author: "— 刘震云" },
            { text: "有些事不用试探，感觉不对劲就是不对劲。", author: "— 刘震云" },
            { text: "真正的朋友一定会越来越少，不要在乎失去谁，你最应该在乎的还剩下谁。", author: "— 刘震云" },
            { text: "不管你年龄多大，只要你太容易相信别人，你就拥有绝对的死穴。", author: "— 刘震云" },
            { text: "当你毫无保留地信任一个人，最终只会有两种结果，不是生命中的那个人，就是生命中的一堂课。", author: "— 刘震云" },
            { text: "人生路上最好的导师：亲戚的冷漠，父母的低头，爱人的背叛，朋友的离开，还有你那干瘪的口袋。", author: "— 刘震云" },
            { text: "努力不是为了鹤立鸡群，而是离开那群鸡。", author: "— 刘震云" },
            { text: "如果一个人要你顾全大局时，那么他的潜台词就是：你要牺牲自己。", author: "— 刘震云" },
            { text: "人家的墙倒了，不推也是一种善良。", author: "— 刘震云" },
            { text: "永远记住：和你翻过脸的人，永远不可能再成为你的朋友，不管你们是什么关系。", author: "— 刘震云" },
            { text: "要远离那些不出钱，不出力，而且建议还特别多的人，可敬之，但必须远之。", author: "— 刘震云" },
            { text: "知道的，别全说；看到的，别全信；好听的，别当真；难听的，别较真。", author: "— 刘震云" },
            { text: "世界上最可怕的事，是你把别人当成了朋友，别人没把你当人。", author: "— 刘震云" },
            { text: "没有人有义务要满足你的期待，包括你自己，即使是你的影子，也会在黑暗里离开你。", author: "— 刘震云" },
            { text: "小时候老师教我们，对不起，然后没关系。长大后社会教我们，没关系？那就对不起了。", author: "— 刘震云" },
            { text: "永远不要用离开去威胁任何人，你会发现，原来你没那么重要。", author: "— 刘震云" },
            { text: "别人可以自嘲，但你千万不要跟着附和；自嘲是谦虚，但你只要一附和，味道就变了。", author: "— 刘震云" },
            { text: "你想发怒，但是你忍住了，这就是本事；你想放弃，但你坚持住了，这就是能力；你想辩解，但是你沉默了，这就是修为。", author: "— 刘震云" },
            { text: "你对别人再好，都不如对别人有用，无论你多善良，只要你没有价值，就没有人会在意你。", author: "— 刘震云" },
            { text: "比起忽冷忽热，还是孤独比较让人踏实。", author: "— 刘震云" },
            { text: "宁愿不说话，看起来像个傻子，也不要开口证明自己的确如此。", author: "— 刘震云" }
        ],
        background: {
            video: "media/2.mp4",
            image: "",
            music: "media/soft2.mp3"
        }
    }
};

/**
 * 数据验证函数
 * @param {any} data - 待验证的数据
 * @returns {boolean} - 数据是否有效
 */
function validateQuoteData(data) {
    if (!data || typeof data !== 'object') {
        console.error('数据无效：数据不是对象');
        return false;
    }
    
    if (!data.title || typeof data.title !== 'string') {
        console.error('数据无效：缺少title属性或title不是字符串');
        return false;
    }
    
    if (!Array.isArray(data.quotes) || data.quotes.length === 0) {
        console.error('数据无效：quotes不是数组或为空');
        return false;
    }
    
    // 验证每个quote项
    for (const quote of data.quotes) {
        if (!quote.text || typeof quote.text !== 'string') {
            console.error('数据无效：quote缺少text属性或text不是字符串');
            return false;
        }
        if (quote.author && typeof quote.author !== 'string') {
            console.error('数据无效：author不是字符串');
            return false;
        }
    }
    
    // 验证background配置
    if (!data.background || typeof data.background !== 'object') {
        console.error('数据无效：缺少background配置');
        return false;
    }
    
    return true;
}

/**
 * 获取有效的数据系列
 * @param {number} seriesId - 系列ID
 * @returns {QuoteSeries|null} - 有效的数据系列或null
 */
function getValidQuoteSeries(seriesId) {
    const data = quotedata[seriesId];
    if (!data) {
        console.warn(`系列ID ${seriesId} 不存在，使用默认系列1`);
        return quotedata[1];
    }
    
    if (!validateQuoteData(data)) {
        console.warn(`系列ID ${seriesId} 数据无效，使用默认系列1`);
        return quotedata[1];
    }
    
    return data;
}

// 导出数据和函数供外部使用
window.quotedata = quotedata;
window.validateQuoteData = validateQuoteData;
window.getValidQuoteSeries = getValidQuoteSeries;