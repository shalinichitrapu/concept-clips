CC.topic({
  id: "slope-of-a-line",
  level: "high",
  section: "math",
  order: 2,
  title: "Slope of a line",
  summary: "How steep a line is, measured as rise over run, from wheelchair ramps and road signs to the coordinate plane.",
  scenes: [
    {
      title: "How steep is a ramp?",
      elements: {
        ramp:  { type: "art", kind: "math.ramp", x: 20, y: 140 },
        note:  { type: "text", x: 22, y: 120, cls: "sub", text: "Drawn to scale" },
        runB:  { type: "path", px: true, pts: [[22, 348], [380, 348]], tone: "blue", w: 4 },
        runL:  { type: "text", x: 201, y: 374, anchor: "middle", cls: "seg-label", tone: "blue", text: "run: 12 ft" },
        riseB: { type: "path", px: true, pts: [[474, 298], [474, 328]], tone: "amber", w: 4 },
        riseL: { type: "text", x: 484, y: 318, cls: "seg-label", tone: "amber", text: "rise: 1 ft" },
        slope: { type: "box", x: 570, y: 110, w: 210, h: 110, tone: "yellow", label: "slope = rise ÷ run", sub: "1 ft ÷ 12 ft = 1/12, about 0.083" },
        ada:   { type: "box", x: 570, y: 240, w: 210, h: 110, tone: "green", label: "The legal limit", sub: "U.S. accessibility rules allow at most 1/12 for a ramp" }
      },
      steps: [
        { caption: "A wheelchair ramp climbs from the sidewalk to a door. If it's too steep, it's hard and unsafe to use. So how do we measure steepness?",
          do: [{ show: ["ramp", "note"] }] },
        { caption: "Compare two distances: the run, how far the ramp goes across, and the rise, how far it goes up. This ramp rises 1 foot over a run of 12 feet.",
          do: [{ show: ["runB", "runL"] }, { show: ["riseB", "riseL"] }] },
        { caption: "Slope is rise divided by run. Here it's 1/12, about 0.083. Under the Americans with Disabilities Act, a ramp's slope can be at most 1/12.",
          do: [{ show: ["slope"] }, { pulse: "slope" }, { show: ["ada"] }] }
      ]
    },
    {
      title: "Rise over run on a grid",
      enter: "fade",
      elements: {
        plane: { type: "grid", style: "plane" },
        ln:    { type: "path", pts: [[0, 1.25], [6.333, 6]], tone: "yellow", w: 5 },
        A:     { type: "point", at: [1, 2], tone: "violet", label: "(1, 2)", lx: -10, ly: -16, anchor: "end" },
        B:     { type: "point", at: [5, 5], tone: "violet", label: "(5, 5)", lx: -12, ly: -12, anchor: "end" },
        run:   { type: "path", pts: [[1, 2], [5, 2]], tone: "blue", w: 6 },
        rise:  { type: "path", pts: [[5, 2], [5, 5]], tone: "amber", w: 6 },
        runL:  { type: "text", at: [3, 2], dy: 26, anchor: "middle", cls: "seg-label", tone: "blue", text: "run = 5 − 1 = 4" },
        riseL: { type: "text", at: [5, 3.5], dx: 14, dy: 5, cls: "seg-label", tone: "amber", text: "rise = 5 − 2 = 3" },
        f1:    { type: "text", x: 510, y: 100, cls: "eqlabel", text: "SLOPE" },
        f2:    { type: "text", x: 510, y: 140, cls: "eqbig", text: "m = rise / run" },
        f3:    { type: "text", x: 510, y: 184, cls: "eq", text: "= (y₂ − y₁) / (x₂ − x₁)" },
        f4:    { type: "text", x: 510, y: 222, cls: "eq", text: "= (5 − 2) / (5 − 1)" },
        f5:    { type: "text", x: 510, y: 266, cls: "eqbig", text: "= 3/4 = 0.75" }
      },
      steps: [
        { caption: "Now draw a line on the coordinate plane and pick two points on it: (x₁, y₁) = (1, 2) and (x₂, y₂) = (5, 5).",
          do: [{ show: ["plane", "ln"] }, { show: ["A", "B"] }] },
        { caption: "The run is the change in x between the points: 5 − 1 = 4.",
          do: [{ show: ["run", "runL"] }] },
        { caption: "The rise is the change in y: 5 − 2 = 3.",
          do: [{ show: ["rise", "riseL"] }] },
        { caption: "Slope is usually written m. Dividing rise by run gives the formula m = (y₂ − y₁) / (x₂ − x₁) = 3/4. The line rises 0.75 for every 1 unit across.",
          do: [{ show: ["f1", "f2"] }, { wait: 400 }, { show: ["f3"] }, { wait: 400 }, { show: ["f4"] }, { wait: 400 }, { show: ["f5"] }] },
        { caption: "Any two points on a straight line give the same slope, because a straight line is equally steep everywhere.",
          do: [{ pulse: "ln" }, { pulse: "f5" }] }
      ]
    },
    {
      title: "Steep, flat and falling",
      enter: "fade",
      elements: {
        plane: { type: "grid", style: "plane", visible: true },
        mSteep: { type: "path", pts: [[2.5, 0], [5.5, 6]], tone: "violet", w: 5 },
        mHalf:  { type: "path", pts: [[0, 1], [8, 5]], tone: "teal", w: 5 },
        mZero:  { type: "path", pts: [[0, 3], [8, 3]], tone: "grey", w: 5 },
        mNeg:   { type: "path", pts: [[1, 6], [7, 0]], tone: "red", w: 5 },
        mVert:  { type: "path", pts: [[4, 0], [4, 6]], tone: "grey", w: 5, dashed: true },
        P:      { type: "point", at: [4, 3], tone: "violet" },
        k1: { type: "text", x: 510, y: 100, cls: "legend", swatch: "violet", text: "m = 2: up 2 for each 1 across" },
        k2: { type: "text", x: 510, y: 136, cls: "legend", swatch: "teal", text: "m = 1/2: up 1 for each 2 across" },
        k3: { type: "text", x: 510, y: 172, cls: "legend", swatch: "grey", text: "m = 0: horizontal, no rise" },
        k4: { type: "text", x: 510, y: 208, cls: "legend", swatch: "red", text: "m = −1: down 1 for each 1 across" },
        k5: { type: "text", x: 510, y: 244, cls: "legend", swatch: "dash", swatchTone: "grey", text: "vertical: undefined" },
        sum: { type: "box", x: 510, y: 280, w: 260, h: 100, tone: "yellow", label: "Read the sign", sub: "positive rises, negative falls, and a bigger size means steeper" }
      },
      steps: [
        { caption: "Compare lines through the same point. The bigger the slope, the steeper the line: m = 2 climbs four times as fast as m = 1/2.",
          do: [{ show: ["P"] }, { show: ["mSteep", "k1"] }, { show: ["mHalf", "k2"] }] },
        { caption: "A horizontal line has no rise at all, so its slope is 0.",
          do: [{ show: ["mZero", "k3"] }] },
        { caption: "A line that falls from left to right has a negative slope. This one drops 1 unit for each unit across, so m = −1.",
          do: [{ show: ["mNeg", "k4"] }] },
        { caption: "A vertical line has no run, and you can't divide by 0, so its slope is undefined.",
          do: [{ show: ["mVert", "k5"] }, { show: ["sum"] }] }
      ]
    },
    {
      title: "A 6% road grade",
      enter: "slide",
      elements: {
        road:  { type: "art", kind: "math.road", x: 40, y: 210 },
        sign:  { type: "art", kind: "math.gradeSign", x: 100, y: 116 },
        note:  { type: "text", x: 642, y: 206, anchor: "end", cls: "sub", text: "Drawn to scale" },
        trCar: { type: "track", d: "M60,252 L620,218" },
        runB:  { type: "path", px: true, pts: [[42, 292], [642, 292]], tone: "blue", w: 4 },
        runL:  { type: "text", x: 342, y: 318, anchor: "middle", cls: "seg-label", tone: "blue", text: "run: 100 m" },
        riseB: { type: "path", px: true, pts: [[662, 232], [662, 268]], tone: "amber", w: 4 },
        riseL: { type: "text", x: 674, y: 256, cls: "seg-label", tone: "amber", text: "rise: 6 m" },
        grade: { type: "box", x: 150, y: 340, w: 500, h: 84, tone: "yellow", label: "grade = slope × 100%", sub: "6 m ÷ 100 m = 0.06, which is a 6% grade" }
      },
      steps: [
        { caption: "On roads, slope is called the grade and is written as a percent. Signs like this one warn drivers about a steep hill ahead.",
          do: [{ show: ["road", "note"] }, { show: ["sign"] }, { flow: { along: "trCar", art: "math.car", s: 0.8, dur: 2200 } }] },
        { caption: "A 6% grade means the road rises 6 meters for every 100 meters across. Drawn to scale it looks gentle, but for a highway, and especially for heavy trucks, 6% counts as steep.",
          do: [{ show: ["runB", "runL"] }, { show: ["riseB", "riseL"] }] },
        { caption: "Grade is slope written as a percent: m = 6/100 = 0.06, or 6%. Road and railway engineers describe steepness this way.",
          do: [{ show: ["grade"] }, { pulse: "grade" }] }
      ]
    }
  ]
});
