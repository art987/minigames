# 节日贺卡DIY工具

这是一个免登录免注册的小工具，用来DIY生成各种节日贺卡，并用html2canvas的方式来实现用户下载贺卡图片的功能。

## 功能特点

- 初始对话框要求用户填写要送贺卡人的昵称，默认已填写"亲爱的宝贝"
- 贺卡选择页面，支持按主题（生日、新年、情人节、感恩节等）筛选
- 贺卡编辑页面，可自定义：
  - 收卡人昵称
  - 背景图片
  - 祝福语（支持从模板选择或自定义输入）
  - 署名（可选）
  - 日期（默认当前日期，可修改）
- 生成并下载贺卡图片功能（使用html2canvas实现）

## 安装和使用

1. 将本项目放在您的web服务器上
2. 确保已创建images目录并添加贺卡背景图片
3. 打开浏览器访问index.html即可开始使用

## 图片资源准备

为了让工具正常工作，您需要在postcard目录下创建images文件夹，并添加以下图片资源：

### 缩略图（用于贺卡选择页面）
- birthday1_thumb.jpg
- birthday2_thumb.jpg
- newyear1_thumb.jpg
- newyear2_thumb.jpg
- valentine1_thumb.jpg
- thanksgiving1_thumb.jpg

### 完整背景图（用于贺卡编辑和生成）
- birthday1.jpg
- birthday2.jpg
- newyear1.jpg
- newyear2.jpg
- valentine1.jpg
- thanksgiving1.jpg

> 提示：如果没有实际图片，您可以使用SVG格式的占位图代替

## 技术说明

- 使用HTML、CSS和JavaScript开发
- 使用html2canvas库实现图片生成和下载功能
- 响应式设计，支持各种屏幕尺寸

## 注意事项

- 本工具在浏览器端运行，不会保存用户的任何信息
- 为了获得最佳的图片质量，建议在生成贺卡时使用清晰的背景图片
- 下载的贺卡图片格式为PNG

## License

MIT