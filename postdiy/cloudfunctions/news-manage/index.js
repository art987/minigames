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

// 统一后台管理员鉴权（与 save-app-config 等保持一致）
const ADMIN_USER_ID = '15160029349'
const ADMIN_PASSWORD = '123456'
const ADMIN_KEY = process.env.ADMIN_KEY || 'xm-postdiy-2026'

function checkAdmin(adminUserId, adminPassword, adminKey) {
  if (
    adminUserId && adminPassword &&
    String(adminUserId) === ADMIN_USER_ID && String(adminPassword) === ADMIN_PASSWORD
  ) return true
  if (adminKey && String(adminKey) === ADMIN_KEY) return true
  return false
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

// 规整资讯字段（正文为富文本 HTML，由管理后台编辑器产出、小程序 rich-text 渲染）
const MAX_CONTENT_LEN = 300 * 1024

function normalizeArticle(input) {
  const src = input && typeof input === 'object' ? input : {}
  const title = String(src.title == null ? '' : src.title).trim().slice(0, 60)
  const summary = String(src.summary == null ? '' : src.summary).trim().slice(0, 200)
  const coverUrl = String(src.coverUrl == null ? '' : src.coverUrl).trim().slice(0, 500)
  const categoryId = String(src.categoryId == null ? '' : src.categoryId).trim()
  const content = String(src.content == null ? '' : src.content).slice(0, MAX_CONTENT_LEN)
  return {
    title,
    summary,
    coverUrl,
    categoryId,
    content,
    isPublished: !!src.isPublished
  }
}

// ---------- 七牛上传凭证签发（前端直传，文件内容不经过云函数，支持大体积视频） ----------
const crypto = require('crypto')
const QINIU_AK = process.env.QINIU_ACCESS_KEY || '4TVRjmuj-nLeEcwFFOCbCBMiWlQR2BYt2Ee4ZPdb'
const QINIU_SK = process.env.QINIU_SECRET_KEY || 'C_y75p4asBDZ22BJ0JjGl1I1CsBSUcoiixDG262O'
const QINIU_BUCKET = process.env.QINIU_BUCKET || 'posterbg'
const QINIU_DOMAIN = 'https://7ncdn.peacelove.top'
const QINIU_UPLOAD_URL = 'https://up-z2.qiniup.com' // 华南 z2

function qiniuSafe64(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
}

function makeQiniuToken(key) {
  const putPolicy = JSON.stringify({
    scope: `${QINIU_BUCKET}:${key}`,
    deadline: Math.floor(Date.now() / 1000) + 1800
  })
  const encoded = qiniuSafe64(Buffer.from(putPolicy))
  const sign = qiniuSafe64(crypto.createHmac('sha1', QINIU_SK).update(encoded).digest())
  return `${QINIU_AK}:${sign}:${encoded}`
}

exports.main = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  // 兼容 HTTP 网关（body JSON 字符串）与直调
  let body
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || event
  } catch (e) {
    return response(false, '参数解析失败')
  }

  const { adminKey, adminUserId, adminPassword, action } = body || {}
  if (!checkAdmin(adminUserId, adminPassword, adminKey)) {
    return response(false, '鉴权失败，请重新登录后台')
  }

  try {
    switch (action) {
      // ---------- 分类 ----------
      case 'cat.list': {
        const res = await withCollection('news_categories', () =>
          db.collection('news_categories').orderBy('sort', 'asc').orderBy('createdAt', 'asc').limit(100).get()
        )
        // 附带每个分类下的资讯数量（用于「非空不可删」提示与列表展示）
        const cats = res.data || []
        const counts = await Promise.all(
          cats.map((c) =>
            withCollection('news_articles', () =>
              db.collection('news_articles').where({ categoryId: c._id }).count()
            ).catch(() => ({ total: 0 }))
          )
        )
        return response(true, cats.map((c, i) => ({ ...c, articleCount: counts[i].total })))
      }
      case 'cat.add': {
        const name = String((body.name || '')).trim().slice(0, 20)
        if (!name) return response(false, '分类名称不能为空')
        const sort = Number(body.sort) || 0
        const doc = { name, sort, createdAt: db.serverDate() }
        const res = await withCollection('news_categories', () =>
          db.collection('news_categories').add({ data: doc })
        )
        return response(true, { _id: res._id, ...doc, articleCount: 0 })
      }
      case 'cat.rename': {
        const id = String(body.id || '')
        const name = String((body.name || '')).trim().slice(0, 20)
        if (!id || !name) return response(false, '参数缺失')
        const data = { name }
        if (body.sort != null) data.sort = Number(body.sort) || 0
        await withCollection('news_categories', () =>
          db.collection('news_categories').doc(id).update({ data })
        )
        return response(true, { id })
      }
      case 'cat.del': {
        const id = String(body.id || '')
        if (!id) return response(false, '参数缺失')
        // 非空分类禁止删除
        const cnt = await withCollection('news_articles', () =>
          db.collection('news_articles').where({ categoryId: id }).count()
        )
        if (cnt.total > 0) {
          return response(false, `该分类下还有 ${cnt.total} 篇资讯，请先移走或删除后再删除分类`)
        }
        await withCollection('news_categories', () =>
          db.collection('news_categories').doc(id).remove()
        )
        return response(true, { id })
      }

      // ---------- 资讯 ----------
      case 'art.list': {
        const page = Math.max(1, Number(body.page) || 1)
        const pageSize = Math.min(50, Math.max(1, Number(body.pageSize) || 20))
        let query = withCollection('news_articles', () =>
          db.collection('news_articles').orderBy('createdAt', 'desc')
        )
        const col = db.collection('news_articles')
        const countRes = await withCollection('news_articles', () => col.count())
        const res = await withCollection('news_articles', () =>
          col.orderBy('createdAt', 'desc').skip((page - 1) * pageSize).limit(pageSize).get()
        )
        void query
        // 补充分类名称
        const cats = await withCollection('news_categories', () =>
          db.collection('news_categories').limit(100).get()
        ).catch(() => ({ data: [] }))
        const catMap = {}
        ;(cats.data || []).forEach((c) => { catMap[c._id] = c.name })
        const list = (res.data || []).map((a) => ({ ...a, categoryName: catMap[a.categoryId] || '' }))
        return response(true, { list, total: countRes.total, page, pageSize })
      }
      case 'art.get': {
        const id = String(body.id || '')
        if (!id) return response(false, '参数缺失')
        const res = await withCollection('news_articles', () =>
          db.collection('news_articles').doc(id).get()
        )
        return response(true, res.data)
      }
      case 'art.create': {
        const data = normalizeArticle(body.article)
        if (!data.title) return response(false, '标题不能为空')
        data.createdAt = db.serverDate()
        data.updatedAt = db.serverDate()
        const res = await withCollection('news_articles', () =>
          db.collection('news_articles').add({ data })
        )
        return response(true, { _id: res._id })
      }
      case 'art.update': {
        const id = String(body.id || '')
        if (!id) return response(false, '参数缺失')
        const data = normalizeArticle(body.article)
        if (!data.title) return response(false, '标题不能为空')
        data.updatedAt = db.serverDate()
        await withCollection('news_articles', () =>
          db.collection('news_articles').doc(id).update({ data })
        )
        return response(true, { id })
      }
      case 'art.del': {
        const id = String(body.id || '')
        if (!id) return response(false, '参数缺失')
        await withCollection('news_articles', () =>
          db.collection('news_articles').doc(id).remove()
        )
        // 若该文章正被推送，取消推送
        await withCollection('app_config', () =>
          db.collection('app_config').doc('newsPush').update({ data: { articleId: null } })
        ).catch(() => {})
        return response(true, { id })
      }

      // ---------- 推送设置（存 app_config 集合 newsPush 文档，避免被 save-app-config 整文档覆盖） ----------
      case 'push.get': {
        const res = await withCollection('app_config', () =>
          db.collection('app_config').doc('newsPush').get()
        ).catch(() => null)
        const d = res && res.data ? res.data : {}
        let article = null
        if (d.articleId) {
          const a = await withCollection('news_articles', () =>
            db.collection('news_articles').doc(d.articleId).get()
          ).catch(() => null)
          if (a && a.data) article = { _id: a.data._id, title: a.data.title, isPublished: a.data.isPublished }
        }
        return response(true, { enabled: !!d.enabled, articleId: d.articleId || null, article })
      }
      case 'push.set': {
        const enabled = !!body.enabled
        const articleId = body.articleId ? String(body.articleId) : null
        await withCollection('app_config', () =>
          db.collection('app_config').doc('newsPush').set({
            data: { enabled, articleId, updatedAt: db.serverDate() }
          })
        )
        return response(true, { enabled, articleId })
      }

      // ---------- 上传凭证（前端直传七牛：封面/插图/视频统一走 7ncdn.peacelove.top/news/） ----------
      case 'upload.token': {
        let ext = String(body.ext || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5)
        if (ext === 'jpeg') ext = 'jpg'
        const allowed = ['jpg', 'png', 'webp', 'gif', 'mp4', 'mov', 'm4v', 'webm']
        if (!allowed.includes(ext)) ext = 'jpg'
        const key = `news/${Date.now()}_${Math.floor(Math.random() * 1000000)}.${ext}`
        return response(true, {
          key,
          token: makeQiniuToken(key),
          url: `${QINIU_DOMAIN}/${key}`,
          uploadUrl: QINIU_UPLOAD_URL
        })
      }

      default:
        return response(false, '未知 action: ' + action)
    }
  } catch (e) {
    console.error('news-manage 错误:', action, e)
    return response(false, '操作失败：' + (e.message || '请稍后重试'))
  }
}
