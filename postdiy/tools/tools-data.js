// 闪喵工具箱 - 工具数据
// 在此文件中快速增删工具数据

window.toolsData = {
  // 频道配置
  channel: {
    name: '闪喵工具箱',
    logo: 'images/statics/business.png', // 可以使用与主站相同的 logo
    description: '商家必备的实用工具合集'
  },
  
  // 热搜词列表
  hotSearches: [
    '营销工具',
    '图片处理',
    '文案生成',
    '数据分析',
    '客户管理',
    '促销计算器',
    '二维码生成',
    '海报设计',
    '短视频工具',
    '直播助手'
  ],
  
  // 工具卡片数据
  toolCards: [
    {
      id: 1,
      image: 'image-compress/image-compress.png',
      title: '图片压缩工具',
      description: '在线免费图片压缩工具，批量压缩JPG PNG WebP',
      tags: ['图片', '压缩', '批量'],
      link: 'image-compress/image-compress.html',
      category: '图片处理'
    },
    {
      id: 2,
      image: 'qrcode-generator/qrcode-generator.png',
      title: '二维码生成工具',
      description: '快速生成各种二维码，支持自定义样式',
      tags: ['工具', '二维码', '便捷'],
      link: 'qrcode-generator/qrcode-generator.html',
      category: '效率工具'
    },
    {
      id: 3,
      image: 'bg-remove.png',
      title: '在线抠图工具',
      description: 'AI智能抠图，自动识别主体，一键去除背景（需编译 Rembg WASM）',
      tags: ['图片', '抠图', 'AI'],
      link: 'https://zh.bgsub.com/webapp/',
      category: '图片处理',
      external: true
    },
    {
      id: 4,
      image: 'cnbrands.png',
      title: '国货品牌',
      description: '国货品牌导航 - 高性价比 口碑老牌 放心使用 支持国货，点亮生活',
      tags: ['购物', '品牌', '国货'],
      link: 'https://peacelove.top/cnbrand/index.html',
      category: '购物工具'
    },
    {
      id: 5,
      image: 'gonggong-rexian/gonggong-rexian.png',
      title: '中国公共电话热线大全',
      description: '中国各类公共电话热线大全，包括紧急求助、政务咨询、消费者维权、法律援助等',
      tags: ['热线', '电话', '便民'],
      link: 'gonggong-rexian/index.html',
      category: '生活服务'
    },
    {
      id: 6,
      image: 'music/wuyin.png',
      title: '古代五音疗愈曲目',
      description: '依据《黄帝内经》五音理论，汇总角、徵、宫、商、羽五类疗愈曲目',
      tags: ['音乐', '养生', '五音'],
      link: 'music/wuyin.html',
      category: '音乐养生'
    },
    {
      id: 7,
      image: 'music/taijiao.png',
      title: '精选经典胎教音乐',
      description: '精选最适合胎教的经典音乐合集，包括莫扎特、巴赫等大师作品',
      tags: ['音乐', '胎教', '古典'],
      link: 'music/taijiao.html',
      category: '音乐养生'
    },
    {
      id: 8,
      image: 'music/liaoyu.png',
      title: '疗愈音乐养生曲目单',
      description: '一份涵盖古今各类音乐的养生治疗曲目单，助您通过音乐调节身心',
      tags: ['音乐', '养生', '疗愈'],
      link: 'music/liaoyu.html',
      category: '音乐养生'
    },
    {
      id: 9,
      image: 'shop_calculator/shop_calculator.png',
      title: '开店必备60个计算公式',
      description: '帮助商家计算开店成本，优化经营',
      tags: ['开店', '计算', '财务'],
      link: 'shop_calculator/shop_calculator.html',
      category: '财务工具'
    },
    {
      id: 10,
      image: 'xiaoshouhuashu1/xiaoshouhuashu1.png',
      title: '高情商客户回复话术库',
      description: '帮助商家与客户建立情感联系，提升销售效率',
      tags: ['销售', '话术', '情商'],
      link: 'xiaoshouhuashu1/xiaoshouhuashu1.html',
      category: '销售工具'
    },
    {
      id: 11,
      image: 'sales-tips/sales-tips.png',
      title: '销冠成交话术100句',
      description: '精选80句销冠成交话术，助你提升销售业绩',
      tags: ['销售', '话术', '成交'],
      link: 'sales-tips/sales-tips.html',
      category: '销售工具'
    },
    {
      id: 12,
      image: 'quotes/quotes.png',
      title: '名言名句展示',
      description: '精选古今中外名言名句，激励人生，启迪智慧',
      tags: ['名言', '励志', '智慧'],
      link: 'quotes/index.html',
      category: '文化教育'
    }
  ]
};

console.log('闪喵工具箱数据已加载');
