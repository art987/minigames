const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

const ZPAY_CONFIG = {
  PKEY: 'dUbS7RLclWErZSyH32n00fMi5CCvsIwb'
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

function createResponse(body, statusCode = 200) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: body
  }
}

exports.main = async (event, context) => {
  console.log('[payment-notify] 收到支付回调 event:', JSON.stringify(event))
  console.log('[payment-notify] event.keys:', Object.keys(event))

  let params = {}

  if (event.body) {
    if (typeof event.body === 'string') {
      if (event.body.startsWith('{')) {
        try {
          params = JSON.parse(event.body)
          console.log('[payment-notify] JSON body解析成功:', params)
        } catch (e) {
          console.log('[payment-notify] JSON解析失败，尝试form-urlencoded')
        }
      }
      if (Object.keys(params).length === 0) {
        const pairs = event.body.split('&')
        for (const pair of pairs) {
          const [key, value] = pair.split('=')
          if (key) {
            params[decodeURIComponent(key)] = decodeURIComponent(value || '')
          }
        }
        console.log('[payment-notify] form-urlencoded解析成功:', params)
      }
    } else if (typeof event.body === 'object') {
      params = event.body
      console.log('[payment-notify] body是对象:', params)
    }
  }

  if (event.queryStringParameters && Object.keys(event.queryStringParameters).length > 0) {
    params = { ...params, ...event.queryStringParameters }
    console.log('[payment-notify] 合并queryStringParameters:', event.queryStringParameters)
  }

  for (const key in event) {
    if (['pid', 'trade_no', 'out_trade_no', 'type', 'name', 'money', 'trade_status', 'param', 'sign', 'sign_type'].includes(key)) {
      if (event[key] !== undefined) {
        params[key] = event[key]
      }
    }
  }

  console.log('[payment-notify] 最终解析参数:', JSON.stringify(params))

  const { pid, trade_no, out_trade_no, type, name, money, trade_status, param, sign } = params

  if (!out_trade_no || !trade_status) {
    console.error('[payment-notify] 缺少必要参数')
    return createResponse('fail: 缺少必要参数')
  }

  const calculatedSign = generateSign(params, ZPAY_CONFIG.PKEY)
  console.log('[payment-notify] 签名对比:', { calculatedSign, sign })

  if (sign && calculatedSign !== sign) {
    console.error('[payment-notify] 签名验证失败', { calculatedSign, sign })
    return createResponse('fail: 签名验证失败')
  }

  if (trade_status !== 'TRADE_SUCCESS') {
    console.log('[payment-notify] 交易状态非成功:', trade_status)
    return createResponse('success')
  }

  try {
    const orderRes = await db.collection('orders')
      .where({
        out_trade_no: out_trade_no
      })
      .get()

    if (orderRes.data.length === 0) {
      console.error('[payment-notify] 订单不存在:', out_trade_no)
      return createResponse('fail: 订单不存在')
    }

    const order = orderRes.data[0]

    if (order.status === 1) {
      console.log('[payment-notify] 订单已处理:', out_trade_no)
      return createResponse('success')
    }

    const orderMoney = parseFloat(order.money)
    const callbackMoney = parseFloat(money)
    if (Math.abs(orderMoney - callbackMoney) > 0.01) {
      console.error('[payment-notify] 金额不一致', { orderMoney, callbackMoney })
      return createResponse('fail: 金额不一致')
    }

    // 优先使用订单里存储的 userId（最可靠）。
    // zpay 回调里的 param 字段在某些情况下会是字符串 "undefined"（创建订单时 userId 为空被转成字符串），
    // 这种情况下绝对不能用作 userId，否则会触发 doc("undefined").get() 报错。
    const paramUserId = (param && param !== 'undefined' && param !== 'null') ? param : ''
    const rawOrderUserId = order.userId
    // 校验 order.userId 是否为有效字符串（排除 "undefined"/"null" 等脏数据）
    const isValidOrderUserId = rawOrderUserId &&
      rawOrderUserId !== 'undefined' &&
      rawOrderUserId !== 'null' &&
      typeof rawOrderUserId === 'string' &&
      rawOrderUserId.length > 0
    const userId = isValidOrderUserId ? rawOrderUserId : paramUserId

    console.log('[payment-notify] 解析 userId:', {
      paramUserId, orderUserId: rawOrderUserId, isValidOrderUserId, finalUserId: userId
    })

    // 无论能否开通 VIP，先把订单标记为已支付（订单已支付是事实）
    try {
      await db.collection('orders').doc(order._id).update({
        data: {
          status: 1,
          trade_no: trade_no || '',
          payTime: db.serverDate(),
          notifyData: _.set({
            money: params.money || '',
            name: params.name || '',
            out_trade_no: params.out_trade_no || '',
            trade_no: params.trade_no || '',
            trade_status: params.trade_status || '',
            type: params.type || '',
            pid: params.pid || '',
            sign: params.sign || '',
            sign_type: params.sign_type || '',
            param: params.param || ''
          })
        }
      })
      console.log('[payment-notify] 订单已标记为已支付:', out_trade_no)
    } catch (e) {
      console.error('[payment-notify] 标记订单已支付失败:', e.message)
    }

    if (!userId) {
      console.error('[payment-notify] 无法确定 userId，订单已标记已支付但无法开通 VIP:', out_trade_no)
      // 订单已支付，返回 success 避免 zpay 重试，VIP 开通留给 payment-order-status 补单
      return createResponse('success')
    }

    const userRes = await db.collection('users').doc(userId).get()
    if (!userRes.data) {
      console.error('[payment-notify] 用户不存在:', userId)
      // 订单已支付，返回 success 避免 zpay 重试
      return createResponse('success')
    }

    const user = userRes.data
    const now = new Date()
    let currentExpireTime = user.vipExpireTime ? new Date(user.vipExpireTime) : now
    if (currentExpireTime < now) {
      currentExpireTime = now
    }

    const days = getDaysByDuration(order.duration)
    const newExpireTime = new Date(currentExpireTime)
    newExpireTime.setDate(newExpireTime.getDate() + days)

    await db.collection('users').doc(userId).update({
      data: {
        vipExpireTime: newExpireTime,
        isVip: true,
        updateTime: db.serverDate()
      }
    })
    console.log('[payment-notify] 开通 VIP 成功:', { userId, days, newExpireTime })

    console.log('[payment-notify] 订单处理成功:', out_trade_no, '用户VIP延长', days, '天')
    console.log('[payment-notify] 返回 success')

    return createResponse('success')
  } catch (error) {
    console.error('[payment-notify] 处理支付回调失败:', error)
    return createResponse('fail: ' + error.message)
  }
}
