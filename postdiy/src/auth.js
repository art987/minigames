// 用户认证模块
class AuthManager {
  constructor() {
    this.currentUser = null
    this.accessToken = null
    this.isLoggedIn = false
    this.init()
  }

  // 初始化认证状态
  init() {
    // 从localStorage恢复登录状态
    const savedToken = localStorage.getItem('postdiy_access_token')
    const savedUser = localStorage.getItem('postdiy_user')
    
    if (savedToken && savedUser) {
      this.accessToken = savedToken
      this.currentUser = JSON.parse(savedUser)
      this.isLoggedIn = true
      this.updateUI()
    }
  }

  // 用户注册
  async register(phone, password) {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'register',
          phone,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '注册失败')
      }

      return data
    } catch (error) {
      console.error('注册错误:', error)
      throw error
    }
  }

  // 用户登录（密码登录）
  async login(phone, password) {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'login',
          phone,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '登录失败')
      }

      // 检查是否是新用户
      if (data.is_new_user) {
        // 新用户，跳转到设置密码界面
        console.log('新用户登录，需要设置密码')
        
        // 触发设置密码流程
        if (window.showSetPasswordForm) {
          window.showSetPasswordForm(data.phone)
        } else {
          // 如果没有设置密码表单，显示提示
          throw new Error('验证码验证成功，请设置密码')
        }
        
        return data
      }

      // 保存登录状态
      this.currentUser = data.user
      this.accessToken = data.access_token
      this.isLoggedIn = true

      // 保存到localStorage
      localStorage.setItem('postdiy_access_token', this.accessToken)
      localStorage.setItem('postdiy_user', JSON.stringify(this.currentUser))

      this.updateUI()
      return data
    } catch (error) {
      console.error('登录错误:', error)
      throw error
    }
  }

  // 验证码登录
  async loginWithCode(phone, code) {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'login_with_code',
          phone,
          code
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '登录失败')
      }

      // 检查是否是新用户
      if (data.is_new_user) {
        // 新用户，跳转到设置密码界面
        console.log('新用户登录，需要设置密码')
        
        // 触发设置密码流程
        if (window.showSetPasswordForm) {
          window.showSetPasswordForm(data.phone)
        } else {
          // 如果没有设置密码表单，显示提示
          throw new Error('验证码验证成功，请设置密码')
        }
        
        return data
      }

      // 保存登录状态
      this.currentUser = data.user
      this.accessToken = data.access_token
      this.isLoggedIn = true

      // 保存到localStorage
      localStorage.setItem('postdiy_access_token', this.accessToken)
      localStorage.setItem('postdiy_user', JSON.stringify(this.currentUser))

      this.updateUI()
      return data
    } catch (error) {
      console.error('验证码登录错误:', error)
      throw error
    }
  }

  // 发送验证码
  async sendCode(phone, type = 'register') {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'send_code',
          phone,
          type
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '发送验证码失败')
      }

      return data
    } catch (error) {
      console.error('发送验证码错误:', error)
      throw error
    }
  }

  // 验证手机号
  async verifyPhone(phone, code) {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'verify_phone',
          phone,
          code
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '验证失败')
      }

      // 检查是否是新用户
      if (data.is_new_user) {
        // 新用户，跳转到设置密码界面
        console.log('新用户验证，需要设置密码')
        
        // 触发设置密码流程
        if (window.showSetPasswordForm) {
          window.showSetPasswordForm(data.phone)
        }
      }

      return data
    } catch (error) {
      console.error('验证手机号错误:', error)
      throw error
    }
  }

  // 用户登出
  logout() {
    this.currentUser = null
    this.accessToken = null
    this.isLoggedIn = false

    // 清除localStorage
    localStorage.removeItem('postdiy_access_token')
    localStorage.removeItem('postdiy_user')

    this.updateUI()
  }

  // 获取认证头
  getAuthHeaders() {
    if (!this.accessToken) {
      return {}
    }

    return {
      'Authorization': `Bearer ${this.accessToken}`
    }
  }

  // 更新UI显示
  updateUI() {
    const loginBtn = document.getElementById('loginBtn')
    const userInfo = document.getElementById('userInfo')
    const logoutBtn = document.getElementById('logoutBtn')

    if (this.isLoggedIn) {
      // 显示用户信息，隐藏登录按钮
      if (loginBtn) loginBtn.style.display = 'none'
      if (userInfo) {
        userInfo.style.display = 'block'
        userInfo.textContent = `欢迎，${this.currentUser.phone}`
      }
      if (logoutBtn) logoutBtn.style.display = 'block'
    } else {
      // 显示登录按钮，隐藏用户信息
      if (loginBtn) loginBtn.style.display = 'block'
      if (userInfo) userInfo.style.display = 'none'
      if (logoutBtn) logoutBtn.style.display = 'none'
    }
  }

  // 检查VIP状态
  async checkVIPStatus() {
    if (!this.isLoggedIn) {
      return { isVIP: false }
    }

    try {
      const response = await fetch('/api/vip-check', {
        headers: this.getAuthHeaders()
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'VIP状态检查失败')
      }

      return data
    } catch (error) {
      console.error('VIP状态检查错误:', error)
      return { isVIP: false }
    }
  }
}

// 创建全局认证管理器实例
window.authManager = new AuthManager()