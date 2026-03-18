const cloud = require('wx-server-sdk')

// 从环境变量获取环境 ID
const ENV_ID = process.env.TENCENT_ENV_ID || 'postdiy-0g2mftaf6a0fc450'

cloud.init({
  env: ENV_ID
})

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    console.log('Environment ID:', ENV_ID)
    console.log('Event:', event)
    
    return {
      success: true,
      message: '云函数运行成功',
      data: {
        envId: ENV_ID,
        event: event
      }
    }
  } catch (error) {
    console.error('错误:', error)
    return {
      success: false,
      message: '错误: ' + error.message
    }
  }
}
