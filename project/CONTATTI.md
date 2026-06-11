# Contatti — Contact Data

## Overview

The contact section is panel index 7 (last panel). It's a light-background panel with `overflow-y:auto` (native scroll preserved on mobile). Contains business contact info, hours, and map embed.

---

## CONTATTI Object

```js
const CONTATTI = {
  wa: '+393393179926',
  email: 'levoland@libero.it',
  instagram: 'ilbuonpastore',
  address: "Via Ca' Santino 1963, 47834 Montefiore Conca (RN)",
  mapsQuery: "Via+Ca'+Santino+1963+47834+Montefiore+Conca+RN",
  orari: [
    { days: {it:'Lun – Sab', en:'Mon – Sat'}, hours: '15:00 – 19:00' },
    { days: {it:'Domenica', en:'Sunday'}, hours: {it:'Chiuso', en:'Closed'}, closed: true },
  ],
};
```

### Field Types

| Field | Type | Notes |
|-------|------|-------|
| `wa` | string | WhatsApp number with country code |
| `email` | string | Business email |
| `instagram` | string | Handle without @ |
| `address` | string | Full postal address |
| `mapsQuery` | string | URL-encoded address for Google Maps embed |
| `orari[].days` | string \| {it,en} | Day range (bilingual object) |
| `orari[].hours` | string \| {it,en} | Hours or "Closed" (string if same in both languages, object if different) |
| `orari[].closed` | boolean | If true, hours displayed in red |

---

## Contact Links

| Channel | URL | Behavior |
|---------|-----|----------|
| Phone | `tel:+393393179926` | Opens dialer |
| Instagram | `https://instagram.com/ilbuonpastore` | Opens in new tab |
| WhatsApp | `https://wa.me/393393179926` | Opens WhatsApp (no pre-filled message from contatti) |
| Email | `mailto:levoland@libero.it` | Opens mail client |
| Maps | Google Maps embed iframe | Inline, sandboxed |

All external links have `target="_blank" rel="noopener noreferrer"`.

---

## Hours Display

Built by `buildOrari()` helper, rebuilt on every language change:

```html
<div class="orari">
  <span class="orari-label">Orari</span>
  <div class="orari-row">
    <span>Lun – Sab</span>
    <span>15:00 – 19:00</span>
  </div>
  <div class="orari-row orari-closed">
    <span>Domenica</span>
    <span>Chiuso</span>
  </div>
</div>
```

---

## Google Maps Embed

```
https://www.google.com/maps?q=Via+Ca'+Santino+1963+47834+Montefiore+Conca+RN&output=embed
```

Iframe attributes:
- `width="100%"` `height="180"`
- `style="border:0;border-radius:6px"`
- `allowfullscreen` `loading="lazy"`
- `sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"`

---

## How to Modify

### Change phone/email/social
Edit the corresponding field in `CONTATTI` object in `main.js`.

### Change hours
Edit `orari` array. Each entry needs `days` and `hours` (string or `{it,en}` object). Add `closed: true` for days shown in red.

### Change address
Edit both `address` (display) and `mapsQuery` (URL-encoded for iframe).
