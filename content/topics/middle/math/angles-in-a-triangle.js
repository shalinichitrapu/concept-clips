CC.topic({
  id: "angles-in-a-triangle",
  level: "middle",
  section: "math",
  order: 4,
  title: "Angles in a triangle",
  summary: "Why the three angles of every triangle add up to 180°, shown by tearing the corners off a paper triangle.",
  scenes: [
    {
      title: "Tear off the corners",
      elements: {
        tri:   { type: "art", kind: "math.tornTriangle", x: 90, y: 125 },
        cA:    { type: "art", kind: "math.corner", a0: 0, a1: 45, tone: "red", text: "45°", x: 25, y: 265 },
        cB:    { type: "art", kind: "math.corner", a0: 115, a1: 180, tone: "blue", text: "65°", x: 325, y: 265 },
        cC:    { type: "art", kind: "math.corner", a0: 225, a1: 295, tone: "amber", text: "70°", x: 229.6, y: 60.4 },
        cC2:   { type: "art", kind: "math.corner", a0: 45, a1: 115, tone: "amber", text: "70°", x: 550, y: 255 },
        flat:  { type: "path", px: true, pts: [[480, 330], [770, 330]], tone: "grey", w: 4 },
        flatL: { type: "text", x: 625, y: 358, anchor: "middle", cls: "seg-label", text: "a straight line" },
        sum:   { type: "text", x: 625, y: 398, anchor: "middle", cls: "eqbig", text: "45° + 65° + 70° = 180°" },
        box:   { type: "box", x: 480, y: 60, w: 290, h: 100, tone: "yellow", label: "A straight line is 180°", sub: "half of a full turn, which is 360°" }
      },
      steps: [
        { caption: "Cut a triangle out of paper. Its three corners are its three angles. Measured with a protractor, these are 45°, 65° and 70°.",
          do: [{ show: ["tri", "cA", "cB", "cC"] }, { pulse: "cA" }, { pulse: "cB" }, { pulse: "cC" }] },
        { caption: "Now tear off the three corners.",
          do: [{ all: [{ move: { id: "cA", by: [-20, 8], dur: 600 } }, { move: { id: "cB", by: [18.5, 11.8], dur: 600 } }, { move: { id: "cC", by: [3.8, -21.7], dur: 600 } }] }] },
        { caption: "Draw a straight line. Put the red and blue corners on it, with their points touching.",
          do: [{ show: ["flat"] }, { all: [{ move: { id: "cA", to: [550, 255], dur: 1400 } }, { move: { id: "cB", to: [550, 255], dur: 1400 } }] }] },
        { caption: "Turn the last corner around, and it fills the gap between them exactly.",
          do: [{ move: { id: "cC", to: [550, 140], dur: 1200 } }, { all: [{ hide: ["cC"] }, { show: ["cC2"] }] }] },
        { caption: "Together, the three corners make a straight line. A straight line is a half turn, 180°, so 45° + 65° + 70° = 180°.",
          do: [{ show: ["flatL"] }, { show: ["box"] }, { show: ["sum"] }, { pulse: "sum" }] }
      ]
    },
    {
      title: "Every triangle",
      enter: "fade",
      elements: {
        eq:   { type: "art", kind: "math.triangle", pts: [[20, 210], [220, 210], [120, 36.8]], x: 50, y: 70 },
        eqA:  { type: "text", x: 120, y: 256, anchor: "middle", cls: "seg-label", text: "60°" },
        eqB:  { type: "text", x: 220, y: 256, anchor: "middle", cls: "seg-label", text: "60°" },
        eqC:  { type: "text", x: 170, y: 170, anchor: "middle", cls: "seg-label", text: "60°" },
        eqN:  { type: "text", x: 170, y: 312, anchor: "middle", cls: "artlbl", text: "Equilateral triangle" },
        eqS:  { type: "text", x: 170, y: 342, anchor: "middle", cls: "eq", text: "60° + 60° + 60° = 180°" },
        rt:   { type: "art", kind: "math.triangle", pts: [[20, 210], [220, 210], [220, 42.2]], right: 1, x: 420, y: 70 },
        rtA:  { type: "text", x: 500, y: 266, anchor: "middle", cls: "seg-label", text: "40°" },
        rtB:  { type: "text", x: 608, y: 256, anchor: "middle", cls: "seg-label", text: "90°" },
        rtC:  { type: "text", x: 614, y: 174, anchor: "middle", cls: "seg-label", text: "50°" },
        rtN:  { type: "text", x: 540, y: 312, anchor: "middle", cls: "artlbl", text: "Right triangle" },
        rtS:  { type: "text", x: 540, y: 342, anchor: "middle", cls: "eq", text: "40° + 50° + 90° = 180°" },
        rule: { type: "box", x: 150, y: 362, w: 500, h: 66, tone: "yellow", label: "Every triangle: 180°", sub: "the three angles always add up to 180°" }
      },
      steps: [
        { caption: "This works for every triangle. In an equilateral triangle, all three sides are the same length, and so are the angles: 180° ÷ 3 = 60° each.",
          do: [{ show: ["eq"] }, { show: ["eqA", "eqB", "eqC"] }, { show: ["eqN", "eqS"] }] },
        { caption: "A right triangle has one 90° angle, the square corner. That leaves 90° for the other two angles, so they add up to 90°: here 40° + 50°.",
          say: "A right triangle has one ninety degree angle, the square corner. That leaves ninety degrees for the other two angles, so they add up to ninety degrees: here forty degrees plus fifty degrees.",
          do: [{ show: ["rt"] }, { show: ["rtB"] }, { show: ["rtA", "rtC"] }, { show: ["rtN", "rtS"] }] },
        { caption: "Big or small, wide or thin, the three angles of any triangle add up to 180°.",
          do: [{ show: ["rule"] }, { pulse: "rule" }] }
      ]
    },
    {
      title: "Find the missing angle",
      enter: "slide",
      elements: {
        tri:  { type: "art", kind: "math.triangle", pts: [[20, 210], [260, 210], [187.4, 10.5]], x: 40, y: 90 },
        aL:   { type: "text", x: 113, y: 281, anchor: "middle", cls: "seg-label", text: "50°" },
        bL:   { type: "text", x: 253, y: 272, anchor: "middle", cls: "seg-label", text: "70°" },
        cL:   { type: "text", x: 217, y: 165, anchor: "middle", cls: "seg-label", tone: "violet", text: "?" },
        f1:   { type: "text", x: 450, y: 100, cls: "eq", text: "50° + 70° + ? = 180°" },
        f2:   { type: "text", x: 450, y: 140, cls: "eq", text: "120° + ? = 180°" },
        f3:   { type: "text", x: 450, y: 180, cls: "eq", text: "? = 180° − 120°" },
        f4:   { type: "text", x: 450, y: 226, cls: "eqbig", text: "? = 60°" },
        rule: { type: "box", x: 450, y: 270, w: 320, h: 110, tone: "green", label: "Finding a missing angle", sub: "180° minus the two angles you know" }
      },
      steps: [
        { caption: "Now use the rule. This triangle has angles of 50° and 70°. What is the third angle?",
          do: [{ show: ["tri"] }, { show: ["aL", "bL"] }, { show: ["cL"] }, { pulse: "cL" }] },
        { caption: "All three angles add up to 180°. The two you know make 50° + 70° = 120°.",
          do: [{ show: ["f1"] }, { show: ["f2"] }] },
        { caption: "So the missing angle is 180° − 120° = 60°.",
          do: [{ show: ["f3"] }, { show: ["f4"] }, { text: { id: "cL", text: "60°" } }, { pulse: "cL" }] },
        { caption: "To find a missing angle in any triangle, subtract the two angles you know from 180°.",
          do: [{ show: ["rule"] }] }
      ]
    }
  ]
});
