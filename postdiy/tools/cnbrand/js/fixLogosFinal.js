const fs = require('fs');
const path = require('path');

// 品类映射
const categoryMap = {
    "护肤品": "skincare",
    "化妆品": "cosmetics",
    "食品饮料": "food_drink",
    "服装鞋帽": "clothing",
    "电子产品": "electronics",
    "家用电器": "appliances",
    "日用品": "daily",
    "母婴用品": "baby",
    "家具家装": "furniture",
    "运动户外": "sports",
    "图书文具": "books",
    "其他": "other"
};

// 品牌名称转英文（简单实现，实际可能需要更复杂的映射）
function getBrandEnglishName(brandName) {
    const brandMap = {
        "郁美净": "yumeijing",
        "百雀羚": "baiqueling",
        "相宜本草": "xiangyibencao",
        "丁家宜": "dingjiayi",
        "佰草集": "baicaoji",
        "韩束": "hanshu",
        "双妹": "shuangmei",
        "美加净": "meijiajing",
        "欧诗漫": "oushiman",
        "采诗": "caishi",
        "珀莱雅": "polaiya",
        "水密码": "shuimima",
        "润本": "runben",
        "启初": "qichu",
        "薇诺娜": "weinuona",
        "高姿": "gaozi",
        "健美创研": "jianmeichuangyan",
        "馥珮": "fupei",
        "京润": "jingrun",
        "御泥坊": "yunifang",
        "大水滴": "dashuidi",
        "花瑶花": "huayaohua",
        "美肤宝": "meifubao",
        "法兰琳卡": "falanlinka",
        "林清轩": "linqingxuan",
        "永芳": "yongfang",
        "衡美肤": "hengmeifu",
        "月里嫦娥": "yuelichang'e",
        "七日香": "qirixiang",
        "春娟": "chunjuan",
        "雅霜": "yashuang",
        "迷奇": "miqi",
        "兰亭": "lanting",
        "万紫千红": "wanzigianhong",
        "京卫本草": "jingweibencao",
        "宫灯": "gongdeng",
        "森宝": "senbao",
        "西施美": "xishimei",
        "标婷": "biaoting",
        "孔凤春": "kongfengchun",
        "戴春林": "daichunlin",
        "片仔癀": "pianzaihuang",
        "隆力奇": "longliqi",
        "东洋之花": "dongyangzhihua",
        "青蛙王子": "qingwangzi",
        "孩儿面": "haiermian",
        "红色小象": "hongsexiaoxiang"
    };
    
    return brandMap[brandName] || brandName.toLowerCase().replace(/\s+/g, '_');
}

function fixBrandLogos() {
    try {
        const filePath = path.join(__dirname, 'brandData.js');
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. 删除重复的logo字段
        console.log('开始处理重复logo字段...');
        content = content.replace(/,\s*logo:\s*"[^"]*"(?=\s*,|\s*})/g, '');
        console.log('重复logo字段已删除');
        
        // 2. 规范化logo路径
        console.log('开始规范化logo路径...');
        
        // 处理每个品类
        Object.keys(categoryMap).forEach(category => {
            const categoryKey = category;
            const categoryEng = categoryMap[category];
            
            // 找到品类的起始位置 - 使用字符串查找代替正则表达式
            const categoryStartStr = `"${categoryKey}": [`;
            const categoryStartIndex = content.indexOf(categoryStartStr);
            
            if (categoryStartIndex !== -1) {
                console.log(`处理品类: ${categoryKey}`);
                
                // 找到品类数组的结束位置
                let startIndex = categoryStartIndex + categoryStartStr.length;
                let bracketCount = 1;
                let endIndex = startIndex;
                
                while (endIndex < content.length && bracketCount > 0) {
                    if (content[endIndex] === '[') bracketCount++;
                    if (content[endIndex] === ']') bracketCount--;
                    endIndex++;
                }
                
                // 提取品类内容
                const categoryContent = content.substring(startIndex, endIndex - 1);
                
                // 处理每个品牌
                let newCategoryContent = categoryContent;
                const brandRegex = /name:\s*"([^"]+)"[^}]*logo:\s*"[^"]*"/g;
                let match;
                
                while ((match = brandRegex.exec(categoryContent)) !== null) {
                    const brandName = match[1];
                    const brandEngName = getBrandEnglishName(brandName);
                    const newLogoPath = `logos/${categoryEng}/${brandEngName}.png`;
                    
                    // 替换logo路径
                    const logoRegex = new RegExp(`(name:\s*"${brandName}"[^}]*logo:)\s*"[^"]*"`);
                    newCategoryContent = newCategoryContent.replace(logoRegex, `$1 "${newLogoPath}"`);
                    console.log(`已更新品牌: ${brandName} -> ${newLogoPath}`);
                }
                
                // 替换回原内容
                content = content.substring(0, startIndex) + newCategoryContent + content.substring(endIndex - 1);
            }
        });
        
        // 3. 确保window对象引用正确
        if (content.includes('window.brandData') && !content.includes('window.brandData = brandData;')) {
            content += '\nwindow.brandData = brandData;';
            console.log('已添加window.brandData引用');
        }
        
        // 4. 写回文件
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('所有修复完成！品牌数据已更新。');
    } catch (error) {
        console.error('修复过程中出错:', error.message);
        console.error(error.stack);
    }
}

fixBrandLogos();