CC.topic({
  id: "water-cycle",
  level: "middle",
  section: "earth-science",
  order: 1,
  title: "The water cycle",
  summary: "How the same water travels from the ocean to the sky, falls on the land and flows back again.",
  scenes: [
    {
      title: "Ocean, sky and land",
      elements: {
        land:    { type: "art", kind: "earth.landscape", x: 0, y: 150 },
        oceanL:  { type: "text", x: 40, y: 410, cls: "callout", text: "Ocean" },
        mtnL:    { type: "callout", from: [600, 250], to: [650, 248], text: "Mountains" },
        riverL:  { type: "callout", from: [560, 318], to: [590, 350], text: "River" },
        sun:     { type: "art", kind: "sun", x: 30, y: 20, label: "Sun" },
        vap1:    { type: "art", kind: "earth.vapour", x: 120, y: 246 },
        vap2:    { type: "art", kind: "earth.vapour", x: 220, y: 246 },
        evapL:   { type: "text", x: 290, y: 280, cls: "callout", text: "Evaporation" },
        cloud:   { type: "art", kind: "cloud", x: 150, y: 70 },
        condL:   { type: "text", x: 220, y: 66, anchor: "middle", cls: "callout", text: "Condensation" },
        rain:    { type: "art", kind: "earth.rainCloud", x: 420, y: 40 },
        snow:    { type: "art", kind: "earth.rainCloud", snow: true, x: 636, y: 40 },
        precL:   { type: "text", x: 600, y: 30, anchor: "middle", cls: "callout", text: "Precipitation: rain and snow" },
        runL:    { type: "text", x: 330, y: 350, anchor: "end", cls: "callout", text: "Runoff" },
        ground:  { type: "art", kind: "earth.groundwater", x: 380, y: 385 },
        groundL: { type: "text", x: 780, y: 442, anchor: "end", cls: "callout", text: "Groundwater" },
        tree1:   { type: "art", kind: "earth.tree", x: 384, y: 246, s: 0.7 },
        tree2:   { type: "art", kind: "earth.tree", x: 426, y: 242, s: 0.7 },
        vap3:    { type: "art", kind: "earth.vapour", x: 400, y: 196, s: 0.7 },
        transL:  { type: "text", x: 396, y: 226, anchor: "end", cls: "callout", text: "Transpiration" },
        trSun:   { type: "track", d: "M95,95 C120,170 150,240 170,300" },
        trUp:    { type: "track", d: "M180,250 C185,200 200,170 215,130" },
        trRiver: { type: "track", d: "M668,268 C664,288 650,300 620,308 C560,320 520,310 470,316 C420,322 390,318 345,323 L290,328" },
        trSoak:  { type: "track", d: "M560,312 C560,340 555,370 545,405" },
        trGround:{ type: "track", d: "M740,410 C600,412 450,412 300,405" },
        trTrans: { type: "track", d: "M425,250 C425,230 428,210 432,190" }
      },
      steps: [
        { caption: "Earth's water is always on the move, between the ocean, the air and the land. This never-ending trip is called the water cycle.",
          do: [{ show: ["land"] }, { show: ["oceanL", "mtnL", "riverL"], stagger: 250 }] },
        { caption: "The sun heats the ocean. Water at the surface turns into an invisible gas called water vapour, which rises into the air. This is evaporation.",
          do: [{ show: ["sun"] }, { flow: { along: "trSun", token: "heat", tone: "yellow", count: 2 } }, { show: ["vap1", "vap2", "evapL"], stagger: 200 }] },
        { caption: "Higher up, the air is colder. The vapour cools and turns back into tiny drops of water. Billions of them together make a cloud. This is condensation.",
          do: [{ flow: { along: "trUp", token: "vapour", tone: "sky", count: 2 } }, { show: ["cloud", "condL"] }] },
        { caption: "Wind blows the cloud over the land, toward the mountains.",
          do: [{ hide: ["condL"] }, { move: { id: "cloud", to: [425, 40], dur: 1600 } }] },
        { caption: "The tiny drops join into bigger drops that are too heavy to float. They fall as precipitation: rain, or snow where it's cold, like on high mountains.",
          do: [{ show: ["rain"] }, { hide: ["cloud"] }, { show: ["snow", "precL"] }] },
        { caption: "Rain and melted snow flow downhill into rivers, and rivers carry the water back to the ocean. This is called runoff.",
          do: [{ show: ["runL"] }, { flow: { along: "trRiver", token: "water", tone: "blue", count: 3, dur: 2000, gap: 400 } }] },
        { caption: "Some water soaks into the ground instead. This groundwater moves slowly through soil and rock, and much of it seeps back to rivers and the ocean too.",
          do: [{ flow: { along: "trSoak", token: "water", tone: "blue" } }, { show: ["ground", "groundL"] }, { flow: { along: "trGround", token: "water", tone: "blue", dur: 2200 } }] },
        { caption: "Plants add water vapour too. Their roots take up water, and their leaves let it out into the air as vapour. This is transpiration.",
          do: [{ show: ["tree1", "tree2"], stagger: 150 }, { show: ["vap3", "transL"] }, { flow: { along: "trTrans", token: "vapour", tone: "sky" } }] }
      ]
    },
    {
      title: "A loop with no end",
      enter: "fade",
      elements: {
        vap:   { type: "art", kind: "earth.vapour", x: 120, y: 160, label: "Evaporation", sub: "and transpiration", lw: 170 },
        cloud: { type: "art", kind: "cloud", x: 330, y: 40, label: "Condensation", sub: "clouds form" },
        rain:  { type: "art", kind: "earth.rainCloud", x: 610, y: 130, s: 0.75, label: "Precipitation", sub: "rain, snow, hail", lw: 160 },
        sea:   { type: "art", kind: "earth.sea", x: 330, y: 322, s: 0.4, label: "Collection", sub: "oceans, lakes, rivers, ground", lw: 240 },
        sun:   { type: "art", kind: "sun", x: 368, y: 186, s: 0.8, label: "The sun", sub: "powers the cycle", lw: 150 }
      },
      arrows: {
        a1: { d: "M150,150 C160,90 230,80 318,80" },
        a2: { d: "M482,80 C580,80 640,96 664,124" },
        a3: { d: "M666,306 C660,350 580,350 488,350" },
        a4: { d: "M318,350 C230,350 150,340 150,298" }
      },
      steps: [
        { caption: "Put the steps together and you get a loop: evaporation, condensation, precipitation, collection, and then evaporation again.",
          do: [{ show: ["vap", "a1", "cloud", "a2", "rain", "a3", "sea", "a4"], stagger: 300 }] },
        { caption: "The sun's heat keeps the loop going, and gravity pulls the water back down. Earth's water has been going around this loop for billions of years.",
          do: [{ show: ["sun"] }, { pulse: "sun" }] }
      ]
    }
  ]
});
