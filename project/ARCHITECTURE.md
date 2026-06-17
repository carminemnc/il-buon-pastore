# Architecture

## Overview

Single-page showcase site with **full-page scroll-hijack**. The body is locked (`overflow:hidden`), every section is a fullscreen panel stacked via `position:absolute;inset:0`. Scroll/touch/keyboard triggers panel transitions with clip-path expansion effects.

Stack: **HTML + CSS + JS vanilla**, zero build, zero dependencies, zero server-side code.  
Deploy: GitHub Pages from `/docs` on `main` branch.  
Live: **https://ilbuonpastorebio.it**

---

## File Structure

```
docs/
├── index.html              ← shell (hero + empty contatti slot)
├── CNAME                   ← custom domain
├── robots.txt              ← crawler permissions + sitemap reference
├── sitemap.xml             ← URL + product images for Google
├── css/style.css           ← all styles, @font-face, animations, responsive
├── js/
│   ├── i18n.js             ← dictionary + toggle + persistence
│   └── main.js             ← engine + manifests + DOM generation
└── assets/
    ├── fonts/
    │   ├── barlow-condensed.woff2  ← Barlow Condensed (300)
    │   ├── dm-sans.woff2           ← DM Sans variable (300–600)
    │   └── playfair-display.woff2  ← Playfair Display variable (400–900)
    └── imgs/
        ├── hero.webp           ← ~495 KB, preloaded
        ├── titolo.png          ← hero title logo (rendered white via CSS)
        ├── favicon.png
        ├── apple-touch-icon.png
        ├── og-cover.jpg
        ├── pascolo/            ← pascolo-1.webp ... pascolo-5.webp
        ├── metamorfosi/        ← metamorfosi-1.webp ... metamorfosi-5.webp
        ├── stagionatura/       ← stagionatura-1.webp ... stagionatura-3.webp
        ├── tavola/             ← tavola-1.webp ... tavola-2.webp
        ├── lana/               ← lana-1.webp ... lana-2.webp
        └── pecorino/           ← 14 product photos (800px long edge)
```

---

## Panel Order

| Index | Panel | Type | Content |
|-------|-------|------|---------|
| 0 | Hero | Static HTML | Sopratitolo text, title logo, subtitle text, CTA button |
| 1 | Pascolo | Chapter (5 photos crossfade) | Narrative text |
| 2 | Metamorfosi | Chapter (5 photos crossfade) | Narrative text |
| 3 | Stagionatura | Chapter (3 photos crossfade) | Narrative text |
| 4 | Tavola | Chapter (2 photos crossfade) | Narrative text |
| 5 | Lana | Chapter (2 photos crossfade) | Narrative text |
| 6 | Galleria | Gallery strip | 14 product cards, horizontal scroll |
| 7 | Contatti | Light panel | Contact info, hours, map |

---

## Scroll Engine

### Core Mechanism

```
body { overflow: hidden }
.panel { position: absolute; inset: 0; opacity: 0; pointer-events: none; clip-path: inset(12% 18% round 20px) }
.panel.is-active { opacity: 1; pointer-events: auto; clip-path: inset(0) }
```

Only one panel is `.is-active` at any time. `goTo(index)` is the **single entry point** for all navigation.

### goTo(index) Flow

1. Guard: if `index === current` or out of bounds or `animating === true` → return
2. Set `animating = true`
3. Determine direction (`fwd = index > current`)
4. Set z-index: leaving panel lower, entering panel higher
5. Remove `.is-active` from current, add direction class (`.is-leaving-fwd` or `.is-leaving-bwd`)
6. Add `.is-active` to target panel
7. After `COOLDOWN` timeout: cleanup leaving panel, set `current = index`, set `animating = false`

### Transition CSS

| State | clip-path | Duration |
|-------|-----------|----------|
| Inactive (start) | `inset(12% 18% 12% 18% round 20px)` | — |
| Active (visible) | `inset(0 0 0 0 round 0)` | 0.65s ease-out |
| Leaving forward | `inset(6% 10% 6% 10% round 14px)` + fade | 0.5s |
| Leaving backward | `inset(-5% -5% -5% -5% round 0)` + fade | 0.5s |

### Constants

| Constant | Value | Notes |
|----------|-------|-------|
| `COOLDOWN` | 700ms | 80ms if `prefers-reduced-motion` |
| `WHEEL_DEBOUNCE` | 500ms | Min time between wheel navigations |
| `CROSSFADE_INTERVAL` | 5000ms | Photo rotation interval |

---

## Input Handling

### Wheel
- `{passive: false}` to allow `preventDefault()`
- Guards: `animating`, time since last wheel < 500ms, `|deltaY| < 30`
- Direction: `deltaY > 0` → next, `deltaY < 0` → prev

### Touch
- `touchstart`: record `touchY` and `touchX`, detect if inside `.gallery-strip`
- `touchmove`: `preventDefault()` unless inside `.gallery-strip`, `.panel-light`, or `.product-lb`
- `touchend`: guards for `animating`, `touchLock`, lightbox open. In gallery: navigate only if swipe is more vertical than horizontal. Threshold: `|dy| > 50px`

### Keyboard
- `Escape` → close lightbox
- If lightbox open → block all other keys
- `ArrowDown` / `PageDown` → next panel
- `ArrowUp` / `PageUp` → prev panel
- `Space` → next (unless focused on button/link)
- `Home` → first panel
- `End` → last panel
- Ignored when focus is on INPUT/TEXTAREA/SELECT

### Click
- Any element with `[data-goto]` attribute → `goTo(parseInt(value))`
- Also closes burger menu if open

---

## DOM Generation (main.js)

The HTML shell contains only the Hero panel and an empty Contatti section. Everything else is generated at runtime from manifests.

### Generation Order
1. **Contatti panel** innerHTML populated from `CONTATTI` object
2. **Chapter panels** generated from `CHAPTERS` array, inserted before contatti
3. **Gallery panel** generated from `CHAPTERS` entry with `gallery: true`, items from `GALLERY` array
4. **Nav links** generated from `NAV_ORDER` array + hardcoded "Contatti"
5. **i18n applied** via `window.i18n.setLang()`
6. **Crossfade observers** attached to each `.panel-crossfade`
7. **Product lightbox** element created and appended to body
8. **Map click-to-load** handler attached to placeholder

---

## Crossfade System

Each chapter with `count > 1` gets a `.panel-crossfade` container with N `.scene-slide` children.

**Control mechanism:**
- MutationObserver watches the parent `.panel` for `class` attribute changes
- When panel gains `.is-active` → `play()` starts `setInterval`
- When panel loses `.is-active` → `pause()` clears interval
- Interval rotates `.is-active` class through slides (modulo wrap)
- CSS transition: `opacity 2s ease-out`

**User navigation:**
- Dot indicators inside chapter card (one per photo, oro active state)
- Click/tap dot → jump to slide, restart auto-advance timer
- Horizontal swipe on photo (mobile) → next/prev slide, restart timer
- Dots stay synced with both auto-advance and manual navigation

---

## Product Lightbox

- Single `<div class="product-lb">` appended to body
- `role="dialog"`, `aria-modal="true"`, `data-i18n-attr="aria-label"` with key `galleria.lb.label`
- Content rebuilt on every open via `openProduct(index)`
- Grid layout: image | info (2 columns on ≥600px, stack on mobile)
- Scheda tecnica displayed as labeled rows with colored containers
- WhatsApp "Chiedi info" button with pre-filled message
- Close triggers: × button, backdrop click, Escape key
- Touch scroll preserved inside lightbox (`-webkit-overflow-scrolling:touch`, `touch-action:pan-y`)
- When open: keyboard navigation and touch panel navigation disabled

---

## State

| Key | Storage | Purpose |
|-----|---------|---------|
| `ibp-lang` | localStorage | Language preference (it/en) |

No other persistent state. No session state. No URL routing.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| ≤768px | Grain hidden, burger menu, fullscreen overlay nav, chapter card full-width bottom-sheet (max-height 45vh, scrollable), contatti single column, scroll cue hidden |

### Mobile Focus Points

Chapters support `data-focus` attribute on `.panel-bg` to control `background-position` on mobile:
- `center` (default), `top`, `bottom`, `left`, `right`
- Combinations: `top-left`, `top-right`, `bottom-left`, `bottom-right`

---

## Performance Patterns

- Hero image `<link rel="preload">`
- Gallery images `loading="lazy"`
- Fonts self-hosted as variable woff2 (`docs/assets/fonts/`), no external requests
- Google Maps loaded only on user click (click-to-load pattern)
- Crossfade timers scoped to active panel only
- `will-change: clip-path, opacity` on `.panel`
- CSS transitions (GPU-composited) instead of JS animation
- Single CSS file, two small JS files
- All images WebP optimized (sections: 1920px long edge q78, gallery: 800px long edge q85)
- Zero third-party requests on initial page load

---

## SEO

- Canonical URL
- Open Graph tags with `og:locale`, `og:locale:alternate`, `og:site_name`
- JSON-LD structured data: `LocalBusiness` schema with address, geo, hours
- `sitemap.xml` with Google image sitemap extension (all 14 product photos)
- `robots.txt` allowing all crawlers
- SEO-optimized `alt` text on gallery images: `"{name} - {subtitle} | Il Buon Pastore, pecorino a latte crudo biologico"`

---

## Accessibility

- `prefers-reduced-motion: reduce` → all transitions/animations disabled via CSS
- `aria-label` on icon buttons (lang, close, burger)
- `aria-expanded` on burger toggle
- `role="dialog"` + `aria-modal="true"` + bilingual `aria-label` on lightbox
- Focus visible: `outline: 2px solid var(--oro)` on `:focus-visible`
- `p:empty { display: none }` hides empty paragraphs cleanly
- Keyboard navigation complete (disabled during lightbox)
