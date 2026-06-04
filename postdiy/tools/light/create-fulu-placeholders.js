// 符箓壁纸占位图片文件名列表
const fuluFiles = [
  '1-xiaozai.png',
  '2-caishen.png',
  '3-hehe.png',
  '4-hushen.png',
  '5-jiankang.png',
  '6-liudingliujia.png',
  '7-pingan.png',
  '8-quxie.png',
  '9-taisui.png',
  '10-wenchang.png',
  '11-changshou.png',
  '12-zhaoguiren.png',
  '13-zhaotaohua.png',
  '14-zhenzhai.png',
  '15-zhuanyun.png'
];

// 创建占位图片提示
console.log('符箓壁纸占位文件名已生成：');
fuluFiles.forEach((file, index) => {
  console.log(`${index + 1}. ${file}`);
});
console.log('\n请将实际的符箓PNG图片放到 assets/fulu/ 目录下');
