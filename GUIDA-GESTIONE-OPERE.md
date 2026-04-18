# 📚 Guida Definitiva alla Gestione del Sito

> **Riferimento unico** per inserire, modificare o rimuovere contenuti.
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

> ⚠️ **`published: true`** — imposta a `true` SOLO quando hai caricato i file. Le opere `published` entrano nella sitemap.xml.

### Modificare prezzo

Apri `src/lib/artworkData.ts`, trova il blocco e cambia il campo `price`.

### Rimuovere un'opera

Cancella il blocco `createArtwork({...})` dall'array.

### Riordinare

Sposta i blocchi `createArtwork` nell'ordine desiderato dentro l'array.

---

## 🗂️ 2. Sezione Archive

File unico: **`src/lib/archiveData.ts`**

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

Genera `public/sitemap.xml` includendo automaticamente tutte le opere con `published: true`.

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

Mostra in tempo reale lo stato di caricamento (🟢 OK / 🟡 loading / 🔴 broken) di ogni preview/main per tutte le opere, con filtri e ricerca.

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

✨ **Tutto qui.** Con questa guida puoi gestire ogni aspetto del sito in autonomia.
