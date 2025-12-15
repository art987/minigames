// 为第七批15个品牌添加核心优势
const fs = require('fs');

// 读取brandData.js和需要添加优势的品牌列表
const brandDataPath = './brandData.js';
const brandsToUpdatePath = './seventhBatchBrandsToAddAdvantages.json';

// 读取文件内容
const brandDataContent = fs.readFileSync(brandDataPath, 'utf8');
const brandsToUpdateData = JSON.parse(fs.readFileSync(brandsToUpdatePath, 'utf8'));

// 定义第七批品牌的核心优势（15字左右，3条）
const brandAdvantagesMap = {
  '臻鲜': [
    '2025火锅底料黑马，零添加',
    '低温慢熬技术，保留食材本味',
    '健康火锅底料代表品牌'
  ],
  '海琦王': [
    '主打零添加，原料安全健康',
    '非转基因大豆油，无防腐剂',
    '家庭火锅必备之选'
  ],
  '小龙坎': [
    '知名火锅连锁，发酵工艺独特',
    '深度发酵4000小时，无化学添加',
    '辣而不燥，醇厚回甘'
  ],
  '白象': [
    '国货之光，民族企业典范',
    '口碑极好，价格亲民实惠',
    '多种口味满足不同需求'
  ],
  '五谷道场': [
    '中粮旗下，非油炸健康理念',
    '品控稳定，营养均衡',
    '低脂肪，健康方便食品'
  ],
  '泰奇八宝粥': [
    '广东老品牌，品控严格稳定',
    '价格实惠，方便即食',
    '多种口味，营养丰富'
  ],
  '华丰三鲜伊面': [
    '经典怀旧国货，品质可靠',
    '价格实惠，方便快捷',
    '无负面新闻，消费者信赖'
  ],
  '今麦郎': [
    '完全脱离外资背景',
    '产品线丰富，性价比高',
    '大份量满足，价格实惠'
  ],
  '嘉顿': [
    '香港民族企业，品控严格',
    '口碑极佳，历史悠久',
    '多种糕点零食，全家喜爱'
  ],
  '冠生园': [
    '上海老字号，大白兔母公司',
    '基础产品线值得信赖',
    '传统工艺，经典口味'
  ],
  '盼盼': [
    '国民度高，品控稳定',
    '性价比高，产品多样',
    '松软可口，早餐必备'
  ],
  '九度七': [
    '新兴国货，主打低糖中式糕点',
    '健康理念，口碑较好',
    '口感丰富，美味健康'
  ],
  '运康锅巴': [
    '山西品牌，原切工艺',
    '配料相对简单，健康放心',
    '米香浓郁，脆度适中'
  ],
  '噜咪啦薯片': [
    '云南品牌，原切薯片',
    '香精味不重，天然健康',
    '口感酥脆，追剧必备'
  ],
  '子弟薯片': [
    '云南品牌，口味更天然',
    '天然香料，健康美味',
    '口感松脆，聚会分享佳品'
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