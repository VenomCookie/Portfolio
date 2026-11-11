(function () {
  "use strict";

  var LIVE = "/";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var P = [
    {
      slug: "fea-running-blade", order: 90, code: "FEA", flagship: true, title: "FEA of a Prosthetic Running Blade", year: 2026, scope: "Individual", role: "Simulation & analysis",
      disc: ["Simulation", "CAD & Prototyping"], tools: ["Ansys Mechanical 2024 R2", "Fusion 360", "Stress-life fatigue", "Goodman correction", "Modal analysis"],
      hook: "Fatigue and natural-frequency study of a cheetah-style blade: two geometries, two materials, one recommendation.",
      big: ["97.4 Hz", "fundamental frequency of the recommended CFRP design"],
      summary: "A finite element study of a lightweight, cheetah-style prosthetic running blade under a 2,100 N foot strike with 500 N of friction. I iterated the geometry in CFRP, then tested the improved design in Aluminium 2014-T4. CFRP design 2 cut peak stress by 25.1%, raised the fundamental frequency by 29% to 97.4 Hz and passed every criterion; aluminium failed fatigue and weight.",
      did: ["Modelled the blade in Fusion 360 and set up static structural, stress-life fatigue and modal analyses in Ansys Mechanical.", "Ran global and local mesh convergence studies (5 mm global, 3 mm at the inner radius, 0.09% error) and checked mesh quality.", "Validated the model: reaction force within 0.03% of the applied load, physical deformation, and peak stress where curved-beam theory predicts.", "Iterated the geometry (larger bend radius, variable thickness) and compared three configurations against a 1,000,000-cycle fatigue target, a 50 Hz floor and a 600 g limit."],
      stats: [["−25.1%", "peak stress, design 1 → 2 (403 → 302 MPa)", 10], ["97.4 Hz", "fundamental frequency, CFRP design 2 (floor 50 Hz)", 11], ["4.97", "safety margin on UTS, up from 3.72", 10], ["422 g", "mass of CFRP design 2 (limit 600 g)", 10]],
      media: [["fea5.webp", "Aluminium von Mises stress, 314 MPa peak"], ["fea1.webp", "Design 1 and design 2 renders"], ["fea0.webp", "Design 1 CFRP, von Mises stress"], ["fea2.webp", "Converged mesh, design 1"], ["fea3.webp", "Design 2 CFRP, mode 1 at 97.4 Hz"], ["fea4.webp", "Aluminium fatigue life, minimum 26,670 cycles"]],
      cover: "c-fea.webp", pdf: "assets/docs/FEA_RunningBlade_YS.pdf", lab: "fea"
    },
    {
      slug: "pdet2folio", order: 95, code: "PDE", flagship: true, title: "AlignΞd: Knee Brace for Gym Beginners", year: 2026, scope: "Pair", role: "Mechanism design, assembly & user research",
      disc: ["Product Design", "CAD & Prototyping", "UX & Research"], tools: ["Fusion 360", "User interviews", "DFM", "Electronics"],
      hook: "A brace that helps beginners hold good form and keep tempo through a squat.",
      big: ["Boost", "confidence in gym beginners"],
      summary: "Beginners are an underserved group in the gym: generic and specialist kit exists, but nothing helps you through the door. We interviewed members of the public and high-end gyms in South Kensington, including Equinox and Retro Fit, then designed and built a working knee brace that helps correct form and keep to a tempo during squats.",
      did: ["Designed the one-handed tightening mechanism and adapted it to the brace.", "Designed the enclosure with Zayn, who built the sensors and code, then assembled the final product.", "Wrote the A3 report; Zayn wrote the technical report.", "Interviewed members of the public and gym staff with Zayn."],
      stats: [["Working", "prototype, assembled by me"], ["2 gyms", "Equinox and Retro Fit, plus members of the public"], ["2", "person team, with Zayn Muntazir"]],
      media: [["pde0.webp", "Cover render"], ["pde1.webp", "Research and problem framing"], ["pde2.webp", "Concept development"]],
      cover: "c-pde.webp", reports: [["A3 report (PDF)", "assets/docs/PDE2.pdf?v=2"], ["Technical report (PDF)", "assets/docs/PDE_Technical.pdf"]], credits: [["Zayn Muntazir", "https://www.linkedin.com/in/zayn-muntazir-44721b281/"]], lab: "tempo"
    },
    {
      slug: "thermo1", order: 92, code: "CFD", flagship: true, title: "Ventara: Aerodynamic Pick-up Truck", year: 2026, scope: "Individual", role: "Design & CFD",
      disc: ["Simulation", "CAD & Prototyping", "UX & Research"], tools: ["Ansys Fluent", "Fusion 360", "Polyhedral mesh", "Figma"],
      hook: "A pick-up redesigned for low drag, tested in CFD at 1:18 scale.",
      big: ["0.3864", "drag coefficient of the final design"],
      summary: "A vehicle archetype redesigned to cut drag. Pick-ups are common and draggy, so I took one through research, sketching, CAD and CFD, borrowing ideas from the Cybertruck, McLaren Speedtail, Bugatti Bolide dimples and Lotus Evija ducts.",
      did: ["Ran the CFD in Fluent: 1:18 model at 30.5 m/s, 1 mm local mesh, polyhedral fill.", "Iterated the body to reduce drag and improve efficiency.", "Presented findings and recommendations for further development."],
      stats: [["0.3864", "drag coefficient, Cd"], ["0.2396", "lift coefficient, Cl"], ["293.87 N", "full-scale drag estimate at 30.5 m/s"], ["1:18", "scale model in Ansys Fluent"]],
      media: [["thermo0.webp", "Concept and benchmarks"], ["thermo1.webp", "Form development"]],
      cover: "c-ventara.webp", reports: [["Full report (PDF)", "assets/docs/YousufShahabuddin_Thermo1.pdf"]], lab: "drag"
    },
    {
      slug: "thermo2-battery", order: 85, code: "TF2", title: "Fastback Aero & Battery Cooling Plate", year: 2026, scope: "Group", role: "Car and battery analysis",
      disc: ["Simulation", "CAD & Prototyping"], tools: ["Ansys Fluent", "Wind tunnel testing", "3D printing", "Hand calculations", "Thermal resistance networks"],
      hook: "A fastback sedan checked in CFD and the wind tunnel, plus a multi-pass cooling plate for a battery pack.",
      summary: "Two linked studies. A fastback sedan designed for low drag and high-speed stability reached a CFD drag coefficient of 0.32 with slight downforce, then a 3D-printed model measured 0.33 in a closed-loop wind tunnel, within 3%. Alongside it we designed a liquid cooling plate for a battery pack: a multi-pass serpentine layout with dual inlets and outlets, sized with hand calculations of pressure drop and a thermal resistance network.",
      did: ["Worked on the car and the battery analysis sections of the report.", "Charlie Salt led the hand calculations and battery analysis, Zayn Muntazir the car and the CFD comparison, and Zipei Weng the CFD setup, simulation and optimisation."],
      stats: [["4", "person team"], ["0.32", "CFD drag coefficient at 30.5 m/s"], ["3%", "gap between CFD and wind-tunnel Cd (0.33)"], ["−0.05", "lift coefficient: slight downforce"], ["35.3 °C", "predicted battery temperature"]],
      media: [["bat0.webp", "Cover: the fastback and the cooling plate"], ["bat1.webp", "Project summary and CFD findings"], ["bat3.webp", "Wind tunnel testing"], ["bat2.webp", "Cooling plate design"], ["bat4.webp", "Cooling plate 3D modelling"]],
      reports: [["Full report (PDF)", "assets/docs/Battery_Pipeline.pdf"]],
      credits: [["Zayn Muntazir", "https://www.linkedin.com/in/zayn-muntazir-44721b281/"], ["Charlie Salt", "https://www.linkedin.com/in/charlie-salt-307168335/"], ["Zipei Weng", "https://www.linkedin.com/in/zipeiweng/"]]
    },
    {
      slug: "azul", order: 80, code: "AZL", title: "Azul", year: 2025, scope: "Individual", role: "Software / front-end",
      disc: ["Software"], tools: ["JavaScript", "ES Modules", "Ramda", "Mocha", "Accessibility"],
      hook: "A complete, playable web build of the board game, Minecraft themed.",
      summary: "A fully playable build of Azul for 2 to 4 players, written in JavaScript as a web app.",
      did: ["Implemented the full ruleset as a pure functional module, independent of the interface and covered by unit tests.", "Built the browser UI in vanilla JavaScript: drafting, pattern lines, wall tiling, scoring and end-game bonuses.", "Added full keyboard play and a high-contrast mode for colour-blind players."],
      stats: [["2–4", "players"], ["100%", "keyboard playable"]],
      media: [["azul1.webp", "Game board"]], cover: "azul0.webp", live: "azul/index.html"
    },
    {
      slug: "electronics", order: 75, code: "ESP", title: "Electronics Games", year: 2025, scope: "Individual", role: "Embedded, firmware & prototyping",
      disc: ["Embedded", "CAD & Prototyping"], tools: ["ESP32", "C++", "Arduino"],
      hook: "ESP32 builds: a memory game and a Martian-style hex message relay.",
      summary: "A set of ESP32 builds exploring physical interaction. The headline pieces are a Chimp Memory sequence game and a relay that points out letters in hexadecimal, the way Mark Watney signals in The Martian.",
      did: ["Built a memory sequence game with flashing LEDs and a companion app for entering the recalled sequence.", "Designed a relay that encodes a message to hex and physically points at each character in turn.", "Handled firmware, wiring and enclosure prototyping end to end."],
      stats: [["2", "working hardware demos"]],
      media: [["elec0.webp", "The builds"], ["elec1.webp", "Wiring and enclosure"]], lab: "hex"
    },
    {
      slug: "hydromorph", order: 70, code: "HYD", title: "HydroMorph", year: 2024, scope: "Individual", role: "Design & engineering",
      disc: ["Product Design", "Sustainability", "CAD & Prototyping"], tools: ["Rendering", "Lo-fi prototyping", "DFM"],
      hook: "A morphing dive-fin shoe that replaces several pairs of footwear.",
      summary: "HydroMorph combines several footwear products in one, for convenience and to cut the volume of footwear made each year and the waste that follows.",
      did: ["Developed the morphing-fin concept and form through lo-fi prototyping.", "Produced the renders and the rationale for materials, manufacture and end of life."],
      media: [["hydro0.webp", "Concept"], ["hydro1.webp", "Mechanism"], ["hydro2.webp", "Materials and end of life"]]
    },
    {
      slug: "sustainable-design-engineering", order: 65, code: "SDE", title: "Sustainable Aircraft Seating", year: 2025, scope: "Group", role: "Research & design",
      disc: ["Sustainability", "UX & Research"], tools: ["Lifecycle analysis", "CAD", "Research"],
      hook: "Economy long-haul seats redesigned around real pain points and lifecycle impact.",
      summary: "A group study of the long-haul economy cabin, finding pain points and sustainability gaps, followed by my individual redesign of the seat and the systems around it.",
      did: ["Researched market demand, existing products and lifecycle impact.", "Explored a focused seat and systems redesign, then integrated it with the team's view.", "Wrote the individual report and design rationale."],
      stats: [["4", "person team for the group study"]],
      media: [["sde0.webp", "Report cover"]], reports: [["Group report (PDF)", "assets/docs/SDE_Group.pdf"], ["My individual exploration (PDF)", "assets/docs/SDE_Solo.pdf"]],
      credits: [["Leia Whitaker", "https://www.linkedin.com/in/leia-whitaker/"], ["Karanjeet", ""], ["Curtis Light", "https://www.linkedin.com/in/curtis-light/"]]
    },
    {
      slug: "rhythmrush", order: 60, code: "RR", title: "RhythmRush", year: 2025, scope: "Group", role: "Team project",
      disc: ["UX & Research", "Product Design"], tools: ["User research", "Concept design", "Prototyping", "3D modelling"],
      hook: "Concert queues turned into a social, physical rhythm game.",
      summary: "A human-centred design project with Team NEXUS that reimagines concert queues as a lively, shared experience: a motion-tracked dance game people play while they wait.",
      didTitle: "Team", did: ["A joint effort across the five of us, from discovery research to the final delivery report.", "3D models and animation by Amarie Fasoro."],
      stats: [["5", "person team"]],
      media: [["rr0.webp", "Report cover"]], reports: [["Discovery report (PDF)", "assets/docs/Project_HCD.pdf"], ["Delivery report (PDF)", "assets/docs/Rhythm_Rush_HCD.pdf"]],
      extra: ["Live body-tracking demo by Ruaridh Murdoch", "https://ruaridhmurdoch.com"],
      credits: [["Ruaridh Murdoch", "https://www.linkedin.com/in/ruaridh-murdoch-399ba4260/"], ["Ikem Enebeli", "https://www.linkedin.com/in/ikem-e/"], ["Aidan Ryder", "https://www.linkedin.com/in/aidan-ryder-b848aa266/"], ["Amarie Fasoro", "https://www.linkedin.com/in/amarie-fasoro-8104a42bb/"]]
    },
    {
      slug: "drinks-dispenser", order: 55, code: "DRK", title: "Drinks Dispenser", year: 2024, scope: "Individual", role: "Design & engineering",
      disc: ["Product Design", "CAD & Prototyping"], tools: ["Fusion 360", "3D printing", "DFM"],
      hook: "A countertop dispenser for MEDD Café, Jeddah: fast, hygienic, repairable.",
      summary: "A countertop soft-drinks dispenser so baristas at MEDD Café in Jeddah can focus on speciality coffee, built to be simple to clean and repair. I'm now in discussion with MEDD about a possible UK branch.",
      did: ["Took the brief through research, concept and prototype on my own.", "Designed for quick cleaning, simple repair and a form that fits behind a café counter.", "In ongoing discussion with the client as they consider opening in the UK."],
      media: [["drinks0.webp", "Prototype"]], cover: "c-drinks.webp"
    },
    {
      slug: "pocket-shaver", order: 50, code: "SHV", title: "Pocket Shaver Redesign", year: 2025, scope: "Individual", role: "Design & engineering",
      disc: ["Product Design", "CAD & Prototyping"], tools: ["Fusion 360", "Reverse engineering", "Material selection"],
      hook: "A Braun shaver reverse-engineered for lower mass and better repairability.",
      summary: "A reverse-engineering and redesign of a Braun pocket shaver, rebuilt for lighter weight, better repairability and lower end-of-life impact.",
      did: ["Detailed a redesigned shaver with materials and processes specified."],
      media: [["shaver0.webp", "Redesign"]], cover: "c-shaver.webp"
    },
    {
      slug: "ipad-stand", order: 45, code: "IPD", title: "iPad Stand", year: 2025, scope: "Individual", role: "Design & engineering",
      disc: ["CAD & Prototyping", "Product Design"], tools: ["Fusion 360", "FDM printing"],
      hook: "An adjustable printed stand with a curved, no-slip front lip.",
      summary: "An adjustable 3D-printed iPad stand with a curved front lip, so the device sits securely at several angles and your finger never fouls the screen when swiping up.",
      did: ["Modelled the stand in Fusion 360 with several viewing angles and a no-slip front edge.", "Printed and tested it for stability and angle adjustment."],
      media: [["ipad0.webp", "Render"]], cover: "c-ipad.webp"
    },
    {
      slug: "firstgendocs", order: 40, code: "FGD", title: "First Gen Doctors Website", year: 2025, scope: "Individual", role: "Design & front-end",
      disc: ["UX & Research"], tools: ["Web", "UX", "Visual design"],
      hook: "A crisper site with colour and depth that react to scrolling.",
      summary: "A redesign of the First Gen Doctors website: sleeker and more consistent, with colour and depth that shift subtly as you scroll. Desktop first, mobile in progress.",
      did: ["Redesigned the visual system and key pages.", "Added gradient and shadow shifts on scroll."],
      media: [["fgd0.webp", "Homepage"]]
    }
  ];
  P.sort(function (a, b) { return (b.order || 0) - (a.order || 0); });
  P.forEach(function (p, i) { p.n = i + 1; if (p.pdf && !p.reports) p.reports = [["Full report (PDF)", p.pdf]]; });
  var bySlug = {}; P.forEach(function (p) { bySlug[p.slug] = p; });

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pad(n, w) { n = String(n); while (n.length < w) n = "0" + n; return n; }
  function valHtml(v) { return esc(v); }
  var DIM = {"azul0.webp":[499,500],"azul1.webp":[900,679],"bat0.webp":[900,636],"bat1.webp":[900,636],"bat2.webp":[900,636],"bat3.webp":[900,636],"bat4.webp":[900,636],"c-drinks.webp":[856,532],"c-fea.webp":[1083,726],"c-pde.webp":[1400,788],"c-ipad.webp":[416,335],"c-shaver.webp":[656,558],"c-ventara.webp":[1400,868],"drinks0.webp":[900,500],"elec0.webp":[900,600],"elec1.webp":[900,2010],"fea0.webp":[900,545],"fea1.webp":[900,626],"fea2.webp":[612,629],"fea3.webp":[900,683],"fea4.webp":[900,544],"fea5.webp":[900,516],"fgd0.webp":[900,502],"hydro0.webp":[900,637],"hydro1.webp":[900,637],"hydro2.webp":[900,637],"ipad0.webp":[900,506],"pde0.webp":[900,506],"pde1.webp":[900,637],"pde2.webp":[900,637],"rr0.webp":[900,506],"sde0.webp":[900,637],"shaver0.webp":[900,506],"thermo0.webp":[900,636],"thermo1.webp":[900,636]};
  function dims(f) { var d = DIM[f]; return d ? ' width="' + d[0] + '" height="' + d[1] + '"' : ""; }
  function cover(p) { return p.cover || p.media[0][0]; }
  var ICON = {
    ext: '<svg class="i i-ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    go: '<svg class="i i-go" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    tick: '<svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };
  function spring(o) {
    var x = o.from, v = o.v || 0, k = o.k || 200, c = o.c || 24, eps = o.eps || 0.05, last = performance.now(), raf = null;
    function step(now) {
      var dt = Math.min((now - last) / 1000, 0.04), n = Math.max(1, Math.ceil(dt / 0.004)), h = dt / n;
      last = now;
      for (var i = 0; i < n; i++) { v += (-k * (x - o.to) - c * v) * h; x += v * h; }
      if (Math.abs(x - o.to) < eps && Math.abs(v) < eps * 20) { raf = null; o.onUpdate(o.to); if (o.onDone) o.onDone(); return; }
      o.onUpdate(x);
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return function () { if (raf) cancelAnimationFrame(raf); raf = null; };
  }
  function track(name, params) { try { if (window.gtag) window.gtag("event", name, params || {}); } catch (err) { } }
  function fadeIn(root) {
    Array.prototype.forEach.call(root.querySelectorAll(".media-ld img"), function (img) {
      if (img.complete && img.naturalWidth) { img.classList.add("is-in"); return; }
      img.addEventListener("load", function () { img.classList.add("is-in"); }, { once: true });
      img.addEventListener("error", function () { img.classList.add("is-in"); }, { once: true });
    });
  }

  var flags = P.filter(function (p) { return p.flagship; });
  $("flags").innerHTML = flags.map(function (p, i) {
    var withLine = p.credits ? '<div class="with">with ' + p.credits.map(function (c) { return c[1] ? '<a href="' + c[1] + '" target="_blank" rel="noopener">' + esc(c[0]) + '</a>' : esc(c[0]); }).join(" &amp; ") + '</div>' : "";
    var links = '<button type="button" class="primary" data-open="' + p.slug + '">Read summary ' + ICON.go + '</button>';
    if (p.reports) links += '<a href="' + LIVE + p.reports[0][1] + '" target="_blank" rel="noopener">Report PDF ' + ICON.ext + '</a>';
    if (p.live) links += '<a href="' + LIVE + p.live + '" target="_blank" rel="noopener">Play ' + ICON.ext + '</a>';
    var f = cover(p);
    return '<article class="feat rv" data-open="' + p.slug + '">' +
      '<div class="feat-body"><div class="feat-intro">' +
      '<div class="feat-top"><span class="feat-n">' + pad(i + 1, 2) + '</span><div class="meta"><span>' + esc(p.disc[0]) + '</span><span>' + esc(p.scope) + '</span><span>' + p.year + '</span></div></div>' +
      '<h3><a href="#' + p.slug + '">' + esc(p.title) + '</a></h3>' + withLine + '<p>' + esc(p.hook) + '</p></div>' +
      '<div class="feat-out"><div class="feat-stat"><b>' + valHtml(p.big[0]) + '</b><span>' + esc(p.big[1]) + '</span></div>' +
      '<div class="links">' + links + '</div></div></div>' +
      '<figure class="feat-media media-ld"><img src="/assets/images/web/' + f + '"' + dims(f) + ' alt="' + esc(p.media[0][1]) + '" loading="lazy" decoding="async"></figure>' +
      '</article>';
  }).join("");

  var others = P.filter(function (p) { return !p.flagship; });
  $("moreGrid").innerHTML = others.map(function (p, i) {
    var f = cover(p);
    var img = '<img src="/assets/images/thumb/' + f + '" srcset="/assets/images/thumb/' + f + ' 600w, /assets/images/web/' + f + ' 900w" sizes="(min-width: 1700px) 300px, (min-width: 1300px) 22vw, (min-width: 980px) 30vw, (min-width: 640px) 45vw, 92vw"' + dims(f) + ' alt="" loading="lazy" decoding="async">';
    var meta = '<div class="meta"><span>' + esc(p.disc[0]) + '</span><span>' + p.year + '</span></div>';
    return '<article class="tile rv" data-open="' + p.slug + '"><div class="tile-in">' +
      '<div class="face front" aria-hidden="true"><div class="media media-ld">' + img + '</div>' +
      '<div class="body">' + meta + '<h3>' + esc(p.title) + '</h3><p>' + esc(p.hook) + '</p></div></div>' +
      '<div class="face back"><div class="media media-ld">' + img.replace('alt=""', 'alt="' + esc(p.media[0][1]) + '"') +
      (p.live ? '<a class="play" href="' + LIVE + p.live + '" target="_blank" rel="noopener">Play now ' + ICON.ext + '</a>' : '') + '</div>' +
      '<div class="body">' + meta + '<h3><a href="#' + p.slug + '">' + esc(p.title) + '</a></h3><p>' + esc(p.hook) + '</p></div></div>' +
      '</div></article>';
  }).join("") + '<article class="tile wip rv"><div class="wip-in"><div class="meta"><span>Currently building</span></div><ul><li>A wearable biosensor aimed at early disease detection.</li><li>An airline seat-selection tool that helps travellers get value for money.</li></ul></div></article>';
  fadeIn(document);

  var dlg = $("sheet"), body = $("shBody"), current = null, originImg = null, labStop = null;

  function render(p) {
    current = p;
    $("shCode").textContent = pad(p.n, 2) + " / " + pad(P.length, 2);
    var h = "";
    h += '<div class="sh-group"><div class="sh-head"><h2 id="shTitle">' + esc(p.title) + '</h2><div class="tb">' +
      '<div><small>Year</small><span>' + p.year + '</span></div><div><small>Scope</small><span>' + esc(p.scope) + '</span></div>' +
      '<div><small>Role</small><span>' + esc(p.role) + '</span></div><div><small>Discipline</small><span>' + esc(p.disc[0]) + '</span></div></div></div>';
    if (p.live) h += '<div class="live-cta"><a class="btn btn-cta" href="' + LIVE + p.live + '" target="_blank" rel="noopener">Play it live ' + ICON.ext + '</a><span>Runs in your browser, nothing to download.</span></div>';
    h += '</div>';
    h += '<div class="gal"><div class="gal-track' + (p.media.length > 1 ? ' multi' : '') + '" id="galTrack" tabindex="0" aria-label="Figures, scroll sideways">' + p.media.map(function (m, i) {
      return '<figure class="gal-slide' + (i ? '' : ' on') + '"><img src="/assets/images/web/' + m[0] + '"' + dims(m[0]) + ' alt="' + esc(m[1]) + '" decoding="async" draggable="false"></figure>';
    }).join("") + '</div>';
    h += '<div class="gal-bar"><b id="galFig">Fig. 01' + (p.media.length > 1 ? ' / ' + pad(p.media.length, 2) : '') + '</b><span id="galCap">' + esc(p.media[0][1]) + '</span>' +
      (p.media.length > 1 ? '<button class="icon-btn" type="button" id="galPrev" aria-label="Previous figure" disabled><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><button class="icon-btn" type="button" id="galNext" aria-label="Next figure"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' : '') + '</div>';
    if (p.media.length > 1) {
      h += '<div class="thumbs" id="galThumbs" aria-label="All figures">' + p.media.map(function (m, i) {
        return '<button type="button" data-i="' + i + '" aria-current="' + (i === 0) + '" aria-label="Figure ' + (i + 1) + ': ' + esc(m[1]) + '" title="' + esc(m[1]) + '"><img src="/assets/images/web/' + m[0] + '" alt="" decoding="async" draggable="false"></button>';
      }).join("") + '</div>';
    }
    h += '</div>';
    if (p.stats) h += '<div class="stats">' + p.stats.map(function (s) { return '<div><b>' + valHtml(s[0]) + '</b><span>' + esc(s[1]) + '</span>' + (s[2] && p.pdf ? '<a class="pg" href="' + LIVE + p.pdf + '#page=' + (s[2] + 1) + '" target="_blank" rel="noopener">Report p. ' + s[2] + ' ' + ICON.ext + '</a>' : '') + '</div>'; }).join("") + '</div>';
    h += '<div class="cols"><div><h3 class="h-sm">Summary</h3><p>' + p.summary + '</p></div><div><h3 class="h-sm">' + esc(p.didTitle || "What I did") + '</h3><ul class="did">' + p.did.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join("") + '</ul></div></div>';
    if (p.lab) h += '<div id="labMount"></div>';
    h += '<div class="sh-group"><div><h3 class="h-sm">Tools & methods</h3><div class="tags">' + p.tools.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("") + '</div></div>';
    if (p.credits) h += '<div class="credits"><h3 class="h-sm">With</h3>' + p.credits.map(function (c) { return c[1] ? '<a href="' + c[1] + '" target="_blank" rel="noopener">' + esc(c[0]) + '</a>' : esc(c[0]); }).join(", ") + '</div>';
    h += '</div>';
    var acts = [];
    if (p.reports) p.reports.forEach(function (r, i) { acts.push('<a class="btn ' + (i ? 'btn-tonal' : 'btn-solid') + '" href="' + LIVE + r[1] + '" target="_blank" rel="noopener">' + esc(r[0]) + ' ' + ICON.ext + '</a>'); });
    if (p.extra) acts.push('<a class="btn btn-tonal" href="' + p.extra[1] + '" target="_blank" rel="noopener">' + esc(p.extra[0]) + ' ' + ICON.ext + '</a>');
    h += '<div class="sh-group">';
    if (acts.length) h += '<div class="acts">' + acts.join("") + '</div>';
    var i = P.indexOf(p), prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    h += '<div class="sh-next"><button type="button" data-open="' + prev.slug + '"><small>' + ICON.back + 'Previous</small><span>' + esc(prev.title) + '</span></button><button type="button" data-open="' + next.slug + '"><small>Next' + ICON.go + '</small><span>' + esc(next.title) + '</span></button></div></div>';
    if (labStop) { labStop(); labStop = null; }
    body.innerHTML = h;
    $("shScroll").scrollTop = 0;
    setupGallery(p);
    if (p.lab && LABS[p.lab]) labStop = LABS[p.lab]($("labMount")) || null;
  }

  function setupGallery(p) {
    var track = $("galTrack"); if (!track) return;
    var slides = Array.prototype.slice.call(track.children), n = slides.length, cur = 0;
    function offsetFor(k) { var sl = slides[k]; return sl.offsetLeft - (track.clientWidth - sl.offsetWidth) / 2; }
    function nearest() {
      var mid = track.scrollLeft + track.clientWidth / 2, best = 0, d = Infinity;
      slides.forEach(function (sl, k) { var c = sl.offsetLeft + sl.offsetWidth / 2, dd = Math.abs(c - mid); if (dd < d) { d = dd; best = k; } });
      return best;
    }
    function show(k) {
      cur = k;
      slides.forEach(function (sl, i) { sl.classList.toggle("on", i === k); });
      $("galFig").textContent = "Fig. " + pad(k + 1, 2) + (n > 1 ? " / " + pad(n, 2) : "");
      $("galCap").textContent = p.media[k][1];
      var gp = $("galPrev"), gn = $("galNext");
      if (gp) gp.disabled = k === 0;
      if (gn) gn.disabled = k === n - 1;
      var th = $("galThumbs");
      if (th) {
        var btns = th.querySelectorAll("button");
        btns.forEach(function (b, i) { b.setAttribute("aria-current", String(i === k)); });
        var b = btns[k];
        if (b) th.scrollTo({ left: b.offsetLeft - (th.clientWidth - b.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
      }
    }
    function go(k) {
      k = Math.max(0, Math.min(n - 1, k));
      track.scrollTo({ left: offsetFor(k), behavior: reduced ? "auto" : "smooth" });
      show(k);
    }
    if (n < 2) return;
    track.addEventListener("scroll", function () { var k = nearest(); if (k !== cur) show(k); }, { passive: true });
    slides.forEach(function (sl, k) { sl.addEventListener("click", function () { if (!moved && k !== cur) go(k); }); });
    $("galPrev").addEventListener("click", function () { go(cur - 1); });
    $("galThumbs").addEventListener("click", function (e) { var b = e.target.closest("[data-i]"); if (b) go(+b.getAttribute("data-i")); });
    $("galNext").addEventListener("click", function () { go(cur + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.stopPropagation(); e.preventDefault(); go(cur + 1); }
      if (e.key === "ArrowLeft") { e.stopPropagation(); e.preventDefault(); go(cur - 1); }
    });
    var drag = null, moved = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      drag = { x: e.clientX, left: track.scrollLeft, start: cur };
      moved = false;
      track.setPointerCapture(e.pointerId);
      track.classList.add("dragging");
    });
    track.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = drag.left - dx;
    });
    function end(e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, w = slides[0].offsetWidth, k = drag.start;
      if (dx < -w * 0.12) k = Math.max(nearest(), drag.start + 1);
      else if (dx > w * 0.12) k = Math.min(nearest(), drag.start - 1);
      drag = null;
      track.classList.remove("dragging");
      go(k);
      setTimeout(function () { moved = false; }, 0);
    }
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
  }

  function setHash(slug) {
    try {
      if (slug) history.pushState({ s: slug }, "", "#" + slug);
      else if (location.hash) history.pushState({}, "", location.pathname + location.search);
    } catch (e) { }
  }

  function cardRect(slug, fromEl) {
    var card = fromEl && fromEl.closest ? fromEl.closest("article[data-open]") : null;
    if (!card) {
      var all = document.querySelectorAll('article[data-open="' + slug + '"]');
      for (var i = 0; i < all.length && !card; i++) { var b = all[i].getBoundingClientRect(); if (b.width && b.bottom > 0 && b.top < window.innerHeight) card = all[i]; }
    }
    return card ? (card.querySelector(".feat-media") || card).getBoundingClientRect() : null;
  }
  function setOrigin(slug, fromEl) {
    var c = cardRect(slug, fromEl), d = dlg.getBoundingClientRect();
    if (!c || !d.width) { dlg.style.removeProperty("--ox"); dlg.style.removeProperty("--oy"); dlg.style.removeProperty("--os"); return; }
    dlg.style.setProperty("--ox", (c.left + c.width / 2 - d.left - d.width / 2).toFixed(1) + "px");
    dlg.style.setProperty("--oy", (c.top + c.height / 2 - d.top - d.height / 2).toFixed(1) + "px");
    dlg.style.setProperty("--os", Math.max(0.2, Math.min(0.92, c.width / d.width)).toFixed(3));
  }

  function open(slug, fromEl, push) {
    var p = bySlug[slug]; if (!p) return;
    track("project_open", { slug: slug });
    if (dlg.open) { render(p); if (push !== false) setHash(slug); return; }
    dlg.classList.remove("closing", "drop");
    dlg.style.transform = "";
    render(p);
    dlg.classList.add("measure");
    dlg.showModal();
    setOrigin(slug, fromEl);
    void dlg.offsetWidth;
    dlg.classList.remove("measure");
    if (push !== false) setHash(slug);
  }

  function close(fromPop, how) {
    if (!dlg.open || dlg.classList.contains("closing")) return;
    if (labStop) { labStop(); labStop = null; }
    if (!reduced) {
      if (how === "drop") dlg.classList.add("drop");
      else { dlg.style.transform = ""; setOrigin(current ? current.slug : "", null); }
      dlg.classList.add("closing");
      setTimeout(function () { dlg.classList.remove("closing", "drop"); dlg.style.transform = ""; dlg.close(); }, 240);
    } else { dlg.style.transform = ""; dlg.close(); }
    if (!fromPop) setHash(null);
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open]");
    if (t && !e.target.closest("a[target]")) {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      open(t.getAttribute("data-open"), t);
      return;
    }
    var g = e.target.closest("[data-go]");
    if (g) { var s = $(g.getAttribute("data-go")); if (s) s.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }
  });
  $("shClose").addEventListener("click", function () { close(); });
  $("shPrev").addEventListener("click", function () { var i = P.indexOf(current); open(P[(i - 1 + P.length) % P.length].slug); });
  $("shNext").addEventListener("click", function () { var i = P.indexOf(current); open(P[(i + 1) % P.length].slug); });
  dlg.addEventListener("cancel", function (e) { e.preventDefault(); close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") $("shNext").click();
    if (e.key === "ArrowLeft") $("shPrev").click();
  });
  window.addEventListener("popstate", function () {
    var s = location.hash.slice(1);
    if (bySlug[s]) open(s, null, false); else close(true);
  });

  var LABS = {
    fea: function (mount) {
      var V = {
        c1: { name: "CFRP · design 1", stress: 403.30, sf: 3.72, f: 75.5, mass: 371.1, def: 80.0, life: null, img: "fea0.webp", alt: "Design 1 CFRP von Mises stress", ok: true, verdict: "Passes every criterion · superseded by design 2" },
        c2: { name: "CFRP · design 2", stress: 302.02, sf: 4.97, f: 97.4, mass: 422.4, def: 102.7, life: null, img: "fea3.webp", alt: "Design 2 CFRP first mode shape", ok: true, verdict: "Recommended design" },
        al: { name: "Al 2014-T4 · design 2", stress: 314.01, sf: null, f: 76.0, mass: 859.2, def: 78.2, life: 26670, img: "fea4.webp", alt: "Aluminium fatigue life contour", ok: false, verdict: "Rejected · fails fatigue and the 600 g limit, yields locally" }
      };
      var k = "c2";
      mount.innerHTML = '<div class="lab"><div class="lab-head"><h3>Compare the configurations</h3></div>' +
        '<div class="ctrls"><span class="seg" id="segV"><button type="button" data-v="c1">CFRP · D1</button><button type="button" data-v="c2">CFRP · D2</button><button type="button" data-v="al">Al · D2</button></span></div>' +
        '<div class="fea-lab"><img id="feaImg" alt=""><div class="gauge" id="feaG"></div></div>' +
        '<p class="lab-note">All values from the report. CFRP fatigue is checked with a 3× safety factor on UTS (1,500 MPa) because standard S-N data for composites isn\'t available; aluminium uses a full stress-life analysis with Goodman mean-stress correction. Aluminium was only run on design 2.</p></div>' +
        '<div class="lab pluck"><div class="lab-head"><h3>Press it and let go</h3><span class="lab-sub">Shown ' + 60 + '× slower than real time</span></div>' +
        '<div class="pluck-grid"><svg class="pluck-svg" id="plSvg" viewBox="0 0 300 236" role="img" aria-label="Side view of the blade. Drag the top down and let go to watch it ring.">' +
        '<line class="pl-ground" x1="150" y1="212" x2="290" y2="212"/><path class="pl-ghost" id="plGhost"/><path class="pl-blade" id="plBlade"/>' +
        '<g id="plTop"><rect class="pl-socket" x="-26" y="-22" width="52" height="24" rx="6"/><path class="pl-grip" d="M-9 -13h18M-9 -8h18"/></g></svg>' +
        '<div class="pluck-side"><div class="readouts"><div><small>Mode 1 frequency</small><b id="plF"></b></div><div><small>Deflection now</small><b id="plX"></b></div><div><small>Deflection at 2,100 N</small><b id="plD"></b></div></div>' +
        '<svg class="chart pl-chart" viewBox="0 0 320 84" role="img" aria-label="Deflection against time"><line class="gr" x1="6" y1="42" x2="314" y2="42"/><polyline class="cv" id="plTrace" points=""/></svg>' +
        '<div class="ctrls"><button class="btn btn-solid" type="button" id="plLoad" aria-pressed="false">Load 2,100 N</button></div>' +
        '<p class="lab-note">A one-degree-of-freedom sketch, not the FE model. Stiffness comes from the report\'s 2,100 N load and maximum deformation, frequency from the modal result. Damping is assumed at 3.5%.</p></div></div></div>';
      function bar(pct, ok, mark, label) {
        return '<div class="bar"><i class="' + (ok ? "ok" : "bad") + '" style="transform:scaleX(' + (Math.max(2, Math.min(pct, 100)) / 100).toFixed(3) + ')"></i><em style="left:' + mark + '%" data-l="' + label + '"></em></div><div class="gap"></div>';
      }
      function upd() {
        var v = V[k];
        mount.querySelectorAll("#segV button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-v") === k)); });
        var img = $("feaImg"), src = "/assets/images/web/" + v.img;
        if (img.getAttribute("src") !== src) { img.classList.add("loading"); img.onload = img.onerror = function () { img.classList.remove("loading"); }; img.src = src; }
        img.alt = v.alt;
        var prevBars = Array.prototype.map.call($("feaG").querySelectorAll(".bar i"), function (b) { return b.style.transform; });
        var h = "";
        h += '<div class="g-row"><span>Fundamental frequency</span><b>' + v.f.toFixed(1) + ' Hz</b></div>' + bar(v.f / 120 * 100, v.f >= 50, 50 / 120 * 100, "50 Hz floor");
        var lifeTxt = v.life ? v.life.toLocaleString("en-GB") + " cycles" : "> 10⁶ cycles (SF " + v.sf.toFixed(2) + ")";
        var lifePct = v.life ? Math.log10(v.life) / 7 * 100 : 92;
        h += '<div class="g-row"><span>Fatigue life (minimum)</span><b>' + lifeTxt + '</b></div>' + bar(lifePct, !v.life || v.life >= 1e6, 6 / 7 * 100, "10⁶ target");
        h += '<div class="g-row"><span>Mass</span><b>' + v.mass.toFixed(1) + ' g</b></div>' + bar(v.mass / 900 * 100, v.mass <= 600, 600 / 900 * 100, "600 g limit");
        h += '<div class="g-row"><span>Peak von Mises stress</span><b>' + v.stress.toFixed(2) + ' MPa</b></div>';
        h += '<div class="g-row"><span>Max deformation</span><b>' + v.def.toFixed(1) + ' mm</b></div>';
        h += '<div class="verdict swap ' + (v.ok ? "ok" : "bad") + '">' + v.verdict + '</div>';
        var g = $("feaG");
        g.innerHTML = h;
        var bars = g.querySelectorAll(".bar i");
        if (prevBars.length === bars.length && !reduced) {
          Array.prototype.forEach.call(bars, function (b, j) { var to = b.style.transform; b.style.transition = "none"; b.style.transform = prevBars[j]; b.getBoundingClientRect(); b.style.transition = ""; b.style.transform = to; });
        }
      }
      var SLOW = 60, ZETA = 0.035, PX = 0.42, TOP = [118, 30];
      var pl = { x: 0, v: 0, drag: null, loaded: false, raf: null, last: 0, acc: 0, trace: [] };
      var blade = $("plBlade"), ghost = $("plGhost"), topG = $("plTop"), traceEl = $("plTrace"), svg = $("plSvg"), loadBtn = $("plLoad");
      var base = (function () {
        function bez(a, b, c, d, n) { var out = []; for (var i = 1; i <= n; i++) { var t = i / n, u = 1 - t; out.push([u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]]); } return out; }
        var pts = [[118, 30], [118, 78]];
        pts = pts.concat(bez([118, 78], [118, 122], [86, 146], [116, 176], 14));
        pts = pts.concat(bez([116, 176], [146, 206], [206, 214], [246, 200], 14));
        var len = [0];
        for (var i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
        return pts.map(function (q, i) { var sN = len[i] / len[len.length - 1], t = Math.max(0, Math.min(1, (sN - 0.16) / 0.84)); return [q[0], q[1], 1 - t * t * (3 - 2 * t)]; });
      })();
      function pathFor(x) { return base.map(function (q, i) { return (i ? "L" : "M") + q[0].toFixed(1) + " " + (q[1] + x * PX * q[2]).toFixed(1); }).join(" "); }
      ghost.setAttribute("d", pathFor(0));
      function paint() {
        blade.setAttribute("d", pathFor(pl.x));
        topG.setAttribute("transform", "translate(" + TOP[0] + " " + (TOP[1] + pl.x * PX).toFixed(1) + ")");
        $("plX").textContent = (Math.abs(pl.x) < 0.05 ? 0 : pl.x).toFixed(1) + " mm";
        var pts = "", n = pl.trace.length, lim = 135;
        for (var i = 0; i < n; i++) pts += (314 - (n - 1 - i) * (308 / 239)).toFixed(1) + "," + (42 + Math.max(-1, Math.min(1, pl.trace[i] / lim)) * 36).toFixed(1) + " ";
        traceEl.setAttribute("points", pts);
      }
      function frame(now) {
        pl.raf = null;
        var dt = pl.last ? Math.min((now - pl.last) / 1000, 0.05) : 0.016;
        pl.last = now;
        var v = V[k], w = 2 * Math.PI * v.f / SLOW, target = pl.loaded ? v.def : 0, z = pl.loaded ? 1 : ZETA;
        if (reduced && !pl.drag) { pl.x = target; pl.v = 0; }
        else if (!pl.drag) {
          var n = Math.max(1, Math.ceil(dt / 0.002)), h = dt / n;
          for (var i = 0; i < n; i++) { pl.v += (-w * w * (pl.x - target) - 2 * z * w * pl.v) * h; pl.x += pl.v * h; }
        }
        pl.acc += dt;
        while (pl.acc >= 1 / 60) { pl.acc -= 1 / 60; pl.trace.push(pl.x); if (pl.trace.length > 240) pl.trace.shift(); }
        paint();
        var still = !pl.drag && Math.abs(pl.x - target) < 0.3 && Math.abs(pl.v) < 3;
        if (still) { pl.x = target; pl.v = 0; pl.last = 0; paint(); return; }
        pl.raf = requestAnimationFrame(frame);
      }
      function run() { if (!pl.raf) pl.raf = requestAnimationFrame(frame); }
      function cfg() {
        var v = V[k];
        $("plF").textContent = v.f.toFixed(1) + " Hz";
        $("plD").textContent = v.def.toFixed(1) + " mm";
        run();
      }
      function setLoad(on) {
        pl.loaded = on;
        loadBtn.setAttribute("aria-pressed", String(on));
        loadBtn.textContent = on ? "Release" : "Load 2,100 N";
        run();
      }
      function svgY(e) { var b = svg.getBoundingClientRect(); return (e.clientY - b.top) / b.height * 236; }
      topG.addEventListener("pointerdown", function (e) {
        if (e.button) return;
        e.preventDefault();
        if (pl.loaded) setLoad(false);
        pl.drag = { y: svgY(e), x: pl.x, id: e.pointerId };
        pl.v = 0;
        try { topG.setPointerCapture(e.pointerId); } catch (err) { }
        svg.classList.add("grabbing");
        run();
      });
      topG.addEventListener("pointermove", function (e) {
        if (!pl.drag || e.pointerId !== pl.drag.id) return;
        pl.x = Math.max(-25, Math.min(135, pl.drag.x + (svgY(e) - pl.drag.y) / PX));
      });
      function drop(e) {
        if (!pl.drag || e.pointerId !== pl.drag.id) return;
        pl.drag = null;
        svg.classList.remove("grabbing");
        track("lab_use", { lab: "fea-press" });
        if (reduced) { pl.x = 0; pl.v = 0; paint(); }
      }
      topG.addEventListener("pointerup", drop);
      topG.addEventListener("pointercancel", drop);
      loadBtn.addEventListener("click", function () { setLoad(!pl.loaded); track("lab_use", { lab: "fea-load" }); });

      mount.addEventListener("click", function (e) {
        var b = e.target.closest("#segV button"); if (!b) return;
        k = b.getAttribute("data-v"); upd(); cfg();
        track("lab_use", { lab: "fea-config", config: k });
      });
      upd();
      cfg();
      paint();
      return function () { if (pl.raf) cancelAnimationFrame(pl.raf); pl.raf = null; };
    },

    drag: function (mount) {
      var RHO = 1.225, CD = 0.3864, A = 0.004119 * 18 * 18, K = 0.5 * RHO * CD * A;
      var W = 320, H = 170, X0 = 38, Y0 = 140, VX = 45, FY = 700;
      function sx(v) { return X0 + v / VX * (W - X0 - 12); }
      function sy(f) { return Y0 - f / FY * (Y0 - 14); }
      var path = "", area = "M" + sx(0) + " " + sy(0);
      for (var v = 0; v <= VX; v += 1) { var p = (v ? " L" : "M") + sx(v).toFixed(1) + " " + sy(K * v * v).toFixed(1); path += p; area += " L" + sx(v).toFixed(1) + " " + sy(K * v * v).toFixed(1); }
      area += " L" + sx(VX) + " " + sy(0) + " Z";
      var grid = "";
      [0, 15, 30, 45].forEach(function (v) { grid += '<line class="gr" x1="' + sx(v) + '" y1="14" x2="' + sx(v) + '" y2="' + Y0 + '"/><text x="' + sx(v) + '" y="' + (Y0 + 13) + '" text-anchor="middle">' + v + '</text>'; });
      [0, 200, 400, 600].forEach(function (f) { grid += '<line class="gr" x1="' + X0 + '" y1="' + sy(f) + '" x2="' + (W - 12) + '" y2="' + sy(f) + '"/><text x="' + (X0 - 5) + '" y="' + (sy(f) + 3) + '" text-anchor="end">' + f + '</text>'; });
      mount.innerHTML = '<div class="lab"><div class="lab-head"><h3>Drag at speed</h3><span class="lab-sub">F = ½ ρ v² Cd A</span></div>' +
        '<div class="ctrls"><label for="vSl">Road speed</label><input type="range" id="vSl" min="5" max="45" step="0.5" value="30.5"></div>' +
        '<div class="readouts"><div><small>Speed</small><b id="dV"></b></div><div><small>Drag force</small><b id="dF"></b></div><div><small>Power to overcome drag</small><b id="dP"></b></div></div>' +
        '<svg class="chart" viewBox="0 0 ' + W + ' ' + (H + 6) + '" role="img" aria-label="Drag force against speed">' + grid +
        '<path class="ar" d="' + area + '"/><path class="cv" d="' + path + '"/>' +
        '<line class="ax" x1="' + X0 + '" y1="' + Y0 + '" x2="' + (W - 12) + '" y2="' + Y0 + '"/><line class="ax" x1="' + X0 + '" y1="14" x2="' + X0 + '" y2="' + Y0 + '"/>' +
        '<line class="tp" x1="' + sx(30.5) + '" y1="14" x2="' + sx(30.5) + '" y2="' + Y0 + '"/><text x="' + (sx(30.5) - 4) + '" y="11" text-anchor="end">CFD speed 30.5 m/s</text>' +
        '<text x="' + ((W + X0) / 2) + '" y="' + (H + 4) + '" text-anchor="middle">speed, m/s</text><text x="8" y="12">N</text>' +
        '<circle class="pt" id="dPt" r="5"/></svg>' +
        '<p class="lab-note">Full scale, using the CFD drag coefficient (0.3864) and the 1:18 model frontal area scaled by 18². At 30.5 m/s this reproduces the report\'s 293.87 N estimate. Assumes Cd stays constant with speed.</p></div>';
      var sl = $("vSl");
      function upd() {
        var v = +sl.value, f = K * v * v;
        $("dV").textContent = v.toFixed(1) + " m/s · " + Math.round(v * 2.23694) + " mph";
        $("dF").textContent = Math.round(f) + " N";
        $("dP").textContent = (f * v / 1000).toFixed(1) + " kW";
        var pt = $("dPt"); pt.setAttribute("cx", sx(v)); pt.setAttribute("cy", sy(f));
      }
      sl.addEventListener("input", upd); upd();
    },

    hex: function (mount) {
      var HEX = "0123456789ABCDEF", timer = null, angle = 0;
      var ring = HEX.split("").map(function (c, i) {
        var a = i / 16 * 2 * Math.PI, r = 84;
        return '<span data-h="' + c + '" style="transform:translate(' + (Math.sin(a) * r).toFixed(1) + 'px,' + (-Math.cos(a) * r).toFixed(1) + 'px)">' + c + '</span>';
      }).join("");
      mount.innerHTML = '<div class="lab"><div class="lab-head"><h3>Hex relay</h3><span class="lab-sub">ASCII → hex → pointer</span></div>' +
        '<div class="hex"><div class="dial" id="dial">' + ring + '<div class="needle" id="needle"></div><div class="hub"></div></div>' +
        '<div class="hex-side"><div class="ctrls"><label for="hexIn">Message</label><input type="text" id="hexIn" maxlength="16" value="HELLO MARS"><button class="btn btn-solid" type="button" id="hexGo">Transmit</button></div>' +
        '<div class="seq" id="seq"></div><p class="lab-note">Each character becomes two hex digits and the pointer visits them in turn, like the camera and hex cards in The Martian. This is a browser version of the idea, not the device firmware.</p></div></div></div>';
      var inp = $("hexIn"), seq = $("seq"), needle = $("needle"), dial = $("dial");
      function digits() { return inp.value.toUpperCase().split("").map(function (c) { var h = c.charCodeAt(0).toString(16).toUpperCase(); return [c, h.length < 2 ? "0" + h : h.slice(-2)]; }); }
      function draw(active) {
        seq.innerHTML = digits().map(function (d, i) { return '<span class="' + (i === active ? "on" : "") + '">' + (d[0] === " " ? "␣" : esc(d[0])) + '<small>' + d[1] + '</small></span>'; }).join("");
      }
      function point(h) {
        var target = HEX.indexOf(h) * 22.5, cur = ((angle % 360) + 360) % 360, d = target - cur;
        if (d > 180) d -= 360; if (d < -180) d += 360;
        angle += d; needle.style.transform = "rotate(" + angle + "deg)";
        dial.querySelectorAll("span").forEach(function (s) { s.classList.toggle("on", s.getAttribute("data-h") === h); });
      }
      function stop() { if (timer) clearTimeout(timer); timer = null; $("hexGo").textContent = "Transmit"; }
      function run() {
        stop(); var d = digits(), q = [];
        d.forEach(function (x, i) { q.push([i, x[1][0]], [i, x[1][1]]); });
        var k = 0; $("hexGo").textContent = "Stop";
        (function step() {
          if (k >= q.length) { stop(); draw(-1); return; }
          draw(q[k][0]); point(q[k][1]); k++;
          timer = setTimeout(step, reduced ? 400 : 650);
        })();
      }
      $("hexGo").addEventListener("click", function () { if (timer) { stop(); draw(-1); } else run(); });
      inp.addEventListener("input", function () { stop(); draw(-1); });
      draw(-1);
      return stop;
    },

    tempo: function (mount) {
      var presets = { "3-1-3": [3, 1, 3], "2-0-2": [2, 0, 2], "4-2-1": [4, 2, 1] }, pat = presets["3-1-3"], raf = null, t0 = 0, lastBeat = -1;
      mount.innerHTML = '<div class="lab"><div class="lab-head"><h3>Tempo cue</h3><span class="lab-sub">down · hold · up</span></div>' +
        '<div class="ctrls"><span class="seg" id="segT"><button type="button" data-v="3-1-3">3-1-3</button><button type="button" data-v="2-0-2">2-0-2</button><button type="button" data-v="4-2-1">4-2-1</button></span><button class="btn btn-solid" type="button" id="tGo">Start</button></div>' +
        '<div class="tempo"><div class="track"><div class="knob" id="knob"></div><small>Stand</small><small>Depth</small></div>' +
        '<div class="tempo-side"><div class="phase" id="phase">Ready</div><div class="beats" id="beats"></div><p class="lab-note">Illustrative: a browser sketch of the tempo idea, not the brace\'s own firmware.</p></div></div></div>';
      var knob = $("knob"), phase = $("phase"), beats = $("beats");
      function seg() { mount.querySelectorAll("#segT button").forEach(function (b) { b.setAttribute("aria-pressed", String(presets[b.getAttribute("data-v")] === pat)); }); }
      function drawBeats(n, on) { var h = ""; for (var i = 0; i < n; i++) h += '<i class="' + (i <= on ? "on" : "") + '"></i>'; beats.innerHTML = h; }
      function frame(now) {
        var total = pat[0] + pat[1] + pat[2], t = ((now - t0) / 1000) % total, depth, name, n, el;
        if (t < pat[0]) { name = "Down"; n = pat[0]; el = t; depth = t / pat[0]; }
        else if (t < pat[0] + pat[1]) { name = "Hold"; n = pat[1]; el = t - pat[0]; depth = 1; }
        else { name = "Up"; n = pat[2]; el = t - pat[0] - pat[1]; depth = 1 - el / pat[2]; }
        var e = depth < .5 ? 2 * depth * depth : 1 - Math.pow(-2 * depth + 2, 2) / 2;
        knob.style.transform = "translateY(" + (e * 166).toFixed(1) + "px)";
        phase.textContent = name + " " + Math.max(1, Math.ceil(n - el));
        var beat = Math.floor(el);
        if (beat !== lastBeat || name !== phase.dataset.n) { drawBeats(n, beat); lastBeat = beat; phase.dataset.n = name; }
        raf = requestAnimationFrame(frame);
      }
      function stop() { if (raf) cancelAnimationFrame(raf); raf = null; $("tGo").textContent = "Start"; phase.textContent = "Ready"; knob.style.transform = "none"; drawBeats(0, -1); }
      $("tGo").addEventListener("click", function () { if (raf) stop(); else { t0 = performance.now(); lastBeat = -1; $("tGo").textContent = "Stop"; raf = requestAnimationFrame(frame); } });
      mount.addEventListener("click", function (e) { var b = e.target.closest("#segT button"); if (!b) return; pat = presets[b.getAttribute("data-v")]; seg(); if (raf) t0 = performance.now(); });
      seg();
      return stop;
    }
  };

  var tabs = document.querySelector(".tabs");
  tabs.addEventListener("click", function (e) {
    var b = e.target.closest("[data-tab]"); if (!b) return;
    var k = b.getAttribute("data-tab");
    tabs.querySelectorAll("[data-tab]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); x.setAttribute("aria-selected", String(x === b)); });
    document.querySelectorAll("[data-panel]").forEach(function (pn) {
      var on = pn.getAttribute("data-panel") === k;
      if (on && pn.hidden) { pn.classList.remove("swap"); void pn.offsetWidth; pn.classList.add("swap"); }
      pn.hidden = !on;
    });
  });

  if (bySlug[location.hash.slice(1)]) open(location.hash.slice(1), null, false);

  (function () {
    var marquee = document.querySelector(".marquee");
    var track = marquee && marquee.querySelector(".marquee-track");
    var group = track && track.querySelector(".marquee-group");
    if (!marquee || !track || !group) return;
    var SECONDS_PER_GROUP = 45, HARD_THROW = 0.4;
    var gw = 0, direction = -1, pos = 0, velocity = 0;
    var dragging = false, coasting = false, startX = 0, startPos = 0, lastX = 0, lastT = 0, flingV = 0;

    function measure() {
      gw = group.getBoundingClientRect().width;
      if (gw <= 0) return;
      var need = window.innerWidth + gw * 2;
      while (track.scrollWidth < need) track.appendChild(group.cloneNode(true));
      track.style.setProperty("--gw", gw + "px");
      track.style.animationDuration = SECONDS_PER_GROUP + "s";
    }
    function wrap(p) { if (gw <= 0) return p; p = p % gw; if (p > 0) p -= gw; return p; }
    function currentX() {
      var t = getComputedStyle(track).transform;
      if (!t || t === "none") return pos;
      return new DOMMatrixReadOnly(t).m41;
    }
    function idle() {
      if (reduced || gw <= 0) { track.style.animation = "none"; track.style.transform = "translateX(" + wrap(pos) + "px)"; return; }
      var progress = -wrap(pos) / gw;
      var delay = direction < 0 ? -progress * SECONDS_PER_GROUP : -(1 - progress) * SECONDS_PER_GROUP;
      track.style.transform = "";
      track.style.animation = "";
      track.style.animationDirection = direction < 0 ? "normal" : "reverse";
      track.style.animationDelay = delay + "s";
      track.classList.add("run");
    }
    function hold() {
      pos = currentX();
      track.classList.remove("run");
      track.style.animation = "none";
      track.style.transform = "translateX(" + pos + "px)";
    }

    measure();
    idle();
    window.addEventListener("resize", function () { hold(); measure(); idle(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { hold(); measure(); idle(); });

    marquee.addEventListener("pointerdown", function (e) {
      hold();
      dragging = true; coasting = false;
      marquee.setPointerCapture(e.pointerId);
      marquee.classList.add("dragging");
      startX = lastX = e.clientX; startPos = pos;
      lastT = performance.now(); flingV = 0;
    });
    marquee.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var now = performance.now(), dt = (now - lastT) || 16;
      flingV = (e.clientX - lastX) / dt;
      pos = wrap(startPos + (e.clientX - startX));
      track.style.transform = "translateX(" + pos + "px)";
      lastX = e.clientX; lastT = now;
    });
    function release() {
      if (!dragging) return;
      dragging = false;
      marquee.classList.remove("dragging");
      var auto = gw / (SECONDS_PER_GROUP * 1000);
      var speed = Math.min(Math.abs(flingV), 3);
      if (speed > HARD_THROW) direction = flingV > 0 ? 1 : -1;
      velocity = Math.sign(flingV || direction) * Math.max(speed, auto);
      if (reduced) { idle(); return; }
      coasting = true;
      var last = performance.now();
      (function step(now) {
        if (!coasting) return;
        var dt = Math.min(now - last, 50); last = now;
        velocity += (direction * auto - velocity) * Math.min(dt / 400, 1);
        pos = wrap(pos + velocity * dt);
        track.style.transform = "translateX(" + pos + "px)";
        if (Math.abs(velocity - direction * auto) < auto * 0.05) { coasting = false; idle(); return; }
        requestAnimationFrame(step);
      })(last);
    }
    marquee.addEventListener("pointerup", release);
    marquee.addEventListener("pointercancel", release);
  })();

  (function () {
    var MAX = 3, FRICTION = 0.996, GAIN = 1.6;
    Array.prototype.forEach.call(document.querySelectorAll(".brand-mark, .nav-icon"), function (host) {
      var icon = host.querySelector("svg");
      if (!icon) return;
      var angle = 0, vel = 0, down = false, moved = false, raf = null;
      var startX = 0, startA = 0, lastX = 0, lastT = 0;
      function paint() { icon.style.transform = angle ? "rotate(" + angle + "deg)" : ""; }
      function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }
      function settle(last) {
        var target = Math.round(angle / 360) * 360;
        (function step(now) {
          var dt = Math.min(now - last, 40); last = now;
          vel += (target - angle) * 0.00045 * dt;
          vel *= Math.pow(0.9, dt / 16);
          angle += vel * dt;
          if (Math.abs(target - angle) < 0.3 && Math.abs(vel) < 0.01) { angle = 0; vel = 0; paint(); raf = null; host.classList.remove("spinning"); return; }
          paint();
          raf = requestAnimationFrame(step);
        })(last);
      }
      function coast() {
        if (reduced) { angle = 0; paint(); host.classList.remove("spinning"); return; }
        var last = performance.now();
        (function step(now) {
          var dt = Math.min(now - last, 40); last = now;
          angle += vel * dt;
          vel *= Math.pow(FRICTION, dt);
          paint();
          if (Math.abs(vel) < 0.06) { settle(now); return; }
          raf = requestAnimationFrame(step);
        })(last);
      }
      host.addEventListener("pointerdown", function (e) {
        if (e.button) return;
        stop();
        down = true; moved = false;
        startX = lastX = e.clientX; startA = angle; lastT = performance.now(); vel = 0;
      });
      host.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (!moved) {
          if (Math.abs(dx) < 5) return;
          moved = true;
          try { host.setPointerCapture(e.pointerId); } catch (err) { }
          host.classList.add("spinning");
        }
        var now = performance.now(), dt = Math.max(now - lastT, 8);
        var v = (e.clientX - lastX) / dt * GAIN;
        vel = Math.max(-MAX, Math.min(MAX, vel * 0.5 + v * 0.5));
        angle = startA + dx * GAIN;
        lastX = e.clientX; lastT = now;
        paint();
      });
      function release() {
        if (!down) return;
        down = false;
        if (moved) coast();
      }
      host.addEventListener("pointerup", release);
      host.addEventListener("pointercancel", release);
      host.addEventListener("click", function (e) {
        if (moved) { e.preventDefault(); e.stopImmediatePropagation(); moved = false; }
      }, true);
      host.addEventListener("dragstart", function (e) { e.preventDefault(); });
    });
  })();

  (function () {
    var root = document.documentElement, btn = $("themeBtn"), meta = document.querySelector('meta[name="theme-color"]');
    if (!btn) return;
    function current() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    function sync() {
      var dark = current() === "dark";
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      if (meta) meta.setAttribute("content", dark ? "#111213" : "#F3F3F1");
    }
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.classList.add("theme-fade");
      root.setAttribute("data-theme", next);
      try { sessionStorage.setItem("ys-theme", next); } catch (e) { }
      sync();
      setTimeout(function () { root.classList.remove("theme-fade"); }, 500);
    });
    sync();
  })();

  (function () {
    var grid = $("moreGrid"); if (!grid || !window.matchMedia("(hover: hover)").matches) return;
    var t = null;
    window.addEventListener("scroll", function () {
      if (!t) grid.classList.add("noflip"); else clearTimeout(t);
      t = setTimeout(function () { grid.classList.remove("noflip"); t = null; }, 180);
    }, { passive: true });
  })();

  (function () {
    if (reduced || !window.matchMedia("(hover: none)").matches || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("lit"); io.unobserve(en.target); } });
    }, { rootMargin: "-30% 0px -30% 0px" });
    document.querySelectorAll(".tile:not(.wip)").forEach(function (t) { io.observe(t); });
  })();

  (function () {
    var els = Array.prototype.slice.call(document.querySelectorAll(".rv"));
    if (reduced || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      var k = 0;
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, d = k++ * 70;
        el.style.transitionDelay = d + "ms";
        el.classList.add("in");
        io.unobserve(el);
        setTimeout(function () { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, 900 + d);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  })();

  $("year").textContent = new Date().getFullYear();

  (function () {
    var el = $("rev"), KEY = "ys-rev", now = Date.now();
    function show(r) { el.textContent = "Rev " + r.n + " · " + r.msg; el.hidden = false; }
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || "null");
      if (c && now - c.t < 600000) { show(c); return; }
    } catch (e) { }
    fetch("https://api.github.com/repos/VenomCookie/Portfolio/commits?per_page=1")
      .then(function (r) {
        if (!r.ok) throw new Error("rev");
        var m = /[?&]page=(\d+)>; rel="last"/.exec(r.headers.get("Link") || "");
        return r.json().then(function (d) {
          var rec = { n: m ? +m[1] : 1, msg: d[0].commit.message.split("\n")[0], t: now };
          try { localStorage.setItem(KEY, JSON.stringify(rec)); } catch (e) { }
          show(rec);
        });
      })
      .catch(function () { });
  })();

  var FORM_KEY = "a30d614f-12e7-4af4-8c15-45cc3d35ddde";
  var form = $("msgForm"), statusEl = $("msgStatus"), sendBtn = $("msgSend"), statusTimer = null;
  function setStatus(text, kind) {
    clearTimeout(statusTimer);
    statusEl.textContent = text;
    statusEl.className = "status";
    if (text) { void statusEl.offsetWidth; statusEl.className = "status show" + (kind ? " " + kind : ""); }
    if (kind === "ok") statusTimer = setTimeout(function () { setStatus(""); }, 6000);
  }
  function flag(el) {
    el.classList.remove("invalid"); void el.offsetWidth; el.classList.add("invalid");
    el.addEventListener("input", function () { el.classList.remove("invalid"); }, { once: true });
    el.focus();
  }
  function flyPlane(from) {
    if (reduced) return;
    var b = from.getBoundingClientRect(), el = document.createElement("div");
    el.className = "fly";
    el.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path transform="rotate(90 16 16)" d="M16 4.5c.9 0 1.5 1.1 1.5 2.4v5.6l8.5 5v2.1l-8.5-2.6-.2 5.6 2.7 2v1.6L16 25.2l-4 1v-1.6l2.7-2-.2-5.6-8.5 2.6v-2.1l8.5-5V6.9c0-1.3.6-2.4 1.5-2.4z"/></svg>';
    document.body.appendChild(el);
    var x = b.left + b.width / 2, y = b.top + b.height / 2, vx = 120, vy = 0, t0 = performance.now(), last = t0;
    (function step(now) {
      var dt = Math.min((now - last) / 1000, 0.04), age = (now - t0) / 1000;
      last = now;
      vx += 1100 * dt;
      vy -= 1500 * age * dt;
      x += vx * dt; y += vy * dt;
      el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + (Math.atan2(vy, vx) * 180 / Math.PI).toFixed(1) + "deg) scale(" + (1 + age * 0.7).toFixed(2) + ")";
      if (x > window.innerWidth + 80 || y < -80 || age > 3) { el.remove(); return; }
      requestAnimationFrame(step);
    })(t0);
  }
  function sendState(state) {
    sendBtn.disabled = state === "busy";
    sendBtn.classList.toggle("sent", state === "sent");
    sendBtn.innerHTML = state === "busy" ? '<span class="spin" aria-hidden="true"></span>Sending' : state === "sent" ? ICON.tick + "Sent" : "Send";
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.botcheck.checked) return;
    var msg = $("msgText").value.trim(), name = $("msgName").value.trim(), email = $("msgEmail").value.trim();
    if (!msg) { setStatus("Write a message first.", "err"); flag($("msgText")); return; }
    if (email && !$("msgEmail").checkValidity()) { setStatus("That email address doesn't look right. Fix it or leave it blank.", "err"); flag($("msgEmail")); return; }
    if (!FORM_KEY) { setStatus("Preview only: the form isn't connected yet, so nothing was sent.", "err"); return; }
    sendState("busy");
    var who = name || email || "Anonymous visitor";
    var payload = { access_key: FORM_KEY, subject: "Portfolio message from " + who, from_name: who, message: msg };
    if (name) payload.name = name;
    if (email) payload.email = email;
    fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().then(function (d) { if (!r.ok || !d.success) throw new Error(d.message || "failed"); }); })
      .then(function () { setStatus("Sent. Thanks for getting in touch.", "ok"); form.reset(); sendState("sent"); flyPlane(sendBtn); track("contact_send"); setTimeout(function () { sendState("idle"); }, 4000); })
      .catch(function () { setStatus("That didn't send. Try again, or message me on LinkedIn.", "err"); sendState("idle"); });
  });
  (function () {
    var bar = dlg.querySelector(".sh-bar"), d = null, stop = null;
    if (!bar) return;
    bar.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" || e.target.closest("button")) return;
      if (stop) { stop(); stop = null; }
      d = { y: e.clientY, id: e.pointerId, dy: 0, log: [[performance.now(), 0]] };
      try { bar.setPointerCapture(e.pointerId); } catch (err) { }
    });
    bar.addEventListener("pointermove", function (e) {
      if (!d || e.pointerId !== d.id) return;
      var now = performance.now(), raw = e.clientY - d.y, dy = raw > 0 ? raw : raw * 0.18;
      d.dy = dy;
      d.log.push([now, dy]);
      while (d.log.length > 2 && now - d.log[0][0] > 90) d.log.shift();
      dlg.style.transform = "translateY(" + dy.toFixed(1) + "px)";
    });
    function end(e) {
      if (!d || e.pointerId !== d.id) return;
      var dy = d.dy, a = d.log[0], z = d.log[d.log.length - 1], v = z[0] - a[0] > 20 ? (z[1] - a[1]) / (z[0] - a[0]) : 0;
      d = null;
      if (dy > 140 || (dy > 50 && v > 0.9)) { close(false, "drop"); return; }
      if (reduced || Math.abs(dy) < 0.5) { dlg.style.transform = ""; return; }
      stop = spring({ from: dy, to: 0, v: v * 1000, k: 260, c: 26, onUpdate: function (x) { dlg.style.transform = x ? "translateY(" + x.toFixed(1) + "px)" : ""; }, onDone: function () { stop = null; } });
    }
    bar.addEventListener("pointerup", end);
    bar.addEventListener("pointercancel", end);
  })();

  (function () {
    var nav = document.querySelector(".nav-links"), pill = nav && nav.querySelector(".nav-pill");
    if (!nav || !pill) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    var active = -2, queued = false;
    function place(i) {
      links.forEach(function (a, j) { a.classList.toggle("on", j === i); });
      nav.classList.toggle("spy", i >= 0);
      if (i < 0) return;
      var n = nav.getBoundingClientRect(), a = links[i].getBoundingClientRect();
      pill.style.clipPath = "inset(0 " + (n.right - a.right).toFixed(1) + "px 0 " + (a.left - n.left).toFixed(1) + "px round 999px)";
    }
    function check() {
      queued = false;
      var line = window.innerHeight * 0.4, cur = -1;
      secs.forEach(function (sec, i) { if (sec && sec.getBoundingClientRect().top <= line) cur = i; });
      if (cur !== active) { active = cur; place(cur); }
    }
    function ask() { if (!queued) { queued = true; requestAnimationFrame(check); } }
    window.addEventListener("scroll", ask, { passive: true });
    window.addEventListener("resize", function () { active = -2; ask(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { active = -2; ask(); });
    check();
  })();

  (function () {
    var box = $("find"), input = $("findIn"), list = $("findList"), btn = $("findBtn");
    if (!box || !input || !list || !box.showModal) { if (btn) btn.hidden = true; return; }
    function go(id) { var el = document.getElementById(id) || document.querySelector(id); if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }
    var items = [
      { t: "Work", sub: "Section", k: "flagship projects", run: function () { go("work"); } },
      { t: "More projects", sub: "Section", k: "more work smaller earlier", run: function () { go("index"); } },
      { t: "About", sub: "Section", k: "placement bio", run: function () { go("about"); } },
      { t: "Skills", sub: "Section", k: "technical making tools", run: function () { go(".sec-skills"); } },
      { t: "Contact", sub: "Section", k: "message email", run: function () { go("contact"); } }
    ];
    P.forEach(function (p) {
      items.push({ t: p.title, sub: p.disc[0] + " · " + p.year, k: [p.hook, p.role, p.scope].concat(p.disc).join(" "), tools: p.tools, run: function () { open(p.slug, null); } });
    });
    items.push({ t: "CV (PDF)", sub: "Link", k: "resume curriculum vitae", run: function () { window.open("/assets/docs/CV.pdf", "_blank", "noopener"); } });
    items.push({ t: "LinkedIn", sub: "Link", k: "profile", run: function () { window.open("https://www.linkedin.com/in/yousuf-shb", "_blank", "noopener"); } });
    items.forEach(function (it) { it.hay = (it.t + " " + it.k + " " + (it.tools || []).join(" ")).toLowerCase(); it.tl = it.t.toLowerCase(); });
    var shown = [], sel = 0;
    function search(q) {
      var toks = q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!toks.length) return items.slice(0, 8).map(function (it) { return { it: it, sub: it.sub }; });
      var out = [];
      items.forEach(function (it, i) {
        if (!toks.every(function (t) { return it.hay.indexOf(t) >= 0; })) return;
        var score = it.tl.indexOf(toks[0]) === 0 ? 0 : toks.every(function (t) { return it.tl.indexOf(t) >= 0; }) ? 1 : 2, sub = it.sub;
        if (score === 2 && it.tools) { var hit = it.tools.filter(function (tool) { return toks.some(function (t) { return tool.toLowerCase().indexOf(t) >= 0; }); }); if (hit.length) sub = "Uses " + hit.join(", "); }
        out.push({ it: it, sub: sub, score: score, i: i });
      });
      return out.sort(function (a, b) { return a.score - b.score || a.i - b.i; }).slice(0, 8);
    }
    function draw() {
      shown = search(input.value);
      sel = Math.min(sel, Math.max(0, shown.length - 1));
      list.innerHTML = shown.length ? shown.map(function (r, i) { return '<li role="option" id="findOpt' + i + '" data-i="' + i + '" aria-selected="' + (i === sel) + '"><b>' + esc(r.it.t) + '</b><span>' + esc(r.sub) + '</span></li>'; }).join("") : '<li class="none">Nothing matches that.</li>';
      input.setAttribute("aria-activedescendant", shown.length ? "findOpt" + sel : "");
    }
    function show() { if (box.open) return; input.value = ""; sel = 0; draw(); box.showModal(); input.focus(); track("find_open"); }
    function pick(i) { var r = shown[i]; if (!r) return; box.close(); track("find_use", { item: r.it.t }); r.it.run(); }
    input.addEventListener("input", function () { sel = 0; draw(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); draw(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); draw(); }
      else if (e.key === "Enter") { e.preventDefault(); pick(sel); }
    });
    list.addEventListener("click", function (e) { var li = e.target.closest("[data-i]"); if (li) pick(+li.getAttribute("data-i")); });
    list.addEventListener("pointermove", function (e) { var li = e.target.closest("[data-i]"); if (li && +li.getAttribute("data-i") !== sel) { sel = +li.getAttribute("data-i"); draw(); } });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    if (btn) btn.addEventListener("click", show);
    document.addEventListener("keydown", function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) { e.preventDefault(); show(); }
      else if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); show(); }
    });
  })();

  (function () {
    var seen = {};
    function warm(e) {
      var t = e.target.closest && e.target.closest("[data-open]");
      var p = t && bySlug[t.getAttribute("data-open")];
      if (!p || seen[p.slug]) return;
      seen[p.slug] = true;
      new Image().src = "/assets/images/web/" + p.media[0][0];
    }
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("touchstart", warm, { passive: true });
    document.addEventListener("focusin", warm);
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      var h = a.getAttribute("href");
      if (/CV\.pdf/.test(h)) track("cv_open");
      else if (/\.pdf/.test(h)) track("report_open", { file: h.split("/").pop().split("?")[0].split("#")[0] });
      else if (/linkedin\.com/.test(h)) track("linkedin_open");
    });
  })();
})();
