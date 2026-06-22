// 图片加载配置
var imageConfig = {
  mode: 'cloudflare-first',
  cloudflareBaseUrl: 'https://pub-30c6f2f6d33a4cf0b874265d80d1e682.r2.dev/',
  localBaseUrl: '',
  failedImages: new Set(),
  timeout: 5000,
  
  getImageUrl: function(localPath) {
    const cloudflareUrl = this.cloudflareBaseUrl + localPath;
    const localUrl = this.localBaseUrl + localPath;
    
    switch (this.mode) {
      case 'cloudflare-only':
        return cloudflareUrl;
      case 'local-only':
        return localUrl;
      case 'cloudflare-first':
      default:
        if (this.failedImages.has(cloudflareUrl)) {
          return localUrl;
        }
        return cloudflareUrl;
    }
  },
  
  getFallbackUrl: function(localPath) {
    if (this.mode === 'cloudflare-first') {
      const cloudflareUrl = this.cloudflareBaseUrl + localPath;
      this.failedImages.add(cloudflareUrl);
      return this.localBaseUrl + localPath;
    }
    return null;
  },
  
  handleImageError: function(img, localPath) {
    const fallbackUrl = this.getFallbackUrl(localPath);
    if (fallbackUrl && img.src !== fallbackUrl) {
      img.src = fallbackUrl;
      return true;
    }
    return false;
  },
  
  preloadImage: function(localPath) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const primaryUrl = this.getImageUrl(localPath);
      let timeoutId = null;
      let resolved = false;
      
      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
      
      const finishResolve = (url) => {
        if (resolved) return;
        resolved = true;
        cleanup();
        resolve(url);
      };
      
      const finishReject = (error) => {
        if (resolved) return;
        resolved = true;
        cleanup();
        reject(error);
      };
      
      const loadFallback = () => {
        const fallbackUrl = this.getFallbackUrl(localPath);
        if (fallbackUrl) {
          const fallbackImg = new Image();
          fallbackImg.onload = () => finishResolve(fallbackUrl);
          fallbackImg.onerror = () => finishReject(new Error('Failed to load image: ' + localPath));
          fallbackImg.src = fallbackUrl;
        } else {
          finishReject(new Error('Failed to load image: ' + localPath));
        }
      };
      
      img.onload = () => finishResolve(primaryUrl);
      img.onerror = () => loadFallback();
      
      timeoutId = setTimeout(() => {
        console.log('图片预加载超时，切换到本地:', primaryUrl);
        loadFallback();
      }, this.timeout);
      
      img.src = primaryUrl;
    });
  },
  
  setMode: function(mode) {
    if (['cloudflare-first', 'local-only', 'cloudflare-only'].includes(mode)) {
      this.mode = mode;
      this.failedImages.clear();
      console.log('图片加载模式已切换为:', mode);
    }
  }
};

// 模板数据
// 海报模板数据
var templates = {
  // 1月模板
  '1月': [
    {
      id: 'yuandan-2024-001',
      name: '元旦快乐',
      thumbnail: 'images/yuandan/thumbnails/1.jpg',
      image: 'images/yuandan/1.png',
      months: [1],
      festivals: ['元旦'],
      description: '元旦快乐主题海报模板',
      type: '节日'
    },
    {
      id: 'yuandan-2024-002',
      name: '元旦喜庆',
      thumbnail: 'images/yuandan/thumbnails/2.jpg',
      image: 'images/yuandan/2.png',
      months: [1],
      festivals: ['元旦'],
      description: '元旦喜庆主题海报模板',
      type: '节日'
    },
    {
      id: 'yuandan-2024-003',
      name: '元旦迎新',
      thumbnail: 'images/yuandan/thumbnails/3.jpg',
      image: 'images/yuandan/3.png',
      months: [1],
      festivals: ['元旦'],
      description: '元旦迎新主题海报模板',
      type: '节日'
    },
    {
      id: 'yuandan-2024-004',
      name: '元旦祝福',
      thumbnail: 'images/yuandan/thumbnails/4.jpg',
      image: 'images/yuandan/4.png',
      months: [1],
      festivals: ['元旦'],
      description: '元旦祝福主题海报模板',
      type: '节日'
    },
    {
      id: 'yuandan-2024-005',
      name: '元旦吉祥',
      thumbnail: 'images/yuandan/thumbnails/5.jpg',
      image: 'images/yuandan/5.png',
      months: [1],
      festivals: ['元旦'],
      description: '元旦吉祥主题海报模板',
      type: '节日'
    },
    {
      id: 'yuandan-2024-006',
      name: '元旦团圆',
      thumbnail: 'images/yuandan/thumbnails/6.jpg',
      image: 'images/yuandan/6.png',
      months: [1],
      festivals: ['元旦'],
      description: '元旦团圆主题海报模板',
      type: '节日'
    },
    {
      id: 'yuandan-2024-007',
      name: '元旦安康',
      thumbnail: 'images/yuandan/thumbnails/7.jpg',
      image: 'images/yuandan/7.png',
      months: [1],
      festivals: ['元旦'],
      description: '元旦安康主题海报模板',
      type: '节日'
    },
    {
      id: 'xiaohan-2024-001',
      name: '小寒养生',
      thumbnail: 'images/xiaohan/thumbnails/1.jpg',
      image: 'images/xiaohan/1.png',
      months: [1],
      festivals: ['小寒'],
      description: '小寒节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaohan-2024-002',
      name: '小寒保暖',
      thumbnail: 'images/xiaohan/thumbnails/2.jpg',
      image: 'images/xiaohan/2.png',
      months: [1],
      festivals: ['小寒'],
      description: '小寒节气保暖主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaohan-2024-003',
      name: '小寒节气',
      thumbnail: 'images/xiaohan/thumbnails/3.jpg',
      image: 'images/xiaohan/3.png',
      months: [1],
      festivals: ['小寒'],
      description: '小寒节气主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaohan-2024-004',
      name: '小寒冷冬',
      thumbnail: 'images/xiaohan/thumbnails/4.jpg',
      image: 'images/xiaohan/4.png',
      months: [1],
      festivals: ['小寒'],
      description: '小寒冷冬主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaohan-2024-005',
      name: '小寒梅花',
      thumbnail: 'images/xiaohan/thumbnails/5.jpg',
      image: 'images/xiaohan/5.png',
      months: [1],
      festivals: ['小寒'],
      description: '小寒梅花主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaohan-2024-006',
      name: '小寒吉祥',
      thumbnail: 'images/xiaohan/thumbnails/6.jpg',
      image: 'images/xiaohan/6.png',
      months: [1],
      festivals: ['小寒'],
      description: '小寒吉祥主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaohan-2024-007',
      name: '小寒安康',
      thumbnail: 'images/xiaohan/thumbnails/7.jpg',
      image: 'images/xiaohan/7.png',
      months: [1],
      festivals: ['小寒'],
      description: '小寒安康主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-001',
      name: '大寒温暖',
      thumbnail: 'images/dahan/thumbnails/1.jpg',
      image: 'images/dahan/1.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒节气温暖主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-002',
      name: '大寒养生',
      thumbnail: 'images/dahan/thumbnails/2.jpg',
      image: 'images/dahan/2.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-003',
      name: '大寒冷冬',
      thumbnail: 'images/dahan/thumbnails/3.jpg',
      image: 'images/dahan/3.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒冷冬主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-004',
      name: '大寒节气',
      thumbnail: 'images/dahan/thumbnails/4.jpg',
      image: 'images/dahan/4.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒节气主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-005',
      name: '大寒瑞雪',
      thumbnail: 'images/dahan/thumbnails/5.jpg',
      image: 'images/dahan/5.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒瑞雪主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-006',
      name: '大寒迎春',
      thumbnail: 'images/dahan/thumbnails/6.jpg',
      image: 'images/dahan/6.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒迎春主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-007',
      name: '大寒吉祥',
      thumbnail: 'images/dahan/thumbnails/7.jpg',
      image: 'images/dahan/7.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒吉祥主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-008',
      name: '大寒祝福',
      thumbnail: 'images/dahan/thumbnails/8.jpg',
      image: 'images/dahan/8.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒祝福主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-009',
      name: '大寒团圆',
      thumbnail: 'images/dahan/thumbnails/9.jpg',
      image: 'images/dahan/9.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒团圆主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-010',
      name: '大寒安康',
      thumbnail: 'images/dahan/thumbnails/10.jpg',
      image: 'images/dahan/10.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒安康主题海报模板',
      type: '节气'
    },
    {
      id: 'dahan-2024-011',
      name: '大寒如意',
      thumbnail: 'images/dahan/thumbnails/11.jpg',
      image: 'images/dahan/11.png',
      months: [1],
      festivals: ['大寒'],
      description: '大寒如意主题海报模板',
      type: '节气'
    },
    {
      id: 'labajie-2024-002',
      name: '腊八粥香',
      thumbnail: 'images/labajie/thumbnails/2.jpg',
      image: 'images/labajie/2.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八粥香主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-003',
      name: '腊八祈福',
      thumbnail: 'images/labajie/thumbnails/3.jpg',
      image: 'images/labajie/3.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节祈福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-004',
      name: '腊八温暖',
      thumbnail: 'images/labajie/thumbnails/4.jpg',
      image: 'images/labajie/4.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节温暖主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-005',
      name: '腊八习俗',
      thumbnail: 'images/labajie/thumbnails/5.jpg',
      image: 'images/labajie/5.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节传统习俗主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-006',
      name: '腊八团圆',
      thumbnail: 'images/labajie/thumbnails/6.jpg',
      image: 'images/labajie/6.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节团圆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-007',
      name: '腊八养生',
      thumbnail: 'images/labajie/thumbnails/7.jpg',
      image: 'images/labajie/7.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节养生主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-008',
      name: '腊八祝福',
      thumbnail: 'images/labajie/thumbnails/8.jpg',
      image: 'images/labajie/8.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-009',
      name: '腊八飘香',
      thumbnail: 'images/labajie/thumbnails/9.jpg',
      image: 'images/labajie/9.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节粥香四溢主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-010',
      name: '腊八吉祥',
      thumbnail: 'images/labajie/thumbnails/10.jpg',
      image: 'images/labajie/10.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节吉祥主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-011',
      name: '腊八文化',
      thumbnail: 'images/labajie/thumbnails/11.jpg',
      image: 'images/labajie/11.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节传统文化主题海报模板',
      type: '传统节日'
    },
    {
      id: 'labajie-2024-012',
      name: '腊八感恩',
      thumbnail: 'images/labajie/thumbnails/12.jpg',
      image: 'images/labajie/12.jpg',
      months: [1],
      festivals: ['腊八节'],
      description: '腊八节感恩主题海报模板',
      type: '传统节日'
    },
    {
      id: 'xiaonian-2024-001',
      name: '小年吉祥',
      thumbnail: 'images/xiaonian/thumbnails/1.jpg',
      image: 'images/xiaonian/1.jpg',
      months: [2],
      festivals: ['小年'],
      description: '小年传统节日海报模板',
      type: '传统节日'
    },
    {
      id: 'xiaonian-2024-002',
      name: '小年除尘',
      thumbnail: 'images/xiaonian/thumbnails/2.jpg',
      image: 'images/xiaonian/2.jpg',
      months: [2],
      festivals: ['小年'],
      description: '小年除尘习俗海报模板',
      type: '传统节日'
    },
    {
      id: 'xiaonian-2024-003',
      name: '小年祭灶',
      thumbnail: 'images/xiaonian/thumbnails/3.jpg',
      image: 'images/xiaonian/3.jpg',
      months: [2],
      festivals: ['小年'],
      description: '小年祭灶王爷海报模板',
      type: '传统节日'
    },
    {
      id: 'xiaonian-2024-004',
      name: '小年团圆',
      thumbnail: 'images/xiaonian/thumbnails/4.jpg',
      image: 'images/xiaonian/4.jpg',
      months: [2],
      festivals: ['小年'],
      description: '小年团圆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'xiaonian-2024-005',
      name: '小年扫房',
      thumbnail: 'images/xiaonian/thumbnails/5.jpg',
      image: 'images/xiaonian/5.jpg',
      months: [2],
      festivals: ['小年'],
      description: '小年扫房备年海报模板',
      type: '传统节日'
    },
    {
      id: 'xiaonian-2024-006',
      name: '小年糖瓜',
      thumbnail: 'images/xiaonian/thumbnails/6.jpg',
      image: 'images/xiaonian/6.jpg',
      months: [2],
      festivals: ['小年'],
      description: '小年糖瓜祭灶海报模板',
      type: '传统节日'
    },
    {
      id: 'xiaonian-2024-007',
      name: '小年迎春',
      thumbnail: 'images/xiaonian/thumbnails/7.jpg',
      image: 'images/xiaonian/7.jpg',
      months: [2],
      festivals: ['小年'],
      description: '小年迎接春节海报模板',
      type: '传统节日'
    }
  ],

  // 2月模板
  '2月': [
    {
      id: 'chunjie-2024-001',
      name: '春节喜庆',
      thumbnail: 'images/chunjie/thumbnails/1.jpg',
      image: 'images/chunjie/1.png',
      months: [2],
      festivals: ['春节'],
      description: '春节喜庆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chunjie-2024-002',
      name: '春节团圆',
      thumbnail: 'images/chunjie/thumbnails/2.jpg',
      image: 'images/chunjie/2.png',
      months: [2],
      festivals: ['春节'],
      description: '春节团圆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chunjie-2024-003',
      name: '春节吉祥',
      thumbnail: 'images/chunjie/thumbnails/3.jpg',
      image: 'images/chunjie/3.png',
      months: [2],
      festivals: ['春节'],
      description: '春节吉祥主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chunjie-2024-004',
      name: '春节祝福',
      thumbnail: 'images/chunjie/thumbnails/4.jpg',
      image: 'images/chunjie/4.png',
      months: [2],
      festivals: ['春节'],
      description: '春节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chunjie-2024-005',
      name: '春节快乐',
      thumbnail: 'images/chunjie/thumbnails/5.jpg',
      image: 'images/chunjie/5.png',
      months: [2],
      festivals: ['春节'],
      description: '春节快乐主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chunjie-2024-006',
      name: '春节安康',
      thumbnail: 'images/chunjie/thumbnails/6.jpg',
      image: 'images/chunjie/6.png',
      months: [2],
      festivals: ['春节'],
      description: '春节安康主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chunjie-2024-007',
      name: '春节如意',
      thumbnail: 'images/chunjie/thumbnails/7.jpg',
      image: 'images/chunjie/7.png',
      months: [2],
      festivals: ['春节'],
      description: '春节如意主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chunjie-2024-008',
      name: '春节幸福',
      thumbnail: 'images/chunjie/thumbnails/8.jpg',
      image: 'images/chunjie/8.png',
      months: [2],
      festivals: ['春节'],
      description: '春节幸福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chunjie-2024-009',
      name: '春节迎新',
      thumbnail: 'images/chunjie/thumbnails/9.jpg',
      image: 'images/chunjie/9.png',
      months: [2],
      festivals: ['春节'],
      description: '春节迎新主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-001',
      name: '元宵节灯会',
      thumbnail: 'images/yuanxiao/thumbnails/1.jpg',
      image: 'images/yuanxiao/1.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节花灯主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-002',
      name: '元宵节汤圆',
      thumbnail: 'images/yuanxiao/thumbnails/2.jpg',
      image: 'images/yuanxiao/2.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节汤圆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-003',
      name: '元宵节团圆',
      thumbnail: 'images/yuanxiao/thumbnails/3.jpg',
      image: 'images/yuanxiao/3.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节团圆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-004',
      name: '元宵节猜灯谜',
      thumbnail: 'images/yuanxiao/thumbnails/4.jpg',
      image: 'images/yuanxiao/4.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节猜灯谜主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-005',
      name: '元宵节舞龙',
      thumbnail: 'images/yuanxiao/thumbnails/5.jpg',
      image: 'images/yuanxiao/5.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节舞龙主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-006',
      name: '元宵节舞狮',
      thumbnail: 'images/yuanxiao/thumbnails/6.jpg',
      image: 'images/yuanxiao/6.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节舞狮主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-007',
      name: '元宵节喜庆',
      thumbnail: 'images/yuanxiao/thumbnails/7.jpg',
      image: 'images/yuanxiao/7.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节喜庆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-008',
      name: '元宵节祝福',
      thumbnail: 'images/yuanxiao/thumbnails/8.jpg',
      image: 'images/yuanxiao/8.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-009',
      name: '元宵节吉祥',
      thumbnail: 'images/yuanxiao/thumbnails/9.jpg',
      image: 'images/yuanxiao/9.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节吉祥主题海报模板',
      type: '传统节日'
    },
    {
      id: 'yuanxiao-2024-010',
      name: '元宵节快乐',
      thumbnail: 'images/yuanxiao/thumbnails/10.jpg',
      image: 'images/yuanxiao/10.png',
      months: [2],
      festivals: ['元宵节'],
      description: '元宵节快乐主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qingrenjie-2024-001',
      name: '浪漫情人节',
      thumbnail: 'images/qingrenjie/thumbnails/1.jpg',
      image: 'images/qingrenjie/1.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节浪漫主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-002',
      name: '情人节甜蜜',
      thumbnail: 'images/qingrenjie/thumbnails/2.jpg',
      image: 'images/qingrenjie/2.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节甜蜜主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-003',
      name: '情人节爱心',
      thumbnail: 'images/qingrenjie/thumbnails/3.jpg',
      image: 'images/qingrenjie/3.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节爱心主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-004',
      name: '情人节玫瑰',
      thumbnail: 'images/qingrenjie/thumbnails/4.jpg',
      image: 'images/qingrenjie/4.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节玫瑰主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-005',
      name: '情人节礼物',
      thumbnail: 'images/qingrenjie/thumbnails/5.jpg',
      image: 'images/qingrenjie/5.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节礼物主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-006',
      name: '情人节约会',
      thumbnail: 'images/qingrenjie/thumbnails/6.jpg',
      image: 'images/qingrenjie/6.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节约会主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-007',
      name: '情人节告白',
      thumbnail: 'images/qingrenjie/thumbnails/7.jpg',
      image: 'images/qingrenjie/7.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节告白主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-008',
      name: '情人节幸福',
      thumbnail: 'images/qingrenjie/thumbnails/8.jpg',
      image: 'images/qingrenjie/8.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节幸福主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-009',
      name: '情人节巧克力',
      thumbnail: 'images/qingrenjie/thumbnails/9.jpg',
      image: 'images/qingrenjie/9.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节巧克力主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingrenjie-2024-010',
      name: '情人节祝福',
      thumbnail: 'images/qingrenjie/thumbnails/10.jpg',
      image: 'images/qingrenjie/10.png',
      months: [2],
      festivals: ['情人节'],
      description: '情人节祝福主题海报模板',
      type: '西方节日'
    },
    {
      id: 'chuxi-2024-001',
      name: '除夕团圆',
      thumbnail: 'images/chuxi/thumbnails/1.jpg',
      image: 'images/chuxi/1.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕团圆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-002',
      name: '除夕年夜饭',
      thumbnail: 'images/chuxi/thumbnails/2.jpg',
      image: 'images/chuxi/2.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕年夜饭主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-003',
      name: '除夕守岁',
      thumbnail: 'images/chuxi/thumbnails/3.jpg',
      image: 'images/chuxi/3.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕守岁主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-004',
      name: '除夕吉祥',
      thumbnail: 'images/chuxi/thumbnails/4.jpg',
      image: 'images/chuxi/4.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕吉祥主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-005',
      name: '除夕祝福',
      thumbnail: 'images/chuxi/thumbnails/5.jpg',
      image: 'images/chuxi/5.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-006',
      name: '除夕快乐',
      thumbnail: 'images/chuxi/thumbnails/6.jpg',
      image: 'images/chuxi/6.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕快乐主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-007',
      name: '除夕安康',
      thumbnail: 'images/chuxi/thumbnails/7.jpg',
      image: 'images/chuxi/7.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕安康主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-008',
      name: '除夕如意',
      thumbnail: 'images/chuxi/thumbnails/8.jpg',
      image: 'images/chuxi/8.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕如意主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-009',
      name: '除夕幸福',
      thumbnail: 'images/chuxi/thumbnails/9.jpg',
      image: 'images/chuxi/9.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕幸福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chuxi-2024-010',
      name: '除夕迎新',
      thumbnail: 'images/chuxi/thumbnails/10.jpg',
      image: 'images/chuxi/10.png',
      months: [2],
      festivals: ['除夕'],
      description: '除夕迎新主题海报模板',
      type: '传统节日'
    },
    {
      id: 'lichun-2024-001',
      name: '立春迎新',
      thumbnail: 'images/lichun/thumbnails/1.jpg',
      image: 'images/lichun/1.png',
      months: [2],
      festivals: ['立春'],
      description: '立春迎新主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-002',
      name: '立春万物',
      thumbnail: 'images/lichun/thumbnails/2.jpg',
      image: 'images/lichun/2.png',
      months: [2],
      festivals: ['立春'],
      description: '立春万物复苏主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-003',
      name: '立春节气',
      thumbnail: 'images/lichun/thumbnails/3.jpg',
      image: 'images/lichun/3.png',
      months: [2],
      festivals: ['立春'],
      description: '立春节气主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-004',
      name: '立春花开',
      thumbnail: 'images/lichun/thumbnails/4.jpg',
      image: 'images/lichun/4.png',
      months: [2],
      festivals: ['立春'],
      description: '立春花开主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-005',
      name: '立春吉祥',
      thumbnail: 'images/lichun/thumbnails/5.jpg',
      image: 'images/lichun/5.png',
      months: [2],
      festivals: ['立春'],
      description: '立春吉祥主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-006',
      name: '立春祝福',
      thumbnail: 'images/lichun/thumbnails/6.jpg',
      image: 'images/lichun/6.png',
      months: [2],
      festivals: ['立春'],
      description: '立春祝福主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-007',
      name: '立春温暖',
      thumbnail: 'images/lichun/thumbnails/7.jpg',
      image: 'images/lichun/7.png',
      months: [2],
      festivals: ['立春'],
      description: '立春温暖主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-008',
      name: '立春生机',
      thumbnail: 'images/lichun/thumbnails/8.jpg',
      image: 'images/lichun/8.png',
      months: [2],
      festivals: ['立春'],
      description: '立春生机主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-009',
      name: '立春如意',
      thumbnail: 'images/lichun/thumbnails/9.jpg',
      image: 'images/lichun/9.png',
      months: [2],
      festivals: ['立春'],
      description: '立春如意主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-010',
      name: '立春安康',
      thumbnail: 'images/lichun/thumbnails/10.jpg',
      image: 'images/lichun/10.png',
      months: [2],
      festivals: ['立春'],
      description: '立春安康主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-011',
      name: '立春团圆',
      thumbnail: 'images/lichun/thumbnails/11.jpg',
      image: 'images/lichun/11.png',
      months: [2],
      festivals: ['立春'],
      description: '立春团圆主题海报模板',
      type: '节气'
    },
    {
      id: 'lichun-2024-012',
      name: '立春喜庆',
      thumbnail: 'images/lichun/thumbnails/12.jpg',
      image: 'images/lichun/12.png',
      months: [2],
      festivals: ['立春'],
      description: '立春喜庆主题海报模板',
      type: '节气'
    }
  ],

  // 3月模板
  '3月': [
    {
      id: 'longtaitou-2024-001',
      name: '龙抬头吉祥',
      thumbnail: 'images/longtaitou/thumbnails/1.jpg',
      image: 'images/longtaitou/1.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头吉祥主题海报模板',
      type: '传统节日'
    },
    {
      id: 'funvjie-2024-001',
      name: '妇女节快乐',
      thumbnail: 'images/funvjie/thumbnails/1.jpg',
      image: 'images/funvjie/1.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节快乐祝福主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-002',
      name: '妇女节平等',
      thumbnail: 'images/funvjie/thumbnails/2.jpg',
      image: 'images/funvjie/2.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节平等尊重主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-003',
      name: '妇女节力量',
      thumbnail: 'images/funvjie/thumbnails/3.jpg',
      image: 'images/funvjie/3.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节女性力量主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-004',
      name: '妇女节康乃馨',
      thumbnail: 'images/funvjie/thumbnails/4.jpg',
      image: 'images/funvjie/4.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节康乃馨花束主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-005',
      name: '妇女节权益',
      thumbnail: 'images/funvjie/thumbnails/5.jpg',
      image: 'images/funvjie/5.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节女性权益主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-006',
      name: '妇女节优雅',
      thumbnail: 'images/funvjie/thumbnails/6.jpg',
      image: 'images/funvjie/6.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节优雅女性主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-007',
      name: '妇女节独立',
      thumbnail: 'images/funvjie/thumbnails/7.jpg',
      image: 'images/funvjie/7.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节独立女性主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-008',
      name: '妇女节职场',
      thumbnail: 'images/funvjie/thumbnails/8.jpg',
      image: 'images/funvjie/8.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节职场女性主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-009',
      name: '妇女节家庭',
      thumbnail: 'images/funvjie/thumbnails/9.jpg',
      image: 'images/funvjie/9.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节家庭女性主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-010',
      name: '妇女节爱心',
      thumbnail: 'images/funvjie/thumbnails/10.jpg',
      image: 'images/funvjie/10.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节爱心关怀主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-011',
      name: '妇女节团结',
      thumbnail: 'images/funvjie/thumbnails/11.jpg',
      image: 'images/funvjie/11.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节团结互助主题海报模板',
      type: '西方节日'
    },
    {
      id: 'funvjie-2024-012',
      name: '妇女节节日',
      thumbnail: 'images/funvjie/thumbnails/12.jpg',
      image: 'images/funvjie/12.png',
      months: [3],
      festivals: ['妇女节'],
      description: '妇女节节日庆祝主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-001',
      name: '植树节绿化',
      thumbnail: 'images/zhishujie/thumbnails/1.jpg',
      image: 'images/zhishujie/1.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节绿化环保主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-002',
      name: '植树节造林',
      thumbnail: 'images/zhishujie/thumbnails/2.jpg',
      image: 'images/zhishujie/2.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节植树造林主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-003',
      name: '植树节生态',
      thumbnail: 'images/zhishujie/thumbnails/3.jpg',
      image: 'images/zhishujie/3.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节生态保护主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-004',
      name: '植树节树木',
      thumbnail: 'images/zhishujie/thumbnails/4.jpg',
      image: 'images/zhishujie/4.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节树木种植主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-005',
      name: '植树节森林',
      thumbnail: 'images/zhishujie/thumbnails/5.jpg',
      image: 'images/zhishujie/5.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节森林保护主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-006',
      name: '植树节环保',
      thumbnail: 'images/zhishujie/thumbnails/6.jpg',
      image: 'images/zhishujie/6.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节环保意识主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-007',
      name: '植树节春天',
      thumbnail: 'images/zhishujie/thumbnails/7.jpg',
      image: 'images/zhishujie/7.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节春天植树主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-008',
      name: '植树节地球',
      thumbnail: 'images/zhishujie/thumbnails/8.jpg',
      image: 'images/zhishujie/8.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节地球保护主题海报模板',
      type: '西方节日'
    },
    {
      id: 'zhishujie-2024-009',
      name: '植树节节日',
      thumbnail: 'images/zhishujie/thumbnails/9.jpg',
      image: 'images/zhishujie/9.png',
      months: [3],
      festivals: ['植树节'],
      description: '植树节节日庆祝主题海报模板',
      type: '西方节日'
    },
    {
      id: 'longtaitou-2024-002',
      name: '龙抬头春耕',
      thumbnail: 'images/longtaitou/thumbnails/2.jpg',
      image: 'images/longtaitou/2.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头春耕主题海报模板',
      type: '传统节日'
    },
    {
      id: 'longtaitou-2024-003',
      name: '龙抬头剃头',
      thumbnail: 'images/longtaitou/thumbnails/3.jpg',
      image: 'images/longtaitou/3.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头剃头习俗主题海报模板',
      type: '传统节日'
    },
    {
      id: 'longtaitou-2024-004',
      name: '龙抬头春饼',
      thumbnail: 'images/longtaitou/thumbnails/4.jpg',
      image: 'images/longtaitou/4.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头吃春饼主题海报模板',
      type: '传统节日'
    },
    {
      id: 'longtaitou-2024-005',
      name: '龙抬头祈福',
      thumbnail: 'images/longtaitou/thumbnails/5.jpg',
      image: 'images/longtaitou/5.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头祈福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'longtaitou-2024-006',
      name: '龙抬头祥瑞',
      thumbnail: 'images/longtaitou/thumbnails/6.jpg',
      image: 'images/longtaitou/6.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头祥瑞主题海报模板',
      type: '传统节日'
    },
    {
      id: 'longtaitou-2024-007',
      name: '龙抬头春意',
      thumbnail: 'images/longtaitou/thumbnails/7.jpg',
      image: 'images/longtaitou/7.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头春意主题海报模板',
      type: '传统节日'
    },
    {
      id: 'longtaitou-2024-008',
      name: '龙抬头祝福',
      thumbnail: 'images/longtaitou/thumbnails/8.jpg',
      image: 'images/longtaitou/8.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'longtaitou-2024-009',
      name: '龙抬头快乐',
      thumbnail: 'images/longtaitou/thumbnails/9.jpg',
      image: 'images/longtaitou/9.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头快乐主题海报模板',
      type: '传统节日'
    },
    {
      id: 'longtaitou-2024-010',
      name: '龙抬头安康',
      thumbnail: 'images/longtaitou/thumbnails/10.jpg',
      image: 'images/longtaitou/10.png',
      months: [3],
      festivals: ['龙抬头'],
      description: '龙抬头安康主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jingzhe-2024-001',
      name: '惊蛰生机',
      thumbnail: 'images/jingzhe/thumbnails/1.jpg',
      image: 'images/jingzhe/1.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气生机主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-002',
      name: '惊蛰春雷',
      thumbnail: 'images/jingzhe/thumbnails/2.jpg',
      image: 'images/jingzhe/2.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气春雷主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-003',
      name: '惊蛰苏醒',
      thumbnail: 'images/jingzhe/thumbnails/3.jpg',
      image: 'images/jingzhe/3.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气万物苏醒主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-004',
      name: '惊蛰春耕',
      thumbnail: 'images/jingzhe/thumbnails/4.jpg',
      image: 'images/jingzhe/4.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气春耕主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-005',
      name: '惊蛰春意',
      thumbnail: 'images/jingzhe/thumbnails/5.jpg',
      image: 'images/jingzhe/5.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气春意盎然主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-006',
      name: '惊蛰花开',
      thumbnail: 'images/jingzhe/thumbnails/6.jpg',
      image: 'images/jingzhe/6.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气花开主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-007',
      name: '惊蛰虫鸣',
      thumbnail: 'images/jingzhe/thumbnails/7.jpg',
      image: 'images/jingzhe/7.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气虫鸣主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-008',
      name: '惊蛰春雨',
      thumbnail: 'images/jingzhe/thumbnails/8.jpg',
      image: 'images/jingzhe/8.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气春雨主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-009',
      name: '惊蛰养生',
      thumbnail: 'images/jingzhe/thumbnails/9.jpg',
      image: 'images/jingzhe/9.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-010',
      name: '惊蛰节气',
      thumbnail: 'images/jingzhe/thumbnails/10.jpg',
      image: 'images/jingzhe/10.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-011',
      name: '惊蛰吉祥',
      thumbnail: 'images/jingzhe/thumbnails/11.jpg',
      image: 'images/jingzhe/11.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气吉祥主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-012',
      name: '惊蛰祝福',
      thumbnail: 'images/jingzhe/thumbnails/12.jpg',
      image: 'images/jingzhe/12.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气祝福主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-013',
      name: '惊蛰快乐',
      thumbnail: 'images/jingzhe/thumbnails/13.jpg',
      image: 'images/jingzhe/13.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气快乐主题海报模板',
      type: '节气'
    },
    {
      id: 'jingzhe-2024-014',
      name: '惊蛰安康',
      thumbnail: 'images/jingzhe/thumbnails/14.jpg',
      image: 'images/jingzhe/14.png',
      months: [3],
      festivals: ['惊蛰'],
      description: '惊蛰节气安康主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-001',
      name: '春分踏青',
      thumbnail: 'images/chunfen/thumbnails/1.jpg',
      image: 'images/chunfen/1.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气踏青主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-002',
      name: '春分花开',
      thumbnail: 'images/chunfen/thumbnails/2.jpg',
      image: 'images/chunfen/2.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气花开主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-003',
      name: '春分阳光',
      thumbnail: 'images/chunfen/thumbnails/3.jpg',
      image: 'images/chunfen/3.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气阳光主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-004',
      name: '春分燕子',
      thumbnail: 'images/chunfen/thumbnails/4.jpg',
      image: 'images/chunfen/4.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气燕子归来主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-005',
      name: '春分农耕',
      thumbnail: 'images/chunfen/thumbnails/5.jpg',
      image: 'images/chunfen/5.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气农耕主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-006',
      name: '春分风筝',
      thumbnail: 'images/chunfen/thumbnails/6.jpg',
      image: 'images/chunfen/6.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气放风筝主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-007',
      name: '春分春雨',
      thumbnail: 'images/chunfen/thumbnails/7.jpg',
      image: 'images/chunfen/7.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气春雨主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-008',
      name: '春分樱花',
      thumbnail: 'images/chunfen/thumbnails/8.jpg',
      image: 'images/chunfen/8.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气樱花主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-009',
      name: '春分茶香',
      thumbnail: 'images/chunfen/thumbnails/9.jpg',
      image: 'images/chunfen/9.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气品茶主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-010',
      name: '春分春游',
      thumbnail: 'images/chunfen/thumbnails/10.jpg',
      image: 'images/chunfen/10.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气春游主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-011',
      name: '春分平衡',
      thumbnail: 'images/chunfen/thumbnails/11.jpg',
      image: 'images/chunfen/11.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气昼夜平分主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-012',
      name: '春分养生',
      thumbnail: 'images/chunfen/thumbnails/12.jpg',
      image: 'images/chunfen/12.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-013',
      name: '春分桃花',
      thumbnail: 'images/chunfen/thumbnails/13.jpg',
      image: 'images/chunfen/13.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气桃花盛开主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-014',
      name: '春分柳絮',
      thumbnail: 'images/chunfen/thumbnails/14.jpg',
      image: 'images/chunfen/14.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气柳絮飞舞主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-015',
      name: '春分蝴蝶',
      thumbnail: 'images/chunfen/thumbnails/15.jpg',
      image: 'images/chunfen/15.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气蝴蝶飞舞主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-016',
      name: '春分蜜蜂',
      thumbnail: 'images/chunfen/thumbnails/16.jpg',
      image: 'images/chunfen/16.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气蜜蜂采蜜主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-017',
      name: '春分绿意',
      thumbnail: 'images/chunfen/thumbnails/17.jpg',
      image: 'images/chunfen/17.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气绿意盎然主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-018',
      name: '春分希望',
      thumbnail: 'images/chunfen/thumbnails/18.jpg',
      image: 'images/chunfen/18.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气希望主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-019',
      name: '春分新生',
      thumbnail: 'images/chunfen/thumbnails/19.jpg',
      image: 'images/chunfen/19.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气新生主题海报模板',
      type: '节气'
    },
    {
      id: 'chunfen-2024-020',
      name: '春分和谐',
      thumbnail: 'images/chunfen/thumbnails/20.jpg',
      image: 'images/chunfen/20.png',
      months: [3],
      festivals: ['春分'],
      description: '春分节气和谐主题海报模板',
      type: '节气'
    },

  ],

  // 4月模板
  '4月': [
    {
      id: 'qingming-2024-001',
      name: '清明祭祖',
      thumbnail: 'images/qingming/thumbnails/1.jpg',
      image: 'images/qingming/1.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节祭祖主题海报模板',
      type: '节气'
    },
    {
      id: 'shijiediqiuri-2024-001',
      name: '世界地球日环保',
      thumbnail: 'images/shijiediqiuri/thumbnails/1.jpg',
      image: 'images/shijiediqiuri/1.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日环保主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-002',
      name: '世界地球日地球',
      thumbnail: 'images/shijiediqiuri/thumbnails/2.jpg',
      image: 'images/shijiediqiuri/2.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日地球保护主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-003',
      name: '世界地球日气候',
      thumbnail: 'images/shijiediqiuri/thumbnails/3.jpg',
      image: 'images/shijiediqiuri/3.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日气候变化主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-004',
      name: '世界地球日绿色',
      thumbnail: 'images/shijiediqiuri/thumbnails/4.jpg',
      image: 'images/shijiediqiuri/4.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日绿色生活主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-005',
      name: '世界地球日生态',
      thumbnail: 'images/shijiediqiuri/thumbnails/5.jpg',
      image: 'images/shijiediqiuri/5.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日生态平衡主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-006',
      name: '世界地球日可持续发展',
      thumbnail: 'images/shijiediqiuri/thumbnails/6.jpg',
      image: 'images/shijiediqiuri/6.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日可持续发展主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-007',
      name: '世界地球日自然',
      thumbnail: 'images/shijiediqiuri/thumbnails/7.jpg',
      image: 'images/shijiediqiuri/7.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日自然保护主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-008',
      name: '世界地球日水资源',
      thumbnail: 'images/shijiediqiuri/thumbnails/8.jpg',
      image: 'images/shijiediqiuri/8.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日水资源保护主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-009',
      name: '世界地球日清洁能源',
      thumbnail: 'images/shijiediqiuri/thumbnails/9.jpg',
      image: 'images/shijiediqiuri/9.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日清洁能源主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiediqiuri-2024-010',
      name: '世界地球日节日',
      thumbnail: 'images/shijiediqiuri/thumbnails/10.jpg',
      image: 'images/shijiediqiuri/10.png',
      months: [4],
      festivals: ['世界地球日'],
      description: '世界地球日节日庆祝主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingming-2024-002',
      name: '清明踏青',
      thumbnail: 'images/qingming/thumbnails/2.jpg',
      image: 'images/qingming/2.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节踏青主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-003',
      name: '清明扫墓',
      thumbnail: 'images/qingming/thumbnails/3.jpg',
      image: 'images/qingming/3.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节扫墓主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-004',
      name: '清明风筝',
      thumbnail: 'images/qingming/thumbnails/4.jpg',
      image: 'images/qingming/4.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节放风筝主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-005',
      name: '清明青团',
      thumbnail: 'images/qingming/thumbnails/5.jpg',
      image: 'images/qingming/5.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节青团美食主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-006',
      name: '清明春色',
      thumbnail: 'images/qingming/thumbnails/6.jpg',
      image: 'images/qingming/6.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节春色主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-007',
      name: '清明缅怀',
      thumbnail: 'images/qingming/thumbnails/7.jpg',
      image: 'images/qingming/7.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节缅怀先人主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-008',
      name: '清明郊游',
      thumbnail: 'images/qingming/thumbnails/8.jpg',
      image: 'images/qingming/8.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节郊游主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-009',
      name: '清明春意',
      thumbnail: 'images/qingming/thumbnails/9.jpg',
      image: 'images/qingming/9.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节春意盎然主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-010',
      name: '清明传统',
      thumbnail: 'images/qingming/thumbnails/10.jpg',
      image: 'images/qingming/10.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节传统文化主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-011',
      name: '清明春雨',
      thumbnail: 'images/qingming/thumbnails/11.jpg',
      image: 'images/qingming/11.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节春雨主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-012',
      name: '清明思念',
      thumbnail: 'images/qingming/thumbnails/12.jpg',
      image: 'images/qingming/12.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节思念先人主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-013',
      name: '清明柳绿',
      thumbnail: 'images/qingming/thumbnails/13.jpg',
      image: 'images/qingming/13.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节柳绿花红主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-014',
      name: '清明春游',
      thumbnail: 'images/qingming/thumbnails/14.jpg',
      image: 'images/qingming/14.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节春游活动主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-015',
      name: '清明祭扫',
      thumbnail: 'images/qingming/thumbnails/15.jpg',
      image: 'images/qingming/15.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节祭扫主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-016',
      name: '清明春景',
      thumbnail: 'images/qingming/thumbnails/16.jpg',
      image: 'images/qingming/16.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节春景主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-017',
      name: '清明追思',
      thumbnail: 'images/qingming/thumbnails/17.jpg',
      image: 'images/qingming/17.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节追思先人主题海报模板',
      type: '节气'
    },
    {
      id: 'qingming-2024-018',
      name: '清明春韵',
      thumbnail: 'images/qingming/thumbnails/18.jpg',
      image: 'images/qingming/18.png',
      months: [4],
      festivals: ['清明'],
      description: '清明节春韵主题海报模板',
      type: '节气'
    },
    {
      id: 'yurenjie-2024-001',
      name: '愚人节玩笑',
      thumbnail: 'images/yurenjie/thumbnails/1.jpg',
      image: 'images/yurenjie/1.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节幽默玩笑主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-002',
      name: '愚人节恶作剧',
      thumbnail: 'images/yurenjie/thumbnails/2.jpg',
      image: 'images/yurenjie/2.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节恶作剧主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-003',
      name: '愚人节幽默',
      thumbnail: 'images/yurenjie/thumbnails/3.jpg',
      image: 'images/yurenjie/3.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节幽默搞笑主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-004',
      name: '愚人节惊喜',
      thumbnail: 'images/yurenjie/thumbnails/4.jpg',
      image: 'images/yurenjie/4.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节惊喜主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-005',
      name: '愚人节整蛊',
      thumbnail: 'images/yurenjie/thumbnails/5.jpg',
      image: 'images/yurenjie/5.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节整蛊主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-006',
      name: '愚人节搞笑',
      thumbnail: 'images/yurenjie/thumbnails/6.jpg',
      image: 'images/yurenjie/6.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节搞笑主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-007',
      name: '愚人节快乐',
      thumbnail: 'images/yurenjie/thumbnails/7.jpg',
      image: 'images/yurenjie/7.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节快乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-008',
      name: '愚人节调皮',
      thumbnail: 'images/yurenjie/thumbnails/8.jpg',
      image: 'images/yurenjie/8.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节调皮主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-009',
      name: '愚人节趣味',
      thumbnail: 'images/yurenjie/thumbnails/9.jpg',
      image: 'images/yurenjie/9.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节趣味主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-010',
      name: '愚人节欢乐',
      thumbnail: 'images/yurenjie/thumbnails/10.jpg',
      image: 'images/yurenjie/10.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节欢乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-011',
      name: '愚人节玩笑王',
      thumbnail: 'images/yurenjie/thumbnails/11.jpg',
      image: 'images/yurenjie/11.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节玩笑王主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-012',
      name: '愚人节整人',
      thumbnail: 'images/yurenjie/thumbnails/12.jpg',
      image: 'images/yurenjie/12.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节整人主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-013',
      name: '愚人节反转',
      thumbnail: 'images/yurenjie/thumbnails/13.jpg',
      image: 'images/yurenjie/13.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节反转剧情主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-014',
      name: '愚人节惊喜包',
      thumbnail: 'images/yurenjie/thumbnails/14.jpg',
      image: 'images/yurenjie/14.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节惊喜包主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-015',
      name: '愚人节搞怪',
      thumbnail: 'images/yurenjie/thumbnails/15.jpg',
      image: 'images/yurenjie/15.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节搞怪主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-016',
      name: '愚人节恶搞',
      thumbnail: 'images/yurenjie/thumbnails/16.jpg',
      image: 'images/yurenjie/16.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节恶搞主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-017',
      name: '愚人节惊喜不断',
      thumbnail: 'images/yurenjie/thumbnails/17.jpg',
      image: 'images/yurenjie/17.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节惊喜不断主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-018',
      name: '愚人节开心一刻',
      thumbnail: 'images/yurenjie/thumbnails/18.jpg',
      image: 'images/yurenjie/18.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节开心一刻主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-019',
      name: '愚人节欢乐派对',
      thumbnail: 'images/yurenjie/thumbnails/19.jpg',
      image: 'images/yurenjie/19.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节欢乐派对主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-020',
      name: '愚人节趣味无穷',
      thumbnail: 'images/yurenjie/thumbnails/20.jpg',
      image: 'images/yurenjie/20.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节趣味无穷主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-021',
      name: '愚人节笑料百出',
      thumbnail: 'images/yurenjie/thumbnails/21.jpg',
      image: 'images/yurenjie/21.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节笑料百出主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-022',
      name: '愚人节欢乐时光',
      thumbnail: 'images/yurenjie/thumbnails/22.jpg',
      image: 'images/yurenjie/22.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节欢乐时光主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-023',
      name: '愚人节惊喜连连',
      thumbnail: 'images/yurenjie/thumbnails/23.jpg',
      image: 'images/yurenjie/23.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节惊喜连连主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-024',
      name: '愚人节搞怪达人',
      thumbnail: 'images/yurenjie/thumbnails/24.jpg',
      image: 'images/yurenjie/24.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节搞怪达人主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-025',
      name: '愚人节整蛊大师',
      thumbnail: 'images/yurenjie/thumbnails/25.jpg',
      image: 'images/yurenjie/25.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节整蛊大师主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-026',
      name: '愚人节欢乐总动员',
      thumbnail: 'images/yurenjie/thumbnails/26.jpg',
      image: 'images/yurenjie/26.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节欢乐总动员主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-027',
      name: '愚人节快乐无限',
      thumbnail: 'images/yurenjie/thumbnails/27.jpg',
      image: 'images/yurenjie/27.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节快乐无限主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yurenjie-2024-028',
      name: '愚人节惊喜来袭',
      thumbnail: 'images/yurenjie/thumbnails/28.jpg',
      image: 'images/yurenjie/28.png',
      months: [4],
      festivals: ['愚人节'],
      description: '愚人节惊喜来袭主题海报模板',
      type: '西方节日'
    },
    {
      id: 'guyu-2024-001',
      name: '谷雨茶韵',
      thumbnail: 'images/guyu/thumbnails/1.jpg',
      image: 'images/guyu/1.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气茶文化主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-002',
      name: '谷雨春雨',
      thumbnail: 'images/guyu/thumbnails/2.jpg',
      image: 'images/guyu/2.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气春雨主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-003',
      name: '谷雨播种',
      thumbnail: 'images/guyu/thumbnails/3.jpg',
      image: 'images/guyu/3.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气播种主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-004',
      name: '谷雨谷物',
      thumbnail: 'images/guyu/thumbnails/4.jpg',
      image: 'images/guyu/4.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气谷物生长主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-005',
      name: '谷雨春茶',
      thumbnail: 'images/guyu/thumbnails/5.jpg',
      image: 'images/guyu/5.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气春茶主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-006',
      name: '谷雨润物',
      thumbnail: 'images/guyu/thumbnails/6.jpg',
      image: 'images/guyu/6.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气润物无声主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-007',
      name: '谷雨农耕',
      thumbnail: 'images/guyu/thumbnails/7.jpg',
      image: 'images/guyu/7.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气农耕主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-008',
      name: '谷雨春耕',
      thumbnail: 'images/guyu/thumbnails/8.jpg',
      image: 'images/guyu/8.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气春耕主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-009',
      name: '谷雨润泽',
      thumbnail: 'images/guyu/thumbnails/9.jpg',
      image: 'images/guyu/9.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气润泽万物主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-010',
      name: '谷雨生机',
      thumbnail: 'images/guyu/thumbnails/10.jpg',
      image: 'images/guyu/10.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气生机勃勃主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-011',
      name: '谷雨田园',
      thumbnail: 'images/guyu/thumbnails/11.jpg',
      image: 'images/guyu/11.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气田园风光主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-012',
      name: '谷雨春色',
      thumbnail: 'images/guyu/thumbnails/12.jpg',
      image: 'images/guyu/12.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气春色主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-013',
      name: '谷雨雨露',
      thumbnail: 'images/guyu/thumbnails/13.jpg',
      image: 'images/guyu/13.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气雨露滋润主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-014',
      name: '谷雨丰收',
      thumbnail: 'images/guyu/thumbnails/14.jpg',
      image: 'images/guyu/14.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气丰收主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-015',
      name: '谷雨春华',
      thumbnail: 'images/guyu/thumbnails/15.jpg',
      image: 'images/guyu/15.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气春华秋实主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-016',
      name: '谷雨润春',
      thumbnail: 'images/guyu/thumbnails/16.jpg',
      image: 'images/guyu/16.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气润春主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-017',
      name: '谷雨春意',
      thumbnail: 'images/guyu/thumbnails/17.jpg',
      image: 'images/guyu/17.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气春意主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-018',
      name: '谷雨润土',
      thumbnail: 'images/guyu/thumbnails/18.jpg',
      image: 'images/guyu/18.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气润土主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-019',
      name: '谷雨春耕图',
      thumbnail: 'images/guyu/thumbnails/19.jpg',
      image: 'images/guyu/19.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气春耕图主题海报模板',
      type: '节气'
    },
    {
      id: 'guyu-2024-020',
      name: '谷雨润物细无声',
      thumbnail: 'images/guyu/thumbnails/20.jpg',
      image: 'images/guyu/20.png',
      months: [4],
      festivals: ['谷雨'],
      description: '谷雨节气润物细无声主题海报模板',
      type: '节气'
    }

    
  ],

  // 5月模板
  '5月': [
    {
      id: 'duanwu-2024-001',
      name: '端午龙舟',
      thumbnail: 'images/duanwu/thumbnails/1.jpg',
      image: 'images/duanwu/1.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节龙舟主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-002',
      name: '端午粽香',
      thumbnail: 'images/duanwu/thumbnails/2.jpg',
      image: 'images/duanwu/2.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节粽子主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-003',
      name: '端午艾草',
      thumbnail: 'images/duanwu/thumbnails/3.jpg',
      image: 'images/duanwu/3.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节艾草主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-004',
      name: '端午香囊',
      thumbnail: 'images/duanwu/thumbnails/4.jpg',
      image: 'images/duanwu/4.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节香囊主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-005',
      name: '端午传统',
      thumbnail: 'images/duanwu/thumbnails/5.jpg',
      image: 'images/duanwu/5.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节传统文化主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-006',
      name: '端午屈原',
      thumbnail: 'images/duanwu/thumbnails/6.jpg',
      image: 'images/duanwu/6.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节屈原纪念主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-007',
      name: '端午赛龙舟',
      thumbnail: 'images/duanwu/thumbnails/7.jpg',
      image: 'images/duanwu/7.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节赛龙舟主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-008',
      name: '端午粽子',
      thumbnail: 'images/duanwu/thumbnails/8.jpg',
      image: 'images/duanwu/8.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节粽子美食主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-009',
      name: '端午安康',
      thumbnail: 'images/duanwu/thumbnails/9.jpg',
      image: 'images/duanwu/9.png',
      months: [6],
      festivals: ['端午节'],
      description: '端午节安康祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-010',
      name: '端午佳节',
      thumbnail: 'images/duanwu/thumbnails/10.jpg',
      image: 'images/duanwu/10.png',
      months: [5],
      festivals: ['端午节'],
      description: '端午佳节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-011',
      name: '端午民俗',
      thumbnail: 'images/duanwu/thumbnails/11.jpg',
      image: 'images/duanwu/11.png',
      months: [5],
      festivals: ['端午节'],
      description: '端午节民俗活动主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-012',
      name: '端午文化',
      thumbnail: 'images/duanwu/thumbnails/12.jpg',
      image: 'images/duanwu/12.png',
      months: [5],
      festivals: ['端午节'],
      description: '端午节文化传承主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-013',
      name: '端午节日',
      thumbnail: 'images/duanwu/thumbnails/13.jpg',
      image: 'images/duanwu/13.png',
      months: [5],
      festivals: ['端午节'],
      description: '端午节节日氛围主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-014',
      name: '端午传统美食',
      thumbnail: 'images/duanwu/thumbnails/14.jpg',
      image: 'images/duanwu/14.png',
      months: [5],
      festivals: ['端午节'],
      description: '端午节传统美食主题海报模板',
      type: '传统节日'
    },
    {
      id: 'duanwu-2024-015',
      name: '端午纪念',
      thumbnail: 'images/duanwu/thumbnails/15.jpg',
      image: 'images/duanwu/15.png',
      months: [5],
      festivals: ['端午节'],
      description: '端午节纪念主题海报模板',
      type: '传统节日'
    },

    {
      id: 'muqinjie-2024-001',
      name: '感恩母爱',
      thumbnail: 'images/muqinjie/thumbnails/1.jpg',
      image: 'images/muqinjie/1.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节感恩母爱主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-002',
      name: '母亲节快乐',
      thumbnail: 'images/muqinjie/thumbnails/2.jpg',
      image: 'images/muqinjie/2.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节快乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-003',
      name: '母爱永恒',
      thumbnail: 'images/muqinjie/thumbnails/3.jpg',
      image: 'images/muqinjie/3.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节母爱永恒主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-004',
      name: '康乃馨之爱',
      thumbnail: 'images/muqinjie/thumbnails/4.jpg',
      image: 'images/muqinjie/4.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节康乃馨之爱主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-005',
      name: '母亲节感恩',
      thumbnail: 'images/muqinjie/thumbnails/5.jpg',
      image: 'images/muqinjie/5.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-006',
      name: '母爱如海',
      thumbnail: 'images/muqinjie/thumbnails/6.jpg',
      image: 'images/muqinjie/6.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节母爱如海主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-007',
      name: '母亲节祝福',
      thumbnail: 'images/muqinjie/thumbnails/7.jpg',
      image: 'images/muqinjie/7.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节祝福主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-008',
      name: '母爱伟大',
      thumbnail: 'images/muqinjie/thumbnails/8.jpg',
      image: 'images/muqinjie/8.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节母爱伟大主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-009',
      name: '母亲节温馨',
      thumbnail: 'images/muqinjie/thumbnails/9.jpg',
      image: 'images/muqinjie/9.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节温馨主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-010',
      name: '母亲节献礼',
      thumbnail: 'images/muqinjie/thumbnails/10.jpg',
      image: 'images/muqinjie/10.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节献礼主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-011',
      name: '母爱无疆',
      thumbnail: 'images/muqinjie/thumbnails/11.jpg',
      image: 'images/muqinjie/11.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节母爱无疆主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-012',
      name: '母亲节感恩卡',
      thumbnail: 'images/muqinjie/thumbnails/12.jpg',
      image: 'images/muqinjie/12.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节感恩卡主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-013',
      name: '母亲节花束',
      thumbnail: 'images/muqinjie/thumbnails/13.jpg',
      image: 'images/muqinjie/13.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节花束主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-014',
      name: '母亲节礼物',
      thumbnail: 'images/muqinjie/thumbnails/14.jpg',
      image: 'images/muqinjie/14.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节礼物主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-015',
      name: '母亲节贺卡',
      thumbnail: 'images/muqinjie/thumbnails/15.jpg',
      image: 'images/muqinjie/15.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节贺卡主题海报模板',
      type: '西方节日'
    },
    {
      id: 'muqinjie-2024-016',
      name: '母亲节感恩信',
      thumbnail: 'images/muqinjie/thumbnails/16.jpg',
      image: 'images/muqinjie/16.png',
      months: [5],
      festivals: ['母亲节'],
      description: '母亲节感恩信主题海报模板',
      type: '西方节日'
    },
    {
      id: 'lixia-2024-001',
      name: '立夏迎新',
      thumbnail: 'images/lixia/thumbnails/1.jpg',
      image: 'images/lixia/1.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气迎新主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-002',
      name: '立夏生机',
      thumbnail: 'images/lixia/thumbnails/2.jpg',
      image: 'images/lixia/2.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气生机勃勃主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-003',
      name: '立夏万物',
      thumbnail: 'images/lixia/thumbnails/3.jpg',
      image: 'images/lixia/3.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气万物生长主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-004',
      name: '立夏绿意',
      thumbnail: 'images/lixia/thumbnails/4.jpg',
      image: 'images/lixia/4.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气绿意盎然主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-005',
      name: '立夏阳光',
      thumbnail: 'images/lixia/thumbnails/5.jpg',
      image: 'images/lixia/5.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气阳光明媚主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-006',
      name: '立夏田园',
      thumbnail: 'images/lixia/thumbnails/6.jpg',
      image: 'images/lixia/6.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气田园风光主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-007',
      name: '立夏荷花',
      thumbnail: 'images/lixia/thumbnails/7.jpg',
      image: 'images/lixia/7.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气荷花盛开主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-008',
      name: '立夏蝉鸣',
      thumbnail: 'images/lixia/thumbnails/8.jpg',
      image: 'images/lixia/8.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气蝉鸣主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-009',
      name: '立夏清风',
      thumbnail: 'images/lixia/thumbnails/9.jpg',
      image: 'images/lixia/9.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气清风徐来主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-010',
      name: '立夏夏日',
      thumbnail: 'images/lixia/thumbnails/10.jpg',
      image: 'images/lixia/10.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气夏日来临主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-011',
      name: '立夏丰收',
      thumbnail: 'images/lixia/thumbnails/11.jpg',
      image: 'images/lixia/11.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气丰收在望主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-012',
      name: '立夏绿荫',
      thumbnail: 'images/lixia/thumbnails/12.jpg',
      image: 'images/lixia/12.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气绿荫成片主题海报模板',
      type: '节气'
    },
    {
      id: 'lixia-2024-013',
      name: '立夏花开',
      thumbnail: 'images/lixia/thumbnails/13.jpg',
      image: 'images/lixia/13.png',
      months: [5],
      festivals: ['立夏'],
      description: '立夏节气花开满园主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-001',
      name: '小满麦香',
      thumbnail: 'images/xiaoman/thumbnails/1.jpg',
      image: 'images/xiaoman/1.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气麦香主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-002',
      name: '小满丰收',
      thumbnail: 'images/xiaoman/thumbnails/2.jpg',
      image: 'images/xiaoman/2.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气丰收主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-003',
      name: '小满谷物',
      thumbnail: 'images/xiaoman/thumbnails/3.jpg',
      image: 'images/xiaoman/3.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气谷物饱满主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-004',
      name: '小满田园',
      thumbnail: 'images/xiaoman/thumbnails/4.jpg',
      image: 'images/xiaoman/4.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气田园风光主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-005',
      name: '小满农忙',
      thumbnail: 'images/xiaoman/thumbnails/5.jpg',
      image: 'images/xiaoman/5.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气农忙主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-006',
      name: '小满麦浪',
      thumbnail: 'images/xiaoman/thumbnails/6.jpg',
      image: 'images/xiaoman/6.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气麦浪滚滚主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-007',
      name: '小满阳光',
      thumbnail: 'images/xiaoman/thumbnails/7.jpg',
      image: 'images/xiaoman/7.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气阳光明媚主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-008',
      name: '小满生机',
      thumbnail: 'images/xiaoman/thumbnails/8.jpg',
      image: 'images/xiaoman/8.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气生机勃勃主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-009',
      name: '小满雨水',
      thumbnail: 'images/xiaoman/thumbnails/9.jpg',
      image: 'images/xiaoman/9.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气雨水充沛主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoman-2024-010',
      name: '小满绿意',
      thumbnail: 'images/xiaoman/thumbnails/10.jpg',
      image: 'images/xiaoman/10.png',
      months: [5],
      festivals: ['小满'],
      description: '小满节气绿意盎然主题海报模板',
      type: '节气'
    }

    
  ],

  // 6月模板
  '6月': [
    {
      id: 'fuqinjie-2024-001',
      name: '感恩父爱',
      thumbnail: 'images/fuqinjie/thumbnails/1.jpg',
      image: 'images/fuqinjie/1.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节感恩父爱主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-002',
      name: '父亲节快乐',
      thumbnail: 'images/fuqinjie/thumbnails/2.jpg',
      image: 'images/fuqinjie/2.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节快乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-003',
      name: '父爱如山',
      thumbnail: 'images/fuqinjie/thumbnails/3.jpg',
      image: 'images/fuqinjie/3.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节父爱如山主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-004',
      name: '父亲节祝福',
      thumbnail: 'images/fuqinjie/thumbnails/4.jpg',
      image: 'images/fuqinjie/4.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节祝福主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-005',
      name: '父爱伟大',
      thumbnail: 'images/fuqinjie/thumbnails/5.jpg',
      image: 'images/fuqinjie/5.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节父爱伟大主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-006',
      name: '父亲节感恩',
      thumbnail: 'images/fuqinjie/thumbnails/6.jpg',
      image: 'images/fuqinjie/6.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-007',
      name: '父爱深沉',
      thumbnail: 'images/fuqinjie/thumbnails/7.jpg',
      image: 'images/fuqinjie/7.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节父爱深沉主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-008',
      name: '父亲节温馨',
      thumbnail: 'images/fuqinjie/thumbnails/8.jpg',
      image: 'images/fuqinjie/8.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节温馨主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-009',
      name: '父亲节礼物',
      thumbnail: 'images/fuqinjie/thumbnails/9.jpg',
      image: 'images/fuqinjie/9.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节礼物主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-010',
      name: '父亲节贺卡',
      thumbnail: 'images/fuqinjie/thumbnails/10.jpg',
      image: 'images/fuqinjie/10.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节贺卡主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-011',
      name: '父亲节家庭',
      thumbnail: 'images/fuqinjie/thumbnails/11.jpg',
      image: 'images/fuqinjie/11.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节家庭主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-012',
      name: '父亲节感恩信',
      thumbnail: 'images/fuqinjie/thumbnails/12.jpg',
      image: 'images/fuqinjie/12.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节感恩信主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-013',
      name: '父亲节陪伴',
      thumbnail: 'images/fuqinjie/thumbnails/13.jpg',
      image: 'images/fuqinjie/13.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节陪伴主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-014',
      name: '父亲节时光',
      thumbnail: 'images/fuqinjie/thumbnails/14.jpg',
      image: 'images/fuqinjie/14.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节时光主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-015',
      name: '父亲节父爱永恒',
      thumbnail: 'images/fuqinjie/thumbnails/15.jpg',
      image: 'images/fuqinjie/15.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节父爱永恒主题海报模板',
      type: '西方节日'
    },
    {
      id: 'fuqinjie-2024-016',
      name: '父亲节父爱无疆',
      thumbnail: 'images/fuqinjie/thumbnails/16.jpg',
      image: 'images/fuqinjie/16.png',
      months: [6],
      festivals: ['父亲节'],
      description: '父亲节父爱无疆主题海报模板',
      type: '西方节日'
    },
    {
      id: 'mangzhong-2024-001',
      name: '芒种农忙',
      thumbnail: 'images/mangzhong/thumbnails/1.jpg',
      image: 'images/mangzhong/1.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气农忙主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-002',
      name: '芒种麦收',
      thumbnail: 'images/mangzhong/thumbnails/2.jpg',
      image: 'images/mangzhong/2.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气麦收主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-003',
      name: '芒种耕种',
      thumbnail: 'images/mangzhong/thumbnails/3.jpg',
      image: 'images/mangzhong/3.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气耕种主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-004',
      name: '芒种丰收',
      thumbnail: 'images/mangzhong/thumbnails/4.jpg',
      image: 'images/mangzhong/4.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气丰收主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-005',
      name: '芒种田园',
      thumbnail: 'images/mangzhong/thumbnails/5.jpg',
      image: 'images/mangzhong/5.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气田园风光主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-006',
      name: '芒种谷物',
      thumbnail: 'images/mangzhong/thumbnails/6.jpg',
      image: 'images/mangzhong/6.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气谷物生长主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-007',
      name: '芒种时节',
      thumbnail: 'images/mangzhong/thumbnails/7.jpg',
      image: 'images/mangzhong/7.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气时节主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-008',
      name: '芒种农事',
      thumbnail: 'images/mangzhong/thumbnails/8.jpg',
      image: 'images/mangzhong/8.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气农事活动主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-009',
      name: '芒种希望',
      thumbnail: 'images/mangzhong/thumbnails/9.jpg',
      image: 'images/mangzhong/9.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气希望主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-010',
      name: '芒种勤劳',
      thumbnail: 'images/mangzhong/thumbnails/10.jpg',
      image: 'images/mangzhong/10.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气勤劳主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-011',
      name: '芒种自然',
      thumbnail: 'images/mangzhong/thumbnails/11.jpg',
      image: 'images/mangzhong/11.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气自然风光主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-012',
      name: '芒种收获',
      thumbnail: 'images/mangzhong/thumbnails/12.jpg',
      image: 'images/mangzhong/12.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气收获主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-013',
      name: '芒种田园诗',
      thumbnail: 'images/mangzhong/thumbnails/13.jpg',
      image: 'images/mangzhong/13.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气田园诗主题海报模板',
      type: '节气'
    },
    {
      id: 'mangzhong-2024-014',
      name: '芒种农耕',
      thumbnail: 'images/mangzhong/thumbnails/14.jpg',
      image: 'images/mangzhong/14.png',
      months: [6],
      festivals: ['芒种'],
      description: '芒种节气农耕文化主题海报模板',
      type: '节气'
    },
  
    {
      id: 'ertongjie-2024-001',
      name: '儿童节快乐',
      thumbnail: 'images/ertongjie/thumbnails/1.jpg',
      image: 'images/ertongjie/1.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节快乐童年主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-002',
      name: '儿童节礼物',
      thumbnail: 'images/ertongjie/thumbnails/2.jpg',
      image: 'images/ertongjie/2.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节礼物惊喜主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-003',
      name: '儿童节游戏',
      thumbnail: 'images/ertongjie/thumbnails/3.jpg',
      image: 'images/ertongjie/3.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节游戏娱乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-004',
      name: '儿童节气球',
      thumbnail: 'images/ertongjie/thumbnails/4.jpg',
      image: 'images/ertongjie/4.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节气球派对主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-005',
      name: '儿童节糖果',
      thumbnail: 'images/ertongjie/thumbnails/5.jpg',
      image: 'images/ertongjie/5.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节糖果甜蜜主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-006',
      name: '儿童节玩具',
      thumbnail: 'images/ertongjie/thumbnails/6.jpg',
      image: 'images/ertongjie/6.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节玩具世界主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-007',
      name: '儿童节童话',
      thumbnail: 'images/ertongjie/thumbnails/7.jpg',
      image: 'images/ertongjie/7.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节童话故事主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-008',
      name: '儿童节动画',
      thumbnail: 'images/ertongjie/thumbnails/8.jpg',
      image: 'images/ertongjie/8.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节动画角色主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-009',
      name: '儿童节游乐园',
      thumbnail: 'images/ertongjie/thumbnails/9.jpg',
      image: 'images/ertongjie/9.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节游乐园欢乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-010',
      name: '儿童节彩虹',
      thumbnail: 'images/ertongjie/thumbnails/10.jpg',
      image: 'images/ertongjie/10.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节彩虹梦想主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-011',
      name: '儿童节星星',
      thumbnail: 'images/ertongjie/thumbnails/11.jpg',
      image: 'images/ertongjie/11.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节星星闪耀主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-012',
      name: '儿童节花朵',
      thumbnail: 'images/ertongjie/thumbnails/12.jpg',
      image: 'images/ertongjie/12.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节花朵绽放主题海报模板',
      type: '西方节日'
    },
    {
      id: 'ertongjie-2024-013',
      name: '儿童节动物',
      thumbnail: 'images/ertongjie/thumbnails/13.jpg',
      image: 'images/ertongjie/13.png',
      months: [6],
      festivals: ['儿童节'],
      description: '儿童节动物朋友主题海报模板',
      type: '西方节日'
    },
    {
      id: 'xiazhi-2024-001',
      name: '夏至炎热',
      thumbnail: 'images/xiazhi/thumbnails/1.jpg',
      image: 'images/xiazhi/1.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气防暑主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-002',
      name: '夏至白昼',
      thumbnail: 'images/xiazhi/thumbnails/2.jpg',
      image: 'images/xiazhi/2.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气白昼最长主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-003',
      name: '夏至炎热',
      thumbnail: 'images/xiazhi/thumbnails/3.jpg',
      image: 'images/xiazhi/3.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气炎热主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-004',
      name: '夏至吃面',
      thumbnail: 'images/xiazhi/thumbnails/4.jpg',
      image: 'images/xiazhi/4.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气吃面习俗主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-005',
      name: '夏至清凉',
      thumbnail: 'images/xiazhi/thumbnails/5.jpg',
      image: 'images/xiazhi/5.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气清凉消暑主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-006',
      name: '夏至夏日',
      thumbnail: 'images/xiazhi/thumbnails/6.jpg',
      image: 'images/xiazhi/6.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气夏日风情主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-007',
      name: '夏至阳光',
      thumbnail: 'images/xiazhi/thumbnails/7.jpg',
      image: 'images/xiazhi/7.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气阳光明媚主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-008',
      name: '夏至海滩',
      thumbnail: 'images/xiazhi/thumbnails/8.jpg',
      image: 'images/xiazhi/8.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气海滩度假主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-009',
      name: '夏至游泳',
      thumbnail: 'images/xiazhi/thumbnails/9.jpg',
      image: 'images/xiazhi/9.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气游泳消暑主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-010',
      name: '夏至冰饮',
      thumbnail: 'images/xiazhi/thumbnails/10.jpg',
      image: 'images/xiazhi/10.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气冰饮消暑主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-011',
      name: '夏至风扇',
      thumbnail: 'images/xiazhi/thumbnails/11.jpg',
      image: 'images/xiazhi/11.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气风扇降温主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-012',
      name: '夏至西瓜',
      thumbnail: 'images/xiazhi/thumbnails/12.jpg',
      image: 'images/xiazhi/12.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气西瓜解暑主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-013',
      name: '夏至遮阳',
      thumbnail: 'images/xiazhi/thumbnails/13.jpg',
      image: 'images/xiazhi/13.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气遮阳防晒主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-014',
      name: '夏至夜晚',
      thumbnail: 'images/xiazhi/thumbnails/14.jpg',
      image: 'images/xiazhi/14.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气夜晚清凉主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-015',
      name: '夏至星空',
      thumbnail: 'images/xiazhi/thumbnails/15.jpg',
      image: 'images/xiazhi/15.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气星空观赏主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-016',
      name: '夏至蝉鸣',
      thumbnail: 'images/xiazhi/thumbnails/16.jpg',
      image: 'images/xiazhi/16.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气蝉鸣夏日主题海报模板',
      type: '节气'
    },
    {
      id: 'xiazhi-2024-017',
      name: '夏至节气',
      thumbnail: 'images/xiazhi/thumbnails/17.jpg',
      image: 'images/xiazhi/17.png',
      months: [6],
      festivals: ['夏至'],
      description: '夏至节气主题海报模板',
      type: '节气'
    }
  ],

  // 7月模板
  '7月': [
    {
      id: 'jiandangjie-2024-001',
      name: '建党节快乐',
      thumbnail: 'images/jiandangjie/thumbnails/1.jpg',
      image: 'images/jiandangjie/1.png',
      months: [7],
      festivals: ['建党节'],
      description: '建党节快乐主题海报模板',
      type: '中国节日'
    },
    {
      id: 'jiandangjie-2024-002',
      name: '党的生日',
      thumbnail: 'images/jiandangjie/thumbnails/2.jpg',
      image: 'images/jiandangjie/2.png',
      months: [7],
      festivals: ['建党节'],
      description: '建党节党的生日主题海报模板',
      type: '中国节日'
    },
    {
      id: 'jiandangjie-2024-003',
      name: '红色记忆',
      thumbnail: 'images/jiandangjie/thumbnails/3.jpg',
      image: 'images/jiandangjie/3.png',
      months: [7],
      festivals: ['建党节'],
      description: '建党节红色记忆主题海报模板',
      type: '中国节日'
    },
    {
      id: 'jiandangjie-2024-004',
      name: '爱国教育',
      thumbnail: 'images/jiandangjie/thumbnails/4.jpg',
      image: 'images/jiandangjie/4.png',
      months: [7],
      festivals: ['建党节'],
      description: '建党节爱国教育主题海报模板',
      type: '中国节日'
    },
    {
      id: 'jiandangjie-2024-005',
      name: '建党精神',
      thumbnail: 'images/jiandangjie/thumbnails/5.jpg',
      image: 'images/jiandangjie/5.png',
      months: [7],
      festivals: ['建党节'],
      description: '建党节建党精神主题海报模板',
      type: '中国节日'
    },
    {
      id: 'jiandangjie-2024-006',
      name: '党的光辉',
      thumbnail: 'images/jiandangjie/thumbnails/6.jpg',
      image: 'images/jiandangjie/6.png',
      months: [7],
      festivals: ['建党节'],
      description: '建党节党的光辉主题海报模板',
      type: '中国节日'
    },
    {
      id: 'jiandangjie-2024-007',
      name: '党的历程',
      thumbnail: 'images/jiandangjie/thumbnails/7.jpg',
      image: 'images/jiandangjie/7.png',
      months: [7],
      festivals: ['建党节'],
      description: '建党节党的历程主题海报模板',
      type: '中国节日'
    },
    {
      id: 'jiandangjie-2024-008',
      name: '党的节日',
      thumbnail: 'images/jiandangjie/thumbnails/8.jpg',
      image: 'images/jiandangjie/8.png',
      months: [7],
      festivals: ['建党节'],
      description: '建党节节日主题海报模板',
      type: '中国节日'
    },
    {
      id: 'xiaoshu-2024-001',
      name: '小暑节气',
      thumbnail: 'images/xiaoshu/thumbnails/1.jpg',
      image: 'images/xiaoshu/1.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-002',
      name: '小暑炎热',
      thumbnail: 'images/xiaoshu/thumbnails/2.jpg',
      image: 'images/xiaoshu/2.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气炎热主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-003',
      name: '小暑防暑',
      thumbnail: 'images/xiaoshu/thumbnails/3.jpg',
      image: 'images/xiaoshu/3.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气防暑主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-004',
      name: '小暑清凉',
      thumbnail: 'images/xiaoshu/thumbnails/4.jpg',
      image: 'images/xiaoshu/4.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气清凉主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-005',
      name: '小暑夏日',
      thumbnail: 'images/xiaoshu/thumbnails/5.jpg',
      image: 'images/xiaoshu/5.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气夏日主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-006',
      name: '小暑阳光',
      thumbnail: 'images/xiaoshu/thumbnails/6.jpg',
      image: 'images/xiaoshu/6.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气阳光主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-007',
      name: '小暑热浪',
      thumbnail: 'images/xiaoshu/thumbnails/7.jpg',
      image: 'images/xiaoshu/7.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气热浪主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-008',
      name: '小暑避暑',
      thumbnail: 'images/xiaoshu/thumbnails/8.jpg',
      image: 'images/xiaoshu/8.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气避暑主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-009',
      name: '小暑纳凉',
      thumbnail: 'images/xiaoshu/thumbnails/9.jpg',
      image: 'images/xiaoshu/9.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气纳凉主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-010',
      name: '小暑养生',
      thumbnail: 'images/xiaoshu/thumbnails/10.jpg',
      image: 'images/xiaoshu/10.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-011',
      name: '小暑水果',
      thumbnail: 'images/xiaoshu/thumbnails/11.jpg',
      image: 'images/xiaoshu/11.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气水果主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-012',
      name: '小暑节气节',
      thumbnail: 'images/xiaoshu/thumbnails/12.jpg',
      image: 'images/xiaoshu/12.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气节日主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoshu-2024-013',
      name: '小暑节气末',
      thumbnail: 'images/xiaoshu/thumbnails/13.jpg',
      image: 'images/xiaoshu/13.png',
      months: [7],
      festivals: ['小暑'],
      description: '小暑节气末主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-001',
      name: '大暑节气',
      thumbnail: 'images/dashu/thumbnails/1.jpg',
      image: 'images/dashu/1.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-002',
      name: '大暑炎热',
      thumbnail: 'images/dashu/thumbnails/2.jpg',
      image: 'images/dashu/2.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气炎热主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-003',
      name: '大暑消暑',
      thumbnail: 'images/dashu/thumbnails/3.jpg',
      image: 'images/dashu/3.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气消暑主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-004',
      name: '大暑清凉',
      thumbnail: 'images/dashu/thumbnails/4.jpg',
      image: 'images/dashu/4.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气清凉主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-005',
      name: '大暑夏日',
      thumbnail: 'images/dashu/thumbnails/5.jpg',
      image: 'images/dashu/5.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气夏日主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-006',
      name: '大暑阳光',
      thumbnail: 'images/dashu/thumbnails/6.jpg',
      image: 'images/dashu/6.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气阳光主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-007',
      name: '大暑热浪',
      thumbnail: 'images/dashu/thumbnails/7.jpg',
      image: 'images/dashu/7.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气热浪主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-008',
      name: '大暑避暑',
      thumbnail: 'images/dashu/thumbnails/8.jpg',
      image: 'images/dashu/8.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气避暑主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-009',
      name: '大暑纳凉',
      thumbnail: 'images/dashu/thumbnails/9.jpg',
      image: 'images/dashu/9.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气纳凉主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-010',
      name: '大暑养生',
      thumbnail: 'images/dashu/thumbnails/10.jpg',
      image: 'images/dashu/10.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-011',
      name: '大暑水果',
      thumbnail: 'images/dashu/thumbnails/11.jpg',
      image: 'images/dashu/11.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气水果主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-012',
      name: '大暑游泳',
      thumbnail: 'images/dashu/thumbnails/12.jpg',
      image: 'images/dashu/12.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气游泳主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-013',
      name: '大暑冰饮',
      thumbnail: 'images/dashu/thumbnails/13.jpg',
      image: 'images/dashu/13.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气冰饮主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-014',
      name: '大暑风扇',
      thumbnail: 'images/dashu/thumbnails/14.jpg',
      image: 'images/dashu/14.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气风扇主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-015',
      name: '大暑节气节',
      thumbnail: 'images/dashu/thumbnails/15.jpg',
      image: 'images/dashu/15.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气节日主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-016',
      name: '大暑节气末',
      thumbnail: 'images/dashu/thumbnails/16.jpg',
      image: 'images/dashu/16.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气末主题海报模板',
      type: '节气'
    }
    ,
    {
      id: 'dashu-2024-017',
      name: '大暑节气末',
      thumbnail: 'images/dashu/thumbnails/17.jpg',
      image: 'images/dashu/17.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气末主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-018',
      name: '大暑节气末',
      thumbnail: 'images/dashu/thumbnails/18.jpg',
      image: 'images/dashu/18.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气末主题海报模板',
      type: '节气'
    },
    {
      id: 'dashu-2024-019',
      name: '大暑节气末',
      thumbnail: 'images/dashu/thumbnails/19.jpg',
      image: 'images/dashu/19.png',
      months: [7],
      festivals: ['大暑'],
      description: '大暑节气末主题海报模板',
      type: '节气'
    }
  ],

  // 8月模板
  '8月': [
    {
      id: 'liqiu-2024-001',
      name: '立秋节气',
      thumbnail: 'images/liqiu/thumbnails/1.jpg',
      image: 'images/liqiu/1.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-002',
      name: '立秋凉爽',
      thumbnail: 'images/liqiu/thumbnails/2.jpg',
      image: 'images/liqiu/2.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气凉爽主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-003',
      name: '立秋秋意',
      thumbnail: 'images/liqiu/thumbnails/3.jpg',
      image: 'images/liqiu/3.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋意主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-004',
      name: '立秋秋风',
      thumbnail: 'images/liqiu/thumbnails/4.jpg',
      image: 'images/liqiu/4.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋风主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-005',
      name: '立秋秋叶',
      thumbnail: 'images/liqiu/thumbnails/5.jpg',
      image: 'images/liqiu/5.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋叶主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-006',
      name: '立秋秋天',
      thumbnail: 'images/liqiu/thumbnails/6.jpg',
      image: 'images/liqiu/6.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋天主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-007',
      name: '立秋秋收',
      thumbnail: 'images/liqiu/thumbnails/7.jpg',
      image: 'images/liqiu/7.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋收主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-008',
      name: '立秋秋色',
      thumbnail: 'images/liqiu/thumbnails/8.jpg',
      image: 'images/liqiu/8.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋色主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-009',
      name: '立秋秋韵',
      thumbnail: 'images/liqiu/thumbnails/9.jpg',
      image: 'images/liqiu/9.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋韵主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-010',
      name: '立秋秋凉',
      thumbnail: 'images/liqiu/thumbnails/10.jpg',
      image: 'images/liqiu/10.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋凉主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-011',
      name: '立秋秋高',
      thumbnail: 'images/liqiu/thumbnails/11.jpg',
      image: 'images/liqiu/11.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋高主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-012',
      name: '立秋秋爽',
      thumbnail: 'images/liqiu/thumbnails/12.jpg',
      image: 'images/liqiu/12.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋爽主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-013',
      name: '立秋秋月',
      thumbnail: 'images/liqiu/thumbnails/13.jpg',
      image: 'images/liqiu/13.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋月主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-014',
      name: '立秋秋实',
      thumbnail: 'images/liqiu/thumbnails/14.jpg',
      image: 'images/liqiu/14.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋实主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-015',
      name: '立秋秋景',
      thumbnail: 'images/liqiu/thumbnails/15.jpg',
      image: 'images/liqiu/15.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋景主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-016',
      name: '立秋秋思',
      thumbnail: 'images/liqiu/thumbnails/16.jpg',
      image: 'images/liqiu/16.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-017',
      name: '立秋秋夜',
      thumbnail: 'images/liqiu/thumbnails/17.jpg',
      image: 'images/liqiu/17.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋夜主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-018',
      name: '立秋秋雨',
      thumbnail: 'images/liqiu/thumbnails/18.jpg',
      image: 'images/liqiu/18.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋雨主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-019',
      name: '立秋秋分',
      thumbnail: 'images/liqiu/thumbnails/19.jpg',
      image: 'images/liqiu/19.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气秋分主题海报模板',
      type: '节气'
    },
    {
      id: 'liqiu-2024-020',
      name: '立秋节气末',
      thumbnail: 'images/liqiu/thumbnails/20.jpg',
      image: 'images/liqiu/20.png',
      months: [8],
      festivals: ['立秋'],
      description: '立秋节气末主题海报模板',
      type: '节气'
    },
    {
      id: 'zhongyuan-2024-001',
      name: '中元节',
      thumbnail: 'images/zhongyuan/thumbnails/1.jpg',
      image: 'images/zhongyuan/1.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节传统主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-002',
      name: '中元祭祖',
      thumbnail: 'images/zhongyuan/thumbnails/2.jpg',
      image: 'images/zhongyuan/2.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节祭祖主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-003',
      name: '中元放灯',
      thumbnail: 'images/zhongyuan/thumbnails/3.jpg',
      image: 'images/zhongyuan/3.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节放河灯主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-004',
      name: '中元祀魂',
      thumbnail: 'images/zhongyuan/thumbnails/4.jpg',
      image: 'images/zhongyuan/4.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节祀亡魂主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-005',
      name: '中元传统',
      thumbnail: 'images/zhongyuan/thumbnails/5.jpg',
      image: 'images/zhongyuan/5.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节传统习俗主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-006',
      name: '中元祭祀',
      thumbnail: 'images/zhongyuan/thumbnails/6.jpg',
      image: 'images/zhongyuan/6.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节祭祀主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-007',
      name: '中元祈福',
      thumbnail: 'images/zhongyuan/thumbnails/7.jpg',
      image: 'images/zhongyuan/7.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节祈福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-008',
      name: '中元超度',
      thumbnail: 'images/zhongyuan/thumbnails/8.jpg',
      image: 'images/zhongyuan/8.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节超度亡魂主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-009',
      name: '中元冥币',
      thumbnail: 'images/zhongyuan/thumbnails/9.jpg',
      image: 'images/zhongyuan/9.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节烧冥币主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-010',
      name: '中元纸钱',
      thumbnail: 'images/zhongyuan/thumbnails/10.jpg',
      image: 'images/zhongyuan/10.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节烧纸钱主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-011',
      name: '中元香烛',
      thumbnail: 'images/zhongyuan/thumbnails/11.jpg',
      image: 'images/zhongyuan/11.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节点香烛主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-012',
      name: '中元供品',
      thumbnail: 'images/zhongyuan/thumbnails/12.jpg',
      image: 'images/zhongyuan/12.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节供奉供品主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongyuan-2024-013',
      name: '中元祭品',
      thumbnail: 'images/zhongyuan/thumbnails/13.jpg',
      image: 'images/zhongyuan/13.png',
      months: [8],
      festivals: ['中元节'],
      description: '中元节祭品主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chushu-2024-001',
      name: '处暑节气',
      thumbnail: 'images/chushu/thumbnails/1.jpg',
      image: 'images/chushu/1.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-002',
      name: '处暑秋凉',
      thumbnail: 'images/chushu/thumbnails/2.jpg',
      image: 'images/chushu/2.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋凉主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-003',
      name: '处暑秋意',
      thumbnail: 'images/chushu/thumbnails/3.jpg',
      image: 'images/chushu/3.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋意主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-004',
      name: '处暑秋风',
      thumbnail: 'images/chushu/thumbnails/4.jpg',
      image: 'images/chushu/4.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋风主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-005',
      name: '处暑秋色',
      thumbnail: 'images/chushu/thumbnails/5.jpg',
      image: 'images/chushu/5.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋色主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-006',
      name: '处暑秋韵',
      thumbnail: 'images/chushu/thumbnails/6.jpg',
      image: 'images/chushu/6.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋韵主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-007',
      name: '处暑秋高',
      thumbnail: 'images/chushu/thumbnails/7.jpg',
      image: 'images/chushu/7.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋高主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-008',
      name: '处暑秋爽',
      thumbnail: 'images/chushu/thumbnails/8.jpg',
      image: 'images/chushu/8.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋爽主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-009',
      name: '处暑秋实',
      thumbnail: 'images/chushu/thumbnails/9.jpg',
      image: 'images/chushu/9.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋实主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-010',
      name: '处暑秋景',
      thumbnail: 'images/chushu/thumbnails/10.jpg',
      image: 'images/chushu/10.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋景主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-011',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/11.jpg',
      image: 'images/chushu/11.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-012',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/12.jpg',
      image: 'images/chushu/12.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-013',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/13.jpg',
      image: 'images/chushu/13.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-014',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/14.jpg',
      image: 'images/chushu/14.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-015',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/15.jpg',
      image: 'images/chushu/15.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-016',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/16.jpg',
      image: 'images/chushu/16.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-017',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/17.jpg',
      image: 'images/chushu/17.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-018',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/18.jpg',
      image: 'images/chushu/18.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'chushu-2024-019',
      name: '处暑秋思',
      thumbnail: 'images/chushu/thumbnails/19.jpg',
      image: 'images/chushu/19.png',
      months: [8],
      festivals: ['处暑'],
      description: '处暑节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'qixi-2024-001',
      name: '七夕情人节',
      thumbnail: 'images/qixi/thumbnails/1.jpg',
      image: 'images/qixi/1.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕情人节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-002',
      name: '七夕牛郎织女',
      thumbnail: 'images/qixi/thumbnails/2.jpg',
      image: 'images/qixi/2.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕牛郎织女主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-003',
      name: '七夕鹊桥',
      thumbnail: 'images/qixi/thumbnails/3.jpg',
      image: 'images/qixi/3.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕鹊桥主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-004',
      name: '七夕浪漫',
      thumbnail: 'images/qixi/thumbnails/4.jpg',
      image: 'images/qixi/4.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕浪漫主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-005',
      name: '七夕爱情',
      thumbnail: 'images/qixi/thumbnails/5.jpg',
      image: 'images/qixi/5.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕爱情主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-006',
      name: '七夕乞巧',
      thumbnail: 'images/qixi/thumbnails/6.jpg',
      image: 'images/qixi/6.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕乞巧主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-007',
      name: '七夕星空',
      thumbnail: 'images/qixi/thumbnails/7.jpg',
      image: 'images/qixi/7.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕星空主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-008',
      name: '七夕银河',
      thumbnail: 'images/qixi/thumbnails/8.jpg',
      image: 'images/qixi/8.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕银河主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-009',
      name: '七夕思念',
      thumbnail: 'images/qixi/thumbnails/9.jpg',
      image: 'images/qixi/9.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕思念主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-010',
      name: '七夕相会',
      thumbnail: 'images/qixi/thumbnails/10.jpg',
      image: 'images/qixi/10.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕相会主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-011',
      name: '七夕誓言',
      thumbnail: 'images/qixi/thumbnails/11.jpg',
      image: 'images/qixi/11.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕誓言主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-012',
      name: '七夕礼物',
      thumbnail: 'images/qixi/thumbnails/12.jpg',
      image: 'images/qixi/12.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕礼物主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-013',
      name: '七夕祝福',
      thumbnail: 'images/qixi/thumbnails/13.jpg',
      image: 'images/qixi/13.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-014',
      name: '七夕甜蜜',
      thumbnail: 'images/qixi/thumbnails/14.jpg',
      image: 'images/qixi/14.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕甜蜜主题海报模板',
      type: '传统节日'
    },
    {
      id: 'qixi-2024-015',
      name: '七夕永恒',
      thumbnail: 'images/qixi/thumbnails/15.jpg',
      image: 'images/qixi/15.png',
      months: [8],
      festivals: ['七夕节'],
      description: '七夕永恒主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-001',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/1.jpg',
      image: 'images/jianjunjie/1.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-002',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/2.jpg',
      image: 'images/jianjunjie/2.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-003',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/3.jpg',
      image: 'images/jianjunjie/3.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-004',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/4.jpg',
      image: 'images/jianjunjie/4.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-005',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/5.jpg',
      image: 'images/jianjunjie/5.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-006',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/6.jpg',
      image: 'images/jianjunjie/6.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-007',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/7.jpg',
      image: 'images/jianjunjie/7.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-008',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/8.jpg',
      image: 'images/jianjunjie/8.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-009',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/9.jpg',
      image: 'images/jianjunjie/9.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-010',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/10.jpg',
      image: 'images/jianjunjie/10.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-011',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/11.jpg',
      image: 'images/jianjunjie/11.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-012',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/12.jpg',
      image: 'images/jianjunjie/12.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jianjunjie-2024-013',
      name: '建军节',
      thumbnail: 'images/jianjunjie/thumbnails/13.jpg',
      image: 'images/jianjunjie/13.png',
      months: [8],
      festivals: ['建军节'],
      description: '建军节主题海报模板',
      type: '传统节日'
    }
  ],

  // 9月模板
  '9月': [
    {
      id: 'zhongqiu-2024-001',
      name: '中秋节',
      thumbnail: 'images/zhongqiu/thumbnails/1.jpg',
      image: 'images/zhongqiu/1.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-002',
      name: '中秋团圆',
      thumbnail: 'images/zhongqiu/thumbnails/2.jpg',
      image: 'images/zhongqiu/2.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节团圆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-003',
      name: '中秋赏月',
      thumbnail: 'images/zhongqiu/thumbnails/3.jpg',
      image: 'images/zhongqiu/3.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节赏月主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-004',
      name: '中秋月饼',
      thumbnail: 'images/zhongqiu/thumbnails/4.jpg',
      image: 'images/zhongqiu/4.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节月饼主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-005',
      name: '中秋灯笼',
      thumbnail: 'images/zhongqiu/thumbnails/5.jpg',
      image: 'images/zhongqiu/5.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节灯笼主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-006',
      name: '中秋玉兔',
      thumbnail: 'images/zhongqiu/thumbnails/6.jpg',
      image: 'images/zhongqiu/6.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节玉兔主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-007',
      name: '中秋嫦娥',
      thumbnail: 'images/zhongqiu/thumbnails/7.jpg',
      image: 'images/zhongqiu/7.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节嫦娥主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-008',
      name: '中秋桂花',
      thumbnail: 'images/zhongqiu/thumbnails/8.jpg',
      image: 'images/zhongqiu/8.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节桂花主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-009',
      name: '中秋思念',
      thumbnail: 'images/zhongqiu/thumbnails/9.jpg',
      image: 'images/zhongqiu/9.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节思念主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-010',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/10.jpg',
      image: 'images/zhongqiu/10.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-011',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/11.jpg',
      image: 'images/zhongqiu/11.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-012',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/12.jpg',
      image: 'images/zhongqiu/12.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-013',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/13.jpg',
      image: 'images/zhongqiu/13.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-014',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/14.jpg',
      image: 'images/zhongqiu/14.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-015',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/15.jpg',
      image: 'images/zhongqiu/15.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-016',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/16.jpg',
      image: 'images/zhongqiu/16.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-017',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/17.jpg',
      image: 'images/zhongqiu/17.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-018',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/18.jpg',
      image: 'images/zhongqiu/18.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-019',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/19.jpg',
      image: 'images/zhongqiu/19.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-020',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/20.jpg',
      image: 'images/zhongqiu/20.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-021',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/21.jpg',
      image: 'images/zhongqiu/21.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'zhongqiu-2024-022',
      name: '中秋祝福',
      thumbnail: 'images/zhongqiu/thumbnails/22.jpg',
      image: 'images/zhongqiu/22.png',
      months: [9],
      festivals: ['中秋节'],
      description: '中秋节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'jiaoshi-2024-001',
      name: '教师节',
      thumbnail: 'images/jiaoshi/thumbnails/1.jpg',
      image: 'images/jiaoshi/1.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-002',
      name: '教师节感恩',
      thumbnail: 'images/jiaoshi/thumbnails/2.jpg',
      image: 'images/jiaoshi/2.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-003',
      name: '教师节尊师',
      thumbnail: 'images/jiaoshi/thumbnails/3.jpg',
      image: 'images/jiaoshi/3.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节尊师主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-004',
      name: '教师节重教',
      thumbnail: 'images/jiaoshi/thumbnails/4.jpg',
      image: 'images/jiaoshi/4.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节重教主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-005',
      name: '教师节教育',
      thumbnail: 'images/jiaoshi/thumbnails/5.jpg',
      image: 'images/jiaoshi/5.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节教育主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-006',
      name: '教师节知识',
      thumbnail: 'images/jiaoshi/thumbnails/6.jpg',
      image: 'images/jiaoshi/6.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节知识主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-007',
      name: '教师节学习',
      thumbnail: 'images/jiaoshi/thumbnails/7.jpg',
      image: 'images/jiaoshi/7.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节学习主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-008',
      name: '教师节成长',
      thumbnail: 'images/jiaoshi/thumbnails/8.jpg',
      image: 'images/jiaoshi/8.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节成长主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-009',
      name: '教师节奉献',
      thumbnail: 'images/jiaoshi/thumbnails/9.jpg',
      image: 'images/jiaoshi/9.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节奉献主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-010',
      name: '教师节爱心',
      thumbnail: 'images/jiaoshi/thumbnails/10.jpg',
      image: 'images/jiaoshi/10.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节爱心主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-011',
      name: '教师节耐心',
      thumbnail: 'images/jiaoshi/thumbnails/11.jpg',
      image: 'images/jiaoshi/11.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节耐心主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-012',
      name: '教师节智慧',
      thumbnail: 'images/jiaoshi/thumbnails/12.jpg',
      image: 'images/jiaoshi/12.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节智慧主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-013',
      name: '教师节启迪',
      thumbnail: 'images/jiaoshi/thumbnails/13.jpg',
      image: 'images/jiaoshi/13.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节启迪主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-014',
      name: '教师节引导',
      thumbnail: 'images/jiaoshi/thumbnails/14.jpg',
      image: 'images/jiaoshi/14.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节引导主题海报模板',
      type: '西方节日'
    },
    {
      id: 'jiaoshi-2024-015',
      name: '教师节榜样',
      thumbnail: 'images/jiaoshi/thumbnails/15.jpg',
      image: 'images/jiaoshi/15.png',
      months: [9],
      festivals: ['教师节'],
      description: '教师节榜样主题海报模板',
      type: '西方节日'
    },
    {
      id: 'bailu-2024-001',
      name: '白露节气',
      thumbnail: 'images/bailu/thumbnails/1.jpg',
      image: 'images/bailu/1.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-002',
      name: '白露秋凉',
      thumbnail: 'images/bailu/thumbnails/2.jpg',
      image: 'images/bailu/2.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋凉主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-003',
      name: '白露露水',
      thumbnail: 'images/bailu/thumbnails/3.jpg',
      image: 'images/bailu/3.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气露水主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-004',
      name: '白露秋寒',
      thumbnail: 'images/bailu/thumbnails/4.jpg',
      image: 'images/bailu/4.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋寒主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-005',
      name: '白露秋意',
      thumbnail: 'images/bailu/thumbnails/5.jpg',
      image: 'images/bailu/5.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋意主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-006',
      name: '白露秋风',
      thumbnail: 'images/bailu/thumbnails/6.jpg',
      image: 'images/bailu/6.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋风主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-007',
      name: '白露秋色',
      thumbnail: 'images/bailu/thumbnails/7.jpg',
      image: 'images/bailu/7.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋色主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-008',
      name: '白露秋韵',
      thumbnail: 'images/bailu/thumbnails/8.jpg',
      image: 'images/bailu/8.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋韵主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-009',
      name: '白露秋高',
      thumbnail: 'images/bailu/thumbnails/9.jpg',
      image: 'images/bailu/9.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋高主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-010',
      name: '白露秋爽',
      thumbnail: 'images/bailu/thumbnails/10.jpg',
      image: 'images/bailu/10.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋爽主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-011',
      name: '白露秋实',
      thumbnail: 'images/bailu/thumbnails/11.jpg',
      image: 'images/bailu/11.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋实主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-012',
      name: '白露秋景',
      thumbnail: 'images/bailu/thumbnails/12.jpg',
      image: 'images/bailu/12.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋景主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-013',
      name: '白露秋思',
      thumbnail: 'images/bailu/thumbnails/13.jpg',
      image: 'images/bailu/13.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-014',
      name: '白露秋夜',
      thumbnail: 'images/bailu/thumbnails/14.jpg',
      image: 'images/bailu/14.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋夜主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-015',
      name: '白露秋雨',
      thumbnail: 'images/bailu/thumbnails/15.jpg',
      image: 'images/bailu/15.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋雨主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-016',
      name: '白露秋分',
      thumbnail: 'images/bailu/thumbnails/16.jpg',
      image: 'images/bailu/16.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气秋分主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-017',
      name: '白露节气末',
      thumbnail: 'images/bailu/thumbnails/17.jpg',
      image: 'images/bailu/17.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气末主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-018',
      name: '白露节气末',
      thumbnail: 'images/bailu/thumbnails/18.jpg',
      image: 'images/bailu/18.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气末主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-019',
      name: '白露节气末',
      thumbnail: 'images/bailu/thumbnails/19.jpg',
      image: 'images/bailu/19.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气末主题海报模板',
      type: '节气'
    },
    {
      id: 'bailu-2024-020',
      name: '白露节气末',
      thumbnail: 'images/bailu/thumbnails/20.jpg',
      image: 'images/bailu/20.png',
      months: [9],
      festivals: ['白露'],
      description: '白露节气末主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-001',
      name: '秋分节气',
      thumbnail: 'images/qiufen/thumbnails/1.jpg',
      image: 'images/qiufen/1.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-002',
      name: '秋分昼夜平分',
      thumbnail: 'images/qiufen/thumbnails/2.jpg',
      image: 'images/qiufen/2.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气昼夜平分主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-003',
      name: '秋分秋收',
      thumbnail: 'images/qiufen/thumbnails/3.jpg',
      image: 'images/qiufen/3.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋收主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-004',
      name: '秋分秋意',
      thumbnail: 'images/qiufen/thumbnails/4.jpg',
      image: 'images/qiufen/4.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋意主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-005',
      name: '秋分秋风',
      thumbnail: 'images/qiufen/thumbnails/5.jpg',
      image: 'images/qiufen/5.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋风主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-006',
      name: '秋分秋色',
      thumbnail: 'images/qiufen/thumbnails/6.jpg',
      image: 'images/qiufen/6.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋色主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-007',
      name: '秋分秋韵',
      thumbnail: 'images/qiufen/thumbnails/7.jpg',
      image: 'images/qiufen/7.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋韵主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-008',
      name: '秋分秋高',
      thumbnail: 'images/qiufen/thumbnails/8.jpg',
      image: 'images/qiufen/8.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋高主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-009',
      name: '秋分秋爽',
      thumbnail: 'images/qiufen/thumbnails/9.jpg',
      image: 'images/qiufen/9.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋爽主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-010',
      name: '秋分秋实',
      thumbnail: 'images/qiufen/thumbnails/10.jpg',
      image: 'images/qiufen/10.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋实主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-011',
      name: '秋分秋景',
      thumbnail: 'images/qiufen/thumbnails/11.jpg',
      image: 'images/qiufen/11.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋景主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-012',
      name: '秋分秋思',
      thumbnail: 'images/qiufen/thumbnails/12.jpg',
      image: 'images/qiufen/12.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气秋思主题海报模板',
      type: '节气'
    },
    {
      id: 'qiufen-2024-013',
      name: '秋分节气末',
      thumbnail: 'images/qiufen/thumbnails/13.jpg',
      image: 'images/qiufen/13.png',
      months: [9],
      festivals: ['秋分'],
      description: '秋分节气末主题海报模板',
      type: '节气'
    }
  ],

  // 10月模板
  '10月': [
    {
      id: 'guoqing-2024-001',
      name: '国庆节',
      thumbnail: 'images/guoqing/thumbnails/1.jpg',
      image: 'images/guoqing/1.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-002',
      name: '国庆盛典',
      thumbnail: 'images/guoqing/thumbnails/2.jpg',
      image: 'images/guoqing/2.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节盛典主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-003',
      name: '国庆爱国',
      thumbnail: 'images/guoqing/thumbnails/3.jpg',
      image: 'images/guoqing/3.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节爱国主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-004',
      name: '国庆欢庆',
      thumbnail: 'images/guoqing/thumbnails/4.jpg',
      image: 'images/guoqing/4.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节欢庆主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-005',
      name: '国庆国旗',
      thumbnail: 'images/guoqing/thumbnails/5.jpg',
      image: 'images/guoqing/5.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节国旗主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-006',
      name: '国庆烟花',
      thumbnail: 'images/guoqing/thumbnails/6.jpg',
      image: 'images/guoqing/6.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节烟花主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-007',
      name: '国庆阅兵',
      thumbnail: 'images/guoqing/thumbnails/7.jpg',
      image: 'images/guoqing/7.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节阅兵主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-008',
      name: '国庆出游',
      thumbnail: 'images/guoqing/thumbnails/8.jpg',
      image: 'images/guoqing/8.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节出游主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-009',
      name: '国庆假期',
      thumbnail: 'images/guoqing/thumbnails/9.jpg',
      image: 'images/guoqing/9.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节假期主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-010',
      name: '国庆祝福',
      thumbnail: 'images/guoqing/thumbnails/10.jpg',
      image: 'images/guoqing/10.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节祝福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-011',
      name: '国庆庆典',
      thumbnail: 'images/guoqing/thumbnails/11.jpg',
      image: 'images/guoqing/11.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节庆典主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-012',
      name: '国庆红旗',
      thumbnail: 'images/guoqing/thumbnails/12.jpg',
      image: 'images/guoqing/12.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节红旗主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-013',
      name: '国庆华诞',
      thumbnail: 'images/guoqing/thumbnails/13.jpg',
      image: 'images/guoqing/13.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节华诞主题海报模板',
      type: '传统节日'
    },
    {
      id: 'guoqing-2024-014',
      name: '国庆繁荣',
      thumbnail: 'images/guoqing/thumbnails/14.jpg',
      image: 'images/guoqing/14.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节繁荣主题海报模板',
      type: '传统节日'
    },{
      id: 'guoqing-2024-015',
      name: '国庆繁荣',
      thumbnail: 'images/guoqing/thumbnails/15.jpg',
      image: 'images/guoqing/15.png',
      months: [10],
      festivals: ['国庆节'],
      description: '国庆节繁荣主题海报模板',
      type: '传统节日'
    },
    {
      id: 'hanlu-2024-001',
      name: '寒露',
      thumbnail: 'images/hanlu/thumbnails/1.jpg',
      image: 'images/hanlu/1.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-002',
      name: '寒露秋深',
      thumbnail: 'images/hanlu/thumbnails/2.jpg',
      image: 'images/hanlu/2.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气秋深主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-003',
      name: '寒露凝霜',
      thumbnail: 'images/hanlu/thumbnails/3.jpg',
      image: 'images/hanlu/3.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气凝霜主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-004',
      name: '寒露养生',
      thumbnail: 'images/hanlu/thumbnails/4.jpg',
      image: 'images/hanlu/4.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-005',
      name: '寒露秋意',
      thumbnail: 'images/hanlu/thumbnails/5.jpg',
      image: 'images/hanlu/5.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气秋意主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-006',
      name: '寒露降温',
      thumbnail: 'images/hanlu/thumbnails/6.jpg',
      image: 'images/hanlu/6.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气降温主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-007',
      name: '寒露收获',
      thumbnail: 'images/hanlu/thumbnails/7.jpg',
      image: 'images/hanlu/7.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气收获主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-008',
      name: '寒露秋色',
      thumbnail: 'images/hanlu/thumbnails/8.jpg',
      image: 'images/hanlu/8.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气秋色主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-009',
      name: '寒露保暖',
      thumbnail: 'images/hanlu/thumbnails/9.jpg',
      image: 'images/hanlu/9.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气保暖主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-010',
      name: '寒露晨露',
      thumbnail: 'images/hanlu/thumbnails/10.jpg',
      image: 'images/hanlu/10.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气晨露主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-011',
      name: '寒露秋凉',
      thumbnail: 'images/hanlu/thumbnails/11.jpg',
      image: 'images/hanlu/11.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气秋凉主题海报模板',
      type: '节气'
    },
    {
      id: 'hanlu-2024-012',
      name: '寒露时节',
      thumbnail: 'images/hanlu/thumbnails/12.jpg',
      image: 'images/hanlu/12.png',
      months: [10],
      festivals: ['寒露'],
      description: '寒露节气时节主题海报模板',
      type: '节气'
    },
    {
      id: 'chongyang-2024-001',
      name: '重阳节',
      thumbnail: 'images/chongyang/thumbnails/1.jpg',
      image: 'images/chongyang/1.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-002',
      name: '重阳登高',
      thumbnail: 'images/chongyang/thumbnails/2.jpg',
      image: 'images/chongyang/2.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节登高主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-003',
      name: '重阳赏菊',
      thumbnail: 'images/chongyang/thumbnails/3.jpg',
      image: 'images/chongyang/3.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节赏菊主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-004',
      name: '重阳敬老',
      thumbnail: 'images/chongyang/thumbnails/4.jpg',
      image: 'images/chongyang/4.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节敬老主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-005',
      name: '重阳祈福',
      thumbnail: 'images/chongyang/thumbnails/5.jpg',
      image: 'images/chongyang/5.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节祈福主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-006',
      name: '重阳秋色',
      thumbnail: 'images/chongyang/thumbnails/6.jpg',
      image: 'images/chongyang/6.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节秋色主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-007',
      name: '重阳菊花',
      thumbnail: 'images/chongyang/thumbnails/7.jpg',
      image: 'images/chongyang/7.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节菊花主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-008',
      name: '重阳思念',
      thumbnail: 'images/chongyang/thumbnails/8.jpg',
      image: 'images/chongyang/8.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节思念主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-009',
      name: '重阳团聚',
      thumbnail: 'images/chongyang/thumbnails/9.jpg',
      image: 'images/chongyang/9.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节团聚主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-010',
      name: '重阳健康',
      thumbnail: 'images/chongyang/thumbnails/10.jpg',
      image: 'images/chongyang/10.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节健康主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-011',
      name: '重阳长寿',
      thumbnail: 'images/chongyang/thumbnails/11.jpg',
      image: 'images/chongyang/11.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节长寿主题海报模板',
      type: '传统节日'
    },,
    {
      id: 'chongyang-2024-011',
      name: '重阳长寿',
      thumbnail: 'images/chongyang/thumbnails/11.jpg',
      image: 'images/chongyang/11.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节长寿主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-012',
      name: '重阳长寿',
      thumbnail: 'images/chongyang/thumbnails/12.jpg',
      image: 'images/chongyang/12.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节长寿主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-013',
      name: '重阳长寿',
      thumbnail: 'images/chongyang/thumbnails/13.jpg',
      image: 'images/chongyang/13.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节长寿主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-014',
      name: '重阳长寿',
      thumbnail: 'images/chongyang/thumbnails/14.jpg',
      image: 'images/chongyang/14.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节长寿主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-015',
      name: '重阳长寿',
      thumbnail: 'images/chongyang/thumbnails/15.jpg',
      image: 'images/chongyang/15.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节长寿主题海报模板',
      type: '传统节日'
    },
    {
      id: 'chongyang-2024-016',
      name: '重阳长寿',
      thumbnail: 'images/chongyang/thumbnails/16.jpg',
      image: 'images/chongyang/16.png',
      months: [10],
      festivals: ['重阳节'],
      description: '重阳节长寿主题海报模板',
      type: '传统节日'
    },
    {
      id: 'shuangjiang-2024-001',
      name: '霜降',
      thumbnail: 'images/shuangjiang/thumbnails/1.jpg',
      image: 'images/shuangjiang/1.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-002',
      name: '霜降初霜',
      thumbnail: 'images/shuangjiang/thumbnails/2.jpg',
      image: 'images/shuangjiang/2.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气初霜主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-003',
      name: '霜降降温',
      thumbnail: 'images/shuangjiang/thumbnails/3.jpg',
      image: 'images/shuangjiang/3.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气降温主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-004',
      name: '霜降秋末',
      thumbnail: 'images/shuangjiang/thumbnails/4.jpg',
      image: 'images/shuangjiang/4.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气秋末主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-005',
      name: '霜降保暖',
      thumbnail: 'images/shuangjiang/thumbnails/5.jpg',
      image: 'images/shuangjiang/5.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气保暖主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-006',
      name: '霜降养生',
      thumbnail: 'images/shuangjiang/thumbnails/6.jpg',
      image: 'images/shuangjiang/6.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-007',
      name: '霜降收获',
      thumbnail: 'images/shuangjiang/thumbnails/7.jpg',
      image: 'images/shuangjiang/7.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气收获主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-008',
      name: '霜降冬近',
      thumbnail: 'images/shuangjiang/thumbnails/8.jpg',
      image: 'images/shuangjiang/8.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气冬近主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-009',
      name: '霜降秋收',
      thumbnail: 'images/shuangjiang/thumbnails/9.jpg',
      image: 'images/shuangjiang/9.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气秋收主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-010',
      name: '霜降时节',
      thumbnail: 'images/shuangjiang/thumbnails/10.jpg',
      image: 'images/shuangjiang/10.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气时节主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-011',
      name: '霜降时节',
      thumbnail: 'images/shuangjiang/thumbnails/11.jpg',
      image: 'images/shuangjiang/11.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气时节主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-012',
      name: '霜降时节',
      thumbnail: 'images/shuangjiang/thumbnails/12.jpg',
      image: 'images/shuangjiang/12.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气时节主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-013',
      name: '霜降时节',
      thumbnail: 'images/shuangjiang/thumbnails/13.jpg',
      image: 'images/shuangjiang/13.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气时节主题海报模板',
      type: '节气'
    },
    {
      id: 'shuangjiang-2024-014',
      name: '霜降时节',
      thumbnail: 'images/shuangjiang/thumbnails/14.jpg',
      image: 'images/shuangjiang/14.png',
      months: [10],
      festivals: ['霜降'],
      description: '霜降节气时节主题海报模板',
      type: '节气'
    },
    {
      id: 'wanshengjie-2024-001',
      name: '万圣节',
      thumbnail: 'images/wanshengjie/thumbnails/1.jpg',
      image: 'images/wanshengjie/1.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-002',
      name: '万圣节南瓜',
      thumbnail: 'images/wanshengjie/thumbnails/2.jpg',
      image: 'images/wanshengjie/2.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节南瓜主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-003',
      name: '万圣节化妆',
      thumbnail: 'images/wanshengjie/thumbnails/3.jpg',
      image: 'images/wanshengjie/3.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节化妆主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-004',
      name: '万圣节捣蛋',
      thumbnail: 'images/wanshengjie/thumbnails/4.jpg',
      image: 'images/wanshengjie/4.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节捣蛋主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-005',
      name: '万圣节糖果',
      thumbnail: 'images/wanshengjie/thumbnails/5.jpg',
      image: 'images/wanshengjie/5.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节糖果主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-006',
      name: '万圣节幽灵',
      thumbnail: 'images/wanshengjie/thumbnails/6.jpg',
      image: 'images/wanshengjie/6.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节幽灵主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-007',
      name: '万圣节女巫',
      thumbnail: 'images/wanshengjie/thumbnails/7.jpg',
      image: 'images/wanshengjie/7.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节女巫主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-008',
      name: '万圣节狂欢',
      thumbnail: 'images/wanshengjie/thumbnails/8.jpg',
      image: 'images/wanshengjie/8.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节狂欢主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-009',
      name: '万圣节派对',
      thumbnail: 'images/wanshengjie/thumbnails/9.jpg',
      image: 'images/wanshengjie/9.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节派对主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-010',
      name: '万圣节恐怖',
      thumbnail: 'images/wanshengjie/thumbnails/10.jpg',
      image: 'images/wanshengjie/10.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节恐怖主题海报模板',
      type: '西方节日'
    },
    {
      id: 'wanshengjie-2024-011',
      name: '万圣节魔法',
      thumbnail: 'images/wanshengjie/thumbnails/11.jpg',
      image: 'images/wanshengjie/11.png',
      months: [10],
      festivals: ['万圣节'],
      description: '万圣节魔法主题海报模板',
      type: '西方节日'
    }
  ],

  // 11月模板
  '11月': [
    {
      id: 'thanksgiving-2024-001',
      name: '感恩节感恩',
      thumbnail: 'images/ganenjie/thumbnails/1.jpg',
      image: 'images/ganenjie/1.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-002',
      name: '感恩节火鸡',
      thumbnail: 'images/ganenjie/thumbnails/2.jpg',
      image: 'images/ganenjie/2.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节火鸡主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-003',
      name: '感恩家人',
      thumbnail: 'images/ganenjie/thumbnails/3.jpg',
      image: 'images/ganenjie/3.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节家庭团聚主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-004',
      name: '感恩丰收',
      thumbnail: 'images/ganenjie/thumbnails/4.jpg',
      image: 'images/ganenjie/4.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节丰收主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-005',
      name: '感恩晚宴',
      thumbnail: 'images/ganenjie/thumbnails/5.jpg',
      image: 'images/ganenjie/5.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节晚宴主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-006',
      name: '感恩祝福',
      thumbnail: 'images/ganenjie/thumbnails/6.jpg',
      image: 'images/ganenjie/6.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节祝福主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-007',
      name: '感恩生活',
      thumbnail: 'images/ganenjie/thumbnails/7.jpg',
      image: 'images/ganenjie/7.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节生活感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-008',
      name: '感恩有你',
      thumbnail: 'images/ganenjie/thumbnails/8.jpg',
      image: 'images/ganenjie/8.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节感谢有你主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-009',
      name: '感恩节派对',
      thumbnail: 'images/ganenjie/thumbnails/9.jpg',
      image: 'images/ganenjie/9.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节派对主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-010',
      name: '感恩节玉米',
      thumbnail: 'images/ganenjie/thumbnails/10.jpg',
      image: 'images/ganenjie/10.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节玉米装饰主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-011',
      name: '感恩自然',
      thumbnail: 'images/ganenjie/thumbnails/11.jpg',
      image: 'images/ganenjie/11.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节自然感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-012',
      name: '感恩节南瓜',
      thumbnail: 'images/ganenjie/thumbnails/12.jpg',
      image: 'images/ganenjie/12.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节南瓜主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-013',
      name: '感恩陪伴',
      thumbnail: 'images/ganenjie/thumbnails/13.jpg',
      image: 'images/ganenjie/13.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节陪伴主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-014',
      name: '感恩节餐桌',
      thumbnail: 'images/ganenjie/thumbnails/14.jpg',
      image: 'images/ganenjie/14.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节餐桌布置主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-015',
      name: '感恩节贺卡',
      thumbnail: 'images/ganenjie/thumbnails/15.jpg',
      image: 'images/ganenjie/15.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节贺卡风格海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-016',
      name: '感恩节枫叶',
      thumbnail: 'images/ganenjie/thumbnails/16.jpg',
      image: 'images/ganenjie/16.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节枫叶主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-017',
      name: '感恩相遇',
      thumbnail: 'images/ganenjie/thumbnails/17.jpg',
      image: 'images/ganenjie/17.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节相遇主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-018',
      name: '感恩节快乐',
      thumbnail: 'images/ganenjie/thumbnails/18.jpg',
      image: 'images/ganenjie/18.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节快乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-019',
      name: '感恩岁月',
      thumbnail: 'images/ganenjie/thumbnails/19.jpg',
      image: 'images/ganenjie/19.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节岁月感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-020',
      name: '感恩友情',
      thumbnail: 'images/ganenjie/thumbnails/20.jpg',
      image: 'images/ganenjie/20.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节友情主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-021',
      name: '感恩收获',
      thumbnail: 'images/ganenjie/thumbnails/21.jpg',
      image: 'images/ganenjie/21.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节收获主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-022',
      name: '感恩时光',
      thumbnail: 'images/ganenjie/thumbnails/22.jpg',
      image: 'images/ganenjie/22.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节时光主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-023',
      name: '感恩温暖',
      thumbnail: 'images/ganenjie/thumbnails/23.jpg',
      image: 'images/ganenjie/23.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节温暖主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-024',
      name: '感恩美好',
      thumbnail: 'images/ganenjie/thumbnails/24.jpg',
      image: 'images/ganenjie/24.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节美好主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-025',
      name: '感恩馈赠',
      thumbnail: 'images/ganenjie/thumbnails/25.jpg',
      image: 'images/ganenjie/25.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节馈赠主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-026',
      name: '感恩团聚',
      thumbnail: 'images/ganenjie/thumbnails/26.jpg',
      image: 'images/ganenjie/26.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节团聚主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-027',
      name: '感恩幸福',
      thumbnail: 'images/ganenjie/thumbnails/27.jpg',
      image: 'images/ganenjie/27.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节幸福主题海报模板',
      type: '西方节日'
    },
    {
      id: 'thanksgiving-2024-028',
      name: '感恩心意',
      thumbnail: 'images/ganenjie/thumbnails/28.jpg',
      image: 'images/ganenjie/28.png',
      months: [11],
      festivals: ['感恩节'],
      description: '感恩节心意主题海报模板',
      type: '西方节日'
    },
    
    // 立冬节气模板 - 13 个模板
    {
      id: 'lidong-2024-001',
      name: '立冬初冬',
      thumbnail: 'images/lidong/thumbnails/1.jpg',
      image: 'images/lidong/1.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气初冬主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-002',
      name: '立冬冬始',
      thumbnail: 'images/lidong/thumbnails/2.jpg',
      image: 'images/lidong/2.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气冬季开始主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-003',
      name: '立冬收藏',
      thumbnail: 'images/lidong/thumbnails/3.jpg',
      image: 'images/lidong/3.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气万物收藏主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-004',
      name: '立冬补冬',
      thumbnail: 'images/lidong/thumbnails/4.jpg',
      image: 'images/lidong/4.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气补冬养生主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-005',
      name: '立冬饺子',
      thumbnail: 'images/lidong/thumbnails/5.jpg',
      image: 'images/lidong/5.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气吃饺子传统主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-006',
      name: '立冬温暖',
      thumbnail: 'images/lidong/thumbnails/6.jpg',
      image: 'images/lidong/6.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气温暖主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-007',
      name: '立冬寒意',
      thumbnail: 'images/lidong/thumbnails/7.jpg',
      image: 'images/lidong/7.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气寒意主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-008',
      name: '立冬初雪',
      thumbnail: 'images/lidong/thumbnails/8.jpg',
      image: 'images/lidong/8.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气初雪主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-009',
      name: '立冬暖阳',
      thumbnail: 'images/lidong/thumbnails/9.jpg',
      image: 'images/lidong/9.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气暖阳主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-010',
      name: '立冬静美',
      thumbnail: 'images/lidong/thumbnails/10.jpg',
      image: 'images/lidong/10.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气静美主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-011',
      name: '立冬诗意',
      thumbnail: 'images/lidong/thumbnails/11.jpg',
      image: 'images/lidong/11.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气诗意主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-012',
      name: '立冬美景',
      thumbnail: 'images/lidong/thumbnails/12.jpg',
      image: 'images/lidong/12.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气美景主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-013',
      name: '立冬祝福',
      thumbnail: 'images/lidong/thumbnails/13.jpg',
      image: 'images/lidong/13.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气祝福主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-014',
      name: '立冬瑞雪',
      thumbnail: 'images/lidong/thumbnails/14.jpg',
      image: 'images/lidong/14.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气瑞雪主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-015',
      name: '立冬养生',
      thumbnail: 'images/lidong/thumbnails/15.jpg',
      image: 'images/lidong/15.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-016',
      name: '立冬进补',
      thumbnail: 'images/lidong/thumbnails/16.jpg',
      image: 'images/lidong/16.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气进补主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-017',
      name: '立冬温馨',
      thumbnail: 'images/lidong/thumbnails/17.jpg',
      image: 'images/lidong/17.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气温馨主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-018',
      name: '立冬团圆',
      thumbnail: 'images/lidong/thumbnails/18.jpg',
      image: 'images/lidong/18.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气团圆主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-019',
      name: '立冬传统',
      thumbnail: 'images/lidong/thumbnails/19.jpg',
      image: 'images/lidong/19.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气传统主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-020',
      name: '立冬迎春',
      thumbnail: 'images/lidong/thumbnails/20.jpg',
      image: 'images/lidong/20.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气迎春主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-021',
      name: '立冬祈福',
      thumbnail: 'images/lidong/thumbnails/21.jpg',
      image: 'images/lidong/21.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气祈福主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-022',
      name: '立冬安康',
      thumbnail: 'images/lidong/thumbnails/22.jpg',
      image: 'images/lidong/22.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气安康主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-023',
      name: '立冬暖意',
      thumbnail: 'images/lidong/thumbnails/23.jpg',
      image: 'images/lidong/23.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气暖意主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-024',
      name: '立冬欢聚',
      thumbnail: 'images/lidong/thumbnails/24.jpg',
      image: 'images/lidong/24.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气欢聚主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-025',
      name: '立冬饺子香',
      thumbnail: 'images/lidong/thumbnails/25.jpg',
      image: 'images/lidong/25.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气饺子香主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-026',
      name: '立冬诗意浓',
      thumbnail: 'images/lidong/thumbnails/26.jpg',
      image: 'images/lidong/26.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气诗意浓主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-027',
      name: '立冬雪纷飞',
      thumbnail: 'images/lidong/thumbnails/27.jpg',
      image: 'images/lidong/27.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气雪纷飞主题海报模板',
      type: '节气'
    },
    {
      id: 'lidong-2024-028',
      name: '立冬好时节',
      thumbnail: 'images/lidong/thumbnails/28.jpg',
      image: 'images/lidong/28.png',
      months: [11],
      festivals: ['立冬'],
      description: '立冬节气好时节主题海报模板',
      type: '节气'
    },
    
    {
      id: 'xiaoxue-2024-001',
      name: '小雪初降',
      thumbnail: 'images/xiaoxue/thumbnails/1.jpg',
      image: 'images/xiaoxue/1.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气初雪主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoxue-2024-002',
      name: '小雪雪景',
      thumbnail: 'images/xiaoxue/thumbnails/2.jpg',
      image: 'images/xiaoxue/2.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气雪景主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoxue-2024-003',
      name: '小雪冬韵',
      thumbnail: 'images/xiaoxue/thumbnails/3.jpg',
      image: 'images/xiaoxue/3.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气冬韵主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoxue-2024-004',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/4.jpg',
      image: 'images/xiaoxue/4.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoxue-2024-005',
      name: '小雪温馨',
      thumbnail: 'images/xiaoxue/thumbnails/5.jpg',
      image: 'images/xiaoxue/5.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气温馨主题海报模板',
      type: '节气'
    },
    {
      id: 'xiaoxue-2024-006',
      name: '小雪静谧',
      thumbnail: 'images/xiaoxue/thumbnails/6.jpg',
      image: 'images/xiaoxue/6.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气静谧主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-007',
      name: '小雪丰年',
      thumbnail: 'images/xiaoxue/thumbnails/7.jpg',
      image: 'images/xiaoxue/7.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气瑞雪兆丰年主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-008',
      name: '小雪美景',
      thumbnail: 'images/xiaoxue/thumbnails/8.jpg',
      image: 'images/xiaoxue/8.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气美景主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-009',
      name: '小雪冬趣',
      thumbnail: 'images/xiaoxue/thumbnails/9.jpg',
      image: 'images/xiaoxue/9.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气冬趣主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-010',
      name: '小雪静谧',
      thumbnail: 'images/xiaoxue/thumbnails/10.jpg',
      image: 'images/xiaoxue/10.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气静谧主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-011',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/11.jpg',
      image: 'images/xiaoxue/11.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-012',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/12.jpg',
      image: 'images/xiaoxue/12.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-013',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/13.jpg',
      image: 'images/xiaoxue/13.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-014',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/14.jpg',
      image: 'images/xiaoxue/14.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-015',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/15.jpg',
      image: 'images/xiaoxue/15.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-016',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/16.jpg',
      image: 'images/xiaoxue/16.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-017',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/17.jpg',
      image: 'images/xiaoxue/17.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-018',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/18.jpg',
      image: 'images/xiaoxue/18.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-019',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/19.jpg',
      image: 'images/xiaoxue/19.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    },
    {      id: 'xiaoxue-2024-020',
      name: '小雪诗意',
      thumbnail: 'images/xiaoxue/thumbnails/20.jpg',
      image: 'images/xiaoxue/20.png',
      months: [11],
      festivals: ['小雪'],
      description: '小雪节气诗意主题海报模板',
      type: '节气'
    }
  ],

  // 12月模板
  '12月': [
    
    
    
    { id: 'daxue-2024-001',
      name: '大雪纷飞',
      thumbnail: 'images/daxue/thumbnails/1.jpg',
      image: 'images/daxue/1.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气雪景主题海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-002',
      name: '大雪冬日',
      thumbnail: 'images/daxue/thumbnails/2.jpg',
      image: 'images/daxue/2.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气冬日风光海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-003',
      name: '大雪银装',
      thumbnail: 'images/daxue/thumbnails/3.jpg',
      image: 'images/daxue/3.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气银装素裹海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-004',
      name: '大雪寒梅',
      thumbnail: 'images/daxue/thumbnails/4.jpg',
      image: 'images/daxue/4.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气寒梅绽放海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-005',
      name: '大雪冬韵',
      thumbnail: 'images/daxue/thumbnails/5.jpg',
      image: 'images/daxue/5.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气冬日韵味海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-006',
      name: '大雪雪景',
      thumbnail: 'images/daxue/thumbnails/6.jpg',
      image: 'images/daxue/6.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气雪景风光海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-007',
      name: '大雪静谧',
      thumbnail: 'images/daxue/thumbnails/7.jpg',
      image: 'images/daxue/7.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气静谧雪景海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-008',
      name: '大雪冬至',
      thumbnail: 'images/daxue/thumbnails/8.jpg',
      image: 'images/daxue/8.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气冬至临近海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-009',
      name: '大雪养生',
      thumbnail: 'images/daxue/thumbnails/9.jpg',
      image: 'images/daxue/9.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气养生保健海报模板',
      type: '节气'
    },
    { id: 'daxue-2024-010',
      name: '大雪迎年',
      thumbnail: 'images/daxue/thumbnails/10.jpg',
      image: 'images/daxue/10.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气迎接新年海报模板',
      type: '节气'
    },
     { id: 'daxue-2024-011',
      name: '大雪迎年',
      thumbnail: 'images/daxue/thumbnails/11.jpg',
      image: 'images/daxue/11.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气迎接新年海报模板',
      type: '节气'
    },
     { id: 'daxue-2024-012',
      name: '大雪迎年',
      thumbnail: 'images/daxue/thumbnails/12.jpg',
      image: 'images/daxue/12.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气迎接新年海报模板',
      type: '节气'
    },
     { id: 'daxue-2024-013',
      name: '大雪迎年',
      thumbnail: 'images/daxue/thumbnails/13.jpg',
      image: 'images/daxue/13.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气迎接新年海报模板',
      type: '节气'
    },
     { id: 'daxue-2024-014',
      name: '大雪迎年',
      thumbnail: 'images/daxue/thumbnails/14.jpg',
      image: 'images/daxue/14.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气迎接新年海报模板',
      type: '节气'
    },
     { id: 'daxue-2024-015',
      name: '大雪迎年',
      thumbnail: 'images/daxue/thumbnails/15.jpg',
      image: 'images/daxue/15.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气迎接新年海报模板',
      type: '节气'
    },
     { id: 'daxue-2024-016',
      name: '大雪迎年',
      thumbnail: 'images/daxue/thumbnails/16.jpg',
      image: 'images/daxue/16.png',
      months: [12],
      festivals: ['大雪'],
      description: '大雪节气迎接新年海报模板',
      type: '节气'
    },
     
    {
      id: 'dongzhi-2024-001',
      name: '冬至团圆',
      thumbnail: 'images/dongzhi/thumbnails/1.jpg',
      image: 'images/dongzhi/1.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气团圆主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-002',
      name: '冬至饺子',
      thumbnail: 'images/dongzhi/thumbnails/2.jpg',
      image: 'images/dongzhi/2.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气饺子主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-003',
      name: '冬至汤圆',
      thumbnail: 'images/dongzhi/thumbnails/3.jpg',
      image: 'images/dongzhi/3.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气汤圆主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-004',
      name: '冬至养生',
      thumbnail: 'images/dongzhi/thumbnails/4.jpg',
      image: 'images/dongzhi/4.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气养生主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-005',
      name: '冬至冬至',
      thumbnail: 'images/dongzhi/thumbnails/5.jpg',
      image: 'images/dongzhi/5.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气传统习俗海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-006',
      name: '冬至温暖',
      thumbnail: 'images/dongzhi/thumbnails/6.jpg',
      image: 'images/dongzhi/6.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气温暖主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-007',
      name: '冬至祝福',
      thumbnail: 'images/dongzhi/thumbnails/7.jpg',
      image: 'images/dongzhi/7.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气祝福主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-008',
      name: '冬至迎年',
      thumbnail: 'images/dongzhi/thumbnails/8.jpg',
      image: 'images/dongzhi/8.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气迎接新年海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-009',
      name: '冬至瑞雪',
      thumbnail: 'images/dongzhi/thumbnails/9.jpg',
      image: 'images/dongzhi/9.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气瑞雪主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-010',
      name: '冬至祈福',
      thumbnail: 'images/dongzhi/thumbnails/10.jpg',
      image: 'images/dongzhi/10.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气祈福主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-011',
      name: '冬至团圆饭',
      thumbnail: 'images/dongzhi/thumbnails/11.jpg',
      image: 'images/dongzhi/11.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气团圆饭主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-012',
      name: '冬至暖阳',
      thumbnail: 'images/dongzhi/thumbnails/12.jpg',
      image: 'images/dongzhi/12.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气暖阳主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-013',
      name: '冬至寒冬',
      thumbnail: 'images/dongzhi/thumbnails/13.jpg',
      image: 'images/dongzhi/13.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气寒冬主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-014',
      name: '冬至传统',
      thumbnail: 'images/dongzhi/thumbnails/14.jpg',
      image: 'images/dongzhi/14.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气传统主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-015',
      name: '冬至温馨',
      thumbnail: 'images/dongzhi/thumbnails/15.jpg',
      image: 'images/dongzhi/15.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气温馨主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-016',
      name: '冬至欢聚',
      thumbnail: 'images/dongzhi/thumbnails/16.jpg',
      image: 'images/dongzhi/16.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气欢聚主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-017',
      name: '冬至祭祖',
      thumbnail: 'images/dongzhi/thumbnails/17.jpg',
      image: 'images/dongzhi/17.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气祭祖主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-018',
      name: '冬至进补',
      thumbnail: 'images/dongzhi/thumbnails/18.jpg',
      image: 'images/dongzhi/18.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气进补主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-019',
      name: '冬至数九',
      thumbnail: 'images/dongzhi/thumbnails/19.jpg',
      image: 'images/dongzhi/19.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气数九主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-020',
      name: '冬至长夜',
      thumbnail: 'images/dongzhi/thumbnails/20.jpg',
      image: 'images/dongzhi/20.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气长夜主题海报模板',
      type: '节气'
    },
    {
      id: 'dongzhi-2024-021',
      name: '冬至迎春',
      thumbnail: 'images/dongzhi/thumbnails/21.jpg',
      image: 'images/dongzhi/21.png',
      months: [12],
      festivals: ['冬至'],
      description: '冬至节气迎春主题海报模板',
      type: '节气'
    },
    {
      id: 'christmas-2024-001',
      name: '圣诞快乐',
      thumbnail: 'images/shengdan/thumbnails/1.jpg',
      image: 'images/shengdan/1.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节快乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-002',
      name: '圣诞温馨',
      thumbnail: 'images/shengdan/thumbnails/2.jpg',
      image: 'images/shengdan/2.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节温馨主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-003',
      name: '圣诞祝福',
      thumbnail: 'images/shengdan/thumbnails/3.jpg',
      image: 'images/shengdan/3.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节祝福主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-004',
      name: '圣诞礼物',
      thumbnail: 'images/shengdan/thumbnails/4.jpg',
      image: 'images/shengdan/4.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节礼物主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-005',
      name: '圣诞装饰',
      thumbnail: 'images/shengdan/thumbnails/5.jpg',
      image: 'images/shengdan/5.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节装饰主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-006',
      name: '圣诞派对',
      thumbnail: 'images/shengdan/thumbnails/6.jpg',
      image: 'images/shengdan/6.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节派对主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-007',
      name: '圣诞雪人',
      thumbnail: 'images/shengdan/thumbnails/7.jpg',
      image: 'images/shengdan/7.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节雪人主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-008',
      name: '圣诞钟声',
      thumbnail: 'images/shengdan/thumbnails/8.jpg',
      image: 'images/shengdan/8.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节钟声主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-009',
      name: '圣诞树',
      thumbnail: 'images/shengdan/thumbnails/9.jpg',
      image: 'images/shengdan/9.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞树主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-010',
      name: '圣诞狂欢',
      thumbnail: 'images/shengdan/thumbnails/10.jpg',
      image: 'images/shengdan/10.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节狂欢主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-011',
      name: '圣诞之夜',
      thumbnail: 'images/shengdan/thumbnails/11.jpg',
      image: 'images/shengdan/11.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节之夜主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-012',
      name: '圣诞雪花',
      thumbnail: 'images/shengdan/thumbnails/12.jpg',
      image: 'images/shengdan/12.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节雪花主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-013',
      name: '圣诞感恩',
      thumbnail: 'images/shengdan/thumbnails/13.jpg',
      image: 'images/shengdan/13.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-014',
      name: '圣诞家庭',
      thumbnail: 'images/shengdan/thumbnails/14.jpg',
      image: 'images/shengdan/14.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节家庭团聚主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-015',
      name: '圣诞心愿',
      thumbnail: 'images/shengdan/thumbnails/15.jpg',
      image: 'images/shengdan/15.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节心愿主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-016',
      name: '圣诞惊喜',
      thumbnail: 'images/shengdan/thumbnails/16.jpg',
      image: 'images/shengdan/16.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节惊喜主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-017',
      name: '圣诞欢乐',
      thumbnail: 'images/shengdan/thumbnails/17.jpg',
      image: 'images/shengdan/17.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节欢乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-018',
      name: '圣诞星光',
      thumbnail: 'images/shengdan/thumbnails/18.jpg',
      image: 'images/shengdan/18.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节星光主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-019',
      name: '圣诞希望',
      thumbnail: 'images/shengdan/thumbnails/19.jpg',
      image: 'images/shengdan/19.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节希望主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-020',
      name: '圣诞团圆',
      thumbnail: 'images/shengdan/thumbnails/20.jpg',
      image: 'images/shengdan/20.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节团圆主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-020',
      name: '圣诞团圆',
      thumbnail: 'images/shengdan/thumbnails/21.jpg',
      image: 'images/shengdan/21.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节团圆主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-022',
      name: '圣诞团圆',
      thumbnail: 'images/shengdan/thumbnails/22.jpg',
      image: 'images/shengdan/22.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节团圆主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-023',
      name: '圣诞团圆',
      thumbnail: 'images/shengdan/thumbnails/23.jpg',
      image: 'images/shengdan/23.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节团圆主题海报模板',
      type: '西方节日'
    },
    {
      id: 'christmas-2024-024',
      name: '圣诞团圆',
      thumbnail: 'images/shengdan/thumbnails/24.jpg',
      image: 'images/shengdan/24.png',
      months: [12],
      festivals: ['圣诞节'],
      description: '圣诞节团圆主题海报模板',
      type: '西方节日'
    },
    {
      id: 'yushui-2024-001',
      name: '雨水节气',
      thumbnail: 'images/yushui/thumbnails/1.jpg',
      image: 'images/yushui/1.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-002',
      name: '雨水润物',
      thumbnail: 'images/yushui/thumbnails/2.jpg',
      image: 'images/yushui/2.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气润物细无声主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-003',
      name: '雨水春雨',
      thumbnail: 'images/yushui/thumbnails/3.jpg',
      image: 'images/yushui/3.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气春雨贵如油主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-004',
      name: '雨水降雨',
      thumbnail: 'images/yushui/thumbnails/4.jpg',
      image: 'images/yushui/4.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气降雨开始主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-005',
      name: '雨水滋润',
      thumbnail: 'images/yushui/thumbnails/5.jpg',
      image: 'images/yushui/5.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气滋润万物主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-006',
      name: '雨水节气绿',
      thumbnail: 'images/yushui/thumbnails/6.jpg',
      image: 'images/yushui/6.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气绿色主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-007',
      name: '雨水节气水',
      thumbnail: 'images/yushui/thumbnails/7.jpg',
      image: 'images/yushui/7.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气水元素主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-008',
      name: '雨水节气春',
      thumbnail: 'images/yushui/thumbnails/8.jpg',
      image: 'images/yushui/8.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气春天主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-009',
      name: '雨水节气雨',
      thumbnail: 'images/yushui/thumbnails/9.jpg',
      image: 'images/yushui/9.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气雨滴主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-010',
      name: '雨水节气润',
      thumbnail: 'images/yushui/thumbnails/10.jpg',
      image: 'images/yushui/10.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气润泽主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-011',
      name: '雨水节气生',
      thumbnail: 'images/yushui/thumbnails/11.jpg',
      image: 'images/yushui/11.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气生机勃勃主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-012',
      name: '雨水节气新',
      thumbnail: 'images/yushui/thumbnails/12.jpg',
      image: 'images/yushui/12.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气新生主题海报模板',
      type: '节气'
    },
    {
      id: 'yushui-2024-013',
      name: '雨水节气节',
      thumbnail: 'images/yushui/thumbnails/13.jpg',
      image: 'images/yushui/13.png',
      months: [2],
      festivals: ['雨水'],
      description: '雨水节气节日主题海报模板',
      type: '节气'
    },
    {
      id: 'laodongjie-2024-001',
      name: '劳动节快乐',
      thumbnail: 'images/laodongjie/thumbnails/1.jpg',
      image: 'images/laodongjie/1.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节快乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-002',
      name: '劳动光荣',
      thumbnail: 'images/laodongjie/thumbnails/2.jpg',
      image: 'images/laodongjie/2.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动光荣主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-003',
      name: '致敬劳动者',
      thumbnail: 'images/laodongjie/thumbnails/3.jpg',
      image: 'images/laodongjie/3.png',
      months: [5],
      festivals: ['劳动节'],
      description: '致敬劳动者主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-004',
      name: '五一假期',
      thumbnail: 'images/laodongjie/thumbnails/4.jpg',
      image: 'images/laodongjie/4.png',
      months: [5],
      festivals: ['劳动节'],
      description: '五一假期主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-005',
      name: '劳动节庆祝',
      thumbnail: 'images/laodongjie/thumbnails/5.jpg',
      image: 'images/laodongjie/5.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节庆祝主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-006',
      name: '劳动节工作',
      thumbnail: 'images/laodongjie/thumbnails/6.jpg',
      image: 'images/laodongjie/6.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节工作主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-007',
      name: '劳动节休息',
      thumbnail: 'images/laodongjie/thumbnails/7.jpg',
      image: 'images/laodongjie/7.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节休息主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-008',
      name: '劳动节奋斗',
      thumbnail: 'images/laodongjie/thumbnails/8.jpg',
      image: 'images/laodongjie/8.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节奋斗主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-009',
      name: '劳动节感恩',
      thumbnail: 'images/laodongjie/thumbnails/9.jpg',
      image: 'images/laodongjie/9.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节感恩主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-010',
      name: '劳动节团结',
      thumbnail: 'images/laodongjie/thumbnails/10.jpg',
      image: 'images/laodongjie/10.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节团结主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-011',
      name: '劳动节奉献',
      thumbnail: 'images/laodongjie/thumbnails/11.jpg',
      image: 'images/laodongjie/11.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节奉献主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-012',
      name: '劳动节创造',
      thumbnail: 'images/laodongjie/thumbnails/12.jpg',
      image: 'images/laodongjie/12.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节创造主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-013',
      name: '劳动节成就',
      thumbnail: 'images/laodongjie/thumbnails/13.jpg',
      image: 'images/laodongjie/13.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节成就主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-014',
      name: '劳动节梦想',
      thumbnail: 'images/laodongjie/thumbnails/14.jpg',
      image: 'images/laodongjie/14.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节梦想主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-015',
      name: '劳动节希望',
      thumbnail: 'images/laodongjie/thumbnails/15.jpg',
      image: 'images/laodongjie/15.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节希望主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-016',
      name: '劳动节未来',
      thumbnail: 'images/laodongjie/thumbnails/16.jpg',
      image: 'images/laodongjie/16.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节未来主题海报模板',
      type: '西方节日'
    },
    {
      id: 'laodongjie-2024-017',
      name: '劳动节青春',
      thumbnail: 'images/laodongjie/thumbnails/17.jpg',
      image: 'images/laodongjie/17.png',
      months: [5],
      festivals: ['劳动节'],
      description: '劳动节青春主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-001',
      name: '青年节快乐',
      thumbnail: 'images/qingnianjie/thumbnails/1.jpg',
      image: 'images/qingnianjie/1.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节快乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-002',
      name: '青春活力',
      thumbnail: 'images/qingnianjie/thumbnails/2.jpg',
      image: 'images/qingnianjie/2.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青春活力主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-003',
      name: '青年责任',
      thumbnail: 'images/qingnianjie/thumbnails/3.jpg',
      image: 'images/qingnianjie/3.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年责任主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-004',
      name: '五四精神',
      thumbnail: 'images/qingnianjie/thumbnails/4.jpg',
      image: 'images/qingnianjie/4.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节五四精神主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-005',
      name: '青年梦想',
      thumbnail: 'images/qingnianjie/thumbnails/5.jpg',
      image: 'images/qingnianjie/5.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年梦想主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-006',
      name: '青年奋斗',
      thumbnail: 'images/qingnianjie/thumbnails/6.jpg',
      image: 'images/qingnianjie/6.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年奋斗主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-007',
      name: '青年创新',
      thumbnail: 'images/qingnianjie/thumbnails/7.jpg',
      image: 'images/qingnianjie/7.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年创新主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-008',
      name: '青年希望',
      thumbnail: 'images/qingnianjie/thumbnails/8.jpg',
      image: 'images/qingnianjie/8.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年希望主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-009',
      name: '青年未来',
      thumbnail: 'images/qingnianjie/thumbnails/9.jpg',
      image: 'images/qingnianjie/9.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年未来主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-010',
      name: '青年力量',
      thumbnail: 'images/qingnianjie/thumbnails/10.jpg',
      image: 'images/qingnianjie/10.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年力量主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-011',
      name: '青年团结',
      thumbnail: 'images/qingnianjie/thumbnails/11.jpg',
      image: 'images/qingnianjie/11.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年团结主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-012',
      name: '青年奉献',
      thumbnail: 'images/qingnianjie/thumbnails/12.jpg',
      image: 'images/qingnianjie/12.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年奉献主题海报模板',
      type: '西方节日'
    },
    {
      id: 'qingnianjie-2024-013',
      name: '青年成长',
      thumbnail: 'images/qingnianjie/thumbnails/13.jpg',
      image: 'images/qingnianjie/13.png',
      months: [5],
      festivals: ['青年节'],
      description: '青年节青年成长主题海报模板',
      type: '西方节日'
    },
    
    {
      id: 'shijiedushuri-2024-001',
      name: '世界读书日快乐',
      thumbnail: 'images/shijiedushuri/thumbnails/1.jpg',
      image: 'images/shijiedushuri/1.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日快乐主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-002',
      name: '阅读推广',
      thumbnail: 'images/shijiedushuri/thumbnails/2.jpg',
      image: 'images/shijiedushuri/2.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日阅读推广主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-003',
      name: '知识传播',
      thumbnail: 'images/shijiedushuri/thumbnails/3.jpg',
      image: 'images/shijiedushuri/3.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日知识传播主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-004',
      name: '文化传承',
      thumbnail: 'images/shijiedushuri/thumbnails/4.jpg',
      image: 'images/shijiedushuri/4.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日文化传承主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-005',
      name: '读书乐趣',
      thumbnail: 'images/shijiedushuri/thumbnails/5.jpg',
      image: 'images/shijiedushuri/5.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日读书乐趣主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-006',
      name: '书香世界',
      thumbnail: 'images/shijiedushuri/thumbnails/6.jpg',
      image: 'images/shijiedushuri/6.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日书香世界主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-007',
      name: '智慧阅读',
      thumbnail: 'images/shijiedushuri/thumbnails/7.jpg',
      image: 'images/shijiedushuri/7.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日智慧阅读主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-008',
      name: '阅读人生',
      thumbnail: 'images/shijiedushuri/thumbnails/8.jpg',
      image: 'images/shijiedushuri/8.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日阅读人生主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-009',
      name: '书籍海洋',
      thumbnail: 'images/shijiedushuri/thumbnails/9.jpg',
      image: 'images/shijiedushuri/9.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日书籍海洋主题海报模板',
      type: '西方节日'
    },
    {
      id: 'shijiedushuri-2024-010',
      name: '阅读习惯',
      thumbnail: 'images/shijiedushuri/thumbnails/10.jpg',
      image: 'images/shijiedushuri/10.png',
      months: [4],
      festivals: ['世界读书日'],
      description: '世界读书日阅读习惯主题海报模板',
      type: '西方节日'
    },
    
    {
      id: '520-2024-001',
      name: '520快乐',
      thumbnail: 'images/520/thumbnails/1.jpg',
      image: 'images/520/1.png',
      months: [5],
      festivals: ['520'],
      description: '520快乐主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-002',
      name: '网络情人节',
      thumbnail: 'images/520/thumbnails/2.jpg',
      image: 'images/520/2.png',
      months: [5],
      festivals: ['520'],
      description: '520网络情人节主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-003',
      name: '爱情表白',
      thumbnail: 'images/520/thumbnails/3.jpg',
      image: 'images/520/3.png',
      months: [5],
      festivals: ['520'],
      description: '520爱情表白主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-004',
      name: '浪漫约会',
      thumbnail: 'images/520/thumbnails/4.jpg',
      image: 'images/520/4.png',
      months: [5],
      festivals: ['520'],
      description: '520浪漫约会主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-005',
      name: '520我爱你',
      thumbnail: 'images/520/thumbnails/5.jpg',
      image: 'images/520/5.png',
      months: [5],
      festivals: ['520'],
      description: '520我爱你主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-006',
      name: '甜蜜爱情',
      thumbnail: 'images/520/thumbnails/6.jpg',
      image: 'images/520/6.png',
      months: [5],
      festivals: ['520'],
      description: '520甜蜜爱情主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-007',
      name: '520浪漫',
      thumbnail: 'images/520/thumbnails/7.jpg',
      image: 'images/520/7.png',
      months: [5],
      festivals: ['520'],
      description: '520浪漫主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-008',
      name: '520心动',
      thumbnail: 'images/520/thumbnails/8.jpg',
      image: 'images/520/8.png',
      months: [5],
      festivals: ['520'],
      description: '520心动主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-009',
      name: '520告白',
      thumbnail: 'images/520/thumbnails/9.jpg',
      image: 'images/520/9.png',
      months: [5],
      festivals: ['520'],
      description: '520告白主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-010',
      name: '520情书',
      thumbnail: 'images/520/thumbnails/10.jpg',
      image: 'images/520/10.png',
      months: [5],
      festivals: ['520'],
      description: '520情书主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-011',
      name: '520约会',
      thumbnail: 'images/520/thumbnails/11.jpg',
      image: 'images/520/11.png',
      months: [5],
      festivals: ['520'],
      description: '520约会主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-012',
      name: '520礼物',
      thumbnail: 'images/520/thumbnails/12.jpg',
      image: 'images/520/12.png',
      months: [5],
      festivals: ['520'],
      description: '520礼物主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-013',
      name: '520鲜花',
      thumbnail: 'images/520/thumbnails/13.jpg',
      image: 'images/520/13.png',
      months: [5],
      festivals: ['520'],
      description: '520鲜花主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-014',
      name: '520节日',
      thumbnail: 'images/520/thumbnails/14.jpg',
      image: 'images/520/14.png',
      months: [5],
      festivals: ['520'],
      description: '520节日主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-015',
      name: '520节日',
      thumbnail: 'images/520/thumbnails/15.jpg',
      image: 'images/520/15.png',
      months: [5],
      festivals: ['520'],
      description: '520节日主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-016',
      name: '520节日',
      thumbnail: 'images/520/thumbnails/16.jpg',
      image: 'images/520/16.png',
      months: [5],
      festivals: ['520'],
      description: '520节日主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-017',
      name: '520节日',
      thumbnail: 'images/520/thumbnails/17.jpg',
      image: 'images/520/17.png',
      months: [5],
      festivals: ['520'],
      description: '520节日主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-018',
      name: '520节日',
      thumbnail: 'images/520/thumbnails/18.jpg',
      image: 'images/520/18.png',
      months: [5],
      festivals: ['520'],
      description: '520节日主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-019',
      name: '520节日',
      thumbnail: 'images/520/thumbnails/19.jpg',
      image: 'images/520/19.png',
      months: [5],
      festivals: ['520'],
      description: '520节日主题海报模板',
      type: '网络节日'
    },
    {
      id: '520-2024-020',
      name: '520节日',
      thumbnail: 'images/520/thumbnails/20.jpg',
      image: 'images/520/20.png',
      months: [5],
      festivals: ['520'],
      description: '520节日主题海报模板',
      type: '网络节日'
    }
    
  ],

  // 早安模板
  '早安': [
    // 通用模板 (1-17)
    {
      id: 'zaoan-2026-comon-1',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/1.jpg',
      image: 'images/zaoan/1.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-2',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/2.jpg',
      image: 'images/zaoan/2.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-3',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/3.jpg',
      image: 'images/zaoan/3.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-4',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/4.jpg',
      image: 'images/zaoan/4.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-5',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/5.jpg',
      image: 'images/zaoan/5.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-6',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/6.jpg',
      image: 'images/zaoan/6.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-7',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/7.jpg',
      image: 'images/zaoan/7.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-8',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/8.jpg',
      image: 'images/zaoan/8.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-9',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/9.jpg',
      image: 'images/zaoan/9.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-10',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/10.jpg',
      image: 'images/zaoan/10.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-11',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/11.jpg',
      image: 'images/zaoan/11.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-12',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/12.jpg',
      image: 'images/zaoan/12.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-13',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/13.jpg',
      image: 'images/zaoan/13.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-14',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/14.jpg',
      image: 'images/zaoan/14.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-15',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/15.jpg',
      image: 'images/zaoan/15.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-16',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/16.jpg',
      image: 'images/zaoan/16.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-comon-17',
      name: '早安问候',
      thumbnail: 'images/zaoan/thumbnails/17.jpg',
      image: 'images/zaoan/17.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['早安'],
      description: '通用早安问候主题海报模板',
      type: '日常'
    },
    // 春季模板 (19-52)
    {
      id: 'zaoan-2026-spring-1',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/19.jpg',
      image: 'images/zaoan/19.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-2',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/20.jpg',
      image: 'images/zaoan/20.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-3',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/21.jpg',
      image: 'images/zaoan/21.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-4',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/22.jpg',
      image: 'images/zaoan/22.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-5',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/23.jpg',
      image: 'images/zaoan/23.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-6',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/24.jpg',
      image: 'images/zaoan/24.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-7',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/25.jpg',
      image: 'images/zaoan/25.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-8',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/26.jpg',
      image: 'images/zaoan/26.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-9',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/27.jpg',
      image: 'images/zaoan/27.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-10',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/28.jpg',
      image: 'images/zaoan/28.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-11',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/29.jpg',
      image: 'images/zaoan/29.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-12',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/30.jpg',
      image: 'images/zaoan/30.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-13',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/31.jpg',
      image: 'images/zaoan/31.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-14',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/32.jpg',
      image: 'images/zaoan/32.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-15',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/33.jpg',
      image: 'images/zaoan/33.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-16',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/34.jpg',
      image: 'images/zaoan/34.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-17',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/35.jpg',
      image: 'images/zaoan/35.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-18',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/36.jpg',
      image: 'images/zaoan/36.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-19',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/37.jpg',
      image: 'images/zaoan/37.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-20',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/38.jpg',
      image: 'images/zaoan/38.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-21',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/39.jpg',
      image: 'images/zaoan/39.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-22',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/40.jpg',
      image: 'images/zaoan/40.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-23',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/41.jpg',
      image: 'images/zaoan/41.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-24',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/42.jpg',
      image: 'images/zaoan/42.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-25',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/43.jpg',
      image: 'images/zaoan/43.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-26',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/44.jpg',
      image: 'images/zaoan/44.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-27',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/45.jpg',
      image: 'images/zaoan/45.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-28',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/46.jpg',
      image: 'images/zaoan/46.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-29',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/47.jpg',
      image: 'images/zaoan/47.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-30',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/48.jpg',
      image: 'images/zaoan/48.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-31',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/49.jpg',
      image: 'images/zaoan/49.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-32',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/50.jpg',
      image: 'images/zaoan/50.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-33',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/51.jpg',
      image: 'images/zaoan/51.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-spring-34',
      name: '春季早安',
      thumbnail: 'images/zaoan/thumbnails/52.jpg',
      image: 'images/zaoan/52.png',
      months: [3, 4, 5],
      festivals: ['早安'],
      description: '春季早安主题海报模板',
      type: '日常'
    },
    // 夏季模板 (54-82)
    {
      id: 'zaoan-2026-summer-1',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/54.jpg',
      image: 'images/zaoan/54.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-2',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/55.jpg',
      image: 'images/zaoan/55.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-3',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/56.jpg',
      image: 'images/zaoan/56.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-4',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/57.jpg',
      image: 'images/zaoan/57.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-5',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/58.jpg',
      image: 'images/zaoan/58.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-6',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/59.jpg',
      image: 'images/zaoan/59.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-7',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/60.jpg',
      image: 'images/zaoan/60.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-8',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/61.jpg',
      image: 'images/zaoan/61.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-9',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/62.jpg',
      image: 'images/zaoan/62.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-10',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/63.jpg',
      image: 'images/zaoan/63.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-11',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/64.jpg',
      image: 'images/zaoan/64.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-12',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/65.jpg',
      image: 'images/zaoan/65.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-13',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/66.jpg',
      image: 'images/zaoan/66.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-14',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/67.jpg',
      image: 'images/zaoan/67.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-15',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/68.jpg',
      image: 'images/zaoan/68.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-16',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/69.jpg',
      image: 'images/zaoan/69.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-17',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/70.jpg',
      image: 'images/zaoan/70.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-18',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/71.jpg',
      image: 'images/zaoan/71.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-19',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/72.jpg',
      image: 'images/zaoan/72.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-20',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/73.jpg',
      image: 'images/zaoan/73.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-21',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/74.jpg',
      image: 'images/zaoan/74.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-22',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/75.jpg',
      image: 'images/zaoan/75.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-23',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/76.jpg',
      image: 'images/zaoan/76.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-24',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/77.jpg',
      image: 'images/zaoan/77.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-25',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/78.jpg',
      image: 'images/zaoan/78.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-26',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/79.jpg',
      image: 'images/zaoan/79.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-27',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/80.jpg',
      image: 'images/zaoan/80.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-28',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/81.jpg',
      image: 'images/zaoan/81.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-summer-29',
      name: '夏季早安',
      thumbnail: 'images/zaoan/thumbnails/82.jpg',
      image: 'images/zaoan/82.png',
      months: [6, 7, 8],
      festivals: ['早安'],
      description: '夏季早安主题海报模板',
      type: '日常'
    },
    // 秋季模板 (84-101)
    {
      id: 'zaoan-2026-autumn-1',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/84.jpg',
      image: 'images/zaoan/84.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-2',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/85.jpg',
      image: 'images/zaoan/85.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-3',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/86.jpg',
      image: 'images/zaoan/86.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-4',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/87.jpg',
      image: 'images/zaoan/87.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-5',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/88.jpg',
      image: 'images/zaoan/88.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-6',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/89.jpg',
      image: 'images/zaoan/89.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-7',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/90.jpg',
      image: 'images/zaoan/90.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-8',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/91.jpg',
      image: 'images/zaoan/91.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-9',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/92.jpg',
      image: 'images/zaoan/92.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-10',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/93.jpg',
      image: 'images/zaoan/93.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-11',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/94.jpg',
      image: 'images/zaoan/94.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-12',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/95.jpg',
      image: 'images/zaoan/95.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-13',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/96.jpg',
      image: 'images/zaoan/96.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-14',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/97.jpg',
      image: 'images/zaoan/97.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-15',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/98.jpg',
      image: 'images/zaoan/98.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-16',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/99.jpg',
      image: 'images/zaoan/99.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-17',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/100.jpg',
      image: 'images/zaoan/100.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-autumn-18',
      name: '秋季早安',
      thumbnail: 'images/zaoan/thumbnails/101.jpg',
      image: 'images/zaoan/101.png',
      months: [9, 10, 11],
      festivals: ['早安'],
      description: '秋季早安主题海报模板',
      type: '日常'
    },
    // 冬季模板 (103-129)
    {
      id: 'zaoan-2026-winter-1',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/103.jpg',
      image: 'images/zaoan/103.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-2',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/104.jpg',
      image: 'images/zaoan/104.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-3',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/105.jpg',
      image: 'images/zaoan/105.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-4',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/106.jpg',
      image: 'images/zaoan/106.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-5',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/107.jpg',
      image: 'images/zaoan/107.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-6',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/108.jpg',
      image: 'images/zaoan/108.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-7',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/109.jpg',
      image: 'images/zaoan/109.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-8',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/110.jpg',
      image: 'images/zaoan/110.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-9',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/111.jpg',
      image: 'images/zaoan/111.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-10',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/112.jpg',
      image: 'images/zaoan/112.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-11',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/113.jpg',
      image: 'images/zaoan/113.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-12',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/114.jpg',
      image: 'images/zaoan/114.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-13',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/115.jpg',
      image: 'images/zaoan/115.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-14',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/116.jpg',
      image: 'images/zaoan/116.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-15',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/117.jpg',
      image: 'images/zaoan/117.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-16',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/118.jpg',
      image: 'images/zaoan/118.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-17',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/119.jpg',
      image: 'images/zaoan/119.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-18',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/120.jpg',
      image: 'images/zaoan/120.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-19',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/121.jpg',
      image: 'images/zaoan/121.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-20',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/122.jpg',
      image: 'images/zaoan/122.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-21',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/123.jpg',
      image: 'images/zaoan/123.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-22',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/124.jpg',
      image: 'images/zaoan/124.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-23',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/125.jpg',
      image: 'images/zaoan/125.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-24',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/126.jpg',
      image: 'images/zaoan/126.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-25',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/127.jpg',
      image: 'images/zaoan/127.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-26',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/128.jpg',
      image: 'images/zaoan/128.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    },
    {
      id: 'zaoan-2026-winter-27',
      name: '冬季早安',
      thumbnail: 'images/zaoan/thumbnails/129.jpg',
      image: 'images/zaoan/129.png',
      months: [12, 1, 2],
      festivals: ['早安'],
      description: '冬季早安主题海报模板',
      type: '日常'
    }
  ],

  // 晚安模板
  '晚安': [
    {
      id: 'wanan-2024-001',
      name: '晚安问候',
      thumbnail: 'images/wanan/thumbnails/1.jpg',
      image: 'images/wanan/1.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '温馨晚安问候主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-002',
      name: '晚安好梦',
      thumbnail: 'images/wanan/thumbnails/2.jpg',
      image: 'images/wanan/2.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '甜美梦境晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-003',
      name: '晚安星光',
      thumbnail: 'images/wanan/thumbnails/3.jpg',
      image: 'images/wanan/3.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '星空浪漫晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-004',
      name: '晚安宁静',
      thumbnail: 'images/wanan/thumbnails/4.jpg',
      image: 'images/wanan/4.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '宁静安详晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-005',
      name: '晚安温暖',
      thumbnail: 'images/wanan/thumbnails/5.jpg',
      image: 'images/wanan/5.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '温暖舒适晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-006',
      name: '晚安月光',
      thumbnail: 'images/wanan/thumbnails/6.jpg',
      image: 'images/wanan/6.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '月光皎洁晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-007',
      name: '晚安甜蜜',
      thumbnail: 'images/wanan/thumbnails/7.jpg',
      image: 'images/wanan/7.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '甜蜜温馨晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-008',
      name: '晚安安眠',
      thumbnail: 'images/wanan/thumbnails/8.jpg',
      image: 'images/wanan/8.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '安眠舒适晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-009',
      name: '晚安祝福',
      thumbnail: 'images/wanan/thumbnails/9.jpg',
      image: 'images/wanan/9.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '美好祝福晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-010',
      name: '晚安温馨',
      thumbnail: 'images/wanan/thumbnails/10.jpg',
      image: 'images/wanan/10.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '温馨浪漫晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-011',
      name: '晚安祥和',
      thumbnail: 'images/wanan/thumbnails/11.jpg',
      image: 'images/wanan/11.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '祥和安宁晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-012',
      name: '晚安美好',
      thumbnail: 'images/wanan/thumbnails/12.jpg',
      image: 'images/wanan/12.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '美好夜晚晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-013',
      name: '晚安梦境',
      thumbnail: 'images/wanan/thumbnails/13.jpg',
      image: 'images/wanan/13.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '梦幻意境晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-014',
      name: '晚安星辰',
      thumbnail: 'images/wanan/thumbnails/14.jpg',
      image: 'images/wanan/14.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '星辰闪烁晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-015',
      name: '晚安夜色',
      thumbnail: 'images/wanan/thumbnails/15.jpg',
      image: 'images/wanan/15.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '夜色迷人晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-016',
      name: '晚安清风',
      thumbnail: 'images/wanan/thumbnails/16.jpg',
      image: 'images/wanan/16.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '清风徐来晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-017',
      name: '晚安悠然',
      thumbnail: 'images/wanan/thumbnails/17.jpg',
      image: 'images/wanan/17.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '悠然自得晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-018',
      name: '晚安恬静',
      thumbnail: 'images/wanan/thumbnails/18.jpg',
      image: 'images/wanan/18.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '恬静美好晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-019',
      name: '晚安惬意',
      thumbnail: 'images/wanan/thumbnails/19.jpg',
      image: 'images/wanan/19.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '惬意舒适晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-020',
      name: '晚安舒心',
      thumbnail: 'images/wanan/thumbnails/20.jpg',
      image: 'images/wanan/20.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '舒心愉悦晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-021',
      name: '晚安静好',
      thumbnail: 'images/wanan/thumbnails/21.jpg',
      image: 'images/wanan/21.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '岁月静好晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-022',
      name: '晚安幽雅',
      thumbnail: 'images/wanan/thumbnails/22.jpg',
      image: 'images/wanan/22.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '幽雅别致晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-023',
      name: '晚安诗意',
      thumbnail: 'images/wanan/thumbnails/23.jpg',
      image: 'images/wanan/23.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '诗意盎然晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-024',
      name: '晚安浪漫',
      thumbnail: 'images/wanan/thumbnails/24.jpg',
      image: 'images/wanan/24.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '浪漫唯美晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-025',
      name: '晚安柔情',
      thumbnail: 'images/wanan/thumbnails/25.jpg',
      image: 'images/wanan/25.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '柔情似水晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-026',
      name: '晚安静谧',
      thumbnail: 'images/wanan/thumbnails/26.jpg',
      image: 'images/wanan/26.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '静谧安详晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-027',
      name: '晚安幽静',
      thumbnail: 'images/wanan/thumbnails/27.jpg',
      image: 'images/wanan/27.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '幽静深远晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-028',
      name: '晚安平和',
      thumbnail: 'images/wanan/thumbnails/28.jpg',
      image: 'images/wanan/28.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '平和安详晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-029',
      name: '晚安安然',
      thumbnail: 'images/wanan/thumbnails/29.jpg',
      image: 'images/wanan/29.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '安然入睡晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-030',
      name: '晚安舒坦',
      thumbnail: 'images/wanan/thumbnails/30.jpg',
      image: 'images/wanan/30.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '舒坦自在晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-031',
      name: '晚安舒适',
      thumbnail: 'images/wanan/thumbnails/31.jpg',
      image: 'images/wanan/31.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '舒适惬意晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-032',
      name: '晚安静心',
      thumbnail: 'images/wanan/thumbnails/32.jpg',
      image: 'images/wanan/32.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '静心养神晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-033',
      name: '晚安宁静',
      thumbnail: 'images/wanan/thumbnails/33.jpg',
      image: 'images/wanan/33.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '宁静致远晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-034',
      name: '晚安安详',
      thumbnail: 'images/wanan/thumbnails/34.jpg',
      image: 'images/wanan/34.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '安详宁静晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-035',
      name: '晚安祥和',
      thumbnail: 'images/wanan/thumbnails/35.jpg',
      image: 'images/wanan/35.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '祥和温馨晚安主题海报模板',
      type: '日常'
    },
    {
      id: 'wanan-2024-036',
      name: '晚安美满',
      thumbnail: 'images/wanan/thumbnails/36.jpg',
      image: 'images/wanan/36.png',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      festivals: ['晚安'],
      description: '美满幸福晚安主题海报模板',
      type: '日常'
    }
  ]
};

// 品牌日常模板
templates['品牌日常'] = [
  {
    id: 'dairy-2024-001',
    name: '品牌日常',
    thumbnail: 'images/statics/dairy-bg.jpg',
    image: 'images/statics/dairy-bg.jpg',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    festivals: ['品牌日常'],
    description: '品牌日常宣传海报模板',
    type: '日常'
  }
];

// 将模板导出到window对象
if (typeof window !== 'undefined') {
  window.templates = templates;
  window.templatesDataLoaded = true;
}