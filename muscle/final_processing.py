#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Final processing script to add images fields to all muscle entries in data.js
"""

import re

# Read the entire data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all muscle entries using a more comprehensive pattern
# Look for lines that start with { and contain "name":" and end with } or },
muscle_entries = re.findall(r'\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]+\}(?:,)?', content)

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
        if entry.endswith('},'):
            # Entry ends with },
            base_entry = entry[:-2]
            if not base_entry.endswith(',') and not base_entry.endswith('{'):
                base_entry += ','
            new_entry = base_entry + '"images":["medias/' + pinyin_name + '.jpg"]},'
        elif entry.endswith('}'):
            # Entry ends with }
            base_entry = entry[:-1]
            if not base_entry.endswith(',') and not base_entry.endswith('{'):
                base_entry += ','
            new_entry = base_entry + '"images":["medias/' + pinyin_name + '.jpg"]}'
        else:
            new_entry = entry
        
        # Replace the old entry with the new one in the content
        content = content.replace(entry, new_entry)
        processed_count += 1
        print(f"Processed: {muscle_name}")

# Write the updated content back to data.js
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully processed {processed_count} muscle entries")