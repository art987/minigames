const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { userId, upgradeCode } = event
  
  if (!userId || !upgradeCode) {
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
        message: '用户ID和升级码不能为空'
      })
    }
  }

  try {
    const codeRes = await db.collection('upgrade_codes')
      .where({
        code: upgradeCode,
        used: false
      })
      .get()

    if (codeRes.data.length === 0) {
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
          message: '升级码无效或已使用'
        })
      }
    }

    const codeInfo = codeRes.data[0]
    const days = codeInfo.days || 30

    const userRes = await db.collection('users').doc(userId).get()
    if (!userRes.data) {
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

    const user = userRes.data
    const now = new Date()
    let currentExpireTime = user.vipExpireTime ? new Date(user.vipExpireTime) : now
    if (currentExpireTime < now) {
      currentExpireTime = now
    }

    const newExpireTime = new Date(currentExpireTime)
    newExpireTime.setDate(newExpireTime.getDate() + days)

    await db.collection('users').doc(userId).update({
      data: {
        vipExpireTime: newExpireTime,
        updateTime: db.serverDate()
      }
    })

    await db.collection('upgrade_codes').doc(codeInfo._id).update({
      data: {
        used: true,
        usedBy: userId,
        usedTime: db.serverDate()
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
        message: `升级成功，VIP 延长 ${days} 天`,
        data: {
          vipExpireTime: newExpireTime
        }
      })
    }
  } catch (error) {
    console.error('升级失败:', error)
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
        message: '升级失败，请稍后重试'
      })
    }
  }
}
