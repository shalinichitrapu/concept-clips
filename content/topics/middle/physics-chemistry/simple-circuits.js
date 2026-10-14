CC.topic({
  id: "simple-circuits",
  level: "middle",
  section: "physics-chemistry",
  order: 2,
  title: "How a simple circuit works",
  summary: "Why a bulb lights only when the circuit is a complete loop, and how series and parallel circuits differ.",
  scenes: [
    {
      title: "One bulb, one loop",
      elements: {
        battery: { type: "art", kind: "phys.battery", x: 190, y: 345, label: "Battery" },
        w1: { type: "path", px: true, pts: [[320, 370], [430, 370], [430, 110], [390, 110]], tone: "grey", w: 4 },
        w2: { type: "path", px: true, pts: [[290, 110], [210, 110]], tone: "grey", w: 4 },
        w3: { type: "path", px: true, pts: [[130, 110], [80, 110], [80, 370], [190, 370]], tone: "grey", w: 4 },
        bulbOff: { type: "art", kind: "phys.bulb", x: 130, y: 23.6, s: 0.8, state: "off", label: "Bulb" },
        bulbOn: { type: "art", kind: "phys.bulb", x: 130, y: 23.6, s: 0.8, state: "on", label: "Bulb" },
        swOpen: { type: "art", kind: "phys.switch", x: 290, y: 70, open: true, label: "Switch" },
        swShut: { type: "art", kind: "phys.switch", x: 290, y: 70, label: "Switch" },
        curR: { type: "text", x: 442, y: 250, cls: "callout", text: "current ↑" },
        curL: { type: "text", x: 68, y: 250, anchor: "end", cls: "callout", text: "current ↓" },
        closed: { type: "box", x: 510, y: 60, w: 260, h: 96, tone: "green", label: "Closed circuit", sub: "a complete loop, so current flows and the bulb lights" },
        open: { type: "box", x: 510, y: 176, w: 260, h: 96, tone: "red", label: "Open circuit", sub: "a gap in the loop, so no current flows anywhere" },
        dir: {
          type: "box",
          x: 510,
          y: 292,
          w: 260,
          h: 110,
          tone: "amber",
          label: "Current direction",
          sub: "drawn from + to −. The electrons themselves drift the other way."
        },
        trI: { type: "track", d: "M320,370 L430,370 L430,110 L80,110 L80,370 L190,370" }
      },
      steps: [
        {
          caption: "A circuit needs a source of energy. This battery has a positive (+) end and a negative (−) end.",
          do: [
            { show: ["battery"] },
            { pulse: "battery" }
          ]
        },
        {
          caption: "Wires join the battery to a bulb and a switch. The switch is open, so there's a gap in the loop and the bulb stays dark.",
          do: [
            { show: ["w1", "w2", "w3"] },
            { show: ["bulbOff", "swOpen"] }
          ]
        },
        {
          caption: "Close the switch and the loop is complete. Electric charge can now flow all the way around, and the bulb lights up.",
          do: [
            { hide: ["swOpen"] },
            { show: ["swShut"] },
            {
              all: [
                { flow: { along: "trI", token: "charge", tone: "amber", count: 3, dur: 2400, gap: 600 } },
                { hide: ["bulbOff"] },
                { show: ["bulbOn"] }
              ]
            },
            { show: ["closed"] }
          ]
        },
        {
          caption: "The flow of charge is called current. We draw it leaving the + end, going around the loop and returning to the − end.",
          do: [
            { show: ["curR", "curL"] },
            { flow: { along: "trI", token: "current", tone: "amber", count: 3, dur: 2400, gap: 600 } },
            { show: ["dir"] }
          ]
        },
        {
          caption: "Open the switch and the loop is broken. Current stops everywhere at once, so the bulb goes out.",
          do: [
            { hide: ["swShut"] },
            { show: ["swOpen"] },
            {
              all: [
                { hide: ["bulbOn", "curR", "curL"] },
                { show: ["bulbOff"] }
              ]
            },
            { show: ["open"] }
          ]
        }
      ]
    },
    {
      title: "Series and parallel",
      enter: "slide",
      elements: {
        tS: { type: "text", x: 200, y: 32, anchor: "middle", cls: "lbl", text: "Series" },
        tP: { type: "text", x: 600, y: 32, anchor: "middle", cls: "lbl", text: "Parallel" },
        batS: { type: "art", kind: "phys.battery", x: 148, y: 340, s: 0.8 },
        sw1: { type: "path", px: true, pts: [[252, 360], [350, 360], [350, 120], [300, 120]], tone: "grey", w: 4 },
        sw2: { type: "path", px: true, pts: [[230, 120], [160, 120]], tone: "grey", w: 4 },
        sw3: { type: "path", px: true, pts: [[90, 120], [50, 120], [50, 360], [148, 360]], tone: "grey", w: 4 },
        sA: { type: "art", kind: "phys.bulb", x: 90, y: 44.4, s: 0.7, state: "dim" },
        sB: { type: "art", kind: "phys.bulb", x: 230, y: 44.4, s: 0.7, state: "dim" },
        sAoff: { type: "art", kind: "phys.bulb", x: 90, y: 44.4, s: 0.7, state: "off" },
        sBgone: { type: "art", kind: "phys.bulb", x: 230, y: 44.4, s: 0.7, state: "empty" },
        batP: { type: "art", kind: "phys.battery", x: 548, y: 340, s: 0.8 },
        pw1: { type: "path", px: true, pts: [[652, 360], [750, 360], [750, 120], [635, 120]], tone: "grey", w: 4 },
        pw2: { type: "path", px: true, pts: [[565, 120], [450, 120], [450, 360], [548, 360]], tone: "grey", w: 4 },
        pw3: { type: "path", px: true, pts: [[450, 240], [565, 240]], tone: "grey", w: 4 },
        pw4: { type: "path", px: true, pts: [[635, 240], [750, 240]], tone: "grey", w: 4 },
        j1: { type: "point", px: true, at: [450, 240], tone: "grey", r: 6 },
        j2: { type: "point", px: true, at: [750, 240], tone: "grey", r: 6 },
        pC: { type: "art", kind: "phys.bulb", x: 565, y: 44.4, s: 0.7, state: "on" },
        pD: { type: "art", kind: "phys.bulb", x: 565, y: 164.4, s: 0.7, state: "on" },
        pDgone: { type: "art", kind: "phys.bulb", x: 565, y: 164.4, s: 0.7, state: "empty" },
        sL: { type: "text", x: 195, y: 152, anchor: "middle", cls: "callout", text: "both dim" },
        pL: { type: "text", x: 692, y: 152, anchor: "middle", cls: "callout", text: "both bright" },
        dS: { type: "text", x: 200, y: 402, anchor: "middle", cls: "legend", text: "one loop through both bulbs" },
        dP: { type: "text", x: 600, y: 402, anchor: "middle", cls: "legend", text: "a separate loop for each bulb" },
        home: { type: "text", x: 400, y: 436, anchor: "middle", cls: "eq", text: "Homes are wired in parallel, so each lamp works on its own." },
        trS: { type: "track", d: "M252,360 L350,360 L350,120 L50,120 L50,360 L148,360" },
        trP1: { type: "track", d: "M652,360 L750,360 L750,120 L450,120 L450,360 L548,360" },
        trP2: { type: "track", d: "M652,360 L750,360 L750,240 L450,240 L450,360 L548,360" }
      },
      steps: [
        {
          caption: "Now use two bulbs. In a series circuit they sit one after the other on a single loop, so the same current passes through both.",
          do: [
            { show: ["tS", "batS", "sw1", "sw2", "sw3"] },
            { show: ["sA", "sB", "dS"] },
            { flow: { along: "trS", token: "current", tone: "amber", count: 2, dur: 2400, gap: 700 } }
          ]
        },
        {
          caption: "In a parallel circuit each bulb has its own branch. The current splits, and part of it flows through each bulb.",
          do: [
            { show: ["tP", "batP", "pw1", "pw2", "pw3", "pw4", "j1", "j2"] },
            { show: ["pC", "pD", "dP"] },
            {
              all: [
                { flow: { along: "trP1", token: "current", tone: "amber", count: 2, dur: 2400, gap: 700 } },
                { flow: { along: "trP2", token: "current", tone: "amber", count: 2, dur: 2400, gap: 700 } }
              ]
            }
          ]
        },
        {
          caption: "The series bulbs share the battery's push, so each glows dimly. In parallel, each bulb gets the battery's full push, called voltage, so both glow brightly.",
          do: [
            {
              all: [
                { pulse: "sA" },
                { pulse: "sB" }
              ]
            },
            { show: ["sL"] },
            {
              all: [
                { pulse: "pC" },
                { pulse: "pD" }
              ]
            },
            { show: ["pL"] }
          ]
        },
        {
          caption: "Now take one bulb out of each circuit. In series that breaks the only loop, so the other bulb goes out too.",
          do: [
            { hide: ["sB"] },
            { show: ["sBgone"] },
            { hide: ["sA"] },
            { show: ["sAoff"] },
            { text: { id: "sL", text: "both off" } }
          ]
        },
        {
          caption: "In parallel, the other bulb's loop is still complete, so it stays lit.",
          do: [
            { hide: ["pD"] },
            { show: ["pDgone"] },
            { flow: { along: "trP1", token: "current", tone: "amber", count: 2, dur: 2400, gap: 700 } },
            { pulse: "pC" },
            { text: { id: "pL", text: "one still lit" } }
          ]
        },
        {
          caption: "That's why homes are wired in parallel: switching off one lamp doesn't turn off all the others.",
          do: [
            { show: ["home"] }
          ]
        }
      ]
    }
  ]
});
