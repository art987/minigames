import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
fs.readFile(brandDataPath, 'utf8').then(brandDataContent => {
    // 提取品牌数据
    // 使用更安全的方式解析，先将const brandData = 替换为export default，然后使用模块化方式
    const modifiedContent = brandDataContent.replace(/const brandData = /, 'export default ');
    const tempFilePath = path.join(__dirname, 'tempBrandData.js');
    return fs.writeFile(tempFilePath, modifiedContent, 'utf8').then(() => tempFilePath);
}).then(tempFilePath => {

    // 动态导入模块
    return import(tempFilePath).then(module => {
        const brandData = module.default;
        
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
        
        // 获取第46-60个品牌
        const fourthBatchBrands = brandsWithoutAdvantages.slice(45, 60);
        
        console.log(`第46-60个没有核心优势的品牌：${fourthBatchBrands.length}个`);
        
        // 保存到JSON文件
        const outputPath = path.join(__dirname, 'fourthBatchBrandsToAddAdvantages.json');
        return fs.writeFile(outputPath, JSON.stringify(fourthBatchBrands, null, 2), 'utf8').then(() => {
            console.log(`已保存到 ${outputPath}`);
            return tempFilePath;
        });
    });
}).then(tempFilePath => {
    // 删除临时文件
    return fs.unlink(tempFilePath);
}).catch(error => {
    console.error('处理品牌数据出错：', error);
    process.exit(1);
});

// 导出模块以支持动态导入
export {};