document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector(".menu-btn"), mobile=document.querySelector(".mobile-nav");
 if(menu&&mobile) menu.addEventListener("click",()=>{mobile.classList.toggle("open");});
 const links=[...document.querySelectorAll("a[href]")];
 links.forEach(a=>a.addEventListener("click",()=>{ if(mobile) mobile.classList.remove("open"); }));
 const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");obs.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));
});