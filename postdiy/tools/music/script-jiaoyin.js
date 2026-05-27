const playlist = [
  {title: '胡笳十八拍', artist: '角音疗肝', cover: 'img/wuyin/hjsbp.png', mp3: 'mp3/wuyin/hjspb.mp3', ogg: ''},
  {title: '春江花月夜', artist: '角音疗肝', cover: 'img/wuyin/cjhyy.png', mp3: 'mp3/wuyin/cjjyhy.mp3', ogg: ''},
  {title: '一花一世界', artist: '角音疗肝', cover: 'img/wuyin/yhysj.png', mp3: 'mp3/wuyin/yhysj.mp3', ogg: ''},
  {title: '紫竹调', artist: '角音疗肝', cover: 'img/wuyin/zzd.png', mp3: 'mp3/wuyin/zzd.mp3', ogg: ''},
  {title: '列子御风', artist: '角音疗肝', cover: 'img/wuyin/lzyf.png', mp3: 'mp3/wuyin/lzyf.mp3', ogg: ''},
  {title: '庄周梦蝶', artist: '角音疗肝', cover: 'img/wuyin/zzmd.png', mp3: 'mp3/wuyin/zzmd.mp3', ogg: ''},
  {title: '平沙落雁', artist: '角音疗肝', cover: 'img/wuyin/psly.png', mp3: 'mp3/wuyin/psly.mp3', ogg: ''},
  {title: '渔樵问答', artist: '角音疗肝', cover: 'img/wuyin/yqwd.png', mp3: 'mp3/wuyin/yqwd.mp3', ogg: ''},
  {title: '流水', artist: '角音疗肝', cover: 'img/wuyin/ls.png', mp3: 'mp3/wuyin/ls.mp3', ogg: ''},
  {title: '梅花三弄', artist: '角音疗肝', cover: 'img/wuyin/mhsn.png', mp3: 'mp3/wuyin/mhsn.mp3', ogg: ''},
  {title: '阳春白雪', artist: '角音疗肝', cover: 'img/wuyin/ycbx.png', mp3: 'mp3/wuyin/ycbx.mp3', ogg: ''},
  {title: '汉宫秋月', artist: '角音疗肝', cover: 'img/wuyin/hgqy.png', mp3: 'mp3/wuyin/hgqy.mp3', ogg: ''}
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
