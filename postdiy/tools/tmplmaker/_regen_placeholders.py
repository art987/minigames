"""
重新生成高分辨率占位背景图
旧：380x540  →  新：1240x1754（A4@300dpi 的一半，打印放大 2x 即可）
"""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.abspath(__file__))

# 行业颜色
INDUSTRY_COLORS = {
    'vegetable': ((47, 107, 42), (126, 182, 98)),   # 绿
    'fruit':     ((192, 57, 43),  (241, 148, 73)),   # 红橙
    'bakery':    ((107, 68, 35),  (180, 130, 80)),   # 棕
    'tea':       ((155, 89, 182), (206, 161, 230)),  # 紫
    'coffee':    ((60, 36, 21),   (140, 90, 55)),    # 咖啡棕
    'meat':      ((146, 43, 33),  (210, 90, 70)),    # 血红
    'flower':    ((125, 60, 152), (200, 130, 220)),  # 紫粉
    'home':      ((93, 107, 122), (183, 201, 211)),  # 蓝灰
}

# 目录+需要替换的占位图数字
PLACEHOLDERS = {}  # 重要：现在所有行业的背景图都是真实素材，此脚本禁止再跑；如需新行业占位图，用 _gen_templates.py（只在文件不存在时生成）

W, H = 1240, 1754  # 约 A4 半分辨率

def make_grad(w, h, c1, c2):
    img = Image.new('RGB', (w, h))
    px = img.load()
    for y in range(h):
        t = y / (h - 1)
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        for x in range(w):
            px[x, y] = (r, g, b)
    return img

def draw_tag(img, tpl_id, color1):
    draw = ImageDraw.Draw(img)
    # 中心大字编号（深色半透明）
    big_font = None
    try:
        big_font = ImageFont.truetype("msyh.ttc", 300)
    except:
        try:
            big_font = ImageFont.truetype("C:/Windows/Fonts/msyhbd.ttc", 300)
        except:
            big_font = ImageFont.load_default()
    
    text = tpl_id
    bbox = draw.textbbox((0, 0), text, font=big_font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    cx = W // 2 - tw // 2
    cy = H // 2 - th // 2
    # 阴影
    draw.text((cx + 6, cy + 6), text, fill=(0, 0, 0, 120), font=big_font)
    # 主文字（反白色）
    draw.text((cx, cy), text, fill=(255, 255, 255), font=big_font)
    return img

total = 0
for industry, nums in PLACEHOLDERS.items():
    col1, col2 = INDUSTRY_COLORS[industry]
    for n in nums:
        path = os.path.join(ROOT, 'assets', 'templates', industry, f'{n}.jpg')
        if not os.path.exists(path):
            print(f'SKIP (不存在): {path}')
            continue
        tpl_id_map = {'vegetable': 'V', 'fruit': 'F', 'tea': 'T',
                      'coffee': 'C', 'meat': 'M', 'flower': 'Fl', 'home': 'H'}
        prefix = tpl_id_map[industry]
        tpl_id = f'{prefix}{n:02d}'
        img = make_grad(W, H, col1, col2)
        img = draw_tag(img, tpl_id, col1)
        img.save(path, 'JPEG', quality=88, optimize=True)
        size_kb = os.path.getsize(path) / 1024
        print(f'OK  {path}  ({W}x{H}, {size_kb:.0f}KB)')
        total += 1

print(f'\n完成：{total} 张占位图已重生成 → {W}x{H}')
