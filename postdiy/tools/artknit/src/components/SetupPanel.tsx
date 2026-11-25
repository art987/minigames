import { useEffect } from 'react'
import { useWorkbench } from '../store/workbench'
import {
  GARMENT_TYPES, PIECE_TYPES, FIT_LEVELS,
  sizesFor, estimatedDensity, defaultPieceSize, computeCanvas, defaultGarmentSpec,
} from '../data/garmentSpecs'
import type { GarmentSpec } from '../types/akn'

const num = (v: string, min: number, max: number) => Math.min(max, Math.max(min, Number(v) || min))

/**
 * 第一步：智能衣片画布向导
 * 服装类型 → 尺码 → 宽松程度 → 衣片 → 实际尺寸 → 织物密度 → 自动计算针织像素画布
 * 尺寸/密度均来自 data/garmentSpecs.ts 可配置数据表，仅作初始预设，用户可随时覆盖。
 */
export default function SetupPanel() {
  const setup = useWorkbench((s) => s.setup)
  const schemes = useWorkbench((s) => s.schemes)
  const updateSetup = useWorkbench((s) => s.updateSetup)
  const importComposeImage = useWorkbench((s) => s.importComposeImage)

  // 首次进入时写入默认衣片设定
  useEffect(() => {
    if (!useWorkbench.getState().setup.garment) {
      const g = defaultGarmentSpec()
      const { stitches, rows } = computeCanvas(g)
      updateSetup({ garment: g, stitches, rows })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 渲染兜底：garment 短暂为 null 时用默认值展示
  const g: GarmentSpec = setup.garment ?? defaultGarmentSpec()

  /** 更新衣片设定并重算画布针数/行数 */
  const setG = (patch: Partial<GarmentSpec>) => {
    const cur = useWorkbench.getState().setup.garment ?? defaultGarmentSpec()
    let next: GarmentSpec = { ...cur, ...patch }
    const typeChanged = patch.garmentType !== undefined && patch.garmentType !== cur.garmentType

    if (typeChanged) {
      next.sizeId = sizesFor(next.garmentType)[0]?.id ?? null
      next.fit = 'regular'
      next.pieceId = 'front'
      if (next.estimated) {
        const d = estimatedDensity(next.garmentType)
        next.stitchesPer10cm = d.st
        next.rowsPer10cm = d.rw
      }
    }
    // 切换尺码 / 宽松程度 / 衣片 → 用数据表重填尺寸（用户可再改）
    const dimsChanged =
      typeChanged ||
      (patch.sizeId !== undefined && patch.sizeId !== cur.sizeId) ||
      (patch.fit !== undefined && patch.fit !== cur.fit) ||
      (patch.pieceId !== undefined && patch.pieceId !== cur.pieceId)
    if (dimsChanged) {
      const dim = defaultPieceSize(next.garmentType, next.sizeId, next.pieceId, next.fit)
      if (dim) {
        next.widthCm = dim.widthCm
        next.heightCm = dim.heightCm
      }
    }
    const { stitches, rows } = computeCanvas(next)
    updateSetup({ garment: next, stitches, rows })
  }

  const sizes = sizesFor(g.garmentType)
  const typeDef = GARMENT_TYPES.find((t) => t.id === g.garmentType)

  const chip = (active: boolean) =>
    `rounded-md border px-2.5 py-1.5 text-xs transition ${
      active
        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
        : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500'
    }`

  return (
    <div className="flex h-full items-start justify-center overflow-y-auto p-6">
      <div className="w-full max-w-lg space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/70 p-6">
        <div>
          <div className="text-base font-semibold text-zinc-100">新建衣片 · 第 1 步</div>
          <div className="mt-1 text-xs text-zinc-500">
            选择服装与衣片信息，系统按实际尺寸 × 织物密度自动计算针织像素画布
          </div>
        </div>

        {/* 服装类型 */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-zinc-400">服装类型</div>
          <div className="flex flex-wrap gap-1.5">
            {GARMENT_TYPES.map((t) => (
              <button key={t.id} onClick={() => setG({ garmentType: t.id })} className={chip(g.garmentType === t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 尺码 + 宽松程度 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-medium text-zinc-400">尺码{sizes.length === 0 && '（自定义，无预设）'}</div>
            <div className="flex flex-wrap gap-1.5">
              {sizes.length > 0 ? (
                sizes.map((s) => (
                  <button key={s.id} onClick={() => setG({ sizeId: s.id })} className={chip(g.sizeId === s.id)}>
                    {s.label}
                  </button>
                ))
              ) : (
                <span className="text-[10px] text-zinc-600">直接输入下方实际尺寸即可</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-zinc-400">宽松程度</div>
            <div className="flex flex-wrap gap-1.5">
              {typeDef?.fit ? (
                FIT_LEVELS.map((f) => (
                  <button key={f.id} onClick={() => setG({ fit: f.id })} className={chip(g.fit === f.id)}>
                    {f.label}
                  </button>
                ))
              ) : (
                <span className="text-[10px] text-zinc-600">不适用</span>
              )}
            </div>
          </div>
        </div>

        {/* 衣片类型 */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-zinc-400">衣片类型（每个衣片是独立画布）</div>
          <div className="flex flex-wrap gap-1.5">
            {PIECE_TYPES.map((p) => (
              <button key={p.id} onClick={() => setG({ pieceId: p.id })} className={chip(g.pieceId === p.id)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 实际尺寸 + 密度 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-medium text-zinc-400">衣片实际尺寸（cm）</div>
            <label className="flex items-center justify-between gap-2 text-xs text-zinc-400">
              宽
              <input
                type="number" min={2} max={300} step={0.5} value={g.widthCm}
                onChange={(e) => setG({ widthCm: num(e.target.value, 2, 300) })}
                className="w-24 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-right text-sm text-zinc-100"
              />
            </label>
            <label className="flex items-center justify-between gap-2 text-xs text-zinc-400">
              高
              <input
                type="number" min={2} max={300} step={0.5} value={g.heightCm}
                onChange={(e) => setG({ heightCm: num(e.target.value, 2, 300) })}
                className="w-24 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-right text-sm text-zinc-100"
              />
            </label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-zinc-400">织物密度（/10cm）</div>
              <label className="flex cursor-pointer items-center gap-1 text-[10px] text-zinc-400">
                <input
                  type="checkbox" checked={g.estimated}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const d = estimatedDensity(g.garmentType)
                      setG({ estimated: true, stitchesPer10cm: d.st, rowsPer10cm: d.rw })
                    } else {
                      setG({ estimated: false })
                    }
                  }}
                />
                预估模式
              </label>
            </div>
            <label className="flex items-center justify-between gap-2 text-xs text-zinc-400">
              横向针数
              <input
                type="number" min={5} max={80} value={g.stitchesPer10cm}
                onChange={(e) => setG({ stitchesPer10cm: num(e.target.value, 5, 80), estimated: false })}
                className="w-24 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-right text-sm text-zinc-100"
              />
            </label>
            <label className="flex items-center justify-between gap-2 text-xs text-zinc-400">
              纵向行数
              <input
                type="number" min={5} max={120} value={g.rowsPer10cm}
                onChange={(e) => setG({ rowsPer10cm: num(e.target.value, 5, 120), estimated: false })}
                className="w-24 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-right text-sm text-zinc-100"
              />
            </label>
          </div>
        </div>

        {/* 预估提示 + 计算结果 */}
        {g.estimated && (
          <div className="rounded-md border border-amber-700/60 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-300">
            ⚠ 预估模式：当前密度为预设估计值，非生产校准数据。有实际试样密度后请手动输入。
          </div>
        )}
        <div className="flex items-center justify-between rounded-md border border-zinc-700 bg-zinc-800/60 px-3 py-2.5">
          <span className="text-xs text-zinc-400">
            针织像素画布（{g.widthCm} × {g.heightCm} cm）
          </span>
          <span className="text-sm font-semibold text-indigo-300">
            {setup.stitches} 针 × {setup.rows} 行
          </span>
        </div>

        {/* 颜色来源 */}
        <div className="space-y-3">
          <div className="text-xs font-medium text-zinc-400">颜色来源</div>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-300">
            <input
              type="radio" checked={setup.colorMode === 'auto'} onChange={() => updateSetup({ colorMode: 'auto' })}
            />
            自动取色
            <input
              type="number" min={2} max={32} value={setup.colorCount}
              disabled={setup.colorMode !== 'auto'}
              onChange={(e) => updateSetup({ colorCount: Math.min(32, Math.max(2, Number(e.target.value) || 2)) })}
              className="ml-1 w-16 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs disabled:opacity-40"
            />
            色
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-300">
            <input
              type="radio" checked={setup.colorMode === 'scheme'} onChange={() => updateSetup({ colorMode: 'scheme' })}
            />
            使用方案库方案
            <select
              value={setup.schemeId ?? ''}
              disabled={setup.colorMode !== 'scheme'}
              onChange={(e) => updateSetup({ schemeId: e.target.value || null })}
              className="ml-1 min-w-0 flex-1 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs disabled:opacity-40"
            >
              <option value="">选择方案…</option>
              {schemes.map((p) => (
                <option key={p.id} value={p.id}>{p.name}（{p.colors.length} 色）</option>
              ))}
            </select>
          </label>
        </div>

        {/* 导入 */}
        <label className="block cursor-pointer rounded-lg bg-indigo-600 py-3 text-center text-sm font-medium text-white hover:bg-indigo-500">
          导入图片，进行裁切摆放 →
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
    </div>
  )
}
