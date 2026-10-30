import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronRight, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import {
  CONFIGURABLE_PAINTINGS, FRAMES, MASTER_FILE, PAYMENT_METHODS, PRINT_SUPPORTS, SUPPLIER_NOTE, normalizeShape,
} from "@/lib/purchaseConfig";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

interface Props {
  isOpen: boolean; onClose: () => void; artworkTitle: string;
  discipline: string; shape?: string; price?: string; slug?: string;
}

type Step = "home" | "frame" | "support" | "file" | "form";
interface Choice { summary: string; price: string; physical: boolean }

const font = { fontFamily: "'Raleway', sans-serif" };
const head = { fontFamily: "'Cormorant Garamond', serif" };

export default function PurchaseOptionsDialog({ isOpen, onClose, artworkTitle, discipline, shape, price, slug }: Props) {
  const { lang } = useI18n();
  const en = lang === "en";
  const t = (it: string, e: string) => (en ? e : it);
  const sh = normalizeShape(shape);
  const isPainting = discipline === "painting";
  const smallPainting = isPainting && !!slug && CONFIGURABLE_PAINTINGS.includes(slug);

  const [step, setStep] = useState<Step>("home");
  const [back, setBack] = useState<Step>("home");
  const [choice, setChoice] = useState<Choice | null>(null);

  const frames = FRAMES.filter((f) => f.shape === sh);
  const [frameId, setFrameId] = useState(frames[0]?.id);
  const [mat, setMat] = useState(true);
  const [colorId, setColorId] = useState("bianco");
  const [supportId, setSupportId] = useState(PRINT_SUPPORTS[0].id);
  const [sizeIdx, setSizeIdx] = useState(0);

  const [f, setF] = useState({ name: "", email: "", city: "", zip: "", country: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) { setStep("home"); setSent(false); setError(""); setChoice(null); }
  }, [isOpen]);

  const go = (s: Step, from: Step = "home") => { setBack(from); setStep(s); };
  const pick = (c: Choice, from: Step) => { setChoice(c); go("form", from); };

  const frame = frames.find((x) => x.id === frameId) ?? frames[0];
  const matOpt = frame && (mat ? frame.withMat : frame.withoutMat);
  const color = frame?.colors.find((c) => c.id === colorId) ?? frame?.colors[0];
  const framePrice = (matOpt?.price ?? 0) + (color?.extraPrice ?? 0);
  const support = PRINT_SUPPORTS.find((s) => s.id === supportId)!;
  const sizes = support.sizes.filter((s) => s.shape === sh);
  const size = sizes[sizeIdx] ?? sizes[0];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim() || (choice?.physical && !f.country.trim())) {
      setError(t("Compila i campi obbligatori (*).", "Please fill in the required fields (*)."));
      return;
    }
    setSending(true); setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Richiesta acquisto: ${artworkTitle}`,
          opera: artworkTitle, disciplina: discipline, scelta: choice?.summary, prezzo_indicato: choice?.price,
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

  const BackBtn = () => (
    <button type="button" onClick={() => setStep(step === "form" ? back : "home")}
      className="inline-flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase text-[#4a473e] hover:text-[#2b2820]">
      <ArrowLeft size={13} /> {t("Indietro", "Back")}
    </button>
  );

  const Total = ({ value, onNext }: { value: string; onNext: () => void }) => (
    <div className="space-y-3 pt-2">
      <div className="flex items-baseline justify-between border-y border-[#D4BE96]/60 py-3">
        <span className="text-[11px] tracking-[0.2em] uppercase">{t("Prezzo", "Price")}</span>
        <span className="text-xl text-[#2b2820]" style={head}>{value}</span>
      </div>
      <p className="text-[10px] text-[#4a473e]/70">{t("Spedizione esclusa, calcolata in base alla destinazione.", "Shipping not included, calculated by destination.")}</p>
      <button type="button" className={primary} onClick={onNext}>{t("Continua", "Continue")}</button>
    </div>
  );

  const paintingDesc = t(
    "Venduta esattamente come appare nella prima foto della galleria: se è visibile una cornice di presentazione è inclusa nel prezzo; se l'opera è presentata senza cornice (ad es. su tavola) viene venduta così.",
    "Sold exactly as shown in the first gallery photo: if a presentation frame is visible it is included in the price; if the work is shown unframed (e.g. on panel) it is sold that way.");

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
                  <Block title={t("Opera originale", "Original artwork")} desc={paintingDesc} from={price ? `€ ${price}` : undefined}
                    onClick={() => pick({ summary: t("Opera originale, come presentata", "Original artwork, as shown"), price: price ? `€ ${price}` : "—", physical: true }, "home")} />
                )}
                {(!isPainting || smallPainting) && frames.length > 0 && (
                  <Block title={t("Con cornice", "Framed")} desc={t("Cornice con vetro di protezione, con o senza passepartout.", "Frame with protective glass, with or without mat.")}
                    from={`${t("da", "from")} € ${Math.min(...frames.map((x) => x.withMat?.price ?? x.withoutMat?.price ?? 0))}`} onClick={() => go("frame")} />
                )}
                {!isPainting && (
                  <>
                    <Block title={t("Stampa su supporto", "Print on support")} desc={t("Carta Fine Art, tela su telaio, Forex.", "Fine Art paper, stretched canvas, Forex.")}
                      from={`${t("da", "from")} € ${Math.min(...PRINT_SUPPORTS.flatMap((s) => s.sizes.filter((z) => z.shape === sh).map((z) => z.price)))}`} onClick={() => go("support")} />
                    <Block title={t(MASTER_FILE.label, MASTER_FILE.labelEn)} desc={t(MASTER_FILE.description, MASTER_FILE.descriptionEn)}
                      from={`€ ${MASTER_FILE.price}`} onClick={() => go("file")} />
                  </>
                )}
              </div>
            </>
          ) : step === "frame" && frame ? (
            <>
              <BackBtn />
              <div>
                <p className={label}>{t("Misura cornice", "Frame size")}</p>
                <div className="grid grid-cols-2 gap-2">
                  {frames.map((x) => <button type="button" key={x.id} className={chip(x.id === frame.id)} onClick={() => setFrameId(x.id)}>{x.label}</button>)}
                </div>
              </div>
              <div>
                <p className={label}>{t("Passepartout", "Mat")}</p>
                <div className="grid grid-cols-2 gap-2">
                  {frame.withMat && <button type="button" className={chip(mat)} onClick={() => setMat(true)}>{t("Con passepartout", "With mat")}<br /><span className="opacity-70 text-[11px]">{t("stampa", "print")} {frame.withMat.printSize}</span></button>}
                  {frame.withoutMat && <button type="button" className={chip(!mat)} onClick={() => setMat(false)}>{t("Senza passepartout", "Without mat")}<br /><span className="opacity-70 text-[11px]">{t("stampa", "print")} {frame.withoutMat.printSize}</span></button>}
                </div>
              </div>
              <div>
                <p className={label}>{t("Colore", "Colour")}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {frame.colors.map((c) => (
                    <button type="button" key={c.id} className={chip(c.id === color?.id)} onClick={() => setColorId(c.id)}>
                      {c.image && <img src={c.image} alt="" className="w-full h-14 object-cover rounded mb-1" />}
                      {t(c.label, c.labelEn)}{c.extraPrice ? ` (+€ ${c.extraPrice})` : ""}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-[#4a473e]/80">
                {t("Profondità", "Depth")} {frame.depthCm} cm · {t(frame.glazing.it, frame.glazing.en)}
              </p>
              <Total value={`€ ${framePrice}`} onNext={() => pick({
                summary: `${t("Cornice", "Frame")} ${frame.label} · ${mat ? t("con passepartout", "with mat") : t("senza passepartout", "without mat")} (${t("stampa", "print")} ${matOpt?.printSize}) · ${t(color?.label ?? "", color?.labelEn ?? "")}`,
                price: `€ ${framePrice}`, physical: true }, "frame")} />
            </>
          ) : step === "support" ? (
            <>
              <BackBtn />
              <div>
                <p className={label}>{t("Supporto", "Support")}</p>
                <div className="grid grid-cols-3 gap-2">
                  {PRINT_SUPPORTS.map((s) => <button type="button" key={s.id} className={chip(s.id === supportId)} onClick={() => { setSupportId(s.id); setSizeIdx(0); }}>{t(s.label, s.labelEn)}</button>)}
                </div>
                <p className="text-[12px] text-[#4a473e]/80 mt-2">{t(support.description, support.descriptionEn)}</p>
              </div>
              <div>
                <p className={label}>{t("Misura", "Size")}</p>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((z, i) => <button type="button" key={z.label} className={chip(z === size)} onClick={() => setSizeIdx(i)}>{z.label}</button>)}
                </div>
              </div>
              {size && <Total value={`€ ${size.price}`} onNext={() => pick({ summary: `${t(support.label, support.labelEn)} · ${size.label}`, price: `€ ${size.price}`, physical: true }, "support")} />}
            </>
          ) : step === "file" ? (
            <>
              <BackBtn />
              <p className="text-lg text-[#2b2820]" style={head}>{t(MASTER_FILE.label, MASTER_FILE.labelEn)}</p>
              <p className="text-[13px] leading-relaxed">{t(MASTER_FILE.description, MASTER_FILE.descriptionEn)}</p>
              <div className="flex items-baseline justify-between border-y border-[#D4BE96]/60 py-3">
                <span className="text-[11px] tracking-[0.2em] uppercase">{t("Prezzo", "Price")}</span>
                <span className="text-xl text-[#2b2820]" style={head}>€ {MASTER_FILE.price}</span>
              </div>
              <button type="button" className={primary} onClick={() => pick({ summary: t(MASTER_FILE.label, MASTER_FILE.labelEn), price: `€ ${MASTER_FILE.price}`, physical: false }, "file")}>{t("Continua", "Continue")}</button>
            </>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <BackBtn />
              <div className="flex items-baseline justify-between gap-4 border-y border-[#D4BE96]/60 py-3">
                <span className="text-[12px]">{choice?.summary}</span>
                <span className="text-xl text-[#2b2820] whitespace-nowrap" style={head}>{choice?.price}</span>
              </div>
              {choice?.physical && <p className="text-[11px] leading-relaxed text-[#4a473e]/90">{t(SUPPLIER_NOTE.it, SUPPLIER_NOTE.en)}</p>}
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
                <p>{t("1. Ti rispondo via email con conferma di disponibilità e costi.", "1. I reply by email confirming availability and costs.")}</p>
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
