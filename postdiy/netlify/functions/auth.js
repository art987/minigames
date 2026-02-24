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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  try {
    const supabase = initSupabase()
    const { action, email, password } = JSON.parse(event.body)
    
    if (!action || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }

    if (action === 'register') {
      // 用户注册
      const { user, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.message })
        }
      }

      // 创建用户资料
      if (user) {
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
          console.error('创建用户资料失败:', profileError)
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}