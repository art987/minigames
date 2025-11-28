const fs = require('fs');
const path = require('path');

// 品牌分类与英文文件夹名的映射
const categoryMapping = {
    '护肤品': 'skincare',
    '美妆类': 'cosmetics',
    '洗发水': 'shampoo',
    '奶制品': 'dairy',
    '饮料': 'beverages',
    '调味品': 'condiments',
    '方便食品': 'instant_foods',
    '零食': 'snacks',
    '米面粮油': 'staples',
    '香皂类': 'soap',
    '牙膏': 'toothpaste',
    '洗衣粉': 'detergent',
    '卫生纸巾': 'tissue',
    '服装': 'clothing'
};

// 规范化品牌名称为拼音文件名
function normalizeBrandName(brandName) {
    // 简单的品牌名称映射
    const brandMapping = {
        '郁美净': 'yumeijing',
        '百雀羚': 'baiqueling',
        '相宜本草': 'xiangyibencao',
        '丁家宜': 'dingjiayi',
        '佰草集': 'baicaoji',
        '韩束': 'hanshu',
        '双妹': 'shuangmei',
        '美加净': 'meijiajing',
        '欧诗漫': 'oushiman',
        '采诗': 'caishi',
        '珀莱雅': 'polaiya',
        '水密码': 'shuimima',
        '润本': 'runben',
        '启初': 'qichu',
        '薇诺娜': 'weinuona',
        '高姿': 'gaozi',
        '健美创研': 'jianmeichuangyan',
        '馥珮': 'fupei',
        '京润': 'jingrun',
        '御泥坊': 'yunifang',
        '大水滴': 'dashuidi',
        '花瑶花': 'huayaohua',
        '美肤宝': 'meifubao',
        '法兰琳卡': 'falanlinka',
        '林清轩': 'linqingxuan',
        '永芳': 'yongfang',
        '衡美肤': 'hengmeifu',
        '月里嫦娥': 'yuelichang-e',
        '七日香': 'qirixiang',
        '春娟': 'chunjuan',
        '雅霜': 'yashuang',
        '迷奇': 'miqi',
        '兰亭': 'lanting',
        '万紫千红': 'wanziqianhong',
        '京卫本草': 'jingweibencao',
        '宫灯': 'gongdeng',
        '森宝': 'senbao',
        '西施美': 'xishimei',
        '标婷': 'biaoting',
        '孔凤春': 'kongfengchun',
        '戴春林': 'daichunlin',
        '片仔癀': 'pianzaihuang',
        '隆力奇': 'longliqi',
        '东洋之花': 'dongyangzhihua',
        '青蛙王子': 'qingwangzi',
        '孩儿面': 'haier-mian',
        '红色小象': 'hongsexiaoxiang'
    };
    
    // 如果有映射则使用映射，否则返回中文名称（实际应用中应该使用拼音转换库）
    return brandMapping[brandName] || brandName.toLowerCase().replace(/\s+/g, '');
}

// 生成规范化的logo路径
function generateLogoPath(category, brandName) {
    const enCategory = categoryMapping[category] || category.toLowerCase().replace(/\s+/g, '_');
    const normalizedBrandName = normalizeBrandName(brandName);
    return `logos/${enCategory}/${normalizedBrandName}.png`;
}

// 主函数：修复brandData.js文件中的logo路径
function fixBrandData() {
    const filePath = path.join(__dirname, 'brandData.js');
    
    try {
        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log('开始处理brandData.js文件...');
        
        // 1. 首先删除重复的logo属性（保留第一个）
        content = content.replace(/(logo:\s*"[^"]*")\s*,\s*\1/g, '$1');
        
        // 2. 直接使用字符串操作来处理文件内容
        // 先匹配整体数据结构
        const dataMatch = content.match(/const brandData = (\{[\s\S]*?\});/);
        
        if (!dataMatch) {
            throw new Error('无法找到品牌数据结构');
        }
        
        // 解析JSON数据
        let brandData;
        try {
            // 替换window对象引用以便能正确解析
            const cleanData = dataMatch[1].replace(/if\s*\(typeof window !== "undefined"\)\s*\{[^\}]*\}/g, '');
            brandData = JSON.parse(cleanData);
            // 如果JSON解析成功，直接更新数据
            for (const category in brandData) {
                if (brandData.hasOwnProperty(category)) {
                    brandData[category] = brandData[category].map(brand => {
                        return {
                            ...brand,
                            logo: generateLogoPath(category, brand.name)
                        };
                    });
                }
            }
            // 将更新后的数据转换回字符串
            const updatedDataStr = JSON.stringify(brandData, null, 2);
            content = content.replace(dataMatch[0], `const brandData = ${updatedDataStr};`);
        } catch (e) {
            console.error('JSON解析错误，尝试更简单的方法...');
            // 如果JSON解析失败，直接使用字符串替换方法
            Object.keys(categoryMapping).forEach(category => {
                // 为每个分类下的品牌构建替换规则
                const categoryStr = `"${category}": [`;
                if (content.includes(categoryStr)) {
                    // 简单的替换方法：查找所有品牌对象并替换logo
                    const brandRegex = new RegExp(`\{[^\}]*?name:\s*"([^"]+)"[^\}]*?\}`, 'gs');
                    let match;
                    
                    while ((match = brandRegex.exec(content)) !== null) {
                        const brandName = match[1];
                        const brandObj = match[0];
                        const newLogoPath = generateLogoPath(category, brandName);
                        
                        let newBrandObj;
                        if (brandObj.includes('logo:')) {
                            // 替换现有logo
                            newBrandObj = brandObj.replace(/logo:\s*"[^"]*"/, `logo: "${newLogoPath}"`);
                        } else {
                            // 添加新的logo属性
                            newBrandObj = brandObj.replace(
                                `name: "${brandName}"`,
                                `name: "${brandName}", logo: "${newLogoPath}"`
                            );
                        }
                        
                        // 替换原品牌对象
                        content = content.replace(brandObj, newBrandObj);
                    }
                }
            });
        }
        
        // 3. 修复window对象引用
        if (content.includes('window.brandData = brandData;')) {
            content = content.replace(
                'window.brandData = brandData;',
                'if (typeof window !== "undefined") {\n    window.brandData = brandData;\n}'
            );
        } else if (!content.includes('if (typeof window !== "undefined")')) {
            // 如果没有window引用，添加它
            if (content.endsWith(';')) {
                content = content.replace(/;$/, ';\n\n// 全局暴露变量，供app.js使用\nif (typeof window !== "undefined") {\n    window.brandData = brandData;\n}');
            } else {
                content = content + '\n\n// 全局暴露变量，供app.js使用\nif (typeof window !== "undefined") {\n    window.brandData = brandData;\n}';
            }
        }
        
        // 写回文件
        fs.writeFileSync(filePath, content, 'utf8');
        
        console.log('品牌数据已成功修复，所有品牌都添加了规范化的logo路径，重复的logo属性已删除！');
    } catch (error) {
        console.error('处理文件时出错:', error.message);
        console.error(error.stack);
    }
}

// 执行修复
fixBrandData();