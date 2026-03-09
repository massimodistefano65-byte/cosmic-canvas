# 🎨 Guida alla Gestione delle Opere

> Questa guida ti permette di aggiungere, rimuovere e riordinare le opere del sito **in autonomia**, senza toccare nient'altro che un singolo file di testo e le immagini.

---

## 📁 Struttura delle cartelle immagini

Tutte le immagini vanno nella cartella `public/artworks/`, organizzate così:

```
public/artworks/
├── painting/
│   ├── 1/          ← prima opera di Painting
│   │   ├── pensieri-in-evoluzione-painting-preview.jpg
│   │   ├── pensieri-in-evoluzione-painting-1.jpg
│   │   ├── pensieri-in-evoluzione-detail-1.jpg
│   │   ├── pensieri-in-evoluzione-room-view-1.jpg
│   │   └── ...
│   ├── 2/          ← seconda opera
│   └── 3/
├── photography/
│   ├── 1/
│   └── ...
├── digital-art/
│   ├── 1/
│   └── ...
└── t-shirt/
    ├── 1/
    └── ...
```

---

## 🖼️ Convenzione nomi file immagini

Per ogni opera, prepara i file con questi nomi (sostituisci `{titolo}` con il titolo in minuscolo separato da trattini e `{disciplina}` con `painting`, `photography`, `digital-art` o `t-shirt`):

| Tipo | Nome file | Dove appare |
|------|-----------|-------------|
| **Preview** | `{titolo}-{disciplina}-preview.jpg` | Galleria (griglia) |
| **Principale** | `{titolo}-{disciplina}-1.jpg` | Pagina dettaglio (immagine grande) |
| **Dettaglio** | `{titolo}-{disciplina}-detail-1.jpg`, `-detail-2.jpg`, ecc. | Miniature nella pagina dettaglio |
| **Room View** | `{titolo}-{disciplina}-room-view-1.jpg`, ecc. | Miniature nella pagina dettaglio |
| **Lifestyle** (t-shirt) | `{titolo}-t-shirt-lifestyle-1.jpg`, ecc. | Miniature nella pagina dettaglio |

### 💡 Approccio semplificato (consigliato)

**Puoi caricare UNA SOLA foto per opera** (consigliato: 2000px sul lato lungo) e usarla sia come `preview` che come `main` e `full`. Il browser la ridimensiona automaticamente per la galleria. Esempio:

```typescript
preview: "/artworks/painting/7/nome-opera-painting-1.jpg",
main:    "/artworks/painting/7/nome-opera-painting-1.jpg",
full:    "/artworks/painting/7/nome-opera-painting-1.jpg",
```

Se in futuro vuoi ottimizzare la velocità, puoi creare una versione più piccola (~800px) da usare come `preview`.

### Esempio per "Nebulosa Urbana" (painting, id 2):
```
public/artworks/painting/2/
├── nebulosa-urbana-painting-preview.jpg
├── nebulosa-urbana-painting-1.jpg
├── nebulosa-urbana-painting-detail-1.jpg
├── nebulosa-urbana-painting-detail-2.jpg
├── nebulosa-urbana-painting-room-view-1.jpg
└── nebulosa-urbana-painting-room-view-2.jpg
```

---

## ✏️ Il file da modificare

L'**unico file** da toccare è:

```
src/lib/artworkData.ts
```

Contiene quattro liste (array), una per disciplina: `painting`, `photography`, `digitalArt`, `tShirt`.

---

## ➕ Come AGGIUNGERE un'opera

### Passo 1: Prepara le immagini
1. Crea la cartella: `public/artworks/{disciplina}/{id}/`
2. Carica le immagini seguendo la convenzione nomi sopra

### Passo 2: Aggiungi l'opera nel file
Apri `src/lib/artworkData.ts` e aggiungi un blocco come questo nell'array della disciplina giusta:

```typescript
{
  id: "7",                        // ← numero progressivo, unico
  title: "Nome Opera",
  year: "2025",
  dimensions: "100 × 80 cm",
  technique: "Olio su tela",
  preview: "/artworks/painting/7/nome-opera-painting-1.jpg",
  main:    "/artworks/painting/7/nome-opera-painting-1.jpg",
  full:    "/artworks/painting/7/nome-opera-painting-1.jpg",
  images: [
    { url: "/artworks/painting/7/nome-opera-painting-room-view-1.jpg", label: "Room View 1" },
    { url: "/artworks/painting/7/nome-opera-painting-detail-1.jpg",    label: "Dettaglio 1" },
  ],
},
```

> **Nota**: Se non hai ancora le immagini, lascia i campi vuoti (`""`) e `images: []`. L'opera apparirà con un gradiente colorato come placeholder.

### Passo 3: Salva e pubblica
Se lavori su GitHub, fai commit e push. Il sito si aggiorna automaticamente.

---

## ❌ Come RIMUOVERE un'opera (venduta, ecc.)

1. Apri `src/lib/artworkData.ts`
2. Trova l'opera nell'array della disciplina
3. **Cancella** tutto il blocco `{ ... },` dell'opera
4. (Facoltativo) Cancella anche la cartella immagini da `public/artworks/`
5. Salva e pubblica

---

## 🔄 Come CAMBIARE L'ORDINE nella galleria

Le opere appaiono **nell'ordine esatto** in cui sono scritte nell'array.

Per spostare un'opera:
1. Apri `src/lib/artworkData.ts`
2. Taglia (Ctrl+X) tutto il blocco `{ ... },` dell'opera
3. Incollalo (Ctrl+V) nella posizione desiderata
4. Salva e pubblica

---

## 🔢 Le quattro discipline

| Disciplina | Array nel file | Cartella immagini |
|------------|----------------|-------------------|
| Painting | `painting` | `public/artworks/painting/` |
| Photography | `photography` | `public/artworks/photography/` |
| Digital Art | `digitalArt` | `public/artworks/digital-art/` |
| T-Shirt | `tShirt` | `public/artworks/t-shirt/` |

---

## 🗺️ Sitemap (per Google)

La sitemap (`public/sitemap.xml`) dice a Google quali pagine indicizzare. Va aggiornata quando aggiungi o rimuovi opere **con immagini** (cioè con `preview` o `main` compilati).

### Come aggiornare la sitemap manualmente:
1. Apri `public/sitemap.xml` su GitHub
2. Per ogni nuova opera pubblicata, aggiungi una riga:
   ```xml
   <url><loc>https://massimodistefano.com/painting/7</loc><priority>0.6</priority></url>
   ```
3. Per opere rimosse, cancella la riga corrispondente
4. Commit e push

### Script automatico (opzionale):
Se hai Node.js installato, puoi rigenerare la sitemap automaticamente:
```bash
npx tsx scripts/generate-sitemap.ts
```
Questo legge tutte le opere da `artworkData.ts` e rigenera `public/sitemap.xml` con tutte le pagine.

---

## 🏗️ Architettura del sito (per riferimento)

Le quattro pagine galleria (Painting, Photography, Digital Art, T-Shirt) usano tutte un **unico componente riusabile** chiamato `DisciplinePage.tsx`. Questo significa che:
- Se vuoi cambiare lo stile della galleria, basta modificare **un solo file** (`src/pages/DisciplinePage.tsx`)
- Le singole pagine (`Painting.tsx`, `Photography.tsx`, ecc.) sono solo 3 righe di codice ciascuna
- Testi, descrizioni SEO e colori di ogni disciplina sono configurati dentro `DisciplinePage.tsx`

---

## 🔗 Come aggiornare il sito tramite GitHub

### Modificare il file delle opere:
1. Vai su GitHub → il tuo repository
2. Naviga a `src/lib/artworkData.ts`
3. Clicca l'icona **matita** (✏️) per modificare
4. Fai le modifiche
5. Clicca **"Commit changes"** → il sito si aggiorna in automatico

### Caricare nuove immagini:
1. Vai su GitHub → il tuo repository
2. Naviga nella cartella `public/artworks/{disciplina}/{id}/`
3. Clicca **"Add file"** → **"Upload files"**
4. Trascina le immagini
5. Clicca **"Commit changes"**

> ⏱️ Dopo il commit, il sito si aggiorna in 1-2 minuti.

---

## ⚠️ Regole importanti

- L'**ID** deve essere unico dentro ogni disciplina (usa numeri crescenti: 1, 2, 3…)
- Se `preview` è vuoto (`""`), l'opera NON compare nella galleria (ma la pagina dettaglio funziona)
- Se `main` è vuoto, la pagina dettaglio mostra un gradiente placeholder
- I percorsi iniziano sempre con `/artworks/...` (con lo slash iniziale)
- Le immagini devono essere in formato `.jpg` o `.png`
- Dimensione consigliata: **2000px sul lato lungo** (una sola foto va benissimo per tutto)
- Quando aggiungi/rimuovi opere con immagini, ricorda di aggiornare anche `public/sitemap.xml`

---

## 💡 Suggerimenti

- **Una foto basta**: carica un'unica immagine da 2000px e usala per preview, main e full
- **Lavora con calma**: modifica un'opera alla volta e controlla il risultato
- **Backup**: GitHub mantiene la cronologia di ogni modifica, puoi sempre tornare indietro
- **Dubbi?** Chiedi in chat su Lovable, sono sempre qui per aiutarti!

---

# 📚 GESTIONE ARCHIVIO

L'archivio del sito gestisce cinque sezioni: **Mostre**, **Video**, **Materiali**, **Critiche** e **Altri Progetti**.

## 📁 File da modificare per l'archivio

L'**unico file** da modificare è:

```
src/lib/archiveData.ts
```

Contiene cinque array: `exhibitions`, `videos`, `downloads`, `criticisms`, `otherProjects`.

## 📂 Struttura cartelle per l'archivio

```
public/archive/
├── exhibitions/
│   ├── 1/              ← prima mostra
│   │   ├── foto-allestimento-1.jpg
│   │   ├── invito.jpg
│   │   └── catalogo.pdf
│   └── 2/              ← seconda mostra
├── materials/          ← PDF scaricabili
│   ├── catalogo-hd.pdf
│   └── documento.doc
├── texts/              ← testi critici
│   └── critica-1.pdf
└── projects/           ← altri progetti
    ├── 1/
    │   └── ecosistema-1.jpg
    └── 2/
```

## ➕ Come aggiungere contenuti all'archivio

### 🎨 Aggiungere una MOSTRA

1. Crea cartella: `public/archive/exhibitions/{id}/`
2. Carica immagini (foto allestimento, inviti, ecc.)
3. In `archiveData.ts`, aggiungi nell'array `exhibitions`:

```typescript
{
  id: "3",
  title: "Nome Mostra",
  year: "2025",
  location: "Galleria XYZ, Milano",
  description: "Descrizione della mostra...",
  images: [
    "/archive/exhibitions/3/foto-allestimento-1.jpg",
    "/archive/exhibitions/3/invito.jpg",
  ],
  catalogPdf: "/archive/exhibitions/3/catalogo.pdf", // opzionale
},
```

### 🎬 Aggiungere un VIDEO

Nell'array `videos` in `archiveData.ts`:

```typescript
{
  id: "3",
  title: "Titolo Video",
  category: "Intervista",
  description: "Descrizione...",
  youtubeId: "ABC123DEF45",  // ← solo l'ID di YouTube
},
```

### 📄 Aggiungere MATERIALI scaricabili

1. Carica file in `public/archive/materials/` o `public/downloads/`
2. In `archiveData.ts`, aggiungi nell'array `downloads`:

```typescript
{
  id: "3",
  title: "Dossier Stampa",
  description: "Materiale per giornalisti",
  file: "/archive/materials/dossier-stampa.pdf",
  size: "5 MB",
  type: "PDF",
},
```

### 📝 Aggiungere CRITICA/TESTO

Nell'array `criticisms` in `archiveData.ts`:

```typescript
{
  id: "2",
  title: "L'Arte Visionaria di Di Stefano",
  author: "Prof. Giuseppe Verdi",
  year: "2025",
  excerpt: "Un estratto del testo critico...",
  fullTextUrl: "/archive/texts/critica-verdi.pdf", // opzionale
},
```

### 🛠️ Aggiungere ALTRI PROGETTI

1. Crea cartella: `public/archive/projects/{id}/`
2. Carica immagini del progetto
3. In `archiveData.ts`, aggiungi nell'array `otherProjects`:

```typescript
{
  id: "3",
  title: "Installazione Luminosa",
  category: "Installazioni",
  description: "Opera interattiva con luci LED...",
  images: [
    "/archive/projects/3/installazione-1.jpg",
    "/archive/projects/3/installazione-2.jpg",
  ],
},
```

## ❌ Come rimuovere contenuti dall'archivio

1. Apri `src/lib/archiveData.ts`
2. Trova il contenuto nell'array corrispondente
3. Cancella tutto il blocco `{ ... },`
4. (Facoltativo) Cancella anche i file da `public/archive/`
5. Salva e fai commit

## 🔄 Placeholder automatici

Se un contenuto ha l'array `images` vuoto (`images: []`), il sito mostra automaticamente un gradiente colorato con la scritta "Immagini in arrivo".

## ⚠️ Note importanti per l'archivio

- I **video** richiedono solo l'**ID di YouTube** (la parte dopo `v=` nell'URL)
- I **percorsi file** iniziano sempre con `/` (es. `/archive/materials/file.pdf`)
- Le **dimensioni** dei file vanno indicate manualmente (es. "5 MB", "2.3 GB")
- I **testi critici** possono avere sia `excerpt` (estratto) che `fullTextUrl` (testo completo)
