import { useState } from 'react'
import { useWorkbench } from '../store/workbench'

/** 色卡编辑面板：自定义改色 / 增删 / 色卡方案库 */
export default function PalettePanel() {
  const palette = useWorkbench((s) => s.palette)
  const schemes = useWorkbench((s) => s.schemes)
  const paletteMode = useWorkbench((s) => s.paletteMode)
  const activeSchemeId = useWorkbench((s) => s.activeSchemeId)
  const selected = useWorkbench((s) => s.selectedColorIndex)
  const setSelected = useWorkbench((s) => s.setSelectedColorIndex)
  const updateColor = useWorkbench((s) => s.updateColor)
  const renameColor = useWorkbench((s) => s.renameColor)
  const addColor = useWorkbench((s) => s.addColor)
  const removeColor = useWorkbench((s) => s.removeColor)
  const applyScheme = useWorkbench((s) => s.applyScheme)
  const useAutoPalette = useWorkbench((s) => s.useAutoPalette)
  const saveScheme = useWorkbench((s) => s.saveScheme)
  const removeScheme = useWorkbench((s) => s.removeScheme)
  const [schemeName, setSchemeName] = useState('')

  const selectValue = paletteMode === 'auto' ? '__auto' : activeSchemeId ?? '__custom'

  return (
    <div className="space-y-3">
      {/* 色卡方案库 */}
      <div className="space-y-2 rounded-md border border-zinc-800 bg-zinc-900/60 p-2.5">
        <div className="text-xs text-zinc-400">
          色卡方案库
          <span className="ml-2 text-[10px] text-zinc-500">
            {paletteMode === 'auto' ? '当前：自动取色' : activeSchemeId ? '当前：库内方案' : '当前：自定义'}
          </span>
        </div>
        <select
          value={selectValue}
          onChange={(e) => {
            const v = e.target.value
            if (v === '__auto') useAutoPalette()
            else if (v !== '__custom') applyScheme(v)
          }}
          className="w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-xs text-zinc-200"
        >
          <option value="__auto">自动取色（从图片提取）</option>
          {schemes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}（{s.colors.length} 色）
            </option>
          ))}
          {paletteMode === 'custom' && !activeSchemeId && <option value="__custom">自定义色卡（未保存）</option>}
        </select>
        <div className="flex gap-1.5">
          <input
            value={schemeName}
            onChange={(e) => setSchemeName(e.target.value)}
            placeholder="方案名称…"
            className="min-w-0 flex-1 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-200 placeholder:text-zinc-600"
          />
          <button
            onClick={() => {
              if (schemeName.trim()) {
                saveScheme(schemeName)
                setSchemeName('')
              }
            }}
            className="shrink-0 rounded bg-indigo-600 px-2.5 py-1 text-xs text-white hover:bg-indigo-500"
          >
            存为方案
          </button>
          {activeSchemeId && (
            <button
              onClick={() => removeScheme(activeSchemeId)}
              className="shrink-0 rounded px-2 py-1 text-xs text-rose-400 hover:bg-rose-500/20"
            >
              删除
            </button>
          )}
        </div>
      </div>

      {/* 当前色卡 */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-400">当前色卡（{palette.colors.length} 色）</div>
        <div className="flex gap-1">
          <button onClick={addColor} title="添加颜色" className="rounded px-2 py-0.5 text-xs text-indigo-300 hover:bg-indigo-500/20">
            + 添加
          </button>
          <button onClick={() => removeColor(selected)} title="删除当前选中颜色（使用中的颜色不可删除）" className="rounded px-2 py-0.5 text-xs text-rose-400 hover:bg-rose-500/20">
            − 删除
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {palette.colors.map((c) => (
          <div
            key={c.index}
            onClick={() => setSelected(c.index)}
            className={`flex cursor-pointer items-center gap-2 rounded-md border p-1.5 transition ${
              selected === c.index
                ? 'border-indigo-400 bg-indigo-500/15 ring-1 ring-indigo-400'
                : 'border-zinc-700 bg-zinc-800 hover:border-zinc-500'
            }`}
          >
            <label className="relative h-8 w-8 shrink-0 cursor-pointer rounded" style={{ background: c.hex }}>
              <input
                type="color"
                value={c.hex}
                onChange={(e) => updateColor(c.index, e.target.value.toUpperCase())}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[10px] text-zinc-400">#{c.hex.slice(1)}</div>
              <input
                value={c.name}
                onChange={(e) => renameColor(c.index, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full truncate bg-transparent text-xs text-zinc-200 outline-none focus:text-indigo-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
