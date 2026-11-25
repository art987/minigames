/**
 * 图案摆放（多图层）：
 * 画布比例由针数×行数固定。支持多个图片图层，每层可独立移动/缩放/裁切/显隐，
 * 画布边界外被裁掉；底层为可设置的画布背景色。
 */
import type { SourceImage } from './convertClient'

export interface ComposeTransform {
  scale: number
  x: number
  y: number
}

/** 裁切区域：距图层原图四边的像素距离（左/上/右/下） */
export interface ComposeCrop {
  l: number
  t: number
  r: number
  b: number
}

export const CROP_MIN = 20

export const NO_CROP: ComposeCrop = { l: 0, t: 0, r: 0, b: 0 }

/** 一个图片图层 */
export interface ComposeLayer {
  id: string
  name: string
  bitmap: ImageBitmap
  width: number
  height: number
  t: ComposeTransform
  crop: ComposeCrop
  visible: boolean
  /** 旋转角度（度，90 的倍数），绕图层中心旋转 */
  rotation: number
}

export interface CanvasSetup {
  stitches: number
  rows: number
}

/** 摆放画布的内部渲染分辨率（针数的整数倍，保证后续重转换的清晰度） */
export function composeCanvasSize(setup: CanvasSetup): { CW: number; CH: number } {
  const CW = Math.min(Math.max(Math.round(setup.stitches * 4), 240), 1200)
  const CH = Math.max(1, Math.round((CW * setup.rows) / setup.stitches))
  return { CW, CH }
}

/** 铺满画布（cover）：短边贴合、超出裁掉，居中 */
export function fitCover(src: { width: number; height: number }, CW: number, CH: number): ComposeTransform {
  const scale = Math.max(CW / src.width, CH / src.height)
  return { scale, x: (CW - src.width * scale) / 2, y: (CH - src.height * scale) / 2 }
}

/** 初始摆放：画布内边距 20%，完整显示图片（contain×0.8），保证锚点可见可操作 */
export function fitPadded(src: { width: number; height: number }, CW: number, CH: number): ComposeTransform {
  const scale = Math.min(CW / src.width, CH / src.height) * 0.8
  return { scale, x: (CW - src.width * scale) / 2, y: (CH - src.height * scale) / 2 }
}

export function fitScale(src: { width: number; height: number }, CW: number, CH: number): number {
  return Math.max(CW / src.width, CH / src.height)
}

/** 图层旋转后的可见包围盒（供锚点/命中检测使用） */
export function layerBBox(layer: ComposeLayer): { vx: number; vy: number; vw: number; vh: number } {
  const sw = layer.width - layer.crop.l - layer.crop.r
  const sh = layer.height - layer.crop.t - layer.crop.b
  const dw = sw * layer.t.scale
  const dh = sh * layer.t.scale
  // 旋转绕目标矩形中心进行，包围盒中心与目标矩形中心重合
  const cx = layer.t.x + layer.crop.l * layer.t.scale + dw / 2
  const cy = layer.t.y + layer.crop.t * layer.t.scale + dh / 2
  const rot = ((layer.rotation % 360) + 360) % 360
  const [w, h] = rot === 90 || rot === 270 ? [dh, dw] : [dw, dh]
  return { vx: cx - w / 2, vy: cy - h / 2, vw: w, vh: h }
}

/** 绘制单个图层（含裁切与旋转），供预览与合成共用 */
export function drawLayer(
  ctx: CanvasRenderingContext2D,
  layer: ComposeLayer,
) {
  if (!layer.visible) return
  const sw = layer.width - layer.crop.l - layer.crop.r
  const sh = layer.height - layer.crop.t - layer.crop.b
  if (sw <= 0 || sh <= 0) return
  const dw = sw * layer.t.scale
  const dh = sh * layer.t.scale
  const cx = layer.t.x + layer.crop.l * layer.t.scale + dw / 2
  const cy = layer.t.y + layer.crop.t * layer.t.scale + dh / 2
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate((layer.rotation * Math.PI) / 180)
  ctx.drawImage(layer.bitmap, layer.crop.l, layer.crop.t, sw, sh, -dw / 2, -dh / 2, dw, dh)
  ctx.restore()
}

/** 按图层顺序合成画布像素数据（背景色填充空白区） */
export function composeLayersToImageData(
  layers: ComposeLayer[],
  bgColor: string,
  CW: number,
  CH: number,
): SourceImage {
  const canvas = document.createElement('canvas')
  canvas.width = CW
  canvas.height = CH
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, CW, CH)
  for (const layer of layers) drawLayer(ctx, layer)
  const d = ctx.getImageData(0, 0, CW, CH)
  return { width: CW, height: CH, data: d.data }
}
