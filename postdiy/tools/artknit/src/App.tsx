import { useEffect, useState } from 'react'
import { useWorkbench } from './store/workbench'
import KnitCanvas from './components/KnitCanvas'
import ParamsPanel from './components/ParamsPanel'
import PalettePanel from './components/PalettePanel'
import WorkList from './components/WorkList'
import SetupPanel from './components/SetupPanel'
import ComposeView from './components/ComposeView'
import { exportAkn, exportPatternPng, exportChartPng } from './lib/exporters'

export default function App() {
  const stage = useWorkbench((s) => s.stage)
  const projectName = useWorkbench((s) => s.projectName)
  const setProjectName = useWorkbench((s) => s.setProjectName)
  const matrix = useWorkbench((s) => s.matrix)
  const save = useWorkbench((s) => s.save)
  const startNew = useWorkbench((s) => s.startNew)
  const dirty = useWorkbench((s) => s.dirty)
  const tool = useWorkbench((s) => s.tool)
  const setTool = useWorkbench((s) => s.setTool)
  const selectedColorIndex = useWorkbench((s) => s.selectedColorIndex)
  const palette = useWorkbench((s) => s.palette)
  const showGrid = useWorkbench((s) => s.showGrid)
  const setShowGrid = useWorkbench((s) => s.setShowGrid)
  const toast = useWorkbench((s) => s.toast)
  const showToast = useWorkbench((s) => s.showToast)
  const undo = useWorkbench((s) => s.undo)
  const redo = useWorkbench((s) => s.redo)
  const canUndo = useWorkbench((s) => s.history.length > 0)
  const canRedo = useWorkbench((s) => s.future.length > 0)
  const [showWorks, setShowWorks] = useState(false)
  const [showExport, setShowExport] = useState(false)

  // Ctrl+Z / Ctrl+Shift+Z 快捷键
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        if (e.shiftKey) redo()
        else undo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo])

  // 启动时初始化本地色卡方案库（含预置方案）
  useEffect(() => {
    useWorkbench.getState().refreshSchemes()
  }, [])

  const doExport = (kind: 'akn' | 'png' | 'chart') => {
    const s = useWorkbench.getState()
    if (s.matrix.length === 0) return
    if (kind === 'akn') exportAkn(s.projectName, s.params, s.palette.colors, s.matrix)
    if (kind === 'png') exportPatternPng(s.palette.colors, s.matrix, s.projectName, s.bgColor)
    if (kind === 'chart') exportChartPng(s.palette.colors, s.matrix, s.projectName, 16, s.bgColor)
    setShowExport(false)
    showToast('导出已开始下载')
  }

  const selectedColor = palette.colors.find((c) => c.index === selectedColorIndex)
  const isEdit = stage === 'edit'

  return (
    <div className="flex h-screen flex-col bg-zinc-900 text-zinc-100">
      {/* 顶栏 */}
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-4">
        <span className="text-sm font-bold tracking-widest text-indigo-400">ARTKNIT STUDIO</span>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-48 rounded border border-transparent bg-transparent px-2 py-1 text-sm hover:border-zinc-700 focus:border-indigo-500 focus:outline-none"
        />
        <div className="flex-1" />
        <button
          onClick={undo}
          disabled={!canUndo}
          title="撤销 (Ctrl+Z)"
          className="rounded px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
        >
          ↩ 撤销
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          title="重做 (Ctrl+Shift+Z)"
          className="rounded px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
        >
          ↪ 重做
        </button>
        <div className="relative">
          <button
            onClick={() => setShowExport((v) => !v)}
            disabled={matrix.length === 0}
            className="rounded px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
          >
            导出 ▾
          </button>
          {showExport && matrix.length > 0 && (
            <div className="absolute right-0 top-9 z-10 w-44 rounded-lg border border-zinc-700 bg-zinc-900 py-1 shadow-2xl">
              <button onClick={() => doExport('akn')} className="block w-full px-3 py-2 text-left text-xs text-zinc-200 hover:bg-zinc-800">
                AKN JSON 数据
              </button>
              <button onClick={() => doExport('png')} className="block w-full px-3 py-2 text-left text-xs text-zinc-200 hover:bg-zinc-800">
                PNG 成品图案
              </button>
              <button onClick={() => doExport('chart')} className="block w-full px-3 py-2 text-left text-xs text-zinc-200 hover:bg-zinc-800">
                PNG 编织图纸（带行列号）
              </button>
            </div>
          )}
        </div>
        <button onClick={() => setShowWorks((v) => !v)} className="rounded px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800">
          本地作品
        </button>
        <button onClick={startNew} className="rounded px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800">
          新建
        </button>
        <button
          onClick={save}
          disabled={matrix.length === 0}
          className="rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 disabled:opacity-40"
        >
          保存{dirty ? ' *' : ''}
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* 左侧：参数 + 色卡（仅编辑阶段） */}
        {isEdit && (
          <aside className="w-72 shrink-0 space-y-5 overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-4">
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">转换参数</h2>
              <ParamsPanel />
            </section>
            {palette.colors.length > 0 && (
              <section>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">色卡</h2>
                <PalettePanel />
              </section>
            )}
          </aside>
        )}

        {/* 中央：按阶段渲染 */}
        <main className="relative min-w-0 flex-1 bg-[#1e1e24]">
          {stage === 'setup' && <SetupPanel />}
          {stage === 'compose' && <ComposeView />}
          {isEdit && (matrix.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              还没有图案，点击右上角「新建」开始创作，或在「本地作品」中打开
            </div>
          ) : (
            <KnitCanvas />
          ))}
          {/* 工具条 */}
          {isEdit && matrix.length > 0 && (
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/90 p-1.5 shadow-lg">
              <label className="relative h-7 w-7 cursor-pointer rounded border border-zinc-600" style={{ background: selectedColor?.hex ?? '#fff' }} title="当前画笔颜色" />
              <button
                onClick={() => setTool('paint')}
                className={`rounded px-2.5 py-1 text-xs ${tool === 'paint' ? 'bg-indigo-600 text-white' : 'text-zinc-300 hover:bg-zinc-800'}`}
              >
                绘制
              </button>
              <button
                onClick={() => setTool('pick')}
                className={`rounded px-2.5 py-1 text-xs ${tool === 'pick' ? 'bg-indigo-600 text-white' : 'text-zinc-300 hover:bg-zinc-800'}`}
              >
                取色
              </button>
              <label className="flex cursor-pointer items-center gap-1.5 border-l border-zinc-700 pl-2 text-xs text-zinc-300">
                <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} className="h-3.5 w-3.5 accent-indigo-500" />
                网格
              </label>
            </div>
          )}
          {/* 本地作品面板 */}
          {showWorks && (
            <div className="absolute right-3 top-3 w-80 rounded-lg border border-zinc-700 bg-zinc-900/95 p-3 shadow-2xl">
              <WorkList onClose={() => setShowWorks(false)} />
            </div>
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-100 shadow-xl ring-1 ring-zinc-600">
          {toast}
        </div>
      )}
    </div>
  )
}
