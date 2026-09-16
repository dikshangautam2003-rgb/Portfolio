document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const menu=document.querySelector('.menu-btn');
  const mobileNav=document.querySelector('.mobile-nav');

  /* Mobile menu */
  if(menu&&header){
    menu.addEventListener('click',()=>{
      const open=header.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded',String(open));
      menu.textContent=open?'Close':'Menu';
    });
    if(mobileNav)mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      header.classList.remove('menu-open');
      menu.setAttribute('aria-expanded','false');
      menu.textContent='Menu';
    }));
  }

  /* Dropdown (touch support) */
  const dropdown=document.querySelector('.dropdown>button');
  if(dropdown){
    dropdown.addEventListener('click',()=>{
      const open=dropdown.getAttribute('aria-expanded')==='true';
      dropdown.setAttribute('aria-expanded',String(!open));
      dropdown.parentElement.classList.toggle('open',!open);
    });
  }

  /* Header shadow on scroll */
  const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>12);
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  /* Reveal-on-scroll */
  const revealEls=[...document.querySelectorAll('.reveal')];
  revealEls.forEach((el,i)=>el.style.setProperty('--reveal-delay',`${Math.min(i%6,5)*60}ms`));
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.transitionDelay=getComputedStyle(e.target).getPropertyValue('--reveal-delay');
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  revealEls.forEach(el=>io.observe(el));

  /* Dynamic footer year */
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
});