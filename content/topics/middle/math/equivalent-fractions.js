CC.topic({
  id: "equivalent-fractions",
  level: "middle",
  section: "math",
  order: 1,
  title: "Equivalent fractions",
  summary: "Why 1/2, 2/4 and 4/8 are the same amount, and the rule for making fractions that are equal.",
  scenes: [
    {
      title: "Sharing a chocolate bar",
      elements: {
        bar2:  { type: "art", kind: "math.chocBar", parts: 2, shaded: 1, x: 50, y: 60 },
        bar4:  { type: "art", kind: "math.chocBar", parts: 4, shaded: 2, x: 50, y: 160 },
        bar8:  { type: "art", kind: "math.chocBar", parts: 8, shaded: 4, x: 50, y: 260 },
        n2:    { type: "text", x: 450, y: 83, anchor: "middle", cls: "eqbig", text: "1" },
        l2:    { type: "path", px: true, pts: [[436, 91], [464, 91]], tone: "grey", w: 3 },
        d2:    { type: "text", x: 450, y: 115, anchor: "middle", cls: "eqbig", text: "2" },
        s2:    { type: "text", x: 486, y: 96, cls: "sub", text: "1 of 2 equal pieces" },
        n4:    { type: "text", x: 450, y: 183, anchor: "middle", cls: "eqbig", text: "2" },
        l4:    { type: "path", px: true, pts: [[436, 191], [464, 191]], tone: "grey", w: 3 },
        d4:    { type: "text", x: 450, y: 215, anchor: "middle", cls: "eqbig", text: "4" },
        s4:    { type: "text", x: 486, y: 196, cls: "sub", text: "2 of 4 equal pieces" },
        n8:    { type: "text", x: 450, y: 283, anchor: "middle", cls: "eqbig", text: "4" },
        l8:    { type: "path", px: true, pts: [[436, 291], [464, 291]], tone: "grey", w: 3 },
        d8:    { type: "text", x: 450, y: 315, anchor: "middle", cls: "eqbig", text: "8" },
        s8:    { type: "text", x: 486, y: 296, cls: "sub", text: "4 of 8 equal pieces" },
        half:  { type: "path", px: true, pts: [[230, 42], [230, 338]], tone: "violet", w: 4, dashed: true },
        card:  { type: "box", x: 150, y: 352, w: 500, h: 76, tone: "yellow", label: "1/2 = 2/4 = 4/8", sub: "equivalent fractions: different numbers for the same amount" }
      },
      steps: [
        { caption: "Cut a chocolate bar into 2 equal pieces and take 1. You have one half, written 1/2: 1 piece out of 2 equal pieces.",
          do: [{ show: ["bar2"] }, { show: ["n2", "l2", "d2", "s2"] }] },
        { caption: "Now cut the same size bar into 4 equal pieces and take 2. That's 2/4, and it's the same amount of chocolate.",
          do: [{ show: ["bar4"] }, { show: ["n4", "l4", "d4", "s4"] }] },
        { caption: "Cut another into 8 equal pieces and take 4. That's 4/8. Still the same amount.",
          do: [{ show: ["bar8"] }, { show: ["n8", "l8", "d8", "s8"] }] },
        { caption: "All three shares stop at the same place. Fractions that name the same amount are called equivalent fractions.",
          do: [{ show: ["half"] }, { show: ["card"] }, { pulse: "card" }] }
      ]
    },
    {
      title: "On a number line",
      enter: "fade",
      elements: {
        nl2:  { type: "art", kind: "math.numberLine", parts: 2, x: 40, y: 70 },
        nl4:  { type: "art", kind: "math.numberLine", parts: 4, x: 40, y: 170 },
        nl8:  { type: "art", kind: "math.numberLine", parts: 8, x: 40, y: 270 },
        h2:   { type: "text", x: 440, y: 87, cls: "legend", text: "2 equal parts" },
        h4:   { type: "text", x: 440, y: 187, cls: "legend", text: "4 equal parts" },
        h8:   { type: "text", x: 440, y: 287, cls: "legend", text: "8 equal parts" },
        a0:   { type: "text", x: 50, y: 118, anchor: "middle", cls: "tick", text: "0" },
        a1:   { type: "text", x: 230, y: 118, anchor: "middle", cls: "seg-label", tone: "violet", text: "1/2" },
        a2:   { type: "text", x: 410, y: 118, anchor: "middle", cls: "tick", text: "1" },
        b0:   { type: "text", x: 50, y: 218, anchor: "middle", cls: "tick", text: "0" },
        b1:   { type: "text", x: 140, y: 218, anchor: "middle", cls: "tick", text: "1/4" },
        b2:   { type: "text", x: 230, y: 218, anchor: "middle", cls: "seg-label", tone: "violet", text: "2/4" },
        b3:   { type: "text", x: 320, y: 218, anchor: "middle", cls: "tick", text: "3/4" },
        b4:   { type: "text", x: 410, y: 218, anchor: "middle", cls: "tick", text: "1" },
        c0:   { type: "text", x: 50, y: 318, anchor: "middle", cls: "tick", text: "0" },
        c1:   { type: "text", x: 95, y: 318, anchor: "middle", cls: "tick", text: "1/8" },
        c2:   { type: "text", x: 140, y: 318, anchor: "middle", cls: "tick", text: "2/8" },
        c3:   { type: "text", x: 185, y: 318, anchor: "middle", cls: "tick", text: "3/8" },
        c4:   { type: "text", x: 230, y: 318, anchor: "middle", cls: "seg-label", tone: "violet", text: "4/8" },
        c5:   { type: "text", x: 275, y: 318, anchor: "middle", cls: "tick", text: "5/8" },
        c6:   { type: "text", x: 320, y: 318, anchor: "middle", cls: "tick", text: "6/8" },
        c7:   { type: "text", x: 365, y: 318, anchor: "middle", cls: "tick", text: "7/8" },
        c8:   { type: "text", x: 410, y: 318, anchor: "middle", cls: "tick", text: "1" },
        p2:   { type: "point", px: true, at: [230, 82], tone: "violet" },
        p4:   { type: "point", px: true, at: [230, 182], tone: "violet" },
        p8:   { type: "point", px: true, at: [230, 282], tone: "violet" },
        line: { type: "path", px: true, pts: [[230, 50], [230, 340]], tone: "violet", w: 4, dashed: true },
        card: { type: "box", x: 560, y: 150, w: 220, h: 110, tone: "violet", label: "Same point", sub: "1/2, 2/4 and 4/8 are all exactly halfway from 0 to 1" }
      },
      steps: [
        { caption: "A fraction is also a point on a number line. Split the line from 0 to 1 into 2 equal parts, and 1/2 is the middle.",
          do: [{ show: ["nl2", "h2", "a0", "a2"] }, { show: ["a1", "p2"] }] },
        { caption: "Split the same line into 4 equal parts. Counting 2 of them lands on the very same point: 2/4.",
          do: [{ show: ["nl4", "h4", "b0", "b1", "b3", "b4"] }, { show: ["b2", "p4"] }] },
        { caption: "Split it into 8 equal parts and count 4. Equivalent fractions always land on the same point.",
          do: [{ show: ["nl8", "h8", "c0", "c1", "c2", "c3", "c5", "c6", "c7", "c8"] }, { show: ["c4", "p8"] }, { show: ["line"] }, { show: ["card"] }] }
      ]
    },
    {
      title: "The rule",
      enter: "fade",
      elements: {
        n1:  { type: "text", x: 110, y: 190, anchor: "middle", cls: "eqbig", text: "1" },
        l1:  { type: "path", px: true, pts: [[94, 199], [126, 199]], tone: "grey", w: 3 },
        d1:  { type: "text", x: 110, y: 226, anchor: "middle", cls: "eqbig", text: "2" },
        e1:  { type: "text", x: 190, y: 208, anchor: "middle", cls: "eqbig", text: "=" },
        n2:  { type: "text", x: 270, y: 190, anchor: "middle", cls: "eqbig", text: "2" },
        l2:  { type: "path", px: true, pts: [[254, 199], [286, 199]], tone: "grey", w: 3 },
        d2:  { type: "text", x: 270, y: 226, anchor: "middle", cls: "eqbig", text: "4" },
        e2:  { type: "text", x: 350, y: 208, anchor: "middle", cls: "eqbig", text: "=" },
        n3:  { type: "text", x: 430, y: 190, anchor: "middle", cls: "eqbig", text: "4" },
        l3:  { type: "path", px: true, pts: [[414, 199], [446, 199]], tone: "grey", w: 3 },
        d3:  { type: "text", x: 430, y: 226, anchor: "middle", cls: "eqbig", text: "8" },
        rule: { type: "box", x: 520, y: 130, w: 260, h: 120, tone: "yellow", label: "The rule", sub: "Multiply or divide the top and the bottom by the same number. The amount stays the same." },
        warn: { type: "box", x: 520, y: 270, w: 260, h: 90, tone: "red", label: "Not the same", sub: "Changing only the top or only the bottom changes the amount." }
      },
      arrows: {
        t1: { d: "M120,164 C150,120 230,120 260,164", label: { text: "× 2", x: 190, y: 118 } },
        b1: { d: "M120,238 C150,282 230,282 260,238", label: { text: "× 2", x: 190, y: 298 } },
        t2: { d: "M280,164 C310,120 390,120 420,164", label: { text: "× 2", x: 350, y: 118 } },
        b2: { d: "M280,238 C310,282 390,282 420,238", label: { text: "× 2", x: 350, y: 298 } },
        dv: { d: "M454,226 C476,410 72,410 90,232", label: { text: "÷ 4 on the top and the bottom", x: 273, y: 392 } }
      },
      steps: [
        { caption: "Now look at the numbers. To go from 1/2 to 2/4, multiply the top and the bottom by 2.",
          do: [{ show: ["n1", "l1", "d1"] }, { show: ["t1", "b1"] }, { show: ["e1", "n2", "l2", "d2"] }] },
        { caption: "Do it again: 2 × 2 = 4 and 4 × 2 = 8, so you get 4/8. Cutting every piece in half doubles both numbers.",
          do: [{ show: ["t2", "b2"] }, { show: ["e2", "n3", "l3", "d3"] }] },
        { caption: "It works backwards too. Divide the top and the bottom of 4/8 by 4 and you're back to 1/2. This is called simplifying.",
          do: [{ show: ["dv"] }, { pulse: "n1" }] },
        { caption: "So the rule is: multiply or divide the top and the bottom by the same number. Change only one of them and the amount changes.",
          do: [{ show: ["rule"] }, { pulse: "rule" }, { show: ["warn"] }] }
      ]
    }
  ]
});
