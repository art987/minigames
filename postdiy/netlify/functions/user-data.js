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

    // 设置用户session
    supabase.auth.setAuth(token)

    if (event.httpMethod === 'GET') {
      // 获取用户数据
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.message })
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ data })
      }
    }

    if (event.httpMethod === 'POST') {
      // 更新用户数据
      const userData = JSON.parse(event.body)
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({ id: user.id, ...userData })

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.message })
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ data })
      }
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}