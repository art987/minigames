import re

# Read the data.js file
with open('data.js', 'r', encoding='utf-8') as file:
    content = file.read()

# Find the muscleData array
pattern = r'const muscleData = \[(.*?)\];'
match = re.search(pattern, content, re.DOTALL)

if not match:
    print("❌ Could not find muscleData array")
    exit(1)

muscle_data_content = match.group(1)

# Split the muscle data into individual entries
# Look for entries that start with { and end with }
entries = re.findall(r'\{[^}]+\}', muscle_data_content)

print(f"Found {len(entries)} muscle entries")

# Process each entry
processed_count = 0
for i, entry in enumerate(entries):
    # Check if this entry already has an images field
    if '"images":' not in entry:
        # Extract muscle name
        name_match = re.search(r'"name":"([^"]+)"', entry)
        if name_match:
            muscle_name = name_match.group(1)
            
            # Generate pinyin filename: remove special characters, keep only Chinese characters and letters
            pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
            
            # Add images field before the closing brace
            # Find the position of the closing brace
            brace_pos = entry.rfind('}')
            if brace_pos != -1:
                # Check if we need to add a comma
                before_brace = entry[:brace_pos].rstrip()
                if not before_brace.endswith(',') and not before_brace.endswith('{'):
                    before_brace += ','
                
                # Create the new entry with images field
                new_entry = before_brace + '"images":["medias/' + pinyin_name + '.jpg"]' + entry[brace_pos:]
                
                # Replace the old entry with the new one in the content
                content = content.replace(entry, new_entry)
                processed_count += 1
                print(f"Processed: {muscle_name}")

# Write the updated content back to the file
with open('data.js', 'w', encoding='utf-8') as file:
    file.write(content)

print(f"\nProcessed {processed_count} muscle entries")

# Verify the result
with open('data.js', 'r', encoding='utf-8') as file:
    content = file.read()

images_count = content.count('"images":')
muscle_entries_count = content.count('"name":')
print(f"Total images fields: {images_count}")
print(f"Total muscle entries: {muscle_entries_count}")

if images_count == muscle_entries_count:
    print("✅ SUCCESS: All muscle entries now have images fields!")
else:
    print(f"❌ Still missing {muscle_entries_count - images_count} images fields")