const gallery=document.getElementById('gallery');
const viewer=document.getElementById('viewer');
const svgLayer=document.getElementById('svgLayer');

console.log('SVG神光卡片系统初始化');

Object.entries(svgConfigs).forEach(([id,cfg])=>{
const div=document.createElement('div');
div.className='card';
div.innerHTML='<img src="'+cfg.file+'"><div>'+id+'</div>';

div.addEventListener('click',function(){
console.log('点击卡片:'+id);
open(id);
});

div.addEventListener('touchend',function(e){
e.preventDefault();
console.log('触摸卡片:'+id);
open(id);
});

gallery.appendChild(div);
});

function open(id){
console.log('打开SVG:'+id);
viewer.style.display='block';
console.log('viewer display:'+viewer.style.display);

clearEffects();
const cfg=svgConfigs[id];

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
})
.catch(function(err){
console.error('SVG加载失败:'+err);
});
}

function resetSvgColor(color){
const svg=svgLayer.querySelector('svg');
if(!svg)return;

const elements=svg.querySelectorAll('path,rect,circle,polygon,ellipse,line,polyline');
for(let i=0;i<elements.length;i++){
const el=elements[i];
const fill=el.getAttribute('fill');
const stroke=el.getAttribute('stroke');

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

for(let i=0;i<list.length;i++){
const e=list[i];
const color=effectColors[e]||'#ffd700';
if(effectEngine[e]){
effectEngine[e](color);
}
}
}

function closeViewer(){
console.log('关闭viewer');
viewer.style.display='none';
viewer.style.background='rgba(0,0,0,0.9)';
}

viewer.addEventListener('click',closeViewer);
viewer.addEventListener('touchend',function(e){
e.preventDefault();
closeViewer();
});
