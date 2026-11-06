/* Hero: the AlignΞd BOA ratchet as a WebGL exploded view. Scroll separates the parts, drag turns the assembly. Renders only while something is changing. */
(function () {
  "use strict";

  var canvas = document.getElementById("xv3");
  if (!canvas) return;
  var stage = canvas.closest(".stage");
  var gl = canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: true });
  if (!gl) { stage.classList.add("no3d"); return; }
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var FACE_VS = "#version 300 es\n" +
    "layout(location=0) in vec3 aQ;\n" +
    "uniform mat4 uView, uProj; uniform vec3 uLo; uniform float uScale; uniform float uDz;\n" +
    "out vec3 vPos;\n" +
    "void main(){ vec3 p = uLo + aQ * uScale; p.z += uDz; vec4 v = uView * vec4(p, 1.0); vPos = v.xyz; gl_Position = uProj * v; }";
  var FACE_FS = "#version 300 es\nprecision highp float;\n" +
    "in vec3 vPos; uniform vec3 uDark, uLight, uDir; out vec4 o;\n" +
    "void main(){ vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));\n" +
    " float d = clamp(dot(n, uDir), 0.0, 1.0); float s = 0.18 + 0.82 * smoothstep(0.0, 1.0, d);\n" +
    " o = vec4(mix(uDark, uLight, s), 1.0); }";
  var HULL_VS = "#version 300 es\n" +
    "layout(location=0) in vec3 aQ; layout(location=1) in vec3 aN;\n" +
    "uniform mat4 uView, uProj; uniform vec3 uLo; uniform float uScale; uniform float uDz; uniform vec2 uPx;\n" +
    "void main(){ vec3 p = uLo + aQ * uScale; p.z += uDz; vec4 c = uProj * uView * vec4(p, 1.0);\n" +
    " vec4 cn = uProj * uView * vec4(aN, 0.0); vec2 d = cn.xy; float l = length(d);\n" +
    " if (l > 1e-5) c.xy += (d / l) * uPx * c.w; gl_Position = c; }";
  var LINE_FS = "#version 300 es\nprecision highp float;\nuniform vec3 uInk; out vec4 o;\nvoid main(){ o = vec4(uInk, 1.0); }";

  function shader(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  function program(vs, fs) {
    var p = gl.createProgram();
    gl.attachShader(p, shader(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, shader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < n; i++) { var name = gl.getActiveUniform(p, i).name; u[name] = gl.getUniformLocation(p, name); }
    return { p: p, u: u };
  }

  var progFace, progHull, progLine;
  try {
    progFace = program(FACE_VS, FACE_FS);
    progHull = program(HULL_VS, LINE_FS);
    progLine = program(FACE_VS, LINE_FS);
  } catch (err) { stage.classList.add("no3d"); return; }

  function perspective(fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function lookAt(e, t, up) {
    var zx = e[0] - t[0], zy = e[1] - t[1], zz = e[2] - t[2], l = Math.hypot(zx, zy, zz);
    zx /= l; zy /= l; zz /= l;
    var xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx;
    l = Math.hypot(xx, xy, xz); xx /= l; xy /= l; xz /= l;
    var yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    return [xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0,
      -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1];
  }

  function cssColor(name) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    var m = /^#([0-9a-f]{6})$/i.exec(v);
    if (m) { var n = parseInt(m[1], 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }
    m = /rgba?\(([^)]+)\)/.exec(v);
    if (m) { var c = m[1].split(",").map(parseFloat); return [c[0] / 255, c[1] / 255, c[2] / 255]; }
    return [0.5, 0.5, 0.5];
  }
  var colors = {};
  function readColors() {
    colors.light = cssColor("--face-t");
    colors.dark = cssColor("--face-r");
    colors.ink = cssColor("--ink");
  }

  var parts = [], head = null;
  var az = -0.75, el = 0.42, azV = 0;
  var e = 0, eTarget = 0, intro = reduced ? 1 : 0, introStart = 0;
  var visible = true, raf = null, dirty = true, dragging = null;

  function goal() {
    var r = stage.getBoundingClientRect(), vh = window.innerHeight || 1;
    var c = (r.top + r.height / 2) / vh;
    return Math.max(0.3, Math.min(1, 0.3 + (0.72 - c) * 1.15));
  }

  function size() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; dirty = true; }
  }

  function draw() {
    if (!head) return;
    size();
    var w = canvas.width, h = canvas.height, aspect = w / h;
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    var k = e * intro, zLo = Infinity, zHi = -Infinity, rMax = 0;
    parts.forEach(function (p) {
      p.off = p.dz * (1 - k);
      zLo = Math.min(zLo, p.zmin + p.off);
      zHi = Math.max(zHi, p.zmax + p.off);
      rMax = Math.max(rMax, p.r);
    });
    var fov = 0.36, hgt = zHi - zLo;
    var half = (hgt * Math.cos(el) + 2 * rMax * Math.sin(el)) / 2;
    var dist = Math.max(half / Math.tan(fov / 2) * 1.12, rMax / (Math.tan(fov / 2) * aspect) * 1.25);
    var tz = (zLo + zHi) / 2;
    var eye = [Math.cos(az) * Math.cos(el) * dist, Math.sin(az) * Math.cos(el) * dist, tz + Math.sin(el) * dist];
    var view = lookAt(eye, [0, 0, tz], [0, 0, 1]);
    var proj = perspective(fov, aspect, Math.max(1, dist - 200), dist + 200);
    var outline = 1.3 * Math.min(window.devicePixelRatio || 1, 2);

    function common(pr, p) {
      gl.uniformMatrix4fv(pr.u.uView, false, view);
      gl.uniformMatrix4fv(pr.u.uProj, false, proj);
      gl.uniform3fv(pr.u.uLo, head.lo);
      gl.uniform1f(pr.u.uScale, head.scale);
      gl.uniform1f(pr.u.uDz, p.off);
    }

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);
    gl.useProgram(progHull.p);
    gl.uniform3fv(progHull.u.uInk, colors.ink);
    gl.uniform2f(progHull.u.uPx, 2 * outline / w, 2 * outline / h);
    parts.forEach(function (p) { common(progHull, p); gl.bindVertexArray(p.vao); gl.drawElements(gl.TRIANGLES, p.tris * 3, gl.UNSIGNED_SHORT, 0); });

    gl.cullFace(gl.BACK);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1, 1);
    gl.useProgram(progFace.p);
    gl.uniform3fv(progFace.u.uDark, colors.dark);
    gl.uniform3fv(progFace.u.uLight, colors.light);
    gl.uniform3fv(progFace.u.uDir, [-0.42, 0.74, 0.53]);
    parts.forEach(function (p) { common(progFace, p); gl.bindVertexArray(p.vao); gl.drawElements(gl.TRIANGLES, p.tris * 3, gl.UNSIGNED_SHORT, 0); });
    gl.disable(gl.POLYGON_OFFSET_FILL);

    gl.useProgram(progLine.p);
    gl.uniform3fv(progLine.u.uInk, colors.ink);
    parts.forEach(function (p) { common(progLine, p); gl.bindVertexArray(p.lvao); gl.drawElements(gl.LINES, p.edges * 2, gl.UNSIGNED_SHORT, 0); });
    gl.bindVertexArray(null);
    dirty = false;
  }

  function loop(now) {
    raf = null;
    if (!introStart) introStart = now;
    if (intro < 1) {
      var t = Math.max(0, Math.min(1, (now - introStart - 200) / 1400));
      intro = 1 - Math.pow(1 - t, 3);
      az = -0.75 - 0.9 * (1 - intro);
      dirty = true;
    }
    var de = reduced ? eTarget - e : (eTarget - e) * 0.12;
    if (Math.abs(de) > 0.0004) { e += de; dirty = true; } else if (e !== eTarget) { e = eTarget; dirty = true; }
    if (!dragging && Math.abs(azV) > 0.0002) { az += azV; azV *= 0.94; dirty = true; } else if (!dragging) azV = 0;
    if (dirty) draw();
    if (intro < 1 || e !== eTarget || (!dragging && Math.abs(azV) > 0.0002)) kick();
  }
  function kick() { if (!raf && visible) raf = requestAnimationFrame(loop); }
  function onScroll() { if (!visible) return; eTarget = goal(); kick(); }

  function parse(buf) {
    var dv = new DataView(buf), jl = dv.getUint32(0, true);
    head = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 4, jl)));
    var off = 4 + jl;
    head.parts.forEach(function (m) {
      var pos = new Uint16Array(buf, off, m.verts * 3); off += m.verts * 6;
      var nrm = new Int8Array(buf, off, m.verts * 3); off += m.verts * 3;
      while (off % 4) off++;
      var idx = new Uint16Array(buf, off, m.tris * 3); off += m.tris * 6;
      var edg = new Uint16Array(buf, off, m.edges * 2); off += m.edges * 4;
      while (off % 4) off++;

      var vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      var pb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, pb); gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.UNSIGNED_SHORT, false, 0, 0);
      var nb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, nb); gl.bufferData(gl.ARRAY_BUFFER, nrm, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.BYTE, true, 0, 0);
      var ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

      var lvao = gl.createVertexArray();
      gl.bindVertexArray(lvao);
      gl.bindBuffer(gl.ARRAY_BUFFER, pb);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.UNSIGNED_SHORT, false, 0, 0);
      var eb = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eb); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edg, gl.STATIC_DRAW);
      gl.bindVertexArray(null);

      parts.push({ vao: vao, lvao: lvao, tris: m.tris, edges: m.edges, dz: m.dz, zmin: m.zmin, zmax: m.zmax, r: m.r, off: 0 });
    });
  }

  canvas.addEventListener("pointerdown", function (ev) {
    if (ev.button !== 0) return;
    dragging = { x: ev.clientX, y: ev.clientY, id: ev.pointerId, t: performance.now(), moved: false };
    azV = 0;
    stage.classList.add("turning");
  });
  canvas.addEventListener("pointermove", function (ev) {
    if (!dragging || ev.pointerId !== dragging.id) return;
    var dx = ev.clientX - dragging.x, dy = ev.clientY - dragging.y;
    if (!dragging.moved && Math.abs(dx) < 3) return;
    if (!dragging.moved) { dragging.moved = true; try { canvas.setPointerCapture(ev.pointerId); } catch (x) { } }
    var now = performance.now(), dt = Math.max(1, now - dragging.t);
    var step = -dx * 0.0085;
    az += step;
    azV = step * Math.min(1, 16 / dt);
    if (ev.pointerType === "mouse") el = Math.max(0.12, Math.min(0.95, el + dy * 0.004));
    dragging.x = ev.clientX; dragging.y = ev.clientY; dragging.t = now;
    dirty = true;
    kick();
  });
  function endDrag(ev) {
    if (!dragging || (ev && ev.pointerId !== dragging.id)) return;
    dragging = null;
    stage.classList.remove("turning");
    kick();
  }
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);
  canvas.addEventListener("lostpointercapture", endDrag);

  readColors();
  new MutationObserver(function () { readColors(); dirty = true; kick(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  if (mq.addEventListener) mq.addEventListener("change", function () { readColors(); dirty = true; kick(); });

  if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) { eTarget = goal(); dirty = true; kick(); } }).observe(stage);
  if ("ResizeObserver" in window) new ResizeObserver(function () { dirty = true; kick(); }).observe(canvas);
  window.addEventListener("scroll", onScroll, { passive: true });

  fetch(canvas.getAttribute("data-src")).then(function (r) {
    if (!r.ok) throw new Error(r.status);
    return r.arrayBuffer();
  }).then(function (buf) {
    parse(buf);
    eTarget = goal();
    e = reduced ? eTarget : 0;
    stage.classList.add("ready");
    dirty = true;
    kick();
  }).catch(function () { stage.classList.add("no3d"); });
})();
