const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  let userId, logoUrl, qrcodeUrl, brandname, promoText
  
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
    logoUrl = body.logoUrl
    qrcodeUrl = body.qrcodeUrl
    brandname = body.brandname
    promoText = body.promoText
  } catch (error) {
    userId = event.userId
    logoUrl = event.logoUrl
    qrcodeUrl = event.qrcodeUrl
    brandname = event.brandname
    promoText = event.promoText
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

    await db.collection('users').doc(userId).update({
      data: updateData
    })

    const userRes = await db.collection('users').doc(userId).get()
    const user = userRes.data
    const now = new Date()
    const isVip = user.vipExpireTime && new Date(user.vipExpireTime) > now

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
          vipExpireTime: user.vipExpireTime,
          brandname: user.brandname || '',
          promoText: user.promoText || '',
          logoUrl: user.logoUrl || '',
          qrcodeUrl: user.qrcodeUrl || ''
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
