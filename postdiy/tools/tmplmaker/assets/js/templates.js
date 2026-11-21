/**
 * 价签工坊 - 模板元数据
 * 所有行业已启用；每个行业 8 个模板，编号 1-8（阿拉伯数字）
 * 命名规则：{行业前缀}{阿拉伯编号} 如 V01、F03、C08
 * 占位背景图路径：assets/templates/{行业id}/{阿拉伯编号}.jpg
 * 真实素材替换时直接用同名文件覆盖即可
 */
window.TMPL_INDUSTRIES = [
  { id: 'vegetable', label: '蔬菜',     emoji: '🥬', desc: '当季鲜蔬 · 每日供应', enabled: true },
  { id: 'fruit',     label: '水果',     emoji: '🍎', desc: '新鲜果切 · 每日到货', enabled: true },
  { id: 'bakery',    label: '面包烘焙', emoji: '🍞', desc: '现烤烘焙 · 每日出炉', enabled: true },
  { id: 'tea',       label: '奶茶果茶', emoji: '🧋', desc: '现制鲜饮 · 每日鲜泡', enabled: true },
  { id: 'coffee',    label: '咖啡饮品', emoji: '☕', desc: '手冲意式 · 现磨现做', enabled: true },
  { id: 'meat',      label: '肉类水产', emoji: '🥩', desc: '鲜切现卖 · 冷链直达', enabled: true },
  { id: 'flower',    label: '花店绿植', emoji: '💐', desc: '鲜花绿植 · 每日精选', enabled: true }
];

// —— 所有模板 ——
// 命名：V/F/B/T/C/M/Fl + 01..08（阿拉伯数字）
// 已存在真实素材的 (V09-V16, B01-B16, T01-T07) 保留；其余 1-8 号为占位
window.TMPL_TEMPLATES = [
  // 蔬菜 V01-V08 占位 + V09-V16 已有
  { id: 'V01', title: '黑板手绘',   industry: 'vegetable', bg: 'assets/templates/vegetable/1.jpg' },
  { id: 'V02', title: '田园素描',   industry: 'vegetable', bg: 'assets/templates/vegetable/2.jpg' },
  { id: 'V03', title: '牛皮纸复古', industry: 'vegetable', bg: 'assets/templates/vegetable/3.jpg' },
  { id: 'V04', title: '市集红黄',   industry: 'vegetable', bg: 'assets/templates/vegetable/4.jpg' },
  { id: 'V05', title: '萌趣农场',   industry: 'vegetable', bg: 'assets/templates/vegetable/5.jpg' },
  { id: 'V06', title: '复古金框',   industry: 'vegetable', bg: 'assets/templates/vegetable/6.jpg' },
  { id: 'V07', title: '水彩果园',   industry: 'vegetable', bg: 'assets/templates/vegetable/7.jpg' },
  { id: 'V08', title: '清新几何',   industry: 'vegetable', bg: 'assets/templates/vegetable/8.jpg' },
  { id: 'V09', title: '黑板手绘',   industry: 'vegetable', bg: 'assets/templates/vegetable/V09.jpg' },
  { id: 'V10', title: '田园素描',   industry: 'vegetable', bg: 'assets/templates/vegetable/V10.jpg' },
  { id: 'V11', title: '牛皮纸复古', industry: 'vegetable', bg: 'assets/templates/vegetable/V11.jpg' },
  { id: 'V12', title: '市集红黄',   industry: 'vegetable', bg: 'assets/templates/vegetable/V12.jpg' },
  { id: 'V13', title: '萌趣农场',   industry: 'vegetable', bg: 'assets/templates/vegetable/V13.jpg' },
  { id: 'V14', title: '复古金框',   industry: 'vegetable', bg: 'assets/templates/vegetable/V14.jpg' },
  { id: 'V15', title: '水彩果园',   industry: 'vegetable', bg: 'assets/templates/vegetable/V15.jpg' },
  { id: 'V16', title: '清新几何',   industry: 'vegetable', bg: 'assets/templates/vegetable/V16.jpg' },

  // 水果 F01-F08 占位
  { id: 'F01', title: '鲜果红妆', industry: 'fruit', bg: 'assets/templates/fruit/1.jpg' },
  { id: 'F02', title: '清凉果切', industry: 'fruit', bg: 'assets/templates/fruit/2.jpg' },
  { id: 'F03', title: '橙香满溢', industry: 'fruit', bg: 'assets/templates/fruit/3.jpg' },
  { id: 'F04', title: '蜜果香园', industry: 'fruit', bg: 'assets/templates/fruit/4.jpg' },
  { id: 'F05', title: '热带果林', industry: 'fruit', bg: 'assets/templates/fruit/5.jpg' },
  { id: 'F06', title: '蜜杏香桃', industry: 'fruit', bg: 'assets/templates/fruit/6.jpg' },
  { id: 'F07', title: '莓果红妆', industry: 'fruit', bg: 'assets/templates/fruit/7.jpg' },
  { id: 'F08', title: '鲜果白卡', industry: 'fruit', bg: 'assets/templates/fruit/8.jpg' },

  // 面包烘焙 B01-B16 已有
  { id: 'B01', title: '欧式花框', industry: 'bakery', bg: 'assets/templates/bakery/B01.jpg' },
  { id: 'B02', title: '麦香烘焙', industry: 'bakery', bg: 'assets/templates/bakery/B02.jpg' },
  { id: 'B03', title: '牛皮纸焙坊', industry: 'bakery', bg: 'assets/templates/bakery/B03.jpg' },
  { id: 'B04', title: '萌趣面包', industry: 'bakery', bg: 'assets/templates/bakery/B04.jpg' },
  { id: 'B05', title: '粉甜时光', industry: 'bakery', bg: 'assets/templates/bakery/B05.jpg' },
  { id: 'B06', title: '黑金焙艺', industry: 'bakery', bg: 'assets/templates/bakery/B06.jpg' },
  { id: 'B07', title: '焙香案板', industry: 'bakery', bg: 'assets/templates/bakery/B07.jpg' },
  { id: 'B08', title: '暖阳烘焙', industry: 'bakery', bg: 'assets/templates/bakery/B08.jpg' },
  { id: 'B09', title: '米金花框', industry: 'bakery', bg: 'assets/templates/bakery/B09.jpg' },
  { id: 'B10', title: '麦香手作', industry: 'bakery', bg: 'assets/templates/bakery/B10.jpg' },
  { id: 'B11', title: '格纹萌趣', industry: 'bakery', bg: 'assets/templates/bakery/B11.jpg' },
  { id: 'B12', title: '黑金典雅', industry: 'bakery', bg: 'assets/templates/bakery/B12.jpg' },
  { id: 'B13', title: '田园风车', industry: 'bakery', bg: 'assets/templates/bakery/B13.jpg' },
  { id: 'B14', title: '绿意水彩', industry: 'bakery', bg: 'assets/templates/bakery/B14.jpg' },
  { id: 'B15', title: '橙黄小铺', industry: 'bakery', bg: 'assets/templates/bakery/B15.jpg' },
  { id: 'B16', title: '牛皮麦袋', industry: 'bakery', bg: 'assets/templates/bakery/B16.jpg' },

  // 奶茶果茶 T01-T07 已有 + T08 占位
  { id: 'T01', title: '温暖奶茶',   industry: 'tea', bg: 'assets/templates/tea/T01.jpg' },
  { id: 'T02', title: '真果鲜茶',   industry: 'tea', bg: 'assets/templates/tea/T02.jpg' },
  { id: 'T03', title: '醇香咖啡',   industry: 'tea', bg: 'assets/templates/tea/T03.jpg' },
  { id: 'T04', title: '果香柠檬',   industry: 'tea', bg: 'assets/templates/tea/T04.jpg' },
  { id: 'T05', title: '复古饮品屋', industry: 'tea', bg: 'assets/templates/tea/T05.jpg' },
  { id: 'T06', title: '萌趣奶茶',   industry: 'tea', bg: 'assets/templates/tea/T06.jpg' },
  { id: 'T07', title: '潮流果饮',   industry: 'tea', bg: 'assets/templates/tea/T07.jpg' },
  { id: 'T08', title: '芝士奶盖',   industry: 'tea', bg: 'assets/templates/tea/8.jpg' },

  // 咖啡饮品 C01-C08 占位
  { id: 'C01', title: '意式浓醇', industry: 'coffee', bg: 'assets/templates/coffee/1.jpg' },
  { id: 'C02', title: '手冲慢享', industry: 'coffee', bg: 'assets/templates/coffee/2.jpg' },
  { id: 'C03', title: '拿铁奶泡', industry: 'coffee', bg: 'assets/templates/coffee/3.jpg' },
  { id: 'C04', title: '美式黑咖', industry: 'coffee', bg: 'assets/templates/coffee/4.jpg' },
  { id: 'C05', title: '摩卡浓香', industry: 'coffee', bg: 'assets/templates/coffee/5.jpg' },
  { id: 'C06', title: '焦糖玛奇', industry: 'coffee', bg: 'assets/templates/coffee/6.jpg' },
  { id: 'C07', title: '冷萃冰咖', industry: 'coffee', bg: 'assets/templates/coffee/7.jpg' },
  { id: 'C08', title: '咖啡手账', industry: 'coffee', bg: 'assets/templates/coffee/8.jpg' },

  // 肉类水产 M01-M08 占位
  { id: 'M01', title: '鲜切牛肉', industry: 'meat', bg: 'assets/templates/meat/1.jpg' },
  { id: 'M02', title: '梅花五花', industry: 'meat', bg: 'assets/templates/meat/2.jpg' },
  { id: 'M03', title: '水晶里脊', industry: 'meat', bg: 'assets/templates/meat/3.jpg' },
  { id: 'M04', title: '黑椒牛排', industry: 'meat', bg: 'assets/templates/meat/4.jpg' },
  { id: 'M05', title: '泰式酸辣', industry: 'meat', bg: 'assets/templates/meat/5.jpg' },
  { id: 'M06', title: '红烧排骨', industry: 'meat', bg: 'assets/templates/meat/6.jpg' },
  { id: 'M07', title: '孜然羊肉', industry: 'meat', bg: 'assets/templates/meat/7.jpg' },
  { id: 'M08', title: '秘制卤味', industry: 'meat', bg: 'assets/templates/meat/8.jpg' },

  // 花店绿植 Fl01-Fl08 占位
  { id: 'Fl01', title: '鲜花花束', industry: 'flower', bg: 'assets/templates/flower/1.jpg' },
  { id: 'Fl02', title: '清新绿植', industry: 'flower', bg: 'assets/templates/flower/2.jpg' },
  { id: 'Fl03', title: '欧式花艺', industry: 'flower', bg: 'assets/templates/flower/3.jpg' },
  { id: 'Fl04', title: '韩式花束', industry: 'flower', bg: 'assets/templates/flower/4.jpg' },
  { id: 'Fl05', title: '满天星',   industry: 'flower', bg: 'assets/templates/flower/5.jpg' },
  { id: 'Fl06', title: '永生花盒', industry: 'flower', bg: 'assets/templates/flower/6.jpg' },
  { id: 'Fl07', title: '多肉小铺', industry: 'flower', bg: 'assets/templates/flower/7.jpg' },
  { id: 'Fl08', title: '春日花园', industry: 'flower', bg: 'assets/templates/flower/8.jpg' }
];

window.TMPL_SLOGANS = [
  '新鲜直达 · 自然好味',
  '每日新鲜 · 健康生活',
  '新鲜采摘 · 品质优选',
  '绿色天然 · 营养丰富',
  '当季鲜蔬 · 每日供应',
  '自然好味 · 新鲜看得见',
  '手工制作 · 每日现做',
  '匠心出品 · 品质保证'
];

window.TMPL_UNITS = ['元/斤', '元/公斤', '元/个', '元/份', '元/盒', '元/袋', '元/把', '元/只'];
