
(() => {
 const toggle=document.querySelector('#menuToggle'), mobile=document.querySelector('#mobileNav');
 if(toggle&&mobile){toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',open);toggle.textContent=open?'Close':'Menu'})}
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const reveals=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach(e=>io.observe(e))}else reveals.forEach(e=>e.classList.add('show'));
 const form=document.querySelector('#siteSearchForm'),input=document.querySelector('#siteSearchInput'),results=document.querySelector('#searchResults');
 if(form&&input&&results){fetch('/search-index.json').then(r=>r.json()).then(index=>{
  const render=q=>{q=q.trim().toLowerCase();if(!q){results.innerHTML='<p class="note">Search Education, Products, Travel or useful guides.</p>';return}
   const words=q.split(/\s+/),ranked=index.map(x=>({...x,score:words.reduce((n,w)=>n+((x.title+' '+x.description+' '+(x.keywords||[]).join(' ')).toLowerCase().includes(w)?1:0),0)})).filter(x=>x.score).sort((a,b)=>b.score-a.score);
   results.innerHTML=ranked.length?ranked.slice(0,20).map(x=>`<div class="result"><a href="${x.url}">${x.title}</a><p>${x.description}</p></div>`).join(''):'<p class="note">No close matches. Try “college”, “earbuds”, “treks” or “study abroad”.</p>'};
  form.addEventListener('submit',e=>{e.preventDefault();render(input.value);history.replaceState(null,'','/search/?q='+encodeURIComponent(input.value))});
  const q=new URLSearchParams(location.search).get('q')||'';if(q){input.value=q;render(q)}
 }).catch(()=>results.innerHTML='<p class="note">Search is temporarily unavailable.</p>')}
 const contactForms=document.querySelectorAll('#contactForm');
 contactForms.forEach(form=>{
  form.addEventListener('submit',async e=>{
   e.preventDefault();
   const button=form.querySelector('button[type="submit"]'),status=form.querySelector('.form-status');
   const original=button.textContent;
   button.disabled=true; button.textContent='Sending…'; status.textContent='';
   try{
    const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    const data=await response.json();
    if(response.ok && data.success){
      form.reset(); status.textContent='Thanks — your message has been sent.';
      status.className='form-status success';
    } else throw new Error(data.message||'Unable to send');
   }catch(err){
    status.textContent='We couldn’t send that message right now. Please try again.';
    status.className='form-status error';
   }finally{button.disabled=false;button.textContent=original}
  });
 });
})();
