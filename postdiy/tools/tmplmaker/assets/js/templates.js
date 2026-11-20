/**
 * 价签工坊 - 模板元数据
 * 只保留「选模板」所需的静态信息；
 * 名称/价格/宣传语的样式与定位全部在 assets/css/templates/Vxx.css 中按模板独立控制。
 * 价签 DOM 结构约定（render.js 生成，模板 CSS 针对它写样式）：
 *   <div class="ptag" data-tpl="V01" style="background-image:...">
 *     <div class="ptag-name">商品名称</div>
 *     <div class="ptag-price"><span class="ptag-num">3.5</span><span class="ptag-unit">元/斤</span></div>
 *     <div class="ptag-slogan"><span class="ptag-slogan-text">新鲜直达 · 自然好味</span></div>
 *   </div>
 * 尺寸变量：--mm = 1mm 对应的 px（由 JS 按元素实际宽度实时写入），
 * CSS 中用 calc(var(--mm) * N) 表示 N mm。
 */
window.TMPL_INDUSTRIES = [
  { id: 'vegetable', label: '蔬菜', emoji: '🥬', desc: '当季鲜蔬 · 每日供应', enabled: true },
  { id: 'fruit',     label: '水果', emoji: '🍎', desc: '敬请期待', enabled: false },
  { id: 'bakery',    label: '面包烘焙', emoji: '🍞', desc: '现烤烘焙 · 每日出炉', enabled: true },
  { id: 'tea',       label: '奶茶果茶', emoji: '🧋', desc: '现制鲜饮 · 每日鲜泡', enabled: true },
  { id: 'coffee',    label: '咖啡饮品', emoji: '☕', desc: '敬请期待', enabled: false },
  { id: 'meat',      label: '肉类水产', emoji: '🥩', desc: '敬请期待', enabled: false },
  { id: 'flower',    label: '花店绿植', emoji: '💐', desc: '敬请期待', enabled: false }
];

window.TMPL_TEMPLATES = [
  { id: 'V09', title: '黑板手绘',   industry: 'vegetable', bg: 'assets/templates/vegetable/V09.jpg' },
  { id: 'V10', title: '田园素描',   industry: 'vegetable', bg: 'assets/templates/vegetable/V10.jpg' },
  { id: 'V11', title: '牛皮纸复古', industry: 'vegetable', bg: 'assets/templates/vegetable/V11.jpg' },
  { id: 'V12', title: '市集红黄',   industry: 'vegetable', bg: 'assets/templates/vegetable/V12.jpg' },
  { id: 'V13', title: '萌趣农场',   industry: 'vegetable', bg: 'assets/templates/vegetable/V13.jpg' },
  { id: 'V14', title: '复古金框',   industry: 'vegetable', bg: 'assets/templates/vegetable/V14.jpg' },
  { id: 'V15', title: '水彩果园',   industry: 'vegetable', bg: 'assets/templates/vegetable/V15.jpg' },
  { id: 'V16', title: '清新几何',   industry: 'vegetable', bg: 'assets/templates/vegetable/V16.jpg' },
  { id: 'B01', title: '欧式花框',   industry: 'bakery', bg: 'assets/templates/bakery/B01.jpg' },
  { id: 'B02', title: '麦香烘焙',   industry: 'bakery', bg: 'assets/templates/bakery/B02.jpg' },
  { id: 'B03', title: '牛皮纸焙坊', industry: 'bakery', bg: 'assets/templates/bakery/B03.jpg' },
  { id: 'B04', title: '萌趣面包',   industry: 'bakery', bg: 'assets/templates/bakery/B04.jpg' },
  { id: 'B05', title: '粉甜时光',   industry: 'bakery', bg: 'assets/templates/bakery/B05.jpg' },
  { id: 'B06', title: '黑金焙艺',   industry: 'bakery', bg: 'assets/templates/bakery/B06.jpg' },
  { id: 'B07', title: '焙香案板',   industry: 'bakery', bg: 'assets/templates/bakery/B07.jpg' },
  { id: 'B08', title: '暖阳烘焙',   industry: 'bakery', bg: 'assets/templates/bakery/B08.jpg' },
  { id: 'T01', title: '温暖奶茶',   industry: 'tea', bg: 'assets/templates/tea/T01.jpg' },
  { id: 'T02', title: '真果鲜茶',   industry: 'tea', bg: 'assets/templates/tea/T02.jpg' },
  { id: 'T03', title: '醇香咖啡',   industry: 'tea', bg: 'assets/templates/tea/T03.jpg' },
  { id: 'T04', title: '果香柠檬',   industry: 'tea', bg: 'assets/templates/tea/T04.jpg' },
  { id: 'T05', title: '复古饮品屋', industry: 'tea', bg: 'assets/templates/tea/T05.jpg' },
  { id: 'T06', title: '萌趣奶茶',   industry: 'tea', bg: 'assets/templates/tea/T06.jpg' },
  { id: 'T07', title: '潮流果饮',   industry: 'tea', bg: 'assets/templates/tea/T07.jpg' }
];

// 蔬菜行业预设宣传语
window.TMPL_SLOGANS = [
  '新鲜直达 · 自然好味',
  '每日新鲜 · 健康生活',
  '新鲜采摘 · 品质优选',
  '绿色天然 · 营养丰富',
  '当季鲜蔬 · 每日供应',
  '自然好味 · 新鲜看得见'
];

// 计价单位预设
window.TMPL_UNITS = ['元/斤', '元/公斤', '元/个', '元/份', '元/盒', '元/袋', '元/把', '元/只'];
