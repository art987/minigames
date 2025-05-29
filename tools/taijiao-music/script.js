(function($){
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = false,
        playlist = [
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

    // 加载带缩略图的播放列表
    for (var i = 0; i < playlist.length; i++) {
        var item = playlist[i];
        var li = $(
            '<li>' +
            '  <div class="thumbnail" style="background-image:url(' + (item.cover || 'img/default-cover.jpg') + ')"></div>' +
            '  <div class="song-info">' +
            '    <div class="song-title">' + item.title + '</div>' +
            '    <div class="song-artist">' + item.artist + '</div>' +
            '  </div>' +
            '</li>'
        );
        li.data('index', i);
        $('#playlist').append(li);
    }

    var time = new Date(),
        currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
        trigger = false,
        audio, timeout, isPlaying = false, playCounts;

    // 播放功能
    var play = function() {
        if (audio) {
            var playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    $('.playback').addClass('playing');
                    $('#playButton').text('⏸').removeClass('play-button').addClass('pause-button');
                    timeout = setInterval(updateProgress, 500);
                    isPlaying = true;
                }).catch(error => {
                    $('#playButton').text('关闭静音').addClass('play-button').removeClass('pause-button').removeClass('hidden');
                });
            }
        }
    };

    // 暂停功能
    var pause = function() {
        if (audio) {
            audio.pause();
            $('.playback').removeClass('playing');
            $('#playButton').text('播放音乐').removeClass('pause-button').addClass('play-button');
            clearInterval(timeout);
            isPlaying = false;
        }
    };

    // 更新进度条
    var setProgress = function(value) {
        if (audio) {
            var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60),
                ratio = value / audio.duration * 100;

            $('.timer').html(parseInt(value / 60) + ':' + currentSec);
            $('.progress .pace').css('width', ratio + '%');
            $('.progress .slider a').css('left', ratio + '%');
        }
    };

    var updateProgress = function() {
        if (audio) {
            setProgress(audio.currentTime);
        }
    };

    // 进度条滑块
    $('.progress .slider').slider({
        step: 0.1,
        slide: function(event, ui) {
            $(this).addClass('enable');
            setProgress(audio.duration * ui.value / 100);
            clearInterval(timeout);
        },
        stop: function(event, ui) {
            if (audio) {
                audio.currentTime = audio.duration * ui.value / 100;
            }
            $(this).removeClass('enable');
            timeout = setInterval(updateProgress, 500);
        }
    });

    // 音量控制
    var setVolume = function(value) {
        if (audio) {
            audio.volume = localStorage.volume = value;
        }
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    };

    var volume = localStorage.volume || 0.5;
    $('.volume .slider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: volume,
        slide: function(event, ui) {
            setVolume(ui.value);
            $(this).addClass('enable');
            $('.mute').removeClass('enable');
        },
        stop: function() {
            $(this).removeClass('enable');
        }
    }).children('.pace').css('width', volume * 100 + '%');

    $('.mute').click(function() {
        if ($(this).hasClass('enable')) {
            setVolume($(this).data('volume'));
            $(this).removeClass('enable');
        } else {
            $(this).data('volume', audio ? audio.volume : volume).addClass('enable');
            setVolume(0);
        }
    });

    // 切换歌曲
    var switchTrack = function(i) {
        if (i < 0) {
            track = currentTrack = playlist.length - 1;
        } else if (i >= playlist.length) {
            track = currentTrack = 0;
        } else {
            track = i;
        }

        $('audio').remove();
        loadMusic(track);
        $('#playlist li').removeClass('playing').eq(track).addClass('playing');
        
        if (isPlaying == true) {
            setTimeout(play, 100);
        }
    };

    // 随机播放
    var shufflePlay = function() {
        var time = new Date(),
            lastTrack = currentTrack;
        currentTrack = time.getTime() % playlist.length;
        if (lastTrack == currentTrack) ++currentTrack;
        switchTrack(currentTrack);
    };

    // 歌曲结束处理
    var ended = function() {
        pause();
        if (audio) {
            audio.currentTime = 0;
        }
        playCounts++;
        if (continous == true) isPlaying = true;
        if (repeat == 1) {
            play();
        } else {
            if (shuffle === 'true') {
                shufflePlay();
            } else {
                if (repeat == 2) {
                    switchTrack(++currentTrack);
                } else {
                    if (currentTrack < playlist.length) switchTrack(++currentTrack);
                }
            }
        }
    };

    var beforeLoad = function() {
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) + '%');
    };

    var afterLoad = function() {
        // 不自动播放
    };

    // 加载音乐
    var loadMusic = function(i) {
        var item = playlist[i],
            newaudio = $('<audio>').html('<source src="' + item.mp3 + '"><source src="' + item.ogg + '">').appendTo('#player');
        
        $('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
        $('.tag').html('<strong>' + item.title + '</strong><span class="artist">' + item.artist + '</span>');
        
        audio = newaudio[0];
        audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
        audio.addEventListener('progress', beforeLoad, false);
        audio.addEventListener('durationchange', beforeLoad, false);
        audio.addEventListener('canplay', afterLoad, false);
        audio.addEventListener('ended', ended, false);
    };

    // 初始化播放器
    loadMusic(currentTrack);
    
    // 播放控制
    $('.playback').on('click', function() {
        if ($(this).hasClass('playing')) {
            pause();
        } else {
            play();
        }
    });
    
    $('.rewind').on('click', function() {
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(--currentTrack);
        }
    });
    
    $('.fastforward').on('click', function() {
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(++currentTrack);
        }
    });
    
    // 播放列表点击事件
    $('#playlist').on('click', 'li', function() {
        var index = $(this).data('index');
        switchTrack(index);
    });

    // 初始随机/重复状态
    if (shuffle === 'true') $('.shuffle').addClass('enable');
    if (repeat == 1) {
        $('.repeat').addClass('once');
    } else if (repeat == 2) {
        $('.repeat').addClass('all');
    }

    // 重复按钮
    $('.repeat').on('click', function() {
        if ($(this).hasClass('once')) {
            repeat = localStorage.repeat = 2;
            $(this).removeClass('once').addClass('all');
        } else if ($(this).hasClass('all')) {
            repeat = localStorage.repeat = 0;
            $(this).removeClass('all');
        } else {
            repeat = localStorage.repeat = 1;
            $(this).addClass('once');
        }
    });

    // 随机按钮
    $('.shuffle').on('click', function() {
        if ($(this).hasClass('enable')) {
            shuffle = localStorage.shuffle = 'false';
            $(this).removeClass('enable');
        } else {
            shuffle = localStorage.shuffle = 'true';
            $(this).addClass('enable');
        }
    });

    // 播放按钮处理
    $(document).ready(function() {
        $('#playButton').text('播放音乐').addClass('play-button').removeClass('hidden');
        
        $('#playButton').on('click', function() {
            if ($(this).hasClass('play-button')) {
                play();
            } else {
                pause();
            }
        });
        
        if (localStorage.getItem('playButtonClicked') === 'true') {
            play();
        }
    });

    // 暴露全局函数
    window.play = play;
    window.pause = pause;
})(jQuery);







