const fs = require('fs');
const path = require('path');

function main() {
    try {
        const filePath = path.join(__dirname, 'brandData.js');
        console.log(`正在读取文件: ${filePath}`);
        
        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 直接修复每个品牌，一个一个处理
        const brandsToFix = [
            {cn: '百雀羚', en: 'baiqueling'},
            {cn: '相宜本草', en: 'xiangyibencao'},
            {cn: '丁家宜', en: 'dingjiayi'},
            {cn: '佰草集', en: 'baicaoji'},
            {cn: '韩束', en: 'hanshu'},
            {cn: '双妹', en: 'shuangmei'},
            {cn: '美加净', en: 'meijiajing'},
            {cn: '欧诗漫', en: 'oushiman'},
            {cn: '采诗', en: 'caishi'},
            {cn: '珀莱雅', en: 'polaiya'},
            {cn: '水密码', en: 'shuimima'},
            {cn: '润本', en: 'runben'},
            {cn: '启初', en: 'qichu'},
            {cn: '薇诺娜', en: 'weinuona'},
            {cn: '高姿', en: 'gaozi'},
            {cn: '健美创研', en: 'jianmeichuangyan'},
            {cn: '馥珮', en: 'fupei'},
            {cn: '京润', en: 'jingrun'},
            {cn: '御泥坊', en: 'yunifang'},
            {cn: '大水滴', en: 'dashuidi'},
            {cn: '花瑶花', en: 'huayaohua'},
            {cn: '美肤宝', en: 'meifubao'},
            {cn: '法兰琳卡', en: 'falanlinka'},
            {cn: '林清轩', en: 'linqingxuan'},
            {cn: '永芳', en: 'yongfang'},
            {cn: '衡美肤', en: 'hengmeifu'},
            {cn: '月里嫦娥', en: 'yuelichang-e'},
            {cn: '七日香', en: 'qirixiang'},
            {cn: '春娟', en: 'chunjuan'},
            {cn: '雅霜', en: 'yashuang'},
            {cn: '迷奇', en: 'miqi'},
            {cn: '兰亭', en: 'lanting'},
            {cn: '万紫千红', en: 'wanziqianhong'},
            {cn: '京卫本草', en: 'jingweibencao'},
            {cn: '宫灯', en: 'gongdeng'},
            {cn: '森宝', en: 'senbao'},
            {cn: '西施美', en: 'xishimei'},
            {cn: '标婷', en: 'biaoting'},
            {cn: '孔凤春', en: 'kongfengchun'},
            {cn: '戴春林', en: 'daichunlin'},
            {cn: '片仔癀', en: 'pianzaihuang'},
            {cn: '隆力奇', en: 'longliqi'},
            {cn: '东洋之花', en: 'dongyangzhihua'},
            {cn: '青蛙王子', en: 'qingwawangzi'},
            {cn: '孩儿面', en: 'haiermian'},
            {cn: '红色小象', en: 'hongsexiaoxiang'}
        ];
        
        console.log('开始修复每个品牌...');
        for (const brand of brandsToFix) {
            // 处理重复logo字段并规范化路径
            const oldStr = `{name: "${brand.cn}", logo: "images/skincare/logos/${brand.cn}.png", logo: "images/skincare/logos/${brand.cn}.png",`;
            const newStr = `{name: "${brand.cn}", logo: "logos/skincare/${brand.en}.png",`;
            content = content.replace(oldStr, newStr);
            console.log(`已修复品牌: ${brand.cn}`);
        }
        
        // 修复window对象引用
        content = content.replace(/window\./g, '');
        
        // 写入修复后的内容
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('所有品牌修复完成！brandData.js文件已成功更新。');
        
    } catch (error) {
        console.error('修复过程中出现错误:', error.message);
    }
}

main();