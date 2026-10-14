// Checks topics in the built app in a real browser:
//   1. validates each topic file (unknown elements, missing ids, caption length...)
//   2. renders every step and looks for overlapping or clipped text
//   3. saves a screenshot of the end of every scene, in light and dark mode
//   4. plays every step with real animations and scene transitions, watching for errors
// Usage:
//   node tests/check.mjs                      every topic plus the app pages
//   node tests/check.mjs high.math            only topics whose key contains "high.math"
//   node tests/check.mjs app                  only the app pages
//   node tests/check.mjs high.math --fast     skip the animated playthrough
// Screenshots and report: tests/out/
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "../scripts/build.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const filter = args.find(a => !a.startsWith("--")) || "";
const fast = args.includes("--fast");
const OUT = path.join(root, "tests/out");
// With a filter, test a private bundle of just the matching sections, so several people (or agents)
// can test different sections at the same time without affecting each other.
const sectionIds = fs.readdirSync(path.join(root, "content/topics/high"));
const sections = filter && filter !== "app" ? sectionIds.filter(id => filter.includes(id)) : [];
const bundle = filter && filter !== "app" ? path.join(OUT, `.bundle-${process.pid}.html`) : path.join(root, "dist/index.html");
const URL = "file://" + bundle;

// Runs in the page: finds text that overlaps other text, boxes or illustrations it doesn't belong to,
// text that spills out of its own box, and anything outside the 800 x 450 canvas.
const AUDIT = () => {
  const S = CC.player.stage.scene, svg = S.root.ownerSVGElement, sr = svg.getBoundingClientRect(), sx = sr.width / 800;
  const visible = e => {
    for (let x = e; x && x !== svg; x = x.parentNode) {
      const cs = getComputedStyle(x);
      if (cs.opacity === "0" || cs.display === "none") return false;
    }
    return true;
  };
  const toPx = b => ({ left: sr.left + b.x * sx, right: sr.left + (b.x + b.w) * sx, top: sr.top + b.y * sx, bottom: sr.top + (b.y + b.h) * sx });
  const shift = (n, r) => { const [ox, oy] = n.off || [0, 0]; return { left: r.left + ox * sx, right: r.right + ox * sx, top: r.top + oy * sx, bottom: r.bottom + oy * sx }; };
  const texts = [...S.root.querySelectorAll("text")].filter(t => t.textContent.trim() && visible(t))
    .map(t => ({ el: t, s: t.textContent, r: t.getBoundingClientRect() }));
  const shapes = Object.entries(S.nodes).filter(([, n]) => n.bx && visible(n.g))
    .map(([id, n]) => ({ id, type: n.type, g: n.g, r: shift(n, toPx(n.bx)) }));
  const inter = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
                          Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const out = (r, pad = 1) => r.left < sr.left - pad || r.right > sr.right + pad || r.top < sr.top - pad || r.bottom > sr.bottom + pad;
  const issues = [], warnings = [];
  const min = 6 * sx * sx;
  for (let i = 0; i < texts.length; i++) {
    const a = texts[i];
    if (out(a.r)) issues.push(`text off the canvas: "${a.s}"`);
    for (let j = i + 1; j < texts.length; j++) {
      const b = texts[j];
      // text inside the same illustration is the illustrator's business
      const sameArt = shapes.some(s => s.type === "art" && s.g.contains(a.el) && s.g.contains(b.el) && !a.el.classList.contains("artlbl") && !b.el.classList.contains("artlbl") && !a.el.classList.contains("sub") && !b.el.classList.contains("sub"));
      if (!sameArt && inter(a.r, b.r) > min) issues.push(`text overlaps text: "${a.s}" / "${b.s}"`);
    }
    for (const s of shapes) {
      const own = s.g.contains(a.el);
      if (s.type === "box") {
        if (!own && inter(a.r, s.r) > min) issues.push(`text "${a.s}" overlaps box "${s.id}"`);
        if (own && (a.r.left < s.r.left || a.r.right > s.r.right || a.r.top < s.r.top || a.r.bottom > s.r.bottom)) issues.push(`text "${a.s}" spills out of box "${s.id}"`);
      } else if (s.type === "art" && !own && inter(a.r, s.r) > 40 * sx * sx) {
        warnings.push(`text "${a.s}" sits on illustration "${s.id}" (fine for callouts and labels on purpose; check the screenshot)`);
      }
    }
  }
  for (const s of shapes) if (out(s.r, 2)) issues.push(`"${s.id}" goes outside the canvas`);
  for (let i = 0; i < shapes.length; i++) for (let j = i + 1; j < shapes.length; j++) {
    const a = shapes[i], b = shapes[j];
    if (a.type === "box" && b.type === "box" && inter(a.r, b.r) > min) issues.push(`boxes "${a.id}" and "${b.id}" overlap`);
  }
  return { issues, warnings };
};

async function openTopic(page, key) {
  await page.evaluate(k => { location.hash = k; }, key);
  await page.waitForFunction(k => CC.player && CC.player.topic && CC.app.keyOf(CC.player.topic) === k, key);
}

const browser = await chromium.launch({ channel: process.env.CC_BROWSER_CHANNEL || "chrome" })
  .catch(() => chromium.launch());
fs.mkdirSync(OUT, { recursive: true });
if (filter && filter !== "app") build({ sections: sections.length ? sections : null, out: bundle });
else build();

const report = { pageErrors: [], topics: {}, app: [] };
async function newPage(scheme, width = 1100) {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, colorScheme: scheme });
  page.on("pageerror", e => report.pageErrors.push(`[${scheme}] ${e.message}`));
  page.on("console", m => { if (m.type() === "error") report.pageErrors.push(`[${scheme}] console: ${m.text()}`); });
  await page.goto(URL);
  await page.waitForFunction(() => window.CC && CC.app);
  await page.evaluate(() => document.fonts.ready);
  return page;
}

const light = await newPage("light");
const dark = await newPage("dark");
const all = await light.evaluate(() => CC.topics.map(t => ({ key: `${t.level}.${t.section}.${t.id}`, errs: CC.validate(t) })));
const keys = new Set();
for (const t of all) if (keys.has(t.key)) report.pageErrors.push(`two topics share the key ${t.key}`); else keys.add(t.key);
const selected = filter === "app" ? [] : all.filter(t => t.key.includes(filter));
if (filter && filter !== "app" && !selected.length) console.log(`No topic matches "${filter}".`);

for (const t of selected) {
  const r = report.topics[t.key] = { validation: t.errs, layout: [], warnings: [], screenshots: [] };
  if (t.errs.length) continue;
  const unrecorded = await light.evaluate(k => {
    const t = CC.topics.find(x => `${x.level}.${x.section}.${x.id}` === k);
    const n = t.scenes.reduce((a, sc) => a + sc.steps.length, 0);
    return [...Array(n).keys()].filter(i => !CC.audio.files[`${k}/${i}`]).map(i => i + 1);
  }, t.key);
  if (unrecorded.length) r.warnings.push(`no read-aloud recording for step${unrecorded.length > 1 ? "s" : ""} ${unrecorded.join(", ")}; run tools/tts/generate.py (the browser voice is used until then)`);
  const dir = path.join(OUT, t.key);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  for (const [scheme, page] of [["light", light], ["dark", dark]]) {
    await openTopic(page, t.key);
    const scenes = await page.evaluate(() => CC.player.stage.flat.map(f => f.scene));
    for (let k = 0; k < scenes.length; k++) {
      await page.evaluate(k => CC.player.rebuild(k), k);
      if (scheme === "light") {
        const a = await page.evaluate(AUDIT);
        a.issues.forEach(s => r.layout.push(`step ${k + 1}: ${s}`));
        a.warnings.forEach(s => { const m = `step ${k + 1}: ${s}`; if (!r.warnings.some(w => w.endsWith(s))) r.warnings.push(m); });
      }
      if (k === scenes.length - 1 || scenes[k + 1] !== scenes[k]) {
        const file = path.join(dir, `scene${scenes[k] + 1}-${scheme}.png`);
        await page.locator(".stage").screenshot({ path: file });
        r.screenshots.push(path.relative(root, file));
      }
    }
  }
  if (!fast) {
    await openTopic(light, t.key);
    const n = await light.evaluate(() => CC.player.stage.flat.length);
    const t0 = Date.now();
    for (let k = 0; k < n; k++) {
      const enter = await light.evaluate(k => k > 0 && CC.player.stage.flat[k].scene !== CC.player.stage.flat[k - 1].scene, k);
      const p = light.evaluate(k => CC.player.goto(k), k);
      if (enter) {
        await light.waitForTimeout(450);
        const file = path.join(dir, `transition-step${k + 1}.png`);
        await light.locator(".stage").screenshot({ path: file });
        r.screenshots.push(path.relative(root, file));
      }
      await p;
    }
    r.playback = `${n} steps animated in ${((Date.now() - t0) / 1000).toFixed(1)}s`;
    const roots = await light.evaluate(() => CC.player.stage.scene.root.ownerSVGElement.querySelectorAll(":scope > g").length);
    if (roots !== 1) r.layout.push(`${roots} scene layers left after playback (expected 1)`);
  }
}

if (!filter || filter === "app") {
  const dir = path.join(OUT, "app");
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const firstTopic = all.find(t => !t.errs.length);
  for (const [scheme, page] of [["light", light], ["dark", dark]]) {
    for (const width of [1100, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const shots = [["home", "high"], ["home-middle", "middle"], ["section", "high.math"]];
      if (firstTopic) shots.push(["topic", firstTopic.key]);
      for (const [name, hash] of shots) {
        await page.evaluate(h => { location.hash = h; }, hash);
        await page.waitForTimeout(300);
        if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1))
          report.app.push(`${name} (${scheme}, ${width}px) scrolls sideways`);
        await page.screenshot({ path: path.join(dir, `${name}-${width}-${scheme}.png`), fullPage: width > 400 });
      }
    }
  }
}
if (!filter || filter === "app") {
  // Read aloud, with a stand-in voice that "speaks" each sentence in 150 ms and records what it said.
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  page.on("pageerror", e => report.pageErrors.push(`[read aloud] ${e.message}`));
  await page.addInitScript(() => {
    window.__spoken = []; window.__played = [];
    // Recordings "play" for 150 ms and are noted instead of heard.
    HTMLMediaElement.prototype.play = function () {
      __played.push(this.src); setTimeout(() => this.onended && this.onended(), 150); return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () {};
    window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
    let cur = null;
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: {
      getVoices: () => [{ name: "Test", lang: "en-US" }], addEventListener() {},
      speak(u) { __spoken.push(u.text); cur = setTimeout(() => u.onend && u.onend(), 150); },
      cancel() { clearTimeout(cur); }
    } });
  });
  const first = all.find(t => !t.errs.length && t.key === "high.math.manhattan-distance") || all.find(t => !t.errs.length);
  await page.goto(URL + "#" + first.key);
  await page.waitForFunction(() => CC.player && CC.player.topic);
  const r = await page.evaluate(async () => {
    const out = {};
    out.buttonShown = !document.querySelector('[data-act="narrate"]').hidden;
    document.querySelector('[data-act="narrate"]').click();
    out.pressed = document.querySelector('[data-act="narrate"]').getAttribute("aria-pressed");
    __spoken.length = 0; __played.length = 0;
    await CC.player.goto(1);
    await new Promise(r => setTimeout(r, 1500));
    const t = CC.player.topic;
    out.file = CC.audio.files[`${t.level}.${t.section}.${t.id}/1`] || null;
    out.played = __played.join(" ");
    out.caption = CC.speakable(CC.player.stage.flat[1].step.caption);
    out.spoken = __spoken.join(" ");
    document.querySelector('[data-act="narrate"]').click();
    out.off = document.querySelector('[data-act="narrate"]').getAttribute("aria-pressed");
    return out;
  });
  if (!r.buttonShown) report.app.push("read aloud: the button is hidden although speech is available");
  if (r.pressed !== "true" || r.off !== "false") report.app.push("read aloud: the button doesn't toggle");
  if (r.file) { if (!r.played.endsWith(`audio/${r.file}`) || r.spoken) report.app.push(`read aloud: expected the recording ${r.file}, played "${r.played}", spoke "${r.spoken}"`); }
  else if (r.spoken.replace(/\s+/g, " ").trim() !== r.caption.trim()) report.app.push(`read aloud: expected "${r.caption}", heard "${r.spoken}"`);
  await page.close();
}
await browser.close();
if (bundle.includes(".bundle-")) fs.rmSync(bundle, { force: true });

fs.writeFileSync(path.join(OUT, `report-${filter || "all"}.json`), JSON.stringify(report, null, 2));
let failed = report.pageErrors.length + report.app.length;
for (const [key, r] of Object.entries(report.topics)) {
  const bad = r.validation.length + r.layout.length;
  failed += bad;
  console.log(`${bad ? "FAIL" : "ok  "} ${key}${r.playback ? `  (${r.playback})` : ""}`);
  [...r.validation, ...r.layout].forEach(m => console.log(`       ${m}`));
  r.warnings.forEach(m => console.log(`       warning: ${m}`));
}
report.pageErrors.forEach(m => console.log(`ERROR ${m}`));
report.app.forEach(m => console.log(`APP   ${m}`));
console.log(failed ? `\n${failed} problem(s). Screenshots: tests/out/` : `\nAll checks passed. Screenshots: tests/out/`);
process.exit(failed ? 1 : 0);
