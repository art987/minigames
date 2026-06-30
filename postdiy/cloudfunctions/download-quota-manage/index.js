const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

const DEFAULT_QUOTA = 5

// CORS 响应头
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

// 写日志（非阻塞，失败不影响主流程）
async function writeLog(logData) {
  try {
    await db.collection('download_quota_logs').add({ data: logData })
  } catch (e) {
    console.error('写入下载次数日志失败（不影响主流程）:', e)
  }
}

// 获取用户数据，不存在时返回 null
async function getUserData(userId) {
  try {
    const userRes = await db.collection('users').doc(userId).get()
    return userRes.data || null
  } catch (e) {
    if (e.errCode === 'DATABASE_DOCUMENT_NOT_EXIST') {
      return null
    }
    throw e
  }
}

// 确保用户有 downloadQuota 字段，没有则初始化
async function ensureQuota(userId) {
  const userData = await getUserData(userId)
  if (!userData) return null

  if (userData.downloadQuota === undefined || userData.downloadQuota === null) {
    await db.collection('users').doc(userId).update({
      data: {
        downloadQuota: DEFAULT_QUOTA,
        updateTime: db.serverDate()
      }
    })
    // 记录日志（非阻塞）
    writeLog({
      userId,
      changeAmount: DEFAULT_QUOTA,
      beforeQuota: 0,
      afterQuota: DEFAULT_QUOTA,
      type: 'grant',
      source: 'new_user',
      remark: '新用户注册赠送',
      createTime: db.serverDate()
    })
    return DEFAULT_QUOTA
  }
  return userData.downloadQuota
}

exports.main = async (event, context) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  let body
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  } catch (e) {
    return response(false, '参数解析失败')
  }

  const { action, userId, amount, source, templateId, templateName, remark } = body

  if (!userId) {
    return response(false, '用户ID不能为空')
  }

  try {
    switch (action) {
      case 'init':
        return await initQuota(userId)
      case 'get':
        return await getQuota(userId)
      case 'deduct':
        return await deductQuota(userId, templateId, templateName)
      case 'add':
        return await addQuota(userId, amount, source, remark)
      default:
        return response(false, '未知的操作类型')
    }
  } catch (error) {
    console.error('download-quota-manage 错误:', error)
    return response(false, '操作失败，请稍后重试')
  }
}

// 初始化用户下载额度
async function initQuota(userId) {
  const quota = await ensureQuota(userId)
  if (quota === null) {
    return response(false, '用户不存在')
  }
  return response(true, { downloadQuota: quota })
}

// 查询用户剩余下载次数
async function getQuota(userId) {
  const quota = await ensureQuota(userId)
  if (quota === null) {
    return response(false, '用户不存在')
  }
  return response(true, { downloadQuota: quota })
}

// 扣减下载次数（每次下载海报时调用）
async function deductQuota(userId, templateId, templateName) {
  const quota = await ensureQuota(userId)
  if (quota === null) {
    return response(false, '用户不存在')
  }

  if (quota <= 0) {
    return response(false, '下载次数不足，请购买或获取更多次数')
  }

  const newQuota = quota - 1

  await db.collection('users').doc(userId).update({
    data: {
      downloadQuota: newQuota,
      updateTime: db.serverDate()
    }
  })

  // 记录日志（非阻塞）
  writeLog({
    userId,
    changeAmount: -1,
    beforeQuota: quota,
    afterQuota: newQuota,
    type: 'deduct',
    source: 'download',
    templateId: templateId || '',
    templateName: templateName || '',
    remark: '下载海报',
    createTime: db.serverDate()
  })

  return response(true, { downloadQuota: newQuota })
}

// 增加下载次数（购买/赠送/抽奖等）
async function addQuota(userId, amount, source, remark) {
  if (!amount || amount <= 0) {
    return response(false, '增加次数必须大于0')
  }

  const validSources = ['purchase', 'gift', 'lottery', 'admin', 'brand_info_completed', 'other']
  if (!validSources.includes(source)) {
    return response(false, '无效的来源类型')
  }

  const currentQuota = await ensureQuota(userId)
  if (currentQuota === null) {
    return response(false, '用户不存在')
  }

  const newQuota = currentQuota + amount

  await db.collection('users').doc(userId).update({
    data: {
      downloadQuota: newQuota,
      updateTime: db.serverDate()
    }
  })

  // 记录日志（非阻塞）
  writeLog({
    userId,
    changeAmount: amount,
    beforeQuota: currentQuota,
    afterQuota: newQuota,
    type: 'add',
    source,
    remark: remark || '',
    createTime: db.serverDate()
  })

  return response(true, { downloadQuota: newQuota })
}
