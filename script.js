
async function loadProjects(){ const r=await fetch('assets/projects.json',{cache:'no-store'}); const d=await r.json(); return d.projects||[]; }
function getSlug(){ const u=new URL(window.location.href); return u.searchParams.get('p'); }
function setupReveal(){ const els=document.querySelectorAll('.reveal'); const io=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target);} }); }, {threshold:0.1}); els.forEach(el=>io.observe(el)); }
function card(p){
  const label = p.overlayTitle || p.title;
  return `
    <a class="card reveal" href="project.html?p=${p.slug}">
      <div class="media">
        <img src="${p.cover}" alt="${p.title} cover">
        <div class="hover-overlay"><div class="hover-title">${label}</div></div>
      </div>
    </a>`;
}
async function renderProjectGrid(){ const grid=document.querySelector('#project-grid'); if(!grid) return; const ps=await loadProjects(); ps.sort((a,b)=>(b.order||0)-(a.order||0)).forEach(p=>grid.insertAdjacentHTML('beforeend',card(p))); setupReveal(); }
async function renderProjectPage(){
  const root=document.querySelector('#project-root'); if(!root) return;
  const ps=await loadProjects(); const slug=getSlug(); const p=ps.find(x=>x.slug===slug);
  if(!p){ root.innerHTML = `<div class="container section"><p>Project not found.</p></div>`; return; }
  document.title = `${p.title} — Yousuf Shahabuddin`;

  let mediaHtml='';
  if(p.pdf){
    mediaHtml = `<div class="pdf-wrap reveal"><iframe class="pdf-frame" src="${p.pdf}" title="${p.title} PDF" loading="lazy"></iframe></div>
                 <div class="container" style="text-align:center;margin-top:8px"><a href="${p.pdf}" target="_blank" rel="noopener">Open full PDF in new tab</a></div>`;
  }else{
    const imgs = (p.images||[]).map(src=>`<figure class="figure reveal"><div class="figure-inner"><img src="${src}" alt="${p.title} image"></div></figure>`).join('');
    const vids = (p.videos||[]).map(src=>`<figure class="figure reveal"><div class="figure-inner"><video src="${src}" controls playsinline muted></video></div></figure>`).join('');
    mediaHtml = imgs + vids || '<p class="container">Add images/videos in assets/projects.json</p>';
  }

  const collabHtml=(p.collaborators||[]).map(c=>c.url?`<a href="${c.url}" target="_blank" rel="noopener">${c.name}</a>`:(c.name||"")).filter(Boolean).join(', ')||'—';

  root.innerHTML = `
    <section class="container section">
      <div class="title-wrap reveal">
        <h1>${p.title}</h1>
        <div class="subtitle">${p.subtitle || 'Selected work'}</div>
      </div>
      <div class="meta-row reveal"><span>Role: ${p.role || '—'}</span><span>Year: ${p.year || '—'}</span></div>
      <p class="description reveal">${p.description || ''}</p>
    </section>
    <section class="section">
      <h2 class="reveal" style="text-align:center">Project Media</h2>
      ${mediaHtml}
    </section>
    <section class="container section">
      <h2 class="reveal">Collaborators</h2>
      <p class="reveal" style="text-align:center">${collabHtml}</p>
    </section>`;

  setupReveal();
}
document.addEventListener('DOMContentLoaded', ()=>{ renderProjectGrid(); renderProjectPage(); setupReveal(); });
