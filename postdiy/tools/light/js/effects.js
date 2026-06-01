const effectEngine = {

goldGlow:(color='#ffd700')=> {
const svgLayer=document.getElementById('svgLayer');
svgLayer.classList.add('glow');
svgLayer.style.setProperty('--glow-color',color);
},

pulseGlow:(color='#ffd700')=> {
const svgLayer=document.getElementById('svgLayer');
svgLayer.classList.add('pulse-glow');
svgLayer.style.setProperty('--pulse-color',color);

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
const totalParticles=80;
const duration=800;
const particleLife=1500;

for(let i=0;i<totalParticles;i++){
const delay=Math.random()*duration;

setTimeout(()=>{
const p=document.createElement('div');
p.className='particle';
p.style.background=color;
p.style.boxShadow=`0 0 10px ${color}`;

const angle=Math.random()*Math.PI*2;
const distance=200+Math.random()*300;
const speed=0.8+Math.random()*0.4;

const targetX=Math.cos(angle)*distance;
const targetY=Math.sin(angle)*distance;

p.style.left='50%';
p.style.top='50%';
p.style.transform='translate(-50%, -50%) scale(0)';

container.appendChild(p);

const startTime=Date.now();
const animate=()=>{
const elapsed=Date.now()-startTime;
const progress=elapsed/(particleLife/speed);

if(progress<1){
const currentX=targetX*progress;
const currentY=targetY*progress;
const scale=1-progress*0.5;
const opacity=1-progress;

p.style.transform=`translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${scale})`;
p.style.opacity=opacity;

requestAnimationFrame(animate);
}else{
p.remove();
}
};

requestAnimationFrame(animate);
},delay);
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
document.getElementById('effectLayer').innerHTML='';
document.getElementById('svgLayer').className='';
const pulseStyle=document.getElementById('pulse-glow-style');
if(pulseStyle) pulseStyle.remove();
}
