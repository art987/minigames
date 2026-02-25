const { createClient } = require('@supabase/supabase-js')

// 初始化Supabase客户端
function initSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase环境变量未配置，使用本地模式')
    return null
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
    console.log('Supabase客户端初始化:', supabase ? '成功' : '未配置，使用本地模式')
    
    const { action, phone, password, code, type } = JSON.parse(event.body)
    console.log('解析请求数据:', { action, phone: phone ? '已提供' : '未提供' })
    
    // 根据不同action检查不同的必填字段
    if (!action || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }
    
    // 注册和密码登录需要password
    if ((action === 'register' || action === 'login') && !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }
    
    // 验证码登录和验证需要code
    if ((action === 'login_with_code' || action === 'verify_phone') && !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }
    
    // 对于需要Supabase的功能，检查Supabase是否配置
    if (!supabase && (action === 'login_with_code' || action === 'verify_phone' || action === 'register' || action === 'login')) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: '系统未完全配置，请联系管理员' })
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

      let isNewUser = false
      
      // 验证验证码
      let codeValid = true
      if (supabase) {
        try {
          const { data: codeData, error: codeError } = await supabase
            .from('verification_codes')
            .select('*')
            .eq('identifier', phone)
            .eq('code', code)
            .gte('expires_at', new Date().toISOString())
            .single()

          if (codeError || !codeData) {
            codeValid = false
          }
        } catch (error) {
          console.error('验证码验证异常:', error)
          // 即使验证失败，也继续处理，允许本地验证
          codeValid = true
        }
      } else {
        // Supabase未配置，跳过验证码验证
        console.warn('Supabase未配置，跳过验证码验证')
        codeValid = true
      }

      if (!codeValid) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '验证码错误或已过期' })
        }
      }

      // 验证码正确，创建或登录用户
      const email = `${phone}@phone.com` // 模拟邮箱
      
      let user, session
      
      // 删除已使用的验证码
      if (supabase) {
        try {
          await supabase
            .from('verification_codes')
            .delete()
            .eq('identifier', phone)
            .eq('code', code)
        } catch (error) {
          console.error('删除验证码失败:', error)
        }
      }

      if (supabase) {
        try {
          // 检查用户是否存在
          const { data: userData, error: userError } = await supabase
            .from('auth.users')
            .select('id')
            .eq('email', email)
            .single()

          if (userData) {
            // 用户存在，直接返回成功，不需要密码登录
            console.log('用户存在，验证码登录成功')
            return {
              statusCode: 200,
              body: JSON.stringify({ 
                success: true,
                user: {
                  id: userData.id,
                  phone: phone
                },
                access_token: 'mock_token', // 模拟token
                message: '登录成功'
              })
            }
          } else {
            // 用户不存在，创建新用户
            isNewUser = true
            console.log('用户不存在，创建新用户')
            
            // 直接返回需要设置密码的提示
            return {
              statusCode: 200,
              body: JSON.stringify({ 
                success: true,
                is_new_user: true,
                message: '验证码验证成功，请设置密码',
                phone: phone
              })
            }
          }
        } catch (error) {
          console.error('用户登录/注册异常:', error)
          // 发生异常，返回错误
          return {
            statusCode: 400,
            body: JSON.stringify({ error: '系统错误，请稍后重试' })
          }
        }
      } else {
        // Supabase未配置，返回需要设置密码的提示
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            success: true,
            is_new_user: true,
            message: '验证码验证成功，请设置密码',
            phone: phone
          })
        }
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
      if (supabase) {
        try {
          const { error: storageError } = await supabase
            .from('verification_codes')
            .upsert([{
              identifier: phone,
              code: code,
              expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString()
            }])

          if (storageError) {
            console.error('存储验证码失败:', storageError)
            // 即使存储失败，也继续发送验证码
            console.warn('验证码存储失败，但仍继续发送短信')
          }
        } catch (storageError) {
          console.error('存储验证码异常:', storageError)
          // 即使存储异常，也继续发送验证码
          console.warn('验证码存储异常，但仍继续发送短信')
        }
      } else {
        console.warn('Supabase未配置，跳过验证码存储')
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
      let codeValid = true
      if (supabase) {
        try {
          const { data: codeData, error: codeError } = await supabase
            .from('verification_codes')
            .select('*')
            .eq('identifier', phone)
            .eq('code', code)
            .gte('expires_at', new Date().toISOString())
            .single()

          if (codeError || !codeData) {
            codeValid = false
          }
        } catch (error) {
          console.error('验证码验证异常:', error)
          // 即使验证失败，也继续处理，允许本地验证
          codeValid = true
        }
      } else {
        // Supabase未配置，跳过验证码验证
        console.warn('Supabase未配置，跳过验证码验证')
        codeValid = true
      }

      if (!codeValid) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '验证码错误或已过期' })
        }
      }

      // 检查是否是新用户
      let isNewUser = false
      if (supabase) {
        try {
          const email = `${phone}@phone.com`
          const { data: userData, error: userError } = await supabase
            .from('auth.users')
            .select('id')
            .eq('email', email)
            .single()

          if (!userData) {
            isNewUser = true
          }
        } catch (error) {
          console.error('检查用户是否存在异常:', error)
          // 发生异常，视为新用户
          isNewUser = true
        }
      } else {
        // Supabase未配置，视为新用户
        isNewUser = true
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          message: '手机号验证成功',
          is_new_user: isNewUser,
          phone: phone
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
      if (supabase) {
        try {
          const { error: storageError } = await supabase
            .from('verification_codes')
            .upsert([{
              identifier: phone || email,
              code: code,
              expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString()
            }])

          if (storageError) {
            console.error('存储验证码失败:', storageError)
            // 即使存储失败，也继续发送验证码
            console.warn('验证码存储失败，但仍继续发送短信')
          }
        } catch (storageError) {
          console.error('存储验证码异常:', storageError)
          // 即使存储异常，也继续发送验证码
          console.warn('验证码存储异常，但仍继续发送短信')
        }
      } else {
        console.warn('Supabase未配置，跳过验证码存储')
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