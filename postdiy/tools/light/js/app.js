const gallery=document.getElementById('gallery');
const viewer=document.getElementById('viewer');
const container1=document.getElementById('cardContainer1');
const container2=document.getElementById('cardContainer2');
const closeBtn=document.getElementById('closeBtn');
const muteBtn=document.getElementById('muteBtn');
const detailBtn=document.getElementById('detailBtn');
const detailPanel=document.getElementById('detailPanel');
const detailClose=document.getElementById('detailClose');

const volumeNames = ['第一卷', '第二卷', '第三卷', '第四卷', '第五卷', '第六卷', 
                     '第七卷', '第八卷', '第九卷', '第十卷', '第十一卷', '第十二卷'];

var isOpening=false;
var lastOpenTime=0;
var currentId=null;
var configKeys=Object.keys(svgConfigs);
var currentIndex=0;
var activeContainer=1;

var touchStartX=0;
var touchEndX=0;
var isSwiping=false;
var hasMoved=false;

var isMuted=false;
var currentAudio=null;

console.log('道教祈福壁纸全集·108愿');

function isSvgFile(filePath){
    if(!filePath)return false;
    var lowerPath=filePath.toLowerCase();
    return lowerPath.endsWith('.svg');
}

var configs=Object.entries(svgConfigs);
var currentFilter='all';

function buildCategoryNav(){
    var navInner=document.querySelector('.nav-inner');
    if(!navInner||!categories)return;

    var catArr=Object.values(categories);
    for(var i=0;i<catArr.length;i++){
        var cat=catArr[i];
        var btn=document.createElement('button');
        btn.className='nav-btn';
        btn.setAttribute('data-category',cat.id);
        btn.innerHTML='<span class="nav-icon">'+cat.icon+'</span><span class="nav-name">'+cat.name+'</span>';
        navInner.appendChild(btn);
    }

    navInner.addEventListener('click',function(e){
        var btn=e.target.closest('.nav-btn');
        if(!btn)return;
        var cat=btn.getAttribute('data-category');
        currentFilter=cat;
        var allBtns=navInner.querySelectorAll('.nav-btn');
        for(var j=0;j<allBtns.length;j++)allBtns[j].classList.remove('active');
        btn.classList.add('active');
        filterGallery(cat);
    });
}

function filterGallery(cat){
    var sections=document.querySelectorAll('.category-section');
    for(var i=0;i<sections.length;i++){
        var section=sections[i];
        var sectionCat=section.getAttribute('data-category');
        if(cat==='all'||sectionCat===cat){
            section.style.display='';
        }else{
            section.style.display='none';
        }
    }
}

function animateNumber(el,target,duration){
    if(!el)return;
    var start=0;
    var startTime=Date.now();
    var tick=function(){
        var elapsed=Date.now()-startTime;
        var progress=Math.min(elapsed/duration,1);
        var eased=1-Math.pow(1-progress,3);
        el.textContent=Math.floor(target*eased);
        if(progress<1)requestAnimationFrame(tick);
        else el.textContent=target;
    };
    requestAnimationFrame(tick);
}

function renderGallery(){
    var gallery=document.getElementById('gallery');
    if(!gallery||!categories)return;

    var grouped={};
    var ids=Object.keys(svgConfigs);
    for(var i=0;i<ids.length;i++){
        var id=ids[i];
        var cfg=svgConfigs[id];
        var cat=cfg.category||'other';
        if(!grouped[cat])grouped[cat]=[];
        grouped[cat].push({id:id,cfg:cfg});
    }

    var catIds=Object.keys(categories);
    var html='';
    for(var c=0;c<catIds.length;c++){
        var catId=catIds[c];
        var items=grouped[catId];
        if(!items||!items.length)continue;
        var catInfo=categories[catId];
        html+='<section class="category-section" data-category="'+catId+'">';
        html+='<div class="category-header">';
        html+='<div class="category-icon">'+catInfo.icon+'</div>';
        html+='<div class="category-info">';
        html+='<h2 class="category-name">'+catInfo.name+'</h2>';
        html+='<p class="category-desc">'+catInfo.desc+'</p>';
        html+='</div>';
        html+='<div class="category-count">'+items.length+' 愿</div>';
        html+='</div>';
        html+='<div class="cards-grid">';
        for(var k=0;k<items.length;k++){
            var item=items[k];
            var cfg=item.cfg;
            var title=cfg.title||item.id;
            var subtitle=cfg.subtitle||'神光庇佑';
            var isSvg=isSvgFile(cfg.file);
            var imgClass=isSvg?'card-img':'card-img card-img-raw';
            html+='<div class="card" data-id="'+item.id+'" style="animation-delay:'+(k*0.08)+'s">';
            html+='<div class="card-shine"></div>';
            html+='<div class="card-badge"><span class="card-number">'+cfg.id+'</span></div>';
            html+='<div class="card-img-wrap">';
            html+='<img class="'+imgClass+'" loading="lazy" src="'+cfg.file+'" alt="'+title+'">';
            html+='</div>';
            html+='<div class="card-info">';
            html+='<h3 class="card-title">'+title+'</h3>';
            html+='<p class="card-sub">'+subtitle+'</p>';
            html+='</div>';
            html+='</div>';
        }
        html+='</div></section>';
    }
    gallery.innerHTML=html;

    gallery.addEventListener('click',function(e){
        var card=e.target.closest('.card');
        if(!card)return;
        var id=card.getAttribute('data-id');
        if(id)open(id);
    });
}

buildCategoryNav();
renderGallery();

function updateDetailInfo(cfg){
    if(!cfg)return;
    
    document.getElementById('detailMainTitle').textContent = cfg.title;
    document.getElementById('detailSubTitle').textContent = cfg.subtitle;
    document.getElementById('detailBlessing').textContent = cfg.blessing;
    document.getElementById('detailIntro').textContent = cfg.introduction;
}

function open(id){
    if(isOpening)return;
    isOpening=true;
    lastOpenTime=Date.now();

    currentId=id;
    currentIndex=configKeys.indexOf(id);

    console.log('打开:'+id);
    viewer.style.display='block';

    setTimeout(function(){
        viewer.classList.add('show');
    },10);

    var cfg=svgConfigs[id];
    updateDetailInfo(cfg);

    loadImage(id,container1);
    container1.classList.add('active');

    playSound(id);

    setTimeout(function(){
        isOpening=false;
    },500);
}

function loadImage(id,container){
    var effectLayer=container.querySelector('.effect-layer');
    var svgLayer=container.querySelector('.svg-layer');
    var lightningLayer=container.querySelector('.lightning-layer');

    if(effectLayer._particleInterval){
        clearInterval(effectLayer._particleInterval);
        effectLayer._particleInterval=null;
    }

    if(lightningLayer&&lightningLayer._lightningInterval){
        clearInterval(lightningLayer._lightningInterval);
        lightningLayer._lightningInterval=null;
    }

    effectLayer.innerHTML='';
    svgLayer.innerHTML='';
    if(lightningLayer)lightningLayer.innerHTML='';
    container.className='card-container';

    var cfg=svgConfigs[id];

    // 设置弹窗背景
    // 优先级：背景图片 > 背景颜色
    // 注意：判断 containerBgImage 是图片路径还是颜色值
    function isImagePath(path){
        if(!path)return false;
        // 以 # 开头的是颜色值
        if(path.trim().startsWith('#'))return false;
        // 检查文件扩展名
        var ext=path.toLowerCase().split('.').pop();
        return ['png','jpg','jpeg','gif','webp','svg'].indexOf(ext)>-1;
    }

    if(cfg.containerBgImage){
        if(isImagePath(cfg.containerBgImage)){
            // 是图片路径，设置为背景图片
            container.style.background='url("'+cfg.containerBgImage+'") center/cover no-repeat';
        }else{
            // 是颜色值，直接设置背景色
            container.style.background=cfg.containerBgImage;
        }
    }else if(cfg.color){
        // 没有配置背景图片时，使用 color 作为背景色
        container.style.background=cfg.color;
    }

    if(isSvgFile(cfg.file)){
        // SVG文件 - 正常处理着色
        fetch(cfg.file)
        .then(function(r){return r.text()})
        .then(function(svg){
            svgLayer.innerHTML=svg;
            resetSvgColor(svgLayer,cfg.color||'#ffd700');
            runEffect(effectLayer,svgLayer,lightningLayer,cfg.effects,cfg.effectColors||{});
            console.log('SVG加载完成');
        })
        .catch(function(err){
            console.error('SVG加载失败:'+err);
        });
    }else{
        // 非SVG文件 - 直接作为图片显示，不着色
        var img=document.createElement('img');
        img.src=cfg.file;
        img.style.width='100%';
        img.style.height='100%';
        img.style.objectFit='contain';
        img.style.display='block';
        svgLayer.appendChild(img);
        // 仍然可以运行特效，但不着色图片
        runEffect(effectLayer,svgLayer,lightningLayer,cfg.effects,cfg.effectColors||{});
        console.log('图片加载完成(非SVG，不进行着色处理)');
    }
}

function switchToNext(){
    if(currentIndex<configKeys.length-1){
        currentIndex++;
    }else{
        currentIndex=0;
    }
    var nextId=configKeys[currentIndex];
    animateSwitch(nextId,'left');
}

function switchToPrev(){
    if(currentIndex>0){
        currentIndex--;
    }else{
        currentIndex=configKeys.length-1;
    }
    var prevId=configKeys[currentIndex];
    animateSwitch(prevId,'right');
}

function animateSwitch(id,direction){
    var currentContainer=activeContainer===1?container1:container2;
    var nextContainer=activeContainer===1?container2:container1;

    currentContainer.classList.remove('active');
    currentContainer.classList.add(direction==='left'?'exit-left':'exit-right');

    var cfg=svgConfigs[id];
    updateDetailInfo(cfg);

    loadImage(id,nextContainer);
    nextContainer.classList.add(direction==='left'?'enter-right':'enter-left');

    playSound(id);

    setTimeout(function(){
        nextContainer.classList.remove('enter-left','enter-right');
        nextContainer.classList.add('active');
        currentContainer.classList.remove('exit-left','exit-right');

        nextContainer.classList.add('bounce');
        setTimeout(function(){
            nextContainer.classList.remove('bounce');
        },500);

        activeContainer=activeContainer===1?2:1;
    },50);
}

function resetSvgColor(svgLayer,color){
    var svg=svgLayer.querySelector('svg');
    if(!svg)return;

    var elements=svg.querySelectorAll('path,rect,circle,polygon,ellipse,line,polyline');
    for(var i=0;i<elements.length;i++){
        var el=elements[i];
        var fill=el.getAttribute('fill');
        var stroke=el.getAttribute('stroke');

        if(fill&&fill!=='none'){
            el.setAttribute('fill',color);
        }

        if(stroke&&stroke!=='none'){
            el.setAttribute('stroke',color);
        }

        if(!fill&&!stroke){
            el.setAttribute('fill',color);
        }
    }
}

function runEffect(effectLayer,svgLayer,lightningLayer,list,effectColors){
    if(!effectColors)effectColors={};

    var oldEffectLayer=document.getElementById('effectLayer');
    var oldSvgLayer=document.getElementById('svgLayer');
    var oldLightningLayer=document.getElementById('lightningLayer');

    if(oldEffectLayer)oldEffectLayer.removeAttribute('id');
    if(oldSvgLayer)oldSvgLayer.removeAttribute('id');
    if(oldLightningLayer)oldLightningLayer.removeAttribute('id');

    effectLayer.id='effectLayer';
    svgLayer.id='svgLayer';
    if(lightningLayer)lightningLayer.id='lightningLayer';

    for(var i=0;i<list.length;i++){
        var e=list[i];
        var color=effectColors[e]||'#ffd700';
        if(effectEngine[e]){
            effectEngine[e](color);
        }
    }
}

function closeViewer() {
    console.log('关闭viewer');
    viewer.classList.remove('show');
    // 同时关闭详情面板
    detailPanel.classList.remove('show');
    stopSound();

    setTimeout(function() {
        viewer.style.display='none';
        container1.className='card-container active';
        container2.className='card-container';
        activeContainer=1;
    }, 300);
}

function playSound(id){
    if(isMuted)return;
    stopSound();

    var cfg=svgConfigs[id];
    var soundFile=cfg.sound||'assets/s1.mp3';

    currentAudio=new Audio(soundFile);
    currentAudio.loop=true;
    currentAudio.volume=0.5;

    currentAudio.play().catch(function(e){
        console.log('音效播放失败:',e);
    });
}

function stopSound(){
    if(currentAudio){
        currentAudio.pause();
        currentAudio.currentTime=0;
        currentAudio=null;
    }
}

function openDetailPanel() {
    detailPanel.classList.add('show');
}

window.closeDetailPanel = function() {
    console.log('closeDetailPanel 被调用');
    var panel = document.getElementById('detailPanel');
    if(panel) {
        panel.classList.remove('show');
        console.log('详情面板已关闭');
    } else {
        console.error('找不到 detailPanel 元素');
    }
};

closeBtn.addEventListener('click',function(e){
    e.stopPropagation();
    closeViewer();
});

muteBtn.addEventListener('click',function(e){
    e.stopPropagation();
    isMuted=!isMuted;
    muteBtn.textContent=isMuted?'静':'音';
    muteBtn.classList.toggle('muted',isMuted);

    if(isMuted){
        stopSound();
    }else if(currentId){
        playSound(currentId);
    }
});

detailBtn.addEventListener('click',function(e){
    e.stopPropagation();
    openDetailPanel();
});

// 下载按钮
var downloadBtn=document.getElementById('downloadBtn');
downloadBtn.addEventListener('click',function(e){
    e.stopPropagation();
    if(currentId){
        var cfg=svgConfigs[currentId];
        // 创建临时下载链接
        var link=document.createElement('a');
        link.href=cfg.file;
        // 从文件名提取扩展名
        var filename=cfg.title || currentId;
        var ext=cfg.file.split('.').pop();
        link.download=filename+'.'+ext;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

// detailBackdrop.addEventListener('click',function(e){
//     e.stopPropagation();
//     closeDetailPanel();
// });

detailClose.addEventListener('click',function(e){
    console.log('关闭按钮被点击');
    e.stopPropagation();
    e.preventDefault();
    closeDetailPanel();
});

// 也给detail-panel本身添加点击关闭功能（点击背景关闭）
detailPanel.addEventListener('click',function(e){
    if(e.target === detailPanel) {
        console.log('点击详情面板背景关闭');
        closeDetailPanel();
    }
});

viewer.addEventListener('touchstart',function(e){
    touchStartX=e.touches[0].clientX;
    isSwiping=true;
    hasMoved=false;
});

viewer.addEventListener('touchmove',function(e){
    if(isSwiping){
        touchEndX=e.touches[0].clientX;
        hasMoved=true;
    }
});

viewer.addEventListener('touchend',function(e){
    if(isSwiping&&hasMoved){
        var diff=touchStartX-touchEndX;
        if(Math.abs(diff)>5){
            e.preventDefault();
            if(diff>0){
                switchToNext();
            }else{
                switchToPrev();
            }
        }
    }
    isSwiping=false;
    hasMoved=false;
});

viewer.addEventListener('click',function(e){
    if(e.target===viewer||e.target.classList.contains('close-hint')||e.target.classList.contains('nav-hint')){
        closeViewer();
    }
});
