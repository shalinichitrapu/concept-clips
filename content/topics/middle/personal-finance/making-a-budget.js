CC.topic({
  id: "making-a-budget",
  level: "middle",
  section: "personal-finance",
  order: 1,
  title: "Making a budget",
  summary: "How to plan a month's money: count what comes in, give every dollar a job, and track what you spend.",
  scenes: [
    {
      title: "Money coming in",
      elements: {
        cash:   { type: "art", kind: "fin.cash", x: 60, y: 60, label: "Allowance", sub: "$120 a month" },
        broom:  { type: "art", kind: "fin.broom", x: 85, y: 230, label: "Chores", sub: "$80 a month" },
        wallet: { type: "art", kind: "fin.wallet", x: 290, y: 150, s: 1.3, label: "Your wallet", sub: "$200 a month" },
        income: { type: "box", x: 520, y: 160, w: 250, h: 110, tone: "amber", label: "Income: $200", sub: "all the money that comes in each month" },
        trCash: { type: "track", d: "M185,100 C250,100 300,150 360,190" },
        trChore:{ type: "track", d: "M160,300 C230,300 300,260 360,230" }
      },
      steps: [
        { caption: "Every month, some money comes in. Say your family gives you $120 of allowance.",
          do: [{ show: ["wallet"] }, { show: ["cash"] }, { flow: { along: "trCash", token: "$120", tone: "green" } }] },
        { caption: "You also earn $80 doing chores, like sweeping or mowing a neighbor's lawn.",
          do: [{ show: ["broom"] }, { flow: { along: "trChore", token: "$80", tone: "green" } }] },
        { caption: "Together that's $200 a month. All the money that comes in is your income. A budget is a plan for what to do with it.",
          do: [{ show: ["income"] }, { pulse: "wallet" }] }
      ]
    },
    {
      title: "Needs and wants",
      enter: "fade",
      elements: {
        lunch: { type: "art", kind: "fin.lunch", x: 70, y: 80, label: "School lunch", sub: "$60 a month" },
        bus:   { type: "art", kind: "fin.bus", x: 210, y: 92, label: "Bus pass", sub: "$40 a month" },
        game:  { type: "art", kind: "fin.gamepad", x: 460, y: 95, label: "Video games" },
        tix:   { type: "art", kind: "fin.ticket", x: 620, y: 100, label: "Concerts" },
        needs: { type: "box", x: 40, y: 290, w: 340, h: 100, tone: "green", label: "Needs", sub: "things you must pay for, like food and getting to school" },
        wants: { type: "box", x: 420, y: 290, w: 340, h: 100, tone: "violet", label: "Wants", sub: "things that are nice to have but you could live without" }
      },
      steps: [
        { caption: "Before you plan, sort what you spend money on. Needs are things you must have, like lunch and the bus to school.",
          do: [{ show: ["lunch", "bus"], stagger: 200 }, { show: ["needs"] }] },
        { caption: "Wants are things you enjoy but could live without, like a new game or a concert. Needs come first in a budget.",
          do: [{ show: ["game", "tix"], stagger: 200 }, { show: ["wants"] }] }
      ]
    },
    {
      title: "Give every dollar a job",
      enter: "slide",
      elements: {
        wallet: { type: "art", kind: "fin.wallet", x: 40, y: 170, label: "Income", sub: "$200", visible: true },
        jN:     { type: "art", kind: "fin.jar", text: "NEEDS", tone: "green", x: 270, y: 130, s: 1.1, label: "Needs" },
        jW:     { type: "art", kind: "fin.jar", text: "WANTS", tone: "violet", x: 430, y: 130, s: 1.1, label: "Wants" },
        jS:     { type: "art", kind: "fin.jar", text: "SAVE", tone: "amber", x: 590, y: 130, s: 1.1, label: "Savings" },
        cN:     { type: "art", kind: "fin.jarCoins", coins: 3, x: 270, y: 209.2, s: 1.1 },
        cW:     { type: "art", kind: "fin.jarCoins", coins: 2, x: 430, y: 209.2, s: 1.1 },
        cS:     { type: "art", kind: "fin.jarCoins", coins: 1, x: 590, y: 209.2, s: 1.1 },
        aN:     { type: "text", x: 323, y: 305, anchor: "middle", cls: "sub", text: "50% = $100" },
        aW:     { type: "text", x: 483, y: 305, anchor: "middle", cls: "sub", text: "30% = $60" },
        aS:     { type: "text", x: 643, y: 305, anchor: "middle", cls: "sub", text: "20% = $40" },
        rule:   { type: "text", x: 483, y: 380, anchor: "middle", cls: "eq", text: "$100 + $60 + $40 = $200" },
        ruleL:  { type: "text", x: 483, y: 350, anchor: "middle", cls: "eqlabel", text: "THE 50/30/20 SPLIT" },
        trN:    { type: "track", d: "M150,190 C200,110 270,100 323,165" },
        trW:    { type: "track", d: "M150,190 C220,70 420,60 483,165" },
        trS:    { type: "track", d: "M150,190 C240,40 580,40 643,165" }
      },
      steps: [
        { caption: "A budget splits your income into jars, one for each job your money has to do.",
          do: [{ show: ["jN", "jW", "jS"], stagger: 200 }] },
        { caption: "Needs come first. Half your income, $100, goes in the needs jar for lunch and the bus pass.",
          do: [{ flow: { along: "trN", art: "coin", s: .6, count: 3, gap: 200 } }, { show: ["cN", "aN"] }] },
        { caption: "Next, 30% for wants. That's $60 for games, movies or concerts.",
          do: [{ flow: { along: "trW", art: "coin", s: .6, count: 2, gap: 200 } }, { show: ["cW", "aW"] }] },
        { caption: "The last 20%, $40, goes into savings for something bigger later or for surprises.",
          do: [{ flow: { along: "trS", art: "coin", s: .6, count: 1 } }, { show: ["cS", "aS"] }] },
        { caption: "Now every dollar has a job, and the jars add up to exactly your income. This 50/30/20 split is one common plan, and you can pick your own.",
          do: [{ show: ["ruleL", "rule"] }] }
      ]
    },
    {
      title: "Tracking your spending",
      enter: "slide",
      elements: {
        jW:    { type: "art", kind: "fin.jar", text: "WANTS", tone: "violet", coins: 2, x: 50, y: 70, label: "Wants jar", sub: "$60 planned", visible: true },
        m:     { type: "meter", x: 220, y: 100, w: 520, total: 100, need: 60, needLabel: "plan: $60", label: "Spent on wants this month", tone: "violet", format: "${v}" },
        p1:    { type: "text", x: 220, y: 180, cls: "legend", swatch: "violet", text: "Movie: $15" },
        p2:    { type: "text", x: 220, y: 210, cls: "legend", swatch: "violet", text: "Snacks: $10" },
        p3:    { type: "text", x: 220, y: 240, cls: "legend", swatch: "violet", text: "Video game: $35" },
        p4:    { type: "text", x: 220, y: 270, cls: "legend", swatch: "red", text: "Concert ticket: $20" },
        over:  { type: "box", x: 470, y: 165, w: 280, h: 86, tone: "red", label: "$20 over the plan", sub: "spent $80 from a $60 jar" },
        jS:    { type: "art", kind: "fin.jar", text: "SAVE", tone: "amber", coins: 1, x: 572, y: 290, s: .75, label: "Savings" },
        trS:   { type: "track", d: "M572,330 C520,330 500,300 520,258" },
        rule:  { type: "box", x: 40, y: 310, w: 440, h: 100, tone: "green", label: "Spending ≤ income", sub: "Plan it, track it, and adjust next month if you went over." }
      },
      steps: [
        { caption: "A plan only works if you track it. Write down each thing you buy. A movie is $15 and snacks are $10.",
          do: [{ show: ["m"] }, { show: ["p1", "p2"], stagger: 200 }, { meter: { id: "m", value: 25 } }] },
        { caption: "A video game costs $35. Now you've spent $60, exactly what you planned for wants.",
          do: [{ show: ["p3"] }, { meter: { id: "m", value: 60 } }] },
        { caption: "Then you buy a $20 concert ticket. Your spending is now more than your plan.",
          do: [{ show: ["p4"] }, { meter: { id: "m", value: 80 } }, { show: ["over"] }] },
        { caption: "That extra $20 has to come from somewhere, like your savings jar. Spend more than you earn month after month, and you run out or end up borrowing.",
          do: [{ show: ["jS"] }, { flow: { along: "trS", token: "−$20", tone: "red" } }, { pulse: "over" }] },
        { caption: "So a budget is a plan you keep checking: money in, a job for every dollar, and spending that stays at or below your income.",
          do: [{ show: ["rule"] }] }
      ]
    }
  ]
});
