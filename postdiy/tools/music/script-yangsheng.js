(function($){
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = false,
        playlist = [
  {title: '未知曲目', artist: '传奇乐坊', cover: 'img/yangsheng/xxqx.png', mp3: 'mp3/yangsheng/C100000DPW4N16GLlR.m4a', ogg: ''},
  {title: '塞上曲', artist: '吕培原', cover: 'img/yangsheng/ssq.png', mp3: 'mp3/yangsheng/C100000GqKA44LvAhB.m4a', ogg: ''},
  {title: '灵魂', artist: '纯音乐', cover: 'img/yangsheng/lh.png', mp3: 'mp3/yangsheng/C100000jFwmz0V1bCE.m4a', ogg: ''},
  {title: '禅院钟声', artist: '群星', cover: 'img/yangsheng/cyzs.png', mp3: 'mp3/yangsheng/C100000L77sZ37Lnk1.m4a', ogg: ''},
  {title: '普庵咒', artist: '熊云韵', cover: 'img/yangsheng/paz.png', mp3: 'mp3/yangsheng/C100000lX8th0SRER8.m4a', ogg: ''},
  {title: '光明', artist: '纯音乐', cover: 'img/yangsheng/gm.png', mp3: 'mp3/yangsheng/C100000QjaQT4C6AUT.m4a', ogg: ''},
  {title: '变幻彩风', artist: '纯音乐', cover: 'img/yangsheng/bhcf.png', mp3: 'mp3/yangsheng/C100000qsLRi4MkVO2.m4a', ogg: ''},
  {title: '寒山僧踪', artist: '纯音乐', cover: 'img/yangsheng/hssz.png', mp3: 'mp3/yangsheng/C100000SYeKB1EYYLk.m4a', ogg: ''},
  {title: '溪边的铃儿声', artist: '纯音乐', cover: 'img/yangsheng/xbdles.png', mp3: 'mp3/yangsheng/C100000udKEp4HiJxg.m4a', ogg: ''},
  {title: '平湖秋月', artist: '纯音乐', cover: 'img/yangsheng/phqy.png', mp3: 'mp3/yangsheng/C100000UUWtz1pXcrv.m4a', ogg: ''},
  {title: '我划的小船', artist: '纯音乐', cover: 'img/yangsheng/whdxc.png', mp3: 'mp3/yangsheng/C100000WqMk43MYWj5.m4a', ogg: ''},
  {title: '苦雪烹茶', artist: '传奇乐坊', cover: 'img/yangsheng/kxpc.png', mp3: 'mp3/yangsheng/C100000ZFe9A1K8ysb.m4a', ogg: ''},
  {title: '大胡笳', artist: '陈成勃', cover: 'img/yangsheng/dhj.png', mp3: 'mp3/yangsheng/C100000Zj9W43Yhqfl.m4a', ogg: ''},
  {title: '澄净心曲', artist: '古筝', cover: 'img/yangsheng/cjxq.png', mp3: 'mp3/yangsheng/C100001b5SlX1pIPbM.m4a', ogg: ''},
  {title: '行云流水', artist: '纯音乐', cover: 'img/yangsheng/xyls.png', mp3: 'mp3/yangsheng/C100001cZvsh3OQf1j.m4a', ogg: ''},
  {title: '夏', artist: '纯音乐', cover: 'img/yangsheng/x.png', mp3: 'mp3/yangsheng/C100001e2IsE2MZcZA.m4a', ogg: ''},
  {title: '十面埋伏', artist: '传奇乐坊', cover: 'img/yangsheng/smmf.png', mp3: 'mp3/yangsheng/C100001iddQ10lbMcg.m4a', ogg: ''},
  {title: '佛家静心曲', artist: '古筝', cover: 'img/yangsheng/fjjxq.png', mp3: 'mp3/yangsheng/C100001jKFPt2DPQMZ.m4a', ogg: ''},
  {title: '冬表树', artist: '纯音乐', cover: 'img/yangsheng/dbs.png', mp3: 'mp3/yangsheng/C100001lig190cb5m9.m4a', ogg: ''},
  {title: '秋天的落叶', artist: '纯音乐', cover: 'img/yangsheng/qtdly.png', mp3: 'mp3/yangsheng/C100001Pxxrj0ank9A.m4a', ogg: ''},
  {title: '步步高', artist: '中央民族乐团', cover: 'img/yangsheng/bbg.png', mp3: 'mp3/yangsheng/C100001rjId84BMaEK.m4a', ogg: ''},
  {title: '高山流水', artist: '华语群星', cover: 'img/yangsheng/gsls.png', mp3: 'mp3/yangsheng/C100001U7QEU1KgRBC.m4a', ogg: ''},
  {title: '天地美乐诗', artist: '纯音乐', cover: 'img/yangsheng/tdmls.png', mp3: 'mp3/yangsheng/C100001uHA3T2wwAKg.m4a', ogg: ''},
  {title: '禅茶一味', artist: '纯音乐', cover: 'img/yangsheng/ccyw.png', mp3: 'mp3/yangsheng/C100001vXNzW2KbZwT.m4a', ogg: ''},
  {title: '至高心曲', artist: '古筝', cover: 'img/yangsheng/zgxq.png', mp3: 'mp3/yangsheng/C100001WDBjO3UAWoR.m4a', ogg: ''},
  {title: '渔樵问答', artist: '传奇乐坊', cover: 'img/yangsheng/yqwd.png', mp3: 'mp3/yangsheng/C100001ycVJa4XhrTA.m4a', ogg: ''},
  {title: '疏梅弄影', artist: '纯音乐', cover: 'img/yangsheng/smny.png', mp3: 'mp3/yangsheng/C100001zCVBG1X6iMr.m4a', ogg: ''},
  {title: '大海奔腾', artist: '纯音乐', cover: 'img/yangsheng/dhbt.png', mp3: 'mp3/yangsheng/C1000027YXmt15Ckvs.m4a', ogg: ''},
  {title: '茶悟聚友', artist: '纯音乐', cover: 'img/yangsheng/cwjy.png', mp3: 'mp3/yangsheng/C1000029wKxS0bkSr9.m4a', ogg: ''},
  {title: '心灵之音', artist: '纯音乐', cover: 'img/yangsheng/xlzy.png', mp3: 'mp3/yangsheng/C100002Bif4t2JMM5J.m4a', ogg: ''},
  {title: '流星雨', artist: '纯音乐', cover: 'img/yangsheng/lxy.png', mp3: 'mp3/yangsheng/C100002BTfmT2209Xs.m4a', ogg: ''},
  {title: '银色沙滩', artist: '纯音乐', cover: 'img/yangsheng/ysst.png', mp3: 'mp3/yangsheng/C100002cSyOq2XRGH9.m4a', ogg: ''},
  {title: '风清云淡', artist: '纯音乐', cover: 'img/yangsheng/fqyd.png', mp3: 'mp3/yangsheng/C100002fKAj00kZF1b.m4a', ogg: ''},
  {title: '天真浪漫', artist: '纯音乐', cover: 'img/yangsheng/tzlm.png', mp3: 'mp3/yangsheng/C100002gZdZf3NNXnP.m4a', ogg: ''},
  {title: '火', artist: '纯音乐', cover: 'img/yangsheng/h.png', mp3: 'mp3/yangsheng/C100002HvkLx2pMQOz.m4a', ogg: ''},
  {title: '阳春白雪', artist: '传奇乐坊', cover: 'img/yangsheng/ycbx.png', mp3: 'mp3/yangsheng/C100002LxTWw1SC1ID.m4a', ogg: ''},
  {title: '紫竹调', artist: '纯音乐', cover: 'img/yangsheng/zzd.png', mp3: 'mp3/yangsheng/C100002Mxx3i3Y6CEw.m4a', ogg: ''},
  {title: '琵琶语', artist: '赵聪', cover: 'img/yangsheng/ppy.png', mp3: 'mp3/yangsheng/C100002niNzH45Q2R3.m4a', ogg: ''},
  {title: '云水禅心', artist: '李志辉', cover: 'img/yangsheng/yscx.png', mp3: 'mp3/yangsheng/C100002RhIc90LnVg3.m4a', ogg: ''},
  {title: '善缘曲', artist: '古筝', cover: 'img/yangsheng/syq.png', mp3: 'mp3/yangsheng/C10000358Qi53NwwyG.m4a', ogg: ''},
  {title: '高山', artist: '纯音乐', cover: 'img/yangsheng/gs.png', mp3: 'mp3/yangsheng/C1000039KD6X48KHIE.m4a', ogg: ''},
  {title: '渔舟唱晚', artist: '付娜', cover: 'img/yangsheng/yzcw.png', mp3: 'mp3/yangsheng/C100003A0yPO3podbq.m4a', ogg: ''},
  {title: '大悲咒', artist: '郭关', cover: 'img/yangsheng/dbz.png', mp3: 'mp3/yangsheng/C100003B3qsf37hGU4.m4a', ogg: ''},
  {title: '梦之地', artist: '纯音乐', cover: 'img/yangsheng/mzd.png', mp3: 'mp3/yangsheng/C100003b5oee1ya1ag.m4a', ogg: ''},
  {title: '梅花三弄', artist: '传奇乐坊', cover: 'img/yangsheng/mhxn.png', mp3: 'mp3/yangsheng/C100003DpbB735KxNt.m4a', ogg: ''},
  {title: '蒸汽', artist: '纯音乐', cover: 'img/yangsheng/xq.png', mp3: 'mp3/yangsheng/C100003FywPC45xoWR.m4a', ogg: ''},
  {title: '至高佛乐', artist: '古筝', cover: 'img/yangsheng/zgfl.png', mp3: 'mp3/yangsheng/C100003hF1QM4AQi1D.m4a', ogg: ''},
  {title: '灌想冥空', artist: '纯音乐', cover: 'img/yangsheng/gxmk.png', mp3: 'mp3/yangsheng/C100003hGXxz49m7x6.m4a', ogg: ''},
  {title: '水碧霞光', artist: '纯音乐', cover: 'img/yangsheng/sbxg.png', mp3: 'mp3/yangsheng/C100003ienO80nQIML.m4a', ogg: ''},
  {title: '碧涧流泉', artist: '纯音乐', cover: 'img/yangsheng/bjlq.png', mp3: 'mp3/yangsheng/C100003JodjE4Ihjvf.m4a', ogg: ''},
  {title: '感觉完美', artist: '纯音乐', cover: 'img/yangsheng/xjwm.png', mp3: 'mp3/yangsheng/C100003L1Ftc2IPLih.m4a', ogg: ''},
  {title: '月儿高', artist: '林石城', cover: 'img/yangsheng/yeg.png', mp3: 'mp3/yangsheng/C100003P0EaU02maWt.m4a', ogg: ''},
  {title: '河上的月亮', artist: '纯音乐', cover: 'img/yangsheng/hsdyx.png', mp3: 'mp3/yangsheng/C100003pLTjU3zwcBh.m4a', ogg: ''},
  {title: '梦江南', artist: '段银莹', cover: 'img/yangsheng/mxx.png', mp3: 'mp3/yangsheng/C100003rC8qn0zwmRp.m4a', ogg: ''},
  {title: '森林幻想曲', artist: '纯音乐', cover: 'img/yangsheng/slhxq.png', mp3: 'mp3/yangsheng/C100003ZjLcC1qKA1N.m4a', ogg: ''},
  {title: '出水莲', artist: '纯音乐', cover: 'img/yangsheng/csl.png', mp3: 'mp3/yangsheng/C100003zvpxd112Z5b.m4a', ogg: ''},
  {title: '花好月圆', artist: '传奇乐坊', cover: 'img/yangsheng/hhyy.png', mp3: 'mp3/yangsheng/C100004fNiFx419RDM.m4a', ogg: ''},
  {title: '金蛇狂舞', artist: '纯音乐', cover: 'img/yangsheng/jskw.png', mp3: 'mp3/yangsheng/C100004Ltm9g1LVHIS.m4a', ogg: ''}
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
