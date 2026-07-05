#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const LOCAL_IMAGES_DIR = process.env.LOCAL_IMAGES_DIR;
const R2_PREFIX = process.env.R2_PREFIX || '';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '6');

const args = process.argv.slice(2);
const opts = {
  dryRun: args.includes('--dry-run'),
  dir: (() => {
    const idx = args.indexOf('--dir');
    if (idx >= 0 && idx + 1 < args.length) {
      return args[idx + 1];
    }
    const eqArg = args.find(a => a.startsWith('--dir='));
    if (eqArg) {
      return eqArg.replace('--dir=', '');
    }
    return null;
  })(),
  delete: args.includes('--delete'),
  verbose: args.includes('--verbose'),
};

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.bmp': 'image/bmp',
    '.tif': 'image/tiff',
    '.tiff': 'image/tiff',
  };
  return map[ext] || 'application/octet-stream';
}

async function* walk(dir) {
  for (const entry of await fs.promises.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function getR2Files(s3Client, prefix = '') {
  const files = new Map();
  let continuationToken = null;
  do {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      Prefix: prefix,
      ContinuationToken: continuationToken,
    });
    const result = await s3Client.send(command);
    if (result.Contents) {
      for (const obj of result.Contents) {
        files.set(obj.Key, {
          size: obj.Size,
          lastModified: obj.LastModified,
        });
      }
    }
    continuationToken = result.NextContinuationToken;
  } while (continuationToken);
  return files;
}

async function uploadFile(s3Client, localPath, remotePath, dryRun) {
  try {
    const fileSize = (await fs.promises.stat(localPath)).size;
    const contentType = getContentType(localPath);
    const body = await fs.promises.readFile(localPath);

    if (dryRun) {
      return { status: 'dry-run', remotePath, fileSize };
    }

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: remotePath,
      Body: body,
      ContentType: contentType,
      ACL: 'public-read',
    });

    await s3Client.send(command);
    return { status: 'uploaded', remotePath, fileSize };
  } catch (err) {
    return { status: 'error', remotePath, error: err.message };
  }
}

async function deleteFile(s3Client, remotePath, dryRun) {
  try {
    if (dryRun) {
      return { status: 'dry-run-delete', remotePath };
    }

    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: remotePath,
    });

    await s3Client.send(command);
    return { status: 'deleted', remotePath };
  } catch (err) {
    return { status: 'error', remotePath, error: err.message };
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function main() {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_ENDPOINT || !LOCAL_IMAGES_DIR) {
    console.error('❌ 缺少配置，请检查 .env 文件');
    process.exit(1);
  }

  const localDir = path.resolve(LOCAL_IMAGES_DIR);
  if (!fs.existsSync(localDir)) {
    console.error(`❌ 本地目录不存在: ${localDir}`);
    process.exit(1);
  }

  const s3Client = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  console.log('========================================');
  console.log('  Cloudflare R2 图片同步工具');
  console.log('========================================');
  console.log('配置:');
  console.log(`  本地目录: ${localDir}`);
  console.log(`  R2 Bucket: ${R2_BUCKET_NAME}`);
  console.log(`  R2 Endpoint: ${R2_ENDPOINT}`);
  console.log(`  并发数: ${CONCURRENCY}`);
  console.log(`  模式: ${opts.dryRun ? '预览模式（不上传）' : '实际上传模式'}`);
  if (opts.dir) {
    console.log(`  只同步目录: ${opts.dir}`);
  }
  if (opts.delete) {
    console.log(`  删除模式: 会删除 R2 上本地不存在的文件`);
  }
  console.log('----------------------------------------');

  const localFiles = [];
  for await (const fullPath of walk(localDir)) {
    const relativePath = path.relative(localDir, fullPath).replace(/\\/g, '/');
    if (opts.dir && !relativePath.startsWith(opts.dir)) {
      continue;
    }
    const r2Key = R2_PREFIX ? `${R2_PREFIX}/${relativePath}` : relativePath;
    const stat = await fs.promises.stat(fullPath);
    localFiles.push({ fullPath, relativePath, r2Key, size: stat.size });
  }

  console.log(`找到本地文件: ${localFiles.length} 个`);

  if (localFiles.length === 0) {
    console.log('没有需要同步的文件');
    process.exit(0);
  }

  let r2Files = new Map();
  try {
    const prefix = R2_PREFIX ? (opts.dir ? `${R2_PREFIX}/${opts.dir}` : R2_PREFIX) : (opts.dir || '');
    r2Files = await getR2Files(s3Client, prefix);
    console.log(`R2 当前文件: ${r2Files.size} 个`);
  } catch (err) {
    console.warn(`获取 R2 文件列表失败: ${err.message}`);
  }

  const toUpload = [];
  const toUpdate = [];
  const r2Only = [];

  for (const { r2Key, size } of localFiles) {
    const r2File = r2Files.get(r2Key);
    if (!r2File) {
      toUpload.push({ r2Key, reason: '新增' });
    } else if (r2File.size !== size) {
      toUpdate.push({ r2Key, reason: `更新(本地:${size}字节, R2:${r2File.size}字节)` });
    }
  }

  const allToUpload = [...toUpload, ...toUpdate];

  if (opts.delete) {
    for (const key of r2Files.keys()) {
      const existsLocally = localFiles.some(f => f.r2Key === key);
      if (!existsLocally) {
        r2Only.push(key);
      }
    }
  }

  console.log(`待上传(新增): ${toUpload.length} 个`);
  console.log(`待上传(更新): ${toUpdate.length} 个`);
  if (opts.delete) {
    console.log(`待删除(R2独有): ${r2Only.length} 个`);
  }

  if (allToUpload.length === 0 && r2Only.length === 0) {
    console.log('✅ 本地和 R2 完全同步，无需操作');
    process.exit(0);
  }

  if (opts.dryRun) {
    console.log('\n=== 预览上传列表 ===');
    for (const item of allToUpload) {
      const file = localFiles.find(f => f.r2Key === item.r2Key);
      const size = file ? (fs.statSync(file.fullPath)).size : 0;
      console.log(`  [${item.reason}] ${item.r2Key} (${formatSize(size)})`);
    }
    if (opts.delete) {
      console.log('\n=== 预览删除列表 ===');
      for (const key of r2Only) {
        console.log(`  [删除] ${key}`);
      }
    }
    console.log('\n预览结束，未实际操作');
    process.exit(0);
  }

  let uploaded = 0;
  let failed = 0;
  let deleted = 0;
  let deletedFailed = 0;
  let totalSize = 0;

  console.log('\n开始上传...');

  for (let i = 0; i < allToUpload.length; i += CONCURRENCY) {
    const batch = allToUpload.slice(i, i + CONCURRENCY);
    const promises = batch.map(async item => {
      const { r2Key } = item;
      const file = localFiles.find(f => f.r2Key === r2Key);
      if (!file) return;
      const result = await uploadFile(s3Client, file.fullPath, r2Key, false);
      if (result.status === 'uploaded') {
        uploaded++;
        totalSize += result.fileSize;
        if (opts.verbose) {
          console.log(`  ✅ ${r2Key} (${formatSize(result.fileSize)})`);
        }
      } else {
        failed++;
        console.error(`  ❌ ${r2Key} - ${result.error}`);
      }
    });
    await Promise.all(promises);

    const progress = ((i + batch.length) / allToUpload.length * 100).toFixed(1);
    console.log(`进度: ${progress}% (${uploaded + failed}/${allToUpload.length})`);
  }

  if (opts.delete && r2Only.length > 0) {
    console.log('\n开始删除 R2 独有文件...');
    for (let i = 0; i < r2Only.length; i += CONCURRENCY) {
      const batch = r2Only.slice(i, i + CONCURRENCY);
      const promises = batch.map(async key => {
        const result = await deleteFile(s3Client, key, false);
        if (result.status === 'deleted') {
          deleted++;
          if (opts.verbose) {
            console.log(`  ✅ 删除 ${key}`);
          }
        } else {
          deletedFailed++;
          console.error(`  ❌ 删除 ${key} - ${result.error}`);
        }
      });
      await Promise.all(promises);

      const progress = ((i + batch.length) / r2Only.length * 100).toFixed(1);
      process.stdout.write(`\r删除进度: ${progress}% (${deleted + deletedFailed}/${r2Only.length})`);
    }
    console.log();
  }

  console.log('\n========================================');
  console.log('同步完成');
  console.log('========================================');
  console.log(`上传成功: ${uploaded} 个`);
  console.log(`上传失败: ${failed} 个`);
  console.log(`上传总大小: ${formatSize(totalSize)}`);
  if (opts.delete) {
    console.log(`删除成功: ${deleted} 个`);
    console.log(`删除失败: ${deletedFailed} 个`);
  }
  console.log('========================================');
}

main().catch(err => {
  console.error('同步过程中发生错误:', err);
  process.exit(1);
});
