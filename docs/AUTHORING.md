# Writing a topic

A topic is one short animated clip, for example "Manhattan distance" in the Math section. It is
a data file that describes scenes, elements and steps. The renderer (`src/renderer.js`) and the
illustration library (`src/art/`) do all the drawing and animation, which is why every clip
looks and moves the same way. **Never draw or animate anything from a topic file.**

Good examples to copy from:

- `content/topics/high/math/manhattan-distance.js`: 5 scenes, grid elements, fade and zoom transitions
- `content/topics/high/biology/photosynthesis.js`: illustrations, zoom-into transitions, callouts
- `content/topics/middle/civics/how-a-bill-becomes-law.js`: buildings, documents moving, vote meters
- `content/topics/high/personal-finance/compound-interest.js`: bars that grow

## How a clip should feel

- **Start in the physical world, then abstract.** Show the taxi before the formula, the plant
  before the chloroplast, the Capitol before the vote count. Students should be able to map
  every abstract picture back to something real.
- **One idea per step.** Each step changes one thing on screen and the caption says what that
  change means. If a caption needs "and then", it's two steps.
- **Build up, don't swap out.** Within a scene, elements appear and stay. A scene ends on a
  complete diagram that makes sense as a still picture.
- **Scenes move the camera.** Use a new scene when the picture changes. Use `enter: "zoom"` with
  `zoomInto` to go inside something, `"fade"` to change the view of the same thing (the streets
  become a coordinate grid), and `"slide"` to move to the next place or time.
- **End with the takeaway.** The last step states the idea in one line, often with an equation,
  a rule or a "where it's used" card.
- **Size:** 2 to 5 scenes, 8 to 20 steps in total (the validator allows at most 24). Middle
  school clips usually sit at the shorter end.

## Captions

Captions appear under the canvas. They're what students read, so:

- 1 or 2 short sentences, at most 40 words (aim for under 30).
- Plain words. Define each new term the first time it appears ("tiny pores called stomata").
- Speak to the student directly when it helps ("You're at A and want to get to B").
- **Middle school:** everyday words, concrete examples, one new term per step at most, round numbers.
- **High school:** correct technical terms, real values, formulas where they help.
- No emoji, no exclamation marks, no "simply" or "just".
- Check every fact and number. If a picture is simplified (a schematic map, a stylized building),
  say so in a small label such as "simplified map, not to scale".

Canvas text is for **labels only**: names of things, values, short callouts and formulas.

### Read aloud

Students can turn on **Read aloud**, which speaks each caption with the browser's voice. Symbols
are rewritten into words automatically ("CO₂" → "C O 2", "πr²" → "pi r squared", "3/4" →
"3 fourths", "15 N" → "15 newtons", "|5 − 1|" → "the absolute value of 5 minus 1"). If a
caption still wouldn't sound right when read out, give the step a `say` with the exact words to
speak:

```js
{ caption: "Sodium becomes Na⁺.", say: "Sodium becomes a sodium ion, N A plus.", do: [ ... ] }
```

To hear how every caption will be read, open the built app's console and run
`CC.narration.speakable("your caption")`.

## The file

`content/topics/<level>/<section>/<id>.js`, containing exactly one call and no other top-level
code. (All files share one page, so a top-level `const` would clash with other files.)

```js
CC.topic({
  id: "manhattan-distance",          // lowercase-with-dashes, same as the file name
  level: "high",                     // "middle" or "high"
  section: "math",                   // a section id from content/catalog.js
  order: 1,                          // position in the section's list
  title: "Manhattan distance",       // sentence case
  summary: "How far apart two points are when you can only travel along a grid, like a taxi in a city.",
  scenes: [ /* ... */ ]
});
```

`summary` is one sentence under 140 characters. It's shown on the topic card and as the caption
before the clip starts.

## Scenes

```js
{
  title: "Inside a leaf cell",       // shown above the caption and in the scene list
  enter: "zoom",                     // not on the first scene. "fade" (default), "zoom" or "slide"
  zoomInto: [442, 235],              // zoom only: the point in the previous scene to dive into
  grid: { x0: 60, y0: 60, cell: 50, cols: 8, rows: 6 },   // optional; this is the default grid
  scale: 0.15, base: 370,            // only for bar and trend elements
  elements: { /* id: element */ },
  arrows: { /* id: arrow */ },
  steps: [ { caption: "...", do: [ /* actions */ ] } ]
}
```

Each scene starts with every element hidden, unless it has `visible: true`. Use `visible: true` to
carry things over from the previous scene, so a `fade` looks continuous. For example, the Manhattan
distance scenes repeat the same grid, points and routes with `visible: true`.

## The canvas

- The canvas is **800 × 450**, with the origin at the top-left. Keep everything inside it, with
  about 20px of margin.
- Text sizes are fixed by the styles; don't change them. Leave room for labels, which need
  roughly 7–9px per character.
- A common layout puts the main picture on the left (x 40–470) and cards, formulas or legends on
  the right (x 500–780).
- Labels go under illustrations (the `label` and `sub` fields do this for you). Use callouts to
  name parts of an illustration.
- Nothing should overlap except deliberately: a callout pointing into a drawing, or a token
  moving over things.

### Tones

Every colour is one of these tones. Each has a soft fill and a strong stroke, and both work in
light and dark mode:

`yellow`, `blue`, `grey`, `green`, `amber`, `sky`, `red`, `teal`, `violet`

Keep the meanings consistent across clips:
- **blue:** water, liquids
- **sky:** air, gases, light-blue outputs
- **green:** living things, plants, "yes" or "passed"
- **amber:** energy, money, products, highlights
- **yellow:** sunlight, the main route or result
- **red:** danger, stop, heat, oxygen atoms, veto
- **violet:** people, points, the subject of the story
- **teal:** a second category alongside violet or amber
- **grey:** neutral things and background parts

## Elements

Every element has a `type`. Optional on all of them: `visible: true`.

| type | fields | notes |
|---|---|---|
| `art` | `kind`, `x`, `y`, `s` (scale), `label`, `sub`, `lw` (label wrap width), `lx`/`ly` (label offset), `labelAbove`, `tone`, `flip`, `layer: "back"` | An illustration from the library. `x, y` is its top-left; its size is its native size × `s`. Some kinds take extra fields (e.g. `cloud` takes `text`, `soil` takes `drops`). |
| `box` | `x`, `y`, `w`, `h`, `tone`, `label`, `sub` | A rounded card with a title and wrapped subtitle. Use it for definitions, results and takeaways, not for physical things (those are illustrations). |
| `text` | `x`, `y` **or** `at` (grid point) + `dx`, `dy`; `text`; `cls`; `anchor` (`start`/`middle`/`end`); `tone`; `swatch` (a tone, or `"dash"` with `swatchTone`) | Classes: `lbl` (19px bold), `artlbl` (16px bold), `eq` (17px), `eqbig` (21px bold), `eqlabel` (small caps label), `callout` (14px with halo), `seg-label` (15px bold with halo, good on grids), `legend` (14px muted), `sub` (13.5px muted), `tick` (12.5px muted). |
| `callout` | `from: [x, y]`, `to: [x, y]`, `text`, `anchor` | A leader line from a part of a drawing to a label. |
| `track` | `d` (SVG path) | Invisible. A path that tokens (`flow`) or elements (`move`) travel along. |
| `ring` | `x`, `y`, `r`, `tone` | A dotted circle that highlights an area, e.g. before zooming into it. |
| `meter` | `x`, `y`, `w`, `total`, `value`, `need`, `needLabel`, `label`, `tone`, `format` | A horizontal progress bar with an optional threshold mark. `format` like `"{v}%"` or `"{v} of {total}"`. |
| `grid` | `style: "city"` or `"plane"`, `axes`, `xLabel`, `yLabel` | Uses the scene's `grid`. A plane has axes and numbers unless `axes: false`. |
| `point` | `at: [gx, gy]`, `tone`, `label`, `lx`, `ly`, `anchor`, `r` | A dot on the grid. Add `px: true` to use pixel coordinates. |
| `path` | `pts: [[gx, gy], ...]`, `tone`, `w`, `dashed`, `opacity`, `px` | A route or line through grid points (or pixel points with `px: true`). Solid paths draw themselves in. |
| `circle` | `at`, `r` (grid units), `tone`, `w`, `dashed`, `fill`, `px` | |
| `bar`, `axis`, `trend` | see compound-interest | Growing bar charts. Need `scene.scale` and `scene.base`. |

### Arrows (`scene.arrows`)

```js
a1: { from: "house", to: "senate" }                     // between two box or art elements
a2: { from: "pres", to: "law", sides: ["b", "t"], off: [35, 35], label: { text: "signs", x: 768, y: 236 } }
a3: { d: "M555,262 C600,262 600,345 636,345", label: { text: "signs", x: 566, y: 318 } }   // any path
a4: { from: "a", to: "b", dashed: true }
a5: { from: "a", to: "b", visible: true }                // already drawn when the scene starts
```

`sides` picks the edges (`t`, `b`, `l`, `r`); `off` shifts each end along its edge. Arrows draw
themselves in when shown, and tokens can travel along them.

## Actions (`step.do`)

Actions in a step run one after another. Wrap them in `all` to run them at the same time.

| action | example | what it does |
|---|---|---|
| `show` | `{ show: ["a", "b"], stagger: 150 }` | Fades elements in (paths and arrows draw in). `stagger` reveals them one by one. |
| `hide` | `{ hide: ["a"] }` | Fades elements out. |
| `flow` | `{ flow: { along: "trackOrArrow", token: "H₂O", tone: "blue", count: 3, dur: 1200, gap: 300 } }` | Sends labelled pills along a path. Use `icon: "doc"` for a document, or `art: "coin", s: .5` to send a small illustration (`artProps: {...}` passes options to it, like an element's fields). Tokens vanish at the end: they show movement, not new state. |
| `move` | `{ move: { id: "earth", along: "orbit", dur: 2000 } }`, `{ move: { id: "plate", by: [-60, 0] } }`, `{ move: { id: "x", to: [300, 120] } }` | Moves an element and leaves it there. `to` is the new top-left for art and boxes, or the new centre for anything else. |
| `text` | `{ text: { id: "temp", text: "15 °C" } }` | Changes a text element's words, e.g. a counter. |
| `pulse` | `{ pulse: "leaf" }` | A brief halo to draw the eye. |
| `meter` | `{ meter: { id: "m", value: 240 } }` | Animates a meter to a value. |
| `bar` | `{ bar: { id: "bar1", interest: 100 } }` | Grows a bar. |
| `tick` | `{ tick: { path: "route1" } }` | Numbers each grid step along a path: 1, 2, 3... |
| `wait` | `{ wait: 400 }` | A pause, in milliseconds. |
| `all` | `{ all: [ {...}, {...} ] }` | Runs actions together. |

The state after any step has to come out the same whether the student plays through or jumps
straight to it. That's why `show`, `hide`, `move`, `text`, `meter`, `bar` and `tick` leave lasting
changes, while `flow`, `pulse` and `wait` are only animation. Never rely on a flow to "deliver"
something: show or move the real element afterwards.

## Illustrations

Look in `src/art/` before drawing anything new. Shared drawings are in `core.js`:

`sun` (80×80), `cloud` (140×80, `text`, `tone`), `soil` (800×130, `drops`), `drop` (44×56),
`co2` (92×36), `o2` (64×36), `h2o` (64×52), `glucose` (70×64), `doc` (70×90, `title`),
`person` (40×70, `tone`), `coin` (40×40), `globe` (80×80)

Sections also have their own, for example `bio.plant`, `bio.plantCell`, `bio.chloroplast`,
`bio.chloroplastBig`, `civics.bill`, `civics.law`, `civics.veto`, `civics.capitolWing` (`tone`),
`civics.capitolCenter`, `civics.capitolMini` and `civics.whiteHouse`.

### Adding an illustration

Add it to your section's file, `src/art/<section>.js`, with your section's prefix (`math.`,
`bio.`, `phys.`, `earth.`, `cs.`, `hist.`, `civics.`, `fin.`). Never edit another section's file
or `core.js`.

```js
CC.art({
  "bio.heart": { w: 160, h: 180, draw(g, d) {
    shape(g, "M80,170 C...", { fill: F("red"), stroke: K("red"), strokeWidth: 2.5 });
    circ(g, 50, 40, 12, { fill: F("blue"), stroke: K("blue"), strokeWidth: 2 });
  } }
});
```

- Draw in the native box (`0,0` to `w,h`). The renderer handles position and scale.
- Helpers (from `CC`): `el`, `line`, `shape` (SVG path), `rect` (last argument is the corner
  radius), `circ`, `ellipse`, `txt(g, x, y, text, cls, anchor)`, `docLines`, plus the colour
  helpers `F(tone)` (soft fill) and `K(tone)` (strong stroke), and materials `STONE`, `PAPER`,
  `WINDOW`. Other theme colours: `var(--paper)`, `var(--paper-ink)`, `var(--stone)`,
  `var(--soil-f)`, `var(--soil-s)`, `var(--root)`, `var(--chloro)`, `var(--seal-f)`,
  `var(--seal-s)`, `var(--stamp)`, `var(--ink)`, `var(--muted)`, `var(--canvas)`.
- **Style:** flat shapes, a soft fill with a 2–3px stroke in the same tone, rounded joins, no
  gradients, no shadows, no outlines in black. Recognisable silhouettes beat detail: a heart
  should read as a heart at half size.
- Only use colours from tokens, never hex values, so drawings work in dark mode.
- Text inside drawings is short (an atom symbol, "BILL", "1010") and uses the classes `atom`,
  `atom-sm`, `doc-title` or `stamp`.
- `d` is the element's spec, so a drawing can take options (`d.tone`, `d.text`...).
- Keep it reasonably accurate. Maps are schematic; label them as simplified.

## Checking your work

```bash
node tests/check.mjs high.biology          # one level of a section
node tests/check.mjs .biology.             # both levels of a section
node tests/check.mjs high.biology --fast   # skip the animated playthrough while iterating
```

The check validates the file, renders every step in light mode looking for overlapping or
clipped text, takes screenshots, and plays the clip with real animations. A topic passes when it
prints `ok`. **Warnings** mark text that sits on an illustration: look at the screenshot and
decide whether it's intended.

Always look at the screenshots in `tests/out/<level>.<section>.<id>/`:
`scene<N>-light.png` and `scene<N>-dark.png` show the end of each scene, and
`transition-step<N>.png` shows the middle of each scene change. Ask yourself:

- Would a student understand the picture with the captions alone?
- Does every illustration read as the real thing?
- Is anything crowded, overlapping, too small, or hard to see in dark mode?

To see a clip play, run `npm run build` and open
`dist/index.html#<level>.<section>.<id>` in a browser.
