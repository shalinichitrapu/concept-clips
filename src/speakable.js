// Turns a caption into words a voice can read: "CO₂" → "C O 2", "πr²" → "pi r squared",
// "3/4" → "3 fourths". Used by the player (browser voices) and by scripts/captions.mjs,
// which feeds the same text to the recorded voice, so both always say the same thing.
(() => {
  const root = typeof window !== "undefined" ? window : globalThis;
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
    // Web addresses the way people say them: "https://www.example.com" → "www dot example dot com".
    s = s.replace(/\bhttps?:\/\//g, "")
         .replace(/\b((?:[a-z0-9-]+\.)+(?:com|org|net|edu|gov))\b/gi, m => m.split(".").join(" dot "))
         .replace(/(^|\s)\.(com|org|net|edu|gov)\b/g, "$1dot $2")
         .replace(/\bhttps\b/g, "H T T P S").replace(/\bhttp\b/g, "H T T P");
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

  root.CC.speakable = speakable;
})();
