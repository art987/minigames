/**
 * 工作台全局状态（Zustand）
 * - paletteMode: auto=从图片自动提取色卡；custom=使用用户自定义色卡方案绘制图片
 * - 撤销/重做：绘制、色卡修改、应用方案、重新转换均可回退
 */
import { create } from 'zustand'
import type { AknColor, AknConvertParams, AknProjectMeta, AknPalette, AknProject } from '../types/akn'
import {
  newId, saveProject, loadProject, deleteProject, listProjects,
  listPaletteSchemes, savePaletteScheme, deletePaletteScheme, seedPaletteSchemes,
} from '../db/idb'
import { convertImage, debounce, readImageFile, type SourceImage } from '../lib/convertClient'

const DEFAULT_PARAMS: AknConvertParams = {
  stitches: 100,
  rows: 100,
  colorCount: 8,
  dithering: true,
  algorithm: 'kmeans',
  sharpen: 20,
}

/** 历史快照 */
interface Snapshot {
  matrix: number[][]
  colors: AknColor[]
  paletteMode: 'auto' | 'custom'
}

interface WorkbenchState {
  /* 当前工程 */
  projectId: string | null
  projectName: string
  params: AknConvertParams
  palette: AknPalette
  paletteMode: 'auto' | 'custom'
  activeSchemeId: string | null
  matrix: number[][]
  source: SourceImage | null
  sourceBlob: Blob | null
  thumbnail: string | null
  /* 状态 */
  busy: boolean
  dirty: boolean
  works: AknProjectMeta[]
  schemes: AknPalette[]
  selectedColorIndex: number
  tool: 'paint' | 'pick'
  showGrid: boolean
  toast: string | null
  /* 历史 */
  history: Snapshot[]
  future: Snapshot[]

  setParams: (patch: Partial<AknConvertParams>) => void
  setImage: (file: File) => Promise<void>
  paintCell: (row: number, col: number) => void
  setSelectedColorIndex: (i: number) => void
  setTool: (t: 'paint' | 'pick') => void
  updateColor: (index: number, hex: string) => void
  renameColor: (index: number, name: string) => void
  addColor: () => void
  removeColor: (index: number) => void
  setColorCount: (n: number) => void
  /* 色卡方案 */
  applyScheme: (id: string) => void
  useAutoPalette: () => void
  saveScheme: (name: string) => Promise<void>
  removeScheme: (id: string) => Promise<void>
  refreshSchemes: () => Promise<void>
  /* 撤销 */
  undo: () => void
  redo: () => void
  /* 工程 */
  setProjectName: (name: string) => void
  save: () => Promise<void>
  open: (id: string) => Promise<void>
  remove: (id: string) => Promise<void>
  refreshWorks: () => Promise<void>
  newProject: () => void
  setShowGrid: (v: boolean) => void
  showToast: (msg: string) => void
}

function paletteFrom(colors: AknColor[], name = '当前色卡'): AknPalette {
  return { id: newId(), name, colors }
}

function makeThumbnail(matrix: number[][], colors: AknColor[]): string {
  const h = matrix.length
  const w = h > 0 ? matrix[0].length : 0
  if (!w || !h) return ''
  const canvas = document.createElement('canvas')
  canvas.width = Math.min(w, 120)
  canvas.height = Math.round((canvas.width * h) / w)
  const ctx = canvas.getContext('2d')!
  for (let y = 0; y < canvas.height; y++) {
    const sy = Math.floor((y / canvas.height) * h)
    for (let x = 0; x < canvas.width; x++) {
      const sx = Math.floor((x / canvas.width) * w)
      const idx = matrix[sy]?.[sx] ?? -1
      const c = colors.find((cc) => cc.index === idx)
      ctx.fillStyle = c ? c.hex : '#ffffff'
      ctx.fillRect(x, y, 1, 1)
    }
  }
  return canvas.toDataURL('image/png')
}

/** 完整转换防抖 350ms */
let runFullDebounced: ((source: SourceImage, params: AknConvertParams) => void) | null = null
/** 绘制时的历史节拍 */
let lastSnapTime = 0

export const useWorkbench = create<WorkbenchState>((set, get) => {
  const pushHistory = (snap: Snapshot) => {
    set((st) => ({ history: [...st.history.slice(-49), snap], future: [] }))
  }
  const pushHistoryThrottled = (snap: Snapshot) => {
    const now = Date.now()
    if (now - lastSnapTime < 400) return
    lastSnapTime = now
    pushHistory(snap)
  }
  const currentSnapshot = (): Snapshot => ({
    matrix: get().matrix,
    colors: get().palette.colors,
    paletteMode: get().paletteMode,
  })

  /** 应用转换结果（full 自动提取时记录历史） */
  const applyResult = (matrix: number[][], palette: AknColor[], snapshot = false) => {
    if (snapshot) pushHistory(currentSnapshot())
    set({ matrix, palette: paletteFrom(palette), busy: false, dirty: true })
  }

  /** 用当前自定义色卡重绘图片：先快速预览，再防抖完整转换（含抖动） */
  const requantize = () => {
    const source = get().source
    if (!source) return
    const colors = get().palette.colors
    convertImage('quick', source, get().params, colors).then((res) => {
      if (res.matrix.length > 0) set({ matrix: res.matrix, dirty: true })
    })
    runFullDebounced!(source, get().params)
  }

  if (!runFullDebounced) {
    runFullDebounced = debounce((source: SourceImage, params: AknConvertParams) => {
      set({ busy: true })
      // 自定义模式：用现有色卡完整转换（含抖动），不重新提取
      const custom = get().paletteMode === 'custom' ? get().palette.colors : undefined
      convertImage('full', source, params, custom).then((res) => {
        if (res.matrix.length > 0) applyResult(res.matrix, res.palette, custom === undefined)
        else set({ busy: false })
      })
    }, 350)
  }

  return {
    projectId: null,
    projectName: '未命名作品',
    params: { ...DEFAULT_PARAMS },
    palette: paletteFrom([]),
    paletteMode: 'auto',
    activeSchemeId: null,
    matrix: [],
    source: null,
    sourceBlob: null,
    thumbnail: null,
    busy: false,
    dirty: false,
    works: [],
    schemes: [],
    selectedColorIndex: 0,
    tool: 'paint',
    showGrid: true,
    toast: null,
    history: [],
    future: [],

    setParams: (patch) => {
      const params = { ...get().params, ...patch }
      set({ params, dirty: true })
      const source = get().source
      if (!source) return
      // 快速预览：自定义模式用现有色卡，自动模式也先用当前色卡立即出图
      convertImage('quick', source, params, get().palette.colors).then((res) => {
        if (res.matrix.length > 0) set({ matrix: res.matrix, dirty: true })
      })
      runFullDebounced!(source, params)
    },

    setImage: async (file) => {
      const source = await readImageFile(file)
      const ratio = source.height / source.width
      const params = { ...get().params }
      params.rows = Math.max(10, Math.round(params.stitches * ratio))
      set({
        source, sourceBlob: file, params, busy: true, dirty: true, selectedColorIndex: 0,
        paletteMode: 'auto', activeSchemeId: null, history: [], future: [],
      })
      get().showToast('图片已加载，正在转换…')
      convertImage('full', source, params).then((res) => {
        if (res.matrix.length > 0) applyResult(res.matrix, res.palette)
        else set({ busy: false })
      })
    },

    paintCell: (row, col) => {
      const { matrix, palette, selectedColorIndex, tool } = get()
      if (tool === 'pick') {
        const idx = matrix[row]?.[col]
        if (idx != null && idx >= 0) set({ selectedColorIndex: idx, tool: 'paint' })
        return
      }
      if (!matrix[row] || matrix[row][col] === selectedColorIndex) return
      if (!palette.colors.some((c) => c.index === selectedColorIndex)) return
      pushHistoryThrottled(currentSnapshot())
      const next = matrix.map((r, y) => (y === row ? r.map((v, x) => (x === col ? selectedColorIndex : v)) : r))
      set({ matrix: next, dirty: true })
    },

    setSelectedColorIndex: (i) => set({ selectedColorIndex: i }),
    setTool: (t) => set({ tool: t }),

    updateColor: (index, hex) => {
      const palette = get().palette
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      const colors = palette.colors.map((c) => (c.index === index ? { ...c, hex, r, g, b } : c))
      pushHistory(currentSnapshot())
      // 手动改色 → 切换为自定义模式，永久生效，不会被自动提取覆盖
      set({
        palette: { ...palette, colors },
        paletteMode: 'custom',
        activeSchemeId: null,
        dirty: true,
      })
      requantize()
    },

    renameColor: (index, name) => {
      const palette = get().palette
      const colors = palette.colors.map((c) => (c.index === index ? { ...c, name } : c))
      set({ palette: { ...palette, colors }, dirty: true })
    },

    addColor: () => {
      const palette = get().palette
      const maxIndex = palette.colors.reduce((m, c) => Math.max(m, c.index), -1)
      const c: AknColor = {
        index: maxIndex + 1, hex: '#808080',
        name: `${String(palette.colors.length + 1).padStart(2, '0')} 色`,
        r: 128, g: 128, b: 128,
      }
      pushHistory(currentSnapshot())
      set({
        palette: { ...palette, colors: [...palette.colors, c] },
        selectedColorIndex: c.index,
        paletteMode: 'custom',
        activeSchemeId: null,
        dirty: true,
      })
    },

    removeColor: (index) => {
      const { matrix, palette } = get()
      if (palette.colors.length <= 1) return
      if (matrix.some((row) => row.some((v) => v === index))) {
        get().showToast('该颜色仍在图案中使用，无法删除')
        return
      }
      pushHistory(currentSnapshot())
      const colors = palette.colors.filter((c) => c.index !== index)
      set({
        palette: { ...palette, colors },
        selectedColorIndex: get().selectedColorIndex === index ? (colors[0]?.index ?? 0) : get().selectedColorIndex,
        paletteMode: 'custom',
        activeSchemeId: null,
        dirty: true,
      })
    },

    setColorCount: (n) => get().setParams({ colorCount: n }),

    /* ---------- 色卡方案 ---------- */

    applyScheme: (id) => {
      const scheme = get().schemes.find((s) => s.id === id)
      if (!scheme || scheme.colors.length === 0) return
      pushHistory(currentSnapshot())
      set({
        palette: paletteFrom(scheme.colors.map((c) => ({ ...c })), scheme.name),
        paletteMode: 'custom',
        activeSchemeId: id,
        dirty: true,
      })
      requantize()
      get().showToast(`已应用方案「${scheme.name}」`)
    },

    useAutoPalette: () => {
      pushHistory(currentSnapshot())
      set({ paletteMode: 'auto', activeSchemeId: null, dirty: true })
      const source = get().source
      if (source) runFullDebounced!(source, get().params)
    },

    saveScheme: async (name) => {
      const palette = get().palette
      if (palette.colors.length === 0) return
      const scheme: AknPalette = {
        id: newId(),
        name: name.trim() || '我的方案',
        colors: palette.colors.map((c) => ({ ...c })),
      }
      await savePaletteScheme(scheme)
      await get().refreshSchemes()
      set({ activeSchemeId: scheme.id })
      get().showToast(`方案「${scheme.name}」已保存到本地库`)
    },

    removeScheme: async (id) => {
      const scheme = get().schemes.find((s) => s.id === id)
      if (!scheme) return
      if (!confirm(`删除色卡方案「${scheme.name}」？`)) return
      await deletePaletteScheme(id)
      if (get().activeSchemeId === id) set({ activeSchemeId: null })
      await get().refreshSchemes()
      get().showToast('方案已删除')
    },

    refreshSchemes: async () => {
      await seedPaletteSchemes()
      const schemes = await listPaletteSchemes()
      set({ schemes })
    },

    /* ---------- 撤销 / 重做 ---------- */

    undo: () => {
      const { history, matrix, palette, paletteMode } = get()
      if (history.length === 0) return
      const prev = history[history.length - 1]
      set({
        history: history.slice(0, -1),
        future: [...get().future.slice(-49), { matrix, colors: palette.colors, paletteMode }],
        matrix: prev.matrix,
        palette: { ...get().palette, colors: prev.colors },
        paletteMode: prev.paletteMode,
        dirty: true,
      })
    },

    redo: () => {
      const { future, matrix, palette, paletteMode } = get()
      if (future.length === 0) return
      const next = future[future.length - 1]
      set({
        future: future.slice(0, -1),
        history: [...get().history.slice(-49), { matrix, colors: palette.colors, paletteMode }],
        matrix: next.matrix,
        palette: { ...get().palette, colors: next.colors },
        paletteMode: next.paletteMode,
        dirty: true,
      })
    },

    /* ---------- 工程 ---------- */

    setProjectName: (name) => set({ projectName: name, dirty: true }),

    save: async () => {
      const s = get()
      const project: AknProject = {
        id: s.projectId ?? newId(),
        name: s.projectName,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        params: s.params,
        palette: s.palette,
        matrix: s.matrix,
        paletteMode: s.paletteMode,
        originalImage: s.sourceBlob,
        thumbnail: s.matrix.length ? makeThumbnail(s.matrix, s.palette.colors) : null,
      }
      await saveProject(project)
      set({ projectId: project.id, dirty: false })
      await get().refreshWorks()
      get().showToast(`已保存到本地：${project.name}`)
    },

    open: async (id) => {
      const p = await loadProject(id)
      if (!p) return
      let source: SourceImage | null = null
      if (p.originalImage) {
        try {
          source = await readImageFile(p.originalImage)
        } catch {
          source = null
        }
      }
      set({
        projectId: p.id,
        projectName: p.name,
        params: p.params,
        palette: p.palette,
        paletteMode: p.paletteMode ?? 'auto',
        activeSchemeId: null,
        matrix: p.matrix,
        source,
        sourceBlob: p.originalImage,
        thumbnail: p.thumbnail,
        dirty: false,
        selectedColorIndex: p.palette.colors[0]?.index ?? 0,
        history: [],
        future: [],
      })
      get().showToast(`已打开：${p.name}`)
    },

    remove: async (id) => {
      await deleteProject(id)
      if (get().projectId === id) set({ projectId: null, matrix: [], source: null, sourceBlob: null, thumbnail: null })
      await get().refreshWorks()
      get().showToast('作品已删除')
    },

    refreshWorks: async () => {
      const works = await listProjects()
      set({ works })
    },

    newProject: () => {
      set({
        projectId: null,
        projectName: '未命名作品',
        params: { ...DEFAULT_PARAMS },
        palette: paletteFrom([]),
        paletteMode: 'auto',
        activeSchemeId: null,
        matrix: [],
        source: null,
        sourceBlob: null,
        thumbnail: null,
        dirty: false,
        selectedColorIndex: 0,
        history: [],
        future: [],
      })
    },

    setShowGrid: (v) => set({ showGrid: v }),

    showToast: (msg) => {
      set({ toast: msg })
      setTimeout(() => {
        if (get().toast === msg) set({ toast: null })
      }, 2400)
    },
  }
})
