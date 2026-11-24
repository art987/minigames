/**
 * Canvas 2D 针织像素网格预览与编辑
 * 支持：缩放（滚轮）、平移（空格/中键拖动）、单击绘制、取色
 */
import { useEffect, useRef, useCallback } from 'react'
import { useWorkbench } from '../store/workbench'

export default function KnitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewRef = useRef({ scale: 8, offsetX: 0, offsetY: 0 })
  const dragRef = useRef<{ panning: boolean; lastX: number; lastY: number } | null>(null)
  const needsDrawRef = useRef(true)

  const matrix = useWorkbench((s) => s.matrix)
  const palette = useWorkbench((s) => s.palette)
  const paintCell = useWorkbench((s) => s.paintCell)
  const gridVisible = useWorkbench((s) => s.showGrid)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const { width, height } = canvas
    ctx.fillStyle = '#1e1e24'
    ctx.fillRect(0, 0, width, height)
    if (matrix.length === 0 || matrix[0].length === 0) return

    const v = viewRef.current
    const rows = matrix.length
    const cols = matrix[0].length
    const colorMap = new Map(palette.colors.map((c) => [c.index, c.hex]))

    const w = cols * v.scale
    const h = rows * v.scale
    const x0 = v.offsetX
    const y0 = v.offsetY

    // 可视区域裁剪，仅绘制可见格子
    const cx0 = Math.max(0, Math.floor((0 - x0) / v.scale))
    const cy0 = Math.max(0, Math.floor((0 - y0) / v.scale))
    const cx1 = Math.min(cols, Math.ceil((width - x0) / v.scale))
    const cy1 = Math.min(rows, Math.ceil((height - y0) / v.scale))

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(x0, y0, w, h)

    for (let y = cy0; y < cy1; y++) {
      for (let x = cx0; x < cx1; x++) {
        const idx = matrix[y][x]
        const hex = colorMap.get(idx)
        if (!hex) continue
        ctx.fillStyle = hex
        ctx.fillRect(x0 + x * v.scale, y0 + y * v.scale, v.scale, v.scale)
      }
    }

    // 网格线
    if (gridVisible && v.scale >= 5) {
      ctx.strokeStyle = 'rgba(0,0,0,0.18)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = cx0; x <= cx1; x++) {
        const px = Math.round(x0 + x * v.scale) + 0.5
        ctx.moveTo(px, Math.max(0, y0))
        ctx.lineTo(px, Math.min(height, y0 + h))
      }
      for (let y = cy0; y <= cy1; y++) {
        const py = Math.round(y0 + y * v.scale) + 0.5
        ctx.moveTo(Math.max(0, x0), py)
        ctx.lineTo(Math.min(width, x0 + w), py)
      }
      ctx.stroke()
    }

    // 每 10 针辅助线
    if (v.scale >= 4) {
      ctx.strokeStyle = 'rgba(220,60,60,0.5)'
      ctx.beginPath()
      for (let x = 0; x <= cols; x += 10) {
        if (x < cx0 || x > cx1) continue
        const px = Math.round(x0 + x * v.scale) + 0.5
        ctx.moveTo(px, Math.max(0, y0))
        ctx.lineTo(px, Math.min(height, y0 + h))
      }
      for (let y = 0; y <= rows; y += 10) {
        if (y < cy0 || y > cy1) continue
        const py = Math.round(y0 + y * v.scale) + 0.5
        ctx.moveTo(Math.max(0, x0), py)
        ctx.lineTo(Math.min(width, x0 + w), py)
      }
      ctx.stroke()
    }
  }, [matrix, palette, gridVisible])

  // 自适应尺寸 + 动画帧重绘
  useEffect(() => {
    const canvas = canvasRef.current!
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * devicePixelRatio)
      canvas.height = Math.floor(rect.height * devicePixelRatio)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      needsDrawRef.current = true
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)
    let raf = 0
    const loop = () => {
      if (needsDrawRef.current) {
        needsDrawRef.current = false
        const ctx = canvas.getContext('2d')!
        ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
        draw()
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [draw])

  // 数据变化时触发重绘（由 rAF 循环执行，保证 transform 正确）
  useEffect(() => {
    needsDrawRef.current = true
  }, [draw])

  const fitView = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || matrix.length === 0) return
    const rows = matrix.length
    const cols = matrix[0].length
    const dpr = devicePixelRatio
    const scale = Math.min((canvas.width / dpr) / cols, (canvas.height / dpr) / rows)
    viewRef.current.scale = Math.max(1, scale * 0.95)
    viewRef.current.offsetX = ((canvas.width / dpr) - cols * viewRef.current.scale) / 2
    viewRef.current.offsetY = ((canvas.height / dpr) - rows * viewRef.current.scale) / 2
    needsDrawRef.current = true
  }, [matrix])

  // 首次有矩阵时自动适配
  const fittedRef = useRef('')
  useEffect(() => {
    const key = matrix.length ? `${matrix.length}x${matrix[0]?.length}` : ''
    if (key && fittedRef.current !== key) {
      fittedRef.current = key
      fitView()
    }
  }, [matrix, fitView])

  const cellAt = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const v = viewRef.current
    const col = Math.floor((x - v.offsetX) / v.scale)
    const row = Math.floor((y - v.offsetY) / v.scale)
    if (row < 0 || row >= matrix.length || col < 0 || col >= (matrix[0]?.length ?? 0)) return null
    return { row, col }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button === 1 || e.shiftKey) {
      dragRef.current = { panning: true, lastX: e.clientX, lastY: e.clientY }
      canvasRef.current?.setPointerCapture(e.pointerId)
      return
    }
    if (e.button === 0) {
      const c = cellAt(e)
      if (c) paintCell(c.row, c.col)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (d?.panning) {
      viewRef.current.offsetX += e.clientX - d.lastX
      viewRef.current.offsetY += e.clientY - d.lastY
      d.lastX = e.clientX
      d.lastY = e.clientY
      needsDrawRef.current = true
      return
    }
    if (e.buttons & 1) {
      const c = cellAt(e)
      if (c) paintCell(c.row, c.col)
    }
  }

  const onPointerUp = () => {
    dragRef.current = null
  }

  const onWheel = (e: React.WheelEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const v = viewRef.current
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
    const next = Math.max(1, Math.min(64, v.scale * factor))
    if (next === v.scale) return
    v.offsetX = mx - ((mx - v.offsetX) * next) / v.scale
    v.offsetY = my - ((my - v.offsetY) * next) / v.scale
    v.scale = next
    needsDrawRef.current = true
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-crosshair touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
      />
      <button
        onClick={fitView}
        className="absolute right-3 top-3 rounded-md border border-zinc-600 bg-zinc-800/90 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-700"
      >
        适配窗口
      </button>
    </div>
  )
}
