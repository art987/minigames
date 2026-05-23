const fs = require('fs');
const path = require('path');

// 品牌分类映射
const categoryMap = {
    "护肤品": "skincare",
    "化妆品": "cosmetics",
    "食品饮料": "food",
    "服装鞋帽": "clothing",
    "电子产品": "electronics",
    "家居家装": "home",
    "汽车": "automotive",
    "母婴用品": "baby",
    "医药健康": "health",
    "文化娱乐": "entertainment"
};

// 主修复函数
function fixBrandLogos() {
    const filePath = path.join(__dirname, 'brandData.js');
    
    try {
        // 读取文件内容
        console.log('正在读取 brandData.js 文件...');
        let fileContent = fs.readFileSync(filePath, 'utf8');
        
        // 创建临时文件来执行JavaScript代码
        const tempFilePath = path.join(__dirname, 'tempBrandData.js');
        
        // 写入临时文件，添加module.exports
        const tempContent = fileContent + '\n\nmodule.exports = brandData;';
        fs.writeFileSync(tempFilePath, tempContent, 'utf8');
        
        // 尝试通过require加载数据
        console.log('正在加载品牌数据...');
        let brandData;
        try {
            brandData = require(tempFilePath);
        } catch (e) {
            console.log('通过require加载失败，尝试其他方法...');
            
            // 如果require失败，使用正则表达式方法修复文件内容
            // 1. 移除所有重复的logo属性
            fileContent = fileContent.replace(/logo\s*:\s*"[^"]*"\s*,\s*logo\s*:/g, 'logo:');
            
            // 2. 更新所有logo路径
            console.log('使用正则表达式直接更新logo路径...');
            
            // 为每个分类生成替换规则
            for (const [category, categoryFolder] of Object.entries(categoryMap)) {
                // 匹配特定分类中的品牌logo
                const categoryRegex = new RegExp(`"${category}":\s*\[([\s\S]*?)\]`, 'g');
                fileContent = fileContent.replace(categoryRegex, (match, brandsStr) => {
                    // 更新这个分类中所有品牌的logo路径
                    const updatedBrandsStr = brandsStr.replace(/\{name:\s*"([^"]+)",\s*logo:\s*"[^"]*"/g, (brandMatch, brandName) => {
                        const normalizedBrandName = brandName.toLowerCase();
                        const newLogoPath = `logos/${categoryFolder}/${normalizedBrandName}.png`;
                        return `{name: "${brandName}", logo: "${newLogoPath}"`;
                    });
                    return `"${category}": [${updatedBrandsStr}]`;
                });
            }
            
            // 3. 修复window.brandData赋值
            if (fileContent.includes('window.brandData = brandData;')) {
                fileContent = fileContent.replace(/window\.brandData\s*=\s*brandData;/, 'if (typeof window !== "undefined") { window.brandData = brandData; }');
            }
            
            // 直接写回文件
            fs.writeFileSync(filePath, fileContent, 'utf8');
            console.log('成功使用正则表达式修复所有品牌logo路径！');
            
            // 删除临时文件
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            
            return;
        }
        
        // 继续使用正常的对象处理方式
        
        // 更新每个品牌的logo路径
        console.log('正在更新所有品牌的logo路径...');
        let updatedCount = 0;
        
        for (const [category, brands] of Object.entries(brandData)) {
            const categoryFolder = categoryMap[category] || 'other';
            
            brands.forEach(brand => {
                // 生成新的logo路径
                const brandName = brand.name;
                const normalizedBrandName = brandName.toLowerCase();
                const newLogoPath = `logos/${categoryFolder}/${normalizedBrandName}.png`;
                
                // 更新logo路径
                brand.logo = newLogoPath;
                updatedCount++;
            });
        }
        
        // 生成更新后的文件内容
        console.log('正在生成更新后的文件内容...');
        
        // 使用自定义函数转换对象为字符串，保留JavaScript语法格式
        function objToString(obj, indent = 4) {
            const spaces = ' '.repeat(indent);
            if (Array.isArray(obj)) {
                return `[\n${spaces}${obj.map(item => objToString(item, indent + 4)).join(`,\n${spaces}`)}\n${' '.repeat(indent - 4)}]`;
            } else if (obj === null) {
                return 'null';
            } else if (typeof obj !== 'object') {
                return typeof obj === 'string' ? `"${obj}"` : String(obj);
            } else {
                const keys = Object.keys(obj);
                return `{\n${spaces}${keys.map(key => `"${key}": ${objToString(obj[key], indent + 4)}`).join(`,\n${spaces}`)}\n${' '.repeat(indent - 4)}}`;
            }
        }
        
        const updatedBrandDataStr = objToString(brandData);
        
        // 替换原文件中的品牌数据部分
        let updatedFileContent = fileContent.replace(/const brandData\s*=\s*{[\s\S]*?};/, `const brandData = ${updatedBrandDataStr};`);
        
        // 修复window.brandData赋值
        if (updatedFileContent.includes('window.brandData = brandData;')) {
            updatedFileContent = updatedFileContent.replace(/window\.brandData\s*=\s*brandData;/, 'if (typeof window !== "undefined") { window.brandData = brandData; }');
        }
        
        // 写回文件
        console.log('正在写回文件...');
        fs.writeFileSync(filePath, updatedFileContent, 'utf8');
        
        console.log(`成功修复！共更新了 ${updatedCount} 个品牌的logo路径。`);
        console.log('所有品牌的logo路径已规范化为要求格式，重复的logo属性已删除。');
        
    } catch (error) {
        console.error('修复过程中出错：', error.message);
        console.error('错误堆栈：', error.stack);
    } finally {
        // 确保删除临时文件
        try {
            const tempFilePath = path.join(__dirname, 'tempBrandData.js');
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
                console.log('临时文件已删除');
            }
        } catch (cleanupError) {
            console.warn('删除临时文件时出错：', cleanupError.message);
        }
    }
}

// 执行修复
fixBrandLogos();