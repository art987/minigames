const express = require('express');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname)));

app.get('/sync', (req, res) => {
  const { dir, dryRun, verbose, cloud } = req.query;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const args = [];
  if (dryRun === 'true') args.push('--dry-run');
  if (verbose === 'true') args.push('--verbose');
  if (dir) {
    args.push('--dir');
    args.push(dir);
  }

  let script = 'sync.js';
  if (cloud === 'r2') {
    args.unshift('--cloud=r2');
  } else if (cloud === 'qiniu') {
    args.unshift('--cloud=qiniu');
  }

  const child = spawn('node', [path.join(__dirname, script), ...args], {
    cwd: path.join(__dirname, '..'),
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
  });

  const sendEvent = (type, data) => {
    try {
      res.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
    } catch (e) {
      console.error('SSE write error:', e);
    }
  };

  child.stdout.on('data', (data) => {
    const lines = data.toString('utf8').split('\n').filter(line => line.trim());
    lines.forEach(line => {
      sendEvent('log', line);
    });
  });

  child.stderr.on('data', (data) => {
    const lines = data.toString('utf8').split('\n').filter(line => line.trim());
    lines.forEach(line => {
      sendEvent('error', line);
    });
  });

  child.on('close', (code) => {
    sendEvent('close', { code });
    setTimeout(() => res.end(), 1000);
  });

  child.on('error', (err) => {
    sendEvent('error', `启动同步进程失败: ${err.message}`);
    res.end();
  });

  req.on('close', () => {
    child.kill();
  });
});

app.get('/status', (req, res) => {
  res.json({ status: 'ready', port: PORT });
});

const PORT = 3456;
server.listen(PORT, 'localhost', () => {
  console.log(`图片同步服务已启动: http://localhost:${PORT}/r2-sync-ui.html`);
});
