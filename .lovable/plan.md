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

## Freccia di scorrimento su iPad

Le frecce delle card usano già le stesse classi in tutte le sezioni, quindi la sparizione nelle ultime tre sezioni dipende dall'altezza effettiva della sezione su iPad (barre del browser e calcolo `100vh`/`100%` di fullPage), non da valori diversi per sezione. Intervento:

1. Ancorare la freccia a un offset sicuro calcolato sull'altezza reale della sezione, invece che a un `bottom` fisso pensato per il desktop, così l'elemento resta dentro l'area visibile su tablet.
2. Uniformare l'altezza della freccia tra Hero e le quattro card, così da avere la stessa posizione percepita in tutta la Home.
3. Mantenere l'area di tocco di 48px e l'animazione di rimbalzo esistenti.
4. Verificare su iPad verticale e orizzontale che la freccia sia visibile e cliccabile in tutte e cinque le sezioni.

## Ambito

Caricamento e visualizzazione delle quattro cover Home e posizione della freccia di scorrimento. Nessuna modifica a contenuti, navbar, routing o audio.
