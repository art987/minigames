(function() {
    // 避免重复加载
    if (window.psychologicalTests && window.psychologicalTests['schedule_regularity']) {
        return;
    }

    // 测试数据
    const testData = {
        id: 'schedule_regularity',
        title: '作息规律性测试',
        description: '本测验将评估您的作息规律程度，涵盖起床时间、睡眠时间、用餐时间和日常活动安排等多个维度。',
        category: '健康与生活习惯类',
        totalScore: 100,
        questions: [
            {
                id: 1,
                text: '您平均每周有几天能够在相同的时间段内起床？',
                type: 'single',
                options: [
                    { text: '几乎每天（6-7天）', score: 10 },
                    { text: '大部分时间（4-5天）', score: 8 },
                    { text: '一般（2-3天）', score: 5 },
                    { text: '很少（0-1天）', score: 2 }
                ]
            },
            {
                id: 2,
                text: '您平均每周有几天能够在相同的时间段内入睡？',
                type: 'single',
                options: [
                    { text: '几乎每天（6-7天）', score: 10 },
                    { text: '大部分时间（4-5天）', score: 8 },
                    { text: '一般（2-3天）', score: 5 },
                    { text: '很少（0-1天）', score: 2 }
                ]
            },
            {
                id: 3,
                text: '您的睡眠时间是否保持相对稳定（每天相差不超过1小时）？',
                type: 'single',
                options: [
                    { text: '几乎总是', score: 10 },
                    { text: '经常', score: 7 },
                    { text: '偶尔', score: 4 },
                    { text: '很少', score: 1 }
                ]
            },
            {
                id: 4,
                text: '您是否有固定的三餐时间安排？',
                type: 'single',
                options: [
                    { text: '三餐时间都很固定', score: 10 },
                    { text: '两餐时间固定，一餐不固定', score: 7 },
                    { text: '一餐时间固定，两餐不固定', score: 4 },
                    { text: '三餐时间都不固定', score: 1 }
                ]
            },
            {
                id: 5,
                text: '周末和工作日的起床时间差异通常有多大？',
                type: 'single',
                options: [
                    { text: '几乎没有差异（30分钟内）', score: 10 },
                    { text: '差异较小（1小时内）', score: 8 },
                    { text: '差异中等（1-2小时）', score: 5 },
                    { text: '差异较大（2小时以上）', score: 2 }
                ]
            },
            {
                id: 6,
                text: '您是否有规律的午休习惯？',
                type: 'single',
                options: [
                    { text: '几乎每天都午休，时间固定', score: 10 },
                    { text: '经常午休，但时间不固定', score: 7 },
                    { text: '偶尔午休', score: 4 },
                    { text: '很少午休', score: 1 }
                ]
            },
            {
                id: 7,
                text: '您是否有固定的体育锻炼时间？',
                type: 'single',
                options: [
                    { text: '有固定的锻炼时间和频率', score: 10 },
                    { text: '有锻炼但时间不固定', score: 7 },
                    { text: '偶尔锻炼', score: 4 },
                    { text: '很少锻炼', score: 1 }
                ]
            },
            {
                id: 8,
                text: '您通常在晚上几点前放下电子设备准备睡觉？',
                type: 'single',
                options: [
                    { text: '睡觉前30分钟以上', score: 10 },
                    { text: '睡觉前15-30分钟', score: 8 },
                    { text: '睡觉前5-15分钟', score: 5 },
                    { text: '几乎在睡觉前一刻或边睡边使用', score: 2 }
                ]
            },
            {
                id: 9,
                text: '您是否有固定的起床后习惯（如刷牙、喝水、晨练等）？',
                type: 'single',
                options: [
                    { text: '有非常固定的起床后习惯', score: 10 },
                    { text: '有习惯但偶尔会变', score: 7 },
                    { text: '没有固定习惯，但基本会做一些事情', score: 4 },
                    { text: '完全没有固定习惯', score: 1 }
                ]
            },
            {
                id: 10,
                text: '当您的作息被打乱（如旅行、熬夜等）后，通常需要多久恢复到正常作息？',
                type: 'single',
                options: [
                    { text: '1天内', score: 10 },
                    { text: '1-2天', score: 7 },
                    { text: '3-4天', score: 4 },
                    { text: '5天以上', score: 1 }
                ]
            }
        ],
        resultRanges: [
            {
                minScore: 0,
                maxScore: 30,
                title: '作息极不规律',
                description: '您的作息习惯非常不规律，这可能会对您的身体健康和精神状态产生负面影响。建议您尝试逐步建立规律的作息时间，从固定起床时间开始，然后逐步调整其他活动时间。'
            },
            {
                minScore: 31,
                maxScore: 50,
                title: '作息较不规律',
                description: '您的作息习惯有一定的规律性，但仍有较大的改进空间。建议您制定一个简单的作息计划，并尝试逐步遵循，重点关注睡眠和用餐时间的规律性。'
            },
            {
                minScore: 51,
                maxScore: 70,
                title: '作息基本规律',
                description: '您的作息习惯整体上还算规律，但在某些方面可能还不够稳定。建议您进一步巩固已有的规律习惯，并尝试优化那些不够稳定的方面，以提高整体作息质量。'
            },
            {
                minScore: 71,
                maxScore: 90,
                title: '作息比较规律',
                description: '您的作息习惯相当规律，这对您的身体健康和日常生活都非常有益。继续保持良好的作息习惯，并注意根据季节和自身状态进行适当调整。'
            },
            {
                minScore: 91,
                maxScore: 100,
                title: '作息非常规律',
                description: '您拥有极为规律的作息习惯，这是非常难得的健康生活方式。您的自律和坚持为您的身心健康奠定了坚实的基础，继续保持并鼓励身边的人也养成良好的作息习惯。'
            }
        ]
    };

    // 注册测试
    if (window.TestRegistry) {
        window.TestRegistry.register(testData);
    }

    if (!window.TestDatasets) {
        window.TestDatasets = {};
    }
    window.TestDatasets[testData.id] = testData;
})();