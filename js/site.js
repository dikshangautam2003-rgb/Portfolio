document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const menu=document.querySelector('.menu-btn');
  if(menu){
    menu.addEventListener('click',()=>{
      const open=header.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded',String(open));
    });
  }
  const dropdown=document.querySelector('.dropdown>button');
  if(dropdown){
    dropdown.addEventListener('click',()=>dropdown.setAttribute('aria-expanded',dropdown.getAttribute('aria-expanded')!=='true'));
  }

  const revealEls=[...document.querySelectorAll('.reveal')];
  revealEls.forEach((el,i)=>el.style.setProperty('--reveal-delay',`${Math.min(i%5,4)*55}ms`));
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.transitionDelay=getComputedStyle(e.target).getPropertyValue('--reveal-delay');
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }),{threshold:.12,rootMargin:'0px 0px -50px 0px'});
  revealEls.forEach(el=>io.observe(el));

  document.querySelectorAll('.service-card,.detail-card,.guide-tile,.article-card,.process-card,.edu-card').forEach(card=>{
    card.addEventListener('pointerenter',()=>card.classList.add('is-active'));
    card.addEventListener('pointerleave',()=>card.classList.remove('is-active'));
  });
});