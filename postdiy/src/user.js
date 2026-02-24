// 用户数据管理模块
class UserDataManager {
  constructor() {
    this.userData = null
  }

  // 获取用户数据
  async getUserData() {
    if (!window.authManager.isLoggedIn) {
      throw new Error('用户未登录')
    }

    try {
      const response = await fetch('/api/user-data', {
        headers: window.authManager.getAuthHeaders()
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '获取用户数据失败')
      }

      this.userData = data.data
      return this.userData
    } catch (error) {
      console.error('获取用户数据错误:', error)
      throw error
    }
  }

  // 更新用户数据
  async updateUserData(userData) {
    if (!window.authManager.isLoggedIn) {
      throw new Error('用户未登录')
    }

    try {
      const response = await fetch('/api/user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...window.authManager.getAuthHeaders()
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '更新用户数据失败')
      }

      this.userData = data.data
      return this.userData
    } catch (error) {
      console.error('更新用户数据错误:', error)
      throw error
    }
  }

  // 保存商家信息
  async saveBusinessInfo(businessName, logoUrl, qrcodeUrl) {
    const userData = {
      business_name: businessName,
      logo_url: logoUrl,
      qrcode_url: qrcodeUrl
    }

    return await this.updateUserData(userData)
  }

  // 获取商家信息
  getBusinessInfo() {
    if (!this.userData) {
      return {
        business_name: '',
        logo_url: '',
        qrcode_url: ''
      }
    }

    return {
      business_name: this.userData.business_name || '',
      logo_url: this.userData.logo_url || '',
      qrcode_url: this.userData.qrcode_url || ''
    }
  }

  // 检查VIP状态
  async isVIP() {
    if (!window.authManager.isLoggedIn) {
      return false
    }

    const vipData = await window.authManager.checkVIPStatus()
    return vipData.isVIP
  }

  // 显示VIP状态
  async showVIPStatus() {
    const isVIP = await this.isVIP()
    const vipBadge = document.getElementById('vipBadge')
    
    if (vipBadge) {
      if (isVIP) {
        vipBadge.style.display = 'inline-block'
        vipBadge.textContent = 'VIP'
        vipBadge.className = 'vip-badge active'
      } else {
        vipBadge.style.display = 'none'
      }
    }
  }
}

// 创建全局用户数据管理器实例
window.userDataManager = new UserDataManager()