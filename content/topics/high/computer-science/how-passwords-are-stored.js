CC.topic({
  id: "how-passwords-are-stored",
  level: "high",
  section: "computer-science",
  order: 3,
  title: "How passwords are stored",
  summary: "Why good websites never store your password, and how hashing, salting and length keep it safe.",
  scenes: [
    {
      title: "The wrong way",
      elements: {
        pc:    { type: "art", kind: "cs.laptop", x: 20, y: 110, label: "You", sub: "signing up as alice" },
        srv:   { type: "art", kind: "cs.server", x: 290, y: 95, s: 0.9, label: "Website's server" },
        db:    { type: "art", kind: "cs.database", x: 500, y: 100, s: 0.9, label: "Database" },
        hdr:   { type: "text", x: 620, y: 100, cls: "eqlabel", text: "STORED AS IS" },
        u1:    { type: "text", x: 620, y: 132, cls: "eq", text: "alice" },
        p1:    { type: "text", x: 680, y: 132, cls: "eq", tone: "red", text: "sunflower7" },
        u2:    { type: "text", x: 620, y: 162, cls: "eq", text: "bob" },
        p2:    { type: "text", x: 680, y: 162, cls: "eq", tone: "red", text: "letmein" },
        thief: { type: "art", kind: "person", tone: "red", x: 690, y: 230, label: "Attacker" },
        warn:  { type: "box", x: 30, y: 300, w: 560, h: 100, tone: "red", label: "Never store the password itself", sub: "one stolen database would expose every password, and many people reuse passwords on other sites" }
      },
      arrows: {
        send:  { from: "pc", to: "srv", label: { text: "password", x: 240, y: 150 } },
        save:  { from: "srv", to: "db" },
        steal: { d: "M690,262 C650,262 620,240 610,180", dashed: true }
      },
      steps: [
        { caption: "When you sign up, you choose a password and your browser sends it to the website's server, encrypted by HTTPS on the way.",
          do: [{ show: ["pc", "srv"] }, { show: ["send"] }, { flow: { along: "send", token: "sunflower7", tone: "violet" } }] },
        { caption: "Suppose the server saved it exactly as typed. Then its database would hold everyone's real password.",
          do: [{ show: ["save", "db"] }, { show: ["hdr", "u1", "p1", "u2", "p2"] }] },
        { caption: "Databases do get stolen. One breach would expose every password, and many people reuse theirs on other sites.",
          do: [{ show: ["thief", "steal"] }, { show: ["warn"] }] }
      ]
    },
    {
      title: "A hash function",
      enter: "slide",
      elements: {
        grind: { type: "art", kind: "cs.grinder", x: 290, y: 50, s: 1.1, label: "Hash function", sub: "here: SHA-256", lw: 160 },
        in1:   { type: "text", x: 40, y: 100, cls: "eq", text: "sunflower7" },
        in2:   { type: "text", x: 40, y: 140, cls: "eq", text: "sunflower8" },
        out1:  { type: "text", x: 500, y: 225, cls: "eq", tone: "teal", text: "81580afc…" },
        out2:  { type: "text", x: 500, y: 265, cls: "eq", tone: "teal", text: "4725a727…" },
        note:  { type: "text", x: 500, y: 295, cls: "tick", text: "first 8 of 64 characters" },
        lbIn:  { type: "text", x: 40, y: 64, cls: "eqlabel", text: "PASSWORD" },
        lbOut: { type: "text", x: 500, y: 190, cls: "eqlabel", text: "HASH" },
        noX:   { type: "text", x: 400, y: 390, anchor: "middle", cls: "seg-label", tone: "red", text: "× no way back from hash to password" },
        t1:    { type: "track", d: "M140,95 C220,40 300,40 383,80" },
        t2:    { type: "track", d: "M140,135 C220,60 300,50 383,80" },
        o1:    { type: "track", d: "M383,240 C410,250 440,225 495,220" },
        o2:    { type: "track", d: "M383,240 C410,265 440,262 495,260" }
      },
      arrows: {
        back: { d: "M540,310 C520,370 260,380 90,155", dashed: true }
      },
      steps: [
        { caption: "The fix starts with a hash function. Like a grinder, it takes a password and turns it into a scrambled string of fixed length, called a hash.",
          do: [{ show: ["grind", "lbIn", "in1"] }, { flow: { along: "t1", token: "sunflower7", tone: "violet" } }, { flow: { along: "o1", token: "81580afc…", tone: "teal" } }, { show: ["lbOut", "out1", "note"] }] },
        { caption: "The same input always gives the same hash. But change a single character and the hash comes out completely different.",
          do: [{ show: ["in2"] }, { flow: { along: "t2", token: "sunflower8", tone: "violet" } }, { flow: { along: "o2", token: "4725a727…", tone: "teal" } }, { show: ["out2"] }] },
        { caption: "A hash function only works one way. You can't turn ground meat back into a steak, and you can't turn a hash back into the password.",
          do: [{ show: ["back"] }, { show: ["noX"] }] }
      ]
    },
    {
      title: "Logging in",
      enter: "fade",
      elements: {
        db:     { type: "art", kind: "cs.database", x: 40, y: 30, s: 0.7, label: "Database" },
        stL:    { type: "text", x: 130, y: 62, cls: "eqlabel", text: "STORED FOR ALICE" },
        st:     { type: "text", x: 130, y: 94, cls: "eq", tone: "teal", text: "hash: 81580afc…" },
        a1L:    { type: "text", x: 40, y: 200, cls: "eqlabel", text: "ALICE TYPES" },
        a1:     { type: "text", x: 40, y: 232, cls: "eq", text: "sunflower7" },
        g1:     { type: "art", kind: "cs.grinder", x: 175, y: 188, s: 0.42 },
        h1:     { type: "text", x: 290, y: 232, cls: "eq", tone: "teal", text: "81580afc…" },
        ok:     { type: "box", x: 520, y: 190, w: 250, h: 76, tone: "green", label: "Match", sub: "matches the stored hash" },
        a2L:    { type: "text", x: 40, y: 330, cls: "eqlabel", text: "A WRONG GUESS" },
        a2:     { type: "text", x: 40, y: 362, cls: "eq", text: "sunflower" },
        g2:     { type: "art", kind: "cs.grinder", x: 175, y: 318, s: 0.42 },
        h2:     { type: "text", x: 290, y: 362, cls: "eq", tone: "red", text: "8f398886…" },
        no:     { type: "box", x: 520, y: 320, w: 250, h: 76, tone: "red", label: "No match", sub: "doesn't match: wrong password" }
      },
      arrows: {
        c1: { d: "M385,227 L515,227", label: { text: "compare", x: 450, y: 217 } },
        c2: { d: "M385,357 L515,357", label: { text: "compare", x: 450, y: 347 } }
      },
      steps: [
        { caption: "So the site stores only the hash of your password, never the password itself.",
          do: [{ show: ["db"] }, { show: ["stL", "st"] }] },
        { caption: "When you log in, the site hashes what you type and compares it with the stored hash. They match, so you're in.",
          do: [{ show: ["a1L", "a1"] }, { show: ["g1"] }, { show: ["h1"] }, { show: ["c1"] }, { show: ["ok"] }] },
        { caption: "A wrong guess, even one character off, gives a different hash and is rejected. The site checks your password without ever keeping it.",
          do: [{ show: ["a2L", "a2"] }, { show: ["g2"] }, { show: ["h2"] }, { show: ["c2"] }, { show: ["no"] }] }
      ]
    },
    {
      title: "Adding salt",
      enter: "fade",
      elements: {
        nL:  { type: "text", x: 40, y: 70, cls: "eqlabel", text: "WITHOUT SALT" },
        n1u: { type: "text", x: 40, y: 104, cls: "eq", text: "bob" },
        n1h: { type: "text", x: 230, y: 104, cls: "eq", tone: "red", text: "1c8bfe8f…" },
        n2u: { type: "text", x: 40, y: 136, cls: "eq", text: "carol" },
        n2h: { type: "text", x: 230, y: 136, cls: "eq", tone: "red", text: "1c8bfe8f…" },
        same:{ type: "text", x: 350, y: 121, cls: "callout", tone: "red", text: "identical" },
        tbl: { type: "box", x: 490, y: 50, w: 280, h: 110, tone: "red", label: "Precomputed table", sub: "made in advance from millions of common passwords. It reveals that 1c8bfe8f… is letmein." },
        sL:  { type: "text", x: 40, y: 200, cls: "eqlabel", text: "WITH SALT" },
        sLu: { type: "text", x: 40, y: 232, cls: "tick", text: "user" },
        sLs: { type: "text", x: 130, y: 232, cls: "tick", text: "salt" },
        sLh: { type: "text", x: 230, y: 232, cls: "tick", text: "hash of salt + password" },
        s1u: { type: "text", x: 40, y: 264, cls: "eq", text: "bob" },
        s1s: { type: "text", x: 130, y: 264, cls: "eq", tone: "amber", text: "Xq7p" },
        s1h: { type: "text", x: 230, y: 264, cls: "eq", tone: "teal", text: "2b02f2b1…" },
        s2u: { type: "text", x: 40, y: 296, cls: "eq", text: "carol" },
        s2s: { type: "text", x: 130, y: 296, cls: "eq", tone: "amber", text: "b2Rk" },
        s2h: { type: "text", x: 230, y: 296, cls: "eq", tone: "teal", text: "dcfcb9e2…" },
        salt:{ type: "box", x: 490, y: 210, w: 280, h: 120, tone: "green", label: "Salt", sub: "a random string, different for each user, added before hashing. Precomputed tables no longer match." },
        ex:  { type: "text", x: 40, y: 360, cls: "sub", text: "Both bob and carol chose the password letmein. Real salts are longer, often 16 random bytes." }
      },
      steps: [
        { caption: "There's still a problem. Bob and Carol both chose letmein, so their hashes are identical. Attackers also precompute the hashes of millions of common passwords and look them up.",
          do: [{ show: ["nL", "n1u", "n1h", "n2u", "n2h"] }, { show: ["same"] }, { show: ["tbl"] }] },
        { caption: "The fix is a salt: a random string the site creates for each user, adds to the password before hashing, and stores next to the hash.",
          do: [{ show: ["sL", "sLu", "sLs", "sLh", "s1u", "s1s", "s2u", "s2s"] }, { show: ["s1h", "s2h"], stagger: 300 }, { show: ["ex"] }] },
        { caption: "Now the same password gives different hashes, and a precomputed table is useless. An attacker would need a separate table for every possible salt.",
          do: [{ show: ["salt"] }, { pulse: "salt" }] }
      ]
    },
    {
      title: "Longer is stronger",
      enter: "fade",
      elements: {
        as:  { type: "text", x: 40, y: 70, cls: "eqlabel", text: "TIME TO TRY EVERY COMBINATION" },
        as2: { type: "text", x: 40, y: 96, cls: "sub", text: "lowercase letters only, at 10 billion guesses per second" },
        b8:  { type: "box", x: 40, y: 120, w: 230, h: 100, tone: "red", label: "8 letters", sub: "26⁸ ≈ 2 × 10¹¹ options: about 21 seconds" },
        b12: { type: "box", x: 285, y: 120, w: 230, h: 100, tone: "amber", label: "12 letters", sub: "26¹² ≈ 10¹⁷ options: about 110 days" },
        b16: { type: "box", x: 530, y: 120, w: 240, h: 100, tone: "green", label: "16 letters", sub: "26¹⁶ ≈ 4 × 10²² options: about 138,000 years" },
        rule:{ type: "text", x: 400, y: 262, anchor: "middle", cls: "eq", text: "Each extra letter multiplies the work by 26." },
        tk:  { type: "box", x: 120, y: 290, w: 560, h: 110, tone: "yellow", label: "Stay safe", sub: "use a long passphrase and a different one for every site. Good sites store salted hashes made with slow functions like bcrypt or Argon2." }
      },
      steps: [
        { caption: "Even with hashes, attackers who steal a database can guess: hash a guess, compare, repeat. With a fast hash, one computer can try about 10 billion guesses per second.",
          do: [{ show: ["as", "as2"] }] },
        { caption: "Length is what stops them. All 8-letter lowercase passwords can be tried in about 21 seconds. At 12 letters it takes about 110 days.",
          do: [{ show: ["b8"] }, { show: ["b12"] }] },
        { caption: "At 16 letters it would take about 138,000 years, because each extra letter multiplies the work by 26.",
          do: [{ show: ["b16"] }, { show: ["rule"] }] },
        { caption: "So use a long passphrase, different on every site. Good sites store salted hashes made with deliberately slow functions like bcrypt or Argon2.",
          do: [{ show: ["tk"] }] }
      ]
    }
  ]
});
