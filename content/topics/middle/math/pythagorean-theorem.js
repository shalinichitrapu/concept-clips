CC.topic({
  id: "pythagorean-theorem",
  level: "middle",
  section: "math",
  order: 3,
  title: "The Pythagorean theorem",
  summary: "How the sides of a right triangle are linked by a² + b² = c², and how to use it to find a ladder's length.",
  scenes: [
    {
      title: "A ladder against a wall",
      elements: {
        ground: { type: "art", kind: "math.ground", x: 40, y: 378 },
        wall:   { type: "art", kind: "math.wall", x: 388, y: 60 },
        ladder: { type: "art", kind: "math.ladder", x: 160, y: 90 },
        tri:    { type: "path", px: true, pts: [[170, 380], [380, 380], [380, 100], [170, 380]], tone: "yellow", w: 5 },
        corner: { type: "path", px: true, pts: [[380, 360], [360, 360], [360, 380]], tone: "yellow", w: 3 },
        baseL:  { type: "text", x: 290, y: 368, anchor: "middle", cls: "seg-label", text: "6 ft" },
        hL:     { type: "text", x: 368, y: 250, anchor: "end", cls: "seg-label", text: "8 ft" },
        q:      { type: "text", x: 252, y: 220, anchor: "end", cls: "seg-label", tone: "violet", text: "? ft" },
        rt:     { type: "box", x: 500, y: 110, w: 270, h: 110, tone: "yellow", label: "Right triangle", sub: "a triangle with one square corner, a right angle (90°)" },
        ask:    { type: "box", x: 500, y: 240, w: 270, h: 90, tone: "violet", label: "How long is the ladder?", sub: "the side across from the right angle" }
      },
      steps: [
        { caption: "A ladder leans against a wall. Its foot is 6 feet from the wall, and its top reaches 8 feet up.",
          do: [{ show: ["ground", "wall", "ladder"] }, { show: ["baseL", "hL"] }] },
        { caption: "The ground, the wall and the ladder make a triangle. The wall meets the ground in a square corner, so it's a right triangle.",
          do: [{ show: ["tri"] }, { show: ["corner", "rt"] }] },
        { caption: "How long is the ladder? You could climb up with a tape measure, or you can use a rule that every right triangle follows.",
          do: [{ show: ["q", "ask"] }, { pulse: "q" }] }
      ]
    },
    {
      title: "Squares on the sides",
      enter: "fade",
      elements: {
        tri: { type: "art", kind: "math.pythag", part: "tri", x: 40, y: 50 },
        sqA: { type: "art", kind: "math.pythag", part: "a", x: 40, y: 50 },
        sqB: { type: "art", kind: "math.pythag", part: "b", x: 40, y: 50 },
        sqC: { type: "art", kind: "math.pythag", part: "c", x: 40, y: 50 },
        aL:  { type: "text", x: 232, y: 281, anchor: "middle", cls: "seg-label", tone: "blue", text: "a = 3" },
        bL:  { type: "text", x: 183, y: 250, anchor: "start", cls: "seg-label", tone: "amber", text: "b = 4" },
        cL:  { type: "text", x: 238, y: 208, anchor: "start", cls: "seg-label", tone: "violet", text: "c" },
        nA:  { type: "text", x: 228, y: 348, anchor: "middle", cls: "eqbig", text: "9" },
        nB:  { type: "text", x: 109, y: 229, anchor: "middle", cls: "eqbig", text: "16" },
        nC:  { type: "text", x: 296, y: 178, anchor: "middle", cls: "eqbig", text: "25" },
        f1:  { type: "text", x: 480, y: 110, cls: "eqlabel", text: "THE PYTHAGOREAN THEOREM" },
        f2:  { type: "text", x: 480, y: 150, cls: "eqbig", text: "a² + b² = c²" },
        f3:  { type: "text", x: 480, y: 196, cls: "eq", text: "3² + 4² = 5²" },
        f4:  { type: "text", x: 480, y: 234, cls: "eq", text: "9 + 16 = 25" },
        hyp: { type: "box", x: 480, y: 280, w: 290, h: 96, tone: "violet", label: "c is the hypotenuse", sub: "the longest side, across from the right angle" }
      },
      steps: [
        { caption: "Take a smaller right triangle with short sides 3 and 4. Call the short sides a and b. The long side, c, is called the hypotenuse.",
          do: [{ show: ["tri"] }, { show: ["aL", "bL", "cL"] }, { show: ["hyp"] }] },
        { caption: "Build a square on side a. It's 3 by 3, so it holds 9 small squares.",
          do: [{ show: ["sqA"] }, { show: ["nA"] }] },
        { caption: "Build a square on side b. It's 4 by 4, so it holds 16 small squares.",
          do: [{ show: ["sqB"] }, { show: ["nB"] }] },
        { caption: "Now build a square on the hypotenuse. It holds 25 small squares, and 9 + 16 = 25. The two smaller squares exactly fill the big one.",
          do: [{ show: ["sqC"] }, { show: ["nC"] }, { pulse: "nC" }] },
        { caption: "This works for every right triangle. It's called the Pythagorean theorem: a² + b² = c², where a² means a × a.",
          do: [{ show: ["f1", "f2"] }, { show: ["f3", "f4"] }] }
      ]
    },
    {
      title: "Back to the ladder",
      enter: "fade",
      elements: {
        ground: { type: "art", kind: "math.ground", x: 40, y: 378, visible: true },
        wall:   { type: "art", kind: "math.wall", x: 388, y: 60, visible: true },
        ladder: { type: "art", kind: "math.ladder", x: 160, y: 90, visible: true },
        tri:    { type: "path", px: true, pts: [[170, 380], [380, 380], [380, 100], [170, 380]], tone: "yellow", w: 5, visible: true },
        corner: { type: "path", px: true, pts: [[380, 360], [360, 360], [360, 380]], tone: "yellow", w: 3, visible: true },
        baseL:  { type: "text", x: 290, y: 368, anchor: "middle", cls: "seg-label", text: "a = 6 ft", visible: true },
        hL:     { type: "text", x: 368, y: 250, anchor: "end", cls: "seg-label", text: "b = 8 ft", visible: true },
        q:      { type: "text", x: 252, y: 220, anchor: "end", cls: "seg-label", tone: "violet", text: "c = ? ft", visible: true },
        f1:     { type: "text", x: 500, y: 100, cls: "eqbig", text: "a² + b² = c²" },
        f2:     { type: "text", x: 500, y: 148, cls: "eq", text: "6² + 8² = c²" },
        f3:     { type: "text", x: 500, y: 188, cls: "eq", text: "36 + 64 = c²" },
        f4:     { type: "text", x: 500, y: 228, cls: "eq", text: "100 = c²" },
        f5:     { type: "text", x: 500, y: 276, cls: "eqbig", text: "c = 10 ft" },
        uses:   { type: "box", x: 500, y: 310, w: 270, h: 100, tone: "green", label: "Where it's used", sub: "building and carpentry, maps and navigation, screen sizes, video game distances" }
      },
      steps: [
        { caption: "Use the rule on the ladder. The short sides are 6 and 8, and the ladder is the hypotenuse, c.",
          do: [{ show: ["f1"] }, { show: ["f2"] }] },
        { caption: "Square the short sides: 6 × 6 = 36 and 8 × 8 = 64. Together they make 100, so c × c = 100.",
          do: [{ show: ["f3"] }, { wait: 400 }, { show: ["f4"] }] },
        { caption: "Which number times itself makes 100? It's 10, so the ladder is 10 feet long.",
          do: [{ show: ["f5"] }, { text: { id: "q", text: "c = 10 ft" } }, { pulse: "q" }] },
        { caption: "Whenever you know two sides of a right triangle, this rule finds the third. Builders, map makers and game designers use it all the time.",
          do: [{ show: ["uses"] }] }
      ]
    }
  ]
});
