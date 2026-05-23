// 闪喵小知识 - 内容数据
// 在此文件中快速增删内容数据

window.businessData = {
  // 频道配置
  channel: {
    name: '闪喵小知识',
    logo: 'images/statics/business.png',
    description: '生活百科知识备忘录'
  },
  
  // 热搜词列表
  hotSearches: [
    '育儿知识',
    '健康养生',
    '中医知识',
    '西医知识',
    '心理学',
    '传统文化',
    '诗词歌赋',
    '英语学习',
    '风水知识',
    '安全急救',
    '实用工具',
    '沟通技巧',
    '自我提升',
    '趣味知识',
    '人生智慧'
  ],
  
  // 内容卡片数据
  contentCards: [
    {
      id: 1,
      image: 'https://via.placeholder.com/400x200/FF6B9D/FFFFFF?text=育儿知识',
      title: '夸娃万能话术备忘录',
      description: '科学表扬孩子的话术大全，让孩子更自信',
      tags: ['育儿', '话术', '教育'],
      link: 'edu/biaoyang.html',
      category: '育儿知识'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/400x200/50C878/FFFFFF?text=健康养生',
      title: '生活健康养生备忘录',
      description: '日常养生小知识，健康生活从细节开始',
      tags: ['健康', '养生', '生活'],
      link: 'edu/yangsheng.html',
      category: '健康养生'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/400x200/4A90E2/FFFFFF?text=中医知识',
      title: '300种中成药功效用途汇总',
      description: '常用中成药的功效、适应症、用法汇总',
      tags: ['中医', '中药', '功效'],
      link: 'edu/zhongyao.html',
      category: '健康养生'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/400x200/E74C3C/FFFFFF?text=中医知识',
      title: '100个中医诊断公式',
      description: '中医诊断常用公式和辨证要点',
      tags: ['中医', '诊断', '公式'],
      link: 'edu/zhongyizhenduan.html',
      category: '健康养生'
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/400x200/F39C12/FFFFFF?text=中医知识',
      title: '中医传世小偏方',
      description: '民间流传的实用中医小偏方',
      tags: ['中医', '偏方', '实用'],
      link: 'edu/zhongyipianfang.html',
      category: '健康养生'
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/400x200/3498DB/FFFFFF?text=西医知识',
      title: '420个西医诊断公式',
      description: '西医临床诊断常用公式和标准',
      tags: ['西医', '诊断', '医学'],
      link: 'edu/xiyizhenduan.html',
      category: '健康养生'
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/400x200/9B59B6/FFFFFF?text=西医知识',
      title: '100种常用西药功效用途汇总',
      description: '常见西药的功效、用法、注意事项',
      tags: ['西医', '药物', '功效'],
      link: 'edu/xiyao.html',
      category: '健康养生'
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/400x200/1ABC9C/FFFFFF?text=心理学',
      title: '108个心理学效应备忘录',
      description: '常见心理学效应及其在生活中的应用',
      tags: ['心理', '效应', '认知'],
      link: 'edu/xinlixiaoying.html',
      category: '心理调节'
    },
    {
      id: 9,
      image: 'https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=心理学',
      title: '人性阴暗面108行为备忘录',
      description: '了解人性阴暗面，学会自我保护',
      tags: ['人性', '心理', '社交'],
      link: 'edu/renxingyinan.html',
      category: '心理调节'
    },
    {
      id: 10,
      image: 'https://via.placeholder.com/400x200/FFEAA7/333333?text=沟通技巧',
      title: '人生箴言备忘录',
      description: '人生智慧箴言，指引前行方向',
      tags: ['箴言', '智慧', '人生'],
      link: 'edu/zhenyan.html',
      category: '人际交往'
    },
    {
      id: 11,
      image: 'https://via.placeholder.com/400x200/DDA0DD/FFFFFF?text=沟通技巧',
      title: '土味情话备忘录',
      description: '浪漫情话大全，增进感情的小技巧',
      tags: ['情话', '浪漫', '恋爱'],
      link: 'edu/tuweiqinghua.html',
      category: '人际交往'
    },
    {
      id: 12,
      image: 'https://via.placeholder.com/400x200/FFB347/FFFFFF?text=自我提升',
      title: '骂醒自己的句子',
      description: '当需要警醒时，这些话最管用',
      tags: ['励志', '警醒', '自我'],
      link: 'edu/maxingziji.html',
      category: '心理调节'
    },
    {
      id: 13,
      image: 'https://via.placeholder.com/400x200/87CEEB/FFFFFF?text=自我提升',
      title: '自我鼓励话术备忘录',
      description: '低谷时的自我激励话术',
      tags: ['鼓励', '励志', '自我'],
      link: 'edu/guliziji.html',
      category: '心理调节'
    },
    {
      id: 14,
      image: 'https://via.placeholder.com/400x200/96CEB4/FFFFFF?text=传统文化',
      title: '经典古诗词名句收录',
      description: '中华经典古诗词名句鉴赏',
      tags: ['诗词', '文化', '经典'],
      link: 'edu/shici.html',
      category: '传统文化'
    },
    {
      id: 15,
      image: 'https://via.placeholder.com/400x200/45B7D1/FFFFFF?text=传统文化',
      title: '国画口诀汇总',
      description: '国画学习口诀和技法要点',
      tags: ['国画', '艺术', '技法'],
      link: 'edu/guohuakoujue.html',
      category: '传统文化'
    },
    {
      id: 16,
      image: 'https://via.placeholder.com/400x200/FFA07A/FFFFFF?text=传统文化',
      title: '中国历代画家汇集备忘录',
      description: '中国历代著名画家及其代表作品',
      tags: ['画家', '艺术', '历史'],
      link: 'edu/huajia-huiji.html',
      category: '传统文化'
    },
    {
      id: 17,
      image: 'https://via.placeholder.com/400x200/98D8C8/FFFFFF?text=传统文化',
      title: '中国美术史重点笔记',
      description: '中国美术发展史重点知识梳理',
      tags: ['美术', '历史', '文化'],
      link: 'edu/cnart.html',
      category: '传统文化'
    },
    {
      id: 18,
      image: 'https://via.placeholder.com/400x200/C9B1FF/FFFFFF?text=传统文化',
      title: '《易经》方法论备忘录',
      description: '易经智慧与人生方法论',
      tags: ['易经', '哲学', '智慧'],
      link: 'edu/yijing-fangfalun.html',
      category: '传统文化'
    },
    {
      id: 19,
      image: 'https://via.placeholder.com/400x200/FDCB6E/333333?text=传统文化',
      title: '资治通鉴方法论备忘录',
      description: '资治通鉴中的处世智慧',
      tags: ['历史', '智慧', '处世'],
      link: 'edu/zizhitongjian-fangfalun.html',
      category: '传统文化'
    },
    {
      id: 20,
      image: 'https://via.placeholder.com/400x200/E17055/FFFFFF?text=传统文化',
      title: '毛选方法论备忘录',
      description: '毛泽东选集中的方法论智慧',
      tags: ['哲学', '方法论', '思想'],
      link: 'edu/maoxuan-fangfalun.html',
      category: '传统文化'
    },
    {
      id: 21,
      image: 'https://via.placeholder.com/400x200/74B9FF/FFFFFF?text=传统文化',
      title: '世界最神奇24堂课备忘录',
      description: '改变人生的24堂神奇课程',
      tags: ['课程', '成长', '智慧'],
      link: 'edu/shenqi-24-lessons.html',
      category: '传统文化'
    },
    {
      id: 22,
      image: 'https://via.placeholder.com/400x200/00B894/FFFFFF?text=英语学习',
      title: '地道英语口语俚语汇总',
      description: '常用英语口语表达和俚语',
      tags: ['英语', '口语', '俚语'],
      link: 'edu/yingyukouyu.html',
      category: '学习方法'
    },
    {
      id: 23,
      image: 'https://via.placeholder.com/400x200/FD79A8/FFFFFF?text=趣味知识',
      title: '脑筋急转弯备忘录',
      description: '趣味脑筋急转弯，锻炼思维能力',
      tags: ['趣味', '思维', '娱乐'],
      link: 'edu/naojinjizhuanwan.html',
      category: '趣味知识'
    },
    {
      id: 24,
      image: 'https://via.placeholder.com/400x200/6C5CE7/FFFFFF?text=安全知识',
      title: '儿童安全教育备忘录',
      description: '儿童安全知识和自我保护教育',
      tags: ['儿童', '安全', '教育'],
      link: 'edu/ertonganquan.html',
      category: '安全急救'
    },
    {
      id: 25,
      image: 'https://via.placeholder.com/400x200/A29BFE/FFFFFF?text=风水知识',
      title: '家居风水改运禁忌备忘录',
      description: '家居风水布局与禁忌知识',
      tags: ['风水', '家居', '改运'],
      link: 'edu/jiajufengshui.html',
      category: '风水知识'
    },
    {
      id: 26,
      image: 'https://via.placeholder.com/400x200/FAB1A0/FFFFFF?text=风水知识',
      title: '店铺风水改运禁忌备忘录',
      description: '店铺风水布局与经营禁忌',
      tags: ['风水', '店铺', '经营'],
      link: 'edu/dianpufengshui.html',
      category: '风水知识'
    },
    {
      id: 27,
      image: 'https://via.placeholder.com/400x200/81ECEC/FFFFFF?text=实用工具',
      title: '超实用网址汇总',
      description: '各类实用网站资源汇总',
      tags: ['网址', '资源', '工具'],
      link: 'edu/wangzhidaohang.html',
      category: '实用工具'
    },
    {
      id: 28,
      image: 'https://via.placeholder.com/400x200/FFEAA7/333333?text=实用工具',
      title: '兼职接单站点备忘录',
      description: '靠谱的兼职接单平台汇总',
      tags: ['兼职', '接单', '赚钱'],
      link: 'edu/job.html',
      category: '实用工具'
    },
    {
      id: 29,
      image: 'https://via.placeholder.com/400x200/DFE6E9/333333?text=实用工具',
      title: '120个常用货源网站备忘',
      description: '批发货源网站大全',
      tags: ['货源', '批发', '电商'],
      link: 'edu/b2b.html',
      category: '实用工具'
    }
  ]
};

console.log('闪喵小知识数据已加载');
