CC.topic({
  id: "industrial-revolution",
  level: "high",
  section: "history",
  order: 2,
  title: "The Industrial Revolution",
  summary: "How machines, steam power and railways moved work from homes to factories in Britain between about 1760 and 1840.",
  scenes: [
    {
      title: "Cloth made at home",
      elements: {
        cottage: { type: "art", kind: "hist.cottage", x: 30, y: 100, s: 1.3, label: "A village cottage" },
        wheel:   { type: "art", kind: "hist.spinningWheel", x: 330, y: 214, s: 1.1, label: "Spinning wheel", sub: "one thread at a time", lw: 160 },
        spinner: { type: "art", kind: "person", tone: "violet", x: 462, y: 254 },
        dom:     { type: "box", x: 540, y: 90, w: 240, h: 110, tone: "amber", label: "Domestic system", sub: "merchants brought raw cotton or wool to homes and collected the finished cloth" }
      },
      steps: [
        { caption: "In the mid-1700s, most people in Britain lived in villages. Cloth was made in their homes, in what historians call the domestic system, or cottage industry.",
          do: [{ show: ["cottage"] }, { show: ["dom"] }] },
        { caption: "Families spun cotton or wool into thread on spinning wheels, one thread at a time, then wove the thread into cloth on hand looms. It was slow work.",
          do: [{ show: ["wheel", "spinner"] }, { pulse: "wheel" }] }
      ]
    },
    {
      title: "Machines and mills",
      enter: "slide",
      elements: {
        threads: { type: "meter", x: 40, y: 110, w: 400, total: 120, value: 1, label: "Threads one worker could spin at once", format: "{v}", tone: "amber" },
        jenny:   { type: "box", x: 40, y: 164, w: 400, h: 84, tone: "amber", label: "Spinning jenny, about 1764", sub: "James Hargreaves: 8 threads at once, later over 100" },
        frame:   { type: "box", x: 40, y: 270, w: 400, h: 84, tone: "blue", label: "Water frame, 1769", sub: "Richard Arkwright: big machines turned by a water wheel" },
        mill:    { type: "art", kind: "hist.mill", x: 520, y: 130, s: 1.1, label: "Cromford Mill, 1771", sub: "one of the first factories", lw: 240 }
      },
      steps: [
        { caption: "From the 1760s, inventors built machines to spin faster. James Hargreaves's spinning jenny let one worker spin 8 threads at once. Later models spun more than 100.",
          do: [{ show: ["threads"] }, { meter: { id: "threads", value: 8, dur: 700 } }, { show: ["jenny"] }, { meter: { id: "threads", value: 100, dur: 1200 } }] },
        { caption: "Richard Arkwright's water frame was too big for a cottage and was driven by a water wheel. In 1771 he opened a mill by a river at Cromford, one of the first factories.",
          do: [{ show: ["frame"] }, { show: ["mill"] }, { pulse: "mill" }] }
      ]
    },
    {
      title: "Steam power",
      enter: "slide",
      elements: {
        engine:  { type: "art", kind: "hist.steamEngine", x: 60, y: 80, s: 1.4, label: "Watt's steam engine", sub: "burns coal to boil water into steam", lw: 280 },
        factory: { type: "art", kind: "hist.factory", x: 450, y: 110, s: 1.25, label: "A steam-powered factory" },
        trCoal:  { type: "track", d: "M20,440 C60,420 90,330 110,300" }
      },
      arrows: {
        pow: { d: "M300,250 C350,250 390,250 440,250", label: { text: "power", x: 370, y: 238 } }
      },
      steps: [
        { caption: "Water power tied mills to fast rivers. In the 1760s and 1770s James Watt improved the steam engine so that it burned far less coal than older designs.",
          do: [{ show: ["engine"] }, { flow: { along: "trCoal", token: "coal", tone: "grey", count: 3 } }] },
        { caption: "By the 1780s Watt's engines could turn wheels and drive machines. Factories no longer needed a river, so they were built in towns, near coal and workers.",
          do: [{ show: ["pow", "factory"] }, { flow: { along: "pow", token: "power", tone: "amber", count: 2 } }, { pulse: "factory" }] }
      ]
    },
    {
      title: "Railways",
      enter: "slide",
      elements: {
        ship:   { type: "art", kind: "hist.ship", x: 50, y: 70, s: .9, label: "Liverpool", sub: "port: raw cotton arrives", lw: 200 },
        mill:   { type: "art", kind: "hist.mill", x: 610, y: 40, s: .65, label: "Manchester", sub: "cotton mills", lw: 200 },
        rail:   { type: "path", px: true, pts: [[20, 296], [780, 296]], tone: "grey", w: 3 },
        train:  { type: "art", kind: "hist.train", x: 30, y: 206, s: 1.1 },
        b1830:  { type: "box", x: 40, y: 330, w: 340, h: 96, tone: "teal", label: "1830", sub: "the Liverpool and Manchester Railway opens, worked entirely by steam" },
        b1850:  { type: "box", x: 420, y: 330, w: 340, h: 96, tone: "amber", label: "By 1850", sub: "about 6,000 miles of railway in Britain" }
      },
      steps: [
        { caption: "Put a steam engine on wheels and you have a locomotive. In 1830 the Liverpool and Manchester Railway opened, linking a busy port with the cotton mills.",
          do: [{ show: ["ship", "mill", "rail", "train"] }, { move: { id: "train", by: [470, 0], dur: 2400 } }, { show: ["b1830"] }] },
        { caption: "Railways carried coal, raw materials, goods and people faster and more cheaply than canals or roads. By 1850 Britain had about 6,000 miles of track.",
          do: [{ show: ["b1850"] }] }
      ]
    },
    {
      title: "Factory towns",
      enter: "slide",
      elements: {
        cottage: { type: "art", kind: "hist.cottage", x: 30, y: 150, s: .7, label: "Village" },
        houses:  { type: "art", kind: "hist.houses", x: 280, y: 160 },
        factory: { type: "art", kind: "hist.factory", x: 520, y: 90 },
        townL:   { type: "text", x: 500, y: 294, anchor: "middle", cls: "artlbl", text: "Factory town" },
        b1:      { type: "box", x: 30, y: 316, w: 230, h: 112, tone: "violet", label: "Towns boom", sub: "by 1851, over half of people in England and Wales lived in towns" },
        b2:      { type: "box", x: 280, y: 316, w: 230, h: 112, tone: "red", label: "Long hours", sub: "often 12 hours or more a day, six days a week" },
        b3:      { type: "box", x: 530, y: 316, w: 240, h: 112, tone: "amber", label: "Child labour", sub: "1833 Factory Act: no children under 9 in textile mills" },
        trMove:  { type: "track", d: "M110,190 C170,120 230,120 290,150" }
      },
      steps: [
        { caption: "Factory jobs drew people from the countryside into fast-growing towns such as Manchester. In 1851, for the first time, more than half the people of England and Wales lived in towns.",
          do: [{ show: ["cottage", "houses", "factory", "townL"] }, { flow: { along: "trMove", art: "person", s: .5, count: 3, gap: 400 } }, { show: ["b1"] }] },
        { caption: "Factory work followed the machines and the clock. Shifts of 12 hours or more, six days a week, were common, and accidents with machinery were frequent.",
          do: [{ show: ["b2"] }] },
        { caption: "Many workers were children, who were cheap to employ. The Factory Act of 1833 banned children under 9 from textile mills and limited the hours of older children.",
          do: [{ show: ["b3"] }] }
      ]
    },
    {
      title: "Production soars",
      enter: "fade",
      elements: {
        title: { type: "text", x: 40, y: 50, cls: "eqlabel", text: "HOURS OF WORK TO SPIN 100 POUNDS OF COTTON" },
        m1:    { type: "meter", x: 40, y: 110, w: 720, total: 50, value: 50, label: "By hand, on a spinning wheel", format: "about 50,000 hours", tone: "grey" },
        m2:    { type: "meter", x: 40, y: 180, w: 720, total: 50, value: 2, label: "Crompton's spinning mule, about 1780", format: "about 2,000 hours", tone: "amber" },
        m3:    { type: "meter", x: 40, y: 250, w: 720, total: 50, value: .3, label: "Self-acting mule, 1825", format: "about 135 hours", tone: "teal" },
        take:  { type: "box", x: 140, y: 310, w: 520, h: 110, tone: "green", label: "Machines + steam + coal", sub: "multiplied what each worker could make. Industrialization then spread from Britain to Europe, the United States and the world." }
      },
      steps: [
        { caption: "How big was the change? Spinning 100 pounds of cotton by hand took about 50,000 hours of work. A spinning mule around 1780 cut that to about 2,000, and by 1825 machines needed only about 135.",
          do: [{ show: ["title", "m1"] }, { wait: 300 }, { show: ["m2"] }, { wait: 300 }, { show: ["m3"] }] },
        { caption: "Machines driven by steam and coal multiplied what each worker could produce. From Britain, industrialization spread to Europe, the United States and the rest of the world.",
          do: [{ show: ["take"] }] }
      ]
    }
  ]
});
