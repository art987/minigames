/**
 * ARTKNIT STUDIO 自定义 AKN 数据标准
 * 针织矩阵、色卡、转换参数、原始图片均以该结构保存于 IndexedDB。
 */

/** 单个纱线颜色 */
export interface AknColor {
  /** 色卡内索引 */
  index: number
  /** 十六进制颜色 #RRGGBB */
  hex: string
  /** 显示名称，如 "01 奶白" */
  name: string
  r: number
  g: number
  b: number
}

/** 色卡 */
export interface AknPalette {
  id: string
  name: string
  colors: AknColor[]
}

/** 转换参数 */
export interface AknConvertParams {
  /** 针数（宽度，像素列数） */
  stitches: number
  /** 行数（高度，像素行数） */
  rows: number
  /** 颜色数量上限 */
  colorCount: number
  /** 是否启用抖动 */
  dithering: boolean
  /** 颜色提取算法 */
  algorithm: 'kmeans' | 'mediancut'
  /** 锐化强度 0-100，完整转换时使用 */
  sharpen: number
}

/** AKN 工程数据 */
export interface AknProject {
  id: string
  name: string
  version: 1
  createdAt: number
  updatedAt: number
  params: AknConvertParams
  palette: AknPalette
  /** 针织矩阵，matrix[row][col] = 色卡颜色 index，-1 表示空 */
  matrix: number[][]
  /** 色卡模式：auto=从图片自动提取；custom=使用用户自定义色卡绘制 */
  paletteMode?: 'auto' | 'custom'
  /** 原始图片（本地 Blob，永不上传） */
  originalImage: Blob | null
  /** 原始图片预览缩略图 dataURL（可选，便于列表显示） */
  thumbnail: string | null
}

/** 索引页用元信息 */
export interface AknProjectMeta {
  id: string
  name: string
  updatedAt: number
  stitches: number
  rows: number
  colorCount: number
  thumbnail: string | null
}

/** Worker 转换请求 */
export interface ConvertRequest {
  /** 递增代号，用于取消/忽略旧任务 */
  token: number
  mode: 'quick' | 'full'
  params: AknConvertParams
  /** RGBA 像素数据 */
  imageData: { width: number; height: number; data: Uint8ClampedArray }
  /** 快速模式可选：使用现有色卡而非重新提取 */
  palette?: AknColor[]
}

/** Worker 转换响应 */
export interface ConvertResponse {
  token: number
  mode: 'quick' | 'full'
  matrix: number[][]
  palette: AknColor[]
}
