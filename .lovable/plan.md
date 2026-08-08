# Fix definitivo cover Home su iPad

## Diagnosi confermata

- Le quattro cover presenti in `public/images` sono file WebP validi; non esistono le corrispondenti versioni JPEG.
- `Index.tsx` passa percorsi `.jpg`, mentre `StackedSection.tsx` genera un CSS `image-set()` WebP/JPEG.
- Questa combinazione dipende dal supporto Safari alla sintassi `image-set(... type(...))`: su iPad la dichiarazione può essere scartata interamente, lasciando visibile soltanto il gradiente placeholder. Il fallback temporizzato già aggiunto non risolve perché attiva il contenitore, ma non rende valida l'immagine CSS.

## Intervento

1. Aggiornare i quattro riferimenti della Home affinché puntino direttamente ai file `.webp` realmente presenti.
2. In `StackedSection.tsx`, sostituire lo sfondo CSS `image-set()` con un elemento `<img>` nativo a piena sezione, mantenendo invariati ritaglio `cover`, posizione centrale, parallax/zoom e overlay.
3. Rendere il caricamento indipendente da `IntersectionObserver` e dall'evento fullPage: le quattro cover sono leggere e possono essere montate subito, eliminando il ramo fragile specifico di Safari/iPad.
4. Verificare la Home in formato iPad verticale e orizzontale, controllando tutte e quattro le sezioni e l'assenza di errori di caricamento.

## Ambito

Solo caricamento e visualizzazione delle quattro cover Home. Nessuna modifica a Hero, navbar, frecce, contenuti, routing o audio.