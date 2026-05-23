// 闪喵工具箱频道交互逻辑

document.addEventListener('DOMContentLoaded', function() {
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
  
  initPage();
  
  function initPage() {
    renderHotSearches();
    renderCards(window.toolsData.toolCards);
    searchInput.placeholder = '搜索工具...';
  }
  
  function renderHotSearches() {
    const hotSearches = window.toolsData.hotSearches;
    const allTags = [...hotSearches, ...hotSearches];
    
    hotSearchesContainer.innerHTML = allTags.map(term => `
      <span class="tag" data-term="${term}">${term}</span>
    `).join('');
    
    hotSearchesContainer.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('click', function() {
        const term = this.getAttribute('data-term');
        searchInput.value = term;
        clearBtn.classList.add('active');
        filterCards();
        searchInput.focus();
      });
    });
    
    const viewAllBtn = document.getElementById('viewAllBtn');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', openModal);
    }
    
    if (hotSearchesWrapper) {
      hotSearchesWrapper.addEventListener('mouseenter', function() {
        hotSearchesContainer.classList.add('paused');
      });
      
      hotSearchesWrapper.addEventListener('mouseleave', function() {
        hotSearchesContainer.classList.remove('paused');
      });
    }
  }
  
  function openModal() {
    const allKeywords = window.toolsData.hotSearches;
    
    modalTags.innerHTML = allKeywords.map(term => `
      <span class="tag" data-term="${term}">${term}</span>
    `).join('');
    
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
  
  function closeModal() {
    modalOverlay.classList.remove('active');
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
  
  function renderCards(cards) {
    if (cards.length === 0) {
      cardsContainer.style.display = 'none';
      noResults.style.display = 'block';
      return;
    }
    
    cardsContainer.style.display = 'block';
    noResults.style.display = 'none';
    
    const categories = window.toolsData.categories;
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
                <div class="card" data-link="${card.link}" onclick="handleCardClick('${card.link}', ${card.external ? 'true' : 'false'})">
                  <div class="card-icon" style="background-color: ${card.iconBg || '#f0f0f0'}${card.image ? `; background-image: url('${card.image}')` : ''}" ${card.image ? 'class="card-icon has-image"' : ''}>
                    ${!card.image ? card.icon : ''}
                  </div>
                  <div class="card-content">
                    <h3 class="card-title">${card.shortTitle || card.title}</h3>
                    <p class="card-subtitle">${card.subtitle || card.description || ''}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    });
    
    cardsContainer.innerHTML = html;
  }
  
  searchInput.addEventListener('input', function() {
    if (this.value.trim()) {
      clearBtn.classList.add('active');
    } else {
      clearBtn.classList.remove('active');
    }
    filterCards();
  });
  
  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    clearBtn.classList.remove('active');
    filterCards();
    searchInput.focus();
  });
  
  function filterCards() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
      renderCards(window.toolsData.toolCards);
      return;
    }
    
    const filteredCards = window.toolsData.toolCards.filter(card => {
      if (card.title.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      if ((card.subtitle || card.description || '').toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      if (card.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
        return true;
      }
      
      if (card.category && card.category.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      return false;
    });
    
    renderCards(filteredCards);
  }
  
  window.handleCardClick = function(link, isExternal) {
    if (isExternal) {
      showExternalModal(link);
    } else {
      window.location.href = link;
    }
  };
  
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
  
  window.closeExternalModal = function() {
    const modal = document.getElementById('externalModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };
  
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
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      this.blur();
    }
  });
  
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
