CC.topic({
  id: "how-the-heart-pumps-blood",
  level: "middle",
  section: "biology",
  order: 3,
  title: "How the heart pumps blood",
  summary: "How your heart sends blood to your lungs for oxygen and then around your body, one beat at a time.",
  scenes: [
    {
      title: "Inside your chest",
      elements: {
        body:   { type: "art", kind: "bio.body", x: 300, y: 14, layer: "back" },
        vRed:   { type: "path", px: true, pts: [[414, 196], [424, 260], [428, 330], [428, 418]], tone: "red", w: 4 },
        vBlue:  { type: "path", px: true, pts: [[372, 418], [372, 330], [378, 260], [394, 200]], tone: "blue", w: 4 },
        lungs:  { type: "art", kind: "bio.lungs", x: 349, y: 112, s: 0.85 },
        heart:  { type: "art", kind: "bio.heart", x: 392, y: 160, s: 0.75 },
        cLungs: { type: "callout", from: [360, 160], to: [230, 130], text: "Lungs" },
        cHeart: { type: "callout", from: [414, 186], to: [560, 160], text: "Heart" },
        cVes:   { type: "callout", from: [428, 370], to: [560, 370], text: "Blood vessels" }
      },
      steps: [
        { caption: "Your heart is a muscle about the size of your fist. It sits in your chest, between your two lungs.",
          do: [{ show: ["body"] }, { show: ["lungs", "heart"], stagger: 250 }, { show: ["cLungs", "cHeart"] }, { pulse: "heart" }] },
        { caption: "With every beat it pumps blood through tubes called blood vessels. They reach every part of your body.",
          do: [{ show: ["vRed", "vBlue", "cVes"] }, { all: [{ flow: { along: "vRed", token: "blood", tone: "red" } }, { flow: { along: "vBlue", token: "blood", tone: "blue" } }] }] },
        { caption: "Blood carries oxygen from your lungs to every cell in your body. Let's follow the path it takes.",
          do: [{ pulse: "lungs" }, { pulse: "heart" }] }
      ]
    },
    {
      title: "The big loop",
      enter: "fade",
      elements: {
        lungs: { type: "art", kind: "bio.lungs", x: 328, y: 20, s: 1.2 },
        heart: { type: "art", kind: "bio.heartHalves", x: 330, y: 182 },
        body:  { type: "art", kind: "person", tone: "violet", x: 376, y: 340, s: 1.2 },
        b1:    { type: "path", px: true, pts: [[374, 400], [260, 400], [260, 262], [348, 262]], tone: "blue", w: 5 },
        b2:    { type: "path", px: true, pts: [[352, 212], [300, 212], [300, 96], [344, 96]], tone: "blue", w: 5 },
        r1:    { type: "path", px: true, pts: [[456, 96], [500, 96], [500, 212], [448, 212]], tone: "red", w: 5 },
        r2:    { type: "path", px: true, pts: [[452, 262], [540, 262], [540, 400], [426, 400]], tone: "red", w: 5 },
        tLung: { type: "text", x: 400, y: 172, anchor: "middle", cls: "callout", text: "Lungs" },
        tBody: { type: "text", x: 436, y: 378, anchor: "start", cls: "callout", text: "Body" },
        key1:  { type: "text", x: 580, y: 120, cls: "legend", swatch: "blue", text: "Blood low in oxygen" },
        key2:  { type: "text", x: 580, y: 150, cls: "legend", swatch: "red", text: "Blood rich in oxygen" },
        note:  { type: "text", x: 40, y: 440, cls: "sub", text: "The heart is drawn facing you, so its right side is on your left." },
        real:  { type: "box", x: 580, y: 200, w: 190, h: 110, tone: "grey", label: "Not really blue", sub: "Blood low in oxygen is dark red. Blue is a diagram color." }
      },
      steps: [
        { caption: "Start with blood coming back from your body. It has given away its oxygen, and it returns to the right side of the heart.",
          do: [{ show: ["body", "tBody", "heart", "note"] }, { show: ["b1", "key1"] }, { flow: { along: "b1", token: "blood", tone: "blue", dur: 1600 } }] },
        { caption: "The right side pumps it to the lungs. There it drops off carbon dioxide and picks up fresh oxygen from the air you breathe in.",
          do: [{ show: ["lungs", "tLung"] }, { show: ["b2"] }, { flow: { along: "b2", token: "blood", tone: "blue", dur: 1400 } }, { pulse: "lungs" }] },
        { caption: "Now rich in oxygen, the blood flows back to the left side of the heart.",
          do: [{ show: ["r1", "key2"] }, { flow: { along: "r1", token: "blood", tone: "red", dur: 1400 } }] },
        { caption: "The left side pumps it out to the whole body, where cells take the oxygen. Then the loop starts again.",
          do: [{ show: ["r2"] }, { flow: { along: "r2", token: "blood", tone: "red", dur: 1600 } }, { pulse: "body" }] },
        { caption: "Diagrams color blood blue when it's low in oxygen, but real blood is always red. It's darker red when it's low in oxygen.",
          do: [{ show: ["real"] }] }
      ]
    },
    {
      title: "Four chambers and one-way valves",
      enter: "zoom",
      zoomInto: [400, 250],
      elements: {
        heart: { type: "art", kind: "bio.heartChambers", x: 200, y: 50, s: 1.1 },
        sideR: { type: "text", x: 290, y: 36, anchor: "middle", cls: "artlbl", text: "Right side" },
        sideL: { type: "text", x: 510, y: 36, anchor: "middle", cls: "artlbl", text: "Left side" },
        cRA:   { type: "callout", from: [300, 160], to: [180, 120], text: "Right atrium" },
        cLA:   { type: "callout", from: [500, 160], to: [620, 120], text: "Left atrium" },
        cRV:   { type: "callout", from: [300, 300], to: [180, 320], text: "Right ventricle" },
        cLV:   { type: "callout", from: [480, 300], to: [620, 320], text: "Left ventricle" },
        cV1:   { type: "callout", from: [316, 236], to: [180, 220], text: "Valve" },
        cV2:   { type: "callout", from: [490, 236], to: [620, 220], text: "Valve" },
        note:  { type: "text", x: 400, y: 440, anchor: "middle", cls: "sub", text: "Simplified diagram, facing you" },
        toL:   { type: "text", x: 364, y: 78, anchor: "end", cls: "callout", text: "to lungs" },
        toB:   { type: "text", x: 434, y: 78, anchor: "start", cls: "callout", text: "to body" },
        frB:   { type: "text", x: 196, y: 172, anchor: "end", cls: "callout", text: "from body" },
        frL:   { type: "text", x: 604, y: 172, anchor: "start", cls: "callout", text: "from lungs" },
        trB:   { type: "track", d: "M190,164 C260,164 300,170 305,190 L310,232 C312,262 318,290 330,290 C370,290 384,260 384,230 L384,40" },
        trR:   { type: "track", d: "M610,164 C540,164 506,170 504,190 L499,232 C496,262 486,300 466,300 C430,300 412,264 412,230 L412,40" }
      },
      steps: [
        { caption: "Inside, the heart has four chambers. A thick wall down the middle keeps the two sides apart, so the two kinds of blood never mix.",
          do: [{ show: ["heart", "note"] }, { show: ["sideR", "sideL"] }] },
        { caption: "The two top chambers are the atria. They collect blood as it comes into the heart.",
          do: [{ show: ["cRA", "cLA"] }] },
        { caption: "The two bottom chambers are the ventricles. They squeeze hard to push blood out. The left one has the thickest wall, because it pumps blood to your whole body.",
          do: [{ show: ["cRV", "cLV"] }] },
        { caption: "Valves are flaps that open only one way, so blood can't flow backward. The lub-dub sound of a heartbeat is valves snapping shut.",
          do: [{ show: ["cV1", "cV2"] }] },
        { caption: "Follow the flow: into the atria, down through the valves, and out of the ventricles. Both sides squeeze at the same time, with every beat.",
          do: [{ show: ["frB", "toL", "frL", "toB"] }, { all: [{ flow: { along: "trB", token: "blood", tone: "blue", count: 2, dur: 2200, gap: 500 } }, { flow: { along: "trR", token: "blood", tone: "red", count: 2, dur: 2200, gap: 500 } }] }] }
      ]
    }
  ]
});
