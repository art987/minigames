#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Final simple fix script to add images fields to all muscle entries in data.js
"""

import re

# Read the entire data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all muscle entries using a simpler pattern
# Look for lines that contain muscle data but don't have images field
pattern = r'(\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]*?)(?<!"images":)(\}(?:,)?)'

# Find all matches
matches = list(re.finditer(pattern, content, re.DOTALL))

print(f"Found {len(matches)} muscle entries without images field")

# Process each match
processed_count = 0
for match in matches:
    full_match = match.group(0)
    before = match.group(1)
    after = match.group(2)
    
    # Skip if already has images field (double check)
    if '"images":' in full_match:
        continue
    
    # Extract muscle name
    name_match = re.search(r'"name":"([^"]+)"', before)
    if name_match:
        muscle_name = name_match.group(1)
        
        # Generate pinyin filename: remove special characters, keep only Chinese characters and letters
        pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
        
        # Add images field before the closing brace
        # Check if we need to add a comma
        if not before.rstrip().endswith(',') and not before.rstrip().endswith('{'):
            before += ','
        
        new_entry = before + '"images":["medias/' + pinyin_name + '.jpg"]' + after
        
        # Replace in content
        content = content.replace(full_match, new_entry)
        processed_count += 1
        print(f"Processed: {muscle_name}")

# Write the updated content back to data.js
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully processed {processed_count} muscle entries")

# Verify the result
images_count = content.count('"images":')
muscle_entries_count = content.count('"name":')

print(f"Total images fields: {images_count}")
print(f"Total muscle entries: {muscle_entries_count}")

if images_count == muscle_entries_count:
    print("✅ SUCCESS: All muscle entries now have images fields!")
else:
    print(f"❌ Still missing {muscle_entries_count - images_count} images fields")
    
# Let's also check the first few lines to see the result
print("\nFirst 10 muscle entries:")
muscle_lines = re.findall(r'\{[^}]+\}', content)
for i, entry in enumerate(muscle_lines[:10]):
    has_images = '"images":' in entry
    name_match = re.search(r'"name":"([^"]+)"', entry)
    name = name_match.group(1) if name_match else "Unknown"
    print(f"{i+1}. {name}: {'✅' if has_images else '❌'}")