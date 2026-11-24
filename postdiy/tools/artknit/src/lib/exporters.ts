/**
 * 导出工具：AKN JSON / PNG 图案 / 带行列号图纸
 * 全部在浏览器本地生成并下载，无服务器参与。
 */
import type { AknColor, AknConvertParams } from '../types/akn'

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 5000)
}

function sanitize(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, '_') || 'artknit'
}

/** 导出 AKN 标准 JSON（矩阵 + 色卡 + 参数） */
export function exportAkn(
  name: string,
  params: AknConvertParams,
  colors: AknColor[],
  matrix: number[][],
) {
  const data = {
    format: 'AKN',
    version: 1,
    exportedAt: new Date().toISOString(),
    name,
    params,
    palette: colors,
    matrix,
  }
  downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), `${sanitize(name)}.akn.json`)
}

/** 一格一像素的成品图案 PNG */
export function exportPatternPng(colors: AknColor[], matrix: number[][], name: string) {
  const rows = matrix.length
  const cols = matrix[0]?.length ?? 0
  if (!rows || !cols) return
  const canvas = document.createElement('canvas')
  canvas.width = cols
  canvas.height = rows
  const ctx = canvas.getContext('2d')!
  const colorMap = new Map(colors.map((c) => [c.index, c.hex]))
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = colorMap.get(matrix[y][x]) ?? '#ffffff'
      ctx.fillRect(x, y, 1, 1)
    }
  }
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${sanitize(name)}.png`)
  })
}

/** 带行列号编织图纸 PNG（每 10 针/行加粗线，方便对照编织） */
export function exportChartPng(colors: AknColor[], matrix: number[][], name: string, cell = 16) {
  const rows = matrix.length
  const cols = matrix[0]?.length ?? 0
  if (!rows || !cols) return
  const margin = 44
  const canvas = document.createElement('canvas')
  canvas.width = margin + cols * cell
  canvas.height = margin + rows * cell
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const colorMap = new Map(colors.map((c) => [c.index, c.hex]))

  // 格子
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = colorMap.get(matrix[y][x]) ?? '#ffffff'
      ctx.fillRect(margin + x * cell, margin + y * cell, cell, cell)
    }
  }

  // 网格线：细线 + 每 10 加粗
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = 0; x <= cols; x++) {
    if (x % 10 === 0) continue
    const px = margin + x * cell + 0.5
    ctx.moveTo(px, margin)
    ctx.lineTo(px, margin + rows * cell)
  }
  for (let y = 0; y <= rows; y++) {
    if (y % 10 === 0) continue
    const py = margin + y * cell + 0.5
    ctx.moveTo(margin, py)
    ctx.lineTo(margin + cols * cell, py)
  }
  ctx.stroke()
  ctx.strokeStyle = 'rgba(0,0,0,0.8)'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let x = 0; x <= cols; x += 10) {
    const px = margin + x * cell
    ctx.moveTo(px, margin)
    ctx.lineTo(px, margin + rows * cell)
  }
  for (let y = 0; y <= rows; y += 10) {
    const py = margin + y * cell
    ctx.moveTo(margin, py)
    ctx.lineTo(margin + cols * cell, py)
  }
  ctx.stroke()

  // 行列号
  ctx.fillStyle = '#111111'
  ctx.font = '11px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let x = 10; x <= cols; x += 10) ctx.fillText(String(x), margin + x * cell, margin / 2)
  ctx.textAlign = 'right'
  for (let y = 10; y <= rows; y += 10) ctx.fillText(String(y), margin - 6, margin + y * cell)

  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${sanitize(name)}-图纸.png`)
  })
}
