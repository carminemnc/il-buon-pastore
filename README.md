# Il Buon Pastore — sito vetrina

Sito vetrina dell'azienda agricola **Il Buon Pastore** (pecorino a latte crudo certificato biologico).
Sito fratello di [Cave Oves](https://caveoves.it) — stessa identità visiva, contenuto completamente diverso.

Racconto immersivo in **cinque tappe + galleria prodotti**: scrollando, il visitatore "entra nella fattoria" —
**Pascolo → Metamorfosi → Stagionatura → Tavola → Lana → Galleria**. Ogni tappa è una scena cinematografica a tutto
schermo con foto reali in crossfade automatico e una progress rail laterale.

## Stack

- **HTML / CSS / JS vanilla**, zero build, zero dipendenze
- Bilingue **IT / EN** (toggle in nav, persistito in `localStorage`) — include descrizioni prodotti
- Dark mode (rispetta `prefers-color-scheme`, persistito)
- Animazioni: crossfade cinematografico, clip-path expansion tra pannelli, reveal su scroll, nav blur, grain overlay
- Galleria prodotto con lightbox + bottone WhatsApp per ordini
- Accessibile: `prefers-reduced-motion`, focus visibili, `aria-modal` lightbox, keyboard nav completa

## Struttura

```
il-buon-pastore/
├── docs/                       # ← cartella pubblicata da GitHub Pages
│   ├── index.html              # shell minimale: hero + slot contatti (il resto è generato da JS)
│   ├── css/style.css           # tutto lo stile + animazioni + responsive
│   ├── js/
│   │   ├── i18n.js             # dizionario IT/EN, toggle, persistenza
│   │   └── main.js             # engine full-page + manifesti + generazione DOM
│   └── assets/imgs/
│       ├── hero.webp           # immagine hero
│       ├── pascolo/            # 7 foto — tappa 01
│       ├── metamorfosi/        # 9 foto — tappa 02 (caseificio)
│       ├── stagionatura/       # 3 foto — tappa 03
│       ├── tavola/             # 3 foto — tappa 04 (prodotto finito)
│       ├── lana/               # 2 foto — tappa 05
│       └── pecorino/           # 12 foto prodotti per la galleria
├── _originali/                 # backup foto ad alta risoluzione (in .gitignore)
├── DOCS.md                     # documentazione tecnica dettagliata
└── README.md
```

## Sviluppo locale

Apri con un server statico (serve per `localStorage`, font, ecc.):

```bash
python -m http.server 8000 --directory docs
# poi visita http://localhost:8000
```

## Deploy su GitHub Pages

1. Push del repo su GitHub.
2. **Settings → Pages → Build and deployment**
   - Source: *Deploy from a branch*
   - Branch: `main` · cartella: **`/docs`**
3. Il sito sarà su `https://<utente>.github.io/il-buon-pastore/`.
4. **Dominio custom** (opzionale): aggiungi un file `docs/CNAME` con il dominio e configura i DNS.

## Aggiungere o cambiare le foto

1. Metti la foto WebP nella cartella della fase, es. `docs/assets/imgs/pascolo/pascolo-8.webp`.
2. Aggiorna `count` nel manifest `CHAPTERS` in `docs/js/main.js`.
3. Per i prodotti galleria, aggiungi un oggetto all'array `GALLERY` in `main.js`.

## Aggiungere/modificare testi

- Sezioni narrative: modifica le chiavi in `docs/js/i18n.js` (IT + EN)
- Prodotti galleria: modifica l'array `GALLERY` in `docs/js/main.js` (campi `sub`, `desc`, `scheda` sono bilingui `{it:'...', en:'...'}`)
- Contatti/orari: modifica l'oggetto `CONTATTI` in `main.js` (orari bilingui)

## Design system

| Token | Valore |
|---|---|
| Parchment (bg) | `#FAF7F0` |
| Ink (fg) | `#1A1A1A` |
| Oro (accent) | `#C8922A` |
| Heading | Playfair Display |
| Body | DM Sans |

## TODO

- [ ] Handle Instagram reale
- [ ] Foto cartella `lana/` definitive
- [ ] Favicon/logo definitivo
