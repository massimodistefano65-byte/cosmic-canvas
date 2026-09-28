# Correzioni mirate — settembre 2026

## Obiettivo
Correggere esclusivamente i sei comportamenti segnalati, mantenendo invariati grafica, dati, filtri esistenti, audio, gallerie e funzioni già funzionanti.

## 1. Ricerca per titolo senza perdita del cursore
- Stabilizzare il contenitore del campo di ricerca, che oggi viene ridefinito durante ogni aggiornamento dello stato e può quindi essere rimontato a ogni lettera.
- Conservare il campo controllato e l’aggiornamento immediato dei risultati.
- Verificare una parola completa digitata senza interruzioni e la combinazione in AND con anno, forma, supporto, genere, prezzo e colori.

## 2. Pulsazione desktop identica al mobile
- Prima della modifica, confrontare in preview gli stili calcolati su PC e mobile per timbro, ⓘ, Zen e Opzioni d’acquisto.
- Il CSS attuale disattiva `seal-pulse` quando il dispositivo segnala “movimento ridotto”; verificare se questa è la causa concreta sul PC.
- Applicare una sola regola condivisa ai quattro elementi richiesti, con ritmo e intensità identici a quelli già corretti su mobile.
- Lasciare “Significato dell’opera” completamente statico.
- Non modificare le altre animazioni del sito.

## 3. Modalità Meditazione su PC
- Verificare in browser desktop i valori reali di animazione e i fotogrammi intermedi di apertura/chiusura.
- Rendere il respiro desktop identico al mobile, senza modificare velocità, scala o comportamento mobile già approvati.
- Rendere affidabile la dissolvenza in due fasi: interfaccia → velo nero, quindi opera → visibile; sequenza inversa in uscita.
- Il passaggio tecnico al fullscreen nativo avverrà solo mentre il velo è già nero, così l’eventuale cambio istantaneo imposto dal browser non sarà visibile.
- Conservare ESC, movimento intenzionale del mouse, tap, proporzioni, limite alla risoluzione naturale e continuità audio.

## 4. Un solo pulsante Zen sempre raggiungibile
### Desktop
- Rimuovere Zen dalla barra strumenti fissa in alto nella colonna laterale.
- Inserire un unico controllo Zen nella zona delle miniature e renderlo `sticky` dentro la colonna che scorre, così segue la consultazione senza duplicarsi.
- Mantenere esattamente cerchio oro, bordo, dimensioni, simbolo e tooltip esistenti.

### Mobile
- Rimuovere Zen dalla barra strumenti inferiore.
- Collocare lo stesso unico controllo tra anno e fila delle miniature, come richiesto.
- Lasciare immutati cuore, segnalibro, ⓘ, download e condivisione.

## 5. Cambio immagine fluido su mobile
- Riprodurre il difetto su immagini con proporzioni differenti e misurare il cambio di dimensione del contenitore.
- Precaricare e decodificare l’immagine scelta prima dello scambio visivo.
- Evitare la sovrapposizione instabile di due immagini che oggi può cambiare temporaneamente altezza, generare bande e mostrare barre nere.
- Applicare il correttivo soltanto al layout mobile; il cambio immagine desktop, già corretto, non verrà alterato.
- Verificare più cambi consecutivi, inclusi file verticali e orizzontali e immagini non ancora presenti nella cache.

## Verifica conclusiva
- Controllo TypeScript e build di produzione.
- Test reale desktop e mobile della ricerca titolo, anche combinata con altri filtri.
- Confronto delle pulsazioni tramite stile calcolato e osservazione visiva; conferma esplicita che “Significato” non pulsa.
- Test desktop della Meditazione con acquisizioni durante entrata, respiro e uscita; controllo ESC e mouse.
- Test delle nuove posizioni Zen durante lo scorrimento delle miniature su PC e mobile.
- Test mobile del cambio immagine con rete/cache controllate, verificando assenza di bande, sfarfallii e ridimensionamenti transitori.

## Limiti e sicurezza
- Il fullscreen nativo del browser non espone un’animazione personalizzabile. È però possibile mascherarne il passaggio dietro il velo nero senza rinunciare al fullscreen reale.
- La modifica della pulsazione sarà circoscritta agli elementi richiesti. Se la causa è l’impostazione “movimento ridotto” del PC, verrà fatta un’eccezione soltanto per queste animazioni esplicitamente richieste, mantenendo le altre protezioni di accessibilità.
- Se la prova browser rivela una causa diversa da quelle osservabili nel codice, la correzione verrà adattata alla causa verificata senza ampliare l’intervento.
