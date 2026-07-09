# KomKits landing mockup — component source

`../komkits-landing-mockup.html` is **generated**. Edit the partials in
`components/` and rebuild:

```bash
node komkits-landing/build.mjs     # run from the Designs folder
```

## How it works

Each component is a self-contained fragment — its `<style>`, markup, and
`<script>` live together — concatenated in filename order. `00-head.html`
opens the document (tokens, reset, shared `.btn`/`.chip` primitives, and the
global `reduceMotion` const every section script uses); `15-final-footer.html`
closes it.

| Component | Section |
|---|---|
| `00-head.html` | doctype, head, design tokens, base CSS, shared JS globals |
| `01-nav.html` | sticky nav, opens `<main>` |
| `02-hero-chat.html` | hero + chat simulation |
| `03-stats-marquee.html` | stats count-up + industries marquee |
| `04-before-after.html` | before/after slider |
| `05-modules-tabs.html` | modules tabs walkthrough |
| `06-mini-demos.html` | 3 interactive GTM demo cards (invoice / live table / reconcile) |
| `07-virtual-cursor.html` | **virtual cursor + AI teammate card** (from `komkits-virtual-cursor-card.html`) |
| `08-architecture.html` | pinned architecture scrollytelling |
| `09-ai-bento.html` | AI bento + spotlight |
| `10-dashboard-editor.html` | **dashboard editor card** (from `komkits-dashboard-editor-card.html`) |
| `11-integrations.html` | coming-soon integrations + waitlist |
| `12-how-it-works.html` | 4-step how it works |
| `13-pricing.html` | pricing toggle + plans |
| `14-quote-faq.html` | positioning quote + FAQ |
| `15-final-footer.html` | final CTA, footer, closes the document |

## Namespacing rules (when lifting standalone cards in)

The two imported cards were standalone pages, so their globals were scoped on
import — follow the same pattern for future cards:

- **IDs** get a prefix when the landing page already uses the name:
  virtual cursor card → `vc-*` (`vc-stage`, `vc-inv-total`, …); dashboard
  editor card → `de-*` (`de-grid`, `de-edit-btn`, …).
- **CSS classes** that collide with landing globals are re-scoped under the
  card root (`.vc-card .chip`, `.vc-card .inv-tot`). Elements a card appends
  to `<body>` (drag ghost, tooltip, the auto-demo AI cursor + bubble) carry
  namespaced classes (`.de-ghost`, `.de-tip`, `.de-cursor`, `.de-bubble`)
  because they can't be scoped under the card.
- Drop each standalone page's `:root`, `body`, `.demo-note`, and
  reduced-motion rules — the base layer in `00-head.html` owns those.

`komkits-landing-mockup.orig.html` is the pre-split snapshot kept for reference.

## Production library mapping (for final integration)

This mockup is deliberately **dependency-free vanilla JS/CSS** — keep it that
way. Do not `npm install` anything into the mockup. The table below is the
handoff for whoever ports these sections into `apps/frontend` (Next.js + MUI +
Emotion); it records which production library owns each interaction so the
integration is a re-expression, not a redesign.

### Already installed in `apps/frontend` — no new dependency

| Library | Version | Owns |
|---|---|---|
| `framer-motion` | 12.23 | count-up (`03`), chat reveal (`02`), tabs auto-advance (`05`), demo-card transitions (`06`), virtual cursor motion (`07`), pinned scrollytelling scrub (`08`), animated price swap (`13`) |
| `@dnd-kit/core` · `/sortable` · `/modifiers` | 6.3 / 10.0 / 9.0 | drag-to-reorder in dashboard editor (`10`) |
| `react-grid-layout` | 2.2 | grid resize/snap in dashboard editor (`10`) — same lib the real `SectionPage.tsx` dashboard already uses |

### Additive libraries to install at integration (mockup fakes these by hand)

| Library | For | Why not just framer-motion |
|---|---|---|
| `react-fast-marquee` | industries marquee (`03`) | seamless infinite loop + pause-on-hover + reduced-motion for free; the mockup hand-rolls it with a CSS `@keyframes` translate |
| `react-compare-slider` | before/after slider (`04`) | accessible pointer + keyboard drag, `clip-path` reveal, touch handling — all hand-rolled in the mockup via `pointermove` + `getBoundingClientRect` |

### Deliberately NO library

| Section | Interaction | Keep as |
|---|---|---|
| `09-ai-bento` | cursor-tracked spotlight | `pointermove` → CSS custom property (`--x`/`--y`). A lib is overkill. |
| `12-how-it-works` | numbered steps | CSS counters. |
| `14-quote-faq` | FAQ disclosure | native `<details>/<summary>`. |

### Open call for the reviewer

- **`08-architecture` pinned scrollytelling** — `framer-motion`'s
  `useScroll` + `useTransform` (with a `position: sticky` pin) covers the
  current 5-stage scrub. Only reach for **GSAP `ScrollTrigger`** (and
  optionally **`lenis`** for smooth-scroll) if the pin/scrub fights MUI's
  layout or needs finer scrubbing than `useScroll` gives. Prefer staying on
  `framer-motion` since it's already in the bundle.
- **`05-modules-tabs` carousel** — `framer-motion` is enough; only swap to
  `embla-carousel-react` if you later need free-drag/snap swiping on mobile.

Net new dependencies for a faithful port: **`react-fast-marquee`** and
**`react-compare-slider`**. Everything else is already in `apps/frontend`.
