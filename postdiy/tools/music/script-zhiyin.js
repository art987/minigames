const playlist = [
  {title: '百鸟朝凤', artist: '徵音养心', cover: 'img/wuyin/bncf.png', mp3: 'mp3/wuyin/bncf.mp3', ogg: ''},
  {title: '琵琶泉', artist: '徵音养心', cover: 'img/wuyin/ppq.png', mp3: 'mp3/wuyin/ppq.mp3', ogg: ''},
  {title: '彩云追月', artist: '徵音养心', cover: 'img/wuyin/cyzy.png', mp3: 'mp3/wuyin/cyzy.mp3', ogg: ''},
  {title: '金蛇狂舞', artist: '徵音养心', cover: 'img/wuyin/jskw.png', mp3: 'mp3/wuyin/jskw.mp3', ogg: ''},
  {title: '春节序曲', artist: '徵音养心', cover: 'img/wuyin/cjxq.png', mp3: 'mp3/wuyin/cjxq.mp3', ogg: ''},
  {title: '步步高', artist: '徵音养心', cover: 'img/wuyin/bbg.png', mp3: 'mp3/wuyin/bbg.mp3', ogg: ''},
  {title: '花好月圆夜', artist: '徵音养心', cover: 'img/wuyin/hhyyy.png', mp3: 'mp3/wuyin/hhyyy.mp3', ogg: ''},
  {title: '喜洋洋', artist: '徵音养心', cover: 'img/wuyin/xyy.png', mp3: 'mp3/wuyin/xyy.mp3', ogg: ''},
  {title: '彩云追月', artist: '徵音养心', cover: 'img/wuyin/cyzy.png', mp3: 'mp3/wuyin/cyzygd.mp3', ogg: ''},
  {title: '翻身的日子', artist: '徵音养心', cover: 'img/wuyin/fsdrz.png', mp3: 'mp3/wuyin/fsdrz.mp3', ogg: ''},
  {title: '姑苏行', artist: '徵音养心', cover: 'img/wuyin/gsx.png', mp3: 'mp3/wuyin/gsx.mp3', ogg: ''},
  {title: '阿里山的姑娘', artist: '徵音养心', cover: 'img/wuyin/alsdgn.png', mp3: 'mp3/wuyin/alsdgn.mp3', ogg: ''}
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
