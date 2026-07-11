const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const ZPAY_CONFIG = {
  PID: '2026032819224310',
  PKEY: 'dUbS7RLclWErZSyH32n00fMi5CCvsIwb',
  CID: '14015',
  SUBMIT_URL: 'https://zpayz.cn/submit.php'
}

function generateOutTradeNo() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')
  const second = String(now.getSeconds()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `${year}${month}${day}${hour}${minute}${second}${random}`
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

function getDurationName(duration) {
  if (duration === 1) return 'VIP会员1个月'
  if (duration === 3) return 'VIP会员3个月'
  if (duration === 6) return 'VIP会员6个月'
  if (duration === 12) return 'VIP会员1年'
  if (duration === 24) return 'VIP会员2年'
  return `VIP会员${duration}个月`
}

exports.main = async (event, context) => {
  let userId, phone, money, duration, type, returnUrl, packageId
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
    phone = body.phone
    money = body.money
    duration = body.duration
    type = body.type
    returnUrl = body.returnUrl
    packageId = body.packageId
  } catch (error) {
    console.log('解析 body 失败:', error)
    userId = event.userId
    phone = event.phone
    money = event.money
    duration = event.duration
    type = event.type
    returnUrl = event.returnUrl
    packageId = event.packageId
  }
  
  console.log('payment-create-order 接收参数:', { userId, phone, money, duration, type, returnUrl, packageId })

  // 校验 userId 有效性：拒绝 "undefined"/"null" 等脏数据，从源头避免后续 doc("undefined").get() 报错
  const isValidUserId = userId &&
    userId !== 'undefined' &&
    userId !== 'null' &&
    typeof userId === 'string' &&
    userId.trim().length > 0

  if (!isValidUserId || !duration || !type) {
    console.error('payment-create-order 参数校验失败:', { userId, isValidUserId, money, duration, type })
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: false,
        message: '缺少必要参数或 userId 无效'
      })
    }
  }

  if (type !== 'alipay' && type !== 'wxpay') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: false,
        message: '支付方式无效'
      })
    }
  }

  try {
    // === 安全关键：从云端 vip_packages_config 集合查询真实价格 ===
    // 前端传的 money 仅作日志对比，不参与下单
    let realPrice = null
    let pkgDocId = packageId || ''
    let pkgTitle = ''
    try {
      let pkgData = null
      if (pkgDocId) {
        // 优先按 packageId 查
        try {
          const r = await db.collection('vip_packages_config').doc(pkgDocId).get()
          pkgData = r.data
        } catch (e) {
          // doc 不存在时降级到 duration 查询
          console.warn('按 packageId 查询套餐失败，降级到 duration 查询:', e.message)
        }
      }
      if (!pkgData && duration) {
        // 按 duration 查询（兼容旧前端不传 packageId 的情况）
        try {
          const r = await db
            .collection('vip_packages_config')
            .where({ duration: Number(duration), enabled: true })
            .limit(1)
            .get()
          if (r.data && r.data.length > 0) {
            pkgData = r.data[0]
            pkgDocId = pkgData._id
          }
        } catch (e) {
          // 集合可能不存在
          console.warn('按 duration 查询套餐失败:', e.message)
        }
      }

      if (!pkgData) {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          },
          body: JSON.stringify({
            success: false,
            message: `未找到时长为 ${duration} 个月的可售套餐`
          })
        }
      }

      // 校验套餐启用状态
      if (pkgData.enabled === false) {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          },
          body: JSON.stringify({
            success: false,
            message: '该套餐已下架，请刷新页面后重新选择'
          })
        }
      }

      realPrice = Number(pkgData.price)
      pkgTitle = pkgData.title || ''
      if (!pkgDocId) pkgDocId = pkgData._id

      // 价格被前端篡改时打印告警日志（不影响下单，按真实价格走）
      const clientMoney = Number(money)
      if (!isNaN(clientMoney) && Math.abs(clientMoney - realPrice) > 0.001) {
        console.warn('[安全告警] 前端传入价格与云端不符，已使用云端价格:', {
          userId,
          duration,
          clientMoney,
          realPrice,
          packageId: pkgDocId
        })
      }
    } catch (err) {
      console.error('查询 vip_packages_config 失败:', err)
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        body: JSON.stringify({
          success: false,
          message: '套餐价格校验失败，请稍后重试'
        })
      }
    }

    if (!realPrice || realPrice <= 0) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        body: JSON.stringify({
          success: false,
          message: '套餐价格异常'
        })
      }
    }

    // === 折上折：被推荐用户7日内享9折优惠 ===
    let originalPrice = realPrice
    let hasDiscount = false
    try {
      const userDoc = await db.collection('users').doc(userId).get()
      const userData = userDoc.data || {}
      if (userData.referrerUserId && userData.discountExpireAt) {
        const expireAt = new Date(userData.discountExpireAt)
        if (expireAt > new Date()) {
          // 9折 = ×0.9，保留两位小数
          realPrice = Math.round(realPrice * 0.9 * 100) / 100
          hasDiscount = true
          console.log('[折上折] 用户享有9折优惠:', {
            userId,
            originalPrice: originalPrice,
            discountPrice: realPrice,
            referrerUserId: userData.referrerUserId,
            expireAt: userData.discountExpireAt
          })
        } else {
          console.log('[折上折] 优惠已过期:', { userId, expireAt: userData.discountExpireAt })
        }
      }
    } catch (e) {
      console.warn('[折上折] 查询用户优惠信息失败，按原价下单:', e.message)
    }

    const outTradeNo = generateOutTradeNo()
    const name = pkgTitle || getDurationName(duration)

    // === 复用未支付订单逻辑 ===
    // 同 userId + 同 packageId（或同 duration）+ 同 type + status=0 + 5 分钟内
    // 命中则直接返回旧订单的 payUrl，避免短时间内重复创建同金额订单
    // 触发微信"您已在当前商户支付过一笔相同金额的订单"提示
    const PENDING_ORDER_MAX_AGE_MS = 5 * 60 * 1000
    const fiveMinAgo = new Date(Date.now() - PENDING_ORDER_MAX_AGE_MS)
    try {
      const reuseWhere = {
        userId: userId,
        status: 0,
        type: type,
        createTime: db.command.gte(fiveMinAgo)
      }
      if (pkgDocId) {
        reuseWhere.packageId = pkgDocId
      } else {
        reuseWhere.duration = Number(duration)
      }
      const reuseResult = await db.collection('orders').where(reuseWhere).limit(1).get()
      if (reuseResult.data && reuseResult.data.length > 0) {
        const oldOrder = reuseResult.data[0]
        console.log('[payment-create-order] 命中可复用未支付订单:', oldOrder.out_trade_no)
        // 用旧订单号重新生成 payUrl（returnUrl 可能变了）
        const oldBaseUrl = returnUrl || 'https://postdiy.peacelove.top/editor.html'
        const oldCleanReturnUrl = oldBaseUrl.split('?')[0]
        const reuseParams = {
          pid: ZPAY_CONFIG.PID,
          type: type,
          out_trade_no: oldOrder.out_trade_no,
          notify_url: 'https://api.peacelove.top/payment-notify',
          return_url: oldCleanReturnUrl,
          name: oldOrder.name || name,
          money: String(oldOrder.money),
          cid: ZPAY_CONFIG.CID,
          param: userId
        }
        const reuseSign = generateSign(reuseParams, ZPAY_CONFIG.PKEY)
        reuseParams.sign = reuseSign
        reuseParams.sign_type = 'MD5'
        const reuseQueryStr = Object.keys(reuseParams)
          .map(k => `${k}=${encodeURIComponent(reuseParams[k])}`)
          .join('&')
        const reusePayUrl = `${ZPAY_CONFIG.SUBMIT_URL}?${reuseQueryStr}`
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          },
          body: JSON.stringify({
            success: true,
            message: '复用未支付订单',
            data: {
              out_trade_no: oldOrder.out_trade_no,
              payUrl: reusePayUrl,
              money: oldOrder.money,
              reused: true
            }
          })
        }
      }
    } catch (reuseErr) {
      // 复用查询失败不影响主流程，继续走新建订单
      console.warn('[payment-create-order] 复用未支付订单查询失败，继续新建:', reuseErr.message)
    }

    const notifyUrl = 'https://api.peacelove.top/payment-notify'
    const baseUrl = returnUrl || 'https://postdiy.peacelove.top/editor.html'
    // zpay文档要求 return_url 和 notify_url 不支持带参数，使用纯净URL
    const cleanReturnUrl = baseUrl.split('?')[0]

    const params = {
      pid: ZPAY_CONFIG.PID,
      type: type,
      out_trade_no: outTradeNo,
      notify_url: notifyUrl,
      return_url: cleanReturnUrl,
      name: name,
      money: String(realPrice),
      cid: ZPAY_CONFIG.CID,
      param: userId
    }
    
    const sign = generateSign(params, ZPAY_CONFIG.PKEY)
    params.sign = sign
    params.sign_type = 'MD5'
    
    const queryString = Object.keys(params)
      .map(k => `${k}=${encodeURIComponent(params[k])}`)
      .join('&')

    const payUrl = `${ZPAY_CONFIG.SUBMIT_URL}?${queryString}`

    await db.collection('orders').add({
      data: {
        out_trade_no: outTradeNo,
        userId: userId,
        phone: phone || '',
        name: name,
        money: realPrice,
        originalPrice: hasDiscount ? originalPrice : null,
        hasDiscount: hasDiscount,
        duration: duration,
        type: type,
        status: 0,
        packageId: pkgDocId || '',
        clientMoney: money !== undefined ? Number(money) : null, // 保留前端传值用于审计
        createTime: db.serverDate(),
        payTime: null,
        trade_no: '',
        notifyData: null
      }
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: true,
        message: '订单创建成功',
        data: {
          out_trade_no: outTradeNo,
          payUrl: payUrl,
          money: realPrice,
          originalPrice: hasDiscount ? originalPrice : realPrice,
          hasDiscount: hasDiscount
        }
      })
    }
  } catch (error) {
    console.error('创建订单失败:', error)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: false,
        message: '创建订单失败: ' + error.message
      })
    }
  }
}
