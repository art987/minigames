/**
 * 微信登录云函数：
 * openid → 查 users.miniOpenid → 已绑定直接返回；未绑定创建轻量账号
 * 手机号账号（网页注册）经 login-with-password / user-register 登录后会补写 miniOpenid 完成绑定，
 * 之后 wx-login 直接命中该手机号账号（与网页端同一记录，会员信息两端一致）。
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/** VIP 到期时间统一推导：手机号账号存 vipValidUntil（ISO 日期），轻量账号存 vipExpire（毫秒时间戳） */
function deriveVipExpire(rec) {
  if (rec && rec.vipValidUntil) {
    const t = new Date(rec.vipValidUntil).getTime()
    if (!isNaN(t)) return t
  }
  return (rec && rec.vipExpire) || 0
}

exports.main = async (event) => {
  try {
    const { OPENID } = cloud.getWXContext()
    if (!OPENID) {
      return { code: -1, message: '无法获取用户身份', data: null }
    }

    const users = db.collection('users')

    // 1. 查是否已绑定
    const found = await users.where({ miniOpenid: OPENID }).get()
    let u = found.data && found.data[0]
    // 多条命中（历史轻量账号与绑定手机号账号并存）→ 优先有手机号的主账号
    if (found.data && found.data.length > 1) {
      u = found.data.find((it) => it.phone) || u
      console.info('[wx-login] 命中多条记录，已优先手机号账号:', u._id)
    }

    // 2. 未绑定 → 创建轻量账号（与 Web 端共用 users 集合；后续可用手机号密码/短信登录升级为正式账号）
    if (!u) {
      const now = Date.now()
      const added = await users.add({
        data: {
          miniOpenid: OPENID,
          nickname: '微信用户',
          avatar: '',
          freeDownloads: 5,
          vipExpire: 0,
          source: 'miniapp',
          createTime: now
        }
      })
      u = { _id: added._id, nickname: '微信用户', avatar: '', freeDownloads: 5, vipExpire: 0 }
      console.info('[wx-login] 创建轻量账号:', added._id)
    }

    const vipExpire = deriveVipExpire(u)

    return {
      code: 0,
      message: 'success',
      data: {
        userId: u._id,
        nickname: u.nickname || '微信用户',
        avatar: u.avatar || '',
        // 手机号账号的 VIP 到期存 vipValidUntil；轻量账号存 vipExpire —— 统一推导，绑定后权益状态与网页一致
        vipExpire,
        // 手机号账号下载额度存 downloadQuota；轻量账号存 freeDownloads
        freeDownloads: u.freeDownloads != null ? u.freeDownloads : (u.downloadQuota || 0),
        phone: u.phone || '',
        isVip: vipExpire > Date.now()
      }
    }
  } catch (err) {
    console.error('[wx-login] error:', err)
    return { code: -1, message: err.message || '登录失败', data: null }
  }
}
