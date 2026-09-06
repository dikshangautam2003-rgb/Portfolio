document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('#menuToggle');
  const mobile=document.querySelector('#mobileNav');
  if(toggle&&mobile){toggle.addEventListener('click',()=>{mobile.classList.toggle('open'); toggle.setAttribute('aria-expanded',mobile.classList.contains('open'));});}
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
});
