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
import { Send } from "lucide-react";
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
      <DialogContent className="sm:max-w-lg border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-light tracking-wide">
            {t("info.title")} <span className="text-accent">{artworkTitle}</span>
          </DialogTitle>
        </DialogHeader>

        <p className="text-xs leading-relaxed text-muted-foreground mt-1">
          {t("info.desc")}
        </p>

        {sent ? (
          <div className="py-8 text-center">
            <p className="text-accent text-sm">{t("info.sent")}</p>
            <p className="text-muted-foreground text-xs mt-1">{t("info.sentSub")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mt-2">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="h-9 w-full rounded-md border border-border/40 bg-background/50 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
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
              className="h-9 text-sm bg-background/50 border-border/40"
            />
            <Input
              type="email"
              placeholder={t("info.emailPh")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="h-9 text-sm bg-background/50 border-border/40"
            />
            <Textarea
              placeholder={t("info.messagePh")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={1000}
              className="min-h-[80px] text-sm bg-background/50 border-border/40 resize-none"
            />
            <Button
              type="submit"
              variant="outline"
              disabled={sending}
              className="w-full h-9 text-xs uppercase tracking-wider border-border/40 hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
            >
              <Send size={12} />
              {sending ? t("info.sending") : t("info.send")}
            </Button>
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
      </DialogContent>
    </Dialog>
  );
}
