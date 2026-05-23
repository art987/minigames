(function($){
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = false,
        playlist = [
  // 自然天籁
  {title: '森林狂想曲', artist: '自然天籁', cover: 'img/slkxq.jpg', mp3: 'mp3/liaoyu/slkxq.mp3', ogg: ''},
  {title: '鸟之诗', artist: '自然天籁', cover: 'img/nzs.jpg', mp3: 'mp3/liaoyu/nzs.mp3', ogg: ''},
  {title: '风的呢喃', artist: '自然天籁', cover: 'img/fdnn.jpg', mp3: 'mp3/liaoyu/fdnn.mp3', ogg: ''},
  {title: '雨的印记', artist: '自然天籁', cover: 'img/ydyj.jpg', mp3: 'mp3/liaoyu/ydyj.mp3', ogg: ''},
  {title: '海浪之声', artist: '自然天籁', cover: 'img/hlzs.jpg', mp3: 'mp3/liaoyu/hlzs.mp3', ogg: ''},
  {title: '溪流潺潺', artist: '自然天籁', cover: 'img/xlcc.jpg', mp3: 'mp3/liaoyu/xlcc.mp3', ogg: ''},
  {title: '夏夜虫鸣', artist: '自然天籁', cover: 'img/xycm.jpg', mp3: 'mp3/liaoyu/xycm.mp3', ogg: ''},
  {title: '清晨森林', artist: '自然天籁', cover: 'img/qcsl.jpg', mp3: 'mp3/liaoyu/qcsl.mp3', ogg: ''},

  // 瑜伽冥想
  {title: '神秘园之歌', artist: '瑜伽冥想', cover: 'img/smyzg.jpg', mp3: 'mp3/liaoyu/smyzg.mp3', ogg: ''},
  {title: '故乡的原风景', artist: '瑜伽冥想', cover: 'img/gxdyfj.jpg', mp3: 'mp3/liaoyu/gxdyfj.mp3', ogg: ''},
  {title: '安妮的仙境', artist: '瑜伽冥想', cover: 'img/andxj.jpg', mp3: 'mp3/liaoyu/andxj.mp3', ogg: ''},
  {title: '寂静山林', artist: '瑜伽冥想', cover: 'img/jjsl.jpg', mp3: 'mp3/liaoyu/jjsl.mp3', ogg: ''},
  {title: '追梦人', artist: '瑜伽冥想', cover: 'img/zmr.jpg', mp3: 'mp3/liaoyu/zmr.mp3', ogg: ''},
  {title: '星空', artist: '瑜伽冥想', cover: 'img/xk.jpg', mp3: 'mp3/liaoyu/xk.mp3', ogg: ''},
  {title: '月光边境', artist: '瑜伽冥想', cover: 'img/ygbj.jpg', mp3: 'mp3/liaoyu/ygbj.mp3', ogg: ''},
  {title: '和兰花在一起', artist: '瑜伽冥想', cover: 'img/hlhyzq.jpg', mp3: 'mp3/liaoyu/hlhyzq.mp3', ogg: ''},

  // 儿童安抚
  {title: '摇篮曲（勃拉姆斯）', artist: '儿童安抚', cover: 'img/ylq.jpg', mp3: 'mp3/liaoyu/ylq.mp3', ogg: ''},
  {title: '小星星变奏曲', artist: '儿童安抚', cover: 'img/xxxbzq.jpg', mp3: 'mp3/liaoyu/xxxbzq.mp3', ogg: ''},
  {title: '宝宝的异想世界', artist: '儿童安抚', cover: 'img/bbdyxsj.jpg', mp3: 'mp3/liaoyu/bbdyxsj.mp3', ogg: ''},
  {title: '爱的协奏曲', artist: '儿童安抚', cover: 'img/adxzq.jpg', mp3: 'mp3/liaoyu/adxzq.mp3', ogg: ''},
  {title: '雪之梦', artist: '儿童安抚', cover: 'img/xzm.jpg', mp3: 'mp3/liaoyu/xzm.mp3', ogg: ''},
  {title: '风之谷', artist: '儿童安抚', cover: 'img/fzg.jpg', mp3: 'mp3/liaoyu/fzg.mp3', ogg: ''},
  {title: '卡农（钢琴版）', artist: '儿童安抚', cover: 'img/kn.jpg', mp3: 'mp3/liaoyu/kn.mp3', ogg: ''},
  {title: '森林小夜曲', artist: '儿童安抚', cover: 'img/slxyq.jpg', mp3: 'mp3/liaoyu/slxyq.mp3', ogg: ''},

  // 情绪振奋
  {title: '命运交响曲（贝多芬）', artist: '情绪振奋', cover: 'img/myjyq.jpg', mp3: 'mp3/liaoyu/myjyq.mp3', ogg: ''},
  {title: '英雄交响曲（贝多芬）', artist: '情绪振奋', cover: 'img/yxjyq.jpg', mp3: 'mp3/liaoyu/yxjyq.mp3', ogg: ''},
  {title: '拉德斯基进行曲', artist: '情绪振奋', cover: 'img/ldsjjxq.jpg', mp3: 'mp3/liaoyu/ldsjjxq.mp3', ogg: ''},
  {title: '春节序曲', artist: '情绪振奋', cover: 'img/cjxq.jpg', mp3: 'mp3/liaoyu/cjxq.mp3', ogg: ''},
  {title: '光明行', artist: '情绪振奋', cover: 'img/gmx.jpg', mp3: 'mp3/liaoyu/gmx.mp3', ogg: ''},
  {title: '彩云追月', artist: '情绪振奋', cover: 'img/cyzy.jpg', mp3: 'mp3/liaoyu/cyzy.mp3', ogg: ''},
  {title: '金蛇狂舞', artist: '情绪振奋', cover: 'img/jskw.jpg', mp3: 'mp3/liaoyu/jskw.mp3', ogg: ''},
  {title: '运动员进行曲', artist: '情绪振奋', cover: 'img/ydyjxq.jpg', mp3: 'mp3/liaoyu/ydyjxq.mp3', ogg: ''},

  // 压力缓解
  {title: '神秘园之歌', artist: '压力缓解', cover: 'img/smyzg.jpg', mp3: 'mp3/liaoyu/smyzg.mp3', ogg: ''},
  {title: '夜的钢琴曲五', artist: '压力缓解', cover: 'img/ydgqqw.jpg', mp3: 'mp3/liaoyu/ydgqqw.mp3', ogg: ''},
  {title: '水边的阿狄丽娜', artist: '压力缓解', cover: 'img/sbddaln.jpg', mp3: 'mp3/liaoyu/sbddaln.mp3', ogg: ''},
  {title: '星空下的爱', artist: '压力缓解', cover: 'img/xkxdai.jpg', mp3: 'mp3/liaoyu/xkxdai.mp3', ogg: ''},
  {title: '梦中的婚礼', artist: '压力缓解', cover: 'img/mzdhl.jpg', mp3: 'mp3/liaoyu/mzdhl.mp3', ogg: ''},
  {title: '风居住的街道', artist: '压力缓解', cover: 'img/fjzdjd.jpg', mp3: 'mp3/liaoyu/fjzdjd.mp3', ogg: ''},
  {title: 'River Flows In You', artist: '压力缓解', cover: 'img/rfiy.jpg', mp3: 'mp3/liaoyu/rfiy.mp3', ogg: ''},
  {title: '琵琶语', artist: '压力缓解', cover: 'img/ppy.jpg', mp3: 'mp3/liaoyu/ppy.mp3', ogg: ''},

  // 睡眠助眠
  {title: '寂静之音', artist: '睡眠助眠', cover: 'img/jjzy.jpg', mp3: 'mp3/liaoyu/jjzy.mp3', ogg: ''},
  {title: '神秘园之歌', artist: '睡眠助眠', cover: 'img/smyzg.jpg', mp3: 'mp3/liaoyu/smyzg.mp3', ogg: ''},
  {title: '夜曲（肖邦）', artist: '睡眠助眠', cover: 'img/yq.jpg', mp3: 'mp3/liaoyu/yq.mp3', ogg: ''},
  {title: '月光奏鸣曲（贝多芬）', artist: '睡眠助眠', cover: 'img/ygzmq.jpg', mp3: 'mp3/liaoyu/ygzmq.mp3', ogg: ''},
  {title: '星空夜曲', artist: '睡眠助眠', cover: 'img/xkyq.jpg', mp3: 'mp3/liaoyu/xkyq.mp3', ogg: ''},
  {title: '梦的摇篮', artist: '睡眠助眠', cover: 'img/mdyl.jpg', mp3: 'mp3/liaoyu/mdyl.mp3', ogg: ''},
  {title: '安魂曲（莫扎特）', artist: '睡眠助眠', cover: 'img/ahq.jpg', mp3: 'mp3/liaoyu/ahq.mp3', ogg: ''},
  {title: '夜的乐章', artist: '睡眠助眠', cover: 'img/ydyz.jpg', mp3: 'mp3/liaoyu/ydyz.mp3', ogg: ''},

  // 注意力集中
  {title: '阿尔法脑波音乐', artist: '注意力集中', cover: 'img/afnbyy.jpg', mp3: 'mp3/liaoyu/afnbyy.mp3', ogg: ''},
  {title: '巴洛克音乐', artist: '注意力集中', cover: 'img/blkyy.jpg', mp3: 'mp3/liaoyu/blkyy.mp3', ogg: ''},
  {title: '神秘园之歌', artist: '注意力集中', cover: 'img/smyzg.jpg', mp3: 'mp3/liaoyu/smyzg.mp3', ogg: ''},
  {title: '故乡的原风景', artist: '注意力集中', cover: 'img/gxdyfj.jpg', mp3: 'mp3/liaoyu/gxdyfj.mp3', ogg: ''},
  {title: '安妮的仙境', artist: '注意力集中', cover: 'img/andxj.jpg', mp3: 'mp3/liaoyu/andxj.mp3', ogg: ''},
  {title: '寂静山林', artist: '注意力集中', cover: 'img/jjsl.jpg', mp3: 'mp3/liaoyu/jjsl.mp3', ogg: ''},
  {title: '星空', artist: '注意力集中', cover: 'img/xk.jpg', mp3: 'mp3/liaoyu/xk.mp3', ogg: ''},
  {title: '和兰花在一起', artist: '注意力集中', cover: 'img/hlhyzq.jpg', mp3: 'mp3/liaoyu/hlhyzq.mp3', ogg: ''},

  // 情感治愈
  {title: '爱的致意', artist: '情感治愈', cover: 'img/adzy.jpg', mp3: 'mp3/liaoyu/adzy.mp3', ogg: ''},
  {title: '致爱丽丝', artist: '情感治愈', cover: 'img/zals.jpg', mp3: 'mp3/liaoyu/zals.mp3', ogg: ''},
  {title: '神秘园之歌', artist: '情感治愈', cover: 'img/smyzg.jpg', mp3: 'mp3/liaoyu/smyzg.mp3', ogg: ''},
  {title: '故乡的原风景', artist: '情感治愈', cover: 'img/gxdyfj.jpg', mp3: 'mp3/liaoyu/gxdyfj.mp3', ogg: ''},
  {title: '安妮的仙境', artist: '情感治愈', cover: 'img/andxj.jpg', mp3: 'mp3/liaoyu/andxj.mp3', ogg: ''},
  {title: '寂静山林', artist: '情感治愈', cover: 'img/jjsl.jpg', mp3: 'mp3/liaoyu/jjsl.mp3', ogg: ''},
  {title: '星空', artist: '情感治愈', cover: 'img/xk.jpg', mp3: 'mp3/liaoyu/xk.mp3', ogg: ''},
  {title: '和兰花在一起', artist: '情感治愈', cover: 'img/hlhyzq.jpg', mp3: 'mp3/liaoyu/hlhyzq.mp3', ogg: ''},

  // 民族特色
  {title: '彩云之南', artist: '民族特色', cover: 'img/cyzn.jpg', mp3: 'mp3/liaoyu/cyzn.mp3', ogg: ''},
  {title: '赛马', artist: '民族特色', cover: 'img/sm.jpg', mp3: 'mp3/liaoyu/sm.mp3', ogg: ''},
  {title: '彝族舞曲', artist: '民族特色', cover: 'img/yzwq.jpg', mp3: 'mp3/liaoyu/yzwq.mp3', ogg: ''},
  {title: '瑶族舞曲', artist: '民族特色', cover: 'img/yzwq.jpg', mp3: 'mp3/liaoyu/yzwq.mp3', ogg: ''},
  {title: '彩云追月（广东音乐）', artist: '民族特色', cover: 'img/cyzygd.jpg', mp3: 'mp3/liaoyu/cyzygd.mp3', ogg: ''},
  {title: '翻身的日子', artist: '民族特色', cover: 'img/fsdrz.jpg', mp3: 'mp3/liaoyu/fsdrz.mp3', ogg: ''},
  {title: '姑苏行', artist: '民族特色', cover: 'img/gsx.jpg', mp3: 'mp3/liaoyu/gsx.mp3', ogg: ''},
  {title: '阿里山的姑娘', artist: '民族特色', cover: 'img/alsdgn.jpg', mp3: 'mp3/liaoyu/alsdgn.mp3', ogg: ''}
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







