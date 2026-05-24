import os
from mutagen.easymp4 import EasyMP4
import json

yangsheng_dir = r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\mp3\yangsheng'

music_info = []

for filename in os.listdir(yangsheng_dir):
    if filename.endswith('.m4a'):
        filepath = os.path.join(yangsheng_dir, filename)
        
        try:
            audio = EasyMP4(filepath)
            
            info = {
                'filename': filename,
                'title': audio.get('title', ['未知'])[0] if audio.get('title') else '未知',
                'artist': audio.get('artist', ['未知'])[0] if audio.get('artist') else '未知',
                'album': audio.get('album', ['未知'])[0] if audio.get('album') else '未知'
            }
            
            music_info.append(info)
            print(f"{filename}:")
            print(f"  标题: {info['title']}")
            print(f"  艺术家: {info['artist']}")
            print(f"  唱片集: {info['album']}")
            print()
            
        except Exception as e:
            print(f"处理失败 {filename}: {e}")
            continue

# 保存为JSON文件
output_file = r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\yangsheng_music_info.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(music_info, f, ensure_ascii=False, indent=2)

print(f"\n共处理 {len(music_info)} 个音乐文件")
print(f"信息已保存到: {output_file}")
