const fs = require('fs');
const path = require('path');

// 定义路径映射
const categoryMap = {
    '护肤品': 'skincare'
};

// 品牌名称到英文名称的映射
const brandNameMap = {
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
        let fileContent = fs.readFileSync(filePath, 'utf8');
        
        console.log('开始处理重复的logo字段...');
        // 删除重复的logo字段，保留第一个
        fileContent = fileContent.replace(/logo: "[^\"]*",\s*logo: "[^\"]*",/g, (match) => {
            const firstLogo = match.match(/logo: "([^"]*)"/)[0];
            return firstLogo + ', ';
        });
        
        console.log('开始规范化logo路径...');
        // 规范化护肤品分类下的品牌logo路径
        const skincareSectionRegex = /"护肤品":\s*\[([\s\S]*?)\]/;
        let skincareSection = fileContent.match(skincareSectionRegex);
        
        if (skincareSection && skincareSection[1]) {
            let updatedSkincareSection = skincareSection[1];
            
            // 处理每个品牌
            for (const [brandName, brandEnglishName] of Object.entries(brandNameMap)) {
                const brandRegex = new RegExp(`{name: "${brandName}",\s*logo: "[^\"]*"`, 'g');
                updatedSkincareSection = updatedSkincareSection.replace(brandRegex, (match) => {
                    return `{name: "${brandName}", logo: "logos/skincare/${brandEnglishName}.png"`;
                });
            }
            
            // 将更新后的护肤品部分替换回原文件
            fileContent = fileContent.replace(skincareSectionRegex, `"护肤品": [${updatedSkincareSection}]`);
            console.log('护肤品分类的logo路径已更新');
        } else {
            console.log('未找到护肤品分类部分');
        }
        
        // 修复可能的window对象引用
        console.log('修复window对象引用...');
        fileContent = fileContent.replace(/window\./g, '');
        
        // 写入修复后的内容
        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log('修复完成！brandData.js文件已成功更新。');
        
    } catch (error) {
        console.error('修复过程中出现错误:', error.message);
    }
}

main();