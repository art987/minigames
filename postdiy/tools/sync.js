const fs = require('fs');
const path = require('path');

const ENABLE_R2 = process.env.ENABLE_R2 !== 'false';
const ENABLE_QINIU = process.env.ENABLE_QINIU !== 'false';

const args = process.argv.slice(2);
const passArgs = args.filter(a => !a.startsWith('--cloud='));
const cloudFilter = args.find(a => a.startsWith('--cloud='));
const onlyCloud = cloudFilter ? cloudFilter.split('=')[1] : null;

const opts = {
  dir: null,
  dryRun: false,
  verbose: false,
  delete: false,
};

for (let i = 0; i < passArgs.length; i++) {
  if (passArgs[i] === '--dir' && passArgs[i + 1]) {
    opts.dir = passArgs[i + 1];
    i++;
  } else if (passArgs[i] === '--dry-run') {
    opts.dryRun = true;
  } else if (passArgs[i] === '--verbose' || passArgs[i] === '-v') {
    opts.verbose = true;
  } else if (passArgs[i] === '--delete') {
    opts.delete = true;
  }
}

function buildArgs(script) {
  const a = ['tools/' + script];
  if (opts.dir) { a.push('--dir', opts.dir); }
  if (opts.dryRun) a.push('--dry-run');
  if (opts.verbose) a.push('--verbose');
  if (opts.delete) a.push('--delete');
  return a;
}

async function runScript(scriptName, label) {
  console.log('\n');
  console.log('########################################################');
  console.log(`#  ${label}`);
  console.log('########################################################\n');

  return new Promise((resolve) => {
    const { spawn } = require('child_process');
    const child = spawn('node', buildArgs(scriptName), {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: process.env,
    });

    child.on('close', (code) => {
      resolve(code);
    });
  });
}

(async () => {
  console.log('========================================');
  console.log('  双云图片同步工具 (Cloudflare R2 + 七牛云)');
  console.log('========================================');
  console.log('配置:');
  console.log(`  Cloudflare R2: ${ENABLE_R2 ? '✅ 启用' : '❌ 禁用'}`);
  console.log(`  七牛云:        ${ENABLE_QINIU ? '✅ 启用' : '❌ 禁用'}`);
  if (onlyCloud) console.log(`  仅同步: ${onlyCloud}`);
  if (opts.dryRun) console.log('  模式: 预览模式（不上传）');
  if (opts.dir) console.log(`  只同步目录: ${opts.dir}`);
  console.log('----------------------------------------');

  const results = {};

  if ((onlyCloud === 'r2' || (!onlyCloud && ENABLE_R2))) {
    if (onlyCloud && onlyCloud !== 'r2') {
      // skip
    } else {
      const code = await runScript('r2-sync.js', '同步到 Cloudflare R2');
      results.r2 = code;
    }
  }

  if ((onlyCloud === 'qiniiu' || onlyCloud === 'qiniu' || (!onlyCloud && ENABLE_QINIU))) {
    if (onlyCloud && onlyCloud !== 'qiniiu' && onlyCloud !== 'qiniu') {
      // skip
    } else {
      const code = await runScript('qiniu-sync.js', '同步到 七牛云');
      results.qiniu = code;
    }
  }

  console.log('\n');
  console.log('========================================');
  console.log('  双云同步总结');
  console.log('========================================');
  if (results.r2 !== undefined) {
    console.log(`Cloudflare R2: ${results.r2 === 0 ? '✅ 成功' : '❌ 失败 (' + results.r2 + ')'}`);
  }
  if (results.qiniu !== undefined) {
    console.log(`七牛云:        ${results.qiniu === 0 ? '✅ 成功' : '❌ 失败 (' + results.qiniu + ')'}`);
  }
})();
