// 查找第91-105个没有核心优势的品牌
const fs = require('fs');

// 读取brandData.js文件
const brandDataPath = './brandData.js';
const brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 提取brandData对象
let brandData;
try {
  // 从brandData.js文件中提取brandData对象
  const brandDataMatch = brandDataContent.match(/const brandData = (\{[\s\S]*\});/);
  if (brandDataMatch && brandDataMatch[1]) {
    brandData = eval(`(${brandDataMatch[1]})`);
    console.log('成功提取品牌数据');
  } else {
    console.error('未找到品牌数据');
    process.exit(1);
  }
} catch (error) {
  console.error('提取品牌数据失败:', error.message);
  process.exit(1);
}

// 递归查找所有没有advantages字段的品牌
function findBrandsWithoutAdvantages(data, mainCategory = '', subCategory = '') {
  let result = [];
  
  for (const key in data) {
    if (typeof data[key] === 'object' && data[key] !== null) {
      if (Array.isArray(data[key])) {
        // 这是一个品牌数组
        data[key].forEach(brand => {
          if (!brand.advantages || brand.advantages.length === 0) {
            result.push({
              mainCategory,
              subCategory: key,
              brand
            });
          }
        });
      } else {
        // 这是一个子分类对象
        const subResult = findBrandsWithoutAdvantages(data[key], key, key);
        result = [...result, ...subResult];
      }
    }
  }
  
  return result;
}

// 查找所有没有advantages字段的品牌
const brandsWithoutAdvantages = findBrandsWithoutAdvantages(brandData);
console.log(`共找到 ${brandsWithoutAdvantages.length} 个没有核心优势的品牌`);

// 提取第91-105个品牌
const startIndex = 90; // 索引从0开始，第91个对应索引90
const endIndex = 104; // 第105个对应索引104
const seventhBatchBrands = brandsWithoutAdvantages.slice(startIndex, endIndex + 1);

console.log(`提取第91-105个品牌，共 ${seventhBatchBrands.length} 个`);

// 保存到文件
const outputPath = './seventhBatchBrandsToAddAdvantages.json';
fs.writeFileSync(outputPath, JSON.stringify(seventhBatchBrands, null, 2), 'utf8');
console.log(`已将第91-105个没有核心优势的品牌保存到 ${outputPath} 文件`);