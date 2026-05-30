## Stato attuale

✅ **Database già creato** (migration eseguita):
- Tabella `archive_certificates` (codici cifrati con bcrypt, non leggibile dal client)
- RPC `verify_archive_code(archive_id, code) → boolean`
- RPC `register_archive_code(archive_id, code) → 'created' | 'duplicate' | 'invalid_id' | 'invalid_code'` (vincolo di unicità a livello DB)
- RPC `list_archive_codes() → archive_id[]` (mai espone gli hash)

Manca solo il codice frontend.

## File da scrivere

### 1. `src/lib/artworkData.ts` — campo `archiveId`
Aggiungo campo opzionale `archiveId?: string` a `ArtworkFullData` e `CreateArtworkInput`. Nessuna opera viene modificata: il campo si compilerà a mano quando vorrai attivare un'opera (es. `archiveId: "MDS-26P-7K2"`).

### 2. `src/components/CertificateDialog.tsx` — nuovo
- Stesso wrapper visivo di `MeaningDialog`: `#FDFCF0`, bordo oro `#D4BE96`, Cormorant per titolo, Raleway per body.
- **Layout discorsivo**, niente griglia a rettangoli.
- **Livello 1 (pubblico)**: titolo "Certificato di Autenticità Digitale" → `<hr>` → testo statuto archivio → blocco codice archivio centrato.
- **Livello 2 (verifica)**: in fondo dopo `<hr>` discreta, sezione "Sei il proprietario?" con **unico riquadro evidenziato** (`bg-white/70`, bordo oro, `rounded-lg`) contenente input + bottone "Verifica".
- **Persistenza dispositivo**: al successo salvo in `localStorage` la chiave `mds_archive_verified_{archiveId}=1`. Alla riapertura del dialog mostro subito lo stato verificato (riquadro emerald con il messaggio "✅ AUTENTICITÀ VERIFICATA…").
- Errore inline sotto input se codice errato.
- Verifica via `supabase.rpc('verify_archive_code', { _archive_id, _code })`.

### 3. `src/pages/AdminGestioneArchivio.tsx` — nuovo
Pagina pubblica (no auth, stile coerente con `/admin/artworks-status`):
- Form: input `archive_id`, input `codice segreto`, bottone "Registra".
- Chiama `register_archive_code` → toast "Creato" / "Codice già esistente" / errore validazione.
- Sotto: lista dei codici archivio già registrati (`list_archive_codes`) con data, senza esporre nulla di sensibile.
- SEO `noindex`.
- Route: `/admin/gestione-archivio-md`.

### 4. `src/pages/ArtworkDetail.tsx` — sigillo condizionale
Sia desktop che mobile, nel blocco "Prezzo":
```tsx
const isArchived = !!artwork.archiveId && /collezione privata/i.test(artwork.price ?? "");
```
Se `isArchived`: render `<button>` con icona `Stamp` (lucide-react, bianco, allineato al testo), tooltip "Archivio Storico MDS — Certificato di Autenticità. Clicca per verificare la proprietà.", classe `animate-archive-pulse`, apre `<CertificateDialog>`.

### 5. `tailwind.config.ts` — keyframe pulsazione lenta
```
"archive-pulse": { "0%, 100%": { opacity: "0.55" }, "50%": { opacity: "1" } }
```
Animation: `archive-pulse 3.5s ease-in-out infinite`.

### 6. `src/components/ui/dialog.tsx` + `alert-dialog.tsx` — fade dolce
Rimuovo `zoom-in-95` / `slide-*` aggressivi, lascio solo fade + zoom leggero (`zoom-in-[0.98]`), durata `duration-500`, easing morbido. Impatta automaticamente Meaning, Purchase, Enquiry, Certificate e tutti i dialog del sito.

### 7. `src/App.tsx` — registra route
Aggiungo `<Route path="/admin/gestione-archivio-md" element={<AdminGestioneArchivio />} />` sopra il catch-all.

## Conflitti scroll/musica

- `CertificateDialog` = Radix Dialog isolato, come `MeaningDialog` → zero impatto su fullPage.js / `AudioProvider`.
- Pagina admin = pagina React standard, niente fullPage.js né `useSectionAudio`.
- Sigillo è un `<button>` dentro layout flex già esistente, non rompe nulla.

## Come usare (per te)

1. Vai su `/admin/gestione-archivio-md`, inserisci `archiveId` + codice segreto, "Registra". Annotati il codice segreto **subito** (è hashato, non lo potrai più recuperare).
2. In `artworkData.ts` aggiungi `archiveId: "MDS-XXX"` all'opera e imposta `price: "€ Collezione privata"`.
3. Il sigillo appare in automatico sulla pagina dell'opera.

Pronto a partire?
