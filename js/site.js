document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const menu=document.querySelector('.menu-btn');
  const mobileNav=document.querySelector('.mobile-nav');
  const dropdownWrap=document.querySelector('.dropdown');
  const dropdown=dropdownWrap?.querySelector('button');

  const closeDropdown=()=>{
    if(!dropdownWrap||!dropdown)return;
    dropdownWrap.classList.remove('open');
    dropdown.setAttribute('aria-expanded','false');
  };

  const closeMenu=()=>{
    if(!header||!menu)return;
    header.classList.remove('menu-open');
    mobileEducation?.classList.remove('open');
    mobileEducationToggle?.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-expanded','false');
    menu.textContent='Menu';
  };


  const mobileEducation=header?.querySelector('.mobile-education');
  const mobileEducationToggle=mobileEducation?.querySelector('.mobile-education-toggle');
  if(mobileEducation&&mobileEducationToggle){
    mobileEducationToggle.addEventListener('click',()=>{
      const open=mobileEducation.classList.toggle('open');
      mobileEducationToggle.setAttribute('aria-expanded',String(open));
    });
  }

  /* Mobile navigation */
  if(menu&&header){
    menu.addEventListener('click',()=>{
      const open=header.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded',String(open));
      menu.setAttribute('aria-label',open?'Close menu':'Open menu');
      menu.textContent=open?'Close':'Menu';
    });
  }

  if(mobileNav){
    mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  }

  /* Education dropdown: click + hover/focus friendly on desktop/touch */
  if(dropdown&&dropdownWrap){
    dropdown.addEventListener('click',(event)=>{
      event.stopPropagation();
      const open=dropdown.getAttribute('aria-expanded')==='true';
      if(open) closeDropdown();
      else{
        dropdown.setAttribute('aria-expanded','true');
        dropdownWrap.classList.add('open');
      }
    });
    dropdownWrap.addEventListener('mouseenter',()=>{
      dropdownWrap.classList.add('open');
      dropdown.setAttribute('aria-expanded','true');
    });
    dropdownWrap.addEventListener('mouseleave',()=>{
      if(!dropdownWrap.matches(':focus-within')) closeDropdown();
    });
  }

  document.addEventListener('click',(event)=>{
    if(dropdownWrap&&!dropdownWrap.contains(event.target)) closeDropdown();
  });

  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape'){
      closeDropdown();
      closeMenu();
      menu?.focus();
    }
  });

  /* Header shadow */
  const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>12);
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  /* Reveal-on-scroll */
  const revealEls=[...document.querySelectorAll('.reveal')];
  revealEls.forEach((el,i)=>el.style.setProperty('--reveal-delay',`${Math.min(i%6,5)*60}ms`));
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.transitionDelay=getComputedStyle(entry.target).getPropertyValue('--reveal-delay');
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    }),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(el=>io.observe(el));
  }else{
    revealEls.forEach(el=>el.classList.add('in'));
  }

  /* Dynamic footer year */
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
});
