const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 手机号脱敏：138****1234
function maskPhone(phone) {
  if (!phone || phone.length < 7) return phone || ''
  return phone.substring(0, 3) + '****' + phone.substring(phone.length - 4)
}

// 生成邀请码：2字母(去I/O) + 3数字(去4, 必含6或8)
function generateInviteCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const validDigits = [0, 1, 2, 3, 5, 6, 7, 8, 9]
  const mustHave = [6, 8]
  let code = ''
  for (let i = 0; i < 2; i++) {
    code += letters[Math.floor(Math.random() * letters.length)]
  }
  const digits = []
  digits.push(mustHave[Math.floor(Math.random() * mustHave.length)])
  for (let i = 0; i < 2; i++) {
    digits.push(validDigits[Math.floor(Math.random() * validDigits.length)])
  }
  digits.sort(() => Math.random() - 0.5)
  code += digits.join('')
  return code
}

// 生成唯一邀请码（带重试）
async function generateUniqueInviteCode() {
  for (let i = 0; i < 8; i++) {
    const code = generateInviteCode()
    const existRes = await db.collection('users').where({ inviteCode: code }).count()
    if (existRes.total === 0) {
      return code
    }
  }
  throw new Error('生成唯一邀请码失败')
}

exports.main = async (event, context) => {
  let userId
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
  } catch (error) {
    userId = event.userId
  }

  console.log('get-invite-info 接收参数:', { userId })

  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
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
        message: '缺少 userId 参数'
      })
    }
  }

  try {
    const userRes = await db.collection('users').doc(userId).get()
    const userData = userRes.data

    if (!userData) {
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

    // 老用户没有邀请码时，自动生成并写入数据库
    if (!userData.inviteCode) {
      try {
        const newCode = await generateUniqueInviteCode()
        console.log('为老用户生成邀请码:', userId, newCode)
        await db.collection('users').doc(userId).update({
          data: { inviteCode: newCode }
        })
        userData.inviteCode = newCode
      } catch (e) {
        console.error('自动生成邀请码失败:', e.message)
      }
    }

    // 计算折上折剩余时间
    let discountRemainingSeconds = 0
    let discountExpireAt = null
    let discountActive = false
    if (userData.discountExpireAt) {
      const expireAt = new Date(userData.discountExpireAt)
      const now = new Date()
      if (expireAt > now) {
        discountActive = true
        discountRemainingSeconds = Math.floor((expireAt - now) / 1000)
      }
      discountExpireAt = expireAt.toISOString()
    }

    // 查询推荐人信息（脱敏）
    let referrerInfo = null
    if (userData.referrerUserId) {
      try {
        const referrerRes = await db.collection('users').doc(userData.referrerUserId).get()
        const referrerData = referrerRes.data
        if (referrerData) {
          referrerInfo = {
            userId: referrerData._id,
            phone: maskPhone(referrerData.phone),
            inviteCode: referrerData.inviteCode || ''
          }
        }
      } catch (e) {
        console.warn('查询推荐人信息失败:', e.message)
        referrerInfo = {
          userId: userData.referrerUserId,
          phone: '',
          inviteCode: userData.referrerInviteCode || ''
        }
      }
    }

    // 统计邀请人数
    let invitedCount = 0
    try {
      const countRes = await db.collection('referrals')
        .where({ referrerUserId: userId })
        .count()
      invitedCount = countRes.total || 0
    } catch (e) {
      console.warn('查询邀请人数失败:', e.message)
    }

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
        data: {
          inviteCode: userData.inviteCode || '',
          referrerUserId: userData.referrerUserId || '',
          referrerInviteCode: userData.referrerInviteCode || '',
          referrerInfo,
          discountExpireAt,
          discountActive,
          discountRemainingSeconds,
          invitedCount,
          shareUrl: userData.inviteCode
            ? `https://peacelove.top/postdiy/about/info.html?ref=${userData.inviteCode}`
            : ''
        }
      })
    }
  } catch (error) {
    console.error('获取邀请信息失败:', error)
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
        message: '获取邀请信息失败: ' + error.message
      })
    }
  }
}
