# -*- coding: utf-8 -*-
"""
enreader 职业英语专题构建脚本
把 pedingfiles/ 中的职业英语 JSON（文章含 profession_id 字段）解析为：
  data/professions/prof-manifest.js → window.ENR_PROFS（职业定义 + 每篇元信息）
  data/professions/p<article_id>.js  → window.ENR_DAY（与 Day 数据同构，阅读页直接复用）

新增职业批次 = 把 json 丢进 pedingfiles/ 后运行 python build_professions.py
数据格式差异由转换层消化：chunks 为字符串数组（无逐组中文）、explanation 全空、
仅 expressions（{expression, meaning, example}）有效，vocabulary/questions 为空。
"""
import glob
import json
import os
import re
import sys

from build_course import normalize_chunks, chunk_reconstruct_ok, word_count

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC_DIR = os.path.join(ROOT, "pedingfiles")
OUT_DIR = os.path.join(ROOT, "data")
PROF_DIR = os.path.join(OUT_DIR, "professions")

# 职业展示顺序（来自 gpt-plan.md 开发顺序）
ORDER = [
    "export_sales", "cross_border_ecommerce", "software_engineer", "product_manager",
    "international_marketing", "international_logistics", "international_business",
    "procurement_supply_chain",
]


def loose_reconstruct_ok(sent, norm):
    """宽松校验：职业批次源数据 chunks 常丢句中逗号（如 "Last week," → "Last week"），
    故去掉全部标点后按 token 序列比较；丢词/词序错误仍会被抓到。"""
    recon = " ".join(c["text"] for c in norm)
    strip = lambda t: re.sub(r"[^\w\s']", " ", t, flags=re.UNICODE).split()
    return strip(recon) == strip(sent["sentence_en"])


def fallback_chunks(text, target=5):
    """源 chunks 与原句差异过大（丢词）时的兜底：按词重新分组意群，
    优先在逗号/分号后断开，保证 chunks 拼接 = 原句（朗读与点读不缺词）。"""
    words = text.split()
    groups, cur = [], []
    for w in words:
        cur.append(w)
        hit = len(cur) >= target and (w.endswith((",", ";")) or len(cur) >= target + 3)
        if hit:
            groups.append(" ".join(cur)); cur = []
    if cur:
        groups.append(" ".join(cur))
    return groups


def main():
    files = sorted(glob.glob(os.path.join(SRC_DIR, "*.json")))
    if not files:
        print("pedingfiles/ 下没有 json 源文件"); sys.exit(1)

    profs = {}      # profession_id -> meta
    by_id = {}      # article_id -> (article_raw, src_file)
    errors, warnings = [], []

    for path in files:
        fname = os.path.basename(path)
        try:
            data = json.load(open(path, encoding="utf-8"))
        except Exception as e:
            errors.append(f"{fname}: JSON 解析失败 {e}")
            continue
        arts = data.get("articles", []) if isinstance(data, dict) else data
        for art in arts:
            pid = art.get("profession_id")
            if not pid:
                continue  # 普通 Day 批次，归 build_course.py 管
            aid = art.get("article_id")
            if not isinstance(aid, int):
                errors.append(f"{fname}: 缺少数字 article_id"); continue
            if aid in by_id:
                errors.append(f"{fname}: article_id {aid} 与 {by_id[aid][1]} 重复")
                continue
            name_raw = art.get("profession_name", pid)
            if " / " in name_raw:
                name_en, name_cn = name_raw.split(" / ", 1)
            else:
                name_en = name_cn = name_raw
            profs.setdefault(pid, {"id": pid, "nameEn": name_en.strip(), "nameCn": name_cn.strip(),
                                   "cefr": art.get("cefr", ""), "articles": []})
            by_id[aid] = (art, fname)

    for aid in sorted(by_id):
        art, fname = by_id[aid]
        pid = art["profession_id"]
        obj_id = f"p{aid}"

        sents = art.get("sentences", [])
        if not sents:
            errors.append(f"{fname}: {obj_id} 没有句子"); continue
        norm_sents = []
        rechunked = 0
        for si, s in enumerate(sents):
            norm = normalize_chunks(s)
            if not norm:
                errors.append(f"{fname}: {obj_id} 句{si + 1} 没有 chunks"); continue
            if not loose_reconstruct_ok(s, norm):
                # 源 chunks 与原句差异过大（丢词/改写），自动重切意群，保证朗读完整
                norm = normalize_chunks({"chunks": fallback_chunks(s["sentence_en"])})
                rechunked += 1
            norm_sents.append(norm)
        if rechunked:
            warnings.append(f"{obj_id}（{fname}）有 {rechunked} 句源 chunks 不可还原，已自动重切意群")

        # 分块优化：data/professions/cn/pNNNNN.json（翻译子代理按 chunk.md 理念重切+注解）
        # 格式 {"id": "pNNNNN", "sents": [{"chunks": [{"t": "英文组", "m": "中文注解"}, ...]}, ...]}
        # 校验：重切后去标点 token 必须与原句一致，否则该句回退源 chunks
        cn_path = os.path.join(PROF_DIR, "cn", f"{obj_id}.json")
        cn_sents = None
        if os.path.exists(cn_path):
            try:
                cn_sents = json.load(open(cn_path, encoding="utf-8")).get("sents") or []
            except Exception as e:
                warnings.append(f"{obj_id}: cn 分块注解文件解析失败 {e}")

        strip_tok = lambda t: re.sub(r"[^\w\s']", " ", t, flags=re.UNICODE).split()
        missing_cn = 0
        if cn_sents is None:
            missing_cn = len(sents)
        else:
            if len(cn_sents) != len(sents):
                warnings.append(f"{obj_id}: cn 文件句数 {len(cn_sents)} != 源 {len(sents)}，整篇回退源分块")
                cn_sents = None
            for si, (s, norm) in enumerate(zip(sents, norm_sents)):
                rep = cn_sents[si] if cn_sents else None
                if rep and isinstance(rep.get("chunks"), list) and rep["chunks"]:
                    re_norm = [{"text": c.get("t", "").strip(), "meaning": (c.get("m") or "").strip()}
                               for c in rep["chunks"] if c.get("t", "").strip()]
                    if re_norm and strip_tok(" ".join(c["text"] for c in re_norm)) == strip_tok(s["sentence_en"]):
                        norm_sents[si] = re_norm
                        continue
                    missing_cn += 1
                else:
                    missing_cn += 1
        if missing_cn:
            warnings.append(f"{obj_id}: 有 {missing_cn} 句未采用重切分块（token 校验失败或无 cn 数据），保留源分块")

        wc = word_count(art["content_en"])
        out = {
            "id": obj_id, "day": None, "stage": None,
            "titleEn": art["title_en"], "titleCn": art["title_cn"],
            "category": profs[pid]["nameCn"], "scene": art.get("scene", ""),
            "wordCount": wc, "seconds": art.get("estimated_reading_time_seconds", 0),
            "contentCn": art["content_cn"],
            "profId": pid,
            "sentences": [
                {"en": s["sentence_en"], "cn": s["sentence_cn"], "chunks": norm, "tip": s.get("explanation", "")}
                for s, norm in zip(sents, norm_sents)
            ],
            "vocab": [],   # 职业批次源数据为空，保留字段以兼容阅读页
            "exprs": [
                {"e": x["expression"], "cn": x["meaning"], "ex": x.get("example", "")}
                for x in art.get("expressions", [])
            ],
            "ask": [],
        }

        with open(os.path.join(PROF_DIR, f"{obj_id}.js"), "w", encoding="utf-8") as f:
            f.write("/* 由 build_professions.py 自动生成，请勿手改 */\nwindow.ENR_DAY = ")
            f.write(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
            f.write(";\n")

        profs[pid]["articles"].append({
            "id": obj_id,
            "titleEn": out["titleEn"], "titleCn": out["titleCn"],
            "scene": out["scene"], "wordCount": wc,
            "sentCount": len(sents), "seconds": out["seconds"],
        })

    if errors:
        print("✗ 构建失败：")
        for e in errors:
            print("  " + e)
        sys.exit(1)

    # 按规划顺序输出职业；顺序表中没有的追加在末尾
    ordered = [p for p in ORDER if p in profs] + [p for p in profs if p not in ORDER]
    manifest = {"version": 1, "professions": [profs[p] for p in ordered]}
    man_path = os.path.join(PROF_DIR, "prof-manifest.js")
    with open(man_path, "w", encoding="utf-8") as f:
        f.write("/* 由 build_professions.py 自动生成，请勿手改 */\nwindow.ENR_PROFS = ")
        f.write(json.dumps(manifest, ensure_ascii=False, separators=(",", ":")))
        f.write(";\n")

    total = sum(len(p["articles"]) for p in manifest["professions"])
    for w in warnings:
        print("⚠ " + w)
    for p in manifest["professions"]:
        print(f"  {p['nameEn']} / {p['nameCn']} — {len(p['articles'])} 篇")
    print(f"✓ {len(manifest['professions'])} 个职业共 {total} 篇已构建")
    print(f"→ {os.path.relpath(man_path, ROOT)}")


if __name__ == "__main__":
    os.makedirs(PROF_DIR, exist_ok=True)
    main()
