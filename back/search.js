document.addEventListener("DOMContentLoaded", () => {
    const appListContainer = document.getElementById("appListContainer");
    const scrollTopBtn = document.getElementById("scrollToTop");
    const searchInput = document.getElementById("searchInput");
    const clearInputBtn = document.getElementById("clearInputBtn");
    const quickTagsContainer = document.getElementById("quickTags");
    let currentKeyword = "";

    // 高亮匹配文本
    function highlightText(text, keyword) {
        if (!keyword) return text;
        const regex = new RegExp(`(${keyword})`, "gi");
        return text.replace(regex, `<span class="highlight">$1</span>`);
    }

    // 渲染应用列表
    function renderApps(keyword = "") {
        appListContainer.innerHTML = "";
        
        // 筛选应用
        const filteredData = menuData.menuItems.filter(item => {
            if (!keyword) return true;
            
            if (item.singleItem) {
                const textMatch = item.text.toLowerCase().includes(keyword);
                const descMatch = item.describ.toLowerCase().includes(keyword);
                const keywordMatch = item.keyword.toLowerCase().includes(keyword);
                return textMatch || descMatch || keywordMatch;
            } else {
                const titleMatch = item.title.toLowerCase().includes(keyword);
                const itemsMatch = item.items.some(subItem => {
                    const subTextMatch = subItem.text.toLowerCase().includes(keyword);
                    const subDescMatch = subItem.describ.toLowerCase().includes(keyword);
                    const subKeywordMatch = subItem.keyword.toLowerCase().includes(keyword);
                    return subTextMatch || subDescMatch || subKeywordMatch;
                });
                return titleMatch || itemsMatch;
            }
        });

        // 渲染筛选后的应用
        filteredData.forEach(item => {
            if (item.singleItem) {
                // 渲染单独项
                const highlightedText = highlightText(item.text, keyword);
                const highlightedDesc = highlightText(item.describ, keyword);
                
                const singleAppItem = document.createElement("div");
                singleAppItem.className = "single-app-item";
                singleAppItem.innerHTML = `
                    <a href="${item.href}">
                        <div class="single-app-icon ${item.icon ? item.icon : ''}">
                            ${item.icon ? '' : `<span class="emoji-icon">${item.emoji}</span>`}
                        </div>
                        <div class="single-app-info">
                            <h3>${highlightedText}</h3>
                            <p>${highlightedDesc || '暂无描述'}</p>
                        </div>
                    </a>
                `;
                appListContainer.appendChild(singleAppItem);
            } else {
                // 渲染分类项
                const categoryTitle = document.createElement("h2");
                categoryTitle.className = "category-title";
                categoryTitle.textContent = item.title;
                appListContainer.appendChild(categoryTitle);
                
                const categoryContainer = document.createElement("div");
                categoryContainer.className = "category-container";
                
                item.items.forEach(subItem => {
                    const highlightedText = highlightText(subItem.text, keyword);
                    const highlightedDesc = highlightText(subItem.describ, keyword);
                    
                    const appItem = document.createElement("div");
                    appItem.className = "app-item";
                    appItem.innerHTML = `
                        <a href="${subItem.href}">
                            <div class="app-icon ${subItem.icon ? subItem.icon : ''}">
                                ${subItem.icon ? '' : `<span class="emoji-icon">${subItem.emoji}</span>`}
                            </div>
                            <div class="app-name">${highlightedText}</div>
                            <div class="app-describ">${highlightedDesc || '暂无描述'}</div>
                        </a>
                    `;
                    categoryContainer.appendChild(appItem);
                });
                
                appListContainer.appendChild(categoryContainer);
            }
        });
    }

    // 初始渲染
    renderApps();

    // 快捷标签点击逻辑
    quickTagsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("tag")) {
            const clickedTag = e.target;
            const rawText = clickedTag.textContent.trim();
            const keyword = rawText.toLowerCase();
            const isActive = clickedTag.classList.contains("active");

            // 取消所有标签的激活状态
            document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));

            if (isActive) {
                // 取消筛选
                searchInput.value = "";
                clearInputBtn.style.display = "none";
                document.getElementById("resetBtn").style.display = "none";
                currentKeyword = "";
                renderApps();
            } else {
                // 应用筛选
                searchInput.value = rawText;
                clearInputBtn.style.display = "inline";
                document.getElementById("resetBtn").style.display = "inline";
                clickedTag.classList.add("active");
                currentKeyword = keyword;
                renderApps(keyword);
            }
        }
    });

    // 搜索按钮点击事件
    document.getElementById("searchBtn").addEventListener("click", () => {
        const keyword = searchInput.value.trim().toLowerCase();
        if (!keyword) return;

        currentKeyword = keyword;
        renderApps(keyword);
        clearInputBtn.style.display = "inline";
        document.getElementById("resetBtn").style.display = "inline";
        document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));
    });

    // 回车键搜索
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const keyword = searchInput.value.trim().toLowerCase();
            
            if (keyword) {
                currentKeyword = keyword;
                renderApps(keyword);
                clearInputBtn.style.display = "inline";
                document.getElementById("resetBtn").style.display = "inline";
                document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));
            } else {
                // 没有关键词时恢复初始状态
                clearInputBtn.style.display = "none";
                document.getElementById("resetBtn").style.display = "none";
                currentKeyword = "";
                renderApps();
                document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));
            }
        }
    });

    // 清除输入按钮
    clearInputBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearInputBtn.style.display = "none";
        searchInput.focus();
    });

    // 输入框监听清除按钮显示
    searchInput.addEventListener("input", () => {
        clearInputBtn.style.display = searchInput.value ? "inline" : "none";
    });

    // 重置按钮
    document.getElementById("resetBtn").addEventListener("click", () => {
        searchInput.value = "";
        clearInputBtn.style.display = "none";
        document.getElementById("resetBtn").style.display = "none";
        currentKeyword = "";
        renderApps();
        document.querySelectorAll(".quick-tags .tag").forEach(tag => tag.classList.remove("active"));
    });

    // 滚动加载更多（如果需要）
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
            // 可以在这里实现滚动加载更多功能
        }

        // 显示/隐藏回到顶部按钮
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // 回到顶部按钮点击事件
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// 移动端菜单切换
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');

    // 点击空白处关闭菜单
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !e.target.closest('.mobile-menu')) {
            nav.classList.remove('active');
        }
    });
}