// 验证brandData.js中成人护理部分的数据
const fs = require('fs');
const path = require('path');

try {
    // 读取文件内容
    const dataPath = path.join(__dirname, 'brandData.js');
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    
    // 尝试使用正则表达式提取成人护理部分的数据
    const adultCareRegex = /"成人护理":\s*\[([\s\S]+?)\s*\]\s*,?\s*(?:"|\})/;
    const match = fileContent.match(adultCareRegex);
    
    if (match && match[1]) {
        let adultCareContent = match[1];
        
        // 清理内容，尝试修复格式问题
        adultCareContent = adultCareContent.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ', ');
        adultCareContent = adultCareContent.replace(/}\s*{/g, '}, {');
        
        // 尝试解析前几行来检查格式
        const firstLines = adultCareContent.split('\n').slice(0, 30).join('\n');
        console.log('成人护理部分数据（前30行）:');
        console.log(firstLines);
        
        // 简单统计品牌数量
        const brandCount = (adultCareContent.match(/"name":/g) || []).length;
        console.log(`检测到大约 ${brandCount} 个品牌`);
        
        // 尝试统计商品数量
        const productCount = (adultCareContent.match(/"products":\s*\[/g) || []).length;
        console.log(`检测到大约 ${productCount} 个品牌包含商品信息`);
        
        console.log('\n成人护理部分验证完成！');
    } else {
        console.log('未找到成人护理部分的数据');
    }
} catch (error) {
    console.error('处理错误:', error.message);
}