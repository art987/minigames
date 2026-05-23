// 查找第76-90个没有核心优势的品牌
const fs = require('fs');
const path = require('path');

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
const brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 提取品牌数据
const extractBrandData = () => {
    try {
        // 使用正则表达式提取品牌数据对象
        const brandDataRegex = /const brandData = ({.*});/s;
        const match = brandDataContent.match(brandDataRegex);
        if (!match) {
            throw new Error('未找到品牌数据');
        }
        const brandDataStr = match[1];
        
        // 使用Function构造函数安全地解析JSON
        const brandData = new Function('return ' + brandDataStr)();
        return brandData;
    } catch (error) {
        console.error('提取品牌数据失败:', error);
        return {};
    }
};

// 查找所有没有核心优势的品牌
const findBrandsWithoutAdvantages = (brandData) => {
    const allBrands = [];
    
    // 遍历所有主分类
    for (const [mainCategory, subcategories] of Object.entries(brandData)) {
        // 遍历所有子分类
        for (const [subCategory, brands] of Object.entries(subcategories)) {
            // 遍历该子分类下的所有品牌
            for (const brand of brands) {
                if (!brand.advantages) {
                    allBrands.push({
                        mainCategory: mainCategory,
                        subCategory: subCategory,
                        brand: brand
                    });
                }
            }
        }
    }
    
    return allBrands;
};

// 主函数
const main = () => {
    // 提取品牌数据
    const brandData = extractBrandData();
    
    // 查找所有没有核心优势的品牌
    const brandsWithoutAdvantages = findBrandsWithoutAdvantages(brandData);
    
    console.log(`共找到 ${brandsWithoutAdvantages.length} 个没有核心优势的品牌`);
    
    // 提取第76-90个品牌
    const sixthBatchBrands = brandsWithoutAdvantages.slice(75, 90);
    
    console.log(`提取第76-90个品牌，共 ${sixthBatchBrands.length} 个`);
    
    // 保存到文件
    const outputPath = path.join(__dirname, 'sixthBatchBrandsToAddAdvantages.json');
    fs.writeFileSync(outputPath, JSON.stringify(sixthBatchBrands, null, 2), 'utf8');
    
    console.log(`品牌数据已保存到 ${outputPath}`);
};

// 执行主函数
main();