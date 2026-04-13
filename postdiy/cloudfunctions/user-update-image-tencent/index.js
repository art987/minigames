const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
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
  
  console.log('user-update-image-tencent 接收到的参数:', { userId, imageType, hasImageData: !!imageData })
  
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
    const extension = imageData.includes('image/png') ? 'png' : 
                      imageData.includes('image/webp') ? 'webp' : 'jpg'
    
    const cloudPath = `user-images/${userId}/${imageType}.${extension}`
    
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    console.log(`开始上传到云开发存储: ${cloudPath}, 大小: ${buffer.length} bytes`)
    
    const uploadResult = await cloud.uploadFile({
      cloudPath: cloudPath,
      fileContent: buffer
    })
    
    console.log('云开发存储上传成功, fileID:', uploadResult.fileID)
    
    const tempUrlResult = await cloud.getTempFileURL({
      fileList: [uploadResult.fileID]
    })
    
    const imageUrl = tempUrlResult.fileList[0].tempFileURL
    
    console.log('临时下载链接:', imageUrl)
    console.log(`用户 ${userId} 的 ${imageType} 图片已上传到云开发存储: ${imageUrl}`)
    
    response.body = JSON.stringify({
      success: true,
      data: {
        url: imageUrl,
        fileID: uploadResult.fileID,
        cloudPath: cloudPath,
        message: '图片上传成功'
      }
    })
    
    return response
  } catch (error) {
    console.error('上传图片到云开发存储失败:', error)
    response.body = JSON.stringify({
      success: false,
      message: '上传图片失败: ' + error.message
    })
    return response
  }
}
