const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  console.log('开始批量更新导出状态...');
  
  try {
    const result = await db.collection('vip_vouchers')
      .where({
        exported: _.exists(false)
      })
      .update({
        data: {
          exported: false
        }
      });
    
    console.log(`更新完成，影响 ${result.stats.updated} 条记录`);
    
    return {
      success: true,
      message: `成功更新 ${result.stats.updated} 条记录`,
      updated: result.stats.updated
    };
  } catch (e) {
    console.error('更新失败:', e);
    return {
      success: false,
      message: '更新失败: ' + e.message
    };
  }
};
