// 《道教祈福壁纸全集·108愿》配置文件
// 1个总系列 → 12大主题 → 每个主题9张 → 共108张

const svgConfigs = {
  // ==========================================
  // 第一卷：三清天尊卷（9张）
  // ==========================================
  "001-元始天尊": {
    id: "001",
    volume: 1,
    number: 1,
    file: "assets/1.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#ffffdd",
    category: "sanqingtianzunjuan",
    title: "元始天尊",
    subtitle: "玉清圣境元始天尊",
    theme: "大道护佑",
    blessing: "大道护佑 万事顺遂",
    introduction: "元始天尊者，三清之首，道教至尊也。居玉清圣境清微天，统御诸天神真。其道先天地而生，其炁判鸿蒙而立。故《云笈七签》谓：「元始开图，肇分天地。」万灵之始，群真之宗，皆奉其法旨。世人虔诚礼敬，则可得道炁加持，灾厄远离，福慧增长。若能修身积德，敬天礼道，则元始垂光，护持身心，使家门安泰，诸事顺遂。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#faf593",
      lightRays: "#fffc5a",
      particles: "#fff8e6"
    },
    sound: "assets/s1.mp3"
  },
  "002-灵宝天尊": {
    id: "002",
    volume: 1,
    number: 2,
    file: "assets/2.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#e6f7ff",
    category: "sanqingtianzunjuan",
    title: "灵宝天尊",
    subtitle: "上清圣境灵宝天尊",
    theme: "福泽广被",
    blessing: "福泽广被 吉祥常临",
    introduction: "灵宝天尊者，三清第二尊也。居上清禹余天，掌无量度化之功。其法普济群生，其德遍覆十方。古经云：「灵宝垂慈，普度无边。」凡有善念善行之人，皆蒙护持。礼敬灵宝天尊，可增福延祥，化解烦忧，使家庭和睦，事业安顺。其光明照彻三界，其慈悲遍及群生，故世人常祈灵宝护佑，以求平安吉庆。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#93daf5",
      lightRays: "#5ac8ff",
      particles: "#e6f7ff"
    },
    sound: "assets/s2.mp3"
  },
  "003-道德天尊": {
    id: "003",
    volume: 1,
    number: 3,
    file: "assets/3.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#fff5e6",
    category: "sanqingtianzunjuan",
    title: "道德天尊",
    subtitle: "太上老君",
    theme: "智慧增长",
    blessing: "智慧增长 福慧双修",
    introduction: "道德天尊者，即太上老君也。居太清大赤天，为道教教主。昔化身老子，著《道德经》五千言，开示大道自然之理。其言曰：「人法地，地法天，天法道，道法自然。」世人礼敬老君，可启智慧，明心见性，增益福德。凡求学问、求事业、求修身者，多奉老君为智慧之师。若能守真抱朴，积善修德，则得道炁护持，福慧圆满。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#f5d093",
      lightRays: "#ffc85a",
      particles: "#fff5e6"
    },
    sound: "assets/s3.mp3"
  },
  "004-三清护世": {
    id: "004",
    volume: 1,
    number: 4,
    file: "assets/4.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#ffd700",
    category: "sanqingtianzunjuan",
    title: "三清护世",
    subtitle: "大道无量",
    theme: "三清护佑",
    blessing: "三清垂佑 百福自来",
    introduction: "三清者，元始、灵宝、道德三尊之总称也。居三十六天之上，为大道化身。元始主开天，灵宝主度世，道德主教化。三尊同显，则天地清宁，万灵得度。古来修道之士，皆奉三清为最高尊神。礼拜三清，可得福德增长，灾厄消除，智慧开显，家门昌盛。若常怀善念，敬天爱人，则三清护持，百福咸集。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#ffd700",
      lightRays: "#ffcc00",
      particles: "#fff8dc"
    },
    sound: "assets/s4.mp3"
  },
  "005-道炁长存": {
    id: "005",
    volume: 1,
    number: 5,
    file: "assets/5.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#e8f5e9",
    category: "sanqingtianzunjuan",
    title: "道炁长存",
    subtitle: "大道流光",
    theme: "福生无量",
    blessing: "福生无量 天地同春",
    introduction: "夫道者，无形无象，而生天地万物；炁者，流行宇宙，而养群生万灵。道炁长存，乃天地运行之根本也。修真之士常言：「道炁充盈，则福寿自生。」是故敬道修德者，可纳天地清炁，养身养神，增福增慧。家宅得其祥，则兴旺安宁；个人得其炁，则神清体健。故以道炁长存为愿，祈天地同春，福泽绵延。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#93f5a8",
      lightRays: "#5aff7c",
      particles: "#e8f5e9"
    },
    sound: "assets/s1.mp3"
  },
  "006-太极生辉": {
    id: "006",
    volume: 1,
    number: 6,
    file: "assets/1.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#fce4ec",
    category: "sanqingtianzunjuan",
    title: "太极生辉",
    subtitle: "阴阳和合",
    theme: "万事圆融",
    blessing: "阴阳平衡 万事圆融",
    introduction: "太极者，道之显化也。无极而太极，太极生两仪，两仪生四象，四象生八卦。天地万物皆由阴阳化生。古圣贤曰：「一阴一阳之谓道。」世人若得阴阳调和，则身心康健，家宅安宁，事业顺遂。故礼太极之象，不为求奇术，而在悟天地运行之理。明其理，则知进退；顺其道，则得安和。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#f593c2",
      lightRays: "#ff5aa8",
      particles: "#fce4ec"
    },
    sound: "assets/s2.mp3"
  },
  "007-紫炁东来": {
    id: "007",
    volume: 1,
    number: 7,
    file: "assets/2.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#e1bee7",
    category: "sanqingtianzunjuan",
    title: "紫炁东来",
    subtitle: "大道降祥",
    theme: "福运长兴",
    blessing: "紫气满堂 福运长兴",
    introduction: "紫炁者，天地祥瑞之炁也。古籍有云：「紫气东来，圣人将出。」昔老子西行函谷，关令尹喜见紫气满天，知有圣贤至，遂迎而受道。后世遂以紫炁东来为大吉之兆。凡紫炁所至，则阴霾消散，福缘渐聚，贵人相逢，吉庆相生。此象非专指一神，而寓大道流行、祥瑞降世之意。礼敬此图，可祈福运增长，时来运转，事业昌隆，家门兴旺。若能修善积德，则紫炁常临，福泽绵长。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#d093f5",
      lightRays: "#a85aff",
      particles: "#e1bee7"
    },
    sound: "assets/s3.mp3"
  },
  "008-大道护佑": {
    id: "008",
    volume: 1,
    number: 8,
    file: "assets/3.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#fff3e0",
    category: "sanqingtianzunjuan",
    title: "大道护佑",
    subtitle: "玄门赐福",
    theme: "诸愿圆满",
    blessing: "诸愿圆满 吉庆安康",
    introduction: "夫大道无形，生育天地；大道无名，运行万物。圣人观天法地，以悟自然之理。大道护佑之象，乃玄门祈福之总愿也。非独求财禄，亦求平安；非独求富贵，亦求福慧。凡心存善念，敬天爱人，修德积善者，皆得大道之护持。其福不骤至，而如春风化雨；其恩不显现，而如日月长明。故礼敬此图，可祈诸愿圆满，所求顺遂，家门吉庆，身心安康。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#f5c093",
      lightRays: "#ffa05a",
      particles: "#fff3e0"
    },
    sound: "assets/s4.mp3"
  },
  "009-福生无量": {
    id: "009",
    volume: 1,
    number: 9,
    file: "assets/4.svg",
    containerBgImage: "assets/yuanshitianzun.png",
    color: "#fffde7",
    category: "sanqingtianzunjuan",
    title: "福生无量",
    subtitle: "无量天尊",
    theme: "福寿绵长",
    blessing: "福寿绵长 吉祥永随",
    introduction: "福生无量天尊，乃道教最常见之吉祥圣号也。道门信众相见，多诵「福生无量天尊」，以表祝福、恭敬与慈悲。其意谓天地福德，无边无际；大道恩泽，普覆众生。福非独指财富，亦含健康、平安、智慧、姻缘、功名诸善果。无量者，广大无边，不可计数也。故礼敬此尊，可祈福寿安康，灾厄远离，家宅兴隆，万事吉祥。若常怀善念，广种福田，则福德日增，吉庆长随。",
    effects: ["pulseGlow", "lightRays", "particles"],
    effectColors: {
      pulseGlow: "#f5f093",
      lightRays: "#faff5a",
      particles: "#fffde7"
    },
    sound: "assets/s1.mp3"
  }
};

// 12大主题分类
const categories = {
  "sanqingtianzunjuan": {
    id: "sanqingtianzunjuan",
    name: "三清天尊卷",
    icon: "☯️",
    desc: "大道护佑 福生无量",
    color: "#ffd700",
    volume: 1
  },
  "fuyunjuan": {
    id: "fuyunjuan",
    name: "福运篇",
    icon: "🍀",
    desc: "天官赐福 百福临门",
    color: "#ff9800",
    volume: 2
  },
  "caiyunjuan": {
    id: "caiyunjuan",
    name: "财运篇",
    icon: "💰",
    desc: "财帛星君 八方来财",
    color: "#ffc107",
    volume: 3
  },
  "shiyejuan": {
    id: "shiyejuan",
    name: "事业篇",
    icon: "🚀",
    desc: "关圣帝君 事业昌盛",
    color: "#4caf50",
    volume: 4
  },
  "xueyejuan": {
    id: "xueyejuan",
    name: "学业篇",
    icon: "📚",
    desc: "文昌帝君 文运昌隆",
    color: "#2196f3",
    volume: 5
  },
  "pinganjuan": {
    id: "pinganjuan",
    name: "平安篇",
    icon: "�️",
    desc: "真武护世 百邪不侵",
    color: "#607d8b",
    volume: 6
  },
  "jiankangjuan": {
    id: "jiankangjuan",
    name: "健康篇",
    icon: "❤️",
    desc: "药王护生 身心康健",
    color: "#e91e63",
    volume: 7
  },
  "yinyuanjuan": {
    id: "yinyuanjuan",
    name: "姻缘篇",
    icon: "💑",
    desc: "月老赐缘 良缘天定",
    color: "#9c27b0",
    volume: 8
  },
  "jiazaijuan": {
    id: "jiazaijuan",
    name: "家宅篇",
    icon: "🏠",
    desc: "福德正神 家宅平安",
    color: "#795548",
    volume: 9
  },
  "guirenjuan": {
    id: "guirenjuan",
    name: "贵人篇",
    icon: "⭐",
    desc: "紫微赐运 贵人扶持",
    color: "#00bcd4",
    volume: 10
  },
  "zhuanyunjuan": {
    id: "zhuanyunjuan",
    name: "转运篇",
    icon: "🔄",
    desc: "太乙救苦 转祸为祥",
    color: "#03a9f4",
    volume: 11
  },
  "dadaojuan": {
    id: "dadaojuan",
    name: "大道篇",
    icon: "🌟",
    desc: "三清护佑 大道长兴",
    color: "#ffeb3b",
    volume: 12
  }
};
