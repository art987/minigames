#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI数据生成器使用示例
"""

from ai_data_generator import AIDataGenerator

def main():
    # 示例内容：Python编程知识点
    content = """
    Python编程基础知识点：
    
    1. 变量定义：Python中变量的定义和命名规则，支持动态类型
    2. 数据类型：字符串、数字、布尔值、列表、字典、元组等基本数据类型
    3. 运算符：算术、比较、逻辑、赋值、身份、成员运算符的使用
    4. 控制结构：if语句、for循环、while循环、break和continue的使用
    5. 函数定义：def关键字定义函数，参数传递，返回值
    6. 异常处理：try-except语句处理程序异常，raise抛出异常
    7. 文件操作：open()函数读取和写入文件，with语句管理文件
    8. 模块导入：import语句导入模块和包，from...import语法
    9. 面向对象：class定义类，__init__构造函数，继承和多态
    10. 列表推导：简洁的列表生成语法，提高代码效率
    11. 装饰器：@语法糖，函数装饰器的使用
    12. 生成器：yield关键字，生成器表达式和函数
    """
    
    # 创建生成器（无API密钥时使用模拟数据）
    generator = AIDataGenerator()
    
    # 生成数据文件
    print("🚀 开始生成Python编程备忘录...")
    
    try:
        data_path, html_path = generator.save_files(
            content=content,
            theme_name="Python编程",
            output_dir="."
        )
        
        print(f"\n✅ 生成完成！")
        print(f"📁 数据文件: {data_path}")
        print(f"🌐 HTML文件: {html_path}")
        
        # 显示生成的数据文件内容
        print(f"\n📄 生成的数据文件内容预览：")
        with open(data_path, 'r', encoding='utf-8') as f:
            content_preview = f.read()[:500] + "..." if len(f.read()) > 500 else f.read()
            print(content_preview)
            
    except Exception as e:
        print(f"❌ 生成失败: {e}")

if __name__ == "__main__":
    main()
