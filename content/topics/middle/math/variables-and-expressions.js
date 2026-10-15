CC.topic({
  id: "variables-and-expressions",
  level: "middle",
  section: "math",
  order: 2,
  title: "Variables and expressions",
  summary: "How a letter like x can stand for a number you don't know yet, shown with closed bags of marbles.",
  scenes: [
    {
      title: "Bags of marbles",
      elements: {
        bagQ:  { type: "art", kind: "math.bag", text: "?", x: 60, y: 100 },
        bag1:  { type: "art", kind: "math.bag", x: 60, y: 100 },
        bag2:  { type: "art", kind: "math.bag", x: 150, y: 100 },
        bag3:  { type: "art", kind: "math.bag", x: 240, y: 100 },
        m1:    { type: "art", kind: "math.marble", x: 340, y: 158 },
        m2:    { type: "art", kind: "math.marble", x: 374, y: 158 },
        bagsL: { type: "text", x: 185, y: 226, anchor: "middle", cls: "seg-label", tone: "violet", text: "3 bags: 3x" },
        mL:    { type: "text", x: 370, y: 226, anchor: "middle", cls: "seg-label", tone: "teal", text: "2 marbles" },
        eqL:   { type: "text", x: 230, y: 290, anchor: "middle", cls: "eqlabel", text: "MARBLES IN ALL" },
        eq:    { type: "text", x: 230, y: 326, anchor: "middle", cls: "eqbig", text: "3x + 2" },
        varB:  { type: "box", x: 480, y: 80, w: 290, h: 110, tone: "violet", label: "Variable", sub: "a letter, like x, that stands for a number you don't know yet" },
        expB:  { type: "box", x: 480, y: 220, w: 290, h: 110, tone: "yellow", label: "Expression", sub: "numbers and letters joined by signs like + and ×, such as 3x + 2" }
      },
      steps: [
        { caption: "This bag holds some marbles, but it's tied shut. You can't see how many are inside.",
          do: [{ show: ["bagQ"] }, { pulse: "bagQ" }] },
        { caption: "In math, a letter can stand for a number you don't know yet. Call the number of marbles in the bag x. A letter used like this is a variable.",
          do: [{ hide: ["bagQ"] }, { show: ["bag1"] }, { show: ["varB"] }] },
        { caption: "Now take 3 bags that all hold the same number of marbles, x, plus 2 loose marbles.",
          do: [{ show: ["bag2", "bag3"], stagger: 200 }, { show: ["m1", "m2"], stagger: 150 }] },
        { caption: "3 bags hold 3 times x marbles, written 3x. Add the 2 loose ones, and there are 3x + 2 marbles in all.",
          say: "Three bags hold three times x marbles, written three x. Add the two loose ones, and there are three x plus two marbles in all.",
          do: [{ show: ["bagsL", "mL"] }, { show: ["eqL", "eq"] }] },
        { caption: "3x + 2 is called an expression. It describes the total even though you don't know x yet.",
          say: "Three x plus two is called an expression. It describes the total even though you don't know x yet.",
          do: [{ show: ["expB"] }, { pulse: "eq" }] }
      ]
    },
    {
      title: "Open the bags",
      enter: "fade",
      elements: {
        bag1:  { type: "art", kind: "math.bag", x: 60, y: 100, visible: true },
        bag2:  { type: "art", kind: "math.bag", x: 150, y: 100, visible: true },
        bag3:  { type: "art", kind: "math.bag", x: 240, y: 100, visible: true },
        o1:    { type: "art", kind: "math.bag", open: true, text: "4", x: 60, y: 100 },
        o2:    { type: "art", kind: "math.bag", open: true, text: "4", x: 150, y: 100 },
        o3:    { type: "art", kind: "math.bag", open: true, text: "4", x: 240, y: 100 },
        m1:    { type: "art", kind: "math.marble", x: 340, y: 158, visible: true },
        m2:    { type: "art", kind: "math.marble", x: 374, y: 158, visible: true },
        bagsL: { type: "text", x: 185, y: 226, anchor: "middle", cls: "seg-label", tone: "violet", text: "3 bags: 3x", visible: true },
        mL:    { type: "text", x: 370, y: 226, anchor: "middle", cls: "seg-label", tone: "teal", text: "2 marbles", visible: true },
        x4:    { type: "text", x: 185, y: 80, anchor: "middle", cls: "seg-label", tone: "violet", text: "x = 4" },
        e0:    { type: "text", x: 480, y: 92, cls: "eqlabel", text: "MARBLES IN ALL" },
        e1:    { type: "text", x: 480, y: 128, cls: "eqbig", text: "3x + 2" },
        e2:    { type: "text", x: 480, y: 168, cls: "eq", text: "= 3 × 4 + 2" },
        e3:    { type: "text", x: 480, y: 204, cls: "eq", text: "= 12 + 2" },
        e4:    { type: "text", x: 480, y: 246, cls: "eqbig", text: "= 14" },
        evB:   { type: "box", x: 60, y: 280, w: 380, h: 110, tone: "yellow", label: "Evaluating", sub: "putting a number in place of the letter and working out the value" },
        ten:   { type: "box", x: 480, y: 280, w: 290, h: 110, tone: "violet", label: "If x = 10", sub: "3x + 2 = 3 × 10 + 2 = 32 marbles" }
      },
      steps: [
        { caption: "Now open the bags. Each one holds 4 marbles, so this time x = 4.",
          do: [{ hide: ["bag1", "bag2", "bag3"] }, { show: ["o1", "o2", "o3"], stagger: 150 }, { show: ["x4"] }] },
        { caption: "Put 4 in place of x. 3 × 4 + 2 = 12 + 2 = 14, so there are 14 marbles in all.",
          do: [{ show: ["e0", "e1"] }, { show: ["e2"] }, { show: ["e3"] }, { show: ["e4"] }] },
        { caption: "Working out the value like this is called evaluating the expression.",
          do: [{ show: ["evB"] }, { pulse: "e4" }] },
        { caption: "The letter can stand for other numbers too. If each bag held 10 marbles, the same expression would be worth 32.",
          do: [{ show: ["ten"] }, { pulse: "ten" }] }
      ]
    },
    {
      title: "Bags go with bags",
      enter: "slide",
      elements: {
        b1:   { type: "art", kind: "math.bag", x: 50, y: 90 },
        b2:   { type: "art", kind: "math.bag", x: 128, y: 90 },
        n1:   { type: "art", kind: "math.marble", x: 214, y: 148 },
        n2:   { type: "art", kind: "math.marble", x: 246, y: 148 },
        n3:   { type: "art", kind: "math.marble", x: 278, y: 148 },
        b3:   { type: "art", kind: "math.bag", x: 340, y: 90 },
        n4:   { type: "art", kind: "math.marble", x: 422, y: 148 },
        g1:   { type: "text", x: 175, y: 214, anchor: "middle", cls: "seg-label", text: "2x + 3" },
        g2:   { type: "text", x: 400, y: 214, anchor: "middle", cls: "seg-label", text: "x + 1" },
        f1:   { type: "text", x: 245, y: 290, anchor: "middle", cls: "eqbig", text: "2x + 3 + x + 1" },
        f2:   { type: "text", x: 245, y: 334, anchor: "middle", cls: "eqbig", text: "= 3x + 4" },
        bagsL: { type: "text", x: 159, y: 214, anchor: "middle", cls: "seg-label", tone: "violet", text: "3 bags: 3x" },
        mL:   { type: "text", x: 344, y: 214, anchor: "middle", cls: "seg-label", tone: "teal", text: "4 marbles: 4" },
        like: { type: "box", x: 490, y: 80, w: 280, h: 120, tone: "yellow", label: "Like terms", sub: "parts of an expression that can be added together: x's with x's, numbers with numbers" },
        no:   { type: "box", x: 490, y: 230, w: 280, h: 110, tone: "red", label: "3x + 4 is not 7x", sub: "a bag of marbles is not the same as one marble" }
      },
      steps: [
        { caption: "Here are 2 bags and 3 marbles, then 1 more bag and 1 more marble. As an expression, that's 2x + 3 + x + 1.",
          say: "Here are two bags and three marbles, then one more bag and one more marble. As an expression, that's two x plus three plus x plus one.",
          do: [{ show: ["b1", "b2", "n1", "n2", "n3"] }, { show: ["g1"] }, { show: ["b3", "n4"] }, { show: ["g2"] }, { show: ["f1"] }] },
        { caption: "Tidy up: put the bags together and the loose marbles together. Now there are 3 bags and 4 marbles: 3x + 4.",
          say: "Tidy up: put the bags together and the loose marbles together. Now there are three bags and four marbles: three x plus four.",
          do: [{ hide: ["g1", "g2"] },
               { all: [{ move: { id: "b3", to: [206, 90], dur: 1200 } }, { move: { id: "n1", to: [298, 148], dur: 1200 } },
                       { move: { id: "n2", to: [330, 148], dur: 1200 } }, { move: { id: "n3", to: [362, 148], dur: 1200 } },
                       { move: { id: "n4", to: [394, 148], dur: 1200 } }] },
               { show: ["bagsL", "mL"] }, { show: ["f2"] }] },
        { caption: "Bags go with bags and marbles go with marbles. Parts that can be added like this are called like terms.",
          do: [{ show: ["like"] }, { pulse: "f2" }] },
        { caption: "3x and 4 aren't like terms, so 3x + 4 can't be made any shorter. Adding them to get 7x would mix up bags and marbles.",
          say: "Three x and four aren't like terms, so three x plus four can't be made any shorter. Adding them to get seven x would mix up bags and marbles.",
          do: [{ show: ["no"] }] }
      ]
    }
  ]
});
