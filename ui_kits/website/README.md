# Website UI Kit

Mobile-first marketing website kit, derived from the live `careersuccess.analytixlabs.co.in` Next.js app.

## Files
- `index.html` — interactive course catalog (414px design width)
- `CourseCard.jsx` — three-variant course card (primary / secondary / compact)
- `styles.css` — full kit stylesheet (imports `colors_and_type.css`)

## Course card variants

| Variant | Use | Visual |
| --- | --- | --- |
| `primary` | Flagship / featured program | Navy gradient card, white type, ghost CTA, top hairline gradient |
| `secondary` | Default high-priority track | White surface, teal border (1.5px), gradient CTA |
| `compact` | Catalog grid (3-up on desktop) | White surface, sky border, denser padding |

All variants share the same anatomy: top hairline strip → badge + duration pill → title → description → topic chips → meta row (mode, certification) → price block → full-width CTA. Touch targets ≥ 44px. Cards stack on mobile, become 2-up at `md:` (768px), and 3-up for `compact` at `xl:`.

## Mobile-first behavior
- Hero CTAs stack vertically below 640px, inline above.
- Nav uses a burger button below 1024px; full link list + inquiry CTA above.
- Filter chips horizontally scroll without a visible scrollbar on mobile.
- Course grid is single-column on mobile, no horizontal overflow.

## Notes / future work
- The Curriculum and Lead Capture form sections are not yet recreated — the live page uses a sticky form on desktop and inline on mobile.
- Iconography is currently a mix of inline lucide-style SVGs (in card meta rows) and emoji (in role/feature cards from the live source). Production should standardize on lucide-react.
