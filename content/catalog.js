// The levels and sections students browse. Topics live in content/topics/<level>/<section>/.
CC.catalog = {
  levels: [
    { id: "middle", name: "Middle school", ages: "Ages 11 to 14" },
    { id: "high", name: "High school", ages: "Ages 14 to 18" }
  ],
  sections: [
    { id: "math", name: "Math", icon: "icon.math",
      blurb: { middle: "Fractions, shapes and the patterns behind them.", high: "Distance, slope and the functions behind graphs." } },
    { id: "biology", name: "Biology", icon: "icon.biology",
      blurb: { middle: "Cells, bodies and how living things get energy.", high: "What happens inside cells, from DNA to energy." } },
    { id: "physics-chemistry", name: "Physics & Chemistry", icon: "icon.physics-chemistry",
      blurb: { middle: "Matter, forces and electricity you can see.", high: "Forces, waves and how atoms hold together." } },
    { id: "earth-science", name: "Earth Science", icon: "icon.earth-science",
      blurb: { middle: "Water, rocks and why the seasons change.", high: "The forces and cycles that shape the planet." } },
    { id: "computer-science", name: "Computer Science", icon: "icon.computer-science",
      blurb: { middle: "How computers store data and send messages.", high: "How the internet, searching and security work." } },
    { id: "history", name: "History", icon: "icon.history",
      blurb: { middle: "Trade, inventions and how ideas spread.", high: "Causes and consequences that shaped the modern world." } },
    { id: "civics", name: "Civics", icon: "icon.civics",
      blurb: { middle: "How the U.S. government makes decisions.", high: "Checks, balances and how power is shared." } },
    { id: "personal-finance", name: "Personal Finance", icon: "icon.personal-finance",
      blurb: { middle: "Budgets, saving and what banks do.", high: "Interest, credit and how taxes work." } }
  ]
};
