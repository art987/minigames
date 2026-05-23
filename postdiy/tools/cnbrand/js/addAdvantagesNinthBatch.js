// 为第九批次（第121-135个）没有核心优势的品牌添加核心优势
const fs = require('fs');
const path = require('path');

// 定义品牌优势映射表
const brandAdvantagesMap = {
  "思念食品": [
    "国内大型速冻食品企业，品控稳定",
    "汤圆水饺等产品多样，口感丰富",
    "消费者喜爱，市场占有率高"
  ],
  "安井食品": [
    "火锅料领域专家，品控体系完善",
    "撒尿牛丸等经典产品，口感Q弹",
    "行业领导品牌，值得信赖"
  ],
  "海欣食品": [
    "福州百年老字号，鱼糜制品专家",
    "蟹肉棒虾滑等产品，鲜美可口",
    "传统工艺，品质稳定"
  ],
  "千味央厨": [
    "餐饮专业解决方案提供商",
    "小油条发糕等产品，口感地道",
    "品控严格，安全可靠"
  ],
  "亿堡坚果零食": [
    "0添加剂理念，健康零食首选",
    "多种坚果混合，营养均衡丰富",
    "原味烘焙，保留天然清香"
  ],
  "劲仔食品": [
    "创新三零工艺，无添加更健康",
    "深海小鱼干等产品，麻辣鲜香",
    "年轻消费者喜爱的休闲零食"
  ],
  "良品铺子": [
    "自然健康新零食品牌主张",
    "产品丰富多样，满足不同需求",
    "品质可靠，口碑良好"
  ],
  "金晔食品": [
    "无添加零食王国，配料表干净",
    "山楂条地瓜干等传统零食",
    "保留食材原味，健康美味"
  ],
  "首农小王子": [
    "国企背景，品质有保障",
    "配料干净，无多余添加剂",
    "价格亲民，性价比高"
  ],
  "百年双星": [
    "青岛知名运动品牌，历史悠久",
    "产品种类丰富，满足运动需求",
    "品质可靠，消费者信赖"
  ],
  "回力": [
    "上海经典运动鞋品牌，时尚复古",
    "帆布鞋舒适耐穿，价格亲民",
    "年轻人喜爱的潮流鞋款"
  ],
  "飞跃": [
    "上海经典帆布鞋品牌，历史悠久",
    "舒适耐穿，复古时尚",
    "国际知名的国货潮牌"
  ],
  "三枪": [
    "上海知名内衣品牌，品质优良",
    "内衣舒适透气，穿着体验好",
    "老品牌值得信赖，口碑良好"
  ],
  "多威": [
    "江苏专业跑鞋品牌，性能优良",
    "舒适耐穿，适合专业跑步",
    "运动员和跑步爱好者首选"
  ],
  "人本": [
    "浙江知名鞋类品牌，做工精细",
    "帆布鞋舒适耐穿，款式多样",
    "价格亲民，性价比高"
  ]
};

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
let brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 读取待更新品牌文件
const brandsToUpdatePath = path.join(__dirname, 'ninthBatchBrandsToAddAdvantages.json');
const brandsToUpdateData = JSON.parse(fs.readFileSync(brandsToUpdatePath, 'utf8'));

// 为每个品牌添加核心优势
brandsToUpdateData.forEach(item => {
  const brandName = item.brand.name;
  const advantages = brandAdvantagesMap[brandName];
  
  if (advantages) {
    // 构建要添加的advantages字段字符串
    const advantagesString = `,"advantages":["${advantages.join('","')}"]`;
    
    // 使用正则表达式在品牌对象中添加advantages字段
    const regex = new RegExp(`"name":"${brandName}".*?(?=\},|\}\])`, 's');
    brandDataContent = brandDataContent.replace(regex, match => {
      // 检查是否已经有advantages字段
      if (match.includes('"advantages":')) {
        console.log(`品牌 ${brandName} 已经有核心优势，跳过`);
        return match;
      }
      return match + advantagesString;
    });
    
    console.log(`已为品牌 ${brandName} 添加核心优势`);
  } else {
    console.log(`未找到品牌 ${brandName} 的优势定义`);
  }
});

// 保存更新后的品牌数据
fs.writeFileSync(brandDataPath, brandDataContent, 'utf8');

console.log('\n第九批次品牌核心优势添加完成！');
console.log(`共处理 ${brandsToUpdateData.length} 个品牌`);