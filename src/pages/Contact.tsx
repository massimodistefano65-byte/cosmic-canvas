import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

const socialLinks = [
  { name: "Linktree", url: "https://linktr.ee/radmax", icon: "🔗" },
  { name: "Facebook", url: "https://www.facebook.com/massimodistefanoarte", icon: Facebook },
  { name: "X", url: "https://x.com/disty65", icon: () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { name: "Instagram", url: "https://www.instagram.com/massimodistefano65/", icon: Instagram },
];

const Contact = () => {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _subject: "Contatto dal sito" }),
      });
      if (!res.ok) throw new Error("fail");
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError(t("contact.error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Contact | Contatti - Massimo Di Stefano"
        description="Contact Massimo Di Stefano for collaborations and inquiries | Contatta Massimo Di Stefano per collaborazioni e informazioni."
        canonicalPath="/contact"
      />
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span>{t("discipline.back")}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-6xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              Contact
            </h1>
            <p className="text-muted-foreground mb-12">
              <a href="mailto:arte@massimodistefano.com" className="hover:text-accent transition-colors">
                arte@massimodistefano.com
              </a>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {sent ? (
                <div className="py-8 text-center" role="status">
                  <p className="text-accent text-sm">{t("contact.sent")}</p>
                  <p className="text-muted-foreground text-xs mt-1">{t("contact.sentSub")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Modulo di contatto">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">{t("contact.nameLbl")}</label>
                    <Input id="contact-name" type="text" placeholder={t("contact.name")} value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">{t("contact.emailLbl")}</label>
                    <Input id="contact-email" type="email" placeholder={t("contact.email")} value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">{t("contact.messageLbl")}</label>
                    <Textarea id="contact-message" placeholder={t("contact.message")} value={message} onChange={(e) => setMessage(e.target.value)} required maxLength={1000} className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent resize-none" rows={4} />
                  </div>
                  <Button type="submit" disabled={sending} className="w-full bg-accent hover:bg-accent/80 text-accent-foreground disabled:opacity-50">
                    {sending ? t("contact.sending") : t("contact.send")}
                  </Button>
                  {error && <p className="text-xs text-destructive text-center" role="alert">{error}</p>}
                </form>
              )}
            </motion.div>

            {/* Social */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl text-foreground mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{t("contact.connect")}</h2>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visita il profilo ${social.name}`}
                    className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50 text-foreground hover:border-accent hover:bg-secondary/50 transition-all group"
                  >
                    <span className="text-xl">
                      {typeof social.icon === "string" ? social.icon : <social.icon size={20} />}
                    </span>
                    <span className="font-medium">{social.name}</span>
                    <span className="ml-auto text-muted-foreground group-hover:text-accent">→</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
