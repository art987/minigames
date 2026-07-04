const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 与 payment-create-order / payment-notify 保持一致的 zpay 配置
const ZPAY_CONFIG = {
  PID: '2026032819224310',
  PKEY: 'dUbS7RLclWErZSyH32n00fMi5CCvsIwb',
  ORDER_QUERY_URL: 'https://zpayz.cn/api.php'
}

function generateMD5(str) {
  const crypto = require('crypto')
  return crypto.createHash('md5').update(str).digest('hex')
}

function generateSign(params, key) {
  const sortedKeys = Object.keys(params).sort()
  const signStr = sortedKeys
    .filter(k => params[k] !== '' && params[k] !== null && params[k] !== undefined && k !== 'sign' && k !== 'sign_type')
    .map(k => `${k}=${params[k]}`)
    .join('&')
  return generateMD5(signStr + key)
}

function getDaysByDuration(duration) {
  return duration * 30
}

function jsonResp(body, statusCode = 200) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify(body)
  }
}

// 调用 zpay 订单查询接口。
// zpay 文档：act=order&pid=...&key=...&out_trade_no=...
// 注意：商户 key 只能在云函数侧使用，绝不能返回给前端。
async function queryZpayOrder(outTradeNo) {
  const params = {
    act: 'order',
    pid: ZPAY_CONFIG.PID,
    key: ZPAY_CONFIG.PKEY,
    out_trade_no: outTradeNo
  }
  const query = Object.keys(params)
    .map(k => `${k}=${encodeURIComponent(params[k])}`)
    .join('&')
  const url = `${ZPAY_CONFIG.ORDER_QUERY_URL}?${query}`
  console.log('[payment-order-status] 查询 zpay:', url.replace(ZPAY_CONFIG.PKEY, '***'))

  const https = require('https')
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        console.log('[payment-order-status] zpay 原始返回:', data)
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          console.warn('[payment-order-status] zpay 返回非 JSON:', data)
          resolve(null)
        }
      })
    })
    req.on('error', (e) => {
      console.error('[payment-order-status] 查询 zpay 网络错误:', e.message)
      resolve(null)
    })
    req.setTimeout(8000, () => {
      console.warn('[payment-order-status] 查询 zpay 超时')
      req.destroy()
      resolve(null)
    })
  })
}

// 与 payment-notify 一致的补单逻辑：开通 VIP + 标记订单
// 返回值: { fulfilled: boolean, reason: string }
async function fulfillOrder(order, zpayResult) {
  // 处理历史脏数据：userId 可能为 "undefined" / "null" 字符串
  const rawUserId = order.userId
  const isValidUserId = rawUserId &&
    rawUserId !== 'undefined' &&
    rawUserId !== 'null' &&
    typeof rawUserId === 'string' &&
    rawUserId.length > 0

  // 先把订单标记为已支付（无论能否开通 VIP，订单本身已支付是事实）
  try {
    await db.collection('orders').doc(order._id).update({
      data: {
        status: 1,
        trade_no: (zpayResult && zpayResult.trade_no) || order.trade_no || '',
        payTime: db.serverDate(),
        notifyData: _.set({
          source: 'payment-order-status',
          money: (zpayResult && zpayResult.money) || String(order.money),
          name: (zpayResult && zpayResult.name) || order.name || '',
          out_trade_no: order.out_trade_no,
          trade_no: (zpayResult && zpayResult.trade_no) || '',
          trade_status: 'TRADE_SUCCESS',
          type: (zpayResult && zpayResult.type) || order.type || '',
          pid: ZPAY_CONFIG.PID,
          param: rawUserId || ''
        })
      }
    })
    console.log('[payment-order-status] 订单已标记为已支付:', order.out_trade_no)
  } catch (e) {
    console.error('[payment-order-status] 标记订单已支付失败:', e.message)
  }

  // userId 无效：无法开通 VIP，但订单已支付，需返回 paid=true 让前端兜底查 VIP
  if (!isValidUserId) {
    console.error('[payment-order-status] 订单 userId 无效，无法开通 VIP，但订单已支付:', {
      out_trade_no: order.out_trade_no,
      userId: rawUserId
    })
    return { fulfilled: false, reason: 'INVALID_USERID' }
  }

  try {
    const userRes = await db.collection('users').doc(rawUserId).get()
    if (!userRes.data) {
      console.error('[payment-order-status] 用户不存在:', rawUserId)
      return { fulfilled: false, reason: 'USER_NOT_FOUND' }
    }

    const user = userRes.data
    const now = new Date()
    let currentExpireTime = user.vipValidUntil ? new Date(user.vipValidUntil) : (user.vipExpireTime ? new Date(user.vipExpireTime) : now)
    if (currentExpireTime < now) {
      currentExpireTime = now
    }

    const days = getDaysByDuration(order.duration)
    const newExpireTime = new Date(currentExpireTime)
    newExpireTime.setDate(newExpireTime.getDate() + days)

    await db.collection('users').doc(rawUserId).update({
      data: {
        vipValidUntil: newExpireTime,
        isVip: true,
        updateTime: db.serverDate()
      }
    })
    console.log('[payment-order-status] 补单开通 VIP:', { userId: rawUserId, days, newExpireTime })
    return { fulfilled: true, reason: '' }
  } catch (e) {
    console.error('[payment-order-status] 开通 VIP 异常:', e.message)
    return { fulfilled: false, reason: 'VIP_UPDATE_FAILED' }
  }
}

exports.main = async (event, context) => {
  let outTradeNo
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    outTradeNo = body.outTradeNo
  } catch (error) {
    console.log('[payment-order-status] 解析 body 失败:', error)
    outTradeNo = event.outTradeNo
  }

  console.log('[payment-order-status] 查询订单状态:', outTradeNo)

  if (!outTradeNo) {
    return jsonResp({ success: false, message: '订单号不能为空' })
  }

  try {
    const orderRes = await db.collection('orders')
      .where({ out_trade_no: outTradeNo })
      .get()

    if (orderRes.data.length === 0) {
      console.warn('[payment-order-status] 订单不存在:', outTradeNo)
      return jsonResp({ success: false, message: '订单不存在', data: { paid: false } })
    }

    const order = orderRes.data[0]
    console.log('[payment-order-status] 本地订单状态:', { out_trade_no: order.out_trade_no, status: order.status })

    // 已支付：直接返回成功
    if (order.status === 1) {
      console.log('[payment-order-status] 订单已支付:', outTradeNo)
      return jsonResp({
        success: true,
        message: '订单已支付',
        data: {
          paid: true,
          outTradeNo: order.out_trade_no,
          tradeNo: order.trade_no || '',
          tradeStatus: 'TRADE_SUCCESS',
          money: order.money,
          duration: order.duration
        }
      })
    }

    // 未支付：主动查询 zpay
    console.log('[payment-order-status] 本地未支付，查询 zpay...')
    const zpayResult = await queryZpayOrder(outTradeNo)

    if (!zpayResult) {
      console.warn('[payment-order-status] zpay 查询失败/无返回')
      return jsonResp({
        success: true,
        message: '查询超时，订单暂未确认',
        data: { paid: false, outTradeNo: order.out_trade_no, tradeStatus: 'UNKNOWN' }
      })
    }

    // zpay 订单查询 API 返回 status (Int)：1 为支付成功，0 为未支付
    // 注意：查询 API 用 status 字段，不是 notify 回调里的 trade_status 字段
    const zpayPaid = (zpayResult.code === 1 || zpayResult.code === '1') &&
                     (zpayResult.status === 1 || zpayResult.status === '1')

    if (!zpayPaid) {
      console.log('[payment-order-status] zpay 显示未支付:', zpayResult)
      return jsonResp({
        success: true,
        message: '订单尚未支付',
        data: {
          paid: false,
          outTradeNo: order.out_trade_no,
          tradeStatus: 'NOT_PAID'
        }
      })
    }

    // zpay 确认已支付，执行补单（开通 VIP + 标记订单）
    console.log('[payment-order-status] zpay 确认已支付，执行补单:', outTradeNo)
    const fulfillResult = await fulfillOrder(order, zpayResult)

    // 关键：只要 zpay 确认已支付，对前端一律返回 paid=true
    // 即使补单开通 VIP 失败（如 userId 异常），前端也会 fallback 到 VIP 状态查询
    if (fulfillResult.fulfilled) {
      return jsonResp({
        success: true,
        message: '订单已支付',
        data: {
          paid: true,
          outTradeNo: order.out_trade_no,
          tradeNo: zpayResult.trade_no || '',
          tradeStatus: 'TRADE_SUCCESS',
          money: order.money,
          duration: order.duration
        }
      })
    }

    // 补单未完成但订单已支付，仍返回 paid=true，并附加警告便于排查
    console.warn('[payment-order-status] 订单已支付但补单未完成:', {
      outTradeNo: order.out_trade_no,
      reason: fulfillResult.reason
    })
    return jsonResp({
      success: true,
      message: '订单已支付（VIP 开通可能延迟，请稍后查询）',
      data: {
        paid: true,
        outTradeNo: order.out_trade_no,
        tradeNo: zpayResult.trade_no || '',
        tradeStatus: 'TRADE_SUCCESS',
        money: order.money,
        duration: order.duration,
        fulfillWarning: fulfillResult.reason
      }
    })
  } catch (error) {
    console.error('[payment-order-status] 异常:', error)
    return jsonResp({ success: false, message: '查询订单状态失败: ' + error.message })
  }
}
