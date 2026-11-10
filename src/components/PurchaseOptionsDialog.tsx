import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronDown, ChevronRight, Download, Send } from "lucide-react";
import { jsPDF } from "jspdf";
import { useI18n } from "@/lib/i18n";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import PaymentIcons from "@/components/PaymentIcons";
import {
  MASTER_ID, TEXTS, fmtCm, fmtNum, fmtSize, formatShape, formatsForShapes, getSupports, glazingOf,
  isFramed, norm, num, parseColors, parseMat, parseShapes, priceFor, type Row,
} from "@/lib/purchaseConfig";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

interface Props {
  isOpen: boolean; onClose: () => void; artworkTitle: string;
  discipline: string; shape?: string; price?: string; slug?: string; isConfigurable?: boolean;
  preview?: string; squareImage?: string;
}

type Step = "home" | "format" | "form" | "summary";
interface Line { label: string; value: string }
interface Choice { title: string; lines: Line[]; price: number | null; priceText: string; physical: boolean }

const font = { fontFamily: "'Raleway', sans-serif" };
const head = { fontFamily: "'Cormorant Garamond', serif" };

export default function PurchaseOptionsDialog({ isOpen, onClose, artworkTitle, discipline, shape, price, isConfigurable, preview, squareImage }: Props) {
  const { lang } = useI18n();
  const en = lang === "en";
  const t = (it: string, e: string) => (en ? e : it);
  const isPainting = discipline === "painting";
  const configurable = !!isConfigurable && !isPainting; // dipinti: venduti come nella prima foto

  const shapes = useMemo(() => parseShapes(shape), [shape]);
  const [shapeSel, setShapeSel] = useState<string>("");
  const activeShapes = shapeSel ? [shapeSel] : shapes;
  const rows = useMemo(() => formatsForShapes(activeShapes), [activeShapes.join()]);
  const allRows = useMemo(() => formatsForShapes(shapes), [shapes.join()]);

  const supports = useMemo(() => getSupports().filter((s) => {
    const id = s["ID SUPPORTO"];
    if (norm(id) === MASTER_ID) return discipline === "digital-art" && num(s["PREZZO"]) > 0;
    return allRows.some((r) => priceFor(r, id));
  }), [allRows, discipline]);

  const minFor = (id: string) => {
    if (norm(id) === MASTER_ID) return num(getSupports().find((s) => norm(s["ID SUPPORTO"]) === MASTER_ID)?.["PREZZO"]);
    const v = allRows.map((r) => priceFor(r, id)).filter(Boolean);
    return v.length ? Math.min(...v) : 0;
  };

  const [step, setStep] = useState<Step>("home");
  const [history, setHistory] = useState<Step[]>([]);
  const [supportId, setSupportId] = useState("");
  const [formatId, setFormatId] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [f, setF] = useState({ name: "", email: "", phone: "", city: "", zip: "", country: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [infoOpen, setInfoOpen] = useState(true);
  const guard = useSpamGuard();

  useEffect(() => {
    if (!isOpen) return;
    setStep("home"); setHistory([]); setSent(false); setError(""); guard.reset();
    setInfoOpen(typeof window === "undefined" || window.innerHeight > 640);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const go = (s: Step) => { setHistory((h) => [...h, step]); setStep(s); };
  const back = () => setHistory((h) => { setStep(h[h.length - 1] ?? "home"); return h.slice(0, -1); });

  const support = getSupports().find((s) => s["ID SUPPORTO"] === supportId);
  const isMaster = norm(supportId) === MASTER_ID;
  const sizeRows = rows.filter((r) => priceFor(r, supportId));
  const format: Row | undefined = sizeRows.find((r) => r["ID FORMATO"] === formatId) || sizeRows[0];
  const colors = format && isFramed(supportId) ? parseColors(format["COLORI CORNICE"]) : [];
  const color = colors[Math.min(colorIdx, Math.max(colors.length - 1, 0))];
  const basePrice = isMaster ? minFor(supportId) : format ? priceFor(format, supportId) : 0;
  const total = basePrice + (color?.extra || 0);
  const supName = (s?: Row) => (s ? t(s["NOME IT"], s["NOME EN"] || s["NOME IT"]) : "");
  const eur = (n: number) => `€ ${fmtNum(n)}`;
  const showSquare = (shapeSel || shapes[0]) === "QUADRATO" && !!squareImage;
  const thumb = showSquare ? squareImage : preview;

  const detailLines = (r: Row, sid: string): Line[] => {
    const L: Line[] = [];
    const framed = isFramed(sid);
    L.push({ label: framed ? t("Misura esterna del quadro", "Outer frame size") : t("Misura", "Size"), value: `${fmtNum(num(r["LARGHEZZA"]))} × ${fmtNum(num(r["ALTEZZA"]))} cm` });
    if (framed) {
      if (r["OPERA VISIBILE"]) L.push({ label: t("Opera visibile (luce)", "Visible artwork (sight size)"), value: fmtSize(r["OPERA VISIBILE"]) });
      if (fmtCm(r["PROFONDITA CORNICE"])) L.push({ label: t("Profondità", "Depth"), value: fmtCm(r["PROFONDITA CORNICE"]) });
      if (fmtCm(r["PROFILO FRONTALE"])) L.push({ label: t("Profilo frontale", "Front profile"), value: fmtCm(r["PROFILO FRONTALE"]) });
      const g = glazingOf(r);
      if (g) L.push({ label: t("Protezione", "Glazing"), value: g === "vetro" ? t("Vetro", "Glass") : t("Plexiglass di protezione", "Protective plexiglass") });
      const m = parseMat(r["PASSEPARTOUT"]);
      if (m) L.push({ label: "Passepartout", value: m.has ? `${t("Sì", "Yes")}${m.color ? ` · ${m.color}` : ""}` : t("No, a giorno", "No, float mounted") });
    }
    return L;
  };

  const openSupport = (id: string) => {
    setSupportId(id); setColorIdx(0);
    if (norm(id) !== MASTER_ID) setFormatId(rows.find((r) => priceFor(r, id))?.["ID FORMATO"] || allRows.find((r) => priceFor(r, id))?.["ID FORMATO"] || "");
    go("format");
  };

  const confirmFormat = () => {
    const lines: Line[] = isMaster ? [] : format ? detailLines(format, supportId) : [];
    if (color) lines.push({ label: t("Colore cornice", "Frame colour"), value: `${color.name}${color.extra ? ` (+${eur(color.extra)})` : ""}` });
    if (shapes.length > 1) lines.unshift({ label: t("Forma", "Shape"), value: (shapeSel || shapes[0]) === "QUADRATO" ? t("Quadrata", "Square") : t("Rettangolare", "Rectangular") });
    setChoice({ title: supName(support), lines, price: total, priceText: eur(total), physical: !isMaster });
    go("form");
  };

  const toSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) { setError(t("Inserire un indirizzo email valido.", "Please enter a valid email address.")); return; }
    setError(""); go("summary");
  };

  const contactLines = (): Line[] => ([
    { label: "Email", value: f.email }, { label: t("Nome", "Name"), value: f.name }, { label: t("Telefono", "Phone"), value: f.phone },
    { label: t("Città", "City"), value: f.city }, { label: t("CAP", "Postal code"), value: f.zip }, { label: t("Nazione", "Country"), value: f.country },
    { label: t("Note", "Notes"), value: f.notes },
  ].filter((l) => l.value.trim()));

  const downloadPdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    let y = 22;
    doc.setFont("times", "normal"); doc.setFontSize(20); doc.text("Massimo Di Stefano", 20, y); y += 8;
    doc.setFontSize(10); doc.text(t("Riepilogo richiesta di preventivo", "Quote request summary") + " · " + new Date().toLocaleDateString(en ? "en-GB" : "it-IT"), 20, y); y += 12;
    doc.setFontSize(15); doc.text(artworkTitle, 20, y); y += 8;
    doc.setFontSize(11); doc.text(choice?.title || "", 20, y); y += 8;
    doc.setFontSize(10);
    [...(choice?.lines || []), { label: t("Prezzo indicato (spedizione esclusa)", "Listed price (shipping excluded)"), value: choice?.priceText || "" }, ...contactLines()]
      .forEach((l) => { doc.splitTextToSize(`${l.label}: ${l.value}`, 170).forEach((s: string) => { doc.text(s, 20, y); y += 5.5; }); });
    y += 6;
    doc.setFontSize(9);
    [TEXTS.intro, ...TEXTS.infoBox[en ? "en" : "it"].map((x) => ({ it: x, en: x }))].forEach((p) => {
      doc.splitTextToSize(en ? p.en : p.it, 170).forEach((s: string) => { doc.text(s, 20, y); y += 4.6; }); y += 2;
    });
    doc.text(t("Condizioni di vendita e recesso: massimodistefano.com/condizioni-vendita", "Terms of Sale & Returns: massimodistefano.com/condizioni-vendita"), 20, y + 2);
    doc.text("arte@massimodistefano.com", 20, y + 7);
    doc.save(`richiesta-${artworkTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`);
  };

  const send = async () => {
    if (guard.isBot()) { setSent(true); return; } // bot: finta conferma, nessun invio
    setSending(true); setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Richiesta preventivo: ${artworkTitle}`, _replyto: f.email, opera: artworkTitle, disciplina: discipline,
          scelta: choice?.title, dettagli: choice?.lines.map((l) => `${l.label}: ${l.value}`).join(" | "), prezzo_indicato: choice?.priceText,
          email: f.email, nome: f.name, telefono: f.phone, citta: f.city, cap: f.zip, nazione: f.country, note: f.notes, lingua: lang,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch { setError(t("Invio non riuscito. Riprovare oppure scrivere a arte@massimodistefano.com.", "Sending failed. Please try again or write to arte@massimodistefano.com.")); }
    finally { setSending(false); }
  };

  const chip = (active: boolean) =>
    `px-3 py-2 rounded border text-[12px] text-left transition-colors duration-300 ${
      active ? "border-[#2b2820] bg-[#2b2820] text-[#FDFCF0]" : "border-[#D4BE96] text-[#4a473e] hover:border-[#2b2820]"}`;
  const label = "text-[9px] tracking-[0.25em] uppercase text-[#4a473e]/80 mb-2";
  const input = "bg-white/60 border-[#D4BE96] text-[#2b2820]";
  const primary = "w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#2b2820] text-[#FDFCF0] hover:opacity-90 text-[11px] tracking-[0.3em] uppercase disabled:opacity-50";
  const secondary = "w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded border border-[#2b2820] text-[#2b2820] hover:bg-[#2b2820]/5 text-[11px] tracking-[0.3em] uppercase";

  const Block = ({ title, desc, from, onClick }: { title: string; desc?: string; from?: string; onClick: () => void }) => (
    <button type="button" onClick={onClick}
      className="w-full flex items-center gap-3 p-4 rounded border border-[#D4BE96] hover:border-[#2b2820] text-left transition-colors duration-300">
      <div className="flex-1">
        <p className="text-lg text-[#2b2820]" style={head}>{title}</p>
        {desc && <p className="text-[12px] text-[#4a473e]/80 leading-snug">{desc}</p>}
      </div>
      {from && <span className="text-[12px] text-[#2b2820] whitespace-nowrap">{from}</span>}
      <ChevronRight size={16} className="text-[#D4BE96]" />
    </button>
  );

  const crumbs = [t("Supporto", "Support"), t("Formato", "Size"), t("Dati", "Details"), t("Riepilogo", "Summary")];
  const stepIdx = { home: 0, format: 1, form: 2, summary: 3 }[step];
  const Crumbs = () => (
    <div className="flex items-center justify-between gap-2">
      <button type="button" onClick={back} className="inline-flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase text-[#4a473e] hover:text-[#2b2820]">
        <ArrowLeft size={13} /> {t("Indietro", "Back")}
      </button>
      <span className="text-[9px] tracking-[0.2em] uppercase text-[#4a473e]/60">{crumbs.slice(0, stepIdx + 1).join(" › ")}</span>
    </div>
  );

  const Lines = ({ lines }: { lines: Line[] }) => (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[12px]">
      {lines.map((l) => (<div key={l.label} className="contents"><dt className="text-[#4a473e]/75">{l.label}</dt><dd className="text-[#2b2820]">{l.value}</dd></div>))}
    </dl>
  );

  const InfoBox = () => (
    <div className="rounded border border-[#D4BE96]/80 bg-white/40">
      <button type="button" onClick={() => setInfoOpen((o) => !o)} className="w-full flex items-center justify-between px-4 py-2.5 text-[10px] tracking-[0.25em] uppercase text-[#2b2820]">
        {t("Tempi, spedizione e pagamento", "Timing, shipping and payment")}
        <ChevronDown size={14} className={`transition-transform ${infoOpen ? "rotate-180" : ""}`} />
      </button>
      {infoOpen && (
        <div className="px-4 pb-3 space-y-1.5 text-[11.5px] leading-relaxed">
          {TEXTS.infoBox[en ? "en" : "it"].map((p) => <p key={p}>{p}</p>)}
          <PaymentIcons className="pt-1" />
          <Link to="/condizioni-vendita" onClick={onClose} className="inline-block pt-1 text-[11px] underline underline-offset-2 text-[#2b2820]">
            {t("Condizioni di vendita e recesso", "Terms of Sale & Returns")}
          </Link>
        </div>
      )}
    </div>
  );

  const paintingDesc = t(
    "Venduta esattamente come appare nella prima foto della galleria: se è visibile una cornice di presentazione, è inclusa nel prezzo; se l'opera è presentata senza cornice (ad es. su tavola), viene venduta così.",
    "Sold exactly as shown in the first gallery photo: if a presentation frame is visible it is included in the price; if the work is shown unframed (e.g. on panel) it is sold that way.");
  const fixedPrice = num(price);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-[#D4BE96] text-[#4a473e]" style={{ background: "#FDFCF0" }}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            {thumb && <img src={thumb} alt={artworkTitle} className="w-14 h-14 object-cover rounded-sm border border-[#D4BE96]/70" />}
            <DialogTitle className="text-2xl font-light text-[#2b2820] text-left" style={head}>{artworkTitle}</DialogTitle>
          </div>
        </DialogHeader>

        <div style={font} className="space-y-4">
          {sent ? (
            <div className="py-6 space-y-4 text-center">
              <p className="text-sm text-[#2b2820] leading-relaxed">{en ? TEXTS.sent.en : TEXTS.sent.it}</p>
              <button type="button" onClick={downloadPdf} className={secondary}><Download size={13} /> {t("Scarica il riepilogo PDF", "Download PDF summary")}</button>
            </div>
          ) : step === "home" ? (
            <>
              <p className="text-[12.5px] leading-relaxed">{en ? TEXTS.intro.en : TEXTS.intro.it}</p>
              <InfoBox />
              <p className={label}>{isPainting ? t("Opzioni disponibili", "Available options") : t("Scelta del supporto", "Choose the support")}</p>
              <div className="space-y-2">
                {isPainting && (
                  <Block title={t("Opera originale, così come appare", "Original artwork, as shown")} desc={paintingDesc}
                    from={fixedPrice ? eur(fixedPrice) : undefined}
                    onClick={() => { setChoice({ title: t("Opera originale, come nella prima foto", "Original artwork, as in the first photo"), lines: [], price: fixedPrice || null, priceText: fixedPrice ? eur(fixedPrice) : t("Su preventivo", "On quote"), physical: true }); go("form"); }} />
                )}
                {isPainting && (
                  <Block title={t("Cornice diversa", "Different frame")}
                    desc={t("Una cornice diversa da quella mostrata può essere richiesta separatamente: descriverla nelle note per ricevere un preventivo dedicato.", "A frame other than the one shown can be requested separately: describe it in the notes to receive a dedicated quote.")}
                    onClick={() => { setChoice({ title: t("Opera originale + richiesta cornice diversa", "Original artwork + different frame request"), lines: [], price: null, priceText: t("Su preventivo", "On quote"), physical: true }); go("form"); }} />
                )}
                {configurable && supports.map((s) => {
                  const min = minFor(s["ID SUPPORTO"]);
                  const desc = t(s["DESCRIZIONE IT"] || "", s["DESCRIZIONE EN"] || s["DESCRIZIONE IT"] || "");
                  return (
                    <Block key={s["ID SUPPORTO"]} title={supName(s)} desc={desc ? desc.split(". ")[0].replace(/\.$/, "") + "." : undefined}
                      from={min ? `${norm(s["ID SUPPORTO"]) === MASTER_ID ? "" : t("da ", "from ")}${eur(min)}` : undefined}
                      onClick={() => openSupport(s["ID SUPPORTO"])} />
                  );
                })}
                {!isPainting && !configurable && (
                  <Block title={t("Richiesta informazioni", "Information request")} desc={t("Richiesta di disponibilità e prezzo per quest'opera.", "Request availability and price for this work.")}
                    onClick={() => { setChoice({ title: t("Richiesta informazioni", "Information request"), lines: [], price: null, priceText: t("Su richiesta", "On request"), physical: true }); go("form"); }} />
                )}
              </div>
            </>
          ) : step === "format" && support ? (
            <>
              <Crumbs />
              <p className="text-xl text-[#2b2820]" style={head}>{supName(support)}</p>

              {!isMaster && shapes.length > 1 && (
                <div>
                  <p className={label}>{t("Forma", "Shape")}</p>
                  <div className="flex gap-2">
                    {shapes.map((s) => (
                      <button key={s} type="button" className={chip((shapeSel || shapes[0]) === s)}
                        onClick={() => { setShapeSel(s); setFormatId(formatsForShapes([s]).find((r) => priceFor(r, supportId))?.["ID FORMATO"] || ""); }}>
                        {s === "QUADRATO" ? t("Quadrata", "Square") : s === "RETTANGOLARE" ? t("Rettangolare", "Rectangular") : s.charAt(0) + s.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                  {(shapeSel || shapes[0]) === "QUADRATO" && (
                    <p className="text-[10.5px] mt-1.5 text-[#4a473e]/80">{t("Versione quadrata: ritaglio dell'opera approvato dall'artista, visibile nell'anteprima.", "Square version: a crop of the artwork approved by the artist, shown in the preview.")}</p>
                  )}
                </div>
              )}

              {!isMaster && (
                sizeRows.length ? (
                  <div>
                    <p className={label}>{t("Formato", "Size")}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {sizeRows.map((r) => (
                        <button type="button" key={r["ID FORMATO"]} className={chip(r["ID FORMATO"] === format?.["ID FORMATO"])} onClick={() => { setFormatId(r["ID FORMATO"]); setColorIdx(0); }}>
                          {fmtNum(num(r["LARGHEZZA"]))} × {fmtNum(num(r["ALTEZZA"]))} cm<br /><span className="opacity-75 text-[11px]">{eur(priceFor(r, supportId))}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : <p className="text-[12px]">{t("Nessun formato disponibile per questa forma.", "No size available for this shape.")}</p>
              )}

              {format && !isMaster && (
                <div className="rounded border border-[#D4BE96]/70 p-3 space-y-2">
                  <Lines lines={detailLines(format, supportId)} />
                  {format["DESCRIZIONE CORNICE E STAMPA"] && <p className="text-[11.5px] leading-relaxed pt-1">{format["DESCRIZIONE CORNICE E STAMPA"]}</p>}
                </div>
              )}

              {colors.length > 0 && (
                <div>
                  <p className={label}>{t("Colore cornice", "Frame colour")}</p>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((c, i) => {
                      const active = colors.length > 1 && i === colorIdx;
                      const Tag = colors.length > 1 ? "button" : "div";
                      return (
                        <Tag key={c.name} type={colors.length > 1 ? "button" : undefined} onClick={colors.length > 1 ? () => setColorIdx(i) : undefined}
                          title={c.name} className="flex flex-col items-center gap-1 w-16">
                          <span className={`w-8 h-8 rounded-full border ${active ? "ring-2 ring-offset-2 ring-[#2b2820] ring-offset-[#FDFCF0]" : ""}`} style={{ background: c.hex, borderColor: "#00000033" }} />
                          <span className="text-[10.5px] text-center leading-tight text-[#2b2820]">{c.name}{c.extra ? <><br />+{eur(c.extra)}</> : null}</span>
                        </Tag>
                      );
                    })}
                  </div>
                  {colors.length === 1 && <p className="text-[10.5px] mt-1 text-[#4a473e]/75">{t("Unica finitura disponibile per questa cornice.", "Only finish available for this frame.")}</p>}
                </div>
              )}

              <div className="space-y-2 text-[12px] leading-relaxed">
                <p className={label}>{t("Scheda tecnica", "Technical sheet")}</p>
                {t(support["DESCRIZIONE IT"] || "", support["DESCRIZIONE EN"] || "") && <p>{t(support["DESCRIZIONE IT"] || "", support["DESCRIZIONE EN"] || support["DESCRIZIONE IT"] || "")}</p>}
                {isMaster ? (
                  <p className="text-[11px]">{t("Esemplare unico: dopo la vendita l'opera viene ritirata definitivamente dal commercio e non viene più stampata. Il file viene inviato solo dopo il pagamento; licenza d'uso personale, diritti d'autore riservati all'artista.",
                    "Unique edition: after the sale the work is permanently withdrawn and never printed again. The file is sent only after payment; personal-use licence, copyright reserved to the artist.")}</p>
                ) : t(support["IMBALLAGGIO IT"] || "", support["IMBALLAGGIO EN"] || "") ? (
                  <p><span className="text-[#4a473e]/75">{t("Imballaggio", "Packaging")}: </span>{t(support["IMBALLAGGIO IT"] || "", support["IMBALLAGGIO EN"] || support["IMBALLAGGIO IT"] || "")}</p>
                ) : null}
              </div>

              <div className="flex items-baseline justify-between border-y border-[#D4BE96]/60 py-3">
                <span className="text-[11px] tracking-[0.2em] uppercase">{t("Prezzo", "Price")}</span>
                <span className="text-3xl text-[#2b2820]" style={head}>{eur(total)}</span>
              </div>
              {!isMaster && <p className="text-[10.5px] -mt-2 text-[#4a473e]/75">{t("Spedizione esclusa, indicata nel preventivo in base alla destinazione.", "Shipping excluded, stated in the quote according to destination.")}</p>}
              <button type="button" className={primary} disabled={!isMaster && !format} onClick={confirmFormat}>{t("Continua", "Continue")}</button>
            </>
          ) : step === "form" ? (
            <form onSubmit={toSummary} className="space-y-4" noValidate>
              <Crumbs />
              <div className="flex items-baseline justify-between gap-4 border-y border-[#D4BE96]/60 py-3">
                <span className="text-[12px]">{choice?.title}</span>
                <span className="text-xl text-[#2b2820] whitespace-nowrap" style={head}>{choice?.priceText}</span>
              </div>
              <p className={label}>{t("Dati per il preventivo", "Details for the quote")}</p>
              <input {...guard.trapProps} />
              <div className="grid sm:grid-cols-2 gap-2">
                <Input className={`sm:col-span-2 ${input}`} type="email" required placeholder={t("Email (obbligatoria) *", "Email (required) *")} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                <Input className={input} placeholder={t("Nome (facoltativo)", "First name (optional)")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                <Input className={input} type="tel" placeholder={t("Telefono (facoltativo)", "Phone (optional)")} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
                {choice?.physical && <>
                  <Input className={input} placeholder={t("Città (facoltativa)", "City (optional)")} value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} />
                  <Input className={input} placeholder={t("CAP (facoltativo)", "Postal code (optional)")} value={f.zip} onChange={(e) => setF({ ...f, zip: e.target.value })} />
                  <Input className={`sm:col-span-2 ${input}`} placeholder={t("Nazione (facoltativa)", "Country (optional)")} value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} />
                </>}
              </div>
              {choice?.physical && <p className="text-[10.5px] -mt-2 text-[#4a473e]/80">{t("Città, CAP e nazione sono facoltativi, ma velocizzano il preventivo della spedizione.", "City, postal code and country are optional, but speed up the shipping quote.")}</p>}
              <Textarea className={input} rows={2} placeholder={t("Note (facoltative)", "Notes (optional)")} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
              <p className="text-[10.5px] leading-relaxed text-[#4a473e]/80">
                {en ? TEXTS.privacy.en : TEXTS.privacy.it}{" "}
                <Link to="/privacy-policy" onClick={onClose} className="underline underline-offset-2">Privacy Policy</Link>
              </p>
              {error && <p className="text-[12px] text-destructive">{error}</p>}
              <button type="submit" className={primary}>{t("Vai al riepilogo", "Go to summary")}</button>
            </form>
          ) : (
            <div className="space-y-4">
              <Crumbs />
              <p className={label}>{t("Riepilogo della richiesta", "Request summary")}</p>
              <div className="rounded border border-[#D4BE96]/70 p-3 space-y-3">
                <p className="text-lg text-[#2b2820]" style={head}>{choice?.title}</p>
                {!!choice?.lines.length && <Lines lines={choice.lines} />}
                <div className="flex items-baseline justify-between border-t border-[#D4BE96]/60 pt-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase">{t("Prezzo indicato", "Listed price")}</span>
                  <span className="text-2xl text-[#2b2820]" style={head}>{choice?.priceText}</span>
                </div>
                {choice?.physical && <p className="text-[10.5px] text-[#4a473e]/75">{t("Spedizione esclusa.", "Shipping excluded.")}</p>}
              </div>
              <div className="rounded border border-[#D4BE96]/70 p-3"><Lines lines={contactLines()} /></div>
              <p className="text-[11.5px] leading-relaxed">{TEXTS.infoBox[en ? "en" : "it"][0]}</p>
              <PaymentIcons />
              <p className="text-[10.5px] text-[#4a473e]/80">
                {t("L'invio non costituisce un acquisto. ", "Sending this is not a purchase. ")}
                <Link to="/condizioni-vendita" onClick={onClose} className="underline underline-offset-2">{t("Condizioni di vendita e recesso", "Terms of Sale & Returns")}</Link>
              </p>
              {error && <p className="text-[12px] text-destructive">{error}</p>}
              <div className="grid sm:grid-cols-2 gap-2">
                <button type="button" onClick={downloadPdf} className={secondary}><Download size={13} /> PDF</button>
                <button type="button" disabled={sending} onClick={send} className={primary}>
                  <Send size={13} aria-hidden="true" /> {sending ? t("Invio…", "Sending…") : t("Invia richiesta", "Send request")}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
