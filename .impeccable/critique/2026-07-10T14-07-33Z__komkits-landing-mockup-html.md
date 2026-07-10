---
target: komkits-landing-mockup.html
total_score: 30
p0_count: 0
p1_count: 1
timestamp: 2026-07-10T14-07-33Z
slug: komkits-landing-mockup-html
---
Method: ⚠️ DEGRADED: single-context (sub-agent spawning restricted by harness policy; user did not request subagents). Assessment B browser overlay unavailable (no browser-automation tool exposed) — detector-only.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Interactive demos (tabs, slider, count-up, chat sim) give feedback; no real form-submit states |
| 2 | Match System / Real World | 4 | Plain business language throughout ("what's owed and what's paid") |
| 3 | User Control and Freedom | 3 | User-paced tabs, draggable slider, FAQ toggles, reduced-motion respected |
| 4 | Consistency and Standards | 2 | `.btn-primary` defined 4× with conflicting geometry; dual ink palettes (neutral #111214 vs slate #0F172A); Georgia serif intrusion; ~20 font sizes |
| 5 | Error Prevention | 3 | CTAs are low-risk/non-destructive by nature; little to get wrong |
| 6 | Recognition Rather Than Recall | 4 | Everything visible, labeled nav, no memory demands |
| 7 | Flexibility and Efficiency | 3 | Anchored nav, pricing toggle, tabbed modules |
| 8 | Aesthetic and Minimalist Design | 3 | Mostly restrained, but hero emerald gradient + gradient text + size sprawl add noise against its own doctrine |
| 9 | Error Recovery | 2 | n/a — no error states designed (marketing mock) |
| 10 | Help and Documentation | 3 | FAQ + how-it-works + coming-soon honesty serve the genre well |
| **Total** | | **30/40** | **Good** |

## Anti-Patterns Verdict

**Would someone say "AI made this"?** Not at a glance — the monochrome-mono discipline, real product UI, and scrubbed motion read as crafted, not generated. But there are specific tells under the hood.

**LLM assessment:** The page mostly honors its own "Calm Control Room" system. The exception is the **hero**, which was authored against a different mini-system: a slate ink palette (#0F172A / rgba(15,23,42)) plus an **emerald gradient** on the H1 and an emerald glow — decorative color on the single loudest element, directly contradicting the Signal-Light Rule (color = status only) and the absolute ban on gradient text. Copy leans on 56 em-dashes, a classic AI-writing fingerprint.

**Deterministic scan (detect.mjs):** 209 findings — 11 warnings, 198 advisories.
- `gradient-text` ×1 (line 385, hero H1) — real, P1.
- `dark-glow` ×1 (line 653, emerald glow) — same off-system hero accent.
- `layout-transition` ×4 (nav min-height, slider width, FAQ max-height, one height) — mostly defensible; slider `transition:width` is the one worth converting.
- `side-tab` ×1 (line 2872) — **false positive**: an L-shaped resize handle (border-right + border-bottom on a 16px corner grip), not a card accent stripe.
- `em-dash-overuse` ×1 (56), `numbered-section-markers` ×1 (01–07 w/ gap), `design-system-font` ×3 (Georgia serif).
- `design-system-*` advisories: font-size ×100, color ×74, radius ×23 — mostly reflect that the reverse-engineered DESIGN.md ramp is thinner than the page's real usage (~20 sizes, chart tints), not pure drift. Reconcile the doc rather than chase each hit.

**Visual overlays:** none available — no browser-automation tool is exposed this session, so no user-visible overlay was injected. Findings are source + detector based.

## What's Working

- **The monochrome + signal-color discipline** is genuine and rare. Reserving green/teal/amber for live/coming-soon/attention gives the "some-live-some-coming" modular story real legibility.
- **Show-don't-tell hero and demos.** A working chat simulation, before/after slider, and user-paced module tabs prove the product instead of describing it — exactly the register's best move.
- **Accessibility floors are built in.** `.reveal` is `.js`-gated (renders without JS), every animation has a reduced-motion path, and focus-visible is a global 2px ink outline.

## Priority Issues

- **[P1] The hero contradicts the page's own design system.** The H1 uses a clipped emerald gradient (`linear-gradient(135deg,#0F172A,#334155,#059669)`) with a matching emerald glow, and the hero hardcodes a slate ink palette (rgba(15,23,42)) and a shadowed, 10px-radius primary button — none of which match the neutral-ink, flat-by-default, color-is-status system the rest of the page (and DESIGN.md) commit to. **Why it matters:** it's the first and loudest thing a visitor sees, and it reads as a different designer's work; gradient text is on the absolute-ban list. **Fix:** make the H1 solid ink; carry emphasis with weight/size. If an accent moment is wanted, use the documented Live Green as a deliberate, single, status-adjacent touch — not a decorative 3-stop gradient. Reconcile hero shadows/inks to the `rgba(17,18,20)` / `#111214` tokens. **Command:** /impeccable quieter (hero), then /impeccable colorize if a sanctioned accent is desired.
- **[P2] The primary button is four different buttons.** `.btn-primary` is defined at base (4px radius, no shadow), in nav (10px), in hero (10px + drop shadow + `transition:all`), and inverted in the final CTA. **Why it matters:** the CTA is the conversion anchor; inconsistent shape/elevation undercuts the "refined and restrained" component promise and makes the system feel improvised. **Fix:** one primary-button definition with documented variants (size only); kill the hero drop shadow to honor flat-by-default. **Command:** /impeccable polish (buttons).
- **[P2] Type-scale sprawl.** The page uses ~20 distinct font sizes (9px → 64px), with heavy reliance on sub-14px text (21× 13.5px, 18× 11px) and some 9px labels. **Why it matters:** no perceivable ramp weakens hierarchy, and 9–11px text is a legibility/AA risk for the non-technical SMB audience. **Fix:** collapse to a documented modular scale; floor body/label text at ~12px. **Command:** /impeccable typeset.
- **[P3] Copy leans on 56 em-dashes.** An AI-writing tell that slightly undercuts the human, plain-spoken voice PRODUCT.md wants. **Fix:** vary punctuation; convert many to periods or restructure. **Command:** /impeccable clarify.
- **[P3] A few layout-animated transitions.** The before/after slider animates `width`; converting the reveal to `transform`/`clip-path` avoids reflow jank on drag. Nav min-height and FAQ max-height are acceptable. **Command:** /impeccable optimize (slider).

## Persona Red Flags

**Jordan (First-Timer):** Largely well-served — labeled nav, plain language, coming-soon honesty. Risk: the emerald-gradient hero word competes with the CTA for the eye; the true primary action should be the loudest colored element, and right now a decorative gradient is.

**Casey (Distracted Mobile):** Check the frosted floating nav's CTA reachability and the before/after slider's touch target one-handed. Sub-11px labels are hard to read on a phone in sunlight. Verify the module tabs are swipeable (research doc flagged the desktop-pin/mobile-swipe fork as unresolved).

**Riley (Stress Tester):** The chat sim, slider, and tabs are the fragile surfaces — test rapid drag, mid-animation navigation, and reduced-motion. The missing "06" in the 01–07 section sequence suggests a dropped/renumbered section worth auditing.

**Priya (SMB owner-operator, project persona):** Non-technical, time-poor, skeptical. She needs the "complete back office, today" belief-ladder rung to land above the fold. The BYOK/MCP language ("MCP server") is developer jargon that may not translate — ensure the AI section leads with the plain-language payoff ("ask what sold last month") before the acronym.

## Minor Observations

- One Georgia serif declaration breaks the One-Family Rule — trace and remove or document it.
- Detector's `design-system-*` advisories are mostly a stale-doc signal: the DESIGN.md I just wrote under-describes the real type ramp. Reconcile the doc (or the page) rather than treating 197 advisories as 197 defects.
- The `side-tab` hit is a confirmed false positive (resize handle).
