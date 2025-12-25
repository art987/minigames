#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# 读取文件
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 备份文件
with open('data_backup_accurate.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("已创建备份文件: data_backup_accurate.js")

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
    
    # 分割成单个肌肉条目
    muscle_entries = re.findall(r'\{[^}]+\}', muscle_data_section)
    
    print(f"找到 {len(muscle_entries)} 个肌肉条目")
    
    # 处理每个肌肉条目
    processed_entries = []
    for entry in muscle_entries:
        # 检查是否已经有images字段
        if '"images":' in entry:
            processed_entries.append(entry)
            continue
        
        # 提取肌肉名称
        name_match = re.search(r'"name":"([^"]+)"', entry)
        if name_match:
            muscle_name = name_match.group(1)
            pinyin_name = muscle_name.replace("-", "").replace(" ", "").replace("/", "")
            
            # 在最后一个字段后添加images字段
            if entry.endswith('}'):
                # 去掉最后的}
                base_entry = entry[:-1]
                # 添加images字段
                new_entry = base_entry + ',"images":["medias/' + pinyin_name + '.jpg"]}'
                processed_entries.append(new_entry)
            else:
                processed_entries.append(entry)
        else:
            processed_entries.append(entry)
    
    # 重新构建肌肉数据部分
    new_muscle_section = 'const muscleData = [\n' + ',\n'.join(processed_entries) + '\n];'
    
    # 替换整个肌肉数据部分
    final_content = content[:start_pos] + new_muscle_section + content[end_pos:]
    
    # 写入最终内容
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("手动处理完成！")
    
    # 最终验证
    with open('data.js', 'r', encoding='utf-8') as f:
        final_content = f.read()
    
    images_final = final_content.count('"images":[')
    muscles_final = final_content.count('"name":"')
    
    print(f"最终结果: 肌肉条目数={muscles_final}, 有images字段的条目数={images_final}")
    print(f"成功处理了 {images_final - images_before} 个肌肉条目")
    
    # 显示前几个处理后的肌肉条目
    print("\n处理后的前5个肌肉条目:")
    muscle_entries_final = re.findall(r'\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]+\}', final_content)
    for i, entry in enumerate(muscle_entries_final[:5]):
        print(f"{i+1}. {entry}")
else:
    print("错误：找不到肌肉数据数组！")