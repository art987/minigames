const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// CORS 响应头
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

// ===== 独立后台密码（与 cnpv-manage 一致，可被环境变量覆盖） =====
const ADMIN_USER = process.env.CNPV_ADMIN_USER || '15160029349'
const ADMIN_PASS = process.env.CNPV_ADMIN_PASS || '123456'

// ===== 七牛（华南 z2） =====
const QINIU_AK = process.env.QINIU_ACCESS_KEY || '4TVRjmuj-nLeEcwFFOCbCBMiWlQR2BYt2Ee4ZPdb'
const QINIU_SK = process.env.QINIU_SECRET_KEY || 'C_y75p4asBDZ22BJ0JjGl1I1CsBSUcoiixDG262O'
const QINIU_BUCKET = process.env.QINIU_BUCKET || 'posterbg'
const QINIU_DOMAIN = 'https://7ncdn.peacelove.top'
const QINIU_UPLOAD_URL = 'https://up-z2.qiniup.com'

function qiniuSafe64(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
}

function makeQiniuToken(key) {
  const putPolicy = JSON.stringify({
    scope: `${QINIU_BUCKET}:${key}`,
    deadline: Math.floor(Date.now() / 1000) + 3600
  })
  const encoded = qiniuSafe64(Buffer.from(putPolicy))
  const sign = qiniuSafe64(crypto.createHmac('sha1', QINIU_SK).update(encoded).digest())
  return `${QINIU_AK}:${sign}:${encoded}`
}

// ===== R2（S3 兼容，SigV4 预签名 PUT，免 SDK 纯 crypto 实现） =====
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '13a8e4d0cec2c8548de10e2f701ad6de'
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'fdc78645af8ea49cb1f5b4ae7a6a4c3b'
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || '2a7ae7e3e4339ea3d1be100dce5a31179612f7614e5b99df57c49a5e9543a5bc'
const R2_BUCKET = process.env.R2_BUCKET_NAME || 'postdiy'
const R2_PUBLIC_BASE = 'https://pub-30c6f2f6d33a4cf0b874265d80d1e682.r2.dev'

const hmac = (key, data) => crypto.createHmac('sha256', key).update(data).digest()
const sha256hex = (data) => crypto.createHash('sha256').update(data).digest('hex')
const encodeRfc3986 = (str) => encodeURIComponent(String(str)).replace(/[!'()*]/g, ch => '%' + ch.charCodeAt(0).toString(16).toUpperCase())

function presignR2Put(key, expiresInSeconds) {
  const host = `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
  const canonicalUri = `/${R2_BUCKET}/${key.split('/').map(encodeRfc3986).join('/')}`
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)
  const scope = `${dateStamp}/auto/s3/aws4_request`
  const query = {
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': `${R2_ACCESS_KEY_ID}/${scope}`,
    'X-Amz-Date': amzDate,
    'X-Amz-Expires': String(expiresInSeconds),
    'X-Amz-SignedHeaders': 'host'
  }
  const canonicalQuery = Object.keys(query).sort()
    .map(k => `${encodeRfc3986(k)}=${encodeRfc3986(query[k])}`).join('&')
  const canonicalRequest = [
    'PUT', canonicalUri, canonicalQuery, `host:${host}\n`, 'host', 'UNSIGNED-PAYLOAD'
  ].join('\n')
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256hex(canonicalRequest)].join('\n')
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${R2_SECRET_ACCESS_KEY}`, dateStamp), 'auto'), 's3'), 'aws4_request')
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex')
  return `https://${host}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`
}

exports.main = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  let body
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || event
  } catch (e) {
    return response(false, '参数解析失败')
  }

  const { adminUserId, adminPassword, key } = body || {}
  if (!(String(adminUserId || '') === ADMIN_USER && String(adminPassword || '') === ADMIN_PASS)) {
    return response(false, '账号或密码错误')
  }

  // key 必须在 cnpv/ 前缀下，且不允许路径穿越
  const safeKey = String(key || '').trim()
  if (!safeKey.startsWith('cnpv/') || safeKey.includes('..') || safeKey.length > 400) {
    return response(false, '非法的文件 key，必须以 cnpv/ 开头')
  }

  try {
    return response(true, {
      key: safeKey,
      qiniu: {
        token: makeQiniuToken(safeKey),
        uploadUrl: QINIU_UPLOAD_URL,
        fileUrl: `${QINIU_DOMAIN}/${encodeRfc3986(safeKey).replace(/%2F/g, '/')}`
      },
      r2: {
        uploadUrl: presignR2Put(safeKey, 3600),
        fileUrl: `${R2_PUBLIC_BASE}/${encodeRfc3986(safeKey).replace(/%2F/g, '/')}`
      }
    })
  } catch (e) {
    console.error('[cnpv-upload-token] error', e)
    return response(false, '签发失败: ' + e.message)
  }
}
