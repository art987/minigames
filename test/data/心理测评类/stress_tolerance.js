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
        title: '压力承受能力测试',  // 测试标题
        description: '本测试包含20道题目，全面评估您的压力应对和承受能力。',  // 测试描述
        estimateMinutes: 5,  // 估计完成时间（分钟）
    });

    // 定义测试数据集
    var dataset = {
        id: testId,  // 自动从文件名获取，无需修改
        title: '压力承受能力测试',
        description: '本测试包含20道题目，全面评估您的压力应对和承受能力。',
        questions: [
            // 压力承受能力测试题目
            {
                text: '当你面临多个截止日期临近的任务时，你会感到？',
                multi: false,
                options: [
                    { label: '极度焦虑，无法集中注意力', score: 2 },
                    { label: '有些紧张，但能有序处理', score: 4 },
                    { label: '充满动力，有效规划时间', score: 5 }
                ]
            },
            {
                text: '在工作/学习中遇到难题时，你通常会？',
                multi: false,
                options: [
                    { label: '感到沮丧，容易放弃', score: 2 },
                    { label: '暂时感到压力，但会寻求帮助', score: 4 },
                    { label: '将其视为挑战，积极寻找解决方案', score: 5 }
                ]
            },
            {
                text: '当你感到压力很大时，你会如何释放压力？',
                multi: false,
                options: [
                    { label: '很少主动释放，通常压抑在心里', score: 2 },
                    { label: '偶尔通过简单方式释放（如散步、听音乐）', score: 4 },
                    { label: '有固定有效的减压方法，并定期使用', score: 5 }
                ]
            },
            {
                text: '当你被别人批评或否定时，你会？',
                multi: false,
                options: [
                    { label: '感到非常受伤，长时间难以释怀', score: 2 },
                    { label: '有些不舒服，但会尝试理解对方的立场', score: 4 },
                    { label: '冷静接受，思考其中的合理成分', score: 5 }
                ]
            },
            {
                text: '在长时间连续工作/学习后，你的状态如何？',
                multi: false,
                options: [
                    { label: '身心俱疲，效率大幅下降', score: 2 },
                    { label: '感到疲惫，但还能坚持完成任务', score: 4 },
                    { label: '依然保持良好状态，能够持续高效工作', score: 5 }
                ]
            },
            {
                text: '当你的计划被意外打乱时，你会？',
                multi: false,
                options: [
                    { label: '感到烦躁，不知所措', score: 2 },
                    { label: '有些失望，但会尝试调整计划', score: 4 },
                    { label: '迅速适应变化，制定新的解决方案', score: 5 }
                ]
            },
            {
                text: '面对突发的紧急情况时，你的反应是？',
                multi: false,
                options: [
                    { label: '惊慌失措，无法冷静应对', score: 2 },
                    { label: '有些紧张，但能勉强处理', score: 4 },
                    { label: '保持冷静，迅速采取有效行动', score: 5 }
                ]
            },
            {
                text: '当你需要同时处理多项任务时，你会？',
                multi: false,
                options: [
                    { label: '感到混乱，经常出错', score: 2 },
                    { label: '有些压力，但能完成大部分任务', score: 4 },
                    { label: '有条不紊，高效完成各项任务', score: 5 }
                ]
            },
            {
                text: '当你感到工作/学习压力过大时，会出现哪些身体反应？',
                multi: false,
                options: [
                    { label: '经常头痛、失眠或出现其他明显不适', score: 2 },
                    { label: '偶尔感到疲劳或轻微不适', score: 4 },
                    { label: '很少出现身体不适，能够很好地调节', score: 5 }
                ]
            },
            {
                text: '你如何看待生活中的压力？',
                multi: false,
                options: [
                    { label: '压力是负担，应该尽量避免', score: 2 },
                    { label: '压力不可避免，但可以尽量减少', score: 4 },
                    { label: '压力是成长的动力，能够促进进步', score: 5 }
                ]
            },
            {
                text: '当你在竞争激烈的环境中，你的表现如何？',
                multi: false,
                options: [
                    { label: '感到压力巨大，表现失常', score: 2 },
                    { label: '有些紧张，但基本能发挥正常水平', score: 4 },
                    { label: '越有竞争，表现越出色', score: 5 }
                ]
            },
            {
                text: '你是否有良好的时间管理习惯？',
                multi: false,
                options: [
                    { label: '很少规划时间，经常拖延', score: 2 },
                    { label: '有时会规划，但执行不够严格', score: 4 },
                    { label: '有明确的时间规划，并严格执行', score: 5 }
                ]
            },
            {
                text: '当你需要在公众场合发言时，你会感到？',
                multi: false,
                options: [
                    { label: '极度紧张，甚至无法正常表达', score: 2 },
                    { label: '有些紧张，但能完成发言', score: 4 },
                    { label: '自信从容，能够清晰表达观点', score: 5 }
                ]
            },
            {
                text: '你如何处理与他人的冲突？',
                multi: false,
                options: [
                    { label: '尽量回避冲突，避免正面交锋', score: 2 },
                    { label: '有些焦虑，但会尝试解决问题', score: 4 },
                    { label: '冷静面对，积极沟通解决', score: 5 }
                ]
            },
            {
                text: '当你面临重要决策时，你会？',
                multi: false,
                options: [
                    { label: '犹豫不决，害怕做出错误选择', score: 2 },
                    { label: '有些纠结，但最终能做出决定', score: 4 },
                    { label: '权衡利弊，果断做出决策', score: 5 }
                ]
            },
            {
                text: '你是否有良好的睡眠习惯？',
                multi: false,
                options: [
                    { label: '经常失眠，睡眠质量差', score: 2 },
                    { label: '偶尔失眠，睡眠质量一般', score: 4 },
                    { label: '睡眠质量良好，精力充沛', score: 5 }
                ]
            },
            {
                text: '当你感到压力时，你会如何调整自己的心态？',
                multi: false,
                options: [
                    { label: '很少主动调整，任由情绪低落', score: 2 },
                    { label: '尝试自我安慰，但效果有限', score: 4 },
                    { label: '有有效的心理调节方法，能够快速恢复', score: 5 }
                ]
            },
            {
                text: '你是否有广泛的兴趣爱好？',
                multi: false,
                options: [
                    { label: '几乎没有兴趣爱好', score: 2 },
                    { label: '有少量兴趣爱好，但很少投入时间', score: 4 },
                    { label: '有多种兴趣爱好，并且定期投入时间', score: 5 }
                ]
            },
            {
                text: '你如何看待工作/学习与生活的平衡？',
                multi: false,
                options: [
                    { label: '经常为了工作/学习牺牲个人生活', score: 2 },
                    { label: '尽量平衡，但有时会顾此失彼', score: 4 },
                    { label: '能够很好地平衡工作/学习与生活', score: 5 }
                ]
            },
            {
                text: '当你遇到挫折时，你会？',
                multi: false,
                options: [
                    { label: '感到沮丧，容易放弃', score: 2 },
                    { label: '有些失望，但会继续尝试', score: 4 },
                    { label: '将挫折视为成长机会，更加努力', score: 5 }
                ]
            }
        ],
        resultRanges: [
            // 定义测试结果范围
            {
                label: '压力承受能力较低',
                min: 0,
                max: 40,
                text: '你的压力承受能力相对较低，容易受到压力的负面影响。在面对压力情境时，你可能会感到焦虑、无助或疲惫。',
                advice: '建议：1. 学习基本的压力管理技巧，如深呼吸、冥想等；2. 建立合理的目标，避免过度给自己施压；3. 培养健康的生活习惯，保证充足的睡眠和适当的运动；4. 寻求支持，与亲友分享你的感受，必要时考虑专业心理咨询。'
            },
            {
                label: '压力承受能力一般',
                min: 41,
                max: 65,
                text: '你的压力承受能力处于中等水平，能够应对日常生活中的大多数压力情境，但在面对较大压力时仍可能感到不适。',
                advice: '建议：1. 继续学习和实践有效的压力管理策略；2. 识别自己的压力源，提前做好应对准备；3. 培养积极的心态，学会从压力中寻找成长的机会；4. 建立良好的社会支持网络，在需要时寻求帮助。'
            },
            {
                label: '压力承受能力较强',
                min: 66,
                max: 85,
                text: '你的压力承受能力较强，能够有效地应对各种压力情境，保持相对稳定的情绪和高效的表现。',
                advice: '建议：1. 继续保持良好的压力管理习惯；2. 分享你的压力应对经验，帮助他人；3. 注意劳逸结合，避免长期处于高压状态；4. 不断学习新的压力管理技巧，提升自己的应对能力。'
            },
            {
                label: '压力承受能力极强',
                min: 86,
                max: 100,
                text: '你的压力承受能力非常强，能够将压力转化为动力，在高压环境中依然保持出色的表现和积极的心态。',
                advice: '建议：1. 利用你的优势，在团队中发挥稳定情绪的作用；2. 注意关注自己的身心健康，避免过度消耗；3. 考虑将你的压力管理经验传授给他人；4. 继续保持健康的生活方式和积极的心态。'
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