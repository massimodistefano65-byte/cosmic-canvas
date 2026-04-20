/**
 * ═══════════════════════════════════════════════════════════════════
 *  GESTIONE OPERE — GUIDA DEFINITIVA
 * ═══════════════════════════════════════════════════════════════════
 *
 *  ── CONVENZIONE NOMI FILE (regola unica e rigorosa) ──────────
 *  Ogni file dell'opera DEVE seguire questo schema:
 *
 *    massimo-di-stefano-{slug}-{category}-{tipo}.{format}
 *
 *  Tipi:
 *    • preview            → thumbnail per la galleria
 *    • 1                  → immagine principale (main / full)
 *    • detail-1, detail-2 → dettagli ravvicinati
 *    • room-view-1, ...   → opera ambientata
 *
 *  Esempio:
 *    massimo-di-stefano-pensieri-in-evoluzione-painting-preview.jpg
 *    massimo-di-stefano-pensieri-in-evoluzione-painting-1.jpg
 *    massimo-di-stefano-pensieri-in-evoluzione-painting-detail-1.jpg
 *    massimo-di-stefano-pensieri-in-evoluzione-painting-room-view-1.jpg
 *
 *  ── COME AGGIUNGERE UN'OPERA ──────────────────────────────────
 *  1. Crea la cartella:  public/artworks/{categoria}/{slug}/
 *     Esempio:           public/artworks/painting/nebulosa-urbana/
 *
 *  2. Carica i file rispettando la convenzione qui sopra.
 *     Formato: .jpg (default) o .webp (specifica `format: "webp"`).
 *
 *  3. Aggiungi un blocco createArtwork({...}) nell'array della categoria.
 *
 *  ── TEMPLATE DA COPIARE ─────────────────────────────────────
 *
 *     createArtwork({
 *       slug: "titolo-in-minuscolo",   // identifica cartella, file e URL
 *       category: "painting",          // painting | photography | digital-art | t-shirt
 *       title: "Titolo Opera",
 *       year: "2024",
 *       dimensions: "100 × 50 cm",
 *       technique: "Tecnica mista su tela",
 *       price: "€ 1.500",              // opzionale
 *       details: 3,                     // numero di foto detail (0 se nessuna)
 *       roomViews: 2,                   // numero di foto room-view (0 se nessuna)
 *       format: "jpg",                  // opzionale: "jpg" (default) | "webp"
 *     }),
 *
 *  ── REGOLE ──────────────────────────────────────────────────
 *  • L'ID dell'opera coincide SEMPRE con lo slug (URL SEO-friendly).
 *  • Lo slug deve corrispondere al nome della cartella e dei file.
 *  • La categoria appare SEMPRE nel nome di OGNI file.
 *  • Categorie valide: painting, photography, digital-art, t-shirt.
 *  • Le opere senza file reali appaiono come placeholder colorati
 *    (gradiente generato dallo slug) — vedi src/lib/slugGradient.ts.
 *  • Per l'Archive usa il file separato: src/lib/archiveData.ts.
 *
 * ═══════════════════════════════════════════════════════════════════
 */

export interface ArtworkFullData {
  id: string;
  title: string;
  year: string;
  dimensions: string;
  technique: string;
  price?: string;
  preview: string;
  main: string;
  full: string;
  images: { url: string; label: string }[];
  /** True quando i file fisici esistono — entra in sitemap.xml */
  published: boolean;
}

/* ─── Helper: genera automaticamente i percorsi immagine ─── */

interface CreateArtworkInput {
  slug: string;
  category: string;
  title: string;
  year: string;
  dimensions: string;
  technique: string;
  price?: string;
  details?: number;
  roomViews?: number;
  format?: "jpg" | "webp";
  /** Imposta a true SOLO se i file immagine esistono fisicamente. Default: false. */
  published?: boolean;
}

function createArtwork(input: CreateArtworkInput): ArtworkFullData {
  const {
    slug,
    category,
    title,
    year,
    dimensions,
    technique,
    price,
    details = 0,
    roomViews = 0,
    format = "jpg",
    published = false,
  } = input;

  const dir = `/artworks/${category}/${slug}`;
  // Prefisso unico: include SEMPRE la categoria. Vale per ogni tipo di file.
  const base = `${dir}/massimo-di-stefano-${slug}-${category}`;
  const ext = format;

  const images: { url: string; label: string }[] = [];

  for (let i = 1; i <= roomViews; i++) {
    images.push({ url: `${base}-room-view-${i}.${ext}`, label: `Room View ${i}` });
  }
  for (let i = 1; i <= details; i++) {
    images.push({ url: `${base}-detail-${i}.${ext}`, label: `Dettaglio ${i}` });
  }

  return {
    id: slug, // ID === slug (URL SEO-friendly)
    title,
    year,
    dimensions,
    technique,
    price,
    preview: `${base}-preview.${ext}`,
    main: `${base}-1.${ext}`,
    full: `${base}-1.${ext}`,
    images,
    published,
  };
}

type DisciplineData = Record<string, ArtworkFullData[]>;

/* ═══════════════════════════════════════════════════════════════
 *  PAINTING
 * ═══════════════════════════════════════════════════════════════ */
const painting: ArtworkFullData[] = [
  createArtwork({
    slug: "pensieri-in-evoluzione",
    category: "painting",
    title: "Pensieri in Evoluzione - ok",
    year: "2024",
    dimensions: "100 × 50 cm",
    technique: "Tecnica mista su tela",
    details: 3,
    roomViews: 3,
    published: true,
  }),
  createArtwork({ slug: "nebulosa-urbana",       category: "painting", title: "Nebulosa Urbana",     year: "2024", dimensions: "80 × 60 cm",   technique: "Olio su tela" }),
  createArtwork({ slug: "frammenti-di-luce",     category: "painting", title: "Frammenti di Luce",   year: "2024", dimensions: "90 × 70 cm",   technique: "Acrilico su tela" }),
  createArtwork({ slug: "orizzonte-liquido",     category: "painting", title: "Orizzonte Liquido",   year: "2024", dimensions: "120 × 80 cm",  technique: "Tecnica mista" }),
  createArtwork({ slug: "materia-oscura",        category: "painting", title: "Materia Oscura",      year: "2023", dimensions: "100 × 100 cm", technique: "Olio su tela" }),
  createArtwork({ slug: "risonanza-cromatica",   category: "painting", title: "Risonanza Cromatica", year: "2023", dimensions: "80 × 60 cm",   technique: "Acrilico su tela" }),
];

/* ═══════════════════════════════════════════════════════════════
 *  PHOTOGRAPHY
 * ═══════════════════════════════════════════════════════════════ */
const photography: ArtworkFullData[] = [
  createArtwork({ slug: "silenzio-metropolitano", category: "photography", title: "Silenzio Metropolitano", year: "2024", dimensions: "60 × 40 cm", technique: "Stampa Fine Art" }),
  createArtwork({ slug: "riflessi-dacqua",        category: "photography", title: "Riflessi d'Acqua",       year: "2024", dimensions: "50 × 50 cm", technique: "Stampa Fine Art" }),
  createArtwork({ slug: "geometrie-naturali",     category: "photography", title: "Geometrie Naturali",     year: "2024", dimensions: "60 × 40 cm", technique: "Stampa Fine Art" }),
  createArtwork({ slug: "luce-radente",           category: "photography", title: "Luce Radente",           year: "2023", dimensions: "70 × 50 cm", technique: "Stampa Fine Art" }),
  createArtwork({ slug: "ombre-lunghe",           category: "photography", title: "Ombre Lunghe",           year: "2023", dimensions: "60 × 40 cm", technique: "Stampa Fine Art" }),
  createArtwork({ slug: "istante-sospeso",        category: "photography", title: "Istante Sospeso",        year: "2023", dimensions: "50 × 50 cm", technique: "Stampa Fine Art" }),
];

/* ═══════════════════════════════════════════════════════════════
 *  DIGITAL ART
 * ═══════════════════════════════════════════════════════════════ */
const digitalArt: ArtworkFullData[] = [
  createArtwork({ slug: "pixel-cosmico",        category: "digital-art", title: "Pixel Cosmico",        year: "2024", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ slug: "glitch-armonico",      category: "digital-art", title: "Glitch Armonico",      year: "2024", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ slug: "dimensione-parallela", category: "digital-art", title: "Dimensione Parallela", year: "2024", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ slug: "codice-visivo",        category: "digital-art", title: "Codice Visivo",        year: "2023", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ slug: "sintesi-digitale",     category: "digital-art", title: "Sintesi Digitale",     year: "2023", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ slug: "realta-aumentata",     category: "digital-art", title: "Realtà Aumentata",     year: "2023", dimensions: "Digitale", technique: "Digital Art" }),
];

/* ═══════════════════════════════════════════════════════════════
 *  T-SHIRT
 * ═══════════════════════════════════════════════════════════════ */
const tShirt: ArtworkFullData[] = [
  createArtwork({ slug: "nebula-wear",     category: "t-shirt", title: "Nebula Wear",     year: "2024", dimensions: "Varie taglie", technique: "Serigrafia" }),
  createArtwork({ slug: "cosmic-print",    category: "t-shirt", title: "Cosmic Print",    year: "2024", dimensions: "Varie taglie", technique: "Stampa digitale" }),
  createArtwork({ slug: "urban-galaxy",    category: "t-shirt", title: "Urban Galaxy",    year: "2024", dimensions: "Varie taglie", technique: "Serigrafia" }),
  createArtwork({ slug: "abstract-flow",   category: "t-shirt", title: "Abstract Flow",   year: "2024", dimensions: "Varie taglie", technique: "Stampa digitale" }),
  createArtwork({ slug: "stellar-edition", category: "t-shirt", title: "Stellar Edition", year: "2023", dimensions: "Varie taglie", technique: "Serigrafia" }),
  createArtwork({ slug: "dark-matter",     category: "t-shirt", title: "Dark Matter",     year: "2023", dimensions: "Varie taglie", technique: "Stampa digitale" }),
];

/* ═══════════════════════════════════════════════════════════════ */

const data: DisciplineData = {
  painting,
  photography,
  "digital-art": digitalArt,
  "t-shirt": tShirt,
};

export function getArtworksByDiscipline(discipline: string): ArtworkFullData[] {
  return data[discipline] || [];
}

export function getArtwork(discipline: string, artworkId: string): ArtworkFullData | undefined {
  return data[discipline]?.find((a) => a.id === artworkId);
}
