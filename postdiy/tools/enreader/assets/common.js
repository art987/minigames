/* ============ enreader 公共库：设置存储 / 语音引擎 / 通用组件 ============ */
window.ENR = (function () {
  "use strict";

  /* ---------- 设置（全部按默认运行；设置面板已移除，仅语速可在播放条调整并记忆） ---------- */
  const DEFAULTS = { rate: 1 };
  let settings = Object.assign({}, DEFAULTS);
  try {
    const saved = JSON.parse(localStorage.getItem("enr:set") || "{}");
    if (typeof saved.rate === "number") settings.rate = saved.rate;
  } catch (e) { /* ignore */ }
  function saveSettings() { localStorage.setItem("enr:set", JSON.stringify(settings)); }
  saveSettings();   // 覆盖旧版本遗留的废弃设置键
  function set(k, v) { settings[k] = v; saveSettings(); applyTheme(); }
  function applyTheme() { document.documentElement.dataset.theme = "light"; }

  /* ---------- 英文语音管理 ---------- */
  const tts = {
    voices: [], ready: false,
    refresh() {
      const all = speechSynthesis.getVoices().filter(v => /^en([-_]|$)/i.test(v.lang));
      if (!all.length) return;
      const score = v => {
        let s = 0;
        if (/^en-US/i.test(v.lang)) s += 5;
        else if (/^en-GB/i.test(v.lang)) s += 3;
        else if (/^en/i.test(v.lang)) s += 1;
        if (/natural/i.test(v.name)) s += 6;
        if (/google (us|uk) english/i.test(v.name)) s += 5;
        if (/(aria|jenny|guy|guy|samantha|daniel|libby|sonia)/i.test(v.name)) s += 3;
        if (/compact|espeak/i.test(v.name)) s -= 4;
        if (!v.localService) s += 1;
        return -s;
      };
      this.voices = all.sort((a, b) => score(a) - score(b));
      this.ready = true;
    },
    pick() {
      if (!this.voices.length) this.refresh();
      return this.voices[0] || null;   // 语音选择面板已移除，固定用评分最高的语音
    },
    speak(text, { rate = settings.rate, onend, onboundary, onstart, onerror } = {}) {
      this.stop();
      const u = new SpeechSynthesisUtterance(text);
      const v = this.pick();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
      u.rate = rate; u.pitch = 1;
      if (onstart) u.onstart = onstart;
      if (onend) u.onend = () => onend();
      u.onerror = e => {
        // cancel() 打断旧语音也会触发 error，不算真失败
        if (e && (e.error === "interrupted" || e.error === "canceled")) return;
        if (onerror) onerror(e); else toast("语音播放失败，请检查浏览器的语音设置");
      };
      if (onboundary) u.onboundary = onboundary;
      speechSynthesis.speak(u);
      return u;
    },
    stop() { try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } },
  };
  if ("speechSynthesis" in window) {
    tts.refresh();
    speechSynthesis.onvoiceschanged = () => tts.refresh();
  }
  // 语音列表异步加载，为空不代表不能读：只要支持 speechSynthesis 就直接朗读，
  // 空列表时浏览器会用系统默认语音兜底；真正失败由 onerror 提示
  const ttsOK = () => "speechSynthesis" in window;

  /* ---------- toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  return { settings, set, saveSettings, applyTheme, tts, ttsOK, toast };
})();
