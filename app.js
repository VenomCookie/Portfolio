/*SITE LOGIC */
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
  function encURL(s) {
    // encode spaces/parentheses etc. so iOS Safari loads files with such names
    return encodeURI(String(s == null ? "" : s)).replace(/\(/g, "%28").replace(/\)/g, "%29");
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
        '<div class="media"><img src="' + esc(encURL(p.cover)) + '" alt="' + esc(p.title) +
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
    /* stagger the card entrances */
    qsa(".card", el).forEach(function (c, i) {
      c.style.setProperty("--d", (Math.min(i, 5) * 0.07) + "s");
    });
  }

  /* ---- home: featured grid ----------------------------------------- */
  var HOME_LIMIT = 5; /* how many projects the homepage shows */

  function homeGrid() {
    var el = byId("work-grid");
    if (!el) return;
    var feat = ALL.filter(function (p) { return p.featured; }).slice(0, HOME_LIMIT);
    renderGrid(el, feat);
    /* final tile: the all-work CTA lives inside the grid scan path */
    var rest = ALL.length - feat.length;
    el.insertAdjacentHTML("beforeend",
      '<a class="card card-more reveal" href="projects.html" style="--d:' + (Math.min(feat.length,5)*0.07) + 's">' +
        '<span class="more-num">+' + rest + "</span>" +
        '<span class="more-label">More projects</span>' +
        '<span class="go">View all work <span class="arrow">&rarr;</span></span>' +
      "</a>");
    var mc = el.querySelector(".card-more");
    if (mc) requestAnimationFrame(function(){ mc.classList.add("show"); });
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
    (function () {
      var base = "https://design.yousufshahabuddin.com/";
      function up(sel, attrName, attrVal, content) {
        var el = document.querySelector(sel);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attrName, attrVal);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      }
      up('meta[name="description"]', "name", "description", p.tagline || "");
      up('meta[property="og:title"]', "property", "og:title", p.title + " | Yousuf Shahabuddin");
      up('meta[property="og:description"]', "property", "og:description", p.tagline || "");
      up('meta[property="og:image"]', "property", "og:image", base + encURL(p.cover));
      up('meta[property="og:type"]', "property", "og:type", "article");
      up('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    })();

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

    /* live, playable embed (for web apps / games) */
    var live = "";
    if (p.liveUrl || p.embed) {
      live =
        '<div class="live-wrap reveal">' +
          (p.embed
            ? '<div class="embed-frame"><iframe src="' + esc(encURL(p.embed)) + '" title="' +
                esc(p.title) + '" loading="lazy" allowfullscreen></iframe></div>'
            : "") +
          (p.liveUrl
            ? '<a class="btn btn-solid" style="margin-top:14px" href="' + esc(p.liveUrl) +
                '" target="_blank" rel="noopener">Open full screen ' + ARROW + "</a>"
            : "") +
        "</div>";
    }

    var imgs = (p.images || []).map(function (src) {
      return '<figure class="figure reveal"><img src="' + esc(encURL(src)) + '" alt="' + esc(p.title) +
        '" loading="lazy" decoding="async" data-zoom="' + esc(encURL(src)) + '"></figure>';
    }).join("");
    var vids = (p.videos || []).map(function (src) {
      return '<figure class="figure reveal"><video src="' + esc(encURL(src)) + '" controls playsinline preload="metadata"></video></figure>';
    }).join("");
    if (imgs || vids) media += '<div class="gallery">' + imgs + vids + "</div>";

    if (p.pdf) {
      var pdfUrl = Array.isArray(p.pdf) ? p.pdf[0] : p.pdf;
      media +=
        '<div class="pdf-wrap reveal"><iframe class="pdf-frame" src="' + esc(encURL(pdfUrl)) +
          '" title="' + esc(p.title) + ' report" loading="lazy"></iframe>' +
          '<a class="pdf-open" href="' + esc(encURL(pdfUrl)) + '" target="_blank" rel="noopener">Open full report ' + ARROW + "</a></div>";
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

      '<section class="wrap" style="padding-top:0">' + live + media + "</section>" +
      collab +
      pager;

    setupReveal();
    setupLightbox();
  }

  /* ---- shared behaviour -------------------------------------------- */
  function setupReveal() {
    if (SDA) return;               /* CSS view() timeline drives .reveal */
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
    var onScroll = function () { btn.classList.toggle("on", window.scrollY > 500); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Native CSS scroll-driven animations: when supported, the reveal,
     progress bar and hero parallax are handled entirely in CSS (see the
     SCROLL-DRIVEN block in style.css) and the JS versions below bail out.
     The html.sda class is what switches the stylesheet over. */
  var SDA = typeof CSS !== "undefined" && CSS.supports &&
    CSS.supports("animation-timeline: view()");
  if (SDA) document.documentElement.classList.add("sda");

  function setupProgress() {
    if (REDUCED) return;
    if (SDA) {                     /* CSS scroll() timeline drives the bar */
      var cssBar = document.createElement("div");
      cssBar.id = "progress";
      document.body.appendChild(cssBar);
      return;
    }
    var bar = document.createElement("div");
    bar.id = "progress";
    document.body.appendChild(bar);
    var ticking = false;
    function draw() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(draw); }
    }, { passive: true });
    draw();
  }

  function setupNavHide() {
    var nav = qs(".nav");
    if (!nav) return;
    var last = window.scrollY;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      nav.classList.toggle("nav-raise", y > 8);
      if (REDUCED) { last = y; return; }
      if (y > last && y > 140) nav.classList.add("nav-hide");
      else nav.classList.remove("nav-hide");
      last = y;
    }, { passive: true });
  }

  function setupParallax() {
    if (REDUCED || SDA) return;    /* CSS scroll() timeline drives the plate */
    var plate = qs(".plate");
    if (!plate || window.innerWidth < 880) return;
    var ticking = false;
    function draw() {
      var y = window.scrollY;
      if (y < window.innerHeight) plate.style.transform = "translateY(" + (y * 0.06) + "px)";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(draw); }
    }, { passive: true });
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
    setupProgress();
    setupNavHide();
    setupParallax();
    stampYears();
  });
})();
