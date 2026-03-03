export interface ArtworkFullData {
  id: string;
  title: string;
  year: string;
  dimensions: string;
  technique: string;
  /** preview = gallery masonry thumbnail (use -preview files) */
  preview: string;
  /** main = detail page main image */
  main: string;
  /** full = lightbox hi-res */
  full: string;
  /** Additional images: mockups, details, room views */
  images: { url: string; label: string }[];
}

/**
 * NAMING CONVENTION (per tutte le discipline):
 *   preview:  massimo-di-stefano-{titolo}-{discipline}-preview   → galleria masonry (mai nella pagina opera)
 *   main (1): massimo-di-stefano-{titolo}-{discipline}-1         → foto principale pagina opera
 *   detail:   massimo-di-stefano-{titolo}-{discipline}-detail-N  → dettagli
 *   room:     massimo-di-stefano-{titolo}-{discipline}-room-view-N → ambientazioni
 *   lifestyle (t-shirt): massimo-di-stefano-{titolo}-t-shirt-lifestyle-N
 *   full:     stessa immagine di {discipline}-1 usata in alta risoluzione per il lightbox
 */

type DisciplineData = Record<string, ArtworkFullData[]>;

const data: DisciplineData = {
  painting: [
    {
      id: "1",
      title: "Pensieri in Evoluzione",
      year: "2024",
      dimensions: "100 × 50 cm",
      technique: "Tecnica mista su tela",
      preview: "/artworks/painting/1/pensieri-in-evoluzione-painting-preview.jpg",
      main: "/artworks/painting/1/pensieri-in-evoluzione-painting-1.jpg",
      full: "/artworks/painting/1/pensieri-in-evoluzione-painting-1.jpg",
      images: [
        { url: "/artworks/painting/1/pensieri-in-evoluzione-room-view-1.jpg", label: "Room View 1" },
        { url: "/artworks/painting/1/pensieri-in-evoluzione-room-view-2.jpg", label: "Room View 2" },
        { url: "/artworks/painting/1/pensieri-in-evoluzione-room-view-3.jpg", label: "Room View 3" },
        { url: "/artworks/painting/1/pensieri-in-evoluzione-detail-1.jpg", label: "Dettaglio 1" },
        { url: "/artworks/painting/1/pensieri-in-evoluzione-detail-2.jpg", label: "Dettaglio 2" },
        { url: "/artworks/painting/1/pensieri-in-evoluzione-detail-3.jpg", label: "Dettaglio 3" },
      ],
    },
    { id: "2", title: "Nebulosa Urbana", year: "2024", dimensions: "80 × 60 cm", technique: "Olio su tela", preview: "", main: "", full: "", images: [] },
    { id: "3", title: "Frammenti di Luce", year: "2024", dimensions: "90 × 70 cm", technique: "Acrilico su tela", preview: "", main: "", full: "", images: [] },
    { id: "4", title: "Orizzonte Liquido", year: "2024", dimensions: "120 × 80 cm", technique: "Tecnica mista", preview: "", main: "", full: "", images: [] },
    { id: "5", title: "Materia Oscura", year: "2023", dimensions: "100 × 100 cm", technique: "Olio su tela", preview: "", main: "", full: "", images: [] },
    { id: "6", title: "Risonanza Cromatica", year: "2023", dimensions: "80 × 60 cm", technique: "Acrilico su tela", preview: "", main: "", full: "", images: [] },
  ],
  photography: [
    { id: "1", title: "Silenzio Metropolitano", year: "2024", dimensions: "60 × 40 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
    { id: "2", title: "Riflessi d'Acqua", year: "2024", dimensions: "50 × 50 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
    { id: "3", title: "Geometrie Naturali", year: "2024", dimensions: "60 × 40 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
    { id: "4", title: "Luce Radente", year: "2023", dimensions: "70 × 50 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
    { id: "5", title: "Ombre Lunghe", year: "2023", dimensions: "60 × 40 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
    { id: "6", title: "Istante Sospeso", year: "2023", dimensions: "50 × 50 cm", technique: "Stampa Fine Art", preview: "", main: "", full: "", images: [] },
  ],
  "digital-art": [
    { id: "1", title: "Pixel Cosmico", year: "2024", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
    { id: "2", title: "Glitch Armonico", year: "2024", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
    { id: "3", title: "Dimensione Parallela", year: "2024", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
    { id: "4", title: "Codice Visivo", year: "2023", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
    { id: "5", title: "Sintesi Digitale", year: "2023", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
    { id: "6", title: "Realtà Aumentata", year: "2023", dimensions: "Digitale", technique: "Digital Art", preview: "", main: "", full: "", images: [] },
  ],
  "t-shirt": [
    { id: "1", title: "Nebula Wear", year: "2024", dimensions: "Varie taglie", technique: "Serigrafia", preview: "", main: "", full: "", images: [] },
    { id: "2", title: "Cosmic Print", year: "2024", dimensions: "Varie taglie", technique: "Stampa digitale", preview: "", main: "", full: "", images: [] },
    { id: "3", title: "Urban Galaxy", year: "2024", dimensions: "Varie taglie", technique: "Serigrafia", preview: "", main: "", full: "", images: [] },
    { id: "4", title: "Abstract Flow", year: "2024", dimensions: "Varie taglie", technique: "Stampa digitale", preview: "", main: "", full: "", images: [] },
    { id: "5", title: "Stellar Edition", year: "2023", dimensions: "Varie taglie", technique: "Serigrafia", preview: "", main: "", full: "", images: [] },
    { id: "6", title: "Dark Matter", year: "2023", dimensions: "Varie taglie", technique: "Stampa digitale", preview: "", main: "", full: "", images: [] },
  ],
};

export function getArtworksByDiscipline(discipline: string): ArtworkFullData[] {
  return data[discipline] || [];
}

export function getArtwork(discipline: string, artworkId: string): ArtworkFullData | undefined {
  return data[discipline]?.find((a) => a.id === artworkId);
}
