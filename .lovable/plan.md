

# Piano: Ripristino Visualizzazione Immagini

## Problema

Il codice in `createArtwork()` (riga 74) genera percorsi basati sullo **slug**:
```
/artworks/painting/pensieri-in-evoluzione/massimo-di-stefano-...
```

Ma la cartella reale sul disco è ancora con l'**ID numerico**:
```
/artworks/painting/1/massimo-di-stefano-...
```

Inoltre, solo "Pensieri in Evoluzione" ha immagini reali. Le altre 23 opere non hanno cartelle né file — sono dati placeholder.

## Soluzione

Rinominare la cartella `public/artworks/painting/1/` in `public/artworks/painting/pensieri-in-evoluzione/` per allinearla al nuovo sistema basato su slug.

Questo è l'unico intervento necessario: un `mv` di cartella. Il codice è già corretto.

Le altre 23 opere continueranno a non mostrare immagini perché non hanno file fisici — questo è normale e verrà risolto man mano che caricherai le immagini nelle cartelle corrette (usando lo slug come nome cartella).

## File modificati

| Azione | Dettaglio |
|--------|-----------|
| Rinomina cartella | `public/artworks/painting/1/` → `public/artworks/painting/pensieri-in-evoluzione/` |

Zero modifiche al codice. Solo un'operazione sul filesystem.

