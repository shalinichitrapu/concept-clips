CC.topic({
  id: "compound-interest",
  level: "high",
  section: "personal-finance",
  order: 1,
  title: "Compound interest",
  summary: "Why money grows faster the longer you leave it, because the interest starts earning interest too.",
  scenes: [{
    title: "Five years of growth",
    scale: 0.15,
    base: 370,
    elements: {
      axis:   { type: "axis", x1: 80, x2: 760, y: 370 },
      bar0:   { type: "bar", x: 110, w: 70, principal: 1000, label: "Start" },
      bar1:   { type: "bar", x: 220, w: 70, principal: 1000, label: "Year 1" },
      bar2:   { type: "bar", x: 330, w: 70, principal: 1000, label: "Year 2" },
      bar3:   { type: "bar", x: 440, w: 70, principal: 1000, label: "Year 3" },
      bar4:   { type: "bar", x: 550, w: 70, principal: 1000, label: "Year 4" },
      bar5:   { type: "bar", x: 660, w: 70, principal: 1000, label: "Year 5" },
      simple: { type: "trend", points: [[145, 1000], [255, 1100], [365, 1200], [475, 1300], [585, 1400], [695, 1500]] },
      key1:   { type: "text", x: 110, y: 40, cls: "legend", swatch: "teal", text: "Your $1,000" },
      key2:   { type: "text", x: 250, y: 40, cls: "legend", swatch: "amber", text: "Interest earned" },
      key3:   { type: "text", x: 420, y: 40, cls: "legend", swatch: "dash", text: "Simple interest, for comparison" },
      thirty: { type: "text", x: 110, y: 84, cls: "eq", text: "30 years later: $17,449 compound vs. $4,000 simple" }
    },
    steps: [
      { caption: "You deposit $1,000 in an account that pays 10% interest each year.",
        do: [{ show: ["axis", "bar0", "key1"] }] },
      { caption: "After year 1, you earn 10% of $1,000. That's $100.",
        do: [{ show: ["bar1", "key2"] }, { flow: { from: "bar0", to: "bar1", token: "+$100", tone: "amber" } }, { bar: { id: "bar1", interest: 100 } }] },
      { caption: "In year 2 you earn 10% of $1,100, not just of the original $1,000. That's $110, because last year's interest now earns interest too.",
        do: [{ show: ["bar2"] }, { flow: { from: "bar1", to: "bar2", token: "+$110", tone: "amber" } }, { bar: { id: "bar2", interest: 210 } }] },
      { caption: "Each year's interest is bigger than the last: $121, then $133, then $146.",
        do: [
          { show: ["bar3"] }, { flow: { from: "bar2", to: "bar3", token: "+$121", tone: "amber" } }, { bar: { id: "bar3", interest: 331 } },
          { show: ["bar4"] }, { flow: { from: "bar3", to: "bar4", token: "+$133", tone: "amber" } }, { bar: { id: "bar4", interest: 464.1 } },
          { show: ["bar5"] }, { flow: { from: "bar4", to: "bar5", token: "+$146", tone: "amber" } }, { bar: { id: "bar5", interest: 610.51 } }
        ] },
      { caption: "With simple interest you'd earn a flat $100 a year and end at $1,500. Compounding gets you $1,611.",
        do: [{ show: ["simple", "key3"] }] },
      { caption: "The gap keeps widening. After 30 years, simple interest gives you $4,000. Compound interest gives you $17,449.",
        do: [{ show: ["thirty"] }, { pulse: "bar5" }] }
    ]
  }]
});
