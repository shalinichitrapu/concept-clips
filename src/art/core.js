// Shared illustrations any section can use, plus the section icons on the home page.
// Each drawing has a native size (w x h); scenes place it with x, y and an optional scale s.
(() => {
  const { el, line, shape, rect, circ, ellipse, txt, F, K, PAPER, docLines } = CC;
  const DROP = "M0,-9 C4,-3 7,1 7,4 A7,7 0 0 1 -7,4 C-7,1 -4,-3 0,-9 Z";
  const atom = (g, x, y, s, t) => { circ(g, x, y, 14, { fill: F(t), stroke: K(t), strokeWidth: 2 }); txt(g, x, y + 5, s, "atom"); };

  CC.art({
    sun: { w: 80, h: 80, draw(g) {
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        line(g, 40 + Math.cos(a) * 29, 40 + Math.sin(a) * 29, 40 + Math.cos(a) * 38, 40 + Math.sin(a) * 38,
          { stroke: K("yellow"), strokeWidth: 4, strokeLinecap: "round" });
      }
      circ(g, 40, 40, 22, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 3 });
    } },
    cloud: { w: 140, h: 80, draw(g, d) {
      shape(g, "M25,72 C4,72 2,46 22,41 C20,18 50,8 64,24 C74,6 110,10 111,35 C133,35 139,70 116,72 Z",
        { fill: F(d.tone || "grey"), stroke: K(d.tone || "grey"), strokeWidth: 2.5 });
      if (d.text) txt(g, 70, 56, d.text, "atom");
    } },
    soil: { w: 800, h: 130, draw(g, d) {
      rect(g, 0, 0, 800, 130, { fill: "var(--soil-f)" });
      line(g, 0, 1, 800, 1, { stroke: "var(--soil-s)", strokeWidth: 2.5 });
      (d.drops || []).forEach(([x, y]) =>
        shape(el("g", { transform: `translate(${x},${y})` }, g), DROP, { fill: F("blue"), stroke: K("blue"), strokeWidth: 1.5 }));
    } },
    drop: { w: 44, h: 56, draw(g) {
      shape(g, "M22,4 C30,18 40,28 40,38 A18,18 0 0 1 4,38 C4,28 14,18 22,4 Z", { fill: F("blue"), stroke: K("blue"), strokeWidth: 2.5 });
      shape(g, "M13,38 C13,32 15,28 18,25", { fill: "none", stroke: "var(--canvas)", strokeWidth: 2.5, strokeLinecap: "round", opacity: .8 });
    } },
    // Molecules: atoms drawn as labelled circles.
    co2: { w: 92, h: 36, draw(g) { atom(g, 18, 18, "O", "red"); atom(g, 46, 18, "C", "grey"); atom(g, 74, 18, "O", "red"); } },
    o2: { w: 64, h: 36, draw(g) { atom(g, 18, 18, "O", "red"); atom(g, 46, 18, "O", "red"); } },
    h2o: { w: 64, h: 52, draw(g) { atom(g, 32, 18, "O", "red"); atom(g, 13, 37, "H", "blue"); atom(g, 51, 37, "H", "blue"); } },
    glucose: { w: 70, h: 64, draw(g) {
      const pts = [...Array(6)].map((_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${35 + 30 * Math.cos(a)},${32 + 30 * Math.sin(a)}`; });
      CC.sty(el("polygon", { points: pts.join(" ") }, g), { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5 });
      txt(g, 35, 36, "C₆H₁₂O₆", "atom-sm");
    } },
    // A generic document; d.title sets its heading (e.g. "RECEIPT", "LETTER").
    doc: { w: 70, h: 90, draw(g, d) {
      shape(g, "M4,4 H50 L66,20 V86 H4 Z", PAPER);
      shape(g, "M50,4 V20 H66", { ...PAPER, fill: "none" });
      if (d.title) txt(g, 12, 32, d.title, "doc-title", "start");
      docLines(g, 12, 58, [44, 54, 64, 74]);
    } },
    person: { w: 40, h: 70, draw(g, d) {
      const t = d.tone || "grey";
      circ(g, 20, 13, 11, { fill: F(t), stroke: K(t), strokeWidth: 2 });
      shape(g, "M3,68 V44 C3,32 10,27 20,27 C30,27 37,32 37,44 V68 Z", { fill: F(t), stroke: K(t), strokeWidth: 2 });
    } },
    coin: { w: 40, h: 40, draw(g) {
      circ(g, 20, 20, 17, { fill: "var(--seal-f)", stroke: "var(--seal-s)", strokeWidth: 2.5 });
      circ(g, 20, 20, 11, { fill: "none", stroke: "var(--seal-s)", strokeWidth: 1.5 });
      txt(g, 20, 25, "$", "atom");
    } },
    globe: { w: 80, h: 80, draw(g) {
      circ(g, 40, 40, 34, { fill: F("sky"), stroke: K("sky"), strokeWidth: 2.5 });
      const land = { fill: F("green"), stroke: K("green"), strokeWidth: 2 };
      shape(g, "M22,22 C30,16 40,20 38,30 C36,38 26,36 24,46 C22,54 14,48 13,40 C12,32 16,26 22,22 Z", land);
      shape(g, "M48,40 C56,36 66,42 64,52 C62,62 52,68 46,60 C42,54 42,44 48,40 Z", land);
    } },

    // Section icons for the home page (80 x 80).
    "icon.math": { w: 80, h: 80, draw(g) {
      for (let i = 0; i <= 4; i++) {
        line(g, 8 + i * 16, 8, 8 + i * 16, 72, { stroke: "var(--gridline)", strokeWidth: 1.5 });
        line(g, 8, 8 + i * 16, 72, 8 + i * 16, { stroke: "var(--gridline)", strokeWidth: 1.5 });
      }
      shape(g, "M16,64 H32 V48 H48 V32 H64 V16", { fill: "none", stroke: K("yellow"), strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" });
      circ(g, 16, 64, 6, { fill: K("violet") }); circ(g, 64, 16, 6, { fill: K("violet") });
    } },
    "icon.biology": { w: 80, h: 80, draw(g) {
      shape(g, "M40,74 C40,56 38,40 40,26", { fill: "none", stroke: K("green"), strokeWidth: 4, strokeLinecap: "round" });
      shape(g, "M40,48 C30,30 12,30 8,36 C14,50 30,54 40,48 Z", { fill: F("green"), stroke: K("green"), strokeWidth: 2.5 });
      shape(g, "M40,36 C48,16 66,12 72,18 C68,34 52,42 40,36 Z", { fill: F("green"), stroke: K("green"), strokeWidth: 2.5 });
    } },
    "icon.physics-chemistry": { w: 80, h: 80, draw(g) {
      for (const r of [0, 60, 120]) ellipse(el("g", { transform: `rotate(${r} 40 40)` }, g), 40, 40, 34, 12, { fill: "none", stroke: K("violet"), strokeWidth: 2.5 });
      circ(g, 40, 40, 8, { fill: F("violet"), stroke: K("violet"), strokeWidth: 2.5 });
      circ(g, 74, 40, 4.5, { fill: K("violet") }); circ(g, 23, 69, 4.5, { fill: K("violet") });
    } },
    "icon.earth-science": { w: 80, h: 80, draw(g) { CC.ART.globe.draw(g, {}); } },
    "icon.computer-science": { w: 80, h: 80, draw(g) {
      rect(g, 6, 12, 68, 44, { fill: F("teal"), stroke: K("teal"), strokeWidth: 2.5 }, 5);
      txt(g, 40, 40, "1010", "atom");
      line(g, 40, 56, 40, 66, { stroke: K("teal"), strokeWidth: 3 });
      line(g, 24, 68, 56, 68, { stroke: K("teal"), strokeWidth: 3, strokeLinecap: "round" });
    } },
    "icon.history": { w: 80, h: 80, draw(g) {
      rect(g, 14, 14, 52, 52, PAPER, 2);
      docLines(g, 22, 58, [30, 40, 50]);
      rect(g, 8, 8, 64, 10, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2 }, 5);
      rect(g, 8, 62, 64, 10, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2 }, 5);
    } },
    "icon.civics": { w: 80, h: 80, draw(g) {
      const s = el("g", { transform: "translate(2,22) scale(.38)" }, g);
      if (CC.ART["civics.capitolMini"]) CC.ART["civics.capitolMini"].draw(s, {});
    } },
    "icon.personal-finance": { w: 80, h: 80, draw(g) {
      for (let i = 0; i < 4; i++) {
        const y = 62 - i * 11;
        rect(g, 16, y, 48, 8, { fill: "var(--seal-f)", stroke: "var(--seal-s)", strokeWidth: 1.5 });
        ellipse(g, 40, y, 24, 6, { fill: "var(--seal-f)", stroke: "var(--seal-s)", strokeWidth: 1.5 });
      }
      ellipse(g, 40, 70, 24, 6, { fill: "none", stroke: "var(--seal-s)", strokeWidth: 1.5 });
    } }
  });
})();
