CC.topic({
  id: "checks-and-balances",
  level: "high",
  section: "civics",
  order: 1,
  title: "Checks and balances",
  summary: "How each branch of the U.S. government can limit the other two, so no branch holds unchecked power.",
  scenes: [
    {
      title: "Each branch checks the others",
      elements: {
        leg:  { type: "art", kind: "civics.capitolMini", x: 300, y: 64, labelAbove: true, label: "Legislative: Congress", sub: "House and Senate", lw: 220 },
        exe:  { type: "art", kind: "civics.whiteHouse", x: 30, y: 280, s: 0.6, label: "Executive", sub: "the President" },
        jud:  { type: "art", kind: "civics.supremeCourt", x: 590, y: 260, s: 0.75, label: "Judicial", sub: "the federal courts" },
        lVeto:  { type: "text", x: 246, y: 262, cls: "callout", text: "vetoes bills" },
        lOver:  { type: "text", x: 168, y: 140, anchor: "end", cls: "callout", text: "overrides vetoes" },
        lImpL:  { type: "text", x: 168, y: 160, anchor: "end", cls: "callout", text: "impeaches, removes" },
        lNom:   { type: "text", x: 400, y: 312, anchor: "middle", cls: "callout", text: "nominates judges" },
        lConf:  { type: "text", x: 632, y: 140, cls: "callout", text: "confirms judges" },
        lImpR:  { type: "text", x: 632, y: 160, cls: "callout", text: "impeaches, removes" },
        lLaws:  { type: "text", x: 554, y: 262, anchor: "end", cls: "callout", text: "strikes down laws" },
        lActs:  { type: "text", x: 400, y: 416, anchor: "middle", cls: "callout", text: "strikes down actions" }
      },
      arrows: {
        veto: { d: "M190,312 C235,250 275,205 312,180" },
        over: { d: "M296,140 C200,125 110,200 72,306" },
        nom:  { d: "M206,345 C330,318 470,318 604,345" },
        conf: { d: "M504,140 C600,125 690,200 724,280" },
        laws: { d: "M612,292 C565,250 525,205 490,180" },
        acts: { d: "M604,372 C470,400 330,400 206,372" }
      },
      steps: [
        { caption: "The Constitution splits power among three branches. Congress makes laws, the President enforces them, and the courts interpret them. This is the separation of powers.",
          do: [{ show: ["leg", "exe", "jud"], stagger: 250 }] },
        { caption: "Each branch can also limit the others. First check: the President can veto a bill passed by Congress, which stops it from becoming law.",
          do: [{ show: ["veto"] }, { flow: { along: "veto", icon: "doc", tone: "red" } }, { show: ["lVeto"] }] },
        { caption: "Congress can override a veto if two-thirds of the House and two-thirds of the Senate vote to pass the bill again. The bill then becomes law anyway.",
          do: [{ show: ["over"] }, { flow: { along: "over", icon: "doc", tone: "green" } }, { show: ["lOver"] }] },
        { caption: "The President nominates Supreme Court justices and other federal judges. Once appointed, these judges can serve for life.",
          do: [{ show: ["nom"] }, { flow: { along: "nom", art: "person", s: 0.45, tone: "violet" } }, { show: ["lNom"] }] },
        { caption: "But a nominee only becomes a judge if the Senate confirms them, by a majority vote.",
          do: [{ show: ["conf"] }, { flow: { along: "conf", token: "Senate: yes", tone: "green" } }, { show: ["lConf"] }] },
        { caption: "Congress can also remove officials, including the President and judges. The House impeaches (formally charges) by majority vote. The Senate holds a trial, and removal takes two-thirds.",
          do: [{ show: ["lImpL", "lImpR"] }, { pulse: "leg" }] },
        { caption: "The courts can rule that a law, or an action of the executive branch, violates the Constitution. That cancels it. This power is called judicial review.",
          do: [{ show: ["laws", "acts"] }, { show: ["lLaws", "lActs"] }] }
      ]
    },
    {
      title: "Judicial review",
      enter: "zoom",
      zoomInto: [680, 330],
      elements: {
        sc:     { type: "art", kind: "civics.supremeCourt", x: 30, y: 70, s: 1.3, label: "The Supreme Court", sub: "Washington, D.C." },
        case:   { type: "box", x: 400, y: 40, w: 370, h: 120, tone: "amber", label: "Marbury v. Madison, 1803", sub: "The Court ruled that part of a law Congress had passed conflicted with the Constitution, so it could not be enforced." },
        law:    { type: "art", kind: "civics.law", x: 425, y: 215, label: "A law", sub: "passed by Congress", lw: 140 },
        struck: { type: "art", kind: "civics.struckLaw", x: 620, y: 205, label: "Unconstitutional", sub: "courts won't enforce it", lw: 170 }
      },
      arrows: {
        rule: { from: "law", to: "struck", label: { text: "court rules", x: 572, y: 252 } }
      },
      steps: [
        { caption: "The Constitution doesn't spell out judicial review. The Supreme Court established it in the case Marbury v. Madison in 1803.",
          do: [{ show: ["sc"] }, { show: ["case"] }] },
        { caption: "Chief Justice John Marshall reasoned that the Constitution is the supreme law, so a law that conflicts with it is void. Courts have struck down laws on that basis ever since.",
          do: [{ show: ["law"] }, { show: ["rule"] }, { flow: { along: "rule", icon: "doc", tone: "red" } }, { show: ["struck"] }, { pulse: "struck" }] }
      ]
    },
    {
      title: "A balanced system",
      enter: "fade",
      elements: {
        leg:  { type: "art", kind: "civics.capitolMini", x: 300, y: 64, labelAbove: true, label: "Legislative: Congress", sub: "House and Senate", lw: 220, visible: true },
        exe:  { type: "art", kind: "civics.whiteHouse", x: 30, y: 280, s: 0.6, label: "Executive", sub: "the President", visible: true },
        jud:  { type: "art", kind: "civics.supremeCourt", x: 590, y: 260, s: 0.75, label: "Judicial", sub: "the federal courts", visible: true },
        lVeto:  { type: "text", x: 246, y: 262, cls: "callout", text: "vetoes bills" },
        lOver:  { type: "text", x: 168, y: 140, anchor: "end", cls: "callout", text: "overrides vetoes" },
        lImpL:  { type: "text", x: 168, y: 160, anchor: "end", cls: "callout", text: "impeaches, removes" },
        lNom:   { type: "text", x: 400, y: 312, anchor: "middle", cls: "callout", text: "nominates judges" },
        lConf:  { type: "text", x: 632, y: 140, cls: "callout", text: "confirms judges" },
        lImpR:  { type: "text", x: 632, y: 160, cls: "callout", text: "impeaches, removes" },
        lLaws:  { type: "text", x: 554, y: 262, anchor: "end", cls: "callout", text: "strikes down laws" },
        lActs:  { type: "text", x: 400, y: 416, anchor: "middle", cls: "callout", text: "strikes down actions" }
      },
      arrows: {
        veto: { d: "M190,312 C235,250 275,205 312,180" },
        over: { d: "M296,140 C200,125 110,200 72,306" },
        nom:  { d: "M206,345 C330,318 470,318 604,345" },
        conf: { d: "M504,140 C600,125 690,200 724,280" },
        laws: { d: "M612,292 C565,250 525,205 490,180" },
        acts: { d: "M604,372 C470,400 330,400 206,372" }
      },
      steps: [
        { caption: "Put it all together and every branch has a check on each of the other two.",
          do: [{ all: [{ show: ["veto", "over", "nom", "conf", "laws", "acts"] }, { show: ["lVeto", "lOver", "lImpL", "lNom", "lConf", "lImpR", "lLaws", "lActs"] }] }] },
        { caption: "Big decisions need more than one branch to agree. That makes government slower, but it keeps any one branch from holding unchecked power.",
          do: [{ pulse: "leg" }, { pulse: "exe" }, { pulse: "jud" }] }
      ]
    }
  ]
});
