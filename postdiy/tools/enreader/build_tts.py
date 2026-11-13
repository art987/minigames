# -*- coding: utf-8 -*-
"""生成朗读兜底音频：data/tts/<dayId>/s<句序号>.mp3
用微软 edge-tts（走微软服务，国内网络可达），供 article.js 的音频兜底通道使用。
已存在的文件（>1KB）自动跳过，可反复运行补漏。运行：python build_tts.py
"""
import asyncio, glob, json, os, re, sys
import edge_tts

VOICE = "en-US-AriaNeural"   # 美式女声，与站内 TTS 风格接近
CONCURRENCY = 6
RETRIES = 3

def load_days():
    """读取 data/days/*.js（window.ENR_DAY = {...}），返回 [(dayId, [句子文本...]), ...]"""
    days = []
    for path in sorted(glob.glob("data/days/day*.js")):
        day_id = re.search(r"(day\d+)", path).group(1)
        js = open(path, encoding="utf-8").read()
        payload = js.split("window.ENR_DAY = ", 1)[1].rstrip().rstrip(";")
        art = json.loads(payload)
        sents = []
        for s in art["sentences"]:
            # 与 article.js 朗读文本一致：各 chunk 文本用空格拼接
            sents.append(" ".join(c["text"] for c in s["chunks"]).strip())
        days.append((day_id, sents))
    return days

async def gen_one(sem, day_id, idx, text, failed):
    out = os.path.join("data", "tts", day_id, "s%d.mp3" % idx)
    if os.path.exists(out) and os.path.getsize(out) > 1000:
        return  # 已生成，跳过
    if not text:
        failed.append((day_id, idx, "empty text"))
        return
    for attempt in range(RETRIES):
        try:
            async with sem:
                await edge_tts.Communicate(text, VOICE).save(out)
            return
        except Exception as e:
            if attempt == RETRIES - 1:
                failed.append((day_id, idx, str(e)[:100]))
            else:
                await asyncio.sleep(1.5)

async def main():
    os.makedirs("data/tts", exist_ok=True)
    days = load_days()
    total = sum(len(s) for _, s in days)
    print("days=%d sentences=%d voice=%s" % (len(days), total, VOICE))
    sem = asyncio.Semaphore(CONCURRENCY)
    failed = []
    tasks = []
    for day_id, sents in days:
        os.makedirs(os.path.join("data", "tts", day_id), exist_ok=True)
        for i, text in enumerate(sents):
            tasks.append(gen_one(sem, day_id, i, text, failed))
    done = 0
    for fut in asyncio.as_completed(tasks):
        await fut
        done += 1
        if done % 100 == 0:
            print("progress %d/%d" % (done, total))
    if failed:
        print("FAILED %d:" % len(failed))
        for f in failed:
            print("  %s s%d: %s" % f)
        sys.exit(1)
    print("ALL DONE: %d sentences across %d days" % (total, len(days)))

if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
