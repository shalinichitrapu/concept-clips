// Concept Clips core: the shared namespace, SVG drawing helpers, and the registries
// that illustration files (src/art) and topic files (content/topics) add themselves to.
window.CC = (() => {
  const NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const sty = (e, st) => (Object.assign(e.style, st), e);

  // Theme colours come from CSS tokens, so every drawing works in light and dark mode.
  // tone("green", "f") is the soft fill, tone("green", "s") the strong stroke.
  const tone = (t, k) => `var(--${t}-${k})`;
  const F = t => tone(t, "f"), K = t => tone(t, "s");

  const line = (g, x1, y1, x2, y2, st) => sty(el("line", { x1, y1, x2, y2 }, g), st);
  const shape = (g, d, st) => sty(el("path", { d }, g), st);
  const rect = (g, x, y, width, height, st, rx = 0) => sty(el("rect", { x, y, width, height, rx }, g), st);
  const circ = (g, cx, cy, r, st) => sty(el("circle", { cx, cy, r }, g), st);
  const ellipse = (g, cx, cy, rx, ry, st) => sty(el("ellipse", { cx, cy, rx, ry }, g), st);
  const txt = (g, x, y, s, cls, anchor = "middle") => {
    const t = el("text", { x, y, "text-anchor": anchor, class: cls }, g);
    t.textContent = s;
    return t;
  };

  function wrap(s, n) {
    const out = [];
    let cur = "";
    for (const w of s.split(" ")) {
      if (cur && (cur + " " + w).length > n) { out.push(cur); cur = w; }
      else cur = cur ? cur + " " + w : w;
    }
    if (cur) out.push(cur);
    return out;
  }

  // Shared material styles for illustrations.
  const STONE = { fill: "var(--stone)", stroke: "var(--stone-s)", strokeWidth: 1.5 };
  const PAPER = { fill: "var(--paper)", stroke: "var(--paper-ink)", strokeWidth: 2 };
  const WINDOW = { fill: "var(--window)", stroke: "var(--stone-s)", strokeWidth: .8 };
  const docLines = (g, x1, x2, ys) =>
    ys.forEach(y => line(g, x1, y, x2, y, { stroke: "var(--paper-ink)", strokeWidth: 1.5, opacity: .55 }));

  const ART = {};
  const topics = [];

  return {
    NS, el, sty, tone, F, K, line, shape, rect, circ, ellipse, txt, wrap,
    STONE, PAPER, WINDOW, docLines,
    ART, topics,
    // Default coordinate grid used by grid, point, path and circle elements.
    GRID: { x0: 60, y0: 60, cell: 50, cols: 8, rows: 6 },
    art(defs) {
      for (const k in defs) {
        if (ART[k]) console.error(`Illustration "${k}" is defined twice`);
        ART[k] = defs[k];
      }
    },
    topic(t) { topics.push(t); }
  };
})();
