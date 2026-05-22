
	
	
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
    title.textContent = '☀今日推荐（10）';
    title.style.marginTop = '0';
    
    // 创建推荐内容容器
    const recommendContainer = document.createElement('ul');
    recommendContainer.id = 'today-recommend-container';

    
    // 创建底部按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'bottom-buttons';

   

    
    // 创建关闭按钮
    const closeBtn = document.createElement('button');
	closeBtn.className = 'bottom-close-button';
    closeBtn.textContent = '自己看看';
	
	
	 // 创建换一组按钮
    const refreshButton = document.createElement('button');
	refreshButton.className = 'refresh-button';
    refreshButton.textContent = '换一组';

    
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
        // 移除果冻动画类
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('jelly-show');
        }
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        // 移除果冻动画类
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('jelly-show');
        }
    });
    
    // 换一组按钮事件
    refreshButton.addEventListener('click', () => {
        showTodayRecommendations();
    });
    
    // 点击外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            // 移除果冻动画类
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.remove('jelly-show');
            }
        }
    });
}

// 显示今日推荐内容

function showTodayRecommendations() {
    const modal = document.getElementById('today-recommend-modal');
    const container = document.getElementById('today-recommend-container');
    
    // 添加加载动画
    container.innerHTML = '<div class="loading-animation"></div>';
    
    // 添加加载动画样式
    const style = document.createElement('style');
    style.textContent = `
        .loading-animation {
            width: 40px;
            height: 40px;
            margin: 50px auto;
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 4px solid #cd0202;
            animation: spin .5s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // 延迟1秒后显示新内容
    setTimeout(() => {
        // 移除加载动画样式
        document.head.removeChild(style);
        
        // 清空容器
        container.innerHTML = '';
        
        // 收集所有可能的推荐项
        let allRecommendations = [];
        Object.values(data.content).forEach(category => {
            allRecommendations = allRecommendations.concat(category);
        });
        
        // 随机选择10条不重复的推荐
        const selectedRecommendations = [];
        const usedIndices = new Set();
        
        while (selectedRecommendations.length < 10 && selectedRecommendations.length < allRecommendations.length) {
            const randomIndex = Math.floor(Math.random() * allRecommendations.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                selectedRecommendations.push(allRecommendations[randomIndex]);
            }
        }
        
        // 添加推荐项到容器
        selectedRecommendations.forEach(recommendation => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-original-text', recommendation);
            
            const textSpan = document.createElement('span');
            textSpan.innerHTML = recommendation.replace(/<nav>.*?<\/nav>/, ''); // 移除nav标签显示
            listItem.appendChild(textSpan);
            
            const actions = document.createElement('div');
            actions.className = 'actions';
            
            // 检查是否有nav标签
            const navMatch = recommendation.match(/<nav>(.*?)<\/nav>/);
            if (navMatch) {
                const url = navMatch[1];
                
                // 添加复制网址按钮
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.textContent = '复制网址';
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(url)
                        .then(() => alert('网址已复制'))
                        .catch(err => console.error('复制失败:', err));
                });
                actions.appendChild(copyBtn);
                
                // 添加直达网站按钮
                const openBtn = document.createElement('button');
                openBtn.className = 'open-btn';
                openBtn.textContent = '直达网站';
                openBtn.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
                actions.appendChild(openBtn);
            } else {
                // 如果没有nav标签，添加默认的朗读和复制按钮
                const readButton = document.createElement('button');
                readButton.textContent = '朗读';
                readButton.onclick = () => {
                    // 如果点击的是正在朗读的按钮，则停止
                    if (currentReadingButton === readButton) {
                        stopReading();
                        readButton.textContent = '朗读';
                        currentReadingButton = null;
                        isPlaying = false;
                        updatePlayPauseButton();
                    } else {
                        // 如果有其他按钮正在朗读，先停止它
                        if (currentReadingButton) {
                            stopReading();
                            currentReadingButton.textContent = '朗读';
                        }
                        
                        // 开始新的朗读
                        currentReadingButton = readButton;
                        readButton.textContent = '停止';
                        readText(recommendation, () => {
                            readButton.textContent = '朗读';
                            if (currentReadingButton === readButton) {
                                currentReadingButton = null;
                            }
                        }, readButton);
                    }
                };
                actions.appendChild(readButton);
                
                const copyButton = document.createElement('button');
                copyButton.textContent = '复制';
                copyButton.onclick = () => copyText(recommendation, copyButton);
                actions.appendChild(copyButton);
            }
            
            listItem.appendChild(actions);
            container.appendChild(listItem);
        });
        
        // 显示弹窗
        modal.style.display = 'block';
        
        // 添加果冻动画
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.add('jelly-show');
        }
        
        // 新增代码 - 滚动到顶部
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
    }, 300); // 0.3秒延迟
}



// 配置参数 - 可自行修改控制功能
const CONFIG = {
    showTodayRecommend: 0, // 0不显示弹窗，1显示弹窗
    enableFloatingTags: 1,  // 0不启用浮动标签，1启用浮动标签
    enableNavbar: 0  // 0不启用顶部导航栏，1启用顶部导航栏
};

// 在DOMContentLoaded事件中替换原来的弹窗代码
document.addEventListener('DOMContentLoaded', () => {
    // 根据配置决定是否启用navbar
    if (CONFIG.enableNavbar === 1) {
        setupNavbarScrollBehavior();
        // 动态加载menu-functions.js
        const menuScript = document.createElement('script');
        menuScript.src = 'https://peacelove.top/menu-functions.js';
        document.body.appendChild(menuScript);
    } else {
        // 如果不启用navbar，隐藏navbar-container
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.style.display = 'none';
        }
    }
    
    // 预加载语音（提升首次朗读响应速度）
    if ('speechSynthesis' in window) {
        // 某些浏览器需要先调用getVoices()才能加载语音列表
        speechSynthesis.getVoices();
        
        // 监听语音列表加载完成
        speechSynthesis.onvoiceschanged = () => {
            const voices = speechSynthesis.getVoices();
            console.log(`已加载 ${voices.length} 个语音`);
        };
    }
    
    
    
	// 设置文档head信息
    document.title = data.head.title;
    
    // 设置或创建meta标签
    const setMetaTag = (name, content) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    };
    
    setMetaTag('keywords', data.head.keywords);
    setMetaTag('description', data.head.description);
    
    
    
    
    
    // 创建今日推荐弹窗
    createTodayRecommendModal();
    
	// 新增代码开始 - 创建并添加今日推荐按钮
    const recommendBtn = document.createElement('button');
    recommendBtn.className = 'today-recommend-button';
    recommendBtn.id = 'today-recommend-button';
    recommendBtn.textContent = '☀ 今日推荐';
    document.body.appendChild(recommendBtn);
    
    // 添加点击事件
    recommendBtn.addEventListener('click', () => {
        showTodayRecommendations();
    });
    // 新增代码结束
    
    
    
    
    
    renderPage();
    initSearch();
    initAutoScroll();
    initRemainingCounter();
    
    // 处理浮动标签功能
    if (CONFIG.enableFloatingTags === 1) {
        const floatingTagsContainer = document.getElementById('floating-tags-container');
        floatingTagsContainer.style.display = 'none';
        
        // 监听滚动事件 - 已禁用，改为通过播放控制条手动控制
        // window.addEventListener('scroll', updateFloatingTags);
    }
    
    // 根据配置决定是否显示今日推荐弹窗
    if (CONFIG.showTodayRecommend === 1) {
        setTimeout(() => {
            showTodayRecommendations();
        }, 500);
    }
});	
	
	
	
	
	// 在 script.js 中替换原有的滚动监听器
function setupNavbarScrollBehavior() {
    const navbar = document.getElementById('navbar-container');
    if (!navbar) return;

    let lastScrollTop = 0;
    const navbarHeight = navbar.offsetHeight;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 如果滚动到页面顶部，确保显示navbar
        if (scrollTop <= 0) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            return;
        }

        // 判断滚动方向
        if (scrollTop > lastScrollTop) {
            // 向下滚动 - 隐藏navbar
            navbar.style.position = '';
            navbar.style.top = '';
        } else {
            // 向上滚动 - 显示navbar
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
        }

        lastScrollTop = scrollTop;
    });
}

// 在DOM加载完成后调用
document.addEventListener('DOMContentLoaded', function() {
    setupNavbarScrollBehavior();
});
	
	
	
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
        // 移除果冻动画类
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('jelly-show');
        }
    });
    
    // 点击外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            // 移除果冻动画类
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.remove('jelly-show');
            }
        }
    });
}

function showAllTagsModal() {
    // 确保弹窗已创建
    createAllTagsModal();
    
    const modal = document.getElementById('all-tags-modal');
    const container = document.getElementById('all-tags-container');
    
    // 添加额外的检查
    if (!modal || !container) {
        console.error('Modal elements not found');
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 添加"全部"标签
    const allTagElement = document.createElement('div');
    allTagElement.className = 'tag active';
    allTagElement.dataset.category = 'all';
    allTagElement.textContent = '全部分类';

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
    
    // 添加果冻动画
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.classList.add('jelly-show');
    }
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
	
	// 在renderPage函数中确保有这段代码
const showAllTagsButton = document.getElementById('show-all-tags');
if (showAllTagsButton) {
    showAllTagsButton.addEventListener('click', showAllTagsModal);
}
    
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
            readButton.onclick = () => {
                // 如果点击的是正在朗读的按钮，则停止
                if (currentReadingButton === readButton) {
                    stopReading();
                    readButton.textContent = '朗读';
                    currentReadingButton = null;
                    isPlaying = false;
                    updatePlayPauseButton();
                } else {
                    // 如果有其他按钮正在朗读，先停止它
                    if (currentReadingButton) {
                        stopReading();
                        currentReadingButton.textContent = '朗读';
                    }
                    
                    // 找到当前卡片的索引
                    const visibleItems = getVisibleItems();
                    const cardIndex = visibleItems.indexOf(listItem);
                    
                    // 同步播放器状态（但不设置isPlaying）
                    if (cardIndex !== -1) {
                        currentVisibleItems = visibleItems;
                        currentPlayingIndex = cardIndex;
                        highlightItem(listItem);
                        showFloatingPlayer();
                        updatePlayPauseButton();
                    }
                    
                    // 开始新的朗读（单次播放，不自动播放下一条）
                    currentReadingButton = readButton;
                    readButton.textContent = '停止';
                    readText(sentence, () => {
                        // 朗读完成后恢复按钮文本
                        readButton.textContent = '朗读';
                        if (currentReadingButton === readButton) {
                            currentReadingButton = null;
                        }
                    }, readButton);
                }
            };
            actions.appendChild(readButton);

            const copyButton = document.createElement('button');
            copyButton.textContent = '复制';
            copyButton.onclick = () => copyText(sentence, copyButton);
            actions.appendChild(copyButton);

//            const showAllButton = document.createElement('button');
//            showAllButton.textContent = '全文';
//            showAllButton.onclick = () => showAllText(sentence);
//            actions.appendChild(showAllButton);

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

   // 渲染内容后处理nav标签
    Object.keys(data.content).forEach(key => {
        data.content[key].forEach(sentence => {
          
        });
    });

    updateFloatingTags();
    
    initTagsAutoScroll();
}

function initTagsAutoScroll() {
    const tagsContainer = document.getElementById('tags-container');
    if (!tagsContainer) return;
    
    const tags = tagsContainer.querySelectorAll('.tag');
    if (tags.length === 0) return;
    
    let currentRow = 0;
    let rows = []; // 存储每行的tag索引
    let autoScrollInterval;
    let isHovering = false;
    
    // 将tag分组到不同的行
    function groupTagsIntoRows() {
        rows = [];
        const containerWidth = tagsContainer.clientWidth;
        const gap = 7;
        let currentRowTags = [];
        let currentWidth = 0;
        
        tags.forEach((tag, index) => {
            // 临时显示tag以获取宽度
            tag.style.display = 'block';
            const tagWidth = tag.offsetWidth + gap;
            
            if (currentWidth + tagWidth > containerWidth && currentRowTags.length > 0) {
                // 当前行放不下，开始新行
                rows.push(currentRowTags);
                currentRowTags = [];
                currentWidth = 0;
            }
            
            currentRowTags.push(index);
            currentWidth += tagWidth;
        });
        
        // 添加最后一行
        if (currentRowTags.length > 0) {
            rows.push(currentRowTags);
        }
        
        // 隐藏所有tag
        tags.forEach(tag => {
            tag.style.display = 'none';
        });
        
        return rows.length;
    }
    
    // 显示指定行
    function showRow(rowIndex) {
        if (rowIndex < 0 || rowIndex >= rows.length) return;
        
        // 淡出所有tag
        tags.forEach(tag => {
            tag.classList.add('fade-out');
            tag.classList.remove('fade-in');
        });
        
        // 等待淡出完成后，隐藏所有tag并显示新的行
        setTimeout(() => {
            tags.forEach(tag => {
                tag.style.display = 'none';
                tag.classList.remove('fade-out');
            });
            
            // 显示当前行的tag并淡入
            rows[rowIndex].forEach(tagIndex => {
                tags[tagIndex].style.display = 'block';
                tags[tagIndex].classList.add('fade-in');
            });
        }, 500);
    }
    
    // 自动翻页
    function autoScroll() {
        if (isHovering) return;
        
        currentRow = (currentRow + 1) % rows.length;
        showRow(currentRow);
    }
    
    // 初始化
    function init() {
        groupTagsIntoRows();
        if (rows.length > 0) {
            showRow(0);
            if (rows.length > 1) {
                autoScrollInterval = setInterval(autoScroll, 3000);
            }
        }
    }
    
    // 鼠标悬停时暂停
    tagsContainer.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    tagsContainer.addEventListener('mouseleave', () => {
        isHovering = false;
    });
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', () => {
        clearInterval(autoScrollInterval);
        currentRow = 0;
        groupTagsIntoRows();
        if (rows.length > 0) {
            showRow(0);
            if (rows.length > 1) {
                autoScrollInterval = setInterval(autoScroll, 3000);
            }
        }
    });
    
    // 延迟初始化，确保DOM已完全渲染
    setTimeout(init, 100);
}

function handleTagClick(tagElement, category) {
    // 如果正在播放，停止播放
    if (isPlaying) {
        stopReading();
        isPlaying = false;
        updatePlayPauseButton();
        currentReadingButton = null;
    }
    
    // 重置播放索引，确保下次播放从第一条开始
    currentPlayingIndex = -1;
    currentVisibleItems = [];
    
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
    
    // 隐藏浮动菜单，提升阅读体验
    const floatingTagsContainer = document.getElementById('floating-tags-container');
    if (floatingTagsContainer) {
        floatingTagsContainer.style.transform = 'translateX(-100%)';
        floatingTagsContainer.style.opacity = '0';
        setTimeout(() => {
            floatingTagsContainer.style.display = 'none';
        }, 300);
    }
}





function handleKeywordClick(keywordElement, keyword) {
    // 如果正在播放，停止播放
    if (isPlaying) {
        stopReading();
        isPlaying = false;
        updatePlayPauseButton();
        currentReadingButton = null;
    }
    
    // 重置播放索引，确保下次播放从第一条开始
    currentPlayingIndex = -1;
    currentVisibleItems = [];
    
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
    
    // 添加果冻动画
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.classList.add('jelly-show');
    }
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const tags = document.querySelectorAll('.tag');
    const keywords = document.querySelectorAll('.keyword');

    searchInput.addEventListener('input', () => {
        // 重置播放索引，确保下次播放从第一条开始
        currentPlayingIndex = -1;
        currentVisibleItems = [];
        
        // 如果正在播放，停止播放
        if (isPlaying) {
            stopReading();
            isPlaying = false;
            updatePlayPauseButton();
            currentReadingButton = null;
        }
        
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

// 停止朗读功能
function stopReading() {
    // 停止Web Speech API
    if ('speechSynthesis' in window) {
        // 先取消所有正在播放的语音
        speechSynthesis.cancel();
        
        // 某些浏览器需要额外处理
        // 创建一个空的utterance来确保停止
        const emptyUtterance = new SpeechSynthesisUtterance('');
        speechSynthesis.speak(emptyUtterance);
        speechSynthesis.cancel();
    }
    
    // 停止ResponsiveVoice
    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.cancel();
    }
    
    console.log('朗读已停止');
}

// 全局变量：跟踪当前正在朗读的按钮
let currentReadingButton = null;

function readText(text, callback, button) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    
    const elementsToRemove = tempDiv.querySelectorAll('i, b');
    elementsToRemove.forEach(el => el.remove());
    
    let plainText = tempDiv.textContent || tempDiv.innerText;
    const emojiRegex = /[\p{Emoji}\u200d\uFE0F]/gu;
    plainText = plainText.replace(emojiRegex, '').replace(/\s+/g, ' ').trim();
    
    if (!plainText) return;
    
    // 优先使用Web Speech API（原生支持，嵌套环境兼容性更好）
    if ('speechSynthesis' in window) {
        // 确保停止之前的朗读
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(plainText);
        
        // 获取中文语音
        const voices = speechSynthesis.getVoices();
        const chineseVoice = voices.find(voice => 
            voice.lang.includes('zh') || voice.lang.includes('cmn')
        ) || voices.find(voice => voice.lang.includes('CN'));
        
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        }
        
        // 优化参数，提升自然度
        utterance.rate = 0.85;      // 语速：稍慢一点，更清晰
        utterance.pitch = 1.05;     // 音调：略微提高，更自然
        utterance.volume = isMuted ? 0 : 0.9;  // 音量：静音时为0，否则略微降低，避免刺耳
        
        // 添加事件监听，提升用户体验
        utterance.onstart = () => {
            console.log('开始朗读');
        };
        
        utterance.onend = () => {
            console.log('朗读完成');
            if (callback) callback();
        };
        
        utterance.onerror = (event) => {
            // interrupted错误是正常的停止操作，不需要处理
            if (event.error === 'interrupted') {
                console.log('朗读被中断（正常停止）');
                return;
            }
            
            // 其他真正的错误才需要处理
            console.error('朗读错误:', event.error);
            if (callback) callback();
            
            // 如果Web Speech API失败，尝试ResponsiveVoice
            if (typeof responsiveVoice !== 'undefined') {
                fallbackToResponsiveVoice(plainText, callback);
            }
        };
        
        speechSynthesis.speak(utterance);
    } 
    // 备选方案：ResponsiveVoice
    else if (typeof responsiveVoice !== 'undefined') {
        fallbackToResponsiveVoice(plainText, callback);
    }
    else {
        console.warn('当前环境不支持语音朗读');
        alert('抱歉，当前环境不支持语音朗读功能');
    }
}

// ResponsiveVoice备选方案
function fallbackToResponsiveVoice(text, callback) {
    const voice = typeof VOICE_SETTING !== 'undefined' ? VOICE_SETTING : 'Chinese Female';
    responsiveVoice.speak(text, voice, {
        rate: 0.85,
        pitch: 1.05,
        volume: 0.9,
        onend: callback
    });
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
        floatingTagsContainer.style.transform = 'translateX(-100%)';
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
    
    // 添加底部间距，防止被播放控制条遮挡
    const spacer = document.createElement('div');
    spacer.style.height = '100px';
    spacer.style.width = '100%';
    floatingTagsContainer.appendChild(spacer);
}
        
        // 显示浮动标签栏并添加动画
        floatingTagsContainer.style.display = 'block';
        setTimeout(() => {
            floatingTagsContainer.style.transform = 'translateX(0)';
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
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const triggerHeight = window.innerHeight * 1.5; // 1.5倍屏幕高度
        
        if (total > 0 && scrollY >= triggerHeight) {
            document.getElementById('remaining-count').textContent = passed;
            document.getElementById('total-count').textContent = total;
            counter.style.display = 'block'; // 显示计数器
        } else {
            counter.style.display = 'none'; // 隐藏计数器
        }
        
        // 更新播放按钮的阅读统计显示
        updatePlayPauseButton();
    }
    
    // 初始检查
    updateCounter();
    
    // 监听滚动和窗口大小变化
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


 // 处理遇到nav标签自动更换按钮。
function processNavTags() {
  

  // 处理所有包含nav标签的内容
  document.querySelectorAll('.content li').forEach(item => {
    const content = item.getAttribute('data-original-text');
    const navRegex = /<nav>(.*?)<\/nav>/;
    const match = content.match(navRegex);
    
    if (match) {
      let url = match[1];
      // 自动添加https://协议（如果原网址没有协议）
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      const actionsDiv = item.querySelector('.actions');
      if (actionsDiv) {
        actionsDiv.innerHTML = `
          <button class="copy-btn" data-url="${url}">复制网址</button>
          <button class="open-btn" data-url="${url}">直达网站</button>
        `;
        
        // 复制按钮功能
        const copyBtn = actionsDiv.querySelector('.copy-btn');
        copyBtn.addEventListener('click', function() {
          navigator.clipboard.writeText(url)
            .then(() => {
              // 改变按钮文字为"✔已复制"，3秒后恢复
              const originalText = copyBtn.innerText;
              copyBtn.innerHTML = '✔已复制';
              setTimeout(() => {
                copyBtn.innerHTML = originalText;
              }, 3000);
            })
            .catch(err => console.error('复制失败:', err));
        });
        
        // 打开网站功能
        actionsDiv.querySelector('.open-btn').addEventListener('click', function() {
          window.open(url, '_blank');
        });
      }
    }
  });
}

// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(processNavTags, 1000); // 延迟1秒确保所有元素已渲染
});

// ========== 浮动播放控制条功能 ==========
let floatingPlayer = null;
let currentPlayingIndex = -1;
let currentVisibleItems = [];
let isPlaying = false;
let isMuted = false;
let isFloatingMenuVisible = false;

function createFloatingPlayer() {
    if (document.getElementById('floating-player')) return;
    
    const player = document.createElement('div');
    player.id = 'floating-player';
    player.className = 'floating-player';
    
    // 创建按钮组的辅助函数
    function createButtonGroup(icon, label, className, title) {
        const group = document.createElement('div');
        group.className = 'btn-group';
        
        const button = document.createElement('button');
        button.className = className;
        button.innerHTML = icon;
        button.title = title;
        
        const text = document.createElement('span');
        text.className = 'btn-text';
        text.textContent = label;
        
        group.appendChild(button);
        group.appendChild(text);
        
        return { group, button };
    }
    
    // 浮动菜单控制按钮
    const menuGroup = createButtonGroup('☰', '分类', 'menu-toggle-btn', '显示浮动菜单');
    
    // 上一条按钮
    const prevGroup = createButtonGroup('⏮', '上一条', 'prev-btn', '上一条');
    
    // 播放/暂停按钮
    const playPauseGroup = createButtonGroup('▶', '播放', 'play-pause-btn', '播放');
    
    // 下一条按钮
    const nextGroup = createButtonGroup('⏭', '下一条', 'next-btn', '下一条');
    
    // 静音开关按钮
    const muteGroup = createButtonGroup('🔊', '静音', 'mute-btn', '静音');
    
    // 置顶按钮
    const topGroup = createButtonGroup('⬆', '置顶', 'top-btn', '置顶');
    
    player.appendChild(menuGroup.group);
    player.appendChild(prevGroup.group);
    player.appendChild(playPauseGroup.group);
    player.appendChild(nextGroup.group);
    player.appendChild(muteGroup.group);
    player.appendChild(topGroup.group);
    
    document.body.appendChild(player);
    
    floatingPlayer = player;
    
    // 初始化播放按钮的阅读统计显示
    updatePlayPauseButton();
    
    menuGroup.button.addEventListener('click', toggleFloatingMenu);
    prevGroup.button.addEventListener('click', playPrevious);
    playPauseGroup.button.addEventListener('click', togglePlayPause);
    nextGroup.button.addEventListener('click', playNext);
    muteGroup.button.addEventListener('click', toggleMute);
    topGroup.button.addEventListener('click', scrollToTop);
}

function toggleFloatingMenu() {
    const floatingTagsContainer = document.getElementById('floating-tags-container');
    if (!floatingTagsContainer) return;
    
    // 如果浮动菜单没有内容，先生成内容
    if (floatingTagsContainer.children.length === 0) {
        generateFloatingMenuContent();
    }
    
    const menuToggleBtn = floatingPlayer.querySelector('.menu-toggle-btn');
    const menuToggleText = floatingPlayer.querySelector('.menu-toggle-btn + .btn-text');
    
    if (isFloatingMenuVisible) {
        floatingTagsContainer.style.transform = 'translateX(-100%)';
        floatingTagsContainer.style.opacity = '0';
        setTimeout(() => {
            floatingTagsContainer.style.display = 'none';
        }, 300);
        isFloatingMenuVisible = false;
        menuToggleBtn.classList.remove('active');
        menuToggleBtn.title = '显示浮动菜单';
        if (menuToggleText) menuToggleText.textContent = '分类';
    } else {
        floatingTagsContainer.style.display = 'block';
        setTimeout(() => {
            floatingTagsContainer.style.transform = 'translateX(0)';
            floatingTagsContainer.style.opacity = '1';
        }, 10);
        isFloatingMenuVisible = true;
        menuToggleBtn.classList.add('active');
        menuToggleBtn.title = '隐藏浮动菜单';
        if (menuToggleText) menuToggleText.textContent = '分类';
    }
}

function generateFloatingMenuContent() {
    const floatingTagsContainer = document.getElementById('floating-tags-container');
    if (!floatingTagsContainer) return;
    
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
    
    // 添加底部间距，防止被播放控制条遮挡
    const spacer = document.createElement('div');
    spacer.style.height = '100px';
    spacer.style.width = '100%';
    floatingTagsContainer.appendChild(spacer);
}

function toggleMute() {
    const muteBtn = floatingPlayer.querySelector('.mute-btn');
    const muteText = floatingPlayer.querySelector('.mute-btn + .btn-text');
    
    if (isMuted) {
        isMuted = false;
        muteBtn.innerHTML = '🔊';
        muteBtn.title = '静音';
        muteBtn.classList.remove('active');
        if (muteText) muteText.textContent = '静音';
    } else {
        isMuted = true;
        muteBtn.innerHTML = '🔇';
        muteBtn.title = '恢复';
        muteBtn.classList.add('active');
        if (muteText) muteText.textContent = '恢复';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function getVisibleItems() {
    const visibleItems = [];
    
    // 找到所有没有 display: none 的 category
    const allCategories = document.querySelectorAll('#content-container .category');
    
    allCategories.forEach(category => {
        // 只要不是 display: none，就认为是可见的（包括空字符串、block等）
        if (category.style.display !== 'none') {
            // 收集这个 category 里的所有 li
            const items = category.querySelectorAll('li');
            items.forEach(item => {
                // 只添加 display 不是 none 的 li
                if (item.style.display !== 'none') {
                    visibleItems.push(item);
                }
            });
        }
    });
    
    console.log(`获取可见项目: 找到${allCategories.length}个分类, 可见${visibleItems.length}个项目`);
    return visibleItems;
}

function showFloatingPlayer() {
    if (!floatingPlayer) createFloatingPlayer();
    floatingPlayer.classList.add('visible');
}

function hideFloatingPlayer() {
    if (floatingPlayer) {
        floatingPlayer.classList.remove('visible');
    }
}

function scrollToItem(item) {
    if (!item) return;
    
    const rect = item.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetScroll = scrollTop + rect.top - (window.innerHeight * 0.3);
    
    window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
}

function highlightItem(item) {
    document.querySelectorAll('li.playing-highlight').forEach(el => {
        el.classList.remove('playing-highlight');
    });
    
    if (item) {
        item.classList.add('playing-highlight');
    }
}

function updatePlayPauseButton() {
    if (!floatingPlayer) return;
    
    const playPauseBtn = floatingPlayer.querySelector('.play-pause-btn');
    const playPauseText = floatingPlayer.querySelector('.play-pause-btn + .btn-text');
    
    if (isPlaying) {
        playPauseBtn.innerHTML = '⏸';
        playPauseBtn.title = '暂停';
    } else {
        playPauseBtn.innerHTML = '▶';
        playPauseBtn.title = '播放';
    }
    
    // 显示阅读统计数据
    if (playPauseText) {
        const remainingCount = document.getElementById('remaining-count');
        const totalCount = document.getElementById('total-count');
        if (remainingCount && totalCount) {
            playPauseText.textContent = `${remainingCount.textContent}/${totalCount.textContent}`;
        }
    }
}

function playItem(index) {
    currentVisibleItems = getVisibleItems();
    
    if (index < 0 || index >= currentVisibleItems.length) {
        console.log('没有可播放的项目');
        return;
    }
    
    const item = currentVisibleItems[index];
    const text = item.getAttribute('data-original-text');
    
    if (!text) return;
    
    currentPlayingIndex = index;
    isPlaying = true;
    
    highlightItem(item);
    scrollToItem(item);
    showFloatingPlayer();
    updatePlayPauseButton();
    
    const readButton = item.querySelector('button');
    if (readButton && readButton.textContent === '朗读') {
        currentReadingButton = readButton;
        readButton.textContent = '停止';
    }
    
    readText(text, () => {
        if (isPlaying && currentPlayingIndex === index) {
            playNext();
        }
    }, readButton);
}

function togglePlayPause() {
    if (isPlaying) {
        // 暂停播放
        stopReading();
        isPlaying = false;
        updatePlayPauseButton();
        
        if (currentPlayingIndex >= 0 && currentPlayingIndex < currentVisibleItems.length) {
            const item = currentVisibleItems[currentPlayingIndex];
            const readButton = item.querySelector('button');
            if (readButton) {
                readButton.textContent = '朗读';
            }
        }
        currentReadingButton = null;
    } else {
        // 开始播放 - 总是重新获取当前可见列表
        currentVisibleItems = getVisibleItems();
        
        console.log(`开始播放: 当前可见列表有${currentVisibleItems.length}个项目`);
        
        if (currentVisibleItems.length === 0) {
            console.log('没有可播放的内容');
            return;
        }
        
        // 如果是第一次播放或播放完成后，从第一条开始
        if (currentPlayingIndex === -1 || currentPlayingIndex >= currentVisibleItems.length) {
            currentPlayingIndex = 0;
            console.log(`重置播放索引为0`);
        }
        
        console.log(`播放第${currentPlayingIndex + 1}条`);
        playItem(currentPlayingIndex);
    }
}

function playPrevious() {
    currentVisibleItems = getVisibleItems();
    
    if (currentVisibleItems.length === 0) return;
    
    let newIndex = currentPlayingIndex - 1;
    if (newIndex < 0) {
        newIndex = currentVisibleItems.length - 1;
    }
    
    stopReading();
    playItem(newIndex);
}

function playNext() {
    currentVisibleItems = getVisibleItems();
    
    if (currentVisibleItems.length === 0) return;
    
    let newIndex = currentPlayingIndex + 1;
    if (newIndex >= currentVisibleItems.length) {
        newIndex = 0;
    }
    
    stopReading();
    playItem(newIndex);
}

function syncPlayerFromCard(cardElement, cardIndex) {
    currentVisibleItems = getVisibleItems();
    currentPlayingIndex = cardIndex;
    isPlaying = true;
    
    highlightItem(cardElement);
    scrollToItem(cardElement);
    showFloatingPlayer();
    updatePlayPauseButton();
}

document.addEventListener('DOMContentLoaded', () => {
    createFloatingPlayer();
});
