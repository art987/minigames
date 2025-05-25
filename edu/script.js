document.addEventListener('DOMContentLoaded', () => {
    renderPage();
    initSearch();
    initBackToTop();
    initAutoScroll(); // 初始化自动滚动功能
    initRemainingCounter(); // 新增初始化
    // 监听滚动事件
    window.addEventListener('scroll', updateFloatingTags);
});

function renderPage() {
    // Render title
    document.getElementById('title-h1').innerText = data.title.h1;
    document.getElementById('title-p').innerText = data.title.p;

// 创建剩余计数器元素（如果不存在）
    if (!document.getElementById('remaining-counter')) {
        const counter = document.createElement('div');
        counter.id = 'remaining-counter';
        counter.innerHTML = '<span id="remaining-count">0</span>/<span id="total-count">0</span>';
        document.body.appendChild(counter);
    }


    // Render tags from content
 const tagsContainer = document.getElementById('tags-container');
Object.keys(data.content).forEach(key => {
    const [name, category] = key.split('|');
    const tagElement = document.createElement('div');
    tagElement.classList.add('tag');
    tagElement.dataset.category = category;

        // 修复：正确显示标签名称和数量
        tagElement.textContent = `${name} (${data.content[key].length})`;
        

        tagElement.addEventListener('click', () => {
            // 清空搜索条件
            document.getElementById('search-input').value = '';
            // 清除所有标签和关键词的 active 类
            document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
            // 添加 active 类到当前标签
            tagElement.classList.add('active');
            // 清除之前的筛选结果，显示全部内容
            resetDisplay();

            // 滚动到距离顶部180像素的位置
            window.scrollTo({
                top: 180,
                behavior: 'smooth'
            });

            // 创建加载动画
            const contentContainer = document.getElementById('content-container');
            const loadingOverlay = document.createElement('div');
            loadingOverlay.classList.add('loading-overlay');
            const loadingSpinner = document.createElement('div');
            loadingSpinner.classList.add('loading-spinner');
            loadingOverlay.appendChild(loadingSpinner);
            contentContainer.appendChild(loadingOverlay);

            // 显示加载动画
            loadingOverlay.style.display = 'flex';

            // 1.5秒后隐藏加载动画并显示内容
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                contentContainer.removeChild(loadingOverlay);
                filterContentByCategory(category);
            }, 300);

            // 同时在 floating-tags-container 中也设置 active 状态
            const floatingTagsContainerTag = document.querySelector(`#floating-tags-container .tag[data-category="${category}"]`);
            if (floatingTagsContainerTag) {
                floatingTagsContainerTag.classList.add('active');
            }
        });
        tagsContainer.appendChild(tagElement);
    });

    // Render keywords
   const keywordsContainer = document.getElementById('keywords-container');
    data.keywords.forEach(keyword => {
        const keywordElement = document.createElement('div');
        keywordElement.classList.add('keyword');
        keywordElement.dataset.keyword = keyword;
        keywordElement.textContent = keyword;
        keywordElement.addEventListener('click', () => {
            // 清空搜索条件
            const searchInput = document.getElementById('search-input');
            searchInput.value = keyword;
            // 清除所有标签和关键词的 active 类
            document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
            // 添加 active 类到当前关键词
            keywordElement.classList.add('active');
            // 清除之前的筛选结果，显示全部内容
            resetDisplay();

            // 创建加载动画
            const contentContainer = document.getElementById('content-container');
            const loadingOverlay = document.createElement('div');
            loadingOverlay.classList.add('loading-overlay');
            const loadingSpinner = document.createElement('div');
            loadingSpinner.classList.add('loading-spinner');
            loadingOverlay.appendChild(loadingSpinner);
            contentContainer.appendChild(loadingOverlay);

            // 显示加载动画
            loadingOverlay.style.display = 'flex';

            // 1.5秒后隐藏加载动画并显示内容
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                contentContainer.removeChild(loadingOverlay);
                filterContent(keyword);
            }, 300);

            // 显示清空按钮
            document.getElementById('clear-search').style.display = 'inline';
        });
        keywordsContainer.appendChild(keywordElement);
    });

    // Render content
const contentContainer = document.getElementById('content-container');
    Object.keys(data.content).forEach(key => {
        const [name, category] = key.split('|');
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.dataset.category = category;

        const categoryTitle = document.createElement('h3');
    // 使用 data-category 的值来显示 h3 标签的内容
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

    // Show all keywords button
    const showAllKeywordsButton = document.getElementById('show-all-keywords');
    showAllKeywordsButton.addEventListener('click', () => {
        const modal = document.getElementById('keyword-modal');
        const modalKeywordsContainer = document.getElementById('modal-keywords-container');
        modalKeywordsContainer.innerHTML = '';

        data.keywords.forEach(keyword => {
            const keywordElement = document.createElement('div');
            keywordElement.classList.add('keyword');
            keywordElement.dataset.keyword = keyword;
            keywordElement.textContent = keyword;
            keywordElement.onclick = () => {
                // 新增：将关键词设置到搜索框
                const searchInput = document.getElementById('search-input');
                searchInput.value = keyword;
                
                // 原有逻辑
                document.querySelectorAll('.keyword').forEach(k => k.classList.remove('active'));
                keywordElement.classList.add('active');
                resetDisplay();
                // 创建加载动画
                const contentContainer = document.getElementById('content-container');
                const loadingOverlay = document.createElement('div');
                loadingOverlay.classList.add('loading-overlay');
                const loadingSpinner = document.createElement('div');
                loadingSpinner.classList.add('loading-spinner');
                loadingOverlay.appendChild(loadingSpinner);
                contentContainer.appendChild(loadingOverlay);

                // 显示加载动画
                loadingOverlay.style.display = 'flex';

                // 1.5秒后隐藏加载动画并显示内容
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    contentContainer.removeChild(loadingOverlay);
                    filterContent(keyword);
                }, 300);

                // 显示清空按钮
                document.getElementById('clear-search').style.display = 'inline';
                modal.style.display = 'none';
            };
            modalKeywordsContainer.appendChild(keywordElement);
        });

        modal.style.display = 'block';
    });

    // Close modal button
    const closeModalButton = document.getElementById('close-modal');
    closeModalButton.addEventListener('click', () => {
        const modal = document.getElementById('keyword-modal');
        modal.style.display = 'none';
    });

    // 初始化浮动标签
    updateFloatingTags();
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const tags = document.querySelectorAll('.tag');
    const keywords = document.querySelectorAll('.keyword');
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        category.style.display = 'block';
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === '') {
            clearSearchBtn.style.display = 'none';
            resetDisplay();
        } else {
            clearSearchBtn.style.display = 'inline';
            showLoadingAnimation();
            setTimeout(() => {
                hideLoadingAnimation();
                filterContent(searchTerm);
            }, 350);
        }

        // 清除所有标签和关键词的 active 类
        document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        resetDisplay();

        // 清除所有标签和关键词的 active 类
        document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
    });

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
    // 清空搜索条件
    document.getElementById('search-input').value = '';
    // 清除所有标签和关键词的 active 类
    document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
    // 添加 active 类到当前标签
    tag.classList.add('active');
    // 清除之前的筛选结果，显示全部内容
    resetDisplay();

    // 滚动到距离顶部180像素的位置
    window.scrollTo({
        top: 180,
        behavior: 'smooth'
    });

    // 创建加载动画
    const contentContainer = document.getElementById('content-container');
    const loadingOverlay = document.createElement('div');
    loadingOverlay.classList.add('loading-overlay');
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingOverlay.appendChild(loadingSpinner);
    contentContainer.appendChild(loadingOverlay);

    // 显示加载动画
    loadingOverlay.style.display = 'flex';

    // 1.5秒后隐藏加载动画并显示内容
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        contentContainer.removeChild(loadingOverlay);
        // 延迟调用 filterContentByCategory 方法
        setTimeout(() => {
            filterContentByCategory(tag.dataset.category);
        }, 100);
    }, 300);

    // 同时在 floating-tags-container 中也设置 active 状态
    const floatingTagsContainerTag = document.querySelector(`#floating-tags-container .tag[data-category="${tag.dataset.category}"]`);
    if (floatingTagsContainerTag) {
        floatingTagsContainerTag.classList.add('active');
    }
});
    });

    keywords.forEach(keyword => {
        keyword.addEventListener('click', () => {
            // 清空搜索条件
            const searchInput = document.getElementById('search-input');
            searchInput.value = keyword.dataset.keyword;
            // 清除所有标签和关键词的 active 类
            document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
            // 添加 active 类到当前关键词
            keyword.classList.add('active');
            // 清除之前的筛选结果，显示全部内容
            resetDisplay();

            // 创建加载动画
            const contentContainer = document.getElementById('content-container');
            const loadingOverlay = document.createElement('div');
            loadingOverlay.classList.add('loading-overlay');
            const loadingSpinner = document.createElement('div');
            loadingSpinner.classList.add('loading-spinner');
            loadingOverlay.appendChild(loadingSpinner);
            contentContainer.appendChild(loadingOverlay);

            // 显示加载动画
            loadingOverlay.style.display = 'flex';

            // 1.5秒后隐藏加载动画并显示内容
           setTimeout(() => {
            loadingOverlay.style.display = 'none';
            contentContainer.removeChild(loadingOverlay);
            const matchCount = filterContent(keyword.dataset.keyword);
            if (matchCount === 0) {
                // 如果没有匹配项，显示提示
                const noResults = document.createElement('div');
                noResults.textContent = '没有找到匹配的内容';
                noResults.style.textAlign = 'center';
                noResults.style.padding = '20px';
                noResults.style.color = '#666';
                contentContainer.appendChild(noResults);
            }
        }, 300);

            // 显示清空按钮
            document.getElementById('clear-search').style.display = 'inline';
        });
    });
}

function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
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

    autoScrollButton.addEventListener('click', () => {
        if (isScrolling) {
            // 停止滚动
            clearInterval(autoScrollInterval);
            autoScrollButton.textContent = '↓滚动';
            isScrolling = false;
        } else {
            // 开始滚动
            autoScrollInterval = setInterval(() => {
                window.scrollBy(0, 1); // 每次滚动 10px
            }, 120); // 每 100ms 滚动一次
            autoScrollButton.textContent = '停止';
            isScrolling = true;
        }
    });

    // 如果用户手动滚动页面，停止自动滚动
    window.addEventListener('wheel', () => {
        if (isScrolling) {
            clearInterval(autoScrollInterval);
            autoScrollButton.textContent = '↓滚动';
            isScrolling = false;
        }
    });
}

function readText(text) {
    // 创建临时div处理HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    
    // 移除所有<i>和<b>标签及其内容
    const elementsToRemove = tempDiv.querySelectorAll('i, b');
    elementsToRemove.forEach(el => el.remove());
    
    // 获取纯文本内容
    let plainText = tempDiv.textContent || tempDiv.innerText;
    
    // 使用更全面的正则表达式移除表情符号（包含各种类型的Unicode表情）
    const emojiRegex = /[\p{Emoji}\u200d\uFE0F]/gu;
    plainText = plainText.replace(emojiRegex, '');
    
    // 移除多余空格并修剪文本
    plainText = plainText.replace(/\s+/g, ' ').trim();
    
    // 执行朗读
    const voice = typeof VOICE_SETTING !== 'undefined' ? VOICE_SETTING : 'Chinese Female';
    if (plainText) {
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
        setTimeout(() => {
            button.textContent = '复制';
        }, 3000);
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
    
    // 先统计每个分类的匹配数
    const categoryMatches = {};
    categories.forEach(category => {
        const items = category.querySelectorAll('li');
        let matchCount = 0;
        
        items.forEach(item => {
            const originalText = item.getAttribute('data-original-text');
            if (originalText && originalText.toLowerCase().includes(keyword.toLowerCase())) {
                matchCount++;
            }
        });
        
        categoryMatches[category.dataset.category] = matchCount;
        totalMatches += matchCount;
    });
    
    // 然后更新显示
    categories.forEach(category => {
        const items = category.querySelectorAll('li');
        let hasVisibleItem = false;
        
        items.forEach(item => {
            const originalText = item.getAttribute('data-original-text');
            if (originalText && originalText.toLowerCase().includes(keyword.toLowerCase())) {
                item.style.display = 'block';
                item.querySelector('span').innerHTML = highlightKeyword(originalText, keyword);
                hasVisibleItem = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // 修复：正确更新分类标题
        const categoryTitle = category.querySelector('h3');
        if (categoryTitle) {
            // 从原始数据中获取分类名称
            const categoryKey = Object.keys(data.content).find(key => 
                key.includes(category.dataset.category)
            );
            
            if (categoryKey) {
                const [name, originalCategory] = categoryKey.split('|');
                const matchCount = categoryMatches[category.dataset.category] || 0;
                categoryTitle.textContent = `${originalCategory} (${matchCount}条记录)`;
            }
        }
        
        category.style.display = hasVisibleItem ? 'block' : 'none';
    });
    
    return totalMatches;
}

function filterContentByCategory(categoryName) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        if (category.dataset.category === categoryName) {
            category.style.display = 'block';
            
            // 更新分类标题中的统计数字为实际显示的数量
            const items = category.querySelectorAll('li');
            const visibleCount = items.length;
            const categoryTitle = category.querySelector('h3');
            if (categoryTitle) {
                // 获取原始分类名称
                const categoryKey = Object.keys(data.content).find(key => 
                    key.includes(category.dataset.category)
                );
                if (categoryKey) {
                    const [name, originalCategory] = categoryKey.split('|');
                    // 保留原始分类名称，只更新记录数
                    categoryTitle.textContent = `${originalCategory} (${visibleCount}条记录)`;
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
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'block';
        
        // 恢复分类标题中的原始统计数字
        const categoryTitle = category.querySelector('h3');
        if (categoryTitle) {
            // 直接从 data.content 中获取原始分类名称和记录数
            const categoryKey = Object.keys(data.content).find(key => 
                key.includes(category.dataset.category)
            );
            
            if (categoryKey) {
                const [name, originalCategory] = categoryKey.split('|');
                const originalCount = data.content[categoryKey].length;
                // 确保使用完整的分类名称和记录数
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
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.style.background = '#fefefe';
    modalContent.style.margin = '15% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';
    modalContent.style.height = '60%';
    modalContent.style.overflowY = 'auto';
    modalContent.style.borderRadius = '21px';

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = '×';
    closeButton.style.color = '#ffffff';
    closeButton.style.fontSize = '29px';
    closeButton.style.marginTop = '-16px';
    closeButton.style.display = 'block';
    closeButton.style.padding = '0px 8px';
    closeButton.style.marginRight = '-19px';
    closeButton.style.position = 'fixed';
    closeButton.style.right = '36px';
    closeButton.style.top = '69px';
    closeButton.style.borderRadius = '40px';
    closeButton.style.background = '#c70000';
    closeButton.onclick = () => {
        modal.remove();
    };

    modalContent.appendChild(closeButton);

    const sentenceDiv = document.createElement('div');
    sentenceDiv.innerHTML = sentence;
    modalContent.appendChild(sentenceDiv);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function updateFloatingTags() {
    const floatingTagsContainer = document.getElementById('floating-tags-container');
    const contentContainer = document.getElementById('content-container');
    const threshold = window.innerHeight * 0.7;

    // 检查当前筛选的内容
    let currentActiveCategory = null;
    const activeTag = document.querySelector('.tag.active');
    if (activeTag) {
        currentActiveCategory = activeTag.dataset.category;
    }

    if (window.scrollY > threshold) {
        floatingTagsContainer.style.display = 'block';
        floatingTagsContainer.innerHTML = '';
        
        // 正确渲染浮动标签
        Object.keys(data.content).forEach(key => {
            const [name, category] = key.split('|');
            const tagElement = document.createElement('div');
            tagElement.classList.add('tag');
            tagElement.dataset.category = category;

            // 修复：显示标签名称(name)而不是分类(category)，并显示数量
            tagElement.textContent = `${name} (${data.content[key].length})`;

            tagElement.addEventListener('click', () => {
                // 清空搜索条件
                document.getElementById('search-input').value = '';
                // 清除所有标签和关键词的 active 类
                document.querySelectorAll('.tag, .keyword').forEach(el => el.classList.remove('active'));
                // 添加 active 类到当前标签
                tagElement.classList.add('active');
                // 清除之前的筛选结果，显示全部内容
                resetDisplay();

                // 滚动到距离顶部180像素的位置
                window.scrollTo({
                    top: 180,
                    behavior: 'smooth'
                });

                // 创建加载动画
                const loadingOverlay = document.createElement('div');
                loadingOverlay.classList.add('loading-overlay');
                const loadingSpinner = document.createElement('div');
                loadingSpinner.classList.add('loading-spinner');
                loadingOverlay.appendChild(loadingSpinner);
                contentContainer.appendChild(loadingOverlay);

                // 显示加载动画
                loadingOverlay.style.display = 'flex';

                // 1.5秒后隐藏加载动画并显示内容
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    contentContainer.removeChild(loadingOverlay);
                    filterContentByCategory(category);
                }, 300); // 缩短为300ms

                // 同时在 tags-container 中也设置 active 状态
                const tagsContainerTag = document.querySelector(`#tags-container .tag[data-category="${category}"]`);
                if (tagsContainerTag) {
                    tagsContainerTag.classList.add('active');
                }
            });
            
            floatingTagsContainer.appendChild(tagElement);

            // 如果当前筛选的内容与该标签的 category 相同，则添加 active 类
            if (currentActiveCategory === category) {
                tagElement.classList.add('active');
            }
        });
    } else {
        floatingTagsContainer.style.display = 'none';
    }
}

function showLoadingAnimation() {
    const contentContainer = document.getElementById('content-container');
    const loadingOverlay = document.createElement('div');
    loadingOverlay.classList.add('loading-overlay');
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingOverlay.appendChild(loadingSpinner);
    contentContainer.appendChild(loadingOverlay);
    loadingOverlay.style.display = 'flex';
}

function hideLoadingAnimation() {
    const contentContainer = document.getElementById('content-container');
    const loadingOverlay = contentContainer.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
        contentContainer.removeChild(loadingOverlay);
    }
}


// 剩余计数器功能
function initRemainingCounter() {
    const counter = document.getElementById('remaining-counter');
    
    // 计算总可见条目数
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
    
    // 计算当前屏幕底部的条目索引
    function findCurrentBottomItem() {
        const viewportBottom = window.innerHeight + window.scrollY;
        let passedItems = 0;
        let foundBottom = false;
        
        document.querySelectorAll('.category').forEach(category => {
            if (category.style.display === 'none') return;
            
            category.querySelectorAll('li').forEach(item => {
                if (item.style.display === 'none') return;
                if (foundBottom) return;
                
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
    
    // 更新计数器显示
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
    
    // 初始更新
    updateCounter();
    
    // 添加事件监听
    window.addEventListener('scroll', updateCounter);
    window.addEventListener('resize', updateCounter);
    
    // 包装原有筛选函数以自动更新计数器
    const originalFunctions = {
        filterContent: filterContent,
        filterContentByCategory: filterContentByCategory,
        resetDisplay: resetDisplay
    };
    
    filterContent = function(keyword) {
        originalFunctions.filterContent(keyword);
        setTimeout(updateCounter, 100);
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