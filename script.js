
function dustBurst(x, y, container) {
  for (let i=0; i<12; i++) {
    const p = document.createElement('div');
    p.className = 'dust';
    const ang = Math.random()*Math.PI*2;
    const dist = 30 + Math.random()*40;
    const dx = Math.cos(ang)*dist;
    const dy = Math.sin(ang)*dist;
    p.style.left = (x) + 'px';
    p.style.top  = (y) + 'px';
    container.appendChild(p);
    requestAnimationFrame(()=>{
      p.style.transition = 'transform .4s ease-out, opacity .5s ease-out';
      p.style.transform = `translate(${dx}px, ${dy}px)`;
      p.style.opacity = 1;
      setTimeout(()=>{ p.remove(); }, 450);
    });
  }
}
function setupRocks() {
  const field = document.querySelector('.rock-field');
  if (!field) return;
  const rocks = [
    {x:70,  y:200, w:140},
    {x:280, y:210, w:160},
    {x:520, y:190, w:130},
    {x:760, y:205, w:150},
  ];
  rocks.forEach((r)=>{
    const img = document.createElement('img');
    img.src = 'assets/images/rock_0.svg';
    img.className = 'rock reveal';
    img.style.left = r.x+'px';
    img.style.top  = r.y+'px';
    img.style.width= r.w+'px';
    img.dataset.state = '0';
    img.alt = 'Rock';
    img.addEventListener('click', (ev)=>{
      let s = parseInt(img.dataset.state||'0',10);
      const rect = field.getBoundingClientRect();
      const cx = ev.clientX - rect.left;
      const cy = ev.clientY - rect.top;
      if (s < 2) {
        s += 1;
        img.dataset.state = String(s);
        img.src = `assets/images/rock_${s}.svg`;
        dustBurst(cx, cy, field);
      } else if (s === 2) {
        img.dataset.state = '3';
        img.src = 'assets/images/rock_3.svg';
        dustBurst(cx, cy, field);
        setTimeout(()=>{
          img.style.transition = 'opacity .35s ease-out, transform .35s ease-out';
          img.style.opacity = 0;
          img.style.transform = 'scale(0.9) translateY(6px)';
          setTimeout(()=> img.remove(), 360);
        }, 60);
      }
    });
    field.appendChild(img);
  });
}
function setupReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}
document.addEventListener('DOMContentLoaded', ()=> {
  setupRocks();
  setupReveal();
});
