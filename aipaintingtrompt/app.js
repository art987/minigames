// AI绘图指令生成工具功能
class AIPaintingTool {
    constructor() {
        this.selectedTags = new Set(); // 存储已选择的标签ID
        this.init();
    }

    init() {
        // 渲染所有分类及标签
        this.renderCategories();
        // 绑定事件监听器
        this.bindEventListeners();
    }

    // 渲染所有分类及标签
    renderCategories() {
        const categoriesContainer = document.getElementById('categoriesContainer');
        const sidebarCategories = document.getElementById('sidebarCategories');
        categoriesContainer.innerHTML = '';
        sidebarCategories.innerHTML = '';

        aiPaintingData.categories.forEach(category => {
            // 生成右侧分类内容
            const categoryEl = document.createElement('div');
            categoryEl.className = 'category';
            categoryEl.id = `category-${category.id}`;
            categoryEl.innerHTML = `
                <h3 class="category-title">${category.name}</h3>
                <div class="tags-container" data-category-id="${category.id}" data-selection-mode="${category.selectionMode}">
                    ${category.tags.map(tag => `
                        <label class="tag-item">
                            <input 
                                type="checkbox" 
                                class="tag-checkbox" 
                                data-tag-id="${tag.id}" 
                                data-tag-name="${tag.name}" 
                                ${this.selectedTags.has(tag.id) ? 'checked' : ''}
                            >
                            <span class="tag-label">${tag.name}</span>
                        </label>
                    `).join('')}
                </div>
            `;
            categoriesContainer.appendChild(categoryEl);

            // 生成左侧分类导航
            const sidebarCategoryEl = document.createElement('div');
            sidebarCategoryEl.className = 'sidebar-category';
            sidebarCategoryEl.dataset.categoryId = category.id;
            sidebarCategoryEl.textContent = category.name;
            sidebarCategoryEl.addEventListener('click', () => {
                // 滚动到对应的右侧分类
                const targetCategory = document.getElementById(`category-${category.id}`);
                targetCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            sidebarCategories.appendChild(sidebarCategoryEl);
        });

        // 绑定标签选择事件
        this.bindTagEvents();
        // 绑定滚动监听事件
        this.bindScrollEvent();
    }

    // 绑定标签选择事件
    bindTagEvents() {
        document.querySelectorAll('.tag-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const tagId = e.target.dataset.tagId;
                const categoryContainer = e.target.closest('.tags-container');
                const selectionMode = categoryContainer.dataset.selectionMode;

                if (selectionMode === 'single') {
                    // 单选模式：取消同分类下其他所有标签
                    categoryContainer.querySelectorAll('.tag-checkbox').forEach(cb => {
                        cb.checked = false;
                        this.selectedTags.delete(cb.dataset.tagId);
                    });
                    // 选中当前标签
                    e.target.checked = true;
                    this.selectedTags.add(tagId);
                } else {
                    // 多选模式：直接切换选中状态
                    if (e.target.checked) {
                        this.selectedTags.add(tagId);
                    } else {
                        this.selectedTags.delete(tagId);
                    }
                }
            });
        });
    }

    // 绑定滚动监听事件
    bindScrollEvent() {
        const contentEl = document.getElementById('content');
        contentEl.addEventListener('scroll', () => {
            this.updateActiveCategory();
        });
    }

    // 更新当前激活的分类
    updateActiveCategory() {
        const contentEl = document.getElementById('content');
        const sidebarCategories = document.querySelectorAll('.sidebar-category');
        const categories = document.querySelectorAll('.category');
        
        let activeCategoryId = null;
        const contentTop = contentEl.scrollTop;
        const contentHeight = contentEl.clientHeight;
        
        categories.forEach(category => {
            const categoryTop = category.offsetTop;
            const categoryHeight = category.offsetHeight;
            
            // 检查分类是否在可视区域内
            if (categoryTop <= contentTop + 100 && categoryTop + categoryHeight > contentTop) {
                activeCategoryId = category.id.replace('category-', '');
            }
        });
        
        // 更新左侧导航的激活状态
        sidebarCategories.forEach(sidebarCategory => {
            if (sidebarCategory.dataset.categoryId === activeCategoryId) {
                sidebarCategory.classList.add('active');
            } else {
                sidebarCategory.classList.remove('active');
            }
        });
    }

    // 绑定事件监听器
    bindEventListeners() {
        // 清空选择按钮
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearSelection();
        });

        // 随机生成按钮
        document.getElementById('randomBtn').addEventListener('click', () => {
            this.generateRandomTags();
        });

        // 查看绘图指令按钮
        document.getElementById('viewBtn').addEventListener('click', () => {
            this.showResultModal();
        });

        // 关闭弹窗按钮
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideResultModal();
        });

        // 点击弹窗外部关闭
        document.getElementById('resultModal').addEventListener('click', (e) => {
            if (e.target.id === 'resultModal') {
                this.hideResultModal();
            }
        });

        // 复制指令按钮
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyInstruction();
        });
    }

    // 清空选择
    clearSelection() {
        this.selectedTags.clear();
        // 更新所有复选框状态
        document.querySelectorAll('.tag-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    // 随机生成标签
    generateRandomTags() {
        this.clearSelection();

        aiPaintingData.categories.forEach(category => {
            if (category.tags.length === 0) return;

            if (category.selectionMode === 'single') {
                // 单选模式：随机选择一个标签
                const randomIndex = Math.floor(Math.random() * category.tags.length);
                const selectedTag = category.tags[randomIndex];
                this.selectedTags.add(selectedTag.id);
                // 更新复选框状态
                const checkbox = document.querySelector(`[data-tag-id="${selectedTag.id}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            } else {
                // 多选模式：随机选择1-3个标签
                const maxTags = Math.min(3, category.tags.length);
                const numTags = Math.floor(Math.random() * maxTags) + 1;
                
                // 随机打乱标签顺序
                const shuffledTags = [...category.tags].sort(() => Math.random() - 0.5);
                // 选择前numTags个标签
                for (let i = 0; i < numTags; i++) {
                    const selectedTag = shuffledTags[i];
                    this.selectedTags.add(selectedTag.id);
                    // 更新复选框状态
                    const checkbox = document.querySelector(`[data-tag-id="${selectedTag.id}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                }
            }
        });
    }

    // 显示结果弹窗
    showResultModal() {
        const selectedTagsEl = document.getElementById('selectedTags');
        selectedTagsEl.innerHTML = '';

        if (this.selectedTags.size === 0) {
            selectedTagsEl.innerHTML = '<p class="no-tags">请先选择标签</p>';
        } else {
            // 生成已选择标签的HTML
            this.selectedTags.forEach(tagId => {
                const tagName = this.getTagNameById(tagId);
                if (tagName) {
                    const tagEl = document.createElement('div');
                    tagEl.className = 'selected-tag-item';
                    tagEl.dataset.tagId = tagId;
                    tagEl.innerHTML = `
                        <span class="selected-tag-name">${tagName}</span>
                        <button class="remove-tag-btn" title="移除标签">
                            <span class="remove-icon">×</span>
                        </button>
                    `;
                    // 绑定移除标签事件
                    tagEl.querySelector('.remove-tag-btn').addEventListener('click', () => {
                        this.removeTag(tagId);
                    });
                    selectedTagsEl.appendChild(tagEl);
                }
            });
        }

        // 显示弹窗
        document.getElementById('resultModal').style.display = 'flex';
    }

    // 隐藏结果弹窗
    hideResultModal() {
        document.getElementById('resultModal').style.display = 'none';
    }

    // 根据标签ID获取标签名称
    getTagNameById(tagId) {
        for (const category of aiPaintingData.categories) {
            const tag = category.tags.find(t => t.id === tagId);
            if (tag) {
                return tag.name;
            }
        }
        return null;
    }

    // 移除标签
    removeTag(tagId) {
        // 从已选择标签中移除
        this.selectedTags.delete(tagId);
        // 更新复选框状态
        const checkbox = document.querySelector(`[data-tag-id="${tagId}"]`);
        if (checkbox) {
            checkbox.checked = false;
        }
        // 更新弹窗
        this.showResultModal();
    }

    // 复制指令
    copyInstruction() {
        if (this.selectedTags.size === 0) {
            alert('请先选择标签');
            return;
        }

        // 生成指令文本
        const tagNames = [];
        this.selectedTags.forEach(tagId => {
            const tagName = this.getTagNameById(tagId);
            if (tagName) {
                tagNames.push(tagName);
            }
        });
        const instructionText = tagNames.join('、');

        // 复制到剪贴板
        navigator.clipboard.writeText(instructionText).then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '已复制';
            copyBtn.disabled = true;
            
            // 3秒后恢复
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.disabled = false;
            }, 3000);
        }).catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
        });
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new AIPaintingTool();
});