const cloud = require('wx-server-sdk')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const R2_CONFIG = {
  endpoint: 'https://13a8e4d0cec2c8548de10e2f701ad6de.r2.cloudflarestorage.com',
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'ddb4dbf328c422a47d4397da3e2612fd',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'b614421cb98236e0b617a2d12ddeb3e73521fd5b5cb399ad4f28459f1bd3a152'
  },
  bucket: 'postdiy',
  publicUrl: 'https://pub-30c6f2f6d33a4cf0b874265d80d1e682.r2.dev'
}

const s3Client = new S3Client({
  endpoint: R2_CONFIG.endpoint,
  region: R2_CONFIG.region,
  credentials: R2_CONFIG.credentials
})

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
    
    const r2Key = existingDoc.data.r2Key
    const cosKey = existingDoc.data.cosKey
    
    if (r2Key) {
      console.log(`正在从 R2 删除文件: ${r2Key}`)
      try {
        await s3Client.send(new DeleteObjectCommand({
          Bucket: R2_CONFIG.bucket,
          Key: r2Key
        }))
        console.log('R2 文件已删除')
      } catch (deleteError) {
        console.warn('R2 删除文件失败:', deleteError.message)
      }
    }
    
    if (cosKey) {
      console.log(`发现旧的 COS 文件: ${cosKey}，跳过删除（COS 已弃用）`)
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
