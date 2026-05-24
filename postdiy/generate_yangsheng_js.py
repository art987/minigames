import json
import re

# 读取音乐信息
with open(r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\yangsheng_music_info.json', 'r', encoding='utf-8') as f:
    music_info = json.load(f)

# 简单的中文拼音首字母映射表
pinyin_map = {
    '寒': 'h', '鸦': 'y', '戏': 'x', '水': 's', '琵': 'p', '琶': 'p',
    '塞': 's', '上': 's', '曲': 'q', '灵': 'l', '魂': 'h', '禅': 'c',
    '院': 'y', '钟': 'z', '声': 's', '普': 'p', '庵': 'a', '咒': 'z',
    '光': 'g', '明': 'm', '变': 'b', '幻': 'h', '彩': 'c', '风': 'f',
    '山': 's', '僧': 's', '踪': 'z', '溪': 'x', '边': 'b', '的': 'd',
    '铃': 'l', '儿': 'e', '平': 'p', '湖': 'h', '秋': 'q', '月': 'y',
    '我': 'w', '划': 'h', '小': 'x', '船': 'c', '苦': 'k', '雪': 'x',
    '烹': 'p', '茶': 'c', '大': 'd', '胡': 'h', '笳': 'j', '澄': 'c',
    '净': 'j', '心': 'x', '行': 'x', '云': 'y', '流': 'l', '夏': 'x',
    '十': 's', '面': 'm', '埋': 'm', '伏': 'f', '佛': 'f', '家': 'j',
    '静': 'j', '冬': 'd', '表': 'b', '树': 's', '天': 't', '落': 'l',
    '叶': 'y', '步': 'b', '高': 'g', '中': 'z', '央': 'y', '民': 'm',
    '族': 'z', '乐': 'l', '团': 't', '地': 'd', '美': 'm', '诗': 's',
    '一': 'y', '味': 'w', '至': 'z', '渔': 'y', '樵': 'q', '问': 'w',
    '答': 'd', '疏': 's', '梅': 'm', '弄': 'n', '影': 'y', '海': 'h',
    '奔': 'b', '腾': 't', '悟': 'w', '聚': 'j', '友': 'y', '之': 'z',
    '音': 'y', '星': 'x', '雨': 'y', '银': 'y', '色': 's', '沙': 's',
    '滩': 't', '清': 'q', '淡': 'd', '真': 'z', '浪': 'l', '漫': 'm',
    '火': 'h', '阳': 'y', '春': 'c', '白': 'b', '雪': 'x', '紫': 'z',
    '竹': 'z', '调': 'd', '语': 'y', '善': 's', '缘': 'y', '舟': 'z',
    '唱': 'c', '晚': 'w', '悲': 'b', '梦': 'm', '汽': 'q', '灌': 'g',
    '想': 'x', '冥': 'm', '空': 'k', '碧': 'b', '涧': 'j', '泉': 'q',
    '觉': 'j', '完': 'w', '儿': 'e', '河': 'h', '森': 's', '林': 'l',
    '幻': 'h', '出': 'c', '莲': 'l', '花': 'h', '好': 'h', '圆': 'y',
    '金': 'j', '蛇': 's', '狂': 'k', '舞': 'w', '李': 'l', '志': 'z',
    '辉': 'h', '段': 'd', '银': 'y', '莹': 'y', '付': 'f', '娜': 'n',
    '赵': 'z', '聪': 'c', '郭': 'g', '关': 'g', '林': 'l', '城': 'c',
    '陈': 'c', '勃': 'b', '熊': 'x', '韵': 'y', '吕': 'l', '培': 'p',
    '原': 'y', '传': 'c', '奇': 'q', '坊': 'f', '纯': 'c', '华': 'h',
    '群': 'q'
}

def get_pinyin_initial(text):
    result = []
    for char in text:
        if char in pinyin_map:
            result.append(pinyin_map[char])
        elif '\u4e00' <= char <= '\u9fff':
            result.append('x')
        elif char.isalpha():
            result.append(char.lower())
    return ''.join(result)[:6]

def clean_title(title):
    # 移除开头的数字和横线
    title = re.sub(r'^\d+[-–—]?', '', title)
    # 移除括号及其内容
    title = re.sub(r'[（(].*?[）)]', '', title)
    # 移除横线后的内容
    title = re.sub(r'[-–—].*$', '', title)
    # 去除首尾空格
    title = title.strip()
    return title if title else '未知曲目'

# 生成JS文件内容
js_content = """// 养生音乐播放列表
var yangshengMusic = [
"""

for i, song in enumerate(music_info):
    title = song['title']
    artist = song['artist']
    album = song['album']
    filename = song['filename']
    
    # 清理标题
    clean_title_text = clean_title(title)
    
    # 生成封面名称
    cover_name = get_pinyin_initial(clean_title_text)
    
    # 生成MP3路径
    mp3_path = f"mp3/yangsheng/{filename}"
    
    # 生成JS对象
    js_content += f"  {{title: '{clean_title_text}', artist: '{artist}', cover: 'img/yangsheng/{cover_name}.png', mp3: '{mp3_path}', ogg: ''}}"
    
    if i < len(music_info) - 1:
        js_content += ",\n"
    else:
        js_content += "\n"

js_content += "];\n"

# 保存JS文件
with open(r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\script-yangsheng.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"已生成 script-yangsheng.js 文件，包含 {len(music_info)} 首歌曲")

# 输出封面名称列表
print("\n封面名称列表：")
cover_names = set()
for song in music_info:
    clean_title_text = clean_title(song['title'])
    cover_name = get_pinyin_initial(clean_title_text)
    cover_names.add(cover_name)
    print(f"{clean_title_text} -> {cover_name}.png")

print(f"\n共需创建 {len(cover_names)} 个封面图片")
