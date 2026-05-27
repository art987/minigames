(function() {
    'use strict';
    
    // 粒子特效相关变量
    let particlesContainer = null;
    let messageElement = null;
    let isPlaying = false;
    let particleInterval = null;
    let coverElement = null;
    
    // 播放器相关变量
    let repeat = localStorage.repeat || 0;
    let shuffle = localStorage.shuffle || 'false';
    let continous = true;
    let autoplay = false;
    let playlist = [];
    let time = new Date();
    let currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0;
    let trigger = false;
    let audio, timeout, playCounts;
    
    // 粒子特效函数
    function createParticle() {
        if (!particlesContainer) return;
        
        const particle = document.createElement('div');
        particle.classList.add('music-particle');
        
        const size = Math.random() * 4 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -10px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay + 0.5) * 1000);
    }
    
    function startParticles() {
        if (particleInterval) return;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createParticle(), i * 100);
        }
        
        particleInterval = setInterval(() => {
            createParticle();
        }, 300);
    }
    
    function stopParticles() {
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
    }
    
    function showMessage() {
        if (!messageElement) return;
        
        messageElement.classList.add('visible');
    }
    
    function hideMessage() {
        if (!messageElement) return;
        
        messageElement.classList.remove('visible');
    }
    
    function ensureElements() {
        if (!coverElement) {
            coverElement = document.querySelector('.cover');
            if (!coverElement) return false;
        }
        
        if (!messageElement || !messageElement.parentNode) {
            messageElement = document.createElement('div');
            messageElement.classList.add('music-message-overlay');
            messageElement.textContent = '放下手机，净享音乐的魔力';
            coverElement.appendChild(messageElement);
        }
        
        if (!particlesContainer || !particlesContainer.parentNode) {
            particlesContainer = document.createElement('div');
            particlesContainer.classList.add('music-particles-container');
            coverElement.appendChild(particlesContainer);
        }
        
        return true;
    }
    
    function observeCover() {
        coverElement = document.querySelector('.cover');
        if (!coverElement) return;
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && isPlaying) {
                    if (ensureElements()) {
                        showMessage();
                        startParticles();
                    }
                }
            });
        });
        
        observer.observe(coverElement, {
            childList: true,
            subtree: false
        });
    }
    
    function syncEffects() {
        const isPlayingClass = document.querySelector('.playback.playing') !== null;
        
        if (isPlayingClass !== isPlaying) {
            isPlaying = isPlayingClass;
            if (ensureElements()) {
                if (isPlaying) {
                    showMessage();
                    startParticles();
                    const playButton = document.getElementById('playButton');
                    if (playButton) {
                        playButton.textContent = '❚❚';
                    }
                } else {
                    hideMessage();
                    stopParticles();
                    const playButton = document.getElementById('playButton');
                    if (playButton) {
                        playButton.textContent = '▸';
                    }
                }
            }
        }
    }
    
    function initMusicEffects() {
        const playButton = document.getElementById('playButton');
        
        if (!playButton) {
            console.warn('音乐特效初始化失败：找不到播放按钮');
            return;
        }
        
        ensureElements();
        observeCover();
        
        playButton.addEventListener('click', function(e) {
            setTimeout(syncEffects, 100);
        });
        
        const playback = document.querySelector('.playback');
        if (playback) {
            playback.addEventListener('click', function(e) {
                setTimeout(syncEffects, 100);
            });
        }
        
        // 点击封面区域控制播放/暂停
        const cover = document.querySelector('.cover');
        if (cover) {
            cover.addEventListener('click', function(e) {
                // 避免点击到特效元素时触发
                if (e.target.classList.contains('music-message-overlay') || 
                    e.target.classList.contains('music-particle') ||
                    e.target.classList.contains('music-particles-container')) {
                    return;
                }
                
                if (isPlaying) {
                    pause();
                    setTimeout(syncEffects, 100);
                }
            });
        }
        
        setInterval(syncEffects, 500);
        
        console.log('✨ 音乐特效已初始化');
    }
    
    // 播放器函数
    function play() {
        if (audio) {
            var playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    $('.playback').addClass('playing');
                    $('#playButton').text('❚❚').removeClass('play-button').addClass('pause-button');
                    timeout = setInterval(updateProgress, 500);
                }).catch(error => {
                    $('#playButton').text('▸').addClass('play-button').removeClass('pause-button').removeClass('hidden');
                });
            }
        }
    }
    
    function pause() {
        if (audio) {
            audio.pause();
            $('.playback').removeClass('playing');
            $('#playButton').text('▸').removeClass('pause-button').addClass('play-button');
            clearInterval(timeout);
        }
    }
    
    function setProgress(value) {
        if (audio) {
            var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60);
            var ratio = value / audio.duration * 100;
            
            $('.timer').html(parseInt(value / 60) + ':' + currentSec);
            $('.progress .pace').css('width', ratio + '%');
            $('.progress .slider a').css('left', ratio + '%');
        }
    }
    
    function updateProgress() {
        if (audio) {
            setProgress(audio.currentTime);
        }
    }
    
    function setVolume(value) {
        if (audio) {
            audio.volume = localStorage.volume = value;
        }
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    }
    
    function switchTrack(i) {
        if (i < 0) {
            currentTrack = playlist.length - 1;
        } else if (i >= playlist.length) {
            currentTrack = 0;
        } else {
            currentTrack = i;
        }
        
        $('audio').remove();
        loadMusic(currentTrack);
        $('#playlist li').removeClass('playing').eq(currentTrack).addClass('playing');
        
        if (isPlaying) {
            setTimeout(play, 100);
        }
    }
    
    function shufflePlay() {
        var time = new Date();
        var lastTrack = currentTrack;
        currentTrack = time.getTime() % playlist.length;
        if (lastTrack == currentTrack) ++currentTrack;
        switchTrack(currentTrack);
    }
    
    function ended() {
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
    }
    
    function beforeLoad() {
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) + '%');
    }
    
    function afterLoad() {
        // 不自动播放
    }
    
    function loadMusic(i) {
        var item = playlist[i];
        var newaudio = $('<audio>').html('<source src="' + item.mp3 + '"><source src="' + item.ogg + '">').appendTo('#player');
        
        $('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
        $('.tag').html('<strong>' + item.title + '</strong><span class="artist">' + item.artist + '</span>');
        
        audio = newaudio[0];
        audio.volume = $('.mute').hasClass('enable') ? 0 : (localStorage.volume || 0.5);
        audio.addEventListener('progress', beforeLoad, false);
        audio.addEventListener('durationchange', beforeLoad, false);
        audio.addEventListener('canplay', afterLoad, false);
        audio.addEventListener('ended', ended, false);
    }
    
    function initPlayer(data) {
        if (data) {
            playlist = data;
        }
        
        time = new Date();
        currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0;
        
        // 加载播放列表
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
        
        // 初始化滑块
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
            $('#playButton').text('▸').addClass('play-button').removeClass('hidden');
            
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
    }
    
    // 导出函数
    window.MusicEffects = {
        init: initMusicEffects,
        start: startParticles,
        stop: stopParticles,
        initPlayer: initPlayer,
        play: play,
        pause: pause
    };
})();
