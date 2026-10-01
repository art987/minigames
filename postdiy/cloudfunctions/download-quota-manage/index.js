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
    // 集合不存在时自动创建后重试一次
    const isCollectionNotExist =
      e.errCode === 'DATABASE_COLLECTION_NOT_EXIST' ||
      (e.message && (e.message.includes('collection not exists') || e.message.includes('DATABASE_COLLECTION_NOT_EXIST')))
    if (isCollectionNotExist) {
      try {
        await db.createCollection('download_quota_logs')
        await db.collection('download_quota_logs').add({ data: logData })
        return
      } catch (createErr) {
        console.error('创建 download_quota_logs 集合失败:', createErr)
      }
    }
    console.error('写入下载次数日志失败（不影响主流程）:', e)
  }
}

// 获取用户数据，不存在时返回 null
// （用 where 查询而非 doc().get()：后者对不存在的文档会直接抛异常，
//   只有真实存在的用户才会走到后续逻辑，网络异常仍向上抛由外层兜底）
async function getUserData(userId) {
  const res = await db.collection('users').where({ _id: userId }).limit(1).get()
  return (res.data && res.data[0]) || null
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

  // 完善品牌信息奖励：云端严格防重，同一账号（无论小程序/网页/换设备/清缓存）终身只发一次
  if (source === 'brand_info_completed') {
    const userData = await getUserData(userId)
    if (!userData) {
      return response(false, '用户不存在')
    }
    // 已领取过（users 文档标记）→ 直接拒绝
    if (userData.brandBonusClaimed === true) {
      return response(false, '该奖励已领取过')
    }
    // 兼容历史：网页端早期发放只写了日志没打标记，这里按领取日志补判一次
    try {
      const logRes = await db
        .collection('download_quota_logs')
        .where({ userId, type: 'add', source: 'brand_info_completed' })
        .limit(1)
        .get()
      if (logRes.data && logRes.data.length > 0) {
        await db.collection('users').doc(userId).update({
          data: { brandBonusClaimed: true, updateTime: db.serverDate() }
        })
        return response(false, '该奖励已领取过')
      }
    } catch (e) {
      // 日志集合不存在/查询失败时按未领取继续（不阻断首次发放）
      console.error('查询品牌奖励历史日志失败（按未领取处理）:', e)
    }
    // 原子条件更新：仅当 brandBonusClaimed ≠ true 时加次数并打标记（并发请求只会有一个成功）
    const beforeQuota = userData.downloadQuota || 0
    const claimRes = await db
      .collection('users')
      .where({ _id: userId, brandBonusClaimed: _.neq(true) })
      .update({
        data: {
          downloadQuota: _.inc(amount),
          brandBonusClaimed: true,
          updateTime: db.serverDate()
        }
      })
    if (!claimRes.stats || claimRes.stats.updated === 0) {
      return response(false, '该奖励已领取过')
    }
    writeLog({
      userId,
      changeAmount: amount,
      beforeQuota,
      afterQuota: beforeQuota + amount,
      type: 'add',
      source,
      remark: remark || '完善品牌信息奖励',
      createTime: db.serverDate()
    })
    return response(true, { downloadQuota: beforeQuota + amount })
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
