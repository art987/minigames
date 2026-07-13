// 瑞文标准推理测验(SPM)智商换算数据
// 基于年龄和原始分数计算IQ值

const iqStandard = {
  // 换算说明
  description: '根据年龄和原始分数换算IQ值,年龄段按就近原则,原始分按就近最低原则',
  
  // 年龄段定义(以整数表示)
  ageGroups: [16, 20, 30, 40, 50, 60],
  
  // IQ等级定义
  iqLevels: {
    superior: { min: 130, max: 150, label: '超优', color: '#FFD700' },
    excellent: { min: 120, max: 129, label: '优秀', color: '#FF6347' },
    aboveAverage: { min: 110, max: 119, label: '中上', color: '#4169E1' },
    average: { min: 90, max: 109, label: '中等', color: '#32CD32' },
    belowAverage: { min: 80, max: 89, label: '中下', color: '#FFA500' },
    borderline: { min: 70, max: 79, label: '临界', color: '#DC143C' },
    belowBorderline: { min: 60, max: 69, label: '偏低', color: '#8B0000' }
  },
  
  // 具体换算表数据(年龄段: {原始分: IQ值})
  conversionTable: {
    // 16岁年龄段
    '16': {
      '69': 150,
      '68': 145,
      '67': 140,
      '66': 135,
      '65': 130,
      '64': 125,
      '63': 120,
      '62': 115,
      '61': 110,
      '59': 105,
      '57': 100,
      '55': 95,
      '53': 90,
      '51': 85,
      '48': 80,
      '45': 75,
      '42': 70,
      '38': 65,
      '34': 60,
      '30': 55
    },
    // 20岁年龄段
    '20': {
      '69': 150,
      '68': 145,
      '67': 140,
      '66': 135,
      '65': 130,
      '64': 125,
      '63': 120,
      '62': 115,
      '61': 110,
      '59': 105,
      '57': 100,
      '55': 95,
      '53': 90,
      '51': 85,
      '48': 80,
      '45': 75,
      '42': 70,
      '38': 65,
      '34': 60,
      '30': 55
    },
    // 30岁年龄段
    '30': {
      '69': 150,
      '68': 145,
      '67': 140,
      '66': 135,
      '65': 130,
      '64': 125,
      '63': 120,
      '62': 115,
      '61': 110,
      '59': 105,
      '57': 100,
      '55': 95,
      '53': 90,
      '51': 85,
      '48': 80,
      '45': 75,
      '42': 70,
      '38': 65,
      '34': 60,
      '30': 55
    },
    // 40岁年龄段
    '40': {
      '69': 150,
      '68': 145,
      '67': 140,
      '66': 135,
      '65': 130,
      '64': 125,
      '63': 120,
      '62': 115,
      '61': 110,
      '59': 105,
      '57': 100,
      '55': 95,
      '53': 90,
      '51': 85,
      '48': 80,
      '45': 75,
      '42': 70,
      '38': 65,
      '34': 60,
      '30': 55
    },
    // 50岁年龄段
    '50': {
      '69': 150,
      '68': 145,
      '67': 140,
      '66': 135,
      '65': 130,
      '64': 125,
      '63': 120,
      '62': 115,
      '61': 110,
      '59': 105,
      '57': 100,
      '55': 95,
      '53': 90,
      '51': 85,
      '48': 80,
      '45': 75,
      '42': 70,
      '38': 65,
      '34': 60,
      '30': 55
    },
    // 60岁年龄段
    '60': {
      '69': 150,
      '68': 145,
      '67': 140,
      '66': 135,
      '65': 130,
      '64': 125,
      '63': 120,
      '62': 115,
      '61': 110,
      '59': 105,
      '57': 100,
      '55': 95,
      '53': 90,
      '51': 85,
      '48': 80,
      '45': 75,
      '42': 70,
      '38': 65,
      '34': 60,
      '30': 55
    }
  },
  
  // 计算IQ函数
  calculateIQ: function(age, rawScore) {
    // 找到最近的年龄段
    let closestAge = this.ageGroups[0];
    for (let i = 1; i < this.ageGroups.length; i++) {
      if (Math.abs(this.ageGroups[i] - age) < Math.abs(closestAge - age)) {
        closestAge = this.ageGroups[i];
      }
    }
    
    // 获取该年龄段的换算表
    const ageTable = this.conversionTable[closestAge.toString()];
    
    // 找到原始分数对应的IQ值(就近最低原则)
    const scoreKeys = Object.keys(ageTable).map(Number).sort((a, b) => b - a);
    
    for (let score of scoreKeys) {
      if (rawScore >= score) {
        return {
          iq: ageTable[score],
          ageGroup: closestAge,
          matchedScore: score
        };
      }
    }
    
    // 如果分数低于最低值
    return {
      iq: ageTable[scoreKeys[scoreKeys.length - 1]],
      ageGroup: closestAge,
      matchedScore: scoreKeys[scoreKeys.length - 1]
    };
  },
  
  // 获取IQ等级描述
  getIQLevel: function(iq) {
    for (let [key, level] of Object.entries(this.iqLevels)) {
      if (iq >= level.min && iq <= level.max) {
        return level;
      }
    }
    return this.iqLevels.belowBorderline;
  }
};