CC.topic({
  id: "plant-and-animal-cells",
  level: "middle",
  section: "biology",
  order: 1,
  title: "Plant and animal cells",
  summary: "What a leaf and the inside of your cheek look like under a microscope, and what plant cells have that yours don't.",
  scenes: [
    {
      title: "Two samples, one microscope",
      elements: {
        scope:  { type: "art", kind: "bio.microscope", x: 335, y: 90, s: 1.2, label: "Microscope", sub: "makes things look up to 400 times bigger", lw: 200 },
        leaf:   { type: "art", kind: "bio.leaf", x: 50, y: 170, label: "A pondweed leaf", sub: "so thin that light shines through it", lw: 170 },
        person: { type: "art", kind: "person", tone: "violet", x: 640, y: 140, s: 1.6, label: "Your cheek", sub: "a gentle scrape from the inside", lw: 170 },
        ring:   { type: "ring", x: 396, y: 204, r: 44, tone: "green" },
        trLeaf: { type: "track", d: "M200,212 C260,190 320,200 380,204" },
        trChk:  { type: "track", d: "M640,180 C560,160 470,190 412,204" }
      },
      steps: [
        { caption: "Every living thing is made of cells. Most cells are far too small to see, so we use a microscope.",
          do: [{ show: ["scope"] }] },
        { caption: "First sample: a tiny leaf from a pond plant, laid on a glass slide. It is so thin that light shines right through it.",
          do: [{ show: ["leaf"] }, { flow: { along: "trLeaf", token: "leaf", tone: "green", dur: 1400 } }] },
        { caption: "Second sample: a few cells gently scraped from the inside of your cheek with a cotton swab.",
          do: [{ show: ["person"] }, { flow: { along: "trChk", token: "cheek cells", tone: "teal", dur: 1400 } }] },
        { caption: "Under the microscope, both samples are made of tiny cells. Let's look closely at one of each.",
          do: [{ show: ["ring"] }, { pulse: "ring" }] }
      ]
    },
    {
      title: "A cheek cell",
      enter: "zoom",
      zoomInto: [396, 204],
      elements: {
        cell:  { type: "art", kind: "bio.animalCell", x: 60, y: 80, s: 1.2, label: "Animal cell (from your cheek)", sub: "drawn much larger than real life" },
        cMem:  { type: "callout", from: [300, 106], to: [470, 80], text: "Cell membrane: the cell's thin skin" },
        cCyt:  { type: "callout", from: [240, 302], to: [470, 330], text: "Cytoplasm: jelly that fills the cell" },
        cNuc:  { type: "callout", from: [282, 226], to: [470, 250], text: "Nucleus: the control center" },
        cMito: { type: "callout", from: [342, 182], to: [470, 160], text: "Mitochondria: release energy" }
      },
      steps: [
        { caption: "Here's one cheek cell, greatly magnified. Its outer edge is the cell membrane, a thin skin that controls what goes in and out.",
          do: [{ show: ["cell"] }, { show: ["cMem"] }] },
        { caption: "Inside is the cytoplasm, a jelly where most of the cell's work happens.",
          do: [{ show: ["cCyt"] }] },
        { caption: "The nucleus is the control center. It holds DNA, the instructions for running the cell.",
          do: [{ show: ["cNuc"] }] },
        { caption: "The bean-shaped mitochondria release energy from food. That energy powers everything the cell does.",
          do: [{ show: ["cMito"] }, { pulse: "cell" }] }
      ]
    },
    {
      title: "A leaf cell",
      enter: "slide",
      elements: {
        cell:  { type: "art", kind: "bio.leafCell", x: 220, y: 60, s: 1.2, label: "Plant cell (from a leaf)", sub: "drawn much larger than real life" },
        cWall: { type: "callout", from: [230, 132], to: [180, 100], text: "Cell wall" },
        cMem:  { type: "callout", from: [236, 204], to: [180, 200], text: "Cell membrane" },
        cVac:  { type: "callout", from: [328, 216], to: [180, 300], text: "Large vacuole" },
        cNuc:  { type: "callout", from: [535, 125], to: [620, 90], text: "Nucleus" },
        cMito: { type: "callout", from: [525, 194], to: [620, 170], text: "Mitochondria" },
        cChl:  { type: "callout", from: [527, 252], to: [620, 250], text: "Chloroplasts" },
        cCyt:  { type: "callout", from: [496, 282], to: [620, 320], text: "Cytoplasm" }
      },
      steps: [
        { caption: "Now a leaf cell. It has the same four parts as your cheek cell: a membrane, cytoplasm, a nucleus and mitochondria.",
          do: [{ show: ["cell"] }, { show: ["cMem", "cCyt", "cNuc", "cMito"], stagger: 250 }] },
        { caption: "Outside the membrane is a stiff cell wall. It gives the cell its boxy shape and helps the plant stand upright.",
          do: [{ show: ["cWall"] }] },
        { caption: "Green chloroplasts capture sunlight to make food. Animal cells don't have them, which is why animals have to eat.",
          do: [{ show: ["cChl"] }] },
        { caption: "A large vacuole, a sac full of water, presses outward and keeps the cell firm. Animal cells have only small vacuoles, or none.",
          do: [{ show: ["cVac"] }] }
      ]
    },
    {
      title: "Side by side",
      enter: "fade",
      elements: {
        an:   { type: "art", kind: "bio.animalCell", x: 90, y: 30, s: 0.7, label: "Animal cell" },
        pl:   { type: "art", kind: "bio.leafCell", x: 500, y: 30, s: 0.7, label: "Plant cell" },
        both: { type: "box", x: 40, y: 268, w: 340, h: 120, tone: "teal", label: "Both have", sub: "a cell membrane, cytoplasm, a nucleus and mitochondria" },
        only: { type: "box", x: 420, y: 268, w: 340, h: 120, tone: "green", label: "Only plant cells have", sub: "a cell wall, chloroplasts and a large vacuole" }
      },
      steps: [
        { caption: "Side by side, the cells share the basic parts every cell needs to stay alive.",
          do: [{ show: ["an", "pl"], stagger: 200 }, { show: ["both"] }] },
        { caption: "Plant cells add three extras: a wall for support, chloroplasts to make food from sunlight, and a large vacuole to store water.",
          do: [{ show: ["only"] }, { pulse: "pl" }] }
      ]
    }
  ]
});
