# Bio in avorio + ricerca per titolo nei filtri

## 1. Pagina Bio — schede avorio

Struttura verticale, sequenza delle sezioni e disposizione foto/testo restano identiche. Cambia solo il contenitore del testo: ogni blocco di testo diventa una scheda avorio `#FDFCF0` con bordo `#D4BE96/40` e angoli arrotondati, appoggiata sullo sfondo nero della pagina (che resta visibile intorno).

- Titoli dentro le schede: Cormorant Garamond, colore `#2b2820`
- Paragrafi dentro le schede: Raleway, colore `#4a473e`
- Le immagini restano dove sono ora (stessa colonna, stesso rapporto 4/5)
- Header, menu, footer, font e colori base (nero/oro) non vengono toccati
- Nessuna modifica ai testi: solo impaginazione

## 2. Titoli con i due punti — a capo obbligatorio

I titoli delle sezioni Bio che contengono ":" verranno spezzati automaticamente: la parte prima dei due punti su una riga, quella dopo su una riga nuova. Regola applicata a tutti i titoli della pagina (funziona sia in IT che in EN), non solo agli esempi.

## 3. Sezione "Geografie dell'anima"

Tre schede avorio affiancate (Pittura, Fotografia, Arte Digitale), ognuna con, dall'alto: immagine rettangolare con angoli arrotondati, titolo, testo breve.
Altezze sfalsate su desktop (la scheda centrale abbassata) e spaziatura ampia tra le schede, così lo sfondo nero resta ben visibile tra un blocco e l'altro. Su mobile/tablet le schede si impilano con lo stesso distacco.

Immagini: si usano placeholder temporanei, con percorsi già predisposti (`/images/bio/geografie-painting.webp`, `geografie-photography.webp`, `geografie-digital-art.webp`). Caricando i file con quei nomi le foto definitive compaiono senza altre modifiche al codice.

Le 4 foto principali della Bio (Ritratto, Al lavoro, T-shirt, Cosmic) non vengono toccate.


## 4. Box "Chi è Massimo Di Stefano" (AI Summary)

Testo portato alla stessa dimensione dei paragrafi normali della pagina (`text-lg`) e schiarito verso il bianco (non più il grigio spento). Il riquadro con bordo sottile resta.

## 5. Leggibilità su tutti i pannelli avorio del sito

Stesso contrasto applicato dove il testo su avorio è troppo chiaro:

- `MeaningDialog` ("Significato dell'opera"): paragrafi da `#1A1A1A` con opacità 80% a `#4a473e` piena; titoli/etichette `#2b2820`
- `FilterPanel` ("Filtra le opere"): etichette di sezione e chip inattivi con `#2b2820`, testi secondari `#4a473e`
- Blocco "Opzioni d'acquisto" e `CertificateDialog`: stessi due colori per titoli e paragrafi

Nessun cambio di layout in questi popup: solo colori del testo.

## 6. Ricerca per titolo nei filtri

Nuovo campo di testo "Titolo / Title" in cima al pop-up dei filtri, nello stile avorio già usato (stesso input del campo Anno).

- Legge i titoli direttamente da `artworkData.ts` (i dati generati dal Master Excel), quindi sempre sincronizzato
- Case-insensitive, corrispondenza parziale su qualsiasi parola del titolo (es. "amore", "golden")
- Aggiornamento immediato durante la digitazione
- Si combina in AND con tutti i filtri esistenti (colore, forma, anno, supporto, genere, prezzo)
- Conta come filtro attivo nel badge del pulsante FILTER e viene azzerato da "Reset"
- Funziona su tutte le sezioni che usano il pannello filtri

## 7. Guida di manutenzione

Aggiornamento di `GUIDA-GESTIONE-OPERE.md`: sezioni nuove/riviste su audio per sezione, file `meaning.md` / `meaning-en.md` e `dedication*.md`, certificati e opere vendute, filtri (inclusa la nuova ricerca per titolo), immagini WebP e cover Home, contenuti Archivio, i18n (dove aggiungere le traduzioni, campi `priceEn`/`dimensionsEn`), immagini Bio, workflow GitHub + deploy Aruba.

## Note tecniche

File coinvolti: `src/pages/Bio.tsx` (ristrutturazione grafica), `src/components/FilterPanel.tsx` (campo titolo + colori), `src/pages/DisciplinePage.tsx` (filtro titolo nella catena di filtraggio), `src/components/MeaningDialog.tsx`, `src/components/CertificateDialog.tsx`, `src/pages/ArtworkDetail.tsx` (solo colori testo su avorio), `src/lib/i18n.tsx` (chiavi `filter.title.search` IT/EN), `GUIDA-GESTIONE-OPERE.md`.

Nessuna modifica a dati, backend, routing, Navbar o footer.
