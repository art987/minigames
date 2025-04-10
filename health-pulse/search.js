const articleListContainer = document.getElementById("article-list");
let allArticles = {}; // 存储 index.json 的数据

// 高亮匹配关键词
function highlightText(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

// 渲染文章列表
function renderArticles(articleEntries, keyword = "") {
    articleListContainer.innerHTML = "";
    articleEntries.forEach(([key, article]) => {
        const highlightedTitle = highlightText(article.title, keyword);
        const highlightedDesc = highlightText(article.description || "", keyword);

        const articleItem = document.createElement("a");
        articleItem.href = `${key}.html`;
        articleItem.classList.add("article-item");

        articleItem.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <div class="article-info">
                <h2>${highlightedTitle}</h2>
                <p class="article-meta">${article.date || '未注明时间'}</p>
                <p>${highlightedDesc}</p>
            </div>
        `;

        articleListContainer.appendChild(articleItem);
    });
}

// 异步加载 index.json 并初始化页面
fetch("index.json")
    .then(res => res.json())
    .then(data => {
        allArticles = data;
        renderArticles(Object.entries(allArticles));
    })
    .catch(err => {
        articleListContainer.innerHTML = "<p>加载文章列表失败，请稍后重试。</p>";
        console.error("❌ 无法加载 index.json", err);
    });

// 搜索功能
document.getElementById("searchBtn").addEventListener("click", function () {
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!keyword) return;

    const matched = Object.entries(allArticles).filter(([_, article]) => {
        const title = (article.title || "").toLowerCase();
        const keywords = Array.isArray(article.keywords)
            ? article.keywords.join(" ").toLowerCase()
            : (article.keywords || "").toLowerCase();
        return title.includes(keyword) || keywords.includes(keyword);
    });

    renderArticles(matched, keyword);

    // 显示“全部”按钮
    document.getElementById("resetBtn").style.display = "inline-block";
});

// 重置按钮：显示全部文章
document.getElementById("resetBtn").addEventListener("click", function () {
    document.getElementById("searchInput").value = "";
    renderArticles(Object.entries(allArticles));
    this.style.display = "none"; // 隐藏“全部”按钮
});

// 搜索框清除按钮逻辑
const searchInput = document.getElementById("searchInput");
const clearInputBtn = document.getElementById("clearInputBtn");

searchInput.addEventListener("input", () => {
    clearInputBtn.style.display = searchInput.value ? "inline" : "none";
});

clearInputBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearInputBtn.style.display = "none";
    searchInput.focus();
});

// 移动端菜单切换逻辑
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');

    // 点击空白处自动关闭
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !e.target.closest('.mobile-menu')) {
            nav.classList.remove('active');
        }
    });
}

// 页面内锚点平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
