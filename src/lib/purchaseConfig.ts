// Configurazione centralizzata delle opzioni d'acquisto.
// Separata dal catalogo opere (artworkData.ts, generato dall'Excel).
// NOTA: prezzi, misure e testi qui sotto sono PROVVISORI, da sostituire con quelli reali.

export type Shape = "Quadrato" | "Rettangolare";
export type Discipline = "painting" | "photography" | "digital-art" | "t-shirt";

export interface FrameColor {
  id: string; label: string; labelEn: string;
  extraPrice: number; // € in più rispetto al prezzo base della cornice
  image?: string; // es. "/purchase/frames/52x42-bianco.webp"
}

export interface FrameModel {
  id: string;
  label: string; // misura esterna, es. "52 x 42 cm"
  shape: Shape;
  depthCm: number; // profondità cornice
  glazing: { it: string; en: string }; // es. vetro di protezione / plexiglass
  withMat?: { printSize: string; price: number }; // con passepartout: misura stampa visibile
  withoutMat?: { printSize: string; price: number }; // senza passepartout: stampa a tutto formato
  colors: FrameColor[];
}

export interface PrintSupport {
  id: string; label: string; labelEn: string;
  description: string; descriptionEn: string;
  sizes: { label: string; shape: Shape; price: number }[];
}

const COLORS: FrameColor[] = [
  { id: "bianco", label: "Bianco", labelEn: "White", extraPrice: 0 },
  { id: "legno-chiaro", label: "Legno chiaro", labelEn: "Light wood", extraPrice: 0 },
  { id: "nero", label: "Nero", labelEn: "Black", extraPrice: 0 },
  { id: "argento", label: "Argento", labelEn: "Silver", extraPrice: 8 },
];

const GLASS = { it: "Vetro di protezione", en: "Protective glass" };

export const FRAMES: FrameModel[] = [
  { id: "r52x42", label: "52 x 42 cm", shape: "Rettangolare", depthCm: 2.5, glazing: GLASS,
    withMat: { printSize: "40 x 30 cm", price: 120 }, withoutMat: { printSize: "50 x 40 cm", price: 135 }, colors: COLORS },
  { id: "r72x52", label: "72 x 52 cm", shape: "Rettangolare", depthCm: 3, glazing: GLASS,
    withMat: { printSize: "60 x 40 cm", price: 180 }, withoutMat: { printSize: "70 x 50 cm", price: 200 }, colors: COLORS },
  { id: "q42x42", label: "42 x 42 cm", shape: "Quadrato", depthCm: 2.5, glazing: GLASS,
    withMat: { printSize: "30 x 30 cm", price: 110 }, withoutMat: { printSize: "40 x 40 cm", price: 125 }, colors: COLORS },
  { id: "q52x52", label: "52 x 52 cm", shape: "Quadrato", depthCm: 3, glazing: GLASS,
    withMat: { printSize: "40 x 40 cm", price: 150 }, withoutMat: { printSize: "50 x 50 cm", price: 170 }, colors: COLORS },
];

export const PRINT_SUPPORTS: PrintSupport[] = [
  { id: "carta", label: "Carta Fine Art", labelEn: "Fine Art paper",
    description: "Stampa su carta fotografica di alta qualità, spedita in tubo rigido.",
    descriptionEn: "Print on high-quality photographic paper, shipped in a rigid tube.",
    sizes: [
      { label: "30 x 40 cm", shape: "Rettangolare", price: 60 }, { label: "50 x 70 cm", shape: "Rettangolare", price: 95 },
      { label: "30 x 30 cm", shape: "Quadrato", price: 55 }, { label: "50 x 50 cm", shape: "Quadrato", price: 85 },
    ] },
  { id: "tela", label: "Tela su telaio", labelEn: "Stretched canvas",
    description: "Stampa su tela montata su telaio in legno, pronta da appendere.",
    descriptionEn: "Canvas print mounted on a wooden stretcher, ready to hang.",
    sizes: [
      { label: "50 x 70 cm", shape: "Rettangolare", price: 140 }, { label: "70 x 100 cm", shape: "Rettangolare", price: 220 },
      { label: "50 x 50 cm", shape: "Quadrato", price: 120 }, { label: "70 x 70 cm", shape: "Quadrato", price: 180 },
    ] },
  { id: "forex", label: "Forex", labelEn: "Forex panel",
    description: "Stampa su pannello rigido leggero, finitura opaca.",
    descriptionEn: "Print on a light rigid panel, matte finish.",
    sizes: [
      { label: "50 x 70 cm", shape: "Rettangolare", price: 110 }, { label: "70 x 100 cm", shape: "Rettangolare", price: 180 },
      { label: "50 x 50 cm", shape: "Quadrato", price: 95 }, { label: "70 x 70 cm", shape: "Quadrato", price: 150 },
    ] },
];

export const MASTER_FILE = {
  label: "Esemplare digitale unico", labelEn: "Unique digital edition",
  description: "Cessione del file originale ad alta risoluzione, per uso personale. Inviato dopo il pagamento.",
  descriptionEn: "Transfer of the original high-resolution file, for personal use. Sent after payment.",
  price: 50,
};

// Quadretti di pittura che possono entrare nelle cornici standard (slug delle opere).
// In futuro arriverà dalla colonna CONFIGURABILE dell'Excel.
export const CONFIGURABLE_PAINTINGS: string[] = [];

export const SUPPLIER_NOTE = {
  it: "Stampe e cornici vengono realizzate e reperite tramite fornitori esterni. Ricevuta la richiesta, verifico la disponibilità dei materiali e ti comunico via email prezzo della spedizione e tempi di consegna.",
  en: "Prints and frames are produced and sourced through external suppliers. Once I receive your request, I check material availability and email you the shipping cost and delivery times.",
};

export const PAYMENT_METHODS = ["Bonifico bancario", "PayPal", "Carta (via PayPal)"];

export const normalizeShape = (s?: string): Shape => (s === "Quadrato" ? "Quadrato" : "Rettangolare");
