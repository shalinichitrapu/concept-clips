CC.topic({
  id: "how-vaccines-work",
  level: "high",
  section: "biology",
  order: 3,
  title: "How vaccines train the immune system",
  summary: "How a harmless preview of a virus teaches B cells to make antibodies and memory cells, so the real infection meets a fast response.",
  scenes: [
    {
      title: "The virus",
      elements: {
        virus:  { type: "art", kind: "bio.virus", x: 60, y: 80, s: 1.7 },
        cGen:   { type: "callout", from: [179, 250], to: [420, 330], text: "Genetic material (RNA or DNA)" },
        cCoat:  { type: "callout", from: [275, 237], to: [420, 250], text: "Protein coat" },
        cSpike: { type: "callout", from: [295, 159], to: [420, 160], text: "Spike proteins" },
        card:   { type: "box", x: 470, y: 24, w: 300, h: 100, tone: "amber", label: "Antigen", sub: "a molecule the immune system recognizes as foreign, like a spike protein" }
      },
      steps: [
        { caption: "A virus is genetic material wrapped in a protein coat. It can't copy itself, so it gets into your cells and makes them build new viruses.",
          do: [{ show: ["virus"] }, { show: ["cGen", "cCoat"], stagger: 250 }] },
        { caption: "Many viruses, including the one that causes COVID-19, are studded with spike proteins. The virus uses them to latch onto your cells.",
          do: [{ show: ["cSpike"] }, { pulse: "virus" }] },
        { caption: "Your immune system recognizes invaders by molecules like these spikes, called antigens. The first time it meets a new antigen, it needs one to two weeks to respond.",
          do: [{ show: ["card"] }] }
      ]
    },
    {
      title: "A harmless preview",
      enter: "slide",
      elements: {
        syr:  { type: "art", kind: "bio.syringe", x: 30, y: 140, s: 1.2, label: "Vaccine" },
        s1:   { type: "art", kind: "bio.spike", x: 296, y: 110, s: 1.6 },
        s2:   { type: "art", kind: "bio.spike", x: 366, y: 142, s: 1.6 },
        s3:   { type: "art", kind: "bio.spike", x: 430, y: 100, s: 1.6 },
        sL:   { type: "text", x: 380, y: 250, anchor: "middle", cls: "callout", text: "spike proteins, no working virus" },
        k1:   { type: "box", x: 520, y: 40, w: 250, h: 100, tone: "grey", label: "Inactivated virus", sub: "a killed virus that can't infect" },
        k2:   { type: "box", x: 520, y: 160, w: 250, h: 100, tone: "amber", label: "Protein subunit", sub: "only the spike protein, made in a lab" },
        k3:   { type: "box", x: 520, y: 280, w: 250, h: 130, tone: "sky", label: "mRNA", sub: "instructions your cells use to make the spike for a few days" },
        trIn: { type: "track", d: "M260,170 C290,170 320,160 380,170" }
      },
      steps: [
        { caption: "A vaccine gives your immune system a preview of the antigen, without a working virus that could make you sick.",
          do: [{ show: ["syr"] }, { flow: { along: "trIn", token: "vaccine", tone: "sky" } }, { show: ["s1", "s2", "s3"], stagger: 150 }, { show: ["sL"] }] },
        { caption: "Vaccines deliver the preview in different ways. Some contain a killed virus. Others contain only the spike protein.",
          do: [{ show: ["k1"] }, { show: ["k2"] }] },
        { caption: "mRNA vaccines carry instructions, and your own cells briefly make the spike. The mRNA never enters the nucleus and can't change your DNA.",
          do: [{ show: ["k3"] }] }
      ]
    },
    {
      title: "Training B cells",
      enter: "fade",
      elements: {
        sp:   { type: "art", kind: "bio.spike", x: 50, y: 50, s: 1.3, label: "Spike", sub: "the antigen", lw: 100 },
        bA:   { type: "art", kind: "bio.bcell", cup: "v", tone: "teal", x: 200, y: 30, label: "Fits" },
        bB:   { type: "art", kind: "bio.bcell", cup: "square", tone: "sky", x: 380, y: 30, label: "Doesn't fit" },
        bC:   { type: "art", kind: "bio.bcell", cup: "flat", tone: "violet", x: 560, y: 30, label: "Doesn't fit" },
        pl:   { type: "art", kind: "bio.bcell", cup: "v", tone: "teal", plasma: true, x: 40, y: 270, label: "Plasma cell", sub: "releases antibodies" },
        vir:  { type: "art", kind: "bio.virus", x: 300, y: 280, s: 0.6, label: "Virus, blocked" },
        ab1:  { type: "art", kind: "bio.antibody", dir: "down", x: 328, y: 252 },
        ab2:  { type: "art", kind: "bio.antibody", dir: "left", x: 388, y: 308 },
        ab3:  { type: "art", kind: "bio.antibody", dir: "right", x: 268, y: 308 },
        mem:  { type: "art", kind: "bio.bcell", cup: "v", tone: "teal", memory: true, x: 600, y: 270, label: "Memory B cell", sub: "stays for years" },
        trAb: { type: "track", d: "M160,330 C200,300 240,300 290,320" }
      },
      arrows: {
        toP: { d: "M222,150 C190,200 150,230 120,262", label: { text: "divides", x: 150, y: 210 } },
        toM: { d: "M300,150 C360,240 560,220 640,262", label: { text: "divides", x: 470, y: 222 } }
      },
      steps: [
        { caption: "You have millions of different B cells, each with its own receptor shape. Only a few have receptors that fit this spike.",
          do: [{ show: ["sp"] }, { show: ["bA", "bB", "bC"], stagger: 250 }] },
        { caption: "The B cell that fits is switched on, with help from helper T cells. It divides again and again, making many copies of itself.",
          do: [{ pulse: "bA" }, { show: ["toP", "toM"] }] },
        { caption: "Some copies become plasma cells, which release huge numbers of antibodies. Antibodies stick to the spikes, blocking the virus and marking it for destruction.",
          do: [{ show: ["pl", "vir"] }, { flow: { along: "trAb", art: "bio.antibody", s: 0.8, count: 3 } }, { show: ["ab1", "ab2", "ab3"] }] },
        { caption: "Other copies become memory B cells. They can last for years, still carrying receptors that fit the spike.",
          do: [{ show: ["mem"] }, { pulse: "mem" }] }
      ]
    },
    {
      title: "The second time",
      enter: "fade",
      elements: {
        ax:   { type: "path", px: true, pts: [[80, 60], [80, 380], [760, 380]], tone: "grey", w: 2 },
        br1:  { type: "path", px: true, pts: [[397, 390], [405, 370]], tone: "grey", w: 2 },
        br2:  { type: "path", px: true, pts: [[407, 390], [415, 370]], tone: "grey", w: 2 },
        yL:   { type: "text", x: 90, y: 50, cls: "eqlabel", text: "ANTIBODY LEVEL IN THE BLOOD" },
        x0:   { type: "text", x: 110, y: 400, anchor: "middle", cls: "tick", text: "day 0" },
        x1:   { type: "text", x: 201, y: 400, anchor: "middle", cls: "tick", text: "2 weeks" },
        x2:   { type: "text", x: 292, y: 400, anchor: "middle", cls: "tick", text: "4 weeks" },
        x3:   { type: "text", x: 440, y: 400, anchor: "middle", cls: "tick", text: "day 0" },
        x4:   { type: "text", x: 531, y: 400, anchor: "middle", cls: "tick", text: "2 weeks" },
        x5:   { type: "text", x: 622, y: 400, anchor: "middle", cls: "tick", text: "4 weeks" },
        gap:  { type: "text", x: 406, y: 424, anchor: "middle", cls: "tick", text: "months or years later" },
        v1:   { type: "path", px: true, pts: [[110, 380], [110, 76]], tone: "violet", w: 3, dashed: true },
        v2:   { type: "path", px: true, pts: [[440, 380], [440, 76]], tone: "red", w: 3, dashed: true },
        t1:   { type: "text", x: 118, y: 84, cls: "legend", text: "1st exposure: vaccine" },
        t2:   { type: "text", x: 448, y: 84, cls: "legend", text: "2nd exposure: the real virus" },
        c1:   { type: "path", px: true, pts: [[110, 380], [123, 380], [136, 380], [149, 368], [162, 350], [175, 334], [188, 324], [201, 320], [214, 322], [227, 326], [240, 331], [253, 337], [266, 343], [279, 348], [292, 352], [305, 356], [318, 359], [331, 361], [344, 363], [357, 365], [370, 366]], tone: "teal", w: 4 },
        c2:   { type: "path", px: true, pts: [[440, 369], [446, 369], [453, 341], [460, 285], [466, 227], [472, 179], [479, 146], [486, 128], [492, 122], [498, 127], [505, 134], [518, 148], [531, 163], [550, 186], [570, 207], [596, 233], [622, 255], [654, 279], [687, 299], [726, 318]], tone: "teal", w: 4 },
        k1:   { type: "text", x: 201, y: 306, anchor: "middle", cls: "seg-label", tone: "teal", text: "slow and small" },
        k2:   { type: "text", x: 506, y: 116, cls: "seg-label", tone: "teal", text: "fast and strong" },
        why:  { type: "box", x: 130, y: 120, w: 250, h: 120, tone: "green", label: "Why it works", sub: "Memory cells make the response so fast that the virus is often stopped early." },
        note: { type: "text", x: 770, y: 440, anchor: "end", cls: "sub", text: "Illustrative curves, not real data" }
      },
      steps: [
        { caption: "Here's the whole story as a graph of antibody levels in the blood over time.",
          do: [{ show: ["ax", "br1", "br2", "yL", "x0", "x1", "x2", "x3", "x4", "x5", "gap", "note"] }] },
        { caption: "After the vaccine, antibodies take one to two weeks to build up, then slowly fade. But the memory B cells stay.",
          do: [{ show: ["v1", "t1"] }, { show: ["c1"] }, { show: ["k1"] }] },
        { caption: "Months or years later, the real virus arrives. Memory cells recognize the spike right away, and antibodies rise within days, much higher than before.",
          do: [{ show: ["v2", "t2"] }, { show: ["c2"] }, { show: ["k2"] }] },
        { caption: "That's how a vaccine protects you: the second response is faster and stronger, so the infection is often stopped before it can make you seriously ill.",
          do: [{ show: ["why"] }, { pulse: "why" }] }
      ]
    }
  ]
});
