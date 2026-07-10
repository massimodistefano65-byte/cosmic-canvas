## Modifiche mirate

### 1. Contrasto Pop-up Filtri (`FilterPanel.tsx`)

Uniformare tutti i testi/bordi al colore scuro nitido del titolo (`#1A1A1A` pieno, senza opacità ridotta).

- **Etichette sezioni** (Anno, Forma, Supporto, Prezzo, Genere, Colori dominanti): da `text-[#1A1A1A]/60` → `text-[#1A1A1A]` con peso `font-medium`.
- **Chip inattivi**: bordo da `border-[#1A1A1A]/25` → `border-[#1A1A1A]/70`; testo da `text-[#1A1A1A]/70` → `text-[#1A1A1A]`. Hover: bordo pieno `#1A1A1A`.
- **Chip attivi**: mantenuti su sfondo scuro (`bg-[#1A1A1A] text-[#FDFCF0]`) invece del bianco attuale, così spiccano davvero sull'avorio.
- **Select "Anno"**: bordo `border-[#1A1A1A]/70`, testo pieno.
- **Bordi separatori header/footer**: da `border-[#D4BE96]/20` → `border-[#1A1A1A]/20` per definizione netta.
- **Footer — "Rimuovi filtri"**: da `text-[#1A1A1A]/60` → `text-[#1A1A1A]` con underline sottile hover.
- **Footer — "Applica"**: bordo `border-[#1A1A1A]`, testo `text-[#1A1A1A]`, hover `bg-[#1A1A1A] text-[#FDFCF0]` (versione scura del CTA invece dell'oro sbiadito).
- **Icona X**: da `text-[#1A1A1A]/40` → `text-[#1A1A1A]/80`.
- **Cerchietti colore inattivi**: ring da `ring-[#1A1A1A]/15` → `ring-[#1A1A1A]/50` per bordo visibile.

Nessun cambio di layout, spaziature o struttura — solo tonalità.

### 2. Fluidità Lightbox + cambio miniatura (`ArtworkDetail.tsx` + `Lightbox.tsx`)

**Perché ora sembra "di scatto":** il `<img>` principale cambia `src` istantaneamente quando l'utente clicca su una miniatura; non c'è nessuna transizione di opacità applicata al cambio immagine. Il Lightbox ha già la transizione a 0.55s sul mount, ma anche lì il cambio `src` interno (se presente) sarebbe brusco.

**Soluzioni:**

**a) Cambio miniatura in pagina opera** (`ArtworkDetail.tsx`, entrambe le viste desktop/mobile, righe ~309-324 e ~648-660):
- Sostituire `<img>` statico con `<AnimatePresence mode="wait">` + `<motion.img key={selectedImage} ... initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5, ease:[0.22,1,0.36,1]}} />`.
- Il `key={selectedImage}` forza il remount → framer-motion cross-fade tra immagini.
- Preservare tutti gli attributi esistenti (`loading`, `decoding`, `fetchPriority`, `onError`, alt, className).

**b) Lightbox — cambio immagine interno** (`Lightbox.tsx`):
- Attualmente `<motion.img>` anima solo al mount/unmount. Aggiungere `key={imageUrl}` così cambia con cross-fade quando (in futuro) si naviga tra immagini dentro il lightbox.
- Durata già a 0.55s: OK.

**c) Miniature strip** (righe ~567 e ~854):
- Aggiungere `transition-all duration-500 ease-out` alla thumbnail attiva/inattiva se manca (verificare in fase di build).

Nessun cambio al layout, alle dimensioni o alla logica di selezione.

### File toccati

- `src/components/FilterPanel.tsx` — solo classi Tailwind (colori, opacità, hover states).
- `src/pages/ArtworkDetail.tsx` — wrap immagine principale con `motion.img` + `AnimatePresence` (2 punti: desktop + mobile).
- `src/components/Lightbox.tsx` — aggiungere `key={imageUrl}` a `motion.img`.

Nessuna nuova dipendenza (`framer-motion` già usato).