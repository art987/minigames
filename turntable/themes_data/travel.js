// 旅行主题数据配置
const travelThemeData = {
    config: {
        title: "旅行主题",
        subtitle: "转动转盘，寻找你的下一个旅行目的地",
        description: "让转盘为你的下一次冒险提供灵感",
        totalSections: 8,
        colorBase: "#4ecdc4",
        centerImage: "https://picsum.photos/100?image=315",
        centerGif: "https://media.giphy.com/media/xT0xeuOy2Fcl9vDGiA/giphy.gif",
        symbols: {
            floatingSymbol: '✈️',
            explosionSymbol: '🌍',
            sparkleSymbol: '✨'
        }
    },
    options: [
        {
            id: 1,
            title: "巴厘岛",
            description: "\u003cp\u003e巴厘岛是印度尼西亚的度假天堂，拥有\u003cstrong\u003e美丽的海滩、神秘的寺庙和热情的文化\u003c/strong\u003e。在这里，你可以尽情享受阳光沙滩，也可以探索当地的风土人情。\u003c/p\u003e",
            imageUrl: "https://picsum.photos/350/200?random=25"
        },
        {
            id: 2,
            title: "巴黎",
            description: "\u003cp\u003e巴黎被誉为\u003cem\u003e浪漫之都\u003c/em\u003e，拥有埃菲尔铁塔、卢浮宫等世界闻名的景点。漫步在塞纳河畔，感受这座城市的\u003cstrong\u003e艺术气息和历史底蕴\u003c/strong\u003e。\u003c/p\u003e",
            imageUrl: "https://picsum.photos/350/200?random=26"
        },
        {
            id: 3,
            title: "东京",
            description: "\u003cp\u003e东京是一座\u003cu\u003e传统与现代交融\u003c/u\u003e的城市。你可以参观古老的寺庙，也可以体验最前沿的科技。\u003cem\u003e秋叶原、涩谷、浅草寺\u003c/em\u003e都是必去的地方。\u003c/p\u003e",
            imageUrl: "https://picsum.photos/350/200?random=27"
        },
        {
            id: 4,
            title: "纽约",
            description: "\u003cp\u003e纽约是世界的\u003cstrong\u003e金融和文化中心\u003c/strong\u003e，时代广场、自由女神像、中央公园等标志性景点吸引着来自世界各地的游客。这座不夜城总能给你带来惊喜。\u003c/p\u003e",
            imageUrl: "https://picsum.photos/350/200?random=28"
        },
        {
            id: 5,
            title: "马尔代夫",
            description: "\u003cp\u003e马尔代夫是\u003cem\u003e印度洋上的珍珠\u003c/em\u003e，拥有世界上最美丽的海滩和水上别墅。在这里，你可以\u003cstrong\u003e潜水、浮潜、享受阳光沙滩\u003c/strong\u003e，度过一个完美的假期。\u003c/p\u003e",
            imageUrl: "https://picsum.photos/350/200?random=29"
        },
        {
            id: 6,
            title: "瑞士",
            description: "\u003cp\u003e瑞士以其\u003cu\u003e壮丽的阿尔卑斯山景色\u003c/u\u003e和高品质的生活而闻名。\u003cem\u003e滑雪、登山、湖泊游船\u003c/em\u003e等活动让人流连忘返。瑞士的巧克力和手表也是必买的特产。\u003c/p\u003e",
            imageUrl: "https://picsum.photos/350/200?random=30"
        },
        {
            id: 7,
            title: "威尼斯",
            description: "\u003cp\u003e威尼斯是一座\u003cstrong\u003e建在水上的城市\u003c/strong\u003e，独特的运河和贡多拉是其标志。在这个浪漫的城市里，你可以乘坐贡多拉游览，参观圣马可广场和叹息桥，感受\u003cem\u003e水城的独特魅力\u003c/em\u003e。\u003c/p\u003e",
            imageUrl: "https://picsum.photos/350/200?random=31"
        },
        {
            id: 8,
            title: "泰国",
            description: "\u003cp\u003e泰国是一个\u003cu\u003e充满活力和色彩的国家\u003c/u\u003e。从曼谷的繁华都市到清迈的宁静古城，从普吉岛的美丽海滩到清莱的神秘寺庙，泰国总能给你带来\u003cstrong\u003e丰富多彩的旅行体验\u003c/strong\u003e。\u003c/p\u003e",
            imageUrl: "https://picsum.photos/350/200?random=32"
        }
    ]
};

// 导出主题数据
export default travelThemeData;