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

  // Bio Page - Nuova Struttura "Editoriale"
  "bio.header.name": { it: "Massimo Di Stefano", en: "Massimo Di Stefano" },
  "bio.header.tagline": { it: "Il Ricercatore dell'Invisibile", en: "The Researcher of the Invisible" },
  
  // Sezione 1
  "bio.sec1.title": { it: "L’urgenza del ritorno e le radici della Terra", en: "The Urgency of Return and the Roots of the Earth" },
  "bio.sec1.p1": { it: "Per me l’arte non è mai stata una scelta, ma un’urgenza. Fin da bambino il disegno e la pittura sono stati i miei strumenti d’elezione per interpretare e decodificare il mondo. La vita mi ha poi guidato lungo percorsi apparentemente distanti, portandomi a una lunga fase di incubazione.", en: "For me, art has never been a choice, but an urgency. Since childhood, drawing and painting have been my chosen tools for interpreting and decoding the world. Life then guided me along apparently distant paths, leading me to a long phase of incubation." },
  "bio.sec1.p2": { it: "La mia professione di agronomo e la mia specializzazione come Garden Designer non sono ambiti scissi dalla mia dimensione artistica, ma le sue fondamenta silenziose. Nel progettare piccoli giardini moderni e giardini zen orientati all'essenzialità, io ricerco la proporzione aurea e l'equilibrio dei vuoti e dei pieni.", en: "My profession as an agronomist and my specialization as a Garden Designer are not fields separate from my artistic dimension, but its silent foundations. In designing small modern gardens and zen gardens oriented towards essentiality, I search for the golden ratio and the balance of voids and solids." },

  // Sezione 2
  "bio.sec2.title": { it: "L’attrito tra Spirito e Materia", en: "The Friction between Spirit and Matter" },
  "bio.sec2.p1": { it: "Mi definisco, prima di tutto, un ricercatore. Il cuore della mia indagine risiede nell’attrito: quel conflitto fecondo, magnetico e costante tra la densità della materia e la vibrazione purissima dello spirito.", en: "I define myself, first of all, as a researcher. The heart of my investigation lies in friction: that fruitful, magnetic, and constant conflict between the density of matter and the pure vibration of the spirit." },
  "bio.sec2.p2": { it: "Vivo una polarità fortissima: sono radicato alla Terra, sperimento il peso dell'essere 'terribilmente terrestre', eppure avverto una spinta verticale simmetrica e opposta, un'urgenza viscerale di ascendere e connettermi con l'infinito. Questo attrito costante è il vero motore immobile che genera la mia espressione creativa.", en: "I live a very strong polarity: I am rooted to the Earth, I experience the weight of being 'terribly terrestrial', yet I feel a symmetrical and opposite vertical thrust, a visceral urgency to ascend and connect with the infinite. This constant friction is the true immobile engine that generates my creative expression." },

  // Sezione Linguaggi (Cards)
  "bio.cards.title": { it: "Geografie dell’anima: I linguaggi della mia ricerca", en: "Geographies of the Soul: The Languages of My Research" },
  "bio.card1.title": { it: "La Pittura Materica", en: "Matter Painting" },
  "bio.card1.desc": { it: "Aggredisco la superficie con smalti, resine e materiali di recupero. Le spaccature e i rilievi non sono incidenti, ma feritoie.", en: "I attack the surface with enamels, resins, and recycled materials. The cracks and reliefs are not accidents, but slits." },
  "bio.card2.title": { it: "La Fotografia", en: "Photography" },
  "bio.card2.desc": { it: "Il mio strumento per catturare il 'miracolo' nell’ordinario. Nel 2015, una mia macrofotografia è stata selezionata ed esposta al Museo del Louvre di Parigi.", en: "My tool for capturing the 'miracle' in the ordinary. In 2015, one of my macro-photographs was selected and exhibited at the Louvre Museum in Paris." },
  "bio.card3.title": { it: "L’Arte Digitale e gli NFT", en: "Digital Art and NFTs" },
  "bio.card3.desc": { it: "L'estensione immateriale della mia ricerca. Nel regno digitale il colore si fa frequenza pura, superando il piano tridimensionale.", en: "The immaterial extension of my research. In the digital realm, color becomes pure frequency, surpassing the three-dimensional plane." },

  // Sezione T-Shirt
  "bio.tshirt.title": { it: "Dallo schermo al quotidiano: L'arte da indossare", en: "From the Screen to Daily Life: Wearable Art" },
  "bio.tshirt.desc": { it: "Proprio partendo dalle mie opere digitali, ho scelto di trasferire le mie geometrie cromatiche su supporti d'uso quotidiano, dando vita a una linea di t-shirt in alta qualità. Un modo per far uscire l'arte dagli spazi canonici per farla camminare nel mondo, trasformandola in un manifesto portatile del proprio mondo interiore.", en: "Starting precisely from my digital works, I chose to transfer my chromatic geometries onto daily use supports, giving life to a line of high-quality t-shirts. A way to let art out of canonical spaces to make it walk in the world, transforming it into a portable manifesto of one's inner world." },

  // Sezione Finale
  "bio.final.title": { it: "La Visione Cosmica e il Maestro Interiore", en: "The Cosmic Vision and the Inner Master" },
  "bio.final.p1": { it: "La mia arte è strettamente interconnessa a una spiritualità profonda, libera da dogmi, che si estende oltre i confini del nostro pianeta. Lo studio dell'universo e delle sue geometrie mi pone da sempre di fronte a un dato di fatto per me incontrovertibile: non siamo soli nell’universo. Sono un ricercatore attivo in questo campo, guidato da importanti esperienze dirette che hanno per sempre ridefinito i confini della mia percezione.", en: "My art is closely interconnected with a deep spirituality, free from dogmas, that extends beyond the boundaries of our planet. The study of the universe and its geometries has always confronted me with an incontrovertible fact: we are not alone in the universe. I am an active researcher in this field, guided by important direct experiences that have forever redefined the boundaries of my perception." },
  "bio.final.p2": { it: "Credo fermamente che il 'Vero Maestro' risieda già dentro ognuno di noi. La mia arte è un invito a risvegliare quella guida interiore, a prendersi la responsabilità della propria luce e a riconoscere che la bellezza e la verità sono presenze che pulsano qui, ora, in questo esatto istante.", en: "I firmly believe that the 'True Master' already resides within each of us. My art is an invitation to awaken that inner guide, to take responsibility for one's own light, and to recognize that beauty and truth are presences that pulse here, now, in this exact instant." },
  "bio.signature": { it: "Oggi vivo, ricerco e creo a Sant'Egidio, vicino a Perugia, immerso nel mio laboratorio, costantemente teso tra la terra che coltivo e il cielo infinito che esploro, sempre pronto a lasciarmi stupire dal prossimo istante di luce.", en: "Today I live, research, and create in Sant'Egidio, near Perugia, immersed in my laboratory, constantly stretched between the earth I cultivate and the infinite sky I explore, always ready to be amazed by the next moment of light." },

  // Criticism page

  // ArtworkDetail
  "artwork.enquiry": { it: "Richiedi informazioni", en: "Enquire about this work" },
  "artwork.year": { it: "Anno", en: "Year" },
  "artwork.dimensions": { it: "Dimensioni", en: "Dimensions" },
  "artwork.technique": { it: "Tecnica", en: "Technique" },
  "artwork.price": { it: "Prezzo", en: "Price" },
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
