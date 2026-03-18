const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  let phone, code
  try {
    // 解析 body 中的 JSON 数据
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    phone = body.phone
    code = body.code
  } catch (error) {
    console.log('解析 body 失败:', error)
    phone = event.phone
    code = event.code
  }
  
  console.log('接收到的 event:', event)
  console.log('手机号:', phone)
  console.log('验证码:', code)
  
  if (!phone || !code) {
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
        message: '手机号和验证码不能为空'
      })
    }
  }

  try {
    const now = new Date()
    const smsRes = await db.collection('sms_codes')
      .where({
        phone,
        code,
        expireTime: _.gt(now)
      })
      .get()

    if (smsRes.data.length === 0) {
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
          message: '验证码无效或已过期'
        })
      }
    }

    const userRes = await db.collection('users')
      .where({ phone })
      .get()

    let userId
    let isNewUser = false

    if (userRes.data.length === 0) {
      isNewUser = true
      const addRes = await db.collection('users').add({
        data: {
          phone,
          vipExpireTime: null,
          logoUrl: '',
          qrcodeUrl: '',
          createTime: db.serverDate(),
          updateTime: db.serverDate()
        }
      })
      userId = addRes._id
    } else {
      userId = userRes.data[0]._id
    }

    await db.collection('sms_codes')
      .doc(smsRes.data[0]._id)
      .remove()

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
        message: isNewUser ? '注册成功' : '登录成功',
        data: {
          userId,
          phone,
          isVip: false,
          vipExpireTime: null,
          logoUrl: '',
          qrcodeUrl: '',
          isNewUser
        }
      })
    }
  } catch (error) {
    console.error('注册/登录失败:', error)
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
        message: '操作失败，请稍后重试'
      })
    }
  }
}
