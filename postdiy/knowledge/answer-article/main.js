// DOM元素
const categoriesContainer = document.getElementById('categories');
const articleListContainer = document.getElementById('article-list');
const currentCategoryTitle = document.getElementById('current-category-title');
const articleCountElement = document.getElementById('article-count');
const loadMoreBtn = document.getElementById('load-more');

// 全局变量
let currentCategory = 'all';
let displayedArticles = [];
let currentPage = 1;
const articlesPerPage = 9;
let currentSearchQuery = '';
let isSearchMode = false;

// DOM元素
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResultsInfo = document.getElementById('search-results-info');
const clearSearchButton = document.getElementById('clear-search');

// 初始化函数
function init() {
    // 渲染分类
    renderCategories();
    
    // 加载文章列表
    loadArticles();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 初始化滚动监听
    initScrollListener();
    
    // 绑定搜索相关事件
    bindSearchEvents();
}

// 渲染分类列表
function renderCategories() {
    categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = `category-item ${category.id === currentCategory ? 'active' : ''}`;
        categoryItem.setAttribute('data-category', category.id);
        categoryItem.textContent = category.name;
        categoriesContainer.appendChild(categoryItem);
    });
}

// 加载文章
function loadArticles() {
    // 获取当前分类或搜索结果的文章
    let articles;
    
    if (isSearchMode && currentSearchQuery) {
        articles = searchArticles(currentSearchQuery);
        searchResultsInfo.textContent = `找到 ${articles.length} 条与 "${currentSearchQuery}" 相关的资讯`;
        searchResultsInfo.style.display = 'block';
    } else {
        searchResultsInfo.style.display = 'none';
        if (currentCategory === 'all') {
            articles = getAllArticles();
        } else {
            articles = getArticlesByCategory(currentCategory);
        }
    }
    
    // 更新文章计数
    articleCountElement.querySelector('span').textContent = articles.length;
    
    // 检查是否需要重置（分类切换或搜索模式切换）
    const needsReset = 
        // 第一次加载
        displayedArticles.length === 0 || 
        // 搜索模式切换
        (isSearchMode !== (displayedArticles.length > 0 && displayedArticles[0].isSearched)) || 
        // 分类切换（包括切换到空分类）
        (displayedArticles.length > 0 && (articles.length === 0 || displayedArticles[0].category !== (articles.length > 0 ? articles[0].category : currentCategory)));
    
    if (needsReset) {
        currentPage = 1;
        displayedArticles = [];
        articleListContainer.innerHTML = '';
    }

    // 计算当前页要显示的文章
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToDisplay = articles.slice(startIndex, endIndex);

    // 标记搜索结果
    if (isSearchMode) {
        articlesToDisplay.forEach(article => {
            article.isSearched = true;
        });
    } else {
        articlesToDisplay.forEach(article => {
            article.isSearched = false;
        });
    }
    
    // 渲染文章列表
    renderArticles(articlesToDisplay);
    
    // 更新加载更多按钮状态
    loadMoreBtn.disabled = endIndex >= articles.length;
    loadMoreBtn.textContent = endIndex >= articles.length ? '没有更多了' : '加载更多';
    
    // 更新当前分类标题
    const categoryInfo = getCategoryById(currentCategory);
    currentCategoryTitle.textContent = categoryInfo.name + '问答';
    
    // 记录已显示的文章
    displayedArticles = [...displayedArticles, ...articlesToDisplay];
    
    // 增加页码
    currentPage++;
}

// 渲染文章列表
function renderArticles(articles) {
    articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        articleCard.setAttribute('data-id', article.id);
        
        const categoryInfo = getCategoryById(article.category);
        
        articleCard.innerHTML = `
            <div class="article-card-content">
                <div class="article-cover">
                    <img src="cover/${article.id}.jpg" alt="${article.title}" onerror="this.parentElement.style.display='none';">
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-summary">${article.summary}</p>
                <div class="article-meta">
                    <span class="article-category">${categoryInfo.name}</span>
                    <span class="article-date">${article.date}</span>
                    <div class="article-stats">
                        <span class="article-views">
                            <i>👁️</i>${article.views}
                        </span>
                        <span class="article-likes">
                            <i>❤️</i>${article.likes}
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        articleListContainer.appendChild(articleCard);
        
        // 添加点击事件
        articleCard.addEventListener('click', () => {
            window.location.href = `article-detail.html?id=${article.id}`;
        });
    });
}

// 打开文章详情已改为跳转到新页面，此函数已不再使用
function openArticleDetail(articleId) {
    window.location.href = `article-detail.html?id=${articleId}`;
}

// 切换分类
function switchCategory(categoryId) {
    if (categoryId === currentCategory) return;
    
    // 退出搜索模式
    isSearchMode = false;
    currentSearchQuery = '';
    searchInput.value = '';
    
    // 更新当前分类
    currentCategory = categoryId;
    
    // 更新分类样式
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-category') === categoryId) {
            item.classList.add('active');
        }
    });
    
    // 重新加载文章
    loadArticles();
}

// 初始化滚动监听
function initScrollListener() {
    const categoryContainer = document.querySelector('.category-container');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 处理分类栏固定
        if (scrollTop > 60) {
            categoryContainer.classList.add('sticky');
        } else {
            categoryContainer.classList.remove('sticky');
        }
        
        // 处理导航栏样式变化
        const header = document.querySelector('.header');
        if (header) {
            if (scrollTop > 100) {
                header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// 绑定事件监听器
function bindEventListeners() {
    // 分类点击事件
    categoriesContainer.addEventListener('click', (e) => {
        const categoryItem = e.target.closest('.category-item');
        if (categoryItem) {
            const categoryId = categoryItem.getAttribute('data-category');
            switchCategory(categoryId);
        }
    });
    
    // 加载更多按钮点击事件
    loadMoreBtn.addEventListener('click', loadArticles);
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 控制清除按钮的显示和隐藏
function toggleClearButton() {
    clearSearchButton.style.display = searchInput.value.trim() !== '' ? 'flex' : 'none';
    
    // 调整搜索框的padding，为清除按钮留出空间
    if (searchInput.value.trim() !== '') {
        searchInput.style.paddingRight = '36px';
    } else {
        searchInput.style.paddingRight = '16px';
    }
}

// 绑定搜索事件
function bindSearchEvents() {
    // 搜索按钮点击事件
    searchButton.addEventListener('click', performSearch);
    
    // 搜索框回车事件
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 搜索框输入事件
    searchInput.addEventListener('input', () => {
        toggleClearButton();
        
        // 当输入框为空时，显示所有资讯
        if (searchInput.value.trim() === '') {
            isSearchMode = false;
            currentSearchQuery = '';
            loadArticles();
        }
    });
    
    // 清除搜索按钮点击事件
    clearSearchButton.addEventListener('click', () => {
        searchInput.value = '';
        isSearchMode = false;
        currentSearchQuery = '';
        toggleClearButton();
        loadArticles();
    });
}

// 执行搜索
function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        // 如果搜索框为空，退出搜索模式，显示所有文章
        isSearchMode = false;
        currentSearchQuery = '';
        searchResultsInfo.style.display = 'none';
    } else {
        // 进入搜索模式
        isSearchMode = true;
        currentSearchQuery = query;
        
        // 重置当前分类状态但不改变UI显示
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // 重新加载文章
    loadArticles();
}

// 根据关键词搜索文章
function searchArticles(keyword) {
    const allArticles = getAllArticles();
    const lowerKeyword = keyword.toLowerCase();
    
    return allArticles.filter(article => {
        // 搜索标题、摘要和问题内容
        const titleMatch = article.title.toLowerCase().includes(lowerKeyword);
        const summaryMatch = article.summary.toLowerCase().includes(lowerKeyword);
        
        // 搜索问题内容
        const questionMatch = article.questions.some(q => 
            q.question.toLowerCase().includes(lowerKeyword) || 
            q.answer.toLowerCase().includes(lowerKeyword)
        );
        
        return titleMatch || summaryMatch || questionMatch;
    });
}