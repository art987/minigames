// 搜索相关的函数

// 模糊搜索话术
function searchScripts(query) {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return scripts.filter(script => {
    // 检查标题
    if (script.title && script.title.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // 检查客户原话
    if (script.customer && script.customer.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // 检查关键词
    if (script.keywords && script.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchTerm) || 
      searchTerm.includes(keyword.toLowerCase())
    )) {
      return true;
    }
    
    // 检查分类
    if (script.category && script.category.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // 检查客户心理
    if (script.psychology && script.psychology.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // 检查微信话术
    if (script.wechatReply && script.wechatReply.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    return false;
  });
}

// 按心理学分类筛选
function filterByPsychology(psychology) {
  return scripts.filter(script => script.psychology === psychology);
}

// 按分类筛选
function filterByCategory(category) {
  return scripts.filter(script => script.category === category);
}

// 获取TOP热门问题（返回level高的前20条）
function getTopQuestions() {
  return [...scripts]
    .sort((a, b) => b.level - a.level)
    .slice(0, 20);
}

// 获取所有分类
function getAllCategories() {
  const categories = new Set();
  scripts.forEach(script => {
    if (script.category) {
      categories.add(script.category);
    }
  });
  return Array.from(categories);
}

// 获取所有心理学分类
function getAllPsychologies() {
  const psychologies = new Set();
  scripts.forEach(script => {
    if (script.psychology) {
      psychologies.add(script.psychology);
    }
  });
  return Array.from(psychologies);
}