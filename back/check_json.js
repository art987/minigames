const fs = require('fs');
const path = require('path');

// 读取文件内容
const filePath = path.join(__dirname, 'cnbrand', 'js', 'brandData.js');
const content = fs.readFileSync(filePath, 'utf8');

// 移除变量声明，只保留JSON部分
const jsonContent = content.replace(/^const brandData = /, '').replace(/;$/, '');

// 尝试解析JSON，捕获错误
console.log('开始验证JSON格式...');
try {
    const parsed = JSON.parse(jsonContent);
    console.log('JSON格式正确！');
    console.log('主分类数量:', Object.keys(parsed).length);
} catch (e) {
    console.error('JSON解析错误:', e.message);
    
    // 尝试定位错误位置
    let errorPosition = e.message.match(/position (\d+)/);
    if (errorPosition) {
        const pos = parseInt(errorPosition[1]);
        const lines = jsonContent.substring(0, pos).split('\n');
        const lineNumber = lines.length;
        const colNumber = lines[lines.length - 1].length + 1;
        console.log(`错误位置: 第 ${lineNumber} 行，第 ${colNumber} 列`);
        
        // 显示错误位置附近的代码
        const startLine = Math.max(0, lineNumber - 5);
        const endLine = Math.min(jsonContent.split('\n').length, lineNumber + 5);
        const context = jsonContent.split('\n').slice(startLine, endLine);
        console.log('错误上下文:');
        context.forEach((line, i) => {
            const actualLine = startLine + i + 1;
            console.log(`${actualLine}: ${line}`);
            if (actualLine === lineNumber) {
                console.log(' '.repeat(colNumber) + '^');
                console.log(' '.repeat(colNumber) + '|');
                console.log(' '.repeat(colNumber) + '错误在这里');
            }
        });
    }
}