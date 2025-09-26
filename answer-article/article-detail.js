// 文章详情页逻辑

// DOM元素
const articleTitle = document.getElementById('article-title');
const articleDate = document.getElementById('article-date');
const articleCategory = document.getElementById('article-category');
const articleViews = document.getElementById('article-views');
const articleLikes = document.getElementById('article-likes');
const articleQuestions = document.getElementById('article-questions');
const articleDetailContainer = document.querySelector('.article-detail-container');

// 创建思维导读容器
let articleGuideContainer = null;
function createGuideContainer() {
    if (!articleGuideContainer) {
        articleGuideContainer = document.createElement('div');
        articleGuideContainer.id = 'article-guide';
        articleGuideContainer.className = 'article-guide';
        
        // 插入到问题列表之前
        articleQuestions.parentNode.insertBefore(articleGuideContainer, articleQuestions);
    }
    return articleGuideContainer;
}

// 初始化函数
function init() {
    // 从URL中获取文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        // 如果没有文章ID，显示错误信息
        articleTitle.textContent = '文章不存在';
        articleQuestions.innerHTML = '<p style="color: #999;">抱歉，您访问的文章不存在或已被删除。</p>';
        return;
    }
    
    // 根据ID获取文章数据
    const article = getArticleById(articleId);
    
    if (!article) {
        // 如果没有找到文章，显示错误信息
        articleTitle.textContent = '文章不存在';
        articleQuestions.innerHTML = '<p style="color: #999;">抱歉，您访问的文章不存在或已被删除。</p>';
        return;
    }
    
    // 显示文章信息
    displayArticleInfo(article);
}

// 显示文章信息
function displayArticleInfo(article) {
    // 设置文章标题
    articleTitle.textContent = article.title;
    
    // 设置文章元数据
    articleDate.textContent = article.date;
    
    // 获取并设置分类信息
    const categoryInfo = getCategoryById(article.category);
    articleCategory.textContent = categoryInfo.name;
    
    // 设置浏览量和点赞数
    articleViews.textContent = `👁️ ${article.views}`;
    articleLikes.textContent = `❤️ ${article.likes}`;
    
    // 如果有思维导读数据，渲染思维导读
    if (article.guide && article.guide.nodes && article.guide.nodes.length > 0) {
        renderGuide(article.guide);
    }
    
    // 渲染问题列表
    renderQuestions(article.questions);
}

// 渲染思维导读
function renderGuide(guide) {
    const container = createGuideContainer();
    container.innerHTML = '';
    
    // 创建思维导读标题
    const guideTitle = document.createElement('h3');
    guideTitle.className = 'guide-title';
    guideTitle.textContent = guide.title || '思维导读';
    container.appendChild(guideTitle);
    
    // 创建思维导读内容
    const guideContent = document.createElement('div');
    guideContent.className = 'guide-content';
    
    // 渲染每个节点
    guide.nodes.forEach(node => {
        const nodeElement = renderGuideNode(node);
        guideContent.appendChild(nodeElement);
    });
    
    container.appendChild(guideContent);
}

// 渲染思维导读节点
function renderGuideNode(node) {
    const nodeElement = document.createElement('div');
    // 适配数据结构，使用默认值避免undefined
    nodeElement.className = `guide-node guide-node-${node.type || 'default'}`;
    nodeElement.setAttribute('data-node-id', node.id || '');
    
    // 创建节点标题
    const nodeTitle = document.createElement('div');
    nodeTitle.className = 'guide-node-title';
    
    // 如果是主要节点，添加展开/折叠按钮
    // 适配数据结构，同时检查children和nodes
    const hasChildren = (node.children && node.children.length > 0) || (node.nodes && node.nodes.length > 0);
    if (hasChildren) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'guide-toggle-btn';
        toggleBtn.textContent = '▼';
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const contentElement = nodeElement.querySelector('.guide-node-content');
            const childrenElement = nodeElement.querySelector('.guide-node-children');
            const isExpanded = contentElement.classList.contains('expanded');
            
            if (isExpanded) {
                toggleBtn.textContent = '▶';
                contentElement.classList.remove('expanded');
                if (childrenElement) {
                    childrenElement.classList.remove('expanded');
                }
            } else {
                toggleBtn.textContent = '▼';
                contentElement.classList.add('expanded');
                if (childrenElement) {
                    childrenElement.classList.add('expanded');
                }
            }
        });
        nodeTitle.appendChild(toggleBtn);
    }
    
    // 添加标题文本
    const titleText = document.createElement('span');
    titleText.className = 'guide-node-title-text';
    titleText.textContent = node.title || '';
    nodeTitle.appendChild(titleText);
    
    nodeElement.appendChild(nodeTitle);
    
    // 创建节点内容
    const nodeContent = document.createElement('div');
    nodeContent.className = 'guide-node-content';
    // 适配数据结构，使用空字符串代替undefined
    nodeContent.innerHTML = node.content || '';
    nodeElement.appendChild(nodeContent);
    
    // 如果有子节点，渲染子节点
    // 适配数据结构，优先使用nodes（我们实际的数据结构），其次使用children
    const childNodes = node.nodes || node.children || [];
    if (childNodes.length > 0) {
        const childrenElement = document.createElement('div');
        childrenElement.className = 'guide-node-children';
        
        childNodes.forEach(childNode => {
            const childElement = renderGuideNode(childNode);
            childrenElement.appendChild(childElement);
        });
        
        nodeElement.appendChild(childrenElement);
    }
    
    // 添加点击标题展开/折叠内容的功能
    nodeTitle.addEventListener('click', () => {
        const contentElement = nodeElement.querySelector('.guide-node-content');
        const childrenElement = nodeElement.querySelector('.guide-node-children');
        const isExpanded = contentElement.classList.contains('expanded');
        const toggleBtn = nodeElement.querySelector('.guide-toggle-btn');
        
        if (toggleBtn) {
            toggleBtn.textContent = isExpanded ? '▶' : '▼';
        }
        
        if (isExpanded) {
            contentElement.classList.remove('expanded');
            if (childrenElement) {
                childrenElement.classList.remove('expanded');
            }
        } else {
            contentElement.classList.add('expanded');
            if (childrenElement) {
                childrenElement.classList.add('expanded');
            }
        }
    });
    
    return nodeElement;
}

// 渲染问题列表
function renderQuestions(questions) {
    articleQuestions.innerHTML = '';
    
    questions.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.setAttribute('data-question-id', question.id);
        
        questionItem.innerHTML = `
            <div class="question-header">
                <span class="question-text">${index + 1}. ${question.question}</span>
                <div class="question-actions">
                    <button class="toggle-answer-btn">查看答案</button>
                    <button class="read-answer-btn">🔊 朗读答案</button>
                </div>
            </div>
            <div class="answer-content">
                ${question.answer}
            </div>
        `;
        
        articleQuestions.appendChild(questionItem);
        
        // 添加查看答案按钮的点击事件
        const toggleBtn = questionItem.querySelector('.toggle-answer-btn');
        const answerContent = questionItem.querySelector('.answer-content');
        const readBtn = questionItem.querySelector('.read-answer-btn');
        
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            
            if (answerContent.classList.contains('expanded')) {
                answerContent.classList.remove('expanded');
                toggleBtn.textContent = '查看答案';
            } else {
                answerContent.classList.add('expanded');
                toggleBtn.textContent = '收起答案';
            }
        });
        
        // 添加朗读答案按钮的点击事件
        readBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            
            // 检查当前是否正在朗读
            if (readBtn.classList.contains('reading')) {
                // 如果正在朗读，则停止朗读
                window.speechSynthesis.cancel();
                // 恢复按钮状态
                readBtn.classList.remove('reading');
                readBtn.textContent = '🔊 朗读答案';
            } else {
                // 如果没有在朗读，则开始朗读
                readAnswerText(question.answer, readBtn);
            }
        });
    });
}

// 朗读答案文本
function readAnswerText(text, readBtn) {
    // 停止任何正在进行的朗读
    window.speechSynthesis.cancel();
    
    // 更新按钮状态为正在朗读
    readBtn.classList.add('reading');
    readBtn.textContent = '🛑 停止朗读';
    
    // 移除HTML标签，只保留纯文本用于朗读
    const plainText = removeHtmlTags(text);
    
    // 创建语音合成实例
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = plainText;
    utterance.lang = 'zh-CN'; // 设置为中文
    utterance.volume = 1;     // 音量
    utterance.rate = 1;       // 语速
    utterance.pitch = 1;      // 音调
    
    // 添加事件监听器，在朗读结束后恢复按钮状态
    utterance.onend = function() {
        // 检查按钮是否存在且未被移除
        if (readBtn && document.body.contains(readBtn)) {
            readBtn.classList.remove('reading');
            readBtn.textContent = '🔊 朗读答案';
        }
    };
    
    // 开始朗读
    window.speechSynthesis.speak(utterance);
}

// 移除HTML标签，返回纯文本
function removeHtmlTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', init);