// 为下一批15个品牌添加符合15字左右要求的核心优势
const fs = require('fs');
const path = require('path');

// 读取品牌数据
const brandDataPath = path.join(__dirname, 'brandData.js');
let brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 提取brandData对象
const brandDataMatch = brandDataContent.match(/const brandData = (\{[\s\S]*\});/);
if (!brandDataMatch) {
    console.error('未能找到brandData对象');
    process.exit(1);
}

let brandData = JSON.parse(brandDataMatch[1]);

// 读取下一批要处理的品牌
const nextBatchPath = path.join(__dirname, 'nextBrandsToAddAdvantages.json');
const nextBatchBrands = JSON.parse(fs.readFileSync(nextBatchPath, 'utf8'));

// 为每个品牌添加核心优势（15字左右）
const brandAdvantagesMap = {
    '得伴Depend': [
        '美国进口技术，超强吸收',
        '透气外层，减少闷热感',
        '360°弹性腰带，贴身舒适'
    ],
    'TENA添宁': [
        '欧洲进口品质，瞬吸锁水',
        '超长吸收层，夜间干爽',
        '德国工艺，安全可靠'
    ],
    'lifree乐互宜': [
        '日本技术，超薄设计',
        '瞬吸防漏，透气底层',
        '弹性腰围，舒适便捷'
    ],
    '爱恩倍': [
        '超薄透气，性价比超高',
        '易穿脱设计，活动自如',
        '超大容量，经济实惠'
    ],
    '妇炎洁': [
        '经典护理液，温和配方',
        '深层清洁，抑菌止痒',
        '独立包装，便携卫生'
    ],
    '千芝雅': [
        '瞬吸干爽，透气底膜',
        '立体防漏，安全可靠',
        '弹性腰围，舒适贴身'
    ],
    '珍琦SUNKISS': [
        '超强吸收，舒适透气',
        '360°弹性腰围，活动自如',
        '价格适中，性价比高'
    ],
    '白十字': [
        '上海老牌品质，瞬吸干爽',
        '加厚设计，安全可靠',
        '舒适贴身，适合长期护理'
    ],
    '孔凤春': [
        '百年老字号，温和不刺激',
        '珍珠粉配方，提亮肤色',
        '深层清洁，舒缓保湿'
    ],
    '至本': [
        '氨基酸表活，温和清洁',
        '修护屏障，适合敏感肌',
        '科学配方，成分安全'
    ],
    '上海硫磺皂': [
        '经典配方，含硫磺成分',
        '深层清洁，控油祛痘',
        '价格实惠，口碑相传'
    ],
    '郁美净': [
        '老品牌，品质可靠',
        '鲜奶成分，深层补水',
        '温和滋润，适合全家使用'
    ],
    '相宜本草': [
        '本草养肤，温和不刺激',
        '蚕丝蛋白，深层保湿',
        '中医理论，现代科技结合'
    ],
    '精心': [
        '北京协和医院研发',
        '医用级配方，强效锁水',
        '舒缓敏感，修护肌肤'
    ]
};

// 更新品牌数据
let updatedCount = 0;
nextBatchBrands.forEach(({ mainCategory, subCategory, brand }) => {
    const brandName = brand.name;
    if (brandAdvantagesMap[brandName]) {
        // 查找并更新品牌
        const category = brandData[mainCategory];
        if (category && category[subCategory]) {
            const brands = category[subCategory];
            const brandIndex = brands.findIndex(b => b.name === brandName);
            if (brandIndex !== -1) {
                // 添加核心优势
                brands[brandIndex].advantages = brandAdvantagesMap[brandName];
                updatedCount++;
                console.log(`已为品牌 ${brandName} 添加核心优势`);
            }
        }
    }
});

// 更新brandData.js文件
const updatedBrandDataContent = `const brandData = ${JSON.stringify(brandData, null, 2)};
${brandDataContent.replace(/const brandData = (\{[\s\S]*\});/, '')}`;

fs.writeFileSync(brandDataPath, updatedBrandDataContent, 'utf8');

console.log(`\n处理完成！共为 ${updatedCount} 个品牌添加了核心优势。`);
console.log('brandData.js 文件已更新。');