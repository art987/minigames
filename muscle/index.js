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
      // 获取当前肌群的媒体配置
      const currentMuscleGroup = list.find(m=>m.part===p && m.group===g);
      const hasImages = currentMuscleGroup && currentMuscleGroup.images && currentMuscleGroup.images.length > 0;
      const hasVideos = currentMuscleGroup && currentMuscleGroup.videos && currentMuscleGroup.videos.length > 0;
      
      // 创建肌群分组容器
      const groupContainer = document.createElement('div');
      groupContainer.className = 'group-container';
      groupContainer.innerHTML = `
        <div class="group-title" id="${id}">
          <span class="group-name">${g}</span>
          <div class="media-icons">
            ${hasImages ? `<span class="media-icon image-icon" data-group="${g}" data-type="images">图片</span>` : ''}
            ${hasVideos ? `<span class="media-icon video-icon" data-group="${g}" data-type="videos">视频</span>` : ''}
          </div>
        </div>`;
      
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

/* ================= 复制功能 ================= */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // 显示复制成功反馈
    showCopyFeedback(text);
  }).catch(err => {
    console.error('复制失败:', err);
    // 降级方案：使用老式复制方法
    fallbackCopyToClipboard(text);
  });
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopyFeedback(text);
    } else {
      console.error('老式复制方法失败');
    }
  } catch (err) {
    console.error('老式复制方法出错:', err);
  }
  
  document.body.removeChild(textArea);
}

function showCopyFeedback(text) {
  // 创建反馈元素
  const feedback = document.createElement('div');
  feedback.className = 'copy-feedback';
  feedback.textContent = `已复制: ${text}`;
  feedback.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 10000;
    font-size: 14px;
    animation: fadeInOut 2s ease-in-out;
  `;
  
  document.body.appendChild(feedback);
  
  // 2秒后移除反馈
  setTimeout(() => {
    if (feedback.parentNode) {
      feedback.parentNode.removeChild(feedback);
    }
  }, 2000);
}

/* ================= 媒体弹窗功能 ================= */
let currentMediaType = '';
let currentMediaGroup = '';
let currentMediaIndex = 0;
let currentMediaList = [];
let currentVideoElement = null;

// 打开媒体弹窗
function openMediaModal(group, type) {
  // 获取该肌群下所有肌肉的媒体数据
  const musclesInGroup = muscleData.filter(m => m.group === group);
  
  // 收集所有肌肉的媒体文件
  currentMediaType = type;
  currentMediaGroup = group;
  currentMediaList = [];
  
  musclesInGroup.forEach(muscle => {
    if (muscle[type] && Array.isArray(muscle[type])) {
      currentMediaList = currentMediaList.concat(muscle[type]);
    }
  });
  
  currentMediaIndex = 0;
  
  if (currentMediaList.length === 0) return;
  
  const modal = $('#mediaModal');
  const modalTitle = $('#modalTitle');
  const mediaContainer = $('#mediaContainer');
  const mediaCounter = $('#mediaCounter');
  
  modalTitle.textContent = `${group} - ${type === 'images' ? '图片' : '视频'}合集 (${currentMediaList.length}个)`;
  updateMediaDisplay();
  updateMediaCounter();
  
  modal.style.display = 'block';
}

// 更新媒体显示
function updateMediaDisplay() {
  const mediaContainer = $('#mediaContainer');
  const mediaUrl = currentMediaList[currentMediaIndex];
  
  mediaContainer.innerHTML = '';
  
  // 停止之前播放的视频
  if (currentVideoElement) {
    currentVideoElement.pause();
    currentVideoElement.currentTime = 0;
    currentVideoElement = null;
  }
  
  if (currentMediaType === 'images') {
    const img = document.createElement('img');
    img.src = mediaUrl;
    img.alt = `${currentMediaGroup} 图片 ${currentMediaIndex + 1}`;
    img.className = 'media-content';
    mediaContainer.appendChild(img);
  } else if (currentMediaType === 'videos') {
    const video = document.createElement('video');
    video.src = mediaUrl;
    video.controls = true;
    video.className = 'media-content';
    video.autoplay = true;
    mediaContainer.appendChild(video);
    currentVideoElement = video;
  }
}

// 更新媒体计数器
function updateMediaCounter() {
  const mediaCounter = $('#mediaCounter');
  mediaCounter.textContent = `${currentMediaIndex + 1} / ${currentMediaList.length}`;
}

// 上一个媒体
function prevMedia() {
  if (currentMediaList.length <= 1) return;
  currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
  updateMediaDisplay();
  updateMediaCounter();
}

// 下一个媒体
function nextMedia() {
  if (currentMediaList.length <= 1) return;
  currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
  updateMediaDisplay();
  updateMediaCounter();
}

// 关闭弹窗
function closeModal() {
  // 停止当前播放的视频
  if (currentVideoElement) {
    currentVideoElement.pause();
    currentVideoElement.currentTime = 0;
    currentVideoElement = null;
  }
  
  const modal = $('#mediaModal');
  modal.style.display = 'none';
}

// 绑定事件监听器
document.addEventListener('DOMContentLoaded', function() {
  // 肌群名称和肌肉名称点击复制事件
  document.addEventListener('click', function(e) {
    // 肌群名称复制
    if (e.target.classList.contains('group-name')) {
      const groupName = e.target.textContent;
      copyToClipboard(groupName);
      return;
    }
    
    // 肌肉名称复制
    if (e.target.classList.contains('muscle')) {
      const muscleName = e.target.textContent;
      copyToClipboard(muscleName);
      return;
    }
    
    // 媒体图标点击事件
    if (e.target.classList.contains('media-icon')) {
      const group = e.target.dataset.group;
      const type = e.target.dataset.type;
      openMediaModal(group, type);
    }
  });
  
  // 关闭按钮
  $('.close').addEventListener('click', closeModal);
  
  // 上一个按钮
  $('#prevBtn').addEventListener('click', prevMedia);
  
  // 下一个按钮
  $('#nextBtn').addEventListener('click', nextMedia);
  
  // 点击弹窗外部关闭
  $('#mediaModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
  
  // ESC键关闭
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

/* ================= 骨骼和肌肉弹窗功能 ================= */
let skeletonMediaList = [];
let skeletonMediaIndex = 0;
let skeletonVideoElement = null;
let skeletonImageElement = null;
let skeletonTouchStartX = 0;

let muscleMediaList = [];
let muscleMediaIndex = 0;
let muscleVideoElement = null;
let muscleImageElement = null;
let muscleTouchStartX = 0;

// 打开骨骼弹窗
function openSkeletonModal() {
  // 合并所有骨骼媒体文件（图片和视频混合）
  skeletonMediaList = [];
  
  // 添加图片
  if (skeletonMedia.images && Array.isArray(skeletonMedia.images)) {
    skeletonMedia.images.forEach(img => {
      skeletonMediaList.push({ type: 'image', url: img });
    });
  }
  
  // 添加视频
  if (skeletonMedia.videos && Array.isArray(skeletonMedia.videos)) {
    skeletonMedia.videos.forEach(video => {
      skeletonMediaList.push({ type: 'video', url: video });
    });
  }
  
  skeletonMediaIndex = 0;
  
  if (skeletonMediaList.length === 0) {
    alert('暂无骨骼媒体数据');
    return;
  }
  
  const modal = $('#skeletonModal');
  const modalTitle = $('#skeletonModalTitle');
  const mediaCounter = $('#skeletonMediaCounter');
  
  modalTitle.textContent = `骨骼图集 (${skeletonMediaList.length}个)`;
  updateSkeletonMediaDisplay();
  updateSkeletonMediaCounter();
  
  modal.style.display = 'block';
}

// 更新骨骼媒体显示
function updateSkeletonMediaDisplay() {
  const mediaContainer = $('#skeletonMediaContainer');
  
  mediaContainer.innerHTML = '';
  
  // 停止之前播放的视频
  if (skeletonVideoElement) {
    skeletonVideoElement.pause();
    skeletonVideoElement.currentTime = 0;
    skeletonVideoElement = null;
  }
  
  if (skeletonMediaList.length === 0) return;
  
  const currentMedia = skeletonMediaList[skeletonMediaIndex];
  
  if (currentMedia.type === 'image') {
    const img = document.createElement('img');
    img.src = currentMedia.url;
    img.alt = `骨骼图片 ${skeletonMediaIndex + 1}`;
    img.className = 'media-content';
    img.style.transform = 'scale(1) translate(0px, 0px)';
    img.style.transition = 'transform 0.1s ease';
    img.style.cursor = 'zoom-in';
    
    // 图片状态变量
    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;
    let currentScale = 1;
    
    // 添加图片点击缩放功能
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      if (currentScale === 1) {
        currentScale = 2;
        img.style.cursor = 'grab';
      } else {
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        img.style.cursor = 'zoom-in';
      }
      updateImageTransform();
    });
    
    // 添加触摸缩放功能
    let initialDistance = 0;
    
    img.addEventListener('touchstart', function(e) {
      e.stopPropagation();
      if (e.touches.length === 1) {
        // 单指触摸：开始拖拽
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        if (currentScale > 1) {
          img.style.cursor = 'grabbing';
        }
      } else if (e.touches.length === 2) {
        // 双指触摸：开始缩放
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });
    
    img.addEventListener('touchmove', function(e) {
      e.stopPropagation();
      if (e.touches.length === 1 && isDragging && currentScale > 1) {
        // 单指移动：拖拽图片
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        translateX = currentX - startX;
        translateY = currentY - startY;
        
        // 限制移动范围，避免图片移出可视区域
        const maxTranslate = (currentScale - 1) * 100;
        translateX = Math.max(-maxTranslate, Math.min(maxTranslate, translateX));
        translateY = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));
        
        updateImageTransform();
      } else if (e.touches.length === 2) {
        // 双指移动：缩放图片
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        if (initialDistance > 0) {
          const scale = currentDistance / initialDistance;
          currentScale = Math.max(0.5, Math.min(3, scale));
          img.style.cursor = 'grab';
          updateImageTransform();
        }
      }
    });
    
    img.addEventListener('touchend', function(e) {
      e.stopPropagation();
      isDragging = false;
      initialDistance = 0;
      if (currentScale > 1) {
        img.style.cursor = 'grab';
      } else {
        img.style.cursor = 'zoom-in';
      }
    });
    
    // 更新图片变换
    function updateImageTransform() {
      img.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
    }
    
    mediaContainer.appendChild(img);
    skeletonImageElement = img;
  } else if (currentMedia.type === 'video') {
    const video = document.createElement('video');
    video.src = currentMedia.url;
    video.controls = true;
    video.className = 'media-content';
    video.autoplay = true;
    mediaContainer.appendChild(video);
    skeletonVideoElement = video;
  }
}

// 更新骨骼媒体计数器
function updateSkeletonMediaCounter() {
  const mediaCounter = $('#skeletonMediaCounter');
  mediaCounter.textContent = `${skeletonMediaIndex + 1} / ${skeletonMediaList.length}`;
}

// 骨骼上一个媒体
function skeletonPrevMedia() {
  if (skeletonMediaList.length <= 1) return;
  skeletonMediaIndex = (skeletonMediaIndex - 1 + skeletonMediaList.length) % skeletonMediaList.length;
  updateSkeletonMediaDisplay();
  updateSkeletonMediaCounter();
}

// 骨骼下一个媒体
function skeletonNextMedia() {
  if (skeletonMediaList.length <= 1) return;
  skeletonMediaIndex = (skeletonMediaIndex + 1) % skeletonMediaList.length;
  updateSkeletonMediaDisplay();
  updateSkeletonMediaCounter();
}

// 关闭骨骼弹窗
function closeSkeletonModal() {
  // 停止当前播放的视频
  if (skeletonVideoElement) {
    skeletonVideoElement.pause();
    skeletonVideoElement.currentTime = 0;
    skeletonVideoElement = null;
  }
  
  const modal = $('#skeletonModal');
  modal.style.display = 'none';
}

// 打开肌肉弹窗
function openMuscleModal() {
  // 合并所有肌肉媒体文件（图片和视频混合）
  muscleMediaList = [];
  
  // 添加图片
  if (muscleMedia.images && Array.isArray(muscleMedia.images)) {
    muscleMedia.images.forEach(img => {
      muscleMediaList.push({ type: 'image', url: img });
    });
  }
  
  // 添加视频
  if (muscleMedia.videos && Array.isArray(muscleMedia.videos)) {
    muscleMedia.videos.forEach(video => {
      muscleMediaList.push({ type: 'video', url: video });
    });
  }
  
  muscleMediaIndex = 0;
  
  if (muscleMediaList.length === 0) {
    alert('暂无肌肉媒体数据');
    return;
  }
  
  const modal = $('#muscleModal');
  const modalTitle = $('#muscleModalTitle');
  const mediaCounter = $('#muscleMediaCounter');
  
  modalTitle.textContent = `肌肉图集 (${muscleMediaList.length}个)`;
  updateMuscleMediaDisplay();
  updateMuscleMediaCounter();
  
  modal.style.display = 'block';
}

// 更新肌肉媒体显示
function updateMuscleMediaDisplay() {
  const mediaContainer = $('#muscleMediaContainer');
  
  mediaContainer.innerHTML = '';
  
  // 停止之前播放的视频
  if (muscleVideoElement) {
    muscleVideoElement.pause();
    muscleVideoElement.currentTime = 0;
    muscleVideoElement = null;
  }
  
  if (muscleMediaList.length === 0) return;
  
  const currentMedia = muscleMediaList[muscleMediaIndex];
  
  if (currentMedia.type === 'image') {
    const img = document.createElement('img');
    img.src = currentMedia.url;
    img.alt = `肌肉图片 ${muscleMediaIndex + 1}`;
    img.className = 'media-content';
    img.style.transform = 'scale(1) translate(0px, 0px)';
    img.style.transition = 'transform 0.1s ease';
    img.style.cursor = 'zoom-in';
    
    // 图片状态变量
    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;
    let currentScale = 1;
    
    // 添加图片点击缩放功能
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      if (currentScale === 1) {
        currentScale = 2;
        img.style.cursor = 'grab';
      } else {
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        img.style.cursor = 'zoom-in';
      }
      updateImageTransform();
    });
    
    // 添加触摸缩放功能
    let initialDistance = 0;
    
    img.addEventListener('touchstart', function(e) {
      e.stopPropagation();
      if (e.touches.length === 1) {
        // 单指触摸：开始拖拽
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        if (currentScale > 1) {
          img.style.cursor = 'grabbing';
        }
      } else if (e.touches.length === 2) {
        // 双指触摸：开始缩放
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });
    
    img.addEventListener('touchmove', function(e) {
      e.stopPropagation();
      if (e.touches.length === 1 && isDragging && currentScale > 1) {
        // 单指移动：拖拽图片
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        translateX = currentX - startX;
        translateY = currentY - startY;
        
        // 限制移动范围，避免图片移出可视区域
        const maxTranslate = (currentScale - 1) * 100;
        translateX = Math.max(-maxTranslate, Math.min(maxTranslate, translateX));
        translateY = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));
        
        updateImageTransform();
      } else if (e.touches.length === 2) {
        // 双指移动：缩放图片
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        if (initialDistance > 0) {
          const scale = currentDistance / initialDistance;
          currentScale = Math.max(0.5, Math.min(3, scale));
          img.style.cursor = 'grab';
          updateImageTransform();
        }
      }
    });
    
    img.addEventListener('touchend', function(e) {
      e.stopPropagation();
      isDragging = false;
      initialDistance = 0;
      if (currentScale > 1) {
        img.style.cursor = 'grab';
      } else {
        img.style.cursor = 'zoom-in';
      }
    });
    
    // 更新图片变换
    function updateImageTransform() {
      img.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
    }
    
    mediaContainer.appendChild(img);
    muscleImageElement = img;
  } else if (currentMedia.type === 'video') {
    const video = document.createElement('video');
    video.src = currentMedia.url;
    video.controls = true;
    video.className = 'media-content';
    video.autoplay = true;
    mediaContainer.appendChild(video);
    muscleVideoElement = video;
  }
}

// 更新肌肉媒体计数器
function updateMuscleMediaCounter() {
  const mediaCounter = $('#muscleMediaCounter');
  mediaCounter.textContent = `${muscleMediaIndex + 1} / ${muscleMediaList.length}`;
}

// 肌肉上一个媒体
function musclePrevMedia() {
  if (muscleMediaList.length <= 1) return;
  muscleMediaIndex = (muscleMediaIndex - 1 + muscleMediaList.length) % muscleMediaList.length;
  updateMuscleMediaDisplay();
  updateMuscleMediaCounter();
}

// 肌肉下一个媒体
function muscleNextMedia() {
  if (muscleMediaList.length <= 1) return;
  muscleMediaIndex = (muscleMediaIndex + 1) % muscleMediaList.length;
  updateMuscleMediaDisplay();
  updateMuscleMediaCounter();
}

// 关闭肌肉弹窗
function closeMuscleModal() {
  // 停止当前播放的视频
  if (muscleVideoElement) {
    muscleVideoElement.pause();
    muscleVideoElement.currentTime = 0;
    muscleVideoElement = null;
  }
  
  const modal = $('#muscleModal');
  modal.style.display = 'none';
}

/* ================= 初始化 ================= */
buildNav();
render(muscleData);
initScrollSpy();

// 绑定浮动按钮事件
document.addEventListener('DOMContentLoaded', function() {
  // 骨骼按钮
  $('#boneBtn').addEventListener('click', openSkeletonModal);
  
  // 肌肉按钮
  $('#muscleBtn').addEventListener('click', openMuscleModal);
  
  // 骨骼弹窗事件
  $('#skeletonPrevBtn').addEventListener('click', skeletonPrevMedia);
  $('#skeletonNextBtn').addEventListener('click', skeletonNextMedia);
  $('#skeletonModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeSkeletonModal();
    }
  });
  
  // 添加骨骼弹窗触摸滑动事件
  const skeletonModal = $('#skeletonModal');
  skeletonModal.addEventListener('touchstart', function(e) {
    skeletonTouchStartX = e.touches[0].clientX;
  });
  
  skeletonModal.addEventListener('touchmove', function(e) {
    if (!skeletonTouchStartX) return;
    
    const touchEndX = e.touches[0].clientX;
    const diffX = skeletonTouchStartX - touchEndX;
    
    // 优化灵敏度：滑动距离大于20px时触发切换
    if (Math.abs(diffX) > 20) {
      if (diffX > 0) {
        // 向左滑动，显示下一个
        skeletonNextMedia();
      } else {
        // 向右滑动，显示上一个
        skeletonPrevMedia();
      }
      skeletonTouchStartX = null; // 重置触摸状态
    }
  });
  
  skeletonModal.addEventListener('touchend', function() {
    skeletonTouchStartX = null;
  });
  
  // 肌肉弹窗事件
  $('#musclePrevBtn').addEventListener('click', musclePrevMedia);
  $('#muscleNextBtn').addEventListener('click', muscleNextMedia);
  $('#muscleModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeMuscleModal();
    }
  });
  
  // 添加肌肉弹窗触摸滑动事件
  const muscleModal = $('#muscleModal');
  muscleModal.addEventListener('touchstart', function(e) {
    muscleTouchStartX = e.touches[0].clientX;
  });
  
  muscleModal.addEventListener('touchmove', function(e) {
    if (!muscleTouchStartX) return;
    
    const touchEndX = e.touches[0].clientX;
    const diffX = muscleTouchStartX - touchEndX;
    
    // 优化灵敏度：滑动距离大于20px时触发切换
    if (Math.abs(diffX) > 20) {
      if (diffX > 0) {
        // 向左滑动，显示下一个
        muscleNextMedia();
      } else {
        // 向右滑动，显示上一个
        musclePrevMedia();
      }
      muscleTouchStartX = null; // 重置触摸状态
    }
  });
  
  muscleModal.addEventListener('touchend', function() {
    muscleTouchStartX = null;
  });
  
  // ESC键关闭所有弹窗
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      closeSkeletonModal();
      closeMuscleModal();
    }
  });
});