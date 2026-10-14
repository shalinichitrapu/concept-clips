// personal-finance illustrations. Names start with "fin.".
(() => {
  const { el, line, shape, rect, circ, ellipse, txt, F, K, STONE, PAPER, WINDOW, docLines } = CC;
  const S = (t, w = 2.5) => ({ fill: F(t), stroke: K(t), strokeWidth: w, strokeLinejoin: "round" });
  const INK = "var(--paper-ink)";
  // text drawn on paper keeps the paper's ink colour in both themes
  const ptxt = (g, x, y, s, cls, a) => { const t = txt(g, x, y, s, cls, a); t.style.fill = INK; return t; };
  const coin = (g, x, y, r = 9) => {
    circ(g, x, y, r, { fill: "var(--seal-f)", stroke: "var(--seal-s)", strokeWidth: 2 });
    circ(g, x, y, r * .6, { fill: "none", stroke: "var(--seal-s)", strokeWidth: 1.2 });
  };
  const jarCoins = (g, n) => [[[26, 104], [48, 104], [70, 104]], [[37, 92], [59, 92]], [[26, 80], [48, 80], [70, 80]]]
    .slice(0, n).forEach(r => r.forEach(([x, y]) => coin(g, x, y, 10)));
  // A see-through container with straight walls, used as a tax bracket "bucket".
  // Its native height is its capacity in pixels; d.open draws dashed walls above it (no top limit).
  const bucket = h => ({ w: 100, h, draw(g, d) {
    const t = d.tone || "grey";
    rect(g, 3, 0, 94, h, { fill: F(t), opacity: .45 });
    shape(g, `M3,0 V${h} H97 V0`, { fill: "none", stroke: K(t), strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" });
    if (d.open) {
      const dash = { stroke: K(t), strokeWidth: 3, strokeDasharray: "6 6", strokeLinecap: "round" };
      line(g, 3, -6, 3, -70, dash); line(g, 97, -6, 97, -70, dash);
    } else {
      line(g, -4, 0, 10, 0, { stroke: K(t), strokeWidth: 3, strokeLinecap: "round" });
      line(g, 90, 0, 104, 0, { stroke: K(t), strokeWidth: 3, strokeLinecap: "round" });
    }
  } });

  CC.art({
    // A paper bank note; d.text sets the value printed in the middle (default "$").
    "fin.bill": { w: 120, h: 60, draw(g, d) {
      rect(g, 3, 3, 114, 54, S("green"), 5);
      rect(g, 10, 10, 100, 40, { fill: "none", stroke: K("green"), strokeWidth: 1.5, opacity: .7 }, 3);
      ellipse(g, 60, 30, 20, 15, { fill: "var(--canvas)", stroke: K("green"), strokeWidth: 2 });
      txt(g, 60, 35, d.text || "$", "atom");
      for (const [x, y] of [[20, 22], [100, 22], [20, 44], [100, 44]]) circ(g, x, y, 3.5, { fill: K("green"), opacity: .6 });
    } },
    // A stack of notes and coins: a month's money.
    "fin.cash": { w: 120, h: 70, draw(g) {
      for (const [dx, dy] of [[0, 18], [6, 10], [12, 2]]) {
        rect(g, dx + 3, dy + 3, 96, 44, S("green"), 4);
        ellipse(g, dx + 51, dy + 25, 12, 9, { fill: "var(--canvas)", stroke: K("green"), strokeWidth: 1.5 });
      }
      txt(g, 63, 32, "$", "atom");
      coin(g, 100, 60, 9); coin(g, 84, 62, 7);
    } },
    "fin.broom": { w: 70, h: 110, draw(g) {
      line(g, 44, 6, 32, 66, { stroke: "var(--root)", strokeWidth: 5, strokeLinecap: "round" });
      shape(g, "M22,64 L44,68 L54,104 L6,96 Z", S("amber"));
      rect(g, 22, 60, 22, 10, { fill: F("red"), stroke: K("red"), strokeWidth: 2, transform: "rotate(10 33 65)" }, 2);
      for (const x of [16, 26, 36, 46]) line(g, x + 2, 76, x - 2, 98, { stroke: K("amber"), strokeWidth: 1.5, opacity: .7 });
    } },
    "fin.wallet": { w: 120, h: 86, draw(g, d) {
      const t = d.tone || "violet";
      rect(g, 22, 4, 72, 30, S("green", 2), 3);
      rect(g, 30, 10, 72, 26, S("green", 2), 3);
      rect(g, 4, 22, 112, 62, S(t, 3), 10);
      shape(g, "M70,34 H112 A4,4 0 0 1 116,38 V64 A4,4 0 0 1 112,68 H70 A6,6 0 0 1 64,62 V40 A6,6 0 0 1 70,34 Z", S(t, 2.5));
      circ(g, 80, 51, 5, { fill: "var(--seal-f)", stroke: "var(--seal-s)", strokeWidth: 2 });
    } },
    // A glass jar with a coloured label; d.text is the label, d.coins (0-3) how full it is.
    "fin.jar": { w: 96, h: 120, draw(g, d) {
      const t = d.tone || "amber";
      rect(g, 18, 4, 60, 16, S("grey"), 4);
      shape(g, "M22,20 V30 C8,36 6,44 6,56 V104 C6,112 12,116 20,116 H76 C84,116 90,112 90,104 V56 C90,44 88,36 74,30 V20 Z",
        { fill: F("sky"), fillOpacity: .5, stroke: K("sky"), strokeWidth: 2.5, strokeLinejoin: "round" });
      jarCoins(g, d.coins || 0);
      if (d.text) {
        rect(g, 12, 46, 72, 24, S(t, 2), 4);
        txt(g, 48, 63, d.text, "atom");
      }
    } },
    // Just the coins of a fin.jar (d.coins rows), to place on top of an empty jar when money arrives.
    // Its box is the bottom of the jar: place it 72 (times the jar's scale) below the jar's top.
    "fin.jarCoins": { w: 96, h: 46, draw(g, d) { jarCoins(el("g", { transform: "translate(0,-72)" }, g), d.coins || 1); } },
    // A paper lunch bag with an apple.
    "fin.lunch": { w: 100, h: 100, draw(g) {
      shape(g, "M10,26 L16,96 H64 L70,26 Z", { ...PAPER, fill: "var(--soil-f)", stroke: "var(--soil-s)", strokeLinejoin: "round" });
      shape(g, "M10,26 L16,14 H64 L70,26", { fill: "var(--soil-f)", stroke: "var(--soil-s)", strokeWidth: 2, strokeLinejoin: "round" });
      line(g, 26, 36, 54, 36, { stroke: "var(--soil-s)", strokeWidth: 1.5 });
      circ(g, 80, 78, 15, S("red"));
      shape(g, "M80,63 C80,58 82,55 85,53", { fill: "none", stroke: "var(--root)", strokeWidth: 2.5, strokeLinecap: "round" });
      shape(g, "M82,60 C88,54 95,56 96,60 C90,64 85,63 82,60 Z", S("green", 1.5));
    } },
    "fin.bus": { w: 150, h: 86, draw(g) {
      rect(g, 4, 8, 142, 60, S("yellow", 2.5), 10);
      for (const x of [14, 42, 70, 98]) rect(g, x, 18, 22, 20, WINDOW, 3);
      rect(g, 124, 18, 16, 40, WINDOW, 2);
      line(g, 4, 48, 120, 48, { stroke: K("yellow"), strokeWidth: 2 });
      for (const x of [36, 114]) { circ(g, x, 70, 12, { fill: "var(--stone-s)", stroke: "var(--stone-s)", strokeWidth: 2 }); circ(g, x, 70, 5, { fill: "var(--stone)" }); }
    } },
    "fin.gamepad": { w: 130, h: 80, draw(g, d) {
      const t = d.tone || "teal";
      shape(g, "M30,10 H100 C118,10 126,30 128,52 C130,72 116,78 104,66 L92,54 H38 L26,66 C14,78 0,72 2,52 C4,30 12,10 30,10 Z", S(t, 2.5));
      rect(g, 26, 26, 8, 24, { fill: K(t) }, 2); rect(g, 18, 34, 24, 8, { fill: K(t) }, 2);
      for (const [x, y] of [[98, 26], [110, 38], [86, 38], [98, 50]]) circ(g, x, y, 5, { fill: "var(--canvas)", stroke: K(t), strokeWidth: 2 });
      rect(g, 56, 22, 18, 6, { fill: K(t), opacity: .6 }, 3);
    } },
    // A ticket with notched ends; d.text is printed on it (default "CONCERT").
    "fin.ticket": { w: 140, h: 70, draw(g, d) {
      const t = d.tone || "amber";
      shape(g, "M8,6 H132 A2,2 0 0 1 134,8 V26 A9,9 0 0 0 134,44 V62 A2,2 0 0 1 132,64 H8 A2,2 0 0 1 6,62 V44 A9,9 0 0 0 6,26 V8 A2,2 0 0 1 8,6 Z", S(t, 2.5));
      line(g, 104, 12, 104, 58, { stroke: K(t), strokeWidth: 2, strokeDasharray: "4 4" });
      txt(g, 56, 41, d.text || "CONCERT", "atom");
      for (const y of [22, 35, 48]) circ(g, 120, y, 3, { fill: K(t), opacity: .7 });
    } },
    "fin.clock": { w: 84, h: 84, draw(g) {
      circ(g, 42, 42, 36, S("grey", 3));
      circ(g, 42, 42, 30, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 1.5 });
      for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6, r1 = i % 3 ? 26 : 23;
        line(g, 42 + Math.cos(a) * r1, 42 + Math.sin(a) * r1, 42 + Math.cos(a) * 28, 42 + Math.sin(a) * 28, { stroke: K("grey"), strokeWidth: 2, strokeLinecap: "round" });
      }
      line(g, 42, 42, 42, 22, { stroke: "var(--ink)", strokeWidth: 3, strokeLinecap: "round" });
      line(g, 42, 42, 56, 48, { stroke: "var(--ink)", strokeWidth: 3, strokeLinecap: "round" });
      circ(g, 42, 42, 3.5, { fill: K("red") });
    } },
    // An open book.
    "fin.book": { w: 130, h: 84, draw(g, d) {
      const t = d.tone || "blue";
      shape(g, "M65,18 C50,8 24,6 6,10 V74 C24,70 50,72 65,82 C80,72 106,70 124,74 V10 C106,6 80,8 65,18 Z", S(t, 2.5));
      shape(g, "M65,18 C52,12 30,12 14,14 V68 C30,66 52,68 65,76 C78,68 100,66 116,68 V14 C100,12 78,12 65,18 Z", PAPER);
      line(g, 65, 18, 65, 76, { stroke: INK, strokeWidth: 1.5 });
      for (const y of [28, 38, 48, 58]) { line(g, 22, y, 56, y + 2, { stroke: INK, strokeWidth: 1.5, opacity: .5 }); line(g, 74, y + 2, 108, y, { stroke: INK, strokeWidth: 1.5, opacity: .5 }); }
    } },
    // A bank: classical front with columns and a sign.
    "fin.bank": { w: 230, h: 180, draw(g) {
      rect(g, 0, 170, 230, 10, STONE, 2);
      rect(g, 8, 162, 214, 10, STONE, 2);
      rect(g, 18, 72, 194, 92, STONE);
      shape(g, "M8,64 L115,8 L222,64 Z", STONE);
      rect(g, 8, 62, 214, 12, STONE);
      ptxt(g, 115, 52, "BANK", "atom");
      for (const x of [30, 62, 152, 184]) { rect(g, x, 78, 16, 82, STONE); line(g, x + 8, 82, x + 8, 156, { stroke: "var(--stone-s)", strokeWidth: 1, opacity: .6 }); }
      rect(g, 96, 104, 38, 58, { ...WINDOW, strokeWidth: 1.5 }, 2);
      line(g, 115, 104, 115, 162, { stroke: "var(--stone-s)", strokeWidth: 1.5 });
    } },
    // A safe or vault: the cash a bank keeps on hand.
    "fin.safe": { w: 96, h: 100, draw(g) {
      rect(g, 4, 4, 88, 84, S("grey", 3), 8);
      rect(g, 14, 14, 68, 64, { fill: "none", stroke: K("grey"), strokeWidth: 2 }, 5);
      circ(g, 48, 46, 16, { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 2.5 });
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(g, 48 + Math.cos(a) * 9, 46 + Math.sin(a) * 9, 48 + Math.cos(a) * 14, 46 + Math.sin(a) * 14, { stroke: K("grey"), strokeWidth: 1.5 }); }
      line(g, 70, 36, 70, 56, { stroke: K("grey"), strokeWidth: 4, strokeLinecap: "round" });
      rect(g, 12, 88, 14, 8, S("grey", 2), 2); rect(g, 70, 88, 14, 8, S("grey", 2), 2);
    } },
    "fin.car": { w: 160, h: 84, draw(g, d) {
      const t = d.tone || "sky";
      shape(g, "M8,60 V44 C8,38 12,36 18,35 L40,32 L58,12 C61,9 64,8 68,8 H104 C109,8 112,10 115,13 L134,34 L146,37 C151,38 154,42 154,48 V60 C154,64 152,66 148,66 H12 C10,66 8,64 8,60 Z", S(t, 2.5));
      shape(g, "M48,34 L63,16 H84 V34 Z", WINDOW);
      shape(g, "M90,34 V16 H106 L124,34 Z", WINDOW);
      for (const x of [42, 122]) { circ(g, x, 66, 14, { fill: "var(--stone-s)" }); circ(g, x, 66, 6, { fill: "var(--stone)" }); }
      rect(g, 144, 44, 8, 6, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 1.5 }, 2);
    } },
    "fin.house": { w: 140, h: 120, draw(g, d) {
      const t = d.tone || "teal";
      rect(g, 98, 14, 14, 28, STONE);
      rect(g, 20, 54, 100, 62, STONE);
      shape(g, "M6,58 L70,8 L134,58 Z", S(t, 2.5));
      rect(g, 58, 78, 24, 38, { ...WINDOW, strokeWidth: 1.5 }, 2);
      circ(g, 76, 98, 2, { fill: "var(--stone-s)" });
      rect(g, 30, 70, 20, 20, WINDOW, 2); rect(g, 92, 70, 20, 20, WINDOW, 2);
      line(g, 0, 116, 140, 116, { stroke: K("green"), strokeWidth: 3, strokeLinecap: "round" });
    } },
    // A deposit-insurance shield with a check mark; d.text sets its word (default "FDIC").
    "fin.shield": { w: 90, h: 104, draw(g, d) {
      shape(g, "M45,4 L84,18 V48 C84,74 66,92 45,100 C24,92 6,74 6,48 V18 Z", S("green", 3));
      shape(g, "M27,58 L40,71 L64,44", { fill: "none", stroke: K("green"), strokeWidth: 6, strokeLinecap: "round", strokeLinejoin: "round" });
      txt(g, 45, 36, d.text || "FDIC", "atom-sm");
    } },
    // A credit card with a chip and a masked number.
    "fin.card": { w: 150, h: 96, draw(g, d) {
      const t = d.tone || "violet";
      rect(g, 4, 4, 142, 88, S(t, 2.5), 10);
      rect(g, 4, 20, 142, 14, { fill: K(t), opacity: .35 });
      rect(g, 16, 44, 26, 20, { fill: "var(--seal-f)", stroke: "var(--seal-s)", strokeWidth: 1.5 }, 3);
      line(g, 16, 54, 42, 54, { stroke: "var(--seal-s)", strokeWidth: 1 }); line(g, 29, 44, 29, 64, { stroke: "var(--seal-s)", strokeWidth: 1 });
      txt(g, 16, 82, "•••• •••• •••• 4821", "atom-sm", "start");
      circ(g, 118, 54, 10, { fill: F("red"), stroke: K("red"), strokeWidth: 1.5 });
      circ(g, 130, 54, 10, { fill: F("amber"), stroke: K("amber"), strokeWidth: 1.5, fillOpacity: .8 });
    } },
    "fin.laptop": { w: 150, h: 96, draw(g) {
      rect(g, 20, 4, 110, 72, S("grey", 2.5), 6);
      rect(g, 28, 12, 94, 56, WINDOW, 2);
      shape(g, "M6,80 H144 L136,92 H14 Z", S("grey", 2.5));
      line(g, 62, 80, 88, 80, { stroke: K("grey"), strokeWidth: 3, strokeLinecap: "round" });
    } },
    // A monthly card statement; d.amount is the balance printed on it, d.due the due date.
    "fin.statement": { w: 120, h: 150, draw(g, d) {
      shape(g, "M4,4 H96 L116,24 V146 H4 Z", PAPER);
      shape(g, "M96,4 V24 H116", { ...PAPER, fill: "none" });
      txt(g, 14, 28, "STATEMENT", "doc-title", "start");
      docLines(g, 14, 70, [42, 52]);
      ptxt(g, 14, 76, "Balance", "atom-sm", "start");
      ptxt(g, 106, 98, d.amount || "$1,000", "atom", "end");
      line(g, 14, 108, 106, 108, { stroke: INK, strokeWidth: 1.5 });
      ptxt(g, 14, 128, "Due", "atom-sm", "start");
      ptxt(g, 106, 128, d.due || "in 25 days", "atom-sm", "end");
    } },
    // A paycheck; d.text is the amount (default "$50,000").
    "fin.paycheck": { w: 190, h: 84, draw(g, d) {
      rect(g, 4, 4, 182, 76, PAPER, 4);
      rect(g, 4, 4, 182, 14, { fill: F("green"), stroke: K("green"), strokeWidth: 2 }, 4);
      txt(g, 14, 40, "PAY", "doc-title", "start");
      rect(g, 96, 26, 80, 22, { fill: "none", stroke: INK, strokeWidth: 1.5 }, 3);
      ptxt(g, 170, 42, d.text || "$50,000", "atom-sm", "end");
      docLines(g, 14, 84, [60]);
      shape(g, "M110,66 c6,-10 10,6 16,-2 s10,-6 16,2 s8,-4 14,-2", { fill: "none", stroke: INK, strokeWidth: 1.5 });
      line(g, 104, 70, 176, 70, { stroke: INK, strokeWidth: 1, opacity: .6 });
    } },
    // Tax bracket buckets, drawn to the same scale as the bars that fill them (0.006 px per dollar).
    "fin.bucket10": bucket(60),
    "fin.bucket30": bucket(180),
    "fin.bucketTop": bucket(60)
  });
})();
