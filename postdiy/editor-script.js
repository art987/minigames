// 海报DIY编辑器 - 全新实现
// 模块化设计，避免变量重复声明问题

// 微信浏览器检测（支持调试参数）
function isWeixinBrowser() {
  // 检查URL参数，支持调试模式
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('browser') === 'wechat') {
    return true;
  }
  
  // 正常检测微信浏览器
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
}

// 微信浏览器提示管理
window.wechatWarning = {
  isWechat: false,
  
  // 初始化微信检测
  init: function() {
    this.isWechat = isWeixinBrowser();
    
    // 检查是否是调试模式
    const urlParams = new URLSearchParams(window.location.search);
    this.isDebugMode = urlParams.get('browser') === 'wechat';
    
    if (this.isWechat) {
      this.showWarningModal();
      this.showTopBar();
    }
  },
  
  // 显示警告弹窗
  showWarningModal: function() {
    // 调试模式提示
    const debugInfo = this.isDebugMode ? '<div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 4px; padding: 8px; margin-bottom: 16px; font-size: 12px; color: #2e7d32;">🔧 调试模式：模拟微信浏览器环境</div>' : '';
    
    // 创建弹窗HTML
    const modalHTML = `
      <div id="wechatWarningModal" class="wechat-warning-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div id="wechatWarningModal" class="wechat-warning-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div class="wechat-warning-content" style="background: white; border-radius: 12px; padding: 24px; max-width: 320px; text-align: center; position: relative;">
          
          <h3 style="margin: 0 0 12px 0; color: #333; font-size: 18px;">微信内不支持图片（海报）下载</h3>
          <p style="margin: 0 0 20px 0; color: #666; font-size: 14px; line-height: 1.4;">如需体验完整功能，请右上角点"..."选择外部浏览器进行访问</p>
          ${debugInfo}
          <div class="arrow-indicator" style="position: fixed;top: 19px; right: 36px; width: 30px; height: 30px; transform: rotate(348deg);">
            <div style="width: 100%; height: 100%; border-right: 3px solid #f6a83b; border-top: 3px solid #f6a83b;"></div>
          </div>
          <button id="continueBrowse" class="continue-btn" style="background: #0d8507ff; border: 2px solid #dee2e6; border-radius: 6px; padding: 10px 20px; color: #ffffffff; font-size: 16px; cursor: pointer; width: 100%;">我不下载图片，随便看看</button>
        </div>
      </div>>
      </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 绑定关闭事件
    document.getElementById('continueBrowse').addEventListener('click', function() {
      document.getElementById('wechatWarningModal').style.display = 'none';
    });
  },
  
  // 显示顶部横条
  showTopBar: function() {
    // 创建顶部横条HTML
    const topBarHTML = `
     <div id="wechatTopBar" class="wechat-top-bar" style=" width: 100%;     background: #22b208;
    border-bottom: 2px solid #0a7509ff; padding: 8px 16px; z-index:1;top: 0; text-align: center; font-size: 12px; color: #ffffffff; position: fixed;">
        <span>微信内不支持下载，右上角点<b>...</b> 选择外部浏览器访问。</span>
      </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('afterbegin', topBarHTML);
    
    // 调整页面内容位置，避免被顶部横条遮挡
    const topBar = document.getElementById('wechatTopBar');
    const mainContent = document.querySelector('main') || document.body;
    if (topBar && mainContent) {
      const barHeight = topBar.offsetHeight;
      mainContent.style.marginTop = barHeight + 'px';
    }
  }
};

// 全局状态管理 - 移到最前面确保优先初始化
  let state = {
    currentTemplate: null,
    businessInfo: {
      name: '点击编辑商家名称',
      logo: null,
      qrcode: null,
      promoText: '扫码加好友享VIP待遇！\n全年免费清洗空调，\n加氟6折 到店再领惊喜好礼！'
    },
    customBackground: null,
    textColor: '#000000' // 默认黑色
  };
  
  // 行业分类文案模板数据
  const INDUSTRY_TEMPLATES = {
    // 1. 美容
    '美容': [
      '扫码进群｜每天 1 款妆教\n前 200 位送 xxx 小样\n群满关门槛！',
      '长按识别｜加微信\n备注【美妆】领 xxx 试用装\n不转发不集赞',
      '扫码秒进｜限时福利\n进群即送 xxx 旅行套装\n今晚 8 点统一发',
      '先扫码｜再添加小助手\n0 元拿 xxx 新品面膜\n只送不卖',
      '微信扫码｜立刻领\n每天抽 5 人送 xxx 正装\n越早进中奖率越高'
    ],
    
    // 2. 母婴
    '母婴': [
      '扫码进群｜宝妈互助\n送 xxx 纸尿裤试用装 4 片\n全国包邮',
      '长按识别｜加微信\n备注【宝妈】领 xxx 湿巾 1 包\n无门槛纯福利',
      '扫码秒进｜每晚育儿直播\n进群送 xxx 辅食食谱 PDF\n专家在线答疑',
      '先扫码｜再添加小助手\n送 xxx 宝宝浴巾 1 条\n限 0-3 岁家庭',
      '微信扫码｜立刻进群\n每周团购价 xxx 玩具\n比电商低 30%'
    ],
    
    // 3. 健身
    '健身': [
      '扫码进群｜21 天打卡\n送 xxx 体脂秤 1 台\n坚持返现金',
      '长按识别｜加微信\n备注【减脂】领 xxx 代餐 3 袋\n不节食也能瘦',
      '扫码秒进｜教练陪练\n送 xxx 弹力带 1 根\n视频教学',
      '先扫码｜再添加小助手\n0 元拿 xxx 左旋 1 瓶\n限量 100 份',
      '微信扫码｜立刻领\n每天抽 3 人送 xxx 私教课\n线下门店通用'
    ],
    
    // 4. 茶饮
    '茶饮': [
      '扫码进群｜每日隐藏菜单\n送 xxx 招牌饮品 1 杯\n到店即兑',
      '长按识别｜加微信\n备注【喝茶】领 xxx 5 折券\n可转赠好友',
      '扫码秒进｜限时秒杀\n9.9 抢 xxx 生椰拿铁\n每日 50 份',
      '先扫码｜再添加小助手\n送 xxx 周年周边 1 套\n全国邮寄',
      '微信扫码｜立刻进群\n第二杯半价天天享\n群内暗号 xxx'
    ],
    
    // 5. 宠物
    '宠物': [
      '扫码进群｜猫狗互助\n送 xxx 冻干试吃 50g\n包邮到家',
      '长按识别｜加微信\n备注【主子】领 xxx 猫砂 1 袋\n无尘可冲厕所',
      '扫码秒进｜每周拼团\nxxx 驱虫药低于 5 折\n保真可查码',
      '先扫码｜再添加小助手\n送 xxx 宠物玩具 1 个\n限前 100 名',
      '微信扫码｜立刻领\n每天教 1 招宠物摄影\n晒照再返 xxx 零食'
    ],
    
    // 6. 服饰
    '服饰': [
      '扫码进群｜每日穿搭灵感\n送 xxx 防晒衫 1 件\n均码现货',
      '长按识别｜加微信\n备注【穿搭】领 xxx 20 元无门槛券\n可与折扣叠',
      '扫码秒进｜限时盲盒\n59 抢 xxx 随机 T 恤\n每件原单 129+',
      '先扫码｜再添加小助手\n0 元拿 xxx 渔夫帽\n朋友圈晒图返现金',
      '微信扫码｜立刻进群\n每周团购 xxx 牛仔裤\n显瘦神裤 79 包邮'
    ],
    
    // 7. 知识
    '知识': [
      '扫码进群｜每晚 8 点干货\n送 xxx 课程 3 节\n永久回放',
      '长按识别｜加微信\n备注【学习】领 xxx 电子书 10 本\n价值 199 元',
      '扫码秒进｜副业拆解\n送 xxx 赚钱表格 1 套\n直接复制用',
      '先扫码｜再添加小助手\n0 元听 xxx 直播课\n课后送资料包',
      '微信扫码｜立刻领\n每天抽 2 人送 xxx 社群年卡\n365 天陪跑'
    ],
    
    // 8. 家居
    '家居': [
      '扫码进群｜收纳技巧日更\n送 xxx 折叠收纳箱 1 个\n包邮 0 元',
      '长按识别｜加微信\n备注【家居】领 xxx 除螨券\n线下上门 1 次',
      '扫码秒进｜团购爆款\nxxx 空气炸锅 99 秒杀\n官方联保',
      '先扫码｜再添加小助手\n送 xxx 香薰 1 瓶\n限前 200 户',
      '微信扫码｜立刻进群\n每周教 1 招旧物改造\n成品拍照再返 xxx 红包'
    ],
    
    // 9. 数码
    '数码': [
      '扫码进群｜新品内测\n送 xxx 无线耳机 1 副\n写评测再返 50 元',
      '长按识别｜加微信\n备注【数码】领 xxx 数据线 1 根\n快充不弹窗',
      '扫码秒进｜限时拼团\nxxx 充电宝 59 包邮\n20000mAh 双向快充',
      '先扫码｜再添加小助手\n0 元拿 xxx 手机支架\n直播追剧神器',
      '微信扫码｜立刻领\n每天抽 1 人送 xxx 智能手表\n官方正品可查'
    ],
    
    // 10. 旅游
    '旅游': [
      '扫码进群｜机票酒店神价\n送 xxx 无门槛 100 元券\n节假日通用',
      '长按识别｜加微信\n备注【旅行】领 xxx 行李牌 1 套\n包邮出发地',
      '扫码秒进｜限时尾单\nxxx 五星酒店 299 含双早\n比携程低 40%',
      '先扫码｜再添加小助手\n送 xxx 景区门票 1 张\n限本周使用',
      '微信扫码｜立刻进群\n每天发 1 条冷门路线\n组队成行再返 xxx 红包'
    ]
  };
  
  // DOM元素缓存
  const elements = {};
  
  // DOM加载完成后初始化编辑器
  document.addEventListener('DOMContentLoaded', function() {
    console.log('海报编辑器初始化...');
    
    // 微信浏览器检测
    window.wechatWarning.init();
    
    // 初始化图片保护功能
    initializeImageProtection();
    
    // 初始化DOM元素缓存
    initializeElements();
    
    // 先从本地存储加载数据
    loadBusinessInfoFromLocalStorage();
    
    // 然后更新显示
    updateBusinessInfoDisplay();
    
    // 最后绑定事件和初始化
    bindEvents();
    initializeEditor();
  
  // 初始化图片保护功能
  function initializeImageProtection() {
    console.log('初始化图片保护功能...');
    
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
      // 检查是否点击在图片上
      const target = e.target;
      if (target.tagName === 'IMG' && 
          (target.id === 'posterBackground' || 
           target.classList.contains('template-thumbnail') ||
           target.id === 'posterLogoImg' ||
           target.id === 'posterQrcodeImg')) {
        e.preventDefault();
        
        // 显示保护提示
        showProtectionMessage('图片已受保护，禁止右键保存');
        return false;
      }
    });
    
    // 禁用图片拖拽
    document.addEventListener('dragstart', function(e) {
      const target = e.target;
      if (target.tagName === 'IMG' && 
          (target.id === 'posterBackground' || 
           target.classList.contains('template-thumbnail'))) {
        e.preventDefault();
        return false;
      }
    });
    
    // 禁用图片选择
    document.addEventListener('selectstart', function(e) {
      const target = e.target;
      if (target.tagName === 'IMG' && 
          (target.id === 'posterBackground' || 
           target.classList.contains('template-thumbnail'))) {
        e.preventDefault();
        return false;
      }
    });
    
    // 禁用开发者工具中的图片查看
    document.addEventListener('keydown', function(e) {
      // 禁用F12、Ctrl+Shift+I、Ctrl+U等开发者工具快捷键
      if ((e.key === 'F12') || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        showProtectionMessage('开发者工具已禁用');
        return false;
      }
    });
    
    // 添加CSS保护样式
    const style = document.createElement('style');
    style.textContent = `
      /* 图片保护样式 */
      img#posterBackground,
      img.template-thumbnail {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        pointer-events: auto;
        position: relative;
      }
      
      /* 添加保护层 */
      .image-protection-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 9999;
        pointer-events: none;
      }
      
      /* 保护提示消息 */
      .protection-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 16px;
        z-index: 10000;
        animation: fadeInOut 2s ease-in-out;
        display: none;
      }
      
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -60%); }
        20% { opacity: 1; transform: translate(-50%, -50%); }
        80% { opacity: 1; transform: translate(-50%, -50%); }
        100% { opacity: 0; transform: translate(-50%, -40%); }
      }
    `;
    document.head.appendChild(style);
    
    // 创建保护提示消息元素
    const protectionMessage = document.createElement('div');
    protectionMessage.className = 'protection-message';
    protectionMessage.id = 'protectionMessage';
    document.body.appendChild(protectionMessage);
    
    console.log('图片保护功能初始化完成');
  }
  
  // 显示保护提示消息
  function showProtectionMessage(message) {
    const messageElement = document.getElementById('protectionMessage');
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.style.display = 'block';
      
      // 2秒后自动隐藏
      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 2000);
    }
  }
  
  // 显示加载动画
  function showLoadingAnimation() {
    if (!elements.posterLoadingOverlay || !elements.loadingLogo) return;
    
    // 设置Logo图片（如果有的话）
    if (state.businessInfo.logo) {
      elements.loadingLogo.src = state.businessInfo.logo;
      elements.loadingLogo.style.display = 'block';
    } else {
      elements.loadingLogo.style.display = 'none';
    }
    
    // 显示加载动画
    elements.posterLoadingOverlay.classList.remove('hidden');
    
    console.log('显示海报生成加载动画');
  }
  
  // 隐藏加载动画
  function hideLoadingAnimation() {
    if (!elements.posterLoadingOverlay) return;
    
    // 隐藏加载动画
    elements.posterLoadingOverlay.classList.add('hidden');
    
    console.log('隐藏海报生成加载动画');
  }
  
  // 显示模板加载动画
  function showTemplateLoadingAnimation() {
    if (!elements.templateLoadingOverlay || !elements.templateLoadingLogo) return;
    
    // 设置Logo图片（如果有的话）
    if (state.businessInfo.logo) {
      elements.templateLoadingLogo.src = state.businessInfo.logo;
      elements.templateLoadingLogo.style.display = 'block';
    } else {
      elements.templateLoadingLogo.style.display = 'none';
    }
    
    // 显示模板加载动画
    elements.templateLoadingOverlay.classList.remove('hidden');
    
    console.log('显示模板加载动画');
  }
  
  // 隐藏模板加载动画
  function hideTemplateLoadingAnimation() {
    if (!elements.templateLoadingOverlay) return;
    
    // 隐藏模板加载动画
    elements.templateLoadingOverlay.classList.add('hidden');
    
    console.log('隐藏模板加载动画');
  }

  // 初始化DOM元素缓存
  function initializeElements() {
    Object.assign(elements, {
      // 修复：添加缺失的removeBackgroundBtn元素
      removeBackgroundBtn: document.getElementById('removeBackgroundBtn'),
      // 返回按钮
      backToHomeBtn: document.getElementById('backToHomeBtn'),
      
      // 底部按钮
      changeTemplateBtn: document.getElementById('changeTemplateBtn'),
      editBusinessInfoBtn: document.getElementById('editBusinessInfoBtn'),
      uploadBackgroundBtn: document.getElementById('uploadBackgroundBtn'),
      backgroundInput: document.getElementById('backgroundInput'),
      downloadBtn: document.getElementById('downloadBtn'),
      
      // 预览区域
      posterFrame: document.getElementById('posterFrame'),
      posterBackground: document.getElementById('posterBackground'),
      posterBusinessName: document.getElementById('posterBusinessName'),
      posterPromoText: document.getElementById('posterPromoText'),
      posterLogo: document.getElementById('posterLogo'),
      posterLogoImg: document.getElementById('posterLogoImg'),
      logoPlaceholder: document.getElementById('logoPlaceholder'),
      posterQrcode: document.getElementById('posterQrcode'),
      posterQrcodeImg: document.getElementById('posterQrcodeImg'),
      qrcodePlaceholder: document.getElementById('qrcodePlaceholder'),
      templateTriggerArea: document.getElementById('templateTriggerArea'),
      
      // 模态框
      templateModal: document.getElementById('templateModal'),
      closeTemplateModalBtn: document.getElementById('closeTemplateModalBtn'),
      cancelTemplateBtn: document.getElementById('cancelTemplateBtn'),
      // 促销信息编辑模态框
      promoTextModal: document.getElementById('promoTextModal'),
      closePromoTextModal: document.getElementById('closePromoTextModal'),
      cancelPromoTextBtn: document.getElementById('cancelPromoTextBtn'),
      savePromoTextBtn: document.getElementById('savePromoTextBtn'),
      promoTextInput: document.getElementById('promoTextInput'), // 促销编辑模态框中的输入框
      promoTemplatesList: document.getElementById('promoTemplatesList'),
      confirmTemplateBtn: document.getElementById('confirmTemplateBtn'),
      templateGrid: document.getElementById('modalTemplatesGrid'),
      modalMonthButtons: document.getElementById('modalMonthButtons'),
      modalFestivalTags: document.getElementById('modalFestivalTags'),
      
      businessInfoModal: document.getElementById('businessInfoModal'),
      closeBusinessInfoModalBtn: document.getElementById('closeBusinessInfoModalBtn'),
      cancelBusinessInfoBtn: document.getElementById('cancelBusinessInfoBtn'),
      saveBusinessInfoBtn: document.getElementById('saveBusinessInfoBtn'),
      businessInfoForm: document.getElementById('businessInfoForm'),
      businessNameInput: document.getElementById('business-name'),
      fontColorSelector: document.getElementById('color-selector'),
      businessPromoTextInput: document.getElementById('promotion-text'), // 商家信息模态框中的促销文本输入框
      selectPromoTemplateBtn: document.getElementById('selectPromoTemplateBtn'), // 选择促销文案模板按钮
      industryCategories: document.querySelectorAll('.industry-category'), // 行业分类按钮
      industryTemplateModal: document.getElementById('industryTemplateModal'), // 行业模板独立弹窗
      closeIndustryTemplateModal: document.getElementById('closeIndustryTemplateModal'), // 关闭行业模板弹窗
      industryModalTitle: document.getElementById('industryModalTitle'), // 行业弹窗标题
      industryTemplatesList: document.getElementById('industryTemplatesList'), // 行业模板列表
      logoUploadArea: document.getElementById('logoUploadArea'),
      logoInput: document.getElementById('logoInput'),
      logoPreview: document.getElementById('logoPreview'),
      logoPreviewImg: document.getElementById('logoPreviewImg'),
      removeLogoBtn: document.getElementById('removeLogoBtn'),
      qrcodeUploadArea: document.getElementById('qrcodeUploadArea'),
      qrcodeInput: document.getElementById('qrcodeInput'),
      qrcodePreview: document.getElementById('qrcodePreview'),
      qrcodePreviewImg: document.getElementById('qrcodePreviewImg'),
      removeQrcodeBtn: document.getElementById('removeQrcodeBtn'),
      
      // VIP恢复按钮
      restoreLogoBtnContainer: document.getElementById('restoreLogoBtnContainer'),
      restoreLogoBtn: document.getElementById('restoreLogoBtn'),
      restoreQrcodeBtnContainer: document.getElementById('restoreQrcodeBtnContainer'),
      restoreQrcodeBtn: document.getElementById('restoreQrcodeBtn'),
      
      // 加载动画元素
      posterLoadingOverlay: document.getElementById('posterLoadingOverlay'),
      loadingLogo: document.getElementById('loadingLogo'),
      templateLoadingOverlay: document.getElementById('templateLoadingOverlay'),
      templateLoadingLogo: document.getElementById('templateLoadingLogo'),
      
      // 字体颜色选择弹窗
      fontColorModal: document.getElementById('fontColorModal'),
      closeFontColorModalBtn: document.getElementById('closeFontColorModalBtn'),
      fontColorModalSelector: document.querySelector('#fontColorModal .color-swatch-group')
    });
    console.log('DOM元素缓存初始化完成');
  }
  
  // 保存促销信息到本地存储
  function saveBusinessInfoToLocalStorage() {
    try {
      console.log('准备保存到本地存储:', state.businessInfo);
      
      // 如果是VIP用户，保存到VIP专属缓存
      if (window.isVipActive && window.isVipActive()) {
        saveVipBusinessInfoToLocalStorage();
        return;
      }
      
      // 普通用户保存到普通缓存
      localStorage.setItem('posterBusinessInfo', JSON.stringify(state.businessInfo));
      console.log('促销信息已成功保存到本地存储');
      
      // 验证保存是否成功
      const testSave = localStorage.getItem('posterBusinessInfo');
      if (testSave) {
        console.log('保存验证成功，存储的数据:', testSave);
      }
    } catch (error) {
      console.error('保存本地存储失败:', error);
      alert('保存失败，请检查浏览器存储空间');
    }
  }
  
  // 保存VIP商家信息到专属本地存储
  function saveVipBusinessInfoToLocalStorage() {
    try {
      const vipId = localStorage.getItem('vipId');
      if (!vipId) {
        console.log('未找到VIP ID，无法保存VIP专属缓存');
        return;
      }
      
      const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
      console.log('准备保存VIP专属缓存，键名:', vipBusinessInfoKey, '数据:', state.businessInfo);
      
      localStorage.setItem(vipBusinessInfoKey, JSON.stringify(state.businessInfo));
      console.log('VIP专属缓存已成功保存');
      
      // 验证保存是否成功
      const testSave = localStorage.getItem(vipBusinessInfoKey);
      if (testSave) {
        console.log('VIP专属缓存保存验证成功，存储的数据:', testSave);
      }
    } catch (error) {
      console.error('保存VIP专属缓存失败:', error);
      alert('VIP信息保存失败，请检查浏览器存储空间');
    }
  }
  
  // 加载备用商家信息（普通用户或VIP缓存失败时的回退方案）
  function loadFallbackBusinessInfo() {
    // 从本地存储加载商家信息 - 与saveBusinessInfoToLocalStorage保持一致的键名
    const savedBusinessInfo = localStorage.getItem('posterBusinessInfo');
    if (savedBusinessInfo) {
      try {
        state.businessInfo = JSON.parse(savedBusinessInfo);
        console.log('从posterBusinessInfo加载成功:', state.businessInfo);
      } catch (e) {
        console.error('加载保存的商家信息失败:', e);
        // 尝试从旧键名迁移数据
        try {
          const oldSavedInfo = localStorage.getItem('businessInfo');
          if (oldSavedInfo) {
            state.businessInfo = JSON.parse(oldSavedInfo);
            console.log('从businessInfo迁移数据:', state.businessInfo);
            // 迁移后保存到新键名
            localStorage.setItem('posterBusinessInfo', oldSavedInfo);
            localStorage.removeItem('businessInfo'); // 清除旧数据
          }
        } catch (ee) {
          console.error('迁移旧数据失败:', ee);
        }
      }
    }
  }
  
  // 从本地存储加载促销信息
  function loadBusinessInfoFromLocalStorage() {
    try {
      console.log('尝试从本地存储加载数据...');
      
      // 如果是VIP用户，检查是否有VIP专属缓存
      if (window.isVipActive && window.isVipActive()) {
        console.log('VIP用户登录，检查VIP专属缓存');
        
        const vipId = localStorage.getItem('vipId');
        const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
        
        // 先检查是否有VIP专属缓存
        const vipSavedInfo = localStorage.getItem(vipBusinessInfoKey);
        if (vipSavedInfo) {
          console.log('找到VIP专属缓存数据:', vipSavedInfo);
          const parsedInfo = JSON.parse(vipSavedInfo);
          state.businessInfo = {
            ...state.businessInfo,
            ...parsedInfo
          };
          console.log('从VIP专属缓存加载完成:', state.businessInfo);
          return;
        }
        
        // 如果没有VIP专属缓存，使用VIP固定信息初始化
        const vipInfo = window.getVipFixedInfo();
        if (vipInfo) {
          state.businessInfo = {
            ...state.businessInfo,
            name: vipInfo.name,
            logo: vipInfo.logo,
            qrcode: vipInfo.qrcode || state.businessInfo.qrcode, // 优先使用VIP的二维码，如果没有则保留原有的
            promoText: state.businessInfo.promoText // 保留原有的促销信息
          };
          
          // 将VIP数据保存到VIP专属缓存
          saveVipBusinessInfoToLocalStorage();
          console.log('VIP数据已初始化并保存到专属缓存:', state.businessInfo);
          return;
        }
      }
      
      // 普通用户或VIP数据加载失败时使用普通本地存储
      const savedInfo = localStorage.getItem('posterBusinessInfo');
      if (savedInfo) {
        console.log('找到普通本地存储数据:', savedInfo);
        const parsedInfo = JSON.parse(savedInfo);
        state.businessInfo = {
          ...state.businessInfo,
          ...parsedInfo
        };
        console.log('从普通本地存储加载完成:', state.businessInfo);
      } else {
        console.log('本地存储中没有找到数据');
      }
    } catch (error) {
      console.error('加载本地存储失败:', error);
    }
  }
  
  // 打开行业模板独立弹窗
  function openIndustryTemplateModal(category) {
    if (!elements.industryTemplateModal || !elements.industryModalTitle || !elements.industryTemplatesList) return;
    
    // 设置弹窗标题
    elements.industryModalTitle.textContent = category + '促销文案模板';
    
    // 渲染对应行业的模板
    renderIndustryTemplates(category, elements.industryTemplatesList);
    
    // 移除关闭动画类
    elements.industryTemplateModal.classList.remove('closing');
    elements.industryTemplateModal.querySelector('.modal-container').classList.remove('closing');
    
    // 显示弹窗
    elements.industryTemplateModal.classList.remove('hidden');
    
    // 强制重绘以触发动画
    void elements.industryTemplateModal.offsetWidth;
  }
  
  // 关闭行业模板独立弹窗
  function closeIndustryTemplateModal() {
    if (!elements.industryTemplateModal) return;
    
    // 添加关闭动画类
    elements.industryTemplateModal.classList.add('closing');
    elements.industryTemplateModal.querySelector('.modal-container').classList.add('closing');
    
    // 延迟隐藏弹窗
    setTimeout(() => {
      elements.industryTemplateModal.classList.add('hidden');
      // 移除关闭动画类
      elements.industryTemplateModal.classList.remove('closing');
      elements.industryTemplateModal.querySelector('.modal-container').classList.remove('closing');
    }, 400); // 匹配动画时长
  }
  
  // 渲染指定行业的文案模板到指定容器
  function renderIndustryTemplates(category, container) {
    if (!container) return;
    
    // 清空现有内容
    container.innerHTML = '';
    
    const templates = INDUSTRY_TEMPLATES[category];
    if (!templates) return;
    
    // 渲染文案模板卡片
    templates.forEach((template, index) => {
      const templateCard = document.createElement('div');
      templateCard.className = 'industry-template-card';
      
      templateCard.innerHTML = `
        <div class="industry-template-content">${template}</div>
        <button class="industry-template-select-btn" data-template="${template}">选用编辑</button>
      `;
      
      // 添加卡片点击事件 - 触发打字机效果
      templateCard.addEventListener('click', function() {
        // 移除其他卡片的选中状态
        document.querySelectorAll('.industry-template-card').forEach(card => {
          card.classList.remove('selected');
          const content = card.querySelector('.industry-template-content');
          content.classList.remove('typewriter');
          content.textContent = templates[Array.from(card.parentNode.children).indexOf(card)];
        });
        
        // 设置当前卡片为选中状态
        this.classList.add('selected');
        const content = this.querySelector('.industry-template-content');
        
        // 触发打字机效果
        startTypewriterEffect(content, template);
      });
      
      // 添加按钮点击事件
      templateCard.querySelector('.industry-template-select-btn').addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('选择了模板:', template);
        if (elements.promoTextInput) {
          elements.promoTextInput.value = template;
          console.log('已将模板内容填充到输入框:', template);
          
          // 关闭行业模板弹窗
          closeIndustryTemplateModal();
          
          // 自动滚动到编辑框
          setTimeout(() => {
            elements.promoTextInput.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
            elements.promoTextInput.focus();
            console.log('已滚动到编辑框并聚焦');
          }, 100);
        }
      });
      
      container.appendChild(templateCard);
    });
  }
  
  // 打字机效果函数
  function startTypewriterEffect(contentElement, fullText) {
    // 清空内容
    contentElement.textContent = '';
    contentElement.classList.add('typewriter');
    
    const lines = fullText.split('\n');
    let currentLine = 0;
    let currentChar = 0;
    
    function typeNextChar() {
      if (currentLine < lines.length) {
        if (currentChar < lines[currentLine].length) {
          // 添加当前字符
          if (currentChar === 0 && currentLine > 0) {
            contentElement.textContent += '\n';
          }
          contentElement.textContent += lines[currentLine][currentChar];
          currentChar++;
          
          // 继续下一个字符
          setTimeout(typeNextChar, 80); // 控制打字速度
        } else {
          // 换行
          currentLine++;
          currentChar = 0;
          if (currentLine < lines.length) {
            setTimeout(typeNextChar, 200); // 行间延迟
          } else {
            // 打字完成，保持光标闪烁
            setTimeout(() => {
              contentElement.classList.remove('typewriter');
            }, 1000);
          }
        }
      }
    }
    
    // 开始打字
    typeNextChar();
  }
  
  // 打开促销信息编辑模态框
  function openPromoTextModal() {
    if (!elements.promoTextModal || !elements.promoTextInput) return;
    
    // 加载当前促销信息到输入框
    elements.promoTextInput.value = state.businessInfo.promoText;
    
    // 移除关闭动画类
    elements.promoTextModal.classList.remove('closing');
    elements.promoTextModal.querySelector('.modal-container').classList.remove('closing');
    
    // 显示模态框
    elements.promoTextModal.classList.remove('hidden');
    
    // 强制重绘以触发动画
    void elements.promoTextModal.offsetWidth;
    
    // 聚焦到输入框
    elements.promoTextInput.focus();
  }
  
  // 打开行业分类文案模板模态框
  function openIndustryTemplatesModal() {
    if (!elements.industryTemplatesModal || !elements.promoTextInput) return;
    
    // 确保行业模板已渲染
    initializeIndustryTemplates();
    
    // 显示模态框
    elements.industryTemplatesModal.classList.remove('hidden');
  }
  
  // 关闭行业分类文案模板模态框
  function closeIndustryTemplatesModal() {
    if (!elements.industryTemplatesModal) return;
    elements.industryTemplatesModal.classList.add('hidden');
  }
  
  // 关闭促销信息编辑模态框
  function closePromoTextModal() {
    if (!elements.promoTextModal) return;
    
    // 添加关闭动画类
    elements.promoTextModal.classList.add('closing');
    elements.promoTextModal.querySelector('.modal-container').classList.add('closing');
    
    // 延迟隐藏弹窗
    setTimeout(() => {
      elements.promoTextModal.classList.add('hidden');
      // 移除关闭动画类
      elements.promoTextModal.classList.remove('closing');
      elements.promoTextModal.querySelector('.modal-container').classList.remove('closing');
    }, 400); // 匹配动画时长
  }
  

  
  // 保存促销信息
  function savePromoText() {
    if (!elements.promoTextInput) return;
    
    const newPromoText = elements.promoTextInput.value.trim() || '点击编辑促销信息';
    console.log('保存促销信息:', newPromoText);
    
    // 更新状态
    state.businessInfo.promoText = newPromoText;
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 同步到商家信息编辑弹窗
    if (elements.businessPromoTextInput) {
      elements.businessPromoTextInput.value = newPromoText;
    }
    
    // 保存到本地存储
    saveBusinessInfoToLocalStorage();
    
    // 关闭模态框
    closePromoTextModal();
  }
  

  
  // 这里是其他函数定义...
  function bindEvents() {
    // 返回按钮事件
    if (elements.backToHomeBtn) {
      elements.backToHomeBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
      });
    }
    
    // 模板选择相关事件
    if (elements.changeTemplateBtn) {
      elements.changeTemplateBtn.addEventListener('click', openTemplateModal);
    }
    if (elements.closeTemplateModalBtn) {
      elements.closeTemplateModalBtn.addEventListener('click', closeTemplateModal);
    }
    if (elements.cancelTemplateBtn) {
      elements.cancelTemplateBtn.addEventListener('click', closeTemplateModal);
    }
    if (elements.confirmTemplateBtn) {
      elements.confirmTemplateBtn.addEventListener('click', function() {
        // 确认模板选择并带ID重定向
        if (state.currentTemplate) {
          window.location.href = `editor.html?templateId=${state.currentTemplate.id}`;
        }
      });
    }
    
    // 商家信息相关事件
    if (elements.editBusinessInfoBtn) {
      elements.editBusinessInfoBtn.addEventListener('click', openBusinessInfoModal);
    }
    if (elements.closeBusinessInfoModalBtn) {
      elements.closeBusinessInfoModalBtn.addEventListener('click', closeBusinessInfoModal);
    }
    if (elements.cancelBusinessInfoBtn) {
      elements.cancelBusinessInfoBtn.addEventListener('click', closeBusinessInfoModal);
    }
    if (elements.saveBusinessInfoBtn) {
      elements.saveBusinessInfoBtn.addEventListener('click', saveBusinessInfo);
    }
    // 促销文案模板按钮事件
    if (elements.selectPromoTemplateBtn) {
      elements.selectPromoTemplateBtn.addEventListener('click', function() {
        console.log('点击选择促销文案模板按钮');
        openPromoTextModal();
      });
    }
    
    // 行业分类点击事件 - 打开独立弹窗
    if (elements.industryCategories) {
      elements.industryCategories.forEach(category => {
        category.addEventListener('click', function() {
          // 移除所有active类
          elements.industryCategories.forEach(cat => cat.classList.remove('active'));
          // 添加active类到当前分类
          this.classList.add('active');
          // 打开对应行业的模板弹窗
          const categoryName = this.getAttribute('data-category');
          openIndustryTemplateModal(categoryName);
        });
      });
    }
    
    // 关闭行业模板弹窗事件
    if (elements.closeIndustryTemplateModal) {
      elements.closeIndustryTemplateModal.addEventListener('click', closeIndustryTemplateModal);
    }
    
    // 颜色选择事件
    if (elements.fontColorSelector) {
      elements.fontColorSelector.addEventListener('click', function(e) {
        if (e.target.classList.contains('color-option')) {
          // 更新状态
          state.textColor = e.target.getAttribute('data-color');
          // 更新UI选中状态
          document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
            // 移除之前的打勾图标
            const existingCheckmark = option.querySelector('.checkmark');
            if (existingCheckmark) {
              existingCheckmark.remove();
            }
          });
          
          // 添加选中状态
          e.target.classList.add('selected');
          
          // 创建打勾图标
          const checkmark = document.createElement('span');
          checkmark.className = 'checkmark';
          checkmark.textContent = '✓';
          
          // 白色色块特殊处理 - 使用黑色打勾
          if (e.target.getAttribute('data-color') === '#FFFFFF') {
            checkmark.style.color = '#000000';
          } else {
            checkmark.style.color = '#FFFFFF';
          }
          
          e.target.appendChild(checkmark);
          
          // 实时更新预览
          updateBusinessInfoDisplay();
        }
      });
    }
    
    // 促销信息编辑相关事件
    // 点击海报上的促销信息，打开编辑模态框
    if (elements.posterPromoText) {
      elements.posterPromoText.addEventListener('click', function() {
        openPromoTextModal();
      });
    }
    
    // 关闭促销信息编辑模态框
    if (elements.closePromoTextModal) {
      elements.closePromoTextModal.addEventListener('click', closePromoTextModal);
    }
    
    // 取消编辑促销信息
    if (elements.cancelPromoTextBtn) {
      elements.cancelPromoTextBtn.addEventListener('click', closePromoTextModal);
    }
    
    // 保存促销信息
    if (elements.savePromoTextBtn) {
      elements.savePromoTextBtn.addEventListener('click', savePromoText);
    }
    
    // 商家名称点击事件 - 弹出字体颜色选择弹窗
    if (elements.posterBusinessName) {
      elements.posterBusinessName.addEventListener('click', function() {
        // 打开字体颜色选择弹窗
        openFontColorModal();
      });
    }
    
    // Logo区域点击事件 - 弹出商家信息编辑弹窗
    if (elements.posterLogo) {
      elements.posterLogo.addEventListener('click', function() {
        // 打开商家信息编辑弹窗
        openBusinessInfoModal();
      });
    }
    
    // 二维码区域点击事件 - 弹出商家信息编辑弹窗
    if (elements.posterQrcode) {
      elements.posterQrcode.addEventListener('click', function() {
        // 打开商家信息编辑弹窗
        openBusinessInfoModal();
      });
    }
    
    // 背景图片点击事件 - 弹出模板选择弹窗
    if (elements.posterBackground) {
      elements.posterBackground.addEventListener('click', function() {
        // 打开模板选择弹窗
        openTemplateModal();
      });
    }
    
    // 透明触发区域点击事件 - 弹出模板选择弹窗
    if (elements.templateTriggerArea) {
      elements.templateTriggerArea.addEventListener('click', function() {
        // 打开模板选择弹窗
        openTemplateModal();
      });
    }
    
    // 字体颜色选择弹窗关闭按钮事件
    if (elements.closeFontColorModalBtn) {
      elements.closeFontColorModalBtn.addEventListener('click', closeFontColorModal);
    }
    
    // 移除按钮事件监听，因为现在点击颜色直接应用并关闭弹窗
    
    // 字体颜色选择弹窗内的颜色选择事件
    if (elements.fontColorModalSelector) {
      elements.fontColorModalSelector.addEventListener('click', function(e) {
        if (e.target.classList.contains('color-swatch')) {
          // 直接获取颜色并应用
          const selectedColor = e.target.getAttribute('data-color');
          
          if (selectedColor) {
            // 更新状态
            state.textColor = selectedColor;
            
            // 保存到本地存储
            localStorage.setItem('textColor', state.textColor);
            
            // 更新预览
            updateBusinessInfoDisplay();
            
            // 同步更新商家信息编辑弹窗中的颜色选择器状态
            const businessInfoColorSwatches = document.querySelectorAll('#businessInfoModal .color-swatch');
            businessInfoColorSwatches.forEach(swatch => {
              const color = swatch.getAttribute('data-color');
              if (color === selectedColor) {
                swatch.classList.add('selected');
              } else {
                swatch.classList.remove('selected');
              }
            });
            
            // 显示成功提示
            showToast('字体颜色已更新');
            
            // 立即关闭弹窗
            closeFontColorModal();
          }
        }
      });
    }
    
    // 添加标志变量防止重复触发
    let isFileDialogOpen = false;
    let activeFileInput = null;
    
    // 背景上传相关事件
    if (elements.uploadBackgroundBtn) {
      elements.uploadBackgroundBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        
        // 重置状态，允许用户再次点击
        if (isFileDialogOpen) {
          // 如果之前有打开的对话框，先清理
          cleanupFileInput();
        }
        
        // 标记文件对话框已打开
        isFileDialogOpen = true;
        
        // 移除旧的输入框（如果存在），避免多个输入框导致的重复触发
        const existingInput = document.getElementById('backgroundInput');
        if (existingInput) {
          existingInput.removeEventListener('change', handleBackgroundUpload);
          existingInput.removeEventListener('focusout', cleanupFileInput);
          if (existingInput.parentNode) {
            existingInput.parentNode.removeChild(existingInput);
          }
        }
        
        // 重置活动输入框引用
        activeFileInput = null;
        
        // 创建全新的输入框元素
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = 'image/*';
        newInput.id = 'backgroundInput';
        newInput.style.display = 'none'; // 隐藏输入框
        
        // 添加change事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleBackgroundUpload(event);
          // 清理标志和引用
          setTimeout(() => {
            isFileDialogOpen = false;
            activeFileInput = null;
          }, 100);
        });
        
        // 添加focusout事件监听器来处理用户取消选择的情况
        newInput.addEventListener('focusout', cleanupFileInput);
        
        // 添加到DOM中
        document.body.appendChild(newInput);
        
        // 更新elements对象中的引用
        elements.backgroundInput = newInput;
        activeFileInput = newInput;
        
        // 使用setTimeout确保DOM完全更新后再触发点击
        setTimeout(() => {
          // 再次检查，确保输入框仍然存在
          if (newInput && document.body.contains(newInput)) {
            newInput.click();
          } else {
            isFileDialogOpen = false;
            activeFileInput = null;
          }
        }, 50); // 增加延迟时间
      });
    }
    
    // 清理文件输入框的函数
    function cleanupFileInput() {
      // 立即重置状态标志，不等待延迟
      isFileDialogOpen = false;
      
      // 使用setTimeout让浏览器有时间处理取消操作
      setTimeout(() => {
        // 无条件清理状态，确保用户可以再次点击上传按钮
        if (activeFileInput) {
          try {
            // 使用cloneNode方法彻底移除事件监听器
            const newActiveFileInput = activeFileInput.cloneNode(true);
            if (activeFileInput.parentNode) {
              activeFileInput.parentNode.replaceChild(newActiveFileInput, activeFileInput);
            }
          } catch (e) {
            console.log('清理活动输入框时出错，但不影响功能', e);
          } finally {
            activeFileInput = null;
          }
        }
        
        // 移除所有临时创建的file input元素
        const tempInputs = ['backgroundInput', 'logoInput', 'qrcodeInput'];
        tempInputs.forEach(id => {
          try {
            const input = document.getElementById(id);
            if (input && input.parentNode) {
              input.parentNode.removeChild(input);
            }
          } catch (e) {
            console.log(`移除${id}时出错，但不影响功能`, e);
          }
        });
        
        // 确保所有上传按钮可点击
        const uploadButtons = document.querySelectorAll('#uploadBackgroundBtn, #uploadLogoBtn, #uploadQrcodeBtn');
        uploadButtons.forEach(button => {
          button.style.pointerEvents = 'auto';
        });
      }, 100); // 减少延迟时间，提供更快的响应
    }
    
    // Logo上传相关事件
    if (elements.logoUploadArea) {
      elements.logoUploadArea.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        
        // 如果已经有文件对话框打开，则不执行任何操作
        if (isFileDialogOpen) return;
        
        // 标记文件对话框已打开
        isFileDialogOpen = true;
        
        // 移除旧的输入框（如果存在），避免多个输入框导致的重复触发
        const existingInput = document.getElementById('logoInput');
        if (existingInput) {
          existingInput.removeEventListener('change', handleLogoUpload);
          existingInput.removeEventListener('focusout', cleanupFileInput);
          existingInput.parentNode.removeChild(existingInput);
        }
        
        // 创建全新的输入框元素
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = 'image/*';
        newInput.id = 'logoInput';
        newInput.style.display = 'none'; // 隐藏输入框
        
        // 添加change事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleLogoUpload(event);
          // 清理标志
          setTimeout(() => {
            isFileDialogOpen = false;
            activeFileInput = null;
          }, 100);
        });
        
        // 添加focusout事件监听器来处理用户取消选择的情况
        newInput.addEventListener('focusout', cleanupFileInput);
        
        // 添加到DOM中
        document.body.appendChild(newInput);
        
        // 更新elements对象中的引用
        elements.logoInput = newInput;
        activeFileInput = newInput;
        
        // 使用setTimeout确保DOM完全更新后再触发点击
        setTimeout(() => {
          // 再次检查，确保输入框仍然存在
          if (newInput && document.body.contains(newInput)) {
            newInput.click();
          } else {
            isFileDialogOpen = false;
            activeFileInput = null;
          }
        }, 50); // 增加延迟时间，确保DOM完全更新
      });
    }
    if (elements.removeLogoBtn) {
      elements.removeLogoBtn.addEventListener('click', removeLogo);
    }
    
    // VIP恢复按钮事件
    if (elements.restoreLogoBtn) {
      elements.restoreLogoBtn.addEventListener('click', restoreOriginalLogo);
    }
    if (elements.restoreQrcodeBtn) {
      elements.restoreQrcodeBtn.addEventListener('click', restoreOriginalQrcode);
    }
    
    // 二维码上传相关事件
    if (elements.qrcodeUploadArea) {
      elements.qrcodeUploadArea.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        
        // 如果已经有文件对话框打开，则不执行任何操作
        if (isFileDialogOpen) return;
        
        // 标记文件对话框已打开
        isFileDialogOpen = true;
        
        // 移除旧的输入框（如果存在），避免多个输入框导致的重复触发
        const existingInput = document.getElementById('qrcodeInput');
        if (existingInput) {
          existingInput.removeEventListener('change', handleQrcodeUpload);
          existingInput.removeEventListener('focusout', cleanupFileInput);
          existingInput.parentNode.removeChild(existingInput);
        }
        
        // 创建全新的输入框元素
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = 'image/*';
        newInput.id = 'qrcodeInput';
        newInput.style.display = 'none'; // 隐藏输入框
        
        // 添加change事件监听器
        newInput.addEventListener('change', function(event) {
          // 调用原始的处理函数
          handleQrcodeUpload(event);
          // 清理标志
          setTimeout(() => {
            isFileDialogOpen = false;
            activeFileInput = null;
          }, 100);
        });
        
        // 添加focusout事件监听器来处理用户取消选择的情况
        newInput.addEventListener('focusout', cleanupFileInput);
        
        // 添加到DOM中
        document.body.appendChild(newInput);
        
        // 更新elements对象中的引用
        elements.qrcodeInput = newInput;
        activeFileInput = newInput;
        
        // 使用setTimeout确保DOM完全更新后再触发点击
        setTimeout(() => {
          // 再次检查，确保输入框仍然存在
          if (newInput && document.body.contains(newInput)) {
            newInput.click();
          } else {
            isFileDialogOpen = false;
            activeFileInput = null;
          }
        }, 50); // 增加延迟时间，确保DOM完全更新
      });
    }
    if (elements.removeQrcodeBtn) {
      elements.removeQrcodeBtn.addEventListener('click', removeQrcode);
    }
    
    // 输出控制相关事件
    if (elements.downloadBtn) {
      elements.downloadBtn.addEventListener('click', downloadPoster);
    }
    
    // 阻止表单默认提交
    if (elements.businessInfoForm) {
      elements.businessInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
      });
    }
  }
  
  // 初始化编辑器状态
  function initializeEditor() {
    // 检查VIP状态
    checkVipStatus();
    
    // 优先加载VIP专属缓存（如果用户是VIP）
    if (window.isVipActive && window.isVipActive()) {
      const vipId = localStorage.getItem('vipId');
      if (vipId) {
        const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
        const vipSavedInfo = localStorage.getItem(vipBusinessInfoKey);
        
        if (vipSavedInfo) {
          try {
            state.businessInfo = JSON.parse(vipSavedInfo);
            console.log('从VIP专属缓存加载成功:', state.businessInfo);
          } catch (e) {
            console.error('加载VIP专属缓存失败:', e);
            // 如果VIP缓存加载失败，回退到普通缓存
            loadFallbackBusinessInfo();
          }
        } else {
          console.log('VIP专属缓存不存在，使用VIP固定信息初始化');
          // 如果没有VIP专属缓存，使用VIP固定信息初始化
          const vipInfo = window.getVipFixedInfo();
          if (vipInfo) {
            state.businessInfo = {
              ...state.businessInfo,
              name: vipInfo.name,
              logo: vipInfo.logo,
              qrcode: vipInfo.qrcode || state.businessInfo.qrcode, // 优先使用VIP的二维码，如果没有则保留原有的
              promoText: state.businessInfo.promoText // 保留原有的促销信息
            };
            // 保存到VIP专属缓存
            saveVipBusinessInfoToLocalStorage();
          } else {
            loadFallbackBusinessInfo();
          }
        }
      } else {
        loadFallbackBusinessInfo();
      }
    } else {
      // 普通用户加载普通缓存
      loadFallbackBusinessInfo();
    }
    
    // 从本地存储加载文本颜色设置
    const savedTextColor = localStorage.getItem('textColor');
    if (savedTextColor) {
      state.textColor = savedTextColor;
    }
    
    // 更新商家信息显示
    updateBusinessInfoDisplay();
    
    // 检查URL中是否有模板ID参数
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('templateId');
    
    // 等待模板数据加载完成的函数
    function waitForTemplatesAndLoad() {
      // 检查是否满足加载模板的条件
      if (window.utils && window.utils.getTemplateById && window.templates) {
        console.log('模板数据已加载，尝试获取模板...');
        
        if (templateId) {
          // 尝试根据ID加载指定模板
          const selectedTemplate = window.utils.getTemplateById(templateId);
          if (selectedTemplate) {
            state.currentTemplate = selectedTemplate;
            // 重置字体颜色为黑色
            state.textColor = '#000000';
            // 更新本地存储中的字体颜色
            localStorage.setItem('textColor', '#000000');
            updateTemplateDisplay();
            console.log('已加载指定模板:', selectedTemplate.name);
            return; // 加载成功后直接返回
          } else {
            console.warn('未找到指定ID的模板:', templateId);
          }
        }
        
        // 如果没有指定模板或指定模板不存在，加载当前月份的第一个模板
        loadDefaultTemplate();
      } else {
        // 记录当前状态，帮助调试
        console.log('等待模板数据加载...');
        console.log('- window.utils存在:', !!window.utils);
        console.log('- window.utils.getTemplateById存在:', !!(window.utils && window.utils.getTemplateById));
        console.log('- window.templates存在:', !!window.templates);
        
        // 使用setTimeout继续等待，确保模板数据加载完成
        setTimeout(waitForTemplatesAndLoad, 100);
      }
    }
    
    // 开始等待和加载过程
    waitForTemplatesAndLoad();
    
    // 检查是否需要自动弹出商家信息编辑框（如果是第一次打开或信息为空）
    const savedBusinessInfo = localStorage.getItem('posterBusinessInfo');
    if (!savedBusinessInfo || 
        (!state.businessInfo.name || state.businessInfo.name === '点击编辑商家名称')) {
      setTimeout(() => {
        openBusinessInfoModal();
      }, 800);
    }
  }
  
  // 加载默认模板
  function loadDefaultTemplate() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 0-11转为1-12
    const monthKey = `${currentMonth}月`;
    
    // 尝试加载当前月份的第一个模板
    if (window.templates && window.templates[monthKey] && window.templates[monthKey].length > 0) {
      state.currentTemplate = window.templates[monthKey][0];
      // 重置字体颜色为黑色
      state.textColor = '#000000';
      // 更新本地存储中的字体颜色
      localStorage.setItem('textColor', '#000000');
      updateTemplateDisplay();
      console.log('已加载默认模板:', state.currentTemplate.name);
    } else {
      // 如果当前月份没有模板，尝试加载第一个可用模板
      for (const key in window.templates) {
        if (window.templates[key] && window.templates[key].length > 0) {
          state.currentTemplate = window.templates[key][0];
          // 重置字体颜色为黑色
          state.textColor = '#000000';
          // 更新本地存储中的字体颜色
          localStorage.setItem('textColor', '#000000');
          updateTemplateDisplay();
          console.log('已加载备用模板:', state.currentTemplate.name);
          break;
        }
      }
    }
  }
  
  // 更新模板显示
  function updateTemplateDisplay() {
    if (!elements.posterBackground) {
      console.error('缺少背景元素');
      return;
    }
    
    // 显示模板加载动画（最先显示）
    showTemplateLoadingAnimation();
    
    // 隐藏所有海报内容，等待所有元素加载完成
    elements.posterBackground.style.display = 'none';
    const posterContent = document.getElementById('posterContent');
    if (posterContent) {
      posterContent.style.display = 'none';
    }
    
    // 使用自定义背景或模板背景
    if (state.customBackground) {
      elements.posterBackground.src = state.customBackground;
    } else if (state.currentTemplate && state.currentTemplate.image) {
      elements.posterBackground.src = state.currentTemplate.image;
    } else {
      console.warn('没有可用的图片资源');
      // 如果没有图片资源，立即隐藏动画
      hideTemplateLoadingAnimation();
      // 显示海报内容
      if (posterContent) {
        posterContent.style.display = 'flex';
      }
      return;
    }
    
    // 监听图片加载完成事件
    elements.posterBackground.onload = function() {
      console.log('背景图片加载完成');
      
      // 等待所有元素加载完成
      waitForAllElementsLoaded().then(() => {
        // 显示所有海报内容
        elements.posterBackground.style.display = 'block';
        if (posterContent) {
          posterContent.style.display = 'flex';
        }
        
        // 应用科技感过渡效果
        applyTechTransitionEffect();
        
        // 立即隐藏加载动画
        hideTemplateLoadingAnimation();
        console.log('所有元素加载完成，加载动画已关闭');
      });
    };
    
    // 监听图片加载错误事件
    elements.posterBackground.onerror = function() {
      console.error('背景图片加载失败');
      
      // 即使加载失败也要显示所有内容
      waitForAllElementsLoaded().then(() => {
        elements.posterBackground.style.display = 'block';
        if (posterContent) {
          posterContent.style.display = 'flex';
        }
        
        // 立即隐藏加载动画
        hideTemplateLoadingAnimation();
      });
    };
  }
  
  // 等待所有元素加载完成的函数
  function waitForAllElementsLoaded() {
    return new Promise((resolve) => {
      const elementsToCheck = [
        elements.posterBackground,
        elements.posterLogoImg,
        elements.posterQrcodeImg
      ];
      
      let loadedCount = 0;
      const totalElements = elementsToCheck.filter(el => el && el.src).length;
      
      if (totalElements === 0) {
        // 如果没有需要检查的元素，直接解析
        resolve();
        return;
      }
      
      elementsToCheck.forEach(element => {
        if (element && element.src) {
          if (element.complete) {
            // 元素已经加载完成
            loadedCount++;
            if (loadedCount >= totalElements) {
              resolve();
            }
          } else {
            // 监听元素的加载事件
            element.addEventListener('load', () => {
              loadedCount++;
              if (loadedCount >= totalElements) {
                resolve();
              }
            });
            
            // 监听元素的错误事件（即使加载失败也算完成）
            element.addEventListener('error', () => {
              loadedCount++;
              if (loadedCount >= totalElements) {
                resolve();
              }
            });
          }
        }
      });
    });
  }
  
  // 应用像素化过渡效果
  function applyTechTransitionEffect() {
    if (!elements.posterBackground) return;
    
    // 移除可能存在的旧效果类
    elements.posterBackground.classList.remove('pixel-transition');
    
    // 添加像素化效果类
    elements.posterBackground.classList.add('pixel-transition');
    
    console.log('应用像素化过渡效果');
    
    // 动画结束后移除效果类
    setTimeout(() => {
      elements.posterBackground.classList.remove('pixel-transition');
    }, 1200); // 1秒动画时间 + 200ms缓冲
  }
  
  // 更新商家信息显示
  function updateBusinessInfoDisplay() {
    // 更新商家名称
    if (elements.posterBusinessName && state.businessInfo.name) {
      elements.posterBusinessName.textContent = state.businessInfo.name;
      elements.posterBusinessName.style.color = state.textColor || '#000000';
    }
    
    // 更新商家Logo
    if (elements.posterLogoImg && elements.logoPlaceholder) {
      if (state.businessInfo.logo) {
        elements.posterLogoImg.src = state.businessInfo.logo;
        elements.posterLogoImg.style.display = 'block';
        elements.logoPlaceholder.style.display = 'none';
      } else {
        elements.posterLogoImg.style.display = 'none';
        elements.logoPlaceholder.style.display = 'block';
      }
    }
    
    // 更新二维码
    if (elements.posterQrcodeImg && elements.qrcodePlaceholder) {
      if (state.businessInfo.qrcode) {
        elements.posterQrcodeImg.src = state.businessInfo.qrcode;
        elements.posterQrcodeImg.style.display = 'block';
        elements.qrcodePlaceholder.style.display = 'none';
      } else {
        elements.posterQrcodeImg.style.display = 'none';
        elements.qrcodePlaceholder.style.display = 'block';
      }
    }
    
    // 更新促销信息
    if (elements.posterPromoText && state.businessInfo.promoText) {
      // 将换行符转换为<br>标签，以便在预览中正确显示换行
      elements.posterPromoText.innerHTML = state.businessInfo.promoText.replace(/\n/g, '<br>');
      elements.posterPromoText.style.color = state.textColor;
    }
    
    // 同时更新商家信息弹窗中的促销信息输入框
    if (elements.promoTextInput && state.businessInfo.promoText) {
      elements.promoTextInput.value = state.businessInfo.promoText;
    }
    
    // 更新商家信息编辑弹窗中的颜色选择器状态
    const businessInfoColorSwatches = document.querySelectorAll('#businessInfoModal .color-swatch');
    businessInfoColorSwatches.forEach(swatch => {
      const color = swatch.getAttribute('data-color');
      if (color === state.textColor) {
        swatch.classList.add('selected');
      } else {
        swatch.classList.remove('selected');
      }
    });
    
    // 更新字体颜色选择弹窗中的颜色选择器状态
    const fontColorModalSwatches = document.querySelectorAll('#fontColorModal .color-swatch');
    fontColorModalSwatches.forEach(swatch => {
      const color = swatch.getAttribute('data-color');
      // 为当前颜色添加选中边框效果
      if (color === state.textColor) {
        swatch.style.border = '2px solid #333';
      } else {
        // 重置其他颜色的边框
        if (color === '#FFFFFF') {
          swatch.style.border = '1px solid #ddd';
        } else {
          swatch.style.border = '1px solid transparent';
        }
      }
    });
    
    // 更新字体颜色选择器的值
    if (elements.fontColorSelector) {
      elements.fontColorSelector.value = state.textColor;
    }
  }
  
  // 打开字体颜色选择弹窗
  function openFontColorModal() {
    if (!elements.fontColorModal || !elements.fontColorModalSelector) return;
    
    // 初始化颜色选择器状态
    const colorOptions = elements.fontColorModalSelector.querySelectorAll('.color-swatch');
    colorOptions.forEach(option => {
      const color = option.getAttribute('data-color');
      
      // 移除所有选中状态
      option.classList.remove('selected');
      
      // 为当前颜色添加选中边框效果
      if (color === state.textColor) {
        option.style.border = '2px solid #333';
      } else {
        // 重置其他颜色的边框
        if (color === '#FFFFFF') {
          option.style.border = '1px solid #ddd';
        } else {
          option.style.border = '1px solid transparent';
        }
      }
    });
    
    // 同步更新商家信息编辑弹窗中的颜色选择器
    const businessInfoColorSwatches = document.querySelectorAll('#businessInfoModal .color-swatch');
    businessInfoColorSwatches.forEach(swatch => {
      const color = swatch.getAttribute('data-color');
      if (color === state.textColor) {
        swatch.classList.add('selected');
      } else {
        swatch.classList.remove('selected');
      }
    });
    
    // 移除关闭动画类
    elements.fontColorModal.classList.remove('closing');
    elements.fontColorModal.querySelector('.modal').classList.remove('closing');
    
    // 显示弹窗
    elements.fontColorModal.classList.remove('hidden');
    elements.fontColorModal.style.display = 'flex';
    
    // 强制重绘以触发动画
    void elements.fontColorModal.offsetWidth;
  }
  
  // 关闭字体颜色选择弹窗
  function closeFontColorModal() {
    if (!elements.fontColorModal) return;
    
    // 添加关闭动画类
    elements.fontColorModal.classList.add('closing');
    elements.fontColorModal.querySelector('.modal').classList.add('closing');
    
    // 延迟隐藏弹窗
    setTimeout(() => {
      elements.fontColorModal.classList.add('hidden');
      elements.fontColorModal.style.display = 'none';
      // 移除关闭动画类
      elements.fontColorModal.classList.remove('closing');
      elements.fontColorModal.querySelector('.modal').classList.remove('closing');
    }, 400); // 匹配动画时长
  }
  
  // 保存字体颜色函数保留但简化，因为现在点击颜色直接应用
  function saveFontColor() {
    // 直接关闭弹窗
    closeFontColorModal();
  }
  
  // 打开模板选择弹窗
  function openTemplateModal() {
    if (!elements.templateModal || !elements.templateGrid) return;
    
    // 清空模板网格
    elements.templateGrid.innerHTML = '';
    
    // 填充月份按钮
    fillMonthButtons();
    
    // 填充节日标签
    fillFestivalTags();
    
    // 填充模板网格
    fillTemplateGrid();
    
    // 根据当前日期自动选择月份和节日（与首页逻辑保持一致）
    autoSelectDateInModal();
    
    // 移除关闭动画类
    elements.templateModal.classList.remove('closing');
    elements.templateModal.querySelector('.modal').classList.remove('closing');
    
    // 显示弹窗 - 通过移除hidden类
    elements.templateModal.classList.remove('hidden');
    // 同时设置display确保兼容性
    elements.templateModal.style.display = 'flex';
    
    // 强制重绘以触发动画
    void elements.templateModal.offsetWidth;
  }
  
  // 在模板弹窗中根据当前模板信息自动选择月份和节日
  function autoSelectDateInModal() {
    try {
      // 优先使用当前模板的信息进行定位
      if (state.currentTemplate) {
        console.log('根据当前模板定位:', state.currentTemplate);
        
        // 获取模板的月份（取第一个月份作为主要定位）
        if (state.currentTemplate.months && state.currentTemplate.months.length > 0) {
          const templateMonth = state.currentTemplate.months[0];
          console.log('定位到模板月份:', templateMonth);
          
          // 选中对应的月份按钮
          const monthButton = document.querySelector(`#modalMonthButtons .month-btn[data-month="${templateMonth}"]`);
          if (monthButton) {
            // 直接设置选中状态，避免重复触发点击事件
            document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
            monthButton.classList.add('active');
            
            // 筛选显示该月份的模板
            filterTemplatesByMonth(templateMonth);
            
            // 确保月份按钮滚动到可见位置，特别是对于末尾月份
            setTimeout(() => {
              forceScrollToMonthButton(monthButton);
              
              // 延迟选择节日，确保月份滚动和筛选已经完成
              setTimeout(() => {
                // 如果模板有节日信息，选中对应的节日标签
                if (state.currentTemplate.festivals && state.currentTemplate.festivals.length > 0) {
                  let templateFestival = state.currentTemplate.festivals[0];
                  console.log('定位到模板节日:', templateFestival);
                  
                  // 处理早安模板的特殊情况
                  let festivalTag;
                  if (templateFestival === '早安') {
                    festivalTag = document.querySelector('.festival-tag[data-festival="☀️ 早安"]');
                  } else {
                    festivalTag = document.querySelector(`.festival-tag[data-festival="${templateFestival}"]`);
                  }
                  
                  if (festivalTag) {
                    festivalTag.click();
                  }
                }
                
                // 延迟选中当前模板，确保月份和节日筛选已经完成
                setTimeout(() => {
                  selectCurrentTemplateInModal();
                }, 200);
              }, 100);
            }, 50);
            
            return; // 成功定位后返回
          }
        }
      }
      
      // 如果没有当前模板或定位失败，则使用默认的日期定位
      console.log('使用默认日期定位');
      const result = utils.autoSelectByDate();
      if (result && result.month) {
        // 选中对应的月份按钮
        const monthButton = document.querySelector(`#modalMonthButtons .month-btn[data-month="${result.month}"]`);
        if (monthButton) {
          // 直接设置选中状态并滚动到可见位置
          document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
          monthButton.classList.add('active');
          filterTemplatesByMonth(result.month);
          forceScrollToMonthButton(monthButton);
        }
      }
    } catch (error) {
      console.error('自动选择日期失败:', error);
    }
  }
  
  // 强制滚动月份按钮到可见位置，特别是针对末尾月份
  function forceScrollToMonthButton(button) {
    const container = elements.modalMonthButtons;
    if (!container || !button) return;
    
    // 首先使用正常的居中滚动逻辑
    const buttonOffsetLeft = button.offsetLeft;
    const buttonWidth = button.offsetWidth;
    const containerWidth = container.clientWidth;
    const maxScrollLeft = container.scrollWidth - containerWidth;
    
    // 计算按钮中心点应该在容器中的位置
    const containerCenter = containerWidth / 2;
    const buttonCenter = buttonOffsetLeft + buttonWidth / 2;
    
    // 计算理想的滚动位置，让按钮居中
    let targetScrollPosition = buttonCenter - containerCenter;
    
    // 边界检查：确保滚动位置不会超出容器的可滚动范围
    targetScrollPosition = Math.max(0, Math.min(targetScrollPosition, maxScrollLeft));
    
    // 执行滚动
    container.scrollTo({
      left: targetScrollPosition,
      behavior: 'smooth'
    });
    
    // 额外检查：确保末尾月份能够完全可见
    // 立即执行一次强制滚动，避免动画延迟导致的问题
    setTimeout(() => {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // 检查按钮是否完全在容器可视区域内
      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        // 如果不在可视区域内，执行更直接的滚动
        console.log('执行强制滚动以确保月份按钮可见');
        
        // 计算需要滚动的距离
        const scrollLeft = container.scrollLeft + (buttonRect.left - containerRect.left) - 10;
        
        // 使用非动画滚动，确保立即滚动到位
        container.scrollLeft = Math.max(0, Math.min(scrollLeft, maxScrollLeft));
      }
    }, 100);
  }
  
  // 在模态框中选中当前使用的模板
  function selectCurrentTemplateInModal() {
    if (state.currentTemplate) {
      console.log('尝试选中当前模板:', state.currentTemplate.id);
      const templateItem = document.querySelector(`.template-item[data-template-id="${state.currentTemplate.id}"]`);
      if (templateItem) {
        // 移除其他模板的选中状态
        document.querySelectorAll('.template-item').forEach(item => item.classList.remove('selected'));
        // 添加当前模板的选中状态
        templateItem.classList.add('selected');
        // 滚动到当前模板，确保可见
        templateItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log('成功选中当前模板');
      } else {
        console.warn('未找到当前模板对应的项');
      }
    }
  }
  
  // 填充月份按钮
  function fillMonthButtons() {
    if (!elements.modalMonthButtons) return;
    
    // 清空现有内容
    elements.modalMonthButtons.innerHTML = '';
    
    // 创建月份按钮
    for (let i = 1; i <= 12; i++) {
      const monthBtn = document.createElement('button');
      monthBtn.className = 'month-btn';
      monthBtn.textContent = `${i}月`;
      
      // 为每个月份按钮添加自定义data属性，方便后续查找
      monthBtn.dataset.month = i;
      
      monthBtn.addEventListener('click', function() {
        // 移除所有按钮的选中状态
        document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
        // 添加当前按钮的选中状态
        this.classList.add('active');
        // 筛选显示该月份的模板
        filterTemplatesByMonth(i);
        
        // 自动滚动到当前选中的月份，使其居中显示
        scrollToMonthButton(this);
      });
      elements.modalMonthButtons.appendChild(monthBtn);
    }
    
    // 月份按钮滚动到中间的辅助函数
    function scrollToMonthButton(button) {
      const container = elements.modalMonthButtons;
      
      // 获取按钮相对于容器的位置
      const buttonOffsetLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.clientWidth;
      
      // 获取容器可滚动的最大距离
      const maxScrollLeft = container.scrollWidth - containerWidth;
      
      // 计算按钮中心点应该在容器中的位置
      const containerCenter = containerWidth / 2;
      const buttonCenter = buttonOffsetLeft + buttonWidth / 2;
      
      // 计算理想的滚动位置，让按钮居中
      let targetScrollPosition = buttonCenter - containerCenter;
      
      // 边界检查：确保滚动位置不会超出容器的可滚动范围
      targetScrollPosition = Math.max(0, Math.min(targetScrollPosition, maxScrollLeft));
      
      // 使用setTimeout确保DOM更新完成后再执行滚动
      setTimeout(() => {
        container.scrollTo({
          left: targetScrollPosition,
          behavior: 'smooth'
        });
      }, 50);
    }
    
    // 不再设置默认月份，由autoSelectDateInModal函数根据当前模板自动定位
    // 这样可以确保定位到正确的月份和节日，避免覆盖模板定位逻辑
  }
  
  // 填充节日标签
  function fillFestivalTags(selectedMonth = null) {
    if (!elements.modalFestivalTags) return;
    
    // 清空现有内容
    elements.modalFestivalTags.innerHTML = '';
    
    // 首先添加早安标签
    const zaoanTag = document.createElement('div');
    zaoanTag.className = 'festival-tag';
    zaoanTag.textContent = '☀️ 早安';
    zaoanTag.dataset.festival = '☀️ 早安';
    
    // 为早安标签添加点击事件
    const zaoanClickHandler = function() {
      // 移除所有标签的选中状态
      document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
      // 添加当前标签的选中状态
      this.classList.add('active');
      // 筛选显示早安模板
      filterTemplatesByFestival('☀️ 早安');
    };
    
    zaoanTag.addEventListener('click', zaoanClickHandler);
    // 存储事件处理函数引用，便于后续移除
    zaoanTag._clickHandler = zaoanClickHandler;
    
    elements.modalFestivalTags.appendChild(zaoanTag);
    
    // 获取节日列表
    let festivals = [];
    
    // 获取所有节日数据
    const allFestivalsData = utils.getAllFestivals();
    
    if (selectedMonth) {
      // 如果指定了月份，只获取该月份的节日
      festivals = Object.keys(allFestivalsData).filter(festivalName => {
        const festival = allFestivalsData[festivalName];
        return festival.month === selectedMonth;
      });
    } else {
      // 否则获取所有节日
      festivals = Object.keys(allFestivalsData);
    }
    
    // 获取节日数据并按日期排序
    const allFestivals = utils.getAllFestivals();
    const festivalsWithDate = festivals.map(festival => {
      const festivalData = allFestivals[festival] || { month: 1, day: 1 }; // 默认值，防止数据缺失
      return {
        name: festival,
        month: festivalData.month,
        day: festivalData.day
      };
    });
    
    // 按日期排序
    festivalsWithDate.sort((a, b) => {
      if (a.month !== b.month) {
        return a.month - b.month;
      }
      return a.day - b.day;
    });
    
    // 创建节日标签
    festivalsWithDate.forEach(festival => {
      const festivalTag = document.createElement('div');
      festivalTag.className = 'festival-tag';
      festivalTag.textContent = festival.name;
      festivalTag.dataset.festival = festival.name;
    
      // 创建事件处理函数引用，便于后续移除
      const tagClickHandler = function() {
        // 移除所有标签的选中状态
        document.querySelectorAll('.festival-tag').forEach(tag => tag.classList.remove('active'));
        // 添加当前标签的选中状态
        this.classList.add('active');
        // 筛选显示该节日的模板
        filterTemplatesByFestival(festival.name);
      };
      
      festivalTag.addEventListener('click', tagClickHandler);
      // 存储事件处理函数引用，便于后续移除
      festivalTag._clickHandler = tagClickHandler;
      
      elements.modalFestivalTags.appendChild(festivalTag);
    });
  }
  
  // 填充模板网格
  function fillTemplateGrid() {
    if (!window.templates || !elements.templateGrid) return;
    
    // 清空现有内容
    elements.templateGrid.innerHTML = '';
    
    // 遍历所有模板
    for (const monthKey in window.templates) {
      const monthTemplates = window.templates[monthKey];
      
      monthTemplates.forEach(template => {
        // 创建模板项
        const templateItem = document.createElement('div');
        templateItem.className = 'template-item';
        templateItem.dataset.templateId = template.id;
        
        // 是否为当前选中的模板
        const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;
        
        // 创建模板图片容器
        const templateImgContainer = document.createElement('div');
        templateImgContainer.className = 'template-thumbnail-container';
        
        // 创建模板图片
        const templateImg = document.createElement('img');
        templateImg.src = template.thumbnail;
        templateImg.alt = template.name;
        templateImg.className = 'template-thumbnail';
        
        // 创建圆形勾选按钮
        const checkButton = document.createElement('div');
        checkButton.className = 'template-check-button';
        checkButton.innerHTML = '<i class="fa fa-check"></i>';
        
        // 设置初始勾选状态
        if (isSelected) {
          checkButton.classList.add('checked');
        }
        
        // 为勾选按钮添加点击事件
        checkButton.addEventListener('click', function(e) {
          e.stopPropagation(); // 阻止事件暴泡
          console.log('点击勾选按钮选择模板:', template.name);
          
          // 移除所有勾选按钮的选中状态
          document.querySelectorAll('.template-check-button').forEach(btn => {
            btn.classList.remove('checked');
          });
          
          // 添加当前按钮的选中状态
          this.classList.add('checked');
          
          // 更新当前模板
          selectTemplate(template);
          
          // 关闭模板选择弹窗
          closeTemplateModal();
        });
        
        // 为模板项添加点击事件（可选，用于保持原有功能）
        templateItem.addEventListener('click', function() {
          // 移除所有勾选按钮的选中状态
          document.querySelectorAll('.template-check-button').forEach(btn => {
            btn.classList.remove('checked');
          });
          
          // 添加当前按钮的选中状态
          checkButton.classList.add('checked');
          
          // 更新当前模板
          selectTemplate(template);
        });
        
        // 添加双击事件 - 双击直接选择模板并关闭弹窗
        templateItem.addEventListener('dblclick', function() {
          console.log('双击选中模板并关闭弹窗:', template.name);
          
          // 移除所有勾选按钮的选中状态
          document.querySelectorAll('.template-check-button').forEach(btn => {
            btn.classList.remove('checked');
          });
          
          // 添加当前按钮的选中状态
          checkButton.classList.add('checked');
          
          // 更新当前模板
          selectTemplate(template);
          
          // 关闭模板选择弹窗
          closeTemplateModal();
        });
        
        // 创建模板名称
        const templateName = document.createElement('div');
        templateName.className = 'template-name';
        templateName.textContent = template.name;
        
        // 组合模板项
        templateImgContainer.appendChild(templateImg);
        templateImgContainer.appendChild(checkButton);
        templateItem.appendChild(templateImgContainer);
        templateItem.appendChild(templateName);
        
        // 直接添加到网格元素
        if (elements.templateGrid) {
          elements.templateGrid.appendChild(templateItem);
        } else {
          console.error('模板网格元素未找到');
        }
      });
    }
    
    // 在模板列表最后添加自定义背景入口
    addCustomBackgroundEntryToModal();
  }
  
  // 选择模板
  function selectTemplate(template) {
    // 选择新模板时，直接带模板ID重定向到新页面
    // 真正的加载动画将在新页面的背景图片加载过程中显示
    window.location.href = `editor.html?templateId=${template.id}`;
  }
  
  // 关闭模板选择弹窗
  function closeTemplateModal() {
    console.log('尝试关闭模板弹窗');
    if (elements.templateModal) {
      // 添加关闭动画类
      elements.templateModal.classList.add('closing');
      elements.templateModal.querySelector('.modal').classList.add('closing');
      
      // 延迟隐藏弹窗
      setTimeout(() => {
        // 隐藏弹窗 - 添加hidden类
        elements.templateModal.classList.add('hidden');
        // 同时设置display确保兼容性
        elements.templateModal.style.display = 'none';
        // 移除关闭动画类
        elements.templateModal.classList.remove('closing');
        elements.templateModal.querySelector('.modal').classList.remove('closing');
        console.log('模板弹窗已关闭');
      }, 400); // 匹配动画时长
    } else {
      console.error('模板弹窗元素未找到');
    }
  }
  
  // 修复模板网格元素引用不一致问题
  function getTemplateGrid() {
    return elements.templateGrid || elements.modalTemplatesGrid;
  }
  
  // 按月份筛选模板
  function filterTemplatesByMonth(month) {
    if (!window.templates || !elements.templateGrid || !elements.modalFestivalTags) return;
    
    // 清空现有内容
    elements.templateGrid.innerHTML = '';
    
    // 更新节日标签，只显示选中月份的节日
    fillFestivalTags(month);
    
    // 遍历所有模板
    for (const monthKey in window.templates) {
      const monthTemplates = window.templates[monthKey];
      
      monthTemplates.forEach(template => {
        // 只显示指定月份的模板
        if (template.months && template.months.includes(month)) {
          // 创建模板项
          const templateItem = document.createElement('div');
          templateItem.className = 'template-item';
          templateItem.dataset.templateId = template.id;
          
          // 是否为当前选中的模板
          const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;
          
          // 创建模板图片容器
          const templateImgContainer = document.createElement('div');
          templateImgContainer.className = 'template-thumbnail-container';
          
          // 创建模板图片
          const templateImg = document.createElement('img');
          templateImg.src = template.thumbnail;
          templateImg.alt = template.name;
          templateImg.className = 'template-thumbnail';
          
          // 创建圆形勾选按钮
          const checkButton = document.createElement('div');
          checkButton.className = 'template-check-button';
          checkButton.innerHTML = '<i class="fa fa-check"></i>';
          
          // 设置初始勾选状态
          if (isSelected) {
            checkButton.classList.add('checked');
          }
          
          // 为勾选按钮添加点击事件
          checkButton.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            console.log('点击勾选按钮选择模板:', template.name);
            
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            this.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
            
            // 关闭模板选择弹窗
            closeTemplateModal();
          });
          
          // 为模板项添加点击事件
          templateItem.addEventListener('click', function() {
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            checkButton.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
          });
          
          // 添加双击事件 - 双击直接选择模板并关闭弹窗
          templateItem.addEventListener('dblclick', function() {
            console.log('双击选中模板并关闭弹窗:', template.name);
            
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            checkButton.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
            
            // 关闭模板选择弹窗
            closeTemplateModal();
          });
          
          // 创建模板名称
          const templateName = document.createElement('div');
          templateName.className = 'template-name';
          templateName.textContent = template.name;
          
          // 组合模板项
          templateImgContainer.appendChild(templateImg);
          templateImgContainer.appendChild(checkButton);
          templateItem.appendChild(templateImgContainer);
          templateItem.appendChild(templateName);
          
          // 添加到网格
          elements.templateGrid.appendChild(templateItem);
        }
      });
    }
    
    // 在模板列表最后添加自定义背景入口
    addCustomBackgroundEntryToModal();
    
    // 尝试自动选择对应月份的节日（与首页逻辑保持一致）
    try {
      const result = utils.autoSelectByDate();
      if (result && result.festival && month === result.month) {
        setTimeout(() => {
          const festivalTag = document.querySelector(`#modalFestivalTags .festival-tag[data-festival="${result.festival}"]`);
          if (festivalTag) {
            festivalTag.click();
          }
        }, 100);
      }
    } catch (error) {
      console.error('自动选择节日失败:', error);
    }
  }
  
  // 按节日筛选模板
  function filterTemplatesByFestival(festival) {
    if (!window.templates || !elements.templateGrid) return;
    
    // 清空现有内容
    elements.templateGrid.innerHTML = '';
    
    // 遍历所有模板
    for (const monthKey in window.templates) {
      const monthTemplates = window.templates[monthKey];
      
      monthTemplates.forEach(template => {
        // 处理"早安"分类
        let showTemplate = false;
        if (festival === '☀️ 早安') {
          showTemplate = template.festivals.includes('早安');
        } else {
          showTemplate = template.festivals.includes(festival);
        }
        
        if (showTemplate) {
          // 创建模板项
          const templateItem = document.createElement('div');
          templateItem.className = 'template-item';
          templateItem.dataset.templateId = template.id;
          
          // 是否为当前选中的模板
          const isSelected = state.currentTemplate && state.currentTemplate.id === template.id;
          
          // 创建模板图片容器
          const templateImgContainer = document.createElement('div');
          templateImgContainer.className = 'template-thumbnail-container';
          
          // 创建模板图片
          const templateImg = document.createElement('img');
          templateImg.src = template.thumbnail;
          templateImg.alt = template.name;
          templateImg.className = 'template-thumbnail';
          
          // 创建圆形勾选按钮
          const checkButton = document.createElement('div');
          checkButton.className = 'template-check-button';
          checkButton.innerHTML = '<i class="fa fa-check"></i>';
          
          // 设置初始勾选状态
          if (isSelected) {
            checkButton.classList.add('checked');
          }
          
          // 为勾选按钮添加点击事件
          checkButton.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            console.log('点击勾选按钮选择模板:', template.name);
            
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            this.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
            
            // 关闭模板选择弹窗
            closeTemplateModal();
          });
          
          // 为模板项添加点击事件
          templateItem.addEventListener('click', function() {
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            checkButton.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
          });
          
          // 添加双击事件 - 双击直接选择模板并关闭弹窗
          templateItem.addEventListener('dblclick', function() {
            console.log('双击选中模板并关闭弹窗:', template.name);
            
            // 移除所有勾选按钮的选中状态
            document.querySelectorAll('.template-check-button').forEach(btn => {
              btn.classList.remove('checked');
            });
            
            // 添加当前按钮的选中状态
            checkButton.classList.add('checked');
            
            // 更新当前模板
            selectTemplate(template);
            
            // 关闭模板选择弹窗
            closeTemplateModal();
          });
          
          // 创建模板名称
          const templateName = document.createElement('div');
          templateName.className = 'template-name';
          templateName.textContent = template.name;
          
          // 组合模板项
          templateImgContainer.appendChild(templateImg);
          templateImgContainer.appendChild(checkButton);
          templateItem.appendChild(templateImgContainer);
          templateItem.appendChild(templateName);
          
          // 添加到网格
          elements.templateGrid.appendChild(templateItem);
        }
      });
    }
    
    // 在模板列表最后添加自定义背景入口
    addCustomBackgroundEntryToModal();
  }
  
  // 关闭模板选择弹窗
  function closeTemplateModal() {
    if (elements.templateModal) {
      // 移除动态创建的节日标签及其事件监听器
      const festivalTags = document.querySelectorAll('.festival-tag');
      festivalTags.forEach(tag => {
        if (tag._clickHandler) {
          tag.removeEventListener('click', tag._clickHandler);
          delete tag._clickHandler;
        }
      });
      
      // 清空模板网格和标签容器
      if (elements.templateGrid) {
        elements.templateGrid.innerHTML = '';
      }
      if (elements.modalFestivalTags) {
        elements.modalFestivalTags.innerHTML = '';
      }
      
      elements.templateModal.classList.add('hidden');
      elements.templateModal.style.display = 'none';
    }
  }
  
  // 为输入框添加清除按钮和改进提示语交互
  function enhanceInputWithClearButton(inputElement, placeholderText) {
    // 如果是VIP用户，不创建清除按钮
    if (window.isVipActive && window.isVipActive()) {
      return;
    }
    
    // 移除之前可能存在的事件监听器，防止重复绑定
    if (inputElement._inputHandler) {
      inputElement.removeEventListener('input', inputElement._inputHandler);
    }
    if (inputElement._focusHandler) {
      inputElement.removeEventListener('focus', inputElement._focusHandler);
    }
    if (inputElement._blurHandler) {
      inputElement.removeEventListener('blur', inputElement._blurHandler);
    }
    
    // 如果清除按钮已存在，则移除它
    let clearButton = inputElement.parentNode.querySelector('.clear-button');
    if (clearButton) {
      // 移除清除按钮的事件监听器
      if (clearButton._clickHandler) {
        clearButton.removeEventListener('click', clearButton._clickHandler);
      }
      inputElement.parentNode.removeChild(clearButton);
    }
    
    // 为输入框容器添加相对定位
    const container = inputElement.parentNode;
    container.style.position = 'relative';
    
    // 创建清除按钮
    clearButton = document.createElement('button');
    clearButton.className = 'clear-button';
    clearButton.textContent = '✕';
    clearButton.style.cursor = 'pointer';
    clearButton.style.display = 'none'; // 默认隐藏
    
    // 添加清除按钮点击事件，并保存引用
    clearButton._clickHandler = function() {
      inputElement.value = '';
      clearButton.style.display = 'none';
    };
    clearButton.addEventListener('click', clearButton._clickHandler);
    
    // 添加输入事件，控制清除按钮显示/隐藏，保存引用
    inputElement._inputHandler = function() {
      clearButton.style.display = this.value ? 'block' : 'none';
    };
    inputElement.addEventListener('input', inputElement._inputHandler);
    
    // 添加焦点事件，保存引用
    inputElement._focusHandler = function() {
      if (this.value === placeholderText) {
        this.value = '';
      }
      // 显示清除按钮
      if (this.value) {
        clearButton.style.display = 'block';
      }
    };
    inputElement.addEventListener('focus', inputElement._focusHandler);
    
    // 添加失去焦点事件，保存引用
    inputElement._blurHandler = function() {
      if (!this.value.trim()) {
        this.value = placeholderText;
        clearButton.style.display = 'none';
      }
    };
    inputElement.addEventListener('blur', inputElement._blurHandler);
    
    // 将清除按钮添加到输入框容器
    container.appendChild(clearButton);
    
    // 初始检查输入框内容，决定是否显示清除按钮
    if (inputElement.value && inputElement.value !== placeholderText) {
      clearButton.style.display = 'block';
    }
  }
  
  // 打开商家信息编辑弹窗
  function openBusinessInfoModal() {
    if (!elements.businessInfoModal || !elements.businessNameInput || !elements.businessPromoTextInput) return;
    
    // 填充表单数据
    elements.businessNameInput.value = state.businessInfo.name || '';
    elements.businessPromoTextInput.value = state.businessInfo.promoText || '';
    
    // 初始化颜色色块选中状态 - 确保与state.textColor同步
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
      if (swatch.dataset.color === state.textColor) {
        swatch.classList.add('selected');
      } else {
        swatch.classList.remove('selected');
      }
    });
    
    // 确保字体颜色选择器与state.textColor同步
    if (elements.fontColorSelector) {
      elements.fontColorSelector.value = state.textColor;
    }
    
    // 绑定颜色色块点击事件
    colorSwatches.forEach(swatch => {
      // 移除可能存在的事件监听器
      const newSwatch = swatch.cloneNode(true);
      swatch.parentNode.replaceChild(newSwatch, swatch);
      
      // 添加新的点击事件
      newSwatch.addEventListener('click', function() {
        // 更新所有色块的选中状态
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
        
        // 更新状态并实时预览
        state.textColor = this.dataset.color;
        
        // 保存到本地存储
        localStorage.setItem('textColor', state.textColor);
        
        updateBusinessInfoDisplay();
        
        // 同步更新字体颜色选择器的值
        if (elements.fontColorSelector) {
          elements.fontColorSelector.value = state.textColor;
        }
      });
    });
    
    // 为输入框添加清除按钮和改进提示语交互
    enhanceInputWithClearButton(elements.businessNameInput, '点击编辑商家名称');
    
    // 不再需要重新实现颜色选择器，因为我们已经在HTML中静态定义了色块按钮组
    
    // 为textarea添加改进提示语交互，但不添加清除按钮（textarea内容可能有多行）
    if (elements.promoTextInput) {
      if (!elements.promoTextInput.value) {
        elements.promoTextInput.placeholder = '点击编辑促销信息，支持Enter键换行';
      }
      
      // 添加焦点和失焦事件处理
      elements.promoTextInput.addEventListener('focus', function() {
        if (!this.value) {
          this.placeholder = '';
        }
      });
      
      elements.promoTextInput.addEventListener('blur', function() {
        if (!this.value) {
          this.placeholder = '点击编辑促销信息，支持Enter键换行';
        }
      });
    }
    
    // 根据是否有logo来显示或隐藏上传区域
    if (elements.logoUploadArea && elements.logoPreview) {
      if (state.businessInfo.logo) {
        elements.logoUploadArea.style.display = 'none';
        elements.logoPreview.style.display = 'block';
        elements.logoPreviewImg.src = state.businessInfo.logo;
      } else {
        elements.logoUploadArea.style.display = 'block';
        elements.logoPreview.style.display = 'none';
      }
    }
    
    // 根据是否有二维码来显示或隐藏上传区域
    if (elements.qrcodeUploadArea && elements.qrcodePreview) {
      if (state.businessInfo.qrcode) {
        elements.qrcodeUploadArea.style.display = 'none';
        // 移除hidden类
        elements.qrcodePreview.classList.remove('hidden');
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodePreviewImg.src = state.businessInfo.qrcode;
      } else {
        elements.qrcodeUploadArea.style.display = 'block';
        // 添加hidden类
        elements.qrcodePreview.classList.add('hidden');
        elements.qrcodePreview.style.display = 'none';
      }
    }
    
    // 移除关闭动画类
    elements.businessInfoModal.classList.remove('closing');
    elements.businessInfoModal.querySelector('.modal').classList.remove('closing');
    
    // 显示弹窗 - 通过移除hidden类
    elements.businessInfoModal.classList.remove('hidden');
    // 同时设置display确保兼容性
    elements.businessInfoModal.style.display = 'flex';
    
    // 强制重绘以触发动画
    void elements.businessInfoModal.offsetWidth;
    
    // 如果是VIP用户，显示删除按钮（允许用户编辑）
    if (window.isVipActive && window.isVipActive()) {
      setTimeout(showDeleteButtonsForVip, 0);
    }
  }
  
  // 关闭商家信息编辑弹窗
  function closeBusinessInfoModal() {
    if (elements.businessInfoModal) {
      // 添加关闭动画类
      elements.businessInfoModal.classList.add('closing');
      elements.businessInfoModal.querySelector('.modal').classList.add('closing');
      
      // 延迟隐藏弹窗
      setTimeout(() => {
        elements.businessInfoModal.classList.add('hidden');
        elements.businessInfoModal.style.display = 'none';
        // 移除关闭动画类
        elements.businessInfoModal.classList.remove('closing');
        elements.businessInfoModal.querySelector('.modal').classList.remove('closing');
      }, 400); // 匹配动画时长
    }
  }
  
  // 保存商家信息
  function saveBusinessInfo() {
    if (!elements.businessNameInput || !elements.businessPromoTextInput) return;
    
    // 获取表单数据
    state.businessInfo.name = elements.businessNameInput.value.trim() || '点击编辑商家名称';
    state.businessInfo.promoText = elements.businessPromoTextInput.value.trim() || '点击编辑促销信息';
    
    // 从选中的色块获取颜色值（已通过点击事件更新到state中）
    
    // 保存到本地存储 - 修复：使用与loadBusinessInfoFromLocalStorage一致的键名
    localStorage.setItem('posterBusinessInfo', JSON.stringify(state.businessInfo));
    localStorage.setItem('textColor', state.textColor);
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 关闭弹窗
    closeBusinessInfoModal();
    
    // 添加成功提示动画效果
    showToast('商家信息保存成功');
  }

  // 重置文件输入框的函数 - 返回新创建的文件输入框
  function resetFileInput(fileInput) {
    // 移除旧的事件监听器，避免潜在的重复绑定
    if (fileInput.id === 'backgroundInput') {
      fileInput.removeEventListener('change', handleBackgroundUpload);
    } else if (fileInput.id === 'logoInput') {
      fileInput.removeEventListener('change', handleLogoUpload);
    } else if (fileInput.id === 'qrcodeInput') {
      fileInput.removeEventListener('change', handleQrcodeUpload);
    }
    
    const parent = fileInput.parentNode;
    
    // 创建全新的输入框元素，而不是克隆，避免任何潜在的状态残留
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.accept = fileInput.accept;
    newFileInput.id = fileInput.id;
    newFileInput.style.display = fileInput.style.display;
    
    // 替换原始元素
    parent.replaceChild(newFileInput, fileInput);
    
    // 更新elements对象中的引用
    if (fileInput.id === 'backgroundInput') {
      elements.backgroundInput = newFileInput;
    } else if (fileInput.id === 'logoInput') {
      elements.logoInput = newFileInput;
    } else if (fileInput.id === 'qrcodeInput') {
      elements.qrcodeInput = newFileInput;
    }
    
    // 返回新创建的文件输入框，以便直接使用它
    return newFileInput;
  }

  // 显示提示消息
  function showToast(message) {
    // 检查是否已存在toast元素
    let toast = document.querySelector('.toast-message');
    if (!toast) {
      // 创建toast元素
      toast = document.createElement('div');
      toast.className = 'toast-message fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-lg z-500';
      toast.style.transition = 'all 0.3s ease';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
    
    // 3秒后隐藏并从DOM中移除
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 20px)';
      
      // 动画完成后从DOM中完全移除
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
  
  // 检测是否有弹窗打开
  function isModalOpen() {
    if (!elements.templateModal) return false;
    return !elements.templateModal.classList.contains('hidden') && 
           elements.templateModal.style.display !== 'none';
  }
  
  // 处理背景图片上传
  function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    // 如果有弹窗打开，先关闭弹窗
    if (isModalOpen()) {
      closeTemplateModal();
    }
    
    // 读取文件
    const reader = new FileReader();
    reader.onload = function(e) {
      state.customBackground = e.target.result;
      
      // 恢复字体颜色为黑色
      state.textColor = '#000000';
      // 更新本地存储中的字体颜色
      localStorage.setItem('textColor', '#000000');
      
      // 更新背景显示
      updateTemplateDisplay();
      
      showToast('背景图片上传成功');
      
      // 移除了手动重置，因为我们现在使用resetFileInput函数来处理重置
      // 在下次点击上传按钮时会通过resetFileInput函数正确重置文件输入框
    };
    reader.readAsDataURL(file);
  }
  
  // 移除背景图片
  function removeBackground() {
    state.customBackground = null;
    
    // 恢复字体颜色为黑色
    state.textColor = '#000000';
    // 更新本地存储中的字体颜色
    localStorage.setItem('textColor', '#000000');
    
    // 更新背景显示
    updateTemplateDisplay();
    
    // 显示成功提示
    showToast('背景图片已移除');
  }
  
  // 处理Logo上传
  function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    // 检查文件大小
    if (file.size > 10 * 1024 * 1024) { // 10MB
      showToast('文件大小不能超过10MB');
      return;
    }
    
    // 读取文件
    const reader = new FileReader();
    reader.onload = function(e) {
      state.businessInfo.logo = e.target.result;
      
      // 立即保存到缓存
      saveBusinessInfoToLocalStorage();
      
      // 更新显示
      updateBusinessInfoDisplay();
      
      // 显示预览，隐藏上传区域
      if (elements.logoPreview && elements.logoPreviewImg && elements.logoUploadArea) {
        elements.logoPreviewImg.src = e.target.result;
        elements.logoPreview.style.display = 'block';
        elements.logoUploadArea.style.display = 'none';
      }
      
      // 强制显示恢复按钮（用户上传了新Logo）
      if (elements.restoreLogoBtnContainer) {
        elements.restoreLogoBtnContainer.classList.remove('hidden');
      }
      
      // 显示成功提示
      showToast('Logo上传成功');
      
      // 重置文件输入
      event.target.value = '';
    };
    reader.readAsDataURL(file);
  }
  
  // 移除Logo
  function removeLogo() {
    state.businessInfo.logo = null;
    
    // 立即保存到缓存
    saveBusinessInfoToLocalStorage();
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 隐藏预览，显示上传区域
    if (elements.logoPreview && elements.logoUploadArea) {
      elements.logoPreview.style.display = 'none';
      elements.logoUploadArea.style.display = 'block';
    }
    
    // 强制显示恢复按钮（用户点击了删除按钮）
    if (elements.restoreLogoBtnContainer) {
      elements.restoreLogoBtnContainer.classList.remove('hidden');
    }
    
    // 显示成功提示
    showToast('Logo已移除');
  }
  
  // 处理二维码上传
  function handleQrcodeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
      showToast('请上传有效的图片文件');
      return;
    }
    
    // 读取文件
    const reader = new FileReader();
    reader.onload = function(e) {
      state.businessInfo.qrcode = e.target.result;
      
      // 立即保存到缓存
      saveBusinessInfoToLocalStorage();
      
      // 更新显示
      updateBusinessInfoDisplay();
      
      // 显示预览，隐藏上传区域
      if (elements.qrcodePreview && elements.qrcodePreviewImg && elements.qrcodeUploadArea) {
        elements.qrcodePreviewImg.src = e.target.result;
        // 移除hidden类
        elements.qrcodePreview.classList.remove('hidden');
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodeUploadArea.style.display = 'none';
      }
      
      // 强制显示恢复按钮（用户上传了新二维码）
      if (elements.restoreQrcodeBtnContainer) {
        elements.restoreQrcodeBtnContainer.classList.remove('hidden');
      }
      
      // 显示成功提示
      showToast('二维码上传成功');
      
      // 重置文件输入
      event.target.value = '';
    };
    reader.readAsDataURL(file);
  }
  
  // 移除二维码
  function removeQrcode() {
    state.businessInfo.qrcode = null;
    
    // 立即保存到缓存
    saveBusinessInfoToLocalStorage();
    
    // 更新显示
    updateBusinessInfoDisplay();
    
    // 隐藏预览，显示上传区域
    if (elements.qrcodePreview && elements.qrcodeUploadArea) {
      // 添加hidden类
      elements.qrcodePreview.classList.add('hidden');
      elements.qrcodePreview.style.display = 'none';
      elements.qrcodeUploadArea.style.display = 'block';
    }
    
    // 强制显示恢复按钮（用户点击了删除按钮）
    if (elements.restoreQrcodeBtnContainer) {
      elements.restoreQrcodeBtnContainer.classList.remove('hidden');
    }
    
    // 显示成功提示
    showToast('二维码已移除');
  }
  
  // 更新文字颜色
  function updateTextColor(e) {
    state.textColor = e.target.value;
    
    // 更新文字颜色显示
    if (elements.posterBusinessName) {
      elements.posterBusinessName.style.color = state.textColor;
    }
    if (elements.posterPromoText) {
      elements.posterPromoText.style.color = state.textColor;
    }
  }
  
  // 更新背景透明度
  function updateBackgroundOpacity(e) {
    state.backgroundOpacity = parseFloat(e.target.value);
    
    // 更新背景透明度
    if (elements.posterBackground) {
      elements.posterBackground.style.opacity = state.backgroundOpacity;
    }
    
    // 更新透明度显示
    if (elements.bgOpacityValue) {
      elements.bgOpacityValue.textContent = `${Math.round(state.backgroundOpacity * 100)}%`;
    }
  }
  
  // 重置编辑器
  function resetEditor() {
    // 确认重置
    if (!confirm('确定要重置编辑器吗？所有自定义内容将会丢失。')) {
      return;
    }
    
    // 重置状态
    state.customBackground = null;
    state.backgroundOpacity = 1;
    state.textColor = '#000000';
    
    // 重置选择器
    if (elements.textColor) {
      elements.textColor.value = state.textColor;
    }
    if (elements.bgOpacity) {
      elements.bgOpacity.value = state.backgroundOpacity;
    }
    if (elements.bgOpacityValue) {
      elements.bgOpacityValue.textContent = '100%';
    }
    
    // 隐藏预览
    if (elements.logoPreview) {
      elements.logoPreview.style.display = 'none';
    }
    if (elements.qrcodePreview) {
      elements.qrcodePreview.style.display = 'none';
    }
    
    // 重新加载默认模板
    loadDefaultTemplate();
    
    // 更新商家信息显示
    updateBusinessInfoDisplay();
    
    // 显示成功提示
    showToast('编辑器已重置');
  }
  
  // 券码验证弹窗
  function showCouponModal() {
    // 创建弹窗HTML
    const modalHTML = `
      <div id="couponModal" class="modal-overlay" style="display: flex;">
        <div class="modal coupon-modal" style="max-width: 400px; transform-origin: center center;">
          <div class="modal-header fixed-header">
            <h2 class="modal-title">券码验证</h2>
            <button id="closeCouponModalBtn" class="modal-close">&times;</button>
          </div>
          <div class="modal-body scrollable-body">
            <div class="coupon-input-group">
              <label class="coupon-label">请输入4位券码</label>
              <div class="coupon-input-container">
                <input type="text" class="coupon-digit" maxlength="1" data-index="0" placeholder="•">
                <input type="text" class="coupon-digit" maxlength="1" data-index="1" placeholder="•">
                <input type="text" class="coupon-digit" maxlength="1" data-index="2" placeholder="•">
                <input type="text" class="coupon-digit" maxlength="1" data-index="3" placeholder="•">
              </div>
              <input type="text" id="couponCodeInput" class="coupon-input" maxlength="4" style="display: none;">
              <div id="couponMessage" class="coupon-message"></div>
            </div>
            <div class="coupon-actions">
              <button id="verifyCouponBtn" class="action-btn primary">验证券码</button>
              <button id="cancelCouponBtn" class="action-btn secondary">取消</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('couponModal');
    const closeBtn = document.getElementById('closeCouponModalBtn');
    const cancelBtn = document.getElementById('cancelCouponBtn');
    const verifyBtn = document.getElementById('verifyCouponBtn');
    const couponInput = document.getElementById('couponCodeInput');
    const couponMessage = document.getElementById('couponMessage');
    const digitInputs = document.querySelectorAll('.coupon-digit');
    const couponLabel = document.querySelector('.coupon-label');
    
    // 自动填充上次成功的券码
    const lastValidCoupon = window.getLastValidCoupon ? window.getLastValidCoupon() : null;
    if (lastValidCoupon && lastValidCoupon.length === 4) {
      for (let i = 0; i < 4; i++) {
        digitInputs[i].value = lastValidCoupon[i];
      }
      couponInput.value = lastValidCoupon;
      // 如果是上次成功的券码，更新标签和按钮文字
      updateLabelAndButtonText(lastValidCoupon);
    }
    
    // 处理数字输入框的输入逻辑
    function handleDigitInput(event, index) {
      const input = event.target;
      const value = input.value;
      
      // 只允许数字输入
      if (value && !/^\d$/.test(value)) {
        input.value = '';
        return;
      }
      
      // 自动跳转到下一个输入框
      if (value && index < 3) {
        digitInputs[index + 1].focus();
      }
      
      // 更新隐藏的输入框
      updateHiddenInput();
    }
    
    // 处理退格键
    function handleBackspace(event, index) {
      if (event.key === 'Backspace' && !event.target.value && index > 0) {
        digitInputs[index - 1].focus();
      }
    }
    
    // 更新隐藏的输入框值
    function updateHiddenInput() {
      const code = Array.from(digitInputs).map(input => input.value || '').join('');
      couponInput.value = code;
    }
    
    // 更新标签和按钮文字的函数
    function updateLabelAndButtonText(currentCode) {
      const lastValidCoupon = window.getLastValidCoupon ? window.getLastValidCoupon() : null;
      
      if (currentCode === lastValidCoupon && currentCode.length === 4) {
        // 如果是上次成功的券码
        couponLabel.textContent = '您上次验证通过的券码';
        verifyBtn.innerHTML = ' 生成海报';
      } else {
        // 恢复默认文字
        couponLabel.textContent = '请输入4位券码';
        verifyBtn.innerHTML = '验证券码';
      }
    }
    
    // 监听输入框变化
    function handleInputChange() {
      const currentCode = Array.from(digitInputs).map(input => input.value || '').join('');
      updateLabelAndButtonText(currentCode);
    }
    
    // 为每个数字输入框添加事件监听
    digitInputs.forEach((input, index) => {
      input.addEventListener('input', (event) => {
        handleDigitInput(event, index);
        handleInputChange();
      });
      input.addEventListener('keydown', (event) => handleBackspace(event, index));
      
      // 监听退格键和删除键
      input.addEventListener('keyup', (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          handleInputChange();
        }
      });
    });
    
    // 关闭弹窗函数
    function closeModal() {
      // 添加关闭动画类
      modal.classList.add('closing');
      modal.querySelector('.modal').classList.add('closing');
      
      // 延迟移除弹窗
      setTimeout(() => {
        modal.remove();
      }, 400); // 匹配动画时长
    }
    
    // 验证券码函数
    function verifyCoupon() {
      const code = couponInput.value.trim();
      
      if (!code) {
        couponMessage.textContent = '请输入券码';
        couponMessage.className = 'coupon-message error';
        return;
      }
      
      if (code.length !== 4 || !/^\d{4}$/.test(code)) {
        couponMessage.textContent = '券码必须是4位数字';
        couponMessage.className = 'coupon-message error';
        return;
      }
      
      // 调用券码验证函数
      if (window.validateCoupon) {
        const result = window.validateCoupon(code);
        
        if (result.valid) {
          couponMessage.textContent = result.message;
          couponMessage.className = 'coupon-message success';
          
          // 保存成功的券码
          if (window.saveLastValidCoupon) {
            window.saveLastValidCoupon(code);
          }
          
          // 延迟关闭弹窗并开始下载
          setTimeout(() => {
            closeModal();
            downloadPosterAfterVerification();
          }, 1500);
        } else {
          couponMessage.textContent = result.message;
          couponMessage.className = 'coupon-message error';
        }
      } else {
        couponMessage.textContent = '券码验证功能未加载，请刷新页面重试';
        couponMessage.className = 'coupon-message error';
      }
    }
    
    // 事件监听
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    verifyBtn.addEventListener('click', verifyCoupon);
    
    // 按回车键验证
    couponInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        verifyCoupon();
      }
    });
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // 自动聚焦输入框
    couponInput.focus();
  }
  
  // 券码验证通过后的下载
  async function downloadPosterAfterVerification() {
    if (!state.currentTemplate) {
      showToast('请先选择一个模板');
      return;
    }
    
    // 记录开始时间
    const startTime = Date.now();
    
    // 显示加载动画
    showLoadingAnimation();
    
    // 显示加载状态
    if (elements.downloadBtn) {
      elements.downloadBtn.disabled = true;
      elements.downloadBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 正在生成...';
    }
    
    try {
      // 转换为图片并下载，等待操作完成
      await convertToImageAndDownload();
    } catch (error) {
      console.error('下载海报过程中出错:', error);
      showToast('下载海报失败，请重试');
    } finally {
      // 计算已用时间
      const elapsedTime = Date.now() - startTime;
      const minDisplayTime = 3500; // 最少显示5秒
      
      // 如果生成时间少于3.5秒，等待剩余时间
      if (elapsedTime < minDisplayTime) {
        const remainingTime = minDisplayTime - elapsedTime;
        console.log(`海报生成完成，但需要继续显示加载动画 ${remainingTime}ms`);
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      // 隐藏加载动画
      hideLoadingAnimation();
      
      // 重置下载按钮状态
      if (elements.downloadBtn) {
        elements.downloadBtn.disabled = false;
        elements.downloadBtn.innerHTML = '<i class="fa fa-download"></i> 下载海报';
      }
    }
  }
  
  // 下载海报
  async function downloadPoster() {
    // 检查是否为VIP状态
    if (window.isVipActive && window.isVipActive()) {
      // VIP用户直接下载，无需券码验证
      await downloadPosterAfterVerification();
    } else {
      // 普通用户显示广告弹窗，8秒倒计时后可下载
      showAdModal();
    }
  }

  // 广告弹窗
  function showAdModal() {
    // 移除已存在的广告弹窗
    let adModal = document.getElementById('adModal');
    if (adModal) {
      adModal.remove();
    }

    // 创建广告弹窗
    adModal = document.createElement('div');
    adModal.id = 'adModal';
    adModal.className = 'ad-modal-overlay';

    adModal.innerHTML = `
      <div class="ad-modal">
        <!-- 关闭按钮 -->
        <button id="closeAdModalBtn" class="ad-modal-close">×</button>
        
        <!-- 广告位置 -->
        <div class="ad-container">
          <!-- 广告代码将在此处添加 -->
          <div style="text-align: center;">
            <i class="fa fa-ad"></i>
            <p>广告位置</p>
          </div>
        </div>
        
        <!-- 按钮容器 -->
        <div class="ad-buttons-container">
          <!-- 下载按钮 -->
          <button id="adDownloadBtn" class="ad-download-btn" disabled>
            （<span id="adCountdown" class="ad-countdown">15</span>秒后）下载海报
          </button>
          
          <!-- 定制VIP品牌账户按钮 -->
          <button id="customBrandBtn" class="ad-vip-btn">
            0秒等待，定制您的VIP品牌账号！
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(adModal);

    // 倒计时逻辑
    let countdown = 15;
    const countdownElement = document.getElementById('adCountdown');
    const downloadBtn = document.getElementById('adDownloadBtn');

    const timer = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;
      
      if (countdown <= 0) {
        clearInterval(timer);
        downloadBtn.disabled = false;
        // 更新按钮文字
        downloadBtn.innerHTML = '下载海报';
      }
    }, 1000);

    // 关闭按钮事件
    document.getElementById('closeAdModalBtn').addEventListener('click', () => {
      clearInterval(timer);
      adModal.remove();
    });

    // 下载按钮事件
    downloadBtn.addEventListener('click', async () => {
      clearInterval(timer);
      adModal.remove();
      await downloadPosterAfterVerification();
    });

    // 定制品牌账户按钮事件
    document.getElementById('customBrandBtn').addEventListener('click', () => {
      // 这里可以添加跳转到品牌定制页面的逻辑
      alert('定制品牌账户功能即将上线');
    });
  }
  
  // 转换为图片并下载 - 简化版：直接使用html2canvas对整个posterFrame进行截图
  async function convertToImageAndDownload() {
    // 获取元素
    if (!elements.posterFrame) {
      showToast('未找到海报元素');
      return;
    }
    
    // 提高分辨率，设置一个更高的缩放比例
    const scale = window.devicePixelRatio * 1.5 || 3;
    
    // 保存原始样式信息
    const originalBusinessNameTransform = elements.posterBusinessName ? elements.posterBusinessName.style.transform : '';
    const originalPromoTextTransform = elements.posterPromoText ? elements.posterPromoText.style.transform : '';
    const originalPromoTextPadding = elements.posterPromoText ? elements.posterPromoText.style.padding : '';
    
    // 查找并保存背景图片元素的原始样式和src
    const backgroundImageElement = document.getElementById('posterBackground') || null;
    const originalBackgroundImageStyle = backgroundImageElement ? { ...backgroundImageElement.style } : null;
    const originalBackgroundImageSrc = backgroundImageElement ? backgroundImageElement.src : '';
    let tempCanvasElement = null;
    
    // 恢复样式的函数
    function cleanupStyles() {
      // 恢复原始样式
      if (elements.posterBusinessName) {
        elements.posterBusinessName.style.transform = originalBusinessNameTransform;
      }
      if (elements.posterPromoText) {
        elements.posterPromoText.style.transform = originalPromoTextTransform;
        elements.posterPromoText.style.padding = originalPromoTextPadding;
      }
      // 恢复背景图片原始样式并移除临时canvas
      if (backgroundImageElement) {
        backgroundImageElement.style.display = '';
        if (originalBackgroundImageStyle) {
          Object.assign(backgroundImageElement.style, originalBackgroundImageStyle);
        }
      }
      if (tempCanvasElement && tempCanvasElement.parentNode) {
        tempCanvasElement.parentNode.removeChild(tempCanvasElement);
      }
    }
    
    // 执行html2canvas的函数
      function executeHtml2Canvas() {
        // 使用html2canvas配置参数，增加更多优化选项
        const options = {
          backgroundColor: null, // 透明背景
          scale: scale, // 高分辨率
          useCORS: true, // 允许跨域图片
          allowTaint: true, // 允许图片污染
          logging: false, // 禁用日志
          width: elements.posterFrame.offsetWidth,
          height: elements.posterFrame.offsetHeight,
          imageTimeout: 30000, // 增加图片加载超时时间
          removeContainer: false, // 保留容器
          letterRendering: true, // 启用字母渲染优化
          useRecursiveClone: true, // 使用递归克隆提高渲染质量
          preserveDrawingBuffer: true, // 保留绘图缓冲区
          disableWindowResize: true, // 禁用窗口调整大小的影响
          disableAutoScale: false // 允许自动缩放
        };
      
      // 使用html2canvas截图
      try {
        // 添加允许Taint选项，避免跨域问题导致的导出失败
        options.allowTaint = false;
        options.useCORS = true;
        
        return html2canvas(elements.posterFrame, options).then(canvas => {
          try {
            // 创建下载链接
            const link = document.createElement('a');
            
            // 生成最高质量的PNG图像，确保清晰度
            // 使用try-catch捕获可能的toDataURL错误
            let imageUrl;
            try {
              imageUrl = canvas.toDataURL('image/png', 1.0);
            } catch (toDataUrlError) {
              console.error('生成图像URL时出错:', toDataUrlError);
              // 如果toDataURL失败，创建一个简单的纯色图像作为替代
              const fallbackCanvas = document.createElement('canvas');
              fallbackCanvas.width = 600;
              fallbackCanvas.height = 900;
              const ctx = fallbackCanvas.getContext('2d');
              ctx.fillStyle = '#4a90e2';
              ctx.fillRect(0, 0, 600, 900);
              ctx.fillStyle = '#ffffff';
              ctx.font = '24px Arial';
              ctx.textAlign = 'center';
              ctx.fillText('海报导出', 300, 450);
              imageUrl = fallbackCanvas.toDataURL('image/png');
            }
            
            link.href = imageUrl;
            
            // 设置文件名 - 使用模板名称和时间
            const templateName = state.currentTemplate ? state.currentTemplate.name.replace(/[\\/:*?"<>|]/g, '_') : 'poster';
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timestamp = `${year}${month}${day}-${hours}${minutes}`;
            link.download = `${templateName}${timestamp}.png`;
          
            // 触发下载
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
              document.body.removeChild(link);
            }, 100);
            
            // 显示成功提示
            showToast('海报生成成功！');
          } catch (downloadError) {
            console.error('创建下载链接时出错:', downloadError);
            showToast('海报生成成功但下载失败，请手动截图');
          }
        }).catch(error => {
          console.error('生成海报时出错:', error);
          showToast('生成海报失败，已使用替代方案');
          
          // 如果html2canvas完全失败，创建一个简单的替代图像
          const fallbackCanvas = document.createElement('canvas');
          fallbackCanvas.width = 600;
          fallbackCanvas.height = 900;
          const ctx = fallbackCanvas.getContext('2d');
          ctx.fillStyle = '#f0f0f0';
          ctx.fillRect(0, 0, 600, 900);
          ctx.fillStyle = '#333333';
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('海报预览', 300, 450);
          
          const link = document.createElement('a');
          link.href = fallbackCanvas.toDataURL('image/png');
          
          // 设置文件名 - 使用模板名称和时间（备用方案）
          const templateName = state.currentTemplate ? state.currentTemplate.name.replace(/[\\/:*?"<>|]/g, '_') : 'poster';
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const timestamp = `${year}${month}${day}-${hours}${minutes}`;
          link.download = `${templateName}${timestamp}_fallback.png`;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
          }, 100);
          
          return Promise.resolve(); // 不抛出错误，让finally执行
        }).finally(() => {
          try {
            cleanupStyles();
          } catch (cleanupError) {
            console.error('清理样式时出错:', cleanupError);
          }
        });
      } catch (e) {
        console.error('准备海报生成时出错:', e);
        showToast('海报生成失败，请重试');
        try {
          cleanupStyles();
        } catch (cleanupError) {
          console.error('清理样式时出错:', cleanupError);
        }
        return Promise.reject(e);
      }
    }
    
    try {
      // 临时调整商家名称位置和促销信息的padding
      if (elements.posterBusinessName) {
        // 移除向上位移，保持水平居中对齐
        elements.posterBusinessName.style.transform = `none`;
        elements.posterBusinessName.style.fontSize = `12px`;
      }
      if (elements.posterPromoText) {
        // 减少padding-bottom，避免下方出现空白
        elements.posterPromoText.style.padding = `5px 2px 5px 8px`;
         elements.posterPromoText.style.lineHeight = `15px`;
         elements.posterPromoText.style.fontSize = `11px`;
      }
      
      // 保存logo和二维码的原始样式
      const logoImgElement = elements.posterLogoImg;
      const qrcodeImgElement = elements.posterQrcodeImg;
      const originalLogoStyle = logoImgElement ? { ...logoImgElement.style } : null;
      const originalQrcodeStyle = qrcodeImgElement ? { ...qrcodeImgElement.style } : null;
      let tempLogoCanvas = null;
      let tempQrcodeCanvas = null;
      
      // 辅助函数：创建canvas来正确显示图片
      async function createProperlyScaledCanvas(imgElement) {
        if (!imgElement || !imgElement.src) return null;
        
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = function() {
            try {
              // 创建临时canvas
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              // 获取元素容器的尺寸
              const container = imgElement.parentElement;
              const containerWidth = container.offsetWidth;
              const containerHeight = container.offsetHeight;
              
              // 提高临时canvas分辨率
              canvas.width = containerWidth * scale;
              canvas.height = containerHeight * scale;
              // 设置canvas的CSS尺寸与容器相同
              canvas.style.width = containerWidth + 'px';
              canvas.style.height = containerHeight + 'px';
              // 缩放上下文以匹配高分辨率
              ctx.scale(scale, scale);
              
              // 检查是否为二维码图片
              const isQrcode = imgElement.id === 'posterQrcodeImg';
              
              let drawWidth, drawHeight, offsetX, offsetY;
              
              if (isQrcode) {
                // 对于二维码，使用object-fit:contain模式，保持完整显示，并添加额外的边距
                const imgRatio = img.width / img.height;
                
                // 添加内边距（增加到5px以确保二维码与容器之间有足够空间）
                const padding = 5;
                const availableWidth = containerWidth - (padding * 2);
                const availableHeight = containerHeight - (padding * 2);
                
                if (imgRatio > 1) {
                  // 图片更宽，按可用宽度缩放
                  drawWidth = availableWidth;
                  drawHeight = img.height * (availableWidth / img.width);
                  offsetX = padding;
                  offsetY = padding + (availableHeight - drawHeight) / 2;
                } else {
                  // 图片更高或等比例，按可用高度缩放
                  drawHeight = availableHeight;
                  drawWidth = img.width * (availableHeight / img.height);
                  offsetX = padding + (availableWidth - drawWidth) / 2;
                  offsetY = padding;
                }
                
                // 绘制白色背景（模拟CSS中的background-color: white）
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, containerWidth, containerHeight);
              } else {
                // 对于其他图片（如Logo），使用object-fit:cover模式
                const imgRatio = img.width / img.height;
                const containerRatio = containerWidth / containerHeight;
                
                if (imgRatio > containerRatio) {
                  // 图片更宽，按高度缩放，裁剪宽度
                  drawHeight = containerHeight;
                  drawWidth = img.width * (containerHeight / img.height);
                  offsetX = (containerWidth - drawWidth) / 2;
                  offsetY = 0;
                } else {
                  // 图片更高，按宽度缩放，裁剪高度
                  drawWidth = containerWidth;
                  drawHeight = img.height * (containerWidth / img.width);
                  offsetX = 0;
                  offsetY = (containerHeight - drawHeight) / 2;
                }
              }
              
              // 绘制图片
              ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
              
              // 隐藏原始图片，显示canvas
              imgElement.style.display = 'none';
              canvas.style.position = 'absolute';
              canvas.style.top = '0';
              canvas.style.left = '0';
              canvas.style.width = '100%';
              canvas.style.height = '100%';
              container.insertBefore(canvas, imgElement);
              
              resolve(canvas);
            } catch (error) {
              reject(error);
            }
          };
          
          img.onerror = function() {
            reject(new Error('无法加载图片'));
          };
          
          img.src = imgElement.src;
        });
      }
      
      // 处理背景图片
      if (backgroundImageElement && backgroundImageElement.src) {
        // 创建一个新的Image对象来加载背景图片
        const img = new Image();
        
        // 使用Promise来处理图片加载
        await new Promise((resolve, reject) => {
          // 检测当前页面协议
          const currentProtocol = window.location.protocol;
          const isUsingTemplate = !state.customBackground && state.currentTemplate;
          
          // 根据协议和是否使用模板设置不同的加载策略
          if (currentProtocol === 'file:') {
            // file://协议处理
            console.log('检测到file://协议，处理背景图片...');
            
            // 移除crossOrigin设置，因为本地文件不需要跨域处理
            img.crossOrigin = null;
            
            img.onload = function() {
              try {
                console.log('成功加载背景图片');
                // 创建临时canvas元素
                tempCanvasElement = document.createElement('canvas');
                const ctx = tempCanvasElement.getContext('2d');
                
                // 获取海报框架尺寸
                const posterWidth = elements.posterFrame.offsetWidth;
                const posterHeight = elements.posterFrame.offsetHeight;
                
                // 提高临时canvas分辨率
                tempCanvasElement.width = posterWidth * scale;
                tempCanvasElement.height = posterHeight * scale;
                // 设置canvas的CSS尺寸与容器相同
                tempCanvasElement.style.width = posterWidth + 'px';
                tempCanvasElement.style.height = posterHeight + 'px';
                // 缩放上下文以匹配高分辨率
                ctx.scale(scale, scale);
                
                // 计算object-fit:cover的裁剪参数
                const imgRatio = img.width / img.height;
                const posterRatio = posterWidth / posterHeight;
                
                let drawWidth, drawHeight, offsetX, offsetY;
                
                if (imgRatio > posterRatio) {
                  // 图片更宽，按高度缩放，裁剪宽度
                  drawHeight = posterHeight;
                  drawWidth = img.width * (posterHeight / img.height);
                  offsetX = (posterWidth - drawWidth) / 2;
                  offsetY = 0;
                } else {
                  // 图片更高，按宽度缩放，裁剪高度
                  drawWidth = posterWidth;
                  drawHeight = img.height * (posterWidth / img.width);
                  offsetX = 0;
                  offsetY = (posterHeight - drawHeight) / 2;
                }
                
                // 绘制图片（实现object-fit:cover效果）
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                
                // 隐藏原始图片，显示canvas
                backgroundImageElement.style.display = 'none';
                tempCanvasElement.style.position = 'absolute';
                tempCanvasElement.style.top = '0';
                tempCanvasElement.style.left = '0';
                tempCanvasElement.style.width = '100%';
                tempCanvasElement.style.height = '100%';
                backgroundImageElement.parentNode.insertBefore(tempCanvasElement, backgroundImageElement);
                
                resolve();
              } catch (error) {
                console.error('绘制背景图片时出错:', error);
                // 出错时尝试备用方案
                createFallbackBackground();
                resolve();
              }
            };
            
            img.onerror = function() {
              console.warn('无法直接加载背景图片，准备创建备用背景...');
              createFallbackBackground();
              resolve();
            };
            
            // 对于模板背景，确保使用正确的本地路径
            if (isUsingTemplate && state.currentTemplate && state.currentTemplate.image) {
              // 对于模板背景，直接使用模板的image路径
              console.log('使用模板背景图片路径:', state.currentTemplate.image);
              img.src = state.currentTemplate.image;
            } else {
              // 对于自定义背景或其他情况，使用当前背景图片的src
              img.src = backgroundImageElement.src;
            }
          } else {
            // 对于http/https协议，设置跨域属性
            img.crossOrigin = 'anonymous';
            
            img.onload = function() {
              try {
                // 创建临时canvas元素
                tempCanvasElement = document.createElement('canvas');
                const ctx = tempCanvasElement.getContext('2d');
                
                // 获取海报框架尺寸
                const posterWidth = elements.posterFrame.offsetWidth;
                const posterHeight = elements.posterFrame.offsetHeight;
                
                // 提高临时canvas分辨率
                tempCanvasElement.width = posterWidth * scale;
                tempCanvasElement.height = posterHeight * scale;
                // 设置canvas的CSS尺寸与容器相同
                tempCanvasElement.style.width = posterWidth + 'px';
                tempCanvasElement.style.height = posterHeight + 'px';
                // 缩放上下文以匹配高分辨率
                ctx.scale(scale, scale);
                
                // 计算object-fit:cover的裁剪参数
                const imgRatio = img.width / img.height;
                const posterRatio = posterWidth / posterHeight;
                
                let drawWidth, drawHeight, offsetX, offsetY;
                
                if (imgRatio > posterRatio) {
                  // 图片更宽，按高度缩放，裁剪宽度
                  drawHeight = posterHeight;
                  drawWidth = img.width * (posterHeight / img.height);
                  offsetX = (posterWidth - drawWidth) / 2;
                  offsetY = 0;
                } else {
                  // 图片更高，按宽度缩放，裁剪高度
                  drawWidth = posterWidth;
                  drawHeight = img.height * (posterWidth / img.width);
                  offsetX = 0;
                  offsetY = (posterHeight - drawHeight) / 2;
                }
                
                // 绘制图片（实现object-fit:cover效果）
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                
                // 隐藏原始图片，显示canvas
                backgroundImageElement.style.display = 'none';
                tempCanvasElement.style.position = 'absolute';
                tempCanvasElement.style.top = '0';
                tempCanvasElement.style.left = '0';
                tempCanvasElement.style.width = '100%';
                tempCanvasElement.style.height = '100%';
                backgroundImageElement.parentNode.insertBefore(tempCanvasElement, backgroundImageElement);
                
                resolve();
              } catch (error) {
                reject(error);
              }
            };
            
            img.onerror = function() {
              console.warn('无法直接加载背景图片，尝试使用纯色背景...');
              try {
                // 创建一个新的canvas来绘制背景色，作为替代方案
                const fallbackCanvas = document.createElement('canvas');
                fallbackCanvas.width = elements.posterFrame.offsetWidth;
                fallbackCanvas.height = elements.posterFrame.offsetHeight;
                const ctx = fallbackCanvas.getContext('2d');
                ctx.fillStyle = '#f0f0f0'; // 默认灰色背景
                ctx.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
                
                // 隐藏原始图片，显示canvas
                backgroundImageElement.style.display = 'none';
                fallbackCanvas.style.position = 'absolute';
                fallbackCanvas.style.top = '0';
                fallbackCanvas.style.left = '0';
                fallbackCanvas.style.width = '100%';
                fallbackCanvas.style.height = '100%';
                backgroundImageElement.parentNode.insertBefore(fallbackCanvas, backgroundImageElement);
                tempCanvasElement = fallbackCanvas;
                
                resolve(); // 即使图片加载失败，也继续处理，使用纯色背景
              } catch (e) {
                reject(new Error('无法加载背景图片，也无法创建替代背景'));
              }
            };
            
            img.src = backgroundImageElement.src;
          }
          
          // 创建备用背景的函数
          function createFallbackBackground() {
            try {
              // 直接创建新的canvas作为背景
              const fallbackCanvas = document.createElement('canvas');
              // 获取海报框架尺寸
              const posterWidth = elements.posterFrame.offsetWidth;
              const posterHeight = elements.posterFrame.offsetHeight;
              fallbackCanvas.width = posterWidth;
              fallbackCanvas.height = posterHeight;
              fallbackCanvas.id = 'tempBackgroundCanvas';
              
              // 获取canvas上下文
              const tempCtx = fallbackCanvas.getContext('2d');
              if (tempCtx) {
                // 对于模板，使用不同的背景颜色以示区别
                const bgColor = isUsingTemplate ? '#4a90e2' : '#f0f0f0';
                tempCtx.fillStyle = bgColor; // 使用蓝色或灰色背景
                tempCtx.fillRect(0, 0, posterWidth, posterHeight);
                
                try {
                  // 添加一些文字说明
                  tempCtx.fillStyle = '#ffffff';
                  tempCtx.font = '24px Arial';
                  tempCtx.textAlign = 'center';
                  tempCtx.fillText(isUsingTemplate ? '模板背景' : '海报背景', posterWidth / 2, posterHeight / 2);
                } catch (textError) {
                  console.warn('添加文字失败，但背景已创建');
                }
              }
            
              // 将fallback canvas插入到DOM中，替换原背景图
              if (backgroundImageElement && backgroundImageElement.parentNode) {
                // 隐藏原始背景图
                backgroundImageElement.style.display = 'none';
                // 插入新的canvas
                backgroundImageElement.parentNode.insertBefore(fallbackCanvas, backgroundImageElement);
                // 保存引用以便后续清理
                tempCanvasElement = fallbackCanvas;
              }
            } catch (e) {
              console.error('创建替代背景时出错:', e);
            }
          }
        });
      }
      
      // 处理Logo图片
      if (logoImgElement && logoImgElement.src) {
        tempLogoCanvas = await createProperlyScaledCanvas(logoImgElement);
      }
      
      // 处理二维码图片
      if (qrcodeImgElement && qrcodeImgElement.src) {
        tempQrcodeCanvas = await createProperlyScaledCanvas(qrcodeImgElement);
      }
      
      // 更新cleanupStyles函数以包含logo和二维码的清理
      const originalCleanupStyles = cleanupStyles;
      cleanupStyles = function() {
        try {
          // 调用原始清理函数
          if (typeof originalCleanupStyles === 'function') {
            originalCleanupStyles();
          }
          
          // 移除临时创建的背景canvas
          const tempCanvas = document.getElementById('tempBackgroundCanvas');
          if (tempCanvas && tempCanvas.parentNode) {
            tempCanvas.parentNode.removeChild(tempCanvas);
          }
          
          // 恢复logo原始样式并移除临时canvas
          if (logoImgElement) {
            logoImgElement.style.display = '';
            // 安全地恢复样式，避免Object.assign引起的错误
            if (originalLogoStyle && typeof originalLogoStyle === 'object') {
              for (const prop in originalLogoStyle) {
                if (originalLogoStyle.hasOwnProperty(prop) && typeof prop === 'string') {
                  logoImgElement.style[prop] = originalLogoStyle[prop];
                }
              }
            }
          }
          if (tempLogoCanvas && tempLogoCanvas.parentNode) {
            tempLogoCanvas.parentNode.removeChild(tempLogoCanvas);
          }
          
          // 恢复二维码原始样式并移除临时canvas
          if (qrcodeImgElement) {
            qrcodeImgElement.style.display = '';
            if (originalQrcodeStyle && typeof originalQrcodeStyle === 'object') {
              for (const prop in originalQrcodeStyle) {
                if (originalQrcodeStyle.hasOwnProperty(prop) && typeof prop === 'string') {
                  qrcodeImgElement.style[prop] = originalQrcodeStyle[prop];
                }
              }
            }
          }
          if (tempQrcodeCanvas && tempQrcodeCanvas.parentNode) {
            tempQrcodeCanvas.parentNode.removeChild(tempQrcodeCanvas);
          }
        } catch (e) {
          console.error('清理样式时出错:', e);
        }
      };
      
      // 执行html2canvas
      await executeHtml2Canvas();
    } catch (error) {
      console.error('处理海报生成时出错:', error);
      showToast('生成海报失败，请重试');
      
      // 确保恢复原始样式
      cleanupStyles();
      throw error; // 重新抛出错误，让调用者知道操作失败
    }
  }
  
  // 移除复杂的辅助函数，只保留必要的功能
  
  // 辅助函数：防抖
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  // 在页面卸载时清理事件监听器，防止内存泄漏
    window.addEventListener('beforeunload', function() {
      // 清理全局事件监听器
      if (elements.downloadBtn) {
        elements.downloadBtn.removeEventListener('click', downloadPoster);
      }
      // 其他需要清理的事件监听器可以在这里添加
    });
  
  // 辅助函数：节流
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const context = this;
      const args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // 确保在DOM完全加载后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeEditor();
    });
  } else {
    initializeEditor();
  }
  
  // 导出全局调试器对象
  window.editorDebugger = {
    getCurrentTemplate: function() {
      return state.currentTemplate;
    },
    getBusinessInfo: function() {
      return state.businessInfo;
    },
    resetEditor: function() {
      resetEditor();
    }
  };
  
  console.log('海报编辑器加载完成，调试器已导出');
});

// VIP相关功能
function checkVipStatus() {
  // 检查URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const vipParam = urlParams.get('vip');
  
  if (vipParam) {
    console.log('检测到VIP参数:', vipParam);
    
    // 验证VIP参数
    const user = window.vipData && window.vipData.users ? window.vipData.users[vipParam] : null;
    if (user && window.isVipActive && window.isVipActive()) {
      // 保存VIP状态
      window.saveVipLogin(user);
      
      // 显示VIP状态栏
      showVipStatusBar(user);
      
      // 设置固定商家信息
      setVipFixedInfo();
      
      // 更新恢复按钮显示状态
      checkAndShowRestoreButtons();
    }
  } else if (window.isVipActive && window.isVipActive()) {
    // 通过localStorage检查VIP状态
    const user = window.getCurrentVipInfo ? window.getCurrentVipInfo() : null;
    if (user) {
      showVipStatusBar(user);
      setVipFixedInfo();
      
      // 更新恢复按钮显示状态
      checkAndShowRestoreButtons();
    }
  } else {
    // 非VIP用户，隐藏恢复按钮
    checkAndShowRestoreButtons();
  }
}

// 显示VIP状态栏（隐藏状态栏，通过按钮样式显示VIP状态）
function showVipStatusBar(user) {
  const vipStatusBar = document.getElementById('vipStatusBar');
  const vipValidUntilDate = document.getElementById('vipValidUntilDate');
  
  if (vipStatusBar && vipValidUntilDate) {
    // 隐藏VIP状态栏，避免占据空间
    vipStatusBar.classList.add('hidden');
    vipValidUntilDate.textContent = user.validUntil;
    document.body.classList.add('vip-active');
    
    // 更新商家信息按钮为VIP样式
    updateBusinessInfoButtonForVip();
    
    console.log('VIP状态已激活，有效期至:', user.validUntil);
  }
}

// 设置VIP固定商家信息
function setVipFixedInfo() {
  const fixedInfo = window.getVipFixedInfo ? window.getVipFixedInfo() : null;
  
  if (!fixedInfo) return;
  
  // 设置固定商家名称（允许在名称后添加文字）
  const businessNameInput = document.getElementById('business-name');
  if (businessNameInput) {
    // 保存原始名称，用于后续添加后缀
    const originalName = fixedInfo.name;
    businessNameInput.value = originalName;
    
    // 允许编辑，但限制只能添加后缀
    businessNameInput.disabled = false;
    businessNameInput.title = 'VIP用户：可在商家名称后添加文字（如：-厦门分公司）';
    
    // 监听输入变化，限制编辑范围
    businessNameInput.addEventListener('input', function() {
      const currentValue = this.value;
      
      // 如果用户删除了原始名称，自动恢复
      if (!currentValue.startsWith(originalName)) {
        this.value = originalName + (currentValue.replace(originalName, '') || '');
      }
    });
    
    // 隐藏商家名称输入框的清除按钮
    hideClearButtonsForVip();
  }
  
  // 设置固定商家名称显示
  const posterBusinessName = document.getElementById('posterBusinessName');
  if (posterBusinessName) {
    posterBusinessName.textContent = fixedInfo.name;
  }
  
  // 设置固定logo（如果有的话）
  if (fixedInfo.logo) {
    const businessLogoImg = document.getElementById('businessLogoImg');
    const businessLogoPlaceholder = document.getElementById('businessLogoPlaceholder');
    
    if (businessLogoImg && businessLogoPlaceholder) {
      businessLogoImg.src = fixedInfo.logo;
      businessLogoImg.style.display = 'block';
      businessLogoPlaceholder.style.display = 'none';
      
      // 隐藏Logo上传区域
      const logoUploadArea = document.getElementById('logoUploadArea');
      if (logoUploadArea) {
        logoUploadArea.style.display = 'none';
      }
      
      // 隐藏删除按钮
      const removeLogoBtn = document.getElementById('removeLogoBtn');
      if (removeLogoBtn) {
        removeLogoBtn.style.display = 'none';
      }
    }
  }
  
  // 清空二维码，等待用户上传
  const qrcodePreview = document.getElementById('qrcodePreview');
  const qrcodeUploadArea = document.getElementById('qrcodeUploadArea');
  if (qrcodePreview && qrcodeUploadArea) {
    qrcodePreview.style.display = 'none';
    qrcodeUploadArea.style.display = 'block';
  }
  
  console.log('VIP固定商家信息已设置');
}

// 隐藏VIP用户的清除按钮
function hideClearButtonsForVip() {
  // 隐藏所有清除按钮
  const clearButtons = document.querySelectorAll('.clear-button');
  clearButtons.forEach(button => {
    button.style.display = 'none';
  });
  
  // 隐藏Logo删除按钮
  const removeLogoBtn = document.getElementById('removeLogoBtn');
  if (removeLogoBtn) {
    removeLogoBtn.style.display = 'none';
  }
  
  // 隐藏二维码删除按钮
  const removeQrcodeBtn = document.getElementById('removeQrcodeBtn');
  if (removeQrcodeBtn) {
    removeQrcodeBtn.style.display = 'none';
  }
}

// 为VIP用户显示删除按钮（允许编辑）
function showDeleteButtonsForVip() {
  // 显示Logo删除按钮
  const removeLogoBtn = document.getElementById('removeLogoBtn');
  if (removeLogoBtn) {
    removeLogoBtn.style.display = 'block';
  }
  
  // 显示二维码删除按钮
  const removeQrcodeBtn = document.getElementById('removeQrcodeBtn');
  if (removeQrcodeBtn) {
    removeQrcodeBtn.style.display = 'block';
  }
  
  // 检查并显示恢复按钮
  checkAndShowRestoreButtons();
}

// 更新商家信息按钮为VIP样式
function updateBusinessInfoButtonForVip() {
  const editBusinessInfoBtn = document.getElementById('editBusinessInfoBtn');
  if (editBusinessInfoBtn) {
    // 添加VIP样式类
    editBusinessInfoBtn.classList.add('vip-button');
    
    // 更新图标为钻石图标
    const icon = editBusinessInfoBtn.querySelector('i');
    if (icon) {
      icon.className = 'fa fa-diamond';
    }
    
    // 更新文字
    const textSpan = editBusinessInfoBtn.querySelector('span');
    if (textSpan) {
      textSpan.textContent = '商家信息';
    }
    
    // 添加VIP提示
    editBusinessInfoBtn.title = 'VIP用户：商家名称和Logo固定，可在名称后添加文字';
  }
}

  // 恢复原始Logo
  function restoreOriginalLogo() {
    const vipInfo = window.getVipFixedInfo();
    if (vipInfo && vipInfo.logo) {
      state.businessInfo.logo = vipInfo.logo;
      
      // 立即保存到缓存 - 使用直接保存方式
      try {
        if (window.isVipActive && window.isVipActive()) {
          // VIP用户保存到VIP专属缓存
          const vipId = localStorage.getItem('vipId');
          if (vipId) {
            const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
            localStorage.setItem(vipBusinessInfoKey, JSON.stringify(state.businessInfo));
          }
        } else {
          // 普通用户保存到普通缓存
          localStorage.setItem('posterBusinessInfo', JSON.stringify(state.businessInfo));
        }
      } catch (error) {
        console.error('保存失败:', error);
      }
      
      // 更新显示 - 直接更新DOM元素
      updateDisplayForRestore();
      
      // 显示预览，隐藏上传区域
      if (elements.logoPreview && elements.logoPreviewImg && elements.logoUploadArea) {
        elements.logoPreviewImg.src = vipInfo.logo;
        elements.logoPreview.style.display = 'block';
        elements.logoUploadArea.style.display = 'none';
      }
      
      // 显示成功提示
      showToast('已恢复原始Logo');
    }
  }

  // 恢复原始二维码
  function restoreOriginalQrcode() {
    const vipInfo = window.getVipFixedInfo();
    if (vipInfo && vipInfo.qrcode) {
      state.businessInfo.qrcode = vipInfo.qrcode;
      
      // 立即保存到缓存 - 使用直接保存方式
      try {
        if (window.isVipActive && window.isVipActive()) {
          // VIP用户保存到VIP专属缓存
          const vipId = localStorage.getItem('vipId');
          if (vipId) {
            const vipBusinessInfoKey = `vipBusinessInfo_${vipId}`;
            localStorage.setItem(vipBusinessInfoKey, JSON.stringify(state.businessInfo));
          }
        } else {
          // 普通用户保存到普通缓存
          localStorage.setItem('posterBusinessInfo', JSON.stringify(state.businessInfo));
        }
      } catch (error) {
        console.error('保存失败:', error);
      }
      
      // 更新显示 - 直接更新DOM元素
      updateDisplayForRestore();
      
      // 显示预览，隐藏上传区域
      if (elements.qrcodePreview && elements.qrcodePreviewImg && elements.qrcodeUploadArea) {
        elements.qrcodePreviewImg.src = vipInfo.qrcode;
        elements.qrcodePreview.classList.remove('hidden');
        elements.qrcodePreview.style.display = 'block';
        elements.qrcodeUploadArea.style.display = 'none';
      }
      
      // 显示成功提示
      showToast('已恢复原始二维码');
    }
  }

  // 检查并显示恢复按钮（只有VIP用户登录时才显示恢复按钮）
  function checkAndShowRestoreButtons() {
    // VIP用户登录时显示恢复按钮
    if (window.isVipActive && window.isVipActive()) {
      const vipInfo = window.getVipFixedInfo();
      if (!vipInfo) {
        return;
      }
      
      // VIP用户显示Logo恢复按钮（如果VIP有预设Logo）
      if (elements.restoreLogoBtnContainer) {
        if (vipInfo.logo) {
          elements.restoreLogoBtnContainer.classList.remove('hidden');
        } else {
          elements.restoreLogoBtnContainer.classList.add('hidden');
        }
      }
      
      // VIP用户显示二维码恢复按钮（如果VIP有预设二维码）
      if (elements.restoreQrcodeBtnContainer) {
        if (vipInfo.qrcode) {
          elements.restoreQrcodeBtnContainer.classList.remove('hidden');
        } else {
          elements.restoreQrcodeBtnContainer.classList.add('hidden');
        }
      }
    } else {
      // 非VIP用户（券码用户）隐藏恢复按钮
      if (elements.restoreLogoBtnContainer) {
        elements.restoreLogoBtnContainer.classList.add('hidden');
      }
      if (elements.restoreQrcodeBtnContainer) {
        elements.restoreQrcodeBtnContainer.classList.add('hidden');
      }
    }
  }

  // 为恢复功能专门创建的显示更新函数
  function updateDisplayForRestore() {
    // 更新商家名称
    if (elements.posterBusinessName && state.businessInfo.name) {
      elements.posterBusinessName.textContent = state.businessInfo.name;
      elements.posterBusinessName.style.color = state.textColor || '#000000';
    }
    
    // 更新商家Logo
    if (elements.posterLogoImg && elements.logoPlaceholder) {
      if (state.businessInfo.logo) {
        elements.posterLogoImg.src = state.businessInfo.logo;
        elements.posterLogoImg.style.display = 'block';
        elements.logoPlaceholder.style.display = 'none';
      } else {
        elements.posterLogoImg.style.display = 'none';
        elements.logoPlaceholder.style.display = 'block';
      }
    }
    
    // 更新二维码
    if (elements.posterQrcodeImg && elements.qrcodePlaceholder) {
      if (state.businessInfo.qrcode) {
        elements.posterQrcodeImg.src = state.businessInfo.qrcode;
        elements.posterQrcodeImg.style.display = 'block';
        elements.qrcodePlaceholder.style.display = 'none';
      } else {
        elements.posterQrcodeImg.style.display = 'none';
        elements.qrcodePlaceholder.style.display = 'block';
      }
    }
    
    // 更新促销信息
    if (elements.posterPromoText && state.businessInfo.promoText) {
      elements.posterPromoText.innerHTML = state.businessInfo.promoText.replace(/\n/g, '<br>');
      elements.posterPromoText.style.color = state.textColor;
    }
  }

  // 在编辑器模板选择弹窗中添加自定义背景入口
  function addCustomBackgroundEntryToModal() {
    if (!elements.templateGrid) return;
    
    // 创建自定义背景入口项
    const customItem = document.createElement('div');
    customItem.className = 'template-item custom-background-entry';
    customItem.dataset.templateId = 'custom-background';
    
    // 创建图片容器
    const templateImgContainer = document.createElement('div');
    templateImgContainer.className = 'template-thumbnail-container';
    
    // 创建自定义背景图标
    const customIcon = document.createElement('div');
    customIcon.className = 'custom-background-icon';
    customIcon.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
    
    // 创建圆形勾选按钮
    const checkButton = document.createElement('div');
    checkButton.className = 'template-check-button';
    checkButton.innerHTML = '<i class="fa fa-check"></i>';
    
    // 为勾选按钮添加点击事件
    checkButton.addEventListener('click', function(e) {
      e.stopPropagation(); // 阻止事件冒泡
      console.log('点击自定义背景入口');
      
      // 移除所有勾选按钮的选中状态
      document.querySelectorAll('.template-check-button').forEach(btn => {
        btn.classList.remove('checked');
      });
      
      // 添加当前按钮的选中状态
      this.classList.add('checked');
      
      // 设置自定义背景状态
      state.customBackground = true;
      state.currentTemplate = null;
      
      // 模拟点击上传背景按钮，触发文件选择对话框
      setTimeout(() => {
        if (elements.uploadBackgroundBtn) {
          elements.uploadBackgroundBtn.click();
        }
      }, 100);
    });
    
    // 为自定义背景项添加点击事件
    customItem.addEventListener('click', function() {
      // 移除所有勾选按钮的选中状态
      document.querySelectorAll('.template-check-button').forEach(btn => {
        btn.classList.remove('checked');
      });
      
      // 添加当前按钮的选中状态
      checkButton.classList.add('checked');
      
      // 设置自定义背景状态
      state.customBackground = true;
      state.currentTemplate = null;
      
      // 模拟点击上传背景按钮，触发文件选择对话框
      setTimeout(() => {
        if (elements.uploadBackgroundBtn) {
          elements.uploadBackgroundBtn.click();
        }
      }, 100);
    });
    
    // 创建模板名称
    const templateName = document.createElement('div');
    templateName.className = 'template-name';
    templateName.textContent = '自定义背景';
    
    // 组合自定义背景项
    templateImgContainer.appendChild(customIcon);
    templateImgContainer.appendChild(checkButton);
    customItem.appendChild(templateImgContainer);
    customItem.appendChild(templateName);
    
    // 添加到网格
    elements.templateGrid.appendChild(customItem);
  }