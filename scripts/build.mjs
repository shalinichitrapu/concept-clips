// Bundles the app into self-contained single files, so it can be hosted anywhere
// (or opened straight from disk) with no server and no build tools at runtime.
//   dist/index.html    a full HTML document, for hosting
//   dist/preview.html  the same page without <html>/<head>/<body>, for an Artifact preview
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = p => fs.readFileSync(path.join(root, p), "utf8");
function walk(dir) {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith(".js") ? [path.join(dir, e.name)] : []);
}

// sections: limit the bundle to these sections' topics and illustrations (used by tests,
// so people working on different sections at the same time don't affect each other).
// out: write only a full HTML document to this path instead of dist/.
export function build({ sections = null, out = null } = {}) {
  const inSection = f => !sections || sections.some(s => f.includes(`/${s}/`) || f.endsWith(`/${s}.js`));
  const art = ["src/art/core.js", ...walk("src/art").filter(f => !f.endsWith("core.js") && inSection(f)).sort()];
  const topics = walk("content/topics").filter(inSection).sort();
  const scripts = ["src/core.js", ...art, "src/renderer.js", "src/narration.js", "src/player.js", "content/catalog.js", ...topics, "src/app.js"];
  const inline = f => `<script>/* ${f} */\n${read(f).replace(/<\/script/gi, "<\\/script")}\n</script>`;

  const shell = read("src/shell.html").replace("/*STYLES*/", () => read("src/styles.css"));
  const [head, body] = shell.split("<!--BODY-->");
  const bodyWithScripts = body.replace("<!--SCRIPTS-->", () => scripts.map(inline).join("\n"));

  const full = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head.trim()}\n</head>\n<body>\n${bodyWithScripts.trim()}\n</body>\n</html>\n`;
  if (out) { fs.writeFileSync(out, full); return { topics: topics.length, scripts: scripts.length }; }
  fs.mkdirSync(path.join(root, "dist"), { recursive: true });
  fs.writeFileSync(path.join(root, "dist/index.html"), full);
  fs.writeFileSync(path.join(root, "dist/preview.html"), `${head.trim()}\n${bodyWithScripts.trim()}\n`);
  return { topics: topics.length, scripts: scripts.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const r = build();
  console.log(`Built dist/index.html and dist/preview.html (${r.topics} topic files, ${r.scripts} scripts).`);
}
