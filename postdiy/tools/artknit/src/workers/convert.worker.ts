/**
 * 图像转换 Worker
 * 快速预览（quick）：盒式降采样 + 现有色卡最近邻匹配，不抖动，保证交互流畅。
 * 完整转换（full）：高质量降采样 + 可选锐化 + k-means / 中位切分提取色卡 + 可选 Floyd-Steinberg 抖动。
 */
import type { AknColor, ConvertRequest, ConvertResponse } from '../types/akn'

type RGB = [number, number, number]

function srgbToLinear(c: number): number {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

/** 感知加权色距（lab 近似，用线性 RGB 加权欧氏距离） */
function colorDist(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  const dr = srgbToLinear(r1) - srgbToLinear(r2)
  const dg = srgbToLinear(g1) - srgbToLinear(g2)
  const db = srgbToLinear(b1) - srgbToLinear(b2)
  return 0.5 * dr * dr + 1.0 * dg * dg + 0.3 * db * db
}

/** 高质量盒式降采样（面积平均，支持 alpha） */
function downsample(
  src: { width: number; height: number; data: Uint8ClampedArray },
  w: number,
  h: number,
): Float64Array {
  const { width: sw, height: sh, data } = src
  const out = new Float64Array(w * h * 3)
  const xRatio = sw / w
  const yRatio = sh / h
  for (let y = 0; y < h; y++) {
    const sy0 = Math.floor(y * yRatio)
    const sy1 = Math.max(sy0 + 1, Math.floor((y + 1) * yRatio))
    for (let x = 0; x < w; x++) {
      const sx0 = Math.floor(x * xRatio)
      const sx1 = Math.max(sx0 + 1, Math.floor((x + 1) * xRatio))
      let r = 0, g = 0, b = 0, count = 0
      for (let sy = sy0; sy < sy1 && sy < sh; sy++) {
        for (let sx = sx0; sx < sx1 && sx < sw; sx++) {
          const i = (sy * sw + sx) * 4
          const a = data[i + 3] / 255
          // 白底合成透明像素
          r += data[i] * a + 255 * (1 - a)
          g += data[i + 1] * a + 255 * (1 - a)
          b += data[i + 2] * a + 255 * (1 - a)
          count++
        }
      }
      const o = (y * w + x) * 3
      out[o] = r / count
      out[o + 1] = g / count
      out[o + 2] = b / count
    }
  }
  return out
}

/** 简单 3x3 锐化卷积 */
function sharpen(pix: Float64Array, w: number, h: number, amount: number): Float64Array {
  if (amount <= 0) return pix
  const k = amount / 100
  const out = new Float64Array(pix.length)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      for (let c = 0; c < 3; c++) {
        const i = (y * w + x) * 3 + c
        let sum = 0
        let n = 0
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx
            const ny = y + dy
            if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue
            sum += pix[(ny * w + nx) * 3 + c]
            n++
          }
        }
        const blur = sum / n
        out[i] = Math.max(0, Math.min(255, pix[i] + (pix[i] - blur) * k))
      }
    }
  }
  return out
}

/** 中位切分颜色提取 */
function medianCut(pix: Float64Array, count: number): RGB[] {
  type Box = { pixels: number[] }
  const indices: number[] = []
  const total = pix.length / 3
  for (let i = 0; i < total; i++) indices.push(i)
  let boxes: Box[] = [{ pixels: indices }]

  while (boxes.length < count) {
    // 找像素最多的盒子切分
    boxes.sort((a, b) => b.pixels.length - a.pixels.length)
    const box = boxes[0]
    if (!box || box.pixels.length < 2) break
    // 找最宽通道
    let min = [255, 255, 255], max = [0, 0, 0]
    for (const i of box.pixels) {
      for (let c = 0; c < 3; c++) {
        const v = pix[i * 3 + c]
        if (v < min[c]) min[c] = v
        if (v > max[c]) max[c] = v
      }
    }
    let ch = 0
    if (max[1] - min[1] > max[ch] - min[ch]) ch = 1
    if (max[2] - min[2] > max[ch] - min[ch]) ch = 2
    box.pixels.sort((a, b) => pix[a * 3 + ch] - pix[b * 3 + ch])
    const mid = box.pixels.length >> 1
    boxes = [...boxes.slice(1), { pixels: box.pixels.slice(0, mid) }, { pixels: box.pixels.slice(mid) }]
  }

  return boxes.map((box) => {
    let r = 0, g = 0, b = 0
    for (const i of box.pixels) {
      r += pix[i * 3]; g += pix[i * 3 + 1]; b += pix[i * 3 + 2]
    }
    const n = box.pixels.length || 1
    return [Math.round(r / n), Math.round(g / n), Math.round(b / n)] as RGB
  })
}

/** k-means 颜色提取（k-means++ 初始化） */
function kmeans(pix: Float64Array, k: number, iterations = 12): RGB[] {
  const total = pix.length / 3
  if (total === 0) return [[0, 0, 0]]
  k = Math.min(k, total)
  // k-means++ 初始化
  const centers: RGB[] = []
  centers.push([pix[0], pix[1], pix[2]])
  while (centers.length < k) {
    let bestIdx = 0
    let bestDist = -1
    // 随机采样加速
    const step = Math.max(1, Math.floor(total / 512))
    for (let i = 0; i < total; i += step) {
      let nearest = Infinity
      for (const c of centers) {
        const d = colorDist(pix[i * 3], pix[i * 3 + 1], pix[i * 3 + 2], c[0], c[1], c[2])
        if (d < nearest) nearest = d
      }
      if (nearest > bestDist) { bestDist = nearest; bestIdx = i }
    }
    centers.push([pix[bestIdx * 3], pix[bestIdx * 3 + 1], pix[bestIdx * 3 + 2]])
  }
  const sums = new Float64Array(k * 3)
  const counts = new Int32Array(k)
  for (let it = 0; it < iterations; it++) {
    sums.fill(0); counts.fill(0)
    for (let i = 0; i < total; i++) {
      const r = pix[i * 3], g = pix[i * 3 + 1], b = pix[i * 3 + 2]
      let best = 0, bestD = Infinity
      for (let c = 0; c < k; c++) {
        const d = colorDist(r, g, b, centers[c][0], centers[c][1], centers[c][2])
        if (d < bestD) { bestD = d; best = c }
      }
      sums[best * 3] += r; sums[best * 3 + 1] += g; sums[best * 3 + 2] += b
      counts[best]++
    }
    for (let c = 0; c < k; c++) {
      if (counts[c] > 0) {
        centers[c] = [sums[c * 3] / counts[c], sums[c * 3 + 1] / counts[c], sums[c * 3 + 2] / counts[c]]
      }
    }
  }
  // 去重
  const uniq: RGB[] = []
  for (const c of centers) {
    const rgb: RGB = [Math.round(c[0]), Math.round(c[1]), Math.round(c[2])]
    if (!uniq.some((u) => u[0] === rgb[0] && u[1] === rgb[1] && u[2] === rgb[2])) uniq.push(rgb)
  }
  return uniq
}

/** 最近邻调色板匹配 */
function nearestColor(palette: RGB[], r: number, g: number, b: number): number {
  let best = 0, bestD = Infinity
  for (let i = 0; i < palette.length; i++) {
    const d = colorDist(r, g, b, palette[i][0], palette[i][1], palette[i][2])
    if (d < bestD) { bestD = d; best = i }
  }
  return best
}

function toAknColors(rgbs: RGB[]): AknColor[] {
  return rgbs.map((c, i) => ({
    index: i,
    hex: '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase(),
    name: `${String(i + 1).padStart(2, '0')} 色`,
    r: c[0], g: c[1], b: c[2],
  }))
}

function convert(req: ConvertRequest): ConvertResponse {
  const { params, imageData, palette } = req
  const w = params.stitches
  const h = params.rows
  const full = req.mode === 'full'
  const pix = downsample(imageData, w, h)

  let rgbs: RGB[]
  if (palette && palette.length > 0) {
    // 自定义色卡：用用户提供的色卡绘制，不再自动提取
    rgbs = palette.map((c) => [c.r, c.g, c.b] as RGB)
  } else {
    let src = pix
    if (full && params.sharpen > 0) src = sharpen(pix, w, h, params.sharpen)
    rgbs = params.algorithm === 'mediancut'
      ? medianCut(src, params.colorCount)
      : kmeans(src, params.colorCount)
  }

  const matrix: number[][] = []
  if (full && params.dithering) {
    // Floyd-Steinberg 抖动（浮点误差扩散）
    const buf = Float64Array.from(pix)
    for (let y = 0; y < h; y++) {
      const row: number[] = new Array(w)
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 3
        const r = Math.max(0, Math.min(255, buf[i]))
        const g = Math.max(0, Math.min(255, buf[i + 1]))
        const b = Math.max(0, Math.min(255, buf[i + 2]))
        const idx = nearestColor(rgbs, r, g, b)
        row[x] = idx
        const [pr, pg, pb] = rgbs[idx]
        const er = r - pr, eg = g - pg, eb = b - pb
        const push = (dx: number, dy: number, f: number) => {
          const nx = x + dx, ny = y + dy
          if (nx < 0 || nx >= w || ny < 0 || ny >= h) return
          const j = (ny * w + nx) * 3
          buf[j] += er * f; buf[j + 1] += eg * f; buf[j + 2] += eb * f
        }
        push(1, 0, 7 / 16); push(-1, 1, 3 / 16); push(0, 1, 5 / 16); push(1, 1, 1 / 16)
      }
      matrix.push(row)
    }
  } else {
    for (let y = 0; y < h; y++) {
      const row: number[] = new Array(w)
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 3
        row[x] = nearestColor(rgbs, pix[i], pix[i + 1], pix[i + 2])
      }
      matrix.push(row)
    }
  }

  return { token: req.token, mode: req.mode, matrix, palette: toAknColors(rgbs) }
}

self.onmessage = (e: MessageEvent<ConvertRequest>) => {
  try {
    self.postMessage(convert(e.data))
  } catch (err) {
    self.postMessage({ token: e.data.token, mode: e.data.mode, matrix: [], palette: [], error: String(err) })
  }
}
