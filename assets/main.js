
(() => {
 const t=document.querySelector('#menuToggle'), m=document.querySelector('#mobileNav');
 if(t&&m)t.addEventListener('click',()=>{let o=m.classList.toggle('open');t.setAttribute('aria-expanded',o);t.textContent=o?'Close':'Menu'});
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
 const f=document.querySelector('#searchForm'), q=document.querySelector('#searchInput'), r=document.querySelector('#results');
 if(f&&q&&r)fetch('/search-index.json').then(x=>x.json()).then(index=>{
   const render=s=>{let w=s.toLowerCase().trim().split(/\s+/).filter(Boolean); if(!w.length){r.innerHTML='<p class="note">Search Education, Products or Travel.</p>';return}
   let a=index.map(x=>({...x,score:w.reduce((n,z)=>n+((x.title+' '+x.description+' '+x.keywords.join(' ')).toLowerCase().includes(z)?1:0),0)})).filter(x=>x.score).sort((a,b)=>b.score-a.score);
   r.innerHTML=a.length?a.slice(0,20).map(x=>`<div class="result"><a href="${x.url}">${x.title}</a><p>${x.description}</p></div>`).join(''):'<p class="note">No close match yet. Try “college”, “earbuds”, “trek”, “Pokhara” or “study abroad”.</p>'};
   f.addEventListener('submit',e=>{e.preventDefault();render(q.value)});let p=new URLSearchParams(location.search).get('q');if(p){q.value=p;render(p)}
 }).catch(()=>r.innerHTML='<p class="note">Search is temporarily unavailable.</p>');
})();
