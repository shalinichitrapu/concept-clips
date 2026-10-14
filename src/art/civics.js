// Civics illustrations. Names start with "civics.".
(() => {
  const { el, line, shape, rect, circ, txt, F, K, STONE, PAPER, WINDOW, docLines } = CC;
  const COL = { stroke: "var(--stone-s)", strokeWidth: 2.5 };

  CC.art({
    "civics.bill": { w: 70, h: 90, draw(g) { CC.ART.doc.draw(g, { title: "BILL" }); } },
    "civics.law": { w: 90, h: 110, draw(g) {
      rect(g, 4, 4, 82, 102, PAPER, 3);
      txt(g, 45, 28, "LAW", "doc-title");
      docLines(g, 14, 76, [40, 50, 60]);
      shape(g, "M14,88 c5,-9 9,7 14,0 s9,-7 14,1", { fill: "none", stroke: "var(--paper-ink)", strokeWidth: 1.5 });
      shape(g, "M58,92 l-4,14 l8,-4 l6,4 l-2,-14", { fill: "var(--seal-f)", stroke: "var(--seal-s)", strokeWidth: 1.2 });
      circ(g, 64, 84, 12, { fill: "var(--seal-f)", stroke: "var(--seal-s)", strokeWidth: 2 });
      circ(g, 64, 84, 6, { fill: "none", stroke: "var(--seal-s)", strokeWidth: 1.5 });
    } },
    "civics.veto": { w: 90, h: 110, draw(g) {
      rect(g, 4, 4, 82, 102, PAPER, 3);
      txt(g, 45, 28, "BILL", "doc-title");
      docLines(g, 14, 76, [40, 50, 84, 94]);
      const s = el("g", { transform: "rotate(-14 45 62)" }, g);
      rect(s, 6, 49, 78, 26, { fill: "none", stroke: "var(--stamp)", strokeWidth: 3 }, 4);
      txt(s, 45, 67, "VETOED", "stamp");
    } },
    // One wing of the Capitol; d.tone colours its roof and pediment.
    "civics.capitolWing": { w: 190, h: 110, draw(g, d) {
      rect(g, 0, 40, 190, 68, STONE);
      for (const x of [10, 28, 46, 132, 150, 168]) for (const y of [52, 78]) rect(g, x, y, 12, 16, WINDOW, 1);
      for (let i = 0; i < 6; i++) line(g, 72 + i * 9.2, 44, 72 + i * 9.2, 106, COL);
      rect(g, -3, 34, 196, 8, { fill: F(d.tone), stroke: K(d.tone), strokeWidth: 1.5 });
      shape(g, "M66,34 L95,14 L124,34 Z", { fill: F(d.tone), stroke: K(d.tone), strokeWidth: 1.5 });
      rect(g, -3, 106, 196, 4, STONE);
    } },
    "civics.capitolCenter": { w: 150, h: 230, draw(g) {
      line(g, 75, 14, 75, 28, { stroke: "var(--stone-s)", strokeWidth: 2 });
      circ(g, 75, 12, 3, STONE);
      rect(g, 66, 36, 18, 20, STONE);
      shape(g, "M64,38 C64,26 86,26 86,38 Z", STONE);
      shape(g, "M30,98 C30,40 120,40 120,98 Z", STONE);
      ["M52,97 Q56,64 75,55", "M98,97 Q94,64 75,55", "M75,97 L75,55"]
        .forEach(d => shape(g, d, { fill: "none", stroke: "var(--stone-s)", strokeWidth: 1, opacity: .7 }));
      rect(g, 28, 92, 94, 8, STONE);
      rect(g, 35, 100, 80, 60, STONE);
      for (let x = 43; x <= 107; x += 8) line(g, x, 104, x, 156, { stroke: "var(--stone-s)", strokeWidth: 1 });
      rect(g, 5, 172, 140, 56, STONE);
      for (let i = 0; i < 8; i++) line(g, 20 + i * 15.7, 184, 20 + i * 15.7, 226, COL);
      rect(g, 12, 172, 126, 10, STONE);
      shape(g, "M15,172 L75,148 L135,172 Z", STONE);
      rect(g, 0, 226, 150, 4, STONE);
    } },
    "civics.capitolMini": { w: 200, h: 110, draw(g) {
      rect(g, 95, 10, 10, 12, STONE);
      shape(g, "M72,52 C72,14 128,14 128,52 Z", STONE);
      rect(g, 74, 48, 52, 14, STONE);
      rect(g, 0, 64, 70, 44, STONE);
      rect(g, 130, 64, 70, 44, STONE);
      rect(g, 55, 60, 90, 48, STONE);
      shape(g, "M70,60 L100,46 L130,60 Z", STONE);
      for (const x of [10, 28, 46, 144, 162, 180]) rect(g, x, 76, 10, 14, WINDOW, 1);
      for (let x = 68; x <= 133; x += 10.6) line(g, x, 64, x, 106, { stroke: "var(--stone-s)", strokeWidth: 2 });
      rect(g, -2, 106, 204, 4, STONE);
    } },
    "civics.whiteHouse": { w: 300, h: 180, draw(g) {
      rect(g, 0, 172, 300, 8, { fill: F("green"), stroke: K("green"), strokeWidth: 1 });
      line(g, 150, 6, 150, 40, { stroke: "var(--stone-s)", strokeWidth: 2 });
      rect(g, 151, 6, 20, 12, { fill: F("red"), stroke: K("red"), strokeWidth: 1 });
      rect(g, 151, 6, 8, 6, { fill: K("blue") });
      rect(g, 20, 70, 260, 104, STONE);
      rect(g, 15, 62, 270, 10, STONE);
      for (const x of [36, 62, 88, 198, 224, 250]) for (const y of [86, 128]) rect(g, x, y, 14, 24, WINDOW, 1);
      rect(g, 100, 70, 100, 10, STONE);
      shape(g, "M96,70 L150,40 L204,70 Z", STONE);
      rect(g, 143, 138, 14, 34, { ...WINDOW, strokeWidth: 1 }, 1);
      for (const x of [108, 124, 140, 160, 176, 192]) rect(g, x - 3, 80, 6, 92, STONE);
    } }
  });
})();

// More civics illustrations, used by the three-branches, elections, checks-and-balances,
// Electoral College and Supreme Court clips.
(() => {
  const { el, line, shape, rect, circ, ellipse, txt, F, K, STONE, PAPER, WINDOW, docLines } = CC;
  const INK = { fill: "none", stroke: "var(--paper-ink)", strokeWidth: 1.5 };

  // Schematic map of five made-up states (native 440 x 330), used by the Electoral College clip.
  const STATES = [
    "M12,14 L120,10 L228,16 L232,92 L226,172 L120,178 L14,184 L18,100 Z",
    "M228,16 L330,12 L428,18 L424,86 L430,150 L330,160 L226,172 L232,92 Z",
    "M14,184 L120,178 L226,172 L222,250 L216,318 L118,322 L16,316 L20,250 Z",
    "M226,172 L330,160 L430,150 L426,198 L422,240 L332,250 L322,320 L216,318 L222,250 Z",
    "M332,250 L422,240 L428,320 L322,320 Z"
  ];

  CC.art({
    // The U.S. Supreme Court building: wide steps, eight columns, a pediment, no dome.
    "civics.supremeCourt": { w: 240, h: 170, draw(g) {
      rect(g, 0, 156, 240, 14, STONE);
      rect(g, 10, 144, 220, 13, STONE);
      rect(g, 20, 132, 200, 13, STONE);
      rect(g, 30, 64, 180, 68, STONE);
      for (let i = 0; i < 8; i++) {
        const x = 34 + i * 23.4;
        rect(g, x, 66, 12, 66, STONE);
        rect(g, x - 2, 62, 16, 5, STONE);
      }
      rect(g, 22, 46, 196, 17, STONE);
      line(g, 30, 55, 210, 55, { stroke: "var(--stone-s)", strokeWidth: 1, opacity: .7 });
      shape(g, "M16,46 L120,10 L224,46 Z", STONE);
      shape(g, "M44,42 L120,18 L196,42 Z", { fill: "none", stroke: "var(--stone-s)", strokeWidth: 1, opacity: .7 });
    } },
    // A smaller courthouse for trial and appeals courts; d.tone colours its roof.
    "civics.courthouse": { w: 160, h: 130, draw(g, d) {
      const t = d.tone || "grey";
      rect(g, 12, 50, 136, 72, STONE);
      for (const x of [22, 118]) for (const y of [62, 92]) rect(g, x, y, 14, 18, WINDOW, 1);
      rect(g, 72, 92, 16, 30, { ...WINDOW, strokeWidth: 1 }, 1);
      for (const x of [50, 62, 92, 104]) rect(g, x, 54, 7, 68, STONE);
      rect(g, 6, 42, 148, 9, { fill: F(t), stroke: K(t), strokeWidth: 1.5 });
      shape(g, "M34,42 L80,14 L126,42 Z", { fill: F(t), stroke: K(t), strokeWidth: 1.5 });
      rect(g, 0, 121, 160, 8, STONE);
    } },
    "civics.constitution": { w: 160, h: 110, draw(g) {
      rect(g, 14, 10, 132, 90, PAPER);
      rect(g, 4, 4, 16, 102, PAPER, 8);
      rect(g, 140, 4, 16, 102, PAPER, 8);
      txt(g, 80, 34, "WE THE PEOPLE", "doc-title");
      docLines(g, 30, 130, [52, 62, 72, 82, 92]);
    } },
    "civics.highway": { w: 180, h: 100, draw(g) {
      shape(g, "M66,8 L114,8 L176,96 L4,96 Z", { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" });
      for (const [y1, y2] of [[14, 24], [34, 48], [60, 80]]) line(g, 90, y1, 90, y2, { stroke: K("yellow"), strokeWidth: 3 + y1 / 20, strokeLinecap: "round" });
      shape(g, "M150,52 L158,30 L166,52 Z", { fill: F("amber"), stroke: K("amber"), strokeWidth: 2, strokeLinejoin: "round" });
      line(g, 146, 53, 170, 53, { stroke: K("amber"), strokeWidth: 3, strokeLinecap: "round" });
    } },
    "civics.gavel": { w: 100, h: 80, draw(g) {
      ellipse(g, 50, 68, 40, 9, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5 });
      const h = el("g", { transform: "rotate(-30 50 36)" }, g);
      rect(h, 46, 32, 46, 8, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5 }, 3);
      rect(h, 18, 18, 30, 36, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5 }, 5);
      line(h, 18, 26, 48, 26, { stroke: K("amber"), strokeWidth: 2 });
      line(h, 18, 46, 48, 46, { stroke: K("amber"), strokeWidth: 2 });
    } },
    // A paper ballot. d.office is the race (default "MAYOR"), d.names lists the candidates; d.mark is the index of the filled-in choice.
    "civics.ballot": { w: 130, h: 160, draw(g, d) {
      rect(g, 4, 4, 122, 152, PAPER, 3);
      txt(g, 65, 26, "BALLOT", "doc-title");
      txt(g, 65, 44, d.office || "MAYOR", "doc-title");
      (d.names || ["", "", ""]).forEach((n, i) => {
        const y = 72 + i * 30;
        rect(g, 14, y - 11, 16, 16, { fill: "var(--paper)", stroke: "var(--paper-ink)", strokeWidth: 1.5 }, 3);
        if (n) txt(g, 38, y + 2, n, "atom-sm", "start").style.fill = "var(--paper-ink)"; else line(g, 38, y - 3, 112, y - 3, { ...INK, opacity: .55 });
        if (d.mark === i) shape(g, `M16,${y - 3} L21,${y + 3} L32,${y - 14}`, { fill: "none", stroke: "var(--paper-ink)", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" });
      });
    } },
    "civics.ballotBox": { w: 110, h: 110, draw(g) {
      rect(g, 10, 32, 90, 74, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5 }, 4);
      rect(g, 4, 22, 102, 12, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5 }, 3);
      rect(g, 33, 25, 44, 5, { fill: K("grey") }, 2);
      txt(g, 55, 76, "VOTE", "atom");
    } },
    "civics.booth": { w: 120, h: 150, draw(g) {
      const P = { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" };
      line(g, 34, 102, 24, 146, { stroke: K("grey"), strokeWidth: 3, strokeLinecap: "round" });
      line(g, 86, 102, 96, 146, { stroke: K("grey"), strokeWidth: 3, strokeLinecap: "round" });
      shape(g, "M22,26 L4,36 L4,100 L22,96 Z", P);
      shape(g, "M98,26 L116,36 L116,100 L98,96 Z", P);
      rect(g, 22, 26, 76, 72, P);
      rect(g, 22, 8, 76, 18, { fill: F("sky"), stroke: K("sky"), strokeWidth: 2 }, 3);
      txt(g, 60, 22, "VOTE", "atom-sm");
      rect(g, 8, 96, 104, 8, P, 2);
    } },
    "civics.pollingPlace": { w: 240, h: 150, draw(g) {
      rect(g, 70, 48, 160, 94, STONE);
      shape(g, "M62,50 L150,16 L238,50 Z", STONE);
      for (const x of [86, 116, 172, 202]) for (const y of [64, 100]) rect(g, x, y, 16, 20, WINDOW, 1);
      rect(g, 140, 100, 20, 42, { ...WINDOW, strokeWidth: 1 }, 1);
      line(g, 34, 98, 34, 144, { stroke: "var(--stone-s)", strokeWidth: 3, strokeLinecap: "round" });
      rect(g, 2, 74, 64, 28, { fill: F("sky"), stroke: K("sky"), strokeWidth: 2.5 }, 4);
      txt(g, 34, 93, "VOTE", "atom");
      rect(g, 0, 141, 240, 6, { fill: F("green"), stroke: K("green"), strokeWidth: 1 });
    } },
    "civics.registration": { w: 90, h: 110, draw(g) {
      rect(g, 4, 4, 82, 102, PAPER, 3);
      txt(g, 45, 24, "VOTER", "doc-title");
      for (const y of [36, 58]) rect(g, 14, y, 62, 14, { fill: "none", stroke: "var(--paper-ink)", strokeWidth: 1.2, opacity: .7 }, 2);
      rect(g, 14, 82, 12, 12, { fill: "none", stroke: "var(--paper-ink)", strokeWidth: 1.5 }, 2);
      shape(g, "M16,87 L19,91 L27,79", { fill: "none", stroke: "var(--paper-ink)", strokeWidth: 2.2, strokeLinecap: "round" });
      shape(g, "M36,92 c5,-8 8,6 13,0 s8,-7 13,1 s6,-4 10,-1", INK);
    } },
    // A pile of paperwork, e.g. petitions to the Supreme Court.
    "civics.docStack": { w: 150, h: 130, draw(g) {
      for (const [x, y, r] of [[30, 26, -9], [40, 22, 7], [24, 18, -3], [44, 14, 4]])
        rect(el("g", { transform: `rotate(${r} ${x + 40} ${y + 50})` }, g), x, y, 80, 100, PAPER, 2);
      rect(g, 34, 10, 80, 104, PAPER, 2);
      txt(g, 74, 32, "PETITION", "doc-title");
      docLines(g, 46, 102, [50, 62, 74, 86, 98]);
    } },
    // d.n: one state of the made-up map, filled in d.tone; without d.n, the whole map in grey.
    "civics.map": { w: 440, h: 330, draw(g, d) {
      const st = t => ({ fill: F(t), stroke: K(t), strokeWidth: 2.5, strokeLinejoin: "round" });
      if (d.n == null) STATES.forEach(p => shape(g, p, st("grey")));
      else shape(g, STATES[d.n], st(d.tone || "grey"));
    } },
    "civics.struckLaw": { w: 130, h: 130, draw(g) {
      rect(g, 20, 4, 90, 122, PAPER, 3);
      txt(g, 65, 28, "LAW", "doc-title");
      docLines(g, 32, 98, [44, 54, 96, 106, 116]);
      const s = el("g", { transform: "rotate(-14 65 72)" }, g);
      rect(s, 4, 58, 122, 28, { fill: "var(--paper)", stroke: "var(--stamp)", strokeWidth: 3 }, 4);
      txt(s, 65, 77, "STRUCK DOWN", "stamp");
    } },
    // The Supreme Court bench: nine justices behind a long bench, a lawyer at the lectern in front.
    "civics.courtroom": { w: 380, h: 200, draw(g) {
      for (let i = 0; i < 9; i++) {
        const x = 30 + i * 40;
        rect(g, x - 15, 14, 30, 76, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2 }, 10);
        shape(g, `M${x - 13},88 V74 C${x - 13},64 ${x + 13},64 ${x + 13},74 V88 Z`, { fill: K("grey") });
        circ(g, x, 50, 10, { fill: "var(--stone)", stroke: "var(--stone-s)", strokeWidth: 2 });
      }
      rect(g, 2, 84, 376, 10, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5 }, 3);
      rect(g, 8, 94, 364, 44, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5 });
      for (const x of [60, 130, 250, 320]) rect(g, x - 20, 102, 40, 28, { fill: "none", stroke: K("amber"), strokeWidth: 1.5, opacity: .7 }, 2);
      // a lawyer, seen from behind, at the lectern
      circ(g, 206, 160, 10, { fill: F("violet"), stroke: K("violet"), strokeWidth: 2 });
      shape(g, "M190,198 V184 C190,174 196,171 206,171 C216,171 222,174 222,184 V198 Z", { fill: F("violet"), stroke: K("violet"), strokeWidth: 2 });
      rect(g, 168, 168, 8, 30, { fill: F("amber"), stroke: K("amber"), strokeWidth: 2 });
      shape(g, "M154,170 L190,164 L190,172 L156,176 Z", { fill: F("amber"), stroke: K("amber"), strokeWidth: 2, strokeLinejoin: "round" });
    } }
  });
})();
