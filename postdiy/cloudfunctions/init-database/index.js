const cloud = require('wx-server-sdk')

// 从环境变量获取环境 ID
const ENV_ID = process.env.TENCENT_ENV_ID || 'postdiy-0g2mftaf6a0fc450'

cloud.init({
  env: ENV_ID
})

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const results = {
      users: false,
      sms_codes: false,
      upgrade_codes: false
    }

    try {
      await db.collection('users').limit(1).get()
      results.users = true
    } catch (e) {
      await db.createCollection('users')
      results.users = true
    }

    try {
      await db.collection('sms_codes').limit(1).get()
      results.sms_codes = true
    } catch (e) {
      await db.createCollection('sms_codes')
      results.sms_codes = true
    }

    try {
      await db.collection('upgrade_codes').limit(1).get()
      results.upgrade_codes = true
    } catch (e) {
      await db.createCollection('upgrade_codes')
      results.upgrade_codes = true
    }

    return {
      success: true,
      message: '数据库集合初始化完成',
      data: results
    }
  } catch (error) {
    console.error('初始化数据库失败:', error)
    return {
      success: false,
      message: '初始化数据库失败',
      error: error.message
    }
  }
}
