import { useRef, useState } from 'react'
import { useWorkbench } from '../store/workbench'

/** 参数面板：针数 / 行数（可锁定等比）/ 颜色数量 / 算法 / 锐化 */
export default function ParamsPanel() {
  const params = useWorkbench((s) => s.params)
  const setParams = useWorkbench((s) => s.setParams)
  const setColorCount = useWorkbench((s) => s.setColorCount)
  const busy = useWorkbench((s) => s.busy)
  const source = useWorkbench((s) => s.source)
  const hasLayers = useWorkbench((s) => s.layers.length > 0)
  const fileRef = useRef<HTMLInputElement>(null)
  const importComposeImage = useWorkbench((s) => s.importComposeImage)
  const updateSetup = useWorkbench((s) => s.updateSetup)
  // 等比锁：锁定后针数/行数按锁定时的比例联动
  const [locked, setLocked] = useState(false)
  const ratioRef = useRef(params.stitches / params.rows)

  const clamp = (v: number) => Math.max(10, Math.min(400, v || 10))
  const setStitches = (v: number) => {
    const s = clamp(v)
    setParams(locked ? { stitches: s, rows: clamp(Math.round(s / ratioRef.current)) } : { stitches: s })
  }
  const setRows = (v: number) => {
    const r = clamp(v)
    setParams(locked ? { rows: r, stitches: clamp(Math.round(r * ratioRef.current)) } : { rows: r })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs text-zinc-400">
          针数（宽）
          <input
            type="number" min={10} max={400} value={params.stitches}
            onChange={(e) => setStitches(+e.target.value)}
            className="w-20 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-right text-sm text-zinc-100"
          />
        </label>
        <input type="range" min={10} max={400} value={params.stitches} onChange={(e) => setStitches(+e.target.value)} className="w-full accent-indigo-500" />

        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              if (!locked) ratioRef.current = params.stitches / params.rows
              setLocked(!locked)
            }}
            title={locked ? '已锁定等比：改针数/行数会按比例联动' : '未锁定：针数/行数各自独立'}
            className={`rounded-full border px-3 py-0.5 text-[10px] transition ${
              locked
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                : 'border-zinc-700 bg-zinc-800 text-zinc-500 hover:border-zinc-500'
            }`}
          >
            {locked ? '🔗 等比锁定' : '⛓ 等比未锁'}
          </button>
        </div>

        <label className="flex items-center justify-between text-xs text-zinc-400">
          行数（高）
          <input
            type="number" min={10} max={400} value={params.rows}
            onChange={(e) => setRows(+e.target.value)}
            className="w-20 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-right text-sm text-zinc-100"
          />
        </label>
        <input type="range" min={10} max={400} value={params.rows} onChange={(e) => setRows(+e.target.value)} className="w-full accent-indigo-500" />
      </div>

      <div>
        <label className="flex items-center justify-between text-xs text-zinc-400">
          颜色数量
          <span className="text-sm text-zinc-100">{params.colorCount}</span>
        </label>
        <input
          type="range"
          min={2}
          max={32}
          value={params.colorCount}
          onChange={(e) => setColorCount(+e.target.value)}
          className="mt-2 w-full accent-indigo-500"
        />
      </div>

      <div>
        <div className="mb-2 text-xs text-zinc-400">取色算法</div>
        <div className="grid grid-cols-2 gap-2">
          {([
            ['kmeans', 'K-Means', '自动归纳主色，过渡更平滑，适合照片'],
            ['mediancut', '中位切分', '按色块区域硬切，边界更干脆，适合卡通图形'],
          ] as const).map(([a, label, desc]) => (
            <button
              key={a}
              onClick={() => setParams({ algorithm: a })}
              title={desc}
              className={`rounded-md border px-2 py-1.5 text-xs transition ${
                params.algorithm === a
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                  : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-1.5 text-[10px] leading-relaxed text-zinc-500">
          {params.algorithm === 'kmeans'
            ? '大白话：把图片里的颜色自动归成几堆相近的，选每堆的代表色，颜色过渡自然，适合照片。'
            : '大白话：把颜色从最多的一侧一刀刀切成 N 块，色块边界硬朗，适合卡通、logo、图形。'}
        </div>
      </div>

      <div>
        <label className="flex items-center justify-between text-xs text-zinc-400">
          锐化强度
          <span className="text-sm text-zinc-100">{params.sharpen}</span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={params.sharpen}
          onChange={(e) => setParams({ sharpen: +e.target.value })}
          className="mt-2 w-full accent-indigo-500"
        />
      </div>

      <button
        onClick={() => fileRef.current?.click()}
        disabled={!source && !hasLayers}
        className="w-full rounded-md border border-dashed border-zinc-600 px-3 py-2 text-xs text-zinc-400 hover:border-indigo-500 hover:text-indigo-300 disabled:opacity-40"
      >
        重新裁切 / 更换图片
      </button>

      {busy && (
        <div className="flex items-center gap-2 text-xs text-indigo-300">
          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
          正在完整转换…
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) {
            // 以当前画布尺寸回到裁切摆放步骤
            updateSetup({ stitches: params.stitches, rows: params.rows })
            importComposeImage(f)
          }
          e.target.value = ''
        }}
      />
    </div>
  )
}
