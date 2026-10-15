const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

const DEFAULT_QUOTA = 5

// 品牌分项奖励默认次数（与 get-app-config 保持一致；实际发放金额优先读 app_config.main）
const DEFAULT_BRAND_BONUS = { logo: 3, qrcode: 3, name: 1, promo: 3 }
// 分项 key → 用户资料字段（服务端完整性校验：字段没填好不允许领取）
const BRAND_ITEM_FIELD = {
  logo: 'logo',
  qrcode: 'qrcode',
  name: 'name',
  promo: 'promo'
}
const BRAND_ITEM_LABEL = {
  logo: '商家Logo',
  qrcode: '商家二维码',
  name: '商家名称',
  promo: '商家引流文案'
}

// 读取品牌分项奖励配置（读不到时回退默认值）
async function readBrandBonusConfig() {
  try {
    const res = await db.collection('app_config').doc('main').get()
    const bb = (res.data && res.data.brandBonus) || {}
    const numOr = (v, d) => {
      const n = Number(v)
      return Number.isFinite(n) && n >= 0 ? Math.floor(n) : d
    }
    return {
      logo: numOr(bb.logo, DEFAULT_BRAND_BONUS.logo),
      qrcode: numOr(bb.qrcode, DEFAULT_BRAND_BONUS.qrcode),
      name: numOr(bb.name, DEFAULT_BRAND_BONUS.name),
      promo: numOr(bb.promo, DEFAULT_BRAND_BONUS.promo)
    }
  } catch (e) {
    return { ...DEFAULT_BRAND_BONUS }
  }
}

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

  const { action, userId, amount, source, templateId, templateName, remark, item } = body

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
      case 'claimBrandBonus':
        return await claimBrandBonus(userId, item)
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

// 领取完善品牌信息分项奖励（item ∈ logo/qrcode/name/promo，每项终身限领一次）
// 防重标记：users.brandBonusItems.<item> = true（旧数据兼容：整体领取标记 brandBonusClaimed=true 时全拒）
// 奖励金额读 app_config.main.brandBonus（读不到回退默认 3/3/1/3）
async function claimBrandBonus(userId, item) {
  const label = BRAND_ITEM_LABEL[item]
  if (!label) {
    return response(false, '无效的奖励项')
  }
  const userData = await getUserData(userId)
  if (!userData) {
    return response(false, '用户不存在')
  }
  // 旧版整体领取过 → 所有分项都视为已领
  if (userData.brandBonusClaimed === true) {
    return response(false, '该奖励已领取过')
  }
  const items = userData.brandBonusItems || {}
  if (items[item] === true) {
    return response(false, '该奖励已领取过')
  }
  // 兼容历史：早期整体发放只写了日志没打标记，按领取日志补判一次（命中即打整体标记并拒绝）
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

  // 奖励金额（云端配置优先）
  const bonusConfig = await readBrandBonusConfig()
  const amount = bonusConfig[item]
  if (!amount || amount <= 0) {
    return response(false, '该奖励项未开放')
  }

  // 服务端完整性校验：对应用户资料字段需已填写
  // （logo/qrcode 看腾讯云 URL 或原始 URL；name/promo 看文本字段；字段由两端保存商家信息时写入 users 集合）
  const field = BRAND_ITEM_FIELD[item]
  let filled = false
  if (field === 'logo') filled = !!(userData.logoTencentUrl || userData.logoUrl)
  else if (field === 'qrcode') filled = !!(userData.qrcodeTencentUrl || userData.qrcodeUrl)
  else if (field === 'name') filled = !!String(userData.brandname || '').trim()
  else if (field === 'promo') filled = !!String(userData.promoText || '').trim()
  if (!filled) {
    return response(false, '该信息尚未完善，暂不能领取')
  }

  // 原子条件更新：仅当（旧整体标记 ≠ true 且 分项标记 ≠ true）时加次数并打分项标记
  const beforeQuota = userData.downloadQuota || 0
  const claimRes = await db
    .collection('users')
    .where({
      _id: userId,
      brandBonusClaimed: _.neq(true),
      [`brandBonusItems.${item}`]: _.neq(true)
    })
    .update({
      data: {
        downloadQuota: _.inc(amount),
        [`brandBonusItems.${item}`]: true,
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
    source: `brand_${item}`,
    remark: `完善品牌信息奖励-${label}`,
    createTime: db.serverDate()
  })
  return response(true, { downloadQuota: beforeQuota + amount, amount, item })
}
