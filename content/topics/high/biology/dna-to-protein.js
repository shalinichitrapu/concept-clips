CC.topic({
  id: "dna-to-protein",
  level: "high",
  section: "biology",
  order: 2,
  title: "From DNA to protein",
  summary: "How a cell copies a gene into mRNA and then reads it, three bases at a time, to build a protein.",
  scenes: [
    {
      title: "You are built from proteins",
      elements: {
        body:   { type: "art", kind: "bio.body", x: 90, y: 14 },
        cHair:  { type: "callout", from: [190, 26], to: [330, 40], text: "Hair: keratin" },
        cBlood: { type: "callout", from: [212, 160], to: [330, 120], text: "Blood: hemoglobin carries oxygen" },
        cMus:   { type: "callout", from: [266, 214], to: [330, 200], text: "Muscles: actin and myosin" },
        card:   { type: "box", x: 450, y: 280, w: 320, h: 110, tone: "teal", label: "Proteins", sub: "do most of the work in a cell. Each one is built from a gene's instructions." }
      },
      steps: [
        { caption: "Your hair, your muscles and the hemoglobin that carries oxygen in your blood are all made of proteins.",
          do: [{ show: ["body"] }, { show: ["cHair", "cBlood", "cMus"], stagger: 300 }] },
        { caption: "Each protein is built from instructions in a gene, a section of your DNA. Let's follow how a cell reads one gene.",
          do: [{ show: ["card"] }] }
      ]
    },
    {
      title: "Where it happens",
      enter: "zoom",
      zoomInto: [256, 214],
      elements: {
        cell: { type: "art", kind: "bio.animalCell", ribo: true, x: 100, y: 50, s: 1.3, label: "A body cell" },
        cNuc: { type: "callout", from: [318, 172], to: [530, 90], text: "Nucleus: the DNA stays here" },
        cRib: { type: "callout", from: [435, 212], to: [530, 230], text: "Ribosomes: build proteins" },
        ring: { type: "ring", x: 295, y: 200, r: 56, tone: "violet" }
      },
      steps: [
        { caption: "In your cells, the DNA stays inside the nucleus. But proteins are built outside it, by ribosomes in the cytoplasm.",
          do: [{ show: ["cell"] }, { show: ["cNuc", "cRib"], stagger: 300 }] },
        { caption: "So the cell makes a working copy of the gene, called messenger RNA (mRNA), and sends that out instead. Zoom into the nucleus.",
          do: [{ show: ["ring"] }, { pulse: "ring" }] }
      ]
    },
    {
      title: "Transcription: DNA to mRNA",
      enter: "zoom",
      zoomInto: [295, 200],
      elements: {
        c1: { type: "art", kind: "bio.codon", seq: "ATG", back: "top", x: 40, y: 120 },
        c2: { type: "art", kind: "bio.codon", seq: "TTT", back: "top", x: 140, y: 120 },
        c3: { type: "art", kind: "bio.codon", seq: "GGC", back: "top", x: 240, y: 120 },
        c4: { type: "art", kind: "bio.codon", seq: "TAA", back: "top", x: 340, y: 120 },
        t1: { type: "art", kind: "bio.codon", seq: "TAC", back: "bottom", x: 40, y: 162 },
        t2: { type: "art", kind: "bio.codon", seq: "AAA", back: "bottom", x: 140, y: 162 },
        t3: { type: "art", kind: "bio.codon", seq: "CCG", back: "bottom", x: 240, y: 162 },
        t4: { type: "art", kind: "bio.codon", seq: "ATT", back: "bottom", x: 340, y: 162 },
        m1: { type: "art", kind: "bio.codon", seq: "AUG", back: "top", x: 40, y: 122 },
        m2: { type: "art", kind: "bio.codon", seq: "UUU", back: "top", x: 140, y: 122 },
        m3: { type: "art", kind: "bio.codon", seq: "GGC", back: "top", x: 240, y: 122 },
        m4: { type: "art", kind: "bio.codon", seq: "UAA", back: "top", x: 340, y: 122 },
        lC: { type: "text", x: 444, y: 149, cls: "callout", text: "DNA coding strand" },
        lT: { type: "text", x: 444, y: 183, cls: "callout", text: "DNA template strand" },
        lM: { type: "text", x: 444, y: 151, cls: "callout", tone: "amber", text: "mRNA" },
        rDNA: { type: "box", x: 600, y: 50, w: 170, h: 90, tone: "violet", label: "DNA pairs", sub: "A with T, G with C" },
        rRNA: { type: "box", x: 600, y: 160, w: 170, h: 130, tone: "amber", label: "RNA pairs", sub: "A with U, G with C. RNA has U (uracil) instead of T." },
        inN: { type: "text", x: 40, y: 26, cls: "eqlabel", text: "INSIDE THE NUCLEUS" },
        trOut: { type: "track", d: "M400,300 C480,300 560,330 640,360 L820,380" }
      },
      steps: [
        { caption: "In the nucleus, DNA is two strands of bases: A, T, G and C. They pair up across the middle, A with T and G with C.",
          do: [{ show: ["inN", "c1", "c2", "c3", "c4", "t1", "t2", "t3", "t4", "lC", "lT"] }, { show: ["rDNA"] }] },
        { caption: "To copy a gene, the enzyme RNA polymerase unzips the DNA. Only one strand, the template strand, gets read.",
          do: [{ all: [{ move: { id: "c1", by: [0, -80] } }, { move: { id: "c2", by: [0, -80] } }, { move: { id: "c3", by: [0, -80] } }, { move: { id: "c4", by: [0, -80] } }, { move: { id: "lC", by: [0, -80] } }] }] },
        { caption: "Free RNA bases pair with the template one by one, building a strand of mRNA. This copying step is called transcription.",
          do: [{ show: ["m1", "m2", "m3", "m4"], stagger: 350 }, { show: ["lM"] }] },
        { caption: "The pairing rules are the same with one change: RNA uses U (uracil) where DNA uses T. Wherever the template has A, the mRNA gets U.",
          do: [{ show: ["rRNA"] }, { pulse: "m2" }] },
        { caption: "The mRNA peels away and leaves the nucleus through a pore. The DNA zips back up, ready to be read again.",
          do: [{ all: [{ move: { id: "m1", by: [0, 150] } }, { move: { id: "m2", by: [0, 150] } }, { move: { id: "m3", by: [0, 150] } }, { move: { id: "m4", by: [0, 150] } }, { move: { id: "lM", by: [0, 150] } }] },
               { all: [{ move: { id: "c1", by: [0, 80] } }, { move: { id: "c2", by: [0, 80] } }, { move: { id: "c3", by: [0, 80] } }, { move: { id: "c4", by: [0, 80] } }, { move: { id: "lC", by: [0, 80] } }] },
               { flow: { along: "trOut", token: "mRNA", tone: "amber" } }] }
      ]
    },
    {
      title: "Translation: mRNA to protein",
      enter: "slide",
      elements: {
        rib: { type: "art", kind: "bio.ribosome", x: 20, y: 180 },
        n1:  { type: "art", kind: "bio.codon", seq: "AUG", back: "bottom", x: 60, y: 300 },
        n2:  { type: "art", kind: "bio.codon", seq: "UUU", back: "bottom", x: 160, y: 300 },
        n3:  { type: "art", kind: "bio.codon", seq: "GGC", back: "bottom", x: 260, y: 300 },
        n4:  { type: "art", kind: "bio.codon", seq: "UAA", back: "bottom", x: 360, y: 300 },
        k1:  { type: "text", x: 105, y: 408, anchor: "middle", cls: "tick", text: "codon 1" },
        k2:  { type: "text", x: 205, y: 408, anchor: "middle", cls: "tick", text: "codon 2" },
        k3:  { type: "text", x: 305, y: 408, anchor: "middle", cls: "tick", text: "codon 3" },
        k4:  { type: "text", x: 405, y: 408, anchor: "middle", cls: "tick", text: "codon 4" },
        l1:  { type: "path", px: true, pts: [[105, 168], [205, 168]], tone: "grey", w: 4 },
        l2:  { type: "path", px: true, pts: [[205, 168], [305, 168]], tone: "grey", w: 4 },
        tr1: { type: "art", kind: "bio.trna", seq: "UAC", x: 60, y: 192 },
        tr2: { type: "art", kind: "bio.trna", seq: "AAA", x: 160, y: 192 },
        tr3: { type: "art", kind: "bio.trna", seq: "CCG", x: 260, y: 192 },
        a1:  { type: "art", kind: "bio.aa", text: "Met", x: 83, y: 146 },
        a2:  { type: "art", kind: "bio.aa", text: "Phe", tone: "violet", x: 183, y: 146 },
        a3:  { type: "art", kind: "bio.aa", text: "Gly", tone: "amber", x: 283, y: 146 },
        cT:  { type: "callout", from: [62, 236], to: [40, 120], text: "tRNA", anchor: "middle" },
        cR:  { type: "callout", from: [178, 236], to: [230, 120], text: "Ribosome", anchor: "start" },
        hd:  { type: "text", x: 540, y: 110, cls: "eqlabel", text: "CODON → AMINO ACID" },
        e1:  { type: "text", x: 540, y: 150, cls: "eq", text: "AUG → Met (start)" },
        e2:  { type: "text", x: 540, y: 186, cls: "eq", text: "UUU → Phe" },
        e3:  { type: "text", x: 540, y: 222, cls: "eq", text: "GGC → Gly" },
        e4:  { type: "text", x: 540, y: 258, cls: "eq", text: "UAA → stop" }
      },
      steps: [
        { caption: "In the cytoplasm, a ribosome clamps onto the mRNA.",
          do: [{ show: ["n1", "n2", "n3", "n4"] }, { show: ["rib", "cR"] }] },
        { caption: "The ribosome reads the mRNA three bases at a time. Each group of three is a codon, and most codons stand for one amino acid.",
          do: [{ show: ["k1", "k2", "k3", "k4"], stagger: 200 }, { show: ["hd"] }] },
        { caption: "Reading begins at AUG, the start codon. A transfer RNA (tRNA) with the matching anticodon, UAC, brings the amino acid methionine (Met).",
          do: [{ show: ["tr1", "a1", "cT"] }, { show: ["e1"] }] },
        { caption: "The ribosome shifts one codon. A tRNA with anticodon AAA brings phenylalanine (Phe), and the ribosome bonds it to Met.",
          do: [{ hide: ["cT", "cR"] }, { move: { id: "rib", to: [120, 180] } }, { hide: ["tr1"] }, { show: ["tr2", "a2"] }, { show: ["l1", "e2"] }] },
        { caption: "Next, GGC brings glycine (Gly). The chain grows by one amino acid for every codon read.",
          do: [{ move: { id: "rib", to: [220, 180] } }, { hide: ["tr2"] }, { show: ["tr3", "a3"] }, { show: ["l2", "e3"] }] },
        { caption: "UAA is a stop codon. No tRNA matches it, so the ribosome lets go of the mRNA and releases the finished chain.",
          do: [{ move: { id: "rib", to: [320, 180] } }, { hide: ["tr3"] }, { show: ["e4"] }, { pulse: "n4" }] }
      ]
    },
    {
      title: "Folding into a protein",
      enter: "fade",
      elements: {
        chain: { type: "art", kind: "bio.chain", x: 40, y: 100, label: "Amino acid chain", sub: "usually hundreds long" },
        prot:  { type: "art", kind: "bio.protein", x: 540, y: 40, label: "Folded protein" },
        dna:   { type: "box", x: 40, y: 320, w: 170, h: 80, tone: "violet", label: "DNA", sub: "in the nucleus" },
        mrna:  { type: "box", x: 315, y: 320, w: 170, h: 80, tone: "amber", label: "mRNA", sub: "a working copy" },
        pro:   { type: "box", x: 590, y: 320, w: 170, h: 80, tone: "teal", label: "Protein", sub: "does the job" }
      },
      arrows: {
        fold: { from: "chain", to: "prot", sides: ["r", "l"], off: [0, 0], label: { text: "folds", x: 478, y: 104 } },
        tx:   { from: "dna", to: "mrna", label: { text: "transcription", x: 262, y: 350 } },
        tl:   { from: "mrna", to: "pro", label: { text: "translation", x: 537, y: 350 } }
      },
      steps: [
        { caption: "A real gene is much longer than our example. A typical protein is a chain of hundreds of amino acids, in the exact order set by the codons.",
          do: [{ show: ["chain"] }] },
        { caption: "The chain folds into a precise 3D shape, and the shape decides the job: carrying oxygen, contracting a muscle, digesting food.",
          do: [{ show: ["fold"] }, { show: ["prot"] }] },
        { caption: "In short: in the nucleus, DNA is transcribed into mRNA. At a ribosome, the mRNA is translated into a protein.",
          do: [{ show: ["dna"] }, { show: ["tx", "mrna"] }, { show: ["tl", "pro"] }] }
      ]
    }
  ]
});
