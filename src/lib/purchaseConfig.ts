// Logica del configuratore. I dati arrivano dall'Excel (via ottimizza.py → artworkData.ts):
// - FORMATI E PREZZI: una riga per misura; ogni colonna prezzo ha lo stesso nome di un ID SUPPORTO
// - SPECIFICHE SUPPORTI: scheda tecnica generale di ogni supporto
import { formatsAndPrices, supportSpecs } from "@/lib/artworkData";

export type Row = Record<string, string>;

/** Normalizza nomi/ID: maiuscolo, spazi singoli, trattini → spazio, toglie "PREZZO " iniziale. */
export const norm = (s?: string) =>
  (s || "").toUpperCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim().replace(/^PREZZO /, "");

/** Numero da testo: accetta virgola o punto, con o senza "cm" / "€". */
export const num = (v?: string) => {
  const n = parseFloat((v || "").replace(/[^\d.,]/g, "").replace(",", "."));
  return n > 0 ? n : 0;
};
export const fmtNum = (n: number) => String(Math.round(n * 100) / 100).replace(".", ",");
export const fmtCm = (v?: string) => (num(v) ? `${fmtNum(num(v))} cm` : "");
/** "39X29" → "39 × 29 cm" */
export const fmtSize = (v?: string) => {
  const p = (v || "").split(/[xX×*]/).map(num).filter(Boolean);
  return p.length === 2 ? `${fmtNum(p[0])} × ${fmtNum(p[1])} cm` : (v || "");
};

export const MASTER_ID = "FILE DIGITALE";
export const isFramed = (id: string) => norm(id).includes("INCORNICIAT");

/** Forme dell'opera: "Rettangolare, Quadrato" → ["RETTANGOLARE","QUADRATO"] */
export const parseShapes = (s?: string) =>
  (s || "").split(/[,/;]|\be\b/i).map((x) => norm(x)).filter(Boolean)
    .map((x) => (x.startsWith("QUADRAT") ? "QUADRATO" : x.startsWith("RETTANG") ? "RETTANGOLARE" : x.startsWith("PANORAM") ? "PANORAMICO" : x.startsWith("TOND") ? "TONDO" : x));
const shapeOf = (r: Row) => parseShapes(r["FORMA"])[0] || "";

/** Valore cella di una riga per un dato ID supporto (match tollerante sul nome colonna). */
export const priceFor = (r: Row, id: string) => {
  const key = Object.keys(r).find((k) => norm(k) === norm(id));
  return key ? num(r[key]) : 0;
};

export const getSupports = () => supportSpecs.filter((s) => norm(s["ID SUPPORTO"]) && (s["NOME IT"] || "").trim());
export const formatsForShapes = (shapes: string[]) =>
  formatsAndPrices.filter((r) => !shapes.length || shapes.includes(shapeOf(r)));
export const formatShape = shapeOf;

/** Prezzo minimo tra tutte le opzioni attive per le forme dell'opera ("A partire da"). */
export const minPriceForArtwork = (shape?: string) => {
  const rows = formatsForShapes(parseShapes(shape));
  const vals: number[] = [];
  getSupports().forEach((s) => {
    const id = s["ID SUPPORTO"];
    if (norm(id) === MASTER_ID) { const p = num(s["PREZZO"]); if (p) vals.push(p); return; }
    rows.forEach((r) => { const p = priceFor(r, id); if (p) vals.push(p); });
  });
  return vals.length ? Math.min(...vals) : 0;
};

/** PASSEPARTOUT: "SI AVORIO" → {has:true,color:"Avorio"}; "NO"/"A GIORNO" → {has:false} */
export const parseMat = (v?: string) => {
  const s = (v || "").trim();
  if (!s) return null;
  const has = /^s[iì]/i.test(s);
  if (!has) return { has: false, color: "" };
  const color = s.replace(/^s[iì]\s*/i, "").trim();
  return { has: true, color: color ? color.charAt(0).toUpperCase() + color.slice(1).toLowerCase() : "" };
};

/** Protezione: colonna PROTEZIONE, altrimenti dedotta dalla descrizione della riga. */
export const glazingOf = (r: Row): "vetro" | "plexiglass" | "" => {
  const s = `${r["PROTEZIONE"] || ""} ${r["VETRO"] || ""} ${r["DESCRIZIONE CORNICE E STAMPA"] || ""}`.toLowerCase();
  if (s.includes("plexi") || s.includes("acril")) return "plexiglass";
  if (s.includes("vetro") || s.includes("glass")) return "vetro";
  return "";
};

export interface FrameColor { name: string; extra: number; hex: string }
const HEX: [RegExp, string][] = [
  [/ner|black/i, "#151515"], [/bianc|white/i, "#f4f2ea"], [/avori|ivory/i, "#efe6cf"], [/argent|silver/i, "#c4c6c8"],
  [/oro|gold/i, "#c9a94e"], [/rover|quercia|oak|natural/i, "#c49a6c"], [/noce|walnut/i, "#5c3b22"],
  [/legno|wood/i, "#a77b4f"], [/grig|grey|gray/i, "#8a8a8a"], [/bronz/i, "#8c6b3f"],
];
/** COLORI CORNICE: "Nero, Bianco, Argento +8" */
export const parseColors = (v?: string): FrameColor[] =>
  (v || "").split(/[,;/]/).map((x) => x.trim()).filter(Boolean).map((x) => {
    const m = x.match(/\+\s*€?\s*(\d+(?:[.,]\d+)?)/);
    const name = x.replace(/\+.*$/, "").trim();
    return { name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(), extra: m ? num(m[1]) : 0,
      hex: HEX.find(([re]) => re.test(name))?.[1] || "#999" };
  });

export const PAYMENT_METHODS = ["Bonifico bancario", "PayPal", "Visa", "Mastercard"];

export const TEXTS = {
  intro: {
    it: "Configurazione dell'opera e invio della richiesta di preventivo. Non si tratta ancora di un acquisto: il preventivo verrà inviato via email e il pagamento avverrà solo dopo la sua accettazione.",
    en: "Configure the artwork and send a quote request. This is not a purchase yet: the quote will be sent by email and payment is made only after it has been accepted.",
  },
  infoBox: {
    it: [
      "Stampe e cornici vengono realizzate tramite laboratori e fornitori esterni: disponibilità e tempi vengono verificati alla ricezione della richiesta e comunicati nel preventivo, prima di qualsiasi conferma.",
      "Spedizione esclusa dai prezzi indicati: il costo dipende dalla destinazione e viene indicato nel preventivo.",
      "Pagamento solo dopo l'accettazione del preventivo: bonifico bancario o PayPal (anche con carta Visa e Mastercard).",
    ],
    en: [
      "Prints and frames are produced through external laboratories and suppliers: availability and timing are checked when the request is received and stated in the quote, before any confirmation.",
      "Shipping is not included in the prices shown: the cost depends on the destination and is stated in the quote.",
      "Payment only after the quote is accepted: bank transfer or PayPal (Visa and Mastercard cards accepted via PayPal).",
    ],
  },
  privacy: {
    it: "Titolare del trattamento: Massimo Di Stefano, arte@massimodistefano.com. I dati vengono raccolti esclusivamente per formulare e inviare il preventivo, sono conservati per il tempo strettamente necessario e non vengono ceduti a terzi né usati per scopi promozionali. È obbligatoria solo l'email.",
    en: "Data controller: Massimo Di Stefano, arte@massimodistefano.com. Data is collected solely to prepare and send the quote, kept only for the time strictly necessary, and never shared with third parties or used for marketing. Only the email is required.",
  },
  sent: {
    it: "Richiesta inviata. La disponibilità verrà verificata con i fornitori; seguirà via email il preventivo con spese di spedizione e tempi stimati.",
    en: "Request sent. Availability will be checked with the suppliers; the quote with shipping costs and estimated timing will follow by email.",
  },
};
