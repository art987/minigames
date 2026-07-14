/**
 * 本地开发服务器
 * 支持 URL 重写：/editor → /editor.html
 * 使用方法：node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = 8080;
const ROOT_DIR = __dirname;

// MIME 类型映射
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip'
};

// 需要重写的路径（无扩展名 → .html）
const REWRITE_PATHS = ['/editor', '/index', '/about/index', '/about/info'];

// 自动检测可用端口
function startServer(port) {
  const serverInstance = http.createServer((req, res) => {
    let requestPath = req.url.split('?')[0];

    // URL 重写：将 /editor 重写为 /editor.html
    if (REWRITE_PATHS.includes(requestPath)) {
      requestPath += '.html';
    }

    // 解析文件路径
    let filePath = path.join(ROOT_DIR, requestPath);

    // 如果路径是目录，尝试添加 index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // 检查文件是否存在
    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        // 文件不存在，返回 404
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>404 - 文件未找到</h1><p>请求路径: ${requestPath}</p>`);
        return;
      }

      // 获取文件扩展名
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      // 读取并返回文件
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<h1>500 - 服务器错误</h1>');
          return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });
  });

  serverInstance.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`端口 ${port} 已被占用，尝试端口 ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('服务器错误:', err);
    }
  });

  serverInstance.listen(port, () => {
    console.log(`\n🚀 本地开发服务器已启动！\n`);
    console.log(`   访问地址: http://localhost:${port}/`);
    console.log(`   编辑器页面: http://localhost:${port}/editor?templateId=dashu-2024-001`);
    console.log(`\n   按 Ctrl+C 停止服务器\n`);
  });
}

// 从默认端口开始尝试
startServer(DEFAULT_PORT);