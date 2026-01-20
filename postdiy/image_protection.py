#!/usr/bin/env python3
"""
图片保护模块 - 用于验证图片访问权限
"""

import os
import hashlib
import time
from urllib.parse import urlparse, unquote

class ImageProtection:
    def __init__(self, base_path):
        self.base_path = base_path
        self.allowed_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.webp'}
        self.valid_templates = self._load_valid_templates()
    
    def _load_valid_templates(self):
        """加载有效的模板列表"""
        valid_templates = set()
        
        # 扫描images目录下的所有模板图片
        images_dir = os.path.join(self.base_path, 'images')
        if os.path.exists(images_dir):
            for root, dirs, files in os.walk(images_dir):
                for file in files:
                    if any(file.lower().endswith(ext) for ext in self.allowed_extensions):
                        # 获取相对路径
                        rel_path = os.path.relpath(os.path.join(root, file), self.base_path)
                        valid_templates.add(rel_path.replace('\\', '/'))
        
        return valid_templates
    
    def validate_image_access(self, image_path, referer=None):
        """验证图片访问权限"""
        
        # 解码URL路径
        decoded_path = unquote(image_path)
        
        # 检查是否为有效模板图片
        if decoded_path not in self.valid_templates:
            return False, "无效的图片路径"
        
        # 检查文件是否存在
        full_path = os.path.join(self.base_path, decoded_path)
        if not os.path.exists(full_path):
            return False, "图片文件不存在"
        
        # 检查文件扩展名
        _, ext = os.path.splitext(full_path)
        if ext.lower() not in self.allowed_extensions:
            return False, "不支持的文件类型"
        
        # 检查引用来源（可选）
        if referer:
            # 验证referer是否来自合法域名
            parsed_referer = urlparse(referer)
            if parsed_referer.netloc and parsed_referer.netloc not in ['localhost', '127.0.0.1']:
                return False, "非法访问来源"
        
        return True, "访问验证通过"
    
    def generate_protected_url(self, image_path, expires_in=3600):
        """生成带时间戳的受保护URL"""
        timestamp = int(time.time()) + expires_in
        
        # 创建签名
        secret = "postdiy_secret_key_2024"
        signature_data = f"{image_path}|{timestamp}|{secret}"
        signature = hashlib.md5(signature_data.encode()).hexdigest()
        
        return f"{image_path}?t={timestamp}&s={signature}"
    
    def verify_protected_url(self, protected_url):
        """验证受保护URL的有效性"""
        try:
            # 解析URL参数
            parsed = urlparse(protected_url)
            params = dict(p.split('=') for p in parsed.query.split('&') if '=' in p)
            
            timestamp = int(params.get('t', 0))
            signature = params.get('s', '')
            
            # 检查时间戳是否过期
            if time.time() > timestamp:
                return False, "URL已过期"
            
            # 验证签名
            image_path = parsed.path.lstrip('/')
            secret = "postdiy_secret_key_2024"
            expected_signature = hashlib.md5(f"{image_path}|{timestamp}|{secret}".encode()).hexdigest()
            
            if signature != expected_signature:
                return False, "签名验证失败"
            
            return True, "URL验证通过"
            
        except Exception as e:
            return False, f"URL验证错误: {str(e)}"

# 使用示例
if __name__ == "__main__":
    protection = ImageProtection(os.path.dirname(__file__))
    
    # 测试验证功能
    test_path = "images/chuxi/1.png"
    is_valid, message = protection.validate_image_access(test_path)
    print(f"验证结果: {is_valid}, 消息: {message}")
    
    # 测试受保护URL生成
    protected_url = protection.generate_protected_url(test_path)
    print(f"受保护URL: {protected_url}")
    
    # 测试URL验证
    is_url_valid, url_message = protection.verify_protected_url(protected_url)
    print(f"URL验证结果: {is_url_valid}, 消息: {url_message}")