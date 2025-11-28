import os
import json
import re

# 从brandData.js读取所有护肤品类品牌的函数
def get_all_skincare_brands(brand_data_path):
    try:
        with open(brand_data_path, 'r', encoding='utf-8') as f:
            content = f.read()
        # 提取brandData对象
        match = re.search(r'const brandData = ([\s\S]*?);', content)
        if match:
            brand_data_str = match.group(1)
            # 使用eval安全地解析对象（仅用于内部脚本）
            brand_data = eval(brand_data_str)
            skincare_brands = [brand['name'] for brand in brand_data.get('护肤品', [])]
            print(f"成功从brandData.js读取到 {len(skincare_brands)} 个护肤品类品牌")
            return skincare_brands
        else:
            print("无法从brandData.js中提取brandData对象")
            return []
    except Exception as e:
        print(f"读取brandData.js时出错: {str(e)}")
        return []

# 护肤品类品牌数据（从brandData.js提取）- 作为备用
skincare_brands = [
    "郁美净", "百雀羚", "相宜本草", "丁家宜", "佰草集", "韩束", "双妹", "美加净", 
    "欧诗漫", "采诗", "珀莱雅", "水密码", "润本", "启初", "薇诺娜", "高姿", 
    "健美创研", "馥珮", "京润", "御泥坊", "大水滴", "花瑶花", "美肤宝", "法兰琳卡", 
    "林清轩", "永芳", "衡美肤", "月里嫦娥", "七日香", "春娟", "雅霜", "迷奇", 
    "兰亭", "万紫千红", "京卫本草", "宫灯", "森宝", "西施美", "标婷", "孔凤春", 
    "戴春林", "片仔癀", "隆力奇", "东洋之花", "青蛙王子", "孩儿面", "红色小象"
]

# 确保保存目录存在
logos_dir = "images/skincare/logos"
os.makedirs(logos_dir, exist_ok=True)

# 创建logo占位文件并记录路径信息
def create_logo_placeholder(brand_name, logos_dir):
    try:
        # 创建占位文件路径
        placeholder_path = os.path.join(logos_dir, f"{brand_name}.png.txt")
        
        # 创建占位文件
        with open(placeholder_path, 'w', encoding='utf-8') as f:
            f.write(f"这是 {brand_name} 品牌logo的占位文件\n")
            f.write("在实际项目中，这里应该包含该品牌的真实logo图片\n")
            f.write("logo文件扩展名将为.png")
        
        # 返回相对路径（用于brandData.js）
        relative_path = f"images/skincare/logos/{brand_name}.png"
        print(f"✅ 已为 {brand_name} 创建logo占位文件，路径: {relative_path}")
        return relative_path
    except Exception as e:
        print(f"❌ 创建 {brand_name} 的logo占位文件时出错: {e}")
        return None

# 处理所有品牌并生成logo路径映射
def process_all_brands(brands, logos_dir):
    brand_logo_mapping = {}
    success_count = 0
    fail_count = 0
    
    print(f"开始处理 {len(brands)} 个品牌...")
    
    for brand in brands:
        logo_path = create_logo_placeholder(brand, logos_dir)
        if logo_path:
            brand_logo_mapping[brand] = logo_path
            success_count += 1
        else:
            fail_count += 1
    
    print(f"\n处理完成！")
    print(f"成功: {success_count} 个品牌")
    print(f"失败: {fail_count} 个品牌")
    
    # 保存logo路径映射到JSON文件，以便后续更新brandData.js
    mapping_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "js", "brand_logo_mapping.json")
    with open(mapping_file, 'w', encoding='utf-8') as f:
        json.dump(brand_logo_mapping, f, ensure_ascii=False, indent=2)
    
    print(f"\n品牌logo路径映射已保存到: {mapping_file}")
    print("可以使用此文件更新brandData.js中的品牌数据")
    
    return brand_logo_mapping

# 读取brandData.js文件并添加logo路径
def update_brand_data_with_logos(brand_data_path, logo_mapping, output_path):
    try:
        # 读取现有brandData.js文件
        with open(brand_data_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取brandData对象
        match = re.search(r'const brandData = ([\s\S]*?);', content)
        if not match:
            print("无法从brandData.js中提取brandData对象")
            return False
        
        brand_data_str = match.group(1)
        # 使用eval安全地解析对象（仅用于内部脚本）
        brand_data = eval(brand_data_str)
        
        # 更新护肤品类品牌的logo路径
        updated_count = 0
        not_found_count = 0
        all_brands_count = 0
        
        if '护肤品' in brand_data:
            all_brands_count = len(brand_data['护肤品'])
            for brand in brand_data['护肤品']:
                brand_name = brand['name']
                if brand_name in logo_mapping:
                    brand['logo'] = logo_mapping[brand_name]
                    updated_count += 1
                else:
                    # 对于没有对应logo的品牌，也创建一个默认路径
                    default_logo_path = os.path.join('images', 'skincare', 'logos', f"{brand_name}.png")
                    brand['logo'] = default_logo_path.replace('\\', '/')
                    not_found_count += 1
                    print(f"⚠️  为 {brand_name} 创建了默认logo路径")
        
        print(f"\n更新统计：")
        print(f"- 护肤品类品牌总数: {all_brands_count}")
        print(f"- 成功匹配并更新的品牌: {updated_count}")
        print(f"- 使用默认路径的品牌: {not_found_count}")
        
        # 将更新后的数据转换为字符串
        updated_data_str = json.dumps(brand_data, ensure_ascii=False, indent=4)
        
        # 构建新的文件内容
        new_content = f"// 品牌数据\nconst brandData = {updated_data_str};"
        
        # 写入到输出文件
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"已成功将更新后的数据写入到 {output_path}")
        return True
        
    except Exception as e:
        print(f"更新brandData.js时出错: {str(e)}")
        return False

# 主函数
def main():
    # 设置路径
    base_dir = os.path.dirname(os.path.abspath(__file__))
    js_dir = os.path.join(base_dir, 'js')
    brand_data_path = os.path.join(js_dir, 'brandData.js')
    output_path = os.path.join(js_dir, 'brandData_updated.js')
    
    # 护肤品类logo保存目录
    logos_dir = os.path.join(base_dir, 'images', 'skincare', 'logos')
    
    print("===== 开始处理品牌logo =====")
    print(f"当前工作目录: {base_dir}")
    print(f"brandData.js路径: {brand_data_path}")
    print(f"logo保存目录: {logos_dir}")
    
    # 尝试从brandData.js读取所有护肤品类品牌
    brands_to_process = get_all_skincare_brands(brand_data_path)
    
    # 如果读取失败，则使用原始品牌列表
    if not brands_to_process:
        print("使用默认品牌列表进行处理")
        brands_to_process = skincare_brands
    
    # 创建logo占位文件并生成映射
    brand_logo_mapping = process_all_brands(brands_to_process, logos_dir)
    
    # 更新brandData.js
    update_brand_data_with_logos(brand_data_path, brand_logo_mapping, output_path)
    
    print("\n===== 品牌logo处理完成 =====")
    print("注意：当前使用的是占位文件。在实际项目中，建议：")
    print("1. 申请图片搜索API密钥（如Bing Image Search API）")
    print("2. 修改脚本以使用API下载真实的品牌logo图片")
    print("3. 确保下载的图片使用正确的.png扩展名")

if __name__ == "__main__":
    main()