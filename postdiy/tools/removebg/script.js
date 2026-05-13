const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const previewSection = document.getElementById('previewSection');
const cropModal = document.getElementById('cropModal');
const cropCanvas = document.getElementById('cropCanvas');
const originalCanvas = document.getElementById('originalCanvas');
const resultCanvas = document.getElementById('resultCanvas');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const progressFill = document.getElementById('progressFill');
const modeButtons = document.getElementById('modeButtons');

const colorPickerPopup = document.getElementById('colorPickerPopup');
const colorPickerCanvas = document.getElementById('colorPickerCanvas');
const colorCrosshair = document.getElementById('colorCrosshair');
const colorSwatch = document.getElementById('colorSwatch');
const colorValue = document.getElementById('colorValue');
const colorPickerClose = document.getElementById('colorPickerClose');
const colorConfirmBtn = document.getElementById('colorConfirmBtn');
const toleranceSlider = document.getElementById('toleranceSlider');
const toleranceValue = document.getElementById('toleranceValue');

let selectedColor = '#ffffff';
let tolerance = 50;

const cropModalClose = document.getElementById('cropModalClose');
const cropResetBtn = document.getElementById('cropResetBtn');
const cropConfirmBtn = document.getElementById('cropConfirmBtn');
const reCropBtn = document.getElementById('reCropBtn');
const changeImageBtn = document.getElementById('changeImageBtn');
const processBtn = document.getElementById('processBtn');
const downloadBtn = document.getElementById('downloadBtn');

const cropBox = document.getElementById('cropBox');
const cropOverlay = document.getElementById('cropOverlay');

let currentFile = null;
let originalImage = null;
let originalImageData = null;
let cropRect = { x: 0, y: 0, width: 0, height: 0 };
let isDragging = false;
let isResizing = false;
let resizeHandle = null;
let dragStartX = 0;
let dragStartY = 0;

function init() {
  uploadBox.addEventListener('click', () => fileInput.click());

  uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
  });

  uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
  });

  uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  });

  cropModalClose.addEventListener('click', closeCropModal);
  cropResetBtn.addEventListener('click', resetToUpload);
  cropConfirmBtn.addEventListener('click', confirmCrop);
  reCropBtn.addEventListener('click', openCropModal);
  changeImageBtn.addEventListener('click', resetToUpload);
  downloadBtn.addEventListener('click', downloadImage);

  modeButtons.addEventListener('click', (e) => {
    const btn = e.target.closest('.mode-btn');
    if (!btn) return;

    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const mode = btn.dataset.mode;

    if (mode === 'custom') {
      openColorPicker();
    } else {
      closeColorPicker();
      if (originalImageData) {
        processImage();
      }
    }
  });

  toleranceSlider.addEventListener('input', () => {
    tolerance = parseInt(toleranceSlider.value);
    toleranceValue.textContent = tolerance + '%';
  });

  colorPickerClose.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.mode-btn[data-mode="auto"]').classList.add('active');
    closeColorPicker();
  });

  colorConfirmBtn.addEventListener('click', () => {
    closeColorPicker();
    if (originalImageData) {
      processImage();
    }
  });

  colorPickerCanvas.addEventListener('click', handleColorPick);
  colorPickerCanvas.addEventListener('mousemove', handleColorPickMove);

  initCropHandlers();
}

async function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    showToast('请上传图片文件');
    return;
  }

  currentFile = file;
  showLoading(true, '加载图片...');

  try {
    originalImage = await loadImage(file);
    openCropModal();
    showLoading(false);
  } catch (err) {
    console.error('处理失败:', err);
    showToast('图片加载失败');
    showLoading(false);
  }
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = URL.createObjectURL(file);
  });
}

function openCropModal() {
  const maxWidth = window.innerWidth - 60;
  const maxHeight = window.innerHeight - 250;

  let width = originalImage.width;
  let height = originalImage.height;

  if (width > maxWidth) {
    height = (maxWidth / width) * height;
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = (maxHeight / height) * width;
    height = maxHeight;
  }

  cropCanvas.width = width;
  cropCanvas.height = height;

  const ctx = cropCanvas.getContext('2d');
  ctx.drawImage(originalImage, 0, 0, width, height);

  cropRect.x = 0;
  cropRect.y = 0;
  cropRect.width = width;
  cropRect.height = height;
  updateCropBox();

  cropModal.classList.add('active');
}

function closeCropModal() {
  cropModal.classList.remove('active');
}

function resetToUpload() {
  cropModal.classList.remove('active');
  fileInput.value = '';
  currentFile = null;
  originalImage = null;
  originalImageData = null;
  previewSection.style.display = 'none';
  uploadSection.style.display = 'block';
}

function confirmCrop() {
  const scaleX = originalImage.width / cropCanvas.width;
  const scaleY = originalImage.height / cropCanvas.height;

  const cropX = Math.round(cropRect.x * scaleX);
  const cropY = Math.round(cropRect.y * scaleY);
  const cropWidth = Math.round(cropRect.width * scaleX);
  const cropHeight = Math.round(cropRect.height * scaleY);

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = cropWidth;
  tempCanvas.height = cropHeight;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(originalImage, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

  originalCanvas.width = cropWidth;
  originalCanvas.height = cropHeight;
  const ctx1 = originalCanvas.getContext('2d');
  ctx1.drawImage(tempCanvas, 0, 0);
  originalImageData = ctx1.getImageData(0, 0, cropWidth, cropHeight);

  resultCanvas.width = cropWidth;
  resultCanvas.height = cropHeight;
  const ctx2 = resultCanvas.getContext('2d');
  ctx2.drawImage(tempCanvas, 0, 0);

  cropModal.classList.remove('active');
  uploadSection.style.display = 'none';
  previewSection.style.display = 'block';
  downloadBtn.disabled = true;

  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.mode-btn[data-mode="auto"]').classList.add('active');

  processImage();
}

function initCropHandlers() {
  cropBox.addEventListener('mousedown', handleMouseDown);
  cropOverlay.addEventListener('mousedown', handleOverlayMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  cropBox.addEventListener('touchstart', handleTouchStart, { passive: false });
  cropOverlay.addEventListener('touchstart', handleOverlayTouchStart, { passive: false });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd);
}

function handleMouseDown(e) {
  if (e.target.classList.contains('crop-handle')) {
    isResizing = true;
    const classes = e.target.className.split(' ');
    resizeHandle = classes.find(c => c.startsWith('top') || c.startsWith('bottom')).replace('crop-handle-', '').replace('-', '');
  } else {
    isDragging = true;
  }
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  e.preventDefault();
}

function handleOverlayMouseDown(e) {
  if (e.target === cropOverlay || e.target.classList.contains('crop-guide')) {
    const rect = cropOverlay.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cropRect.x = Math.max(0, x - cropRect.width / 2);
    cropRect.y = Math.max(0, y - cropRect.height / 2);
    cropRect.x = Math.min(cropRect.x, cropOverlay.offsetWidth - cropRect.width);
    cropRect.y = Math.min(cropRect.y, cropOverlay.offsetHeight - cropRect.height);

    updateCropBox();
    isDragging = true;
  }
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  e.preventDefault();
}

function handleMouseMove(e) {
  if (!isDragging && !isResizing) return;

  const deltaX = e.clientX - dragStartX;
  const deltaY = e.clientY - dragStartY;

  if (isDragging) {
    cropRect.x = Math.max(0, Math.min(cropRect.x + deltaX, cropOverlay.offsetWidth - cropRect.width));
    cropRect.y = Math.max(0, Math.min(cropRect.y + deltaY, cropOverlay.offsetHeight - cropRect.height));
  } else if (isResizing) {
    resizeCropBox(deltaX, deltaY);
  }

  dragStartX = e.clientX;
  dragStartY = e.clientY;
  updateCropBox();
}

function handleMouseUp() {
  isDragging = false;
  isResizing = false;
  resizeHandle = null;
}

function handleTouchStart(e) {
  if (e.target.classList.contains('crop-handle')) {
    isResizing = true;
    const classes = e.target.className.split(' ');
    resizeHandle = classes.find(c => c.startsWith('top') || c.startsWith('bottom')).replace('crop-handle-', '').replace('-', '');
  } else {
    isDragging = true;
  }
  dragStartX = e.touches[0].clientX;
  dragStartY = e.touches[0].clientY;
  e.preventDefault();
}

function handleOverlayTouchStart(e) {
  if (e.target === cropOverlay || e.target.classList.contains('crop-guide')) {
    const rect = cropOverlay.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    cropRect.x = Math.max(0, x - cropRect.width / 2);
    cropRect.y = Math.max(0, y - cropRect.height / 2);
    cropRect.x = Math.min(cropRect.x, cropOverlay.offsetWidth - cropRect.width);
    cropRect.y = Math.min(cropRect.y, cropOverlay.offsetHeight - cropRect.height);

    updateCropBox();
    isDragging = true;
  }
  dragStartX = e.touches[0].clientX;
  dragStartY = e.touches[0].clientY;
  e.preventDefault();
}

function handleTouchMove(e) {
  if (!isDragging && !isResizing) return;

  const deltaX = e.touches[0].clientX - dragStartX;
  const deltaY = e.touches[0].clientY - dragStartY;

  if (isDragging) {
    cropRect.x = Math.max(0, Math.min(cropRect.x + deltaX, cropOverlay.offsetWidth - cropRect.width));
    cropRect.y = Math.max(0, Math.min(cropRect.y + deltaY, cropOverlay.offsetHeight - cropRect.height));
  } else if (isResizing) {
    resizeCropBox(deltaX, deltaY);
  }

  dragStartX = e.touches[0].clientX;
  dragStartY = e.touches[0].clientY;
  updateCropBox();
  e.preventDefault();
}

function handleTouchEnd() {
  isDragging = false;
  isResizing = false;
  resizeHandle = null;
}

function resizeCropBox(deltaX, deltaY) {
  const minSize = 40;

  if (resizeHandle.includes('right')) {
    cropRect.width = Math.max(minSize, Math.min(cropRect.x + cropRect.width + deltaX, cropOverlay.offsetWidth) - cropRect.x);
  }
  if (resizeHandle.includes('left')) {
    const newWidth = cropRect.width - deltaX;
    if (newWidth > minSize) {
      cropRect.x += deltaX;
      cropRect.width = newWidth;
    }
  }
  if (resizeHandle.includes('bottom')) {
    cropRect.height = Math.max(minSize, Math.min(cropRect.y + cropRect.height + deltaY, cropOverlay.offsetHeight) - cropRect.y);
  }
  if (resizeHandle.includes('top')) {
    const newHeight = cropRect.height - deltaY;
    if (newHeight > minSize) {
      cropRect.y += deltaY;
      cropRect.height = newHeight;
    }
  }
}

function updateCropBox() {
  cropBox.style.left = cropRect.x + 'px';
  cropBox.style.top = cropRect.y + 'px';
  cropBox.style.width = cropRect.width + 'px';
  cropBox.style.height = cropRect.height + 'px';
}

function openColorPicker() {
  colorPickerCanvas.width = originalCanvas.width;
  colorPickerCanvas.height = originalCanvas.height;
  const ctx = colorPickerCanvas.getContext('2d');
  ctx.drawImage(originalCanvas, 0, 0);

  colorSwatch.style.background = selectedColor;
  colorValue.textContent = selectedColor.toUpperCase();

  colorPickerPopup.classList.add('active');
}

function closeColorPicker() {
  colorPickerPopup.classList.remove('active');
}

function handleColorPick(e) {
  const rect = colorPickerCanvas.getBoundingClientRect();
  const scaleX = colorPickerCanvas.width / rect.width;
  const scaleY = colorPickerCanvas.height / rect.height;
  const x = Math.floor((e.clientX - rect.left) * scaleX);
  const y = Math.floor((e.clientY - rect.top) * scaleY);

  pickColor(x, y);

  colorCrosshair.style.left = (e.clientX - rect.left) + 'px';
  colorCrosshair.style.top = (e.clientY - rect.top) + 'px';
}

function handleColorPickMove(e) {
  if (e.buttons !== 1) return;

  const rect = colorPickerCanvas.getBoundingClientRect();
  const scaleX = colorPickerCanvas.width / rect.width;
  const scaleY = colorPickerCanvas.height / rect.height;
  const x = Math.floor((e.clientX - rect.left) * scaleX);
  const y = Math.floor((e.clientY - rect.top) * scaleY);

  pickColor(x, y);

  colorCrosshair.style.left = (e.clientX - rect.left) + 'px';
  colorCrosshair.style.top = (e.clientY - rect.top) + 'px';
}

function pickColor(x, y) {
  const ctx = colorPickerCanvas.getContext('2d');
  const pixel = ctx.getImageData(x, y, 1, 1).data;

  selectedColor = '#' + [pixel[0], pixel[1], pixel[2]]
    .map(v => v.toString(16).padStart(2, '0'))
    .join('');

  colorSwatch.style.background = selectedColor;
  colorValue.textContent = selectedColor.toUpperCase();
}

function processImage() {
  if (!originalImageData) {
    showToast('请先选择图片');
    return;
  }

  const activeBtn = document.querySelector('.mode-btn.active');
  const mode = activeBtn ? activeBtn.dataset.mode : 'auto';
  const threshold = tolerance;

  showLoading(true, '抠图中...');
  progressFill.style.width = '0%';

  setTimeout(() => {
    try {
      const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        originalImageData.width,
        originalImageData.height
      );

      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const totalPixels = width * height;

      let targetR, targetG, targetB;

      if (mode === 'auto') {
        const corners = [
          { x: 0, y: 0 },
          { x: width - 1, y: 0 },
          { x: 0, y: height - 1 },
          { x: width - 1, y: height - 1 },
        ];

        let r = 0, g = 0, b = 0, count = 0;
        corners.forEach(({ x, y }) => {
          const i = (y * width + x) * 4;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        });

        targetR = Math.round(r / count);
        targetG = Math.round(g / count);
        targetB = Math.round(b / count);
      } else if (mode === 'white') {
        targetR = 255;
        targetG = 255;
        targetB = 255;
      } else if (mode === 'black') {
        targetR = 0;
        targetG = 0;
        targetB = 0;
      } else {
        const hex = selectedColor.replace('#', '');
        targetR = parseInt(hex.substr(0, 2), 16);
        targetG = parseInt(hex.substr(2, 2), 16);
        targetB = parseInt(hex.substr(4, 2), 16);
      }

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const distance = Math.sqrt(
          Math.pow(r - targetR, 2) +
          Math.pow(g - targetG, 2) +
          Math.pow(b - targetB, 2)
        );

        if (distance < threshold) {
          data[i + 3] = 0;
        }

        const pixelIndex = i / 4;
        if (pixelIndex % 1000 === 0) {
          progressFill.style.width = `${Math.round((pixelIndex / totalPixels) * 100)}%`;
        }
      }

      const ctx = resultCanvas.getContext('2d');
      ctx.putImageData(imageData, 0, 0);

      progressFill.style.width = '100%';
      showLoading(false);
      downloadBtn.disabled = false;
      showToast('抠图完成！');
    } catch (err) {
      console.error('处理失败:', err);
      showToast('抠图处理失败');
      showLoading(false);
    }
  }, 100);
}

function downloadImage() {
  if (resultCanvas.width === 0) {
    showToast('没有可下载的结果');
    return;
  }

  const link = document.createElement('a');
  link.download = 'removed-background.png';
  link.href = resultCanvas.toDataURL('image/png');
  link.click();
  showToast('图片已下载');
}

function showLoading(show, text = '处理中...') {
  loadingOverlay.style.display = show ? 'flex' : 'none';
  loadingText.textContent = text;
  if (!show) {
    progressFill.style.width = '0%';
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

const toastStyle = document.createElement('style');
toastStyle.textContent = `
  .toast-message {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #333;
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 0.9rem;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 2000;
    white-space: nowrap;
  }
  .toast-message.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;
document.head.appendChild(toastStyle);

document.addEventListener('DOMContentLoaded', init);
