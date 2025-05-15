document.addEventListener('DOMContentLoaded', () => {
    renderPage();
    initSearch();
    initBackToTop();
});

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
            listItem.setAttribute('data-original-text', sentence); // 保存原始HTML内容

            const sentenceText = document.createElement('span');
            sentenceText.innerHTML = sentence; // 使用 innerHTML 插入HTML内容
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

            // 添加显示全部按钮
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
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const tags = document.querySelectorAll('.tag');
    const keywords = document.querySelectorAll('.keyword');
    const categories = document.querySelectorAll('.category');

    // 初始化：显示所有内容
    categories.forEach(category => {
        category.style.display = 'block';
    });

    // 搜索框功能
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

    // 清空搜索框功能
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        resetDisplay();
    });

    // 标签筛选功能
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
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

    // 关键词筛选功能
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

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // 点击按钮滚动到顶部
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function readText(text) {
    responsiveVoice.speak(text, 'Chinese Female', {
        rate: 0.8,
        pitch: 1,
        volume: 1
    });
}

function copyText(text, button) {
    // 使用DOM解析来清除HTML标签
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text; // 将HTML内容插入到临时div中
    const plainText = tempDiv.textContent || tempDiv.innerText; // 获取纯文本内容

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
    sentenceDiv.innerHTML = sentence; // 直接插入HTML内容
    modalContent.appendChild(sentenceDiv);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}