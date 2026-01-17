// 省份数据
window.PROVINCES = [
    '北京市', '天津市', '河北省', '山西省', '内蒙古自治区',
    '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省',
    '浙江省', '安徽省', '福建省', '江西省', '山东省',
    '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区',
    '海南省', '重庆市', '四川省', '贵州省', '云南省',
    '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区',
    '新疆维吾尔自治区'
];

// 示例院校数据（实际使用时需要替换为真实数据）
window.SAMPLE_UNIVERSITIES = {
    '北京市': {
        '理科': {
            '10000': [
                { code: '10001', name: '北京大学', rank: 9500 },
                { code: '10002', name: '清华大学', rank: 9800 },
                { code: '10003', name: '中国人民大学', rank: 10500 }
            ],
            '20000': [
                { code: '10004', name: '北京航空航天大学', rank: 19500 },
                { code: '10005', name: '北京理工大学', rank: 19800 },
                { code: '10006', name: '北京师范大学', rank: 20500 }
            ]
        },
        '文科': {
            '5000': [
                { code: '10001', name: '北京大学', rank: 4800 },
                { code: '10002', name: '清华大学', rank: 4900 },
                { code: '10003', name: '中国人民大学', rank: 5200 }
            ]
        }
    },
    '江苏省': {
        '理科': {
            '15000': [
                { code: '10284', name: '南京大学', rank: 14500 },
                { code: '10286', name: '东南大学', rank: 14800 },
                { code: '10287', name: '南京航空航天大学', rank: 15500 }
            ]
        }
    }
};

// 模拟数据加载函数（实际使用时需要替换为真实的数据加载逻辑）
window.loadUniversityData = async function(province, subject, rank) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 根据位次范围查找数据
    const rankRanges = Object.keys(window.SAMPLE_UNIVERSITIES[province]?.[subject] || {});
    const targetRange = rankRanges.find(range => Math.abs(parseInt(range) - rank) <= 5000);
    
    if (!targetRange) {
        return [];
    }
    
    const universities = window.SAMPLE_UNIVERSITIES[province][subject][targetRange];
    
    // 模拟更多数据
    const allUniversities = [
        ...universities,
        // 添加更多模拟数据
        { code: '10007', name: '北京邮电大学', rank: parseInt(targetRange) + 1000 },
        { code: '10008', name: '北京科技大学', rank: parseInt(targetRange) + 1500 },
        { code: '10009', name: '北京交通大学', rank: parseInt(targetRange) + 2000 },
        { code: '10010', name: '北京化工大学', rank: parseInt(targetRange) + 2500 },
        { code: '10011', name: '北京林业大学', rank: parseInt(targetRange) + 3000 },
        { code: '10012', name: '北京中医药大学', rank: parseInt(targetRange) + 3500 },
        { code: '10013', name: '北京外国语大学', rank: parseInt(targetRange) + 4000 },
        { code: '10014', name: '中国传媒大学', rank: parseInt(targetRange) + 4500 },
        { code: '10015', name: '中央财经大学', rank: parseInt(targetRange) + 5000 }
    ];
    
    return allUniversities.sort((a, b) => a.rank - b.rank);
};