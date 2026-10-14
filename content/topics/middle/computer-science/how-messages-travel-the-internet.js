CC.topic({
  id: "how-messages-travel-the-internet",
  level: "middle",
  section: "computer-science",
  order: 2,
  title: "How a message travels the internet",
  summary: "How a photo you send is cut into numbered packets, passed from router to router, and rebuilt at the other end.",
  scenes: [
    {
      title: "Sending a photo",
      elements: {
        phone:  { type: "art", kind: "cs.phone", photo: true, x: 40, y: 120, s: 1.3, label: "You" },
        laptop: { type: "art", kind: "cs.laptop", x: 590, y: 150, s: 1.1, label: "Your friend", sub: "in another city" },
        photo:  { type: "art", kind: "cs.photo", x: 230, y: 60, s: 1.2, label: "Photo" },
        p1:     { type: "art", kind: "cs.packet", n: 1, x: 150, y: 250 },
        p2:     { type: "art", kind: "cs.packet", n: 2, x: 224, y: 250 },
        p3:     { type: "art", kind: "cs.packet", n: 3, x: 298, y: 250 },
        p4:     { type: "art", kind: "cs.packet", n: 4, x: 372, y: 250 },
        pL:     { type: "text", x: 293, y: 322, anchor: "middle", cls: "artlbl", text: "Packets" },
        pS:     { type: "text", x: 293, y: 341, anchor: "middle", cls: "sub", text: "a real photo needs thousands" },
        cNum:   { type: "callout", from: [182, 291], to: [160, 395], text: "packet number", anchor: "end" },
        cAddr:  { type: "callout", from: [425, 262], to: [470, 395], text: "to: your friend's address" }
      },
      arrows: {
        aCut: { d: "M290,195 L290,240", label: { text: "cut up", x: 330, y: 222 } }
      },
      steps: [
        { caption: "You want to send a photo from your phone to a friend in another city.",
          do: [{ show: ["phone"] }, { show: ["laptop"] }] },
        { caption: "A photo is too big to send in one piece. Your phone cuts it into small chunks called packets.",
          do: [{ show: ["photo"] }, { show: ["aCut"] }, { show: ["p1", "p2", "p3", "p4"], stagger: 150 }, { show: ["pL", "pS"] }] },
        { caption: "Each packet is like an envelope. It carries a number, and your friend's address so it knows where to go.",
          do: [{ show: ["cNum", "cAddr"], stagger: 300 }, { pulse: "p3" }] }
      ]
    },
    {
      title: "Hop by hop",
      enter: "slide",
      elements: {
        l0: { type: "path", px: true, pts: [[60, 212], [154, 208]], tone: "grey", w: 4 },
        l1: { type: "path", px: true, pts: [[154, 208], [314, 108]], tone: "grey", w: 4 },
        l2: { type: "path", px: true, pts: [[154, 208], [314, 318]], tone: "grey", w: 4 },
        l3: { type: "path", px: true, pts: [[314, 108], [494, 108]], tone: "grey", w: 4 },
        l4: { type: "path", px: true, pts: [[314, 318], [494, 318]], tone: "grey", w: 4 },
        l5: { type: "path", px: true, pts: [[314, 108], [494, 318]], tone: "grey", w: 4 },
        l6: { type: "path", px: true, pts: [[494, 108], [614, 208]], tone: "grey", w: 4 },
        l7: { type: "path", px: true, pts: [[494, 318], [614, 208]], tone: "grey", w: 4 },
        l8: { type: "path", px: true, pts: [[614, 208], [700, 214]], tone: "grey", w: 4 },
        phone:  { type: "art", kind: "cs.phone", photo: true, x: 20, y: 170, s: 0.8, label: "You" },
        laptop: { type: "art", kind: "cs.laptop", x: 680, y: 180, s: 0.65, label: "Friend" },
        r1: { type: "art", kind: "cs.router", x: 110, y: 180, s: 0.8, label: "Router" },
        r2: { type: "art", kind: "cs.router", x: 270, y: 80, s: 0.8 },
        r3: { type: "art", kind: "cs.router", x: 270, y: 290, s: 0.8 },
        r4: { type: "art", kind: "cs.router", x: 450, y: 80, s: 0.8 },
        r5: { type: "art", kind: "cs.router", x: 450, y: 290, s: 0.8 },
        r6: { type: "art", kind: "cs.router", x: 570, y: 180, s: 0.8 },
        lostX: { type: "text", x: 404, y: 219, anchor: "middle", cls: "seg-label", tone: "red", text: "×" },
        lost:  { type: "text", x: 425, y: 219, cls: "seg-label", tone: "red", text: "packet 3 lost" },
        map:   { type: "text", x: 780, y: 432, anchor: "end", cls: "tick", text: "simplified map" },
        top:   { type: "track", d: "M60,212 L154,208 L314,108 L494,108 L614,208 L712,214" },
        bot:   { type: "track", d: "M60,212 L154,208 L314,318 L494,318 L614,208 L712,214" },
        drop:  { type: "track", d: "M60,212 L154,208 L314,108 L404,213" }
      },
      steps: [
        { caption: "The packets travel through routers, boxes that link networks together. Each router reads a packet's address and passes it one hop closer.",
          do: [{ show: ["phone", "laptop", "map"] }, { show: ["l0", "l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8"] }, { show: ["r1", "r2", "r3", "r4", "r5", "r6"], stagger: 120 },
               { flow: { along: "top", art: "cs.packet", artProps: { n: 1 }, s: 0.55, dur: 2400 } }] },
        { caption: "Packets don't all take the same path. A router sends each one whichever way is clear, so they can arrive out of order.",
          do: [{ all: [{ flow: { along: "top", art: "cs.packet", artProps: { n: 2 }, s: 0.55, dur: 2800 } },
                       { flow: { along: "bot", art: "cs.packet", artProps: { n: 4 }, s: 0.55, dur: 1800 } }] }] },
        { caption: "Sometimes a packet gets lost, for example when a router is too busy to handle it.",
          do: [{ flow: { along: "drop", art: "cs.packet", artProps: { n: 3 }, s: 0.55, dur: 1800 } }, { show: ["lostX", "lost"] }] }
      ]
    },
    {
      title: "Back together",
      enter: "slide",
      elements: {
        laptop: { type: "art", kind: "cs.laptop", x: 540, y: 140, s: 1.4, label: "Your friend's laptop" },
        phone:  { type: "art", kind: "cs.phone", photo: true, x: 50, y: 280, s: 0.9, label: "You" },
        arrL:   { type: "text", x: 60, y: 60, cls: "eqlabel", text: "PACKETS THAT ARRIVED" },
        p1:     { type: "art", kind: "cs.packet", n: 1, x: 60, y: 80 },
        p4:     { type: "art", kind: "cs.packet", n: 4, x: 140, y: 80 },
        p2:     { type: "art", kind: "cs.packet", n: 2, x: 220, y: 80 },
        p3:     { type: "art", kind: "cs.packet", n: 3, x: 220, y: 80 },
        gap:    { type: "text", x: 252, y: 112, anchor: "middle", cls: "eqbig", tone: "red", text: "?" },
        photo:  { type: "art", kind: "cs.photo", x: 593, y: 158, s: 1.38 },
        done:   { type: "box", x: 170, y: 300, w: 330, h: 100, tone: "green", label: "Packets", sub: "numbered, sent hop by hop, put back in order, and resent if lost" },
        resend: { type: "track", d: "M77,275 C80,200 200,170 252,140" }
      },
      arrows: {
        ask: { d: "M535,235 C400,235 220,245 116,300", label: { text: "please send packet 3 again", x: 340, y: 222 } }
      },
      steps: [
        { caption: "On your friend's laptop, packets 1, 4 and 2 have arrived, in that order.",
          do: [{ show: ["laptop", "arrL"] }, { show: ["p1", "p4", "p2"], stagger: 300 }] },
        { caption: "The numbers show where each packet belongs, so the laptop puts them back in order. There's a gap where packet 3 should be.",
          do: [{ all: [{ move: { id: "p4", to: [300, 80] } }, { move: { id: "p2", to: [140, 80] } }] }, { show: ["gap"] }] },
        { caption: "The laptop notices packet 3 is missing and asks for it again. Your phone sends a new copy.",
          do: [{ show: ["ask", "phone"] }, { flow: { along: "resend", art: "cs.packet", artProps: { n: 3 }, s: 0.6, dur: 1400 } }, { hide: ["gap"] }, { show: ["p3"] }, { pulse: "p3" }] },
        { caption: "With all four packets in place, the laptop rebuilds the photo, exactly as you sent it.",
          do: [{ show: ["photo"] }, { pulse: "laptop" }] },
        { caption: "Everything you send online travels like this: cut into numbered packets, passed router to router, and rebuilt at the other end.",
          do: [{ show: ["done"] }] }
      ]
    }
  ]
});
