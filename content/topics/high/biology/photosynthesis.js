CC.topic({
  id: "photosynthesis",
  level: "high",
  section: "biology",
  order: 1,
  title: "Photosynthesis",
  summary: "How a plant turns water, air and light into food, from the whole plant down to the chloroplast.",
  scenes: [
    {
      title: "The whole plant",
      elements: {
        soil:    { type: "art", kind: "soil", x: 0, y: 320, drops: [[70, 40], [180, 85], [300, 90], [250, 40], [540, 55], [650, 95], [720, 40], [580, 105]] },
        plant:   { type: "art", kind: "bio.plant", x: 300, y: 120 },
        sun:     { type: "art", kind: "sun", x: 40, y: 30, s: 1.2, label: "Sunlight" },
        air:     { type: "art", kind: "cloud", text: "CO₂", x: 600, y: 56, s: 1.2, label: "Air", sub: "contains carbon dioxide" },
        cLeaf:   { type: "callout", from: [468, 238], to: [530, 272], text: "Leaf" },
        cStem:   { type: "callout", from: [403, 292], to: [460, 302], text: "Stem" },
        cRoots:  { type: "callout", from: [428, 392], to: [480, 400], text: "Roots" },
        tWater:  { type: "text", x: 40, y: 432, cls: "callout", text: "Water in the soil" },
        ring:    { type: "ring", x: 442, y: 235, r: 62, tone: "green" },
        trWater: { type: "track", d: "M300,410 C360,410 396,380 400,330 L400,256 C410,244 425,238 445,236" },
        trCO2:   { type: "track", d: "M650,165 C600,200 520,228 470,232" },
        trLight: { type: "track", d: "M120,100 C220,150 330,200 430,230" }
      },
      steps: [
        { caption: "A plant makes its own food, and it does it in its leaves. It needs three things.",
          do: [{ show: ["soil", "plant"] }, { show: ["cLeaf", "cStem", "cRoots"], stagger: 200 }] },
        { caption: "First, water. The roots soak it up from the soil, and the stem carries it up to the leaves.",
          do: [{ show: ["tWater"] }, { flow: { along: "trWater", token: "H₂O", tone: "blue", count: 3, dur: 1800 } }] },
        { caption: "Second, carbon dioxide. It comes from the air and enters the leaf through tiny pores.",
          do: [{ show: ["air"] }, { flow: { along: "trCO2", token: "CO₂", tone: "grey", count: 3 } }] },
        { caption: "Third, energy. Sunlight falls on the leaf.",
          do: [{ show: ["sun"] }, { flow: { along: "trLight", token: "light", tone: "yellow", count: 3 } }] },
        { caption: "All three meet inside the leaf. Let's zoom in to see where.",
          do: [{ show: ["ring"] }, { pulse: "ring" }] }
      ]
    },
    {
      title: "Inside a leaf cell",
      enter: "zoom",
      zoomInto: [442, 235],
      elements: {
        cell:   { type: "art", kind: "bio.plantCell", x: 40, y: 60 },
        chloro: { type: "art", kind: "bio.chloroplast", x: 247, y: 302 },
        cWall:  { type: "callout", from: [110, 64], to: [124, 40], text: "Cell wall" },
        cNuc:   { type: "callout", from: [408, 140], to: [520, 100], text: "Nucleus" },
        cVac:   { type: "callout", from: [320, 200], to: [520, 172], text: "Vacuole: stores water" },
        cChl:   { type: "callout", from: [300, 316], to: [520, 246], text: "Chloroplasts" },
        pig:    { type: "box", x: 510, y: 290, w: 260, h: 110, tone: "green", label: "Chlorophyll", sub: "the green pigment that captures light. It's why leaves look green." }
      },
      steps: [
        { caption: "Zoom into a leaf and you find it's made of cells. Each one has a stiff cell wall, a nucleus, and a vacuole that stores water.",
          do: [{ show: ["cell"] }, { show: ["cWall", "cNuc", "cVac"], stagger: 250 }] },
        { caption: "Each cell is also packed with small green chloroplasts. This is where photosynthesis happens.",
          do: [{ show: ["chloro", "cChl"] }, { pulse: "chloro" }] },
        { caption: "Chloroplasts are green because they hold chlorophyll, a pigment that captures light energy.",
          do: [{ show: ["pig"] }] }
      ]
    },
    {
      title: "Inside a chloroplast",
      enter: "zoom",
      zoomInto: [275, 318],
      elements: {
        big:     { type: "art", kind: "bio.chloroplastBig", x: 210, y: 110 },
        cThy:    { type: "callout", from: [395, 178], to: [420, 86], text: "Thylakoids (hold chlorophyll)" },
        cStr:    { type: "callout", from: [300, 290], to: [330, 372], text: "Stroma (where sugar is built)" },
        sun:     { type: "art", kind: "sun", x: 40, y: 30, s: 0.9, label: "Light" },
        water:   { type: "art", kind: "drop", x: 50, y: 190, label: "Water" },
        co2:     { type: "art", kind: "co2", x: 30, y: 326, label: "Carbon dioxide" },
        o2:      { type: "art", kind: "o2", x: 660, y: 80, label: "Oxygen" },
        glu:     { type: "art", kind: "glucose", x: 655, y: 290, label: "Glucose" },
        eq:      { type: "text", x: 400, y: 434, anchor: "middle", cls: "eq", text: "6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂" },
        trLight: { type: "track", d: "M100,80 C200,110 330,160 385,182" },
        trWater: { type: "track", d: "M95,220 C160,225 260,230 355,215" },
        trO2:    { type: "track", d: "M400,175 C480,120 600,100 655,98" },
        trCO2:   { type: "track", d: "M125,344 C220,340 330,300 420,275" },
        trGlu:   { type: "track", d: "M440,280 C520,300 590,322 650,322" }
      },
      steps: [
        { caption: "Zoom into one chloroplast. Inside are stacks of flat discs called thylakoids, which hold the chlorophyll. The fluid around them is the stroma.",
          do: [{ show: ["big"] }, { show: ["cThy", "cStr"], stagger: 300 }] },
        { caption: "Light hits the thylakoids, and the chlorophyll captures its energy.",
          do: [{ show: ["sun"] }, { flow: { along: "trLight", token: "light", tone: "yellow", count: 3 } }] },
        { caption: "That energy splits water apart. The oxygen from the water is left over, and the leaf releases it into the air.",
          do: [{ show: ["water"] }, { flow: { along: "trWater", token: "H₂O", tone: "blue", count: 2 } }, { show: ["o2"] }, { flow: { along: "trO2", token: "O₂", tone: "sky", count: 2 } }] },
        { caption: "In the stroma, the stored energy turns carbon dioxide into glucose, a sugar the plant uses for food and to grow.",
          do: [{ show: ["co2"] }, { flow: { along: "trCO2", token: "CO₂", tone: "grey", count: 2 } }, { show: ["glu"] }, { flow: { along: "trGlu", token: "glucose", tone: "amber" } }] },
        { caption: "In one line: carbon dioxide, water and light become glucose and oxygen.",
          do: [{ show: ["eq"] }] }
      ]
    }
  ]
});
