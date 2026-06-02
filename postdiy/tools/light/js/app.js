const gallery=document.getElementById('gallery');
const viewer=document.getElementById('viewer');
const container1=document.getElementById('cardContainer1');
const container2=document.getElementById('cardContainer2');
const closeBtn=document.getElementById('closeBtn');
const muteBtn=document.getElementById('muteBtn');

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

console.log('SVG神光卡片系统初始化');

var configs=Object.entries(svgConfigs);
for(var idx=0;idx<configs.length;idx++){
(function(){
var id=configs[idx][0];
var cfg=configs[idx][1];

var div=document.createElement('div');
div.className='card';
div.innerHTML='<img src="'+cfg.file+'"><div>'+id+'</div>';

div.onclick=function(){
console.log('点击卡片:'+id);
open(id);
};

gallery.appendChild(div);
})();
}

function open(id){
if(isOpening)return;
isOpening=true;
lastOpenTime=Date.now();

currentId=id;
currentIndex=configKeys.indexOf(id);

console.log('打开SVG:'+id);
viewer.style.display='block';

setTimeout(function(){
viewer.classList.add('show');
},10);

loadSVG(id,container1);
container1.classList.add('active');

playSound(id);

setTimeout(function(){
isOpening=false;
},500);
}

function loadSVG(id,container){
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

if(cfg.containerBgImage){
container.style.background='url("'+cfg.containerBgImage+'") center/cover no-repeat';
}else if(cfg.containerBg){
container.style.background=cfg.containerBg;
}

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

loadSVG(id,nextContainer);
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

function closeViewer(){
console.log('关闭viewer');
viewer.classList.remove('show');
stopSound();

setTimeout(function(){
viewer.style.display='none';
container1.className='card-container active';
container2.className='card-container';
activeContainer=1;
},300);
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

closeBtn.addEventListener('click',function(e){
e.stopPropagation();
closeViewer();
});

muteBtn.addEventListener('click',function(e){
e.stopPropagation();
isMuted=!isMuted;
muteBtn.textContent=isMuted?'🔇':'🔊';
muteBtn.classList.toggle('muted',isMuted);

if(isMuted){
stopSound();
}else if(currentId){
playSound(currentId);
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
