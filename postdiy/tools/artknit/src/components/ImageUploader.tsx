import { useRef } from 'react'
import { useWorkbench } from '../store/workbench'

/** 首次上传区域：拖拽或点击选择图片 */
export default function ImageUploader() {
  const setImage = useWorkbench((s) => s.setImage)
  const busy = useWorkbench((s) => s.busy)
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        const f = e.dataTransfer.files?.[0]
        if (f && f.type.startsWith('image/')) setImage(f)
      }}
      className="flex h-full w-full flex-col items-center justify-center gap-4 p-8"
    >
      <div className="text-center">
        <div className="text-4xl font-bold tracking-wide text-zinc-100">ARTKNIT STUDIO</div>
        <p className="mt-2 text-sm text-zinc-400">上传图片，转换为针织像素图案 · 全程本地处理，不上传服务器</p>
      </div>
      <button
        onClick={() => fileRef.current?.click()}
        disabled={busy}
        className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-900/40 transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {busy ? '处理中…' : '选择图片'}
      </button>
      <p className="text-xs text-zinc-500">支持 JPG / PNG / WebP，可拖拽到此处</p>
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
