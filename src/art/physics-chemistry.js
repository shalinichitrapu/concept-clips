// physics-chemistry illustrations. Names start with "phys.".
(() => {
  const { el, line, shape, rect, circ, ellipse, txt, F, K, STONE } = CC;
  const R = (t, w = 2.5) => ({ fill: F(t), stroke: K(t), strokeWidth: w, strokeLinejoin: "round" });
  const STROKE = (t, w = 2.5) => ({ fill: "none", stroke: K(t), strokeWidth: w, strokeLinecap: "round", strokeLinejoin: "round" });
  const rad = a => a * Math.PI / 180;
  const WIRE = { stroke: K("grey"), strokeWidth: 4, strokeLinecap: "round" };

  // A Bohr-model atom: nucleus with its symbol, electron shells as rings, electrons as dots.
  // d.shells: electrons per shell, e.g. [2, 8, 1]. d.rings: rings to draw (default: shells.length).
  // d.angles: optional per-shell list of electron angles in degrees (0 = right, 90 = down).
  // d.slots / d.skip: spread a shell's electrons over `slots` positions and leave index `skip` empty.
  // d.charge: "+" or "−" badge for an ion.
  const RADII = [22, 42, 62];
  function atom(g, cx, cy, d, nucR) {
    const t = d.tone || "grey", shells = d.shells || [], n = d.rings ?? shells.length;
    for (let i = 0; i < n; i++) circ(g, cx, cy, RADII[i], { fill: "none", stroke: "var(--muted)", strokeWidth: 1.5, opacity: .7 });
    circ(g, cx, cy, nucR, R(t, 2));
    txt(g, cx, cy + 5, d.symbol || "", "atom");
    shells.forEach((count, i) => {
      let angs = d.angles && d.angles[i];
      if (!angs) {
        const slots = (d.slots && d.slots[i]) || count, skip = d.skip ? d.skip[i] : -1, start = (d.start && d.start[i]) ?? -90;
        angs = [];
        for (let k = 0; k < slots && angs.length < count; k++) if (k !== skip) angs.push(start + k * 360 / slots);
      }
      angs.forEach(a => circ(g, cx + RADII[i] * Math.cos(rad(a)), cy + RADII[i] * Math.sin(rad(a)), 5, { fill: "var(--ink)", stroke: "var(--canvas)", strokeWidth: 1.5 }));
    });
    if (d.charge) {
      const r = RADII[Math.max(n, 1) - 1] + 16, bx = cx + r * Math.cos(rad(-45)), by = cy + r * Math.sin(rad(-45));
      circ(g, bx, by, 12, R("amber", 2));
      txt(g, bx, by + 5, d.charge, "atom");
    }
  }

  // Person in the core style, leaning by deg (+ = forward, to the right) with one arm reaching to (hx, hy).
  function leaner(g, d, deg, hx, hy) {
    const t = d.tone || "violet", st = { fill: F(t), stroke: K(t), strokeWidth: 2 };
    const a = rad(deg), dx = 28 - 20, dy = 38 - 68;
    const sx = 30 + dx * Math.cos(a) - dy * Math.sin(a), sy = 98 + dx * Math.sin(a) + dy * Math.cos(a);
    const p = el("g", { transform: `translate(10,30) rotate(${deg} 20 68)` }, g);
    circ(p, 20, 13, 11, st);
    shape(p, "M3,68 V44 C3,32 10,27 20,27 C30,27 37,32 37,44 V68 Z", st);
    line(g, sx, sy, hx, hy, { stroke: K(t), strokeWidth: 7, strokeLinecap: "round" });
    circ(g, hx, hy, 4.5, st);
  }

  // A light bulb in a holder. d.state: "off", "dim", "on" or "empty" (holder only).
  // Wires join at (0,108) and (100,108).
  function bulb(g, d) {
    const st = d.state || "off";
    line(g, 0, 108, 30, 108, WIRE);
    line(g, 70, 108, 100, 108, WIRE);
    rect(g, 28, 100, 44, 16, STONE, 4);
    if (st === "empty") {
      shape(g, "M38,86 L37,72 A28,28 0 1 1 63,72 L62,86", { fill: "none", stroke: "var(--muted)", strokeWidth: 2, strokeDasharray: "4 5", strokeLinecap: "round" });
      rect(g, 38, 90, 24, 10, { ...STONE, fill: "var(--canvas)" }, 2);
      return;
    }
    if (st === "on" || st === "dim") {
      const n = st === "on" ? 9 : 3, r1 = 34, r2 = st === "on" ? 46 : 38;
      for (let i = 0; i < n; i++) {
        const a = rad(160 + i * 220 / (n - 1));
        line(g, 50 + r1 * Math.cos(a), 46 + r1 * Math.sin(a), 50 + r2 * Math.cos(a), 46 + r2 * Math.sin(a),
          { stroke: K("yellow"), strokeWidth: 3, strokeLinecap: "round", opacity: st === "on" ? 1 : .6 });
      }
    }
    const lit = st !== "off";
    const glass = "M38,86 L37,72 A28,28 0 1 1 63,72 L62,86 Z";
    shape(g, glass, { fill: "var(--canvas)", stroke: "none" });
    shape(g, glass, lit
      ? { fill: F("yellow"), fillOpacity: st === "dim" ? .3 : 1, stroke: K("yellow"), strokeWidth: 2.5, strokeLinejoin: "round" }
      : { fill: "none", stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" });
    const fil = { fill: "none", stroke: lit ? K("amber") : K("grey"), strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
    shape(g, "M44,86 L44,52 M56,86 L56,52", fil);
    shape(g, "M44,52 l2,-5 l2,5 l2,-5 l2,5 l2,-5 l2,5", { ...fil, strokeWidth: 2.5 });
    rect(g, 38, 84, 24, 16, STONE, 2);
    line(g, 38, 89, 62, 91, { stroke: "var(--stone-s)", strokeWidth: 1.2 });
    line(g, 38, 94, 62, 96, { stroke: "var(--stone-s)", strokeWidth: 1.2 });
  }

  const sine = (x0, x1, y0, A, L) => {
    let d = "";
    for (let x = x0; x <= x1; x += 2) d += (d ? " L" : "M") + `${x},${(y0 - A * Math.sin(2 * Math.PI * (x - x0) / L)).toFixed(1)}`;
    return d;
  };

  const defs = {
    "phys.ice": { w: 100, h: 100, draw(g) {
      const st = { fill: F("sky"), stroke: K("sky"), strokeWidth: 2.5, strokeLinejoin: "round" };
      shape(g, "M8,30 L50,50 L50,94 L8,74 Z", st);
      shape(g, "M50,50 L92,30 L92,74 L50,94 Z", { ...st, fillOpacity: .6 });
      shape(g, "M50,8 L92,30 L50,50 L8,30 Z", { ...st, fillOpacity: .3 });
      shape(g, "M20,42 L20,62 M30,48 L30,56", { fill: "none", stroke: "var(--canvas)", strokeWidth: 3, strokeLinecap: "round" });
    } },
    "phys.glass": { w: 90, h: 120, draw(g) {
      shape(g, "M12.5,40 L77.5,40 L72,114 L18,114 Z", { fill: F("blue") });
      line(g, 12.5, 40, 77.5, 40, { stroke: K("blue"), strokeWidth: 2.5 });
      shape(g, "M10,6 L18,114 L72,114 L80,6", STROKE("grey"));
      line(g, 22, 54, 25, 98, { stroke: "var(--canvas)", strokeWidth: 3, strokeLinecap: "round", opacity: .8 });
    } },
    "phys.kettle": { w: 165, h: 150, draw(g) {
      const st = { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" };
      ["M146,64 C136,52 156,42 146,28 C138,18 152,10 148,2", "M130,60 C122,50 138,42 130,30", "M160,58 C154,48 164,42 159,32"]
        .forEach(p => shape(g, p, STROKE("sky", 3)));
      shape(g, "M48,76 C48,38 102,38 102,76", STROKE("grey", 6));
      shape(g, "M116,104 L144,70 L154,76 L124,124 Z", st);
      shape(g, "M28,144 C20,112 30,84 50,74 L100,74 C120,84 130,112 122,144 Z", st);
      ellipse(g, 75, 74, 30, 6, st);
      circ(g, 75, 64, 5, st);
      rect(g, 22, 140, 106, 8, st, 4);
    } },
    // A container seen from the side, for particle pictures.
    "phys.box": { w: 200, h: 180, draw(g, d) {
      rect(g, 3, 3, 194, 174, { fill: F(d.tone || "grey"), fillOpacity: .35, stroke: K(d.tone || "grey"), strokeWidth: 2.5 }, 14);
    } },
    // A battery; the + end is on the right. Wires join at (0,25) and (130,25).
    "phys.battery": { w: 130, h: 50, draw(g) {
      line(g, 0, 25, 10, 25, WIRE);
      line(g, 120, 25, 130, 25, WIRE);
      rect(g, 112, 16, 10, 18, R("grey", 2), 3);
      rect(g, 8, 6, 106, 38, R("grey"), 7);
      rect(g, 74, 6, 40, 38, R("amber"), 7);
      rect(g, 74, 7.25, 12, 35.5, { fill: F("amber"), stroke: "none" });
      line(g, 74, 7.5, 74, 42.5, { stroke: K("amber"), strokeWidth: 2 });
      txt(g, 98, 31, "+", "atom");
      txt(g, 34, 31, "−", "atom");
    } },
    "phys.bulb": { w: 100, h: 120, draw(g, d) { bulb(g, d); } },
    // A knife switch. d.open raises the lever. Wires join at (0,40) and (100,40).
    "phys.switch": { w: 100, h: 56, draw(g, d) {
      line(g, 0, 40, 16, 40, WIRE);
      line(g, 84, 40, 100, 40, WIRE);
      rect(g, 6, 44, 88, 10, STONE, 4);
      const ex = d.open ? 16 + 66 * Math.cos(rad(32)) : 84, ey = d.open ? 40 - 66 * Math.sin(rad(32)) : 40;
      circ(g, 84, 40, 5, R("grey", 2));
      line(g, 16, 40, ex, ey, { stroke: K("violet"), strokeWidth: 6, strokeLinecap: "round" });
      circ(g, 16, 40, 5, R("grey", 2));
    } },
    // Tug-of-war and pushing figures facing right (flip to face left). Hands at (72,68) / (76,50).
    "phys.puller": { w: 80, h: 100, draw(g, d) { leaner(g, d, -20, 72, 68); } },
    "phys.pusher": { w: 80, h: 100, draw(g, d) { leaner(g, d, 22, 76, 50); } },
    "phys.ribbon": { w: 24, h: 36, draw(g) { shape(g, "M7,3 L17,3 L21,33 L12,26 L3,33 Z", R("red", 2)); } },
    "phys.crate": { w: 100, h: 100, draw(g) {
      rect(g, 4, 4, 92, 92, R("amber"), 5);
      rect(g, 14, 14, 72, 72, { fill: "none", stroke: K("amber"), strokeWidth: 2 }, 2);
      line(g, 16, 84, 84, 16, { stroke: K("amber"), strokeWidth: 2.5 });
    } },
    // A shopping cart pushed from the left. d.load: 0 (empty), 1 (a few items) or 2 (full).
    "phys.cart": { w: 140, h: 110, draw(g, d) {
      const load = d.load || 0;
      if (load >= 2) {
        rect(g, 98, 2, 14, 30, R("green", 2), 5);
        rect(g, 56, 0, 24, 30, R("teal", 2), 3);
        rect(g, 112, 12, 20, 22, R("violet", 2), 3);
      }
      if (load >= 1) {
        rect(g, 38, 10, 30, 24, R("amber", 2), 3);
        rect(g, 74, 16, 26, 18, R("red", 2), 3);
      }
      const wire = { fill: "none", stroke: K("grey"), strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" };
      shape(g, "M4,18 L18,18 L30,30", { ...wire, strokeWidth: 4 });
      shape(g, "M30,30 L136,30 L122,78 L40,78 Z", { ...wire, fill: F("grey"), fillOpacity: .6 });
      for (const x of [56, 80, 104]) line(g, x, 30, x - 2, 78, { stroke: K("grey"), strokeWidth: 1.2, opacity: .7 });
      line(g, 35, 54, 129, 54, { stroke: K("grey"), strokeWidth: 1.2, opacity: .7 });
      shape(g, "M40,78 L36,92 L128,92", wire);
      circ(g, 46, 100, 8, R("grey"));
      circ(g, 118, 100, 8, R("grey"));
    } },
    "phys.shaker": { w: 80, h: 120, draw(g) {
      rect(g, 12, 60, 56, 54, { fill: "var(--paper)", stroke: "none" }, 8);
      line(g, 12, 60, 68, 60, { stroke: "var(--paper-ink)", strokeWidth: 1.5, strokeDasharray: "2 4", strokeLinecap: "round" });
      for (const [x, y] of [[20, 68], [34, 72], [50, 67], [26, 84], [42, 88], [55, 82], [19, 99], [36, 102], [52, 99]])
        rect(g, x, y, 6, 6, { fill: "none", stroke: "var(--paper-ink)", strokeWidth: 1.3 }, 1);
      rect(g, 10, 34, 60, 82, { fill: "none", stroke: K("grey"), strokeWidth: 2.5 }, 10);
      shape(g, "M10,36 L15,8 C15,4 65,4 65,8 L70,36 Z", { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" });
      for (const [x, y] of [[28, 18], [40, 15], [52, 18], [34, 26], [46, 26]]) circ(g, x, y, 2.5, { fill: K("grey") });
      line(g, 18, 44, 18, 52, { stroke: K("grey"), strokeWidth: 2.5, strokeLinecap: "round", opacity: .5 });
    } },
    // Sodium chloride: Na⁺ (small, teal) and Cl⁻ (large, green) ions alternating in a grid.
    "phys.lattice": { w: 160, h: 160, draw(g) {
      for (let i = 0; i < 4; i++) {
        line(g, 20, 20 + i * 40, 140, 20 + i * 40, { stroke: "var(--muted)", strokeWidth: 1.5, opacity: .6 });
        line(g, 20 + i * 40, 20, 20 + i * 40, 140, { stroke: "var(--muted)", strokeWidth: 1.5, opacity: .6 });
      }
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        const na = (i + j) % 2 === 0, x = 20 + i * 40, y = 20 + j * 40;
        circ(g, x, y, na ? 10 : 16, R(na ? "teal" : "green", 2));
        txt(g, x, y + (na ? 4 : 5), na ? "+" : "−", "atom-sm");
      }
    } },
    "phys.atom": { w: 150, h: 150, draw(g, d) { atom(g, 75, 75, d, 16); } },
    "phys.atomSmall": { w: 60, h: 60, draw(g, d) { atom(g, 30, 30, d, 12); } },
    "phys.speaker": { w: 90, h: 120, draw(g) {
      rect(g, 4, 4, 82, 112, R("grey"), 8);
      circ(g, 45, 30, 11, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 2 });
      circ(g, 45, 78, 30, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 2.5 });
      circ(g, 45, 78, 19, { fill: F("grey"), stroke: K("grey"), strokeWidth: 1.5 });
      circ(g, 45, 78, 7, R("grey", 2));
    } },
    "phys.stopwatch": { w: 70, h: 80, draw(g) {
      rect(g, 29, 2, 12, 8, R("grey", 2), 2);
      line(g, 35, 10, 35, 18, { stroke: K("grey"), strokeWidth: 3 });
      circ(g, 35, 48, 30, { fill: "var(--paper)", stroke: K("grey"), strokeWidth: 3 });
      for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6;
        line(g, 35 + 23 * Math.cos(a), 48 + 23 * Math.sin(a), 35 + 27 * Math.cos(a), 48 + 27 * Math.sin(a), { stroke: "var(--paper-ink)", strokeWidth: 1.5 });
      }
      line(g, 35, 48, 35, 26, { stroke: K("red"), strokeWidth: 2.5, strokeLinecap: "round" });
      circ(g, 35, 48, 3, { fill: K("red") });
    } },
    // A short wave icon; d.len sets the wavelength in px.
    "phys.waveIcon": { w: 120, h: 50, draw(g, d) { shape(g, sine(4, 116, 25, 16, d.len || 56), STROKE(d.tone || "sky", 3)); } }
  };

  // Force arrows sized by strength: "phys.arrow20" ... "phys.arrow400" (length in px, every 5 px).
  // d.tone colours it; flip: true points it left.
  for (let L = 20; L <= 400; L += 5) {
    defs[`phys.arrow${L}`] = { w: L, h: 30, draw(g, d) {
      const t = d.tone || "amber", hl = Math.min(20, L * .45);
      shape(g, `M2,10 L${L - hl},10 L${L - hl},2 L${L - 2},15 L${L - hl},28 L${L - hl},20 L2,20 Z`, R(t, 2.5));
    } };
  }

  CC.art(defs);
})();
