/**
 * ═══════════════════════════════════════════════════════════════════
 *  GESTIONE OPERE — GUIDA RAPIDA
 * ═══════════════════════════════════════════════════════════════════
 *
 *  ── COME AGGIUNGERE UN'OPERA ──────────────────────────────────
 *  1. Crea la cartella:  public/artworks/{categoria}/{slug}/
 *     Esempio:           public/artworks/painting/nebulosa-urbana/
 *
 *  2. Carica i file immagine con questa convenzione:
 *     • PREVIEW:   massimo-di-stefano-{slug}-{categoria}-preview.jpg
 *     • MAIN:      massimo-di-stefano-{slug}-{categoria}-1.jpg
 *     • DETTAGLI:  massimo-di-stefano-{slug}-{categoria}-detail-1.jpg, -detail-2.jpg …
 *     • ROOM VIEW: massimo-di-stefano-{slug}-{categoria}-room-view-1.jpg …
 *
 *  3. Aggiungi un blocco createArtwork({...}) nell'array della categoria.
 *     I percorsi vengono calcolati automaticamente!
 *
 *  ── TEMPLATE DA COPIARE ─────────────────────────────────────
 *
 *     createArtwork({
 *       id: "NUMERO",
 *       slug: "titolo-in-minuscolo",
 *       category: "painting",          // painting | photography | digital-art | t-shirt
 *       title: "Titolo Opera",
 *       year: "2024",
 *       dimensions: "100 × 50 cm",
 *       technique: "Tecnica mista su tela",
 *       price: "€ 1.500",              // opzionale, ometti se non vuoi mostrarlo
 *       details: 3,                     // numero di foto detail (0 se nessuna)
 *       roomViews: 2,                   // numero di foto room-view (0 se nessuna)
 *     }),
 *
 *  ── REGOLE ──────────────────────────────────────────────────
 *  • L'ID deve essere unico dentro ogni disciplina.
 *  • Lo slug deve corrispondere al nome della cartella e dei file.
 *  • Se details o roomViews sono 0, non vengono generati percorsi extra.
 *  • Le categorie valide sono: painting, photography, digital-art, t-shirt
 *  • Per l'Archive usa il file separato: src/lib/archiveData.ts
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
}

/* ─── Helper: genera automaticamente i percorsi immagine ─── */

interface CreateArtworkInput {
  id: string;
  slug: string;
  category: string;
  title: string;
  year: string;
  dimensions: string;
  technique: string;
  price?: string;
  details?: number;
  roomViews?: number;
}

function createArtwork(input: CreateArtworkInput): ArtworkFullData {
  const { id, slug, category, title, year, dimensions, technique, price, details = 0, roomViews = 0 } = input;
  const base = `/artworks/${category}/${slug}/massimo-di-stefano-${slug}-${category}`;

  const images: { url: string; label: string }[] = [];

  for (let i = 1; i <= roomViews; i++) {
    images.push({ url: `${base}-room-view-${i}.jpg`, label: `Room View ${i}` });
  }
  for (let i = 1; i <= details; i++) {
    images.push({ url: `${base}-detail-${i}.jpg`, label: `Dettaglio ${i}` });
  }

  return {
    id,
    title,
    year,
    dimensions,
    technique,
    price,
    preview: `${base}-preview.jpg`,
    main: `${base}-1.jpg`,
    full: `${base}-1.jpg`,
    images,
  };
}

type DisciplineData = Record<string, ArtworkFullData[]>;

/* ═══════════════════════════════════════════════════════════════
 *  PAINTING
 * ═══════════════════════════════════════════════════════════════ */
const painting: ArtworkFullData[] = [
  createArtwork({
    id: "1",
    slug: "pensieri-in-evoluzione",
    category: "painting",
    title: "Pensieri in Evoluzione",
    year: "2024",
    dimensions: "100 × 50 cm",
    technique: "Tecnica mista su tela",
    details: 3,
    roomViews: 3,
  }),
  createArtwork({
    id: "2",
    slug: "nebulosa-urbana",
    category: "painting",
    title: "Nebulosa Urbana",
    year: "2024",
    dimensions: "80 × 60 cm",
    technique: "Olio su tela",
    details: 2,
    roomViews: 1,
  }),
  createArtwork({ id: "3", slug: "frammenti-di-luce",     category: "painting", title: "Frammenti di Luce",     year: "2024", dimensions: "90 × 70 cm",   technique: "Acrilico su tela" }),
  createArtwork({ id: "4", slug: "orizzonte-liquido",     category: "painting", title: "Orizzonte Liquido",     year: "2024", dimensions: "120 × 80 cm",  technique: "Tecnica mista" }),
  createArtwork({ id: "5", slug: "materia-oscura",        category: "painting", title: "Materia Oscura",        year: "2023", dimensions: "100 × 100 cm", technique: "Olio su tela" }),
  createArtwork({ id: "6", slug: "risonanza-cromatica",   category: "painting", title: "Risonanza Cromatica",   year: "2023", dimensions: "80 × 60 cm",   technique: "Acrilico su tela" }),
];

/* ═══════════════════════════════════════════════════════════════
 *  PHOTOGRAPHY
 * ═══════════════════════════════════════════════════════════════ */
const photography: ArtworkFullData[] = [
  createArtwork({ id: "1", slug: "silenzio-metropolitano", category: "photography", title: "Silenzio Metropolitano", year: "2024", dimensions: "60 × 40 cm", technique: "Stampa Fine Art", details: 2, roomViews: 1 }),
  createArtwork({ id: "2", slug: "riflessi-dacqua",       category: "photography", title: "Riflessi d'Acqua",      year: "2024", dimensions: "50 × 50 cm", technique: "Stampa Fine Art" }),
  createArtwork({ id: "3", slug: "geometrie-naturali",    category: "photography", title: "Geometrie Naturali",     year: "2024", dimensions: "60 × 40 cm", technique: "Stampa Fine Art" }),
  createArtwork({ id: "4", slug: "luce-radente",          category: "photography", title: "Luce Radente",           year: "2023", dimensions: "70 × 50 cm", technique: "Stampa Fine Art" }),
  createArtwork({ id: "5", slug: "ombre-lunghe",          category: "photography", title: "Ombre Lunghe",           year: "2023", dimensions: "60 × 40 cm", technique: "Stampa Fine Art" }),
  createArtwork({ id: "6", slug: "istante-sospeso",       category: "photography", title: "Istante Sospeso",        year: "2023", dimensions: "50 × 50 cm", technique: "Stampa Fine Art" }),
];

/* ═══════════════════════════════════════════════════════════════
 *  DIGITAL ART
 * ═══════════════════════════════════════════════════════════════ */
const digitalArt: ArtworkFullData[] = [
  createArtwork({ id: "1", slug: "pixel-cosmico",        category: "digital-art", title: "Pixel Cosmico",        year: "2024", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ id: "2", slug: "glitch-armonico",      category: "digital-art", title: "Glitch Armonico",      year: "2024", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ id: "3", slug: "dimensione-parallela", category: "digital-art", title: "Dimensione Parallela", year: "2024", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ id: "4", slug: "codice-visivo",        category: "digital-art", title: "Codice Visivo",        year: "2023", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ id: "5", slug: "sintesi-digitale",     category: "digital-art", title: "Sintesi Digitale",     year: "2023", dimensions: "Digitale", technique: "Digital Art" }),
  createArtwork({ id: "6", slug: "realta-aumentata",     category: "digital-art", title: "Realtà Aumentata",     year: "2023", dimensions: "Digitale", technique: "Digital Art" }),
];

/* ═══════════════════════════════════════════════════════════════
 *  T-SHIRT
 * ═══════════════════════════════════════════════════════════════ */
const tShirt: ArtworkFullData[] = [
  createArtwork({ id: "1", slug: "nebula-wear",     category: "t-shirt", title: "Nebula Wear",     year: "2024", dimensions: "Varie taglie", technique: "Serigrafia" }),
  createArtwork({ id: "2", slug: "cosmic-print",    category: "t-shirt", title: "Cosmic Print",    year: "2024", dimensions: "Varie taglie", technique: "Stampa digitale" }),
  createArtwork({ id: "3", slug: "urban-galaxy",    category: "t-shirt", title: "Urban Galaxy",    year: "2024", dimensions: "Varie taglie", technique: "Serigrafia" }),
  createArtwork({ id: "4", slug: "abstract-flow",   category: "t-shirt", title: "Abstract Flow",   year: "2024", dimensions: "Varie taglie", technique: "Stampa digitale" }),
  createArtwork({ id: "5", slug: "stellar-edition", category: "t-shirt", title: "Stellar Edition", year: "2023", dimensions: "Varie taglie", technique: "Serigrafia" }),
  createArtwork({ id: "6", slug: "dark-matter",     category: "t-shirt", title: "Dark Matter",     year: "2023", dimensions: "Varie taglie", technique: "Stampa digitale" }),
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
