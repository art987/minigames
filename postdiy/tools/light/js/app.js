const gallery=document.getElementById('gallery');
const viewer=document.getElementById('viewer');
const svgLayer=document.getElementById('svgLayer');

var isOpening=false;
var lastOpenTime=0;

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

console.log('打开SVG:'+id);
viewer.style.display='block';

clearEffects();
var cfg=svgConfigs[id];

if(cfg.background){
viewer.style.background=cfg.background;
}

fetch(cfg.file)
.then(function(r){return r.text()})
.then(function(svg){
svgLayer.innerHTML=svg;
resetSvgColor(cfg.color||'#ffd700');
run(cfg.effects,cfg.effectColors||{});
console.log('SVG加载完成');
setTimeout(function(){
isOpening=false;
},500);
})
.catch(function(err){
console.error('SVG加载失败:'+err);
isOpening=false;
});
}

function resetSvgColor(color){
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

function run(list,effectColors){
if(!effectColors)effectColors={};

for(var i=0;i<list.length;i++){
var e=list[i];
var color=effectColors[e]||'#ffd700';
if(effectEngine[e]){
effectEngine[e](color);
}
}
}

function closeViewer(){
var now=Date.now();
if(now-lastOpenTime<500){
console.log('忽略误关闭');
return;
}
console.log('关闭viewer');
viewer.style.display='none';
viewer.style.background='rgba(0,0,0,0.9)';
}

viewer.onclick=closeViewer;
