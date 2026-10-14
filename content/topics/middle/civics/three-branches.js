CC.topic({
  id: "three-branches",
  level: "middle",
  section: "civics",
  order: 1,
  title: "The three branches of government",
  summary: "How the Constitution splits the U.S. government's power into three branches, each with its own job.",
  scenes: [
    {
      title: "One plan, three branches",
      elements: {
        con:   { type: "art", kind: "civics.constitution", x: 320, y: 16 },
        conL:  { type: "text", x: 496, y: 60, cls: "artlbl", text: "The Constitution" },
        conS:  { type: "text", x: 496, y: 80, cls: "sub", text: "the plan for the government, 1787" },
        leg:   { type: "art", kind: "civics.capitolMini", x: 40, y: 190, label: "Legislative branch", sub: "Congress" },
        exe:   { type: "art", kind: "civics.whiteHouse", x: 307, y: 188, s: 0.62, label: "Executive branch", sub: "the President" },
        jud:   { type: "art", kind: "civics.supremeCourt", x: 576, y: 181, s: 0.7, label: "Judicial branch", sub: "the courts" }
      },
      arrows: {
        a1: { d: "M370,128 C330,172 170,150 140,182" },
        a2: { d: "M400,128 L400,180" },
        a3: { d: "M430,128 C470,172 630,150 660,174" }
      },
      steps: [
        { caption: "The U.S. Constitution, written in 1787, is the plan for how the national government works.",
          do: [{ show: ["con", "conL", "conS"] }, { pulse: "con" }] },
        { caption: "It splits the government's power into three parts, called branches. Each branch has its own building and its own job.",
          do: [{ show: ["a1", "leg", "a2", "exe", "a3", "jud"], stagger: 250 }] }
      ]
    },
    {
      title: "Legislative: makes laws",
      enter: "zoom",
      zoomInto: [140, 245],
      elements: {
        cap:  { type: "art", kind: "civics.capitolMini", x: 40, y: 70, s: 1.75, label: "The U.S. Capitol", sub: "where Congress meets" },
        card: { type: "box", x: 470, y: 60, w: 300, h: 110, tone: "teal", label: "Legislative branch", sub: "Congress: the House (435 members) and the Senate (100 senators)" },
        bill: { type: "art", kind: "civics.bill", x: 490, y: 215, label: "Bill", sub: "a proposed law", lw: 100 },
        law:  { type: "art", kind: "civics.law", x: 665, y: 205, label: "Law", sub: "pays for new highways", lw: 120 }
      },
      arrows: {
        pass: { from: "bill", to: "law", label: { text: "passes", x: 612, y: 248 } }
      },
      steps: [
        { caption: "The legislative branch is Congress. It meets in the U.S. Capitol and has two parts: the House of Representatives and the Senate.",
          do: [{ show: ["cap"] }, { show: ["card"] }] },
        { caption: "Congress makes the laws. For example, its members might write a bill to pay for new highways. If both parts vote for it and the President signs, it becomes law.",
          do: [{ show: ["bill"] }, { show: ["pass"] }, { flow: { along: "pass", icon: "doc", tone: "teal" } }, { show: ["law"] }] }
      ]
    },
    {
      title: "Executive: carries out laws",
      enter: "slide",
      elements: {
        wh:   { type: "art", kind: "civics.whiteHouse", x: 40, y: 72, s: 1.1, label: "The White House", sub: "where the President lives and works" },
        card: { type: "box", x: 470, y: 60, w: 300, h: 110, tone: "violet", label: "Executive branch", sub: "led by the President, with the Vice President and many departments" },
        law:  { type: "art", kind: "civics.law", x: 470, y: 205, label: "Highway law" },
        road: { type: "art", kind: "civics.highway", x: 636, y: 220, s: 0.8, label: "New highways", sub: "built by the states", lw: 140 }
      },
      arrows: {
        act: { from: "law", to: "road", label: { text: "carries out", x: 598, y: 244 } }
      },
      steps: [
        { caption: "The executive branch carries out the laws. The President leads it from the White House, with help from the Vice President and many departments.",
          do: [{ show: ["wh"] }, { show: ["card"] }] },
        { caption: "Example: once the highway law passes, the Department of Transportation, part of the executive branch, sends the money to the states to build the roads.",
          do: [{ show: ["law"] }, { show: ["act"] }, { flow: { along: "act", art: "coin", s: 0.6 } }, { show: ["road"] }] }
      ]
    },
    {
      title: "Judicial: decides what laws mean",
      enter: "slide",
      elements: {
        sc:    { type: "art", kind: "civics.supremeCourt", x: 40, y: 56, s: 1.4, label: "The Supreme Court", sub: "the highest court in the country" },
        card:  { type: "box", x: 470, y: 60, w: 300, h: 110, tone: "amber", label: "Judicial branch", sub: "the Supreme Court, with 9 justices, and the other federal courts" },
        p1:    { type: "art", kind: "person", tone: "violet", x: 486, y: 214 },
        p2:    { type: "art", kind: "person", tone: "teal", x: 540, y: 214, flip: true },
        pL:    { type: "text", x: 533, y: 308, anchor: "middle", cls: "artlbl", text: "Two sides disagree" },
        pS:    { type: "text", x: 533, y: 327, anchor: "middle", cls: "sub", text: "about the highway law" },
        gav:   { type: "art", kind: "civics.gavel", x: 668, y: 214, label: "A court decides", sub: "what the law means", lw: 130 }
      },
      arrows: {
        go: { d: "M592,250 L660,250" }
      },
      steps: [
        { caption: "The judicial branch decides what laws mean. At the top is the Supreme Court, where nine judges, called justices, hear cases.",
          do: [{ show: ["sc"] }, { show: ["card"] }] },
        { caption: "Example: a state and the Department of Transportation disagree about how the highway money may be spent. A court hears both sides and decides what the law means.",
          do: [{ show: ["p1", "p2", "pL", "pS"] }, { show: ["go"] }, { show: ["gav"] }, { pulse: "gav" }] }
      ]
    },
    {
      title: "Three branches, three jobs",
      enter: "fade",
      elements: {
        con:   { type: "art", kind: "civics.constitution", x: 320, y: 16, visible: true },
        conL:  { type: "text", x: 496, y: 60, cls: "artlbl", text: "The Constitution", visible: true },
        conS:  { type: "text", x: 496, y: 80, cls: "sub", text: "the plan for the government, 1787", visible: true },
        leg:   { type: "art", kind: "civics.capitolMini", x: 40, y: 190, label: "Legislative branch", sub: "Congress", visible: true },
        exe:   { type: "art", kind: "civics.whiteHouse", x: 307, y: 188, s: 0.62, label: "Executive branch", sub: "the President", visible: true },
        jud:   { type: "art", kind: "civics.supremeCourt", x: 576, y: 181, s: 0.7, label: "Judicial branch", sub: "the courts", visible: true },
        j1:    { type: "box", x: 25, y: 362, w: 230, h: 64, tone: "teal", label: "Makes laws", sub: "writes and passes them" },
        j2:    { type: "box", x: 285, y: 362, w: 230, h: 64, tone: "violet", label: "Carries out laws", sub: "puts them into action" },
        j3:    { type: "box", x: 545, y: 362, w: 230, h: 64, tone: "amber", label: "Interprets laws", sub: "decides what they mean" },
        share: { type: "box", x: 30, y: 26, w: 250, h: 84, tone: "green", label: "Shared power", sub: "no branch can run the government alone" }
      },
      arrows: {
        a1: { d: "M370,128 C330,172 170,150 140,182" },
        a2: { d: "M400,128 L400,180" },
        a3: { d: "M430,128 C470,172 630,150 660,174" }
      },
      steps: [
        { caption: "Three branches, three jobs: Congress makes the laws, the President carries them out, and the courts interpret them, which means deciding what they mean.",
          do: [{ show: ["a1", "a2", "a3"] }, { show: ["j1", "j2", "j3"], stagger: 300 }] },
        { caption: "Because the power is split three ways, no single branch can run the government alone. That protects people from any one leader or group getting too much power.",
          do: [{ show: ["share"] }, { pulse: "share" }] }
      ]
    }
  ]
});
