import json
import re

# 读取 script-wuyin.js 文件
with open(r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\script-wuyin.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取播放列表
import re
playlist_match = re.search(r'playlist = \[(.*?)\];', content, re.DOTALL)
if playlist_match:
    playlist_str = playlist_match.group(1)
    
    # 分类音乐
    categories = {
        '角音养肝': [],
        '徵音养心': [],
        '宫音养脾': [],
        '商音润肺': [],
        '羽音养肾': []
    }
    
    # 解析每首歌
    songs = re.findall(r'\{title: \'(.*?)\', artist: \'(.*?)\', cover: \'(.*?)\', mp3: \'(.*?)\', ogg: \'\'\}', playlist_str)
    
    for title, artist, cover, mp3 in songs:
        song_obj = {
            'title': title,
            'artist': artist,
            'cover': cover,
            'mp3': mp3
        }
        
        if artist in categories:
            categories[artist].append(song_obj)
    
    # 生成每个分类的JS文件
    for category_name, songs in categories.items():
        if not songs:
            continue
            
        # 确定文件名
        if category_name == '角音养肝':
            filename = 'jiaoyin'
            html_title = '角音养肝疗愈音乐'
            html_desc = '角音属木，入肝经，具有疏肝解郁、调和气血的功效'
        elif category_name == '徵音养心':
            filename = 'zhiyin'
            html_title = '徵音养心疗愈音乐'
            html_desc = '徵音属火，入心经，具有养心安神、活血化瘀的功效'
        elif category_name == '宫音养脾':
            filename = 'gongyin'
            html_title = '宫音养脾疗愈音乐'
            html_desc = '宫音属土，入脾经，具有健脾益气、调和脾胃的功效'
        elif category_name == '商音润肺':
            filename = 'shangyin'
            html_title = '商音润肺疗愈音乐'
            html_desc = '商音属金，入肺经，具有润肺止咳、宣肺利气的功效'
        elif category_name == '羽音养肾':
            filename = 'yuyin'
            html_title = '羽音养肾疗愈音乐'
            html_desc = '羽音属水，入肾经，具有滋肾养精、益肾固本的功效'
        
        # 生成JS内容
        js_content = f"""(function($){{
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = false,
        playlist = [
"""
        
        for i, song in enumerate(songs):
            js_content += f"  {{title: '{song['title']}', artist: '{song['artist']}', cover: '{song['cover']}', mp3: '{song['mp3']}', ogg: ''}}"
            if i < len(songs) - 1:
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
        js_file = f"c:\\Users\\ThinkPad\\Documents\\GitHub\\minigames2026\\postdiy\\tools\\music\\script-{filename}.js"
        with open(js_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        # 生成HTML文件
        html_content = f"""<!DOCTYPE html>
<html lang="zh-CN" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
    <!-- 主要SEO优化部分 -->
    <title>{html_title} - 五音疗愈音乐</title>
    <meta name="description" content="{html_desc}，精选{len(songs)}首经典曲目，助您通过音乐调理身心。">
    <meta name="keywords" content="{category_name},五音疗愈,古代音乐,身心调理,黄帝内经">
    
    <!-- 网站图标 -->
    <link rel="canonical" href="https://www.peacelove.top//" />
    
    <!-- 样式表 -->
    <link rel="stylesheet" href="style.css">
    
</head>
<body>
    
    <main role="main">
        <section aria-label="{html_title}播放器">
            <div class="start">
                <button id="playButton" class="play-button" aria-label="播放/暂停">▸</button>
            </div>

            <div id="player" itemscope itemtype="https://schema.org/MusicPlaylist">
                <div class="cover" itemprop="image"></div>
                <div class="ctrl">
                    <div class="tag">
                        <strong itemprop="name">Title</strong>
                        <span class="artist" itemprop="byArtist">Artist</span>
                        <span class="album" itemprop="inAlbum"></span>
                    </div>
                    <div class="control">
                        <div class="left">
                            <div class="rewind icon" aria-label="上一首"></div>
                            <div class="playback icon" aria-label="播放/暂停"></div>
                            <div class="fastforward icon" aria-label="下一首"></div>
                        </div>
                        <div class="volume right">
                            <div class="mute icon left" aria-label="静音/取消静音"></div>
                            <div class="slider left">
                                <div class="pace"></div>
                            </div>
                        </div>
                    </div>
                    <div class="progress">
                        <div class="slider">
                            <div class="loaded"></div>
                            <div class="pace"></div>
                        </div>
                        <div class="timer left">0:00</div>
                        <div class="right">
                            <div class="repeat icon" aria-label="重复播放"></div>
                            <div class="shuffle icon" aria-label="随机播放"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h1 class="sr-only">{html_title}列表</h1>
            <ul id="playlist" role="list" aria-label="{html_title}列表"></ul>
        </section>
    </main>

    <script src="jquery-1.7.2.min.js"></script>
    <script src="jquery-ui-1.8.17.custom.min.js"></script>
    <script src="script-{filename}.js"></script>
   
    
    <!-- 延迟加载的Google Analytics（示例） -->
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){{dataLayer.push(arguments);}}
        gtag('js', new Date());
        gtag('config', 'UA-XXXXX-Y');
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y"></script>
</body>
</html>"""
        
        # 保存HTML文件
        html_file = f"c:\\Users\\ThinkPad\\Documents\\GitHub\\minigames2026\\postdiy\\tools\\music\\{filename}.html"
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"已创建: {filename}.html 和 script-{filename}.js ({len(songs)}首歌曲)")
        print(f"  首张封面: {songs[0]['cover'] if songs else 'N/A'}")

print("\n所有五音疗愈音乐页面已创建完成！")
