// 小吃配方网站功能
class RecipeApp {
    constructor() {
        this.currentPrimaryCategory = null;
        this.currentSecondaryCategory = null;
        this.init();
    }

    init() {
        // 初始化一级分类
        this.renderPrimaryCategories();
        // 默认显示第一个一级分类
        if (recipesData.categories.length > 0) {
            this.selectPrimaryCategory(recipesData.categories[0].id);
        }
    }

    // 渲染一级分类
    renderPrimaryCategories() {
        const primaryCategoriesEl = document.getElementById('primaryCategories');
        primaryCategoriesEl.innerHTML = '';

        recipesData.categories.forEach(category => {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'category-item';
            categoryEl.dataset.categoryId = category.id;
            categoryEl.innerHTML = `
                <div class="category-icon">${category.icon}</div>
                <div class="category-name">${category.name}</div>
            `;
            categoryEl.addEventListener('click', () => {
                this.selectPrimaryCategory(category.id);
            });
            primaryCategoriesEl.appendChild(categoryEl);
        });
    }

    // 选择一级分类
    selectPrimaryCategory(categoryId) {
        // 更新当前选中的一级分类
        this.currentPrimaryCategory = recipesData.categories.find(cat => cat.id === categoryId);
        this.currentSecondaryCategory = null;

        // 更新一级分类的选中状态
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-category-id="${categoryId}"]`).classList.add('active');

        // 渲染二级分类
        this.renderSecondaryCategories();
    }

    // 渲染二级分类
    renderSecondaryCategories() {
        const secondaryCategoriesEl = document.getElementById('secondaryCategories');
        secondaryCategoriesEl.innerHTML = '';

        if (!this.currentPrimaryCategory) return;

        // 添加"全部"选项
        const allSubcategoryEl = document.createElement('button');
        allSubcategoryEl.className = 'subcategory-btn active';
        allSubcategoryEl.dataset.subcategoryId = 'all';
        allSubcategoryEl.textContent = '全部';
        allSubcategoryEl.addEventListener('click', () => {
            this.selectSecondaryCategory('all');
        });
        secondaryCategoriesEl.appendChild(allSubcategoryEl);

        // 添加二级分类选项
        this.currentPrimaryCategory.subcategories.forEach(subcategory => {
            const subcategoryEl = document.createElement('button');
            subcategoryEl.className = 'subcategory-btn';
            subcategoryEl.dataset.subcategoryId = subcategory.id;
            subcategoryEl.textContent = subcategory.name;
            subcategoryEl.addEventListener('click', () => {
                this.selectSecondaryCategory(subcategory.id);
            });
            secondaryCategoriesEl.appendChild(subcategoryEl);
        });

        // 默认显示全部配方
        this.selectSecondaryCategory('all');
    }

    // 选择二级分类
    selectSecondaryCategory(subcategoryId) {
        // 更新当前选中的二级分类
        if (subcategoryId === 'all') {
            this.currentSecondaryCategory = null;
        } else {
            this.currentSecondaryCategory = this.currentPrimaryCategory.subcategories.find(sub => sub.id === subcategoryId);
        }

        // 更新二级分类的选中状态
        document.querySelectorAll('.subcategory-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-subcategory-id="${subcategoryId}"]`).classList.add('active');

        // 渲染配方列表
        this.renderRecipes();
    }

    // 渲染配方列表
    renderRecipes() {
        const recipesGridEl = document.getElementById('recipesGrid');
        recipesGridEl.innerHTML = '';

        if (!this.currentPrimaryCategory) return;

        let recipes = [];

        // 根据选中的二级分类筛选配方
        if (this.currentSecondaryCategory) {
            recipes = this.currentSecondaryCategory.recipes;
        } else {
            // 显示所有二级分类的配方
            this.currentPrimaryCategory.subcategories.forEach(subcategory => {
                recipes = recipes.concat(subcategory.recipes);
            });
        }

        // 渲染配方卡片
        recipes.forEach(recipe => {
            const recipeCardEl = this.createRecipeCard(recipe);
            recipesGridEl.appendChild(recipeCardEl);
        });
    }

    // 创建配方卡片
    createRecipeCard(recipe) {
        const cardEl = document.createElement('div');
        cardEl.className = 'recipe-card';
        cardEl.innerHTML = `
            <h3 class="recipe-title">${recipe.name}</h3>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-ingredients">
                <h4>食材：</h4>
                <ul>
                    ${recipe.ingredients.slice(0, 3).map(ingredient => `<li>${ingredient}</li>`).join('')}
                    ${recipe.ingredients.length > 3 ? `<li class="more-ingredients">+${recipe.ingredients.length - 3} 种食材</li>` : ''}
                </ul>
            </div>
            <button class="recipe-details-btn" data-recipe-id="${recipe.id}">查看详情</button>
        `;

        // 添加查看详情事件
        cardEl.querySelector('.recipe-details-btn').addEventListener('click', () => {
            this.showRecipeDetails(recipe);
        });

        return cardEl;
    }

    // 显示配方详情
    showRecipeDetails(recipe) {
        // 创建详情模态框
        const modalEl = document.createElement('div');
        modalEl.className = 'modal';
        modalEl.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>${recipe.name}</h2>
                <p>${recipe.description}</p>
                
                <div class="modal-section">
                    <h3>食材</h3>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>制作步骤</h3>
                    <ol class="steps-list">
                        ${recipe.steps.map((step, index) => `<li>${index + 1}. ${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `;

        // 添加关闭事件
        modalEl.querySelector('.close-btn').addEventListener('click', () => {
            modalEl.remove();
        });

        // 点击模态框外部关闭
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) {
                modalEl.remove();
            }
        });

        // 添加到页面
        document.body.appendChild(modalEl);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new RecipeApp();
});