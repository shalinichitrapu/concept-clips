// math illustrations. Names start with "math.".
(() => {
  const { line, shape, rect, circ, txt, F, K, STONE, WINDOW } = CC;
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
    } }
  });
})();
