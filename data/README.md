# 测试数据管理系统

本目录采用统一配置 + 自动收集机制管理测试数据，简化了测试添加流程。

## 目录结构

```
data/
├── config.js            # 唯一配置文件（仅定义分类信息）
├── template.js          # 测试文件模板
├── cover/               # 测试封面图片目录
├── sounds/              # 音效文件目录
├── 闯关学习类/           # 分类目录
├── 心理测评类/
├── 职业与学习类/
├── 爱情与人际关系类/
├── 趣味娱乐类/
├── 健康与生活习惯类/
└── README.md
```

## 如何添加新的测试

只需 **2 步**：

### 步骤 1: 创建测试文件

1. 复制 `template.js` 到对应分类目录
2. 重命名为测试ID（如 `new_test.js`）
3. 编辑内容，填写测试信息

### 步骤 2: 在 index.html 中引入

找到对应分类的注释区块，添加一行：

```html
<script src="data/分类名/new_test.js"></script>
```

保存后刷新页面即可。

## 测试文件格式

每个测试文件包含完整信息，是唯一数据源：

```javascript
(function() {
    const testId = 'your_test_id';
    
    const testData = {
        id: testId,
        title: '测试标题',
        description: '测试描述',
        category: '心理测评类',  // 所属分类
        questionCount: 10,
        estimateMinutes: 5,
        questions: [...],
        resultRanges: [...]
    };
    
    // 注册到全局
    window.TestDatasets[testData.id] = testData;
})();
```

## 如何添加新分类

1. 在 `config.js` 的 `categories` 中添加分类定义
2. 在 `data/` 目录下创建对应分类文件夹
3. 在 `index.html` 中添加分类区块注释

## 注意事项

- 测试文件名必须与 `testId` 一致
- 每个测试只能属于一个分类
- 封面图片命名为 `测试ID.jpg`，放在 `data/cover/` 目录