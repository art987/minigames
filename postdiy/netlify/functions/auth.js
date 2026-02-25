const { createClient } = require('@supabase/supabase-js')

// 初始化Supabase客户端
function initSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase环境变量未配置')
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

exports.handler = async (event) => {
  console.log('收到认证请求:', {
    method: event.httpMethod,
    path: event.path,
    body: event.body
  })
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  try {
    const supabase = initSupabase()
    console.log('Supabase客户端初始化成功')
    
    const { action, phone, password } = JSON.parse(event.body)
    console.log('解析请求数据:', { action, phone: phone ? '已提供' : '未提供' })
    
    if (!action || !phone || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }

    if (action === 'register') {
      console.log('开始用户注册流程')
      
      // 使用手机号注册（通过邮箱方式模拟，手机号作为用户名）
      const email = `${phone}@phone.com` // 模拟邮箱
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      
      console.log('完整的Supabase注册响应:', JSON.stringify(data, null, 2))
      
      const user = data?.user

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.message })
        }
      }

      // 检查注册是否成功（禁用邮件确认后应该直接返回用户）
      if (!user && !error) {
        console.error('用户注册异常：user为undefined但无错误')
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '注册异常，请稍后重试' })
        }
      }

      if (!user && error) {
        console.error('用户注册失败：', error)
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.message || '用户注册失败' })
        }
      }

      // 创建用户资料（如果表存在）
      if (user) {
        try {
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert([{
              id: user.id,
              phone: phone,
              business_name: '',
              logo_url: '',
              qrcode_url: '',
              vip_status: false,
              vip_expiry: null
            }])

          if (profileError) {
            console.warn('创建用户资料失败（表可能不存在）:', profileError)
            // 继续执行，不抛出错误
          }
        } catch (tableError) {
          console.warn('用户资料表可能不存在:', tableError)
          // 继续执行，不抛出错误
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          user: {
            id: user.id,
            phone: phone
          }
        })
      }
    }

    if (action === 'login') {
      // 用户登录（密码登录）
      console.log('开始用户登录流程')
      
      // 使用手机号登录（通过邮箱方式模拟）
      const email = `${phone}@phone.com` // 模拟邮箱
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      console.log('Supabase登录响应:', JSON.stringify(data, null, 2))
      
      const { user, session } = data || {}

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.message })
        }
      }

      if (!user || !session) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '登录失败，请检查手机号和密码' })
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          user: {
            id: user.id,
            phone: phone
          },
          access_token: session.access_token
        })
      }
    }

    if (action === 'login_with_code') {
      // 验证码登录
      console.log('开始验证码登录流程')
      
      const { phone, code } = JSON.parse(event.body)
      
      if (!phone || !code) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '手机号和验证码不能为空' })
        }
      }

      // 验证验证码
      const { data: codeData, error: codeError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('identifier', phone)
        .eq('code', code)
        .gte('expires_at', new Date().toISOString())
        .single()

      if (codeError || !codeData) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '验证码错误或已过期' })
        }
      }

      // 验证码正确，创建或登录用户
      const email = `${phone}@phone.com` // 模拟邮箱
      
      // 检查用户是否存在
      const { data: userData, error: userError } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', email)
        .single()

      let user, session
      
      if (userData) {
        // 用户存在，使用密码登录（密码使用默认值）
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password: 'default123' // 默认密码，实际使用时应该更安全
        })
        
        if (loginError) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: '登录失败，请稍后重试' })
          }
        }
        
        user = loginData.user
        session = loginData.session
      } else {
        // 用户不存在，创建新用户
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password: 'default123' // 默认密码
        })
        
        if (signUpError) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: '创建用户失败，请稍后重试' })
          }
        }
        
        user = signUpData.user
        
        // 创建用户资料
        if (user) {
          await supabase
            .from('user_profiles')
            .insert([{
              id: user.id,
              phone: phone,
              business_name: '',
              logo_url: '',
              qrcode_url: '',
              vip_status: false,
              vip_expiry: null
            }])
        }
        
        // 再次登录获取session
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password: 'default123'
        })
        
        if (loginError) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: '登录失败，请稍后重试' })
          }
        }
        
        session = loginData.session
      }

      if (!user || !session) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '登录失败，请稍后重试' })
        }
      }

      // 删除已使用的验证码
      await supabase
        .from('verification_codes')
        .delete()
        .eq('identifier', phone)
        .eq('code', code)

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          user: {
            id: user.id,
            phone: phone
          },
          access_token: session.access_token
        })
      }
    }

    if (action === 'send_code') {
      // 发送验证码
      console.log('开始发送验证码')
      
      const { phone, type } = JSON.parse(event.body)
      
      if (!phone) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '手机号不能为空' })
        }
      }

      // 生成6位随机验证码
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      
      // 存储验证码到Supabase（有效期5分钟）
      const { error: storageError } = await supabase
        .from('verification_codes')
        .upsert([{
          identifier: phone,
          code: code,
          expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString()
        }])

      if (storageError) {
        console.error('存储验证码失败:', storageError)
        return {
          statusCode: 500,
          body: JSON.stringify({ error: '系统错误，请稍后重试' })
        }
      }

      // 发送短信验证码
      try {
        const SMSManager = require('./sms-manager')
        const smsManager = new SMSManager()
        const result = await smsManager.sendSMS(phone, code)
        
        if (result.success) {
          return {
            statusCode: 200,
            body: JSON.stringify({ 
              success: true,
              message: '验证码发送成功',
              provider: result.provider
            })
          }
        } else {
          return {
            statusCode: 500,
            body: JSON.stringify({ error: '短信发送失败，请稍后重试' })
          }
        }
      } catch (smsError) {
        console.error('发送短信失败:', smsError)
        return {
          statusCode: 500,
          body: JSON.stringify({ error: '短信发送失败，请稍后重试' })
        }
      }
    }

    if (action === 'verify_phone') {
      // 验证手机号
      console.log('开始验证手机号')
      
      const { phone, code } = JSON.parse(event.body)
      
      if (!phone || !code) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '手机号和验证码不能为空' })
        }
      }

      // 验证验证码
      const { data: codeData, error: codeError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('identifier', phone)
        .eq('code', code)
        .gte('expires_at', new Date().toISOString())
        .single()

      if (codeError || !codeData) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '验证码错误或已过期' })
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          message: '手机号验证成功'
        })
      }
    }

    if (action === 'send_sms_code') {
      // 发送短信验证码
      console.log('开始发送短信验证码')
      
      if (!email && !phone) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '邮箱或手机号不能为空' })
        }
      }

      // 生成6位随机验证码
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      
      // 存储验证码到Supabase（有效期5分钟）
      const { error: storageError } = await supabase
        .from('verification_codes')
        .upsert([{
          identifier: phone || email,
          code: code,
          expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString()
        }])

      if (storageError) {
        console.error('存储验证码失败:', storageError)
        return {
          statusCode: 500,
          body: JSON.stringify({ error: '系统错误，请稍后重试' })
        }
      }

      // 如果是手机号，发送短信
      if (phone) {
        try {
          const SMSManager = require('./sms-manager')
          const smsManager = new SMSManager()
          const result = await smsManager.sendSMS(phone, code)
          
          if (result.success) {
            return {
              statusCode: 200,
              body: JSON.stringify({ 
                success: true,
                message: '验证码发送成功',
                provider: result.provider
              })
            }
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify({ error: '短信发送失败，请稍后重试' })
            }
          }
        } catch (smsError) {
          console.error('短信发送异常:', smsError)
          return {
            statusCode: 500,
            body: JSON.stringify({ error: '短信服务异常，请使用邮箱验证' })
          }
        }
      } else {
        // 如果是邮箱，发送邮件（这里可以集成邮件服务）
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            success: true,
            message: '验证码已发送到您的邮箱',
            code: code // 开发环境返回验证码便于测试
          })
        }
      }
    }

    if (action === 'verify_code') {
      // 验证验证码
      console.log('开始验证验证码')
      
      if (!email && !phone) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '邮箱或手机号不能为空' })
        }
      }

      if (!password) { // 这里password参数实际上是验证码
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '验证码不能为空' })
        }
      }

      const identifier = phone || email
      
      // 查询验证码
      const { data: codeData, error: queryError } = await supabase
        .from('verification_codes')
        .select('code, expires_at')
        .eq('identifier', identifier)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (queryError || !codeData) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '验证码无效或已过期' })
        }
      }

      if (codeData.code !== password) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '验证码错误' })
        }
      }

      // 验证成功，删除验证码
      await supabase
        .from('verification_codes')
        .delete()
        .eq('identifier', identifier)

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          message: '验证成功'
        })
      }
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid action' })
    }
  } catch (error) {
    console.error('认证函数发生错误:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message,
        details: '请查看Netlify Functions日志获取详细信息'
      })
    }
  }
}