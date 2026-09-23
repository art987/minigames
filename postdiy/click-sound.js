/**
 * 全站点击音效（首页 index.html + 编辑页 editor.html 共用）
 *
 * ── 当前规则（自动判定）────────────────────────
 * 点击后短时间内弹出了新弹窗/弹层 → 方案 5「泡泡上扬」
 * 其它普通点击                     → 方案 8「短促啪」
 * 无需给按钮单独标注，自动识别 class/id 含 modal/popup/dialog/drawer/sheet 的弹层
 *
 * ── 手动指定方案（调试用）──────────────────────
 * - URL 参数 ?sound=N（1~8）：本次访问强制使用该方案，用于试听
 * - 控制台：setClickSound(N) 强制指定；setClickSound(0) 恢复自动判定
 * - 控制台：testClickSound(N) 直接播放一次（若无声，先点一下页面任意位置解锁音频）
 * - 文件内 SOUND_PRESET 保持 0 即自动模式
 *
 * ── 兼容性 ────────────────────────────────────
 * - Web Audio API 实时合成，无音频文件、无网络请求，天然兼容 App WebView；
 *   极旧 WebView 不支持时静默降级为无音效，不影响任何功能
 * - iOS/Android WebView 要求音频上下文在用户手势内创建/恢复，touchstart 与 click 内均已处理
 * - 输入框（打字）、拖拽滑杆、禁用元素不响；60ms 内重复事件只响一次，避免双重音
 */
(function () {
  // ===== 音效方案：0=自动（弹窗5/普通8）；设为 1~8 强制固定方案 =====
  var SOUND_PRESET = 0;

  // 弹窗按钮音效 / 普通按钮音效
  var POPUP_SOUND = 5;  // 泡泡上扬
  var NORMAL_SOUND = 8; // 短促啪

  // 弹窗出现判定窗口（毫秒）：点击后该时间内出现新弹层即视为"有弹窗的按钮"
  var POPUP_DETECT_MS = 150;

  // URL 参数 ?sound=N 临时强制指定（仅试听用）
  var m = location.search.match(/[?&]sound=([1-8])/);
  var forcedPreset = m ? +m[1] : SOUND_PRESET;

  var audioCtx = null;
  var lastPlayAt = 0;

  function ensureCtx() {
    if (audioCtx) return audioCtx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      audioCtx = new AC();
    } catch (e) {
      audioCtx = null;
    }
    return audioCtx;
  }

  // WebView 音频解锁：上下文被自动挂起时，在用户手势内恢复
  function unlock() {
    var ctx = ensureCtx();
    if (ctx && ctx.state === 'suspended' && ctx.resume) {
      try { ctx.resume(); } catch (e) {}
    }
  }

  // 白噪声缓冲（机械咔哒/短促啪 用）
  function noiseBuffer(ctx, dur) {
    var len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  // 增益包络：快速起音 → 指数衰减到静音
  function env(g, t0, peak, attack, decay) {
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
  }

  // 振荡器快捷创建
  function osc(ctx, type, f0, f1, sweepTo, t0) {
    var o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t0 + sweepTo);
    return o;
  }

  // ===== 8 种音效合成方案 =====
  var PRESETS = {
    // 1 清脆嗒声：高频短促下滑
    1: function (ctx, t0) {
      var f = 1400 + Math.random() * 500;
      var o = osc(ctx, 'sine', f, Math.max(280, f * 0.25), 0.08, t0);
      var g = ctx.createGain();
      env(g, t0, 0.12, 0.006, 0.084);
      o.connect(g); g.connect(ctx.destination);
      o.start(t0); o.stop(t0 + 0.1);
    },
    // 2 软木啵：低频短下滑，圆润的"啵"
    2: function (ctx, t0) {
      var o = osc(ctx, 'sine', 520, 170, 0.07, t0);
      var g = ctx.createGain();
      env(g, t0, 0.18, 0.005, 0.07);
      o.connect(g); g.connect(ctx.destination);
      o.start(t0); o.stop(t0 + 0.09);
    },
    // 3 水滴声：中高频快速下滑带余韵
    3: function (ctx, t0) {
      var o = osc(ctx, 'sine', 1100, 380, 0.09, t0);
      var g = ctx.createGain();
      env(g, t0, 0.16, 0.004, 0.11);
      o.connect(g); g.connect(ctx.destination);
      o.start(t0); o.stop(t0 + 0.13);
    },
    // 4 机械咔哒：白噪声窄带滤波，像轻按键盘
    4: function (ctx, t0) {
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(ctx, 0.02);
      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 2400;
      bp.Q.value = 1.2;
      var g = ctx.createGain();
      env(g, t0, 0.25, 0.002, 0.02);
      src.connect(bp); bp.connect(g); g.connect(ctx.destination);
      src.start(t0);
    },
    // 5 泡泡上扬：低到高上扬，轻快积极（弹窗按钮音效）
    5: function (ctx, t0) {
      var o = osc(ctx, 'sine', 380, 950, 0.06, t0);
      var g = ctx.createGain();
      env(g, t0, 0.15, 0.005, 0.06);
      o.connect(g); g.connect(ctx.destination);
      o.start(t0); o.stop(t0 + 0.08);
    },
    // 6 琴键叮：三角波带泛音余韵，柔和悦耳
    6: function (ctx, t0) {
      var o = osc(ctx, 'triangle', 988, 0, 0, t0);
      var g = ctx.createGain();
      env(g, t0, 0.12, 0.004, 0.2);
      o.connect(g); g.connect(ctx.destination);
      o.start(t0); o.stop(t0 + 0.22);
      // 高八度泛音
      var o2 = osc(ctx, 'sine', 1976, 0, 0, t0);
      var g2 = ctx.createGain();
      env(g2, t0, 0.04, 0.004, 0.12);
      o2.connect(g2); g2.connect(ctx.destination);
      o2.start(t0); o2.stop(t0 + 0.14);
    },
    // 7 低音咚：厚重低频，踏实反馈
    7: function (ctx, t0) {
      var o = osc(ctx, 'sine', 210, 75, 0.13, t0);
      var g = ctx.createGain();
      env(g, t0, 0.22, 0.006, 0.13);
      o.connect(g); g.connect(ctx.destination);
      o.start(t0); o.stop(t0 + 0.16);
    },
    // 8 短促啪：高频噪声+下滑音，干净的"啪"（普通按钮音效）
    8: function (ctx, t0) {
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(ctx, 0.012);
      var hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 2800;
      var g1 = ctx.createGain();
      env(g1, t0, 0.18, 0.002, 0.012);
      src.connect(hp); hp.connect(g1); g1.connect(ctx.destination);
      src.start(t0);
      // 伴随短下滑音
      var o = osc(ctx, 'sine', 1800, 700, 0.025, t0);
      var g2 = ctx.createGain();
      env(g2, t0, 0.1, 0.002, 0.025);
      o.connect(g2); g2.connect(ctx.destination);
      o.start(t0); o.stop(t0 + 0.04);
    }
  };

  // 播放指定方案（60ms 去重，防止同一操作双重音）
  function playPreset(id) {
    var ctx = ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended' && ctx.resume) {
      try { ctx.resume(); } catch (e) {}
    }
    var now = Date.now();
    if (now - lastPlayAt < 60) return;
    lastPlayAt = now;

    var fn = PRESETS[id] || PRESETS[NORMAL_SOUND];
    try { fn(ctx, ctx.currentTime); } catch (e) {}
  }

  // 弹层选择器：class/id 含 modal/popup/dialog/drawer/sheet（覆盖大小写常见写法）
  var MODAL_SELECTOR = '[class*="modal"],[id*="modal"],[class*="Modal"],[id*="Modal"],'
    + '[class*="popup"],[id*="popup"],[class*="Popup"],[id*="Popup"],'
    + '[class*="dialog"],[id*="dialog"],[class*="Dialog"],[id*="Dialog"],'
    + '[class*="drawer"],[id*="drawer"],[class*="Drawer"],[id*="Drawer"],'
    + '[class*="sheet"],[id*="sheet"],[class*="Sheet"],[id*="Sheet"]';

  // 弹层是否正在显示（有实际尺寸且未隐藏）
  function isVisibleModal(el) {
    try {
      var r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return false;
      var s = getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden';
    } catch (e) { return false; }
  }

  // 收集当前所有可见弹层
  function collectVisibleModals() {
    var result = [];
    var list;
    try { list = document.querySelectorAll(MODAL_SELECTOR); } catch (e) { return result; }
    for (var i = 0; i < list.length; i++) {
      if (isVisibleModal(list[i])) result.push(list[i]);
    }
    return result;
  }

  // 点击音效主逻辑：
  // 强制方案（调试）直接响；自动模式下先快照点击前的可见弹层，
  // 短窗口后再查一次——出现"新弹层"则该按钮属于"有弹窗的按钮"
  function handleClickSound() {
    if (forcedPreset >= 1 && forcedPreset <= 8) {
      playPreset(forcedPreset);
      return;
    }
    var before;
    try { before = collectVisibleModals(); } catch (e) { before = []; }
    setTimeout(function () {
      var opened = false;
      try {
        var after = collectVisibleModals();
        for (var i = 0; i < after.length; i++) {
          if (before.indexOf(after[i]) === -1) { opened = true; break; }
        }
      } catch (e) {}
      playPreset(opened ? POPUP_SOUND : NORMAL_SOUND);
    }, POPUP_DETECT_MS);
  }

  // 判断点击目标是否为"可点的按钮或文字"
  function isClickable(el) {
    if (!el || !el.closest) return false;
    // 明确的可点击元素
    if (el.closest('button, a, [role="button"], [onclick], label, summary, .clickable')) return true;
    // 其余靠 cursor:pointer 判定（模板卡片、节日标签、文字按钮等一切有手型提示的元素）
    var node = el;
    while (node && node.nodeType === 1 && node !== document.documentElement) {
      try {
        if (getComputedStyle(node).cursor === 'pointer') return true;
      } catch (e) {}
      node = node.parentElement;
    }
    return false;
  }

  // 捕获阶段监听：既保证在弹窗打开前完成"点击前快照"，也不受页面逻辑 stopPropagation 影响
  document.addEventListener('click', function (e) {
    unlock();
    var target = e.target;
    if (!target || !target.closest) return;
    // 输入类元素不响（打字、拖滑杆不需要音效）
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
    // 禁用元素不响
    if (target.closest('[disabled], .disabled, .disabled-btn')) return;
    if (!isClickable(target)) return;
    handleClickSound();
  }, true);

  // 首次触摸即解锁音频上下文，保证 WebView 中首次点击就有声音
  document.addEventListener('touchstart', unlock, { passive: true });

  // ── 控制台调试工具 ──
  // setClickSound(N)：强制指定方案（1~8）；setClickSound(0) 恢复自动判定（弹窗5/普通8）
  window.setClickSound = function (n) {
    n = +n;
    if (n >= 0 && n <= 8) forcedPreset = n;
    return n === 0
      ? '已恢复自动判定：弹窗按钮=5泡泡上扬，普通按钮=8短促啪'
      : '已强制使用方案 ' + forcedPreset;
  };
  // testClickSound(N)：直接播放一次指定方案（若被浏览器拦截，先点一下页面再执行）
  window.testClickSound = function (n) {
    unlock();
    var ctx = ensureCtx();
    if (!ctx) return '当前环境不支持 Web Audio';
    n = +n;
    var id = (n >= 1 && n <= 8) ? n : NORMAL_SOUND;
    try { PRESETS[id](ctx, ctx.currentTime); } catch (e) {}
    return '已播放方案 ' + id + '：' + ['', '清脆嗒声', '软木啵', '水滴声', '机械咔哒', '泡泡上扬', '琴键叮', '低音咚', '短促啪'][id];
  };
})();
