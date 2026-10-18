const cloud = require('wx-server-sdk')
const https = require('https')

// 从环境变量获取环境 ID
const ENV_ID = process.env.TENCENT_ENV_ID || 'postdiy-0g2mftaf6a0fc450'

cloud.init({
  env: ENV_ID
})

const db = cloud.database()
const _ = db.command

// 统一响应格式（HTTP 网关 + callFunction 共用）
function smsResponse(success, message) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify({ success, message })
  }
}

// ===== 防刷参数（常规防护：频率 + 手机号日限 + IP 日限） =====
const PHONE_INTERVAL_MS = 60 * 1000 // 同手机号最短间隔 60 秒
const PHONE_DAILY_LIMIT = 5         // 同手机号每日上限
const IP_DAILY_LIMIT = 10           // 同 IP 每日上限（防止批量刷取）

// 获取客户端真实 IP：callFunction 走 getWXContext().CLIENTIP；HTTP 网关走 x-forwarded-for/x-real-ip
function getClientIp(event) {
  try {
    const wxCtx = cloud.getWXContext()
    if (wxCtx && wxCtx.CLIENTIP) return wxCtx.CLIENTIP
  } catch (e) { /* 忽略 */ }
  const h = (event && event.headers) || {}
  const raw = h['x-forwarded-for'] || h['X-Forwarded-For'] || h['x-real-ip'] || h['X-Real-IP'] || ''
  return String(raw).split(',')[0].trim()
}

// 防刷校验：全部通过返回 null，否则返回拒绝响应
async function antiAbuseGuard(phone, clientIp) {
  const dayStart = new Date()
  dayStart.setHours(0, 0, 0, 0)

  // 1) 同手机号 60 秒间隔
  const last = await db.collection('sms_codes')
    .where({ phone })
    .orderBy('createTime', 'desc')
    .limit(1)
    .get()
  const lastDoc = last.data && last.data[0]
  if (lastDoc) {
    const lastMs = new Date(lastDoc.createTime).getTime()
    if (Date.now() - lastMs < PHONE_INTERVAL_MS) {
      return smsResponse(false, '发送过于频繁，请稍后再试')
    }
  }

  // 2) 同手机号每日上限
  const phoneCnt = await db.collection('sms_codes')
    .where({ phone, createTime: _.gte(dayStart) })
    .count()
  if (phoneCnt.total >= PHONE_DAILY_LIMIT) {
    return smsResponse(false, '今日验证码获取次数已达上限，请明天再试')
  }

  // 3) 同 IP 每日上限（IP 获取失败时跳过该项）
  if (clientIp) {
    const ipCnt = await db.collection('sms_codes')
      .where({ ip: clientIp, createTime: _.gte(dayStart) })
      .count()
    if (ipCnt.total >= IP_DAILY_LIMIT) {
      return smsResponse(false, '操作过于频繁，请明天再试')
    }
  }
  return null
}

// 发送 HTTPS 请求的工具函数
function httpPost(options, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data)
    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
    
    const req = https.request(options, (res) => {
      let responseData = ''
      res.on('data', (chunk) => {
        responseData += chunk
      })
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData)
          resolve({
            statusCode: res.statusCode,
            data: result
          })
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          })
        }
      })
    })
    
    req.on('error', (e) => {
      reject(e)
    })
    
    req.write(body)
    req.end()
  })
}

exports.main = async (event, context) => {
  let phone
  try {
    // 解析 body 中的 JSON 数据
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    phone = body.phone
  } catch (error) {
    console.log('解析 body 失败:', error)
    phone = event.phone
  }
  
  console.log('接收到的 event:', event)
  console.log('手机号:', phone)
  console.log('手机号类型:', typeof phone)
  console.log('手机号是否为空:', !phone)
  
  if (!phone) {
    return smsResponse(false, '手机号不能为空')
  }

  try {
    // ===== 防刷校验（同手机号间隔/手机号日限/IP 日限） =====
    const clientIp = getClientIp(event)
    const blocked = await antiAbuseGuard(phone, clientIp)
    if (blocked) {
      console.log('防刷拦截:', { phone, clientIp })
      return blocked
    }

    const code = Math.random().toString().slice(-4)
    
    // 从环境变量获取配置
    const SPUG_TOKEN = process.env.SPUG_TOKEN
    const SPUG_TEMPLATE_CODE = process.env.SPUG_TEMPLATE_CODE
    const SPUG_SEND_URL = `https://push.spug.cc/sms/${SPUG_TEMPLATE_CODE}`
    const SPUG_QUERY_URL = `https://push.spug.cc/request/query`
    
    // 使用 Node.js 的 https 模块发送短信
    const sendRes = await httpPost({
      hostname: 'push.spug.cc',
      path: `/sms/${SPUG_TEMPLATE_CODE}`,
      method: 'POST'
    }, {
      name: '推送助手',
      code: code,
      to: phone
    })
    
    console.log('发送短信响应:', sendRes)
    
    if (sendRes.statusCode === 200) {
      // 保存验证码到数据库
      const expireTime = new Date()
      expireTime.setMinutes(expireTime.getMinutes() + 5)
      
      await db.collection('sms_codes').add({
        data: {
          phone,
          code,
          ip: clientIp || '',
          expireTime,
          createTime: db.serverDate()
        }
      })

      return smsResponse(true, '验证码发送成功')
    } else {
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
          message: '验证码发送失败'
        })
      }
    }
  } catch (error) {
    console.error('发送短信失败:', error)
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
        message: '发送失败，请稍后重试'
      })
    }
  }
}
