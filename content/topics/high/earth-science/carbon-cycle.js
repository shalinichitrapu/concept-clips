CC.topic({
  id: "carbon-cycle",
  level: "high",
  section: "earth-science",
  order: 3,
  title: "The carbon cycle",
  summary: "How carbon moves between the air, living things, the ocean and rocks, and how burning fossil fuels tips the balance.",
  scenes: [
    {
      title: "Carbon through living things",
      elements: {
        soil:  { type: "art", kind: "soil", layer: "back", x: 0, y: 320 },
        air:   { type: "art", kind: "cloud", text: "CO₂", x: 330, y: 16, s: 1.1 },
        airL:  { type: "text", x: 496, y: 64, cls: "callout", text: "Carbon dioxide in the air" },
        tree:  { type: "art", kind: "earth.tree", x: 60, y: 140, s: 2 },
        cow:   { type: "art", kind: "earth.cow", x: 250, y: 248, s: 0.9 },
        log:   { type: "art", kind: "earth.log", x: 440, y: 264 },
        cTree: { type: "callout", from: [120, 300], to: [40, 360], anchor: "middle", text: "Plants" },
        cCow:  { type: "callout", from: [300, 310], to: [300, 360], anchor: "middle", text: "Animals" },
        cLog:  { type: "callout", from: [490, 316], to: [500, 360], anchor: "middle", text: "Decomposers (fungi, bacteria)" },
        note:  { type: "box", x: 626, y: 140, w: 154, h: 150, tone: "green", label: "Fast cycle", sub: "Carbon moves through living things in days to decades." }
      },
      arrows: {
        aPh:   { d: "M328,62 C250,56 170,74 136,138", label: { text: "photosynthesis", x: 222, y: 48 } },
        aEat:  { d: "M182,236 C214,236 236,250 254,266", label: { text: "eating", x: 210, y: 224 } },
        aResp: { d: "M330,246 C340,200 366,150 384,104", label: { text: "respiration", x: 300, y: 180 } },
        aDie:  { d: "M352,296 C380,292 410,292 444,294", label: { text: "dead remains", x: 400, y: 280 } },
        aDec:  { d: "M520,256 C520,200 490,140 452,104", label: { text: "decomposition", x: 560, y: 200 } }
      },
      steps: [
        { caption: "Carbon is in every living thing, and it keeps moving between the air, living things, the ocean and rocks. In the air, it's mostly carbon dioxide, CO₂.",
          do: [{ show: ["soil"] }, { show: ["air", "airL"] }, { pulse: "air" }] },
        { caption: "Plants take in CO₂ and use the energy of sunlight to build it into sugar. This is photosynthesis, and it's how carbon enters the living world.",
          do: [{ show: ["tree", "cTree"] }, { show: ["aPh"] }, { flow: { along: "aPh", token: "CO₂", tone: "grey", count: 2 } }] },
        { caption: "Animals get their carbon by eating plants, or by eating animals that ate plants.",
          do: [{ show: ["cow", "cCow"] }, { show: ["aEat"] }, { flow: { along: "aEat", token: "C", tone: "green" } }] },
        { caption: "Living things break sugar down for energy and breathe the carbon back out as CO₂. This is cellular respiration, and plants do it too.",
          do: [{ show: ["aResp"] }, { flow: { along: "aResp", token: "CO₂", tone: "grey", count: 2 } }] },
        { caption: "When plants and animals die, decomposers such as fungi and bacteria feed on the remains and release their carbon as CO₂ as well.",
          do: [{ show: ["aDie", "log", "cLog"] }, { show: ["aDec"] }, { flow: { along: "aDec", token: "CO₂", tone: "grey", count: 2 } }, { show: ["note"] }] }
      ]
    },
    {
      title: "Ocean and fossil fuels",
      enter: "slide",
      elements: {
        soil:    { type: "art", kind: "soil", layer: "back", x: 0, y: 320, visible: true },
        sea:     { type: "art", kind: "earth.sea", layer: "back", x: 440, y: 304 },
        air:     { type: "art", kind: "cloud", text: "CO₂", x: 330, y: 16, s: 1.1, visible: true },
        airL:    { type: "text", x: 322, y: 64, anchor: "end", cls: "callout", text: "Carbon dioxide in the air", visible: true },
        seaL:    { type: "text", x: 780, y: 432, anchor: "end", cls: "callout", text: "Ocean" },
        plants:  { type: "art", kind: "earth.tree", x: 40, y: 203, s: 1.3 },
        plantsL: { type: "text", x: 40, y: 190, cls: "callout", text: "Ancient forests and sea life" },
        fossil:  { type: "art", kind: "earth.fossil", x: 40, y: 392 },
        fossilL: { type: "text", x: 220, y: 418, anchor: "middle", cls: "callout", text: "Coal, oil and gas" },
        plant:   { type: "art", kind: "earth.factory", x: 260, y: 180 },
        plantL:  { type: "text", x: 252, y: 304, anchor: "end", cls: "callout", text: "Power plant" }
      },
      arrows: {
        oIn:   { d: "M484,58 C600,58 680,160 680,300", label: { text: "absorbed", x: 728, y: 170 } },
        oOut:  { d: "M560,300 C560,220 520,140 470,100", label: { text: "released", x: 500, y: 240 } },
        bury:  { d: "M72,322 C72,350 84,372 104,388", label: { text: "buried for millions of years", x: 230, y: 356 } },
        dig:   { d: "M372,390 C384,370 384,344 372,322", label: { text: "extracted", x: 420, y: 350 } },
        burn:  { d: "M376,184 C386,160 396,130 404,104", label: { text: "burning", x: 430, y: 160 } }
      },
      steps: [
        { caption: "The ocean trades CO₂ with the air. CO₂ dissolves into seawater, and some comes back out. Sea life uses the dissolved carbon to build bodies and shells.",
          do: [{ show: ["sea", "seaL"] }, { show: ["oIn"] }, { flow: { along: "oIn", token: "CO₂", tone: "grey", count: 2 } }, { show: ["oOut"] }, { flow: { along: "oOut", token: "CO₂", tone: "grey" } }] },
        { caption: "Long ago, some dead plants and sea creatures were buried before they could decay. Over millions of years, heat and pressure turned them into coal, oil and natural gas.",
          do: [{ show: ["plants", "plantsL"] }, { show: ["bury"] }, { flow: { along: "bury", token: "C", tone: "green", dur: 1600 } }, { show: ["fossil", "fossilL"] }] },
        { caption: "These fossil fuels held their carbon underground for millions of years. Burning them in power plants, cars and factories releases it as CO₂ in a matter of decades.",
          do: [{ show: ["dig", "plant", "plantL"] }, { show: ["burn"] }, { flow: { along: "burn", token: "CO₂", tone: "grey", count: 3 } }] }
      ]
    },
    {
      title: "Out of balance",
      enter: "fade",
      elements: {
        title:  { type: "text", x: 40, y: 60, cls: "eqlabel", text: "WHERE THE CO₂ WE ADD ENDS UP" },
        mAir:   { type: "meter", x: 40, y: 130, w: 420, total: 100, label: "Stays in the air", format: "about {v}%", tone: "grey" },
        mSea:   { type: "meter", x: 40, y: 210, w: 420, total: 100, label: "Absorbed by the ocean", format: "about {v}%", tone: "blue" },
        mLand:  { type: "meter", x: 40, y: 290, w: 420, total: 100, label: "Taken up by plants and soils", format: "about {v}%", tone: "green" },
        acid:   { type: "text", x: 40, y: 350, cls: "sub", text: "Extra CO₂ in seawater also makes the ocean more acidic." },
        tonnes: { type: "box", x: 520, y: 70, w: 260, h: 140, tone: "amber", label: "37 billion tonnes", sub: "of CO₂ from fossil fuels in 2024, roughly 100 times what all volcanoes release" },
        take:   { type: "box", x: 520, y: 240, w: 260, h: 150, tone: "red", label: "Out of balance", sub: "Carbon stored over millions of years is coming out in about two centuries." }
      },
      steps: [
        { caption: "Naturally, the flows in and out of the air roughly balance, so CO₂ stayed steady for thousands of years. Burning fossil fuels now adds about 37 billion tonnes of CO₂ a year.",
          do: [{ show: ["tonnes"] }, { pulse: "tonnes" }] },
        { caption: "The ocean and land plants soak up roughly half of the CO₂ we add. The other half stays in the air, so the amount keeps rising year after year.",
          do: [{ show: ["title", "mSea", "mLand"] }, { all: [{ meter: { id: "mSea", value: 25 } }, { meter: { id: "mLand", value: 25 } }] }, { show: ["mAir"] }, { meter: { id: "mAir", value: 50 } }, { show: ["acid"] }] },
        { caption: "Carbon that took millions of years to lock away is being released in about two centuries, much faster than the cycle can take it back. That's why CO₂ keeps building up.",
          do: [{ show: ["take"] }] }
      ]
    }
  ]
});
