const fs = require('fs');
const path = require('path');

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
const brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 提取品牌数据
const brandDataMatch = brandDataContent.match(/const brandData = (.*?);/s);
if (!brandDataMatch) {
    console.error('未找到品牌数据');
    process.exit(1);
}

// 使用Function构造函数安全地解析数据
const brandData = new Function('return ' + brandDataMatch[1])();

// 查找没有核心优势的品牌
const brandsWithoutAdvantages = [];

function findBrandsWithoutAdvantages(data, mainCategory, subCategory = null) {
    if (Array.isArray(data)) {
        data.forEach(brand => {
            if (typeof brand === 'object' && brand !== null) {
                if (!brand.advantages) {
                    brandsWithoutAdvantages.push({
                        mainCategory,
                        subCategory: subCategory || brand.category || '未知',
                        brand
                    });
                }
            }
        });
    } else if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (typeof value === 'object' && value !== null) {
                if (Array.isArray(value)) {
                    // 这是一个子类别的品牌列表
                    findBrandsWithoutAdvantages(value, mainCategory, key);
                } else {
                    // 这是一个包含多个子类别的对象
                    findBrandsWithoutAdvantages(value, key);
                }
            }
        });
    }
}

findBrandsWithoutAdvantages(brandData);

console.log(`总共找到 ${brandsWithoutAdvantages.length} 个没有核心优势的品牌`);

// 获取第61-75个品牌
const fifthBatchBrands = brandsWithoutAdvantages.slice(60, 75);

console.log(`第61-75个没有核心优势的品牌：${fifthBatchBrands.length}个`);

// 保存到JSON文件
const outputPath = path.join(__dirname, 'fifthBatchBrandsToAddAdvantages.json');
fs.writeFileSync(outputPath, JSON.stringify(fifthBatchBrands, null, 2), 'utf8');

console.log(`已保存到 ${outputPath}`);