const cloud = require('wx-server-sdk')
const https = require('https')

// 从环境变量获取环境 ID
const ENV_ID = process.env.TENCENT_ENV_ID || 'postdiy-0g2mftaf6a0fc450'

cloud.init({
  env: ENV_ID
})

const db = cloud.database()

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
        message: '手机号不能为空'
      })
    }
  }

  try {
    const code = Math.random().toString().slice(-6)
    
    // 从环境变量获取配置
    const SPUG_TOKEN = process.env.SPUG_TOKEN || '1be7b6a139a242589a4e19fb5569b3ba'
    const SPUG_TEMPLATE_CODE = process.env.SPUG_TEMPLATE_CODE || '7ZIldfXjQk-WPl-8eUqGgw'
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
          expireTime,
          createTime: db.serverDate()
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
          message: '验证码发送成功'
        })
      }
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
