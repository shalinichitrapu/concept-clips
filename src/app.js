// Concept Clips app: home, section and topic pages, with a middle/high school switch.
// Routes live in the URL hash so any static host works and every topic has its own link:
//   #high                      home for a level
//   #high.math                 a section
//   #high.math.manhattan-distance   a topic
(() => {
  const { catalog } = CC;
  const view = document.getElementById("view");
  const LEVEL_KEY = "concept-clips-level";

  const valid = CC.topics.filter(t => {
    const errs = CC.validate(t);
    errs.forEach(m => console.error(m));
    return !errs.length;
  });
  const keyOf = t => `${t.level}.${t.section}.${t.id}`;
  const byKey = new Map(valid.map(t => [keyOf(t), t]));
  const topicsFor = (level, section) => valid
    .filter(t => t.level === level && t.section === section)
    .sort((a, b) => (a.order || 99) - (b.order || 99) || a.title.localeCompare(b.title));
  const sectionOf = id => catalog.sections.find(s => s.id === id);
  const levelOf = id => catalog.levels.find(l => l.id === id);

  function savedLevel() { try { return localStorage.getItem(LEVEL_KEY); } catch { return null; } }
  function saveLevel(l) { try { localStorage.setItem(LEVEL_KEY, l); } catch { /* private mode */ } }

  function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    for (const k in props || {}) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const c of kids.flat(Infinity)) if (c != null && c !== false) e.append(c);
    return e;
  }
  function icon(kind) {
    const svg = CC.el("svg", { viewBox: "0 0 80 80", "aria-hidden": "true", class: "icon" });
    CC.ART[kind].draw(CC.el("g", {}, svg), {});
    return svg;
  }
  function minutes(t) {
    let secs = 0;
    t.scenes.forEach(sc => sc.steps.forEach(st => { secs += 2.5 + Math.max(1.8, st.caption.split(" ").length * .21); }));
    const m = Math.max(1, Math.round(secs / 60));
    return `about ${m} min`;
  }
  const stepCount = t => t.scenes.reduce((n, sc) => n + sc.steps.length, 0);

  /* ---------- level switch in the header ---------- */
  let current = { level: "high", section: null, topic: null };
  function renderSwitch() {
    const box = document.getElementById("level-switch");
    box.replaceChildren(...catalog.levels.map(l => h("button", {
      type: "button", class: "seg", "aria-pressed": String(l.id === current.level),
      onclick: () => switchLevel(l.id)
    }, h("span", { class: "seg-name", text: l.name }), h("span", { class: "seg-ages", text: l.ages }))));
  }
  function switchLevel(level) {
    if (level === current.level) return;
    saveLevel(level);
    // Topics differ by level, so a topic page falls back to its section.
    location.hash = current.section ? `${level}.${current.section}` : level;
  }

  /* ---------- pages ---------- */
  function crumbs(items) {
    return h("nav", { class: "crumbs", "aria-label": "Breadcrumb" },
      items.map((it, i) => [i ? h("span", { class: "sep", "aria-hidden": "true", text: "/" }) : null,
        it.href ? h("a", { href: it.href, text: it.text }) : h("span", { "aria-current": "page", text: it.text })]));
  }

  function home(level) {
    const lv = levelOf(level);
    document.title = "Concept Clips";
    return h("div", { class: "page" },
      h("header", { class: "hero" },
        h("h1", { text: "Short animated explainers for school subjects" }),
        h("p", { text: `Pick a subject, then a topic. Each clip takes a minute or two, and you can step through it at your own pace. You're browsing ${lv.name.toLowerCase()} topics.` })),
      h("div", { class: "sections" }, catalog.sections.map(s => {
        const list = topicsFor(level, s.id);
        return h("a", { class: "section-card", href: `#${level}.${s.id}` },
          h("div", { class: "icon-tile" }, icon(s.icon)),
          h("div", { class: "section-body" },
            h("h2", { text: s.name }),
            h("p", { class: "blurb", text: s.blurb[level] }),
            list.length
              ? h("ul", { class: "mini-list" }, list.map(t => h("li", { text: t.title })))
              : h("p", { class: "soon", text: "Topics coming soon" })));
      })));
  }

  function section(level, sid) {
    const s = sectionOf(sid), lv = levelOf(level), list = topicsFor(level, sid);
    document.title = `${s.name} · Concept Clips`;
    return h("div", { class: "page" },
      crumbs([{ text: "All subjects", href: `#${level}` }, { text: s.name }]),
      h("header", { class: "section-head" },
        h("div", { class: "icon-tile big" }, icon(s.icon)),
        h("div", {},
          h("p", { class: "eyebrow", text: lv.name }),
          h("h1", { text: s.name }),
          h("p", { class: "lede", text: s.blurb[level] }))),
      list.length
        ? h("div", { class: "topics" }, list.map(t => h("a", { class: "topic-card", href: `#${keyOf(t)}` },
            h("h2", { text: t.title }),
            h("p", { text: t.summary }),
            h("p", { class: "topic-meta", text: `${t.scenes.length} scene${t.scenes.length > 1 ? "s" : ""} · ${stepCount(t)} steps · ${minutes(t)}` }))))
        : h("p", { class: "empty", text: `${s.name} topics for ${lv.name.toLowerCase()} are coming soon. Try the other level using the switch at the top.` }));
  }

  let player = null, playerHost = null;
  function topicPage(t) {
    const s = sectionOf(t.section), lv = levelOf(t.level), list = topicsFor(t.level, t.section);
    const idx = list.indexOf(t), next = list[idx + 1];
    document.title = `${t.title} · Concept Clips`;
    if (!player) {
      playerHost = h("div", { class: "player" });
      player = CC.createPlayer(playerHost);
      CC.player = player;
    }
    const page = h("div", { class: "page" },
      crumbs([{ text: "All subjects", href: `#${t.level}` }, { text: s.name, href: `#${t.level}.${t.section}` }, { text: t.title }]),
      h("header", { class: "topic-head" },
        h("p", { class: "eyebrow", text: `${s.name} · ${lv.name}` }),
        h("h1", { text: t.title }),
        h("p", { class: "lede", text: t.summary })),
      playerHost,
      h("p", { class: "keys", text: "Keyboard: Space plays or pauses, the left and right arrows step back and forward, and R turns reading aloud on or off." }),
      next
        ? h("a", { class: "up-next", href: `#${keyOf(next)}` },
            h("span", { class: "eyebrow", text: `Next in ${s.name}` }),
            h("span", { class: "up-title", text: next.title }),
            h("span", { class: "up-sum", text: next.summary }))
        : h("a", { class: "up-next", href: `#${t.level}.${t.section}` },
            h("span", { class: "eyebrow", text: "You've reached the end of this list" }),
            h("span", { class: "up-title", text: `All ${s.name} topics` })));
    queueMicrotask(() => player.open(t));
    return page;
  }

  function notFound(level) {
    document.title = "Not found · Concept Clips";
    return h("div", { class: "page" },
      h("h1", { text: "We couldn't find that page" }),
      h("p", { class: "lede" }, "The link may be out of date. ", h("a", { href: `#${level}`, text: "Go to all subjects" }), "."));
  }

  function route() {
    const parts = location.hash.replace(/^#/, "").split(".").filter(Boolean);
    let [level, sid, tid] = parts;
    if (!levelOf(level)) { level = levelOf(savedLevel()) ? savedLevel() : "high"; sid = tid = undefined; }
    else saveLevel(level);
    if (player) player.stop();
    current = { level, section: sid && sectionOf(sid) ? sid : null, topic: tid || null };
    renderSwitch();
    let page;
    if (!sid) page = home(level);
    else if (!sectionOf(sid)) page = notFound(level);
    else if (!tid) page = section(level, sid);
    else page = byKey.has(`${level}.${sid}.${tid}`) ? topicPage(byKey.get(`${level}.${sid}.${tid}`)) : notFound(level);
    view.replaceChildren(page);
    window.scrollTo(0, 0);
  }

  document.addEventListener("keydown", e => {
    if (!current.topic || !player || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest("input, textarea, select")) return;
    if (e.key === " " && !e.target.closest("button, a")) { e.preventDefault(); player.toggle(); }
    else if (e.key === "ArrowRight") player.next();
    else if (e.key === "ArrowLeft") player.back();
    else if (e.key === "r" || e.key === "R") player.toggleNarration();
  });
  document.getElementById("home-link").addEventListener("click", e => { e.preventDefault(); location.hash = current.level; });
  window.addEventListener("hashchange", route);
  CC.app = { route, topics: valid, keyOf };
  route();
})();
