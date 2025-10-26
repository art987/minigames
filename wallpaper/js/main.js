// 主JavaScript文件 - 处理全局交互功能

// 广告弹窗相关
const adModal = document.getElementById('adModal');
const closeAdButton = document.getElementById('closeAdButton');
const downloadCountdown = document.getElementById('downloadCountdown');
const finalDownloadButton = document.getElementById('finalDownloadButton');
let currentDownloadUrl = '';
let countdownInterval = null;

// 关闭广告弹窗
if (closeAdButton) {
    closeAdButton.addEventListener('click', () => {
        adModal.classList.remove('show');
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });
}

// 最终下载按钮点击事件
if (finalDownloadButton) {
    finalDownloadButton.addEventListener('click', () => {
        // 创建下载链接并触发下载
        const downloadLink = document.createElement('a');
        downloadLink.href = currentDownloadUrl;
        downloadLink.download = '';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // 关闭弹窗
        adModal.classList.remove('show');
    });
}

// 打开广告弹窗并开始倒计时
export function openAdModal(downloadUrl) {
    if (!adModal || !downloadCountdown || !finalDownloadButton) return;
    
    currentDownloadUrl = downloadUrl;
    adModal.classList.add('show');
    
    // 重置倒计时
    let countdown = 3;
    downloadCountdown.textContent = countdown;
    finalDownloadButton.classList.remove('show');
    
    // 清除之前的定时器
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // 开始倒计时
    countdownInterval = setInterval(() => {
        countdown--;
        downloadCountdown.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            finalDownloadButton.classList.add('show');
        }
    }, 1000);
}

// 预览图片功能
export function previewImage(imageUrl) {
    window.open(imageUrl, '_blank', 'width=800,height=600');
}

// 导出公共函数
export default {
    openAdModal,
    previewImage
};