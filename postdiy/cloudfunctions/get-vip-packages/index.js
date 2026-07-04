// 公开 VIP 套餐查询云函数
// 仅返回 enabled=true 的套餐，字段精简，仅用于前端展示
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

exports.main = async (event, context) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  try {
    let list = []

    try {
      const result = await db
        .collection('vip_packages_config')
        .where({ enabled: true })
        .orderBy('sortOrder', 'asc')
        .limit(100)
        .get()
      list = result.data || []
    } catch (e) {
      const isCollectionNotExist =
        e.errCode === 'DATABASE_COLLECTION_NOT_EXIST' ||
        (e.message && (e.message.includes('collection not exists') || e.message.includes('DATABASE_COLLECTION_NOT_EXIST')))
      if (isCollectionNotExist) {
        // 集合不存在，自动创建并返回空列表
        try {
          await db.createCollection('vip_packages_config')
        } catch (createErr) {
          console.error('创建集合失败:', createErr)
        }
        list = []
      } else {
        throw e
      }
    }

    // 仅暴露展示字段，过滤掉管理字段（createTime/updateTime 等）
    const safeList = list.map(pkg => ({
      _id: pkg._id,
      duration: pkg.duration,
      title: pkg.title,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      saving: pkg.saving || '',
      badge: pkg.badge || '',
      featured: !!pkg.featured,
      sortOrder: pkg.sortOrder,
      promotionText: pkg.promotionText || ''
    }))

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        success: true,
        data: { packages: safeList }
      })
    }
  } catch (error) {
    console.error('get-vip-packages 执行失败:', error)
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        success: false,
        message: error.message || '获取套餐失败',
        data: { packages: [] }
      })
    }
  }
}
