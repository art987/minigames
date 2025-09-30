import re
import os

# 文件路径
gallery_file = 'gallery.js'
bak_file = 'gallery.js.bak'

# 读取原始文件内容
with open(gallery_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 创建备份文件
with open(bak_file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"已创建备份文件: {bak_file}")

# 定义正则表达式来匹配图片URL
# 匹配模式: http://image.thepaper.cn/www/image/22/42/xxx.jpg 或 http://image.thepaper.cn/www/image/22/43/xxx.jpg
pattern = r'http://image\.thepaper\.cn/www/image/22/(42|43)/(\d+)\.jpg'

# 替换函数
def replace_url(match):
    # 获取图片编号
    img_number = match.group(2)
    # 构建本地路径
    local_path = f"cnpaintings/{img_number}.jpg"
    return local_path

# 执行替换
new_content = re.sub(pattern, replace_url, content)

# 保存修改后的内容
with open(gallery_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

# 统计替换次数
replace_count = len(re.findall(pattern, content))

print(f"替换完成! 共替换了 {replace_count} 处图片URL")
print(f"所有远程图片URL已替换为本地路径: 'cnpaintings/xxx.jpg'")