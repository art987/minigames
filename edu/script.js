document.addEventListener('DOMContentLoaded', () => {
    renderPage();
    initSearch();
    initBackToTop();
    initAutoScroll(); // 初始化自动滚动功能

    // 监听滚动事件
    window.addEventListener('scroll', updateFloatingTags);
});

function loadResponsiveVoice() {
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=tCF5EpUw';
    script.onload = () => {
        console.log('responsiveVoice.js 加载完成');
    };
    document.head.appendChild(script);
}

function updateFloatingTags() {
    const floatingTagsContainer = document.getElementById('floating-tags-container');
    const tagsContainer = document.getElementById('tags-container');
    const titleP = document.getElementById('title-p'); // 获取 title-p

    // 获取屏幕高度的 70%
    const threshold = window.innerHeight * 0.7;

    // 如果页面向上滑动超过 70% 的屏幕高度，显示浮动标签
    if (window.scrollY > threshold) {
        floatingTagsContainer.style.display = 'block';
        floatingTagsContainer.innerHTML = ''; // 清空浮动标签内容

        // 动态生成浮动标签
        data.tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.classList.add('tag');
            tagElement.textContent = tag.name;
            tagElement.dataset.category = tag.category;

            // 检查当前是否是激活的标签
            if (document.querySelector('.tag.active')?.dataset.category === tag.category) {
                tagElement.classList.add('active');
            }

            tagElement.addEventListener('click', () => {
                // 同步点击事件到原始标签
                const originalTag = document.querySelector(`.tag[data-category="${tag.category}"]`);
                if (originalTag) {
                    originalTag.click();
                }

                // 页面滚动到 title-p 的开始位置
                window.scrollTo({
                    top: titleP.offsetTop,
                    behavior: 'smooth'
                });
            });

            floatingTagsContainer.appendChild(tagElement);
        });
    } else {
        // 如果页面向下滚动且未超过 70% 的屏幕高度，隐藏浮动标签
        floatingTagsContainer.style.display = 'none';
    }
}

function renderPage() {
    // Render title
    document.getElementById('title-h1').innerText = data.title.h1;
    document.getElementById('title-p').innerText = data.title.p;

    // Render tags
    const tagsContainer = document.getElementById('tags-container');
    data.tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.dataset.category = tag.category;
        tagElement.textContent = tag.name;
        tagsContainer.appendChild(tagElement);
    });

    // Render keywords
    const keywordsContainer = document.getElementById('keywords-container');
    data.keywords.forEach(keyword => {
        const keywordElement = document.createElement('div');
        keywordElement.classList.add('keyword');
        keywordElement.dataset.keyword = keyword;
        keywordElement.textContent = keyword;
        keywordsContainer.appendChild(keywordElement);
    });

    // Render content
    const contentContainer = document.getElementById('content-container');
    Object.keys(data.content).forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.dataset.category = category;

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryElement.appendChild(categoryTitle);

        const categoryList = document.createElement('ul');
        data.content[category].forEach(sentence => {
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
                document.getElementById('search-input').value = keyword;
                document.getElementById('clear-search').style.display = 'inline';
                filterContent(keyword);
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
            filterContent(searchTerm);
        }
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        resetDisplay();
    });

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // 同步浮动标签的状态
            const floatingTag = document.getElementById('floating-tags-container').querySelector(`.tag[data-category="${tag.dataset.category}"]`);
            if (floatingTag) {
                document.getElementById('floating-tags-container').querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
                floatingTag.classList.add('active');
            }

            const categoryToShow = tag.getAttribute('data-category');
            categories.forEach(category => {
                if (categoryToShow === 'all') {
                    category.style.display = 'block';
                    category.querySelectorAll('li').forEach(item => {
                        item.style.display = 'block';
                        item.querySelector('span').innerHTML = item.getAttribute('data-original-text');
                    });
                } else {
                    category.style.display = category.getAttribute('data-category') === categoryToShow ? 'block' : 'none';
                    if (category.getAttribute('data-category') === categoryToShow) {
                        category.querySelectorAll('li').forEach(item => item.style.display = 'block');
                    }
                }
            });
        });
    });

    keywords.forEach(keyword => {
        keyword.addEventListener('click', () => {
            const keywordText = keyword.getAttribute('data-keyword');
            searchInput.value = keywordText;
            clearSearchBtn.style.display = 'inline';
            filterContent(keywordText);
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
            autoScrollButton.textContent = '👇';
            isScrolling = false;
        } else {
            // 开始滚动
            autoScrollInterval = setInterval(() => {
                window.scrollBy(0, 1); // 每次滚动 10px
            }, 80); // 每 100ms 滚动一次
            autoScrollButton.textContent = '停';
            isScrolling = true;
        }
    });

    // 如果用户手动滚动页面，停止自动滚动
    window.addEventListener('wheel', () => {
        if (isScrolling) {
            clearInterval(autoScrollInterval);
            autoScrollButton.textContent = '👇';
            isScrolling = false;
        }
    });
}

function readText(text) {
    // 检查输入是否为空
    if (!text || text.trim() === '') {
        console.warn('朗读内容为空');
        return;
    }

    // 创建一个临时的 div 元素来解析 HTML 内容
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;

    // 移除所有 <i> 和 <b> 标签及其内容
    const iTags = tempDiv.querySelectorAll('i');
    const bTags = tempDiv.querySelectorAll('b');
    iTags.forEach(tag => tag.remove());
    bTags.forEach(tag => tag.remove());

    // 获取纯文本内容
    let plainText = tempDiv.textContent || tempDiv.innerText;

    // 移除指定的表情符号
    const specificEmojis = ['😜', '📖', '💡', '👍'];
    const emojiRegex = new RegExp(`[${specificEmojis.join('')}]`, 'g');
    plainText = plainText.replace(emojiRegex, '');

    // 再次检查处理后的文本是否为空
    if (plainText.trim() === '') {
        console.warn('朗读内容为空');
        return;
    }

    // 使用 responsiveVoice.speak() 方法朗读纯文本内容
    responsiveVoice.speak(plainText, 'Chinese Female', {
        rate: 0.8,
        pitch: 1,
        volume: 1
    });
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