// Biology illustrations. Names start with "bio.".
(() => {
  const { el, line, shape, rect, circ, ellipse, F, K } = CC;

  function leaf(g, x, y, rot, L) {
    const lg = el("g", { transform: `translate(${x},${y}) rotate(${rot})` }, g);
    shape(lg, `M0,0 C${.25 * L},${-.3 * L} ${.75 * L},${-.3 * L} ${L},0 C${.75 * L},${.3 * L} ${.25 * L},${.3 * L} 0,0 Z`,
      { fill: F("green"), stroke: K("green"), strokeWidth: 2.5 });
    line(lg, 0, 0, .88 * L, 0, { stroke: K("green"), strokeWidth: 1.5 });
  }
  function chloro(g, x, y, r) {
    const c = el("g", { transform: `translate(${x},${y}) rotate(${r})` }, g);
    ellipse(c, 0, 0, 24, 12, { fill: "var(--chloro)", stroke: K("green"), strokeWidth: 2 });
    [-11, 0, 11].forEach(dx => rect(c, dx - 3, -6, 6, 12, { fill: K("green"), opacity: .55 }, 2));
  }

  CC.art({
    "bio.plant": { w: 200, h: 300, draw(g) {
      const R = { fill: "none", stroke: "var(--root)", strokeWidth: 3, strokeLinecap: "round" };
      ["M100,200 C98,230 92,250 76,285", "M100,200 C104,232 112,252 130,290", "M100,200 C100,240 101,265 100,298",
       "M93,248 C83,253 73,255 62,262", "M108,246 C120,250 131,251 144,258"].forEach(d => shape(g, d, R));
      shape(g, "M100,202 C98,160 104,110 100,40", { fill: "none", stroke: K("green"), strokeWidth: 6, strokeLinecap: "round" });
      leaf(g, 100, 165, 200, 70); leaf(g, 101, 98, 198, 62); leaf(g, 100, 64, -40, 52); leaf(g, 100, 42, -95, 28); leaf(g, 100, 130, -20, 90);
    } },
    "bio.plantCell": { w: 420, h: 300, draw(g) {
      rect(g, 4, 4, 412, 292, { fill: F("green"), stroke: K("green"), strokeWidth: 4 }, 34);
      rect(g, 14, 14, 392, 272, { fill: "none", stroke: K("green"), strokeWidth: 1.5, opacity: .6 }, 26);
      rect(g, 120, 70, 200, 150, { fill: F("sky"), stroke: K("sky"), strokeWidth: 2 }, 50);
      circ(g, 340, 90, 32, { fill: F("violet"), stroke: K("violet"), strokeWidth: 2 });
      circ(g, 348, 84, 9, { fill: K("violet"), opacity: .45 });
      [[62, 58, -15], [48, 140, 85], [62, 228, 25], [140, 262, 0], [160, 40, -8], [255, 38, 6], [318, 262, -18], [372, 250, 10]]
        .forEach(([x, y, r]) => chloro(g, x, y, r));
    } },
    "bio.chloroplast": { w: 56, h: 32, draw(g) { chloro(g, 28, 16, 0); } },
    "bio.chloroplastBig": { w: 380, h: 220, draw(g) {
      ellipse(g, 190, 110, 186, 106, { fill: F("green"), stroke: K("green"), strokeWidth: 3 });
      ellipse(g, 190, 110, 175, 95, { fill: "none", stroke: K("green"), strokeWidth: 1.5, opacity: .6 });
      const stacks = [[110, 95], [185, 70], [255, 105], [160, 150], [240, 160]];
      [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4]].forEach(([a, b]) =>
        line(g, ...stacks[a], ...stacks[b], { stroke: K("green"), strokeWidth: 2, opacity: .5 }));
      stacks.forEach(([x, y]) => {
        for (let i = 0; i < 5; i++) rect(g, x - 20, y - 22 + i * 9, 40, 8, { fill: "var(--chloro)", stroke: K("green"), strokeWidth: 1.5 }, 4);
      });
    } }
  });
})();

// Cells, food chains, the heart, DNA and the immune system.
(() => {
  const { el, line, shape, rect, circ, ellipse, txt, F, K } = CC;
  const S = (t, w = 2.5) => ({ fill: F(t), stroke: K(t), strokeWidth: w, strokeLinejoin: "round" });
  const ln = (t, w = 2) => ({ fill: "none", stroke: K(t), strokeWidth: w, strokeLinecap: "round", strokeLinejoin: "round" });

  // A mitochondrion: a bean with folded inner membrane.
  function mito(g, x, y, r = 0, s = 1) {
    const m = el("g", { transform: `translate(${x},${y}) rotate(${r}) scale(${s})` }, g);
    ellipse(m, 0, 0, 17, 9, S("amber", 2));
    shape(m, "M-11,0 L-7,-5 L-3,4 L1,-5 L5,4 L9,-4 L12,0", ln("amber", 1.5));
  }
  function chloro(g, x, y, r) {
    const c = el("g", { transform: `translate(${x},${y}) rotate(${r})` }, g);
    ellipse(c, 0, 0, 18, 9, { fill: "var(--chloro)", stroke: K("green"), strokeWidth: 2 });
    [-8, 0, 8].forEach(dx => rect(c, dx - 2.5, -4.5, 5, 9, { fill: K("green"), opacity: .55 }, 2));
  }
  // Three bases of DNA or RNA on a backbone. back: "top" or "bottom" (the side the backbone is on).
  const BASE = { A: "green", T: "red", U: "amber", G: "violet", C: "blue" };
  function bases(g, x, y, seq, back) {
    const ty = back === "bottom" ? y + 2 : y + 10, by = back === "bottom" ? y + 32 : y + 2;
    rect(g, x, by, 90, 6, { fill: K("grey") }, 3);
    [...seq].forEach((b, i) => {
      rect(g, x + i * 30 + 2, ty, 26, 28, S(BASE[b] || "grey", 2), 5);
      txt(g, x + i * 30 + 15, ty + 19, b, "atom");
    });
  }
  // A spike protein pointing up from (0,0): a stalk with a rounded head.
  function spike(g, x, y, rot, s = 1) {
    const k = el("g", { transform: `translate(${x},${y}) rotate(${rot}) scale(${s})` }, g);
    line(k, 0, 0, 0, -12, { stroke: K("amber"), strokeWidth: 3, strokeLinecap: "round" });
    circ(k, 0, -20, 9, S("amber", 2));
  }
  // A Y-shaped receptor or antibody pointing up from (0,0); cup: "v" (cradles a spike's head), "square" or "flat".
  function receptor(g, x, y, rot, tone, cup = "v", w = 3) {
    const k = el("g", { transform: `translate(${x},${y}) rotate(${rot})` }, g);
    const st = ln(tone, w);
    line(k, 0, 0, 0, -10, st);
    if (cup === "v") shape(k, "M-11,-26 L0,-10 L11,-26", st);
    else if (cup === "square") shape(k, "M-9,-26 L-9,-10 L9,-10 L9,-26", st);
    else shape(k, "M-11,-10 L11,-10 M-11,-10 L-11,-16 M11,-10 L11,-16", st);
  }
  function nucleus(g, x, y, r) {
    circ(g, x, y, r, S("violet", 2.5));
    circ(g, x + r * .25, y - r * .2, r * .3, { fill: K("violet"), opacity: .45 });
  }

  CC.art({
    // A single leaf with its stalk.
    "bio.leaf": { w: 150, h: 90, draw(g, d) {
      const t = d.tone || "green";
      shape(g, "M30,45 C55,5 120,0 146,44 C120,88 55,85 30,45 Z", S(t));
      shape(g, "M4,52 C14,49 22,47 30,45 L138,44", ln(t, 2.5));
      [[60, 45, 74, 22], [85, 45, 100, 18], [110, 44, 122, 24], [60, 45, 74, 68], [85, 45, 100, 70], [110, 44, 122, 64]]
        .forEach(([a, b, c, e]) => line(g, a, b, c, e, { stroke: K(t), strokeWidth: 1.5 }));
    } },
    "bio.microscope": { w: 130, h: 180, draw(g) {
      const M = S("grey", 2.5);
      shape(g, "M94,164 L94,72 C94,48 82,36 62,34 L62,52 C72,54 78,60 78,72 L78,164 Z", M); // arm
      rect(g, 10, 162, 110, 14, M, 6);                                   // base
      rect(g, 40, 14, 22, 58, M, 3);                                      // tube
      rect(g, 35, 4, 32, 13, M, 4);                                       // eyepiece
      rect(g, 45, 72, 12, 16, M, 2);                                      // lens
      rect(g, 16, 98, 90, 8, M, 3);                                       // stage
      rect(g, 30, 92, 42, 6, { fill: "var(--paper)", stroke: K("sky"), strokeWidth: 1.5 }, 1); // slide
      circ(g, 51, 132, 8, S("yellow", 2));                                // light
      circ(g, 86, 128, 10, M);                                            // focus knob
    } },
    // An animal cell (a cheek cell): no wall, irregular shape. d.ribo adds ribosome dots.
    "bio.animalCell": { w: 300, h: 230, draw(g, d) {
      shape(g, "M40,70 C60,20 140,8 200,22 C260,34 296,80 288,130 C282,182 230,222 160,222 C90,224 30,200 14,150 C6,118 24,96 40,70 Z", S("teal", 3));
      nucleus(g, 150, 115, 34);
      mito(g, 70, 90, -30); mito(g, 235, 85, 20); mito(g, 220, 175, -15); mito(g, 85, 170, 25);
      if (d.ribo) [[110, 50], [180, 48], [258, 125], [140, 190], [50, 128], [190, 200], [96, 125], [205, 125], [128, 70]]
        .forEach(([x, y]) => circ(g, x, y, 3.2, { fill: K("grey") }));
    } },
    // A tuft of grass; d.roots adds roots below the box (y 70 to 105).
    "bio.grass": { w: 160, h: 70, draw(g, d) {
      if (d.roots) ["M40,70 C38,84 30,94 24,104", "M62,70 C64,86 60,96 62,106", "M90,70 C92,84 100,94 104,104", "M118,70 C118,86 126,94 134,100", "M74,70 C72,80 80,90 82,98"]
        .forEach(p => shape(g, p, { fill: "none", stroke: "var(--root)", strokeWidth: 2.5, strokeLinecap: "round" }));
      [[12, 34, 8], [26, 16, -4], [40, 28, 12], [54, 6, -2], [70, 22, 10], [84, 4, 4], [98, 20, -10], [112, 10, 6], [126, 30, -6], [140, 18, 10]]
        .forEach(([x, top, lean]) => shape(g, `M${x - 6},70 C${x - 4},${(70 + top) / 2} ${x + lean - 1},${top + 10} ${x + lean},${top} C${x + lean / 2 + 2},${top + 20} ${x + 5},${(70 + top) / 2 + 8} ${x + 6},70 Z`, S("green", 2)));
      line(g, 2, 70, 158, 70, ln("green", 2.5));
    } },
    // Animals face right; use flip to face left.
    "bio.rabbit": { w: 120, h: 100, draw(g) {
      const R = S("grey", 2.5);
      ellipse(el("g", { transform: "rotate(-14 84 22)" }, g), 84, 22, 7, 22, R);
      ellipse(el("g", { transform: "rotate(10 98 22)" }, g), 98, 22, 7, 22, R);
      circ(g, 16, 62, 9, R);
      ellipse(g, 40, 92, 18, 6, R);
      ellipse(g, 56, 68, 40, 26, R);
      ellipse(g, 86, 92, 10, 5, R);
      circ(g, 94, 52, 18, R);
      circ(g, 100, 48, 2.6, { fill: "var(--ink)" });
      circ(g, 111, 56, 2.4, { fill: K("red") });
    } },
    "bio.fox": { w: 170, h: 100, draw(g) {
      const A = S("amber", 2.5), L = { fill: K("amber") };
      [52, 64, 104, 116].forEach(x => rect(g, x, 60, 7, 36, L, 3));
      shape(g, "M44,52 C20,36 2,48 2,66 C14,76 34,72 48,62 Z", A);
      shape(g, "M2,66 C6,58 12,56 18,58 C14,66 10,70 2,66 Z", { fill: "var(--canvas)", stroke: K("amber"), strokeWidth: 2 });
      ellipse(g, 84, 54, 44, 18, A);
      shape(g, "M118,24 L122,4 L132,22 Z", A);
      shape(g, "M130,22 L140,4 L144,26 Z", A);
      shape(g, "M112,44 C112,30 124,22 136,24 C146,26 152,36 166,46 C160,52 146,54 132,56 C120,58 112,52 112,44 Z", A);
      circ(g, 136, 36, 2.6, { fill: "var(--ink)" });
      circ(g, 166, 46, 3, { fill: "var(--ink)" });
    } },
    "bio.mushroom": { w: 60, h: 64, draw(g) {
      shape(g, "M22,30 L20,62 L40,62 L38,30 Z", S("grey", 2));
      shape(g, "M3,32 C3,6 57,6 57,32 Z", S("amber", 2.5));
      [[18, 20], [32, 14], [44, 24]].forEach(([x, y]) => circ(g, x, y, 3, { fill: "var(--canvas)" }));
    } },
    "bio.worm": { w: 110, h: 34, draw(g) {
      const d = "M8,20 C22,6 36,6 50,18 C64,30 80,30 100,14";
      shape(g, d, { fill: "none", stroke: K("red"), strokeWidth: 13, strokeLinecap: "round" });
      shape(g, d, { fill: "none", stroke: F("red"), strokeWidth: 8, strokeLinecap: "round" });
      [[30, 9], [44, 13], [60, 25], [74, 27]].forEach(([x, y]) => line(g, x - 1, y - 5, x + 1, y + 5, { stroke: K("red"), strokeWidth: 1.5 }));
    } },
    // A human body outline, front view.
    "bio.body": { w: 200, h: 420, draw(g) {
      const B = S("grey", 2.5);
      shape(g, "M88,72 C70,84 48,84 38,96 C28,108 22,180 14,252 C13,262 26,264 28,254 L42,150 C44,190 46,230 48,252 L54,408 C56,418 90,418 92,408 L98,280 C99,274 101,274 102,280 L108,408 C110,418 144,418 146,408 L152,252 C154,230 156,190 158,150 L172,254 C174,264 187,262 186,252 C178,180 172,108 162,96 C152,84 130,84 112,72 Z", B);
      circ(g, 100, 40, 30, B);
    } },
    "bio.lungs": { w: 120, h: 110, draw(g) {
      shape(g, "M52,30 C30,22 8,50 6,88 C6,104 22,108 36,102 C48,96 54,80 54,60 Z", S("sky"));
      shape(g, "M68,30 C90,22 112,50 114,88 C114,104 98,108 84,102 C78,99 74,94 72,88 C80,84 82,76 76,72 C70,68 68,62 68,56 Z", S("sky"));
      shape(g, "M60,2 L60,34 M60,32 L44,50 M60,32 L76,50", ln("sky", 6));
    } },
    // The heart as an organ (small, for a body).
    "bio.heart": { w: 60, h: 66, draw(g) {
      shape(g, "M22,16 L20,4", ln("blue", 5));
      shape(g, "M32,16 C30,2 46,0 50,10", ln("red", 5));
      shape(g, "M30,64 C14,54 2,38 4,26 C6,14 18,10 26,16 C30,12 40,10 48,16 C58,24 58,42 30,64 Z", S("red"));
    } },
    // The heart split into its two pumps, drawn facing you (its right side is on your left).
    "bio.heartHalves": { w: 140, h: 136, draw(g) {
      shape(g, "M70,26 C60,6 30,0 14,16 C2,34 4,66 22,88 C38,106 56,120 70,132 Z", S("blue"));
      shape(g, "M70,26 C80,6 110,0 126,16 C138,34 136,66 118,88 C102,106 84,120 70,132 Z", S("red"));
      txt(g, 40, 64, "RIGHT", "atom-sm"); txt(g, 100, 64, "LEFT", "atom-sm");
    } },
    // Schematic four-chamber heart, facing you. Blood low in oxygen in blue, rich in oxygen in red.
    "bio.heartChambers": { w: 360, h: 330, draw(g) {
      const V = { fill: "none", stroke: "var(--ink)", strokeWidth: 3.5, strokeLinecap: "round" };
      shape(g, "M30,56 C12,70 8,120 14,160 C24,230 100,300 186,326 C272,300 348,230 352,160 C356,120 350,70 332,56 C290,44 230,46 186,60 C142,46 72,44 30,56 Z", S("grey", 3));
      rect(g, 156, 2, 22, 180, S("blue", 2));      // pulmonary artery (to the lungs)
      rect(g, 182, 2, 22, 180, S("red", 2));       // aorta (to the body)
      rect(g, 2, 92, 44, 24, S("blue", 2));        // vena cava (from the body)
      rect(g, 316, 92, 42, 24, S("red", 2));       // pulmonary veins (from the lungs)
      shape(g, "M40,72 C34,100 36,136 50,156 L148,156 C152,126 150,96 144,72 C110,62 74,62 40,72 Z", S("blue"));
      shape(g, "M228,72 C222,96 220,126 224,156 L322,156 C336,136 338,100 332,72 C298,62 262,62 228,72 Z", S("red"));
      shape(g, "M46,176 L178,176 L174,286 C120,270 70,232 46,176 Z", S("blue"));
      shape(g, "M182,176 L304,176 C296,228 256,272 206,290 C196,250 186,214 182,176 Z", S("red"));
      shape(g, "M78,152 L94,178 M122,152 L106,178", V);         // valves: atrium to ventricle
      shape(g, "M250,152 L266,178 M294,152 L278,178", V);
      shape(g, "M158,164 L165,150 M176,164 L169,150", V);       // valves at the exits
      shape(g, "M184,164 L191,150 M202,164 L195,150", V);
    } },
    // One codon: three bases (d.seq) on a backbone (d.back: "top" or "bottom").
    "bio.codon": { w: 90, h: 40, draw(g, d) { bases(g, 0, 0, d.seq || "AUG", d.back || "top"); } },
    // A ribosome: large subunit on top, small below, with a channel for the mRNA (y 118 to 158).
    "bio.ribosome": { w: 170, h: 200, draw(g) {
      shape(g, "M10,118 C2,80 10,30 50,14 C80,2 120,4 146,22 C170,40 170,90 160,118 Z", S("grey"));
      shape(g, "M18,158 L152,158 C160,176 140,198 85,198 C30,198 10,176 18,158 Z", S("grey"));
    } },
    // A transfer RNA with its anticodon (d.seq) at the bottom. Its amino acid attaches at the top.
    "bio.trna": { w: 90, h: 110, draw(g, d) {
      const Y = S("yellow", 2);
      rect(g, 38, 0, 14, 34, Y, 4);
      circ(g, 18, 40, 12, Y); circ(g, 72, 40, 12, Y);
      rect(g, 38, 50, 14, 24, Y, 4);
      ellipse(g, 45, 44, 17, 14, Y);
      bases(g, 0, 70, d.seq || "UAC", "top");
    } },
    // One amino acid; d.text is its short name.
    "bio.aa": { w: 44, h: 44, draw(g, d) {
      circ(g, 22, 22, 20, S(d.tone || "teal", 2.5));
      if (d.text) txt(g, 22, 26, d.text, "atom-sm");
    } },
    // An unfolded chain of amino acids.
    "bio.chain": { w: 400, h: 44, draw(g) {
      const T = ["teal", "violet", "amber", "green", "sky", "teal", "red", "violet", "amber"];
      line(g, 22, 22, 390, 22, { stroke: K("grey"), strokeWidth: 3 });
      ["Met", "Phe", "Gly", "", "", "", "", "", ""].forEach((n, i) => {
        circ(g, 22 + i * 42, 22, 18, S(T[i], 2.5));
        if (n) txt(g, 22 + i * 42, 26, n, "atom-sm");
      });
      [384, 392].forEach(x => circ(g, x, 22, 2, { fill: K("grey") }));
    } },
    // The same kind of chain folded into a compact 3D shape.
    "bio.protein": { w: 220, h: 170, draw(g) {
      const P = [[155, 100], [187, 125], [183, 140], [146, 144], [92, 134], [46, 113], [30, 86], [51, 58], [99, 35], [152, 22], [186, 21], [184, 34], [148, 56], [95, 84], [48, 111], [30, 133], [49, 143], [96, 141], [150, 127], [185, 103], [186, 74], [151, 48], [98, 28], [50, 20], [30, 25], [47, 42]];
      const T = ["teal", "violet", "amber", "green", "sky", "red"];
      shape(g, "M" + P.map(p => p.join(",")).join(" L"), { fill: "none", stroke: K("grey"), strokeWidth: 3, strokeLinejoin: "round" });
      P.forEach(([x, y], i) => circ(g, x, y, 9, S(T[i % 6], 2)));
    } },
    // A virus: genetic material inside a protein coat, studded with spike proteins.
    "bio.virus": { w: 160, h: 160, draw(g) {
      for (let i = 0; i < 12; i++) spike(g, 80 + 46 * Math.sin(i * Math.PI / 6), 80 - 46 * Math.cos(i * Math.PI / 6), i * 30);
      circ(g, 80, 80, 48, S("red", 3));
      shape(g, "M58,70 C64,56 76,58 78,70 C80,82 92,84 98,74 C104,64 108,80 100,92 C92,104 70,104 62,94", ln("red", 2.5));
    } },
    "bio.spike": { w: 40, h: 50, draw(g) { spike(g, 20, 46, 0, 1.3); } },
    "bio.syringe": { w: 190, h: 50, draw(g) {
      rect(g, 2, 14, 8, 22, S("grey", 2), 2);
      rect(g, 10, 22, 36, 6, S("grey", 2), 2);
      rect(g, 46, 10, 90, 30, { fill: "var(--paper)", stroke: K("grey"), strokeWidth: 2.5 }, 4);
      rect(g, 48, 12, 6, 26, { fill: K("grey") }, 1);
      rect(g, 54, 12, 80, 26, { fill: F("sky") }, 2);
      [70, 86, 102, 118].forEach(x => line(g, x, 10, x, 18, { stroke: K("grey"), strokeWidth: 1.5 }));
      rect(g, 136, 19, 12, 12, S("grey", 2), 2);
      line(g, 148, 25, 188, 25, { stroke: K("grey"), strokeWidth: 2.5, strokeLinecap: "round" });
    } },
    // A B cell with receptors around its surface. d.cup sets the receptor shape, d.tone its colour,
    // d.memory draws it as a long-lived memory cell (a ring inside), d.plasma as an antibody factory.
    "bio.bcell": { w: 120, h: 120, draw(g, d) {
      const t = d.tone || "teal";
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4 + Math.PI / 8;
        receptor(g, 60 + 38 * Math.sin(a), 60 - 38 * Math.cos(a), a * 180 / Math.PI, t, d.cup || "v");
      }
      circ(g, 60, 60, 38, S(t, 3));
      circ(g, 60, 60, 16, S("violet", 2));
      if (d.memory) circ(g, 60, 60, 27, { fill: "none", stroke: K(t), strokeWidth: 2, strokeDasharray: "4 4" });
      if (d.plasma) [[-24, -4], [24, -4], [0, 26]].forEach(([dx, dy]) =>
        shape(g, `M${60 + dx - 8},${60 + dy} q4,-5 8,0 t8,0`, ln(t, 1.5)));
    } },
    // An antibody; d.dir turns it: "up" (default), "down", "left" or "right".
    "bio.antibody": { w: 40, h: 40, draw(g, d) {
      const r = { up: 0, right: 90, down: 180, left: 270 }[d.dir || "up"];
      const k = el("g", { transform: `rotate(${r} 20 20)` }, g);
      receptor(k, 20, 36, 0, d.tone || "teal", "v", 4);
    } },
    // A plant (leaf) cell: wall, membrane, big vacuole, nucleus, chloroplasts, mitochondria.
    "bio.leafCell": { w: 300, h: 230, draw(g) {
      rect(g, 3, 3, 294, 224, S("green", 4), 16);
      rect(g, 13, 13, 274, 204, { fill: F("teal"), stroke: K("teal"), strokeWidth: 2 }, 10);
      rect(g, 70, 50, 150, 120, S("sky", 2), 36);
      nucleus(g, 248, 64, 24);
      [[40, 40, -10], [36, 110, 80], [44, 188, 15], [120, 198, 0], [200, 196, -8], [256, 160, 70], [130, 30, 5]]
        .forEach(([x, y, r]) => chloro(g, x, y, r));
      mito(g, 196, 30, 10, .85); mito(g, 254, 112, 85, .85); mito(g, 84, 196, -10, .85);
    } }
  });
})();
