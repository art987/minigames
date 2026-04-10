const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

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

  let userId, logoUrl, qrcodeUrl, brandname, promoText, logoTransparent
  
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
    logoUrl = body.logoUrl
    qrcodeUrl = body.qrcodeUrl
    brandname = body.brandname
    promoText = body.promoText
    logoTransparent = body.logoTransparent
  } catch (error) {
    userId = event.userId
    logoUrl = event.logoUrl
    qrcodeUrl = event.qrcodeUrl
    brandname = event.brandname
    promoText = event.promoText
    logoTransparent = event.logoTransparent
  }
  
  if (!userId) {
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
        message: '用户ID不能为空'
      })
    }
  }

  try {
    const updateData = {
      updateTime: db.serverDate()
    }

    if (logoUrl !== undefined) {
      updateData.logoUrl = logoUrl
    }

    if (qrcodeUrl !== undefined) {
      updateData.qrcodeUrl = qrcodeUrl
    }
    
    if (brandname !== undefined) {
      updateData.brandname = brandname
    }
    
    if (promoText !== undefined) {
      updateData.promoText = promoText
    }

    if (logoTransparent !== undefined) {
      updateData.logoTransparent = logoTransparent
    }

    await db.collection('users').doc(userId).update({
      data: updateData
    })

    const userRes = await db.collection('users').doc(userId).get()
    const user = userRes.data
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
        message: '更新成功',
        data: {
          userId,
          phone: user.phone,
          isVip,
          vipValidUntil: user.vipValidUntil,
          brandname: user.brandname || '',
          promoText: user.promoText || '',
          logoUrl: user.logoUrl || '',
          qrcodeUrl: user.qrcodeUrl || '',
          logoTransparent: user.logoTransparent || false
        }
      })
    }
  } catch (error) {
    console.error('更新用户信息失败:', error)
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
        message: '更新失败，请稍后重试'
      })
    }
  }
}
