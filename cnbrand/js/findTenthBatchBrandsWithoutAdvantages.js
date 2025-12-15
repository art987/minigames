// 查找第136-150个没有核心优势的品牌
const fs = require('fs');
const path = require('path');

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
const brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 提取品牌数据对象
function extractBrandData(content) {
  const match = content.match(/const brandData = (\{[\s\S]*\});/);
  if (match) {
    try {
      return eval('(' + match[1] + ')');
    } catch (error) {
      console.error('解析品牌数据失败:', error.message);
      return {};
    }
  } else {
    console.error('未找到品牌数据');
    return {};
  }
}

// 递归查找所有没有核心优势的品牌
function findBrandsWithoutAdvantages(data, mainCategory = '', subCategory = '') {
  const result = [];
  
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (item && typeof item === 'object') {
        if (item.name && !item.advantages) {
          result.push({
            mainCategory,
            subCategory,
            brand: item
          });
        }
      }
    });
  } else if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          // 如果值是数组，可能是品牌列表
          value.forEach(brand => {
            if (brand && typeof brand === 'object' && brand.name && !brand.advantages) {
              result.push({
                mainCategory,
                subCategory: key,
                brand: brand
              });
            }
          });
        } else {
          // 如果值是对象，递归查找
          const newMainCategory = mainCategory || key;
          const subResult = findBrandsWithoutAdvantages(value, newMainCategory, key);
          result.push(...subResult);
        }
      }
    });
  }
  
  return result;
}

// 主函数
function main() {
  console.log('开始查找没有核心优势的品牌...');
  
  // 提取品牌数据
  const brandData = extractBrandData(brandDataContent);
  
  // 查找所有没有核心优势的品牌
  const brandsWithoutAdvantages = findBrandsWithoutAdvantages(brandData);
  
  console.log(`共找到 ${brandsWithoutAdvantages.length} 个没有核心优势的品牌`);
  
  // 提取第136-150个品牌（索引从0开始，所以是135-149）
  const startIndex = 135;
  const endIndex = 149;
  const tenthBatchBrands = brandsWithoutAdvantages.slice(startIndex, endIndex + 1);
  
  console.log(`成功提取第 ${startIndex + 1}-${endIndex + 1} 个品牌，共 ${tenthBatchBrands.length} 个`);
  
  // 保存到文件
  const outputPath = path.join(__dirname, 'tenthBatchBrandsToAddAdvantages.json');
  fs.writeFileSync(outputPath, JSON.stringify(tenthBatchBrands, null, 2), 'utf8');
  
  console.log(`数据已保存到 ${outputPath}`);
}

// 执行主函数
main();