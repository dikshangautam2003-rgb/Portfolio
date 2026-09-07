const index=[
{title:"Education in Nepal",type:"Education",url:"/education/",desc:"Colleges, courses, admissions, study abroad and education consultancies."},
{title:"BCA Colleges in Kathmandu",type:"Education",url:"/education/colleges/best-bca-colleges-kathmandu/",desc:"A research-led comparison framework for BCA options in Kathmandu Valley."},
{title:"Products in Nepal",type:"Products",url:"/products/",desc:"Buying guides, reviews and comparisons built around Nepal-specific decisions."},
{title:"Best Earbuds Under NPR 2,000 in Nepal",type:"Products",url:"/products/buying-guides/best-earbuds-under-2000-nepal/",desc:"Budget earbuds research with price, fit, battery, microphone and warranty considerations."},
{title:"Travel in Nepal",type:"Travel",url:"/travel/",desc:"Places, things to do, treks and hotels researched for practical decisions."},
{title:"Best Treks in Nepal",type:"Travel",url:"/travel/treks/best-treks-in-nepal/",desc:"Compare major Nepal treks by difficulty, duration, season, crowds and experience."},
{title:"How Dikshan Researches",type:"Research",url:"/research/how-we-research/",desc:"Evidence hierarchy, confidence, reviews, freshness and editorial independence."},
{title:"Methodology",type:"Research",url:"/research/methodology/",desc:"How ranking criteria change by category and how evidence becomes an editorial verdict."},
{title:"About Dikshan",type:"About",url:"/about/",desc:"Why Dikshan exists and how the research desk is being built."}];
const q=document.querySelector("#siteSearch"),out=document.querySelector("#searchResults"),count=document.querySelector("#searchCount");
function render(term=""){const s=term.trim().toLowerCase(),hits=s?index.filter(x=>(x.title+" "+x.type+" "+x.desc).toLowerCase().includes(s)):index;if(count)count.textContent=s?`${hits.length} result${hits.length===1?"":"s"}`:"Explore the research desk";if(out)out.innerHTML=hits.length?hits.map(x=>`<a class="search-result" href="${x.url}"><small>${x.type}</small><h3>${x.title}</h3><p>${x.desc}</p></a>`).join(""):`<div class="empty">No matching page yet. Try a broader term.</div>`}q?.addEventListener("input",e=>render(e.target.value));render();