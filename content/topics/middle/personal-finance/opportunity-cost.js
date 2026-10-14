CC.topic({
  id: "opportunity-cost",
  level: "middle",
  section: "personal-finance",
  order: 3,
  title: "Opportunity cost",
  summary: "Every choice means giving something up. Opportunity cost is the next-best option you didn't pick.",
  scenes: [
    {
      title: "$20, three choices",
      elements: {
        bill: { type: "art", kind: "fin.bill", text: "$20", x: 340, y: 30, label: "Your $20" },
        game: { type: "art", kind: "fin.gamepad", x: 70, y: 215, label: "Video game", sub: "$20" },
        tix:  { type: "art", kind: "fin.ticket", x: 330, y: 220, label: "Concert ticket", sub: "$20" },
        jar:  { type: "art", kind: "fin.jar", text: "SAVE", tone: "amber", coins: 1, x: 612, y: 190, s: .9, label: "Save it" }
      },
      arrows: {
        aG: { d: "M370,132 C330,180 150,160 135,208", dashed: true },
        aT: { d: "M400,132 L400,212", dashed: true },
        aS: { d: "M430,132 C470,180 640,160 655,182", dashed: true }
      },
      steps: [
        { caption: "You got $20 for your birthday.",
          do: [{ show: ["bill"] }, { pulse: "bill" }] },
        { caption: "You could buy a video game, get a concert ticket, or save the money. Each one takes all $20, so you can only pick one.",
          do: [{ show: ["aG", "game", "aT", "tix", "aS", "jar"], stagger: 150 }] }
      ]
    },
    {
      title: "Choosing means giving up",
      enter: "fade",
      elements: {
        bill: { type: "art", kind: "fin.bill", text: "$20", x: 340, y: 30, label: "Your $20", visible: true },
        game: { type: "art", kind: "fin.gamepad", x: 70, y: 215, label: "Video game", sub: "$20", visible: true },
        tix:  { type: "art", kind: "fin.ticket", x: 330, y: 220, label: "Concert ticket", sub: "$20", visible: true },
        jar:  { type: "art", kind: "fin.jar", text: "SAVE", tone: "amber", coins: 1, x: 612, y: 190, s: .9, label: "Save it", visible: true },
        rG:   { type: "text", x: 135, y: 360, anchor: "middle", cls: "seg-label", tone: "violet", text: "2nd choice" },
        rT:   { type: "text", x: 400, y: 360, anchor: "middle", cls: "seg-label", tone: "green", text: "1st choice" },
        rS:   { type: "text", x: 655, y: 360, anchor: "middle", cls: "seg-label", tone: "grey", text: "3rd choice" },
        oc:   { type: "text", x: 135, y: 412, anchor: "middle", cls: "lbl", tone: "red", text: "Opportunity cost" },
        ring: { type: "ring", x: 135, y: 288, r: 95, tone: "red" },
        def:  { type: "box", x: 500, y: 20, w: 270, h: 120, tone: "red", label: "Opportunity cost", sub: "the next-best option you give up when you make a choice" }
      },
      arrows: {
        aG: { d: "M370,132 C330,180 150,160 135,208", dashed: true },
        aT: { d: "M400,132 L400,212", dashed: true },
        aS: { d: "M430,132 C470,180 640,160 655,182", dashed: true }
      },
      steps: [
        { caption: "Rank your options. Say the concert is your favorite, and the video game is a close second.",
          do: [{ show: ["aG", "aT", "aS"] }, { show: ["rT", "rG", "rS"], stagger: 250 }] },
        { caption: "So you spend your $20 on the concert ticket.",
          do: [{ flow: { along: "aT", art: "fin.bill", s: .5 } }, { hide: ["bill", "aG", "aS", "aT"] }, { pulse: "tix" }] },
        { caption: "Now you can't have the video game. It's your next-best option, the one you gave up, so it's the opportunity cost of the concert.",
          do: [{ show: ["ring", "oc"] }, { pulse: "ring" }] },
        { caption: "Opportunity cost is only the next-best option, not everything you didn't pick. You could only have had one of them anyway.",
          do: [{ show: ["def"] }] }
      ]
    },
    {
      title: "Time has a cost too",
      enter: "slide",
      elements: {
        clock: { type: "art", kind: "fin.clock", x: 358, y: 20, label: "1 free hour tonight", visible: true },
        book:  { type: "art", kind: "fin.book", x: 100, y: 120, label: "Study", sub: "for tomorrow's test" },
        game:  { type: "art", kind: "fin.gamepad", x: 570, y: 122, label: "Play games" },
        ifS:   { type: "box", x: 40, y: 280, w: 340, h: 84, tone: "violet", label: "If you study", sub: "you give up an hour of games" },
        ifG:   { type: "box", x: 420, y: 280, w: 340, h: 84, tone: "teal", label: "If you play", sub: "you give up study time, and maybe a better grade" },
        rule:  { type: "text", x: 400, y: 420, anchor: "middle", cls: "eq", text: "Before you choose, ask: what am I giving up?" }
      },
      arrows: {
        aB: { from: "clock", to: "book", sides: ["l", "t"], dashed: true },
        aP: { from: "clock", to: "game", sides: ["r", "t"], dashed: true }
      },
      steps: [
        { caption: "Money isn't the only thing you spend. Time has an opportunity cost too. Say you have one free hour tonight.",
          do: [{ pulse: "clock" }] },
        { caption: "You could study for tomorrow's test, or play video games. You can't do both in the same hour.",
          do: [{ show: ["aB", "book", "aP", "game"], stagger: 150 }] },
        { caption: "If you study, the opportunity cost is an hour of games.",
          do: [{ show: ["ifS"] }, { pulse: "game" }] },
        { caption: "If you play, the opportunity cost is the study time, and maybe a better grade on the test.",
          do: [{ show: ["ifG"] }, { pulse: "book" }] },
        { caption: "Every choice, with money or time, has an opportunity cost. Knowing what you give up helps you choose what matters most to you.",
          do: [{ show: ["rule"] }] }
      ]
    }
  ]
});
