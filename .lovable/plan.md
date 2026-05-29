## 1. Fix Newsletter (tasto "Iscriviti")

**File toccati:** `src/components/ContactSection.tsx`, `src/pages/Contact.tsx`

- Trasformo il blocco newsletter da `<div>` statico a `<form onSubmit>`.
- POST a `https://formspree.io/f/xpqyapgb` con body:
  - `email`: valore input
  - `_subject`: `"Nuova iscrizione newsletter"`
  - `type`: `"newsletter"` (campo extra per filtrare in Formspree)
- Stato locale `sending` / `sent` / `error` con feedback inline (riuso pattern già presente in `ContactSection`).
- Cambio testo bottone da **"ISCRIVITI"** → **"Segui il mio percorso creativo"** (in entrambe le occorrenze: `ContactSection` e `Contact.tsx`).
- Validazione email HTML5 (`type="email" required`) + `maxLength={255}`.

## 2. Sistema Like persistente (Lovable Cloud / Supabase)

**Attivazione Lovable Cloud** (necessaria per il database).

### Schema DB
Migration con una sola tabella `public.artwork_likes`:

```
id           uuid PK default gen_random_uuid()
discipline   text not null
artwork_id   text not null
device_id    text not null
created_at   timestamptz default now()
UNIQUE (discipline, artwork_id, device_id)
```

**RLS policies (pubbliche, niente auth):**
- `SELECT` a `anon` + `authenticated` → `USING (true)` (serve per leggere conteggi e classifica)
- `INSERT` a `anon` + `authenticated` → `WITH CHECK (true)`
- `DELETE` a `anon` + `authenticated` → `USING (true)` (per unlike — limitato logicamente dal `device_id` lato client)
- GRANT espliciti su tutti i ruoli secondo regole Data API.

### Hook `useArtworkLike(discipline, artworkId)`
**File nuovo:** `src/hooks/useArtworkLike.ts`

- Genera/recupera `device_id` (UUID v4) in `localStorage` chiave `mds_device_id`.
- Query iniziale: `liked` (esiste riga con quel device_id) + `count` totale.
- `toggle()`: insert o delete sulla riga (con `discipline + artwork_id + device_id`).
- Ottimistic update per UI istantanea.

### Integrazione UI
**File toccato:** `src/pages/ArtworkDetail.tsx`

- Sostituisco `useState(false)` con `useArtworkLike(discipline, artworkId)`.
- Mostro accanto al cuore il counter (`{count}`) — stile minimal coerente col tema.
- Entrambe le occorrenze del bottone Heart aggiornate.

## 3. Pagina pubblica `/classifica`

**File nuovi:** `src/pages/Classifica.tsx`, rotta aggiunta in `src/App.tsx` sopra il catch-all.

- Nessuna password, nessuna auth — stesso pattern di `/admin/artworks-status`.
- Query: aggrego `artwork_likes` per `(discipline, artwork_id)` con conteggio, ordinato DESC.
- Join lato client con `getArtworksByDiscipline()` per mostrare titolo + preview.
- Tabella con: posizione, preview thumb, titolo, disciplina, n° like.
- Link cliccabile a ogni opera (`/:discipline/:artworkId`).
- Navbar standard + SEO `noindex` (pagina di servizio).

## 4. Verifica conflitti scroll/musica

- Newsletter form: solo `fetch` async, nessun listener su window/scroll → zero impatto su fullPage.js o `AudioProvider`.
- Like: hook React isolato, solo chiamate Supabase → nessun listener globale.
- `/classifica` è pagina standard (no fullPage.js), come `/admin/artworks-status` → nessun conflitto.
- `useSectionAudio` non viene chiamato nella nuova pagina → musica non interferisce.

## Note tecniche

- Il `device_id` è anonimo, generato lato client. Non identifica la persona, solo il browser.
- Cancellando i dati del browser l'utente perde i suoi Like (accettabile per esperienza "senza frizione").
- RLS `DELETE USING (true)` è volutamente permissivo: chiunque potrebbe teoricamente cancellare like altrui via API diretta. Per un sito-portfolio è un trade-off accettabile; se in futuro vorrai blindarlo, si passa a edge function con verifica server-side del device_id.
- Link alla pagina `/classifica` **non** verrà aggiunto al menu Navbar (resta "nascosta" come `/admin/artworks-status`).
