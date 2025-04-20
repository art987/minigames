// getdata.js

// header 模板
const siteHeader = `
 <header>
        <nav class="nav-container" aria-label="Main navigation">
            <h1><a href="/" class="logo" aria-label="Home">PeaceLove Top Insights</a></h1>
            <ul class="nav-links" id="mainNav">
                <li><a href="/health-pulse/" >Health Pulse</a></li>
                <li><a href="/tech-frontier/">Tech Frontier</a></li>
                <li><a href="/global-voices/">Global Voices</a></li>
                <li><a href="/data-lens/" aria-current="page">Data Lens</a></li>
                <li><a href="/ethical-debates/">Ethical Debates</a></li>
            </ul>
            <div class="mobile-menu" onClick="toggleMenu()" aria-label="Open menu">☰</div>
        </nav>
    </header>

	
`;

// footer 模板
const siteFooter = `
<footer>
    <p>© 2025 PeaceLove Top Insights. All rights reserved.</p>
    <p>
        <a href="/about.html" >About</a>
        <a href="/contact.html" >Contact</a>
        <a href="/privacy-policy.html" >Privacy Policy</a>
        <a href="/terms-of-service.html" >Terms of Service</a>
    </p>
</footer>
`;

// getdata.js（index.json 版）


document.addEventListener("DOMContentLoaded", async function () {
    document.body.insertAdjacentHTML("afterbegin", siteHeader);
    document.body.insertAdjacentHTML("beforeend", siteFooter);

    const fileName = window.location.pathname.split("/").pop().replace(".html", "");

    // 1️⃣ 使用 fetch 加载 index.json
    try {
        const res = await fetch("index.json");
        const articles = await res.json();
        const article = articles[fileName];

        if (!article) {
            document.getElementById("article-content").innerHTML = "<h2>文章未找到</h2>";
            return;
        }

        // 2️⃣ 原有逻辑都不变（标题/内容/meta/图片）
        document.title = article.title + " - 女性健康";
        document.getElementById("article-title").textContent = article.title;
        document.getElementById("article-description").innerHTML = article.content;

        const articleDate = document.getElementById("article-date");
        if (article.date && articleDate) {
            articleDate.textContent = `PeaceLove.Top Insights :${article.date}`;
        }

        const articleImage = document.getElementById("article-image");
        if (article.image) {
            articleImage.src = article.image;
            articleImage.style.display = "block";
        }

        const metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        metaKeywords.content = Array.isArray(article.keywords) ? article.keywords.join(', ') : "";
        document.head.appendChild(metaKeywords);

        const metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        metaDesc.content = article.description || "";
        document.head.appendChild(metaDesc);

        const breadcrumbTitle = document.getElementById("breadcrumb-title");
        if (breadcrumbTitle) breadcrumbTitle.textContent = article.title;

        // 3️⃣ 下一篇推荐
        const keys = Object.keys(articles);
        const currentIndex = keys.indexOf(fileName);
        const nextKey = keys[currentIndex + 1];
        if (nextKey && articles[nextKey]) {
            const next = articles[nextKey];
            document.getElementById("next-article-title").textContent = next.title;
            document.getElementById("next-article-link").href = `${nextKey}.html`;
            document.getElementById("next-article-image").src = next.image || "";
            document.getElementById("next-article-section").style.display = "block";
        }

        // 4️⃣ 猜你喜欢
        const relatedContainer = document.getElementById("related-articles");
        const currentKeywords = Array.isArray(article.keywords) ? article.keywords : [];

        const similarityScores = [];

        keys.forEach(key => {
            if (key === fileName) return;
            const other = articles[key];
            if (!Array.isArray(other.keywords)) return;
            const matchCount = currentKeywords.filter(k => other.keywords.includes(k)).length;
            similarityScores.push({ key, matchCount });
        });

        let related = similarityScores
            .filter(i => i.matchCount > 0)
            .sort((a, b) => b.matchCount - a.matchCount)
            .map(i => i.key);

        if (related.length < 1) {
            related = keys.filter(k => k !== fileName).sort(() => 0.5 - Math.random()).slice(0, 10);
        }

        related.forEach(key => {
            const r = articles[key];
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `${key}.html`;
            a.textContent = r.title;
            li.appendChild(a);
            relatedContainer.appendChild(li);
        });

    } catch (err) {
        console.error("❌ 无法加载 index.json：", err);
        document.getElementById("article-content").innerHTML = "<h2>加载失败</h2><p>请稍后重试。</p>";
    }
});



// 返回顶部功能
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 0.8) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});






 // 增强移动端菜单功能
        function toggleMenu() {
            const nav = document.getElementById('mainNav');
            nav.classList.toggle('active');
            
            // 点击外部区域关闭菜单
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !e.target.closest('.mobile-menu')) {
                    nav.classList.remove('active');
                }
            });
        }

        // 确保SEO友好的链接跟踪
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });