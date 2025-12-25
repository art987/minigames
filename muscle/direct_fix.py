#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# 读取文件
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 备份文件
with open('data_backup_direct.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("已创建备份文件: data_backup_direct.js")

# 统计处理前的肌肉条目数
muscles_before = content.count('"name":"')
images_before = content.count('"images":[')
print(f"处理前: 肌肉条目数={muscles_before}, 有images字段的条目数={images_before}")

# 使用简单的字符串替换方法
# 找到所有肌肉条目并添加images字段

# 定义处理函数
def add_images_to_muscle(match):
    muscle_entry = match.group(0)
    
    # 如果已经有images字段，直接返回
    if '"images":' in muscle_entry:
        return muscle_entry
    
    # 提取肌肉名称
    name_match = re.search(r'"name":"([^"]+)"', muscle_entry)
    if name_match:
        muscle_name = name_match.group(1)
        # 生成拼音文件名：移除特殊字符，只保留中文和字母
        pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
        
        # 在最后一个字段后添加images字段
        if muscle_entry.endswith('}'):
            # 去掉最后的}
            base_entry = muscle_entry[:-1]
            # 检查是否需要添加逗号
            if not base_entry.endswith(',') and not base_entry.endswith('{'):
                base_entry += ','
            # 添加images字段
            new_entry = base_entry + '"images":["medias/' + pinyin_name + '.jpg"]}'
            return new_entry
    
    return muscle_entry

# 使用正则表达式匹配所有肌肉条目
# 匹配模式：以 { 开头，包含 "part":"...","group":"...","name":"..."，以 } 结尾
pattern = r'\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]*\}'

# 替换所有匹配的肌肉条目
new_content = re.sub(pattern, add_images_to_muscle, content)

# 写入最终内容
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("直接处理完成！")

# 最终验证
with open('data.js', 'r', encoding='utf-8') as f:
    final_content = f.read()

images_final = final_content.count('"images":[')
muscles_final = final_content.count('"name":"')

print(f"最终结果: 肌肉条目数={muscles_final}, 有images字段的条目数={images_final}")
print(f"成功处理了 {images_final - images_before} 个肌肉条目")

# 显示前几个处理后的肌肉条目
print("\n处理后的前5个肌肉条目:")
muscle_matches = re.findall(pattern, final_content)
for i, entry in enumerate(muscle_matches[:5]):
    print(f"{i+1}. {entry}")