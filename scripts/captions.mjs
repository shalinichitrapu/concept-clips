// Lists the words to speak for every step of every topic, for recording narration.
//   node scripts/captions.mjs [out.json]
// Each entry is { key: "<level>.<section>.<id>/<step>", text }. The text goes through the
// same pronunciation rules as the player (src/speakable.js), so recordings match captions.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function walk(dir) {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith(".js") ? [path.join(dir, e.name)] : []);
}

globalThis.CC = { topics: [], topic(t) { this.topics.push(t); } };
for (const f of ["src/speakable.js", ...walk("content/topics").sort()])
  vm.runInThisContext(fs.readFileSync(path.join(root, f), "utf8"), { filename: f });

const out = CC.topics.flatMap(t => {
  const key = `${t.level}.${t.section}.${t.id}`;
  let n = 0;
  return t.scenes.flatMap(sc => sc.steps.map(st => ({ key: `${key}/${n++}`, text: CC.speakable(st.say || st.caption) })));
});

const json = JSON.stringify(out, null, 1);
if (process.argv[2]) fs.writeFileSync(process.argv[2], json);
else process.stdout.write(json);
