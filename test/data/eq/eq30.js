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
        title: '全面情商评估测试',  // 测试标题
        description: '本测试包含30道题目，全面评估您的情绪识别、管理、理解和运用能力。',  // 测试描述
        estimateMinutes: 8  // 估计完成时间（分钟）
    });

    // 定义测试数据集
    var dataset = {
        id: testId,  // 自动从文件名获取，无需修改
        questions: [
            // 情绪识别部分
            {
                text: '当你在团队中工作时，你通常能察觉到同事细微的情绪变化吗？',
                multi: false,
                options: [
                    { label: '很少注意到', score: 0 },
                    { label: '偶尔能注意到明显的情绪变化', score: 1 },
                    { label: '经常能察觉细微的情绪变化', score: 2 },
                    { label: '几乎总是能准确识别他人的情绪', score: 3 }
                ]
            },
            {
                text: '你是否清楚地了解自己在不同情境下的情绪反应模式？',
                multi: false,
                options: [
                    { label: '不清楚，情绪常来得突然', score: 0 },
                    { label: '对某些情境下的情绪反应有一些了解', score: 1 },
                    { label: '大部分情况下清楚自己的情绪模式', score: 2 },
                    { label: '非常清楚自己在各种情境下的情绪反应', score: 3 }
                ]
            },
            {
                text: '当别人向你诉说困扰时，你是否能准确理解他们的感受？',
                multi: false,
                options: [
                    { label: '很难理解，不知道该如何回应', score: 0 },
                    { label: '能理解表面情绪，但不一定能体会深层感受', score: 1 },
                    { label: '通常能较好地理解对方的感受', score: 2 },
                    { label: '总是能设身处地理解对方的感受', score: 3 }
                ]
            },
            {
                text: '你能否通过观察肢体语言和语调，判断他人是否在隐藏真实情绪？',
                multi: false,
                options: [
                    { label: '几乎不能', score: 0 },
                    { label: '偶尔能察觉明显的不一致', score: 1 },
                    { label: '经常能察觉到细微的不一致', score: 2 },
                    { label: '几乎总是能准确判断', score: 3 }
                ]
            },
            {
                text: '你是否善于识别自己的情绪触发点？',
                multi: false,
                options: [
                    { label: '不清楚自己的情绪触发点', score: 0 },
                    { label: '对某些触发点有一些了解', score: 1 },
                    { label: '清楚大部分情绪触发点', score: 2 },
                    { label: '非常清楚自己的所有情绪触发点', score: 3 }
                ]
            },

            // 情绪管理部分
            {
                text: '当你感到愤怒或沮丧时，你通常会如何处理？',
                multi: false,
                options: [
                    { label: '无法控制，会直接表达或爆发', score: 0 },
                    { label: '努力压抑，但情绪仍会影响行为', score: 1 },
                    { label: '尝试转移注意力或短暂离开现场', score: 2 },
                    { label: '能够冷静分析并适当表达情绪', score: 3 }
                ]
            },
            {
                text: '面对压力情境，你能否保持冷静和理性？',
                multi: false,
                options: [
                    { label: '压力下容易慌乱或做出冲动决定', score: 0 },
                    { label: '压力大时会紧张，但基本能完成任务', score: 1 },
                    { label: '大多数压力情境下能保持冷静', score: 2 },
                    { label: '压力越大越冷静，能高效解决问题', score: 3 }
                ]
            },
            {
                text: '当你经历负面情绪时，你是否有有效的应对策略？',
                multi: false,
                options: [
                    { label: '没有特定策略，通常等待情绪自然消退', score: 0 },
                    { label: '有一些应对方法，但效果不稳定', score: 1 },
                    { label: '有较为有效的应对策略', score: 2 },
                    { label: '有多种高效的情绪调节策略，能快速恢复', score: 3 }
                ]
            },
            {
                text: '你能否在需要的时候，有意识地调整自己的情绪状态？',
                multi: false,
                options: [
                    { label: '几乎不能主动调整情绪', score: 0 },
                    { label: '有时候能尝试调整，但效果有限', score: 1 },
                    { label: '多数情况下能成功调整情绪', score: 2 },
                    { label: '能根据需要灵活调整情绪状态', score: 3 }
                ]
            },
            {
                text: '你是否善于从消极情绪中发现积极的一面？',
                multi: false,
                options: [
                    { label: '很难从消极情绪中看到积极面', score: 0 },
                    { label: '偶尔能找到一些积极因素', score: 1 },
                    { label: '通常能从困难中发现成长机会', score: 2 },
                    { label: '总是能从消极经历中获得积极启示', score: 3 }
                ]
            },

            // 人际关系部分
            {
                text: '在与他人发生分歧时，你通常会：',
                multi: false,
                options: [
                    { label: '坚持自己的观点，难以接受不同意见', score: 0 },
                    { label: '虽然保留自己的意见，但会尊重对方', score: 1 },
                    { label: '尝试理解对方的立场，寻求共同点', score: 2 },
                    { label: '能站在双方角度思考，寻找双赢解决方案', score: 3 }
                ]
            },
            {
                text: '你是否善于倾听他人的想法和感受？',
                multi: false,
                options: [
                    { label: '通常急于表达自己，不太注意倾听', score: 0 },
                    { label: '能倾听，但容易分心或打断他人', score: 1 },
                    { label: '大多数情况下能认真倾听', score: 2 },
                    { label: '是一个出色的倾听者，能让对方感到被理解', score: 3 }
                ]
            },
            {
                text: '当你需要向他人反馈负面信息时，你会：',
                multi: false,
                options: [
                    { label: '直接指出问题，不考虑对方感受', score: 0 },
                    { label: '尽量委婉，但信息可能不够明确', score: 1 },
                    { label: '既能表达清楚，又能考虑对方感受', score: 2 },
                    { label: '善于用建设性方式给予反馈，促进对方成长', score: 3 }
                ]
            },
            {
                text: '在团队合作中，你是否善于协调不同个性的成员？',
                multi: false,
                options: [
                    { label: '不善于处理不同个性，容易产生冲突', score: 0 },
                    { label: '能基本合作，但可能忽视某些成员的需求', score: 1 },
                    { label: '通常能较好地协调团队成员', score: 2 },
                    { label: '善于发挥每个人的优势，创造和谐氛围', score: 3 }
                ]
            },
            {
                text: '你是否容易与不同背景的人建立良好关系？',
                multi: false,
                options: [
                    { label: '只与相似背景的人容易相处', score: 0 },
                    { label: '需要时间适应，但最终能建立关系', score: 1 },
                    { label: '通常能较快与不同背景的人建立良好关系', score: 2 },
                    { label: '善于与各种背景的人建立深层次连接', score: 3 }
                ]
            },

            // 情绪利用部分
            {
                text: '你是否能利用积极情绪提高工作或学习效率？',
                multi: false,
                options: [
                    { label: '情绪对效率影响不大，主要靠意志力', score: 0 },
                    { label: '积极情绪时效率会高一些，但不会主动利用', score: 1 },
                    { label: '有时会利用积极情绪来提高效率', score: 2 },
                    { label: '善于通过调节情绪状态来优化表现', score: 3 }
                ]
            },
            {
                text: '在创意工作中，你是否会有意利用情绪状态？',
                multi: false,
                options: [
                    { label: '很少考虑情绪对创意的影响', score: 0 },
                    { label: '情绪有时会影响创意，但不会主动控制', score: 1 },
                    { label: '会尝试在特定情绪状态下进行创意工作', score: 2 },
                    { label: '能根据不同任务需要，调整情绪状态以促进创意', score: 3 }
                ]
            },
            {
                text: '你是否善于将压力转化为动力？',
                multi: false,
                options: [
                    { label: '压力通常会让我感到沮丧或焦虑', score: 0 },
                    { label: '一定压力下能完成任务，但不会转化为动力', score: 1 },
                    { label: '中等压力下能转化为一定的动力', score: 2 },
                    { label: '善于将压力有效转化为前进的动力', score: 3 }
                ]
            },
            {
                text: '当你需要说服他人时，你是否会考虑对方的情绪状态？',
                multi: false,
                options: [
                    { label: '主要关注自己的观点，很少考虑对方情绪', score: 0 },
                    { label: '意识到情绪的重要性，但不知道如何利用', score: 1 },
                    { label: '会考虑对方情绪，并调整沟通方式', score: 2 },
                    { label: '非常善于洞察并利用对方的情绪状态达成共识', score: 3 }
                ]
            },
            {
                text: '你是否能利用情绪信息来做出更好的决策？',
                multi: false,
                options: [
                    { label: '做决策时主要依靠理性分析，忽略情绪', score: 0 },
                    { label: '有时会考虑情绪因素，但不够系统', score: 1 },
                    { label: '通常能平衡理性分析和情绪信息', score: 2 },
                    { label: '善于整合理性分析和情绪洞察做出明智决策', score: 3 }
                ]
            },

            // 自我激励部分
            {
                text: '当面对挫折时，你通常会：',
                multi: false,
                options: [
                    { label: '容易沮丧，需要很长时间恢复', score: 0 },
                    { label: '会感到失望，但能慢慢调整', score: 1 },
                    { label: '很快振作起来，寻找解决办法', score: 2 },
                    { label: '将挫折视为成长机会，迅速调整策略', score: 3 }
                ]
            },
            {
                text: '你是否能为自己设定并坚持长期目标？',
                multi: false,
                options: [
                    { label: '很难设定长期目标，容易放弃', score: 0 },
                    { label: '能设定目标，但常因困难而偏离', score: 1 },
                    { label: '通常能坚持目标，直到完成', score: 2 },
                    { label: '善于设定并分解目标，保持持续动力', score: 3 }
                ]
            },
            {
                text: '你是否善于在没有外部奖励的情况下保持动力？',
                multi: false,
                options: [
                    { label: '需要外部激励才能保持动力', score: 0 },
                    { label: '有时能自我激励，但持久性不够', score: 1 },
                    { label: '通常能找到内在动力来源', score: 2 },
                    { label: '即使没有外部奖励，也能保持高度自我激励', score: 3 }
                ]
            },
            {
                text: '当你取得成就时，你会：',
                multi: false,
                options: [
                    { label: '很少关注自己的成就，很快转向下一个目标', score: 0 },
                    { label: '短暂庆祝，但很快忘记', score: 1 },
                    { label: '适当庆祝，并总结成功经验', score: 2 },
                    { label: '既庆祝成就，又能保持谦逊，为未来设定更高目标', score: 3 }
                ]
            },
            {
                text: '你是否能在面对困难时保持积极态度？',
                multi: false,
                options: [
                    { label: '困难容易让我产生消极想法', score: 0 },
                    { label: '尽力保持积极，但有时会动摇', score: 1 },
                    { label: '通常能保持积极态度面对困难', score: 2 },
                    { label: '即使在最困难的情况下，也能保持积极和韧性', score: 3 }
                ]
            },

            // 社交意识部分
            {
                text: '你是否善于识别团队的整体情绪氛围？',
                multi: false,
                options: [
                    { label: '很少注意团队的整体情绪', score: 0 },
                    { label: '能察觉到明显的情绪氛围变化', score: 1 },
                    { label: '通常能识别团队的情绪氛围', score: 2 },
                    { label: '非常善于感知并理解团队的整体情绪状态', score: 3 }
                ]
            },
            {
                text: '在社交场合中，你是否能快速适应不同的社交规范？',
                multi: false,
                options: [
                    { label: '很难适应不同的社交场合', score: 0 },
                    { label: '需要时间观察才能适应新的社交环境', score: 1 },
                    { label: '通常能较快适应不同的社交规范', score: 2 },
                    { label: '能迅速适应各种社交环境，表现得体', score: 3 }
                ]
            },
            {
                text: '你是否善于发现他人的优点和潜力？',
                multi: false,
                options: [
                    { label: '很少关注他人的优点，更容易看到不足', score: 0 },
                    { label: '能注意到他人的明显优点', score: 1 },
                    { label: '通常能发现他人的优点和潜力', score: 2 },
                    { label: '非常善于识别并欣赏他人的独特优势', score: 3 }
                ]
            },
            {
                text: '你是否能敏感地察觉到他人的需求？',
                multi: false,
                options: [
                    { label: '很少注意到他人的需求', score: 0 },
                    { label: '能察觉到明显的需求', score: 1 },
                    { label: '通常能较好地感知他人的需求', score: 2 },
                    { label: '非常善于洞察他人未表达的需求', score: 3 }
                ]
            },
            {
                text: '在跨文化交流中，你是否能理解并尊重不同的情感表达方式？',
                multi: false,
                options: [
                    { label: '很难理解不同文化的情感表达', score: 0 },
                    { label: '能接受表面差异，但不一定理解深层含义', score: 1 },
                    { label: '通常能理解并尊重不同的情感表达方式', score: 2 },
                    { label: '非常善于跨越文化差异，理解各种情感表达', score: 3 }
                ]
            }
        ],
        resultRanges: [
            // 定义测试结果范围
            { 
                label: '情商基础水平', 
                min: 0, 
                max: 30, 
                text: '你的情绪意识和管理能力仍有较大提升空间。情绪识别、自我控制和人际互动是可以通过学习和实践来改善的重要技能。', 
                advice: '建议：1. 开始记录每日情绪日记，增强自我觉察；2. 学习基本的情绪识别技巧，如观察面部表情和肢体语言；3. 在回应情绪前先深呼吸并停顿几秒钟；4. 尝试从他人角度思考问题。' 
            },
            { 
                label: '情商良好水平', 
                min: 31, 
                max: 60, 
                text: '你具备基本的情绪智能，能较好地识别和管理自己的情绪，在人际互动中也能表现得体。继续发展这些技能将帮助你在个人和职业生活中取得更大成功。', 
                advice: '建议：1. 深化情绪自我觉察，探索情绪背后的深层需求；2. 练习更有效的情绪调节策略；3. 提升倾听和共情能力；4. 学习如何在压力下保持冷静并做出明智决策。' 
            },
            { 
                label: '情商优秀水平', 
                min: 61, 
                max: 75, 
                text: '你拥有较高的情绪智能，善于识别、理解和管理情绪，在人际关系中表现出色。这些能力为你在团队合作和领导方面提供了优势。', 
                advice: '建议：1. 进一步发展情绪调节的高级技巧；2. 学习如何利用情绪促进创意和决策；3. 培养指导和支持他人情绪成长的能力；4. 探索如何在组织层面应用情绪智能。' 
            },
            { 
                label: '情商卓越水平', 
                min: 76, 
                max: 90, 
                text: '你的情绪智能达到了卓越水平，拥有出色的自我觉察、情绪管理、人际理解和社会技能。这些能力使你在各种情境中都能游刃有余，成为他人的榜样。', 
                advice: '建议：1. 考虑将你的情绪智能专长传授给他人；2. 在复杂的人际和组织挑战中发挥你的调解和领导能力；3. 继续探索情绪智能的前沿研究和实践；4. 用你的能力创造积极的社会影响。' 
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