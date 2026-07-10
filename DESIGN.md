---
name: KomKits Landing
description: The Calm Control Room — a monochrome, ink-on-white business platform where status color is the only signal light.
colors:
  ink-900: "#111214"
  ink-700: "#3F3F46"
  ink-500: "#6B7280"
  ink-400: "#9CA3AF"
  grey-50: "#FAFAFA"
  grey-100: "#F4F4F5"
  grey-200: "#E4E4E7"
  white: "#FFFFFF"
  primary-hover: "#26272B"
  success: "#00A04D"
  success-bg: "#E0F5EA"
  success-bd: "#A9E3C3"
  info: "#008694"
  info-bg: "#E0F4F5"
  info-bd: "#A5DEE2"
  warning: "#AD6800"
  warning-bg: "#FFF7E0"
  warning-bd: "#FFE58F"
typography:
  display:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(38px, 5.8vw, 64px)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(28px, 4vw, 40px)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  xs: "4px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "48px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.white}"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.white}"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
    height: "48px"
  chip:
    backgroundColor: "{colors.grey-100}"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  chip-live:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.sm}"
    padding: "24px"
---

# Design System: KomKits Landing

## 1. Overview

**Creative North Star: "The Calm Control Room"**

KomKits presents the whole of a business — invoicing, inventory, payments, returns — on a single monochrome instrument surface where everything is visible at once and nothing shouts. The page reads as ink on white: a near-black (`#111214`) laid on pure white (`#FFFFFF`), with a small grey scale carrying every intermediate tone. It is the deliberate opposite of the dense, gray legacy-ERP world its users are escaping. Space is generous, borders are hairline, and the surface stays quiet so that the real product UI and the numbers do the talking.

Color is not decoration here — it is a signal light. The only saturated hues on the page are the three status colors (live-green, coming-soon-teal, attention-amber), and they appear exclusively to mark state. A screenshot of any section should be legible as "what's working, what's coming, what needs attention" from color alone. This is the strategic line from PRODUCT.md made visual: *capable, calm, modern*, aimed at **effortless relief**.

The system explicitly rejects the registers named in PRODUCT.md: no dark dev-tool aesthetic (this is light and business-facing, not Vercel/Cursor neon-on-black), no maximalist Framer-style motion (roughly one earned motion moment per section, scrubbed not scheduled), no playful Clay-style 3D illustration, no dense legacy-ERP chrome, and none of the generic AI-SaaS slop — no cream/parchment body, no tracked uppercase eyebrow on every section, no endless identical icon-card grids.

**Key Characteristics:**
- Ink-on-white monochrome; a single near-black plus a four-step grey scale.
- Status color is the only saturation — green (live), teal (coming-soon), amber (attention).
- Flat surfaces, hairline `#E4E4E7` borders, soft ambient shadows; frosted glass reserved for the floating nav.
- One typeface, Public Sans, worked across weights 400–800.
- Tight display tracking (`-0.035em`), generous 88px section rhythm.
- Motion is scrubbed and reduced-motion-safe; content renders without JS.

## 2. Colors

A monochrome ink-and-grey field, punctuated only by three semantic status colors that never appear as decoration.

### Primary
- **Control Ink** (`#111214`): the single near-black. Every heading, primary button fill, brand mark, body-emphasis, and focus ring. It is the system's one voice — used liberally for structure, never diluted into a "brand color" role.
- **Ink Hover** (`#26272B`): the one-step-lighter fill the primary button shifts to on hover. Exists only as an interaction state of Control Ink.

### Neutral
- **Ink 700** (`#3F3F46`): secondary text and quieter UI labels that still need to read as foreground.
- **Ink 500** (`#6B7280`): the workhorse muted tone — ledes, captions, inactive nav links, supporting copy. Passes AA on white.
- **Ink 400** (`#9CA3AF`): the lightest usable ink — placeholder text, disabled glyphs, separators. Do not push muted text lighter than this on white.
- **Grey 50** (`#FAFAFA`): recessed panel fill inside cards (charts, demo art, side rails).
- **Grey 100** (`#F4F4F5`): default chip and pill background; subtle inset surfaces.
- **Grey 200** (`#E4E4E7`): the hairline border on every card, input, chip, and divider.
- **White** (`#FFFFFF`): the page body and every resting card surface.

### Semantic (status only)
- **Live Green** (`#00A04D` on `#E0F5EA`, border `#A9E3C3`): a feature or module that is shipping today.
- **Coming-Soon Teal** (`#008694` on `#E0F4F5`, border `#A5DEE2`): roadmap items — integrations and workflows not yet live.
- **Attention Amber** (`#AD6800` on `#FFF7E0`, border `#FFE58F`): "Most Popular" pricing flag and other single points of emphasis.

### Named Rules
**The Signal-Light Rule.** Saturated color is forbidden as decoration. Green, teal, and amber appear *only* to communicate status — live, coming-soon, attention. If a color isn't reporting state, it must be ink or grey.

**The One Voice Rule.** There is exactly one brand color and it is near-black. Do not introduce a secondary accent to "warm up" the page; warmth is carried by copy, spacing, and real product UI, never by a decorative hue.

## 3. Typography

**Display / Body / Label Font:** Public Sans (with `system-ui, sans-serif` fallback), weights 400–800.
**Mono Font:** `ui-monospace, Menlo, monospace` — used sparingly for API-key chips and code-like tokens.

**Character:** One humanist-grotesque family doing all the work, differentiated by weight and tracking rather than by pairing. Public Sans is neutral and legible — a civic, no-nonsense sans that reads as "business software you can trust" without tipping into either startup-whimsy or enterprise-drab. Tight negative tracking on display sizes gives headings a modern, engineered edge; generous line-height on body keeps long copy calm.

### Hierarchy
- **Display** (700, `clamp(38px, 5.8vw, 64px)`, line-height 1.06, tracking `-0.035em`): hero H1 only. The single loudest element on the page; capped at 64px so it presents, never shouts.
- **Headline** (800, `clamp(28px, 4vw, 40px)`, line-height 1.12, tracking `-0.02em`): section H2s. Uses `text-wrap: balance` for even line lengths.
- **Title** (700, ~17px, line-height 1.3): card titles, feature names, nav brand.
- **Body** (400, 16px, line-height 1.55): default prose. Ledes render at 17px in Ink 500, capped at ~56ch.
- **Label** (700, 12px, tracking `0.1em`, uppercase): the `.eyebrow` — a section kicker. Present in the system but *rationed* (see rule), never stamped above every section.
- **Mono** (400, ~12.5px): API-key chips, MCP/code tokens only.

### Named Rules
**The Rationed Eyebrow Rule.** The uppercase tracked `.eyebrow` label exists, but a kicker above *every* section is the AI-slop tell. Use it only where a section genuinely needs a category tag; prefer varying the section-opening cadence instead.

**The One-Family Rule.** Public Sans is the only typeface. Never pair it with a second sans; contrast comes from weight (400 vs 800) and tracking, not from a new family.

## 4. Elevation

The system is **flat by default**. Cards, inputs, chips, and panels sit flush on the white body, separated by hairline `#E4E4E7` borders rather than by shadow. Depth is applied sparingly and ambiently — never as drama. There are exactly two ambient shadow tokens for resting cards, plus a distinct, heavier frosted treatment reserved for the one floating element on the page: the sticky nav.

### Shadow Vocabulary
- **Ambient z1** (`box-shadow: 0 1px 2px rgba(17,18,20,.06), 0 1px 3px rgba(17,18,20,.08)`): resting lift for cards and sliders. Barely-there.
- **Ambient z2** (`box-shadow: 0 8px 24px rgba(17,18,20,.10)`): raised state for popovers, active demo cards, hover-lifted surfaces.
- **Floating Glass (nav only)** (`0 1px 3px rgba(17,18,20,.04), 0 8px 32px rgba(17,18,20,.06)`, with `backdrop-filter: blur(16px) saturate(1.6)` over `rgba(255,255,255,.72)`): the sticky nav pill floats above the page. This is the *only* sanctioned glassmorphism.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest and bounded by a 1px `#E4E4E7` border. Shadow is a response to state (hover, raise, float), not a resting property of every card.

**The One Glass Rule.** Backdrop-blur belongs to the nav and nowhere else. Do not decorate cards or sections with glass; it is a signal that an element floats above the document, reserved for exactly that.

## 5. Components

Components are **refined and restrained** — quiet, precise, low-chrome. Ink-black fills, 1px grey borders, small radii, and a consistent `200ms cubic-bezier(.2,.8,.4,1)` ease on every state change.

### Buttons
- **Shape:** gently squared (4px radius via `--radius`); nav-scoped buttons round up to 10px to match the pill nav.
- **Primary:** Control Ink (`#111214`) fill, white text, 48px min-height, 12px 24px padding. The default CTA everywhere; `.btn-lg` bumps to 54px / 16px for hero.
- **Secondary:** white fill, ink text, 1px `#E4E4E7` border. Hover darkens the border to Control Ink — no fill change.
- **Hover / Focus:** primary fill shifts to Ink Hover (`#26272B`); `:active` scales to `.98`. Focus-visible draws a 2px Control Ink outline at 2px offset.

### Chips
- **Style:** 999px pill, 11.5px/600 text, `#F4F4F5` fill, 1px `#E4E4E7` border, optional 6px status dot (`currentColor`).
- **Semantic states:** `.live` (green on `#E0F5EA`), `.soon` (teal on `#E0F4F5`), `.popular`/`.save` (amber/green tinted). Chips are the primary carrier of the Signal-Light Rule.

### Cards / Containers
- **Corner Style:** 8px (`--rounded.sm`) for primary cards; 10–12px for larger panels and media frames; 16px for the nav pill.
- **Background:** white for resting cards; `#FAFAFA` (Grey 50) for recessed inner panels (charts, demo stages, side rails).
- **Shadow Strategy:** flat by default (see Elevation); Ambient z1 for gentle resting lift, z2 on hover/active.
- **Border:** always 1px `#E4E4E7`.
- **Internal Padding:** 24px standard; 14–18px for compact inner panels.

### Inputs / Fields
- **Style:** white or `#F4F4F5` fill, 1px `#E4E4E7` border, 4–10px radius, native appearance reset. Mono-family for key/token inputs.
- **Focus:** 2px Control Ink outline at 2px offset (global `:focus-visible`), no colored glow.

### Navigation
- **Style:** a floating frosted pill — `rgba(255,255,255,.72)` + `blur(16px) saturate(1.6)`, 1px translucent border, 16px radius, sticky 12px from top. On scroll it firms up (opacity `.88`, tighter shadow).
- **Links:** 13.5px/600 in Ink 500, resting inside an inset `rgba(244,244,245,.6)` track; hover/active fill white with a whisper of z1 shadow and shift to Control Ink.
- **CTA:** compact 36px primary/secondary buttons at 10px radius.
- **Mobile:** the link track collapses to a drawer (elevated above the sticky header).

### Signature — Status Chip System
The live / coming-soon / popular chip family is the system's signature component: it is where the entire color budget lives and how the "modular, some-live-some-coming" product story is told at a glance.

## 6. Do's and Don'ts

### Do:
- **Do** keep the body ink-on-white: `#111214` on `#FFFFFF`, with the Grey 50/100/200 scale for every intermediate surface.
- **Do** reserve all saturation for status — green `#00A04D` (live), teal `#008694` (coming-soon), amber `#AD6800` (attention) — via the chip system.
- **Do** bound surfaces with 1px `#E4E4E7` borders and keep them flat; add Ambient z1/z2 shadow only as a state response.
- **Do** carry hierarchy with Public Sans weight and tracking alone (400 body vs 800 headline; `-0.035em` display).
- **Do** cap the hero display at 64px, ledes at ~56ch, and hold to the 88px section rhythm (64px on mobile).
- **Do** give every animation a `prefers-reduced-motion` path and render content without JS (the `.reveal` primitive is `.js`-gated for exactly this).

### Don't:
- **Don't** ship the **dark dev-tool aesthetic** — no dark-mode-default, no neon accent. This is light and business-facing, not Vercel/Cursor.
- **Don't** add **maximalist Framer-style motion** — no kinetic type, no cursor-reveals on everything, no audio-on-hover. One earned motion moment per section, scrubbed not scheduled.
- **Don't** introduce **playful Clay-style 3D illustration** or pastel blobs; this is a tool people trust with money.
- **Don't** regress to the **legacy accounting/ERP look** — no dense gray spreadsheet chrome, no cramped tables as decoration.
- **Don't** produce **generic AI-SaaS slop**: no cream/parchment body background, no tiny tracked uppercase eyebrow above every section, no endless identical icon+heading+text card grids.
- **Don't** use color as decoration. If a hue isn't reporting status, it's a bug — make it ink or grey.
- **Don't** introduce a second typeface or a second brand accent. One family, one voice.
- **Don't** apply glassmorphism anywhere but the nav.
- **Don't** let muted text fall below Ink 400 (`#9CA3AF`) on white, or below 4.5:1 for body copy.
