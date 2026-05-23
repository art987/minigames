// 为第136-150个品牌添加核心优势
const fs = require('fs');
const path = require('path');

// 读取品牌数据文件
const brandDataPath = path.join(__dirname, 'brandData.js');
const brandDataContent = fs.readFileSync(brandDataPath, 'utf8');

// 定义要添加的核心优势
const brandAdvantagesMap = {
  "ST&SAT星期六": {
    advantages: [
      "广东女鞋品牌，时尚优雅设计",
      "专注女鞋领域，舒适耐穿",
      "年轻女性喜爱，市场口碑好"
    ]
  },
  "安踏": {
    advantages: [
      "福建运动品牌，质量稳定可靠",
      "设计时尚，市场占有率高",
      "消费者信赖，口碑良好"
    ]
  },
  "鸿星尔克": {
    advantages: [
      "福建运动品牌，爱国情怀浓厚",
      "质量优良，价格适中亲民",
      "消费者喜爱，市场口碑佳"
    ]
  },
  "361": {
    advantages: [
      "福建运动品牌，设计时尚潮流",
      "质量可靠，价格亲民适中",
      "消费者认可，市场表现好"
    ]
  },
  "saltum": {
    advantages: [
      "广东休闲服装，时尚潮流设计",
      "质量优良，年轻人喜爱",
      "广东著名商标，品牌信誉好"
    ]
  }
};

// 更新品牌数据
function updateBrandData(content, brandAdvantagesMap) {
  let updatedContent = content;
  
  Object.entries(brandAdvantagesMap).forEach(([brandName, advantagesData]) => {
    // 使用正则表达式查找品牌对象
    const brandRegex = new RegExp(`("name"\s*:\s*"${brandName}"[^}]*?)(\})`, 's');
    
    updatedContent = updatedContent.replace(brandRegex, (match, brandInfo, closingBrace) => {
      // 如果已经有advantages字段，跳过
      if (brandInfo.includes('"advantages"')) {
        console.log(`品牌 ${brandName} 已经有核心优势，跳过`);
        return match;
      }
      
      // 添加advantages字段
      const updatedBrandInfo = `${brandInfo},\n      "advantages": ${JSON.stringify(advantagesData.advantages, null, 6).replace(/^/gm, '      ')}`;
      console.log(`成功为品牌 ${brandName} 添加核心优势`);
      return `${updatedBrandInfo}${closingBrace}`;
    });
  });
  
  return updatedContent;
}

// 主函数
function main() {
  console.log('开始为第136-150个品牌添加核心优势...');
  
  // 更新品牌数据
  const updatedContent = updateBrandData(brandDataContent, brandAdvantagesMap);
  
  // 保存更新后的内容
  fs.writeFileSync(brandDataPath, updatedContent, 'utf8');
  
  console.log('\n核心优势添加完成！');
  console.log('已更新的品牌：');
  Object.keys(brandAdvantagesMap).forEach(brandName => {
    console.log(`- ${brandName}`);
  });
}

// 执行主函数
main();