import re

# Read the data.js file
with open('data.js', 'r', encoding='utf-8') as file:
    content = file.read()

# Count total muscle entries
muscle_entries_count = content.count('"name":')
print(f"Total muscle entries: {muscle_entries_count}")

# Find the muscleData array specifically
muscle_data_start = content.find('const muscleData = [')
muscle_data_end = content.find('];', muscle_data_start)

if muscle_data_start == -1 or muscle_data_end == -1:
    print("Error: Could not find muscleData array")
    exit(1)

# Extract the muscleData array content
muscle_data_content = content[muscle_data_start:muscle_data_end + 2]

# Find all muscle entries using a more precise pattern
# Look for lines that start with { and contain name field
pattern = r'(\{[^{}]*?"name":"[^"]+"[^{}]*?)(\}(?:,)?)'

# Find all matches
matches = list(re.finditer(pattern, muscle_data_content, re.DOTALL))

print(f"Found {len(matches)} muscle entries in muscleData array")

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
        
        # Replace in muscle_data_content
        muscle_data_content = muscle_data_content.replace(full_match, new_entry)
        processed_count += 1
        print(f"Processed: {muscle_name}")

# Replace the original muscleData array with the new one
new_content = content[:muscle_data_start] + muscle_data_content + content[muscle_data_end + 2:]

# Write the updated content back to the file
with open('data.js', 'w', encoding='utf-8') as file:
    file.write(new_content)

print(f"\nProcessed {processed_count} muscle entries")

# Verify the result
images_count = new_content.count('"images":')
print(f"Total images fields: {images_count}")
print(f"Total muscle entries: {muscle_entries_count}")

if images_count == muscle_entries_count:
    print("✅ SUCCESS: All muscle entries now have images fields!")
else:
    print(f"❌ Still missing {muscle_entries_count - images_count} images fields")