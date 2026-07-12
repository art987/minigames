/**
 * 精简版海报分享组件
 * 从 editor-script.js 抽取核心功能，用于 about/index.html 的分享物料弹窗
 * 海报内容写死：logo、商家名称、三行促销文案 + 动态二维码
 */
const PosterShare = (function() {
    const API_BASE = 'https://api.peacelove.top';
    const QINIU_BASE = 'https://7ncdn.peacelove.top/';
    const LOGO_URL = '../images/statics/logo.png';

    const BRAND_INFO = {
        name: '闪喵朋友圈海报制作器',
        promoLines: [
            '一键生成精美海报',
            '节日促销·品牌宣传',
            '长按扫码立即体验'
        ]
    };

    const state = {
        inviteCode: '',
        shareUrl: '',
        templates: [],
        currentIndex: 0,
        initialized: false,
        tplFestival: '',
        tplTemplates: [],
        tplIndex: 0
    };

    function getQiniuBase() {
        return (typeof imageConfig !== 'undefined' && imageConfig.qiniuBaseUrl)
            ? imageConfig.qiniuBaseUrl
            : QINIU_BASE;
    }

    function getInviteCode() {
        const userInfoStr = localStorage.getItem('postdiy_user_info');
        if (userInfoStr) {
            try {
                const userInfo = JSON.parse(userInfoStr);
                if (userInfo.inviteCode) return userInfo.inviteCode;
            } catch (e) {}
        }
        return '';
    }

    async function fetchInviteCode() {
        const userId = localStorage.getItem('postdiy_user_id');
        if (!userId) return '';

        try {
            const response = await fetch(`${API_BASE}/get-invite-info`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            const result = await response.json();
            if (result.success && result.data && result.data.inviteCode) {
                const userInfoStr = localStorage.getItem('postdiy_user_info');
                if (userInfoStr) {
                    try {
                        const userInfo = JSON.parse(userInfoStr);
                        userInfo.inviteCode = result.data.inviteCode;
                        localStorage.setItem('postdiy_user_info', JSON.stringify(userInfo));
                    } catch (e) {}
                }
                return result.data.inviteCode;
            }
        } catch (e) {
            console.error('[PosterShare] 获取邀请码失败:', e);
        }
        return '';
    }

    function generateQRCode(text) {
        try {
            var qrLib = null;
            if (typeof qrcode === 'function') {
                qrLib = qrcode;
            } else if (typeof window.qrcode === 'function') {
                qrLib = window.qrcode;
            }
            if (!qrLib) {
                console.error('[PosterShare] qrcode 库未加载, typeof qrcode:', typeof qrcode, ', typeof window.qrcode:', typeof window.qrcode);
                return '';
            }
            var qr = qrLib(0, 'M');
            qr.addData(text);
            qr.make();
            var dataUrl = qr.createDataURL(5, 2);
            return dataUrl;
        } catch (e) {
            console.error('[PosterShare] 生成二维码失败:', e);
            return '';
        }
    }

    function loadTemplates() {
        if (!window.utils || !window.templates) {
            console.warn('[PosterShare] utils 或 templates 未加载');
            return [];
        }

        const result = window.utils.autoSelectByDate();
        const month = result.month;
        const festival = result.festival;

        let templates = window.utils.getTemplatesByFilters(month, festival);

        if (templates.length === 0) {
            const allTemplates = window.utils.getAllTemplates();
            templates = allTemplates.filter(function(t) {
                return t.months && t.months.includes(month);
            });
        }

        return templates;
    }

    function getTemplateImageUrl(template) {
        return getQiniuBase() + template.image;
    }

    function getTemplateThumbUrl(template) {
        return getQiniuBase() + template.image + '-86thumb';
    }

    function updatePosterScale() {
        const frame = document.querySelector('.ps-poster-frame');
        if (!frame) return;
        const width = frame.offsetWidth;
        if (!width) return;
        frame.style.setProperty('--ps-unit', (width / 100) + 'px');
    }

    function renderPoster(template) {
        const bgWrapper = document.querySelector('.ps-poster-bg-wrapper');
        const currentBg = bgWrapper ? bgWrapper.querySelector('.ps-poster-bg.current') : null;
        const nextBg = bgWrapper ? bgWrapper.querySelector('.ps-poster-bg.next') : null;
        const qrImg = document.querySelector('.ps-poster-qrcode img');

        updatePosterScale();

        if (template && currentBg && nextBg) {
            // 新图片加载
            const newImageUrl = getTemplateImageUrl(template);
            nextBg.src = newImageUrl;
            nextBg.crossOrigin = 'anonymous';
            nextBg.style.opacity = '0';

            nextBg.onload = function() {
                // 开始交叉淡入淡出动画
                currentBg.style.opacity = '0';
                nextBg.style.opacity = '1';

                // 动画完成后交换类名
                setTimeout(function() {
                    currentBg.classList.remove('current');
                    currentBg.classList.add('next');
                    currentBg.style.opacity = '0';

                    nextBg.classList.remove('next');
                    nextBg.classList.add('current');

                    // 交换变量引用，下次使用
                    const temp = currentBg;
                    // currentBg = nextBg; // 无法重新赋值参数
                    // nextBg = temp;
                }, 600);
            };

            nextBg.onerror = function() {
                console.warn('[PosterShare] 背景图加载失败，尝试无 crossOrigin');
                nextBg.crossOrigin = null;
                nextBg.src = newImageUrl;
            };
        } else if (template && currentBg) {
            // 兼容旧版本（单图片结构）
            currentBg.src = getTemplateImageUrl(template);
            currentBg.crossOrigin = 'anonymous';
            currentBg.onload = function() {};
            currentBg.onerror = function() {
                console.warn('[PosterShare] 背景图加载失败，尝试无 crossOrigin');
                currentBg.crossOrigin = null;
                currentBg.src = getTemplateImageUrl(template);
            };
        }

        if (state.shareUrl && qrImg) {
            const qrDataUrl = generateQRCode(state.shareUrl);
            if (qrDataUrl) {
                qrImg.src = qrDataUrl;
            } else {
                console.warn('[PosterShare] 二维码生成失败，shareUrl:', state.shareUrl);
            }
        }
    }

    function getDisplayFestivals() {
        if (!window.utils || !window.utils.getAllFestivalDates) return ['☀️ 早安', '🌙 晚安'];

        const festivalDates = window.utils.getAllFestivalDates();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let todayFestival = null;
        const upcoming = [];

        festivalDates.forEach(function(f) {
            const daysUntil = Math.ceil((f.date - today) / (1000 * 3600 * 24));
            if (daysUntil === 0) {
                todayFestival = f;
            } else if (daysUntil > 0) {
                upcoming.push(f);
            }
        });

        upcoming.sort(function(a, b) { return a.date - b.date; });

        const festivals = ['☀️ 早安', '🌙 晚安'];
        if (todayFestival) {
            festivals.push(todayFestival.name);
            upcoming.slice(0, 2).forEach(function(f) { festivals.push(f.name); });
        } else {
            upcoming.slice(0, 3).forEach(function(f) { festivals.push(f.name); });
        }
        return festivals;
    }

    function renderFestivalTags() {
        const container = document.getElementById('psTplFestivals');
        if (!container) return;
        container.innerHTML = '';

        const festivals = getDisplayFestivals();
        festivals.forEach(function(festival, index) {
            const tag = document.createElement('div');
            tag.className = 'ps-tpl-festival-tag' + (index === 0 ? ' active' : '');
            tag.textContent = festival;
            tag.dataset.festival = festival;
            tag.addEventListener('click', function() {
                container.querySelectorAll('.ps-tpl-festival-tag').forEach(function(el) {
                    el.classList.remove('active');
                });
                tag.classList.add('active');
                filterTemplatesByFestival(festival);

                var containerWidth = container.offsetWidth;
                var tagLeft = tag.offsetLeft;
                var tagWidth = tag.offsetWidth;
                var scrollTarget = tagLeft - (containerWidth - tagWidth) / 2;
                container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
            });
            container.appendChild(tag);
        });

        state.tplFestival = festivals[0];
    }

    function shuffleArray(array) {
        var shuffled = array.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    function filterTemplatesByFestival(festival) {
        state.tplFestival = festival;
        let templates = [];

        if (window.utils) {
            templates = window.utils.getTemplatesByFilters(null, festival);
        }

        if (templates.length === 0 && window.utils) {
            templates = window.utils.getAllTemplates();
        }

        // 每次进入节日标签时随机排序展示
        state.tplTemplates = shuffleArray(templates);
        state.tplIndex = 0;
        renderGallery();
    }

    function randomizeCurrentTemplates() {
        if (state.tplTemplates.length === 0) return;
        state.tplTemplates = shuffleArray(state.tplTemplates);
        state.tplIndex = 0;
        renderGallery();
        showToast('已切换');
    }

    function renderGallery() {
        const container = document.getElementById('psTplGallery');
        if (!container) return;
        container.innerHTML = '';

        state.tplTemplates.forEach(function(template, index) {
            const slide = document.createElement('div');
            slide.className = 'template-gallery-slide hidden-slide';
            slide.dataset.index = index;

            const img = document.createElement('img');
            img.src = getTemplateThumbUrl(template);
            img.alt = template.name;
            img.className = 'slide-img';
            img.loading = 'lazy';

            const name = document.createElement('div');
            name.className = 'slide-name';
            name.textContent = template.name;

            slide.appendChild(img);
            slide.appendChild(name);
            slide.addEventListener('click', function() {
                if (index === state.tplIndex) {
                    slide.classList.add('selected');
                    setTimeout(function() {
                        confirmTemplate();
                    }, 300);
                } else {
                    state.tplIndex = index;
                    updateSlidePositions();
                }
            });

            container.appendChild(slide);
        });

        updateSlidePositions();
    }

    function updateSlidePositions() {
        const container = document.getElementById('psTplGallery');
        if (!container) return;
        const slides = container.querySelectorAll('.template-gallery-slide');
        if (!slides.length) return;

        const total = slides.length;
        const current = state.tplIndex;

        slides.forEach(function(slide, index) {
            slide.classList.remove('prev-2', 'prev-1', 'current', 'next-1', 'next-2', 'hidden-slide', 'selected');
            const prev1 = (current - 1 + total) % total;
            const prev2 = (current - 2 + total) % total;
            const next1 = (current + 1) % total;
            const next2 = (current + 2) % total;

            if (index === current) {
                slide.classList.add('current');
            } else if (index === prev1) {
                slide.classList.add('prev-1');
            } else if (index === prev2) {
                slide.classList.add('prev-2');
            } else if (index === next1) {
                slide.classList.add('next-1');
            } else if (index === next2) {
                slide.classList.add('next-2');
            } else {
                slide.classList.add('hidden-slide');
            }
        });

        const nameEl = document.getElementById('psTplSlideName');
        const counterEl = document.getElementById('psTplCounter');
        if (nameEl && state.tplTemplates[current]) {
            nameEl.textContent = state.tplTemplates[current].name;
        }
        if (counterEl) {
            counterEl.textContent = (current + 1) + ' / ' + total;
        }
    }

    function prevSlide() {
        if (!state.tplTemplates.length) return;
        state.tplIndex = (state.tplIndex - 1 + state.tplTemplates.length) % state.tplTemplates.length;
        updateSlidePositions();
    }

    function nextSlide() {
        if (!state.tplTemplates.length) return;
        state.tplIndex = (state.tplIndex + 1) % state.tplTemplates.length;
        updateSlidePositions();
    }

    // 打开模板选择弹窗，自动定位到当前模板所属节日标签
    function openTemplatePicker() {
        renderFestivalTags();

        // 获取当前正在使用的模板
        const currentTemplate = state.templates[state.currentIndex];
        let targetFestival = getDisplayFestivals()[0];

        // 尝试从当前模板的节日属性中匹配标签
        if (currentTemplate && currentTemplate.festivals && currentTemplate.festivals.length > 0) {
            const templateFestivals = currentTemplate.festivals;
            const container = document.getElementById('psTplFestivals');
            if (container) {
                const allTags = container.querySelectorAll('.ps-tpl-festival-tag');
                for (var i = 0; i < templateFestivals.length; i++) {
                    const fest = templateFestivals[i];
                    for (var j = 0; j < allTags.length; j++) {
                        if (allTags[j].dataset.festival === fest) {
                            targetFestival = fest;
                            // 激活匹配的标签
                            allTags.forEach(function(t) { t.classList.remove('active'); });
                            allTags[j].classList.add('active');
                            // 滚动到居中位置
                            var tagEl = allTags[j];
                            var containerWidth = container.offsetWidth;
                            var tagLeft = tagEl.offsetLeft;
                            var tagWidth = tagEl.offsetWidth;
                            var scrollTarget = tagLeft - (containerWidth - tagWidth) / 2;
                            container.scrollTo({ left: scrollTarget, behavior: 'instant' });
                            break;
                        }
                    }
                    if (targetFestival !== getDisplayFestivals()[0]) break;
                }
            }
        }

        state.tplFestival = targetFestival;
        filterTemplatesByFestival(targetFestival);

        const overlay = document.querySelector('.ps-tpl-overlay');
        if (overlay) {
            overlay.classList.remove('closing');
            overlay.classList.add('active');
        }
    }

    // 关闭模板选择弹窗，使用果冻动画效果
    function closeTemplatePicker() {
        const overlay = document.querySelector('.ps-tpl-overlay');
        if (!overlay) return;
        if (!overlay.classList.contains('active')) return;

        overlay.classList.add('closing');
        overlay.classList.remove('active');

        // 动画结束后移除 closing 类
        setTimeout(function() {
            overlay.classList.remove('closing');
        }, 250);
    }

    function confirmTemplate() {
        if (state.tplTemplates.length === 0) return;
        const selected = state.tplTemplates[state.tplIndex];
        state.templates = state.tplTemplates;
        state.currentIndex = state.tplIndex;
        renderPoster(selected);
        closeTemplatePicker();
        showToast('已切换到：' + selected.name);
    }

    function loadHtml2Canvas() {
        return new Promise(function(resolve, reject) {
            if (window.html2canvas) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = '../libs/html2canvas/html2canvas.min.js';
            script.onload = function() { resolve(); };
            script.onerror = function() { reject(new Error('加载 html2canvas 失败')); };
            document.head.appendChild(script);
        });
    }

    async function downloadPoster() {
        const btn = document.querySelector('.ps-btn-download');
        const loading = document.querySelector('.ps-loading');

        if (btn) {
            btn.disabled = true;
            btn.textContent = '生成中...';
        }
        if (loading) loading.classList.add('active');

        try {
            await loadHtml2Canvas();

            const posterFrame = document.querySelector('.ps-poster-frame');
            if (!posterFrame) {
                showToast('海报元素未找到');
                return;
            }

            // 截图前隐藏非当前显示的背景图
            const bgWrapper = posterFrame.querySelector('.ps-poster-bg-wrapper');
            const nextBg = bgWrapper ? bgWrapper.querySelector('.ps-poster-bg.next') : null;
            if (nextBg) {
                nextBg.style.visibility = 'hidden';
            }

            const options = {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: false,
                logging: false,
                width: posterFrame.offsetWidth,
                height: posterFrame.offsetHeight,
                imageTimeout: 30000,
                ignoreElements: function(el) {
                    return el.classList && (el.classList.contains('ps-loading') || el.classList.contains('next'));
                }
            };

            const canvas = await html2canvas(posterFrame, options);

            // 截图后恢复隐藏的背景图
            if (nextBg) {
                nextBg.style.visibility = 'visible';
            }

            const imageUrl = canvas.toDataURL('image/png', 1.0);

            const now = new Date();
            const timestamp = now.getFullYear() +
                String(now.getMonth() + 1).padStart(2, '0') +
                String(now.getDate()).padStart(2, '0') +
                String(now.getHours()).padStart(2, '0') +
                String(now.getMinutes()).padStart(2, '0');
            const fileName = `闪喵分享_${timestamp}.png`;

            if (window.uni && window.uni.postMessage) {
                console.log('[PosterShare] 检测到 uni-app 环境，使用 postMessage 下载');
                window.uni.postMessage({
                    data: {
                        action: 'downloadImage',
                        url: imageUrl,
                        fileName: fileName
                    }
                });
                showToast('海报已发送到原生应用处理');
            } else {
                const link = document.createElement('a');
                link.href = imageUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                setTimeout(function() {
                    document.body.removeChild(link);
                }, 100);
                showToast('海报生成成功！');
            }
        } catch (e) {
            console.error('[PosterShare] 下载海报失败:', e);
            showToast('下载失败，请重试');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = '下载分享海报';
            }
            if (loading) loading.classList.remove('active');
        }
    }

    function showToast(message) {
        let toast = document.querySelector('.ps-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'ps-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('active');
        setTimeout(function() {
            toast.classList.remove('active');
        }, 2000);
    }

    async function open() {
        if (!state.inviteCode) {
            state.inviteCode = getInviteCode();
            if (!state.inviteCode) {
                state.inviteCode = await fetchInviteCode();
            }
        }

        // 无论是否有邀请码，都生成分享链接（有邀请码则带 ref 参数）
        const baseUrl = 'https://peacelove.top/postdiy/about/info.html';
        state.shareUrl = state.inviteCode
            ? `${baseUrl}?ref=${state.inviteCode}`
            : baseUrl;

        if (state.templates.length === 0) {
            state.templates = loadTemplates();
        }

        if (state.templates.length > 0) {
            renderPoster(state.templates[state.currentIndex]);
        } else {
            showToast('暂无可用模板');
        }

        const overlay = document.querySelector('.ps-overlay');
        if (overlay) overlay.classList.add('active');

        // 禁止背景滚动，只允许弹窗内容滚动
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
        document.body.dataset.scrollY = scrollY;

        requestAnimationFrame(function() {
            updatePosterScale();
        });
    }

    function close() {
        const overlay = document.querySelector('.ps-overlay');
        if (overlay) overlay.classList.remove('active');
        closeTemplatePicker();

        // 恢复背景滚动
        const scrollY = parseInt(document.body.dataset.scrollY || '0');
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
    }

    function init() {
        if (state.initialized) return;
        state.initialized = true;

        const closeBtn = document.querySelector('.ps-close');
        if (closeBtn) closeBtn.addEventListener('click', close);

        const templateBtn = document.querySelector('.ps-btn-template');
        if (templateBtn) {
            templateBtn.addEventListener('click', openTemplatePicker);
        }

        const posterContent = document.querySelector('.ps-poster-content');
        if (posterContent) {
            posterContent.addEventListener('click', function(e) {
                if (e.target.closest('.ps-poster-header') || e.target.closest('.ps-poster-footer')) {
                    return;
                }
                openTemplatePicker();
            });
        }

        const downloadBtn = document.querySelector('.ps-btn-download');
        if (downloadBtn) downloadBtn.addEventListener('click', downloadPoster);

        const overlay = document.querySelector('.ps-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) close();
            });
        }

        const tplCloseBtn = document.querySelector('.ps-tpl-close');
        if (tplCloseBtn) tplCloseBtn.addEventListener('click', closeTemplatePicker);

        const tplOverlay = document.querySelector('.ps-tpl-overlay');
        if (tplOverlay) {
            tplOverlay.addEventListener('click', function(e) {
                if (e.target === tplOverlay) closeTemplatePicker();
            });
        }

        const prevBtn = document.getElementById('psTplPrev');
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        const nextBtn = document.getElementById('psTplNext');
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        const confirmBtn = document.querySelector('.ps-tpl-confirm');
        if (confirmBtn) confirmBtn.addEventListener('click', confirmTemplate);

        // 随机展示按钮
        const randomBtn = document.querySelector('.ps-tpl-random');
        if (randomBtn) randomBtn.addEventListener('click', randomizeCurrentTemplates);

        // 手势滑动支持
        const galleryWrap = document.querySelector('.ps-tpl-gallery-wrap');
        if (galleryWrap) {
            let touchStartX = 0;
            let touchEndX = 0;
            let isSwiping = false;

            galleryWrap.addEventListener('touchstart', function(e) {
                touchStartX = e.touches[0].clientX;
                isSwiping = true;
            }, { passive: true });

            galleryWrap.addEventListener('touchmove', function(e) {
                if (!isSwiping) return;
                touchEndX = e.touches[0].clientX;
            }, { passive: true });

            galleryWrap.addEventListener('touchend', function(e) {
                if (!isSwiping) return;
                isSwiping = false;

                const diffX = touchEndX - touchStartX;
                const threshold = 50; // 最小滑动距离阈值

                if (Math.abs(diffX) > threshold) {
                    if (diffX < 0) {
                        // 向左滑动，切换到下一个
                        nextSlide();
                    } else {
                        // 向右滑动，切换到上一个
                        prevSlide();
                    }
                }
            }, { passive: true });
        }

        // 浮动按钮滚动隐藏/显示
        let lastScrollY = window.scrollY;
        let scrollThreshold = 10;
        const floatBtn = document.getElementById('psFloatBtn');

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            const diff = currentScrollY - lastScrollY;

            if (Math.abs(diff) < scrollThreshold) return;

            if (floatBtn) {
                if (diff > 0) {
                    // 向上滚动（查看下方内容），隐藏按钮
                    floatBtn.classList.add('hidden');
                } else {
                    // 向下滚动（查看上方内容），显示按钮
                    floatBtn.classList.remove('hidden');
                }
            }

            lastScrollY = currentScrollY;
        }, { passive: true });

        // 弹窗内按钮区滚动隐藏/显示
        const psBody = document.querySelector('.ps-body');
        const psActions = document.querySelector('.ps-actions');
        if (psBody && psActions) {
            let lastBodyScrollY = 0;

            psBody.addEventListener('scroll', function() {
                const currentBodyScrollY = psBody.scrollTop;
                const diff = currentBodyScrollY - lastBodyScrollY;

                if (Math.abs(diff) < scrollThreshold) return;

                if (diff > 0) {
                    // 向上滚动（查看下方内容），隐藏按钮区
                    psActions.classList.add('hidden');
                } else {
                    // 向下滚动（查看上方内容），显示按钮区
                    psActions.classList.remove('hidden');
                }

                lastBodyScrollY = currentBodyScrollY;
            }, { passive: true });
        }

        let resizeTimer = null;
        window.addEventListener('resize', function() {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updatePosterScale, 100);
        });
        window.addEventListener('orientationchange', function() {
            setTimeout(updatePosterScale, 300);
        });

        updatePosterScale();
    }

    return { init: init, open: open, close: close };
})();

window.PosterShare = PosterShare;
