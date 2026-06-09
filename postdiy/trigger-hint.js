/**
 * 简化版触发区域提示功能
 * 使用一个 .active 类控制所有元素的显示/隐藏，确保完全同步
 */

(function() {
  'use strict';

  // 等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', function() {
    const triggerArea = document.getElementById('templateTriggerArea');
    if (!triggerArea) return;

    const leftArea = triggerArea.querySelector('.trigger-left');
    const topArea = triggerArea.querySelector('.trigger-top');
    const bottomArea = triggerArea.querySelector('.trigger-bottom');

    let currentTarget = null;
    let hideTimer = null;

    // 双击检测变量
    let lastTapTime = 0;
    let lastTapArea = null;
    const DOUBLE_TAP_DELAY = 300;

    // 显示提示
    function showTriggerHint(target) {
      // 清除之前的隐藏定时器
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }

      // 添加 active 类，同步显示背景、边框、文字
      target.classList.add('active');

      // 2秒后自动隐藏
      hideTimer = setTimeout(() => {
        hideTriggerHint(target);
      }, 2000);
    }

    // 隐藏提示
    function hideTriggerHint(target) {
      // 移除 active 类，同步隐藏背景、边框、文字
      target.classList.remove('active');
    }

    // 鼠标悬停事件（桌面端）
    if (leftArea) {
      leftArea.addEventListener('mouseenter', () => showTriggerHint(leftArea));
      leftArea.addEventListener('mouseleave', () => hideTriggerHint(leftArea));
    }
    if (topArea) {
      topArea.addEventListener('mouseenter', () => showTriggerHint(topArea));
      topArea.addEventListener('mouseleave', () => hideTriggerHint(topArea));
    }
    if (bottomArea) {
      bottomArea.addEventListener('mouseenter', () => showTriggerHint(bottomArea));
      bottomArea.addEventListener('mouseleave', () => hideTriggerHint(bottomArea));
    }

    // 触摸开始事件（移动端）
    triggerArea.addEventListener('touchstart', function(e) {
      const touch = e.touches[0];
      const rect = triggerArea.getBoundingClientRect();
      const clickX = touch.clientX - rect.left;
      const clickY = touch.clientY - rect.top;
      const areaWidth = rect.width;
      const areaHeight = rect.height;

      // 判断点击区域
      if (clickX < areaWidth / 2) {
        currentTarget = leftArea;
        showTriggerHint(currentTarget);
      } else {
        if (clickY < areaHeight / 2) {
          currentTarget = topArea;
          showTriggerHint(currentTarget);
        } else {
          currentTarget = bottomArea;
          showTriggerHint(currentTarget);
        }
      }
    });

    // 触摸结束事件（移动端）
    triggerArea.addEventListener('touchend', function(e) {
      if (currentTarget) {
        hideTriggerHint(currentTarget);

        const touch = e.changedTouches[0];
        const rect = triggerArea.getBoundingClientRect();
        const clickX = touch.clientX - rect.left;
        const clickY = touch.clientY - rect.top;
        const areaWidth = rect.width;
        const areaHeight = rect.height;

        // 判断点击区域
        let tappedArea = null;
        if (clickX < areaWidth / 2) {
          tappedArea = 'left';
        } else {
          if (clickY < areaHeight / 2) {
            tappedArea = 'top';
          } else {
            tappedArea = 'bottom';
          }
        }

        // 双击检测
        const currentTime = Date.now();
        if (lastTapArea === tappedArea && (currentTime - lastTapTime) < DOUBLE_TAP_DELAY) {
          // 双击触发功能
          if (tappedArea === 'left') {
            // 打开模板选择弹窗
            if (typeof window.openTemplateModal === 'function') {
              window.openTemplateModal();
            }
          } else if (tappedArea === 'top') {
            // 打开相册
            const uploadBtn = document.getElementById('uploadBackgroundBtn');
            if (uploadBtn) uploadBtn.click();
          } else if (tappedArea === 'bottom') {
            // 打开拍照
            const takePhotoBtn = document.getElementById('takePhotoBtn');
            if (takePhotoBtn) takePhotoBtn.click();
          }

          // 重置双击检测
          lastTapTime = 0;
          lastTapArea = null;
        } else {
          // 记录本次点击
          lastTapTime = currentTime;
          lastTapArea = tappedArea;
        }

        currentTarget = null;
      }
    });
  });
})();
