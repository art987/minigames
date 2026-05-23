// 读取brandData.js文件并更新logo路径
const fs = require('fs');
const path = require('path');

// 品牌分类与英文文件夹名的映射关系
const categoryMapping = {
    "护肤品": "skincare",
    "美妆类": "cosmetics",
    "洗发水": "shampoo",
    "沐浴露": "bath",
    "奶制品": "dairy",
    "饮料": "beverage",
    "调味品": "condiment",
    "方便食品": "instantfood",
    "零食": "snack",
    "米面粮油": "grainoil",
    "香皂类": "soap",
    "牙膏": "toothpaste",
    "洗衣粉": "detergent",
    "卫生纸巾": "tissue",
    "服装": "clothing"
};

// 规范化品牌名称为文件名格式
function normalizeBrandName(name) {
    return name.toLowerCase().replace(/[^\w\u4e00-\u9fa5]/g, '');
}

// 生成规范化的logo路径
function generateLogoPath(category, brandName) {
    const categoryFolder = categoryMapping[category] || category.toLowerCase();
    const normalizedName = normalizeBrandName(brandName);
    return `logos/${categoryFolder}/${normalizedName}.png`;
}

// 读取并处理brandData.js文件
function processBrandData() {
    const filePath = path.join(__dirname, 'brandData.js');
    
    try {
        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 替换原始内容，使其成为可执行的模块
        const moduleCode = content.replace('const brandData = ', 'module.exports = ');
        
        // 将代码写入临时文件
        const tempFilePath = path.join(__dirname, 'tempBrandData.js');
        fs.writeFileSync(tempFilePath, moduleCode, 'utf8');
        
        // 导入临时模块获取品牌数据
        let brandData = require('./tempBrandData');
        
        // 删除临时文件
        fs.unlinkSync(tempFilePath);
            
        // 为每个品牌添加规范化的logo路径
        for (const category in brandData) {
            if (brandData.hasOwnProperty(category)) {
                brandData[category] = brandData[category].map(brand => {
                    // 如果品牌没有logo属性，或者logo路径不是以'logos/'开头，则添加规范化路径
                    if (!brand.logo || !brand.logo.startsWith('logos/')) {
                        return {
                            ...brand,
                            logo: generateLogoPath(category, brand.name)
                        };
                    }
                    return brand;
                });
            }
        }
            
        // 转换对象为字符串，保持JavaScript对象语法
        function objToString(obj, indent = 0) {
            const spaces = ' '.repeat(indent);
            if (Array.isArray(obj)) {
                if (obj.length === 0) return '[]';
                return '[' + obj.map(item => '\n' + spaces + '    ' + objToString(item, indent + 4)).join(',') + '\n' + spaces + ']';
            }
            if (typeof obj === 'object' && obj !== null) {
                const keys = Object.keys(obj);
                if (keys.length === 0) return '{}';
                return '{' + keys.map(key => '\n' + spaces + '    ' + key + ': ' + objToString(obj[key], indent + 4)).join(',') + '\n' + spaces + '}';
            }
            if (typeof obj === 'string') return `"${obj}"`;
            return String(obj);
        }
            
        // 创建更新后的内容
        const updatedDataStr = objToString(brandData, 4);
        const updatedContent = 'const brandData = ' + updatedDataStr + ';\n\n// 全局暴露变量，供app.js使用\nif (typeof window !== "undefined") {\n    window.brandData = brandData;\n}';
            
        // 写回文件
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log('品牌数据已成功更新，所有品牌都添加了规范化的logo路径！');
    } catch (error) {
        console.error('处理文件时出错:', error.message);
    }
}

// 执行处理
try {
    processBrandData();
} catch (error) {
    console.error('执行过程中出错:', error.message);
}