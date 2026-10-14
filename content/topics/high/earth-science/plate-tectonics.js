CC.topic({
  id: "plate-tectonics",
  level: "high",
  section: "earth-science",
  order: 1,
  title: "Plate tectonics",
  summary: "How Earth's outer shell is broken into moving plates, and what happens where they pull apart, collide or slide past.",
  scenes: [
    {
      title: "Inside Earth",
      elements: {
        earth:  { type: "art", kind: "earth.interior", x: 40, y: 60, s: 1.2 },
        note:   { type: "text", x: 220, y: 440, anchor: "middle", cls: "sub", text: "layers to scale, except the crust" },
        cCrust: { type: "callout", from: [336, 124], to: [440, 86], text: "Crust" },
        sCrust: { type: "text", x: 446, y: 108, cls: "sub", text: "solid rock, 5–70 km thick" },
        cMan:   { type: "callout", from: [329, 177], to: [440, 166], text: "Mantle" },
        sMan:   { type: "text", x: 446, y: 188, cls: "sub", text: "hot solid rock, down to 2,900 km" },
        cOut:   { type: "callout", from: [279, 219], to: [440, 246], text: "Outer core" },
        sOut:   { type: "text", x: 446, y: 268, cls: "sub", text: "liquid iron and nickel, down to 5,150 km" },
        cIn:    { type: "callout", from: [232, 230], to: [440, 326], text: "Inner core" },
        sIn:    { type: "text", x: 446, y: 348, cls: "sub", text: "solid iron and nickel, about 5,200 °C" }
      },
      steps: [
        { caption: "The deepest hole ever drilled reaches about 12 km, under 0.2% of the way to Earth's centre. We know what's inside mostly from how earthquake waves travel through it.",
          do: [{ show: ["earth", "note"] }] },
        { caption: "The outer layer, the crust, is a thin shell of solid rock. Below it is the mantle: solid rock, but hot enough to flow very slowly, like extremely thick putty.",
          do: [{ show: ["cCrust", "sCrust"] }, { show: ["cMan", "sMan"] }] },
        { caption: "At the centre is the iron and nickel core. The outer core is liquid, and its flow creates Earth's magnetic field. The inner core is solid because of the immense pressure.",
          do: [{ show: ["cOut", "sOut"] }, { show: ["cIn", "sIn"] }] }
      ]
    },
    {
      title: "Plates on a moving mantle",
      enter: "zoom",
      zoomInto: [336, 124],
      elements: {
        water:  { type: "art", kind: "earth.water", x: 0, y: 130 },
        mantle: { type: "art", kind: "earth.mantle", x: 0, y: 226 },
        conv:   { type: "art", kind: "earth.convection", x: 0, y: 226 },
        upwell: { type: "art", kind: "earth.upwell", x: 360, y: 190 },
        plateL: { type: "art", kind: "earth.oceanPlate", x: 60, y: 170 },
        plateR: { type: "art", kind: "earth.oceanPlate", x: 400, y: 170, flip: true },
        newC:   { type: "art", kind: "earth.newCrust", x: 364, y: 172 },
        oceanL: { type: "text", x: 40, y: 160, cls: "callout", text: "Ocean" },
        cPlate: { type: "callout", from: [180, 212], to: [180, 100], anchor: "middle", text: "Plate: crust + rigid top of the mantle (lithosphere)" },
        manL:   { type: "text", x: 40, y: 418, cls: "callout", text: "Asthenosphere: hot mantle rock that flows slowly" },
        cRidge: { type: "callout", from: [400, 178], to: [500, 100], text: "Mid-ocean ridge: new crust" },
        apart:  { type: "text", x: 400, y: 50, anchor: "middle", cls: "seg-label", text: "←  plates move apart  →" }
      },
      steps: [
        { caption: "Zoom into the top few hundred kilometres. The crust and the rigid top of the mantle form the lithosphere, which is broken into a dozen or so large plates.",
          do: [{ show: ["water", "plateL", "plateR", "oceanL"] }, { show: ["cPlate"] }] },
        { caption: "Below is the asthenosphere, mantle rock hot enough to flow. Heat from deep inside keeps it slowly circulating: hot rock rises, spreads out, cools and sinks. This is convection.",
          do: [{ show: ["mantle", "manL"] }, { show: ["conv"] }] },
        { caption: "The plates move with this flow, and are also dragged along by their own sinking edges. They travel a few centimetres a year, about as fast as fingernails grow.",
          do: [{ pulse: "plateL" }, { pulse: "plateR" }] },
        { caption: "Where plates pull apart, at a divergent boundary, magma rises into the gap and cools into new ocean crust. This builds mid-ocean ridges, like the Mid-Atlantic Ridge.",
          do: [{ show: ["upwell", "apart"] }, { all: [{ move: { id: "plateL", by: [-36, 0], dur: 1600 } }, { move: { id: "plateR", by: [36, 0], dur: 1600 } }] }, { show: ["newC", "cRidge"] }] }
      ]
    },
    {
      title: "Convergent boundaries",
      enter: "slide",
      elements: {
        water:  { type: "art", kind: "earth.water", x: 0, y: 130 },
        mantle: { type: "art", kind: "earth.mantle", x: 0, y: 226 },
        slab:   { type: "art", kind: "earth.slab", x: 20, y: 190 },
        cont:   { type: "art", kind: "earth.continent", x: 330, y: 90 },
        magma:  { type: "art", kind: "earth.magmaRise", x: 545, y: 162 },
        volc:   { type: "art", kind: "earth.volcano", x: 500, y: 84 },
        quake:  { type: "art", kind: "earth.quake", x: 380, y: 186 },
        cOcean: { type: "callout", from: [140, 208], to: [140, 100], anchor: "middle", text: "Ocean plate: thin, dense" },
        cCont:  { type: "callout", from: [720, 200], to: [775, 60], anchor: "end", text: "Continental plate: thick, less dense" },
        cTrench:{ type: "callout", from: [336, 188], to: [300, 60], anchor: "middle", text: "Trench" },
        cVolc:  { type: "callout", from: [548, 108], to: [470, 56], anchor: "end", text: "Volcano" },
        manL:   { type: "text", x: 40, y: 418, cls: "callout", text: "Mantle" },
        sinkL:  { type: "text", x: 300, y: 330, anchor: "middle", cls: "callout", text: "plate sinks into the mantle" }
      },
      steps: [
        { caption: "Where plates push together, at a convergent boundary, the denser ocean plate bends and dives under the other plate. This is subduction, and it forms a deep ocean trench.",
          do: [{ show: ["water", "mantle", "slab", "cont", "manL"] }, { show: ["cOcean", "cCont"] }, { move: { id: "slab", by: [40, 0], dur: 2200 } }, { show: ["cTrench", "sinkL"] }] },
        { caption: "Water carried down with the sinking plate lowers the melting point of the mantle above it. The magma rises and builds a chain of volcanoes, like the Andes or the Cascades.",
          do: [{ show: ["magma"] }, { show: ["volc", "cVolc"] }] },
        { caption: "The plates stick and lurch, so subduction zones have the strongest earthquakes. Where two continents collide, neither sinks, and the crust crumples into mountains like the Himalayas.",
          do: [{ show: ["quake"] }, { pulse: "quake" }] }
      ]
    },
    {
      title: "Transform boundaries",
      enter: "slide",
      elements: {
        north:  { type: "text", x: 40, y: 44, cls: "sub", text: "seen from above, north is up (simplified)" },
        left:   { type: "art", kind: "earth.mapBlock", tone: "teal", x: 60, y: 90, label: "Pacific Plate" },
        right:  { type: "art", kind: "earth.mapBlock", tone: "violet", x: 290, y: 90, label: "North American Plate" },
        cFault: { type: "callout", from: [290, 112], to: [330, 66], text: "Fault" },
        quake:  { type: "art", kind: "earth.quake", x: 266, y: 206 },
        san:    { type: "box", x: 560, y: 80, w: 220, h: 150, tone: "red", label: "San Andreas Fault", sub: "California. The Pacific Plate grinds north-west past the North American Plate." },
        take:   { type: "box", x: 560, y: 260, w: 220, h: 150, tone: "amber", label: "Plate boundaries", sub: "Most earthquakes, volcanoes and mountain ranges form where plates meet." }
      },
      arrows: {
        mL: { d: "M38,320 L38,150" },
        mR: { d: "M542,150 L542,320" }
      },
      steps: [
        { caption: "At a transform boundary, two plates slide past each other sideways, so crust is neither made nor destroyed. California's San Andreas Fault is the best-known example.",
          do: [{ show: ["north", "left", "right"] }, { show: ["cFault", "mL", "mR", "san"] }] },
        { caption: "Friction locks the plates together while stress builds for decades. Then the rock suddenly slips several metres at once: an earthquake. Roads across the fault end up offset.",
          do: [{ all: [{ move: { id: "left", by: [0, -30], dur: 500 } }, { move: { id: "right", by: [0, 30], dur: 500 } }] }, { show: ["quake"] }, { pulse: "quake" }] },
        { caption: "Divergent, convergent and transform: most of the world's earthquakes, volcanoes and mountain ranges form along these three kinds of plate boundary.",
          do: [{ show: ["take"] }] }
      ]
    }
  ]
});
