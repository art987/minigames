#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
批量裁切图片四周留白
"""
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("正在安装 Pillow 库...")
    os.system("pip install Pillow")
    from PIL import Image


def trim_image(input_path, output_path=None, threshold=240):
    """
    裁切图片四周的留白
    
    Args:
        input_path: 输入图片路径
        output_path: 输出图片路径，如果为None则覆盖原文件
        threshold: 阈值，像素值大于此值视为白色背景
    """
    try:
        img = Image.open(input_path)
        
        # 转换为RGBA模式（如果不是的话）
        if img.mode != 'RGBA':
            if img.mode == 'P':
                img = img.convert('RGBA')
            elif img.mode == 'L':
                img = img.convert('RGBA')
            else:
                img = img.convert('RGBA')
        
        # 获取图片数据
        pixels = img.load()
        width, height = img.size
        
        # 查找非白色区域的边界
        left = width
        top = height
        right = 0
        bottom = 0
        
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                # 判断是否为白色或透明像素
                is_white = (r >= threshold and g >= threshold and b >= threshold) or (a < 10)
                
                if not is_white:
                    if x < left:
                        left = x
                    if x > right:
                        right = x
                    if y < top:
                        top = y
                    if y > bottom:
                        bottom = y
        
        # 如果没有找到非白色区域，返回原图
        if left >= right or top >= bottom:
            print(f"  跳过（未检测到有效内容）: {input_path}")
            return False
        
        # 添加一点边距（可选，保持一点留白）
        padding = 2
        left = max(0, left - padding)
        top = max(0, top - padding)
        right = min(width, right + padding)
        bottom = min(height, bottom + padding)
        
        # 裁切图片
        cropped_img = img.crop((left, top, right, bottom))
        
        # 保存图片
        if output_path is None:
            output_path = input_path
        
        # 根据原格式保存
        if str(input_path).lower().endswith('.png'):
            cropped_img.save(output_path, 'PNG')
        elif str(input_path).lower().endswith(('.jpg', '.jpeg')):
            # 转换为RGB模式保存JPEG
            if cropped_img.mode == 'RGBA':
                # 创建白色背景
                background = Image.new('RGB', cropped_img.size, (255, 255, 255))
                background.paste(cropped_img, mask=cropped_img.split()[3])
                cropped_img = background
            cropped_img.save(output_path, 'JPEG', quality=95)
        elif str(input_path).lower().endswith('.webp'):
            cropped_img.save(output_path, 'WEBP')
        elif str(input_path).lower().endswith('.avif'):
            cropped_img.save(output_path, 'AVIF')
        else:
            cropped_img.save(output_path)
        
        return True
        
    except Exception as e:
        print(f"  处理失败: {input_path}, 错误: {e}")
        return False


def process_directory(directory, extensions=None):
    """
    批量处理目录下的所有图片
    
    Args:
        directory: 目录路径
        extensions: 要处理的文件扩展名列表
    """
    if extensions is None:
        extensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif']
    
    directory = Path(directory)
    
    # 收集所有图片文件
    image_files = []
    for ext in extensions:
        image_files.extend(directory.glob(f'*{ext}'))
        image_files.extend(directory.glob(f'*{ext.upper()}'))
    
    # 去重
    image_files = list(set(image_files))
    
    print(f"\n找到 {len(image_files)} 个图片文件")
    print("=" * 60)
    
    success_count = 0
    skip_count = 0
    
    for i, img_file in enumerate(sorted(image_files), 1):
        print(f"[{i}/{len(image_files)}] 处理: {img_file.name}", end="")
        
        # 获取文件大小
        original_size = img_file.stat().st_size
        
        # 处理图片
        if trim_image(str(img_file)):
            new_size = img_file.stat().st_size
            saved = original_size - new_size
            print(f" ✓ (节省 {saved/1024:.1f}KB)")
            success_count += 1
        else:
            skip_count += 1
    
    print("=" * 60)
    print(f"处理完成: 成功 {success_count} 个, 跳过 {skip_count} 个")


if __name__ == '__main__':
    # 处理logos目录
    logos_dir = Path(__file__).parent / 'logos'
    
    if not logos_dir.exists():
        print(f"目录不存在: {logos_dir}")
        sys.exit(1)
    
    print(f"开始处理目录: {logos_dir}")
    process_directory(logos_dir)
