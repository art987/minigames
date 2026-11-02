/**
 * 生成 gifpics 目录下的 GIF 文件清单
 * 运行: node gen-files.js
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'gifpics');
const files = fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith('.gif'))
    .map(f => ({
        name: f,
        path: 'gifpics/' + f,
        size: fs.statSync(path.join(dir, f)).size
    }))
    .sort((a, b) => {
        // 按数字部分排序，没有数字的放后面
        const numA = parseInt(a.name) || Infinity;
        const numB = parseInt(b.name) || Infinity;
        if (numA !== numB) return numA - numB;
        return a.name.localeCompare(b.name);
    });

fs.writeFileSync(path.join(dir, 'files.json'), JSON.stringify(files, null, 2));
console.log(`已生成 files.json, 共 ${files.length} 个 GIF 文件`);
