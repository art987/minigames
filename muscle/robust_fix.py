#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Robust script to add images fields to all muscle entries in data.js
"""

import re
import json

# Read the data.js file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the muscleData array
muscle_data_match = re.search(r'const muscleData = \[(.*?)\];', content, re.DOTALL)

if muscle_data_match:
    muscle_data_content = muscle_data_match.group(1)
    
    # Split the content into individual muscle entries
    # Look for entries that start with { and end with } or },
    entries = re.findall(r'\{[^}]+\}(?:,)?', muscle_data_content)
    
    print(f"Found {len(entries)} muscle entries")
    
    # Process each entry
    new_entries = []
    for entry in entries:
        # Check if the entry already has images field
        if '"images":' in entry:
            new_entries.append(entry)
            continue
            
        # Extract muscle name
        name_match = re.search(r'"name":"([^"]+)"', entry)
        if name_match:
            muscle_name = name_match.group(1)
            
            # Generate pinyin filename: remove special characters, keep only Chinese characters and letters
            pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
            
            # Add images field before the closing brace
            if entry.strip().endswith('},'):
                # Entry ends with },
                base_entry = entry.rstrip()[:-2]
                if not base_entry.endswith(',') and not base_entry.endswith('{'):
                    base_entry += ','
                new_entry = base_entry + '"images":["medias/' + pinyin_name + '.jpg"]},'
            elif entry.strip().endswith('}'):
                # Entry ends with }
                base_entry = entry.rstrip()[:-1]
                if not base_entry.endswith(',') and not base_entry.endswith('{'):
                    base_entry += ','
                new_entry = base_entry + '"images":["medias/' + pinyin_name + '.jpg"]}'
            else:
                new_entry = entry
                
            new_entries.append(new_entry)
            print(f"Processed: {muscle_name}")
        else:
            new_entries.append(entry)
    
    # Reconstruct the muscleData array
    new_muscle_data_content = '\n'.join(new_entries)
    new_content = content.replace(muscle_data_content, new_muscle_data_content)
    
    # Write the updated content back to data.js
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Successfully processed {len(new_entries)} entries")
    
else:
    print("Could not find muscleData array in data.js")