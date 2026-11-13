# -*- coding: utf-8 -*-
"""生成单词发音库：data/tts/words/<word>.mp3
覆盖全部课程正文的去重单词 + 词汇表词条，供 article.js 的 speakWord 点读使用
（音频兜底模式下 speechSynthesis 不可用，点读/重复发音全靠这些文件）。
按词频降序生成（常用词优先），已存在的文件跳过，可反复运行补漏。运行：python build_tts_words.py
"""
import asyncio, glob, json, os, re, sys
from collections import Counter
import edge_tts

VOICE = "en-US-AriaNeural"
CONCURRENCY = 8
RETRIES = 3

ONES = ["zero","one","two","three","four","five","six","seven","eight","nine","ten",
        "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"]
TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"]
ORD_SPECIAL = {"one":"first","two":"second","three":"third","five":"fifth","eight":"eighth",
               "nine":"ninth","twelve":"twelfth"}

def to_cardinal(n):
    if n < 20: return ONES[n]
    if n < 100:
        t, o = divmod(n, 10)
        return TENS[t] + ("-" + ONES[o] if o else "")
    h, r = divmod(n, 100)
    return ONES[h] + " hundred" + (" " + to_cardinal(r) if r else "")

def to_ordinal(n):
    en = to_cardinal(n)
    last = en.split("-")[-1].split()[-1]
    repl = ORD_SPECIAL.get(last) or (last[:-1] + "ieth" if last.endswith("y") else last + "th")
    if " " in en:
        return en.rsplit(" ", 1)[0] + " " + repl
    if "-" in en:
        return en.rsplit("-", 1)[0] + "-" + repl
    return repl

def num_to_en(tok):
    """与 article.js 的 numToEn 对齐：纯数字/序数/复数 token 转英文"""
    m = re.match(r"^(\d{1,3})(st|nd|rd|th|s)?$", tok, re.I)
    if not m:
        return None
    n, suf = int(m.group(1)), (m.group(2) or "").lower()
    if n == 0:
        return None
    if suf == "s":
        en = to_cardinal(n)
        en = en[:-2] + "ies" if en.endswith("y") else en + "s"
    elif suf in ("st", "nd", "rd", "th"):
        en = to_ordinal(n)
    else:
        en = to_cardinal(n)
    return en

def norm(w):
    """与 article.js speakWord 的文件名规范化一致"""
    w = w.replace("’", "'").lower()
    return re.sub(r"[^a-z0-9'-]", "", w)

def collect_words():
    """收集全部 token（正文 chunks + vocab 词条），返回按词频降序的去重列表"""
    cnt = Counter()
    for path in glob.glob("data/days/day*.js"):
        js = open(path, encoding="utf-8").read()
        art = json.loads(js.split("window.ENR_DAY = ", 1)[1].rstrip().rstrip(";"))
        for s in art.get("sentences", []):
            for c in s.get("chunks", []):
                for raw in re.findall(r"[A-Za-z0-9\u2019'-]+", c.get("text", "")):
                    w = norm(raw)
                    if not re.search(r"[a-z0-9]", w):
                        continue  # 纯撇号/纯标点 token 无法发音，跳过（曾导致 edge-tts 报 No audio）
                    m = num_to_en(w)
                    cnt[m if m else w] += 1
        for v in art.get("vocab", []):
            w = norm(v.get("word", ""))
            if w and " " not in w:  # 只收单词，短语不进发音库
                cnt[w] += 3  # 词条加权，确保优先生成
    return [w for w, _ in cnt.most_common()]

async def gen_one(sem, w, failed):
    out = os.path.join("data", "tts", "words", w + ".mp3")
    if os.path.exists(out) and os.path.getsize(out) > 500:
        return
    for attempt in range(RETRIES):
        try:
            async with sem:
                await edge_tts.Communicate(w, VOICE).save(out)
            return
        except Exception as e:
            if attempt == RETRIES - 1:
                failed.append((w, str(e)[:100]))
            else:
                await asyncio.sleep(1.5)

async def main():
    words = collect_words()
    print("unique words=%d" % len(words))
    os.makedirs(os.path.join("data", "tts", "words"), exist_ok=True)
    sem = asyncio.Semaphore(CONCURRENCY)
    failed = []
    tasks = [asyncio.create_task(gen_one(sem, w, failed)) for w in words]
    done = 0
    for fut in asyncio.as_completed(tasks):
        await fut
        done += 1
        if done % 200 == 0:
            print("progress %d/%d" % (done, len(words)))
    if failed:
        print("FAILED %d:" % len(failed))
        for f in failed:
            print("  %s: %s" % f)
        sys.exit(1)
    print("ALL DONE: %d word audios" % len(words))

if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
