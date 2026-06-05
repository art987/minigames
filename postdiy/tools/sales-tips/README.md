# 销售成交话术库

一个纯前端的销售话术查询工具，无需后端，直接运行。

## 项目特点

- 🚀 纯前端静态网页，无后端依赖
- 📱 移动端优先，响应式设计
- 🔍 实时模糊搜索
- ❤️ 收藏功能（本地存储）
- 📝 编辑功能（本地存储）
- 📋 一键复制话术
- 💬 微信专用话术

## 文件结构

```
sales-tips/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── data.js         # 话术数据（可扩展）
│   ├── search.js       # 搜索逻辑
│   └── app.js          # 主应用逻辑
└── assets/             # 资源文件夹
```

## 使用方法

1. 直接双击 `index.html` 即可在浏览器中打开
2. 或使用任何静态服务器打开

## 数据说明

所有话术数据存储在 `js/data.js` 中，您可以：

- 修改现有话术
- 添加新的话术
- 修改分类和关键词

数据格式：
```javascript
const scripts = [
  {
    id: 1,
    category: "价格异议",
    title: "客户觉得太贵",
    keywords: ["太贵", "价格高"],
    customer: "太贵了",
    psychology: "价值感不足",
    level: 5,
    replies: ["话术1", "话术2"],
    wechatReply: "微信专用话术"
  }
];
```

## 分类说明

- 价格异议
- 观望犹豫
- 信任问题
- 需求不足
- 家人决策
- 促成交
- 售后维护

## 本地存储

- 收藏：localStorage.salesFavorites
- 最近搜索：localStorage.salesRecentSearches
- 编辑历史：localStorage.salesEditedScripts
