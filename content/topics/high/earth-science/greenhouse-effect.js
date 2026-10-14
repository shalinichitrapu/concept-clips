CC.topic({
  id: "greenhouse-effect",
  level: "high",
  section: "earth-science",
  order: 2,
  title: "The greenhouse effect",
  summary: "How a few gases in the air keep Earth warm by sending heat back down, and why adding more CO₂ warms the planet.",
  scenes: [
    {
      title: "Sunlight in, heat out",
      elements: {
        atmos:  { type: "art", kind: "earth.atmosphere", layer: "back", x: 0, y: 120 },
        ground: { type: "art", kind: "earth.surface", layer: "back", x: 0, y: 340 },
        spaceL: { type: "text", x: 780, y: 40, anchor: "end", cls: "eqlabel", text: "SPACE" },
        airL:   { type: "text", x: 780, y: 172, anchor: "end", cls: "eqlabel", text: "ATMOSPHERE" },
        sun:    { type: "art", kind: "sun", x: 30, y: 14, s: 0.9 },
        r1:     { type: "path", px: true, tone: "yellow", w: 5, pts: [[100, 86], [210, 348]] },
        r2:     { type: "path", px: true, tone: "yellow", w: 5, pts: [[66, 90], [150, 348]] },
        cloud:  { type: "art", kind: "cloud", x: 240, y: 150, s: 0.8 },
        refl:   { type: "path", px: true, tone: "yellow", w: 4, dashed: true, pts: [[112, 62], [290, 156], [370, 40]] },
        reflL:  { type: "text", x: 380, y: 44, cls: "callout", text: "about 30% reflected back to space" },
        ir1:    { type: "art", kind: "earth.arrow", dir: "up", wavy: true, tone: "red", x: 404, y: 226, s: 0.8 },
        ir2:    { type: "art", kind: "earth.arrow", dir: "up", wavy: true, tone: "red", x: 544, y: 226, s: 0.8 },
        irL:    { type: "text", x: 400, y: 334, anchor: "end", cls: "callout", text: "infrared (heat)" },
        thermo: { type: "art", kind: "earth.thermometer", tone: "blue", level: 0.2, x: 730, y: 190 },
        temp:   { type: "text", x: 716, y: 256, anchor: "end", cls: "eqbig", text: "−18 °C" },
        tempL:  { type: "text", x: 716, y: 278, anchor: "end", cls: "sub", text: "average" },
        trS1:   { type: "track", d: "M100,86 L210,348" },
        trS2:   { type: "track", d: "M66,90 L150,348" },
        trRef:  { type: "track", d: "M112,62 L290,156 L370,40" },
        trUp1:  { type: "track", d: "M420,340 L420,10" },
        trUp2:  { type: "track", d: "M560,340 L560,10" }
      },
      steps: [
        { caption: "Earth is wrapped in a thin layer of air, the atmosphere. Sunlight passes straight through it and warms the ground and the oceans.",
          do: [{ show: ["ground", "atmos", "spaceL", "airL"] }, { show: ["sun"] }, { show: ["r2", "r1"] }, { all: [{ flow: { along: "trS1", token: "sunlight", tone: "yellow" } }, { flow: { along: "trS2", token: "sunlight", tone: "yellow" } }] }] },
        { caption: "Not all of it gets in. About 30% of the sunlight is reflected straight back to space by clouds, ice and other bright surfaces.",
          do: [{ show: ["cloud"] }, { show: ["refl"] }, { flow: { along: "trRef", token: "sunlight", tone: "yellow", dur: 1600 } }, { show: ["reflL"] }] },
        { caption: "The warmed surface gives off energy of its own as infrared radiation, which we can't see but feel as heat, like the warmth rising off a sunny pavement.",
          do: [{ show: ["ir1", "ir2", "irL"], stagger: 200 }, { all: [{ flow: { along: "trUp1", token: "infrared", tone: "red", dur: 1600 } }, { flow: { along: "trUp2", token: "infrared", tone: "red", dur: 1600 } }] }] },
        { caption: "If all of that infrared escaped to space, Earth's average surface temperature would be about −18\u00a0°C, and the oceans would freeze over.",
          do: [{ show: ["thermo", "temp", "tempL"] }, { pulse: "thermo" }] }
      ]
    },
    {
      title: "Greenhouse gases",
      enter: "fade",
      elements: {
        atmos:  { type: "art", kind: "earth.atmosphere", layer: "back", x: 0, y: 120, visible: true },
        ground: { type: "art", kind: "earth.surface", layer: "back", x: 0, y: 340, visible: true },
        spaceL: { type: "text", x: 780, y: 40, anchor: "end", cls: "eqlabel", text: "SPACE", visible: true },
        airL:   { type: "text", x: 780, y: 172, anchor: "end", cls: "eqlabel", text: "ATMOSPHERE", visible: true },
        sun:    { type: "art", kind: "sun", x: 30, y: 14, s: 0.9, visible: true },
        r1:     { type: "path", px: true, tone: "yellow", w: 5, pts: [[100, 86], [210, 348]], visible: true },
        r2:     { type: "path", px: true, tone: "yellow", w: 5, pts: [[66, 90], [150, 348]], visible: true },
        cloud:  { type: "art", kind: "cloud", x: 240, y: 150, s: 0.8, visible: true },
        refl:   { type: "path", px: true, tone: "yellow", w: 4, dashed: true, pts: [[112, 62], [290, 156], [370, 40]], visible: true },
        reflL:  { type: "text", x: 380, y: 44, cls: "callout", text: "about 30% reflected back to space", visible: true },
        ir1:    { type: "art", kind: "earth.arrow", dir: "up", wavy: true, tone: "red", x: 404, y: 226, s: 0.8, visible: true },
        ir2:    { type: "art", kind: "earth.arrow", dir: "up", wavy: true, tone: "red", x: 544, y: 226, s: 0.8, visible: true },
        irL:    { type: "text", x: 400, y: 334, anchor: "end", cls: "callout", text: "infrared (heat)", visible: true },
        cold:   { type: "art", kind: "earth.thermometer", tone: "blue", level: 0.2, x: 730, y: 190, visible: true },
        warm:   { type: "art", kind: "earth.thermometer", tone: "red", level: 0.6, x: 730, y: 190 },
        temp:   { type: "text", x: 716, y: 256, anchor: "end", cls: "eqbig", text: "−18 °C", visible: true },
        tempL:  { type: "text", x: 716, y: 278, anchor: "end", cls: "sub", text: "average", visible: true },
        gasL:   { type: "text", x: 400, y: 100, cls: "callout", text: "Greenhouse gases" },
        co2:    { type: "art", kind: "co2", x: 374, y: 168 },
        ch4:    { type: "art", kind: "earth.ch4", x: 464, y: 150, s: 0.75 },
        h2o:    { type: "art", kind: "h2o", x: 528, y: 160 },
        cCO2:   { type: "callout", from: [392, 168], to: [360, 132], anchor: "end", text: "carbon dioxide" },
        cCH4:   { type: "callout", from: [492, 152], to: [492, 132], anchor: "middle", text: "methane" },
        cH2O:   { type: "callout", from: [580, 162], to: [620, 132], text: "water vapour" },
        dn1:    { type: "art", kind: "earth.arrow", dir: "down", wavy: true, tone: "red", x: 474, y: 226, s: 0.8 },
        dn2:    { type: "art", kind: "earth.arrow", dir: "down", wavy: true, tone: "red", x: 614, y: 226, s: 0.8 },
        trB1:   { type: "track", d: "M420,340 L420,190 L490,340" },
        trB2:   { type: "track", d: "M560,340 L560,190 L630,340" },
        trOut:  { type: "track", d: "M420,190 L460,10" }
      },
      steps: [
        { caption: "But some gases in the air absorb infrared: carbon dioxide, methane and water vapour. Nitrogen and oxygen, 99% of the air, don't. These are the greenhouse gases.",
          do: [{ show: ["gasL"] }, { show: ["co2", "cCO2", "ch4", "cCH4", "h2o", "cH2O"], stagger: 150 }] },
        { caption: "A gas molecule that absorbs infrared soon gives the energy off again, in a random direction. Some escapes to space, but part of it comes back down and warms the surface again.",
          do: [{ all: [{ flow: { along: "trB1", token: "infrared", tone: "red", dur: 1800 } }, { flow: { along: "trB2", token: "infrared", tone: "red", dur: 1800 } }, { flow: { along: "trOut", token: "infrared", tone: "red", dur: 1800 } }] }, { show: ["dn1", "dn2"], stagger: 200 }] },
        { caption: "This is the greenhouse effect. It keeps Earth's average temperature near 15\u00a0°C instead of −18\u00a0°C, warm enough for liquid oceans and life.",
          do: [{ hide: ["cold"] }, { show: ["warm"] }, { text: { id: "temp", text: "15 °C" } }, { pulse: "warm" }] }
      ]
    },
    {
      title: "Adding more CO₂",
      enter: "slide",
      scale: 0.6,
      base: 380,
      elements: {
        axis:  { type: "axis", x1: 40, x2: 500, y: 380 },
        b1:    { type: "bar", x: 60, w: 64, principal: 280, prefix: "", label: "1800" },
        b2:    { type: "bar", x: 150, w: 64, principal: 280, prefix: "", label: "1900" },
        b3:    { type: "bar", x: 240, w: 64, principal: 280, prefix: "", label: "1960" },
        b4:    { type: "bar", x: 330, w: 64, principal: 280, prefix: "", label: "1990" },
        b5:    { type: "bar", x: 420, w: 64, principal: 280, prefix: "", label: "2024" },
        title: { type: "text", x: 40, y: 40, cls: "eqlabel", text: "CO₂ IN THE AIR, PARTS PER MILLION" },
        k1:    { type: "text", x: 40, y: 72, cls: "legend", swatch: "teal", text: "natural level" },
        k2:    { type: "text", x: 190, y: 72, cls: "legend", swatch: "amber", text: "added, mostly by burning fossil fuels" },
        warm:  { type: "box", x: 530, y: 90, w: 250, h: 130, tone: "red", label: "Over 1 °C warmer", sub: "Earth's average temperature has risen more than 1 °C since the late 1800s." },
        take:  { type: "box", x: 530, y: 250, w: 250, h: 130, tone: "yellow", label: "More CO₂, more heat", sub: "The greenhouse effect is natural. Adding gases makes it stronger." }
      },
      steps: [
        { caption: "For thousands of years before the 1800s, the air held about 280 parts per million (ppm) of CO₂. That means 280 CO₂ molecules in every million molecules of air.",
          do: [{ show: ["axis", "title", "k1", "b1"] }] },
        { caption: "Burning coal, oil and gas releases CO₂. Since the 1800s it has climbed to about 425 ppm, a rise of about 50%, and most of that rise came after 1960.",
          do: [{ show: ["k2", "b2"] }, { bar: { id: "b2", interest: 16 } }, { show: ["b3"] }, { bar: { id: "b3", interest: 37 } }, { show: ["b4"] }, { bar: { id: "b4", interest: 74 } }, { show: ["b5"] }, { bar: { id: "b5", interest: 145 } }] },
        { caption: "More CO₂ absorbs more infrared and sends more of it back down, so the surface warms. Earth is already more than 1\u00a0°C warmer on average than in the late 1800s.",
          do: [{ show: ["warm"] }] },
        { caption: "The greenhouse effect itself is natural and keeps Earth livable. The problem is that adding greenhouse gases makes it stronger, and the planet keeps warming.",
          do: [{ show: ["take"] }] }
      ]
    }
  ]
});
