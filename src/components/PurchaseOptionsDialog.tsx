import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import {
  PAINTING_OPTIONS, PAYMENT_METHODS, computePrice, getFormatsFor, getSupportsFor,
  type Discipline,
} from "@/lib/purchaseConfig";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  discipline: string;
  shape?: string;
  price?: string;
}

const font = { fontFamily: "'Raleway', sans-serif" };
const head = { fontFamily: "'Cormorant Garamond', serif" };

export default function PurchaseOptionsDialog({ isOpen, onClose, artworkTitle, discipline, shape, price }: Props) {
  const { lang } = useI18n();
  const en = lang === "en";
  const isPainting = discipline === "painting";
  const supports = useMemo(() => getSupportsFor(discipline as Discipline), [discipline]);
  const formats = useMemo(() => getFormatsFor(shape), [shape]);

  const [paintOpt, setPaintOpt] = useState<string>("as-is");
  const [supportId, setSupportId] = useState(supports[0]?.id ?? "");
  const [formatId, setFormatId] = useState(formats[0]?.id ?? "");
  const [finishId, setFinishId] = useState("none");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) { setSent(false); setError(""); }
  }, [isOpen]);

  const support = supports.find((s) => s.id === supportId) ?? supports[0];
  const format = formats.find((f) => f.id === formatId) ?? formats[0];
  const finish = support?.finishes.find((f) => f.id === finishId) ?? support?.finishes[0];
  const isFile = support?.fixedPrice !== undefined;

  const paint = PAINTING_OPTIONS.find((o) => o.id === paintOpt)!;
  const total = isPainting
    ? (paint.onQuote ? (en ? "On quote" : "Su preventivo") : price ? `€ ${price}` : "€ —")
    : support ? `€ ${computePrice(support, format, finish)}` : "€ —";

  const summary = isPainting
    ? (en ? paint.labelEn : paint.label)
    : [en ? support?.labelEn : support?.label, !isFile && format?.label, !isFile && finish && (en ? finish.labelEn : finish.label)]
        .filter(Boolean).join(" · ");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !country.trim()) {
      setError(en ? "Please fill in name, email and country." : "Compila nome, email e nazione.");
      return;
    }
    setSending(true); setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Richiesta acquisto: ${artworkTitle}`,
          opera: artworkTitle, disciplina: discipline, scelta: summary, prezzo_indicato: total,
          nome: name, email, citta: city, cap: zip, nazione: country, note: notes,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(en ? "Sending failed, please try again." : "Invio non riuscito, riprova.");
    } finally { setSending(false); }
  };

  const chip = (active: boolean) =>
    `px-3 py-2 rounded border text-[12px] text-left transition-colors duration-300 ${
      active ? "border-accent text-foreground bg-accent/10" : "border-border/40 text-foreground/80 hover:border-foreground/40"}`;
  const label = "text-[9px] tracking-[0.25em] uppercase text-foreground/70 mb-2";

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border/40">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light" style={head}>{artworkTitle}</DialogTitle>
        </DialogHeader>

        {sent ? (
          <p className="py-8 text-center text-sm text-foreground/90" style={font}>
            {en ? "Thank you! Your request has been sent. You will receive a quote including shipping by email."
                : "Grazie! La richiesta è stata inviata. Riceverai via email il preventivo con la spedizione."}
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-5" style={font}>
            {isPainting ? (
              <div>
                <p className={label}>{en ? "Option" : "Opzione"}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {PAINTING_OPTIONS.map((o) => (
                    <button type="button" key={o.id} onClick={() => setPaintOpt(o.id)} className={chip(paintOpt === o.id)}>
                      {en ? o.labelEn : o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className={label}>{en ? "Support" : "Supporto"}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {supports.map((s) => (
                      <button type="button" key={s.id} className={chip(support?.id === s.id)}
                        onClick={() => { setSupportId(s.id); setFinishId("none"); }}>
                        {en ? s.labelEn : s.label}
                      </button>
                    ))}
                  </div>
                </div>
                {!isFile && (
                  <div>
                    <p className={label}>{en ? "Size" : "Misura"}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {formats.map((f) => (
                        <button type="button" key={f.id} onClick={() => setFormatId(f.id)} className={chip(format?.id === f.id)}>
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {!isFile && support && support.finishes.length > 1 && (
                  <div>
                    <p className={label}>{en ? "Finish" : "Finitura"}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {support.finishes.map((f) => (
                        <button type="button" key={f.id} onClick={() => setFinishId(f.id)} className={chip(finish?.id === f.id)}>
                          {en ? f.labelEn : f.label}{f.extraPrice ? ` (+€ ${f.extraPrice})` : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex items-baseline justify-between border-y border-border/30 py-3">
              <span className="text-[12px] text-foreground/80">{summary}</span>
              <span className="text-xl text-accent" style={head}>{total}</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              <Input placeholder={en ? "Name *" : "Nome *"} value={name} onChange={(e) => setName(e.target.value)} />
              <Input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder={en ? "City" : "Città"} value={city} onChange={(e) => setCity(e.target.value)} />
              <Input placeholder={en ? "Postal code" : "CAP"} value={zip} onChange={(e) => setZip(e.target.value)} />
              <Input className="sm:col-span-2" placeholder={en ? "Country *" : "Nazione *"} value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <Textarea rows={2} placeholder={en ? "Notes (optional)" : "Note (facoltative)"} value={notes} onChange={(e) => setNotes(e.target.value)} />

            <div className="text-[11px] text-foreground/70 leading-relaxed space-y-1">
              <p>{en ? "1. You receive a quote by email, including insured shipping."
                     : "1. Ricevi via email il preventivo con spedizione assicurata."}</p>
              <p>{en ? "2. Payment: " : "2. Pagamento: "}{PAYMENT_METHODS.join(" · ")}</p>
              <p>{en ? "3. Shipping with Certificate of Authenticity." : "3. Spedizione con Certificato di Autenticità."}</p>
            </div>

            {error && <p className="text-[12px] text-destructive">{error}</p>}
            <button type="submit" disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded border border-accent/50 hover:bg-accent/10 text-foreground text-[11px] tracking-[0.3em] uppercase transition-colors disabled:opacity-50">
              <Send size={13} aria-hidden="true" />
              {sending ? (en ? "Sending…" : "Invio…") : (en ? "Request quote" : "Richiedi preventivo")}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
