/**
 * promo.html 页面临时编辑功能
 * - 点击主标题/副标题/口号：打开编辑弹窗，可修改文字内容与字体大小
 * - 每次保存的编辑记录保存在 localStorage，弹窗下方展示历史，点击可回填到编辑框
 * - 点击视频区域：选择本地 mp4 文件进行预览播放
 * 注意：全部为浏览器本地临时存储，仅用于预览调试；正式内容仍以页面源码和视频文件为准
 */
(function () {
    'use strict';

    var STATE_KEY = 'promoEdit.state.v1';      // 当前生效的编辑 { key: {text, size} }
    var HISTORY_KEY = 'promoEdit.history.v1';  // 历次编辑 { key: [{text, size, time}] }
    var LOGO_KEY = 'promoEdit.logo.v1';        // 自定义应用图标（小图以 dataURL 形式存储）
    var SCREEN_KEY = 'promoEdit.screen.v1';    // 手机演示内容 { mode: 'url'|'video', url, video }
    var LOGO_PERSIST_LIMIT = 2 * 1024 * 1024;  // 超过 2MB 的图标仅本次预览
    var VIDEO_PERSIST_LIMIT = 3 * 1024 * 1024; // 超过 3MB 的视频超出 localStorage 配额，仅本次预览
    var HISTORY_MAX = 20;

    // 主标题渐变配色方案（点击"默认"恢复源码配色；6-10 为淡色系，适配深色背景图）
    var GRADIENTS = [
        { name: '落日橙红', colors: ['#ff9500', '#ff2d55', '#ff6b2c'] },
        { name: '金秋暖阳', colors: ['#ffb340', '#ff6b2c', '#ffd54a'] },
        { name: '粉紫浪漫', colors: ['#ff2d55', '#bf5af2', '#ff6bd6'] },
        { name: '蓝紫科技', colors: ['#0a84ff', '#5e5ce6', '#30d0ff'] },
        { name: '清新薄荷', colors: ['#00b96b', '#30d158', '#64d2ff'] },
        { name: '红金喜庆', colors: ['#d70015', '#ff9f0a', '#ffd54a'] },
        { name: '浅樱粉', colors: ['#ffd6e8', '#ffc2d4', '#ffeaf3'] },
        { name: '浅天蓝', colors: ['#bfe0ff', '#d9efff', '#a9d3ff'] },
        { name: '浅薄荷', colors: ['#c9f5df', '#e0fbef', '#b0ecd2'] },
        { name: '浅鹅黄', colors: ['#fff0c4', '#fff6dc', '#ffe9a8'] },
        { name: '浅丁香', colors: ['#e5d6ff', '#f0e8ff', '#d3c0ff'] },
        { name: '深夜蓝', colors: ['#141e30', '#243b55', '#3a6073'] },
        { name: '墨松绿', colors: ['#0f3443', '#155e50', '#2f9e7d'] },
        { name: '醇酒红', colors: ['#3d0912', '#8a1c2b', '#c0392b'] },
        { name: '青碧', colors: ['#00bcd4', '#00e5cc', '#4dd0e1'] },
        { name: '青柠', colors: ['#9ccc65', '#cddc39', '#aeea00'] },
        { name: '品红', colors: ['#ec407a', '#d500f9', '#f50057'] },
        { name: '大地棕', colors: ['#8d6e63', '#a1887f', '#6d4c41'] },
        { name: '石墨灰', colors: ['#424245', '#6e6e73', '#1d1d1f'] }
    ];

    // 文字颜色方案（副标题/口号/应用名称）：白-浅-艳-深全梯度，适配任意背景
    var COLORS = [
        { name: '纯白', hex: '#ffffff' },
        { name: '银白', hex: '#f2f2f7' },
        { name: '明黄', hex: '#ffcc00' },
        { name: '鹅黄', hex: '#ffe08a' },
        { name: '橙', hex: '#ff9500' },
        { name: '橘', hex: '#ff6b2c' },
        { name: '红', hex: '#ff3b30' },
        { name: '绯红', hex: '#c9182b' },
        { name: '品红', hex: '#ff2d55' },
        { name: '樱粉', hex: '#ffc2d4' },
        { name: '紫', hex: '#bf5af2' },
        { name: '丁香', hex: '#e3d4ff' },
        { name: '靛蓝', hex: '#5e5ce6' },
        { name: '蓝', hex: '#0a84ff' },
        { name: '深蓝', hex: '#1d4ed8' },
        { name: '天蓝', hex: '#bfe0ff' },
        { name: '青', hex: '#32ade6' },
        { name: '薄荷', hex: '#c8f4de' },
        { name: '绿', hex: '#30d158' },
        { name: '翠绿', hex: '#00b96b' },
        { name: '棕', hex: '#a1887f' },
        { name: '灰', hex: '#8e8e93' },
        { name: '墨灰', hex: '#3a3a3c' },
        { name: '纯黑', hex: '#000000' }
    ];

    // 可编辑元素配置（color: true 表示支持文字颜色选择）
    var CONFIG = [
        { key: 'heroTitle', selector: '.hero-title', label: '主标题', min: 20, max: 72 },
        { key: 'heroSub', selector: '.hero-subtitle', label: '副标题', min: 12, max: 48, color: true },
        { key: 'slogan', selector: '.slogan', label: '口号', min: 14, max: 48, color: true },
        { key: 'appName', selector: '.app-name', label: '应用名称', min: 18, max: 48, color: true }
    ];

    function readJSON(key, fallback) {
        try {
            var raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    }

    function writeJSON(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('promo-edit: localStorage 写入失败（可能超出配额）', e);
            return false;
        }
    }

    var state = readJSON(STATE_KEY, {}) || {};
    var historyData = readJSON(HISTORY_KEY, {}) || {};

    var defaults = {};   // key -> 页面源码里的原始文字
    var els = {};        // key -> { el, cfg }
    var currentKey = null;
    var snapshot = null; // 打开弹窗时的已保存状态，用于"取消"还原
    var pendingGrad = null; // 弹窗内临时选择的渐变方案（heroTitle 专用，null = 默认配色）
    var pendingColor = null; // 弹窗内临时选择的文字颜色（支持 color 的元素，null = 默认颜色）
    var pendingShadow = null; // 弹窗内临时选择的投影方案（heroTitle 专用，null = 无投影）
    // 投影用 filter: drop-shadow 而非 text-shadow —— text-shadow 在 background-clip:text 渐变字上会盖住渐变色
    var SHADOW_PRESETS = [
        { key: 'none', name: '无' },
        { key: 'soft', name: '轻', css: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.28))' },
        { key: 'mid', name: '中', css: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.38))' },
        { key: 'heavy', name: '重', css: 'drop-shadow(0 7px 18px rgba(0, 0, 0, 0.5))' },
        { key: 'glow', name: '光晕', css: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))' }
    ];

    function shadowCssOf(key) {
        for (var i = 0; i < SHADOW_PRESETS.length; i++) {
            if (SHADOW_PRESETS[i].key === key) return SHADOW_PRESETS[i].css;
        }
        return null;
    }
    var scrollLockTop = 0;

    // ---------- DOM ----------
    var modal = document.getElementById('editModal');
    var modalTitle = document.getElementById('editModalTitle');
    var textArea = document.getElementById('editTextArea');
    var sizeRange = document.getElementById('editSizeRange');
    var sizeValue = document.getElementById('editSizeValue');
    var saveBtn = document.getElementById('editSaveBtn');
    var cancelBtn = document.getElementById('editCancelBtn');
    var resetBtn = document.getElementById('editResetBtn');
    var historyWrap = document.getElementById('editHistoryWrap');
    var historyList = document.getElementById('editHistoryList');

    CONFIG.forEach(function (c) {
        var el = document.querySelector(c.selector);
        if (!el) return;
        els[c.key] = { el: el, cfg: c };
        el.classList.add('edit-target');
        defaults[c.key] = el.textContent;
    });

    if (!modal || !textArea || !sizeRange || !saveBtn) return;

    // ---------- 渐变配色选择（主标题专用） ----------
    var gradSection = document.getElementById('gradSection');
    var gradSwatches = document.getElementById('gradSwatches');

    function buildGradSwatches() {
        if (!gradSwatches) return;
        gradSwatches.innerHTML = '';
        // 第一个为"默认"：恢复源码配色
        var def = document.createElement('button');
        def.type = 'button';
        def.className = 'grad-swatch';
        def.title = '默认（恢复源码配色）';
        def.setAttribute('data-grad', '-1');
        def.innerHTML = '<span class="grad-swatch-chip grad-chip-default"></span>';
        gradSwatches.appendChild(def);
        // 纯白/纯黑：纯色方案，适配深浅背景图
        [['white', '纯白'], ['black', '纯黑']].forEach(function (pair) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'grad-swatch';
            btn.title = pair[1];
            btn.setAttribute('data-grad', pair[0]);
            btn.innerHTML = '<span class="grad-swatch-chip grad-chip-' + pair[0] + '"></span>';
            gradSwatches.appendChild(btn);
        });
        GRADIENTS.forEach(function (g, idx) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'grad-swatch';
            btn.title = g.name;
            btn.setAttribute('data-grad', String(idx));
            var chip = document.createElement('span');
            chip.className = 'grad-swatch-chip grad-chip-' + idx;
            btn.appendChild(chip);
            gradSwatches.appendChild(btn);
        });
        syncGradSection(currentKey);
    }

    function syncGradSection(key) {
        if (!gradSection) return;
        var isTitle = key === 'heroTitle';
        gradSection.hidden = !isTitle;
        if (!isTitle || !gradSwatches) return;
        var btns = gradSwatches.querySelectorAll('.grad-swatch');
        for (var i = 0; i < btns.length; i++) {
            var val = btns[i].getAttribute('data-grad');
            var isActive;
            if (val === '-1') isActive = pendingGrad === null;
            else if (val === 'white' || val === 'black') isActive = pendingGrad === val;
            else isActive = pendingGrad === Number(val);
            btns[i].classList.toggle('active', isActive);
        }
    }

    buildGradSwatches();
    gradSwatches.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('.grad-swatch') : null;
        if (!btn || !currentKey) return;
        var val = btn.getAttribute('data-grad');
        pendingGrad = val === '-1' ? null : (val === 'white' || val === 'black') ? val : Number(val);
        applyGradPreview(els[currentKey].el, pendingGrad); // 实时预览（需点"保存"才落库）
        syncGradSection(currentKey);
    });

    // 标题配色预览：支持渐变方案索引 / 'white' / 'black' / null(默认)
    function applyGradPreview(el, grad) {
        if (grad === 'white' || grad === 'black') {
            applyColorInline(el, grad === 'white' ? '#ffffff' : '#000000');
        } else if (grad === null) {
            applyColorInline(el, null);
            el.style.removeProperty('background-image');
        } else {
            applyColorInline(el, null);
            el.style.backgroundImage = 'linear-gradient(135deg, ' + GRADIENTS[grad].colors.join(', ') + ')';
        }
    }

    // ---------- 字体投影选择（主标题专用） ----------
    var shadowSection = document.getElementById('shadowSection');
    var shadowOpts = document.getElementById('shadowOpts');

    function applyShadowPreview(el, key) {
        var css = shadowCssOf(key);
        if (css) el.style.filter = css;
        else el.style.removeProperty('filter');
    }

    function buildShadowOpts() {
        if (!shadowOpts) return;
        shadowOpts.innerHTML = '';
        SHADOW_PRESETS.forEach(function (p) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'bg-opt';
            btn.textContent = p.name;
            btn.setAttribute('data-shadow', p.key);
            shadowOpts.appendChild(btn);
        });
    }

    function syncShadowSection(key) {
        if (!shadowSection) return;
        var isTitle = key === 'heroTitle';
        shadowSection.hidden = !isTitle;
        if (!isTitle || !shadowOpts) return;
        var btns = shadowOpts.querySelectorAll('.bg-opt');
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.toggle('active', btns[i].getAttribute('data-shadow') === (pendingShadow || 'none'));
        }
    }

    buildShadowOpts();
    shadowOpts.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('.bg-opt') : null;
        if (!btn || !currentKey) return;
        var val = btn.getAttribute('data-shadow');
        pendingShadow = val === 'none' ? null : val;
        applyShadowPreview(els[currentKey].el, pendingShadow); // 实时预览（需点"保存"才落库）
        syncShadowSection(currentKey);
    });

    // ---------- 文字颜色选择（副标题/口号/应用名称） ----------
    var DEFAULT_TEXT_COLOR = '#000000'; // 未选择颜色时的默认字体颜色（黑色）
    var colorSection = document.getElementById('colorSection');
    var colorSwatches = document.getElementById('colorSwatches');

    // 自定义颜色需覆盖渐变字（口号/应用名称）：清掉背景渐变并设置填充色
    function applyColorInline(el, color) {
        if (color) {
            el.style.color = color;
            el.style.webkitTextFillColor = color;
            el.style.removeProperty('background-image');
        } else {
            el.style.removeProperty('color');
            el.style.removeProperty('-webkit-text-fill-color');
        }
    }

    function buildColorSwatches() {
        if (!colorSwatches) return;
        colorSwatches.innerHTML = '';
        // 无"默认"芯片：默认即为白色字体（见 DEFAULT_TEXT_COLOR）
        COLORS.forEach(function (c, idx) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'color-swatch';
            btn.title = c.name;
            btn.setAttribute('data-color', c.hex);
            var chip = document.createElement('span');
            chip.className = 'color-chip';
            chip.style.background = c.hex; // 颜色值本身即数据，动态注入
            btn.appendChild(chip);
            colorSwatches.appendChild(btn);
        });
        syncColorSection(currentKey);
    }

    function syncColorSection(key) {
        if (!colorSection) return;
        var item = els[key];
        var show = !!(item && item.cfg.color);
        colorSection.hidden = !show;
        if (!show || !colorSwatches) return;
        var active = pendingColor || DEFAULT_TEXT_COLOR;
        var btns = colorSwatches.querySelectorAll('.color-swatch');
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.toggle('active', btns[i].getAttribute('data-color') === active);
        }
    }

    buildColorSwatches();
    colorSwatches.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('.color-swatch') : null;
        if (!btn || !currentKey) return;
        pendingColor = btn.getAttribute('data-color');
        applyColorInline(els[currentKey].el, pendingColor); // 实时预览（需点"保存"才落库）
        syncColorSection(currentKey);
    });

    // ---------- 应用编辑 ----------
    function applyState(key, s) {
        var item = els[key];
        if (!item) return;
        var el = item.el;
        var text = (s && typeof s.text === 'string' && s.text.length) ? s.text : defaults[key];
        el.textContent = text;
        if (s && typeof s.size === 'number' && isFinite(s.size)) {
            el.style.fontSize = s.size + 'px';
        } else {
            el.style.removeProperty('font-size');
        }
        if (s && (s.grad === 'white' || s.grad === 'black')) {
            applyColorInline(el, s.grad === 'white' ? '#ffffff' : '#000000');
        } else {
            // 支持颜色配置的元素：未保存颜色时默认白色
            var color = (s && typeof s.color === 'string' && s.color) ? s.color : (item.cfg.color ? DEFAULT_TEXT_COLOR : null);
            applyColorInline(el, color);
            if (s && typeof s.grad === 'number' && GRADIENTS[s.grad]) {
                el.style.backgroundImage = 'linear-gradient(135deg, ' + GRADIENTS[s.grad].colors.join(', ') + ')';
            } else if (!color) {
                el.style.removeProperty('background-image');
            }
        }
        var shadowCss = s ? shadowCssOf(s.shadow) : null;
        if (shadowCss) el.style.filter = shadowCss;
        else el.style.removeProperty('filter');
    }

    // 启动时恢复上次保存的编辑
    CONFIG.forEach(function (c) {
        if (els[c.key]) applyState(c.key, state[c.key] || null);
    });

    // ---------- 弹窗滚动锁定（iOS Safari 兼容：body fixed + 负 top） ----------
    function lockScroll() {
        scrollLockTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        document.body.style.position = 'fixed';
        document.body.style.top = -scrollLockTop + 'px';
        document.body.style.width = '100%';
    }

    function unlockScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollLockTop);
    }

    // ---------- 弹窗 ----------
    function openEditor(key) {
        var item = els[key];
        if (!item) return;
        currentKey = key;

        var saved = state[key] || null;
        snapshot = saved ? {
            text: saved.text,
            size: typeof saved.size === 'number' ? saved.size : null,
            grad: typeof saved.grad === 'number' ? saved.grad : null,
            color: typeof saved.color === 'string' ? saved.color : null,
            shadow: shadowCssOf(saved.shadow) ? saved.shadow : null
        } : null;
        pendingGrad = (saved && (saved.grad === 'white' || saved.grad === 'black' || (typeof saved.grad === 'number' && GRADIENTS[saved.grad]))) ? saved.grad : null;
        pendingColor = (saved && typeof saved.color === 'string' && saved.color) ? saved.color : (item.cfg.color ? DEFAULT_TEXT_COLOR : null);
        pendingShadow = snapshot && snapshot.shadow ? snapshot.shadow : null;

        var cfg = item.cfg;
        modalTitle.textContent = '编辑' + cfg.label;
        sizeRange.min = cfg.min;
        sizeRange.max = cfg.max;
        var currentSize = parseFloat(window.getComputedStyle(item.el).fontSize) || cfg.min;
        textArea.value = item.el.textContent;
        sizeRange.value = currentSize;
        sizeValue.textContent = Math.round(currentSize) + 'px';
        saveBtn.disabled = textArea.value.trim().length === 0;

        syncGradSection(key);
        syncColorSection(key);
        syncShadowSection(key);
        renderHistory(key);
        lockScroll();
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        unlockScroll();
        resetModalPos(editModal);
        currentKey = null;
        snapshot = null;
        pendingGrad = null;
        pendingColor = null;
        pendingShadow = null;
    }

    function cancelEditor() {
        if (currentKey) applyState(currentKey, snapshot);
        closeModal();
    }

    // 实时预览：输入文字
    textArea.addEventListener('input', function () {
        if (!currentKey) return;
        els[currentKey].el.textContent = textArea.value;
        saveBtn.disabled = textArea.value.trim().length === 0;
    });

    // 实时预览：调整字号
    sizeRange.addEventListener('input', function () {
        if (!currentKey) return;
        var v = Number(sizeRange.value);
        sizeValue.textContent = v + 'px';
        els[currentKey].el.style.fontSize = v + 'px';
    });

    // ---------- 历史 ----------
    function formatTime(ts) {
        var d = new Date(ts);
        function p(n) { return (n < 10 ? '0' : '') + n; }
        return p(d.getHours()) + ':' + p(d.getMinutes());
    }

    function renderHistory(key) {
        var list = historyData[key] || [];
        historyList.innerHTML = '';
        historyWrap.hidden = list.length === 0;
        list.forEach(function (entry) {
            var li = document.createElement('li');
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'edit-history-item';

            var txt = document.createElement('span');
            txt.className = 'edit-history-text';
            txt.textContent = entry.text;

            var meta = document.createElement('span');
            meta.className = 'edit-history-meta';
            meta.textContent = (typeof entry.size === 'number' ? entry.size + 'px · ' : '') + formatTime(entry.time);

            btn.appendChild(txt);
            btn.appendChild(meta);
            // 点击历史记录：回填到编辑框并实时预览（需点"保存"才落库）
            btn.addEventListener('click', function () {
                textArea.value = entry.text;
                els[key].el.textContent = entry.text;
                if (typeof entry.size === 'number') {
                    sizeRange.value = entry.size;
                    sizeValue.textContent = entry.size + 'px';
                    els[key].el.style.fontSize = entry.size + 'px';
                }
                if (entry.grad === 'white' || entry.grad === 'black') {
                    pendingGrad = entry.grad;
                    applyGradPreview(els[key].el, entry.grad);
                    syncGradSection(key);
                } else if (typeof entry.grad === 'number' && GRADIENTS[entry.grad]) {
                    pendingGrad = entry.grad;
                    els[key].el.style.backgroundImage = 'linear-gradient(135deg, ' + GRADIENTS[entry.grad].colors.join(', ') + ')';
                    syncGradSection(key);
                }
                if (typeof entry.color === 'string' && entry.color) {
                    pendingColor = entry.color;
                    applyColorInline(els[key].el, entry.color);
                } else if (els[key].cfg.color) {
                    // 旧历史条目未带颜色：回填默认白色
                    pendingColor = DEFAULT_TEXT_COLOR;
                    applyColorInline(els[key].el, DEFAULT_TEXT_COLOR);
                }
                syncColorSection(key);
                // 投影：历史条目未带投影则一并清除
                var entryShadow = shadowCssOf(entry.shadow) ? entry.shadow : null;
                pendingShadow = entryShadow;
                applyShadowPreview(els[key].el, entryShadow);
                syncShadowSection(key);
                saveBtn.disabled = entry.text.trim().length === 0;
            });
            li.appendChild(btn);
            historyList.appendChild(li);
        });
    }

    // ---------- 按钮 ----------
    saveBtn.addEventListener('click', function () {
        if (!currentKey) return;
        var text = textArea.value;
        if (!text.trim().length) return;
        var size = Number(sizeRange.value);

        state[currentKey] = { text: text, size: size };
        if (currentKey === 'heroTitle' && pendingGrad !== null) {
            state[currentKey].grad = pendingGrad;
        }
        if (currentKey === 'heroTitle' && pendingShadow) {
            state[currentKey].shadow = pendingShadow;
        } else if (currentKey === 'heroTitle') {
            delete state[currentKey].shadow;
        }
        if (els[currentKey].cfg.color && pendingColor) {
            state[currentKey].color = pendingColor;
        }
        var list = historyData[currentKey] || [];
        var last = list[0];
        var entryGrad = currentKey === 'heroTitle' && pendingGrad !== null ? pendingGrad : undefined;
        var entryColor = els[currentKey].cfg.color && pendingColor ? pendingColor : undefined;
        var entryShadow = currentKey === 'heroTitle' && pendingShadow ? pendingShadow : undefined;
        if (!last || last.text !== text || last.size !== size) {
            list.unshift({ text: text, size: size, grad: entryGrad, color: entryColor, shadow: entryShadow, time: Date.now() });
            if (list.length > HISTORY_MAX) list.length = HISTORY_MAX;
        }
        historyData[currentKey] = list;
        writeJSON(STATE_KEY, state);
        writeJSON(HISTORY_KEY, historyData);

        snapshot = { text: text, size: size, grad: typeof entryGrad === 'number' ? entryGrad : null, color: typeof entryColor === 'string' ? entryColor : null, shadow: entryShadow || null };
        closeModal();
    });

    cancelBtn.addEventListener('click', cancelEditor);

    resetBtn.addEventListener('click', function () {
        if (!currentKey) return;
        delete state[currentKey];
        delete historyData[currentKey];
        writeJSON(STATE_KEY, state);
        writeJSON(HISTORY_KEY, historyData);

        applyState(currentKey, null);
        textArea.value = els[currentKey].el.textContent;
        var computed = parseFloat(window.getComputedStyle(els[currentKey].el).fontSize) || Number(sizeRange.min);
        sizeRange.value = computed;
        sizeValue.textContent = Math.round(computed) + 'px';
        saveBtn.disabled = false;
        snapshot = null;
        pendingGrad = null;
        pendingColor = null;
        pendingShadow = null;
        syncGradSection(currentKey);
        syncColorSection(currentKey);
        syncShadowSection(currentKey);
        renderHistory(currentKey);
    });

    // 点击遮罩 / 右上角关闭 = 取消
    modal.addEventListener('click', function (e) {
        var closer = e.target.closest ? e.target.closest('[data-edit-close]') : null;
        if (closer) cancelEditor();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) cancelEditor();
    });

    // 点击页面元素打开编辑
    Object.keys(els).forEach(function (key) {
        els[key].el.addEventListener('click', function () {
            openEditor(key);
        });
    });

    // ---------- 特点列表：文字固定单行，超长自动缩小字号 ----------
    var featureItems = Array.prototype.slice.call(document.querySelectorAll('.feature-item'));
    var FIT_MIN_PX = 9;

    function fitFeatureTexts() {
        featureItems.forEach(function (li) {
            var text = li.querySelector('.feature-text');
            if (!text) return;
            text.style.fontSize = '';
            var size = parseFloat(window.getComputedStyle(text).fontSize);
            var guard = 60;
            while (text.scrollWidth > text.clientWidth + 0.5 && size > FIT_MIN_PX && guard-- > 0) {
                size -= 0.5;
                text.style.fontSize = size + 'px';
            }
        });
    }

    var fitTimer = null;
    window.addEventListener('resize', function () {
        if (fitTimer) clearTimeout(fitTimer);
        fitTimer = setTimeout(fitFeatureTexts, 200);
    });
    fitFeatureTexts();
    if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
        document.fonts.ready.then(fitFeatureTexts);
    }

    // ---------- 特点列表：逐个放大循环动画（第 1 个放大→缩小，第 2 个……循环） ----------
    var PULSE_SLOT_MS = 1200;  // 单个"放大→缩小"时长
    var INTRO_DONE_MS = 4900;  // 入场动画全部结束时间（最后一条打勾 4.2s 延迟 + 0.5s 动画 + 缓冲）
    var pulsePaused = false;   // 视频播放期间暂停脉冲循环，避免强制回流抢视频解码资源

    function setPulsePaused(v) { pulsePaused = v; }

    function startPulseLoop() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!featureItems.length) return;
        // 入场动画已结束，切换到常驻态（避免替换动画时回到未显示状态）
        featureItems.forEach(function (li) { li.classList.add('is-revealed'); });
        var i = 0;
        function step() {
            if (!pulsePaused) {
                var li = featureItems[i];
                li.classList.remove('is-pulse');
                void li.offsetWidth; // 强制回流，确保同类名可重复触发动画
                li.classList.add('is-pulse');
                i = (i + 1) % featureItems.length;
            }
            setTimeout(step, PULSE_SLOT_MS);
        }
        setTimeout(step, INTRO_DONE_MS);
    }
    startPulseLoop();

    // ---------- 图标与演示内容设置（点击 App logo 打开弹窗，保存后生效） ----------
    var video = document.querySelector('.screen-video');
    var iframe = document.querySelector('.screen-site');
    var logoImg = document.querySelector('.app-logo img');
    var logoModal = document.getElementById('logoModal');
    var logoPreview = document.getElementById('logoPreview');
    var logoUploadBtn = document.getElementById('logoUploadBtn');
    var logoDefaultBtn = document.getElementById('logoDefaultBtn');
    var logoFileInput = document.getElementById('logoFileInput');
    var screenModes = document.getElementById('screenModes');
    var urlBlock = document.getElementById('urlBlock');
    var urlPresets = document.getElementById('urlPresets');
    var screenUrlInput = document.getElementById('screenUrlInput');
    var videoBlock = document.getElementById('videoBlock');
    var screenVideoBtn = document.getElementById('screenVideoBtn');
    var screenVideoTip = document.getElementById('screenVideoTip');
    var screenVideoInput = document.getElementById('screenVideoInput');
    var logoResetBtn = document.getElementById('logoResetBtn');
    var logoCancelBtn = document.getElementById('logoCancelBtn');
    var logoSaveBtn = document.getElementById('logoSaveBtn');
    var DEFAULT_LOGO = '../images/statics/applogo2.png';
    var DEFAULT_SCREEN_URL = 'https://peacelove.top/postdiy/';

    var logoState = readJSON(LOGO_KEY, null); // { img } | null
    var screenState = normalizeScreen(readJSON(SCREEN_KEY, null));

    // 弹窗内待确认值（点"保存"才真正应用并落库）
    var pendingLogo = null; // dataURL | null(默认图标)
    var pendingLogoDirty = false;
    var pendingMode = 'url';
    var pendingUrl = DEFAULT_SCREEN_URL;
    var pendingVideoSrc = null;   // objectURL，仅本次会话播放用（大小不限，不落库）
    var pendingVideoData = null;  // ≤3MB 的 dataURL，用于刷新后恢复；大文件为 null
    var pendingVideoName = '';

    function normalizeScreen(st) {
        var s = st && typeof st === 'object' ? st : {};
        return {
            mode: s.mode === 'video' ? 'video' : 'url',
            url: (typeof s.url === 'string' && s.url) ? s.url : DEFAULT_SCREEN_URL,
            video: (typeof s.video === 'string' && s.video) ? s.video : null
        };
    }

    function setVideoActive(active) {
        if (!video) return;
        // 无视频时视频层放行点击给下层嵌套网页；有视频时由视频层接管
        video.style.pointerEvents = active ? 'auto' : 'none';
    }

    function playVideoSource(src) {
        if (!video || !src) return;
        unloadIframe();          // 停掉嵌套页，释放解码资源
        setPulsePaused(true);    // 暂停特点列表回流动画
        video.preload = 'auto';  // 大文件需积极缓冲，metadata 会导致起播后频繁卡顿
        video.src = src;
        video.load();
        var tryPlay = function () {
            var p = video.play();
            if (p && typeof p.catch === 'function') p.catch(function () { /* 自动播放被拦截时忽略 */ });
        };
        // 等 canplay 再起播，避免 load()/play() 竞争导致播一两秒就中断
        if (video.readyState >= 3) {
            tryPlay();
            return;
        }
        var settled = false;
        var onReady = function () {
            if (settled) return;
            settled = true;
            video.removeEventListener('canplay', onReady);
            video.removeEventListener('error', onFail);
            tryPlay();
        };
        var onFail = function () {
            if (settled) return;
            settled = true;
            video.removeEventListener('canplay', onReady);
            video.removeEventListener('error', onFail);
        };
        video.addEventListener('canplay', onReady);
        video.addEventListener('error', onFail);
        setTimeout(onReady, 3000); // 兜底：3 秒后强制起播
    }

    // 停止并清空视频，还原为嵌套网页展示
    function stopVideo() {
        if (!video) return;
        try { video.pause(); } catch (e) { /* 忽略 */ }
        video.removeAttribute('src');
        var sources = video.querySelectorAll('source');
        for (var i = 0; i < sources.length; i++) {
            if (sources[i].parentNode) sources[i].parentNode.removeChild(sources[i]);
        }
        try { video.load(); } catch (e) { /* 忽略 */ }
        setVideoActive(false);
        setPulsePaused(false); // 恢复特点列表脉冲循环
    }

    // 彻底卸载嵌套网页（display:none 不会停掉其内部 JS/动画，会持续抢占视频解码资源）
    function unloadIframe() {
        if (iframe && iframe.getAttribute('src') !== 'about:blank') iframe.src = 'about:blank';
    }

    // 应用演示内容：url 模式展示嵌套网页；video 模式播放视频并接管点击
    function applyScreen(st) {
        var s = normalizeScreen(st);
        if (!iframe || !video) return;
        if (s.mode === 'video' && s.video) {
            unloadIframe();
            iframe.style.display = 'none';
            video.style.display = '';
            playVideoSource(s.video);
            setVideoActive(true);
        } else {
            stopVideo();
            video.style.display = 'none';
            iframe.style.display = '';
            if (iframe.getAttribute('src') !== s.url) iframe.src = s.url;
        }
    }

    function applyLogo() {
        if (logoImg) logoImg.src = (logoState && logoState.img) ? logoState.img : DEFAULT_LOGO;
    }

    function syncLogoUi() {
        if (logoPreview) logoPreview.src = (pendingLogo !== null) ? pendingLogo : DEFAULT_LOGO;
        var modeBtns = screenModes ? screenModes.querySelectorAll('.bg-opt') : [];
        for (var i = 0; i < modeBtns.length; i++) {
            modeBtns[i].classList.toggle('active', modeBtns[i].getAttribute('data-mode') === pendingMode);
        }
        if (urlBlock) urlBlock.hidden = pendingMode !== 'url';
        if (videoBlock) videoBlock.hidden = pendingMode !== 'video';
        if (screenUrlInput && document.activeElement !== screenUrlInput) screenUrlInput.value = pendingUrl;
        if (screenVideoTip) {
            screenVideoTip.textContent = pendingVideoSrc
                ? '已选择' + (pendingVideoName ? '：' + pendingVideoName : '') + (pendingVideoData ? '（刷新后仍保留）' : '（文件较大，刷新后需重新选择）')
                : '大小不限，仅本地临时播放；3MB 以内刷新后仍保留';
        }
        var presets = urlPresets ? urlPresets.querySelectorAll('.bg-opt') : [];
        for (var j = 0; j < presets.length; j++) {
            presets[j].classList.toggle('active', presets[j].getAttribute('data-url') === pendingUrl);
        }
    }

    function openLogoModal() {
        var s = normalizeScreen(screenState);
        pendingLogo = (logoState && logoState.img) ? logoState.img : null;
        pendingLogoDirty = false;
        pendingMode = s.mode;
        pendingUrl = s.url;
        pendingVideoSrc = null;
        pendingVideoData = s.video;
        pendingVideoName = '';
        syncLogoUi();
        lockScroll();
        logoModal.classList.add('active');
    }

    function closeLogoModal() {
        logoModal.classList.remove('active');
        unlockScroll();
        resetModalPos(logoModal);
    }

    function persistLogoAndScreen() {
        var keepVideo = pendingMode === 'video' ? pendingVideoData : null; // 仅 ≤3MB 的视频落库
        screenState = { mode: pendingMode, url: pendingUrl || DEFAULT_SCREEN_URL, video: keepVideo };
        writeJSON(SCREEN_KEY, screenState);
        if (pendingLogoDirty) {
            if (pendingLogo && pendingLogo.length <= LOGO_PERSIST_LIMIT) {
                logoState = { img: pendingLogo };
                writeJSON(LOGO_KEY, logoState);
            } else {
                logoState = null;
                try { localStorage.removeItem(LOGO_KEY); } catch (e) { /* 忽略 */ }
            }
        }
    }

    if (logoModal && logoImg) {
        // 点击 logo 打开弹窗（替代原"点击上传/长按移除"交互）
        logoImg.addEventListener('click', function () { openLogoModal(); });

        if (logoUploadBtn && logoFileInput) {
            logoUploadBtn.addEventListener('click', function () {
                try { logoFileInput.value = ''; } catch (err) { /* 忽略 */ }
                logoFileInput.click();
            });
            logoFileInput.addEventListener('change', function () {
                var file = logoFileInput.files && logoFileInput.files[0];
                if (!file) return;
                var reader = new FileReader();
                reader.onload = function () {
                    pendingLogo = String(reader.result);
                    pendingLogoDirty = true;
                    syncLogoUi();
                };
                reader.readAsDataURL(file);
            });
        }
        if (logoDefaultBtn) {
            logoDefaultBtn.addEventListener('click', function () {
                pendingLogo = null;
                pendingLogoDirty = true;
                syncLogoUi();
            });
        }

        // 演示内容模式切换：网址 / 视频
        if (screenModes) {
            screenModes.addEventListener('click', function (e) {
                var opt = e.target.closest ? e.target.closest('.bg-opt') : null;
                if (!opt) return;
                pendingMode = opt.getAttribute('data-mode');
                syncLogoUi();
            });
        }

        // 预设网址一键填充
        if (urlPresets) {
            urlPresets.addEventListener('click', function (e) {
                var opt = e.target.closest ? e.target.closest('.bg-opt') : null;
                if (!opt) return;
                pendingUrl = opt.getAttribute('data-url');
                syncLogoUi();
            });
        }
        if (screenUrlInput) {
            screenUrlInput.addEventListener('input', function () {
                pendingUrl = screenUrlInput.value.trim();
                var presets = urlPresets ? urlPresets.querySelectorAll('.bg-opt') : [];
                for (var i = 0; i < presets.length; i++) {
                    presets[i].classList.toggle('active', presets[i].getAttribute('data-url') === pendingUrl);
                }
            });
        }

        // 本地视频选择（保存后生效）
        if (screenVideoBtn && screenVideoInput) {
            screenVideoBtn.addEventListener('click', function () {
                try { screenVideoInput.value = ''; } catch (err) { /* 忽略 */ }
                screenVideoInput.click();
            });
            screenVideoInput.addEventListener('change', function () {
                var file = screenVideoInput.files && screenVideoInput.files[0];
                if (!file) return;
                pendingVideoName = file.name || '';
                if (pendingVideoSrc) { try { URL.revokeObjectURL(pendingVideoSrc); } catch (e) { /* 忽略 */ } }
                pendingVideoSrc = URL.createObjectURL(file); // 大小不限：本地文件直接引用播放，不转 base64
                if (file.size <= VIDEO_PERSIST_LIMIT) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        pendingVideoData = String(reader.result);
                        syncLogoUi();
                    };
                    reader.readAsDataURL(file);
                } else {
                    pendingVideoData = null; // 大文件仅本次播放，刷新后需重新选择
                    syncLogoUi();
                }
            });
        }

        // 保存：确认后才应用并落库
        if (logoSaveBtn) {
            logoSaveBtn.addEventListener('click', function () {
                persistLogoAndScreen();
                applyLogo();
                if (pendingMode === 'video' && pendingVideoSrc) {
                    // 本次会话用 objectURL 即时播放（大小不限）；刷新后按落库的 dataURL 恢复（≤3MB）
                    iframe.style.display = 'none';
                    video.style.display = '';
                    playVideoSource(pendingVideoSrc);
                    setVideoActive(true);
                } else {
                    applyScreen(screenState);
                }
                closeLogoModal();
            });
        }
        if (logoCancelBtn) logoCancelBtn.addEventListener('click', closeLogoModal);

        // 恢复默认：清空全部设置并立即生效（弹窗保持打开，可继续编辑）
        if (logoResetBtn) {
            logoResetBtn.addEventListener('click', function () {
                logoState = null;
                screenState = { mode: 'url', url: DEFAULT_SCREEN_URL, video: null };
                try { localStorage.removeItem(LOGO_KEY); } catch (e) { /* 忽略 */ }
                try { localStorage.removeItem(SCREEN_KEY); } catch (e) { /* 忽略 */ }
                pendingLogo = null;
                pendingLogoDirty = true;
                pendingMode = 'url';
                pendingUrl = DEFAULT_SCREEN_URL;
                if (pendingVideoSrc) { try { URL.revokeObjectURL(pendingVideoSrc); } catch (e) { /* 忽略 */ } }
                pendingVideoSrc = null;
                pendingVideoData = null;
                pendingVideoName = '';
                applyLogo();
                applyScreen(screenState);
                syncLogoUi();
            });
        }

        var logoClosers = logoModal.querySelectorAll('[data-logo-close]');
        for (var ci = 0; ci < logoClosers.length; ci++) {
            logoClosers[ci].addEventListener('click', closeLogoModal);
        }

        // 初始化：应用保存过的图标与演示内容
        applyLogo();
        applyScreen(screenState);
    }

    // ---------- 自定义背景图片（点击页面空白背景区域打开弹窗） ----------
    var BG_KEY = 'promoEdit.bg.v1';
    var BG_PERSIST_LIMIT = 3 * 1024 * 1024; // 超过 3MB 的图片超出 localStorage 配额，仅本次预览
    var bgModal = document.getElementById('bgModal');
    var bgLayer = document.getElementById('customBg');
    var bgUploadBtn = document.getElementById('bgUploadBtn');
    var bgResetBtn = document.getElementById('bgResetBtn');
    var bgFileInput = document.getElementById('bgFileInput');
    var bgFits = document.getElementById('bgFits');
    var bgBlurRange = document.getElementById('bgBlurRange');
    var bgBlurValue = document.getElementById('bgBlurValue');
    var bgState = readJSON(BG_KEY, null);
    if (!bgState || typeof bgState !== 'object') bgState = null;

    function applyBg(cfg) {
        if (!bgLayer) return;
        if (!cfg || !cfg.img) {
            bgLayer.style.backgroundImage = '';
            bgLayer.style.backgroundRepeat = '';
            bgLayer.style.backgroundPosition = '';
            bgLayer.style.backgroundSize = '';
            bgLayer.style.filter = 'none';
            return;
        }
        var fit = cfg.fit || 'cover';
        bgLayer.style.backgroundImage = 'url("' + cfg.img + '")';
        bgLayer.style.backgroundRepeat = fit === 'repeat' ? 'repeat' : 'no-repeat';
        bgLayer.style.backgroundPosition = fit === 'repeat' ? 'top left' : 'center';
        bgLayer.style.backgroundSize =
            fit === 'stretch' ? '100% 100%' :
            fit === 'contain' ? 'contain' :
            fit === 'center' ? 'auto auto' : 'cover';
        var b = Math.max(0, Math.min(30, Number(cfg.blur) || 0));
        bgLayer.style.filter = b > 0 ? 'blur(' + b + 'px)' : 'none';
    }

    function persistBg() {
        if (bgState && bgState.img && bgState.img.length > BG_PERSIST_LIMIT) return; // 大图仅本次预览
        if (bgState) {
            writeJSON(BG_KEY, bgState);
        } else {
            try { localStorage.removeItem(BG_KEY); } catch (e) { /* 忽略 */ }
        }
    }

    function syncBgUi() {
        var fit = (bgState && bgState.fit) || 'cover';
        if (bgFits) {
            var opts = bgFits.querySelectorAll('.bg-opt');
            for (var i = 0; i < opts.length; i++) {
                opts[i].classList.toggle('active', opts[i].getAttribute('data-fit') === fit);
            }
        }
        var blur = bgState ? Math.max(0, Math.min(30, Number(bgState.blur) || 0)) : 0;
        if (bgBlurRange) bgBlurRange.value = blur;
        if (bgBlurValue) bgBlurValue.textContent = blur + 'px';
    }

    function openBgModal() {
        syncBgUi();
        lockScroll();
        bgModal.classList.add('active');
    }

    function closeBgModal() {
        bgModal.classList.remove('active');
        unlockScroll();
        resetModalPos(bgModal);
    }

    applyBg(bgState);

    if (bgModal && bgLayer && bgFileInput) {
        bgUploadBtn.addEventListener('click', function () {
            try { bgFileInput.value = ''; } catch (err) { /* 忽略 */ }
            bgFileInput.click();
        });

        bgFileInput.addEventListener('change', function () {
            var file = bgFileInput.files && bgFileInput.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function () {
                bgState = {
                    img: String(reader.result),
                    fit: (bgState && bgState.fit) || 'cover',
                    blur: bgState ? (Number(bgState.blur) || 0) : 0
                };
                applyBg(bgState);
                syncBgUi();
                persistBg();
            };
            reader.readAsDataURL(file);
        });

        bgFits.addEventListener('click', function (e) {
            var opt = e.target.closest ? e.target.closest('.bg-opt') : null;
            if (!opt || !bgState) return;
            bgState.fit = opt.getAttribute('data-fit');
            applyBg(bgState);
            syncBgUi();
            persistBg();
        });

        bgBlurRange.addEventListener('input', function () {
            if (!bgState) return;
            var v = Number(bgBlurRange.value);
            bgBlurValue.textContent = v + 'px';
            bgState.blur = v;
            applyBg(bgState);
        });
        bgBlurRange.addEventListener('change', persistBg);

        bgResetBtn.addEventListener('click', function () {
            bgState = null;
            applyBg(null);
            syncBgUi();
            persistBg();
        });

        // 点击遮罩 / 右上角关闭
        bgModal.addEventListener('click', function (e) {
            var closer = e.target.closest ? e.target.closest('[data-bg-close]') : null;
            if (closer) closeBgModal();
        });
    }

    // 点击页面空白背景区域打开背景弹窗（排除可交互元素）
    document.addEventListener('click', function (e) {
        if (!bgModal || bgModal.classList.contains('active')) return;
        var t = e.target;
        if (!t || !t.matches) return;
        if (t !== document.body && !t.matches('.page, .hero, .showcase, .slogan-section')) return;
        if (t.closest && t.closest('.edit-target, .edit-modal, .app-info, .phone-wrap, .feature-item, a, button, input, textarea, .icp, .custom-bg')) return;
        openBgModal();
    });

    // ---------- 模板背景图库（复用海报模板库 templates.js 数据） ----------
    var tplModal = document.getElementById('tplModal');
    var tplPickerBtn = document.getElementById('tplPickerBtn');
    var tplMonths = document.getElementById('tplMonths');
    var tplFestivals = document.getElementById('tplFestivals');
    var tplGrid = document.getElementById('tplGrid');
    var tplDataReady = false;
    var tplMonth = null;   // 当前选中月份（'1月'...）
    var tplFestival = null; // 当前选中节日筛选（null = 全部）

    function resolveTplImg(path) {
        // 优先走模板库的 CDN 解析（七牛/Cloudflare），失败退回本地相对路径
        if (window.imageConfig && typeof window.imageConfig.getImageUrl === 'function') {
            return window.imageConfig.getImageUrl(path);
        }
        return '../' + path;
    }

    function loadTplData(cb) {
        if (tplDataReady && window.templates) { cb(); return; }
        var s = document.createElement('script');
        s.src = '../templates.js?t=' + Date.now();
        s.onload = function () {
            tplDataReady = !!window.templates;
            cb();
        };
        s.onerror = function () {
            tplGrid.innerHTML = '<p class="bg-tip">模板数据加载失败，请稍后重试</p>';
        };
        document.head.appendChild(s);
    }

    function setActiveChip(container, chipClass, predicate) {
        var chips = container.querySelectorAll(chipClass);
        for (var i = 0; i < chips.length; i++) {
            chips[i].classList.toggle('active', predicate(chips[i]));
        }
    }

    // 将标签滚动到横向容器的水平居中位置（居中后前一个/后一个标签都可见）
    function centerChipInRow(container, chip, smooth) {
        if (!container || !chip || container.hidden) return;
        var cRect = container.getBoundingClientRect();
        var rRect = chip.getBoundingClientRect();
        if (!cRect.width || !rRect.width) return;
        var delta = (rRect.left + rRect.right) / 2 - (cRect.left + cRect.right) / 2;
        var target = container.scrollLeft + delta;
        if (target < 0) target = 0;
        if (smooth) {
            try { container.scrollTo({ left: target, behavior: 'smooth' }); return; } catch (e) { /* 旧 WebView 退化为瞬时滚动 */ }
        }
        container.scrollLeft = target;
    }

    // 标签顺序：早安、晚安置顶，其次 1-12 月，其余（如品牌日常）殿后
    function tplMonthOrder() {
        var keys = Object.keys(window.templates || {});
        var head = ['早安', '晚安'].filter(function (k) { return keys.indexOf(k) >= 0; });
        var months = keys.filter(function (k) { return /^\d+月$/.test(k); })
            .sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
        var rest = keys.filter(function (k) { return head.indexOf(k) < 0 && !/^\d+月$/.test(k); });
        return head.concat(months, rest);
    }

    // 早安/晚安/品牌日常等非月份分组按 type 分类筛选
    function tplIsTypeGroup(m) { return !!m && !/^\d+月$/.test(m); }

    // 节日日期表（2026 年）：智能定位用。农历/节气日期每年不同，跨年需更新此表；未收录节日回退到第一个标签
    var FESTIVAL_DATES = {
        '元旦': [2026, 1, 1], '小寒': [2026, 1, 5], '腊八节': [2026, 1, 27], '大寒': [2026, 1, 20],
        '小年': [2026, 2, 10], '立春': [2026, 2, 4], '除夕': [2026, 2, 16], '春节': [2026, 2, 17],
        '雨水': [2026, 2, 19], '元宵节': [2026, 3, 3], '元宵': [2026, 3, 3], '惊蛰': [2026, 3, 5],
        '妇女节': [2026, 3, 8], '女生节': [2026, 3, 7], '植树节': [2026, 3, 12], '春分': [2026, 3, 20],
        '清明节': [2026, 4, 5], '清明': [2026, 4, 5], '谷雨': [2026, 4, 20], '劳动节': [2026, 5, 1],
        '青年节': [2026, 5, 4], '立夏': [2026, 5, 5], '母亲节': [2026, 5, 10], '小满': [2026, 5, 21],
        '儿童节': [2026, 6, 1], '芒种': [2026, 6, 5], '端午节': [2026, 6, 19], '端午': [2026, 6, 19],
        '夏至': [2026, 6, 21], '父亲节': [2026, 6, 21], '建党节': [2026, 7, 1], '小暑': [2026, 7, 7],
        '大暑': [2026, 7, 23], '建军节': [2026, 8, 1], '立秋': [2026, 8, 7], '七夕': [2026, 8, 19],
        '处暑': [2026, 8, 23], '教师节': [2026, 9, 10], '白露': [2026, 9, 7], '秋分': [2026, 9, 23],
        '中秋节': [2026, 9, 25], '中秋': [2026, 9, 25], '国庆节': [2026, 10, 1], '寒露': [2026, 10, 8],
        '重阳节': [2026, 10, 18], '重阳': [2026, 10, 18], '霜降': [2026, 10, 23], '万圣节': [2026, 10, 31],
        '立冬': [2026, 11, 7], '双十一': [2026, 11, 11], '双11': [2026, 11, 11], '小雪': [2026, 11, 22],
        '感恩节': [2026, 11, 26], '大雪': [2026, 12, 7], '冬至': [2026, 12, 21], '平安夜': [2026, 12, 24],
        '圣诞节': [2026, 12, 25], '圣诞': [2026, 12, 25]
    };

    // 智能定位：当天是某节日则选它，否则选日期最近的节日（无日期数据的回退第一个）
    function smartPickFestival(monthKey) {
        var list = (window.templates || {})[monthKey] || [];
        var fests = [];
        list.forEach(function (t) {
            (t.festivals || []).forEach(function (f) {
                if (f && fests.indexOf(f) < 0) fests.push(f);
            });
        });
        if (!fests.length) return null;
        var now = new Date();
        var todayTs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        var best = null, bestDiff = Infinity, hitToday = false;
        fests.forEach(function (f) {
            var d = FESTIVAL_DATES[f];
            if (!d || d[0] !== now.getFullYear()) return;
            var ts = new Date(d[0], d[1] - 1, d[2]).getTime();
            var diff = Math.abs(ts - todayTs);
            var isToday = diff === 0;
            if (isToday && !hitToday) {
                best = f; bestDiff = 0; hitToday = true;
            } else if (!hitToday && diff < bestDiff) {
                best = f; bestDiff = diff;
            }
        });
        return best || fests[0];
    }

    function renderTplMonths() {
        tplMonths.innerHTML = '';
        tplMonthOrder().forEach(function (m) {
            var chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'tpl-month-chip';
            chip.textContent = m;
            chip.addEventListener('click', function () {
                tplMonth = m;
                tplFestival = null;
                setActiveChip(tplMonths, '.tpl-month-chip', function (c) { return c.textContent === tplMonth; });
                centerChipInRow(tplMonths, chip, true);
                renderTplFestivals();
                renderTplGrid();
            });
            tplMonths.appendChild(chip);
        });
        setActiveChip(tplMonths, '.tpl-month-chip', function (c) { return c.textContent === tplMonth; });
        centerChipInRow(tplMonths, tplMonths.querySelector('.tpl-month-chip.active'), true);
    }

    function renderTplFestivals() {
        tplFestivals.innerHTML = '';
        var isType = tplIsTypeGroup(tplMonth);
        var list = (window.templates || {})[tplMonth] || [];
        var tags = [];
        if (isType) {
            // 类型分组（早安/晚安等）：展示该组所有 type
            list.forEach(function (t) {
                if (t.type && tags.indexOf(t.type) < 0) tags.push(t.type);
            });
        } else {
            list.forEach(function (t) {
                (t.festivals || []).forEach(function (f) {
                    if (f && tags.indexOf(f) < 0) tags.push(f);
                });
            });
        }
        if (!tags.length) { tplFestivals.hidden = true; tplFestival = null; return; }
        tplFestivals.hidden = false;
        // 默认定位：类型组停第一个；月份组智能定位（当天节日优先，其次最近，无数据则第一个）
        if (!tplFestival || tags.indexOf(tplFestival) < 0) {
            tplFestival = isType ? tags[0] : smartPickFestival(tplMonth);
        }
        tags.forEach(function (tag) {
            var chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'tpl-festival-chip';
            chip.textContent = tag;
            chip.addEventListener('click', function () {
                tplFestival = tag;
                setActiveChip(tplFestivals, '.tpl-festival-chip', function (c) { return c.textContent === tplFestival; });
                centerChipInRow(tplFestivals, chip, true);
                renderTplGrid();
            });
            tplFestivals.appendChild(chip);
        });
        setActiveChip(tplFestivals, '.tpl-festival-chip', function (c) { return c.textContent === tplFestival; });
        centerChipInRow(tplFestivals, tplFestivals.querySelector('.tpl-festival-chip.active'), true);
    }

    function renderTplGrid() {
        var list = (window.templates || {})[tplMonth] || [];
        var isType = tplIsTypeGroup(tplMonth);
        if (tplFestival) {
            list = list.filter(function (t) {
                return isType ? t.type === tplFestival : (t.festivals || []).indexOf(tplFestival) >= 0;
            });
        }
        tplGrid.innerHTML = '';
        if (!list.length) {
            tplGrid.innerHTML = '<p class="bg-tip">该筛选条件下暂无模板</p>';
            return;
        }
        list.forEach(function (t) {
            var item = document.createElement('button');
            item.type = 'button';
            item.className = 'tpl-item';
            item.setAttribute('aria-label', t.name || '模板图');
            var img = document.createElement('img');
            img.loading = 'lazy';
            img.src = resolveTplImg(t.image);
            img.alt = t.name || '模板图';
            item.appendChild(img);
            item.addEventListener('click', function () {
                // 设为推广页背景（URL 字符串很小，可放心持久化），随后回到背景弹窗继续调虚化
                bgState = {
                    img: resolveTplImg(t.image),
                    fit: (bgState && bgState.fit) || 'cover',
                    blur: bgState ? (Number(bgState.blur) || 0) : 0
                };
                applyBg(bgState);
                persistBg();
                closeTplModal();
                openBgModal();
            });
            tplGrid.appendChild(item);
        });
    }

    // 每次打开图库：自动定位当前月份（非月份分组回退第一项），节日标签由 renderTplFestivals 智能定位
    function smartLocateMonth() {
        var now = new Date();
        var key = (now.getMonth() + 1) + '月';
        if (!(window.templates || {})[key]) key = tplMonthOrder()[0] || null;
        tplMonth = key;
        tplFestival = null;
    }

    function openTplModal() {
        closeBgModal();
        lockScroll();
        tplModal.classList.add('active');
        tplGrid.innerHTML = '<p class="bg-tip">模板数据加载中...</p>';
        loadTplData(function () {
            smartLocateMonth();
            if (!tplMonths.childNodes.length) renderTplMonths();
            else setActiveChip(tplMonths, '.tpl-month-chip', function (c) { return c.textContent === tplMonth; });
            renderTplFestivals();
            renderTplGrid();
        });
    }

    function closeTplModal() {
        tplModal.classList.remove('active');
        unlockScroll();
        resetModalPos(tplModal);
    }

    if (tplModal && tplPickerBtn) {
        tplPickerBtn.addEventListener('click', openTplModal);
        tplModal.addEventListener('click', function (e) {
            var closer = e.target.closest ? e.target.closest('[data-tpl-close]') : null;
            if (closer) {
                closeTplModal();
                openBgModal(); // 从背景弹窗进来，取消选择时回到背景弹窗
            }
        });
    }

    // ---------- 弹窗拖动：按住标题栏可移动整个弹窗，方便实时查看页面效果 ----------
    function resetModalPos(modal) {
        if (!modal) return;
        var card = modal.querySelector('.edit-modal-card');
        if (!card) return;
        card.classList.remove('free-pos', 'dragging');
        card.style.removeProperty('position');
        card.style.removeProperty('left');
        card.style.removeProperty('top');
        card.style.removeProperty('margin');
    }

    function makeModalDraggable(modal) {
        if (!modal) return;
        var card = modal.querySelector('.edit-modal-card');
        var head = modal.querySelector('.edit-modal-head');
        if (!card || !head) return;
        var dragging = false, startX = 0, startY = 0, baseLeft = 0, baseTop = 0, pid = null;

        function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

        function beginDrag(x, y) {
            var rect = card.getBoundingClientRect();
            card.classList.add('free-pos');
            card.style.position = 'fixed';
            card.style.margin = '0';
            card.style.left = rect.left + 'px';
            card.style.top = rect.top + 'px';
            baseLeft = rect.left;
            baseTop = rect.top;
            startX = x;
            startY = y;
            dragging = true;
            card.classList.add('dragging');
        }

        function moveDrag(x, y) {
            if (!dragging) return;
            var w = card.offsetWidth, h = card.offsetHeight;
            var left = clamp(baseLeft + x - startX, 60 - w, window.innerWidth - 60);
            var top = clamp(baseTop + y - startY, 0, window.innerHeight - 40);
            card.style.left = left + 'px';
            card.style.top = top + 'px';
        }

        function endDrag() {
            dragging = false;
            card.classList.remove('dragging');
        }

        head.addEventListener('pointerdown', function (e) {
            if (e.target.closest && e.target.closest('.edit-modal-close')) return; // 关闭按钮不触发拖动
            pid = e.pointerId;
            beginDrag(e.clientX, e.clientY);
            try { head.setPointerCapture(pid); } catch (err) { /* 忽略捕获失败 */ }
            e.preventDefault();
        });
        head.addEventListener('pointermove', function (e) {
            if (dragging && e.pointerId === pid) moveDrag(e.clientX, e.clientY);
        });
        head.addEventListener('pointerup', endDrag);
        head.addEventListener('pointercancel', endDrag);

        // 兼容不支持 PointerEvent 的旧 WebView
        if (!window.PointerEvent) {
            head.addEventListener('touchstart', function (e) {
                var t = e.touches[0];
                beginDrag(t.clientX, t.clientY);
                e.preventDefault();
            }, { passive: false });
            head.addEventListener('touchmove', function (e) {
                var t = e.touches[0];
                moveDrag(t.clientX, t.clientY);
                e.preventDefault();
            }, { passive: false });
            head.addEventListener('touchend', endDrag);
            head.addEventListener('mousedown', function (e) {
                if (e.target.closest && e.target.closest('.edit-modal-close')) return;
                beginDrag(e.clientX, e.clientY);
                e.preventDefault();
            });
            document.addEventListener('mousemove', function (e) { moveDrag(e.clientX, e.clientY); });
            document.addEventListener('mouseup', endDrag);
        }
    }

    makeModalDraggable(editModal);
    makeModalDraggable(bgModal);
    makeModalDraggable(tplModal);
    makeModalDraggable(logoModal);

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (bgModal && bgModal.classList.contains('active')) closeBgModal();
        if (tplModal && tplModal.classList.contains('active')) closeTplModal();
        if (logoModal && logoModal.classList.contains('active')) closeLogoModal();
    });
})();
