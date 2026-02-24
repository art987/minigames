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
    
    const { action, email, password } = JSON.parse(event.body)
    console.log('解析请求数据:', { action, email: email ? '已提供' : '未提供' })
    
    if (!action || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }

    if (action === 'register') {
      console.log('开始用户注册流程')
      
      // 用户注册
      const signUpResponse = await supabase.auth.signUp({
        email,
        password
      })
      
      console.log('完整的Supabase注册响应:', JSON.stringify(signUpResponse, null, 2))
      
      const { user, error } = signUpResponse

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
            email: user.email
          }
        })
      }
    }

    if (action === 'login') {
      // 用户登录
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password
      })

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.message })
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          user: {
            id: user.id,
            email: user.email
          },
          access_token: session.access_token
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