const cloud = require('wx-server-sdk')
const COS = require('cos-nodejs-sdk-v5')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY
})

const BUCKET = 'postdiyavatar-1308395249'
const REGION = 'ap-guangzhou'

exports.main = async (event, context) => {
  console.log('user-delete-image 被调用')
  
  let userId, imageType
  
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
    imageType = body.imageType
  } catch (error) {
    userId = event.userId
    imageType = event.imageType
  }
  
  console.log('user-delete-image 接收到的参数:', { userId, imageType })
  
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
  
  if (!userId) {
    response.body = JSON.stringify({
      success: false,
      message: '用户ID不能为空'
    })
    return response
  }
  
  if (!imageType) {
    response.body = JSON.stringify({
      success: false,
      message: '图片类型不能为空'
    })
    return response
  }
  
  const validImageTypes = ['logo', 'qrcode']
  if (!validImageTypes.includes(imageType)) {
    response.body = JSON.stringify({
      success: false,
      message: '图片类型无效，只支持 logo 或 qrcode'
    })
    return response
  }

  try {
    const docId = `${userId}_${imageType}`
    
    const existingDoc = await db.collection('user_images').doc(docId).get().catch(() => null)
    
    if (!existingDoc || !existingDoc.data) {
      response.body = JSON.stringify({
        success: true,
        message: '图片记录不存在，无需删除'
      })
      return response
    }
    
    const cosKey = existingDoc.data.cosKey
    
    if (cosKey) {
      console.log(`正在从 COS 删除文件: ${cosKey}`)
      
      await new Promise((resolve, reject) => {
        cos.deleteObject({
          Bucket: BUCKET,
          Region: REGION,
          Key: cosKey
        }, (err, data) => {
          if (err) {
            console.warn('COS 删除文件失败:', err)
          } else {
            console.log('COS 文件已删除:', data)
          }
          resolve()
        })
      })
    }
    
    await db.collection('user_images').doc(docId).remove()
    console.log(`用户 ${userId} 的 ${imageType} 图片记录已删除`)
    
    const urlField = imageType === 'logo' ? 'logoUrl' : 'qrcodeUrl'
    await db.collection('users').doc(userId).update({
      data: {
        [urlField]: '',
        updateTime: db.serverDate()
      }
    })
    console.log(`用户 ${userId} 的 ${urlField} 已清空`)
    
    response.body = JSON.stringify({
      success: true,
      message: '图片已删除'
    })
    
    return response
  } catch (error) {
    console.error('删除图片失败:', error)
    response.body = JSON.stringify({
      success: false,
      message: '删除图片失败: ' + error.message
    })
    return response
  }
}
