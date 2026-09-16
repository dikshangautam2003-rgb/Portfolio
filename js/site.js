document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const menu=document.querySelector('.menu-btn');
  if(menu){menu.addEventListener('click',()=>{const open=header.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(open));});}
  const dropdown=document.querySelector('.dropdown>button');
  if(dropdown){dropdown.addEventListener('click',()=>dropdown.setAttribute('aria-expanded',dropdown.getAttribute('aria-expanded')!=='true'));}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  document.querySelectorAll('.service-card').forEach(card=>{
    card.addEventListener('pointerenter',()=>card.classList.add('is-active'));
    card.addEventListener('pointerleave',()=>card.classList.remove('is-active'));
  });
});