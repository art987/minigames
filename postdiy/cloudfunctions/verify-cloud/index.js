const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  try {
    console.log('开始检查云函数和数据库...');
    
    const result = {
      cloudFunctions: {},
      databaseCollections: {},
      overallStatus: 'success'
    };
    
    // 检查云函数
    const functionNames = [
      'init-database',
      'send-sms',
      'user-register',
      'user-login',
      'user-upgrade',
      'user-get-info',
      'user-update-info',
      'set-password',
      'login-with-password',
      'user-update-image',
      'user-get-image',
      'user-delete-image',
      'user-generate-voucher',
      'user-verify-voucher',
      'user-voucher-list',
      'check-vip-status',
      'admin-generate-vouchers',
      'admin-manage-vouchers'
    ];
    
    console.log('检查云函数列表...');
    result.cloudFunctions = {};
    for (const name of functionNames) {
      try {
        // 尝试调用云函数
        const res = await cloud.callFunction({
          name: name,
          data: { test: true }
        });
        result.cloudFunctions[name] = {
          exists: true,
          callable: true,
          response: res
        };
        console.log(`✓ 云函数 ${name} 可用`);
      } catch (e) {
        if (e.code === 'FUNCTION_RUNTIME_ERROR' || e.code === 'FUNCTION_NOT_FOUND') {
          result.cloudFunctions[name] = {
            exists: false,
            error: e.message
          };
          console.log(`✗ 云函数 ${name} 不存在或不可用: ${e.message}`);
          result.overallStatus = 'error';
        } else {
          result.cloudFunctions[name] = {
            exists: true,
            callable: true,
            response: e
          };
          console.log(`✓ 云函数 ${name} 可用 (有响应)`);
        }
      }
    }
    
    // 检查数据库集合
    console.log('检查数据库集合...');
    const collectionNames = ['users', 'sms_codes', 'upgrade_codes', 'vip_vouchers', 'user_images'];
    
    result.databaseCollections = {};
    for (const name of collectionNames) {
      try {
        const count = await db.collection(name).count();
        result.databaseCollections[name] = {
          exists: true,
          count: count.total
        };
        console.log(`✓ 数据库集合 ${name}: ${count.total} 条记录`);
      } catch (e) {
        result.databaseCollections[name] = {
          exists: false,
          error: e.message
        };
        console.log(`✗ 数据库集合 ${name} 不存在或不可用: ${e.message}`);
        result.overallStatus = 'error';
      }
    }
    
    console.log('检查完成');
    return result;
  } catch (error) {
    console.error('检查失败:', error);
    return {
      overallStatus: 'error',
      error: error.message
    };
  }
};
