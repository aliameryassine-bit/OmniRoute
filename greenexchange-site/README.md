# Green Exchange — website

A rebuild of the Green Exchange site as a hand-authored static bundle: one stylesheet, one
script, no framework and no dependencies. `dist/` is the deployable output — upload it to any
static host as-is.

```bash
node build.mjs                 # writes dist/  (Node 18+, no install step)
cd dist && python3 -m http.server 8000
```

## What this is

The previous site was a compiled Next.js export — no source, no images, and every headline
locked inside minified chunks. This rebuild carries the copy across **verbatim** (it is
carefully written and the voice is the product) and replaces everything around it: the design
system, the drawings, the motion, and the page shell.

## Design direction

The subject is a precision machine that stands at a store entrance and refuses to guess. Almost
every figure on the site is honestly unpublished — `Figure not yet published`, `Chart not drawn
— no public source`. Rather than hide that, the design is built **around** it: the whole site
reads as an instrument datasheet, where a blank field with a stated reason is the normal, expected
state of a specification that has not been measured yet.

**Colour** — two complete themes, not an inversion.

| Token       | Dark (default) | Light            | Role                                        |
| ----------- | -------------- | ---------------- | ------------------------------------------- |
| `--ground`  | `#080b0a`      | `#eae7dc`        | anodised steel in shadow / ecru paper       |
| `--ink`     | `#ecebe3`      | `#141a18`        | warm off-white, never pure white            |
| `--brass`   | `#c7a978`      | `#75581f`        | the warmth — rules, marks, hover fills      |
| `--patina`  | `#63e0ae`      | `#0b6647`        | instrument marks only: scan lines, live ticks |
| `--pet`     | `#8ecfe0`      | `#236274`        | material stream identity                    |
| `--alu`     | `#d3ccbd`      | `#5f584b`        | material stream identity                    |

The mint is deliberately never used as a fill or a glow — only as 1px instrument line-work — so
the page reads as brushed metal rather than as another dark-mode-with-a-neon-accent landing page.
Every pair above clears WCAG AA at its used size in both themes.

**Type** — three voices, each with a job.

- **Archivo** at 700, very tight tracking — headline authority.
- **Array**, a dot-matrix face — the machine's own readout. Reserved for the wordmark, numerals
  and index marks; never asked to carry a sentence. (It started as the headline face; at 7rem it
  was a wall of dots. It earns its place at readout scale.)
- **Martian Mono** — labels, units, states, coordinates.

Fonts are the same four families the previous build shipped, self-hosted as `woff2` subsets.

**Layout** — a specification-sheet grid: a left rail carrying the section index and kicker, content
in the main column, and full-bleed schematic panels that break out of it. The signature component
is the **spec row** — label, dotted leader, value, state chip — which turns "not published yet"
into the design's motif instead of a gap.

## Drawings

There is no photography, so every graphic is drawn as inline SVG in `src/graphics.mjs`, line-work
only, taking its colour from the theme tokens:

- **Front elevation** (home) — intake, NIR window, readout, compaction, two bins, collection door.
- **Cutaway section** (technology) — the nine-step container path, with a travelling container
  that the scroll stepper moves along the transport line.
- **Material flow** (impact) — structure only. The bands are equal width and labelled
  `no source`, because drawing magnitudes without a source for every band is exactly the failure
  that page warns about.
- **Operating boundary** (for retailers) — what the site provides against what we own and operate.

## Motion

Orchestrated rather than scattered. A calibration loader on first visit per session; masked
line-by-line reveals for display type; dotted leaders that draw across as each spec row arrives;
a scroll-driven stepper on `/technology/` that lights one zone of the cutaway at a time; magnetic
CTAs, a brass cursor ring, an ambient light that tracks the pointer across the hero; and a curtain
on internal navigation.

All of it is additive:

- `prefers-reduced-motion: reduce` — every animation off, loader and cursor removed, all content
  in its final state.
- **JavaScript disabled** — nothing is hidden. The hidden start states live behind a `data-anim`
  flag set by an inline head script, which a 3-second failsafe removes if the motion script never
  boots, so a failed request can never leave the page blank. The loader is `display:none` until
  that flag exists, and a `<noscript>` block unfolds the nav links since the overlay menu needs JS.

## Structure

```
build.mjs              generator — reads src/, writes dist/
src/
  layout.mjs           document shell, nav, footer, spec/stat/section components
  graphics.mjs         all SVG drawings and icons
  content/*.mjs        one module per page, copy held as data
static/                copied verbatim into dist/ (css, js, fonts, icon)
dist/                  build output — the deployable bundle
```

12 pages: home, technology, for-retailers, impact, investors, company, pilot, four legal pages,
and 404. Roughly 228 kB of HTML, 42 kB CSS, 17 kB JS, plus ~160 kB of font subsets.

## Known gaps carried over from the previous build

These are content decisions, not bugs, and they are preserved deliberately:

- Every measured figure is still `—` with a `pending` state and a stated reason.
- `/company/` is a stated absence rather than founding-story filler.
- The four legal pages and the investor disclaimer are marked as not drafted in-house.
- The forms post to `#`; they need a real endpoint before launch.
- Only the English locale is rebuilt. `/ar/` and `/ro/` need the same treatment, and the Arabic
  build needs `dir="rtl"` — the stylesheet already carries the RTL flips for the leader lines,
  eyebrow rules and list marks.
