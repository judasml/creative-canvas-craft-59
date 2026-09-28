(()=>{
  const root=document.documentElement;
  const body=document.body;
  if(!body.classList.contains('family-impact'))return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let frame=0;
  const updatePointer=(event)=>{
    if(frame||reduced)return;
    frame=requestAnimationFrame(()=>{
      const x=event.clientX/innerWidth;
      const y=event.clientY/innerHeight;
      root.style.setProperty('--mx',`${Math.round(x*100)}%`);
      root.style.setProperty('--my',`${Math.round(y*100)}%`);
      root.style.setProperty('--impact-x',((x-.5)*-13).toFixed(2));
      root.style.setProperty('--impact-y',((y-.5)*-9).toFixed(2));
      frame=0;
    });
  };
  addEventListener('pointermove',updatePointer,{passive:true});
  const targets=document.querySelectorAll('.impact-manifesto__inner,.impact-process__head,.impact-step');
  targets.forEach(node=>node.classList.add('impact-observe'));
  if(reduced||!('IntersectionObserver'in window)){
    targets.forEach(node=>node.classList.add('is-seen'));
    return;
  }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-seen');observer.unobserve(entry.target)}
  }),{threshold:.18});
  targets.forEach(node=>observer.observe(node));
})();
