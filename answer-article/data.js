// 分类数据 - 围绕人生观、价值观、世界观、健康养生、人情世故重新规划
const categories = [
    { id: 'all', name: '全部' },
    { id: 'philosophy', name: '人生哲理' },
    { id: 'values', name: '价值观' },
    { id: 'worldview', name: '世界观' },
    { id: 'health', name: '健康养生' },
    { id: 'social_skills', name: '人情世故' }
];

// 资讯列表数据
const articles = [
    {
        id: '1',
        title: '贫穷与拖延的终极问答',
        category: 'philosophy',
        summary: '深入探讨贫穷与拖延之间的关系，分析拖延的心理机制，并提供有效的解决方案',
        date: '2023-11-20',
        views: 0,
        likes: 0,
        questions: [
            {
                id: 'q1',
                question: '贫穷和拖延到底是什么关系？',
                answer: '<p>贫穷的本质是拖延。很多人有能力改变，却总在关键时刻选择拖延，最终错失所有机会。</p><p style="font-weight: bold; color: #cb0000;">拖延不是懒，而是一种深层行为模式。</p>'
            },
            {
                id: 'q2',
                question: '为什么说拖延是"精神麻药"？',
                answer: '<p>因为长期贫困会带来巨大的生存焦虑（愁房租、凑学费），大脑像卡顿的手机，根本无法思考长远。</p><p>刷短视频、打游戏这种"一秒就爽"的事，成了唯一喘息——<span style="font-weight: bold;">这和麻药能暂时止痛，却解决不了病根是一个道理。</span></p>'
            },
            {
                id: 'q3',
                question: '拖延时，我们大脑里到底发生了什么？',
                answer: '<p>是你大脑里的两个系统在"打架"：</p><p>• 🐒动物脑（原始系统）：追求即时满足，高喊"现在爽就行！"。</p><p>• 👨💼人类脑（深思系统）：负责长远规划，但它非常耗电。</p><p style="color: #cb0000;">你越穷焦虑，人类脑就越容易"没电"，动物脑就越容易获胜，拖着你及时行乐。</p>'
            },
            {
                id: 'q4',
                question: '为什么穷人更难摆脱拖延？',
                answer: '<p>因为贫穷会带来巨大的"认知负荷"，就像三座大山：</p><p style="font-weight: bold;">1. 生存压力：每天一睁眼就是房租、债务。</p><p style="font-weight: bold;">2. 决策疲劳：在鸡毛蒜皮（比如买菜比价）上耗光了所有心力。</p><p style="font-weight: bold;">3. 环境干扰：身边环境吵闹，周围的人都在混日子。</p><p>你的心智带宽被这些事完全占满，根本无力思考未来。</p>'
            },
            {
                id: 'q5',
                question: '那到底怎样才能彻底破解拖延？',
                answer: '<p>别死磕意志力！要学会给大脑"减负"：</p><p>1. 🎯目标微型化：把"做自媒体"拆成"每天写100字"。</p><p>2. 🚫环境净化：学习时物理隔绝手机，书桌只放当前任务。</p><p>3. 🔋认知充电：每天花30分钟学东西（经济学、沟通技巧），给人类脑"充电"。</p><p>4. 😴保障睡眠：睡足7-8小时，睡眠是意志力的电池。</p>'
            },
            {
                id: 'q6',
                question: '对自己说！！！',
                answer: '<p style="font-weight: bold; color: #cb0000;">你拖掉的不是时间，是改变命运的机会。</p><p style="font-weight: bold; color: #cb0000;">这场战争是你与自己的较量。</p><p style="font-weight: bold; color: #cb0000;">现在，放下手机，去做那件5分钟就能让你变富的小事。</p>'
            }
        ]
    },
    {
        id: '2',
        title: '万能吵架秘诀——「只反击，不自证」',
        category: 'social_skills',
        summary: '揭示吵架总输的根本原因，教授"只反击，不自证"的沟通技巧，帮助你在争论中掌握主动权',
        date: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        questions: [
            {
                id: 'q1',
                question: '为什么我每次吵架都输？根本原因是什么？',
                answer: '<p>根源通常不是因为你嘴笨、反应慢或没道理，而是你掉进了<span style="font-weight: bold; color: #cb0000;">「疯狂自证」的陷阱</span>。一旦你开始努力解释"我不是这样的"，就等于亲手把话语权交给了对方，被动地接受审判。</p>'
            },
            {
                id: 'q2',
                question: '到底什么是"自证"？为什么说它是吵架的大忌？',
                answer: '<p>自证，就是别人指责你时，你拼命解释、证明自己没错。</p><p>它是大忌，因为：</p><p>• <span style="font-weight: bold;">心理上认输：</span>你默认了对方有审判你的资格。</p><p>• <span style="font-weight: bold;">节奏被带走：</span>对方的目的不是听你讲道理，而是让你陷入被动。你越解释，对方越觉得攻击有效，只会得寸进尺。</p><p>例如：</p><p>• 对方说你"不专业"，你立马罗列自己做过的大项目。对方反而会说："看，说你两句就急着显摆，这不就是不专业吗？"</p><p>• 你防守得越努力，就越像个被审判的被告。</p>'
            },
            {
                id: 'q3',
                question: '那正确的做法——"只反击，不自证"的核心是什么？',
                answer: '<p style="font-weight: bold; color: #cb0000;">核心是转移战场。</p><p>不接对方的指控，而是把质疑的矛头直接指回对方本人。不解释"我专不专业"，而是质问"你凭什么judge我？"；不证明"我负不负责"，而是反问"你呢？"</p>'
            },
            {
                id: 'q4',
                question: '具体可以怎么"反击"？有没有话术示例？',
                answer: '<p>当对方攻击你时，可以用这三招直接反击：</p><p style="font-weight: bold;">1. 攻击你能力时 → 质疑他的标准</p><p>◦ "你凭什么觉得这样不行？你的标准是什么？"</p><p>◦ "你有更好的办法吗？请拿出来。"</p><p style="font-weight: bold;">2. 攻击你品格时 → 指出他的双标</p><p>◦ "你说我自私，那你刚才为了自己利益否决大家的提议，算不算自私？"</p><p style="font-weight: bold;">3. 攻击你选择时 → 挑战他的逻辑</p><p>◦ "你说这个方法好，为什么你自己从来不用？"</p><p>切记：反击是针对观点和行为，不是进行人身攻击。目的是暴露对方逻辑的漏洞，而非骂人。</p>'
            },
            {
                id: 'q5',
                question: '为什么我们一被指责，就忍不住想自证？',
                answer: '<p>主要有三个心理弱点：</p><p>1. <span style="font-weight: bold;">过度寻求认可：</span>内心觉得"必须让对方承认我没错"，害怕被负面评价。</p><p>2. <span style="font-weight: bold;">防御性本能：</span>被质疑时，第一反应是自我保护，而解释是最直接的方式。</p><p>3. <span style="font-weight: bold;">误解吵架本质：</span>错以为吵架是"辨明真理"，其实大多数争吵争的是情绪和主动权。</p>'
            },
            {
                id: 'q6',
                question: '学会"只反击不自证"能带来什么改变？',
                answer: '<p>你会实现三个层面的跃升：</p><p>• <span style="font-weight: bold;">心态上：</span>跳出"受害者"角色，不再紧绷着为自己辩护。</p><p>• <span style="font-weight: bold;">主动权上：</span>夺回话语权，让攻击者变成防守方。</p><p>• <span style="font-weight: bold;">气场上：</span>让对方明白，攻击你是要付出代价的，从此不敢随意拿捏你。</p>'
            },
            {
                id: 'q7',
                question: '关于面对质疑的忠告？',
                answer: '<p style="font-weight: bold; color: #cb0000;">你无需向任何人证明你存在的合理性。</p><p style="font-weight: bold;">吵架总输，不是因为嘴笨，是因为你太喜欢解释。</p><p>从今天起，停止自证，学会反击。当别人知道指责你会被反将一军时，自然就学会了尊重。</p>'
            }
        ]
    },
    {
        id: '3',
        title: '实现跨越式成长——拥抱三种「难熬」的状态',
        category: 'philosophy',
        summary: '揭示反常识的成长真相，说明痛苦、空白(迷茫)、高压这三种令人难受的状态如何成为成长加速器',
        date: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        questions: [
            {
                id: 'q1',
                question: '什么是反常识的成长真相？',
                answer: '<p>真正的跨越式成长，往往不来自于每日温和的努力（如看书、思考），而是被<span style="font-weight: bold; color: #cb0000;">痛苦、空白（迷茫）、高压</span>这三种令人难受的状态逼出来的。缓慢进步靠积累，但蜕变靠的是<span style="font-weight: bold;">打破平衡</span>。</p>'
            },
            {
                id: 'q2',
                question: '为什么说"难熬的状态"才是成长的加速器？',
                answer: '<p>因为成长本质是"打破原有认知和行为模式"的过程。唯有在这些状态下，你才会被迫跳出舒适区：</p><p><span style="font-weight: bold;">痛苦 → 唤醒认知</span></p><p>平时知道缺点却懒得改，但被机会碾压、因能力不足而错过重要人事时，钻心的痛苦才会让你真正觉醒，打破懒惰和拖延。</p><p><span style="font-weight: bold;">空白（迷茫期）→ 沉淀思考</span></p><p>痛苦之后若不停下来反思，而是用刷视频、找事做填满时间，成长不会发生。空白期是"成长的消化器"，让你想清楚自己要什么、该放弃什么。</p><p><span style="font-weight: bold;">高压 → 激活潜能</span></p><p>被逼到绝境时（如限期完成陌生任务、必须达成高目标），高压会激发专注力与能力，就像肌肉在超负荷训练后才会变强。</p>'
            },
            {
                id: 'q3',
                question: '主动拥抱这些状态后，人会有什么改变？',
                answer: '<p>你将获得三种关键能力：</p><p><span style="font-weight: bold;">主动破局的警觉</span>：不再逃避困难，反而会主动"找苦吃"（如怕社交就参加陌生聚会），以防在舒适区中被淘汰。</p><p><span style="font-weight: bold;">直面空白的耐心</span>：懂得留出时间复盘、梳理方向，明白"清空旧认知，才能装进新思考"。</p><p><span style="font-weight: bold;">扛住高压的韧劲</span>：把挑战视为提升机会，即使熬夜试错也不轻易放弃，因为清楚"高压是激活潜能的钥匙"。</p>'
            },
            {
                id: 'q4',
                question: '为什么大多数人不敢主动进入这些状态？',
                answer: '<p>三大心理阻碍：</p><p><span style="font-weight: bold;">用"安稳"包装逃避</span>：用"平淡是真""别折腾"等借口，掩盖不敢挑战的真实心理。</p><p><span style="font-weight: bold;">对痛苦的本能恐惧</span>：怕搞砸、怕更糟，宁愿缓慢进步也不敢冒险。</p><p><span style="font-weight: bold;">被"小努力"迷惑</span>：误以为每天读几页书就是成长，实则没有打破原有认知，只是低水平重复。</p>'
            },
            {
                id: 'q5',
                question: '如何才能主动迈出加速成长的第一步？',
                answer: '<p><span style="font-weight: bold; color: #cb0000;">主动制造"不适感"，从小处切入，打破惯性循环：</span></p><p><span style="font-weight: bold;">制造小痛苦</span>：每周做一件略超舒适区的事（如给陌生客户打电话、公开分享观点）。</p><p><span style="font-weight: bold;">留出空白期</span>：每月抽一天关机复盘，思考收获与调整方向。</p><p><span style="font-weight: bold;">设定高压目标</span>：公开承诺3个月学会新技能，或主动承担稍难任务，用外部压力逼自己行动。</p><p><span style="font-weight: bold;">关键</span>：成长不是靠"准备好了再开始"，而是靠"开始了才准备好"。不要怕做不好，第一个小行动，就是突破自我设限的真正起点。</p>'
            }
        ]
    },
    {
        id: '4',
        title: '财富密码：真正拉开差距的，根本不是能力，而是欲望',
        category: 'philosophy',
        summary: '揭示赚钱的核心密码不是能力而是欲望，分析为什么大多数人无法突破财富瓶颈，并提供点燃赚钱欲望的具体方法',
        date: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        questions: [
            {
                id: 'q1',
                question: '为什么我总说想赚钱，却始终困在原地？根本原因是什么？',
                answer: '<p>根本原因通常不是能力、机会或运气，而是你内心深处对"必须赚钱"的欲望不够强烈。你没有那种"不改变就坐立难安"的执念，大脑便自动满足于"饿不死"的现状。</p>'
            },
            {
                id: 'q2',
                question: '为什么说"欲望"才是赚钱的核心密码？',
                answer: '<p>因为赚钱是一个不断打破舒适区的过程。唯有足够强的欲望，才能：</p><p>• 逼着你主动去寻找方法，而不是等待救赎。</p><p>• 让你睁开发现机会的眼睛，而不是抱怨没有机会。</p><p>• 支撑你扛过学习和尝试过程中的所有辛苦。</p>'
            },
            {
                id: 'q3',
                question: '当一个人赚钱的欲望真正被点燃后，会有哪些具体变化？',
                answer: '<p>你会获得三种关键状态：</p><p>1. 眼里有活的敏感度：从觉得"赚钱的事与我无关"变为主动思考"我能不能试试？"</p><p>2. 不怕吃苦的韧劲：为了目标和技能，自愿投入时间，遇到挫折会复盘而不是放弃。</p><p>3. 非成不可的执念：把赚钱目标当作必须完成的使命，拆解计划，日拱一卒。</p>'
            },
            {
                id: 'q4',
                question: '那为什么大多数人的"赚钱欲望"就是燃不起来？',
                answer: '<p>主要因为三大自我设限：</p><p>1. 用"知足/佛系"包装懒惰，给不行动找台阶下。</p><p>2. 对舒适区过度依赖，害怕改变带来的不确定性和失败。</p><p>3. 归因错误，将别人的成功归为运气，否定努力和欲望的价值。</p>'
            },
            {
                id: 'q5',
                question: '如果感觉自己动力不足，具体可以从哪几件事开始行动？',
                answer: '<p>立即做这三件事，给自己"添柴烧火"：</p><p>1. 目标具体化：写下"3个月内副业月入2000元"等非常具体的目标。</p><p>2. 每天投入一小时：雷打不动地学习一项具体技能（写作、剪辑、理财等）。</p><p>3. 优化信息环境：少接触消极言论，多看靠努力赚钱的真实案例，用故事点燃欲望。</p>'
            },
            {
                id: 'q6',
                question: '最后一句话，点醒我！',
                answer: '<p style="font-weight: bold; color: #cb0000;">这个时代，赚不到钱很少是因为没机会，而是因为你允许自己"没赚到"。</p><p>别再用"知足"掩盖懒惰，用"佛系"逃避压力。</p><p>从现在起，点燃那团"必须赚到钱"的火，让它烧光所有借口。</p><p>只有欲望够强，你迈出的每一步才是真正向目标前进。</p>'
            }
        ]
    }
];

// 获取所有资讯
function getAllArticles() {
    return articles;
}

// 根据分类获取资讯
function getArticlesByCategory(categoryId) {
    if (categoryId === 'all') {
        return articles;
    }
    return articles.filter(article => article.category === categoryId);
}

// 根据ID获取文章详情
function getArticleById(articleId) {
    return articles.find(article => article.id === articleId);
}

// 获取分类信息
function getCategoryById(categoryId) {
    return categories.find(category => category.id === categoryId) || { name: '全部' };
}