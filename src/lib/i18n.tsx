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

  // Bio Page - Testi Definitivi Agosto 2026
  "bio.header.tagline": { it: "L'artista della tensione tra Materia e Spirito", en: "The artist of the tension between Matter and Spirit" },
  "bio.sec1.title": { it: "L’urgenza del ritorno e le radici della Terra: L'Arte del Micro e Macrocosmo", en: "The Urgency of Return and the Roots of the Earth: The Art of Micro and Macrocosm" },
  "bio.sec1.p1": { it: "Per me l’arte non è mai stata una scelta, ma un’urgenza. Fin da bambino il disegno e la pittura sono stati i miei strumenti d’elezione per interpretare e decodificare il mondo. La vita mi ha poi guidato lungo percorsi apparentemente distanti, portandomi a una lunga fase di incubazione. In questo tempo la fiamma creativa è rimasta latente, ma non si è mai spenta: si è nutrita del silenzio, dell’ascolto e di una profonda immersione nella Natura e nelle sue leggi strutturali.", en: "For me, art has never been a choice, but an urgency. Since childhood, drawing and painting have been my chosen tools for interpreting and decoding the world. Life then guided me along apparently distant paths, leading me to a long phase of incubation. During this time, the creative flame remained latent, but never went out: it was nourished by silence, listening, and a deep immersion in Nature and its structural laws." },
  "bio.sec1.p2": { it: "La mia professione di agronomo e la mia specializzazione come Garden Designer non sono ambiti scissi dalla mia dimensione artistica, ma le sue fondamenta silenziose. Nel progettare piccoli giardini moderni, spazi contemporanei e giardini zen orientati all'essenzialità, io non faccio altro che fare arte: ricerco la proporzione aurea, l'equilibrio dei vuoti e dei pieni, e la sacralità dello spazio in cui l'energia può finalmente sprigianarsi. Che io stia calibrando l'armonia minimalista di un giardino essenziale, orchestrando la vita autosufficiente di un micro-ecosistema racchiuso nel vetro di un terrario, o studiando la forza vitale di un seme, compio lo stesso identico gesto: cerco le leggi universali dell’armonia.\n\nNel 2008 questo impulso ancestrale è tornato a divampare con una forza nuova e dirompente, trasformandosi nella necessità di dare forma visibile a ciò che normalmente rimane invisibile. Da allora, dipingo e creo a tempo pieno, vivendo l’arte come una missione e una disciplina quotidiana.", en: "My profession as an agronomist and my specialization as a Garden Designer are not fields separate from my artistic dimension, but its silent foundations. In designing small modern gardens, contemporary spaces, and zen gardens oriented towards essentiality, I am doing nothing other than making art: I search for the golden ratio, the balance of voids and solids, and the sacredness of the space in which energy can finally be released. Whether I am calibrating the minimalist harmony of an essential garden, orchestrating the self-sufficient life of a micro-ecosystem enclosed in a glass terrarium, or studying the life force of a seed, I perform the exact same gesture: I search for the universal laws of harmony.\n\nIn 2008, this ancestral impulse returned to flare up with a new and powerful force, becoming the need to give visible form to what normally remains unseen. Since then, I have been painting and creating full-time, living art as a mission and a daily discipline." },
  "bio.sec2.title": { it: "L’attrito tra Spirito e Materia: Il Motore dell'Ascensione", en: "The Friction between Spirit and Matter: The Engine of Ascension" },
  "bio.sec2.p1": { it: "Mi definisco, prima di tutto, un ricercatore. Il cuore della mia indagine risiede nell’attrito: quel conflitto fecondo, magnetico e costante tra la densità della materia e la vibrazione purissima dello spirito. Vivo una tensione costante tra il limite della materia e l'aspirazione dello spirito: sono radicato alla Terra, sperimento la gravità e il peso dell'essere 'terribilmente terrestre', eppure avverto una spinta verticale simmetrica e opposta, un'urgenza viscerale di ascendere e connettermi con l'infinito. Questo attrito non mi paralizza. È la forza che alimenta ogni mia ricerca e ogni mia opera.", en: "I define myself, first of all, as a researcher. The heart of my investigation lies in friction: that fruitful, magnetic, and constant conflict between the density of matter and the pure vibration of the spirit. I live in a constant tension between the limits of matter and the aspiration of the spirit: I am rooted to the Earth, I experience gravity and the weight of being 'terribly terrestrial', yet I feel a symmetrical and opposite vertical thrust, a visceral urgency to ascend and connect with the infinite. This tension does not paralyze me. It is the force that fuels every aspect of my research and every work I create." },
  "bio.sec2.p2": { it: "Questa tensione costante mi spinge a rifiutare i confini di un solo medium. Per me non esistono barriere o gerarchie tra la pittura materica, la fotografia e l’arte digitale. Quando incido un pannello di poliuretano, quando manipolo i pixel sullo schermo o quando scatto una fotografia, sto inseguendo la medesima rivelazione: quella luce sottile che abita dietro l’evidenza delle cose. Cerco di 'organizzare il disastro' interiore per offrire a me stesso e agli altri una forma provvisoria, ma salvifica, al mistero dell’esistenza.", en: "This constant tension pushes me to reject the boundaries of a single medium. For me, there are no barriers or hierarchies between matter painting, photography, and digital art. When I engrave a polyurethane panel, when I manipulate pixels on the screen, or when I take a photograph, I am chasing the same revelation: that subtle light that lives behind the evidence of things. I try to 'organize the interior disaster' to offer myself and others a temporary, but saving, form to the mystery of existence." },
  "bio.sec2.p3": { it: "Il critico Andrea Domenico Taricco ha definito il mio lavoro 'un demiurgo di verità intuite'. Adotto un approccio autenticamente alchemico: utilizzo pigmenti, smalti, colle e materiali plastici industriali (come i foam panels) per dare vita a opere caratterizzate da una forte tridimensionalità materica. Questa ricerca scava negli archetipi del subconscio e nelle connessioni energetiche universali, unendo l'introspezione più intima a una visione cosmica e stellare.", en: "The critic Andrea Domenico Taricco defined my work as 'a demiurge of intuited truths'. I adopt an authentically alchemical approach: I use pigments, enamels, glues, and industrial plastic materials (such as foam panels) to give life to works characterized by a strong material three-dimensionality. This research digs into the archetypes of the subconscious and universal energetic connections, combining the most intimate introspection with a cosmic and stellar vision." },
  "bio.cards.title": { it: "Geografie dell’anima: I linguaggi della mia ricerca", en: "Geographies of the Soul: The Languages of My Research" },
  "bio.cards.subtitle": { it: "Il mio percorso si articola attraverso tre canali espressivi principali che si alimentano e si amplificano a vicenda: pittura, fotografia e arte digitale. Essi non rappresentano percorsi separati, ma tre prospettive attraverso cui indago la stessa realtà invisibile.\n\nLa mia arte nasce dal desiderio di rendere visibile il processo della trasformazione, là dove materia e spirito si incontrano.", en: "My journey is articulated through three main expressive channels that feed and amplify each other: painting, photography, and digital art. They do not represent separate paths, but three perspectives through which I investigate the same invisible reality.\n\nMy art is born from the desire to make visible the process of transformation, where matter and spirit meet." },
  "bio.card1.title": { it: "La Materia (Pittura)", en: "Matter (Painting)" },
  "bio.card1.desc": { it: "La pittura di Massimo Di Stefano nasce dall'incontro tra materia, percezione e dimensione interiore. Il gesto pittorico diventa uno strumento per esplorare stati d'animo, conflitti e intuizioni che appartengono tanto all'esperienza individuale quanto a quella universale.\n\nParticolare importanza assume la materia: tavole, tele e polistirene vengono incisi, modellati e stratificati attraverso acrilici, smalti, terre e foglia d'oro. La superficie diventa parte integrante del significato: rilievi e cavità reagiscono alla luce, modificando continuamente la percezione dell'immagine. La pittura non cerca risposte definitive, ma apre spazi nei quali l'osservatore può riconoscere qualcosa di proprio.", en: "The painting of Massimo Di Stefano is born from the encounter between matter, perception, and the inner dimension. The pictorial gesture becomes a tool for exploring moods, conflicts, and intuitions that belong as much to individual experience as to the universal one.\n\nMatter takes on particular importance: panels, canvases, and polystyrene are engraved, modeled, and layered through acrylics, enamels, earths, and gold leaf. The surface becomes an integral part of the meaning: reliefs and cavities react to light, continuously modifying the perception of the image. Painting does not seek definitive answers, but opens spaces in which the observer can recognize something of their own." },
  "bio.card2.title": { it: "Lo Sguardo (Fotografia)", en: "The Gaze (Photography)" },
  "bio.card2.desc": { it: "La fotografia è lo strumento per catturare il 'miracolo' nell’ordinario. Guardare significa selezionare, attendere il momento in cui una luce o una configurazione dello spazio stabiliscono una connessione con la sensibilità dell'autore.\n\nL'osservazione del mondo naturale, del cielo e del micro-mondo degli insetti non è solo estetica, ma relazione con qualcosa di più vasto. Lo sguardo è attratto da ciò che l'immagine lascia intuire, cercando un equilibrio tra presenza concreta e significato interiore. Questo approccio ha ottenuto un riconoscimento internazionale nel 2015, quando una mia macrofotografia è stata selezionata per l'Exposure Award al Museo del Louvre di Parigi.", en: "Photography is the tool for capturing the 'miracle' in the ordinary. Looking means selecting, waiting for the moment when a light or a configuration of space establishes a connection with the author's sensitivity.\n\nThe observation of the natural world, the sky, and the micro-world of insects is not just aesthetics, but a relationship with something vaster. The gaze is attracted by what the image suggests, seeking a balance between concrete presence and inner meaning. This approach gained international recognition in 2015, when one of my macro-photographs was selected for the Exposure Award at the Louvre Museum in Paris." },
  "bio.card3.title": { it: "L'Immaginazione (Arte Digitale)", en: "Imagination (Digital Art)" },
  "bio.card3.desc": { it: "Il digitale permette di costruire immagini che non devono necessariamente partire da una realtà riconoscibile. Forme e strutture vengono trasformate e ricomposte in mondi autonomi, sospesi tra figurazione e astrazione.\n\nIn queste opere l'immagine assume un carattere visionario, un paesaggio impossibile o una realtà alternativa. Il digitale mantiene lo stesso nucleo della ricerca pittorica: l'interesse per ciò che non è immediatamente visibile. È uno spazio di libertà visiva per esplorare la coscienza e le possibilità ancora non definite dell'esperienza umana.", en: "Digital art allows for the construction of images that do not necessarily start from a recognizable reality. Forms and structures are transformed and recomposed into autonomous worlds, suspended between figuration and abstraction.\n\nIn these works, the image takes on a visionary character, an impossible landscape, or an alternative reality. Digital art maintains the same core as pictorial research: the interest in what is not immediately visible. It is a space of visual freedom to explore consciousness and the yet undefined possibilities of human experience." },
  "bio.tshirt.title": { it: "Dallo schermo al quotidiano: L'arte da indossare", en: "From the Screen to Daily Life: Wearable Art" },
  "bio.tshirt.p1": { it: "Proprio partendo dalle mie opere digitali e dalle mie creazioni visive, ho sentito il desiderio di estendere questa ricerca oltre i confini tradizionali della tela o dello schermo. Ho scelto così di trasferire le mie geometrie e le mie frequenze cromatiche su supporti d'uso quotidiano, dando vita a una linea di t-shirt e oggetti d'arte in cui i miei lavori vengono riprodotti attraverso stampe d'alta qualità.", en: "Starting precisely from my digital works and my visual creations, I felt the desire to extend this research beyond the traditional boundaries of the canvas or the screen. I thus chose to transfer my geometries and my chromatic frequencies onto daily use supports, giving life to a line of t-shirts and art objects in which my works are reproduced through high-quality prints." },
  "bio.tshirt.p2": { it: "Non si tratta di semplice merchandising, ma del tentativo di far uscire l'arte dagli spazi canonici per farla camminare nel mondo, trasformando un capo d'abbigliamento in un manifesto portatile del proprio mondo interiore.", en: "It is not simple merchandising, but an attempt to let art out of canonical spaces to make it walk in the world, transforming a piece of clothing into a portable manifesto of one's inner world." },
  "bio.cosmo.title": { it: "La Visione Cosmica e il Contatto con l'Ignoto", en: "The Cosmic Vision and the Contact with the Unknown" },
  "bio.cosmo.p1": { it: "La mia arte è strettamente interconnessa a una spiritualità profonda, libera da dogmi o religioni precostituite, che si estende oltre i confini del nostro pianeta. Lo studio dell'universo e delle sei geometrie mi pone da sempre di fronte a un dato di fact per me incontrovertibile: non siamo soli nell’universo.", en: "My art is closely interconnected with a deep spirituality, free from dogmas or pre-established religions, which extends beyond the boundaries of our planet. The study of the universe and its six geometries has always confronted me with a fact that is incontrovertible for me: we are not alone in the universe." },
  "bio.cosmo.p2": { it: "Sono un profondo fautore dell’esistenza di altre forme di vita extraterrestri e un ricercatore attivo in questo campo, anche attraverso esperienze personali che hanno profondamente trasformato il mio modo di osservare la realtà. Questa consapevolezza influisce prepotentemente sulla mia produzione artistica: dipingere il cosmo, le sei frequenze e le sue intelligenze non è per me un esercizio di fantasia onirica, ma la traduzione visiva di una realtà superiore.", en: "I am a profound advocate for the existence of other forms of extraterrestrial life and an active researcher in this field, also through personal experiences that have profoundly transformed the way I perceive reality. This awareness powerfully influences my artistic production: painting the cosmos, its frequencies, and its intelligences is not for me an exercise in dreamlike fantasy, but the visual translation of a superior reality." },
  "bio.filosofia.title": { it: "La filosofia del Maestro Interiore", en: "The Philosophy of the Inner Master" },
  "bio.filosofia.p1": { it: "La mia pratica artistica e concettuale è indissolubilmente legata alla meditazione e allo studio profondo delle filosofie orientali. Sento con assoluta certezza che siamo esseri immortali, scintille coscienti di un’unica energia divina che regola, attraversa e unisce l’intero cosmo.", en: "My artistic and conceptual practice is indissolubly linked to meditation and the deep study of Eastern philosophies. I feel with absolute certainty that we are immortal beings, conscious sparks of a single divine energy that regulates, traverses, and unites the entire cosmos." },
  "bio.filosofia.p2": { it: "Credo fermamente che la ricerca di una guida esterna sia spesso un’illusione o una delega: il 'Vero Maestro' risiede già dentro ognuno di noi. La mia arte non vuole essere decorazione, ma un dispositivo di risveglio; un invito a ritrovare quella guida interiore, a prendersi la responsabilità della propria luce e a riconoscere che la bellezza e la verità non sono traguardi lontani o conquiste future. Sono presenze che pulsano qui, ora, in questo esatto istante, in ogni battito e in ogni respiro.", en: "I firmly believe that the search for an external guide is often an illusion or a delegation: the 'True Master' already resides within each of us. My art does not want to be decoration, but a device for awakening; an invitation to rediscover that inner guide, to take responsibility for one's own light, and to recognize that beauty and truth are not distant goals or future conquests. They are presences that pulse here, now, in this exact instant, in every beat and in every breath." },
  "bio.filosofia.p3": { it: "Le mie opere sono inviti a sostare sulle soglie invisibili, a spiare il mondo attraverso le fessure della materia e a guardare il cielo con occhi nuovi, per ricordare, finalmente, che siamo esseri immortali in cammino verso l'Origine.", en: "My works are invitations to linger on invisible thresholds, to spy on the world through the cracks of matter, and to look at the sky with new eyes, to finally remember that we are immortal beings on a journey towards the Origin." },
  "bio.footer": { it: "Oggi vivo, ricerco e creo a Sant'Egidio, vicino a Perugia, nel mio laboratorio. Continuo a interrogare la materia per cercare, attraverso di essa, ciò che la trascende.", en: "Today I live, research and create in Sant'Egidio, near Perugia, in my studio. I continue to question matter in search of what transcends it." },
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

  // Certificate of authenticity
  "cert.title": { it: "Certificato di Autenticità Digitale", en: "Digital Certificate of Authenticity" },
  "cert.intro1": { it: "Quest'opera è registrata ufficialmente nell'", en: "This artwork is officially registered in the " },
  "cert.archiveName": { it: "Archivio Storico Massimo Di Stefano", en: "Massimo Di Stefano Historical Archive" },
  "cert.intro2": { it: ". L'autenticità e la provenienza sono garantite dall'artista.", en: ". Authenticity and provenance are guaranteed by the artist." },
  "cert.archiveCode": { it: "Codice Archivio", en: "Archive Code" },
  "cert.verifiedTitle": { it: "AUTENTICITÀ VERIFICATA.", en: "AUTHENTICITY VERIFIED." },
  "cert.verifiedBody": { it: "Si conferma ufficialmente che l'opera in tuo possesso è l'originale catalogato nell'Archivio Ufficiale.", en: "We officially confirm that the artwork in your possession is the original catalogued in the Official Archive." },
  "cert.dedicationLabel": { it: "Dedica Privata dell'Artista", en: "Private Dedication from the Artist" },
  "cert.ownerPrompt": { it: "Sei il proprietario dell'opera? Inserisci il codice segreto per la validazione ufficiale.", en: "Are you the owner of this artwork? Enter your secret code for official validation." },
  "cert.codePlaceholder": { it: "Codice segreto", en: "Secret code" },
  "cert.verify": { it: "Verifica", en: "Verify" },
  "cert.errorConnection": { it: "Errore di connessione. Riprova tra qualche istante.", en: "Connection error. Please try again in a moment." },
  "cert.errorInvalid": { it: "Codice non valido. Verifica di aver inserito il codice corretto fornito al momento dell'acquisto.", en: "Invalid code. Please check that you entered the correct code provided at the time of purchase." },
  "cert.download": { it: "Scarica Certificato di Autenticità Ufficiale", en: "Download Official Certificate of Authenticity" },
  "cert.close": { it: "Chiudi", en: "Close" },
  "cert.privateCollection": { it: "Collezione privata", en: "Private collection" },

  // Audio
  "audio.play": { it: "Play Music", en: "Play Music" },
  "audio.mute": { it: "Mute", en: "Mute" },

  // Artwork action bar tooltips
  "artwork.tt.like": { it: "Mi piace", en: "Like" },
  "artwork.tt.wishlist": { it: "Aggiungi ai preferiti", en: "Add to favourites" },
  "artwork.tt.info": { it: "Richiedi informazioni", en: "Request information" },
  "artwork.tt.pdf": { it: "Scarica scheda opera (PDF)", en: "Download artwork sheet (PDF)" },
  "artwork.tt.share": { it: "Condividi", en: "Share" },
  "artwork.notFound": { it: "Opera non trovata.", en: "Artwork not found." },
  "artwork.priceOnRequest": { it: "Prezzo su richiesta", en: "Price on request" },

  // Info request dialog
  "info.title": { it: "Informazioni / Richieste", en: "Information / Enquiries" },
  "info.desc": { it: "Seleziona il tipo di richiesta e descrivi il tuo interesse.", en: "Select the type of enquiry and describe your interest." },
  "info.namePh": { it: "Nome", en: "Name" },
  "info.emailPh": { it: "Email", en: "Email" },
  "info.messagePh": { it: "Messaggio...", en: "Message..." },
  "info.send": { it: "Invia richiesta", en: "Send request" },
  "info.sending": { it: "Invio...", en: "Sending..." },
  "info.sent": { it: "Richiesta inviata ✓", en: "Request sent ✓" },
  "info.sentSub": { it: "Riceverai una risposta al più presto.", en: "You will receive a reply as soon as possible." },
  "info.type.purchase": { it: "Acquisto", en: "Purchase" },
  "info.type.exhibition": { it: "Esposizione", en: "Exhibition" },
  "info.type.collaboration": { it: "Collaborazione", en: "Collaboration" },
  "info.type.print": { it: "Stampa", en: "Print" },
  "info.type.licensing": { it: "Licensing", en: "Licensing" },

  // Filter panel
  "filter.title": { it: "Filtra le opere", en: "Filter artworks" },
  "filter.search": { it: "Titolo", en: "Title" },
  "filter.searchPlaceholder": { it: "Cerca per titolo…", en: "Search by title…" },
  "filter.open": { it: "Filtra", en: "Filter" },
  "filter.soon": { it: "Filtri in arrivo", en: "Filters coming soon" },
  "filter.close": { it: "Chiudi", en: "Close" },
  "filter.year": { it: "Anno", en: "Year" },
  "filter.allYears": { it: "Tutti gli anni", en: "All years" },
  "filter.shape": { it: "Forma", en: "Shape" },
  "filter.support": { it: "Supporto", en: "Support" },
  "filter.price": { it: "Fascia di prezzo", en: "Price range" },
  "filter.genre": { it: "Genere", en: "Genre" },
  "filter.colors": { it: "Colori dominanti", en: "Dominant colours" },
  "filter.reset": { it: "Rimuovi filtri", en: "Clear filters" },
  "filter.apply": { it: "Applica", en: "Apply" },
  "filter.noResults": { it: "Nessun risultato trovato", en: "No results found" },
  "filter.price.0-500": { it: "€ 0–500", en: "€ 0–500" },
  "filter.price.500-1000": { it: "€ 500–1.000", en: "€ 500–1,000" },
  "filter.price.1000-3000": { it: "€ 1.000–3.000", en: "€ 1,000–3,000" },
  "filter.price.3000+": { it: "Oltre € 3.000", en: "Over € 3,000" },

  // Shapes
  "shape.Quadrato": { it: "Quadrato", en: "Square" },
  "shape.Rettangolare": { it: "Rettangolare", en: "Rectangular" },
  "shape.Altro": { it: "Altro", en: "Other" },

  // Genres
  "genre.Astratto": { it: "Astratto", en: "Abstract" },
  "genre.Figurativo": { it: "Figurativo", en: "Figurative" },

  // Supports
  "support.Tela": { it: "Tela", en: "Canvas" },
  "support.Tavola": { it: "Tavola", en: "Wood panel" },
  "support.Polistirene": { it: "Polistirene", en: "Polystyrene" },
  "support.Carta": { it: "Carta", en: "Paper" },
  "support.Forex": { it: "Forex", en: "Forex" },
  "support.Acetato": { it: "Acetato", en: "Acetate" },
  "support.Faesite": { it: "Faesite", en: "Hardboard" },

  // Colours
  "color.Nero": { it: "Nero", en: "Black" },
  "color.Bianco": { it: "Bianco", en: "White" },
  "color.Grigio": { it: "Grigio", en: "Grey" },
  "color.Oro": { it: "Oro", en: "Gold" },
  "color.Argento": { it: "Argento", en: "Silver" },
  "color.Bronzo": { it: "Bronzo", en: "Bronze" },
  "color.Rosso": { it: "Rosso", en: "Red" },
  "color.Blu": { it: "Blu", en: "Blue" },
  "color.Verde": { it: "Verde", en: "Green" },
  "color.Giallo": { it: "Giallo", en: "Yellow" },
  "color.Arancione": { it: "Arancione", en: "Orange" },
  "color.Viola": { it: "Viola", en: "Purple" },
  "color.Rosa": { it: "Rosa", en: "Pink" },
  "color.Marrone": { it: "Marrone", en: "Brown" },
  "color.Ocra": { it: "Ocra", en: "Ochre" },
  "color.Beige": { it: "Beige", en: "Beige" },
  "color.Turchese": { it: "Turchese", en: "Turquoise" },
  "color.Azzurro": { it: "Azzurro", en: "Light blue" },

  // Newsletter (contact block)
  "nl.label": { it: "Newsletter", en: "Newsletter" },
  "nl.emailPh": { it: "La tua email", en: "Your email" },
  "nl.cta": { it: "Segui il mio percorso creativo", en: "Follow my creative journey" },
  "nl.thanks": { it: "Grazie! Iscrizione registrata.", en: "Thank you! Subscription registered." },
  "nl.error": { it: "Errore, riprova.", en: "Error, please retry." },

  // Archive hub
  "archive.subtitle": { it: "Mostre, video, critiche e materiali documentali del percorso artistico.", en: "Exhibitions, videos, critical texts and documentary materials of the artistic journey." },
  "archive.comingSoon": { it: "Contenuto in arrivo", en: "Coming soon" },
  "archive.card.mostre": { it: "Mostre", en: "Exhibitions" },
  "archive.card.video": { it: "Video", en: "Videos" },
  "archive.card.download": { it: "Download", en: "Downloads" },
  "archive.card.critiche": { it: "Critiche", en: "Critical texts" },
  "archive.card.progetti": { it: "Altri Progetti", en: "Other Projects" },
  "archive.card.selezione": { it: "La mia selezione", en: "My selection" },
  "archive.mostre.title": { it: "Mostre", en: "Exhibitions" },
  "archive.percorso": { it: "Percorso Espositivo", en: "Exhibition Path" },

  // Social tooltips
  "social.linktree": { it: "Tutti i link", en: "All links" },
  "social.facebook": { it: "Seguimi su Facebook", en: "Follow me on Facebook" },
  "social.x": { it: "Seguimi su X", en: "Follow me on X" },
  "social.instagram": { it: "Seguimi su Instagram", en: "Follow me on Instagram" },

  // AI summary (Bio)
  "bio.ai.title": { it: "Chi è Massimo Di Stefano", en: "About Massimo Di Stefano" },
  "bio.ai.body": {
    it: "Massimo Di Stefano è un artista visivo italiano (nato nel 1965, vive e lavora a Sant'Egidio, Perugia). La sua ricerca si sviluppa su tre linguaggi — pittura materica, fotografia e arte digitale — attorno alla tensione tra materia e spirito e a una visione cosmica e visionaria. Agronomo e garden designer di formazione, dal 2008 si dedica a tempo pieno all'arte. Nel 2015 una sua macrofotografia è stata selezionata per l'Exposure Award al Museo del Louvre di Parigi.",
    en: "Massimo Di Stefano is an Italian visual artist (born 1965, lives and works in Sant'Egidio, Perugia). His research develops across three languages — matter painting, photography and digital art — around the tension between matter and spirit and a cosmic, visionary vision. Trained as an agronomist and garden designer, he has devoted himself full-time to art since 2008. In 2015 one of his macro-photographs was selected for the Exposure Award at the Louvre Museum in Paris.",
  },
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
