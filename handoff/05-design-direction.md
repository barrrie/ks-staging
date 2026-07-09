# 05 — Design direction

The job: take the **bones AND the mischief** of Barrie's 40th birthday site and re-skin it for a B2B agency — in monochrome plus one purple accent. This is not a stiff corporate site. It should feel like the birthday site's smarter, work-appropriate sibling: confident, a little brutalist, and genuinely quirky. The whimsy is a feature, not a bug — it's proof that a "community marketing" shop actually has personality and doesn't take itself too seriously. The existing KS splash (`style.css`, `darkmode-mockup.html`) is the starting point.

**Guiding tension:** playful *and* credible. Purple + hard edges + dry wit + a few delightful surprises — but always legible, fast, and trustworthy to a CMO. When a choice is fun but confusing, legibility wins. Otherwise, lean into the fun.

---

## What to carry over from the birthday site

**The bones:**
- **Terminal-style column headers** as section eyebrows ("Navigate" / "The Weekend" / "The Wall" → `WHAT WE DO` / `THE METHOD` / `RECEIPTS`). The signature move — small, uppercase, tracked-out, in a thin bordered bar.
- **Bordered cards with hard offset shadows** (`box-shadow: 8px 8px 0 var(--text-primary)`, `border-radius: 0`). The primary content unit.
- **Brutalist buttons** — solid fill, hard border, offset shadow, translate-on-press (already in `.contact a`).
- **Uppercase mono tags/chips** (`FLAGSHIP`, `RETAINER`).
- **Link cards** (icon · text · arrow).

**The mischief (keep it — just in monochrome + purple):**
- **Playful floating widgets** like the birthday site's gift-sun / packing-list / "I take requests" corners. KS equivalents: a little floating "// talk to a person" tab, a draggable sticky note, a "now reading r/____" ticker. Rendered in black/white/purple, not rainbow.
- **Easter eggs and surprise.** A quirky 404, a hover that does something unexpected, a cursor trail of tiny purple dots, a Konami-code moment — pick a couple, keep them cheap and delightful.
- **Micro-animations with attitude** — the offset-shadow "clunk" on press, cards that tilt a hair on hover, a purple selection highlight, a blinking terminal cursor.
- **A living "wall"** — the birthday guestbook, matured. See the soul-touch section.
- **Voice in the UI itself** — button labels, empty states, form confirmations should have the dry wit from `01`. ("Got it. A real human will reply, probably Barrie.")

## What to actually drop

Only the stuff that reads as *party*, not *personality*, or that fights legibility:
- Literal rainbow animated gradients (the birthday CTA cycled 7 colors) — recolor any kept animation to monochrome/purple.
- Palm-tree rain, beach emoji confetti (unless reimagined as an on-brand purple easter egg — designer's call).
- The password gate, countdown clock, and live weather strip (no functional reason here).
- The leftover `Cormorant Garamond` / `Outfit` font import in `style.css` — unused and off-brand. Remove it.

Rule of thumb: **keep the spirit of every playful element; restyle it monochrome + purple; cut only what's purely party-logistics.**

## Color — LOCKED

Monochrome base + **purple accent `#8806CE`** (the light-mode splash color). This is the single accent, in both light and dark themes. Because whimsy is welcome, the accent can appear a little more freely than a typical B2B site — selection highlights, primary CTA fills, hover states, the status-line, easter-egg flourishes, link underlines on hover — but structure stays black-on-white. Purple is the punctuation and the personality; it is not a background wash.

```
--white:#fff  --gray:#f5f5f5  --gray-dark:#e8e8e8
--border:#d0d0d0  --border-light:#e5e5e5
--text-primary:#000  --text-secondary:#444  --text-tertiary:#666  --text-muted:#999
--accent:#8806CE           /* purple — the one accent, both themes */
--accent-hover:#6d05a5     /* darker purple for hover; tune to taste */
--border-radius:0
```

Contrast note: `#8806CE` on white passes AA for large/bold text and UI, and is fine for fills/borders. For small body text, keep text black — use purple for emphasis, links-on-hover, and accents, not paragraphs.

## Typography

- **System Helvetica stack**, already in tokens: `"Helvetica Neue", Helvetica, Arial, sans-serif`. No web-font import. Tight tracking (`-0.03em`; display `-0.04em`).
- Big, confident display H1s. Strong size contrast between eyebrow / H1 / body.
- Body 15–17px, line-height ~1.5, `--text-secondary` for long-form.
- **Monospace** (`"Courier New", monospace`) is the "operator" texture — use it for terminal labels, the status-line, tags, and playful UI microcopy. It's a big part of the quirky-but-technical vibe; use it more than you'd think.

## Layout & grid

- Max content width ~1100–1200px, generous padding and vertical breathing room.
- **Section bands** alternate `--white` / `--gray` for rhythm — monochrome.
- The birthday site's full 3-column terminal layout is too busy as a global template — don't replicate it wholesale — but a section or two *can* nod to it (e.g. a nav-rail + content split on `/what-we-do`) if it's fun and clear. Main flow stays single-column and scannable; card grids (2–3 up) are the workhorse.
- Hard grid, hard edges, no rounded corners, no soft shadows — only the hard offset shadow.

## Core components (build once)

1. **`.eyebrow` / column-header label** — uppercase mono, letter-spacing ~0.1em, small, in a thin bordered bar or with a leading rule. Opens every section.
2. **`.card`** — solid border, `border-radius:0`, `box-shadow: 8px 8px 0 var(--text-primary)` (4px on mobile). Hover: translate + shadow grow (mirror `.contact a:hover`); a ≤1° tilt is a welcome bit of character.
3. **`.btn`** — brutalist button from `.contact a`. Primary = purple fill; secondary = white fill / black border. Playful active-state "clunk."
4. **`.tag`** — small uppercase mono chip, bordered.
5. **`.link-card`** — icon · text · `→` arrow; arrow slides on hover.
6. **`.stat-tile`** — big number + small mono label, bordered. For receipts. (Tiles, not charts.)
7. **Header / footer** — shared partials, with room for a playful footer easter egg.

## The "soul" touch (bring the birthday heart, matured)

The birthday site lived because of its interactive heart. KS should have real personality here too — pick **two** of these and do them well:

1. **Terminal status-line** in the hero — monospace, e.g. `// currently earning trust in r/____ , r/____ , +200 rooms`, with a blinking cursor. Static text is fine to ship. **Build this.**
2. **A floating "talk to a person" tab** — the birthday floating-widget pattern, restyled purple/mono. Persistent, quirky, low-key.
3. **A "receipts wall"** — the guestbook grown into social proof: short real community quotes as pinned notes on a bordered board. `[BARRIE: real quotes]`.
4. **A delightful 404 and/or one hidden easter egg** — designer's choice; keep it cheap and on-voice.

Do not rebuild the live Firebase guestbook / countdown / weather. Personality, yes; party-logistics, no.

## Motion & interaction

- The offset-shadow press and card hover-translate/tilt are the base vocabulary; add a few tasteful surprises (cursor blink, a purple hover flourish, one easter egg).
- Honor `prefers-reduced-motion` — kill all non-essential motion cleanly.
- No autoplay audio, no scroll-jacking, no parallax, nothing that slows the page.

## Dark mode

Already mocked (`darkmode-mockup.html`). Support via `prefers-color-scheme` (and/or a manual toggle). Keep the **purple accent identical** across themes — do not switch to yellow in dark mode; override that leftover token to `#8806CE`.

## Responsive

Follow existing breakpoints (`max-width:768px`): shrink display type, reduce offset shadows (8px→4px), collapse grids to one column, hamburger nav. Playful widgets should gracefully simplify or hide on small screens.

## Accessibility

- Near-black on white makes contrast easy; verify the **purple** passes AA anywhere it carries text (fills/borders/large-bold are fine; keep small body text black).
- Visible `:focus-visible` states on everything (the offset shadow doubles nicely as a focus ring).
- Semantic headings (one H1/page), landmarks, alt text, fully-labeled forms, real `<button>`s.
- Any easter egg must be skippable and never trap keyboard/screen-reader users.
- Run the `design:accessibility-review` skill before launch.
