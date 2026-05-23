// 为第八批次（第106-120个）没有核心优势的品牌添加核心优势
const fs = require('fs');
const path = require('path');

// 定义品牌优势映射表
const brandAdvantagesMap = {
  "香鸽瓜子": [
    "安徽炒货知名品牌，颗粒饱满香脆",
    "传统炒制工艺，保留原味营养",
    "无添加剂，品质安全有保障"
  ],
  "渝兄怪味豆": [
    "重庆特色炒货，麻辣鲜香独特",
    "怪味胡豆经典产品，口碑相传",
    "原料精选，炒制工艺精湛"
  ],
  "美好": [
    "新希望旗下品牌，品控严格可靠",
    "肉质细腻Q弹，口感丰富多样",
    "产品线齐全，满足不同需求"
  ],
  "育青": [
    "北京老字号，传统工艺制作",
    "肉质含量高，口感扎实耐嚼",
    "健康零食首选，低脂高蛋白"
  ],
  "秋林": [
    "哈尔滨百年老字号，红肠工艺传统",
    "烟熏蒜香风味，独具地方特色",
    "选料考究，制作工艺精湛"
  ],
  "三丰午餐肉": [
    "上海梅林旗下，品质稳定可靠",
    "含肉量高，口感细腻不腻",
    "百年工艺传承，值得信赖"
  ],
  "太丰肉干": [
    "浙江地方特色品牌，历史悠久",
    "肉质紧实，原味自然鲜香",
    "品控稳定，消费者喜爱"
  ],
  "天一角肉干": [
    "温州特色品牌，传统工艺制作",
    "五香味浓，耐嚼有嚼劲",
    "包装精美，送礼佳品"
  ],
  "追肉记": [
    "0添加健康零食，不含淀粉防腐剂",
    "纯猪肉制作，肉质紧实有弹性",
    "性价比极高，消费者好评如潮"
  ],
  "本味鲜物": [
    "不添加淀粉，全猪肉制作",
    "火山石烤肠，烧烤风味浓郁",
    "高端品质，口感紧实有嚼劲"
  ],
  "锋味派": [
    "谢霆锋创立，品质有保障",
    "黑猪肉含量高，口感纯正",
    "高端定位，送礼自用皆宜"
  ],
  "喜旺火腿肠": [
    "短保质期少添加剂，健康放心",
    "山东知名品牌，品质可靠",
    "肉质鲜嫩，即食方便"
  ],
  "波尼亚火腿肠": [
    "青岛品牌，生态养殖可追溯",
    "原料讲究，制作工艺先进",
    "口感地道，风味独特"
  ],
  "得利斯火腿肠": [
    "低温火腿肠开创者，肉质鲜嫩",
    "山东老字号，品牌信誉好",
    "少添加剂，健康安全"
  ],
  "三全食品": [
    "速冻食品行业开创者，品控严格",
    "产品线丰富，满足多样需求",
    "传统工艺与现代技术结合"
  ]
};

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
let brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 读取待更新品牌文件
const brandsToUpdatePath = path.join(__dirname, 'eighthBatchBrandsToAddAdvantages.json');
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

console.log('\n第八批次品牌核心优势添加完成！');
console.log(`共处理 ${brandsToUpdateData.length} 个品牌`);