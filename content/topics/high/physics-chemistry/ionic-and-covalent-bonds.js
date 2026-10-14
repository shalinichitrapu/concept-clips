CC.topic({
  id: "ionic-and-covalent-bonds",
  level: "high",
  section: "physics-chemistry",
  order: 2,
  title: "Ionic and covalent bonds",
  summary: "How atoms bond by giving electrons away, as in table salt, or by sharing them, as in water.",
  scenes: [
    {
      title: "Salt and water",
      elements: {
        salt: { type: "art", kind: "phys.shaker", x: 180, y: 110, s: 1.4, label: "Table salt", sub: "sodium chloride, NaCl" },
        water: { type: "art", kind: "phys.glass", x: 500, y: 122, s: 1.3, label: "Water", sub: "H₂O" },
        ring: { type: "ring", x: 236, y: 215, r: 64, tone: "teal" }
      },
      steps: [
        {
          caption: "Table salt is sodium chloride, NaCl: sodium and chlorine atoms bonded together.",
          do: [
            { show: ["salt"] },
            { pulse: "salt" }
          ]
        },
        {
          caption: "Water, H₂O, is oxygen bonded to two hydrogen atoms. The two compounds hold their atoms together in different ways. Start with salt.",
          do: [
            { show: ["water"] },
            { show: ["ring"] },
            { pulse: "ring" }
          ]
        }
      ]
    },
    {
      title: "Sodium gives, chlorine takes",
      enter: "zoom",
      zoomInto: [236, 215],
      elements: {
        na: {
          type: "art",
          kind: "phys.atom",
          x: 40,
          y: 100,
          s: 1.3,
          shells: [2, 8],
          rings: 3,
          symbol: "Na",
          tone: "teal",
          label: "Sodium, Na",
          sub: "11 electrons: 2, 8, 1"
        },
        e: { type: "point", px: true, at: [218.1, 197.5], tone: "amber", r: 8 },
        cl: {
          type: "art",
          kind: "phys.atom",
          x: 300,
          y: 100,
          s: 1.3,
          shells: [2, 8, 7],
          slots: [0, 0, 8],
          skip: [-1, -1, 6],
          symbol: "Cl",
          tone: "green",
          label: "Chlorine, Cl",
          sub: "17 electrons: 2, 8, 7"
        },
        naI: {
          type: "art",
          kind: "phys.atom",
          x: 40,
          y: 100,
          s: 1.3,
          shells: [2, 8],
          symbol: "Na",
          tone: "teal",
          charge: "+",
          label: "Sodium ion, Na⁺",
          sub: "11 protons, 10 electrons"
        },
        clI: {
          type: "art",
          kind: "phys.atom",
          x: 300,
          y: 100,
          s: 1.3,
          shells: [2, 8, 8],
          symbol: "Cl",
          tone: "green",
          charge: "−",
          label: "Chloride ion, Cl⁻",
          sub: "17 protons, 18 electrons"
        },
        cOut: { type: "callout", from: [218, 185], to: [190, 70], text: "1 outer electron" },
        cGap: { type: "callout", from: [317, 185], to: [345, 70], text: "room for 1 more" },
        attract: { type: "text", x: 268, y: 70, anchor: "middle", cls: "callout", text: "opposite charges attract: an ionic bond" },
        lat: {
          type: "art",
          kind: "phys.lattice",
          x: 584,
          y: 100,
          s: 1.1,
          label: "Salt crystal",
          sub: "every Na⁺ is surrounded by Cl⁻, and every Cl⁻ by Na⁺",
          lw: 200
        }
      },
      steps: [
        {
          caption: "Zoom in to the atoms. Electrons orbit the nucleus in shells. Sodium has 11 electrons: 2, then 8, then just 1 in its outer shell.",
          do: [
            { show: ["na", "e"] },
            { show: ["cOut"] }
          ]
        },
        {
          caption: "Chlorine has 17 electrons: 2, 8 and 7. Its outer shell is most stable with 8, so it is one electron short.",
          do: [
            { show: ["cl"] },
            { show: ["cGap"] }
          ]
        },
        {
          caption: "Sodium gives its single outer electron to chlorine. Now both have a full outer shell of 8.",
          do: [
            { hide: ["cOut", "cGap"] },
            { move: { id: "e", to: [316.9, 197.5], dur: 1600 } }
          ]
        },
        {
          caption: "Both atoms are now ions: atoms with a charge. Sodium has one more proton than electrons, so it's Na⁺. Chlorine has one extra electron, so it's Cl⁻.",
          do: [
            {
              all: [
                { hide: ["na", "cl", "e"] },
                { show: ["naI", "clI"] }
              ]
            }
          ]
        },
        {
          caption: "Opposite charges attract. This electrostatic pull between a positive and a negative ion is an ionic bond.",
          do: [
            {
              all: [
                { move: { id: "naI", by: [40, 0] } },
                { move: { id: "clI", by: [-40, 0] } }
              ]
            },
            { show: ["attract"] }
          ]
        },
        {
          caption: "A grain of salt is a crystal of huge numbers of Na⁺ and Cl⁻ ions, alternating in a cube-shaped grid.",
          do: [
            { show: ["lat"] },
            { pulse: "lat" }
          ]
        }
      ]
    },
    {
      title: "Water shares",
      enter: "slide",
      elements: {
        o: {
          type: "art",
          kind: "phys.atom",
          x: 137.5,
          y: 62.5,
          s: 1.5,
          shells: [2, 6],
          angles: [null, [228, 248, 292, 312, 37.75, 142.25]],
          symbol: "O",
          tone: "red"
        },
        h1: { type: "art", kind: "phys.atomSmall", x: 323.6, y: 221.8, s: 1.5, shells: [1], angles: [[217.75]], symbol: "H", tone: "blue" },
        h2: { type: "art", kind: "phys.atomSmall", x: 86.4, y: 221.8, s: 1.5, shells: [1], angles: [[322.25]], symbol: "H", tone: "blue" },
        bO: { type: "box", x: 480, y: 50, w: 290, h: 76, tone: "red", label: "Oxygen", sub: "6 outer electrons, 2 short of 8" },
        bH: { type: "box", x: 480, y: 140, w: 290, h: 76, tone: "blue", label: "Hydrogen", sub: "1 electron; its one shell holds 2" },
        cPair: { type: "callout", from: [291.5, 207.1], to: [390, 130], text: "shared pair" },
        bC: { type: "box", x: 480, y: 240, w: 290, h: 104, tone: "violet", label: "Covalent bond", sub: "a pair of electrons shared between two atoms" },
        mol: { type: "text", x: 250, y: 334, anchor: "middle", cls: "artlbl", text: "Water molecule, H₂O" },
        molS: { type: "text", x: 250, y: 354, anchor: "middle", cls: "sub", text: "bent, with 104.5° between the bonds" }
      },
      steps: [
        {
          caption: "Water bonds differently. Oxygen has 6 outer electrons and needs 2 more. Each hydrogen has 1 electron and needs 1 more to fill its shell.",
          do: [
            { show: ["o", "h1", "h2"] },
            { show: ["bO", "bH"], stagger: 300 }
          ]
        },
        {
          caption: "No atom gives an electron away. Instead the shells overlap, and each overlap holds a pair of electrons: one from oxygen, one from hydrogen.",
          do: [
            {
              all: [
                { move: { id: "h1", to: [264.3, 175.9], dur: 1400 } },
                { move: { id: "h2", to: [145.7, 175.9], dur: 1400 } }
              ]
            },
            { show: ["cPair"] }
          ]
        },
        {
          caption: "A shared pair of electrons is a covalent bond. Counting shared electrons, every atom now has a full shell, and the three atoms form one molecule.",
          do: [
            { show: ["bC"] },
            { show: ["mol", "molS"] }
          ]
        }
      ]
    },
    {
      title: "Ionic or covalent",
      enter: "fade",
      elements: {
        lat: { type: "art", kind: "phys.lattice", x: 160, y: 22, s: 0.75 },
        h2o: { type: "art", kind: "h2o", x: 552, y: 52, s: 1.5 },
        ionic: {
          type: "box",
          x: 60,
          y: 160,
          w: 320,
          h: 130,
          tone: "teal",
          label: "Ionic bond",
          sub: "Electrons are transferred, usually from a metal to a non-metal. The ions attract. Example: NaCl, which melts at 801 °C."
        },
        cov: {
          type: "box",
          x: 420,
          y: 160,
          w: 320,
          h: 130,
          tone: "violet",
          label: "Covalent bond",
          sub: "Electrons are shared, usually between non-metals, forming molecules. Example: H₂O, which melts at 0 °C."
        },
        key: { type: "text", x: 400, y: 350, anchor: "middle", cls: "eqbig", text: "Ionic: give and take.   Covalent: share." }
      },
      steps: [
        {
          caption: "In an ionic bond, electrons move from one atom to another, usually from a metal to a non-metal. The oppositely charged ions hold each other tightly.",
          do: [
            { show: ["lat", "ionic"] }
          ]
        },
        {
          caption: "In a covalent bond, atoms share pairs of electrons, usually between non-metals. This builds separate molecules, like H₂O.",
          do: [
            { show: ["h2o", "cov"] }
          ]
        },
        {
          caption: "Strong attractions run all through an ionic crystal, so salt melts at 801 °C. Only weak forces hold water molecules to each other, so ice melts at 0 °C.",
          do: [
            { show: ["key"] }
          ]
        }
      ]
    }
  ]
});
