## Piano d'intervento

### 1. Fix 404.3 di Aruba/IIS sui file `.md`

Aggiungere il MIME type `text/markdown` per l'estensione `.md` in `public/web.config`, nella sezione `<staticContent>` già esistente. Senza questo, IIS rifiuta di servire il file (404.3 = "extension configuration").

```xml
<remove fileExtension=".md" />
<mimeMap fileExtension=".md" mimeType="text/markdown" />
```

Inoltre la regola SPA "Rewrite to /index.html" gestisce già il caso "file non esistente" (i due `negate="true"` su `IsFile`/`IsDirectory`), quindi una volta dichiarato il MIME, i `.md` esistenti verranno serviti correttamente, e quelli mancanti continueranno a cadere su index.html — già correttamente filtrati dal controllo anti-HTML lato client.

### 2. Nuovo tasto "Opzioni d'acquisto"

In `src/pages/ArtworkDetail.tsx`:

- Aggiungere stato: `purchaseOpen`, `hasPurchase`, `purchaseContent`.
- Aggiungere un secondo `useEffect` analogo a quello di `meaning.md`, che fetcha `/artworks/{discipline}/purchase.md` (cartella radice della categoria, **non** della singola opera) con identico filtro anti-HTML/SPA fallback.
- Etichetta dinamica:
  - `painting` → `"Opzioni d'acquisto"`
  - altri (`photography`, `digital-art`, `t-shirt`) → `"Opzioni d'acquisto e supporti"`
- Renderizzare il bottone **subito sotto** "Significato dell'opera" (sia desktop che mobile), con **stile identico alle altre etichette tecniche** (Dimensioni/Tecnica/Prezzo): stesso font Raleway, stessa size (`text-[9px]` desktop / `text-[10px]` mobile), stesso tracking, **stesso colore** `text-foreground/70` — niente bianco luminoso, niente `animate-pulse`. Cursor pointer + leggera opacità in hover.
- Effetto spring on hover: wrappare il testo in `<motion.span whileHover={{ x: [-2, 2, -2, 0] }} transition={{ type: "spring", duration: 0.4 }}>` per il movimento orizzontale di molla.
- Riutilizzare `MeaningDialog` esistente passando `purchaseContent` e come titolo l'etichetta dinamica (il dialog è generico, mostra titolo + markdown).

### 3. Aggiornare `GUIDA-GESTIONE-OPERE.md`

Documentare brevemente: dove mettere `purchase.md` (in `public/artworks/{discipline}/purchase.md`), e che il pulsante appare solo se il file esiste.

### Dettagli tecnici

File modificati:
- `public/web.config` — aggiunta mimeMap `.md`
- `src/pages/ArtworkDetail.tsx` — nuovo stato, fetch purchase, bottone desktop+mobile
- `GUIDA-GESTIONE-OPERE.md` — nota su `purchase.md`

Nessun nuovo componente: il `MeaningDialog` esistente è già adatto (mostra titolo + markdown), quindi viene riusato.

### Domanda

L'effetto "spring" lo preferisci come:
- **A)** Piccola oscillazione orizzontale `x: [-2, 2, -2, 0]` (più sobrio, in linea con l'animazione delle voci del menu Navbar)
- **B)** Pulsazione di scala `scale: [1, 1.05, 1]` (più "tattile", suggerisce cliccabilità)

Proporrei **A** per coerenza con il resto del sito, ma confermi tu prima che procediamo in build mode.