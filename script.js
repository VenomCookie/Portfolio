// Prevent double-initialization across pages
if (!window.__YS_INIT__) {
  window.__YS_INIT__ = true;

  async function loadProjects(){
    try{
      const r = await fetch('assets/projects.json?v=20', {cache:'no-store'});
      if(!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      if(!d || !Array.isArray(d.projects)) throw new Error('projects.json missing "projects" array');
      return d.projects;
    }catch(err){
      console.error(err);
      const grid = document.querySelector('#project-grid');
      if(grid){
        grid.innerHTML = `<div style="padding:14px;border:1px solid #333;border-radius:8px">
          <strong>Couldn’t load projects.json.</strong><br/><small>${String(err.message)}</small>
        </div>`;
      }
      return [];
    }
  }

  function getSlug(){ return new URL(window.location.href).searchParams.get('p'); }

  function setupReveal(){
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
      });
    }, {threshold:0.1});
    els.forEach(el=>io.observe(el));
  }

  function card(p){
    const label = p.overlayTitle || p.title || '';
    const cover = p.cover || '';
    return `
      <a class="card reveal" href="project.html?p=${encodeURIComponent(p.slug)}">
        <div class="media">
          <img src="${cover}" alt="${(p.title||'project')} cover">
          <div class="hover-overlay"><div class="hover-title">${label}</div></div>
        </div>
      </a>`;
  }

  // Renders grid ONCE per page load
  let gridRendered = false;
  async function renderProjectGrid(){
    const grid = document.querySelector('#project-grid');
    if(!grid || gridRendered) return;
    gridRendered = true;                          // guard
    const ps = await loadProjects();
    ps.sort((a,b)=>(b.order||0)-(a.order||0));
    grid.innerHTML = ps.map(card).join('');       // overwrite (no accumulation)
    setupReveal();
  }

  // Fade the projects section from 0.4 -> 1.0 during first 300px of scroll
  function fadeProjectsOnScroll(){
    const sec = document.getElementById('projects');
    if(!sec) return;
    const onScroll = () => {
      const y = window.scrollY;
      const t = Math.max(0, Math.min(1, y / 300));
      sec.style.opacity = (0.4 + 0.6*t).toString();
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Floating back-to-top button (one instance)
  function attachBackToTop(){
    if (document.getElementById('backToTop')) return;
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.textContent = '↑ Top';
    document.body.appendChild(btn);
    btn.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
    const onScroll = () => { btn.style.display = window.scrollY > 400 ? 'inline-flex' : 'none'; };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  async function renderProjectPage(){
    const root = document.querySelector('#project-root');
    if(!root) return;

    const ps = await loadProjects();
    const p = ps.find(x=>x.slug===getSlug());
    if(!p){ root.innerHTML = `<div class="container section"><p>Project not found.</p></div>`; return; }
    document.title = `${p.title} — Yousuf Shahabuddin`;

    // Optional intro (used by Electronics)
    let introHtml = '';
    if (p.introTitle || p.introText || p.introImage){
      introHtml = `
        <section class="elx-hero">
          <div class="container elx-grid">
            <div class="elx-copy reveal">
              <h1>${p.introTitle || p.title || ''}</h1>
              <p class="elx-lead">${p.introText || ''}</p>
              <div class="scroll-hint">Scroll to see more ↓</div>
            </div>
            <div class="elx-photo reveal">
              <img src="${p.introImage || ''}" alt="Intro image">
            </div>
          </div>
        </section>`;
    }

    // Media (PDF or images/videos)
    let mediaHtml = '';
    if (p.pdf){
      mediaHtml = `
        <div class="pdf-wrap reveal">
          <iframe class="pdf-frame" src="${p.pdf}" title="${p.title} PDF" loading="lazy"></iframe>
        </div>
        <div class="container" style="text-align:center;margin-top:8px">
          <a href="${p.pdf}" target="_blank" rel="noopener">Open full PDF in new tab</a>
        </div>`;
    } else {
      const imgs = (p.images||[]).map(src => `
        <figure class="figure reveal"><div class="figure-inner"><img src="${src}" alt="${p.title} image"></div></figure>`).join('');
      const vids = (p.videos||[]).map(src => `
        <figure class="figure reveal"><div class="figure-inner"><video src="${src}" controls playsinline muted></video></div></figure>`).join('');
      mediaHtml = imgs + vids || '<p class="container">Add images/videos in assets/projects.json</p>';
    }

    const collabHtml = (p.collaborators||[]).slice(0,4).map(c=>{
      if(!c || !c.name) return '';
      const url = c.url || '#';
      return `<a class="btn-linkedin" href="${url}" target="_blank" rel="noopener" aria-label="${c.name} on LinkedIn">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="currentColor" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5C1.11 6 0 4.881 0 3.5 0 2.12 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.98H4.7V24H.22zM8.9 8.98h4.29v2.05h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.89V24H18.4v-6.66c0-1.59-.03-3.64-2.22-3.64-2.22 0-2.56 1.74-2.56 3.53V24H9.04V8.98z"/>
        </svg><span>${c.name}</span></a>`;
    }).join('') || '—';

    root.innerHTML = `
      ${introHtml}
      <section class="container section">
        <div class="title-wrap reveal">
          <h1>${p.title || ''}</h1>
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
    attachBackToTop();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderProjectGrid();   // guarded (won’t double insert)
    renderProjectPage();
    setupReveal();
    fadeProjectsOnScroll();
    attachBackToTop();
  });
}
