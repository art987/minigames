const cloud = require('wx-server-sdk')
const qiniu = require('qiniu')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 七牛云配置（从环境变量读取）
const QINIU_ACCESS_KEY = process.env.QINIU_ACCESS_KEY || '4TVRjmuj-nLeEcwFFOCbCBMiWlQR2BYt2Ee4ZPdb'
const QINIU_SECRET_KEY = process.env.QINIU_SECRET_KEY || 'C_y75p4asBDZ22BJ0JjGl1I1CsBSUcoiixDG262O'
const QINIU_BUCKET = process.env.QINIU_BUCKET || 'posterbg'
const QINIU_DOMAIN = process.env.QINIU_DOMAIN || '7ncdn.peacelove.top'

// 用户图片存储路径：userimage文件夹
const USER_IMAGE_PREFIX = 'userimage'

const mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY)
const config = new qiniu.conf.Config()
config.useHttpsDomain = true
config.zone = qiniu.zone.Zone_z2 // 华南区域

exports.main = async (event, context) => {
  console.log('环境变量检查:', {
    hasQiniuAccessKey: !!process.env.QINIU_ACCESS_KEY,
    hasQiniuSecretKey: !!process.env.QINIU_SECRET_KEY,
    hasQiniuDomain: !!process.env.QINIU_DOMAIN
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
  
  console.log('user-update-image-qiniu 接收到的参数:', { userId, imageType, hasImageData: !!imageData })
  
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
    
    // 生成七牛云key：userimage/{userId}/{imageType}.{extension}
    const extension = imageData.includes('image/png') ? 'png' : 
                      imageData.includes('image/webp') ? 'webp' : 'jpg'
    
    const qiniuKey = `${USER_IMAGE_PREFIX}/${userId}/${imageType}.${extension}`
    
    // 检查是否有旧的图片需要删除（避免占用资源）
    // 删除所有可能的旧格式文件（png, jpg, webp）
    const existingDoc = await db.collection('user_images').doc(docId).get().catch(() => null)
    
    // 删除旧文件的逻辑（恢复，确保清理旧资源）
    const bucketManager = new qiniu.rs.BucketManager(mac, config)
    
    // 1. 删除所有可能的旧格式文件（确保清理干净，包括当前格式）
    console.log('开始删除所有可能的旧文件...')
    const possibleExtensions = ['png', 'jpg', 'webp']
    for (const ext of possibleExtensions) {
      const possibleKey = `${USER_IMAGE_PREFIX}/${userId}/${imageType}.${ext}`
      console.log(`尝试删除文件: ${possibleKey}`)
      
      try {
        await new Promise((resolve) => {
          bucketManager.delete(QINIU_BUCKET, possibleKey, (err, respBody, respInfo) => {
            if (!err && respInfo.statusCode === 200) {
              console.log(`✅ 文件 ${possibleKey} 已删除`)
            } else if (err) {
              console.log(`⚠️ 删除 ${possibleKey} 失败（可能不存在）: ${err.message || '未知错误'}`)
            } else {
              console.log(`⚠️ 删除 ${possibleKey} 失败，状态码: ${respInfo.statusCode}`)
            }
            resolve() // 无论成功失败都继续
          })
        })
      } catch (e) {
        console.log(`⚠️ 删除 ${possibleKey} 异常: ${e.message}`)
        // 忽略错误，继续处理
      }
    }
    console.log('旧文件删除完成，开始上传新文件...')
    
    // 上传到七牛云
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    console.log(`开始上传到七牛云: ${qiniuKey}, 大小: ${buffer.length} bytes`)
    
    // 生成上传凭证
    const options = {
      scope: QINIU_BUCKET + ':' + qiniuKey
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    
    // 上传文件
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    
    const uploadResult = await new Promise((resolve, reject) => {
      formUploader.put(uploadToken, qiniuKey, buffer, putExtra, (err, respBody, respInfo) => {
        if (err) {
          reject(err)
        } else {
          if (respInfo.statusCode === 200) {
            resolve({ success: true, key: respBody.key, hash: respBody.hash })
          } else {
            reject(new Error(`七牛云上传失败，状态码: ${respInfo.statusCode}, 错误: ${respBody.error || '未知错误'}`))
          }
        }
      })
    })
    
    console.log('七牛云上传成功:', uploadResult)
    
    // 生成七牛云URL（带时间戳防缓存）
    const timestamp = Date.now()
    const imageUrl = `https://${QINIU_DOMAIN}/${qiniuKey}?t=${timestamp}`
    
    // 自动同步URL到 users 表（优化：合并上传和同步）
    const fieldName = imageType === 'logo' ? 'logoUrl' : 'qrcodeUrl'
    try {
      await db.collection('users').doc(userId).update({
        data: {
          [fieldName]: imageUrl,
          updatedAt: db.serverDate()
        }
      })
      console.log(`已自动同步 ${fieldName} 到 users 表`)
    } catch (updateErr) {
      console.warn('同步到 users 表失败:', updateErr.message)
      // 不阻塞主流程，继续保存到 user_images 表
    }
    
    // 保存到 user_images 表
    const imageRecord = {
      userId,
      imageType,
      imageUrl,
      qiniuKey,
      storageType: 'qiniu',
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
    
    console.log(`用户 ${userId} 的 ${imageType} 图片已上传到七牛云并同步: ${imageUrl}`)
    
    response.body = JSON.stringify({
      success: true,
      data: {
        key: docId,
        url: imageUrl,
        qiniuKey: qiniuKey,
        storageType: 'qiniu',
        message: '图片上传成功并已自动同步到数据库'
      }
    })
    
    return response
  } catch (error) {
    console.error('上传图片到七牛云失败:', error)
    response.body = JSON.stringify({
      success: false,
      message: '上传图片到七牛云失败: ' + error.message
    })
    return response
  }
}