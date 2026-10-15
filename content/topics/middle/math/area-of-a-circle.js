CC.topic({
  id: "area-of-a-circle",
  level: "middle",
  section: "math",
  order: 5,
  title: "Area of a circle",
  summary: "Why the area of a circle is π × r × r, shown by cutting a pizza into slices and lining them up.",
  scenes: [
    {
      title: "How much pizza?",
      elements: {
        pizza:  { type: "art", kind: "math.pizza", x: 60, y: 50, s: 1.4, layer: "back" },
        p8:     { type: "art", kind: "math.pizza", cuts: 8, x: 60, y: 50, s: 1.4, layer: "back", label: "8 equal slices" },
        p16:    { type: "art", kind: "math.pizza", cuts: 16, x: 60, y: 50, s: 1.4, layer: "back" },
        lab16:  { type: "text", x: 186, y: 324, anchor: "middle", cls: "artlbl", text: "16 thinner slices" },
        rad:    { type: "path", px: true, pts: [[186, 176], [306, 176]], tone: "violet", w: 5 },
        center: { type: "point", px: true, at: [186, 176], tone: "violet", r: 6 },
        radL:   { type: "text", x: 246, y: 166, anchor: "middle", cls: "seg-label", tone: "violet", text: "r" },
        circ:   { type: "circle", px: true, at: [186, 176], r: 134, tone: "sky", w: 4, dashed: true },
        area:   { type: "box", x: 420, y: 60, w: 340, h: 84, tone: "amber", label: "Area", sub: "how much flat surface is inside a shape: here, how much pizza" },
        k1:     { type: "text", x: 430, y: 196, cls: "legend", swatch: "violet", text: "radius r: from the center to the edge" },
        k2:     { type: "text", x: 430, y: 232, cls: "legend", swatch: "sky", text: "circumference: once around the edge" },
        k3:     { type: "text", x: 450, y: 266, cls: "eq", text: "circumference = 2 × π × r" },
        k4:     { type: "text", x: 450, y: 298, cls: "sub", text: "π (pi) is about 3.14" }
      },
      steps: [
        { caption: "How much pizza is this? The amount of flat surface inside a shape is called its area.",
          do: [{ show: ["pizza"] }, { show: ["area"] }] },
        { caption: "The radius, r, is the distance from the center of the circle to its edge.",
          do: [{ show: ["center", "rad"] }, { show: ["radL", "k1"] }] },
        { caption: "The distance around the edge is the circumference. It's 2 × π × r, where π (pi) is a number a little more than 3, about 3.14.",
          do: [{ show: ["circ"] }, { show: ["k2", "k3", "k4"] }] },
        { caption: "Now cut the pizza into 8 equal slices.",
          do: [{ hide: ["rad", "radL", "center", "circ"] }, { show: ["p8"] }] },
        { caption: "Then cut each slice in half, for 16 thin slices. Each one is almost a thin triangle.",
          do: [{ hide: ["p8"] }, { show: ["p16", "lab16"] }] }
      ]
    },
    {
      title: "Line up the slices",
      enter: "fade",
      elements: {
        halves: { type: "art", kind: "math.pizza", halves: true, cuts: 16, x: 50, y: 110, label: "16 slices", sub: "8 on top, 8 on the bottom" },
        top:    { type: "art", kind: "math.combDown", tone: "amber", x: 430, y: 100 },
        bot:    { type: "art", kind: "math.combUp", tone: "teal", x: 447, y: 250 },
        hBar:   { type: "path", px: true, pts: [[412, 104], [412, 189]], tone: "violet", w: 4 },
        hL:     { type: "text", x: 400, y: 152, anchor: "end", cls: "seg-label", tone: "violet", text: "r" },
        wBar:   { type: "path", px: true, pts: [[432, 212], [719, 212]], tone: "sky", w: 4 },
        wL:     { type: "text", x: 576, y: 238, anchor: "middle", cls: "seg-label", tone: "sky", text: "πr: half the circumference" },
        res:    { type: "box", x: 430, y: 290, w: 300, h: 100, tone: "yellow", label: "Area = πr × r = πr²", sub: "width × height of the near-rectangle" }
      },
      steps: [
        { caption: "Color the top half of the pizza amber and the bottom half teal. Each half has 8 slices and half of the crust.",
          do: [{ show: ["halves"] }] },
        { caption: "Take the top half and stand its 8 slices side by side, points down. Its crust now runs along the top.",
          do: [{ show: ["top"] }, { pulse: "top" }] },
        { caption: "Do the same with the bottom half, points up, and slide it in. The slices fit together like teeth.",
          do: [{ show: ["bot"] }, { move: { id: "bot", to: [447, 100], dur: 1400 } }] },
        { caption: "The result is almost a rectangle. It's one radius tall, and it's half the circumference wide: half of 2πr, which is πr.",
          do: [{ show: ["hBar", "hL"] }, { show: ["wBar", "wL"] }] },
        { caption: "A rectangle's area is width × height, so the circle's area is πr × r, written πr². Thinner slices make the shape even closer to a rectangle.",
          do: [{ show: ["res"] }, { pulse: "res" }] }
      ]
    },
    {
      title: "Which pizza is bigger?",
      enter: "slide",
      elements: {
        big:   { type: "art", kind: "math.pizza", x: 40, y: 80, s: 1.2, layer: "back", label: "12-inch pizza", sub: "radius 6 inches" },
        bigD:  { type: "path", px: true, pts: [[46, 188], [250, 188]], tone: "violet", w: 4 },
        bigL:  { type: "text", x: 148, y: 178, anchor: "middle", cls: "seg-label", tone: "violet", text: "12 in" },
        small: { type: "art", kind: "math.pizza", x: 300, y: 152, s: 0.8, layer: "back", label: "8-inch pizza", sub: "radius 4 inches" },
        smD:   { type: "path", px: true, pts: [[304, 224], [440, 224]], tone: "violet", w: 4 },
        smL:   { type: "text", x: 372, y: 214, anchor: "middle", cls: "seg-label", tone: "violet", text: "8 in" },
        f0:    { type: "text", x: 500, y: 70, cls: "eqbig", text: "A = π × r × r" },
        f1:    { type: "text", x: 500, y: 118, cls: "eqlabel", text: "12-INCH PIZZA, r = 6 in" },
        f2:    { type: "text", x: 500, y: 146, cls: "eq", text: "A ≈ 3.14 × 6 × 6 ≈ 113 in²" },
        f3:    { type: "text", x: 500, y: 192, cls: "eqlabel", text: "8-INCH PIZZA, r = 4 in" },
        f4:    { type: "text", x: 500, y: 220, cls: "eq", text: "A ≈ 3.14 × 4 × 4 ≈ 50 in²" },
        win:   { type: "box", x: 490, y: 260, w: 290, h: 110, tone: "green", label: "One 12-inch wins", sub: "113 in² is more than two 8-inch pizzas together (about 100 in²)" }
      },
      steps: [
        { caption: "A 12-inch pizza is 12 inches across, so its radius is 6 inches. Its area is about 3.14 × 6 × 6, which is about 113 square inches.",
          do: [{ show: ["big", "bigD", "bigL"] }, { show: ["f0", "f1", "f2"] }] },
        { caption: "An 8-inch pizza has a radius of 4 inches. Its area is about 3.14 × 4 × 4, which is about 50 square inches.",
          do: [{ show: ["small", "smD", "smL"] }, { show: ["f3", "f4"] }] },
        { caption: "So one 12-inch pizza has more than two 8-inch pizzas put together. Because the radius is multiplied by itself, a little wider means a lot more pizza.",
          do: [{ show: ["win"] }, { pulse: "win" }] }
      ]
    }
  ]
});
