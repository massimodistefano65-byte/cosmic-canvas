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
  "bio.title": { it: "Il Ricercatore dell’Invisibile", en: "The Researcher of the Invisible" },
  "bio.intro": {
    it: "Per me l’arte non è mai stata una scelta, ma un’urgenza. Fin da bambino il disegno e la pittura sono stati i miei strumenti d’elezione per interpretare e decodificare il mondo. La vita mi ha poi guidato lungo percorsi apparentemente distanti, portandomi a una lunga fase di incubazione. In questo tempo la fiamma creativa è rimasta latente, ma non si è mai spenta: si è nutrita del silenzio, dell’ascolto e di una profonda immersione nella **Natura** e nelle sue leggi strutturali.",
    en: "For me, art has never been a choice, but an urgency. Since childhood, drawing and painting have been my chosen tools for interpreting and decoding the world. Life then guided me along apparently distant paths, leading me to a long phase of incubation. During this time, the creative flame remained latent, but never went out: it was nourished by silence, listening, and a deep immersion in **Nature** and its structural laws."
  },
  "bio.agronomo": {
    it: "La mia professione di **agronomo** e la mia specializzazione come **Garden Designer** non sono ambiti scissi dalla mia dimensione artistica, ma le sue fondamenta silenziose. Nel progettare **giardini moderni**, spazi contemporanei e **giardini zen** orientati all'essenzialità, io non faccio altro che fare arte: ricerco la **proporzione aurea**, l'equilibrio dei vuoti e dei pieni, e la sacralità dello spazio in cui l'energia può finalmente sprigionarsi. Che io stia calibrando l'armonia minimalista di un **giardino essenziale**, orchestrando la vita autosufficiente di un micro-ecosistema racchiuso nel vetro di un **terrario**, o studiando la forza vitale di un seme, compio lo stesso identico gesto: cerco le leggi universali dell’armonia. Nel 2008 questo impulso ancestrale è tornato a divampare con una forza nuova e dirompente, trasformandosi nella necessità assoluta di dare forma visibile alle energie immateriali. Da allora, dipingo e creo a tempo pieno, vivendo l’**arte contemporanea** come una missione e una disciplina quotidiana.",
    en: "My profession as an **agronomist** and my specialization as a **Garden Designer** are not fields separate from my artistic dimension, but its silent foundations. In designing **modern gardens**, contemporary spaces, and **zen gardens** oriented towards essentiality, I am doing nothing other than making art: I search for the **golden ratio**, the balance of voids and solids, and the sacredness of the space in which energy can finally be released. Whether I am calibrating the minimalist harmony of an **essential garden**, orchestrating the self-sufficient life of a micro-ecosystem enclosed in a **terrarium**, or studying the life force of a seed, I perform the exact same gesture: I search for the universal laws of harmony. In 2008, this ancestral impulse returned to flare up with a new and disruptive force, transforming into the absolute need to give visible form to immaterial energies. Since then, I have been painting and creating full-time, living **contemporary art** as a mission and a daily discipline."
  },
  "bio.heading_attrito": { it: "L’attrito tra Spirito e Materia", en: "The Friction between Spirit and Matter" },
  "bio.attrito_desc": {
    it: "Mi definisco, prima di tutto, un **ricercatore**. Il cuore della mia indagine risiede nell’**attrito**: quel conflitto fecondo, magnetico e costante tra la densità della materia e la vibrazione purissima dello spirito. Sono un’anima turbolenta, in perenne cammino tra la sofferenza del limite umano e la gioia della scoperta trascendentale. Vivo una polarità fortissima: sono radicato alla Terra, sperimento la gravità e il peso dell'essere 'terribilmente terrestre', eppure avverto una spinta verticale simmetrica e opposta, un'urgenza viscerale di ascendere e connettermi con l'infinito. Questo attrito non mi immobilizza; al contrario, è il motore immobile che genera la mia espressione creativa.",
    en: "I define myself, first of all, as a **researcher**. The heart of my investigation lies in **friction**: that fruitful, magnetic, and constant conflict between the density of matter and the pure vibration of the spirit. I am a turbulent soul, on a perennial journey between the suffering of human limits and the joy of transcendental discovery. I live a very strong polarity: I am rooted to the Earth, I experience gravity and the weight of being 'terribly terrestrial', yet I feel a symmetrical and opposite vertical thrust, a visceral urgency to ascend and connect with the infinite. This friction does not immobilize me; on the contrary, it is the immobile engine that generates my creative expression."
  },
  "bio.heading_linguaggi": { it: "Geografie dell’anima: I miei linguaggi", en: "Geographies of the Soul: My Languages" },
  "bio.list_pittura": { it: "Pittura Materica: Aggredisco la superficie con smalti, resine e materiali di recupero. Le spaccature sono feritoie da cui faccio emergere la luce.", en: "Matter Painting: I attack the surface with enamels, resins, and recycled materials. The cracks are slits from which I bring out the light." },
  "bio.list_foto": { it: "Fotografia: Catturo il 'miracolo' nell’ordinario. La mia ricerca è stata premiata al Louvre di Parigi, scorgendo l'infinito nel dettaglio.", en: "Photography: I capture the 'miracle' in the ordinary. My research was awarded at the Louvre in Paris, discerning the infinite in the detail." },
  "bio.list_digital": { it: "Digital Art e NFT: Il luogo in cui il colore si fa frequenza pura e onda quantistica, superando il piano tridimensionale.", en: "Digital Art and NFTs: The place where color becomes pure frequency and quantum wave, surpassing the three-dimensional plane." },
  "bio.heading_cosmo": { it: "Visione Cosmica e Ufologia", en: "Cosmic Vision and Ufology" },
  "bio.cosmo_desc": {
    it: "La mia arte è interconnessa a una **spiritualità profonda**, libera da dogmi, che si estende oltre i confini del pianeta. Sono un ricercatore attivo nel campo dell'**Ufologia**, guidato da esperienze dirette che hanno ridefinito i confini della mia percezione. Dipingere il cosmo e le sue intelligenze è la traduzione visiva di una realtà superiore che fluttua oltre il nostro limitato spettro visivo.",
    en: "My art is interconnected with a **deep spirituality**, free from dogmas, that extends beyond the boundaries of the planet. I am an active researcher in the field of **Ufology**, guided by direct experiences that have redefined the boundaries of my perception. Painting the cosmos and its intelligences is the visual translation of a superior reality that floats beyond our limited visual spectrum."
  },
  "bio.heading_filosofia": { it: "La filosofia del Maestro Interiore", en: "The Philosophy of the Inner Master" },
  "bio.filosofia_desc": {
    it: "Sento con assoluta certezza che siamo **esseri immortali**, scintille di un’unica energia divina. Il '**Vero Maestro**' risiede già dentro ognuno di noi. La mia arte è un dispositivo di risveglio; un invito a ritrovare quella guida interiore e a riconoscere che siamo esseri immortali in cammino verso l'Origine. Oggi creo a **Sant'Egidio**, vicino a **Perugia**, pronto a lasciarmi stupire dal prossimo istante di luce.",
    en: "I feel with absolute certainty that we are **immortal beings**, sparks of a single divine energy. The '**True Master**' already resides within each of us. My art is a device for awakening; an invitation to rediscover that inner guide and to recognize that we are immortal beings on a journey towards the Origin. Today I create in **Sant'Egidio**, near **Perugia**, ready to be amazed by the next moment of light."
  },

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
