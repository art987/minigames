/**
 * 扫描多个子目录生成 files.json
 * 运行: node gen-files.js
 */
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const filesPerDir = {};

// 扫描每个子目录（排除 node_modules, .git, libs）
const excludeDirs = new Set(['node_modules', '.git', 'libs']);
const subdirs = fs.readdirSync(baseDir).filter(name => {
    const full = path.join(baseDir, name);
    return fs.statSync(full).isDirectory() && !excludeDirs.has(name) && !name.startsWith('.');
});

for (const dir of subdirs) {
    const full = path.join(baseDir, dir);
    const items = fs.readdirSync(full)
        .filter(f => f.toLowerCase().endsWith('.gif'))
        .map(f => ({
            name: f,
            path: `${dir}/${f}`,
            size: fs.statSync(path.join(full, f)).size
        }))
        .sort((a, b) => {
            const numA = parseInt(a.name) || Infinity;
            const numB = parseInt(b.name) || Infinity;
            if (numA !== numB) return numA - numB;
            return a.name.localeCompare(b.name);
        });
    if (items.length > 0) {
        filesPerDir[dir] = items;
    }
}

fs.writeFileSync(
    path.join(baseDir, 'files.json'),
    JSON.stringify({ dirs: Object.keys(filesPerDir), files: filesPerDir }, null, 2)
);

const total = Object.values(filesPerDir).reduce((s, arr) => s + arr.length, 0);
console.log(`已生成 files.json: ${Object.keys(filesPerDir).length} 个目录，共 ${total} 个 GIF`);
for (const [dir, items] of Object.entries(filesPerDir)) {
    console.log(`  ${dir}/: ${items.length} 个`);
}
