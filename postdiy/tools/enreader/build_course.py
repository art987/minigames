# -*- coding: utf-8 -*-
"""
enreader 课程构建脚本
把 pedingfiles/*.json（ChatGPT 生成的课程批次）解析为：
  data/course-manifest.js   → window.ENR_COURSE（阶段定义 + 每篇元信息，无正文）
  data/days/dayNNN.js       → window.ENR_DAY（单日完整数据，阅读页按需加载）

新增批次 = 把 json 丢进 pedingfiles/ 后运行 python build_course.py
"""
import glob
import os
import re
import json
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC_DIR = os.path.join(ROOT, "pedingfiles")
OUT_DIR = os.path.join(ROOT, "data")
DAYS_DIR = os.path.join(OUT_DIR, "days")

# 六阶段定义（来自课程规范，365 天）
STAGES = [
    {"id": 1, "name": "认识自己与身边世界", "short": "敢开口",     "days": [1, 45],    "cefr": "A1",      "range": [30, 50]},
    {"id": 2, "name": "走进日常生活",      "short": "能交流",     "days": [46, 105],  "cefr": "A1-A2",   "range": [50, 75]},
    {"id": 3, "name": "应对真实生活场景",  "short": "会表达",     "days": [106, 180], "cefr": "A2",      "range": [70, 100]},
    {"id": 4, "name": "建立自然沟通能力",  "short": "能沟通",     "days": [181, 255], "cefr": "A2-B1",   "range": [90, 120]},
    {"id": 5, "name": "表达思想与个人观点", "short": "善表达",    "days": [256, 315], "cefr": "B1",      "range": [110, 140]},
    {"id": 6, "name": "自如运用英语交流",  "short": "能自如交流", "days": [316, 365], "cefr": "B1-B2",   "range": [130, 160]},
]

WORDS = re.compile(r"[A-Za-z0-9']+")
PUNCT_ONLY = re.compile(r"^[\s,.!?;:'\"()\[\]{}—…·]+$")


def word_count(text: str) -> int:
    """正文词数：按空白分词，缩写算一个词（与源数据统计口径一致）"""
    return len(text.split())


def clean_text(t):
    """清洗 chunk 文本：压缩空白、去掉标点前的空格（interests . → interests.）"""
    t = re.sub(r"\s+", " ", t.strip())
    return re.sub(r"\s+([,.!?;:])", r"\1", t)


def normalize_chunks(sent):
    """把 chunks 归一化为 [{text, meaning}]，兼容三种源格式：
    ① [{text, meaning}] 对象数组；② ["短语", ...] 字符串数组（Day 136-180）；
    ③ 文本内标点前带空格/多余空白的（Day 286+）。
    纯标点片段（如 ", "）并入前一组，避免渲染出单独的标点组。"""
    out = []
    pending_head = ""   # 开头遇到纯标点时暂存，并入下一组
    for c in sent.get("chunks", []):
        if isinstance(c, dict):
            raw, meaning = clean_text(c.get("text", "")), c.get("meaning", "")
        else:
            raw, meaning = clean_text(str(c)), ""
        if not raw:
            continue
        if PUNCT_ONLY.match(raw):
            if out:
                out[-1]["text"] += raw
            else:
                pending_head += raw
            continue
        if pending_head:
            raw = pending_head + raw
            pending_head = ""
        # 片段开头的标点（如 ", but"）并入前一组
        lead = re.match(r"^[,.!?;:]+", raw)
        if lead and out:
            out[-1]["text"] += lead.group(0)
            raw = raw[lead.end():]
            if not raw:
                continue
        out.append({"text": raw, "meaning": meaning})
    if pending_head and out:
        out[-1]["text"] += pending_head
    return out


def chunk_reconstruct_ok(sent, norm=None):
    """校验：chunks 拼接后与 sentence_en 按 token 序列一致（对空白/标点位置容错；
    源数据偶发丢句尾标点，如 day288，对句尾 [.!?] 缺失容错）"""
    if norm is None:
        norm = normalize_chunks(sent)
    recon = " ".join(c["text"] for c in norm).strip()
    orig = sent["sentence_en"].strip()
    recon_t = re.sub(r"[.!?…]+$", "", recon).split()
    orig_t = re.sub(r"[.!?…]+$", "", orig).split()
    return recon_t == orig_t


def stage_of(day: int):
    for st in STAGES:
        if st["days"][0] <= day <= st["days"][1]:
            return st
    return None


def main():
    files = sorted(glob.glob(os.path.join(SRC_DIR, "*.json")))
    if not files:
        print("pedingfiles/ 下没有 json 源文件"); sys.exit(1)

    by_day = {}   # day -> (article_raw, src_file)
    errors, warnings = [], []

    for path in files:
        fname = os.path.basename(path)
        try:
            data = json.load(open(path, encoding="utf-8"))
        except Exception as e:
            errors.append(f"{fname}: JSON 解析失败 {e}")
            continue
        # 兼容两种格式：{articles:[...]} 包装对象 或 [...] 裸数组
        arts = data.get("articles", []) if isinstance(data, dict) else data
        for art in arts:
            day = art.get("day")
            if not isinstance(day, int):
                errors.append(f"{fname}: article {art.get('article_id')} 缺少 day"); continue
            if day in by_day:
                errors.append(f"{fname}: day {day} 与 {by_day[day][1]} 重复")
                continue
            by_day[day] = (art, fname)

    days = sorted(by_day)
    manifest_articles = []

    for day in days:
        art, fname = by_day[day]
        aid = f"day{day:03d}"
        st = stage_of(day)
        if not st:
            errors.append(f"{fname}: day {day} 不在任何阶段范围内"); continue

        # ---- 校验 ----
        sents = art.get("sentences", [])
        if not sents:
            errors.append(f"{fname}: {aid} 没有句子"); continue
        norm_sents = []
        for si, s in enumerate(sents):
            norm = normalize_chunks(s)
            if not norm:
                errors.append(f"{fname}: {aid} 句{si + 1} 没有 chunks"); continue
            if not chunk_reconstruct_ok(s, norm):
                recon = " ".join(c["text"] for c in norm)
                errors.append(f"{fname}: {aid} 句{si + 1} chunks 无法还原原句\n    原句: {s['sentence_en']}\n    拼接: {recon}")
            norm_sents.append(norm)
        wc = word_count(art["content_en"])
        lo, hi = st["range"]
        if not (lo - 5 <= wc <= hi + 5):
            warnings.append(f"{aid}（{fname}）词数 {wc} 超出阶段{st['id']}范围 {lo}–{hi}（±5 容差）")

        # ---- 规范化输出 ----
        out = {
            "id": aid, "day": day, "stage": st["id"],
            "titleEn": art["title_en"], "titleCn": art["title_cn"],
            "category": art.get("category", ""), "scene": art.get("scene", ""),
            "wordCount": wc, "seconds": art.get("estimated_reading_time_seconds", 0),
            "contentCn": art["content_cn"],
            "sentences": [
                {
                    "en": s["sentence_en"], "cn": s["sentence_cn"],
                    "chunks": norm,
                    "tip": s.get("explanation", ""),
                }
                for s, norm in zip(sents, norm_sents)
            ],
            "vocab": [
                {"w": v["word"], "ipa": v.get("phonetic", ""), "cn": v.get("meaning", ""), "pos": v.get("part_of_speech", "")}
                for v in art.get("vocabulary", [])
            ],
            "exprs": [
                {"e": x["expression"], "cn": x["meaning"], "ex": x.get("example", "")}
                for x in art.get("expressions", [])
            ],
            "ask": art.get("questions", []),
        }
        manifest_articles.append({
            "id": aid, "day": day, "stage": st["id"],
            "category": out["category"], "scene": out["scene"],
            "titleEn": out["titleEn"], "titleCn": out["titleCn"],
            "wordCount": wc, "sentCount": len(sents), "seconds": out["seconds"],
        })

        day_path = os.path.join(DAYS_DIR, f"{aid}.js")
        with open(day_path, "w", encoding="utf-8") as f:
            f.write("/* 由 build_course.py 自动生成，请勿手改 */\nwindow.ENR_DAY = ")
            f.write(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
            f.write(";\n")

    if errors:
        print("✗ 构建失败：")
        for e in errors:
            print("  " + e)
        sys.exit(1)

    # ---- 保留无源文件但已有成品数据的 day（源 JSON 缺失时不让该 day 从站点消失）----
    preserved = []
    for path in sorted(glob.glob(os.path.join(DAYS_DIR, "day*.js"))):
        m = re.match(r"day(\d+)\.js$", os.path.basename(path))
        if not m:
            continue
        day = int(m.group(1))
        if day in by_day:
            continue  # 有源文件，将被重新生成
        try:
            txt = open(path, encoding="utf-8").read()
            obj = json.loads(txt.split("window.ENR_DAY = ", 1)[1].rstrip().rstrip(";"))
            assert isinstance(obj, dict) and obj.get("id") == f"day{day:03d}"
            manifest_articles.append({
                "id": obj["id"], "day": day, "stage": obj.get("stage", 1),
                "category": obj.get("category", ""), "scene": obj.get("scene", ""),
                "titleEn": obj.get("titleEn", ""), "titleCn": obj.get("titleCn", ""),
                "wordCount": obj.get("wordCount", 0), "sentCount": len(obj.get("sentences", [])),
                "seconds": obj.get("seconds", 0),
            })
            preserved.append(day)
        except Exception as e:
            warnings.append(f"data/days/day{day:03d}.js 成品数据损坏，已跳过（{e}）")
            os.remove(path)
    if preserved:
        print(f"ℹ {len(preserved)} 天无源文件，保留现有成品数据：Day {min(preserved):03d}–{max(preserved):03d}")
        warnings.append(f"Day {min(preserved):03d}–{max(preserved):03d} 源 JSON 缺失（当前用成品数据），补回源文件后重跑构建即可切换")

    # ---- manifest ----（写入 dayNNN.js 用 open("w") 覆盖，无需预先删除）
    manifest_articles.sort(key=lambda a: a["day"])
    all_days = sorted(a["day"] for a in manifest_articles)
    manifest = {
        "version": 1,
        "stages": STAGES,
        "categories": sorted({a["category"] for a in manifest_articles if a["category"]}),
        "articles": manifest_articles,
        "lastDay": all_days[-1] if all_days else 0,
    }
    man_path = os.path.join(OUT_DIR, "course-manifest.js")
    with open(man_path, "w", encoding="utf-8") as f:
        f.write("/* 由 build_course.py 自动生成，请勿手改 */\nwindow.ENR_COURSE = ")
        f.write(json.dumps(manifest, ensure_ascii=False, separators=(",", ":")))
        f.write(";\n")

    for w in warnings:
        print("⚠ " + w)
    print(f"✓ {len(manifest_articles)} 天课程已构建（Day {all_days[0]:03d}–{all_days[-1]:03d}，源重建 {len(days)} + 成品保留 {len(preserved)}）")
    print(f"→ {os.path.relpath(man_path, ROOT)}")
    print(f"→ {os.path.relpath(DAYS_DIR, ROOT)}\\dayNNN.js × {len(manifest_articles)}")


if __name__ == "__main__":
    # days/ 目录必须存在
    os.makedirs(DAYS_DIR, exist_ok=True)
    main()
