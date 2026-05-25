import re

# 读取 script-wuyin.js 文件
with open(r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\script-wuyin.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取播放列表
playlist_match = re.search(r'playlist = \[(.*?)\];', content, re.DOTALL)
if playlist_match:
    playlist_str = playlist_match.group(1)
    
    # 分类音乐
    categories = {
        '角音养肝': [],
        '徵音养心': [],
        '宫音养脾': [],
        '商音润肺': [],
        '羽音养肾': []
    }
    
    # 解析每首歌
    songs = re.findall(r'\{title: \'(.*?)\', artist: \'(.*?)\', cover: \'(.*?)\', mp3: \'(.*?)\', ogg: \'\'\}', playlist_str)
    
    print(f"总共找到 {len(songs)} 首歌曲")
    
    for title, artist, cover, mp3 in songs:
        song_obj = {
            'title': title,
            'artist': artist,
            'cover': cover,
            'mp3': mp3
        }
        
        if artist in categories:
            categories[artist].append(song_obj)
    
    # 打印每个分类的歌曲数量
    for category, songs_list in categories.items():
        print(f"{category}: {len(songs_list)} 首")
        if songs_list:
            print(f"  第一首: {songs_list[0]['title']}")
