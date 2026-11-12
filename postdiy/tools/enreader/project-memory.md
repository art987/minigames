# enreader 项目记忆

## 项目概述
英语阅读器（纯静态网页，无构建依赖）：分类 → 章节 → 文章阅读页。位于 `postdiy/tools/enreader/`。

## 文件结构
- `pedingfiles/*.txt` — 源文本（一个 txt = 一章）
- `build.py` — 解析器：txt → `data/articles.js`（window.ENR_DATA）。新增文章 = 放 txt 后运行 `python build.py`
- `index.html` — 首页（分类章节卡片 + 阅读进度条）
- `article.html?id=<txt文件名>` — 阅读页（核心）
- `assets/style.css` / `common.js`（设置存储+TTS引擎+词卡）/ `article.js`
- 分类映射在 build.py 的 CATEGORY_RULES（关键词→分类id），新分类要在 CATEGORIES 里登记

## 源文本约定（txt 格式）
- 每句三行一组：英文韵律行 / 中文逐词行 / →中文意译行
- 标记：`╷`(U+2574~2577)词间气口、`/`短语停顿、`//`句末、`**词**`重读
- 段落间用单独一行 `/`；每段后 `📖 朗读建议：` 块；文末 `### 📋 重点词汇表` 表格
- 1.txt：英文行用 `/` 分短语 + `╷` 分子块；2.txt（婚姻的真相，2026-11-10 更新为"婚姻观念论述"版，15 句/337 词/19 段）：句间也有单独 `/` 分隔行（与 1.txt 的一句一段结构一致），朗读建议盒子穿插在句子流之间（渲染已验证自然）；段内 `### 段落N` 标题行会被 build.py 跳过；中文行里的英文词（如 fancy）会成为一个独立中文块
- 【build.py 对齐块约定（v15 关键修复）】attach_lit 把中文行的 `╷` 与 `/` **同为分块边界**（╷ 不再替换成空格），块=整串字符串、块内空格保留整体（如"怀着 一种观念"是一个块不拆词）；句级 DP 的 merged/assign 必须用**切片** `seg_blocks[j:j+k]`（曾因沿用旧版"块=词列表、for 迭代摊平"的写法把字符串迭代成单字，导致全库单字化）。粗粒度中文行（块内多词）靠此实现与英文 ╷ 子块一一对应

## 关键实现约定
- 【用户核心诉求，不可再犯】源文本的分割符号（╷ 和 /）必须原样可见，中文逐词对照必须与英文一上一下垂直对齐——这是产品灵魂，默认常显，不是可选项。曾做成"精读模式才显示"被用户严厉否定
- 逐词对齐（v9 层级 DP，2026-11-10 重写）：用户更新源文本后中文行变为**短语级对照**（如 `花5分钟╷刷╷社交媒体` 对应 `spend 5 minutes╷scrolling through╷social media`），英文行的 `╷` 子块边界与中文块边界一一对应是核心线索。attach_lit 三层：① 句级 DP 分配中文 `/` 分块到短语（合并代价=sub_dp_cost 块级最小代价，短语数≠分块数时自动整体最优，无中文短语留空）；② align_chunks 块级（短语内 ╷ 子块 ↔ 中文块，match=0/multi=1.5+0.6(k-1)/skip=2，必须消耗全部中文块）；③ align_within 词级（子块内 j 块按位置比例 b*k//j 分到 k 词，同词多块空格合并）。产出 units:[{ew,cw,s}] + seps。留空词多属正常（中文本就是短语级）
- 【组块渲染（v11，用户明确要求）】article.js 渲染按 ╷ 把短语单元分成 .grp 组（1.txt 共 330 组）：结构为 span.grp > span.ews（若干 .ew.tok）+ 可选 span.gcw（组内 cw 空格合并），组间 .gsep"╷"、短语间 .psep"/"。.grp 是 inline-flex column，宽由 ews 撑开，gcw width:100% text-align:center——中文行与英文组等宽且水平居中（用户要求消除"翻译只对应某个词"的歧义）。旧的 .u/.cw 单词级结构已整体废弃
- 1.txt 当前状态（v10，已补全）：26 段 / 26 句 / 702 词 + 词汇表 17 条（表头 `## 📋 重点词汇表` 也能解析，build 按"重点词汇"关键词匹配）；末段 3 句（Lastly/You don't need to compare/If you find someone）对齐已验证。注意：Write 工具改 1.txt 曾报 diffBlocks 内部错误，可改用"临时文件+python 合并"的方式；pedingfiles/ 下任何 .txt 都会被 build.py 当文章，临时文件用完必须删除
- 2.txt 当前状态（v15）：婚姻的真相：不是完美童话，而是每天的小选择，[emotion] 19 段/15 句/337 词 + 词汇表 18 条，句1 对齐 7↔7 块级一一对应已验证
- 3.txt 当前状态（v16，2026-11-10 加入）：野心的架构：打造一份有分量的职业，[daily] 57 段/51 句/884 词 + 词汇表 20 条；正文含 `### 段落N（第X基石：…）` 小节标题行（解析器跳过）；头部原为"英文标题+中文标题"两行，已规范为单行 `### 中文标题` + `---`；组级对齐抽查全部块级一一对应；浏览器验证 10/10
- 4.txt 当前状态（v17，2026-11-10 加入）：墨韵流淌：读懂中国水墨画的灵魂，[daily] 67 段/59 句/871 词 + 词汇表 20 条 + 9 个 📖 朗读建议块；头部同 3.txt 为"空行+英文标题+空行+中文标题+/"，已规范为 `### 中文标题` + `---`，且**首行空行必须删除**（build.py 的 title=lines[0]，留空行标题会为空）；中文行含拼音+汉字混排块（如"（wén fáng sì bǎo）："）属正常；句1/句9/句59 抽查块级一一对应；浏览器验证全通过（.tipsbox=9 为正确值，勿预期 7）
- 【词汇卡交互】.vchip 点击只调 speakWord 朗读（article.js 卡片自带音标+中文释义，副标题"点击卡片听发音"），**不弹任何弹窗**——自动化验证出现 .wpop 为 null 是预期，勿误判为 bug（.wpop 早已整体删除）
- UI 风格（用户明确要求）：仅使用白天模式，采用清新科技风，以白色系为主、蓝色 (#2e7cf6) 为辅助色，整体亮堂干净；禁止使用暗色主题、复古羊皮纸风格、衬线字体，英文统一使用 Inter/Segoe 无衬线字体；主题切换按钮已移除，common.js 中 settings.theme 被显式删除，data-theme 固定为 "light"
- TTS 只读英文：按短语链式朗读（`/`≈300ms、句末≈650ms 间隙，用语速折算），使用 gen 令牌防止竞态；单词点读会打断当前朗读并从当前短语位置续播
- 【TTS 检测约定】ttsOK() 只判 "speechSynthesis" in window（语音列表异步加载，为空不代表不能读，浏览器会用默认语音兜底）；speak() 的 onerror 忽略 interrupted/canceled（cancel 旧语音会触发），真失败才 toast"语音播放失败"
- 【点单词交互约定（用户明确要求，v11）】点组内**任意**单词：不弹任何注释弹窗（.wpop 已整体删除），只做两件事——朗读该单词 + 所在 .grp 整组加下划线（.grp.hlu，蓝色 2px）且组底部 .gcw 变红（.gcw.hl，#e5484d）持续 2 秒后同时移除；高亮是组级的不是单词级的（用户要求避免误解翻译只对应单个词）；词汇表卡片点击也只朗读
- 【数字发音约定（v13）】article.js 有 numToEn()：`/^(\d{1,3})(st|nd|rd|th|s)?$/i` 匹配的 token 转英文——基数 5→five、复数 20s→twenties（y→ies）、序数 8th→eighth / 21st→twenty-first / 100th→one hundredth（NUM_ORDS 特例表：first/second/third/fifth/eighth/ninth/twelfth，y 结尾→ieth，复合词只转最后一个词）；单词点读（speakWord/onWordClick）与**整句朗读 chain()** 两处均已接入——chain 按 ph.units 重建朗读文本（每 token 过 numToEn），并记录各 token 的朗读偏移 spRanges，onboundary 用 spRanges 反查命中 token 后调 highlightTok（旧 highlightWordAt 按原文偏移定位已删除，因 5→five 长度变化会使 charIndex 失配）；根因是无英文 voice 时系统默认中文语音会把孤立数字读成"五"
- 【无设置面板（用户明确要求"都按默认来，减少操作负担"）】设置按钮 ☰ 与 #setPanel 已整体删除（语音选择/字号/中文翻译/重读高亮/自动滚动开关全部移除），全部按默认值运行：fs=19、cn/stress/autoscroll=true、语音自动选评分最高；仅保留底部播放条的语速下拉（可记忆）；common.js 初始化时重写 enr:set 只恢复 rate 以清掉旧版本废弃键；style.css 的 .pop/.settings/.setrow/.switch/.fsz/.no-cn/.no-stress 均已删除
- 【无顶栏（用户明确要求，v18）】文章页 sticky 顶栏（返回按钮+标题+badge）已整体删除，改为左上角**浮动圆形白底返回按钮** .backfab（fixed top/left 18px，46px 圆形 #fff、1px 边框、柔和阴影，内含 stroke-width:3 圆头 SVG 左箭头，hover 变蓝微放大）；article.html 顶部只留 <button class="backfab" id="backBtn">；article.js 的 headTitle/headBadge 引用已删（元素不存在会抛错）；style.css 的 .topbar/.topbar-in/.iconbtn/.badge 均已删除
- 静态资源引用需携带 `?v=N` 版本号防止浏览器缓存；修改 JS/CSS/数据后必须升级版本号（当前版本 v=18）
- 设置项持久化存储在 localStorage 的 `enr:set` 字段；阅读进度存储在 `enr:pos:<id>` 字段；用户 preview 固定访问 localhost:8644（服务器需常驻）
- build.py 的 CATEGORY_RULES 现含 婚姻/爱情/恋爱/情感 → emotion；2.txt 标题「婚姻的真相：不是完美童话，而是每天的小选择」由用户确认（原"英文段落1"是占位标题）；【重要】用户 IDE 常忘 Ctrl+S——源文件曾在磁盘上是 0 字节而 IDE 缓冲有全文，从 IDE 缓冲内容直接写入磁盘后要提醒用户重新加载文件，否则旧缓冲再 Ctrl+S 会覆盖（标题会退回占位值）

## 踩过的坑
- 源文本中的 `╷` 是 U+2577 字符，若正则按 U+2575 编写会导致词间残留竖线符号
- 用户更新源文件可能删掉头部 `---` 分隔行——此时 build.py 的 scope 会切到词汇表前的 `---`，正文全部丢失只剩词汇表；发现输出段落数异常时先检查头部 `---`
- 自动化浏览器会复用缓存的 HTML（python http.server 无 cache-control），文章页验证必须用带随机查询参数的 URL（如 article.html?id=2&fresh=N）强制全新加载，否则看到的是旧数据假象；且 browser_console_messages 按**标签页累积**返回历史消息——前一轮 agent evaluate 注入脚本声明的 `const t` 报错会残留到后续读取，复验必须开**新标签页**（browser_tabs create）再导航，否则会误判页面有 bug（v16 曾因此误报 SyntaxError: Identifier 't'）
- 使用 DOM API 拼接单词 span 元素时必须显式插入空格文本节点，否则整句会粘连无法正常断行
- article.js 顶部的 `const body = $("artBody")` 指向 article 元素而非 document.body，display 切换类需统一挂载到 document.body 避免混淆
- 自动化浏览器代理会复用旧页面或缓存，验证时需更换端口并为资源添加版本号；词卡 .wpop 会在 3.5s 后自动消失，自动化检查常错过时间窗，但功能本身正常