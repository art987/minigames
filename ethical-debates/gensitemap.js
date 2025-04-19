const fs = require("fs");
const path = require("path");

// 配置你的站点域名（末尾不要加 /）
const siteUrl = "https://peacelove.top/ethical-debates";

// 可排除的页面（不生成 sitemap 链接）
const exclude = ["template.html", "404.html"];

const files = fs.readdirSync(__dirname);

const urls = files
  .filter(file => file.endsWith(".html") && !exclude.includes(file))
  .map(file => {
    return `
  <url>
    <loc>${siteUrl}/${file}</loc>
    <priority>${file === "index.html" ? "1.0" : "0.8"}</priority>
  </url>`;
  });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap, "utf-8");

console.log("✅ sitemap.xml 生成成功！");
