/* =====================================================================
   ENHANCEMENTS — progressive extras layered on top of app.js.
   Everything in here degrades silently: if this file fails to load,
   the site still works exactly as before.
   ===================================================================== */
(function () {
  "use strict";

  /* Flag the html element immediately (before first paint of injected
     content) so CSS knows the enhancement layer is live. Image fade-in
     styles are gated on this class — no JS, no hidden images. */
  document.documentElement.classList.add("enh");

  var REDUCED = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     1. IMAGE FADE-IN — gallery / card images resolve in instead of
        popping. Runs after app.js has rendered (DOMContentLoaded
        handlers fire in registration order; this script loads last).
     ------------------------------------------------------------------ */
  function setupImageFade() {
    var imgs = document.querySelectorAll(".media img, .figure img");
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", function () { img.classList.add("loaded"); }, { once: true });
        img.addEventListener("error", function () { img.classList.add("loaded"); }, { once: true });
      }
    });
    /* shimmer only runs for media that has actually entered the viewport,
       so lazy-loaded cards below the fold don't keep animations ticking */
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in-view");
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: "100px" });
      Array.prototype.forEach.call(document.querySelectorAll(".card .media"), function (m) {
        io.observe(m);
      });
    }
  }

  /* ------------------------------------------------------------------
     2. KINETIC MARQUEE — the capability strip becomes grabbable.
        Drag it, flick it, and it coasts with exponential decay before
        easing back into its idle drift. Skipped for reduced motion
        (the CSS animation also stays off in that case via the
        stylesheet), and the CSS keyframe animation is replaced by
        this rAF loop so drag and drift share one offset.
     ------------------------------------------------------------------ */
  function setupKineticMarquee() {
    var marquee = document.querySelector(".marquee");
    var track = document.querySelector(".marquee-track");
    var group = track && track.querySelector(".marquee-group");
    if (!marquee || !track || !group || REDUCED) return;

    track.style.animation = "none";
    marquee.classList.add("grabbable");

    /* Wrap by the exact width of one group (not scrollWidth/2, which
       drifts with flex rounding), and clone groups until the track can
       cover the widest viewport at any wrap position — this is what
       kills the blank gaps. */
    var groupWidth = 0;
    function fill() {
      groupWidth = group.offsetWidth;
      if (groupWidth <= 0) return;
      var need = window.innerWidth + groupWidth * 2;
      while (track.scrollWidth < need) {
        track.appendChild(group.cloneNode(true));
      }
    }
    fill();
    window.addEventListener("resize", fill);

    var AUTO = groupWidth / 30000;        /* px/ms — same pace as the old 30s CSS loop */
    var HARD_THROW = 0.4;                 /* px/ms — a real fling can flip the idle direction */
    var pos = 0, velocity = -AUTO, direction = -1;
    var dragging = false, startX = 0, startPos = 0, lastX = 0, lastT = 0, flingV = 0;

    marquee.addEventListener("pointerdown", function (e) {
      dragging = true;
      marquee.setPointerCapture(e.pointerId);
      marquee.classList.add("dragging");
      startX = lastX = e.clientX; startPos = pos;
      lastT = performance.now(); flingV = 0;
    });
    marquee.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var now = performance.now();
      var dt = (now - lastT) || 16;
      flingV = (e.clientX - lastX) / dt;
      pos = startPos + (e.clientX - startX);   /* absolute, so no per-event drift */
      lastX = e.clientX; lastT = now;
    });
    function release() {
      if (!dragging) return;
      dragging = false;
      marquee.classList.remove("dragging");
      var speed = Math.min(Math.abs(flingV), 3);
      if (speed > HARD_THROW) direction = flingV > 0 ? 1 : -1;
      velocity = Math.sign(flingV || direction) * Math.max(speed, AUTO);
    }
    marquee.addEventListener("pointerup", release);
    marquee.addEventListener("pointercancel", release);

    var onScreen = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
      }).observe(marquee);
    }

    var lastFrame = performance.now();
    function frame(now) {
      var dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      /* off-screen or backgrounded: skip all work — nothing to see */
      if (!onScreen || document.hidden) {
        requestAnimationFrame(frame);
        return;
      }
      if (!dragging) {
        /* momentum eases back into the idle drift (~400 ms time constant) */
        var target = direction * AUTO;
        velocity += (target - velocity) * Math.min(dt / 400, 1);
        pos += velocity * dt;
      }
      if (groupWidth > 0) {
        pos = pos % groupWidth;
        if (pos > 0) pos -= groupWidth;
      }
      track.style.transform = "translate3d(" + pos + "px,0,0)";
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------
     3. LIVE TITLE BLOCK — the Sheet/Rev cell reads the real revision
        from GitHub: commit count + date of the last commit. Cached in
        localStorage for 6 h so casual browsing doesn't hit the API.
     ------------------------------------------------------------------ */
  function setupLiveRev() {
    var cells = document.querySelectorAll("[data-rev]");
    if (!cells.length) return;

    var KEY = "site-rev";
    var TTL = 6 * 60 * 60 * 1000;

    function paint(rev) {
      Array.prototype.forEach.call(cells, function (el) {
        var page = el.getAttribute("data-rev") || "";
        el.textContent = (page ? page + " \u00B7 " : "") + "REV " + rev.count + " \u00B7 " + rev.date;
      });
    }

    try {
      var cached = JSON.parse(localStorage.getItem(KEY) || "null");
      if (cached && Date.now() - cached.t < TTL) { paint(cached); return; }
      if (cached) paint(cached);  /* stale-while-revalidate */
    } catch (e) { /* ignore */ }

    fetch("https://api.github.com/repos/VenomCookie/Portfolio/commits?per_page=1")
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        var link = r.headers.get("Link") || "";
        var m = link.match(/&page=(\d+)>; rel="last"/);
        return r.json().then(function (j) {
          return { count: m ? m[1] : "?", date: (j[0].commit.committer.date || "").slice(0, 10) };
        });
      })
      .then(function (rev) {
        rev.t = Date.now();
        try { localStorage.setItem(KEY, JSON.stringify(rev)); } catch (e) { /* ignore */ }
        paint(rev);
      })
      .catch(function () { /* leave the static text alone */ });
  }

  /* ------------------------------------------------------------------
     4. VELOCITY-GATED HOVER — while the cursor is sweeping fast across
        the page, card hover effects are suppressed so the grid doesn't
        strobe. The gate opens again ~120 ms after the cursor settles.
     ------------------------------------------------------------------ */
  function setupHoverGate() {
    if (REDUCED || !window.matchMedia("(hover:hover)").matches) return;
    var lastX = 0, lastY = 0, lastT = 0, timer = 0;
    var html = document.documentElement;
    document.addEventListener("mousemove", function (e) {
      var now = performance.now();
      if (lastT) {
        var dt = now - lastT;
        var d = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (dt > 0 && d / dt > 1.2) {          /* > 1.2 px/ms = sweeping */
          html.classList.add("cursor-fast");
          clearTimeout(timer);
          timer = setTimeout(function () { html.classList.remove("cursor-fast"); }, 120);
        }
      }
      lastX = e.clientX; lastY = e.clientY; lastT = now;
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     5. PREFETCH ON INTENT — hovering/focusing/touching an internal link
        warms the cache before the click lands.
     ------------------------------------------------------------------ */
  function setupPrefetch() {
    var seen = {};
    function intent(e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href || seen[href]) return;
      if (/^(https?:|mailto:|#)/.test(href)) return;   /* internal only */
      seen[href] = 1;
      var l = document.createElement("link");
      l.rel = "prefetch"; l.href = href;
      document.head.appendChild(l);
    }
    document.addEventListener("mouseover", intent, { passive: true });
    document.addEventListener("focusin", intent);
    document.addEventListener("touchstart", intent, { passive: true });
  }

  /* ------------------------------------------------------------------
     6. VIEW TRANSITION TITLE MORPH — on browsers with cross-document
        view transitions, the clicked card's title morphs into the case
        study's h1. The h1 side is named in CSS; the card side is named
        here, at the moment of navigation, so only one element ever
        carries the name per page.
     ------------------------------------------------------------------ */
  var lastClickedCard = null;
  document.addEventListener("click", function (e) {
    var c = e.target.closest && e.target.closest(".card[href*='project.html']");
    if (c) lastClickedCard = c;
  }, true);
  window.addEventListener("pageswap", function () {
    if (lastClickedCard) {
      var ttl = lastClickedCard.querySelector(".ttl");
      if (ttl) ttl.style.viewTransitionName = "page-title";
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    setupImageFade();
    setupKineticMarquee();
    setupLiveRev();
    setupHoverGate();
    setupPrefetch();
  });
})();
