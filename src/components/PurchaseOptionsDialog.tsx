import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronRight, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { formatsAndPrices, supportSpecs } from "@/lib/artworkData";
import { PAYMENT_METHODS, SUPPLIER_NOTE } from "@/lib/purchaseConfig";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

interface Props {
  isOpen: boolean; onClose: () => void; artworkTitle: string;
  discipline: string; shape?: string; price?: string; slug?: string; isConfigurable?: boolean;
}

// Collegamento tra ID SUPPORTO (scheda SPECIFICHE SUPPORTI) e colonna prezzo (scheda FORMATI E PREZZI)
const PRICE_COLUMN: Record<string, string> = {
  CARTA: "PREZZO CARTA", "TELA-ROTOLO": "TELA ROTOLO", "TELA-TELAIO": "TELA TELAIO", FOREX: "FOREX", INCORNICIATO: "INCORNICIATO",
};
const MASTER_ID = "FILE-DIGITALE";

type Step = "home" | "format" | "sheet" | "form";
interface Choice { summary: string; price: string; physical: boolean }

const num = (v?: string) => { const n = parseFloat((v || "").replace(/[^\d.,]/g, "").replace(",", ".")); return n > 0 ? n : 0; };
const font = { fontFamily: "'Raleway', sans-serif" };
const head = { fontFamily: "'Cormorant Garamond', serif" };

export default function PurchaseOptionsDialog({ isOpen, onClose, artworkTitle, discipline, shape, price, isConfigurable }: Props) {
  const { lang } = useI18n();
  const en = lang === "en";
  const t = (it: string, e: string) => (en ? e : it);
  const isPainting = discipline === "painting";
  const configurable = !!isConfigurable; // il flag CONFIGURABILE dell'Excel comanda su tutte le sezioni

  const shapeKey = (shape || "").toLowerCase();
  const formats = useMemo(() => formatsAndPrices.filter((f) => {
    const fs = (f["FORMA"] || "").toLowerCase();
    return !shapeKey || shapeKey.includes("entramb") || fs.includes(shapeKey) || shapeKey.includes(fs);
  }), [shapeKey]);

  // Supporti disponibili: painting configurabile = solo cornici; foto/digital = tutti
  const supports = useMemo(() => supportSpecs.filter((s) => {
    const id = s["ID SUPPORTO"];
    if (id === MASTER_ID) return !isPainting;
    if (isPainting) return id === "INCORNICIATO";
    return !!PRICE_COLUMN[id];
  }), [isPainting]);

  const minFor = (id: string) => {
    if (id === MASTER_ID) return num(supportSpecs.find((s) => s["ID SUPPORTO"] === id)?.["PREZZO"]);
    const vals = formats.map((f) => num(f[PRICE_COLUMN[id]])).filter(Boolean);
    return vals.length ? Math.min(...vals) : 0;
  };

  const [step, setStep] = useState<Step>("home");
  const [history, setHistory] = useState<Step[]>([]);
  const [supportId, setSupportId] = useState<string>("");
  const [formatId, setFormatId] = useState<string>("");
  const [choice, setChoice] = useState<Choice | null>(null);
  const [f, setF] = useState({ name: "", email: "", city: "", zip: "", country: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { if (isOpen) { setStep("home"); setHistory([]); setSent(false); setError(""); } }, [isOpen]);

  const go = (s: Step) => { setHistory((h) => [...h, step]); setStep(s); };
  const back = () => { setHistory((h) => { const p = h[h.length - 1] ?? "home"; setStep(p); return h.slice(0, -1); }); };

  const support = supportSpecs.find((s) => s["ID SUPPORTO"] === supportId);
  const format = formats.find((x) => x["ID FORMATO"] === formatId);
  const supName = (s?: Record<string, string>) => (s ? t(s["NOME IT"], s["NOME EN"]) : "");
  const fmtLabel = (x: Record<string, string>) => `${x["LARGHEZZA"]} x ${x["ALTEZZA"]} cm`;

  const openSupport = (id: string) => {
    setSupportId(id);
    if (id === MASTER_ID) { setFormatId(""); go("sheet"); }
    else { setFormatId(formats.find((x) => num(x[PRICE_COLUMN[id]]))?.["ID FORMATO"] || ""); go("format"); }
  };

  const currentPrice = supportId === MASTER_ID ? minFor(MASTER_ID) : num(format?.[PRICE_COLUMN[supportId]]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim() || (choice?.physical && !f.country.trim())) {
      setError(t("Compila i campi obbligatori (*).", "Please fill in the required fields (*).")); return;
    }
    setSending(true); setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Richiesta acquisto: ${artworkTitle}`, opera: artworkTitle, disciplina: discipline,
          scelta: choice?.summary, prezzo_indicato: choice?.price,
          nome: f.name, email: f.email, citta: f.city, cap: f.zip, nazione: f.country, note: f.notes,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch { setError(t("Invio non riuscito, riprova.", "Sending failed, please try again.")); }
    finally { setSending(false); }
  };

  const chip = (active: boolean) =>
    `px-3 py-2 rounded border text-[12px] text-left transition-colors duration-300 ${
      active ? "border-[#2b2820] bg-[#2b2820] text-[#FDFCF0]" : "border-[#D4BE96] text-[#4a473e] hover:border-[#2b2820]"}`;
  const label = "text-[9px] tracking-[0.25em] uppercase text-[#4a473e]/80 mb-2";
  const input = "bg-white/60 border-[#D4BE96] text-[#2b2820]";
  const primary = "w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#2b2820] text-[#FDFCF0] hover:opacity-90 text-[11px] tracking-[0.3em] uppercase disabled:opacity-50";

  const Block = ({ title, desc, from, onClick }: { title: string; desc: string; from?: string; onClick: () => void }) => (
    <button type="button" onClick={onClick}
      className="w-full flex items-center gap-3 p-4 rounded border border-[#D4BE96] hover:border-[#2b2820] text-left transition-colors duration-300">
      <div className="flex-1">
        <p className="text-lg text-[#2b2820]" style={head}>{title}</p>
        <p className="text-[12px] text-[#4a473e]/80 leading-snug">{desc}</p>
      </div>
      {from && <span className="text-[12px] text-[#2b2820] whitespace-nowrap">{from}</span>}
      <ChevronRight size={16} className="text-[#D4BE96]" />
    </button>
  );

  const crumbs = [t("Scelta", "Choice"), t("Formato", "Size"), t("Scheda", "Details"), t("Richiesta", "Request")];
  const stepIdx = { home: 0, format: 1, sheet: 2, form: 3 }[step];
  const Crumbs = () => (
    <div className="flex items-center justify-between gap-2">
      <button type="button" onClick={back} className="inline-flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase text-[#4a473e] hover:text-[#2b2820]">
        <ArrowLeft size={13} /> {t("Indietro", "Back")}
      </button>
      <span className="text-[9px] tracking-[0.2em] uppercase text-[#4a473e]/60">{crumbs.slice(0, stepIdx + 1).join(" › ")}</span>
    </div>
  );

  const PaymentsNote = () => (
    <p className="text-[10px] text-[#4a473e]/70">{t("Pagamenti accettati: ", "Accepted payments: ")}{PAYMENT_METHODS.join(" · ")}</p>
  );

  const paintingDesc = t(
    "Venduta esattamente come appare nella prima foto della galleria: se è visibile una cornice di presentazione è inclusa nel prezzo; se l'opera è presentata senza cornice (ad es. su tavola) viene venduta così.",
    "Sold exactly as shown in the first gallery photo: if a presentation frame is visible it is included in the price; if the work is shown unframed (e.g. on panel) it is sold that way.");
  const hasPrice = !!price && /\d/.test(price);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-[#D4BE96] text-[#4a473e]" style={{ background: "#FDFCF0" }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-[#2b2820]" style={head}>{artworkTitle}</DialogTitle>
        </DialogHeader>

        <div style={font} className="space-y-4">
          {sent ? (
            <p className="py-8 text-center text-sm text-[#2b2820]">
              {t("Grazie! La richiesta è stata inviata. Ti risponderò via email con disponibilità, spedizione e tempi.",
                 "Thank you! Your request has been sent. I will reply by email with availability, shipping and timing.")}
            </p>
          ) : step === "home" ? (
            <>
              <p className={label}>{t("Scegli come acquistare", "Choose how to buy")}</p>
              <div className="space-y-2">
                {isPainting && (
                  <Block title={t("Opera originale, così come appare", "Original artwork, as shown")} desc={paintingDesc}
                    from={hasPrice ? `€ ${price}` : undefined}
                    onClick={() => { setChoice({ summary: t("Opera originale, come nella prima foto", "Original artwork, as in the first photo"), price: hasPrice ? `€ ${price}` : "—", physical: true }); go("form"); }} />
                )}
                {isPainting && !configurable && (
                  <Block title={t("Cornice personalizzata", "Custom frame")}
                    desc={t("Desideri una cornice diversa? Descrivila nella richiesta: ti preparo un preventivo su misura.", "Would you like a different frame? Describe it in your request and I'll prepare a custom quote.")}
                    onClick={() => { setChoice({ summary: t("Opera originale + richiesta cornice personalizzata", "Original artwork + custom frame request"), price: t("Su preventivo", "On quote"), physical: true }); go("form"); }} />
                )}
                {configurable && supports.map((s) => {
                  const min = minFor(s["ID SUPPORTO"]);
                  return (
                    <Block key={s["ID SUPPORTO"]} title={supName(s)}
                      desc={t(s["DESCRIZIONE IT"], s["DESCRIZIONE EN"]).split(". ")[0] + "."}
                      from={min ? `${s["ID SUPPORTO"] === MASTER_ID ? "" : t("da ", "from ")}€ ${min}` : undefined}
                      onClick={() => openSupport(s["ID SUPPORTO"])} />
                  );
                })}
                {!isPainting && !configurable && (
                  <Block title={t("Richiedi informazioni", "Request information")} desc={t("Scrivimi per disponibilità e prezzo di quest'opera.", "Write to me for availability and price of this work.")}
                    from={hasPrice ? price : undefined}
                    onClick={() => { setChoice({ summary: t("Richiesta informazioni", "Information request"), price: hasPrice ? `${price}` : "—", physical: true }); go("form"); }} />
                )}
              </div>
              <PaymentsNote />
            </>
          ) : step === "format" && support ? (
            <>
              <Crumbs />
              <p className={label}>{supName(support)} · {t("Scegli il formato", "Choose the size")}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {formats.filter((x) => num(x[PRICE_COLUMN[supportId]])).map((x) => (
                  <button type="button" key={x["ID FORMATO"]} className={chip(x["ID FORMATO"] === formatId)} onClick={() => setFormatId(x["ID FORMATO"])}>
                    {fmtLabel(x)}<br /><span className="opacity-75 text-[11px]">€ {num(x[PRICE_COLUMN[supportId]])}</span>
                  </button>
                ))}
              </div>
              {supportId === "INCORNICIATO" && format && (
                <p className="text-[11px] text-[#4a473e]/80">
                  {t("Profondità cornice", "Frame depth")} {format["PROFONDITA CORNICE"]} · {t("Profilo frontale", "Front profile")} {format["PROFILO FRONTALE"]}
                </p>
              )}
              <button type="button" className={primary} disabled={!format} onClick={() => go("sheet")}>{t("Continua", "Continue")}</button>
            </>
          ) : step === "sheet" && support ? (
            <>
              <Crumbs />
              <p className={label}>{t("Scheda tecnica", "Technical sheet")}</p>
              <div className="space-y-3 text-[12px] leading-relaxed">
                <p className="text-lg text-[#2b2820]" style={head}>{supName(support)}{format ? ` · ${fmtLabel(format)}` : ""}</p>
                <p>{t(support["DESCRIZIONE IT"], support["DESCRIZIONE EN"])}</p>
                {supportId === MASTER_ID ? (
                  <p className="text-[11px] text-[#4a473e]/90">
                    {t("Esemplare unico: dopo la vendita l'opera viene ritirata definitivamente dal commercio e non sarà più stampata. Il file viene inviato solo dopo il pagamento, concordato via email.",
                       "Unique edition: after the sale the work is permanently withdrawn from the market and never printed again. The file is sent only after payment, agreed by email.")}
                  </p>
                ) : (
                  <>
                    <p><span className={label}>{t("Imballaggio", "Packaging")} </span><br />{t(support["IMBALLAGGIO IT"], support["IMBALLAGGIO EN"])}</p>
                    <p className="text-[11px] text-[#4a473e]/90">{t(SUPPLIER_NOTE.it, SUPPLIER_NOTE.en)}</p>
                  </>
                )}
              </div>
              <div className="flex items-baseline justify-between border-y border-[#D4BE96]/60 py-3">
                <span className="text-[11px] tracking-[0.2em] uppercase">{t("Prezzo", "Price")}</span>
                <span className="text-xl text-[#2b2820]" style={head}>€ {currentPrice}</span>
              </div>
              {supportId !== MASTER_ID && <p className="text-[10px] text-[#4a473e]/70">{t("Spedizione esclusa, calcolata in base alla destinazione.", "Shipping not included, calculated by destination.")}</p>}
              <button type="button" className={primary} onClick={() => {
                setChoice({ summary: `${supName(support)}${format ? ` · ${fmtLabel(format)}` : ""}`, price: `€ ${currentPrice}`, physical: supportId !== MASTER_ID });
                go("form");
              }}>{t("Continua", "Continue")}</button>
            </>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <Crumbs />
              <div className="flex items-baseline justify-between gap-4 border-y border-[#D4BE96]/60 py-3">
                <span className="text-[12px]">{choice?.summary}</span>
                <span className="text-xl text-[#2b2820] whitespace-nowrap" style={head}>{choice?.price}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                <Input className={input} placeholder={t("Nome *", "Name *")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                <Input className={input} type="email" placeholder="Email *" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                {choice?.physical && <>
                  <Input className={input} placeholder={t("Città", "City")} value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} />
                  <Input className={input} placeholder={t("CAP", "Postal code")} value={f.zip} onChange={(e) => setF({ ...f, zip: e.target.value })} />
                  <Input className={`sm:col-span-2 ${input}`} placeholder={t("Nazione *", "Country *")} value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} />
                </>}
              </div>
              <Textarea className={input} rows={2} placeholder={t("Note (facoltative)", "Notes (optional)")} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
              <div className="text-[11px] text-[#4a473e]/80 leading-relaxed space-y-1">
                <p>{t("1. Ti rispondo via email con conferma di disponibilità, tempi e costi.", "1. I reply by email confirming availability, timing and costs.")}</p>
                <p>{t("2. Pagamento: ", "2. Payment: ")}{PAYMENT_METHODS.join(" · ")}</p>
                <p>{choice?.physical ? t("3. Spedizione con Certificato di Autenticità.", "3. Shipping with Certificate of Authenticity.") : t("3. Invio del file dopo il pagamento.", "3. File sent after payment.")}</p>
              </div>
              <p className="text-[10px] text-[#4a473e]/70">{t("I tuoi dati sono usati solo per rispondere alla richiesta.", "Your data is used only to answer your request.")}</p>
              {error && <p className="text-[12px] text-destructive">{error}</p>}
              <button type="submit" disabled={sending} className={primary}>
                <Send size={13} aria-hidden="true" />
                {sending ? t("Invio…", "Sending…") : t("Invia richiesta", "Send request")}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
