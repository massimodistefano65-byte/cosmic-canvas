# Piano: Frecce scroll Home + Favicon Google

## 1. Frecce animate in fondo alle sezioni Home

In `src/components/StackedSection.tsx` aggiungo, in fondo al contenitore, la stessa freccetta `ChevronDown` animata della Hero (rimbalzo verticale infinito, posizionata in basso al centro).

- Riuso `lucide-react` `ChevronDown` + `motion.button` con `animate={{ y: [0, 12, 0] }}` e `transition={{ duration: 2, repeat: Infinity }}`.
- Click → scrolla alla sezione successiva tramite l'API di fullPage.js: `window.fullpage_api?.moveSectionDown()`.
- Nuova prop opzionale `isLast?: boolean` su `StackedSection`. In `src/pages/Index.tsx` passo `isLast={index === sections.length - 1}` solo per non duplicare la freccia se necessario — comunque la mostro su tutte e 4 le sezioni discipline (anche l'ultima porta alla Contact section, quindi ha senso).
- Stile coerente con Hero: `text-muted-foreground hover:text-accent`, `bottom-8 left-1/2 -translate-x-1/2 z-20`.

## 2. Favicon corretta su Google

Problema: `public/favicon.ico` esiste ancora ed è probabilmente l'icona Lovable di default. Google preferisce `favicon.ico` o icone dichiarate in `manifest.json` con dimensioni 48×48+. Mancano inoltre tag espliciti per dimensioni multiple.

Interventi:

**a)** Sostituisco `public/favicon.ico` copiando `favicon-occhio.png` come nuovo `favicon.ico` (Google e i browser leggono comunque il PNG anche con estensione .ico nei contesti moderni; in ogni caso l'attuale `.ico` Lovable va rimosso). In alternativa elimino il file e mi affido ai tag `<link rel="icon">`.

**b)** Creo `public/site.webmanifest` con:
```json
{
  "name": "Massimo Di Stefano",
  "short_name": "MDS",
  "icons": [
    { "src": "/favicon-occhio.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon-occhio.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0a0a0a",
  "background_color": "#0a0a0a",
  "display": "standalone"
}
```

**c)** Aggiorno `index.html` con icone con sizes esplicite (richieste da Google per i risultati di ricerca):
```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-occhio.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-occhio.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-occhio.png" />
<link rel="manifest" href="/site.webmanifest" />
```

Nota: Google ricalcola la favicon nei risultati a ogni nuovo crawl (può richiedere giorni/settimane dopo il deploy). Posso opzionalmente segnalarti come forzare il re-crawl da Search Console.

## File modificati / creati

| File | Modifica |
|---|---|
| `src/components/StackedSection.tsx` | Aggiunta freccia `ChevronDown` animata in fondo |
| `src/pages/Index.tsx` | (eventuale) prop `isLast` |
| `index.html` | Tag favicon completi con `sizes` + link al manifest |
| `public/favicon.ico` | Sostituito (copia di `favicon-occhio.png`) |
| `public/site.webmanifest` | Nuovo file |

## Risultato

Tutte le sezioni Home avranno la stessa freccia rimbalzante della Hero che invita a scorrere. Google avrà icone dichiarate correttamente in tutte le dimensioni richieste e un manifest valido, eliminando il fallback all'icona Lovable nei risultati di ricerca dopo il prossimo crawl.