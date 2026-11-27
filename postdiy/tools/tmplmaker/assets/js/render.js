/**
 * 价签工坊 - DOM 渲染引擎
 * 价签用 DOM + CSS 渲染（每个模板一份独立 CSS），方便直接调整查看效果；
 * 仅在下载时通过 html2canvas 把 DOM 价签栅格化为高分辨率画布。
 */
(function () {
  'use strict';

  const FONT_KAI = '"Alimama DongFang DaKai"';
  const FONT_DOUYIN = '"Douyin Sans Bold"';

  // ---------- 字体就绪 ----------
  let fontsPromise = null;
  function ensureFonts() {
    if (!fontsPromise) {
      fontsPromise = Promise.all([
        document.fonts.load('34px ' + FONT_KAI, '新鲜蔬菜元斤'),
        document.fonts.load('120px ' + FONT_DOUYIN, '3.5'),
        document.fonts.load('34px "ZCOOL KuaiLe"', '新鲜蔬菜元斤'),
        document.fonts.load('34px "Noto Serif SC"', '新鲜蔬菜元斤'),
        document.fonts.ready
      ]).catch(function () { /* 字体加载失败则回退系统字体 */ });
    }
    return fontsPromise;
  }

  // ---------- 模板查找 ----------
  function tplById(id) {
    return window.TMPL_TEMPLATES.find(function (t) { return t.id === id; })
      || window.TMPL_TEMPLATES[0];
  }

  // ---------- 渲染模式（价格标签 / 二维码展示牌） ----------
  // app.js 在切换模式时调用 setMode；buildTag 按此决定渲染价格区还是二维码区
  let renderMode = 'price';
  function setMode(id) { renderMode = id === 'qr' ? 'qr' : 'price'; }

  // ---------- 构建价签 DOM ----------
  /**
   * @param tpl  模板元数据 {id, title, bg, industry}
   * @param data {name, price, unit, slogan, sloganEnabled} 或 qr 模式 {name, qr, slogan}
   * @returns .ptag 元素（样式由 data-tpl 匹配的模板 CSS 控制）
   */
  function buildTag(tpl, data) {
    const isQr = renderMode === 'qr';
    const tag = document.createElement('div');
    tag.className = 'ptag';
    tag.dataset.tpl = tpl.id;
    tag.style.backgroundImage = 'url("' + tpl.bg + '")';

    const name = document.createElement('div');
    // qr 模式加 ptag-qr-name：吃模板 CSS 里的二维码专属复制块（复制自价签样式，可独立微调）
    name.className = isQr ? 'ptag-name ptag-qr-name' : 'ptag-name';
    name.textContent = (data.name || '').trim();

    tag.appendChild(name);

    if (isQr) {
      // 二维码展示牌：白底容器 + 上传的二维码图（未上传时显示占位）
      const qr = document.createElement('div');
      qr.className = 'ptag-qr';
      if (data.qr) {
        const img = document.createElement('img');
        img.className = 'ptag-qr-img';
        img.alt = '二维码';
        img.src = data.qr;
        qr.appendChild(img);
      } else {
        const ph = document.createElement('div');
        ph.className = 'ptag-qr-ph';
        ph.textContent = '二维码';
        qr.appendChild(ph);
      }
      tag.appendChild(qr);
    } else {
      const price = document.createElement('div');
      price.className = 'ptag-price';
      const num = document.createElement('span');
      num.className = 'ptag-num';
      const numText = (data.price || '').trim();
      const dotIdx = numText.indexOf('.');
      if (dotIdx >= 0) {
        // 小数部分（点+小数位）减半显示，并与整数顶对齐
        num.textContent = numText.slice(0, dotIdx);
        const dec = document.createElement('span');
        dec.className = 'ptag-num-dec';
        dec.textContent = numText.slice(dotIdx);
        num.appendChild(dec);
      } else {
        num.textContent = numText;
      }
      const unit = document.createElement('span');
      unit.className = 'ptag-unit';
      const unitText = (data.unit || '').trim();
      if (!unitText) unit.classList.add('hidden');
      // 竖排：逐字堆叠，"/" 压扁成浅斜线，不做旋转
      unitText.split('').forEach(function (ch) {
        const c = document.createElement('span');
        c.className = ch === '/' ? 'u-char u-slash' : 'u-char';
        c.textContent = ch;
        unit.appendChild(c);
      });
      if (!num.textContent) num.classList.add('hidden');
      price.appendChild(num);
      price.appendChild(unit);
      tag.appendChild(price);
    }

    // 宣传口号（qr 模式用扫码副文案池）：
    // 产品自选口号 > 模板/模式口号池（每次渲染随机取一条） > 空
    const qrPools = window.TMPL_QR_SLOGAN_POOLS || {};
    const sloganPool = isQr
      ? (qrPools[tpl.industry] || qrPools.common || [])
      : ((tpl.slogans && tpl.slogans.length) ? tpl.slogans
        : ((window.TMPL_SLOGAN_POOLS || {})[tpl.industry] || []));
    const defaultSlogan = sloganPool.length
      ? sloganPool[Math.floor(Math.random() * sloganPool.length)]
      : '';
    const sloganText = String((data && data.slogan) || defaultSlogan || '').trim();
    const slogan = document.createElement('div');
    slogan.className = isQr ? 'ptag-slogan ptag-qr-slogan' : 'ptag-slogan';
    slogan.textContent = sloganText;
    if (!sloganText) slogan.classList.add('hidden');
    tag.appendChild(slogan);

    return tag;
  }

  // ---------- 自适应（字号随盒宽缩放，超长自动缩小） ----------
  function fitBox(el, opts) {
    opts = opts || {};
    const computed = parseFloat(getComputedStyle(el).fontSize);
    if (!isFinite(computed) || computed <= 0) return;
    let size = computed;
    const min = computed * (opts.minRatio || 0.42);
    let guard = 60;
    while (guard--) {
      const overflowW = el.scrollWidth > el.clientWidth + 0.5;
      const overflowH = opts.checkHeight ? el.scrollHeight > el.clientHeight + 0.5 : false;
      if (!overflowW && !overflowH) break;
      if (size <= min) { el.style.fontSize = min + 'px'; return; }
      size = Math.max(min, size * 0.94);
      el.style.fontSize = size + 'px';
    }
  }

  /** 价格组合：价格与单位一起收缩 */
  function fitPrice(tag) {
    const box = tag.querySelector('.ptag-price');
    if (!box || box.classList.contains('hidden')) return;
    const num = box.querySelector('.ptag-num');
    const unit = box.querySelector('.ptag-unit');
    let guard = 60;
    while (guard--) {
      const fitsW = box.scrollWidth <= box.clientWidth + 0.5;
      const fitsH = box.scrollHeight <= box.clientHeight + 0.5;
      if (fitsW && fitsH) return;
      const numSize = parseFloat(getComputedStyle(num).fontSize);
      const unitSize = parseFloat(getComputedStyle(unit).fontSize);
      const baseNum = parseFloat(num.dataset.baseSize || numSize);
      const baseUnit = parseFloat(unit.dataset.baseSize || unitSize);
      const minNum = baseNum * 0.38;
      if (numSize <= minNum) return;
      num.style.fontSize = Math.max(minNum, numSize * 0.94) + 'px';
      if (unit && !unit.classList.contains('hidden')) {
        unit.style.fontSize = Math.max(baseUnit * 0.38, unitSize * 0.94) + 'px';
      }
    }
  }

  /** 尺寸变化后调用：重置内联字号并重新自适应 */
  function fitTag(tag) {
    const name = tag.querySelector('.ptag-name');
    const slogan = tag.querySelector('.ptag-slogan');
    const num = tag.querySelector('.ptag-num');
    const unit = tag.querySelector('.ptag-unit');
    // 商品名称：统一规则——区域高度 = 画布高的 20%，文字垂直居中。
    // 一行/两行/三行都以区域中线对称展开（用 % 高度，导出放大时自动等比）
    if (name) {
      name.style.fontSize = '';
      name.style.maxHeight = '';
      name.style.height = '20%';
      name.style.alignItems = 'center';
    }
    if (slogan) { slogan.style.fontSize = ''; fitBox(slogan); }
    if (num) num.style.fontSize = '';
    if (unit) unit.style.fontSize = '';
    // 记录基准字号，供 fitPrice 迭代
    if (num) num.dataset.baseSize = parseFloat(getComputedStyle(num).fontSize);
    if (unit) unit.dataset.baseSize = parseFloat(getComputedStyle(unit).fontSize);
    fitPrice(tag);
    applyDebugOverrides(tag);
  }

  // ---------- 调试：应用模板参数调整（app.js 调试面板写入的覆盖值） ----------
  function applyDebugOverrides(tag) {
    if (!window.TMPL_DEBUG_ENABLED) return;
    const o = (window.TMPL_DEBUG_OVERRIDES || {})[tag.dataset.tpl];
    if (!o) return;
    const map = { name: '.ptag-name', num: '.ptag-num', unit: '.ptag-unit', slogan: '.ptag-slogan', qr: '.ptag-qr', qrimg: '.ptag-qr-img' };
    Object.keys(map).forEach(function (key) {
      const el = tag.querySelector(map[key]);
      const st = o[key];
      if (el && st) {
        Object.keys(st).forEach(function (p) { el.style[p] = st[p]; });
      }
    });
    const price = tag.querySelector('.ptag-price');
    if (price && o.price) {
      Object.keys(o.price).forEach(function (p) { price.style[p] = o.price[p]; });
    }
  }

  // ---------- 导出（html2canvas） ----------
  /** 获取背景图自然尺寸 */
  function loadImgNatural(src) {
    return new Promise(function (res) {
      const img = new Image();
      img.onload = function () { res({ w: img.naturalWidth, h: img.naturalHeight }); };
      img.onerror = function () { res({ w: 0, h: 0 }); };
      img.src = src;
    });
  }

  async function captureTag(tag, targetWidth) {
    await ensureFonts();
    const w = tag.offsetWidth;
    if (!w) throw new Error('价签尚未完成布局');

    // 1. 取背景图自然尺寸
    const bgMatch = (tag.style.backgroundImage || '').match(/url\(["']?(.+?)["']?\)/);
    let naturalW = 0, naturalH = 0;
    if (bgMatch) {
      const nat = await loadImgNatural(bgMatch[1]);
      naturalW = nat.w; naturalH = nat.h;
    }
    const finalW = naturalW > 0 ? Math.min(targetWidth, naturalW) : targetWidth;
    const finalH = Math.round(tag.offsetHeight * (finalW / w));
    const scale = finalW / w;

    // 2. clone 原始 .ptag，放大到导出尺寸
    //    - CSS 规则里的 calc(var(--mm)*N)：html2canvas 的 iframe 能正确解析 → 不用管
    //    - 但 fitTag/fitPrice/调试面板写进 inline style 的"屏幕尺寸绝对 px"
    //      不会跟着 --mm 缩放 → 必须逐个乘以 scale（这是之前字变小的根因）
    const clone = tag.cloneNode(true);
    clone.querySelectorAll('.ptag-badge, .ptag-ops, .ptag-edit, .ptag-del, .empty-label, .empty-btns, .empty-btn')
      .forEach(function (el) { el.remove(); });

    clone.style.width = finalW + 'px';
    clone.style.height = finalH + 'px';
    clone.style.setProperty('--mm', (finalW / 210) + 'px');
    clone.style.backgroundSize = finalW + 'px ' + finalH + 'px';
    clone.style.backgroundPosition = 'left top';
    clone.style.backgroundRepeat = 'no-repeat';

    // 3. 遍历 clone 的后代元素，把内联样式里的绝对 px 长度值乘以 scale
    //    注意：只处理"后代"，clone 根节点的 width/height/backgroundSize 刚设好不能再被放大
    const LEN_PROPS = ['font-size', 'left', 'top', 'right', 'bottom', 'width', 'height',
      'letter-spacing', 'line-height', 'gap', 'column-gap', 'row-gap',
      'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'border-width', 'border-radius'];
    const pxRe = /^-?[\d.]+px$/;
    clone.querySelectorAll('*').forEach(function (el) {
      const inline = el.getAttribute('style');
      if (!inline || inline.indexOf('px') === -1) return;
      LEN_PROPS.forEach(function (prop) {
        const v = el.style.getPropertyValue(prop);
        if (v && pxRe.test(v.trim())) {
          el.style.setProperty(prop, (parseFloat(v) * scale) + 'px');
        }
      });
      // 内联的 calc() 保持原样 —— html2canvas iframe 会用放大后的 --mm 解析
    });

    // 4. 挂到离屏 wrapper 截图
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;left:-99999px;top:0;width:' + finalW + 'px;height:' + finalH + 'px;'
      + 'background:#ffffff;overflow:visible;';
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    try {
      const canvas = await window.html2canvas(wrapper, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: finalW,
        height: finalH,
        windowWidth: finalW
      });
      return canvas;
    } finally {
      document.body.removeChild(wrapper);
    }
  }

  window.TMPLRender = {
    ensureFonts: ensureFonts,
    tplById: tplById,
    buildTag: buildTag,
    fitTag: fitTag,
    applyDebugOverrides: applyDebugOverrides,
    captureTag: captureTag,
    setMode: setMode
  };
})();
