#!/usr/bin/env python3
"""
检查PNG图片透明度信息脚本
验证图片是否保留了透明效果
"""

import os
from PIL import Image

def check_png_transparency(file_path):
    """检查PNG图片的透明度信息"""
    try:
        with Image.open(file_path) as img:
            # 获取图片模式
            mode = img.mode
            
            # 检查是否有透明度通道
            has_alpha = mode in ('RGBA', 'LA', 'PA')
            
            # 检查透明度信息
            transparency_info = ""
            if has_alpha:
                transparency_info = "有透明度通道"
                # 检查是否有实际透明像素
                if img.mode == 'RGBA':
                    # 获取alpha通道
                    alpha = img.split()[-1]
                    # 检查是否有非255的alpha值（表示有透明像素）
                    alpha_values = alpha.getdata()
                    has_transparent_pixels = any(a < 255 for a in alpha_values)
                    if has_transparent_pixels:
                        transparency_info += "（包含透明像素）"
                    else:
                        transparency_info += "（无透明像素，但保留通道）"
            else:
                transparency_info = "无透明度通道"
            
            return {
                'filename': os.path.basename(file_path),
                'mode': mode,
                'has_alpha': has_alpha,
                'transparency_info': transparency_info,
                'size': img.size
            }
    except Exception as e:
        return {
            'filename': os.path.basename(file_path),
            'error': str(e)
        }

def check_directory_transparency(directory_path):
    """检查目录中PNG图片的透明度信息"""
    print(f"\n检查目录: {directory_path}")
    print("=" * 50)
    
    # 获取所有PNG文件
    png_files = []
    for filename in os.listdir(directory_path):
        if filename.lower().endswith('.png'):
            file_path = os.path.join(directory_path, filename)
            png_files.append(file_path)
    
    if not png_files:
        print(f"目录 {directory_path} 中没有PNG文件")
        return
    
    # 检查每个文件的透明度
    transparent_count = 0
    total_count = len(png_files)
    
    for file_path in png_files:
        result = check_png_transparency(file_path)
        
        if 'error' in result:
            print(f"[ERROR] {result['filename']}: 错误 - {result['error']}")
        else:
            status = "[OK]" if result['has_alpha'] else "[WARN]"
            print(f"{status} {result['filename']}: {result['mode']} - {result['transparency_info']} - {result['size'][0]}x{result['size'][1]}")
            
            if result['has_alpha']:
                transparent_count += 1
    
    print(f"\n透明度统计:")
    print(f"总文件数: {total_count}")
    print(f"有透明度文件: {transparent_count}")
    print(f"无透明度文件: {total_count - transparent_count}")
    print(f"透明度保留率: {transparent_count/total_count*100:.1f}%")

def main():
    """主函数"""
    print("PNG图片透明度检查工具")
    print("=" * 50)
    
    # 要检查的目录列表
    directories_to_check = [
        "sticker/cover",
        "sticker/life"
    ]
    
    # 检查每个目录
    for directory in directories_to_check:
        if os.path.exists(directory):
            check_directory_transparency(directory)
        else:
            print(f"[ERROR] 目录 {directory} 不存在")

if __name__ == "__main__":
    main()