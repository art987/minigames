import re

# Read the data.js file
with open('data.js', 'r', encoding='utf-8') as file:
    lines = file.readlines()

# Count total muscle entries
muscle_entries_count = 0
for line in lines:
    if '"name":' in line:
        muscle_entries_count += 1

print(f"Total muscle entries: {muscle_entries_count}")

# Process each line
processed_count = 0
for i, line in enumerate(lines):
    # Look for muscle entry lines that have name field but no images field
    if '"name":' in line and '"images":' not in line and '{' in line and '}' in line:
        # Extract muscle name
        name_match = re.search(r'"name":"([^"]+)"', line)
        if name_match:
            muscle_name = name_match.group(1)
            
            # Generate pinyin filename: remove special characters, keep only Chinese characters and letters
            pinyin_name = re.sub(r'[^\u4e00-\u9fff\w]', '', muscle_name)
            
            # Add images field before the closing brace
            # Find the position of the closing brace
            brace_pos = line.rfind('}')
            if brace_pos != -1:
                # Check if we need to add a comma
                before_brace = line[:brace_pos].rstrip()
                if not before_brace.endswith(',') and not before_brace.endswith('{'):
                    before_brace += ','
                
                # Create the new line with images field
                new_line = before_brace + '"images":["medias/' + pinyin_name + '.jpg"]' + line[brace_pos:]
                lines[i] = new_line
                processed_count += 1
                print(f"Processed: {muscle_name}")

# Write the updated content back to the file
with open('data.js', 'w', encoding='utf-8') as file:
    file.writelines(lines)

print(f"\nProcessed {processed_count} muscle entries")

# Verify the result
with open('data.js', 'r', encoding='utf-8') as file:
    content = file.read()

images_count = content.count('"images":')
print(f"Total images fields: {images_count}")
print(f"Total muscle entries: {muscle_entries_count}")

if images_count == muscle_entries_count:
    print("✅ SUCCESS: All muscle entries now have images fields!")
else:
    print(f"❌ Still missing {muscle_entries_count - images_count} images fields")