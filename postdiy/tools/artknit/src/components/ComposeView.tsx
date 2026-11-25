import { useEffect, useRef, useState } from 'react'
import { useWorkbench } from '../store/workbench'
import { composeCanvasSize, fitPadded, fitScale, layerBBox, CROP_MIN, drawLayer, type ComposeCrop } from '../lib/compose'

type DragMode =
  | { kind: 'move'; lastX: number; lastY: number }
  | { kind: 'edge'; edge: keyof ComposeCrop; lastX: number; lastY: number }
  | { kind: 'scale'; fx: number; fy: number; baseDist: number; baseScale: number }

/**
 * 第二步：多图层裁切摆放
 * - 图层面板：添加多张图片、选中、显隐、删除、设置画布背景色
 * - 选中图层：拖动移动 / 四边中心锚点裁切 / 右下角锚点缩放 / 滚轮缩放
 */
export default function ComposeView() {
  const setup = useWorkbench((s) => s.setup)
  const layers = useWorkbench((s) => s.layers)
  const activeLayerId = useWorkbench((s) => s.activeLayerId)
  const bgColor = useWorkbench((s) => s.bgColor)
  const importComposeImage = useWorkbench((s) => s.importComposeImage)
  const setActiveLayer = useWorkbench((s) => s.setActiveLayer)
  const setLayerT = useWorkbench((s) => s.setLayerT)
  const setLayerCrop = useWorkbench((s) => s.setLayerCrop)
  const patchLayer = useWorkbench((s) => s.patchLayer)
  const toggleLayerVisible = useWorkbench((s) => s.toggleLayerVisible)
  const removeLayer = useWorkbench((s) => s.removeLayer)
  const setBgColor = useWorkbench((s) => s.setBgColor)
  const generatePattern = useWorkbench((s) => s.generatePattern)
  const backToSetup = useWorkbench((s) => s.backToSetup)
  const busy = useWorkbench((s) => s.busy)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dragRef = useRef<DragMode | null>(null)
  /** 画布显示方式：px=像素网格（默认），cm=实际尺寸（每 10cm 一格标尺） */
  const [ruler, setRuler] = useState<'px' | 'cm'>('px')

  const layer = layers.find((l) => l.id === activeLayerId) ?? layers[layers.length - 1] ?? null
  const { CW, CH } = composeCanvasSize(setup)
  const garment = setup.garment

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingQuality = 'high'
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, CW, CH)
    for (const l of layers) drawLayer(ctx, l)
    // 画布边框
    ctx.strokeStyle = 'rgba(99,102,241,0.9)'
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, CW - 2, CH - 2)
    // 实际尺寸显示：每 10cm 一条标尺线
    if (ruler === 'cm' && garment) {
      const stepX = (CW * 10) / garment.widthCm
      const stepY = (CH * 10) / garment.heightCm
      ctx.strokeStyle = 'rgba(129,140,248,0.35)'
      ctx.lineWidth = 1
      ctx.fillStyle = 'rgba(199,210,254,0.9)'
      ctx.font = `${12}px sans-serif`
      for (let x = stepX, i = 1; x < CW - 2; x += stepX, i++) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, CH)
        ctx.stroke()
        ctx.fillText(`${i * 10}`, x + 3, 14)
      }
      for (let y = stepY, i = 1; y < CH - 2; y += stepY, i++) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(CW, y)
        ctx.stroke()
        ctx.fillText(`${i * 10}`, 4, y - 4)
      }
    }
    if (!layer) return
    // 选中图层的锚点（屏幕上大小恒定）
    const { vx, vy, vw, vh } = layerBBox(layer)
    const cssW = canvas.getBoundingClientRect().width || CW
    const k = CW / cssW
    const drawAnchor = (x: number, y: number, big = false) => {
      const r = (big ? 9 : 6) * k
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = big ? '#818cf8' : '#ffffff'
      ctx.fill()
      ctx.lineWidth = 2 * k
      ctx.strokeStyle = '#4f46e5'
      ctx.stroke()
    }
    const inView = (x: number, y: number) => x > -20 * k && x < CW + 20 * k && y > -20 * k && y < CH + 20 * k
    if (inView(vx, vy + vh / 2)) drawAnchor(vx, vy + vh / 2)
    if (inView(vx + vw, vy + vh / 2)) drawAnchor(vx + vw, vy + vh / 2)
    if (inView(vx + vw / 2, vy)) drawAnchor(vx + vw / 2, vy)
    if (inView(vx + vw / 2, vy + vh)) drawAnchor(vx + vw / 2, vy + vh)
    if (inView(vx + vw, vy + vh)) drawAnchor(vx + vw, vy + vh, true)
    // 选中虚线框
    ctx.setLineDash([6 * k, 4 * k])
    ctx.strokeStyle = 'rgba(129,140,248,0.8)'
    ctx.lineWidth = 1.5 * k
    ctx.strokeRect(vx, vy, vw, vh)
    ctx.setLineDash([])
  }, [layers, layer, bgColor, CW, CH, ruler, garment])

  if (!layer) return null

  const cssK = () => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return CW / rect.width
  }
  const pointerInternal = (e: React.PointerEvent | React.WheelEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: (e.clientX - rect.left) * (CW / rect.width), y: (e.clientY - rect.top) * (CW / rect.width) }
  }
  const layerGeom = (l: NonNullable<typeof layer>) => layerBBox(l)

  const hitAnchor = (px: number, py: number): 'l' | 'r' | 't' | 'b' | 'corner' | null => {
    const k = cssK()
    const hit = 16 * k
    const { vx, vy, vw, vh } = layerGeom(layer)
    if (Math.hypot(px - (vx + vw), py - (vy + vh)) < 20 * k) return 'corner'
    if (Math.hypot(px - vx, py - (vy + vh / 2)) < hit) return 'l'
    if (Math.hypot(px - (vx + vw), py - (vy + vh / 2)) < hit) return 'r'
    if (Math.hypot(px - (vx + vw / 2), py - vy) < hit) return 't'
    if (Math.hypot(px - (vx + vw / 2), py - (vy + vh)) < hit) return 'b'
    return null
  }

  const clampCrop = (c: ComposeCrop): ComposeCrop => ({
    l: Math.min(Math.max(0, c.l), layer.width - c.r - CROP_MIN),
    r: Math.min(Math.max(0, c.r), layer.width - c.l - CROP_MIN),
    t: Math.min(Math.max(0, c.t), layer.height - c.b - CROP_MIN),
    b: Math.min(Math.max(0, c.b), layer.height - c.t - CROP_MIN),
  })

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const { x: ix, y: iy } = pointerInternal(e)
    const base = fitScale(layer, CW, CH)
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
    const ns = Math.min(base * 24, Math.max(base * 0.1, layer.t.scale * factor))
    setLayerT(layer.id, {
      scale: ns,
      x: ix - (ix - layer.t.x) * (ns / layer.t.scale),
      y: iy - (iy - layer.t.y) * (ns / layer.t.scale),
    })
  }

  const resetLayer = () => setLayerT(layer.id, fitPadded({ width: layer.width, height: layer.height }, CW, CH))

  /** 90° 步进旋转（绕图层中心） */
  const rotateLayer = (dir: 1 | -1) =>
    patchLayer(layer.id, { rotation: (((layer.rotation + dir * 90) % 360) + 360) % 360 })

  /** 水平/垂直居中（旋转不改变中心） */
  const centerLayer = (axis: 'h' | 'v') => {
    const dw = (layer.width - layer.crop.l - layer.crop.r) * layer.t.scale
    const dh = (layer.height - layer.crop.t - layer.crop.b) * layer.t.scale
    if (axis === 'h') setLayerT(layer.id, { ...layer.t, x: CW / 2 - layer.crop.l * layer.t.scale - dw / 2 })
    else setLayerT(layer.id, { ...layer.t, y: CH / 2 - layer.crop.t * layer.t.scale - dh / 2 })
  }

  const toolBtn = 'rounded border border-zinc-700 px-2.5 py-1 hover:border-zinc-500'

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 px-4 py-2 text-xs text-zinc-400">
        <span className="font-medium text-zinc-200">第 2 步 · 裁切摆放</span>
        <span className="text-zinc-500">拖动移动 · 边缘锚点裁切 · 右下角锚点缩放 · 滚轮缩放</span>
        {garment?.estimated && (
          <span className="rounded border border-amber-700/60 bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-300">
            预估密度 · 非生产校准数据
          </span>
        )}
        <div className="flex-1" />
        {garment && (
          <div className="flex overflow-hidden rounded border border-zinc-700">
            <button
              onClick={() => setRuler('px')}
              className={`px-2 py-1 ${ruler === 'px' ? 'bg-indigo-500/20 text-indigo-300' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              像素
            </button>
            <button
              onClick={() => setRuler('cm')}
              className={`px-2 py-1 ${ruler === 'cm' ? 'bg-indigo-500/20 text-indigo-300' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              实际 cm
            </button>
          </div>
        )}
        <button onClick={() => rotateLayer(-1)} className={toolBtn} title="逆时针旋转 90°">↺ 旋转</button>
        <button onClick={() => rotateLayer(1)} className={toolBtn} title="顺时针旋转 90°">↻ 旋转</button>
        <button onClick={() => centerLayer('h')} className={toolBtn}>水平居中</button>
        <button onClick={() => centerLayer('v')} className={toolBtn}>垂直居中</button>
        <button onClick={resetLayer} className={toolBtn}>重置本层</button>
        <button onClick={backToSetup} className={toolBtn}>← 上一步</button>
        <button
          onClick={generatePattern}
          disabled={busy}
          className="rounded bg-indigo-600 px-3.5 py-1 font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {busy ? '生成中…' : '生成针织图案 →'}
        </button>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden bg-zinc-950 p-4">
          <canvas
            ref={canvasRef}
            width={CW}
            height={CH}
            onWheel={onWheel}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId)
              const { x: px, y: py } = pointerInternal(e)
              const anchor = hitAnchor(px, py)
              if (anchor === 'corner') {
                const { vx, vy } = layerGeom(layer)
                dragRef.current = {
                  kind: 'scale', fx: vx, fy: vy,
                  baseDist: Math.max(4, Math.hypot(px - vx, py - vy)), baseScale: layer.t.scale,
                }
              } else if (anchor) {
                dragRef.current = { kind: 'edge', edge: anchor, lastX: e.clientX, lastY: e.clientY }
              } else {
                dragRef.current = { kind: 'move', lastX: e.clientX, lastY: e.clientY }
              }
            }}
            onPointerMove={(e) => {
              const d = dragRef.current
              if (!d) return
              if (d.kind === 'move') {
                const k = cssK()
                setLayerT(layer.id, { scale: layer.t.scale, x: layer.t.x + (e.clientX - d.lastX) * k, y: layer.t.y + (e.clientY - d.lastY) * k })
                d.lastX = e.clientX
                d.lastY = e.clientY
              } else if (d.kind === 'edge') {
                const k = cssK()
                const dx = (e.clientX - d.lastX) * k / layer.t.scale
                const dy = (e.clientY - d.lastY) * k / layer.t.scale
                const c = { ...layer.crop }
                if (d.edge === 'l') c.l = layer.crop.l + dx
                if (d.edge === 'r') c.r = layer.crop.r - dx
                if (d.edge === 't') c.t = layer.crop.t + dy
                if (d.edge === 'b') c.b = layer.crop.b - dy
                setLayerCrop(layer.id, clampCrop(c))
                d.lastX = e.clientX
                d.lastY = e.clientY
              } else {
                const { x: px, y: py } = pointerInternal(e)
                const dist = Math.max(4, Math.hypot(px - d.fx, py - d.fy))
                const base = fitScale(layer, CW, CH)
                const ns = Math.min(base * 24, Math.max(base * 0.1, d.baseScale * (dist / d.baseDist)))
                setLayerT(layer.id, { scale: ns, x: d.fx - layer.crop.l * ns, y: d.fy - layer.crop.t * ns })
              }
            }}
            onPointerUp={() => (dragRef.current = null)}
            className="max-h-full max-w-full cursor-crosshair touch-none select-none"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* 图层管理面板 */}
        <aside className="w-56 shrink-0 space-y-3 overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-300">图层（{layers.length}）</span>
            <label className="cursor-pointer rounded bg-indigo-600 px-2 py-1 text-[10px] text-white hover:bg-indigo-500">
              + 添加图片
              <input
                type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) importComposeImage(f)
                  e.target.value = ''
                }}
              />
            </label>
          </div>
          {layers.map((l) => (
            <div
              key={l.id}
              onClick={() => setActiveLayer(l.id)}
              className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 text-xs transition ${
                l.id === layer.id ? 'border-indigo-400 bg-indigo-500/15' : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500'
              }`}
            >
              <button
                onClick={(e) => { e.stopPropagation(); toggleLayerVisible(l.id) }}
                title={l.visible ? '隐藏' : '显示'}
                className="w-4 text-center"
              >
                {l.visible ? '👁' : '🚫'}
              </button>
              <span className={`min-w-0 flex-1 truncate ${l.visible ? 'text-zinc-200' : 'text-zinc-500'}`}>{l.name}</span>
              {layers.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeLayer(l.id) }}
                  className="text-rose-400 hover:text-rose-300"
                  title="删除图层"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <div className="space-y-1.5 border-t border-zinc-800 pt-3">
            <div className="text-xs font-medium text-zinc-300">画布背景色</div>
            <div className="flex items-center gap-2">
              <label className="relative h-7 w-7 shrink-0 cursor-pointer rounded border border-zinc-600" style={{ background: bgColor }}>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value.toUpperCase())} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
              </label>
              <span className="text-[10px] text-zinc-500">{bgColor}</span>
            </div>
            <div className="text-[10px] text-zinc-500">从方案库选色：</div>
            <SchemeColorPicker onPick={setBgColor} />
          </div>
        </aside>
      </div>
    </div>
  )
}

/** 从方案库的色卡里选一个颜色作为背景 */
function SchemeColorPicker({ onPick }: { onPick: (hex: string) => void }) {
  const schemes = useWorkbench((s) => s.schemes)
  const [sid, setSid] = useState('')
  const scheme = schemes.find((p) => p.id === sid)
  return (
    <div className="space-y-1.5">
      <select
        value={sid}
        onChange={(e) => setSid(e.target.value)}
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-1.5 py-1 text-[10px] text-zinc-200"
      >
        <option value="">选择方案…</option>
        {schemes.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      {scheme && (
        <div className="flex flex-wrap gap-1">
          {scheme.colors.map((c) => (
            <button
              key={c.index}
              onClick={() => onPick(c.hex)}
              title={`${c.name} ${c.hex}`}
              className="h-5 w-5 rounded border border-zinc-600 hover:ring-1 hover:ring-indigo-400"
              style={{ background: c.hex }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
