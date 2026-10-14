CC.topic({
  id: "how-tax-brackets-work",
  level: "high",
  section: "personal-finance",
  order: 3,
  title: "How tax brackets work",
  summary: "Why each tax rate only applies to the slice of income inside its bracket, and why a raise never shrinks your pay.",
  scenes: [
    {
      title: "A simplified tax table",
      elements: {
        pay:  { type: "art", kind: "fin.paycheck", x: 40, y: 70, label: "Your salary", sub: "$50,000 a year" },
        k1:   { type: "box", x: 340, y: 40, w: 430, h: 74, tone: "green", label: "10%", sub: "on income from $0 to $10,000" },
        k2:   { type: "box", x: 340, y: 126, w: 430, h: 74, tone: "amber", label: "20%", sub: "on income from $10,000 to $40,000" },
        k3:   { type: "box", x: 340, y: 212, w: 430, h: 74, tone: "red", label: "30%", sub: "on income above $40,000" },
        note: { type: "text", x: 770, y: 310, anchor: "end", cls: "tick", text: "simplified brackets for learning, not real IRS rates" },
        marg: { type: "box", x: 40, y: 330, w: 730, h: 84, tone: "violet", label: "Marginal tax rate", sub: "the rate on your next dollar of income. Each rate applies only to the dollars inside its own bracket." }
      },
      steps: [
        { caption: "Income tax is the share of your earnings that goes to the government. Say you earn a salary of $50,000 a year.",
          do: [{ show: ["pay"] }, { pulse: "pay" }] },
        { caption: "Tax rates come in brackets: ranges of income, each with its own rate. This simplified table has three, at 10%, 20% and 30%.",
          do: [{ show: ["k1", "k2", "k3"], stagger: 250 }, { show: ["note"] }] },
        { caption: "Each rate applies only to the dollars inside its own bracket, not to your whole income. That's why they're called marginal tax rates.",
          do: [{ show: ["marg"] }] }
      ]
    },
    {
      title: "Filling the buckets",
      enter: "fade",
      scale: 0.006,
      base: 360,
      elements: {
        pay:  { type: "art", kind: "fin.paycheck", x: 120, y: 20, s: .8 },
        B1:   { type: "art", kind: "fin.bucket10", tone: "green", x: 60, y: 300, layer: "back" },
        B2:   { type: "art", kind: "fin.bucket30", tone: "amber", x: 190, y: 180, layer: "back" },
        B3:   { type: "art", kind: "fin.bucketTop", tone: "red", open: true, x: 320, y: 300, layer: "back" },
        axis: { type: "axis", x1: 40, x2: 440, y: 360 },
        f1:   { type: "bar", x: 66, w: 88, principal: 0, tone: "green", tone2: "green", label: "10%" },
        f2:   { type: "bar", x: 196, w: 88, principal: 0, tone: "amber", tone2: "amber", label: "20%" },
        f3:   { type: "bar", x: 326, w: 88, principal: 0, tone: "red", tone2: "red", label: "30%" },
        r1:   { type: "text", x: 110, y: 404, anchor: "middle", cls: "tick", text: "$0 to $10k" },
        r2:   { type: "text", x: 240, y: 404, anchor: "middle", cls: "tick", text: "$10k to $40k" },
        r3:   { type: "text", x: 370, y: 404, anchor: "middle", cls: "tick", text: "above $40k" },
        hd:   { type: "text", x: 480, y: 80, cls: "eqlabel", text: "TAX ON EACH BUCKET" },
        t1:   { type: "text", x: 480, y: 120, cls: "eq", tone: "green", text: "10% × $10,000 = $1,000" },
        t2:   { type: "text", x: 480, y: 160, cls: "eq", tone: "amber", text: "20% × $30,000 = $6,000" },
        t3:   { type: "text", x: 480, y: 200, cls: "eq", tone: "red", text: "30% × $10,000 = $3,000" },
        tot:  { type: "text", x: 480, y: 256, cls: "eqbig", text: "Total tax = $10,000" },
        totS: { type: "text", x: 480, y: 286, cls: "sub", text: "$1,000 + $6,000 + $3,000" },
        tr1:  { type: "track", d: "M190,90 C170,160 120,220 110,290" },
        tr2:  { type: "track", d: "M200,90 C215,120 235,140 240,170" },
        tr3:  { type: "track", d: "M215,90 C290,140 360,180 370,290" }
      },
      steps: [
        { caption: "Picture each bracket as a bucket that holds a set amount. Your income pours in and fills them in order, starting with the lowest.",
          do: [{ show: ["pay", "axis", "B1", "B2", "B3", "r1", "r2", "r3"] }] },
        { caption: "The first $10,000 fills the 10% bucket. The tax on it is 10% of $10,000, which is $1,000.",
          do: [{ show: ["f1"] }, { flow: { along: "tr1", token: "$10,000", tone: "green" } }, { bar: { id: "f1", interest: 10000 } }, { show: ["hd", "t1"] }] },
        { caption: "The next $30,000, from $10,000 up to $40,000, fills the 20% bucket. 20% of $30,000 is $6,000.",
          do: [{ show: ["f2"] }, { flow: { along: "tr2", token: "$30,000", tone: "amber" } }, { bar: { id: "f2", interest: 30000 } }, { show: ["t2"] }] },
        { caption: "The last $10,000 spills into the top bucket, the only money taxed at 30%. That's $3,000.",
          do: [{ show: ["f3"] }, { flow: { along: "tr3", token: "$10,000", tone: "red" } }, { bar: { id: "f3", interest: 10000 } }, { show: ["t3"] }] },
        { caption: "Add up the buckets: $1,000 + $6,000 + $3,000 = $10,000 of tax on a $50,000 salary.",
          do: [{ show: ["tot", "totS"] }] }
      ]
    },
    {
      title: "Effective rate and a raise",
      enter: "fade",
      scale: 0.006,
      base: 360,
      elements: {
        B1:   { type: "art", kind: "fin.bucket10", tone: "green", x: 60, y: 300, layer: "back", visible: true },
        B2:   { type: "art", kind: "fin.bucket30", tone: "amber", x: 190, y: 180, layer: "back", visible: true },
        B3:   { type: "art", kind: "fin.bucketTop", tone: "red", open: true, x: 320, y: 300, layer: "back", visible: true },
        axis: { type: "axis", x1: 40, x2: 440, y: 360, visible: true },
        f1:   { type: "bar", x: 66, w: 88, principal: 0, interest: 10000, tone: "green", tone2: "green", label: "10%", visible: true },
        f2:   { type: "bar", x: 196, w: 88, principal: 0, interest: 30000, tone: "amber", tone2: "amber", label: "20%", visible: true },
        f3:   { type: "bar", x: 326, w: 88, principal: 0, interest: 10000, tone: "red", tone2: "red", label: "30%", visible: true },
        r1:   { type: "text", x: 110, y: 404, anchor: "middle", cls: "tick", text: "$0 to $10k", visible: true },
        r2:   { type: "text", x: 240, y: 404, anchor: "middle", cls: "tick", text: "$10k to $40k", visible: true },
        r3:   { type: "text", x: 370, y: 404, anchor: "middle", cls: "tick", text: "above $40k", visible: true },
        inc:  { type: "text", x: 40, y: 60, cls: "lbl", text: "Income: $50,000" },
        effL: { type: "text", x: 480, y: 60, cls: "eqlabel", text: "EFFECTIVE TAX RATE AT $50,000" },
        eff:  { type: "text", x: 480, y: 96, cls: "eqbig", text: "$10,000 ÷ $50,000 = 20%" },
        top:  { type: "text", x: 480, y: 126, cls: "sub", text: "even though the top bracket rate is 30%" },
        myth: { type: "box", x: 470, y: 160, w: 300, h: 110, tone: "violet", label: "Myth", sub: "\"A raise into a higher bracket means you take home less.\"" },
        fact: { type: "box", x: 470, y: 285, w: 300, h: 140, tone: "green", label: "Take-home: +$700", sub: "$40,000 − $7,000 tax = $33,000. After the raise: $41,000 − $7,300 = $33,700." }
      },
      steps: [
        { caption: "Your effective tax rate is your total tax divided by your income: $10,000 ÷ $50,000 = 20%. It's below the 30% top rate because most dollars were taxed at lower rates.",
          do: [{ show: ["inc"] }, { show: ["effL", "eff", "top"] }] },
        { caption: "A common myth says a raise into a higher bracket can shrink your take-home pay. Test it. Suppose you earn $40,000, so the top bucket is empty.",
          do: [{ show: ["myth"] }, { text: { id: "inc", text: "Income: $40,000" } }, { bar: { id: "f3", interest: 0 } }] },
        { caption: "Now you get a $1,000 raise to $41,000. Only that new $1,000 lands in the 30% bucket, so your tax rises by $300, from $7,000 to $7,300.",
          do: [{ text: { id: "inc", text: "Income: $41,000" } }, { bar: { id: "f3", interest: 1000 } }, { pulse: "B3" }] },
        { caption: "You keep the other $700, so the raise always leaves you with more. Real U.S. federal brackets work the same way, just with seven rates instead of three.",
          do: [{ show: ["fact"] }] }
      ]
    }
  ]
});
