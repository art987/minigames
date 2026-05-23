// 查找没有核心优势的品牌脚本
const fs = require('fs');
const path = require('path');

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
const content = fs.readFileSync(brandDataPath, 'utf8');

// 提取品牌数据
const dataMatch = content.match(/const brandData = (\{[\s\S]*?\});/);
if (!dataMatch) {
    console.error('未找到品牌数据');
    process.exit(1);
}

const brandData = eval(`(${dataMatch[1]})`);

// 查找没有advantages的品牌
const brandsWithoutAdvantages = [];
let count = 0;

for (const mainCategory in brandData) {
    for (const subCategory in brandData[mainCategory]) {
        const brands = brandData[mainCategory][subCategory];
        for (const brand of brands) {
            if (!brand.advantages || brand.advantages.length === 0) {
                brandsWithoutAdvantages.push({
                    mainCategory,
                    subCategory,
                    brand: {
                        name: brand.name,
                        description: brand.description,
                        reputation: brand.reputation
                    }
                });
                count++;
            }
        }
    }
}

console.log(`共有 ${count} 个品牌没有核心优势`);
console.log('前15个没有核心优势的品牌：');

// 显示前15个品牌
for (let i = 0; i < Math.min(15, brandsWithoutAdvantages.length); i++) {
    const item = brandsWithoutAdvantages[i];
    console.log(`\n${i + 1}. ${item.brand.name}`);
    console.log(`   主分类: ${item.mainCategory}`);
    console.log(`   子分类: ${item.subCategory}`);
    console.log(`   描述: ${item.brand.description}`);
}

// 保存前15个品牌到文件，便于补充信息
const first15Brands = brandsWithoutAdvantages.slice(0, 15);
fs.writeFileSync(
    path.join(__dirname, 'brandsToAddAdvantages.json'),
    JSON.stringify(first15Brands, null, 2),
    'utf8'
);

console.log('\n前15个品牌已保存到 brandsToAddAdvantages.json 文件中');