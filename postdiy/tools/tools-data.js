// 闪喵工具箱 - 工具数据
// 在此文件中快速增删工具数据
// visible: true 显示, false 隐藏

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
    { id: 'culture', name: '精神疗愈', icon: '📚' }, 
    { id: 'music', name: '音乐疗愈', icon: '🎵' },    
    { id: 'psychology', name: '心理测评', icon: '🧠' },
    { id: 'sales', name: '销售工具', icon: '💼' },
    { id: 'image', name: '图片处理', icon: '🖼️' },
    { id: 'efficiency', name: '效率工具', icon: '⚡' },
    { id: 'shopping', name: '购物工具', icon: '🛒' },
    
    { id: 'finance', name: '财务工具', icon: '💰' }
    
  ],
  
  toolCards: [
    {
      id: 1,
      visible: false,
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
      visible: true,
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
      visible: true,
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
      visible: true,
      icon: '🇨🇳',
      iconBg: '#ffffffff',
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
      visible: true,
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
      visible: true,
      icon: '☯️',
      iconBg: '#FFD700',
      title: '道教祈福神尊壁纸全集',
      shortTitle: '道教神尊壁纸',
      subtitle: '108愿12大主题，含三清天尊、财神、文昌帝君等神像壁纸',
      tags: ['道教', '壁纸', '祈福', '神尊'],
      link: 'light/index.html',
      category: 'life'
    },
    {
      id: 22,
      visible: true,
      icon: '📜',
      iconBg: '#fffd6bff',
      title: '龙虎山天师符箓转运壁纸',
      shortTitle: '天师符箓壁纸',
      subtitle: '15大神符壁纸，消灾、旺财、健康、平安、镇宅等',
      tags: ['道教', '符箓', '壁纸', '转运'],
      link: 'light/fulu.html',
      category: 'life'
    },
    
    {
      id: 7,
      visible: true,
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
      visible: true,
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
      visible: true,
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
      visible: true,
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
      visible: true,
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
      visible: true,
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
      visible: true,
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
      visible: true,
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
      id: 21,
      visible: true,
      icon: '🎷',
      iconBg: '#8B4513',
      iconBgImage: 'music/img/saxophone/01-going-home.svg',
      title: '萨克斯世界名曲专辑',
      shortTitle: '萨克斯名曲',
      subtitle: 'Kenny G、传奇乐坊16首萨克斯经典，《回家》《我心永恒》《梁祝》《无心快语》等',
      tags: ['音乐', '爵士', '萨克斯', 'Kenny G'],
      link: 'music/saxophone.html',
      category: 'music'
    },
    {
      id: 9,
      visible: true,
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
      id: 11,
      visible: true,
      icon: '🏆',
      iconBg: '#FF5722',
      title: '销售黄金话术',
      shortTitle: '销售黄金话术',
      subtitle: '精选80句销冠成交话术，助你提升销售业绩',
      tags: ['销售', '话术', '成交'],
      link: 'sales-tips/index.html',
      category: 'sales'
    },
    {
      id: 12,
      visible: true,
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
      visible: false,
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
