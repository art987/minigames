// 品牌分类与英文文件夹名的映射关系
const categoryMapping = {
    "护肤品": "skincare",
    "美妆类": "cosmetics",
    "洗发水": "shampoo",
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

// 规范化品牌名称为文件名格式（转小写并移除特殊字符）
function normalizeBrandName(name) {
    // 移除空格和特殊字符，转换为小写
    return name.toLowerCase().replace(/[^\w\u4e00-\u9fa5]/g, '');
}

// 生成规范化的logo路径
function generateLogoPath(category, brandName) {
    const categoryFolder = categoryMapping[category] || category.toLowerCase();
    const normalizedName = normalizeBrandName(brandName);
    return `logos/${categoryFolder}/${normalizedName}.png`;
}

// 处理品牌数据，为每个品牌添加规范化的logo路径
function normalizeBrandData(brandData) {
    const normalizedData = {};
    
    for (const category in brandData) {
        if (brandData.hasOwnProperty(category)) {
            normalizedData[category] = brandData[category].map(brand => {
                // 只添加logo属性，如果不存在的话
                if (!brand.logo) {
                    return {
                        ...brand,
                        logo: generateLogoPath(category, brand.name)
                    };
                }
                return brand;
            });
        }
    }
    
    return normalizedData;
}

// 导出函数
module.exports = {
    normalizeBrandData,
    categoryMapping,
    generateLogoPath,
    normalizeBrandName
};

console.log('Logo路径规范化脚本已创建成功！');