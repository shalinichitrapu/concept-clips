CC.topic({
  id: "cold-war",
  level: "high",
  section: "history",
  order: 3,
  title: "The Cold War",
  summary: "How the United States and the Soviet Union competed for over 40 years without fighting each other directly.",
  scenes: [
    {
      title: "Two superpowers",
      elements: {
        map:   { type: "art", kind: "hist.mapWorld", layer: "back", x: 20, y: 20 },
        note:  { type: "text", x: 770, y: 342, anchor: "end", cls: "tick", text: "simplified map, not to scale" },
        us:    { type: "circle", px: true, at: [165, 110], r: 30, tone: "blue", w: 3, fill: true },
        su:    { type: "circle", px: true, at: [560, 70], r: 40, tone: "red", w: 3, fill: true },
        usL:   { type: "text", x: 165, y: 162, anchor: "middle", cls: "seg-label", text: "United States" },
        suL:   { type: "text", x: 560, y: 132, anchor: "middle", cls: "seg-label", text: "Soviet Union" },
        rival: { type: "path", px: true, pts: [[197, 104], [300, 60], [420, 52], [518, 64]], tone: "grey", w: 4, dashed: true },
        rivL:  { type: "text", x: 360, y: 40, anchor: "middle", cls: "seg-label", text: "rivalry, but no direct war" },
        bUS:   { type: "box", x: 40, y: 362, w: 340, h: 74, tone: "blue", label: "United States", sub: "capitalism and multiparty democracy" },
        bSU:   { type: "box", x: 420, y: 362, w: 340, h: 74, tone: "red", label: "Soviet Union (USSR)", sub: "communism and one-party rule" }
      },
      steps: [
        { caption: "World War II ended in 1945 with two countries far stronger than any others: the United States and the Soviet Union. They became known as superpowers.",
          do: [{ show: ["map", "note"] }, { show: ["us", "usL"] }, { show: ["su", "suL"] }] },
        { caption: "Their systems were opposites. The US had a capitalist economy and elected governments. The Soviet Union had a communist economy run by a single party. Each feared the other's system would spread.",
          do: [{ show: ["bUS", "bSU"], stagger: 200 }] },
        { caption: "The two never fought each other directly, so the conflict was called a cold war. From the late 1940s to 1991 they competed through threats, weapons, money and allies.",
          do: [{ show: ["rival", "rivL"] }] }
      ]
    },
    {
      title: "A divided Europe",
      enter: "zoom",
      zoomInto: [420, 70],
      elements: {
        map:  { type: "art", kind: "hist.mapEurope", layer: "back", x: 20, y: 20 },
        note: { type: "text", x: 490, y: 444, anchor: "end", cls: "tick", text: "simplified map, not to scale" },
        su:   { type: "circle", px: true, at: [409, 126], r: 22, tone: "red", w: 3, fill: true },
        suL:  { type: "text", x: 409, y: 168, anchor: "middle", cls: "seg-label", text: "Soviet Union" },
        w1:   { type: "circle", px: true, at: [228, 178], r: 9, tone: "red", w: 3, fill: true },
        w2:   { type: "circle", px: true, at: [281, 172], r: 9, tone: "red", w: 3, fill: true },
        w3:   { type: "circle", px: true, at: [258, 204], r: 9, tone: "red", w: 3, fill: true },
        w4:   { type: "circle", px: true, at: [281, 248], r: 9, tone: "red", w: 3, fill: true },
        w5:   { type: "circle", px: true, at: [326, 266], r: 9, tone: "red", w: 3, fill: true },
        w6:   { type: "circle", px: true, at: [328, 313], r: 9, tone: "red", w: 3, fill: true },
        n1:   { type: "circle", px: true, at: [103, 157], r: 9, tone: "blue", w: 3, fill: true },
        n2:   { type: "circle", px: true, at: [140, 251], r: 9, tone: "blue", w: 3, fill: true },
        n3:   { type: "circle", px: true, at: [184, 194], r: 9, tone: "blue", w: 3, fill: true },
        n4:   { type: "circle", px: true, at: [223, 312], r: 9, tone: "blue", w: 3, fill: true },
        n5:   { type: "circle", px: true, at: [165, 167], r: 9, tone: "blue", w: 3, fill: true },
        n6:   { type: "circle", px: true, at: [154, 194], r: 9, tone: "blue", w: 3, fill: true },
        n7:   { type: "circle", px: true, at: [198, 111], r: 9, tone: "blue", w: 3, fill: true },
        n8:   { type: "circle", px: true, at: [194, 40], r: 9, tone: "blue", w: 3, fill: true },
        n9:   { type: "circle", px: true, at: [53, 362], r: 9, tone: "blue", w: 3, fill: true },
        n10:  { type: "circle", px: true, at: [301, 362], r: 9, tone: "blue", w: 3, fill: true },
        n11:  { type: "circle", px: true, at: [409, 370], r: 9, tone: "blue", w: 3, fill: true },
        iron: { type: "path", px: true, pts: [[208, 143], [207, 172], [202, 193], [219, 198], [234, 221], [259, 224], [256, 248], [244, 254], [233, 269]], tone: "grey", w: 5 },
        ironL:{ type: "text", x: 236, y: 292, anchor: "middle", cls: "seg-label", text: "Iron Curtain" },
        berl: { type: "point", px: true, at: [232, 159], tone: "violet", r: 5, label: "Berlin", lx: 10, ly: -4, anchor: "start" },
        kN:   { type: "box", x: 520, y: 30, w: 260, h: 110, tone: "blue", label: "NATO, 1949", sub: "the US, Canada and Western Europe promise to defend each other (map: members by 1955)" },
        kW:   { type: "box", x: 520, y: 160, w: 260, h: 110, tone: "red", label: "Warsaw Pact, 1955", sub: "the Soviet Union and the communist states of Eastern Europe" },
        kB:   { type: "box", x: 520, y: 290, w: 260, h: 110, tone: "violet", label: "Berlin Wall, 1961", sub: "built by East Germany to stop people escaping to the West" }
      },
      steps: [
        { caption: "In Europe, Soviet troops stayed in the eastern countries they had taken from Nazi Germany. By the end of the 1940s, communist governments loyal to Moscow ruled them all.",
          do: [{ show: ["map", "note"] }, { show: ["su", "suL"] }, { show: ["w1", "w2", "w3", "w4", "w5", "w6"], stagger: 100 }] },
        { caption: "In 1946, Winston Churchill warned that an \"iron curtain\" had come down across Europe, cutting the communist East off from the West.",
          do: [{ show: ["iron", "ironL"] }] },
        { caption: "In 1949 the US, Canada and ten Western European countries formed NATO, an alliance for mutual defense. In 1955 the Soviet Union answered with the Warsaw Pact.",
          do: [{ show: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11"], stagger: 80 }, { show: ["kN"] }, { show: ["kW"] }] },
        { caption: "Germany was split into West and East in 1949. Berlin, deep inside East Germany, was split too. In 1961 East Germany built a wall through the city to stop people fleeing west.",
          do: [{ show: ["berl"] }, { pulse: "berl" }, { show: ["kB"] }] }
      ]
    },
    {
      title: "The nuclear arms race",
      enter: "fade",
      scale: 0.007,
      base: 360,
      elements: {
        title: { type: "text", x: 40, y: 36, cls: "eqlabel", text: "ESTIMATED NUCLEAR WARHEADS" },
        kU:    { type: "text", x: 470, y: 36, cls: "legend", swatch: "blue", text: "United States" },
        kS:    { type: "text", x: 620, y: 36, cls: "legend", swatch: "red", text: "Soviet Union" },
        axis:  { type: "axis", x1: 60, x2: 760, y: 360 },
        u50:   { type: "bar", x: 94, w: 50, principal: 300, tone: "blue", prefix: "", label: "US" },
        s50:   { type: "bar", x: 156, w: 50, principal: 5, tone: "red", prefix: "", label: "USSR" },
        u60:   { type: "bar", x: 274, w: 50, principal: 18600, tone: "blue", prefix: "", label: "US" },
        s60:   { type: "bar", x: 336, w: 50, principal: 1600, tone: "red", prefix: "", label: "USSR" },
        u70:   { type: "bar", x: 454, w: 50, principal: 26000, tone: "blue", prefix: "", label: "US" },
        s70:   { type: "bar", x: 516, w: 50, principal: 11600, tone: "red", prefix: "", label: "USSR" },
        u86:   { type: "bar", x: 634, w: 50, principal: 23300, tone: "blue", prefix: "", label: "US" },
        s86:   { type: "bar", x: 696, w: 50, principal: 40000, tone: "red", prefix: "", label: "USSR" },
        y50:   { type: "text", x: 150, y: 412, anchor: "middle", cls: "artlbl", text: "1950" },
        y60:   { type: "text", x: 330, y: 412, anchor: "middle", cls: "artlbl", text: "1960" },
        y70:   { type: "text", x: 510, y: 412, anchor: "middle", cls: "artlbl", text: "1970" },
        y86:   { type: "text", x: 690, y: 412, anchor: "middle", cls: "artlbl", text: "1986" },
        mad:   { type: "box", x: 60, y: 90, w: 330, h: 100, tone: "amber", label: "Mutually assured destruction", sub: "an attack by either side would bring its own destruction too" }
      },
      steps: [
        { caption: "Both sides raced to build nuclear weapons. The US used the first atomic bombs in 1945. The Soviet Union tested its own in 1949, and the arms race began.",
          do: [{ show: ["title", "kU", "kS", "axis"] }, { show: ["u50", "s50", "y50"] }] },
        { caption: "Stockpiles soared into the tens of thousands. Each side could destroy the other many times over. This balance of terror was called mutually assured destruction, or MAD.",
          do: [{ show: ["u60", "s60", "y60"] }, { wait: 300 }, { show: ["u70", "s70", "y70"] }, { wait: 300 }, { show: ["u86", "s86", "y86"] }, { show: ["mad"] }] }
      ]
    },
    {
      title: "Proxy wars and a close call",
      enter: "fade",
      elements: {
        map:  { type: "art", kind: "hist.mapWorld", layer: "back", x: 20, y: 20, visible: true },
        note: { type: "text", x: 770, y: 342, anchor: "end", cls: "tick", text: "simplified map, not to scale", visible: true },
        us:   { type: "circle", px: true, at: [165, 110], r: 30, tone: "blue", w: 3, fill: true, visible: true },
        su:   { type: "circle", px: true, at: [560, 70], r: 40, tone: "red", w: 3, fill: true, visible: true },
        kor:  { type: "point", px: true, at: [648, 118], tone: "amber", r: 8, label: "Korea", lx: 14, ly: 5, anchor: "start" },
        vie:  { type: "point", px: true, at: [603, 170], tone: "amber", r: 8, label: "Vietnam", lx: 14, ly: 5, anchor: "start" },
        cuba: { type: "point", px: true, at: [211, 157], tone: "red", r: 8, label: "Cuba", lx: 14, ly: 12, anchor: "start" },
        bK:   { type: "box", x: 30, y: 358, w: 236, h: 80, tone: "amber", label: "Korean War", sub: "1950–1953, ended in a truce" },
        bV:   { type: "box", x: 282, y: 358, w: 236, h: 80, tone: "amber", label: "Vietnam War", sub: "US troops fought 1965–1973" },
        bC:   { type: "box", x: 534, y: 358, w: 236, h: 80, tone: "red", label: "Cuban Missile Crisis", sub: "October 1962, 13 days" }
      },
      steps: [
        { caption: "Instead of fighting each other, the superpowers backed opposite sides in other countries' wars, called proxy wars. In Korea, US-led UN forces fought communist North Korea and China from 1950 to 1953.",
          do: [{ show: ["kor"] }, { pulse: "kor" }, { show: ["bK"] }] },
        { caption: "In Vietnam, the US fought to stop communist North Vietnam, backed by the Soviet Union and China, from taking over the South. US troops left in 1973, and the North won in 1975.",
          do: [{ show: ["vie"] }, { pulse: "vie" }, { show: ["bV"] }] },
        { caption: "The closest call came in 1962, when the Soviets put nuclear missiles in Cuba, 90 miles from Florida. After 13 tense days they agreed to remove them, and the US secretly removed its missiles from Turkey.",
          do: [{ show: ["cuba"] }, { pulse: "cuba" }, { show: ["bC"] }] }
      ]
    },
    {
      title: "The end of the Cold War",
      enter: "fade",
      elements: {
        line: { type: "path", px: true, pts: [[40, 150], [760, 150]], tone: "grey", w: 4 },
        p45:  { type: "point", px: true, at: [60, 150], tone: "grey", r: 7 },
        p49:  { type: "point", px: true, at: [119, 150], tone: "blue", r: 7 },
        p55:  { type: "point", px: true, at: [208, 150], tone: "red", r: 7 },
        p61:  { type: "point", px: true, at: [296, 150], tone: "violet", r: 7 },
        p62:  { type: "point", px: true, at: [311, 150], tone: "red", r: 7 },
        p89:  { type: "point", px: true, at: [710, 150], tone: "violet", r: 8 },
        p91:  { type: "point", px: true, at: [740, 150], tone: "green", r: 8 },
        t45:  { type: "text", x: 60, y: 184, anchor: "middle", cls: "artlbl", text: "1945" },
        d45:  { type: "text", x: 60, y: 204, anchor: "middle", cls: "sub", text: "WWII ends" },
        t49:  { type: "text", x: 119, y: 104, anchor: "middle", cls: "artlbl", text: "1949" },
        d49:  { type: "text", x: 119, y: 124, anchor: "middle", cls: "sub", text: "NATO" },
        t55:  { type: "text", x: 208, y: 184, anchor: "middle", cls: "artlbl", text: "1955" },
        d55:  { type: "text", x: 208, y: 204, anchor: "middle", cls: "sub", text: "Warsaw Pact" },
        t61:  { type: "text", x: 296, y: 104, anchor: "middle", cls: "artlbl", text: "1961" },
        d61:  { type: "text", x: 296, y: 124, anchor: "middle", cls: "sub", text: "Berlin Wall built" },
        t62:  { type: "text", x: 304, y: 184, anchor: "start", cls: "artlbl", text: "1962" },
        d62:  { type: "text", x: 304, y: 204, anchor: "start", cls: "sub", text: "Cuban Missile Crisis" },
        t89:  { type: "text", x: 700, y: 104, anchor: "middle", cls: "artlbl", text: "1989" },
        d89:  { type: "text", x: 700, y: 124, anchor: "middle", cls: "sub", text: "Berlin Wall falls" },
        t91:  { type: "text", x: 760, y: 184, anchor: "end", cls: "artlbl", text: "1991" },
        d91:  { type: "text", x: 760, y: 204, anchor: "end", cls: "sub", text: "Soviet Union ends" },
        wall: { type: "art", kind: "hist.berlinWall", x: 50, y: 250, label: "Berlin, November 9, 1989" },
        end:  { type: "box", x: 400, y: 260, w: 360, h: 120, tone: "green", label: "December 1991", sub: "the Soviet Union breaks up into 15 independent countries. The Cold War is over." }
      },
      steps: [
        { caption: "Look back over more than four decades of rivalry: rival alliances, a divided Berlin, and a crisis that nearly started a nuclear war.",
          do: [{ show: ["line"] }, { show: ["p45", "t45", "d45", "p49", "t49", "d49", "p55", "t55", "d55", "p61", "t61", "d61", "p62", "t62", "d62"], stagger: 60 }] },
        { caption: "In the 1980s, Soviet leader Mikhail Gorbachev allowed more openness. In 1989 peaceful protests toppled communist rule across Eastern Europe, and on November 9 the Berlin Wall was opened.",
          do: [{ show: ["p89", "t89", "d89"] }, { show: ["wall"] }] },
        { caption: "Germany reunified in 1990. In December 1991 the Soviet Union itself broke up into 15 independent countries, and the Cold War was over.",
          do: [{ show: ["p91", "t91", "d91"] }, { show: ["end"] }] }
      ]
    }
  ]
});
