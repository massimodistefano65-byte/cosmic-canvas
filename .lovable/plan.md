## 1. La "Fabbrica dei Certificati" (PDF ufficiale)

**Nuova dipendenza:** `qrcode` (generazione QR come dataURL). `jspdf` è già presente.

**Nuovo file `src/lib/generateCertificatePdf.ts`** — motore data-driven, A4 verticale, sfondo avorio `#FDFCF0`:

```text
┌──────────────────────────────────────┐
│        [logo-archivio.png]           │
│  CERTIFICATO DI AUTENTICITÀ DIGITALE │
│  ─────────── filetto oro ─────────── │
│         [foto opera, centrata]       │
│                                      │
│   « Titolo »            (Cormorant)  │
│   Anno · Tecnica · Dimensioni        │
│                                      │
│   SIGNIFICATO DELL'OPERA             │
│   testo dal .md, giustificato        │
│                                      │
│   DEDICA PRIVATA (se presente)       │
│   testo corsivo in cornice sottile   │
│                                      │
│  CODICE ARCHIVIO   [QR]              │
│  MDS-P-XXXX        → URL opera       │
│                                      │
│      [firma-massimo.png]             │
│      Massimo Di Stefano              │
└──────────────────────────────────────┘
```

- Font: jsPDF built-in Times/Helvetica (i font custom appesantirebbero il bundle); nessun carattere non-ASCII problematico — il testo italiano con accenti viene reso correttamente registrando un TTF Unicode leggero solo se necessario in fase di verifica.
- Asset caricati da `/images/logo-archivio.png` e `/images/firma-massimo.png` (già presenti).
- Immagine opera: `artwork.main`, ridimensionata proporzionalmente entro un riquadro fisso.
- QR: punta a `https://<origin>/{discipline}/{slug}`.
- Paginazione automatica su seconda pagina se il "Significato" è lungo.
- Nome file: `certificato-{archiveId}-{slug}.pdf`.

**Interfaccia (`CertificateDialog.tsx`):**
- Icona `Download` (lucide) nella testata accanto alla X, stesso colore del testo, tooltip "Scarica Certificato di Autenticità Ufficiale" / "Download Official Certificate of Authenticity".
- Visibile **solo dopo la verifica** (`status === "verified"`), con spinner durante la generazione.
- Il dialog riceve i nuovi props necessari (dati opera, meaning, discipline/slug) da `ArtworkDetail.tsx`, che già li possiede.

**Automatismo:** nessun intervento sul codice per nuove opere — basta aggiungere `archiveId` in `artworkData.ts` e il certificato è disponibile.

## 2. Bilinguismo completo (IT/EN)

- **Testi di sistema**: tutte le stringhe fisse di `CertificateDialog`, `MeaningDialog` e del PDF passano da `useI18n()` (nuove chiavi in `src/lib/i18n.tsx`), incluso il titolo "Digital Certificate of Authenticity" e il paragrafo di garanzia dell'Archivio.
- **Contenuti .md**: il fetch prova prima `meaning-en.md` → fallback `meaning.md`; e `dedication-en.md` → fallback `dedication.md`. Il filtro anti-HTML (falsi positivi Aruba) resta attivo su entrambi.
- **Tecnica inglese**: nuovo campo opzionale `techniqueEn` in `ArtworkFullData` / `createArtwork`. Se la lingua è EN e il campo è valorizzato, viene mostrato al posto della tecnica italiana (in pagina opera, PDF e tooltip). Il campo va poi popolato dall'Excel (colonna "TECNICA INGLESE") con lo script di patch già documentato.
- **Prezzo**: "Collezione privata" → "Private collection" in EN.
- **Etichette**: Anno/Tecnica/Dimensioni → Year/Technique/Dimensions.
- **Titoli opere**: invariati in entrambe le lingue.

## 3. Controllo audio (Navbar)

`AudioToggle.tsx` passa da testo a icona:
- `Volume2` quando ON, `VolumeX` quando OFF — bianco luminoso come le altre voci.
- Stesso effetto bounce (`whileHover` spring) degli altri elementi.
- Desktop: tooltip discreto "Play Music" / "Mute" (in EN: stessi termini).
- ON: leggera animazione di "respiro" (scala/opacità pulsante lentissima) sull'icona.
- Mobile: solo icona accanto al menu hamburger, nessun testo.

## 4. Transizioni di pagina — approccio a rischio zero

Data la tua condizione tassativa, procedo **solo** con la soluzione più conservativa possibile:

- Un wrapper CSS **puramente opacity-based** (`animation: fade-in-page 420ms ease-out`), **nessun `transform`**, **nessuna animazione di uscita**, **nessun `AnimatePresence`**, nessun montaggio ritardato.
- Applicato **solo** alle pagine interne. **La Home è esclusa** — fullPage.js non viene toccato in alcun modo.
- L'animazione non altera altezza né `scrollHeight`, quindi lo `scroll restoration` di `DisciplinePage` (basato su `isRestoring` + posizione salvata) continua a funzionare identico: il ripristino avviene sul layout reale, non su un elemento animato in posizione.
- Se in fase di verifica in preview rilevo anche solo un micro-scatto sulle gallerie o un ritardo nel ripristino della posizione, **rimuovo la transizione** e te lo comunico, lasciando il cambio pagina istantaneo.

## 5. Documentazione

`GUIDA-GESTIONE-OPERE.md` aggiornata con:
- Come funziona la "Fabbrica dei Certificati" e da quali campi Excel attinge.
- Gestione degli asset `/public/images/logo-archivio.png` e `firma-massimo.png` (come sostituirli).
- Nuova colonna "TECNICA INGLESE" → campo `techniqueEn`.
- Convenzione file `meaning-en.md` e `dedication-en.md`.

## File toccati

- `package.json` — dipendenza `qrcode`
- `src/lib/generateCertificatePdf.ts` — nuovo
- `src/components/CertificateDialog.tsx`
- `src/components/MeaningDialog.tsx`
- `src/components/AudioToggle.tsx`
- `src/pages/ArtworkDetail.tsx` — fetch bilingue .md, props al dialog, `techniqueEn`
- `src/lib/artworkData.ts` — campo `techniqueEn`
- `src/lib/i18n.tsx` — nuove chiavi
- `src/index.css` + wrapper transizione (escluso Home)
- `GUIDA-GESTIONE-OPERE.md`

Verifica finale: build + typecheck, controllo visivo del PDF pagina per pagina (IT ed EN), test scroll restoration e Home fullPage.
