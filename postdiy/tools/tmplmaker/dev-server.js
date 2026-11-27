/**
 * tmplmaker 本地开发服务器
 * - 静态托管 price-maker.html 及 assets（替代 python -m http.server）
 * - POST /api/save-css { tpl, css }：把调试面板生成的规则按选择器合并覆盖
 *   写回 assets/css/templates/<tpl>.css（写前自动备份为 .bak）
 *
 * 用法: node dev-server.js   （默认端口 8098，可用环境变量 PORT 覆盖）
 * 仅监听 127.0.0.1，只允许写入 templates 目录内的 <模板号>.css
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TPL_DIR = path.join(ROOT, 'assets', 'css', 'templates');
const PORT = Number(process.env.PORT || 8098);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.zip': 'application/zip',
  '.md': 'text/plain; charset=utf-8'
};

function send(res, code, data, type) {
  res.writeHead(code, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-cache',  // 开发服务禁缓存，覆盖 CSS 后刷新立即生效
    'Access-Control-Allow-Origin': '*'  // 允许 file:// 或其它端口打开的页面调用写回接口
  });
  res.end(data);
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 解析传入 css 中的规则块（选择器 + 声明体） */
function parseRules(css) {
  const rules = [];
  const re = /([^\n{}]+)\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const sel = m[1].replace(/\/\*[\s\S]*?\*\//g, '').trim().replace(/\s+/g, ' ');
    const body = m[2].split('\n').map(function (l) { return l.trim(); })
      .filter(Boolean).map(function (l) { return '  ' + l; }).join('\n');
    if (sel && body) rules.push({ sel: sel, body: body });
  }
  return rules;
}

/** 把传入规则按选择器合并进模板文件：同名规则整体替换，不存在则追加 */
function mergeCss(file, tpl, incoming) {
  const rules = parseRules(incoming);
  if (!rules.length) throw new Error('未解析到任何 CSS 规则');

  let text = '';
  try { text = fs.readFileSync(file, 'utf8'); } catch (e) {
    text = '/* 模板 ' + tpl + ' */\n';
  }
  // 写前备份
  try { fs.writeFileSync(file + '.bak', text); } catch (e) { /* 忽略备份失败 */ }

  let replaced = 0;
  const appended = [];
  for (const r of rules) {
    // 选择器内部空白容错匹配整个规则块
    const pat = escapeRe(r.sel).replace(/\s+/g, '\\s+') + '\\s*\\{[^}]*\\}';
    const block = r.sel + ' {\n' + r.body + '\n}';
    if (new RegExp(pat).test(text)) {
      text = text.replace(new RegExp(pat), function () { return block; });
      replaced++;
    } else {
      text = text.replace(/\s*$/, '\n') + '\n' + block + '\n';
      appended.push(r.sel);
    }
  }
  fs.writeFileSync(file, text);
  // 关键：同步 bump price-maker.html 里的全局模板 CSS 版本号（TMPL_CSS_V）。
  // 模板样式表现在是按需动态加载，URL 里统一用 ?v=TMPL_CSS_V；
  // Trae 内置浏览器等按 URL 缓存 CSS（无视 no-store），v 号不变就会一直用旧缓存。
  try {
    const htmlPath = path.join(ROOT, 'price-maker.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    const vre = /(window\.TMPL_CSS_V\s*=\s*)(\d+)/;
    if (vre.test(html)) {
      html = html.replace(vre, function (m, p1, p2) { return p1 + (Number(p2) + 1); });
      fs.writeFileSync(htmlPath, html);
    }
  } catch (e) { /* 版本号 bump 失败不影响写回 */ }
  return { replaced: replaced, appended: appended };
}

const server = http.createServer(function (req, res) {
  const url = new URL(req.url, 'http://127.0.0.1');

  // CORS 预检
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/save-css') {
    let body = '';
    req.on('data', function (c) {
      body += c;
      if (body.length > 2e6) req.destroy();
    });
    req.on('end', function () {
      try {
        const data = JSON.parse(body);
        const tpl = String(data.tpl || '');
        if (!/^[A-Za-z]{1,3}\d{1,3}$/.test(tpl)) throw new Error('非法模板号: ' + tpl);
        if (!data.css || typeof data.css !== 'string') throw new Error('css 内容为空');
        const file = path.join(TPL_DIR, tpl + '.css');
        if (path.dirname(file) !== TPL_DIR) throw new Error('路径非法');
        const r = mergeCss(file, tpl, data.css);
        console.log('[save-css] ' + tpl + '.css 替换 ' + r.replaced + ' 条, 新增 ' + r.appended.length + ' 条');
        send(res, 200, JSON.stringify({ ok: true, file: 'assets/css/templates/' + tpl + '.css', replaced: r.replaced, appended: r.appended }), 'application/json');
      } catch (e) {
        console.error('[save-css] 失败: ' + e.message);
        send(res, 400, JSON.stringify({ ok: false, error: e.message }), 'application/json');
      }
    });
    return;
  }

  // 静态文件
  let p;
  try { p = decodeURIComponent(url.pathname); } catch (e) { p = '/'; }
  // 兼容带目录前缀的访问：/tools/tmplmaker/xxx → /xxx
  const PREFIX = '/tools/tmplmaker/';
  if (p.toLowerCase().indexOf(PREFIX) === 0) p = p.slice(PREFIX.length - 1);
  if (p === '/') p = '/price-maker.html';
  const file = path.normalize(path.join(ROOT, p));
  if (file !== ROOT && file.indexOf(ROOT + path.sep) !== 0) {
    send(res, 403, 'forbidden');
    return;
  }
  fs.readFile(file, function (err, buf) {
    if (err) { send(res, 404, '404 not found: ' + p); return; }
    send(res, 200, buf, MIME[path.extname(file).toLowerCase()] || 'application/octet-stream');
  });
});

server.listen(PORT, '127.0.0.1', function () {
  console.log('tmplmaker dev server: http://127.0.0.1:' + PORT + '/price-maker.html');
  console.log('save-css API: POST http://127.0.0.1:' + PORT + '/api/save-css');
});
