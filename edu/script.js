
	
	
// 创建今日推荐弹窗
function createTodayRecommendModal() {
    // 检查是否已存在弹窗
    if (document.getElementById('today-recommend-modal')) return;
    
    // 创建弹窗元素
    const modal = document.createElement('div');
    modal.id = 'today-recommend-modal';
    modal.className = 'modal';
    
    // 创建弹窗内容
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // 创建关闭按钮
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.id = 'close-today-recommend-modal';
    closeButton.innerHTML = '&times;';
    
    // 创建标题
    const title = document.createElement('h3');
    title.textContent = '今日推荐';
    title.style.marginTop = '0';
    
    // 创建推荐内容容器
    const recommendContainer = document.createElement('ul');
    recommendContainer.id = 'today-recommend-container';

    
    // 创建底部按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'bottom-buttons';

    // 创建换一组按钮
    const refreshButton = document.createElement('button');
	refreshButton.className = 'refresh-button';
    refreshButton.textContent = '换一组';

    
    // 创建关闭按钮
    const closeBtn = document.createElement('button');
	closeBtn.className = 'bottom-close-button';
    closeBtn.textContent = '自己看看';

    
    // 组装弹窗
    buttonContainer.appendChild(refreshButton);
    buttonContainer.appendChild(closeBtn);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(recommendContainer);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 关闭按钮事件
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // 换一组按钮事件
    refreshButton.addEventListener('click', () => {
        showTodayRecommendations();
    });
    
    // 点击外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 显示今日推荐内容
function showTodayRecommendations() {
    const modal = document.getElementById('today-recommend-modal');
    const container = document.getElementById('today-recommend-container');
    
    // 清空容器
    container.innerHTML = '';
    
    // 收集所有可能的推荐项
    let allRecommendations = [];
    Object.values(data.content).forEach(category => {
        allRecommendations = allRecommendations.concat(category);
    });
    
    // 随机选择5条不重复的推荐
    const selectedRecommendations = [];
    const usedIndices = new Set();
    
    while (selectedRecommendations.length < 5 && selectedRecommendations.length < allRecommendations.length) {
        const randomIndex = Math.floor(Math.random() * allRecommendations.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            selectedRecommendations.push(allRecommendations[randomIndex]);
        }
    }
    
    // 添加推荐项到容器
    selectedRecommendations.forEach(recommendation => {
        const listItem = document.createElement('li');
        
        const textSpan = document.createElement('span');
        textSpan.innerHTML = recommendation;
        listItem.appendChild(textSpan);
        
        const actions = document.createElement('div');
        actions.className = 'actions';
        
        const readButton = document.createElement('button');
        readButton.textContent = '朗读';
        readButton.onclick = () => readText(recommendation);
        actions.appendChild(readButton);
        
        const copyButton = document.createElement('button');
        copyButton.textContent = '复制';
        copyButton.onclick = () => copyText(recommendation, copyButton);
        actions.appendChild(copyButton);
        
        const showAllButton = document.createElement('button');
        showAllButton.textContent = '全文';
        showAllButton.onclick = () => showAllText(recommendation);
        actions.appendChild(showAllButton);
        
        listItem.appendChild(actions);
        container.appendChild(listItem);
    });
    
    // 显示弹窗
    modal.style.display = 'block';
}

// 在DOMContentLoaded事件中替换原来的弹窗代码
document.addEventListener('DOMContentLoaded', () => {
    setupNavbarScrollBehavior();
    
    // 创建今日推荐弹窗
    createTodayRecommendModal();
    
    renderPage();
    initSearch();
    initBackToTop();
    initAutoScroll();
    initRemainingCounter();
    
    // 初始隐藏浮动标签
    const floatingTagsContainer = document.getElementById('floating-tags-container');
    floatingTagsContainer.style.display = 'none';
    
    // 监听滚动事件
    window.addEventListener('scroll', updateFloatingTags);
    
    // 页面加载后显示今日推荐弹窗
    setTimeout(() => {
        showTodayRecommendations();
    }, 500);
});	
	
	
	
	
	// 在 script.js 中替换原有的滚动监听器
function setupNavbarScrollBehavior() {
    const navbar = document.getElementById('navbar-container');
    if (!navbar) return;

    // 移除可能存在的旧监听器
    window.removeEventListener('scroll', handleNavbarScroll);
    
    let lastScrollTop = 0;
    const navbarHeight = navbar.offsetHeight;

    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop <= 0) {
            navbar.style.top = '0';
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            navbar.style.top = `-${navbarHeight}px`;
        } else {
            navbar.style.top = '0';
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleNavbarScroll);
}
	
	
	
	
	
	
	
	
	
	// 创建向下滚动按钮
const scrollDownButton = document.createElement('button');
scrollDownButton.id = 'scroll-down-button';
scrollDownButton.textContent = '⇪';
document.body.appendChild(scrollDownButton);

// 添加点击事件
scrollDownButton.addEventListener('click', () => {
    const scrollAmount = window.innerHeight * 0.2; // 35% 屏幕高度
    window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
    });
});

// 初始显示状态
window.addEventListener('scroll', () => {
    // 当页面滚动到底部时隐藏按钮
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    scrollDownButton.style.display = isAtBottom ? 'none' : 'flex';
});
	
	
	


// ===== 全标签弹窗相关函数 =====

function createAllTagsModal() {
    // 检查是否已存在弹窗
    if (document.getElementById('all-tags-modal')) return;
    
    // 创建弹窗元素
    const modal = document.createElement('div');
    modal.id = 'all-tags-modal';
    modal.className = 'modal';
  
    
    // 创建弹窗内容
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
   
    
    // 创建关闭按钮
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.id = 'close-all-tags-modal';
    closeButton.innerHTML = '&times;';
   
    
    // 创建标题
    const title = document.createElement('h3');
    title.textContent = '所有分类标签';
    title.style.marginTop = '0';
    
    // 创建标签容器
    const tagsContainer = document.createElement('div');
    tagsContainer.id = 'all-tags-container';
   
    
    // 组装弹窗
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(tagsContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 关闭按钮事件
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // 点击外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showAllTagsModal() {
    const modal = document.getElementById('all-tags-modal');
    const container = document.getElementById('all-tags-container');
    
    // 清空容器
    container.innerHTML = '';
    
    // 添加"全部"标签
    const allTagElement = document.createElement('div');
    allTagElement.className = 'tag active';
    allTagElement.dataset.category = 'all';
    allTagElement.textContent = '全部';

    allTagElement.addEventListener('click', () => {
        // 找到所有地方的"全部"标签并点击
        const allTags = document.querySelectorAll('.tag[data-category="all"]');
        allTags.forEach(tag => {
            tag.classList.add('active');
            handleTagClick(tag, 'all');
        });
        modal.style.display = 'none';
    });
    container.appendChild(allTagElement);
    
    // 添加其他标签
    Object.keys(data.content).forEach(key => {
        const [name, category] = key.split('|');
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.dataset.category = category;
        tagElement.textContent = `${name} (${data.content[key].length})`;
        
        
        tagElement.addEventListener('click', () => {
            // 找到所有相同分类的标签并点击
            const sameTags = document.querySelectorAll(`.tag[data-category="${category}"]`);
            sameTags.forEach(tag => {
                tag.classList.add('active');
                handleTagClick(tag, category);
            });
            modal.style.display = 'none';
        });
        container.appendChild(tagElement);
    });
    
    // 显示弹窗
    modal.style.display = 'block';
}







  // ===== 从这里开始添加放大镜效果 =====
   
 document.addEventListener('DOMContentLoaded', () => {
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .content li {
            transition: opacity 0.7s ease;
            opacity: 0.35;
        }
        .content li.highlight-effect {
            opacity: 1;
        }
        /* 确保actions按钮不受透明度影响 */
        .content li .actions {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);

    function updateOpacityEffects() {
        const viewportHeight = window.innerHeight;
        const triggerTop = viewportHeight * 0.1;
        const triggerBottom = viewportHeight * 0.65;
        
        const lis = document.querySelectorAll('.content li');
        
        lis.forEach(li => {
            const rect = li.getBoundingClientRect();
            const liTop = rect.top;
            const liBottom = rect.bottom;
            
            // 检查是否进入30%-35%区域
            if (liTop <= triggerBottom && liBottom >= triggerTop) {
                li.classList.add('highlight-effect');
            } else {
                li.classList.remove('highlight-effect');
            }
        });
    }

    // 添加滚动事件监听
    window.addEventListener('scroll', updateOpacityEffects);
    window.addEventListener('resize', updateOpacityEffects);
    
    // 初始设置
    updateOpacityEffects();
});
   
    // ===== 放大镜效果代码结束 =====


// ===== 原有函数修改 =====

function renderPage() {
    // 渲染标题
    document.getElementById('title-h1').innerText = data.title.h1;
    document.getElementById('title-p').innerText = data.title.p;

    // 创建剩余计数器元素
    if (!document.getElementById('remaining-counter')) {
        const counter = document.createElement('div');
        counter.id = 'remaining-counter';
        counter.innerHTML = '<span id="remaining-count">0</span>/<span id="total-count">0</span>';
        document.body.appendChild(counter);
    }

    // 渲染标签 - 先添加"全部"标签
    const tagsContainer = document.getElementById('tags-container');
    
    // 添加"全部"标签
    const allTagElement = document.createElement('div');
    allTagElement.classList.add('tag', 'active');
    allTagElement.dataset.category = 'all';
    allTagElement.textContent = '全部';
    allTagElement.addEventListener('click', () => {
        handleTagClick(allTagElement, 'all');
        resetDisplay();
    });
    tagsContainer.appendChild(allTagElement);

    // 添加其他标签
    Object.keys(data.content).forEach(key => {
        const [name, category] = key.split('|');
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.dataset.category = category;
        tagElement.textContent = `${name} (${data.content[key].length})`;
        
        tagElement.addEventListener('click', () => {
            handleTagClick(tagElement, category);
            scrollToCenter(tagElement);
        });
        tagsContainer.appendChild(tagElement);
    });

    // 渲染关键词
    const keywordsContainer = document.getElementById('keywords-container');
    data.keywords.forEach(keyword => {
        const keywordElement = document.createElement('div');
        keywordElement.classList.add('keyword');
        keywordElement.dataset.keyword = keyword;
        keywordElement.textContent = keyword;
        keywordElement.addEventListener('click', () => handleKeywordClick(keywordElement, keyword));
        keywordsContainer.appendChild(keywordElement);
    });

    // 渲染内容
    const contentContainer = document.getElementById('content-container');
    Object.keys(data.content).forEach(key => {
        const [name, category] = key.split('|');
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.dataset.category = category;

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = `${category} (${data.content[key].length}条记录)`;
        categoryElement.appendChild(categoryTitle);

        const categoryList = document.createElement('ul');
        data.content[key].forEach(sentence => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-original-text', sentence);

            const sentenceText = document.createElement('span');
            sentenceText.innerHTML = sentence;
            listItem.appendChild(sentenceText);

            const actions = document.createElement('div');
            actions.classList.add('actions');

            const readButton = document.createElement('button');
            readButton.textContent = '朗读';
            readButton.onclick = () => readText(sentence);
            actions.appendChild(readButton);

            const copyButton = document.createElement('button');
            copyButton.textContent = '复制';
            copyButton.onclick = () => copyText(sentence, copyButton);
            actions.appendChild(copyButton);

            const showAllButton = document.createElement('button');
            showAllButton.textContent = '全文';
            showAllButton.onclick = () => showAllText(sentence);
            actions.appendChild(showAllButton);

            listItem.appendChild(actions);
            categoryList.appendChild(listItem);
        });

        categoryElement.appendChild(categoryList);
        contentContainer.appendChild(categoryElement);
    });

    // 显示所有关键词按钮
    const showAllKeywordsButton = document.getElementById('show-all-keywords');
    showAllKeywordsButton.addEventListener('click', showAllKeywordsModal);

    // 关闭模态框按钮
    const closeModalButton = document.getElementById('close-modal');
    closeModalButton.addEventListener('click', () => {
        document.getElementById('keyword-modal').style.display = 'none';
    });

    // 为show-all-tags按钮添加事件
    const showAllTagsButton = document.getElementById('show-all-tags');
    if (showAllTagsButton) {
        showAllTagsButton.addEventListener('click', showAllTagsModal);
    }

    updateFloatingTags();
}

function handleTagClick(tagElement, category) {
    // 移除所有标签的active类
    document.querySelectorAll('.tag').forEach(el => el.classList.remove('active'));
    
    // 为当前点击的标签添加active类
    tagElement.classList.add('active');
    
    // 同步其他相同分类标签的状态
    if (category !== 'all') {
        document.querySelectorAll(`.tag[data-category="${category}"]`).forEach(el => {
            el.classList.add('active');
        });
    }
    
    document.getElementById('search-input').value = '';
    resetDisplay();

    window.scrollTo({
        top: 180,
        behavior: 'smooth'
    });

    showLoadingAnimation(() => {
        if (category === 'all') {
            resetDisplay();
        } else {
            filterContentByCategory(category);
        }
    });

    const floatingTag = document.querySelector(`#floating-tags-container .tag[data-category="${category}"]`);
    if (floatingTag) {
        floatingTag.classList.add('active');
        scrollToCenter(floatingTag);
    }
}





function handleKeywordClick(keywordElement, keyword) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = keyword;
    
    // 移除所有标签和关键词的active类
    document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
    
    // 在keywords-container中找到匹配的关键词并添加active类
    const mainKeywords = document.querySelectorAll('#keywords-container .keyword');
    mainKeywords.forEach(k => {
        if (k.dataset.keyword === keyword) {
            k.classList.add('active');
        }
    });
    
    resetDisplay();

    showLoadingAnimation(() => {
        const matchCount = filterContent(keyword);
        if (matchCount === 0) {
            showNoResultsMessage();
        }
    });

    document.getElementById('clear-search').style.display = 'inline';
}

function showAllKeywordsModal() {
    const modal = document.getElementById('keyword-modal');
    const modalKeywordsContainer = document.getElementById('modal-keywords-container');
    modalKeywordsContainer.innerHTML = '';

    data.keywords.forEach(keyword => {
        const keywordElement = document.createElement('div');
        keywordElement.classList.add('keyword');
        keywordElement.dataset.keyword = keyword;
        keywordElement.textContent = keyword;
        keywordElement.onclick = () => {
            document.getElementById('search-input').value = keyword;
            
            // 移除所有标签和关键词的active类
            document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
            
            // 在keywords-container中找到匹配的关键词并添加active类
            const mainKeywords = document.querySelectorAll('#keywords-container .keyword');
            mainKeywords.forEach(k => {
                if (k.dataset.keyword === keyword) {
                    k.classList.add('active');
                }
            });
            
            resetDisplay();
            
            showLoadingAnimation(() => {
                filterContent(keyword);
            });

            document.getElementById('clear-search').style.display = 'inline';
            modal.style.display = 'none';
        };
        modalKeywordsContainer.appendChild(keywordElement);
    });

    modal.style.display = 'block';
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const tags = document.querySelectorAll('.tag');
    const keywords = document.querySelectorAll('.keyword');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === '') {
            clearSearchBtn.style.display = 'none';
            resetDisplay();
        } else {
            clearSearchBtn.style.display = 'inline';
            showLoadingAnimation(() => {
                filterContent(searchTerm);
            });
        }
        document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        resetDisplay();
        document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
    });

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            handleTagClick(tag, tag.dataset.category);
        });
    });

    keywords.forEach(keyword => {
        keyword.addEventListener('click', () => {
            handleKeywordClick(keyword, keyword.dataset.keyword);
        });
    });
}

function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.scrollY > window.innerHeight ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initAutoScroll() {
    const autoScrollButton = document.getElementById('auto-scroll-button');
    let isScrolling = false;
    let autoScrollInterval;

    autoScrollButton.addEventListener('click', () => {
        if (isScrolling) {
            clearInterval(autoScrollInterval);
            autoScrollButton.textContent = '⇢';
        } else {
            autoScrollInterval = setInterval(() => {
                window.scrollBy(0, 80);
            }, 6000);
            autoScrollButton.textContent = '⇥';
        }
        isScrolling = !isScrolling;
    });

    window.addEventListener('wheel', () => {
        if (isScrolling) {
            clearInterval(autoScrollInterval);
            autoScrollButton.textContent = '⇢';
            isScrolling = false;
        }
    });
}

function readText(text) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    
    const elementsToRemove = tempDiv.querySelectorAll('i, b');
    elementsToRemove.forEach(el => el.remove());
    
    let plainText = tempDiv.textContent || tempDiv.innerText;
    const emojiRegex = /[\p{Emoji}\u200d\uFE0F]/gu;
    plainText = plainText.replace(emojiRegex, '').replace(/\s+/g, ' ').trim();
    
    if (plainText) {
        const voice = typeof VOICE_SETTING !== 'undefined' ? VOICE_SETTING : 'Chinese Female';
        responsiveVoice.speak(plainText, voice, {
            rate: 0.8,
            pitch: 1,
            volume: 1
        });
    }
}

function copyText(text, button) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText;

    navigator.clipboard.writeText(plainText).then(() => {
        button.textContent = '✔已复制';
        setTimeout(() => button.textContent = '复制', 3000);
    }).catch(err => {
        console.error('复制失败', err);
    });
}

function highlightKeyword(text, keyword) {
    const regex = new RegExp(keyword, 'gi');
    return text.replace(regex, `<span style="color: red;">${keyword}</span>`);
}

function filterContent(keyword) {
    const categories = document.querySelectorAll('.category');
    let totalMatches = 0;
    
    const categoryMatches = {};
    categories.forEach(category => {
        const items = category.querySelectorAll('li');
        let matchCount = 0;
        
        items.forEach(item => {
            const originalText = item.getAttribute('data-original-text');
            if (originalText && originalText.toLowerCase().includes(keyword.toLowerCase())) {
                matchCount++;
                item.style.display = 'block';
                item.querySelector('span').innerHTML = highlightKeyword(originalText, keyword);
            } else {
                item.style.display = 'none';
            }
        });
        
        categoryMatches[category.dataset.category] = matchCount;
        totalMatches += matchCount;
        
        const categoryTitle = category.querySelector('h3');
        if (categoryTitle) {
            const categoryKey = Object.keys(data.content).find(key => key.includes(category.dataset.category));
            if (categoryKey) {
                const [name, originalCategory] = categoryKey.split('|');
                categoryTitle.textContent = `${originalCategory} (${matchCount}条记录)`;
            }
        }
        
        category.style.display = matchCount > 0 ? 'block' : 'none';
    });
    
    // 只在所有类别都无结果时显示提示
    if (totalMatches === 0) {
        showNoResultsMessage();
    }
    
    return totalMatches;
}

function filterContentByCategory(categoryName) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        if (category.dataset.category === categoryName) {
            category.style.display = 'block';
            const items = category.querySelectorAll('li');
            
            const categoryTitle = category.querySelector('h3');
            if (categoryTitle) {
                const categoryKey = Object.keys(data.content).find(key => key.includes(category.dataset.category));
                if (categoryKey) {
                    const [name, originalCategory] = categoryKey.split('|');
                    categoryTitle.textContent = `${originalCategory} (${items.length}条记录)`;
                }
            }
            
            items.forEach(item => {
                item.style.display = 'block';
                item.querySelector('span').innerHTML = item.getAttribute('data-original-text');
            });
        } else {
            category.style.display = 'none';
        }
    });
}

function resetDisplay() {
    // 清除无结果提示
    const noResultsMessages = document.querySelectorAll('.no-results-message');
    noResultsMessages.forEach(msg => msg.remove());
    
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'block';
        
        const categoryTitle = category.querySelector('h3');
        if (categoryTitle) {
            const categoryKey = Object.keys(data.content).find(key => key.includes(category.dataset.category));
            if (categoryKey) {
                const [name, originalCategory] = categoryKey.split('|');
                const originalCount = data.content[categoryKey].length;
                categoryTitle.textContent = `${originalCategory} (${originalCount}条记录)`;
            }
        }
        
        category.querySelectorAll('li').forEach(item => {
            item.style.display = 'block';
            item.querySelector('span').innerHTML = item.getAttribute('data-original-text');
        });
    });
}

function showAllText(sentence) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.cssText = `
        display: block;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    `;

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.style.cssText = `
        background: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        height: 60%;
        overflow-y: auto;
        border-radius: 21px;
    `;

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = '×';
    closeButton.style.cssText = `
        color: #ffffff;
        font-size: 29px;
        margin-top: -16px;
        display: block;
        padding: 0px 8px;
        margin-right: -19px;
        position: fixed;
        right: 36px;
        top: 69px;
        border-radius: 40px;
        background: #c70000;
    `;
    closeButton.onclick = () => modal.remove();

    modalContent.appendChild(closeButton);
    modalContent.appendChild(document.createElement('div')).innerHTML = sentence;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

let lastScrollTop = 0;
let isScrollingDown = false;
let scrollTimeout;
let hasScrolledPastHalfScreen = false;

function updateFloatingTags() {
    const floatingTagsContainer = document.getElementById('floating-tags-container');
    const halfScreenHeight = window.innerHeight * 0.5;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 判断滚动方向
    isScrollingDown = scrollTop > lastScrollTop;
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    
    // 检查是否已滚动过半屏
    if (scrollTop > halfScreenHeight) {
        hasScrolledPastHalfScreen = true;
    }
    
    // 清除之前的定时器
    clearTimeout(scrollTimeout);
    
    // 初始状态：不显示浮动标签
    if (!hasScrolledPastHalfScreen) {
        floatingTagsContainer.style.display = 'none';
        return;
    }
    
    // 如果正在向下滚动，隐藏浮动标签
    if (isScrollingDown) {
        floatingTagsContainer.style.transform = 'translateY(100%)';
        floatingTagsContainer.style.opacity = '0';
        
        // 延迟隐藏以确保动画完成
        scrollTimeout = setTimeout(() => {
            floatingTagsContainer.style.display = 'none';
        }, 300);
    } 
    // 如果向上滚动且已滚动过半屏，显示浮动标签
    else {
       // 在updateFloatingTags函数中找到创建浮动标签的部分，修改为：
if (floatingTagsContainer.children.length === 0) {
    floatingTagsContainer.innerHTML = '';
    
    // 添加"全部"标签
    const allTagElement = document.createElement('div');
    allTagElement.classList.add('tag', 'active');
    allTagElement.dataset.category = 'all';
    allTagElement.textContent = '全部';
    allTagElement.addEventListener('click', () => {
        handleTagClick(allTagElement, 'all');
        resetDisplay();
        scrollToCenter(allTagElement);
    });
    floatingTagsContainer.appendChild(allTagElement);
    
    // 添加其他标签
    Object.keys(data.content).forEach(key => {
        const [name, category] = key.split('|');
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.dataset.category = category;
        tagElement.textContent = `${name} (${data.content[key].length})`;
        
        tagElement.addEventListener('click', () => {
            handleTagClick(tagElement, category);
            scrollToCenter(tagElement);
            
            const tagsContainerTag = document.querySelector(`#tags-container .tag[data-category="${category}"]`);
            if (tagsContainerTag) {
                tagsContainerTag.classList.add('active');
                scrollToCenter(tagsContainerTag);
            }
        });
        
        floatingTagsContainer.appendChild(tagElement);
    });
}
        
        // 显示浮动标签栏并添加动画
        floatingTagsContainer.style.display = 'block';
        setTimeout(() => {
            floatingTagsContainer.style.transform = 'translateY(0)';
            floatingTagsContainer.style.opacity = '1';
        }, 10);
    }
}

function showLoadingAnimation(callback) {
    const contentContainer = document.getElementById('content-container');
    const loadingOverlay = document.createElement('div');
    loadingOverlay.classList.add('loading-overlay');
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingOverlay.appendChild(loadingSpinner);
    contentContainer.appendChild(loadingOverlay);
    loadingOverlay.style.display = 'flex';

    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        contentContainer.removeChild(loadingOverlay);
        if (callback) callback();
    }, 300);
}

function showNoResultsMessage() {
    // 先移除已有的无结果提示
    const existingNoResults = document.querySelectorAll('.no-results-message');
    existingNoResults.forEach(el => el.remove());
    
    const contentContainer = document.getElementById('content-container');
    const noResults = document.createElement('div');
    noResults.textContent = '没有找到匹配的内容';
    noResults.className = 'no-results-message'; // 添加类名以便后续查找
    noResults.style.cssText = `
        text-align: center;
        padding: 20px;
        color: #666;
    `;
    contentContainer.appendChild(noResults);
}

function initRemainingCounter() {
    const counter = document.getElementById('remaining-counter');
    
    function calculateTotalVisible() {
        const visibleCategories = Array.from(document.querySelectorAll('.category')).filter(cat => 
            cat.style.display !== 'none'
        );
        return visibleCategories.reduce((total, category) => {
            const visibleItems = Array.from(category.querySelectorAll('li')).filter(li => 
                li.style.display !== 'none'
            );
            return total + visibleItems.length;
        }, 0);
    }
    
    function findCurrentBottomItem() {
        const viewportBottom = window.innerHeight + window.scrollY;
        let passedItems = 0;
        
        document.querySelectorAll('.category').forEach(category => {
            if (category.style.display === 'none') return;
            
            category.querySelectorAll('li').forEach(item => {
                if (item.style.display === 'none') return;
                
                const rect = item.getBoundingClientRect();
                const itemBottom = rect.bottom + window.scrollY;
                
                if (itemBottom <= viewportBottom) {
                    passedItems++;
                }
            });
        });
        
        return passedItems;
    }
    
    function updateCounter() {
        const total = calculateTotalVisible();
        const passed = findCurrentBottomItem();
        
        if (total > 0) {
            document.getElementById('remaining-count').textContent = `已阅${passed}`;
			
//			注意：如果你还想保留"剩余X/总数"的显示方式，只需将 
//			     document.getElementById('remaining-count').textContent = 已阅passed‘;‘
//			改为‘document.getElementById( ′remaining−count′ ).textContent=‘剩余{total - passed}; 即可。
			
			
            document.getElementById('total-count').textContent = total;
            counter.style.display = 'block';
        } else {
            counter.style.display = 'none';
        }
    }
    
    updateCounter();
    
    window.addEventListener('scroll', updateCounter);
    window.addEventListener('resize', updateCounter);
    
    // 包装原有筛选函数
    const originalFunctions = {
        filterContent: filterContent,
        filterContentByCategory: filterContentByCategory,
        resetDisplay: resetDisplay
    };
    
    filterContent = function(keyword) {
        const result = originalFunctions.filterContent(keyword);
        setTimeout(updateCounter, 100);
        return result;
    };
    
    filterContentByCategory = function(category) {
        originalFunctions.filterContentByCategory(category);
        setTimeout(updateCounter, 100);
    };
    
    resetDisplay = function() {
        originalFunctions.resetDisplay();
        setTimeout(updateCounter, 100);
    };
}



function scrollToCenter(element) {
    const container = element.parentElement;
    const containerWidth = container.offsetWidth;
    const elementLeft = element.offsetLeft;
    const elementWidth = element.offsetWidth;
    
    // 计算滚动位置使元素居中
    const scrollLeft = elementLeft - (containerWidth / 2) + (elementWidth / 2);
    
    container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });
}


