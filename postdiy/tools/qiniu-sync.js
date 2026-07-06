const qiniu = require('qiniu');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const QINIU_ACCESS_KEY = process.env.QINIU_ACCESS_KEY;
const QINIU_SECRET_KEY = process.env.QINIU_SECRET_KEY;
const QINIU_BUCKET = process.env.QINIU_BUCKET || 'posterbg';
const QINIU_PREFIX = process.env.QINIU_PREFIX || 'images';

if (!QINIU_ACCESS_KEY || !QINIU_SECRET_KEY) {
  console.error('❌ 缺少七牛云凭证，请检查 .env 文件中的 QINIU_ACCESS_KEY 和 QINIU_SECRET_KEY');
  process.exit(1);
}

const mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY);
const config = new qiniu.conf.Config();
config.useHttpsDomain = true;
config.zone = qiniu.zone.Zone_z2;

const bucketManager = new qiniu.rs.BucketManager(mac, config);

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.bmp': 'image/bmp',
    '.ico': 'image/x-icon',
  };
  return types[ext] || 'application/octet-stream';
}

async function getQiniuFiles(prefix = '') {
  return new Promise((resolve, reject) => {
    const files = new Map();
    const listPrefix = prefix ? `${prefix}/` : '';
    const options = {
      prefix: listPrefix,
      limit: 1000,
    };

    const listFiles = (marker) => {
      if (marker) options.marker = marker;
      bucketManager.listPrefix(QINIU_BUCKET, options, (err, respBody, respInfo) => {
        if (err) {
          reject(err);
          return;
        }
        if (respInfo.statusCode === 200) {
          if (respBody.items) {
            for (const item of respBody.items) {
              files.set(item.key, {
                size: item.fsize,
                hash: item.hash,
                lastModified: new Date(item.putTime / 10000),
              });
            }
          }
          if (respBody.marker) {
            listFiles(respBody.marker);
          } else {
            resolve(files);
          }
        } else {
          reject(new Error(respBody.error || `状态码: ${respInfo.statusCode}`));
        }
      });
    };

    listFiles();
  });
}

function uploadFile(localPath, key, overwrite = true) {
  return new Promise((resolve, reject) => {
    const options = {
      scope: overwrite ? `${QINIU_BUCKET}:${key}` : QINIU_BUCKET,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    const uploadConfig = new qiniu.conf.Config();
    uploadConfig.useHttpsDomain = true;
    uploadConfig.zone = qiniu.zone.Zone_z2;

    const formUploader = new qiniu.form_up.FormUploader(uploadConfig);
    const putExtra = new qiniu.form_up.PutExtra();
    putExtra.mimeType = getContentType(localPath);

    formUploader.putFile(uploadToken, key, localPath, putExtra, (err, respBody, respInfo) => {
      if (err) {
        reject(err);
        return;
      }
      if (respInfo.statusCode === 200) {
        resolve({ status: 'uploaded', key, hash: respBody.hash });
      } else {
        reject(new Error(respBody.error || `状态码: ${respInfo.statusCode}`));
      }
    });
  });
}

async function* walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

module.exports = {
  getQiniuFiles,
  uploadFile,
  walk,
  formatSize,
  getContentType,
  QINIU_BUCKET,
  QINIU_PREFIX,
};

if (require.main === module) {
  (async () => {
    const CONCURRENCY = parseInt(process.env.CONCURRENCY || '6', 10);
    const LOCAL_IMAGES_DIR = process.env.LOCAL_IMAGES_DIR;

    if (!LOCAL_IMAGES_DIR) {
      console.error('❌ 缺少 LOCAL_IMAGES_DIR 环境变量');
      process.exit(1);
    }

    const args = process.argv.slice(2);
    const opts = {
      dir: null,
      dryRun: false,
      verbose: false,
      delete: false,
    };

    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--dir' && args[i + 1]) {
        opts.dir = args[i + 1];
        i++;
      } else if (args[i] === '--dry-run') {
        opts.dryRun = true;
      } else if (args[i] === '--verbose' || args[i] === '-v') {
        opts.verbose = true;
      } else if (args[i] === '--delete') {
        opts.delete = true;
      }
    }

    console.log('========================================');
    console.log('  七牛云 图片同步工具');
    console.log('========================================');
    console.log('配置:');
    console.log(`  本地目录: ${LOCAL_IMAGES_DIR}`);
    console.log(`  七牛 Bucket: ${QINIU_BUCKET}`);
    console.log(`  七牛域名: ${process.env.QINIU_DOMAIN}`);
    console.log(`  并发数: ${CONCURRENCY}`);
    if (opts.dryRun) console.log('  模式: 预览模式（不上传）');
    if (opts.dir) console.log(`  只同步目录: ${opts.dir}`);
    console.log('----------------------------------------');

    if (!fs.existsSync(LOCAL_IMAGES_DIR)) {
      console.error(`❌ 本地目录不存在: ${LOCAL_IMAGES_DIR}`);
      process.exit(1);
    }

    const localFiles = [];
    for await (const fullPath of walk(LOCAL_IMAGES_DIR)) {
      const relativePath = path.relative(LOCAL_IMAGES_DIR, fullPath).replace(/\\/g, '/');
      if (opts.dir && !relativePath.startsWith(opts.dir)) continue;
      const qiniuKey = QINIU_PREFIX ? `${QINIU_PREFIX}/${relativePath}` : relativePath;
      const stat = await fs.promises.stat(fullPath);
      localFiles.push({ fullPath, relativePath, qiniuKey, size: stat.size });
    }

    console.log(`找到本地文件: ${localFiles.length} 个`);

    if (localFiles.length === 0) {
      console.log('没有需要同步的文件');
      process.exit(0);
    }

    let qiniuFiles = new Map();
    try {
      const prefix = QINIU_PREFIX ? (opts.dir ? `${QINIU_PREFIX}/${opts.dir}` : QINIU_PREFIX) : (opts.dir || '');
      qiniuFiles = await getQiniuFiles(prefix);
      console.log(`七牛当前文件: ${qiniuFiles.size} 个`);
    } catch (err) {
      console.warn(`获取七牛文件列表失败: ${err.message}`);
    }

    const toUpload = [];
    const toUpdate = [];
    const qiniuOnly = [];

    for (const { qiniuKey, size } of localFiles) {
      const qiniuFile = qiniuFiles.get(qiniuKey);
      if (!qiniuFile) {
        toUpload.push({ qiniuKey, reason: '新增' });
      } else if (qiniuFile.size !== size) {
        toUpdate.push({ qiniuKey, reason: `更新(本地:${size}字节, 七牛:${qiniuFile.size}字节)` });
      }
    }

    const allToUpload = [...toUpload, ...toUpdate];

    if (opts.delete) {
      for (const key of qiniuFiles.keys()) {
        const existsLocally = localFiles.some(f => f.qiniuKey === key);
        if (!existsLocally) {
          qiniuOnly.push(key);
        }
      }
    }

    console.log(`待上传(新增): ${toUpload.length} 个`);
    console.log(`待上传(更新): ${toUpdate.length} 个`);
    if (opts.delete) {
      console.log(`待删除(七牛独有): ${qiniuOnly.length} 个`);
    }

    if (allToUpload.length === 0 && qiniuOnly.length === 0) {
      console.log('✅ 本地和七牛完全同步，无需操作');
      process.exit(0);
    }

    if (opts.dryRun) {
      console.log('\n=== 预览上传列表 ===');
      for (const item of allToUpload) {
        const file = localFiles.find(f => f.qiniuKey === item.qiniuKey);
        const size = file ? file.size : 0;
        console.log(`  [${item.reason}] ${item.qiniuKey} (${formatSize(size)})`);
      }
      if (opts.delete) {
        console.log('\n=== 预览删除列表 ===');
        for (const key of qiniuOnly) {
          console.log(`  [删除] ${key}`);
        }
      }
      console.log('\n预览结束，未实际操作');
      process.exit(0);
    }

    let uploaded = 0;
    let failed = 0;
    let totalSize = 0;

    console.log(`\n开始上传 (并发: ${CONCURRENCY})...`);

    for (let i = 0; i < allToUpload.length; i += CONCURRENCY) {
      const batch = allToUpload.slice(i, i + CONCURRENCY);
      const promises = batch.map(async (item) => {
        const { qiniuKey } = item;
        const file = localFiles.find(f => f.qiniuKey === qiniuKey);
        if (!file) return;
        try {
          await uploadFile(file.fullPath, qiniuKey, true);
          uploaded++;
          totalSize += file.size;
          if (opts.verbose) {
            console.log(`  ✅ ${qiniuKey} (${formatSize(file.size)})`);
          }
        } catch (err) {
          failed++;
          console.error(`  ❌ ${qiniuKey} - ${err.message}`);
        }
      });
      await Promise.all(promises);

      const progress = ((i + batch.length) / allToUpload.length * 100).toFixed(1);
      console.log(`进度: ${progress}% (${uploaded + failed}/${allToUpload.length})`);
    }

    let deleted = 0;
    if (opts.delete && qiniuOnly.length > 0) {
      console.log(`\n开始删除 R2 独有文件...`);
      for (let i = 0; i < qiniuOnly.length; i += 100) {
        const batch = qiniuOnly.slice(i, i + 100);
        const deleteOperations = batch.map(key => qiniu.rs.deleteOp(QINIU_BUCKET, key));
        await new Promise((resolve, reject) => {
          bucketManager.batch(deleteOperations, (err, respBody, respInfo) => {
            if (err) {
              reject(err);
              return;
            }
            deleted += batch.length;
            resolve();
          });
        });
      }
    }

    console.log('\n========================================');
    console.log('同步完成');
    console.log('========================================');
    console.log(`✅ 上传成功: ${uploaded} 个`);
    console.log(`❌ 上传失败: ${failed} 个`);
    console.log(`📊 上传总量: ${formatSize(totalSize)}`);
    if (opts.delete) {
      console.log(`🗑️  删除: ${deleted} 个`);
    }
    console.log(`🌐 访问域名: https://${process.env.QINIU_DOMAIN}/`);
  })();
}
