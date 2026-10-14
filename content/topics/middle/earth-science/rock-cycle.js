CC.topic({
  id: "rock-cycle",
  level: "middle",
  section: "earth-science",
  order: 3,
  title: "The rock cycle",
  summary: "How rocks melt, cool, wear away and get squeezed, slowly turning from one kind into another.",
  scenes: [
    {
      title: "A slice through the ground",
      elements: {
        cs:     { type: "art", kind: "earth.crossSection", x: 20, y: 70 },
        note:   { type: "text", x: 20, y: 30, cls: "sub", text: "simplified slice, not to scale" },
        cVol:   { type: "callout", from: [104, 186], to: [70, 120], anchor: "middle", text: "Volcano" },
        seaL:   { type: "text", x: 470, y: 248, anchor: "middle", cls: "callout", text: "Sea" },
        magL:   { type: "text", x: 152, y: 362, anchor: "middle", cls: "callout", text: "Magma" },
        cLava:  { type: "callout", from: [152, 118], to: [152, 64], anchor: "middle", text: "Lava cools here" },
        rain:   { type: "art", kind: "earth.rainCloud", x: 250, y: 30, s: 0.75 },
        layL:   { type: "text", x: 425, y: 305, anchor: "middle", cls: "callout", text: "Layers of sediment" },
        metL:   { type: "text", x: 405, y: 397, anchor: "middle", cls: "callout", text: "Squeezed and heated" },
        igS:    { type: "art", kind: "earth.rock", rock: "igneous", x: 575, y: 70, label: "Igneous", sub: "cooled magma", lw: 110 },
        sedS:   { type: "art", kind: "earth.rock", rock: "sediment", x: 690, y: 70, label: "Sediment", sub: "broken bits of rock", lw: 110 },
        stS:    { type: "art", kind: "earth.rock", rock: "sedimentary", x: 690, y: 240, label: "Sedimentary", sub: "pressed layers", lw: 110 },
        metS:   { type: "art", kind: "earth.rock", rock: "metamorphic", x: 575, y: 240, label: "Metamorphic", sub: "changed by heat and pressure", lw: 110 },
        trUp:   { type: "track", d: "M152,340 C150,280 150,200 152,120" },
        trSed:  { type: "track", d: "M210,190 C260,215 330,218 380,226 C410,232 440,262 470,268" },
        trDown: { type: "track", d: "M470,280 L470,330" },
        trMelt: { type: "track", d: "M330,395 C290,400 260,390 240,380" }
      },
      steps: [
        { caption: "Rocks look like they never change, but they do, very slowly. Picture a slice through the ground, with a volcano, the sea and rock underneath.",
          do: [{ show: ["cs", "note"] }, { show: ["cVol", "seaL"], stagger: 250 }] },
        { caption: "Deep underground it's hot enough to melt rock. Melted rock is called magma. When magma cools and hardens, it becomes igneous rock, like granite or basalt.",
          do: [{ show: ["magL"] }, { flow: { along: "trUp", token: "magma", tone: "red", dur: 1600 } }, { show: ["cLava", "igS"] }] },
        { caption: "Rain, wind and ice break rock at the surface into small bits: sand, mud and pebbles. These bits are called sediment, and rivers carry them away to the sea.",
          do: [{ show: ["rain"] }, { flow: { along: "trSed", token: "sand", tone: "amber", count: 3, dur: 1800, gap: 400 } }, { show: ["sedS"] }] },
        { caption: "The sediment settles in layers. Over thousands of years, new layers press down on old ones and cement them together into sedimentary rock, like sandstone.",
          do: [{ show: ["layL"] }, { flow: { along: "trDown", token: "layers", tone: "amber" } }, { show: ["stS"] }] },
        { caption: "Rock buried very deep gets squeezed and heated, but doesn't melt. It changes into metamorphic rock. Shale becomes slate, and limestone becomes marble.",
          do: [{ show: ["metL", "metS"] }, { pulse: "metS" }] },
        { caption: "If rock gets even hotter, it melts back into magma, and the cycle can start all over again.",
          do: [{ flow: { along: "trMelt", token: "melts", tone: "red", dur: 1400 } }, { flow: { along: "trUp", token: "magma", tone: "red", dur: 1600 } }] }
      ]
    },
    {
      title: "The rock cycle",
      enter: "fade",
      elements: {
        ig:   { type: "art", kind: "earth.rock", rock: "igneous", x: 90, y: 150, label: "Igneous" },
        sed:  { type: "art", kind: "earth.rock", rock: "sediment", x: 355, y: 40, label: "Sediment" },
        st:   { type: "art", kind: "earth.rock", rock: "sedimentary", x: 620, y: 150, label: "Sedimentary" },
        met:  { type: "art", kind: "earth.rock", rock: "metamorphic", x: 560, y: 320, label: "Metamorphic" },
        mag:  { type: "art", kind: "earth.rock", rock: "magma", x: 150, y: 320, label: "Magma" },
        short:{ type: "box", x: 290, y: 165, w: 220, h: 110, tone: "grey", label: "Shortcuts", sub: "Any rock can be weathered, squeezed or melted." }
      },
      arrows: {
        a1: { d: "M188,168 C230,110 280,80 345,72", label: { text: "weathering", x: 214, y: 100 } },
        a2: { d: "M455,72 C540,80 600,110 640,144", label: { text: "compaction", x: 656, y: 100 } },
        a3: { d: "M690,250 C690,285 676,306 656,318", label: { text: "heat and pressure", x: 600, y: 290 } },
        a4: { d: "M552,356 C460,380 340,380 248,356", label: { text: "melting", x: 400, y: 400 } },
        a5: { d: "M190,316 C170,290 140,270 136,250", label: { text: "cooling", x: 118, y: 300 } }
      },
      steps: [
        { caption: "Put it all together and you get the rock cycle. Magma cools into igneous rock, which wears down into sediment, which is pressed into sedimentary rock.",
          do: [{ show: ["mag", "a5", "ig", "a1", "sed", "a2", "st"], stagger: 250 }] },
        { caption: "Heat and pressure turn it into metamorphic rock, and melting turns that back into magma. Each change usually takes thousands to millions of years.",
          do: [{ show: ["a3", "met", "a4"], stagger: 300 }] },
        { caption: "The cycle has shortcuts too. Any kind of rock can be broken into sediment, changed by heat and pressure, or melted.",
          do: [{ show: ["short"] }] }
      ]
    }
  ]
});
