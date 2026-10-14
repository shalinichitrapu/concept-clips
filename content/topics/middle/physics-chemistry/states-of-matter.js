CC.topic({
  id: "states-of-matter",
  level: "middle",
  section: "physics-chemistry",
  order: 1,
  title: "Solids, liquids and gases",
  summary: "Why water can be ice, liquid or steam: it depends on how much its tiny particles move.",
  scenes: [
    {
      title: "Water in three forms",
      elements: {
        ice: { type: "art", kind: "phys.ice", x: 90, y: 160, s: 1.2, label: "Ice", sub: "solid: keeps its own shape", lw: 190 },
        glass: { type: "art", kind: "phys.glass", x: 346, y: 136, s: 1.2, label: "Water", sub: "liquid: takes the shape of its container", lw: 190 },
        kettle: { type: "art", kind: "phys.kettle", x: 536, y: 100, s: 1.2, label: "Water vapour", sub: "gas: spreads out to fill any space", lw: 190 }
      },
      steps: [
        {
          caption: "Water can be a solid, a liquid or a gas. As a solid, ice, it keeps its own shape.",
          do: [
            { show: ["ice"] },
            { pulse: "ice" }
          ]
        },
        {
          caption: "As a liquid, water flows. It takes the shape of whatever container it's in.",
          do: [
            { show: ["glass"] },
            { pulse: "glass" }
          ]
        },
        {
          caption: "As a gas, water vapour spreads out to fill any space. The gas itself is invisible. The cloud you see over a kettle is tiny droplets forming as it cools.",
          do: [
            { show: ["kettle"] },
            { pulse: "kettle" }
          ]
        }
      ]
    },
    {
      title: "The particle view",
      enter: "zoom",
      zoomInto: [400, 220],
      elements: {
        boxS: { type: "art", kind: "phys.box", x: 40, y: 60, label: "Solid", sub: "packed tightly, vibrating in place", lw: 200 },
        boxL: { type: "art", kind: "phys.box", x: 300, y: 60, label: "Liquid", sub: "close together, sliding past each other", lw: 200 },
        boxG: { type: "art", kind: "phys.box", x: 560, y: 60, label: "Gas", sub: "far apart, moving fast in every direction", lw: 200 },
        s0: { type: "point", px: true, at: [104, 223], tone: "blue", r: 10 },
        s1: { type: "point", px: true, at: [126, 223], tone: "blue", r: 10 },
        s2: { type: "point", px: true, at: [148, 223], tone: "blue", r: 10 },
        s3: { type: "point", px: true, at: [170, 223], tone: "blue", r: 10 },
        s4: { type: "point", px: true, at: [104, 201], tone: "blue", r: 10 },
        s5: { type: "point", px: true, at: [126, 201], tone: "blue", r: 10 },
        s6: { type: "point", px: true, at: [148, 201], tone: "blue", r: 10 },
        s7: { type: "point", px: true, at: [170, 201], tone: "blue", r: 10 },
        s8: { type: "point", px: true, at: [104, 179], tone: "blue", r: 10 },
        s9: { type: "point", px: true, at: [126, 179], tone: "blue", r: 10 },
        s10: { type: "point", px: true, at: [148, 179], tone: "blue", r: 10 },
        s11: { type: "point", px: true, at: [170, 179], tone: "blue", r: 10 },
        s12: { type: "point", px: true, at: [104, 157], tone: "blue", r: 10 },
        s13: { type: "point", px: true, at: [126, 157], tone: "blue", r: 10 },
        s14: { type: "point", px: true, at: [148, 157], tone: "blue", r: 10 },
        s15: { type: "point", px: true, at: [170, 157], tone: "blue", r: 10 },
        l0: { type: "point", px: true, at: [318, 224], tone: "blue", r: 10 },
        l1: { type: "point", px: true, at: [341, 226], tone: "blue", r: 10 },
        l2: { type: "point", px: true, at: [364, 223], tone: "blue", r: 10 },
        l3: { type: "point", px: true, at: [388, 225], tone: "blue", r: 10 },
        l4: { type: "point", px: true, at: [411, 224], tone: "blue", r: 10 },
        l5: { type: "point", px: true, at: [434, 226], tone: "blue", r: 10 },
        l6: { type: "point", px: true, at: [457, 223], tone: "blue", r: 10 },
        l7: { type: "point", px: true, at: [481, 225], tone: "blue", r: 10 },
        l8: { type: "point", px: true, at: [329, 202], tone: "blue", r: 10 },
        l9: { type: "point", px: true, at: [353, 203], tone: "blue", r: 10 },
        l10: { type: "point", px: true, at: [378, 200], tone: "blue", r: 10 },
        l11: { type: "point", px: true, at: [402, 204], tone: "blue", r: 10 },
        l12: { type: "point", px: true, at: [446, 201], tone: "blue", r: 10 },
        l13: { type: "point", px: true, at: [470, 203], tone: "blue", r: 10 },
        l14: { type: "point", px: true, at: [366, 180], tone: "blue", r: 10 },
        l15: { type: "point", px: true, at: [427, 182], tone: "blue", r: 10 },
        g0: { type: "point", px: true, at: [600, 100], tone: "blue", r: 10 },
        g1: { type: "point", px: true, at: [700, 92], tone: "blue", r: 10 },
        g2: { type: "point", px: true, at: [655, 160], tone: "blue", r: 10 },
        g3: { type: "point", px: true, at: [735, 190], tone: "blue", r: 10 },
        g4: { type: "point", px: true, at: [592, 215], tone: "blue", r: 10 },
        g5: { type: "point", px: true, at: [690, 212], tone: "blue", r: 10 },
        g6: { type: "point", px: true, at: [615, 155], tone: "blue", r: 10 },
        same: {
          type: "box",
          x: 130,
          y: 330,
          w: 540,
          h: 84,
          tone: "blue",
          label: "Same particles, different motion",
          sub: "Ice, water and water vapour are all made of the same water particles."
        }
      },
      steps: [
        {
          caption: "Zoom in far enough and water is made of tiny particles. In a solid they're packed tightly in fixed places, and they can only vibrate.",
          do: [
            { show: ["boxS"] },
            { show: ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13", "s14", "s15"] },
            {
              all: [
                { move: { id: "s0", by: [-2.5, -2], dur: 110 } },
                { move: { id: "s1", by: [2.5, -2], dur: 110 } },
                { move: { id: "s2", by: [-2.5, 2], dur: 110 } },
                { move: { id: "s3", by: [2.5, 2], dur: 110 } },
                { move: { id: "s4", by: [-2.5, -2], dur: 110 } },
                { move: { id: "s5", by: [2.5, -2], dur: 110 } },
                { move: { id: "s6", by: [-2.5, 2], dur: 110 } },
                { move: { id: "s7", by: [2.5, 2], dur: 110 } },
                { move: { id: "s8", by: [-2.5, -2], dur: 110 } },
                { move: { id: "s9", by: [2.5, -2], dur: 110 } },
                { move: { id: "s10", by: [-2.5, 2], dur: 110 } },
                { move: { id: "s11", by: [2.5, 2], dur: 110 } },
                { move: { id: "s12", by: [-2.5, -2], dur: 110 } },
                { move: { id: "s13", by: [2.5, -2], dur: 110 } },
                { move: { id: "s14", by: [-2.5, 2], dur: 110 } },
                { move: { id: "s15", by: [2.5, 2], dur: 110 } }
              ]
            },
            {
              all: [
                { move: { id: "s0", by: [5, 4], dur: 110 } },
                { move: { id: "s1", by: [-5, 4], dur: 110 } },
                { move: { id: "s2", by: [5, -4], dur: 110 } },
                { move: { id: "s3", by: [-5, -4], dur: 110 } },
                { move: { id: "s4", by: [5, 4], dur: 110 } },
                { move: { id: "s5", by: [-5, 4], dur: 110 } },
                { move: { id: "s6", by: [5, -4], dur: 110 } },
                { move: { id: "s7", by: [-5, -4], dur: 110 } },
                { move: { id: "s8", by: [5, 4], dur: 110 } },
                { move: { id: "s9", by: [-5, 4], dur: 110 } },
                { move: { id: "s10", by: [5, -4], dur: 110 } },
                { move: { id: "s11", by: [-5, -4], dur: 110 } },
                { move: { id: "s12", by: [5, 4], dur: 110 } },
                { move: { id: "s13", by: [-5, 4], dur: 110 } },
                { move: { id: "s14", by: [5, -4], dur: 110 } },
                { move: { id: "s15", by: [-5, -4], dur: 110 } }
              ]
            },
            {
              all: [
                { move: { id: "s0", by: [-5, -4], dur: 110 } },
                { move: { id: "s1", by: [5, -4], dur: 110 } },
                { move: { id: "s2", by: [-5, 4], dur: 110 } },
                { move: { id: "s3", by: [5, 4], dur: 110 } },
                { move: { id: "s4", by: [-5, -4], dur: 110 } },
                { move: { id: "s5", by: [5, -4], dur: 110 } },
                { move: { id: "s6", by: [-5, 4], dur: 110 } },
                { move: { id: "s7", by: [5, 4], dur: 110 } },
                { move: { id: "s8", by: [-5, -4], dur: 110 } },
                { move: { id: "s9", by: [5, -4], dur: 110 } },
                { move: { id: "s10", by: [-5, 4], dur: 110 } },
                { move: { id: "s11", by: [5, 4], dur: 110 } },
                { move: { id: "s12", by: [-5, -4], dur: 110 } },
                { move: { id: "s13", by: [5, -4], dur: 110 } },
                { move: { id: "s14", by: [-5, 4], dur: 110 } },
                { move: { id: "s15", by: [5, 4], dur: 110 } }
              ]
            },
            {
              all: [
                { move: { id: "s0", by: [5, 4], dur: 110 } },
                { move: { id: "s1", by: [-5, 4], dur: 110 } },
                { move: { id: "s2", by: [5, -4], dur: 110 } },
                { move: { id: "s3", by: [-5, -4], dur: 110 } },
                { move: { id: "s4", by: [5, 4], dur: 110 } },
                { move: { id: "s5", by: [-5, 4], dur: 110 } },
                { move: { id: "s6", by: [5, -4], dur: 110 } },
                { move: { id: "s7", by: [-5, -4], dur: 110 } },
                { move: { id: "s8", by: [5, 4], dur: 110 } },
                { move: { id: "s9", by: [-5, 4], dur: 110 } },
                { move: { id: "s10", by: [5, -4], dur: 110 } },
                { move: { id: "s11", by: [-5, -4], dur: 110 } },
                { move: { id: "s12", by: [5, 4], dur: 110 } },
                { move: { id: "s13", by: [-5, 4], dur: 110 } },
                { move: { id: "s14", by: [5, -4], dur: 110 } },
                { move: { id: "s15", by: [-5, -4], dur: 110 } }
              ]
            },
            {
              all: [
                { move: { id: "s0", by: [-5, -4], dur: 110 } },
                { move: { id: "s1", by: [5, -4], dur: 110 } },
                { move: { id: "s2", by: [-5, 4], dur: 110 } },
                { move: { id: "s3", by: [5, 4], dur: 110 } },
                { move: { id: "s4", by: [-5, -4], dur: 110 } },
                { move: { id: "s5", by: [5, -4], dur: 110 } },
                { move: { id: "s6", by: [-5, 4], dur: 110 } },
                { move: { id: "s7", by: [5, 4], dur: 110 } },
                { move: { id: "s8", by: [-5, -4], dur: 110 } },
                { move: { id: "s9", by: [5, -4], dur: 110 } },
                { move: { id: "s10", by: [-5, 4], dur: 110 } },
                { move: { id: "s11", by: [5, 4], dur: 110 } },
                { move: { id: "s12", by: [-5, -4], dur: 110 } },
                { move: { id: "s13", by: [5, -4], dur: 110 } },
                { move: { id: "s14", by: [-5, 4], dur: 110 } },
                { move: { id: "s15", by: [5, 4], dur: 110 } }
              ]
            },
            {
              all: [
                { move: { id: "s0", by: [2.5, 2], dur: 110 } },
                { move: { id: "s1", by: [-2.5, 2], dur: 110 } },
                { move: { id: "s2", by: [2.5, -2], dur: 110 } },
                { move: { id: "s3", by: [-2.5, -2], dur: 110 } },
                { move: { id: "s4", by: [2.5, 2], dur: 110 } },
                { move: { id: "s5", by: [-2.5, 2], dur: 110 } },
                { move: { id: "s6", by: [2.5, -2], dur: 110 } },
                { move: { id: "s7", by: [-2.5, -2], dur: 110 } },
                { move: { id: "s8", by: [2.5, 2], dur: 110 } },
                { move: { id: "s9", by: [-2.5, 2], dur: 110 } },
                { move: { id: "s10", by: [2.5, -2], dur: 110 } },
                { move: { id: "s11", by: [-2.5, -2], dur: 110 } },
                { move: { id: "s12", by: [2.5, 2], dur: 110 } },
                { move: { id: "s13", by: [-2.5, 2], dur: 110 } },
                { move: { id: "s14", by: [2.5, -2], dur: 110 } },
                { move: { id: "s15", by: [-2.5, -2], dur: 110 } }
              ]
            }
          ]
        },
        {
          caption: "In a liquid the particles are still close together, but they can slide past each other. That's why a liquid can flow and change shape.",
          do: [
            { show: ["boxL"] },
            { show: ["l0", "l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10", "l11", "l12", "l13", "l14", "l15"] },
            {
              all: [
                { move: { id: "l0", by: [9, -3], dur: 700 } },
                { move: { id: "l1", by: [-8, 2], dur: 700 } },
                { move: { id: "l2", by: [7, -4], dur: 700 } },
                { move: { id: "l3", by: [-9, 1], dur: 700 } },
                { move: { id: "l4", by: [8, -2], dur: 700 } },
                { move: { id: "l5", by: [-7, 3], dur: 700 } },
                { move: { id: "l6", by: [9, -1], dur: 700 } },
                { move: { id: "l7", by: [-8, -2], dur: 700 } },
                { move: { id: "l8", by: [-10, 3], dur: 700 } },
                { move: { id: "l9", by: [8, -2], dur: 700 } },
                { move: { id: "l10", by: [-7, 2], dur: 700 } },
                { move: { id: "l11", by: [10, -3], dur: 700 } },
                { move: { id: "l12", by: [-9, 1], dur: 700 } },
                { move: { id: "l13", by: [7, 2], dur: 700 } },
                { move: { id: "l14", by: [12, 2], dur: 700 } },
                { move: { id: "l15", by: [-12, 1], dur: 700 } }
              ]
            },
            {
              all: [
                { move: { id: "l0", by: [-9, 3], dur: 700 } },
                { move: { id: "l1", by: [8, -2], dur: 700 } },
                { move: { id: "l2", by: [-7, 4], dur: 700 } },
                { move: { id: "l3", by: [9, -1], dur: 700 } },
                { move: { id: "l4", by: [-8, 2], dur: 700 } },
                { move: { id: "l5", by: [7, -3], dur: 700 } },
                { move: { id: "l6", by: [-9, 1], dur: 700 } },
                { move: { id: "l7", by: [8, 2], dur: 700 } },
                { move: { id: "l8", by: [10, -3], dur: 700 } },
                { move: { id: "l9", by: [-8, 2], dur: 700 } },
                { move: { id: "l10", by: [7, -2], dur: 700 } },
                { move: { id: "l11", by: [-10, 3], dur: 700 } },
                { move: { id: "l12", by: [9, -1], dur: 700 } },
                { move: { id: "l13", by: [-7, -2], dur: 700 } },
                { move: { id: "l14", by: [-12, -2], dur: 700 } },
                { move: { id: "l15", by: [12, -1], dur: 700 } }
              ]
            }
          ]
        },
        {
          caption: "In a gas the particles are far apart. They move fast in every direction and bounce off the walls, so a gas fills its whole container.",
          do: [
            { show: ["boxG"] },
            { show: ["g0", "g1", "g2", "g3", "g4", "g5", "g6"] },
            {
              all: [
                { move: { id: "g0", to: [660, 110], dur: 450 } },
                { move: { id: "g1", to: [610, 130], dur: 450 } },
                { move: { id: "g2", to: [720, 205], dur: 450 } },
                { move: { id: "g3", to: [680, 150], dur: 450 } },
                { move: { id: "g4", to: [640, 200], dur: 450 } },
                { move: { id: "g5", to: [740, 120], dur: 450 } },
                { move: { id: "g6", to: [590, 90], dur: 450 } }
              ]
            },
            {
              all: [
                { move: { id: "g0", to: [730, 95], dur: 450 } },
                { move: { id: "g1", to: [650, 210], dur: 450 } },
                { move: { id: "g2", to: [600, 190], dur: 450 } },
                { move: { id: "g3", to: [700, 105], dur: 450 } },
                { move: { id: "g4", to: [700, 180], dur: 450 } },
                { move: { id: "g5", to: [620, 120], dur: 450 } },
                { move: { id: "g6", to: [660, 140], dur: 450 } }
              ]
            },
            {
              all: [
                { move: { id: "g0", to: [620, 205], dur: 450 } },
                { move: { id: "g1", to: [735, 140], dur: 450 } },
                { move: { id: "g2", to: [665, 95], dur: 450 } },
                { move: { id: "g3", to: [600, 120], dur: 450 } },
                { move: { id: "g4", to: [735, 205], dur: 450 } },
                { move: { id: "g5", to: [660, 175], dur: 450 } },
                { move: { id: "g6", to: [700, 215], dur: 450 } }
              ]
            }
          ]
        },
        {
          caption: "The particles themselves don't change. Only how fast they move and how far apart they are changes.",
          do: [
            { show: ["same"] }
          ]
        }
      ]
    },
    {
      title: "Adding heat",
      enter: "fade",
      elements: {
        ice: { type: "art", kind: "phys.ice", x: 70, y: 110, s: 0.9, label: "Ice", sub: "solid" },
        glass: { type: "art", kind: "phys.glass", x: 360, y: 92, s: 0.9, label: "Water", sub: "liquid" },
        kettle: { type: "art", kind: "phys.kettle", x: 590, y: 65, s: 0.9, label: "Water vapour", sub: "gas" },
        key: { type: "text", x: 400, y: 425, anchor: "middle", cls: "eq", text: "More energy → particles move faster and spread further apart" }
      },
      arrows: {
        melt: { d: "M175,155 C230,135 290,135 345,155", label: { text: "melts at 0 °C", x: 260, y: 122 } },
        boil: { d: "M455,155 C500,135 545,135 585,155", label: { text: "boils at 100 °C", x: 520, y: 122 } },
        cool: { d: "M660,290 C620,345 190,345 120,290", dashed: true, label: { text: "cooling: vapour condenses, then water freezes", x: 390, y: 368 } }
      },
      steps: [
        {
          caption: "Heating gives the particles more energy. In ice, they vibrate harder and harder.",
          do: [
            { show: ["ice"] },
            { pulse: "ice" }
          ]
        },
        {
          caption: "At 0 °C the particles break free of their fixed places and start to slide past each other. The ice melts into liquid water.",
          do: [
            { show: ["melt"] },
            { flow: { along: "melt", token: "heat", tone: "amber", count: 2 } },
            { show: ["glass"] }
          ]
        },
        {
          caption: "Keep heating. At 100 °C (at sea level) the particles move fast enough to escape into the air as a gas. The water boils.",
          do: [
            { show: ["boil"] },
            { flow: { along: "boil", token: "heat", tone: "amber", count: 2 } },
            { show: ["kettle"] }
          ]
        },
        {
          caption: "Cooling takes energy away, so it works the other way: water vapour condenses back into liquid, and water freezes into ice at 0 °C.",
          do: [
            { show: ["cool"] }
          ]
        },
        {
          caption: "Solid, liquid or gas depends on how much energy the particles have.",
          do: [
            { show: ["key"] }
          ]
        }
      ]
    }
  ]
});
