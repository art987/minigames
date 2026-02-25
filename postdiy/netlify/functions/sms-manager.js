const { createClient } = require('@supabase/supabase-js')

// 确保fetch方法可用
let fetch
if (typeof globalThis.fetch === 'function') {
  fetch = globalThis.fetch
} else {
  try {
    const nodeFetch = require('node-fetch')
    fetch = nodeFetch.default || nodeFetch
  } catch (error) {
    throw new Error('fetch is not available. Please install node-fetch')
  }
}

// 初始化Supabase客户端
function initSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase环境变量未配置')
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

class SMSManager {
  constructor() {
    try {
      this.supabase = initSupabase()
      this.supabaseEnabled = true
    } catch (error) {
      console.warn('Supabase未配置，使用本地模式')
      this.supabase = null
      this.supabaseEnabled = false
    }
    this.providers = [
      {
        name: 'spug',
        quota: 100, // Spug推送助手免费额度
        used: 0,
        cost: 0, // 免费使用
        priority: 1, // 最高优先级，个人友好
        enabled: true // 始终启用
      }
    ]
  }

  // 获取当月使用量
  async getMonthlyUsage(provider) {
    if (!this.supabaseEnabled) {
      return 0
    }
    
    try {
      const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
      
      const { data, error } = await this.supabase
        .from('sms_usage')
        .select('used_count')
        .eq('provider', provider)
        .eq('month', currentMonth)
        .single()
      
      if (error && error.code !== 'PGRST116') {
        console.error(`获取${provider}使用量失败:`, error)
        return 0
      }
      
      return data ? data.used_count : 0
    } catch (error) {
      console.error('获取使用量失败:', error)
      return 0
    }
  }

  // 更新使用量
  async updateUsage(provider, count = 1) {
    if (!this.supabaseEnabled) {
      return
    }
    
    try {
      const currentMonth = new Date().toISOString().slice(0, 7)
      
      const { data: existing } = await this.supabase
        .from('sms_usage')
        .select('id, used_count')
        .eq('provider', provider)
        .eq('month', currentMonth)
        .single()
      
      if (existing) {
        // 更新现有记录
        await this.supabase
          .from('sms_usage')
          .update({ used_count: existing.used_count + count })
          .eq('id', existing.id)
      } else {
        // 创建新记录
        await this.supabase
          .from('sms_usage')
          .insert([{
            provider,
            month: currentMonth,
            used_count: count
          }])
      }
    } catch (error) {
      console.error('更新使用量失败:', error)
    }
  }

  // 获取最优服务商（现在只有Spug）
  async getOptimalProvider() {
    // 获取Spug的当月使用量
    const spugProvider = this.providers[0]
    spugProvider.used = await this.getMonthlyUsage('spug')
    return spugProvider
  }

  // 通过Spug推送助手发送验证码
  async sendViaSpug(identifier, code, type = 'phone') {
    // Spug推送助手API - 使用具体的模板编码
    const templateCode = '7ZIldfXjQk-WPl-8eUqGgw' // 用户提供的模板编码
    const spugUrl = `https://push.spug.cc/sms/${templateCode}`
    
    const response = await fetch(spugUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '推送助手', // 模板中的name变量
        code: code, // 模板中的code变量
        to: identifier.replace('+86', '') // 去掉国家代码
      })
    })

    const result = await response.json()
    
    if (result.code !== 200) {
      throw new Error(`Spug推送失败: ${result.msg || '未知错误'}`)
    }

    return result
  }

  // 主发送方法（只支持Spug短信验证）
  async sendVerificationCode(identifier, code, type = 'phone') {
    console.log(`使用Spug推送助手发送验证码: ${identifier} -> ${code}`)

    try {
      // 直接使用Spug推送助手
      const result = await this.sendViaSpug(identifier, code, 'phone')

      // 更新使用量
      await this.updateUsage('spug')
      console.log(`验证码发送成功: spug -> ${identifier}`)
      return { 
        success: true, 
        provider: 'spug',
        ...result // 包含Spug返回信息
      }

    } catch (error) {
      console.error(`Spug推送失败:`, error.message)
      return { success: false, error: error.message }
    }
  }

  // 向后兼容的方法
  async sendSMS(phone, code) {
    return this.sendVerificationCode(phone, code, 'phone')
  }
}

module.exports = SMSManager