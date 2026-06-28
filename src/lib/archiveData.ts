/**
 * ============================================================
 *  ARCHIVIO – Dati centralizzati
 * ============================================================
 *  Questo è l'UNICO file da modificare per gestire i contenuti
 *  della sezione Archive del sito.
 *
 *  Struttura cartelle immagini consigliata:
 *    public/archive/exhibitions/{id}/
 *    public/archive/projects/{id}/
 *    public/archive/materials/
 *    public/archive/texts/
 *
 *  Video: basta l'ID di YouTube (es. "x9ZMeR7e4MU")
 *
 *  Regola d'oro: campi vuoti = niente puntino / niente card.
 *  Il sito si adatta automaticamente ai contenuti presenti.
 * ============================================================
 */

// ─── Tipi ────────────────────────────────────────────────────

/** Contenuto multimediale generico usato in popup editoriali e materiali timeline. */
export interface MediaItem {
  type: "image" | "video" | "youtube" | "pdf" | "doc" | "link" | "text";
  src?: string;
  youtubeId?: string;
  title?: string;
  description?: string;
  /** Testo lungo (per type "text"). Supporta markdown semplice. */
  content?: string;
  thumbnail?: string;
  fileSize?: string;
}

export interface Exhibition {
  id: string;
  title: string;
  year: string;
  location: string;
  description: string;
  images: string[];
  catalogPdf?: string;
  published?: boolean;
}

export interface ArchiveVideo {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeId: string;
  published?: boolean;
}

export interface DownloadMaterial {
  id: string;
  title: string;
  description: string;
  /** Percorso file in public/, es. "/downloads/catalogo.pdf" */
  file: string;
  size: string;
  type: string;
}

/**
 * Critica editoriale.
 * - `body` è il testo lungo (markdown semplice: paragrafi separati da riga vuota,
 *   *corsivo* con asterischi, **grassetto** con doppi asterischi).
 * - `materials` è opzionale: se contiene almeno 1 elemento, vengono mostrati
 *   nel popup sotto al testo.
 */
export interface Criticism {
  id: string;
  slug: string;
  title: string;
  author: string;
  year?: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  materials?: MediaItem[];
  published?: boolean;
}

/** Voce della timeline "Percorso Espositivo". */
export interface TimelineEntry {
  /** ID stabile univoco usato per ancora/popup. */
  id: string;
  /** Testo della voce (singola riga, può contenere virgola, virgolette). */
  text: string;
  /** Nota in seconda riga (es. curatori, dettagli). */
  note?: string;
  /** Materiali extra: se presenti, mostra il puntino pulsante. */
  materials?: MediaItem[];
}

export interface TimelineYear {
  year: string;
  entries: TimelineEntry[];
}

export interface OtherProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  media: MediaItem[];
  longDescription?: string;
  tags: string[];
  layout?: "grid" | "masonry" | "list";
  published?: boolean;
}

// ─── Dati ────────────────────────────────────────────────────

/**
 * MOSTRE — griglia interna /archive/mostre.
 * Card iniziale: "Percorso Espositivo" (timeline).
 * Aggiungi qui future card mostra (cataloghi singoli, eventi dedicati, ecc.).
 */
export const exhibitions: Exhibition[] = [];

/**
 * VIDEO
 */
export const videos: ArchiveVideo[] = [
  {
    id: "1",
    title: "Massimo Di Stefano, Viaggio nell'inconscio 1",
    category: "Arte",
    description: "Esplorazione artistica del subconscio attraverso la pittura",
    youtubeId: "x9ZMeR7e4MU",
    published: true,
  },
  {
    id: "2",
    title: "Massimo Di Stefano, Viaggio nell'inconscio 2",
    category: "Arte",
    description: "Seconda parte del viaggio nell'arte interiore",
    youtubeId: "_T-mymcG4sw",
    published: true,
  },
];

/**
 * MATERIALI SCARICABILI
 * Carica i file in public/downloads/
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
 * CRITICHE — griglia /archive/critiche, espandibile.
 * Per aggiungere una nuova critica, basta aggiungere un oggetto a questo array.
 * Il sistema crea automaticamente card + rotta /archive/critiche/{slug}.
 */
export const criticisms: Criticism[] = [
  {
    id: "1",
    slug: "critica-andrea-domenico-taricco",
    title: "Critica dott. Andrea Domenico Taricco",
    author: "dott. Andrea Domenico Taricco",
    excerpt:
      "Psicocreativismo siderale: Di Stefano attraversa il creato e lo congela matericamente, traducendo la materia in spirito.",
    published: true,
    body: `## Psicocreativismo siderale

*Massimo Di Stefano*

> "Angelo Nithael: Signore dell'equilibrio perfetto. Bellezza abbagliante. Armonia che si riversa sul Creato. Tocca, o Eterno, il mio corpo malato e fa di Me l'ago fedele della tua bilancia"
>
> *Tratto da: Preghiere agli Angeli. Haziel con Anna Alba*

Quando pensiamo ad un artista della contemporaneità immaginiamo sicuramente ad un intellettuale insofferente chiuso nel proprio studio ad affogare le proprie frustrazioni in proiezioni pittoriche dettate dal caso. Macchie di colore sul pavimento, sugli abiti e sul supporto ridotto a contenitore razionale di tutto ciò che è stato dettato dall'impeto involontario di una ferocia latente. I figli del secolo breve hanno ereditato questa rabbia. Hanno assorbito l'incubo della devastazione nucleare in cui le differenze raziali hanno imploso lo spirito del mondo riducendolo a vittima sacrificale sugli altari dell'anima.

Non è il caso di Massimo Di Stefano. Artista eclettico, intenso, profondo. Lui attraversa il creato e lo congela matericamente dilatandolo sul supporto. Figlio della tradizione creativa novecentesca ha ampliato ed approfondito mediante la propria esperienza il suo gusto estetico sino ad approdare in una sorta di terra di nessuno ove la logica e la fantasia convivono in un unicum indefinito in cui solo lo spirito trova rifugio.

Guarda, osserva, vede. Si cala nelle atmosfere dettate dal mondo circostante e le traduce in arte restituendocele dilatate mediante una sensibilità fuori dal comune. Di Stefano è un artista *sui generis*. Possiede un grado di umanità dettata da una sensibilità finissima. Mediante la materia e l'assidua ricerca tecnica congela gli elementi ed in essi, infatti, ritrova l'anima del mondo: il cuore profondo delle cose.

Mentre il mondo è in lotta ed i popoli scatenano inferni di potere, Di Stefano elabora viaggi siderali atti a purificare la vanità d'un mondo globalizzato che gradualmente sta perdendo il senso profondo delle cose, dei sentimenti reciproci e della bellezza.

In Lui vive questa gioia o speranza, anche se implode a tratti in sé stessa sino a perdere il nesso con le aspettative.

Questo non deve scoraggiarlo, anzi, deve spronarlo a cercare ancora e farci viaggiare nei suoi mondi sommersi. Sommersi perché decantano scientificamente la Natura circostante sondandola in particelle strutturali sino all'origine archetipica ed a sub-unità che ricercano la grandezza di un Dio lontano perché sconosciuto a noi tutti ma presente in essenza. "Dentro…." dice l'artista: "…dentro le cose è contenuta una presenza universale che guida il corso degli eventi.". Ed aggiunge mentre gli occhi brillano di un candore disarmante: "…una forza misteriosa che ha donato al Cosmo la vita e continuerà a trasmetterla attraverso le cose, oltre qualsiasi superstizione".

Lui stesso è l'angelo che dona al mondo la sua purezza e la immola in opere senza tempo. Opere che sicuramente sopravvivranno alle leggi estetiche della contemporaneità e che verranno lette attraverso codici culturali delle epoche di riferimento. Ma i gradi di ricezione sono fugaci. Queste opere sono eterne e manterranno sempre le matrici ideali che l'artista ha infuso cromaticamente sui supporti derivando formulazioni archetipiche universali.

Pensiamo a *"Pensieri in evoluzione"* (2014), una tecnica mista su polistirene in cui sembra dilatare le possibilità neuronali in slanci passionali di colore che diviene via via in forme direzionali. Stesse considerazioni valide per *"Tempesta emotiva"* (2013) o *"Nelle profondità del subconscio"* (2014), opere in cui i pensieri prendono forma ed i colori indagano simbolicamente la natura di queste proiezioni interiori.

È da qui che tutto parte. La mente diviene la sede entropica di una forza smisurata ed incommensurabile. *"Ancient traces"* (2014) così come *"Dancing in the limbic world"* (2012), costituiscono uno slancio verso il mondo superiore, quasi come se la mente fosse interconnessa ad una rete cosmica di energia pura. La ratio si eleva ad un grado di spiritualità cosmica ed il viaggio ha inizio.

Pensiamo a *"Dentro il tempo"* (2011) una tecnica mista realizzata su pannello di legno, in cui interconnette i pensieri al tempo esteriore, generatore dello spazio e delle forme circoscritte da uno stato momentaneo della materia. Discorso comparabile ad un'altra opera metafisica come *"Le pieghe dell'anima"* (2011), una tecnica mista su tavola in cui il tempo si congela ed il corpo diviene sintesi perfetta d'un discorso superiore. *"Before the creation"* (2014) così come *"Inside the heart"* (2012), guarda in superficie con gli occhi interiori di un viaggiatore siderale ed attraversa il macrocosmo in *"Unforgettable dream"* (2014) così come in *"Bassa marea"* (2012) fino a capolavori indiscussi come *"Before the creation"* (2014), quando il miracolo della vita così come noi la concepiamo in questo stadio, non era ancora stata concepita.

*"Cosmic skin"* (2010) attraversa oramai le galassie uniformate ad un manto antropomorfico in cui vita e morte, superficie e profondità, luce e tenebra, si amalgamano concettualmente in un divenire assoluto.

La sintesi perfetta di questo viaggio sinaptico tra il micro ed il macro, tra lo spirito e la materia è rappresentato dal capolavoro intitolato *"Geoembrione"* (2011), anche questo realizzato a tecnica mista su polistirene. Un semplice corpuscolo sub-atomico viene isolato pittoricamente in una provetta espressiva, ma sondandolo con lo sguardo possiamo verificarne la potenza evocativa sino a comprenderne l'unicità compositiva. All'interno dell'agglomerato cromatico possiamo distinguere pianeti, stelle, galassie strutturate in formazioni materiche quasi indistinte dall'uniformità denotativa. Il mondo, l'universo intero e la vastità di cui facciamo parte vengono così racchiusi in un micro-organismo. Il miracolo della forma, della mente e delle cose esistenti convertono la materia in spirito. Ed è questo il processo che contraddistingue Di Stefano dagli altri artisti. È proprio attraverso la sua capacità di descriverci la materia che ci consente di attraversare lo spirito e di vederlo mediante il flusso cromatico organizzato sui supporti che utilizza.

Caratteristiche non solo evidenti mediante la pittura ma anche mediante l'ausilio della Grafica Digitale. Se la pittura è lo strumento ideale per solcare lo spazio siderale sino a scovarne le pieghe effimere, la grafica digitale ne impressiona l'essenza sublimata. Pensiamo a *"Fragment of tears"* od ai caleidoscopici universi di *"La vita…come un sogno"* od alle mirabolanti astrazioni intitolate *"La fine e l'inizio sono la stessa cosa"* sino a *"Costruttivismo decostruttivo"*. *"Soul's explosion"* ci racconta delle meraviglie del cosmo che irradiano le galassie esattamente come i sentimenti vivono nel nostro cuore. *"Your eye"* è l'immagine dilatata di un occhio umano che, come un mondo lontano agisce seguendo gli impulsi della natura. Ed il viaggio continua attraverso mondi sconosciuti come *"From a different space"* così come *"L'anima in tumulto"* sino a *"Creation"*.

E potremmo continuare con centinaia e centinaia di opere che per una via o per l'altra, per un'emozione o per un semplice slancio d'una mente ricercatrice, trasforma la materia manipolandola in un'opera senza tempo. Massimo Di Stefano è un artista psicocreativista figlio del virtualesimo per il fatto di convertire i gradi del realismo astratto precedente ad una ricerca interiore non mirata alla descrizione di ciò che è fuori di noi ma di ciò che è dentro. La sua analisi introspettiva si interconnette al tutto ritrovando nella ragione i misteri dello spirito, nei paradossi della materia la totalità dell'anima e nel cosmo infinito la grandezza dell'Ego. Parliamo di un ego smisurato capace di recepire in una foglia la vastità di Dio.

In questo senso la sua è un'arte siderale che attraversa la vastità dell'Ente di riferimento, attraversando sé stesso mediante una sensibilità fuori dal comune.

Queste le premesse per un'arte cosciente, matura ed indirizzata a tutti coloro che oltre agli occhi sono in grado di vedere con il loro cuore.`,
  },
  {
    id: "2",
    slug: "critica-oxan-clounout",
    title: "Critica Oxan Clounout",
    author: "dott. Carmine Ciccarini — artista e critico d'arte su ArteIn, con lo pseudonimo di Oxan Clounout",
    excerpt:
      "Il sentimento umano può essere rappresentato senza necessariamente ricorrere ad immagini o composizioni strutturate…",
    published: true,
    body: `## Testo critico

*a cura del dott. Carmine Ciccarini — artista e critico d'arte su ArteIn, con lo pseudonimo di Oxan Clounout*

Il sentimento umano può essere rappresentato senza necessariamente ricorrere ad immagini o composizioni strutturate e può fare a meno di una manifestazione palese, immediata che spesso solo i critici meno provetti pretendono di trovare.

Massimo Di Stefano, che all'approccio sembra un artista astratto, in realtà esprime molto più di quanto l'occhio al primo impatto riesca a cogliere.

Se osserviamo in "toto" la sua produzione artistica, dalla pittura all'arte digitale ed alla fotografia, ci accorgiamo che molte espressioni che Di Stefano veicola anche attraverso l'uso duttile di materiali poveri, di primo acchitto refrattari al lirismo, hanno una poeticità estrema anche se richiede all'osservatore di muoversi al di fuori dei normali schemi critici.

Così si percepisce il cordone ombelicale che lega l'artista abruzzese alle avanguardie italiane ed europee: evidente il senso di concetto spaziale di Fontana, ma anche una certa affinità con il gruppo Cobra, in particolare con Karel Appel e Jorn, specie nei suoi lavori più materici in cui l'uso della vernice si lega agli smalti e, spesso, a toni forti ipercromatici; la terza dimensione che talora si apprezza in certe sue opere evoca i lavori del gruppo Azimuth, quelli creati con smalti e gesso diversamente dosati a formare un reale concetto spaziale, molto vicini anche alle espressioni tanto care ad un altro grandissimo artista di nome Anselm Kiefer; nelle sue opere digitali, concepite nel binomio espressione visiva ed espressione musicale ossessiva e ripetitiva, si intuiscono i concetti elaborati da un giovane e talentuoso artista americano, Cory Arcangel, seppure rielaborati in modo assolutamente personale.

Non è certo intenzione di Di Stefano citare tali autori: egli possiede una tecnica spesso intuitiva ed a volte selvaggia, una insita capacità di essere medium di profondi e nascosti sentimenti dell'uomo, attinti negli archetipi dell'inconscio collettivo che travalica e supera l'estetica fine a se stessa.

Di Stefano si muove in un campo sottile, sospeso in una forma di dicotomia psicologica, un efficace incontro tra razionalità e "follia".

Le opere pittoriche e fotografiche di Di Stefano manifestano una urgenza spasmodica e feroce di trasmettere sentimenti sofferti, propria di colui che si muove in una sorta di trance ispirata; egli è alchimista e demiurgo di verità talvolta solo intuite dallo stesso autore.

Da questo intimo contrasto nascono le sue creazioni, senza dubbio originali in certi aspetti, le quali, ancorché vi si rinvenga un comune denominatore artistico, lasciano prefigurare una personalissima evoluzione che si sintetizzerà in pura innovazione.

Ci colpisce profondamente questo artista che nei suoi lavori esprime un senso di libertà raro ed una spiccata, istintiva capacità elaborativa.

Il cinetismo, il concetto spaziale, il monocromatismo di certe opere e il policromatismo di altre, coniugate al senso cinetico, non rappresentano la citazione estetica di correnti artistiche ma sono proprie dell'artista, espressione inconscia di una sua intelligente e personale ricerca di un'arte nuova nei meandri di uno spirito colto ed irrequieto.

*Oxan Clounout — critico d'arte su ArteIn*`,
  },
  {
    id: "3",
    slug: "critica-luciano-lepri",
    title: "Critica dott. Luciano Lepri",
    author: "dott. Luciano Lepri — critico d'arte e giornalista",
    excerpt:
      "Una pittura di sperimentazione nei materiali, nelle tecniche, nei supporti: immersioni in mondi scomparsi o futuristiche visioni di mondi lontani.",
    published: true,
    body: `## Massimo Di Stefano

*a cura del dott. Luciano Lepri — critico d'arte e giornalista*

La sua è una pittura di sperimentazione sia nei materiali, che nelle tecniche, che nei supporti; sperimentazione che porta a risultati di interessante livello formale e contenutistico, dove nella ricerca ispirata a suggestioni astratto-informali è dato cogliere una particolare attenzione per i materiali che vanno a determinare le immagini ed il loro collocarsi nella spazialità del quadro con soggetti che diventano simboliche presenze di sicura presa ed effetto, al punto che la felice vena creativa ed immaginifica ed il misterioso formarsi dell'immagine costituisce l'effetto più rilevante delle composizioni che appaiono come immersioni in mondi scomparsi o futuristiche visioni di mondi lontani e ignoti.

*Luciano Lepri — critico d'arte e giornalista*`,
  },
  {
    id: "4",
    slug: "dicono-di-me",
    title: "Dicono di me",
    author: "Voci, lettere, testimonianze",
    excerpt:
      "Raccolta di pensieri, lettere e testimonianze di critici, artisti, collezionisti, follower e amici.",
    published: true,
    body: `## Dicono di me

> "La grandezza estetica di questo Genio Visionario è dettata dalla capacità di vedere oltre il velo delle apparenze, riscoprendo ciò che è celato dietro la fitta coltre della materia. Attraverso l'atto di vedere, fissare e congelare l'esistente lo purifica riportando in superficie l'anima."
>
> — **Dott. Andrea Domenico Taricco** — critico d'arte

> "Grande artista!! Poesia e luce insieme… passione e inconscio si incrociano in immagini rapide e concrete… Raccontano di te e del tuo intimo… Congratulazioni!!"
>
> — **Nino Sanna** — follower, Roma

> "Le opere di Massimo Di Stefano non solo denotano la padronanza del mezzo espressivo, ma suscitano emozioni a livello quasi subliminale."
>
> — **Michele Spirito** — Università di Napoli "Federico II"

> "Le sue opere sono estremamente belle e interessanti. Ci fanno vedere un aspetto diverso di questa realtà. Ci portano in una diversa dimensione."
>
> — **Marisa Maffei** — Accademia di Belle Arti di Ferrara

> "Exquisite works. Inspiring and inspired, soulful art."
>
> — **Liz Crock** — follower, Melbourne

> "Artista poliedrico e vulcano di idee. Dai quadri al digitale alle foto. Sensazionali! Grandissimo!"
>
> — **Valterio Crecchia** — follower, Pescara

> "Bellissime opere, sono rimasto meravigliato delle emozioni che hanno trasmesso!!!"
>
> — **Nik Deli** — follower, Roma

> "Lavori incredibili, da cui traspare tecnica e passione. E quando riescono a viaggiare insieme, il connubio è perfetto!!!"
>
> — **Michele Berlot** — artista, Firenze

> "I quadri di Massimo Di Stefano sono molto significativi, perché ci mette la propria anima. Respirano la spiritualità, l'Universo verso di noi…"
>
> — **Dominika Suchá Matano** — cliente, Perugia

> "Foto che sembrano dipinti e dipinti che sembrano foto! L'arte non ha limiti e la bellezza si può esprimere in infiniti modi. Complimenti."
>
> — **Vincenzo Basile** — follower

> "Bello stile, originale evocativo… a volte onirico. Tra sogno e realtà. Bravo, non c'è che dire…"
>
> — **Laura Lauretta** — follower

> "Le foto sono fantastiche tra il sogno e il futuro. Anche nei quadri si vede connubio fra sogno e realtà. L'opera d'arte come la intende Nietzsche."
>
> — **Carmine Ciccarini** — artista e critico d'arte

> "Massimo, your works go in the depth of the soul. You really are able to seize the transient moment!"
>
> — **Dott. Franco Bascietto** — La Sapienza

> "A marvelous compromise among modern graphics and expressionism. I like it so much."
>
> — **Pietro Piezaroth** — follower

> "Massimo Di Stefano creates works that capture the feeling at that moment in time — emotional."
>
> — **Bylocalartist.com**

> "Massimo Di Stefano gives voice to the need of nature of human beings, his camera looks for elements of life: fire, water, air, earth and represent them with pictures full of deep realism."
>
> — **Mauro Di Carlo** — cliente e collezionista d'arte

> "Sono Anna Soricaro, direttrice della Fondazione Giuseppe De Nittis di Barletta. Ho avuto modo di visionare alcuni suoi lavori su internet, studiare il suo sito e apprezzare la sua ricerca. Mi permetto di scriverle per complimentarmi per quella verve che ho letto in tutta la sua produzione così poliedrica, intrisa di pittura, fotografia, digital art. Ho studiato a lungo la produzione pittorica e sono colpita dalla gran classe che riesce ad affidare ad ogni opera. L'apporto della materia, sperimentazione e ricerca insieme, contribuisce ad una resa finale ricolma di carattere e determinazione, come ben si nota in opere 'Balance', 'Addensamento anima ore 4.00', 'Coscienza', 'Gesù', 'Ghosts', in cui colore e materia ben si combinano per soluzioni di grande spessore. Non sono riuscita a vedere le sue t-shirt, mentre ritengo intrigante la sua digital art. La sua arte è pregevole; mi piacerebbe per questo parlarle e proporle una collaborazione con il nostro staff."
>
> — **Anna Soricaro** — direttrice, Fondazione Giuseppe De Nittis, Barletta

> "I quadri tuoi papà sono fatti con tanta passione."
>
> — **Francy Disty**

> "Buongiorno Massimo, piacere di conoscerla! Sono Miriam Aquino, una sua concittadina. Mi sono imbattuta casualmente nei suoi lavori e ci tenevo a farle tanti complimenti, sono splendidi! Sono una fan (assolutamente amatoriale) dei quadri astratti e nei suoi ho trovato la giusta misura. Stupende le tecniche con le quali 'esce' dalla tela lasciando agli elementi vita propria… ho un debole per due in particolare, ma sono meravigliosi tutti! Business plan familiare permettendo, spero di diventare presto sua acquirente! Grazie per il suo gusto artistico nel quale mi sono totalmente rispecchiata! Un saluto, a presto!"
>
> — **Miriam Aquino** — follower`,
  },
];

/**
 * TIMELINE — "Percorso Espositivo"
 * Raggruppata per anno. Per attivare il puntino pulsante su una voce,
 * basta aggiungere il campo `materials: [...]` con almeno 1 MediaItem.
 * Voci senza `materials` non mostrano alcun puntino (comportamento automatico).
 */
export const timeline: TimelineYear[] = [
  {
    year: "2010",
    entries: [
      { id: "2010-01", text: "Mostra Personale, Caffè Letterario, Foligno (PG)" },
      { id: "2010-02", text: "Mostra Collettiva 'Immagini, parole, suoni di Primavera', IPSO Art Gallery, Perugia" },
      { id: "2010-03", text: "Mostra Collettiva 'Music is Art', Villa Perusia, Perugia" },
      { id: "2010-04", text: "Mostra Personale 'Terra Cosmo Anima', Galleria Porto Franco, Perugia" },
      { id: "2010-05", text: "Mostra Collettiva 'Viaggi per immagini', Galleria Vista, Roma" },
      { id: "2010-06", text: "Mostra Collettiva Internazionale 'L'equilibrio degli zingari', Galleria degli Zingari, Roma" },
      { id: "2010-07", text: "Mostra Collettiva 'Forma di espressione' (Evento 'Corto circuito'), Galleria IROKO, Milano" },
      { id: "2010-08", text: "Mostra Collettiva 'Red Art', Villa Perusia, Perugia" },
    ],
  },
  {
    year: "2011",
    entries: [
      { id: "2011-01", text: "Mostra Collettiva Internazionale 'Sight: Il Senso della Vista', Galleria degli Zingari, Roma" },
      { id: "2011-02", text: "Mostra Collettiva 'La Voce dell'Arte', Galleria IROKO, Milano" },
      { id: "2011-03", text: "Mostra Collettiva 'Psiche & Amore', Galleria Serenarte, Bologna" },
      { id: "2011-04", text: "Mostra Collettiva Internazionale 'Taste: Il Senso del Gusto', Galleria degli Zingari, Roma" },
      { id: "2011-05", text: "Mostra Collettiva '80.000 cm² in volto, in cielo, in terra', Studio Gabelli, Milano" },
      { id: "2011-06", text: "Mostra Collettiva 'Immagini, Suoni, Parole', IPSO Art Gallery, Perugia" },
    ],
  },
  {
    year: "2012",
    entries: [
      { id: "2012-01", text: "Mostra Collettiva 'Masquerade', Galleria Saman, Roma" },
      { id: "2012-02", text: "Mostra Collettiva 'Immagini, Suoni, Parole d'Estate', IPSO Art Gallery, Perugia" },
    ],
  },
  {
    year: "2013",
    entries: [
      { id: "2013-01", text: "Partecipazione alla Biennale d'Arte di Brescia, Brescia" },
    ],
  },
  {
    year: "2014",
    entries: [
      {
        id: "2014-01",
        text: "1° Simposio Internazionale di Arte Digitale, Museo Barbella, Chieti",
        note: "a cura del Prof. Massimo Pasqualone",
      },
      { id: "2014-02", text: "Premio Primavera, Galleria Lagostiniana, Roma" },
      { id: "2014-03", text: "Mostra Personale, Caffè Nanni, Piombino (LI)" },
      { id: "2014-04", text: "Mostra Collettiva Digital Art 'Unpainted', Art Meet Gallery, Milano" },
      {
        id: "2014-05",
        text: "Mostra Collettiva di Arte Digitale 'Stabiae: Arte senza ostacoli', Reggia di Quisisana, Castellammare di Stabia (NA)",
      },
      { id: "2014-06", text: "Premio Arte d'Autunno, Sala Protomoteca del Campidoglio, Roma" },
      {
        id: "2014-07",
        text: "Mostra Personale, Galleria 'Rinascenza Contemporanea', Pescara",
        note: "a cura del Dott. Andrea Domenico Taricco",
      },
    ],
  },
  {
    year: "2015",
    entries: [
      {
        id: "2015-01",
        text: "Mostra Collettiva, Spazio espositivo Aurum, Pescara",
        note: "a cura del Prof. Massimo Pasqualone",
      },
      { id: "2015-02", text: "Mostra Personale, Galleria 'Città del futuro', Mandarini, Perugia" },
      { id: "2015-03", text: "Selezionato come Artista Permanente, Associazione 'Ventitrezerouno' (Catalogo dedicato)" },
      { id: "2015-04", text: "Mostra Collettiva, Spazio espositivo Altresì, Nepi (VT)" },
      {
        id: "2015-05",
        text: "Fifth Annual Exposure Award (See Me): Selezionato per esporre un'opera di microfotografia al Museo del Louvre, Parigi",
      },
      {
        id: "2015-06",
        text: "Mostra Collettiva Itinerante 'Arte nei borghi', Associazione Lejo",
        note: "a cura del Prof. Massimo Pasqualone",
      },
      {
        id: "2015-07",
        text: "Mostra Collettiva 'Quando l'arte incontra il Jazz', Hotel Giò, Perugia",
        note: "a cura di Ass. Oxygene, con il Prof. Giorgio Gregorio Grasso",
      },
      {
        id: "2015-08",
        text: "Simposio Internazionale 'Il silenzio dell'anima', Galleria Serafini, Montesilvano (PE)",
        note: "a cura del Prof. Massimo Pasqualone",
      },
      {
        id: "2015-09",
        text: "Mostra Collettiva 'Anima in cornice 2', Museo di Arte Moderna 'Vittoria Colonna', Pescara",
        note: "a cura del Prof. Duccio Trombadori",
      },
      {
        id: "2015-10",
        text: "XXIII Concorso Internazionale di Pittura e Scultura 'Premio G. D'Annunzio', Aurum, Pescara",
      },
    ],
  },
  {
    year: "2016",
    entries: [
      {
        id: "2016-01",
        text: "Mostra Collettiva 'Variatio delectat', Galleria Federico Barocci, Collegio Raffaello, Urbino",
        note: "a cura del Prof. Zazzeroni",
      },
      {
        id: "2016-02",
        text: "Quotazione Artistica: Partecipazione all'asta curata da 'Picenum Arte' e inserimento come artista quotato su Ars Value, Art Price e Saleroom",
      },
      { id: "2016-03", text: "Mostra Collettiva 'Radici (Terra)', Castello Orsini, Avezzano (AQ)" },
      {
        id: "2016-04",
        text: "Mostra Collettiva, Fortezza di Civitella del Tronto (TE)",
        note: "Organizzata dal Prof. Massimo Pasqualone con la presenza di Vittorio Sgarbi",
      },
    ],
  },
];

/**
 * ALTRI PROGETTI — sezioni espandibili (UFO, Bonsai, Micro-ecosistemi, ecc.)
 */
export const otherProjects: OtherProject[] = [
  {
    id: "micro-ecosistemi",
    slug: "micro-ecosistemi",
    title: "Micro-Ecosistemi in Bottiglia",
    category: "Installazioni",
    description: "Creazione di ecosistemi autosufficienti in contenitori di vetro",
    tags: ["natura", "sostenibilità", "arte ambientale"],
    layout: "grid",
    published: false,
    media: [],
  },
];

// ─── Helper ──────────────────────────────────────────────────

export const getExhibitions = () => exhibitions;
export const getVideos = () => videos;
export const getDownloads = () => downloads;
export const getCriticisms = () => criticisms;
export const getOtherProjects = () => otherProjects;
export const getTimeline = () => timeline;
export const getCriticismBySlug = (slug: string) => criticisms.find((c) => c.slug === slug);
export const getOtherProjectBySlug = (slug: string) => otherProjects.find((p) => p.slug === slug);
