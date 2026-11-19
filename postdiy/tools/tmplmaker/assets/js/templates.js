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
  { id: 'bakery',    label: '面包烘焙', emoji: '🍞', desc: '敬请期待', enabled: false },
  { id: 'tea',       label: '奶茶果茶', emoji: '🧋', desc: '敬请期待', enabled: false },
  { id: 'coffee',    label: '咖啡饮品', emoji: '☕', desc: '敬请期待', enabled: false },
  { id: 'meat',      label: '肉类水产', emoji: '🥩', desc: '敬请期待', enabled: false },
  { id: 'flower',    label: '花店绿植', emoji: '💐', desc: '敬请期待', enabled: false }
];

window.TMPL_TEMPLATES = [
  { id: 'V01', title: '欢乐农场',   industry: 'vegetable', bg: 'assets/templates/vegetable/V01.jpg' },
  { id: 'V02', title: '兔兔菜园',   industry: 'vegetable', bg: 'assets/templates/vegetable/V02.jpg' },
  { id: 'V03', title: '丰收小农夫', industry: 'vegetable', bg: 'assets/templates/vegetable/V03.jpg' },
  { id: 'V04', title: '蔬菜家族',   industry: 'vegetable', bg: 'assets/templates/vegetable/V04.jpg' },
  { id: 'V05', title: '田园采摘',   industry: 'vegetable', bg: 'assets/templates/vegetable/V05.jpg' },
  { id: 'V06', title: '萌兔菜摊',   industry: 'vegetable', bg: 'assets/templates/vegetable/V06.jpg' },
  { id: 'V07', title: '蔬菜派对',   industry: 'vegetable', bg: 'assets/templates/vegetable/V07.jpg' },
  { id: 'V08', title: '阳光农场',   industry: 'vegetable', bg: 'assets/templates/vegetable/V08.jpg' }
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
