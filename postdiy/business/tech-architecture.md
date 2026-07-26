# 实体商家经营诊断系统 V1.0 技术架构设计文档

> 文档版本：V1.0  
> 编写日期：2026年7月  
> 基于文档：《实体商家经营诊断系统 V1.0 PRD》《实体商家经营诊断系统 V1.0 产品设计方案》  

---

## 第一部分：技术选型

### 1.1 选型原则

| 原则 | 优先级 | 说明 |
|------|--------|------|
| 稳定 | 最高 | 优先选择成熟技术，降低线上故障风险 |
| 低成本 | 高 | 复用现有腾讯云开发环境，零额外基建成本 |
| 开发效率 | 高 | 选择团队最熟悉的技术栈，快速交付 |
| AI扩展性 | 中 | 预留接口，V2.0可平滑接入AI |

### 1.2 前端技术选型

| 项目 | 选型 | 理由 |
|------|------|------|
| **页面框架** | 原生 HTML + CSS + JavaScript | 与 postdiy 项目保持一致，无学习成本；无需构建工具，直接部署 |
| **CSS方案** | 原生 CSS + CSS Variables | 轻量，通过变量实现主题色管理，方便后续换肤 |
| **UI组件** | 自建组件（复用 postdiy 风格） | 保持产品线视觉一致，不引入额外依赖 |
| **图表库** | 不引入（V1.0） | 后台统计用纯CSS实现简单图表，避免引入Chart.js等 |
| **富文本** | 不引入（V1.0） | 后台方案编辑使用 Markdown + 预览，前端渲染为HTML |
| **图标** | SVG 内联图标 | 复用 postdiy 的 svg-icons 方案，零依赖 |

**不选用框架的理由**：
- Vue/React 需要构建工具链，增加部署复杂度
- 项目页面数量有限（~10页），原生JS完全可控
- 与 postdiy 项目保持技术栈一致，方便维护
- WebView 兼容性更好（无构建产物兼容问题）

### 1.3 后端技术选型

| 项目 | 选型 | 理由 |
|------|------|------|
| **云函数运行时** | Node.js 12.16（腾讯云开发） | 与 postdiy 云函数一致，复用开发经验 |
| **数据库** | 腾讯云开发 CloudBase 数据库 | 与 postdiy 共享同一环境，零额外成本 |
| **云存储** | 腾讯云开发 CloudBase 存储 + 七牛CDN | 工具模板附件存储，复用七牛CDN加速 |
| **短信服务** | 腾讯云SMS | 与 postdiy 一致 |
| **管理端认证** | 自建 Session 机制 | 与 postdiy 后台管理一致 |

### 1.4 部署方案

| 项目 | 方案 | 说明 |
|------|------|------|
| **前端静态资源** | 腾讯云开发静态网站托管 | 与 postdiy 共享环境，路径 `/business/` 下 |
| **云函数** | 腾讯云开发云函数 | 独立函数命名空间，`biz-*` 前缀区分 |
| **自定义域名** | 复用 peacelove.top | `peacelove.top/postdiy/business/` 或子域名 |
| **CDN** | 七牛CDN | 复用 postdiy 的CDN配置 |
| **HTTPS** | 腾讯云免费证书 | 与 postdiy 共享 |

### 1.5 文件存储方案

| 文件类型 | 存储位置 | CDN | 说明 |
|---------|---------|-----|------|
| 工具模板附件 | 七牛云 `biztools` 文件夹 | 七牛CDN | Excel/Word/PDF模板文件 |
| 案例配图 | 七牛云 `bizcases` 文件夹 | 七牛CDN | 案例相关图片 |
| 静态资源 | CloudBase 静态托管 | 腾讯CDN | HTML/CSS/JS/图标 |

### 1.6 AI扩展预留

V1.0不接入AI，但在架构层面预留扩展点：

| 预留点 | V1.0实现 | V2.0扩展 |
|--------|---------|---------|
| 诊断匹配逻辑 | 云函数 `biz-diagnosis-query` | 新增 `biz-ai-diagnosis` 云函数，调用大模型API |
| 诊断结果展示 | 固定模板渲染 | 新增AI对话模式，流式输出 |
| 方案推荐 | 基于规则的权重排序 | 基于用户画像的个性化推荐 |
| 问题描述 | 用户点击选择 | 新增语音/文字输入 → AI提取关键词 → 转为结构化选择 |

---

## 第二部分：系统整体架构设计

### 2.1 架构总览

```
┌─────────────────────────────────────────────────────────┐
│                      用户端（前端）                       │
│  ┌──────┐ ┌──────────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│  │ 首页  │ │ 诊断流程  │ │结果页│ │方案库│ │ 我的 │    │
│  └──┬───┘ └────┬─────┘ └──┬───┘ └──┬───┘ └──┬───┘    │
│     │          │          │         │        │          │
│  ┌──▼──────────▼──────────▼─────────▼────────▼───┐    │
│  │              数据服务层 (data-service.js)        │    │
│  │    统一封装所有云函数调用，缓存，错误处理          │    │
│  └──────────────────┬────────────────────────────┘    │
└─────────────────────┼──────────────────────────────────┘
                      │ HTTPS
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   腾讯云开发 CloudBase                    │
│                                                         │
│  ┌─────────────────── 云函数层 ────────────────────┐   │
│  │                                                  │   │
│  │  [biz-problem-list]    问题列表+热门统计          │   │
│  │  [biz-diagnosis-query] 核心诊断匹配              │   │
│  │  [biz-diagnosis-save]  保存诊断记录              │   │
│  │  [biz-solution-*]      方案CRUD                 │   │
│  │  [biz-case-*]          案例CRUD                 │   │
│  │  [biz-tool-*]          工具CRUD                 │   │
│  │  [biz-user-*]          用户相关                  │   │
│  │  [biz-favorite-*]      收藏相关                  │   │
│  │  [biz-admin-*]         后台管理                  │   │
│  │                                                  │   │
│  └──────────────────┬──────────────────────────────┘   │
│                     │                                   │
│  ┌──────────────────▼──────────────────────────────┐   │
│  │               CloudBase 数据库                    │   │
│  │                                                  │   │
│  │  biz_problems      biz_symptoms                  │   │
│  │  biz_diagnosis_paths  biz_solutions              │   │
│  │  biz_cases         biz_tools                     │   │
│  │  biz_tags          biz_users                     │   │
│  │  biz_diagnosis_records  biz_favorites            │   │
│  │  biz_admin_users                                │   │
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌────────────────── 云存储 ───────────────────────┐   │
│  │  biztools/   工具模板附件                         │   │
│  │  bizcases/   案例配图                            │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                      ▲
                      │ HTTPS
┌─────────────────────┼──────────────────────────────────┐
│                后台管理端（前端）                        │
│  ┌──────────────────▼──────────────────────────────┐   │
│  │              admin-data-service.js                │   │
│  └──────────────────┬──────────────────────────────┘   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │   │
│  │ 仪表盘│ │问题管│ │诊断管│ │方案管│ │数据统│     │   │
│  │      │ │  理  │ │理流程│ │  理  │ │  计  │     │   │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 通信方式

| 通信链路 | 协议 | 说明 |
|---------|------|------|
| 用户端 → 云函数 | HTTPS POST | 通过 CloudBase SDK 调用 |
| 后台管理 → 云函数 | HTTPS POST | 通过 CloudBase SDK 调用 |
| 云函数 → 数据库 | CloudBase SDK | 服务端SDK直接操作 |
| 云函数 → 云存储 | CloudBase SDK | 上传/下载文件 |
| 前端 → 七牛CDN | HTTPS GET | 直接访问CDN资源 |

### 2.3 数据流

```
[用户点击"没有客流"]
    │
    ▼
[data-service.js] 调用 biz-problem-list 获取问题详情
    │
    ▼
[用户选择行业+阶段+症状]
    │
    ▼
[data-service.js] 调用 biz-diagnosis-query(problemCode, industry, stage, symptomIds)
    │
    ▼
[云函数 biz-diagnosis-query]
    ├→ 查询 biz_diagnosis_paths（匹配路径）
    ├→ 查询 biz_solutions（方案详情）
    ├→ 查询 biz_cases（案例详情）
    ├→ 查询 biz_tools（工具详情）
    └→ 组装完整诊断结果返回
    │
    ▼
[前端渲染诊断结果页]
    │
    ├→ [data-service.js] 调用 biz-diagnosis-save 保存记录
    └→ 用户浏览/收藏/下载
```

---

## 第三部分：项目目录结构设计

```
business/
│
├── index.html                    # 首页（问题选择入口）
├── diagnosis.html                # 诊断流程页
├── result.html                   # 诊断结果页
├── solutions.html                # 方案库列表页
├── solution-detail.html          # 方案详情页
├── cases.html                    # 案例库列表页
├── case-detail.html              # 案例详情页
├── tools.html                    # 工具库列表页
├── tool-detail.html              # 工具详情页
├── profile.html                  # 个人中心
├── login.html                    # 登录页
│
├── css/
│   ├── variables.css             # CSS变量（主题色、字号、间距）
│   ├── base.css                  # 基础样式（reset、通用类）
│   ├── components.css            # 通用组件样式（按钮、卡片、步骤条等）
│   └── pages.css                 # 页面专属样式
│
├── js/
│   ├── app.js                    # 应用初始化、路由、全局状态
│   ├── data-service.js           # 数据服务层（统一封装云函数调用）
│   ├── diagnosis.js              # 诊断流程逻辑
│   ├── result.js                 # 诊断结果页逻辑
│   ├── solutions.js              # 方案库逻辑
│   ├── cases.js                  # 案例库逻辑
│   ├── tools.js                  # 工具库逻辑
│   ├── profile.js                # 个人中心逻辑
│   ├── auth.js                   # 登录认证逻辑（复用postdiy）
│   └── utils.js                  # 工具函数（格式化、验证等）
│
├── admin/
│   ├── index.html                # 后台管理首页（仪表盘）
│   ├── login.html                # 后台登录页
│   ├── problems.html             # 问题管理
│   ├── diagnosis-paths.html      # 诊断流程管理
│   ├── solutions.html            # 方案管理
│   ├── cases.html                # 案例管理
│   ├── tools.html                # 工具管理
│   ├── tags.html                 # 标签管理
│   ├── stats.html                # 数据统计
│   ├── admin.css                 # 后台样式
│   └── admin.js                  # 后台逻辑
│
├── cloudfunctions/
│   ├── biz-problem-list/         # 问题列表+热门统计
│   │   └── index.js
│   ├── biz-diagnosis-query/      # 核心诊断匹配
│   │   └── index.js
│   ├── biz-diagnosis-save/       # 保存诊断记录
│   │   └── index.js
│   ├── biz-solution-crud/        # 方案增删改查
│   │   └── index.js
│   ├── biz-case-crud/            # 案例增删改查
│   │   └── index.js
│   ├── biz-tool-crud/            # 工具增删改查
│   │   └── index.js
│   ├── biz-tag-crud/             # 标签增删改查
│   │   └── index.js
│   ├── biz-user-register/        # 用户注册
│   │   └── index.js
│   ├── biz-user-login/           # 用户登录
│   │   └── index.js
│   ├── biz-favorite-toggle/      # 收藏切换
│   │   └── index.js
│   ├── biz-favorite-list/        # 收藏列表
│   │   └── index.js
│   ├── biz-admin-auth/           # 管理员认证
│   │   └── index.js
│   ├── biz-admin-stats/          # 后台统计数据
│   │   └── index.js
│   └── biz-init-data/            # 数据库初始化脚本
│       └── index.js
│
├── images/
│   ├── statics/                  # 静态图片（logo、默认图等）
│   └── icons/                    # 问题分类图标
│
├── libs/
│   ├── cloudbase.full.js         # 腾讯云开发SDK
│   └── qrcode.min.js             # 二维码生成（分享用）
│
├── data/
│   └── seed.json                 # 初始数据（问题、症状、诊断路径）
│
├── PRD.md                        # 产品需求文档
├── design-spec.md                # 产品设计方案
├── tech-architecture.md          # 本文档
└── server.js                     # 本地开发服务器
```

---

## 第四部分：数据库详细设计

### 4.1 集合总览与关系图

```
biz_problems (1) ──── (N) biz_symptoms
biz_problems (1) ──── (N) biz_diagnosis_paths
biz_diagnosis_paths (N) ──── (N) biz_solutions    (多对多，通过 solutionIds)
biz_diagnosis_paths (N) ──── (N) biz_cases        (多对多，通过 caseIds)
biz_diagnosis_paths (N) ──── (N) biz_tools        (多对多，通过 toolIds)
biz_users (1) ──── (N) biz_diagnosis_records
biz_users (1) ──── (N) biz_favorites
biz_tags (1) ──── (N) biz_solutions               (通过 tags 关联)
biz_tags (1) ──── (N) biz_cases
biz_tags (1) ──── (N) biz_tools
```

### 4.2 biz_problems（问题分类表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| name | String | 是 | - | 问题名称，如"没有客流" |
| code | String | 是 | - | 问题编码，如"TRAFFIC_LOW"，唯一索引 |
| icon | String | 是 | - | 图标标识，如"🚶"或SVG名 |
| color | String | 是 | - | 主题色，如"#FF6D00" |
| description | String | 否 | - | 问题简要描述（15字内） |
| fullDescription | String | 否 | - | 问题详细描述（弹窗展示用） |
| sortOrder | Number | 是 | 0 | 排序权重，降序 |
| diagnosisCount | Number | 否 | 0 | 累计诊断次数（由系统更新） |
| status | Number | 是 | 1 | 1=启用 0=禁用 |
| createTime | Date | 是 | 当前时间 | 创建时间 |
| updateTime | Date | 是 | 当前时间 | 更新时间 |

**索引**：
- `code`：唯一索引
- `status + sortOrder`：复合索引（列表查询）

### 4.3 biz_symptoms（症状/选项表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| problemId | String | 是 | - | 关联问题ID（biz_problems._id） |
| name | String | 是 | - | 症状名称，如"路过的人少" |
| code | String | 是 | - | 症状编码，如"TRAFFIC_LOW_01" |
| description | String | 否 | - | 症状补充说明 |
| industryFilter | Array | 是 | ["all"] | 适用行业：all/餐饮/零售/服务 |
| stageFilter | Array | 是 | ["all"] | 适用阶段：all/新店/成长期/老店 |
| sortOrder | Number | 是 | 0 | 排序权重，降序 |
| status | Number | 是 | 1 | 1=启用 0=禁用 |
| createTime | Date | 是 | 当前时间 | 创建时间 |
| updateTime | Date | 是 | 当前时间 | 更新时间 |

**索引**：
- `problemId + status + sortOrder`：复合索引
- `problemId + industryFilter`：复合索引（按行业筛选症状）

### 4.4 biz_diagnosis_paths（诊断流程表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| problemId | String | 是 | - | 关联问题ID |
| industry | String | 是 | "all" | 适用行业 |
| stage | String | 是 | "all" | 适用阶段 |
| symptomIds | Array | 是 | [] | 匹配的症状ID组合 |
| symptomMatchMode | String | 是 | "any" | 匹配模式：any=任一匹配/all=全部匹配 |
| judgment | String | 是 | - | 问题判断文本 |
| severity | Number | 是 | 50 | 默认严重程度（0-100） |
| causes | Array | 是 | [] | 原因列表，结构见下方 |
| solutionIds | Array | 是 | [] | 关联解决方案ID列表（有序） |
| todayTasks | Array | 是 | [] | 今日执行任务列表，结构见下方 |
| weekPlan | Array | 是 | [] | 7天改善计划，结构见下方 |
| caseIds | Array | 是 | [] | 关联案例ID列表 |
| toolIds | Array | 是 | [] | 关联工具ID列表 |
| priority | Number | 是 | 0 | 匹配优先级，数值越大越优先 |
| status | Number | 是 | 1 | 1=启用 0=禁用 |
| createTime | Date | 是 | 当前时间 | 创建时间 |
| updateTime | Date | 是 | 当前时间 | 更新时间 |

**causes 数组元素结构**：
```json
{
  "name": "门头不够醒目",
  "weight": 85,
  "judgment": "站在马路对面看，3秒内能说出店名和主营吗？",
  "description": "门头是门店最大的免费广告位..."
}
```

**todayTasks 数组元素结构**：
```json
{
  "task": "拍一张自己店铺门头照片",
  "duration": "5分钟",
  "purpose": "客观评估门头吸引力"
}
```

**weekPlan 数组元素结构**：
```json
{
  "day": 1,
  "title": "诊断日",
  "tasks": ["拍门头照片对比竞品", "统计昨日客流数据"]
}
```

**索引**：
- `problemId + industry + stage`：复合索引（核心查询索引）
- `problemId + priority`：复合索引（优先级排序）

### 4.5 biz_solutions（解决方案表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| title | String | 是 | - | 方案标题 |
| summary | String | 是 | - | 30字内摘要 |
| industry | Array | 是 | [] | 适用行业：all/餐饮/零售/服务 |
| stage | Array | 是 | [] | 适用阶段：all/新店/成长期/老店 |
| problemIds | Array | 是 | [] | 关联问题ID列表 |
| background | String | 是 | - | 背景说明（Markdown） |
| approach | String | 是 | - | 解决思路（Markdown） |
| steps | Array | 是 | [] | 具体步骤列表，结构见下方 |
| precautions | Array | 否 | [] | 注意事项列表 |
| expectedEffect | String | 是 | - | 预期效果 |
| difficulty | String | 是 | "简单" | 执行难度：简单/中等/较难 |
| effectiveTime | String | 是 | "3-7天" | 预计见效时间 |
| costRange | String | 是 | "0元" | 成本范围 |
| tags | Array | 否 | [] | 标签名称列表 |
| sortOrder | Number | 是 | 0 | 排序权重 |
| viewCount | Number | 否 | 0 | 浏览次数 |
| favoriteCount | Number | 否 | 0 | 收藏次数 |
| status | Number | 是 | 1 | 1=已发布 0=草稿 |
| createTime | Date | 是 | 当前时间 | 创建时间 |
| updateTime | Date | 是 | 当前时间 | 更新时间 |

**steps 数组元素结构**：
```json
{
  "title": "改造门头",
  "content": "详细说明内容（Markdown）...",
  "checklist": ["确认门头文字大小", "确认主色调对比度"]
}
```

**索引**：
- `status + sortOrder`：复合索引
- `problemIds`：多值索引
- `tags`：多值索引

### 4.6 biz_cases（案例表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| title | String | 是 | - | 案例标题 |
| industry | String | 是 | - | 行业 |
| problemType | String | 是 | - | 问题类型编码 |
| storeSize | String | 否 | - | 店铺规模 |
| stage | String | 否 | - | 经营阶段 |
| cityLevel | String | 否 | - | 城市级别 |
| background | String | 是 | - | 问题背景（Markdown） |
| diagnosis | String | 是 | - | 诊断结果 |
| solutions | Array | 是 | [] | 采取的解决方案列表 |
| process | String | 是 | - | 执行过程（Markdown） |
| effectData | String | 是 | - | 效果数据 |
| keyLessons | Array | 否 | [] | 关键经验列表 |
| relatedSolutionIds | Array | 否 | [] | 关联方案ID列表 |
| imageUrl | String | 否 | - | 案例配图URL |
| tags | Array | 否 | [] | 标签名称列表 |
| sortOrder | Number | 是 | 0 | 排序权重 |
| viewCount | Number | 否 | 0 | 浏览次数 |
| status | Number | 是 | 1 | 1=已发布 0=草稿 |
| createTime | Date | 是 | 当前时间 | 创建时间 |
| updateTime | Date | 是 | 当前时间 | 更新时间 |

**索引**：
- `status + sortOrder`：复合索引
- `industry + problemType`：复合索引
- `tags`：多值索引

### 4.7 biz_tools（工具模板表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| name | String | 是 | - | 工具名称 |
| type | String | 是 | - | 工具类型：Excel模板/检查清单/方案框架/文案模板 |
| category | String | 是 | - | 分类：营销/管理/财务/客户/运营 |
| industry | Array | 是 | ["all"] | 适用行业 |
| problemIds | Array | 否 | [] | 关联问题ID列表 |
| description | String | 是 | - | 工具描述 |
| content | String | 否 | - | 工具内容（Markdown，内嵌模板） |
| fileUrl | String | 否 | - | 附件下载地址（七牛CDN） |
| fileName | String | 否 | - | 附件原始文件名 |
| usageGuide | String | 否 | - | 使用说明（3步） |
| downloadCount | Number | 否 | 0 | 下载次数 |
| favoriteCount | Number | 否 | 0 | 收藏次数 |
| tags | Array | 否 | [] | 标签名称列表 |
| sortOrder | Number | 是 | 0 | 排序权重 |
| status | Number | 是 | 1 | 1=已发布 0=草稿 |
| createTime | Date | 是 | 当前时间 | 创建时间 |
| updateTime | Date | 是 | 当前时间 | 更新时间 |

**索引**：
- `status + category + sortOrder`：复合索引
- `problemIds`：多值索引

### 4.8 biz_tags（标签表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| name | String | 是 | - | 标签名称，唯一 |
| type | String | 是 | - | 标签类型：problem/solution/case/tool |
| color | String | 否 | "#6B7280" | 标签颜色 |
| sortOrder | Number | 是 | 0 | 排序权重 |
| createTime | Date | 是 | 当前时间 | 创建时间 |

**索引**：
- `name + type`：复合唯一索引
- `type + sortOrder`：复合索引

### 4.9 biz_users（用户表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| phone | String | 是 | - | 手机号，唯一索引 |
| nickname | String | 否 | - | 昵称 |
| industry | String | 否 | - | 所属行业 |
| storeStage | String | 否 | - | 经营阶段 |
| inviteCode | String | 否 | - | 邀请码 |
| referrerInviteCode | String | 否 | - | 推荐人邀请码 |
| registerTime | Date | 是 | 当前时间 | 注册时间 |
| lastLoginTime | Date | 否 | - | 最后登录时间 |

**索引**：
- `phone`：唯一索引
- `inviteCode`：普通索引

### 4.10 biz_diagnosis_records（诊断记录表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| userId | String | 是 | - | 用户ID（biz_users._id） |
| problemId | String | 是 | - | 问题ID |
| problemName | String | 是 | - | 问题名称（冗余，方便查询） |
| industry | String | 是 | - | 选择的行业 |
| stage | String | 是 | - | 选择的阶段 |
| symptomIds | Array | 是 | [] | 选择的症状ID列表 |
| symptomNames | Array | 是 | [] | 选择的症状名称（冗余） |
| diagnosisPathId | String | 是 | - | 匹配的诊断路径ID |
| resultSnapshot | Object | 是 | - | 诊断结果快照，结构见下方 |
| isFavorited | Boolean | 否 | false | 是否已收藏 |
| createTime | Date | 是 | 当前时间 | 诊断时间 |

**resultSnapshot 结构**：
```json
{
  "judgment": "问题判断文本",
  "severity": 72,
  "causes": [...],
  "solutionSummaries": [{"id":"xxx","title":"xxx","difficulty":"简单"}],
  "todayTasks": [...],
  "weekPlan": [...],
  "caseTitles": [{"id":"xxx","title":"xxx"}],
  "toolNames": [{"id":"xxx","name":"xxx"}]
}
```

**索引**：
- `userId + createTime`：复合索引（用户历史查询）
- `problemId + createTime`：复合索引（热门统计）
- `createTime`：普通索引（趋势统计）

### 4.11 biz_favorites（收藏表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| userId | String | 是 | - | 用户ID |
| targetType | String | 是 | - | 收藏类型：solution/tool/case/diagnosis |
| targetId | String | 是 | - | 收藏目标ID |
| targetTitle | String | 是 | - | 目标标题（冗余，列表展示用） |
| createTime | Date | 是 | 当前时间 | 收藏时间 |

**索引**：
- `userId + targetType + targetId`：复合唯一索引（防重复）
- `userId + targetType + createTime`：复合索引（收藏列表）

### 4.12 biz_admin_users（管理员表）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| _id | String | 自动 | - | 主键 |
| username | String | 是 | - | 用户名，唯一索引 |
| password | String | 是 | - | 密码（SHA256加密存储） |
| role | String | 是 | "admin" | 角色：super_admin/admin |
| lastLoginTime | Date | 否 | - | 最后登录时间 |
| createTime | Date | 是 | 当前时间 | 创建时间 |

**索引**：
- `username`：唯一索引

---

## 第五部分：核心业务逻辑设计

### 5.1 用户点击问题分类后进入诊断流程

```
┌──────────────────────────────────────────────────────┐
│ 流程步骤                                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│ 1. 用户在首页点击问题按钮（如"没有客流"）              │
│    → 获取 problemCode = "TRAFFIC_LOW"                │
│    → 跳转 diagnosis.html?problem=TRAFFIC_LOW         │
│                                                      │
│ 2. diagnosis.html 初始化                              │
│    → URL参数解析 problemCode                          │
│    → 调用 biz-problem-list 获取问题详情               │
│    → 展示问题确认卡片                                 │
│                                                      │
│ 3. 用户选择行业                                       │
│    → state.industry = "餐饮"                          │
│    → 根据行业过滤下一步可选项                          │
│                                                      │
│ 4. 用户选择经营阶段                                   │
│    → state.stage = "成长期"                           │
│    → 根据 industry + stage 过滤症状选项               │
│                                                      │
│ 5. 用户选择症状（可多选）                              │
│    → state.symptomIds = ["S01", "S03"]               │
│    → 点击"生成诊断结果"                               │
│                                                      │
│ 6. 前端展示过渡动画（1.5秒）                          │
│    → 同时调用 biz-diagnosis-query                     │
│                                                      │
│ 7. 云函数返回诊断结果                                 │
│    → 跳转 result.html?recordId=xxx                   │
│    → 渲染诊断结果页                                   │
│                                                      │
│ 状态管理：                                            │
│ - 使用 sessionStorage 存储诊断流程状态                │
│ - 返回上一步时恢复选择                                │
│ - 诊断完成后清除流程状态                              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**诊断流程状态对象**：
```javascript
// sessionStorage key: 'biz_diagnosis_state'
{
  currentStep: 3,           // 当前步骤（1-4）
  problemCode: 'TRAFFIC_LOW',
  problemName: '没有客流',
  industry: '餐饮',
  stage: '成长期',
  symptomIds: ['S01', 'S03'],
  startTime: 1721712000000  // 流程开始时间
}
```

### 5.2 根据用户选择匹配解决方案

**核心匹配算法**（云函数 `biz-diagnosis-query`）：

```javascript
async function matchDiagnosis(problemCode, industry, stage, symptomIds) {
  
  // 第1步：查询所有匹配的诊断路径
  const paths = await db.collection('biz_diagnosis_paths')
    .where({
      problemCode: problemCode,
      status: 1,
      industry: _.in([industry, 'all']),
      stage: _.in([stage, 'all'])
    })
    .orderBy('priority', 'desc')
    .get();
  
  // 第2步：按症状匹配度排序
  const scored = paths.data.map(path => {
    let score = path.priority;  // 基础分
    
    if (path.symptomMatchMode === 'all') {
      // 全部匹配模式：用户选择的症状必须包含路径所有症状
      const allMatch = path.symptomIds.every(sid => symptomIds.includes(sid));
      score = allMatch ? score + 1000 : -1;  // 不匹配直接排除
    } else {
      // 任一匹配模式：计算交集比例
      const intersection = path.symptomIds.filter(sid => symptomIds.includes(sid));
      score += intersection.length * 100;  // 每个匹配症状加100分
      
      // 行业精确匹配加分
      if (path.industry === industry) score += 50;
      
      // 阶段精确匹配加分
      if (path.stage === stage) score += 30;
    }
    
    return { ...path, matchScore: score };
  });
  
  // 第3步：过滤掉不匹配的，取得分最高的
  const valid = scored.filter(p => p.matchScore > 0)
                       .sort((a, b) => b.matchScore - a.matchScore);
  
  if (valid.length === 0) {
    // 无精确匹配，回退到通用路径
    return await getFallbackPath(problemCode, industry, stage);
  }
  
  const bestMatch = valid[0];
  
  // 第4步：组装完整诊断结果
  return await assembleDiagnosisResult(bestMatch);
}

async function assembleDiagnosisResult(path) {
  // 并行查询关联数据
  const [solutions, cases, tools] = await Promise.all([
    fetchByids('biz_solutions', path.solutionIds),
    fetchByids('biz_cases', path.caseIds),
    fetchByids('biz_tools', path.toolIds)
  ]);
  
  return {
    judgment: path.judgment,
    severity: path.severity,
    causes: path.causes.sort((a, b) => b.weight - a.weight),
    solutions: solutions,
    todayTasks: path.todayTasks,
    weekPlan: path.weekPlan,
    cases: cases,
    tools: tools
  };
}
```

**匹配优先级规则**：

| 匹配维度 | 加分 | 说明 |
|---------|------|------|
| 基础优先级 | path.priority | 后台配置的基础权重 |
| 症状交集 | +100/个 | 每匹配一个症状加分 |
| 行业精确匹配 | +50 | 行业非"all"且匹配 |
| 阶段精确匹配 | +30 | 阶段非"all"且匹配 |
| 全部匹配模式 | +1000 | 所有症状都匹配 |

**回退策略**：
1. 优先匹配 industry + stage 都精确的路径
2. 其次匹配 industry 精确 + stage 为 all 的路径
3. 再次匹配 industry 为 all + stage 精确的路径
4. 最后使用 industry=all + stage=all 的通用路径

### 5.3 如何展示诊断结果

**前端渲染逻辑**：

```
result.html 接收参数：
  - recordId（从诊断流程跳转）
  - 或 problemCode + industry + stage + symptomIds（从收藏/历史跳转）

渲染流程：
1. 根据 recordId 查询 biz_diagnosis_records 获取 resultSnapshot
   或根据参数重新调用 biz-diagnosis-query 获取实时结果

2. 渲染问题概览卡
   - 问题名称 + 行业/阶段标签
   - 严重程度进度条（颜色按等级变化）
   - 同行比例提示（从 diagnosisCount 计算）

3. 渲染可能原因列表
   - 按 weight 降序排列
   - 每条显示：名称 + 可能性百分比 + 判断提示
   - 点击展开详细说明

4. 渲染推荐方案卡片
   - 方案标题 + 摘要
   - 难度/见效时间/成本 标签
   - 点击跳转方案详情页

5. 渲染今日执行任务
   - 可勾选的 checkbox 列表
   - 勾选状态保存在 localStorage
   - 每条显示：任务 + 预计耗时

6. 渲染7天改善计划
   - 顶部日期选择器（D1-D7横向滚动）
   - 下方展示选中日期的任务列表

7. 渲染相关案例和工具
   - 案例卡片列表
   - 工具卡片横向滚动
```

### 5.4 如何记录用户行为

**行为记录点**：

| 行为 | 记录方式 | 数据表 |
|------|---------|--------|
| 开始诊断 | 保存流程状态 | sessionStorage |
| 完成诊断 | 保存诊断记录 | biz_diagnosis_records |
| 查看方案 | 方案 viewCount +1 | biz_solutions |
| 收藏操作 | 添加/删除收藏记录 | biz_favorites |
| 下载工具 | 工具 downloadCount +1 | biz_tools |
| 查看案例 | 案例 viewCount +1 | biz_cases |

**诊断记录保存逻辑**（云函数 `biz-diagnosis-save`）：

```javascript
async function saveDiagnosisRecord(userId, diagnosisParams, result) {
  // 1. 保存诊断记录
  const record = {
    userId,
    problemId: diagnosisParams.problemId,
    problemName: diagnosisParams.problemName,
    industry: diagnosisParams.industry,
    stage: diagnosisParams.stage,
    symptomIds: diagnosisParams.symptomIds,
    symptomNames: diagnosisParams.symptomNames,
    diagnosisPathId: result.pathId,
    resultSnapshot: {
      judgment: result.judgment,
      severity: result.severity,
      causes: result.causes,
      solutionSummaries: result.solutions.map(s => ({
        id: s._id, title: s.title, difficulty: s.difficulty
      })),
      todayTasks: result.todayTasks,
      weekPlan: result.weekPlan,
      caseTitles: result.cases.map(c => ({ id: c._id, title: c.title })),
      toolNames: result.tools.map(t => ({ id: t._id, name: t.name }))
    },
    createTime: new Date()
  };
  
  await db.collection('biz_diagnosis_records').add({ data: record });
  
  // 2. 更新问题诊断次数
  await db.collection('biz_problems').doc(diagnosisParams.problemId).update({
    data: { diagnosisCount: _.inc(1) }
  });
  
  return { success: true };
}
```

---

## 第六部分：后台管理逻辑

### 6.1 管理员认证流程

```
管理员打开 /admin/login.html
  │
  ▼
输入用户名 + 密码
  │
  ▼
调用 biz-admin-auth 云函数
  │
  ├─ 验证用户名密码（SHA256比对）
  ├─ 生成 sessionId，存入 biz_admin_sessions 集合
  ├─ 返回 sessionId + 角色信息
  │
  ▼
前端存入 localStorage
  │
  ▼
后续请求携带 sessionId
  │
  ▼
云函数校验 sessionId 有效性（8小时过期）
```

### 6.2 添加问题

```
管理员进入 /admin/problems.html
  │
  ▼
点击"新增问题"
  │
  ▼
填写表单：
  - 问题名称（如"没有客流"）
  - 问题编码（如"TRAFFIC_LOW"）
  - 图标（选择emoji或上传SVG）
  - 主题色（颜色选择器）
  - 描述
  - 排序权重
  │
  ▼
调用 biz-problem-crud（action=create）
  │
  ├─ 校验编码唯一性
  ├─ 写入 biz_problems 集合
  └─ 返回成功
  │
  ▼
列表刷新，展示新问题
  │
  ▼
继续为该问题添加症状选项
  - 点击问题行的"症状"按钮
  - 在展开区域点击"新增症状"
  - 填写症状名称、行业过滤、阶段过滤
```

### 6.3 配置诊断流程

```
管理员进入 /admin/diagnosis-paths.html
  │
  ▼
点击"新增诊断路径"
  │
  ▼
选择关联问题（下拉选择）
选择适用行业
选择适用阶段
  │
  ▼
配置症状匹配：
  - 选择匹配模式（任一匹配/全部匹配）
  - 勾选关联症状
  │
  ▼
填写诊断内容：
  - 问题判断文本
  - 默认严重程度（滑块0-100）
  │
  ▼
配置原因排序：
  - 动态添加原因条目
  - 每条：名称 + 可能性权重 + 判断提示 + 描述
  - 可拖拽排序
  │
  ▼
关联解决方案：
  - 从已有方案中选择（支持搜索）
  - 可调整方案展示顺序
  │
  ▼
配置今日任务：
  - 动态添加任务条目
  - 每条：任务描述 + 预计耗时 + 目的说明
  │
  ▼
配置7天计划：
  - 7个Tab（Day1-Day7）
  - 每天填写标题 + 任务列表
  │
  ▼
关联案例和工具：
  - 从已有案例/工具中选择
  │
  ▼
设置优先级
  │
  ▼
保存 → 调用 biz-diagnosis-path-crud（action=create）
```

### 6.4 上传解决方案

```
管理员进入 /admin/solutions.html
  │
  ▼
点击"新增方案"
  │
  ▼
填写基本信息：
  - 方案标题
  - 30字摘要
  - 适用行业（多选）
  - 适用阶段（多选）
  - 关联问题（多选）
  - 执行难度
  - 见效时间
  - 成本范围
  │
  ▼
编辑方案内容（Markdown编辑器）：
  - 背景说明
  - 解决思路
  - 具体步骤（动态添加，每步含标题+内容+检查清单）
  - 注意事项
  │
  ▼
添加标签
  │
  ▼
选择状态：草稿/发布
  │
  ▼
保存 → 调用 biz-solution-crud（action=create/update）
```

### 6.5 管理案例

```
新增案例表单：
  - 案例标题
  - 行业/问题类型/店铺规模/经营阶段/城市级别
  - 问题背景（Markdown）
  - 诊断结果
  - 解决方案列表（动态添加）
  - 执行过程（Markdown）
  - 效果数据
  - 关键经验（动态添加）
  - 关联方案（选择已有方案）
  - 案例配图（上传到七牛云 bizcases 文件夹）
  - 标签
  - 状态：草稿/发布
```

### 6.6 管理工具模板

```
新增工具表单：
  - 工具名称
  - 工具类型（下拉）
  - 分类（下拉）
  - 适用行业（多选）
  - 关联问题（多选）
  - 工具描述
  - 工具内容（Markdown，内嵌模板内容）
  - 附件上传（上传到七牛云 biztools 文件夹）
    → 上传逻辑：调用 biz-tool-crud 获取上传凭证
    → 前端直传七牛云
    → 返回文件URL存入 fileUrl 字段
  - 使用说明
  - 标签
  - 状态：草稿/发布
```

---

## 第七部分：开发任务拆分

### 阶段1：项目初始化

| 任务 | 产出 |
|------|------|
| 创建 business 目录结构 | 完整目录树 |
| 创建 server.js 本地开发服务器 | 本地可访问 http://localhost:8081/business/ |
| 创建 CSS 变量文件 variables.css | 主题色、字号、间距变量定义 |
| 创建 base.css 基础样式 | reset、通用类、响应式断点 |
| 创建 components.css 组件样式 | 按钮、卡片、步骤条、标签等 |
| 创建 data-service.js 数据服务层骨架 | 云函数调用封装、缓存、错误处理 |
| 创建 app.js 应用骨架 | 全局状态管理、路由、初始化逻辑 |
| 创建 utils.js 工具函数 | 日期格式化、数据验证等 |

### 阶段2：数据库建立

| 任务 | 产出 |
|------|------|
| 创建所有数据库集合 | 12个集合创建完毕 |
| 创建索引 | 所有索引配置完毕 |
| 插入初始管理员 | biz_admin_users 1条记录 |
| 插入8大问题数据 | biz_problems 8条记录 |
| 插入症状选项数据 | biz_symptoms ~40条记录 |
| 插入核心诊断路径 | biz_diagnosis_paths ~10条记录（先覆盖最核心场景） |
| 插入种子解决方案 | biz_solutions ~10条记录 |
| 插入初始案例 | biz_cases 3-5条记录 |
| 插入初始工具 | biz_tools 5-10条记录 |
| 插入标签数据 | biz_tags ~20条记录 |
| 编写 biz-init-data 云函数 | 一键初始化脚本 |

### 阶段3：用户端页面开发

| 任务 | 产出 |
|------|------|
| 首页 index.html | 问题选择界面、热门排行、行业专区、工具推荐 |
| 登录页 login.html | 手机号+验证码登录（复用postdiy逻辑） |
| 个人中心 profile.html | 诊断历史、收藏列表、账号设置 |
| 方案库 solutions.html | 方案列表、筛选、搜索 |
| 方案详情 solution-detail.html | 方案完整内容展示 |
| 案例库 cases.html | 案例列表、行业筛选 |
| 案例详情 case-detail.html | 案例完整内容展示 |
| 工具库 tools.html | 工具列表、分类筛选 |
| 工具详情 tool-detail.html | 工具内容、下载 |

### 阶段4：诊断流程开发

| 任务 | 产出 |
|------|------|
| 诊断流程页 diagnosis.html | 4步引导界面、步骤切换、状态管理 |
| 诊断过渡动画 | 分析进度条动画 |
| 诊断结果页 result.html | 完整诊断结果渲染、收藏、今日任务勾选、7天计划 |
| biz-problem-list 云函数 | 问题列表+热门统计 |
| biz-diagnosis-query 云函数 | 核心诊断匹配算法 |
| biz-diagnosis-save 云函数 | 保存诊断记录 |
| 前端数据服务层完善 | 所有云函数调用封装 |
| 端到端测试 | 首页→诊断→结果完整流程 |

### 阶段5：后台管理开发

| 任务 | 产出 |
|------|------|
| 后台登录页 admin/login.html | 管理员认证 |
| 后台首页 admin/index.html | 仪表盘、核心数据 |
| 问题管理 admin/problems.html | 问题+症状的增删改查 |
| 诊断流程管理 admin/diagnosis-paths.html | 诊断路径配置 |
| 方案管理 admin/solutions.html | 方案CRUD + Markdown编辑 |
| 案例管理 admin/cases.html | 案例CRUD + 图片上传 |
| 工具管理 admin/tools.html | 工具CRUD + 附件上传 |
| 标签管理 admin/tags.html | 标签CRUD |
| 数据统计 admin/stats.html | 诊断趋势、问题分布、收藏排行 |
| 所有后台云函数 | biz-admin-*、biz-*-crud 系列 |

### 阶段6：测试优化

| 任务 | 产出 |
|------|------|
| 诊断流程完整性测试 | 8大问题×3行业×3阶段 全路径覆盖测试 |
| 移动端适配测试 | iPhone/Android主流机型适配 |
| WebView 兼容测试 | APP内嵌浏览器兼容性验证 |
| 加载性能优化 | 首屏<2秒，诊断结果<1秒 |
| 数据完整性验证 | 100个问题方案数据录入验证 |
| 错误处理完善 | 网络异常、数据缺失的降级处理 |
| 分享功能 | 诊断结果分享（生成海报/复制链接） |

---

## 第八部分：V1.0 功能边界

### V1.0 必须完成的功能

| 模块 | 功能 | 说明 |
|------|------|------|
| **诊断核心** | 4步点击式诊断流程 | 核心价值，必须完美 |
| **诊断核心** | 诊断结果页（7大模块） | 判断+原因+方案+任务+计划+案例+工具 |
| **诊断核心** | 8大问题×3行业×3阶段覆盖 | 至少50条诊断路径 |
| **方案库** | 方案列表+详情 | 浏览+搜索+筛选 |
| **方案库** | 100个解决方案 | V1.0核心内容目标 |
| **案例库** | 案例列表+详情 | 行业+问题筛选 |
| **案例库** | 30个真实案例 | 覆盖3大行业 |
| **工具库** | 工具列表+详情+下载 | 分类筛选 |
| **工具库** | 20个工具模板 | 5大分类各4个 |
| **用户系统** | 手机号+验证码登录 | 复用postdiy |
| **用户系统** | 诊断历史记录 | 查看历史诊断结果 |
| **用户系统** | 收藏功能 | 方案/工具/案例收藏 |
| **后台管理** | 管理员认证 | 登录+Session |
| **后台管理** | 问题+症状管理 | 增删改查 |
| **后台管理** | 诊断路径配置 | 核心配置功能 |
| **后台管理** | 方案管理 | CRUD + 发布/草稿 |
| **后台管理** | 案例管理 | CRUD + 图片上传 |
| **后台管理** | 工具管理 | CRUD + 附件上传 |
| **后台管理** | 标签管理 | CRUD |
| **后台管理** | 基础数据统计 | 诊断次数+问题分布 |

### V1.0 暂不开发的功能

| 功能 | 说明 | 计划版本 |
|------|------|---------|
| AI智能问答 | AI聊天机器人诊断 | V2.0 |
| AI方案生成 | 大模型生成个性化方案 | V2.0 |
| 语音输入 | 语音描述问题 | V2.0 |
| 用户社区/论坛 | 老板交流社区 | V3.0 |
| 付费会员/VIP | 付费解锁高级内容 | V2.0 |
| 在线支付 | 支付系统 | V2.0 |
| 消息推送 | 7天计划每日提醒 | V2.0 |
| 数据导出 | 诊断报告PDF导出 | V2.0 |
| 多语言 | 英文/日文版本 | V3.0 |
| 复杂权限 | 多角色权限管理 | V2.0 |
| 方案评分/反馈 | 用户对方案打分评价 | V2.0 |
| 方案对比 | 多方案对比选择 | V2.0 |
| 诊断报告分享 | 生成分享海报 | V1.1（快速迭代） |
| 离线缓存 | PWA离线使用 | V2.0 |
| A/B测试 | 诊断流程A/B测试 | V3.0 |
| 埋点分析 | 用户行为详细追踪 | V2.0 |

---

> **文档结束**  
> 本文档为《实体商家经营诊断系统 V1.0 技术架构设计文档》  
> 三份核心文档（PRD + 产品设计方案 + 技术架构）已全部完成  
> 可进入开发阶段。
