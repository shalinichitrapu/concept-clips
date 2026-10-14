CC.topic({
  id: "balanced-and-unbalanced-forces",
  level: "middle",
  section: "physics-chemistry",
  order: 3,
  title: "Balanced and unbalanced forces",
  summary: "Why a tug of war can stand still or suddenly move, and what it takes to get a heavy box sliding.",
  scenes: [
    {
      title: "Tug of war",
      elements: {
        ground: { type: "path", px: true, pts: [[30, 280], [770, 280]], tone: "grey", w: 3 },
        mark: { type: "path", px: true, pts: [[365, 286], [365, 308]], tone: "grey", w: 3 },
        markL: { type: "text", x: 365, y: 326, anchor: "middle", cls: "tick", text: "starting line" },
        rope: { type: "path", px: true, pts: [[70, 250], [720, 250]], tone: "amber", w: 6 },
        ribbon: { type: "art", kind: "phys.ribbon", x: 356, y: 248, s: 0.75 },
        p1: { type: "art", kind: "phys.puller", x: 90, y: 182, tone: "violet", flip: undefined },
        p2: { type: "art", kind: "phys.puller", x: 170, y: 182, tone: "violet", flip: undefined },
        p3: { type: "art", kind: "phys.puller", x: 480, y: 182, tone: "teal", flip: true },
        p4: { type: "art", kind: "phys.puller", x: 560, y: 182, tone: "teal", flip: true },
        p5: { type: "art", kind: "phys.puller", x: 640, y: 182, tone: "teal", flip: true },
        arrL: { type: "art", kind: "phys.arrow120", x: 80, y: 110, tone: "violet", flip: true, label: "300 N" },
        arrR: { type: "art", kind: "phys.arrow120", x: 520, y: 110, tone: "teal", flip: false, label: "300 N" },
        arrR2: { type: "art", kind: "phys.arrow180", x: 520, y: 110, tone: "teal", flip: false, label: "450 N" },
        net: { type: "text", x: 400, y: 52, anchor: "middle", cls: "eqbig", text: "Net force = 300 N − 300 N = 0 N" },
        state: { type: "text", x: 400, y: 80, anchor: "middle", cls: "legend", text: "balanced: the rope stays still" },
        netArr: { type: "art", kind: "phys.arrow60", x: 400, y: 345, tone: "amber", flip: false, label: "net force: 150 N" }
      },
      steps: [
        {
          caption: "In a tug of war, two teams pull on a rope in opposite directions. Each pull is a force.",
          do: [
            { show: ["ground", "rope", "ribbon", "mark", "markL"] },
            { show: ["p1", "p2", "p3", "p4"], stagger: 150 }
          ]
        },
        {
          caption: "We draw each force as an arrow pointing the way it pulls. A longer arrow means a stronger force. Forces are measured in newtons (N).",
          do: [
            { show: ["arrL", "arrR"], stagger: 300 }
          ]
        },
        {
          caption: "Both teams pull with 300 N. The forces cancel out, so the net force is zero. These are balanced forces, and the rope doesn't move.",
          do: [
            { show: ["net", "state"] },
            { pulse: "ribbon" }
          ]
        },
        {
          caption: "A third person joins the team on the right. Now that side pulls with 450 N.",
          do: [
            { show: ["p5"] },
            { hide: ["arrR"] },
            { show: ["arrR2"] }
          ]
        },
        {
          caption: "Now the forces are unbalanced. The net force is 150 N toward the stronger team, so the rope and both teams start moving that way.",
          do: [
            {
              all: [
                { text: { id: "net", text: "Net force = 450 N − 300 N = 150 N" } },
                { text: { id: "state", text: "unbalanced: the rope moves to the right" } }
              ]
            },
            { show: ["netArr"] },
            {
              all: [
                { move: { id: "p1", by: [60, 0], dur: 1600 } },
                { move: { id: "p2", by: [60, 0], dur: 1600 } },
                { move: { id: "p3", by: [60, 0], dur: 1600 } },
                { move: { id: "p4", by: [60, 0], dur: 1600 } },
                { move: { id: "p5", by: [60, 0], dur: 1600 } },
                { move: { id: "rope", by: [60, 0], dur: 1600 } },
                { move: { id: "ribbon", by: [60, 0], dur: 1600 } },
                { move: { id: "arrL", by: [60, 0], dur: 1600 } },
                { move: { id: "arrR2", by: [60, 0], dur: 1600 } }
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Pushing a box",
      enter: "slide",
      elements: {
        floor: { type: "path", px: true, pts: [[30, 330], [770, 330]], tone: "grey", w: 3 },
        crate: { type: "art", kind: "phys.crate", x: 180, y: 230 },
        pusher: { type: "art", kind: "phys.pusher", x: 104, y: 230, tone: "violet" },
        push: { type: "art", kind: "phys.arrow100", x: 230, y: 188, tone: "violet", flip: false, label: "push: 100 N", labelAbove: true },
        push2: { type: "art", kind: "phys.arrow160", x: 230, y: 188, tone: "violet", flip: false, label: "push: 160 N", labelAbove: true },
        fric: { type: "art", kind: "phys.arrow100", x: 130, y: 342, tone: "red", flip: true, label: "friction: 100 N" },
        net: { type: "text", x: 400, y: 52, anchor: "middle", cls: "eqbig", text: "Net force = 100 N − 100 N = 0 N" },
        bal: { type: "box", x: 40, y: 76, w: 350, h: 72, tone: "green", label: "Balanced forces", sub: "net force is zero, so motion doesn't change" },
        unbal: { type: "box", x: 410, y: 76, w: 350, h: 72, tone: "amber", label: "Unbalanced forces", sub: "the object speeds up, slows down or turns" }
      },
      steps: [
        {
          caption: "Now push a heavy box across the floor. Your push is a force of 100 N to the right.",
          do: [
            { show: ["floor", "crate", "pusher"] },
            { show: ["push"] }
          ]
        },
        {
          caption: "The floor pushes back on the box with a force called friction. Here it's also 100 N, so the forces are balanced and the box stays put.",
          do: [
            { show: ["fric"] },
            { show: ["net"] }
          ]
        },
        {
          caption: "Push harder, with 160 N. Friction stays at 100 N, so the net force is 60 N to the right. The box starts to move and speeds up.",
          do: [
            { hide: ["push"] },
            { show: ["push2"] },
            { text: { id: "net", text: "Net force = 160 N − 100 N = 60 N" } },
            {
              all: [
                { move: { id: "crate", by: [300, 0], dur: 2200 } },
                { move: { id: "pusher", by: [300, 0], dur: 2200 } },
                { move: { id: "push2", by: [300, 0], dur: 2200 } },
                { move: { id: "fric", by: [300, 0], dur: 2200 } }
              ]
            }
          ]
        },
        {
          caption: "Balanced forces never change how something moves. Unbalanced forces make it speed up, slow down or change direction.",
          do: [
            { show: ["bal", "unbal"], stagger: 300 }
          ]
        }
      ]
    }
  ]
});
