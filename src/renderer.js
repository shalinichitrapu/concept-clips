// Concept Clips renderer: draws a topic's scenes into one 800 x 450 SVG and plays its steps.
// Topic files only describe elements and steps (see docs/AUTHORING.md); every visual decision
// lives here and in src/art, which is what keeps all clips looking and moving the same way.
(() => {
  const { el, sty, tone, F, K, line, shape, rect, circ, txt, wrap, docLines } = CC;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
  const DIR = { t: [0, -1], b: [0, 1], l: [-1, 0], r: [1, 0] };

  CC.reduceMotion = reduce;

  CC.createStage = function (svg) {
    let clip = null, FLAT = [], S = null, runId = 0;

    // Grid coordinates (math orientation, y up) to canvas pixels.
    function G(p) {
      const g = S.scene.grid || CC.GRID;
      return [g.x0 + p[0] * g.cell, g.y0 + (g.rows - p[1]) * g.cell];
    }

    /* ---------- elements ---------- */
    const draw = {
      grid(id, d) {
        const g = el("g", {}, S.layers.back); g.style.opacity = 0;
        const { x0, y0, cell, cols, rows } = S.scene.grid || CC.GRID;
        if (d.style === "city") {
          el("rect", { x: x0 - 8, y: y0 - 8, width: cols * cell + 16, height: rows * cell + 16, rx: 8, class: "street" }, g);
          for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++)
            el("rect", { x: x0 + i * cell + 7, y: y0 + j * cell + 7, width: cell - 14, height: cell - 14, rx: 4, class: "block" }, g);
        } else {
          for (let i = 0; i <= cols; i++) el("line", { x1: x0 + i * cell, x2: x0 + i * cell, y1: y0, y2: y0 + rows * cell, class: "gl" }, g);
          for (let j = 0; j <= rows; j++) el("line", { x1: x0, x2: x0 + cols * cell, y1: y0 + j * cell, y2: y0 + j * cell, class: "gl" }, g);
          if (d.axes !== false) {
            const yb = y0 + rows * cell;
            el("line", { x1: x0, x2: x0 + cols * cell + 12, y1: yb, y2: yb, class: "axisline" }, g);
            el("line", { x1: x0, x2: x0, y1: yb, y2: y0 - 12, class: "axisline" }, g);
            txt(g, x0 - 8, yb + 18, "0", "tick", "end");
            for (let i = 1; i <= cols; i++) txt(g, x0 + i * cell, yb + 20, String(i), "tick");
            for (let j = 1; j <= rows; j++) txt(g, x0 - 10, yb - j * cell + 4, String(j), "tick", "end");
            txt(g, x0 + cols * cell + 20, yb + 4, d.xLabel || "x", "tick", "start");
            txt(g, x0, y0 - 20, d.yLabel || "y", "tick");
          }
        }
        S.nodes[id] = { g, d, type: "grid" };
      },
      path(id, d) {
        const g = el("g", {}, S.layers.mid); g.style.opacity = 0;
        const pts = d.px ? d.pts : d.pts.map(G);
        const p = el("path", { d: "M" + pts.map(q => q.join(",")).join(" L"), class: d.dashed ? "route dashed" : "route" }, g);
        p.style.stroke = K(d.tone || "grey"); p.style.strokeWidth = d.w || 5;
        S.nodes[id] = { g, d, p, type: "path", target: d.opacity ?? 1 };
      },
      circle(id, d) {
        const g = el("g", {}, S.layers.mid); g.style.opacity = 0;
        const [cx, cy] = d.px ? d.at : G(d.at);
        const r = d.px ? d.r : d.r * (S.scene.grid || CC.GRID).cell;
        const c = el("circle", { cx, cy, r, class: d.dashed ? "route dashed" : "route" }, g);
        c.style.stroke = K(d.tone || "grey"); c.style.strokeWidth = d.w || 4;
        if (d.fill) c.style.fill = F(d.tone || "grey");
        S.nodes[id] = { g, d, type: "circle", halo: [cx, cy, r, 1.15] };
      },
      point(id, d) {
        const g = el("g", {}, S.layers.top); g.style.opacity = 0;
        const [x, y] = d.px ? d.at : G(d.at);
        circ(g, x, y, d.r || 8, { fill: K(d.tone || "violet"), stroke: "var(--canvas)", strokeWidth: 3 });
        if (d.label) txt(g, x + (d.lx || 0), y + (d.ly || 0), d.label, "ptlabel", d.anchor || "middle");
        S.nodes[id] = { g, d, type: "point", halo: [x, y, 16, 1.8], c: [x, y] };
      },
      box(id, d) {
        const g = el("g", {}, S.layers.nodes); g.style.opacity = 0;
        rect(g, d.x, d.y, d.w, d.h, { fill: F(d.tone || "grey"), stroke: K(d.tone || "grey"), strokeWidth: 2 }, 14);
        const lines = d.sub ? wrap(d.sub, Math.floor((d.w - 22) / 7.2)) : [];
        const block = 22 + lines.length * 18;
        const top = d.y + d.h / 2 - block / 2 + 17, cx = d.x + d.w / 2;
        txt(g, cx, top, d.label, "lbl");
        lines.forEach((ln, i) => txt(g, cx, top + 23 + i * 18, ln, "sub"));
        S.nodes[id] = { g, d, type: "box", bx: { x: d.x, y: d.y, w: d.w, h: d.h } };
      },
      art(id, d) {
        const A = CC.ART[d.kind], s = d.s || 1, W = A.w * s, H = A.h * s;
        const g = el("g", {}, d.layer === "back" ? S.layers.back : S.layers.nodes); g.style.opacity = 0;
        const inner = el("g", { transform: `translate(${d.x},${d.y}) scale(${s})` }, g);
        if (d.flip) inner.setAttribute("transform", `translate(${d.x + W},${d.y}) scale(${-s},${s})`);
        A.draw(inner, d);
        if (d.label) {
          const cx = d.x + W / 2 + (d.lx || 0), y = d.labelAbove ? d.y - 14 - (d.sub ? 17 : 0) : d.y + H + 22 + (d.ly || 0);
          txt(g, cx, y, d.label, "artlbl");
          if (d.sub) wrap(d.sub, Math.floor((d.lw || W + 40) / 7)).forEach((ln, i) => txt(g, cx, y + 19 + i * 17, ln, "sub"));
        }
        S.nodes[id] = { g, d, type: "art", bx: { x: d.x, y: d.y, w: W, h: H } };
      },
      bar(id, d) {
        const g = el("g", {}, S.layers.nodes); g.style.opacity = 0;
        const pr = rect(g, d.x, 0, d.w, 0, { fill: F(d.tone || "teal"), stroke: K(d.tone || "teal"), strokeWidth: 2 }, 4);
        const it = d.tone2 || "amber";
        const ir = rect(g, d.x, 0, d.w, 0, { fill: F(it), stroke: K(it), strokeWidth: 2 }, 4);
        const val = txt(g, d.x + d.w / 2, 0, "", "val");
        txt(g, d.x + d.w / 2, S.scene.base + 24, d.label, "sub");
        const n = { g, d, pr, ir, val, interest: 0, type: "bar" };
        S.nodes[id] = n;
        setBar(n, d.interest || 0);
      },
      text(id, d) {
        const g = el("g", {}, S.layers.top); g.style.opacity = 0;
        let [x, y] = d.at ? G(d.at) : [d.x, d.y];
        x += d.dx || 0; y += d.dy || 0;
        if (d.swatch === "dash") {
          const ln = el("line", { x1: x, y1: y - 5, x2: x + 26, y2: y - 5 }, g);
          if (d.swatchTone) { ln.setAttribute("class", "route dashed"); sty(ln, { stroke: K(d.swatchTone), strokeWidth: 4 }); }
          else ln.setAttribute("class", "trend");
          x += 34;
        } else if (d.swatch) {
          rect(g, x, y - 12, 13, 13, { fill: F(d.swatch), stroke: K(d.swatch), strokeWidth: 1.5 }, 3);
          x += 20;
        }
        const t = txt(g, x, y, d.text, d.cls || "lbl", d.anchor || "start");
        if (d.tone) t.style.fill = K(d.tone);
        S.nodes[id] = { g, d, t, type: "text" };
      },
      axis(id, d) {
        const g = el("g", {}, S.layers.nodes); g.style.opacity = 0;
        el("line", { x1: d.x1, x2: d.x2, y1: d.y, y2: d.y, class: "axis" }, g);
        S.nodes[id] = { g, d, type: "axis" };
      },
      trend(id, d) {
        const g = el("g", {}, S.layers.top); g.style.opacity = 0;
        const pts = d.points.map(([x, v]) => [x, S.scene.base - v * S.scene.scale]);
        el("polyline", { points: pts.map(p => p.join(",")).join(" "), class: "trend" }, g);
        pts.forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 4, class: "trend-dot" }, g));
        S.nodes[id] = { g, d, type: "trend" };
      },
      track(id, d) {
        const p = el("path", { d: d.d, fill: "none" }, S.layers.mid);
        S.nodes[id] = { g: p, d, p, type: "track" };
      },
      ring(id, d) {
        const g = el("g", {}, S.layers.top); g.style.opacity = 0;
        const c = el("circle", { cx: d.x, cy: d.y, r: d.r, class: "route dashed" }, g);
        sty(c, { stroke: K(d.tone || "green"), strokeWidth: 4 });
        S.nodes[id] = { g, d, type: "ring", halo: [d.x, d.y, d.r, 1.3] };
      },
      callout(id, d) {
        const g = el("g", {}, S.layers.top); g.style.opacity = 0;
        line(g, ...d.from, ...d.to, { stroke: "var(--muted)", strokeWidth: 1.5 });
        circ(g, ...d.from, 3.5, { fill: "var(--muted)" });
        const a = d.anchor || (d.to[0] >= d.from[0] ? "start" : "end");
        txt(g, d.to[0] + (a === "start" ? 6 : a === "end" ? -6 : 0), d.to[1] + 5, d.text, "callout", a);
        S.nodes[id] = { g, d, type: "callout" };
      },
      meter(id, d) {
        const g = el("g", {}, S.layers.nodes); g.style.opacity = 0;
        txt(g, d.x, d.y - 8, d.label, "mlabel", "start");
        const val = txt(g, d.x + d.w, d.y - 8, "", "mval", "end");
        rect(g, d.x, d.y, d.w, 12, { fill: "var(--line)" }, 6);
        const fl = rect(g, d.x, d.y, 0, 12, { fill: K(d.tone || "teal") }, 6);
        if (d.need != null) {
          const tx = d.x + d.w * d.need / d.total;
          line(g, tx, d.y - 4, tx, d.y + 16, { stroke: "var(--ink)", strokeWidth: 2 });
          if (d.needLabel) txt(g, tx, d.y + 30, d.needLabel, "tick");
        }
        const n = { g, d, fl, val, type: "meter", value: 0 };
        S.nodes[id] = n;
        setMeter(n, d.value || 0);
      }
    };

    function setBar(n, interest) {
      const sc = S.scene.scale, base = S.scene.base, p = n.d.principal;
      n.interest = interest;
      const ph = p * sc, ih = interest * sc;
      n.pr.setAttribute("y", base - ph); n.pr.setAttribute("height", ph);
      n.ir.setAttribute("y", base - ph - ih); n.ir.setAttribute("height", Math.max(ih, 0));
      n.ir.style.display = ih < 0.5 ? "none" : "";
      n.val.setAttribute("y", base - ph - ih - 10);
      n.val.textContent = (n.d.prefix ?? "$") + Math.round(p + interest).toLocaleString("en-US") + (n.d.suffix || "");
    }
    function setMeter(n, v) {
      n.value = v;
      n.fl.setAttribute("width", n.d.w * Math.min(v, n.d.total) / n.d.total);
      n.val.textContent = n.d.format ? n.d.format.replace("{v}", Math.round(v)).replace("{total}", n.d.total) : `${Math.round(v)} of ${n.d.total}`;
    }

    function anchor(d, side, off) {
      const cx = d.x + d.w / 2, cy = d.y + d.h / 2;
      return { t: [cx + off, d.y], b: [cx + off, d.y + d.h], l: [d.x, cy + off], r: [d.x + d.w, cy + off] }[side];
    }
    function autoSides(a, b) {
      const dx = (b.x + b.w / 2) - (a.x + a.w / 2), dy = (b.y + b.h / 2) - (a.y + a.h / 2);
      if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? ["r", "l"] : ["l", "r"];
      return dy > 0 ? ["b", "t"] : ["t", "b"];
    }
    function arrowPath(a) {
      if (a.d) return a.d;
      const A = S.nodes[a.from].bx, B = S.nodes[a.to].bx;
      const [s1, s2] = a.sides || autoSides(A, B);
      const [o1, o2] = a.off || [0, 0];
      const p1 = anchor(A, s1, o1), p2 = anchor(B, s2, o2);
      const k = Math.min(80, Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) * 0.4);
      const c1 = [p1[0] + DIR[s1][0] * k, p1[1] + DIR[s1][1] * k];
      const c2 = [p2[0] + DIR[s2][0] * k, p2[1] + DIR[s2][1] * k];
      return `M${p1} C${c1} ${c2} ${p2}`;
    }
    function drawArrow(id, a) {
      const g = el("g", {}, S.layers.edges); g.style.opacity = 0;
      const p = el("path", { d: arrowPath(a), class: a.dashed ? "edge dashed-edge" : "edge" }, g);
      let lab = null;
      if (a.label) lab = txt(g, a.label.x, a.label.y, a.label.text, "elabel");
      S.arrows[id] = { g, p, lab };
    }

    // Each scene lives in its own root group, so two scenes can overlap during a transition.
    function buildScene(i) {
      const scene = clip.scenes[i];
      const root = el("g", {}, svg);
      root.style.transformOrigin = "400px 225px";
      S = { idx: i, scene, root, nodes: {}, arrows: {},
            layers: { back: el("g", {}, root), edges: el("g", {}, root), mid: el("g", {}, root), nodes: el("g", {}, root), top: el("g", {}, root), tokens: el("g", {}, root) } };
      for (const [id, d] of Object.entries(scene.elements)) draw[d.type](id, d);
      for (const [id, a] of Object.entries(scene.arrows || {})) drawArrow(id, a);
      for (const [id, d] of Object.entries(scene.elements)) if (d.visible) showOne(id, true);
      for (const [id, a] of Object.entries(scene.arrows || {})) if (a.visible) showOne(id, true);
    }

    async function enterScene(i) {
      const old = S.root;
      buildScene(i);
      const neu = S.root;
      if (reduce) { old.remove(); return; }
      const kind = S.scene.enter || "fade";
      let a1, a2;
      if (kind === "zoom") {
        // zoomInto: the point in the old scene the camera dives into (e.g. one leaf).
        const z = S.scene.zoomInto;
        if (z) old.style.transformOrigin = `${z[0]}px ${z[1]}px`;
        a1 = old.animate([{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: `scale(${z ? 3 : 1.18})` }], { duration: z ? 750 : 550, easing: "ease-in", fill: "forwards" });
        a2 = neu.animate([{ opacity: 0, transform: "scale(.88)" }, { opacity: 1, transform: "scale(1)" }], { duration: 600, delay: z ? 400 : 250, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
      } else if (kind === "slide") {
        a1 = old.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: "translateX(-120px)" }], { duration: 500, easing: "ease-in", fill: "forwards" });
        a2 = neu.animate([{ opacity: 0, transform: "translateX(120px)" }, { opacity: 1, transform: "translateX(0)" }], { duration: 550, delay: 200, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
      } else {
        a2 = neu.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: "ease-out" });
        a1 = old.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 250, fill: "forwards" });
      }
      await Promise.all([a1.finished, a2.finished]).catch(() => {});
      old.remove();
    }

    /* ---------- actions ---------- */
    async function drawIn(p, ms) {
      const len = p.getTotalLength();
      const an = p.animate([{ strokeDasharray: `${len} ${len}`, strokeDashoffset: len }, { strokeDasharray: `${len} ${len}`, strokeDashoffset: 0 }],
        { duration: ms, easing: "ease-in-out" });
      await an.finished.catch(() => {});
    }
    async function showArrow(id, instant) {
      const A = S.arrows[id];
      A.g.style.opacity = 1;
      if (instant || reduce) { A.p.setAttribute("marker-end", "url(#head)"); return; }
      if (A.lab) A.lab.style.opacity = 0;
      await drawIn(A.p, 550);
      A.p.setAttribute("marker-end", "url(#head)");
      if (A.lab) { A.lab.style.opacity = 1; A.lab.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 }); }
    }
    async function showNode(id, instant) {
      const n = S.nodes[id];
      const target = n.target ?? 1;
      n.g.style.opacity = target;
      if (instant || reduce) return;
      if (n.type === "path" && !n.d.dashed) return drawIn(n.p, n.d.drawMs || 700);
      const an = n.g.animate([{ opacity: 0, transform: `${n.off ? `translate(${n.off[0]}px,${n.off[1]}px) ` : ""}translateY(10px)` },
                              { opacity: target, transform: n.off ? `translate(${n.off[0]}px,${n.off[1]}px)` : "none" }],
        { duration: 450, easing: "cubic-bezier(.2,.7,.2,1)" });
      await an.finished.catch(() => {});
    }
    const showOne = (id, instant) => S.arrows[id] ? showArrow(id, instant) : showNode(id, instant);
    async function show(ids, instant, stagger) {
      if (stagger && !instant && !reduce) {
        const jobs = [];
        for (const id of ids) { jobs.push(showOne(id, false)); await wait(stagger); }
        return Promise.all(jobs);
      }
      return Promise.all(ids.map(id => showOne(id, instant)));
    }
    async function hide(ids, instant) {
      await Promise.all(ids.map(async id => {
        const n = S.arrows[id] || S.nodes[id];
        if (instant || reduce) { n.g.style.opacity = 0; return; }
        const from = getComputedStyle(n.g).opacity;
        const an = n.g.animate([{ opacity: from }, { opacity: 0 }], { duration: 400, easing: "ease-out" });
        n.g.style.opacity = 0;
        await an.finished.catch(() => {});
      }));
    }

    async function pulse(id) {
      if (reduce) return;
      if (S.arrows[id]) {
        // arrows flash by briefly thickening
        await S.arrows[id].p.animate([{ strokeWidth: 2 }, { strokeWidth: 6 }, { strokeWidth: 2 }], { duration: 800, easing: "ease-in-out" }).finished.catch(() => {});
        return;
      }
      const n = S.nodes[id];
      const [ox, oy] = n.off || [0, 0];
      let h, grow = 1.1;
      if (n.halo) {
        const [cx, cy, r, gr] = n.halo;
        h = el("circle", { cx: cx + ox, cy: cy + oy, r, class: "halo" }, S.layers.top);
        grow = gr;
      } else {
        let x, y, w, hh, pad;
        if (n.bx) ({ x, y, w, h: hh } = n.bx), pad = n.type === "art" ? 8 : 0;
        else { const bb = n.g.getBBox(); x = bb.x; y = bb.y; w = bb.width; hh = bb.height; pad = 4; }
        h = el("rect", { x: x + ox - pad, y: y + oy - pad, width: w + pad * 2, height: hh + pad * 2, rx: 14, class: "halo" }, S.layers.top);
      }
      h.style.stroke = K(n.d.tone || (n.type === "art" ? "sky" : "amber"));
      const an = h.animate([{ transform: "scale(1)", opacity: .8 }, { transform: `scale(${grow})`, opacity: 0 }], { duration: 900, easing: "ease-out" });
      await an.finished.catch(() => {});
      h.remove();
    }

    // Numbers each one-unit step along a grid route: 1, 2, 3...
    async function tick(t, instant) {
      const n = S.nodes[t.path], pts = n.d.pts, units = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const [a, b] = [pts[i], pts[i + 1]];
        const sx = Math.sign(b[0] - a[0]), sy = Math.sign(b[1] - a[1]);
        const len = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
        for (let u = 0; u < len; u++) units.push([a[0] + sx * (u + .5), a[1] + sy * (u + .5)]);
      }
      const tn = t.tone || n.d.tone, my = runId;
      for (let i = 0; i < units.length; i++) {
        if (my !== runId) return;
        const [x, y] = G(units[i]);
        const g = el("g", { transform: `translate(${x},${y})` }, S.layers.top);
        circ(g, 0, 0, 11, { fill: F(tn), stroke: K(tn), strokeWidth: 2 });
        txt(g, 0, 4, String(i + 1), "badge-text");
        if (!instant && !reduce) {
          g.animate([{ opacity: 0, transform: `translate(${x}px,${y}px) scale(.3)` }, { opacity: 1, transform: `translate(${x}px,${y}px) scale(1)` }], { duration: 260, easing: "ease-out" });
          await wait(200);
        }
      }
    }

    function barTop(id) {
      const n = S.nodes[id];
      return [n.d.x + n.d.w / 2, S.scene.base - (n.d.principal + n.interest) * S.scene.scale - 30];
    }
    async function flow(f) {
      let path;
      if (f.along) path = (S.arrows[f.along] || S.nodes[f.along]).p;
      else {
        const [x1, y1] = barTop(f.from), [x2, y2] = barTop(f.to);
        path = el("path", { d: `M${x1},${y1} Q${(x1 + x2) / 2},${Math.min(y1, y2) - 60} ${x2},${y2}`, fill: "none" }, S.layers.tokens);
      }
      const count = reduce ? 1 : (f.count || 1);
      const dur = f.dur || (f.along ? 1200 : 1000);
      const jobs = [];
      for (let i = 0; i < count; i++) jobs.push(wait(i * (f.gap || 300)).then(() => moveToken(path, f, dur)));
      await Promise.all(jobs);
      if (!f.along) path.remove();
    }
    function moveToken(path, f, dur) {
      const my = runId, layer = S.layers.tokens;
      return new Promise(res => {
        const g = el("g", {}, layer);
        if (f.art) {
          // an illustration travelling along the path, centred on it
          const A = CC.ART[f.art], s = f.s || .5;
          A.draw(el("g", { transform: `scale(${s}) translate(${-A.w / 2},${-A.h / 2})` }, g), { tone: f.tone, ...(f.artProps || {}) });
        } else if (f.icon === "doc") {
          shape(g, "M-12,-15 H5 L12,-8 V15 H-12 Z", { fill: "var(--paper)", stroke: K(f.tone || "grey"), strokeWidth: 2.5 });
          docLines(g, -7, 7, [-4, 2, 8]);
        } else {
          const t = txt(g, 0, 4.5, f.token, "tok-text");
          const w = t.getComputedTextLength() + 20;
          const r = el("rect", { x: -w / 2, y: -12, width: w, height: 24, rx: 12 }, null);
          sty(r, { fill: F(f.tone || "grey"), stroke: K(f.tone || "grey"), strokeWidth: 1.5 });
          g.insertBefore(r, t);
        }
        const len = path.getTotalLength(), t0 = performance.now();
        function frame(now) {
          if (my !== runId) { g.remove(); return res(); }
          const k = Math.min(1, (now - t0) / dur);
          const p = path.getPointAtLength(ease(k) * len);
          g.setAttribute("transform", `translate(${p.x},${p.y})`);
          g.style.opacity = k < .1 ? k / .1 : k > .9 ? (1 - k) / .1 : 1;
          if (k < 1) requestAnimationFrame(frame); else { g.remove(); res(); }
        }
        requestAnimationFrame(frame);
      });
    }

    function tween(dur, step) {
      const my = runId, t0 = performance.now();
      return new Promise(res => {
        function frame(now) {
          if (my !== runId) return res();
          const k = Math.min(1, (now - t0) / dur);
          step(k);
          if (k < 1) requestAnimationFrame(frame); else res();
        }
        requestAnimationFrame(frame);
      });
    }
    function tweenBar(b, instant) {
      const n = S.nodes[b.id];
      if (instant || reduce) return setBar(n, b.interest);
      const from = n.interest;
      return tween(700, k => setBar(n, from + (b.interest - from) * (1 - Math.pow(1 - k, 3))));
    }
    function tweenMeter(m, instant) {
      const n = S.nodes[m.id];
      if (instant || reduce) return setMeter(n, m.value);
      const from = n.value;
      return tween(m.dur || 1000, k => setMeter(n, from + (m.value - from) * (1 - Math.pow(1 - k, 3))));
    }

    // Moves an element: to a new top-left (to), by an offset (by), or along a track (along).
    function centre(n) {
      if (n.bx) return [n.bx.x + n.bx.w / 2, n.bx.y + n.bx.h / 2];
      if (n.c) return n.c;
      if (n.halo) return [n.halo[0], n.halo[1]];
      const bb = n.g.getBBox();
      return [bb.x + bb.width / 2, bb.y + bb.height / 2];
    }
    function setOff(n, o) { n.off = o; n.g.setAttribute("transform", `translate(${o[0]},${o[1]})`); }
    function move(m, instant) {
      const n = S.nodes[m.id], from = n.off || [0, 0];
      let target, along = null;
      if (m.along) {
        along = S.nodes[m.along].p;
        const [cx, cy] = centre(n), L = along.getTotalLength(), e = along.getPointAtLength(L);
        target = [e.x - cx, e.y - cy];
        if (instant || reduce) return setOff(n, target);
        return tween(m.dur || 1500, k => { const p = along.getPointAtLength(ease(k) * L); setOff(n, [p.x - cx, p.y - cy]); });
      }
      if (m.to) { const [x0, y0] = n.bx ? [n.bx.x, n.bx.y] : centre(n); target = [m.to[0] - x0, m.to[1] - y0]; }
      else target = [from[0] + m.by[0], from[1] + m.by[1]];
      if (instant || reduce) return setOff(n, target);
      return tween(m.dur || 1000, k => { const e = ease(k); setOff(n, [from[0] + (target[0] - from[0]) * e, from[1] + (target[1] - from[1]) * e]); });
    }
    async function setText(t, instant) {
      const n = S.nodes[t.id];
      n.t.textContent = t.text;
      if (!instant && !reduce) await n.t.animate([{ opacity: .2 }, { opacity: 1 }], { duration: 350 }).finished.catch(() => {});
    }

    function apply(a, instant) {
      if (a.all) return Promise.all(a.all.map(x => apply(x, instant)));
      if (a.show) return show(a.show, instant, a.stagger);
      if (a.hide) return hide(a.hide, instant);
      if (a.move) return move(a.move, instant);
      if (a.text) return setText(a.text, instant);
      if (a.bar) return tweenBar(a.bar, instant);
      if (a.meter) return tweenMeter(a.meter, instant);
      if (a.tick) return tick(a.tick, instant);
      if (instant) return;
      if (a.flow) return flow(a.flow);
      if (a.pulse) return pulse(a.pulse);
      if (a.wait) return wait(a.wait);
    }

    /* ---------- public API ---------- */
    function load(topic) {
      clip = topic;
      FLAT = [];
      clip.scenes.forEach((sc, si) => sc.steps.forEach(step => FLAT.push({ scene: si, step })));
    }
    // Draws the state after step k (k = -1: the first scene before any step), with no animation.
    function rebuild(k) {
      runId++;
      svg.replaceChildren();
      const defs = el("defs", {}, svg);
      const m = el("marker", { id: "head", viewBox: "0 0 10 10", refX: "9", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto-start-reverse" }, defs);
      el("path", { d: "M0,0 L10,5 L0,10 z", class: "head" }, m);
      const si = k < 0 ? 0 : FLAT[k].scene;
      buildScene(si);
      for (let i = 0; i <= k; i++) if (FLAT[i].scene === si) for (const a of FLAT[i].step.do) apply(a, true);
    }
    // Animates step k on top of the current state; resolves false if interrupted.
    async function runStep(k) {
      const my = runId;
      if (FLAT[k].scene !== S.idx) {
        await enterScene(FLAT[k].scene);
        if (my !== runId) return false;
      }
      for (const a of FLAT[k].step.do) {
        if (my !== runId) return false;
        await apply(a, false);
      }
      return my === runId;
    }

    return {
      load, rebuild, runStep,
      cancel() { runId++; },
      get version() { return runId; },
      get flat() { return FLAT; },
      get clip() { return clip; },
      get scene() { return S; }
    };
  };

  /* ---------- validation: catches mistakes in topic files before anything is drawn ---------- */
  const TYPES = ["grid", "path", "circle", "point", "box", "art", "bar", "text", "axis", "trend", "track", "ring", "callout", "meter"];
  const ACTIONS = ["all", "show", "hide", "move", "text", "bar", "meter", "tick", "flow", "pulse", "wait"];
  const ENTERS = ["fade", "zoom", "slide"];
  CC.validate = function (t) {
    const errs = [];
    const where = `${t.level}.${t.section}.${t.id}`;
    const e = m => errs.push(`${where}: ${m}`);
    if (!/^[a-z0-9-]+$/.test(t.id || "")) e("id must be lowercase letters, digits and dashes");
    if (!CC.catalog.levels.some(l => l.id === t.level)) e(`unknown level "${t.level}"`);
    if (!CC.catalog.sections.some(s => s.id === t.section)) e(`unknown section "${t.section}"`);
    if (!t.title) e("missing title");
    if (!t.summary) e("missing summary");
    else if (t.summary.length > 140) e("summary is longer than 140 characters");
    if (!Array.isArray(t.scenes) || !t.scenes.length) { e("needs at least one scene"); return errs; }
    if (t.scenes.length > 6) e("more than 6 scenes");
    let steps = 0;
    t.scenes.forEach((sc, si) => {
      const s = `scene ${si + 1}`;
      if (!sc.title) e(`${s}: missing title`);
      if (sc.enter && !ENTERS.includes(sc.enter)) e(`${s}: enter must be one of ${ENTERS.join(", ")}`);
      if (si === 0 && sc.enter) e(`${s}: the first scene can't have an enter transition`);
      const els = sc.elements || {}, arrows = sc.arrows || {};
      const has = id => id in els || id in arrows;
      for (const [id, d] of Object.entries(els)) {
        if (!TYPES.includes(d.type)) { e(`${s}: element "${id}" has unknown type "${d.type}"`); continue; }
        if (d.type === "art" && !CC.ART[d.kind]) e(`${s}: element "${id}" uses unknown illustration "${d.kind}"`);
        if ((d.type === "bar" || d.type === "trend") && (sc.scale == null || sc.base == null)) e(`${s}: "${id}" needs scene.scale and scene.base`);
        if (id in arrows) e(`${s}: "${id}" is both an element and an arrow`);
      }
      for (const [id, a] of Object.entries(arrows)) {
        if (!a.d && (!els[a.from] || !els[a.to])) e(`${s}: arrow "${id}" needs from/to elements or a d path`);
        else if (!a.d && (!["box", "art"].includes(els[a.from].type) || !["box", "art"].includes(els[a.to].type))) e(`${s}: arrow "${id}" can only connect box or art elements; use d for anything else`);
      }
      if (!Array.isArray(sc.steps) || !sc.steps.length) { e(`${s}: needs at least one step`); return; }
      sc.steps.forEach((st, k) => {
        steps++;
        const w = `${s} step ${k + 1}`;
        if (!st.caption) e(`${w}: missing caption`);
        else if (st.caption.split(/\s+/).length > 40) e(`${w}: caption is over 40 words`);
        const check = a => {
          // "stagger" is an option of show, not an action of its own
          const keys = Object.keys(a).filter(k => !(k === "stagger" && "show" in a));
          if (keys.length !== 1 || !ACTIONS.includes(keys[0])) return e(`${w}: unknown action ${JSON.stringify(a)}`);
          const v = a[keys[0]];
          const need = (id, what) => { if (!has(id)) e(`${w}: ${what} refers to missing "${id}"`); };
          switch (keys[0]) {
            case "all": v.forEach(check); break;
            case "show": case "hide": v.forEach(id => need(id, keys[0])); break;
            case "pulse": need(v, "pulse"); break;
            case "flow": if (v.along) need(v.along, "flow"); else { need(v.from, "flow"); need(v.to, "flow"); }
              if (v.art && !CC.ART[v.art]) e(`${w}: flow uses unknown illustration "${v.art}"`);
              if (!v.art && v.icon !== "doc" && !v.token) e(`${w}: flow needs token text, icon: "doc", or art`); break;
            case "move": need(v.id, "move"); if (v.along) need(v.along, "move"); if (!v.along && !v.to && !v.by) e(`${w}: move needs to, by, or along`); break;
            case "bar": case "meter": case "text": need(v.id, keys[0]); break;
            case "tick": need(v.path, "tick"); break;
          }
        };
        (st.do || []).forEach(check);
        if (!Array.isArray(st.do)) e(`${w}: missing do list`);
      });
    });
    if (steps > 24) e(`${steps} steps in total; keep a topic to 24 or fewer`);
    return errs;
  };
})();
