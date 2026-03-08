/**
 * ═══════════════════════════════════════════════════════════════════
 *  GESTIONE BLOG / DIARIO DELL'ARTISTA
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Per aggiungere un nuovo articolo:
 *  1. Aggiungi un oggetto nell'array qui sotto
 *  2. Se hai un'immagine di copertina, mettila in public/images/blog/
 *
 *  Campi:
 *  - id: stringa unica (es. "1", "2", ...)
 *  - slug: URL-friendly (es. "primo-articolo")
 *  - title_it / title_en: titolo in italiano e inglese
 *  - excerpt_it / excerpt_en: anteprima breve
 *  - content_it / content_en: testo completo (supporta semplice testo)
 *  - date: data di pubblicazione (YYYY-MM-DD)
 *  - coverImage: percorso immagine (opzionale, lascia "" se non c'è)
 *  - tags: array di tag (opzionale)
 *
 * ═══════════════════════════════════════════════════════════════════
 */

export interface BlogPost {
  id: string;
  slug: string;
  title_it: string;
  title_en: string;
  excerpt_it: string;
  excerpt_en: string;
  content_it: string;
  content_en: string;
  date: string;
  coverImage: string;
  tags: string[];
}

const posts: BlogPost[] = [
  // ── Aggiungi qui i tuoi articoli ──
  // Esempio:
  // {
  //   id: "1",
  //   slug: "il-mio-primo-articolo",
  //   title_it: "Il mio primo articolo",
  //   title_en: "My first article",
  //   excerpt_it: "Un breve racconto del processo creativo...",
  //   excerpt_en: "A brief account of the creative process...",
  //   content_it: "Testo completo dell'articolo in italiano...",
  //   content_en: "Full article text in English...",
  //   date: "2026-03-08",
  //   coverImage: "/images/blog/primo-articolo.jpg",
  //   tags: ["processo", "pittura"],
  // },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
