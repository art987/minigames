import os
import requests
from urllib.parse import urlparse

# 设置保存目录
save_dir = r"c:\Users\ThinkPad\Documents\GitHub\minigames\galley\cnpaintings"

# 创建保存目录（如果不存在）
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# 图片URL列表
image_urls = [
    "http://image.thepaper.cn/www/image/22/42/819.jpg",
    "http://image.thepaper.cn/www/image/22/42/825.jpg",
    "http://image.thepaper.cn/www/image/22/42/832.jpg",
    "http://image.thepaper.cn/www/image/22/42/839.jpg",
    "http://image.thepaper.cn/www/image/22/42/847.jpg",
    "http://image.thepaper.cn/www/image/22/42/859.jpg",
    "http://image.thepaper.cn/www/image/22/42/865.jpg",
    "http://image.thepaper.cn/www/image/22/42/870.jpg",
    "http://image.thepaper.cn/www/image/22/42/877.jpg",
    "http://image.thepaper.cn/www/image/22/42/882.jpg",
    "http://image.thepaper.cn/www/image/22/42/886.jpg",
    "http://image.thepaper.cn/www/image/22/42/890.jpg",
    "http://image.thepaper.cn/www/image/22/42/892.jpg",
    "http://image.thepaper.cn/www/image/22/42/895.jpg",
    "http://image.thepaper.cn/www/image/22/42/899.jpg",
    "http://image.thepaper.cn/www/image/22/42/905.jpg",
    "http://image.thepaper.cn/www/image/22/42/910.jpg",
    "http://image.thepaper.cn/www/image/22/42/915.jpg",
    "http://image.thepaper.cn/www/image/22/42/920.jpg",
    "http://image.thepaper.cn/www/image/22/42/926.jpg",
    "http://image.thepaper.cn/www/image/22/42/930.jpg",
    "http://image.thepaper.cn/www/image/22/42/936.jpg",
    "http://image.thepaper.cn/www/image/22/42/940.jpg",
    "http://image.thepaper.cn/www/image/22/42/946.jpg",
    "http://image.thepaper.cn/www/image/22/42/951.jpg",
    "http://image.thepaper.cn/www/image/22/42/961.jpg",
    "http://image.thepaper.cn/www/image/22/42/969.jpg",
    "http://image.thepaper.cn/www/image/22/42/971.jpg",
    "http://image.thepaper.cn/www/image/22/43/24.jpg",
    "http://image.thepaper.cn/www/image/22/43/27.jpg",
    "http://image.thepaper.cn/www/image/22/43/33.jpg",
    "http://image.thepaper.cn/www/image/22/43/41.jpg",
    "http://image.thepaper.cn/www/image/22/43/47.jpg",
    "http://image.thepaper.cn/www/image/22/43/51.jpg",
    "http://image.thepaper.cn/www/image/22/43/72.jpg",
    "http://image.thepaper.cn/www/image/22/43/85.jpg",
    "http://image.thepaper.cn/www/image/22/43/96.jpg",
    "http://image.thepaper.cn/www/image/22/43/107.jpg",
    "http://image.thepaper.cn/www/image/22/43/118.jpg",
    "http://image.thepaper.cn/www/image/22/43/126.jpg",
    "http://image.thepaper.cn/www/image/22/43/134.jpg",
    "http://image.thepaper.cn/www/image/22/43/144.jpg",
    "http://image.thepaper.cn/www/image/22/43/150.jpg",
    "http://image.thepaper.cn/www/image/22/43/157.jpg",
    "http://image.thepaper.cn/www/image/22/43/167.jpg",
    "http://image.thepaper.cn/www/image/22/43/177.jpg",
    "http://image.thepaper.cn/www/image/22/43/184.jpg",
    "http://image.thepaper.cn/www/image/22/43/190.jpg",
    "http://image.thepaper.cn/www/image/22/43/228.jpg",
    "http://image.thepaper.cn/www/image/22/43/238.jpg",
    "http://image.thepaper.cn/www/image/22/43/246.jpg",
    "http://image.thepaper.cn/www/image/22/43/252.jpg",
    "http://image.thepaper.cn/www/image/22/43/260.jpg",
    "http://image.thepaper.cn/www/image/22/43/274.jpg",
    "http://image.thepaper.cn/www/image/22/43/284.jpg",
    "http://image.thepaper.cn/www/image/22/43/292.jpg",
    "http://image.thepaper.cn/www/image/22/43/294.jpg",
    "http://image.thepaper.cn/www/image/22/43/298.jpg",
    "http://image.thepaper.cn/www/image/22/43/303.jpg",
    "http://image.thepaper.cn/www/image/22/43/311.jpg",
    "http://image.thepaper.cn/www/image/22/43/327.jpg",
    "http://image.thepaper.cn/www/image/22/43/334.jpg",
    "http://image.thepaper.cn/www/image/22/43/346.jpg",
    "http://image.thepaper.cn/www/image/22/43/352.jpg",
    "http://image.thepaper.cn/www/image/22/43/358.jpg",
    "http://image.thepaper.cn/www/image/22/43/364.jpg",
    "http://image.thepaper.cn/www/image/22/43/370.jpg",
    "http://image.thepaper.cn/www/image/22/43/379.jpg",
    "http://image.thepaper.cn/www/image/22/43/389.jpg",
    "http://image.thepaper.cn/www/image/22/43/398.jpg",
    "http://image.thepaper.cn/www/image/22/43/405.jpg",
    "http://image.thepaper.cn/www/image/22/43/414.jpg",
    "http://image.thepaper.cn/www/image/22/43/423.jpg",
    "http://image.thepaper.cn/www/image/22/43/433.jpg",
    "http://image.thepaper.cn/www/image/22/43/441.jpg",
    "http://image.thepaper.cn/www/image/22/43/448.jpg",
    "http://image.thepaper.cn/www/image/22/43/454.jpg",
    "http://image.thepaper.cn/www/image/22/43/470.jpg",
    "http://image.thepaper.cn/www/image/22/43/479.jpg",
    "http://image.thepaper.cn/www/image/22/43/484.jpg",
    "http://image.thepaper.cn/www/image/22/43/491.jpg",
    "http://image.thepaper.cn/www/image/22/43/498.jpg",
    "http://image.thepaper.cn/www/image/22/43/504.jpg",
    "http://image.thepaper.cn/www/image/22/43/509.jpg",
    "http://image.thepaper.cn/www/image/22/43/528.jpg",
    "http://image.thepaper.cn/www/image/22/43/536.jpg",
    "http://image.thepaper.cn/www/image/22/43/544.jpg",
    "http://image.thepaper.cn/www/image/22/43/556.jpg",
    "http://image.thepaper.cn/www/image/22/43/585.jpg",
    "http://image.thepaper.cn/www/image/22/43/595.jpg",
    "http://image.thepaper.cn/www/image/22/43/602.jpg",
    "http://image.thepaper.cn/www/image/22/43/610.jpg",
    "http://image.thepaper.cn/www/image/22/43/613.jpg",
    "http://image.thepaper.cn/www/image/22/43/616.jpg",
    "http://image.thepaper.cn/www/image/22/43/621.jpg",
    "http://image.thepaper.cn/www/image/22/43/624.jpg",
    "http://image.thepaper.cn/www/image/22/43/627.jpg",
    "http://image.thepaper.cn/www/image/22/43/629.jpg",
    "http://image.thepaper.cn/www/image/22/43/632.jpg",
    "http://image.thepaper.cn/www/image/22/43/637.jpg"
]

# 下载计数器
success_count = 0
fail_count = 0

print("开始下载图片...")

for i, url in enumerate(image_urls, 1):
    # 从URL中提取文件名
    file_name = url.split('/')[-1]
    save_path = os.path.join(save_dir, file_name)
    
    print(f"正在下载图片 {i}/{len(image_urls)}: {file_name}")
    
    try:
        # 下载图片
        response = requests.get(url, timeout=30)
        response.raise_for_status()  # 如果状态码不是200，抛出异常
        
        # 保存图片
        with open(save_path, 'wb') as f:
            f.write(response.content)
            
        success_count += 1
        print(f"  ✓ 下载成功")
    except Exception as e:
        fail_count += 1
        print(f"  ✗ 下载失败: {str(e)}")

# 显示下载结果统计
print(f"\n下载完成!")
print(f"成功: {success_count} 张图片")
print(f"失败: {fail_count} 张图片")

if fail_count > 0:
    print(f"\n有 {fail_count} 张图片下载失败")