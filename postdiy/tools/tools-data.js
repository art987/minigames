// 闪喵工具箱 - 工具数据
// 在此文件中快速增删工具数据

window.toolsData = {
  channel: {
    name: '闪喵工具箱',
    logo: 'images/statics/business.png',
    description: '商家必备的实用工具合集'
  },
  
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
  
  categories: [
    { id: 'life', name: '便民服务', icon: '📞' },
    { id: 'music', name: '音乐疗愈', icon: '🎵' },    
    { id: 'psychology', name: '心理测评', icon: '🧠' },
    { id: 'image', name: '图片处理', icon: '🖼️' },
    { id: 'efficiency', name: '效率工具', icon: '⚡' },
    { id: 'shopping', name: '购物工具', icon: '🛒' },
    
    { id: 'finance', name: '财务工具', icon: '💰' },
    { id: 'sales', name: '销售工具', icon: '💼' },
    { id: 'culture', name: '文化教育', icon: '📚' }
  ],
  
  toolCards: [
    {
      id: 1,
      icon: '🖼️',
      iconBg: '#4CAF50',
      title: '图片压缩工具',
      shortTitle: '图片压缩',
      subtitle: '在线免费图片压缩工具，批量压缩JPG PNG WebP',
      tags: ['图片', '压缩', '批量'],
      link: 'image-compress/image-compress.html',
      category: 'image'
    },
    {
      id: 2,
      icon: '📱',
      iconBg: '#2196F3',
      title: '二维码生成工具',
      shortTitle: '二维码生成',
      subtitle: '快速生成各种二维码，支持自定义样式',
      tags: ['工具', '二维码', '便捷'],
      link: 'qrcode-generator/qrcode-generator.html',
      category: 'efficiency'
    },
    {
      id: 3,
      icon: '✂️',
      iconBg: '#9C27B0',
      title: '在线抠图工具',
      shortTitle: '在线抠图',
      subtitle: 'AI智能抠图，自动识别主体，一键去除背景',
      tags: ['图片', '抠图', 'AI'],
      link: 'https://zh.bgsub.com/webapp/',
      category: 'image',
      external: true
    },
    {
      id: 4,
      icon: '🇨🇳',
      iconBg: '#F44336',
      title: '国货品牌',
      shortTitle: '国货品牌',
      subtitle: '国货品牌导航，高性价比口碑老牌放心使用',
      tags: ['购物', '品牌', '国货'],
      link: 'cnbrand/',
      category: 'life',
      external: false
    },
    {
      id: 5,
      icon: '📞',
      iconBg: '#FF9800',
      iconBgImage: 'gonggong-rexian/covers/tel.png',
      title: '中国公共电话热线大全',
      shortTitle: '公共电话热线',
      subtitle: '紧急求助、政务咨询、消费者维权、法律援助等',
      tags: ['热线', '电话', '便民'],
      link: 'gonggong-rexian/index.html',
      category: 'life'
    },
    {
      id: 6,
      icon: '✨',
      iconBg: '#FFD700',
      title: 'SVG神光卡片系统',
      shortTitle: '神光卡片',
      subtitle: 'SVG图形动态光效展示，支持脉冲发光、放射圣光、粒子特效',
      tags: ['SVG', '光效', '动画'],
      link: 'light/index.html',
      category: 'life'
    },
    
    {
      id: 7,
      icon: '👶',
      iconBg: '#E91E63',
      iconBgImage: 'music/img/001.gif',
      title: '精选经典胎教音乐',
      shortTitle: '胎教音乐',
      subtitle: '精选最适合胎教的经典音乐合集，莫扎特巴赫等大师作品',
      tags: ['音乐', '胎教', '古典'],
      link: 'music/taijiao.html',
      category: 'music'
    },
    
    {
      id: 14,
      icon: '🎶',
      iconBg: '',
      iconBgImage: 'music/img/yangsheng/csl.png',
      title: '精选养生音乐合集',
      shortTitle: '养生音乐',
      subtitle: '传统民乐与养生保健音乐，古筝琵琶箫等民族器乐',
      tags: ['音乐', '养生', '民乐'],
      link: 'music/yangsheng.html',
      category: 'music'
    },
     
    {
      id: 15,
      icon: '🎵',
      iconBg: '#4CAF50',
      iconBgImage: 'music/img/wuyin/cjhyy.png',
      title: '角音疗肝音乐',
      shortTitle: '角音疗肝',
      subtitle: '角音属木入肝经，疏肝解郁调和气血，精选12首经典曲目',
      tags: ['音乐', '养生', '角音'],
      link: 'music/jiaoyin.html',
      category: 'music'
    },
    {
      id: 16,
      icon: '🎵',
      iconBg: '#F44336',
      iconBgImage: 'music/img/wuyin/bncf.png',
      title: '徵音养心疗愈音乐',
      shortTitle: '徵音养心',
      subtitle: '徵音属火入心经，养心安神活血化瘀，精选12首经典曲目',
      tags: ['音乐', '养生', '徵音'],
      link: 'music/zhiyin.html',
      category: 'music'
    },
    {
      id: 17,
      icon: '🎵',
      iconBg: '#FFC107',
      iconBgImage: 'music/img/wuyin/qhyy.png',
      title: '宫音养脾疗愈音乐',
      shortTitle: '宫音养脾',
      subtitle: '宫音属土入脾经，健脾益气调和脾胃，精选12首经典曲目',
      tags: ['音乐', '养生', '宫音'],
      link: 'music/gongyin.html',
      category: 'music'
    },
    {
      id: 18,
      icon: '🎵',
      iconBg: '#9C27B0',
      iconBgImage: 'music/img/wuyin/ycbx.png',
      title: '商音润肺疗愈音乐',
      shortTitle: '商音润肺',
      subtitle: '商音属金入肺经，润肺止咳宣肺利气，精选14首经典曲目',
      tags: ['音乐', '养生', '商音'],
      link: 'music/shangyin.html',
      category: 'music'
    },
    {
      id: 19,
      icon: '🎵',
      iconBg: '#2196F3',
      iconBgImage: 'music/img/wuyin/lz.png',
      title: '羽音养肾疗愈音乐',
      shortTitle: '羽音养肾',
      subtitle: '羽音属水入肾经，滋肾养精益肾固本，精选12首经典曲目',
      tags: ['音乐', '养生', '羽音'],
      link: 'music/yuyin.html',
      category: 'music'
    },
    {
      id: 20,
      icon: '🎹',
      iconBg: '#FFD700',
      iconBgImage: 'music/img/beethoven/02-moonlight.svg',
      title: '贝多芬经典钢琴合集',
      shortTitle: '贝多芬钢琴',
      subtitle: '贝多芬12首传世钢琴名作，《致爱丽丝》《月光奏鸣曲》《悲怆》《热情》等',
      tags: ['音乐', '古典', '钢琴', '贝多芬'],
      link: 'music/beethoven.html',
      category: 'music'
    },
    {
      id: 9,
      icon: '🧮',
      iconBg: '#795548',
      title: '开店必备60个计算公式',
      shortTitle: '开店计算公式',
      subtitle: '帮助商家计算开店成本，优化经营',
      tags: ['开店', '计算', '财务'],
      link: 'shop_calculator/shop_calculator.html',
      category: 'finance'
    },
    {
      id: 10,
      icon: '💬',
      iconBg: '#607D8B',
      title: '高情商客户回复话术库',
      shortTitle: '客户回复话术',
      subtitle: '帮助商家与客户建立情感联系，提升销售效率',
      tags: ['销售', '话术', '情商'],
      link: 'xiaoshouhuashu1/xiaoshouhuashu1.html',
      category: 'sales'
    },
    {
      id: 11,
      icon: '🏆',
      iconBg: '#FF5722',
      title: '销冠成交话术100句',
      shortTitle: '销冠话术',
      subtitle: '精选80句销冠成交话术，助你提升销售业绩',
      tags: ['销售', '话术', '成交'],
      link: 'sales-tips/sales-tips.html',
      category: 'sales'
    },
    {
      id: 12,
      icon: '📚',
      iconBg: '#3F51B5',
      title: '名言名句展示',
      shortTitle: '名言名句',
      subtitle: '精选古今中外名言名句，激励人生，启迪智慧',
      tags: ['名言', '励志', '智慧'],
      link: 'quotes/index.html',
      category: 'culture'
    },
    {
      id: 13,
      icon: '🧠',
      iconBg: '#8BC34A',
      title: '小本本公益测试平台',
      shortTitle: '公益测试平台',
      subtitle: '完全免费无套路，包含心理测评、爱情关系、职业学习等测试',
      tags: ['测试', '心理', '公益'],
      link: 'test/index.html',
      category: 'psychology'
    }
  ]
};

console.log('闪喵工具箱数据已加载');
