const fs = require('fs');
const path = require('path');

// 简单直接的修复方法
function simpleFix() {
    try {
        const filePath = path.join(__dirname, 'brandData.js');
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log('开始修复brandData.js文件...');
        
        // 1. 直接删除重复的logo字段 - 查找所有包含两个logo的行并只保留第一个
        const duplicateLogoRegex = /(logo:\s*"[^"]*")\s*,\s*logo:\s*"[^"]*"/g;
        const fixedContent1 = content.replace(duplicateLogoRegex, '$1');
        console.log('重复logo字段已删除');
        
        // 2. 规范化护肤品分类的logo路径
        const skincareCategory = '"护肤品": [';
        const skincareCategoryIndex = fixedContent1.indexOf(skincareCategory);
        
        if (skincareCategoryIndex !== -1) {
            console.log('开始规范化护肤品分类的logo路径...');
            
            // 定义品牌名称到英文名称的映射
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
            
            let fixedContent2 = fixedContent1;
            
            // 遍历所有品牌，更新logo路径
            Object.keys(brandMap).forEach(brandName => {
                const brandEng = brandMap[brandName];
                const newLogoPath = `logos/skincare/${brandEng}.png`;
                
                // 创建替换正则表达式
                const brandLogoRegex = new RegExp(`name:\s*"${brandName}"[^}]*logo:\s*"[^"]*"`);
                
                // 查找并替换
                fixedContent2 = fixedContent2.replace(brandLogoRegex, match => {
                    return match.replace(/logo:\s*"[^"]*"/, `logo: "${newLogoPath}"`);
                });
                
                console.log(`已更新品牌: ${brandName} -> ${newLogoPath}`);
            });
            
            // 3. 确保window对象引用正确
            let finalContent = fixedContent2;
            if (finalContent.includes('window.brandData') && !finalContent.includes('window.brandData = brandData;')) {
                finalContent += '\nwindow.brandData = brandData;';
                console.log('已添加window.brandData引用');
            }
            
            // 写回文件
            fs.writeFileSync(filePath, finalContent, 'utf8');
            console.log('所有修复完成！brandData.js文件已成功更新。');
        } else {
            console.log('未找到护肤品分类，跳过路径规范化');
        }
    } catch (error) {
        console.error('修复过程中出错:', error.message);
        console.error(error.stack);
    }
}

simpleFix();