/**
 * 智能衣片画布 · 可配置数据表
 *
 * 尺码体系、服装类型（款式）、宽松程度、衣片默认尺寸、预估密度全部独立配置，
 * 不写死在组件逻辑里；后续可增加其他国家尺码体系或新款式，只改本文件。
 * 所有数值均为初始预设（预估值），用户在向导中始终可以覆盖。
 */
import type { GarmentSpec } from '../types/akn'

export interface SizeDef {
  id: string
  label: string
}

/** 尺码体系（独立配置，便于扩展其他国家尺码） */
export const SIZE_SYSTEMS: Record<string, SizeDef[]> = {
  adult: [
    { id: 'XS', label: 'XS' },
    { id: 'S', label: 'S' },
    { id: 'M', label: 'M' },
    { id: 'L', label: 'L' },
    { id: 'XL', label: 'XL' },
    { id: 'XXL', label: 'XXL' },
  ],
  child: [
    { id: '90', label: '90' },
    { id: '100', label: '100' },
    { id: '110', label: '110' },
    { id: '120', label: '120' },
    { id: '130', label: '130' },
    { id: '140', label: '140' },
    { id: '150', label: '150' },
  ],
}

/** 宽松程度：乘数作用于身体类衣片宽度 */
export const FIT_LEVELS = [
  { id: 'fitted', label: '合身', k: 0.92 },
  { id: 'regular', label: '常规', k: 1 },
  { id: 'loose', label: '宽松', k: 1.1 },
] as const
export type FitId = (typeof FIT_LEVELS)[number]['id']

export interface GarmentTypeDef {
  id: string
  label: string
  /** 尺码体系 id，null=自定义（无尺码预设） */
  sizeSystem: string | null
  /** 是否提供宽松程度选项 */
  fit: boolean
  /** 预估密度（非生产校准数据）：st=针数/10cm，rw=行数/10cm */
  density: { st: number; rw: number }
}

/** 服装类型（款式） */
export const GARMENT_TYPES: GarmentTypeDef[] = [
  { id: 'adult-sweater', label: '成人毛衣', sizeSystem: 'adult', fit: true, density: { st: 22, rw: 30 } },
  { id: 'adult-top', label: '成人针织衫', sizeSystem: 'adult', fit: true, density: { st: 24, rw: 32 } },
  { id: 'child-sweater', label: '儿童毛衣', sizeSystem: 'child', fit: true, density: { st: 24, rw: 32 } },
  { id: 'child-top', label: '儿童针织衫', sizeSystem: 'child', fit: true, density: { st: 26, rw: 34 } },
  { id: 'custom', label: '自定义服装', sizeSystem: null, fit: false, density: { st: 24, rw: 32 } },
]

export interface PieceDef {
  id: string
  label: string
}

/** 衣片类型：每个衣片都是独立设计画布 */
export const PIECE_TYPES: PieceDef[] = [
  { id: 'front', label: '前片' },
  { id: 'back', label: '后片' },
  { id: 'sleeve-l', label: '左袖' },
  { id: 'sleeve-r', label: '右袖' },
  { id: 'chest-l', label: '左胸口' },
  { id: 'chest-r', label: '右胸口' },
  { id: 'cuff', label: '袖口' },
  { id: 'hem', label: '下摆' },
  { id: 'custom', label: '自定义区域' },
]

/* ---------- 每尺码基础尺寸（cm）· 预设参考值 ---------- */

interface SizeBaseTable {
  /** 衣片身宽（胸围处） */
  body: number
  /** 衣长 */
  len: number
  /** 袖片宽 */
  sleeveW: number
  /** 袖长 */
  sleeveL: number
  /** 袖口宽 */
  cuffW: number
  /** 袖口/下摆高度 */
  ribH: number
  /** 胸口装饰片边长 */
  patch: number
}

const ADULT_SIZE_TABLE: Record<string, SizeBaseTable> = {
  XS: { body: 44, len: 58, sleeveW: 18, sleeveL: 50, cuffW: 15, ribH: 6, patch: 12 },
  S: { body: 48, len: 60, sleeveW: 19, sleeveL: 52, cuffW: 16, ribH: 6, patch: 12 },
  M: { body: 52, len: 62, sleeveW: 20, sleeveL: 54, cuffW: 17, ribH: 7, patch: 13 },
  L: { body: 56, len: 64, sleeveW: 21, sleeveL: 55, cuffW: 18, ribH: 7, patch: 13 },
  XL: { body: 60, len: 66, sleeveW: 22, sleeveL: 56, cuffW: 19, ribH: 8, patch: 14 },
  XXL: { body: 64, len: 68, sleeveW: 23, sleeveL: 57, cuffW: 20, ribH: 8, patch: 14 },
}

const CHILD_SIZE_TABLE: Record<string, SizeBaseTable> = {
  '90': { body: 28, len: 34, sleeveW: 13, sleeveL: 24, cuffW: 11, ribH: 4, patch: 8 },
  '100': { body: 30, len: 37, sleeveW: 13.5, sleeveL: 27, cuffW: 11.5, ribH: 4, patch: 8 },
  '110': { body: 31, len: 40, sleeveW: 14, sleeveL: 30, cuffW: 12, ribH: 4, patch: 9 },
  '120': { body: 33, len: 43, sleeveW: 14.5, sleeveL: 33, cuffW: 12.5, ribH: 5, patch: 9 },
  '130': { body: 34, len: 46, sleeveW: 15, sleeveL: 36, cuffW: 13, ribH: 5, patch: 10 },
  '140': { body: 36, len: 49, sleeveW: 15.5, sleeveL: 39, cuffW: 13.5, ribH: 5, patch: 10 },
  '150': { body: 38, len: 52, sleeveW: 16, sleeveL: 42, cuffW: 14, ribH: 5, patch: 11 },
}

const SIZE_TABLES: Record<string, Record<string, SizeBaseTable>> = {
  adult: ADULT_SIZE_TABLE,
  child: CHILD_SIZE_TABLE,
}

const r05 = (x: number) => Math.round(x * 2) / 2

export function garmentTypeById(id: string): GarmentTypeDef {
  return GARMENT_TYPES.find((t) => t.id === id) ?? GARMENT_TYPES[GARMENT_TYPES.length - 1]
}

export function sizesFor(garmentTypeId: string): SizeDef[] {
  const t = garmentTypeById(garmentTypeId)
  return t.sizeSystem ? SIZE_SYSTEMS[t.sizeSystem] ?? [] : []
}

/** 款式预估密度（非生产校准数据） */
export function estimatedDensity(garmentTypeId: string): { st: number; rw: number } {
  return { ...garmentTypeById(garmentTypeId).density }
}

/**
 * 衣片默认尺寸（cm）。
 * 返回 null 表示无预设（自定义区域/自定义服装），保留用户当前输入。
 */
export function defaultPieceSize(
  garmentTypeId: string,
  sizeId: string | null,
  pieceId: string,
  fit: FitId,
): { widthCm: number; heightCm: number } | null {
  const t = garmentTypeById(garmentTypeId)
  if (!t.sizeSystem || !sizeId) return null
  const base = SIZE_TABLES[t.sizeSystem]?.[sizeId]
  if (!base) return null
  const fitK = FIT_LEVELS.find((f) => f.id === fit)?.k ?? 1
  switch (pieceId) {
    case 'front':
    case 'back':
      return { widthCm: r05(base.body * fitK), heightCm: base.len }
    case 'sleeve-l':
    case 'sleeve-r':
      return { widthCm: base.sleeveW, heightCm: base.sleeveL }
    case 'chest-l':
    case 'chest-r':
      return { widthCm: base.patch, heightCm: base.patch }
    case 'cuff':
      return { widthCm: base.cuffW, heightCm: base.ribH }
    case 'hem':
      return { widthCm: r05(base.body * fitK), heightCm: base.ribH }
    default:
      return null
  }
}

const clamp10 = (v: number, min = 10, max = 500) => Math.min(max, Math.max(min, v))

/** 由实际尺寸 + 密度计算针织像素画布（合理取整） */
export function computeCanvas(g: GarmentSpec): { stitches: number; rows: number } {
  return {
    stitches: clamp10(Math.round((g.widthCm * g.stitchesPer10cm) / 10)),
    rows: clamp10(Math.round((g.heightCm * g.rowsPer10cm) / 10)),
  }
}

/** 新建向导的默认衣片设定 */
export function defaultGarmentSpec(): GarmentSpec {
  const t = GARMENT_TYPES[0]
  const size = SIZE_SYSTEMS.adult[2] // M
  const dim = defaultPieceSize(t.id, size.id, 'front', 'regular')!
  const d = estimatedDensity(t.id)
  return {
    garmentType: t.id,
    sizeId: size.id,
    fit: 'regular',
    pieceId: 'front',
    widthCm: dim.widthCm,
    heightCm: dim.heightCm,
    stitchesPer10cm: d.st,
    rowsPer10cm: d.rw,
    estimated: true,
  }
}
