# -*- coding: utf-8 -*-
"""重生成 U 模板 CSS 配色：从每张背景图提取主色相（同色系），
   名称=同色系加深加饱和（凸显），价格=更深同系色，口号=柔和中间调。
   版式：U04-U34 用调优基准；U01-U03 只替换 color 值，保留用户调的版式。"""
import os, re, colorsys
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
TPL_DIR = os.path.join(ROOT, 'assets', 'templates', 'common')
CSS_DIR = os.path.join(ROOT, 'assets', 'css', 'templates')

def clamp(v, lo, hi): return max(lo, min(hi, v))

def hexs(rgb):
    return '#%02x%02x%02x' % tuple(int(round(c * 255)) for c in rgb)

def accent_of(path):
    """提取背景图的主彩色（忽略米白底与近黑），返回 (r,g,b) 0-1 与背景亮度"""
    im = Image.open(path).convert('RGB').resize((80, 112))
    data = list(im.getdata())
    lum_sum = 0
    scored = []
    for (r, g, b) in data:
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        lum_sum += lum
        if l > 0.92 and s < 0.15:  # 米白/白底
            continue
        if l < 0.10:               # 近黑装饰
            continue
        scored.append((s * s * 1.0, h, l, s))  # 饱和度权重
    avg_lum = lum_sum / len(data)
    if scored:
        scored.sort(key=lambda x: -x[0])
        # 取饱和度权重最高的色相，并把亮度拉到该色群的中间
        _, h, l, s = scored[0]
        return h, l, s, avg_lum
    return 0.08, 0.4, 0.3, avg_lum  # 无彩色系兜底：暖棕

def palette(path):
    h, l, s, avg_lum = accent_of(path)
    light_bg = avg_lum > 135
    if light_bg:
        name = colorsys.hls_to_rgb(h, clamp(l * 0.52, 0.18, 0.45), clamp(s * 1.25, 0, 1))
        price = colorsys.hls_to_rgb(h, clamp(l * 0.34, 0.10, 0.30), clamp(s * 1.15, 0, 1))
        slogan = colorsys.hls_to_rgb(h, clamp(l * 0.78, 0.35, 0.62), clamp(s * 0.60, 0, 1))
    else:
        name = colorsys.hls_to_rgb(h, clamp(0.86, 0.75, 0.92), clamp(s * 0.85, 0, 1))
        price = colorsys.hls_to_rgb(h, clamp(0.62, 0.50, 0.72), clamp(min(1, s * 1.35), 0, 1))
        slogan = colorsys.hls_to_rgb(h, clamp(0.78, 0.68, 0.88), clamp(s * 0.65, 0, 1))
    return light_bg, hexs(name), hexs(price), hexs(slogan)

CSS_TMPL = '''/* 模板 {tpl_id}（版式基准=用户调优后的 U01-U03，配色=背景图同色系采样） */

[data-tpl="{tpl_id}"] .ptag-name {{
  left: calc(var(--mm) * 20);
  top: calc(var(--mm) * 62);
  width: calc(var(--mm) * 170);
  height: calc(var(--mm) * 27);
  color: {ink};
  font-family: var(--font-serif);
  font-size: calc(var(--mm) * 24);
  font-weight: 700;
  letter-spacing: calc(var(--mm) * 2.5);
}}

[data-tpl="{tpl_id}"] .ptag-price {{
  left: calc(var(--mm) * 0);
  top: calc(var(--mm) * 103);
  width: calc(var(--mm) * 210);
  height: calc(var(--mm) * 70);
  gap: calc(var(--mm) * 0);
}}

[data-tpl="{tpl_id}"] .ptag-num {{
  color: {price};
  font-family: var(--font-serif);
  font-size: calc(var(--mm) * 50);
  font-weight: 700;
}}

[data-tpl="{tpl_id}"] .ptag-unit {{
  color: {price};
  font-family: var(--font-serif);
  font-size: calc(var(--mm) * 11);
  font-weight: 400;
}}

[data-tpl="{tpl_id}"] .ptag-slogan {{
  left: calc(var(--mm) * 0);
  top: calc(var(--mm) * 192);
  width: calc(var(--mm) * 210);
  height: calc(var(--mm) * 22);
  color: {slogan};
  font-family: var(--font-kai);
  font-size: calc(var(--mm) * 18.5);
  font-weight: 400;
}}
'''

def patch_colors(css_path, ink, price, slogan):
    """U01-U03：只替换三个 color 值，版式保留"""
    with open(css_path, encoding='utf-8') as f:
        txt = f.read()
    def repl(block_selector, new_color, txt):
        pat = re.compile(r'(\[data-tpl="[^"]+"\] ' + block_selector + r' \{[^}]*?color:\s*)#[0-9a-fA-F]{3,8}', re.S)
        return pat.sub(r'\1' + new_color, txt, count=1)
    txt = repl('.ptag-name', ink, txt)
    txt = repl('.ptag-num', price, txt)
    txt = repl('.ptag-unit', price, txt)
    txt = repl('.ptag-slogan', slogan, txt)
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(txt)

for n in range(1, 35):
    tpl_id = 'U%02d' % n
    img = os.path.join(TPL_DIR, '%d.jpg' % n)
    light_bg, ink, price, slogan = palette(img)
    css_path = os.path.join(CSS_DIR, tpl_id + '.css')
    if n <= 3:
        patch_colors(css_path, ink, price, slogan)
        mode = 'patched colors only'
    else:
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(CSS_TMPL.format(tpl_id=tpl_id, ink=ink, price=price, slogan=slogan))
        mode = 'regenerated'
    print('%s %s [%s] ink=%s price=%s slogan=%s' % (
        tpl_id, 'LIGHT' if light_bg else 'DARK ', mode, ink, price, slogan))
print('done')
