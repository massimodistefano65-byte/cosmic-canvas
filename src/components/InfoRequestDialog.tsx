import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  discipline: string;
}

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

const requestTypes = [
  { value: "purchase", label: "Acquisto" },
  { value: "exhibition", label: "Esposizione" },
  { value: "collaboration", label: "Collaborazione" },
  { value: "print", label: "Stampa" },
  { value: "licensing", label: "Licensing" },
];

export default function InfoRequestDialog({ isOpen, onClose, artworkTitle, discipline }: Props) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("purchase");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          _subject: `Richiesta: ${requestTypes.find(r => r.value === type)?.label} — ${artworkTitle}`,
          message,
          "Opera / Artwork": artworkTitle,
          "Disciplina / Discipline": discipline,
          "Tipo di richiesta / Request type": requestTypes.find(r => r.value === type)?.label,
        }),
      });

      if (!res.ok) throw new Error("Invio fallito");

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setName("");
        setEmail("");
        setType("purchase");
        setMessage("");
        onClose();
      }, 2500);
    } catch {
      setError(t("enquiry.error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-[#FDFCF0] border border-[#D4BE96]/40 shadow-2xl rounded-xl p-0 gap-0 [&>button]:right-6 [&>button]:top-6 [&>button]:text-[#1A1A1A]/50 [&>button]:hover:text-[#1A1A1A] [&>button>svg]:h-5 [&>button>svg]:w-5">
        <div className="px-8 pt-8 pb-2 pr-14">
          <DialogHeader className="space-y-0">
            <DialogTitle
              className="text-2xl md:text-3xl font-light leading-tight text-[#2b2820] text-left"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("info.title")} <span className="text-[#b08d4f]">{artworkTitle}</span>
            </DialogTitle>
          </DialogHeader>
        </div>


        <div className="px-8 pb-8" style={{ fontFamily: "'Raleway', sans-serif" }}>
          <p className="text-xs leading-relaxed text-[#4a473e]/80">
            {t("info.desc")}
          </p>

          {sent ? (
            <div className="py-10 text-center">
              <p className="text-[#b08d4f] text-sm">{t("info.sent")}</p>
              <p className="text-[#4a473e]/70 text-xs mt-1">{t("info.sentSub")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="h-10 w-full rounded-md border border-[#D4BE96]/50 bg-white/70 px-3 text-sm text-[#2b2820] focus:outline-none focus:ring-1 focus:ring-[#b08d4f] focus:border-[#b08d4f]"
              >
                {requestTypes.map((rt) => (
                  <option key={rt.value} value={rt.value}>{t(`info.type.${rt.value}`)}</option>
                ))}
              </select>
              <Input
                placeholder={t("info.namePh")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                className="h-10 text-sm bg-white/70 border-[#D4BE96]/50 text-[#2b2820] placeholder:text-[#4a473e]/50 focus-visible:ring-[#b08d4f]"
              />
              <Input
                type="email"
                placeholder={t("info.emailPh")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                className="h-10 text-sm bg-white/70 border-[#D4BE96]/50 text-[#2b2820] placeholder:text-[#4a473e]/50 focus-visible:ring-[#b08d4f]"
              />
              <Textarea
                placeholder={t("info.messagePh")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={1000}
                className="min-h-[90px] text-sm bg-white/70 border-[#D4BE96]/50 text-[#2b2820] placeholder:text-[#4a473e]/50 resize-none focus-visible:ring-[#b08d4f]"
              />
              <Button
                type="submit"
                variant="outline"
                disabled={sending}
                className="w-full h-10 text-xs uppercase tracking-wider bg-transparent border-[#D4BE96]/70 text-[#2b2820] hover:bg-[#D4BE96]/15 hover:text-[#2b2820] hover:border-[#b08d4f] transition-colors disabled:opacity-50"
              >
                <Send size={12} />
                {sending ? t("info.sending") : t("info.send")}
              </Button>
              {error && <p className="text-xs text-red-600 text-center">{error}</p>}
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

