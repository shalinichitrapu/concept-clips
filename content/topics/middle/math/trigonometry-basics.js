CC.topic({
  id: "trigonometry-basics",
  level: "middle",
  section: "math",
  order: 7,
  title: "Measuring heights with trigonometry",
  summary: "How to find the height of a tree without climbing it, using one distance, one angle and the tangent.",
  scenes: [
    {
      title: "Too tall to climb",
      elements: {
        ground: { type: "art", kind: "math.ground", x: 40, y: 378 },
        tree:   { type: "art", kind: "math.tree", layer: "back", x: 316, y: 130 },
        you:    { type: "art", kind: "person", tone: "violet", s: .65, x: 270, y: 335.5 },
        adj:    { type: "path", px: true, pts: [[76, 344], [376, 344]], tone: "grey", w: 3, dashed: true },
        adjL:   { type: "text", x: 226, y: 370, anchor: "middle", cls: "seg-label", text: "20 m" },
        sight:  { type: "path", px: true, pts: [[76, 344], [376, 134]], tone: "sky", w: 4, dashed: true },
        arc:    { type: "path", px: true, tone: "red", w: 3, pts: [[126, 344], [125.8, 339.6], [125.2, 335.3], [124.3, 331.1], [123, 326.9], [121.3, 322.9], [119.3, 319], [117, 315.3]] },
        arcL:   { type: "text", x: 134, y: 330, anchor: "start", cls: "seg-label", tone: "red", text: "35°" },
        tri:    { type: "path", px: true, pts: [[76, 344], [376, 344], [376, 134], [76, 344]], tone: "yellow", w: 5 },
        corner: { type: "path", px: true, pts: [[376, 326], [358, 326], [358, 344]], tone: "yellow", w: 3 },
        hL:     { type: "text", x: 446, y: 250, anchor: "start", cls: "seg-label", tone: "violet", text: "? m" },
        note:   { type: "text", x: 40, y: 434, cls: "tick", text: "simplified drawing: the person is not to scale" },
        ask:    { type: "box", x: 490, y: 90, w: 290, h: 100, tone: "violet", label: "How tall is the tree?", sub: "too tall to climb with a tape measure" },
        rt:     { type: "box", x: 490, y: 220, w: 290, h: 110, tone: "yellow", label: "A right triangle", sub: "its square, 90° corner is where the flat line meets the trunk" }
      },
      steps: [
        { caption: "How tall is this tree? It's much too tall to climb with a tape measure, but you can find its height without leaving the ground.",
          do: [{ show: ["ground", "tree", "you"] }, { show: ["ask", "note"] }] },
        { caption: "First, walk 20 meters away from the tree, measuring the distance as you go.",
          do: [{ move: { id: "you", to: [63, 335.5], dur: 1600 } }, { show: ["adj"] }, { show: ["adjL"] }] },
        { caption: "Then look up at the very top of the tree. Measure the angle between a flat line and your line of sight: here it's 35°.",
          do: [{ show: ["sight"] }, { show: ["arc", "arcL"] }] },
        { caption: "The flat line, the tree and your line of sight make a right triangle. Its square corner is at the trunk.",
          do: [{ show: ["tri"] }, { show: ["corner", "hL"] }, { show: ["rt"] }] }
      ]
    },
    {
      title: "Naming the sides",
      enter: "fade",
      elements: {
        base: { type: "path", px: true, pts: [[80, 360], [440, 360], [440, 108], [80, 360]], tone: "grey", w: 3 },
        sq:   { type: "path", px: true, pts: [[440, 340], [420, 340], [420, 360]], tone: "grey", w: 3 },
        arc:  { type: "path", px: true, tone: "red", w: 3, pts: [[140, 360], [139.8, 354.8], [139.1, 349.6], [138, 344.5], [136.4, 339.5], [134.4, 334.6], [132, 330], [129.1, 325.6]] },
        arcL: { type: "text", x: 150, y: 346, anchor: "start", cls: "seg-label", tone: "red", text: "35°" },
        you:  { type: "point", px: true, at: [80, 360], tone: "violet", label: "you", lx: 0, ly: 30 },
        opp:  { type: "path", px: true, pts: [[440, 360], [440, 108]], tone: "amber", w: 7 },
        oppL: { type: "text", x: 456, y: 240, anchor: "start", cls: "seg-label", tone: "amber", text: "opposite" },
        adj:  { type: "path", px: true, pts: [[80, 360], [440, 360]], tone: "blue", w: 7 },
        adjL: { type: "text", x: 260, y: 390, anchor: "middle", cls: "seg-label", tone: "blue", text: "adjacent" },
        hyp:  { type: "path", px: true, pts: [[80, 360], [440, 108]], tone: "violet", w: 7 },
        hypL: { type: "text", x: 246, y: 214, anchor: "end", cls: "seg-label", tone: "violet", text: "hypotenuse" },
        bO:   { type: "box", x: 560, y: 60, w: 220, h: 96, tone: "amber", label: "Opposite", sub: "across from the angle" },
        bA:   { type: "box", x: 560, y: 170, w: 220, h: 96, tone: "blue", label: "Adjacent", sub: "next to the angle, not the longest side" },
        bH:   { type: "box", x: 560, y: 280, w: 220, h: 96, tone: "violet", label: "Hypotenuse", sub: "the longest side, across from the right angle" }
      },
      steps: [
        { caption: "Draw the triangle on its own. The 35° angle is at the corner where you stood.",
          say: "Draw the triangle on its own. The thirty-five degree angle is at the corner where you stood.",
          do: [{ show: ["base", "sq"] }, { show: ["arc", "arcL", "you"] }] },
        { caption: "Name each side from the angle's point of view. The side across from the angle is called the opposite side. Here it runs up the tree.",
          do: [{ show: ["opp"] }, { show: ["oppL", "bO"] }] },
        { caption: "The side next to the angle, along the ground, is called the adjacent side. Adjacent means next to.",
          do: [{ show: ["adj"] }, { show: ["adjL", "bA"] }] },
        { caption: "The longest side, across from the right angle, is the hypotenuse, just like in the Pythagorean theorem.",
          do: [{ show: ["hyp"] }, { show: ["hypL", "bH"] }] }
      ]
    },
    {
      title: "The tangent",
      enter: "fade",
      elements: {
        t1:   { type: "path", px: true, pts: [[40, 350], [180, 350], [180, 252], [40, 350]], tone: "grey", w: 3 },
        s1:   { type: "path", px: true, pts: [[180, 334], [164, 334], [164, 350]], tone: "grey", w: 2 },
        a1:   { type: "path", px: true, tone: "red", w: 3, pts: [[80, 350], [79.8, 346.5], [79.4, 343.1], [78.6, 339.6], [77.6, 336.3], [76.3, 333.1], [74.6, 330], [72.8, 327.1]] },
        o1:   { type: "path", px: true, pts: [[180, 350], [180, 252]], tone: "amber", w: 6 },
        d1:   { type: "path", px: true, pts: [[40, 350], [180, 350]], tone: "blue", w: 6 },
        n1o:  { type: "text", x: 190, y: 306, anchor: "start", cls: "seg-label", tone: "amber", text: "7 m" },
        n1a:  { type: "text", x: 110, y: 374, anchor: "middle", cls: "seg-label", tone: "blue", text: "10 m" },
        t2:   { type: "path", px: true, pts: [[220, 350], [500, 350], [500, 154], [220, 350]], tone: "grey", w: 3 },
        s2:   { type: "path", px: true, pts: [[500, 334], [484, 334], [484, 350]], tone: "grey", w: 2 },
        a2:   { type: "path", px: true, tone: "red", w: 3, pts: [[260, 350], [259.8, 346.5], [259.4, 343.1], [258.6, 339.6], [257.6, 336.3], [256.3, 333.1], [254.6, 330], [252.8, 327.1]] },
        o2:   { type: "path", px: true, pts: [[500, 350], [500, 154]], tone: "amber", w: 6 },
        d2:   { type: "path", px: true, pts: [[220, 350], [500, 350]], tone: "blue", w: 6 },
        n2o:  { type: "text", x: 510, y: 257, anchor: "start", cls: "seg-label", tone: "amber", text: "14 m" },
        n2a:  { type: "text", x: 360, y: 374, anchor: "middle", cls: "seg-label", tone: "blue", text: "20 m" },
        g1:   { type: "text", x: 54, y: 330, anchor: "start", cls: "tick", text: "35°" },
        g2:   { type: "text", x: 234, y: 330, anchor: "start", cls: "tick", text: "35°" },
        r1:   { type: "text", x: 110, y: 412, anchor: "middle", cls: "eq", text: "7 ÷ 10 = 0.70" },
        r2:   { type: "text", x: 360, y: 412, anchor: "middle", cls: "eq", text: "14 ÷ 20 = 0.70" },
        f0:   { type: "text", x: 560, y: 90, cls: "eqlabel", text: "THE TANGENT" },
        f1:   { type: "text", x: 560, y: 126, cls: "eqbig", text: "tan 35° ≈ 0.70" },
        tb:   { type: "box", x: 560, y: 156, w: 220, h: 130, tone: "yellow", label: "Tangent", sub: "opposite ÷ adjacent. It depends only on the angle, not on the size" }
      },
      steps: [
        { caption: "Here are two right triangles with the same 35° angle. The second one is twice as big.",
          say: "Here are two right triangles with the same thirty-five degree angle. The second one is twice as big.",
          do: [{ show: ["t1", "s1", "a1", "g1"] }, { show: ["t2", "s2", "a2", "g2"] }] },
        { caption: "In the small one, the opposite side is 7 m and the adjacent side is 10 m. In the big one, they're 14 m and 20 m.",
          do: [{ show: ["o1", "d1", "n1o", "n1a"] }, { show: ["o2", "d2", "n2o", "n2a"] }] },
        { caption: "Divide opposite by adjacent, and both give 0.70. With a 35° angle, the opposite side is always about 0.70 times the adjacent side.",
          say: "Divide opposite by adjacent, and both give zero point seven. With a thirty-five degree angle, the opposite side is always about zero point seven times the adjacent side.",
          do: [{ show: ["r1"] }, { show: ["r2"] }] },
        { caption: "This ratio is called the tangent of the angle, written tan. So tan 35° ≈ 0.70. A calculator's tan button gives it for any angle.",
          say: "This ratio is called the tangent of the angle, written tan. So tan thirty-five degrees is about zero point seven. A calculator's tan button gives it for any angle.",
          do: [{ show: ["f0", "f1"] }, { show: ["tb"] }] }
      ]
    },
    {
      title: "Back to the tree",
      enter: "fade",
      elements: {
        ground: { type: "art", kind: "math.ground", x: 40, y: 378, visible: true },
        tree:   { type: "art", kind: "math.tree", layer: "back", x: 316, y: 130, visible: true },
        you:    { type: "art", kind: "person", tone: "violet", s: .65, x: 63, y: 335.5, visible: true },
        tri:    { type: "path", px: true, pts: [[76, 344], [376, 344], [376, 134], [76, 344]], tone: "yellow", w: 5, visible: true },
        corner: { type: "path", px: true, pts: [[376, 326], [358, 326], [358, 344]], tone: "yellow", w: 3, visible: true },
        arc:    { type: "path", px: true, tone: "red", w: 3, visible: true, pts: [[126, 344], [125.8, 339.6], [125.2, 335.3], [124.3, 331.1], [123, 326.9], [121.3, 322.9], [119.3, 319], [117, 315.3]] },
        arcL:   { type: "text", x: 134, y: 330, anchor: "start", cls: "seg-label", tone: "red", text: "35°", visible: true },
        adjL:   { type: "text", x: 226, y: 370, anchor: "middle", cls: "seg-label", tone: "blue", text: "20 m", visible: true },
        adjN:   { type: "text", x: 226, y: 330, anchor: "middle", cls: "seg-label", tone: "blue", text: "adjacent" },
        hL:     { type: "text", x: 446, y: 250, anchor: "start", cls: "seg-label", tone: "amber", text: "? m", visible: true },
        hN:     { type: "text", x: 446, y: 228, anchor: "start", cls: "seg-label", tone: "amber", text: "opposite" },
        eyeL:   { type: "text", x: 392, y: 368, anchor: "start", cls: "tick", text: "eye height 1.5 m" },
        note:   { type: "text", x: 40, y: 434, cls: "tick", text: "simplified drawing: the person is not to scale", visible: true },
        e0:     { type: "text", x: 540, y: 70, cls: "eqlabel", text: "HEIGHT ABOVE YOUR EYES" },
        e1:     { type: "text", x: 540, y: 102, cls: "eq", text: "opposite = 20 × tan 35°" },
        e2:     { type: "text", x: 540, y: 134, cls: "eq", text: "≈ 20 × 0.70 = 14 m" },
        e3:     { type: "text", x: 540, y: 172, cls: "eqlabel", text: "THE WHOLE TREE" },
        e4:     { type: "text", x: 540, y: 204, cls: "eqbig", text: "14 + 1.5 ≈ 15.5 m" },
        kb:     { type: "box", x: 530, y: 236, w: 250, h: 76, tone: "green", label: "SOH CAH TOA", sub: "a way to remember all three" },
        k1:     { type: "text", x: 540, y: 344, cls: "eq", text: "sin = opposite ÷ hypotenuse" },
        k2:     { type: "text", x: 540, y: 376, cls: "eq", text: "cos = adjacent ÷ hypotenuse" },
        k3:     { type: "text", x: 540, y: 408, cls: "eq", text: "tan = opposite ÷ adjacent" }
      },
      steps: [
        { caption: "Back to the tree. The height above your eyes is the opposite side: adjacent × tan 35°, which is about 20 × 0.70 = 14 meters.",
          say: "Back to the tree. The height above your eyes is the opposite side: adjacent times tan thirty-five degrees, which is about twenty times zero point seven, or fourteen meters.",
          do: [{ show: ["adjN", "hN"] }, { show: ["e0", "e1"] }, { show: ["e2"] }, { text: { id: "hL", text: "14 m" } }, { pulse: "hL" }] },
        { caption: "Your eyes are about 1.5 meters above the ground, so add that on. The tree is about 15.5 meters tall.",
          do: [{ show: ["eyeL"] }, { show: ["e3", "e4"] }] },
        { caption: "Tangent has two partners, sine and cosine, that use the hypotenuse. To remember all three, say SOH CAH TOA.",
          say: "Tangent has two partners, sine and cosine, that use the hypotenuse. To remember all three, say soh, cah, toa.",
          do: [{ show: ["kb"] }, { show: ["k1", "k2", "k3"], stagger: 300 }] }
      ]
    }
  ]
});
