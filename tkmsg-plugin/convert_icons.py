#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
SVG图标转换工具

此脚本用于将SVG图标转换为Chrome插件所需的PNG格式。
需要安装依赖：pip install cairosvg
"""

import os
import sys
from pathlib import Path

try:
    import cairosvg
except ImportError:
    print("错误: 未安装cairosvg库")
    print("请运行: pip install cairosvg")
    sys.exit(1)

def convert_svg_to_png(svg_path, png_path, width=None, height=None):
    """将SVG文件转换为PNG文件"""
    try:
        kwargs = {}
        if width:
            kwargs['width'] = width
        if height:
            kwargs['height'] = height
            
        cairosvg.svg2png(url=str(svg_path), write_to=str(png_path), **kwargs)
        print(f"成功转换: {svg_path} -> {png_path}")
        return True
    except Exception as e:
        print(f"转换失败 {svg_path}: {e}")
        return False

def main():
    # 获取图标目录
    icons_dir = Path(__file__).parent / "icons"
    
    if not icons_dir.exists():
        print(f"错误: 图标目录不存在: {icons_dir}")
        sys.exit(1)
    
    # 定义要转换的文件
    svg_files = [
        {"svg": "icon16.svg", "png": "icon16.png", "size": 16},
        {"svg": "icon48.svg", "png": "icon48.png", "size": 48},
        {"svg": "icon128.svg", "png": "icon128.png", "size": 128}
    ]
    
    # 执行转换
    success_count = 0
    for file_info in svg_files:
        svg_path = icons_dir / file_info["svg"]
        png_path = icons_dir / file_info["png"]
        
        if not svg_path.exists():
            print(f"警告: SVG文件不存在: {svg_path}")
            continue
        
        if convert_svg_to_png(svg_path, png_path, file_info["size"], file_info["size"]):
            success_count += 1
    
    # 输出结果
    print(f"\n转换完成: 成功 {success_count}/{len(svg_files)}")
    
    if success_count == len(svg_files):
        print("\n所有图标已成功转换为PNG格式！")
        print("现在可以加载Chrome插件了。")
    else:
        print("\n部分图标转换失败，请检查错误信息。")

if __name__ == "__main__":
    print("=== TikTok消息助手 - 图标转换工具 ===")
    main()