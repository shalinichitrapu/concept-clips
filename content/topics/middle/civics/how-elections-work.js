CC.topic({
  id: "how-elections-work",
  level: "middle",
  section: "civics",
  order: 3,
  title: "How voting works",
  summary: "Follow one voter in a made-up town, from signing up to vote to the moment the ballots are counted.",
  scenes: [
    {
      title: "Registering to vote",
      elements: {
        head: { type: "text", x: 400, y: 60, anchor: "middle", cls: "lbl", text: "Maple Falls elects a new mayor" },
        note: { type: "text", x: 400, y: 84, anchor: "middle", cls: "sub", text: "a made-up town" },
        sam:  { type: "art", kind: "person", tone: "violet", x: 48, y: 172, s: 1.4, label: "Sam", sub: "age 18" },
        form: { type: "art", kind: "civics.registration", x: 170, y: 160, label: "Sign-up form", sub: "name, address, birth date", lw: 180 },
        list: { type: "art", kind: "doc", title: "VOTERS", x: 360, y: 170, label: "Voter list", sub: "Sam's name is added", lw: 150 },
        rules: { type: "box", x: 505, y: 150, w: 265, h: 130, tone: "green", label: "Who can vote", sub: "In most places: a U.S. citizen, at least 18 years old, who lives there and has registered" },
        trF:  { type: "track", d: "M110,220 C135,205 150,205 165,212" }
      },
      arrows: {
        chk: { d: "M268,215 L352,215", label: { text: "checked", x: 310, y: 202 } }
      },
      steps: [
        { caption: "The town of Maple Falls is choosing a new mayor. Sam just turned 18 and wants to vote.",
          do: [{ show: ["head", "note"] }, { show: ["sam"] }, { pulse: "sam" }] },
        { caption: "First, Sam registers to vote by filling out a form with name, address and birth date. In many states you can do this online.",
          do: [{ show: ["form"] }, { flow: { along: "trF", token: "Sam", tone: "violet" } }, { pulse: "form" }] },
        { caption: "Election officials check that Sam is allowed to vote, then add Sam's name to the list of voters.",
          do: [{ show: ["chk"] }, { flow: { along: "chk", icon: "doc", tone: "green" } }, { show: ["list"] }, { show: ["rules"] }] }
      ]
    },
    {
      title: "Election Day",
      enter: "slide",
      elements: {
        poll:  { type: "art", kind: "civics.pollingPlace", x: 20, y: 80, label: "Polling place", sub: "often a school or library", lw: 200 },
        ballot:{ type: "art", kind: "civics.ballot", x: 292, y: 70, names: ["Ana Ortiz", "Ben Clarke", "Chen Wu"], label: "Ballot" },
        booth: { type: "art", kind: "civics.booth", x: 462, y: 80, label: "Voting booth" },
        box:   { type: "art", kind: "civics.ballotBox", x: 650, y: 120, label: "Ballot box" },
        secret:{ type: "box", x: 150, y: 318, w: 500, h: 92, tone: "sky", label: "Secret ballot", sub: "You vote alone and your name isn't on the ballot, so no one can find out who you chose." }
      },
      arrows: {
        a1: { d: "M262,160 L286,160" },
        a2: { d: "M428,160 L456,160" },
        a3: { d: "M586,160 L644,160" }
      },
      steps: [
        { caption: "On Election Day, Sam goes to a polling place. A worker finds Sam's name on the voter list. Many people vote early or by mail instead.",
          do: [{ show: ["poll"] }, { pulse: "poll" }] },
        { caption: "Sam gets a ballot. It lists the candidates for mayor, with a box next to each name.",
          do: [{ show: ["a1"] }, { show: ["ballot"] }] },
        { caption: "Sam marks the ballot alone, inside a voting booth. Nobody can look over Sam's shoulder.",
          do: [{ show: ["a2"] }, { show: ["booth"] }, { flow: { along: "a2", icon: "doc", tone: "violet" } }] },
        { caption: "Sam drops the ballot into the ballot box. It doesn't have Sam's name on it, so Sam's choice stays secret. This is called a secret ballot.",
          do: [{ show: ["a3", "box"] }, { flow: { along: "a3", icon: "doc", tone: "violet" } }, { show: ["secret"] }] }
      ]
    },
    {
      title: "Counting the votes",
      enter: "fade",
      elements: {
        box:  { type: "art", kind: "civics.ballotBox", x: 40, y: 110, s: 1.3, label: "1,900 ballots", sub: "cast in Maple Falls" },
        m1:   { type: "meter", x: 270, y: 120, w: 300, total: 1000, label: "Ana Ortiz", format: "{v} votes", tone: "violet" },
        m2:   { type: "meter", x: 270, y: 185, w: 300, total: 1000, label: "Ben Clarke", format: "{v} votes", tone: "teal" },
        m3:   { type: "meter", x: 270, y: 250, w: 300, total: 1000, label: "Chen Wu", format: "{v} votes", tone: "amber" },
        win:  { type: "box", x: 600, y: 96, w: 175, h: 100, tone: "green", label: "Ortiz wins", sub: "the most votes" },
        rule: { type: "box", x: 270, y: 318, w: 505, h: 92, tone: "yellow", label: "Most votes wins", sub: "812 is less than half of 1,900, but it's more than anyone else got." },
        tr:   { type: "track", d: "M150,170 C200,150 230,140 268,140" }
      },
      steps: [
        { caption: "When voting ends, election workers count every ballot. Observers can watch, so everyone can trust the count.",
          do: [{ show: ["box"] }, { show: ["m1", "m2", "m3"] }, { flow: { along: "tr", icon: "doc", tone: "grey", count: 4, gap: 200 } },
            { all: [{ meter: { id: "m1", value: 812, dur: 1600 } }, { meter: { id: "m2", value: 655, dur: 1600 } }, { meter: { id: "m3", value: 433, dur: 1600 } }] }] },
        { caption: "Ana Ortiz has the most votes, so she wins. She will be the next mayor of Maple Falls.",
          do: [{ show: ["win"] }, { pulse: "win" }] },
        { caption: "In most U.S. elections, the candidate with the most votes wins, even if that's less than half of all the votes.",
          do: [{ show: ["rule"] }] }
      ]
    }
  ]
});
