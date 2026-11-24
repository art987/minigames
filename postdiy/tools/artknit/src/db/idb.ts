/**
 * IndexedDB 持久化层（原生 API，无第三方依赖）
 * 数据库：artknit-studio / 对象仓库：projects
 * 关闭浏览器后作品仍然存在。
 */
import type { AknProject, AknProjectMeta, AknPalette } from '../types/akn'
import { SEED_PALETTES } from './seedPalettes'

const DB_NAME = 'artknit-studio'
const DB_VERSION = 2
const STORE = 'projects'
const PALETTES = 'palettes'

let dbPromise: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(PALETTES)) {
        db.createObjectStore(PALETTES, { keyPath: 'id' })
      }
    }
    req.onblocked = () => {
      console.warn('[artknit] IndexedDB 升级被其他标签页阻塞，请关闭其他本站标签页后刷新')
    }
    req.onsuccess = () => {
      const db = req.result
      // 本标签页关闭时让出数据库连接，避免阻塞其他标签页的版本升级
      db.onversionchange = () => {
        db.close()
        dbPromise = null
      }
      resolve(db)
    }
    req.onerror = () => {
      dbPromise = null
      reject(req.error)
    }
  })
  return dbPromise
}

function tx(db: IDBDatabase, mode: IDBTransactionMode) {
  return db.transaction(STORE, mode).objectStore(STORE)
}

function txP(db: IDBDatabase, mode: IDBTransactionMode) {
  return db.transaction(PALETTES, mode).objectStore(PALETTES)
}

export async function saveProject(project: AknProject): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = tx(db, 'readwrite').put(project)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export async function loadProject(id: string): Promise<AknProject | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = tx(db, 'readonly').get(id)
    req.onsuccess = () => resolve((req.result as AknProject) ?? null)
    req.onerror = () => reject(req.error)
  })
}

export async function deleteProject(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = tx(db, 'readwrite').delete(id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export async function listProjects(): Promise<AknProjectMeta[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = tx(db, 'readonly').getAll()
    req.onsuccess = () => {
      const all = (req.result as AknProject[]) ?? []
      const metas: AknProjectMeta[] = all.map((p) => ({
        id: p.id,
        name: p.name,
        updatedAt: p.updatedAt,
        stitches: p.params.stitches,
        rows: p.params.rows,
        colorCount: p.palette.colors.length,
        thumbnail: p.thumbnail,
      }))
      metas.sort((a, b) => b.updatedAt - a.updatedAt)
      resolve(metas)
    }
    req.onerror = () => reject(req.error)
  })
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/* ---------- 色卡方案库 ---------- */

export async function listPaletteSchemes(): Promise<AknPalette[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = txP(db, 'readonly').getAll()
    req.onsuccess = () => resolve((req.result as AknPalette[]) ?? [])
    req.onerror = () => reject(req.error)
  })
}

export async function savePaletteScheme(palette: AknPalette): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = txP(db, 'readwrite').put(palette)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export async function deletePaletteScheme(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = txP(db, 'readwrite').delete(id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

/** 首次使用时写入预置方案 */
export async function seedPaletteSchemes(): Promise<void> {
  const db = await openDB()
  const count = await new Promise<number>((resolve, reject) => {
    const req = txP(db, 'readonly').count()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  if (count > 0) return
  for (const p of SEED_PALETTES) {
    await savePaletteScheme(p)
  }
}
