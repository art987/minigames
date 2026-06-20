// 闪喵小知识频道交互逻辑

// 存储每个卡片的数据
window.cardData = {};

// 存储已加载的script标签
window.loadedScripts = {};

// 存储自动滚动定时器
window.autoScrollTimers = {};

// 存储当前推荐数据
window.currentRecommendations = {};

// 存储展开状态
window.expandStates = {};

// 存储暂停状态
window.pauseStates = {};

// 存储当前显示索引
window.currentIndices = {};

document.addEventListener('DOMContentLoaded', function() {
  // 获取 DOM 元素
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const hotSearchesContainer = document.getElementById('hotSearches');
  const cardsContainer = document.getElementById('cardsContainer');
  const noResults = document.getElementById('noResults');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalTags = document.getElementById('modalTags');
  const hotSearchesWrapper = document.querySelector('.hot-searches-wrapper');
  const backToTopBtn = document.getElementById('backToTop');
  
  // 初始化页面
  initPage();
  
  function initPage() {
    // 渲染热搜词
    renderHotSearches();
    
    // 过滤掉 visible: false 的卡片
    const visibleCards = window.businessData.contentCards.filter(card => card.visible !== false);
    renderCards(visibleCards);
    
    // 设置搜索框占位符
    searchInput.placeholder = '搜索标题、简介、标签...';
  }
  
  // 渲染热搜词（循环滚动）
  function renderHotSearches() {
    const hotSearches = window.businessData.hotSearches;
    
    // 为了实现无缝滚动，复制一份热搜词
    const allTags = [...hotSearches, ...hotSearches];
    
    hotSearchesContainer.innerHTML = allTags.map(term => `
      <span class="tag" data-term="${term}">${term}</span>
    `).join('');
    
    // 为热搜词添加点击事件
    hotSearchesContainer.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('click', function() {
        const term = this.getAttribute('data-term');
        searchInput.value = term;
        clearBtn.classList.add('active');
        filterCards();
        searchInput.focus();
      });
    });
    
    // 为"全部"按钮添加点击事件（按钮已在 HTML 中）
    const viewAllBtn = document.getElementById('viewAllBtn');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', openModal);
    }
    
    // 鼠标悬停时暂停滚动
    if (hotSearchesWrapper) {
      hotSearchesWrapper.addEventListener('mouseenter', function() {
        hotSearchesContainer.classList.add('paused');
      });
      
      hotSearchesWrapper.addEventListener('mouseleave', function() {
        hotSearchesContainer.classList.remove('paused');
      });
    }
  }
  
  // 打开弹窗
  function openModal() {
    const allKeywords = window.businessData.hotSearches;
    
    modalTags.innerHTML = allKeywords.map(term => `
      <span class="tag" data-term="${term}">${term}</span>
    `).join('');
    
    // 为弹窗中的关键词添加点击事件
    modalTags.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('click', function() {
        const term = this.getAttribute('data-term');
        closeModal();
        searchInput.value = term;
        clearBtn.classList.add('active');
        filterCards();
        searchInput.focus();
      });
    });
    
    modalOverlay.classList.add('active');
  }
  
  // 关闭弹窗
  function closeModal() {
    modalOverlay.classList.remove('active');
  }
  
  // 关闭按钮事件
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // 点击遮罩层关闭
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
  
  // 渲染卡片
  function renderCards(cards) {
    if (cards.length === 0) {
      cardsContainer.style.display = 'none';
      noResults.style.display = 'block';
      return;
    }
    
    cardsContainer.style.display = 'block';
    noResults.style.display = 'none';
    
    const categories = window.businessData.categories;
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.id] = {
        ...cat,
        cards: []
      };
    });
    
    cards.forEach(card => {
      const catId = card.category || 'other';
      if (categoryMap[catId]) {
        categoryMap[catId].cards.push(card);
      }
    });
    
    let html = '';
    categories.forEach(cat => {
      const catData = categoryMap[cat.id];
      if (catData.cards.length > 0) {
        html += `
          <div class="category-section">
            <div class="category-header">
              <span class="category-icon">${cat.icon}</span>
              <h2 class="category-title">${cat.name}</h2>
            </div>
            <div class="cards-container">
              ${catData.cards.map(card => `
                <div class="card" data-link="${card.link}" data-id="${card.id}" onclick="handleCardClick('${card.link}')">
                  <div class="card-header">
                    <div class="card-icon" style="background-color: ${card.iconBg || '#f0f0f0'}${card.image ? `; background-image: url('${card.image}')` : ''}" ${card.image ? 'class="card-icon has-image"' : ''}>
                      ${!card.image ? card.icon : ''}
                    </div>
                    <div class="card-content">
                      <h3 class="card-title">${card.shortTitle || card.title}</h3>
                      <p class="card-subtitle">${card.subtitle || card.description || ''}</p>
                    </div>
                  </div>
                  ${card.showRecommend !== false ? `
                    <div class="card-recommend" id="recommend-${card.id}">
                      <div class="card-recommend-item active">
                        <span class="card-recommend-text">加载推荐内容...</span>
                      </div>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    });
    
    cardsContainer.innerHTML = html;
    
    // 加载每个卡片的推荐内容
    loadCardRecommendations(cards);
  }
  
  // 加载卡片推荐内容
  function loadCardRecommendations(cards) {
    cards.forEach(card => {
      if (card.showRecommend !== false) {
        loadRecommendForCard(card);
      }
    });
  }
  
  // 为单个卡片加载推荐内容
  function loadRecommendForCard(card) {
    const recommendContainer = document.getElementById(`recommend-${card.id}`);
    if (!recommendContainer) return;
    
    // 根据卡片链接加载对应的数据文件
    const dataFile = card.recommendData || getRecommendDataFile(card.link);
    
    if (dataFile) {
      console.log(`Loading data for card ${card.id} from ${dataFile}`);
      
      // 使用fetch加载JS文件内容
      fetch(dataFile)
        .then(response => {
          console.log(`Fetch response for card ${card.id}:`, response.status);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(jsContent => {
          console.log(`JS content loaded for card ${card.id}, length: ${jsContent.length}`);
          
          // 将const data替换为window.cardData[card.id]
          // 使用更灵活的正则表达式，匹配文件开头可能有空行的情况
          let modifiedContent = jsContent.replace(/^(?:\s*\n)*const data = /, `window.cardData['${card.id}'] = `);
          
          // 替换所有的data.引用为window.cardData[card.id].
          modifiedContent = modifiedContent.replace(/data\./g, `window.cardData['${card.id}'].`);
          
          console.log(`Modified content for card ${card.id}:`, modifiedContent.substring(0, 100));
          
          // 执行修改后的代码
          try {
            eval(modifiedContent);
            
            console.log(`Data loaded for card ${card.id}:`, window.cardData[card.id]);
            
            // 从加载的数据中提取推荐内容
            const recommendations = extractRecommendFromData(card.id);
            console.log(`Recommendations for card ${card.id}:`, recommendations.length);
            
            if (recommendations.length > 0) {
              renderCardRecommend(recommendContainer, recommendations, card.id);
              startCardAutoScroll(recommendations, card.id);
            } else {
              recommendContainer.innerHTML = `
                <div class="card-recommend-item active">
                  <span class="card-recommend-text">暂无推荐内容</span>
                </div>
              `;
            }
          } catch (error) {
            console.error(`Error evaluating data for card ${card.id}:`, error);
            recommendContainer.innerHTML = `
              <div class="card-recommend-item active">
                <span class="card-recommend-text">暂无推荐内容</span>
              </div>
            `;
          }
        })
        .catch(error => {
          console.error(`Error fetching data file for card ${card.id}:`, error);
          recommendContainer.innerHTML = `
            <div class="card-recommend-item active">
              <span class="card-recommend-text">暂无推荐内容</span>
            </div>
          `;
        });
    } else {
      console.log(`No data file for card ${card.id}`);
      recommendContainer.innerHTML = `
        <div class="card-recommend-item active">
          <span class="card-recommend-text">暂无推荐内容</span>
        </div>
      `;
    }
  }
  
  // 根据卡片链接获取推荐数据文件
  function getRecommendDataFile(link) {
    const linkMap = {
      'edu/biaoyang.html': 'edu/data-biaoyang.js',
      'edu/tuweiqinghua.html': 'edu/data-tuweiqinghua.js',
      'edu/shici.html': 'edu/data-shici.js',
      'edu/yingyukouyu.html': 'edu/data-yingyukouyu.js',
      'edu/800sentences.html': 'edu/data-800sentences.js',
      'edu/guliziji.html': 'edu/data-guliziji.js',
      'edu/tuoyanzheng.html': 'edu/data-tuoyanzheng.js',
      'edu/zhenyan.html': 'edu/data-zhenyan.js',
      'edu/xinlixiaoying.html': 'edu/data-xinlixiaoying.js',
      'edu/renxingyinan.html': 'edu/data-renxingyinan.js',
      'edu/maxingziji.html': 'edu/data-maxingziji.js',
      'edu/ertonganquan.html': 'edu/data-ertonganquan.js',
      'edu/zhongyao.html': 'edu/data-zhongyao.js',
      'edu/xiyao.html': 'edu/data-xiyao.js',
      'edu/zhongyizhenduan.html': 'edu/data-zhongyizhenduan.js',
      'edu/xiyizhenduan.html': 'edu/data-xiyizhenduan.js',
      'edu/zhongyipianfang.html': 'edu/data-zhongyipianfang.js',
      'edu/yangsheng.html': 'edu/data-yangsheng.js',
      'edu/jiajufengshui.html': 'edu/data-jiajufengshui.js',
      'edu/dianpufengshui.html': 'edu/data-dianpufengshui.js',
      'edu/cnart.html': 'edu/data-cnart.js',
      'edu/guohuakoujue.html': 'edu/data-guohuakoujue.js',
      'edu/huajia-huiji.html': 'edu/data-huajia-huiji.js',
      'edu/yijing-fangfalun.html': 'edu/data-yijing-fangfalun.js',
      'edu/maoxuan-fangfalun.html': 'edu/data-maoxuan-fangfalun.js',
      'edu/zizhitongjian-fangfalun.html': 'edu/data-zizhitongjian-fangfalun.js',
      'edu/shenqi-24-lessons.html': 'edu/data-shenqi-24-lessons.js',
      'edu/naojinjizhuanwan.html': 'edu/data-naojinjizhuanwan.js',
      'edu/wangzhidaohang.html': 'edu/data-wangzhidaohang.js'
    };
    return linkMap[link] || null;
  }
  
  // 从data对象中提取推荐内容
  function extractRecommendFromData(cardId) {
    const recommendations = [];
    
    // 从cardData中读取对应卡片的数据
    const cardData = window.cardData[cardId];
    if (cardData && cardData.content) {
      const categories = cardData.content;
      
      // 从每个类别中随机选择一条
      for (const category in categories) {
        if (categories.hasOwnProperty(category)) {
          const items = categories[category];
          if (items && items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            recommendations.push(items[randomIndex]);
          }
        }
      }
      
      // 如果超过10条，随机选择10条
      if (recommendations.length > 10) {
        const shuffled = recommendations.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
      }
    }
    
    return recommendations;
  }
  
  // 渲染卡片推荐内容
  function renderCardRecommend(container, data, cardId) {
    if (data.length === 0) {
      container.innerHTML = `
        <div class="card-recommend-item active">
          <span class="card-recommend-text">暂无推荐内容</span>
        </div>
      `;
      return;
    }
    
    // 获取卡片链接
    const card = window.businessData.contentCards.find(c => c.id === cardId);
    const cardLink = card ? card.link : '';
    
    // 创建滚动显示区域（默认状态）
    const scrollContainer = `
      <div class="card-recommend-scroll" id="scroll-${cardId}" onclick="event.stopPropagation()">
        <div class="card-recommend-item active" onclick="event.stopPropagation(); copyContent(this)">
          <span class="card-recommend-text">${data[0]}</span>
        </div>
      </div>
    `;
    
    // 创建展开显示区域（隐藏状态）
    let expandContainer = `<div class="card-recommend-expand" id="expand-${cardId}" style="display: none;" onclick="event.stopPropagation()">`;
    data.forEach((item, index) => {
      expandContainer += `
        <div class="card-recommend-expand-item" onclick="event.stopPropagation(); copyContent(this)">
          <span class="card-recommend-expand-number">${index + 1}</span>
          <span class="card-recommend-expand-text">${item}</span>
        </div>
      `;
    });
    expandContainer += '</div>';
    
    // 创建按钮容器
    const buttonsContainer = `
      <div class="card-recommend-buttons" id="buttons-${cardId}" onclick="event.stopPropagation()">
        <div class="card-recommend-controls" id="controls-${cardId}">
          <button class="card-recommend-btn control-btn prev-btn" onclick="event.stopPropagation(); prevRecommend(${cardId})">←</button>
          <button class="card-recommend-btn control-btn pause-btn" id="pause-${cardId}" onclick="event.stopPropagation(); togglePause(${cardId})">⏵</button>
          <button class="card-recommend-btn control-btn next-btn" onclick="event.stopPropagation(); nextRecommend(${cardId})">→</button>
        </div>
        <button class="card-recommend-btn enter-btn" onclick="event.stopPropagation(); enterSite('${cardLink}')" style="display: none;">进入网站</button>
        <button class="card-recommend-btn refresh-btn" onclick="event.stopPropagation(); refreshRecommend(${cardId})" style="display: none;">换一批</button>
        <button class="card-recommend-btn show-all-btn" onclick="event.stopPropagation(); toggleExpand(${cardId})">显示所有</button>
      </div>
    `;
    
    container.innerHTML = scrollContainer + expandContainer + buttonsContainer;
    
    // 预加载所有数据到滚动区域（隐藏）
    const scrollDiv = document.getElementById(`scroll-${cardId}`);
    data.forEach((item, index) => {
      if (index > 0) {
        const div = document.createElement('div');
        div.className = 'card-recommend-item';
        div.setAttribute('onclick', `event.stopPropagation(); copyContent(this)`);
        div.innerHTML = `<span class="card-recommend-text">${item}</span>`;
        scrollDiv.appendChild(div);
      }
    });
    
    // 存储当前推荐数据
    window.currentRecommendations[cardId] = data;
  }
  
  // 启动卡片自动滚动
  function startCardAutoScroll(data, cardId) {
    if (data.length <= 1) return;
    
    const scrollContainer = document.getElementById(`scroll-${cardId}`);
    if (!scrollContainer) return;
    
    // 初始化当前索引和暂停状态（默认暂停）
    window.currentIndices[cardId] = 0;
    window.pauseStates[cardId] = true;
    
    const items = scrollContainer.querySelectorAll('.card-recommend-item');
    
    // 存储定时器ID，以便后续清除
    window.autoScrollTimers[cardId] = setInterval(() => {
      // 如果暂停了，不执行滚动
      if (window.pauseStates[cardId]) return;
      
      // 移除当前active
      const currentIndex = window.currentIndices[cardId];
      items[currentIndex].classList.remove('active');
      
      // 计算下一个索引
      const nextIndex = (currentIndex + 1) % data.length;
      window.currentIndices[cardId] = nextIndex;
      
      // 添加active到下一个
      items[nextIndex].classList.add('active');
    }, 5000);
  }
  
  // 搜索框输入事件
  searchInput.addEventListener('input', function() {
    if (this.value.trim()) {
      clearBtn.classList.add('active');
    } else {
      clearBtn.classList.remove('active');
    }
    filterCards();
  });
  
  // 清空按钮点击事件
  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    clearBtn.classList.remove('active');
    filterCards();
    searchInput.focus();
  });
  
  // 筛选卡片
  function filterCards() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // 先过滤掉 visible: false 的卡片
    const visibleCards = window.businessData.contentCards.filter(card => card.visible !== false);
    
    if (!searchTerm) {
      renderCards(visibleCards);
      return;
    }
    
    const filteredCards = visibleCards.filter(card => {
      // 搜索标题
      if (card.title.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // 搜索副标题或简介
      if ((card.subtitle || card.description || '').toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // 搜索标签
      if (card.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
        return true;
      }
      
      // 搜索分类
      if (card.category && card.category.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      return false;
    });
    
    renderCards(filteredCards);
  }
  
  // 卡片点击处理
  window.handleCardClick = function(link) {
    window.location.href = link;
  };
  
  // 键盘事件 - 回车搜索
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      this.blur(); // 失去焦点，隐藏键盘
    }
  });
  
  // 返回顶部功能
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  }
  
  window.addEventListener('scroll', toggleBackToTop);
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 展开/收起推荐内容
  window.toggleExpand = function(cardId) {
    const scrollContainer = document.getElementById(`scroll-${cardId}`);
    const expandContainer = document.getElementById(`expand-${cardId}`);
    const buttonsContainer = document.getElementById(`buttons-${cardId}`);
    const controlsContainer = document.getElementById(`controls-${cardId}`);
    const showAllBtn = buttonsContainer.querySelector('.show-all-btn');
    const refreshBtn = buttonsContainer.querySelector('.refresh-btn');
    const enterBtn = buttonsContainer.querySelector('.enter-btn');
    
    // 切换展开状态
    const isExpanded = window.expandStates[cardId] || false;
    
    if (isExpanded) {
      // 收起状态
      scrollContainer.style.display = 'block';
      expandContainer.style.display = 'none';
      controlsContainer.style.display = 'flex';
      showAllBtn.textContent = '显示所有';
      refreshBtn.style.display = 'none';
      enterBtn.style.display = 'none';
      window.expandStates[cardId] = false;
      
      // 恢复自动滚动
      if (window.currentRecommendations[cardId] && window.currentRecommendations[cardId].length > 1) {
        startCardAutoScroll(window.currentRecommendations[cardId], cardId);
      }
    } else {
      // 展开状态
      scrollContainer.style.display = 'none';
      expandContainer.style.display = 'block';
      controlsContainer.style.display = 'none';
      showAllBtn.textContent = '收起';
      refreshBtn.style.display = 'inline-block';
      enterBtn.style.display = 'inline-block';
      window.expandStates[cardId] = true;
      
      // 停止自动滚动
      if (window.autoScrollTimers[cardId]) {
        clearInterval(window.autoScrollTimers[cardId]);
        delete window.autoScrollTimers[cardId];
      }
    }
  };
  
  // 换一批推荐内容
  window.refreshRecommend = function(cardId) {
    const expandContainer = document.getElementById(`expand-${cardId}`);
    
    // 从卡片数据中重新提取推荐内容
    const recommendations = extractRecommendFromData(cardId);
    
    if (recommendations.length > 0) {
      // 更新展开区域的显示内容
      let expandHTML = '';
      recommendations.forEach((item, index) => {
        expandHTML += `
          <div class="card-recommend-expand-item">
            <span class="card-recommend-expand-number">${index + 1}</span>
            <span class="card-recommend-expand-text">${item}</span>
          </div>
        `;
      });
      expandContainer.innerHTML = expandHTML;
      
      // 更新当前推荐数据
      window.currentRecommendations[cardId] = recommendations;
    }
  };
  
  // 进入网站
  window.enterSite = function(link) {
    if (link) {
      window.location.href = link;
    }
  };
  
  // 上一条推荐内容
  window.prevRecommend = function(cardId) {
    const scrollContainer = document.getElementById(`scroll-${cardId}`);
    if (!scrollContainer) return;
    
    const items = scrollContainer.querySelectorAll('.card-recommend-item');
    const currentIndex = window.currentIndices[cardId] || 0;
    const dataLength = window.currentRecommendations[cardId] ? window.currentRecommendations[cardId].length : 1;
    
    // 移除当前active
    items[currentIndex].classList.remove('active');
    
    // 计算上一个索引
    const prevIndex = (currentIndex - 1 + dataLength) % dataLength;
    window.currentIndices[cardId] = prevIndex;
    
    // 添加active到上一个
    items[prevIndex].classList.add('active');
  };
  
  // 暂停/播放推荐内容
  window.togglePause = function(cardId) {
    const pauseBtn = document.getElementById(`pause-${cardId}`);
    const isPaused = window.pauseStates[cardId] || false;
    
    if (isPaused) {
      // 恢复播放
      window.pauseStates[cardId] = false;
      pauseBtn.textContent = '⏸';
    } else {
      // 暂停
      window.pauseStates[cardId] = true;
      pauseBtn.textContent = '⏵';
    }
  };
  
  // 下一条推荐内容
  window.nextRecommend = function(cardId) {
    const scrollContainer = document.getElementById(`scroll-${cardId}`);
    if (!scrollContainer) return;
    
    const items = scrollContainer.querySelectorAll('.card-recommend-item');
    const currentIndex = window.currentIndices[cardId] || 0;
    const dataLength = window.currentRecommendations[cardId] ? window.currentRecommendations[cardId].length : 1;
    
    // 移除当前active
    items[currentIndex].classList.remove('active');
    
    // 计算下一个索引
    const nextIndex = (currentIndex + 1) % dataLength;
    window.currentIndices[cardId] = nextIndex;
    
    // 添加active到下一个
    items[nextIndex].classList.add('active');
  };
  
  // 复制内容到剪贴板
  window.copyContent = function(element) {
    // 获取文本内容
    const textElement = element.querySelector('.card-recommend-text, .card-recommend-expand-text');
    if (!textElement) return;
    
    // 提取纯文本内容（去除HTML标签）
    let text = textElement.innerHTML;
    
    // 移除HTML标签，提取纯文本
    text = text.replace(/<[^>]*>/g, '');
    
    // 复制到剪贴板
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // 使用现代 Clipboard API
      navigator.clipboard.writeText(text).then(() => {
        showCopySuccess(element);
      }).catch(err => {
        // 如果Clipboard API失败，使用fallback方法
        fallbackCopy(text, element);
      });
    } else {
      // 使用fallback方法
      fallbackCopy(text, element);
    }
  };
  
  // Fallback复制方法（兼容旧浏览器）
  function fallbackCopy(text, element) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showCopySuccess(element);
    } catch (err) {
      console.error('复制失败:', err);
    }
    
    document.body.removeChild(textarea);
  }
  
  // 显示复制成功提示
  function showCopySuccess(element) {
    // 添加复制成功样式
    element.classList.add('copy-success');
    
    // 2秒后移除样式
    setTimeout(() => {
      element.classList.remove('copy-success');
    }, 2000);
  }
});
