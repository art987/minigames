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
  let userId, phone, money, duration, type, returnUrl
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
    phone = body.phone
    money = body.money
    duration = body.duration
    type = body.type
    returnUrl = body.returnUrl
  } catch (error) {
    console.log('解析 body 失败:', error)
    userId = event.userId
    phone = event.phone
    money = event.money
    duration = event.duration
    type = event.type
    returnUrl = event.returnUrl
  }
  
  console.log('payment-create-order 接收参数:', { userId, phone, money, duration, type, returnUrl })
  
  if (!userId || !money || !duration || !type) {
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
        message: '缺少必要参数'
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
    const outTradeNo = generateOutTradeNo()
    const name = getDurationName(duration)
    
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
      money: String(money),
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
        money: parseFloat(money),
        duration: duration,
        type: type,
        status: 0,
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
          payUrl: payUrl
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
