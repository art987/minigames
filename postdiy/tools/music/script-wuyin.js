(function($){
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = false,
        playlist = [
  // 角音疗肝
  {title: '胡笳十八拍', artist: '角音疗肝', cover: 'img/hjspb.jpg', mp3: 'mp3/wuyin/hjspb.mp3', ogg: ''},
  {title: '春江花月夜', artist: '角音疗肝', cover: 'img/cjjyhy.jpg', mp3: 'mp3/wuyin/cjjyhy.mp3', ogg: ''},
  {title: '一花一世界', artist: '角音疗肝', cover: 'img/yhysj.jpg', mp3: 'mp3/wuyin/yhysj.mp3', ogg: ''},
  {title: '紫竹调', artist: '角音疗肝', cover: 'img/zzd.jpg', mp3: 'mp3/wuyin/zzd.mp3', ogg: ''},
  {title: '列子御风', artist: '角音疗肝', cover: 'img/lzyf.jpg', mp3: 'mp3/wuyin/lzyf.mp3', ogg: ''},
  {title: '庄周梦蝶', artist: '角音疗肝', cover: 'img/zzmd.jpg', mp3: 'mp3/wuyin/zzmd.mp3', ogg: ''},
  {title: '平沙落雁', artist: '角音疗肝', cover: 'img/psly.jpg', mp3: 'mp3/wuyin/psly.mp3', ogg: ''},
  {title: '渔樵问答', artist: '角音疗肝', cover: 'img/yqwd.jpg', mp3: 'mp3/wuyin/yqwd.mp3', ogg: ''},
  {title: '流水', artist: '角音疗肝', cover: 'img/ls.jpg', mp3: 'mp3/wuyin/ls.mp3', ogg: ''},
  {title: '梅花三弄', artist: '角音疗肝', cover: 'img/mhsn.jpg', mp3: 'mp3/wuyin/mhsn.mp3', ogg: ''},
  {title: '阳春白雪', artist: '角音疗肝', cover: 'img/ycbx.jpg', mp3: 'mp3/wuyin/ycbx.mp3', ogg: ''},
  {title: '汉宫秋月', artist: '角音疗肝', cover: 'img/hgqy.jpg', mp3: 'mp3/wuyin/hgqy.mp3', ogg: ''},

  // 徵音养心
  {title: '百鸟朝凤', artist: '徵音养心', cover: 'img/bncf.jpg', mp3: 'mp3/wuyin/bncf.mp3', ogg: ''},
  {title: '琵琶泉', artist: '徵音养心', cover: 'img/ppq.jpg', mp3: 'mp3/wuyin/ppq.mp3', ogg: ''},
  {title: '彩云追月', artist: '徵音养心', cover: 'img/cyzy.jpg', mp3: 'mp3/wuyin/cyzy.mp3', ogg: ''},
  {title: '金蛇狂舞', artist: '徵音养心', cover: 'img/jskw.jpg', mp3: 'mp3/wuyin/jskw.mp3', ogg: ''},
  {title: '春节序曲', artist: '徵音养心', cover: 'img/cjxq.jpg', mp3: 'mp3/wuyin/cjxq.mp3', ogg: ''},
  {title: '步步高', artist: '徵音养心', cover: 'img/bbg.jpg', mp3: 'mp3/wuyin/bbg.mp3', ogg: ''},
  {title: '花好月圆夜', artist: '徵音养心', cover: 'img/hhyyy.jpg', mp3: 'mp3/wuyin/hhyyy.mp3', ogg: ''},
  {title: '喜洋洋', artist: '徵音养心', cover: 'img/xyy.jpg', mp3: 'mp3/wuyin/xyy.mp3', ogg: ''},
  {title: '彩云追月（广东音乐）', artist: '徵音养心', cover: 'img/cyzygd.jpg', mp3: 'mp3/wuyin/cyzygd.mp3', ogg: ''},
  {title: '翻身的日子', artist: '徵音养心', cover: 'img/fsdrz.jpg', mp3: 'mp3/wuyin/fsdrz.mp3', ogg: ''},
  {title: '姑苏行', artist: '徵音养心', cover: 'img/gsx.jpg', mp3: 'mp3/wuyin/gsx.mp3', ogg: ''},
  {title: '阿里山的姑娘', artist: '徵音养心', cover: 'img/alsdgn.jpg', mp3: 'mp3/wuyin/alsdgn.mp3', ogg: ''},

  // 宫音养脾
  {title: '秋湖月夜', artist: '宫音养脾', cover: 'img/qhyy.jpg', mp3: 'mp3/wuyin/qhyy.mp3', ogg: ''},
  {title: '十面埋伏', artist: '宫音养脾', cover: 'img/smmf.jpg', mp3: 'mp3/wuyin/smmf.mp3', ogg: ''},
  {title: '东风破', artist: '宫音养脾', cover: 'img/dfp.jpg', mp3: 'mp3/wuyin/dfp.mp3', ogg: ''},
  {title: '渔舟唱晚', artist: '宫音养脾', cover: 'img/yzcw.jpg', mp3: 'mp3/wuyin/yzcw.mp3', ogg: ''},
  {title: '彩云追月', artist: '宫音养脾', cover: 'img/cyzy.jpg', mp3: 'mp3/wuyin/cyzy.mp3', ogg: ''},
  {title: '梅花三弄', artist: '宫音养脾', cover: 'img/mhsn.jpg', mp3: 'mp3/wuyin/mhsn.mp3', ogg: ''},
  {title: '阳春白雪', artist: '宫音养脾', cover: 'img/ycbx.jpg', mp3: 'mp3/wuyin/ycbx.mp3', ogg: ''},
  {title: '汉宫秋月', artist: '宫音养脾', cover: 'img/hgqy.jpg', mp3: 'mp3/wuyin/hgqy.mp3', ogg: ''},
  {title: '平沙落雁', artist: '宫音养脾', cover: 'img/psly.jpg', mp3: 'mp3/wuyin/psly.mp3', ogg: ''},
  {title: '渔樵问答', artist: '宫音养脾', cover: 'img/yqwd.jpg', mp3: 'mp3/wuyin/yqwd.mp3', ogg: ''},
  {title: '流水', artist: '宫音养脾', cover: 'img/ls.jpg', mp3: 'mp3/wuyin/ls.mp3', ogg: ''},
  {title: '花好月圆夜', artist: '宫音养脾', cover: 'img/hhyyy.jpg', mp3: 'mp3/wuyin/hhyyy.mp3', ogg: ''},

  // 商音润肺
  {title: '阳春白雪', artist: '商音润肺', cover: 'img/ycbx.jpg', mp3: 'mp3/wuyin/ycbx.mp3', ogg: ''},
  {title: '绣金匾', artist: '商音润肺', cover: 'img/xjb.jpg', mp3: 'mp3/wuyin/xjb.mp3', ogg: ''},
  {title: '声声慢', artist: '商音润肺', cover: 'img/ssm.jpg', mp3: 'mp3/wuyin/ssm.mp3', ogg: ''},
  {title: '渔歌', artist: '商音润肺', cover: 'img/yg.jpg', mp3: 'mp3/wuyin/yg.mp3', ogg: ''},
  {title: '秋鸿引', artist: '商音润肺', cover: 'img/qhy.jpg', mp3: 'mp3/wuyin/qhy.mp3', ogg: ''},
  {title: '将军令', artist: '商音润肺', cover: 'img/jjl.jpg', mp3: 'mp3/wuyin/jjl.mp3', ogg: ''},
  {title: '广陵散', artist: '商音润肺', cover: 'img/gls.jpg', mp3: 'mp3/wuyin/gls.mp3', ogg: ''},
  {title: '十面埋伏', artist: '商音润肺', cover: 'img/smmf.jpg', mp3: 'mp3/wuyin/smmf.mp3', ogg: ''},
  {title: '梅花三弄', artist: '商音润肺', cover: 'img/mhsn.jpg', mp3: 'mp3/wuyin/mhsn.mp3', ogg: ''},
  {title: '阳春白雪（琵琶版）', artist: '商音润肺', cover: 'img/ycbxpp.jpg', mp3: 'mp3/wuyin/ycbxpp.mp3', ogg: ''},
  {title: '汉宫秋月', artist: '商音润肺', cover: 'img/hgqy.jpg', mp3: 'mp3/wuyin/hgqy.mp3', ogg: ''},
  {title: '平沙落雁', artist: '商音润肺', cover: 'img/psly.jpg', mp3: 'mp3/wuyin/psly.mp3', ogg: ''},

  // 羽音养肾
  {title: '梅花三弄', artist: '羽音养肾', cover: 'img/mhsn.jpg', mp3: 'mp3/wuyin/mhsn.mp3', ogg: ''},
  {title: '一人静', artist: '羽音养肾', cover: 'img/yrj.jpg', mp3: 'mp3/wuyin/yrj.mp3', ogg: ''},
  {title: '梁祝', artist: '羽音养肾', cover: 'img/lz.jpg', mp3: 'mp3/wuyin/lz.mp3', ogg: ''},
  {title: '二泉映月', artist: '羽音养肾', cover: 'img/eqyy.jpg', mp3: 'mp3/wuyin/eqyy.mp3', ogg: ''},
  {title: '渔舟唱晚', artist: '羽音养肾', cover: 'img/yzcw.jpg', mp3: 'mp3/wuyin/yzcw.mp3', ogg: ''},
  {title: '高山流水', artist: '羽音养肾', cover: 'img/gsls.jpg', mp3: 'mp3/wuyin/gsls.mp3', ogg: ''},
  {title: '月光奏鸣曲', artist: '羽音养肾', cover: 'img/ygzmq.jpg', mp3: 'mp3/wuyin/ygzmq.mp3', ogg: ''},
  {title: '神秘园之歌', artist: '羽音养肾', cover: 'img/smyzg.jpg', mp3: 'mp3/wuyin/smyzg.mp3', ogg: ''},
  {title: '故乡的原风景', artist: '羽音养肾', cover: 'img/gxdyfj.jpg', mp3: 'mp3/wuyin/gxdyfj.mp3', ogg: ''},
  {title: '安妮的仙境', artist: '羽音养肾', cover: 'img/andxj.jpg', mp3: 'mp3/wuyin/andxj.mp3', ogg: ''},
  {title: '寂静山林', artist: '羽音养肾', cover: 'img/jjsl.jpg', mp3: 'mp3/wuyin/jjsl.mp3', ogg: ''},
  {title: '星空', artist: '羽音养肾', cover: 'img/xk.jpg', mp3: 'mp3/wuyin/xk.mp3', ogg: ''}
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







