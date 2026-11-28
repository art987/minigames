#!/usr/bin/env node
/**
 * cnpv 存量视频迁移脚本：本地 videos/ 双写上传（七牛 + R2），并灌入云数据库
 *
 * 用法（在仓库根目录或 tools/cnpv 下执行）：
 *   node tools/cnpv/sync-videos.js --dry-run          预览，不上传
 *   node tools/cnpv/sync-videos.js --limit 1          只传 1 个试跑
 *   node tools/cnpv/sync-videos.js                    全量双写 + 导入数据库
 *   node tools/cnpv/sync-videos.js --no-import        只上传，不导入数据库
 *   node tools/cnpv/sync-videos.js --force            忽略断点记录重新上传
 *
 * 断点续传：tools/cnpv/sync-state.json（已成功的不重复上传）
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const qiniu = require('qiniu');
const dotenv = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ROOT = path.join(__dirname, '../..');
const CNPV_DIR = path.join(__dirname);
const STATE_FILE = path.join(__dirname, 'sync-state.json');

// ===== 配置 =====
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET_NAME;
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_PUBLIC_BASE = 'https://pub-30c6f2f6d33a4cf0b874265d80d1e682.r2.dev';

const QINIU_AK = process.env.QINIU_ACCESS_KEY;
const QINIU_SK = process.env.QINIU_SECRET_KEY;
const QINIU_BUCKET = process.env.QINIU_BUCKET || 'posterbg';
const QINIU_DOMAIN = process.env.QINIU_DOMAIN || '7ncdn.peacelove.top';
const QINIU_UPLOAD_URL = 'https://up-z2.qiniup.com';

const ADMIN_USER = process.env.CNPV_ADMIN_USER || '15160029349';
const ADMIN_PASS = process.env.CNPV_ADMIN_PASS || '123456';
const GATEWAY = 'https://api.peacelove.top';

const CONCURRENCY = 3;
const RETRY = 2;

// ===== 参数 =====
const args = process.argv.slice(2);
const opts = {
  dryRun: args.includes('--dry-run'),
  force: args.includes('--force'),
  noImport: args.includes('--no-import'),
  limit: (() => { const i = args.indexOf('--limit'); return i >= 0 ? parseInt(args[i + 1], 10) : 0; })(),
};

if (!opts.dryRun && (!R2_ACCESS_KEY_ID || !QINIU_AK)) {
  console.error('❌ 缺少 R2/七牛凭证，请检查根目录 .env');
  process.exit(1);
}

// ===== 解析 index.html 的 DATA =====
function parseData() {
  const html = fs.readFileSync(path.join(CNPV_DIR, 'index.html'), 'utf8');
  const m = html.match(/(?:const|let) DATA = (\[.*?\]);?\s*\n/s);
  if (!m) throw new Error('index.html 中未找到 DATA');
  return JSON.parse(m[1]);
}

// key 规范：cnpv/videos/05-技法/trace01.mp4（扩展名统一小写）
function buildKey(relPath) {
  return 'cnpv/' + relPath.replace(/\\/g, '/').replace(/\.(MP4|MOV|AVI)$/i, ext => ext.toLowerCase());
}

function encodedUrl(base, key) {
  // encodeURIComponent 后恢复斜杠
  return `${base}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

// ===== 本地文件索引（大小写不敏感匹配） =====
function indexLocalFiles() {
  const map = new Map(); // 小写相对路径 -> 绝对路径
  const walk = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else map.set(path.relative(CNPV_DIR, p).replace(/\\/g, '/').toLowerCase(), p);
    }
  };
  walk(CNPV_DIR);
  return map;
}

// ===== 上传 =====
const mac = new qiniu.auth.digest.Mac(QINIU_AK, QINIU_SK);
const qiniuConfig = new qiniu.conf.Config();
qiniuConfig.useHttpsDomain = true;
qiniuConfig.zone = qiniu.zone.Zone_z2;
const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);

function uploadQiniu(localPath, key) {
  return new Promise((resolve, reject) => {
    const putPolicy = new qiniu.rs.PutPolicy({ scope: `${QINIU_BUCKET}:${key}` });
    const token = putPolicy.uploadToken(mac);
    formUploader.putFile(token, key, localPath, new qiniu.form_up.PutExtra(), (err, body, info) => {
      if (err) return reject(err);
      if (info.statusCode === 200) return resolve(body);
      reject(new Error(`七牛 ${info.statusCode}: ${body && body.error}`));
    });
  });
}

let s3 = null;
function getS3() {
  if (!s3) {
    s3 = new S3Client({
      region: 'auto',
      endpoint: R2_ENDPOINT,
      credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
    });
  }
  return s3;
}

async function uploadR2(localPath, key) {
  const body = await fs.promises.readFile(localPath);
  await getS3().send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: body,
    ContentType: key.toLowerCase().endsWith('.mp4') ? 'video/mp4' : 'application/octet-stream',
  }));
}

async function withRetry(fn, label) {
  let lastErr;
  for (let i = 0; i <= RETRY; i++) {
    try { return await fn(); } catch (e) { lastErr = e; console.warn(`  ⚠️ ${label} 第${i + 1}次失败: ${e.message}`); }
  }
  throw lastErr;
}

// ===== 主流程 =====
async function main() {
  const DATA = parseData();
  const localMap = indexLocalFiles();

  // 汇总任务
  const tasks = [];
  const missing = [];
  const seen = new Set();
  for (const cat of DATA) {
    cat.sections.forEach((sec, si) => {
      sec.items.forEach((it, ii) => {
        if (!it.s) return;
        const rel = it.s.replace(/^videos\//, 'videos/').replace(/\\/g, '/');
        const localPath = localMap.get(rel.toLowerCase());
        if (!localPath) { missing.push(rel); return; }
        const key = buildKey(it.s);
        if (seen.has(key)) return;
        seen.add(key);
        tasks.push({
          key,
          localPath,
          size: fs.statSync(localPath).size,
          catName: cat.name,
          secTitle: sec.title,
          title: it.l || '',
          type: it.t || 'v',
          catOrder: DATA.indexOf(cat),
          secOrder: si,
          order: ii,
        });
      });
    });
  }

  console.log(`任务: ${tasks.length} 个文件，共 ${(tasks.reduce((a, t) => a + t.size, 0) / 1024 / 1024 / 1024).toFixed(2)} GB`);
  if (missing.length) console.log(`⚠️ ${missing.length} 个 DATA 条目本地不存在（跳过）:\n  ${missing.join('\n  ')}`);

  // 断点
  let state = {};
  if (!opts.force && fs.existsSync(STATE_FILE)) {
    try { state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch (e) { state = {}; }
  }

  let list = tasks.filter(t => opts.force || !state[t.key]);
  if (opts.limit) list = list.slice(0, opts.limit);
  const skipCount = tasks.length - list.length;
  if (skipCount) console.log(`断点跳过（已完成）: ${skipCount} 个`);
  if (opts.dryRun) {
    console.log('\n=== 预览（dry-run，不上传）===');
    list.slice(0, 20).forEach(t => console.log(`  ${t.key}  (${(t.size / 1024 / 1024).toFixed(1)}MB)  ${t.catName}/${t.secTitle}/${t.title}`));
    if (list.length > 20) console.log(`  ... 共 ${list.length} 个`);
    return;
  }

  console.log(`待上传: ${list.length} 个，并发 ${CONCURRENCY}`);
  let done = 0, failed = [];
  const startTime = Date.now();

  async function worker(queue) {
    while (queue.length) {
      const t = queue.shift();
      try {
        await withRetry(() => uploadQiniu(t.localPath, t.key), `七牛 ${t.key}`);
        await withRetry(() => uploadR2(t.localPath, t.key), `R2 ${t.key}`);
        state[t.key] = { size: t.size, at: new Date().toISOString() };
        fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 1));
        done++;
        const speed = done / ((Date.now() - startTime) / 1000 / 60);
        const etaMin = (queue.length + 1) / Math.max(speed, 0.01);
        console.log(`  ✅ [${done}/${list.length}] ${t.key} (${(t.size / 1024 / 1024).toFixed(1)}MB, 预计剩余 ${etaMin.toFixed(0)} 分钟)`);
      } catch (e) {
        failed.push({ key: t.key, error: e.message });
        console.error(`  ❌ ${t.key}: ${e.message}`);
      }
    }
  }

  const queue = [...list];
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, queue.length) }, () => worker(queue)));
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 1));

  console.log(`\n上传完成: 成功 ${done}，失败 ${failed.length}`);
  if (failed.length) {
    console.log('失败列表:');
    failed.forEach(f => console.log(`  ${f.key}: ${f.error}`));
    console.log('重新运行本脚本可只补传失败项（断点续传）。');
    if (done === 0) return;
  }

  if (opts.noImport) {
    console.log('已跳过数据库导入');
    return;
  }

  // ===== 导入数据库（按栏目分块，规避网关 payload 限制） =====
  console.log('\n导入数据库 (batchImport，按栏目分块)...');
  const keyMap = {};
  for (const t of tasks) keyMap[t.key] = t;

  async function importChunk(body, label) {
    const res = await fetch(`${GATEWAY}/cnpv-manage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.success) throw new Error(`${label}: ${json.message}`);
    return json.data;
  }

  const auth = { adminUserId: ADMIN_USER, adminPassword: ADMIN_PASS };
  await importChunk({ action: 'batchImport', actionData: { reset: true }, ...auth }, 'reset');
  console.log('  数据已清空，开始分块导入');

  let totalWritten = 0;
  for (let ci = 0; ci < DATA.length; ci++) {
    const cat = DATA[ci];
    for (let si = 0; si < cat.sections.length; si++) {
      const sec = cat.sections[si];
      const videos = [];
      sec.items.forEach((it, ii) => {
        if (!it.s) return;
        const key = buildKey(it.s);
        const t = keyMap[key];
        if (!t) return; // 本地缺失
        videos.push({
          title: t.title,
          fileKey: it.s,
          type: t.type,
          r2Url: encodedUrl(R2_PUBLIC_BASE, key),
          qiniuUrl: encodedUrl(`https://${QINIU_DOMAIN}`, key),
          order: ii,
        });
      });
      if (!videos.length) continue;
      const r = await importChunk({
        action: 'batchImport',
        ...auth,
        actionData: { category: { name: cat.name, order: ci, sections: [{ title: sec.title, order: si, videos }] } },
      }, `${cat.name}/${sec.title}`);
      totalWritten += r.videosWritten || 0;
      console.log(`  ✅ ${cat.name} / ${sec.title}: ${videos.length} 条`);
    }
  }
  console.log(`✅ 导入完成，共写入 ${totalWritten} 条视频记录`);
}

main().catch(err => {
  console.error('脚本执行失败:', err);
  process.exit(1);
});
