// Configurazione centralizzata delle opzioni d'acquisto.
// Separata dal catalogo opere (artworkData.ts, generato dall'Excel): qui solo supporti,
// formati, finiture e prezzi. Espandibile: aggiungere una voce agli array basta.
// NOTA: i prezzi qui sotto sono ESEMPI provvisori, da sostituire con quelli reali.

export type Shape = "Quadrato" | "Rettangolare";
export type Discipline = "painting" | "photography" | "digital-art" | "t-shirt";

export interface PrintFormat {
  id: string;
  label: string; // es. "30 x 30 cm"
  shape: Shape;
  basePrice: number; // € per il supporto più semplice
}

export interface Finish {
  id: string;
  label: string;
  labelEn: string;
  extraPrice: number; // € aggiunti al prezzo
  image?: string; // foto esempio (cornice, ecc.)
}

export interface Support {
  id: string;
  label: string;
  labelEn: string;
  description?: string;
  descriptionEn?: string;
  priceMultiplier: number; // moltiplica il basePrice del formato
  fixedPrice?: number; // es. file digitale: prezzo fisso
  finishes: Finish[];
  disciplines: Discipline[];
  image?: string;
}

const noFinish: Finish = { id: "none", label: "Senza cornice", labelEn: "No frame", extraPrice: 0 };

export const PRINT_FORMATS: PrintFormat[] = [
  { id: "q30", label: "30 x 30 cm", shape: "Quadrato", basePrice: 60 },
  { id: "q50", label: "50 x 50 cm", shape: "Quadrato", basePrice: 110 },
  { id: "q70", label: "70 x 70 cm", shape: "Quadrato", basePrice: 180 },
  { id: "r30x40", label: "30 x 40 cm", shape: "Rettangolare", basePrice: 70 },
  { id: "r50x70", label: "50 x 70 cm", shape: "Rettangolare", basePrice: 130 },
  { id: "r70x100", label: "70 x 100 cm", shape: "Rettangolare", basePrice: 220 },
];

export const SUPPORTS: Support[] = [
  {
    id: "carta-fine-art", label: "Carta Fine Art", labelEn: "Fine Art Paper",
    priceMultiplier: 1, disciplines: ["photography", "digital-art"],
    finishes: [noFinish, { id: "cornice-nera", label: "Cornice nera", labelEn: "Black frame", extraPrice: 40 }],
  },
  {
    id: "tela", label: "Tela su telaio", labelEn: "Stretched canvas",
    priceMultiplier: 1.4, disciplines: ["photography", "digital-art"], finishes: [noFinish],
  },
  {
    id: "forex", label: "Forex", labelEn: "Forex panel",
    priceMultiplier: 1.3, disciplines: ["photography", "digital-art"], finishes: [noFinish],
  },
  {
    id: "dibond", label: "Alluminio Dibond", labelEn: "Aluminium Dibond",
    priceMultiplier: 1.8, disciplines: ["photography", "digital-art"], finishes: [noFinish],
  },
  {
    id: "file", label: "File digitale alta risoluzione", labelEn: "High-resolution digital file",
    priceMultiplier: 0, fixedPrice: 50, disciplines: ["photography", "digital-art"], finishes: [],
  },
];

// Pittura: opera originale così com'è (prezzo da catalogo) oppure cornice su misura a preventivo.
export const PAINTING_OPTIONS = [
  { id: "as-is", label: "Opera così com'è", labelEn: "Artwork as shown", onQuote: false },
  { id: "custom-frame", label: "Con cornice artigianale su misura", labelEn: "With custom handmade frame", onQuote: true },
] as const;

export const PAYMENT_METHODS = ["Bonifico bancario", "PayPal", "Carta (via PayPal)"];

export const normalizeShape = (s?: string): Shape =>
  s === "Quadrato" ? "Quadrato" : "Rettangolare";

export const getSupportsFor = (d: Discipline) => SUPPORTS.filter((s) => s.disciplines.includes(d));

export const getFormatsFor = (shape?: string) =>
  PRINT_FORMATS.filter((f) => f.shape === normalizeShape(shape));

export function computePrice(support: Support, format?: PrintFormat, finish?: Finish): number {
  if (support.fixedPrice !== undefined) return support.fixedPrice;
  if (!format) return 0;
  return Math.round(format.basePrice * support.priceMultiplier + (finish?.extraPrice ?? 0));
}
