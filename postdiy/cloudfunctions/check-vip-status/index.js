const cloud = require('@cloudbase/node-sdk');

// 初始化云开发
const app = cloud.init({
    secretId: process.env.SECRETID,
    secretKey: process.env.SECRETKEY,
    env: process.env.ENV
});

const db = app.database();
const _ = db.command;

// 获取用户的会员状态
async function getUserVIPStatus(userId, phone) {
    try {
        let user;
        // 根据提供的参数查询用户
        if (phone) {
            // 通过手机号码查询
            const result = await db.collection('users')
                .where({ phone: phone })
                .get();
            
            if (result.data.length === 0) {
                return {
                    code: 404,
                    message: '用户不存在'
                };
            }
            user = result.data[0];
        } else if (userId) {
            // 通过用户ID查询
            const result = await db.collection('users')
                .doc(userId)
                .get();
            
            if (!result.data) {
                return {
                    code: 404,
                    message: '用户不存在'
                };
            }
            user = result.data;
        } else {
            return {
                code: 400,
                message: '缺少必要参数'
            };
        }

        const userData = user;
        const now = new Date();
        const isVipValid = userData.vipValidUntil && new Date(userData.vipValidUntil) > now;

        // 更新用户VIP状态
        if (isVipValid) {
            // 用户在VIP有效期内
            if (!userData.isVip) {
                await db.collection('users')
                    .doc(userData._id)
                    .update({
                        isVip: true,
                        updatedAt: now
                    });
                userData.isVip = true;
            }
        } else {
            // 会员已过期
            if (userData.isVip) {
                await db.collection('users')
                    .doc(userData._id)
                    .update({
                        isVip: false,
                        updatedAt: now
                    });
                userData.isVip = false;
            }
        }

        return {
            code: 200,
            data: {
                userId: userData._id,
                phone: userData.phone,
                isVip: userData.isVip || false,
                vipValidUntil: userData.vipValidUntil,
                hasPassword: userData.hasPassword || false,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt
            }
        };

    } catch (error) {
        console.error('获取用户VIP状态失败：', error);
        return {
            code: 500,
            message: '获取状态失败',
            error: error.message
        };
    }
}

// 检查会员权限
async function checkVIPPermission(userId, feature) {
    try {
        const user = await db.collection('users')
            .doc(userId)
            .get();

        if (!user.data) {
            return {
                code: 404,
                message: '用户不存在'
            };
        }

        const userData = user.data;
        const isVip = userData.isVip || false;

        // 权限定义
        const permissions = {
            free: ['basicTemplates', 'limitedPosts'],
            vip: ['allTemplates', 'unlimitedPosts', 'customElements', 'aiGeneration', 'batchExport', 'hdExport']
        };

        const userLevel = isVip ? 'vip' : 'free';
        const hasPermission = permissions[userLevel].includes(feature);

        return {
            code: 200,
            data: {
                hasPermission,
                userLevel,
                isVip,
                feature
            }
        };

    } catch (error) {
        console.error('检查VIP权限失败：', error);
        return {
            code: 500,
            message: '检查权限失败',
            error: error.message
        };
    }
}

// 主函数
exports.main = async (event, context) => {
    // 处理 CORS 预检请求
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: ''
        };
    }

    // 解析请求体
    let requestBody = event;
    if (event.body) {
        try {
            requestBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        } catch (e) {
            console.error('解析请求体失败:', e);
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: 400,
                    message: '请求体格式错误'
                })
            };
        }
    }
    
    const { action, userId, phone, feature } = requestBody;

    let result;
    switch (action) {
        case 'getVIPStatus':
            result = await getUserVIPStatus(userId, phone);
            break;
        case 'checkPermission':
            result = await checkVIPPermission(userId, feature);
            break;
        default:
            result = {
                code: 400,
                message: '无效的操作类型'
            };
    }

    // 返回带有 CORS 头的响应
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
    };
};