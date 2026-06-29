## 1. Performance Home — WebP con fallback JPG (zero impatto estetico)

Le 5 immagini Home passano a WebP via `<picture>` con fallback JPG. Nessuna modifica a:
- Ken Burns / zoom lentissimo (resta `scale: [1, 1.07]`, duration 22s, easeInOut)
- timing di fade-in (0.6s / 0.3s revisit invariati)
- parallax cover (`top: -25%`, `height: 150%` invariati)
- hover zoom 1.04 / cubic-bezier
- gradient overlay, vignette, alt text

### HeroSection.tsx
`<img>` di sfondo sostituito con `<picture>`:
```tsx
<picture>
  <source srcSet="/images/hero-background.webp" type="image/webp" />
  <img src="/images/hero-background.jpg" alt="..." className="w-full h-full object-cover" fetchPriority="high" />
</picture>
```

### StackedSection.tsx
`backgroundImage` con `image-set()` + fallback:
```tsx
backgroundImage: `image-set(url(${coverWebp}) type("image/webp"), url(${coverJpg}) type("image/jpeg"))`,
```
`Index.tsx` passa entrambi i path. Timing/scale/transition invariati.

### index.html
```html
<link rel="preload" as="image" href="/images/hero-background.webp" type="image/webp" fetchpriority="high" />
```

File richiesti su Aruba: `hero-background.webp` + `cover-home-{painting,photography,digital-art,t-shirt}.webp`. I JPG restano come safety net.

## 2. Sigillo d'autenticità — oro + riga intera cliccabile

In `ArtworkDetail.tsx` la riga "Prezzo: Collezione privata" + `Stamp` diventa un `<button>` full-width:
- `Stamp` colorato `text-[#d4af7a]` con leggero `drop-shadow` dorato
- hover: sfondo `rgba(212,175,122,0.06)`
- aria-label "Verifica autenticità — Collezione privata"
- click ovunque sulla riga apre `CertificateDialog`

## 3. T-shirt — tecnica dinamica

Le schede T-shirt leggono sempre `{artwork.technique}` dal data layer (stesso pattern delle altre discipline). Colonna TECNICA dell'Excel = unica fonte di verità.

## 4. Coerenza visiva opere vendute

```ts
const isSold = artwork.price?.trim().toLowerCase() === "collezione privata";
```
Se `isSold`: bottone "Opzioni d'acquisto" non renderizzato. Resta solo "Collezione privata" + sigillo oro cliccabile.

## 5. Dediche private — sbloccate dal codice certificato

- `ArtworkFullData` + `CreateArtworkInput`: campo opzionale `dedication?: string`
- `CertificateDialog`: dopo inserimento corretto dell'`archiveId`, appare blocco "Dedica del Maestro" con `artwork.dedication`, corsivo Cormorant, bordo dorato sottile, firma "— Massimo Di Stefano"
- Se `dedication` non impostato: esperienza identica a oggi. Nessun secondo codice.

## 6. SEO — consolidamento identità "Massimo Di Stefano artista"

Tono concordato: professionale, semanticamente forte, NIENTE "cosmico/visionario/poetico" nei title/meta/JSON-LD.

### 6a. Title sitewide + Home
```html
<title>Massimo Di Stefano — Artista Visivo | Pittura, Fotografia, Arte Digitale</title>
<meta name="description" content="Sito ufficiale di Massimo Di Stefano, artista visivo italiano. Pittura contemporanea, fotografia artistica, arte digitale e progetti d'autore." />
```
Stesso title in `SEOHead` di `Index.tsx`.

### 6b. JSON-LD Person in index.html
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Massimo Di Stefano",
  "alternateName": "Massimo Di Stefano artista",
  "jobTitle": "Artista Visivo",
  "description": "Artista visivo contemporaneo italiano. Pittura, fotografia artistica e arte digitale.",
  "url": "https://www.massimodistefano.com",
  "image": "https://www.massimodistefano.com/images/og-image.jpg",
  "nationality": "Italian",
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Visual Artist",
    "occupationalCategory": "27-1013 Fine Artists"
  },
  "knowsAbout": ["Pittura contemporanea", "Fotografia artistica", "Arte digitale", "Arte visiva contemporanea"]
}
```
Lo schema `WebSite` di `Index.tsx` resta, description allineata.

### 6c. Title pattern per route (tono sobrio + keyword semantiche forti)

Pagine sezione:
- Home: `Massimo Di Stefano — Artista Visivo | Pittura, Fotografia, Arte Digitale`
- Painting: `Pittura contemporanea — Massimo Di Stefano artista visivo`
- Photography: `Fotografia artistica — Massimo Di Stefano`
- Digital Art: `Arte digitale — Massimo Di Stefano artista contemporaneo`
- T-Shirt: `T-shirt d'artista — Wearable Art | Massimo Di Stefano`
- Bio: `Biografia — Massimo Di Stefano, artista visivo italiano`
- Archive: `Archivio — Mostre, critiche e percorso espositivo | Massimo Di Stefano`

**Opere singole — nuovo pattern con keyword semantica per disciplina** (rafforza ricerca Google):

| Disciplina | Pattern title |
|---|---|
| painting | `{Titolo} ({Anno}) — pittura contemporanea di Massimo Di Stefano` |
| photography | `{Titolo} ({Anno}) — fotografia artistica di Massimo Di Stefano` |
| digital-art | `{Titolo} ({Anno}) — arte digitale di Massimo Di Stefano` |
| t-shirt | `{Titolo} ({Anno}) — t-shirt d'artista di Massimo Di Stefano` |

Mappa centralizzata in `ArtworkDetail.tsx` (`disciplineSeoLabel`), così resta unica fonte e modificabile in un punto solo.

Meta description opere: 1-2 frasi sobrie con titolo + tecnica + dimensioni + "opera di Massimo Di Stefano, artista visivo".

### 6d. Verifica tecnica
- Un solo `<h1>` per pagina (verifico Index, Bio, Discipline, ArtworkDetail, Archive)
- `canonical` self-reference su ogni route (già gestito da `SEOHead`)
- `og:image` ≥ 1200×630 (resta `og-image.jpg`)
- `robots.txt` invariato, `sitemap.xml` rigenerato dallo script esistente
- `lang="it"` su `<html>` confermato
- Alt text descrittivi su immagini Home

## 7. Aggiornamento `GUIDA-GESTIONE-OPERE.md`

Nuove sezioni:
- **Dediche private**: colonna DEDICA, appare nel certificato dopo verifica codice
- **Tecnica T-shirt**: pienamente dinamica dalla colonna TECNICA
- **WebP Home**: nomi file richiesti, fallback JPG come safety net
- **SEO title pattern**: pattern per pagine + pattern per opere singole con keyword semantica per disciplina

## File toccati (sintesi)

- `index.html` (title, meta, JSON-LD Person, preload webp)
- `src/components/HeroSection.tsx` (`<picture>`)
- `src/components/StackedSection.tsx` (`image-set`)
- `src/pages/Index.tsx` (coverImageWebp + SEO title/desc)
- `src/pages/ArtworkDetail.tsx` (sigillo cliccabile, hide acquisto se Collezione privata, dedica, title con keyword per disciplina)
- `src/components/CertificateDialog.tsx` (sblocco dedica dopo codice)
- `src/lib/artworkData.ts` (`dedication?`)
- `src/pages/{Painting,Photography,DigitalArt,TShirt,Bio,Archive}.tsx` + sotto-archivio (title/desc SEO)
- `GUIDA-GESTIONE-OPERE.md`

Nessuna modifica a: virtualizzazione, audio crossfade, scroll restoration, animazioni Hero/Stacked, layout esistente. Bollino NEW annullato come richiesto.