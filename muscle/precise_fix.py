#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Precise fix script to add images fields to all muscle entries in data.js
"""

import re

# Read the entire data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start and end of muscleData array
muscle_data_start = -1
muscle_data_end = -1

for i, line in enumerate(lines):
    if 'const muscleData = [' in line:
        muscle_data_start = i
    if muscle_data_start != -1 and line.strip() == '];':
        muscle_data_end = i
        break

if muscle_data_start == -1 or muscle_data_end == -1:
    print("Could not find muscleData array boundaries")
    exit(1)

print(f"MuscleData array found from line {muscle_data_start} to {muscle_data_end}")

# Process lines within muscleData array
new_lines = []
processed_count = 0

for i in range(len(lines)):
    line = lines[i]
    
    # If outside muscleData array, just copy the line
    if i < muscle_data_start or i > muscle_data_end:
        new_lines.append(line)
        continue
    
    # If inside muscleData array, process muscle entries
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
                # Handle different line endings
                if line.rstrip().endswith('},'):
                    # Remove the trailing },
                    base_line = line.rstrip()[:-2]
                    # Add comma if needed
                    if not base_line.endswith(',') and not base_line.endswith('{'):
                        base_line += ','
                    new_line = base_line + '"images":["medias/' + pinyin_name + '.jpg"]},' + '\n'
                elif line.rstrip().endswith('}'):
                    # Remove the trailing }
                    base_line = line.rstrip()[:-1]
                    # Add comma if needed
                    if not base_line.endswith(',') and not base_line.endswith('{'):
                        base_line += ','
                    new_line = base_line + '"images":["medias/' + pinyin_name + '.jpg"]}' + '\n'
                else:
                    # If the line doesn't end properly, keep it as is
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

# Write the updated content back to data.js
with open('data.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Successfully processed {processed_count} muscle entries")

# Verify the result
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()
    images_count = content.count('"images":')
    muscle_entries_count = content.count('"name":')
    
print(f"Total images fields: {images_count}")
print(f"Total muscle entries: {muscle_entries_count}")

if images_count == muscle_entries_count:
    print("✅ SUCCESS: All muscle entries now have images fields!")
else:
    print("❌ Some muscle entries are still missing images fields")