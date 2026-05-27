const playlist = [
  {
    title: '养身音乐1',
    artist: '轻音乐',
    album: '养身音乐专辑',
    cover: 'img/cover.jpg',
    mp3: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    ogg: 'http://stream.qqmusic.tc.qq.com/137192266.mp3'
  },
  {
    title: '养身音乐2',
    artist: '轻音乐',
    album: '养身音乐专辑',
    cover: 'img/cover.jpg',
    mp3: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    ogg: 'http://stream.qqmusic.tc.qq.com/137192266.mp3'
  },
  {
    title: '养身音乐3',
    artist: '轻音乐',
    album: '养身音乐专辑',
    cover: 'img/cover.jpg',
    mp3: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    ogg: 'http://stream.qqmusic.tc.qq.com/137192266.mp3'
  }
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
