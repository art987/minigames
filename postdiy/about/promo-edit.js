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
    var VIDEO_KEY = 'promoEdit.video.v1';      // 上传的视频（仅小文件以 dataURL 形式存储）
    var VIDEO_PERSIST_LIMIT = 3 * 1024 * 1024; // 超过 3MB 的视频超出 localStorage 配额，仅本次预览
    var HISTORY_MAX = 20;

    // 可编辑元素配置
    var CONFIG = [
        { key: 'heroTitle', selector: '.hero-title', label: '主标题', min: 20, max: 72 },
        { key: 'heroSub', selector: '.hero-subtitle', label: '副标题', min: 12, max: 48 },
        { key: 'slogan', selector: '.slogan', label: '口号', min: 14, max: 48 }
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
        snapshot = saved ? { text: saved.text, size: typeof saved.size === 'number' ? saved.size : null } : null;

        var cfg = item.cfg;
        modalTitle.textContent = '编辑' + cfg.label;
        sizeRange.min = cfg.min;
        sizeRange.max = cfg.max;

        var currentSize = parseFloat(window.getComputedStyle(item.el).fontSize) || cfg.min;
        textArea.value = item.el.textContent;
        sizeRange.value = currentSize;
        sizeValue.textContent = Math.round(currentSize) + 'px';
        saveBtn.disabled = textArea.value.trim().length === 0;

        renderHistory(key);
        lockScroll();
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        unlockScroll();
        currentKey = null;
        snapshot = null;
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
        var list = historyData[currentKey] || [];
        var last = list[0];
        if (!last || last.text !== text || last.size !== size) {
            list.unshift({ text: text, size: size, time: Date.now() });
            if (list.length > HISTORY_MAX) list.length = HISTORY_MAX;
        }
        historyData[currentKey] = list;
        writeJSON(STATE_KEY, state);
        writeJSON(HISTORY_KEY, historyData);

        snapshot = { text: text, size: size };
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

    // ---------- 视频上传（入口：点击 App logo；长按 logo 移除已上传视频） ----------
    var video = document.querySelector('.screen-video');
    var logoImg = document.querySelector('.app-logo img');
    var fileInput = document.getElementById('editVideoInput');
    var LONG_PRESS_MS = 1000; // 长按 1 秒：移除已上传视频
    var longPressTimer = null;
    var longPressFired = false;

    function setVideoActive(active) {
        if (!video) return;
        // 无视频时视频层放行点击给下层嵌套网页；有视频时由视频层接管
        video.style.pointerEvents = active ? 'auto' : 'none';
    }

    function playVideoSource(src) {
        if (!video || !src) return;
        video.src = src;
        video.load();
        var p = video.play();
        if (p && typeof p.catch === 'function') p.catch(function () { /* 自动播放被拦截时忽略 */ });
    }

    // 移除已上传/正在播放的视频，还原为嵌套网页
    function removeVideo() {
        if (!video) return;
        try { localStorage.removeItem(VIDEO_KEY); } catch (e) { /* 忽略 */ }
        var sources = video.querySelectorAll('source');
        for (var i = 0; i < sources.length; i++) {
            if (sources[i].parentNode) sources[i].parentNode.removeChild(sources[i]);
        }
        video.removeAttribute('src');
        try { video.load(); } catch (e) { /* 忽略 */ }
        setVideoActive(false);
    }

    function startLongPress() {
        clearLongPress();
        longPressFired = false;
        longPressTimer = setTimeout(function () {
            longPressTimer = null;
            longPressFired = true;
            removeVideo();
        }, LONG_PRESS_MS);
    }

    function clearLongPress() {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    }

    if (video) {
        // 默认 <source> 视频文件真正出画面时，视为"有视频"
        video.addEventListener('loadeddata', function () {
            setVideoActive(true);
        });
    }

    if (logoImg && fileInput) {
        // 点击 logo：选择本地视频上传播放
        logoImg.addEventListener('click', function () {
            if (longPressFired) { longPressFired = false; return; }
            try { fileInput.value = ''; } catch (err) { /* 忽略 */ }
            fileInput.click();
        });

        // 长按 logo：移除视频还原嵌套网页（支持触摸与鼠标）
        logoImg.addEventListener('mousedown', startLongPress);
        logoImg.addEventListener('mouseup', clearLongPress);
        logoImg.addEventListener('mouseleave', clearLongPress);
        logoImg.addEventListener('touchstart', startLongPress, { passive: true });
        logoImg.addEventListener('touchend', clearLongPress);
        logoImg.addEventListener('touchmove', clearLongPress);
        logoImg.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    }

    if (video && fileInput) {
        fileInput.addEventListener('change', function () {
            var file = fileInput.files && fileInput.files[0];
            if (!file) return;
            playVideoSource(URL.createObjectURL(file));
            setVideoActive(true);
            if (file.size <= VIDEO_PERSIST_LIMIT) {
                // 小视频以 dataURL 存入 localStorage，刷新后仍可回放
                var reader = new FileReader();
                reader.onload = function () {
                    try { localStorage.setItem(VIDEO_KEY, reader.result); } catch (e) { /* 配额不足则忽略 */ }
                };
                reader.readAsDataURL(file);
            } else {
                try { localStorage.removeItem(VIDEO_KEY); } catch (e) { /* 忽略 */ }
            }
        });

        // 恢复上次上传的小视频
        var savedVideo = '';
        try { savedVideo = localStorage.getItem(VIDEO_KEY) || ''; } catch (e) { /* 忽略 */ }
        if (savedVideo) {
            playVideoSource(savedVideo);
            setVideoActive(true);
        }
    }
})();
