// 获取VIP套餐配置云函数（公开接口）
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

// 默认套餐配置（云端无数据时的兜底）
const DEFAULT_PACKAGES = [
  {
    duration: 1,
    title: '1个月VIP',
    price: 9.9,
    originalPrice: 60,
    saving: '≈半杯奶茶',
    badge: '',
    featured: false,
    sortOrder: 1
  },
  {
    duration: 3,
    title: '3个月VIP',
    price: 16.9,
    originalPrice: 60,
    saving: '≈买1月送2月',
    badge: '',
    featured: false,
    sortOrder: 2
  },
  {
    duration: 6,
    title: '6个月VIP',
    price: 19.9,
    originalPrice: 120,
    saving: '≈买1月送5月',
    badge: '',
    featured: false,
    sortOrder: 3
  },
  {
    duration: 12,
    title: '1年VIP',
    price: 23.9,
    originalPrice: 240,
    saving: '≈买1月送11月',
    badge: '超值',
    featured: true,
    sortOrder: 4
  },
  {
    duration: 24,
    title: '2年VIP',
    price: 33.9,
    originalPrice: 480,
    saving: '≈买2月送22月',
    badge: '',
    featured: false,
    sortOrder: 5
  }
]

exports.main = async (event, context) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  try {
    let packages = []

    try {
      const result = await db.collection('vip_packages_config')
        .where({ enabled: true })
        .orderBy('sortOrder', 'asc')
        .limit(20)
        .get()

      packages = (result.data || []).map(item => ({
        id: item._id,
        duration: item.duration,
        title: item.title,
        price: item.price,
        originalPrice: item.originalPrice,
        saving: item.saving || '',
        badge: item.badge || '',
        featured: !!item.featured,
        sortOrder: item.sortOrder || 0,
        promotionText: item.promotionText || '',
        updateTime: item.updateTime || null
      }))
    } catch (queryErr) {
      console.error('查询套餐配置失败（可能集合未创建）:', queryErr)
    }

    // 云端无数据时使用默认配置
    if (!packages.length) {
      console.log('使用默认套餐配置')
      return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify({
          success: true,
          data: {
            packages: DEFAULT_PACKAGES,
            promotionTitle: '升级通道二：(周年感恩大送)',
            source: 'default'
          }
        })
      }
    }

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        success: true,
        data: {
          packages: packages,
          promotionTitle: '升级通道二：(周年感恩大送)',
          source: 'cloud'
        }
      })
    }
  } catch (error) {
    console.error('获取VIP套餐配置失败:', error)
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        success: true, // 降级返回默认
        data: {
          packages: DEFAULT_PACKAGES,
          promotionTitle: '升级通道二：(周年感恩大送)',
          source: 'default'
        }
      })
    }
  }
}
