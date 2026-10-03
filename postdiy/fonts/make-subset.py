# 字体子集化：只保留 ASCII + GB2312 全部汉字/符号 + 常用标点，大幅压缩字体文件（省 CDN 带宽）
import os
import string
from fontTools.subset import main as subset_main

HERE = os.path.dirname(os.path.abspath(__file__))
chars = set()

# ASCII 可见字符 + 空格
for c in string.printable:
    if not c.isspace() or c == ' ':
        chars.add(c)

# GB2312 全区（6763 汉字 + 全角符号/俄文/拼音等）
for hi in range(0xA1, 0xF8):
    for lo in range(0xA1, 0xFF):
        try:
            chars.add(bytes([hi, lo]).decode('gb2312'))
        except Exception:
            pass

# 补充常用符号（防止商家名称带特殊字符）
chars.update('★☆♥♦①②③④⑤⑥⑦⑧⑨⑩·—…、「」『』【】（）《》“”‘’！？，。：；－～')

text = ''.join(sorted(chars))
with open(os.path.join(HERE, 'charset.txt'), 'w', encoding='utf-8') as f:
    f.write(text)
print('字符集字数:', len(text))

for name in ['ZCOOLXiaoWei-Regular', 'MaShanZheng-Regular', 'ZCOOLKuaiLe-Regular']:
    src = os.path.join(HERE, f'{name}.ttf')
    tmp = os.path.join(HERE, f'{name}.sub.ttf')
    subset_main([
        src,
        f'--text-file={os.path.join(HERE, "charset.txt")}',
        f'--output-file={tmp}',
        '--no-hinting',
        '--layout-features=*',
        '--desubroutinize',
    ])
    old_kb = os.path.getsize(src) // 1024
    new_kb = os.path.getsize(tmp) // 1024
    os.replace(tmp, src)  # 原位替换，文件名不变（代码里的 CDN 地址无需改动）
    print(f'{name}: {old_kb}KB -> {new_kb}KB')

os.remove(os.path.join(HERE, 'charset.txt'))
print('完成')
