#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Direct processing script to add images fields to all muscle entries in data.js
"""

import re

# Read the entire data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Process each line to add images fields
new_lines = []
in_muscle_data = False
processed_count = 0

for i, line in enumerate(lines):
    # Check if we're in the muscleData array
    if 'const muscleData = [' in line:
        in_muscle_data = True
        new_lines.append(line)
        continue
    
    if in_muscle_data:
        # Check if this line contains a muscle entry (starts with { and contains name)
        if line.strip().startswith('{') and '"name":' in line:
            # Check if the entry already has images field
            if '"images":' not in line:
                # Extract muscle name
                name_match = re.search(r'"name":"([^"]+)"', line)
                if name_match:
                    muscle_name = name_match.group(1)
                    
                    # Generate pinyin filename: remove special characters, keep only Chinese characters and letters
                    pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
                    
                    # Add images field before the closing brace
                    if line.strip().endswith('},'):
                        # Entry ends with },
                        base_line = line.rstrip()[:-2]
                        if not base_line.endswith(',') and not base_line.endswith('{'):
                            base_line += ','
                        new_line = base_line + '"images":["medias/' + pinyin_name + '.jpg"]},' + '\n'
                    elif line.strip().endswith('}'):
                        # Entry ends with }
                        base_line = line.rstrip()[:-1]
                        if not base_line.endswith(',') and not base_line.endswith('{'):
                            base_line += ','
                        new_line = base_line + '"images":["medias/' + pinyin_name + '.jpg"]}' + '\n'
                    else:
                        new_line = line
                    
                    new_lines.append(new_line)
                    processed_count += 1
                    print(f"Processed: {muscle_name}")
                else:
                    new_lines.append(line)
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)
            
            # Check if we've reached the end of the muscleData array
            if line.strip() == '];':
                in_muscle_data = False
    else:
        new_lines.append(line)

# Write the updated content back to data.js
with open('data.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Successfully processed {processed_count} muscle entries")