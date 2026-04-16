

# Piano: Slug come ID univoco delle opere

## Analisi

Il sistema attuale usa `id` numerico (`"1"`, `"2"`, ...) per identificare le opere. Questo ID appare:

- Nell'URL: `/:discipline/:artworkId` (es. `/painting/1`)
- Nella funzione `getArtwork(discipline, artworkId)` che cerca per `a.id`
- Nella sitemap: `/${discipline}/${artwork.id}`
- Nei link della galleria in `DisciplinePage.tsx`

**La soluzione e sicura e compatibile.** L'`id` e gia una stringa, quindi usare lo slug non richiede modifiche di tipo. Il routing e generico (`:artworkId`), quindi accetta qualsiasi stringa.

## Cosa faremo

### 1. Aggiornare `artworkData.ts`

Per ogni opera esistente, sostituire l'ID numerico con lo slug. Esempio:

```
// Prima
id: "1", slug: "pensieri-in-evoluzione"

// Dopo
id: "pensieri-in-evoluzione", slug: "pensieri-in-evoluzione"
```

Tutte le 24 opere (6 per categoria) verranno aggiornate.

### 2. Nessun altro file da modificare

- Il routing (`/:discipline/:artworkId`) funziona gia con stringhe qualsiasi
- `getArtwork()` cerca per `a.id` -- funziona con slug
- `DisciplinePage.tsx` usa `a.id` per i link -- generera URL come `/painting/pensieri-in-evoluzione`
- `ArtworkDetail.tsx` passa `artworkId` a `getArtwork()` -- funziona
- La sitemap genera `/${d}/${a.id}` -- produrra URL con slug

### 3. Risultato URL

```
Prima:  /painting/1
Dopo:   /painting/pensieri-in-evoluzione
```

URL piu leggibili e SEO-friendly.

---

## File modificati

| File | Modifica |
|------|----------|
| `src/lib/artworkData.ts` | Sostituzione ID numerici con slug per tutte le 24 opere |

Un solo file. Zero rischi di rottura.

