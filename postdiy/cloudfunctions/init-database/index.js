const cloud = require('wx-server-sdk')

// 从环境变量获取环境 ID
const ENV_ID = process.env.TENCENT_ENV_ID || 'postdiy-0g2mftaf6a0fc450'

cloud.init({
  env: ENV_ID
})

const db = cloud.database()

// 初始 VIP 套餐配置
const INITIAL_VIP_PACKAGES = [
  {
    duration: 1,
    title: '1个月VIP',
    price: 9.9,
    originalPrice: 60,
    saving: '≈半杯奶茶',
    badge: '',
    featured: false,
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
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
    enabled: true,
    sortOrder: 5
  }
]

async function ensureCollection(name) {
  try {
    await db.collection(name).limit(1).get()
    return true
  } catch (e) {
    try {
      await db.createCollection(name)
      return true
    } catch (createErr) {
      console.error(`创建集合 ${name} 失败:`, createErr)
      return false
    }
  }
}

// 初始化 VIP 套餐配置数据
async function initVipPackagesData() {
  try {
    const countRes = await db.collection('vip_packages_config').count()
    if (countRes.total > 0) {
      return { initialized: false, reason: 'already_has_data', count: countRes.total }
    }

    const now = new Date()
    const batch = INITIAL_VIP_PACKAGES.map(pkg =>
      db.collection('vip_packages_config').add({
        data: { ...pkg, createTime: now, updateTime: now }
      })
    )
    await Promise.all(batch)
    return { initialized: true, count: INITIAL_VIP_PACKAGES.length }
  } catch (error) {
    console.error('初始化 VIP 套餐数据失败:', error)
    return { initialized: false, reason: error.message }
  }
}

exports.main = async (event, context) => {
  try {
    const results = {
      users: false,
      sms_codes: false,
      upgrade_codes: false,
      download_quota_logs: false,
      vip_packages_config: false,
      vip_packages_data: null
    }

    results.users = await ensureCollection('users')
    results.sms_codes = await ensureCollection('sms_codes')
    results.upgrade_codes = await ensureCollection('upgrade_codes')
    results.download_quota_logs = await ensureCollection('download_quota_logs')
    results.vip_packages_config = await ensureCollection('vip_packages_config')

    // 如果集合创建成功，初始化套餐数据
    if (results.vip_packages_config) {
      results.vip_packages_data = await initVipPackagesData()
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
