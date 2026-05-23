// 第五批品牌核心优势添加脚本
const fs = require('fs');
const path = require('path');

// 读取需要添加核心优势的品牌数据
const brandsToUpdatePath = path.join(__dirname, 'fifthBatchBrandsToAddAdvantages.json');
const brandsToUpdate = JSON.parse(fs.readFileSync(brandsToUpdatePath, 'utf8'));

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
let brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 为每个品牌添加核心优势
const brandAdvantagesMap = {
  '君乐宝': [
    '河北名牌，酸奶口感佳，消费者喜爱',
    '产品线丰富，性价比高，满足多元需求',
    '专注乳业20余年，品质值得信赖'
  ],
  '汇源': [
    '果汁浓度高，口感纯正，营养丰富',
    '全国知名果汁品牌，市场占有率高',
    '100%纯果汁，无添加，健康选择'
  ],
  '娃哈哈': [
    '产品种类丰富，覆盖各年龄段需求',
    '营养快线、AD钙奶等经典产品受欢迎',
    '价格亲民，品质稳定，消费者信赖'
  ],
  '椰树': [
    '海南特色椰汁，口感醇厚，椰香浓郁',
    '60余年历史，品质保证，经典品牌',
    '果肉椰汁，口感更佳，营养丰富'
  ],
  '冰泉': [
    '广西梧州特产，豆浆晶历史悠久',
    '纯黄豆制作，无添加，营养健康',
    '速溶便捷，适合早餐和日常饮用'
  ],
  '津威': [
    '广东特色乳酸菌饮品，口感酸甜',
    '富含益生菌，有助于肠道健康',
    '儿童和家庭喜爱的健康饮品'
  ],
  '天府可乐': [
    '重庆老品牌，中药配方，口感独特',
    '零糖零脂，健康碳酸饮料选择',
    '怀旧经典，消费者情怀之选'
  ],
  '崂山可乐': [
    '山东特产，中药配方，口感醇厚',
    '经典包装，怀旧味道，历史悠久',
    '健康碳酸饮料，适合大众消费'
  ],
  '豆本豆': [
    '植物蛋白饮品，适合素食者和健康人群',
    '有机认证，品质保证，营养丰富',
    '口感顺滑，多种口味，满足需求'
  ],
  '王守义十三香': [
    '中华老字号，经典香料组合',
    '香气浓郁，是中式烹饪必备调料',
    '十三种香料精华，口感层次丰富'
  ],
  '老干妈': [
    '国民级辣酱品牌，风味独特',
    '豆豉油辣椒，经典口味，性价比高',
    '下饭炒菜绝佳伴侣，消费者喜爱'
  ],
  '莲花味精': [
    '国民老牌，纯粮酿造，无添加',
    '99%高纯度，极致性价比',
    '成分简单纯粹，消费者信赖'
  ],
  '松鲜鲜': [
    '健康调味料，天然食材，零添加',
    '减钠29%，适合健康人士',
    '松茸等天然原料，营养丰富'
  ],
  '天调本味': [
    '高科技营养调味品，零添加',
    '国家火炬计划技术，品质保证',
    '天然肉类海鲜提取物，高端选择'
  ],
  '千禾': [
    '零添加酱油知名品牌，市场领先',
    '380天酿造周期，酱香醇厚',
    '产品线丰富，性价比突出'
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

console.log('第五批所有品牌的核心优势已添加完成');