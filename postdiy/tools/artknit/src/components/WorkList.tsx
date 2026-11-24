import { useEffect } from 'react'
import { useWorkbench } from '../store/workbench'

/** 本地作品列表（IndexedDB） */
export default function WorkList({ onClose }: { onClose: () => void }) {
  const works = useWorkbench((s) => s.works)
  const refreshWorks = useWorkbench((s) => s.refreshWorks)
  const open = useWorkbench((s) => s.open)
  const remove = useWorkbench((s) => s.remove)
  const projectId = useWorkbench((s) => s.projectId)

  useEffect(() => {
    refreshWorks()
  }, [refreshWorks])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-400">本地作品（{works.length}）</div>
        <button onClick={onClose} className="text-xs text-zinc-500 hover:text-zinc-300">
          收起
        </button>
      </div>
      {works.length === 0 && <div className="rounded-md border border-dashed border-zinc-700 p-4 text-center text-xs text-zinc-500">暂无作品，转换后点击"保存"即可</div>}
      <div className="space-y-2">
        {works.map((w) => (
          <div
            key={w.id}
            className={`flex items-center gap-3 rounded-md border p-2 ${
              w.id === projectId ? 'border-indigo-500 bg-indigo-500/10' : 'border-zinc-700 bg-zinc-800'
            }`}
          >
            {w.thumbnail ? (
              <img src={w.thumbnail} alt="" className="h-10 w-10 shrink-0 rounded object-cover" />
            ) : (
              <div className="h-10 w-10 shrink-0 rounded bg-zinc-700" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs text-zinc-200">{w.name}</div>
              <div className="text-[10px] text-zinc-500">
                {w.stitches}针 × {w.rows}行 · {w.colorCount}色 · {new Date(w.updatedAt).toLocaleString()}
              </div>
            </div>
            <button onClick={() => { open(w.id); onClose() }} className="rounded px-2 py-1 text-xs text-indigo-300 hover:bg-indigo-500/20">
              打开
            </button>
            <button
              onClick={() => { if (confirm(`删除作品「${w.name}」？`)) remove(w.id) }}
              className="rounded px-2 py-1 text-xs text-rose-400 hover:bg-rose-500/20"
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
