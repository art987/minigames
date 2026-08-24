// ============================================================
//  闪喵海报 - 画框分类配置（原创素材，版权所有）
// ------------------------------------------------------------
//  © 2026 闪喵团队（PeaceLove Studio） 版权所有
//
//  本文件所列画框图片（sticker/cover/*.png）均为原创设计，
//  已申请版权登记保护，并嵌入不可见数字水印。
//
//  未经授权擅自复制、爬取、盗用、传播本目录下任何图片，
//  将依据《著作权法》追究法律责任，
//  每张图片索赔标准为人民币 10,000 元。
// ============================================================

// 画框分类数据 - 独立管理，方便后期调整
//
// === 分类数据格式 ===
// 每个分类支持两种画框模式（二选一）：
//
// 1) 范围模式（连续编号）：
//    { name: '商务', start: 1, end: 10 }
//    将按顺序加载 sticker/cover/1.png ~ sticker/cover/10.png
//
// 2) 列表模式（不连续/随机编号）：
//    { name: '混合', items: [3, 7, 12, 25, 38] }
//    将按 items 数组顺序加载对应的 sticker/cover/{n}.png
//
// 两种模式都不填或留空，表示该分类暂无画框（显示"暂无画框"）：
//    { name: '女性' }
//
// === 颜色调节控件 ===
// 每个分类可单独设置 colorAdjustEnabled 控制是否启用颜色调节（色相/饱和度/对比度）
//   true  - 该分类下选中画框后显示颜色调节面板
//   false - 该分类下永久隐藏颜色调节面板
// 不填则默认为 true

window.FrameCategoriesData = [
  { name: '商务', start: 1, end: 10, colorAdjustEnabled: true },
  { name: '渐变', start: 11, end: 15, colorAdjustEnabled: true },
  { name: '女性', colorAdjustEnabled: false },
  { name: '现代', colorAdjustEnabled: false },
  { name: '国风', start: 16, end: 18, colorAdjustEnabled: false },
  { name: '电商', start: 19, end: 19, colorAdjustEnabled: false },
  { name: '卡通', start: 20, end: 43, colorAdjustEnabled: false }
];
