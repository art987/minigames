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
      image: 'https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=海报生成器',
      title: '朋友圈海报生成器',
      description: '一键生成精美朋友圈海报，支持多种模板',
      tags: ['营销', '海报', '设计'],
      link: '../editor.html',
      category: '营销工具'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/400x200/4ECDC4/FFFFFF?text=二维码生成',
      title: '二维码生成工具',
      description: '快速生成各种二维码，支持自定义样式',
      tags: ['工具', '二维码', '便捷'],
      link: 'tool-qrcode.html',
      category: '效率工具'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/400x200/45B7D1/FFFFFF?text=文案助手',
      title: '营销文案助手',
      description: '智能生成营销文案，让写作更简单',
      tags: ['文案', '营销', 'AI'],
      link: 'tool-copywriting.html',
      category: '文案工具'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/400x200/96CEB4/FFFFFF?text=图片压缩',
      title: '图片压缩工具',
      description: '在线压缩图片，保持质量减小体积',
      tags: ['图片', '压缩', '工具'],
      link: 'tool-image-compress.html',
      category: '图片处理'
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/400x200/FFEAA7/333333?text=促销计算',
      title: '促销活动计算器',
      description: '快速计算各种促销活动的成本和利润',
      tags: ['促销', '计算', '财务'],
      link: 'tool-promotion-calc.html',
      category: '财务工具'
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/400x200/DDA0DD/FFFFFF?text=客户标签',
      title: '客户标签管理',
      description: '帮助商家更好地管理客户分类和标签',
      tags: ['客户', '管理', '标签'],
      link: 'tool-customer-tags.html',
      category: '客户管理'
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/400x200/FFB347/FFFFFF?text=数据看板',
      title: '经营数据看板',
      description: '可视化展示经营数据，辅助决策',
      tags: ['数据', '分析', '看板'],
      link: 'tool-dashboard.html',
      category: '数据分析'
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/400x200/87CEEB/FFFFFF?text=直播提词',
      title: '直播提词器',
      description: '直播时的提词助手，让直播更流畅',
      tags: ['直播', '提词', '助手'],
      link: 'tool-teleprompter.html',
      category: '直播工具'
    }
  ]
};

console.log('闪喵工具箱数据已加载');
