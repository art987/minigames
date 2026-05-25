import re

# 读取 script-wuyin.js 文件
with open(r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\script-wuyin.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取播放列表
playlist_match = re.search(r'playlist = \[(.*?)\];', content, re.DOTALL)
if playlist_match:
    playlist_str = playlist_match.group(1)
    
    # 解析每首歌（使用更宽松的正则表达式）
    songs = re.findall(r'\{title:\s*\'(.*?)\',\s*artist:\s*\'(.*?)\',\s*cover:\s*\'(.*?)\',\s*mp3:\s*\'(.*?)\',\s*ogg:\s*\'\'\}', playlist_str)
    
    print(f"总共找到 {len(songs)} 首歌曲")
    
    # 打印前15首歌曲的artist
    for i, (title, artist, cover, mp3) in enumerate(songs[:15]):
        print(f"{i+1}. {title} - {artist}")
