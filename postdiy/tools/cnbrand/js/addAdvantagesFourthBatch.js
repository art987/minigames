const fs = require('fs');
const path = require('path');

// 读取需要添加核心优势的品牌数据
const brandsToUpdatePath = path.join(__dirname, 'fourthBatchBrandsToAddAdvantages.json');
const brandsToUpdate = JSON.parse(fs.readFileSync(brandsToUpdatePath, 'utf8'));

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
let brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 为每个品牌添加核心优势
const brandAdvantagesMap = {
    "晨光": [
        "广东老字号，品质稳定可靠",
        "新鲜度高，口感纯正自然",
        "本地奶源，新鲜配送及时"
    ],
    "完达山": [
        "东北黑土地奶源，营养丰富",
        "60年品质传承，值得信赖",
        "天然牧场，奶源优质安全"
    ],
    "三元": [
        "北京老字号，国企品质保障",
        "欧盟标准，安全放心",
        "产品线齐全，满足多样需求"
    ],
    "光明": [
        "上海老字号，口碑优良",
        "低温冷链，新鲜直达",
        "科研实力强，技术领先"
    ],
    "新希望": [
        "西南地区领军品牌",
        "全产业链控制，安全可靠",
        "创新产品多，满足不同需求"
    ],
    "妙士": [
        "酸奶专家，口感醇厚浓郁",
        "河北名牌，品质保证",
        "益生菌丰富，有益肠道健康"
    ],
    "伊利": [
        "全国知名品牌，市场领先",
        "产品线全面，覆盖各年龄段",
        "严格质量控制，安全放心"
    ],
    "蒙牛": [
        "乳业巨头，品质卓越",
        "创新能力强，产品丰富",
        "草原奶源，天然纯净"
    ],
    "旺仔": [
        "儿童奶知名品牌，口感好",
        "卡通形象深入人心",
        "营养丰富，助力儿童成长"
    ],
    "天友": [
        "重庆老字号，历史悠久",
        "本地奶源，新鲜度高",
        "消费者信赖，口碑良好"
    ],
    "银桥": [
        "陕西名牌，品质过硬",
        "奶源优质，口感纯正",
        "性价比高，经济实惠"
    ],
    "香满楼": [
        "广东知名品牌，信誉好",
        "新鲜牛奶，口感香浓",
        "本地企业，服务贴心"
    ],
    "李子园": [
        "甜牛奶专家，口感独特",
        "浙江名牌，品质保证",
        "包装精美，携带方便"
    ],
    "夏进": [
        "宁夏名牌，奶源纯净",
        "沙漠绿洲奶源，营养丰富",
        "品质稳定，消费者喜爱"
    ],
    "海河": [
        "天津老字号，历史悠久",
        "本地奶源，新鲜配送",
        "价格亲民，性价比高"
    ]
};

// 更新品牌数据
brandsToUpdate.forEach(item => {
    const { mainCategory, subCategory, brand } = item;
    const { name } = brand;
    
    if (brandAdvantagesMap[name]) {
        // 查找品牌在原始数据中的位置
        const brandRegex = new RegExp(`("name":\s*"${name}".*?)(?=\},?\s*\{"name"|\}\s*\]|$)`, 's');
        
        brandDataContent = brandDataContent.replace(brandRegex, (match) => {
            // 如果已经有advantages字段，则跳过
            if (match.includes('"advantages":')) {
                return match;
            }
            
            // 在适当的位置添加advantages字段
            const advantages = brandAdvantagesMap[name];
            return match.replace(/("reputation":\s*"[^"]*"\s*)(,?)/, `$1,\n        "advantages": [\n            "${advantages.join('"\n            "')}\n        ]$2`);
        });
        
        console.log(`已为品牌 ${name} 添加核心优势`);
    } else {
        console.log(`未找到品牌 ${name} 的核心优势配置`);
    }
});

// 保存更新后的品牌数据
fs.writeFileSync(brandDataPath, brandDataContent, 'utf8');

console.log('所有品牌的核心优势已添加完成');