#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Comprehensive script to add images fields to all muscle entries in data.js
"""

import re

# Read the entire data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the muscleData array section
muscle_data_start = content.find('const muscleData = [')
if muscle_data_start == -1:
    print("Could not find muscleData array")
    exit(1)

muscle_data_end = content.find('];', muscle_data_start)
if muscle_data_end == -1:
    print("Could not find end of muscleData array")
    exit(1)

# Extract the muscleData array content
muscle_data_content = content[muscle_data_start:muscle_data_end + 2]

# Find all individual muscle entries within the array
# Pattern to match each muscle object: { ... }
muscle_entries = re.findall(r'\{[^}]+\}', muscle_data_content)

print(f"Found {len(muscle_entries)} muscle entries")

# Process each muscle entry
processed_count = 0
for entry in muscle_entries:
    # Check if the entry already has images field
    if '"images":' in entry:
        continue
    
    # Extract muscle name
    name_match = re.search(r'"name":"([^"]+)"', entry)
    if name_match:
        muscle_name = name_match.group(1)
        
        # Generate pinyin filename: remove special characters, keep only Chinese characters and letters
        pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
        
        # Add images field before the closing brace
        new_entry = entry[:-1]  # Remove the closing brace
        if not new_entry.endswith(',') and not new_entry.endswith('{'):
            new_entry += ','
        new_entry += '"images":["medias/' + pinyin_name + '.jpg"]}'
        
        # Replace the old entry with the new one in the content
        content = content.replace(entry, new_entry)
        processed_count += 1
        print(f"Processed: {muscle_name}")

# Write the updated content back to data.js
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully processed {processed_count} muscle entries")