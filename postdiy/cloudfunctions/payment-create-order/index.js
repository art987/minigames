const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const ZPAY_CONFIG = {
  PID: '2026032819224310',
  PKEY: 'dUbS7RLclWErZSyH32n00fMi5CCvsIwb',
  SUBMIT_URL: 'https://zpayz.cn/submit.php',
  MAPI_URL: 'https://zpayz.cn/mapi.php'
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
    // zpay文档要求 return_url 和 notify_url 不支持带参数，先传纯净URL
    const cleanReturnUrl = baseUrl
    
    const params = {
      pid: ZPAY_CONFIG.PID,
      type: type,
      out_trade_no: outTradeNo,
      notify_url: notifyUrl,
      return_url: cleanReturnUrl,
      name: name,
      money: String(money),
      param: userId
    }
    
    const sign = generateSign(params, ZPAY_CONFIG.PKEY)
    params.sign = sign
    params.sign_type = 'MD5'
    
    // 方式1：页面跳转链接（submit.php），浏览器用
    const queryString = Object.keys(params)
      .map(k => `${k}=${encodeURIComponent(params[k])}`)
      .join('&')
    const payUrl = `${ZPAY_CONFIG.SUBMIT_URL}?${queryString}`
    
    // 方式2：API接口获取支付直链（mapi.php），WebView用
    let payUrlDirect = ''
    try {
      const mapiParams = {
        pid: ZPAY_CONFIG.PID,
        type: type,
        out_trade_no: outTradeNo,
        notify_url: notifyUrl,
        return_url: cleanReturnUrl,
        name: name,
        money: String(money),
        clientip: '127.0.0.1',
        device: 'mobile',
        param: userId
      }
      const mapiSign = generateSign(mapiParams, ZPAY_CONFIG.PKEY)
      mapiParams.sign = mapiSign
      mapiParams.sign_type = 'MD5'
      
      const formBody = Object.keys(mapiParams)
        .map(k => `${k}=${encodeURIComponent(mapiParams[k])}`)
        .join('&')
      
      const http = require('http')
      const https = require('https')
      const mapiResult = await new Promise((resolve, reject) => {
        const url = new URL(ZPAY_CONFIG.MAPI_URL)
        const options = {
          hostname: url.hostname,
          path: url.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(formBody)
          }
        }
        const req = https.request(options, (res) => {
          let data = ''
          res.on('data', chunk => { data += chunk })
          res.on('end', () => {
            try {
              resolve(JSON.parse(data))
            } catch (e) {
              resolve({ code: -1, msg: '解析响应失败: ' + data })
            }
          })
        })
        req.on('error', (e) => {
          resolve({ code: -1, msg: '请求失败: ' + e.message })
        })
        req.write(formBody)
        req.end()
      })
      
      console.log('mapi返回:', JSON.stringify(mapiResult))
      if (mapiResult.code === 1) {
        payUrlDirect = mapiResult.payurl || mapiResult.qrcode || ''
      }
    } catch (mapiErr) {
      console.error('mapi调用失败（不影响主流程）:', mapiErr)
    }
    
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
          payUrl: payUrl,
          payUrlDirect: payUrlDirect
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
