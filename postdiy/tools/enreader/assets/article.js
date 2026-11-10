/* ============ enreader 文章页：渲染 + 朗读引擎 ============ */
(function () {
  "use strict";
  const { settings, set, tts, ttsOK, toast } = ENR;
  const $ = id => document.getElementById(id);

  /* ---------- 定位文章 ---------- */
  const id = new URLSearchParams(location.search).get("id");
  let cat = null, art = null;
  for (const c of (window.ENR_DATA.categories || [])) {
    const a = (c.articles || []).find(x => x.id === id);
    if (a) { cat = c; art = a; break; }
  }
  if (!art) {
    cat = window.ENR_DATA.categories.find(c => c.articles && c.articles.length);
    art = cat.articles[0];
  }
  const S = art.paragraphs.flatMap(p => p.sentences);   // 全部句子（扁平）
  const N = S.length;
  const POS_KEY = "enr:pos:" + art.id;
  const savedPos = Math.min(parseInt(localStorage.getItem(POS_KEY) || "0", 10) || 0, N - 1);

  document.title = art.title + " · 英语阅读";
  $("headTitle").textContent = art.title;
  $("headBadge").textContent = art.difficulty;
  $("artTitle").textContent = art.title;

  /* ---------- 渲染正文 ---------- */
  const body = $("artBody");
  const sntEls = [];        // 句子 DOM
  const tokEls = [];        // 句子内全部 token span（按短语顺序拍平）
  const phRanges = [];      // 每句：每短语在 tokEls 中的 [start, end)
  let g = 0;                // 全局句子序号

  art.paragraphs.forEach(para => {
    const pd = document.createElement("div");
    pd.className = "para";
    para.sentences.forEach(sent => {
      const s = g++;
      const el = document.createElement("div");
      el.className = "snt";
      el.dataset.s = s;

      const play = document.createElement("button");
      play.className = "play"; play.title = "朗读本句";
      play.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>';
      el.appendChild(play);

      const en = document.createElement("div");
      en.className = "en";
      const toks = [], ranges = [];
      sent.phrases.forEach((ph, pi) => {
        const phEl = document.createElement("span");
        phEl.className = "ph";
        const start = toks.length;
        // 按 ╷ 组边界把单元分组成块（组与中文块一一对应）
        const groups = [[]];
        ph.units.forEach((u, k) => {
          if (k > 0 && ph.seps[k - 1] === "b") groups.push([]);
          groups[groups.length - 1].push(u);
        });
        groups.forEach((grp, gi) => {
          const gEl = document.createElement("span");
          gEl.className = "grp";
          const ews = document.createElement("span");
          ews.className = "ews";
          grp.forEach(u => {
            const ew = document.createElement("span");
            ew.className = "ew tok" + (u.s ? " st" : "");
            ew.textContent = u.ew;
            ew.dataset.w = u.ew;
            ews.appendChild(ew);
            toks.push(ew);
          });
          gEl.appendChild(ews);
          const cwText = grp.map(u => u.cw).filter(Boolean).join(" ");
          if (cwText) {
            const cw = document.createElement("span");
            cw.className = "gcw";
            cw.textContent = cwText;
            gEl.appendChild(cw);
          }
          phEl.appendChild(gEl);
          if (gi < groups.length - 1) {
            // 气口 ╷：作者标注的组间换气缝隙，可视化保留
            const gsep = document.createElement("span");
            gsep.className = "gsep";
            gsep.textContent = "╷";
            phEl.appendChild(gsep);
          }
        });
        ranges.push([start, toks.length]);
        en.appendChild(phEl);
        if (pi < sent.phrases.length - 1) {
          // 短语停顿 /：作者标注的半秒停顿点，可视化保留
          const psep = document.createElement("span");
          psep.className = "psep";
          psep.textContent = "/";
          en.appendChild(psep);
        }
      });
      el.appendChild(en);

      const cn = document.createElement("div");
      cn.className = "cn";
      cn.textContent = sent.cn;
      el.appendChild(cn);

      // 交互：点短语间隙 → 单句朗读；点单词 → 单词朗读
      el.addEventListener("click", e => {
        const tok = e.target.closest(".tok");
        if (tok && el.contains(tok)) { onWordClick(tok, e); return; }
        if (e.target === play) { playSingle(s); return; }
        playSingle(s);
      });
      pd.appendChild(el);
      sntEls.push(el); tokEls.push(toks); phRanges.push(ranges);
    });

    if (para.tips && para.tips.length) pd.appendChild(buildTips(para.tips, g));
    body.appendChild(pd);
  });

  function buildTips(tips) {
    const box = document.createElement("div");
    box.className = "tipsbox" + (settings.tips ? " open" : "");
    const head = document.createElement("button");
    head.className = "thead";
    head.innerHTML = '<span>📖 朗读建议</span><span class="arr">▶</span>';
    const wrap = document.createElement("div");
    wrap.className = "tbody";
    const inner = document.createElement("div");
    const ul = document.createElement("ul");
    tips.forEach(t => {
      const li = document.createElement("li");
      const m = t.match(/^([^：]{1,6})：(.*)$/s);
      if (m) { const b = document.createElement("b"); b.textContent = m[1] + "："; li.appendChild(b); li.appendChild(document.createTextNode(m[2])); }
      else li.textContent = t;
      ul.appendChild(li);
    });
    inner.appendChild(ul); wrap.appendChild(inner);
    head.addEventListener("click", () => box.classList.toggle("open"));
    box.appendChild(head); box.appendChild(wrap);
    return box;
  }

  /* ---------- 词汇区 ---------- */
  if (art.vocab && art.vocab.length) {
    const sec = document.createElement("div");
    sec.className = "vocab";
    sec.innerHTML = `<h2>重点词汇</h2><div class="sub">共 ${art.vocab.length} 个 · 点击卡片听发音</div>`;
    const grid = document.createElement("div");
    grid.className = "vgrid";
    art.vocab.forEach(v => {
      const b = document.createElement("button");
      b.className = "vchip";
      const w = document.createElement("div"); w.className = "w";
      w.innerHTML = `${v.w}<span class="sp">🔊</span>`;
      const ipa = document.createElement("div"); ipa.className = "ipa"; ipa.textContent = v.ipa;
      const cn = document.createElement("div"); cn.className = "cn"; cn.textContent = v.cn;
      b.appendChild(w); b.appendChild(ipa); b.appendChild(cn);
      b.addEventListener("click", () => speakWord(v.w));
      grid.appendChild(b);
    });
    sec.appendChild(grid);
    body.appendChild(sec);
  }

  /* ---------- 播放器状态 ---------- */
  let cur = { s: savedPos, p: 0 };
  let playing = false;
  let gen = 0;
  const nextGen = () => ++gen;

  const PHRASE_GAP = 300, SENT_GAP = 650;

  function mark(s) {
    sntEls.forEach(el => el.classList.remove("on"));
    clearWordHl();
    if (s >= 0 && s < N) sntEls[s].classList.add("on");
  }
  let lastTok = null;
  function clearWordHl() { if (lastTok) { lastTok.classList.remove("rdw"); lastTok = null; } }
  function highlightTok(s, idx) {
    const toks = tokEls[s];
    if (!toks || !toks[idx]) return;
    if (lastTok !== toks[idx]) { clearWordHl(); lastTok = toks[idx]; lastTok.classList.add("rdw"); }
  }

  function updatePlayer() {
    const sent = S[Math.min(cur.s, N - 1)];
    $("pCount").textContent = `第 ${Math.min(cur.s + 1, N)} / ${N} 句`;
    $("pCur").textContent = sent ? sent.cn : "";
    $("pFill").style.width = (cur.s / N * 100).toFixed(1) + "%";
    $("icPlay").style.display = playing ? "none" : "";
    $("icPause").style.display = playing ? "" : "none";
  }

  function select(s, p, scroll) {
    cur = { s: Math.max(0, Math.min(s, N - 1)), p: p || 0 };
    mark(cur.s); updatePlayer();
    localStorage.setItem(POS_KEY, cur.s);
    if (scroll) scrollToCur();
  }
  function scrollToCur() {
    const el = sntEls[cur.s];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- 朗读链 ---------- */
  function chain(s, p, myGen, stopAfter) {
    if (myGen !== gen || !playing) return;
    if (s >= N) { finish(true); return; }
    cur = { s, p };
    mark(s); updatePlayer();
    localStorage.setItem(POS_KEY, s);
    if (settings.autoscroll && p === 0) scrollToCur();

    const sent = S[s], ph = sent.phrases[p];
    const isLastPh = p === sent.phrases.length - 1;
    const tail = isLastPh ? (/[.!?]$/.test(ph.text) ? "" : ".") : ",";
    // 重建朗读文本：数字 token 转英文单词（默认中文语音会把孤立数字读成中文），并记录各 token 朗读偏移供重读高亮
    let spoken = "", spRanges = [];
    ph.units.forEach(u => {
      if (spRanges.length) spoken += " ";
      const en = numToEn(u.ew);
      spRanges.push([spoken.length, spoken.length + en.length]);
      spoken += en;
    });
    spoken += tail;
    tts.speak(spoken, {
      rate: settings.rate,
      onboundary: e => {
        if (myGen !== gen || e.charIndex == null) return;
        const hit = spRanges.findIndex(r => e.charIndex >= r[0] && e.charIndex < r[1]);
        const pr = phRanges[s] && phRanges[s][p];
        if (hit >= 0 && pr) highlightTok(s, pr[0] + hit);
      },
      onend: () => {
        if (myGen !== gen) return;
        clearWordHl();
        if (stopAfter && isLastPh) { finish(false); return; }
        let ns = s, np = p + 1;
        if (np >= sent.phrases.length) { ns = s + 1; np = 0; }
        const gap = (isLastPh ? SENT_GAP : PHRASE_GAP) / Math.max(0.5, settings.rate);
        setTimeout(() => chain(ns, np, myGen, stopAfter), gap);
      },
    });
  }

  function start(s, p, stopAfter) {
    if (!ttsOK()) { toast("当前浏览器不支持语音朗读"); return; }
    playing = true;
    updatePlayer();
    chain(s, p, nextGen(), stopAfter);
  }
  function pause() {
    playing = false;
    tts.stop();
    clearWordHl();
    updatePlayer();
  }
  function finish(allDone) {
    playing = false;
    clearWordHl();
    if (allDone) {
      toast("已读完整篇");
      localStorage.removeItem(POS_KEY);
      cur = { s: 0, p: 0 };
      sntEls.forEach(el => el.classList.remove("on"));
    }
    updatePlayer();
  }

  function playAll() { if (playing) pause(); else start(cur.s, cur.p, false); }
  function playSingle(s) {
    if (playing) { pause(); }
    select(s, 0, false);
    start(s, 0, true);
  }
  function step(d) {
    const s = Math.max(0, Math.min(N - 1, cur.s + d));
    if (playing) { tts.stop(); chain(s, 0, nextGen(), false); }
    else select(s, 0, true);
  }

  /* ---------- 单词点击：朗读单词 + 所在组整组下划线、组底部中文红色高亮 2 秒 ---------- */
  const NO_TTS_MSG = "当前浏览器不支持语音朗读";
  let hlTimer = null;
  function flashCw(tok) {
    const grp = tok.closest(".grp");
    if (!grp) return;
    document.querySelectorAll(".grp.hlu").forEach(el => el.classList.remove("hlu"));
    document.querySelectorAll(".gcw.hl").forEach(el => el.classList.remove("hl"));
    grp.classList.add("hlu");
    const cw = grp.querySelector(".gcw");
    if (cw) cw.classList.add("hl");
    clearTimeout(hlTimer);
    hlTimer = setTimeout(() => {
      grp.classList.remove("hlu");
      if (cw) cw.classList.remove("hl");
    }, 2000);
  }
  /* 数字点读转英文（孤立数字默认语音会读成中文：5→five、20s→twenties、8th→eighth） */
  const NUM_ONES = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const NUM_TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  const NUM_ORDS = { one:"first", two:"second", three:"third", five:"fifth", eight:"eighth", nine:"ninth", twelve:"twelfth" };
  function numToEn(w) {
    const m = String(w).match(/^(\d{1,3})(st|nd|rd|th|s)?$/i);
    if (!m) return w;
    const n = parseInt(m[1], 10);
    let en;
    if (n < 20) en = NUM_ONES[n];
    else if (n < 100) {
      const t = Math.floor(n / 10), o = n % 10;
      en = NUM_TENS[t] + (o ? "-" + NUM_ONES[o] : "");
    } else {
      const h = Math.floor(n / 100), r = n % 100;
      en = NUM_ONES[h] + " hundred" + (r ? " and " + numToEn(String(r)) : "");
    }
    const suf = (m[2] || "").toLowerCase();
    if (suf === "s") en = en.endsWith("y") ? en.slice(0, -1) + "ies" : en + "s";
    else if (suf) en = en.replace(/^(.*?)([a-z]+)$/i, (_, head, last) =>
      head + (NUM_ORDS[last] || (last.endsWith("y") ? last.slice(0, -1) + "ieth" : last + "th")));
    return en;
  }
  function speakWord(word) {
    if (!ttsOK()) { toast(NO_TTS_MSG); return; }
    tts.speak(numToEn(word), { rate: Math.max(0.6, settings.rate * 0.9) });
  }
  function onWordClick(tok, e) {
    e.stopPropagation();
    const w = tok.dataset.w.replace(/[^\w'’-]/g, "");
    if (!w) return;
    flashCw(tok);
    if (!ttsOK()) { toast(NO_TTS_MSG); return; }
    if (playing) {
      // 打断当前句 → 读单词 → 从当前短语继续
      const myGen = nextGen();
      tts.stop();
      clearWordHl();
      tts.speak(numToEn(w), {
        rate: Math.max(0.6, settings.rate * 0.9),
        onend: () => {
          if (myGen !== gen) return;
          setTimeout(() => chain(cur.s, cur.p, nextGen(), false), 200);
        },
      });
    } else {
      speakWord(w);
    }
  }

  /* ---------- 控件绑定 ---------- */
  $("playBtn").addEventListener("click", playAll);
  $("prevBtn").addEventListener("click", () => step(-1));
  $("nextBtn").addEventListener("click", () => step(1));
  $("backBtn").addEventListener("click", () => { location.href = "index.html"; });

  $("pprog").addEventListener("click", e => {
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const s = Math.min(N - 1, Math.floor(ratio * N));
    if (playing) { tts.stop(); chain(s, 0, nextGen(), false); }
    else select(s, 0, true);
  });

  $("rateSel").value = String(settings.rate);
  $("rateSel").addEventListener("change", e => { set("rate", parseFloat(e.target.value)); });

  document.addEventListener("keydown", e => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "button" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.code === "Space") { e.preventDefault(); playAll(); }
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* ---------- 顶部"继续阅读" ---------- */
  if (savedPos > 0 && savedPos < N - 1) {
    const chip = document.createElement("button");
    chip.className = "continue-chip";
    chip.textContent = `上次读到第 ${savedPos + 1} 句 · 点击继续`;
    chip.addEventListener("click", () => { select(savedPos, 0, true); start(savedPos, 0, false); });
    $("artMeta").appendChild(chip);
  }

  /* ---------- 初始 ---------- */
  const metaHtml = [];
  metaHtml.push(cat.name);
  metaHtml.push(`${art.difficulty}难度`);
  metaHtml.push(`${art.paragraphs.length} 段 · ${N} 句`);
  if (art.estWords) metaHtml.push(`约 ${art.estWords} 字`);
  $("artMeta").insertAdjacentHTML("afterbegin",
    metaHtml.map(t => `<span>${t}</span>`).join('<span class="dot"></span>'));

  select(savedPos, 0, false);
  window.addEventListener("beforeunload", () => { tts.stop(); localStorage.setItem(POS_KEY, cur.s); });
})();
