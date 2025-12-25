#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# 读取文件
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 备份文件
with open('data_backup_complete.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("已创建备份文件: data_backup_complete.js")

# 统计处理前的肌肉条目数
muscles_before = content.count('"name":"')
images_before = content.count('"images":[')
print(f"处理前: 肌肉条目数={muscles_before}, 有images字段的条目数={images_before}")

# 找到肌肉数据数组的开始和结束位置
start_pos = content.find('const muscleData = [')
end_pos = content.find('];', start_pos) + 2

if start_pos != -1 and end_pos != -1:
    # 提取肌肉数据部分
    muscle_data_section = content[start_pos:end_pos]
    
    # 使用正则表达式找到所有肌肉条目
    pattern = r'(\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]*)(\})(,?\n?)'
    
    def add_images(match):
        muscle_entry = match.group(1)
        closing_brace = match.group(2)
        trailing = match.group(3)
        
        # 如果已经有images字段，直接返回
        if '"images":' in muscle_entry:
            return muscle_entry + closing_brace + trailing
        
        # 提取肌肉名称
        name_match = re.search(r'"name":"([^"]+)"', muscle_entry)
        if name_match:
            muscle_name = name_match.group(1)
            # 生成拼音文件名：移除特殊字符，只保留中文和字母
            pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
            
            # 在最后一个字段后添加images字段
            # 检查是否需要添加逗号
            if not muscle_entry.endswith(',') and not muscle_entry.endswith('{'):
                muscle_entry += ','
            
            # 添加images字段
            new_entry = muscle_entry + '"images":["medias/' + pinyin_name + '.jpg"]' + closing_brace + trailing
            return new_entry
        
        return muscle_entry + closing_brace + trailing
    
    # 替换所有匹配的肌肉条目
    new_muscle_section = re.sub(pattern, add_images, muscle_data_section)
    
    # 替换整个肌肉数据部分
    final_content = content[:start_pos] + new_muscle_section + content[end_pos:]
    
    # 写入最终内容
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("完整处理完成！")
    
    # 最终验证
    with open('data.js', 'r', encoding='utf-8') as f:
        final_content = f.read()
    
    images_final = final_content.count('"images":[')
    muscles_final = final_content.count('"name":"')
    
    print(f"最终结果: 肌肉条目数={muscles_final}, 有images字段的条目数={images_final}")
    print(f"成功处理了 {images_final - images_before} 个肌肉条目")
    
    # 显示前几个处理后的肌肉条目
    print("\n处理后的前5个肌肉条目:")
    muscle_matches = re.findall(r'\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]*\}', final_content)
    for i, entry in enumerate(muscle_matches[:5]):
        print(f"{i+1}. {entry}")
else:
    print("错误：找不到肌肉数据数组！")