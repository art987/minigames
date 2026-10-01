// 闪喵客服反馈云函数
// 用户端 action: submit(提交新反馈) / list(我的会话列表) / reply(追加回复)
// 管理端 action: adminList / adminReply / adminClose（Basic 账密鉴权，与 admin-vip-packages 一致）
// 数据集合: feedback（一个工单一个文档，多轮对话内嵌在 replies 数组）
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

const COLLECTION = 'feedback'

// 简单管理员鉴权（与 admin-vip-packages / admin-auth.js 配置保持一致）
const ADMIN_USER_ID = '15160029349'
const ADMIN_PASSWORD = '123456'

function response(success, data, message) {
  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({
      success,
      data: data === undefined ? null : data,
      message: message || (success ? '操作成功' : '操作失败')
    })
  }
}

function checkAuth(headers, body) {
  const authHeader =
    (headers && (headers['Authorization'] || headers['authorization'])) || ''
  if (authHeader) {
    // 格式: Basic base64(userId:password)
    try {
      const parts = authHeader.split(' ')
      if (parts.length === 2 && parts[0] === 'Basic') {
        const decoded = Buffer.from(parts[1], 'base64').toString('utf-8')
        const [uid, pwd] = decoded.split(':')
        if (uid === ADMIN_USER_ID && pwd === ADMIN_PASSWORD) {
          return true
        }
      }
    } catch (e) {
      return false
    }
  }
  // 兼容直接传参
  if (body && body.adminUserId && body.adminPassword) {
    return body.adminUserId === ADMIN_USER_ID && body.adminPassword === ADMIN_PASSWORD
  }
  return false
}

// 确保集合存在（首次调用时自动创建）
async function ensureCollection() {
  try {
    await db.createCollection(COLLECTION)
  } catch (e) {
    // 已存在时报错，忽略
  }
}

// 校验用户是否存在（users 集合）
async function userExists(userId) {
  const res = await db.collection('users').where({ _id: userId }).limit(1).get()
  return !!(res.data && res.data.length > 0)
}

// 用户提交新反馈（创建工单）
async function submitFeedback(userId, phone, brandName, content) {
  const text = String(content || '').trim()
  if (!text) {
    return response(false, null, '反馈内容不能为空')
  }
  if (text.length > 1000) {
    return response(false, null, '反馈内容不能超过1000字')
  }
  if (!(await userExists(userId))) {
    return response(false, null, '用户不存在，请重新登录')
  }
  const now = db.serverDate()
  const res = await db.collection(COLLECTION).add({
    data: {
      userId,
      phone: String(phone || '').trim(),
      brandName: String(brandName || '').trim(),
      status: 'pending',
      replies: [{ from: 'user', content: text, createTime: now }],
      createTime: now,
      updateTime: now
    }
  })
  return response(true, { feedbackId: res._id }, '提交成功，客服会尽快回复')
}

// 用户查询自己的会话列表（按最近更新倒序）
async function listFeedback(userId, limit) {
  const res = await db
    .collection(COLLECTION)
    .where({ userId })
    .orderBy('updateTime', 'desc')
    .limit(Math.min(Number(limit) || 20, 50))
    .get()
  return response(true, { list: res.data || [] })
}

// 用户追加回复（工单自动变回「待处理」，提醒管理员有新消息）
async function replyFeedback(userId, feedbackId, content) {
  const text = String(content || '').trim()
  if (!text) {
    return response(false, null, '回复内容不能为空')
  }
  if (text.length > 1000) {
    return response(false, null, '回复内容不能超过1000字')
  }
  if (!feedbackId) {
    return response(false, null, '缺少会话ID')
  }
  const fb = await db.collection(COLLECTION).doc(feedbackId).get()
  if (!fb.data || fb.data.userId !== userId) {
    return response(false, null, '会话不存在')
  }
  const now = db.serverDate()
  await db.collection(COLLECTION).doc(feedbackId).update({
    data: {
      replies: _.push([{ from: 'user', content: text, createTime: now }]),
      status: 'pending',
      updateTime: now
    }
  })
  return response(true, null, '已发送')
}

// 管理端：工单分页列表（待处理优先展示在最前由前端排序，这里按更新时间倒序）
async function adminList(page, pageSize, status) {
  let query = db.collection(COLLECTION)
  if (status && status !== 'all') {
    query = query.where({ status })
  }
  const pageNum = Math.max(Number(page) || 1, 1)
  const size = Math.min(Number(pageSize) || 20, 50)
  const [listRes, countRes] = await Promise.all([
    query.orderBy('updateTime', 'desc').skip((pageNum - 1) * size).limit(size).get(),
    query.count()
  ])
  return response(true, { list: listRes.data || [], total: countRes.total, page: pageNum, pageSize: size })
}

// 管理端：回复工单（可选同时关闭）
async function adminReply(feedbackId, content, close) {
  const text = String(content || '').trim()
  if (!text) {
    return response(false, null, '回复内容不能为空')
  }
  if (!feedbackId) {
    return response(false, null, '缺少会话ID')
  }
  const now = db.serverDate()
  await db.collection(COLLECTION).doc(feedbackId).update({
    data: {
      replies: _.push([{ from: 'admin', content: text, createTime: now }]),
      status: close ? 'closed' : 'replied',
      updateTime: now
    }
  })
  return response(true, null, close ? '已回复并关闭' : '回复成功')
}

// 管理端：关闭工单（不再等待用户后续）
async function adminClose(feedbackId) {
  if (!feedbackId) {
    return response(false, null, '缺少会话ID')
  }
  await db.collection(COLLECTION).doc(feedbackId).update({
    data: { status: 'closed', updateTime: db.serverDate() }
  })
  return response(true, null, '已关闭')
}

exports.main = async (event, context) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  let body
  try {
    // 兼容两种入口：HTTP 网关（参数在 event.body 字符串里）/ 小程序 callFunction（参数即 event 本身）
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body)
    } else if (event.body && typeof event.body === 'object') {
      body = event.body
    } else {
      body = event || {}
    }
  } catch (e) {
    return response(false, null, '参数解析失败')
  }

  const { action, userId } = body
  const isAdminAction = ['adminList', 'adminReply', 'adminClose'].indexOf(action) > -1

  try {
    await ensureCollection()

    // 管理端操作：先鉴权
    if (isAdminAction) {
      if (!checkAuth(event.headers || {}, body)) {
        return response(false, null, '无权限')
      }
      switch (action) {
        case 'adminList':
          return await adminList(body.page, body.pageSize, body.status)
        case 'adminReply':
          return await adminReply(body.feedbackId, body.content, body.close)
        case 'adminClose':
          return await adminClose(body.feedbackId)
      }
    }

    // 用户端操作：必须带 userId
    if (!userId) {
      return response(false, null, '用户ID不能为空')
    }
    switch (action) {
      case 'submit':
        return await submitFeedback(userId, body.phone, body.brandName, body.content)
      case 'list':
        return await listFeedback(userId, body.limit)
      case 'reply':
        return await replyFeedback(userId, body.feedbackId, body.content)
      default:
        return response(false, null, '未知的操作类型')
    }
  } catch (e) {
    console.error('feedback-manage error:', e)
    return response(false, null, '操作失败，请稍后重试')
  }
}
