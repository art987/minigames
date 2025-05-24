document.addEventListener('DOMContentLoaded', () => {
    renderPage();
    initSearch();
    initBackToTop();
    initAutoScroll(); // 初始化自动滚动功能

    // 监听滚动事件
    window.addEventListener('scroll', updateFloatingTags);
});

function renderPage() {
    // Render title
    document.getElementById('title-h1').innerText = data.title.h1;
    document.getElementById('title-p').innerText = data.title.p;

    // Render tags from content
    const tagsContainer = document.getElementById('tags-container');
    Object.keys(data.content).forEach(key => {
        const [name, category] = key.split('|');
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.textContent = name;
        tagElement.dataset.category = category;
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

            // 筛选当前标签的内容
            filterContentByCategory(tag.dataset.category);

            // 同时在 floating-tags-container 中也设置 active 状态
            const floatingTagsContainerTag = document.querySelector(`#floating-tags-container .tag[data-category="${tag.dataset.category}"]`);
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
            }, 350);

            // 显示清空按钮
            document.getElementById('clear-search').style.display = 'inline';
        });
        keywordsContainer.appendChild(keywordElement);
    });

    // Render content
    const contentContainer = document.getElementById('content-container');
    Object.keys(data.content).forEach(categoryKey => {
        const [name, category] = categoryKey.split('|');
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.dataset.category = category;

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryElement.appendChild(categoryTitle);

        const categoryList = document.createElement('ul');
        data.content[categoryKey].forEach(sentence => {
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
                }, 350);

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
                filterContent(keyword.dataset.keyword);
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
        category.style.display = hasVisibleItem ? 'block' : 'none';
    });
}

function filterContentByCategory(category) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(categoryElement => {
        if (categoryElement.dataset.category === category) {
            categoryElement.style.display = 'block';
            categoryElement.querySelectorAll('li').forEach(item => {
                item.style.display = 'block';
                item.querySelector('span').innerHTML = item.getAttribute('data-original-text');
            });
        } else {
            categoryElement.style.display = 'none';
        }
    });
}

function resetDisplay() {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'block';
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
        Object.keys(data.content).forEach(key => {
            const [name, category] = key.split('|');
            const tagElement = document.createElement('div');
            tagElement.classList.add('tag');
            tagElement.textContent = name;
            tagElement.dataset.category = category;
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
                }, 1000);

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