CC.topic({
  id: "how-a-case-reaches-the-supreme-court",
  level: "high",
  section: "civics",
  order: 3,
  title: "How a case reaches the Supreme Court",
  summary: "From a trial court to the nation's highest court: appeals, petitions for cert, the rule of four and the final opinion.",
  scenes: [
    {
      title: "Up the court ladder",
      elements: {
        trial:  { type: "art", kind: "civics.courthouse", tone: "grey", x: 30, y: 262, s: 0.9, label: "Trial court", sub: "U.S. District Court" },
        p1:     { type: "art", kind: "person", tone: "violet", x: 186, y: 318, s: 0.8 },
        p2:     { type: "art", kind: "person", tone: "teal", x: 222, y: 318, s: 0.8, flip: true },
        pL:     { type: "text", x: 218, y: 400, anchor: "middle", cls: "sub", text: "two sides" },
        app:    { type: "art", kind: "civics.courthouse", tone: "sky", x: 300, y: 160, s: 0.9, label: "Court of Appeals", sub: "usually a panel of 3 judges", lw: 200 },
        sc:     { type: "art", kind: "civics.supremeCourt", x: 585, y: 40, s: 0.75, label: "Supreme Court", sub: "9 justices" },
        state:  { type: "art", kind: "civics.courthouse", tone: "amber", x: 80, y: 40, s: 0.6, label: "State courts", sub: "after the state's highest court", lw: 220 },
        note:   { type: "text", x: 780, y: 432, anchor: "end", cls: "tick", text: "simplified diagram" }
      },
      arrows: {
        appeal: { d: "M110,256 C110,212 200,214 292,214", label: { text: "appeal", x: 168, y: 202 } },
        cert:   { d: "M420,156 C440,118 500,112 578,112", label: { text: "petition for cert", x: 462, y: 106 } },
        fromSt: { d: "M180,72 C330,60 450,60 578,78", dashed: true }
      },
      steps: [
        { caption: "Most federal cases start in a trial court, called a district court. Each side presents evidence and witnesses, and a judge or jury decides the outcome.",
          do: [{ show: ["trial"] }, { show: ["p1", "p2", "pL"] }] },
        { caption: "The losing side can appeal to a U.S. Court of Appeals. There's no jury and no new evidence: usually three judges check whether the law was applied correctly.",
          do: [{ show: ["appeal"] }, { flow: { along: "appeal", icon: "doc", tone: "sky" } }, { show: ["app"] }] },
        { caption: "The side that loses again can ask the Supreme Court to hear the case. That request is a petition for a writ of certiorari, or \"cert\" for short.",
          do: [{ show: ["cert"] }, { flow: { along: "cert", icon: "doc", tone: "amber" } }, { show: ["sc"] }] },
        { caption: "Cases from state courts can get there too, once the state's highest court has ruled, if they raise a question about federal law or the Constitution.",
          do: [{ show: ["state"] }, { show: ["fromSt"] }, { show: ["note"] }] }
      ]
    },
    {
      title: "Choosing which cases to hear",
      enter: "zoom",
      zoomInto: [675, 100],
      elements: {
        pile: { type: "art", kind: "civics.docStack", x: 40, y: 50, s: 1.2, label: "Thousands of petitions", sub: "arrive every year", lw: 200 },
        j0: { type: "art", kind: "person", tone: "grey", x: 300, y: 80 },
        j1: { type: "art", kind: "person", tone: "grey", x: 352, y: 80 },
        j2: { type: "art", kind: "person", tone: "grey", x: 404, y: 80 },
        j3: { type: "art", kind: "person", tone: "grey", x: 456, y: 80 },
        j4: { type: "art", kind: "person", tone: "grey", x: 508, y: 80 },
        j5: { type: "art", kind: "person", tone: "grey", x: 560, y: 80 },
        j6: { type: "art", kind: "person", tone: "grey", x: 612, y: 80 },
        j7: { type: "art", kind: "person", tone: "grey", x: 664, y: 80 },
        j8: { type: "art", kind: "person", tone: "grey", x: 716, y: 80 },
        g0: { type: "art", kind: "person", tone: "green", x: 300, y: 80 },
        g1: { type: "art", kind: "person", tone: "green", x: 352, y: 80 },
        g2: { type: "art", kind: "person", tone: "green", x: 404, y: 80 },
        g3: { type: "art", kind: "person", tone: "green", x: 456, y: 80 },
        jL:   { type: "text", x: 528, y: 182, anchor: "middle", cls: "artlbl", text: "The nine justices" },
        gL:   { type: "text", x: 398, y: 210, anchor: "middle", cls: "seg-label", tone: "green", text: "4 say yes: case accepted" },
        rule: { type: "box", x: 300, y: 296, w: 470, h: 110, tone: "green", label: "The rule of four", sub: "If at least four of the nine justices vote to hear a case, the Court grants cert and takes it." },
        few:  { type: "box", x: 30, y: 296, w: 240, h: 110, tone: "amber", label: "About 60 to 70", sub: "cases are argued each year" }
      },
      steps: [
        { caption: "The Supreme Court gets thousands of these petitions every year. It doesn't have to hear a case just because someone asks.",
          do: [{ show: ["pile"] }, { pulse: "pile" }] },
        { caption: "The nine justices review the petitions. If at least four of them vote to hear a case, the Court takes it. This is called the rule of four.",
          do: [{ show: ["j0", "j1", "j2", "j3", "j4", "j5", "j6", "j7", "j8", "jL"], stagger: 60 }, { show: ["g0", "g1", "g2", "g3"], stagger: 200 }, { show: ["gL", "rule"] }] },
        { caption: "Only about 60 to 70 cases a year make it. For every petition that is turned down, the lower court's decision stands.",
          do: [{ show: ["few"] }, { pulse: "few" }] }
      ]
    },
    {
      title: "Briefs and oral argument",
      enter: "fade",
      elements: {
        room: { type: "art", kind: "civics.courtroom", x: 30, y: 110, label: "The courtroom", sub: "justices at the bench, a lawyer at the lectern", lw: 360 },
        bA:   { type: "art", kind: "doc", title: "BRIEF", x: 478, y: 56, label: "Side A" },
        bB:   { type: "art", kind: "doc", title: "BRIEF", x: 588, y: 56, label: "Side B" },
        bF:   { type: "art", kind: "doc", title: "BRIEF", x: 698, y: 56, label: "Friends", sub: "of the court", lw: 120 },
        arg:  { type: "box", x: 478, y: 250, w: 292, h: 110, tone: "sky", label: "Oral argument", sub: "about 30 minutes per side, with many questions from the justices" },
        trA:  { type: "track", d: "M512,150 C500,200 440,200 400,190" },
        trB:  { type: "track", d: "M622,150 C600,220 460,210 400,190" }
      },
      steps: [
        { caption: "Once a case is accepted, each side files a written brief laying out its legal arguments. Outside groups can file \"friend of the court\" briefs too.",
          do: [{ show: ["room"] }, { show: ["bA", "bB", "bF"], stagger: 200 }, { all: [{ flow: { along: "trA", icon: "doc", tone: "violet" } }, { flow: { along: "trB", icon: "doc", tone: "teal" } }] }] },
        { caption: "Then comes oral argument. Each side's lawyer usually gets about 30 minutes, and the justices interrupt with pointed questions.",
          do: [{ show: ["arg"] }, { pulse: "room" }] }
      ]
    },
    {
      title: "The decision",
      enter: "fade",
      elements: {
        sc:    { type: "art", kind: "civics.supremeCourt", x: 292, y: 24, s: 0.9 },
        vote:  { type: "meter", x: 560, y: 60, w: 210, total: 9, need: 5, needLabel: "majority: 5", label: "Justices' vote", format: "{v} of 9 agree", tone: "green" },
        maj:   { type: "box", x: 30, y: 40, w: 240, h: 130, tone: "green", label: "Majority opinion", sub: "explains the decision and the legal reasoning behind it" },
        dis:   { type: "box", x: 560, y: 116, w: 210, h: 96, tone: "grey", label: "Dissent", sub: "justices who disagree can explain why" },
        lowA:  { type: "art", kind: "civics.courthouse", tone: "sky", x: 180, y: 300, s: 0.7, label: "Courts of appeals" },
        lowT:  { type: "art", kind: "civics.courthouse", tone: "grey", x: 508, y: 300, s: 0.7, label: "Trial courts" }
      },
      arrows: {
        pA: { d: "M360,192 C330,240 270,250 240,292", label: { text: "must follow", x: 232, y: 250 } },
        pT: { d: "M440,192 C470,240 530,250 562,292", label: { text: "must follow", x: 568, y: 250 } }
      },
      steps: [
        { caption: "After argument, the justices meet in private and vote. A majority decides the case: five of nine if all nine take part.",
          do: [{ show: ["sc"] }, { show: ["vote"] }, { meter: { id: "vote", value: 6 } }] },
        { caption: "One justice in the majority writes the majority opinion, which explains the ruling. Justices who disagree can write a dissent.",
          do: [{ show: ["maj"] }, { show: ["dis"] }] },
        { caption: "The ruling becomes precedent: courts across the country must follow it when they decide similar cases. That's why one case can change the law for everyone.",
          do: [{ show: ["lowA", "lowT"] }, { show: ["pA", "pT"] }, { all: [{ flow: { along: "pA", icon: "doc", tone: "green" } }, { flow: { along: "pT", icon: "doc", tone: "green" } }] }] }
      ]
    }
  ]
});
