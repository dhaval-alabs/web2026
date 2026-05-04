# AnalytixLabs Design System

A design system for **AnalytixLabs** — a Nasscom-FutureSkills Prime certified data science, analytics, and AI training company based in India. The system codifies the modern visual language used on the new Next.js `careersuccess` landing pages (live example: https://careersuccess.analytixlabs.co.in/lp/data-science-specialization-course-lg/).

## What's in this system

| File / folder | What it is |
| --- | --- |
| `README.md` | This file — brand context, content + visual + iconography rules |
| `colors_and_type.css` | All design tokens (colors, gradients, type, spacing, radii, shadows) + base element styles |
| `assets/` | Logos and brand marks (PNG / WEBP / SVG) |
| `ui_kits/website/` | Mobile-first marketing website kit — course cards, hero, sections, click-thru prototype |
| `preview/` | Cards that populate the Design System tab |
| `SKILL.md` | Cross-compatible skill manifest |

## Source materials

- **Live reference:** https://careersuccess.analytixlabs.co.in/lp/data-science-specialization-course-lg/
- **Marketing site:** https://analytixlabs.co.in/
- **Codebase (modern, source of truth):** GitHub `dhaval-alabs/careersuccess_alabs` — Next.js 16, Tailwind 4, lucide-react. Tokens lifted from `src/app/globals.css`. Section components lifted from `src/components/public/sections/*`.
- **Legacy codebase:** GitHub `dhaval-alabs/careersuccess_legacy`

## Products

AnalytixLabs runs flagship cohort programs in:
- **Data Science Specialization** (10.5 mo, with AI / GenAI / Agentic stack) — flagship
- **Core Data Analytics** (6 mo) — entry track
- **Business Analytics, Big Data, Cloud, Cybersecurity** — secondary courses

The core surface in this system is the **marketing website / landing page**, where a "course card" is the primary unit of conversion.

---

## Content fundamentals

**Voice.** Direct, candid, and confidence-building. Speaks to working professionals and career-switchers, not students.

**Person.** Second person ("you", "your") for the learner; first-person plural ("we", "ours") for the company. Never first-person singular.

**Tone examples (lifted from live copy):**
- *"The Last Data Course You'll Ever Need — With AI Built In."*
- *"Your Life Doesn't Pause for Learning. Neither Does Ours."*
- *"The Best Time to Start Was Yesterday. The Second Best Is Now."*
- *"You don't just use AI tools — you design the systems that coordinate them."*

**Casing.** Title Case for section headlines. Sentence case for everything else. Eyebrow labels are ALL CAPS with `0.14em` letter-spacing (e.g. `CHOOSE YOUR PATH`, `CAREER OUTCOMES`).

**Numbers and proof.** Hard numbers wherever possible: `10.5mo`, `38 live sessions`, `₹25L senior salary`, `35k+ learners`, `94% placement`. Never round to vague terms like "many" or "lots."

**Punctuation.** Em-dashes (`—`) are heavily used to set up reframes ("Most courses stop here — we don't"). Trailing arrows on CTAs: `Reserve My Seat ↗`, `Start with Core →`, `Enquire Now ↗`.

**Emoji.** Used sparingly as **single-glyph icons** in feature/role cards (🤖, 📊, ⚙️, 🛡️, 💻, 🎥, 🏫, 📅). Never inline in body copy. Treat as a tonal seasoning — replaceable with proper SVG icons in production.

**Currency.** Indian rupee (`₹`) with `L` (lakh) suffix for large numbers (`₹25L`, `₹52,000 + GST`).

**No-go's.** No "unlock," no "10x," no startup-bro language, no exclamation marks, no fake urgency beyond named batches ("Next Batch Filling Fast" is OK because it's literal).

---

## Visual foundations

### Color
- **Light mode is the default** — most sections sit on the body background `#F4FBFF` (a barely-blue holographic neutral).
- **Two-color brand accent:** teal `#00D97E` and sky `#6EDAFD`, almost always presented together as a 135° gradient (`var(--grad)`). The gradient stands in for "AI / forward motion."
- **Navy `#0B1A3D`** is the type color and the dark-section background. CTA banners, footers, and one of the two pricing cards flip to navy.
- **Link / eyebrow blue `#1A4A8F`** is used for uppercase section labels and inline links on light backgrounds.
- **Body text** is a desaturated slate (`#4A5870`, `--muted`) — never pure black on white.

### Typography
- **Display:** [Manrope](https://fonts.google.com/specimen/Manrope) — weights 300/400/500/600/700/800. Used for h1–h3, prices, big stat numbers, and the brand wordmark.
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) — weights 300–700. Used for paragraphs, eyebrows, button labels, UI chrome.
- Both load from Google Fonts via `@import` — no local font files are needed.
- Tight tracking on display (`-0.022em`); wide tracking on eyebrow caps (`+0.14em`).
- Body line-height is generous: `1.75` for prose, `1.85` for descriptions.

### Backgrounds — "holographic canvas"
Pages layer four soft animated radial blobs (`.holo-blob-1..4`) plus a faint 64×64 grid (`.holo-grid`) and a 45° shimmer (`.holo-shimmer`) under all content. Effect is iridescent without ever being noisy — colors are 4–22% opacity and blurred 110px. **Never** use vibrant gradients as raw section backgrounds; the holographic layer is the only place gradients live full-bleed.

### Imagery
The codebase ships almost no photography — visual interest comes from gradient blobs, glass cards, emoji-as-icons, and the navy/light alternation. When real imagery is added, expect cool/neutral tones to match the holographic canvas. **Avoid** warm/orange photography.

### Cards
- **Light cards:** `bg-white`, `border: 1.5px solid rgba(0,217,126,0.30)` for highlighted, `1px rgba(110,218,253,0.25)` for default. Radius `16–20px`. Shadow `var(--shadow-2)` (a green-tinted soft glow, **not** a generic gray shadow).
- **Dark cards:** the navy gradient `--grad-navy` with a 2px `--grad` strip at the top edge.
- **Glass cards:** `rgba(255,255,255,0.75)` + `backdrop-blur(16px)` + 1px sky border + an inset 1px white highlight.
- Hover: `translateY(-2px)` plus a stronger teal-tinted shadow. Borders never change color drastically — they brighten.

### Borders + radii
- Inputs/chips: 5–8px. Buttons: 10px. Cards: 16–24px. Pills: full.
- Border colors are always the brand palette at low opacity (sky 25%, teal 30%) — **never** plain `#e5e7eb`.

### Shadows
- All shadows are **tinted teal or sky**, never neutral gray. This is a signature.
- `0 4px 32px rgba(0,217,126,0.07)` — default card.
- `0 6px 24px rgba(0,217,126,0.30)` — primary button rest.
- `0 12px 36px rgba(0,217,126,0.38)` — primary button hover.
- `0 16px 56px rgba(11,26,61,0.18)` — dark hero card.

### Animation
- Entry: `fade-up` (24px translate, 0.6s ease) staggered by `delay-100/200/300/400`.
- Persistent: `blink` (2s) on tiny status dots; gentle `floatBlob` (18–28s) on background blobs.
- Hover: `translateY(-2px)` + shadow swap, 200ms ease. No bounces or springs.
- Easing: default `ease`; one cubic-bezier `(0.34, 1.56, 0.64, 1)` for chart bars only.

### Press / hover states
- Primary button: opacity drops to 0.92, shadow grows.
- Secondary button: border brightens from sky-25%-opacity to full sky.
- Cards: lift 2–4px on hover, shadow grows.
- No "press shrink" — the design stays still on click; only the hover lift releases.

### Transparency + blur
- Glass surfaces use 60–75% white + 16px blur, gated to feature cards and the hero card stack.
- Tags use 10–12% color tint with a 25% colored border (no blur).

### Layout
- Mobile-first. Sections pad `100px 5%` on desktop, collapse to `60px 5%` on mobile.
- Single-column on mobile; 2-column hero / 2-column tracks / 3–4-column role grids unlock at `lg:` (1024px).
- Fixed elements: holographic background layers (`position: fixed; z-index: 0`); content sits at `z-10`.
- Forms in the curriculum section are `sticky top-32` on desktop.

### Status indicators
- 7px teal dot inside a pill = "live / available". Combined with `animate-blink` for "batch enrolling now" badges.

---

## Iconography

AnalytixLabs' codebase doesn't ship a custom icon font or sprite. Two systems are used:

1. **`lucide-react`** (`^0.576.0`) — used in admin and CTA components for inline UI icons. Stroke-based, uniform 1.5px weight. **Default icon system for production.** CDN-available; this design system links via `https://unpkg.com/lucide-static@latest/icons/` for SVG previews.
2. **Single-glyph emoji** — used as illustrative icons inside feature/role cards on landing pages: 🤖 🕹️ 📈 📊 ⚙️ 🛡️ 💻 🎥 🏫 📅. Set at `1.6rem`–`2.5rem`, given their own line above the title. This is intentional shorthand for marketing surfaces. **Do not** mix lucide and emoji on the same card.

**Logo marks** (in `assets/`):
- `AnalytixLabs Logo 2024.png` — full horizontal lockup for light backgrounds
- `Alabs Icon 2024 white.webp` — square mark for dark backgrounds
- `Logo icon.svg` — vector mark for inline use
- `Final Logo IITP IITB 2026.webp` — co-branded lockup with IIT partners

**Substitution flag.** No custom AnalytixLabs icon set was found. For UI affordances where lucide doesn't fit, use closest-match lucide icon and document. **Ask the founder** if a proprietary icon set exists.

---

## Mobile-first

Every component in `ui_kits/website/` is designed mobile-first (375–414px), then enhanced at `md:` (768px) and `lg:` (1024px). Touch targets ≥ 44px. CTAs are full-width on mobile and inline on desktop. Course cards stack vertically on mobile and become a 2-column grid at `md:`.

---

## Index

- **Tokens:** `colors_and_type.css`
- **Course card kit:** `ui_kits/website/index.html`, `ui_kits/website/CourseCard.jsx`, `ui_kits/website/Hero.jsx`, etc.
- **Preview cards:** `preview/*.html`
- **Skill manifest:** `SKILL.md`
- **Brand assets:** `assets/`
