const gallery=document.getElementById('gallery');
const viewer=document.getElementById('viewer');
const svgLayer=document.getElementById('svgLayer');

console.log('SVG神光卡片系统初始化');
console.log('viewer元素:',viewer);
console.log('svgLayer元素:',svgLayer);

Object.entries(svgConfigs).forEach(([id,cfg])=>{
const div=document.createElement('div');
div.className='card';
div.innerHTML=`<img src="${cfg.file}"><div>${id}</div>`;
div.onclick=(e)=>{
e.preventDefault();
e.stopPropagation();
console.log('点击卡片:',id);
open(id);
};
div.ontouchend=(e)=>{
e.preventDefault();
e.stopPropagation();
console.log('触摸卡片:',id);
open(id);
};
gallery.appendChild(div);
});

function open(id){
console.log('打开SVG:',id);
console.log('viewer当前display:',window.getComputedStyle(viewer).display);
viewer.classList.add('active');
console.log('添加active后display:',window.getComputedStyle(viewer).display);
clearEffects();
const cfg=svgConfigs[id];
if(cfg.background){
viewer.style.background=cfg.background;
}
fetch(cfg.file).then(r=>r.text()).then(svg=>{
svgLayer.innerHTML=svg;
resetSvgColor(cfg.color || '#ffd700');
run(cfg.effects,cfg.effectColors || {});
console.log('SVG加载完成');
}).catch(err=>{
console.error('SVG加载失败:',err);
});
}

function resetSvgColor(color){
const svg=svgLayer.querySelector('svg');
if(!svg) return;

svg.querySelectorAll('path,rect,circle,polygon,ellipse,line,polyline').forEach(el=>{
const fill=el.getAttribute('fill');
const stroke=el.getAttribute('stroke');

if(fill && fill!=='none'){
el.setAttribute('fill',color);
}

if(stroke && stroke!=='none'){
el.setAttribute('stroke',color);
}

if(!fill && !stroke){
el.setAttribute('fill',color);
}
});
}

function run(list,effectColors={}){
list.forEach(e=>{
const color=effectColors[e] || '#ffd700';
if(effectEngine[e]){
effectEngine[e](color);
}
});
}

viewer.onclick=(e)=>{
console.log('点击viewer关闭');
viewer.classList.remove('active');
viewer.style.background='rgba(0,0,0,.9)';
};

viewer.ontouchend=(e)=>{
console.log('触摸viewer关闭');
viewer.classList.remove('active');
viewer.style.background='rgba(0,0,0,.9)';
};
