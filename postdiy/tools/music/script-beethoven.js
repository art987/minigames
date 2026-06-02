// 贝多芬经典钢琴合集
// 12 首传世名作，演奏者：SculpturedSound (公版录音)
const playlist = [
  {
    title: '致爱丽丝',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/01-fuer-elise.svg',
    mp3: 'mp3/beethoven/01-fuer-elise.mp3',
    ogg: '',
    album: '贝多芬钢琴作品 · WoO 59 · 1810'
  },
  {
    title: '月光奏鸣曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/02-moonlight.svg',
    mp3: 'mp3/beethoven/02-moonlight.mp3',
    ogg: '',
    album: '贝多芬钢琴作品 · Op.27 No.2 · 1801'
  },
  {
    title: '悲怆奏鸣曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/03-pathetique.svg',
    mp3: 'mp3/beethoven/03-pathetique.mp3',
    ogg: '',
    album: '贝多芬钢琴作品 · Op.13 · 1798'
  },
  {
    title: '田园奏鸣曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/04-pastoral.svg',
    mp3: 'mp3/beethoven/04-pastoral.mp3',
    ogg: '',
    album: '贝多芬钢琴作品 · Op.28 · 1801'
  },
  {
    title: '热情奏鸣曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/05-appassionata.svg',
    mp3: 'mp3/beethoven/05-appassionata.mp3',
    ogg: '',
    album: '贝多芬钢琴作品 · Op.57 · 1805'
  },
  {
    title: '巴格泰莱舞曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/06-bagatelles.svg',
    mp3: 'mp3/beethoven/06-bagatelles.mp3',
    ogg: '',
    album: '贝多芬钢琴作品 · Op.119 · 1822'
  },
  {
    title: '小步舞曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/07-minuet.svg',
    mp3: 'mp3/beethoven/07-minuet.mp3',
    ogg: '',
    album: '贝多芬钢琴作品 · WoO 10 No.2 · 1795'
  },
  {
    title: '土耳其进行曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/08-turkish-march.svg',
    mp3: 'mp3/beethoven/08-turkish-march.mp3',
    ogg: '',
    album: '贝多芬钢琴作品 · Op.113 · 1811'
  },
  {
    title: 'F小调奏鸣曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/09-f-minor.svg',
    mp3: 'mp3/beethoven/09-f-minor.mp3',
    ogg: '',
    album: '贝多芬钢琴奏鸣曲 No.1 · Op.2 No.1 · 1795'
  },
  {
    title: 'D大调奏鸣曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/10-d-major.svg',
    mp3: 'mp3/beethoven/10-d-major.mp3',
    ogg: '',
    album: '贝多芬钢琴奏鸣曲 No.7 · Op.10 No.3 · 1798'
  },
  {
    title: '皇帝协奏曲（钢琴独奏部分）',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/11-emperor.svg',
    mp3: 'mp3/beethoven/11-emperor.mp3',
    ogg: '',
    album: '贝多芬钢琴协奏曲 No.5 · Op.73 · 1809'
  },
  {
    title: '普罗姆修斯变奏曲',
    artist: 'Ludwig van Beethoven · 公版录音',
    cover: 'img/beethoven/12-eroica.svg',
    mp3: 'mp3/beethoven/12-eroica.mp3',
    ogg: '',
    album: '贝多芬英雄变奏曲 · Op.35 · 1802'
  }
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
