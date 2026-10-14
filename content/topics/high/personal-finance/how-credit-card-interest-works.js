CC.topic({
  id: "how-credit-card-interest-works",
  level: "high",
  section: "personal-finance",
  order: 2,
  title: "How credit card interest works",
  summary: "Why paying the full statement balance costs nothing, and how carrying a balance at 24% APR adds up for years.",
  scenes: [
    {
      title: "Buy now, pay later",
      elements: {
        card:  { type: "art", kind: "fin.card", x: 40, y: 70, label: "Credit card" },
        lap:   { type: "art", kind: "fin.laptop", x: 310, y: 70, label: "Laptop", sub: "$1,000" },
        stmt:  { type: "art", kind: "fin.statement", amount: "$1,000", due: "in 25 days", x: 620, y: 40, label: "Monthly statement" },
        full:  { type: "box", x: 40, y: 290, w: 330, h: 110, tone: "green", label: "Paid in full: $0 interest", sub: "pay the whole statement balance by the due date" },
        grace: { type: "box", x: 410, y: 290, w: 350, h: 110, tone: "sky", label: "Grace period", sub: "the time between the statement and the due date, when new purchases cost no interest" }
      },
      arrows: {
        aBuy:  { from: "card", to: "lap", label: { text: "$1,000 purchase", x: 250, y: 92 } },
        aStmt: { d: "M470,150 C530,150 560,120 612,118" }
      },
      steps: [
        { caption: "You buy a $1,000 laptop with a credit card. The card issuer pays the store right away, and now you owe the issuer $1,000.",
          do: [{ show: ["card", "lap"] }, { show: ["aBuy"] }, { flow: { along: "aBuy", token: "$1,000", tone: "violet" } }] },
        { caption: "Once a month the issuer sends a statement. It shows your balance, a minimum payment, and a due date at least 21 days later.",
          do: [{ show: ["aStmt", "stmt"] }, { pulse: "stmt" }] },
        { caption: "If you pay the full statement balance by the due date, you pay no interest at all. The laptop costs exactly $1,000.",
          do: [{ show: ["full"] }] },
        { caption: "That interest-free window is called the grace period. Most cards lose it while you carry a balance from month to month.",
          do: [{ show: ["grace"] }] }
      ]
    },
    {
      title: "Carrying a balance",
      enter: "fade",
      scale: 0.2,
      base: 380,
      elements: {
        axis: { type: "axis", x1: 50, x2: 410, y: 380 },
        b1:   { type: "bar", x: 90, w: 90, principal: 1000, tone: "violet", tone2: "red", label: "Month 1 statement" },
        b2:   { type: "bar", x: 260, w: 90, principal: 990, tone: "violet", tone2: "red", label: "After paying $30" },
        aprL: { type: "text", x: 450, y: 60, cls: "eqlabel", text: "ANNUAL PERCENTAGE RATE (APR)" },
        apr:  { type: "text", x: 450, y: 96, cls: "eqbig", text: "24% ÷ 12 months = 2% a month" },
        minL: { type: "text", x: 450, y: 170, cls: "eqlabel", text: "MINIMUM PAYMENT (THIS CARD)" },
        m1:   { type: "text", x: 450, y: 204, cls: "eq", text: "Interest: 2% of $1,000 = $20" },
        m2:   { type: "text", x: 450, y: 236, cls: "eq", text: "Plus 1% of the balance = $10" },
        m3:   { type: "text", x: 450, y: 274, cls: "eqbig", text: "Minimum payment = $30" },
        m4:   { type: "text", x: 450, y: 330, cls: "eq", text: "$1,020 − $30 = $990 still owed" },
        note: { type: "text", x: 40, y: 436, cls: "tick", text: "Simplified: interest added once a month. Real cards add it daily, which costs slightly more." }
      },
      steps: [
        { caption: "Pay less than the full balance and you carry a balance, so interest starts. This card's rate is 24% APR, the annual percentage rate. That's 2% a month.",
          do: [{ show: ["axis", "b1"] }, { show: ["aprL", "apr", "note"] }] },
        { caption: "After a month, 2% of $1,000 adds $20 of interest. You now owe $1,020.",
          do: [{ show: ["minL", "m1"] }, { bar: { id: "b1", interest: 20 } }, { pulse: "b1" }] },
        { caption: "The minimum payment on this card is that interest plus 1% of the balance: $20 + $10 = $30.",
          do: [{ show: ["m2", "m3"] }] },
        { caption: "Pay the $30 minimum and $20 of it just covers interest. Only $10 reduces your debt, so you still owe $990.",
          do: [{ show: ["b2"] }, { flow: { from: "b1", to: "b2", token: "−$30", tone: "green" } }, { show: ["m4"] }] }
      ]
    },
    {
      title: "Paying only the minimum",
      enter: "slide",
      scale: 0.2,
      base: 360,
      elements: {
        axis: { type: "axis", x1: 40, x2: 470, y: 360, visible: true },
        y0:   { type: "bar", x: 60,  w: 40, principal: 1000, tone: "violet", label: "Start", visible: true },
        y1:   { type: "bar", x: 118, w: 40, principal: 886, tone: "violet", label: "Yr 1" },
        y2:   { type: "bar", x: 176, w: 40, principal: 782, tone: "violet", label: "Yr 2" },
        y3:   { type: "bar", x: 234, w: 40, principal: 657, tone: "violet", label: "Yr 3" },
        y4:   { type: "bar", x: 292, w: 40, principal: 497, tone: "violet", label: "Yr 4" },
        y5:   { type: "bar", x: 350, w: 40, principal: 295, tone: "violet", label: "Yr 5" },
        y6:   { type: "bar", x: 408, w: 40, principal: 39, tone: "violet", label: "Yr 6" },
        key:  { type: "text", x: 60, y: 60, cls: "legend", swatch: "violet", text: "Balance still owed" },
        mInt: { type: "meter", x: 510, y: 110, w: 250, total: 1000, value: 0, label: "Interest paid so far", tone: "red", format: "${v}" },
        res:  { type: "box", x: 500, y: 170, w: 270, h: 120, tone: "red", label: "6 years, 2 months", sub: "to pay off a $1,000 laptop, paying $1,887 in total" },
        n1:   { type: "text", x: 40, y: 414, cls: "tick", text: "Assumes 24% APR charged as 2% a month and no new purchases." },
        n2:   { type: "text", x: 40, y: 433, cls: "tick", text: "Minimum payment: interest + 1% of the balance, or $25 if that's more." }
      },
      steps: [
        { caption: "Now keep paying only the minimum each month. The balance shrinks slowly, because in the early years most of each payment goes to interest.",
          do: [{ show: ["key", "n1", "n2"] }, { show: ["y1", "y2", "y3", "y4", "y5", "y6"], stagger: 250 }] },
        { caption: "Meanwhile the interest adds up. By the time the debt is gone you've paid $887 in interest.",
          do: [{ show: ["mInt"] }, { meter: { id: "mInt", value: 887, dur: 1800 } }] },
        { caption: "It takes 6 years and 2 months to pay off. The $1,000 laptop ends up costing $1,887, nearly twice its price.",
          do: [{ show: ["res"] }, { pulse: "res" }] }
      ]
    },
    {
      title: "Three ways to pay",
      enter: "fade",
      elements: {
        p1:  { type: "meter", x: 60, y: 110, w: 380, total: 1000, value: 0, label: "Pay the full balance by the due date", tone: "green", format: "${v} interest" },
        p2:  { type: "meter", x: 60, y: 210, w: 380, total: 1000, value: 0, label: "Pay $100 a month", tone: "amber", format: "${v} interest" },
        p3:  { type: "meter", x: 60, y: 310, w: 380, total: 1000, value: 0, label: "Pay only the minimum", tone: "red", format: "${v} interest" },
        t1:  { type: "text", x: 60, y: 146, cls: "sub", text: "done in 1 month · total paid $1,000" },
        t2:  { type: "text", x: 60, y: 246, cls: "sub", text: "done in 12 months · total paid $1,127" },
        t3:  { type: "text", x: 60, y: 346, cls: "sub", text: "done in 74 months · total paid $1,887" },
        key: { type: "box", x: 490, y: 110, w: 280, h: 230, tone: "green", label: "The takeaway", sub: "Interest is charged only on a balance you carry. The faster you pay it down, the less you pay in total, and paying in full each month costs nothing." },
        n:   { type: "text", x: 60, y: 420, cls: "tick", text: "Same $1,000 purchase and assumptions: 24% APR as 2% a month, no new purchases." }
      },
      steps: [
        { caption: "Compare three ways to pay off the same $1,000. Pay the full statement balance by the due date and the interest is $0.",
          do: [{ show: ["p1", "t1", "n"] }] },
        { caption: "Pay a fixed $100 a month and the debt is gone in 12 months, with $127 of interest.",
          do: [{ show: ["p2", "t2"] }, { meter: { id: "p2", value: 127 } }] },
        { caption: "Pay only the minimum and it takes 74 months, with $887 of interest: seven times as much as paying $100 a month.",
          do: [{ show: ["p3", "t3"] }, { meter: { id: "p3", value: 887, dur: 1600 } }] },
        { caption: "Interest only applies to a balance you carry. The faster you pay it down, the less the purchase really costs.",
          do: [{ show: ["key"] }] }
      ]
    }
  ]
});
