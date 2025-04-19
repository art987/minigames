document.addEventListener("DOMContentLoaded", () => {
  const articleListContainer = document.getElementById("article-list");
  const scrollTopBtn = document.getElementById("scrollToTop");
  const searchInput = document.getElementById("searchInput");
  const clearInputBtn = document.getElementById("clearInputBtn");
  const quickTagsContainer = document.getElementById("quickTags");
  let allArticles = {};
  let currentFiltered = [];
  let visibleCount = 12;
  let currentKeyword = "";

  // 高亮匹配
  function highlightText(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
  }

  // 渲染文章
  function renderArticles(articles, keyword = "") {
    articleListContainer.innerHTML = "";
    const toRender = articles.slice(0, visibleCount);
    toRender.forEach(([key, article]) => {
      const highlightedTitle = highlightText(article.title, keyword);
      const highlightedDesc = highlightText(article.description || "", keyword);

      const articleItem = document.createElement("a");
      articleItem.href = `${key}.html`;
      articleItem.classList.add("article-item");

      articleItem.innerHTML = `
        <img src="${article.image}" alt="${article.title}">
        <div class="article-info">
          <h3>${highlightedTitle}</h3>
          <p class="article-meta">${article.date || "未注明时间"}</p>
          <p>${highlightedDesc}</p>
        </div>
      `;
      articleListContainer.appendChild(articleItem);
    });
  }

  // 筛选器核心函数
  function applyFilter(keyword) {
    visibleCount = 12;
    currentKeyword = keyword;

 currentFiltered = Object.entries(allArticles).filter(([_, article]) => {
  const title = (article.title || "").toLowerCase();
  const keywords = Array.isArray(article.keywords)
    ? article.keywords.join(" ").toLowerCase()
    : "";
  const description = (article.description || "").toLowerCase();

  return (
    title.includes(keyword) ||
    keywords.includes(keyword) ||
    description.includes(keyword)
  );
});


    renderArticles(currentFiltered, keyword);
    document.getElementById("resetBtn").style.display = "inline-block";
  }

  // 快捷标签点击逻辑
  quickTagsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("tag")) {
      const clickedTag = e.target;
      const rawText = clickedTag.textContent.trim(); // 标签文字
      const keyword = rawText.toLowerCase();
      const isActive = clickedTag.classList.contains("active");

      // 取消筛选（再点）
      document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));

      if (isActive) {
        searchInput.value = "";
        clearInputBtn.style.display = "none";
        document.getElementById("resetBtn").style.display = "none";

        currentFiltered = Object.entries(allArticles);
        visibleCount = 12;
        currentKeyword = "";
        renderArticles(currentFiltered);
      } else {
        applyFilter(keyword);
        searchInput.value = rawText;
        clearInputBtn.style.display = "inline";
        clickedTag.classList.add("active");
      }
    }
  });

  // 搜索按钮
  document.getElementById("searchBtn").addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return;

    applyFilter(keyword);
    clearInputBtn.style.display = "inline";
    document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));
  });
  
  // ⌨️ 键盘快捷键：按下 Enter 触发搜索
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword) {
      // 有关键词 → 正常筛选
      applyFilter(keyword);
      clearInputBtn.style.display = "inline";
      document.getElementById("resetBtn").style.display = "inline-block";
      document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));
    } else {
      // 没有关键词 → 恢复初始文章列表
      clearInputBtn.style.display = "none";
      document.getElementById("resetBtn").style.display = "none";
      currentKeyword = "";
      visibleCount = 12;
      currentFiltered = Object.entries(allArticles);
      renderArticles(currentFiltered);
      document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));
    }
  }
});



  // 清除按钮
  clearInputBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearInputBtn.style.display = "none";
    searchInput.focus();
  });

  // 输入框监听清除按钮
  searchInput.addEventListener("input", () => {
    clearInputBtn.style.display = searchInput.value ? "inline" : "none";
  });

  // 重置按钮
  document.getElementById("resetBtn").addEventListener("click", () => {
    searchInput.value = "";
    clearInputBtn.style.display = "none";
    document.getElementById("resetBtn").style.display = "none";

    currentFiltered = Object.entries(allArticles);
    visibleCount = 12;
    currentKeyword = "";
    renderArticles(currentFiltered);

    document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));
  });

  // 滚动加载更多
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
      if (visibleCount < currentFiltered.length) {
        visibleCount += 8;
        renderArticles(currentFiltered, currentKeyword);
      }
    }

    // Top 按钮显示控制
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  // Top 按钮点击
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 初始数据加载
  fetch("index.json")
    .then(res => res.json())
    .then(data => {
      allArticles = data;
      currentFiltered = Object.entries(allArticles);
      renderArticles(currentFiltered);
    })
    .catch(err => {
      articleListContainer.innerHTML = "<p>加载失败，请稍后再试。</p>";
      console.error("加载 index.json 失败：", err);
    });
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
