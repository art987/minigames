// 查找下一批没有核心优势的品牌（第16-30个）
const fs = require('fs');
const path = require('path');

// 读取brandData.js文件
const brandDataPath = path.join(__dirname, 'brandData.js');
let brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 提取brandData对象的内容
const brandDataMatch = brandDataContent.match(/const brandData = (\{[\s\S]*\});/);
if (!brandDataMatch) {
    console.error('未能找到brandData对象');
    process.exit(1);
}

const brandData = JSON.parse(brandDataMatch[1]);
const brandsWithoutAdvantages = [];

// 遍历所有分类和品牌，查找没有advantages的品牌
for (const mainCategory in brandData) {
    if (brandData.hasOwnProperty(mainCategory)) {
        const subCategories = brandData[mainCategory];
        for (const subCategory in subCategories) {
            if (subCategories.hasOwnProperty(subCategory)) {
                const brands = subCategories[subCategory];
                brands.forEach(brand => {
                    if (!brand.advantages || brand.advantages.length === 0) {
                        brandsWithoutAdvantages.push({
                            mainCategory,
                            subCategory,
                            brand
                        });
                    }
                });
            }
        }
    }
}

// 获取第16-30个品牌
const nextBatchBrands = brandsWithoutAdvantages.slice(15, 30);

console.log(`找到没有核心优势的品牌总数: ${brandsWithoutAdvantages.length}`);
console.log(`下一批处理的品牌（第16-30个）: ${nextBatchBrands.length}个`);

// 保存到JSON文件
const outputPath = path.join(__dirname, 'nextBrandsToAddAdvantages.json');
fs.writeFileSync(outputPath, JSON.stringify(nextBatchBrands, null, 2), 'utf8');

console.log('下一批品牌数据已保存到nextBrandsToAddAdvantages.json');