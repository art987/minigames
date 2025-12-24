/* ================= 工具 ================= */
const $ = s => document.querySelector(s);
function highlight(txt){
  const q = $('#search').value.trim();
  if(!q) return txt;
  return txt.replace(new RegExp(`(${q})`,'gi'),'<mark>$1</mark>');
}

// 全局变量跟踪当前选中的肌群
let currentActiveGroup = null;
// 全局变量跟踪当前滚动激活的肌群标题
let currentScrollActiveGroup = null;

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
  // 为每个导航项单独绑定点击事件
  const navGroups = document.querySelectorAll('.nav-group');
  navGroups.forEach(navItem => {
    navItem.addEventListener('click', () => {
      const id = navItem.dataset.goto;
      const target = document.getElementById(id);
      if(target){
        // 更新导航菜单的active状态
        navGroups.forEach(el => el.classList.remove('active'));
        navItem.classList.add('active');
        
        // 最简单可靠的滚动方法：使用offsetTop
        const headerHeight = 44; // 固定头部高度
        const partTitleHeight = 32; // 部位标题高度
        const containerOffset = 8; // 分组容器向下偏移量，避免被部位标题挡住
        
        // 直接使用offsetTop计算滚动位置，添加8像素向下偏移
        const scrollPosition = target.offsetTop - headerHeight - partTitleHeight - containerOffset;
        

        
        // 直接滚动到目标位置
        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
        
        // 如果之前有选中的肌群，恢复其原本样式
        if(currentActiveGroup && currentActiveGroup !== target){
          currentActiveGroup.style.background = 'linear-gradient(135deg, #000000 0%, #aeaeae 100%)';
          currentActiveGroup.style.color = '#ffffffff';
          currentActiveGroup.style.padding = '12px 16px';
          currentActiveGroup.style.fontSize = '16px';
          currentActiveGroup.style.borderRadius = '10px 10px 0 0';
        }
        
        // 应用新的选中样式
        target.style.background = 'linear-gradient(135deg, #f90e0e 0%, #ae68f6 100%)';
        target.style.color = '#ffffff';
        target.style.padding = '12px 16px';
        target.style.fontSize = '16px';
        target.style.borderRadius = '10px 10px 0 0';
        
        // 更新当前选中的肌群
        currentActiveGroup = target;
        
        // 自动滚动导航使当前项居中显示
        const navEl = document.querySelector('.nav');
        const navHeight = navEl.clientHeight;
        const targetHeight = navItem.offsetHeight;
        const targetOffsetTop = navItem.offsetTop;
        const desiredScrollTop = targetOffsetTop - (navHeight / 2) + (targetHeight / 2);
        navEl.scrollTo({
          top: Math.max(0, desiredScrollTop),
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ================= 主列表（含锚点） ================= */
function render(list){
  const box = $('#list');
  box.innerHTML = '';
  const parts = [...new Set(list.map(m=>m.part))];
  parts.forEach(p=>{
    box.insertAdjacentHTML('beforeend',`<div class="part-title">${p}</div>`);
    // 保持肌群在数据中的原始顺序
    const groups = [];
    const seenGroups = new Set();
    list.filter(m=>m.part===p).forEach(m=>{
      if(!seenGroups.has(m.group)){
        seenGroups.add(m.group);
        groups.push(m.group);
      }
    });
    groups.forEach(g=>{
      const id = `${p}-${g}`.replace(/\s+/g,'');
      // 创建肌群分组容器
      const groupContainer = document.createElement('div');
      groupContainer.className = 'group-container';
      groupContainer.innerHTML = `<div class="group-title" id="${id}">${g}</div>`;
      
      // 创建肌肉卡片容器
      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'cards-container';
      
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
        cardsContainer.appendChild(card);
      });
      
      groupContainer.appendChild(cardsContainer);
      box.appendChild(groupContainer);
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
    
    // 更新肌群标题样式
    const groupTitle = document.getElementById(id);
    if(groupTitle && groupTitle !== currentScrollActiveGroup){
      // 恢复之前滚动激活的肌群标题样式
      if(currentScrollActiveGroup){
        currentScrollActiveGroup.style.background = 'linear-gradient(135deg, #000000 0%, #aeaeae 100%)';
        currentScrollActiveGroup.style.color = '#ffffffff';
        currentScrollActiveGroup.style.padding = '12px 16px';
        currentScrollActiveGroup.style.fontSize = '16px';
        currentScrollActiveGroup.style.borderRadius = '10px 10px 0 0';
      }
      
      // 应用新的滚动激活样式
      groupTitle.style.background = 'linear-gradient(135deg, #f90e0e 0%, #ae68f6 100%)';
      groupTitle.style.color = '#ffffff';
      groupTitle.style.padding = '12px 16px';
      groupTitle.style.fontSize = '16px';
      groupTitle.style.borderRadius = '10px 10px 0 0';
      
      // 更新当前滚动激活的肌群标题
      currentScrollActiveGroup = groupTitle;
    }
    
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