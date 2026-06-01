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

  // Bio Page - Testi Definitivi
  "bio.header.tagline": { it: "Il Ricercatore dell’Invisibile", en: "The Researcher of the Invisible" },
  "bio.sec1.title": { it: "L’urgenza del ritorno e le radici della Terra: L'Arte del Micro e Macrocosmo", en: "The Urgency of Return and the Roots of the Earth: The Art of Micro and Macrocosm" },
  "bio.sec1.p1": { it: "Per me l’arte non è mai stata una scelta, ma un’urgenza. Fin da bambino il disegno e la pittura sono stati i miei strumenti d’elezione per interpretare e decodificare il mondo. La vita mi ha poi guidato lungo percorsi apparentemente distanti, portandomi a una lunga fase di incubazione. In questo tempo la fiamma creativa è rimasta latente, ma non si è mai spenta: si è nutrita del silenzio, dell’ascolto e di una profonda immersione nella Natura e nelle sue leggi strutturali.", en: "For me, art has never been a choice, but an urgency. Since childhood, drawing and painting have been my chosen tools for interpreting and decoding the world. Life then guided me along apparently distant paths, leading me to a long phase of incubation. During this time, the creative flame remained latent, but never went out: it was nourished by silence, listening, and a deep immersion in Nature and its structural laws." },
  "bio.sec1.p2": { it: "La mia professione di agronomo e la mia specializzazione come Garden Designer non sono ambiti scissi dalla mia dimensione artistica, ma le sue fondamenta silenziose. Nel progettare piccoli giardini moderni, spazi contemporanei e giardini zen orientati all'essenzialità, io non faccio altro che fare arte: ricerco la proporzione aurea, l'equilibrio dei vuoti e dei pieni, e la sacralità dello spazio in cui l'energia può finalmente sprigionarsi. Che io stia calibrando l'armonia minimalista di un giardino essenziale, orchestrando la vita autosufficiente di un micro-ecosistema racchiuso nel vetro di un terrario, o studiando la forza vitale di un seme, compio lo stesso identico gesto: cerco le leggi universali dell’armonia. Nel 2008 questo impulso ancestrale è tornato a divampare con una forza nuova e dirompente, trasformandosi nella necessità assoluta di dare forma visibile alle energie immateriali. Da allora, dipingo e creo a tempo pieno, vivendo l’arte come una missione e una disciplina quotidiana.", en: "My profession as an agronomist and my specialization as a Garden Designer are not fields separate from my artistic dimension, but its silent foundations. In designing small modern gardens, contemporary spaces, and zen gardens oriented towards essentiality, I am doing nothing other than making art: I search for the golden ratio, the balance of voids and solids, and the sacredness of the space in which energy can finally be released. Whether I am calibrating the minimalist harmony of an essential garden, orchestrating the self-sufficient life of a micro-ecosystem enclosed in a terrarium, or studying the life force of a seed, I perform the exact same gesture: I search for the universal laws of harmony. In 2008, this ancestral impulse returned to flare up with a new and disruptive force, transforming into the absolute need to give visible form to immaterial energies. Since then, I have been painting and creating full-time, living art as a mission and a daily discipline." },
  "bio.sec2.title": { it: "L’attrito tra Spirito e Materia: Il Motore dell'Ascensione", en: "The Friction between Spirit and Matter: The Engine of Ascension" },
  "bio.sec2.p1": { it: "Mi definisco, prima di tutto, un ricercatore. Il cuore della mia indagine risiede nell’attrito: quel conflitto fecondo, magnetico e costante tra la densità della materia e la vibrazione purissima dello spirito. Sono un’anima turbolenta, in perenne cammino tra la sofferenza del limite umano e la gioia della scoperta trascendentale. Vivo una polarità fortissima: sono radicato alla Terra, sperimento la gravità e il peso dell'essere 'terribilmente terrestre', eppure avverto una spinta verticale simmetrica e opposta, un'urgenza viscerale di ascendere e connettermi con l'infinito. Questo attrito non mi immobilizza; al contrario, è il motore immobile che genera la mia expressione creativa.", en: "I define myself, first of all, as a researcher. The heart of my investigation lies in friction: that fruitful, magnetic, and constant conflict between the density of matter and the pure vibration of the spirit. I am a turbulent soul, on a perennial journey between the suffering of human limits and the joy of transcendental discovery. I live a very strong polarity: I am rooted to the Earth, I experience gravity and the weight of being 'terribly terrestrial', yet I feel a symmetrical and opposite vertical thrust, a visceral urgency to ascend and connect with the infinite. This friction does not immobilize me; on the contrary, it is the immobile engine that generates my creative expression." },
  "bio.sec2.p2": { it: "Questa tensione costante mi spinge a rifiutare i confini di un solo medium. Per me non esistono barriere o gerarchie tra la pittura materica, la fotografia e l’arte digitale. Quando incido un pannello di poliuretano, quando manipolo i pixel sullo schermo o quando scatto una fotografia, sto inseguendo la medesima rivelazione: quella luce sottile che abita dietro l’evidenza delle cose. Cerco di 'organizzare il disastro' interiore per offrire a me stesso e agli altri una forma provvisoria, ma salvifica, al mistero dell’esistenza.", en: "This constant tension pushes me to reject the boundaries of a single medium. For me, there are no barriers or hierarchies between matter painting, photography, and digital art. When I engrave a polyurethane panel, when I manipulate pixels on the screen, or when I take a photograph, I am chasing the same revelation: that subtle light that lives behind the evidence of things. I try to 'organize the interior disaster' to offer myself and others a temporary, but saving, form to the mystery of existence." },
  "bio.sec2.p3": { it: "Definito dalla critica come un 'demiurgo di verità intuite', adotto un approccio autenticamente alchemico. Utilizzo pigmenti, smalti, colle e materiali plastici industriali (come i foam panels) per dare vita a opere caratterizzate da una forte, quasi violenta, tridimensionalità. Questa ricerca materica scava negli archetipi del subconscio e nelle connessioni energetiche universali, unendo l'introspezione più intima a una visione cosmica e stellare.", en: "Defined by critics as a 'demiurge of intuited truths', I adopt an authentically alchemical approach. I use pigments, enamels, glues, and industrial plastic materials (such as foam panels) to give life to works characterized by a strong, almost violent, three-dimensionality. This material research digs into the archetypes of the subconscious and universal energetic connections, combining the most intimate introspection with a cosmic and stellar vision." },
  "bio.cards.title": { it: "Geografie dell’anima: I linguaggi della mia ricerca", en: "Geographies of the Soul: The Languages of My Research" },
  "bio.cards.subtitle": { it: "Il mio percorso si articola attraverso tre canali espressivi principali che si alimentano e si amplificano a vicenda:", en: "My journey is articulated through three main expressive channels that feed and amplify each other:" },
  "bio.card1.title": { it: "La Pittura Materica", en: "Matter Painting" },
  "bio.card1.desc": { it: "Aggredisco la superficie con smalti, resine e materiali di recupero. Le spaccature e i rilievi non sono incidenti, ma feritoie: cerco di far emergere la vita e la luce proprio dalle fratture e dalle stratificazioni della materia densa.", en: "I attack the surface with enamels, resins, and recycled materials. The cracks and reliefs are not accidents, but slits: I try to bring out life and light precisely from the fractures and layers of dense matter." },
  "bio.card2.title": { it: "La Fotografia", en: "Photography" },
  "bio.card2.desc": { it: "È il mio strumento d'elezione per catturare il 'miracolo' nell’ordinario e l'impronta dell'eterno nel transitorio. Un battito di ciglia, l'architettura microscopica di una pianta o l'universo nascosto di un insetto diventano per me soglie spazio-temporali, portali visivi che strappano l'essenza dal frastuono del mondo. Questo sguardo analitico e profondo ha ottenuto un importante riconoscimento internazionale nel 2015, quando una mia macrofotografia è stata selezionata per l'Exposure Award al Museo del Louvre di Parigi.", en: "It is my chosen tool for capturing the 'miracle' in the ordinary and the imprint of the eternal in the transitory. A blink of an eye, the microscopic architecture of a plant, or the hidden universe of an insect become space-time thresholds for me, visual portals that tear the essence from the noise of the world. This analytical and profound gaze obtained important international recognition in 2015, when one of my macro-photographs was selected for the Exposure Award at the Louvre Museum in Paris." },
  "bio.card3.title": { it: "L’Arte Digitale e gli NFT", en: "Digital Art and NFTs" },
  "bio.card3.desc": { it: "Rappresentano l'estensione immateriale della mia ricerca, il luogo in cui mi spoglio del peso terrestre per guardare il Cosmo. Nel regno digitale il colore si fa frequenza pura, vibrazione cromatica e onda quantistica. Attraverso lo schermo traccio geografie dell’anima, flussi magnetici e connessioni energetiche che superano il piano tridimensionale.", en: "They represent the immaterial extension of my research, the place where I strip off terrestrial weight to look at the Cosmos. In the digital realm, color becomes pure frequency, chromatic vibration, and quantum wave. Through the screen, I trace geographies of the soul, magnetic flows, and energetic connections that surpass the three-dimensional plane." },
  "bio.tshirt.title": { it: "Dallo schermo al quotidiano: L'arte da indossare", en: "From the Screen to Daily Life: Wearable Art" },
  "bio.tshirt.p1": { it: "Proprio partendo dalle mie opere digitali e dalle mie creazioni visive, ho sentito il desiderio di estendere questa ricerca oltre i confini tradizionali della tela o dello schermo. Ho scelto così di trasferire le mie geometrie e le mie frequenze cromatiche su supporti d'uso quotidiano, dando vita a una linea di t-shirt e oggetti d'arte in cui i miei lavori vengono riprodotti attraverso stampe d'alta qualità.", en: "Starting precisely from my digital works and my visual creations, I felt the desire to extend this research beyond the traditional boundaries of the canvas or the screen. I thus chose to transfer my geometries and my chromatic frequencies onto daily use supports, giving life to a line of t-shirts and art objects in which my works are reproduced through high-quality prints." },
  "bio.tshirt.p2": { it: "Non si tratta di semplice merchandising, ma del tentativo di far uscire l'arte dagli spazi canonici per farla camminare nel mondo, trasformando un capo d'abbigliamento in un manifesto portatile del proprio mondo interiore.", en: "It is not simple merchandising, but an attempt to let art out of canonical spaces to make it walk in the world, transforming a piece of clothing into a portable manifesto of one's inner world." },
  "bio.cosmo.title": { it: "La Visione Cosmica e il Contatto con l'Ignoto", en: "The Cosmic Vision and the Contact with the Unknown" },
  "bio.cosmo.p1": { it: "La mia arte è strettamente interconnessa a una spiritualità profonda, libera da dogmi o religioni precostituite, che si estende oltre i confini del nostro pianeta. Lo studio dell'universo e delle sei geometrie mi pone da sempre di fronte a un dato di fatto per me incontrovertibile: non siamo soli nell’universo.", en: "My art is closely interconnected with a deep spirituality, free from dogmas or pre-established religions, which extends beyond the boundaries of our planet. The study of the universe and its six geometries has always confronted me with a fact that is incontrovertible for me: we are not alone in the universe." },
  "bio.cosmo.p2": { it: "Sono un profondo fautore dell’esistenza di altre forme di vita extraterrestri e un ricercatore attivo in questo campo, guidato da importanti esperienze dirette che hanno per sempre ridefinito i confini della mia percezione. Questa consapevolezza influisce prepotentemente sulla mia produzione artistica: dipingere il cosmo, le sei frequenze e le sue intelligenze non è per me un esercizio di fantasia onirica, ma la traduzione visiva di una realtà superiore.", en: "I am a profound advocate for the existence of other forms of extraterrestrial life and an active researcher in this field, guided by important direct experiences that have forever redefined the boundaries of my perception. This awareness powerfully influences my artistic production: painting the cosmos, its frequencies, and its intelligences is not for me an exercise in dreamlike fantasy, but the visual translation of a superior reality." },
  "bio.filosofia.title": { it: "La filosofia del Maestro Interiore", en: "The Philosophy of the Inner Master" },
  "bio.filosofia.p1": { it: "La mia pratica artistica e concettuale è indissolubilmente legata alla meditazione e allo studio profondo delle filosofie orientali. Sento con assoluta certezza che siamo esseri immortali, scintille coscienti di un’unica energia divina che regola, attraversa e unisce l’intero cosmo.", en: "My artistic and conceptual practice is indissolubly linked to meditation and the deep study of Eastern philosophies. I feel with absolute certainty that we are immortal beings, conscious sparks of a single divine energy that regulates, traverses, and unites the entire cosmos." },
  "bio.filosofia.p2": { it: "Credo fermamente che la ricerca di una guida esterna sia spesso un’illusione o una delega: il 'Vero Maestro' risiede già dentro ognuno di noi. La mia arte non vuole essere decorazione, ma un dispositivo di risveglio; un invito a ritrovare quella guida interiore, a prendersi la responsabilità della propria luce e a riconoscere che la bellezza e la verità non sono traguardi lontani o conquiste future. Sono presenze che pulsano qui, ora, in questo esatto istante, in ogni battito e in ogni respiro.", en: "I firmly believe that the search for an external guide is often an illusion or a delegation: the 'True Master' already resides within each of us. My art does not want to be decoration, but a device for awakening; an invitation to rediscover that inner guide, to take responsibility for one's own light, and to recognize that beauty and truth are not distant goals or future conquests. They are presences that pulse here, now, in this exact instant, in every beat and in every breath." },
  "bio.filosofia.p3": { it: "Le mie opere sono inviti a sostare sulle soglie invisibili, a spiare il mondo attraverso le fessure della materia e a guardare il cielo con occhi nuovi, per ricordare, finalmente, che siamo esseri immortali in cammino verso l'Origine.", en: "My works are invitations to linger on invisible thresholds, to spy on the world through the cracks of matter, and to look at the sky with new eyes, to finally remember that we are immortal beings on a journey towards the Origin." },
  "bio.footer": { it: "Oggi vivo, ricerco e creo a Sant'Egidio, vicino a Perugia, immerso nel mio laboratorio, costantemente teso tra la terra che coltivo e il cielo infinito che esploro, sempre pronto a lasciarmi stupire dal prossimo istante di luce.", en: "Today I live, research, and create in Sant'Egidio, near Perugia, immersed in my laboratory, constantly stretched between the earth I cultivate and the infinite sky I explore, always ready to be amazed by the next moment of light." },
  // Criticism page

  // ArtworkDetail
  "artwork.enquiry": { it: "Richiedi informazioni", en: "Enquire about this work" },
  "artwork.year": { it: "Anno", en: "Year" },
  "artwork.dimensions": { it: "Dimensioni", en: "Dimensions" },
  "artwork.technique": { it: "Tecnica", en: "Technique" },
  "artwork.price": { it: "Prezzo", en: "Price" },
  "artwork.back": { it: "Back", en: "Back" },
  "artwork.meaning": { it: "Significato dell'opera", en: "Meaning of the work" },
  "artwork.purchaseOptions": { it: "Opzioni d'acquisto", en: "Purchase options" },
  "artwork.purchaseOptionsExt": { it: "Opzioni d'acquisto e supporti", en: "Purchase options & supports" },
  "artwork.technique.tshirt": { it: "Stampa", en: "Print" },
  "artwork.buyOn": { it: "Acquista su", en: "Buy on" },


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
