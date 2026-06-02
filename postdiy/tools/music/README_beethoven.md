# 🎹 贝多芬经典钢琴合集

> Ludwig van Beethoven (1770-1827) · 12 首传世钢琴名作

## 📁 文件结构

```
music/
├── beethoven.html              # 播放页面（主入口）
├── script-beethoven.js         # 播放列表配置脚本
├── beethoven_music_info.json   # 作品信息（JSON 格式）
├── download_beethoven.ps1      # 公版录音自动下载脚本
├── README_beethoven.md         # 本说明文档
│
├── img/beethoven/              # 12 张 SVG 封面图
│   ├── 01-fuer-elise.svg       # 致爱丽丝
│   ├── 02-moonlight.svg        # 月光奏鸣曲
│   ├── 03-pathetique.svg       # 悲怆奏鸣曲
│   ├── 04-pastoral.svg         # 田园奏鸣曲
│   ├── 05-appassionata.svg     # 热情奏鸣曲
│   ├── 06-bagatelles.svg       # 巴格泰莱舞曲
│   ├── 07-minuet.svg           # 小步舞曲
│   ├── 08-turkish-march.svg    # 土耳其进行曲
│   ├── 09-f-minor.svg          # F小调奏鸣曲
│   ├── 10-d-major.svg          # D大调奏鸣曲
│   ├── 11-emperor.svg          # 皇帝协奏曲
│   └── 12-eroica.svg           # 普罗姆修斯变奏曲
│
└── mp3/beethoven/              # 12 个 MP3 音频文件（需下载）
    ├── 01-fuer-elise.mp3
    ├── 02-moonlight.mp3
    ├── 03-pathetique.mp3
    ├── 04-pastoral.mp3
    ├── 05-appassionata.mp3
    ├── 06-bagatelles.mp3
    ├── 07-minuet.mp3
    ├── 08-turkish-march.mp3
    ├── 09-f-minor.mp3
    ├── 10-d-major.mp3
    ├── 11-emperor.mp3
    └── 12-eroica.mp3
```

## 🎼 12 首曲目列表

| # | 中文名 | 英文名 | 作品号 | 创作年份 |
|---|--------|--------|--------|----------|
| 1 | 致爱丽丝 | Für Elise | WoO 59 | 1810 |
| 2 | 月光奏鸣曲 | Moonlight Sonata | Op.27 No.2 | 1801 |
| 3 | 悲怆奏鸣曲 | Pathétique Sonata | Op.13 | 1798 |
| 4 | 田园奏鸣曲 | Pastoral Sonata | Op.28 | 1801 |
| 5 | 热情奏鸣曲 | Appassionata Sonata | Op.57 | 1805 |
| 6 | 巴格泰莱舞曲 | Bagatelles | Op.119 | 1822 |
| 7 | 小步舞曲 | Minuet in G | WoO 10 No.2 | 1795 |
| 8 | 土耳其进行曲 | Turkish March | Op.113 | 1811 |
| 9 | F小调奏鸣曲 | Sonata No.1 | Op.2 No.1 | 1795 |
| 10 | D大调奏鸣曲 | Sonata No.7 | Op.10 No.3 | 1798 |
| 11 | 皇帝协奏曲 | Emperor Concerto | Op.73 | 1809 |
| 12 | 普罗姆修斯变奏曲 | Eroica Variations | Op.35 | 1802 |

## ⚠️ 关于音频文件

由于技术限制，**音频文件无法由 AI 直接下载到您的电脑**。已提供以下解决方案：

### 方案一：自动下载脚本（推荐）
1. 右键点击 `download_beethoven.ps1`
2. 选择"使用 PowerShell 运行"
3. 等待自动从 Internet Archive 下载公版录音

### 方案二：手动下载公版录音
访问以下公版音频资源（贝多芬作品已属公有领域，所有录音均合法）：

| 资源 | 网址 | 说明 |
|------|------|------|
| **Internet Archive** | https://archive.org/details/audio | 全球最大公版音频库 |
| **IMSLP** | https://imslp.org/wiki/Category:Beethoven | 国际乐谱图书馆 |
| **Musopen** | https://musopen.org/music/ | 大量公版古典音乐 |
| **Free Music Archive** | https://freemusicarchive.org/genre/Classical/ | 自由音乐档案 |
| **Public Domain Music** | https://www.publicdomainproject.org/ | 公共领域项目 |

下载后重命名文件为对应格式（如 `01-fuer-elise.mp3`）并放入 `mp3/beethoven/` 目录。

### 方案三：使用自己拥有的音频
将任何 mp3 格式的贝多芬钢琴录音重命名后放入 `mp3/beethoven/` 目录即可。

## 🚀 使用方法

1. **下载音频文件**（参考上述方案）
2. **打开页面**：浏览器访问 `beethoven.html`
3. **享受音乐**：点击 ▶ 按钮开始播放

## ✨ 页面特色

- 🎨 **12 张原创 SVG 封面**：每张都根据作品意境独立设计
- ✨ **粒子特效**：播放时自动触发视觉效果
- 📱 **响应式设计**：手机/平板/PC 全适配
- 🔁 **多种播放模式**：单曲循环/全部循环/随机播放
- 🎚️ **完整播放控制**：进度条/音量/上一首/下一首

## 📜 版权声明

- 贝多芬作品本身已属**公有领域**（作曲家 1827 年逝世，版权保护期已过）
- 所有收录的公版录音均来自 **Internet Archive** 等公共领域资源
- SVG 封面图为本项目原创，遵循 MIT 协议

## 🛠️ 技术栈

- 原生 HTML5 + CSS3 + JavaScript
- jQuery 1.7.2 + jQuery UI 1.8.17
- 复用现有 music 项目的播放器框架
- 完全离线运行（除音频文件外无需任何外部资源）

---

💡 **提示**：如果遇到音频无法播放，请检查浏览器控制台是否报 CORS 错误。本地文件直接打开（`file://` 协议）应无此问题。
