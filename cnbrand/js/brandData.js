// 品牌数据
const brandData = {
  "护肤品": [
    
    {
      "name": "精心",
      "logo": "logos/skincare/jingxin.jpg",
      "description": "北京协和医院背景，价格实在，效果扎实。尤其推荐“精心硅霜”。",
      "founded": "1992年",
      "city": "北京",
      "honors": "北京协和医院研制",
      "reputation": "北京协和医院背景，价格实在，效果扎实。尤其推荐“精心硅霜”。",
      "products": [
        {"name": "精心硅霜", "spec": "100g", "price": "¥25-35元", "feature": "万能霜，保湿隔离，可作妆前"},
        {"name": "协和维生素E乳", "spec": "100ml", "price": "¥15-20元", "feature": "经典保湿乳液，身体脸部均可"}
      ]
    },
    {
      "name": "标婷",
      "logo": "logos/skincare/biaoting.jpg",
      "description": "北京医院研发，维生素E乳是国货经典中的经典，保湿效果一流，价格极致便宜。",
      "founded": "1993年",
      "city": "北京",
      "honors": "北京医院研制",
      "reputation": "北京医院研发，维生素E乳是国货经典中的经典，保湿效果一流，价格极致便宜。",
      "products": [
        {"name": "标婷维生素E乳", "spec": "100ml", "price": "¥10-15元", "feature": "国货保湿之王，无限回购"}
      ]
    },
    {
      "name": "郁美净",
      "logo": "logos/skincare/yumeijing.png",
      "description": "老牌国货，儿童霜陪伴了几代人，保湿滋润，温和不刺激。",
      "founded": "1980年",
      "city": "天津",
      "honors": "中国名牌产品、国家免检产品",
      "reputation": "老牌国货，儿童霜陪伴了几代人，保湿滋润，温和不刺激。",
      "products": [
        {"name": "郁美净儿童霜", "spec": "25g*5袋", "price": "¥10-15元", "feature": "袋装经典，滋润保湿"},
        {"name": "郁美净儿童霜", "spec": "60g 瓶装", "price": "¥15-20元", "feature": "成分更优，使用更方便"}
      ]
    },
    {
      "name": "美加净",
      "logo": "logos/skincare/meijiajing.png",
      "description": "经典品牌，护手霜和面霜产品线丰富，价格便宜，使用感好。",
      "founded": "1962年",
      "city": "上海",
      "honors": "中国驰名商标",
      "reputation": "经典品牌，护手霜和面霜产品线丰富，价格便宜，使用感好。",
      "products": [
        {"name": "美加净滋养护手霜", "spec": "80g", "price": "¥10-15元", "feature": "深度滋润，改善粗糙"},
        {"name": "美加净银耳珍珠滋养霜", "spec": "80g", "price": "¥15-20元", "feature": "高滋润面霜，适合熟龄肌或极干季节"}
      ]
    },
    {
      "name": "隆力奇",
      "logo": "logos/skincare/longliqi.png",
      "description": "蛇油护手霜是性价比之王，身体护理产品非常出色。",
      "founded": "1986年",
      "city": "江苏常熟",
      "honors": "中国驰名商标",
      "reputation": "蛇油护手霜是性价比之王，身体护理产品非常出色。",
      "products": [
        {"name": "隆力奇蛇油护手霜", "spec": "150g", "price": "¥10-15元", "feature": "便宜大碗，滋润防裂"},
        {"name": "隆力奇蛇油膏", "spec": "50g/100g", "price": "¥5-15元", "feature": "针对脚后跟等极度干燥部位"}
      ]
    },
    {
      "name": "春娟",
      "logo": "logos/skincare/chunjuan.png",
      "description": "四川老牌，经典产品“黄芪霜”是很多人的祛痘、去痘印神器。",
      "founded": "1980年",
      "city": "四川成都",
      "honors": "四川省著名商标",
      "reputation": "四川老牌，经典产品“黄芪霜”是很多人的祛痘、去痘印神器。",
      "products": [
        {"name": "春娟黄芪霜", "spec": "30g/60g", "price": "¥15-30元", "feature": "经典祛痘、去痘印神器，保湿力强"}
      ]
    },
    {
      "name": "安安",
      "logo": "logos/skincare/anan.png",
      "description": "经典老牌，代表产品“安安粉刺露”和“安安补水霜”，价格几十年如一日地便宜。",
      "founded": "1985年",
      "city": "广东佛山",
      "honors": "广东省著名商标",
      "reputation": "经典老牌，代表产品“安安粉刺露”和“安安补水霜”，价格几十年如一日地便宜。",
      "products": [
        {"name": "安安粉刺露", "spec": "60ml", "price": "¥10-15元", "feature": "经典祛痘水，针对粉刺"},
        {"name": "安安补水霜", "spec": "50g", "price": "¥10-15元", "feature": "清爽啫喱霜，可作睡眠面膜"}
      ]
    },
    {
      "name": "启初",
      "logo": "logos/skincare/qichu.png",
      "description": "上海家化出品，专为婴幼儿设计，成分温和，敏感肌成人也常用来做基础保湿，口碑爆棚。",
      "founded": "2013年",
      "city": "上海",
      "honors": "上海家化旗下品牌",
      "reputation": "上海家化出品，专为婴幼儿设计，成分温和，敏感肌成人也常用来做基础保湿，口碑爆棚。",
      "products": [
        {"name": "启初婴儿水润/多效倍润面霜", "spec": "40g", "price": "¥30-40元", "feature": "明星产品，修护屏障，温和保湿"}
      ]
    },
    {
      "name": "宫灯",
      "logo": "logos/skincare/gongdeng.png",
      "description": "经典产品“宫灯杏仁蜜”，清爽好吸收，全身可涂，味道怀旧。",
      "founded": "1963年",
      "city": "上海",
      "honors": "中国老牌护肤名品",
      "reputation": "经典产品“宫灯杏仁蜜”，清爽好吸收，全身可涂，味道怀旧。",
      "products": [
        {"name": "宫灯杏仁蜜", "spec": "200ml", "price": "¥10-15元", "feature": "清爽身体乳，夏季必备"}
      ]
    }
  ],
  "美妆类": [
    {
      "name": "卡姿兰",
      "logo": "logos/cosmetics/kazilan.png",
      "description": "国民彩妆品牌，产品线齐全，性价比高。",
      "founded": "2001年",
      "city": "广东深圳",
      "honors": "中国彩妆行业领军企业",
      "reputation": "国民彩妆品牌，产品线齐全，性价比高。",
      "products": [
        {"name": "大眼睛浓卷丰1号双头睫毛膏", "spec": "支", "price": "¥80-100元", "feature": "经典畅销款，能刷出浓密卷翘的效果"},
        {"name": "水吻唇膏 (小辣椒)", "spec": "支", "price": "¥70-90元", "feature": "经典口红系列，色号齐全，质地滋润"},
        {"name": "丝绒持妆粉底液", "spec": "30ml", "price": "¥100-130元", "feature": "平价好用的粉底液，遮瑕和控油能力不错"}
      ]
    },
    {
      "name": "玛丽黛佳",
      "logo": "logos/cosmetics/malidaidai.png",
      "description": "富有艺术感的国产彩妆，色彩大胆，设计新颖。",
      "founded": "2006年",
      "city": "上海",
      "honors": "中国彩妆行业创新品牌",
      "reputation": "富有艺术感的国产彩妆，色彩大胆，设计新颖。",
      "products": [
        {"name": "多米诺眼影", "spec": "颗", "price": "¥20-40元/颗", "feature": "单色眼影，粉质细腻，可自由组合，性价比极高"},
        {"name": "先锋眼线笔", "spec": "支", "price": "¥50-70元", "feature": "笔触流畅，出水均匀，防晕染效果好"},
        {"name": "国风复刻唇釉", "spec": "支", "price": "¥70-90元", "feature": "包装极具中国特色，质地多样，色彩饱和"}
      ]
    },
    {
      "name": "火烈鸟",
      "logo": "logos/cosmetics/huolieniao.png",
      "description": "经典老牌，以眼妆产品闻名，性价比之王。",
      "founded": "2000年",
      "city": "上海",
      "honors": "中国睫毛膏领导品牌",
      "reputation": "经典老牌，以眼妆产品闻名，性价比之王。",
      "products": [
        {"name": "精细入微眼线笔", "spec": "支", "price": "¥20-30元", "feature": "明星产品，笔尖极细，适合画内眼线和精细线条，口碑爆棚"},
        {"name": "魔力纤长睫毛膏", "spec": "支", "price": "¥25-40元", "feature": "经典组合（白色纤维+黑色膏体），能刷出纤长效果"}
      ]
    },
    {
      "name": "卡婷",
      "logo": "logos/cosmetics/kating.png",
      "description": "以国风雕花口红出圈，包装精美。",
      "founded": "2017年",
      "city": "广东广州",
      "honors": "中国国风彩妆知名品牌",
      "reputation": "以国风雕花口红出圈，包装精美。",
      "products": [
        {"name": "长相思雕花口红", "spec": "支", "price": "¥80-100元", "feature": "品牌代表作，膏体有精美雕花，质地顺滑，色号多为中国风"},
        {"name": "气垫BB霜", "spec": "盒", "price": "¥100-120元", "feature": "包装华丽，妆感轻薄，适合日常通勤"}
      ]
    },
    {
      "name": "凯芙兰",
      "logo": "logos/cosmetics/kaifulan.png",
      "description": "卡姿兰旗下年轻潮妆品牌。",
      "founded": "2008年",
      "city": "广东深圳",
      "honors": "中国时尚彩妆知名品牌",
      "reputation": "卡姿兰旗下年轻潮妆品牌。",
      "products": [
        {"name": "水吻冰唇釉", "spec": "支", "price": "¥70-90元", "feature": "镜面唇釉，成膜后水光感强，色彩鲜艳"},
        {"name": "萌趣控油粉饼", "spec": "盒", "price": "¥90-110元", "feature": "包装可爱，粉质细腻，控油定妆效果好"}
      ]
    },
    {
      "name": "霞飞",
      "logo": "logos/cosmetics/xiafei.png",
      "description": "经典老牌复出，极致平价，学生党挚爱。",
      "founded": "1985年",
      "city": "上海",
      "honors": "中国老牌彩妆名品",
      "reputation": "经典老牌复出，极致平价，学生党挚爱。",
      "products": [
        {"name": "柔光炫色腮红", "spec": "盒", "price": "¥10-15元", "feature": "颜色日常，粉质对得起价格，性价比超高"},
        {"name": "超细头眉笔", "spec": "支", "price": "¥10-15元", "feature": "笔芯极细，适合勾勒眉流，价格便宜"}
      ]
    },
   
   
    {
      "name": "俏美人",
      "logo": "logos/cosmetics/qiaomeiren.png",
      "description": "主打极致性价比的彩妆品牌。",
      "founded": "2005年",
      "city": "广东广州",
      "honors": "中国平价彩妆知名品牌",
      "reputation": "主打极致性价比的彩妆品牌。",
      "products": [
        {"name": "各类化妆刷", "spec": "支", "price": "¥10-30元/支", "feature": "刷具性价比高，是新手入门的不错选择"},
        {"name": "口红、眼影盘", "spec": "个", "price": "¥20-50元", "feature": "产品价格非常低廉，适合预算极其有限或想尝新的人群"}
      ]
    },
    {
      "name": "诗佩妮",
      "logo": "",
      "description": "国产平价彩妆品牌，以高性价比的遮瑕产品著称。",
      "founded": "2015年",
      "city": "广东广州",
      "honors": "国货彩妆性价比标杆",
      "reputation": "国产平价彩妆品牌，产品好用实惠，深受学生党和彩妆新手喜爱。",
      "products": [
        {"name": "老版三色遮瑕", "spec": "盒", "price": "¥46元", "feature": "质地润，不需要任何工具、不需要调色，就用一根手指去拍，黑眼圈的地方用橘色，再用浅肤色覆盖一层，其它瑕疵的地方用深肤色，再用浅肤色盖一层"}
      ]
    },
    {
      "name": "foreverkey",
      "logo": "",
      "description": "国产新锐彩妆品牌，专注于遮瑕产品研发。",
      "founded": "2020年",
      "city": "上海",
      "honors": "国产遮瑕新锐品牌",
      "reputation": "国产新锐彩妆品牌，产品设计时尚，遮瑕效果出色。",
      "products": [
        {"name": "遮瑕", "spec": "盒", "price": "¥39.9元", "feature": "很黏的质地，妆感扒脸，遮瑕力强"}
      ]
    }
  ],
  "洗发水": [
    {
      "name": "霸王",
      "logo": "logos/shampoo/bawang.png",
      "description": "防脱发领域的国民品牌，主打中草药\"育发防脱\"概念。",
      "founded": "1928年",
      "city": "广东广州",
      "honors": "中国防脱发领导品牌",
      "reputation": "中药配方，防脱发效果好，口碑极佳，深受中老年消费者喜爱。",
      "products": [
        {"name": "霸王生姜洗发水", "spec": "1L", "price": "¥40-50元", "feature": "品牌最经典的产品，浓郁的生姜味，主打防脱、控油、强韧发根。"},
        {"name": "霸王育发防脱发液", "spec": "60ml", "price": "¥60-80元", "feature": "配合洗发水使用，滴在头皮上按摩，是品牌的核心防脱精华产品。"}
      ]
    },
    {
      "name": "章华",
      "logo": "logos/shampoo/zhanghua.png",
      "description": "专业染发剂品牌，在染发、护发领域有多年历史。",
      "founded": "1981年",
      "city": "浙江温州",
      "honors": "中国染发行业领军企业",
      "reputation": "染发产品品质卓越，温和不刺激，口碑极佳。",
      "products": [
        {"name": "章华生态焗油染发霜", "spec": "盒", "price": "¥30-50元", "feature": "植物染发，颜色选择多，是很多中老年人信赖的染发产品。"},
        {"name": "章华汉草精华护发素", "spec": "500ml", "price": "¥15-25元", "feature": "滋养型护发素，配合染发使用。"}
      ]
    },
    {
      "name": "蜂花",
      "logo": "logos/shampoo/fenghua.png",
      "description": "国民老牌，极致性价比的代名词，成分党新宠。",
      "founded": "1985年",
      "city": "上海",
      "honors": "中国名牌产品",
      "reputation": "经典老牌，产品温和有效，价格亲民，护发素口碑极佳。",
      "products": [
        {"name": "蜂花无硅油健发洗发露", "spec": "750ml", "price": "¥25-35元", "feature": "无硅油配方，清爽控油，搭配护发素使用，是很多人的\"洗护黄金搭档\"。"},
        {"name": "蜂花小麦蛋白护发素", "spec": "1L", "price": "¥20-25元", "feature": "经典中的经典，便宜大碗，用于发中至发尾，柔顺不打结，可做水疗发膜。"},
        {"name": "蜂花啤酒花生姜健发洗发露", "spec": "750ml", "price": "¥25-35元", "feature": "主打生姜和啤酒花，宣称有防脱固发效果，是热销的防脱系列。"}
      ]
    },
    {
      "name": "好迪",
      "logo": "logos/shampoo/haodi.png",
      "description": "大家好才是真的好家喻户晓，经典老牌。",
      "founded": "1992年",
      "city": "广东广州",
      "honors": "中国焗油膏领导品牌",
      "reputation": "焗油膏效果好，深层滋养，价格亲民，口碑极佳。",
      "products": [
        {"name": "好迪去屑止痒洗发水", "spec": "750ml", "price": "¥25-35元", "feature": "经典去屑系列，是很多家庭的长期选择。"},
        {"name": "好迪人参精华护发素", "spec": "750ml", "price": "¥20-30元", "feature": "滋养型护发素，改善发质。"}
      ]
    },
    {
      "name": "蒂花之秀",
      "logo": "logos/shampoo/dihuazhixiu.png",
      "description": "经典老牌，产品线丰富，价格实惠。",
      "founded": "1993年",
      "city": "广东汕头",
      "honors": "中国洗护行业知名品牌",
      "reputation": "产品线全面，适合各种发质，价格适中，年轻消费者喜爱。",
      "products": [
        {"name": "蒂花之秀去屑止痒洗发水", "spec": "750ml", "price": "¥25-35元", "feature": "经典去屑系列，针对头屑头痒问题。"},
        {"name": "蒂花之秀焗油膏", "spec": "500g", "price": "¥15-25元", "feature": "深层滋养，修复干枯发质，是很多人的家庭护理选择。"}
      ]
    },
    {
      "name": "康王",
      "logo": "logos/shampoo/kangwang.png",
      "description": "药用去屑品牌，属于药品，需在药店购买。",
      "founded": "1993年",
      "city": "云南昆明",
      "honors": "中国去屑领导品牌",
      "reputation": "去屑效果显著，专业可靠，深受头屑困扰者喜爱。",
      "products": [
        {"name": "康王酮康唑洗剂", "spec": "50ml/100ml", "price": "¥20-40元", "feature": "针对顽固性头屑、脂溢性皮炎，效果显著，但需遵医嘱或按说明书使用，不可长期作为日常洗发水。"}
      ]
    },
    {
      "name": "索芙特",
      "logo": "logos/shampoo/suofute.png",
      "description": "老牌日化，曾以\"防脱\"概念闻名。",
      "founded": "1993年",
      "city": "广西梧州",
      "honors": "中国功能性洗护知名品牌",
      "reputation": "功能性强，效果明显，价格适中，口碑良好。",
      "products": [
        {"name": "索芙特防脱育发洗发水", "spec": "400ml", "price": "¥40-60元", "feature": "品牌核心产品，主打防脱育发。"}
      ]
    },
    {
      "name": "澳宝",
      "logo": "logos/shampoo/aobao.png",
      "description": "经典国货，以其\"一分钟焗油\"发膜闻名。",
      "founded": "1994年",
      "city": "广东珠海",
      "honors": "中国香氛洗护知名品牌",
      "reputation": "香氛持久，洗护效果好，价格适中，深受年轻女性喜爱。",
      "products": [
        {"name": "澳宝一分钟焗油", "spec": "500ml", "price": "¥20-30元", "feature": "品牌王牌产品，快速滋养，柔顺效果立竿见影，是很多人的家庭常备品。"}
      ]
    },
    {
      "name": "舒蕾",
      "logo": "logos/shampoo/shulei.png",
      "description": "主打\"山茶花\"等植物精华，以滋养修护闻名。",
      "founded": "1996年",
      "city": "湖北武汉",
      "honors": "中国秀发护理知名品牌",
      "reputation": "秀发护理专业，产品温和有效，价格适中，深受女性消费者喜爱。",
      "products": [
        {"name": "舒蕾山茶花焗油修护洗发露", "spec": "650ml", "price": "¥30-40元", "feature": "明星产品，山茶花香味，针对干枯受损发质，滋养效果显著。"},
        {"name": "舒蕾蚕丝柔顺护发素", "spec": "650ml", "price": "¥25-35元", "feature": "配合使用，让头发顺滑易梳。"}
      ]
    },
    {
      "name": "飘影",
      "logo": "logos/shampoo/piaoying.png",
      "description": "经典老牌，主打去屑和清爽。",
      "founded": "1996年",
      "city": "广东汕头",
      "honors": "中国洗护行业创新品牌",
      "reputation": "产品创新，体验感好，价格适中，年轻消费者喜爱。",
      "products": [
        {"name": "飘影去屑洗发水", "spec": "750ml", "price": "¥25-35元", "feature": "经典去屑系列，清凉控油。"}
      ]
    },
    {
      "name": "花世界",
      "logo": "logos/shampoo/huashijie.png",
      "description": "经典香水沐浴露品牌。",
      "founded": "1997年",
      "city": "广东广州",
      "honors": "中国女性洗护知名品牌",
      "reputation": "女性护理专业，温和不刺激，价格适中，深受女性消费者喜爱。",
      "products": [
        {"name": "花世界香水沐浴露", "spec": "750ml", "price": "¥20-30元", "feature": "香味浓郁持久，是很多人的童年记忆。"}
      ]
    },
    {
      "name": "迪彩",
      "logo": "logos/shampoo/dicai.png",
      "description": "专业洗护品牌，在发膜、弹力素等品类有优势。",
      "founded": "1998年",
      "city": "广东广州",
      "honors": "中国染发护发知名品牌",
      "reputation": "染发产品温和，护发效果好，价格适中，深受消费者信赖。",
      "products": [
        {"name": "迪彩冰海泥发膜", "spec": "500g", "price": "¥30-40元", "feature": "深层清洁，控油蓬松，适合油性发质。"},
        {"name": "迪彩弹力素", "spec": "150g", "price": "¥15-25元", "feature": "卷发定型必备，能维持卷度，增加弹性，防止毛躁。"}
      ]
    },
    {
      "name": "柏丽丝",
      "logo": "logos/shampoo/bailisi.png",
      "description": "专注于造型和洗护的品牌。",
      "founded": "1998年",
      "city": "广东广州",
      "honors": "中国造型洗护知名品牌",
      "reputation": "造型效果好，洗护合一，价格适中，适合追求时尚的年轻人。"
    },
    {
      "name": "拉芳",
      "logo": "logos/shampoo/lafang.png",
      "description": "爱生活，爱拉芳深入人心，国民品牌。",
      "founded": "1999年",
      "city": "广东汕头",
      "honors": "中国洗护行业领军企业",
      "reputation": "产品多样化，适合各种发质，价格亲民，市场占有率高。",
      "products": [
        {"name": "拉芳水光嘭嘭瓶洗发水", "spec": "550ml", "price": "¥30-40元", "feature": "主打玻尿酸成分，深层补水，适合干枯毛躁发质。"},
        {"name": "拉芳营养焗油护发素", "spec": "750ml", "price": "¥20-30元", "feature": "经典护发素，柔顺亮泽，性价比高。"}
      ]
    },
    {
      "name": "滋采",
      "logo": "logos/shampoo/zicai.png",
      "description": "经典老牌，主打植物精华。",
      "founded": "1999年",
      "city": "广东广州",
      "honors": "中国天然洗护知名品牌",
      "reputation": "天然配方，温和不刺激，价格亲民，适合全家使用。",
      "products": [
        {"name": "滋采橄榄油润发精华素", "spec": "750ml", "price": "¥20-30元", "feature": "滋养型护发素，改善干枯。"}
      ]
    },
    {
      "name": "馥佩",
      "logo": "logos/shampoo/fupei.png",
      "description": "经典国货，产品线涵盖护肤和洗护。",
      "founded": "2000年",
      "city": "广东广州",
      "honors": "中国植物洗护知名品牌",
      "reputation": "天然植物配方，温和不刺激，适合各种发质，性价比高。",
      "products": [
        {"name": "馥珮去屑止痒洗发水", "spec": "750ml", "price": "¥25-35元", "feature": "基础去屑系列，价格便宜。"}
      ]
    },
    {
      "name": "亮荘",
      "logo": "logos/shampoo/liangzhuang.png",
      "description": "经典老牌，主打植物护理。",
      "founded": "2000年",
      "city": "广东广州",
      "honors": "中国男士洗护领先品牌",
      "reputation": "男士洗护专业，控油效果好，价格适中，口碑良好。",
      "products": [
        {"name": "亮荘人参精华洗发水", "spec": "750ml", "price": "¥25-35元", "feature": "滋养修护，改善干枯发质。"}
      ]
    },
    {
      "name": "卫新",
      "logo": "logos/shampoo/weixin.png",
      "description": "专注于衣物洗护的品牌。",
      "founded": "2000年",
      "city": "广东广州",
      "honors": "中国衣物洗护知名品牌",
      "reputation": "衣物洗护专业，清洁效果好，价格适中，家庭必备。"
    },
    {
      "name": "雨洁",
      "logo": "logos/shampoo/yujie.png",
      "description": "专注去屑的洗护品牌。",
      "founded": "2001年",
      "city": "广东广州",
      "honors": "中国去屑知名品牌",
      "reputation": "去屑效果好，价格亲民，性价比高。",
      "products": [
        {"name": "雨洁净屑去油洗发水", "spec": "700ml", "price": "¥30-40元", "feature": "主打去屑控油，是品牌的热销系列。"}
      ]
    },
    {
      "name": "100年润发",
      "logo": "logos/shampoo/100nianrunfa.png",
      "description": "纳爱斯旗下品牌，主打中草药护理。",
      "founded": "2003年",
      "city": "浙江杭州",
      "honors": "中国中药洗护知名品牌",
      "reputation": "中药配方，滋养修护，价格适中，口碑良好。",
      "products": [
        {"name": "100年润发青丝卫防掉发洗发水", "spec": "750ml", "price": "¥40-50元", "feature": "主打防脱固发，是品牌的热销系列。"},
        {"name": "100年润发何首乌柔亮洗发水", "spec": "750ml", "price": "¥30-40元", "feature": "何首乌成分，滋养乌发，适合干枯发质。"}
      ]
    }
  ],
  "奶制品": [
    {
      "name": "风行",
      "logo": "logos/milk/fengxing.png",
      "description": "广东知名奶制品品牌。",
      "founded": "1927年",
      "city": "广东广州",
      "honors": "广东著名商标",
      "reputation": "历史悠久，产品种类丰富，品质可靠，深受消费者信赖。"
    },
    {
      "name": "卫岗",
      "logo": "logos/milk/weigang.png",
      "description": "江苏知名奶制品品牌。",
      "founded": "1928年",
      "city": "江苏南京",
      "honors": "中国名牌产品",
      "reputation": "历史悠久，产品种类丰富，品质可靠，深受消费者信赖。"
    },
    {
      "name": "佳宝",
      "logo": "logos/milk/jiabao.png",
      "description": "山东知名奶制品品牌。",
      "founded": "1930年",
      "city": "山东济南",
      "honors": "山东著名商标",
      "reputation": "历史悠久，产品种类丰富，口感好，价格亲民。"
    },
    {
      "name": "天友",
      "logo": "logos/milk/tianyou.png",
      "description": "西南地区知名奶制品品牌。",
      "founded": "1931年",
      "city": "重庆",
      "honors": "中国名牌产品",
      "reputation": "西南地区知名品牌，产品种类丰富，新鲜度高，口感好。"
    },
    {
      "name": "维记",
      "logo": "logos/milk/weiji.png",
      "description": "广东知名奶制品品牌。",
      "founded": "1940年",
      "city": "广东广州",
      "honors": "广东著名商标",
      "reputation": "广东老品牌，产品种类丰富，口感好，深受当地消费者喜爱。"
    },
    {
      "name": "辉山",
      "logo": "logos/milk/huishan.png",
      "description": "东北地区知名奶制品品牌。",
      "founded": "1951年",
      "city": "辽宁沈阳",
      "honors": "中国名牌产品",
      "reputation": "东北优质奶源，产品种类丰富，品质稳定，口碑良好。"
    },
    {
      "name": "乍甸",
      "logo": "logos/milk/zadian.png",
      "description": "云南特色奶制品品牌。",
      "founded": "1953年",
      "city": "云南红河",
      "honors": "云南名牌产品",
      "reputation": "云南特色奶源，产品新鲜，口感醇厚，当地消费者喜爱。"
    },
    {
      "name": "花花牛",
      "logo": "logos/milk/huahuaniu.png",
      "description": "河南知名奶制品品牌。",
      "founded": "1955年",
      "city": "河南郑州",
      "honors": "河南著名商标",
      "reputation": "河南地区知名品牌，产品种类丰富，价格亲民，当地消费者喜爱。"
    },
    {
      "name": "蝶泉",
      "logo": "logos/milk/diequan.png",
      "description": "云南知名奶制品品牌。",
      "founded": "1956年",
      "city": "云南大理",
      "honors": "云南名牌产品",
      "reputation": "云南高原奶源，产品特色鲜明，口感醇厚，历史悠久。"
    },
    {
      "name": "光明",
      "logo": "logos/milk/guangming.png",
      "description": "全国知名奶制品品牌。",
      "founded": "1956年",
      "city": "上海",
      "honors": "中国乳业领军企业",
      "reputation": "全国性品牌，产品线全面，品质稳定，深受消费者信赖。"
    },
    {
      "name": "燕塘",
      "logo": "logos/milk/yantang.png",
      "description": "广东知名奶制品品牌。",
      "founded": "1956年",
      "city": "广东广州",
      "honors": "广东著名商标",
      "reputation": "广东老品牌，产品新鲜，口感好，深受当地消费者喜爱。"
    },
    {
      "name": "海河",
      "logo": "logos/milk/haihe.png",
      "description": "天津知名奶制品品牌。",
      "founded": "1957年",
      "city": "天津",
      "honors": "天津著名商标",
      "reputation": "天津老品牌，产品种类丰富，价格亲民，口碑良好。"
    },
    {
      "name": "完达山",
      "logo": "logos/milk/wandashan.png",
      "description": "黑龙江知名奶制品品牌。",
      "founded": "1958年",
      "city": "黑龙江哈尔滨",
      "honors": "中国名牌产品",
      "reputation": "东北优质奶源，历史悠久，品质可靠，消费者信赖。"
    },
    {
      "name": "博农",
      "logo": "logos/milk/bonong.png",
      "description": "河南知名奶制品品牌。",
      "founded": "1958年",
      "city": "河南焦作",
      "honors": "河南著名商标",
      "reputation": "河南地区知名品牌，产品新鲜，口感好，口碑良好。"
    },
    {
      "name": "银桥",
      "logo": "logos/milk/yinqiao.png",
      "description": "西北地区知名奶制品品牌。",
      "founded": "1978年",
      "city": "陕西西安",
      "honors": "中国名牌产品",
      "reputation": "西北优质奶源，产品新鲜，价格亲民，深受当地消费者喜爱。"
    },
    {
      "name": "金河",
      "logo": "logos/milk/jinhe.png",
      "description": "宁夏知名奶制品品牌。",
      "founded": "1979年",
      "city": "宁夏银川",
      "honors": "宁夏著名商标",
      "reputation": "宁夏地区知名品牌，产品种类丰富，价格亲民，当地消费者喜爱。"
    },
    {
      "name": "山西古城",
      "logo": "logos/milk/shanxigucheng.png",
      "description": "山西知名奶制品品牌。",
      "founded": "1982年",
      "city": "山西朔州",
      "honors": "山西著名商标",
      "reputation": "山西地区知名品牌，产品种类丰富，价格亲民，当地消费者喜爱。"
    },
    {
      "name": "香满楼",
      "logo": "logos/milk/xiangmanlou.png",
      "description": "广东知名奶制品品牌。",
      "founded": "1982年",
      "city": "广东广州",
      "honors": "广东著名商标",
      "reputation": "广东地区知名品牌，产品新鲜，口感好，深受当地消费者喜爱。"
    },
    {
      "name": "旺旺",
      "logo": "logos/milk/wangwang.png",
      "description": "全国知名食品饮料品牌。",
      "founded": "1983年",
      "city": "台湾台北",
      "honors": "中国食品行业领军企业",
      "reputation": "产品种类丰富，口感好，包装可爱，深受儿童和年轻人喜爱。"
    },
    {
      "name": "雪兰",
      "logo": "logos/milk/xuelan.png",
      "description": "云南知名奶制品品牌。",
      "founded": "1990年",
      "city": "云南昆明",
      "honors": "云南名牌产品",
      "reputation": "云南高原奶源，产品新鲜，口感纯正，深受当地消费者喜爱。"
    },
    {
      "name": "欧亚",
      "logo": "logos/milk/ouya.png",
      "description": "云南知名奶制品品牌。",
      "founded": "1992年",
      "city": "云南昆明",
      "honors": "云南名牌产品",
      "reputation": "云南高原奶源，产品新鲜，口感纯正，性价比高。"
    },
    {
      "name": "百富露",
      "logo": "logos/milk/baifulu.png",
      "description": "广东知名奶制品品牌。",
      "founded": "1992年",
      "city": "广东佛山",
      "honors": "广东著名商标",
      "reputation": "广东地区知名品牌，产品种类丰富，价格亲民，当地消费者喜爱。"
    },
    {
      "name": "夏进",
      "logo": "logos/milk/xiajin.png",
      "description": "宁夏知名奶制品品牌。",
      "founded": "1994年",
      "city": "宁夏吴忠",
      "honors": "宁夏著名商标",
      "reputation": "宁夏地区知名品牌，产品新鲜，口感好，当地消费者喜爱。"
    },
    {
      "name": "新希望",
      "logo": "logos/milk/xinxihope.png",
      "description": "全国知名奶制品品牌。",
      "founded": "1998年",
      "city": "四川成都",
      "honors": "中国乳业领军企业",
      "reputation": "全国性品牌，产品线全面，品质稳定，市场占有率高。"
    },
    {
      "name": "长富",
      "logo": "logos/milk/changfu.png",
      "description": "福建知名奶制品品牌。",
      "founded": "1998年",
      "city": "福建福州",
      "honors": "福建著名商标",
      "reputation": "福建优质奶源，产品新鲜，口感好，深受当地消费者喜爱。"
    },
    {
      "name": "天露",
      "logo": "logos/milk/tianlu.png",
      "description": "甘肃知名奶制品品牌。",
      "founded": "1998年",
      "city": "甘肃白银",
      "honors": "甘肃著名商标",
      "reputation": "甘肃地区知名品牌，产品新鲜，口感好，当地消费者喜爱。"
    },
    {
      "name": "天润",
      "logo": "logos/milk/tianrun.png",
      "description": "新疆特色奶制品品牌。",
      "founded": "1999年",
      "city": "新疆乌鲁木齐",
      "honors": "新疆著名商标",
      "reputation": "新疆优质奶源，产品特色鲜明，口感醇厚，深受消费者喜爱。"
    },
    {
      "name": "华中农业大学-水牛鲜奶",
      "logo": "logos/milk/huazhongshuiniu.png",
      "description": "高校研发的特色奶制品。",
      "founded": "2000年",
      "city": "湖北武汉",
      "honors": "高校特色产品",
      "reputation": "高校研发，科技含量高，水牛鲜奶特色鲜明，营养丰富，健康安全。"
    },
    {
      "name": "皇氏",
      "logo": "logos/milk/huangshi.png",
      "description": "广西知名奶制品品牌。",
      "founded": "2001年",
      "city": "广西南宁",
      "honors": "广西著名商标",
      "reputation": "广西特色奶制品，口感独特，产品创新，年轻消费者喜爱。"
    },
    {
      "name": "好一多",
      "logo": "logos/milk/haoyiduo.png",
      "description": "贵州知名奶制品品牌。",
      "founded": "2001年",
      "city": "贵州贵阳",
      "honors": "贵州著名商标",
      "reputation": "贵州高原奶源，产品新鲜，口感好，深受当地消费者喜爱。"
    },
    {
      "name": "小西牛",
      "logo": "logos/milk/xiaoxiniu.png",
      "description": "青海特色奶制品品牌。",
      "founded": "2002年",
      "city": "青海西宁",
      "honors": "青海著名商标",
      "reputation": "青海高原奶源，产品特色鲜明，口感醇厚，深受消费者喜爱。"
    },
    {
      "name": "圣湖",
      "logo": "logos/milk/shenghu.png",
      "description": "青海特色奶制品品牌。",
      "founded": "2004年",
      "city": "青海西宁",
      "honors": "青海著名商标",
      "reputation": "青海高原奶源，产品特色鲜明，口感醇厚，深受消费者喜爱。"
    },
    {
      "name": "西域春",
      "logo": "logos/milk/xiyuchun.png",
      "description": "新疆特色奶制品品牌。",
      "founded": "2005年",
      "city": "新疆昌吉",
      "honors": "新疆著名商标",
      "reputation": "新疆优质奶源，产品特色鲜明，口感醇厚，深受消费者喜爱。"
    },
    {
      "name": "子承乳业",
      "logo": "logos/milk/zichengruye.png",
      "description": "专注于有机奶制品的品牌。",
      "founded": "2010年",
      "city": "内蒙古呼和浩特",
      "honors": "中国有机奶知名品牌",
      "reputation": "有机奶源，健康安全，品质卓越，高端消费者首选。"
    }
  ],
  "饮料": [
    {
      "name": "天府可乐",
      "logo": "logos/beverage/tianfukele.png",
      "description": "重庆特色可乐品牌。",
      "founded": "1936年",
      "city": "重庆",
      "honors": "中国历史文化名饮",
      "reputation": "中药配方可乐，口感独特，历史悠久，重庆特色，消费者怀旧情结浓厚。"
    },
    {
      "name": "崂山可乐",
      "logo": "logos/beverage/laoshnakele.png",
      "description": "山东特色可乐品牌。",
      "founded": "1953年",
      "city": "山东青岛",
      "honors": "山东著名商标",
      "reputation": "中药配方可乐，口感独特，历史悠久，青岛特色，消费者喜爱。"
    },
    {
      "name": "椰树",
      "logo": "logos/beverage/yashu.png",
      "description": "海南特色饮品品牌。",
      "founded": "1956年",
      "city": "海南海口",
      "honors": "中国名牌产品",
      "reputation": "海南特色，椰汁口感纯正，历史悠久，消费者喜爱。"
    },
    {
      "name": "冰泉",
      "logo": "logos/beverage/bingquan.png",
      "description": "广西特色饮品品牌。",
      "founded": "1956年",
      "city": "广西梧州",
      "honors": "广西著名商标",
      "reputation": "广西特色，豆浆晶历史悠久，口感好，营养丰富。"
    },
    {
      "name": "健力宝",
      "logo": "logos/beverage/jianlibao.png",
      "description": "全国知名运动饮料品牌。",
      "founded": "1984年",
      "city": "广东佛山",
      "honors": "中国运动饮料领导品牌",
      "reputation": "运动饮料，补充能量，口感好，历史悠久，消费者喜爱。"
    },
    {
      "name": "娃哈哈",
      "logo": "logos/beverage/wahaha.png",
      "description": "全国知名食品饮料品牌。",
      "founded": "1987年",
      "city": "浙江杭州",
      "honors": "中国饮料行业领军企业",
      "reputation": "产品种类丰富，口感好，价格亲民，市场占有率高。"
    },
    {
      "name": "津威",
      "logo": "logos/beverage/jinwei.png",
      "description": "广东特色乳酸菌饮品品牌。",
      "founded": "1990年",
      "city": "广东惠州",
      "honors": "广东著名商标",
      "reputation": "乳酸菌饮品，口感好，有助于消化，儿童和家庭喜爱。"
    },
    {
      "name": "汇源",
      "logo": "logos/beverage/huiyuan.png",
      "description": "全国知名果汁品牌。",
      "founded": "1992年",
      "city": "北京",
      "honors": "中国果汁行业领军企业",
      "reputation": "果汁含量高，口感纯正，产品线全面，深受消费者喜爱。"
    },
    {
      "name": "李子园",
      "logo": "logos/beverage/liziyuan.png",
      "description": "全国知名含乳饮料品牌。",
      "founded": "1994年",
      "city": "浙江金华",
      "honors": "浙江著名商标",
      "reputation": "含乳饮料，口感好，价格亲民，深受儿童和年轻人喜爱。"
    },
    {
      "name": "农夫山泉",
      "logo": "logos/beverage/nongfuspring.png",
      "description": "全国知名饮用水品牌。",
      "founded": "1996年",
      "city": "浙江杭州",
      "honors": "中国饮料行业领军企业",
      "reputation": "天然矿泉水，水质优良，口感好，品牌形象好，消费者信赖。"
    },
    {
      "name": "RIO",
      "logo": "logos/beverage/rio.png",
      "description": "预调鸡尾酒品牌。",
      "founded": "2003年",
      "city": "上海",
      "honors": "中国预调酒领导品牌",
      "reputation": "预调鸡尾酒，口感好，包装时尚，年轻消费者喜爱。"
    },
    {
      "name": "霞光",
      "logo": "logos/beverage/xaguang.png",
      "description": "果酒品牌。",
      "founded": "2008年",
      "city": "山东烟台",
      "honors": "中国果酒知名品牌",
      "reputation": "果酒口感好，度数低，适合女性消费者，包装精美。"
    }
  ],
  "调味品": [
    {
      "name": "保定槐茂面酱",
      "logo": "logos/condiment/baodinghuaimaomianjiang.png",
      "description": "河北特色调味品品牌。",
      "founded": "1671年",
      "city": "河北保定",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，面酱风味独特，品质好，当地消费者喜爱。"
    },
    {
      "name": "恒顺",
      "logo": "logos/condiment/hengshun.png",
      "description": "江苏知名调味品品牌。",
      "founded": "1840年",
      "city": "江苏镇江",
      "honors": "中国名牌产品",
      "reputation": "镇江香醋历史悠久，品质卓越，口感好，消费者信赖。"
    },
    {
      "name": "天厨味精",
      "logo": "logos/condiment/tianchuweijing.png",
      "description": "老牌味精品牌。",
      "founded": "1923年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，味精品质好，鲜味纯正，消费者信赖。"
    },
    {
      "name": "水塔陈醋",
      "logo": "logos/condiment/shuitacuchen.png",
      "description": "山西知名醋品牌。",
      "founded": "1976年",
      "city": "山西清徐",
      "honors": "山西著名商标",
      "reputation": "山西老陈醋，口感醇厚，历史悠久，消费者喜爱。"
    },
    {
      "name": "莲花味精",
      "logo": "logos/condiment/lianhuaweijing.png",
      "description": "全国知名味精品牌。",
      "founded": "1983年",
      "city": "河南项城",
      "honors": "中国名牌产品",
      "reputation": "味精品质好，鲜味纯正，历史悠久，消费者信赖。"
    },
    {
      "name": "王守义十三香",
      "logo": "logos/condiment/wangshouyishisanxiang.png",
      "description": "全国知名调味品品牌。",
      "founded": "1984年",
      "city": "河南驻马店",
      "honors": "中国名牌产品",
      "reputation": "香料配方独特，调味效果好，历史悠久，消费者信赖。"
    },
    {
      "name": "鲁花",
      "logo": "logos/condiment/luhua.png",
      "description": "全国知名食用油品牌。",
      "founded": "1986年",
      "city": "山东莱阳",
      "honors": "中国食用油行业领军企业",
      "reputation": "花生油品质好，香味浓郁，营养健康，消费者喜爱。"
    },
    {
      "name": "安琪酵母",
      "logo": "logos/condiment/anqijiaomu.png",
      "description": "全国知名酵母品牌。",
      "founded": "1986年",
      "city": "湖北宜昌",
      "honors": "中国酵母行业领军企业",
      "reputation": "酵母品质好，发酵效果好，科技含量高，消费者信赖。"
    },
    {
      "name": "正义",
      "logo": "logos/condiment/zhengyi.png",
      "description": "酱油品牌。",
      "founded": "1992年",
      "city": "广东佛山",
      "honors": "广东著名商标",
      "reputation": "酱油品质好，风味独特，价格亲民，性价比高。"
    },
    {
      "name": "国泰味精",
      "logo": "logos/condiment/guotaiweijing.png",
      "description": "知名味精品牌。",
      "founded": "1995年",
      "city": "山东济宁",
      "honors": "山东著名商标",
      "reputation": "味精品质好，鲜味纯正，价格亲民，性价比高。"
    },
    {
      "name": "福临门",
      "logo": "logos/condiment/fulinmen.png",
      "description": "全国知名食用油品牌。",
      "founded": "2002年",
      "city": "北京",
      "honors": "中国食用油行业领军企业",
      "reputation": "食用油产品线全面，品质稳定，价格适中，消费者信赖。"
    },
    {
      "name": "名扬底料",
      "logo": "logos/condiment/mingyangdiliang.png",
      "description": "四川火锅底料品牌。",
      "founded": "2003年",
      "city": "四川成都",
      "honors": "四川著名商标",
      "reputation": "火锅底料麻辣鲜香，口感好，深受消费者喜爱。"
    }
  ],
  "方便食品": [
    {
      "name": "幸运方便面",
      "logo": "logos/instantfood/xingyunfangbianmian.png",
      "description": "安徽特色方便面品牌。",
      "founded": "1989年",
      "city": "安徽淮北",
      "honors": "安徽著名商标",
      "reputation": "安徽特色，方便面口感好，历史悠久，当地消费者喜爱。"
    },
    {
      "name": "泰奇",
      "logo": "logos/instantfood/taiqi.png",
      "description": "广东特色方便食品品牌。",
      "founded": "1992年",
      "city": "广东广州",
      "honors": "广东著名商标",
      "reputation": "八宝粥口感好，营养丰富，方便携带，消费者喜爱。"
    },
    {
      "name": "白象",
      "logo": "logos/instantfood/baixiang.png",
      "description": "全国知名方便面品牌。",
      "founded": "1997年",
      "city": "河南郑州",
      "honors": "中国方便面行业领军企业",
      "reputation": "方便面口感好，种类丰富，价格亲民，深受消费者喜爱。"
    }
  ],
  "零食": [
    {
      "name": "陶陶居",
      "logo": "logos/snack/taotaoju.png",
      "description": "广州特色糕点品牌。",
      "founded": "1880年",
      "city": "广东广州",
      "honors": "中国历史文化名品",
      "reputation": "广州特色糕点，历史悠久，口感好，文化底蕴深厚。"
    },
    {
      "name": "荣欣堂",
      "logo": "logos/snack/rongxintang.png",
      "description": "山西特色糕点品牌。",
      "founded": "1895年",
      "city": "山西太原",
      "honors": "中国历史文化名品",
      "reputation": "山西特色糕点，历史悠久，口感好，文化底蕴深厚。"
    },
    {
      "name": "老香斋",
      "logo": "logos/snack/laoxiangzhai.png",
      "description": "上海特色糕点品牌。",
      "founded": "1913年",
      "city": "上海",
      "honors": "上海著名商标",
      "reputation": "上海特色糕点，历史悠久，口感好，文化底蕴深厚。"
    },
    {
      "name": "华丰",
      "logo": "logos/snack/huafeng.png",
      "description": "老牌方便面品牌。",
      "founded": "1982年",
      "city": "广东深圳",
      "honors": "中国老牌方便面名品",
      "reputation": "方便面历史悠久，口感好，价格亲民，消费者怀旧情结浓厚。"
    },
    {
      "name": "喜之郎",
      "logo": "logos/snack/xizhilang.png",
      "description": "全国知名果冻品牌。",
      "founded": "1993年",
      "city": "广东深圳",
      "honors": "中国果冻行业领军企业",
      "reputation": "果冻口感好，种类丰富，包装可爱，深受儿童和年轻人喜爱。"
    },
    {
      "name": "伟龙",
      "logo": "logos/snack/weilong.png",
      "description": "饼干品牌。",
      "founded": "1993年",
      "city": "山东临沂",
      "honors": "山东著名商标",
      "reputation": "饼干口感好，种类丰富，价格亲民，深受消费者喜爱。"
    },
    {
      "name": "运康",
      "logo": "logos/snack/yunkang.png",
      "description": "山西特色休闲食品品牌。",
      "founded": "1995年",
      "city": "山西运城",
      "honors": "山西著名商标",
      "reputation": "锅巴口感酥脆，风味独特，当地消费者喜爱。"
    },
    {
      "name": "米老头",
      "logo": "logos/snack/milaotou.png",
      "description": "休闲食品品牌。",
      "founded": "1997年",
      "city": "四川成都",
      "honors": "四川著名商标",
      "reputation": "休闲食品种类丰富，口感好，价格亲民，深受儿童和年轻人喜爱。"
    },
    {
      "name": "酒鬼花生",
      "logo": "logos/snack/jiuguihuasheng.png",
      "description": "休闲食品品牌。",
      "founded": "1997年",
      "city": "四川成都",
      "honors": "四川著名商标",
      "reputation": "花生口感酥脆，风味独特，下酒佳品，消费者喜爱。"
    },
    {
      "name": "馋大嘴巴",
      "logo": "logos/snack/chandazuiba.png",
      "description": "休闲食品品牌。",
      "founded": "2008年",
      "city": "湖南长沙",
      "honors": "湖南著名商标",
      "reputation": "休闲食品种类丰富，口感好，价格亲民，年轻消费者喜爱。"
    }
  ],
  "米面粮油": [
    {
      "name": "中粮",
      "logo": "logos/grain/zhongliang.png",
      "description": "全国知名粮油品牌。",
      "founded": "1949年",
      "city": "北京",
      "honors": "中国粮油行业领军企业",
      "reputation": "央企背景，产品线全面，品质稳定，消费者高度信赖。"
    },
    {
      "name": "陈克明",
      "logo": "logos/grain/chenkeming.png",
      "description": "全国知名挂面品牌。",
      "founded": "1984年",
      "city": "湖南南县",
      "honors": "中国挂面行业领军企业",
      "reputation": "挂面品质好，种类丰富，口感好，消费者信赖。"
    },
    {
      "name": "旌晶",
      "logo": "logos/grain/jingjing.png",
      "description": "方便食品品牌。",
      "founded": "1985年",
      "city": "四川成都",
      "honors": "四川著名商标",
      "reputation": "方便食品种类丰富，营养健康，适合早餐和旅行。"
    },
    {
      "name": "银鸥好食",
      "logo": "logos/grain/yinouhaoshi.png",
      "description": "面粉品牌。",
      "founded": "1998年",
      "city": "广东湛江",
      "honors": "广东著名商标",
      "reputation": "面粉品质好，适合制作各种面食，家庭烘焙首选。"
    },
    {
      "name": "福临门",
      "logo": "logos/grain/fulinmen.png",
      "description": "全国知名米面粮油品牌。",
      "founded": "2002年",
      "city": "北京",
      "honors": "中国粮油行业领军企业",
      "reputation": "产品线全面，品质稳定，价格适中，消费者信赖。"
    },
    {
      "name": "思源",
      "logo": "logos/grain/siyuan.png",
      "description": "大米品牌。",
      "founded": "2005年",
      "city": "江西南昌",
      "honors": "江西著名商标",
      "reputation": "大米品质好，口感软糯，营养健康，消费者喜爱。"
    },
    {
      "name": "螺玛",
      "logo": "logos/grain/luoma.png",
      "description": "米粉品牌。",
      "founded": "2010年",
      "city": "广西南宁",
      "honors": "广西著名商标",
      "reputation": "米粉品质好，口感顺滑，适合制作各种米粉食品。"
    }
  ],
  "香皂类": [
    {
      "name": "上海药皂",
      "logo": "logos/soap/shanghaiyaozao.png",
      "description": "上海传统药皂品牌。",
      "founded": "1907年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，具有杀菌消毒功效，价格亲民，品质可靠，消费者信赖。"
    },
    {
      "name": "上海硫磺皂",
      "logo": "logos/soap/shanghailiuhuang.png",
      "description": "上海传统药皂品牌。",
      "founded": "1923年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，具有杀菌除螨功效，价格亲民，深受消费者喜爱。"
    },
    {
      "name": "蜂花檀香皂",
      "logo": "logos/soap/fenghuatangxiang.png",
      "description": "上海传统香皂品牌。",
      "founded": "1928年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，檀香味浓郁持久，品质卓越，文化底蕴深厚，消费者喜爱。"
    },
    {
      "name": "蜂花",
      "logo": "logos/soap/fenghua.png",
      "description": "上海老牌日化品牌。",
      "founded": "1985年",
      "city": "上海",
      "honors": "中国名牌产品",
      "reputation": "上海老品牌，产品种类丰富，价格亲民，品质可靠，消费者信赖。"
    },
    {
      "name": "六神",
      "logo": "logos/soap/liushen.png",
      "description": "上海知名个人护理品牌。",
      "founded": "1990年",
      "city": "上海",
      "honors": "中国名牌产品",
      "reputation": "花露水清凉提神，沐浴露清爽舒适，夏季必备，消费者信赖。"
    },
    {
      "name": "澳雪",
      "logo": "logos/soap/aoxue.png",
      "description": "广东知名日化品牌。",
      "founded": "1994年",
      "city": "广东汕头",
      "honors": "广东著名商标",
      "reputation": "沐浴露系列产品丰富，香气持久，价格适中，深受家庭消费者喜爱。"
    },
    {
      "name": "纳爱斯香皂",
      "logo": "logos/soap/naaixiangzao.png",
      "description": "浙江知名日化品牌。",
      "founded": "1994年",
      "city": "浙江丽水",
      "honors": "中国名牌产品",
      "reputation": "香皂清洁力强，香气宜人，价格亲民，市场占有率高，消费者喜爱。"
    },
    {
      "name": "上海芦荟皂",
      "logo": "logos/soap/shanghaihuisu.png",
      "description": "上海特色香皂品牌。",
      "founded": "1995年",
      "city": "上海",
      "honors": "上海著名商标",
      "reputation": "添加芦荟成分，温和滋润，适合敏感肌肤，价格适中，消费者喜爱。"
    },
    {
      "name": "六神香皂",
      "logo": "logos/soap/liushenxiangzao.png",
      "description": "六神旗下香皂品牌。",
      "founded": "1995年",
      "city": "上海",
      "honors": "中国著名商标",
      "reputation": "清凉舒爽，具有除菌功效，夏季使用舒适，消费者喜爱。"
    }
  ],
  "牙膏": [
    {
      "name": "云南白药",
      "logo": "logos/toothpaste/yunnanbaiyao.png",
      "description": "云南知名医药企业旗下口腔护理品牌。",
      "founded": "1902年",
      "city": "云南昆明",
      "honors": "中国名牌产品",
      "reputation": "医药背景，止血消炎功效显著，高端品质，消费者高度信赖。"
    },
    {
      "name": "六必治",
      "logo": "logos/toothpaste/liubizhi.png",
      "description": "天津知名牙膏品牌。",
      "founded": "1911年",
      "city": "天津",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，中药配方，口气清新，品质可靠，消费者信赖。"
    },
    {
      "name": "白玉",
      "logo": "logos/toothpaste/baiyu.png",
      "description": "上海老牌牙膏品牌。",
      "founded": "1912年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，价格亲民，口感温和，清洁效果好，消费者信赖。"
    },
    {
      "name": "两面针",
      "logo": "logos/toothpaste/liangmianzhen.png",
      "description": "广西知名中药牙膏品牌。",
      "founded": "1941年",
      "city": "广西柳州",
      "honors": "中国名牌产品",
      "reputation": "中药配方，消炎止血，历史悠久，品质可靠，消费者信赖。"
    },
    {
      "name": "田七",
      "logo": "logos/toothpaste/tianqi.png",
      "description": "广西知名牙膏品牌。",
      "founded": "1945年",
      "city": "广西梧州",
      "honors": "广西著名商标",
      "reputation": "中药配方，清凉止血，历史悠久，消费者信赖。"
    },
    {
      "name": "冷酸灵",
      "logo": "logos/toothpaste/lengsuanling.png",
      "description": "重庆知名抗敏感牙膏品牌。",
      "founded": "1956年",
      "city": "重庆",
      "honors": "中国名牌产品",
      "reputation": "抗敏感功效显著，口感清凉，品质可靠，消费者信赖。"
    },
    {
      "name": "芳草",
      "logo": "logos/toothpaste/fangcao.png",
      "description": "安徽知名牙膏品牌。",
      "founded": "1958年",
      "city": "安徽合肥",
      "honors": "安徽著名商标",
      "reputation": "双重薄荷口味，价格亲民，清洁效果好，消费者喜爱。"
    },
    {
      "name": "松达",
      "logo": "logos/toothpaste/songda.png",
      "description": "福建知名牙膏品牌。",
      "founded": "1964年",
      "city": "福建漳州",
      "honors": "福建著名商标",
      "reputation": "草本配方，温和不刺激，适合全家使用，消费者喜爱。"
    },
    {
      "name": "白云山",
      "logo": "logos/toothpaste/baiyunshan.png",
      "description": "广州知名医药企业旗下口腔护理品牌。",
      "founded": "1970年",
      "city": "广东广州",
      "honors": "中国名牌产品",
      "reputation": "医药背景，功效性强，品质可靠，消费者信赖。"
    },
    {
      "name": "康齿灵",
      "logo": "logos/toothpaste/kangchiling.png",
      "description": "辽宁知名口腔护理品牌。",
      "founded": "1978年",
      "city": "辽宁大连",
      "honors": "辽宁著名商标",
      "reputation": "防蛀护齿功效好，价格适中，适合家庭使用，消费者喜爱。"
    },
    {
      "name": "黑妹",
      "logo": "logos/toothpaste/heimei.png",
      "description": "广东知名牙膏品牌。",
      "founded": "1986年",
      "city": "广东广州",
      "honors": "广东著名商标",
      "reputation": "双重薄荷口味，清新口气，价格适中，消费者喜爱。"
    },
    {
      "name": "四七",
      "logo": "logos/toothpaste/siqi.png",
      "description": "云南知名牙膏品牌。",
      "founded": "1992年",
      "city": "云南昆明",
      "honors": "云南著名商标",
      "reputation": "中药配方，清凉舒适，价格适中，消费者喜爱。"
    },
    {
      "name": "纳爱斯",
      "logo": "logos/toothpaste/naaisi.png",
      "description": "浙江知名日化品牌。",
      "founded": "1994年",
      "city": "浙江丽水",
      "honors": "中国名牌产品",
      "reputation": "牙膏种类丰富，口感好，价格适中，市场占有率高，消费者喜爱。"
    },
    {
      "name": "草珊瑚",
      "logo": "logos/toothpaste/caoshanhu.png",
      "description": "江西知名牙膏品牌。",
      "founded": "1994年",
      "city": "江西南昌",
      "honors": "江西著名商标",
      "reputation": "草本配方，清新口气，价格适中，消费者喜爱。"
    },
    {
      "name": "片仔癀",
      "logo": "logos/toothpaste/pianzaihuang.png",
      "description": "福建知名医药企业旗下口腔护理品牌。",
      "founded": "1999年",
      "city": "福建漳州",
      "honors": "中国名牌产品",
      "reputation": "医药背景，消炎止血功效显著，高端品质，消费者信赖。"
    },
    {
      "name": "舒客",
      "logo": "logos/toothpaste/suker.png",
      "description": "广州知名口腔护理品牌。",
      "founded": "2006年",
      "city": "广东广州",
      "honors": "中国口腔护理新锐品牌",
      "reputation": "产品线全面，包装时尚，适合年轻消费者，市场认可度高。"
    },
    {
      "name": "好易康",
      "logo": "logos/toothpaste/haoyikang.png",
      "description": "福建知名口腔护理品牌。",
      "founded": "2010年",
      "city": "福建厦门",
      "honors": "中国口腔护理知名品牌",
      "reputation": "生物活性成分，科技含量高，功效显著，消费者喜爱。"
    },
    {
      "name": "奥乐v",
      "logo": "logos/toothpaste/aolev.png",
      "description": "专业儿童口腔护理品牌。",
      "founded": "2010年",
      "city": "广东深圳",
      "honors": "中国儿童口腔护理领导品牌",
      "reputation": "专为儿童设计，安全温和，防蛀效果好，家长信赖。"
    }
  ],
  "洗衣粉": [
    {
      "name": "扇牌",
      "logo": "logos/detergent/shanpai.png",
      "description": "上海传统日化品牌。",
      "founded": "1925年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，肥皂品质好，清洁力强，消费者信赖。"
    },
    {
      "name": "白猫",
      "logo": "logos/detergent/baimao.png",
      "description": "上海老牌日化品牌。",
      "founded": "1948年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "洗洁精效果好，温和不刺激，老品牌，消费者信赖。"
    },
    {
      "name": "活力28",
      "logo": "logos/detergent/huoli28.png",
      "description": "湖北知名洗衣粉品牌。",
      "founded": "1950年",
      "city": "湖北荆州",
      "honors": "中国名牌产品",
      "reputation": "老品牌，去污力强，价格亲民，家庭主妇首选。"
    },
    {
      "name": "金鱼",
      "logo": "logos/detergent/jinyu.png",
      "description": "山东知名日化品牌。",
      "founded": "1950年",
      "city": "山东青岛",
      "honors": "山东著名商标",
      "reputation": "洗涤产品种类丰富，去污力强，价格适中，消费者喜爱。"
    },
    {
      "name": "红玫瑰",
      "logo": "logos/detergent/hongmeigui.png",
      "description": "上海传统肥皂品牌。",
      "founded": "1956年",
      "city": "上海",
      "honors": "上海著名商标",
      "reputation": "肥皂品质好，价格亲民，老品牌，消费者信赖。"
    },
    {
      "name": "红卫",
      "logo": "logos/detergent/hongwei.png",
      "description": "上海传统肥皂品牌。",
      "founded": "1958年",
      "city": "上海",
      "honors": "上海著名商标",
      "reputation": "肥皂清洁力强，经久耐用，老品牌，消费者信赖。"
    },
    {
      "name": "大运河肥皂",
      "logo": "logos/detergent/dayunhefeizao.png",
      "description": "河北传统肥皂品牌。",
      "founded": "1958年",
      "city": "河北沧州",
      "honors": "河北著名商标",
      "reputation": "肥皂去污力强，经久耐用，价格亲民，消费者喜爱。"
    },
    {
      "name": "马牌",
      "logo": "logos/detergent/mapai.png",
      "description": "山东知名日化品牌。",
      "founded": "1966年",
      "city": "山东青岛",
      "honors": "山东著名商标",
      "reputation": "鞋油效果好，护理皮革，老品牌，消费者信赖。"
    },
    {
      "name": "裕华",
      "logo": "logos/detergent/yuhua.png",
      "description": "河北知名日化品牌。",
      "founded": "1985年",
      "city": "河北石家庄",
      "honors": "河北著名商标",
      "reputation": "洗衣粉去污力强，价格亲民，适合普通家庭使用，消费者喜爱。"
    },
    {
      "name": "奇强",
      "logo": "logos/detergent/qiqiang.png",
      "description": "山西知名日化品牌。",
      "founded": "1992年",
      "city": "山西运城",
      "honors": "中国名牌产品",
      "reputation": "洗衣粉去污力强，价格适中，适合家庭使用，消费者喜爱。"
    },
    {
      "name": "绿伞",
      "logo": "logos/detergent/lvsan.png",
      "description": "北京知名日化品牌。",
      "founded": "1993年",
      "city": "北京",
      "honors": "北京著名商标",
      "reputation": "家居清洁产品种类丰富，环保配方，清洁效果好，消费者喜爱。"
    },
    {
      "name": "立白",
      "logo": "logos/detergent/libai.png",
      "description": "广东知名日化品牌。",
      "founded": "1994年",
      "city": "广东广州",
      "honors": "中国名牌产品",
      "reputation": "产品线丰富，去污力强，价格适中，市场占有率高，消费者喜爱。"
    },
    {
      "name": "纳爱斯",
      "logo": "logos/detergent/naaisi.png",
      "description": "浙江知名日化品牌。",
      "founded": "1994年",
      "city": "浙江丽水",
      "honors": "中国名牌产品",
      "reputation": "产品线全面，品质稳定，价格适中，消费者信赖。"
    },
    {
      "name": "久荣",
      "logo": "logos/detergent/jiurong.png",
      "description": "江苏知名日化品牌。",
      "founded": "1996年",
      "city": "江苏南京",
      "honors": "江苏著名商标",
      "reputation": "家居清洁产品种类丰富，清洁效果好，价格适中，消费者喜爱。"
    },
    {
      "name": "雕牌",
      "logo": "logos/detergent/diaopai.png",
      "description": "纳爱斯集团旗下洗涤品牌。",
      "founded": "1997年",
      "city": "浙江丽水",
      "honors": "中国名牌产品",
      "reputation": "洗衣粉去污力强，价格亲民，广告深入人心，消费者喜爱。"
    },
    {
      "name": "帮洁洁厕灵",
      "logo": "logos/detergent/bangjiejieceling.png",
      "description": "河北知名洁厕品牌。",
      "founded": "1997年",
      "city": "河北石家庄",
      "honors": "中国厕所清洁领导品牌",
      "reputation": "强效除垢，除菌消毒，价格适中，消费者喜爱。"
    },
    {
      "name": "超威洁厕灵",
      "logo": "logos/detergent/chaoweijieceling.png",
      "description": "立白集团旗下洁厕品牌。",
      "founded": "2002年",
      "city": "广东广州",
      "honors": "中国名牌产品",
      "reputation": "强效除垢，持久清香，除菌消毒，消费者信赖。"
    },
    {
      "name": "超能",
      "logo": "logos/detergent/chaoneng.png",
      "description": "纳爱斯集团旗下高端洗涤品牌。",
      "founded": "2006年",
      "city": "浙江丽水",
      "honors": "中国名牌产品",
      "reputation": "天然配方，温和不刺激，适合手洗和机洗，高端品质，消费者喜爱。"
    }
  ],
  "卫生纸巾": [
    {
      "name": "心相印",
      "logo": "logos/tissue/xinxiangyin.png",
      "description": "恒安集团旗下知名纸巾品牌。",
      "founded": "1985年",
      "city": "福建晋江",
      "honors": "中国名牌产品",
      "reputation": "纸巾柔软舒适，种类丰富，市场占有率高，消费者信赖。"
    },
    {
      "name": "洁伶",
      "logo": "logos/tissue/jieling.png",
      "description": "广西知名卫生巾品牌。",
      "founded": "1993年",
      "city": "广西桂林",
      "honors": "广西著名商标",
      "reputation": "卫生巾舒适透气，价格亲民，消费者喜爱。"
    },
    {
      "name": "丽邦",
      "logo": "logos/tissue/libang.png",
      "description": "河北知名纸巾品牌。",
      "founded": "1995年",
      "city": "河北保定",
      "honors": "河北著名商标",
      "reputation": "纸巾质量好，价格亲民，适合家庭使用，消费者喜爱。"
    },
    {
      "name": "洁云",
      "logo": "logos/tissue/jieyun.png",
      "description": "上海知名纸巾品牌。",
      "founded": "1996年",
      "city": "上海",
      "honors": "上海著名商标",
      "reputation": "纸巾品质好，价格适中，适合家庭使用，消费者喜爱。"
    },
    {
      "name": "洁婷",
      "logo": "logos/tissue/jieting.png",
      "description": "湖北知名卫生巾品牌。",
      "founded": "1997年",
      "city": "湖北武汉",
      "honors": "湖北著名商标",
      "reputation": "卫生巾舒适透气，吸收性好，消费者信赖。"
    },
    {
      "name": "舒莱",
      "logo": "logos/tissue/shulai.png",
      "description": "河南知名卫生巾品牌。",
      "founded": "1998年",
      "city": "河南漯河",
      "honors": "河南著名商标",
      "reputation": "卫生巾舒适透气，吸收性好，价格亲民，消费者喜爱。"
    },
    {
      "name": "倍舒特",
      "logo": "logos/tissue/beishute.png",
      "description": "北京知名卫生巾品牌。",
      "founded": "1998年",
      "city": "北京",
      "honors": "中国卫生巾行业知名品牌",
      "reputation": "卫生巾吸收性好，防侧漏，舒适透气，消费者信赖。"
    },
    {
      "name": "ABC",
      "logo": "logos/tissue/abc.png",
      "description": "广东知名卫生巾品牌。",
      "founded": "1998年",
      "city": "广东佛山",
      "honors": "中国卫生巾行业知名品牌",
      "reputation": "卫生巾舒适透气，清凉配方，年轻消费者喜爱。"
    },
    {
      "name": "洁柔",
      "logo": "logos/tissue/jierou.png",
      "description": "广东知名纸巾品牌。",
      "founded": "1999年",
      "city": "广东中山",
      "honors": "中国名牌产品",
      "reputation": "纸巾柔软亲肤，吸水性强，品质稳定，消费者信赖。"
    },
    {
      "name": "雨森",
      "logo": "logos/tissue/yusen.png",
      "description": "河北知名纸巾品牌。",
      "founded": "1999年",
      "city": "河北石家庄",
      "honors": "河北著名商标",
      "reputation": "纸巾种类丰富，性价比高，消费者喜爱。"
    },
    {
      "name": "自由点",
      "logo": "logos/tissue/ziyouxian.png",
      "description": "重庆知名卫生巾品牌。",
      "founded": "2002年",
      "city": "重庆",
      "honors": "中国卫生巾行业知名品牌",
      "reputation": "卫生巾舒适透气，吸收性好，消费者信赖。"
    },
    {
      "name": "七度空间",
      "logo": "logos/tissue/qidukongjian.png",
      "description": "恒安集团旗下高端卫生巾品牌。",
      "founded": "2002年",
      "city": "福建晋江",
      "honors": "中国名牌产品",
      "reputation": "卫生巾舒适透气，种类丰富，年轻消费者喜爱。"
    },
    {
      "name": "力邦",
      "logo": "logos/tissue/libang.png",
      "description": "河北知名纸巾品牌。",
      "founded": "2005年",
      "city": "河北保定",
      "honors": "河北著名商标",
      "reputation": "纸巾质量好，价格亲民，适合家庭使用，消费者喜爱。"
    },
    {
      "name": "爱舒乐",
      "logo": "logos/tissue/aishule.png",
      "description": "辽宁知名成人护理品牌。",
      "founded": "2008年",
      "city": "辽宁大连",
      "honors": "中国成人护理行业知名品牌",
      "reputation": "成人纸尿裤舒适透气，吸收性好，老年人信赖。"
    },
    {
      "name": "喜玫瑰",
      "logo": "logos/tissue/ximeigui.png",
      "description": "湖南知名卫生巾品牌。",
      "founded": "2010年",
      "city": "湖南长沙",
      "honors": "湖南著名商标",
      "reputation": "卫生巾舒适透气，性价比高，消费者喜爱。"
    }
  ],
  "服装": [
    {
      "name": "百年双星",
      "description": "青岛知名运动品牌。",
      "founded": "1921年",
      "city": "山东青岛",
      "honors": "中国历史文化名品",
      "reputation": "历史悠久，产品种类丰富，价格亲民，消费者信赖。"
    },
    {
      "name": "回力",
      "description": "上海知名运动鞋品牌。",
      "founded": "1927年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "帆布鞋经典时尚，舒适耐穿，价格亲民，年轻人喜爱。"
    },
    {
      "name": "飞跃",
      "description": "上海知名运动鞋品牌。",
      "founded": "1931年",
      "city": "上海",
      "honors": "中国历史文化名品",
      "reputation": "帆布鞋经典时尚，舒适耐穿，价格亲民，年轻人喜爱。"
    },
    {
      "name": "三枪",
      "description": "上海知名内衣品牌。",
      "founded": "1937年",
      "city": "上海",
      "honors": "中国名牌产品",
      "reputation": "内衣舒适透气，质量好，老品牌，消费者信赖。"
    },
    {
      "name": "多威",
      "description": "江苏知名专业跑鞋品牌。",
      "founded": "1983年",
      "city": "江苏昆山",
      "honors": "中国专业跑鞋领导品牌",
      "reputation": "专业跑鞋舒适耐穿，性能优良，运动员和跑步爱好者喜爱。"
    },
    {
      "name": "人本",
      "description": "浙江知名鞋类品牌。",
      "founded": "1986年",
      "city": "浙江温州",
      "honors": "浙江著名商标",
      "reputation": "帆布鞋舒适耐穿，价格亲民，年轻人喜爱。"
    },
    {
      "name": "贵人鸟",
      "description": "福建知名运动服装品牌。",
      "founded": "1987年",
      "city": "福建晋江",
      "honors": "中国名牌产品",
      "reputation": "运动服装舒适耐穿，性价比高，消费者信赖。"
    },
    {
      "name": "ST&SAT星期六",
      "description": "广东知名女鞋品牌。",
      "founded": "1990年",
      "city": "广东佛山",
      "honors": "中国女鞋行业知名品牌",
      "reputation": "女鞋时尚优雅，舒适耐穿，年轻女性喜爱。"
    },
    {
      "name": "安踏",
      "description": "福建知名运动服装品牌。",
      "founded": "1991年",
      "city": "福建晋江",
      "honors": "中国名牌产品",
      "reputation": "运动服装质量好，设计时尚，市场占有率高，消费者信赖。"
    },
    {
      "name": "鸿星尔克",
      "description": "福建知名运动服装品牌。",
      "founded": "2000年",
      "city": "福建厦门",
      "honors": "中国名牌产品",
      "reputation": "运动服装质量好，设计时尚，价格适中，爱国情怀浓厚，消费者喜爱。"
    },
    {
      "name": "361",
      "description": "福建知名运动服装品牌。",
      "founded": "2003年",
      "city": "福建厦门",
      "honors": "中国名牌产品",
      "reputation": "运动服装质量好，设计时尚，价格适中，消费者喜爱。"
    },
    {
      "name": "saltum",
      "description": "广东知名休闲服装品牌。",
      "founded": "2005年",
      "city": "广东广州",
      "honors": "广东著名商标",
      "reputation": "休闲服装时尚潮流，质量好，年轻人喜爱。"
    }
  ]
};