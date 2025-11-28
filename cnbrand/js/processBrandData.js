// 处理品牌数据的脚本
const fs = require('fs');
const path = require('path');

// 读取原始品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
let brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 提取品牌数据对象
const dataMatch = brandDataContent.match(/const brandData = (\{[\s\S]*\});/);
if (!dataMatch) {
    console.error('无法提取品牌数据');
    process.exit(1);
}

// 解析数据
const brandData = eval(`(${dataMatch[1]})`);

// 处理每个分类
for (const category in brandData) {
    if (Array.isArray(brandData[category])) {
        // 过滤掉2010年之后成立的品牌
        const filteredBrands = brandData[category].filter(brand => {
            const yearMatch = brand.founded.match(/(\d{4})年/);
            if (yearMatch) {
                const year = parseInt(yearMatch[1]);
                return year <= 2010;
            }
            return true; // 如果没有找到年份，保留该品牌
        });
        
        // 按成立时间排序（从早到晚）
        filteredBrands.sort((a, b) => {
            const yearA = a.founded.match(/(\d{4})年/) ? parseInt(a.founded.match(/(\d{4})年/)[1]) : 0;
            const yearB = b.founded.match(/(\d{4})年/) ? parseInt(b.founded.match(/(\d{4})年/)[1]) : 0;
            return yearA - yearB;
        });
        
        // 更新分类数据
        brandData[category] = filteredBrands;
    }
}

// 生成新的文件内容
const newContent = `// 品牌数据\nconst brandData = ${JSON.stringify(brandData, null, 2)};`;

// 写入处理后的数据
fs.writeFileSync(brandDataPath, newContent, 'utf8');
console.log('品牌数据处理完成！已按成立时间排序并删除2010年后成立的品牌。');