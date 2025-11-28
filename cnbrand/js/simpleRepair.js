const fs = require('fs');
const path = require('path');

// 读取文件内容
const brandDataPath = path.join(__dirname, 'brandData.js');
let content;

try {
    content = fs.readFileSync(brandDataPath, 'utf8');
    console.log('文件读取成功！');
} catch (err) {
    console.error('读取文件失败:', err.message);
    process.exit(1);
}

// 只处理前几个品牌，使用更精确的字符串匹配
console.log('开始修复...');

// 修复百雀羚
let fixed百雀羚 = false;
while (content.includes('{name: "百雀羚", logo: "images/skincare/logos/百雀羚.png", logo: "images/skincare/logos/百雀羚.png"')) {
    content = content.replace('{name: "百雀羚", logo: "images/skincare/logos/百雀羚.png", logo: "images/skincare/logos/百雀羚.png"', '{name: "百雀羚", logo: "logos/skincare/baiqueling.png"');
    fixed百雀羚 = true;
    console.log('已修复百雀羚');
}

// 修复相宜本草
let fixed相宜本草 = false;
while (content.includes('{name: "相宜本草", logo: "images/skincare/logos/相宜本草.png", logo: "images/skincare/logos/相宜本草.png"')) {
    content = content.replace('{name: "相宜本草", logo: "images/skincare/logos/相宜本草.png", logo: "images/skincare/logos/相宜本草.png"', '{name: "相宜本草", logo: "logos/skincare/xiangyibencao.png"');
    fixed相宜本草 = true;
    console.log('已修复相宜本草');
}

// 修复丁家宜
let fixed丁家宜 = false;
while (content.includes('{name: "丁家宜", logo: "images/skincare/logos/丁家宜.png", logo: "images/skincare/logos/丁家宜.png"')) {
    content = content.replace('{name: "丁家宜", logo: "images/skincare/logos/丁家宜.png", logo: "images/skincare/logos/丁家宜.png"', '{name: "丁家宜", logo: "logos/skincare/dingjiayi.png"');
    fixed丁家宜 = true;
    console.log('已修复丁家宜');
}

// 确保window对象引用
if (!content.includes('window.brandData = brandData;')) {
    content += '\n\n// 导出数据到全局window对象\nwindow.brandData = brandData;';
    console.log('已添加window对象引用');
}

// 保存文件
if (fixed百雀羚 || fixed相宜本草 || fixed丁家宜) {
    try {
        fs.writeFileSync(brandDataPath, content, 'utf8');
        console.log('修复完成！已成功更新文件。');
    } catch (err) {
        console.error('保存文件失败:', err.message);
    }
} else {
    console.log('未检测到需要修复的内容。');
}