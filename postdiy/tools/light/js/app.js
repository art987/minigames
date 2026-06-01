const gallery=document.getElementById('gallery');
const viewer=document.getElementById('viewer');
const svgLayer=document.getElementById('svgLayer');

Object.entries(svgConfigs).forEach(([id,cfg])=>{
const div=document.createElement('div');
div.className='card';
div.innerHTML=`<img src="${cfg.file}"><div>${id}</div>`;
div.onclick=()=>open(id);
gallery.appendChild(div);
});

function open(id){
viewer.classList.add('active');
clearEffects();
const cfg=svgConfigs[id];
if(cfg.background){
viewer.style.background=cfg.background;
}
fetch(cfg.file).then(r=>r.text()).then(svg=>{
svgLayer.innerHTML=svg;
resetSvgColor(cfg.color || '#ffd700');
run(cfg.effects,cfg.effectColors || {});
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

viewer.onclick=()=>{
viewer.classList.remove('active');
viewer.style.background='rgba(0,0,0,.9)';
};
