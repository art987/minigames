// 分类数据 - 按照新规划的八个分类
const categories = [
    { id: 'all', name: '全部' },
    { id: 'self_growth', name: '自我认知与成长' },
    { id: 'values_worldview', name: '三观与价值观' },
    { id: 'emotion_family', name: '情感与家庭关系' },
    { id: 'career_wealth', name: '事业与财富' },
    { id: 'learning_thinking', name: '学习与思维方式' },
    { id: 'health_balance', name: '健康与身心平衡' },
    { id: 'social_relations', name: '社会与人际关系' },
    { id: 'life_challenges', name: '人生困境与转折' }
];

// 资讯列表数据
const articles = [
    {
        id: '1',
        title: '贫穷与拖延的终极突围指南',
        category: 'self_growth',
        summary: '5分钟搞懂：为什么越穷越拖延，以及如何打破这个恶性循环的实用方法',
        date: '2023-11-20',
        views: 18562,
        likes: 1452,
        questions: [
            {
                id: 'q1',
                question: '贫穷和拖延到底有什么关系？',
                answer: '<p>贫穷的本质是拖延。很多人有能力改变，但总在关键时拖一拖，最终机会全没了。</p><p style="font-weight: bold; color: #cb0000;">记住：拖延不是懒，是一种需要打破的行为模式。</p>'
            },
            {
                id: 'q2',
                question: '为什么我总控制不住想刷手机？',
                answer: '<p>因为长期焦虑（愁钱、愁未来）会让大脑像卡了的手机，根本没法思考长远。</p><p>刷视频、打游戏这种"一秒就爽"的事，成了唯一的心理安慰——<span style="font-weight: bold;">就像麻药能暂时止痛，却解决不了病根。</span></p>'
            },
            {
                id: 'q3',
                question: '拖延时，我脑子里到底在发生什么？',
                answer: '<p>是两个系统在"打架"：</p><p>• 🐒动物脑（原始系统）：就想"现在爽就行！"</p><p>• 👨💼人类脑（理性系统）：负责长远规划，但特别耗精力</p><p style="color: #cb0000;">你越焦虑，人类脑就越虚弱，动物脑就越容易赢，拖着你继续刷手机。</p>'
            },
            {
                id: 'q4',
                question: '现在就能用的「反拖延」方法？',
                answer: '<p>四步让你立刻行动：</p><p>1. 🎯目标微型化：把"做自媒体"改成"写100字"，小到不可能失败</p><p>2. 🚫物理隔绝干扰：手机调飞行模式放客厅，电脑只开当前任务页面</p><p>3. 🔋每天充电30分钟：学个小技能（比如10个Excel函数），给理性脑补充能量</p><p>4. 😴睡够7小时：睡眠是意志力的电池，缺觉肯定拖延</p>'
            },
            {
                id: 'q5',
                question: '最后，我该对自己说什么？',
                answer: '<p style="font-weight: bold; color: #cb0000;">你拖掉的不是时间，是改变命运的机会。</p><p style="font-weight: bold; color: #cb0000;">现在，放下手机，去做那件5分钟就能开始的小事。</p><p style="font-weight: bold; color: #cb0000;">这场战争，是你和自己的较量。</p>'
            }
        ]
    },
    {
        id: '2',
        title: '吵架不再输：只反击，不自证的沟通秘诀',
        category: 'social_relations',
        summary: '3分钟学会：为什么你吵架总输，以及如何用"只反击，不自证"轻松掌握话语权',
        date: new Date().toISOString().split('T')[0],
        views: 23781,
        likes: 1876,
        questions: [
            {
                id: 'q1',
                question: '为什么我吵架总输？问题出在哪？',
                answer: '<p>根本原因不是嘴笨或没道理，而是你掉进了<span style="font-weight: bold; color: #cb0000;">「疯狂自证」的陷阱</span>。一旦你开始解释"我不是这样的"，就等于把话语权拱手让人，被动接受审判。</p>'
            },
            {
                id: 'q2',
                question: '什么是"自证"？为什么不能自证？',
                answer: '<p>自证就是别人骂你时，你拼命证明自己没错。</p><p>这是大错，因为：</p><p>• <span style="font-weight: bold;">你默认了对方有资格审判你</span></p><p>• <span style="font-weight: bold;">对方越看你急，就越觉得攻击有效</span></p><p>比如：他说你"不专业"，你赶紧罗列成绩。他反而会说："看，说两句就急，这就是不专业！"</p>'
            },
            {
                id: 'q3',
                question: '那正确的做法是什么？',
                answer: '<p style="font-weight: bold; color: #cb0000;">核心就四个字：只反击，不自证。</p><p>不接他的指责，直接把问题抛回给他。不解释"我是不是这样"，而是问"你凭什么说我？"</p>'
            },
            {
                id: 'q4',
                question: '有哪些直接能用的反击话术？',
                answer: '<p>三种场景，直接套用：</p><p style="font-weight: bold;">1. 他说你能力差 → 质疑他的标准</p><p>◦ "你说我不行，那你的标准是什么？"</p><p>◦ "你有更好的办法吗？说来听听。"</p><p style="font-weight: bold;">2. 他说你品格差 → 指出他的双标</p><p>◦ "你说我自私，那你昨天为了自己利益否决大家意见，算什么？"</p><p style="font-weight: bold;">3. 他否定你的选择 → 挑战他的逻辑</p><p>◦ "你说这方法不好，那你自己为什么不用你说的好方法？"</p>'
            },
            {
                id: 'q5',
                question: '学会后，我会有什么变化？',
                answer: '<p style="font-weight: bold; color: #cb0000;">你无需向任何人证明你存在的合理性。</p><p>当你停止解释，开始反击，你会发现：</p><p>• 心态更稳：不再像个被审判的被告</p><p>• 掌握主动权：让攻击者变成防守方</p><p>• 气场变强：别人知道攻击你是要付出代价的</p><p>记住：真正的强大，从停止自证开始。</p>'
            }
        ]
    },
    {
        id: '3',
        title: '跨越式成长：主动拥抱让你难受的三种状态',
        category: 'self_growth',
        summary: '反常识的成长真相：痛苦、迷茫和高压，其实是你进步最快的时机',
        date: new Date().toISOString().split('T')[0],
        views: 12456,
        likes: 987,
        questions: [
            {
                id: 'q1',
                question: '为什么我努力很久，却没什么进步？',
                answer: '<p>因为真正的成长，往往不是来自每天温和的努力（比如看两页书），而是被<span style="font-weight: bold; color: #cb0000;">痛苦、迷茫、高压</span>这三种"难受状态"逼出来的。</p><p>缓慢进步靠积累，但<span style="font-weight: bold;">跨越式成长，靠的是打破舒适区</span>。</p>'
            },
            {
                id: 'q2',
                question: '为什么这些"难受状态"能促进成长？',
                answer: '<p>因为成长的本质是"打破旧模式"。这三种状态会推着你改变：</p><p><span style="font-weight: bold;">痛苦 → 逼你觉醒</span></p><p>平时知道缺点却懒得改，但当你因为能力不足错过重要机会时，那种钻心的痛才会真正唤醒你。</p><p><span style="font-weight: bold;">迷茫 → 让你沉淀</span></p><p>痛苦后别急着填满时间，留出空白期思考：我到底想要什么？该放弃什么？</p><p><span style="font-weight: bold;">高压 → 激活潜能</span></p><p>被 deadline 逼到绝路时，你会发现自己居然能做到以前想都不敢想的事。</p>'
            },
            {
                id: 'q3',
                question: '大多数人为什么不敢面对这些状态？',
                answer: '<p>三个心理障碍：</p><p>• 用"平淡是真"包装逃避，不敢挑战</p><p>• 对痛苦本能恐惧，怕搞砸、怕更糟</p><p>• 误以为每天读两页书就是成长，其实只是低水平重复</p>'
            },
            {
                id: 'q4',
                question: '现在就能开始的成长小方法？',
                answer: '<p><span style="font-weight: bold; color: #cb0000;">主动制造"小不适"，从小事开始突破：</span></p><p>1. <span style="font-weight: bold;">每周做一件害怕的事</span>：比如给陌生客户打电话、公开说两句话</p><p>2. <span style="font-weight: bold;">每月留一天空白</span>：关掉手机，复盘这月的得与失</p><p>3. <span style="font-weight: bold;">给自己定个稍微高一点的目标</span>：比如"3个月学会做短视频"，用外部压力逼自己行动</p><p style="font-weight: bold;">关键：成长不是准备好了再开始，而是开始了才准备好。</p>'
            }
        ]
    },
    {
        id: '4',
        title: '心流的7个真相：让你彻底爱上专注的感觉',
        category: 'learning_thinking',
        summary: '10分钟搞懂心流：让你做事专注、高效又快乐的底层逻辑和实用方法',
        date: new Date().toISOString().split('T')[0],
        views: 15678,
        likes: 1234,
        questions: [
            {
                id: 'q1',
                question: '心流到底是什么？一句话说清楚',
                answer: '<p>心流就是你完全"忘我"的状态——像打游戏忘了吃饭、写方案文思泉涌、做手工时全神贯注。这时你感觉不到时间在走，做完后特别满足。</p><p style="font-weight: bold; color: #cb0000;">本质：心流=专注+快乐+效率。</p>'
            },
            {
                id: 'q2',
                question: '心流能帮我解决什么实际问题？',
                answer: '<p>三个立竿见影的改变：</p><p><span style="font-weight: bold;">1. 告别拖延：</span>进入心流后，你会主动想做事，而不是靠意志力硬撑。</p><p><span style="font-weight: bold;">2. 效率提升3-5倍：</span>高度专注让你避开信息干扰，用同样时间做更多事。</p><p><span style="font-weight: bold;">3. 不再内耗：</span>沉浸做事时，焦虑、自我怀疑会自动消失。</p>'
            },
            {
                id: 'q3',
                question: '现在就能用的快速进入心流的方法？',
                answer: '<p>三个步骤，10分钟内进入状态：</p><p><span style="font-weight: bold;">1. 选对任务：</span>找一件"跳一跳够得着"的事——太难会焦虑，太简单会无聊。</p><p><span style="font-weight: bold;">2. 物理隔离干扰：</span>手机调飞行模式放远，电脑只开当前任务，戴耳塞或白噪音。</p><p><span style="font-weight: bold;">3. 先做5分钟：</span>告诉自己"就做5分钟"，启动后会自然进入状态。</p><p style="font-weight: bold; color: #cb0000;">关键：开始比完美更重要。</p>'
            },
            {
                id: 'q4',
                question: '为什么我总进不了心流？问题出在哪？',
                answer: '<p>三大阻碍，自查你中了几个：</p><p><span style="font-weight: bold;">1. 习惯碎片化：</span>刷短视频、秒回消息，大脑被训练得只能专注30秒。</p><p><span style="font-weight: bold;">2. 目标模糊：</span>不知道"具体做什么"或"做到什么程度"，无从下手。</p><p><span style="font-weight: bold;">3. 完美主义：</span>总想着"一次做好"，反而因压力太大无法开始。</p>'
            },
            {
                id: 'q5',
                question: '日常生活中，怎么让心流成为习惯？',
                answer: '<p>四件小事，30天养成心流体质：</p><p><span style="font-weight: bold;">1. 每天留1小时：</span>固定时间（如晚8-9点）做一件你感兴趣的事，不被打扰。</p><p><span style="font-weight: bold;">2. 建立"专注开关"：</span>比如开始前倒杯温水、戴同款耳机，用动作暗示大脑"要专注了"。</p><p><span style="font-weight: bold;">3. 记录并复制：</span>写下你进入心流的场景（如上午、安静房间），以后多创造类似环境。</p><p><span style="font-weight: bold;">4. 用番茄钟过渡：</span>从25分钟专注+5分钟休息开始，慢慢延长时间。</p>'
            },
            {
                id: 'q6',
                question: '最后，给我一个立刻行动的理由？',
                answer: '<p style="font-weight: bold; color: #cb0000;">心流不是天赋，是可以练出来的能力。</p><p>今天起，放下手机，认真做一件小事——</p><p>你会发现：当你不再对抗分心，而是享受做事本身时，专注带来的满足感，比刷100条短视频更持久。</p><p>这，就是心流的魔力。</p>'
            }
        ]
    },
    {
        id: '5',
        title: '财富密码：真正让你变富的，不是能力而是欲望',
        category: 'career_wealth',
        summary: '为什么你想赚钱却赚不到？这篇文章会告诉你，比能力更重要的是"必须赚钱"的欲望',
        date: new Date().toISOString().split('T')[0],
        views: 27890,
        likes: 2143,
        questions: [
            {
                id: 'q1',
                question: '为什么我总说想赚钱，却一直没改变？',
                answer: '<p>根本原因不是你没能力、没机会，而是你对"必须赚钱"的欲望不够强。你没有那种"不改变就活不下去"的紧迫感，所以大脑自动满足于"饿不死"的现状。</p>'
            },
            {
                id: 'q2',
                question: '为什么说"欲望"比能力更重要？',
                answer: '<p>因为赚钱的本质是不断打破舒适区。只有足够强的欲望，才能：</p><p>• 逼着你主动找方法，而不是等别人救你</p><p>• 让你眼睛里有活，看到别人看不到的机会</p><p>• 支撑你熬过学习和尝试的所有辛苦</p><p style="font-weight: bold; color: #cb0000;">记住：能力可以培养，但欲望是发动机。</p>'
            },
            {
                id: 'q3',
                question: '欲望被点燃后，人会有什么变化？',
                answer: '<p>你会获得三种关键状态：</p><p>1. <span style="font-weight: bold;">眼里有活</span>：从"这钱不好赚"变成"我能不能试试？"</p><p>2. <span style="font-weight: bold;">不怕吃苦</span>：愿意为目标投入时间，遇到挫折会想"怎么改进"而不是放弃</p><p>3. <span style="font-weight: bold;">非成不可</span>：把赚钱目标当成必须完成的事，拆解计划，每天推进一点点</p>'
            },
            {
                id: 'q4',
                question: '如何点燃自己赚钱的欲望？',
                answer: '<p>立刻做这三件事，给自己"添把火"：</p><p>1. <span style="font-weight: bold;">目标要具体</span>：别再说"我要赚大钱"，改成"3个月副业月入2000元"</p><p>2. <span style="font-weight: bold;">每天投入1小时</span>：雷打不动学一项实用技能（写作、剪辑、做PPT等）</p><p>3. <span style="font-weight: bold;">远离消极的人</span>：少听"赚钱难"的抱怨，多看看身边靠努力赚钱的真实案例</p>'
            },
            {
                id: 'q5',
                question: '最后一句话，点醒我！',
                answer: '<p style="font-weight: bold; color: #cb0000;">这个时代，赚不到钱很少是因为没机会，而是因为你允许自己"没赚到"。</p><p>别再用"知足"当借口，用"佛系"逃避压力。</p><p>从现在起，点燃那团"必须赚到钱"的火，让它烧光所有借口。</p><p>只有欲望够强，你迈出的每一步才是真正向目标前进。</p>'
            }
        ]
    },
    {
        id: '6',
        title: '解决问题靠的不是聪明，而是闭环思维',
        category: 'learning_thinking',
        summary: '3分钟学会：从稳情绪到出结果的四步闭环法，让你不再被问题困住',
        date: new Date().toISOString().split('T')[0],
        views: 9532,
        likes: 765,
        questions: [
            {
                id: 'q1',
                question: '为什么我总被问题困住，找不到解决办法？',
                answer: '<p>根本原因不是你笨或运气差，而是你缺乏一套系统化的解题逻辑。真正的高手靠的不是灵光一现，而是从"稳情绪"到"出结果"再到"长经验"的完整闭环。</p>'
            },
            {
                id: 'q2',
                question: '解决问题的"四步闭环法"是什么？',
                answer: '<p>这套简单有效的方法是：</p><p>1. <span style="font-weight: bold;">冷静破局</span>：先处理情绪，再处理问题</p><p>2. <span style="font-weight: bold;">本质洞察</span>：透过表面，找到问题的根本原因</p><p>3. <span style="font-weight: bold;">执行落地</span>：把方案拆解成具体、可跟踪的动作</p><p>4. <span style="font-weight: bold;">复盘迭代</span>：从每次经历中提炼经验，变成能力</p>'
            },
            {
                id: 'q3',
                question: '如何快速冷静下来？',
                answer: '<p>两个立刻能用的方法：</p><p>1. <span style="font-weight: bold;">暂停10秒</span>：深呼吸，让大脑从情绪模式切换到理性模式</p><p>2. <span style="font-weight: bold;">角色抽离法</span>：想象是朋友遇到这事，你会怎么帮他分析？跳出当局者迷的困境</p>'
            },
            {
                id: 'q4',
                question: '如何找到问题的根本原因？',
                answer: '<p>用 "5Why分析法" ，连续追问几层"为什么"。</p><p>• 例子：孩子成绩差 → 为什么？作业错多 → 为什么？上课没听懂 → 为什么？老师方法不适合他 → 为什么没换方法？因为没人告诉他。</p><p>找到根本原因后，才能真正解决问题，而不是瞎忙活。</p>'
            },
            {
                id: 'q5',
                question: '想到办法却执行不下去，怎么办？',
                answer: '<p>用"三维执行引擎"解决：</p><p>1. <span style="font-weight: bold;">拆解任务</span>：把"提升业绩"改成"每周联系10个新客户"这种具体、可衡量的小目标</p><p>2. <span style="font-weight: bold;">坚决推进</span>：遇到拒绝别放弃，记录原因，想办法改进</p><p>3. <span style="font-weight: bold;">灵活调整</span>：发现方法无效，果断换策略，别一条路走到黑</p>'
            },
            {
                id: 'q6',
                question: '如何从今天开始练习？',
                answer: '<p>从最小的事开始刻意练习：</p><p>• 练冷静：外卖送错了，先深呼吸10秒再沟通</p><p>• 练洞察：手机耗电快，连问三个"为什么"找到根本原因</p><p>• 练执行：打扫房间也拆解成具体任务，比如"上午擦桌子，下午拖地板"</p><p>• 练复盘：写完报告，花5分钟总结一下哪里做得好，哪里可以改进</p><p style="font-weight: bold; color: #cb0000;">记住：闭环思维不是天赋，是可以刻意练习出来的能力。</p>'
            }
        ]
    },
    {
        id: '7',
        title: '情绪稳定的底层逻辑：不被坏情绪操控的6个方法',
        category: 'health_balance',
        summary: '10分钟学会：为什么你总被情绪左右，以及如何从根本上掌控情绪的实用方法',
        date: new Date().toISOString().split('T')[0],
        views: 8956,
        likes: 678,
        questions: [
            {
                id: 'q1',
                question: '为什么我总被坏情绪操控，无法冷静？',
                answer: '<p>不是你脆弱，而是你掉进了"情绪反应陷阱"。大脑为了保护你，会在遇到刺激时自动触发情绪（比如被骂会生气），但现代社会的刺激太多，大脑的"自动模式"已经不适用了。</p><p style="font-weight: bold; color: #cb0000;">真相：情绪稳定不是天生的，是可以通过训练获得的能力。</p>'
            },
            {
                id: 'q2',
                question: '情绪稳定的人，到底有什么不一样？',
                answer: '<p>他们不是没情绪，而是掌握了"情绪间隔术"：</p><p><span style="font-weight: bold;">1. 看到情绪：</span>能快速识别自己在生气、焦虑还是委屈</p><p><span style="font-weight: bold;">2. 接受情绪：</span>不压抑也不放大，承认"我现在确实很生气"</p><p><span style="font-weight: bold;">3. 拉开距离：</span>把情绪和行动分开，不让情绪直接控制你的行为</p><p><span style="font-weight: bold;">4. 理性应对：</span>等情绪平复后，再决定怎么做</p>'
            },
            {
                id: 'q3',
                question: '现在就能用的快速冷静方法？',
                answer: '<p>三个"情绪灭火器"，30秒内见效：</p><p><span style="font-weight: bold;">1. 生理调节法：</span>用冷水拍脸、深呼吸（4秒吸气+7秒屏息+8秒呼气）、握拳再松开，通过身体反应让大脑冷静</p><p><span style="font-weight: bold;">2. 场景切换法：</span>立刻离开让你生气的环境（比如走出办公室），去窗边看看远处，或听一首节奏慢的歌</p><p><span style="font-weight: bold;">3. 语言暗示法：</span>在心里默念"我现在很生气，但生气解决不了问题"，用理性语言打断情绪循环</p><p style="font-weight: bold; color: #cb0000;">关键：先处理情绪，再处理事情。</p>'
            },
            {
                id: 'q4',
                question: '如何从根本上减少情绪波动？',
                answer: '<p>培养三个日常习惯，30天告别情绪内耗：</p><p><span style="font-weight: bold;">1. 每天记录情绪：</span>晚上花5分钟写下今天让你情绪波动的事，分析"为什么会这样"，慢慢就能发现自己的情绪触发点</p><p><span style="font-weight: bold;">2. 建立情绪缓冲区：</span>比如每天留30分钟独处时间（散步、读书），给情绪一个释放的出口</p><p><span style="font-weight: bold;">3. 降低对他人的期待：</span>接受"不是所有人都会喜欢你"，"不是所有事都会按计划来"，减少因期待落空而产生的情绪</p>'
            },
            {
                id: 'q5',
                question: '遇到突发事件，如何保持冷静？',
                answer: '<p>四步"危机稳心法"，帮你从容应对：</p><p><span style="font-weight: bold;">1. 停：</span>先暂停3秒，别立刻做任何反应</p><p><span style="font-weight: bold;">2. 看：</span>观察自己的情绪（"我现在很恐慌"）和身体反应（"心跳很快"）</p><p><span style="font-weight: bold;">3. 问：</span>问自己"最坏的结果是什么？我能承受吗？有什么解决办法？"</p><p><span style="font-weight: bold;">4. 做：</span>专注于能控制的部分，先做一件小事（比如倒杯水、打个电话）</p><p>例子：被领导骂了，先停3秒→观察自己在生气→问自己"最坏结果是被批评，我能承受，下次改进"→然后去倒杯水冷静一下</p>'
            },
            {
                id: 'q6',
                question: '最后，给我一个坚持练习的理由？',
                answer: '<p style="font-weight: bold; color: #cb0000;">情绪稳定不是为了做一个"没脾气的人"，而是为了成为自己生活的主人。</p><p>当你不再被情绪操控，你会发现：</p><p>• 决策更理性，少犯让自己后悔的错</p><p>• 关系更和谐，不会因一时冲动伤害重要的人</p><p>• 内心更自由，不再被负面情绪消耗</p><p>从今天开始，每天练习5分钟——你会慢慢变成一个"情绪稳定"的人。</p>'
            }
        ]
    },
    {
        id: '8',
        title: '我是谁？建立稳定自我认同的6个核心方法',
        category: 'self_growth',
        summary: '5分钟搞懂：为什么你总感觉"找不到自己"，以及如何从根本上建立稳定的自我认同',
        date: new Date().toISOString().split('T')[0],
        views: 10245,
        likes: 876,
        questions: [
            {
                id: 'q1',
                question: '什么是自我认同？为什么它很重要？',
                answer: '<p>自我认同就是"你如何看待自己"——你知道自己是谁、喜欢什么、讨厌什么、想成为什么样的人。</p><p style="font-weight: bold; color: #cb0000;">它的重要性在于：没有稳定的自我认同，你就像风中的叶子，别人说你好你就飘，说你差你就落。</p><p>比如：同事说你"不够外向"，你就怀疑自己；朋友说你"太较真"，你就想改变——结果活得越来越不像自己。</p>'
            },
            {
                id: 'q2',
                question: '为什么我总是"找不到自己"，自我认同不稳定？',
                answer: '<p>三个常见原因：</p><p><span style="font-weight: bold;">1. 从小被"比较式教育"影响</span>：父母总说"你看别人家孩子"，导致你习惯用别人的标准定义自己</p><p><span style="font-weight: bold;">2. 害怕被排斥，过度迎合</span>：为了融入群体，你隐藏真实想法，时间久了连自己都忘了真正喜欢什么</p><p><span style="font-weight: bold;">3. 从未认真思考过"我是谁"</span>：每天忙忙碌碌，却很少花时间和自己对话，问问"我到底想要什么？"</p>'
            },
            {
                id: 'q3',
                question: '现在就能开始的"自我探索"小方法？',
                answer: '<p>三个立刻能用的练习，帮你重新认识自己：</p><p><span style="font-weight: bold;">1. 写"自我清单"</span>：花10分钟写下：我最喜欢的5件事、我最擅长的3件事、我绝对不能接受的3件事</p><p><span style="font-weight: bold;">2. 记录"情绪瞬间"</span>：当你特别开心或特别生气时，立刻记下来："这件事为什么让我有这种感觉？它反映了我什么样的价值观？"</p><p><span style="font-weight: bold;">3. 做"假设测试"</span>：问自己："如果不考虑钱和别人的看法，我最想做什么？"——答案往往藏着真实的你</p>'
            },
            {
                id: 'q4',
                question: '如何应对外界评价对自我认同的冲击？',
                answer: '<p>四步"评价过滤法"，不让别人的话打乱你的节奏：</p><p><span style="font-weight: bold;">1. 先别急着认同</span>：当别人说"你太敏感了"或"你不够努力"时，先在心里说："这只是他的看法，不是事实"</p><p><span style="font-weight: bold;">2. 做一次"价值核对"</span>：问自己："他说的这些，和我对自己的认知一致吗？"</p><p><span style="font-weight: bold;">3. 区分"有用反馈"和"情绪宣泄"</span>：如果有人指出你确实可以改进的地方，感谢他；如果只是发泄情绪，就当没听见</p><p><span style="font-weight: bold;">4. 建立"自我肯定清单"</span>：把别人夸你的话、你做成的事写下来，迷茫时拿出来看看——这才是真实的你</p>'
            },
            {
                id: 'q5',
                question: '在不同角色中（职场、家庭、朋友），如何保持自我认同的一致性？',
                answer: '<p>关键是找到"核心自我"——那些无论在什么角色中都不会改变的本质：</p><p><span style="font-weight: bold;">1. 定义你的"核心价值观"</span>：比如诚实、善良、追求成长，这些是你不会妥协的底线</p><p><span style="font-weight: bold;">2. 允许自己"角色弹性"</span>：在公司可以专业严谨，在家可以放松随性，这不是分裂，是智慧</p><p><span style="font-weight: bold;">3. 定期"自我校准"</span>：每月花10分钟问自己："最近我做的决定，是因为真正想做，还是为了迎合别人？"</p><p>例子：同事让你一起加班，但你答应了陪家人，这不是自私——而是你重视"家庭"这个核心价值</p>'
            },
            {
                id: 'q6',
                question: '最后，给我一个坚持建立自我认同的理由？',
                answer: '<p style="font-weight: bold; color: #cb0000;">当你真正了解自己，你会活得更轻松、更坚定。</p><p>不再为别人的评价患得患失，不再因为迷茫而拖延，不再活成"别人希望的样子"。</p><p>你会发现：原来"做自己"不是任性，而是一种需要勇气和练习的能力。</p><p>从今天开始，每天花5分钟和自己对话——你值得被自己了解、被自己接纳、被自己深爱。</p>'
            }
        ]
    },
    {
        id: '9',
        title: '认识自己的优点与盲点：做自己的人生教练',
        category: 'self_growth',
        summary: '5分钟学会：如何客观认识自己的优势和不足，成为更好的自己',
        date: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        questions: [
            {
                id: 'q1',
                question: '为什么认识自己的优点和盲点这么重要？',
                answer: '<p>因为：<span style="font-weight: bold; color: #cb0000;">你无法改变你不了解的东西</span>。</p><p>很多人一辈子都在盲目努力：要么高估自己，撞得头破血流；要么低估自己，错过很多机会。</p><p>举个例子：你明明擅长沟通，却非要去做需要安静研究的工作——这不是努力，是浪费生命。</p>'
            },
            {
                id: 'q2',
                question: '为什么我总看不到自己的优点？',
                answer: '<p>这是人性的弱点：我们对自己的缺点像放大镜，对优点却像近视镜。</p><p>三个原因：</p><p>• 😔 从小被教育要"谦虚"，习惯否定自己</p><p>• 📱 社交媒体上都是别人的"完美生活"，对比下觉得自己不够好</p><p>• 🧠 大脑有"负面偏好"，更容易记住批评而不是表扬</p><p>但其实，<span style="font-weight: bold;">你已经拥有很多连自己都没发现的闪光点</span>。</p>'
            },
            {
                id: 'q3',
                question: '立刻能做的"优点挖掘"练习？',
                answer: '<p>三个简单方法，帮你重新认识自己的优势：</p><p><span style="font-weight: bold;">1. 写"成就清单"</span>：花10分钟写下你从小到大做成的所有事——哪怕是"学会骑自行车"这种小事</p><p><span style="font-weight: bold;">2. 问三个信任的人</span>："你觉得我最擅长的三件事是什么？"</p><p><span style="font-weight: bold;">3. 观察"能量时刻"</span>：记录下哪些事情让你做起来特别投入、忘记时间——这些往往就是你的天赋所在</p><p>例子：你总爱帮朋友分析问题，这可能意味着你擅长倾听和共情。</p>'
            },
            {
                id: 'q4',
                question: '如何面对自己的盲点？',
                answer: '<p>面对盲点的关键不是自责，而是：<span style="font-weight: bold; color: #cb0000;">把它当成成长的机会</span>。</p><p>四步帮你理性看待盲点：</p><p><span style="font-weight: bold;">1. 先接纳</span>：没有人是完美的，承认自己有不足是勇敢的表现</p><p><span style="font-weight: bold;">2. 区分"可以改变"和"无法改变"</span>：比如性格急躁可以通过练习改善，但你天生内向可能就是你的特点</p><p><span style="font-weight: bold;">3. 制定小目标</span>：不要想着"彻底改变自己"，而是"每天进步一点点"</p><p><span style="font-weight: bold;">4. 找个"镜子朋友"</span>：请信任的人在你犯同样错误时提醒你</p>'
            },
            {
                id: 'q5',
                question: '如何避免在认识自己时走极端？',
                answer: '<p>两个原则，帮你保持平衡：</p><p><span style="font-weight: bold;">1. 用"成长型思维"看自己</span>：现在的你不等于未来的你，优点可以放大，盲点可以改善</p><p><span style="font-weight: bold;">2. 建立"自我评估坐标系"</span>：不要只和别人比，也要和过去的自己比</p><p>举个例子：如果你觉得自己"不够聪明"，问问自己："和一年前相比，我是不是懂得更多了？"</p><p>记住：<span style="font-weight: bold;">认识自己的目的不是给自己贴标签，而是让自己活得更自由</span>。</p>'
            },
            {
                id: 'q6',
                question: '最后，给我一个坚持认识自己的理由？',
                answer: '<p style="font-weight: bold; color: #cb0000;">当你真正了解自己，你会活得更轻松、更幸福。</p><p>不再勉强自己做不喜欢的事，不再因为别人的评价而焦虑，不再浪费时间在不适合自己的方向上。</p><p>你会发现：原来"做自己"不是任性，而是对自己最大的负责。</p><p>从今天开始，每天花5分钟观察自己——你值得被自己了解、被自己接纳、被自己深爱。</p>'
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