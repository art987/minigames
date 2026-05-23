// 自动生成知识点备忘录页面的脚本
// 使用方法：在浏览器控制台运行此脚本，或修改下面的配置后运行

// ===== 配置区域 =====
const pageConfig = {
    // 基本信息
    themeName: "Python编程",           // 主题名称
    themeDescription: "掌握核心要点，提升编程技能",  // 副标题
    backgroundImage: "python-bg",      // 背景图片名（不含.png）
    
    // SEO信息
    keywords: "Python编程, 语法基础, 数据结构, 函数定义, 面向对象, 异常处理, 文件操作, 模块导入",
    description: "一份涵盖Python编程核心知识点的备忘录，帮助开发者快速掌握重要语法和概念。",
    
    // 关键词数组（用于搜索）
    keywordArray: [
        "Python编程", "语法基础", "数据结构", "函数定义", "面向对象", 
        "异常处理", "文件操作", "模块导入", "列表操作", "字典使用"
    ],
    
    // 分类内容（按以下格式填写）
    categories: [
        {
            name: "🐍基础语法",
            description: "🐍 掌握Python基础语法，建立编程基础",
            items: [
                {
                    title: "变量定义",
                    description: "Python中变量的定义和命名规则",
                    link: "https://docs.python.org/3/tutorial/introduction.html"
                },
                {
                    title: "数据类型",
                    description: "字符串、数字、布尔值等基本数据类型",
                    link: "https://docs.python.org/3/library/stdtypes.html"
                },
                {
                    title: "运算符",
                    description: "算术、比较、逻辑运算符的使用",
                    link: "https://docs.python.org/3/reference/expressions.html"
                }
            ]
        },
        {
            name: "📊数据结构",
            description: "📊 掌握列表、字典等核心数据结构",
            items: [
                {
                    title: "列表操作",
                    description: "列表的创建、增删改查等操作",
                    link: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
                },
                {
                    title: "字典使用",
                    description: "字典的定义和常用操作方法",
                    link: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
                }
            ]
        },
        {
            name: "🔧函数定义",
            description: "🔧 掌握函数的定义和调用方法",
            items: [
                {
                    title: "函数语法",
                    description: "def关键字定义函数的基本语法",
                    link: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
                },
                {
                    title: "参数传递",
                    description: "位置参数、关键字参数、默认参数的使用",
                    link: "https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions"
                }
            ]
        }
    ]
};

// ===== 生成函数 =====
function generateDataFile() {
    let content = `const data = {
    title: {
        h1: "${pageConfig.themeName}备忘录",
        p: "${pageConfig.themeDescription}"
    },
    head: {
        title: "${pageConfig.themeName}备忘录",
        keywords: "${pageConfig.keywords}",
        description: "${pageConfig.description}"
    },
    keywords: [${pageConfig.keywordArray.map(k => `"${k}"`).join(', ')}],
    content: {`;

    pageConfig.categories.forEach(category => {
        content += `
        "${category.name}|${category.description}": [`;
        
        category.items.forEach(item => {
            content += `
            "<c> <h4>${item.title}</h4> <p>${item.description}</p> <nav>${item.link}</nav></c>",`;
        });
        
        content += `
        ],`;
    });

    content += `
    }
};`;

    return content;
}

function generateHtmlFile() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageConfig.themeName}备忘录</title>
    <link rel="stylesheet" href="https://peacelove.top/menu.css">
    <link rel="stylesheet" href="styles.css">
	<meta name="keywords" content="">
	<meta name="description" content="">
	
    <script src="https://code.responsivevoice.org/responsivevoice.js?key=tCF5EpUw"></script>
    <script src="data-${pageConfig.themeName.toLowerCase().replace(/\s+/g, '-')}.js" defer></script>
    <script src="script.js" defer></script>
</head>
<body style="background: url(${pageConfig.backgroundImage}.png) no-repeat top center;">
 <div id="navbar-container"></div>

    <div class="title">
        <h1 id="title-h1"></h1>
        <p id="title-p"></p>
    </div>
    <div class="search-container" id="search-container">
        <input type="text" id="search-input" placeholder="输入关键词搜索...">
        <div class="clear-btn" id="clear-search" style="display: none;">X</div>
    </div>
    <div class="marquee">
        <div class="tip">热搜：</div>
        <div class="keywords" id="keywords-container"></div>
        <button id="show-all-keywords" class="show-all-keywords">⚓︎</button>
    </div>
	<div class="tagsbox" >
		<div class="tip" >分类：</div> 
		<div class="tags" id="tags-container">
		</div>
		<button id="show-all-tags" class="show-all-tags">☸</button>
	</div>
	<div id="floating-tags-container" class="floating-tags"></div>
    <div class="content" id="content-container"></div>
    <div id="keyword-modal" class="modal">
        <div class="modal-content">
            <span class="close-button" id="close-modal">&times;</span>
            <div id="modal-keywords-container"></div>
        </div>
    </div>
	<button id="auto-scroll-button">⇢</button>
	  <button id="back-to-top">⇪</button>
	  
<script src="https://peacelove.top/menu-functions.js"></script>
</body>
</html>`;
}

// ===== 输出结果 =====
console.log("=== 生成的数据文件内容 ===");
console.log(generateDataFile());

console.log("\n=== 生成的HTML文件内容 ===");
console.log(generateHtmlFile());

console.log("\n=== 使用说明 ===");
console.log("1. 复制上面的数据文件内容，保存为 data-[主题名].js");
console.log("2. 复制上面的HTML文件内容，保存为 [主题名].html");
console.log("3. 确保背景图片文件存在");
console.log("4. 根据需要调整分类和内容");
