const video=document.querySelector('video');
const mobile=matchMedia('(max-width:700px)');
const table=JSON.parse(document.getElementById('gaze').textContent);
let pointer=null, desiredTime=0, frame=0, enabled=true;
const wrap=a=>{const tau=Math.PI*2;return((a+Math.PI)%tau+tau)%tau-Math.PI};
function seek(){frame=0;if(!enabled||mobile.matches||reduce.matches||video.readyState<2||video.seeking)return;if(Math.abs(video.currentTime-desiredTime)>1/48)video.currentTime=Math.min(desiredTime,video.duration-1/24)}
function schedule(){if(!frame)frame=requestAnimationFrame(seek)}
function target(){
 if(!pointer||mobile.matches||!enabled||reduce.matches)return;
 const r=video.getBoundingClientRect(),s=Math.max(r.width/1920,r.height/1080);
 const dx=pointer.x-(r.left+r.width/2+(948-960)*s),dy=pointer.y-(r.top+r.height/2+(418-540)*s);
 if(Math.hypot(dx,dy)<8)return;
 const angle=Math.atan2(dy,dx);let distance=Infinity;
 for(const [a,t] of table){const d=Math.abs(wrap(angle-a));if(d<distance){distance=d;desiredTime=t+1/240}}
 schedule();
}
function sync(){if(mobile.matches&&enabled&&!reduce.matches)video.play().catch(()=>{});else{video.pause();target()}}
addEventListener('pointermove',e=>{pointer={x:e.clientX,y:e.clientY};target()},{passive:true});
addEventListener('resize',target);addEventListener('scroll',target,{passive:true});
video.addEventListener('seeked',schedule);video.addEventListener('loadeddata',sync);mobile.addEventListener('change',sync);
addEventListener('motionchange',e=>{enabled=e.detail.running;sync()});sync();
