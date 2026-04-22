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
      id: 2,
      image: 'https://via.placeholder.com/400x200/4ECDC4/FFFFFF?text=二维码生成',
      title: '二维码生成工具',
      description: '快速生成各种二维码，支持自定义样式',
      tags: ['工具', '二维码', '便捷'],
      link: 'qrcode-generator.html',
      category: '效率工具'
    },
    
    {
      id: 4,
      image: 'https://via.placeholder.com/400x200/96CEB4/FFFFFF?text=图片压缩',
      title: '图片压缩工具',
      description: '在线压缩图片，保持质量减小体积',
      tags: ['图片', '压缩', '工具'],
      link: 'image-compress.html',
      category: '图片处理'
    },
    
    
    {
      id: 9,
      image: 'https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=开店计算',
      title: '开店必备60个计算公式',
      description: '帮助商家计算开店成本，优化经营',
      tags: ['开店', '计算', '财务'],
      link: 'shop_calculator.html',
      category: '财务工具'
    },
    {
      id: 10,
      image: 'https://via.placeholder.com/400x200/4ECDC4/FFFFFF?text=销售话术',
      title: '高情商客户回复话术库',
      description: '帮助商家与客户建立情感联系，提升销售效率',
      tags: ['销售', '话术', '情商'],
      link: 'xiaoshouhuashu1.html',
      category: '销售工具'
    },
    {
      id: 11,
      image: 'https://via.placeholder.com/400x200/FFB347/FFFFFF?text=销冠话术',
      title: '销冠成交话术100句',
      description: '精选80句销冠成交话术，助你提升销售业绩',
      tags: ['销售', '话术', '成交'],
      link: 'sales-tips.html',
      category: '销售工具'
    },
    {
      id: 12,
      image: 'https://via.placeholder.com/400x200/9C27B0/FFFFFF?text=二维码',
      title: '二维码生成工具',
      description: '简单实用的在线二维码生成器，支持多种内容类型',
      tags: ['二维码', '生成', '工具', '在线'],
      link: 'qrcode-generator.html',
      category: '实用工具'
    },
    {
      id: 13,
      image: 'https://via.placeholder.com/400x200/FF9800/FFFFFF?text=图片压缩',
      title: '图片压缩工具',
      description: '在线免费图片压缩工具，批量压缩JPG PNG WebP',
      tags: ['图片', '压缩', '工具', '在线'],
      link: 'image-compress.html',
      category: '实用工具'
    }
  ]
};

console.log('闪喵工具箱数据已加载');
