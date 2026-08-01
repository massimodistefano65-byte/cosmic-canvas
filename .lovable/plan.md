Piano di verifiche e rifiniture post-revert

1. Verifiche di stabilità (nessuna modifica al codice se tutto confermato)
   - Confermare che `src/App.tsx` continui a usare `BrowserRouter` senza hash/anchor routing.
   - Confermare che la Homepage non generi URL frammentati (`/#painting`, `/#digital-art`, ecc.).
   - Confermare che `.github/workflows/deploy-aruba.yml` sia tornato alla configurazione originale (`lftp` mirror standard, no flag aggiuntivi) e che il deploy sia stabile.
   - Audit rapido delle funzioni già approvate: audio, filtri, significato, certificato, transizioni, tooltip, i18n, contatti, AI summary.
   - Verificare che `src/pages/Bio.tsx` contenga ancora il JSON-LD Person completo (AI Summary per motori di ricerca) e che sia integro.

2. Modifiche alla pagina dettaglio opera (`src/pages/ArtworkDetail.tsx`)
   - Pulsante "Richiesta informazioni" (purchasing info): cambiare colore a bianco nitido/brightness-125 per coerenza con le etichette Titolo/Tecnica/Dimensioni; aggiungere animazione breathing lenta.
   - Pulsante "Significato dell'opera": rimuovere qualsiasi animazione pulsing/breathing; deve restare statico.
   - Icona Info (ⓘ) nella toolbar azioni: aggiungere animazione breathing evidente per attirare l'attenzione.
   - Tasto "Download" del certificato: ripristinare la visibilità su tutte le opere vendute, non solo su quelle con dedica. Rivedere la condizione di render in modo che si attivi per ogni opera con stato "Collezione privata" (o equivalente).

3. Internazionalizzazione filtri
   - Tradurre il testo del pulsante "FILTRA" in inglese quando `lang === 'en'` in tutte le sezioni galleria (`DisciplinePage` e `FilterPanel`).
   - Aggiungere la chiave `filters.filter` in `src/lib/i18n.tsx` se mancante e collegarla al bottone con icona `SlidersHorizontal`.

4. Dettagli tecnici
   - Per le animazioni breathing si userà un keyframe CSS custom o la classe `animate-pulse` di Tailwind, eventualmente regolata su durata 2.5-3s per renderla più morbida.
   - Il bianco nitido sarà ottenuto con `text-white` o `text-white brightness-125` usando token esistenti, senza introdurre nuovi colori hardcoded.
   - Per il download certificato, la logica di visibilità verrà allineata al campo `price` o a un flag di stato venduto, garantendo che il tasto appaia su ogni opera venduta indipendentemente dalla presenza di una dedica privata.

5. Output atteso
   - Homepage con URL pulito, nessun fragment.
   - Deploy Aruba stabile con workflow originale.
   - Dettaglio opera coerente: Info che respira, Richiesta informazioni bianca e pulsante, Significato fermo, Download visibile su tutte le opere vendute.
   - Filtri completamente bilingue (IT/EN).