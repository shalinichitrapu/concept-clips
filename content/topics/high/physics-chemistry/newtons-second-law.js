CC.topic({
  id: "newtons-second-law",
  level: "high",
  section: "physics-chemistry",
  order: 1,
  title: "Newton's second law",
  summary: "Why a full shopping cart is harder to get moving than an empty one, and how F = m·a puts numbers on it.",
  scenes: [
    {
      title: "Two shopping carts",
      elements: {
        fl1: { type: "path", px: true, pts: [[30, 180], [770, 180]], tone: "grey", w: 3 },
        fl2: { type: "path", px: true, pts: [[30, 400], [770, 400]], tone: "grey", w: 3 },
        cartE: { type: "art", kind: "phys.cart", x: 110, y: 70 },
        cartF: { type: "art", kind: "phys.cart", x: 110, y: 290, load: 2 },
        pE: { type: "art", kind: "phys.arrow80", x: 32, y: 73, tone: "violet", label: "30 N", labelAbove: true },
        pF: { type: "art", kind: "phys.arrow80", x: 32, y: 293, tone: "violet", label: "30 N", labelAbove: true },
        mE: { type: "text", x: 40, y: 212, cls: "artlbl", anchor: "start", text: "empty cart: 15 kg" },
        mF: { type: "text", x: 40, y: 432, cls: "artlbl", anchor: "start", text: "full cart: 60 kg" },
        aE: { type: "text", x: 770, y: 212, cls: "eqbig", anchor: "end", text: "a = 2 m/s²" },
        aF: { type: "text", x: 770, y: 432, cls: "eqbig", anchor: "end", text: "a = 0.5 m/s²" }
      },
      steps: [
        {
          caption: "Push an empty shopping cart and a full one with the same force, 30 newtons (N). For now, ignore friction.",
          do: [
            { show: ["fl1", "fl2", "cartE", "cartF"] },
            { show: ["pE", "pF"] }
          ]
        },
        {
          caption: "The empty cart speeds up quickly while the full one barely gets going. Acceleration, a, is how fast an object's velocity changes.",
          do: [
            {
              all: [
                { move: { id: "cartE", by: [400, 0], dur: 2200 } },
                { move: { id: "pE", by: [400, 0], dur: 2200 } },
                { move: { id: "cartF", by: [100, 0], dur: 2200 } },
                { move: { id: "pF", by: [100, 0], dur: 2200 } }
              ]
            }
          ]
        },
        {
          caption: "The difference is mass. The full cart has 4 times the mass of the empty one, so the same force gives it a quarter of the acceleration.",
          do: [
            { show: ["mE", "mF"] },
            { show: ["aE", "aF"], stagger: 300 }
          ]
        }
      ]
    },
    {
      title: "F = m·a",
      enter: "fade",
      elements: {
        c1: { type: "art", kind: "phys.cart", x: 160, y: 50, s: 0.6, load: 0 },
        f1: { type: "art", kind: "phys.arrow40", x: 122, y: 45.8, tone: "violet", label: "15 N", labelAbove: true },
        a1: { type: "art", kind: "phys.arrow40", x: 262, y: 72, tone: "sky" },
        r1: { type: "text", x: 316, y: 92, cls: "eq", anchor: "start", text: "a = 1 m/s²" },
        m1: { type: "text", x: 202, y: 142, cls: "sub", anchor: "middle", text: "15 kg" },
        c2: { type: "art", kind: "phys.cart", x: 160, y: 165, s: 0.6, load: 0 },
        f2: { type: "art", kind: "phys.arrow80", x: 82, y: 160.8, tone: "violet", label: "30 N", labelAbove: true },
        a2: { type: "art", kind: "phys.arrow80", x: 262, y: 187, tone: "sky" },
        r2: { type: "text", x: 356, y: 207, cls: "eq", anchor: "start", text: "a = 2 m/s²" },
        m2: { type: "text", x: 202, y: 257, cls: "sub", anchor: "middle", text: "15 kg" },
        c3: { type: "art", kind: "phys.cart", x: 160, y: 280, s: 0.6, load: 1 },
        f3: { type: "art", kind: "phys.arrow40", x: 122, y: 275.8, tone: "violet", label: "15 N", labelAbove: true },
        a3: { type: "art", kind: "phys.arrow20", x: 262, y: 302, tone: "sky" },
        r3: { type: "text", x: 296, y: 322, cls: "eq", anchor: "start", text: "a = 0.5 m/s²" },
        m3: { type: "text", x: 202, y: 372, cls: "sub", anchor: "middle", text: "30 kg" },
        e0: { type: "text", x: 480, y: 64, cls: "eqlabel", anchor: "start", text: "NEWTON'S SECOND LAW" },
        e1: { type: "text", x: 480, y: 104, cls: "eqbig", anchor: "start", text: "F = m · a" },
        e2: { type: "text", x: 480, y: 140, cls: "eq", anchor: "start", text: "so  a = F ÷ m" },
        b2: { type: "box", x: 480, y: 172, w: 290, h: 70, tone: "violet", label: "2 × force", sub: "gives 2 × the acceleration" },
        b3: { type: "box", x: 480, y: 256, w: 290, h: 70, tone: "teal", label: "2 × mass", sub: "gives ½ × the acceleration" },
        b4: { type: "box", x: 480, y: 340, w: 290, h: 84, tone: "amber", label: "1 N = 1 kg · m/s²", sub: "accelerates 1 kg at 1 m/s²" }
      },
      steps: [
        {
          caption: "Newton's second law: the net force on an object equals its mass times its acceleration, F = m·a. Here, 15 N on a 15 kg cart gives 1 m/s².",
          do: [
            { show: ["e0", "e1", "e2"] },
            { show: ["c1", "f1", "m1"] },
            { show: ["a1", "r1"] }
          ]
        },
        {
          caption: "Double the force to 30 N on the same cart, and the acceleration doubles to 2 m/s². Acceleration is proportional to force.",
          do: [
            { show: ["c2", "f2", "m2"] },
            { show: ["a2", "r2"] },
            { show: ["b2"] }
          ]
        },
        {
          caption: "Keep the force at 15 N but double the mass to 30 kg, and the acceleration halves to 0.5 m/s². Acceleration is inversely proportional to mass.",
          do: [
            { show: ["c3", "f3", "m3"] },
            { show: ["a3", "r3"] },
            { show: ["b3"] }
          ]
        },
        {
          caption: "The unit of force, the newton, comes from this law. One newton is the force that gives a 1 kg mass an acceleration of 1 m/s².",
          do: [
            { show: ["b4"] }
          ]
        }
      ]
    },
    {
      title: "A worked example",
      enter: "fade",
      elements: {
        fl: { type: "path", px: true, pts: [[30, 280], [440, 280]], tone: "grey", w: 3 },
        cart: { type: "art", kind: "phys.cart", x: 150, y: 170, load: 2 },
        mass: { type: "text", x: 220, y: 150, cls: "artlbl", anchor: "middle", text: "m = 60 kg" },
        push: { type: "art", kind: "phys.arrow90", x: 62, y: 173, tone: "violet", label: "push: 45 N", labelAbove: true },
        fric: { type: "art", kind: "phys.arrow40", x: 160, y: 292, tone: "red", flip: true, label: "friction: 15 N" },
        w0: { type: "text", x: 480, y: 64, cls: "eqlabel", anchor: "start", text: "WORKED EXAMPLE" },
        w1: { type: "text", x: 480, y: 104, cls: "eq", anchor: "start", text: "net force = 45 N − 15 N = 30 N" },
        w2: { type: "text", x: 480, y: 144, cls: "eq", anchor: "start", text: "a = F ÷ m = 30 N ÷ 60 kg" },
        w3: { type: "text", x: 480, y: 186, cls: "eqbig", anchor: "start", text: "a = 0.5 m/s²" },
        res: {
          type: "box",
          x: 480,
          y: 222,
          w: 290,
          h: 110,
          tone: "amber",
          label: "+0.5 m/s every second",
          sub: "after 4 s the cart moves at 0.5 × 4 = 2 m/s, a brisk walk"
        }
      },
      steps: [
        {
          caption: "Now with friction. A full cart has a mass of 60 kg. You push it with 45 N, and friction pushes back with 15 N.",
          do: [
            { show: ["fl", "cart", "mass"] },
            { show: ["push", "fric"], stagger: 300 }
          ]
        },
        {
          caption: "F in the law is the net force. Forward 45 N minus backward 15 N leaves a net force of 30 N forward.",
          do: [
            { show: ["w0", "w1"] }
          ]
        },
        {
          caption: "Divide the net force by the mass: a = 30 N ÷ 60 kg = 0.5 m/s².",
          do: [
            { show: ["w2"] },
            { wait: 400 },
            { show: ["w3"] }
          ]
        },
        {
          caption: "So the cart's velocity grows by 0.5 m/s every second. After 4 seconds it's moving at 2 m/s.",
          do: [
            { show: ["res"] },
            {
              all: [
                { move: { id: "cart", by: [140, 0], dur: 2400 } },
                { move: { id: "mass", by: [140, 0], dur: 2400 } },
                { move: { id: "push", by: [140, 0], dur: 2400 } },
                { move: { id: "fric", by: [140, 0], dur: 2400 } }
              ]
            }
          ]
        }
      ]
    }
  ]
});
