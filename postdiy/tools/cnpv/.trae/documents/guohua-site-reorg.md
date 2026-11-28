# 国画视频教程网站汇总整理计划

## Context

当前网站（e:\国画视频教程整理）存在以下问题：
1. **无首页**：8 个内容页面互相独立，只能手动逐个打开 HTML 文件
2. **300+ 个 mp4 全部堆在根目录**，无分类，后期添加/管理困难
3. **页面重复**：花木.html = 花.html + 木.html 合并版；山.html 内容实际挂的是梅花视频（错误引用），其栏目在山石水草天.html 中已存在；001.html 是假数据模板演示页
4. **引用损坏**：8 处视频引用指向不存在的文件（命名不一致）；所有页面引用了不存在的 `./index_files/index.css`
5. **37 个视频未被任何页面引用**（吴昌硕、张大千部分作品、藤蔓、鱼、鹰、山水等）

用户已确认：删除 花木.html 与 001.html；未引用视频整理进对应页面并修复坏引用。

## 目标目录结构

```
e:\国画视频教程整理\
├── index.html              # 【新建】首页门户（白底蓝辅、卡片式）
├── pages\                  # 全部内容页
│   ├── 花.html
│   ├── 木.html
│   ├── 山石水草天.html
│   ├── 皴擦点染描.html
│   ├── 美人.html
│   └── 名家作品.html
├── videos\
│   ├── 01-花卉\            # apricot/camellia/chrysanthemum/hibiscus/lotus/narcissus/orchid/osmanthus/peach/peony/pomegranate/sunflower/plum04/plumblossom06
│   ├── 02-树木\            # bamboo/cypress/ginkgo/maple/parasol/pine/plantain/pushu/willow/tree01/vine01-07/grape01
│   ├── 03-山石草木\        # stone-01~09/landscape01-02/grass01-03/leaf-01~12/composition-01~03/reed01
│   ├── 04-禽鸟鱼虫\        # bird-*/crane-*/magpie-*/parrot-*/sparrow-*/swallow-*/butterfly-*/hawk01/carp01
│   ├── 05-技法\            # moist01-17/trace01-18/wrinkle*/wrinkletalk01-04/skill01
│   ├── 06-美人\            # beauty.mp4/beauty02-04/face02/face04-07
│   ├── 07-名家\            # fan01-07/muxi-*/qibaishi-*/renbonian-01~08/xuwei-01~12/zhangdaqian-00~07/zhengbanqiao-01~09/wucangshuo-01
│   └── 08-梅花专项\        # 01plumblossom\ 文件夹内全部 mp4
├── assets\                 # composition.jpg、face01.webp、face03.webp、face01.png、11.jfif、video\xhbj.mp4
└── bird\                   # 抖珍藏本地库，自包含应用，保持原样不动
```

## 实施步骤

### 1. 创建目录结构
新建 `pages\`、`videos\01-花卉` ~ `videos\08-梅花专项`、`assets\`。

### 2. 移动与清理 HTML
- 移动 6 个内容页到 `pages\`：花 / 木 / 山石水草天 / 皴擦点染描 / 美人 / 名家作品
- **删除**：001.html（假数据模板）、花木.html（重复）、山.html（栏目已含于山石水草天.html，且其视频引用挂错为梅花）

### 3. 移动视频文件（按文件名前缀映射）
用 PowerShell `Move-Item` 按上表前缀批量归类。两处重命名修正：
- `loutus09.mp4` → `lotus09.mp4`
- `lanscape02.mp4` → `landscape02.mp4`
- 删除 `xuwei01.mp4`（与 xuwei-01.mp4 字节数完全相同 10920363，重复文件）

### 4. 批量改写页面引用（Python 脚本，一次性）
写一个临时 Python 脚本对 `pages\*.html` 执行（UTF-8 读写）：
- 删除失效的 `<link href="./index_files/index.css">`
- 视频路径改写：`src="xxx.mp4"` → `src="../videos/<分类>/xxx.mp4"`（按步骤 3 的映射表）
- 图片路径改写：`composition.jpg` / `face01.webp` / `face03.webp` → `../assets/`
- 修复坏引用：
  - `grass-01/02/03.mp4` → `grass01/02/03.mp4`
  - `beauty01.mp4` → `beauty.mp4`
  - 删除指向不存在文件的 `<span>` 视频块：camellia05、beauty05/06/07
- 插入未引用视频块（复用各 section 内相邻 `<span><b>标题</b><video ...></video></span>` 的既有标记模式）：
  - 木.html：树 section 加 tree01；新增「藤蔓」栏目（nav + section）放 vine01-07、grape01
  - 山石水草天.html：山/崇山/悬崖 section 加 landscape01/02；草 section 加 reed01；鸟 section 加 hawk01；新增「鱼」栏目放 carp01
  - 皴擦点染描.html：加 skill01
  - 名家作品.html：任伯年加 renbonian-06/07/08；徐渭加 xuwei-12；张大千加 zhangdaqian-00/06/07；新增「吴昌硕」栏目（nav + section）放 wucangshuo-01

### 5. 新建首页 index.html
- 风格遵循用户偏好：清新白底为主、蓝色辅助、干净亮堂，卡片式布局，无过度装饰
- 内容：标题 + 8 张卡片（花卉/树木/山石草木/禽鸟鱼虫/皴擦点染描/美人/名家作品/抖珍藏本地库）
- 每张卡片含：名称、视频数量（整理后脚本统计的真实数字）、子分类快捷锚点链接（如花卉卡：梅花 兰花 竹子 牡丹 荷花…，锚点直达 pages 页对应 section）
- 抖珍藏卡片链接 `bird/本地库.html`

### 6. 清理根目录残余
- 图片移入 assets\：composition.jpg、face01.webp、face03.webp、face01.png、11.jfif
- `video\xhbj.mp4` 移入 assets\（无页面引用，保留备用）；删除空的 video\ 文件夹

### 7. 验证
1. **脚本核对**：临时 Python 脚本提取所有 pages\*.html 与 index.html 中的 src/href，逐一确认目标文件存在，输出核对报告；同时确认 videos\ 各分类文件夹内无遗漏文件
2. **浏览器抽查**：用 browser 代理打开 index.html，验证首页卡片可点击跳转；抽查 1-2 个内容页的视频能正常播放、左侧栏目锚点正常

## 关键文件
- 改写目标：`pages\花.html`、`pages\木.html`、`pages\山石水草天.html`、`pages\皴擦点染描.html`、`pages\美人.html`、`pages\名家作品.html`
- 新建：`index.html`
- 不动：`bird\` 整个目录（自包含应用）
- 临时脚本用完即删，不留在工作区
