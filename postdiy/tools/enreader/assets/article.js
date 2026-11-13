/* ============ enreader 文章页：课程数据加载 + 渲染 + 朗读引擎 ============ */
(function () {
  "use strict";
  const { settings, set, tts, ttsOK, toast } = ENR;
  const $ = id => document.getElementById(id);

  /* ---------- 定位课程文章（manifest → 按需加载单日数据） ---------- */
  const M = window.ENR_COURSE;
  let id = new URLSearchParams(location.search).get("id");
  if (!id || !M.articles.some(a => a.id === id)) {
    id = (M.articles[0] || {}).id;
  }
  if (!id) { document.body.innerHTML = '<p style="padding:60px 30px;color:#5d6b80">课程数据为空，请先运行 build_course.py。</p>'; return; }

  const meta = M.articles.find(a => a.id === id);
  let art = null;

  const script = document.createElement("script");
  script.src = "data/days/" + id + ".js?v=24";
  script.onload = start;
  script.onerror = () => { document.body.innerHTML = '<p style="padding:60px 30px;color:#5d6b80">课程数据加载失败。</p>'; };
  document.head.appendChild(script);

  function start() {
    art = window.ENR_DAY;
    if (!art) return;
    init();
  }

  function init() {
  const S = art.sentences;        // 全部句子
  const N = S.length;
  const POS_KEY = "enr:pos:" + art.id;
  const DONE_KEY = "enr:done:" + art.id;
  const savedPos = Math.min(parseInt(localStorage.getItem(POS_KEY) || "0", 10) || 0, N - 1);

  document.title = `Day ${String(art.day).padStart(3, "0")} · ${art.titleEn} · 英语朗读`;
  $("artTitle").textContent = `Day ${String(art.day).padStart(3, "0")} · ${art.titleEn}`;
  $("artSub").textContent = art.titleCn;

  /* ---------- 渲染正文 ---------- */
  const body = $("artBody");
  const sntEls = [];        // 句子 DOM
  const enwrapEls = [];     // 句子英文遮挡容器（自译模式）
  const tokEls = [];        // 句子内全部 token span（按 chunk 顺序拍平）
  const phRanges = [];      // 每句：每 chunk 在 tokEls 中的 [start, end)
  let g = 0;                // 全局句子序号

  S.forEach(sent => {
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
    sent.chunks.forEach((ch, ci) => {
      // chunk = 一个组：英文 text 拆成单词（点读），meaning 作为组底中文对照
      const gEl = document.createElement("span");
      gEl.className = "grp";
      const ews = document.createElement("span");
      ews.className = "ews";
      const start = toks.length;
      ch.text.split(/\s+/).forEach(w => {
        const ew = document.createElement("span");
        ew.className = "ew tok";
        ew.textContent = w;
        ew.dataset.w = w;
        ews.appendChild(ew);
        toks.push(ew);
      });
      gEl.appendChild(ews);
      if (ch.meaning) {
        const cw = document.createElement("span");
        cw.className = "gcw";
        cw.textContent = ch.meaning;
        gEl.appendChild(cw);
      }
      en.appendChild(gEl);
      if (ci < sent.chunks.length - 1) {
        // 意群停顿 /：作者标注的停顿点，可视化保留
        const psep = document.createElement("span");
        psep.className = "psep";
        psep.textContent = "/";
        en.appendChild(psep);
      }
      ranges.push([start, toks.length]);
    });
    // 句级中文翻译放在句子开头（英文行上方）
    const cn = document.createElement("div");
    cn.className = "cn";
    cn.textContent = sent.cn;
    el.appendChild(cn);

    // 英文 + 句解包进 enwrap：默认被白色遮挡块盖住（先自己翻译，再看解析）
    const enwrap = document.createElement("div");
    enwrap.className = "enwrap covered";
    enwrap.appendChild(en);

    if (sent.tip) {
      const tip = document.createElement("div");
      tip.className = "tip";
      tip.textContent = "💡 " + sent.tip;
      enwrap.appendChild(tip);
    }

    const cover = document.createElement("div");
    cover.className = "cover";
    cover.innerHTML = '<button class="viewbtn" type="button">查看英文</button>';
    cover.addEventListener("click", e => e.stopPropagation()); // 点遮挡区不触发单句朗读
    cover.querySelector(".viewbtn").addEventListener("click", e => {
      e.stopPropagation();
      enwrap.classList.remove("covered");
    });
    enwrap.appendChild(cover);

    // 揭示后右下角的睁眼圆钮：点击重新遮挡（再练一次自译）
    const eye = document.createElement("button");
    eye.className = "eye";
    eye.type = "button";
    eye.title = "隐藏英文，再试一次自己翻译";
    eye.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>';
    eye.addEventListener("click", e => {
      e.stopPropagation();
      enwrap.classList.add("covered");
    });
    enwrap.appendChild(eye);

    el.appendChild(enwrap);
    enwrapEls[s] = enwrap;

    // 交互：点短语间隙 → 单句朗读；点单词 → 单词朗读
    el.addEventListener("click", e => {
      const tok = e.target.closest(".tok");
      if (tok && el.contains(tok)) { onWordClick(tok, e); return; }
      if (e.target === play) { playSingle(s); return; }
      playSingle(s);
    });
    body.appendChild(el);
    sntEls.push(el); tokEls.push(toks); phRanges.push(ranges);
  });

  /* ---------- 核心表达 ---------- */
  if (art.exprs && art.exprs.length) {
    const sec = document.createElement("div");
    sec.className = "vocab exprs";
    sec.innerHTML = `<h2>核心表达</h2><div class="sub">共 ${art.exprs.length} 个 · 点击卡片听发音</div>`;
    const grid = document.createElement("div");
    grid.className = "vgrid";
    art.exprs.forEach(x => {
      const b = document.createElement("button");
      b.className = "vchip";
      const w = document.createElement("div"); w.className = "w";
      w.innerHTML = `${x.e}<span class="sp">🔊</span>`;
      const cn = document.createElement("div"); cn.className = "ipa"; cn.textContent = x.cn;
      const ex = document.createElement("div"); ex.className = "cn"; ex.textContent = x.ex;
      b.appendChild(w); b.appendChild(cn); b.appendChild(ex);
      b.addEventListener("click", () => speakPhrase(x.e));
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
  // chunk 文本 → 朗读词序列（数字转英文单词，标点保留）
  function spokenWords(text) {
    return text.split(/\s+/).map(w => {
      const m = w.match(/^([^A-Za-z0-9]*)([A-Za-z0-9'’-]+)([^A-Za-z0-9]*)$/);
      if (!m) return w;
      const conv = numToEn(m[2]);
      return conv === m[2] ? w : m[1] + conv + m[3];
    });
  }

  /* ---------- 音频兜底通道（edge-tts 预生成的单句 MP3）----------
     speechSynthesis 在部分环境不可用或不出声（微信内置浏览器缺失/损坏、电脑 Chrome
     的远程语音被墙静默失败），首次播放探测失败后自动切换为播放音频文件，全平台兼容 */
  const audioMode = { on: sessionStorage.getItem("enr:audiomode") === "1" };
  let ttsProbed = false;
  let curAudio = null;
  function stopAudio() {
    if (curAudio) { curAudio.onended = curAudio.onerror = null; try { curAudio.pause(); } catch (e) {} curAudio = null; }
  }
  /* ---------- 播放询问：显示英文 or 不看练听力 ----------
     播放不再强制揭示遮挡句；首次播放弹轻量弹窗让用户选择，本会话记住选择 */
  let playReveal = sessionStorage.getItem("enr:playreveal") === "1";
  const askPop = document.createElement("div");
  askPop.className = "askpop";
  askPop.innerHTML = '<div class="asktop"><span class="askt">播放时是否显示英文及注解？</span>'
    + '<button class="askx" type="button" title="关闭">✕</button></div>'
    + '<div class="askbtns"><button class="primary" type="button">显示英文</button>'
    + '<button type="button">不看，练练听力</button></div>';
  document.body.appendChild(askPop);
  function chooseReveal(v) {
    playReveal = v;
    sessionStorage.setItem("enr:playreveal", v ? "1" : "0");
    askPop.classList.remove("show");
    if (v) { // 选显示英文：当前正在读的这句立即揭示，后续句随朗读揭示
      const w = enwrapEls[cur.s];
      if (w) w.classList.remove("covered");
    }
  }
  askPop.querySelector(".askx").addEventListener("click", e => { e.stopPropagation(); chooseReveal(false); });
  askPop.querySelector(".askbtns .primary").addEventListener("click", e => { e.stopPropagation(); chooseReveal(true); });
  askPop.querySelector(".askbtns button:not(.primary)").addEventListener("click", e => { e.stopPropagation(); chooseReveal(false); });
  function maybeAskReveal() {
    if (sessionStorage.getItem("enr:playreveal") !== null) return; // 本会话已选过
    if (!document.querySelector(".enwrap.covered")) return;        // 没有遮挡句无需问
    askPop.classList.add("show");
  }

  function audioChain(s, myGen, stopAfter) {
    if (myGen !== gen || !playing) return;
    if (s >= N) { finish(true); return; }
    cur = { s, p: 0 };
    mark(s); updatePlayer();
    localStorage.setItem(POS_KEY, s);
    scrollToCur();
    if (playReveal) {
      const w = enwrapEls[s];
      if (w) w.classList.remove("covered");
    }
    stopAudio();
    const a = new Audio("data/tts/" + art.id + "/s" + s + ".mp3");
    curAudio = a;
    a.playbackRate = Math.min(3, Math.max(0.5, settings.rate));
    a.onended = () => {
      if (myGen !== gen) return;
      if (stopAfter) { finish(false); return; }
      setTimeout(() => audioChain(s + 1, myGen, stopAfter), SENT_GAP / 1000);
    };
    a.onerror = () => {
      if (myGen !== gen) return;
      toast("音频文件缺失，朗读停止");
      finish(false);
    };
    a.play().catch(() => {
      if (myGen === gen && playing) { toast("音频播放被拦截，请再点一次播放"); finish(false); }
    });
  }
  /* 探测 speechSynthesis 是否真的能出声：静音试音，1.5s 内 onstart 未触发即视为不可用 */
  function probeTTS(cb) {
    if (!ttsOK()) { cb(false); return; }
    let done = false;
    const u = new SpeechSynthesisUtterance("hello");
    u.volume = 0; u.rate = 2;
    const t = setTimeout(() => { if (!done) { done = true; cb(false); } }, 1500);
    u.onstart = () => { if (!done) { done = true; clearTimeout(t); cb(true); } };
    u.onerror = () => { if (!done) { done = true; clearTimeout(t); cb(false); } };
    try { speechSynthesis.speak(u); } catch (e) { if (!done) { done = true; clearTimeout(t); cb(false); } }
  }

  function chain(s, p, myGen, stopAfter) {
    if (myGen !== gen || !playing) return;
    if (audioMode.on) { tts.stop(); audioChain(s, myGen, stopAfter); return; }
    if (s >= N) { finish(true); return; }
    cur = { s, p };
    mark(s); updatePlayer();
    localStorage.setItem(POS_KEY, s);
    if (p === 0) {
      scrollToCur();
      // 播放时是否揭示遮挡句由用户在弹窗中选择（不看则保持遮挡练听力）
      if (playReveal) {
        const w = enwrapEls[s];
        if (w) w.classList.remove("covered");
      }
    }

    const sent = S[s], ch = sent.chunks[p];
    const isLastPh = p === sent.chunks.length - 1;
    // 重建朗读文本：数字 token 转英文单词（默认中文语音会把孤立数字读成中文），并记录各 token 朗读偏移供重读高亮
    let spoken = "", spRanges = [];
    spokenWords(ch.text).forEach(w => {
      if (spoken) spoken += " ";
      spRanges.push([spoken.length, spoken.length + w.length]);
      spoken += w;
    });
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
        if (np >= sent.chunks.length) { ns = s + 1; np = 0; }
        const gap = (isLastPh ? SENT_GAP : PHRASE_GAP) / Math.max(0.5, settings.rate);
        setTimeout(() => chain(ns, np, myGen, stopAfter), gap);
      },
    });
  }

  function start(s, p, stopAfter) {
    if (!audioMode.on && !ttsOK()) {
      audioMode.on = true;
      sessionStorage.setItem("enr:audiomode", "1");
    }
    playing = true;
    updatePlayer();
    if (!stopAfter) maybeAskReveal(); // 主播放键询问揭示方式；句内朗读键不打扰
    if (audioMode.on || ttsProbed) {
      chain(s, p, nextGen(), stopAfter);
      return;
    }
    // 每个会话首次播放先探测 speechSynthesis 是否真的出声（静音试音），
    // 探测结束才启动正式播放——否则假可用通道与音频通道竞速会导致中途作废
    ttsProbed = true;
    probeTTS(ok => {
      if (!ok) {
        audioMode.on = true;
        sessionStorage.setItem("enr:audiomode", "1");
        toast("语音不可用，已切换到兼容音频模式");
      }
      if (playing) chain(s, p, nextGen(), stopAfter);
    });
  }
  function pause() {
    playing = false;
    tts.stop();
    stopAudio();
    clearWordHl();
    updatePlayer();
  }
  function finish(allDone) {
    playing = false;
    stopAudio();
    clearWordHl();
    if (allDone) {
      toast("已读完整篇，Day 完成 🎉");
      localStorage.setItem(DONE_KEY, String((parseInt(localStorage.getItem(DONE_KEY), 10) || 0) + 1)); // 完成次数累加，供 👑×N 显示
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
    // 优先播预生成的单词发音库（音频模式下也能点读、可无限重复），无文件时回退 speechSynthesis
    const w = numToEn(word);
    if (!w) return;
    const file = "data/tts/words/" + w.toLowerCase().replace(/[^a-z0-9'-]/g, "") + ".mp3";
    const a = new Audio(file);
    let fell = false;
    const fallback = () => {
      if (fell) return;
      fell = true;
      if (!audioMode.on && ttsOK()) tts.speak(w, { rate: Math.max(0.6, settings.rate * 0.9) });
    };
    a.onerror = fallback;
    a.play().catch(fallback);
  }
  function speakPhrase(text) {
    if (audioMode.on) return;
    if (!ttsOK()) { toast(NO_TTS_MSG); return; }
    tts.speak(spokenWords(text).join(" "), { rate: Math.max(0.6, settings.rate * 0.9) });
  }
  function onWordClick(tok, e) {
    e.stopPropagation();
    const w = tok.dataset.w.replace(/[^\w'’-]/g, "");
    if (!w) return;
    flashCw(tok);
    if (audioMode.on || !ttsOK()) return; // 音频模式下点词只做组级高亮，不朗读
    if (playing) {
      // 打断当前句 → 读单词 → 从当前 chunk 继续
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
  $("backBtn").addEventListener("click", () => { location.href = "stage.html?stage=" + art.stage; });

  // 返回按钮：下滑看后面内容时隐藏，上滑时显示（纯透明度渐变）
  const backFab = $("backBtn");
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > lastY + 6 && y > 140) backFab.classList.add("hide");
    else if (y < lastY - 6 || y <= 140) backFab.classList.remove("hide");
    lastY = y;
  }, { passive: true });

  $("pprog").addEventListener("click", e => {
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const s = Math.min(N - 1, Math.floor(ratio * N));
    if (playing) { tts.stop(); chain(s, 0, nextGen(), false); }
    else select(s, 0, true);
  });

  const rateSel = $("rateSel");
  if (![...rateSel.options].some(o => o.value === String(settings.rate))) set("rate", 1); // 旧存的 0.8/0.9 等已下架档位归一化
  rateSel.value = String(settings.rate);
  rateSel.addEventListener("change", e => { set("rate", parseFloat(e.target.value)); });

  document.addEventListener("keydown", e => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "button" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.code === "Space") { e.preventDefault(); playAll(); }
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* ---------- 顶部"继续阅读" ---------- */
  if (savedPos > 0 && savedPos < N - 1 && !(parseInt(localStorage.getItem(DONE_KEY), 10) > 0)) {
    const chip = document.createElement("button");
    chip.className = "continue-chip";
    chip.textContent = `上次读到第 ${savedPos + 1} 句 · 点击继续`;
    chip.addEventListener("click", () => { select(savedPos, 0, true); start(savedPos, 0, false); });
    $("artMeta").appendChild(chip);
  }

  /* ---------- 初始 ---------- */
  const metaHtml = [];
  metaHtml.push(`${art.category} · ${art.scene}`);
  metaHtml.push(`${art.wordCount} 词 · ${N} 句`);
  if (meta && meta.seconds) metaHtml.push(`约 ${meta.seconds} 秒`);
  $("artMeta").insertAdjacentHTML("afterbegin",
    metaHtml.map(t => `<span>${t}</span>`).join('<span class="dot"></span>'));

  select(savedPos, 0, false);
  window.addEventListener("beforeunload", () => { tts.stop(); localStorage.setItem(POS_KEY, cur.s); });
  } /* init */
})();
