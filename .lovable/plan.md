# Fix visualizzazione su iPad (tablet)

Tre anomalie, tutte legate al breakpoint tablet e al lazy-load delle cover.

## 1. Navbar: usare il menu hamburger anche su iPad

Oggi la navbar passa da mobile a desktop a 768px (`md:`). L'iPad in verticale è largo 768–834px, quindi mostra la barra desktop con 8 voci + lingua + audio: le voci si comprimono, "Contacts" viene tagliato e i pulsanti IT/EN e audio finiscono fuori campo.

- Alzare la soglia del menu esteso da `md:` a `lg:` (1024px) in `Navbar.tsx`: sotto 1024px si vede l'hamburger con lingua e audio accanto, come su smartphone.
- Nel menu a tendina mobile/tablet restano tutte le voci, incluse Home e Contacts.
- Il menu resta sempre visibile su dispositivi touch (auto-hide solo con mouse), come già previsto.

## 2. Cover delle sezioni Home non caricate

Le immagini delle card (Painting, Photography, Digital Art, T-Shirt) vengono caricate solo quando l'IntersectionObserver rileva la sezione. Con fullPage.js le sezioni sono traslate fuori dal viewport e su iPad l'osservatore non scatta mai: resta il gradiente placeholder.

- In `StackedSection.tsx` rimuovere la dipendenza dall'IntersectionObserver come unica condizione: caricare la cover anche quando la sezione diventa attiva (evento `fullpage-section` già emesso dalla Home) e in ogni caso con un fallback dopo il primo render.
- Le immagini restano WebP con fallback JPEG, quindi le prestazioni non peggiorano in modo sensibile.

## 3. Freccia di scorrimento tagliata

La freccia è a `bottom-20` sotto 768px e `bottom-8` sopra: su iPad usa il valore desktop, troppo basso rispetto alla barra del browser.

- Introdurre un valore intermedio per il tablet (freccia più alta, circa `bottom-16` fino a 1024px, `bottom-8` da desktop) e mantenere l'area di tocco di 48px, sia nelle card Home sia nella Hero, per coerenza.

## Note tecniche

File toccati: `src/components/Navbar.tsx`, `src/components/StackedSection.tsx`, `src/components/HeroSection.tsx` (solo posizione freccia). Nessuna modifica a contenuti, routing, audio o dati delle opere. Verifica finale con screenshot a 820x1180 (iPad verticale) e 1180x820 (orizzontale).
