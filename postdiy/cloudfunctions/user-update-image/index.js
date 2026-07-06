const cloud = require('wx-server-sdk')
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const R2_CONFIG = {
  endpoint: 'https://13a8e4d0cec2c8548de10e2f701ad6de.r2.cloudflarestorage.com',
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'fdc78645af8ea49cb1f5b4ae7a6a4c3b',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '2a7ae7e3e4339ea3d1be100dce5a31179612f7614e5b99df57c49a5e9543a5bc'
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
  console.log('环境变量检查:', {
    hasR2AccessKey: !!process.env.R2_ACCESS_KEY_ID,
    hasR2SecretKey: !!process.env.R2_SECRET_ACCESS_KEY
  })
  
  let userId, imageType, imageData, metadata
  
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
    imageType = body.imageType
    imageData = body.imageData
    metadata = body.metadata
  } catch (error) {
    userId = event.userId
    imageType = event.imageType
    imageData = event.imageData
    metadata = event.metadata
  }
  
  console.log('user-update-image 接收到的参数:', { userId, imageType, hasImageData: !!imageData })
  
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
  
  if (!imageData) {
    response.body = JSON.stringify({
      success: false,
      message: '图片数据不能为空'
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
    
    const extension = imageData.includes('image/png') ? 'png' : 
                      imageData.includes('image/webp') ? 'webp' : 'jpg'
    
    const r2Key = `user-images/${userId}/${imageType}.${extension}`
    
    let oldR2Key = null
    const existingDoc = await db.collection('user_images').doc(docId).get().catch(() => null)
    if (existingDoc && existingDoc.data && existingDoc.data.r2Key) {
      oldR2Key = existingDoc.data.r2Key
    }
    
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    console.log(`开始上传到 R2: ${r2Key}, 大小: ${buffer.length} bytes`)
    
    await s3Client.send(new PutObjectCommand({
      Bucket: R2_CONFIG.bucket,
      Key: r2Key,
      Body: buffer,
      ContentType: `image/${extension}`
    }))
    
    console.log('R2 上传成功')
    
    if (oldR2Key && oldR2Key !== r2Key) {
      console.log(`删除旧的 R2 文件: ${oldR2Key}`)
      try {
        await s3Client.send(new DeleteObjectCommand({
          Bucket: R2_CONFIG.bucket,
          Key: oldR2Key
        }))
        console.log('旧文件已删除')
      } catch (deleteError) {
        console.warn('删除旧文件失败:', deleteError.message)
      }
    }
    
    const imageUrl = `${R2_CONFIG.publicUrl}/${r2Key}`
    
    const imageRecord = {
      userId,
      imageType,
      imageUrl,
      r2Key,
      storageType: 'r2',
      metadata: {
        ...metadata,
        updatedAt: new Date().toISOString()
      },
      updatedAt: db.serverDate()
    }
    
    if (existingDoc && existingDoc.data) {
      await db.collection('user_images').doc(docId).update({
        data: imageRecord
      })
    } else {
      imageRecord.createdAt = db.serverDate()
      await db.collection('user_images').doc(docId).set({
        data: imageRecord
      })
    }
    
    console.log(`用户 ${userId} 的 ${imageType} 图片已上传到 R2: ${imageUrl}`)
    
    response.body = JSON.stringify({
      success: true,
      data: {
        key: docId,
        url: imageUrl,
        r2Key: r2Key,
        message: '图片上传成功'
      }
    })
    
    return response
  } catch (error) {
    console.error('上传图片失败:', error)
    response.body = JSON.stringify({
      success: false,
      message: '上传图片失败: ' + error.message
    })
    return response
  }
}
