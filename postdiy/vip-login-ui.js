// VIP 登录 UI 模块
const VipLoginUI = (function() {
  // DOM 元素缓存
  let elements = {}
  let eventsBound = false
  let switchEventsBound = false
  let smsSent = false
  let loginModalDismissedThisSession = false  // 本次会话是否已关闭登录弹窗
  let isForceLoginMode = false  // 是否处于强制登录模式（全屏，不可关闭）
  
  // 检查支付成功状态
  function checkPaymentSuccess() {
    const urlParams = new URLSearchParams(window.location.search)
    const outTradeNo = urlParams.get('out_trade_no')
    const paySuccess = urlParams.get('pay_success')
    
    if (paySuccess === 'true' || outTradeNo) {
      showPaymentSuccessModal(outTradeNo)
      const newUrl = window.location.href.split('?')[0]
      window.history.replaceState({}, '', newUrl)
    }
  }
  
  // 显示支付成功弹窗
  function showPaymentSuccessModal(outTradeNo) {
    const modalHTML = `
      <div id="paymentSuccessModal" class="payment-success-modal">
        <div class="payment-success-content">
          <div class="payment-success-icon">
            <i class="fa fa-check"></i>
          </div>
          <h3 class="payment-success-title">升级成功</h3>
          <p class="payment-success-message">恭喜您！VIP会员已成功开通，现在可以享受全部特权功能。</p>
          <button id="closePaymentSuccessBtn" class="payment-success-btn">确定</button>
        </div>
      </div>
    `
    
    document.body.insertAdjacentHTML('beforeend', modalHTML)
    
    // 替换Font Awesome图标为SVG图标
    if (typeof replaceFAIcons === 'function') {
      replaceFAIcons()
    }
    
    const modal = document.getElementById('paymentSuccessModal')
    const closeBtn = document.getElementById('closePaymentSuccessBtn')
    
    const closeModal = () => {
      modal.remove()
      updateVipStatus()
    }
    
    closeBtn.addEventListener('click', closeModal)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal()
    })
  }
  
  // 初始化 DOM 元素
  function initElements() {
    elements.vipLoginBtn = document.getElementById('vipLoginBtn')
    elements.vipLoggedInMenu = document.getElementById('vipLoggedInMenu')
    elements.vipMenuToggle = document.getElementById('vipMenuToggle')
    elements.vipDropdownMenu = document.getElementById('vipDropdownMenu')
    elements.vipMenuItems = document.querySelectorAll('.vip-menu-item')
    elements.vipLoginModal = document.getElementById('vipLoginModal')
    elements.closeVipLoginModalBtn = document.getElementById('closeVipLoginModalBtn')
    elements.vipPhoneInput = document.getElementById('vipPhoneInput')
    elements.vipCodeInput = document.getElementById('vipCodeInput')
    elements.sendVipCodeBtn = document.getElementById('sendVipCodeBtn')
    elements.vipLoginMessage = document.getElementById('vipLoginMessage')
    elements.vipLoginSubmitBtn = document.getElementById('vipLoginSubmitBtn')
    elements.vipLoginCancelBtn = document.getElementById('vipLoginCancelBtn')
    elements.vipPasswordInput = document.getElementById('vipPasswordInput')
    elements.vipConfirmPasswordInput = document.getElementById('vipConfirmPasswordInput')
    elements.togglePasswordBtn = document.getElementById('togglePasswordBtn')
    elements.toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPasswordBtn')
    elements.vipPasswordSubmitBtn = document.getElementById('vipPasswordSubmitBtn')
    elements.vipPasswordCancelBtn = document.getElementById('vipPasswordCancelBtn')
    elements.vipPasswordLoginSubmitBtn = document.getElementById('vipPasswordLoginSubmitBtn')
    elements.vipPasswordLoginCancelBtn = document.getElementById('vipPasswordLoginCancelBtn')
    elements.switchToCodeBtn = document.getElementById('switchToCodeBtn')
    elements.switchToPasswordBtn = document.getElementById('switchToPasswordBtn')
    elements.userInfoModal = document.getElementById('userInfoModal')
    elements.closeUserInfoModal = document.getElementById('closeUserInfoModal')
    elements.closeUserInfoBtn = document.getElementById('closeUserInfoBtn')
    elements.userInfoId = document.getElementById('userInfoId')
    elements.userInfoExpiry = document.getElementById('userInfoExpiry')
    elements.userInfoType = document.getElementById('userInfoType')
  }

  // 更新 VIP 登录状态 UI
  function updateVipStatus() {
    const loginBtn = document.getElementById('vipLoginBtn')
    const loggedInMenu = document.getElementById('vipLoggedInMenu')
    const dropdownMenu = document.getElementById('vipDropdownMenu')

    if (VIPSystem.isLoggedIn()) {
      if (loginBtn) loginBtn.classList.add('hidden')
      if (loggedInMenu) loggedInMenu.classList.remove('hidden')
      if (dropdownMenu) dropdownMenu.style.display = 'none'
    } else {
      if (loginBtn) loginBtn.classList.remove('hidden')
      if (loggedInMenu) loggedInMenu.classList.add('hidden')
      if (dropdownMenu) dropdownMenu.style.display = 'none'
    }
  }

  // 显示登录弹窗
  // forceMode: true 表示强制登录模式（全屏，不可关闭）
  function showLoginModal(forceMode = false) {
    if (!elements.vipLoginModal) {
      console.error('VIP 登录弹窗元素不存在')
      return
    }
    
    // 设置强制登录模式
    isForceLoginMode = forceMode
    
    // 根据模式切换全屏样式
    if (forceMode) {
      elements.vipLoginModal.classList.add('fullscreen')
      console.log('[VipLoginUI] 强制登录模式开启，弹窗全屏且不可关闭')
    } else {
      elements.vipLoginModal.classList.remove('fullscreen')
    }
    
    renderLoginChoiceForm()
    elements.vipLoginModal.classList.remove('hidden')
  }

  // 渲染登录选择界面（第一步）
  function renderLoginChoiceForm() {
    if (!elements.vipLoginModal) return

    const formHTML = `
      <div class="vip-login-form login-choice-form">
        <div class="login-choice-section">
          <p class="login-choice-hint">还没账号 / 忘记密码</p>
          <button id="choiceRegisterBtn" class="action-btn primary login-choice-btn">注册账号 / 验证码登录</button>
        </div>
        <div class="login-choice-divider"></div>
        <div class="login-choice-section">
          <p class="login-choice-hint">已经有账号和密码</p>
          <button id="choicePasswordLoginBtn" class="action-btn secondary login-choice-btn">密码登录</button>
        </div>
      </div>
    `

    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      bindLoginChoiceEvents()
    }
  }

  // 绑定登录选择界面事件
  function bindLoginChoiceEvents() {
    const choiceRegisterBtn = document.getElementById('choiceRegisterBtn')
    const choicePasswordLoginBtn = document.getElementById('choicePasswordLoginBtn')

    if (choiceRegisterBtn) {
      choiceRegisterBtn.addEventListener('click', () => {
        transitionToForm('code')
      })
    }

    if (choicePasswordLoginBtn) {
      choicePasswordLoginBtn.addEventListener('click', () => {
        transitionToForm('password')
      })
    }
  }

  // 平滑过渡到指定表单
  function transitionToForm(formType) {
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (!formContainer) return

    formContainer.classList.remove('form-transition-in')
    formContainer.classList.add('form-transition-out')

    setTimeout(() => {
      if (formType === 'code') {
        renderLoginForm()
      } else if (formType === 'password') {
        renderPasswordLoginForm()
      } else if (formType === 'password-set') {
        renderPasswordForm()
      }
      const newFormContainer = elements.vipLoginModal.querySelector('.vip-login-form')
      if (newFormContainer) {
        newFormContainer.classList.remove('form-transition-out')
        void newFormContainer.offsetWidth
        newFormContainer.classList.add('form-transition-in')
      }
    }, 300)
  }

  // 平滑过渡到登录选择界面
  function transitionToChoiceForm() {
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (!formContainer) return

    formContainer.classList.remove('form-transition-in')
    formContainer.classList.add('form-transition-out')

    setTimeout(() => {
      renderLoginChoiceForm()
      const newFormContainer = elements.vipLoginModal.querySelector('.vip-login-form')
      if (newFormContainer) {
        newFormContainer.classList.remove('form-transition-out')
        void newFormContainer.offsetWidth
        newFormContainer.classList.add('form-transition-in')
      }
    }, 300)
  }

  // 显示密码设置弹窗
  function showPasswordModal() {
    if (!elements.vipLoginModal) {
      console.error('VIP 登录弹窗元素不存在')
      return
    }
    transitionToForm('password-set')
  }

  // 显示密码登录弹窗
  function showPasswordLoginModal() {
    if (!elements.vipLoginModal) {
      console.error('VIP 登录弹窗元素不存在')
      return
    }
    transitionToForm('password')
  }

  // 隐藏登录弹窗
  function hideLoginModal() {
    // 强制登录模式下不允许关闭弹窗（必须登录才能继续）
    if (isForceLoginMode) {
      console.log('[VipLoginUI] 强制登录模式下不允许关闭弹窗')
      showMessage('请先登录或注册以继续使用', 'error')
      return
    }
    
    if (!elements.vipLoginModal) {
      return
    }
    elements.vipLoginModal.classList.add('hidden')
    elements.vipLoginModal.classList.remove('fullscreen')
    clearMessage()
    clearInputs()
    // 标记本次会话已关闭登录弹窗（不再自动弹出）
    loginModalDismissedThisSession = true
  }
  
  // 登录成功后关闭弹窗（解除强制模式）
  function closeAfterLoginSuccess() {
    // 解除强制登录模式
    isForceLoginMode = false
    
    if (!elements.vipLoginModal) {
      return
    }
    elements.vipLoginModal.classList.add('hidden')
    elements.vipLoginModal.classList.remove('fullscreen')
    clearMessage()
    clearInputs()
    console.log('[VipLoginUI] 登录成功，关闭弹窗')
  }
  
  // 清除输入框
  function clearInputs() {
    if (elements.vipPhoneInput) elements.vipPhoneInput.value = ''
    if (elements.vipCodeInput) elements.vipCodeInput.value = ''
    if (elements.vipPasswordInput) elements.vipPasswordInput.value = ''
  }
  
  // 显示消息
  function showMessage(message, type = 'error') {
    if (!elements.vipLoginMessage) return
    elements.vipLoginMessage.textContent = message
    elements.vipLoginMessage.className = 'login-message ' + type
    
    // 2秒后自动消失
    setTimeout(function() {
      clearMessage()
    }, 2000)
  }
  
  // 清除消息
  function clearMessage() {
    if (!elements.vipLoginMessage) return
    elements.vipLoginMessage.textContent = ''
    elements.vipLoginMessage.className = 'login-message'
  }
  
  // 设置发送验证码按钮状态
  function setSendCodeBtnState(countdown = null) {
    if (!elements.sendVipCodeBtn) return
    
    if (countdown === null) {
      elements.sendVipCodeBtn.disabled = false
      elements.sendVipCodeBtn.textContent = '发送验证码'
      elements.sendVipCodeBtn.classList.remove('countdown')
      smsSent = false
    } else {
      elements.sendVipCodeBtn.disabled = true
      elements.sendVipCodeBtn.textContent = `发送中 (${countdown})`
      elements.sendVipCodeBtn.classList.add('countdown')
      smsSent = true
    }
  }
  
  // 切换密码显示/隐藏
  function togglePasswordVisibility() {
    if (elements.vipPasswordInput && elements.togglePasswordBtn) {
      if (elements.vipPasswordInput.type === 'password') {
        elements.vipPasswordInput.type = 'text'
        elements.togglePasswordBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('eye-slash', 'svg-icon') : '<i class="fa fa-eye-slash"></i>'
      } else {
        elements.vipPasswordInput.type = 'password'
        elements.togglePasswordBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('eye', 'svg-icon') : '<i class="fa fa-eye"></i>'
      }
    }
  }
  
  // 渲染VIP升级弹窗
  function renderVipUpgradeForm() {
    if (!elements.vipLoginModal) return
    
    const formHTML = `
      <div class="vip-upgrade-form">
        <!-- 标题 -->
        <h3 style="margin: 0 0 24px 0; color: #d32f2f; font-size: 24px; font-weight: bold; text-align: center;">
          <span style="display: block; margin-bottom: 8px;">🎉 0秒等待升级VIP品牌账号</span>
          <span style="font-size: 14px; font-weight: normal; color: #666;">尊享多项特权，提升品牌形象</span>
        </h3>
        
        <!-- 升级码输入区域 -->
        <div style="margin-bottom: 32px; display: flex; gap: 12px;">
          <input type="text" id="voucherCodeInput" placeholder="请输入升级码" style="flex: 1; padding: 14px 16px; border: 2px solid #ffcdd2; border-radius: 8px; font-size: 16px; box-sizing: border-box; transition: all 0.3s ease;">
          <button id="verifyVoucherBtn" style="padding: 0 24px; background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">验证</button>
        </div>
        
        <!-- 结果显示 -->
        <div id="voucherResult" style="margin-bottom: 24px; padding: 16px; border-radius: 8px; display: none; background: #fff3f3; border: 1px solid #ffcdd2;">
          <div id="voucherErrorMessage" style="margin-bottom: 12px; color: #d32f2f; font-size: 14px;"></div>
          <div id="voucherErrorLog" style="background: #2d3748; color: #e2e8f0; padding: 12px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 12px; max-height: 200px; overflow-y: auto; margin-bottom: 12px; display: none;"></div>
          <button id="copyErrorLogBtn" style="font-size: 12px; padding: 6px 12px; background: #d32f2f; color: white; border: none; border-radius: 4px; cursor: pointer; display: none;">复制错误日志</button>
        </div>
        
        <!-- VIP会员时长选择模块 -->
        <div style="margin-bottom: 24px;">
          <h4 style="margin: 0 0 16px 0; color: #d32f2f; font-size: 18px; font-weight: bold;">💎 VIP会员套餐</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
            <!-- 1个月VIP -->
            <div class="vip-package" data-duration="1" data-price="9.9" data-original-price="20" style="padding: 16px; background: #fff; border: 2px solid #ffcdd2; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; position: relative;">
              <div style="position: absolute; top: -8px; right: -8px; background: #d32f2f; color: white; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 10px;">限时</div>
              <h5 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">1个月VIP</h5>
              <div style="margin-bottom: 8px;">
                <span style="color: #d32f2f; font-size: 18px; font-weight: bold;">¥9.9</span>
                <span style="color: #999; font-size: 12px; text-decoration: line-through; margin-left: 4px;">¥20</span>
              </div>
              <div style="font-size: 12px; color: #666; margin-bottom: 12px;">节省 ¥10.1</div>
              <button class="select-package-btn" style="width: 100%; padding: 8px; background: #fff; border: 1px solid #d32f2f; color: #d32f2f; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">选择</button>
            </div>
            
            <!-- 3个月VIP -->
            <div class="vip-package" data-duration="3" data-price="16.9" data-original-price="60" style="padding: 16px; background: #fff; border: 2px solid #ffcdd2; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; position: relative;">
              <div style="position: absolute; top: -8px; right: -8px; background: #d32f2f; color: white; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 10px;">热卖</div>
              <h5 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">3个月VIP</h5>
              <div style="margin-bottom: 8px;">
                <span style="color: #d32f2f; font-size: 18px; font-weight: bold;">¥16.9</span>
                <span style="color: #999; font-size: 12px; text-decoration: line-through; margin-left: 4px;">¥60</span>
              </div>
              <div style="font-size: 12px; color: #666; margin-bottom: 12px;">节省 ¥43.1</div>
              <button class="select-package-btn" style="width: 100%; padding: 8px; background: #fff; border: 1px solid #d32f2f; color: #d32f2f; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">选择</button>
            </div>
            
            <!-- 6个月VIP -->
            <div class="vip-package" data-duration="6" data-price="19.9" data-original-price="120" style="padding: 16px; background: #fff; border: 2px solid #ffcdd2; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; position: relative;">
              <div style="position: absolute; top: -8px; right: -8px; background: #d32f2f; color: white; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 10px;">超值</div>
              <h5 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">6个月VIP</h5>
              <div style="margin-bottom: 8px;">
                <span style="color: #d32f2f; font-size: 18px; font-weight: bold;">¥19.9</span>
                <span style="color: #999; font-size: 12px; text-decoration: line-through; margin-left: 4px;">¥120</span>
              </div>
              <div style="font-size: 12px; color: #666; margin-bottom: 12px;">节省 ¥100.1</div>
              <button class="select-package-btn" style="width: 100%; padding: 8px; background: #fff; border: 1px solid #d32f2f; color: #d32f2f; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">选择</button>
            </div>
            
            <!-- 1年VIP -->
            <div class="vip-package" data-duration="12" data-price="23.9" data-original-price="240" style="padding: 16px; background: #fff; border: 2px solid #ffcdd2; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; position: relative;">
              <div style="position: absolute; top: -8px; right: -8px; background: #d32f2f; color: white; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 10px;">推荐</div>
              <h5 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">1年VIP</h5>
              <div style="margin-bottom: 8px;">
                <span style="color: #d32f2f; font-size: 18px; font-weight: bold;">¥23.9</span>
                <span style="color: #999; font-size: 12px; text-decoration: line-through; margin-left: 4px;">¥240</span>
              </div>
              <div style="font-size: 12px; color: #666; margin-bottom: 12px;">节省 ¥216.1</div>
              <button class="select-package-btn" style="width: 100%; padding: 8px; background: #fff; border: 1px solid #d32f2f; color: #d32f2f; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">选择</button>
            </div>
            
            <!-- 2年VIP -->
            <div class="vip-package" data-duration="24" data-price="33.9" data-original-price="480" style="padding: 16px; background: #fff; border: 2px solid #ffcdd2; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; position: relative;">
              <div style="position: absolute; top: -8px; right: -8px; background: #d32f2f; color: white; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 10px;">终极</div>
              <h5 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">2年VIP</h5>
              <div style="margin-bottom: 8px;">
                <span style="color: #d32f2f; font-size: 18px; font-weight: bold;">¥33.9</span>
                <span style="color: #999; font-size: 12px; text-decoration: line-through; margin-left: 4px;">¥480</span>
              </div>
              <div style="font-size: 12px; color: #666; margin-bottom: 12px;">节省 ¥446.1</div>
              <button class="select-package-btn" style="width: 100%; padding: 8px; background: #fff; border: 1px solid #d32f2f; color: #d32f2f; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">选择</button>
            </div>
          </div>
        </div>
        
        <!-- 特权说明 -->
        <div style="margin-bottom: 24px; padding: 16px; background: #fff3f3; border-radius: 8px;">
          <h5 style="margin: 0 0 12px 0; color: #d32f2f; font-size: 14px; font-weight: bold;">🎁 VIP特权</h5>
          <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #666;">
            <li style="margin-bottom: 4px;">✅ 无水印海报下载</li>
            <li style="margin-bottom: 4px;">✅ 自定义品牌Logo</li>
            <li style="margin-bottom: 4px;">✅ 优先体验新功能</li>
            <li style="margin-bottom: 4px;">✅ 专属客服支持</li>
          </ul>
        </div>
        
        <!-- 操作按钮 -->
        <div style="display: flex; gap: 12px;">
          <button id="closeVipUpgradeBtn" style="flex: 1; padding: 14px; background: #f5f5f5; color: #333; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s ease;">关闭</button>
          <button id="proceedToPaymentBtn" style="flex: 1; padding: 14px; background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s ease; display: none;">立即支付</button>
        </div>
      </div>
    `
    
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      // 重新缓存新生成的元素
      elements.voucherCodeInput = document.getElementById('voucherCodeInput')
      elements.verifyVoucherBtn = document.getElementById('verifyVoucherBtn')
      elements.voucherResult = document.getElementById('voucherResult')
      elements.voucherErrorMessage = document.getElementById('voucherErrorMessage')
      elements.voucherErrorLog = document.getElementById('voucherErrorLog')
      elements.copyErrorLogBtn = document.getElementById('copyErrorLogBtn')
      elements.closeVipUpgradeBtn = document.getElementById('closeVipUpgradeBtn')
      elements.proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn')
      
      // 绑定事件
      bindVipUpgradeEvents()
    }
  }
  
  // 绑定VIP升级事件
  function bindVipUpgradeEvents() {
    // 验证升级码
    if (elements.verifyVoucherBtn) {
      elements.verifyVoucherBtn.addEventListener('click', async function() {
        const code = elements.voucherCodeInput.value.trim()
        const userId = VIPSystem.getUserId()
        
        if (!code) {
          showVoucherResult('请输入升级码', 'error')
          return
        }
        
        if (!userId) {
          showVoucherResult('请先登录', 'error')
          return
        }
        
        this.disabled = true
        this.textContent = '验证中...'
        
        const result = await VIPSystem.verifyVoucher(code, userId)
        
        this.disabled = false
        this.textContent = '验证'
        
        if (result.success) {
          if (result.used) {
            showVoucherResult(`升级码已被使用，使用时间：${new Date(result.usedAt).toLocaleString()}`, 'error')
          } else {
            showVoucherResult('升级成功！您现在是VIP用户', 'success')
            setTimeout(() => {
              hideLoginModal()
              location.reload()
            }, 1500)
          }
        } else {
          showVoucherResult(result.message || '验证失败，请稍后重试', 'error')
        }
      })
    }
    
    // 关闭按钮
    if (elements.closeVipUpgradeBtn) {
      elements.closeVipUpgradeBtn.addEventListener('click', hideLoginModal)
    }
    
    // 复制错误日志
    if (elements.copyErrorLogBtn) {
      elements.copyErrorLogBtn.addEventListener('click', function() {
        const errorLog = elements.voucherErrorLog.textContent
        navigator.clipboard.writeText(errorLog).then(() => {
          alert('错误日志已复制到剪贴板')
        })
      })
    }
    
    // VIP套餐选择
    const vipPackages = document.querySelectorAll('.vip-package')
    vipPackages.forEach(package => {
      package.addEventListener('click', function() {
        // 移除其他套餐的选中状态
        vipPackages.forEach(p => {
          p.style.borderColor = '#ffcdd2'
          p.style.transform = 'scale(1)'
          p.querySelector('.select-package-btn').style.background = '#fff'
          p.querySelector('.select-package-btn').style.color = '#d32f2f'
        })
        
        // 添加当前套餐的选中状态
        this.style.borderColor = '#d32f2f'
        this.style.transform = 'scale(1.05)'
        this.style.boxShadow = '0 4px 12px rgba(211, 47, 47, 0.2)'
        this.querySelector('.select-package-btn').style.background = '#d32f2f'
        this.querySelector('.select-package-btn').style.color = '#fff'
        
        // 显示立即支付按钮
        if (elements.proceedToPaymentBtn) {
          elements.proceedToPaymentBtn.style.display = 'block'
        }
      })
    })
    
    // 立即支付按钮
    if (elements.proceedToPaymentBtn) {
      elements.proceedToPaymentBtn.addEventListener('click', async function() {
        const selectedPackage = document.querySelector('.vip-package[style*="border-color: #d32f2f"]')
        if (!selectedPackage) {
          alert('请先选择一个套餐')
          return
        }
        
        if (!VIPSystem.isLoggedIn()) {
          alert('请先登录')
          return
        }
        
        const duration = parseInt(selectedPackage.dataset.duration)
        const price = selectedPackage.dataset.price
        
        showPaymentMethodModal(duration, price)
      })
    }
  }
  
  function showPaymentMethodModal(duration, price) {
    const existingModal = document.getElementById('paymentMethodModal')
    if (existingModal) {
      existingModal.remove()
    }
    
    const modalHTML = `
      <div id="paymentMethodModal" class="payment-method-modal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 10000; display: flex; align-items: center; justify-content: center;">
        <div class="payment-method-content" style="background: #fff; border-radius: 16px; padding: 24px; width: 90%; max-width: 320px; text-align: center;">
          <h3 style="margin: 0 0 20px; font-size: 18px; color: #333;">选择支付方式</h3>
          <p style="margin: 0 0 20px; color: #666; font-size: 14px;">支付金额: <span style="color: #d32f2f; font-size: 20px; font-weight: bold;">¥${price}</span></p>
          <div class="payment-methods" style="display: flex; flex-direction: column; gap: 12px;">
            <button class="payment-method-btn alipay" data-type="alipay" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; background: #1677FF; color: #fff; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.422 15.358c-3.83-1.153-6.055-1.84-7.373-2.313.566-1.248.983-2.638 1.22-4.078h-3.698V7.3h4.538V6.08h-4.538V3.6h-2.04c-.258 0-.468.21-.468.468v2.012H4.44v1.22h4.623v1.667H5.278v1.22h7.59c-.2 1.09-.528 2.118-.96 3.054-1.85-.55-3.672-.938-5.468-.938-3.36 0-5.4 1.56-5.4 3.6 0 2.04 1.92 3.6 5.16 3.6 2.28 0 4.32-.84 5.88-2.28 2.4 1.08 5.64 2.4 9.6 3.72.36.12.72-.12.84-.48.12-.36-.12-.72-.48-.84l-.6-.18zm-14.88.24c-2.04 0-3.24-.84-3.24-1.92s1.08-1.92 3.12-1.92c1.44 0 3 .3 4.68.84-1.2 1.68-2.88 3-4.56 3z"/>
              </svg>
              支付宝支付
            </button>
            <button class="payment-method-btn wxpay" data-type="wxpay" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; background: #07C160; color: #fff; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
              </svg>
              微信支付
            </button>
          </div>
          <button id="cancelPaymentMethodBtn" style="margin-top: 16px; padding: 10px 20px; background: #f5f5f5; color: #666; border: none; border-radius: 8px; font-size: 14px; cursor: pointer;">取消</button>
        </div>
      </div>
    `
    
    document.body.insertAdjacentHTML('beforeend', modalHTML)
    
    // 替换Font Awesome图标为SVG图标
    if (typeof replaceFAIcons === 'function') replaceFAIcons()
    
    const modal = document.getElementById('paymentMethodModal')
    const cancelBtn = document.getElementById('cancelPaymentMethodBtn')
    const paymentBtns = modal.querySelectorAll('.payment-method-btn')
    
    cancelBtn.addEventListener('click', function() {
      modal.remove()
    })
    
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove()
      }
    })
    
    paymentBtns.forEach(btn => {
      btn.addEventListener('click', async function() {
        const type = this.dataset.type
        modal.remove()
        
        await processPayment(duration, price, type)
      })
      
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)'
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
      })
      
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)'
        this.style.boxShadow = 'none'
      })
    })
  }
  
  async function processPayment(duration, price, type) {
    const loadingModal = document.createElement('div')
    loadingModal.id = 'paymentLoadingModal'
    loadingModal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 10001; display: flex; align-items: center; justify-content: center;'
    loadingModal.innerHTML = `
      <div style="background: #fff; border-radius: 12px; padding: 24px; text-align: center;">
        <div style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #d32f2f; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
        <p style="margin: 0; color: #333;">正在创建订单...</p>
      </div>
    `
    document.body.appendChild(loadingModal)
    
    try {
      const returnUrl = window.location.href.split('?')[0]
      const result = await VIPSystem.createPaymentOrder(price, duration, type, returnUrl)
      
      loadingModal.remove()
      
      if (result.success && result.data && result.data.payUrl) {
        window.location.href = result.data.payUrl
      } else {
        alert(result.message || '创建订单失败，请稍后重试')
      }
    } catch (error) {
      loadingModal.remove()
      console.error('支付失败:', error)
      alert('支付失败，请稍后重试')
    }
  }
  
  // 显示升级码验证结果
  function showVoucherResult(message, type = 'error') {
    if (!elements.voucherResult || !elements.voucherErrorMessage) return
    
    elements.voucherResult.style.display = 'block'
    elements.voucherErrorMessage.textContent = message
    
    if (type === 'success') {
      elements.voucherResult.style.background = '#e8f5e8'
      elements.voucherResult.style.borderColor = '#c8e6c9'
      elements.voucherErrorMessage.style.color = '#2e7d32'
    } else {
      elements.voucherResult.style.background = '#fff3f3'
      elements.voucherResult.style.borderColor = '#ffcdd2'
      elements.voucherErrorMessage.style.color = '#d32f2f'
    }
  }
  
  // 渲染登录表单（手机号+验证码）
  function renderLoginForm() {
    if (!elements.vipLoginModal) return
    
    const formHTML = `
      <div class="vip-login-form">
        <div class="form-group">
          <label for="vipPhoneInput" class="form-label">手机号</label>
          <input type="tel" id="vipPhoneInput" class="form-input" placeholder="请输入手机号">
        </div>
        <div class="form-group">
          <label for="vipCodeInput" class="form-label">验证码</label>
          <div class="code-input-wrapper">
            <input type="text" id="vipCodeInput" class="form-input code-input" placeholder="请输入4位验证码" maxlength="4">
            <button id="sendVipCodeBtn" class="send-code-btn">发送验证码</button>
          </div>
        </div>
        
        <div id="vipLoginMessage" class="login-message"></div>
        <div class="login-actions">
          <button id="vipLoginSubmitBtn" class="action-btn primary">登录/注册</button>
          <button id="vipLoginCancelBtn" class="action-btn secondary">返回</button>
        </div>
        <div class="login-method-switch">
          <span>没有收到验证码？</span>
          <button id="switchToPasswordBtn" class="switch-link">使用密码登录</button>
        </div>
      </div>
    `
    
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      // 重新缓存新生成的元素
      elements.vipPhoneInput = document.getElementById('vipPhoneInput')
      elements.vipCodeInput = document.getElementById('vipCodeInput')
      elements.sendVipCodeBtn = document.getElementById('sendVipCodeBtn')
      elements.switchToPasswordBtn = document.getElementById('switchToPasswordBtn')
      elements.vipLoginMessage = document.getElementById('vipLoginMessage')
      elements.vipLoginSubmitBtn = document.getElementById('vipLoginSubmitBtn')
      elements.vipLoginCancelBtn = document.getElementById('vipLoginCancelBtn')
      
      // 重新绑定切换按钮事件
      rebindSwitchEvents()
    }
  }
  
  // 渲染密码设置表单
  function renderPasswordForm() {
    if (!elements.vipLoginModal) return
    
    const formHTML = `
      <div class="vip-login-form">
        <div class="form-group">
          <label for="vipPasswordInput" class="form-label">设置密码</label>
          <div class="password-wrapper">
            <input type="text" id="vipPasswordInput" class="form-input" placeholder="请输入密码">
            <button type="button" id="togglePasswordBtn" class="toggle-password-btn">
              <i class="fa fa-eye"></i>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label for="vipConfirmPasswordInput" class="form-label">确认密码</label>
          <div class="password-wrapper">
            <input type="text" id="vipConfirmPasswordInput" class="form-input" placeholder="请再次输入密码">
            <button type="button" id="toggleConfirmPasswordBtn" class="toggle-password-btn">
              <i class="fa fa-eye"></i>
            </button>
          </div>
        </div>
        <div id="vipLoginMessage" class="login-message"></div>
        <div class="login-actions">
          <button id="vipPasswordSubmitBtn" class="action-btn primary">保存密码</button>
          <button id="vipPasswordCancelBtn" class="action-btn secondary">取消</button>
        </div>
      </div>
    `
    
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      // 重新缓存新生成的元素
      elements.vipPasswordInput = document.getElementById('vipPasswordInput')
      elements.vipConfirmPasswordInput = document.getElementById('vipConfirmPasswordInput')
      elements.togglePasswordBtn = document.getElementById('togglePasswordBtn')
      elements.toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPasswordBtn')
      elements.vipLoginMessage = document.getElementById('vipLoginMessage')
      elements.vipPasswordSubmitBtn = document.getElementById('vipPasswordSubmitBtn')
      elements.vipPasswordCancelBtn = document.getElementById('vipPasswordCancelBtn')
      
      // 重新绑定切换按钮事件
      rebindSwitchEvents()
    }
  }
  
  // 渲染密码登录表单
  function renderPasswordLoginForm() {
    if (!elements.vipLoginModal) return
    
    const formHTML = `
      <div class="vip-login-form">
        <div class="form-group">
          <label for="vipPhoneInput" class="form-label">手机号</label>
          <input type="tel" id="vipPhoneInput" class="form-input" placeholder="请输入手机号">
        </div>
        <div class="form-group">
          <label for="vipPasswordInput" class="form-label">密码</label>
          <div class="password-wrapper">
            <input type="password" id="vipPasswordInput" class="form-input" placeholder="请输入密码">
            <button type="button" id="togglePasswordBtn" class="toggle-password-btn">
              <i class="fa fa-eye"></i>
            </button>
          </div>
        </div>
        
        <div id="vipLoginMessage" class="login-message"></div>
        <div class="login-actions">
          <button id="vipPasswordLoginSubmitBtn" class="action-btn primary">登录</button>
          <button id="vipPasswordLoginCancelBtn" class="action-btn secondary">返回</button>
        </div>
        <div class="login-method-switch">
          <span>忘记密码？</span>
          <button id="switchToCodeBtn" class="switch-link">使用验证码登录</button>
        </div>
      </div>
    `
    
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      // 重新缓存新生成的元素
      elements.vipPhoneInput = document.getElementById('vipPhoneInput')
      elements.vipPasswordInput = document.getElementById('vipPasswordInput')
      elements.togglePasswordBtn = document.getElementById('togglePasswordBtn')
      elements.switchToCodeBtn = document.getElementById('switchToCodeBtn')
      elements.vipLoginMessage = document.getElementById('vipLoginMessage')
      elements.vipPasswordLoginSubmitBtn = document.getElementById('vipPasswordLoginSubmitBtn')
      elements.vipPasswordLoginCancelBtn = document.getElementById('vipPasswordLoginCancelBtn')
      
      // 重新绑定切换按钮事件
      rebindSwitchEvents()
    }
  }
  
  // 绑定事件
  function bindEvents() {
    // 显示登录弹窗（用户点击登录按钮时，使用普通模式）
    if (elements.vipLoginBtn) {
      elements.vipLoginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        showLoginModal(false)  // 非全屏模式，用户可以关闭
      })
    }
    
    // 关闭弹窗按钮
    if (elements.closeVipLoginModalBtn) {
      elements.closeVipLoginModalBtn.addEventListener('click', hideLoginModal)
    }
    
    // 点击遮罩层关闭
    if (elements.vipLoginModal) {
      elements.vipLoginModal.addEventListener('click', (e) => {
        if (e.target === elements.vipLoginModal) {
          hideLoginModal()
        }
      })
    }
    
    // 取消按钮 - 返回选择界面
    if (elements.vipLoginCancelBtn) {
      elements.vipLoginCancelBtn.addEventListener('click', transitionToChoiceForm)
    }
    
    // 回车键提交
    if (elements.vipPhoneInput) {
      elements.vipPhoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.vipCodeInput.focus()
        }
      })
    }
    
    if (elements.vipCodeInput) {
      elements.vipCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.vipLoginSubmitBtn.click()
        }
      })
    }
    
    // VIP 菜单事件监听
    if (elements.vipMenuToggle) {
      elements.vipMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation()
        if (elements.vipDropdownMenu) {
          const isHidden = elements.vipDropdownMenu.style.display === 'none' || elements.vipDropdownMenu.style.display === ''
          elements.vipDropdownMenu.style.display = isHidden ? 'block' : 'none'
        }
      })
    }
    
    if (elements.vipDropdownMenu) {
      elements.vipDropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation()
      })
    }
    
    if (elements.vipMenuItems) {
      elements.vipMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault()
          const action = this.getAttribute('data-action')
          handleVipMenuItemClick(action)
        })
      })
    }
    
    // 点击页面其他地方关闭 VIP 下拉菜单
    document.addEventListener('click', function(e) {
      if (elements.vipDropdownMenu && elements.vipMenuToggle) {
        const isClickInsideMenu = elements.vipMenuToggle.parentElement.contains(e.target)
        const isVisible = elements.vipDropdownMenu.style.display === 'block'
        if (!isClickInsideMenu && isVisible) {
          elements.vipDropdownMenu.style.display = 'none'
        }
      }
    })
    
    // 用户信息弹窗事件监听
    if (elements.closeUserInfoModal) {
      elements.closeUserInfoModal.addEventListener('click', closeUserInfoModalFunc)
    }
    
    if (elements.closeUserInfoBtn) {
      elements.closeUserInfoBtn.addEventListener('click', closeUserInfoModalFunc)
    }
    
    // 刷新用户信息按钮
    const refreshUserInfoBtn = document.getElementById('refreshUserInfoBtn')
    if (refreshUserInfoBtn) {
      refreshUserInfoBtn.addEventListener('click', async function() {
        this.disabled = true
        this.textContent = '刷新中...'
        
        if (window.CloudSync) {
          // 强制刷新商家信息（跳过本地缓存）
          if (CloudSync.setForceRefreshBusinessInfo) {
            CloudSync.setForceRefreshBusinessInfo()
          }
          await CloudSync.syncAndFillBusinessInfo(true) // 强制刷新
          await loadUserInfoFromCloud()
        }
        
        if (window.forceRefreshImages) {
          await window.forceRefreshImages()
        }
        
        this.disabled = false
        this.textContent = '刷新云端数据'
      })
    }
    
    // 从云端加载用户信息到弹窗
    async function loadUserInfoFromCloud() {
      const userInfoBrandname = document.getElementById('userInfoBrandname')
      const userInfoLogoImg = document.getElementById('userInfoLogoImg')
      const userInfoLogoPlaceholder = document.getElementById('userInfoLogoPlaceholder')
      const userInfoQrcodeImg = document.getElementById('userInfoQrcodeImg')
      const userInfoQrcodePlaceholder = document.getElementById('userInfoQrcodePlaceholder')
      
      if (window.CloudSync) {
        const result = await CloudSync.loadBusinessInfoFromCloud()
        if (result.success && result.data) {
          // 商家名称
          if (userInfoBrandname) {
            userInfoBrandname.textContent = result.data.brandname || '-'
          }
          
          // Logo - 优先使用缓存，但需要检查URL是否变化或强制刷新
          if (result.data.logoUrl) {
            if (userInfoLogoImg) {
              // 获取当前存储的logo URL
              const storedLogoUrl = localStorage.getItem('businessLogo')
              const cachedLogo = localStorage.getItem('poster_logo_base64')
              
              // 检查是否需要强制刷新（设备变更、手动刷新等）
              const shouldForceRefresh = localStorage.getItem('image_cache_force_refresh') === 'true'
              
              // 如果URL变化了、缓存不存在、缓存格式错误、或者需要强制刷新，都需要重新加载
              if (storedLogoUrl !== result.data.logoUrl || !cachedLogo || !cachedLogo.startsWith('data:image') || shouldForceRefresh) {
                // 清除强制刷新标记
                if (shouldForceRefresh) {
                  localStorage.removeItem('image_cache_force_refresh')
                }
                
                // 尝试加载新的图片并缓存
                try {
                  const response = await fetch(result.data.logoUrl, { mode: 'cors', credentials: 'omit' })
                  const blob = await response.blob()
                  const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.onerror = () => reject(new Error('FileReader error'))
                    reader.readAsDataURL(blob)
                  })
                  localStorage.setItem('poster_logo_base64', base64)
                  localStorage.setItem('businessLogo', result.data.logoUrl)
                  userInfoLogoImg.src = base64
                  console.log('Logo缓存已更新（URL相同但内容可能已变化）')
                } catch (e) {
                  console.error('加载Logo失败:', e)
                  userInfoLogoImg.src = result.data.logoUrl
                }
              } else {
                // URL相同且不需要强制刷新，使用缓存
                userInfoLogoImg.src = cachedLogo
                console.log('使用缓存的Logo（URL未变化）')
              }
              userInfoLogoImg.style.display = 'block'
            }
            if (userInfoLogoPlaceholder) {
              userInfoLogoPlaceholder.style.display = 'none'
            }
          } else {
            if (userInfoLogoImg) {
              userInfoLogoImg.style.display = 'none'
            }
            if (userInfoLogoPlaceholder) {
              userInfoLogoPlaceholder.style.display = 'inline'
              userInfoLogoPlaceholder.textContent = '未设置'
            }
          }
          
          // 二维码 - 优先使用缓存，但需要检查URL是否变化或强制刷新
          if (result.data.qrcodeUrl) {
            if (userInfoQrcodeImg) {
              // 获取当前存储的二维码 URL
              const storedQrcodeUrl = localStorage.getItem('businessQrcode')
              const cachedQr = localStorage.getItem('poster_qrcode_base64')
              
              // 检查是否需要强制刷新（设备变更、手动刷新等）
              const shouldForceRefresh = localStorage.getItem('image_cache_force_refresh') === 'true'
              
              // 如果URL变化了、缓存不存在、缓存格式错误、或者需要强制刷新，都需要重新加载
              if (storedQrcodeUrl !== result.data.qrcodeUrl || !cachedQr || !cachedQr.startsWith('data:image') || shouldForceRefresh) {
                // 清除强制刷新标记
                if (shouldForceRefresh) {
                  localStorage.removeItem('image_cache_force_refresh')
                }
                
                // 尝试加载新的图片并缓存
                try {
                  const response = await fetch(result.data.qrcodeUrl, { mode: 'cors', credentials: 'omit' })
                  const blob = await response.blob()
                  const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.onerror = () => reject(new Error('FileReader error'))
                    reader.readAsDataURL(blob)
                  })
                  localStorage.setItem('poster_qrcode_base64', base64)
                  localStorage.setItem('businessQrcode', result.data.qrcodeUrl)
                  userInfoQrcodeImg.src = base64
                  console.log('二维码缓存已更新（URL相同但内容可能已变化）')
                } catch (e) {
                  console.error('加载二维码失败:', e)
                  userInfoQrcodeImg.src = result.data.qrcodeUrl
                }
              } else {
                // URL相同且不需要强制刷新，使用缓存
                userInfoQrcodeImg.src = cachedQr
                console.log('使用缓存的二维码（URL未变化）')
              }
              userInfoQrcodeImg.style.display = 'block'
            }
            if (userInfoQrcodePlaceholder) {
              userInfoQrcodePlaceholder.style.display = 'none'
            }
          } else {
            if (userInfoQrcodeImg) {
              userInfoQrcodeImg.style.display = 'none'
            }
            if (userInfoQrcodePlaceholder) {
              userInfoQrcodePlaceholder.style.display = 'inline'
              userInfoQrcodePlaceholder.textContent = '未设置'
            }
          }
        }
      }
    }
    
    // 显示用户信息弹窗
    async function openUserInfoModal() {
      if (elements.userInfoModal) {
        // 先从服务器获取最新的VIP状态
        const userInfo = VIPSystem.getUserInfo()
        const userId = VIPSystem.getUserId()
        const phone = userInfo ? userInfo.phone : null
        
        if (userId || phone) {
          try {
            console.log('从服务器获取最新VIP状态...');
            const result = await VIPSystem.checkVipStatus(userId, phone);
            console.log('服务器返回的VIP状态:', result);
          } catch (error) {
            console.error('获取VIP状态失败:', error);
          }
        }
        
        // 重新从本地存储获取更新后的用户信息
        const updatedUserInfo = VIPSystem.getUserInfo()
        
        if (elements.userInfoId) {
          elements.userInfoId.textContent = updatedUserInfo.phone || '未登录'
        }
        if (elements.userInfoExpiry) {
          elements.userInfoExpiry.textContent = updatedUserInfo.vipValidUntil ? new Date(updatedUserInfo.vipValidUntil).toLocaleDateString() : '普通用户'
        }
        if (elements.userInfoType) {
          elements.userInfoType.textContent = updatedUserInfo.isVip ? 'VIP用户' : '普通用户'
        }
        
        // 加载云端商家信息
        await loadUserInfoFromCloud()
        
        elements.userInfoModal.classList.remove('hidden')
      }
    }
    
    // 关闭用户信息弹窗
    function closeUserInfoModalFunc() {
      if (elements.userInfoModal) {
        elements.userInfoModal.classList.add('hidden')
      }
    }
    
    // 处理 VIP 菜单项点击
    async function handleVipMenuItemClick(action) {
      switch (action) {
        case 'userInfo':
          await openUserInfoModal()
          break
        case 'orderHistory':
          await showOrderHistoryModal()
          break
        case 'activateVoucher':
          if (window.showVipUpgradeModal) {
            window.showVipUpgradeModal()
          }
          break
        case 'visibilityManager':
          if (window.openVisibilityManager) {
            window.openVisibilityManager()
          }
          break
        case 'logout':
          handleVipLogout()
          break
      }
      
      const vipDropdownMenu = document.getElementById('vipDropdownMenu')
      if (vipDropdownMenu) {
        vipDropdownMenu.style.display = 'none'
      }
    }
    
    async function showOrderHistoryModal() {
      const existingModal = document.getElementById('orderHistoryModal')
      if (existingModal) {
        existingModal.remove()
      }
      
      const modalHTML = `
        <div id="orderHistoryModal" class="order-history-modal">
          <div class="order-history-content">
            <div class="order-history-header">
              <h3>订单记录</h3>
              <button id="closeOrderHistoryBtn">&times;</button>
            </div>
            <div id="orderHistoryList" class="order-history-list">
              <div class="order-loading">
                <div class="order-loading-spinner"></div>
                <p>加载中...</p>
              </div>
            </div>
          </div>
        </div>
      `
      
      document.body.insertAdjacentHTML('beforeend', modalHTML)
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      const modal = document.getElementById('orderHistoryModal')
      const closeBtn = document.getElementById('closeOrderHistoryBtn')
      const listContainer = document.getElementById('orderHistoryList')
      
      closeBtn.addEventListener('click', () => modal.remove())
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove()
      })
      
      try {
        const result = await VIPSystem.getPaymentOrderList()
        
        if (result.success && result.data && result.data.orders) {
          if (result.data.orders.length === 0) {
            listContainer.innerHTML = `
              <div class="order-empty">
                <i class="fa fa-inbox"></i>
                <p>暂无订单记录</p>
              </div>
            `
            // 替换Font Awesome图标为SVG图标
            if (typeof replaceFAIcons === 'function') replaceFAIcons()
          } else {
            const ordersHTML = result.data.orders.map(order => {
              const statusText = order.status === 1 ? '已支付' : '待支付'
              const statusClass = order.status === 1 ? 'paid' : 'unpaid'
              const typeText = order.type === 'alipay' ? '支付宝' : '微信'
              const payTime = order.payTime ? new Date(order.payTime).toLocaleString('zh-CN') : '-'
              const createTime = order.createTime ? new Date(order.createTime).toLocaleString('zh-CN') : '-'
              const isUnpaid = order.status !== 1
              
              return `
                <div class="order-item">
                  <div class="order-item-header">
                    <div>
                      <div class="order-item-name">${order.name}</div>
                      <div class="order-item-no">订单号: ${order.out_trade_no}</div>
                    </div>
                    <span class="order-item-status ${statusClass}">${statusText}</span>
                  </div>
                  <div class="order-item-info">
                    <span>${typeText}支付</span>
                    <span class="order-item-price">¥${order.money}</span>
                  </div>
                  <div class="order-item-time">${order.status === 1 ? '支付时间: ' + payTime : '创建时间: ' + createTime}</div>
                  ${isUnpaid ? `<button class="continue-pay-btn" data-order-no="${order.out_trade_no}" data-money="${order.money}" data-duration="${order.duration}" data-type="${order.type}">继续支付</button>` : ''}
                </div>
              `
            }).join('')
            
            listContainer.innerHTML = ordersHTML
            
            // 替换Font Awesome图标为SVG图标
            if (typeof replaceFAIcons === 'function') replaceFAIcons()
            
            listContainer.querySelectorAll('.continue-pay-btn').forEach(btn => {
              btn.addEventListener('click', async function() {
                const orderNo = this.dataset.orderNo
                const money = this.dataset.money
                const duration = this.dataset.duration
                const type = this.dataset.type
                
                this.disabled = true
                this.textContent = '处理中...'
                
                try {
                  const returnUrl = window.location.href.split('?')[0]
                  const result = await VIPSystem.createPaymentOrder(money, duration, type, returnUrl)
                  
                  if (result.success && result.data && result.data.payUrl) {
                    modal.remove()
                    window.location.href = result.data.payUrl
                  } else {
                    this.disabled = false
                    this.textContent = '继续支付'
                    alert(result.message || '创建订单失败，请稍后重试')
                  }
                } catch (error) {
                  this.disabled = false
                  this.textContent = '继续支付'
                  alert('支付失败，请稍后重试')
                }
              })
            })
          }
        } else {
          listContainer.innerHTML = `
            <div class="order-error">
              <i class="fa fa-exclamation-circle"></i>
              <p>${result.message || '加载失败'}</p>
            </div>
          `
          // 替换Font Awesome图标为SVG图标
          if (typeof replaceFAIcons === 'function') replaceFAIcons()
        }
      } catch (error) {
        console.error('获取订单列表失败:', error)
        listContainer.innerHTML = `
          <div class="order-error">
            <i class="fa fa-exclamation-circle"></i>
            <p>加载失败，请稍后重试</p>
          </div>
        `
        // 替换Font Awesome图标为SVG图标
        if (typeof replaceFAIcons === 'function') replaceFAIcons()
      }
    }
    
    // VIP 退出功能
    function handleVipLogout() {
      showConfirmDialog('退出确认', '确定要退出登录吗？', () => {
        // 清除所有本地存储
        localStorage.clear()
        
        // 更新 UI
        updateVipStatus()
        
        showMessage('已退出登录', 'success')
        setTimeout(() => {
          // 跳转到登录页面
          window.location.href = 'login.html'
        }, 1000)
      })
    }
    
    // 显示确认弹窗
    function showConfirmDialog(title, message, onConfirm) {
      const confirmModal = document.getElementById('confirmModal')
      const confirmTitle = document.getElementById('confirmModalTitle')
      const confirmMessage = document.getElementById('confirmModalMessage')
      const confirmBtn = document.getElementById('confirmModalConfirm')
      const cancelBtn = document.getElementById('confirmModalCancel')
      
      if (!confirmModal) return
      
      confirmTitle.textContent = title
      confirmMessage.textContent = message
      confirmModal.classList.remove('hidden')
      
      const closeDialog = () => {
        confirmModal.classList.add('hidden')
        confirmBtn.removeEventListener('click', handleConfirm)
        cancelBtn.removeEventListener('click', handleCancel)
      }
      
      const handleConfirm = () => {
        closeDialog()
        if (typeof onConfirm === 'function') {
          onConfirm()
        }
      }
      
      const handleCancel = () => {
        closeDialog()
      }
      
      confirmBtn.addEventListener('click', handleConfirm)
      cancelBtn.addEventListener('click', handleCancel)
    }


  }
  
  // 初始化 UI
  function init() {
    initElements()
    updateVipStatus()
    renderLoginChoiceForm()
    checkPaymentSuccess()
    if (!eventsBound) {
      bindEvents()
      eventsBound = true
    }
    
    // 自动弹出登录弹窗逻辑（根据配置）
    checkAutoShowLoginModal()
  }
  
  // 检查是否需要跳转到登录页面
  function checkAutoShowLoginModal() {
    // 获取配置
    const config = window.siteConfig?.autoLoginModal
    if (!config) {
      console.log('[AutoLoginModal] 未找到配置，跳过登录检查')
      return
    }
    
    // 检查是否开启强制登录
    if (!config.enabled) {
      console.log('[AutoLoginModal] 配置已关闭，跳过登录检查')
      return
    }
    
    // 检查当前页面是否在需要强制登录的页面列表中
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'
    if (!config.pages.includes(currentPage)) {
      console.log('[AutoLoginModal] 当前页面不在强制登录列表中:', currentPage)
      return
    }
    
    // 检查用户是否已登录
    if (VIPSystem.isLoggedIn()) {
      console.log('[AutoLoginModal] 用户已登录，继续使用')
      return
    }
    
    // 用户未登录，根据配置模式处理
    const mode = config.mode || 'redirect'
    const loginPage = config.loginPage || 'login.html'
    
    console.log('[AutoLoginModal] 用户未登录，模式:', mode)
    
    if (mode === 'redirect') {
      // 跳转到登录页面，携带当前页面地址作为redirect参数
      const currentUrl = window.location.href
      const loginUrl = `${loginPage}?redirect=${encodeURIComponent(currentUrl)}`
      console.log('[AutoLoginModal] 跳转到登录页面:', loginUrl)
      window.location.href = loginUrl
    } else if (mode === 'modal') {
      // 弹窗模式（已废弃，但保留兼容）
      console.log('[AutoLoginModal] 弹窗模式已废弃，建议使用跳转模式')
      showLoginModal(true)
    }
  }
  
  // 重新绑定切换按钮和发送验证码按钮事件
  function rebindSwitchEvents() {
    // 移除旧的事件监听器（通过克隆节点的方式）
    if (elements.switchToPasswordBtn) {
      const newSwitchToPasswordBtn = elements.switchToPasswordBtn.cloneNode(true)
      elements.switchToPasswordBtn.parentNode.replaceChild(newSwitchToPasswordBtn, elements.switchToPasswordBtn)
      elements.switchToPasswordBtn = newSwitchToPasswordBtn

      elements.switchToPasswordBtn.addEventListener('click', () => {
        transitionToForm('password')
      })
    }

    if (elements.switchToCodeBtn) {
      const newSwitchToCodeBtn = elements.switchToCodeBtn.cloneNode(true)
      elements.switchToCodeBtn.parentNode.replaceChild(newSwitchToCodeBtn, elements.switchToCodeBtn)
      elements.switchToCodeBtn = newSwitchToCodeBtn

      elements.switchToCodeBtn.addEventListener('click', () => {
        transitionToForm('code')
      })
    }

    // 重新绑定验证码登录表单的返回按钮
    if (elements.vipLoginCancelBtn) {
      const newVipLoginCancelBtn = elements.vipLoginCancelBtn.cloneNode(true)
      elements.vipLoginCancelBtn.parentNode.replaceChild(newVipLoginCancelBtn, elements.vipLoginCancelBtn)
      elements.vipLoginCancelBtn = newVipLoginCancelBtn

      elements.vipLoginCancelBtn.addEventListener('click', transitionToChoiceForm)
    }

    // 重新绑定密码登录表单的返回按钮
    if (elements.vipPasswordLoginCancelBtn) {
      const newVipPasswordLoginCancelBtn = elements.vipPasswordLoginCancelBtn.cloneNode(true)
      elements.vipPasswordLoginCancelBtn.parentNode.replaceChild(newVipPasswordLoginCancelBtn, elements.vipPasswordLoginCancelBtn)
      elements.vipPasswordLoginCancelBtn = newVipPasswordLoginCancelBtn

      elements.vipPasswordLoginCancelBtn.addEventListener('click', transitionToChoiceForm)
    }

    // 重新绑定发送验证码按钮事件
    if (elements.sendVipCodeBtn) {
      const newSendVipCodeBtn = elements.sendVipCodeBtn.cloneNode(true)
      elements.sendVipCodeBtn.parentNode.replaceChild(newSendVipCodeBtn, elements.sendVipCodeBtn)
      elements.sendVipCodeBtn = newSendVipCodeBtn
      
      elements.sendVipCodeBtn.addEventListener('click', async () => {
        // 如果已经发送过验证码，则不再发送
        if (smsSent) {
          showMessage('验证码已发送，请稍后再试')
          return
        }
        
        const phone = elements.vipPhoneInput.value.trim()
        
        if (!phone) {
          showMessage('手机号不能为空')
          return
        }
        
        if (!/^1[3-9]\d{9}$/.test(phone)) {
          showMessage('手机号格式不正确')
          return
        }
        
        setSendCodeBtnState(30)
        
        const result = await VIPSystem.sendSMS(phone)
        
        if (result.success) {
          smsSent = true
          showMessage('验证码已发送，请查收', 'success')
          
          // 开始倒计时
          let countdown = 30
          const timer = setInterval(() => {
            countdown--
            if (countdown > 0) {
              setSendCodeBtnState(countdown)
            } else {
              clearInterval(timer)
              setSendCodeBtnState()
            }
          }, 1000)
        } else {
          setSendCodeBtnState()
          showMessage(result.message || '发送失败，请稍后重试')
        }
      })
    }
    
    // 重新绑定登录/注册按钮事件
    if (elements.vipLoginSubmitBtn) {
      const newVipLoginSubmitBtn = elements.vipLoginSubmitBtn.cloneNode(true)
      elements.vipLoginSubmitBtn.parentNode.replaceChild(newVipLoginSubmitBtn, elements.vipLoginSubmitBtn)
      elements.vipLoginSubmitBtn = newVipLoginSubmitBtn
      
      elements.vipLoginSubmitBtn.addEventListener('click', async () => {
        const phone = elements.vipPhoneInput.value.trim()
        const code = elements.vipCodeInput.value.trim()
        
        if (!phone || !code) {
          showMessage('手机号和验证码不能为空')
          return
        }
        
        if (!/^1[3-9]\d{9}$/.test(phone)) {
          showMessage('手机号格式不正确')
          return
        }
        
        if (code.length !== 4) {
          showMessage('验证码格式不正确')
          return
        }
        
        elements.vipLoginSubmitBtn.disabled = true
        elements.vipLoginSubmitBtn.textContent = '登录中...'
        
        const result = await VIPSystem.registerOrLogin(phone, code)
        
        elements.vipLoginSubmitBtn.disabled = false
        elements.vipLoginSubmitBtn.textContent = '登录/注册'
        
        if (result.success) {
          showMessage('登录成功', 'success')
          
          setTimeout(async () => {
            updateVipStatus()
            if (result.data.isNewUser || !result.data.hasPassword) {
              renderPasswordForm()
            } else {
              closeAfterLoginSuccess()
              // 从云端加载商家信息并填充到画布
              if (typeof window.onVipLoginSuccess === 'function') {
                await window.onVipLoginSuccess(result.data)
              } else {
                location.reload()
              }
            }
          }, 1000)
        } else {
          showMessage(result.message || '登录失败，请稍后重试')
        }
      })
    }
    
    // 重新绑定切换密码显示/隐藏按钮事件
    if (elements.togglePasswordBtn) {
      const newTogglePasswordBtn = elements.togglePasswordBtn.cloneNode(true)
      elements.togglePasswordBtn.parentNode.replaceChild(newTogglePasswordBtn, elements.togglePasswordBtn)
      elements.togglePasswordBtn = newTogglePasswordBtn
      
      elements.togglePasswordBtn.addEventListener('click', togglePasswordVisibility)
    }
    
    if (elements.toggleConfirmPasswordBtn) {
      const newToggleConfirmPasswordBtn = elements.toggleConfirmPasswordBtn.cloneNode(true)
      elements.toggleConfirmPasswordBtn.parentNode.replaceChild(newToggleConfirmPasswordBtn, elements.toggleConfirmPasswordBtn)
      elements.toggleConfirmPasswordBtn = newToggleConfirmPasswordBtn
      
      elements.toggleConfirmPasswordBtn.addEventListener('click', () => {
        if (elements.vipConfirmPasswordInput && elements.toggleConfirmPasswordBtn) {
          if (elements.vipConfirmPasswordInput.type === 'password') {
            elements.vipConfirmPasswordInput.type = 'text'
            elements.toggleConfirmPasswordBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('eye-slash', 'svg-icon') : '<i class="fa fa-eye-slash"></i>'
          } else {
            elements.vipConfirmPasswordInput.type = 'password'
            elements.toggleConfirmPasswordBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('eye', 'svg-icon') : '<i class="fa fa-eye"></i>'
          }
        }
      })
    }
    
    // 重新绑定保存密码按钮事件
    if (elements.vipPasswordSubmitBtn) {
      const newVipPasswordSubmitBtn = elements.vipPasswordSubmitBtn.cloneNode(true)
      elements.vipPasswordSubmitBtn.parentNode.replaceChild(newVipPasswordSubmitBtn, elements.vipPasswordSubmitBtn)
      elements.vipPasswordSubmitBtn = newVipPasswordSubmitBtn
      
      elements.vipPasswordSubmitBtn.addEventListener('click', async () => {
        const password = elements.vipPasswordInput.value.trim()
        const confirmPassword = elements.vipConfirmPasswordInput.value.trim()
        
        if (!password || !confirmPassword) {
          showMessage('密码和确认密码不能为空')
          return
        }
        
        if (password !== confirmPassword) {
          showMessage('两次输入的密码不一致')
          return
        }
        
        if (password.length < 6) {
          showMessage('密码长度至少为6位')
          return
        }
        
        elements.vipPasswordSubmitBtn.disabled = true
        elements.vipPasswordSubmitBtn.textContent = '保存中...'
        
        const userId = VIPSystem.getUserId()
        const result = await VIPSystem.updatePassword(userId, password)
        
        elements.vipPasswordSubmitBtn.disabled = false
        elements.vipPasswordSubmitBtn.textContent = '保存密码'
        
        if (result.success) {
          showMessage('密码设置成功', 'success')
          
          setTimeout(() => {
            updateVipStatus()
            closeAfterLoginSuccess()
            location.reload()
          }, 1000)
        } else {
          showMessage(result.message || '密码设置失败，请稍后重试')
        }
      })
    }
    
    // 重新绑定密码登录按钮事件
    if (elements.vipPasswordLoginSubmitBtn) {
      const newVipPasswordLoginSubmitBtn = elements.vipPasswordLoginSubmitBtn.cloneNode(true)
      elements.vipPasswordLoginSubmitBtn.parentNode.replaceChild(newVipPasswordLoginSubmitBtn, elements.vipPasswordLoginSubmitBtn)
      elements.vipPasswordLoginSubmitBtn = newVipPasswordLoginSubmitBtn
      
      elements.vipPasswordLoginSubmitBtn.addEventListener('click', async () => {
        const phone = elements.vipPhoneInput.value.trim()
        const password = elements.vipPasswordInput.value.trim()
        
        if (!phone || !password) {
          showMessage('手机号和密码不能为空')
          return
        }
        
        if (!/^1[3-9]\d{9}$/.test(phone)) {
          showMessage('手机号格式不正确')
          return
        }
        
        elements.vipPasswordLoginSubmitBtn.disabled = true
        elements.vipPasswordLoginSubmitBtn.textContent = '登录中...'
        
        const result = await VIPSystem.loginWithPassword(phone, password)
        
        elements.vipPasswordLoginSubmitBtn.disabled = false
        elements.vipPasswordLoginSubmitBtn.textContent = '登录'
        
        if (result.success) {
          showMessage('登录成功', 'success')
          
          setTimeout(() => {
            updateVipStatus()
            closeAfterLoginSuccess()
            location.reload()
          }, 1000)
        } else {
          showMessage(result.message || '登录失败，请稍后重试')
        }
      })
    }
    
    // 重新绑定取消按钮事件
    if (elements.vipPasswordCancelBtn) {
      const newVipPasswordCancelBtn = elements.vipPasswordCancelBtn.cloneNode(true)
      elements.vipPasswordCancelBtn.parentNode.replaceChild(newVipPasswordCancelBtn, elements.vipPasswordCancelBtn)
      elements.vipPasswordCancelBtn = newVipPasswordCancelBtn
      
      elements.vipPasswordCancelBtn.addEventListener('click', () => {
        transitionToChoiceForm()
      })
    }

    // 重新绑定回车键提交
    if (elements.vipPhoneInput) {
      const newVipPhoneInput = elements.vipPhoneInput.cloneNode(true)
      elements.vipPhoneInput.parentNode.replaceChild(newVipPhoneInput, elements.vipPhoneInput)
      elements.vipPhoneInput = newVipPhoneInput
      
      elements.vipPhoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (elements.vipCodeInput) {
            elements.vipCodeInput.focus()
          } else if (elements.vipPasswordInput) {
            elements.vipPasswordInput.focus()
          }
        }
      })
    }
    
    if (elements.vipCodeInput) {
      const newVipCodeInput = elements.vipCodeInput.cloneNode(true)
      elements.vipCodeInput.parentNode.replaceChild(newVipCodeInput, elements.vipCodeInput)
      elements.vipCodeInput = newVipCodeInput
      
      elements.vipCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.vipLoginSubmitBtn.click()
        }
      })
    }
    
    if (elements.vipPasswordInput) {
      const newVipPasswordInput = elements.vipPasswordInput.cloneNode(true)
      elements.vipPasswordInput.parentNode.replaceChild(newVipPasswordInput, elements.vipPasswordInput)
      elements.vipPasswordInput = newVipPasswordInput
      
      elements.vipPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (elements.vipPasswordSubmitBtn) {
            elements.vipPasswordSubmitBtn.click()
          } else if (elements.vipPasswordLoginSubmitBtn) {
            elements.vipPasswordLoginSubmitBtn.click()
          }
        }
      })
    }
    
    if (elements.vipConfirmPasswordInput) {
      const newVipConfirmPasswordInput = elements.vipConfirmPasswordInput.cloneNode(true)
      elements.vipConfirmPasswordInput.parentNode.replaceChild(newVipConfirmPasswordInput, elements.vipConfirmPasswordInput)
      elements.vipConfirmPasswordInput = newVipConfirmPasswordInput
      
      elements.vipConfirmPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.vipPasswordSubmitBtn.click()
        }
      })
    }
  }
  
  return {
    init,
    showLoginModal,
    showPasswordModal,
    showPasswordLoginModal,
    hideLoginModal,
    closeAfterLoginSuccess,
    showMessage,
    clearMessage,
    rebindSwitchEvents,
    updateVipStatus,
    renderVipUpgradeForm,
    // 重置本次会话的关闭状态，允许再次自动弹出
    resetDismissedState: () => { loginModalDismissedThisSession = false },
    // 强制弹出登录弹窗（普通模式，非全屏）
    forceShowLoginModal: () => { showLoginModal(false) },
    // 强制弹出全屏登录弹窗（不可关闭）
    forceShowFullscreenLoginModal: () => { showLoginModal(true) }
  }
})()

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  VipLoginUI.init()
})
