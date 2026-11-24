import { useRef } from 'react'
import { useWorkbench } from '../store/workbench'

/** 参数面板：针数 / 行数 / 颜色数量 / 算法 / 抖动 / 锐化 */
export default function ParamsPanel() {
  const params = useWorkbench((s) => s.params)
  const setParams = useWorkbench((s) => s.setParams)
  const setColorCount = useWorkbench((s) => s.setColorCount)
  const busy = useWorkbench((s) => s.busy)
  const source = useWorkbench((s) => s.source)
  const fileRef = useRef<HTMLInputElement>(null)
  const setImage = useWorkbench((s) => s.setImage)

  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center justify-between text-xs text-zinc-400">
          针数（宽）
          <input
            type="number"
            min={10}
            max={400}
            value={params.stitches}
            onChange={(e) => setParams({ stitches: Math.max(10, Math.min(400, +e.target.value || 10)) })}
            className="w-20 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-right text-sm text-zinc-100"
          />
        </label>
        <input
          type="range"
          min={10}
          max={400}
          value={params.stitches}
          onChange={(e) => setParams({ stitches: +e.target.value })}
          className="mt-2 w-full accent-indigo-500"
        />
      </div>

      <div>
        <label className="flex items-center justify-between text-xs text-zinc-400">
          行数（高）
          <input
            type="number"
            min={10}
            max={400}
            value={params.rows}
            onChange={(e) => setParams({ rows: Math.max(10, Math.min(400, +e.target.value || 10)) })}
            className="w-20 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-right text-sm text-zinc-100"
          />
        </label>
        <input
          type="range"
          min={10}
          max={400}
          value={params.rows}
          onChange={(e) => setParams({ rows: +e.target.value })}
          className="mt-2 w-full accent-indigo-500"
        />
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
          {(['kmeans', 'mediancut'] as const).map((a) => (
            <button
              key={a}
              onClick={() => setParams({ algorithm: a })}
              className={`rounded-md border px-2 py-1.5 text-xs transition ${
                params.algorithm === a
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                  : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              {a === 'kmeans' ? 'K-Means' : '中位切分'}
            </button>
          ))}
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

      <label className="flex cursor-pointer items-center justify-between rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-300">
        Floyd-Steinberg 抖动
        <input
          type="checkbox"
          checked={params.dithering}
          onChange={(e) => setParams({ dithering: e.target.checked })}
          className="h-4 w-4 accent-indigo-500"
        />
      </label>

      <button
        onClick={() => fileRef.current?.click()}
        disabled={!source}
        className="w-full rounded-md border border-dashed border-zinc-600 px-3 py-2 text-xs text-zinc-400 hover:border-indigo-500 hover:text-indigo-300 disabled:opacity-40"
      >
        重新选择图片
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
          if (f) setImage(f)
          e.target.value = ''
        }}
      />
    </div>
  )
}
