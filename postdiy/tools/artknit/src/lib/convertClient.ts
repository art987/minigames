/**
 * Worker 调用客户端
 * - 防抖：频繁变化的参数只触发最后一次完整转换
 * - 取消/忽略：token 递增，旧任务结果直接丢弃，避免覆盖最新操作
 */
import ConvertWorker from '../workers/convert.worker?worker'
import type { AknColor, AknConvertParams, ConvertRequest, ConvertResponse } from '../types/akn'

export interface SourceImage {
  width: number
  height: number
  data: Uint8ClampedArray
}

let worker: Worker | null = null
let tokenSeq = 0
const pending = new Map<number, (res: ConvertResponse) => void>()

function getWorker(): Worker {
  const w = worker ?? new ConvertWorker()
  worker = w
  w.onmessage = (e: MessageEvent<ConvertResponse>) => {
    const cb = pending.get(e.data.token)
    if (cb) {
      pending.delete(e.data.token)
      cb(e.data)
    }
  }
  return w
}

/** 从图片 Blob/File 读取像素数据（主线程 decode，算法在 worker 内计算） */
export async function readImageFile(file: Blob): Promise<SourceImage> {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0)
  bitmap.close()
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
  return { width: img.width, height: img.height, data: img.data }
}

export function convertImage(
  mode: 'quick' | 'full',
  source: SourceImage,
  params: AknConvertParams,
  palette?: AknColor[],
): Promise<ConvertResponse> {
  const token = ++tokenSeq
  const req: ConvertRequest = {
    token,
    mode,
    params,
    imageData: source,
    palette,
  }
  return new Promise((resolve) => {
    pending.set(token, resolve)
    getWorker().postMessage(req)
  })
}

/** 防抖执行完整转换 */
export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number): (...args: A) => void {
  let t: ReturnType<typeof setTimeout> | null = null
  return (...args: A) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => fn(...args), ms)
  }
}
