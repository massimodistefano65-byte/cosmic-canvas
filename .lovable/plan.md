

## Pulizia residui Criticism

Il bottone Archive nel menu esiste già, corretto. Le modifiche riguardano solo la **sitemap** e i **file orfani**:

### Modifiche

1. **`public/sitemap.xml`** — Rimuovere la riga `/criticism`, aggiungere `/archive` con priority 0.7

2. **`scripts/generate-sitemap.ts`** — Sostituire `{ path: "/criticism", priority: "0.7" }` con `{ path: "/archive", priority: "0.7" }`

3. **Eliminare `src/pages/Criticism.tsx`** — file orfano, nessuna route lo usa più

4. **`src/lib/i18n.tsx`** — Rimuovere le 3 stringhe `criticism.*` non più usate

### Nient'altro viene toccato
- Archive, tab Critiche, dati in archiveData.ts → tutto resta com'è
- Menu navbar → già a posto

