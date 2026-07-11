const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 生成邀请码：2位字母（去掉I、O）+ 3位数字（不含4，必须含6或8）
function generateInviteCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ' // 去掉I、O
  const validDigits = [0, 1, 2, 3, 5, 6, 7, 8, 9] // 不含4
  const mustHave = [6, 8] // 必须含6或8
  let code = ''
  for (let i = 0; i < 2; i++) {
    code += letters[Math.floor(Math.random() * letters.length)]
  }
  const digits = []
  digits.push(mustHave[Math.floor(Math.random() * mustHave.length)])
  for (let i = 0; i < 2; i++) {
    digits.push(validDigits[Math.floor(Math.random() * validDigits.length)])
  }
  // 打乱数字顺序，避免6/8总在第一位
  digits.sort(() => Math.random() - 0.5)
  code += digits.join('')
  return code
}

// 生成唯一邀请码（带重试机制）
async function generateUniqueInviteCode() {
  for (let i = 0; i < 8; i++) {
    const code = generateInviteCode()
    const existRes = await db.collection('users').where({ inviteCode: code }).count()
    if (existRes.total === 0) {
      return code
    }
    console.log(`邀请码 ${code} 已存在，重试第 ${i + 1} 次`)
  }
  throw new Error('生成唯一邀请码失败')
}

exports.main = async (event, context) => {
  let phone, code, inviteCode
  try {
    // 解析 body 中的 JSON 数据
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    phone = body.phone
    code = body.code
    inviteCode = body.inviteCode || ''
  } catch (error) {
    console.log('解析 body 失败:', error)
    phone = event.phone
    code = event.code
    inviteCode = event.inviteCode || ''
  }

  console.log('接收到的 event:', event)
  console.log('手机号:', phone)
  console.log('验证码:', code)
  console.log('邀请码:', inviteCode)
  
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

    let newInviteCode = ''
    let referrerUserId = ''
    let referrerInviteCode = ''
    let discountExpireAt = null

    if (userRes.data.length === 0) {
      isNewUser = true

      // 处理邀请码：反查推荐人
      if (inviteCode) {
        try {
          const referrerRes = await db.collection('users')
            .where({ inviteCode })
            .get()

          if (referrerRes.data.length > 0) {
            const referrer = referrerRes.data[0]
            // 防自推荐：推荐人手机号不能等于注册手机号
            if (referrer.phone !== phone) {
              referrerUserId = referrer._id
              referrerInviteCode = inviteCode
              // 折上折有效期：注册后7天，精确到秒
              const expireDate = new Date()
              expireDate.setDate(expireDate.getDate() + 7)
              discountExpireAt = expireDate
              console.log(`推荐关系建立：推荐人=${referrerUserId}，邀请码=${inviteCode}`)
            } else {
              console.log('自推荐拦截：推荐人手机号与注册手机号相同')
            }
          } else {
            console.log(`邀请码 ${inviteCode} 未匹配到推荐人`)
          }
        } catch (e) {
          console.error('反查推荐人失败:', e)
        }
      }

      // 生成新用户专属邀请码
      newInviteCode = await generateUniqueInviteCode()
      console.log('新用户邀请码:', newInviteCode)

      const addRes = await db.collection('users').add({
        data: {
          phone,
          vipValidUntil: null,
          isVip: false,
          downloadQuota: 5,
          logoUrl: '',
          logoTencentUrl: '',
          qrcodeUrl: '',
          qrcodeTencentUrl: '',
          inviteCode: newInviteCode,
          referrerUserId,
          referrerInviteCode,
          registerTime: db.serverDate(),
          discountExpireAt: discountExpireAt ? discountExpireAt : null,
          createTime: db.serverDate(),
          updateTime: db.serverDate()
        }
      })

      // 记录下载额度初始化日志（非阻塞，失败不影响注册）
      db.collection('download_quota_logs').add({
        data: {
          userId: addRes._id,
          changeAmount: 5,
          beforeQuota: 0,
          afterQuota: 5,
          type: 'grant',
          source: 'new_user',
          remark: '新用户注册赠送',
          createTime: db.serverDate()
        }
      }).catch(e => console.error('写入额度日志失败:', e))

      // 写入推荐关系记录（非阻塞）
      if (referrerUserId) {
        db.collection('referrals').add({
          data: {
            referrerUserId,
            invitedUserId: addRes._id,
            invitedPhone: phone,
            inviteCode,
            createTime: db.serverDate()
          }
        }).catch(e => console.error('写入推荐关系失败:', e))
      }

      userId = addRes._id
    } else {
      userId = userRes.data[0]._id
      // 老用户回填邀请码字段（兼容历史数据）
      const oldUser = userRes.data[0]
      if (!oldUser.inviteCode) {
        try {
          newInviteCode = await generateUniqueInviteCode()
          await db.collection('users').doc(userId).update({
            data: {
              inviteCode: newInviteCode,
              registerTime: oldUser.registerTime || oldUser.createTime || db.serverDate(),
              updateTime: db.serverDate()
            }
          })
          console.log('老用户回填邀请码:', newInviteCode)
        } catch (e) {
          console.error('老用户回填邀请码失败:', e)
        }
      }
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
          vipValidUntil: null,
          downloadQuota: isNewUser ? 5 : (userRes.data[0].downloadQuota || 0),
          logoUrl: '',
          logoTencentUrl: '',
          qrcodeUrl: '',
          qrcodeTencentUrl: '',
          isNewUser,
          hasPassword: userRes.data.length > 0 && userRes.data[0].hasPassword || false,
          inviteCode: isNewUser ? newInviteCode : (userRes.data[0].inviteCode || ''),
          referrerUserId: isNewUser ? referrerUserId : (userRes.data[0].referrerUserId || ''),
          referrerInviteCode: isNewUser ? referrerInviteCode : (userRes.data[0].referrerInviteCode || ''),
          discountExpireAt: isNewUser
            ? (discountExpireAt ? discountExpireAt.toISOString() : null)
            : (userRes.data[0].discountExpireAt ? new Date(userRes.data[0].discountExpireAt).toISOString() : null)
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
