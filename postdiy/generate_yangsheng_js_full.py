import json
import re

# 读取音乐信息
with open(r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\yangsheng_music_info.json', 'r', encoding='utf-8') as f:
    music_info = json.load(f)

# 简单的中文拼音首字母映射表
pinyin_map = {
    '寒': 'h', '鸦': 'y', '戏': 'x', '水': 's', '琵': 'p', '琶': 'p',
    '塞': 's', '上': 's', '曲': 'q', '灵': 'l', '魂': 'h', '禅': 'c',
    '院': 'y', '钟': 'z', '声': 's', '普': 'p', '庵': 'a', '咒': 'z',
    '光': 'g', '明': 'm', '变': 'b', '幻': 'h', '彩': 'c', '风': 'f',
    '山': 's', '僧': 's', '踪': 'z', '溪': 'x', '边': 'b', '的': 'd',
    '铃': 'l', '儿': 'e', '平': 'p', '湖': 'h', '秋': 'q', '月': 'y',
    '我': 'w', '划': 'h', '小': 'x', '船': 'c', '苦': 'k', '雪': 'x',
    '烹': 'p', '茶': 'c', '大': 'd', '胡': 'h', '笳': 'j', '澄': 'c',
    '净': 'j', '心': 'x', '行': 'x', '云': 'y', '流': 'l', '夏': 'x',
    '十': 's', '面': 'm', '埋': 'm', '伏': 'f', '佛': 'f', '家': 'j',
    '静': 'j', '冬': 'd', '表': 'b', '树': 's', '天': 't', '落': 'l',
    '叶': 'y', '步': 'b', '高': 'g', '中': 'z', '央': 'y', '民': 'm',
    '族': 'z', '乐': 'l', '团': 't', '地': 'd', '美': 'm', '诗': 's',
    '一': 'y', '味': 'w', '至': 'z', '渔': 'y', '樵': 'q', '问': 'w',
    '答': 'd', '疏': 's', '梅': 'm', '弄': 'n', '影': 'y', '海': 'h',
    '奔': 'b', '腾': 't', '悟': 'w', '聚': 'j', '友': 'y', '之': 'z',
    '音': 'y', '星': 'x', '雨': 'y', '银': 'y', '色': 's', '沙': 's',
    '滩': 't', '清': 'q', '淡': 'd', '真': 'z', '浪': 'l', '漫': 'm',
    '火': 'h', '阳': 'y', '春': 'c', '白': 'b', '雪': 'x', '紫': 'z',
    '竹': 'z', '调': 'd', '语': 'y', '善': 's', '缘': 'y', '舟': 'z',
    '唱': 'c', '晚': 'w', '悲': 'b', '梦': 'm', '汽': 'q', '灌': 'g',
    '想': 'x', '冥': 'm', '空': 'k', '碧': 'b', '涧': 'j', '泉': 'q',
    '觉': 'j', '完': 'w', '儿': 'e', '河': 'h', '森': 's', '林': 'l',
    '幻': 'h', '出': 'c', '莲': 'l', '花': 'h', '好': 'h', '圆': 'y',
    '金': 'j', '蛇': 's', '狂': 'k', '舞': 'w', '李': 'l', '志': 'z',
    '辉': 'h', '段': 'd', '银': 'y', '莹': 'y', '付': 'f', '娜': 'n',
    '赵': 'z', '聪': 'c', '郭': 'g', '关': 'g', '林': 'l', '城': 'c',
    '陈': 'c', '勃': 'b', '熊': 'x', '韵': 'y', '吕': 'l', '培': 'p',
    '原': 'y', '传': 'c', '奇': 'q', '坊': 'f', '纯': 'c', '华': 'h',
    '群': 'q'
}

def get_pinyin_initial(text):
    result = []
    for char in text:
        if char in pinyin_map:
            result.append(pinyin_map[char])
        elif '\u4e00' <= char <= '\u9fff':
            result.append('x')
        elif char.isalpha():
            result.append(char.lower())
    return ''.join(result)[:6]

def clean_title(title):
    title = re.sub(r'^\d+[-–—]?', '', title)
    title = re.sub(r'[（(].*?[）)]', '', title)
    title = re.sub(r'[-–—].*$', '', title)
    title = title.strip()
    return title if title else '未知曲目'

# 生成JS文件内容
js_content = """(function($){
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = false,
        playlist = [
"""

for i, song in enumerate(music_info):
    title = song['title']
    artist = song['artist']
    filename = song['filename']
    
    # 清理标题
    clean_title_text = clean_title(title)
    
    # 生成封面名称
    cover_name = get_pinyin_initial(clean_title_text)
    
    # 生成MP3路径
    mp3_path = f"mp3/yangsheng/{filename}"
    
    # 生成JS对象
    js_content += f"  {{title: '{clean_title_text}', artist: '{artist}', cover: 'img/yangsheng/{cover_name}.png', mp3: '{mp3_path}', ogg: ''}}"
    
    if i < len(music_info) - 1:
        js_content += ",\n"
    else:
        js_content += "\n"

js_content += """];

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
"""

# 保存JS文件
with open(r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\script-yangsheng.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"已生成完整的 script-yangsheng.js 文件，包含 {len(music_info)} 首歌曲和完整的播放器逻辑")
