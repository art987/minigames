// 萨克斯世界名曲合集
// 16 首经典萨克斯名曲
const playlist = [
  {
    title: '回家',
    artist: 'Kenny G · 萨克斯名曲',
    cover: 'img/saxophone/01-going-home.svg',
    mp3: 'mp3/sakesi/01-going-home.mp3',
    ogg: '',
    album: '萨克斯世界名曲'
  },
  {
    title: '留住有情人',
    artist: 'Kenny G · 电影主题曲',
    cover: 'img/saxophone/02-dying-young.svg',
    mp3: 'mp3/sakesi/02-dying-young.mp3',
    ogg: '',
    album: 'Theme From Dying Young'
  },
  {
    title: '望春风',
    artist: 'Kenny G · 闽南语经典',
    cover: 'img/saxophone/03-wangchunfeng.svg',
    mp3: 'mp3/sakesi/03-wangchunfeng.mp3',
    ogg: '',
    album: '萨克斯世界名曲'
  },
  {
    title: '四海一家',
    artist: '传奇乐坊',
    cover: 'img/saxophone/04-sihaiyijia.svg',
    mp3: 'mp3/sakesi/04-sihaiyijia.mp3',
    ogg: '',
    album: 'We Are The World'
  },
  {
    title: '回忆',
    artist: '传奇乐坊',
    cover: 'img/saxophone/05-huiyi.svg',
    mp3: 'mp3/sakesi/05-huiyi.mp3',
    ogg: '',
    album: 'Memory'
  },
  {
    title: '巴比伦河',
    artist: '传奇乐坊',
    cover: 'img/saxophone/06-babilunhe.svg',
    mp3: 'mp3/sakesi/06-babilunhe.mp3',
    ogg: '',
    album: 'Rivers of Babylon'
  },
  {
    title: '我心永恒',
    artist: '传奇乐坊',
    cover: 'img/saxophone/07-woxinyongheng.svg',
    mp3: 'mp3/sakesi/07-woxinyongheng.mp3',
    ogg: '',
    album: 'My Heart Will Go On'
  },
  {
    title: '无心快语',
    artist: '传奇乐坊',
    cover: 'img/saxophone/08-wuxinkuaiyu.svg',
    mp3: 'mp3/sakesi/08-wuxinkuaiyu.mp3',
    ogg: '',
    album: 'Careless Whisper'
  },
  {
    title: '温柔的爱我',
    artist: '传奇乐坊',
    cover: 'img/saxophone/09-wenroudeaiwo.svg',
    mp3: 'mp3/sakesi/09-wenroudeaiwo.mp3',
    ogg: '',
    album: 'Love Me Tender'
  },
  {
    title: '瞬间',
    artist: '传奇乐坊',
    cover: 'img/saxophone/10-shunjian.svg',
    mp3: 'mp3/sakesi/10-shunjian.mp3',
    ogg: '',
    album: '萨克斯世界名曲'
  },
  {
    title: '重温旧梦',
    artist: '传奇乐坊',
    cover: 'img/saxophone/11-zhongwenjiumeng.svg',
    mp3: 'mp3/sakesi/11-zhongwenjiumeng.mp3',
    ogg: '',
    album: '萨克斯世界名曲'
  },
  {
    title: '吻别',
    artist: '萨克斯',
    cover: 'img/saxophone/13-wenbie.svg',
    mp3: 'mp3/sakesi/13-wenbie.mp3',
    ogg: '',
    album: '萨克斯世界名曲'
  },
  {
    title: '斗牛士进行曲',
    artist: '萨克斯',
    cover: 'img/saxophone/14-douniushi.svg',
    mp3: 'mp3/sakesi/14-douniushi.mp3',
    ogg: '',
    album: 'Toreador Song'
  },
  {
    title: '梁祝',
    artist: '萨克斯',
    cover: 'img/saxophone/15-liangzhu.svg',
    mp3: 'mp3/sakesi/15-liangzhu.mp3',
    ogg: '',
    album: 'Butterfly Lovers'
  },
  {
    title: '爱你',
    artist: '萨克斯天空',
    cover: 'img/saxophone/16-loving-you.svg',
    mp3: 'mp3/sakesi/16-loving-you.mp3',
    ogg: '',
    album: 'Loving You'
  }
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
