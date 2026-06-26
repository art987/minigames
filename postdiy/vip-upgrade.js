/**
 * VIP升级弹窗 - 首页和编辑页共享
 * 提供升级码激活和套餐购买功能
 */

// 券码验证结果弹窗
function showVoucherResult(element, type, message, errorDetails = null) {
  // 创建弹窗容器
  const modal = document.createElement('div');
  modal.className = 'voucher-result-modal';
  
  // 创建弹窗内容
  const modalContent = document.createElement('div');
  modalContent.className = 'voucher-result-modal-content';
  
  // 根据类型添加样式类
  if (type === 'success') {
    modalContent.classList.add('success');
  } else if (type === 'error') {
    modalContent.classList.add('error');
  } else if (type === 'info') {
    modalContent.classList.add('info');
  }
  
  // 添加右上角关闭打叉按钮
  const closeXBtn = document.createElement('button');
  closeXBtn.className = 'voucher-result-close-btn x-btn';
  closeXBtn.textContent = '×';
  closeXBtn.onclick = function() {
    document.body.removeChild(modal);
  };
  modalContent.appendChild(closeXBtn);
  
  // 设置弹窗标题
  const modalTitle = document.createElement('h3');
  modalTitle.className = 'voucher-result-modal-title';
  modalTitle.textContent = type === 'success' ? '验证成功' : type === 'info' ? '提示信息' : '验证失败';
  modalContent.appendChild(modalTitle);
  
  // 设置消息内容
  const messageDiv = document.createElement('div');
  messageDiv.className = 'voucher-result-message';
  messageDiv.textContent = message;
  modalContent.appendChild(messageDiv);
  
  // 设置错误日志（默认隐藏）
  if (type === 'error' && errorDetails) {
    const errorLogDiv = document.createElement('div');
    errorLogDiv.id = 'voucherErrorLog';
    errorLogDiv.className = 'voucher-error-log';
    const timestamp = new Date().toLocaleString('zh-CN');
    const logContent = `[${timestamp}] 错误信息：${JSON.stringify(errorDetails)}
[${timestamp}] 验证失败：${message}`;
    errorLogDiv.textContent = logContent;
    modalContent.appendChild(errorLogDiv);
    
    // 添加复制日志按钮
    const copyLogBtn = document.createElement('button');
    copyLogBtn.id = 'copyErrorLogBtn';
    copyLogBtn.className = 'copy-log-btn';
    copyLogBtn.textContent = '复制错误日志';
    copyLogBtn.onclick = function() {
      const logContent = errorLogDiv.textContent;
      if (logContent) {
        navigator.clipboard.writeText(logContent).then(() => {
          alert('错误日志已复制到剪贴板');
        }).catch(err => {
          console.error('复制失败:', err);
          alert('复制失败，请手动复制');
        });
      }
    };
    modalContent.appendChild(copyLogBtn);
  }
  
  // 添加底部关闭按钮
  const closeBtn = document.createElement('button');
  closeBtn.className = 'voucher-result-close';
  closeBtn.textContent = '关闭';
  closeBtn.onclick = function() {
    document.body.removeChild(modal);
  };
  modalContent.appendChild(closeBtn);
  
  // 组装弹窗
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// VIP升级弹窗（升级码激活 + 套餐购买）
window.showVipUpgradeModal = function() {
  let existingModal = document.getElementById('vipUpgradeModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'vipUpgradeModal';
  modal.className = 'modal-overlay';
  modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; display: flex; align-items: center; justify-content: center;';

  modal.innerHTML = `
    <div class="vip-upgrade-modal">
      <button id="closeVipUpgradeBtn" class="close-modal-btn">&times;</button>
      
      <h3 class="vip-upgrade-header">
        提速增效，上千节日海报模板随时可用
      </h3>
      
      <div class="voucher-input-container">
        <span class="upgrade-channel-label">升级通道一：</span>
        <div class="input-button-group">
          <div class="input-wrapper">
            <input type="text" id="voucherCodeInput" class="voucher-input" placeholder="请输入升级码">
            <button id="clearInputBtn" class="clear-input-btn" style="display: none;">X</button>
            <button id="pasteInputBtn" class="paste-input-btn">粘贴</button>
          </div>
          <button id="verifyVoucherBtn" class="verify-btn">验证</button>
        </div>
      </div>
      
      <div id="voucherResult" class="voucher-result">
        <div id="voucherErrorMessage" class="voucher-error-message"></div>
        <div id="voucherErrorLog" class="voucher-error-log"></div>
        <button id="copyErrorLogBtn" class="copy-error-log-btn">复制错误日志</button>
      </div>
      
      <div class="vip-packages-section">
        <div class="vip-packages-title">升级通道二：(周年感恩大送)</div>
        <div class="vip-packages-wrapper">
          <div class="vip-packages-container">
            <div class="vip-package selected" data-duration="1" data-price="9.9" data-original-price="20">
              <h5 class="package-title">1个月VIP</h5>
              <div class="package-price">
                <span class="package-current-price">¥9.9</span>
                <span class="package-original-price">¥60</span>
              </div>
              <div class="package-saving">≈半杯奶茶</div>
              <button class="select-package-btn">✔ 已选择</button>
            </div>
            
            <div class="vip-package" data-duration="3" data-price="16.9" data-original-price="60">
              <h5 class="package-title">3个月VIP</h5>
              <div class="package-price">
                <span class="package-current-price">¥16.9</span>
                <span class="package-original-price">¥60</span>
              </div>
              <div class="package-saving">≈买1月送2月</div>
              <button class="select-package-btn">选择</button>
            </div>
            
            <div class="vip-package" data-duration="6" data-price="19.9" data-original-price="120">
              <h5 class="package-title">6个月VIP</h5>
              <div class="package-price">
                <span class="package-current-price">¥19.9</span>
                <span class="package-original-price">¥120</span>
              </div>
              <div class="package-saving">≈买1月送5月</div>
              <button class="select-package-btn">选择</button>
            </div>
            
            <div class="vip-package vip-package-featured" data-duration="12" data-price="23.9" data-original-price="240">
              <div class="package-badge">超值</div>
              <h5 class="package-title">1年VIP</h5>
              <div class="package-price">
                <span class="package-current-price">¥23.9</span>
                <span class="package-original-price">¥240</span>
              </div>
              <div class="package-saving">≈买1月送11月</div>
              <button class="select-package-btn">选择</button>
            </div>
            
            <div class="vip-package" data-duration="24" data-price="33.9" data-original-price="480">
              <h5 class="package-title">2年VIP</h5>
              <div class="package-price">
                <span class="package-current-price">¥33.9</span>
                <span class="package-original-price">¥480</span>
              </div>
              <div class="package-saving">≈买2月送22月</div>
              <button class="select-package-btn">选择</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="vip-upgrade-actions">
        <button id="closeVipUpgradeBtn2" class="close-upgrade-btn">关闭</button>
        <div class="payment-btn-wrapper">
          <button id="proceedToPaymentBtn" class="proceed-to-payment-btn">立即支付9.9元</button>
          <div class="discount-badge payment-discount-badge">1折</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const voucherInput = document.getElementById('voucherCodeInput');
  const verifyBtn = document.getElementById('verifyVoucherBtn');
  const resultDiv = document.getElementById('voucherResult');
  const closeBtn = document.getElementById('closeVipUpgradeBtn');
  const closeBtn2 = document.getElementById('closeVipUpgradeBtn2');
  const proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn');
  const clearInputBtn = document.getElementById('clearInputBtn');
  const pasteInputBtn = document.getElementById('pasteInputBtn');

  function updateInputButtons() {
    if (voucherInput.value.length > 0) {
      clearInputBtn.style.display = 'flex';
      pasteInputBtn.style.display = 'none';
    } else {
      clearInputBtn.style.display = 'none';
      pasteInputBtn.style.display = 'flex';
    }
  }

  updateInputButtons();
  voucherInput.addEventListener('input', updateInputButtons);

  clearInputBtn.addEventListener('click', () => {
    voucherInput.value = '';
    updateInputButtons();
    voucherInput.focus();
  });

  pasteInputBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      voucherInput.value = text;
      updateInputButtons();
      voucherInput.focus();
    } catch (err) {
      console.error('粘贴失败:', err);
      alert('无法读取剪贴板内容，请手动输入');
    }
  });

  const closeModal = () => modal.remove();
  closeBtn.addEventListener('click', closeModal);
  closeBtn2.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  verifyBtn.addEventListener('click', async () => {
    const code = voucherInput.value.trim();
    if (!code) {
      showVoucherResult(resultDiv, 'error', '请输入升级码');
      return;
    }

    verifyBtn.classList.add('pulse-animation');
    verifyBtn.disabled = true;
    verifyBtn.textContent = '验证中...';

    try {
      let userId = typeof VIPSystem !== 'undefined' ? VIPSystem.getUserId() : null;
      
      if (!userId || typeof userId !== 'string' || userId.trim() === '' || userId.trim() === 'undefined') {
        showVoucherResult(resultDiv, 'error', '请先登录后再验证升级码');
        verifyBtn.disabled = false;
        verifyBtn.textContent = '验证';
        return;
      }
      
      const result = await VIPSystem.verifyVoucher(code, userId);

      if (result.success) {
        if (result.used) {
          const usedAt = new Date(result.usedAt);
          const phone = result.usedByPhone || '';
          const maskedPhone = phone ? phone.substring(0, 4) + '...' + phone.substring(phone.length - 4) : '';
          const dateStr = `${usedAt.getFullYear()}年${String(usedAt.getMonth() + 1).padStart(2, '0')}月${String(usedAt.getDate()).padStart(2, '0')}日`;
          
          showVoucherResult(resultDiv, 'info', `验证码：${code}已于${dateStr}，账号(${maskedPhone})激活使用，增加时长${result.duration}个月`);
        } else {
          const validUntil = new Date(result.validUntil);
          const dateStr = `${validUntil.getFullYear()}年${String(validUntil.getMonth() + 1).padStart(2, '0')}月${String(validUntil.getDate()).padStart(2, '0')}日`;
          
          showVoucherResult(resultDiv, 'success', `恭喜，升级成功，您的账号已经成功升级VIP账号，增时${result.duration}个月，有效时间至 ${dateStr} 24时0分0秒`);
          
          setTimeout(() => modal.remove(), 3000);
        }
      } else {
        showVoucherResult(resultDiv, 'error', '验证失败 请准确复制升级码，或联系客服解决', result);
      }
    } catch (error) {
      console.error('验证升级码失败:', error);
      showVoucherResult(resultDiv, 'error', '验证失败，请稍后重试', error);
    } finally {
      verifyBtn.disabled = false;
      verifyBtn.textContent = '验证';
      verifyBtn.classList.remove('pulse-animation');
    }
  });

  voucherInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyBtn.click();
  });

  voucherInput.focus();
  
  function updatePaymentDiscountBadge(selectedPackage) {
    if (!selectedPackage) return;
    
    const price = parseFloat(selectedPackage.dataset.price);
    const originalPrice = parseFloat(selectedPackage.dataset.originalPrice);
    
    if (price && originalPrice) {
      const discount = (price / originalPrice * 10).toFixed(1);
      
      let badge = document.querySelector('.payment-discount-badge');
      
      if (badge) {
        badge.textContent = `${discount}折`;
        badge.classList.remove('pulse-animation');
        setTimeout(() => badge.classList.add('pulse-animation'), 10);
      }
    }
  }
  
  setTimeout(function() {
    const packages = document.querySelectorAll('.vip-package');
    const featuredPackage = document.querySelector('.vip-package.vip-package-featured');
    
    if (featuredPackage) {
      featuredPackage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      
      packages.forEach(p => {
        p.classList.remove('selected');
        const selectBtn = p.querySelector('.select-package-btn');
        if (selectBtn) selectBtn.textContent = '选择';
      });
      
      featuredPackage.classList.add('selected');
      
      const selectBtn = featuredPackage.querySelector('.select-package-btn');
      if (selectBtn) selectBtn.textContent = '✔ 已选择';
      
      updatePaymentDiscountBadge(featuredPackage);
      
      const price = featuredPackage.dataset.price;
      if (proceedToPaymentBtn) {
        proceedToPaymentBtn.textContent = `立即支付${price}元`;
        proceedToPaymentBtn.style.display = 'block';
      }
    }
  }, 500);
  
  const vipPackages = document.querySelectorAll('.vip-package');
  vipPackages.forEach(pkg => {
    pkg.addEventListener('click', function() {
      vipPackages.forEach(p => {
        p.classList.remove('selected');
        const selectBtn = p.querySelector('.select-package-btn');
        if (selectBtn) selectBtn.textContent = '选择';
      });
      
      this.classList.add('selected');
      this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      
      const selectBtn = this.querySelector('.select-package-btn');
      if (selectBtn) selectBtn.textContent = '✔ 已选择';
      
      updatePaymentDiscountBadge(this);
      
      const price = this.dataset.price;
      if (proceedToPaymentBtn) {
        proceedToPaymentBtn.textContent = `立即支付${price}元`;
        proceedToPaymentBtn.style.display = 'block';
      }
    });
  });
  
  if (proceedToPaymentBtn) {
    proceedToPaymentBtn.addEventListener('click', async function() {
      const selectedPackage = document.querySelector('.vip-package.selected');
      if (!selectedPackage) {
        alert('请先选择一个套餐');
        return;
      }
      
      if (!VIPSystem.isLoggedIn()) {
        alert('请先登录');
        return;
      }
      
      const duration = parseInt(selectedPackage.dataset.duration);
      const price = selectedPackage.dataset.price;
      const type = 'wxpay';
      
      console.log('支付参数:', { duration, price, type, isLoggedIn: VIPSystem.isLoggedIn() });
      console.log('userId:', VIPSystem.getUserId());
      
      const loadingModal = document.createElement('div');
      loadingModal.id = 'paymentLoadingModal';
      loadingModal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 10001; display: flex; align-items: center; justify-content: center;';
      loadingModal.innerHTML = `
        <div style="background: #fff; border-radius: 12px; padding: 24px; text-align: center;">
          <div style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #d32f2f; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
          <p style="margin: 0; color: #333;">正在创建订单...</p>
        </div>
      `;
      document.body.appendChild(loadingModal);
      
      try {
        const returnUrl = window.location.href.split('?')[0];
        const result = await VIPSystem.createPaymentOrder(price, duration, type, returnUrl);
        
        loadingModal.remove();
        
        if (result.success && result.data && result.data.payUrl) {
          window.location.href = result.data.payUrl;
        } else {
          alert(result.message || '创建订单失败，请稍后重试');
        }
      } catch (error) {
        loadingModal.remove();
        console.error('支付失败:', error);
        alert('支付失败，请稍后重试');
      }
    });
  }
};