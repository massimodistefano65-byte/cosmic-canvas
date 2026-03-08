import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const FORMSPREE_NEWSLETTER_URL = "https://formspree.io/f/xpqyapgb";

const NewsletterSection = () => {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_NEWSLETTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          _subject: "Nuova iscrizione newsletter / New newsletter subscription",
          type: "newsletter",
        }),
      });
      if (!res.ok) throw new Error("fail");
      setSent(true);
      setEmail("");
    } catch {
      setError(t("newsletter.error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="mt-12 p-6 rounded-lg bg-secondary/20 border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: false }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Mail size={20} className="text-accent" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-foreground">{t("newsletter.title")}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{t("newsletter.desc")}</p>

      {sent ? (
        <p className="text-accent text-sm" role="status">{t("newsletter.success")}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Newsletter">
          <Input
            type="email"
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={255}
            className="flex-1 h-9 text-sm bg-background/50 border-border/40"
          />
          <Button
            type="submit"
            disabled={sending}
            variant="outline"
            className="h-9 text-xs uppercase tracking-wider border-border/40 hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
          >
            {sending ? t("newsletter.subscribing") : t("newsletter.subscribe")}
          </Button>
        </form>
      )}
      {error && <p className="text-xs text-destructive mt-2" role="alert">{error}</p>}
    </motion.div>
  );
};

export default NewsletterSection;
