// 壁纸数据管理文件
const wallpaperData = [
  {
    id: 1,
    title: "自然风光壁纸系列",
    description: "精选全球最美自然风光，让您的桌面充满大自然的宁静与力量。",
    createTime: "2025-10-20",
    tags: ["自然", "风景", "高清", "山水"],
    folder: "wallpaper1",
    images: [
      { id: 1, name: "1.jpg", preview: "images/wallpaper1/1.jpg", download: "images/wallpaper1/1.jpg" },
      { id: 2, name: "2.jpg", preview: "images/wallpaper1/2.jpg", download: "images/wallpaper1/2.jpg" },
      { id: 3, name: "3.jpg", preview: "images/wallpaper1/3.jpg", download: "images/wallpaper1/3.jpg" },
      { id: 4, name: "4.jpg", preview: "images/wallpaper1/4.jpg", download: "images/wallpaper1/4.jpg" },
      { id: 5, name: "5.jpg", preview: "images/wallpaper1/5.jpg", download: "images/wallpaper1/5.jpg" }
    ]
  },
  {
    id: 2,
    title: "抽象艺术壁纸系列",
    description: "现代抽象艺术风格壁纸，为您的设备带来独特的视觉体验和艺术气息。",
    createTime: "2025-10-22",
    tags: ["抽象", "艺术", "现代", "几何"],
    folder: "wallpaper2",
    images: [
      { id: 1, name: "1.jpg", preview: "images/wallpaper2/1.jpg", download: "images/wallpaper2/1.jpg" },
      { id: 2, name: "2.jpg", preview: "images/wallpaper2/2.jpg", download: "images/wallpaper2/2.jpg" },
      { id: 3, name: "3.jpg", preview: "images/wallpaper2/3.jpg", download: "images/wallpaper2/3.jpg" },
      { id: 4, name: "4.jpg", preview: "images/wallpaper2/4.jpg", download: "images/wallpaper2/4.jpg" }
    ]
  },
  {
    id: 3,
    title: "星空宇宙壁纸系列",
    description: "探索浩瀚宇宙的神秘与美丽，让璀璨星光点亮您的屏幕。",
    createTime: "2025-10-25",
    tags: ["星空", "宇宙", "天文", "夜景"],
    folder: "wallpaper3",
    images: [
      { id: 1, name: "1.jpg", preview: "images/wallpaper3/1.jpg", download: "images/wallpaper3/1.jpg" },
      { id: 2, name: "2.jpg", preview: "images/wallpaper3/2.jpg", download: "images/wallpaper3/2.jpg" },
      { id: 3, name: "3.jpg", preview: "images/wallpaper3/3.jpg", download: "images/wallpaper3/3.jpg" },
      { id: 4, name: "4.jpg", preview: "images/wallpaper3/4.jpg", download: "images/wallpaper3/4.jpg" },
      { id: 5, name: "5.jpg", preview: "images/wallpaper3/5.jpg", download: "images/wallpaper3/5.jpg" },
      { id: 6, name: "6.jpg", preview: "images/wallpaper3/6.jpg", download: "images/wallpaper3/6.jpg" }
    ]
  }
];

// 按创建时间倒序排序（最新的在前）
wallpaperData.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));

// 导出数据
export default wallpaperData;