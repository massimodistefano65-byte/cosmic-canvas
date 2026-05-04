
# Piano: UX, atmosfera sonora e contenuti opere

## 1. Scroll Restoration (galleria → opera → galleria)

In `DisciplinePage.tsx` salvo `scrollY` in `sessionStorage` (chiave `scroll:{discipline}`) prima di navigare a un'opera. Al mount della galleria ripristino la posizione dopo il primo render delle miniature. Stessa logica per `/archive`.

## 2. Virtualizzazione galleria

Mantengo `GalleryGrid` con i pattern asimmetrici e aggiungo lazy mount per blocchi: gruppi di ~12 item vengono montati solo quando entrano nel viewport (`IntersectionObserver`, rootMargin 600px). Gli item fuori viewport restano placeholder con altezza riservata → niente layout shift, niente decoding di centinaia di JPG insieme. Implementazione custom (no librerie esterne — react-window non gestisce griglie asimmetriche).

## 3. Fix frecce mobile (Home + Hero)

In `StackedSection.tsx` e `HeroSection.tsx`:
- `bottom-8` → `bottom-20 md:bottom-8` (alza su mobile)
- Wrapper flex per centratura perfetta indipendente da transform
- Tap target 48×48px

## 4. "Significato dell'opera" — pop-up elegante

**Posizione**: sotto il titolo, accanto a tecnica/anno/dimensioni in `ArtworkDetail.tsx`.

**Stile** (correzione richiesta): **identico** alle altre etichette (PREZZO, TECNICA, DIMENSIONI) — stesso font, stessa dimensione, stesso colore. Nessun oro. Per indicare la cliccabilità: solo `cursor-pointer` + `hover:opacity-70 transition-opacity`. Integrazione cromatica totale.

**Comportamento**: click apre un `Dialog` (shadcn) con sfondo coerente al tema (night blue translucido + backdrop blur), titolo in Cormorant Garamond, testo in Raleway, chiusura con X o click fuori.

**Fonte testo**: `public/artworks/{categoria}/{slug}/meaning.md`. Caricato a runtime via `fetch()` solo all'apertura. Se il file non esiste (404), l'etichetta non appare. Render con `react-markdown`.

## 5. Atmosfera sonora dinamica

**Architettura**: `AudioProvider` globale in `App.tsx` che gestisce due elementi `<audio>` per il crossfade.

**File MP3**: `public/audio/home.mp3`, `painting.mp3`, `photography.mp3`, `digital-art.mp3`, `t-shirt.mp3`, `archive.mp3`, `bio.mp3`.

**Logica**:
- Hook `useSectionAudio(section)` chiamato da ogni pagina
- Crossfade morbido (1.5s in / 1.5s out) tra due `<audio>` alternati
- `loop = true`, volume target 35%
- Stato salvato in `localStorage` (`audio-enabled`)
- Default **spento** (rispetta autoplay policy)

**Tasto controllo**: icona `lucide-react` (Volume2/VolumeX) fissa `bottom-6 right-6`, opacità 60% → 100% on hover, sotto al CookieBanner.

**404 silenziosi**: se manca un MP3, nessun errore visibile.

## 6. Aggiornamento `GUIDA-GESTIONE-OPERE.md`

### 9. Significato dell'opera
- File: `public/artworks/{categoria}/{slug}/meaning.md`
- Markdown semplice (titoli, paragrafi, corsivo)
- Se manca, l'etichetta non appare → nessun errore
- Workflow GitHub: aggiungi/modifica il file sul branch e committa

### 10. Musica ambient
- Cartella: `public/audio/`
- Nomi esatti: `home.mp3`, `painting.mp3`, `photography.mp3`, `digital-art.mp3`, `t-shirt.mp3`, `archive.mp3`
- Formato: MP3, 128 kbps, durata 2-5 minuti, < 3 MB consigliati, loop seamless
- Sostituisci il file per cambiare la traccia di una sezione
- Rimuovi il file per disabilitare la musica in quella sezione

## File modificati / creati

| File | Cosa |
|---|---|
| `src/pages/DisciplinePage.tsx` | Scroll restoration |
| `src/components/GalleryGrid.tsx` | Lazy mount per blocchi |
| `src/components/StackedSection.tsx` | Fix frecce mobile |
| `src/components/HeroSection.tsx` | Fix freccia mobile |
| `src/pages/ArtworkDetail.tsx` | Etichetta "Significato dell'opera" + Dialog (stile uniforme) |
| `src/components/MeaningDialog.tsx` | **NUOVO** |
| `src/components/AudioProvider.tsx` | **NUOVO** |
| `src/components/AudioToggle.tsx` | **NUOVO** |
| `src/hooks/useSectionAudio.ts` | **NUOVO** |
| `src/App.tsx` | Wrap `AudioProvider` + monta `AudioToggle` |
| Pagine sezioni | Chiamano `useSectionAudio('...')` |
| `package.json` | Aggiungo `react-markdown` |
| `GUIDA-GESTIONE-OPERE.md` | Sezioni 9 e 10 |
