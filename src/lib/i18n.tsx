import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "it" | "en";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.home": { it: "Home", en: "Home" },
  "nav.bio": { it: "Bio", en: "Bio" },
  "nav.painting": { it: "Painting", en: "Painting" },
  "nav.photography": { it: "Photography", en: "Photography" },
  "nav.digitalArt": { it: "Digital Art", en: "Digital Art" },
  "nav.tshirt": { it: "T-Shirt", en: "T-Shirt" },
  "nav.archive": { it: "Archive", en: "Archive" },
  "nav.contacts": { it: "Contacts", en: "Contacts" },

  // Hero
  "hero.subtitle": { it: "Artista visivo e pittore cosmico visionario", en: "Visual artist and visionary cosmic painter" },

  // Contact Section
  "contact.title": { it: "Contatti", en: "Contacts" },
  "contact.connect": { it: "Connettiti", en: "Connect" },
  "contact.name": { it: "Il tuo nome", en: "Your name" },
  "contact.nameLbl": { it: "Nome", en: "Name" },
  "contact.email": { it: "la-tua-email@example.com", en: "your-email@example.com" },
  "contact.emailLbl": { it: "Email", en: "Email" },
  "contact.message": { it: "Il tuo messaggio...", en: "Your message..." },
  "contact.messageLbl": { it: "Messaggio", en: "Message" },
  "contact.send": { it: "Invia messaggio", en: "Send message" },
  "contact.sending": { it: "Invio...", en: "Sending..." },
  "contact.sent": { it: "Messaggio inviato ✓", en: "Message sent ✓" },
  "contact.sentSub": { it: "Riceverai una risposta al più presto.", en: "You will receive a reply soon." },
  "contact.error": { it: "Errore nell'invio. Riprova.", en: "Sending failed. Please retry." },
  "contact.rights": { it: "Tutti i diritti riservati.", en: "All rights reserved." },

  // Newsletter
  "newsletter.title": { it: "Resta aggiornato", en: "Stay updated" },
  "newsletter.desc": { it: "Iscriviti per ricevere aggiornamenti su nuove opere ed eventi.", en: "Subscribe for updates on new artworks and events." },
  "newsletter.placeholder": { it: "La tua email", en: "Your email" },
  "newsletter.subscribe": { it: "Iscriviti", en: "Subscribe" },
  "newsletter.subscribing": { it: "Iscrizione...", en: "Subscribing..." },
  "newsletter.success": { it: "Iscrizione completata ✓", en: "Subscribed successfully ✓" },
  "newsletter.error": { it: "Errore. Riprova.", en: "Error. Please retry." },

  // DisciplinePage
  "discipline.back": { it: "Back", en: "Back" },

  // Painting
  "painting.intro": {
    it: "Le opere pittoriche di Massimo Di Stefano esplorano il confine tra il cosmo interno e l'universo esterno.",
    en: "The paintings of Massimo Di Stefano explore the boundary between the inner cosmos and the outer universe.",
  },
  "photography.intro": {
    it: "La fotografia di Massimo Di Stefano cattura momenti di bellezza quotidiana e straordinarietà nascoste.",
    en: "The photography of Massimo Di Stefano captures moments of everyday beauty and hidden wonder.",
  },
  "digital-art.intro": {
    it: "L'arte digitale di Massimo Di Stefano rappresenta la convergenza tra la visione creativa e le tecnologie contemporanee.",
    en: "The digital art of Massimo Di Stefano represents the convergence of creative vision and contemporary technologies.",
  },
  "t-shirt.intro": {
    it: "Le magliette di Massimo Di Stefano trasformano l'arte in forma indossabile.",
    en: "Massimo Di Stefano's t-shirts transform art into wearable form.",
  },

  // Index sections
  "section.painting.subtitle": { it: "Esplorazioni della tela cosmica e della visione interiore", en: "Explorations of cosmic canvas and inner vision" },
  "section.photography.subtitle": { it: "Cattura della realtà attraverso l'obiettivo", en: "Capturing reality through the lens" },
  "section.digital-art.subtitle": { it: "Arte digitale e composizioni visionarie", en: "Digital art and visionary compositions" },
  "section.t-shirt.subtitle": { it: "Arte indossabile e design esclusivo", en: "Wearable art and exclusive design" },

  // Bio page
  "bio.title": { it: "Biografia", en: "Biography" },
  "bio.p1": {
    it: "Massimo Di Stefano è un artista contemporaneo visionario che lavora attraverso molteplici discipline: pittura, fotografia, arte digitale e design indossabile.",
    en: "Massimo Di Stefano is a visionary contemporary artist working across multiple disciplines including painting, photography, digital art, and wearable design.",
  },
  "bio.p2": {
    it: "Nato da un profondo fascino per i temi cosmici e la visione interiore, il suo lavoro esplora l'intersezione tra il tangibile e l'etereo, creando esperienze visive immersive che sfidano la percezione.",
    en: "Born from a deep fascination with cosmic themes and inner vision, his work explores the intersection between the tangible and ethereal, creating immersive visual experiences that challenge perception.",
  },
  "bio.p3": {
    it: "La sua pratica artistica è radicata nell'estetica minimalista e nell'emozione massimalista — ogni pezzo è accuratamente realizzato per evocare un senso di meraviglia cosmica e profondità filosofica.",
    en: "His artistic practice is rooted in minimalist aesthetics and maximalist emotion—each piece carefully crafted to evoke a sense of cosmic wonder and philosophical depth.",
  },
  "bio.practice": { it: "Pratica", en: "Practice" },
  "bio.practice1": { it: "Olio e acrilico su tela", en: "Oil and acrylic on canvas" },
  "bio.practice2": { it: "Fotografia fine art", en: "Fine art photography" },
  "bio.practice3": { it: "Composizione e manipolazione digitale", en: "Digital composition and manipulation" },
  "bio.practice4": { it: "Design di abbigliamento in edizione limitata", en: "Limited edition apparel design" },
  "bio.photos": { it: "L'artista al lavoro", en: "The artist at work" },
  "bio.downloads": { it: "Materiali", en: "Materials" },
  "bio.downloadCatalogHD": { it: "Catalogo HD", en: "Catalog HD" },
  "bio.downloadCatalogLight": { it: "Catalogo Light", en: "Catalog Light" },

  // Criticism page

  // ArtworkDetail
  "artwork.enquiry": { it: "Richiedi informazioni", en: "Enquire about this work" },
  "artwork.year": { it: "Anno", en: "Year" },
  "artwork.dimensions": { it: "Dimensioni", en: "Dimensions" },
  "artwork.technique": { it: "Tecnica", en: "Technique" },
  "artwork.back": { it: "Back", en: "Back" },

  // EnquiryModal
  "enquiry.title": { it: "Informazioni su:", en: "Enquiry about:" },
  "enquiry.desc1": { it: "Se desideri maggiori informazioni su quest'opera, sulla tecnica utilizzata, sulla spedizione o su qualsiasi altra curiosità, non esitare a chiedere.", en: "If you would like more information about this work, the technique used, shipping, or any other curiosity, please do not hesitate to ask." },
  "enquiry.name": { it: "Nome", en: "Name" },
  "enquiry.subject": { it: "Oggetto", en: "Subject" },
  "enquiry.message": { it: "Messaggio", en: "Message" },
  "enquiry.send": { it: "Invia", en: "Send" },
  "enquiry.sending": { it: "Invio...", en: "Sending..." },
  "enquiry.sent": { it: "Messaggio inviato ✓", en: "Message sent ✓" },
  "enquiry.sentSub": { it: "Messaggio inviato con successo", en: "Message sent successfully" },
  "enquiry.error": { it: "Errore nell'invio. Riprova.", en: "Sending failed. Please retry." },

  // Archive
  "archive.description": { it: "Esplora la collezione completa di opere, video, materiali e progetti creativi.", en: "Explore the complete collection of works, videos, materials and creative projects." },
};

const I18nContext = createContext<I18nContextType>({
  lang: "it",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" || saved === "it") ? saved : "it";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback((key: string) => {
    return translations[key]?.[lang] ?? key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
