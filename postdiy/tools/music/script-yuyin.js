const playlist = [
  {title: '梅花三弄', artist: '羽音养肾', cover: 'img/wuyin/mhsn.png', mp3: 'mp3/wuyin/mhsn.mp3', ogg: ''},
  {title: '一人静', artist: '羽音养肾', cover: 'img/wuyin/yrj.png', mp3: 'mp3/wuyin/yrj.mp3', ogg: ''},
  {title: '梁祝', artist: '羽音养肾', cover: 'img/wuyin/lz.png', mp3: 'mp3/wuyin/lz.mp3', ogg: ''},
  {title: '二泉映月', artist: '羽音养肾', cover: 'img/wuyin/eqyy.png', mp3: 'mp3/wuyin/eqyy.mp3', ogg: ''},
  {title: '渔舟唱晚', artist: '羽音养肾', cover: 'img/wuyin/yzcw.png', mp3: 'mp3/wuyin/yzcw.mp3', ogg: ''},
  {title: '高山流水', artist: '羽音养肾', cover: 'img/wuyin/gsls.png', mp3: 'mp3/wuyin/gsls.mp3', ogg: ''},
  {title: '月光奏鸣曲', artist: '羽音养肾', cover: 'img/wuyin/ygzmq.png', mp3: 'mp3/wuyin/ygzmq.mp3', ogg: ''},
  {title: '神秘园之歌', artist: '羽音养肾', cover: 'img/wuyin/smyzg.png', mp3: 'mp3/wuyin/smyzg.mp3', ogg: ''},
  {title: '故乡的原风景', artist: '羽音养肾', cover: 'img/wuyin/gxdyfj.png', mp3: 'mp3/wuyin/gxdyfj.mp3', ogg: ''},
  {title: '安妮的仙境', artist: '羽音养肾', cover: 'img/wuyin/andxj.png', mp3: 'mp3/wuyin/andxj.mp3', ogg: ''},
  {title: '寂静山林', artist: '羽音养肾', cover: 'img/wuyin/jjsl.png', mp3: 'mp3/wuyin/jjsl.mp3', ogg: ''},
  {title: '星空', artist: '羽音养肾', cover: 'img/wuyin/xk.png', mp3: 'mp3/wuyin/xk.mp3', ogg: ''}
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
