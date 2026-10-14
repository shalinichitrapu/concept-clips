// Concept Clips player: the stage plus caption, controls, step dots and scene list.
(() => {
  const wait = ms => new Promise(r => setTimeout(r, ms));

  CC.createPlayer = function (root) {
    root.innerHTML = `
      <section class="stage" aria-label="Animated clip">
        <div class="canvas"><svg viewBox="0 0 800 450" role="img"></svg></div>
        <div class="below">
          <div class="caption-row" aria-live="polite">
            <div class="meta"><span class="scene-name"></span><span class="count"></span></div>
            <p class="caption"></p>
          </div>
          <div class="controls">
            <div class="btns">
              <button class="btn" data-act="back" type="button">Back</button>
              <button class="btn primary" data-act="play" type="button">Play</button>
              <button class="btn" data-act="next" type="button">Next</button>
              <button class="btn" data-act="replay" type="button">Replay</button>
              <button class="btn narrate" data-act="narrate" type="button" aria-pressed="false">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path class="wave" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>
                <span>Read aloud</span>
              </button>
            </div>
            <div class="dots"></div>
          </div>
        </div>
      </section>
      <nav class="chapters" aria-label="Scenes"><h2>Scenes</h2><ol></ol></nav>`;
    const q = s => root.querySelector(s);
    const svg = q("svg"), caption = q(".caption");
    svg.id = "stage-" + Math.random().toString(36).slice(2);
    caption.id = svg.id + "-caption";
    svg.setAttribute("aria-labelledby", caption.id);
    const stage = CC.createStage(svg);
    let topic = null, cur = -1, playing = false, speech = Promise.resolve();
    const narr = CC.narration;
    if (!narr.supported) q('[data-act="narrate"]').hidden = true;
    const last = () => stage.flat.length - 1;

    function setCaption(k, animate) {
      const flat = stage.flat, multi = topic.scenes.length > 1, si = k < 0 ? 0 : flat[k].scene;
      caption.textContent = k < 0 ? topic.summary : flat[k].step.caption;
      q(".scene-name").textContent = multi && k >= 0 ? `Scene ${si + 1} of ${topic.scenes.length} · ${topic.scenes[si].title}` : "";
      q(".count").textContent = k < 0 ? `${flat.length} steps` : `Step ${k + 1} of ${flat.length}`;
      if (animate && !CC.reduceMotion) caption.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 350 });
    }
    const sayText = k => stage.flat[k].step.say || stage.flat[k].step.caption;
    function narrate(k) {
      speech = narr.on && k >= 0 ? narr.speak(sayText(k), `${topic.level}.${topic.section}.${topic.id}/${k}`) : Promise.resolve();
      q(".caption-row").classList.toggle("speaking", narr.on && k >= 0);
      speech.then(() => { if (cur === k) q(".caption-row").classList.remove("speaking"); });
    }
    function ui() {
      const nb = q('[data-act="narrate"]');
      nb.setAttribute("aria-pressed", String(narr.on));
      const play = q('[data-act="play"]');
      play.textContent = playing ? "Pause" : (cur >= last() || cur < 0 ? "Play" : "Resume");
      q('[data-act="back"]').disabled = cur <= 0;
      q('[data-act="next"]').disabled = cur >= last();
      root.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("on", i <= cur);
        d.setAttribute("aria-current", i === cur ? "step" : "false");
      });
      const si = cur < 0 ? -1 : stage.flat[cur].scene;
      root.querySelectorAll(".chapters li").forEach((li, i) => li.classList.toggle("current", i === si));
    }
    function rebuild(k) {
      cur = k;
      stage.rebuild(k);
      setCaption(k, false);
      ui();
    }
    async function runStep(k) {
      setCaption(k, true);
      narrate(k);
      ui();
      return stage.runStep(k);
    }
    const hold = k => CC.reduceMotion ? 3000 : Math.max(1800, stage.flat[k].step.caption.split(" ").length * 210);

    async function play() {
      if (cur >= last()) cur = -1;
      playing = true;
      stage.rebuild(cur);
      const my = stage.version;
      ui();
      while (playing && cur < last()) {
        cur++;
        if (!(await runStep(cur))) return;
        if (cur < last()) {
          // With read aloud on, move on once the voice has finished the caption.
          if (narr.on) { await speech; if (my === stage.version && playing) await wait(600); }
          else await wait(hold(cur));
        }
        if (my !== stage.version) return;
      }
      playing = false;
      ui();
    }
    function pause() { playing = false; narr.cancel(); ui(); }
    async function goto(k) {
      playing = false;
      cur = k;
      stage.rebuild(k - 1);
      await runStep(k);
      ui();
    }

    root.addEventListener("click", e => {
      const b = e.target.closest("[data-act]");
      if (!b || b.disabled) return;
      const act = b.dataset.act;
      if (act === "play") playing ? pause() : play();
      else if (act === "next" && cur < last()) goto(cur + 1);
      else if (act === "back" && cur > 0) goto(cur - 1);
      else if (act === "replay") { cur = -1; play(); }
      else if (act === "narrate") toggleNarration();
    });

    function toggleNarration() {
      narr.on = !narr.on;
      // Turning it on reads the current caption straight away.
      if (narr.on && cur >= 0) narrate(cur);
      else q(".caption-row").classList.remove("speaking");
      ui();
    }

    function open(t, { autoplay = false } = {}) {
      topic = t;
      playing = false;
      stage.load(t);
      let k = 0;
      q(".dots").replaceChildren(...t.scenes.map(sc => {
        const grp = document.createElement("div");
        grp.className = "dotgroup";
        sc.steps.forEach(() => {
          const idx = k++;
          const b = document.createElement("button");
          b.className = "dot"; b.type = "button";
          b.setAttribute("aria-label", `Go to step ${idx + 1}`);
          b.addEventListener("click", () => goto(idx));
          grp.appendChild(b);
        });
        return grp;
      }));
      let first = 0;
      q(".chapters ol").replaceChildren(...t.scenes.map((sc, i) => {
        const start = first;
        first += sc.steps.length;
        const li = document.createElement("li");
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = `<span class="num"></span><span class="ttl"></span>`;
        b.querySelector(".num").textContent = i + 1;
        b.querySelector(".ttl").textContent = sc.title;
        b.addEventListener("click", () => goto(start));
        li.appendChild(b);
        return li;
      }));
      q(".chapters").hidden = t.scenes.length < 2;
      // Opens on the finished diagram, so the first frame already shows the whole idea.
      rebuild(last());
      if (autoplay) play();
    }

    return {
      open, play, pause, goto, rebuild, stage,
      stop() { playing = false; narr.cancel(); stage.cancel(); },
      toggleNarration,
      next() { if (cur < last()) goto(cur + 1); },
      back() { if (cur > 0) goto(cur - 1); },
      toggle() { playing ? pause() : play(); },
      get cur() { return cur; },
      get playing() { return playing; },
      get topic() { return topic; }
    };
  };
})();
