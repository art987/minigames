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

// 1. 修复重复的logo字段 - 使用最基本的字符串替换
console.log('开始修复重复的logo字段...');
const brandsToFix = [
    "百雀羚", "相宜本草", "丁家宜", "佰草集", "韩束", "双妹", 
    "美加净", "欧诗漫", "采诗", "珀莱雅", "水密码", "润本", 
    "启初", "薇诺娜", "高姿", "健美创研", "馥珮", "京润", 
    "御泥坊", "大水滴", "花瑶花", "美肤宝", "法兰琳卡", "林清轩", 
    "永芳", "衡美肤", "月里嫦娥", "七日香", "春娟", "雅霜", 
    "迷奇", "兰亭", "万紫千红", "京卫本草", "宫灯", "森宝", 
    "西施美", "标婷", "孔凤春", "戴春林", "片仔癀", "隆力奇", 
    "东洋之花", "青蛙王子", "孩儿面", "红色小象"
];

// 移除重复的logo字段
for (const brand of brandsToFix) {
    const oldStr = `logo: "images/skincare/logos/${brand}.png", logo: "images/skincare/logos/${brand}.png"`;
    const newStr = `logo: "images/skincare/logos/${brand}.png"`;
    
    if (content.includes(oldStr)) {
        content = content.split(oldStr).join(newStr);
        console.log(`已修复 ${brand} 的重复logo字段`);
    }
}

// 2. 规范化所有品牌的logo路径 - 使用英文名称
console.log('开始规范化logo路径...');
const brandPaths = {
    "百雀羚": "logos/skincare/baiqueling.png",
    "相宜本草": "logos/skincare/xiangyibencao.png",
    "丁家宜": "logos/skincare/dingjiayi.png",
    "佰草集": "logos/skincare/herborist.png",
    "韩束": "logos/skincare/kanebao.png",
    "双妹": "logos/skincare/shuangmei.png",
    "美加净": "logos/skincare/maxam.png",
    "欧诗漫": "logos/skincare/osm.png",
    "采诗": "logos/skincare/caishi.png",
    "珀莱雅": "logos/skincare/proya.png",
    "水密码": "logos/skincare/wetcode.png",
    "润本": "logos/skincare/runben.png",
    "启初": "logos/skincare/giving.png",
    "薇诺娜": "logos/skincare/winona.png",
    "高姿": "logos/skincare/gogir.png",
    "健美创研": "logos/skincare/jianmeichuangyan.png",
    "馥珮": "logos/skincare/fupei.png",
    "京润": "logos/skincare/jingrun.png",
    "御泥坊": "logos/skincare/yunifang.png",
    "大水滴": "logos/skincare/bigdrop.png",
    "花瑶花": "logos/skincare/huayaohua.png",
    "美肤宝": "logos/skincare/meifubao.png",
    "法兰琳卡": "logos/skincare/franic.png",
    "林清轩": "logos/skincare/forestcabin.png",
    "永芳": "logos/skincare/yengfang.png",
    "衡美肤": "logos/skincare/hengmeifu.png",
    "月里嫦娥": "logos/skincare/yuelichange.png",
    "七日香": "logos/skincare/qirixiang.png",
    "春娟": "logos/skincare/chunjuan.png",
    "雅霜": "logos/skincare/yashuang.png",
    "迷奇": "logos/skincare/miqi.png",
    "兰亭": "logos/skincare/lanting.png",
    "万紫千红": "logos/skincare/wanziqianhong.png",
    "京卫本草": "logos/skincare/jingweibencao.png",
    "宫灯": "logos/skincare/gongdeng.png",
    "森宝": "logos/skincare/senbao.png",
    "西施美": "logos/skincare/xishimei.png",
    "标婷": "logos/skincare/biaoting.png",
    "孔凤春": "logos/skincare/kongfengchun.png",
    "戴春林": "logos/skincare/daichunlin.png",
    "片仔癀": "logos/skincare/pianzaihuang.png",
    "隆力奇": "logos/skincare/longrich.png",
    "东洋之花": "logos/skincare/toyoflower.png",
    "青蛙王子": "logos/skincare/frogprince.png",
    "孩儿面": "logos/skincare/haierface.png",
    "红色小象": "logos/skincare/redbaby.png"
};

for (const [brand, newPath] of Object.entries(brandPaths)) {
    const oldPathStr = `logo: "images/skincare/logos/${brand}.png"`;
    const newPathStr = `logo: "${newPath}"`;
    
    if (content.includes(oldPathStr)) {
        content = content.split(oldPathStr).join(newPathStr);
        console.log(`已更新 ${brand} 的路径为 ${newPath}`);
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