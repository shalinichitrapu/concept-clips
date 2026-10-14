CC.topic({
  id: "electoral-college",
  level: "high",
  section: "civics",
  order: 2,
  title: "The Electoral College",
  summary: "How the U.S. picks a President through 538 electors, and how a candidate can win more votes and still lose.",
  scenes: [
    {
      title: "Voting for electors",
      elements: {
        v1:     { type: "art", kind: "person", tone: "violet", x: 40, y: 172 },
        v2:     { type: "art", kind: "person", tone: "violet", x: 88, y: 172 },
        v3:     { type: "art", kind: "person", tone: "violet", x: 136, y: 172 },
        vL:     { type: "text", x: 108, y: 268, anchor: "middle", cls: "artlbl", text: "Voters" },
        vS:     { type: "text", x: 108, y: 287, anchor: "middle", cls: "sub", text: "in one state" },
        ballot: { type: "art", kind: "civics.ballot", x: 222, y: 112, office: "PRESIDENT", names: ["Hale", "Moreno"], label: "Ballot", sub: "made-up candidates", lw: 150 },
        e0: { type: "art", kind: "person", tone: "amber", x: 462, y: 140, s: 0.6 },
        e1: { type: "art", kind: "person", tone: "amber", x: 496, y: 140, s: 0.6 },
        e2: { type: "art", kind: "person", tone: "amber", x: 530, y: 140, s: 0.6 },
        e3: { type: "art", kind: "person", tone: "amber", x: 564, y: 140, s: 0.6 },
        e4: { type: "art", kind: "person", tone: "amber", x: 598, y: 140, s: 0.6 },
        e5: { type: "art", kind: "person", tone: "amber", x: 462, y: 200, s: 0.6 },
        e6: { type: "art", kind: "person", tone: "amber", x: 496, y: 200, s: 0.6 },
        e7: { type: "art", kind: "person", tone: "amber", x: 530, y: 200, s: 0.6 },
        e8: { type: "art", kind: "person", tone: "amber", x: 564, y: 200, s: 0.6 },
        e9: { type: "art", kind: "person", tone: "amber", x: 598, y: 200, s: 0.6 },
        eL:     { type: "text", x: 544, y: 268, anchor: "middle", cls: "artlbl", text: "Electors" },
        eS:     { type: "text", x: 544, y: 287, anchor: "middle", cls: "sub", text: "10 for this state" },
        ec:     { type: "box", x: 150, y: 330, w: 500, h: 84, tone: "amber", label: "The Electoral College", sub: "all 538 electors from the 50 states and D.C." },
        trV:    { type: "track", d: "M150,200 C180,190 200,190 218,192" }
      },
      arrows: {
        pick: { d: "M362,192 L448,192", label: { text: "chooses", x: 405, y: 180 } }
      },
      steps: [
        { caption: "In a presidential election, you vote in your state, and your ballot lists the candidates for President.",
          do: [{ show: ["v1", "v2", "v3", "vL", "vS"] }, { show: ["ballot"] }, { flow: { along: "trV", icon: "doc", tone: "violet", count: 3 } }] },
        { caption: "But your vote really chooses electors: people pledged to a candidate. The candidate who wins the state sends their electors, who cast that state's official votes for President.",
          do: [{ show: ["pick"] }, { show: ["e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "eL", "eS"], stagger: 60 }] },
        { caption: "All the electors together, 538 of them, make up the Electoral College. They vote in December, and Congress counts their votes in January.",
          do: [{ show: ["ec"] }, { pulse: "ec" }] }
      ]
    },
    {
      title: "Where 538 comes from",
      enter: "fade",
      elements: {
        house:  { type: "art", kind: "civics.capitolWing", tone: "teal", x: 40, y: 50, label: "House seats", sub: "435, split by population" },
        senate: { type: "art", kind: "civics.capitolWing", tone: "violet", x: 300, y: 50, label: "Senators", sub: "100, two per state" },
        dc:     { type: "box", x: 560, y: 70, w: 210, h: 100, tone: "grey", label: "Washington, D.C.", sub: "3 electors (23rd Amendment)" },
        eq:     { type: "text", x: 400, y: 268, anchor: "middle", cls: "eqbig", text: "435 + 100 + 3 = 538 electors" },
        ex:     { type: "box", x: 130, y: 310, w: 540, h: 92, tone: "yellow", label: "State's electors = its House seats + 2", sub: "8 House seats: 8 + 2 = 10 electors. The smallest states have 1 seat, so they get 3." }
      },
      steps: [
        { caption: "Each state gets one elector for every seat it has in the House of Representatives. The 435 House seats are divided among the states by population after each census.",
          do: [{ show: ["house"] }] },
        { caption: "Each state also gets two more electors, one for each of its two senators. That adds 100.",
          do: [{ show: ["senate"] }] },
        { caption: "Washington, D.C., isn't a state, but the 23rd Amendment gives it 3 electors. In all, 435 + 100 + 3 = 538.",
          do: [{ show: ["dc"] }, { show: ["eq"] }] },
        { caption: "So a state with 8 House seats has 8 + 2 = 10 electors. Even the smallest states have at least 3.",
          do: [{ show: ["ex"] }] }
      ]
    },
    {
      title: "Winner takes all",
      enter: "slide",
      elements: {
        map:  { type: "art", kind: "civics.map", x: 20, y: 46 },
        note: { type: "text", x: 240, y: 404, anchor: "middle", cls: "tick", text: "simplified, made-up map: 5 states, 60 electors" },
        s0: { type: "art", kind: "civics.map", n: 0, tone: "violet", x: 20, y: 46 },
        s1: { type: "art", kind: "civics.map", n: 1, tone: "violet", x: 20, y: 46 },
        s2: { type: "art", kind: "civics.map", n: 2, tone: "teal", x: 20, y: 46 },
        s3: { type: "art", kind: "civics.map", n: 3, tone: "teal", x: 20, y: 46 },
        s4: { type: "art", kind: "civics.map", n: 4, tone: "teal", x: 20, y: 46 },
        n0: { type: "text", x: 142, y: 136, anchor: "middle", cls: "artlbl", text: "Avalon" },
        c0: { type: "text", x: 142, y: 155, anchor: "middle", cls: "sub", text: "20 electors" },
        r0: { type: "text", x: 142, y: 178, anchor: "middle", cls: "seg-label", tone: "violet", text: "Hale 51%" },
        n1: { type: "text", x: 348, y: 128, anchor: "middle", cls: "artlbl", text: "Bexley" },
        c1: { type: "text", x: 348, y: 147, anchor: "middle", cls: "sub", text: "16 electors" },
        r1: { type: "text", x: 348, y: 170, anchor: "middle", cls: "seg-label", tone: "violet", text: "Hale 51%" },
        n2: { type: "text", x: 140, y: 284, anchor: "middle", cls: "artlbl", text: "Corran" },
        c2: { type: "text", x: 140, y: 303, anchor: "middle", cls: "sub", text: "12 electors" },
        r2: { type: "text", x: 140, y: 326, anchor: "middle", cls: "seg-label", tone: "teal", text: "Moreno 67%" },
        n3: { type: "text", x: 344, y: 236, anchor: "middle", cls: "artlbl", text: "Dunmore" },
        c3: { type: "text", x: 344, y: 255, anchor: "middle", cls: "sub", text: "8 electors" },
        r3: { type: "text", x: 344, y: 278, anchor: "middle", cls: "seg-label", tone: "teal", text: "Moreno 71%" },
        n4: { type: "text", x: 397, y: 322, anchor: "middle", cls: "artlbl", text: "Elmwood" },
        c4: { type: "text", x: 397, y: 340, anchor: "middle", cls: "sub", text: "4 electors" },
        r4: { type: "text", x: 397, y: 362, anchor: "middle", cls: "seg-label", tone: "teal", text: "Moreno 60%" },
        mH: { type: "meter", x: 495, y: 80, w: 275, total: 60, need: 31, needLabel: "majority: 31", label: "Hale", format: "{v} electors", tone: "violet" },
        mM: { type: "meter", x: 495, y: 158, w: 275, total: 60, need: 31, needLabel: "majority: 31", label: "Moreno", format: "{v} electors", tone: "teal" },
        pT: { type: "text", x: 495, y: 262, cls: "eqlabel", text: "TOTAL VOTES, ALL STATES" },
        pM: { type: "text", x: 495, y: 298, cls: "eq", swatch: "teal", text: "Moreno: 1,620,000" },
        pH: { type: "text", x: 495, y: 330, cls: "eq", swatch: "violet", text: "Hale: 1,280,000" },
        pC: { type: "text", x: 495, y: 372, cls: "artlbl", text: "Moreno: more votes, fewer electors" }
      },
      steps: [
        { caption: "Here is a made-up country with five states and 60 electors. To win, a candidate needs a majority of the electors: 31.",
          do: [{ show: ["map", "note"] }, { show: ["n0", "c0", "n1", "c1", "n2", "c2", "n3", "c3", "n4", "c4"] }, { show: ["mH", "mM"] }] },
        { caption: "Most states are winner-take-all: whoever gets the most votes in the state gets all its electors. Hale wins Avalon 51% to 49% and takes all 20.",
          do: [{ show: ["s0", "r0"] }, { meter: { id: "mH", value: 20 } }] },
        { caption: "Hale also wins Bexley by a hair. Moreno wins the other three states by wide margins.",
          do: [{ show: ["s1", "r1"] }, { meter: { id: "mH", value: 36 } }, { show: ["s2", "r2", "s3", "r3", "s4", "r4"], stagger: 200 }, { meter: { id: "mM", value: 24 } }] },
        { caption: "Hale has 36 electors, past the 31 needed, so Hale wins. Yet nationwide Moreno got 340,000 more votes. Big wins in small states add votes but no extra electors.",
          do: [{ pulse: "mH" }, { show: ["pT", "pM", "pH"] }, { show: ["pC"] }] }
      ]
    },
    {
      title: "The real numbers",
      enter: "fade",
      elements: {
        m:   { type: "meter", x: 150, y: 70, w: 500, total: 538, value: 270, need: 270, needLabel: "270 to win", label: "Electoral votes needed", format: "{v} of {total}", tone: "amber" },
        b1:  { type: "box", x: 30, y: 150, w: 360, h: 120, tone: "grey", label: "Winner-take-all", sub: "48 states and D.C. give all their electors to the candidate who wins the state's popular vote." },
        b2:  { type: "box", x: 410, y: 150, w: 360, h: 120, tone: "sky", label: "Maine and Nebraska", sub: "2 electors go to the statewide winner and 1 to the winner of each congressional district." },
        b3:  { type: "box", x: 130, y: 296, w: 540, h: 110, tone: "yellow", label: "More votes, still lost", sub: "A candidate has won the national popular vote but lost the Electoral College several times, most recently in 2000 and 2016." }
      },
      steps: [
        { caption: "The real system works the same way with bigger numbers. There are 538 electors, so a candidate needs a majority, 270, to win.",
          do: [{ show: ["m"] }] },
        { caption: "Forty-eight states and D.C. use winner-take-all. Maine and Nebraska can split their electors, because they award some by congressional district.",
          do: [{ show: ["b1", "b2"], stagger: 300 }] },
        { caption: "Because most states are winner-take-all, the national vote and the electoral vote can disagree. It has happened several times, most recently in 2000 and 2016.",
          do: [{ show: ["b3"] }, { pulse: "b3" }] }
      ]
    }
  ]
});
