# Modalità Meditazione (Zen Mode) — analisi tecnica e piano

## 1. Risposte alle tue domande preliminari

**Rischi di conflitto**
Bassi, se la modalità vive in un componente separato (overlay) e non dentro il layout esistente. Punti verificati:
- L'audio è gestito da `AudioProvider` a livello di app, con due elementi `Audio` creati in JS e non collegati al DOM della pagina. Entrare/uscire dal fullscreen non li tocca: la musica di sezione continua senza interruzione e, se l'utente è in Mute, resta in silenzio. Nessuna modifica ad `AudioProvider` o `useSectionAudio`.
- Il caricamento immagini non è a rischio: l'overlay riusa la stessa URL già in cache dal browser (la versione già mostrata nella pagina), quindi nessun nuovo download pesante.
- `ArtworkDetail.tsx` viene toccato in modo minimo: un import, un `useState`, un bottone nella toolbar (desktop e mobile) e il montaggio condizionale dell'overlay. Nessun cambio a layout, dati, filtri, PDF, cuore, wishlist, lightbox.
- La regola CSS globale `img { pointer-events: none }` non crea problemi: l'uscita è gestita da un listener sul contenitore dell'overlay, non sull'immagine.

**Impatto performance**
L'effetto respiro usa una singola `@keyframes` su `transform: scale()` con durata ~14-18s e variazione ~1.00 → 1.03, quindi composita su GPU senza reflow/repaint (nessun `width`/`height`/`filter`). Costo trascurabile anche su smartphone datati. In più: rispetto di `prefers-reduced-motion` (animazione disattivata) e stop dell'animazione all'uscita perché l'overlay viene smontato.

**Limitazioni iOS/Safari**
Safari su iPhone non espone `requestFullscreen` per elementi generici. Strategia:
- Se `requestFullscreen` (o `webkitRequestFullscreen`) esiste → fullscreen nativo, con `.catch()` silenzioso.
- Se non esiste o la promise fallisce → fullscreen simulato: overlay `position: fixed; inset: 0` con z-index massimo, sfondo nero, blocco scroll del body. Impatto visivo identico, zero rischio di blocco.
- In ogni caso l'uscita non dipende dal fullscreen: il tap/click/ESC smonta l'overlay e ripristina l'interfaccia anche se il fullscreen non era mai partito.

**Reversibilità**
Sì. Tutto il comportamento sta in un nuovo file `src/components/MeditationMode.tsx` (+ un keyframe dedicato in `index.css` e due chiavi i18n). Rimuoverla significa cancellare il file, il bottone e il keyframe: nessun detrito, nessuna dipendenza inversa.

## 2. Cosa verrà implementato

**Pulsante Zen nella toolbar** (accanto a Cuore, Wishlist, Info, PDF, Share; presente sia nella toolbar desktop sia in quella mobile)
- Icona Ensō: cerchio lineare essenziale (SVG inline, `stroke` corrente, stesso `size={16}` e stesso bottone tondo `w-9 h-9` degli altri) colorato in oro `#d4af7a`.
- Animazione `animate-archive-pulse` — la stessa già usata dal Sigillo d'Oro.
- Tooltip con lo stesso `Tooltip` degli altri: "Modalità Meditazione — solo l'opera, senza distrazioni" (IT) e traduzione EN.

**Overlay immersivo**
- Fade-in/fade-out lento dell'overlay (opacity, ~800ms in, ~600ms out): nessun salto di schermata.
- Sfondo nero assoluto, opera centrata, `object-contain` con `max-width/height: 100%` → proporzioni originali, nessun taglio o deformazione.
- Mostra l'immagine attualmente selezionata (versione full-res se disponibile, come già fa la Lightbox).
- Effetto respiro come descritto sopra.

**Uscita robusta**
- Touch: singolo tap in qualsiasi punto.
- Desktop: click, tasto ESC, e movimento significativo del mouse (soglia cumulativa ~40px, con un breve ritardo di grazia iniziale per non chiudere subito dopo il click di apertura).
- Listener su `fullscreenchange`/`webkitfullscreenchange`: se il fullscreen viene chiuso da browser/OS, l'overlay si chiude e l'interfaccia torna normale.
- Cleanup garantito allo smontaggio: rimozione listener, `exitFullscreen` se ancora attivo, ripristino dello scroll del body. Rotazione schermo e cambio orientamento non rompono nulla (layout puramente flex/centrato, nessuna misura salvata).

## 3. Dettagli tecnici
- Nuovo file: `src/components/MeditationMode.tsx` (overlay + logica fullscreen/uscita, in un portale su `document.body`).
- `src/index.css`: un solo keyframe nuovo, `zen-breath`, e la classe `.zen-breath` (con guardia `prefers-reduced-motion`).
- `src/lib/i18n.tsx`: due chiavi (`artwork.tt.zen` IT/EN).
- `src/pages/ArtworkDetail.tsx`: `useState` `zenOpen`, bottone nelle due toolbar, `<MeditationMode ... />` montato condizionalmente. Nessun'altra riga toccata.
- Nessuna modifica a dati opere, gallerie, filtri, PDF, audio, navbar, deploy.

## 4. Verifica finale
Build + controllo in preview (desktop e viewport mobile) di: apertura/chiusura, fade, sfondo nero, centratura, respiro, continuità musica, ESC, tap, mouse move, chiusura esterna del fullscreen, e non-regressione di cuore/wishlist/PDF/share/lightbox/filtri.
