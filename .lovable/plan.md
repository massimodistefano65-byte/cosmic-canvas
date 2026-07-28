## Obiettivo
Completare l'esperienza bilingue IT/EN, uniformare lo stile dei contatti, aggiungere tooltip social, gestire i campi dinamici EN e inserire una AI Summary minimale orientata ai motori di ricerca.

## 1. Internazionalizzazione integrale (IT/EN)

Aggiungo le chiavi mancanti in `src/lib/i18n.tsx` e le collego ai componenti:

- **Opzioni d'acquisto** (`ArtworkDetail.tsx`): etichetta del tasto tradotta; in EN carico `purchase-en.md` con fallback su `purchase.md`.
- **Modulo Richiesta Informazioni** (`InfoRequestDialog.tsx`): titolo, sottotitolo, label Nome/Email/Messaggio, tasto Invia, opzioni del menù (Acquisto/Esposizione/Collaborazione/Stampa/Licensing), messaggi di successo ed errore.
- **Filtri** (`FilterPanel.tsx`): Anno, Colore, Forma, Genere, Supporto, Prezzo, nomi colori, chip, Applica/Reset.
- **Newsletter** (`NewsletterSection.tsx`, `ContactSection.tsx`): placeholder email e testo del pulsante.
- **Archivio** (`Archive.tsx`, `MostreIndex.tsx`): sottotitolo e titoli delle card. Gli URL restano invariati per non rompere sitemap e link esistenti.
- **Tooltip barra azioni** (`ArtworkDetail.tsx`): Mi piace / Preferiti / Info / PDF / Condividi tradotti.

## 2. Dati dinamici EN nella pagina opera

In `ArtworkDetail.tsx` (e dove serve nella scheda tecnica) leggo `priceEn` e `dimensionsEn` quando la lingua è EN, con fallback ai campi italiani se il valore è vuoto. Aggiungo i due campi al tipo in `src/lib/artworkData.ts` se non già presenti, così lo script di popolamento resta compatibile. Stessa logica applicata al PDF opera e al certificato, per coerenza linguistica.

## 3. Restyling grafico sezione contatti

In `ContactSection.tsx` e `Contact.tsx` applico a input, textarea, select e pulsanti lo stile dei pop-up avorio (`#FDFCF0`, testo `#1A1A1A`, bordi sottili, focus oro), mantenendo intatta la logica Formspree.

## 4. Tooltip icone social

Tooltip su Linktree, X, Facebook, Instagram in fondo alla Home e nella pagina Contatti, usando il componente tooltip già in uso.

## 5. AI Summary Card (minimale, orientata ai motori)

- **Principalmente nei metadati**: arricchisco il JSON-LD `Person` della pagina Bio con `description`, `jobTitle`, `knowsAbout`, `nationality`, `sameAs` (social) e `alumniOf`/`worksFor` se applicabile — così assistenti AI e motori leggono un profilo strutturato completo.
- **Riquadro visibile minimale**: in fondo alla pagina Bio, un blocco discreto (bordo sottile, nessuna immagine, 3-4 righe) intitolato "Chi è Massimo Di Stefano / About Massimo Di Stefano" con un riassunto professionale sintetico, bilingue. Nessun impatto sul layout esistente, nessun elemento pesante.

## Note tecniche

Nessuna modifica a fullPage.js, scroll restoration, rotte o database. Tutti i markdown EN mancanti hanno fallback italiano.