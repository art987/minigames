const playlist = [
  {title: '秋湖月夜', artist: '宫音养脾', cover: 'img/wuyin/qhyy.png', mp3: 'mp3/wuyin/qhyy.mp3', ogg: ''},
  {title: '十面埋伏', artist: '宫音养脾', cover: 'img/wuyin/smmf.png', mp3: 'mp3/wuyin/smmf.mp3', ogg: ''},
  {title: '东风破', artist: '宫音养脾', cover: 'img/wuyin/dfp.png', mp3: 'mp3/wuyin/dfp.mp3', ogg: ''},
  {title: '渔舟唱晚', artist: '宫音养脾', cover: 'img/wuyin/yzcw.png', mp3: 'mp3/wuyin/yzcw.mp3', ogg: ''},
  {title: '彩云追月', artist: '宫音养脾', cover: 'img/wuyin/cyzy.png', mp3: 'mp3/wuyin/cyzy.mp3', ogg: ''},
  {title: '梅花三弄', artist: '宫音养脾', cover: 'img/wuyin/mhsn.png', mp3: 'mp3/wuyin/mhsn.mp3', ogg: ''},
  {title: '阳春白雪', artist: '宫音养脾', cover: 'img/wuyin/ycbx.png', mp3: 'mp3/wuyin/ycbx.mp3', ogg: ''},
  {title: '汉宫秋月', artist: '宫音养脾', cover: 'img/wuyin/hgqy.png', mp3: 'mp3/wuyin/hgqy.mp3', ogg: ''},
  {title: '平沙落雁', artist: '宫音养脾', cover: 'img/wuyin/psly.png', mp3: 'mp3/wuyin/psly.mp3', ogg: ''},
  {title: '渔樵问答', artist: '宫音养脾', cover: 'img/wuyin/yqwd.png', mp3: 'mp3/wuyin/yqwd.mp3', ogg: ''},
  {title: '流水', artist: '宫音养脾', cover: 'img/wuyin/ls.png', mp3: 'mp3/wuyin/ls.mp3', ogg: ''},
  {title: '花好月圆夜', artist: '宫音养脾', cover: 'img/wuyin/hhyyy.png', mp3: 'mp3/wuyin/hhyyy.mp3', ogg: ''}
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
