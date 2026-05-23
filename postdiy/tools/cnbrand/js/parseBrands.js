// 临时脚本，用于解析brandData.js文件并提取分类和品牌信息
const fs = require('fs');
const path = require('path');

// 读取brandData.js文件内容
const filePath = path.join(__dirname, 'brandData.js');
const content = fs.readFileSync(filePath, 'utf8');

// 提取brandData对象的内容
const brandDataMatch = content.match(/const brandData = ([\s\S]*);/);
if (brandDataMatch) {
    // 将字符串转换为JavaScript对象
    const brandData = eval(`(${brandDataMatch[1]})`);
    
    let output = '=== 分类结构 ===\n';
    
    // 遍历所有顶级分类
    Object.keys(brandData).forEach(mainCategory => {
        output += `\n${mainCategory}:\n`;
        
        // 遍历所有子分类
        Object.keys(brandData[mainCategory]).forEach(subCategory => {
            // 提取主标题
            const mainTitle = subCategory.split('|')[0];
            output += `  - ${mainTitle}\n`;
            
            // 遍历所有品牌
            brandData[mainCategory][subCategory].forEach(brand => {
                output += `    * ${brand.name}\n`;
            });
        });
    });
    
    // 将输出写入文件
    const outputFilePath = path.join(__dirname, 'brandCategories.txt');
    fs.writeFileSync(outputFilePath, output, 'utf8');
    
    console.log(`分类结构已成功保存到 ${outputFilePath}`);
    console.log('\n=== 输出预览 ===');
    console.log(output.substring(0, 2000) + '...');
    console.log(`\n完整输出共 ${output.length} 字符，已保存到文件。`);
} else {
    console.error('无法提取brandData对象');
}