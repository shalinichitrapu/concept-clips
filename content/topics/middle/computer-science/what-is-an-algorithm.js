CC.topic({
  id: "what-is-an-algorithm",
  level: "middle",
  section: "computer-science",
  order: 3,
  title: "What is an algorithm",
  summary: "An algorithm is a list of exact steps, like a recipe. Watch one sort a row of cards and count its work.",
  scenes: [
    {
      title: "A recipe",
      elements: {
        recipe: { type: "art", kind: "cs.recipe", x: 40, y: 70, s: 1.2, label: "Recipe" },
        s1:     { type: "text", x: 200, y: 120, cls: "eq", text: "1. Take two slices of bread" },
        s2:     { type: "text", x: 200, y: 160, cls: "eq", text: "2. Spread peanut butter on one" },
        s3:     { type: "text", x: 200, y: 200, cls: "eq", text: "3. Spread jam on the other" },
        s4:     { type: "text", x: 200, y: 240, cls: "eq", text: "4. Press them together" },
        sand:   { type: "art", kind: "cs.sandwich", x: 590, y: 130, s: 1.2, label: "Sandwich", sub: "the same result every time", lw: 200 },
        order:  { type: "text", x: 200, y: 300, cls: "callout", tone: "amber", text: "Order matters: you can't spread jam after pressing them together." }
      },
      arrows: {
        aMake: { d: "M470,180 L575,180", label: { text: "follow", x: 522, y: 168 } }
      },
      steps: [
        { caption: "An algorithm is a list of exact steps that solves a problem. A recipe is a good example.",
          do: [{ show: ["recipe"] }, { show: ["s1", "s2", "s3", "s4"], stagger: 250 }] },
        { caption: "The steps are exact, and they come in order. Do them in a different order and you won't get the same result.",
          do: [{ show: ["order"] }] },
        { caption: "Follow the steps and you get a sandwich. Follow them again tomorrow and you get the same sandwich.",
          do: [{ show: ["aMake"] }, { show: ["sand"] }, { pulse: "sand" }] }
      ]
    },
    {
      title: "Sorting cards",
      enter: "slide",
      elements: {
        topL: { type: "text", x: 60, y: 62, cls: "eqlabel", text: "TOP ROW" },
        botL: { type: "text", x: 60, y: 252, cls: "eqlabel", text: "BOTTOM ROW: SORTED" },
        c7:   { type: "art", kind: "cs.card", text: 7, x: 60, y: 75, s: 1.5 },
        c3:   { type: "art", kind: "cs.card", text: 3, x: 140, y: 75, s: 1.5 },
        c9:   { type: "art", kind: "cs.card", text: 9, x: 220, y: 75, s: 1.5 },
        c1:   { type: "art", kind: "cs.card", text: 1, x: 300, y: 75, s: 1.5 },
        c5:   { type: "art", kind: "cs.card", text: 5, x: 380, y: 75, s: 1.5 },
        ruleL: { type: "text", x: 500, y: 62, cls: "eqlabel", text: "THE STEPS" },
        r1:   { type: "text", x: 500, y: 100, cls: "eq", text: "1. Check every card on top" },
        r2:   { type: "text", x: 500, y: 135, cls: "eq", text: "2. Move the smallest down," },
        r2b:  { type: "text", x: 522, y: 160, cls: "eq", text: "to the end of the row" },
        r3:   { type: "text", x: 500, y: 195, cls: "eq", text: "3. Repeat until the top is empty" },
        m:    { type: "meter", x: 500, y: 240, w: 260, total: 15, label: "Cards checked", format: "{v}", tone: "amber" },
        same: { type: "box", x: 490, y: 290, w: 280, h: 100, tone: "green", label: "Same input, same result", sub: "these 5 cards always take 15 checks and end as 1, 3, 5, 7, 9" },
        look: { type: "track", d: "M70,175 L450,175" }
      },
      steps: [
        { caption: "Computers follow algorithms too. A common job is sorting. Here are five number cards in a jumbled row.",
          do: [{ show: ["topL", "c7", "c3", "c9", "c1", "c5"] }] },
        { caption: "Here's an algorithm for sorting them. First, check every card in the top row and find the smallest: 1. Move it to the bottom row.",
          do: [{ show: ["ruleL", "r1", "r2", "r2b", "r3", "botL"] }, { show: ["m"] }, { all: [{ flow: { along: "look", token: "checking", tone: "amber", dur: 1500 } }, { meter: { id: "m", value: 5, dur: 1500 } }] },
               { pulse: "c1" }, { move: { id: "c1", to: [60, 265] } }] },
        { caption: "Repeat with the cards that are left. Four checks later, the smallest is 3. It goes next in the bottom row.",
          do: [{ all: [{ flow: { along: "look", token: "checking", tone: "amber", dur: 1300 } }, { meter: { id: "m", value: 9, dur: 1300 } }] },
               { pulse: "c3" }, { move: { id: "c3", to: [140, 265] } }] },
        { caption: "Keep repeating: 5, then 7, then 9. When the top row is empty, the cards are in order.",
          do: [{ meter: { id: "m", value: 12, dur: 600 } }, { move: { id: "c5", to: [220, 265], dur: 700 } },
               { meter: { id: "m", value: 14, dur: 500 } }, { move: { id: "c7", to: [300, 265], dur: 700 } },
               { meter: { id: "m", value: 15, dur: 400 } }, { move: { id: "c9", to: [380, 265], dur: 700 } }] },
        { caption: "An algorithm always gives the same result for the same input. These five cards will always take 15 checks and end as 1, 3, 5, 7, 9.",
          do: [{ show: ["same"] }] }
      ]
    },
    {
      title: "Counting the work",
      enter: "fade",
      scale: 1.2,
      base: 370,
      elements: {
        axis: { type: "axis", x1: 60, x2: 520, y: 370 },
        b5:   { type: "bar", x: 90, w: 100, principal: 15, prefix: "", suffix: " checks", label: "5 cards" },
        b10:  { type: "bar", x: 240, w: 100, principal: 55, prefix: "", suffix: " checks", label: "10 cards" },
        b20:  { type: "bar", x: 390, w: 100, principal: 210, prefix: "", suffix: " checks", label: "20 cards" },
        k1:   { type: "box", x: 550, y: 80, w: 220, h: 120, tone: "amber", label: "2× the cards", sub: "about 4× the checks with this algorithm" },
        k2:   { type: "box", x: 550, y: 225, w: 220, h: 130, tone: "green", label: "Count the steps", sub: "to compare algorithms. Smarter ones sort big piles with far fewer checks." }
      },
      steps: [
        { caption: "Computer scientists compare algorithms by counting their steps. Sorting 5 cards this way took 15 checks.",
          do: [{ show: ["axis", "b5"] }] },
        { caption: "10 cards take 55 checks, and 20 cards take 210. Each time the pile doubles, the work grows about four times.",
          do: [{ show: ["b10"] }, { show: ["b20"] }, { show: ["k1"] }] },
        { caption: "For a big pile that's a lot of work. Smarter sorting algorithms need far fewer checks, and finding them is a big part of computer science.",
          do: [{ show: ["k2"] }] }
      ]
    }
  ]
});
