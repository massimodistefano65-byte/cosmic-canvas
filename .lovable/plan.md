

# Piano: Logica admin, workflow, performance, SEO finale

## 1. Logica pallini `/admin/artworks-status`

In `AdminArtworksStatus.tsx`, `StatusDot` riceverà anche `published`. Stato:
- 🟢 verde: immagine carica
- 🟡 giallo: immagine fallisce **e** `published === false` (placeholder/bozza)
- 🔴 rosso: immagine fallisce **e** `published === true` (errore critico)

Aggiorno conteggi header: Totale / Pubblicate OK / Bozze (gialle) / Errori critici (rossi).

## 2. Workflow Branch + StackBlitz

**Conferma compatibilità:** Sì, il workflow è sicuro. La sync Lovable↔GitHub opera sul branch principale collegato (di default `main`). Lavorare su un branch separato (es. `aggiunta-opere`) è isolato: Lovable non vede né tocca quel branch finché non viene mergiato in `main`. StackBlitz può aprire qualsiasi branch via URL `stackblitz.com/github/{user}/{repo}/tree/{branch}` e fa preview in sandbox isolata.

**Unica accortezza:** mentre lavori sul branch esterno, non fare modifiche in parallelo dentro Lovable, altrimenti al merge potresti avere conflitti su `artworkData.ts`. Regola: o lavori in Lovable, o lavori sul branch — mai entrambi insieme.

Aggiorno `GUIDA-GESTIONE-OPERE.md` con nuova sezione **"Metodo di lavoro consigliato"** che descrive i 4 step (branch → upload → test StackBlitz → PR/merge) e la regola anti-conflitto.

## 3. Performance e Social

**Lazy loading:** aggiungo `loading="lazy"` e `decoding="async"` a tutte le `<img>` in `GalleryGrid.tsx` e `ArtworkDetail.tsx` (escluse le immagini above-the-fold tipo hero/main → `loading="eager"` per LCP).

**OpenGraph dinamico in `ArtworkDetail.tsx`:** verifico `SEOHead` e mi assicuro che riceva `ogImage` = URL assoluto della `main` dell'opera corrente, `ogTitle` = titolo opera, `ogDescription` = `{technique} · {year} · {dimensions}`. Se `SEOHead` non supporta `ogImage`, lo estendo.

**Sitemap Archive:** aggiorno `scripts/generate-sitemap.ts` per includere anche gli elementi di `archiveData.ts` con flag `published: true` (mostre, video, progetti). Aggiungo flag `published?: boolean` agli schemi archive dove non esiste, default `false`. Rigenero `public/sitemap.xml`.

## 4. Pulizia finale

- Cerco residui di ID numerici (`/painting/1`, `id: "1"`, ecc.) in tutto il codice e li rimuovo
- Verifico `archiveData.ts`: gli `id: "1"` interni di mostre/video sono OK (sono chiavi React, non URL pubblici) → li lascio
- Confermo che `GUIDA-GESTIONE-OPERE.md` resti l'unica fonte di verità: rimuovo eventuali riferimenti obsoleti e aggiungo nota in testa "Documento autoritativo"

## File modificati

| File | Modifica |
|------|----------|
| `src/pages/AdminArtworksStatus.tsx` | Logica pallini giallo/rosso basata su `published` |
| `src/components/GalleryGrid.tsx` | `loading="lazy"` + `decoding="async"` |
| `src/pages/ArtworkDetail.tsx` | Lazy loading immagini secondarie + OG dinamico |
| `src/components/SEOHead.tsx` | Supporto `ogImage` se mancante |
| `src/lib/archiveData.ts` | Flag `published?: boolean` opzionale dove serve |
| `scripts/generate-sitemap.ts` | Include archive items pubblicati |
| `public/sitemap.xml` | Rigenerata |
| `GUIDA-GESTIONE-OPERE.md` | Nuova sezione workflow + nota fonte di verità |

## Risultato

Pannello admin con semantica chiara (giallo = bozza, rosso = errore reale), workflow di lavoro a prova di rottura, performance ottimizzata per centinaia di immagini, social sharing corretto, sitemap completa di tutto il contenuto pubblicato.

