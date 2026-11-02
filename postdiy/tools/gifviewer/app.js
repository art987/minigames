/**
 * GIF 播放器 - 主逻辑
 * 使用 gifuct-js 解码，Canvas 渲染
 */

// ========== 状态管理 ==========
const state = {
    frames: [],           // 解码后的帧数据
    currentFrame: 0,      // 当前帧索引
    isPlaying: false,     // 是否正在播放
    playInterval: null,   // 播放定时器
    speed: 500,           // 播放速度 (ms)
    reverse: false,       // 是否反向播放
    loopMode: 'loop',     // 循环模式: loop / once / pingpong
    pingpongDir: 1,       // 往复播放方向
    canvas: null,         // Canvas 元素
    ctx: null,            // Canvas 上下文
    canvasWidth: 0,       // GIF 原始宽度
    canvasHeight: 0,      // GIF 原始高度
    fileName: '',         // 当前文件名
    fileUrl: '',          // 当前文件 URL (blob: 或相对路径)
};

// ========== 状态管理 ==========
const $ = (id) => document.getElementById(id);
const canvas = $('gif-canvas');
const ctx = canvas.getContext('2d');
const placeholder = $('placeholder');
const controls = $('controls');
const loading = $('loading');
const loadingText = $('loading-text');

// ========== 缩放/拖拽状态 ==========
const scalerState = {
    scale: 1,
    tx: 0,
    ty: 0,
    // pinch 中
    pinching: false,
    startDist: 0,
    startScale: 1,
    // drag 中
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    startTx: 0,
    startTy: 0,
    // 触摸起始中心点
    startCenterX: 0,
    startCenterY: 0,
    // pinch 时缩放锚点（相对 scaler）
    anchorX: 0,
    anchorY: 0,
};

function applyScalerTransform() {
    const s = $('canvas-scaler');
    if (!s) return;
    s.style.transform = `translate(${scalerState.tx}px, ${scalerState.ty}px) scale(${scalerState.scale})`;
    // 放大时禁用左右热区，让手势能作用到 canvas 上
    const player = document.querySelector('.player-area');
    if (scalerState.scale > 1) {
        player.classList.add('zoomed');
    } else {
        player.classList.remove('zoomed');
    }
}

function resetScaler() {
    scalerState.scale = 1;
    scalerState.tx = 0;
    scalerState.ty = 0;
    applyScalerTransform();
}

// ========== 手势：双指缩放 + 单指拖拽 ==========
function bindGestures() {
    const wrapper = $('canvas-wrapper');

    function getDistance(t1, t2) {
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        return Math.hypot(dx, dy);
    }
    function getCenter(t1, t2) {
        return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
    }

    wrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            // 双指 → 开始 pinch
            scalerState.pinching = true;
            scalerState.dragging = false;
            scalerState.startDist = getDistance(e.touches[0], e.touches[1]);
            scalerState.startScale = scalerState.scale;
            const c = getCenter(e.touches[0], e.touches[1]);
            // 计算 pinch 中心点在 scaler 元素上的相对位置
            const rect = $('canvas-scaler').getBoundingClientRect();
            scalerState.anchorX = c.x - rect.left;
            scalerState.anchorY = c.y - rect.top;
        } else if (e.touches.length === 1 && scalerState.scale > 1) {
            // 单指且已放大 → 开始拖拽
            scalerState.dragging = true;
            scalerState.dragStartX = e.touches[0].clientX;
            scalerState.dragStartY = e.touches[0].clientY;
            scalerState.startTx = scalerState.tx;
            scalerState.startTy = scalerState.ty;
            $('canvas-scaler').classList.add('dragging');
        }
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        if (scalerState.pinching && e.touches.length === 2) {
            e.preventDefault();
            const dist = getDistance(e.touches[0], e.touches[1]);
            const ratio = dist / scalerState.startDist;
            let newScale = scalerState.startScale * ratio;
            // 限制：最小 1，最大 6
            newScale = Math.max(1, Math.min(6, newScale));
            scalerState.scale = newScale;
            applyScalerTransform();
        } else if (scalerState.dragging && e.touches.length === 1) {
            e.preventDefault();
            const dx = e.touches[0].clientX - scalerState.dragStartX;
            const dy = e.touches[0].clientY - scalerState.dragStartY;
            scalerState.tx = scalerState.startTx + dx;
            scalerState.ty = scalerState.startTy + dy;
            applyScalerTransform();
        }
    }, { passive: false });

    function endAll() {
        scalerState.pinching = false;
        scalerState.dragging = false;
        $('canvas-scaler').classList.remove('dragging');
        // 回到 1 倍时自动归位
        if (scalerState.scale <= 1) {
            scalerState.scale = 1;
            scalerState.tx = 0;
            scalerState.ty = 0;
            applyScalerTransform();
        }
    }
    wrapper.addEventListener('touchend', endAll);
    wrapper.addEventListener('touchcancel', endAll);
    wrapper.addEventListener('touchleave', endAll);

    // 桌面端：Ctrl+滚轮缩放 + Shift+滚轮/右键拖拽
    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
            const delta = -e.deltaY * 0.002;
            let newScale = scalerState.scale * (1 + delta);
            newScale = Math.max(1, Math.min(6, newScale));
            scalerState.scale = newScale;
            if (newScale <= 1) { scalerState.tx = 0; scalerState.ty = 0; }
            applyScalerTransform();
        } else if (scalerState.scale > 1) {
            // 已放大状态，滚轮上下平移
            scalerState.ty -= e.deltaY;
            applyScalerTransform();
        }
    }, { passive: false });
}

// ========== 切换 GIF 文件（上一张/下一张） ==========
let currentFileIndex = -1;

function switchFile(dir) {
    if (galleryAllFiles.length === 0) return;
    if (currentFileIndex < 0) return; // 还没从图库选过
    let next = currentFileIndex + dir;
    if (next < 0) next = galleryAllFiles.length - 1;
    if (next >= galleryAllFiles.length) next = 0;
    currentFileIndex = next;
    loadGif(galleryAllFiles[next].path, galleryAllFiles[next].name);
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    state.canvas = canvas;
    state.ctx = ctx;
    bindEvents();
    bindGestures();
    loadGallery();
    // 默认打开图库
    openModal('modal-gallery');
});

// ========== 事件绑定 ==========
function bindEvents() {
    // 顶部按钮
    $('btn-gallery').addEventListener('click', () => openModal('modal-gallery'));
    $('btn-upload').addEventListener('click', () => $('file-input').click());
    $('file-input').addEventListener('change', handleFileUpload);

    // 控制按钮
    $('btn-prev').addEventListener('click', () => stepFrame(-1));
    $('btn-next').addEventListener('click', () => stepFrame(1));
    $('btn-play').addEventListener('click', togglePlay);
    $('btn-capture').addEventListener('click', captureCurrentFrame);
    $('btn-settings').addEventListener('click', () => openModal('modal-settings'));
    $('btn-export').addEventListener('click', () => {
        openModal('modal-export');
        renderFramePreview();
    });

    // 时间轴
    const timeline = $('timeline');
    timeline.addEventListener('click', (e) => {
        if (state.frames.length === 0) return;
        const rect = timeline.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const frameIdx = Math.round(percent * (state.frames.length - 1));
        goToFrame(frameIdx);
    });

    // 播放区域四列点击热区
    document.querySelectorAll('.tap-zone').forEach(zone => {
        zone.addEventListener('click', () => {
            const action = zone.dataset.tap;
            switch (action) {
                case 'prev-file': switchFile(-1); break;
                case 'next-file': switchFile(1); break;
                case 'prev-frame': stepFrame(-1); break;
                case 'next-frame': stepFrame(1); break;
            }
        });
    });

    // 设置弹窗
    const speedSlider = $('speed-slider');
    const speedTooltip = $('speed-tooltip');
    let tooltipHideTimer = null;

    speedSlider.addEventListener('input', (e) => {
        state.speed = parseInt(e.target.value);
        $('speed-value').textContent = state.speed;
        if (state.isPlaying) {
            restartPlayback();
        }
        // 显示 tooltip
        speedTooltip.style.opacity = '1';
        speedTooltip.style.visibility = 'visible';
        clearTimeout(tooltipHideTimer);
        tooltipHideTimer = setTimeout(() => {
            speedTooltip.style.opacity = '';
            speedTooltip.style.visibility = '';
        }, 1500);
    });

    // 滑块聚焦也显示
    speedSlider.addEventListener('focus', () => {
        speedTooltip.style.opacity = '1';
        speedTooltip.style.visibility = 'visible';
    });
    speedSlider.addEventListener('blur', () => {
        setTimeout(() => {
            if (!tooltipHideTimer) {
                speedTooltip.style.opacity = '';
                speedTooltip.style.visibility = '';
            }
        }, 1500);
    });

    $('reverse-toggle').addEventListener('change', (e) => {
        state.reverse = e.target.checked;
        if (state.isPlaying) restartPlayback();
    });

    document.querySelectorAll('input[name="loop"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.loopMode = e.target.value;
        });
    });

    // 导出弹窗
    $('btn-save-current').addEventListener('click', saveCurrentFrame);
    $('btn-download-all').addEventListener('click', downloadAllFrames);

    // 弹窗关闭
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.dataset.close);
        });
    });

    // 点击遮罩关闭弹窗
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (state.frames.length === 0) return;
        switch (e.key) {
            case ' ': e.preventDefault(); togglePlay(); break;
            case 'ArrowLeft': stepFrame(-1); break;
            case 'ArrowRight': stepFrame(1); break;
        }
    });
}

// ========== 弹窗控制 ==========
function openModal(id) {
    $(id).classList.add('active');
}

function closeModal(id) {
    $(id).classList.remove('active');
}

// ========== 图片库加载（分页 + 目录） ==========
let galleryAllFiles = [];
let galleryShown = 0;
let galleryRoot = null;   // { dirs, files }
let galleryCurrentDir = '';
const GALLERY_PAGE = 10;

async function loadGallery() {
    const grid = $('gallery-grid');
    const dirSelect = $('dir-select');
    grid.innerHTML = '';
    galleryAllFiles = [];
    galleryShown = 0;

    try {
        const resp = await fetch('files.json');
        if (!resp.ok) throw new Error('files.json not found');
        galleryRoot = await resp.json();
    } catch (e) {
        console.warn('加载图库清单失败:', e.message);
        grid.innerHTML = '<div class="gallery-empty">暂无 GIF 文件，请运行 node gen-files.js</div>';
        return;
    }

    // 填充下拉
    dirSelect.innerHTML = '';
    for (const dir of galleryRoot.dirs) {
        const opt = document.createElement('option');
        opt.value = dir;
        opt.textContent = `${dir}/ (${galleryRoot.files[dir].length})`;
        dirSelect.appendChild(opt);
    }
    galleryCurrentDir = galleryRoot.dirs[0];

    dirSelect.onchange = () => {
        galleryCurrentDir = dirSelect.value;
        switchGalleryDir();
    };

    switchGalleryDir();

    // 监听滚动到底部 → 加载下一页
    const body = document.querySelector('#modal-gallery .modal-body');
    body.onscroll = () => {
        const nearBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 40;
        if (nearBottom && galleryShown < galleryAllFiles.length) {
            appendGalleryPage();
        }
    };
}

function switchGalleryDir() {
    const grid = $('gallery-grid');
    grid.innerHTML = '';
    galleryAllFiles = galleryRoot.files[galleryCurrentDir] || [];
    galleryShown = 0;
    appendGalleryPage();
}

function appendGalleryPage() {
    const grid = $('gallery-grid');
    const frag = document.createDocumentFragment();
    const end = Math.min(galleryShown + GALLERY_PAGE, galleryAllFiles.length);
    for (let i = galleryShown; i < end; i++) {
        const f = galleryAllFiles[i];
        frag.appendChild(createGalleryItem(f.path, f.name, i));
    }
    grid.appendChild(frag);
    galleryShown = end;
}

function createGalleryItem(path, name, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${path}" alt="${name}" loading="lazy" />
        <div class="item-name">${name}</div>
    `;
    div.addEventListener('click', () => {
        closeModal('modal-gallery');
        currentFileIndex = index;
        loadGif(path, name);
    });
    return div;
}

// ========== 文件上传处理 ==========
function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // 只处理第一个文件作为主文件
    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.gif')) {
        alert('请选择 .gif 文件');
        return;
    }

    const url = URL.createObjectURL(file);
    loadGif(url, file.name);

    e.target.value = ''; // 重置 input
}

// ========== GIF 加载与解码 ==========
async function loadGif(url, name) {
    showLoading('解码中...');
    
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        
        // 使用 gifuct-js 解码
        const gif = GIFUTCGif.parseGIF(buffer);
        const frames = GIFUTCGif.decompressFrames(gif, true);
        
        // 保存状态
        state.frames = frames;
        state.fileName = name;
        state.fileUrl = url;
        state.canvasWidth = gif.lsd.width;
        state.canvasHeight = gif.lsd.height;
        state.currentFrame = 0;
        state.isPlaying = false;

        // 重置缩放/拖拽
        resetScaler();

        // 设置 canvas 尺寸
        canvas.width = state.canvasWidth;
        canvas.height = state.canvasHeight;
        canvas.classList.add('active');
        placeholder.style.display = 'none';
        controls.style.display = 'block';

        // 更新 UI
        updateFrameInfo();
        updateGifInfo();
        $('icon-play').style.display = '';
        $('icon-pause').style.display = 'none';

        // 渲染第一帧
        renderFrame(0);
        
        hideLoading();
        
        // 自动开始播放
        togglePlay();

    } catch (err) {
        console.error('GIF 加载失败:', err);
        hideLoading();
        alert('GIF 加载失败: ' + err.message);
    }
}

// ========== 帧渲染 ==========
function renderFrame(index) {
    if (state.frames.length === 0) return;
    
    const frame = state.frames[index];
    if (!frame) return;

    // 获取帧的 ImageData 并绘制
    const imageData = new ImageData(
        new Uint8ClampedArray(frame.patch),
        frame.dims.width,
        frame.dims.height
    );

    // 处理 GIF 的 disposal method（背景清除）
    if (index === 0 || frame.disposalType === 2) {
        ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
    }
    
    ctx.putImageData(imageData, frame.dims.left, frame.dims.top);
}

// ========== 播放控制 ==========
function togglePlay() {
    if (state.frames.length === 0) return;
    
    state.isPlaying = !state.isPlaying;
    
    const playIcon = $('icon-play');
    const pauseIcon = $('icon-pause');
    const captureBtn = $('btn-capture');
    
    if (state.isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = '';
        captureBtn.disabled = true;
        startPlayback();
    } else {
        playIcon.style.display = '';
        pauseIcon.style.display = 'none';
        captureBtn.disabled = false;
        stopPlayback();
    }
}

function startPlayback() {
    stopPlayback(); // 清除旧定时器
    
    const tick = () => {
        let nextIdx;
        
        if (state.loopMode === 'pingpong') {
            nextIdx = state.currentFrame + state.pingpongDir;
            if (nextIdx >= state.frames.length) {
                state.pingpongDir = -1;
                nextIdx = state.currentFrame + state.pingpongDir;
            } else if (nextIdx < 0) {
                state.pingpongDir = 1;
                nextIdx = state.currentFrame + state.pingpongDir;
            }
        } else if (state.reverse) {
            nextIdx = state.currentFrame - 1;
            if (nextIdx < 0) {
                if (state.loopMode === 'once') {
                    stopPlayback();
                    state.isPlaying = false;
                    $('icon-play').style.display = '';
                    $('icon-pause').style.display = 'none';
                    return;
                }
                nextIdx = state.frames.length - 1;
            }
        } else {
            nextIdx = state.currentFrame + 1;
            if (nextIdx >= state.frames.length) {
                if (state.loopMode === 'once') {
                    stopPlayback();
                    state.isPlaying = false;
                    $('icon-play').style.display = '';
                    $('icon-pause').style.display = 'none';
                    return;
                }
                nextIdx = 0;
            }
        }
        
        goToFrame(nextIdx);
    };
    
    state.playInterval = setInterval(tick, state.speed);
}

function stopPlayback() {
    if (state.playInterval) {
        clearInterval(state.playInterval);
        state.playInterval = null;
    }
}

function restartPlayback() {
    if (state.isPlaying) {
        stopPlayback();
        startPlayback();
    }
}

function stepFrame(delta) {
    if (state.frames.length === 0) return;
    
    // 逐帧浏览时停止播放
    if (state.isPlaying) {
        togglePlay();
    }
    
    let next = state.currentFrame + delta;
    
    if (next >= state.frames.length) next = 0;
    if (next < 0) next = state.frames.length - 1;
    
    goToFrame(next);
}

function goToFrame(index) {
    if (state.frames.length === 0) return;
    
    state.currentFrame = index;
    renderFrame(index);
    updateFrameInfo();
}

// ========== UI 更新 ==========
function updateFrameInfo() {
    // 更新时间轴
    const percent = state.frames.length > 1 
        ? (state.currentFrame / (state.frames.length - 1)) * 100 
        : 100;
    $('timeline-progress').style.width = percent + '%';
    $('timeline-thumb').style.left = percent + '%';
}

function updateGifInfo() {
    if (state.frames.length === 0) return;
    
    const totalDelay = state.frames.reduce((sum, f) => sum + (f.delay || 100), 0);
    const totalSec = (totalDelay / 1000).toFixed(2);
    
    $('gif-info').style.display = 'block';
    $('info-name').textContent = state.fileName;
    $('info-size').textContent = `${state.canvasWidth} × ${state.canvasHeight}`;
    $('info-frames').textContent = state.frames.length;
    $('info-duration').textContent = `${totalSec}s`;
}

// ========== 截帧（播放时禁用） ==========
function captureCurrentFrame() {
    if (state.frames.length === 0) return;
    if (state.isPlaying) {
        // 应该被 disabled 挡住，双保险
        togglePlay();
    }
    saveCurrentFrame();
    showToast(`已截取第 ${state.currentFrame + 1} 帧`, 'success');
}

// ========== Toast 提示 ==========
let toastHideTimer = null;
function showToast(msg, type = '') {
    const toast = $('toast');
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    clearTimeout(toastHideTimer);
    toastHideTimer = setTimeout(() => {
        toast.className = 'toast ' + type;
    }, 1800);
}

// ========== 帧导出 ==========
function saveCurrentFrame() {
    if (state.frames.length === 0) return;
    
    // 创建临时 canvas 绘制当前帧
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = state.canvasWidth;
    tempCanvas.height = state.canvasHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);
    
    tempCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.fileName.replace('.gif', '')}_frame_${state.currentFrame + 1}.png`;
        a.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
}

async function downloadAllFrames() {
    if (state.frames.length === 0) return;
    
    showLoading('生成 ZIP 中...');
    
    try {
        const zip = new JSZip();
        
        for (let i = 0; i < state.frames.length; i++) {
            const frame = state.frames[i];
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = state.canvasWidth;
            tempCanvas.height = state.canvasHeight;
            const tempCtx = tempCanvas.getContext('2d');
            
            // 重新从第 0 帧绘制到当前帧（因为 GIF 帧是增量的）
            tempCtx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
            for (let j = 0; j <= i; j++) {
                const f = state.frames[j];
                const imageData = new ImageData(
                    new Uint8ClampedArray(f.patch),
                    f.dims.width,
                    f.dims.height
                );
                tempCtx.putImageData(imageData, f.dims.left, f.dims.top);
            }
            
            const blob = await new Promise(resolve => 
                tempCanvas.toBlob(resolve, 'image/png')
            );
            
            zip.file(`frame_${String(i + 1).padStart(4, '0')}.png`, blob);
        }
        
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.fileName.replace('.gif', '')}_frames.zip`;
        a.click();
        URL.revokeObjectURL(url);
        
    } catch (err) {
        console.error('导出失败:', err);
        alert('导出失败: ' + err.message);
    }
    
    hideLoading();
}

function renderFramePreview() {
    const container = $('frame-list-preview');
    container.innerHTML = '';
    
    if (state.frames.length === 0) {
        container.innerHTML = '<div style="color:#71717a;text-align:center;padding:20px;">请先加载 GIF 文件</div>';
        return;
    }
    
    // 限制预览数量，避免过多
    const maxPreview = Math.min(state.frames.length, 48);
    
    for (let i = 0; i < maxPreview; i++) {
        const frame = state.frames[i];
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = state.canvasWidth;
        tempCanvas.height = state.canvasHeight;
        const tempCtx = tempCanvas.getContext('2d');
        
        // 重新绘制到此帧
        tempCtx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
        for (let j = 0; j <= i; j++) {
            const f = state.frames[j];
            const imageData = new ImageData(
                new Uint8ClampedArray(f.patch),
                f.dims.width,
                f.dims.height
            );
            tempCtx.putImageData(imageData, f.dims.left, f.dims.top);
        }
        
        tempCanvas.style.cursor = 'pointer';
        tempCanvas.title = `帧 ${i + 1}`;
        tempCanvas.addEventListener('click', () => {
            closeModal('modal-export');
            goToFrame(i);
            if (state.isPlaying) togglePlay();
        });
        
        container.appendChild(tempCanvas);
    }
}

// ========== 加载提示 ==========
function showLoading(text) {
    loadingText.textContent = text || '加载中...';
    loading.style.display = 'flex';
}

function hideLoading() {
    loading.style.display = 'none';
}
