CC.topic({
  id: "how-a-bill-becomes-law",
  level: "middle",
  section: "civics",
  order: 2,
  title: "How a bill becomes law",
  summary: "How a bill becomes a U.S. federal law, from the Capitol to the White House and back.",
  scenes: [
    {
      title: "Congress, in the Capitol",
      elements: {
        bill:   { type: "art", kind: "civics.bill", x: 30, y: 160, label: "Bill", sub: "a proposed law", lw: 110 },
        house:  { type: "art", kind: "civics.capitolWing", tone: "teal", x: 140, y: 180, label: "House of Representatives", sub: "435 members" },
        senate: { type: "art", kind: "civics.capitolWing", tone: "violet", x: 470, y: 180, label: "Senate", sub: "100 senators" },
        dome:   { type: "art", kind: "civics.capitolCenter", x: 325, y: 60 },
        capL:   { type: "text", x: 400, y: 48, anchor: "middle", cls: "callout", text: "The U.S. Capitol" },
        mH:     { type: "meter", x: 145, y: 390, w: 180, total: 435, need: 218, label: "House vote", needLabel: "majority: 218", tone: "teal" },
        mS:     { type: "meter", x: 475, y: 390, w: 180, total: 100, need: 51, label: "Senate vote", needLabel: "majority: 51", tone: "violet" },
        exitL:  { type: "text", x: 790, y: 190, anchor: "end", cls: "callout", text: "to the White House →" },
        trIn:   { type: "track", d: "M75,205 C130,205 180,268 232,268" },
        trH2S:  { type: "track", d: "M240,268 C300,330 500,330 560,268" },
        trOut:  { type: "track", d: "M565,268 C640,268 700,215 830,215" }
      },
      steps: [
        { caption: "A bill is a written proposal for a new law. Only a member of Congress can introduce one.",
          do: [{ show: ["bill"] }, { pulse: "bill" }] },
        { caption: "Congress meets in the U.S. Capitol. The House of Representatives uses one wing and the Senate uses the other.",
          do: [{ show: ["house", "dome", "senate", "capL"], stagger: 200 }] },
        { caption: "This bill starts in the House. A committee studies and edits it, then all 435 members vote. It needs a majority to pass.",
          do: [{ flow: { along: "trIn", icon: "doc", tone: "teal" } }, { pulse: "house" }, { show: ["mH"] }, { meter: { id: "mH", value: 240 } }] },
        { caption: "Next it goes to the Senate, which does the same. A majority of the 100 senators must approve exactly the same text.",
          do: [{ flow: { along: "trH2S", icon: "doc", tone: "violet", dur: 1500 } }, { pulse: "senate" }, { show: ["mS"] }, { meter: { id: "mS", value: 58 } }] },
        { caption: "Once both chambers have passed it, the bill goes to the President.",
          do: [{ show: ["exitL"] }, { flow: { along: "trOut", icon: "doc", tone: "violet" } }] }
      ]
    },
    {
      title: "The President decides",
      enter: "fade",
      elements: {
        wh:   { type: "art", kind: "civics.whiteHouse", x: 250, y: 125, label: "The White House", sub: "10 days to sign or veto" },
        law:  { type: "art", kind: "civics.law", x: 640, y: 290, label: "Law" },
        veto: { type: "art", kind: "civics.veto", x: 640, y: 30, label: "Veto", sub: "returned to Congress", lw: 160 },
        cap:  { type: "art", kind: "civics.capitolMini", x: 30, y: 30, label: "Congress", sub: "votes again on an override", lw: 200 },
        mH:   { type: "meter", x: 40, y: 222, w: 180, total: 435, need: 290, label: "House", needLabel: "2/3: 290", tone: "teal" },
        mS:   { type: "meter", x: 40, y: 278, w: 180, total: 100, need: 67, label: "Senate", needLabel: "2/3: 67", tone: "violet" },
        trIn: { type: "track", d: "M-30,262 C100,262 180,262 245,262" }
      },
      arrows: {
        a_sign: { d: "M555,262 C600,262 600,345 636,345", label: { text: "signs", x: 566, y: 318 } },
        a_veto: { d: "M555,200 C600,200 600,85 636,85", label: { text: "vetoes", x: 566, y: 150 } },
        a_back: { d: "M636,62 C420,62 330,100 238,100", label: { text: "returned", x: 436, y: 58 } },
        a_over: { d: "M130,318 C130,410 180,425 300,425 L560,425 C600,425 610,375 636,375", label: { text: "2/3 of both chambers vote yes", x: 430, y: 414 } }
      },
      steps: [
        { caption: "The bill arrives at the White House. The President has 10 days to sign it or veto it.",
          do: [{ show: ["wh"] }, { flow: { along: "trIn", icon: "doc", tone: "violet" } }, { pulse: "wh" }] },
        { caption: "If the President signs it, the bill becomes law.",
          do: [{ show: ["a_sign"] }, { flow: { along: "a_sign", icon: "doc", tone: "green" } }, { show: ["law"] }, { pulse: "law" }] },
        { caption: "If the President vetoes it instead, the bill goes back to Congress along with the President's objections.",
          do: [{ show: ["a_veto", "veto"] }, { flow: { along: "a_veto", icon: "doc", tone: "red" } }, { show: ["a_back", "cap"] }, { flow: { along: "a_back", icon: "doc", tone: "red", dur: 1500 } }] },
        { caption: "Congress can override a veto, but it needs a two-thirds vote in both the House and the Senate. That's much harder than a simple majority.",
          do: [{ show: ["mH", "mS"] }, { all: [{ meter: { id: "mH", value: 300 } }, { meter: { id: "mS", value: 70 } }] }] },
        { caption: "If both chambers reach two-thirds, the bill becomes law without the President's signature.",
          do: [{ show: ["a_over"] }, { flow: { along: "a_over", icon: "doc", tone: "amber", dur: 1800 } }, { pulse: "law" }] }
      ]
    }
  ]
});
