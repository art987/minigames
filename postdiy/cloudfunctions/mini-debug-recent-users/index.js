/**
 * 临时调试函数（只读）：查询 users 集合最近记录，验证小程序登录请求是否到达云端。
 * 验证完成后将删除本函数。
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

function maskPhone(p) {
  return p && p.length >= 11 ? p.slice(0, 3) + '****' + p.slice(7) : p || ''
}

exports.main = async () => {
  const db = cloud.database()
  let rows = []
  try {
    const res = await db.collection('users').orderBy('createTime', 'desc').limit(8).get()
    rows = res.data
  } catch (e) {
    const res = await db.collection('users').limit(20).get()
    rows = res.data
    rows.sort((a, b) => (b.createTime || 0) - (a.createTime || 0))
    rows = rows.slice(0, 8)
  }
  const miniBound = await db.collection('users').where({ source: 'miniapp' }).count()
  return {
    totalMiniappSource: miniBound.total,
    recent: rows.map((u) => ({
      id: u._id,
      phone: maskPhone(u.phone),
      hasMiniOpenid: !!u.miniOpenid,
      source: u.source || '',
      nickname: u.nickname || '',
      createTime: u.createTime || null,
      nameColor: u.nameColor || null
    }))
  }
}
