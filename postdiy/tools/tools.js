// 闪喵工具箱频道交互逻辑

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
    
    // 渲染所有工具卡片
    renderCards(window.toolsData.toolCards);
    
    // 设置搜索框占位符
    searchInput.placeholder = '搜索工具...';
  }
  
  // 渲染热搜词（循环滚动）
  function renderHotSearches() {
    const hotSearches = window.toolsData.hotSearches;
    
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
    const allKeywords = window.toolsData.hotSearches;
    
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
      <div class="card" data-link="${card.link}" onclick="handleCardClick('${card.link}', ${card.external ? 'true' : 'false'})">
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
      renderCards(window.toolsData.toolCards);
      return;
    }
    
    const filteredCards = window.toolsData.toolCards.filter(card => {
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
  window.handleCardClick = function(link, isExternal) {
    if (isExternal) {
      showExternalModal(link);
    } else {
      window.location.href = link;
    }
  };
  
  // 显示外部链接弹窗
  function showExternalModal(url) {
    let modal = document.getElementById('externalModal');
    if (!modal) {
      const modalHtml = `
        <div class="modal-overlay" id="externalModal">
          <div class="external-modal-box">
            <button class="modal-close-btn" onclick="closeExternalModal()">
              <i class="fa fa-times"></i>
            </button>
            <p class="external-modal-text">第三方工具推荐，<br>请复制网址后在手机浏览器打开。</p>
            <button class="external-copy-btn" id="externalCopyBtn" onclick="copyExternalUrl()">
              <i class="fa fa-copy"></i>
              <span id="externalCopyText">复制网址</span>
            </button>
          </div>
        </div>
        <div class="external-toast" id="externalToast">
          <span id="externalToastText">已复制，请打开浏览器 粘贴访问。</span>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      modal = document.getElementById('externalModal');
    }
    
    window.currentExternalUrl = url;
    modal.classList.remove('hidden');
    
    const btn = document.getElementById('externalCopyBtn');
    const btnText = document.getElementById('externalCopyText');
    if (btn) {
      btn.classList.remove('copied');
      btnText.textContent = '复制网址';
    }
  }
  
  // 关闭外部链接弹窗
  window.closeExternalModal = function() {
    const modal = document.getElementById('externalModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };
  
  // 复制外部网址
  window.copyExternalUrl = function() {
    const url = window.currentExternalUrl;
    const btn = document.getElementById('externalCopyBtn');
    const btnText = document.getElementById('externalCopyText');
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showToast();
      }).catch(() => {
        fallbackCopy(url);
      });
    } else {
      fallbackCopy(url);
    }
  };
  
  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast();
    } catch (err) {
      alert('复制失败，请手动复制网址：' + text);
    }
    document.body.removeChild(textarea);
  }
  
  function showToast() {
    const btn = document.getElementById('externalCopyBtn');
    const btnText = document.getElementById('externalCopyText');
    btn.classList.add('copied');
    btnText.textContent = '已复制';
    
    setTimeout(() => {
      closeExternalModal();
    }, 100);
    
    const toast = document.getElementById('externalToast');
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
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
