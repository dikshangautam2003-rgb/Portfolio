(function(){
  const toggle=document.getElementById('menuToggle');
  const mobile=document.getElementById('mobileNav');
  if(toggle&&mobile){toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('open');document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',open);});}
  const eduBtn=document.getElementById('mobileEduToggle');
  const edu=document.getElementById('mobileEdu');
  if(eduBtn&&edu){eduBtn.addEventListener('click',()=>edu.classList.toggle('open'));}
  document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length>1){const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}}));
})();
