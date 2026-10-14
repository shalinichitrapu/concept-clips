CC.topic({
  id: "how-banks-work",
  level: "middle",
  section: "personal-finance",
  order: 2,
  title: "How banks work",
  summary: "Where your money goes when you put it in a bank, how the bank earns money, and why your deposit is safe.",
  scenes: [
    {
      title: "Putting money in",
      elements: {
        you:    { type: "art", kind: "person", tone: "violet", x: 70, y: 70, s: 1.1, label: "You", sub: "deposit $100" },
        o1:     { type: "art", kind: "person", tone: "teal", x: 40, y: 250, s: 1.1 },
        o2:     { type: "art", kind: "person", tone: "teal", x: 100, y: 250, s: 1.1 },
        oL:     { type: "text", x: 92, y: 352, anchor: "middle", cls: "artlbl", text: "Other savers" },
        bank:   { type: "art", kind: "fin.bank", x: 260, y: 120, label: "The bank" },
        total:  { type: "text", x: 375, y: 92, anchor: "middle", cls: "lbl", text: "Deposits: $100" },
        safe:   { type: "art", kind: "fin.safe", x: 600, y: 180, label: "Cash on hand", sub: "$100 kept for withdrawals", lw: 170 },
        trYou:  { type: "track", d: "M125,120 C220,120 300,200 375,250" },
        trO:    { type: "track", d: "M150,290 C230,290 300,270 375,255" }
      },
      arrows: {
        aSafe: { d: "M495,240 C540,240 560,230 594,230" }
      },
      steps: [
        { caption: "Putting money into a bank account is called a deposit. Say you deposit $100 in a savings account.",
          do: [{ show: ["you", "bank", "total"] }, { flow: { along: "trYou", token: "$100", tone: "green" } }, { pulse: "bank" }] },
        { caption: "Lots of other people deposit money too. Together, savers have put $1,000 in this bank.",
          do: [{ show: ["o1", "o2", "oL"] }, { flow: { along: "trO", token: "$900", tone: "green" } }, { text: { id: "total", text: "Deposits: $1,000" } }] },
        { caption: "Your money isn't sitting in a box with your name on it. The bank keeps some cash on hand, say $100, for people who want to take money out.",
          do: [{ show: ["aSafe", "safe"] }, { pulse: "safe" }] }
      ]
    },
    {
      title: "Lending it out",
      enter: "slide",
      elements: {
        savers: { type: "art", kind: "person", tone: "violet", x: 60, y: 140, s: 1.1, label: "Savers", sub: "$1,000 deposited", visible: true },
        bank:   { type: "art", kind: "fin.bank", x: 220, y: 110, s: .9, label: "The bank", visible: true },
        car:    { type: "art", kind: "fin.car", x: 590, y: 50, label: "Car loan" },
        house:  { type: "art", kind: "fin.house", x: 600, y: 215, label: "Home loan" },
        l1:     { type: "text", x: 40, y: 360, cls: "eq", text: "Borrowers pay: 10% of $900 = $90" },
        l2:     { type: "text", x: 40, y: 392, cls: "eq", text: "Savers earn: 2% of $1,000 = $20" },
        l3:     { type: "text", x: 40, y: 430, cls: "eqbig", text: "Left for the bank: $90 − $20 = $70" },
        note:   { type: "text", x: 780, y: 432, anchor: "end", cls: "tick", text: "simplified example rates" },
        trCar:  { type: "track", d: "M590,110 C530,120 480,160 425,175" },
        trHouse:{ type: "track", d: "M600,290 C530,290 480,230 425,215" },
        trSave: { type: "track", d: "M220,205 C180,205 150,200 115,195" }
      },
      arrows: {
        aCar:   { d: "M425,150 C480,110 530,90 584,88", label: { text: "lends", x: 500, y: 92 } },
        aHouse: { d: "M425,195 C490,200 540,240 594,262", label: { text: "lends", x: 520, y: 248 } }
      },
      steps: [
        { caption: "The bank lends most of the rest, $900, to borrowers: people who need money now, for example to buy a car or a home.",
          do: [{ show: ["aCar", "car"] }, { flow: { along: "aCar", token: "$", tone: "green" } }, { show: ["aHouse", "house"] }, { flow: { along: "aHouse", token: "$", tone: "green" } }] },
        { caption: "Borrowers pay the loan back over time, plus interest, an extra charge for borrowing. Say they pay 10% a year. On $900 that's $90.",
          do: [{ all: [{ flow: { along: "trCar", token: "+ interest", tone: "amber" } }, { flow: { along: "trHouse", token: "+ interest", tone: "amber" } }] }, { show: ["l1"] }] },
        { caption: "The bank also pays its savers interest for keeping money there, but at a lower rate. At 2% a year on $1,000, savers earn $20.",
          do: [{ flow: { along: "trSave", token: "+$20", tone: "amber" } }, { show: ["l2"] }] },
        { caption: "The $70 difference pays for the bank's workers, buildings and loans that never get paid back. Whatever is left is the bank's profit.",
          do: [{ show: ["l3", "note"] }, { pulse: "bank" }] }
      ]
    },
    {
      title: "Is my money safe?",
      enter: "fade",
      elements: {
        bank:   { type: "art", kind: "fin.bank", x: 40, y: 120, s: .9, label: "Your bank", visible: true },
        shield: { type: "art", kind: "fin.shield", x: 290, y: 150, s: 1.2, label: "Deposit insurance", sub: "from the FDIC, a U.S. government agency", lw: 190 },
        ins:    { type: "box", x: 480, y: 60, w: 290, h: 130, tone: "green", label: "Insured to $250,000", sub: "for each person at each insured bank. If the bank fails, you get your money back." },
        sum:    { type: "box", x: 480, y: 230, w: 290, h: 150, tone: "amber", label: "How a bank earns money", sub: "It pays savers a low interest rate, lends their money at a higher rate, and keeps the difference." }
      },
      steps: [
        { caption: "What if a bank makes too many bad loans and fails? In the U.S., a government agency called the FDIC insures bank deposits.",
          do: [{ show: ["shield"] }, { pulse: "shield" }] },
        { caption: "Each person's deposits are protected up to $250,000 at each insured bank. If the bank fails, the FDIC makes sure you get that money back.",
          do: [{ show: ["ins"] }] },
        { caption: "So a bank is a go-between. It takes in deposits, lends them out, and earns the gap between the interest it charges and the interest it pays.",
          do: [{ show: ["sum"] }] }
      ]
    }
  ]
});
