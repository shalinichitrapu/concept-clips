// Read aloud. Each step's caption is played from a recording made with a natural-sounding voice
// (content/audio, made by tools/tts/generate.py), so every student hears the same clear voice.
// If a caption hasn't been recorded yet, the browser's own voice reads it instead.
(() => {
  const synth = window.speechSynthesis;
  const browserVoice = !!(synth && window.SpeechSynthesisUtterance);
  const recorded = CC.audio && CC.audio.files ? CC.audio.files : {};
  const supported = browserVoice || Object.keys(recorded).length > 0;
  const KEY = "concept-clips-read-aloud";
  let on = false, voice = null, token = 0, audio = null, stop = null;
  try { on = supported && localStorage.getItem(KEY) === "on"; } catch { /* private mode */ }

  // For the fallback: prefer natural-sounding English voices, then any English voice.
  function pickVoice() {
    const voices = browserVoice ? synth.getVoices() : [];
    const en = voices.filter(v => /^en(-|_|$)/i.test(v.lang));
    const rank = v => (/natural|neural|online|premium|enhanced/i.test(v.name) ? 0 : /google/i.test(v.name) ? 1 : 2)
      + (/^en[-_]US/i.test(v.lang) ? 0 : .5);
    voice = en.sort((a, b) => rank(a) - rank(b))[0] || null;
  }
  if (browserVoice) { pickVoice(); synth.addEventListener?.("voiceschanged", pickVoice); }

  function playRecording(file, my) {
    return new Promise(res => {
      const a = audio = new Audio(`audio/${file}`);
      stop = () => res(true);
      a.onended = () => res(true);
      a.onerror = () => res(false);
      a.play().catch(() => res(my !== token));
    });
  }

  // Speaks text one sentence at a time (some voices stop partway through long text).
  function speakWithBrowser(text, my) {
    if (!browserVoice) return Promise.resolve();
    const words = CC.speakable(text);
    const sentences = words.match(/[^.!?]+[.!?]*/g) || [];
    return new Promise(res => {
      const timer = setTimeout(finish, 4000 + words.split(" ").length * 650);
      function finish() { clearTimeout(timer); res(); }
      stop = finish;
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

  // Resolves when the caption has been read, or reading was stopped.
  async function speak(text, key) {
    cancel();
    const my = ++token;
    const file = key && recorded[key];
    if (file && await playRecording(file, my)) return;
    if (my === token) await speakWithBrowser(text, my);
  }
  function cancel() {
    token++;
    if (audio) { audio.pause(); audio = null; }
    if (browserVoice) synth.cancel();
    if (stop) { const s = stop; stop = null; s(); }
  }

  CC.narration = {
    supported,
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
