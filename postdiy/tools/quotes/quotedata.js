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
        title: "骂醒拖延症",
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
        title: "🌈每天念30编改变自己的磁场",
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
            video: "media/1.mp4",
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
            video: "media/2.mp4",
            image: "https://i.pinimg.com/236x/8e/9c/89/8e9c891aea1854cafad47b89f82c4a75.jpg",
            music: "media/soft3.mp3"
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