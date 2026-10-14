CC.topic({
  id: "printing-press",
  level: "middle",
  section: "history",
  order: 2,
  title: "How the printing press spread ideas",
  summary: "How Gutenberg's printing press made books fast and cheap, and helped new ideas spread across Europe.",
  scenes: [
    {
      title: "Copying by hand",
      elements: {
        scribe: { type: "art", kind: "hist.scribe", x: 50, y: 90, s: 1.6, label: "A scribe", sub: "copying a book by hand, letter by letter", lw: 320 },
        slow:   { type: "box", x: 430, y: 100, w: 330, h: 96, tone: "amber", label: "One book: months of work", sub: "and every new copy took as long again" },
        rare:   { type: "box", x: 430, y: 230, w: 330, h: 96, tone: "grey", label: "Books were rare", sub: "so costly that few people owned one" }
      },
      steps: [
        { caption: "Before the 1450s, every book in Europe was copied by hand. Scribes, many of them monks, wrote out each page with a pen and ink.",
          do: [{ show: ["scribe"] }] },
        { caption: "Copying one long book could take a scribe months. Making a second copy took months more.",
          do: [{ show: ["slow"] }] },
        { caption: "So books were rare and very expensive. Most people never owned one, and few learned to read.",
          do: [{ show: ["rare"] }] }
      ]
    },
    {
      title: "Gutenberg's press",
      enter: "slide",
      elements: {
        guten: { type: "art", kind: "person", tone: "violet", x: 120, y: 40, label: "Johannes Gutenberg", sub: "a goldsmith in Mainz, Germany", lw: 230 },
        t1:    { type: "art", kind: "hist.type", text: "S", x: 40, y: 260, s: 1.3 },
        t2:    { type: "art", kind: "hist.type", text: "A", x: 88, y: 260, s: 1.3 },
        t3:    { type: "art", kind: "hist.type", text: "E", x: 136, y: 260, s: 1.3 },
        t4:    { type: "art", kind: "hist.type", text: "D", x: 184, y: 260, s: 1.3 },
        t5:    { type: "art", kind: "hist.type", text: "I", x: 232, y: 260, s: 1.3 },
        typeL: { type: "text", x: 158, y: 345, anchor: "middle", cls: "artlbl", text: "Movable type" },
        typeS: { type: "text", x: 158, y: 364, anchor: "middle", cls: "sub", text: "each letter is cast backwards" },
        ink:   { type: "art", kind: "hist.inkBall", x: 240, y: 175, s: .9 },
        press: { type: "art", kind: "hist.press", x: 340, y: 50, s: 1.4, label: "Screw press" },
        page3: { type: "art", kind: "hist.page", x: 676, y: 66 },
        page2: { type: "art", kind: "hist.page", x: 666, y: 58 },
        page:  { type: "art", kind: "hist.page", text: "IDEAS", x: 656, y: 50, label: "Printed pages", lx: 10, ly: 18 },
        bible: { type: "box", x: 600, y: 250, w: 180, h: 110, tone: "amber", label: "Gutenberg Bible", sub: "printed around 1455, about 180 copies" },
        trIn:  { type: "track", d: "M158,250 C220,170 330,250 450,262" },
        trOut: { type: "track", d: "M560,262 C600,262 620,150 690,110" }
      },
      steps: [
        { caption: "Around 1440, a German goldsmith named Johannes Gutenberg began working on a faster way to make books. By about 1450 he was printing in Mainz.",
          do: [{ show: ["guten"] }] },
        { caption: "He cast small metal blocks, each with one raised letter. They could be lined up to spell any words, then reused. This is movable type.",
          do: [{ show: ["t1", "t2", "t3", "t4", "t5"], stagger: 150 }, { show: ["typeL"] }] },
        { caption: "Each letter is cast backwards, because printing flips it. These blocks will print the word IDEAS.",
          do: [{ show: ["typeS"] }, { pulse: "t3" }] },
        { caption: "Workers dabbed ink onto the letters with leather ink balls.",
          do: [{ show: ["ink"] }, { move: { id: "ink", by: [-100, 32], dur: 700 } }, { move: { id: "ink", by: [100, -32], dur: 700 } }] },
        { caption: "A big screw press then squeezed a sheet of paper down hard onto the inked type, printing a whole page at once.",
          do: [{ show: ["press"] }, { flow: { along: "trIn", token: "type", tone: "grey", dur: 1300 } }, { pulse: "press" }] },
        { caption: "Ink, paper, press, repeat. A print shop could make hundreds of identical pages in the time a scribe wrote one.",
          do: [{ flow: { along: "trOut", icon: "doc", tone: "amber", count: 3, gap: 400 } }, { show: ["page3", "page2", "page"], stagger: 200 }] },
        { caption: "Gutenberg's famous Bible, printed around 1455, came out in about 180 copies. A scribe would have needed a lifetime to copy that many.",
          do: [{ show: ["bible"] }] }
      ]
    },
    {
      title: "Ideas spread fast",
      enter: "slide",
      elements: {
        map:    { type: "art", kind: "hist.mapEurope", layer: "back", x: 20, y: 20 },
        note:   { type: "text", x: 780, y: 440, anchor: "end", cls: "tick", text: "simplified map, not to scale" },
        c1:  { type: "point", px: true, at: [221, 272], tone: "amber", r: 5 },
        c2:  { type: "point", px: true, at: [223, 326], tone: "amber", r: 5 },
        c3:  { type: "point", px: true, at: [139, 220], tone: "amber", r: 5 },
        c4:  { type: "point", px: true, at: [159, 267], tone: "amber", r: 5 },
        c5:  { type: "point", px: true, at: [184, 224], tone: "amber", r: 5 },
        c6:  { type: "point", px: true, at: [177, 186], tone: "amber", r: 5 },
        c7:  { type: "point", px: true, at: [182, 241], tone: "amber", r: 5 },
        c8:  { type: "point", px: true, at: [211, 211], tone: "amber", r: 5 },
        c9:  { type: "point", px: true, at: [156, 182], tone: "amber", r: 5 },
        c10: { type: "point", px: true, at: [118, 180], tone: "amber", r: 5 },
        c11: { type: "point", px: true, at: [70, 394], tone: "amber", r: 5 },
        c12: { type: "point", px: true, at: [284, 201], tone: "amber", r: 5 },
        c13: { type: "point", px: true, at: [213, 297], tone: "amber", r: 5 },
        c14: { type: "point", px: true, at: [195, 271], tone: "amber", r: 5 },
        c15: { type: "point", px: true, at: [238, 342], tone: "amber", r: 5 },
        c16: { type: "point", px: true, at: [208, 144], tone: "amber", r: 5 },
        c17: { type: "point", px: true, at: [116, 362], tone: "amber", r: 5 },
        c18: { type: "point", px: true, at: [138, 333], tone: "amber", r: 5 },
        mainz:  { type: "point", px: true, at: [188, 202], tone: "violet", r: 7, label: "Mainz", lx: -10, ly: 5, anchor: "end" },
        witt:   { type: "point", px: true, at: [224, 172], tone: "red", r: 7, label: "Wittenberg", lx: 10, ly: -8, anchor: "start" },
        lg1:    { type: "text", x: 520, y: 50, cls: "legend", swatch: "violet", text: "Mainz, where it began" },
        lg2:    { type: "text", x: 520, y: 76, cls: "legend", swatch: "amber", text: "some towns with a press by 1500" },
        many:   { type: "box", x: 520, y: 104, w: 260, h: 84, tone: "amber", label: "Millions of books", sub: "printed in Europe by 1500" },
        luther: { type: "box", x: 520, y: 210, w: 260, h: 96, tone: "red", label: "Luther, 1517", sub: "his printed writings spread across Germany within weeks" },
        coper:  { type: "box", x: 520, y: 328, w: 260, h: 96, tone: "sky", label: "Copernicus, 1543", sub: "a printed book arguing that Earth moves around the Sun" },
        w1: { type: "track", d: "M224,172 L208,144" },
        w2: { type: "track", d: "M224,172 L284,201" },
        w3: { type: "track", d: "M224,172 L177,186" },
        w4: { type: "track", d: "M224,172 L211,211" },
        w5: { type: "track", d: "M224,172 L184,224" }
      },
      steps: [
        { caption: "Printers trained helpers, who opened shops of their own. By 1500, presses were working in more than 250 towns across Europe.",
          do: [{ show: ["map", "note"] }, { show: ["mainz", "lg1"] }, { pulse: "mainz" },
               { show: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18"], stagger: 80 }, { show: ["lg2"] }] },
        { caption: "Together they printed millions of books. Books became much cheaper, and more people learned to read.",
          do: [{ show: ["many"] }] },
        { caption: "New ideas could now spread fast. In 1517 Martin Luther, in Wittenberg, criticized the Church. Printed copies of his writings spread across Germany within weeks.",
          do: [{ show: ["witt"] }, { all: [
            { flow: { along: "w1", icon: "doc", tone: "red" } }, { flow: { along: "w2", icon: "doc", tone: "red" } }, { flow: { along: "w3", icon: "doc", tone: "red" } },
            { flow: { along: "w4", icon: "doc", tone: "red" } }, { flow: { along: "w5", icon: "doc", tone: "red" } }] }, { show: ["luther"] }] },
        { caption: "Scientists shared discoveries in print too. Because printed copies were identical, readers everywhere could study and check the same ideas.",
          do: [{ show: ["coper"] }] }
      ]
    }
  ]
});
