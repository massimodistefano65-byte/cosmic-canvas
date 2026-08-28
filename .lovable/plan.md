# Modalità Meditazione — correzioni verificate

## Diagnosi sincera, punto per punto

**1. Pulsazione ⓘ e Zen — nel codice sono già identiche al timbro**
Timbro, ⓘ e Zen usano tutti la stessa classe (`animate-archive-pulse`, 2s, opacità 0.55 → 1) e il CSS servito conferma il valore 2s. Quindi ciò che vedi non nasce da una durata diversa: o il browser sta usando una versione in cache del CSS, o la percezione cambia perché sul timbro pulsa un piccolo simbolo dorato con alone, mentre su ⓘ e Zen pulsa tutto il bottone (bordo incluso), che a occhio "batte" in modo più marcato.

Intervento: creo una singola classe CSS dedicata (`.seal-pulse`) in `index.css` con ritmo lento (3,5s, `ease-in-out`, 0.55 → 1) e la applico letteralmente allo stesso modo a timbro, ⓘ e Zen — un'unica sorgente, impossibile che divergano. Su ⓘ e Zen l'animazione viene applicata al solo simbolo interno, non al bottone/bordo, così il battito è visivamente identico al timbro. Fattibile, costo minimo.

**2. Dimensione icona Modalità Meditazione**
Vero: il simbolo è 15px con `strokeWidth 2` e bordo bottone a 2px, quindi risulta più pesante delle altre (16px, bordo 1px). Porto il bottone allo stesso stile degli altri (bordo 1px) e il simbolo a 16px con lo stesso peso di stroke degli altri, mantenendo il colore oro. Fattibile, costo minimo.

**3. Transizione di ingresso — capito perché non si vede**
La dissolvenza è scritta nel codice, ma è resa invisibile dal Fullscreen nativo: la richiesta di fullscreen viene fatta nello stesso istante dell'apertura, e il browser passa a schermo intero immediatamente — l'interfaccia del sito sparisce di colpo, prima che il velo nero abbia il tempo di dissolversi. La dissolvenza avviene, ma dentro uno schermo che è già diventato nero.

Intervento: invertire l'ordine. Prima il velo nero copre la pagina con dissolvenza (600ms), poi — a velo completo — parte la richiesta di fullscreen, e solo dopo l'opera emerge dal nero (800ms). In uscita il percorso è simmetrico: l'opera svanisce, si esce dal fullscreen, poi il velo si dissolve rivelando la pagina. Aggiungo anche un piccolo ritardo forzato tra montaggio e inizio della transizione, così il browser non "salta" il primo frame. Fattibile; è il punto che richiede più cura, ma la causa è chiara.

**4. Opere verticali tagliate**
Causa individuata: l'effetto respiro ingrandisce del 3% un contenitore che è già al 100% dello schermo, quindi nei formati verticali l'immagine esce dallo schermo e viene tagliata. Intervento: l'immagine viene dimensionata con un margine di sicurezza (max 92% dell'altezza e larghezza dello schermo), così anche al picco del respiro resta interamente visibile. In più aggiungo il vincolo di risoluzione naturale: l'immagine non viene mai ingrandita oltre i suoi pixel reali (uso `naturalWidth`/`naturalHeight` come tetto massimo), quindi su monitor grandi resta nitida con più nero attorno invece di sgranare. Fattibile.

**5. Foto sgranate — risposta onesta**
La Modalità Meditazione mostra già il file a risoluzione più alta disponibile (`artwork.full` se presente, altrimenti l'immagine principale). Se quel file è ottimizzato per la visualizzazione normale, a schermo intero su monitor grande non c'è nulla che il codice possa fare per aggiungere dettaglio che nel file non esiste: qualsiasi upscaling software peggiorerebbe la resa. L'unica cosa realmente utile lato codice è quella del punto 4 — non superare mai la risoluzione naturale, così l'immagine appare nitida (più piccola, con più nero attorno) invece di sgranata. Il miglioramento vero passa dal caricare, per le opere principali, una versione `full` più grande (indicativamente lato lungo 2400–3000px, WebP qualità 82–85). Posso documentare la procedura nella guida di manutenzione se vuoi.

## Verifica prima di dichiarare concluso
Controllo concreto in preview con browser automatizzato: misura della durata reale di animazione applicata a timbro/ⓘ/Zen (lette dal CSS calcolato dell'elemento), confronto dimensioni dei bottoni della barra, catture a intervalli durante l'apertura per dimostrare che esistono frame intermedi della dissolvenza, e test su un'opera verticale per verificare che l'immagine sia interamente visibile con bande nere sopra/sotto.

## File toccati
- `src/index.css` — nuova classe `.seal-pulse` (3,5s) e correzione del keyframe/uso del respiro.
- `src/pages/ArtworkDetail.tsx` — classe pulsazione condivisa su timbro/ⓘ/Zen, icona Zen allineata alle altre.
- `src/components/MeditationMode.tsx` — sequenza velo → fullscreen → opera, uscita simmetrica, contenimento immagine con margine di respiro e tetto alla risoluzione naturale.

Nessuna modifica a dati opere, gallerie, filtri, PDF, audio, navbar, i18n o deploy.
