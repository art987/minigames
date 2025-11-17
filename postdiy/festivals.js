// 中国传统节日
// 中国传统节日
window.chineseTraditionalFestivals = {
  '春节': {
    name: '春节',
    description: '辞旧迎新、团圆、春联、鞭炮、压岁钱、舞龙舞狮',
    month: 2, // 通常在2月
    day: 1, // 农历正月初一
    format: 'lunar'
  },
  '元宵节': {
    name: '元宵节',
    description: '赏花灯、吃汤圆/元宵、猜灯谜',
    month: 2,
    day: 15, // 农历正月十五
    format: 'lunar'
  },
  '龙抬头': {
    name: '龙抬头',
    description: '春耕开始、剃头、吃春饼（龙鳞）',
    month: 3,
    day: 2, // 农历二月初二
    format: 'lunar'
  },
  '清明节': {
    name: '清明节',
    description: '祭祖扫墓、踏青郊游、放风筝、吃青团',
    month: 4,
    day: 5, // 通常在4月4-6日
    format: 'solar'
  },
  '端午节': {
    name: '端午节',
    description: '赛龙舟、吃粽子、佩香囊、挂艾草',
    month: 5,
    day: 5, // 农历五月初五
    format: 'lunar'
  },
  '七夕节': {
    name: '七夕节',
    description: '中国情人节、牛郎织女、乞巧',
    month: 7,
    day: 7, // 农历七月初七
    format: 'lunar'
  },
  '中元节': {
    name: '中元节',
    description: '祭祖、放河灯、祀亡魂',
    month: 8,
    day: 15, // 农历七月十五
    format: 'lunar'
  },
  '中秋节': {
    name: '中秋节',
    description: '团圆、赏月、吃月饼',
    month: 9,
    day: 15, // 农历八月十五
    format: 'lunar'
  },
  '重阳节': {
    name: '重阳节',
    description: '登高、赏菊、敬老',
    month: 10,
    day: 9, // 农历九月初九
    format: 'lunar'
  },
  '腊八节': {
    name: '腊八节',
    description: '喝腊八粥',
    month: 1,
    day: 26, // 农历腊月初八
    format: 'lunar'
  },
  '小年': {
    name: '小年',
    description: '祭灶、扫尘',
    month: 2,
    day: 10, // 农历腊月廿三或廿四
    format: 'lunar'
  },
  '除夕': {
    name: '除夕',
    description: '团圆饭、守岁、贴春联、看春晚',
    month: 2,
    day: 16, // 农历腊月最后一天
    format: 'lunar'
  }
};

// 二十四节气
window.solarTerms = {
  '小寒': {
    name: '小寒',
    description: '寒冬、梅花、保暖',
    month: 1,
    day: 6, // 通常在1月5-7日
    format: 'solar'
  },
  '大寒': {
    name: '大寒',
    description: '最冷时节、年终忙碌、准备过年',
    month: 1,
    day: 20, // 通常在1月20-21日
    format: 'solar'
  },
  '立春': {
    name: '立春',
    description: '春天开始、万物复苏、迎春',
    month: 2,
    day: 4, // 通常在2月3-5日
    format: 'solar'
  },
  '雨水': {
    name: '雨水',
    description: '降雨开始、春雨贵如油、润物细无声',
    month: 2,
    day: 19, // 通常在2月18-20日
    format: 'solar'
  },
  '惊蛰': {
    name: '惊蛰',
    description: '春雷始鸣、蛰虫苏醒、生机勃勃',
    month: 3,
    day: 6, // 通常在3月5-7日
    format: 'solar'
  },
  '春分': {
    name: '春分',
    description: '昼夜平分、春暖花开、踏青',
    month: 3,
    day: 21, // 通常在3月20-22日
    format: 'solar'
  },
  '清明': {
    name: '清明',
    description: '祭祖扫墓、踏青郊游、放风筝、吃青团',
    month: 4,
    day: 5, // 通常在4月4-6日
    format: 'solar'
  },
  '谷雨': {
    name: '谷雨',
    description: '雨生百谷、谷物生长、春茶',
    month: 4,
    day: 20, // 通常在4月19-21日
    format: 'solar'
  },
  '立夏': {
    name: '立夏',
    description: '夏季开始、万物生长',
    month: 5,
    day: 6, // 通常在5月5-7日
    format: 'solar'
  },
  '小满': {
    name: '小满',
    description: '麦类等夏熟作物籽粒开始饱满',
    month: 5,
    day: 21, // 通常在5月20-22日
    format: 'solar'
  },
  '芒种': {
    name: '芒种',
    description: '忙种、麦收、耕种',
    month: 6,
    day: 6, // 通常在6月5-7日
    format: 'solar'
  },
  '夏至': {
    name: '夏至',
    description: '白昼最长、炎热将至、吃面',
    month: 6,
    day: 21, // 通常在6月21-22日
    format: 'solar'
  },
  '小暑': {
    name: '小暑',
    description: '天气开始炎热',
    month: 7,
    day: 7, // 通常在7月6-8日
    format: 'solar'
  },
  '大暑': {
    name: '大暑',
    description: '一年中最热的时候、消暑',
    month: 7,
    day: 23, // 通常在7月22-24日
    format: 'solar'
  },
  '立秋': {
    name: '立秋',
    description: '秋天开始、秋高气爽',
    month: 8,
    day: 8, // 通常在8月7-9日
    format: 'solar'
  },
  '处暑': {
    name: '处暑',
    description: '炎热的夏天结束',
    month: 8,
    day: 23, // 通常在8月22-24日
    format: 'solar'
  },
  '白露': {
    name: '白露',
    description: '天气转凉、露水出现',
    month: 9,
    day: 8, // 通常在9月7-9日
    format: 'solar'
  },
  '秋分': {
    name: '秋分',
    description: '昼夜平分、秋收',
    month: 9,
    day: 23, // 通常在9月22-24日
    format: 'solar'
  },
  '寒露': {
    name: '寒露',
    description: '露水已寒、气候从凉爽到寒冷过渡',
    month: 10,
    day: 8, // 通常在10月8-9日
    format: 'solar'
  },
  '霜降': {
    name: '霜降',
    description: '天气更冷、开始有霜',
    month: 10,
    day: 23, // 通常在10月23-24日
    format: 'solar'
  },
  '立冬': {
    name: '立冬',
    description: '冬季开始、万物收藏',
    month: 11,
    day: 7, // 通常在11月7-8日
    format: 'solar'
  },
  '小雪': {
    name: '小雪',
    description: '开始下雪、雪量小',
    month: 11,
    day: 22, // 通常在11月22-23日
    format: 'solar'
  },
  '大雪': {
    name: '大雪',
    description: '雪量增大、地面可能积雪',
    month: 12,
    day: 7, // 通常在12月6-8日
    format: 'solar'
  },
  '冬至': {
    name: '冬至',
    description: '白昼最短、数九开始、吃饺子/汤圆',
    month: 12,
    day: 22, // 通常在12月21-23日
    format: 'solar'
  }
};

// 西方节日
window.westernFestivals = {
  '元旦': {
    name: '元旦',
    description: '新年伊始、祈福、烟花',
    month: 1,
    day: 1,
    format: 'solar'
  },
  '情人节': {
    name: '情人节',
    description: '爱情、玫瑰、巧克力、浪漫',
    month: 2,
    day: 14,
    format: 'solar'
  },
  '愚人节': {
    name: '愚人节',
    description: '幽默、玩笑、恶作剧',
    month: 4,
    day: 1,
    format: 'solar'
  },
  '母亲节': {
    name: '母亲节',
    description: '感恩母爱、康乃馨',
    month: 5,
    day: 2, // 第二个星期日
    format: 'solar-week'
  },
  '父亲节': {
    name: '父亲节',
    description: '感恩父爱',
    month: 6,
    day: 3, // 第三个星期日
    format: 'solar-week'
  },
  '教师节': {
    name: '教师节',
    description: '尊师重教',
    month: 9,
    day: 10,
    format: 'solar'
  },
  '国庆节': {
    name: '国庆节',
    description: '爱国、欢庆、假期',
    month: 10,
    day: 1,
    format: 'solar'
  },
  '万圣节': {
    name: '万圣节',
    description: '南瓜灯、化妆舞会、捣蛋',
    month: 10,
    day: 31,
    format: 'solar'
  },
  '感恩节': {
    name: '感恩节',
    description: '感恩、火鸡大餐',
    month: 11,
    day: 27, // 第四个星期四
    format: 'solar-week'
  },
  '圣诞节': {
    name: '圣诞节',
    description: '圣诞树、圣诞老人、平安夜',
    month: 12,
    day: 25,
    format: 'solar'
  }
};

// 将所有节日导出到window对象
if (typeof window !== 'undefined') {
  window.chineseTraditionalFestivals = chineseTraditionalFestivals;
  window.solarTerms = solarTerms;
  window.westernFestivals = westernFestivals;
}