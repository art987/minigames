// JavaScript Documentconst fs = require("fs");

const fs = require("fs");

const path = require("path");

// 读取模板文件和 JSON 数据
const template = fs.readFileSync("template.html", "utf-8");
const articles = JSON.parse(fs.readFileSync("index.json", "utf-8"));

// 创建页面
for (const slug in articles) {
  const article = articles[slug];

  // 替换模板中的变量
  let html = template
    .replace(/{{title}}/g, article.title)
    .replace(/{{description}}/g, article.description || "")
    .replace(/{{keywords}}/g, Array.isArray(article.keywords) ? article.keywords.join(", ") : "")
    .replace(/{{date}}/g, article.date || "")
    .replace(/{{image}}/g, article.image || "")
    .replace(/{{content}}/g, article.content || "");

  // 写入到 slug.html
  fs.writeFileSync(path.join(__dirname, `${slug}.html`), html, "utf-8");
  console.log(`✅ 页面已生成：${slug}.html`);
}
