CC.topic({
  id: "how-a-web-page-loads",
  level: "high",
  section: "computer-science",
  order: 1,
  title: "How a web page loads",
  summary: "What happens between pressing Enter and seeing a page: a DNS lookup, TCP and TLS handshakes, HTTP requests and rendering.",
  scenes: [
    {
      title: "You type an address",
      elements: {
        browser: { type: "art", kind: "cs.browser", url: "https://www.example.com", x: 30, y: 90, s: 1.2 },
        cProto:  { type: "callout", from: [165, 102], to: [140, 58], text: "protocol", anchor: "end" },
        cDom:    { type: "callout", from: [262, 102], to: [290, 58], text: "domain name", anchor: "start" },
        nextL:   { type: "text", x: 510, y: 110, cls: "eqlabel", text: "BEFORE THE PAGE APPEARS" },
        j1:      { type: "text", x: 510, y: 150, cls: "eq", text: "1. Find the IP address (DNS)" },
        j2:      { type: "text", x: 510, y: 190, cls: "eq", text: "2. Connect (TCP, then TLS)" },
        j3:      { type: "text", x: 510, y: 230, cls: "eq", text: "3. Request files (HTTP)" },
        j4:      { type: "text", x: 510, y: 270, cls: "eq", text: "4. Draw the page" }
      },
      steps: [
        { caption: "You type https://www.example.com into the address bar and press Enter. The https is the protocol; www.example.com is the domain name.",
          do: [{ show: ["browser"] }, { show: ["cProto", "cDom"], stagger: 300 }] },
        { caption: "Before anything appears, the browser has four jobs to do, and it usually finishes them in a second or two.",
          do: [{ show: ["nextL"] }, { show: ["j1", "j2", "j3", "j4"], stagger: 250 }] }
      ]
    },
    {
      title: "DNS lookup",
      enter: "slide",
      elements: {
        pc:    { type: "art", kind: "cs.laptop", x: 20, y: 160, label: "Your computer" },
        res:   { type: "art", kind: "cs.server", tone: "sky", x: 330, y: 145, label: "DNS resolver", sub: "run by your ISP or a public service", lw: 190 },
        root:  { type: "art", kind: "cs.server", x: 660, y: 20, s: 0.55, label: "Root server" },
        com:   { type: "art", kind: "cs.server", x: 660, y: 160, s: 0.55, label: ".com server" },
        auth:  { type: "art", kind: "cs.server", tone: "violet", x: 660, y: 300, s: 0.55, label: "example.com server" },
        ip:    { type: "text", x: 260, y: 345, anchor: "middle", cls: "seg-label", tone: "amber", text: "203.0.113.10" },
        ipS:   { type: "text", x: 260, y: 365, anchor: "middle", cls: "tick", text: "(an example IP address)" }
      },
      arrows: {
        q:    { d: "M185,190 C240,170 280,170 325,185", label: { text: "www.example.com?", x: 255, y: 160 } },
        a:    { d: "M325,260 C280,285 240,285 185,265", label: { text: "IP address", x: 255, y: 300 } },
        aR:   { d: "M425,175 C520,120 580,70 650,60", dashed: true },
        aC:   { d: "M425,210 C520,205 580,200 650,200", dashed: true },
        aA:   { d: "M425,245 C520,290 580,335 650,340", dashed: true }
      },
      steps: [
        { caption: "Computers find each other by numeric IP address, not by name. So first comes a DNS lookup: your computer asks a DNS resolver for the address of www.example.com.",
          do: [{ show: ["pc", "res"] }, { show: ["q"] }, { flow: { along: "q", token: "www.example.com?", tone: "sky" } }] },
        { caption: "If the resolver hasn't saved the answer, it asks in turn: a root server, then a .com server, then example.com's own name server, which knows the address.",
          do: [{ show: ["root", "aR"] }, { show: ["com", "aC"] }, { show: ["auth", "aA"] }, { flow: { along: "aA", token: "?", tone: "violet", dur: 900 } }] },
        { caption: "The resolver sends back the IP address. Your computer caches it, so the next visit can skip the lookup.",
          do: [{ show: ["a"] }, { flow: { along: "a", token: "203.0.113.10", tone: "amber" } }, { show: ["ip", "ipS"] }, { pulse: "pc" }] }
      ]
    },
    {
      title: "Opening a connection",
      enter: "fade",
      elements: {
        pc:    { type: "art", kind: "cs.laptop", x: 186, y: 34, s: 0.8, label: "Your computer" },
        srv:   { type: "art", kind: "cs.server", x: 618, y: 26, s: 0.7, label: "Web server", sub: "203.0.113.10" },
        ll:    { type: "path", px: true, pts: [[250, 172], [250, 430]], tone: "grey", w: 2, dashed: true },
        lr:    { type: "path", px: true, pts: [[650, 182], [650, 430]], tone: "grey", w: 2, dashed: true },
        tcpL:  { type: "text", x: 30, y: 245, cls: "eqlabel", text: "TCP HANDSHAKE" },
        tlsL:  { type: "text", x: 30, y: 370, cls: "eqlabel", text: "TLS HANDSHAKE" },
        lock:  { type: "art", kind: "cs.lock", x: 690, y: 330, label: "encrypted" }
      },
      arrows: {
        syn:  { d: "M254,205 L646,205", label: { text: "SYN: can we talk?", x: 450, y: 197 } },
        sa:   { d: "M646,245 L254,245", label: { text: "SYN-ACK: yes, can you hear me?", x: 450, y: 237 } },
        ack:  { d: "M254,285 L646,285", label: { text: "ACK: yes", x: 450, y: 277 } },
        ch:   { d: "M254,335 L646,335", label: { text: "hello + key share", x: 450, y: 327 } },
        sh:   { d: "M646,375 L254,375", label: { text: "certificate + key share", x: 450, y: 367 } },
        fin:  { d: "M254,415 L646,415", label: { text: "finished: encryption on", x: 450, y: 407 } }
      },
      steps: [
        { caption: "Next the browser opens a TCP connection to 203.0.113.10 with a three-way handshake: SYN, SYN-ACK, ACK. Now both sides know the other is listening.",
          do: [{ show: ["pc", "srv", "ll", "lr", "tcpL"] }, { show: ["syn"] }, { show: ["sa"] }, { show: ["ack"] }] },
        { caption: "Because the address starts with https, a TLS handshake follows. The server proves who it is with a certificate, and both sides agree on encryption keys.",
          do: [{ show: ["tlsL"] }, { show: ["ch"] }, { show: ["sh"] }, { show: ["fin"] }, { show: ["lock"] }] }
      ]
    },
    {
      title: "Request and response",
      enter: "fade",
      elements: {
        pc:    { type: "art", kind: "cs.laptop", x: 186, y: 34, s: 0.8, label: "Your computer", visible: true },
        srv:   { type: "art", kind: "cs.server", x: 618, y: 26, s: 0.7, label: "Web server", sub: "203.0.113.10", visible: true },
        ll:    { type: "path", px: true, pts: [[250, 172], [250, 430]], tone: "grey", w: 2, dashed: true, visible: true },
        lr:    { type: "path", px: true, pts: [[650, 182], [650, 430]], tone: "grey", w: 2, dashed: true, visible: true },
        html:  { type: "art", kind: "doc", title: "HTML", x: 60, y: 175, s: 0.8, label: "index.html" },
        css:   { type: "art", kind: "doc", title: "CSS", x: 20, y: 300, s: 0.65, label: "style.css" },
        js:    { type: "art", kind: "doc", title: "JS", x: 95, y: 300, s: 0.65, label: "app.js" },
        img:   { type: "art", kind: "cs.photo", x: 165, y: 307, s: 0.6, label: "photo.jpg" }
      },
      arrows: {
        get:  { d: "M254,205 L646,205", label: { text: "GET /", x: 450, y: 197 } },
        ok:   { d: "M646,245 L254,245", label: { text: "200 OK + HTML", x: 450, y: 237 } },
        get2: { d: "M254,315 L646,315", label: { text: "GET style.css, app.js, photo.jpg", x: 450, y: 307 } },
        ok2:  { d: "M646,355 L254,355", label: { text: "200 OK + the files", x: 450, y: 347 } }
      },
      steps: [
        { caption: "Over the secure connection, the browser sends an HTTP request: GET /, which means \"send me the main page\".",
          do: [{ show: ["get"] }, { flow: { along: "get", token: "GET /", tone: "violet" } }] },
        { caption: "The server answers with the status code 200 OK and the page's HTML: its text and its structure.",
          do: [{ show: ["ok"] }, { flow: { along: "ok", icon: "doc", tone: "violet" } }, { show: ["html"] }] },
        { caption: "The HTML lists other files the page needs: CSS for style, JavaScript for behavior, and images. The browser requests them too, often several at once.",
          do: [{ show: ["get2"] }, { show: ["ok2"] }, { flow: { along: "ok2", icon: "doc", tone: "amber", count: 3, gap: 250 } }, { show: ["css", "js", "img"], stagger: 200 }] }
      ]
    },
    {
      title: "Drawing the page",
      enter: "zoom",
      zoomInto: [250, 80],
      elements: {
        page: { type: "art", kind: "cs.browser", url: "https://www.example.com", loaded: true, x: 30, y: 70, s: 1.2 },
        bH:   { type: "box", x: 510, y: 40, w: 260, h: 74, tone: "violet", label: "HTML: structure", sub: "headings, text, where images go" },
        bC:   { type: "box", x: 510, y: 126, w: 260, h: 74, tone: "teal", label: "CSS: style", sub: "colors, fonts and layout" },
        bJ:   { type: "box", x: 510, y: 212, w: 260, h: 74, tone: "amber", label: "JavaScript: behavior", sub: "what happens when you click" },
        trip: { type: "box", x: 510, y: 310, w: 260, h: 100, tone: "yellow", label: "The whole trip", sub: "DNS → TCP → TLS → HTTP → render, usually in a second or two" }
      },
      steps: [
        { caption: "Finally the browser builds the page. HTML gives the structure, CSS the look, and JavaScript the behavior. Then it paints the pixels on your screen.",
          do: [{ show: ["page"] }, { show: ["bH", "bC", "bJ"], stagger: 300 }] },
        { caption: "Every page you visit repeats this trip: look up the address, connect securely, request the files, and draw them.",
          do: [{ show: ["trip"] }, { pulse: "trip" }] }
      ]
    }
  ]
});
