CC.topic({
  id: "silk-road",
  level: "middle",
  section: "history",
  order: 1,
  title: "The Silk Road",
  summary: "How a chain of trade routes linked China to the Mediterranean, carrying goods, ideas and even diseases.",
  scenes: [
    {
      title: "A road across Asia",
      elements: {
        map:    { type: "art", kind: "hist.mapEurasia", layer: "back", x: 20, y: 20 },
        note:   { type: "text", x: 780, y: 368, anchor: "end", cls: "tick", text: "simplified map, not to scale" },
        east:   { type: "path", px: true, pts: [[689, 157], [661, 145], [610, 118], [557, 126], [504, 122], [453, 121]], tone: "yellow", w: 5 },
        west:   { type: "path", px: true, pts: [[453, 121], [423, 135], [380, 150], [327, 165], [292, 155], [280, 144]], tone: "yellow", w: 5 },
        chang:  { type: "point", px: true, at: [689, 157], tone: "violet", r: 7, label: "Chang'an", lx: 0, ly: 26 },
        samar:  { type: "point", px: true, at: [453, 121], tone: "violet", r: 7, label: "Samarkand", lx: 0, ly: 26 },
        antio:  { type: "point", px: true, at: [280, 144], tone: "violet", r: 7, label: "Antioch", lx: -12, ly: -12, anchor: "end" },
        name:   { type: "text", x: 560, y: 162, anchor: "middle", cls: "seg-label", text: "The Silk Road" },
        camel1: { type: "art", kind: "hist.camel", x: 36, y: 370, s: .65 },
        camel2: { type: "art", kind: "hist.camel", x: 104, y: 370, s: .65 },
        camel3: { type: "art", kind: "hist.camel", x: 172, y: 370, s: .65 },
        camelL: { type: "text", x: 250, y: 408, cls: "artlbl", text: "Camel caravan" },
        dist:   { type: "box", x: 440, y: 372, w: 300, h: 62, tone: "yellow", label: "About 4,000 miles", sub: "(6,400 km) from Chang'an to Antioch" },
        trCar:  { type: "track", d: "M689,157 L661,145 L610,118 L557,126 L504,122 L453,121 L423,135 L380,150 L327,165 L292,155 L280,144" }
      },
      steps: [
        { caption: "More than 2,000 years ago, in the 2nd century BCE, China's Han dynasty began trading with lands far to the west. Its capital was Chang'an.",
          do: [{ show: ["map", "note"] }, { show: ["chang"] }, { pulse: "chang" }] },
        { caption: "Traders headed west across deserts and over high mountains to Samarkand, a rich city in Central Asia.",
          do: [{ show: ["east"] }, { show: ["samar"] }] },
        { caption: "From there, routes crossed Persia to the shores of the Mediterranean Sea.",
          do: [{ show: ["west"] }, { show: ["antio"] }, { show: ["dist"] }] },
        { caption: "It was never one single road but a web of routes. Today we call it the Silk Road, after its most famous product.",
          do: [{ show: ["name"] }, { pulse: "east" }] },
        { caption: "Merchants travelled in caravans, long lines of people and camels that crossed the dry lands together for safety.",
          do: [{ show: ["camel1", "camel2", "camel3"], stagger: 150 }, { show: ["camelL"] }, { flow: { along: "trCar", art: "hist.camel", s: .45, dur: 3200 } }] }
      ]
    },
    {
      title: "Goods moving both ways",
      enter: "fade",
      elements: {
        map:    { type: "art", kind: "hist.mapEurasia", layer: "back", x: 20, y: 20, visible: true },
        note:   { type: "text", x: 780, y: 368, anchor: "end", cls: "tick", text: "simplified map, not to scale", visible: true },
        route:  { type: "path", px: true, pts: [[689, 157], [661, 145], [610, 118], [557, 126], [504, 122], [453, 121], [423, 135], [380, 150], [327, 165], [292, 155], [280, 144]], tone: "yellow", w: 5, visible: true },
        sealeg: { type: "path", px: true, pts: [[280, 144], [232, 150], [180, 140], [162, 134], [152, 120], [147, 108]], tone: "yellow", w: 4, dashed: true },
        chang:  { type: "point", px: true, at: [689, 157], tone: "violet", r: 7, label: "Chang'an", lx: 0, ly: 26, visible: true },
        samar:  { type: "point", px: true, at: [453, 121], tone: "violet", r: 7, label: "Samarkand", lx: 0, ly: 26, visible: true },
        antio:  { type: "point", px: true, at: [280, 144], tone: "violet", r: 7, label: "Antioch", lx: 12, ly: -12, anchor: "start", visible: true },
        rome:   { type: "point", px: true, at: [147, 108], tone: "violet", r: 7, label: "Rome", lx: -12, ly: -10, anchor: "end" },
        goWest: { type: "box", x: 40, y: 372, w: 340, h: 62, tone: "amber", label: "Going west ←", sub: "silk, paper, spices" },
        goEast: { type: "box", x: 420, y: 372, w: 340, h: 62, tone: "teal", label: "Going east →", sub: "gold, silver, glass, horses" },
        trW:    { type: "track", d: "M689,157 L661,145 L610,118 L557,126 L504,122 L453,121 L423,135 L380,150 L327,165 L292,155 L280,144 L232,150 L180,140 L162,134 L152,120 L147,108" },
        trE:    { type: "track", d: "M147,108 L152,120 L162,134 L180,140 L232,150 L280,144 L292,155 L327,165 L380,150 L423,135 L453,121 L504,122 L557,126 L610,118 L661,145 L689,157" }
      },
      steps: [
        { caption: "Silk was China's treasure. Only the Chinese knew how to make it, and wealthy Romans paid huge prices for the smooth, shiny cloth.",
          do: [{ show: ["sealeg", "rome"] }, { flow: { along: "trW", token: "silk", tone: "amber", dur: 3000 } }] },
        { caption: "Paper from China moved west too, along with spices such as pepper and cinnamon from India and Southeast Asia.",
          do: [{ show: ["goWest"] }, { flow: { along: "trW", token: "paper", tone: "amber", dur: 3000 } }, { flow: { along: "trW", token: "spices", tone: "amber", dur: 3000 } }] },
        { caption: "Going the other way were gold and silver, glassware from the Mediterranean, and strong horses from Central Asia.",
          do: [{ show: ["goEast"] }, { flow: { along: "trE", token: "gold", tone: "teal", dur: 3000 } }, { flow: { along: "trE", token: "glass", tone: "teal", dur: 3000 } }] }
      ]
    },
    {
      title: "Passed along in relays",
      enter: "fade",
      elements: {
        map:    { type: "art", kind: "hist.mapEurasia", layer: "back", x: 20, y: 20, visible: true },
        note:   { type: "text", x: 780, y: 368, anchor: "end", cls: "tick", text: "simplified map, not to scale", visible: true },
        route:  { type: "path", px: true, pts: [[689, 157], [661, 145], [610, 118], [557, 126], [504, 122], [453, 121], [423, 135], [380, 150], [327, 165], [292, 155], [280, 144]], tone: "yellow", w: 5, visible: true },
        t1:     { type: "art", kind: "person", tone: "violet", x: 588, y: 136, s: .6 },
        t2:     { type: "art", kind: "person", tone: "teal", x: 462, y: 134, s: .6 },
        t3:     { type: "art", kind: "person", tone: "green", x: 300, y: 168, s: .6 },
        m1:     { type: "point", px: true, at: [504, 122], tone: "amber", r: 6, visible: true },
        m2:     { type: "point", px: true, at: [423, 135], tone: "amber", r: 6, visible: true },
        chang:  { type: "point", px: true, at: [689, 157], tone: "violet", r: 7, label: "Chang'an", lx: 0, ly: 26, visible: true },
        antio:  { type: "point", px: true, at: [280, 144], tone: "violet", r: 7, label: "Antioch", lx: -12, ly: -12, anchor: "end", visible: true },
        price:  { type: "meter", x: 40, y: 400, w: 340, total: 100, value: 10, label: "Price of silk", format: " ", tone: "amber" },
        priceL: { type: "text", x: 380, y: 392, anchor: "end", cls: "mval", text: "many times higher" },
        relay:  { type: "box", x: 420, y: 372, w: 340, h: 62, tone: "violet", label: "A relay of traders", sub: "each one carried goods for one stretch" },
        s1:     { type: "track", d: "M689,157 L661,145 L610,118 L557,126 L504,122" },
        s2:     { type: "track", d: "M504,122 L453,121 L423,135" },
        s3:     { type: "track", d: "M423,135 L380,150 L327,165 L292,155 L280,144" }
      },
      steps: [
        { caption: "Hardly anyone travelled the whole way. Most merchants worked one stretch of the route, between two market towns.",
          do: [{ show: ["t1", "t2", "t3"], stagger: 200 }, { show: ["relay"] }] },
        { caption: "At each market town, goods were sold to the next merchant, who carried them on. Silk could change hands many times.",
          do: [{ show: ["price"] }, { all: [{ flow: { along: "s1", token: "silk", tone: "amber", dur: 1400 } }, { meter: { id: "price", value: 30, dur: 1400 } }] },
               { all: [{ flow: { along: "s2", token: "silk", tone: "amber", dur: 1200 } }, { meter: { id: "price", value: 55, dur: 1200 } }] },
               { all: [{ flow: { along: "s3", token: "silk", tone: "amber", dur: 1000 } }, { meter: { id: "price", value: 90, dur: 1000 } }] }] },
        { caption: "Every trader wanted a profit, so the price rose at each stop. By the time silk reached the Mediterranean, it cost many times more.",
          do: [{ show: ["priceL"] }, { pulse: "price" }] }
      ]
    },
    {
      title: "Ideas and diseases travelled too",
      enter: "fade",
      elements: {
        map:    { type: "art", kind: "hist.mapEurasia", layer: "back", x: 20, y: 20, visible: true },
        note:   { type: "text", x: 780, y: 368, anchor: "end", cls: "tick", text: "simplified map, not to scale", visible: true },
        route:  { type: "path", px: true, pts: [[689, 157], [661, 145], [610, 118], [557, 126], [504, 122], [453, 121], [423, 135], [380, 150], [327, 165], [292, 155], [280, 144]], tone: "yellow", w: 5, opacity: .45, visible: true },
        buddha: { type: "path", px: true, pts: [[555, 222], [500, 204], [474, 176], [482, 148], [504, 122], [557, 126], [610, 118], [661, 145], [689, 157]], tone: "violet", w: 4 },
        bOrig:  { type: "point", px: true, at: [555, 222], tone: "violet", r: 6 },
        bLbl:   { type: "text", x: 600, y: 246, anchor: "middle", cls: "seg-label", tone: "violet", text: "Buddhism" },
        plague: { type: "path", px: true, pts: [[520, 100], [453, 110], [400, 74], [340, 62], [276, 86], [240, 108], [200, 125], [158, 134]], tone: "red", w: 4, dashed: true },
        pLbl:   { type: "text", x: 300, y: 52, anchor: "middle", cls: "seg-label", tone: "red", text: "Black Death, 1340s" },
        take:   { type: "box", x: 180, y: 372, w: 440, h: 62, tone: "green", label: "More than a trade route", sub: "goods, ideas, religions and diseases all moved along it" }
      },
      steps: [
        { caption: "Ideas travelled with the traders. Buddhism, a religion that began in India, spread along these routes and reached China by about 2,000 years ago.",
          do: [{ show: ["bOrig"] }, { show: ["buddha", "bLbl"] }] },
        { caption: "Diseases travelled too. In the 1340s, a deadly plague called the Black Death spread west along trade routes and into Europe.",
          do: [{ show: ["plague", "pLbl"] }] },
        { caption: "For more than 1,500 years the Silk Road linked East and West, trading goods, ideas, religions and, sadly, diseases.",
          do: [{ show: ["take"] }] }
      ]
    }
  ]
});
