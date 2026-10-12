(function () {
  "use strict";

  var LIVE = "/";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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
      pdf: "assets/docs/FEA_RunningBlade_YS.pdf", lab: "fea"
    },
    {
      slug: "pdet2folio", order: 95, code: "PDE", flagship: true, title: "Knee Brace for Gym Beginners", year: 2026, scope: "Pair", role: "Mechanism design, assembly & user research",
      disc: ["Product Design", "CAD & Prototyping", "UX & Research"], tools: ["Fusion 360", "User interviews", "DFM", "Electronics"],
      hook: "A brace that helps beginners hold good form and keep tempo through a squat.",
      big: ["Working", "prototype that guides squat form and tempo"],
      summary: "Beginners are an underserved group in the gym: generic and specialist kit exists, but nothing helps you through the door. We interviewed members of the public and high-end gyms in South Kensington, including Equinox and Retro Fit, then designed and built a working knee brace that helps correct form and keep to a tempo during squats.",
      did: ["Designed the one-handed tightening mechanism and adapted it to the brace.", "Designed the enclosure with Zayn, who built the sensors and code, then assembled the final product.", "Wrote the A3 report; Zayn wrote the technical report.", "Interviewed members of the public and gym staff with Zayn."],
      stats: [["Working", "prototype, assembled by me"], ["2 gyms", "Equinox and Retro Fit, plus members of the public"], ["2", "person team, with Zayn Muntazir"]],
      media: [["pde0.webp", "Cover render"], ["pde1.webp", "Research and problem framing"], ["pde2.webp", "Concept development"]],
      pdf: "assets/docs/PDE2.pdf", credits: [["Zayn Muntazir", "https://www.linkedin.com/in/zayn-muntazir-44721b281/"]], lab: "tempo"
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
      reports: [["Full report (PDF)", "assets/docs/YousufShahabuddin_Thermo1.pdf"]], lab: "drag"
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
      media: [["azul0.webp", "Game board"]], live: "azul/index.html"
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
      media: [["drinks0.webp", "Prototype"]]
    },
    {
      slug: "pocket-shaver", order: 50, code: "SHV", title: "Pocket Shaver Redesign", year: 2025, scope: "Individual", role: "Design & engineering",
      disc: ["Product Design", "CAD & Prototyping"], tools: ["Fusion 360", "Reverse engineering", "Material selection"],
      hook: "A Braun shaver reverse-engineered for lower mass and better repairability.",
      summary: "A reverse-engineering and redesign of a Braun pocket shaver, rebuilt for lighter weight, better repairability and lower end-of-life impact.",
      did: ["Detailed a redesigned shaver with materials and processes specified."],
      media: [["shaver0.webp", "Redesign"]]
    },
    {
      slug: "ipad-stand", order: 45, code: "IPD", title: "iPad Stand", year: 2025, scope: "Individual", role: "Design & engineering",
      disc: ["CAD & Prototyping", "Product Design"], tools: ["Fusion 360", "FDM printing"],
      hook: "An adjustable printed stand with a curved, no-slip front lip.",
      summary: "An adjustable 3D-printed iPad stand with a curved front lip, so the device sits securely at several angles and your finger never fouls the screen when swiping up.",
      did: ["Modelled the stand in Fusion 360 with several viewing angles and a no-slip front edge.", "Printed and tested it for stability and angle adjustment."],
      media: [["ipad0.webp", "Render"]]
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
  function valHtml(v) { return v === "NEEDS" ? '<span class="needs">NEEDS</span>' : esc(v); }

  var flagsEl = $("flags");
  flagsEl.innerHTML = P.filter(function (p) { return p.flagship; }).map(function (p, i) {
    var withLine = p.credits ? '<div class="with">with ' + p.credits.map(function (c) { return c[1] ? '<a href="' + c[1] + '" target="_blank" rel="noopener">' + esc(c[0]) + '</a>' : esc(c[0]); }).join(" &amp; ") + '</div>' : "";
    var links = '<button type="button" class="primary" data-open="' + p.slug + '">Read summary <i>→</i></button>';
    if (p.reports) links += '<a href="' + LIVE + p.reports[0][1] + '" target="_blank" rel="noopener">Report PDF ↗</a>';
    if (p.live) links += '<a href="' + LIVE + p.live + '" target="_blank" rel="noopener">Play ↗</a>';
    return '<article class="flag" data-open="' + p.slug + '">' +
      '<div class="media"><img src="/assets/images/web/' + p.media[0][0] + '" alt="' + esc(p.media[0][1]) + '" loading="lazy" decoding="async"><span class="fig">FIG. ' + pad(i + 1, 2) + '</span></div>' +
      '<div class="body"><div class="meta mono"><span>' + esc(p.disc[0]) + '</span><span>' + esc(p.scope) + '</span><span>' + p.year + '</span></div>' +
      '<h3><a href="#' + p.slug + '" style="text-decoration:none">' + esc(p.title) + '</a></h3>' + withLine + '<p>' + esc(p.hook) + '</p>' +
      '<div class="bigstat"><b>' + valHtml(p.big[0]) + '</b><span>' + esc(p.big[1]) + '</span></div>' +
      '<div class="links">' + links + '</div></div></article>';
  }).join("");

  var others = P.filter(function (p) { return !p.flagship; });
  $("moreGrid").innerHTML = others.map(function (p, i) {
    return '<article class="card" data-open="' + p.slug + '">' +
      '<div class="media"><img src="/assets/images/web/' + p.media[0][0] + '" alt="' + esc(p.media[0][1]) + '" loading="lazy" decoding="async"><span class="fig">FIG. ' + pad(i + 4, 2) + '</span>' + (p.live ? '<a class="play" href="' + LIVE + p.live + '" target="_blank" rel="noopener">▶ Play now</a>' : '') + '</div>' +
      '<div class="body"><div class="meta"><span>' + esc(p.disc[0]) + '</span><span>' + p.year + '</span></div>' +
      '<h3><a href="#' + p.slug + '">' + esc(p.title) + '</a></h3><p>' + esc(p.hook) + '</p></div></article>';
  }).join("") + '<article class="card wipcard"><div class="body"><div class="meta"><span>Currently building</span></div><ul><li>A wearable biosensor aimed at early disease detection.</li><li>An airline seat-selection tool that helps travellers get value for money.</li></ul></div></article>';

  var dlg = $("sheet"), body = $("shBody"), current = null, originImg = null, labStop = null;

  function render(p) {
    current = p;
    $("shCode").textContent = "SHT " + p.code + "-" + pad(p.n, 2) + " · ITEM " + pad(p.n, 2) + " OF " + pad(P.length, 2);
    var h = "";
    h += '<div class="tb"><div class="ttl"><small>Title</small><h2 id="shTitle">' + esc(p.title) + '</h2></div>' +
      '<div><small>Year</small><span>' + p.year + '</span></div><div><small>Scope</small><span>' + esc(p.scope) + '</span></div>' +
      '<div><small>Role</small><span>' + esc(p.role) + '</span></div><div><small>Discipline</small><span>' + esc(p.disc[0]) + '</span></div></div>';
    if (p.live) h += '<div class="live-cta"><a class="btn btn-solid" href="' + LIVE + p.live + '" target="_blank" rel="noopener">▶ Play it live ↗</a><span>Runs in your browser, nothing to download.</span></div>';
    h += '<div class="gal"><div class="gal-track' + (p.media.length > 1 ? ' multi' : '') + '" id="galTrack" tabindex="0" aria-label="Figures, scroll sideways">' + p.media.map(function (m, i) {
      return '<figure class="gal-slide' + (i ? '' : ' on') + '"><img src="/assets/images/web/' + m[0] + '" alt="' + esc(m[1]) + '" decoding="async" draggable="false"></figure>';
    }).join("") + '</div>';
    h += '<div class="gal-bar"><b id="galFig">FIG. 01' + (p.media.length > 1 ? ' / ' + pad(p.media.length, 2) : '') + '</b><span id="galCap">' + esc(p.media[0][1]) + '</span>' +
      (p.media.length > 1 ? '<button class="icon-btn" type="button" id="galPrev" aria-label="Previous figure">←</button><button class="icon-btn" type="button" id="galNext" aria-label="Next figure">→</button>' : '') + '</div>';
    if (p.media.length > 1) {
      h += '<div class="thumbs" id="galThumbs" aria-label="All figures">' + p.media.map(function (m, i) {
        return '<button type="button" data-i="' + i + '" aria-current="' + (i === 0) + '" aria-label="Figure ' + (i + 1) + ': ' + esc(m[1]) + '" title="' + esc(m[1]) + '"><img src="/assets/images/web/' + m[0] + '" alt="" decoding="async" draggable="false"><span>' + pad(i + 1, 2) + '</span></button>';
      }).join("") + '</div>';
    }
    h += '</div>';
    if (p.stats) h += '<div class="stats">' + p.stats.map(function (s) { return '<div><b>' + valHtml(s[0]) + '</b><span>' + esc(s[1]) + '</span>' + (s[2] && p.pdf ? '<a class="pg" href="' + LIVE + p.pdf + '#page=' + (s[2] + 1) + '" target="_blank" rel="noopener">Report p. ' + s[2] + ' ↗</a>' : '') + '</div>'; }).join("") + '</div>';
    h += '<div class="cols"><div><h3 class="h-sm">Summary</h3><p>' + p.summary + '</p></div><div><h3 class="h-sm">' + esc(p.didTitle || "What I did") + '</h3><ul class="did">' + p.did.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join("") + '</ul></div></div>';
    if (p.lab) h += '<div id="labMount"></div>';
    h += '<div><h3 class="h-sm">Tools & methods</h3><div class="tags">' + p.tools.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("") + '</div></div>';
    if (p.credits) h += '<div class="credits"><h3 class="h-sm">With</h3>' + p.credits.map(function (c) { return c[1] ? '<a href="' + c[1] + '" target="_blank" rel="noopener">' + esc(c[0]) + '</a>' : esc(c[0]); }).join(", ") + '</div>';
    var acts = [];
    if (p.reports) p.reports.forEach(function (r, i) { acts.push('<a class="btn ' + (i ? 'btn-tonal' : 'btn-solid') + '" href="' + LIVE + r[1] + '" target="_blank" rel="noopener">' + esc(r[0]) + ' ↗</a>'); });
    if (p.extra) acts.push('<a class="btn btn-tonal" href="' + p.extra[1] + '" target="_blank" rel="noopener">' + esc(p.extra[0]) + ' ↗</a>');
    if (acts.length) h += '<div class="acts">' + acts.join("") + '</div>';
    var i = P.indexOf(p), prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    h += '<div class="sh-next"><button type="button" data-open="' + prev.slug + '"><small>← Previous</small><span>' + esc(prev.title) + '</span></button><button type="button" data-open="' + next.slug + '"><small>Next →</small><span>' + esc(next.title) + '</span></button></div>';
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
      $("galFig").textContent = "FIG. " + pad(k + 1, 2) + (n > 1 ? " / " + pad(n, 2) : "");
      $("galCap").textContent = p.media[k][1];
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

  function open(slug, fromEl, push) {
    var p = bySlug[slug]; if (!p) return;
    if (dlg.open) { render(p); if (push !== false) setHash(slug); return; }
    dlg.classList.remove("closing");
    render(p);
    dlg.showModal();
    if (push !== false) setHash(slug);
  }

  function close(fromPop) {
    if (!dlg.open || dlg.classList.contains("closing")) return;
    if (labStop) { labStop(); labStop = null; }
    if (!reduced) {
      dlg.classList.add("closing");
      setTimeout(function () { dlg.classList.remove("closing"); dlg.close(); }, 220);
    } else dlg.close();
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
      mount.innerHTML = '<div class="lab"><div class="lab-head"><h3>Compare the configurations</h3><span class="mono" style="color:var(--ink-3)">3 configurations analysed</span></div>' +
        '<div class="ctrls"><span class="seg" id="segV"><button type="button" data-v="c1">CFRP · D1</button><button type="button" data-v="c2">CFRP · D2</button><button type="button" data-v="al">Al · D2</button></span></div>' +
        '<div class="fea-lab"><img id="feaImg" alt=""><div class="gauge" id="feaG"></div></div>' +
        '<p class="lab-note">All values from the report. CFRP fatigue is checked with a 3× safety factor on UTS (1,500 MPa) because standard S-N data for composites isn\'t available; aluminium uses a full stress-life analysis with Goodman mean-stress correction. Aluminium was only run on design 2.</p></div>';
      function bar(pct, ok, mark, label) {
        return '<div class="bar"><i class="' + (ok ? "ok" : "bad") + '" style="width:' + Math.max(2, Math.min(pct, 100)) + '%"></i><em style="left:' + mark + '%" data-l="' + label + '"></em></div><div style="height:14px"></div>';
      }
      function upd() {
        var v = V[k];
        mount.querySelectorAll("#segV button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-v") === k)); });
        var img = $("feaImg"); img.src = "/assets/images/web/" + v.img; img.alt = v.alt;
        var h = "";
        h += '<div class="row"><span>Fundamental frequency</span><b>' + v.f.toFixed(1) + ' Hz</b></div>' + bar(v.f / 120 * 100, v.f >= 50, 50 / 120 * 100, "50 Hz floor");
        var lifeTxt = v.life ? v.life.toLocaleString("en-GB") + " cycles" : "> 10⁶ cycles (SF " + v.sf.toFixed(2) + ")";
        var lifePct = v.life ? Math.log10(v.life) / 7 * 100 : 92;
        h += '<div class="row"><span>Fatigue life (minimum)</span><b>' + lifeTxt + '</b></div>' + bar(lifePct, !v.life || v.life >= 1e6, 6 / 7 * 100, "10⁶ target");
        h += '<div class="row"><span>Mass</span><b>' + v.mass.toFixed(1) + ' g</b></div>' + bar(v.mass / 900 * 100, v.mass <= 600, 600 / 900 * 100, "600 g limit");
        h += '<div class="row"><span>Peak von Mises stress</span><b>' + v.stress.toFixed(2) + ' MPa</b></div>';
        h += '<div class="row"><span>Max deformation</span><b>' + v.def.toFixed(1) + ' mm</b></div>';
        h += '<div class="verdict ' + (v.ok ? "ok" : "bad") + '">' + v.verdict + '</div>';
        $("feaG").innerHTML = h;
      }
      mount.addEventListener("click", function (e) {
        var b = e.target.closest("#segV button"); if (!b) return;
        k = b.getAttribute("data-v"); upd();
      });
      upd();
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
      mount.innerHTML = '<div class="lab"><div class="lab-head"><h3>Drag at speed</h3><span class="mono" style="color:var(--ink-3)">F = ½ ρ v² Cd A</span></div>' +
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
      mount.innerHTML = '<div class="lab"><div class="lab-head"><h3>Hex relay</h3><span class="mono" style="color:var(--ink-3)">ASCII → hex → pointer</span></div>' +
        '<div class="hex"><div class="dial" id="dial">' + ring + '<div class="needle" id="needle"></div><div class="hub"></div></div>' +
        '<div style="display:grid;gap:12px;min-width:0"><div class="ctrls"><label for="hexIn">Message</label><input type="text" id="hexIn" maxlength="16" value="HELLO MARS"><button class="btn btn-solid" type="button" id="hexGo">Transmit</button></div>' +
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
      mount.innerHTML = '<div class="lab"><div class="lab-head"><h3>Tempo cue</h3><span class="mono" style="color:var(--ink-3)">down · hold · up</span></div>' +
        '<div class="ctrls"><span class="seg" id="segT"><button type="button" data-v="3-1-3">3-1-3</button><button type="button" data-v="2-0-2">2-0-2</button><button type="button" data-v="4-2-1">4-2-1</button></span><button class="btn btn-solid" type="button" id="tGo">Start</button></div>' +
        '<div class="tempo"><div class="track"><div class="knob" id="knob"></div><small style="top:-4px">Stand</small><small style="bottom:-4px">Depth</small></div>' +
        '<div style="display:grid;gap:12px"><div class="phase" id="phase">Ready</div><div class="beats" id="beats"></div><p class="lab-note">Illustrative: a browser sketch of the tempo idea, not the brace\'s own firmware.</p></div></div></div>';
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
    document.querySelectorAll("[data-panel]").forEach(function (pn) { pn.hidden = pn.getAttribute("data-panel") !== k; });
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
    statusEl.className = "status" + (kind ? " " + kind : "");
    if (kind === "ok") statusTimer = setTimeout(function () { setStatus(""); }, 6000);
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.botcheck.checked) return;
    var msg = $("msgText").value.trim(), name = $("msgName").value.trim(), email = $("msgEmail").value.trim();
    if (!msg) { setStatus("Write a message first.", "err"); $("msgText").focus(); return; }
    if (email && !$("msgEmail").checkValidity()) { setStatus("That email address doesn't look right. Fix it or leave it blank.", "err"); $("msgEmail").focus(); return; }
    if (!FORM_KEY) { setStatus("Preview only: the form isn't connected yet, so nothing was sent.", "err"); return; }
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    var who = name || email || "Anonymous visitor";
    var payload = { access_key: FORM_KEY, subject: "Portfolio message from " + who, from_name: who, message: msg };
    if (name) payload.name = name;
    if (email) payload.email = email;
    fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().then(function (d) { if (!r.ok || !d.success) throw new Error(d.message || "failed"); }); })
      .then(function () { setStatus("Sent. Thanks for getting in touch.", "ok"); form.reset(); })
      .catch(function () { setStatus("That didn't send. Try again, or message me on LinkedIn.", "err"); })
      .then(function () { sendBtn.disabled = false; sendBtn.textContent = "Send"; });
  });
})();
