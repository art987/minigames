// 为品牌添加核心优势脚本
const fs = require('fs');
const path = require('path');

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
const content = fs.readFileSync(brandDataPath, 'utf8');

// 提取品牌数据
const dataMatch = content.match(/const brandData = (\{[\s\S]*?\});/);
if (!dataMatch) {
    console.error('未找到品牌数据');
    process.exit(1);
}

const brandData = eval(`(${dataMatch[1]})`);

// 品牌核心优势数据
const brandAdvantages = [
    {
        name: "蜂花",
        advantages: [
            "极致性价比，价格亲民，适合日常使用",
            "成分简单温和，无过多添加剂，适合敏感头皮",
            "经典配方，多年市场验证，效果稳定可靠",
            "大容量包装，经济实惠，性价比超高"
        ]
    },
    {
        name: "霸王",
        advantages: [
            "专业防脱发，中草药配方，温和无刺激",
            "深耕防脱领域多年，市场认知度高",
            "多种针对性产品，满足不同脱发需求",
            "性价比高，适合长期使用"
        ]
    },
    {
        name: "舒蕾",
        advantages: [
            "植物精华配方，滋养修护效果好",
            "价格适中，适合各类发质",
            "产品线丰富，满足不同洗护需求",
            "温和无刺激，适合日常使用"
        ]
    },
    {
        name: "白玉",
        advantages: [
            "极致性价比，价格亲民，适合家庭日常使用",
            "基础清洁效果好，满足日常口腔护理需求",
            "温和配方，适合敏感牙齿",
            "国货经典，多年市场验证"
        ]
    },
    {
        name: "冷酸灵",
        advantages: [
            "专业抗敏感，缓解牙齿敏感问题效果显著",
            "深耕抗敏领域多年，技术成熟",
            "多种针对性产品，满足不同口腔需求",
            "价格适中，性价比高"
        ]
    },
    {
        name: "两面针",
        advantages: [
            "中药护龈配方，有效缓解牙龈问题",
            "传统中医理念结合现代科技",
            "温和无刺激，适合长期使用",
            "性价比高，适合家庭日常使用"
        ]
    },
    {
        name: "活力28",
        advantages: [
            "极致性价比，价格亲民，适合大量洗涤",
            "基础清洁效果好，满足日常洗衣需求",
            "成分简单，无过多添加剂",
            "国货经典，多年市场验证"
        ]
    },
    {
        name: "白猫",
        advantages: [
            "高效去油，顽固污渍清洁效果好",
            "速溶配方，溶解快，易漂洗",
            "温和配方，对衣物损伤小",
            "国货经典，值得信赖"
        ]
    },
    {
        name: "奇强",
        advantages: [
            "除螨效果好，深层清洁衣物",
            "香氛持久，衣物清新宜人",
            "产品线丰富，满足不同洗涤需求",
            "性价比高，适合家庭日常使用"
        ]
    },
    {
        name: "立白",
        advantages: [
            "国民洗涤巨头，技术成熟，品质可靠",
            "产品线齐全，满足各类洗涤需求",
            "去污效果好，顽固污渍轻松去除",
            "温和配方，对衣物损伤小"
        ]
    },
    {
        name: "雕牌",
        advantages: [
            "除菌除螨效果好，深层清洁衣物",
            "香氛持久，衣物清新宜人",
            "性价比高，适合家庭日常使用",
            "纳爱斯集团品质保证"
        ]
    },
    {
        name: "绿伞",
        advantages: [
            "专业清洁，特殊污渍处理效果好",
            "衣物护理效果好，保持衣物柔软",
            "温和配方，对衣物损伤小",
            "专业品牌，值得信赖"
        ]
    },
    {
        name: "白猫洗洁精",
        originalName: "白猫",
        category: "洗洁精",
        advantages: [
            "去油效果好，顽固油污轻松去除",
            "食品级配方，安全无害",
            "温和不伤手，适合长期使用",
            "性价比高，适合家庭日常使用"
        ]
    },
    {
        name: "绿伞洗洁精",
        originalName: "绿伞",
        category: "洗洁精",
        advantages: [
            "强效去油，重油污清洁效果好",
            "食品级安全，使用放心",
            "温和配方，不伤手",
            "专业清洁品牌，品质保证"
        ]
    },
    {
        name: "奇强洗洁精",
        originalName: "奇强",
        category: "洗洁精",
        advantages: [
            "去污效果好，顽固油污轻松去除",
            "温和不伤手，适合长期使用",
            "性价比高，适合家庭日常使用",
            "国民洗护品牌，值得信赖"
        ]
    }
];

// 更新品牌数据
let updatedCount = 0;

for (const mainCategory in brandData) {
    for (const subCategory in brandData[mainCategory]) {
        const brands = brandData[mainCategory][subCategory];
        for (const brand of brands) {
            // 查找对应的核心优势
            const advantageData = brandAdvantages.find(item => {
                if (item.category && subCategory.includes(item.category)) {
                    return item.originalName === brand.name;
                }
                return item.name === brand.name && !item.category;
            });
            
            if (advantageData) {
                brand.advantages = advantageData.advantages;
                updatedCount++;
                console.log(`已为 ${brand.name} 添加核心优势`);
            }
        }
    }
}

console.log(`\n共更新了 ${updatedCount} 个品牌的核心优势`);

// 更新brandData.js文件
const updatedDataStr = JSON.stringify(brandData, null, 2);
const updatedContent = content.replace(
    /const brandData = (\{[\s\S]*?\});/, 
    `const brandData = ${updatedDataStr};`
);

fs.writeFileSync(brandDataPath, updatedContent, 'utf8');
console.log('\nbrandData.js 文件已更新');

// 更新全局变量
const globalVarMatch = content.match(/if \(typeof window !== "undefined"\) \{[\s\S]*?\}/);
if (!globalVarMatch) {
    // 如果没有全局变量定义，添加一个
    const finalContent = updatedContent + '\n\n// 全局暴露变量，供app.js使用\nif (typeof window !== "undefined") {\n    window.brandData = brandData;\n}';
    fs.writeFileSync(brandDataPath, finalContent, 'utf8');
    console.log('已添加全局变量定义');
}