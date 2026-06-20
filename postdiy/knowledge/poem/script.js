document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const categoryNav = document.getElementById('category-nav');
    const categoryTitle = document.getElementById('category-title');
    const categoryCount = document.getElementById('category-count');
    const loading = document.getElementById('loading');
    const backToTopBtn = document.getElementById('back-to-top');
    
    const PAGE_SIZE = 20;
    
    if (!cardContainer || !categoryNav || !window.poemData || !poemData.categories) {
        console.error('无法找到容器或数据');
        return;
    }

    const categories = poemData.categories;
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
        return categories[categoryIndex]?.items || [];
    }

    function loadCards(isAppend = false) {
        if (isLoading) return;
        
        const items = getCategoryItems(currentCategoryIndex);
        
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
        loading.classList.add('show');

        setTimeout(() => {
            const start = currentLoadedCount;
            const end = Math.min(start + PAGE_SIZE, items.length);
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
            loading.classList.toggle('show', hasMore);
        }, 300);
    }

    function renderCategory() {
        const cat = categories[currentCategoryIndex];
        const items = getCategoryItems(currentCategoryIndex);
        
        categoryTitle.textContent = cat.name;
        categoryCount.textContent = `${items.length} 条`;
        
        loadCards(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function initCategoryNav() {
        const navList = document.createElement('ul');
        navList.className = 'category-nav-list';

        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.textContent = cat.name;
            btn.className = currentCategoryIndex === index ? 'active' : '';
            btn.addEventListener('click', () => {
                currentCategoryIndex = index;
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
            if (isLoading || !hasMore) return;
            
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