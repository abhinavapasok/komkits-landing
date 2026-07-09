# Landing page design research — Jul 2026

Scope: survey current best-practice B2B SaaS landing pages, with a deep dive into
Twenty CRM's actual source (their marketing site is open source), to find
concrete techniques worth adopting into this mockup. Cross-checked against
what we've already built (see `README.md` for the section list).

## Where this came from

- **twenty.com** — inspected via the live site *and* their open-source repo:
  [`twentyhq/twenty`](https://github.com/twentyhq/twenty), marketing site at
  `packages/twenty-website`. This is the good part — real production code,
  not guesswork.
- **linear.app**, **attio.com** — visual/structural read of the live sites
  (no source access; both are closed-source).
- General 2026 SaaS landing page trend scan (Saaspo, a1.gallery, industry
  roundups) for the macro pattern.

## The macro trend (context, not new to us)

Best-in-class 2026 B2B pages converge on: real product UI instead of stock
illustration, an AI agent visibly *doing work* in the hero rather than a
static screenshot, aggressive-but-purposeful motion, and pricing pages that
front-load the answers instead of gating behind "Contact Sales." We're
already aligned on all of this (hero chat sim, mini-demo cards, pricing
toggle). Nothing new to change here — just confirms direction.

## Twenty's actual code — what's genuinely useful

Twenty's `twenty-website` package ships **zero animation libraries** —
no framer-motion, no GSAP. Dependencies are `three` (WebGL), `@lottiefiles/dotlottie-react`,
`@linaria/react` (zero-runtime CSS-in-JS), `@base-ui/react` (unstyled
components), Next 16 + React 19 + React Compiler. Everything else is
hand-rolled. That's a validation of our own "vanilla, dependency-free
mockup" instinct — but their hand-rolled layer is more disciplined than
just "some JS in a script tag," and that discipline is the actual idea
worth stealing.

### 1. A `platform/motion` primitives folder — not a library, a layer

Instead of scattering scroll math inside component callbacks, they factor
it into small, pure, independently unit-tested functions:

```ts
// compute-scroll-progress.ts — has a matching .test.ts file
export function computeScrollProgress(
  rectTop: number, rectHeight: number, viewportHeight: number,
): number | null {
  const scrollableDistance = rectHeight - viewportHeight;
  if (scrollableDistance <= 0) return null;
  const raw = -rectTop / scrollableDistance;
  return raw <= 0 ? 0 : raw >= 1 ? 1 : raw;
}
```

Then a thin `ScrollProgressEffect` component and `useScrollProgress` /
`useBreakpointStepSync` hooks consume it. Other files in that folder:
`use-animated-number` (count-up), `use-prefers-reduced-motion` +
`reduced-motion-snapshot`, `use-scale-to-fit`, `use-horizontal-drag-scroll`,
`clamp-progress`, `get-element-scale`, `observe-element-size`.

**Idea for our port**: when `08-architecture` and `03-stats-marquee` move
into `apps/frontend`, don't just wrap `framer-motion`'s `useScroll` inline
in each component. Pull the progress math (0→1 clamped scroll fraction,
count-up interpolation, reduced-motion snapshot) into small pure functions
under a shared `hooks/motion/` folder, unit-testable independent of DOM or
framer-motion. Cheap to do, makes the trickiest math (progress clamping,
mobile-vs-desktop step sync) regression-safe.

### 2. Scroll-pin sections fork desktop/mobile layout, not just CSS

Their `HomeStepper` (closest analog to our `08-architecture`) explicitly
switches `layoutMode: 'scroll' | 'swipe'` based on a breakpoint media query
— desktop gets the sticky-pinned scrub, mobile gets a swipeable step
carousel with its own `mobileStepIndex` state. It's not the same
interaction squeezed responsive; it's two interaction models sharing one
step dataset.

**Idea for our port**: worth explicitly verifying/deciding this for
`08-architecture` rather than letting the pin degrade awkwardly on mobile.
If mobile currently just un-sticks the pin, consider swapping to a real
swipe-through-steps pattern below the `md` breakpoint instead.

### 3. Lottie-scrubbed illustration instead of hand-coded keyframe states

The stepper's visual isn't hand-animated CSS/JS per stage — it's a single
authored Lottie file, and `scrollProgress` (0→1) is fed in as the playback
position (`HomeStepperLottie scrollProgress={visualScrollProgress}`). One
asset, continuous scrub, no per-stage state machine to maintain.

**Idea for our port**: our `08-architecture` diagram currently hand-codes
reveal state per of 5 stages in CSS/JS. If the diagram gets more visually
complex later, authoring it once as a Lottie/After Effects animation and
scrubbing by scroll fraction is far less code than N discrete stage
states — same technique `@lottiefiles/dotlottie-react` (React-friendly,
small runtime) makes trivial to wire up. Not urgent now, but the pattern is
worth knowing before the diagram grows a 6th stage.

### 4. Halftone/dot-pattern WebGL backdrop — a distinctive visual we don't have

`platform/visuals/rigs/` contains `HalftoneImageBackdrop.tsx`,
`HalftoneCardBackdrop.tsx`, `HalftoneModel.tsx` — a WebGL (three.js) effect
that renders a photo/3D model as a halftone dot grid, used behind the hero
and behind feature cards. It fades in only after the first frame renders
(`onFirstFrame` callback) so a blank canvas never flashes — small but
important polish detail for any canvas/WebGL backdrop.

**Idea for our port**: this is the one genuinely new visual technique here.
None of our sections currently have a "textured" backdrop — everything is
flat color/gradient. A halftone-dot or dither-pattern treatment behind the
hero or the AI bento section (09) would read as more distinctive/crafted
than a plain gradient, and it's cheap: a canvas shader keyed to scroll or
pointer position, same `pointermove → CSS var` pattern we already use for
the bento spotlight, just rendered as dots instead of a radial glow. Not
worth three.js for this — a 2D canvas dot-grid with per-dot size/opacity
driven by a luminance map or noise function gets 90% of the effect at a
fraction of the cost.

### 5. "Scene design box" — fixed-canvas illustrations that scale as a unit

Each feature card's illustration is authored at one fixed pixel box
(explicitly `411×508`, called out in a comment) and the whole scene scales
by `frame-width / 411` via `aspect-ratio` + transform, so the illustration,
its inner content, and the frame all stay proportional at every breakpoint
instead of reflowing independently.

**Idea for our port**: directly applicable to `06-mini-demos`,
`07-virtual-cursor`, and `10-dashboard-editor` — all three are intricate
authored scenes (invoice builder, cursor card, dashboard grid) that need to
shrink gracefully on tablet/mobile without their internals reflowing into
mush. If any of those currently use flexible internal layout instead of a
fixed authored box + uniform scale, that's the fix for cross-breakpoint
fidelity.

### 6. Marquee: confirms our approach, plus a typographic variant worth stealing

`WhyTwentyMarquee` is exactly our pattern — duplicated track, CSS
`@keyframes translate3d(-50%)`, `animation: none` under
`prefers-reduced-motion`, no library. Good, no change needed there
(validates the README's call to use `react-fast-marquee` only for the
accessibility/pause-on-hover extras, not because the base technique is
wrong).

The one new idea: their marquee alternates **two type tiers on one track**
— a loud 120px serif/uppercase phrase next to a quiet 60px sans/lowercase
phrase, with one segment in accent color — rather than a uniform row of
logos or plain text. Worth considering for `03-stats-marquee`'s industries
row: mixing a bold "industries" name with a smaller qualifying phrase in
the same scrolling line reads richer than a flat logo/word list.

### 7. Bento/feature card anatomy

`FeatureCard.tsx`: dark card (`black-5` bg, `black-20` 1px border),
top-aligned icon-chip + heading row, then a fixed-aspect illustrated scene
frame below, isolated with `isolation: isolate` so inner blend
effects/shadows don't leak. Simple, but a clean checklist against our
`09-ai-bento` cards if any feel visually thin.

## What Linear / Attio confirmed (no source access, visual read only)

Both lean on **real product screenshots as the hero graphic** rather than
illustration, minimal decorative motion, and progressive disclosure via
tabs/timeframe switches for feature depth (Attio's 7D/30D/3M tabs). This
matches what we're already doing with the modules tabs (05) and mini-demo
cards (06) — no action needed, just confirms we're not off-trend.

## Round 2 — more references

Extended the survey past Twenty/Linear/Attio. Two more open-source codebases
checked directly, plus a visual read of four more closed-source sites
industry roundups consistently rank alongside Twenty/Linear.

### Dub.co — open source, code checked

[`dubinc/dub`](https://github.com/dubinc/dub), marketing pages live inside
`apps/web` (their app monorepo, not a separate site package like Twenty's).
`package.json` confirms `"motion": "^12.23.22"` — i.e. **framer-motion**,
renamed to `motion` by the same maintainer (Framer). This is a second
real-world confirmation, independent of our own README's recommendation,
that framer-motion is a defensible default for scroll-reveal/count-up work
in a React marketing site — not just "the library we happen to have
installed." Dub is also known for a live click-analytics globe/map on its
own product dashboard (not the marketing hero) — not directly relevant to
komkits-landing's sections but worth remembering if a "live activity feed"
visual is ever wanted for a dashboard-adjacent section.

### Cal.com, Unkey — open source, structure not directly inspectable

Both ship public marketing sites and are commonly cited as well-designed
open-source SaaS, but their GitHub API responses didn't resolve a distinct
website package the way Twenty's did (Cal.com's marketing site lives behind
`cal.com` proper, not obviously separated in the monorepo root; Unkey
similarly). Not pursued further — diminishing returns versus Twenty's
already-thorough dive.

### Stripe, Vercel, Ramp, Framer, Clay, Cursor — visual read via trend
roundups (closed source, no code access)

These are the names that come up again and again alongside Twenty/Linear/Attio
in 2026 "best SaaS site" roundups. No source access (all closed-source), so
this is secondhand visual description, not verified code — treat as
direction, not spec:

- **Stripe** — cited as "a masterclass in focus": calm, low-noise, product
  UI does the talking rather than decoration. Reinforces our own
  monochrome-first principle (§7.1) rather than adding anything new.
- **Vercel** — dark-mode-default with neon accents, read as the standard
  "technical credibility" signal for developer tools. Not our register
  (KomKits is light, business-facing, not dev-tool-coded) — noted as an
  explicitly rejected direction, not a gap.
- **Ramp** — "bold but disciplined" fintech visual identity; sits in the
  same money/finance category we're adjacent to (invoicing, payments).
  Worth a follow-up look specifically at how they present numbers/ledger
  data visually if we ever want to punch up the stats/count-up section
  beyond plain digits.
- **Framer** — motion-heavy: kinetic type, cursor-triggered reveals, even
  audio-preview on hover. Interesting but a different risk appetite than
  ours (§7's "one motion moment per section" principle deliberately holds
  back from this). Noting it as the far end of the motion-intensity dial,
  not a target.
- **Clay** — distinctive 3D "clay" sculptural illustration style (soft
  rounded forms, pastel palette, physical-object metaphors for abstract
  product concepts). This is a brand-identity choice more than a technique
  — not applicable to KomKits' current monochrome-first direction, but
  worth remembering as a reference point if the brand ever wants a warmer,
  more illustrated register for a specific campaign page rather than the
  core product marketing site.
- **Cursor** — dark-as-default, "cursor-cyan" accent; same category as
  Vercel above, same conclusion (not our register).

**Net read on round 2**: no new techniques worth prototyping beyond what
round 1 surfaced (halftone backdrop, scene-box scaling, mobile swipe fork,
single-asset scroll scrub, two-tier marquee — see `prototypes/`). The
useful thing this round confirmed is a *boundary*: Stripe's restraint and
our own §7.1 monochrome-first principle point the same direction, while
Framer/Clay/Vercel's more maximalist registers are deliberately not ours.
Worth a closer, code-level look only if we later want to punch up the
stats/numbers section — Ramp's ledger/number presentation is the one
open thread here, not yet investigated at the code level.

## Priority read

If picking two things to actually act on now:

1. **Halftone/dot backdrop rig (§4)** — the one visual idea we don't already
   have some version of. Cheapest high-impact addition; a 2D canvas
   dot-field is a day of work, not a redesign.
2. **Scene design box scaling (§5)** — an audit-and-fix, not new work: check
   whether `06`, `07`, `10` already scale as a fixed authored box, and if
   not, that's a concrete bug-shaped fix for tablet breakpoints.

Everything else (§1–3, §6–7) is validation of decisions already made, or a
note for when we port into `apps/frontend` rather than something to change
in the mockup today.
