

# Piano: Sistema Scalabile per Inserimento Opere

## Come funziona oggi

Il sito collega due elementi per ogni opera:

1. **File fisici** in `public/artworks/{categoria}/{id}/` con nomi tipo `massimo-di-stefano-{slug}-{categoria}-preview.jpg`
2. **Dati** in `src/lib/artworkData.ts` dove ogni opera ha i percorsi scritti a mano nelle proprietà `preview`, `main`, `full` e `images[]`

Il componente `DisciplinePage.tsx` legge l'array della categoria e mostra la galleria masonry. Cliccando un'opera, `ArtworkDetail.tsx` chiama `getArtwork(discipline, id)` e mostra i dettagli.

Il problema: per ogni opera devi scrivere a mano stringhe lunghe come `/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-painting-preview.jpg`. Con centinaia di opere diventa ingestibile.

---

## Cosa faremo

### 1. Funzione helper `createArtwork()`

Aggiungeremo una funzione in `artworkData.ts` che, dato lo slug e la categoria, calcola automaticamente tutti i percorsi. Tu dovrai scrivere solo questo:

```ts
createArtwork({
  id: "7",
  slug: "nebulosa-urbana",
  category: "painting",
  title: "Nebulosa Urbana",
  year: "2024",
  dimensions: "80 × 60 cm",
  technique: "Olio su tela",
  price: "€ 1.200",
  details: 3,      // genera detail-1, detail-2, detail-3
  roomViews: 2,    // genera room-view-1, room-view-2
})
```

La funzione costruisce automaticamente tutti i percorsi (`preview`, `main`, `full`, `images[]`) seguendo la convenzione esistente.

### 2. Template vuoto da copiare

Un blocco commentato pronto da duplicare in ogni sezione dell'array.

### 3. Esempio Photography compilato

```ts
createArtwork({
  id: "1",
  slug: "silenzio-metropolitano",
  category: "photography",
  title: "Silenzio Metropolitano",
  year: "2024",
  dimensions: "60 × 40 cm",
  technique: "Stampa Fine Art",
  price: "€ 800",
  details: 2,
  roomViews: 1,
})
```

### 4. Archive -- nessuna modifica

La sezione Archive usa gia un sistema separato (`archiveData.ts`) con supporto per video YouTube, testi lunghi, PDF, link, ecc. Non serve toccarla. Per aggiungere un video a una mostra o a "Altri Progetti", modifichi solo `archiveData.ts` come gia documentato.

### 5. Regole operative (riepilogo)

Saranno incluse come commento aggiornato nel file:

- Crea cartella `public/artworks/{categoria}/{slug}/`
- Carica i file con la convenzione `massimo-di-stefano-{slug}-{categoria}-*.jpg`
- Aggiungi il blocco `createArtwork({...})` nell'array giusto
- Se `details` o `roomViews` sono 0, non vengono generati percorsi extra

---

## File modificati

| File | Modifica |
|------|----------|
| `src/lib/artworkData.ts` | Aggiunta funzione `createArtwork()`, conversione opere esistenti al nuovo formato, template vuoto, guida aggiornata |

Un solo file da modificare. Nessun impatto su layout, stile o routing.

