const TextTemplates = {
  categories: {
   
    '情感': [
      '我本无意惹惊鸿，\n奈何惊鸿入我心',
      '相逢已是上上签，\n何须相思煮余年',
      '幸得识卿桃花面，\n从此阡陌多暖春',
      '倘若南风知我意，\n莫将晚霞落黄昏',
      '落日沉溺于橘色的海，\n晚风沦陷于赤诚的爱'
    ],
    '人生感悟': [
      '且行且忘且随风，\n且行且看且从容',
      '一半烟火以谋生，\n一半诗意以谋爱',
      '慢慢来，\n好戏都在烟火里',
      '市井长巷，\n聚拢来是烟火，\n摊开是人间',
      '认识自己，\n是寻找还没有认识的自己',
      '人道洛阳花似锦，\n偏我来时不逢春',
      '心似白云常自在，\n意如流水任东西',
      '生如逆旅多断肠，\n一苇坚韧以渡江',
      '有风有雨是常态，\n风雨兼程是状态，\n风雨无阻是心态',
      '要向人生索取，\n不向命运乞求',
      '向下生根，\n向上开花，\n不负生活，不负自己'
    ],
    '励志奋斗': [
      '无人扶我青云志，\n我自踏雪至山巅',
      '风雪压我两三年，\n我笑风轻雪如棉',
      '夜色难免黑凉，\n前行必有曙光'
    ],
    '时代理想': [
      '时代在变，\n我们的征途是星辰大海',
      '世间因少年挺身向前，\n而更加瑰丽',
      '愿以寸心寄华夏，\n且将岁月赠山河',
      '信念是鸟，\n它在黎明仍然黑暗之际，\n感觉到了光明，唱出了歌'
    ]
  },

  getAllCategories: function() {
    return Object.keys(this.categories);
  },

  getTemplatesByCategory: function(category) {
    return this.categories[category] || [];
  },

  getAllTemplates: function() {
    const all = [];
    Object.values(this.categories).forEach(templates => {
      all.push(...templates);
    });
    return all;
  }
};

window.TextTemplates = TextTemplates;
