import os
from PIL import Image

img_dir = r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\img\wuyin'

count = 0
for filename in os.listdir(img_dir):
    if filename.endswith('.png'):
        filepath = os.path.join(img_dir, filename)
        
        try:
            with Image.open(filepath) as img:
                # 调整尺寸为600x600
                resized_img = img.resize((600, 600), Image.LANCZOS)
                resized_img.save(filepath, 'PNG')
                count += 1
                print(f'已处理: {filename}')
        except Exception as e:
            print(f'处理失败 {filename}: {e}')
            continue

print(f'处理完成！共处理 {count} 个PNG文件')
