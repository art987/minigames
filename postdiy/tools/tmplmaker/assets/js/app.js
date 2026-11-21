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

  // ---------- 状态 ----------
  let state = {
    industry: 'vegetable',
    templateId: 'V09',
    products: [],
    index: 0
  };

  function defaultProduct() {
    return {
      id: uid(),
      name: '新鲜蔬菜',
      price: '3.5',
      unit: '元/斤'
    };
  }

  let uidSeed = Date.now();
  function uid() { return 'p' + (uidSeed++).toString(36); }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (!saved || !Array.isArray(saved.products) || !saved.products.length) return false;
      if (!window.TMPLRender.tplById(saved.templateId)) return false;
      state.industry = saved.industry || 'vegetable';
      state.templateId = saved.templateId;
      state.products = saved.products.map(function (p) {
        return {
          id: p.id || uid(),
          name: String(p.name || ''),
          price: String(p.price || ''),
          unit: String(p.unit || '')
        };
      });
      state.index = Math.min(saved.index || 0, state.products.length - 1);
      return true;
    } catch (e) { return false; }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* 忽略 */ }
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
        '<span class="i-label">' + ind.label + '</span>' +
        '<span class="i-desc">' + ind.desc + '</span>';
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
    const grid = $('templateGrid');
    grid.innerHTML = '';
    $('curIndustry').textContent = industryLabel(state.industry);
    const list = window.TMPL_TEMPLATES.filter(function (t) { return t.industry === state.industry; });
    list.forEach(function (t) {
      const card = document.createElement('div');
      card.className = 'template-card' + (t.id === state.templateId ? ' active' : '');

      const label = document.createElement('span');
      label.className = 't-name';
      label.textContent = t.id + ' ' + t.title;

      // 缩略预览：按该模板 CSS 渲染示范文字（小尺寸）
      const preview = document.createElement('div');
      preview.className = 'tpl-preview';
      preview.appendChild(window.TMPLRender.buildTag(t, { name: '商品名称', price: '9.9', unit: '元/个' }));

      const use = document.createElement('button');
      use.type = 'button';
      use.className = 'tpl-use';
      use.textContent = t.id === state.templateId ? '✓ 使用中' : '选 择';
      use.addEventListener('click', function () {
        const changed = state.templateId !== t.id;
        state.templateId = t.id;
        saveState();
        if (changed) rebuildSlides(true);
        closeModal($('modalTemplate'));
        showToast('已使用模板 ' + t.id + ' ' + t.title);
      });

      card.appendChild(label);
      card.appendChild(preview);
      card.appendChild(use);
      grid.appendChild(card);
    });
    sizeModalTags();
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
    renderTemplateModal();
    openModal($('modalTemplate'));
    requestAnimationFrame(sizeModalTags);
  }

  function industryLabel(id) {
    const ind = window.TMPL_INDUSTRIES.find(function (i) { return i.id === id; });
    return ind ? ind.label : '';
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
    nameInput.placeholder = '商品名称';
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
    return { id: uid(), name: '', price: '', unit: window.TMPL_UNITS[0] };
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
    editOneDraft = { name: p.name, price: p.price, unit: p.unit };
    $('editOneBadge').textContent = '第 ' + (idx + 1) + ' 条';
    $('editOneName').value = editOneDraft.name;
    $('editOnePrice').value = editOneDraft.price;
    const slot = $('editOneUnitSlot');
    slot.innerHTML = '';
    slot.appendChild(buildUnitField(editOneDraft));
    $('editOneNameCount').textContent = (editOneDraft.name || '').length + ' / 15';
    $('editOneNameClear').classList.toggle('hidden', !(editOneDraft.name || '').length);
    openModal($('modalEditOne'));
    requestAnimationFrame(function () { $('editOneName').focus(); });
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
    btnAdd.textContent = '＋ 添加商品';
    btnAdd.addEventListener('click', openQuickAdd);

    const btnManage = document.createElement('button');
    btnManage.type = 'button';
    btnManage.className = 'empty-btn';
    btnManage.textContent = '商品管理';
    btnManage.addEventListener('click', openManage);

    btns.appendChild(btnAdd);
    btns.appendChild(btnManage);

    tag.appendChild(label);
    tag.appendChild(btns);
    slide.appendChild(tag);
    return slide;
  }

  function rebuildSlides(keepIndex) {
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
    // 手机端降低侧卡偏移比例（否则超出 stage 被裁）
    const side1 = window.innerWidth <= 768 ? 55 : 72;   // 相邻卡偏移%
    const side2 = window.innerWidth <= 768 ? 90 : 130;  // 远端卡偏移%
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
    //   翻页按钮：左44 + 右44 + 边距
    const navBtnSize = isMobile ? 44 : 50;
    const navMargin = isMobile ? 6 : 10;
    const navTotal = (navBtnSize + navMargin) * 2; // 两侧合计

    // 两侧露出小卡占用的水平空间
    //   相邻卡 translateX(side1%) scale(0.8) ≈ side1% * 0.8
    const sidePct = isMobile ? 0.55 * 0.8 : 0.72 * 0.8; // 相邻卡
    //   两侧都有 → 2 * sidePct
    const sideSpacePct = sidePct * 2;

    // frameW 必须满足：navTotal + frameW * (1 + sideSpacePct) <= W
    // → frameW <= (W - navTotal) / (1 + sideSpacePct)
    const availW = Math.max(120, (W - navTotal) / (1 + sideSpacePct));
    // 垂直方向：stage padding 已预留底部操作栏空间，这里按可用高度算
    const availH = Math.max(150, H - (isMobile ? 80 : 128));

    // A4 比例约束
    let frameH = Math.min(availH, (availW * 297) / 210);
    let frameW = (frameH * 210) / 297;

    // 手机端上限 — 不要大到超出屏幕
    if (isMobile) {
      const maxW = Math.min(window.innerWidth - 24, 360);
      if (frameW > maxW) { frameW = maxW; frameH = (frameW * 297) / 210; }
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
    const name = (p.name || '价签').replace(/[\\/:*?"<>|\s]/g, '');
    return t.id + '_' + name;
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
    const tag = activeTag();
    if (!tag) return;
    if (!window.jspdf) { showToast('PDF 组件尚未加载完成，请稍后重试'); return; }
    const btn = $('btnPdf');
    btn.disabled = true;
    try {
      const canvas = await window.TMPLRender.captureTag(tag, 2480);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'fast');
      pdf.save(fileBase() + '.pdf');
      showToast('PDF 已下载（A4）');
    } catch (e) {
      showToast('导出失败：' + (e && e.message ? e.message : e));
    } finally {
      btn.disabled = false;
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

  const DEBUG_TARGETS = { name: '.ptag-name', num: '.ptag-num', unit: '.ptag-unit', slogan: '.ptag-slogan' };
  const DEBUG_LABELS = { name: '商品名称', num: '价格数字', unit: '计价单位', slogan: '宣传语' };
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
    if (key === 'name' || key === 'slogan') {
      o[key] = {
        left: toMm(tag, v.left), top: toMm(tag, v.top),
        color: v.color, fontFamily: v.fontVar, fontWeight: v.fontWeight,
        fontSize: toMm(tag, v.fontSize)
      };
    } else {
      o[key] = {
        color: v.color, fontFamily: v.fontVar, fontWeight: v.fontWeight,
        fontSize: toMm(tag, v.fontSize)
      };
      o.price = { left: toMm(tag, v.priceLeft), top: toMm(tag, v.priceTop) };
    }
    saveDebugOverrides();
  }

  function dbgGenCss(key, tag) {
    const tpl = '[data-tpl="' + tag.dataset.tpl + '"]';
    const out = ['/* 模板 ' + tag.dataset.tpl + ' · 全部规则（复制后覆盖 assets/css/templates/ 对应文件中的同名规则） */'];
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
        'font-weight: ' + v.fontWeight + ';'
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

    const name = dbgCollect('name', tag);
    rule(tpl + ' .ptag-name', box(name, [
      'color: ' + name.color + ';',
      name.fontVar ? 'font-family: ' + name.fontVar + ';' : '',
      'font-size: ' + toMm(tag, name.fontSize) + ';',
      'font-weight: ' + name.fontWeight + ';',
      'letter-spacing: ' + toMm(tag, name.letterSpacing) + ';'
    ]));

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

    const slEl = tag.querySelector('.ptag-slogan');
    if (slEl) {
      const sl = dbgCollect('slogan', tag);
      rule(tpl + ' .ptag-slogan', box(sl, [
        'color: ' + sl.color + ';',
        sl.fontVar ? 'font-family: ' + sl.fontVar + ';' : '',
        'font-size: ' + toMm(tag, sl.fontSize) + ';',
        'font-weight: ' + sl.fontWeight + ';'
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
    $('dbgSize').value = mmOf(dbgTag, v.fontSize);
    $('dbgWeight').value = ['400', '700', '900'].indexOf(v.fontWeight) >= 0 ? v.fontWeight : '400';
    $('dbgColor').value = v.color;
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
    if (dbgKey === 'num' || dbgKey === 'unit') {
      if (isFinite(L)) v.priceLeft = L * mm;
      if (isFinite(T)) v.priceTop = T * mm;
    } else {
      if (isFinite(L)) v.left = L * mm;
      if (isFinite(T)) v.top = T * mm;
    }
    if (isFinite(S) && S > 0) v.fontSize = S * mm;
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
     ['dbgLeft', 'input'], ['dbgTop', 'input']].forEach(function (pair) {
      $(pair[0]).addEventListener(pair[1], dbgGen);
    });
    $('dbgClose').addEventListener('click', function () {
      $('debugPanel').classList.add('hidden');
    });
    $('dbgCopy').addEventListener('click', function () {
      const css = $('dbgCss').value;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(css).then(function () { showToast('CSS 已复制'); });
      } else {
        $('dbgCss').select();
        document.execCommand('copy');
        showToast('CSS 已复制');
      }
    });
    $('dbgReset').addEventListener('click', function () {
      if (!dbgTag) return;
      delete window.TMPL_DEBUG_OVERRIDES[dbgTag.dataset.tpl];
      saveDebugOverrides();
      slides.querySelectorAll('.ptag').forEach(function (t) {
        if (t.dataset.tpl === dbgTag.dataset.tpl) {
          t.querySelectorAll('.ptag-name, .ptag-num, .ptag-unit, .ptag-slogan, .ptag-price').forEach(function (el) {
            el.removeAttribute('style');
          });
          // 背景图是内联样式，恢复它
          const tpl = window.TMPLRender.tplById(t.dataset.tpl);
          t.style.backgroundImage = 'url("' + tpl.bg + '")';
          window.TMPLRender.fitTag(t);
        }
      });
      dbgFillInputs();
      dbgGen();
      showToast('已恢复模板默认样式');
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
        saveState();
        schedulePreview();
        showToast('已保存');
      }
      editOneDraft = null;
      hideNumKey();
      hideUnitKey();
      closeModal($('modalEditOne'));
    });

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
    $('btnPng').addEventListener('click', exportPng);
    $('btnPdf').addEventListener('click', exportPdf);

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
    const restored = loadState();
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
