// 简单的测试脚本来验证logo数据

// 由于我们在Node.js环境中测试，需要模拟浏览器环境
const fs = require('fs');
const path = require('path');

// 读取brandData.js文件内容
function loadBrandData() {
    try {
        const brandDataPath = path.join(__dirname, 'js', 'brandData.js');
        const content = fs.readFileSync(brandDataPath, 'utf8');
        
        // 提取brandData对象
        const brandDataMatch = content.match(/const brandData = ([\s\S]*?);/);
        if (brandDataMatch && brandDataMatch[1]) {
            // 使用Function构造器安全地解析对象（仅用于测试）
            const brandData = new Function(`return ${brandDataMatch[1]};`)();
            return brandData;
        }
        
        throw new Error('无法解析brandData对象');
    } catch (error) {
        console.error('读取brandData.js时出错:', error.message);
        return null;
    }
}

// 测试护肤品类品牌的logo路径
function testSkincareBrands() {
    console.log('开始测试护肤品类品牌logo数据...');
    
    const brandData = loadBrandData();
    if (!brandData) {
        return false;
    }
    
    const skincareBrands = brandData['护肤品'] || [];
    if (!skincareBrands.length) {
        console.error('未找到护肤品类品牌数据');
        return false;
    }
    
    console.log(`找到 ${skincareBrands.length} 个护肤品类品牌`);
    
    let successCount = 0;
    let missingLogoCount = 0;
    let logoFilesExistCount = 0;
    
    // 验证每个品牌是否都有logo路径
    skincareBrands.forEach((brand, index) => {
        if (brand.logo) {
            successCount++;
            
            // 检查logo占位文件是否存在（注意：这里检查的是.txt占位文件）
            const logoTxtPath = path.join(__dirname, brand.logo + '.txt');
            if (fs.existsSync(logoTxtPath)) {
                logoFilesExistCount++;
            }
        } else {
            missingLogoCount++;
            console.log(`  错误: ${brand.name} 缺少logo路径`);
        }
    });
    
    console.log(`\n测试结果:`);
    console.log(`- 成功添加logo路径的品牌: ${successCount} 个`);
    console.log(`- 缺少logo路径的品牌: ${missingLogoCount} 个`);
    console.log(`- logo占位文件存在的品牌: ${logoFilesExistCount} 个`);
    
    // 显示前5个品牌的logo路径作为示例
    console.log('\n前5个品牌的logo路径示例:');
    skincareBrands.slice(0, 5).forEach(brand => {
        console.log(`  ${brand.name}: ${brand.logo}`);
    });
    
    return missingLogoCount === 0;
}

// 运行测试
if (require.main === module) {
    const allTestsPassed = testSkincareBrands();
    
    if (allTestsPassed) {
        console.log('\n✅ 所有测试通过！护肤品类品牌logo数据已成功更新。');
    } else {
        console.log('\n❌ 测试未通过，部分品牌缺少logo路径。');
    }
}

module.exports = { testSkincareBrands };