# Concept Clips

Short animated explainers for middle and high school subjects. Students pick a level, a section
(Math, Biology...) and a topic, then watch or step through a clip made of a few animated scenes.

**Live site:** https://shalinichitrapu.github.io/concept-clips/

It's a static website with no server, accounts or database. The build bundles everything into a
single `dist/index.html`, which works from any static host or straight from disk.

## Run it

```bash
npm install          # only needed for the tests (Playwright)
npm run build        # writes dist/index.html
open dist/index.html
```

Every page has its own link: `#high` (home), `#high.math` (a section) and
`#high.math.manhattan-distance` (a topic).

**Read aloud:** the player can read each step's caption in a natural voice. Every caption is
recorded ahead of time with Kokoro, a free open-source voice model (see
[tools/tts/README.md](tools/tts/README.md)), so every student hears the same voice on any
device. Autoplay waits for the voice to finish before moving on, and math and science symbols
are turned into words first, so "CO₂" and "πr²" are pronounced correctly.

## Host it

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/pages.yml`). You can also run it by hand from the repository's Actions tab.

To host it somewhere else, upload `dist/index.html` to any static host, such as Vercel, Netlify
or Cloudflare Pages. No configuration is needed, because routing uses the URL hash.

## Add or change a topic

See [docs/AUTHORING.md](docs/AUTHORING.md). In short: add a file under
`content/topics/<level>/<section>/`, using only the renderer's elements and actions plus drawings
from `src/art/`, then run the checks.

## Check it

```bash
npm test                              # every topic and the app pages
node tests/check.mjs high.math        # just some topics
```

The checks validate each topic file, look for overlapping or clipped text at every step, play
every clip with real animations, and save screenshots in light and dark mode to `tests/out/`.
They use your installed Google Chrome; set `CC_BROWSER_CHANNEL=chromium` to use Playwright's
own browser instead.

## Layout

```
src/core.js          shared namespace and SVG helpers
src/renderer.js      draws scenes and plays steps; validates topic files
src/player.js        caption, controls, step dots, scene list
src/speakable.js     turns captions into words a voice can read ("CO₂" → "C O 2")
src/narration.js     read aloud: plays recordings, falls back to the browser voice
src/app.js           pages, routing, middle/high switch
src/art/             illustration library (core.js plus one file per section)
src/styles.css       all styles, as light and dark theme tokens
content/catalog.js   levels and sections
content/topics/      one file per topic: <level>/<section>/<id>.js
content/audio/       recorded narration (MP3s plus manifest.json)
scripts/build.mjs    bundles everything into dist/
scripts/captions.mjs lists every caption to record
tools/tts/           records the narration (Python, run locally)
tests/check.mjs      browser checks and screenshots
```
