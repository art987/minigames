// 检查数据合理性的脚本
const fs = require('fs');

// 读取data.js文件内容
const dataContent = fs.readFileSync('./data.js', 'utf8');

// 提取aiPaintingData对象
const dataMatch = dataContent.match(/const aiPaintingData = (\{[\s\S]*?\});/);
if (!dataMatch) {
    console.error('无法找到aiPaintingData对象');
    process.exit(1);
}

// 解析数据
const aiPaintingData = eval(`(${dataMatch[1]})`);
const categories = aiPaintingData.categories;

console.log('=== 数据检查结果 ===\n');

// 检查分类ID重复
console.log('1. 检查分类ID重复:');
const categoryIds = new Set();
const duplicateCategoryIds = [];

categories.forEach(category => {
    if (categoryIds.has(category.id)) {
        duplicateCategoryIds.push(category.id);
    } else {
        categoryIds.add(category.id);
    }
});

if (duplicateCategoryIds.length > 0) {
    console.log(`   ❌ 发现重复的分类ID: ${duplicateCategoryIds.join(', ')}`);
} else {
    console.log('   ✅ 没有发现重复的分类ID');
}

console.log('');

// 检查标签ID重复
console.log('2. 检查标签ID重复:');
const tagIds = new Set();
const duplicateTagIds = [];

categories.forEach(category => {
    category.tags.forEach(tag => {
        if (tagIds.has(tag.id)) {
            duplicateTagIds.push(tag.id);
        } else {
            tagIds.add(tag.id);
        }
    });
});

if (duplicateTagIds.length > 0) {
    console.log(`   ❌ 发现重复的标签ID: ${duplicateTagIds.join(', ')}`);
} else {
    console.log('   ✅ 没有发现重复的标签ID');
}

console.log('');

// 检查分类内标签ID重复
console.log('3. 检查分类内标签ID重复:');
const categoryInternalDuplicates = [];

categories.forEach(category => {
    const internalTagIds = new Set();
    category.tags.forEach(tag => {
        if (internalTagIds.has(tag.id)) {
            categoryInternalDuplicates.push({
                categoryId: category.id,
                categoryName: category.name,
                tagId: tag.id
            });
        } else {
            internalTagIds.add(tag.id);
        }
    });
});

if (categoryInternalDuplicates.length > 0) {
    console.log('   ❌ 发现分类内重复的标签ID:');
    categoryInternalDuplicates.forEach(dup => {
        console.log(`      分类: ${dup.categoryName} (${dup.categoryId}), 标签ID: ${dup.tagId}`);
    });
} else {
    console.log('   ✅ 没有发现分类内重复的标签ID');
}

console.log('');

// 检查标签名称重复
console.log('4. 检查标签名称重复（同一分类内）:');
const categoryTagNamesDuplicates = [];

categories.forEach(category => {
    const tagNames = new Set();
    category.tags.forEach(tag => {
        if (tagNames.has(tag.name)) {
            categoryTagNamesDuplicates.push({
                categoryId: category.id,
                categoryName: category.name,
                tagName: tag.name
            });
        } else {
            tagNames.add(tag.name);
        }
    });
});

if (categoryTagNamesDuplicates.length > 0) {
    console.log('   ❌ 发现同一分类内重复的标签名称:');
    categoryTagNamesDuplicates.forEach(dup => {
        console.log(`      分类: ${dup.categoryName} (${dup.categoryId}), 标签名称: ${dup.tagName}`);
    });
} else {
    console.log('   ✅ 没有发现同一分类内重复的标签名称');
}

console.log('');

// 分析不合理的标签
console.log('5. 分析可能不合理的标签:');
const unreasonableTags = [];

categories.forEach(category => {
    category.tags.forEach(tag => {
        // 检查标签名称是否为空或只有空格
        if (!tag.name.trim()) {
            unreasonableTags.push({
                categoryId: category.id,
                categoryName: category.name,
                tagId: tag.id,
                tagName: tag.name,
                reason: '标签名称为空或只有空格'
            });
        }
        
        // 检查标签名称是否包含特殊字符或看起来不合理
        if (/[<>{}\[\]()]/g.test(tag.name)) {
            unreasonableTags.push({
                categoryId: category.id,
                categoryName: category.name,
                tagId: tag.id,
                tagName: tag.name,
                reason: '标签名称包含特殊字符'
            });
        }
        
        // 检查标签ID格式是否规范
        if (!/^[a-z0-9-]+$/.test(tag.id)) {
            unreasonableTags.push({
                categoryId: category.id,
                categoryName: category.name,
                tagId: tag.id,
                tagName: tag.name,
                reason: '标签ID格式不规范（应只包含小写字母、数字和连字符）'
            });
        }
        
        // 检查标签是否与分类不相关
        // 这里可以添加更多的业务规则检查
    });
});

if (unreasonableTags.length > 0) {
    console.log('   ❌ 发现可能不合理的标签:');
    unreasonableTags.forEach(tag => {
        console.log(`      分类: ${tag.categoryName}, 标签: ${tag.tagName} (${tag.tagId}), 原因: ${tag.reason}`);
    });
} else {
    console.log('   ✅ 没有发现明显不合理的标签');
}

console.log('\n=== 检查完成 ===');
