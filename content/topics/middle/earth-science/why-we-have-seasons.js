CC.topic({
  id: "why-we-have-seasons",
  level: "middle",
  section: "earth-science",
  order: 2,
  title: "Why we have seasons",
  summary: "Why summer days are long and warm and winter days are short and cold, and why it's the tilt, not the distance.",
  scenes: [
    {
      title: "Summer and winter skies",
      elements: {
        soil:   { type: "art", kind: "soil", x: 0, y: 320 },
        junL:   { type: "text", x: 205, y: 34, anchor: "middle", cls: "lbl", text: "June" },
        decL:   { type: "text", x: 595, y: 34, anchor: "middle", cls: "lbl", text: "December" },
        place:  { type: "text", x: 400, y: 34, anchor: "middle", cls: "sub", text: "New York" },
        junP:   { type: "path", px: true, dashed: true, tone: "yellow", w: 3, pts: [[40, 320], [73, 234], [106, 166], [139, 118], [172, 90], [205, 80], [238, 90], [271, 118], [304, 166], [337, 234], [370, 320]] },
        decP:   { type: "path", px: true, dashed: true, tone: "yellow", w: 3, pts: [[520, 320], [535, 291], [550, 269], [565, 253], [580, 243], [595, 240], [610, 243], [625, 253], [640, 269], [655, 291], [670, 320]] },
        junSun: { type: "art", kind: "sun", x: 177, y: 52, s: 0.7 },
        decSun: { type: "art", kind: "sun", x: 567, y: 212, s: 0.7 },
        junYou: { type: "art", kind: "person", tone: "violet", x: 82, y: 250 },
        decYou: { type: "art", kind: "person", tone: "violet", x: 466, y: 250 },
        junHi:  { type: "text", x: 230, y: 70, cls: "callout", text: "high at noon" },
        decLo:  { type: "text", x: 620, y: 222, cls: "callout", text: "low at noon" },
        junM:   { type: "meter", x: 60, y: 392, w: 290, total: 24, value: 0, label: "Daylight", format: "about {v} hours", tone: "amber" },
        decM:   { type: "meter", x: 450, y: 392, w: 290, total: 24, value: 0, label: "Daylight", format: "about {v} hours", tone: "amber" }
      },
      steps: [
        { caption: "Think of a summer day in New York, in June. The sun rises early, climbs high in the sky and sets late. You get about 15 hours of daylight.",
          do: [{ show: ["soil", "place", "junL", "junYou"] }, { show: ["junP"] }, { show: ["junSun", "junHi"] }, { show: ["junM"] }, { meter: { id: "junM", value: 15 } }] },
        { caption: "Now a winter day there, in December. The sun rises late, stays low in the sky and sets early. You get only about 9 hours of daylight.",
          do: [{ show: ["decL", "decYou"] }, { show: ["decP"] }, { show: ["decSun", "decLo"] }, { show: ["decM"] }, { meter: { id: "decM", value: 9 } }] },
        { caption: "Low sunlight warms the ground less, and there are fewer hours of it, so winter is colder. But why does the sun's path change during the year?",
          do: [{ pulse: "junSun" }, { pulse: "decSun" }] }
      ]
    },
    {
      title: "Earth is tilted",
      enter: "fade",
      elements: {
        earth: { type: "art", kind: "earth.tiltedEarth", ref: true, x: 80, y: 70, s: 2 },
        cAxis: { type: "callout", from: [262, 112], to: [310, 96], text: "Axis" },
        angle: { type: "text", x: 222, y: 64, anchor: "middle", cls: "seg-label", tone: "amber", text: "23.5°" },
        vert:  { type: "text", x: 200, y: 372, anchor: "middle", cls: "sub", text: "dashed line: straight up and down" },
        b1:    { type: "box", x: 440, y: 80, w: 320, h: 110, tone: "sky", label: "Axis", sub: "an imaginary line through the North and South Poles. Earth spins around it once a day." },
        b2:    { type: "box", x: 440, y: 220, w: 320, h: 110, tone: "amber", label: "Tilted about 23.5°", sub: "and it always points the same way in space, toward the North Star." }
      },
      steps: [
        { caption: "Earth spins around an imaginary line through the North and South Poles, called its axis. One spin takes one day.",
          do: [{ show: ["earth"] }, { show: ["cAxis", "b1"] }] },
        { caption: "The axis isn't straight up and down. It's tilted by about 23.5°, and it keeps pointing the same way in space all year.",
          do: [{ show: ["angle", "vert"] }, { pulse: "earth" }, { show: ["b2"] }] }
      ]
    },
    {
      title: "A year around the sun",
      enter: "fade",
      elements: {
        sun:    { type: "art", kind: "sun", x: 360, y: 190, label: "Sun" },
        orbitL: { type: "text", x: 400, y: 118, anchor: "middle", cls: "sub", text: "Earth's orbit: one trip takes a year (not to scale)" },
        rayJ:   { type: "path", px: true, tone: "yellow", w: 4, pts: [[358, 230], [188, 230]] },
        rayD:   { type: "path", px: true, tone: "yellow", w: 4, pts: [[442, 230], [612, 230]] },
        earthJ: { type: "art", kind: "earth.tiltedEarth", x: 95, y: 177.5, s: 0.75 },
        earthT: { type: "art", kind: "earth.tiltedEarth", x: 95, y: 177.5, s: 0.75 },
        earthD: { type: "art", kind: "earth.tiltedEarth", x: 615, y: 177.5, s: 0.75 },
        junL:   { type: "text", x: 140, y: 306, anchor: "middle", cls: "artlbl", text: "June" },
        junS:   { type: "text", x: 140, y: 325, anchor: "middle", cls: "sub", text: "North Pole leans toward the sun" },
        junS2:  { type: "text", x: 140, y: 343, anchor: "middle", cls: "sub", text: "summer in the north" },
        decL:   { type: "text", x: 660, y: 306, anchor: "middle", cls: "artlbl", text: "December" },
        decS:   { type: "text", x: 660, y: 325, anchor: "middle", cls: "sub", text: "North Pole leans away" },
        decS1:  { type: "text", x: 660, y: 343, anchor: "middle", cls: "sub", text: "winter in the north" },
        decS2:  { type: "text", x: 660, y: 361, anchor: "middle", cls: "sub", text: "summer in the south" },
        year:   { type: "track", d: "M140,230 A260,90 0 0 0 660,230 A260,90 0 0 0 140,230" },
        half:   { type: "track", d: "M140,230 A260,90 0 0 0 660,230" }
      },
      arrows: {
        o1: { d: "M216,294 A260,90 0 0 0 584,294" },
        o2: { d: "M584,166 A260,90 0 0 0 216,166" }
      },
      steps: [
        { caption: "Earth also travels around the sun. One full trip, called an orbit, takes a year.",
          do: [{ show: ["sun", "o1", "o2", "orbitL", "earthJ"] }, { move: { id: "earthJ", along: "year", dur: 3000 } }] },
        { caption: "In June, the North Pole leans toward the sun. The Northern Hemisphere gets sunlight more directly and for more hours each day. It's summer there.",
          do: [{ show: ["rayJ"] }, { show: ["junL", "junS", "junS2"] }, { pulse: "earthJ" }] },
        { caption: "Six months later, Earth is on the other side of the sun. The axis still points the same way, so now the North Pole leans away. It's winter in the north.",
          do: [{ show: ["earthT"] }, { move: { id: "earthT", along: "half", dur: 2000 } }, { show: ["earthD"] }, { hide: ["earthT"] }, { show: ["rayD", "decL", "decS", "decS1"] }] },
        { caption: "Meanwhile the South Pole leans toward the sun, so December is summer in the Southern Hemisphere, in places like Australia and Argentina.",
          do: [{ show: ["decS2"] }, { pulse: "earthD" }] }
      ]
    },
    {
      title: "Direct and slanted sunlight",
      enter: "slide",
      elements: {
        b1: { type: "art", kind: "earth.beam", angle: 90, x: 50, y: 70, s: 1.2, label: "Direct sunlight", sub: "lands on a small patch, so each spot gets a lot of energy", lw: 290 },
        b2: { type: "art", kind: "earth.beam", angle: 35, x: 440, y: 70, s: 1.2, label: "Slanted sunlight", sub: "spreads over a bigger patch, so each spot gets less energy", lw: 290 }
      },
      steps: [
        { caption: "Why does leaning toward the sun make it warmer? Picture a beam of sunlight shining straight down. All its energy lands on a small patch of ground.",
          do: [{ show: ["b1"] }, { pulse: "b1" }] },
        { caption: "Now tilt the beam. The same light spreads over a bigger patch, so each spot warms less. That's winter sunlight, low in the sky.",
          do: [{ show: ["b2"] }, { pulse: "b2" }] }
      ]
    },
    {
      title: "It's not the distance",
      enter: "fade",
      elements: {
        sun:    { type: "art", kind: "sun", x: 360, y: 150, label: "Sun", visible: true },
        earthJ: { type: "art", kind: "earth.tiltedEarth", x: 95, y: 137.5, s: 0.75, visible: true },
        earthD: { type: "art", kind: "earth.tiltedEarth", x: 615, y: 137.5, s: 0.75, visible: true },
        far:    { type: "text", x: 140, y: 304, anchor: "middle", cls: "artlbl", text: "Early July: farthest" },
        farS:   { type: "text", x: 140, y: 323, anchor: "middle", cls: "sub", text: "about 152 million km" },
        near:   { type: "text", x: 660, y: 304, anchor: "middle", cls: "artlbl", text: "Early January: closest" },
        nearS:  { type: "text", x: 660, y: 323, anchor: "middle", cls: "sub", text: "about 147 million km" },
        scale:  { type: "text", x: 400, y: 40, anchor: "middle", cls: "sub", text: "orbit drawn squashed and not to scale: it's almost a circle" },
        take:   { type: "box", x: 170, y: 346, w: 460, h: 90, tone: "yellow", label: "Seasons come from the tilt", sub: "The half of Earth leaning toward the sun gets more direct sunlight and longer days: that's summer." }
      },
      arrows: {
        o1: { d: "M216,254 A260,90 0 0 0 584,254" },
        o2: { d: "M584,126 A260,90 0 0 0 216,126" }
      },
      steps: [
        { caption: "Is summer when Earth is closest to the sun? No. Earth is actually closest in early January, in the middle of northern winter. The difference is only about 3%.",
          do: [{ show: ["o1", "o2", "scale"] }, { show: ["near", "nearS"] }, { pulse: "earthD" }, { show: ["far", "farS"] }] },
        { caption: "So it's the tilt, not the distance. The half of Earth leaning toward the sun gets more direct sunlight and longer days, and that's summer.",
          do: [{ show: ["take"] }] }
      ]
    }
  ]
});
