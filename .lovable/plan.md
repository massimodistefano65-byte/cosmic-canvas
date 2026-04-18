

# Piano: Guida definitiva, validatori e sincronizzazione SEO

## Obiettivi

1. Riscrivere `GUIDA-GESTIONE-OPERE.md` allineata al sistema attuale (ID=slug, `createArtwork`, `format`, regola unica nomi file).
2. Aggiungere validatori automatici per percorsi/opere.
3. Pannello stato opere accessibile in dev/admin.
4. Aggiornare sitemap e meta tag con i nuovi slug.
5. Fornire schemi TypeScript copy-paste per ogni sezione (Painting/Photo/Digital/T-Shirt, Archive video/mostre/materiali/critiche/altri progetti, Blog, Hero/Home).

## 1. Guida `GUIDA-GESTIONE-OPERE.md` (riscrittura completa)

Sezioni:
- **Regola d'oro**: `id === slug`, file `massimo-di-stefano-{slug}-{category}-{tipo}.{format}`
- **Aggiungi opera**: 3 step (cartella → upload immagini → blocco `createArtwork`)
- **Rimuovi / Riordina / Modifica prezzo**: istruzioni passo-passo
- **Una sezione per disciplina** (Painting, Photography, Digital Art, T-Shirt) con esempio reale
- **Archive**: come aggiungere mostra, video YouTube, materiale scaricabile, critica, altro progetto
- **Home (Hero + schede discipline)**: dove modificare immagine hero (`public/images/hero-background.jpg`), cover delle 4 schede (`public/images/cover-home-*.jpg`), sottotitoli (in `src/lib/i18n.tsx`)
- **Blog**: come aggiungere articoli in `src/lib/blogData.ts`
- **Sitemap & SEO**: comando `npx tsx scripts/generate-sitemap.ts`, dove modificare titoli/descrizioni (`SEOHead` + `DisciplinePage`)
- **Pannello validazione**: come accedere a `/admin/artworks-status`
- **Troubleshooting**: immagine non si vede → checklist (cartella corretta, nome file, slug coincide, format giusto)

## 2. Schemi TypeScript copy-paste (in guida + commento file)

```ts
// OPERA (artworkData.ts)
createArtwork({
  slug: "titolo-opera",
  category: "painting",       // painting | photography | digital-art | t-shirt
  title: "Titolo Opera",
  year: "2025",
  dimensions: "100 × 80 cm",
  technique: "Olio su tela",
  price: "€ 1.500",           // opzionale
  details: 3,                  // 0 se nessuno
  roomViews: 2,                // 0 se nessuno
  format: "jpg",               // "jpg" | "webp"
}),

// MOSTRA / VIDEO / MATERIALE / CRITICA / PROGETTO (archiveData.ts)
// → tutti gli schemi nella guida
```

## 3. Validatore percorsi opere (build-time)

Nuovo file: `scripts/validate-artworks.ts`
- Legge `artworkData.ts`
- Per ogni opera verifica esistenza fisica di: `preview`, `main`, ogni `images[].url`
- Stampa report colorato: ✅ OK / ⚠️ placeholder (nessuna immagine) / ❌ percorso rotto (mismatch)
- Rileva file orfani in `public/artworks/` non referenziati
- Esecuzione: `npx tsx scripts/validate-artworks.ts`

## 4. Pannello stato opere (in-app)

Nuovo file: `src/pages/AdminArtworksStatus.tsx` (route `/admin/artworks-status`, non linkata in nav).
- Tabella per ogni disciplina: slug, titolo, stato preview, stato main, conteggio details/room-views, anno, prezzo
- Status calcolato runtime con `<img onLoad/onError>` → 🟢 OK, 🟡 placeholder, 🔴 broken
- Filtri per disciplina + ricerca per slug
- Conteggi totali in header (totale opere, con immagini, placeholder, errori)
- Stile coerente col sito (dark/cosmic)
- Aggiungo route in `src/App.tsx`

## 5. Sincronizzazione SEO

### Sitemap
- Riscrivo `public/sitemap.xml` con tutti gli URL slug attuali (Pensieri in Evoluzione + le altre placeholder vengono escluse perché senza `preview` reale)
- Aggiorno `scripts/generate-sitemap.ts` se necessario (oggi filtra per `a.preview || a.main` → ora tutte hanno path generati anche se file mancante; correggo per filtrare quelle realmente pubblicate, ad esempio aggiungendo flag `published?: boolean` o controllando esistenza file → opto per: aggiungere parametro opzionale `published?: boolean` in `createArtwork` con default `false`, attivato solo per opere con file reali → `pensieri-in-evoluzione: published: true`)

### Meta tag
- Verifico `SEOHead` (già OK)
- Aggiorno `ArtworkDetail` per usare slug nel canonical: `/painting/pensieri-in-evoluzione`
- Verifico che JSON-LD `VisualArtwork` in `DisciplinePage` usi gli URL slug (già OK)

## 6. File modificati / creati

| File | Azione |
|------|--------|
| `GUIDA-GESTIONE-OPERE.md` | Riscrittura completa |
| `src/lib/artworkData.ts` | Aggiungo flag `published` opzionale; aggiorno commento guida |
| `scripts/validate-artworks.ts` | Nuovo: validatore CLI |
| `scripts/generate-sitemap.ts` | Aggiorno filtro su `published` |
| `src/pages/AdminArtworksStatus.tsx` | Nuovo: pannello in-app |
| `src/App.tsx` | Aggiungo route `/admin/artworks-status` |
| `public/sitemap.xml` | Rigenero con slug corretti |
| `src/pages/ArtworkDetail.tsx` | Verifica canonical SEO con slug (se non già OK) |

## Risultato

Avrai: una guida unica e definitiva, schemi pronti per copia-incolla per ogni tipo di contenuto, due strumenti di controllo (CLI + pannello UI) per individuare al volo immagini mancanti o percorsi rotti, e SEO/sitemap perfettamente allineati al sistema slug.

