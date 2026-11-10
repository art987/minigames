# -*- coding: utf-8 -*-
"""
enreader 构建脚本
把 pedingfiles/*.txt 解析为 data/articles.js（window.ENR_DATA）

源文本约定（每个句子为三行一组）：
  1) 英文韵律行：╷ = 词间气口，/ = 短暂停顿，// = 句末长停顿，**word** = 重读
  2) 中文逐词对照行：与英文行同样以 / 和 ╷ 分隔，短语数量一一对应
  3) → 开头的中文意译行
段落之间用单独一行 `/` 分隔；每段后有「📖 朗读建议：」块；文末为「### 📋 重点词汇表」表格。
"""
import glob
import os
import re
import json
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC_DIR = os.path.join(ROOT, "pedingfiles")
OUT_PATH = os.path.join(ROOT, "data", "articles.js")

# 分类映射：标题命中关键词 → 归入对应分类
CATEGORY_RULES = [
    ("爱情", "emotion"), ("恋爱", "emotion"), ("情感", "emotion"), ("婚姻", "emotion"),
]
CATEGORIES = {
    "emotion": {"name": "情感与关系", "icon": "💜"},
    "daily":   {"name": "日常生活", "icon": "🌱"},
}
DEFAULT_CATEGORY = "daily"

CJK = re.compile(r"[\u4e00-\u9fff]")
HAS_LETTER = re.compile(r"[A-Za-z]")

# 标点：单词点击朗读时需要剥掉
PUNCT = ".,!?;:\"'“”‘’()（）…—-"


def is_en_line(line: str) -> bool:
    return bool(HAS_LETTER.search(line)) and not CJK.search(line)


def parse_phrase(rp: str):
    """解析一个英文短语 → (tokens, seps)
    tokens: [{"t": 词, "s": 是否重读}]；seps[i] = tokens[i] 与 tokens[i+1] 之间的分隔："b"=气口╷，"s"=空格
    """
    s = rp.replace("**", "\x02")
    tokens, seps = [], []
    cur_sep, stress = None, False
    pattern = re.compile(r"([^\s\u2574-\u2577\x02]+)|(\x02)|([\u2574-\u2577]+)|(\s+)")
    for m in pattern.finditer(s):
        if m.group(1):
            if tokens:
                seps.append(cur_sep or "s")
            tokens.append({"t": m.group(1), "s": stress})
            cur_sep = None
        elif m.group(2):
            stress = not stress
        elif m.group(3):
            cur_sep = "b"
        elif m.group(4):
            if cur_sep is None:
                cur_sep = "s"
    return tokens, seps


def split_en_chunks(tokens, seps):
    """按气口╷把英文短语切成子块；seps[i] = tokens[i] 与 tokens[i+1] 之间的分隔"""
    chunks, cur = [], [tokens[0]["t"]]
    for i in range(1, len(tokens)):
        if seps[i - 1] == "b":
            chunks.append(cur)
            cur = [tokens[i]["t"]]
        else:
            cur.append(tokens[i]["t"])
    chunks.append(cur)
    return chunks


def align_within(ew_list, cw_list):
    """子块内对齐：j 个中文块按位置比例分布到 k 个英文词上（block b → 词 floor(b*k/j)），
    分到同一词的多块合并为一个字符串。返回 [(ew, cw)]。"""
    k, j = len(ew_list), len(cw_list)
    out = [""] * k
    for b in range(j):
        pos = b * k // j
        out[pos] = (out[pos] + " " + cw_list[b]).strip()
    return list(zip(ew_list, out))


def align_chunks(en_chunks, cw_list):
    """块级对齐：英文子块 ↔ 中文块。一对一（1 块中文）优先，多块中文并入同一子块，
    无中文的子块留空；必须消耗全部中文块。返回每个英文子块拿到的中文块列表。"""
    n, m = len(en_chunks), len(cw_list)
    INF = float("inf")
    dp = [[INF] * (m + 1) for _ in range(n + 1)]
    bt = [[None] * (m + 1) for _ in range(n + 1)]
    dp[0][0] = 0
    for i in range(n + 1):
        for j in range(m + 1):
            if dp[i][j] == INF:
                continue
            c0 = dp[i][j]
            if i < n:
                for k in range(1, m - j + 1):                    # 子块挂 k 个中文块
                    cost = 0 if k == 1 else 1.5 + 0.6 * (k - 1)
                    if c0 + cost < dp[i + 1][j + k]:
                        dp[i + 1][j + k] = c0 + cost
                        bt[i + 1][j + k] = (j, k)
                if c0 + 2 < dp[i + 1][j]:                        # 子块无对应中文，整块留空
                    dp[i + 1][j] = c0 + 2
                    bt[i + 1][j] = (j, 0)
    i, j, out = n, m, []
    while i > 0:
        pj, k = bt[i][j]
        out.append(cw_list[pj:pj + k])
        i, j = i - 1, pj
    out.reverse()
    return out


def split_phrases(en_line: str):
    """英文行 → 短语列表；每短语 {units:[{ew,cw,s}], seps, text}"""
    line = en_line.strip().replace("//", " ").rstrip("/")
    raw_phrases = [p.strip() for p in line.split("/") if p.strip()]
    phrases = []
    for rp in raw_phrases:
        tokens, seps = parse_phrase(rp)
        if not tokens:
            continue
        text = " ".join(t["t"] for t in tokens)
        phrases.append({"tokens": tokens, "seps": seps, "text": text})
    return phrases


def sub_dp_cost(en_chunks, cw_list):
    """块级对齐（同 align_chunks 规则）的最小代价，供句级分配 DP 使用"""
    n, m = len(en_chunks), len(cw_list)
    INF = float("inf")
    dp = [[INF] * (m + 1) for _ in range(n + 1)]
    dp[0][0] = 0
    for i in range(n + 1):
        for j in range(m + 1):
            if dp[i][j] == INF:
                continue
            c0 = dp[i][j]
            if i < n:
                for k in range(1, m - j + 1):
                    cost = 0 if k == 1 else 1.5 + 0.6 * (k - 1)
                    if c0 + cost < dp[i + 1][j + k]:
                        dp[i + 1][j + k] = c0 + cost
                if c0 + 2 < dp[i + 1][j]:
                    dp[i + 1][j] = c0 + 2
    return dp[n][m]


def attach_lit(phrases, lit_raw: str):
    """中文逐词行对齐（层级 DP）：
    ① 句级：英文短语 ↔ 中文行按 / 切的分块；合并代价 = ② 的块级最小代价，
       短语数与分块数不等时自动选整体最优分配（无中文的短语留空）
    ② 块级：短语内 ╷ 子块 ↔ 中文块（作者标注的边界一一对应）
    ③ 词级：子块内多个英文词按位置比例承接中文块，其余词下方留空"""
    if not lit_raw:
        for p in phrases:
            p["units"] = [{"ew": t["t"], "cw": "", "s": t["s"]} for t in p["tokens"]]
        return
    # ╷ 与 / 同为分块边界（作者标注的对齐点，与英文行 ╷ 子块一一对应）；
    # 块内空格保留为整体（如“怀着 一种观念”是一个块，不拆词），避免词块摊平导致 DP 错配
    lit_raw = re.sub(r"[\u2574-\u2577]", "/", lit_raw)
    seg_blocks = [" ".join(s.split())
                  for s in lit_raw.split("/") if s.strip()]
    chunk_lists = [split_en_chunks(p["tokens"], p["seps"]) for p in phrases]

    n, m = len(phrases), len(seg_blocks)
    INF = float("inf")
    dp = [[INF] * (m + 1) for _ in range(n + 1)]
    bt = [[None] * (m + 1) for _ in range(n + 1)]
    dp[0][0] = 0
    for i in range(n + 1):
        for j in range(m + 1):
            if dp[i][j] == INF:
                continue
            c0 = dp[i][j]
            if i < n:
                for k in range(1, m - j + 1):
                    merged = seg_blocks[j:j + k]                     # k 个整块（块=对照短语，不拆字）
                    cost = sub_dp_cost(chunk_lists[i], merged)
                    if c0 + cost < dp[i + 1][j + k]:
                        dp[i + 1][j + k] = c0 + cost
                        bt[i + 1][j + k] = (j, k)
                if c0 + 2 < dp[i + 1][j]:                        # 短语无对应中文，整句留空
                    dp[i + 1][j] = c0 + 2
                    bt[i + 1][j] = (j, 0)
    i, j, assign = n, m, []
    while i > 0:
        pj, k = bt[i][j]
        assign.append(seg_blocks[pj:pj + k])
        i, j = i - 1, pj
    assign.reverse()

    for p, chunks, blocks in zip(phrases, chunk_lists, assign):
        if not blocks:
            p["units"] = [{"ew": t["t"], "cw": "", "s": t["s"]} for t in p["tokens"]]
            continue
        cn_chunks = align_chunks(chunks, blocks)                  # ②
        units = []
        for toks, cws in zip(chunks, cn_chunks):
            units.extend(align_within(toks, cws))                 # ③
        p["units"] = [{"ew": ew, "cw": cw, "s": t["s"]} for (ew, cw), t in zip(units, p["tokens"])]


def clean_word(w: str) -> str:
    return w.strip(PUNCT)


def parse_txt(path: str):
    with open(path, "r", encoding="utf-8") as f:
        lines = [l.rstrip("\n") for l in f.readlines()]
    if not lines:
        raise ValueError(f"{path} 为空")

    # ---- 标题与元信息 ----
    title = lines[0].lstrip("#").strip()
    meta_cn, difficulty, est_words = "", "", 0
    m = re.search(r"（([^）]*)）", title)
    if m:
        meta_cn = m.group(1)
        title = title.replace(m.group(0), "").strip()
        dm = re.search(r"([\u4e00-\u9fff]+)难度", meta_cn)
        if dm:
            difficulty = dm.group(1)
        wm = re.search(r"约(\d+)字", meta_cn)
        if wm:
            est_words = int(wm.group(1))

    # ---- 正文 ----
    body_start = next((i for i, l in enumerate(lines) if l.strip() == "---"), None)
    body_end = None
    if body_start is not None:
        body_end = next((i for i, l in enumerate(lines[body_start + 1:], body_start + 1)
                         if l.strip() == "---"), None)

    paragraphs, cur = [], {"sentences": [], "tips": []}
    tips_mode = False
    scope = lines[body_start + 1: body_end] if body_start is not None else lines[1:]

    i = 0
    while i < len(scope):
        line = scope[i].strip()
        if not line or line == "---":
            i += 1
            continue
        if line == "/":  # 段落分隔
            if cur["sentences"] or cur["tips"]:
                paragraphs.append(cur)
                cur = {"sentences": [], "tips": []}
            tips_mode = False
            i += 1
            continue
        if line.startswith("📖"):
            tips_mode = True
            i += 1
            continue
        if tips_mode and line.startswith("- "):
            cur["tips"].append(line[2:].strip())
            i += 1
            continue
        tips_mode = False
        if is_en_line(line):
            phrases = split_phrases(line)
            lit_raw, natural = "", ""
            if i + 1 < len(scope) and CJK.search(scope[i + 1]) and not scope[i + 1].strip().startswith("→"):
                lit_raw = scope[i + 1].strip()
            j = i + 2 if lit_raw else i + 1
            if j < len(scope) and scope[j].strip().startswith("→"):
                natural = scope[j].strip().lstrip("→").strip()
            attach_lit(phrases, lit_raw)
            tts = ", ".join(p["text"] for p in phrases).rstrip(", ")
            if not tts.endswith((".", "!", "?")):
                tts += "."
            cur["sentences"].append({
                "phrases": phrases,
                "cn": natural,
                "tts": tts,
            })
            i = j + 1
            continue
        i += 1

    if cur["sentences"] or cur["tips"]:
        paragraphs.append(cur)

    # ---- 词汇表 ----
    vocab = []
    vstart = next((i for i, l in enumerate(lines) if "重点词汇" in l), None)
    if vstart is not None:
        for l in lines[vstart + 1:]:
            if l.strip().startswith("|") and "---" not in l:
                cells = [c.strip() for c in l.strip("|").split("|")]
                if len(cells) >= 3 and cells[0] not in ("英文", ""):
                    level = cells[3] if len(cells) > 3 else ""
                    level = re.sub(r"[^\u4e00-\u9fff]", "", level)
                    vocab.append({"w": cells[0], "ipa": cells[1], "cn": cells[2], "lv": level})

    en_words = sum(len(p["text"].split()) for para in paragraphs for s in para["sentences"] for p in s["phrases"])
    return {
        "title": title,
        "difficulty": difficulty or "日常",
        "estWords": est_words or en_words,
        "enWords": en_words,
        "paragraphs": paragraphs,
        "vocab": vocab,
    }


def main():
    files = sorted(glob.glob(os.path.join(SRC_DIR, "*.txt")))
    if not files:
        print("pedingfiles/ 下没有 txt 源文件"); sys.exit(1)

    cats = {cid: {**meta, "articles": []} for cid, meta in CATEGORIES.items()}
    for path in files:
        art = parse_txt(path)
        title_hit = next((cid for kw, cid in CATEGORY_RULES if kw in art["title"]), DEFAULT_CATEGORY)
        art["id"] = os.path.splitext(os.path.basename(path))[0]
        art["file"] = os.path.basename(path)
        art["sentCount"] = sum(len(p["sentences"]) for p in art["paragraphs"])
        cats[title_hit]["articles"].append(art)

        units = [u for p in art["paragraphs"] for s in p["sentences"] for ph in s["phrases"] for u in ph["units"]]
        blank = sum(1 for u in units if not u["cw"])
        warn = f"，{blank} 词下方无对应中文" if blank else ""
        print(f"✓ {art['file']} → [{title_hit}] {art['title']}：{len(art['paragraphs'])} 段 / {art['sentCount']} 句 / {len(units)} 词{warn}")

    data = {"version": 1, "categories": [{"id": cid, **meta} for cid, meta in cats.items()]}
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write("/* 由 build.py 自动生成，请勿手改 */\nwindow.ENR_DATA = ")
        f.write(json.dumps(data, ensure_ascii=False, separators=(",", ":")))
        f.write(";\n")
    print(f"→ 已生成 {os.path.relpath(OUT_PATH, ROOT)}")


if __name__ == "__main__":
    main()
