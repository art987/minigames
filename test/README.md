# 心理测试中心 - 使用指南

## 项目介绍
这是一个纯前端的心理测试平台，支持多种类型的测试项目，包括心理测试、知识测试、智力测试、情商测试、性格测试和职业倾向测试。用户可以完成测试并获得证书样式的测试结果。

## 系统架构

### 核心文件结构
- `index.html`: 网站首页，显示测试分类和测试列表
- `run.html`: 测试运行页面，负责加载和展示测试题目
- `styles.css`: 全局样式文件
- `js/runner.js`: 测试运行器核心逻辑
- `js/tests.js`: 测试注册和管理工具
- `data/test-config.js`: 测试配置文件，定义测试元数据和分类
- `data/test-categories.js`: 分类配置文件
- `data/data-scanner.js`: 测试文件自动扫描工具
- `data/{category}/`: 各分类的测试数据文件目录

## 添加新测试项目

### 简单方法（推荐）
只需完成以下两个步骤，新测试项目将自动显示在网站首页：

1. **创建测试数据文件**
   在 `data` 目录下对应的分类目录中创建一个 JavaScript 文件，文件名即为测试ID。例如：
   ```
   data/knowledge/my-new-test.js  # 在知识测试分类下创建测试ID为my-new-test的测试
   ```

2. **编辑测试数据文件内容**
   测试数据文件需要包含以下结构：
   ```javascript
   // 定义测试数据集
   window.TestDatasets = window.TestDatasets || {};
   window.TestDatasets['my-new-test'] = {
       // 测试基本信息
       id: 'my-new-test',
       title: '我的新测试标题',
       introduction: '测试介绍内容...',
       category: 'knowledge', // 测试分类
       
       // 测试题目
       questions: [
           {
               id: 1,
               text: '第一个问题内容',
               multi: false, // 是否为多选题
               options: [
                   { label: '选项A', score: 10 },
                   { label: '选项B', score: 0 }
               ]
           },
           // 更多题目...
       ],
       
       // 评分标准
       scoring: {
           levels: [
               { min: 0, max: 10, level: '初阶', description: '继续努力' },
               { min: 11, max: 20, level: '进阶', description: '做得不错' }
           ]
       }
   };
   
   // 注册测试元数据
   window.TestRegistry.register({
       id: 'my-new-test',
       title: '我的新测试标题',
       description: '测试详细描述...',
       category: 'knowledge',
       questionCount: 10, // 题目数量
       estimateMinutes: 5 // 估计完成时间（分钟）
   });
   ```

### 手动配置方法（备用）
如果自动注册失败，可以手动在 `test-config.js` 中添加测试配置：

1. 打开 `data/test-config.js` 文件
2. 在 `testsByCategory` 对象中找到对应的分类，添加测试配置：
   ```javascript
   testsByCategory: {
       'knowledge': [
           // 现有测试...
           {
               id: 'my-new-test',
               title: '我的新测试标题',
               description: '测试详细描述...',
               questionCount: 10,
               estimateMinutes: 5
           }
       ],
       // 其他分类...
   }
   ```

3. 确保在对应的分类目录中创建了测试数据文件：`data/knowledge/my-new-test.js`

## 测试分类说明

系统支持以下分类，每个分类有对应的目录和图标：

| 分类ID | 分类名称 | 目录路径 | 图标 |
|--------|----------|----------|------|
| 心理测评类 | 心理测评类 | data/心理测评类/ | 🧠 |
| 职业与学习类 | 职业与学习类 | data/职业与学习类/ | 🎓 |
| 爱情与人际关系类 | 爱情与人际关系类 | data/爱情与人际关系类/ | 💑 |
| 趣味娱乐类 | 趣味娱乐类 | data/趣味娱乐类/ | 🎉 |
| 健康与生活习惯类 | 健康与生活习惯类 | data/健康与生活习惯类/ | 🏃 |
| 闯关学习类 | 闯关学习类 | data/闯关学习类/ | 📚 |

## 测试结果证书定制

测试结果将以证书样式展示。如需调整证书样式，请修改 `run.html` 中 `result-card` 相关的 CSS 和 HTML 结构。

## 技术细节

### 测试加载流程
1. 首页 (`index.html`) 加载 `test-config.js` 获取测试配置
2. 用户点击测试项，跳转到 `run.html` 并传递 `testId` 和 `category` 参数
3. `run.html` 根据参数动态加载对应的测试数据文件
4. `runner.js` 解析测试数据并渲染测试界面

### 数据扫描机制
系统包含自动扫描工具 (`data-scanner.js`)，可以自动发现和注册测试文件。如果添加新测试后未在首页显示，请刷新页面或检查浏览器控制台是否有错误信息。

## 注意事项
- 所有测试数据仅保存在本地浏览器中，不会上传到服务器
- 测试结果可以保存为图片到本地
- 确保测试数据文件格式正确，否则可能导致测试无法正常加载
- 如需添加新的测试分类，请联系开发人员进行系统配置修改

---

最后更新日期: " + new Date().toLocaleDateString('zh-CN') + "