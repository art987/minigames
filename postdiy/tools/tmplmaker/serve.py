# -*- coding: utf-8 -*-
"""本地预览服务器（带禁缓存响应头 + gzip 压缩）。
   用法：python serve.py  （替代 python -m http.server 8123）
   - 所有响应带 Cache-Control: no-store，浏览器每次都重新拉取
   - 文本类资源（HTML/CSS/JS/JSON/SVG）自动 gzip，传输体积减少 70%+
   - Range 请求不支持：本工具仅用于本地预览"""
import os
import gzip
import http.server
import socketserver

PORT = 8123
GZIP_TYPES = ('text/html', 'text/css', 'text/javascript', 'application/javascript',
              'application/json', 'image/svg+xml', 'text/plain')


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            path = os.path.join(path, 'index.html')
        if not os.path.isfile(path):
            self.send_error(404, 'not found')
            return
        ctype = self.guess_type(path)
        try:
            with open(path, 'rb') as f:
                data = f.read()
        except OSError:
            self.send_error(404, 'not found')
            return
        headers = [
            ('Content-Type', ctype),
            ('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0'),
            ('Pragma', 'no-cache'),
            ('Expires', '0'),
        ]
        accept = self.headers.get('Accept-Encoding', '')
        if ctype in GZIP_TYPES and 'gzip' in accept and len(data) > 1024:
            data = gzip.compress(data, 6)
            headers.append(('Content-Encoding', 'gzip'))
        headers.append(('Content-Length', str(len(data))))
        self.send_response(200)
        for k, v in headers:
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        pass  # 静默访问日志


class ThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


if __name__ == '__main__':
    with ThreadingTCPServer(('', PORT), NoCacheHandler) as httpd:
        print(f'预览服务器已启动: http://localhost:{PORT}/price-maker.html （禁缓存 + gzip）')
        httpd.serve_forever()
