"""
价签工坊 - 批量生成占位模板
生成: 占位背景图(JPG)、模板CSS、更新 templates.js 条目、更新 price-maker.html 的 link 标签
"""
import os, re, textwrap
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_JS = os.path.join(ROOT, "assets", "js", "templates.js")
PRICE_MAKER = os.path.join(ROOT, "price-maker.html")
CSS_DIR = os.path.join(ROOT, "assets", "css", "templates")
IMG_BASE = os.path.join(ROOT, "assets", "templates")

# ---- 行业定义 ----
INDUSTRIES = [
    {"id": "vegetable", "label": "蔬菜",     "prefix": "V", "enabled": True,  "existing": ["V01","V02","V03","V04","V05","V06","V07","V08"],
     "img_fmt": "V{i:02d}.jpg",
     "desc": "当季鲜蔬 · 每日供应", "colors": ["#8DBF5C","#A6CE6C","#6DB049","#95C75A","#7DBE4F","#B5D873","#82C052","#A8D36A"]},
    {"id": "fruit",     "label": "水果",     "prefix": "F", "enabled": True,  "existing": [f"F{i:02d}" for i in range(1,15)], "count": 16,
     "desc": "新鲜果切 · 每日到货", "colors": ["#F09819","#F53838","#FF6B6B","#E74C3C","#F39C12","#E67E22","#C0392B","#D35400"]},
    {"id": "bakery",    "label": "面包烘焙", "prefix": "B", "enabled": True,  "count": 16, "existing": [f"B{i:02d}" for i in range(1,17)],
     "img_fmt": "B{i:02d}.jpg",
     "desc": "现烤烘焙 · 每日出炉", "colors": ["#C9A36E","#D4A574","#E3B58D","#B5874F","#F5DEB3","#DEB887","#C19A6B","#CD853F"]},
    {"id": "tea",       "label": "奶茶果茶", "prefix": "T", "enabled": True,  "count": 22, "existing": [f"T{i:02d}" for i in range(1,23)],
     "desc": "现制鲜饮 · 每日鲜泡", "colors": ["#F8B4B4","#D4B5E0","#FFD3B6","#FFAAA5","#AED6F1","#D5A6E1","#F5CBA7","#C9E4CA"]},
    {"id": "coffee",    "label": "咖啡饮品", "prefix": "C", "enabled": True,  "count": 16, "existing": [],
     "desc": "手冲意式 · 现磨现做", "colors": ["#6F4E37","#3C2415","#8B6F47","#A0522D","#5D3A1A","#9B7653","#704214","#4A2C17"]},
    {"id": "meat",      "label": "肉类水产", "prefix": "M", "enabled": True,  "existing": [],
     "desc": "鲜切现卖 · 冷链直达", "colors": ["#C0392B","#E74C3C","#FF6B6B","#B03A2E","#922B21","#F5B7B1","#D7BDE2","#F1948A"]},
    {"id": "flower",    "label": "花店绿植", "prefix": "Fl","enabled": True,  "existing": [],
     "desc": "鲜花绿植 · 每日精选", "colors": ["#9B59B6","#FF6B9D","#BB8FCE","#F1948A","#D7BDE2","#F5B7B1","#A9DFBF","#85C1E9"]},
    {"id": "home",      "label": "家居家纺", "prefix": "H", "enabled": True,  "count": 24, "existing": [],
     "desc": "全棉家纺 · 品质生活", "colors": ["#7A9BB5","#B7C9D3","#8E9EAB","#A3B8C2","#6E8CA0","#C2A88A","#9FB2AC","#7C8CA5"]},
]

IMG_W, IMG_H = 380, 540  # 价签占位尺寸（A4 比例）

# —— 行业口号库：每行业 12 条，每个模板按序偏移取 6 条（相邻模板不同组合） ——
SLOGAN_BANKS = {
    "common":    ["精选好物 品质生活", "好物推荐 每日精选", "品质生活 从这里开始", "用心挑选 只为好生活", "超值好物 天天上新", "平价好物 闭眼入不亏", "好品质 会说话", "天天平价 样样超值", "挑好货 到这里", "省心选购 一站购齐", "新品上架 惊喜连连", "真材实料 看得见"],
    "vegetable": ["每日现摘 产地直达", "新鲜到家 当季鲜蔬", "脆嫩水灵 自然好味", "田间直供 新鲜看得见", "绿色时蔬 健康每一天", "清晨采摘 午后到桌", "无公害种植 安心食用", "脆甜爽口 营养满分", "农家直供 童年的味道", "天天平价 新鲜不断", "现摘现卖 鲜到骨子里", "时令蔬菜 尝鲜正当时"],
    "fruit":     ["鲜甜多汁 果园直采", "自然熟透 当季鲜果", "脆甜爽口 营养满分", "每日鲜果 新鲜看得见", "果香四溢 甜蜜生活", "现摘现发 甜过初恋", "产地直采 尝鲜价", "果肉饱满 汁水十足", "树上熟 自然甜", "天天鲜果 天天特价", "精挑细选 只卖好果", "甜到心坎 鲜到极致"],
    "bakery":    ["现烤出炉 麦香浓郁", "手作烘焙 松软香甜", "每日现做 新鲜看得见", "匠心烘焙 好味用心造", "麦香四溢 幸福味道", "真材实料 零添加", "酥软拉丝 奶香十足", "下午茶搭子 现烤更好吃", "老面发酵 松软有嚼劲", "出炉即鲜 甜而不腻", "每日限量 售完即止", "咬一口 满嘴麦香"],
    "tea":       ["鲜果现制 真茶真奶", "清爽解腻 现摇现泡", "茶香四溢 回味甘甜", "一杯鲜茶 满满元气", "手作鲜饮 喝出好心情", "鲜奶好茶 现点现做", "果肉满满 吸得到", "真茶真奶 不添加", "冰爽一夏 快乐加倍", "每日鲜煮 满杯茶香", "好茶配好果 双倍快乐", "喝一口 透心凉"],
    "coffee":    ["现磨现萃 醇香回甘", "匠心手冲 每日鲜烘", "香醇浓郁 唤醒每一天", "一杯好咖 慢享时光", "豆香满溢 品质生活", "鲜烘豆 每日现萃", "拉花细腻 口感顺滑", "焦香回甘 余韵悠长", "深浅烘焙 任你选", "提神醒脑 元气满格", "好豆好水 好咖啡", "慢下来 喝杯好咖"],
    "meat":      ["新鲜现切 冷链直达", "肉质鲜嫩 当日鲜售", "源头直供 品质保障", "每日鲜肉 新鲜看得见", "精选好肉 安心到家", "现宰现切 不隔夜", "纹理清晰 肉香十足", "屠宰直达 鲜嫩多汁", "好肉现切 明码实价", "荤素搭配 美味家常", "肉质紧实 炖炒皆宜", "天天鲜送 件件放心"],
    "flower":    ["鲜花速递 每日鲜达", "浪漫绽放 美好相伴", "新鲜花材 用心搭配", "绿意生活 花开满屋", "一花一世界 天天新鲜", "晨间现采 香气满分", "花好月圆 好事将至", "精心配花 心意满满", "鲜花到家 幸福常在", "应季鲜花开 得正好", "送人悦己 都是浪漫", "花期更长 开得更艳"],
    "home":      ["全棉亲肤 柔软舒适", "品质家纺 安睡整晚", "精选面料 呵护肌肤", "舒适好眠 从这套开始", "家的味道 一床温暖", "A类母婴级 安心之选", "透气亲肤 四季适用", "工艺考究 细节见品质", "焕新卧室 品质生活", "柔软蓬松 云朵触感", "每日好家纺 天天特价", "睡出好状态 就选这套"],
}


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
        "T": "#9b59b6", "C": "#3c2415", "M": "#922b21", "Fl": "#7d3c98", "H": "#5d6b7a"
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
    [data-tpl="{tpl_id}"] .ptag-slogan {{
      left: calc(var(--mm) * 0);
      top: calc(var(--mm) * 168);
      width: calc(var(--mm) * 210);
      height: calc(var(--mm) * 14);
      color: {color};
      font-family: var(--font-serif);
      font-weight: 400;
      font-size: calc(var(--mm) * 12);
    }}
    """)


def run():
    # ---- 1. 生成占位背景图 + 新 CSS ----
    new_ids = []  # 本次新生成的模板 ID
    for ind in INDUSTRIES:
        industry_img_dir = os.path.join(IMG_BASE, ind["id"])
        os.makedirs(industry_img_dir, exist_ok=True)

        colors = ind["colors"]
        count = ind.get("count", 8)  # 每行业数量，默认 8
        img_fmt = ind.get("img_fmt", "{i}.jpg")  # 图片文件名格式（蔬菜/烘焙为 V01.jpg 式）

        for i in range(1, count + 1):
            tpl_id = f"{ind['prefix']}{i:02d}"
            is_new = tpl_id not in ind["existing"]
            bg_name = img_fmt.format(i=i)
            bg_path = os.path.join(industry_img_dir, bg_name)
            css_path = os.path.join(CSS_DIR, f"{tpl_id}.css")

            # 占位背景图（仅在文件不存在时生成；绝不覆盖用户已有素材）
            if not os.path.exists(bg_path):
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
        count = ind.get("count", 8)
        img_fmt = ind.get("img_fmt", "{i}.jpg")  # 必须在循环内取，不能用上一个循环的遗留值
        ind_offset = 0  # 口号取用偏移，按模板序号递增
        for i in range(1, count + 1):
            tpl_id = f"{ind['prefix']}{i:02d}"
            title_map = {
                "vegetable": ["黑板手绘","田园素描","牛皮纸复古","市集红黄","萌趣农场","复古金框","水彩果园","清新几何"],
                "fruit":     ["鲜果红妆","清凉果切","橙香满溢","蜜果香园","热带果林","蜜杏香桃","莓果红妆","鲜果白卡","果园晨露","鲜果物语","果漾清甜","缤纷果盒","果香满园","果然新鲜","鲜果优果仓","水果严选"],
                "bakery":    ["欧式花框","麦香烘焙","牛皮纸焙坊","萌趣面包","粉甜时光","黑金焙艺","焙香案板","暖阳烘焙"],
                "tea":       ["温暖奶茶","真果鲜茶","醇香奶绿","果香柠檬","复古饮品屋","萌趣奶茶","潮流果饮","芝士奶盖","黑糖波波","杨枝甘露","满杯百香","莓莓酪酪","葡萄冻冻","椰椰芒芒","蜜桃乌龙","茉莉初雪","四季春茶","柠檬冻茶","焦糖珍珠","抹茶星尘","红豆奶露","桂花酿奶"],
                "coffee":    ["意式浓醇","手冲慢享","拿铁奶泡","美式黑咖","摩卡浓香","焦糖玛奇","冷萃冰咖","咖啡手账","咖啡物语","云朵拿铁","深焙时光","香醇可颂","慢焙工坊","冰博克厚乳","生椰拿铁","焦糖海盐"],
                "meat":      ["鲜切牛肉","梅花五花","水晶里脊","黑椒牛排","泰式酸辣","红烧排骨","孜然羊肉","秘制卤味"],
                "flower":    ["鲜花花束","小清新绿植","欧式花艺","韩式花束","满天星","永生花盒","多肉小铺","春日花园"],
                "home":      ["全棉四件套","蚕丝抗菌被","羽绒冬被","乳胶护颈枕","凉感冰丝席","磨毛加厚套","羊绒盖毯","荞麦方枕","儿童床上套","北欧简约被","婚庆大红套","记忆棉床垫","法兰绒毛毯","蒙古包蚊帐","双面竹凉席","抱枕靠垫","浴巾三件套","全棉枕套对","亚麻桌布","遮光窗帘布","地毯爬行垫","毛巾礼盒装","真丝眼罩","床尾巾装饰"],
            }
            titles = title_map.get(ind["id"], [f"{ind['label']}{tpl_id}" for _ in range(count)])
            title = titles[(i - 1) % len(titles)]
            bg_rel = f"assets/templates/{ind['id']}/{img_fmt.format(i=i)}"
            # 每个模板 6 条口号：从 12 条行业库按序偏移取 6 条，相邻模板错开，便于后续"可选口号"功能
            bank = SLOGAN_BANKS.get(ind["id"], SLOGAN_BANKS["common"])
            offset = ((ind_offset) * 2) % len(bank)
            slg = [bank[(offset + k) % len(bank)] for k in range(6)]
            ind_offset += 1
            slg_js = ", ".join(f"'{s}'" for s in slg)
            all_entries.append(
                f"  {{ id: '{tpl_id}', title: '{title}', industry: '{ind['id']}', bg: '{bg_rel}', slogans: [{slg_js}] }},"
            )

    emoji_map = {"vegetable": "🥬", "fruit": "🍎", "bakery": "🍞", "tea": "🧋", "coffee": "☕", "meat": "🥩", "flower": "💐", "home": "🛏️"}
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

    // —— 宣传口号池（按行业预存，每个 6-12 字；默认取第一个，用户后续可选） ——
    // 注意：重建 templates.js 时必须保留，渲染端 render.js 依赖此变量
    window.TMPL_SLOGAN_POOLS = {{
      common:    ['精选好物 品质生活', '好物推荐 每日精选', '品质生活 从这里开始', '用心挑选 只为好生活', '超值好物 天天上新'],
      vegetable: ['每日现摘 产地直达', '新鲜到家 当季鲜蔬', '脆嫩水灵 自然好味', '田间直供 新鲜看得见', '绿色时蔬 健康每一天'],
      fruit:     ['鲜甜多汁 果园直采', '自然熟透 当季鲜果', '脆甜爽口 营养满分', '每日鲜果 新鲜看得见', '果香四溢 甜蜜生活'],
      bakery:    ['现烤出炉 麦香浓郁', '手作烘焙 松软香甜', '每日现做 新鲜看得见', '匠心烘焙 好味用心造', '麦香四溢 幸福味道'],
      tea:       ['鲜果现制 真茶真奶', '清爽解腻 现摇现泡', '茶香四溢 回味甘甜', '一杯鲜茶 满满元气', '手作鲜饮 喝出好心情'],
      coffee:    ['现磨现萃 醇香回甘', '匠心手冲 每日鲜烘', '香醇浓郁 唤醒每一天', '一杯好咖 慢享时光', '豆香满溢 品质生活'],
      meat:      ['新鲜现切 冷链直达', '肉质鲜嫩 当日鲜售', '源头直供 品质保障', '每日鲜肉 新鲜看得见', '精选好肉 安心到家'],
      flower:    ['鲜花速递 每日鲜达', '浪漫绽放 美好相伴', '新鲜花材 用心搭配', '绿意生活 花开满屋', '一花一世界 天天新鲜']
    }};

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

    # 替换 style.css 之后连续的整段模板 link 块（必须匹配到块尾，否则会留下重复链接）
    html_new = re.sub(
        r'(<link rel="stylesheet" href="assets/css/style\.css\?v=\d+">\n)(?:<link rel="stylesheet" href="assets/css/templates/[^"]+">\n)+',
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
