
const nav=document.querySelector('.site-nav');
if(nav) window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20),{passive:true});
const menu=document.querySelector('.menu'), mobile=document.querySelector('.mobile-nav');
if(menu&&mobile) menu.addEventListener('click',()=>mobile.classList.toggle('open'));
if(mobile) mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());

const form=document.querySelector('#contactForm');
if(form){
  const status=document.querySelector('#formStatus');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=form.querySelector('button[type="submit"]');
    const label=btn.querySelector('span:first-child');
    const old=label.textContent;
    label.textContent='Sending…'; btn.disabled=true;
    try{
      const r=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(!r.ok) throw new Error();
      form.reset(); status.textContent='Thanks — your message has been sent. I’ll get back to you soon.'; status.classList.add('show');
    }catch(err){
      status.textContent='Couldn’t send automatically. Please email dikshangautam2003@gmail.com directly.'; status.classList.add('show');
    }finally{label.textContent=old;btn.disabled=false}
  });
}
