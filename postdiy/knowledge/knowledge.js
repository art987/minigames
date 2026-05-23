// 闪喵小知识频道交互逻辑

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
    
    // 渲染所有卡片
    renderCards(window.businessData.contentCards);
    
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
    
    cardsContainer.style.display = 'flex';
    noResults.style.display = 'none';
    
    cardsContainer.innerHTML = cards.map(card => `
      <div class="card" data-link="${card.link}" onclick="handleCardClick('${card.link}')">
        <img src="${card.image}" alt="${card.title}" class="card-image" onerror="this.src='https://via.placeholder.com/400x200/CCCCCC/666666?text=暂无图片'">
        <div class="card-content">
          <h3 class="card-title">${card.title}</h3>
          <p class="card-description">${card.description}</p>
          <div class="card-tags">
            ${card.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
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
    
    if (!searchTerm) {
      renderCards(window.businessData.contentCards);
      return;
    }
    
    const filteredCards = window.businessData.contentCards.filter(card => {
      // 搜索标题
      if (card.title.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // 搜索简介
      if (card.description.toLowerCase().includes(searchTerm)) {
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
});
