# Gallery — Product Catalog

## Overview

The gallery is panel index 6 — a horizontal scrollable strip of 14 product cards. Tapping a card opens a product lightbox with full details and a WhatsApp "Chiedi info" button.

---

## GALLERY Array Format

Each product is an object in the `GALLERY` array in `main.js`:

```js
{
  src: 'assets/imgs/pecorino/ricotta.webp',   // image path
  name: 'Ricotta Fresca',                      // display name (invariant, not translated)
  sub: { it: 'Cremosa', en: 'Creamy' },        // subtitle (bilingual)
  desc: { it: '...', en: '...' },              // full description (bilingual)
  scheda: { it: '...', en: '...' }             // technical sheet (bilingual, pipe-separated)
}
```

---

## Current Products (14)

| # | Name | Subtitle (IT) | Ageing | Availability |
|---|------|---------------|--------|--------------|
| 1 | Ricotta Fresca | Cremosa | — | Year-round |
| 2 | Il Fresco | Pecorino a buccia bianca | ~1 week | Year-round |
| 3 | La Caciotta | Pecorino semistagionato | Min. 30 days | Year-round |
| 4 | L'Appassito | A pasta non lavorata | ~30 days | From December |
| 5 | L'Aromatico | Alle erbe aromatiche | ~20 days | From December |
| 6 | Il Gobbo | A caglio vegetale | ~60 days | From February |
| 7 | Il Noci | Nella foglia di noce | Min. 100 days | From July |
| 8 | Il Castagno | Nella foglia di castagno | Min. 100 days | From October |
| 9 | L'Ubriaco | Nella vinaccia di Sangiovese | Min. 100 days | From October |
| 10 | L'Intenso | Di fossa | Min. 150 days | Seasonal |
| 11 | Il Birrozzo | Nelle trebbie di birra | Min. 100 days | Seasonal |
| 12 | Il Blu | Pecorino erborinato | Min. 90 days | Seasonal |
| 13 | Lo Stagionato | Lungo affinamento | Min. 12 months | Year-round |
| 14 | Yobee | Yogurt di pecora | — | Year-round |

---

## Scheda Tecnica Format

Pipe-separated fields: `Ingredienti: ... | Stagionatura: ... | Pezzatura: ... | Conservazione: ... | Disponibilità: ...`

Displayed in the lightbox as **labeled rows** — each field split by `:` into:
- Bold colored label (earthy palette, cycling via `nth-child`)
- Muted value text
- Tinted background container (10% opacity of label color, 8px border-radius)

Not all fields present for all products.

---

## Image Specifications

- Path: `assets/imgs/pecorino/{name}.webp`
- Naming: lowercase, no spaces (e.g. `ricotta.webp`, `fresco.webp`, `castagno.webp`)
- Format: WebP, quality 85
- Resize: 800px on long edge
- Target weight: 48–173 KB
- Loading: `loading="lazy"` on all gallery images
- Display: `object-fit:cover` in both strip and lightbox

---

## WhatsApp Info Flow

1. User taps product card → lightbox opens
2. Lightbox shows "Chiedi info" / "Ask info" button (outlined green style)
3. Button links to `https://wa.me/393393179926?text={encoded_message}`
4. Message format:
   - IT: `Ciao, vorrei più informazioni su: {product_name}`
   - EN: `Hi, I'd like more info about: {product_name}`
5. Opens WhatsApp with pre-filled message

---

## Gallery UX

### Strip
- Horizontal scroll with momentum (`-webkit-overflow-scrolling: touch`)
- Scroll snap: `scroll-snap-type: x mandatory`, items `scroll-snap-align: center`
- Touch action: `pan-x` (allows horizontal scroll)
- Touch direction detection: horizontal swipes scroll strip, vertical swipes navigate panels
- Custom scrollbar: 4px, oro thumb
- Item width: `clamp(200px, 28vw, 320px)`

### Lightbox
- Single shared element (content rebuilt on each open)
- Opens with opacity transition (0.3s)
- Scrollable on mobile (`max-height: 85vh`, `overflow-y: auto`, `-webkit-overflow-scrolling: touch`, `touch-action: pan-y`)
- Touch navigation disabled while open
- Close: × button (dark bg, white text, red on hover), backdrop click, Escape key

---

## How to Add a Product

1. Place photo at `docs/assets/imgs/pecorino/{name}.webp` (800px long edge, quality 85)
2. Add object to `GALLERY` array in `main.js`:
   ```js
   {
     src: 'assets/imgs/pecorino/{name}.webp',
     name: 'Display Name',
     sub: { it: '...', en: '...' },
     desc: { it: '...', en: '...' },
     scheda: { it: 'Ingredienti: ... | Stagionatura: ... | Pezzatura: ...', en: '...' }
   }
   ```
3. Position in array determines order in strip

## How to Remove a Product

1. Remove object from `GALLERY` array
2. Optionally remove image file from `assets/imgs/pecorino/`

## How to Reorder Products

Move the object to the desired position in the `GALLERY` array. Index determines display order.
