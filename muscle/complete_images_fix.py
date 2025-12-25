#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Complete script to add images fields to all muscle entries in data.js
"""

import re

# Read the entire data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all muscle entries that don't have images field
# Pattern to match muscle entries without images field
pattern = r'(\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]*?)(?<!"images":)(\}(?:,)?)'

# Find all matches
matches = list(re.finditer(pattern, content))

print(f"Found {len(matches)} muscle entries without images field")

# Process each match
processed_count = 0
for match in matches:
    before = match.group(1)
    after = match.group(2)
    
    # Extract muscle name
    name_match = re.search(r'"name":"([^"]+)"', before)
    if name_match:
        muscle_name = name_match.group(1)
        
        # Generate pinyin filename: remove special characters, keep only Chinese characters and letters
        pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
        
        # Add images field
        # Check if we need to add a comma
        if not before.rstrip().endswith(',') and not before.rstrip().endswith('{'):
            before += ','
        
        new_entry = before + '"images":["medias/' + pinyin_name + '.jpg"]' + after
        
        # Replace in content
        content = content.replace(match.group(0), new_entry)
        processed_count += 1
        print(f"Processed: {muscle_name}")

# Write the updated content back to data.js
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully processed {processed_count} muscle entries")
print("All muscle entries now have images fields!")