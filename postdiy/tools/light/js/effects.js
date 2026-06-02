const effectEngine = {

goldGlow:(color='#ffd700')=> {
const svgLayer=document.getElementById('svgLayer');
svgLayer.classList.add('glow');
svgLayer.style.setProperty('--glow-color',color);
},

pulseGlow:(color='#ffd700')=> {
const svgLayer=document.getElementById('svgLayer');
const svg=svgLayer.querySelector('svg');

svgLayer.classList.add('pulse-glow');
svgLayer.style.setProperty('--pulse-color',color);

if(svg){
svg.style.transformOrigin='center center';
svg.classList.add('breathe-scale');
}

const style=document.createElement('style');
style.id='pulse-glow-style';
style.innerHTML=`
.pulse-glow{
animation:pulse 2s infinite ease-in-out;
}
@keyframes pulse{
0%{filter:drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})}
50%{filter:drop-shadow(0 0 15px ${color}) drop-shadow(0 0 40px ${color})}
100%{filter:drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})}
}
.breathe-scale{
animation:breatheScale 1.2s ease-in-out infinite;
}
@keyframes breatheScale{
0%,100%{transform:scale(1)}
50%{transform:scale(1.01)}
}
`;
document.head.appendChild(style);
},

lightRays:(color='#ffd700')=> {
const el=document.createElement('div');
el.className='light-rays';
el.style.background=`repeating-conic-gradient(rgba(${hexToRgb(color)},.9) 0deg,rgba(${hexToRgb(color)},.2) 2deg,transparent 6deg)`;
document.getElementById('effectLayer').appendChild(el);
},

burstRays:(color='#ff6b6b')=> {
const el=document.createElement('div');
el.className='light-rays';
el.style.background=`repeating-conic-gradient(rgba(${hexToRgb(color)},.9) 0deg,rgba(${hexToRgb(color)},.2) 2deg,transparent 6deg)`;
el.style.filter='blur(2px) brightness(2)';
document.getElementById('effectLayer').appendChild(el);
},

particles:(color='#ffd86a')=> {
const container=document.getElementById('effectLayer');
if(!container)return;

if(container._particleInterval){
clearInterval(container._particleInterval);
}

const spawnRate=20;
const particleLife=1200;
const spreadSpeed=1.5;

const spawnParticle=()=>{
const p=document.createElement('div');
p.className='particle';
p.style.cssText=`
position:absolute;
left:50%;
top:50%;
width:${3+Math.random()*4}px;
height:${3+Math.random()*4}px;
background:${color};
border-radius:50%;
box-shadow:0 0 ${8+Math.random()*8}px ${color};
transform:translate(-50%,-50%) scale(0);
pointer-events:none;
`;

const angle=Math.random()*Math.PI*2;
const distance=300+Math.random()*500;
const targetX=Math.cos(angle)*distance;
const targetY=Math.sin(angle)*distance;

container.appendChild(p);

const startTime=Date.now();
const animate=()=>{
const elapsed=Date.now()-startTime;
const progress=elapsed/(particleLife/spreadSpeed);

if(progress<1){
const currentX=targetX*progress;
const currentY=targetY*progress;
const scale=Math.min(progress*4,1)*(1-progress*0.3);
const opacity=1-progress;

p.style.transform=`translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${scale})`;
p.style.opacity=opacity;

requestAnimationFrame(animate);
}else{
if(p.parentNode)p.remove();
}
};

requestAnimationFrame(animate);
};

container._particleInterval=setInterval(spawnParticle,spawnRate);

for(let i=0;i<40;i++){
setTimeout(spawnParticle,i*20);
}
},

lightning:(color='#ffffff')=> {
const container=document.getElementById('lightningLayer');
if(!container)return;

if(container._lightningInterval){
clearInterval(container._lightningInterval);
}

const generateBolt=()=>{
const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('viewBox','0 0 100 100');
svg.setAttribute('preserveAspectRatio','none');

const startX=Math.random()*100;
const startY=0;
const endX=20+Math.random()*60;
const endY=80+Math.random()*20;

let path=`M ${startX} ${startY}`;
let currentX=startX;
let currentY=startY;
const segments=6+Math.floor(Math.random()*4);

for(let i=0;i<segments;i++){
const remaining=segments-i;
const targetX=startX+(endX-startX)*(i+1)/segments;
const targetY=startY+(endY-startY)*(i+1)/segments;
const offsetX=(Math.random()-0.5)*25;
const offsetY=(Math.random()-0.5)*10;
const midX=currentX+(targetX-currentX)/2+offsetX;
const midY=currentY+(targetY-currentY)/2+offsetY;
path+=` L ${midX} ${midY}`;
currentX=midX;
currentY=midY;
}
path+=` L ${endX} ${endY}`;

const branches=Math.floor(Math.random()*3);
let branchPaths='';
for(let b=0;b<branches;b++){
const branchStart=Math.random()*0.6+0.2;
const branchStartX=startX+(endX-startX)*branchStart;
const branchStartY=startY+(endY-startY)*branchStart;
const branchEndX=branchStartX+(Math.random()-0.5)*40;
const branchEndY=branchStartY+Math.random()*30;
branchPaths+=`<path d="M ${branchStartX} ${branchStartY} L ${(branchStartX+branchEndX)/2+(Math.random()-0.5)*15} ${(branchStartY+branchEndY)/2} L ${branchEndX} ${branchEndY}" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.7"/>`;
}

svg.innerHTML=`
<defs>
<filter id="glow-${Date.now()}-${Math.random()}">
<feGaussianBlur stdDeviation="2" result="coloredBlur"/>
<feMerge>
<feMergeNode in="coloredBlur"/>
<feMergeNode in="SourceGraphic"/>
</feMerge>
</filter>
</defs>
<g filter="url(#glow-${Date.now()}-${Math.random()})">
<path d="${path}" stroke="${color}" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
${branchPaths}
</g>
`;

const size=60+Math.random()*40;
svg.style.cssText=`
position:absolute;
left:${Math.random()*30}%;
top:${Math.random()*10}%;
width:${size}%;
height:${size*1.2}%;
pointer-events:none;
opacity:0;
transform:rotate(${(Math.random()-0.5)*20}deg);
`;

container.appendChild(svg);

let flashCount=0;
const totalFlashes=2+Math.floor(Math.random()*3);
const flashInterval=setInterval(()=>{
flashCount++;
if(flashCount%2===1){
svg.style.opacity=1;
}else{
svg.style.opacity=0;
}

if(flashCount>=totalFlashes*2){
clearInterval(flashInterval);
setTimeout(()=>{
if(svg.parentNode)svg.remove();
},200);
}
},60);
};

container._lightningInterval=setInterval(generateBolt,800+Math.random()*1500);

setTimeout(generateBolt,100);
setTimeout(generateBolt,400);
},

slowRotate:(speed=10)=> {
const svgLayer=document.getElementById('svgLayer');

svgLayer.style.animation=`slowRotate ${speed}s linear infinite`;

const style=document.createElement('style');
style.id='slow-rotate-style';
style.innerHTML=`
@keyframes slowRotate{
from{transform:rotate(0deg)}
to{transform:rotate(360deg)}
}
`;
if(!document.getElementById('slow-rotate-style')){
document.head.appendChild(style);
}
}

};

function hexToRgb(hex){
hex=hex.replace('#','').replace(/ff$/,'');
const r=parseInt(hex.substring(0,2),16);
const g=parseInt(hex.substring(2,4),16);
const b=parseInt(hex.substring(4,6),16);
return`${r},${g},${b}`;
}

function clearEffects(){
const effectLayer=document.getElementById('effectLayer');
if(!effectLayer)return;

if(effectLayer._particleInterval){
clearInterval(effectLayer._particleInterval);
effectLayer._particleInterval=null;
}

const lightningLayer=document.getElementById('lightningLayer');
if(lightningLayer){
if(lightningLayer._lightningInterval){
clearInterval(lightningLayer._lightningInterval);
lightningLayer._lightningInterval=null;
}
lightningLayer.innerHTML='';
}

effectLayer.innerHTML='';
const svgLayer=document.getElementById('svgLayer');
svgLayer.className='';
svgLayer.style.animation='';

const svg=svgLayer.querySelector('svg');
if(svg){
svg.style.animation='';
svg.style.transformOrigin='';
svg.classList.remove('breathe-scale');
}

const pulseStyle=document.getElementById('pulse-glow-style');
if(pulseStyle) pulseStyle.remove();

const rotateStyle=document.getElementById('slow-rotate-style');
if(rotateStyle) rotateStyle.remove();
}
