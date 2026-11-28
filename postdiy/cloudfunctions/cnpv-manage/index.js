const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// CORS 响应头（管理后台网页走 HTTP 网关调用）
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

function response(success, dataOrMessage) {
  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify(
      success
        ? { success: true, data: dataOrMessage }
        : { success: false, message: dataOrMessage }
    )
  }
}

// ===== 独立后台密码（与本工具其他系统无关，可被环境变量覆盖） =====
const ADMIN_USER = process.env.CNPV_ADMIN_USER || '15160029349'
const ADMIN_PASS = process.env.CNPV_ADMIN_PASS || '123456'

function checkAdmin(body) {
  const { adminUserId, adminPassword } = body || {}
  return String(adminUserId || '') === ADMIN_USER && String(adminPassword || '') === ADMIN_PASS
}

// 集合不存在时自动创建后重试
async function withCollection(name, fn) {
  try {
    return await fn()
  } catch (e) {
    const notExist =
      e.errCode === 'DATABASE_COLLECTION_NOT_EXIST' ||
      (e.message && (e.message.includes('collection not exists') || e.message.includes('DATABASE_COLLECTION_NOT_EXIST')))
    if (!notExist) throw e
    await db.createCollection(name)
    return await fn()
  }
}

const now = () => Date.now()

async function addDoc(collection, data) {
  return withCollection(collection, async () => {
    const r = await db.collection(collection).add({ data })
    return r._id
  })
}

async function updateDoc(collection, id, data) {
  return withCollection(collection, () =>
    db.collection(collection).doc(id).update({ data: { ...data, updatedAt: now() } }))
}

async function removeDoc(collection, id) {
  return withCollection(collection, () => db.collection(collection).doc(id).remove())
}

async function listAll(collection, where) {
  return withCollection(collection, async () => {
    const MAX = 1000
    let all = []
    let offset = 0
    // wx-server-sdk 单次 get 上限 1000，翻页取全量
    while (true) {
      let q = db.collection(collection)
      if (where) q = q.where(where)
      const r = await q.skip(offset).limit(MAX).get()
      all = all.concat(r.data || [])
      if (!r.data || r.data.length < MAX) break
      offset += MAX
    }
    return all
  })
}

// ---------- 分块导入（存量迁移用，按栏目粒度调用，规避网关 payload 限制） ----------
// actionData: { reset?: bool, category: { name, order, sections: [{ title, order, videos: [{title,fileKey,type,r2Url,qiniuUrl,order}] }] } }
// 语义：按「类目名+栏目名+视频fileKey」upsert，可重复调用（幂等、断点安全）
async function batchImport(actionData) {
  const cat = actionData && actionData.category
  if (!cat && !actionData.reset) throw new Error('actionData.category.name 缺失')

  if (actionData.reset) {
    for (const col of ['cnpv_categories', 'cnpv_sections', 'cnpv_videos']) {
      await withCollection(col, async () => {
        let r
        do {
          const q = await db.collection(col).limit(500).get()
          r = q.data || []
          await Promise.all(r.map(d => db.collection(col).doc(d._id).remove()))
        } while (r.length >= 500)
      })
    }
  }

  if (!cat) return { category: null, newSections: 0, videosWritten: 0 }

  // 找/建类目
  let catDocs = await listAll('cnpv_categories', { name: cat.name })
  let catId
  if (catDocs.length) {
    catId = catDocs[0]._id
  } else {
    catId = await addDoc('cnpv_categories', { name: cat.name, order: cat.order != null ? cat.order : 0, createdAt: now(), updatedAt: now() })
  }

  let secCount = 0, vidCount = 0
  for (let si = 0; si < (cat.sections || []).length; si++) {
    const s = cat.sections[si]
    const secDocs = await listAll('cnpv_sections', { categoryId: catId, title: s.title })
    let secId
    if (secDocs.length) {
      secId = secDocs[0]._id
    } else {
      secId = await addDoc('cnpv_sections', { categoryId: catId, title: s.title, order: s.order != null ? s.order : si, createdAt: now(), updatedAt: now() })
      secCount++
    }
    const existing = await listAll('cnpv_videos', { sectionId: secId })
    const byKey = {}
    for (const v of existing) byKey[v.fileKey] = v._id
    const videos = s.videos || []
    for (let i = 0; i < videos.length; i += 20) {
      const chunk = videos.slice(i, i + 20)
      await Promise.all(chunk.map((v, j) => {
        const record = {
          categoryId: catId,
          sectionId: secId,
          title: v.title || '',
          fileKey: v.fileKey || '',
          type: v.type || 'v',
          r2Url: v.r2Url || '',
          qiniuUrl: v.qiniuUrl || '',
          online: true,
          order: v.order != null ? v.order : i + j,
          updatedAt: now()
        }
        if (byKey[v.fileKey]) {
          return updateDoc('cnpv_videos', byKey[v.fileKey], record)
        }
        record.createdAt = now()
        return addDoc('cnpv_videos', record)
      }))
      vidCount += chunk.length
    }
  }
  return { category: cat.name, newSections: secCount, videosWritten: vidCount }
}

exports.main = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  let body
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || event
  } catch (e) {
    return response(false, '参数解析失败')
  }

  if (!checkAdmin(body)) {
    return response(false, '账号或密码错误')
  }

  const { action, actionData } = body || {}

  try {
    switch (action) {
      // ---------- 验证登录 ----------
      case 'verify':
        return response(true, { ok: true })

      // ---------- 类目 ----------
      case 'listCategories':
        return response(true, await listAll('cnpv_categories'))
      case 'addCategory':
        return response(true, await addDoc('cnpv_categories', {
          name: String(actionData.name || '').trim().slice(0, 30),
          order: Number(actionData.order) || 0,
          createdAt: now(), updatedAt: now()
        }))
      case 'updateCategory':
        return response(true, await updateDoc('cnpv_categories', actionData.id, {
          name: String(actionData.name || '').trim().slice(0, 30),
          order: Number(actionData.order) || 0
        }))
      case 'deleteCategory': {
        // 级联删除栏目与视频
        const sections = await listAll('cnpv_sections', { categoryId: actionData.id })
        for (const s of sections) {
          await withCollection('cnpv_videos', async () => {
            let r
            do {
              const q = await db.collection('cnpv_videos').where({ sectionId: s._id }).limit(500).get()
              r = q.data || []
              await Promise.all(r.map(d => db.collection('cnpv_videos').doc(d._id).remove()))
            } while (r.length >= 500)
          })
          await removeDoc('cnpv_sections', s._id)
        }
        return response(true, await removeDoc('cnpv_categories', actionData.id))
      }

      // ---------- 栏目 ----------
      case 'listSections':
        return response(true, await listAll('cnpv_sections', actionData && actionData.categoryId ? { categoryId: actionData.categoryId } : null))
      case 'addSection':
        return response(true, await addDoc('cnpv_sections', {
          categoryId: actionData.categoryId,
          title: String(actionData.title || '').trim().slice(0, 60),
          order: Number(actionData.order) || 0,
          createdAt: now(), updatedAt: now()
        }))
      case 'updateSection':
        return response(true, await updateDoc('cnpv_sections', actionData.id, {
          title: String(actionData.title || '').trim().slice(0, 60),
          order: Number(actionData.order) || 0
        }))
      case 'deleteSection':
        await withCollection('cnpv_videos', async () => {
          let r
          do {
            const q = await db.collection('cnpv_videos').where({ sectionId: actionData.id }).limit(500).get()
            r = q.data || []
            await Promise.all(r.map(d => db.collection('cnpv_videos').doc(d._id).remove()))
          } while (r.length >= 500)
        })
        return response(true, await removeDoc('cnpv_sections', actionData.id))
      // 栏目移动到其它类目：其下视频的一级分类同步更新
      case 'moveSection': {
        if (!actionData.categoryId) throw new Error('categoryId 缺失')
        await updateDoc('cnpv_sections', actionData.id, { categoryId: actionData.categoryId })
        await withCollection('cnpv_videos', async () => {
          let r
          do {
            const q = await db.collection('cnpv_videos').where({ sectionId: actionData.id }).limit(500).get()
            r = q.data || []
            await Promise.all(r.map(d => db.collection('cnpv_videos').doc(d._id).update({ data: { categoryId: actionData.categoryId, updatedAt: now() } })))
          } while (r.length >= 500)
        })
        return response(true, { moved: true })
      }

      // ---------- 视频 ----------
      case 'listVideos':
        return response(true, await listAll('cnpv_videos', actionData && actionData.sectionId ? { sectionId: actionData.sectionId } : null))
      case 'addVideo':
        return response(true, await addDoc('cnpv_videos', {
          categoryId: actionData.categoryId,
          sectionId: actionData.sectionId,
          title: String(actionData.title || '').trim().slice(0, 100),
          fileKey: String(actionData.fileKey || '').trim().slice(0, 300),
          type: actionData.type === 'i' ? 'i' : 'v',
          r2Url: String(actionData.r2Url || '').trim().slice(0, 600),
          qiniuUrl: String(actionData.qiniuUrl || '').trim().slice(0, 600),
          online: actionData.online !== false,
          order: Number(actionData.order) || 0,
          createdAt: now(), updatedAt: now()
        }))
      case 'updateVideo': {
        const patch = {}
        if (actionData.title != null) patch.title = String(actionData.title).trim().slice(0, 100)
        if (actionData.online != null) patch.online = !!actionData.online
        if (actionData.order != null) patch.order = Number(actionData.order) || 0
        if (actionData.r2Url != null) patch.r2Url = String(actionData.r2Url).trim().slice(0, 600)
        if (actionData.qiniuUrl != null) patch.qiniuUrl = String(actionData.qiniuUrl).trim().slice(0, 600)
        if (actionData.sectionId != null) patch.sectionId = actionData.sectionId
        if (actionData.categoryId != null) patch.categoryId = actionData.categoryId
        return response(true, await updateDoc('cnpv_videos', actionData.id, patch))
      }
      // 批量移动视频到其它类目/栏目（支持单个或多个）
      case 'moveVideos': {
        const ids = Array.isArray(actionData.ids) ? actionData.ids : []
        if (!ids.length) throw new Error('ids 为空')
        const patch = { updatedAt: now() }
        if (actionData.categoryId != null) patch.categoryId = actionData.categoryId
        if (actionData.sectionId != null) patch.sectionId = actionData.sectionId
        await withCollection('cnpv_videos', () =>
          Promise.all(ids.map(id => db.collection('cnpv_videos').doc(id).update({ data: patch }))))
        return response(true, { moved: ids.length })
      }
      case 'deleteVideo':
        return response(true, await removeDoc('cnpv_videos', actionData.id))

      // ---------- 批量导入 ----------
      case 'batchImport':
        return response(true, await batchImport(actionData))

      default:
        return response(false, '未知 action: ' + action)
    }
  } catch (e) {
    console.error('[cnpv-manage] error', action, e)
    return response(false, '操作失败: ' + e.message)
  }
}
