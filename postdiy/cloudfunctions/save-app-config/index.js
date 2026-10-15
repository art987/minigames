const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// CORS 响应头（网页端配置管理页走 HTTP 网关保存）
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

function response(success, dataOrMessage) {
  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify(
      success
        ? { success: true, data: dataOrMessage }
        : { success: false, message: dataOrMessage }
    )
  }
}

// 统一后台管理员鉴权（与 admin-auth.js / admin-vip-packages 等保持一致）
const ADMIN_USER_ID = '15160029349'
const ADMIN_PASSWORD = '123456'
// 兼容旧独立密钥通道（管理页已迁移至 sam 统一后台；也可用环境变量 ADMIN_KEY 覆盖）
const ADMIN_KEY = process.env.ADMIN_KEY || 'xm-postdiy-2026'

// 双通道校验：统一后台账号 或 旧独立密钥，任一通过即可
function checkAdmin(adminUserId, adminPassword, adminKey) {
  if (
    adminUserId && adminPassword &&
    String(adminUserId) === ADMIN_USER_ID && String(adminPassword) === ADMIN_PASSWORD
  ) return true
  if (adminKey && String(adminKey) === ADMIN_KEY) return true
  return false
}

// 与 get-app-config 一致的默认值/字段边界
const DEFAULT_CONFIG = {
  smsNotice: '验证码由 【上海探索好科技】发送，请注意查收',
  registerBonus: 5,
  brandBonus: {
    logo: 3,
    qrcode: 3,
    name: 1,
    promo: 3
  }
}

function numOr(v, def) {
  const n = Number(v)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : def
}

// 规整入参配置：只接受已知字段，类型非法回退默认值（避免脏数据进库）
function normalizeConfig(input) {
  const src = input && typeof input === 'object' ? input : {}
  const bb = src.brandBonus && typeof src.brandBonus === 'object' ? src.brandBonus : {}
  return {
    smsNotice:
      typeof src.smsNotice === 'string' && src.smsNotice.trim()
        ? src.smsNotice.trim().slice(0, 100)
        : DEFAULT_CONFIG.smsNotice,
    registerBonus: numOr(src.registerBonus, DEFAULT_CONFIG.registerBonus),
    brandBonus: {
      logo: numOr(bb.logo, DEFAULT_CONFIG.brandBonus.logo),
      qrcode: numOr(bb.qrcode, DEFAULT_CONFIG.brandBonus.qrcode),
      name: numOr(bb.name, DEFAULT_CONFIG.brandBonus.name),
      promo: numOr(bb.promo, DEFAULT_CONFIG.brandBonus.promo)
    }
  }
}

exports.main = async (event) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  // 兼容两种入参：HTTP 网关（body 为 JSON 字符串）/ callFunction 直调（event 即参数）
  let body
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || event
  } catch (e) {
    return response(false, '参数解析失败')
  }

  const { adminKey, adminUserId, adminPassword, config } = body || {}
  if (!checkAdmin(adminUserId, adminPassword, adminKey)) {
    return response(false, '鉴权失败，请重新登录后台')
  }

  try {
    const data = normalizeConfig(config)
    // doc().set() 为 upsert：main 文档不存在时自动创建
    await db.collection('app_config').doc('main').set({
      data: { ...data, updateTime: db.serverDate() }
    })
    return response(true, data)
  } catch (e) {
    // 集合不存在时自动创建后重试一次
    const isCollectionNotExist =
      e.errCode === 'DATABASE_COLLECTION_NOT_EXIST' ||
      (e.message && (e.message.includes('collection not exists') || e.message.includes('DATABASE_COLLECTION_NOT_EXIST')))
    if (isCollectionNotExist) {
      try {
        await db.createCollection('app_config')
        const data = normalizeConfig(config)
        await db.collection('app_config').doc('main').set({
          data: { ...data, updateTime: db.serverDate() }
        })
        return response(true, data)
      } catch (retryErr) {
        console.error('创建 app_config 集合后写入仍失败:', retryErr)
      }
    }
    console.error('save-app-config 错误:', e)
    return response(false, '保存失败，请稍后重试')
  }
}
