#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 读取文件
with open('data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 备份文件
with open('data_backup_simple.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("已创建备份文件: data_backup_simple.js")

# 处理每一行
new_lines = []
for line in lines:
    # 检查是否是肌肉数据行（包含 "name":" 但不包含 "images":"）
    if '"name":"' in line and '"images":' not in line and line.strip().startswith('{"part":'):
        # 提取肌肉名称
        import re
        name_match = re.search(r'"name":"([^"]+)"', line)
        if name_match:
            muscle_name = name_match.group(1)
            # 生成拼音文件名：移除特殊字符，只保留中文和字母
            pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
            
            # 在行末尾添加images字段（在 } 之前）
            if line.strip().endswith('},'):
                # 去掉最后的 },
                base_line = line.rstrip()[:-2]
                # 添加images字段
                new_line = base_line + ',"images":["medias/' + pinyin_name + '.jpg"]},' + '\n'
                new_lines.append(new_line)
            elif line.strip().endswith('}'):
                # 去掉最后的 }
                base_line = line.rstrip()[:-1]
                # 添加images字段
                new_line = base_line + ',"images":["medias/' + pinyin_name + '.jpg"]}' + '\n'
                new_lines.append(new_line)
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)
    else:
        new_lines.append(line)

# 写入最终内容
with open('data.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("简单处理完成！")

# 最终验证
with open('data.js', 'r', encoding='utf-8') as f:
    final_content = f.read()

images_final = final_content.count('"images":[')
muscles_final = final_content.count('"name":"')

print(f"最终结果: 肌肉条目数={muscles_final}, 有images字段的条目数={images_final}")
print(f"成功处理了 {images_final} 个肌肉条目")

# 显示前几个处理后的肌肉条目
print("\n处理后的前5个肌肉条目:")
import re
muscle_matches = re.findall(r'\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]*\}', final_content)
for i, entry in enumerate(muscle_matches[:5]):
    print(f"{i+1}. {entry}")