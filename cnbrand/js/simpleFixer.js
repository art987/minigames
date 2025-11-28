const fs = require('fs');
const path = require('path');

// 品牌中文名到英文名的映射
const brandNameMap = {
    "郁美净": "yumeijing",
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

// 1. 修复重复的logo字段（更简单的方法）
console.log('开始修复重复的logo字段...');
// 对于每个品牌，分别处理
for (const brandName of Object.keys(brandNameMap)) {
    // 匹配重复logo的模式
    const duplicatePattern = new RegExp(`(name: "${brandName}",\s*logo: "[^"]+")\s*,\s*logo: "[^"]+"`, 'g');
    const matches = content.match(duplicatePattern);
    if (matches) {
        console.log(`找到 ${brandName} 的重复logo字段，进行修复...`);
        content = content.replace(duplicatePattern, '$1');
    }
}
console.log('重复logo字段修复完成！');

// 2. 规范化所有品牌的logo路径
console.log('开始规范化logo路径...');
for (const [chineseName, englishName] of Object.entries(brandNameMap)) {
    // 使用更简单的字符串替换，避免复杂正则
    const oldPath = `logo: "images/skincare/logos/${chineseName}.png"`;
    const newPath = `logo: "logos/skincare/${englishName}.png"`;
    
    if (content.includes(oldPath)) {
        content = content.split(oldPath).join(newPath);
        console.log(`已更新 ${chineseName} 的路径为 logos/skincare/${englishName}.png`);
    }
}

// 3. 确保window对象引用正确
console.log('修复window对象引用...');
if (!content.includes('window.brandData = brandData;')) {
    content += '\n\n// 导出数据到全局window对象\nwindow.brandData = brandData;';
    console.log('已添加window对象引用');
}

// 保存修复后的文件
console.log('保存修复后的文件...');
try {
    fs.writeFileSync(brandDataPath, content, 'utf8');
    console.log('修复完成！brandData.js文件已成功更新。');
} catch (err) {
    console.error('保存文件失败:', err.message);
    process.exit(1);
}