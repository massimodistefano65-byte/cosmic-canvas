# Piano di intervento

## PARTE 1 — Nuovo sistema filtri (Painting / Photography / Digital Art; predisposto per T-shirt)

Elimino l'attuale `GalleryFilters.tsx` (barra orizzontale di chip) e lo sostituisco con un pannello popup elegante allineato al mockup allegato.

### 1.1 Pulsante "FILTRA"
- Nuova posizione in `DisciplinePage.tsx`: sulla stessa riga del titolo `<h1>` (`flex items-center justify-between`), allineato a destra.
- Etichetta `FILTRA` con icona `SlidersHorizontal` (Lucide), stile bordo sottile su sfondo trasparente coerente con gli altri bottoni del sito.
- Contatore dinamico: quando ci sono N filtri attivi mostra `FILTRA (N)` in accento oro.
- Su T-shirt il pulsante viene renderizzato ma disabilitato (opacità ridotta, tooltip "In arrivo") — logica pronta, dati non collegati.

### 1.2 Pannello filtri (nuovo componente `FilterPanel.tsx`)
- Overlay controllato tramite `Dialog` shadcn per riusare l'animazione fade+scale già presente nei popup avorio del sito (coerenza con `MeaningDialog`, `EnquiryModal`).
- Sfondo avorio (`bg-[#f5f0e6]` come gli altri popup) con testo scuro, bordo oro sottile, larghezza `max-w-3xl`.
- Sezioni (grid 2 colonne su desktop, 1 su mobile):
  - **ANNO** — `<select>` nativo stilizzato: opzione "Tutti gli anni" + range dinamico `2000 → new Date().getFullYear()` (aggiornamento automatico).
  - **FORMA** — chip: Quadrato, Rettangolare, Altro.
  - **SUPPORTO** — chip: valori derivati dinamicamente dai `support` presenti nelle opere della disciplina corrente (Tela, Legno/Tavola, Carta, Polistirene, Metallo, Forex, Acetato…).
  - **FASCIA DI PREZZO** — chip fissi: `0–500`, `500–1.000`, `1.000–3.000`, `Oltre 3.000`. Le opere "Collezione privata" vengono escluse dai filtri di prezzo.
  - **GENERE** — chip: valori derivati dai `genre` presenti.
  - **COLORI DOMINANTI** — griglia di cerchietti (18 colori richiesti). Ciascuno con tooltip nome al hover + micro-transform (`hover:scale-110 hover:-translate-y-0.5`). Stato attivo: bordo oro spesso + ombra sottile.
- Chip: stato normale trasparente/bordo scuro sul fondo avorio; stato attivo `bg-white text-foreground border-white` (bianchi e restano bianchi come richiesto).
- Footer: `RESET FILTRI` a sinistra (link testuale), `APPLICA` a destra (bottone bordato oro).

### 1.3 Logica
- Stato filtri centralizzato in `DisciplinePage.tsx` (già presente). Si applica solo al click su APPLICA; RESET svuota.
- Fix del bug segnalato: la lista opzioni viene calcolata dai campi reali (`year`, `support`, `colors`, `shape`, `genre`, `price`) leggendo `getArtworksByDiscipline(config.key)` — quindi Anno e Supporto compariranno correttamente.
- Se `filteredArtworks.length === 0` la griglia mostra il testo centrato **"Nessun risultato trovato"** (stile muted, tipografia Cormorant coerente).

## PARTE 2 — Rifiniture UI

### 2.1 Popup "Opzioni d'acquisto"
- In `public/artworks/*/purchase.md` (le 3 varianti Painting/Photography/Digital) sostituisco il testo che cita `+` con la nuova formulazione, includendo il glifo `ⓘ` in `**bold**`. Verifico che il renderer markdown supporti il grassetto (già in uso).

### 2.2 Sigillo d'Oro (Collezione privata)
- In `ArtworkDetail.tsx` riduco il gap tra il badge sigillo e il testo "Collezione privata" (da `gap-3`/`mt-*` correnti a `gap-1.5`, blocco flex compatto).
- Aumento dimensione sigillo: da corrente (≈40px) a `w-14 h-14` desktop / `w-12 h-12` mobile, mantenendo drop-shadow oro.

### 2.3 Tooltip icone toolbar opera (solo desktop)
- Uso `Tooltip` di shadcn già disponibile. Avvolgo ognuna delle 5 icone in `ArtworkDetail.tsx`:
  - Cuore → "Mi piace"
  - Segnalibro → "Aggiungi ai preferiti"
  - ⓘ → "Richiedi informazioni"
  - Download → "Scarica scheda opera (PDF)"
  - Share → "Condividi"
- Tooltip mostrati solo con hover mouse (comportamento nativo Radix, invisibile su touch).

### 2.4 Fluidità apertura popup e Lightbox
- Verifico i `Dialog` shadcn: nel file `src/components/ui/dialog.tsx` porto la durata delle animazioni `data-[state=open]:duration-*` da default (~200ms) a `500ms` con easing dolce (`ease-out`) — modifica isolata alle classi Tailwind, senza toccare logica.
- Stessa cosa per il Lightbox della galleria: `AnimatePresence` in `Lightbox.tsx` → aumento `transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}`.
- Se la modifica destabilizza altri popup (verifica visiva Playwright), annullo l'intervento sulla dialog globale e limito il tuning al solo `MeaningDialog` / `EnquiryModal` / `CertificateDialog` / `Lightbox` (override locale). La stabilità ha priorità.

## Dettagli tecnici

- **File nuovi:** `src/components/FilterPanel.tsx`.
- **File modificati:** `src/components/GalleryFilters.tsx` (sostituito da wrapper minimale che espone il bottone + apre `FilterPanel`), `src/pages/DisciplinePage.tsx` (bottone in header, gestione empty state), `src/pages/ArtworkDetail.tsx` (Tooltip + sigillo), `public/artworks/*/purchase.md` (testo aggiornato), `src/components/Lightbox.tsx` (durata animazione), eventualmente `src/components/ui/dialog.tsx`.
- **Nessuna modifica al data layer:** i campi (`year`, `support`, `colors`, `shape`, `genre`, `price`) sono già presenti in `artworkData.ts`.
- **Validazione:** Playwright headless su `/painting`, apertura pannello filtri, selezione multipla, verifica screenshot + empty state; verifica tooltip su `/painting/coscienza`; verifica popup "Opzioni d'acquisto" e Certificate.
