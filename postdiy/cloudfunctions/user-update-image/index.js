const cloud = require('wx-server-sdk')
const COS = require('cos-nodejs-sdk-v5')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID || 'AKIDaCeHsbCzfRDoHnDRTIxc8Tk0IlBRXTUV',
  SecretKey: process.env.COS_SECRET_KEY || '0raWOK9njjnikfUCjATdgljBUoaHNPFs'
})

const BUCKET = 'postdiyavatar-1308395249'
const REGION = 'ap-guangzhou'

exports.main = async (event, context) => {
  console.log('环境变量检查:', {
    hasSecretId: !!process.env.TENCENTCLOUD_SECRETID,
    hasSecretKey: !!process.env.TENCENTCLOUD_SECRETKEY,
    secretIdPrefix: process.env.TENCENTCLOUD_SECRETID ? process.env.TENCENTCLOUD_SECRETID.substring(0, 8) + '...' : 'undefined'
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
    
    const cosKey = `user-images/${userId}/${imageType}.${extension}`
    
    let oldCosKey = null
    const existingDoc = await db.collection('user_images').doc(docId).get().catch(() => null)
    if (existingDoc && existingDoc.data && existingDoc.data.cosKey) {
      oldCosKey = existingDoc.data.cosKey
    }
    
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    console.log(`开始上传到 COS: ${cosKey}, 大小: ${buffer.length} bytes`)
    
    const uploadResult = await new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: BUCKET,
        Region: REGION,
        Key: cosKey,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: `image/${extension}`
      }, (err, data) => {
        if (err) {
          console.error('COS 上传错误:', err)
          reject(err)
        } else {
          console.log('COS 上传成功:', data)
          resolve(data)
        }
      })
    })
    
    if (oldCosKey && oldCosKey !== cosKey) {
      console.log(`删除旧的 COS 文件: ${oldCosKey}`)
      await new Promise((resolve, reject) => {
        cos.deleteObject({
          Bucket: BUCKET,
          Region: REGION,
          Key: oldCosKey
        }, (err, data) => {
          if (err) {
            console.warn('删除旧文件失败:', err)
          } else {
            console.log('旧文件已删除:', data)
          }
          resolve()
        })
      })
    }
    
    const imageUrl = `https://${BUCKET}.cos.${REGION}.myqcloud.com/${cosKey}`
    
    const imageRecord = {
      userId,
      imageType,
      imageUrl,
      cosKey,
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
    
    console.log(`用户 ${userId} 的 ${imageType} 图片已上传到 COS: ${imageUrl}`)
    
    response.body = JSON.stringify({
      success: true,
      data: {
        key: docId,
        url: imageUrl,
        cosKey: cosKey,
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
