import re

# Read the data.js file
with open('data.js', 'r', encoding='utf-8') as file:
    content = file.read()

# Count total muscle entries
muscle_entries_count = content.count('"name":')
print(f"Total muscle entries: {muscle_entries_count}")

# Find all muscle entries using a simple pattern
pattern = r'(\{"part":"[^"]+","group":"[^"]+","name":"[^"]+"[^}]*?)(\}(?:,)?)'

# Find all matches
matches = list(re.finditer(pattern, content, re.DOTALL))

print(f"Found {len(matches)} muscle entries")

# Process each match
processed_count = 0
for match in matches:
    full_match = match.group(0)
    before = match.group(1)
    after = match.group(2)
    
    # Skip if already has images field
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

# Write the updated content back to the file
with open('data.js', 'w', encoding='utf-8') as file:
    file.write(content)

print(f"\nProcessed {processed_count} muscle entries")

# Verify the result
images_count = content.count('"images":')
print(f"Total images fields: {images_count}")
print(f"Total muscle entries: {muscle_entries_count}")

if images_count == muscle_entries_count:
    print("✅ SUCCESS: All muscle entries now have images fields!")
else:
    print(f"❌ Still missing {muscle_entries_count - images_count} images fields")