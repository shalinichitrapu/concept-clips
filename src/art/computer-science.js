// computer-science illustrations. Names start with "cs.".
(() => {
  const { el, line, shape, rect, circ, ellipse, txt, F, K, STONE, PAPER, WINDOW, docLines } = CC;
  const T = (d, t) => d.tone || t;
  const st = (t, w = 2.5) => ({ fill: F(t), stroke: K(t), strokeWidth: w, strokeLinejoin: "round" });

  CC.art({
    // A light bulb wired to a wall switch. d.on lights the bulb and flips the toggle up.
    "cs.switch": { w: 80, h: 150, draw(g, d) {
      const t = d.on ? "yellow" : "grey";
      if (d.on) for (let i = 0; i < 7; i++) {
        const a = Math.PI + i * Math.PI / 6;
        line(g, 40 + Math.cos(a) * 28, 32 + Math.sin(a) * 28, 40 + Math.cos(a) * 37, 32 + Math.sin(a) * 37,
          { stroke: K("yellow"), strokeWidth: 3.5, strokeLinecap: "round" });
      }
      shape(g, "M30,52 C18,45 16,34 18,28 A22,22 0 0 1 62,28 C64,34 62,45 50,52 Z", st(t));
      shape(g, "M34,50 L37,36 L40,42 L43,36 L46,50", { fill: "none", stroke: K(t), strokeWidth: 1.8, strokeLinejoin: "round" });
      rect(g, 30, 52, 20, 12, STONE, 3);
      line(g, 31, 58, 49, 58, { stroke: "var(--stone-s)", strokeWidth: 1.2 });
      line(g, 40, 64, 40, 80, { stroke: "var(--stone-s)", strokeWidth: 2.5 });
      rect(g, 14, 80, 52, 66, STONE, 9);
      rect(g, 29, 92, 22, 42, { fill: F("grey"), stroke: "var(--stone-s)", strokeWidth: 1.5 }, 5);
      rect(g, 31, d.on ? 94 : 114, 18, 18, d.on ? st("green", 2) : { fill: "var(--stone-s)", stroke: "var(--stone-s)", strokeWidth: 2 }, 4);
    } },
    "cs.laptop": { w: 160, h: 110, draw(g, d) {
      rect(g, 20, 4, 120, 82, st("grey"), 7);
      rect(g, 28, 12, 104, 66, { fill: F(T(d, "sky")), stroke: K(T(d, "sky")), strokeWidth: 1.5 }, 3);
      shape(g, "M10,90 H150 L158,104 C158,106 157,107 155,107 H5 C3,107 2,106 2,104 Z", st("grey"));
      rect(g, 66, 92, 28, 4, { fill: K("grey"), opacity: .5 }, 2);
      if (d.text) txt(g, 80, 50, d.text, "atom");
    } },
    "cs.phone": { w: 60, h: 104, draw(g, d) {
      rect(g, 4, 2, 52, 100, st("grey"), 10);
      rect(g, 9, 12, 42, 74, { fill: F(T(d, "sky")), stroke: K(T(d, "sky")), strokeWidth: 1.5 }, 3);
      circ(g, 30, 94, 3.5, { fill: K("grey") });
      if (d.photo) {
        circ(g, 40, 30, 6, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 1.5 });
        shape(g, "M9,74 L22,52 L32,64 L40,56 L51,72 V86 H9 Z", { fill: F("green"), stroke: K("green"), strokeWidth: 1.5, strokeLinejoin: "round" });
      }
    } },
    // A rack server with three units and status lights.
    "cs.server": { w: 90, h: 130, draw(g, d) {
      const t = T(d, "grey");
      rect(g, 4, 4, 82, 122, st(t), 6);
      for (const y of [14, 50, 86]) {
        rect(g, 12, y, 66, 28, { fill: "var(--canvas)", stroke: K(t), strokeWidth: 1.5 }, 3);
        for (let i = 0; i < 3; i++) line(g, 20, y + 8 + i * 6, 50, y + 8 + i * 6, { stroke: K(t), strokeWidth: 1.5, opacity: .6 });
        circ(g, 62, y + 14, 3.5, { fill: K("green") });
        circ(g, 71, y + 14, 3.5, { fill: K("amber") });
      }
    } },
    "cs.router": { w: 110, h: 70, draw(g, d) {
      const t = T(d, "teal");
      line(g, 26, 34, 18, 4, { stroke: K(t), strokeWidth: 4, strokeLinecap: "round" });
      line(g, 84, 34, 92, 4, { stroke: K(t), strokeWidth: 4, strokeLinecap: "round" });
      rect(g, 4, 30, 102, 36, st(t), 10);
      for (let i = 0; i < 5; i++) circ(g, 22 + i * 12, 48, 3.5, { fill: K(i < 3 ? "green" : t) });
      shape(g, "M80,42 h14 m-5,-4 l5,4 l-5,4 M94,54 h-14 m5,-4 l-5,4 l5,4", { fill: "none", stroke: K(t), strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" });
    } },
    // An envelope-shaped packet. d.n is its number.
    "cs.packet": { w: 64, h: 46, draw(g, d) {
      const t = T(d, "amber");
      rect(g, 3, 3, 58, 40, st(t, 2.2), 4);
      shape(g, "M4,5 L32,26 L60,5", { fill: "none", stroke: K(t), strokeWidth: 2, strokeLinejoin: "round" });
      if (d.n != null) {
        circ(g, 32, 28, 11, { fill: "var(--canvas)", stroke: K(t), strokeWidth: 2 });
        txt(g, 32, 32.5, String(d.n), "atom");
      }
    } },
    "cs.photo": { w: 84, h: 66, draw(g) {
      rect(g, 3, 3, 78, 60, { fill: F("sky"), stroke: K("grey"), strokeWidth: 2.5 }, 4);
      circ(g, 60, 20, 8, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 2 });
      shape(g, "M4,55 L26,26 L42,44 L54,32 L80,58 V62 H4 Z", { fill: F("green"), stroke: K("green"), strokeWidth: 2, strokeLinejoin: "round" });
    } },
    // A numbered playing card. d.text is the number; d.tone its colour.
    "cs.card": { w: 40, h: 56, draw(g, d) {
      const t = T(d, "violet");
      rect(g, 2, 2, 36, 52, { fill: "var(--paper)", stroke: K(t), strokeWidth: 2 }, 5);
      rect(g, 6, 6, 28, 44, { fill: F(t), stroke: "none" }, 3);
      if (d.text != null) txt(g, 20, 33, String(d.text), "atom");
    } },
    "cs.recipe": { w: 110, h: 140, draw(g) {
      rect(g, 4, 4, 102, 132, PAPER, 4);
      txt(g, 55, 28, "RECIPE", "doc-title");
      line(g, 16, 38, 94, 38, { stroke: "var(--paper-ink)", strokeWidth: 1.5 });
      for (let i = 0; i < 4; i++) {
        const y = 58 + i * 21;
        circ(g, 22, y, 7, { fill: F("amber"), stroke: K("amber"), strokeWidth: 1.5 });
        txt(g, 22, y + 4, String(i + 1), "atom-sm");
        line(g, 36, y, 92 - (i % 2) * 14, y, { stroke: "var(--paper-ink)", strokeWidth: 1.5, opacity: .55 });
      }
    } },
    "cs.sandwich": { w: 130, h: 84, draw(g) {
      const bread = { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5, strokeLinejoin: "round" };
      rect(g, 8, 56, 114, 22, bread, 8);
      shape(g, "M10,56 C30,50 45,58 62,52 C80,48 98,58 120,52 V58 H10 Z", { fill: F("red"), stroke: K("red"), strokeWidth: 2, strokeLinejoin: "round" });
      rect(g, 10, 44, 110, 10, { fill: "var(--soil-f)", stroke: "var(--soil-s)", strokeWidth: 2 }, 4);
      shape(g, "M8,44 C2,26 10,8 34,8 C46,2 84,2 96,8 C120,8 128,26 122,44 Z", bread);
    } },
    // A computer chip: a grid of tiny switches, some on (yellow), some off.
    "cs.chip": { w: 150, h: 150, draw(g) {
      const pin = { stroke: "var(--stone-s)", strokeWidth: 3, strokeLinecap: "round" };
      for (let i = 0; i < 6; i++) {
        const p = 35 + i * 16;
        line(g, p, 4, p, 22, pin); line(g, p, 128, p, 146, pin);
        line(g, 4, p, 22, p, pin); line(g, 128, p, 146, p, pin);
      }
      rect(g, 20, 20, 110, 110, st("grey"), 8);
      const on = "1011010011100101011010110";
      for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
        const lit = on[r * 5 + c] === "1";
        rect(g, 33 + c * 17.5, 33 + r * 17.5, 12, 12, lit ? st("yellow", 1.5) : { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 1.5 }, 2);
      }
    } },
    // A browser window. d.url fills the address bar; d.loaded draws a finished page.
    "cs.browser": { w: 360, h: 230, draw(g, d) {
      rect(g, 3, 3, 354, 224, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 2.5 }, 10);
      shape(g, "M3,40 V13 A10,10 0 0 1 13,3 H347 A10,10 0 0 1 357,13 V40 Z", { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5 });
      ["red", "amber", "green"].forEach((t, i) => circ(g, 20 + i * 15, 21, 4.5, { fill: K(t) }));
      rect(g, 70, 10, 274, 22, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 1.5 }, 11);
      if (d.url) {
        rect(g, 81, 18, 9, 8, { fill: K("green") }, 1.5);
        shape(g, "M83,18 V15.5 A2.5,2.5 0 0 1 88,15.5 V18", { fill: "none", stroke: K("green"), strokeWidth: 1.6 });
        txt(g, 97, 25.5, d.url, "atom-sm", "start");
      }
      if (d.loaded) {
        rect(g, 16, 52, 328, 30, st("violet", 2), 5);
        rect(g, 26, 62, 70, 10, { fill: K("violet"), opacity: .7 }, 3);
        for (const x of [210, 254, 298]) rect(g, x, 63, 34, 8, { fill: K("violet"), opacity: .4 }, 3);
        rect(g, 16, 94, 150, 116, { fill: F("sky"), stroke: K("sky"), strokeWidth: 2 }, 5);
        circ(g, 136, 120, 10, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 2 });
        shape(g, "M17,200 L60,140 L92,176 L114,152 L165,200 V209 H17 Z", { fill: F("green"), stroke: K("green"), strokeWidth: 2, strokeLinejoin: "round" });
        rect(g, 182, 96, 130, 12, { fill: K("grey"), opacity: .65 }, 3);
        for (let i = 0; i < 4; i++) rect(g, 182, 122 + i * 15, 162 - (i === 3 ? 50 : 0), 6, { fill: K("grey"), opacity: .35 }, 3);
        rect(g, 182, 186, 80, 24, st("amber", 2), 12);
      }
    } },
    "cs.lock": { w: 44, h: 54, draw(g, d) {
      const t = T(d, "green");
      shape(g, "M11,26 V17 A11,11 0 0 1 33,17 V26", { fill: "none", stroke: K(t), strokeWidth: 4.5, strokeLinecap: "round" });
      rect(g, 4, 24, 36, 27, st(t), 5);
      circ(g, 22, 35, 3.5, { fill: K(t) });
      line(g, 22, 37, 22, 43, { stroke: K(t), strokeWidth: 3, strokeLinecap: "round" });
    } },
    // A hand-cranked grinder: the hash function. Things go in the top and come out the spout.
    "cs.grinder": { w: 170, h: 170, draw(g) {
      shape(g, "M30,6 H140 L108,52 H62 Z", st("grey"));
      rect(g, 50, 52, 70, 76, st("teal"), 10);
      txt(g, 85, 85, "HASH", "doc-title");
      for (let i = 0; i < 3; i++) line(g, 62, 98 + i * 8, 108, 98 + i * 8, { stroke: K("teal"), strokeWidth: 1.5, opacity: .6 });
      line(g, 120, 70, 148, 70, { stroke: "var(--stone-s)", strokeWidth: 4, strokeLinecap: "round" });
      line(g, 148, 70, 148, 98, { stroke: "var(--stone-s)", strokeWidth: 4, strokeLinecap: "round" });
      rect(g, 140, 96, 16, 24, { ...STONE, strokeWidth: 2 }, 6);
      circ(g, 120, 70, 6, { ...STONE, strokeWidth: 2 });
      shape(g, "M62,128 H108 L98,160 H72 Z", st("grey"));
      rect(g, 40, 160, 90, 8, { ...STONE, strokeWidth: 2 }, 3);
    } },
    "cs.database": { w: 90, h: 110, draw(g, d) {
      const t = T(d, "teal");
      shape(g, "M6,18 V92 A39,12 0 0 0 84,92 V18", st(t));
      for (const y of [42, 66]) shape(g, `M6,${y} A39,12 0 0 0 84,${y}`, { fill: "none", stroke: K(t), strokeWidth: 2.5 });
      ellipse(g, 45, 18, 39, 12, st(t));
    } },
    "cs.phonebook": { w: 110, h: 130, draw(g) {
      shape(g, "M14,8 H100 V118 H14 Z", { fill: "var(--paper)", stroke: "var(--paper-ink)", strokeWidth: 1.5 });
      rect(g, 6, 4, 94, 120, st("amber"), 5);
      line(g, 18, 6, 18, 122, { stroke: K("amber"), strokeWidth: 2 });
      rect(g, 30, 30, 58, 30, { fill: "var(--paper)", stroke: K("amber"), strokeWidth: 1.5 }, 3);
      txt(g, 59, 50, "A–Z", "atom");
      for (const y of [80, 92]) line(g, 34, y, 84, y, { stroke: K("amber"), strokeWidth: 2, opacity: .6 });
    } },
    // One cell of a sorted list, used by search clips. d.dim greys it out.
    "cs.cell": { w: 44, h: 44, draw(g, d) {
      const t = d.dim ? "grey" : T(d, "sky");
      rect(g, 2, 2, 40, 40, { fill: F(t), stroke: K(t), strokeWidth: 2, opacity: d.dim ? .55 : 1 }, 6);
      const tx = txt(g, 22, 27, String(d.text ?? ""), "atom");
      if (d.dim) tx.style.opacity = .45;
    } },
    "cs.bubble": { w: 150, h: 64, draw(g, d) {
      shape(g, "M14,4 H136 A10,10 0 0 1 146,14 V40 A10,10 0 0 1 136,50 H40 L24,62 L28,50 H14 A10,10 0 0 1 4,40 V14 A10,10 0 0 1 14,4 Z",
        { fill: "var(--canvas)", stroke: K(T(d, "violet")), strokeWidth: 2.2, strokeLinejoin: "round" });
      if (d.text) txt(g, 75, 32, d.text, "atom");
    } }
  });
})();
