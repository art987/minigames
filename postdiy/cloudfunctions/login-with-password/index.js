const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  // 处理 CORS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  let phone, password
  try {
    // 解析 body 中的 JSON 数据
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    phone = body.phone
    password = body.password
  } catch (error) {
    console.log('解析 body 失败:', error)
    phone = event.phone
    password = event.password
  }
  
  console.log('接收到的 event:', event)
  console.log('手机号:', phone)
  console.log('密码:', password)
  
  if (!phone || !password) {
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
        message: '手机号和密码不能为空'
      })
    }
  }

  try {
    const userRes = await db.collection('users')
      .where({ phone })
      .get()

    if (userRes.data.length === 0) {
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
          message: '用户不存在'
        })
      }
    }

    const user = userRes.data[0]
    
    if (!user.hasPassword || user.password !== password) {
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
          message: '密码错误'
        })
      }
    }

    // ===== 打通小程序端：从小程序调用时 WXContext 自带 OPENID，绑定到该手机号账号 =====
    // 先清掉其它记录上同 miniOpenid（历史轻量账号），避免 wx-login 多记录歧义
    try {
      const { OPENID } = cloud.getWXContext()
      if (OPENID && user.miniOpenid !== OPENID) {
        await db.collection('users')
          .where({ miniOpenid: OPENID, _id: _.neq(user._id) })
          .update({ data: { miniOpenid: '' } })
        await db.collection('users').doc(user._id).update({
          data: { miniOpenid: OPENID, updateTime: db.serverDate() }
        })
        console.log('已绑定 miniOpenid 到手机号账号:', user._id)
      }
    } catch (bindErr) {
      console.error('绑定 miniOpenid 失败（不影响登录）:', bindErr)
    }

    const now = new Date()
    const isVip = user.vipValidUntil && new Date(user.vipValidUntil) > now

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
        message: '登录成功',
        data: {
          userId: user._id,
          phone: user.phone,
          isVip: isVip,
          vipValidUntil: user.vipValidUntil,
          brandname: user.brandname || '',
          promoText: user.promoText || '',
          logoUrl: user.logoUrl,
          logoTencentUrl: user.logoTencentUrl,
          qrcodeUrl: user.qrcodeUrl,
          qrcodeTencentUrl: user.qrcodeTencentUrl,
          hasPassword: user.hasPassword
        }
      })
    }
  } catch (error) {
    console.error('密码登录失败:', error)
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
        message: '登录失败，请检查手机号和密码'
      })
    }
  }
}
