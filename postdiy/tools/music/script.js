const playlist = [
    {title: '孕期胎教--安胎#1',artist: '钢琴曲胎教音乐',cover:'img/001.gif',mp3: 'mp3/pianomusic/1.mp3',ogg: ''},
    {title: '孕期胎教--安胎（放松纯音乐）#2',artist: '钢琴曲胎教音乐',cover:'img/001.gif',mp3: 'mp3/pianomusic/2.mp3',ogg: ''},
    {title: '孕期胎教-安胎（轻音乐）#3',artist: '钢琴曲胎教音乐',cover:'img/001.gif',mp3: 'mp3/pianomusic/3.mp3',ogg: ''},
    {title: '孕期胎教--安胎（钢琴）#4',artist: '钢琴曲胎教音乐',cover:'img/001.gif',mp3: 'mp3/pianomusic/4.mp3',ogg: ''},
    {title: '孕期胎教-安胎#5',artist: '钢琴曲胎教音乐',cover:'img/001.gif',mp3: 'mp3/pianomusic/5.mp3',ogg: ''},
    {title: '孕期胎教-安胎#6',artist: '钢琴曲胎教音乐',cover:'img/001.gif',mp3: 'mp3/pianomusic/6.mp3',ogg: ''},
    {title: '孕期胎教-安胎（轻音乐）#7',artist: '钢琴曲胎教音乐',cover:'img/001.gif',mp3: 'mp3/pianomusic/7.mp3',ogg: ''},
    {title: '孕期胎教-安胎（钢琴）#8',artist: '钢琴曲胎教音乐',cover:'img/001.gif',mp3: 'mp3/pianomusic/8.mp3',ogg: ''},
    {title: 'Leopold Mozart-土耳其进行曲钢琴曲',artist: '轻松古典胎教音乐',cover:'img/gd1.jpg',mp3: 'mp3/gdtj/1.mp3',ogg: ''},
    {title: 'Libera-When A Child Is Born',artist: '轻松古典胎教音乐',cover:'img/gd2.jpg',mp3: 'mp3/gdtj/2.mp3',ogg: ''},
    {title: 'Ludwig van Beethoven-苏格兰舞曲',artist: '轻松古典胎教音乐',cover:'img/gd3.jpg',mp3: 'mp3/gdtj/3.mp3',ogg: ''},
    {title: 'Prague Chamber Orchestra-I. Allegro',artist: '轻松古典胎教音乐',cover:'img/gd4.jpg',mp3: 'mp3/gdtj/4.mp3',ogg: ''},
    {title: 'Richard Clayderman-梁祝',artist: '轻松古典胎教音乐',cover:'img/gd5.jpg',mp3: 'mp3/gdtj/5.mp3',ogg: ''},
    {title: 'Richard Clayderman-水边的阿狄丽娜',artist: '轻松古典胎教音乐',cover:'img/gd6.jpg',mp3: 'mp3/gdtj/6.mp3',ogg: ''},
    {title: '海佳-回家',artist: '轻松古典胎教音乐',cover:'img/gd7.jpg',mp3: 'mp3/gdtj/7.mp3',ogg: ''},
    {title: '莫斯科郊外的晚上',artist: '轻松古典胎教音乐',cover:'img/gd8.jpg',mp3: 'mp3/gdtj/8.mp3',ogg: ''},
    {title: '卡农钢琴版',artist: '轻松古典胎教音乐',cover:'img/gd9.jpg',mp3: 'mp3/gdtj/9.mp3',ogg: ''},
    {title: '莫扎特：D大调钢琴奏鸣曲',artist: '轻松古典胎教音乐',cover:'img/gd10.jpg',mp3: 'mp3/gdtj/10.mp3',ogg: ''},
    {title: '贝多芬欢乐颂钢琴曲',artist: '轻松古典胎教音乐',cover:'img/gd11.jpg',mp3: 'mp3/gdtj/11.mp3',ogg: ''},
    {title: 'Amadeus Mozart-Allegretto',artist: '莫扎特胎教音乐精选',cover:'img/mzt.jpg',mp3: 'mp3/mztmusic/1.mp3',ogg: ''},
    {title: 'Amadeus Mozart-Andante',artist: '莫扎特胎教音乐精选',cover:'img/mzt.jpg',mp3: 'mp3/mztmusic/2.mp3',ogg: ''},
    {title: 'Amadeus Mozart-Fantasie',artist: '莫扎特胎教音乐精选',cover:'img/mzt.jpg',mp3: 'mp3/mztmusic/3.mp3',ogg: ''}
];

$(document).ready(function() {
    if (window.MusicEffects) {
        MusicEffects.initPlayer(playlist);
        MusicEffects.init();
    }
});
