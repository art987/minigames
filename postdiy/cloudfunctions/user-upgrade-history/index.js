const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

function ok(data, message) {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ success: true, message: message || '成功', data: data })
  }
}

function fail(message) {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ success: false, message: message })
  }
}

// 在 startDate 基础上增加 durationMonths 个月
function addMonths(date, durationMonths) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + durationMonths)
  return d
}

exports.main = async (event, context) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' }
  }

  // 解析请求体
  let requestBody = event
  if (event.body) {
    try {
      requestBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    } catch (e) {
      return fail('请求体格式错误')
    }
  }

  const userId = requestBody.userId
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return fail('用户ID不能为空')
  }

  try {
    // 1. 查询激活码升级记录（vip_vouchers 集合，usedBy = userId 且 used = true）
    let voucherRecords = []
    try {
      const voucherRes = await db
        .collection('vip_vouchers')
        .where({ usedBy: userId, used: true })
        .orderBy('usedAt', 'asc')
        .limit(100)
        .get()
      voucherRecords = (voucherRes.data || []).map(v => ({
        type: 'voucher',
        time: v.usedAt,
        code: v.code || '',
        duration: v.duration || 0,
        durationName: v.durationName || (v.duration ? v.duration + '个月' : ''),
        packageName: v.durationName || (v.duration ? v.duration + '个月VIP' : 'VIP套餐')
      }))
    } catch (e) {
      console.warn('查询 vip_vouchers 失败（集合可能未创建）:', e.message)
    }

    // 2. 查询支付升级记录（orders 集合，userId = userId 且 status = 1 已支付）
    let paymentRecords = []
    try {
      const orderRes = await db
        .collection('orders')
        .where({ userId: userId, status: 1 })
        .orderBy('payTime', 'asc')
        .limit(100)
        .get()
      paymentRecords = (orderRes.data || []).map(o => ({
        type: 'payment',
        time: o.payTime,
        outTradeNo: o.out_trade_no || '',
        money: o.money,
        duration: o.duration || 0,
        packageName: o.name || (o.duration ? o.duration + '个月VIP' : 'VIP套餐'),
        payType: o.type || ''
      }))
    } catch (e) {
      console.warn('查询 orders 失败（集合可能未创建）:', e.message)
    }

    // 3. 合并并按时间升序排列（从最早到最新，便于重放计算有效期）
    const records = voucherRecords.concat(paymentRecords)
    records.sort((a, b) => {
      const ta = a.time ? new Date(a.time).getTime() : 0
      const tb = b.time ? new Date(b.time).getTime() : 0
      return ta - tb
    })

    // 4. 重放计算每条记录的有效期区间
    //    规则（与 user-verify-voucher / payment-notify 一致）：
    //    - 若用户当前仍在 VIP 有效期内：本次升级的 validFrom = 当前 validUntil，validUntil = validFrom + duration
    //    - 若用户已过期或非 VIP：validFrom = 升级时间，validUntil = validFrom + duration
    let currentValidUntil = null
    records.forEach(r => {
      const upgradeTime = r.time ? new Date(r.time) : new Date()
      let validFrom
      if (currentValidUntil && new Date(currentValidUntil) > upgradeTime) {
        validFrom = new Date(currentValidUntil)
      } else {
        validFrom = new Date(upgradeTime)
      }
      const validUntil = addMonths(validFrom, r.duration || 0)
      r.validFrom = validFrom
      r.validUntil = validUntil
      currentValidUntil = validUntil
    })

    // 5. 按时间降序排列（最新的在前）用于展示
    records.sort((a, b) => {
      const ta = a.time ? new Date(a.time).getTime() : 0
      const tb = b.time ? new Date(b.time).getTime() : 0
      return tb - ta
    })

    return ok({ records: records, total: records.length })
  } catch (error) {
    console.error('获取升级记录失败:', error)
    return fail('获取升级记录失败: ' + error.message)
  }
}
