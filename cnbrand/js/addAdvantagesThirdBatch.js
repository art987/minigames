// 为第三批15个品牌添加符合15字左右要求的核心优势
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

// 读取第三批要处理的品牌
const thirdBatchPath = path.join(__dirname, 'thirdBatchBrandsToAddAdvantages.json');
const thirdBatchBrands = JSON.parse(fs.readFileSync(thirdBatchPath, 'utf8'));

// 为每个品牌添加核心优势（15字左右）
const brandAdvantagesMap = {
    '可复美': [
        '医美级护理，温和安全',
        '术后护理适用，敏感肌友好',
        '轻盈质地，不挑肤质'
    ],
    '薇诺娜': [
        '敏感肌专用，温和不刺激',
        '高倍防晒，清透不油腻',
        '医学配方，安全可靠'
    ],
    '谢馥春': [
        '中华老字号，传统工艺',
        '天然成分，温和不刺激',
        '经典胭脂水粉，持久不脱妆'
    ],
    '戴春林': [
        '始于1628年，历史悠久',
        '传承古法，天然草本',
        '粉质细腻，遮瑕提亮'
    ],
    '卡姿兰': [
        '彩妆效果好，色彩饱满',
        '价格适中，性价比高',
        '年轻消费者喜爱的品牌'
    ],
    '玛丽黛佳': [
        '设计时尚，外观精美',
        '彩妆效果好，持久度高',
        '适合年轻时尚人群'
    ],
    '火烈鸟': [
        '睫毛膏效果好，浓密纤长',
        '价格实惠，性价比超高',
        '消费者口碑良好'
    ],
    '俏美人': [
        '彩妆效果好，色彩鲜艳',
        '价格适中，适合学生党',
        '年轻消费者青睐品牌'
    ],
    '诗佩妮': [
        '彩妆效果出色，粉质细腻',
        '性价比高，适合新手',
        '年轻消费者喜爱'
    ],
    'foreverkey': [
        '设计时尚，包装精美',
        '彩妆效果好，持久度高',
        '新锐品牌，口碑良好'
    ],
    '月里嫦娥': [
        '宫廷秘方，传统工艺',
        '天然草本，温和不刺激',
        '深层清洁，不紧绷'
    ],
    '精心': [
        '北京协和医院研制',
        '医学配方，安全可靠',
        '温和不刺激，适合敏感肌'
    ],
    '至本': [
        '敏感肌专用，成分安全',
        '温和卸妆，不刺激皮肤',
        '专注修复，配方温和'
    ],
    '郁美净': [
        '婴幼儿专用，温和安全',
        '预防湿疹，滋润保湿',
        '家长信赖的老品牌'
    ]
};

// 更新品牌数据
let updatedCount = 0;
thirdBatchBrands.forEach(({ mainCategory, subCategory, brand }) => {
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