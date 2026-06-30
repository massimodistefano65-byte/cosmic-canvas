# Piano di rifinitura e funzionalità evolutive

Layout desktop 6 colonne escluso (lo gestisci tu via merge).

---

## 1. CertificateDialog — dedica privata

`src/components/CertificateDialog.tsx`:
- Rimuovere il blocco firma `— Massimo Di Stefano`.
- Aggiungere `whiteSpace: "pre-wrap"` al paragrafo della dedica per rispettare i `\n`.
- Mantenere font Cormorant italic e cornice attuale.

---

## 2. Pulizia console / asset statici (Aruba IIS)

- `public/web.config`: aggiungere MIME map per `.webmanifest` (`application/manifest+json`), `.json` (`application/json`), `.avif`, `.mp3`/`.ogg` (se serviranno per audio), header `Cache-Control` per `/images` e `/artworks`.
- `index.html`: verificare che tutti i `<link rel="preload">` puntino a file realmente esistenti (rimuovere preload Hero JPG, vedi §3); rimuovere eventuali riferimenti a favicon/manifest non presenti.
- `public/site.webmanifest`: validare che icone referenziate esistano in `public/`.
- Verifica con Playwright headless della console e network panel post-fix.

---

## 3. Hero — solo WebP

- `src/components/HeroSection.tsx`: sostituire `<picture><source/><img/></picture>` con un singolo `<img src="/images/hero-background.webp">`. Aggiornare anche il preload check (`new Image()`).
- `index.html`: rimuovere ogni `<link rel="preload" as="image" href=".../hero-background.jpg">`; mantenere solo il preload WebP.
- Nessun altro riferimento al JPG nel codice; il file `public/images/hero-background.jpg` potrai cancellarlo manualmente.

---

## 4. Toolbar minimal nella pagina opera

`src/pages/ArtworkDetail.tsx`: riorganizzare la riga esistente (like + "+") in una singola fila discreta, stessa dimensione icone (≈18px), stesso gap, hover sottile:

```
♥ like     ⓘ info     ☆ bookmark     ⤓ pdf     ⇪ share
```

- `Heart` (esistente, `useArtworkLike`)
- `Info` (Lucide) → apre nuovo **InfoRequestDialog** (§5), sostituisce l'attuale "+"
- `Bookmark` (Lucide) → wishlist (§6)
- `Download` (Lucide) → genera PDF (§7)
- `Share2` (Lucide) → apre **ShareMenu** (§8)

Nessuna toolbar, nessun bordo: solo una `<div className="flex items-center gap-5">`.

---

## 5. InfoRequestDialog (sostituisce EnquiryModal generico)

Nuovo `src/components/InfoRequestDialog.tsx`:
- Dialog elegante (stesso stile di CertificateDialog).
- Step 1: lista radio tipizzata
  - Richiesta acquisto
  - Richiesta esposizione
  - Richiesta collaborazione
  - Richiesta stampa
  - Richiesta licensing
- Step 2: form (nome, email, messaggio) prepopolato con oggetto contestuale: `[{Tipo}] {Titolo opera} ({Anno})`.
- Invio via Formspree (endpoint già in uso per Contatti).

---

## 6. Wishlist / Preferiti

- `src/hooks/useWishlist.ts`: hook con `localStorage` (`mds_wishlist` = array di `{discipline, artworkId, addedAt}`), API `toggle / has / list / clear`.
- Toggle dall'icona Bookmark in ArtworkDetail (icona piena se salvato, oro `#d4af7a`).
- Nuova pagina `src/pages/archive/MiaSelezione.tsx` mostrata come 6ª card discreta nell'Archivio (`Archive.tsx`) con label "La mia selezione" e contatore. Layout coerente con `GalleryGrid`.
- Route `/archive/mia-selezione` registrata in `App.tsx`.
- Aggiornare `scripts/generate-sitemap.ts` (escludere la route — è personale).

---

## 7. PDF scheda opera (auto-generato)

- Dipendenza: `jspdf`.
- `src/lib/generateArtworkPdf.ts`: funzione che riceve `ArtworkFullData`, costruisce un A4 sobrio:
  - Header tipografico Cormorant: titolo opera + anno
  - Immagine centrata (caricata dal CDN, convertita a dataURL con canvas)
  - Blocco metadati Raleway uppercase letter-spacing: tecnica, dimensioni, supporto, anno, codice archivio
  - Eventuale `meaning.md` (fetch dello stesso file usato da `MeaningDialog`) reso come paragrafo serif giustificato
  - Footer: `massimodistefano.art` + © anno corrente
- File salvato come `{slug}-scheda.pdf`.
- Niente "prezzo" sulla scheda (estetica archivio, non commerciale).

---

## 8. Share menu

- `src/components/ShareMenu.tsx`: piccolo popover (`@/components/ui/popover`) che si apre dall'icona `Share2`.
- Voci: WhatsApp, Facebook, X, Telegram, Copia link (toast Sonner di conferma).
- Instagram: omesso (no web share API affidabile); su mobile, opzionalmente, `navigator.share()` come fallback se disponibile.
- URL condiviso: URL canonico opera + titolo come testo.

---

## 9. Struttura filtri (scalabile, dati non ancora popolati)

Predisposizione completa, attivazione progressiva:

**Data layer** (`src/lib/artworkData.ts`):
- Estensione `ArtworkFullData` (tutti opzionali):
  ```
  colors?: string[]
  shape?: "rettangolare" | "quadrata" | "verticale" | "orizzontale" | "tondo"
  genre?: string[]
  ```
- `technique`, `support`, `year` già presenti.

**UI filtri** (`src/components/GalleryFilters.tsx`):
- Posizione: tra sottotitolo disciplina e `GalleryGrid` in `DisciplinePage.tsx`.
- Pattern minimal: una singola icona `SlidersHorizontal` che apre un `Popover` con 6 piccoli dropdown (`Select` multipli o checkbox).
- Stato filtri in URL search params (`?colore=giallo,arancione&supporto=tela`) per condivisibilità e scroll restoration compatibile.
- Logica combinabile (AND tra campi, OR dentro lo stesso campo).
- Le tendine mostrano solo i valori effettivamente presenti nelle opere di quella disciplina (auto-derivati): finché non popoli i campi, i menu restano vuoti/nascosti automaticamente.

**Guida** (`GUIDA-GESTIONE-OPERE.md`):
- Nuova sezione "Metadati filtri" con elenco valori ammessi per `colors`, `shape`, `genre` ed esempio JSON.
- Sezione "Dediche private" già presente: nota su `\n` e firma manuale.
- Sezione "Hero" semplificata (solo WebP).

---

## 10. Back to Top

- `src/components/BackToTop.tsx`: piccolo cerchio `ArrowUp` Lucide (≈18px), posizione fixed bottom-6 right-6, z-50.
- Appare quando `scrollY > 400` (on scroll listener throttled).
- Click: `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- Stile minimale: sfondo `rgba(26,26,26,0.4)`, bordo sottile oro `#d4af7a`, colore icona `#FDFCF0`, opacità 0 → 1 con transition 300ms, backdrop-blur. Nessuna label testuale.
- Inserito una volta in `App.tsx` (dopo routes) perché sia globale.

---

## File toccati (riepilogo)

Modifiche:
- `src/components/CertificateDialog.tsx`
- `src/components/HeroSection.tsx`
- `src/pages/ArtworkDetail.tsx`
- `src/pages/Archive.tsx`
- `src/pages/DisciplinePage.tsx`
- `src/lib/artworkData.ts`
- `src/App.tsx`
- `index.html`
- `public/web.config`
- `GUIDA-GESTIONE-OPERE.md`

Nuovi:
- `src/components/BackToTop.tsx`
- `src/components/InfoRequestDialog.tsx`
- `src/components/ShareMenu.tsx`
- `src/components/GalleryFilters.tsx`
- `src/hooks/useWishlist.ts`
- `src/lib/generateArtworkPdf.ts`
- `src/pages/archive/MiaSelezione.tsx`

Dipendenze: `jspdf`.

## Validazione finale

- Playwright headless su `/`, una pagina opera e `/painting`: screenshot toolbar, console pulita, network senza 404 e senza doppio download Hero.
- Verifica wishlist persistente su reload, filtri reattivi all'URL, PDF scaricato e apribile, BackToTop visibile dopo scroll su pagine lunghe.
