const playlist = [
  {title: '阳春白雪', artist: '商音润肺', cover: 'img/wuyin/ycbx.png', mp3: 'mp3/wuyin/ycbx.mp3', ogg: ''},
  {title: '绣金匾', artist: '商音润肺', cover: 'img/wuyin/xjb.png', mp3: 'mp3/wuyin/xjb.mp3', ogg: ''},
  {title: '声声慢', artist: '商音润肺', cover: 'img/wuyin/ssm.png', mp3: 'mp3/wuyin/ssm.mp3', ogg: ''},
  {title: '渔歌', artist: '商音润肺', cover: 'img/wuyin/yg.png', mp3: 'mp3/wuyin/yg.mp3', ogg: ''},
  {title: '秋鸿', artist: '商音润肺', cover: 'img/wuyin/qh.png', mp3: 'mp3/wuyin/qh.mp3', ogg: ''},
  {title: '将军令', artist: '商音润肺', cover: 'img/wuyin/jjl.png', mp3: 'mp3/wuyin/jjl.mp3', ogg: ''},
  {title: '广陵散', artist: '商音润肺', cover: 'img/wuyin/gls.png', mp3: 'mp3/wuyin/gls.mp3', ogg: ''},
  {title: '十面埋伏', artist: '商音润肺', cover: 'img/wuyin/smmf.png', mp3: 'mp3/wuyin/smmf.mp3', ogg: ''},
  {title: '梅花三弄', artist: '商音润肺', cover: 'img/wuyin/mhsn.png', mp3: 'mp3/wuyin/mhsn.mp3', ogg: ''},
  {title: '阳春白雪（琵琶版）', artist: '商音润肺', cover: 'img/wuyin/ycbx.png', mp3: 'mp3/wuyin/ycbxpp.mp3', ogg: ''},
  {title: '汉宫秋月', artist: '商音润肺', cover: 'img/wuyin/hgqy.png', mp3: 'mp3/wuyin/hgqy.mp3', ogg: ''},
  {title: '平沙落雁', artist: '商音润肺', cover: 'img/wuyin/psly.png', mp3: 'mp3/wuyin/psly.mp3', ogg: ''},
  {title: '渔樵问答', artist: '商音润肺', cover: 'img/wuyin/yqwd.png', mp3: 'mp3/wuyin/yqwd.mp3', ogg: ''},
  {title: '流水', artist: '商音润肺', cover: 'img/wuyin/ls.png', mp3: 'mp3/wuyin/ls.mp3', ogg: ''}
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
