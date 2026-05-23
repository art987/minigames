(function() {
    // 1. 直接设置测试ID，确保与文件名一致
    const testId = 'diet_health';

    // 2. 完整的测试数据结构
    const testData = {
        id: testId,
        title: '饮食习惯健康度测验',
        description: '本测验将评估您的饮食习惯健康程度，涵盖饮食结构、进食频率、食物选择和营养均衡等多个维度。',
        category: '健康与生活习惯类',
        questionCount: 10,
        totalScore: 100,
        estimateMinutes: 4,
        
        // 3. 题目数组
        questions: [
            {
                id: 'q1',
                text: '您每天摄入的水果和蔬菜总量大约是多少？',
                multi: false,
                options: [
                    { id: 'q1a1', text: '5份或更多（推荐量）', score: 40 },
                    { id: 'q1a2', text: '3-4份', score: 30 },
                    { id: 'q1a3', text: '1-2份', score: 20 },
                    { id: 'q1a4', text: '几乎不吃', score: 10 }
                ]
            },
            {
                id: 'q2',
                text: '您每周食用加工食品（如薯片、快餐、方便食品等）的频率是？',
                multi: false,
                options: [
                    { id: 'q2a1', text: '几乎不吃', score: 40 },
                    { id: 'q2a2', text: '每周1-2次', score: 30 },
                    { id: 'q2a3', text: '每周3-5次', score: 20 },
                    { id: 'q2a4', text: '每天或几乎每天', score: 10 }
                ]
            },
            {
                id: 'q3',
                text: '您每日饮水量（包括水、茶、汤等，但不包括含糖饮料）大约是多少？',
                multi: false,
                options: [
                    { id: 'q3a1', text: '2000毫升以上', score: 40 },
                    { id: 'q3a2', text: '1500-1999毫升', score: 30 },
                    { id: 'q3a3', text: '1000-1499毫升', score: 20 },
                    { id: 'q3a4', text: '少于1000毫升', score: 10 }
                ]
            },
            {
                id: 'q4',
                text: '您的饮食中，主食（如米饭、面条、面包等）的选择更偏向于？',
                multi: false,
                options: [
                    { id: 'q4a1', text: '全谷物（如糙米、全麦面包）', score: 40 },
                    { id: 'q4a2', text: '部分全谷物，部分精制谷物', score: 30 },
                    { id: 'q4a3', text: '主要是精制谷物', score: 20 },
                    { id: 'q4a4', text: '很少吃主食', score: 10 }
                ]
            },
            {
                id: 'q5',
                text: '您每周食用红肉（猪肉、牛肉、羊肉等）的频率是？',
                multi: false,
                options: [
                    { id: 'q5a1', text: '每周1-2次或更少', score: 40 },
                    { id: 'q5a2', text: '每周3-4次', score: 30 },
                    { id: 'q5a3', text: '每周5-6次', score: 20 },
                    { id: 'q5a4', text: '每天或几乎每天', score: 10 }
                ]
            },
            {
                id: 'q6',
                text: '您通常每天吃几餐？',
                multi: false,
                options: [
                    { id: 'q6a1', text: '3餐（规律饮食）', score: 40 },
                    { id: 'q6a2', text: '3餐+1-2次健康加餐', score: 35 },
                    { id: 'q6a3', text: '2餐', score: 20 },
                    { id: 'q6a4', text: '1餐或不规律', score: 10 }
                ]
            },
            {
                id: 'q7',
                text: '您每周食用鱼类或海鲜的频率是？',
                multi: false,
                options: [
                    { id: 'q7a1', text: '每周3次或更多', score: 40 },
                    { id: 'q7a2', text: '每周1-2次', score: 30 },
                    { id: 'q7a3', text: '每月1-3次', score: 20 },
                    { id: 'q7a4', text: '几乎不吃', score: 10 }
                ]
            },
            {
                id: 'q8',
                text: '您每天摄入的添加糖（如糖果、含糖饮料、甜点等）的量大约是？',
                multi: false,
                options: [
                    { id: 'q8a1', text: '几乎不吃', score: 40 },
                    { id: 'q8a2', text: '偶尔吃一点（每日不超过25克）', score: 30 },
                    { id: 'q8a3', text: '经常吃（每日25-50克）', score: 20 },
                    { id: 'q8a4', text: '大量吃（每日超过50克）', score: 10 }
                ]
            },
            {
                id: 'q9',
                text: '您的饮食中，蛋白质的来源更偏向于？',
                multi: false,
                options: [
                    { id: 'q9a1', text: '植物蛋白（豆类、坚果等）为主', score: 40 },
                    { id: 'q9a2', text: '植物蛋白和动物蛋白均衡', score: 35 },
                    { id: 'q9a3', text: '动物蛋白为主', score: 20 },
                    { id: 'q9a4', text: '很少摄入蛋白质', score: 10 }
                ]
            },
            {
                id: 'q10',
                text: '您吃饭时的速度如何？',
                multi: false,
                options: [
                    { id: 'q10a1', text: '细嚼慢咽（每餐至少20分钟）', score: 40 },
                    { id: 'q10a2', text: '中等速度（每餐15-20分钟）', score: 30 },
                    { id: 'q10a3', text: '比较快（每餐10-15分钟）', score: 20 },
                    { id: 'q10a4', text: '非常快（每餐少于10分钟）', score: 10 }
                ]
            }
        ],
        
        // 4. 结果范围配置
        resultRanges: [
            {
                minScore: 0,
                maxScore: 40,
                title: '饮食习惯较差',
                description: '您的饮食习惯存在较明显的问题，可能对健康造成潜在风险。建议您积极调整饮食结构，增加营养均衡的食物摄入。',
                suggestions: ['增加水果和蔬菜的摄入量', '减少加工食品和添加糖的摄入', '保持规律的三餐', '增加全谷物和优质蛋白质的摄入']
            },
            {
                minScore: 41,
                maxScore: 60,
                title: '饮食习惯一般',
                description: '您的饮食习惯处于一般水平，有一些健康的方面，但仍有改进空间。通过针对性的调整，您的饮食健康度可以得到明显提升。',
                suggestions: ['增加膳食纤维的摄入', '减少红肉和高脂肪食物的摄入', '保持充足的水分', '优化饮食的多样性']
            },
            {
                minScore: 61,
                maxScore: 75,
                title: '饮食习惯良好',
                description: '您的饮食习惯处于良好水平，大部分方面符合健康饮食的标准。继续保持现有的健康习惯，并进一步优化细节。',
                suggestions: ['定期评估饮食结构的平衡性', '尝试新的健康食谱和食材', '注意烹饪方式的选择', '保持规律的饮食习惯']
            },
            {
                minScore: 76,
                maxScore: 90,
                title: '饮食习惯优秀',
                description: '您拥有优秀的饮食习惯，能够为身体提供全面的营养支持。良好的饮食是健康生活的重要基础，继续保持！',
                suggestions: ['保持现有的健康饮食习惯', '根据季节和身体状况适当调整饮食', '分享您的健康饮食经验', '关注最新的营养科学研究']
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '饮食习惯卓越',
                description: '您的饮食习惯堪称完美，几乎符合所有健康饮食的标准。您对饮食的重视和科学安排，为您的健康奠定了坚实的基础。',
                suggestions: ['继续保持卓越的饮食习惯', '帮助身边的人改善饮食习惯', '探索更深入的营养学知识', '将健康饮食理念融入到生活的方方面面']
            }
        ]
    };

    // 5. 安全注册测试数据（避免覆盖全局对象）
    if (window.TestRegistry) {
        window.TestRegistry.register(testData);
    }

    if (!window.TestDatasets) {
        window.TestDatasets = {};
    }
    window.TestDatasets[testData.id] = testData;
})();