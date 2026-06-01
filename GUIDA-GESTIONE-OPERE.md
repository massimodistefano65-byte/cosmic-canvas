# 📚 Guida Definitiva alla Gestione del Sito

> **📌 DOCUMENTO AUTORITATIVO** — questa guida è l'unica fonte di verità per la manutenzione del sito.
> Ogni altra istruzione precedente è obsoleta.
> Aggiornata al sistema **ID = Slug** con convenzione file unificata.

---

## 🎯 Regola d'Oro

Ogni file di un'opera segue **rigorosamente** questo schema:

```
massimo-di-stefano-{slug}-{category}-{tipo}.{format}
```

- **slug** = identificatore SEO-friendly (es. `pensieri-in-evoluzione`)
- **category** = `painting` | `photography` | `digital-art` | `t-shirt`
- **tipo** = `preview` | `1` | `detail-1`, `detail-2`, ... | `room-view-1`, ...
- **format** = `jpg` (default) o `webp`

L'**ID dell'opera coincide sempre con lo slug** → URL: `/painting/pensieri-in-evoluzione`

---

## 🛡️ Metodo di Lavoro Consigliato (Branch + StackBlitz)

Per non rischiare mai di rompere il sito principale, lavora **sempre su un branch separato** e testa prima del merge su `main`.

### Flusso in 4 step

1. **Crea branch su GitHub** partendo da `main`
   - Es. `aggiunta-opere-aprile-2026`
2. **Carica immagini e modifica `artworkData.ts`** SOLO su quel branch
   - Usa GitHub web UI o `git` da locale
3. **Testa su StackBlitz** aprendo il branch:
   ```
   https://stackblitz.com/github/{user}/{repo}/tree/{nome-branch}
   ```
   - Apri il sito in preview
   - Apri `/admin/artworks-status` → tutte le opere modificate devono essere 🟢 verdi
   - Apri la disciplina (es. `/painting`) → verifica che le miniature si vedano
4. **Pull Request → Merge in `main`** SOLO dopo test positivo
   - A questo punto Lovable sincronizza automaticamente

### ⚠️ Regola anti-conflitto

**Mentre lavori sul branch esterno, NON modificare nulla dentro Lovable.** Lavori in Lovable **OPPURE** sul branch — **mai entrambi insieme**, altrimenti rischi conflitti su `artworkData.ts` al merge.

### Compatibilità Lovable ↔ GitHub

- La sync Lovable↔GitHub opera **solo** sul branch principale (`main`).
- Branch separati sono **invisibili** a Lovable finché non vengono mergiati.
- StackBlitz crea una sandbox isolata: nessun rischio per il sito di produzione.

---

## 🖼️ 1. Aggiungere un'Opera (Painting / Photography / Digital Art / T-Shirt)

### Step 1 — Crea la cartella

```
public/artworks/{categoria}/{slug}/
```

Esempio: `public/artworks/painting/nebulosa-urbana/`

### Step 2 — Carica i file rispettando la convenzione

```
massimo-di-stefano-nebulosa-urbana-painting-preview.jpg
massimo-di-stefano-nebulosa-urbana-painting-1.jpg
massimo-di-stefano-nebulosa-urbana-painting-detail-1.jpg
massimo-di-stefano-nebulosa-urbana-painting-room-view-1.jpg
```

### Step 3 — Aggiungi il blocco in `src/lib/artworkData.ts`

**📋 Schema copy-paste:**

```ts
createArtwork({
  slug: "titolo-opera",          // identifica cartella, file e URL
  category: "painting",          // painting | photography | digital-art | t-shirt
  title: "Titolo Opera",
  year: "2025",
  dimensions: "100 × 80 cm",
  technique: "Olio su tela",
  price: "€ 1.500",              // opzionale
  details: 3,                     // numero di file detail (0 se nessuno)
  roomViews: 2,                   // numero di file room-view (0 se nessuno)
  format: "jpg",                  // "jpg" (default) | "webp"
  published: true,                // true SOLO quando i file esistono fisicamente
}),
```

> ⚠️ **`published: true`** — imposta a `true` SOLO quando hai caricato i file. Le opere `published` entrano nella sitemap.xml e vengono indicizzate da Google.

### Modificare prezzo

Apri `src/lib/artworkData.ts`, trova il blocco e cambia il campo `price`.

### Rimuovere un'opera

Cancella il blocco `createArtwork({...})` dall'array.

### Riordinare

Sposta i blocchi `createArtwork` nell'ordine desiderato dentro l'array.

---

## 🗂️ 2. Sezione Archive

File unico: **`src/lib/archiveData.ts`**

> Aggiungi `published: true` a mostre, video e progetti che vuoi indicizzare nella sitemap.

### 📋 Schema MOSTRA

```ts
{
  id: "1",
  title: "Pensieri in Evoluzione",
  year: "2024",
  location: "Galleria Moderna, Roma",
  description: "Mostra personale dedicata a...",
  images: [
    "/archive/exhibitions/1/foto-allestimento-1.jpg",
    "/archive/exhibitions/1/invito.jpg",
  ],
  catalogPdf: "/archive/exhibitions/1/catalogo.pdf", // opzionale
  published: true,                                    // opzionale, per sitemap
}
```

### 📋 Schema VIDEO YouTube

```ts
{
  id: "1",
  title: "Massimo Di Stefano, Viaggio nell'inconscio",
  category: "Arte",
  description: "Esplorazione artistica del subconscio",
  youtubeId: "x9ZMeR7e4MU",  // SOLO l'ID, non l'URL completo
  published: true,            // opzionale, per sitemap
}
```

### 📋 Schema MATERIALE SCARICABILE

```ts
{
  id: "1",
  title: "Catalogo Opere HD",
  description: "Catalogo completo in alta risoluzione",
  file: "/downloads/catalogo-hd.pdf",  // metti il file in public/downloads/
  size: "11 MB",
  type: "PDF",
}
```

### 📋 Schema CRITICA

```ts
{
  id: "1",
  title: "La Dimensione Cosmica nell'Arte Contemporanea",
  author: "Dr. Maria Rossi",
  year: "2024",
  excerpt: "Un'analisi approfondita...",
  fullTextUrl: "/archive/texts/dimensione-cosmica.pdf", // opzionale
}
```

### 📋 Schema ALTRO PROGETTO (con media misti)

```ts
{
  id: "1",
  title: "Micro-Ecosistemi in Bottiglia",
  category: "Installazioni",
  description: "Creazione di ecosistemi autosufficienti",
  tags: ["natura", "sostenibilità"],
  layout: "grid",  // "grid" | "masonry" | "list"
  longDescription: "Testo lungo opzionale...",
  published: true, // opzionale, per sitemap
  media: [
    { type: "image", src: "/archive/projects/1/foto.jpg", title: "Titolo", description: "..." },
    { type: "youtube", youtubeId: "ABC123", title: "Video" },
    { type: "pdf", src: "/archive/projects/1/doc.pdf", title: "Documento", fileSize: "2 MB" },
    { type: "text", title: "Riflessione", content: "Testo lungo qui..." },
    { type: "link", src: "https://esempio.com", title: "Link esterno" },
  ],
}
```

---

## 🏠 3. Home Page

### Hero (immagine di sfondo + titolo)

- **Immagine**: sostituisci il file `public/images/hero-background.jpg`
- **Testo titolo/sottotitolo**: in `src/lib/i18n.tsx` cerca `hero.title` e `hero.subtitle`

### Schede delle 4 discipline (cover Home)

Sostituisci i file:

```
public/images/cover-home-painting.jpg
public/images/cover-home-photography.jpg
public/images/cover-home-digital-art.jpg
public/images/cover-home-t-shirt.jpg
```

### Sottotitoli delle discipline

In `src/lib/i18n.tsx` cerca le chiavi `painting.intro`, `photography.intro`, ecc.

---

## ✍️ 4. Blog

File: **`src/lib/blogData.ts`**

### 📋 Schema ARTICOLO

```ts
{
  id: "1",
  slug: "il-mio-primo-articolo",
  title_it: "Il mio primo articolo",
  title_en: "My first article",
  excerpt_it: "Breve anteprima in italiano...",
  excerpt_en: "Brief preview in English...",
  content_it: "Testo completo in italiano...",
  content_en: "Full text in English...",
  date: "2026-04-18",
  coverImage: "/images/blog/primo-articolo.jpg",  // opzionale
  tags: ["processo", "pittura"],
}
```

Le immagini di copertina vanno in `public/images/blog/`.

---

## 🔍 5. SEO & Sitemap

### Rigenerare la sitemap

```bash
npx tsx scripts/generate-sitemap.ts
```

Genera `public/sitemap.xml` includendo automaticamente:
- Tutte le pagine statiche
- Le opere con `published: true`
- Le mostre, video e progetti dell'archivio con `published: true`

### OpenGraph (condivisione social)

Le pagine opera generano automaticamente i meta tag OpenGraph dinamici (`og:image`, `og:title`, `og:description`) puntando all'immagine principale dell'opera. Non serve configurazione extra.

### Modificare titoli/descrizioni SEO

- **Pagine discipline**: `src/pages/DisciplinePage.tsx` → oggetto `disciplines`
- **Altre pagine**: ogni pagina usa `<SEOHead title=... description=... />`
- **Opera singola**: gestita automaticamente in `src/pages/ArtworkDetail.tsx`

---

## 🛠️ 6. Strumenti di Controllo

### Validatore CLI (terminale)

```bash
npx tsx scripts/validate-artworks.ts
```

Verifica per ogni opera:
- ✅ **OK** — tutti i file esistono
- ⚠️ **Placeholder** — nessun file (mostra gradiente colorato)
- ❌ **Errore** — file parzialmente mancanti (path rotto)
- 🔸 Segnala anche file orfani in `public/artworks/`

### Pannello in-app

Apri nel browser:

```
/admin/artworks-status
```

Logica dei pallini di stato:

| Pallino | Significato |
|---------|-------------|
| 🟢 verde | Immagine caricata correttamente |
| 🟡 giallo | Immagine manca **e** `published: false` → bozza in attesa di foto (OK) |
| 🔴 rosso | Immagine manca **e** `published: true` → **errore critico**: link rotto sul sito pubblico |

---

## 🚨 7. Troubleshooting — "Non vedo l'immagine"

Checklist rapida:

1. **Cartella corretta?** → `public/artworks/{categoria}/{slug}/`
2. **Slug coincide?** → cartella, file e `slug:` in `createArtwork` devono essere identici
3. **Categoria nel nome?** → ogni file deve contenere `-{category}-`
4. **Format giusto?** → se i file sono `.webp`, aggiungi `format: "webp"` nel blocco
5. **Numero detail/roomViews?** → deve corrispondere ai file caricati
6. Apri `/admin/artworks-status` per vedere quale file fallisce
7. Esegui `npx tsx scripts/validate-artworks.ts` per un report completo

---

## ⚡ 8. Performance

- **Lazy loading**: tutte le miniature delle gallerie e le immagini secondarie usano `loading="lazy"` automaticamente.
- **Eager loading**: solo l'immagine principale dell'opera (above-the-fold) carica subito per ottimizzare LCP.
- **Virtualizzazione galleria**: la galleria carica le opere a blocchi di 12 man mano che scorri. Il sito può gestire centinaia di immagini senza rallentamenti, anche da cellulare.
- **Scroll restoration**: tornando indietro da un'opera alla galleria, la posizione di scroll viene ripristinata automaticamente.

---

## 📖 9. Significato dell'opera (testo descrittivo)

Ogni opera può avere un testo opzionale che si apre in un pop-up elegante quando l'utente clicca su "Significato dell'opera" (nella colonna info, sotto il prezzo).

### Come aggiungerlo

1. Crea un file `meaning.md` nella cartella dell'opera:
   ```
   public/artworks/{categoria}/{slug}/meaning.md
   ```
   Esempio: `public/artworks/painting/pensieri-in-evoluzione/meaning.md`

2. Scrivi il testo in **Markdown** (semplice):
   ```markdown
   ## Genesi dell'opera

   Questa opera nasce da una riflessione sul tempo e sulla materia.
   Le pennellate evocano un *flusso continuo* di pensieri.

   La palette cromatica si ispira ai cieli notturni di Roma.
   ```

3. Committa su GitHub (sul branch di lavoro). Lovable sincronizzerà al merge.

### Comportamento

- Se il file `meaning.md` **esiste** → l'etichetta "Significato dell'opera" appare nella pagina dell'opera (stile uniforme alle altre etichette: PREZZO, TECNICA, DIMENSIONI).
- Se il file **non esiste** → l'etichetta non viene mostrata. Nessun errore.
- Per **rimuovere** il significato di un'opera: cancella il file `meaning.md`.

---

## 🎵 10. Atmosfera sonora (musica per sezione)

Ogni sezione del sito può avere una propria musica ambient con crossfade morbido tra una sezione e l'altra. Un'icona discreta in basso a destra (altoparlante) permette all'utente di accendere/spegnere l'audio.

### Comportamento

- **Spento di default**: rispetta le policy dei browser sull'autoplay.
- **Attivazione**: l'utente clicca l'icona altoparlante in basso a destra. La scelta viene ricordata (localStorage).
- **Crossfade automatico**: passando da una sezione all'altra, la musica precedente fa fade-out e la nuova fa fade-in (1.5s).
- **Volume ambient**: 35%, discreto.

### Come caricare i file MP3

1. Crea la cartella (se non esiste): `public/audio/`
2. Carica i file con questi **nomi esatti**:

| Sezione | Nome file |
|---------|-----------|
| Home | `public/audio/home.mp3` |
| Painting | `public/audio/painting.mp3` |
| Photography | `public/audio/photography.mp3` |
| Digital Art | `public/audio/digital-art.mp3` |
| T-Shirt | `public/audio/t-shirt.mp3` |
| Archive | `public/audio/archive.mp3` |
| Bio | `public/audio/bio.mp3` |
| Contact | `public/audio/contact.mp3` |

3. Committa su GitHub.

### Specifiche consigliate per i file

- **Formato**: MP3
- **Bitrate**: 128 kbps (buon compromesso qualità/peso)
- **Durata**: 2-5 minuti, **loop seamless** (deve concatenarsi senza stacco)
- **Peso**: < 3 MB per file
- **Mood**: ambient, discreto, non invasivo (è sottofondo)

### Gestione

- **Cambiare la musica di una sezione**: sostituisci il file omonimo
- **Disabilitare la musica in una sezione**: rimuovi il file (l'audio si fermerà silenziosamente, nessun errore)
- **Le pagine opera** ereditano la musica della loro disciplina (es. `/painting/nebulosa-urbana` suona `painting.mp3`)

---

## 📦 Riepilogo file da modificare

| Cosa modificare | File |
|---|---|
| Opere (4 discipline) | `src/lib/artworkData.ts` |
| Mostre, video, materiali, critiche, progetti | `src/lib/archiveData.ts` |
| Articoli blog | `src/lib/blogData.ts` |
| Testi homepage / discipline | `src/lib/i18n.tsx` |
| SEO discipline | `src/pages/DisciplinePage.tsx` |
| Hero image | `public/images/hero-background.jpg` |
| Cover Home | `public/images/cover-home-*.jpg` |
| Sitemap | `public/sitemap.xml` (rigenera con script) |

---

✨ **Tutto qui.** Con questa guida puoi gestire ogni aspetto del sito in autonomia e in totale sicurezza.

## Opzioni d'acquisto (purchase.md)

Per mostrare il pulsante "Opzioni d'acquisto" (o "Opzioni d'acquisto e supporti" per photography/digital-art/t-shirt) sulle pagine di dettaglio opera, crea un file:

`public/artworks/{discipline}/purchase.md`

Esempio: `public/artworks/photography/purchase.md` — il file vale per tutte le opere della categoria. Se il file non esiste, il pulsante non viene mostrato. Su Aruba assicurati che il MIME type `.md` sia configurato in `public/web.config` (già presente).

---

## 👕 Aggiungere una T-Shirt

Le t-shirt hanno una **gestione commerciale dedicata**: la vendita avviene su piattaforme esterne (Hoplix, Redbubble, Printify…), quindi la scheda mostra un **bottone "Acquista su {Piattaforma}"** al posto del prezzo, nasconde il blocco "Dimensioni" e cambia l'etichetta "Tecnica" in **"Stampa"**.

### Schema

```ts
createArtwork({
  slug: "wonderful-meditation",          // URL e cartella
  category: "t-shirt",                    // obbligatorio
  title: "Wonderful Meditation",
  year: "2024",
  dimensions: "Formato variabile",        // ignorato in UI ma utile per i dati
  technique: "Stampa digitale",           // sovrascritto in UI con "Stampa"
  shopPlatform: "Hoplix",                 // ⭐ piattaforma esterna
  shopUrl: "https://hoplix.shop/radmax",  // ⭐ link prodotto
  details: 0,
  roomViews: 0,
  format: "webp",
  published: false,                       // true quando le foto sono caricate
}),
```

**Regole:**
- Se `shopPlatform` o `shopUrl` mancano, ricompare il prezzo classico (fallback).
- I file immagine seguono la stessa convenzione delle altre categorie (`public/artworks/t-shirt/{slug}/...`).
- Fino al caricamento delle foto reali, l'opera appare con il placeholder gradient.

### Esempio attivo (Hoplix)

| Slug | Piattaforma | URL |
|---|---|---|
| `wonderful-meditation` | Hoplix | https://hoplix.shop/radmax |
| `the-hidden-side-of-a-thought` | Hoplix | https://hoplix.shop/radmax2 |
| `time-is-an-illusion` | Hoplix | https://hoplix.shop/time-is-an-illusion-2 |

---

## 📊 Workflow Excel / Python — colonne T-Shirt

Per generare automaticamente i blocchi `createArtwork` delle t-shirt dal CSV, aggiungi due colonne **solo per le righe `category = t-shirt`**:

| Colonna CSV | Esempio | Note |
|---|---|---|
| `shop_platform` | `Hoplix` | Nome piattaforma esterna |
| `shop_url` | `https://hoplix.shop/radmax` | URL completo prodotto |

### Patch consigliata per `optimize.py`

Quando lo script emette il blocco `createArtwork(...)`, se la categoria è `t-shirt` e i due campi sono non vuoti, aggiungi:

```python
if row["category"] == "t-shirt":
    if row.get("shop_platform"):
        fields.append(f'shopPlatform: "{row["shop_platform"]}"')
    if row.get("shop_url"):
        fields.append(f'shopUrl: "{row["shop_url"]}"')
```

Per le altre categorie le colonne vengono ignorate, così non rompe il workflow esistente.
