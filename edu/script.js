document.addEventListener('DOMContentLoaded', () => {
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
});


  // ===== 从这里开始添加放大镜效果 =====
   
 document.addEventListener('DOMContentLoaded', () => {
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .content li {
            transition: opacity 0.7s ease;
            opacity: 0.3;
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
        const triggerTop = viewportHeight * 0.3;
        const triggerBottom = viewportHeight * 0.5;
        
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

    updateFloatingTags();
}

function handleTagClick(tagElement, category) {
    document.getElementById('search-input').value = '';
    document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
    tagElement.classList.add('active');
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
        let foundBottom = false;
        
        document.querySelectorAll('.category').forEach(category => {
            if (category.style.display === 'none') return;
            
            category.querySelectorAll('li').forEach(item => {
                if (item.style.display === 'none' || foundBottom) return;
                
                const rect = item.getBoundingClientRect();
                const itemBottom = rect.bottom + window.scrollY;
                
                if (itemBottom <= viewportBottom) {
                    passedItems++;
                } else {
                    foundBottom = true;
                }
            });
        });
        
        return passedItems;
    }
    
    function updateCounter() {
        const total = calculateTotalVisible();
        const passed = findCurrentBottomItem();
        const remaining = total - passed;
        
        if (total > 0) {
            document.getElementById('remaining-count').textContent = `剩余${remaining}`;
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


