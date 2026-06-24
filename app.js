/* =====================================================================
   SITE LOGIC  -  reads window.PROJECTS (from projects.js)
   Works on GitHub Pages and when opened locally (no fetch needed).
   ===================================================================== */
(function () {
  "use strict";

  var ALL = (window.PROJECTS || []).slice().sort(function (a, b) {
    return (b.order || 0) - (a.order || 0);
  });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function byId(id) { return document.getElementById(id); }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function getSlug() { return new URL(window.location.href).searchParams.get("p"); }

  var ARROW = '<span class="arrow">&rarr;</span>';
  var LINKEDIN_SVG =
    '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5C1.11 6 0 4.881 0 3.5 0 2.12 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.98H4.7V24H.22zM8.9 8.98h4.29v2.05h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.89V24H18.4v-6.66c0-1.59-.03-3.64-2.22-3.64-2.22 0-2.56 1.74-2.56 3.53V24H9.04V8.98z"/></svg>';

  /* ---- card markup -------------------------------------------------- */
  function card(p, i) {
    var num = ("0" + (i + 1)).slice(-2);
    var discs = (p.disciplines || []).map(function (d) {
      return '<span class="disc">' + esc(d) + "</span>";
    }).join("");
    return (
      '<a class="card reveal" href="project.html?p=' + encodeURIComponent(p.slug) + '"' +
        ' data-disc="' + esc((p.disciplines || []).join("|")) + '">' +
        '<span class="num">' + num + "</span>" +
        '<div class="media"><img src="' + esc(p.cover) + '" alt="' + esc(p.title) +
          '" loading="lazy" decoding="async"></div>' +
        '<div class="body">' +
          '<div class="ttl">' + esc(p.title) + '<span class="yr">' + esc(p.year || "") + "</span></div>" +
          '<div class="tag">' + esc(p.tagline || "") + "</div>" +
          '<div class="discs">' + discs + "</div>" +
          '<span class="go">View case study ' + ARROW + "</span>" +
        "</div>" +
      "</a>"
    );
  }

  function renderGrid(el, list) {
    el.innerHTML = list.map(card).join("");
  }

  /* ---- home: featured grid ----------------------------------------- */
  function homeGrid() {
    var el = byId("work-grid");
    if (!el) return;
    var feat = ALL.filter(function (p) { return p.featured; });
    renderGrid(el, feat);
    var c = byId("work-count");
    if (c) c.textContent = "[ " + ("0" + feat.length).slice(-2) + " SELECTED / " +
      ("0" + ALL.length).slice(-2) + " TOTAL ]";
  }

  /* ---- projects.html: full grid + filters -------------------------- */
  function allGrid() {
    var el = byId("all-grid");
    if (!el) return;
    renderGrid(el, ALL);
    var c = byId("all-count");
    if (c) c.textContent = "[ " + ("0" + ALL.length).slice(-2) + " PROJECTS ]";

    var bar = byId("filters");
    if (!bar) return;
    var set = {};
    ALL.forEach(function (p) { (p.disciplines || []).forEach(function (d) { set[d] = 1; }); });
    var discs = Object.keys(set).sort();
    bar.innerHTML =
      '<button class="filter active" data-f="*">All</button>' +
      discs.map(function (d) {
        return '<button class="filter" data-f="' + esc(d) + '">' + esc(d) + "</button>";
      }).join("");

    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      qsa(".filter", bar).forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      var f = b.getAttribute("data-f");
      qsa(".card", el).forEach(function (cardEl) {
        var hit = f === "*" || ("|" + cardEl.getAttribute("data-disc") + "|").indexOf("|" + f + "|") > -1;
        cardEl.classList.toggle("hide", !hit);
      });
    });
  }

  /* ---- project detail page ----------------------------------------- */
  function projectPage() {
    var root = byId("project-root");
    if (!root) return;

    var idx = ALL.findIndex(function (p) { return p.slug === getSlug(); });
    if (idx < 0) {
      root.innerHTML =
        '<section class="wrap proj-hero"><div class="crumb"><a href="projects.html">&larr; All work</a></div>' +
        '<h1>Not found</h1><p class="proj-tagline">That project does not exist. ' +
        '<a href="projects.html" style="color:var(--accent)">Browse all work</a>.</p></section>';
      return;
    }
    var p = ALL[idx];
    document.title = p.title + " | Yousuf Shahabuddin";

    /* meta cells */
    var meta =
      '<div class="m"><div class="k">Year</div><div class="v">' + esc(p.year || "-") + "</div></div>" +
      '<div class="m"><div class="k">Role</div><div class="v">' + esc(p.role || "-") + "</div></div>" +
      '<div class="m"><div class="k">Disciplines</div><div class="v">' + esc((p.disciplines || []).join(", ")) + "</div></div>" +
      '<div class="m"><div class="k">Tools</div><div class="toolchips">' +
        (p.tools || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") +
      "</div></div>";

    /* contribution bullets */
    var contrib = (p.contribution || []).map(function (li, i) {
      return '<li><span class="ix">' + ("0" + (i + 1)).slice(-2) + "</span><span>" + esc(li) + "</span></li>";
    }).join("");

    /* media */
    var media = "";
    if (p.pdf) {
      media =
        '<div class="pdf-wrap reveal"><iframe class="pdf-frame" src="' + esc(p.pdf) +
          '" title="' + esc(p.title) + ' report" loading="lazy"></iframe>' +
          '<a class="pdf-open" href="' + esc(p.pdf) + '" target="_blank" rel="noopener">Open full report ' + ARROW + "</a></div>";
    } else {
      var imgs = (p.images || []).map(function (src) {
        return '<figure class="figure reveal"><img src="' + esc(src) + '" alt="' + esc(p.title) +
          '" loading="lazy" decoding="async" data-zoom="' + esc(src) + '"></figure>';
      }).join("");
      var vids = (p.videos || []).map(function (src) {
        return '<figure class="figure reveal"><video src="' + esc(src) + '" controls playsinline preload="metadata"></video></figure>';
      }).join("");
      if (imgs || vids) media = '<div class="gallery">' + imgs + vids + "</div>";
    }

    /* collaborators */
    var collab = "";
    if ((p.collaborators || []).length) {
      collab =
        '<section class="wrap" style="margin-top:clamp(34px,5vw,56px)">' +
          '<div class="eyebrow">Collaborators</div>' +
          '<div class="collab">' +
            p.collaborators.map(function (c) {
              return '<a href="' + esc(c.url || "#") + '" target="_blank" rel="noopener">' +
                LINKEDIN_SVG + "<span>" + esc(c.name) + "</span></a>";
            }).join("") +
          "</div>" +
        "</section>";
    }

    /* prev / next (wrap around the ordered list) */
    var prev = ALL[(idx - 1 + ALL.length) % ALL.length];
    var next = ALL[(idx + 1) % ALL.length];
    var pager =
      '<nav class="pager wrap" style="padding:0" aria-label="Project navigation">' +
        '<a href="project.html?p=' + encodeURIComponent(prev.slug) + '"><span class="k">&larr; Previous</span>' +
          '<span class="t">' + esc(prev.title) + "</span></a>" +
        '<a class="nx" href="project.html?p=' + encodeURIComponent(next.slug) + '"><span class="k">Next &rarr;</span>' +
          '<span class="t">' + esc(next.title) + "</span></a>" +
      "</nav>";

    root.innerHTML =
      '<section class="wrap proj-hero">' +
        '<div class="crumb reveal"><a href="index.html">Index</a> / <a href="projects.html">Work</a> / ' + esc(p.title) + "</div>" +
        '<h1 class="reveal">' + esc(p.title) + "</h1>" +
        '<p class="proj-tagline reveal">' + esc(p.tagline || "") + "</p>" +
        '<div class="proj-meta reveal">' + meta + "</div>" +
      "</section>" +

      '<section class="wrap" style="padding-top:clamp(34px,5vw,56px)">' +
        '<div class="proj-body">' +
          '<div class="brief-block reveal"><h2>Brief</h2><p>' + esc(p.brief || "") + "</p>" +
            '<div class="outcome"><span class="k">Outcome</span>' + esc(p.outcome || "") + "</div></div>" +
          '<div class="contrib-block reveal"><h2>What I did</h2><ul>' + contrib + "</ul></div>" +
        "</div>" +
      "</section>" +

      '<section class="wrap" style="padding-top:0">' + media + "</section>" +
      collab +
      pager;

    setupReveal();
    setupLightbox();
  }

  /* ---- shared behaviour -------------------------------------------- */
  function setupReveal() {
    var els = qsa(".reveal:not(.show)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("show"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function setupLightbox() {
    var lb = byId("lightbox");
    if (!lb) return;
    var img = qs("img", lb);
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-zoom]");
      if (t) { img.src = t.getAttribute("data-zoom"); lb.classList.add("open"); return; }
      if (e.target === lb || e.target.closest(".lb-close")) { lb.classList.remove("open"); img.src = ""; }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { lb.classList.remove("open"); img.src = ""; }
    });
  }

  function setupTop() {
    var btn = byId("toTop");
    if (!btn) return;
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    var onScroll = function () { btn.style.display = window.scrollY > 500 ? "inline-flex" : "none"; };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function stampYears() {
    qsa("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    homeGrid();
    allGrid();
    projectPage();
    setupReveal();
    setupLightbox();
    setupTop();
    stampYears();
  });
})();
