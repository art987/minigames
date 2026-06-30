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

exports.main = async (event, context) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  let body
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  } catch (e) {
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ success: false, message: '参数解析失败' })
    }
  }

  const { userId, page = 1, pageSize = 20 } = body

  if (!userId) {
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ success: false, message: '用户ID不能为空' })
    }
  }

  try {
    const skip = (page - 1) * pageSize

    const [countRes, logsRes] = await Promise.all([
      db.collection('download_quota_logs')
        .where({ userId })
        .count(),
      db.collection('download_quota_logs')
        .where({ userId })
        .orderBy('createTime', 'desc')
        .skip(skip)
        .limit(pageSize)
        .get()
    ])

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        success: true,
        data: {
          total: countRes.total,
          page,
          pageSize,
          logs: logsRes.data
        }
      })
    }
  } catch (error) {
    console.error('查询下载次数记录失败:', error)
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ success: false, message: '查询失败，请稍后重试' })
    }
  }
}
