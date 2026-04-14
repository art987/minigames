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

  let userId, logoUrl, qrcodeUrl, brandname, promoText, logoTencentUrl, qrcodeTencentUrl, logoFileID, qrcodeFileID, logoTransparent
  
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
    logoUrl = body.logoUrl
    qrcodeUrl = body.qrcodeUrl
    brandname = body.brandname
    promoText = body.promoText
    logoTencentUrl = body.logoTencentUrl
    qrcodeTencentUrl = body.qrcodeTencentUrl
    logoFileID = body.logoFileID
    qrcodeFileID = body.qrcodeFileID
    logoTransparent = body.logoTransparent
  } catch (error) {
    userId = event.userId
    logoUrl = event.logoUrl
    qrcodeUrl = event.qrcodeUrl
    brandname = event.brandname
    promoText = event.promoText
    logoTencentUrl = event.logoTencentUrl
    qrcodeTencentUrl = event.qrcodeTencentUrl
    logoFileID = event.logoFileID
    qrcodeFileID = event.qrcodeFileID
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
    
    if (logoTencentUrl !== undefined) {
      updateData.logoTencentUrl = logoTencentUrl
    }
    
    if (qrcodeTencentUrl !== undefined) {
      updateData.qrcodeTencentUrl = qrcodeTencentUrl
    }
    
    if (logoFileID !== undefined) {
      updateData.logoFileID = logoFileID
    }
    
    if (qrcodeFileID !== undefined) {
      updateData.qrcodeFileID = qrcodeFileID
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
            logoTencentUrl: user.logoTencentUrl || '',
            logoFileID: user.logoFileID || '',
            logoTransparent: user.logoTransparent || false,
            qrcodeUrl: user.qrcodeUrl || '',
            qrcodeTencentUrl: user.qrcodeTencentUrl || '',
            qrcodeFileID: user.qrcodeFileID || ''
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
