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
    // 获取当前分类的文章
    let articles;
    if (currentCategory === 'all') {
        articles = getAllArticles();
    } else {
        articles = getArticlesByCategory(currentCategory);
    }
    
    // 更新文章计数
    articleCountElement.querySelector('span').textContent = articles.length;
    
    // 如果是新分类，重置页码
    if (displayedArticles.length === 0 || displayedArticles[0].category !== articles[0]?.category) {
        currentPage = 1;
        displayedArticles = [];
        articleListContainer.innerHTML = '';
    }
    
    // 计算当前页要显示的文章
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToDisplay = articles.slice(startIndex, endIndex);
    
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
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
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