import os
import json

# 简单的脚本来更新brandData.js文件，为所有护肤品类品牌添加logo路径
def update_brand_data_with_logos_simple():
    # 设置路径
    base_dir = os.path.dirname(os.path.abspath(__file__))
    js_dir = os.path.join(base_dir, 'js')
    brand_data_path = os.path.join(js_dir, 'brandData.js')
    output_path = os.path.join(js_dir, 'brandData_updated.js')
    
    try:
        # 读取brandData.js文件
        with open(brand_data_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"开始更新 {brand_data_path}")
        
        # 使用简单的字符串替换方法为每个品牌添加logo路径
        # 我们将查找护肤品类中的每个品牌条目，并在name属性后添加logo属性
        
        # 查找护肤品类的开始位置
        skincare_start = content.find('"护肤品": [')
        if skincare_start == -1:
            print("错误: 未找到护肤品类数据")
            return False
        
        # 查找护肤品类的结束位置
        bracket_count = 1
        skincare_end = skincare_start + len('"护肤品": [')
        while bracket_count > 0 and skincare_end < len(content):
            if content[skincare_end] == '[':
                bracket_count += 1
            elif content[skincare_end] == ']':
                bracket_count -= 1
            skincare_end += 1
        
        # 提取护肤品类的内容
        skincare_content = content[skincare_start:skincare_end]
        updated_skincare_content = skincare_content
        
        # 统计更新情况
        updated_count = 0
        
        # 查找所有品牌条目并添加logo路径
        import re
        # 使用正则表达式查找所有品牌对象
        brand_pattern = r'\{\s*name:\s*["\']([^"\']+)["\']'
        brands = re.findall(brand_pattern, skincare_content)
        
        print(f"找到 {len(brands)} 个护肤品类品牌")
        
        for brand_name in brands:
            # 创建logo路径
            logo_path = f"images/skincare/logos/{brand_name}.png"
            
            # 查找该品牌的name属性
            search_pattern = r'\{\s*name:\s*["\']' + re.escape(brand_name) + r'["\']'
            replace_pattern = f'{{name: "{brand_name}", logo: "{logo_path}"'
            
            # 执行替换
            new_content, count = re.subn(search_pattern, replace_pattern, updated_skincare_content)
            if count > 0:
                updated_skincare_content = new_content
                updated_count += 1
                print(f"✅ 已为 {brand_name} 添加logo路径")
            else:
                print(f"❌ 未找到 {brand_name} 的匹配项")
        
        # 更新整个文件内容
        updated_content = content[:skincare_start] + updated_skincare_content + content[skincare_end:]
        
        # 保存更新后的内容
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"\n更新完成！成功为 {updated_count} 个品牌添加了logo路径")
        print(f"更新后的文件已保存到: {output_path}")
        return True
        
    except Exception as e:
        print(f"更新brandData.js时出错: {str(e)}")
        return False

if __name__ == "__main__":
    print("===== 简单模式更新品牌logo路径 =====")
    update_brand_data_with_logos_simple()
    print("\n请使用以下命令将更新后的文件替换原文件：")
    print("Copy-Item brandData_updated.js -Destination brandData_backup.js; Remove-Item brandData.js; Rename-Item brandData_updated.js -NewName brandData.js")