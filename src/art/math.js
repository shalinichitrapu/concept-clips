// math illustrations. Names start with "math.".
(() => {
  const { el, line, shape, rect, circ, txt, F, K, STONE, PAPER, WINDOW } = CC;
  const P = (x, y) => `${x.toFixed(2)},${y.toFixed(2)}`;

  // Slices of a disc centred at (cx, cy), cut along n lines starting at angle 0 (3 o'clock).
  function cuts(g, cx, cy, r, n, style) {
    for (let i = 0; i < n; i++) {
      const a = i * 2 * Math.PI / n;
      line(g, cx, cy, cx + r * Math.cos(a), cy - r * Math.sin(a), style);
    }
  }

  // One half of a pizza unrolled into a row of thin slices standing side by side.
  // n slices of a pizza with radius r; dir "down" = crust on top and points down, "up" = the reverse.
  function comb(g, d) {
    const n = d.n || 8, r = d.r || 86, t = d.tone || "amber";
    const bw = Math.PI * r / n, up = d.dir === "up";
    const yb = up ? r + 3 : 3, ya = up ? 3 : r + 3, sweep = up ? 0 : 1;
    for (let i = 0; i < n; i++) {
      const x0 = 2 + i * bw, x1 = x0 + bw, xa = x0 + bw / 2;
      // the crust edge is a short arc of the circle, bulging outward
      shape(g, `M${P(xa, ya)} L${P(x0, yb)} A${r},${r} 0 0 ${sweep} ${P(x1, yb)} Z`,
        { fill: F(t), stroke: K(t), strokeWidth: 2, strokeLinejoin: "round" });
      shape(g, `M${P(x0, yb)} A${r},${r} 0 0 ${sweep} ${P(x1, yb)}`,
        { fill: "none", stroke: K(t), strokeWidth: 5, strokeLinecap: "round" });
    }
  }

  CC.art({
    // A chocolate bar cut into d.parts equal pieces; the first d.shaded pieces are the share you take.
    "math.chocBar": { w: 360, h: 60, draw(g, d) {
      const n = d.parts || 1, k = d.shaded || 0, pw = 356 / n;
      for (let i = 0; i < n; i++) {
        const x = 2 + i * pw, on = i < k;
        rect(g, x, 2, pw, 56, { fill: on ? K("amber") : F("amber"), stroke: K("amber"), strokeWidth: 2 }, 5);
        rect(g, x + 5, 7, pw - 10, 46, { fill: "none", stroke: on ? "var(--canvas)" : K("amber"), strokeWidth: 1.5, opacity: on ? .45 : .5 }, 3);
      }
    } },
    // A number line from 0 to 1, split into d.parts equal steps (0 sits at x 10, 1 at x 370).
    "math.numberLine": { w: 380, h: 24, draw(g, d) {
      const n = d.parts || 1, S = { stroke: K("grey"), strokeWidth: 2.5, strokeLinecap: "round" };
      line(g, 10, 12, 370, 12, S);
      for (let i = 0; i <= n; i++) {
        const x = 10 + i * 360 / n, e = i === 0 || i === n;
        line(g, x, e ? 1 : 5, x, e ? 23 : 19, S);
      }
    } },
    // A pizza (r = 86) with d.cuts slices. With d.halves the top half is amber and the bottom half teal.
    "math.pizza": { w: 180, h: 180, draw(g, d) {
      const C = 90, cutStyle = { stroke: "var(--canvas)", strokeWidth: 3.5, strokeLinecap: "round" };
      if (d.halves) {
        shape(g, "M4,90 A86,86 0 0 1 176,90 Z", { fill: F("amber"), stroke: K("amber"), strokeWidth: 5, strokeLinejoin: "round" });
        shape(g, "M4,90 A86,86 0 0 0 176,90 Z", { fill: F("teal"), stroke: K("teal"), strokeWidth: 5, strokeLinejoin: "round" });
        cuts(g, C, C, 84, d.cuts || 16, cutStyle);
        return;
      }
      circ(g, C, C, 86, { fill: F("amber"), stroke: K("amber"), strokeWidth: 3 });
      circ(g, C, C, 73, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 2 });
      [[62, 58], [112, 52], [130, 98], [96, 92], [56, 116], [100, 136], [72, 84], [138, 64], [40, 88], [118, 118]]
        .forEach(([x, y]) => circ(g, x, y, 8, { fill: F("red"), stroke: K("red"), strokeWidth: 2 }));
      if (d.cuts) cuts(g, C, C, 88, d.cuts, cutStyle);
    } },
    // Half a pizza unrolled: 8 slices side by side (r = 86, so the row is half the circumference, about 270 wide).
    "math.combDown": { w: 275, h: 92, draw(g, d) { comb(g, { ...d, dir: "down" }); } },
    "math.combUp": { w: 275, h: 92, draw(g, d) { comb(g, { ...d, dir: "up" }); } },

    // A brick wall, 50 x 320.
    "math.wall": { w: 50, h: 320, draw(g) {
      rect(g, 2, 2, 46, 316, { fill: F("red"), stroke: K("red"), strokeWidth: 2.5 }, 2);
      const M = { stroke: K("red"), strokeWidth: 1.2, opacity: .55 };
      for (let y = 22, row = 0; y < 318; y += 20, row++) {
        line(g, 3, y, 47, y, M);
        for (let x = row % 2 ? 12 : 25; x < 47; x += 26) line(g, x, y - 20, x, y, M);
      }
    } },
    // A strip of ground, 440 x 36.
    "math.ground": { w: 440, h: 36, draw(g) {
      rect(g, 0, 2, 440, 34, { fill: "var(--soil-f)" });
      line(g, 0, 2, 440, 2, { stroke: "var(--soil-s)", strokeWidth: 3 });
    } },
    // A wooden ladder leaning right: its centre line runs from (10, 290) to (220, 10), with 9 rungs.
    "math.ladder": { w: 232, h: 300, draw(g) {
      const ux = .6, uy = -.8, px = .8 * 9, py = .6 * 9;
      const R = { stroke: K("amber"), strokeWidth: 5, strokeLinecap: "round" };
      for (let i = 1; i < 10; i++) {
        const cx = 10 + ux * 35 * i, cy = 290 + uy * 35 * i;
        line(g, cx - px, cy - py, cx + px, cy + py, { ...R, strokeWidth: 3.5 });
      }
      line(g, 10 - px, 290 - py, 220 - px, 10 - py, R);
      line(g, 10 + px, 290 + py, 220 + px, 10 + py, R);
    } },
    // A right triangle with legs 3 and 4 (unit u = 34) and, by d.part, one of its squares:
    // "tri", "a" (on the side of 3), "b" (on the side of 4) or "c" (on the hypotenuse), tiled with unit squares.
    "math.pythag": { w: 376, h: 342, draw(g, d) {
      const u = 34, C = [137, 239], A = [239, 239], B = [137, 103];
      const sq = (o, e1, e2, n, t) => {
        const at = (i, j) => [o[0] + (e1[0] * i + e2[0] * j) * u, o[1] + (e1[1] * i + e2[1] * j) * u];
        const cs = [at(0, 0), at(n, 0), at(n, n), at(0, n)];
        shape(g, "M" + cs.map(p => P(...p)).join(" L") + " Z", { fill: F(t), stroke: K(t), strokeWidth: 2.5, strokeLinejoin: "round" });
        for (let i = 1; i < n; i++) {
          line(g, ...at(i, 0), ...at(i, n), { stroke: K(t), strokeWidth: 1.2, opacity: .6 });
          line(g, ...at(0, i), ...at(n, i), { stroke: K(t), strokeWidth: 1.2, opacity: .6 });
        }
      };
      if (d.part === "a") sq(C, [1, 0], [0, 1], 3, "blue");
      else if (d.part === "b") sq(C, [0, -1], [-1, 0], 4, "amber");
      else if (d.part === "c") sq(A, [-.6, -.8], [.8, -.6], 5, "violet");
      else {
        shape(g, `M${C} L${A} L${B} Z`, { fill: F("grey"), stroke: K("grey"), strokeWidth: 3, strokeLinejoin: "round" });
        shape(g, `M${C[0]},${C[1] - 14} H${C[0] + 14} V${C[1]}`, { fill: "none", stroke: K("grey"), strokeWidth: 2 });
      }
    } },

    // A wheelchair ramp up to a porch, drawn to scale: run 360, rise 30 (1 : 12).
    "math.ramp": { w: 440, h: 190, draw(g) {
      rect(g, 380, 10, 58, 148, STONE);
      rect(g, 396, 100, 30, 58, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2 }, 2);
      circ(g, 420, 130, 2.5, { fill: K("amber") });
      rect(g, 360, 158, 80, 30, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5 }, 2);
      shape(g, "M2,188 L360,158 L360,188 Z", { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" });
      const R = { stroke: K("grey"), strokeWidth: 2.5, strokeLinecap: "round" };
      for (const x of [40, 160, 280, 356]) line(g, x, 188 - x / 12, x, 150 - x / 12, R);
      line(g, 40, 150 - 40 / 12, 356, 150 - 356 / 12, { ...R, strokeWidth: 3.5 });
    } },
    // A road climbing a 6% grade, drawn to scale: run 600, rise 36.
    "math.road": { w: 610, h: 64, draw(g) {
      shape(g, "M2,62 L602,26 L602,62 Z", { fill: "var(--soil-f)", stroke: "var(--soil-s)", strokeWidth: 2, strokeLinejoin: "round" });
      line(g, 2, 58, 602, 22, { stroke: K("grey"), strokeWidth: 9, strokeLinecap: "round" });
      line(g, 2, 58, 602, 22, { stroke: "var(--canvas)", strokeWidth: 1.5, strokeDasharray: "12 10" });
    } },
    // A yellow warning sign for a steep hill with a grade plaque (d.text, default "6%").
    "math.gradeSign": { w: 80, h: 140, draw(g, d) {
      line(g, 40, 60, 40, 138, { stroke: K("grey"), strokeWidth: 4, strokeLinecap: "round" });
      shape(g, "M40,4 L74,38 L40,72 L6,38 Z", { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 3, strokeLinejoin: "round" });
      shape(g, "M22,48 L58,30 L58,48 Z", { fill: "var(--ink)", opacity: .8 });
      rect(g, 14, 80, 52, 26, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 2.5 }, 3);
      txt(g, 40, 98, d.text || "6%", "atom");
    } },
    // A small car, 60 x 34.
    "math.car": { w: 60, h: 34, draw(g) {
      shape(g, "M4,24 V17 C4,14 6,13 9,13 L16,12 L23,4 H41 L49,12 C55,13 57,15 57,19 V24 Z",
        { fill: F("violet"), stroke: K("violet"), strokeWidth: 2.5, strokeLinejoin: "round" });
      shape(g, "M25,8 H39 L44,13 H20 Z", WINDOW);
      circ(g, 16, 25, 6, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 3 });
      circ(g, 45, 25, 6, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 3 });
    } },

    // A Ferris wheel: hub at (170, 170), rim radius 150, 12 seats, on an A-frame stand.
    "math.ferrisWheel": { w: 340, h: 392, draw(g) {
      const H = 170, R = 150, S = { stroke: K("grey"), strokeLinecap: "round" };
      line(g, H, H, 64, 386, { ...S, strokeWidth: 6 });
      line(g, H, H, 276, 386, { ...S, strokeWidth: 6 });
      line(g, 20, 388, 320, 388, { ...S, strokeWidth: 3 });
      for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6;
        line(g, H, H, H + R * Math.cos(a), H - R * Math.sin(a), { ...S, strokeWidth: 1.5, opacity: .7 });
      }
      circ(g, H, H, R, { fill: "none", stroke: K("grey"), strokeWidth: 3.5 });
      circ(g, H, H, R - 12, { fill: "none", stroke: K("grey"), strokeWidth: 1.5, opacity: .7 });
      for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6, x = H + R * Math.cos(a), y = H - R * Math.sin(a);
        rect(g, x - 8, y - 7, 16, 14, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2 }, 4);
      }
      circ(g, H, H, 11, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5 });
    } },
    // The seat we follow, 34 x 34.
    "math.gondola": { w: 34, h: 34, draw(g) {
      rect(g, 3, 4, 28, 26, { fill: F("violet"), stroke: K("violet"), strokeWidth: 3 }, 7);
      rect(g, 9, 10, 16, 9, WINDOW, 2);
    } },

    // A cloth bag, 70 x 84, with d.text (default "x") on its front. Closed, it's tied at the neck;
    // with d.open its mouth is open and what it holds shows: marbles, or blocks if d.holds is "blocks".
    "math.bag": { w: 70, h: 84, draw(g, d) {
      const t = d.tone || "violet", S = { fill: F(t), stroke: K(t), strokeWidth: 2.5, strokeLinejoin: "round" };
      if (d.open) {
        shape(g, "M12,30 C0,46 2,80 20,82 H50 C68,80 70,46 58,30 Z", S);
        const I = { fill: F("teal"), stroke: K("teal"), strokeWidth: 2 };
        if (d.holds === "blocks") [[15, 18], [28, 18], [41, 18], [28, 6]].forEach(([x, y]) => rect(g, x, y, 13, 13, I, 2));
        else [[22, 25], [35, 25], [48, 25], [35, 13]].forEach(([x, y]) => circ(g, x, y, 7, I));
        shape(g, "M10,30 C22,36 48,36 60,30", { fill: "none", stroke: K(t), strokeWidth: 3, strokeLinecap: "round" });
      } else {
        shape(g, "M18,30 C2,44 2,80 20,82 H50 C68,80 68,44 52,30 Z", S);
        shape(g, "M24,28 L14,8 C26,13 44,13 56,8 L46,28 Z", S);
        rect(g, 20, 25, 30, 7, { fill: K(t), stroke: K(t), strokeWidth: 1.5 }, 3);
      }
      const s = el("g", { transform: "translate(35,68) scale(1.7)" }, g);
      txt(s, 0, 0, d.text || "x", "atom");
    } },
    // A single marble, 26 x 26.
    "math.marble": { w: 26, h: 26, draw(g, d) {
      const t = d.tone || "teal";
      circ(g, 13, 13, 11, { fill: F(t), stroke: K(t), strokeWidth: 2.5 });
      shape(g, "M8,11 C8,8 10,7 12,6.5", { fill: "none", stroke: "var(--canvas)", strokeWidth: 2.5, strokeLinecap: "round", opacity: .85 });
    } },
    // A small weight block, 28 x 28. Every block weighs the same.
    "math.block": { w: 28, h: 28, draw(g, d) {
      const t = d.tone || "teal";
      rect(g, 2, 2, 24, 24, { fill: F(t), stroke: K(t), strokeWidth: 2.5 }, 4);
      line(g, 8, 8, 14, 8, { stroke: "var(--canvas)", strokeWidth: 2.5, strokeLinecap: "round", opacity: .85 });
    } },
    // A balance scale, 540 x 250, with its pans on top. The beam pivots at (270, 150) and its ends
    // are 175 from the pivot. Level, each pan's top is at y 80, from x 0 to 190 and from 350 to 540.
    // d.tilt (degrees) raises the left pan by 175 × sin(tilt) and lowers the right pan by the same.
    "math.balance": { w: 540, h: 250, draw(g, d) {
      const a = (d.tilt || 0) * Math.PI / 180, cx = 270, cy = 150, L = 175, dy = L * Math.sin(a);
      const G = { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" };
      shape(g, "M270,146 L304,236 H236 Z", G);
      rect(g, 180, 234, 180, 14, G, 5);
      [[cx - L, -dy], [cx + L, dy]].forEach(([ex, o]) => {
        line(g, ex, 92 + o, ex, cy + o, { stroke: K("grey"), strokeWidth: 6, strokeLinecap: "round" });
        shape(g, `M${P(ex - 95, 80 + o)} H${(ex + 95).toFixed(2)} L${P(ex + 84, 92 + o)} H${(ex - 84).toFixed(2)} Z`, G);
      });
      line(g, cx - L * Math.cos(a), cy - dy, cx + L * Math.cos(a), cy + dy, { stroke: K("grey"), strokeWidth: 8, strokeLinecap: "round" });
      circ(g, cx, cy, 6, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 3 });
    } },

    // A paper triangle with its three corners torn off (the pieces are math.corner).
    // Corners at A (10, 215), B (310, 215), C (214.6, 10.4): angles 45°, 65° and 70°.
    "math.tornTriangle": { w: 330, h: 230, draw(g, d) {
      const V = d.pts || [[10, 215], [310, 215], [214.595, 10.405]], r = d.r || 64;
      const pts = [];
      V.forEach((v, i) => {
        const [a0, a1] = cornerSpan(V, i);
        pts.push(...tear(v[0], v[1], r, a0, a1).reverse());
      });
      shape(g, "M" + pts.map(p => P(...p)).join(" L") + " Z", { ...PAPER, strokeWidth: 2.5, strokeLinejoin: "round" });
    } },
    // One torn corner of a paper triangle, 150 x 150, with its point at the centre (75, 75).
    // It spans the angles d.a0 to d.a1 (degrees, counterclockwise from 3 o'clock) and shows d.text.
    "math.corner": { w: 150, h: 150, draw(g, d) {
      const r = d.r || 64, t = d.tone || "red", a0 = d.a0 || 0, a1 = d.a1 ?? 60;
      const pts = [[75, 75], ...tear(75, 75, r, a0, a1)];
      shape(g, "M" + pts.map(p => P(...p)).join(" L") + " Z", { fill: F(t), stroke: K(t), strokeWidth: 2.5, strokeLinejoin: "round" });
      if (d.text) {
        const m = (a0 + a1) / 2 * Math.PI / 180, k = d.tr || .62;
        const s = el("g", { transform: `translate(${P(75 + r * k * Math.cos(m), 75 - r * k * Math.sin(m) + 6)}) scale(1.3)` }, g);
        txt(s, 0, 0, d.text, "atom");
      }
    } },
    // A triangle, 320 x 240, with corners d.pts (counterclockwise) and each angle shaded in its
    // tone (d.tones). d.right is the index of a right angle, drawn as a small square.
    "math.triangle": { w: 320, h: 240, draw(g, d) {
      const V = d.pts, tones = d.tones || ["red", "blue", "amber"], r = d.r || 34, R = Math.PI / 180;
      shape(g, "M" + V.map(p => P(...p)).join(" L") + " Z", { fill: F("grey"), stroke: "none" });
      V.forEach((v, i) => {
        const [a0, a1] = cornerSpan(V, i), t = tones[i];
        const st = { fill: F(t), stroke: K(t), strokeWidth: 2, strokeLinejoin: "round" };
        const at = (a, k) => [v[0] + k * Math.cos(a * R), v[1] - k * Math.sin(a * R)];
        if (i === d.right) {
          const q = 20, u = at(a0, q), w = at(a1, q);
          shape(g, `M${P(...v)} L${P(...u)} L${P(u[0] + w[0] - v[0], u[1] + w[1] - v[1])} L${P(...w)} Z`, st);
        } else {
          shape(g, `M${P(...v)} L${P(...at(a0, r))} A${r},${r} 0 0 0 ${P(...at(a1, r))} Z`, st);
        }
      });
      shape(g, "M" + V.map(p => P(...p)).join(" L") + " Z", { fill: "none", stroke: K("grey"), strokeWidth: 3, strokeLinejoin: "round" });
    } },

    // A tall pine tree, 120 x 250: its tip is at (60, 4) and its trunk stands on y 250.
    "math.tree": { w: 120, h: 250, draw(g) {
      rect(g, 51, 196, 18, 54, { fill: "var(--root)", stroke: "var(--soil-s)", strokeWidth: 2 }, 2);
      const S = { fill: F("green"), stroke: K("green"), strokeWidth: 2.5, strokeLinejoin: "round" };
      shape(g, "M60,96 L116,204 H4 Z", S);
      shape(g, "M60,46 L104,140 H16 Z", S);
      shape(g, "M60,4 L92,80 H28 Z", S);
    } }
  });

  // Angles (degrees, counterclockwise from 3 o'clock, y up) of the two sides at corner i of a
  // triangle whose corners V go counterclockwise on screen: from the side to the next corner
  // round to the side to the previous one.
  function cornerSpan(V, i) {
    const v = V[i], nx = V[(i + 1) % 3], pv = V[(i + 2) % 3];
    const ang = p => Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180 / Math.PI;
    let a0 = ang(nx), a1 = ang(pv);
    if (a0 < 0) a0 += 360;
    while (a1 < a0) a1 += 360;
    return [a0, a1];
  }
  // Points along a torn, zigzag edge of radius r around (cx, cy) from angle a0 to a1 (degrees,
  // counterclockwise from 3 o'clock). The pieces and the torn triangle share it, so they fit together.
  function tear(cx, cy, r, a0, a1) {
    const n = Math.max(4, Math.round((a1 - a0) / 7)), pts = [];
    for (let i = 0; i <= n; i++) {
      const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180, rr = i === 0 || i === n ? r : r + (i % 2 ? 4 : -3);
      pts.push([cx + rr * Math.cos(a), cy - rr * Math.sin(a)]);
    }
    return pts;
  }
})();
