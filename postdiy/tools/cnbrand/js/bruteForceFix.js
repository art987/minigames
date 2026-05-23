const fs = require('fs');
const path = require('path');

// 品牌名称到英文名称的映射
const brandMap = {
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
    '青蛙王子': 'qingwawangzi',
    '孩儿面': 'haiermian',
    '红色小象': 'hongsexiaoxiang'
};

function main() {
    try {
        const filePath = path.join(__dirname, 'brandData.js');
        console.log(`正在读取文件: ${filePath}`);
        
        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log('开始删除重复的logo字段...');
        // 先删除重复的logo字段
        for (const brandName of Object.keys(brandMap)) {
            const oldPattern = `{name: "${brandName}",\s*logo: "[^"]*",\s*logo: "[^"]*",`;
            const regex = new RegExp(oldPattern, 'g');
            content = content.replace(regex, `{name: "${brandName}", logo: "logos/skincare/${brandMap[brandName]}.png", `);
        }
        
        console.log('开始规范化logo路径...');
        // 规范化所有品牌的logo路径
        for (const [brandName, brandEnglishName] of Object.entries(brandMap)) {
            const oldPathPattern1 = `{name: "${brandName}",\s*logo: "images/skincare/logos/${brandName}\.png"`;
            const oldPathPattern2 = `{name: "${brandName}",\s*logo: "logos/skincare/${brandName}\.png"`;
            const newPattern = `{name: "${brandName}", logo: "logos/skincare/${brandEnglishName}.png"`;
            
            const regex1 = new RegExp(oldPathPattern1, 'g');
            const regex2 = new RegExp(oldPathPattern2, 'g');
            
            content = content.replace(regex1, newPattern);
            content = content.replace(regex2, newPattern);
        }
        
        console.log('修复window对象引用...');
        content = content.replace(/window\./g, '');
        
        // 写入修复后的内容
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('所有修复完成！brandData.js文件已成功更新。');
        
    } catch (error) {
        console.error('修复过程中出现错误:', error.message);
    }
}

main();