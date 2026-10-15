const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// CORS 响应头（网页端配置管理页/网页编辑器直接走 HTTP 网关读取）
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

// 默认配置：app_config.main 缺失/字段损坏时的兜底值（前端、云函数保持同一套默认值；
// 管理后台保存后此处的值仅作为缺省兜底，实际以云端保存值为准）
const DEFAULT_CONFIG = {
  // 发送验证码成功后的提示文案
  smsNotice: '验证码由 【上海探索好科技】发送，请注意查收',
  // 新用户注册赠送下载次数
  registerBonus: 5,
  // 完善品牌信息分项奖励（每项终身限领一次）
  brandBonus: {
    logo: 3,   // 商家 Logo
    qrcode: 3, // 商家二维码
    name: 1,   // 商家名称
    promo: 3   // 商家引流文案
  },
  // 登录页品牌区轮播文案（多条时定时轮番切换）
  loginSlogans: ['覆盖全年朋友圈节日节气海报', '自定义品牌 - 操作简单 - 原创模板授权'],
  // VIP 页虚拟支付声明横幅是否显示
  showVpayBanner: true
}

// 数值字段规整：非负整数，非法回退默认值
function numOr(v, def) {
  const n = Number(v)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : def
}

// 字符串数组规整：去空格/去空项/每条限 60 字/最多 6 条
function strArrayOr(v, def) {
  if (!Array.isArray(v)) return def
  const list = v
    .map((s) => String(s == null ? '' : s).trim().slice(0, 60))
    .filter(Boolean)
  return list.length > 0 ? list.slice(0, 6) : def
}

// 布尔字段规整：仅接受 true/false，非法回退默认值
function boolOr(v, def) {
  return typeof v === 'boolean' ? v : def
}

// 读取并规整配置；集合/文档不存在时自动建集合并返回默认值
async function readConfig() {
  try {
    const res = await db.collection('app_config').doc('main').get()
    const c = (res && res.data) || {}
    const bb = c.brandBonus && typeof c.brandBonus === 'object' ? c.brandBonus : {}
    return {
      smsNotice:
        typeof c.smsNotice === 'string' && c.smsNotice.trim()
          ? c.smsNotice
          : DEFAULT_CONFIG.smsNotice,
      registerBonus: numOr(c.registerBonus, DEFAULT_CONFIG.registerBonus),
      brandBonus: {
        logo: numOr(bb.logo, DEFAULT_CONFIG.brandBonus.logo),
        qrcode: numOr(bb.qrcode, DEFAULT_CONFIG.brandBonus.qrcode),
        name: numOr(bb.name, DEFAULT_CONFIG.brandBonus.name),
        promo: numOr(bb.promo, DEFAULT_CONFIG.brandBonus.promo)
      },
      loginSlogans: strArrayOr(c.loginSlogans, DEFAULT_CONFIG.loginSlogans),
      showVpayBanner: boolOr(c.showVpayBanner, DEFAULT_CONFIG.showVpayBanner)
    }
  } catch (e) {
    // 集合不存在 → 创建后返回默认值；其它异常（含文档不存在）也返回默认值
    const isCollectionNotExist =
      e.errCode === 'DATABASE_COLLECTION_NOT_EXIST' ||
      (e.message && (e.message.includes('collection not exists') || e.message.includes('DATABASE_COLLECTION_NOT_EXIST')))
    if (isCollectionNotExist) {
      try {
        await db.createCollection('app_config')
      } catch (createErr) {
        console.error('创建 app_config 集合失败:', createErr)
      }
    }
    console.error('读取 app_config 失败（返回默认配置）:', e)
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG))
  }
}

exports.main = async (event) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  try {
    const config = await readConfig()
    return response(true, config)
  } catch (error) {
    console.error('get-app-config 错误:', error)
    return response(false, '读取配置失败，请稍后重试')
  }
}
