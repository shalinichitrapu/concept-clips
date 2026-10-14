// Read aloud: speaks each step's caption with the browser's built-in voices (Web Speech API).
// Free, works offline on most devices, and needs no server. Captions full of symbols
// ("CO₂", "πr²", "1/2") are rewritten into words first, so they're pronounced correctly.
(() => {
  const synth = window.speechSynthesis;
  const supported = !!(synth && window.SpeechSynthesisUtterance);
  const KEY = "concept-clips-read-aloud";
  let on = false, voice = null, token = 0;
  try { on = supported && localStorage.getItem(KEY) === "on"; } catch { /* private mode */ }

  // Prefer natural-sounding English voices; fall back to any English voice.
  function pickVoice() {
    const voices = supported ? synth.getVoices() : [];
    const en = voices.filter(v => /^en(-|_|$)/i.test(v.lang));
    const rank = v => (/natural|neural|online/i.test(v.name) ? 0 : /google|samantha|aria|jenny|daniel|karen|serena/i.test(v.name) ? 1 : 2)
      + (/^en[-_]US/i.test(v.lang) ? 0 : .5);
    voice = en.sort((a, b) => rank(a) - rank(b))[0] || null;
  }
  if (supported) { pickVoice(); synth.addEventListener?.("voiceschanged", pickVoice); }

  /* ---------- turning captions into speakable words ---------- */
  const SUB = "₀₁₂₃₄₅₆₇₈₉", SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const digits = (s, set) => [...s].map(c => set.indexOf(c)).join("");
  const DENOM = { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["fourth", "fourths"], 5: ["fifth", "fifths"],
    6: ["sixth", "sixths"], 8: ["eighth", "eighths"], 10: ["tenth", "tenths"], 12: ["twelfth", "twelfths"], 16: ["sixteenth", "sixteenths"], 100: ["hundredth", "hundredths"] };
  const SYMBOLS = [
    [/m\/s²/g, " meters per second squared"], [/m\/s\b/g, " meters per second"],
    [/(\d)\s?°C\b/g, "$1 degrees Celsius"], [/(\d)\s?°F\b/g, "$1 degrees Fahrenheit"], [/°/g, " degrees"],
    [/(\d)\s?Hz\b/g, "$1 hertz"], [/(\d)\s?kg\b/g, "$1 kilograms"], [/(\d)\s?km\b/g, "$1 kilometers"],
    [/(\d)\s?N\b/g, "$1 newtons"], [/(\d)\s?m\b/g, "$1 meters"], [/(\d)\s?ft\b/g, "$1 feet"],
    [/(\d)\s?in²/g, "$1 square inches"], [/(\d)\s?ppm\b/g, "$1 parts per million"],
    [/(\d+):(\d+)\b(?!\s?(am|pm))/gi, "$1 to $2"],
    [/\(\+\)/g, "(plus)"], [/\(−\)/g, "(minus)"],
    [/πr²/g, "pi r squared"], [/π/g, " pi "], [/√/g, " the square root of "], [/θ/g, " theta "], [/λ/g, " lambda "],
    [/×/g, " times "], [/·/g, " times "], [/÷/g, " divided by "], [/ \/ /g, " divided by "], [/≈/g, " about "], [/→/g, " becomes "],
    [/≤/g, " at most "], [/≥/g, " at least "], [/±/g, " plus or minus "],
    [/\s=\s/g, " equals "], [/\s\+\s/g, " plus "], [/(\d)\s?−\s?(\d)/g, "$1 minus $2"], [/\s−\s/g, " minus "], [/−(\d)/g, "minus $1"]
  ];
  function speakable(text) {
    let s = text;
    // |5 − 1| → "the absolute value of 5 minus 1"
    s = s.replace(/\|([^|]{1,30})\|/g, " the absolute value of $1 ");
    s = s.replace(/\b(\d+)\/(\d+)\/(\d+)\b/g, "$1 $2 $3");   // a 50/30/20 split
    // Fractions like 1/2, 3/4 or 6/100.
    s = s.replace(/\b(\d{1,3})\/(\d{1,3})\b/g, (m, a, b) => {
      const d = DENOM[+b];
      return d ? ` ${a} ${+a === 1 ? d[0] : d[1]} ` : ` ${a} over ${b} `;
    });
    // Chemical formulas: CO₂ → "C O 2", C₆H₁₂O₆ → "C 6 H 12 O 6", Na⁺ → "N A plus".
    s = s.replace(/\b(?:[A-Z][a-z]?[₀-₉]*)+[⁺⁻]?(?![A-Za-z])/g, m => {
      if (!/[₀-₉⁺⁻]/.test(m)) return m;
      return " " + m.match(/[A-Z][a-z]?|[₀-₉]+|[⁺⁻]/g)
        .map(p => /[₀-₉]/.test(p) ? digits(p, SUB) : p === "⁺" ? "plus" : p === "⁻" ? "minus" : p.toUpperCase().split("").join(" "))
        .join(" ") + " ";
    });
    s = s.replace(/([a-z])([₀-₉]+)/g, (m, v, d) => `${v} ${digits(d, SUB)}`);   // x₁ → "x 1"
    for (const [re, to] of SYMBOLS) s = s.replace(re, to);
    s = s.replace(/²/g, " squared").replace(/³/g, " cubed")
         .replace(/[⁰¹⁴-⁹]+/g, m => ` to the power ${digits(m, SUP)}`)
         .replace(/⁺/g, " plus").replace(/⁻/g, " minus");
    s = s.replace(/\s{2,}/g, " ").replace(/\b(pi|theta|lambda) \(\1\)/g, "$1")                                  // "θ (theta)" said once
         .replace(/\b1 (degree|kilogram|meter|kilometer|newton|foot|hertz)s?\b/g, (m, u) => `1 ${u}`)
         .replace(/\b1 feet\b/g, "1 foot")
         .replace(/\ba ([\d.,]+) (degree|kilogram|meter|kilometer|newton)s\b/g, "a $1 $2");   // "a 15 kilogram cart"
    return s.replace(/\s+([,.;:!?])(?=\s|$)/g, "$1").replace(/\s{2,}/g, " ").trim();
  }

  /* ---------- speaking ---------- */
  // Speaks text one sentence at a time (some voices stop partway through long utterances).
  // Resolves when it finishes, is cancelled, or runs suspiciously long.
  function speak(text) {
    cancel();
    if (!supported) return Promise.resolve();
    const my = ++token;
    const sentences = speakable(text).match(/[^.!?]+[.!?]*/g) || [];
    const limit = 4000 + speakable(text).split(" ").length * 650;
    return new Promise(res => {
      const timer = setTimeout(finish, limit);
      function finish() { clearTimeout(timer); res(); }
      let i = 0;
      (function next() {
        if (my !== token || i >= sentences.length) return finish();
        const u = new SpeechSynthesisUtterance(sentences[i++].trim());
        if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-US";
        u.rate = .95;
        u.onend = next;
        u.onerror = finish;
        synth.speak(u);
      })();
    });
  }
  function cancel() {
    token++;
    if (supported) synth.cancel();
  }

  CC.narration = {
    supported,
    speakable,
    speak,
    cancel,
    get on() { return on; },
    set on(v) {
      on = !!v && supported;
      try { localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* private mode */ }
      if (!on) cancel();
    }
  };
})();
