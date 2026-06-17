# Design

## Identity

Sito fratello di [Cave Oves](https://caveoves.it) — stessa identità visiva (font, palette, grain), contenuto completamente diverso. Il Buon Pastore racconta il percorso "dal pascolo alla tavola" in chiave cinematografica.

---

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FAF7F0` (Parchment) | Gallery bg, contatti bg, lightbox bg |
| `--fg` | `#1A1A1A` (Ink) | Primary text, panel-bg fallback |
| `--muted` | `#5A5A5A` | Body text, secondary info |
| `--oro` | `#C8922A` | Accent: labels, borders, links, buttons, dots |
| `--border` | `rgba(107,63,31,.08)` | Card borders, dividers |

### Scheda Tag Colors (earthy palette)

| Position | Color | Association |
|----------|-------|-------------|
| 1st | `#C8922A` (Oro) | Ingredienti |
| 2nd | `#A0623B` (Terracotta) | Stagionatura |
| 3rd | `#6B5340` (Noce) | Pezzatura |
| 4th | `#8B7D3C` (Grano) | Conservazione |
| 5th | `#8C5A4A` (Mattone) | Disponibilità |

### Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Headings | Playfair Display | 400, 500, 600, 700, 900 | h1, h2, product names, nav logo, mobile menu links, gallery hint |
| Body | DM Sans | 300, 400, 500, 600 | Paragraphs, labels, buttons, UI text |
| Sopratitolo | Barlow Condensed | 300 | Hero sopratitolo text (uppercase, light) |

Fonts are **self-hosted** as variable woff2 files in `docs/assets/fonts/`. No external requests to Google Fonts. Declared via `@font-face` with `font-display:swap` at the top of `style.css`.

### Spacing

| Token | Value |
|-------|-------|
| `--nav-h` | `64px` |
| `--pad` | `clamp(20px, 5vw, 48px)` |

### Global Reset

- `-webkit-tap-highlight-color: transparent` on all elements (removes blue tap flash on mobile)

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `--ease` | `cubic-bezier(.16,1,.3,1)` | Panel leaving, general animations |
| `--ease-out` | `cubic-bezier(.22,1,.36,1)` | Panel entering, reveals |

---

## Components

### Hero

- Full-viewport background image (`hero.webp`, preloaded)
- Dark overlay (`rgba(0,0,0,.35)`)
- Centered content: sopratitolo text (Barlow Condensed, white, uppercase) → titolo image (white, large) → subtitle text (white, weight 400) → CTA button
- Title image uses `filter: brightness(0) invert(1)` to render white from dark PNG source
- CTA: pill shape, glass effect (`backdrop-filter:blur(4px)`), gradient background, hover lift
- Bottom cue: "scorri" + bouncing arrow (hidden on mobile)

### Chapter Cards (panels 1–5)

- **Desktop**: positioned bottom-right (`clamp(240px,28vw,380px)` width)
  - Glass morphism: `background:rgba(0,0,0,.5)` + `backdrop-filter:blur(8px)`
  - Left border: `3px solid var(--oro)`
  - Border-radius: `10px`
  - Content: label (oro, uppercase) → h2 (white) → p1 → p2 (optional) → photo dots (if multiple photos)
  - Reveal animation: `opacity 0 → 1` + `translateY(20px → 0)` with 0.4s delay
  - Chapter labels are empty — only the title displays

- **Mobile (≤768px)**: full-width bottom sheet
  - `max-height: 45vh`, `overflow-y: auto`
  - Border-top replaces border-left: `2px solid var(--oro)`
  - No scroll cue arrow

### Gallery Strip

- Background: `var(--bg)` (parchment)
- Header: centered label + h2 + hint text (Playfair 400, oro)
- Strip: `display:flex`, horizontal scroll (`overflow-x:auto`), `scroll-snap-type:x mandatory`
- Items: `flex:0 0 clamp(200px,28vw,320px)`, rounded (10px), snap-align center
- Item structure: name (top, parchment bg) → image (flex:1, object-fit:cover)
- Hover: image `scale(1.05)` with 0.5s ease
- Custom scrollbar: 4px height, oro thumb
- Touch: direction detection — horizontal swipes scroll strip, vertical swipes navigate panels

### Product Lightbox

- Overlay: `rgba(0,0,0,.8)` + `backdrop-filter:blur(6px)`
- Inner: `max-width:800px`, `max-height:85vh`, `overflow-y:auto`, `border-radius:14px`
- Touch scroll: `-webkit-overflow-scrolling:touch`, `touch-action:pan-y`
- Layout: 2-column grid (≥600px) → image left, info right. Stack on mobile.
- Image: `object-fit:cover`, full height, rounded on left side (desktop) or top (mobile)
- Info: name (Playfair 600) → subtitle (oro, uppercase, small) → description → scheda (tag rows) → WhatsApp button
- **Scheda tecnica**: each field as a row with colored container (10% opacity bg), bold colored label + muted value text
- **WhatsApp button**: outlined style — parchment bg, green border (`#25D366`), dark green text (`#1a8f45`), green icon, hover tint
- **Close button**: top-right circle, dark semi-transparent bg (`rgba(0,0,0,.5)`), white × (flex-centered, `line-height:1`), hover turns red (`rgba(180,40,40,.7)`)

### Contatti Section

- Two-column grid (`1fr 1.4fr`) on desktop, single column on mobile
- **Left column**: 4 link cards (Phone, Instagram, WhatsApp, Email)
  - Each: flex row, icon (oro, 28px) + text column (label uppercase oro + detail muted)
  - Border: `1px solid var(--border)`, radius 10px
  - Hover: border → oro, lift -2px, subtle shadow
- **Right column**: bordered container (radius 12px)
  - Place icon + label + address (centered)
  - Orari box: bordered (8px radius), label + rows (day | hours)
  - Closed day: hours in red (`rgba(192,57,43,.7)`)
  - Map: click-to-open placeholder (dashed oro border, pin icon + CTA text, opens Google Maps in new tab on click)
- **Mobile**: left cards become 2×2 grid (icon + label only, detail hidden)

### Navigation (top)

- Fixed, full-width, `z-index:8500`
- Glass: `rgba(0,0,0,.2)` + `backdrop-filter:blur(10px)`, bottom border `rgba(255,255,255,.06)`
- Logo: left (`titolo.png`, 28px height, white via CSS filter, clickable → panel 0)
- Links: absolute center (small font, white 80%, hover underline oro)
- Tools: right (lang toggle as bordered pill, burger on mobile)
- Burger: `z-index:8600` (above nav and menu overlay) to ensure X is always visible/clickable
- **Mobile menu**: fullscreen overlay (`100vw × 100vh`, `z-index:8400`)
  - Background: `rgba(0,0,0,.92)` + `backdrop-filter:blur(16px)`
  - Links centered, Playfair `clamp(1.6rem,6vw,2.2rem)`, stagger reveal (50ms between each)
  - Open/close via opacity transition
  - Burger → X animation

### Rail

- Removed — intentionally simplified. Navigation via scroll/swipe/keyboard/nav links only.

---

## Effects

| Effect | Implementation | Where |
|--------|---------------|-------|
| Clip-path expansion | CSS `clip-path: inset()` transition 0.65s | Panel transitions |
| Crossfade | Opacity 2s on stacked slides, JS interval 5s, dot nav + swipe | Chapter backgrounds |
| Grain overlay | SVG noise filter, fixed, `opacity:.02`, `pointer-events:none` | Full page (desktop only) |
| Reveal stagger | `opacity` + `translateY`, delay 0.3–0.4s | Chapter card, gallery wrap, contatti wrap |
| Bounce | `translateY(0→5px)` keyframe 2s infinite | Scroll arrow (desktop only) |
| Hover lift | `translateY(-2px)` + `box-shadow` | Cards, buttons |
| Gradient text | `background-clip:text` white→oro | — (removed, logo is now image) |
| Nav blur | `backdrop-filter:blur(10px)` | Top navbar |
| Glass card | `rgba(0,0,0,.5)` + `backdrop-filter:blur(8px)` | Chapter text cards |

All effects respect `prefers-reduced-motion: reduce` (transitions disabled, animations stopped).

---

## Image Specifications

| Category | Long edge | Quality | Target weight |
|----------|-----------|---------|---------------|
| Hero | 1920px | 80 | ~300-500 KB |
| Sections (pascolo, metamorfosi, stagionatura, tavola, lana) | 1920px | 78 | ~35-435 KB |
| Gallery (pecorino) | 800px | 85 | ~48-173 KB |

All images WebP format.

---

## Responsive Summary

| Element | Desktop | Mobile (≤768px) |
|---------|---------|-----------------|
| Chapter card | Bottom-right, border-left | Full-width bottom, border-top, scrollable |
| Scroll cue | Visible (arrow + text) | Hidden |
| Grain | Visible | Hidden |
| Nav links | Centered, horizontal | Fullscreen overlay, large Playfair text |
| Gallery strip | ~320px items | ~200px items |
| Lightbox | 2-column grid | Stacked (image top, info below) |
| Contatti | 2-column grid | Single column, contact cards 2×2 grid |
| Contact card detail | Visible (email, @handle, phone) | Hidden (icon + label only) |
