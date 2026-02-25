const SMSManager = require('./sms-manager')

exports.handler = async (event) => {
  console.log('收到短信发送请求:', {
    method: event.httpMethod,
    path: event.path,
    body: event.body
  })
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  try {
    const { phone, code } = JSON.parse(event.body)
    
    if (!phone || !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '手机号和验证码不能为空' })
      }
    }

    // 验证手机号格式
    const phoneRegex = /^\+86[0-9]{11}$/
    if (!phoneRegex.test(phone)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '手机号格式不正确，请使用+86开头' })
      }
    }

    // 验证验证码格式
    if (!/^[0-9]{6}$/.test(code)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '验证码必须是6位数字' })
      }
    }

    const smsManager = new SMSManager()
    const result = await smsManager.sendSMS(phone, code)

    if (result.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          provider: result.provider,
          message: '验证码发送成功',
          fallback: result.fallback || false
        })
      }
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: result.error || '短信发送失败',
          message: '请稍后重试'
        })
      }
    }

  } catch (error) {
    console.error('短信发送函数错误:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message,
        details: '请查看Netlify Functions日志获取详细信息'
      })
    }
  }
}