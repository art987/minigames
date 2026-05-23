// 测试brandData.js的完整性
console.log('开始测试brandData.js...');
try {
    // 检查brandData是否存在
    if (typeof brandData === 'undefined') {
        console.error('错误: brandData未定义');
    } else {
        console.log('✓ brandData已定义');
        
        // 检查brandData是否为对象
        if (typeof brandData !== 'object' || brandData === null) {
            console.error('错误: brandData不是有效的对象');
        } else {
            console.log('✓ brandData是有效的对象');
            
            // 获取并显示所有主分类
            const mainCategories = Object.keys(brandData);
            console.log(`✓ 发现 ${mainCategories.length} 个主分类:`);
            mainCategories.forEach((mainCategory, index) => {
                const subCategories = brandData[mainCategory];
                if (typeof subCategories === 'object' && subCategories !== null) {
                    console.log(`  ${index + 1}. ${mainCategory}`);
                    
                    // 遍历子分类
                    const subCategoryNames = Object.keys(subCategories);
                    console.log(`    子分类 (${subCategoryNames.length} 个):`);
                    
                    subCategoryNames.forEach((subCategory, subIndex) => {
                        const brands = subCategories[subCategory];
                        if (Array.isArray(brands)) {
                            console.log(`      ${subIndex + 1}. ${subCategory} (${brands.length} 个品牌)`);
                            
                            // 检查前3个品牌的数据结构
                            const sampleBrands = brands.slice(0, Math.min(3, brands.length));
                            sampleBrands.forEach((brand) => {
                                if (brand.name) {
                                    console.log(`        - ${brand.name} (${brand.founded || '无成立时间'})`);
                                }
                            });
                        } else {
                            console.error(`      错误: ${subCategory} 不是有效的品牌数组`);
                        }
                    });
                } else {
                    console.error(`  错误: ${mainCategory} 不是有效的子分类对象`);
                }
            });
        }
    }
} catch (error) {
    console.error('在测试过程中发生错误:', error.message);
    console.error(error.stack);
}
console.log('测试完成');