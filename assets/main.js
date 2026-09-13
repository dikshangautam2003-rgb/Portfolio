(function(){
 const toggle=document.getElementById('menuToggle'),mobile=document.getElementById('mobileNav');
 if(toggle&&mobile){toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
 const eb=document.getElementById('mobileEduToggle'), em=document.getElementById('mobileEdu');
 if(eb&&em) eb.addEventListener('click',()=>{const open=em.classList.toggle('open');eb.setAttribute('aria-expanded',String(open));});
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const header=document.getElementById('siteHeader');
 if(header) window.addEventListener('scroll',()=>header.classList.toggle('is-scrolled',window.scrollY>12),{passive:true});
 if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');const el=id&&document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}}));
})();
