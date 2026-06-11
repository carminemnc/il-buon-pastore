# Il Buon Pastore — AI Rules

## Context

This is a live showcase site. Real customers visit it on their phones to discover the farm, browse the cheese catalog, and contact the farm via WhatsApp. Every line of code ships to real visitors.

For full project context, read:
- `project/ARCHITECTURE.md` — scroll engine, transitions, DOM generation, input handling, state, performance
- `project/DESIGN.md` — visual language, tokens, typography, components, effects
- `project/I18N.md` — bilingual system, dictionary, API, conventions, how to add text
- `project/GALLERY.md` — product catalog, lightbox, WhatsApp flow, how to add/remove products
- `project/CONTATTI.md` — contact data, hours, map

---

## Branches

Before starting any work, determine which branch the user is on and adapt accordingly:

- **main** — Production. Live at `ilbuonpastorebio.it`. Maximum rigor. Every change must be safe, tested, and complete. Flag everything.

If the branch is unclear, ask.

---

## Hard Constraints — Never Violate

### Vanilla JS Only
All code in `docs/js/` must be vanilla JavaScript:
- **No** frameworks, libraries, or build tools
- **No** npm dependencies — zero `node_modules`
- **No** bundlers, transpilers, or preprocessors
- **No** external JS libraries (no jQuery, no GSAP, no Swiper)
- IIFEs with `'use strict'` as module pattern
- ES6+ is allowed (const, let, arrow functions, template literals, etc.)

Do NOT suggest adding build steps, frameworks, or dependencies.

### Static Architecture
- **No** server-side code — GitHub Pages static hosting only
- **No** serverless functions
- **No** database or CMS
- **No** environment variables (no build step to inject them)
- **No** dark mode (intentionally removed — site is cinematographic, light theme only)
- All content hardcoded in manifests (`main.js`) and dictionary (`i18n.js`)
- Deploy: GitHub Pages from `/docs` folder on `main` branch

### Scroll Engine
- Body is `overflow:hidden` — scroll hijacked globally
- `goTo(index)` is the single navigation entry point
- Transitions use `clip-path` expansion/contraction
- Crossfade timers managed via MutationObserver — only run on active panel
- Touch scroll preserved inside `.gallery-strip`, `.panel-light`, and `.product-lb`
- Do NOT suggest replacing with scroll-snap or a library
- See `project/ARCHITECTURE.md` for full engine details

### i18n System
- Flat dictionary, `data-i18n` binding, `t()` helper for bilingual objects
- Do NOT suggest external i18n libraries
- See `project/I18N.md` for full details

### Image Conventions
- All images `.webp` in `docs/assets/imgs/`
- Chapter photos: `{id}/{id}-{N}.webp` (1-indexed)
- Product photos: `pecorino/{name}.webp`
- `count` in CHAPTERS must match actual file count
- See `project/GALLERY.md` for product image details

### Naming Conventions
- JavaScript: camelCase for variables/functions, UPPER_CASE for manifest constants
- CSS/DOM: kebab-case for classes and IDs
- Bilingual fields: `{it:'...', en:'...'}`
- localStorage keys: `ibp-` prefix (`ibp-lang`)

---

## Known False Positives — Do Not Flag

- **`overflow:hidden` on body** — intentional scroll hijack. Not a UX bug.
- **`innerHTML` with `data-i18n`** — all values are developer-controlled dictionary strings. Not XSS.
- **`innerHTML` in product lightbox** — all fields from hardcoded `GALLERY` array. Not user input.
- **WhatsApp link with product name** — name is hardcoded, not user-controlled. Not injection.
- **Google Maps iframe** — sandboxed with minimal permissions. Intentional.
- **No `<noscript>` fallback** — entire site is JS-generated. Out of scope.
- **`e.preventDefault()` on touchmove** — intentional to block native scroll outside allowed zones.
- **Grain overlay `opacity:0.02`** — intentional subtle texture. Not a rendering artifact.
- **`display:none` on `.rail`, `.grain`, `.panel-cue` at ≤768px** — intentional mobile simplification.
- **`tavola.p2` is empty string** — intentional. `p:empty{display:none}` handles it.
- **Phone/email visible in source** — public business contacts, not secrets.
- **No API keys in source** — there are none. Static site, no API integrations.
- **No HTTPS redirect config** — handled by GitHub Pages automatically.
- **No CSP headers** — GitHub Pages doesn't support custom headers. Accepted limitation.
- **No `robots.txt` or `sitemap.xml`** — nice-to-have, not a bug.
- **MutationObserver on every crossfade panel** — lightweight, only watches `class` attribute. Not a concern.
- **Wheel event `{passive:false}`** — required for `preventDefault()` in scroll hijack.
- **`will-change` on panels** — intentional for GPU compositing. Panels are few.
- **No focus trap on lightbox** — lightbox is simple (close button + content). Tab stays within due to backdrop overlay blocking interaction. Acceptable for this context.
- **Scheda split by `|` and `:`** — format is developer-controlled in GALLERY manifest. Not user input parsing.

---

## Review Dimensions

When reviewing code, analyze through ALL of the following lenses simultaneously. A single line can violate multiple dimensions — flag it once with all relevant concerns.

### 1. Functional Correctness

Does every feature work correctly under all conditions?

**Navigation engine:**
- `goTo(index)` handles bounds (0 to total-1)
- `animating` flag prevents double-fire during cooldown
- Wheel debounce (500ms) and threshold (|deltaY| ≥ 30)
- Touch swipe threshold (50px)
- Keyboard: ArrowDown/Up, PageDown/Up, Space, Home, End
- Keyboard disabled when lightbox open
- `[data-goto]` click resolves to correct panel index
- Rail dots sync with current panel
- Burger menu opens/closes, links navigate AND close menu

**Crossfade:**
- Timer starts only on `.is-active` panel
- Timer stops when panel deactivates
- Slides cycle with modulo wrap
- Single-image chapters don't break
- Dot indicators sync with current slide
- Click/tap dot jumps to slide and restarts timer
- Horizontal swipe on photo area changes slide (mobile)
- Swipe restarts auto-advance timer

**i18n:**
- Toggle updates ALL visible text including dynamic content
- Orari rebuilt on language change
- Lightbox shows correct language
- `data-i18n-attr` works for meta tags
- Language persists across reload
- Detection fallback chain works (localStorage → navigator → 'it')

**Dark mode:**
- Intentionally removed — do not re-add

**Gallery:**
- All 14 products render in strip
- Horizontal scroll works (touch + mouse)
- Touch direction detection: horizontal swipes scroll strip, vertical swipes navigate
- Click opens correct product lightbox

**Lightbox:**
- All fields render (image, name, sub, desc, scheda tags, WhatsApp)
- Scheda split by `|` then `:` into labeled rows with colored containers
- WhatsApp link correct (number + pre-filled info message in current language)
- Close via ×, backdrop, Escape
- Touch scroll works inside lightbox
- Panel navigation disabled while open

**Contatti:**
- All links functional (Phone, Instagram, WhatsApp, email, Maps)
- Orari correct in both languages
- Map loads

### 2. Security

- **XSS**: all `innerHTML` from developer-controlled sources only. Flag any user-input → innerHTML path.
- **External links**: `target="_blank"` must have `rel="noopener noreferrer"`
- **iframe sandbox**: Maps properly sandboxed
- **localStorage**: safe access patterns
- **No secrets**: no API keys, tokens, or credentials in source

### 3. Code Style & Consistency

- IIFEs with `'use strict'`
- Consistent naming (camelCase JS, kebab-case CSS, UPPER_CASE constants)
- No dead code or orphaned comments
- No console.log in production
- Functions do one thing (SRP)
- DRY: no duplicated logic

### 4. Engineering Principles

- **KISS**: no unnecessary complexity
- **DRY**: shared helpers (`t()`, `lang()`, `buildOrari()`)
- **YAGNI**: no code for non-existent features
- **Single Source of Truth**: manifests drive everything
- **Manifest-driven**: adding content = adding data, not rewriting DOM logic

### 5. User Experience & Visual Quality

Evaluate against `project/DESIGN.md`:
- Hero communicates brand within 3 seconds
- Hero uses image-based title/sopratitolo (white via CSS filter) + text subtitle
- Scroll direction obvious (arrow + text cue)
- Chapter transitions cinematic, not janky
- Gallery hint guides interaction
- Lightbox provides complete info + clear CTA
- Contact section clear visual hierarchy

### 6. Mobile & Responsiveness

Most visitors are on mobile (375px–430px):
- No unintended horizontal scroll
- Touch targets adequate
- Chapter card doesn't overflow (max-height 45vh, scrollable)
- Gallery strip scrollable with momentum
- Burger menu works
- Lightbox scrollable on small screens
- Map responsive

### 7. Accessibility

- Keyboard: full navigation with arrows, Enter, Space, Escape
- Screen readers: aria-labels, nav landmarks, dialog role
- `prefers-reduced-motion: reduce` disables all animation
- Focus visible: oro outline
- `aria-modal` on lightbox
- `aria-expanded` on burger
- Color contrast: WCAG AA

### 8. Performance

- Hero preloaded
- Gallery images lazy
- Crossfade timers only on active panel
- No memory leaks (intervals cleared)
- `will-change` on animated elements
- Single CSS + two small JS files
- All images WebP

### 9. Production Health

- All paths relative
- CNAME present
- No broken image references (count matches files)
- i18n completeness: every `data-i18n` key in both IT and EN
- RAIL_LABELS removed (rail removed from site)
- NAV_ORDER references valid chapter IDs
- OG meta tags present and correct
- Canonical URL present
- Hreflang tags present (it, en, x-default)
- JSON-LD structured data valid
- sitemap.xml references all product images
- robots.txt present and references sitemap
- Favicon referenced
- Gallery alt text includes product name + subtitle + brand

### 10. Design Consistency

Verify against `project/DESIGN.md`:
- Colors match tokens (parchment, ink, oro, muted)
- Typography correct (Playfair headings, DM Sans body)
- Oro accent consistent
- Grain, glass, gradient effects consistent
- Scheda tag colors from earthy palette
- Component styles match spec

---

## The Visitor Journey

Every finding must be evaluated against this flow:

1. Visitor lands on phone (375px, possibly slow connection)
2. Sees hero — understands "organic sheep cheese farm" in 3 seconds
3. Taps CTA or scrolls down
4. Walks through 5 cinematic chapters (Pascolo → Metamorfosi → Stagionatura → Tavola → Lana)
5. Each chapter: full-screen photos crossfading + narrative text card
6. Arrives at Gallery — horizontal strip of 14 cheeses
7. Taps a product → lightbox with description + WhatsApp info button
8. Taps "Chiedi info" → WhatsApp opens with pre-filled message
9. Scrolls to Contatti — finds address, hours, map, social links
10. Or uses nav to jump directly to Gallery/Lana/Contatti

Every step must work. Every transition must feel intentional. Every tap must respond.

---

## Output Format for Reviews

Group findings by file. For each finding:
- **Line/Section** — where
- **Severity** — Critical / Medium / Low
- **Dimensions** — which review dimensions apply
- **Issue** — what is wrong (1–2 sentences)
- **Impact** — what happens to the visitor
- **Fix** — concrete, actionable, minimal

Severity guide:
- **Critical** — Broken functionality, security vulnerability, accessibility barrier, site unusable on common device/browser
- **Medium** — Degraded experience, code quality problem, design inconsistency, maintainability concern
- **Low** — Minor improvement, polish, optimization

End with:
1. Deal Breakers (must fix before deploy)
2. Should Fix (fix soon)
3. Nice to Have (can wait)
4. Regression Risk (what could this change break?)
5. i18n Completeness Check (all keys present in both languages?)
6. Manifest Sync Check (CHAPTERS counts, RAIL_LABELS length, NAV_ORDER validity)
7. Verdict (safe to deploy? Yes / Yes with reservations / No)
