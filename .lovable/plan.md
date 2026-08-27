# Correzioni Modalità Meditazione

## 1. Pulsazione uniforme delle tre icone
Il timbro "Collezione privata" usa l'animazione `archive-pulse` (opacità 0.55 → 1, `ease-in-out`, ciclo 3,5s). L'icona ⓘ usa invece `animate-pulse` di Tailwind (ciclo 2s, curva diversa) e l'icona Zen usa già `archive-pulse` ma è affiancata da elementi con ritmi diversi, per questo la percezione è disomogenea.

Intervento: applicare a ⓘ (desktop e mobile), a Zen e al link testuale "Significato/Collezione" la stessa animazione del timbro, con gli stessi valori esatti. Per avvicinarsi al ritmo di ~2s che hai indicato, porto `archive-pulse` da 3,5s a 2s mantenendo curva e opacità: così tutte e tre pulsano identiche e con il respiro lento richiesto. Se preferisci conservare esattamente il 3,5s attuale del timbro, basta dirlo e lascio la durata invariata su tutte.

## 2. Nuova icona Modalità Meditazione
- Cerchio perfetto: il bottone resta `w-9 h-9 rounded-full`, ma con `shrink-0` e `aspect-square` per impedire lo schiacciamento in flex.
- Bordo dorato più spesso, allineato al peso visivo del timbro (bordo 2px, oro `#d4af7a`).
- Simbolo interno: quattro angoli aperti verso l'esterno (icona "espandi/schermo intero", quattro piccole L agli angoli), stroke oro più spesso (2px). Rimossa l'icona Ensō attuale.

## 3. Tooltip
- Aggiunto tooltip al timbro "Collezione privata": "Certificato di autenticità" / "Certificate of authenticity" (il timbro viene avvolto in `TooltipTrigger`, senza cambiarne aspetto o comportamento di click).
- Aggiornato il testo del tooltip Zen: "Modalità Meditazione — l'opera a schermo intero" / "Meditation Mode — the artwork fullscreen".

## 4. Crossfade in entrata e in uscita
Attualmente l'overlay compare praticamente d'un colpo. Nuova struttura a due livelli dentro `MeditationMode.tsx`:

```text
t=0ms     sfondo nero inizia a comparire (opacità 0 → 1, 600ms)
t=300ms   l'opera inizia la dissolvenza (opacità 0 → 1, 800ms)
t≈1100ms  transizione completata
uscita    opera 0 in 500ms, poi nero 0 in 500ms (simmetrico, ~1000ms)
```

L'interfaccia della pagina non viene toccata: è il velo nero che la copre progressivamente, quindi si percepisce il sito che "svanisce nel nero" e il quadro che "emerge dal nero". La richiesta di fullscreen nativo resta, ma non interrompe più la dissolvenza.

## 5. Effetto "Respiro" percepibile
- Keyframe `zen-breath` riscritto: `scale(1)` → `scale(1.03)` → `scale(1)`.
- Durata ciclo 10s, `ease-in-out`, loop infinito (prima 16s con 1.03: troppo lento per essere notato).
- L'animazione viene applicata a un contenitore wrapper dell'immagine, non all'immagine stessa, così non entra in conflitto con la dissolvenza di opacità.
- Resta attiva la guardia `prefers-reduced-motion` e l'animazione rimane solo `transform` (GPU, nessun reflow).

## 6. Uscita dalla modalità meno sensibile
- Soglia di movimento mouse alzata da 40px a 100px cumulativi.
- Il conteggio si azzera se il mouse resta fermo più di ~1,2s, così micro-vibrazioni distribuite nel tempo non sommano fino alla soglia: serve un gesto ampio e continuo.
- Periodo di grazia iniziale portato da 1,2s a 1,5s dopo l'apertura.
- ESC continua a chiudere; su touch resta il singolo tap in qualsiasi punto; la chiusura esterna del fullscreen continua a smontare l'overlay.

## Dettagli tecnici
- `tailwind.config.ts`: durata di `archive-pulse` a 2s (valori opacità e curva invariati).
- `src/pages/ArtworkDetail.tsx`: nuova `ExpandIcon` al posto di `EnsoIcon`, classi bottone Zen (bordo 2px, `aspect-square shrink-0`), ⓘ e testo con `animate-archive-pulse`, timbro avvolto in Tooltip.
- `src/components/MeditationMode.tsx`: due stati di fade (velo/immagine), timer di sequenza, wrapper per il respiro, nuova logica soglia mouse.
- `src/index.css`: keyframe `zen-breath` aggiornato (10s, 1.03).
- `src/lib/i18n.tsx`: testo `artwork.tt.zen` aggiornato + nuova chiave `artwork.tt.seal`.
- Nessuna modifica a dati opere, gallerie, filtri, PDF, audio, navbar o deploy.

## Verifica
Build di produzione e controllo in preview (desktop e viewport mobile): ritmo identico delle tre pulsazioni, forma circolare e simbolo espandi, tooltip su timbro e Zen, crossfade in entrata/uscita, respiro percepibile, uscita solo con movimento ampio/ESC/tap.
