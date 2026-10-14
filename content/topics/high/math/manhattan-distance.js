CC.topic({
  id: "manhattan-distance",
  level: "high",
  section: "math",
  order: 1,
  title: "Manhattan distance",
  summary: "How far apart two points are when you can only travel along a grid, like a taxi in a city.",
  scenes: [
    {
      title: "A taxi in a grid city",
      elements: {
        city:   { type: "grid", style: "city" },
        crow:   { type: "path", pts: [[1, 1], [5, 4]], tone: "sky", w: 5, dashed: true },
        route1: { type: "path", pts: [[1, 1], [5, 1], [5, 4]], tone: "yellow", w: 6 },
        A:      { type: "point", at: [1, 1], tone: "violet", label: "A", lx: -16, ly: 24 },
        B:      { type: "point", at: [5, 4], tone: "violet", label: "B", lx: 16, ly: -14 },
        crowL:  { type: "text", at: [3, 2.5], dx: -12, dy: -8, anchor: "end", cls: "seg-label", tone: "sky", text: "as the crow flies" },
        card:   { type: "box", x: 510, y: 150, w: 250, h: 110, tone: "yellow", label: "7 blocks", sub: "the Manhattan distance from A to B, counted along the streets" }
      },
      steps: [
        { caption: "In Manhattan the streets form a grid, with buildings filling the blocks between them.",
          do: [{ show: ["city"] }] },
        { caption: "You're at A and want to get to B.",
          do: [{ show: ["A", "B"] }, { pulse: "A" }, { pulse: "B" }] },
        { caption: "A bird could fly straight there. A taxi can't, because buildings are in the way.",
          do: [{ show: ["crow", "crowL"] }, { flow: { along: "crow", token: "Bird", tone: "sky" } }] },
        { caption: "The taxi has to follow the streets: 4 blocks east, then 3 blocks north.",
          do: [{ show: ["route1"] }, { flow: { along: "route1", token: "Taxi", tone: "yellow", dur: 1800 } }] },
        { caption: "Count the blocks along the way. There are 7, and that count is the Manhattan distance.",
          do: [{ tick: { path: "route1" } }, { show: ["card"] }] }
      ]
    },
    {
      title: "Many routes, same distance",
      enter: "fade",
      elements: {
        city:   { type: "grid", style: "city", visible: true },
        route1: { type: "path", pts: [[1, 1], [5, 1], [5, 4]], tone: "yellow", w: 6, opacity: 0.35, visible: true },
        r2:     { type: "path", pts: [[1, 1], [1, 4], [5, 4]], tone: "violet", w: 6 },
        r3:     { type: "path", pts: [[1, 1], [2, 1], [2, 2], [4, 2], [4, 3], [5, 3], [5, 4]], tone: "teal", w: 6 },
        A:      { type: "point", at: [1, 1], tone: "violet", label: "A", lx: -16, ly: 24, visible: true },
        B:      { type: "point", at: [5, 4], tone: "violet", label: "B", lx: 16, ly: -14, visible: true },
        k1:     { type: "box", x: 510, y: 60,  w: 250, h: 62, tone: "yellow", label: "East, then north", sub: "7 blocks", visible: true },
        k2:     { type: "box", x: 510, y: 134, w: 250, h: 62, tone: "violet", label: "North, then east", sub: "7 blocks" },
        k3:     { type: "box", x: 510, y: 208, w: 250, h: 62, tone: "teal",   label: "Staircase", sub: "7 blocks" },
        k4:     { type: "box", x: 510, y: 290, w: 250, h: 70, tone: "green",  label: "4 east + 3 north", sub: "in any order, always 7" }
      },
      steps: [
        { caption: "Does the route matter? Try another one: north first, then east.",
          do: [{ show: ["r2"] }, { flow: { along: "r2", token: "Taxi", tone: "violet", dur: 1800 } }, { tick: { path: "r2" } }, { show: ["k2"] }] },
        { caption: "Or zigzag like a staircase.",
          do: [{ show: ["r3"] }, { flow: { along: "r3", token: "Taxi", tone: "teal", dur: 1800 } }, { tick: { path: "r3" } }, { show: ["k3"] }] },
        { caption: "Every route that never doubles back is 7 blocks long. You always need 4 steps east and 3 steps north, just in a different order.",
          do: [{ show: ["k4"] }, { pulse: "k4" }] }
      ]
    },
    {
      title: "From streets to coordinates",
      enter: "fade",
      elements: {
        plane: { type: "grid", style: "plane", visible: true },
        dx:    { type: "path", pts: [[1, 1], [5, 1]], tone: "blue", w: 6 },
        dy:    { type: "path", pts: [[5, 1], [5, 4]], tone: "amber", w: 6 },
        A:     { type: "point", at: [1, 1], tone: "violet", label: "A (1, 1)", lx: -6, ly: 26, visible: true },
        B:     { type: "point", at: [5, 4], tone: "violet", label: "B (5, 4)", lx: 16, ly: -14, anchor: "start", visible: true },
        dxL:   { type: "text", at: [3, 1], dy: 26, anchor: "middle", cls: "seg-label", tone: "blue", text: "|5 − 1| = 4" },
        dyL:   { type: "text", at: [5, 2.5], dx: 14, dy: 5, anchor: "start", cls: "seg-label", tone: "amber", text: "|4 − 1| = 3" },
        f1:    { type: "text", x: 510, y: 110, cls: "eqlabel", text: "MANHATTAN DISTANCE" },
        f2:    { type: "text", x: 510, y: 150, cls: "eqbig", text: "d = |x₂ − x₁| + |y₂ − y₁|" },
        f3:    { type: "text", x: 510, y: 200, cls: "eq", text: "= |5 − 1| + |4 − 1|" },
        f4:    { type: "text", x: 510, y: 240, cls: "eq", text: "= 4 + 3" },
        f5:    { type: "text", x: 510, y: 290, cls: "eqbig", text: "= 7" }
      },
      steps: [
        { caption: "Remove the buildings and the streets become a coordinate grid. A is at (1, 1) and B is at (5, 4).",
          do: [{ pulse: "A" }, { pulse: "B" }] },
        { caption: "The east-west part of the trip is the difference between the x values: |5 − 1| = 4.",
          do: [{ show: ["dx"] }, { show: ["dxL"] }] },
        { caption: "The north-south part is the difference between the y values: |4 − 1| = 3.",
          do: [{ show: ["dy"] }, { show: ["dyL"] }] },
        { caption: "Add the two parts and you have the formula. The bars mean absolute value, so a distance is never negative, whichever way you travel.",
          do: [{ show: ["f1", "f2"] }, { wait: 500 }, { show: ["f3"] }, { wait: 400 }, { show: ["f4"] }, { wait: 400 }, { show: ["f5"] }] }
      ]
    },
    {
      title: "Compared with a straight line",
      enter: "fade",
      elements: {
        plane: { type: "grid", style: "plane", visible: true },
        dx:    { type: "path", pts: [[1, 1], [5, 1]], tone: "blue", w: 6, visible: true },
        dy:    { type: "path", pts: [[5, 1], [5, 4]], tone: "amber", w: 6, visible: true },
        crow:  { type: "path", pts: [[1, 1], [5, 4]], tone: "sky", w: 5, dashed: true },
        A:     { type: "point", at: [1, 1], tone: "violet", label: "A (1, 1)", lx: -6, ly: 26, visible: true },
        B:     { type: "point", at: [5, 4], tone: "violet", label: "B (5, 4)", lx: 16, ly: -14, anchor: "start", visible: true },
        dxL:   { type: "text", at: [3, 1], dy: 26, anchor: "middle", cls: "seg-label", tone: "blue", text: "4", visible: true },
        dyL:   { type: "text", at: [5, 2.5], dx: 14, dy: 5, anchor: "start", cls: "seg-label", tone: "amber", text: "3", visible: true },
        crowL: { type: "text", at: [3, 2.5], dx: -12, dy: -8, anchor: "end", cls: "seg-label", tone: "sky", text: "√(4² + 3²) = 5" },
        cmpE:  { type: "box", x: 510, y: 110, w: 250, h: 84, tone: "sky", label: "Straight line: 5", sub: "Pythagoras: √(4² + 3²)" },
        cmpM:  { type: "box", x: 510, y: 214, w: 250, h: 84, tone: "yellow", label: "Manhattan: 7", sub: "|5 − 1| + |4 − 1|" }
      },
      steps: [
        { caption: "The straight-line distance is the one you know from Pythagoras: √(4² + 3²) = 5.",
          do: [{ show: ["crow"] }, { show: ["crowL", "cmpE"] }] },
        { caption: "Same two points, two answers: 5 in a straight line, 7 along the grid. Manhattan distance is never shorter than the straight line.",
          do: [{ show: ["cmpM"] }, { pulse: "cmpM" }] }
      ]
    },
    {
      title: "What a circle looks like",
      enter: "zoom",
      elements: {
        plane:   { type: "grid", style: "plane", visible: true },
        circle:  { type: "circle", at: [4, 3], r: 3, tone: "sky", w: 4, dashed: true },
        diamond: { type: "path", pts: [[1, 3], [4, 6], [7, 3], [4, 0], [1, 3]], tone: "amber", w: 4 },
        p1:  { type: "point", at: [4, 6], tone: "amber", r: 6 },
        p2:  { type: "point", at: [5, 5], tone: "amber", r: 6 },
        p3:  { type: "point", at: [6, 4], tone: "amber", r: 6 },
        p4:  { type: "point", at: [7, 3], tone: "amber", r: 6 },
        p5:  { type: "point", at: [6, 2], tone: "amber", r: 6 },
        p6:  { type: "point", at: [5, 1], tone: "amber", r: 6 },
        p7:  { type: "point", at: [4, 0], tone: "amber", r: 6 },
        p8:  { type: "point", at: [3, 1], tone: "amber", r: 6 },
        p9:  { type: "point", at: [2, 2], tone: "amber", r: 6 },
        p10: { type: "point", at: [1, 3], tone: "amber", r: 6 },
        p11: { type: "point", at: [2, 4], tone: "amber", r: 6 },
        p12: { type: "point", at: [3, 5], tone: "amber", r: 6 },
        C:   { type: "point", at: [4, 3], tone: "violet", label: "C", lx: 0, ly: 26 },
        lg1: { type: "text", x: 510, y: 100, cls: "legend", swatch: "amber", text: "Manhattan distance 3 from C" },
        lg2: { type: "text", x: 510, y: 132, cls: "legend", swatch: "dash", swatchTone: "sky", text: "Straight-line distance 3 from C" },
        uses: { type: "box", x: 510, y: 200, w: 250, h: 130, tone: "green", label: "Where it's used", sub: "taxi and delivery routes, warehouse robots, grid games, comparing data points in machine learning" }
      },
      steps: [
        { caption: "One more surprise. A circle is every point at the same distance from a center. Here's a center, C.",
          do: [{ show: ["C"] }, { pulse: "C" }] },
        { caption: "Mark every grid point that is exactly 3 blocks from C in Manhattan distance.",
          do: [{ show: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12"], stagger: 140 }] },
        { caption: "Connect them, and this \"circle\" turns out to be a diamond.",
          do: [{ show: ["diamond"] }, { show: ["lg1"] }] },
        { caption: "The everyday circle of radius 3 is round. Both shapes mean \"distance 3 from C\". They differ because the two methods measure distance differently.",
          do: [{ show: ["circle"] }, { show: ["lg2"] }] },
        { caption: "Use Manhattan distance whenever movement follows a grid: taxi and delivery routes, warehouse robots, grid games, and comparing data points in machine learning.",
          do: [{ show: ["uses"] }] }
      ]
    }
  ]
});
