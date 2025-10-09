
async function loadProjects(){
  const res=await fetch('assets/projects.json',{cache:'no-store'});
  const data=await res.json();
  return data.projects||[];
}
function getSlug(){return new URL(window.location.href).searchParams.get('p');}
function setupReveal(){
  const els=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}});},{threshold:.1});
  els.forEach(el=>io.observe(el));
}
function setupParallax(){
  const ps=document.querySelectorAll('.fullbleed');
  function onScroll(){
    const vh=window.innerHeight;
    ps.forEach(el=>{
      const rect=el.getBoundingClientRect();
      const c=rect.top+rect.height/2-vh/2;
      const s=Math.max(-1,Math.min(1,c/(vh*.8)));
      el.style.transform=`translateX(-50%) translateY(${s*8}px)`;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
}
function card(p){
  return `<a class='card reveal' href='project.html?p=${p.slug}'>
    <img src='${p.cover}' alt='${p.title}'/>
    <div class='overlay'><div class='title'>${p.title}</div><div class='meta'>${p.year||''}</div></div>
  </a>`;
}
async function renderGrid(){
  const grid=document.querySelector('#project-grid');
  if(!grid)return;
  const ps=await loadProjects();
  ps.sort((a,b)=>(b.order||0)-(a.order||0)).forEach(p=>grid.insertAdjacentHTML('beforeend',card(p)));
  setupReveal();
}
async function renderProject(){
  const root=document.querySelector('#project-root');
  if(!root)return;
  const ps=await loadProjects();
  const slug=getSlug();
  const p=ps.find(x=>x.slug===slug);
  if(!p){root.innerHTML='<div class=container>Project not found.</div>';return;}
  document.title=`${p.title} — Portfolio`;
  const imgs=(p.images||[]).map(s=>`<figure class='fullbleed reveal'><img src='${s}' alt='${p.title}'/></figure>`).join('');
  const vids=(p.videos||[]).map(s=>`<figure class='fullbleed reveal'><video src='${s}' controls muted playsinline></video></figure>`).join('');
  root.innerHTML=`
    <div class='container section'>
      <div class='title-wrap reveal'><h1>${p.title}</h1><div class='subtitle'>${p.subtitle||''}</div></div>
      <div class='meta-row reveal'><span>${p.role||''}</span> • <span>${p.year||''}</span></div>
      <p class='description reveal'>${p.description||''}</p>
    </div>
    <section class='section'>${imgs+vids}</section>`;
  setupReveal();setupParallax();
}
document.addEventListener('DOMContentLoaded',()=>{renderGrid();renderProject();setupReveal();setupParallax();});
