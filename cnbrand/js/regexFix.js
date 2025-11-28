const fs = require('fs');
const path = require('path');

// 读取文件内容
const brandDataPath = path.join(__dirname, 'brandData.js');
let content;

try {
    content = fs.readFileSync(brandDataPath, 'utf8');
    console.log('文件读取成功！');
} catch (err) {
    console.error('读取文件失败:', err.message);
    process.exit(1);
}

// 保存原始内容长度用于验证
const originalLength = content.length;

// 1. 使用正则表达式移除重复的logo字段
console.log('开始移除重复的logo字段...');
// 匹配重复的logo字段模式："logo: 路径, logo: 相同路径"
const duplicateLogoRegex = /logo:\s*"([^"]+)"\s*,\s*logo:\s*"\1"/g;
let match;
let duplicateCount = 0;

while ((match = duplicateLogoRegex.exec(content)) !== null) {
    // 只保留第一个logo字段
    const replacement = `logo: "${match[1]}"`;
    content = content.replace(match[0], replacement);
    duplicateCount++;
    console.log(`已移除重复的logo字段: ${match[1]}`);
    // 重置正则表达式的lastIndex以继续查找
    duplicateLogoRegex.lastIndex = 0;
}

console.log(`总共移除了 ${duplicateCount} 个重复的logo字段`);

// 2. 规范化护肤品分类的logo路径
console.log('开始规范化护肤品分类的logo路径...');
const skincarePathRegex = /logo:\s*"images\/skincare\/logos\/(\S+)\.png"/g;
const brandEnglishNames = {
    "百雀羚": "baiqueling",
    "相宜本草": "xiangyibencao",
    "丁家宜": "dingjiayi",
    "佰草集": "herborist",
    "韩束": "kanebao",
    "双妹": "shuangmei",
    "美加净": "maxam",
    "欧诗漫": "osm",
    "采诗": "caishi",
    "珀莱雅": "proya",
    "水密码": "wetcode",
    "润本": "runben",
    "启初": "giving",
    "薇诺娜": "winona",
    "高姿": "gogir",
    "健美创研": "jianmeichuangyan",
    "馥珮": "fupei",
    "京润": "jingrun",
    "御泥坊": "yunifang",
    "大水滴": "bigdrop",
    "花瑶花": "huayaohua",
    "美肤宝": "meifubao",
    "法兰琳卡": "franic",
    "林清轩": "forestcabin",
    "永芳": "yengfang",
    "衡美肤": "hengmeifu",
    "月里嫦娥": "yuelichange",
    "七日香": "qirixiang",
    "春娟": "chunjuan",
    "雅霜": "yashuang",
    "迷奇": "miqi",
    "兰亭": "lanting",
    "万紫千红": "wanziqianhong",
    "京卫本草": "jingweibencao",
    "宫灯": "gongdeng",
    "森宝": "senbao",
    "西施美": "xishimei",
    "标婷": "biaoting",
    "孔凤春": "kongfengchun",
    "戴春林": "daichunlin",
    "片仔癀": "pianzaihuang",
    "隆力奇": "longrich",
    "东洋之花": "toyoflower",
    "青蛙王子": "frogprince",
    "孩儿面": "haierface",
    "红色小象": "redbaby"
};

let pathChangeCount = 0;

// 对每个品牌单独进行路径替换
for (const [brandName, englishName] of Object.entries(brandEnglishNames)) {
    const oldPath = `logo: "images/skincare/logos/${brandName}.png"`;
    const newPath = `logo: "logos/skincare/${englishName}.png"`;
    
    if (content.includes(oldPath)) {
        content = content.replace(new RegExp(oldPath, 'g'), newPath);
        pathChangeCount++;
        console.log(`已更新 ${brandName} 的路径`);
    }
}

console.log(`总共更新了 ${pathChangeCount} 个logo路径`);

// 3. 确保window对象引用正确
console.log('检查window对象引用...');
if (!content.includes('window.brandData = brandData;')) {
    content += '\n\n// 导出数据到全局window对象\nwindow.brandData = brandData;';
    console.log('已添加window对象引用');
}

// 验证是否有实际修改
const hasChanges = content.length !== originalLength || duplicateCount > 0 || pathChangeCount > 0;

// 保存文件
if (hasChanges) {
    try {
        fs.writeFileSync(brandDataPath, content, 'utf8');
        console.log('修复完成！brandData.js文件已成功更新。');
    } catch (err) {
        console.error('保存文件失败:', err.message);
    }
} else {
    console.log('未检测到需要修改的内容。');
}