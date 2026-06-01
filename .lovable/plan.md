Procedo con 4 interventi mirati, tutti frontend/contenuti (zero modifiche backend; nessun impatto su Like, Classifica, audio, navigazione).

## 1. Sezione T-Shirt — pagina dettaglio dedicata

**Schema dati** (`src/lib/artworkData.ts`)
- Aggiungo a `ArtworkFullData` e `CreateArtworkInput` due campi opzionali:
  - `shopPlatform?: string`
  - `shopUrl?: string`
- `createArtwork` li propaga.
- **Aggiorno le 3 nuove t-shirt** (sostituisco quelle placeholder attuali con i tuoi slug reali, `published: false` così restano placeholder colorati finché non carichi le foto):

```ts
createArtwork({ slug: "wonderful-meditation", category: "t-shirt", title: "Wonderful Meditation",
  year: "2024", dimensions: "Formato variabile", technique: "Stampa digitale",
  shopPlatform: "Hoplix", shopUrl: "https://hoplix.shop/radmax",
  details: 0, roomViews: 0, format: "webp", published: false }),
createArtwork({ slug: "the-hidden-side-of-a-thought", category: "t-shirt", title: "The Hidden Side of a Thought",
  year: "2024", dimensions: "Formato variabile", technique: "Stampa digitale",
  shopPlatform: "Hoplix", shopUrl: "https://hoplix.shop/radmax2",
  details: 0, roomViews: 0, format: "webp", published: false }),
createArtwork({ slug: "time-is-an-illusion", category: "t-shirt", title: "Time is an Illusion",
  year: "2024", dimensions: "Formato variabile", technique: "Stampa digitale",
  shopPlatform: "Hoplix", shopUrl: "https://hoplix.shop/time-is-an-illusion-2",
  details: 0, roomViews: 0, format: "webp", published: false }),
```

Domanda: vuoi che **rimuova** le 6 t-shirt fittizie attuali (Nebula Wear, Cosmic Print, Urban Galaxy, Abstract Flow, Stellar Edition, Dark Matter) e tenga **solo** queste 3 reali? Procedo così salvo diverso avviso.

**Rendering condizionale** (`src/pages/ArtworkDetail.tsx`, sia desktop sia mobile)
Quando `discipline === "t-shirt"`:
- Etichetta TECNICA → STAMPA / PRINT (nuova chiave i18n).
- Nascondo l'intero blocco DIMENSIONI.
- Sostituisco il valore prezzo con un **bottone prominente**: se `shopPlatform && shopUrl` sono presenti, mostro `<a target="_blank" rel="noopener noreferrer">` con testo `Acquista su {shopPlatform}` / `Buy on {shopPlatform}` + icona `ExternalLink` (lucide), classe `animate-shop-pulse` (pulsazione lenta), stile coerente al design system (border `border-border/40`, padding generoso, Raleway uppercase). Se i campi mancano → fallback testo prezzo (compatibilità).

**Pulsazione lenta** in `tailwind.config.ts`: keyframe `shop-pulse` (opacità 1 ↔ 0.78, scala 1 ↔ 1.02, 2.6s ease-in-out infinite) + `animate-shop-pulse`.

## 2. Workflow Excel + Python (istruzioni, no modifiche al repo)

`optimize.py` è locale fuori dal repo: te lo aggiorno nel manuale come patch da applicare.

**Nuove colonne CSV** (solo righe `category = t-shirt`):
- `shop_platform` (es. `Hoplix`)
- `shop_url` (URL completo prodotto)

**Patch `optimize.py`**: quando emette il blocco `createArtwork`, se i due campi sono non vuoti aggiunge `shopPlatform: "..."` e `shopUrl: "..."`. Per le altre categorie ignora i campi.

## 3. Bug traduzioni (i18n)

In `src/lib/i18n.tsx` aggiungo:
- `artwork.meaning` → "Significato dell'opera" / "Meaning of the work"
- `artwork.purchaseOptions` → "Opzioni d'acquisto" / "Purchase options"
- `artwork.purchaseOptionsExt` → "Opzioni d'acquisto e supporti" / "Purchase options & supports"
- `artwork.technique.tshirt` → "Stampa" / "Print"
- `artwork.buyOn` → "Acquista su" / "Buy on"

In `ArtworkDetail.tsx` sostituisco le stringhe hard-coded con `t(...)` (desktop + mobile).

## 4. Fix definitivo fade pop-up

Il problema attuale: `DialogContent` usa `data-[state=open]:animate-in` Tailwind con `zoom-in-[0.98]` + `duration-500`. Su Safari/Firefox lo scatto resta percepibile per via di transform iniziale + overflow.

**Soluzione**: bypasso l'animazione Tailwind e uso `framer-motion` (già nel progetto) dentro `MeaningDialog` e `CertificateDialog`:
- Disattivo le classi animate nel `DialogContent` (`data-[state=open]:animate-none data-[state=closed]:animate-none`).
- Avvolgo il contenuto in `<motion.div initial={{opacity:0, scale:0.985}} animate={{opacity:1, scale:1}} transition={{duration:0.45, ease:[0.22,1,0.36,1]}} style={{willChange:'opacity, transform'}}>`.
- Overlay: porto a `duration-700 ease-out` per fade-in percepibile e cross-browser.

Risultato: apertura fluida ~450ms, identica su Chromium/Firefox/Safari (iOS incluso).

## 5. Manuale e verifica finale

`GUIDA-GESTIONE-OPERE.md`: aggiungo sezioni **"👕 Aggiungere una T-Shirt"** (schema con `shopPlatform`/`shopUrl`, note su dimensioni nascoste e tecnica = "Stampa", esempio Hoplix) e **"📊 Workflow Excel/Python — colonne T-Shirt"** con la patch a `optimize.py`.

Verifica: niente di toccato in Like/Classifica/audio/navbar. File modificati:
```
src/lib/artworkData.ts
src/pages/ArtworkDetail.tsx
src/lib/i18n.tsx
src/components/MeaningDialog.tsx
src/components/CertificateDialog.tsx
tailwind.config.ts
GUIDA-GESTIONE-OPERE.md
```

Confermi la rimozione delle 6 t-shirt fittizie esistenti? Procedo comunque a meno che tu non dica il contrario subito dopo l'approvazione del piano.