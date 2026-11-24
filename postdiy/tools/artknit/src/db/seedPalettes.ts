/**
 * 预置色卡方案：首次启动时写入 IndexedDB，用户可自行修改、删除或新增方案。
 */
import type { AknColor, AknPalette } from '../types/akn'

function colors(defs: [string, string][]): AknColor[] {
  return defs.map(([hex, name], i) => ({
    index: i,
    hex,
    name: `${String(i + 1).padStart(2, '0')} ${name}`,
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }))
}

export const SEED_PALETTES: AknPalette[] = [
  {
    id: 'scheme-earth',
    name: '自然大地',
    colors: colors([
      ['#F5F0E6', '米白'], ['#D9C7A7', '浅驼'], ['#B08968', '驼色'],
      ['#8A5A44', '赭石'], ['#5C3A21', '深棕'], ['#3E2723', '咖啡'],
    ]),
  },
  {
    id: 'scheme-morandi',
    name: '莫兰迪灰调',
    colors: colors([
      ['#F2E9E4', '雾白'], ['#D9DBBD', '豆绿'], ['#A3B18A', '橄榄'],
      ['#C9ADA7', '干玫瑰'], ['#9A8C98', '藕灰'], ['#4A4E69', '黛蓝'],
    ]),
  },
  {
    id: 'scheme-bw',
    name: '黑白经典',
    colors: colors([
      ['#FFFFFF', '白'], ['#D9D9D9', '浅灰'], ['#8C8C8C', '中灰'],
      ['#4D4D4D', '深灰'], ['#1A1A1A', '黑'],
    ]),
  },
  {
    id: 'scheme-candy',
    name: '童趣明亮',
    colors: colors([
      ['#FFFFFF', '白'], ['#FF6B6B', '西瓜红'], ['#FFD93D', '柠檬黄'],
      ['#6BCB77', '草绿'], ['#4D96FF', '天空蓝'], ['#B983FF', '葡萄紫'], ['#333333', '炭黑'],
    ]),
  },
  {
    id: 'scheme-ocean',
    name: '海洋蓝绿',
    colors: colors([
      ['#EAF7F1', '浪花白'], ['#A8DADC', '浅碧'], ['#2A9D8F', '湖水绿'],
      ['#457B9D', '海蓝'], ['#1D3557', '深海蓝'], ['#264653', '墨青'],
    ]),
  },
]
