// 为第六批15个品牌添加核心优势
const fs = require('fs');

// 读取brandData.js和需要添加优势的品牌列表
const brandDataPath = './brandData.js';
const brandsToUpdatePath = './sixthBatchBrandsToAddAdvantages.json';

// 读取文件内容
const brandDataContent = fs.readFileSync(brandDataPath, 'utf8');
const brandsToUpdateData = JSON.parse(fs.readFileSync(brandsToUpdatePath, 'utf8'));

// 定义第六批品牌的核心优势（15字左右，3条）
const brandAdvantagesMap = {
  '莲花酱油': [
    '莲花旗下产品，纯粮酿造零添加',
    '配料干净，性价比极高',
    '国民老牌，值得消费者信赖'
  ],
  '欣和': [
    '六月鲜轻系列，健康减盐',
    '坚持零添加，降低钠含量',
    '现代家庭健康调味首选'
  ],
  '恒顺': [
    '四大名醋之首，国家级非遗',
    '糯米原料，传统工艺酿造',
    '酸而不涩，香而微甜'
  ],
  '水塔': [
    '北方陈醋标杆，纯粮酿造',
    '自动化与传统工艺结合',
    '零添加，性价比显著'
  ],
  '鲁花': [
    '知名粮油企业，品质保障',
    '黑糯米醋，配料干净',
    '零添加，健康值得信赖'
  ],
  '老恒河': [
    '中华老字号，专注黄酒料酒',
    '传统工艺，去腥提鲜显著',
    '厨房常备调味佳品'
  ],
  '沙井蚝油': [
    '深圳特产，千年蚝乡品牌',
    '蚝汁含量高，品质上乘',
    '高品质蚝油代表'
  ],
  '珠江桥头牌': [
    '中华老字号，远销国内外',
    '严选新鲜生蚝，浓缩蚝汁',
    '蚝香浓郁，零添加系列'
  ],
  '崔字牌': [
    '中华老字号，传承600余年',
    '水代法石磨工艺，纯芝麻',
    '香气醇厚，香油佼佼者'
  ],
  '鹃城牌': [
    '中华老字号，川菜之魂',
    '非遗郫县豆瓣制作技艺',
    '特级豆瓣，晒足1095天'
  ],
  '绍丰和': [
    '豆瓣鼻祖，始于1666年',
    '传统翻晒露工序，一年周期',
    '郫县豆瓣中的精品'
  ],
  '丹丹': [
    '四川本土知名豆瓣酱品牌',
    '传统与现代技术结合发酵',
    '中国绿色食品认证'
  ],
  '鲁花': [
    '国货之光，5S物理压榨工艺',
    '全程无化学溶剂，花生香浓郁',
    '高端食用油领导品牌'
  ],
  '金龙鱼': [
    '国民品牌，产品种类丰富',
    '零反式脂肪酸，健康烹饪',
    '精准控温精炼技术'
  ],
  '多力': [
    '充氮保鲜技术领先',
    '减缓氧化，保持新鲜好味',
    '适用性强，健身族首选'
  ]
};

// 用于跟踪成功添加优势的品牌数量
let successCount = 0;

// 处理每个需要更新的品牌
brandsToUpdateData.forEach(item => {
  const brandName = item.brand.name;
  const advantages = brandAdvantagesMap[brandName];
  
  if (advantages) {
    // 构建要添加的优势字符串
    const advantagesStr = `"advantages": ["${advantages.join('", "')}"]`;
    
    // 创建正则表达式来匹配品牌位置
    const brandRegex = new RegExp(`"${brandName}"(.*?)\}`, 's');
    
    // 在品牌对象中添加advantages字段
    const updatedContent = brandDataContent.replace(brandRegex, (match) => {
      // 如果品牌已经有advantages字段，不做处理
      if (match.includes('"advantages"')) {
        return match;
      }
      
      // 在品牌对象的最后添加advantages字段
      return match.replace('\}', `, ${advantagesStr}\}`);
    });
    
    // 保存更新后的内容
    fs.writeFileSync(brandDataPath, updatedContent, 'utf8');
    
    console.log(`已成功为品牌 "${brandName}" 添加核心优势！`);
    successCount++;
  } else {
    console.log(`未找到品牌 "${brandName}" 的核心优势定义！`);
  }
});

console.log(`\n---\n更新完成！共成功为 ${successCount} 个品牌添加了核心优势。`);