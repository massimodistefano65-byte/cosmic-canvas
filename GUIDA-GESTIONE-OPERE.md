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
  preview: "/artworks/painting/7/nome-opera-painting-preview.jpg",
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
- Dimensioni consigliate: preview ~800px lato lungo, main/detail/room-view ~1500-2000px

---

## 💡 Suggerimenti

- **Lavora con calma**: modifica un'opera alla volta e controlla il risultato
- **Backup**: GitHub mantiene la cronologia di ogni modifica, puoi sempre tornare indietro
- **Dubbi?** Chiedi in chat su Lovable, sono sempre qui per aiutarti!
