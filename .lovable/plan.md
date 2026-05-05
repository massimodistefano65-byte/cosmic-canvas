## Problema

In `GalleryGrid.tsx` ogni "chunk" è avvolto in un `<div className="contents">` con `IntersectionObserver`. Con `display: contents` il div non ha un box renderizzato → l'observer non riceve mai un'intersezione → `visible` resta `false` → vengono mostrati solo i placeholder vuoti `bg-muted/5`. Risultato: galleria nera/invisibile.

## Soluzione

Rimuovere completamente la virtualizzazione a chunk e tornare al rendering diretto di tutti gli item, affidandosi al **lazy loading nativo** (`loading="lazy"` + `decoding="async"`) che era già presente sulle `<img>` e funzionava bene.

## Modifiche

**`src/components/GalleryGrid.tsx`** — riscrittura mirata:
- Eliminare il componente `Chunk` e la logica `IntersectionObserver` / `CHUNK_SIZE` / `visible`.
- Mappare direttamente `items` nella griglia, calcolando `getSizeForIndex(idx)` per ciascun item (pattern asimmetrici invariati).
- Mantenere: `motion.div` con `whileInView`, hover scale, fallback gradient, blur ring, click → `handleSelect`.
- Mantenere `handleSelect` che salva `sessionStorage.setItem('scroll:{discipline}', scrollY)` prima di navigare (scroll restoration intatta).
- Mantenere `loading="lazy"` e `decoding="async"` sulle immagini.

## Cosa NON viene toccato (resta funzionante)

- `AudioProvider`, `AudioToggle`, `useSectionAudio` (musica + crossfade).
- Scroll restoration in `DisciplinePage.tsx` (legge `sessionStorage` al mount).
- Frecce centrate mobile in `StackedSection.tsx` e `HeroSection.tsx`.
- `MeaningDialog` e link "Significato dell'opera" in `ArtworkDetail.tsx`.
- Pattern asimmetrici della griglia (A/B/C/D) e tutto lo styling.

## File modificati

| File | Cosa |
|---|---|
| `src/components/GalleryGrid.tsx` | Rimossa virtualizzazione a chunk, ripristinato rendering diretto con lazy loading nativo |

Nessun altro file viene modificato.
