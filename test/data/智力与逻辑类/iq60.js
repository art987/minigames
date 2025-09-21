(function(){
    // 从文件名获取测试ID（自动提取，无需手动修改）
    const getTestIdFromFilename = function() {
        // 获取当前脚本文件名
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];
        const scriptSrc = currentScript.src;
        const fileName = scriptSrc.split('/').pop();
        const testId = fileName.replace('.js', '');
        return testId;
    };
    
    // 提取测试ID
    const testId = getTestIdFromFilename();
    console.log('IQ60测试ID:', testId);

    // 注册测试元数据
    if (window.TestRegistry && typeof window.TestRegistry.register === 'function') {
        window.TestRegistry.register({
            id: testId,  // 自动从文件名获取，无需修改
            title: '60题标准智商测试',
            description: '通过60道标准化题目全面评估逻辑推理、数字计算、空间想象等多维度能力。',
            estimateMinutes: 10,
        });
        console.log('已注册测试元数据');
    } else {
        console.warn('TestRegistry不存在或register函数不可用');
    }

    // 确保TestDatasets对象存在
    window.TestDatasets = window.TestDatasets || {};
    
    // 创建测试数据集
    var dataset = {
        id: testId,
        title: '60题标准智商测试',
        description: '通过60道标准化题目全面评估逻辑推理、数字计算、空间想象等多维度能力。',
        questions: [
            {
                text: '找出规律：1, 4, 9, 16, 25, ?',
                multi: false,
                options: [
                    { label: '30', score: 0 },
                    { label: '36', score: 2 },
                    { label: '49', score: 0 },
                    { label: '64', score: 0 }
                ]
            },
            {
                text: '如果所有的A都是B，所有的B都是C，那么：',
                multi: false,
                options: [
                    { label: '所有的A都是C', score: 2 },
                    { label: '所有的C都是A', score: 0 },
                    { label: '所有的B都是A', score: 0 },
                    { label: '以上都不对', score: 0 }
                ]
            },
            {
                text: '一个立方体有多少个顶点？',
                multi: false,
                options: [
                    { label: '4个', score: 0 },
                    { label: '6个', score: 0 },
                    { label: '8个', score: 2 },
                    { label: '12个', score: 0 }
                ]
            },
            {
                text: '如果APPLE = 50，那么ORANGE = ?',
                multi: false,
                options: [
                    { label: '60', score: 0 },
                    { label: '63', score: 0 },
                    { label: '66', score: 2 },
                    { label: '69', score: 0 }
                ]
            },
            {
                text: '找出不属于同一类的选项：',
                multi: false,
                options: [
                    { label: '钢琴', score: 0 },
                    { label: '小提琴', score: 0 },
                    { label: '吉他', score: 0 },
                    { label: '鼓', score: 2 }
                ]
            },
            {
                text: '一个数列：3, 6, 18, 72, 360, ?',
                multi: false,
                options: [
                    { label: '720', score: 0 },
                    { label: '1080', score: 0 },
                    { label: '1800', score: 2 },
                    { label: '2160', score: 0 }
                ]
            },
            {
                text: '如果今天是星期三，那么100天后是星期几？',
                multi: false,
                options: [
                    { label: '星期一', score: 0 },
                    { label: '星期二', score: 0 },
                    { label: '星期三', score: 0 },
                    { label: '星期四', score: 2 }
                ]
            },
            {
                text: '找出下列单词中的共同点：书、树、数、熟',
                multi: false,
                options: [
                    { label: '都有"木"字旁', score: 0 },
                    { label: '都是四画', score: 0 },
                    { label: '都有"丿"笔画', score: 0 },
                    { label: '都有"丨"笔画', score: 2 }
                ]
            },
            {
                text: '一个正方形的面积是16平方厘米，它的周长是多少厘米？',
                multi: false,
                options: [
                    { label: '8', score: 0 },
                    { label: '16', score: 2 },
                    { label: '32', score: 0 },
                    { label: '64', score: 0 }
                ]
            },
            {
                text: '如果2+3=10，3+7=27，4+5=?',
                multi: false,
                options: [
                    { label: '20', score: 0 },
                    { label: '32', score: 0 },
                    { label: '36', score: 2 },
                    { label: '45', score: 0 }
                ]
            },
            {
                text: '找出规律：AZ, BY, CX, ?',
                multi: false,
                options: [
                    { label: 'DW', score: 2 },
                    { label: 'DV', score: 0 },
                    { label: 'EW', score: 0 },
                    { label: 'EV', score: 0 }
                ]
            },
            {
                text: '一个圆的直径是10厘米，它的周长约为多少厘米？',
                multi: false,
                options: [
                    { label: '30', score: 0 },
                    { label: '31.4', score: 2 },
                    { label: '62.8', score: 0 },
                    { label: '100', score: 0 }
                ]
            },
            {
                text: '如果FACE = 6135，那么BOOK = ?',
                multi: false,
                options: [
                    { label: '2114', score: 0 },
                    { label: '2145', score: 0 },
                    { label: '2415', score: 2 },
                    { label: '2541', score: 0 }
                ]
            },
            {
                text: '找出不同类的一项：',
                multi: false,
                options: [
                    { label: '水星', score: 0 },
                    { label: '金星', score: 0 },
                    { label: '月球', score: 2 },
                    { label: '火星', score: 0 }
                ]
            },
            {
                text: '一个数列：1, 1, 2, 3, 5, 8, ?',
                multi: false,
                options: [
                    { label: '11', score: 0 },
                    { label: '13', score: 2 },
                    { label: '15', score: 0 },
                    { label: '21', score: 0 }
                ]
            },
            {
                text: '如果一个人以4公里/小时的速度走了2小时，然后以6公里/小时的速度走了3小时，他总共走了多少公里？',
                multi: false,
                options: [
                    { label: '18', score: 0 },
                    { label: '20', score: 0 },
                    { label: '22', score: 0 },
                    { label: '26', score: 2 }
                ]
            },
            {
                text: '找出规律：16, 8, 4, 2, ?',
                multi: false,
                options: [
                    { label: '0', score: 0 },
                    { label: '1', score: 2 },
                    { label: '1/2', score: 0 },
                    { label: '0.5', score: 0 }
                ]
            },
            {
                text: '如果"红色"对应"停止"，那么"绿色"对应什么？',
                multi: false,
                options: [
                    { label: '等待', score: 0 },
                    { label: '前进', score: 2 },
                    { label: '注意', score: 0 },
                    { label: '减速', score: 0 }
                ]
            },
            {
                text: '一个正方体有多少个面？',
                multi: false,
                options: [
                    { label: '4个', score: 0 },
                    { label: '6个', score: 2 },
                    { label: '8个', score: 0 },
                    { label: '12个', score: 0 }
                ]
            },
            {
                text: '找出规律：1, 4, 9, 16, 25, 36, ?',
                multi: false,
                options: [
                    { label: '42', score: 0 },
                    { label: '47', score: 0 },
                    { label: '49', score: 2 },
                    { label: '64', score: 0 }
                ]
            },
            {
                text: '如果所有的猫都是动物，有些动物会游泳，那么：',
                multi: false,
                options: [
                    { label: '所有的猫都会游泳', score: 0 },
                    { label: '有些猫会游泳', score: 0 },
                    { label: '没有猫会游泳', score: 0 },
                    { label: '无法确定', score: 2 }
                ]
            },
            {
                text: '一个数列：2, 6, 12, 20, 30, ?',
                multi: false,
                options: [
                    { label: '36', score: 0 },
                    { label: '40', score: 0 },
                    { label: '42', score: 2 },
                    { label: '48', score: 0 }
                ]
            },
            {
                text: '如果ABCD是一个正方形，E是BC的中点，连接AE，那么三角形ABE是：',
                multi: false,
                options: [
                    { label: '等边三角形', score: 0 },
                    { label: '等腰三角形', score: 2 },
                    { label: '直角三角形', score: 0 },
                    { label: '不规则三角形', score: 0 }
                ]
            },
            {
                text: '找出不同类的一项：',
                multi: false,
                options: [
                    { label: '眼睛', score: 0 },
                    { label: '耳朵', score: 0 },
                    { label: '鼻子', score: 0 },
                    { label: '手指', score: 2 }
                ]
            },
            {
                text: '如果3×4=7，5×2=3，那么4×6=?',
                multi: false,
                options: [
                    { label: '5', score: 0 },
                    { label: '6', score: 0 },
                    { label: '10', score: 2 },
                    { label: '24', score: 0 }
                ]
            },
            {
                text: '找出规律：B, E, H, K, ?',
                multi: false,
                options: [
                    { label: 'M', score: 0 },
                    { label: 'N', score: 2 },
                    { label: 'O', score: 0 },
                    { label: 'P', score: 0 }
                ]
            },
            {
                text: '一个长方形的长是8厘米，宽是6厘米，它的面积是多少平方厘米？',
                multi: false,
                options: [
                    { label: '14', score: 0 },
                    { label: '24', score: 0 },
                    { label: '28', score: 0 },
                    { label: '48', score: 2 }
                ]
            },
            {
                text: '如果BLUE = 2154，那么GREEN = ?',
                multi: false,
                options: [
                    { label: '32445', score: 0 },
                    { label: '32454', score: 0 },
                    { label: '34524', score: 0 },
                    { label: '32554', score: 2 }
                ]
            },
            {
                text: '找出不同类的一项：',
                multi: false,
                options: [
                    { label: '苹果', score: 0 },
                    { label: '香蕉', score: 0 },
                    { label: '橙子', score: 0 },
                    { label: '土豆', score: 2 }
                ]
            },
            {
                text: '一个数列：3, 5, 9, 17, 33, ?',
                multi: false,
                options: [
                    { label: '49', score: 0 },
                    { label: '57', score: 0 },
                    { label: '65', score: 2 },
                    { label: '97', score: 0 }
                ]
            },
            {
                text: '如果一个人以5公里/小时的速度走了3小时，他走了多少米？',
                multi: false,
                options: [
                    { label: '1500', score: 0 },
                    { label: '5000', score: 0 },
                    { label: '15000', score: 2 },
                    { label: '150000', score: 0 }
                ]
            },
            {
                text: '找出规律：2, 5, 10, 17, 26, ?',
                multi: false,
                options: [
                    { label: '35', score: 0 },
                    { label: '37', score: 2 },
                    { label: '39', score: 0 },
                    { label: '42', score: 0 }
                ]
            },
            {
                text: '如果"鸟"对应"飞"，那么"鱼"对应什么？',
                multi: false,
                options: [
                    { label: '水', score: 0 },
                    { label: '游', score: 2 },
                    { label: '海', score: 0 },
                    { label: '鳍', score: 0 }
                ]
            },
            {
                text: '一个三角形有多少个角？',
                multi: false,
                options: [
                    { label: '2个', score: 0 },
                    { label: '3个', score: 2 },
                    { label: '4个', score: 0 },
                    { label: '6个', score: 0 }
                ]
            },
            {
                text: '找出规律：1, 8, 27, 64, ?',
                multi: false,
                options: [
                    { label: '125', score: 2 },
                    { label: '128', score: 0 },
                    { label: '216', score: 0 },
                    { label: '343', score: 0 }
                ]
            },
            {
                text: '如果所有的A都是B，有些C是B，那么：',
                multi: false,
                options: [
                    { label: '所有的A都是C', score: 0 },
                    { label: '有些C是A', score: 0 },
                    { label: '有些A是C', score: 0 },
                    { label: '无法确定', score: 2 }
                ]
            },
            {
                text: '一个数列：1, 3, 6, 10, 15, ?',
                multi: false,
                options: [
                    { label: '18', score: 0 },
                    { label: '21', score: 2 },
                    { label: '24', score: 0 },
                    { label: '30', score: 0 }
                ]
            },
            {
                text: '如果一个圆的半径是5厘米，它的面积是多少平方厘米？（π取3.14）',
                multi: false,
                options: [
                    { label: '15.7', score: 0 },
                    { label: '31.4', score: 0 },
                    { label: '78.5', score: 2 },
                    { label: '157', score: 0 }
                ]
            },
            {
                text: '找出不同类的一项：',
                multi: false,
                options: [
                    { label: '钻石', score: 0 },
                    { label: '红宝石', score: 0 },
                    { label: '翡翠', score: 0 },
                    { label: '大理石', score: 2 }
                ]
            },
            {
                text: '如果5+3×2=16，那么6+4×3=?',
                multi: false,
                options: [
                    { label: '18', score: 0 },
                    { label: '24', score: 0 },
                    { label: '30', score: 2 },
                    { label: '42', score: 0 }
                ]
            },
            {
                text: '找出规律：Z, W, T, Q, ?',
                multi: false,
                options: [
                    { label: 'N', score: 2 },
                    { label: 'O', score: 0 },
                    { label: 'P', score: 0 },
                    { label: 'M', score: 0 }
                ]
            },
            {
                text: '一个长方形的周长是26厘米，长是8厘米，它的宽是多少厘米？',
                multi: false,
                options: [
                    { label: '4', score: 0 },
                    { label: '5', score: 2 },
                    { label: '6', score: 0 },
                    { label: '10', score: 0 }
                ]
            },
            {
                text: '如果CAT = 24，那么DOG = ?',
                multi: false,
                options: [
                    { label: '26', score: 2 },
                    { label: '27', score: 0 },
                    { label: '36', score: 0 },
                    { label: '42', score: 0 }
                ]
            },
            {
                text: '找出不同类的一项：',
                multi: false,
                options: [
                    { label: '足球', score: 0 },
                    { label: '篮球', score: 0 },
                    { label: '网球', score: 0 },
                    { label: '象棋', score: 2 }
                ]
            },
            {
                text: '一个数列：4, 5, 8, 13, 20, ?',
                multi: false,
                options: [
                    { label: '25', score: 0 },
                    { label: '29', score: 2 },
                    { label: '33', score: 0 },
                    { label: '40', score: 0 }
                ]
            },
            {
                text: '如果一个人每天存5元钱，一周存多少元？',
                multi: false,
                options: [
                    { label: '25', score: 0 },
                    { label: '30', score: 0 },
                    { label: '35', score: 2 },
                    { label: '40', score: 0 }
                ]
            },
            {
                text: '找出规律：3, 7, 15, 31, 63, ?',
                multi: false,
                options: [
                    { label: '95', score: 0 },
                    { label: '127', score: 2 },
                    { label: '129', score: 0 },
                    { label: '255', score: 0 }
                ]
            },
            {
                text: '如果"书"对应"知识"，那么"锻炼"对应什么？',
                multi: false,
                options: [
                    { label: '运动', score: 0 },
                    { label: '健康', score: 2 },
                    { label: '肌肉', score: 0 },
                    { label: '体育馆', score: 0 }
                ]
            },
            {
                text: '一个正方形的对角线长为√8厘米，它的面积是多少平方厘米？',
                multi: false,
                options: [
                    { label: '2', score: 0 },
                    { label: '4', score: 2 },
                    { label: '8', score: 0 },
                    { label: '16', score: 0 }
                ]
            },
            {
                text: '找出规律：2, 6, 18, 54, ?',
                multi: false,
                options: [
                    { label: '108', score: 0 },
                    { label: '162', score: 2 },
                    { label: '216', score: 0 },
                    { label: '324', score: 0 }
                ]
            },
            {
                text: '如果所有的X都是Y，没有Y是Z，那么：',
                multi: false,
                options: [
                    { label: '所有的X都是Z', score: 0 },
                    { label: '没有X是Z', score: 2 },
                    { label: '有些X是Z', score: 0 },
                    { label: '无法确定', score: 0 }
                ]
            },
            {
                text: '一个数列：2, 4, 7, 11, 16, ?',
                multi: false,
                options: [
                    { label: '20', score: 0 },
                    { label: '22', score: 2 },
                    { label: '24', score: 0 },
                    { label: '32', score: 0 }
                ]
            },
            {
                text: '如果一个长方形的长是宽的两倍，周长是36厘米，那么它的面积是多少平方厘米？',
                multi: false,
                options: [
                    { label: '48', score: 0 },
                    { label: '72', score: 2 },
                    { label: '96', score: 0 },
                    { label: '108', score: 0 }
                ]
            },
            {
                text: '找出不同类的一项：',
                multi: false,
                options: [
                    { label: '铅笔', score: 0 },
                    { label: '钢笔', score: 0 },
                    { label: '蜡笔', score: 0 },
                    { label: '橡皮', score: 2 }
                ]
            },
            {
                text: '如果2^3=8，那么3^4=?',
                multi: false,
                options: [
                    { label: '12', score: 0 },
                    { label: '27', score: 0 },
                    { label: '64', score: 0 },
                    { label: '81', score: 2 }
                ]
            },
            {
                text: '找出规律：D, H, L, P, ?',
                multi: false,
                options: [
                    { label: 'S', score: 0 },
                    { label: 'T', score: 2 },
                    { label: 'U', score: 0 },
                    { label: 'V', score: 0 }
                ]
            },
            {
                text: '一个圆的周长是31.4厘米，它的直径是多少厘米？',
                multi: false,
                options: [
                    { label: '5', score: 0 },
                    { label: '10', score: 2 },
                    { label: '15', score: 0 },
                    { label: '20', score: 0 }
                ]
            },
            {
                text: '如果FISH = 6927，那么BIRD = ?',
                multi: false,
                options: [
                    { label: '1923', score: 0 },
                    { label: '2934', score: 2 },
                    { label: '3924', score: 0 },
                    { label: '4293', score: 0 }
                ]
            },
            {
                text: '找出不同类的一项：',
                multi: false,
                options: [
                    { label: '狮子', score: 0 },
                    { label: '老虎', score: 0 },
                    { label: '豹子', score: 0 },
                    { label: '大象', score: 2 }
                ]
            },
            {
                text: '一个数列：5, 10, 20, 40, 80, ?',
                multi: false,
                options: [
                    { label: '120', score: 0 },
                    { label: '140', score: 0 },
                    { label: '160', score: 2 },
                    { label: '200', score: 0 }
                ]
            }
        ],
        resultRanges: [
            { label: '低于平均', min: 0, max: 40, text: '您的逻辑推理能力有待提高。', advice: '建议多做逻辑思维训练，如数独、数学谜题等。' },
            { label: '平均水平', min: 41, max: 80, text: '您具备正常的逻辑推理能力。', advice: '可以尝试更复杂的逻辑问题来提升能力。' },
            { label: '良好水平', min: 81, max: 100, text: '您的逻辑推理能力优于大多数人。', advice: '继续保持，可以挑战更高难度的智力题。' },
            { label: '优秀水平', min: 101, max: 120, text: '您具备出色的逻辑思维和问题解决能力。', advice: '您的思维方式灵活，可以尝试参加一些智力竞赛。' }
        ]
    };
    
    // 确保所有必要的对象存在
    window.TestDatasets = window.TestDatasets || {};
    
    // 保存数据到所有可能的位置，确保测试运行器能找到它
    window.TestDatasets[dataset.id] = dataset;
    window.TestDatasets[testId] = dataset;  // 额外的安全保障
    window.testDataset = dataset;  // 兼容旧版代码
    window.dataset = dataset;  // 兼容旧版代码
    
    console.log('测试数据已保存到window.TestDatasets');
    console.log('TestDatasets内容:', window.TestDatasets);
})();