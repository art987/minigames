const { createClient } = require('@supabase/supabase-js')

// 初始化Supabase客户端
function initSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  
  console.log('环境变量检查:', {
    supabaseUrl: supabaseUrl ? '已设置' : '未设置',
    supabaseKey: supabaseKey ? '已设置' : '未设置'
  })
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase环境变量未配置')
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

exports.handler = async (event) => {
  console.log('测试函数被调用')
  
  try {
    const supabase = initSupabase()
    console.log('Supabase客户端创建成功')
    
    // 测试简单的Supabase操作
    const { data, error } = await supabase.from('user_profiles').select('count')
    
    if (error) {
      console.log('Supabase查询错误:', error)
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          status: 'Supabase连接成功，但查询失败',
          error: error.message,
          hint: 'user_profiles表可能不存在'
        })
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        status: '一切正常',
        supabase: '连接成功',
        table: '查询成功',
        data: data
      })
    }
    
  } catch (error) {
    console.error('测试函数错误:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        status: '测试失败',
        error: error.message,
        stack: error.stack,
        environment: {
          SUPABASE_URL: process.env.SUPABASE_URL ? '已设置' : '未设置',
          SUPABASE_KEY: process.env.SUPABASE_KEY ? '已设置' : '未设置'
        }
      })
    }
  }
}