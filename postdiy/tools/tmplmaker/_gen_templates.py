"""
价签工坊 - 批量生成占位模板
生成: 占位背景图(JPG)、模板CSS、更新 templates.js 条目、更新 price-maker.html 的 link 标签
"""
import os, textwrap
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_JS = os.path.join(ROOT, "assets", "js", "templates.js")
PRICE_MAKER = os.path.join(ROOT, "price-maker.html")
CSS_DIR = os.path.join(ROOT, "assets", "css", "templates")
IMG_BASE = os.path.join(ROOT, "assets", "templates")

# ---- 行业定义 ----
INDUSTRIES = [
    {"id": "vegetable", "label": "蔬菜",     "prefix": "V", "enabled": True,  "existing": ["V09","V10","V11","V12","V13","V14","V15","V16"],
     "desc": "当季鲜蔬 · 每日供应", "colors": ["#8DBF5C","#A6CE6C","#6DB049","#95C75A","#7DBE4F","#B5D873","#82C052","#A8D36A"]},
    {"id": "fruit",     "label": "水果",     "prefix": "F", "enabled": True,  "existing": [],
     "desc": "新鲜果切 · 每日到货", "colors": ["#F09819","#F53838","#FF6B6B","#E74C3C","#F39C12","#E67E22","#C0392B","#D35400"]},
    {"id": "bakery",    "label": "面包烘焙", "prefix": "B", "enabled": True,  "existing": [f"B{i:02d}" for i in range(1,17)],
     "desc": "现烤烘焙 · 每日出炉", "colors": ["#C9A36E","#D4A574","#E3B58D","#B5874F","#F5DEB3","#DEB887","#C19A6B","#CD853F"]},
    {"id": "tea",       "label": "奶茶果茶", "prefix": "T", "enabled": True,  "existing": [f"T{i:02d}" for i in range(1,8)],
     "desc": "现制鲜饮 · 每日鲜泡", "colors": ["#F8B4B4","#D4B5E0","#FFD3B6","#FFAAA5","#AED6F1","#D5A6E1","#F5CBA7","#C9E4CA"]},
    {"id": "coffee",    "label": "咖啡饮品", "prefix": "C", "enabled": True,  "existing": [],
     "desc": "手冲意式 · 现磨现做", "colors": ["#6F4E37","#3C2415","#8B6F47","#A0522D","#5D3A1A","#9B7653","#704214","#4A2C17"]},
    {"id": "meat",      "label": "肉类水产", "prefix": "M", "enabled": True,  "existing": [],
     "desc": "鲜切现卖 · 冷链直达", "colors": ["#C0392B","#E74C3C","#FF6B6B","#B03A2E","#922B21","#F5B7B1","#D7BDE2","#F1948A"]},
    {"id": "flower",    "label": "花店绿植", "prefix": "Fl","enabled": True,  "existing": [],
     "desc": "鲜花绿植 · 每日精选", "colors": ["#9B59B6","#FF6B9D","#BB8FCE","#F1948A","#D7BDE2","#F5B7B1","#A9DFBF","#85C1E9"]},
]

IMG_W, IMG_H = 380, 540  # 价签占位尺寸（A4 比例）


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def make_placeholder_jpg(path, bg_hex, tpl_id):
    """生成渐变背景 + 编号文字的占位图"""
    w, h = IMG_W, IMG_H
    bg = hex_to_rgb(bg_hex)
    img = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(img)

    # 白色渐变遮罩（让编号清晰）
    for y in range(h // 3, h):
        alpha = int(180 * (y - h // 3) / (h * 2 // 3))
        r, g, b = bg
        nr = min(255, r + (255 - r) * alpha // 255)
        ng = min(255, g + (255 - g) * alpha // 255)
        nb = min(255, b + (255 - b) * alpha // 255)
        draw.line([(0, y), (w, y)], fill=(nr, ng, nb))

    # 尝试加载字体
    font_big = None
    font_small = None
    for fp in [
        r"C:\Users\ThinkPad\miniconda3\envs\TraeAI\Library\fonts\simhei.ttf",
        r"C:\Windows\Fonts\msyh.ttc",
        r"C:\Windows\Fonts\simhei.ttf",
        r"C:\Windows\Fonts\simsun.ttc",
    ]:
        if os.path.exists(fp):
            try:
                font_big = ImageFont.truetype(fp, 72)
                font_small = ImageFont.truetype(fp, 22)
                break
            except Exception:
                pass
    if font_big is None:
        font_big = ImageFont.load_default()
        font_small = font_big

    # 编号（顶部）
    draw.text((w // 2, 80), tpl_id, fill=(40, 40, 40), font=font_big, anchor="mm")
    # 副标题
    draw.text((w // 2, 150), "占位模板", fill=(80, 80, 80), font=font_small, anchor="mm")
    # 底部装饰线
    draw.line([(40, h - 60), (w - 40, h - 60)], fill=(180, 180, 180), width=2)
    draw.text((w // 2, h - 40), "template placeholder", fill=(140, 140, 140), font=font_small, anchor="mm")

    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "JPEG", quality=88)


def make_default_css(tpl_id, label):
    """生成默认模板 CSS（商品名称在上，价格在下）"""
    color_map = {
        "V": "#2f6b2a", "F": "#c0392b", "B": "#6b4423",
        "T": "#9b59b6", "C": "#3c2415", "M": "#922b21", "Fl": "#7d3c98"
    }
    prefix = tpl_id[0]
    color = color_map.get(prefix, "#333333")

    return textwrap.dedent(f"""\
    /* 模板 {tpl_id}（{label}）— 默认占位样式，后续可调整 */
    [data-tpl="{tpl_id}"] .ptag-name {{
      left: calc(var(--mm) * 15);
      top: calc(var(--mm) * 80);
      width: calc(var(--mm) * 180);
      height: calc(var(--mm) * 24);
      color: {color};
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: calc(var(--mm) * 28);
      letter-spacing: calc(var(--mm) * 2);
    }}
    [data-tpl="{tpl_id}"] .ptag-price {{
      left: calc(var(--mm) * 15);
      top: calc(var(--mm) * 118);
      width: calc(var(--mm) * 180);
      height: calc(var(--mm) * 80);
      gap: calc(var(--mm) * 7);
    }}
    [data-tpl="{tpl_id}"] .ptag-num {{
      color: {color};
      font-family: var(--font-douyin);
      font-size: calc(var(--mm) * 100);
    }}
    [data-tpl="{tpl_id}"] .ptag-unit {{
      color: {color};
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: calc(var(--mm) * 26);
      padding-bottom: calc(var(--mm) * 8);
    }}
    """)


def run():
    # ---- 1. 生成占位背景图 + 新 CSS ----
    new_ids = []  # 本次新生成的模板 ID
    for ind in INDUSTRIES:
        industry_img_dir = os.path.join(IMG_BASE, ind["id"])
        os.makedirs(industry_img_dir, exist_ok=True)

        colors = ind["colors"]
        count = 8  # 每个行业 8 个

        for i in range(1, count + 1):
            tpl_id = f"{ind['prefix']}{i:02d}"
            is_new = tpl_id not in ind["existing"]
            bg_path = os.path.join(industry_img_dir, f"{i}.jpg")
            css_path = os.path.join(CSS_DIR, f"{tpl_id}.css")

            # 占位背景图（仅新生成；已存在的跳过，避免覆盖用户已有素材）
            if is_new or not os.path.exists(bg_path):
                color = colors[(i - 1) % len(colors)]
                make_placeholder_jpg(bg_path, color, tpl_id)
                if is_new:
                    print(f"  新增图片 {bg_path}")

            # 生成 CSS（仅新模板；已有 CSS 不覆盖）
            if is_new and not os.path.exists(css_path):
                with open(css_path, "w", encoding="utf-8") as f:
                    f.write(make_default_css(tpl_id, ind["label"]))
                print(f"  新增 CSS {css_path}")
                new_ids.append(tpl_id)

    print(f"\n本次新增模板 CSS 共 {len(new_ids)} 个")

    # ---- 2. 重建 templates.js ----
    all_entries = []
    for ind in INDUSTRIES:
        industry_img_dir = os.path.join(IMG_BASE, ind["id"])
        count = 8
        for i in range(1, count + 1):
            tpl_id = f"{ind['prefix']}{i:02d}"
            title_map = {
                "vegetable": ["黑板手绘","田园素描","牛皮纸复古","市集红黄","萌趣农场","复古金框","水彩果园","清新几何"],
                "fruit":     ["鲜果红妆","清凉果切","橙香满溢","蜜果香园","热带果林","蜜杏香桃","莓果红妆","鲜果白卡"],
                "bakery":    ["欧式花框","麦香烘焙","牛皮纸焙坊","萌趣面包","粉甜时光","黑金焙艺","焙香案板","暖阳烘焙"],
                "tea":       ["温暖奶茶","真果鲜茶","醇香咖啡","果香柠檬","复古饮品屋","萌趣奶茶","潮流果饮","芝士奶盖"],
                "coffee":    ["意式浓醇","手冲慢享","拿铁奶泡","美式黑咖","摩卡浓香","焦糖玛奇","冷萃冰咖","咖啡手账"],
                "meat":      ["鲜切牛肉","梅花五花","水晶里脊","黑椒牛排","泰式酸辣","红烧排骨","孜然羊肉","秘制卤味"],
                "flower":    ["鲜花花束","小清新绿植","欧式花艺","韩式花束","满天星","永生花盒","多肉小铺","春日花园"],
            }
            titles = title_map.get(ind["id"], [f"{ind['label']}{tpl_id}" for _ in range(count)])
            title = titles[(i - 1) % len(titles)]
            bg_rel = f"assets/templates/{ind['id']}/{i}.jpg"
            all_entries.append(
                f"  {{ id: '{tpl_id}', title: '{title}', industry: '{ind['id']}', bg: '{bg_rel}' }},"
            )

    industries_block = "\n".join(
        f"  {{ id: '{i['id']}', label: '{i['label']}', emoji: '{chr(ord(i['emoji'])-0 if isinstance(i.get('emoji','🍞'),str) else 0)}', desc: '{i['desc']}', enabled: {str(i['enabled']).lower()} }},"
        for i in INDUSTRIES
    )
    # emoji handling - keep originals
    emoji_map = {"vegetable": "🥬", "fruit": "🍎", "bakery": "🍞", "tea": "🧋", "coffee": "☕", "meat": "🥩", "flower": "💐"}
    industries_block = "\n".join(
        f"  {{ id: '{i['id']}', label: '{i['label']}', emoji: '{emoji_map.get(i['id'],'📦')}', desc: '{i['desc']}', enabled: {str(i['enabled']).lower()} }},"
        for i in INDUSTRIES
    )

    new_js = textwrap.dedent(f"""\
    /**
     * 价签工坊 - 模板元数据（自动批量生成）
     */
    window.TMPL_INDUSTRIES = [
    {industries_block}
    ];

    window.TMPL_TEMPLATES = [
    {chr(10).join(all_entries)}
    ];

    window.TMPL_SLOGANS = [
      '新鲜直达 · 自然好味',
      '每日新鲜 · 健康生活',
      '新鲜采摘 · 品质优选',
      '绿色天然 · 营养丰富',
      '当季鲜蔬 · 每日供应',
      '自然好味 · 新鲜看得见',
      '手工制作 · 每日现做',
      '匠心出品 · 品质保证'
    ];

    window.TMPL_UNITS = ['元/斤', '元/公斤', '元/个', '元/份', '元/盒', '元/袋', '元/把', '元/只'];
    """)

    with open(TEMPLATES_JS, "w", encoding="utf-8") as f:
        f.write(new_js)
    print(f"\n已重建 templates.js 共 {len(all_entries)} 个模板条目")

    # ---- 3. 重建 price-maker.html 的 template CSS link 块 ----
    with open(PRICE_MAKER, "r", encoding="utf-8") as f:
        html = f.read()

    # 收集所有模板 id 按字母排序
    all_tpl_ids = [entry.split("'")[1] for entry in all_entries]

    # 生成 link 行
    link_lines = []
    for tpl_id in all_tpl_ids:
        link_lines.append(f'<link rel="stylesheet" href="assets/css/templates/{tpl_id}.css?v=1">')
    links_block = "\n".join(link_lines)

    # 替换现有 template css link 块（从第一个 V*.css 到最后一个 T*.css 之间）
    import re
    html_new = re.sub(
        r'(<link rel="stylesheet" href="assets/css/style\.css\?v=\d+">\n)(?:<link rel="stylesheet" href="assets/css/templates/[^"]+">)',
        r'\1' + links_block + '\n',
        html,
        count=1,
    )

    # 如果没匹配到就直接追加到 style.css 后面
    if html_new == html:
        print("WARN: 正则替换 template css links 未命中，尝试简单追加")
        html_new = html.replace(
            '<link rel="stylesheet" href="assets/css/style.css?v=25">\n',
            '<link rel="stylesheet" href="assets/css/style.css?v=25">\n' + links_block + '\n'
        )

    with open(PRICE_MAKER, "w", encoding="utf-8") as f:
        f.write(html_new)
    print(f"已更新 price-maker.html 的 template CSS link 块")

    print("\n✅ 全部完成！")


if __name__ == "__main__":
    run()
