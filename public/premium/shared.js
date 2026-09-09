const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let active = true;
let pausedByUser = false;
const motionButton = document.querySelector('[data-motion]');
function updateMotion(){
  const running = active && !pausedByUser && !reduce.matches && !document.hidden;
  document.documentElement.classList.toggle('motion-paused',!running);
  document.querySelectorAll('video[data-autoplay]').forEach(v=>running?v.play().catch(()=>{}):v.pause());
  if(motionButton){motionButton.textContent=pausedByUser?'▶':'Ⅱ';motionButton.setAttribute('aria-label',pausedByUser?'Reanudar movimiento':'Pausar movimiento');motionButton.setAttribute('aria-pressed',String(pausedByUser));}
  dispatchEvent(new CustomEvent('motionchange',{detail:{running}}));
}
motionButton?.addEventListener('click',()=>{pausedByUser=!pausedByUser;updateMotion()});
addEventListener('message',e=>{if(e.source!==parent)return;if(e.data?.type==='mk-visibility'){active=!!e.data.active;updateMotion()}if(e.data?.type==='mk-pause'){pausedByUser=!!e.data.paused;updateMotion()}});
document.addEventListener('visibilitychange',updateMotion);reduce.addEventListener('change',updateMotion);
document.querySelectorAll('video').forEach(v=>v.addEventListener('loadeddata',updateMotion));
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.open).showModal()));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('[data-close]')?.addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
document.querySelectorAll('.service-tag').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'))));
document.querySelectorAll('form[data-demo]').forEach(f=>f.addEventListener('submit',e=>{
 e.preventDefault();const status=f.querySelector('[role=status]');status.hidden=false;status.textContent='Esta es una demostración: tus datos no se han enviado. El formulario se conectará al medio de contacto de tu negocio.';
}));
updateMotion();
