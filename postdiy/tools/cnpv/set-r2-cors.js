// 一次性脚本：为 R2 桶配置 CORS（允许浏览器直传 PUT）
const { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } = require('@aws-sdk/client-s3');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function main() {
  const Bucket = process.env.R2_BUCKET_NAME;
  await s3.send(new PutBucketCorsCommand({
    Bucket,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedOrigins: ['*'],
          AllowedMethods: ['PUT'],
          AllowedHeaders: ['*'],
          ExposeHeaders: ['ETag'],
          MaxAgeSeconds: 3600,
        },
      ],
    },
  }));
  const cur = await s3.send(new GetBucketCorsCommand({ Bucket }));
  console.log('✅ CORS 已配置:', JSON.stringify(cur.CORSRules, null, 2));
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
