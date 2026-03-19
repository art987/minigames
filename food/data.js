const config = {
    age: {
        1: { label: '婴幼儿', desc: '0-3岁，生长发育最快的阶段', factor: 1.4 },
        2: { label: '儿童', desc: '4-10岁，活泼好动，代谢很高', factor: 1.2 },
        3: { label: '青少年', desc: '11-17岁，青春期发育冲刺期', factor: 1.3 },
        4: { label: '青壮年', desc: '18-30岁，代谢旺盛，精力充沛', factor: 1.0 },
        5: { label: '中年', desc: '31-50岁，代谢开始缓慢下降', factor: 0.9 },
        6: { label: '中老年', desc: '51-65岁，肌肉流失，需控制', factor: 0.8 },
        7: { label: '银发族', desc: '65岁以上，代谢率低，重营养', factor: 0.75 }
    },
    sex: {
        1: { label: '女性', desc: '女性肌肉量通常较低，代谢稍慢', factor: 0.9 },
        2: { label: '男性', desc: '男性肌肉量通常更高，基础代谢比女性快约10%', factor: 1.0 }
    },
    activity: {
        1: { label: '长期卧床', desc: '极少活动，静养恢复为主', factor: 1.0 },
        2: { label: '久坐办公', desc: '程序员、白领，日常活动很少', factor: 1.2 },
        3: { label: '偶尔散步', desc: '每周1-2次轻度活动', factor: 1.375 },
        4: { label: '经常运动', desc: '每周3-5次中等强度运动（如慢跑、游泳）', factor: 1.55 },
        5: { label: '健身达人', desc: '每周6-7次规律训练', factor: 1.725 },
        6: { label: '体力工作', desc: '建筑、农业等高强度体力劳动', factor: 1.9 },
        7: { label: '职业运动员', desc: '专业竞技训练，消耗极大', factor: 2.1 }
    },
    goal: {
        1: { 
            label: '极速瘦身', 
            desc: '极低热量饮食，需医生指导（危险）', 
            factor: 0.6,
            ratio: { carb: 0.3, protein: 0.35, fat: 0.35 }
        },
        2: { 
            label: '快速减肥', 
            desc: '制造大热量缺口，适合短期突击', 
            factor: 0.8,
            ratio: { carb: 0.35, protein: 0.4, fat: 0.25 }
        },
        3: { 
            label: '健康减脂', 
            desc: '温和调整饮食结构，不易反弹', 
            factor: 0.95,
            ratio: { carb: 0.4, protein: 0.35, fat: 0.25 }
        },
        4: { 
            label: '维持体重', 
            desc: '摄入与消耗平衡，保持健康', 
            factor: 1.1,
            ratio: { carb: 0.5, protein: 0.25, fat: 0.25 }
        },
        5: { 
            label: '增肌塑形', 
            desc: '摄入大于消耗，配合力量训练，让肌肉增长', 
            factor: 1.4,
            ratio: { carb: 0.55, protein: 0.3, fat: 0.15 }
        },
        6: { 
            label: '强壮增肌', 
            desc: '大热量盈余，追求力量和围度增长', 
            factor: 1.6,
            ratio: { carb: 0.6, protein: 0.25, fat: 0.15 }
        },
        7: { 
            label: '增重恢复', 
            desc: '术后恢复或体质过瘦，需高热量', 
            factor: 1.8,
            ratio: { carb: 0.5, protein: 0.2, fat: 0.3 }
        }
    }
};
