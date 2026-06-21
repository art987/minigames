document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const categoryNav = document.getElementById('category-nav');
    const categoryTitle = document.getElementById('category-title');
    const categoryCount = document.getElementById('category-count');
    const loading = document.getElementById('loading');
    const backToTopBtn = document.getElementById('back-to-top');
    
    const PAGE_SIZE = 20;
    const TODAY_PAGE_SIZE = 5;
    
    if (!cardContainer || !categoryNav || !window.poemData || !poemData.categories) {
        console.error('无法找到容器或数据');
        return;
    }

    const categories = poemData.categories;
    
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();
    const todayCategoryName = `${todayMonth}月${todayDay}日学习推荐`;
    
    let allItems = [];
    categories.forEach(cat => {
        allItems = allItems.concat(cat.items);
    });
    
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    const shuffledItems = shuffleArray(allItems);
    
    let currentCategoryIndex = 0;
    let currentLoadedCount = 0;
    let isLoading = false;
    let hasMore = true;

    function createCard(item, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `卡片 ${index + 1}: ${item.expression}`);

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <p class="expression"><span class="expression-label">表达：</span>${item.expression}</p>
                    <span class="hint">点击翻转</span>
                </div>
                <div class="card-back">
                    <p class="poem-line">${item.poem}</p>
                    <div class="info">
                        <div class="info-item">
                            <span class="info-label">朝代：</span>
                            <span class="info-value">${item.dynasty}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">作者：</span>
                            <span class="info-value">${item.author}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">出处：</span>
                            <span class="info-value">${item.source}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });

        return card;
    }

    function getCategoryItems(categoryIndex) {
        if (categoryIndex === 0) {
            return shuffledItems;
        }
        return categories[categoryIndex - 1]?.items || [];
    }

    function getCurrentPageSize() {
        return currentCategoryIndex === 0 ? TODAY_PAGE_SIZE : PAGE_SIZE;
    }

    function loadCards(isAppend = false) {
        if (isLoading) return;
        
        const items = getCategoryItems(currentCategoryIndex);
        const pageSize = getCurrentPageSize();
        
        if (!isAppend) {
            cardContainer.innerHTML = '';
            currentLoadedCount = 0;
            hasMore = true;
        }

        if (currentLoadedCount >= items.length) {
            hasMore = false;
            loading.classList.remove('show');
            return;
        }

        isLoading = true;
        
        if (currentCategoryIndex !== 0) {
            loading.classList.add('show');
        }

        setTimeout(() => {
            const start = currentLoadedCount;
            const end = Math.min(start + pageSize, items.length);
            const newItems = items.slice(start, end);

            newItems.forEach((item, index) => {
                const card = createCard(item, start + index);
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                cardContainer.appendChild(card);
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 80);
            });

            currentLoadedCount = end;
            hasMore = currentLoadedCount < items.length;
            isLoading = false;
            
            if (currentCategoryIndex === 0) {
                categoryCount.textContent = `${currentLoadedCount} 条`;
                updateLoadMoreButton();
            } else {
                loading.classList.toggle('show', hasMore);
            }
        }, 300);
    }

    function updateLoadMoreButton() {
        let loadMoreBtn = document.getElementById('load-more-btn');
        
        if (!loadMoreBtn) {
            loadMoreBtn = document.createElement('button');
            loadMoreBtn.id = 'load-more-btn';
            loadMoreBtn.className = 'load-more-btn';
            loadMoreBtn.textContent = '加载更多';
            loadMoreBtn.addEventListener('click', () => {
                loadCards(true);
            });
            cardContainer.parentNode.appendChild(loadMoreBtn);
        }
        
        loadMoreBtn.style.display = hasMore ? 'block' : 'none';
    }

    function renderCategory() {
        const items = getCategoryItems(currentCategoryIndex);
        
        if (currentCategoryIndex === 0) {
            categoryTitle.textContent = todayCategoryName;
            categoryCount.textContent = `${currentLoadedCount} 条`;
        } else {
            const cat = categories[currentCategoryIndex - 1];
            categoryTitle.textContent = cat.name;
            categoryCount.textContent = `${items.length} 条`;
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        loadCards(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function initCategoryNav() {
        const navList = document.createElement('ul');
        navList.className = 'category-nav-list';

        const todayBtn = document.createElement('button');
        todayBtn.textContent = todayCategoryName;
        todayBtn.className = currentCategoryIndex === 0 ? 'active' : '';
        todayBtn.addEventListener('click', () => {
            currentCategoryIndex = 0;
            updateActiveButton();
            renderCategory();
        });

        const todayItem = document.createElement('li');
        todayItem.className = 'category-nav-item';
        todayItem.appendChild(todayBtn);
        navList.appendChild(todayItem);

        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.textContent = cat.name;
            btn.className = currentCategoryIndex === index + 1 ? 'active' : '';
            btn.addEventListener('click', () => {
                currentCategoryIndex = index + 1;
                updateActiveButton();
                renderCategory();
            });

            const item = document.createElement('li');
            item.className = 'category-nav-item';
            item.appendChild(btn);
            navList.appendChild(item);
        });

        categoryNav.appendChild(navList);
    }

    function updateActiveButton() {
        const buttons = categoryNav.querySelectorAll('button');
        let activeBtn = null;
        
        buttons.forEach((btn, index) => {
            const isActive = currentCategoryIndex === index;
            
            btn.classList.toggle('active', isActive);
            if (isActive) {
                activeBtn = btn;
            }
        });
        
        if (activeBtn) {
            activeBtn.scrollIntoView({ 
                behavior: 'smooth', 
                inline: 'center' 
            });
        }
    }

    function initInfiniteScroll() {
        window.addEventListener('scroll', () => {
            if (isLoading || !hasMore || currentCategoryIndex === 0) return;
            
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            if (scrollTop + windowHeight >= documentHeight - 200) {
                loadCards(true);
            }
        });
    }

    function initBackToTop() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    initCategoryNav();
    initInfiniteScroll();
    initBackToTop();
    renderCategory();
});