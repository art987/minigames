# -*- coding: utf-8 -*-
"""
中国古画高清图片自动下载脚本
功能：自动从gallery.js中提取画作名称，然后从百度图片搜索并下载高清图片
作者：AI助手
使用说明：
1. 确保已安装Python 3和必要的库：pip install requests beautifulsoup4 pillow matplotlib
2. 将此脚本放在gallery文件夹中
3. 运行脚本：python auto_download_highres.py
4. 下载的高清图片会保存在highres_downloads文件夹中
"""

import os
import re
import json
import time
import requests
import logging
from urllib.parse import quote

# 尝试导入第三方库，如果失败给出友好提示
try:
    from bs4 import BeautifulSoup
except ImportError:
    print("错误: 未找到bs4库。请使用 pip install beautifulsoup4 安装")
    exit(1)

try:
    from PIL import Image
    from io import BytesIO
except ImportError:
    print("错误: 未找到PIL库。请使用 pip install pillow 安装")
    exit(1)

try:
    import matplotlib.pyplot as plt
    plt.rcParams["font.family"] = ["SimHei", "WenQuanYi Micro Hei", "Heiti TC"]
except ImportError:
    print("警告: 未找到matplotlib库。部分功能可能受限。请使用 pip install matplotlib 安装")

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class GalleryImageDownloader:
    def __init__(self):
        self.gallery_js_path = 'gallery.js'
        self.download_folder = 'highres_downloads'
        self.user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': self.user_agent})

    def create_download_folder(self):
        """创建下载文件夹"""
        if not os.path.exists(self.download_folder):
            os.makedirs(self.download_folder)
            logger.info(f"创建下载文件夹: {self.download_folder}")
    
    def extract_paintings_info(self):
        """从gallery.js中提取画作信息"""
        logger.info(f"正在从{self.gallery_js_path}中提取画作信息...")
        
        try:
            with open(self.gallery_js_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # 使用正则表达式提取famousPaintings数组
                match = re.search(r'const famousPaintings = \[([\s\S]*?)\];', content)
                if not match:
                    logger.error("未找到famousPaintings数组")
                    return []
                
                # 提取数组内容并转换为JSON
                array_content = match.group(1)
                # 修复JSON格式（处理尾随逗号等问题）
                array_content = re.sub(r',\s*}', '}', array_content)
                array_content = re.sub(r',\s*]', ']', array_content)
                
                # 添加方括号使其成为有效的JSON数组
                json_str = f"[{array_content}]"
                
                # 解析JSON
                paintings = json.loads(json_str)
                logger.info(f"成功提取{len(paintings)}幅画作信息")
                return paintings
                
        except Exception as e:
            logger.error(f"提取画作信息失败: {str(e)}")
            return []
    
    def search_baidu_images(self, keyword, num_results=5):
        """在百度图片搜索关键词并返回高清图片URL列表"""
        try:
            # 百度图片搜索URL
            search_url = f"https://image.baidu.com/search/index?tn=baiduimage&word={quote(keyword)}&ct=201326592&lm=-1&cl=2&ie=gbk"
            
            # 发送请求
            response = self.session.get(search_url)
            response.raise_for_status()
            
            # 解析HTML
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # 查找图片URL
            image_urls = []
            # 百度图片有多种格式的图片链接，这里尝试不同的方式提取
            
            # 方法1：从data-objurl属性提取
            for img in soup.select('img[data-objurl]'):
                if len(image_urls) >= num_results:
                    break
                img_url = img['data-objurl']
                if img_url.lower().endswith(('.jpg', '.jpeg', '.png')):
                    image_urls.append(img_url)
            
            # 如果方法1不够，尝试方法2：从objurl参数提取
            if len(image_urls) < num_results:
                for link in soup.find_all('a', href=True):
                    if len(image_urls) >= num_results:
                        break
                    href = link['href']
                    if 'objurl=' in href:
                        match = re.search(r'objurl=([^&]+)', href)
                        if match:
                            img_url = match.group(1)
                            if img_url.lower().endswith(('.jpg', '.jpeg', '.png')) and img_url not in image_urls:
                                image_urls.append(img_url)
            
            # 如果方法1和2都不够，尝试方法3：从src属性提取高质量图片
            if len(image_urls) < num_results:
                for img in soup.select('img[src]'):
                    if len(image_urls) >= num_results:
                        break
                    img_url = img['src']
                    # 过滤掉小图和base64编码的图片
                    if img_url.startswith('http') and 'w=200' not in img_url and 'h=200' not in img_url and img_url.lower().endswith(('.jpg', '.jpeg', '.png')) and img_url not in image_urls:
                        image_urls.append(img_url)
            
            logger.info(f"为'{keyword}'找到{len(image_urls)}张图片")
            return image_urls[:num_results]  # 返回前num_results个结果
            
        except Exception as e:
            logger.error(f"搜索图片'{keyword}'失败: {str(e)}")
            return []
    
    def download_and_save_image(self, img_url, save_path, min_size=(800, 600)):
        """下载图片并保存，如果图片尺寸符合要求"""
        try:
            # 发送请求，设置超时
            response = self.session.get(img_url, timeout=10, stream=True)
            response.raise_for_status()
            
            # 检查响应内容类型
            content_type = response.headers.get('Content-Type', '')
            if not content_type.startswith('image/'):
                logger.warning(f"URL不是图片: {img_url}")
                return False
            
            # 读取图片
            img = Image.open(BytesIO(response.content))
            
            # 检查图片尺寸
            width, height = img.size
            if width < min_size[0] or height < min_size[1]:
                logger.warning(f"图片尺寸太小 ({width}x{height}), 跳过: {img_url}")
                return False
            
            # 保存图片
            img.save(save_path)
            logger.info(f"成功下载: {save_path} ({width}x{height})")
            return True
            
        except Exception as e:
            logger.error(f"下载图片失败: {str(e)}")
            return False
    
    def main(self):
        """主函数"""
        # 创建下载文件夹
        self.create_download_folder()
        
        # 提取画作信息
        paintings = self.extract_paintings_info()
        if not paintings:
            logger.error("没有找到画作信息，程序退出")
            return
        
        # 统计信息
        total_paintings = len(paintings)
        successfully_downloaded = 0
        skipped = 0
        failed = 0
        
        # 下载进度文件
        progress_file = os.path.join(self.download_folder, 'download_progress.json')
        progress = {}
        
        # 加载已有进度
        if os.path.exists(progress_file):
            try:
                with open(progress_file, 'r', encoding='utf-8') as f:
                    progress = json.load(f)
                logger.info(f"加载已有进度，已下载{len(progress)}幅画作")
            except:
                logger.warning("加载进度文件失败，重新开始")
                progress = {}
        
        # 遍历所有画作
        for i, painting in enumerate(paintings, 1):
            painting_id = painting.get('id')
            title = painting.get('title')
            author = painting.get('author', '')
            period = painting.get('period', '')
            image_url = painting.get('imageUrl')
            
            # 获取原始文件名
            original_filename = os.path.basename(image_url) if image_url else f"{painting_id}.jpg"
            
            # 构建搜索关键词
            search_keyword = f"{title} {author} {period} 高清图" if author and period else f"{title} 高清图"
            search_keyword = search_keyword.strip()
            
            # 检查是否已经下载过
            if original_filename in progress:
                logger.info(f"跳过已下载的画作 ({i}/{total_paintings}): {title}")
                skipped += 1
                continue
            
            logger.info(f"处理画作 ({i}/{total_paintings}): {title}")
            
            # 搜索图片
            image_urls = self.search_baidu_images(search_keyword, num_results=3)
            
            # 尝试下载图片
            download_success = False
            for img_url in image_urls:
                save_path = os.path.join(self.download_folder, original_filename)
                if self.download_and_save_image(img_url, save_path):
                    # 更新进度
                    progress[original_filename] = {
                        'title': title,
                        'author': author,
                        'period': period,
                        'download_time': time.strftime('%Y-%m-%d %H:%M:%S'),
                        'image_url': img_url
                    }
                    
                    # 保存进度
                    with open(progress_file, 'w', encoding='utf-8') as f:
                        json.dump(progress, f, ensure_ascii=False, indent=2)
                    
                    download_success = True
                    successfully_downloaded += 1
                    break
            
            if not download_success:
                logger.error(f"下载失败: {title}")
                failed += 1
            
            # 避免请求过于频繁
            time.sleep(2)
        
        # 输出统计信息
        logger.info(f"\n下载完成！")
        logger.info(f"总画作数: {total_paintings}")
        logger.info(f"成功下载: {successfully_downloaded}")
        logger.info(f"已跳过: {skipped}")
        logger.info(f"下载失败: {failed}")
        logger.info(f"\n高清图片已保存到: {self.download_folder}")
        logger.info("您可以将这些图片复制到cnpaintings文件夹中替换原图片。")
        logger.info("注意：请检查下载的图片质量，并确保它们符合您的需求。")

if __name__ == "__main__":
    downloader = GalleryImageDownloader()
    downloader.main()