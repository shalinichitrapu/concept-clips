CC.topic({
  id: "food-chains",
  level: "middle",
  section: "biology",
  order: 2,
  title: "Food chains and energy",
  summary: "How energy from the sun passes from grass to rabbit to fox, why so little reaches the top, and what decomposers do.",
  scenes: [
    {
      title: "A meadow food chain",
      elements: {
        soil:   { type: "art", kind: "soil", x: 0, y: 320, layer: "back" },
        sun:    { type: "art", kind: "sun", x: 40, y: 40, label: "Sun" },
        grass:  { type: "art", kind: "bio.grass", x: 130, y: 252, labelAbove: true, label: "Grass", sub: "producer" },
        rabbit: { type: "art", kind: "bio.rabbit", x: 345, y: 222, labelAbove: true, label: "Rabbit", sub: "consumer: eats plants" },
        fox:    { type: "art", kind: "bio.fox", x: 570, y: 222, labelAbove: true, label: "Fox", sub: "consumer: eats animals" },
        key:    { type: "text", x: 400, y: 400, anchor: "middle", cls: "callout", text: "Arrows show the way energy flows: from the food to the eater" }
      },
      arrows: {
        a1: { d: "M98,158 C104,210 118,252 146,284", label: { text: "light", x: 80, y: 222 } },
        a2: { from: "grass", to: "rabbit", off: [12, 22] },
        a3: { from: "rabbit", to: "fox", off: [16, 16] }
      },
      steps: [
        { caption: "Every food chain starts with the sun. Its light is the energy source for almost all life on Earth.",
          do: [{ show: ["soil", "sun"] }] },
        { caption: "Grass captures sunlight and stores its energy in the food it makes. Living things that make their own food are called producers.",
          do: [{ show: ["grass", "a1"] }, { flow: { along: "a1", token: "light", tone: "yellow", count: 2 } }] },
        { caption: "A rabbit eats the grass, and the energy stored in the grass moves into the rabbit. Animals that eat other living things are consumers.",
          do: [{ show: ["rabbit", "a2"] }, { flow: { along: "a2", token: "energy", tone: "amber" } }] },
        { caption: "A fox eats the rabbit, and the energy moves up one more step. Sun, grass, rabbit, fox: that's a food chain.",
          do: [{ show: ["fox", "a3"] }, { flow: { along: "a3", token: "energy", tone: "amber" } }] },
        { caption: "Notice which way the arrows point. They show where the energy goes, from the food to the animal that eats it.",
          do: [{ show: ["key"] }, { pulse: "rabbit" }] }
      ]
    },
    {
      title: "The energy pyramid",
      enter: "fade",
      elements: {
        lv1:   { type: "box", x: 150, y: 320, w: 320, h: 80, tone: "green", label: "Grass", sub: "1,000 units of energy" },
        lv2:   { type: "box", x: 210, y: 225, w: 200, h: 80, tone: "grey", label: "Rabbits", sub: "100 units" },
        lv3:   { type: "box", x: 260, y: 130, w: 100, h: 80, tone: "amber", label: "Foxes", sub: "10 units" },
        grass: { type: "art", kind: "bio.grass", x: 20, y: 340, s: 0.75 },
        rab:   { type: "art", kind: "bio.rabbit", x: 110, y: 236, s: 0.6 },
        fox:   { type: "art", kind: "bio.fox", x: 140, y: 150, s: 0.6 },
        p1:    { type: "text", x: 452, y: 300, cls: "seg-label", tone: "amber", text: "10% passes up" },
        p2:    { type: "text", x: 396, y: 205, cls: "seg-label", tone: "amber", text: "10% passes up" },
        lost:  { type: "box", x: 600, y: 210, w: 180, h: 150, tone: "red", label: "The other 90%", sub: "used for moving, growing and keeping warm, lost as heat, or never eaten" },
        rule:  { type: "text", x: 400, y: 70, anchor: "middle", cls: "eq", text: "Each level gets about 1/10 of the energy below it" }
      },
      arrows: {
        u1: { d: "M440,318 C446,290 436,268 414,265" },
        u2: { d: "M385,223 C390,196 382,174 364,170" }
      },
      steps: [
        { caption: "How much energy moves up? Picture all the grass in a meadow holding 1,000 units of energy.",
          do: [{ show: ["grass", "lv1"] }] },
        { caption: "The rabbits that eat it get only about 10% of that: around 100 units.",
          do: [{ show: ["u1", "p1"] }, { show: ["rab", "lv2"] }] },
        { caption: "Where does the other 90% go? Most of it is used up for moving and staying warm, and escapes as heat. Some grass never gets eaten.",
          do: [{ show: ["lost"] }, { pulse: "lost" }] },
        { caption: "The foxes get about 10% of the rabbits' energy, so only around 10 units. Stacked up, the levels make an energy pyramid.",
          do: [{ show: ["u2", "p2"] }, { show: ["fox", "lv3"] }] },
        { caption: "That's why a meadow has lots of grass, fewer rabbits and only a few foxes. There isn't enough energy at the top for more.",
          do: [{ show: ["rule"] }] }
      ]
    },
    {
      title: "Decomposers close the loop",
      enter: "slide",
      elements: {
        soil:  { type: "art", kind: "soil", x: 0, y: 320, layer: "back", visible: true },
        leaf1: { type: "art", kind: "bio.leaf", tone: "amber", x: 70, y: 300, s: 0.6 },
        leaf2: { type: "art", kind: "bio.leaf", tone: "amber", x: 150, y: 306, s: 0.5, flip: true },
        mush:  { type: "art", kind: "bio.mushroom", x: 250, y: 268 },
        worm:  { type: "art", kind: "bio.worm", x: 110, y: 372 },
        grass: { type: "art", kind: "bio.grass", x: 520, y: 252, roots: true, labelAbove: true, label: "Grass" },
        cDead: { type: "callout", from: [100, 316], to: [40, 250], text: "Dead leaves", anchor: "start" },
        cMush: { type: "callout", from: [290, 280], to: [330, 230], text: "Fungi" },
        cWorm: { type: "callout", from: [210, 386], to: [260, 410], text: "Earthworm" },
        card:  { type: "box", x: 450, y: 40, w: 320, h: 120, tone: "green", label: "Nutrients loop around", sub: "Energy doesn't: it leaves as heat, so the sun has to keep supplying it." }
      },
      arrows: {
        loop: { d: "M250,362 C340,420 490,420 556,372", label: { text: "nutrients", x: 430, y: 380 } }
      },
      steps: [
        { caption: "When plants and animals die, decomposers get to work. Fungi, bacteria and earthworms break down the remains.",
          do: [{ show: ["leaf1", "leaf2", "cDead"] }, { show: ["mush", "worm"], stagger: 200 }, { show: ["cMush", "cWorm"] }] },
        { caption: "Breaking things down returns nutrients to the soil. Grass soaks them up through its roots and uses them to grow.",
          do: [{ show: ["grass", "loop"] }, { flow: { along: "loop", token: "nutrients", tone: "green", count: 2 } }] },
        { caption: "So nutrients are used again and again, but energy flows only one way. That's why every food chain needs the sun, every day.",
          do: [{ show: ["card"] }] }
      ]
    }
  ]
});
