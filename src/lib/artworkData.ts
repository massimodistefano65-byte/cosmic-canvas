/**
 * ═══════════════════════════════════════════════════════════════════
 *  GESTIONE OPERE — GUIDA RAPIDA PER MASSIMO
 * ═══════════════════════════════════════════════════════════════════
 *
 *  QUESTO È L'UNICO FILE DA MODIFICARE per aggiungere, rimuovere
 *  o riordinare le opere nel sito.
 *
 *  ── COME AGGIUNGERE UN'OPERA ──────────────────────────────────
 *  1. Crea la cartella:  public/artworks/{disciplina}/{id}/
 *     Esempio:           public/artworks/painting/7/
 *
 *  2. Carica i file immagine seguendo questa convenzione:
 *     • PREVIEW (galleria):  {titolo-kebab}-{disciplina}-preview.jpg
 *     • MAIN (pagina opera):  {titolo-kebab}-{disciplina}-1.jpg
 *     • DETTAGLI:            {titolo-kebab}-{disciplina}-detail-1.jpg, -detail-2.jpg …
 *     • ROOM VIEW:           {titolo-kebab}-{disciplina}-room-view-1.jpg …
 *     • LIFESTYLE (t-shirt): {titolo-kebab}-t-shirt-lifestyle-1.jpg …
 *
 *     Esempio per "Nebulosa Urbana" (painting, id 2):
 *       public/artworks/painting/2/nebulosa-urbana-painting-preview.jpg
 *       public/artworks/painting/2/nebulosa-urbana-painting-1.jpg
 *       public/artworks/painting/2/nebulosa-urbana-painting-detail-1.jpg
 *       public/artworks/painting/2/nebulosa-urbana-painting-room-view-1.jpg
 *
 *  3. Aggiungi l'oggetto nell'array della disciplina qui sotto.
 *     Copia un'opera esistente e modifica i campi.
 *
 *  ── COME RIMUOVERE UN'OPERA (venduta, ecc.) ──────────────────
 *  Cancella (o commenta) l'oggetto dall'array. Puoi anche cancellare
 *  la cartella immagini se non ti serve più.
 *
 *  ── COME CAMBIARE L'ORDINE ───────────────────────────────────
 *  Sposta l'oggetto su o giù nell'array. Le opere appaiono
 *  nell'ordine esatto in cui sono elencate qui.
 *
 *  ── REGOLE IMPORTANTI ────────────────────────────────────────
 *  • L'ID deve essere unico dentro ogni disciplina (usa numeri crescenti).
 *  • Se "preview" è vuoto (""), l'opera NON compare nella galleria.
 *  • Se "main" è vuoto, la pagina dettaglio mostra un gradiente placeholder.
 *  • Le discipline valide sono: painting, photography, digital-art, t-shirt
 *
 * ═══════════════════════════════════════════════════════════════════
 */

export interface ArtworkFullData {
  /** ID univoco dentro la disciplina (es. "1", "2", "3") */
  id: string;
  /** Titolo dell'opera */
  title: string;
  /** Anno di realizzazione */
  year: string;
  /** Dimensioni (es. "100 × 50 cm" oppure "Varie taglie") */
  dimensions: string;
  /** Tecnica (es. "Olio su tela", "Stampa Fine Art") */
  technique: string;
  /** Prezzo (es. "€ 1.500", "Su richiesta") — lascia "" o ometti se non vuoi mostrarlo */
  price?: string;
  /** Thumbnail per la galleria masonry — lascia "" se non pronto */
  preview: string;
  /** Immagine principale nella pagina dettaglio — lascia "" se non pronto */
  main: string;
  /** Versione alta risoluzione per il lightbox (di solito = main) */
  full: string;
  /** Immagini aggiuntive: dettagli, room view, lifestyle */
  images: { url: string; label: string }[];
}

type DisciplineData = Record<string, ArtworkFullData[]>;

/* ═══════════════════════════════════════════════════════════════
 *  PAINTING
 * ═══════════════════════════════════════════════════════════════ */
const painting: ArtworkFullData[] = [
  {
    id: "1",
    title: "Pensieri in Evoluzione",
    year: "2024",
    dimensions: "100 × 50 cm",
    technique: "Tecnica mista su tela",
    preview: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-painting-preview.jpg",
    main:    "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-painting-1.jpg",
    full:    "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-painting-1.jpg",
    images: [
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-room-view-1.jpg", label: "Room View 1" },
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-room-view-2.jpg", label: "Room View 2" },
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-room-view-3.jpg", label: "Room View 3" },
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-detail-1.jpg",    label: "Dettaglio 1" },
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-detail-2.jpg",    label: "Dettaglio 2" },
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-detail-3.jpg",    label: "Dettaglio 3" },
    ],
  },
  // ── Aggiungi qui nuove opere di Painting ──
  // Copia il blocco sopra, cambia id, title, year, ecc.
  {
    id: "2",
    title: "Nebulosa Urbana",
    year: "2024",
    dimensions: "80 × 60 cm",
    technique: "Olio su tela",
    preview: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-painting-preview.jpg",
    main:    "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-painting-1.jpg",
    full:    "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-painting-1.jpg",
    images: [
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-room-view-1.jpg", label: "Room View 1" },
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-detail-1.jpg",    label: "Dettaglio 1" },
      { url: "/artworks/painting/1/massimo-di-stefano-pensieri-in-evoluzione-detail-2.jpg",    label: "Dettaglio 2" },
    ],
  },
  { id: "3", title: "Frammenti di Luce",     year: "2024", dimensions: "90 × 70 cm",  technique: "Acrilico su tela", preview: "", main: "", full: "", images: [] },
  { id: "4", title: "Orizzonte Liquido",     year: "2024", dimensions: "120 × 80 cm", technique: "Tecnica mista",    preview: "", main: "", full: "", images: [] },
  { id: "5", title: "Materia Oscura",        year: "2023", dimensions: "100 × 100 cm", technique: "Olio su tela",    preview: "", main: "", full: "", images: [] },
  { id: "6", title: "Risonanza Cromatica",   year: "2023", dimensions: "80 × 60 cm",  technique: "Acrilico su tela", preview: "", main: "", full: "", images: [] },
];

/* ═══════════════════════════════════════════════════════════════
 *  PHOTOGRAPHY
 * ═══════════════════════════════════════════════════════════════ */
const photography: ArtworkFullData[] = [
  // ── Aggiungi qui le opere di Photography ──
  { id: "1", title: "Silenzio Metropolitano", year: "2024", dimensions: "60 × 40 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
  { id: "2", title: "Riflessi d'Acqua",       year: "2024", dimensions: "50 × 50 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
  { id: "3", title: "Geometrie Naturali",     year: "2024", dimensions: "60 × 40 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
  { id: "4", title: "Luce Radente",           year: "2023", dimensions: "70 × 50 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
  { id: "5", title: "Ombre Lunghe",           year: "2023", dimensions: "60 × 40 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
  { id: "6", title: "Istante Sospeso",        year: "2023", dimensions: "50 × 50 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
];

/* ═══════════════════════════════════════════════════════════════
 *  DIGITAL ART
 * ═══════════════════════════════════════════════════════════════ */
const digitalArt: ArtworkFullData[] = [
  // ── Aggiungi qui le opere di Digital Art ──
  { id: "1", title: "Pixel Cosmico",         year: "2024", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
  { id: "2", title: "Glitch Armonico",       year: "2024", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
  { id: "3", title: "Dimensione Parallela",  year: "2024", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
  { id: "4", title: "Codice Visivo",         year: "2023", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
  { id: "5", title: "Sintesi Digitale",      year: "2023", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
  { id: "6", title: "Realtà Aumentata",      year: "2023", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
];

/* ═══════════════════════════════════════════════════════════════
 *  T-SHIRT
 * ═══════════════════════════════════════════════════════════════ */
const tShirt: ArtworkFullData[] = [
  // ── Aggiungi qui le T-Shirt ──
  { id: "1", title: "Nebula Wear",     year: "2024", dimensions: "Varie taglie", technique: "Serigrafia",       preview: "", main: "", full: "", images: [] },
  { id: "2", title: "Cosmic Print",    year: "2024", dimensions: "Varie taglie", technique: "Stampa digitale",  preview: "", main: "", full: "", images: [] },
  { id: "3", title: "Urban Galaxy",    year: "2024", dimensions: "Varie taglie", technique: "Serigrafia",       preview: "", main: "", full: "", images: [] },
  { id: "4", title: "Abstract Flow",   year: "2024", dimensions: "Varie taglie", technique: "Stampa digitale",  preview: "", main: "", full: "", images: [] },
  { id: "5", title: "Stellar Edition", year: "2023", dimensions: "Varie taglie", technique: "Serigrafia",       preview: "", main: "", full: "", images: [] },
  { id: "6", title: "Dark Matter",     year: "2023", dimensions: "Varie taglie", technique: "Stampa digitale",  preview: "", main: "", full: "", images: [] },
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
