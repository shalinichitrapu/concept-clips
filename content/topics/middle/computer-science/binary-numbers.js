CC.topic({
  id: "binary-numbers",
  level: "middle",
  section: "computer-science",
  order: 1,
  title: "Binary numbers",
  summary: "How a row of on-off switches can stand for any number, and why computers count in 0s and 1s.",
  scenes: [
    {
      title: "On or off",
      elements: {
        off:  { type: "art", kind: "cs.switch", x: 150, y: 50, s: 1.3, label: "Off" },
        on:   { type: "art", kind: "cs.switch", on: true, x: 320, y: 50, s: 1.3, label: "On" },
        off0: { type: "text", x: 202, y: 325, anchor: "middle", cls: "eqbig", text: "0" },
        on1:  { type: "text", x: 372, y: 325, anchor: "middle", cls: "eqbig", tone: "amber", text: "1" },
        bit:  { type: "box", x: 510, y: 150, w: 250, h: 120, tone: "yellow", label: "1 bit", sub: "one switch: a single 0 or 1. Bit is short for binary digit." }
      },
      steps: [
        { caption: "A light switch has only two positions. It is either off or on, never halfway.",
          do: [{ show: ["off"] }, { show: ["on"] }, { pulse: "on" }] },
        { caption: "Computers use the same idea. They write off as 0 and on as 1.",
          do: [{ show: ["off0", "on1"], stagger: 300 }] },
        { caption: "One switch like this holds one bit: a single 0 or 1.",
          do: [{ show: ["bit"] }] }
      ]
    },
    {
      title: "Switches with values",
      enter: "fade",
      elements: {
        pvL: { type: "text", x: 50, y: 58, cls: "eqlabel", text: "PLACE VALUES" },
        v8:  { type: "text", x: 90, y: 95, anchor: "middle", cls: "lbl", tone: "amber", text: "8" },
        v4:  { type: "text", x: 190, y: 95, anchor: "middle", cls: "lbl", tone: "amber", text: "4" },
        v2:  { type: "text", x: 290, y: 95, anchor: "middle", cls: "lbl", tone: "amber", text: "2" },
        v1:  { type: "text", x: 390, y: 95, anchor: "middle", cls: "lbl", tone: "amber", text: "1" },
        f8:  { type: "art", kind: "cs.switch", x: 50, y: 115 },
        f4:  { type: "art", kind: "cs.switch", x: 150, y: 115 },
        f2:  { type: "art", kind: "cs.switch", x: 250, y: 115 },
        f1:  { type: "art", kind: "cs.switch", x: 350, y: 115 },
        n8:  { type: "art", kind: "cs.switch", on: true, x: 50, y: 115 },
        n4:  { type: "art", kind: "cs.switch", on: true, x: 150, y: 115 },
        n2:  { type: "art", kind: "cs.switch", on: true, x: 250, y: 115 },
        n1:  { type: "art", kind: "cs.switch", on: true, x: 350, y: 115 },
        d8:  { type: "text", x: 90, y: 310, anchor: "middle", cls: "eqbig", text: "0" },
        d4:  { type: "text", x: 190, y: 310, anchor: "middle", cls: "eqbig", text: "0" },
        d2:  { type: "text", x: 290, y: 310, anchor: "middle", cls: "eqbig", text: "0" },
        d1:  { type: "text", x: 390, y: 310, anchor: "middle", cls: "eqbig", text: "0" },
        bnL: { type: "text", x: 50, y: 350, cls: "eqlabel", text: "IN BINARY" },
        b5:  { type: "box", x: 500, y: 85, w: 270, h: 76, tone: "yellow", label: "0101 = 5", sub: "4 + 1" },
        b13: { type: "box", x: 500, y: 180, w: 270, h: 76, tone: "yellow", label: "1101 = 13", sub: "8 + 4 + 1" },
        b15: { type: "box", x: 500, y: 275, w: 270, h: 90, tone: "green", label: "1111 = 15", sub: "8 + 4 + 2 + 1, the most four switches can make" }
      },
      steps: [
        { caption: "Now line up four switches, all off. Give them values 1, 2, 4 and 8, starting from the right. Each value is double the one before it.",
          do: [{ show: ["f8", "f4", "f2", "f1", "d8", "d4", "d2", "d1", "bnL"] }, { show: ["pvL", "v1", "v2", "v4", "v8"], stagger: 250 }] },
        { caption: "To make 5, turn on the 4 and the 1, because 4 + 1 = 5. Read the switches from left to right: 0101.",
          do: [{ all: [{ hide: ["f4", "f1"] }, { show: ["n4", "n1"] }, { text: { id: "d4", text: "1" } }, { text: { id: "d1", text: "1" } }] }, { show: ["b5"] }] },
        { caption: "To make 13, also turn on the 8: 8 + 4 + 1 = 13. So 13 in binary is 1101.",
          do: [{ all: [{ hide: ["f8"] }, { show: ["n8"] }, { text: { id: "d8", text: "1" } }] }, { show: ["b13"] }] },
        { caption: "With all four on you get 8 + 4 + 2 + 1 = 15. That's the biggest number four switches can show.",
          do: [{ all: [{ hide: ["f2"] }, { show: ["n2"] }, { text: { id: "d2", text: "1" } }] }, { show: ["b15"] }, { pulse: "b15" }] }
      ]
    },
    {
      title: "Counting up",
      enter: "fade",
      elements: {
        pvL: { type: "text", x: 50, y: 58, cls: "eqlabel", text: "PLACE VALUES", visible: true },
        v8:  { type: "text", x: 90, y: 95, anchor: "middle", cls: "lbl", tone: "amber", text: "8", visible: true },
        v4:  { type: "text", x: 190, y: 95, anchor: "middle", cls: "lbl", tone: "amber", text: "4", visible: true },
        v2:  { type: "text", x: 290, y: 95, anchor: "middle", cls: "lbl", tone: "amber", text: "2", visible: true },
        v1:  { type: "text", x: 390, y: 95, anchor: "middle", cls: "lbl", tone: "amber", text: "1", visible: true },
        f8:  { type: "art", kind: "cs.switch", x: 50, y: 115, visible: true },
        f4:  { type: "art", kind: "cs.switch", x: 150, y: 115, visible: true },
        f2:  { type: "art", kind: "cs.switch", x: 250, y: 115, visible: true },
        f1:  { type: "art", kind: "cs.switch", x: 350, y: 115, visible: true },
        n8:  { type: "art", kind: "cs.switch", on: true, x: 50, y: 115 },
        n4:  { type: "art", kind: "cs.switch", on: true, x: 150, y: 115 },
        n2:  { type: "art", kind: "cs.switch", on: true, x: 250, y: 115 },
        n1:  { type: "art", kind: "cs.switch", on: true, x: 350, y: 115 },
        d8:  { type: "text", x: 90, y: 310, anchor: "middle", cls: "eqbig", text: "0", visible: true },
        d4:  { type: "text", x: 190, y: 310, anchor: "middle", cls: "eqbig", text: "0", visible: true },
        d2:  { type: "text", x: 290, y: 310, anchor: "middle", cls: "eqbig", text: "0", visible: true },
        d1:  { type: "text", x: 390, y: 310, anchor: "middle", cls: "eqbig", text: "0", visible: true },
        bnL: { type: "text", x: 50, y: 350, cls: "eqlabel", text: "IN BINARY", visible: true },
        hN:  { type: "text", x: 600, y: 52, anchor: "end", cls: "eqlabel", text: "NUMBER" },
        hB:  { type: "text", x: 640, y: 52, cls: "eqlabel", text: "BINARY" },
        n0:  { type: "text", x: 600, y: 86, anchor: "end", cls: "eq", text: "0" },
        b0:  { type: "text", x: 640, y: 86, cls: "eq", text: "0000" },
        nn1: { type: "text", x: 600, y: 120, anchor: "end", cls: "eq", text: "1" },
        bb1: { type: "text", x: 640, y: 120, cls: "eq", text: "0001" },
        nn2: { type: "text", x: 600, y: 154, anchor: "end", cls: "eq", text: "2" },
        bb2: { type: "text", x: 640, y: 154, cls: "eq", text: "0010" },
        nn3: { type: "text", x: 600, y: 188, anchor: "end", cls: "eq", text: "3" },
        bb3: { type: "text", x: 640, y: 188, cls: "eq", text: "0011" },
        nn4: { type: "text", x: 600, y: 222, anchor: "end", cls: "eq", text: "4" },
        bb4: { type: "text", x: 640, y: 222, cls: "eq", text: "0100" },
        nn5: { type: "text", x: 600, y: 256, anchor: "end", cls: "eq", text: "5" },
        bb5: { type: "text", x: 640, y: 256, cls: "eq", text: "0101" },
        nn6: { type: "text", x: 600, y: 290, anchor: "end", cls: "eq", text: "6" },
        bb6: { type: "text", x: 640, y: 290, cls: "eq", text: "0110" },
        nn7: { type: "text", x: 600, y: 324, anchor: "end", cls: "eq", text: "7" },
        bb7: { type: "text", x: 640, y: 324, cls: "eq", text: "0111" },
        nn8: { type: "text", x: 600, y: 358, anchor: "end", cls: "eqbig", tone: "amber", text: "8" },
        bb8: { type: "text", x: 640, y: 358, cls: "eqbig", tone: "amber", text: "1000" }
      },
      steps: [
        { caption: "Let's count. Start with every switch off: 0000 is 0. To add 1, turn on the 1 switch.",
          do: [{ show: ["hN", "hB", "n0", "b0"] }, { wait: 400 },
               { all: [{ hide: ["f1"] }, { show: ["n1"] }, { text: { id: "d1", text: "1" } }] }, { show: ["nn1", "bb1"] }] },
        { caption: "To make 2, the 1 switch turns off and the 2 switch turns on, like 9 rolling over to 10. Then 3 turns the 1 back on.",
          do: [{ all: [{ hide: ["f2", "n1"] }, { show: ["n2", "f1"] }, { text: { id: "d2", text: "1" } }, { text: { id: "d1", text: "0" } }] }, { show: ["nn2", "bb2"] }, { wait: 500 },
               { all: [{ hide: ["f1"] }, { show: ["n1"] }, { text: { id: "d1", text: "1" } }] }, { show: ["nn3", "bb3"] }] },
        { caption: "The same pattern keeps going: 4, 5, 6, 7. At 8, three switches roll over at once and the 8 switch turns on: 1000.",
          do: [{ all: [{ hide: ["f4", "n2", "n1"] }, { show: ["n4", "f2", "f1"] }, { text: { id: "d4", text: "1" } }, { text: { id: "d2", text: "0" } }, { text: { id: "d1", text: "0" } }] }, { show: ["nn4", "bb4"] }, { wait: 450 },
               { all: [{ hide: ["f1"] }, { show: ["n1"] }, { text: { id: "d1", text: "1" } }] }, { show: ["nn5", "bb5"] }, { wait: 450 },
               { all: [{ hide: ["f2", "n1"] }, { show: ["n2", "f1"] }, { text: { id: "d2", text: "1" } }, { text: { id: "d1", text: "0" } }] }, { show: ["nn6", "bb6"] }, { wait: 450 },
               { all: [{ hide: ["f1"] }, { show: ["n1"] }, { text: { id: "d1", text: "1" } }] }, { show: ["nn7", "bb7"] }, { wait: 600 },
               { all: [{ hide: ["f8", "n4", "n2", "n1"] }, { show: ["n8", "f4", "f2", "f1"] }, { text: { id: "d8", text: "1" } }, { text: { id: "d4", text: "0" } }, { text: { id: "d2", text: "0" } }, { text: { id: "d1", text: "0" } }] },
               { show: ["nn8", "bb8"] }, { pulse: "n8" }] }
      ]
    },
    {
      title: "Why computers use binary",
      enter: "slide",
      elements: {
        laptop: { type: "art", kind: "cs.laptop", text: "Hi", x: 30, y: 150, s: 1.2, label: "Computer" },
        chip:   { type: "art", kind: "cs.chip", x: 320, y: 90, s: 1.2, label: "Chip", sub: "billions of tiny switches called transistors", lw: 230 },
        cOn:    { type: "callout", from: [367, 137], to: [345, 60], text: "on = 1", anchor: "end" },
        cOff:   { type: "callout", from: [388, 137], to: [410, 60], text: "off = 0", anchor: "start" },
        hi:     { type: "box", x: 540, y: 80, w: 240, h: 110, tone: "yellow", label: "01001000 01101001", sub: "the word Hi: the letter H, then the letter i" },
        all:    { type: "box", x: 540, y: 215, w: 240, h: 130, tone: "green", label: "All binary", sub: "numbers, text, photos and music are all stored as rows of 0s and 1s" }
      },
      arrows: {
        aIn: { from: "laptop", to: "chip", label: { text: "inside", x: 272, y: 248 } }
      },
      steps: [
        { caption: "Inside every computer is a chip packed with billions of tiny electronic switches called transistors.",
          do: [{ show: ["laptop"] }, { show: ["aIn", "chip"] }] },
        { caption: "Each transistor is either on or off, so each one holds one bit. Two clear states are easy to build and hard to mix up.",
          do: [{ show: ["cOn", "cOff"], stagger: 250 }, { pulse: "chip" }] },
        { caption: "So everything a computer stores is rows of 0s and 1s. Even the word \"Hi\" is two groups of 8 bits.",
          do: [{ show: ["hi"] }, { show: ["all"] }] }
      ]
    }
  ]
});
