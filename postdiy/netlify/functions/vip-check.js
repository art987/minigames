const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

exports.handler = async (event) => {
  // 获取用户token
  const token = event.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
  }

  try {
    // 验证token并获取用户信息
    const { user, error: authError } = await supabase.auth.api.getUser(token)
    
    if (authError || !user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid token' }) }
    }

    // 获取VIP状态
    const { data, error } = await supabase
      .from('user_profiles')
      .select('vip_status, vip_expiry')
      .eq('id', user.id)
      .single()

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message })
      }
    }

    const isVIP = data.vip_status && new Date(data.vip_expiry) > new Date()

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        isVIP,
        vip_status: data.vip_status,
        vip_expiry: data.vip_expiry
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}