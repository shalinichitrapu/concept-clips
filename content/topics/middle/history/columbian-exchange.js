CC.topic({
  id: "columbian-exchange",
  level: "middle",
  section: "history",
  order: 3,
  title: "The Columbian Exchange",
  summary: "How Columbus's 1492 voyage started a huge swap of crops, animals, people and diseases between two halves of the world.",
  scenes: [
    {
      title: "Two worlds meet",
      elements: {
        map:   { type: "art", kind: "hist.mapWorld", layer: "back", x: 20, y: 20 },
        note:  { type: "text", x: 770, y: 342, anchor: "end", cls: "tick", text: "simplified map, not to scale" },
        lAm:   { type: "text", x: 150, y: 100, anchor: "middle", cls: "seg-label", text: "The Americas" },
        lEu:   { type: "text", x: 405, y: 64, anchor: "middle", cls: "seg-label", text: "Europe" },
        lAf:   { type: "text", x: 410, y: 225, anchor: "middle", cls: "seg-label", text: "Africa" },
        lAs:   { type: "text", x: 570, y: 95, anchor: "middle", cls: "seg-label", text: "Asia" },
        ocean: { type: "text", x: 330, y: 290, anchor: "middle", cls: "eqlabel", text: "ATLANTIC OCEAN" },
        voy:   { type: "path", px: true, pts: [[364, 121], [347, 143], [300, 160], [260, 162], [222, 152]], tone: "violet", w: 4, dashed: true },
        ship:  { type: "art", kind: "hist.ship", x: 337, y: 96, s: .45 },
        year:  { type: "box", x: 40, y: 362, w: 300, h: 74, tone: "violet", label: "1492", sub: "Columbus sails west from Spain" },
        exch:  { type: "box", x: 380, y: 362, w: 380, h: 74, tone: "yellow", label: "The Columbian Exchange", sub: "crops, animals, people and germs on the move" },
        trVoy: { type: "track", d: "M364,121 L347,143 L300,160 L260,162 L222,152" },
        trE:   { type: "track", d: "M236,128 C280,96 320,96 352,110" },
        trW:   { type: "track", d: "M352,132 C320,150 280,152 240,144" }
      },
      steps: [
        { caption: "For thousands of years, people in the Americas lived apart from people in Europe, Africa and Asia. Each side had its own plants, animals and germs.",
          do: [{ show: ["map", "note"] }, { show: ["lAm", "lEu", "lAf", "lAs", "ocean"], stagger: 150 }] },
        { caption: "In 1492, Christopher Columbus sailed west from Spain, hoping to reach Asia. Instead he reached islands in the Caribbean.",
          do: [{ show: ["ship", "voy"] }, { move: { id: "ship", along: "trVoy", dur: 2400 } }, { show: ["year"] }] },
        { caption: "Soon ships were crossing the Atlantic in both directions, carrying plants, animals and people. Historians call this the Columbian Exchange.",
          do: [{ all: [{ flow: { along: "trE", art: "hist.ship", s: .4, count: 2, gap: 700, dur: 1600 } }, { flow: { along: "trW", art: "hist.ship", s: .4, count: 2, gap: 700, dur: 1600 } }] }, { show: ["exch"] }] }
      ]
    },
    {
      title: "What crossed the ocean",
      enter: "fade",
      elements: {
        map:    { type: "art", kind: "hist.mapWorld", layer: "back", x: 20, y: 20, visible: true },
        note:   { type: "text", x: 770, y: 342, anchor: "end", cls: "tick", text: "simplified map, not to scale", visible: true },
        lAm:    { type: "text", x: 150, y: 100, anchor: "middle", cls: "seg-label", text: "The Americas", visible: true },
        lEu:    { type: "text", x: 405, y: 64, anchor: "middle", cls: "seg-label", text: "Europe", visible: true },
        lAf:    { type: "text", x: 410, y: 225, anchor: "middle", cls: "seg-label", text: "Africa", visible: true },
        lAs:    { type: "text", x: 570, y: 95, anchor: "middle", cls: "seg-label", text: "Asia", visible: true },
        potato: { type: "art", kind: "hist.potato", x: 40, y: 360, label: "Potato" },
        maize:  { type: "art", kind: "hist.corn", x: 120, y: 360, label: "Maize" },
        tomato: { type: "art", kind: "hist.tomato", x: 200, y: 360, label: "Tomato" },
        cacao:  { type: "art", kind: "hist.cacao", x: 280, y: 360, label: "Cacao" },
        horse:  { type: "art", kind: "hist.horse", x: 440, y: 360, label: "Horse" },
        cow:    { type: "art", kind: "hist.cow", x: 520, y: 360, label: "Cattle" },
        wheat:  { type: "art", kind: "hist.wheat", x: 600, y: 360, label: "Wheat" },
        sugar:  { type: "art", kind: "hist.sugarcane", x: 680, y: 360, label: "Sugarcane" }
      },
      arrows: {
        aE:  { d: "M236,128 C280,96 320,96 352,110", label: { text: "to Europe", x: 300, y: 92 } },
        aAs: { d: "M420,128 C470,150 520,150 580,138", label: { text: "to Asia", x: 500, y: 165 } },
        aAf: { d: "M300,222 C320,212 338,206 358,204", label: { text: "to Africa", x: 318, y: 240 } },
        aW:  { d: "M352,132 C320,150 280,152 240,144", label: { text: "to the Americas", x: 290, y: 170 }, dashed: true }
      },
      steps: [
        { caption: "Crops from the Americas went east: potatoes, maize (corn), tomatoes, and cacao, the bean used to make chocolate.",
          do: [{ show: ["aE"] }, { show: ["potato", "maize", "tomato", "cacao"], stagger: 150 },
               { flow: { along: "aE", art: "hist.potato", s: .6 } }] },
        { caption: "These crops spread far beyond Europe. Maize became a key food in parts of Africa, and sweet potatoes and chili peppers changed cooking across Asia.",
          do: [{ show: ["aAf", "aAs"] }, { all: [{ flow: { along: "aAf", art: "hist.corn", s: .6 } }, { flow: { along: "aAs", art: "hist.corn", s: .6 } }] }] },
        { caption: "Going the other way, ships brought horses and cattle. Horses had died out in the Americas long before, and soon they changed how many Native peoples hunted and travelled.",
          do: [{ show: ["aW"] }, { show: ["horse", "cow"], stagger: 150 }, { flow: { along: "aW", art: "hist.horse", s: .6 } }] },
        { caption: "Wheat and sugarcane came too. Sugarcane grew well in the hot Caribbean and Brazil, and Europeans set up huge sugar farms called plantations.",
          do: [{ show: ["wheat", "sugar"], stagger: 150 }, { flow: { along: "aW", art: "hist.sugarcane", s: .6 } }] }
      ]
    },
    {
      title: "The terrible costs",
      enter: "fade",
      elements: {
        map:    { type: "art", kind: "hist.mapWorld", layer: "back", x: 20, y: 20, visible: true },
        note:   { type: "text", x: 770, y: 342, anchor: "end", cls: "tick", text: "simplified map, not to scale", visible: true },
        lAm:    { type: "text", x: 150, y: 100, anchor: "middle", cls: "seg-label", text: "The Americas", visible: true },
        lEu:    { type: "text", x: 405, y: 64, anchor: "middle", cls: "seg-label", text: "Europe", visible: true },
        lAf:    { type: "text", x: 410, y: 225, anchor: "middle", cls: "seg-label", text: "Africa", visible: true },
        dis:    { type: "box", x: 40, y: 362, w: 340, h: 74, tone: "red", label: "Disease", sub: "in many places, most Indigenous people died" },
        slave:  { type: "box", x: 420, y: 362, w: 340, h: 74, tone: "grey", label: "Slavery", sub: "more than 12 million Africans forced across the ocean" }
      },
      arrows: {
        aD:  { d: "M352,120 C320,108 270,104 230,118", label: { text: "smallpox, measles", x: 290, y: 96 } },
        aS1: { d: "M352,196 C310,190 270,170 236,160", label: { text: "enslaved Africans", x: 300, y: 205 } },
        aS2: { d: "M352,204 C330,210 315,214 300,218" }
      },
      steps: [
        { caption: "Europeans also carried diseases such as smallpox and measles. People in the Americas had never been exposed to these germs, so their bodies had no defenses against them.",
          do: [{ show: ["aD"] }] },
        { caption: "Epidemics swept across the Americas. In the century after 1492, a very large share of Indigenous people died. In many places, most of the population was lost.",
          do: [{ show: ["dis"] }] },
        { caption: "The plantations needed workers. European traders forced more than 12 million enslaved Africans across the Atlantic, in cruel conditions, to work without pay or freedom.",
          do: [{ show: ["aS1", "aS2"] }, { show: ["slave"] }] },
        { caption: "The Columbian Exchange changed the whole world. It brought new foods and animals to every continent, but also terrible disease, conquest and slavery.",
          do: [{ pulse: "dis" }, { pulse: "slave" }] }
      ]
    }
  ]
});
