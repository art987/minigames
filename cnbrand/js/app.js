// 使用全局变量brandData（在HTML中先加载brandData.js）

// 页面加载完成后隐藏加载页面
function hideLoadingPage() {
    const loadingPage = document.getElementById('loading-page');
    if (loadingPage) {
        loadingPage.style.opacity = '0';
        setTimeout(() => {
            loadingPage.style.display = 'none';
        }, 500); // 等待过渡动画完成
    }
}

// 检查brandData是否加载完成
function isBrandDataLoaded() {
    console.log('Checking brandData...');
    console.log('typeof window.brandData:', typeof window.brandData);
    console.log('window.brandData:', window.brandData);
    console.log('typeof brandData:', typeof brandData);
    console.log('brandData:', brandData);
    
    // 先尝试直接访问brandData，如果失败再尝试window.brandData
    return (typeof brandData !== 'undefined' && brandData !== null) || 
           (typeof window.brandData !== 'undefined' && window.brandData !== null);
}

// 打字机效果函数
function typewriterEffect(element, text, speed = 100, callback = null) {
    let index = 0;
    element.textContent = ''; // 清空元素内容
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 500); // 等待500ms后执行回调
        }
    }
    
    type();
}

// DOMContentLoaded事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 首先检查brandData是否加载完成
    if (!isBrandDataLoaded()) {
        console.error('brandData未加载，请检查brandData.js文件');
        alert('数据加载失败，请检查网络连接或刷新页面重试');
        return;
    } else {
        console.log('brandData加载成功！');
        // 确保brandData是全局可访问的
        window.brandData = window.brandData || brandData;
    }
    
    // 然后显示打字机动画
    const loadingTextLine1 = document.querySelector('.loading-text-line1');
    const loadingTextLine2 = document.querySelector('.loading-text-line2');
    
    if (loadingTextLine1 && loadingTextLine2) {
        // 保存原始文本
        const line1Text = loadingTextLine1.textContent;
        const line2Text = loadingTextLine2.textContent;
        
        // 清空文本以便开始打字机效果
        loadingTextLine1.textContent = '';
        loadingTextLine2.textContent = '';
        
        // 第一行打字机效果完成后开始第二行
        typewriterEffect(loadingTextLine1, line1Text, 80, () => {
            typewriterEffect(loadingTextLine2, line2Text, 80, () => {
                // 打字机效果完成后继续执行
                console.log('打字机效果完成！');
            });
        });
    }
    
    // 获取DOM元素
    const categoryList = document.getElementById('category-list');
    const brandSections = document.getElementById('brand-sections');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    // 用于跟踪已加载的分类
    const loadedCategories = new Set();
    // 保存所有主分类的顺序
    const allMainCategories = Object.keys(window.brandData);
    // 当前已加载的主分类索引
    let currentLoadedIndex = 0;
    // 用于控制滚动时是否更新active状态的标志
    let isUpdatingActive = false;
    // 加载完成标志
    let isAllCategoriesLoaded = false;
    
    // 添加加载进度条
    function addLoadingProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'loading-progress';
        progressBar.className = 'loading-progress';
        progressBar.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 40px;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 20px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // 进度百分比文本
        const progressText = document.createElement('span');
        progressText.className = 'progress-text';
        progressText.textContent = '加载中...';
        
        progressBar.appendChild(progressText);
        document.body.appendChild(progressBar);
        
        return progressBar;
    }
    
    const loadingProgressBar = addLoadingProgressBar();
    
    // 更新加载进度
    function updateLoadingProgress() {
        const totalCategories = allMainCategories.length;
        const loadedCount = loadedCategories.size;
        const progressPercentage = Math.round((loadedCount / totalCategories) * 100);
        
        const progressText = loadingProgressBar.querySelector('.progress-text');
        progressText.textContent = `品牌数据加载中... ${progressPercentage}%`;
        
        // 显示进度条
        loadingProgressBar.style.opacity = '1';
        
        // 如果所有分类都已加载，隐藏进度条和加载页面
        if (loadedCount >= totalCategories) {
            isAllCategoriesLoaded = true;
            setTimeout(() => {
                loadingProgressBar.style.opacity = '0';
                // 所有分类加载完成后，隐藏加载页面
                hideLoadingPage();
            }, 1000);
        }
    }
    
    // 添加返回顶部按钮和地图按钮
    function addBackToTopButton() {
        // 创建地图图标按钮
        const mapButton = document.createElement('button');
        mapButton.id = 'map-button';
        mapButton.className = 'map-button';
        mapButton.textContent = '⊞';
        mapButton.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #e81818ff;
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
        
        // 添加点击事件，显示品牌地图弹窗
        mapButton.addEventListener('click', showBrandMap);
        
        // 创建回到顶部按钮
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
            background: #e81818ff;
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
        
        // 添加到页面
        document.body.appendChild(mapButton);
        document.body.appendChild(backToTop);
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return { backToTop, mapButton };
    }
    
    const { backToTop: backToTopButton, mapButton } = addBackToTopButton();

    // 监听滚动事件，控制返回顶部按钮和地图按钮显示和上滑加载更多
    function handleScroll() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            mapButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            mapButton.style.opacity = '0';
        }
        
        // 只有当不是通过点击触发的滚动时，才更新active分类
        if (!isUpdatingActive) {
            // 获取屏幕顶部可见区域的判断范围（屏幕顶部到屏幕高度的10%处）
            const viewportTop = window.scrollY;
            const viewportHeight = window.innerHeight;
            const viewportCutoff = viewportTop + viewportHeight * 0.1;
            
            // 找到所有h3标签（子分类标题）
            const subCategoryTitles = document.querySelectorAll('h3.sub-section-title');
            let targetSubCategory = null;
            
            // 遍历所有h3标签，找到在屏幕顶部10%范围内的标题
            subCategoryTitles.forEach(title => {
                const titleTop = title.getBoundingClientRect().top + window.scrollY;
                const titleBottom = titleTop + title.offsetHeight;
                
                // 如果标题在屏幕顶部的可见区域内（顶部到屏幕10%高度处）
                if (titleTop <= viewportCutoff && titleBottom >= viewportTop) {
                    // 获取对应的子分类区域
                    const subSection = title.closest('.sub-category-section');
                    if (subSection) {
                        targetSubCategory = subSection;
                    }
                }
            });
            
            // 如果找到了新的目标子分类，才更新active状态
            if (targetSubCategory) {
                const subCategoryId = targetSubCategory.getAttribute('id');
                
                // 检查是否与当前活跃的分类不同
                const currentActiveLink = document.querySelector('.sub-category-link.active');
                const currentActiveId = currentActiveLink ? currentActiveLink.getAttribute('data-category') : null;
                
                // 只有遇到新的h3标题时才更新active状态
                if (currentActiveId !== subCategoryId) {
                    // 移除当前活跃链接的active类
                    if (currentActiveLink) {
                        currentActiveLink.classList.remove('active');
                    }
                    
                    // 为新的目标子分类对应的a标签添加active类
                    const targetLink = document.querySelector(`.sub-category-link[data-category="${subCategoryId}"]`);
                    if (targetLink) {
                        targetLink.classList.add('active');
                        // 滚动到active元素，使其位于屏幕顶部30%的位置
                        scrollToActiveElement(targetLink);
                    }
                }
            }
        }
        
        // 检测是否滚动到页面底部，触发加载更多
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            loadMoreCategories();
        }
    }
    
    // 加载更多分类
    function loadMoreCategories() {
        // 检查是否还有未加载的主分类
        if (currentLoadedIndex + 1 < allMainCategories.length) {
            currentLoadedIndex++;
            generateMainCategorySection(allMainCategories[currentLoadedIndex]);
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // 异步加载剩余分类
    function asyncLoadRemainingCategories() {
        // 从第二个分类开始加载
        for (let i = 1; i < allMainCategories.length; i++) {
            // 使用setTimeout实现异步加载，每个分类之间有延迟
            setTimeout(() => {
                if (i <= allMainCategories.length - 1) {
                    generateMainCategorySection(allMainCategories[i]);
                    currentLoadedIndex = i;
                    
                    // 更新加载进度
                    updateLoadingProgress();
                }
            }, i * 300); // 每个分类加载间隔300ms
        }
    }
    
    // 初始化时只加载第一个分类，然后异步加载其他分类
    // 第一个分类会在generateBrandSections中加载
    // 启动异步加载剩余分类
    setTimeout(() => {
        asyncLoadRemainingCategories();
    }, 500); // 页面初始化后500ms开始异步加载
    
    // 生成分类导航
    function generateCategories() {
        categoryList.innerHTML = '';
        
        // 遍历所有主分类
        allMainCategories.forEach(mainCategory => {
            // 创建主分类项
            const mainLi = document.createElement('li');
            mainLi.className = 'category-item main-category';
            
            const mainA = document.createElement('a');
            mainA.className = 'category-link main-category-link';
            mainA.href = `#${mainCategory}`;
            mainA.textContent = mainCategory;
            mainA.setAttribute('data-category', mainCategory);
            
            // 添加主分类点击事件
                mainA.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 如果分类正在加载中且尚未加载完成，显示提示
                    if (!isAllCategoriesLoaded && !loadedCategories.has(mainCategory)) {
                        showLoadingNotification(mainCategory);
                        return;
                    }
                    
                    // 设置标志，防止滚动时更新active状态
                    isUpdatingActive = true;
                    
                    // 移除所有子分类链接的active类
                    document.querySelectorAll('.sub-category-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // 检查主分类是否已加载
                    const section = document.getElementById(mainCategory);
                    if (!section) {
                        // 如果未加载，则生成该主分类
                        generateMainCategorySection(mainCategory);
                        
                        // 更新currentLoadedIndex到当前主分类的索引
                        const categoryIndex = allMainCategories.indexOf(mainCategory);
                        if (categoryIndex > currentLoadedIndex) {
                            currentLoadedIndex = categoryIndex;
                        }
                    }
                    
                    // 滚动到对应主分类
                    const scrollToMainCategory = () => {
                        const targetSection = document.getElementById(mainCategory);
                        if (targetSection) {
                            // 隐藏搜索结果
                            searchResults.classList.remove('active');
                            
                            // 使用window.scrollTo替代scrollIntoView，确保兼容性和准确性
                            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    };
                    
                    // 使用requestAnimationFrame确保DOM已更新，然后执行滚动
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            scrollToMainCategory();
                        }, 100);
                    });
                    
                    // 滚动动画完成后重新允许滚动更新active状态
                    setTimeout(() => {
                        isUpdatingActive = false;
                    }, 1000); // 1秒后恢复，足够覆盖大多数滚动动画
                });
            
            // 添加触摸反馈（移动端优化）
            mainA.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            mainA.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            mainLi.appendChild(mainA);
            
            // 创建子分类列表
            const subCategoryUl = document.createElement('ul');
            subCategoryUl.className = 'sub-category-list';
            
            // 获取当前主分类下的所有子分类
            const subCategories = Object.keys(brandData[mainCategory]);
            
            // 遍历所有子分类
            subCategories.forEach(subCategory => {
                const subLi = document.createElement('li');
                subLi.className = 'category-item sub-category';
                
                const subA = document.createElement('a');
                subA.className = 'category-link sub-category-link';
                subA.href = `#${mainCategory}-${subCategory}`;
                // 只显示分类名称中"|"左边的文字
                if (subCategory.includes('|')) {
                    subA.textContent = subCategory.split('|')[0].trim();
                } else {
                    subA.textContent = subCategory;
                }
                subA.setAttribute('data-category', `${mainCategory}-${subCategory}`);
                subA.setAttribute('data-main-category', mainCategory);
                subA.setAttribute('data-sub-category', subCategory);
                
                // 添加子分类点击事件
                subA.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 如果分类正在加载中且尚未加载完成，显示提示
                    if (!isAllCategoriesLoaded && !loadedCategories.has(mainCategory)) {
                        showLoadingNotification(mainCategory);
                        return;
                    }
                    
                    // 设置标志，防止滚动时更新active状态
                    isUpdatingActive = true;
                    
                    // 移除所有子分类链接的active类
                    document.querySelectorAll('.sub-category-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // 添加当前active类
                    this.classList.add('active');
                    // 滚动到active元素，使其位于屏幕顶部30%的位置
                    scrollToActiveElement(this);
                    
                    // 检查主分类是否已加载
                    const mainSection = document.getElementById(mainCategory);
                    if (!mainSection) {
                        // 如果未加载，则生成该主分类
                        generateMainCategorySection(mainCategory);
                    }
                    
                    // 滚动到对应子分类
                    const scrollToSubCategory = () => {
                        const targetSubSection = document.getElementById(`${mainCategory}-${subCategory}`);
                        if (targetSubSection) {
                            // 隐藏搜索结果
                            searchResults.classList.remove('active');
                            
                            // 使用window.scrollTo替代scrollIntoView，确保兼容性和准确性
                            const targetPosition = targetSubSection.getBoundingClientRect().top + window.pageYOffset - 80;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    };
                    
                    // 使用requestAnimationFrame确保DOM已更新，然后执行滚动
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            scrollToSubCategory();
                        }, 100);
                    });
                    
                    // 滚动动画完成后重新允许滚动更新active状态
                    setTimeout(() => {
                        isUpdatingActive = false;
                    }, 1000); // 1秒后恢复，足够覆盖大多数滚动动画
                });
                
                // 添加触摸反馈（移动端优化）
                subA.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                });
                
                subA.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                });
                
                subLi.appendChild(subA);
                subCategoryUl.appendChild(subLi);
            });
            
            mainLi.appendChild(subCategoryUl);
            categoryList.appendChild(mainLi);
        });
    }

    // 创建品牌卡片
    function createBrandCard(container, brand, mainCategory, subCategory) {
        const brandCard = document.createElement('div');
        brandCard.className = 'brand-card';
        brandCard.setAttribute('data-brand', brand.name);
        brandCard.setAttribute('data-main-category', mainCategory);
        brandCard.setAttribute('data-sub-category', subCategory);
        brandCard.setAttribute('data-description', brand.description || '');
        
        // 创建brandcontent1（上半部分）
        const brandContent1 = document.createElement('div');
        brandContent1.className = 'brand-content1';
        
        const brandLogo = document.createElement('div');
        brandLogo.className = 'brand-logo';
        
        // 尝试创建img元素加载logo
        const logoImg = document.createElement('img');
        logoImg.alt = `${brand.name} logo`;
        logoImg.style.maxWidth = '100%';
        logoImg.style.maxHeight = '100%';
        
        // 添加懒加载属性
        logoImg.loading = 'lazy';
        
        // 图片加载成功事件
        logoImg.onload = function() {
            brandLogo.textContent = ''; // 清空首字母
            brandLogo.appendChild(logoImg);
        };
        
        // 图片加载失败事件（回退到首字母）
        logoImg.onerror = function() {
            brandLogo.textContent = brand.name.charAt(0);
        };
        
        // 如果有logo路径，设置图片src（支持懒加载）
        if (brand.logo) {
            // 使用Intersection Observer实现兼容性更好的懒加载
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            logoImg.src = brand.logo;
                            observer.unobserve(logoImg);
                        }
                    });
                }, {
                    rootMargin: '100px', // 提前100px开始加载
                    threshold: 0.1
                });
                
                // 先添加图片到DOM，再开始观察
                brandLogo.appendChild(logoImg);
                observer.observe(logoImg);
            } else {
                // 浏览器不支持Intersection Observer，直接加载
                logoImg.src = brand.logo;
                brandLogo.appendChild(logoImg);
            }
        } else {
            // 没有logo时显示首字母
            brandLogo.textContent = brand.name.charAt(0);
        }
        
        const brandName = document.createElement('h3');
        brandName.className = 'brand-name';
        brandName.textContent = brand.name;
        
        const brandFounded = document.createElement('p');
        brandFounded.className = 'brand-founded';
        brandFounded.textContent = brand.founded ? `${brand.founded}成立` : '成立时间未知';
        
        const brandHonors = document.createElement('p');
        brandHonors.className = 'brand-description';
        brandHonors.textContent = brand.honors || '暂无荣誉信息';
        
        // 创建右侧内容容器
        const brandContent1Right = document.createElement('div');
        brandContent1Right.className = 'brand-content1-right';
        brandContent1Right.appendChild(brandName);
        brandContent1Right.appendChild(brandFounded);
        brandContent1Right.appendChild(brandHonors);
        
        // 将左侧logo和右侧内容添加到brandContent1
        brandContent1.appendChild(brandLogo);
        brandContent1.appendChild(brandContent1Right);
        
        // 创建brandcontent2（下半部分）
        const brandContent2 = document.createElement('div');
        brandContent2.className = 'brand-content2';
        
        // 添加商品信息（如果有）
        if (brand.products && brand.products.length > 0) {
            const productsContainer = document.createElement('div');
            productsContainer.className = 'brand-products';
            
            // 添加品牌口碑 - 移到商品标题前面
                const brandReputation = document.createElement('p');
                brandReputation.className = 'brand-reputation';
                brandReputation.textContent = brand.reputation || '暂无口碑信息';
                productsContainer.appendChild(brandReputation);
                
                // 添加核心优势（如果有）
                if (brand.advantages && brand.advantages.length > 0) {
                    const advantagesTitle = document.createElement('h4');
                    advantagesTitle.className = 'products-title';
                    advantagesTitle.textContent = '核心优势：';
                    productsContainer.appendChild(advantagesTitle);
                    
                    const advantagesList = document.createElement('ul');
                    advantagesList.className = 'advantages-list';
                    
                    brand.advantages.forEach(advantage => {
                        const advantageItem = document.createElement('li');
                        advantageItem.className = 'advantage-item';
                        advantageItem.textContent = advantage;
                        advantagesList.appendChild(advantageItem);
                    });
                    
                    productsContainer.appendChild(advantagesList);
                }
                
                const productsTitle = document.createElement('h4');
                productsTitle.className = 'products-title';
                productsTitle.textContent = '热销商品：';
                productsContainer.appendChild(productsTitle);
            
            const productsList = document.createElement('ul');
            productsList.className = 'products-list';
            
            brand.products.forEach(product => {
                const productItem = document.createElement('li');
                productItem.className = 'product-item';
                
                // 创建商品基本信息容器
                const productBasicInfo = document.createElement('div');
                productBasicInfo.className = 'product-basic-info';
                
                const productName = document.createElement('span');
                productName.className = 'product-name';
                productName.textContent = product.name;
                
                const productSpec = document.createElement('span');
                productSpec.className = 'product-spec';
                productSpec.textContent = product.spec;
                
                const productPrice = document.createElement('span');
                productPrice.className = 'product-price';
                productPrice.textContent = product.price;
                
                productBasicInfo.appendChild(productName);
                productBasicInfo.appendChild(productSpec);
                productBasicInfo.appendChild(productPrice);
                
                const productFeature = document.createElement('span');
                productFeature.className = 'product-feature';
                productFeature.textContent = product.feature;
                
                productItem.appendChild(productBasicInfo);
                productItem.appendChild(productFeature);
                productsList.appendChild(productItem);
            });
            
            productsContainer.appendChild(productsList);
            brandContent2.appendChild(productsContainer);
        } else {
            // 如果没有商品，仍然显示品牌口碑
            const brandReputation = document.createElement('p');
            brandReputation.className = 'brand-reputation';
            brandReputation.textContent = brand.reputation || '暂无口碑信息';
            brandContent2.appendChild(brandReputation);
            
            // 添加核心优势（如果有）
            if (brand.advantages && brand.advantages.length > 0) {
                const advantagesTitle = document.createElement('h4');
                advantagesTitle.className = 'products-title';
                advantagesTitle.textContent = '核心优势：';
                brandContent2.appendChild(advantagesTitle);
                
                const advantagesList = document.createElement('ul');
                advantagesList.className = 'advantages-list';
                
                brand.advantages.forEach(advantage => {
                    const advantageItem = document.createElement('li');
                    advantageItem.className = 'advantage-item';
                    advantageItem.textContent = advantage;
                    advantagesList.appendChild(advantageItem);
                });
                
                brandContent2.appendChild(advantagesList);
            }
        }
        
        // 添加详情按钮
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'details-btn';
        detailsBtn.textContent = '详情';
        detailsBtn.onclick = function() {
            showBrandDetails(brand);
        };
        
        // 将详情按钮添加到brandContent2
        brandContent2.appendChild(detailsBtn);
        
        // 将两个内容版块添加到brandCard
        brandCard.appendChild(brandContent1);
        brandCard.appendChild(brandContent2);
        
        container.appendChild(brandCard);
    }

    // 显示加载提示通知
    function showLoadingNotification(categoryName) {
        // 检查是否已存在通知，如果存在则移除
        let notification = document.getElementById('loading-notification');
        if (notification) {
            notification.remove();
        }
        
        // 创建通知元素
        notification = document.createElement('div');
        notification.id = 'loading-notification';
        notification.className = 'loading-notification';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            font-size: 16px;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.3s ease;
            text-align: center;
        `;
        
        notification.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 10px;">⏳</div>
            <p>${categoryName}还需几秒钟加载完成</p>
            <p style="font-size: 14px; margin-top: 5px; opacity: 0.8;">先随便逛逛吧~</p>
        `;
        
        document.body.appendChild(notification);
        
        // 显示通知
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // 3秒后隐藏通知
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // 品牌地图导航弹窗HTML结构
    const brandMapModalHTML = `
        <div id="brand-map-modal" class="brand-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>国货品牌分类导航</h2>
                    <span class="close-btn">&times;</span>
                </div>
                <div class="modal-body">
                    <div id="brand-map-content"></div>
                </div>
            </div>
        </div>
    `;

    // 添加品牌地图弹窗到页面
    document.body.insertAdjacentHTML('beforeend', brandMapModalHTML);

    // 获取弹窗元素
    const brandMapModal = document.getElementById('brand-map-modal');
    const closeBtn = document.querySelector('.close-btn');
    const brandMapContent = document.getElementById('brand-map-content');

    // 生成品牌地图内容
    function generateBrandMap() {
        let content = '';
        const categories = Object.keys(window.brandData);
        
        categories.forEach(mainCategory => {
            content += `<div class="brand-map-category-item">
                <h3 class="brand-map-main-category" data-category="${mainCategory}">
                    ${mainCategory}
                </h3>
                <div class="brand-map-subcategories">
            `;
            
            Object.keys(brandData[mainCategory]).forEach(subCategory => {
                const displayName = subCategory.includes('|') ? subCategory.split('|')[0].trim() : subCategory;
                content += `<a href="#${mainCategory}-${subCategory}" class="brand-map-sub-category" data-main-category="${mainCategory}" data-sub-category="${subCategory}">
                    ${displayName}
                </a>`;
            });
            
            content += '</div></div>';
        });
        
        brandMapContent.innerHTML = content;
    }

    // 显示品牌地图弹窗
    function showBrandMap() {
        brandMapModal.style.display = 'flex';
        // 阻止背景页面滚动
        document.body.style.overflow = 'hidden';
    }

    // 隐藏品牌地图弹窗
    function hideBrandMap() {
        brandMapModal.style.display = 'none';
        // 恢复背景页面滚动
        document.body.style.overflow = '';
    }

    // 点击关闭按钮
    closeBtn.addEventListener('click', hideBrandMap);

    // 点击弹窗外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === brandMapModal) {
            hideBrandMap();
        }
    });

    // 点击子分类链接
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('brand-map-sub-category')) {
            e.preventDefault();
            const mainCategory = e.target.getAttribute('data-main-category');
            const subCategory = e.target.getAttribute('data-sub-category');
            
            // 隐藏弹窗
            hideBrandMap();
            
            // 跳转到对应区域
            const targetSection = document.getElementById(`${mainCategory}-${subCategory}`);
            if (targetSection) {
                // 使用更兼容的滚动方法，避免某些浏览器中scrollIntoView的兼容性问题
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: offsetTop - 1, // 减去80像素的偏移量，避免被可能的顶部导航栏或按钮遮挡
                    behavior: 'smooth'
                });
            }
        }
    });

    // 页面加载时显示品牌地图弹窗
    window.addEventListener('load', () => {
        generateBrandMap();
        showBrandMap();
    });

    // 生成单个主分类的展示区域
    function generateMainCategorySection(mainCategory) {
        // 检查主分类是否已加载
        if (loadedCategories.has(mainCategory)) {
            return;
        }
        
        const section = document.createElement('section');
        section.className = 'main-brand-section';
        section.id = mainCategory;
        
        // 只在第一个section添加品牌地图导航按钮
        const allSections = document.querySelectorAll('.main-brand-section');
        if (allSections.length === 0) {
            const brandMapBtn = document.createElement('button');
            brandMapBtn.textContent = '国货品牌分类导航';
            brandMapBtn.className = 'brand-map-btn';
            brandMapBtn.style.cssText = '';
            
            // 按钮点击事件
            brandMapBtn.addEventListener('click', () => {
                generateBrandMap();
                showBrandMap();
            });
            
            section.appendChild(brandMapBtn);
        }
        
        // 主分类标题使用h2标签
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'main-section-title';
        sectionTitle.textContent = mainCategory;
        
        section.appendChild(sectionTitle);
        
        // 获取主分类下的所有子分类
        const subCategories = Object.keys(window.brandData[mainCategory]);
        
        // 遍历所有子分类
        subCategories.forEach(subCategory => {
            const subSection = document.createElement('div');
            subSection.className = 'sub-category-section';
            subSection.id = `${mainCategory}-${subCategory}`;
            
            // 子分类标题
            const subSectionTitle = document.createElement('h3');
            subSectionTitle.className = 'sub-section-title';
            
            // 解析主标题和副标题
            let mainTitle, subTitle;
            if (subCategory.includes('|')) {
                const parts = subCategory.split('|');
                mainTitle = parts[0].trim();
                subTitle = parts[1].trim();
            } else {
                mainTitle = subCategory;
                subTitle = '平价口碑国货，品质安心有保证';
            }
            
            // 设置主标题文本
            subSectionTitle.textContent = mainTitle;
            
            // 创建并添加副标题span元素
            const subTitleSpan = document.createElement('span');
            subTitleSpan.textContent = subTitle;
            subSectionTitle.appendChild(subTitleSpan);
            
            const brandGrid = document.createElement('div');
            brandGrid.className = 'brand-grid';
            
            // 获取子分类下的所有品牌
            const brands = brandData[mainCategory][subCategory];
            
            if (brands && brands.length > 0) {
                brands.forEach(brand => {
                    createBrandCard(brandGrid, brand, mainCategory, subCategory);
                });
            } else {
                // 没有品牌数据时显示提示信息
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.textContent = '暂无品牌数据';
                brandGrid.appendChild(emptyState);
            }
            
            subSection.appendChild(subSectionTitle);
            subSection.appendChild(brandGrid);
            section.appendChild(subSection);
        });
        
        brandSections.appendChild(section);
        
        // 标记该主分类已加载
        loadedCategories.add(mainCategory);
    
        // 为新加载的部分添加进入动画
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // 触发重排后设置最终状态
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 50);
    }

    // 生成品牌展示区域
    function generateBrandSections() {
        brandSections.innerHTML = '';
        loadedCategories.clear();
        currentLoadedIndex = 0;
        
        // 初始只加载第一个主分类
        if (allMainCategories.length > 0) {
            generateMainCategorySection(allMainCategories[0]);
        }
    }

    // 实现搜索功能
    function search(query) {
        query = query.trim().toLowerCase();
        
        // 如果搜索词为空，则返回
        if (!query) {
            searchResults.classList.remove('active');
            return;
        }
        
        // 清空搜索结果
        searchResults.innerHTML = '';
        
        // 显示加载动画
        const loading = document.createElement('div');
        loading.className = 'search-loading';
        loading.innerHTML = '<div class="loading-spinner"></div><p>搜索中...</p>';
        searchResults.appendChild(loading);
        
        // 模拟搜索延迟，提高用户体验
        setTimeout(() => {
            // 清空搜索结果
            searchResults.innerHTML = '';
            
            const resultsGrid = document.createElement('div');
            resultsGrid.className = 'brand-grid';
            
            let hasResults = false;
            
            // 搜索逻辑 - 适配新的数据结构
            allMainCategories.forEach(mainCategory => {
                const mainCategoryLower = mainCategory.toLowerCase();
                
                // 遍历主分类下的所有子分类
                Object.keys(window.brandData[mainCategory]).forEach(subCategory => {
                    const subCategoryLower = subCategory.toLowerCase();
                    const brands = window.brandData[mainCategory][subCategory];
                    
                    if (brands && Array.isArray(brands)) {
                        brands.forEach(brand => {
                            const brandNameLower = brand.name?.toLowerCase() || '';
                            const descriptionLower = brand.description?.toLowerCase() || '';
                            
                            if (mainCategoryLower.includes(query) || 
                                subCategoryLower.includes(query) ||
                                brandNameLower.includes(query) || 
                                descriptionLower.includes(query)) {
                                
                                hasResults = true;
                                
                                const brandCard = document.createElement('div');
                                brandCard.className = 'brand-card';
                                
                                // 创建brandcontent1（上半部分）
                                const brandContent1 = document.createElement('div');
                                brandContent1.className = 'brand-content1';
                                
                                const brandLogo = document.createElement('div');
                                brandLogo.className = 'brand-logo';
                                
                                // 尝试创建img元素加载logo
                                const logoImg = document.createElement('img');
                                logoImg.src = brand.logo || '';
                                logoImg.alt = `${brand.name} logo`;
                                logoImg.style.maxWidth = '100%';
                                logoImg.style.maxHeight = '100%';
                                
                                // 图片加载成功事件
                                logoImg.onload = function() {
                                    brandLogo.textContent = '';
                                    brandLogo.appendChild(logoImg);
                                };
                                
                                // 图片加载失败事件（回退到首字母）
                                logoImg.onerror = function() {
                                    brandLogo.textContent = brand.name.charAt(0);
                                };
                                
                                // 如果有logo路径，直接添加图片元素到容器
                                if (brand.logo) {
                                    brandLogo.appendChild(logoImg);
                                } else {
                                    // 没有logo时显示首字母
                                    brandLogo.textContent = brand.name.charAt(0);
                                }
                                
                                const brandName = document.createElement('h3');
                                brandName.className = 'brand-name';
                                // 高亮搜索词
                                brandName.innerHTML = highlightText(brand.name, query);
                                
                                const brandFounded = document.createElement('p');
                                brandFounded.className = 'brand-founded';
                                brandFounded.innerHTML = highlightText(brand.founded ? `${brand.founded}成立` : '成立时间未知', query);
                                
                                const brandHonors = document.createElement('p');
                                brandHonors.className = 'brand-description';
                                brandHonors.innerHTML = highlightText(brand.honors || '暂无荣誉信息', query);
                                
                                // 创建右侧内容容器
                                const brandContent1Right = document.createElement('div');
                                brandContent1Right.className = 'brand-content1-right';
                                brandContent1Right.appendChild(brandName);
                                brandContent1Right.appendChild(brandFounded);
                                brandContent1Right.appendChild(brandHonors);
                                
                                // 将左侧logo和右侧内容添加到brandContent1
                                brandContent1.appendChild(brandLogo);
                                brandContent1.appendChild(brandContent1Right);
                                
                                // 创建brandcontent2（下半部分）
                                const brandContent2 = document.createElement('div');
                                brandContent2.className = 'brand-content2';
                                
                                // 添加品牌口碑
                                const brandReputation = document.createElement('p');
                                brandReputation.className = 'brand-reputation';
                                brandReputation.innerHTML = highlightText(brand.reputation || '暂无口碑信息', query);
                                brandContent2.appendChild(brandReputation);
                                
                                // 添加商品信息（如果有）
                                if (brand.products && brand.products.length > 0) {
                                    const productsContainer = document.createElement('div');
                                    productsContainer.className = 'brand-products';
                                    
                                    const productsTitle = document.createElement('h4');
                                    productsTitle.className = 'products-title';
                                    productsTitle.textContent = '热销商品：';
                                    productsContainer.appendChild(productsTitle);
                                    
                                    const productsList = document.createElement('ul');
                                    productsList.className = 'products-list';
                                    
                                    brand.products.forEach(product => {
                                        const productItem = document.createElement('li');
                                        productItem.className = 'product-item';
                                        
                                        // 创建商品基本信息容器
                                        const productBasicInfo = document.createElement('div');
                                        productBasicInfo.className = 'product-basic-info';
                                        
                                        const productName = document.createElement('span');
                                        productName.className = 'product-name';
                                        productName.innerHTML = highlightText(product.name, query);
                                        
                                        const productSpec = document.createElement('span');
                                        productSpec.className = 'product-spec';
                                        productSpec.textContent = product.spec;
                                        
                                        const productPrice = document.createElement('span');
                                        productPrice.className = 'product-price';
                                        productPrice.textContent = product.price;
                                        
                                        const productFeature = document.createElement('span');
                                        productFeature.className = 'product-feature';
                                        productFeature.innerHTML = highlightText(product.feature, query);
                                        
                                        productBasicInfo.appendChild(productName);
                                        productBasicInfo.appendChild(productSpec);
                                        productBasicInfo.appendChild(productPrice);
                                        productItem.appendChild(productBasicInfo);
                                        productItem.appendChild(productFeature);
                                        productsList.appendChild(productItem);
                                    });
                                    
                                    productsContainer.appendChild(productsList);
                                    brandContent2.appendChild(productsContainer);
                                }
                                
                                // 添加详情按钮
                                const detailsBtn = document.createElement('button');
                                detailsBtn.className = 'details-btn';
                                detailsBtn.textContent = '详情';
                                detailsBtn.onclick = function() {
                                    showBrandDetails(brand);
                                };
                                
                                // 将详情按钮添加到brandContent2
                                brandContent2.appendChild(detailsBtn);
                                
                                // 将两个内容版块添加到brandCard
                                brandCard.appendChild(brandContent1);
                                brandCard.appendChild(brandContent2);
                                
                                resultsGrid.appendChild(brandCard);
                            }
                        });
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
            
        }, 300);
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
        logoImg.style.maxWidth = '100%';
        logoImg.style.maxHeight = '100%';
        
        logoImg.onload = function() {
            brandLogo.textContent = '';
            brandLogo.appendChild(logoImg);
        };
        logoImg.onerror = function() {
            brandLogo.textContent = brand.name.charAt(0);
        };
        
        // 如果有logo路径，直接添加图片元素到容器
        if (brand.logo) {
            brandLogo.appendChild(logoImg);
        } else {
            // 没有logo时显示首字母
            brandLogo.textContent = brand.name.charAt(0);
        }
        
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
    
    // 默认给第一个子分类添加active类（如果存在）
    const firstSubCategory = document.querySelector('.sub-category-link');
    if (firstSubCategory) {
        firstSubCategory.classList.add('active');
        // 滚动到active元素，使其位于屏幕顶部30%的位置
        setTimeout(() => {
            scrollToActiveElement(firstSubCategory);
        }, 100);
    }

    // 滚动到active元素的函数，使其位于屏幕顶部30%的位置
    function scrollToActiveElement(activeElement) {
        if (!activeElement) return;
        
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;
        
        // 计算目标滚动位置：元素顶部距离减去屏幕高度的30%
        const elementTop = activeElement.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const targetPosition = sidebar.scrollTop + elementTop - (viewportHeight * 0.3);
        
        // 平滑滚动
        sidebar.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // 初始检查滚动位置
    handleScroll();
});