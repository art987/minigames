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
  const prodCount = $('prodCount');
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
    $('templateGridTitle').textContent =
      '选择模板 · ' + industryLabel(state.industry) + '（' + list.length + ' 款）';
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

  /** 构建商品编辑卡片（商品管理弹窗与添加商品弹窗共用） */
  function buildProductCard(p, onCopy, onDelete) {
    const card = document.createElement('div');
    card.className = 'p-card';
    card.dataset.id = p.id;

    // 行1：名称 + 价格 + 计价单位
    const grid = document.createElement('div');
    grid.className = 'p-grid';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.maxLength = 15;
    nameInput.placeholder = '商品名称';
    nameInput.value = p.name;
    nameInput.addEventListener('input', function () {
      p.name = nameInput.value;
      saveState();
      schedulePreview();
    });
    const priceInput = document.createElement('input');
    priceInput.type = 'text';
    priceInput.inputMode = 'decimal';
    priceInput.placeholder = '价格';
    priceInput.value = p.price;
    priceInput.addEventListener('input', function () {
      const cleaned = sanitizePrice(priceInput.value);
      if (cleaned !== priceInput.value) priceInput.value = cleaned;
      p.price = cleaned;
      saveState();
      schedulePreview();
    });
    grid.appendChild(nameInput);
    grid.appendChild(priceInput);
    grid.appendChild(buildUnitField(p));

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
      list.appendChild(buildProductCard(p,
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
      list.appendChild(buildProductCard(p,
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
    confirmDialog('确定删除「' + (p.name || '未命名') + '」吗？删除后不可恢复', function (ok) {
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
    // 价签右上角删除按钮：点击弹确认后删除该商品
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'ptag-del';
    del.textContent = '×';
    del.title = '删除这条商品';
    del.addEventListener('click', function (e) {
      e.stopPropagation();
      deleteProduct(i);
    });
    tag.appendChild(del);
    slide.appendChild(tag);
    return slide;
  }

  function rebuildSlides(keepIndex) {
    const idx = keepIndex ? Math.min(state.index, state.products.length - 1) : state.index;
    slides.innerHTML = '';
    state.products.forEach(function (p, i) { slides.appendChild(buildSlide(p, i)); });
    state.index = Math.max(0, idx);
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
  }

  /** 卡片堆叠式布局：中间大卡，两侧露出缩小的小卡 */
  function layoutSlides(instant) {
    slides.classList.toggle('no-anim', !!instant);
    const children = slides.children;
    for (let i = 0; i < children.length; i++) {
      const off = i - state.index;
      const el = children[i];
      let transform = 'translateX(0) scale(1)';
      let opacity = 0;
      let zIndex = 0;
      if (off === 0) {
        opacity = 1; zIndex = 10;
      } else if (Math.abs(off) === 1) {
        transform = 'translateX(' + (off * 72) + '%) scale(0.8)';
        opacity = 0.85; zIndex = 5;
      } else if (Math.abs(off) === 2) {
        transform = 'translateX(' + (off * 130) + '%) scale(0.62)';
        opacity = 0.45; zIndex = 2;
      } else {
        transform = 'translateX(' + (off * 130) + '%) scale(0.62)';
      }
      el.style.transform = transform;
      el.style.opacity = opacity;
      el.style.zIndex = zIndex;
      el.style.pointerEvents = off === 0 ? 'auto' : 'none';
    }
    if (instant) {
      requestAnimationFrame(function () { slides.classList.remove('no-anim'); });
    }
  }

  function goTo(i, instant) {
    state.index = Math.max(0, Math.min(i, state.products.length - 1));
    layoutSlides(instant);
    dots.querySelectorAll('.dot').forEach(function (d, di) {
      d.classList.toggle('active', di === state.index);
    });
    updatePageInfo();
    updateSide();
  }

  function updatePageInfo() {
    const p = state.products[state.index];
    pageInfo.textContent = (state.index + 1) + ' / ' + state.products.length + ' · ' + (p ? p.name : '');
    btnPrev.disabled = state.index <= 0;
    btnNext.disabled = state.index >= state.products.length - 1;
  }

  // ---------- 尺寸（A4 比例 + --mm 变量） ----------
  function sizeStage() {
    const availW = Math.max(120, stage.clientWidth - 130);
    const availH = Math.max(150, stage.clientHeight - 128);
    let frameH = Math.min(availH, (availW * 297) / 210);
    let frameW = (frameH * 210) / 297;
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
    prodCount.textContent = '共 ' + state.products.length + ' 条';
    updatePageInfo();
  }

  // ---------- 导出 ----------
  function activeTag() {
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
    if (!tag) return;
    const btn = $('btnPng');
    btn.disabled = true;
    try {
      const canvas = await window.TMPLRender.captureTag(tag, 2480);
      const blob = await new Promise(function (res) { canvas.toBlob(res, 'image/png'); });
      downloadBlob(blob, fileBase() + '.png');
      showToast('PNG 已下载（2480×3508）');
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
    ['modalIndustry', 'modalTemplate', 'modalAdd', 'modalProducts', 'modalConfirm'].forEach(function (id) { bindModalDismiss($(id)); });

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
