// Earth science illustrations. Names start with "earth.".
(() => {
  const { el, line, shape, rect, circ, ellipse, txt, F, K, STONE, WINDOW } = CC;
  const T = (t, w = 2.5) => ({ fill: F(t), stroke: K(t), strokeWidth: w, strokeLinejoin: "round" });
  const SOIL = { fill: "var(--soil-f)", stroke: "var(--soil-s)", strokeWidth: 2.5, strokeLinejoin: "round" };
  const NONE = (t, w = 2.5) => ({ fill: "none", stroke: K(t), strokeWidth: w, strokeLinecap: "round", strokeLinejoin: "round" });
  // A wavy water line from x0 to x1 at height y.
  const wave = (x0, x1, y, amp = 4, len = 40) => {
    let d = `M${x0},${y}`;
    for (let x = x0; x < x1; x += len) d += ` q${len / 4},${-amp} ${len / 2},0 t${len / 2},0`;
    return d;
  };
  const atom = (g, x, y, r, s, t) => { circ(g, x, y, r, T(t, 2)); txt(g, x, y + 5, s, "atom"); };
  const rockShape = "M10,54 C4,44 6,24 18,16 C30,6 54,6 70,12 C84,18 88,34 84,46 C80,56 70,58 50,58 C34,58 16,60 10,54 Z";

  CC.art({
    // A landscape: ocean on the left, a plain with a river, and mountains on the right.
    "earth.landscape": { w: 800, h: 300, draw(g) {
      rect(g, 0, 170, 430, 130, { fill: F("blue") });
      shape(g, wave(0, 400, 170, 4, 40), NONE("blue"));
      shape(g, "M800,300 H330 C336,250 340,205 345,172 C380,162 420,156 470,152 H800 Z", SOIL);
      shape(g, "M625,152 L730,55 L800,118 V152 Z", T("grey"));
      shape(g, "M730,55 L701,82 L712,80 L722,88 L733,79 L742,84 L750,73 Z", { ...STONE, stroke: K("grey") });
      shape(g, "M470,152 L585,20 L700,152 Z", T("grey"));
      shape(g, "M585,20 L553,57 L566,52 L576,60 L588,51 L600,59 L617,57 Z", { ...STONE, stroke: K("grey") });
      const river = "M668,118 C664,138 650,150 620,158 C560,170 520,160 470,166 C420,172 390,168 345,173";
      shape(g, river, NONE("blue", 10));
      shape(g, river, { fill: "none", stroke: F("blue"), strokeWidth: 5, strokeLinecap: "round" });
      shape(g, "M347,171 C380,162 420,156 470,152", NONE("green", 4));
    } },
    // Water held in the ground below the water table (dashed line).
    "earth.groundwater": { w: 400, h: 50, draw(g) {
      rect(g, 0, 4, 400, 44, { fill: F("blue"), opacity: .8 }, 10);
      line(g, 6, 4, 394, 4, { stroke: K("blue"), strokeWidth: 2.5, strokeDasharray: "9 6", strokeLinecap: "round" });
      for (const [x, y] of [[30, 26], [90, 36], [150, 22], [210, 34], [270, 24], [330, 36], [380, 22]])
        shape(el("g", { transform: `translate(${x},${y})` }, g), "M0,-7 C3,-2 5,1 5,3 A5,5 0 0 1 -5,3 C-5,1 -3,-2 0,-7 Z", T("blue", 1.5));
    } },
    "earth.tree": { w: 60, h: 90, draw(g) {
      rect(g, 25, 48, 10, 40, { fill: "var(--root)" }, 2);
      shape(g, "M30,4 C46,4 56,18 52,32 C60,42 52,58 38,56 C34,62 26,62 22,56 C8,58 0,42 8,32 C4,18 14,4 30,4 Z", T("green"));
    } },
    // Rising water vapour: three wavy lines.
    "earth.vapour": { w: 60, h: 70, draw(g) {
      for (const x of [12, 30, 48]) shape(g, `M${x},66 c-8,-10 8,-16 0,-26 c-8,-10 8,-16 0,-26`, { ...NONE("sky", 3), opacity: .9 });
    } },
    // A cloud with rain (or snow with d.snow) falling from it.
    "earth.rainCloud": { w: 150, h: 140, draw(g, d) {
      const spots = [[32, 88], [60, 98], [88, 88], [116, 98], [46, 116], [74, 126], [102, 116]];
      if (d.snow) {
        for (const [x, y] of spots) for (const a of [0, 60, 120])
          line(el("g", { transform: `translate(${x},${y}) rotate(${a})` }, g), 0, -7, 0, 7, NONE("sky", 2.2));
      } else {
        for (const [x, y] of spots) line(g, x, y - 6, x - 5, y + 8, NONE("blue", 3));
      }
      CC.ART.cloud.draw(el("g", { transform: "translate(5,0)" }, g), { tone: "grey" });
    } },
    // Earth with its axis tilted 23.5 degrees; d.ref adds a vertical reference line and the angle.
    "earth.tiltedEarth": { w: 120, h: 140, draw(g, d) {
      if (d.ref) {
        line(g, 60, 4, 60, 136, { stroke: "var(--muted)", strokeWidth: 1.5, strokeDasharray: "5 4" });
        shape(g, "M60,18 A52,52 0 0 1 80.7,22.3", NONE("amber", 2.5));
      }
      const c = el("g", { transform: "rotate(23.5 60 70)" }, g);
      circ(c, 60, 70, 40, T("sky"));
      const land = el("g", { transform: "translate(12.9,22.9) scale(1.176)" }, c);
      shape(land, "M22,22 C30,16 40,20 38,30 C36,38 26,36 24,46 C22,54 14,48 13,40 C12,32 16,26 22,22 Z", T("green", 1.8));
      shape(land, "M48,40 C56,36 66,42 64,52 C62,62 52,68 46,60 C42,54 42,44 48,40 Z", T("green", 1.8));
      ellipse(c, 60, 70, 40, 8, { fill: "none", stroke: K("sky"), strokeWidth: 1.5, strokeDasharray: "4 3" });
      line(c, 60, 8, 60, 132, { stroke: "var(--ink)", strokeWidth: 2.5, strokeLinecap: "round" });
      circ(c, 60, 30, 3.5, { fill: "var(--ink)" });
      txt(g, 96, 16, "N", "atom");
    } },
    // A beam of sunlight hitting the ground at d.angle degrees (90 = straight down).
    // The amber strip is the patch of ground the same beam has to warm.
    "earth.beam": { w: 260, h: 180, draw(g, d) {
      const a = (d.angle || 90) * Math.PI / 180, dir = [Math.cos(a), Math.sin(a)], n = [-Math.sin(a), Math.cos(a)];
      const hit = [150, 150], L = 128, hw = 19, s = [hit[0] - dir[0] * L, hit[1] - dir[1] * L];
      const ends = [hw, -hw].map(o => {
        const p = [s[0] + n[0] * o, s[1] + n[1] * o], t = (150 - p[1]) / dir[1];
        return [p, [p[0] + dir[0] * t, 150]];
      });
      rect(g, 4, 150, 252, 26, SOIL, 4);
      shape(g, `M${ends[0][0]} L${ends[0][1]} L${ends[1][1]} L${ends[1][0]} Z`, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 2, strokeLinejoin: "round", opacity: .95 });
      const xs = [ends[0][1][0], ends[1][1][0]].sort((p, q) => p - q);
      line(g, xs[0], 151, xs[1], 151, { stroke: K("amber"), strokeWidth: 7, strokeLinecap: "round" });
      circ(g, s[0] - dir[0] * 6, s[1] - dir[1] * 6, 13, T("yellow", 3));
    } },
    "earth.thermometer": { w: 40, h: 140, draw(g, d) {
      const t = d.tone || "red", lvl = d.level ?? .5, top = 108 - lvl * 92;
      circ(g, 20, 120, 15, { fill: "var(--canvas)", stroke: "var(--muted)", strokeWidth: 2.5 });
      rect(g, 12, 6, 16, 112, { fill: "var(--canvas)", stroke: "var(--muted)", strokeWidth: 2.5 }, 8);
      rect(g, 14.5, 112, 11, 8, { fill: "var(--canvas)" });
      for (let y = 20; y <= 100; y += 16) line(g, 28, y, 34, y, { stroke: "var(--muted)", strokeWidth: 1.5 });
      rect(g, 16, top, 8, 122 - top, { fill: K(t) }, 4);
      circ(g, 20, 120, 10, { fill: K(t) });
    } },
    // A straight or wavy arrow: d.dir "up" or "down", d.tone, d.wavy (infrared heat).
    "earth.arrow": { w: 40, h: 150, draw(g, d) {
      const t = d.tone || "yellow", up = d.dir === "up";
      const body = d.wavy ? "M20,140 c-11,-10 11,-18 0,-28 c-11,-10 11,-18 0,-28 c-11,-10 11,-18 0,-28 c-11,-10 11,-18 0,-28 L20,26"
                          : "M20,140 L20,26";
      const s = el("g", { transform: up ? "" : "translate(0,150) scale(1,-1)" }, g);
      shape(s, body, NONE(t, d.wavy ? 3.5 : 6));
      shape(s, "M20,6 L8,28 L32,28 Z", { fill: K(t), stroke: K(t), strokeWidth: 2, strokeLinejoin: "round" });
    } },
    // Methane, CH4.
    "earth.ch4": { w: 76, h: 76, draw(g) {
      for (const [x, y] of [[38, 12], [38, 64], [12, 38], [64, 38]]) line(g, 38, 38, x, y, { stroke: "var(--muted)", strokeWidth: 2.5 });
      for (const [x, y] of [[38, 12], [38, 64], [12, 38], [64, 38]]) atom(g, x, y, 11, "H", "blue");
      atom(g, 38, 38, 14, "C", "grey");
    } },
    // The ground seen from the side: land on the left, ocean on the right.
    "earth.surface": { w: 800, h: 110, draw(g) {
      rect(g, 0, 10, 800, 100, SOIL);
      rect(g, 500, 12, 300, 98, { fill: F("blue") });
      shape(g, wave(500, 800, 12, 4, 40), NONE("blue"));
      line(g, 0, 10, 500, 10, NONE("green", 4));
    } },
    // A band of air; the dashed top edge marks where the atmosphere thins out into space.
    "earth.atmosphere": { w: 800, h: 230, draw(g) {
      rect(g, 0, 0, 800, 230, { fill: F("sky"), opacity: .7 });
      line(g, 0, 1, 800, 1, { stroke: K("sky"), strokeWidth: 2, strokeDasharray: "10 7" });
    } },
    "earth.factory": { w: 130, h: 140, draw(g) {
      circ(g, 99, 30, 8, T("grey", 2)); circ(g, 110, 16, 10, T("grey", 2));
      rect(g, 88, 40, 20, 50, STONE);
      shape(g, "M6,84 V64 L32,84 V64 L58,84 V64 L84,84 Z", STONE);
      rect(g, 6, 84, 116, 52, STONE);
      for (const x of [16, 40, 64, 88]) rect(g, x, 98, 14, 16, WINDOW, 1);
      rect(g, 2, 134, 124, 4, STONE);
    } },
    "earth.cow": { w: 110, h: 80, draw(g) {
      const C = { fill: "var(--stone)", stroke: "var(--stone-s)", strokeWidth: 2.2, strokeLinejoin: "round" };
      for (const x of [20, 32, 62, 74]) rect(g, x, 46, 8, 30, C, 3);
      shape(g, "M14,32 C14,20 22,16 36,16 H72 C86,16 90,24 90,32 V44 C90,52 84,56 72,56 H30 C18,56 14,50 14,44 Z", C);
      shape(g, "M14,26 C6,30 4,40 6,50", { fill: "none", stroke: "var(--stone-s)", strokeWidth: 2.2, strokeLinecap: "round" });
      shape(g, "M34,18 C42,24 40,36 30,38 C24,38 22,30 26,22 Z", { fill: "var(--stone-s)", opacity: .55 });
      shape(g, "M58,30 C66,28 72,36 66,44 C60,48 52,40 58,30 Z", { fill: "var(--stone-s)", opacity: .55 });
      shape(g, "M84,10 C84,4 102,4 104,12 L106,30 C106,38 92,40 88,32 Z", C);
      ellipse(g, 98, 32, 9, 6, { fill: F("red"), stroke: "var(--stone-s)", strokeWidth: 1.5 });
      shape(g, "M84,10 L78,4 M100,6 L104,0", { fill: "none", stroke: "var(--stone-s)", strokeWidth: 2.2, strokeLinecap: "round" });
      circ(g, 93, 18, 2.2, { fill: "var(--stone-s)" });
    } },
    // A fallen log with mushrooms: decomposers at work.
    "earth.log": { w: 130, h: 60, draw(g) {
      rect(g, 6, 32, 112, 24, { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.5 }, 12);
      ellipse(g, 112, 44, 8, 12, { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2 });
      ellipse(g, 112, 44, 3.5, 6, { fill: "none", stroke: "var(--root)", strokeWidth: 1.5 });
      line(g, 20, 40, 60, 40, { stroke: "var(--root)", strokeWidth: 1.5, opacity: .6 });
      line(g, 44, 49, 92, 49, { stroke: "var(--root)", strokeWidth: 1.5, opacity: .6 });
      for (const [x, s] of [[30, 1], [52, .75], [82, .9]]) {
        const m = el("g", { transform: `translate(${x},34) scale(${s})` }, g);
        rect(m, -4, -16, 8, 16, { fill: "var(--paper)", stroke: "var(--paper-ink)", strokeWidth: 1.8 }, 2);
        shape(m, "M-14,-14 C-14,-30 14,-30 14,-14 Z", T("amber", 2));
      }
    } },
    // Rock samples: d.rock "igneous", "sedimentary", "metamorphic", "sediment" or "magma".
    "earth.rock": { w: 90, h: 64, draw(g, d) {
      const type = d.rock || "igneous";
      if (type === "sedimentary") {
        [[10, "var(--soil-f)"], [22, F("amber")], [34, "var(--soil-f)"], [46, F("amber")]].forEach(([y, f]) =>
          rect(g, 8, y, 76, 12, { fill: f, stroke: "var(--soil-s)", strokeWidth: 1.5 }));
        rect(g, 8, 10, 76, 48, { fill: "none", stroke: "var(--soil-s)", strokeWidth: 2.5 }, 3);
      } else if (type === "metamorphic") {
        rect(g, 6, 10, 80, 48, T("violet"), 12);
        for (const y of [22, 34, 46]) shape(g, `M14,${y} c8,-7 14,7 22,0 s14,-7 22,0 s14,7 20,0`, NONE("violet", 2));
      } else if (type === "sediment") {
        shape(g, "M4,60 C14,40 30,28 46,28 C62,28 78,40 88,60 Z", SOIL);
        for (const [x, y, r] of [[30, 48, 5], [46, 40, 4], [60, 50, 6], [42, 54, 3.5], [72, 56, 3], [20, 56, 3], [52, 34, 2.5]])
          circ(g, x, y, r, T("grey", 1.5));
      } else if (type === "magma") {
        shape(g, rockShape, T("red"));
        shape(g, "M28,40 C26,28 40,22 52,26 C64,30 66,42 56,46 C46,50 30,50 28,40 Z", { fill: F("yellow"), stroke: K("amber"), strokeWidth: 1.5 });
      } else {
        shape(g, rockShape, T("grey"));
        for (const [x, y, r, t] of [[26, 26, 3, "grey"], [44, 20, 2.5, "red"], [60, 26, 3.5, "grey"], [72, 38, 2.5, "red"],
                                    [34, 40, 2.5, "red"], [52, 44, 3, "grey"], [20, 46, 2.5, "grey"], [66, 50, 2, "grey"]])
          circ(g, x, y, r, { fill: K(t), opacity: .7 });
      }
    } },
    // Rock cycle cross-section: a volcano over a magma chamber, sea, sediment layers and
    // metamorphic rock deep down. Schematic, not to scale.
    "earth.crossSection": { w: 520, h: 360, draw(g) {
      rect(g, 380, 146, 140, 54, { fill: F("blue") });
      shape(g, wave(380, 520, 150, 3, 28), NONE("blue", 2));
      shape(g, "M0,150 H350 C372,152 388,174 404,196 H520 V360 H0 Z", T("grey"));
      [[196, "var(--soil-f)"], [212, F("amber")], [228, "var(--soil-f)"], [244, F("amber")], [260, "var(--soil-f)"]].forEach(([y, f]) =>
        rect(g, y === 196 ? 404 : 290, y, y === 196 ? 116 : 230, 16, { fill: f, stroke: "var(--soil-s)", strokeWidth: 1.5 }));
      shape(g, "M250,296 C300,286 380,290 440,298 C470,302 500,300 520,298 V350 H250 C240,330 240,310 250,296 Z", T("violet"));
      for (const y of [312, 330]) shape(g, `M262,${y} c12,-8 22,8 34,0 s22,8 34,0 s22,-8 34,0 s22,8 34,0 s22,-8 34,0 s22,8 34,0 s22,-8 34,0`, NONE("violet", 2));
      shape(g, "M120,262 C122,200 126,120 128,46 H136 C138,120 142,200 146,262 Z", { fill: F("red"), stroke: K("red"), strokeWidth: 2 });
      shape(g, "M20,150 L112,44 C120,48 140,48 148,44 L240,150 Z", T("grey"));
      shape(g, "M127,46 C127,90 126,120 128,150 L136,150 C136,110 137,80 137,46 Z", { fill: F("red"), stroke: K("red"), strokeWidth: 1.5 });
      shape(g, "M146,47 C156,66 168,84 182,98 C190,106 196,116 204,124", NONE("red", 4));
      shape(g, "M116,48 C110,66 98,80 86,96", NONE("red", 4));
      ellipse(g, 132, 300, 92, 40, T("red"));
      ellipse(g, 132, 304, 50, 18, { fill: F("yellow"), stroke: K("amber"), strokeWidth: 1.5, opacity: .9 });
      shape(g, "M240,150 H350 C372,152 388,174 404,196", NONE("green", 4));
    } },
    // Earth cut open to show its layers, drawn to scale except the crust (much too thin to see).
    "earth.interior": { w: 300, h: 300, draw(g) {
      circ(g, 150, 150, 140, T("sky", 3));
      shape(g, "M70,60 C96,44 128,52 124,80 C120,104 92,98 86,124 C80,146 56,136 50,114 C44,92 52,72 70,60 Z", T("green", 2));
      shape(g, "M60,190 C84,176 112,190 108,214 C104,240 80,256 62,240 C48,226 46,200 60,190 Z", T("green", 2));
      shape(g, "M150,150 L150,10 A140,140 0 0 1 290,150 Z", { fill: "var(--soil-f)", stroke: "var(--soil-s)", strokeWidth: 2.5, strokeLinejoin: "round" });
      shape(g, "M150,150 L150,16 A134,134 0 0 1 284,150 Z", { fill: F("amber"), stroke: K("amber"), strokeWidth: 2, strokeLinejoin: "round" });
      shape(g, "M150,150 L150,74 A76,76 0 0 1 226,150 Z", { fill: F("red"), stroke: K("red"), strokeWidth: 2, strokeLinejoin: "round" });
      shape(g, "M150,150 L150,123 A27,27 0 0 1 177,150 Z", { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 2.5, strokeLinejoin: "round" });
    } },
    // The mantle under the plates: hot, solid rock that flows very slowly.
    // It spans the full canvas width, so place it at x 0.
    "earth.mantle": { w: 800, h: 200, draw(g) {
      rect(g, -4, 0, 808, 200, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2 }, 6);
      for (let x = 14; x < 800; x += 36) for (let y = 16; y < 196; y += 30)
        circ(g, x + (y % 60 ? 18 : 0), y, 2.2, { fill: K("amber"), opacity: .35 });
    } },
    // Two convection cells in the mantle: hot rock rises in the middle, spreads, cools and sinks.
    // Same frame as earth.mantle.
    "earth.convection": { w: 800, h: 200, draw(g) {
      const head = (x, y, dx) => shape(g, `M${x},${y} l${-12 * dx},-7 l0,14 Z`, { fill: K("red"), stroke: K("red"), strokeWidth: 1.5, strokeLinejoin: "round" });
      for (const m of [1, -1]) {
        const X = x => m === 1 ? x : 800 - x;
        shape(g, `M${X(390)},150 C${X(390)},74 ${X(380)},38 ${X(330)},32 L${X(140)},32`, { ...NONE("red", 3), strokeDasharray: "10 6" });
        head(X(130), 32, -m);
        shape(g, `M${X(96)},48 C${X(78)},96 ${X(96)},156 ${X(150)},158 L${X(360)},162`, { ...NONE("red", 3), strokeDasharray: "10 6" });
        head(X(372), 162, m);
      }
    } },
    // A strip of ocean water, the full canvas width.
    "earth.water": { w: 800, h: 60, draw(g) {
      rect(g, 0, 4, 800, 56, { fill: F("blue") });
      shape(g, wave(0, 800, 4, 3, 30), NONE("blue", 2));
    } },
    // An oceanic plate whose right end rises into a mid-ocean ridge (use flip for the other side).
    // It extends past its left edge so it still fills the frame after sliding outwards.
    "earth.oceanPlate": { w: 340, h: 60, draw(g) {
      shape(g, "M-60,24 H250 C285,24 312,14 340,8 V58 H-60 Z", T("grey"));
      shape(g, "M-60,36 H250 C285,36 312,26 340,20", { fill: "none", stroke: K("grey"), strokeWidth: 1.5, strokeDasharray: "6 5" });
    } },
    // Magma rising from the mantle into the gap between two plates.
    "earth.upwell": { w: 80, h: 200, draw(g) {
      shape(g, "M6,200 C18,140 28,70 30,6 H50 C52,70 62,140 74,200 Z", T("red"));
      shape(g, "M32,180 C35,130 38,80 40,20 C42,80 45,130 48,180 Z", { fill: F("yellow"), opacity: .9 });
    } },
    // New ocean crust that has formed in the gap at a ridge.
    "earth.newCrust": { w: 72, h: 56, draw(g) {
      shape(g, "M0,8 C20,2 52,2 72,8 V54 H0 Z", { fill: F("grey"), stroke: K("teal"), strokeWidth: 2.5, strokeLinejoin: "round" });
      shape(g, "M0,20 C20,14 52,14 72,20", { fill: "none", stroke: K("grey"), strokeWidth: 1.5, strokeDasharray: "6 5" });
    } },
    // An oceanic plate that bends and dives under another plate (subduction).
    "earth.slab": { w: 560, h: 170, draw(g) {
      shape(g, "M-90,0 H290 C330,0 360,12 390,30 L540,135 L519,165 L369,60 C346,46 320,36 290,36 H-90 Z", T("grey"));
      shape(g, "M-90,12 H290 C328,12 356,24 384,40 L534,145", { fill: "none", stroke: K("grey"), strokeWidth: 1.5, strokeDasharray: "6 5" });
    } },
    // A thick continental plate with mountains, whose left edge rides over a diving slab.
    "earth.continent": { w: 450, h: 160, draw(g) {
      shape(g, "M0,98 C10,86 20,76 32,72 H96 C110,40 124,26 134,24 C146,26 160,48 176,70 H490 V160 H128 L70,122 Z", SOIL);
      shape(g, "M32,72 H96 M176,70 H490", NONE("green", 4));
    } },
    "earth.volcano": { w: 110, h: 80, draw(g) {
      shape(g, "M4,78 L44,16 C50,20 60,20 66,16 L106,78 Z", T("grey"));
      shape(g, "M44,16 C50,22 60,22 66,16 L62,34 C58,40 54,30 50,36 Z", { fill: F("red"), stroke: K("red"), strokeWidth: 2, strokeLinejoin: "round" });
      circ(g, 50, 7, 5, T("grey", 1.8)); circ(g, 62, 5, 4, T("grey", 1.8));
    } },
    // Blobs of magma rising toward a volcano.
    "earth.magmaRise": { w: 40, h: 140, draw(g) {
      for (const [x, y, r] of [[22, 124, 10], [16, 92, 8], [24, 62, 7], [18, 36, 6], [22, 14, 5]]) ellipse(g, x, y, r, r * 1.3, T("red", 2));
    } },
    // An earthquake: a jagged burst.
    "earth.quake": { w: 48, h: 48, draw(g) {
      const pts = [...Array(16)].map((_, i) => { const a = i * Math.PI / 8, r = i % 2 ? 10 : 22; return `${24 + r * Math.cos(a)},${24 + r * Math.sin(a)}`; });
      CC.sty(el("polygon", { points: pts.join(" ") }, g), { fill: F("red"), stroke: K("red"), strokeWidth: 2.5, strokeLinejoin: "round" });
    } },
    // A piece of a plate seen from above, with a road across it. d.tone colours the plate.
    "earth.mapBlock": { w: 230, h: 280, draw(g, d) {
      const t = d.tone || "teal";
      rect(g, 0, 0, 230, 280, { fill: F(t), stroke: K(t), strokeWidth: 2.5 }, 6);
      rect(g, 0, 124, 230, 32, { fill: "var(--stone)", stroke: "var(--stone-s)", strokeWidth: 1.5 });
      line(g, 8, 140, 222, 140, { stroke: "var(--stone-s)", strokeWidth: 2, strokeDasharray: "12 10" });
      for (const [x, y] of [[40, 50], [150, 80], [90, 210], [180, 230]]) circ(g, x, y, 13, T("green", 2));
    } },
    // Ocean water with a few waves, seen from the side.
    "earth.sea": { w: 360, h: 140, draw(g) {
      rect(g, 0, 8, 360, 132, { fill: F("blue") });
      shape(g, wave(0, 360, 8, 4, 40), NONE("blue"));
    } },
    // An underground layer of coal, oil and gas.
    "earth.fossil": { w: 360, h: 44, draw(g) {
      rect(g, 0, 4, 360, 38, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2 }, 10);
      for (const [x, y, rx] of [[40, 22, 18], [110, 26, 14], [180, 20, 20], [250, 26, 15], [318, 22, 17]])
        ellipse(g, x, y, rx, 8, { fill: K("grey"), opacity: .55 });
    } }
  });
})();
