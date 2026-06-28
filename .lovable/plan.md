# Piano — Ristrutturazione sezione Archive (rev. 3)

Recepite le tue precisazioni:
- **Critiche** completamente espandibile (data-driven: basta aggiungere un oggetto nel file dati).
- **Timeline & popup editoriali**: layout ampio tipo PDF/A4 (max-width ~900-920px, padding generoso, line-height arioso).
- **Naming**: "Percorso Espositivo" ovunque (titolo card, rotta, breadcrumb, SEO).
- **Nessuna nota finale** sotto la timeline: tono archivistico e definitivo, niente "in aggiornamento".

---

## 1. Home Archive — griglia a 5 card

Rimuovo `<Tabs>` e le card finte ("Pensieri in Evoluzione", "Dr. Maria Rossi").

Nuova `Archive.tsx`: griglia 5 card quadrate (3+2 centrate desktop, 2+2+1 tablet, 1 colonna mobile):
**Mostre · Video · Download · Critiche · Altri Progetti**
- area intera cliccabile → naviga al sotto-livello
- titolo Cormorant sotto al quadrato
- hover scale + glow oro coerente con gallerie opere
- placeholder gradiente cosmico finché manca cover reale
- overlay hover "Contenuto in arrivo" solo per sezioni vuote
- audio `useSectionAudio("archive")` attivo qui e su tutte le sotto-rotte

## 2. Architettura routing modulare ("scatole cinesi")

```
/archive                             → griglia 5 card
/archive/mostre                      → griglia Mostre (include card "Percorso Espositivo")
/archive/mostre/percorso-espositivo  → timeline editoriale
/archive/video                       → griglia video
/archive/download                    → griglia download (link diretti)
/archive/critiche                    → griglia critiche (4 ora, N in futuro)
/archive/critiche/:slug              → popup editoriale critica
/archive/progetti                    → griglia Altri Progetti
/archive/progetti/:slug              → popup editoriale progetto
```

Back-button coerente con ArtworkDetail. Navbar globale sempre visibile. X per chiudere popup.

## 3. Mostre + Percorso Espositivo

Griglia Mostre: per ora una sola card "Percorso Espositivo" (placeholder cosmico). Altre card future via file dati.

Pagina `/archive/mostre/percorso-espositivo` — **lettura tipo A4**:
- contenitore largo, max-width ~900px, padding orizzontale generoso (px-6 md:px-12), padding verticale arioso
- titolo Cormorant grande "Massimo Di Stefano — Percorso Espositivo" + sottotitolo decorativo
- raggruppata per anno (2010 → 2016), ogni anno = sezione con heading anno grande
- ogni voce = riga con bullet sobrio + testo Raleway 16/17px, line-height ~1.8
- accapi, rientri, note curatore e indentazioni preservati esattamente come nel documento fornito
- responsive: stesso ritmo arioso su mobile con padding adattato
- **nessuna nota finale**: la pagina si chiude in modo naturale dopo l'ultima voce, mantenendo un tono archivistico definitivo

### Puntini pulsanti auto-attivanti (predisposizione completa)

Stessa logica già usata per "Significato dell'opera":
- ogni `TimelineEntry` in `archiveData.ts` ha campo opzionale `materials?: MediaItem[]`
- accanto alla voce viene renderizzato puntino dorato pulsante **solo se** `materials` ha almeno 1 elemento
- nessun `materials` → nessun puntino
- click sul puntino → apre `ArchiveMediaDialog` con quei materiali
- struttura predisposta fin da subito su **tutte** le voci: in futuro basta aggiungere `materials: [...]` nel file dati e il puntino compare automaticamente, senza alcuna modifica al codice

## 4. Critiche — struttura espandibile

`/archive/critiche` → griglia che mappa l'array `criticisms`. Inizialmente 4 voci, ma il sistema è completamente data-driven: aggiungere una 5ª, 6ª, Nª critica significa solo aggiungere un oggetto al file dati.

Card iniziali:
1. **Critica dott. Andrea Domenico Taricco** — "Psicocreativismo siderale"
2. **Critica Oxan Clounot**
3. **Critica dott. Luciano Lepri**
4. **Dicono di me**

Ogni card → rotta `/archive/critiche/:slug` con popup editoriale ampio (vedi §5).

Schema esteso `Criticism`: `id, slug, title, author, year, excerpt, body, coverImage?, materials?: MediaItem[], published?`. Materiali aggiuntivi (immagini/video/PDF) appaiono nel popup solo se popolati — stessa logica auto-attivante.

Sitemap si rigenera leggendo solo le critiche con `published: true`.

## 5. Popup editoriali archivistici (`ArchiveMediaDialog`)

Nuovo componente coerente con `MeaningDialog`/`CertificateDialog` ma **percezione PDF/A4**:
- max-width ~920px, max-height 90vh, scroll interno fluido
- padding interno generoso (p-8 md:p-12), line-height arioso (~1.8)
- header: titolo Cormorant grande + sottotitolo (autore/anno)
- body: contenuti misti renderizzati in ordine dall'array `MediaItem[]` (testi lunghi, immagini, gallerie, embed YouTube, PDF download, link esterni)
- atmosfera identica ai dialog esistenti (overlay scuro, bordo sottile, glow oro discreto)
- X chiusura in alto a destra
- responsive: padding ridotto mobile, immagini full-width, ma sempre ariose

Sostituisce `ProjectContentModal.tsx` (verrà rimosso).

## 6. Fluidità apertura popup (fix definitivo, vale per tutti i dialog)

Apertura attuale percepita "a scatto" perché Tailwind `animate-in fade-in-0` ha durata troppo breve rispetto al timing Radix.

Soluzione applicata a `dialog.tsx` e `alert-dialog.tsx`:
- rimozione `data-[state=open]:animate-in fade-in-0`
- keyframes dedicati in `index.css`:
  - `@keyframes dialog-fade-in` (opacity 0→1 + scale 0.985→1) — 520ms `cubic-bezier(0.22, 0.61, 0.36, 1)`
  - `@keyframes dialog-overlay-fade` — 640ms ease-out
- `transform-origin: center`, `will-change: opacity, transform`, `backface-visibility: hidden` per stabilità Safari/Firefox
- comparsa morbida, graduale, non teatrale

Si applica a tutti i popup esistenti (Significato, Certificato, Enquiry, Lightbox dialog) e ai nuovi popup Archive.

## 7. Download — link diretti reali

Card download usano `<a href="/downloads/file.pdf" download>` puro (no `target="_blank"` ambiguo). Verifico che i file in `public/downloads/` siano serviti correttamente (MIME PDF già configurato in `web.config` Aruba).

## 8. Audio Archive (sezione)

`useSectionAudio("archive")` già usato in Archive.tsx. Lo estendo a **tutte** le sotto-rotte `/archive/*` (Mostre, Percorso Espositivo, Video, Download, Critiche + dettaglio, Progetti + dettaglio): l'audio non si interrompe navigando dentro la sezione.

File atteso (caricato in autonomia via GitHub): `public/audio/archive.mp3`. Stesso pattern delle altre sezioni — documentato nella guida.

## 9. SEO & Sitemap

- `SEOHead` su ogni sotto-rotta con title/description/canonical dedicati:
  - "Percorso Espositivo — Massimo Di Stefano"
  - "Critica Luciano Lepri — Massimo Di Stefano"
  - ecc.
- aggiorno `scripts/generate-sitemap.ts` per includere:
  `/archive`, `/archive/mostre`, `/archive/mostre/percorso-espositivo`, `/archive/video`, `/archive/download`, `/archive/critiche`, `/archive/critiche/:slug` (per ogni slug `published: true`), `/archive/progetti`, `/archive/progetti/:slug`
- rigenero `public/sitemap.xml`
- flag `published?: boolean` rispettato come per le opere
- verifica responsive desktop/mobile e collegamenti interni dopo build

## 10. Guida operativa (aggiornamento, non riscrittura)

Aggiungo a `GUIDA-GESTIONE-OPERE.md` una nuova sezione **"📚 Gestione sezione Archive"** con istruzioni dettagliate:
- aggiungere/modificare voci della **timeline** (struttura `TimelineEntry`, esempi)
- **attivare il puntino pulsante**: basta popolare `materials: [...]` su quella voce — niente modifiche al codice
- aggiungere **nuove critiche** (nuovo oggetto in `criticisms[]` con slug, titolo, autore, body, eventuali `materials`)
- aggiungere **nuovi "Altri Progetti"** (UFO, Bonsai, Micro-ecosistemi futuri)
- inserire testi/immagini/video/PDF nei popup editoriali (esempi MediaItem per ogni tipo)
- caricare l'**MP3 di sezione** (`public/audio/archive.mp3`)
- regola d'oro: contenuti vuoti → niente puntino/card/menu — tutto automatico
- come mantenere la coerenza strutturale negli aggiornamenti futuri

---

## Dettagli tecnici (riferimento)

**File nuovi:**
- `src/pages/archive/ArchiveHome.tsx`
- `src/pages/archive/MostreIndex.tsx`
- `src/pages/archive/PercorsoEspositivo.tsx`
- `src/pages/archive/VideoIndex.tsx`
- `src/pages/archive/DownloadIndex.tsx`
- `src/pages/archive/CritichePagina.tsx` + `CriticaDetail.tsx`
- `src/pages/archive/ProgettiIndex.tsx` + `ProgettoDetail.tsx`
- `src/components/archive/ArchiveCard.tsx` (card quadrata riusabile)
- `src/components/archive/ArchiveBackButton.tsx`
- `src/components/archive/ArchiveMediaDialog.tsx`
- `src/components/archive/PulseDot.tsx`
- `src/components/archive/TimelineYear.tsx`

**File modificati:**
- `src/lib/archiveData.ts`: nuovo tipo `TimelineEntry { id, year, text, indent?, materials?: MediaItem[] }`; `Criticism` esteso con `slug`, `body`, `coverImage?`, `materials?`, `published?`; array `timeline` con contenuto 2010-2016 verbatim; `criticisms` aggiornate (4 voci iniziali); array `otherProjects` ripulito dai placeholder
- `src/App.tsx`: nuove rotte `/archive/*`
- `src/pages/Archive.tsx`: entrypoint → ArchiveHome
- `src/components/ui/dialog.tsx` + `alert-dialog.tsx`: nuova animazione fade
- `src/index.css`: keyframes `dialog-fade-in` + `dialog-overlay-fade`
- `scripts/generate-sitemap.ts` + `public/sitemap.xml`
- `src/lib/i18n.tsx`: nuove chiavi `archive.*`
- `GUIDA-GESTIONE-OPERE.md`: nuova sezione "Gestione sezione Archive"

**File rimossi:** `src/components/archive/ProjectContentModal.tsx` (sostituito da ArchiveMediaDialog).

**Contenuti importati dai documenti forniti:** timeline 2010-2016 verbatim (anni, mostre, curatori, sedi); 4 testi critici dai file `.docx` allegati (Taricco/Psicocreativismo siderale, Oxan Clounot, Luciano Lepri, Dicono di me).
