// 闪喵小知识 - 内容数据
// 在此文件中快速增删内容数据
// visible: true 显示, false 隐藏

window.businessData = {
  channel: {
    name: '闪喵小知识',
    logo: 'images/statics/business.png',
    description: '生活百科知识备忘录'
  },
  
  hotSearches: [
    '语言表达',
    '处事智慧',
    '基础常识',
    '健康养生',
    '知识文化',
    '方法论',
    '益智'
  ],
  
  categories: [
    { id: 'language', name: '语言表达', icon: '💬' },
    { id: 'wisdom', name: '处事智慧', icon: '🧠' },
    { id: 'basics', name: '基础常识', icon: '📚' },
    { id: 'health', name: '健康养生', icon: '💪' },
    { id: 'knowledge', name: '知识文化', icon: '📖' },
    { id: 'methodology', name: '方法论', icon: '🎯' },
    { id: 'puzzle', name: '益智', icon: '🧩' }
  ],
  
  contentCards: [
    {
      id: 1,
      visible: true,
      icon: '👍',
      iconBg: '#FF6B9D',
      title: '夸娃万能话术备忘录',
      shortTitle: '夸娃话术',
      subtitle: '科学表扬孩子的话术大全，让孩子更自信',
      tags: ['育儿', '话术', '教育'],
      link: 'edu/biaoyang.html',
      category: 'language'
    },
    {
      id: 2,
      visible: true,
      icon: '😜',
      iconBg: '#DDA0DD',
      title: '土味情话备忘录',
      shortTitle: '土味情话',
      subtitle: '浪漫情话大全，增进感情的小技巧',
      tags: ['情话', '浪漫', '恋爱'],
      link: 'edu/tuweiqinghua.html',
      category: 'language'
    },
    {
      id: 3,
      visible: true,
      icon: '📖',
      iconBg: '#96CEB4',
      title: '经典古诗词名句收录',
      shortTitle: '情感诗词表达',
      subtitle: '中华经典古诗词名句鉴赏',
      tags: ['诗词', '文化', '经典'],
      link: 'edu/shici.html',
      category: 'language'
    },
    {
      id: 4,
      visible: true,
      icon: '🔤',
      iconBg: '#00B894',
      title: '地道英语口语俚语汇总',
      shortTitle: '英语口语',
      subtitle: '常用英语口语表达和俚语',
      tags: ['英语', '口语', '俚语'],
      link: 'edu/yingyukouyu.html',
      category: 'language'
    },
    {
      id: 31,
      visible: true,
      icon: '📅',
      iconBg: '#00CED1',
      title: '16天记7000英语词汇方法备忘录',
      shortTitle: '16天记7000词',
      subtitle: '挑战自己，突破英语词汇难关',
      tags: ['英语', '词汇', '记忆'],
      link: 'edu/800sentences.html',
      category: 'language'
    },
    {
      id: 5,
      visible: true,
      icon: '🌟',
      iconBg: '#87CEEB',
      title: '自我鼓励话术备忘录',
      shortTitle: '鼓励自己',
      subtitle: '低谷时的自我激励话术',
      tags: ['鼓励', '励志', '自我'],
      link: 'edu/guliziji.html',
      category: 'wisdom'
    },
    {
      id: 6,
      visible: true,
      icon: '😎',
      iconBg: '#F39C12',
      title: '拖延症治疗备忘录',
      shortTitle: '拖延症治疗备忘',
      subtitle: '战胜拖延症的有效方法',
      tags: ['拖延', '时间管理', '自我'],
      link: 'edu/tuoyanzheng.html',
      category: 'wisdom'
    },
    {
      id: 7,
      visible: true,
      icon: '📜',
      iconBg: '#FFEAA7',
      title: '人生箴言备忘录',
      shortTitle: '人性箴言',
      subtitle: '人生智慧箴言，指引前行方向',
      tags: ['箴言', '智慧', '人生'],
      link: 'edu/zhenyan.html',
      category: 'wisdom'
    },
    {
      id: 8,
      visible: true,
      icon: '💖',
      iconBg: '#1ABC9C',
      title: '108个心理学效应备忘录',
      shortTitle: '心理效应汇总',
      subtitle: '常见心理学效应及其在生活中的应用',
      tags: ['心理', '效应', '认知'],
      link: 'edu/xinlixiaoying.html',
      category: 'wisdom'
    },
    {
      id: 9,
      visible: true,
      icon: '👀',
      iconBg: '#FF6B6B',
      title: '人性阴暗面108行为备忘录',
      shortTitle: '人性阴暗行为洞察',
      subtitle: '了解人性阴暗面，学会自我保护',
      tags: ['人性', '心理', '社交'],
      link: 'edu/renxingyinan.html',
      category: 'wisdom'
    },
    {
      id: 10,
      visible: true,
      icon: '🤬',
      iconBg: '#FFB347',
      title: '骂醒自己的句子',
      shortTitle: '骂醒自己',
      subtitle: '当需要警醒时，这些话最管用',
      tags: ['励志', '警醒', '自我'],
      link: 'edu/maxingziji.html',
      category: 'wisdom'
    },
    {
      id: 11,
      visible: true,
      icon: '🚦',
      iconBg: '#6C5CE7',
      title: '儿童安全教育备忘录',
      shortTitle: '儿童安全教育',
      subtitle: '儿童安全知识和自我保护教育',
      tags: ['儿童', '安全', '教育'],
      link: 'edu/ertonganquan.html',
      category: 'basics'
    },
    {
      id: 12,
      visible: true,
      icon: '🧉',
      iconBg: '#4A90E2',
      title: '300种中成药功效用途汇总',
      shortTitle: '300种中成药功效用途备忘',
      subtitle: '常用中成药的功效、适应症、用法汇总',
      tags: ['中医', '中药', '功效'],
      link: 'edu/zhongyao.html',
      category: 'health'
    },
    {
      id: 13,
      visible: true,
      icon: '💊',
      iconBg: '#9B59B6',
      title: '100种常用西药功效用途汇总',
      shortTitle: '100种西药功效用途备忘',
      subtitle: '常见西药的功效、用法、注意事项',
      tags: ['西医', '药物', '功效'],
      link: 'edu/xiyao.html',
      category: 'health'
    },
    {
      id: 14,
      visible: true,
      icon: '👴',
      iconBg: '#E74C3C',
      title: '100个中医诊断公式',
      shortTitle: '100个中医诊断公式',
      subtitle: '中医诊断常用公式和辨证要点',
      tags: ['中医', '诊断', '公式'],
      link: 'edu/zhongyizhenduan.html',
      category: 'health'
    },
    {
      id: 15,
      visible: true,
      icon: '👨‍⚕️',
      iconBg: '#3498DB',
      title: '420个西医诊断公式',
      shortTitle: '420个西医诊断公式',
      subtitle: '西医临床诊断常用公式和标准',
      tags: ['西医', '诊断', '医学'],
      link: 'edu/xiyizhenduan.html',
      category: 'health'
    },
    {
      id: 16,
      visible: true,
      icon: '🌿',
      iconBg: '#50C878',
      title: '中医传世小偏方',
      shortTitle: '中医传世小偏方',
      subtitle: '民间流传的实用中医小偏方',
      tags: ['中医', '偏方', '实用'],
      link: 'edu/zhongyipianfang.html',
      category: 'health'
    },
    {
      id: 17,
      visible: true,
      icon: '🌷',
      iconBg: '#50C878',
      title: '生活健康养生备忘录',
      shortTitle: '健康养生',
      subtitle: '日常养生小知识，健康生活从细节开始',
      tags: ['健康', '养生', '生活'],
      link: 'edu/yangsheng.html',
      category: 'health'
    },
    {
      id: 18,
      visible: true,
      icon: '🏠',
      iconBg: '#A29BFE',
      title: '家居风水改运禁忌备忘录',
      shortTitle: '家居风水备忘录',
      subtitle: '家居风水布局与禁忌知识',
      tags: ['风水', '家居', '改运'],
      link: 'edu/jiajufengshui.html',
      category: 'knowledge'
    },
    {
      id: 19,
      visible: true,
      icon: '🏪',
      iconBg: '#FAB1A0',
      title: '店铺风水改运禁忌备忘录',
      shortTitle: '店铺风水备忘录',
      subtitle: '店铺风水布局与经营禁忌',
      tags: ['风水', '店铺', '经营'],
      link: 'edu/dianpufengshui.html',
      category: 'knowledge'
    },
    {
      id: 20,
      visible: true,
      icon: '🏛️',
      iconBg: '#98D8C8',
      title: '中国美术史重点笔记',
      shortTitle: '中国美术史',
      subtitle: '中国美术发展史重点知识梳理',
      tags: ['美术', '历史', '文化'],
      link: 'edu/cnart.html',
      category: 'knowledge'
    },
    {
      id: 21,
      visible: true,
      icon: '🐉',
      iconBg: '#45B7D1',
      title: '国画口诀汇总',
      shortTitle: '国画口诀汇总',
      subtitle: '国画学习口诀和技法要点',
      tags: ['国画', '艺术', '技法'],
      link: 'edu/guohuakoujue.html',
      category: 'knowledge'
    },
    {
      id: 22,
      visible: true,
      icon: '🖼️',
      iconBg: '#FFA07A',
      title: '中国历代画家汇集备忘录',
      shortTitle: '历代画家汇集',
      subtitle: '中国历代著名画家及其代表作品',
      tags: ['画家', '艺术', '历史'],
      link: 'edu/huajia-huiji.html',
      category: 'knowledge'
    },
    {
      id: 23,
      visible: true,
      icon: '📜',
      iconBg: '#C9B1FF',
      title: '《易经》方法论备忘录',
      shortTitle: '《易经》方法论',
      subtitle: '易经智慧与人生方法论',
      tags: ['易经', '哲学', '智慧'],
      link: 'edu/yijing-fangfalun.html',
      category: 'methodology'
    },
    {
      id: 24,
      visible: true,
      icon: '🧭',
      iconBg: '#E17055',
      title: '毛选方法论备忘录',
      shortTitle: '毛选方法论',
      subtitle: '毛泽东选集中的方法论智慧',
      tags: ['哲学', '方法论', '思想'],
      link: 'edu/maoxuan-fangfalun.html',
      category: 'methodology'
    },
    {
      id: 25,
      visible: true,
      icon: '🏛️',
      iconBg: '#FDCB6E',
      title: '资治通鉴方法论备忘录',
      shortTitle: '资治通鉴方法论',
      subtitle: '资治通鉴中的处世智慧',
      tags: ['历史', '智慧', '处世'],
      link: 'edu/zizhitongjian-fangfalun.html',
      category: 'methodology'
    },
    {
      id: 26,
      visible: true,
      icon: '✨',
      iconBg: '#74B9FF',
      title: '世界最神奇24堂课备忘录',
      shortTitle: '世界最神奇24堂课',
      subtitle: '改变人生的24堂神奇课程',
      tags: ['课程', '成长', '智慧'],
      link: 'edu/shenqi-24-lessons.html',
      category: 'methodology'
    },
    {
      id: 27,
      visible: true,
      icon: '🧩',
      iconBg: '#FD79A8',
      title: '脑筋急转弯备忘录',
      shortTitle: '脑筋急转弯',
      subtitle: '趣味脑筋急转弯，锻炼思维能力',
      tags: ['趣味', '思维', '娱乐'],
      link: 'edu/naojinjizhuanwan.html',
      category: 'puzzle'
    },
    {
      id: 28,
      visible: true,
      icon: '🌐',
      iconBg: '#81ECEC',
      title: '超实用网址汇总',
      shortTitle: '超实用网址汇总',
      subtitle: '各类实用网站资源汇总',
      tags: ['网址', '资源', '工具'],
      link: 'edu/wangzhidaohang.html',
      category: 'basics'
    },
    {
      id: 29,
      visible: false,
      icon: '💼',
      iconBg: '#FFEAA7',
      title: '兼职接单站点备忘录',
      shortTitle: '兼职接单站点备忘录',
      subtitle: '靠谱的兼职接单平台汇总',
      tags: ['兼职', '接单', '赚钱'],
      link: 'edu/job.html',
      category: 'basics'
    },
    {
      id: 30,
      visible: false,
      icon: '📦',
      iconBg: '#DFE6E9',
      title: '120个常用货源网站备忘',
      shortTitle: '120个常用货源网站备忘',
      subtitle: '批发货源网站大全',
      tags: ['货源', '批发', '电商'],
      link: 'edu/b2b.html',
      category: 'basics'
    }
  ]
};

console.log('闪喵小知识数据已加载');
