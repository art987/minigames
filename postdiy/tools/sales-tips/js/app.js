// 主应用逻辑

// 全局变量
let favorites = JSON.parse(localStorage.getItem('salesFavorites') || '[]');
let recentSearches = JSON.parse(localStorage.getItem('salesRecentSearches') || '[]');
let editedScripts = JSON.parse(localStorage.getItem('salesEditedScripts') || '{}');

// 热门搜索标签
const hotSearchTags = [
  '太贵了', '考虑一下', '我再看看', '没预算', '以后再说',
  '不需要', '别人更便宜', '我问问家人', '靠谱吗', '真的有效吗'
];

// 分类图标
const categoryIcons = {
  '价格异议': '💰',
  '观望犹豫': '🤔',
  '信任问题': '❓',
  '竞品比较': '🔍',
  '拖延购买': '⏰',
  '需求不足': '✖️',
  '家人决策': '👨‍👩‍👧',
  '促成交': '🎉',
  '售后维护': '📦',
  '场面话': '💬'
};

// 获取第一条回复用于预览
function getFirstReply(script) {
  if (script.wechatReplies && script.wechatReplies.length > 0) {
    return script.wechatReplies[0];
  }
  return script.wechatReply || '';
}

// 获取所有回复
function getAllReplies(script) {
  if (script.wechatReplies && script.wechatReplies.length > 0) {
    return script.wechatReplies;
  }
  return script.wechatReply ? [script.wechatReply] : [];
}

// 初始化应用
function init() {
  renderHomePage();
  bindEvents();
}

// 绑定事件
function bindEvents() {
  // 搜索按钮
  document.getElementById('searchBtn').addEventListener('click', handleSearch);
  document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  document.getElementById('searchInput').addEventListener('input', debounce(handleRealTimeSearch, 300));
  
  // 清空按钮
  document.getElementById('searchInput').addEventListener('input', toggleClearBtn);
  document.getElementById('clearBtn').addEventListener('click', clearSearch);
  
  // 返回按钮
  document.getElementById('backBtn').addEventListener('click', renderHomePage);
  
  // 模态框
  document.getElementById('closeModal').addEventListener('click', closeModal);
  
  // 点击模态框外部关闭
  document.getElementById('editModal').addEventListener('click', (e) => {
    if (e.target.id === 'editModal') {
      closeModal();
    }
  });
}

// 切换清空按钮显示
function toggleClearBtn() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  clearBtn.style.display = input.value ? 'flex' : 'none';
}

// 清空搜索
function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('clearBtn').style.display = 'none';
  renderHomePage();
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 处理搜索
function handleSearch() {
  const query = document.getElementById('searchInput').value;
  if (query.trim()) {
    // 添加到最近搜索
    addToRecentSearches(query);
    // 显示搜索结果
    const results = searchScripts(query);
    renderSearchResults(results, `搜索: ${query}`);
  }
}

// 实时搜索
function handleRealTimeSearch() {
  const query = document.getElementById('searchInput').value;
  if (query.trim() && query.length >= 2) {
    const results = searchScripts(query);
    if (results.length > 0) {
      renderSearchResults(results, `搜索: ${query}`);
    }
  } else if (!query.trim()) {
    renderHomePage();
  }
}

// 渲染首页
function renderHomePage() {
  document.getElementById('homePage').style.display = 'block';
  document.getElementById('searchResultsPage').style.display = 'none';
  document.getElementById('searchInput').value = '';
  
  renderHotTags();
  renderCategoryCards();
  renderFavorites();
  renderRecentSearches();
}

// 渲染热门搜索标签 - 无限循环滚动
function renderHotTags() {
  const container = document.getElementById('hotTags');
  // 复制两份实现无限循环
  const tags = [...hotSearchTags, ...hotSearchTags];
  container.innerHTML = tags.map(tag => 
    `<div class="tag" onclick="searchByTag('${escapeHtml(tag)}')">${escapeHtml(tag)}</div>`
  ).join('');
}

// 按标签搜索
function searchByTag(tag) {
  document.getElementById('searchInput').value = tag;
  addToRecentSearches(tag);
  const results = searchScripts(tag);
  renderSearchResults(results, `搜索: ${tag}`);
}

// 渲染分类卡片 - 按 category 显示
function renderCategoryCards() {
  const container = document.getElementById('psychologyCards');
  
  // 获取所有分类
  const categories = [...new Set(scripts.map(s => s.category))];
  
  container.innerHTML = categories.map(category => {
    // 统计该分类的话术数量
    const count = scripts.filter(s => s.category === category).length;
    return `<div class="psych-card" onclick="searchByCategory('${escapeHtml(category)}')">
      <div class="psych-icon">${categoryIcons[category] || '📂'}</div>
      <div class="psych-name">${escapeHtml(category)} (${count}条)</div>
    </div>`;
  }).join('');
}

// 按分类搜索
function searchByCategory(category) {
  const results = scripts.filter(script => script.category === category);
  renderSearchResults(results, category);
}

// 渲染最近搜索 - 支持删除
function renderRecentSearches() {
  const container = document.getElementById('recentList');
  const section = document.getElementById('recentSection');
  
  if (recentSearches.length === 0) {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  
  container.innerHTML = recentSearches.slice(0, 10).map((search, index) => {
    // 根据搜索关键词找到对应的话术
    const results = searchScripts(search);
    const firstScript = results[0];
    
    if (!firstScript) {
      return `<div class="question-item">
        <div class="question-text" onclick="searchByTag('${escapeHtml(search)}')">${escapeHtml(search)}</div>
        <button class="delete-btn" onclick="deleteRecentSearch(${index}, event)">✕</button>
      </div>`;
    }
    
    const replies = getAllReplies(firstScript);
    const totalReplies = replies.length;
    const previewReplies = replies.slice(0, 3);
    
    return `<div class="question-item" onclick="showDetail(${firstScript.id})">
      <div class="question-text">
        ${escapeHtml(firstScript.customer || firstScript.title)}
        ${totalReplies > 1 ? `<span style="color: #888; font-size: 12px; margin-left: 8px;">(${totalReplies}条)</span>` : ''}
      </div>
      ${previewReplies.map(reply => `
        <div class="wechat-preview" style="margin-top: 4px;">${escapeHtml(reply)}</div>
      `).join('')}
      <button class="delete-btn" onclick="deleteRecentSearch(${index}, event)">✕</button>
    </div>`;
  }).join('');
}

// 删除单个最近搜索
function deleteRecentSearch(index, event) {
  event.stopPropagation();
  recentSearches.splice(index, 1);
  localStorage.setItem('salesRecentSearches', JSON.stringify(recentSearches));
  renderRecentSearches();
}

// 渲染收藏
function renderFavorites() {
  const container = document.getElementById('favoritesList');
  const section = document.getElementById('favoritesSection');
  
  if (favorites.length === 0) {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  const favoriteScripts = scripts.filter(s => favorites.includes(s.id));
  
  container.innerHTML = favoriteScripts.map(script => {
    const replies = getAllReplies(script);
    const totalReplies = replies.length;
    const previewReplies = replies.slice(0, 3);
    
    return `<div class="question-item" onclick="showDetail(${script.id})">
      <div class="question-text">
        ${escapeHtml(script.customer || script.title)}
        ${totalReplies > 1 ? `<span style="color: #888; font-size: 12px; margin-left: 8px;">(${totalReplies}条)</span>` : ''}
      </div>
      ${previewReplies.map(reply => `
        <div class="wechat-preview" style="margin-top: 4px;">${escapeHtml(reply)}</div>
      `).join('')}
    </div>`;
  }).join('');
}

// 渲染搜索结果 - 简洁列表
function renderSearchResults(results, title) {
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('searchResultsPage').style.display = 'block';
  document.getElementById('resultsTitle').textContent = title;
  
  const container = document.getElementById('resultsList');
  
  if (results.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>没有找到相关话术</p>
        <p>试试其他关键词吧</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = results.map(script => {
    const replies = getAllReplies(script);
    const totalReplies = replies.length;
    const previewReplies = replies.slice(0, 3);
    
    return `<div class="question-item" onclick="showDetail(${script.id})">
      <div class="question-text">
        ${escapeHtml(script.customer || script.title)}
        ${totalReplies > 1 ? `<span style="color: #888; font-size: 12px; margin-left: 8px;">(${totalReplies}条)</span>` : ''}
      </div>
      ${previewReplies.map(reply => `
        <div class="wechat-preview" style="margin-top: 4px;">${escapeHtml(reply)}</div>
      `).join('')}
    </div>`;
  }).join('');
}

// 显示详情弹窗
function showDetail(id) {
  const script = scripts.find(s => s.id === id);
  if (!script) return;
  
  const replies = getAllReplies(script);
  const isFavorite = favorites.includes(id);
  
  const modal = document.getElementById('editModal');
  const modalContent = modal.querySelector('.modal-content');
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <h3>${escapeHtml(script.customer || script.title)}</h3>
      <button class="close-modal" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      <div class="detail-section" style="flex-direction: column; align-items: stretch;">
        ${replies.map((reply, index) => `
          <div class="reply-item" style="background: #e8f5e9; margin-bottom: 8px;">
            <div class="reply-actions">
              <button class="reply-btn" onclick="copySingleReply(${id}, ${index})">复制</button>
              <button class="reply-btn" onclick="editSingleReply(${id}, ${index})">编辑</button>
            </div>
            ${escapeHtml(reply)}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  modal.classList.add('active');
}

// 关闭弹窗
function closeModal() {
  document.getElementById('editModal').classList.remove('active');
}

// 复制编辑后的文本
function copyEditedText() {
  const text = document.getElementById('editText').value;
  copyToClipboard(text);
  showToast('已复制！');
}

// 复制单条回复
function copySingleReply(id, index) {
  const script = scripts.find(s => s.id === id);
  if (!script) return;
  
  const replies = getAllReplies(script);
  const reply = replies[index] || '';
  
  copyToClipboard(reply);
  showToast('已复制！');
}

// 编辑单条回复
function editSingleReply(id, index) {
  const script = scripts.find(s => s.id === id);
  if (!script) return;
  
  const replies = getAllReplies(script);
  const reply = replies[index] || '';
  
  const modal = document.getElementById('editModal');
  const modalContent = modal.querySelector('.modal-content');
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <h3>编辑话术</h3>
      <button class="close-modal" onclick="showDetail(${id})">×</button>
    </div>
    <div class="modal-body">
      <textarea id="editText" style="width: 100%; min-height: 200px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; line-height: 1.6; resize: vertical; font-family: inherit;">${escapeHtml(reply)}</textarea>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="copyEditedText()">📋 复制</button>
    </div>
  `;
}

// 复制微信话术（保持向后兼容）
function copyWechat(id) {
  const script = scripts.find(s => s.id === id);
  if (!script) return;
  
  const editedScript = editedScripts[id];
  const wechatReply = editedScript ? editedScript.wechatReply : script.wechatReply;
  
  copyToClipboard(wechatReply || '');
  showToast('微信话术已复制！');
}

// 编辑微信话术（保持向后兼容）
function editWechatReply(id) {
  const script = scripts.find(s => s.id === id);
  if (!script) return;
  
  const editedScript = editedScripts[id];
  const wechatReply = editedScript ? editedScript.wechatReply : script.wechatReply;
  
  const modal = document.getElementById('editModal');
  const modalContent = modal.querySelector('.modal-content');
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <h3>编辑微信话术</h3>
      <button class="close-modal" onclick="showDetail(${id})">×</button>
    </div>
    <div class="modal-body">
      <textarea id="editText" style="width: 100%; min-height: 200px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; line-height: 1.6; resize: vertical; font-family: inherit;">${escapeHtml(wechatReply || '')}</textarea>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="copyEditedText()">📋 复制</button>
    </div>
  `;
  
  window.currentEditId = id;
}

// 切换收藏
function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index > -1) {
    favorites.splice(index, 1);
    showToast('已取消收藏');
  } else {
    favorites.push(id);
    showToast('已收藏');
  }
  
  localStorage.setItem('salesFavorites', JSON.stringify(favorites));
  
  // 刷新详情弹窗
  showDetail(id);
}

// 添加到最近搜索
function addToRecentSearches(query) {
  const index = recentSearches.indexOf(query);
  if (index > -1) {
    recentSearches.splice(index, 1);
  }
  recentSearches.unshift(query);
  recentSearches = recentSearches.slice(0, 20);
  localStorage.setItem('salesRecentSearches', JSON.stringify(recentSearches));
}

// 复制到剪贴板
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

// 显示提示
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10000;
    animation: fadeIn 0.3s;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 1500);
}

// HTML转义
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
