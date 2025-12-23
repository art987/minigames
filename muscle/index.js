/* ================= 工具 ================= */
const $ = s => document.querySelector(s);
function highlight(txt){
  const q = $('#search').value.trim();
  if(!q) return txt;
  return txt.replace(new RegExp(`(${q})`,'gi'),'<mark>$1</mark>');
}

/* ================= 渲染左侧导航 ================= */
function buildNav(){
  const nav = $('#nav');
  nav.innerHTML = '';
  const parts = [...new Set(muscleData.map(m=>m.part))];
  parts.forEach(p=>{
    nav.insertAdjacentHTML('beforeend', `<div class="nav-part">${p}</div>`);
    const groups = [...new Set(muscleData.filter(m=>m.part===p).map(m=>m.group))];
    groups.forEach(g=>{
      const id = `${p}-${g}`.replace(/\s+/g,'');
      nav.insertAdjacentHTML('beforeend', `<div class="nav-group" data-goto="${id}">${g}</div>`);
    });
  });
  // 点击导航 -> 平滑滚动 + 发光
  nav.addEventListener('click',e=>{
    if(e.target.classList.contains('nav-group')){
      const id = e.target.dataset.goto;
      const target = document.getElementById(id);
      if(target){
        // 更新导航菜单的active状态
        document.querySelectorAll('.nav-group').forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        
        // 计算目标位置，确保肌群标题滚动到部位标题正下方（最顶部可见位置）
        const headerHeight = 44; // 顶部固定导航高度
        const partTitleHeight = 32; // part-title高度（sticky定位在header下方）
        const targetOffset = target.offsetTop;
        const scrollPosition = targetOffset - headerHeight - partTitleHeight; // 精确计算，肌群标题紧贴部位标题下方
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        
        // 自动滚动导航使当前项居中显示（垂直方向中间位置）
        const navEl = document.querySelector('.nav');
        const navHeight = navEl.clientHeight;
        const targetHeight = e.target.offsetHeight;
        const targetOffsetTop = e.target.offsetTop;
        const desiredScrollTop = targetOffsetTop - (navHeight / 2) + (targetHeight / 2);
        navEl.scrollTo({
          top: Math.max(0, desiredScrollTop),
          behavior: 'smooth'
        });
        
        // 肌群标题应用指定的红色样式并保持3秒
        target.style.background = '#ffffffff';
        target.style.color = '#f40505ff';
        target.style.padding = '7px 12px';
        target.style.fontSize = '17px';
        
        // 3秒后通过动画渐变恢复原本样式
        setTimeout(()=>{
          target.style.background = '#f7f7f7';
          target.style.color = '#1b1b1b';
          target.style.padding = '7px 12px';
          target.style.fontSize = '17px';
        }, 2000);
      }
    }
  });
}

/* ================= 主列表（含锚点） ================= */
function render(list){
  const box = $('#list');
  box.innerHTML = '';
  const parts = [...new Set(list.map(m=>m.part))];
  parts.forEach(p=>{
    box.insertAdjacentHTML('beforeend',`<div class="part-title">${p}</div>`);
    const groups = [...new Set(list.filter(m=>m.part===p).map(m=>m.group))];
    groups.forEach(g=>{
      const id = `${p}-${g}`.replace(/\s+/g,'');
      box.insertAdjacentHTML('beforeend',`<div class="group-title" id="${id}">${g}</div>`);
      list.filter(m=>m.part===p && m.group===g).forEach(m=>{
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-head">
            <span class="muscle">${highlight(m.name)}</span>
            <span class="meta">${m.part} · ${m.group}</span>
          </div>
          <div class="row">
            <span class="label">起止点</span>
            <span><span class="start">${highlight(m.start)}</span> → <span class="end">${highlight(m.end)}</span></span>
          </div>
          <div class="action">${highlight(m.action)}</div>`;
        box.appendChild(card);
      });
    });
  });
}

/* ================= 滚动高亮 & 导航自动居中 ================= */
let navGroups = [];
let navHeight = 0;
let groupTitles = [];

function initScrollSpy(){
  navGroups = Array.from(document.querySelectorAll('.nav-group'));
  navHeight = document.querySelector('.nav').clientHeight;
  groupTitles = Array.from(document.querySelectorAll('.group-title'));
  
  window.addEventListener('scroll',()=>{
    updateActiveNavOnScroll();
  });
}

function updateActiveNavOnScroll(){
  const scrollPosition = window.scrollY + 120; // 考虑固定头部高度
  let activeId = '';
  let lastTitleOffset = 0;
  
  // 找到当前最可见的肌群标题
  groupTitles.forEach(gt => {
    const titleOffset = gt.offsetTop;
    if (scrollPosition >= titleOffset - 50 && titleOffset >= lastTitleOffset) {
      activeId = gt.id;
      lastTitleOffset = titleOffset;
    }
  });
  
  if(activeId) setActiveNav(activeId);
}

function setActiveNav(id){
  // 更新导航菜单的active状态
  navGroups.forEach(el=>el.classList.remove('active'));
  const target = document.querySelector(`.nav-group[data-goto="${id}"]`);
  if(target){
    target.classList.add('active');
    // 自动滚动导航使当前项居中显示（垂直方向中间位置）
    const navEl = document.querySelector('.nav');
    const navHeight = navEl.clientHeight;
    const targetHeight = target.offsetHeight;
    const targetOffsetTop = target.offsetTop;
    const desiredScrollTop = targetOffsetTop - (navHeight / 2) + (targetHeight / 2);
    navEl.scrollTo({
      top: Math.max(0, desiredScrollTop),
      behavior: 'smooth'
    });
  }
}

/* ================= 搜索 ================= */
$('#search').addEventListener('input',e=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q) return render(muscleData);
  const filtered = muscleData.filter(m=>
    m.name.toLowerCase().includes(q) ||
    m.part.toLowerCase().includes(q) ||
    m.group.toLowerCase().includes(q) ||
    m.action.toLowerCase().includes(q)
  );
  render(filtered);
});

/* ================= 初始化 ================= */
buildNav();
render(muscleData);
initScrollSpy();