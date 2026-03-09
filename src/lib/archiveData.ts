/**
 * ============================================================
 *  ARCHIVIO – Dati centralizzati
 * ============================================================
 *  Questo è l'UNICO file da modificare per gestire i contenuti
 *  della sezione Archive del sito.
 *
 *  Struttura cartelle immagini:
 *    public/archive/exhibitions/{id}/
 *    public/archive/projects/{id}/
 *    public/archive/materials/
 *    public/archive/texts/
 *
 *  Video: basta l'ID di YouTube (es. "x9ZMeR7e4MU")
 * ============================================================
 */

// ─── Tipi ────────────────────────────────────────────────────

export interface Exhibition {
  id: string;
  title: string;
  year: string;
  location: string;
  description: string;
  /** Immagini della mostra (foto allestimento, inviti, ecc.) */
  images: string[];
  /** Eventuale catalogo PDF */
  catalogPdf?: string;
}

export interface ArchiveVideo {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Solo l'ID di YouTube, es. "x9ZMeR7e4MU" */
  youtubeId: string;
}

export interface DownloadMaterial {
  id: string;
  title: string;
  description: string;
  /** Percorso file in public/, es. "/downloads/catalogo.pdf" */
  file: string;
  /** Dimensione leggibile, es. "11 MB" */
  size: string;
  /** Tipo file: PDF, DOC, TXT, ZIP, ecc. */
  type: string;
}

export interface Criticism {
  id: string;
  title: string;
  author: string;
  year: string;
  /** Breve estratto del testo */
  excerpt: string;
  /** Link al testo completo (URL o percorso PDF) */
  fullTextUrl?: string;
}

// Tipi di contenuto multimediale per "Altri Progetti"
export interface MediaItem {
  type: "image" | "video" | "youtube" | "pdf" | "doc" | "link" | "text";
  src?: string;          // URL/path del file o link
  youtubeId?: string;    // Per video YouTube
  title?: string;        // Titolo del contenuto
  description?: string;  // Descrizione breve
  content?: string;      // Testo lungo (per tipo "text")
  thumbnail?: string;    // Miniatura per PDF/DOC
  fileSize?: string;     // "2 MB" per file
}

export interface OtherProject {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Array flessibile di contenuti misti */
  media: MediaItem[];
  /** Testo lungo per approfondimenti, recensioni, ecc. */
  longDescription?: string;
  /** Tag per organizzazione */
  tags: string[];
  /** Layout preferito: "grid", "masonry", "list" */
  layout?: "grid" | "masonry" | "list";
}

// ─── Dati ────────────────────────────────────────────────────

/**
 * MOSTRE
 * Ordine: dalla più recente alla più vecchia.
 */
export const exhibitions: Exhibition[] = [
  {
    id: "1",
    title: "Pensieri in Evoluzione",
    year: "2024",
    location: "Galleria Moderna, Roma",
    description: "Mostra personale dedicata alla ricerca cosmica attraverso la pittura.",
    images: [],
    // catalogPdf: "/archive/exhibitions/1/catalogo-pensieri-in-evoluzione.pdf",
  },
];

/**
 * VIDEO
 * Inserisci solo lo youtubeId (la parte dopo "v=" nell'URL).
 */
export const videos: ArchiveVideo[] = [
  {
    id: "1",
    title: "Massimo Di Stefano, Viaggio nell'inconscio 1",
    category: "Arte",
    description: "Esplorazione artistica del subconscio attraverso la pittura",
    youtubeId: "x9ZMeR7e4MU",
  },
  {
    id: "2",
    title: "Massimo Di Stefano, Viaggio nell'inconscio 2",
    category: "Arte",
    description: "Seconda parte del viaggio nell'arte interiore",
    youtubeId: "_T-mymcG4sw",
  },
];

/**
 * MATERIALI SCARICABILI
 * I file vanno caricati in public/downloads/ o public/archive/materials/
 */
export const downloads: DownloadMaterial[] = [
  {
    id: "1",
    title: "Catalogo Opere HD",
    description: "Catalogo completo in alta risoluzione",
    file: "/downloads/catalogo-massimo-di-stefano-hd.pdf",
    size: "11 MB",
    type: "PDF",
  },
  {
    id: "2",
    title: "Catalogo Opere Light",
    description: "Versione leggera per navigazione veloce",
    file: "/downloads/catalogo-massimo-di-stefano-light.pdf",
    size: "2 MB",
    type: "PDF",
  },
];

/**
 * CRITICHE / TESTI CRITICI
 */
export const criticisms: Criticism[] = [
  {
    id: "1",
    title: "La Dimensione Cosmica nell'Arte Contemporanea",
    author: "Dr. Maria Rossi",
    year: "2024",
    excerpt: "Un'analisi approfondita della ricerca artistica di Massimo Di Stefano...",
    // fullTextUrl: "/archive/texts/dimensione-cosmica.pdf",
  },
];

/**
 * ALTRI PROGETTI (sculture, installazioni, ecc.)
 */
export const otherProjects: OtherProject[] = [
  {
    id: "1",
    title: "Micro-Ecosistemi in Bottiglia",
    category: "Installazioni",
    description: "Creazione di ecosistemi autosufficienti in contenitori di vetro",
    tags: ["natura", "sostenibilità", "arte ambientale"],
    layout: "grid",
    media: [
      {
        type: "image",
        src: "/archive/projects/1/ecosistemi-1.jpg",
        title: "Ecosistema in evoluzione",
        description: "Primo prototipo funzionante"
      },
      {
        type: "text", 
        title: "Processo creativo",
        content: "L'idea è nata osservando come la natura si auto-organizzi in spazi ristretti..."
      }
    ]
  },
  {
    id: "2", 
    title: "UFO e Fenomeni Inspiegabili",
    category: "Ricerca",
    description: "Raccolta di materiali, video e riflessioni sui fenomeni UFO",
    tags: ["ufo", "mistero", "video", "ricerca"],
    layout: "masonry",
    longDescription: "Una collezione di materiali che documentano avvistamenti, testimonianze e riflessioni personali sui fenomeni aerei non identificati.",
    media: [
      {
        type: "youtube",
        youtubeId: "x9ZMeR7e4MU", 
        title: "Avvistamento documentato",
        description: "Video interessante di un fenomeno inspiegabile"
      },
      {
        type: "pdf",
        src: "/archive/projects/2/report-ufo.pdf",
        title: "Report UFO 2024",
        description: "Documentazione dettagliata",
        fileSize: "5 MB",
        thumbnail: "/archive/projects/2/report-thumbnail.jpg"
      },
      {
        type: "image",
        src: "/archive/projects/2/screenshot-1.jpg",
        title: "Screenshot dal video",
        description: "Particolare interessante catturato"
      }
    ]
  },
  {
    id: "3",
    title: "Recensioni Libri",
    category: "Letteratura",
    description: "Libri che mi hanno colpito e influenzato",
    tags: ["libri", "recensioni", "cultura"],
    layout: "list", 
    media: [
      {
        type: "link",
        src: "https://www.amazon.it/libro-esempio",
        title: "Il Cosmo Interiore",
        description: "Link per acquisto"
      },
      {
        type: "text",
        title: "La mia recensione",
        content: "Questo libro ha completamente cambiato la mia visione artistica perché..."
      }
    ]
  }
];

// ─── Helper ──────────────────────────────────────────────────

export const getExhibitions = () => exhibitions;
export const getVideos = () => videos;
export const getDownloads = () => downloads;
export const getCriticisms = () => criticisms;
export const getOtherProjects = () => otherProjects;
