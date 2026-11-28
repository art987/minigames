/**
 * 价签工坊 - 应用逻辑
 * 交互全部走弹窗：选行业 → 选模板 → 编辑商品信息（多卡片，可复制）；
 * 预览区为 DOM 价签幻灯片，每条商品一张，可左右切换；下载时才栅格化。
 */
(function () {
  'use strict';

  // ============================================================
  // 调试开关：模板参数可视化调整工具
  //   true  = 开启（点价签文字可调字体/字号/粗细/颜色/位置，生成 CSS）
  //   false = 关闭（调完模板后改这里即可彻底关闭）
  // ============================================================
  const DEBUG_MODE = true;

  const STORAGE_KEY = 'priceMakerStateV2';

  // ============================================================
  // 多模式管理（价格标签 / 二维码展示牌）
  //   模式定义在 templates.js 的 window.TMPL_MODES；
  //   首次进入弹出模式选择层，之后可点顶栏徽标重新选择；
  //   选择结果存 localStorage，记住上次使用模式。
  // ============================================================
  const MODE_KEY = 'tmplmakerMode';
  let currentMode = 'price';

  function modeConfig(id) {
    const modes = window.TMPL_MODES || {};
    return modes[id] || modes.price;
  }

  function loadSavedMode() {
    try { return localStorage.getItem(MODE_KEY) || ''; } catch (e) { return ''; }
  }

  function renderModeCards() {
    const box = $('modeCards');
    if (!box || !window.TMPL_MODES) return;
    box.innerHTML = '';
    Object.keys(window.TMPL_MODES).forEach(function (id) {
      const m = window.TMPL_MODES[id];
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'mode-card';
      card.innerHTML = '<span class="mc-emoji">' + m.emoji + '</span>'
        + '<div class="mc-label">' + m.label + '</div>'
        + '<div class="mc-desc">' + m.desc + '</div>';
      card.addEventListener('click', function () { applyMode(id, true); });
      box.appendChild(card);
    });
  }

  /** 切换模式：更新徽标文案；remember=true 时写入 localStorage */
  let booted = false;
  function applyMode(id, remember) {
    const switching = booted && id !== currentMode;
    if (switching) saveState(); // 先把当前模式数据写回它自己的 key
    currentMode = (window.TMPL_MODES && window.TMPL_MODES[id]) ? id : 'price';
    if (remember) {
      try { localStorage.setItem(MODE_KEY, currentMode); } catch (e) { /* 忽略 */ }
    }
    const m = modeConfig(currentMode);
    const emoji = $('modeBadgeEmoji');
    const label = $('modeBadgeLabel');
    if (emoji) emoji.textContent = m.emoji;
    if (label) label.textContent = m.label;
    // 渲染引擎同步模式（决定渲染价格区还是二维码区）
    if (window.TMPLRender && window.TMPLRender.setMode) window.TMPLRender.setMode(currentMode);
    hideModeSelect();
    if (switching) {
      // 载入新模式自己的数据；没有则给默认商品
      if (!loadState()) {
        state.industry = 'common';
        state.templateId = 'G01';
        state.products = [defaultProduct()];
        state.index = 0;
      }
      applyModeText();
      rebuildSlides(true);
      renderProductList();
    }
  }

  /** 按当前模式刷新界面文案（按钮/弹窗标题/导出前缀） */
  function applyModeText() {
    const m = modeConfig(currentMode);
    if ($('btnAddQuick')) $('btnAddQuick').textContent = m.addBtn;
    if ($('btnManage')) $('btnManage').textContent = m.manageBtn;
    if ($('btnAddDraft')) $('btnAddDraft').textContent = '＋ ' + m.addBtn;
    if ($('btnAddProduct')) $('btnAddProduct').textContent = '＋ ' + m.addBtn;
    if ($('modalAddTitle')) $('modalAddTitle').textContent = m.addModalTitle;
    if ($('modalProductsTitle')) $('modalProductsTitle').textContent = m.manageBtn;
    if ($('qaManage')) $('qaManage').textContent = m.manageBtn;
  }

  function showModeSelect() {
    const ov = $('modeSelect');
    if (ov) ov.hidden = false;
  }
  function hideModeSelect() {
    const ov = $('modeSelect');
    if (ov) ov.hidden = true;
  }

  // ---------- 状态 ----------
  // 各模式数据各存各的：价格标签用 priceMakerStateV2，二维码牌用 qrMakerStateV1
  const STORAGE_KEYS = { price: 'priceMakerStateV2', qr: 'qrMakerStateV1' };
  function stateKey() { return STORAGE_KEYS[currentMode] || STORAGE_KEYS.price; }

  let state = {
    industry: 'common',
    templateId: 'G01',
    products: [],
    index: 0
  };

  function defaultProduct() {
    if (currentMode === 'qr') {
      return { id: uid(), name: '店铺名称', price: '', unit: '', qr: '', slogan: '' };
    }
    return {
      id: uid(),
      name: '新鲜蔬菜',
      price: '3.5',
      unit: '元/斤',
      qr: '',
      slogan: ''
    };
  }

  let uidSeed = Date.now();
  function uid() { return 'p' + (uidSeed++).toString(36); }

  function loadState() {
    try {
      const raw = localStorage.getItem(stateKey());
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (!saved || !Array.isArray(saved.products) || !saved.products.length) return false;
      if (!window.TMPLRender.tplById(saved.templateId)) return false;
      state.industry = saved.industry || 'common';
      state.templateId = saved.templateId;
      state.products = saved.products.map(function (p) {
        return {
          id: p.id || uid(),
          name: String(p.name || ''),
          price: String(p.price || ''),
          unit: String(p.unit || ''),
          qr: String(p.qr || ''),
          slogan: String(p.slogan || '')
        };
      });
      state.index = Math.min(saved.index || 0, state.products.length - 1);
      return true;
    } catch (e) { return false; }
  }

  function saveState() {
    try { localStorage.setItem(stateKey(), JSON.stringify(state)); } catch (e) { /* 忽略 */ }
  }

  // ---------- DOM ----------
  const $ = function (id) { return document.getElementById(id); };
  const stage = $('stage');
  const slideFrame = $('slideFrame');
  const slides = $('slides');
  const dots = $('dots');
  const pageInfo = $('pageInfo');
  const btnPrev = $('btnPrev');
  const btnNext = $('btnNext');
  const toast = $('toast');

  // ---------- Toast ----------
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  // ---------- 弹窗 ----------
  function openModal(el) { el.classList.add('open'); }
  function closeModal(el) { el.classList.remove('open'); }

  function bindModalDismiss(modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal(modal);
    });
    modal.querySelectorAll('[data-close]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeModal(modal); });
    });
  }

  // ---------- 行业弹窗 ----------
  function renderIndustryModal() {
    const grid = $('industryGrid');
    grid.innerHTML = '';
    window.TMPL_INDUSTRIES.forEach(function (ind) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'industry-item' + (ind.id === state.industry ? ' active' : '');
      btn.disabled = !ind.enabled;
      btn.innerHTML =
        '<span class="i-emoji">' + ind.emoji + '</span>' +
        '<span class="i-label">' + ind.label + '</span>';
      if (ind.enabled) {
        btn.addEventListener('click', function () {
          state.industry = ind.id;
          saveState();
          closeModal($('modalIndustry'));
          openTemplateModal();
        });
      }
      grid.appendChild(btn);
    });
  }

  // ---------- 模板弹窗（缩略图带示范文字，底部选择按钮） ----------
  function renderTemplateModal() {
    // 站点加载优化：先把当前行业全部模板 CSS 按需加载完，再渲染缩略图
    const list0 = window.TMPL_TEMPLATES.filter(function (t) { return t.industry === state.industry; });
    return ensureTemplateCssAll(list0.map(function (t) { return t.id; })).then(function () {
      const grid = $('templateGrid');
      grid.innerHTML = '';
      $('curIndustry').textContent = industryLabel(state.industry);
      list0.forEach(function (t) {
        const card = document.createElement('div');
        card.className = 'template-card' + (t.id === state.templateId ? ' active' : '');
        // 整卡可点：点击任意位置即选中模板并关闭弹窗
        card.addEventListener('click', function () {
          const changed = state.templateId !== t.id;
          state.templateId = t.id;
          saveState();
          if (changed) rebuildSlides(true);
          closeModal($('modalTemplate'));
          showToast('已使用模板 ' + t.id + ' ' + t.title);
        });

        const label = document.createElement('span');
        label.className = 't-name';
        label.textContent = t.id + ' ' + t.title;

        // 缩略预览：按该模板 CSS 渲染示范文字（小尺寸），数据按当前模式给
        const previewData = currentMode === 'qr'
          ? { name: '店铺名称', qr: '' }
          : { name: '商品名称', price: '9.9', unit: '元/个' };
        const preview = document.createElement('div');
        preview.className = 'tpl-preview';
        preview.appendChild(window.TMPLRender.buildTag(t, previewData));

        // 背景图懒加载：滚到可视区附近才请求该模板背景
        const tagEl = preview.querySelector('.ptag');
        if (tagEl && lazyBgObserver) {
          tagEl.dataset.bg = t.bg;
          tagEl.style.backgroundImage = 'none';
          lazyBgObserver.observe(tagEl);
        }

        card.appendChild(label);
        card.appendChild(preview);
        grid.appendChild(card);
      });
      sizeModalTags();
    });
  }

  /** 给弹窗里的缩略价签按容器宽设置 --mm 并自适应字号 */
  function sizeModalTags() {
    $('templateGrid').querySelectorAll('.tpl-preview').forEach(function (pv) {
      const tag = pv.querySelector('.ptag');
      const w = pv.clientWidth;
      if (!tag || !w) return;
      tag.style.width = w + 'px';
      tag.style.height = (w * 297 / 210) + 'px';
      tag.style.setProperty('--mm', (w / 210) + 'px');
      window.TMPLRender.fitTag(tag);
    });
  }

  function openTemplateModal() {
    renderTemplateModal().then(function () {
      openModal($('modalTemplate'));
      requestAnimationFrame(sizeModalTags);
    });
  }

  function industryLabel(id) {
    const ind = window.TMPL_INDUSTRIES.find(function (i) { return i.id === id; });
    return ind ? (ind.emoji ? ind.emoji + ' ' : '') + ind.label : '';
  }

  // ---------- 模板切换（当前行业内循环） ----------
  function industryTemplates() {
    return window.TMPL_TEMPLATES.filter(function (t) { return t.industry === state.industry; });
  }

  function switchTemplate(dir) {
    const list = industryTemplates();
    let i = list.findIndex(function (t) { return t.id === state.templateId; });
    i = (i + dir + list.length) % list.length;
    state.templateId = list[i].id;
    saveState();
    rebuildSlides(true);
    showToast('已切换到 ' + list[i].id + ' ' + list[i].title);
  }

  // ---------- 商品弹窗（卡片内联编辑，自动保存） ----------
  function sanitizePrice(raw) {
    let v = raw.replace(/[^\d.]/g, '');
    const parts = v.split('.');
    if (parts.length > 2) v = parts[0] + '.' + parts.slice(1).join('');
    if (parts[0] && parts[0].length > 6) v = parts[0].slice(0, 6) + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
    if (parts[1] && parts[1].length > 2) v = parts[0] + '.' + parts[1].slice(0, 2);
    return v;
  }

  let previewTimer = null;
  function schedulePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(function () { rebuildSlides(true); }, 250);
  }

  function opBtn(icon, title, onClick, extraCls) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'op-btn' + (extraCls ? ' ' + extraCls : '');
    b.title = title;
    b.textContent = icon;
    b.addEventListener('click', onClick);
    return b;
  }

  /**
   * 计价单位字段：下拉选择，最后一项「自定义…」选中后变成输入框。
   * 历史自定义值（如 元/筐）会作为普通选项出现在下拉里，避免卡片展示成输入模式。
   */
  function buildUnitField(p) {
    const presets = window.TMPL_UNITS;

    const wrap = document.createElement('div');
    wrap.className = 'pc-field';

    const sel = document.createElement('select');
    presets.forEach(function (v) {
      const o = document.createElement('option');
      o.value = v; o.textContent = v;
      sel.appendChild(o);
    });
    const oc = document.createElement('option');
    oc.value = '__custom__'; oc.textContent = '自定义…';
    sel.appendChild(oc);
    // 自定义但历史保存过的值：直接作为选项展示
    if (p.unit && presets.indexOf(p.unit) < 0) {
      const oh = document.createElement('option');
      oh.value = p.unit; oh.textContent = p.unit;
      sel.insertBefore(oh, oc);
      sel.value = p.unit;
    } else {
      sel.value = p.unit || presets[0];
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 6;
    input.placeholder = '输入自定义单位';
    input.value = p.unit;
    input.classList.add('hidden');

    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'pc-back hidden';
    back.title = '返回预设列表';
    back.textContent = '↩';

    sel.addEventListener('change', function () {
      if (sel.value === '__custom__') {
        input.classList.remove('hidden');
        back.classList.remove('hidden');
        sel.classList.add('hidden');
        input.focus();
      } else {
        p.unit = sel.value;
        saveState();
        schedulePreview();
      }
    });
    input.addEventListener('input', function () {
      p.unit = input.value;
      saveState();
      schedulePreview();
    });
    back.addEventListener('click', function () {
      p.unit = presets[0];
      input.classList.add('hidden');
      back.classList.add('hidden');
      sel.classList.remove('hidden');
      sel.value = presets[0];
      saveState();
      schedulePreview();
    });

    wrap.appendChild(sel);
    wrap.appendChild(input);
    wrap.appendChild(back);
    return wrap;
  }

  // ==================== 通用数字键盘（所有价格输入框共用） ====================
  // 输入先落在键盘顶部的小显示屏里，按"确定"才通过 applyFn 写回
  const numKey = $('numKey');
  let nkBuf = '';
  let nkAnchor = null;   // 当前触发的输入框
  let nkApply = null;    // function(v) 确定时的写回逻辑
  function nkRender() {
    $('nkDisplay').textContent = nkBuf === '' ? '0' : nkBuf;
  }
  function hideNumKey() { numKey.classList.add('hidden'); }
  function openNumKey(anchorEl, applyFn) {
    // 每次打开键盘都从空开始，用户直接输入新数值，不用先删旧的
    nkBuf = '';
    nkApply = applyFn;
    nkAnchor = anchorEl;
    nkRender();
    numKey.classList.remove('hidden');
    const r = anchorEl.getBoundingClientRect();
    const kw = numKey.offsetWidth || 240;
    const kh = numKey.offsetHeight || 380;
    let left = Math.max(8, Math.min(r.left, window.innerWidth - kw - 8));
    let top = r.bottom + 8;
    if (top + kh > window.innerHeight - 8) top = Math.max(8, r.top - kh - 8);
    numKey.style.left = left + 'px';
    numKey.style.top = top + 'px';
  }
  numKey.querySelectorAll('.nk-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const k = btn.getAttribute('data-k');
      if (k === 'del') {
        nkBuf = nkBuf.slice(0, -1);
      } else if (k === '.') {
        if (nkBuf.indexOf('.') >= 0) return;
        nkBuf = nkBuf === '' ? '0.' : nkBuf + '.';
      } else {
        if (nkBuf.replace('.', '').length >= 6) return; // 最多 6 位数字
        nkBuf += k;
      }
      nkRender();
    });
  });
  // "确定"：把显示屏上的最终数字写回
  $('nkOk').addEventListener('click', function () {
    if (nkApply) nkApply(nkBuf);
    hideNumKey();
  });
  // "清空"：只清显示屏，按确定才生效
  $('nkClear').addEventListener('click', function () {
    nkBuf = '';
    nkRender();
  });
  // 点键盘和触发框以外的地方收起键盘
  document.addEventListener('mousedown', function (e) {
    if (numKey.classList.contains('hidden')) return;
    if (numKey.contains(e.target)) return;
    if (nkAnchor && (e.target === nkAnchor || nkAnchor.contains(e.target))) return;
    hideNumKey();
  });

  // ==================== 通用单位九宫格（所有计量单位共用） ====================
  const unitKey = $('unitKey');
  let ukAnchor = null;   // 当前触发的单位框（用于定位 + 判定外点）
  let ukApply = null;    // function(u) 选中后的写回逻辑
  function hideUnitKey() { unitKey.classList.add('hidden'); }
  function openUnitKey(anchorEl, applyFn) {
    $('ukCustomRow').classList.add('hidden');
    $('ukCustomInput').value = '';
    ukAnchor = anchorEl;
    ukApply = applyFn;
    unitKey.classList.remove('hidden');
    const r = anchorEl.getBoundingClientRect();
    const kw = unitKey.offsetWidth || 240;
    const kh = unitKey.offsetHeight || 180;
    let left = Math.max(8, Math.min(r.left, window.innerWidth - kw - 8));
    // 默认弹在单位框上方；顶部放不下时才翻到下方
    let top = r.top - kh - 8;
    if (top < 8) top = r.bottom + 8;
    unitKey.style.left = left + 'px';
    unitKey.style.top = top + 'px';
  }
  unitKey.querySelectorAll('.uk-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const u = btn.getAttribute('data-u');
      if (u === '__custom__') {
        // 自定义：九宫格下方展开输入行
        $('ukCustomRow').classList.remove('hidden');
        $('ukCustomInput').focus();
        return;
      }
      if (ukApply) ukApply(u);
      hideUnitKey();
    });
  });
  // 自定义单位：点确定写回
  $('ukCustomOk').addEventListener('click', function () {
    const v = $('ukCustomInput').value.trim();
    if (v && ukApply) ukApply(v);
    hideUnitKey();
  });
  $('ukCustomInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') $('ukCustomOk').click();
  });
  // 点九宫格和触发框以外的地方收起
  document.addEventListener('mousedown', function (e) {
    if (unitKey.classList.contains('hidden')) return;
    if (unitKey.contains(e.target)) return;
    if (ukAnchor && (ukAnchor === e.target || ukAnchor.contains(e.target))) return;
    hideUnitKey();
  });

  // 单位写回的通用逻辑：更新数据 + 重建单位框显示（自定义值会作为选项展示）
  function applyUnit(wrap, obj, u) {
    if (!obj) return;
    obj.unit = u;
    wrap.innerHTML = '';
    wrap.appendChild(buildUnitField(obj));
    saveState();
    schedulePreview();
  }

  /** 构建商品编辑卡片（商品管理弹窗与添加商品弹窗共用） */
  function buildProductCard(p, idx, onCopy, onDelete) {
    const card = document.createElement('div');
    card.className = 'p-card';
    card.dataset.id = p.id;

    // 序号角标
    const badge = document.createElement('div');
    badge.className = 'p-card-num';
    badge.textContent = idx + 1;
    card.appendChild(badge);

    // 行1：名称 + 价格 + 计价单位
    const grid = document.createElement('div');
    grid.className = 'p-grid';

    // 名称输入框 + 右侧小圆叉清空按钮
    const nameWrap = document.createElement('div');
    nameWrap.className = 'p-name-wrap';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.maxLength = 15;
    nameInput.placeholder = currentMode === 'qr' ? '店铺名称' : '商品名称';
    nameInput.value = p.name;
    const nameClear = document.createElement('button');
    nameClear.type = 'button';
    nameClear.className = 'eo-clear';
    nameClear.title = '清空';
    nameClear.textContent = '×';
    nameClear.classList.toggle('hidden', !(p.name || '').length);
    nameClear.addEventListener('click', function () {
      p.name = '';
      nameInput.value = '';
      nameClear.classList.add('hidden');
      saveState();
      schedulePreview();
      nameInput.focus();
    });
    nameInput.addEventListener('input', function () {
      p.name = nameInput.value;
      nameClear.classList.toggle('hidden', !nameInput.value.length);
      saveState();
      schedulePreview();
    });
    nameWrap.appendChild(nameInput);
    nameWrap.appendChild(nameClear);

    if (currentMode === 'qr') {
      // 二维码展示牌：价格/单位区域替换为二维码上传字段（占 2-3 列）
      grid.appendChild(nameWrap);
      grid.appendChild(buildQrField(p));
      // 店铺宣传口号：可从 6 个预设选择或自定义（独占一行）
      grid.appendChild(buildSloganField(p));
    } else {
      // 价格输入框：只读，点击弹数字键盘（确认才写回）
      const priceInput = document.createElement('input');
      priceInput.type = 'text';
      priceInput.inputMode = 'decimal';
      priceInput.placeholder = '价格';
      priceInput.value = p.price;
      priceInput.readOnly = true;
      priceInput.className = 'p-price';
      priceInput.addEventListener('click', function () {
        openNumKey(priceInput, function (v) {
          p.price = v;
          priceInput.value = v;
          saveState();
          schedulePreview();
        });
      });

      // 计量单位：点击弹九宫格（替代原生下拉）
      const unitWrap = buildUnitField(p);
      unitWrap.classList.add('p-unit');
      unitWrap.addEventListener('click', function () {
        openUnitKey(unitWrap, function (u) {
          applyUnit(unitWrap, p, u);
        });
      });

      grid.appendChild(nameWrap);
      grid.appendChild(priceInput);
      grid.appendChild(unitWrap);
    }

    // 行2：复制 / 删除（靠右）
    const row = document.createElement('div');
    row.className = 'p-row';

    const ops = document.createElement('div');
    ops.className = 'p-ops';
    ops.appendChild(opBtn('复制', '复制这条商品', onCopy));
    ops.appendChild(opBtn('删除', '删除这条商品', onDelete, 'danger'));

    row.appendChild(ops);
    card.appendChild(grid);
    card.appendChild(row);
    return card;
  }

  /** qr 模式商品卡：二维码上传/预览/更换/删除字段（替代价格与单位输入） */
  function buildQrField(p) {
    const wrap = document.createElement('div');
    wrap.className = 'p-qr-wrap';
    wrap.classList.toggle('has-img', !!p.qr);

    const pick = document.createElement('button');
    pick.type = 'button';
    pick.className = 'p-qr-field';

    const img = document.createElement('img');
    img.className = 'p-qr-img';
    img.alt = '二维码';
    if (p.qr) img.src = p.qr; else img.classList.add('hidden');

    const txt = document.createElement('span');
    txt.className = 'p-qr-txt';
    txt.textContent = p.qr ? '已上传 · 点击更换' : '＋ 上传二维码图片';

    pick.appendChild(img);
    pick.appendChild(txt);
    pick.addEventListener('click', function () {
      pickQrImage(function (dataUrl) {
        p.qr = dataUrl;
        img.src = dataUrl;
        img.classList.remove('hidden');
        txt.textContent = '已上传 · 点击更换';
        wrap.classList.add('has-img');
        saveState();
        schedulePreview();
        showToast('二维码已上传');
      });
    });

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'p-qr-del' + (p.qr ? '' : ' hidden');
    del.textContent = '删除';
    del.title = '移除二维码';
    del.addEventListener('click', function () {
      p.qr = '';
      img.removeAttribute('src');
      img.classList.add('hidden');
      txt.textContent = '＋ 上传二维码图片';
      del.classList.add('hidden');
      wrap.classList.remove('has-img');
      saveState();
      schedulePreview();
    });

    wrap.appendChild(pick);
    wrap.appendChild(del);
    return wrap;
  }

  /** 选择图片 → 裁剪成正方形 → 输出 800×800 PNG dataURL */
  function pickQrImage(onDone) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', function () {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();
        img.onload = function () {
          // 超大照片先降采样到 1600px，减轻裁剪层内存压力
          const MAX = 1600;
          const scale = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
          let src = String(reader.result);
          if (scale < 1) {
            const w = Math.max(1, Math.round(img.naturalWidth * scale));
            const h = Math.max(1, Math.round(img.naturalHeight * scale));
            const c = document.createElement('canvas');
            c.width = w;
            c.height = h;
            c.getContext('2d').drawImage(img, 0, 0, w, h);
            src = c.toDataURL('image/jpeg', 0.9);
          }
          openQrCropper(src, onDone);
        };
        img.onerror = function () { showToast('图片读取失败，请换一张试试'); };
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
    input.click();
  }

  // ==================== 口号编辑字段（qr 模式商品卡） ====================
  function sloganFieldText(v) {
    return v ? '口号：' + v : '＋ 选择宣传口号（默认随机）';
  }

  /** qr 模式商品卡：宣传口号选择字段（独占一行） */
  function buildSloganField(p) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'p-slogan-field' + (p.slogan ? ' has-value' : '');
    btn.textContent = sloganFieldText(p.slogan);
    btn.addEventListener('click', function () {
      openSloganKey(btn, function (v) {
        p.slogan = v;
        btn.textContent = sloganFieldText(v);
        btn.classList.toggle('has-value', !!v);
        saveState();
        schedulePreview();
      });
    });
    return btn;
  }

  // ==================== 口号选择弹窗（与九宫格同风格） ====================
  const sloganKey = $('sloganKey');
  let skAnchor = null;   // 当前触发的口号字段
  let skApply = null;    // function(v) 选中后的写回逻辑（v='' 表示随机）
  function hideSloganKey() { sloganKey.classList.add('hidden'); }
  function openSloganKey(anchorEl, applyFn) {
    skAnchor = anchorEl;
    skApply = applyFn;
    // 按当前模板的行业渲染 6 个预设口号
    const grid = $('skGrid');
    grid.innerHTML = '';
    const tpl = window.TMPLRender.tplById(state.templateId);
    const pools = window.TMPL_QR_SLOGAN_POOLS || {};
    const pool = pools[tpl.industry] || pools.common || [];
    pool.forEach(function (s) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sk-btn';
      b.textContent = s;
      b.addEventListener('click', function () {
        if (skApply) { const fn = skApply; skApply = null; fn(s); }
        hideSloganKey();
      });
      grid.appendChild(b);
    });
    $('skCustomInput').value = '';
    sloganKey.classList.remove('hidden');
    // 定位：弹在触发框上方，放不下则翻到下方，并夹在视口内
    const r = anchorEl.getBoundingClientRect();
    const kw = sloganKey.offsetWidth || 320;
    const kh = sloganKey.offsetHeight || 280;
    let left = Math.max(8, Math.min(r.left, window.innerWidth - kw - 8));
    let top = r.top - kh - 8;
    if (top < 8) top = Math.min(window.innerHeight - kh - 8, r.bottom + 8);
    if (top < 8) top = 8;
    sloganKey.style.left = left + 'px';
    sloganKey.style.top = top + 'px';
  }
  // 点弹窗和触发框以外的地方收起（与数字键盘一致）
  document.addEventListener('mousedown', function (e) {
    if (sloganKey.classList.contains('hidden')) return;
    if (sloganKey.contains(e.target)) return;
    if (skAnchor && (e.target === skAnchor || skAnchor.contains(e.target))) return;
    hideSloganKey();
  });

  // ==================== 二维码裁剪层（全屏，手机端手势兼容） ====================
  const cropLayer = $('cropLayer');
  const cropStage = $('cropStage');
  const cropImg = $('cropImg');
  const cropMask = $('cropMask');
  let cropState = null;   // {img, nw, nh, scale0, zoom, ox, oy, maskSize}
  let cropDone = null;    // function(dataUrl) 裁剪完成回调

  function hideCropper() {
    cropLayer.classList.add('hidden');
    cropState = null;
  }

  /** 打开裁剪层：dataUrl 原图，onDone 收到 800×800 PNG dataURL */
  function openQrCropper(dataUrl, onDone) {
    cropDone = onDone;
    const img = new Image();
    img.onload = function () {
      cropLayer.classList.remove('hidden');
      const stageW = cropStage.clientWidth;
      const stageH = cropStage.clientHeight;
      const maskSize = Math.floor(Math.min(stageW, stageH) * 0.82);
      cropMask.style.width = maskSize + 'px';
      cropMask.style.height = maskSize + 'px';
      // 初始缩放：图片短边正好盖住裁剪框（cover）
      const scale0 = maskSize / Math.min(img.naturalWidth, img.naturalHeight);
      cropState = {
        img: img,
        nw: img.naturalWidth,
        nh: img.naturalHeight,
        scale0: scale0,
        zoom: 1,
        ox: (maskSize - img.naturalWidth * scale0) / 2,
        oy: (maskSize - img.naturalHeight * scale0) / 2,
        maskSize: maskSize
      };
      cropImg.src = dataUrl;
      cropRender();
    };
    img.onerror = function () {
      cropDone = null;
      showToast('图片读取失败，请换一张试试');
    };
    img.src = dataUrl;
  }

  /** 按当前状态摆放图片（相对裁剪框定位，并约束图片盖住裁剪框） */
  function cropRender() {
    const s = cropState;
    if (!s) return;
    const scale = s.scale0 * s.zoom;
    const rw = s.nw * scale;
    const rh = s.nh * scale;
    s.ox = Math.min(0, Math.max(s.maskSize - rw, s.ox));
    s.oy = Math.min(0, Math.max(s.maskSize - rh, s.oy));
    const mx = (cropStage.clientWidth - s.maskSize) / 2;
    const my = (cropStage.clientHeight - s.maskSize) / 2;
    cropImg.style.width = rw + 'px';
    cropImg.style.height = rh + 'px';
    cropImg.style.left = (mx + s.ox) + 'px';
    cropImg.style.top = (my + s.oy) + 'px';
  }

  function setZoom(z) {
    if (!cropState) return;
    cropState.zoom = Math.min(4, Math.max(1, z));
    cropRender();
  }

  // 拖动（鼠标 / 单指共用）
  let cropDragging = false;
  let cropLastX = 0;
  let cropLastY = 0;
  function ptDown(x, y) { cropDragging = true; cropLastX = x; cropLastY = y; }
  function ptMove(x, y) {
    if (!cropDragging || !cropState) return;
    cropState.ox += x - cropLastX;
    cropState.oy += y - cropLastY;
    cropLastX = x;
    cropLastY = y;
    cropRender();
  }

  /** 确定：按裁剪框位置从原图取样，输出 800×800 PNG */
  function cropConfirm() {
    if (!cropState) return;
    const s = cropState;
    const scale = s.scale0 * s.zoom;
    const OUT = 800;
    const sx = -s.ox / scale;
    const sy = -s.oy / scale;
    const sw = s.maskSize / scale;
    const canvas = document.createElement('canvas');
    canvas.width = OUT;
    canvas.height = OUT;
    const g = canvas.getContext('2d');
    g.fillStyle = '#ffffff'; // 白底兜底（PNG 透明二维码）
    g.fillRect(0, 0, OUT, OUT);
    g.drawImage(s.img, sx, sy, sw, sw, 0, 0, OUT, OUT);
    const dataUrl = canvas.toDataURL('image/png');
    hideCropper();
    if (cropDone) { const fn = cropDone; cropDone = null; fn(dataUrl); }
  }
  function cropCancel() {
    hideCropper();
    cropDone = null;
  }

  // 测试钩子：动态 file input 无法自动化，浏览器实测用入口打开裁剪层
  window.TMPL_QR_TEST = { openQrCropper: openQrCropper };

  // 鼠标拖动 + 滚轮缩放
  cropStage.addEventListener('mousedown', function (e) {
    if (!cropState) return;
    e.preventDefault();
    ptDown(e.clientX, e.clientY);
  });
  window.addEventListener('mousemove', function (e) { ptMove(e.clientX, e.clientY); });
  window.addEventListener('mouseup', function () { cropDragging = false; });
  cropStage.addEventListener('wheel', function (e) {
    if (!cropState) return;
    e.preventDefault();
    setZoom(cropState.zoom * (e.deltaY < 0 ? 1.08 : 0.93));
  }, { passive: false });

  // 触摸：单指拖动 / 双指捏合缩放（touch-action:none 已阻止页面默认手势）
  let pinchDist = 0;
  function touchDist(e) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.hypot(dx, dy);
  }
  cropStage.addEventListener('touchstart', function (e) {
    if (!cropState) return;
    if (e.touches.length === 1) {
      ptDown(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length >= 2) {
      cropDragging = false;
      pinchDist = touchDist(e);
    }
    e.preventDefault();
  }, { passive: false });
  cropStage.addEventListener('touchmove', function (e) {
    if (!cropState) return;
    if (e.touches.length === 1 && cropDragging) {
      ptMove(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length >= 2 && pinchDist > 0) {
      const d = touchDist(e);
      setZoom(cropState.zoom * (d / pinchDist));
      pinchDist = d;
    }
    e.preventDefault();
  }, { passive: false });
  cropStage.addEventListener('touchend', function (e) {
    if (e.touches.length === 0) { cropDragging = false; pinchDist = 0; }
  });

  function renderProductList() {
    const list = $('productList');
    list.innerHTML = '';
    state.products.forEach(function (p, i) {
      list.appendChild(buildProductCard(p, i,
        function () { copyProduct(i); },
        function () { deleteProduct(i); }
      ));
    });
  }

  // ---------- 添加商品弹窗（卡片草稿，保存时才写入商品列表） ----------
  let drafts = [];

  function emptyDraft() {
    if (currentMode === 'qr') {
      return { id: uid(), name: '', price: '', unit: '', qr: '', slogan: '' };
    }
    return { id: uid(), name: '', price: '', unit: window.TMPL_UNITS[0], qr: '', slogan: '' };
  }

  function renderDraftList() {
    const list = $('draftList');
    list.innerHTML = '';
    drafts.forEach(function (p, i) {
      list.appendChild(buildProductCard(p, i,
        function () {
          drafts.splice(i + 1, 0, Object.assign({}, p, { id: uid() }));
          renderDraftList();
        },
        function () {
          confirmDialog('确定删除这条未保存的商品吗？', function (ok) {
            if (!ok) return;
            drafts.splice(i, 1);
            if (!drafts.length) drafts.push(emptyDraft());
            renderDraftList();
          });
        }
      ));
    });
  }

  /** 保存全部草稿：返回保存条数（无有效商品返回 0 并提示） */
  function saveDrafts() {
    const valid = drafts.filter(function (d) { return d.name.trim(); });
    if (!valid.length) {
      showToast('请至少填写一条商品名称');
      return 0;
    }
    valid.forEach(function (d) {
      state.products.push(Object.assign(defaultProduct(), {
        name: d.name.trim(),
        price: sanitizePrice(d.price),
        unit: d.unit
      }));
    });
    state.index = state.products.length - valid.length; // 定位到第一条新商品
    saveState();
    rebuildSlides(true);
    renderProductList();
    drafts = [];
    return valid.length;
  }

  function openQuickAdd() {
    drafts = [emptyDraft()];
    renderDraftList();
    openModal($('modalAdd'));
    const first = $('draftList').querySelector('input[type="text"]');
    if (first) first.focus();
  }

  function copyProduct(i) {
    const src = state.products[i];
    const copy = Object.assign({}, src, { id: uid() });
    state.products.splice(i + 1, 0, copy);
    saveState();
    renderProductList();
    rebuildSlides(true);
    showToast('已复制，直接在卡片上修改即可');
  }

  function deleteProduct(i) {
    if (state.products.length <= 1) {
      showToast('至少保留一条商品信息');
      return;
    }
    const p = state.products[i];
    confirmDialog('删除后不可恢复', function (ok) {
      if (!ok) return;
      state.products.splice(i, 1);
      if (state.index >= state.products.length) state.index = state.products.length - 1;
      saveState();
      renderProductList();
      rebuildSlides(true);
    });
  }

  function appendNewProduct() {
    const p = Object.assign(defaultProduct(), { name: '', price: '' });
    state.products.push(p);
    state.index = state.products.length - 1;
    saveState();
    renderProductList();
    rebuildSlides(true);
    const inputs = $('productList').querySelectorAll('.p-card:last-child input[type="text"]');
    if (inputs[0]) inputs[0].focus();
  }

  // ---------- 幻灯片 ----------
  function buildSlide(product, i) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    const tag = window.TMPLRender.buildTag(window.TMPLRender.tplById(state.templateId), product);

    // 价签左上角序号角标
    const num = document.createElement('div');
    num.className = 'ptag-badge';
    num.textContent = i + 1;
    tag.appendChild(num);

    // 价签右上角操作按钮组（编辑 + 删除）
    const ops = document.createElement('div');
    ops.className = 'ptag-ops';

    // 编辑按钮（铅笔 SVG）
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'ptag-edit';
    edit.title = '编辑这条商品';
    edit.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>';
    edit.addEventListener('click', function (e) {
      e.stopPropagation();
      state.index = i;
      openEditOne(i);
    });

    // 删除按钮
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'ptag-del';
    del.textContent = '×';
    del.title = '删除这条商品';
    del.addEventListener('click', function (e) {
      e.stopPropagation();
      deleteProduct(i);
    });

    ops.appendChild(edit);
    ops.appendChild(del);
    tag.appendChild(ops);
    slide.appendChild(tag);
    return slide;
  }

  /** 打开单条商品编辑弹窗 —— 只显示这一条商品，点"保存"才生效，取消/关闭则丢弃 */
  let editOneIdx = -1;
  let editOneDraft = null;
  function openEditOne(idx) {
    const p = state.products[idx];
    if (!p) return;
    editOneIdx = idx;
    editOneDraft = { name: p.name, price: p.price, unit: p.unit, qr: p.qr || '', slogan: p.slogan || '' };
    const isQr = currentMode === 'qr';
    const m = modeConfig(currentMode);
    $('editOneTitle').textContent = isQr ? m.editTitle : '编辑商品';
    $('editOneNameLabel').textContent = isQr ? '店铺名称' : '商品名称';
    $('editOneName').placeholder = isQr ? '例如：张记水果店' : '例如：新鲜蔬菜';
    $('editOnePriceRow').classList.toggle('hidden', isQr);
    $('editOneQrRow').classList.toggle('hidden', !isQr);
    $('editOneSloganRow').classList.toggle('hidden', !isQr);
    $('editOneBadge').textContent = '第 ' + (idx + 1) + ' 条';
    $('editOneName').value = editOneDraft.name;
    $('editOnePrice').value = editOneDraft.price;
    const slot = $('editOneUnitSlot');
    slot.innerHTML = '';
    slot.appendChild(buildUnitField(editOneDraft));
    if (isQr) {
      refreshEditOneQr();
      refreshEditOneSlogan();
    }
    $('editOneNameCount').textContent = (editOneDraft.name || '').length + ' / 15';
    $('editOneNameClear').classList.toggle('hidden', !(editOneDraft.name || '').length);
    openModal($('modalEditOne'));
    requestAnimationFrame(function () { $('editOneName').focus(); });
  }

  /** 编辑弹窗内二维码字段的可视状态刷新 */
  function refreshEditOneQr() {
    const has = !!(editOneDraft && editOneDraft.qr);
    const img = $('editOneQrImg');
    if (has) img.src = editOneDraft.qr;
    else img.removeAttribute('src');
    img.classList.toggle('hidden', !has);
    $('editOneQrTxt').textContent = has ? '已上传 · 点击更换' : '＋ 上传二维码图片';
    $('editOneQrDel').classList.toggle('hidden', !has);
  }

  /** 编辑弹窗内口号字段的可视状态刷新 */
  function refreshEditOneSlogan() {
    const v = editOneDraft ? editOneDraft.slogan : '';
    const btn = $('editOneSlogan');
    btn.textContent = sloganFieldText(v);
    btn.classList.toggle('has-value', !!v);
  }

  /** 构建"空白模板预览"slide —— 只有背景，中间放两个操作按钮 */
  function buildEmptySlide() {
    const slide = document.createElement('div');
    slide.className = 'slide empty-slide';
    const tpl = window.TMPLRender.tplById(state.templateId);
    const tag = document.createElement('div');
    tag.className = 'ptag';
    tag.dataset.tpl = tpl.id;
    tag.style.backgroundImage = 'url("' + tpl.bg + '")';
    tag.appendChild(document.createElement('div')); // 保证 tag 有尺寸

    // 模板名称标签（小）
    const label = document.createElement('div');
    label.className = 'empty-label';
    label.textContent = tpl.title + ' · ' + tpl.id;

    // 按钮组
    const btns = document.createElement('div');
    btns.className = 'empty-btns';

    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.className = 'empty-btn empty-btn-primary';
    btnAdd.textContent = '＋ ' + modeConfig(currentMode).addBtn;
    btnAdd.addEventListener('click', openQuickAdd);

    const btnManage = document.createElement('button');
    btnManage.type = 'button';
    btnManage.className = 'empty-btn';
    btnManage.textContent = modeConfig(currentMode).manageBtn;
    btnManage.addEventListener('click', openManage);

    btns.appendChild(btnAdd);
    btns.appendChild(btnManage);

    tag.appendChild(label);
    tag.appendChild(btns);
    slide.appendChild(tag);
    return slide;
  }

  // ---------- 站点加载优化：按需加载 ----------
  // 模板 CSS 按需加载：HTML 不再引入全部 202 个模板样式表（首屏少 200 个请求），
  // 用到哪个（当前模板 / 打开模板库时的当前行业）才动态插入 <link>
  const tplCssReady = {};   // tplId -> true 样式表已就绪
  const tplCssWaiter = {};  // tplId -> Promise 防止重复插入
  function ensureTemplateCss(tplId) {
    if (tplCssReady[tplId]) return Promise.resolve();
    if (!tplCssWaiter[tplId]) {
      tplCssWaiter[tplId] = new Promise(function (resolve) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'assets/css/templates/' + tplId + '.css?v=' + (window.TMPL_CSS_V || 1);
        link.onload = function () { tplCssReady[tplId] = true; resolve(); };
        link.onerror = function () { resolve(); }; // 失败也放行，不卡流程
        document.head.appendChild(link);
      });
    }
    return tplCssWaiter[tplId];
  }
  function ensureTemplateCssAll(ids) {
    return Promise.all(ids.map(ensureTemplateCss));
  }

  // 导出库（jszip / html2canvas / jspdf）按需加载：首次点下载按钮才拉取
  const scriptCache = {};
  function loadScriptOnce(src) {
    if (!scriptCache[src]) {
      scriptCache[src] = new Promise(function (resolve, reject) {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = function () { scriptCache[src] = null; reject(new Error('加载失败: ' + src)); };
        document.head.appendChild(s);
      });
    }
    return scriptCache[src];
  }
  let exportLibsPromise = null;
  function ensureExportLibs() {
    if (!exportLibsPromise) {
      exportLibsPromise = Promise.all([
        loadScriptOnce('assets/vendor/jszip.min.js'),
        loadScriptOnce('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'),
        loadScriptOnce('https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js')
      ]).catch(function (e) { exportLibsPromise = null; throw e; });
    }
    return exportLibsPromise;
  }

  // 模板库缩略图背景懒加载：滚到可视区附近才请求背景图
  const lazyBgObserver = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          const el = en.target;
          if (el.dataset.bg) {
            el.style.backgroundImage = 'url("' + el.dataset.bg + '")';
            el.removeAttribute('data-bg');
          }
          lazyBgObserver.unobserve(el);
        });
      }, { rootMargin: '300px' })
    : null;

  function rebuildSlides(keepIndex) {
    // 当前模板样式表未就绪时，先加载再重建（加载完成缓存住，后续直接同步执行）
    if (!tplCssReady[state.templateId]) {
      ensureTemplateCss(state.templateId).then(function () { rebuildSlides(keepIndex); });
      return;
    }
    const idx = keepIndex ? Math.min(state.index, state.products.length - 1) : state.index;
    slides.innerHTML = '';
    state.products.forEach(function (p, i) { slides.appendChild(buildSlide(p, i)); });
    slides.appendChild(buildEmptySlide()); // 末尾始终追加空模板卡
    state.index = Math.min(Math.max(0, idx), state.products.length); // 允许 index 指向空模板
    renderDots();
    updateSide();
    saveState();
    requestAnimationFrame(function () { sizeStage(); goTo(state.index, true); });
  }

  function renderDots() {
    dots.innerHTML = '';
    state.products.forEach(function (_, i) {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'dot' + (i === state.index ? ' active' : '');
      d.title = '第 ' + (i + 1) + ' 张';
      d.addEventListener('click', function () { goTo(i); });
      dots.appendChild(d);
    });
    // 空模板圆点（单独样式）
    if (state.products.length) {
      const ed = document.createElement('button');
      ed.type = 'button';
      ed.className = 'dot dot-empty' + (state.index === state.products.length ? ' active' : '');
      ed.title = '空白模板预览';
      ed.addEventListener('click', function () { goTo(state.products.length); });
      dots.appendChild(ed);
    }
  }

  /** 卡片堆叠式布局：中间大卡，两侧露出缩小的小卡 */
  function layoutSlides(instant) {
    slides.classList.toggle('no-anim', !!instant);
    const children = slides.children;
    // 手机端侧卡只露窄边（translateX 越小越贴近主卡身后），把宽度让给主卡
    const side1 = window.innerWidth <= 768 ? 22 : 72;   // 相邻卡偏移%
    const side2 = window.innerWidth <= 768 ? 48 : 130;  // 远端卡偏移%
    for (let i = 0; i < children.length; i++) {
      const off = i - state.index;
      const el = children[i];
      const isActive = off === 0;
      el.classList.toggle('slide-active', isActive);
      let transform = 'translateX(0) scale(1)';
      let opacity = 0;
      let zIndex = 0;
      if (isActive) {
        opacity = 1; zIndex = 10;
      } else if (Math.abs(off) === 1) {
        transform = 'translateX(' + (off * side1) + '%) scale(0.8)';
        opacity = 0.85; zIndex = 5;
      } else {
        transform = 'translateX(' + (off * side2) + '%) scale(0.62)';
        opacity = 0.45; zIndex = 2;
      }
      el.style.transform = transform;
      el.style.opacity = opacity;
      el.style.zIndex = zIndex;
      el.style.pointerEvents = isActive ? 'auto' : 'none';
    }
    if (instant) {
      requestAnimationFrame(function () { slides.classList.remove('no-anim'); });
    }
  }

  function goTo(i, instant) {
    const maxIdx = state.products.length; // 最后一张是 empty slide
    state.index = Math.max(0, Math.min(i, maxIdx));
    layoutSlides(instant);
    // 更新 dot active（商品 + 空模板）
    const dotsAll = dots.querySelectorAll('.dot');
    dotsAll.forEach(function (d, di) {
      d.classList.toggle('active', di === state.index);
    });
    updatePageInfo();
    updateSide();
  }

  function updatePageInfo() {
    const isEmpty = state.index >= state.products.length;
    if (isEmpty) {
      pageInfo.textContent = '模板预览 · ' + window.TMPLRender.tplById(state.templateId).title;
    } else {
      const p = state.products[state.index];
      pageInfo.textContent = (state.index + 1) + ' / ' + state.products.length + ' · ' + (p ? p.name : '');
    }
    btnPrev.disabled = state.index <= 0;
    btnNext.disabled = state.index >= state.products.length; // 允许翻到最后（empty）
  }

  // ---------- 尺寸（A4 比例 + --mm 变量） ----------
  function sizeStage() {
    const isMobile = window.innerWidth <= 768;
    const W = stage.clientWidth;
    const H = stage.clientHeight;

    // 固定元素占用的水平空间
    //   手机端：翻页按钮直接叠在侧卡上（absolute 定位），只预留极小空间
    const navBtnSize = isMobile ? 44 : 50;
    const navMargin = isMobile ? 4 : 10;
    const navTotal = isMobile ? 8 : (navBtnSize + navMargin) * 2;

    // 两侧露出小卡占用的水平空间
    //   相邻卡 translateX(side1%) scale(0.8) ≈ side1% * 0.8
    //   手机端 side1 只露窄边（见 layoutSlides），主卡尽量放大
    const sidePct = isMobile ? 0.22 * 0.8 : 0.72 * 0.8; // 相邻卡
    //   两侧都有 → 2 * sidePct
    const sideSpacePct = sidePct * 2;

    // frameW 必须满足：navTotal + frameW * (1 + sideSpacePct) <= W
    // → frameW <= (W - navTotal) / (1 + sideSpacePct)
    const availW = Math.max(120, (W - navTotal) / (1 + sideSpacePct));
    // 垂直方向：底部圆点/操作栏为浮层，手机端少留一点
    const availH = Math.max(150, H - (isMobile ? 70 : 128));

    // A4 比例约束
    let frameH = Math.min(availH, (availW * 297) / 210);
    let frameW = (frameH * 210) / 297;

    if (isMobile) {
      // 手机端目标：主卡宽度至少占屏幕 2/3（宽度优先，高度不够时由 capByH 兜底）
      const target = (window.innerWidth - 16) * 2 / 3;
      const capByH = (availH * 210) / 297;
      frameW = Math.max(frameW, Math.min(target, capByH));
      frameH = (frameW * 297) / 210;
    }

    slideFrame.style.width = frameW + 'px';
    slideFrame.style.height = frameH + 'px';

    const mm = frameW / 210;
    slides.querySelectorAll('.ptag').forEach(function (tag) {
      tag.style.width = frameW + 'px';
      tag.style.height = frameH + 'px';
      tag.style.setProperty('--mm', mm + 'px');
      window.TMPLRender.fitTag(tag);
    });
  }

  // ---------- 右侧面板 ----------
  function updateSide() {
    updatePageInfo();
  }

  // ---------- 导出 ----------
  /** 当前激活的价签元素（空模板返回 null，禁止导出） */
  function activeTag() {
    const isEmpty = state.index >= state.products.length;
    if (isEmpty) return null;
    const slide = slides.children[state.index];
    return slide ? slide.querySelector('.ptag') : null;
  }

  function fileBase() {
    const t = window.TMPLRender.tplById(state.templateId);
    const p = state.products[state.index] || {};
    const name = (p.name || modeConfig(currentMode).exportPrefix).replace(/[\\/:*?"<>|\s]/g, '');
    return t.id + '_' + name;
  }

  /** 批量导出用的文件名：序号_商品名 */
  function batchName(i) {
    const p = state.products[i] || {};
    const name = (p.name || '未命名').replace(/[\\/:*?"<>|\s]/g, '');
    return String(i + 1).padStart(2, '0') + '_' + name;
  }

  /** 收集全部商品对应的价签 DOM（按商品顺序，跳过空模板卡） */
  function allProductTags() {
    return [...document.querySelectorAll('.slide .ptag')]
      .filter(function (t) { return !t.closest('.empty-slide'); });
  }

  /** 批量导出公共流程：逐张 captureTag，onEach(i, tag, total, ctx)，ctx 为共享对象 */
  async function exportEachTag(btn, onEach, ctx) {
    ctx = ctx || {};
    const tags = allProductTags();
    if (!tags.length) { showToast('还没有可导出的商品价签'); return null; }
    const label = btn.textContent;
    btn.disabled = true;
    try {
      for (let i = 0; i < tags.length; i++) {
        btn.textContent = '导出中 ' + (i + 1) + '/' + tags.length + '…';
        await onEach(i, tags[i], tags.length, ctx);
      }
      return tags.length;
    } catch (e) {
      showToast('导出失败：' + (e && e.message ? e.message : e));
      return null;
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  }

  function downloadBlob(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }

  async function exportPng() {
    const tag = activeTag();
    if (!tag) { showToast('请先选择一条商品价签再下载'); return; }
    const btn = $('btnPng');
    btn.disabled = true;
    try {
      const canvas = await window.TMPLRender.captureTag(tag, 2480);
      const blob = await new Promise(function (res) { canvas.toBlob(res, 'image/png'); });
      downloadBlob(blob, fileBase() + '.png');
      showToast('PNG 已下载（' + canvas.width + '×' + canvas.height + '）');
    } catch (e) {
      showToast('导出失败：' + (e && e.message ? e.message : e));
    } finally {
      btn.disabled = false;
    }
  }

  async function exportPdf() {
    if (!window.jspdf) { showToast('PDF 组件尚未加载完成，请稍后重试'); return; }
    const btn = $('btnPdf');
    const ctx = { pdf: null };
    const n = await exportEachTag(btn, async function (i, tag, total, c) {
      const canvas = await window.TMPLRender.captureTag(tag, 2480);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      if (!c.pdf) c.pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      else c.pdf.addPage('a4', 'portrait');
      // 按背景比例最大化并居中
      const ratio = canvas.height / canvas.width;
      let w = 210, h = 210 * ratio;
      if (h > 297) { h = 297; w = 297 / ratio; }
      c.pdf.addImage(dataUrl, 'JPEG', (210 - w) / 2, (297 - h) / 2, w, h, undefined, 'fast');
    }, ctx);
    if (n === null || !ctx.pdf) return;
    ctx.pdf.save(modeConfig(currentMode).exportPrefix + '_' + String(n).padStart(2, '0') + '张_' + window.TMPLRender.tplById(state.templateId).id + '.pdf');
    showToast('PDF 已下载（' + n + ' 张 · A4 一页一签）');
  }

  async function exportAllZip() {
    if (!window.JSZip) { showToast('打包组件尚未加载完成，请稍后重试'); return; }
    const btn = $('btnZip');
    const zip = new window.JSZip();
    const n = await exportEachTag(btn, async function (i, tag) {
      const canvas = await window.TMPLRender.captureTag(tag, 2480);
      const blob = await new Promise(function (res) { canvas.toBlob(res, 'image/png'); });
      zip.file(batchName(i) + '.png', blob);
    });
    if (n === null) return;
    btn.textContent = '正在压缩…';
    try {
      const out = await zip.generateAsync({ type: 'blob' });
      downloadBlob(out, modeConfig(currentMode).exportPrefix + '_' + String(n).padStart(2, '0') + '张_' + window.TMPLRender.tplById(state.templateId).id + '.zip');
      showToast('已打包 ' + n + ' 张 PNG');
    } finally {
      btn.textContent = '⬇ 全部打包';
    }
  }

  // ============================================================
  // 调试工具：点价签任意文字 → 可视化调整 → 实时生成模板 CSS
  // ============================================================
  const DEBUG_STORAGE = 'tmplmakerDebugOverrides';
  window.TMPL_DEBUG_ENABLED = DEBUG_MODE;
  window.TMPL_DEBUG_OVERRIDES = (function () {
    try { return JSON.parse(localStorage.getItem(DEBUG_STORAGE)) || {}; }
    catch (e) { return {}; }
  })();

  const DEBUG_TARGETS = { name: '.ptag-name', num: '.ptag-num', unit: '.ptag-unit', slogan: '.ptag-slogan', qr: '.ptag-qr' };
  const DEBUG_LABELS = { name: '商品名称', num: '价格数字', unit: '计价单位', slogan: '宣传语', qr: '二维码区' };
  let dbgKey = null;
  let dbgTag = null;

  function saveDebugOverrides() {
    try { localStorage.setItem(DEBUG_STORAGE, JSON.stringify(window.TMPL_DEBUG_OVERRIDES)); } catch (e) { /* 忽略 */ }
  }

  function mmPxOf(tag) {
    return parseFloat(getComputedStyle(tag).getPropertyValue('--mm')) || 1;
  }
  function mmOf(tag, px) {
    return Math.round((px / mmPxOf(tag)) * 10) / 10;
  }
  function pxOf(el, prop) {
    return parseFloat(getComputedStyle(el)[prop]) || 0;
  }
  function rgbToHex(rgb) {
    const m = rgb.match(/\d+/g);
    if (!m || m.length < 3) return '#000000';
    return '#' + m.slice(0, 3).map(function (n) { return ('0' + (+n).toString(16)).slice(-2); }).join('');
  }
  function fontVarOf(ff) {
    if (ff.indexOf('Alimama') >= 0) return 'var(--font-kai)';
    if (ff.indexOf('Douyin') >= 0) return 'var(--font-douyin)';
    if (ff.indexOf('ZCOOL') >= 0) return 'var(--font-zcool)';
    if (ff.indexOf('Noto') >= 0) return 'var(--font-serif)';
    if (ff.indexOf('Library') >= 0) return 'var(--font-library)';
    if (ff.indexOf('Salt') >= 0) return 'var(--font-salt)';
    if (ff.indexOf('Slim Joe') >= 0) return 'var(--font-slimjoe)';
    if (ff.indexOf('ZQK') >= 0) return 'var(--font-zqk)';
    return '';
  }
  function toMm(tag, px) {
    return 'calc(var(--mm) * ' + mmOf(tag, px) + ')';
  }
  function shadowToMm(s) {
    return s.replace(/(-?\d*\.?\d+)px/g, function (_, n) { return 'calc(var(--mm) * ' + (+n) + ')'; });
  }

  function dbgCollect(key, tag) {
    const el = tag.querySelector(DEBUG_TARGETS[key]);
    const price = tag.querySelector('.ptag-price');
    const cs = getComputedStyle(el);
    const v = {
      left: pxOf(el, 'left'), top: pxOf(el, 'top'),
      width: pxOf(el, 'width'), height: pxOf(el, 'height'),
      color: rgbToHex(cs.color),
      fontVar: fontVarOf(cs.fontFamily),
      fontSize: pxOf(el, 'fontSize'),
      fontWeight: cs.fontWeight,
      letterSpacing: pxOf(el, 'letterSpacing'),
      padX: pxOf(el, 'paddingLeft'),
      textShadow: cs.textShadow && cs.textShadow !== 'none' ? shadowToMm(cs.textShadow) : ''
    };
    if (key === 'num' || key === 'unit') {
      const pcs = getComputedStyle(price);
      v.priceLeft = pxOf(price, 'left');
      v.priceTop = pxOf(price, 'top');
      v.priceW = pxOf(price, 'width');
      v.priceH = pxOf(price, 'height');
      v.gap = parseFloat(pcs.columnGap) || 0;
    }
    return v;
  }

  function dbgApply(key, tag, v) {
    const o = window.TMPL_DEBUG_OVERRIDES[tag.dataset.tpl] =
      window.TMPL_DEBUG_OVERRIDES[tag.dataset.tpl] || {};
    if (key === 'qr') {
      // 二维码区（整个白框容器）：只调几何位置/尺寸
      o.qr = {
        left: toMm(tag, v.left), top: toMm(tag, v.top),
        width: toMm(tag, v.width), height: toMm(tag, v.height)
      };
    } else if (key === 'name' || key === 'slogan') {
      o[key] = {
        left: toMm(tag, v.left), top: toMm(tag, v.top),
        color: v.color, fontFamily: v.fontVar, fontWeight: v.fontWeight,
        fontSize: toMm(tag, v.fontSize),
        paddingLeft: toMm(tag, v.padX), paddingRight: toMm(tag, v.padX)
      };
    } else {
      o[key] = {
        color: v.color, fontFamily: v.fontVar, fontWeight: v.fontWeight,
        fontSize: toMm(tag, v.fontSize),
        paddingLeft: toMm(tag, v.padX), paddingRight: toMm(tag, v.padX)
      };
      o.price = { left: toMm(tag, v.priceLeft), top: toMm(tag, v.priceTop) };
    }
    saveDebugOverrides();
  }

  function dbgGenCss(key, tag) {
    const tpl = '[data-tpl="' + tag.dataset.tpl + '"]';
    const out = ['/* 模板 ' + tag.dataset.tpl + ' · 全部规则（点击「覆盖CSS」写回 assets/css/templates/ 对应文件） */'];
    function rule(sel, props) {
      const ps = props.filter(Boolean);
      if (!ps.length) return;
      out.push('');
      out.push(sel + ' {');
      ps.forEach(function (p) { out.push('  ' + p); });
      out.push('}');
    }
    function typo(v, extra) {
      return [
        'color: ' + v.color + ';',
        v.fontVar ? 'font-family: ' + v.fontVar + ';' : '',
        'font-size: ' + toMm(tag, v.fontSize) + ';',
        'font-weight: ' + v.fontWeight + ';',
        'padding-left: ' + toMm(tag, v.padX) + ';',
        'padding-right: ' + toMm(tag, v.padX) + ';'
      ].concat(extra || []);
    }
    function box(v, extra) {
      return [
        'left: ' + toMm(tag, v.left) + ';',
        'top: ' + toMm(tag, v.top) + ';',
        'width: ' + toMm(tag, v.width) + ';',
        'height: ' + toMm(tag, v.height) + ';'
      ].concat(extra || []);
    }

    // 二维码区（整个白框容器，qr 模式）：只生成几何规则
    const qrBox = tag.querySelector('.ptag-qr');
    // qr 模式下店铺名/口号元素是双类（ptag-name ptag-qr-name），模板文件里
    // .ptag-qr-name 块排在 .ptag-name 之后且同优先级——必须写到 qr 块才有视觉效果
    const isQr = !!qrBox;
    const nameCls = isQr ? '.ptag-qr-name' : '.ptag-name';
    const sloganCls = isQr ? '.ptag-qr-slogan' : '.ptag-slogan';

    if (qrBox) {
      const qrv = dbgCollect('qr', tag);
      rule(tpl + ' .ptag-qr', box(qrv, []));
    }

    // 名称区（qr 模式下 .ptag-name 也存在，双类复用；price 模式专属元素判空跳过）
    if (tag.querySelector('.ptag-name')) {
      const name = dbgCollect('name', tag);
      rule(tpl + ' ' + nameCls, box(name, [
        'color: ' + name.color + ';',
        name.fontVar ? 'font-family: ' + name.fontVar + ';' : '',
        'font-size: ' + toMm(tag, name.fontSize) + ';',
        'font-weight: ' + name.fontWeight + ';',
        'letter-spacing: ' + toMm(tag, name.letterSpacing) + ';',
        'padding-left: ' + toMm(tag, name.padX) + ';',
        'padding-right: ' + toMm(tag, name.padX) + ';'
      ]));
    }

    // 价格区（qr 模式无 .ptag-num / .ptag-unit，跳过）
    if (tag.querySelector('.ptag-num')) {
      const num = dbgCollect('num', tag);
      rule(tpl + ' .ptag-price', [
        'left: ' + toMm(tag, num.priceLeft) + ';',
        'top: ' + toMm(tag, num.priceTop) + ';',
        'width: ' + toMm(tag, num.priceW) + ';',
        'height: ' + toMm(tag, num.priceH) + ';',
        'gap: ' + toMm(tag, num.gap) + ';'
      ]);
      rule(tpl + ' .ptag-num', typo(num, [
        num.textShadow ? 'text-shadow: ' + num.textShadow + ';' : ''
      ]));

      const unit = dbgCollect('unit', tag);
      rule(tpl + ' .ptag-unit', typo(unit));
    }

    const slEl = tag.querySelector('.ptag-slogan');
    if (slEl) {
      const sl = dbgCollect('slogan', tag);
      // 口号元素处于隐藏态（display:none）时计算宽高为 0，直接写会把模板文件搞坏；回退到默认几何
      const slW = sl.width > 0 ? sl.width : 210;
      const slH = sl.height > 0 ? sl.height : 14;
      rule(tpl + ' ' + sloganCls, box(Object.assign({}, sl, { width: slW, height: slH }), [
        'color: ' + sl.color + ';',
        sl.fontVar ? 'font-family: ' + sl.fontVar + ';' : '',
        'font-size: ' + toMm(tag, sl.fontSize) + ';',
        'font-weight: ' + sl.fontWeight + ';',
        'padding-left: ' + toMm(tag, sl.padX) + ';',
        'padding-right: ' + toMm(tag, sl.padX) + ';'
      ]));

      // 胶囊底样式（仅 V03/V06 等有 pill 底的模板会产生实际属性）
      const st = tag.querySelector('.ptag-slogan-text');
      if (st) {
        const cs = getComputedStyle(st);
        const props = [];
        if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') {
          props.push('background: ' + cs.backgroundColor + ';');
        }
        if (cs.borderStyle !== 'none') {
          props.push('border: calc(var(--mm) * ' + mmOf(tag, pxOf(st, 'borderTopWidth')) + ') ' + cs.borderStyle + ' ' + rgbToHex(cs.borderTopColor) + ';');
        }
        const rads = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
        if (rads.some(function (r) { return parseFloat(r) > 0; })) {
          props.push('border-radius: ' + rads.map(function (r) { return toMm(tag, parseFloat(r)); }).join(' ') + ';');
        }
        const pads = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft];
        if (pads.some(function (p) { return parseFloat(p) > 0; })) {
          props.push('padding: ' + pads.map(function (p) { return toMm(tag, parseFloat(p)); }).join(' ') + ';');
        }
        rule(tpl + ' .ptag-slogan-text', props);
      }
    }
    return out.join('\n');
  }

  // 字体/粗细宫格高亮同步（供 dbgFillInputs 调用，须与 dbgFillInputs 同作用域）
  function dbgFontGridSync() {
    const grid = document.getElementById('dbgFontGrid');
    if (!grid) return;
    const cur = $('dbgFont').value;
    grid.querySelectorAll('.dbg-font-cell').forEach(function (cell) {
      cell.classList.toggle('active', cell.dataset.val === cur);
    });
  }
  function dbgWeightGridSync() {
    const grid = document.getElementById('dbgWeightGrid');
    if (!grid) return;
    const cur = $('dbgWeight').value;
    grid.querySelectorAll('.dbg-font-cell').forEach(function (cell) {
      cell.classList.toggle('active', cell.dataset.val === cur);
    });
  }

  function dbgOpen(key, tag) {
    dbgKey = key;
    dbgTag = tag;
    const panel = $('debugPanel');
    panel.classList.remove('hidden');
    $('dbgTitle').textContent = DEBUG_LABELS[key] + ' · 模板 ' + tag.dataset.tpl;
    dbgFillInputs();
    dbgGen();
  }

  function dbgFillInputs() {
    const v = dbgCollect(dbgKey, dbgTag);
    $('dbgFont').value = v.fontVar;
    dbgFontGridSync();
    $('dbgSize').value = mmOf(dbgTag, v.fontSize);
    $('dbgWeight').value = ['100', '300', '400', '700', '900'].indexOf(v.fontWeight) >= 0 ? v.fontWeight : '400';
    dbgWeightGridSync();
    $('dbgColor').value = v.color;
    $('dbgPadX').value = mmOf(dbgTag, v.padX);
    if (dbgKey === 'num' || dbgKey === 'unit') {
      $('dbgLeft').value = mmOf(dbgTag, v.priceLeft);
      $('dbgTop').value = mmOf(dbgTag, v.priceTop);
      $('dbgPosTip').textContent = '左右/上下 调整整个价格块的位置';
    } else {
      $('dbgLeft').value = mmOf(dbgTag, v.left);
      $('dbgTop').value = mmOf(dbgTag, v.top);
      $('dbgPosTip').textContent = '';
    }
    // 同步触发器上的显示值（debugFill 触发、dbgGen 更新 hidden input 后也会再走一遍 dbgFillDisplay）
    dbgFillDisplay();
  }

  /** 把 hidden input 的值同步到触发器上的文字/色块 */
  function dbgFillDisplay() {
    $('dbgSizeVal').textContent = (+$('dbgSize').value || 0).toFixed(1);
    $('dbgLeftVal').textContent = (+$('dbgLeft').value || 0).toFixed(1);
    $('dbgTopVal').textContent = (+$('dbgTop').value || 0).toFixed(1);
    $('dbgPadXVal').textContent = (+$('dbgPadX').value || 0).toFixed(1);
    const color = $('dbgColor').value || '#000000';
    $('dbgSwatch').style.background = color;
    $('dbgColorVal').textContent = color.toUpperCase();
  }

  function dbgGen() {
    if (!dbgKey || !dbgTag || !dbgTag.isConnected) return;
    const v = dbgCollect(dbgKey, dbgTag);
    const mm = mmPxOf(dbgTag);
    const L = parseFloat($('dbgLeft').value);
    const T = parseFloat($('dbgTop').value);
    const S = parseFloat($('dbgSize').value);
    const P = parseFloat($('dbgPadX').value);
    if (dbgKey === 'num' || dbgKey === 'unit') {
      if (isFinite(L)) v.priceLeft = L * mm;
      if (isFinite(T)) v.priceTop = T * mm;
    } else {
      if (isFinite(L)) v.left = L * mm;
      if (isFinite(T)) v.top = T * mm;
    }
    if (isFinite(S) && S > 0) v.fontSize = S * mm;
    if (isFinite(P) && P >= 0) v.padX = P * mm;
    v.fontWeight = $('dbgWeight').value;
    v.color = $('dbgColor').value;
    v.fontVar = $('dbgFont').value;
    dbgApply(dbgKey, dbgTag, v);
    // 同模板的所有价签同步生效
    slides.querySelectorAll('.ptag').forEach(function (t) {
      if (t.dataset.tpl === dbgTag.dataset.tpl) window.TMPLRender.applyDebugOverrides(t);
    });
    $('dbgCss').value = dbgGenCss(dbgKey, dbgTag);
    dbgFillDisplay();
  }  function initDebug() {
    document.body.classList.add('debug-on');

    // 按住标题栏拖动面板，避免挡住预览区
    const panel = $('debugPanel');
    const head = $('dbgHead');
    let drag = null;
    head.addEventListener('pointerdown', function (e) {
      if (e.target.closest('#dbgClose')) return;
      const rect = panel.getBoundingClientRect();
      drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
      panel.style.left = rect.left + 'px';
      panel.style.top = rect.top + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      head.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    head.addEventListener('pointermove', function (e) {
      if (!drag) return;
      const x = Math.max(8, Math.min(e.clientX - drag.dx, window.innerWidth - panel.offsetWidth - 8));
      const y = Math.max(8, Math.min(e.clientY - drag.dy, window.innerHeight - 48));
      panel.style.left = x + 'px';
      panel.style.top = y + 'px';
    });
    head.addEventListener('pointerup', function () { drag = null; });
    head.addEventListener('pointercancel', function () { drag = null; });

    slides.addEventListener('click', function (e) {
      for (const key in DEBUG_TARGETS) {
        const t = e.target.closest(DEBUG_TARGETS[key]);
        if (t && t.closest('.ptag')) {
          dbgOpen(key, t.closest('.ptag'));
          return;
        }
      }
    });
    [['dbgFont', 'change'], ['dbgWeight', 'change'],
     ['dbgSize', 'input'], ['dbgColor', 'input'],
     ['dbgLeft', 'input'], ['dbgTop', 'input'], ['dbgPadX', 'input']].forEach(function (pair) {
      $(pair[0]).addEventListener(pair[1], dbgGen);
    });
    // 字体宫格（替代下拉选择，5 列）
    const FONT_OPTIONS = [
      ['东方大楷', 'var(--font-kai)'], ['抖音黑体', 'var(--font-douyin)'],
      ['站酷快乐体', 'var(--font-zcool)'], ['思源宋体', 'var(--font-serif)'],
      ['系统默认', ''],
      ['Library 3 AM', 'var(--font-library)'],
      ['Salt', 'var(--font-salt)'], ['Slim Joe', 'var(--font-slimjoe)'],
      ['ZQK 涂鸦', 'var(--font-zqk)']
    ];
    $('dbgWeightGrid').querySelectorAll('.dbg-font-cell').forEach(function (cell) {
      cell.addEventListener('click', function () {
        $('dbgWeight').value = cell.dataset.val;
        dbgWeightGridSync();
        dbgGen();
      });
    });
    FONT_OPTIONS.forEach(function (f) {
      const cell = document.createElement('div');
      cell.className = 'dbg-font-cell';
      cell.dataset.val = f[1];
      cell.textContent = f[0];
      cell.addEventListener('click', function () {
        $('dbgFont').value = f[1];
        dbgFontGridSync();
        dbgGen();
      });
      $('dbgFontGrid').appendChild(cell);
    });
    dbgFontGridSync();
    $('dbgClose').addEventListener('click', function () {
      $('debugPanel').classList.add('hidden');
    });
    // 写回接口地址：同源(8098)时走相对路径避免跨域；其它来源(file:///其它端口)走绝对地址
    function dbgApiUrl() {
      if (location.protocol === 'http:' && /^(localhost|127\.0\.0\.1):8098$/.test(location.host)) {
        return '/api/save-css';
      }
      return 'http://127.0.0.1:8098/api/save-css';
    }
    $('dbgCopy').addEventListener('click', function () {
      if (!dbgTag) return;
      const css = $('dbgCss').value;
      if (!css.trim()) {
        showToast('CSS 为空，拒绝写回（请先在面板调整参数生成 CSS，再写回文件）');
        return;
      }
      const tpl = dbgTag.dataset.tpl;
      fetch(dbgApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tpl: tpl, css: css })
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res.ok) {
          // 覆盖成功后清掉该模板的 localStorage 调试覆盖，保证屏幕显示与 CSS 文件一致
          delete window.TMPL_DEBUG_OVERRIDES[tpl];
          saveDebugOverrides();
          showToast('已覆盖 ' + res.file + '，页面自动刷新…');
          // dev-server 已同步 bump 该模板 CSS 的 ?v= 版本号；
          // 用 ?fresh= 换新地址强制重新拉 HTML，绕开一切缓存（含无视 no-store 的内置浏览器）
          setTimeout(function () { location.replace(location.pathname + '?fresh=' + Date.now()); }, 800);
        } else {
          showToast('覆盖失败：' + res.error);
        }
      }).catch(function () {
        // dev-server 不可用（如用静态服务打开）时退回复制
        if (navigator.clipboard) {
          navigator.clipboard.writeText(css).then(function () { showToast('写回服务不可用，已复制 CSS'); });
        } else {
          $('dbgCss').select();
          document.execCommand('copy');
          showToast('写回服务不可用，已复制 CSS');
        }
      });
    });
    // 同步其它模板：把当前模板的全量 CSS 写到同前缀的其它模板文件
    function dbgSyncTargets() {
      const cur = dbgTag.dataset.tpl;
      const prefix = cur.replace(/\d+$/, '');
      return window.TMPL_TEMPLATES.map(function (t) { return t.id; })
        .filter(function (id) { return id !== cur && id.replace(/\d+$/, '') === prefix; });
    }
    // 同步其它模板：弹出带预览的选择弹窗，用户勾选要同步的模板（默认全选）
    $('dbgReset').addEventListener('click', function () {
      if (!dbgTag) return;
      const targets = dbgSyncTargets();
      $('dbgSyncText').textContent = '选择要把模板 ' + dbgTag.dataset.tpl + ' 的样式同步到哪些模板：';
      const grid = $('syncPickGrid');
      grid.innerHTML = '';
      const previewData = currentMode === 'qr'
        ? { name: '店铺名称', qr: '' }
        : { name: '商品名称', price: '9.9', unit: '元/个' };
      const metas = targets.map(function (id) { return window.TMPLRender.tplById(id); });
      ensureTemplateCssAll(targets).then(function () {
        targets.forEach(function (id, i) {
          const card = document.createElement('div');
          card.className = 'sync-pick-card sel';
          card.dataset.id = id;
          const pv = document.createElement('div');
          pv.className = 'sync-pick-preview';
          const tagEl = window.TMPLRender.buildTag(metas[i], previewData);
          // 背景图懒加载（复用模板库的观察器）
          if (lazyBgObserver) {
            tagEl.dataset.bg = metas[i].bg;
            tagEl.style.backgroundImage = 'none';
            lazyBgObserver.observe(tagEl);
          }
          pv.appendChild(tagEl);
          const lb = document.createElement('span');
          lb.className = 'sync-pick-name';
          lb.textContent = id;
          card.appendChild(pv);
          card.appendChild(lb);
          card.addEventListener('click', function () { card.classList.toggle('sel'); });
          grid.appendChild(card);
        });
        $('dbgSyncModal').classList.remove('hidden');
        requestAnimationFrame(function () {
          grid.querySelectorAll('.sync-pick-preview').forEach(function (pv) {
            const tag = pv.querySelector('.ptag');
            const w = pv.clientWidth;
            if (!tag || !w) return;
            tag.style.width = w + 'px';
            tag.style.height = (w * 297 / 210) + 'px';
            tag.style.setProperty('--mm', (w / 210) + 'px');
            window.TMPLRender.fitTag(tag);
          });
        });
      });
    });
    $('dbgSyncCancel').addEventListener('click', function () {
      $('dbgSyncModal').classList.add('hidden');
    });
    $('dbgSyncOk').addEventListener('click', function () {
      if (!dbgTag) return;
      if (!$('dbgCss').value.trim()) {
        showToast('CSS 为空，拒绝同步（请先在面板调整参数生成 CSS）');
        return;
      }
      const picked = Array.prototype.slice.call($('syncPickGrid').querySelectorAll('.sync-pick-card.sel'))
        .map(function (c) { return c.dataset.id; });
      if (!picked.length) {
        showToast('请至少选择一个要同步的模板');
        return;
      }
      $('dbgSyncModal').classList.add('hidden');
      const src = dbgTag.dataset.tpl;
      // 同步目标包含源模板自身，保证源文件也与面板当前状态一致
      const targets = [src].concat(picked);
      let done = 0, fail = 0;
      function check() {
        if (done + fail < targets.length) return;
        if (fail === 0) {
          // 全部写成功后清掉这些模板的 localStorage 调试覆盖，
          // 否则旧的临时覆盖会以内联样式压过新写的 CSS，造成"同步了但显示不一致"
          targets.forEach(function (id) { delete window.TMPL_DEBUG_OVERRIDES[id]; });
          saveDebugOverrides();
          showToast('已同步到 ' + done + ' 个模板，页面即将刷新生效');
          setTimeout(function () { location.reload(); }, 1200);
        } else if (done === 0) {
          showToast('写回失败：请确认 node dev-server.js 正在运行（端口 8098）');
        } else {
          showToast('同步完成：成功 ' + done + ' 个，失败 ' + fail + ' 个');
        }
      }
      targets.forEach(function (id) {
        // 关键：选择器里的模板号要换成目标模板号，否则改的仍是当前模板
        const cssFor = $('dbgCss').value.split('data-tpl="' + src + '"').join('data-tpl="' + id + '"');
        fetch(dbgApiUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tpl: id, css: cssFor })
        }).then(function (r) { return r.json(); }).then(function (res) {
          res.ok ? done++ : fail++;
          check();
        }).catch(function () {
          fail++;
          check();
        });
      });
    });

    // ---------- HSL ↔ hex 工具 ----------
    function hexToHsl(hex) {
      hex = (hex || '#000000').replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c; }).join('');
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0; const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
          case g: h = ((b - r) / d + 2); break;
          case b: h = ((r - g) / d + 4); break;
        }
        h *= 60;
      }
      return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
    }
    function hslToHex(h, s, l) {
      h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      if (h < 60) { r = c; g = x; b = 0; }
      else if (h < 120) { r = x; g = c; b = 0; }
      else if (h < 180) { r = 0; g = c; b = x; }
      else if (h < 240) { r = 0; g = x; b = c; }
      else if (h < 300) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }
      function toHex(n) { return ('0' + Math.round((n + m) * 255).toString(16)).slice(-2); }
      return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    // ---------- 弹窗：滑杆 + HSL ----------
    const panelBody = $('debugPanel').querySelector('.dbg-body');
    const sliderPopup = $('dbgPopupSlider');
    const colorPopup = $('dbgPopupColor');
    const slider = $('dbgRangeSlider');
    const sliderTitle = $('dbgPopupTitle');
    const sliderVal = $('dbgRangeVal');
    let openPopup = null;   // 'slider' | 'color' | null
    let currentPopupField = null; // 当前弹窗对应哪个 hidden input（dbgSize / dbgLeft / dbgTop）

    function closePopups() {
      sliderPopup.classList.add('hidden');
      colorPopup.classList.add('hidden');
      openPopup = null;
      currentPopupField = null;
    }
    function positionPopup(popup, trigger) {
      const tb = trigger.getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      popup.style.visibility = 'hidden';
      popup.classList.remove('hidden');
      const pw = popup.offsetWidth, ph = popup.offsetHeight;
      popup.classList.add('hidden');
      popup.style.visibility = '';
      let left = tb.left;
      let top = tb.bottom + 6;
      if (left + pw > vw - 8) left = vw - pw - 8;
      if (left < 8) left = 8;
      if (top + ph > vh - 8) top = tb.top - ph - 6; // 空间不够时翻到触发器上方
      if (top < 8) top = 8;
      popup.style.left = left + 'px';
      popup.style.top = top + 'px';
    }

    // 滑杆：把 hidden input 的值同步到 popup range，打开弹窗
    function openSliderPopup(trigger, fieldId, label, min, max, step) {
      const range = $('dbgRangeSlider');
      const title = $('dbgPopupTitle');
      const curField = $(fieldId);
      if (!trigger || !range || !title || !curField) {
        console.log('[dbg] openSliderPopup missing:', { trigger: !!trigger, range: !!range, title: !!title, curField: !!curField });
        return;
      }
      closePopups();
      currentPopupField = fieldId;
      openPopup = 'slider';
      title.textContent = label;
      range.min = min; range.max = max; range.step = step;
      const cur = parseFloat(curField.value);
      if (isFinite(cur)) range.value = cur;
      $('dbgRangeVal').textContent = cur.toFixed(1);
      positionPopup(sliderPopup, trigger);
      sliderPopup.classList.remove('hidden');
    }

    // HSL 颜色：把 hidden color input 的 hex → HSL → 三滑杆
    function openColorPopup() {
      const trigger = panelBody.querySelector('.dbg-field[data-popup="color"]');
      if (!trigger) return;
      closePopups();
      openPopup = 'color';
      const hsl = hexToHsl($('dbgColor').value);
      $('dbgH').value = hsl.h;
      $('dbgS').value = hsl.s;
      $('dbgL').value = hsl.l;
      updateHslPreview();
      positionPopup(colorPopup, trigger);
      colorPopup.classList.remove('hidden');
    }
    function updateHslPreview() {
      const h = +$('dbgH').value, s = +$('dbgS').value, l = +$('dbgL').value;
      const hex = hslToHex(h, s, l);
      $('dbgHVal').textContent = h + '°';
      $('dbgSVal').textContent = s + '%';
      $('dbgLVal').textContent = l + '%';
      $('dbgPreviewColor').style.background = hex;
      $('dbgHexVal').textContent = hex.toUpperCase();
    }

    // 点击触发器 → 打开对应弹窗
    panelBody.addEventListener('click', function (e) {
      const f = e.target.closest('.dbg-field[data-popup]');
      if (!f) return;
      const id = f.dataset.popup;
      if (id === 'size') openSliderPopup(f, 'dbgSize', '字号', 2, 120, 0.5);
      else if (id === 'left') openSliderPopup(f, 'dbgLeft', '左右', -100, 200, 0.5);
      else if (id === 'top') openSliderPopup(f, 'dbgTop', '上下', -100, 200, 0.5);
      else if (id === 'padx') openSliderPopup(f, 'dbgPadX', '左右内边距', 0, 60, 0.5);
      else if (id === 'color') openColorPopup();
    });
    panelBody.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const f = e.target.closest('.dbg-field[data-popup]');
        if (!f) return;
        e.preventDefault();
        f.click();
      }
    });

    // 滑杆 → hidden input → dispatch input
    slider.addEventListener('input', function () {
      const v = parseFloat(slider.value);
      sliderVal.textContent = (+v).toFixed(1);
      const hidden = $(currentPopupField);
      if (!hidden) return;
      hidden.value = v;
      hidden.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // HSL 三滑杆
    ['dbgH', 'dbgS', 'dbgL'].forEach(function (id) {
      $(id).addEventListener('input', function () {
        updateHslPreview();
        const hex = hslToHex(+$('dbgH').value, +$('dbgS').value, +$('dbgL').value);
        $('dbgColor').value = hex;
        $('dbgColor').dispatchEvent(new Event('input', { bubbles: true }));
      });
    });

    // 点击外部关闭（事件冒泡顺序：debugPanel → 点内部不关闭）
    document.addEventListener('pointerdown', function (e) {
      if (!openPopup) return;
      if (sliderPopup.contains(e.target) || colorPopup.contains(e.target)) return;
      if (e.target.closest('.dbg-field[data-popup]')) return;
      closePopups();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openPopup) closePopups();
    });
  }

  // ---------- 商品管理弹窗 ----------
  function openManage() {
    renderProductList();
    openModal($('modalProducts'));
  }

  // ---------- 删除确认弹窗（替代系统 confirm） ----------
  let confirmAction = null;
  function confirmDialog(msg, onOk) {
    $('confirmMsg').textContent = msg;
    confirmAction = onOk;
    openModal($('modalConfirm'));
  }

  // ---------- 事件绑定 ----------
  function bindEvents() {
    // 添加商品 / 商品管理
    $('btnAddQuick').addEventListener('click', openQuickAdd);
    $('btnManage').addEventListener('click', openManage);
    // 顶栏模式徽标：重新打开模式选择层
    $('btnModeSwitch').addEventListener('click', showModeSelect);
    // 弹窗内新增一条草稿卡片
    $('btnAddDraft').addEventListener('click', function () {
      drafts.push(emptyDraft());
      renderDraftList();
      const inputs = $('draftList').querySelectorAll('.p-card:last-child input[type="text"]');
      if (inputs[0]) inputs[0].focus();
    });
    // 保存：保存草稿并关闭弹窗
    $('qaConfirm').addEventListener('click', function () {
      const n = saveDrafts();
      if (n) {
        closeModal($('modalAdd'));
        showToast('已添加 ' + n + ' 条商品');
      }
    });
    // 商品管理：先保存，再打开管理弹窗
    $('qaManage').addEventListener('click', function () {
      const n = saveDrafts();
      if (n) showToast('已添加 ' + n + ' 条商品');
      closeModal($('modalAdd'));
      openManage();
    });

    // 删除确认弹窗
    $('confirmOk').addEventListener('click', function () {
      closeModal($('modalConfirm'));
      if (confirmAction) { const fn = confirmAction; confirmAction = null; fn(true); }
    });
    $('confirmCancel').addEventListener('click', function () {
      confirmAction = null;
      closeModal($('modalConfirm'));
    });

    // 模板切换按钮（预览区下方）
    $('btnTplPrev').addEventListener('click', function () { switchTemplate(-1); });
    $('btnTplNext').addEventListener('click', function () { switchTemplate(1); });
    $('btnTplLib').addEventListener('click', openTemplateModal);
    // 模板库弹窗内的更换行业
    $('btnChangeIndustry').addEventListener('click', function () {
      closeModal($('modalTemplate'));
      renderIndustryModal();
      openModal($('modalIndustry'));
    });

    // 弹窗关闭
    ['modalIndustry', 'modalTemplate', 'modalAdd', 'modalProducts', 'modalEditOne', 'modalConfirm'].forEach(function (id) { bindModalDismiss($(id)); });

    // 单条编辑弹窗：编辑的是草稿副本，点"保存"才写回
    const nameInput = $('editOneName');
    const priceInput = $('editOnePrice');
    const nameClear = $('editOneNameClear');

    nameInput.addEventListener('input', function () {
      if (!editOneDraft) return;
      editOneDraft.name = nameInput.value;
      nameClear.classList.toggle('hidden', !nameInput.value.length);
      $('editOneNameCount').textContent = (nameInput.value || '').length + ' / 15';
    });
    // 名称清空按钮
    nameClear.addEventListener('click', function () {
      if (!editOneDraft) return;
      editOneDraft.name = '';
      nameInput.value = '';
      nameClear.classList.add('hidden');
      $('editOneNameCount').textContent = '0 / 15';
      nameInput.focus();
    });

    // ==================== 单条编辑弹窗接线 ====================
    const unitSlot = $('editOneUnitSlot');
    priceInput.addEventListener('click', function () {
      openNumKey(priceInput, function (v) {
        if (editOneDraft) { editOneDraft.price = v; priceInput.value = v; }
      });
    });
    priceInput.addEventListener('keydown', function (e) { e.preventDefault(); }); // 只允许键盘按钮输入
    unitSlot.addEventListener('click', function () {
      openUnitKey(unitSlot, function (u) {
        applyUnit(unitSlot, editOneDraft, u);
      });
    });


    $('editOneCancel').addEventListener('click', function () {
      editOneDraft = null;
      hideNumKey();
      hideUnitKey();
      closeModal($('modalEditOne'));
    });
    $('editOneSave').addEventListener('click', function () {
      const p = state.products[editOneIdx];
      if (p && editOneDraft) {
        p.name = editOneDraft.name;
        p.price = editOneDraft.price;
        p.unit = editOneDraft.unit;
        p.qr = editOneDraft.qr || '';
        p.slogan = editOneDraft.slogan || '';
        saveState();
        schedulePreview();
        showToast('已保存');
      }
      editOneDraft = null;
      hideNumKey();
      hideUnitKey();
      hideSloganKey();
      closeModal($('modalEditOne'));
    });

    // 编辑弹窗：二维码上传 / 移除（qr 模式）
    $('editOneQrPick').addEventListener('click', function () {
      pickQrImage(function (dataUrl) {
        if (!editOneDraft) return;
        editOneDraft.qr = dataUrl;
        refreshEditOneQr();
      });
    });
    $('editOneQrDel').addEventListener('click', function () {
      if (!editOneDraft) return;
      editOneDraft.qr = '';
      refreshEditOneQr();
    });

    // 编辑弹窗：口号选择（qr 模式）
    $('editOneSlogan').addEventListener('click', function () {
      openSloganKey($('editOneSlogan'), function (v) {
        if (!editOneDraft) return;
        editOneDraft.slogan = v;
        refreshEditOneSlogan();
      });
    });

    // 口号弹窗：自定义输入确定
    $('skCustomOk').addEventListener('click', function () {
      const v = $('skCustomInput').value.trim();
      if (!v) { showToast('请输入口号内容'); return; }
      if (skApply) { const fn = skApply; skApply = null; fn(v); }
      hideSloganKey();
    });
    // 口号弹窗：不固定（每次渲染随机取一条）
    $('skRandom').addEventListener('click', function () {
      if (skApply) { const fn = skApply; skApply = null; fn(''); }
      hideSloganKey();
    });

    // 裁剪层：确定 / 取消
    $('cropConfirm').addEventListener('click', cropConfirm);
    $('cropCancel').addEventListener('click', cropCancel);

    // 新增商品卡片
    $('btnAddProduct').addEventListener('click', appendNewProduct);

    // 幻灯片
    btnPrev.addEventListener('click', function () { goTo(state.index - 1); });
    btnNext.addEventListener('click', function () { goTo(state.index + 1); });
    // 触屏手势：左右滑动切换价签（手机端）
    let touchX = null, touchY = null;
    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      const dy = e.changedTouches[0].clientY - touchY;
      touchX = touchY = null;
      // 横向滑动超过 40px 且明显大于纵向位移才切换，避免干扰上下滚动
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        goTo(state.index + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
    document.addEventListener('keydown', function (e) {
      if (document.querySelector('.modal.open')) return;
      if (e.key === 'ArrowLeft') goTo(state.index - 1);
      if (e.key === 'ArrowRight') goTo(state.index + 1);
    });

    // 导出
    // 站点加载优化：导出库（jszip/html2canvas/jspdf）首次点下载时才加载
    $('btnPng').addEventListener('click', function () { ensureExportLibs().then(exportPng).catch(function () { showToast('导出组件加载失败，请检查网络'); }); });
    $('btnZip').addEventListener('click', function () { ensureExportLibs().then(exportAllZip).catch(function () { showToast('导出组件加载失败，请检查网络'); }); });
    $('btnPdf').addEventListener('click', function () { ensureExportLibs().then(exportPdf).catch(function () { showToast('导出组件加载失败，请检查网络'); }); });

    // 尺寸监听
    if (window.ResizeObserver) {
      new ResizeObserver(function () { requestAnimationFrame(sizeStage); }).observe(stage);
    } else {
      window.addEventListener('resize', sizeStage);
    }
  }

  // ---------- 启动 ----------
  function init() {
    bindEvents();
    if (DEBUG_MODE) initDebug();
    // 模式：有记录直接应用，没有则弹选择层（选择层浮于引导弹窗之上）
    renderModeCards();
    const savedMode = loadSavedMode();
    if (savedMode) applyMode(savedMode, false);
    else showModeSelect();
    applyModeText();
    const restored = loadState();
    if (!state.products.length) state.products = [defaultProduct()];
    booted = true;
    if (!state.products.length) state.products = [defaultProduct()];
    rebuildSlides(true);
    renderProductList();
    window.TMPLRender.ensureFonts().then(function () {
      sizeStage();
      sizeModalTags(); // 字体就绪后刷新模板库缩略图的字号自适应
    });

    if (!restored) {
      // 首次访问：弹窗引导 选行业 → 选模板
      renderIndustryModal();
      openModal($('modalIndustry'));
    }
  }

  init();
})();
