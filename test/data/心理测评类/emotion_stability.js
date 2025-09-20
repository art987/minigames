(function() {
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
    
    // 注册测试元数据
    window.TestRegistry && window.TestRegistry.register({
        id: testId,  // 自动从文件名获取，无需修改
        title: '情绪稳定度测验',  // 测试标题
        description: '本测试包含20道题目，全面评估您的情绪稳定性水平。',  // 测试描述
        estimateMinutes: 5  // 估计完成时间（分钟）
    });

    // 定义测试数据集
    var dataset = {
        id: testId,  // 自动从文件名获取，无需修改
        title: '情绪稳定度测验',
        description: '本测试包含20道题目，全面评估您的情绪稳定性水平。',
        questions: [
            // 情绪稳定性测试题目
            {
                text: '当事情不如预期发展时，你的反应是？',
                multi: false,
                options: [
                    { label: '非常沮丧，难以接受现实', score: 2 },
                    { label: '有些失望，但很快调整', score: 4 },
                    { label: '冷静分析，寻找解决办法', score: 5 }
                ]
            },
            {
                text: '面对他人的批评，你通常会？',
                multi: false,
                options: [
                    { label: '感到愤怒或受伤', score: 2 },
                    { label: '有些不舒服，但尝试理解', score: 4 },
                    { label: '冷静接受并反思', score: 5 }
                ]
            },
            {
                text: '当你感到压力很大时，你会？',
                multi: false,
                options: [
                    { label: '感到焦虑，无法集中注意力', score: 1 },
                    { label: '尝试一些放松技巧', score: 3 },
                    { label: '保持专注，有效应对压力', score: 5 }
                ]
            },
            {
                text: '对于生活中的小挫折，你会？',
                multi: false,
                options: [
                    { label: '过度反应，影响心情很久', score: 1 },
                    { label: '有些烦恼，但很快忘记', score: 4 },
                    { label: '一笑置之，不放在心上', score: 5 }
                ]
            },
            {
                text: '当你情绪激动时，你能控制自己的行为吗？',
                multi: false,
                options: [
                    { label: '很难控制，容易做出冲动行为', score: 1 },
                    { label: '有些困难，但努力控制', score: 3 },
                    { label: '完全能控制自己的言行', score: 5 }
                ]
            },
            {
                text: '在紧张的情况下，你的思维清晰度如何？',
                multi: false,
                options: [
                    { label: '思维混乱，无法理性思考', score: 1 },
                    { label: '有些干扰，但基本能思考', score: 4 },
                    { label: '保持清晰的思维', score: 5 }
                ]
            },
            {
                text: '你对未来的不确定性的态度是？',
                multi: false,
                options: [
                    { label: '非常焦虑，担心最坏情况', score: 1 },
                    { label: '有些担忧，但接受现实', score: 3 },
                    { label: '保持乐观，积极应对', score: 5 }
                ]
            },
            {
                text: '当你与他人发生冲突时，你会？',
                multi: false,
                options: [
                    { label: '情绪失控，难以冷静沟通', score: 1 },
                    { label: '努力克制情绪，尝试沟通', score: 4 },
                    { label: '冷静理性地解决问题', score: 5 }
                ]
            },
            {
                text: '你的情绪波动频率如何？',
                multi: false,
                options: [
                    { label: '频繁波动，一天内多次变化', score: 1 },
                    { label: '偶尔波动，受事件影响', score: 3 },
                    { label: '情绪稳定，很少大幅波动', score: 5 }
                ]
            },
            {
                text: '当你感到愤怒时，你会？',
                multi: false,
                options: [
                    { label: '立即爆发，难以控制', score: 1 },
                    { label: '努力压抑，但内心仍有不满', score: 3 },
                    { label: '冷静处理，合理表达', score: 5 }
                ]
            },
            {
                text: '你对自己的情绪状态的认知程度？',
                multi: false,
                options: [
                    { label: '不清楚自己的情绪变化', score: 1 },
                    { label: '有时能意识到自己的情绪', score: 4 },
                    { label: '非常清楚自己的情绪状态', score: 5 }
                ]
            },
            {
                text: '面对重大生活变化，你能快速适应吗？',
                multi: false,
                options: [
                    { label: '很难适应，需要很长时间', score: 1 },
                    { label: '需要一段时间调整', score: 3 },
                    { label: '能迅速适应新环境', score: 5 }
                ]
            },
            {
                text: '你是否经常感到紧张或焦虑？',
                multi: false,
                options: [
                    { label: '经常如此，无法放松', score: 1 },
                    { label: '有时会有这种感觉', score: 3 },
                    { label: '很少感到紧张或焦虑', score: 5 }
                ]
            },
            {
                text: '当你感到失望时，恢复心情需要多长时间？',
                multi: false,
                options: [
                    { label: '需要几天甚至更久', score: 1 },
                    { label: '需要一天左右', score: 3 },
                    { label: '几个小时内就能恢复', score: 5 }
                ]
            },
            {
                text: '你是否容易被他人的情绪影响？',
                multi: false,
                options: [
                    { label: '非常容易，情绪会被他人左右', score: 1 },
                    { label: '有时会受影响', score: 3 },
                    { label: '很少受他人情绪影响', score: 5 }
                ]
            },
            {
                text: '在压力情境下，你的工作效率如何？',
                multi: false,
                options: [
                    { label: '大幅下降，无法正常工作', score: 1 },
                    { label: '有所下降，但仍能完成任务', score: 3 },
                    { label: '保持高效，甚至有所提升', score: 5 }
                ]
            },
            {
                text: '你如何应对负面情绪？',
                multi: false,
                options: [
                    { label: '试图逃避，不愿面对', score: 1 },
                    { label: '感到困扰，但尝试处理', score: 4 },
                    { label: '积极面对，寻找解决方法', score: 5 }
                ]
            },
            {
                text: '你是否有有效的情绪调节策略？',
                multi: false,
                options: [
                    { label: '没有，不知道如何调节情绪', score: 1 },
                    { label: '有一些，但效果一般', score: 3 },
                    { label: '有多种有效的调节方法', score: 5 }
                ]
            },
            {
                text: '你对自己的情绪稳定性有何评价？',
                multi: false,
                options: [
                    { label: '非常不稳定，经常情绪失控', score: 1 },
                    { label: '一般，有时稳定有时波动', score: 4 },
                    { label: '非常稳定，很少情绪波动', score: 5 }
                ]
            },
            {
                text: '当你感到快乐或兴奋时，你会？',
                multi: false,
                options: [
                    { label: '情绪过于高涨，难以平复', score: 2 },
                    { label: '享受快乐，但不过度', score: 4 },
                    { label: '保持适度，不影响正常生活', score: 5 }
                ]
            }
        ],
        resultRanges: [
            // 定义测试结果范围
            { 
                label: '情绪不稳定', 
                min: 0, 
                max: 40, 
                text: '你的情绪稳定性较低，容易受到外界因素影响，情绪波动较大。这可能会影响你的日常生活、工作和人际关系。', 
                advice: '建议：1. 学习情绪管理技巧，如深呼吸、冥想等；2. 记录情绪日记，了解自己的情绪触发点；3. 寻求专业心理咨询帮助；4. 建立健康的生活习惯，保证充足睡眠和适当运动。' 
            },
            { 
                label: '情绪基本稳定', 
                min: 41, 
                max: 65, 
                text: '你的情绪稳定性处于中等水平，大部分情况下能够保持情绪平稳，但在压力较大或遇到挫折时仍可能出现情绪波动。', 
                advice: '建议：1. 继续发展情绪调节能力；2. 学习识别压力信号，提前采取应对措施；3. 培养积极的思维模式；4. 建立支持系统，与亲友保持良好沟通。' 
            },
            { 
                label: '情绪高度稳定', 
                min: 66, 
                max: 85, 
                text: '你的情绪稳定性较高，能够在大多数情况下保持冷静和理性，有效应对生活中的各种挑战和压力。', 
                advice: '建议：1. 继续保持良好的情绪管理习惯；2. 分享你的情绪调节经验帮助他人；3. 注意劳逸结合，避免长期处于高压状态；4. 不断学习新的情绪管理技巧。' 
            },
            { 
                label: '情绪极其稳定', 
                min: 86, 
                max: 100, 
                text: '你的情绪稳定性达到了极高水平，拥有出色的情绪调节能力，无论面对何种情况都能保持冷静和理性，这是非常难得的特质。', 
                advice: '建议：1. 考虑将你的情绪管理经验传授给他人；2. 在团队中发挥情绪稳定器的作用；3. 注意关注自己的情绪需求，避免过度压抑；4. 继续保持身心健康的生活方式。' 
            }
        ]
    };

    // 注册测试数据集
    window.TestDatasets = window.TestDatasets || {};
    window.TestDatasets[dataset.id] = dataset;
    
    // 兼容性支持：将数据集也注册到常用变量名
    window.testDataset = window.testDataset || dataset;
    window.dataset = window.dataset || dataset;
})();