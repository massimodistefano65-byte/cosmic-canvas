import { useState, useEffect } from "react";
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

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  discipline: string;
}

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

const EnquiryModal = ({ isOpen, onClose, artworkTitle, discipline }: EnquiryModalProps) => {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSubject(`${t("enquiry.title")} ${artworkTitle}`);
  }, [artworkTitle, t]);

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
          _subject: subject,
          message,
          "Opera / Artwork": artworkTitle,
          "Disciplina / Discipline": discipline,
        }),
      });

      if (!res.ok) throw new Error("Invio fallito");

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setName("");
        setEmail("");
        setSubject(`${t("enquiry.title")} ${artworkTitle}`);
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
            {t("enquiry.title")} <span className="text-accent">{artworkTitle}</span>
          </DialogTitle>
        </DialogHeader>

        <p className="text-xs leading-relaxed text-muted-foreground mt-1">
          {t("enquiry.desc1")}
        </p>

        {sent ? (
          <div className="py-8 text-center">
            <p className="text-accent text-sm">{t("enquiry.sent")}</p>
            <p className="text-muted-foreground text-xs mt-1">{t("enquiry.sentSub")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mt-2">
            <Input
              placeholder={t("enquiry.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="h-9 text-sm bg-background/50 border-border/40"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="h-9 text-sm bg-background/50 border-border/40"
            />
            <Input
              placeholder={t("enquiry.subject")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              maxLength={200}
              className="h-9 text-sm bg-background/50 border-border/40"
            />
            <Textarea
              placeholder={t("enquiry.message")}
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
              {sending ? t("enquiry.sending") : t("enquiry.send")}
            </Button>
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryModal;
