// 使用全局变量brandData（在HTML中先加载brandData.js）
document.addEventListener('DOMContentLoaded', function() {

    // 获取DOM元素
    const categoryList = document.getElementById('category-list');
    const brandSections = document.getElementById('brand-sections');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    // 添加返回顶部按钮
    function addBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.id = 'back-to-top';
        backToTop.className = 'back-to-top';
        backToTop.textContent = '↑';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #ff6b6b;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(backToTop);
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return backToTop;
    }
    
    const backToTopButton = addBackToTopButton();

    // 监听滚动事件，控制返回顶部按钮显示
    function handleScroll() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
        
        // 滚动时更新active分类
        const sections = document.querySelectorAll('.brand-section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            document.querySelectorAll('.category-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-category') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // 生成分类导航
    function generateCategories() {
        categoryList.innerHTML = '';
        Object.keys(brandData).forEach(category => {
            const li = document.createElement('li');
            li.className = 'category-item';
            
            const a = document.createElement('a');
            a.className = 'category-link';
            a.href = `#${category}`;
            a.textContent = category;
            a.setAttribute('data-category', category);
            
            // 添加点击事件
            a.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有active类
                document.querySelectorAll('.category-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // 添加当前active类
                this.classList.add('active');
                
                // 滚动到对应分类
                const section = document.getElementById(category);
                if (section) {
                    // 隐藏搜索结果
                    searchResults.classList.remove('active');
                    
                    section.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
            
            // 添加触摸反馈（移动端优化）
            a.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            a.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            li.appendChild(a);
            categoryList.appendChild(li);
        });
    }

    // 生成品牌展示区域
    function generateBrandSections() {
        brandSections.innerHTML = '';
        
        Object.keys(brandData).forEach(category => {
            const section = document.createElement('section');
            section.className = 'brand-section';
            section.id = category;
            
            const sectionTitle = document.createElement('h2');
            sectionTitle.className = 'section-title';
            sectionTitle.textContent = category;
            
            const brandGrid = document.createElement('div');
            brandGrid.className = 'brand-grid';
            
            brandData[category].forEach(brand => {
                const brandCard = document.createElement('div');
                brandCard.className = 'brand-card';
                brandCard.setAttribute('data-brand', brand.name);
                brandCard.setAttribute('data-category', category);
                brandCard.setAttribute('data-description', brand.description);
                
                const brandLogo = document.createElement('div');
                brandLogo.className = 'brand-logo';
                
                // 尝试创建img元素加载logo
                const logoImg = document.createElement('img');
                const categoryDir = category === '护肤品' ? 'skincare' : 'other'; // 根据分类确定目录
                logoImg.src = `images/${categoryDir}/${brand.name}.png`;
                logoImg.alt = `${brand.name} logo`;
                logoImg.style.maxWidth = '100%';
                logoImg.style.maxHeight = '100%';
                logoImg.style.display = 'none'; // 初始隐藏
                
                // 图片加载成功事件
                logoImg.onload = function() {
                    logoImg.style.display = 'block';
                    brandLogo.textContent = ''; // 清空首字母
                };
                
                // 图片加载失败事件（回退到首字母）
                logoImg.onerror = function() {
                    const initial = brand.name.charAt(0);
                    brandLogo.textContent = initial;
                };
                
                // 添加图片到logo容器
                brandLogo.appendChild(logoImg);
                
                // 如果没有设置回退，默认显示首字母
                const initial = brand.name.charAt(0);
                brandLogo.textContent = initial;
                
                const brandName = document.createElement('h3');
                brandName.className = 'brand-name';
                brandName.textContent = brand.name;
                
                const brandHonors = document.createElement('p');
                brandHonors.className = 'brand-description';
                brandHonors.textContent = brand.honors || '暂无荣誉信息';
                
                const brandReputation = document.createElement('p');
                brandReputation.className = 'brand-reputation';
                brandReputation.textContent = brand.reputation || '暂无口碑信息';

                const brandInfo = document.createElement('div');
                brandInfo.className = 'brand-info';

                brandInfo.appendChild(brandName);
                brandInfo.appendChild(brandHonors);
                brandInfo.appendChild(brandReputation);

                // 添加详情按钮
                const detailsBtn = document.createElement('button');
                detailsBtn.className = 'details-btn';
                detailsBtn.textContent = '详情';
                detailsBtn.onclick = function() {
                    showBrandDetails(brand);
                };
                
                brandCard.appendChild(brandLogo);
                brandCard.appendChild(brandInfo);
                brandCard.appendChild(detailsBtn);
                
                brandGrid.appendChild(brandCard);
            });
            
            section.appendChild(sectionTitle);
            section.appendChild(brandGrid);
            
            brandSections.appendChild(section);
        });
    }

    // 实现搜索功能
    function search(query) {
        query = query.toLowerCase().trim();
        if (!query) {
            searchResults.classList.remove('active');
            return;
        }
        
        // 添加搜索加载动画
        searchResults.innerHTML = '';
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'search-loading';
        loadingDiv.style.cssText = `
            text-align: center;
            padding: 40px;
            color: #666;
        `;
        loadingDiv.textContent = '搜索中...';
        searchResults.appendChild(loadingDiv);
        
        // 使用setTimeout模拟搜索延迟，提升用户体验
        setTimeout(() => {
            searchResults.innerHTML = '';
            const resultsTitle = document.createElement('h2');
            resultsTitle.textContent = `"${query}" 的搜索结果`;
            searchResults.appendChild(resultsTitle);
        
        const resultsGrid = document.createElement('div');
        resultsGrid.className = 'brand-grid';
        
        let hasResults = false;
        
        // 搜索逻辑
        Object.keys(brandData).forEach(category => {
            brandData[category].forEach(brand => {
                const categoryLower = category.toLowerCase();
                const brandNameLower = brand.name.toLowerCase();
                const descriptionLower = brand.description.toLowerCase();
                
                if (categoryLower.includes(query) || 
                    brandNameLower.includes(query) || 
                    descriptionLower.includes(query)) {
                    
                    hasResults = true;
                    
                    const brandCard = document.createElement('div');
                    brandCard.className = 'brand-card';
                    
                    const brandLogo = document.createElement('div');
                    brandLogo.className = 'brand-logo';
                    
                    // 尝试创建img元素加载logo
                    const logoImg = document.createElement('img');
                    const categoryDir = category === '护肤品' ? 'skincare' : 'other'; // 根据分类确定目录
                    logoImg.src = `images/${categoryDir}/${brand.name}.png`;
                    logoImg.alt = `${brand.name} logo`;
                    logoImg.style.maxWidth = '100%';
                    logoImg.style.maxHeight = '100%';
                    logoImg.style.display = 'none'; // 初始隐藏
                    
                    // 图片加载成功事件
                    logoImg.onload = function() {
                        logoImg.style.display = 'block';
                        brandLogo.textContent = ''; // 清空首字母
                    };
                    
                    // 图片加载失败事件（回退到首字母）
                    logoImg.onerror = function() {
                        brandLogo.textContent = brand.name.charAt(0);
                    };
                    
                    // 添加图片到logo容器
                    brandLogo.appendChild(logoImg);
                    
                    // 默认显示首字母
                    brandLogo.textContent = brand.name.charAt(0);
                    
                    const brandInfo = document.createElement('div');
                    brandInfo.className = 'brand-info';
                    
                    const brandName = document.createElement('h3');
                    brandName.className = 'brand-name';
                    // 高亮搜索词
                    brandName.innerHTML = highlightText(brand.name, query);
                    
                    const brandHonors = document.createElement('p');
                    brandHonors.className = 'brand-description';
                    brandHonors.innerHTML = highlightText(brand.honors || '暂无荣誉信息', query);
                    
                    const brandReputation = document.createElement('p');
                    brandReputation.className = 'brand-reputation';
                    brandReputation.innerHTML = highlightText(brand.reputation || '暂无口碑信息', query);
                    
                    brandInfo.appendChild(brandName);
                    brandInfo.appendChild(brandHonors);
                    brandInfo.appendChild(brandReputation);
                    
                    // 添加详情按钮
                    const detailsBtn = document.createElement('button');
                    detailsBtn.className = 'details-btn';
                    detailsBtn.textContent = '详情';
                    detailsBtn.onclick = function() {
                        showBrandDetails(brand);
                    };
                    
                    brandCard.appendChild(brandLogo);
                    brandCard.appendChild(brandInfo);
                    brandCard.appendChild(detailsBtn);
                    
                    resultsGrid.appendChild(brandCard);
                }
            });
        });
        
        if (!hasResults) {
            const noResults = document.createElement('div');
            noResults.style.cssText = `
                text-align: center;
                padding: 60px 20px;
                color: #666;
                font-size: 16px;
            `;
            noResults.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                <p>没有找到相关品牌或分类</p>
                <p style="margin-top: 10px; font-size: 14px;">请尝试使用其他关键词搜索</p>
            `;
            searchResults.appendChild(noResults);
        } else {
            // 为搜索结果添加进入动画
            resultsGrid.style.opacity = '0';
            resultsGrid.style.transition = 'opacity 0.5s ease';
            searchResults.appendChild(resultsGrid);
            setTimeout(() => {
                resultsGrid.style.opacity = '1';
            }, 100);
        }
        
        searchResults.classList.add('active');
        
        // 滚动到搜索结果顶部
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        }, 300); // 300ms延迟，让用户感知搜索过程
    }

    // 高亮搜索词
    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // 绑定搜索事件
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value;
        search(query);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            search(query);
        }
    });

    searchInput.addEventListener('input', function() {
        if (!this.value.trim()) {
            searchResults.classList.remove('active');
        }
    });
    
    // 优化移动端触摸体验
    searchBtn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    searchBtn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
    
    // 优化品牌卡片的点击效果
    document.addEventListener('click', function(e) {
        if (e.target.closest('.brand-card')) {
            const card = e.target.closest('.brand-card');
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 100);
        }
    });
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    // 创建品牌详情弹窗
    function showBrandDetails(brand) {
        // 检查是否已存在弹窗，如果存在则移除
        let modal = document.getElementById('brand-modal');
        if (modal) {
            modal.remove();
        }
        
        // 创建弹窗背景
        modal = document.createElement('div');
        modal.id = 'brand-modal';
        modal.className = 'brand-modal';
        
        // 创建弹窗内容容器
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // 创建关闭按钮
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
        
        // 创建弹窗头部
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.appendChild(closeBtn);
        
        // 创建弹窗主体
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        
        // 创建品牌头部信息（包含logo和名称）
        const brandHeader = document.createElement('div');
        brandHeader.className = 'brand-header';
        
        // 创建logo元素
        const brandLogo = document.createElement('div');
        brandLogo.className = 'brand-detail-logo';
        
        // 尝试加载logo图片
        const logoImg = document.createElement('img');
        logoImg.src = brand.logo || '';
        logoImg.alt = brand.name + ' logo';
        logoImg.onload = function() {
            brandLogo.textContent = '';
            brandLogo.appendChild(logoImg);
        };
        logoImg.onerror = function() {
            brandLogo.textContent = brand.name.charAt(0);
        };
        
        brandLogo.appendChild(logoImg);
        brandLogo.textContent = brand.name.charAt(0); // 默认显示首字母
        
        // 创建品牌名称
        const brandName = document.createElement('h2');
        brandName.className = 'brand-detail-name';
        brandName.textContent = brand.name;
        
        brandHeader.appendChild(brandLogo);
        brandHeader.appendChild(brandName);
        
        // 创建信息列表
        const infoList = document.createElement('div');
        infoList.className = 'info-list';
        
        // 添加品牌描述
        addInfoItem(infoList, '品牌描述', brand.description || '暂无描述');
        
        // 添加成立时间
        addInfoItem(infoList, '成立时间', brand.founded || '暂无信息');
        
        // 添加所在城市
        addInfoItem(infoList, '所在城市', brand.city || '暂无信息');
        
        // 添加品牌荣誉
        addInfoItem(infoList, '品牌荣誉', brand.honors || '暂无荣誉信息');
        
        // 添加品牌口碑
        addInfoItem(infoList, '品牌口碑', brand.reputation || '暂无口碑信息');
        
        // 将内容添加到弹窗主体
        modalBody.appendChild(brandHeader);
        modalBody.appendChild(infoList);
        
        // 辅助函数：添加信息项
        function addInfoItem(container, label, value) {
            const infoItem = document.createElement('div');
            infoItem.className = 'info-item';
            
            const infoLabel = document.createElement('div');
            infoLabel.className = 'info-label';
            infoLabel.textContent = label;
            
            const infoValue = document.createElement('div');
            infoValue.className = 'info-value';
            infoValue.textContent = value;
            
            infoItem.appendChild(infoLabel);
            infoItem.appendChild(infoValue);
            container.appendChild(infoItem);
        }
        
        // 组装弹窗
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 显示弹窗
        modal.style.display = 'flex';
        
        // 点击弹窗外部关闭
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
    
    // 初始化
    generateCategories();
    generateBrandSections();
    
    // 设置第一个分类为活动状态
    const firstCategory = document.querySelector('.category-link');
    if (firstCategory) {
        firstCategory.classList.add('active');
    }
    
    // 初始检查滚动位置
    handleScroll();
});