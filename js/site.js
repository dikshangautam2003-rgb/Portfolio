document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector(".menu-btn"), mobile=document.querySelector(".mobile-nav");
 if(menu&&mobile){menu.addEventListener("click",()=>{mobile.classList.toggle("open"); menu.setAttribute("aria-expanded",mobile.classList.contains("open"));});}
 const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in");obs.unobserve(entry.target)}}),{threshold:.1});
 document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
});
