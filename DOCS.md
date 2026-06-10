# Il Buon Pastore — Documentazione Tecnica

## Panoramica

Sito vetrina di **Il Buon Pastore di Preci & Nonne Società Agricola S.S.** — pecorino a latte crudo certificato biologico, Montefiore Conca (RN).

Esperienza **full-page scroll-hijack**: il body è bloccato, ogni sezione è un pannello fullscreen. Scroll wheel/touch/tastiera fa transizione al pannello successivo con effetto **clip-path expansion**. Sito fratello: [Cave Oves](https://caveoves.it) (lana).

---

## Stack

- **HTML / CSS / JS vanilla** — zero build, zero dipendenze
- Bilingue **IT / EN** (toggle navbar, persistito `localStorage`)
- Dark mode (`prefers-color-scheme`, persistito)
- Immagini **WebP** ottimizzate
- Deploy: GitHub Pages `/docs`

---

## Struttura file

```
docs/
├── index.html              ← shell minimale (hero + contatti vuoto)
├── css/style.css           ← unico foglio stile
├── js/
│   ├── i18n.js             ← dizionario IT/EN + API toggle
│   └── main.js             ← engine + manifesti + generazione DOM
└── assets/imgs/
    ├── hero.webp
    ├── favicon.png
    ├── apple-touch-icon.png
    ├── pascolo/            ← pascolo-1.webp ... pascolo-7.webp
    ├── metamorfosi/        ← metamorfosi-1.webp ... metamorfosi-9.webp
    ├── stagionatura/       ← stagionatura-1.webp ... stagionatura-3.webp
    ├── tavola/             ← tavola-1.webp ... tavola-3.webp
    ├── lana/               ← lana-1.webp ... lana-2.webp
    └── pecorino/           ← foto prodotti galleria (12 webp)
```

---

## Architettura

### Scroll-hijack engine

Il body è `overflow:hidden`. Tutti i `.panel` sono `position:absolute;inset:0` impilati. Solo `.is-active` è visibile. Lo scroll chiama `goTo(index)`:

1. Pannello corrente → `.is-leaving-fwd` o `.is-leaving-bwd` (esce con clip-path)
2. Pannello destinazione → `.is-active` (entra espandendosi)
3. Z-index gestiti per direzione
4. Dopo `COOLDOWN` (700ms, 80ms con reduce-motion) cleanup

### Transizioni CSS

- **Entrata**: `clip-path: inset(12% 18% round 20px)` → `inset(0)` in 0.65s
- **Uscita avanti**: shrink `inset(6% 10% round 14px)` + fade
- **Uscita indietro**: expand `inset(-5% round 0)` + fade

### Input

- **Wheel**: debounce 500ms, soglia `|deltaY| ≥ 30`
- **Touch**: swipe > 50px cambia pannello; dentro `.gallery-strip` o `.panel-light` lo scroll nativo è preservato
- **Tastiera**: ArrowDown/Up, Space (escluso su button/link), PageDown/Up, Home, End — disabilitato quando lightbox è aperto
- **Click**: `[data-goto]` su qualsiasi elemento

---

## Manifesti centralizzati (main.js)

### CONTATTI

```js
const CONTATTI = {
  tel: '+393393179926',
  wa: '+393393179926',
  email: 'levoland@libero.it',
  instagram: 'ilbuonpastore',
  address: "Via Ca' Santino 1963, 47834 Montefiore Conca (RN)",
  mapsQuery: "Via+Ca'+Santino+1963+47834+Montefiore+Conca+RN",
  orari: [
    { days:{it:'Lun – Sab',en:'Mon – Sat'}, hours:'15:00 – 19:00' },
    { days:{it:'Domenica',en:'Sunday'}, hours:{it:'Chiuso',en:'Closed'}, closed:true },
  ],
};
```

I campi `days` e `hours` possono essere stringa (invariante) o oggetto `{it,en}` (bilingue). Vengono ricostruiti ad ogni cambio lingua via `onLangChange`.

### CHAPTERS

```js
const CHAPTERS = [
  { id:'pascolo',      count:7, i18n:'pascolo',      focus:'center' },
  { id:'metamorfosi',  count:9, i18n:'metamorfosi',  focus:'center' },
  { id:'stagionatura', count:3, i18n:'stagionatura', focus:'center' },
  { id:'tavola',       count:3, i18n:'tavola',       focus:'center' },
  { id:'lana',         count:2, i18n:'lana',         focus:'center' },
  { id:'galleria',     count:0, i18n:'galleria',     gallery:true },
];
```

| Campo | Descrizione |
|-------|-------------|
| `id` | ID sezione = cartella immagini `assets/imgs/{id}/` |
| `count` | Numero immagini. 0=vuoto, 1=statica, 2+=crossfade 5s |
| `i18n` | Prefisso chiavi dizionario (`{id}.title`, `{id}.p1`, ecc.) |
| `focus` | Punto focale mobile: `center`, `top`, `bottom`, `left`, `right`, combinazioni |
| `gallery` | Se true → pannello galleria prodotti |

**Convenzione file**: `assets/imgs/{id}/{id}-1.webp`, ..., `{id}-{count}.webp`

**Nota**: il tag `<p data-i18n="{id}.p2">` viene generato solo se la chiave esiste e non è vuota nel dizionario.

### GALLERY (prodotti pecorino)

Array di 12 oggetti, ordinati per stagionatura crescente:

```js
{ src, name, sub:{it,en}, desc:{it,en}, scheda:{it,en} }
```

- `src`: path immagine webp
- `name`: nome prodotto (invariante, è nome proprio)
- `sub`: sottotitolo bilingue
- `desc`: descrizione narrativa bilingue
- `scheda`: ingredienti/stagionatura/pezzatura/disponibilità bilingue

Prodotti attuali (12): Ricotta Fresca, La Caciotta, L'Appassito, L'Aromatico, Il Gobbo, Il Noci, L'Ubriaco, L'Intenso, Il Birrozzo, Il Blu, Lo Stagionato, Yobee.

### NAV_ORDER

```js
const NAV_ORDER = ['galleria','lana'];
```

Controlla quali voci appaiono nella navbar e in che ordine. "Contatti" è sempre aggiunto alla fine.

### RAIL_LABELS

```js
const RAIL_LABELS = ['Home','nav.pascolo','nav.metamorfosi','nav.stagionatura','nav.tavola','nav.lana','galleria.label','nav.contatti'];
```

Definisce i dot della progress rail laterale (desktop). Stringhe con `.` usano `data-i18n`, le altre sono testo fisso.

---

## Ordine pannelli

| Index | Pannello | Tipo |
|-------|----------|------|
| 0 | Hero | Statico (HTML) |
| 1 | Pascolo | Chapter con crossfade (7 foto) |
| 2 | Metamorfosi | Chapter con crossfade (9 foto) |
| 3 | Stagionatura | Chapter con crossfade (3 foto) |
| 4 | Tavola | Chapter con crossfade (3 foto) |
| 5 | Lana | Chapter con crossfade (2 foto) |
| 6 | Galleria Pecorino | Gallery orizzontale + lightbox prodotto |
| 7 | Contatti + Footer | Layout chiaro con overflow-y |

---

## i18n (i18n.js)

Dizionario flat con chiavi dot-notation. Elementi con `data-i18n="chiave"` vengono aggiornati via `innerHTML`. Per attributi: `data-i18n-attr="content"`.

Lingue: `it`, `en`. Persistenza: `localStorage` key `ibp-lang`. Fallback: `navigator.language` → `it`.

API esposta:
- `window.i18n.toggle()` — alterna IT/EN
- `window.i18n.setLang('en')` — imposta lingua
- `window.i18n.current()` — lingua attiva
- `window.i18n.onLangChange(cb)` — registra callback (riceve `newLang`)
- `window.i18n._dict` — riferimento al dizionario IT (per check esistenza chiavi)

---

## Funzioni helper (main.js)

- `lang()` — ritorna lingua corrente (`'it'` o `'en'`)
- `t(field)` — risolve campo bilingue: se oggetto `{it,en}` ritorna valore per lingua corrente, se stringa la ritorna tale
- `buildOrari()` — genera HTML orari tradotto

---

## Layout pannelli

### Chapter (pannelli 1-5)
- **Desktop**: foto full-viewport con crossfade + card glassmorphism (nero 50% + blur 8px) in basso a destra. Bordo oro a sinistra.
- **Mobile**: card bottom full-width, max-height 45vh, scrollabile, bordo oro in alto.

### Gallery (pannello 6)
- Sfondo parchment, titolo centrato + hint bilingue
- Strip orizzontale scrollabile (scroll-snap, `touch-action:pan-x`)
- Click su prodotto → lightbox prodotto

### Lightbox prodotto
- Overlay fisso `z-index:9500`, `role="dialog"`, `aria-modal="true"`
- Grid 2 colonne desktop (foto | info), stack su mobile
- Info: nome, sottotitolo (oro), descrizione, scheda tecnica, bottone "Ordina/Order" WhatsApp con messaggio pre-compilato
- Chiusura: bottone × (`aria-label`), click backdrop, tasto Escape
- Tutta la navigazione keyboard è disabilitata mentre il lightbox è aperto

### Contatti + Footer (pannello 7)
- Due colonne (`1fr 1.4fr`): sinistra = 3 card link (Instagram, WhatsApp, Email); destra = indirizzo + orari bilingui + Google Maps embed
- Footer: logo + ragione sociale/P.IVA
- `overflow-y:auto` — touch scroll preservato su mobile

---

## Design tokens

```css
--bg: #FAF7F0       → dark: #1A1A1A
--fg: #1A1A1A       → dark: #FAF7F0
--muted: #5A5A5A    → dark: #A8A8A8
--oro: #C8922A      (invariato)
--font-h: 'Playfair Display'
--font-b: 'DM Sans'
```

---

## Effetti

- **Clip-path expansion** tra pannelli (0.65s)
- **Crossfade** foto (opacity 2s, intervallo 5s, gestito via MutationObserver su `.is-active`)
- **Stagger reveal** testo card (opacity + translateY, delay 0.4s)
- **Bounce** freccia scroll (2s loop)
- **Hover lift** card contatti e gallery items
- **Gradiente testo** hero (bianco→oro, background-clip:text)
- **Grain overlay** SVG noise fisso (opacity 2%)

Tutto disabilitato con `prefers-reduced-motion: reduce`.

---

## Accessibilità

- `prefers-reduced-motion`: disabilita transizioni/animazioni
- Focus visible con outline oro
- `aria-label` su nav, bottoni, lightbox close
- `aria-modal` + `role="dialog"` sul lightbox prodotto
- `aria-expanded` su hamburger
- Keyboard navigation completa (disabilitata con lightbox aperto)
- `p:empty { display:none }` nasconde paragrafi vuoti
- Fallback `background-color` su `.panel-bg` se le immagini non caricano

---

## Responsive (≤768px)

- Navbar → hamburger menu overlay
- Rail + grain → nascosti
- Chapter card → bottom-sheet full-width scrollabile
- Contatti → colonna singola, card social compatte (solo icona + label)
- Gallery → scroll orizzontale con `touch-action:pan-x`
- Focus point immagini → `data-focus` attribute su `.panel-bg`

---

## Come modificare

### Aggiungere/togliere foto
1. Aggiungi/rimuovi `{id}-N.webp` nella cartella
2. Aggiorna `count` in `CHAPTERS`

### Aggiungere una sezione
1. Aggiungi oggetto in `CHAPTERS`
2. Aggiungi chiavi `{id}.label`, `{id}.title`, `{id}.p1` (e opzionalmente `{id}.p2`) in i18n (IT + EN)
3. Crea cartella `docs/assets/imgs/{id}/`
4. Aggiorna `RAIL_LABELS`

### Aggiungere un prodotto alla galleria
Aggiungi `{src, name, sub:{it,en}, desc:{it,en}, scheda:{it,en}}` all'array `GALLERY`

### Cambiare ordine/voci navbar
Modifica `NAV_ORDER`

### Cambiare dati contatti/orari
Modifica `CONTATTI` — i campi `days`/`hours` supportano stringa o `{it,en}`

### Cambiare un testo
Modifica la chiave in `i18n.js` (IT + EN)

### Cambiare focus point mobile di una sezione
Modifica `focus` nel `CHAPTERS` manifest. Valori: `center`, `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`

---

## Sviluppo locale

```bash
python -m http.server 8000 --directory docs
```

## Deploy

GitHub Pages → Settings → Pages → Branch: `main`, cartella: `/docs`

Sito live: **https://ilbuonpastorebio.it**

---

## TODO

- [ ] Handle Instagram reale
- [ ] Foto cartella `lana/` definitive
- [ ] Favicon/logo definitivo
